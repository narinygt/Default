/**
 * GEÇİCİ PAYLAŞIM — tek komutla müşteriye gösterilebilir link.
 * =================================================================
 *   npm run share            derler, yayınlar, tünel açar
 *   npm run share -- --no-build   derlemeyi atlar (dist/ hazırsa)
 *   npm run share -- --port 5000  farklı yerel port
 *
 * Ne yapar:
 *   1. `astro build` ile dist/ üretir
 *   2. dist/ klasörünü yerel bir statik sunucuyla yayınlar
 *   3. Cloudflare Quick Tunnel açıp herkese açık bir https adresi alır
 *
 * Neden Cloudflare Quick Tunnel:
 *   Hesap açmadan çalışır. localtunnel ziyaretçiye ara sayfa gösterir,
 *   ngrok artık zorunlu authtoken ister — ikisi de müşteri demosuna
 *   uygun değil.
 *
 * SINIRLARI — bilmeden paylaşmayın:
 *   • Tünel bu makineye bağlıdır. Bilgisayar uyur/kapanırsa link ölür.
 *   • Yeniden başlattığınızda ADRES DEĞİŞİR. Müşteriye gönderdiğiniz
 *     eski link çalışmaz.
 *   • Adres tahmin edilemez ama herkese açıktır; parola yoktur.
 *     Sunucu `X-Robots-Tag: noindex` gönderir, yine de gizli sayılmaz.
 *
 * Bunlar kabul edilemezse README'deki "kalıcı geçici" seçeneğe bakın.
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, chmod } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { platform, arch } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TOOLS = join(root, '.tools');

/* ---------- Argümanlar ---------- */
const argv = process.argv.slice(2);
const noBuild = argv.includes('--no-build');
const portArg = argv.indexOf('--port');
const PORT = portArg !== -1 ? Number(argv[portArg + 1]) : 4321;

const log = (m) => console.log(m);
const step = (n, m) => console.log(`\n[${n}] ${m}`);

/* ---------- 1. cloudflared'i bul ya da indir ---------- */

const EXE = platform() === 'win32' ? 'cloudflared.exe' : 'cloudflared';
const LOCAL_EXE = join(TOOLS, EXE);

function downloadUrl() {
  const p = platform();
  const a = arch();
  const base = 'https://github.com/cloudflare/cloudflared/releases/latest/download/';
  if (p === 'win32') return base + (a === 'arm64' ? 'cloudflared-windows-arm64.exe' : 'cloudflared-windows-amd64.exe');
  if (p === 'darwin') return base + 'cloudflared-darwin-' + (a === 'arm64' ? 'arm64' : 'amd64') + '.tgz';
  return base + 'cloudflared-linux-' + (a === 'arm64' ? 'arm64' : 'amd64');
}

async function ensureCloudflared() {
  // Önce PATH'te var mı diye bak.
  const { spawnSync } = await import('node:child_process');
  const probe = spawnSync(EXE, ['--version'], { encoding: 'utf8' });
  if (!probe.error) {
    log(`   PATH üzerinde bulundu: ${(probe.stdout || probe.stderr).trim().split('\n')[0]}`);
    return EXE;
  }

  if (existsSync(LOCAL_EXE)) {
    log('   .tools/ içinde hazır.');
    return LOCAL_EXE;
  }

  const url = downloadUrl();
  if (platform() === 'darwin') {
    console.error(
      '\n  cloudflared bulunamadı. macOS için:  brew install cloudflared\n' +
        '  Sonra `npm run share` komutunu tekrar çalıştırın.',
    );
    process.exit(1);
  }

  log('   cloudflared yok — indiriliyor (~55 MB, tek seferlik)…');
  await mkdir(TOOLS, { recursive: true });

  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    console.error(`\n  İndirme başarısız (HTTP ${res.status}). Elle kurmak için:\n` +
      `    winget install --id Cloudflare.cloudflared\n`);
    process.exit(1);
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(LOCAL_EXE));
  if (platform() !== 'win32') await chmod(LOCAL_EXE, 0o755);
  log('   indirildi → .tools/' + EXE);
  return LOCAL_EXE;
}

/* ---------- 2. Derle ---------- */
async function build() {
  const { spawnSync } = await import('node:child_process');
  // Windows'ta çalıştırılabilir dosya .cmd sarmalayıcısıdır. Node 20.12+
  // (ve 24), güvenlik nedeniyle (CVE-2024-27980) `.cmd`/`.bat` dosyalarını
  // `shell: true` olmadan çalıştırmayı reddediyor ve EINVAL ile patlıyor —
  // bu da `r.status` hiç set edilmeden derlemeyi sessizce başarısız
  // gösteriyordu. `shell: true` yalnızca Windows'ta veriliyor; argümanlar
  // sabit ve boşluksuz olduğu için kaçış/DEP0190 riski yok.
  const npx = platform() === 'win32' ? 'npx.cmd' : 'npx';
  const r = spawnSync(npx, ['astro', 'build'], {
    cwd: root,
    stdio: 'inherit',
    shell: platform() === 'win32',
  });
  if (r.status !== 0) {
    console.error('\n  Derleme başarısız. Tünel açılmadı.');
    process.exit(r.status ?? 1);
  }
}

/* ---------- Akış ---------- */

step(1, 'cloudflared kontrol ediliyor');
const cf = await ensureCloudflared();

if (!noBuild) {
  step(2, 'Site derleniyor');
  await build();
} else {
  step(2, 'Derleme atlandı (--no-build)');
  if (!existsSync(join(root, 'dist'))) {
    console.error('  dist/ yok. --no-build olmadan çalıştırın.');
    process.exit(1);
  }
}

step(3, `dist/ yerel olarak yayınlanıyor (port ${PORT})`);
process.env.PORT = String(PORT);
const { start } = await import('./serve-dist.mjs');
const server = await start();
log(`   http://localhost:${PORT}`);

step(4, 'Cloudflare tüneli açılıyor');
const tunnel = spawn(cf, ['tunnel', '--url', `http://localhost:${PORT}`, '--no-autoupdate'], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
});

let publicUrl = null;

/** cloudflared adresi stderr'e basar; ilk trycloudflare.com adresini yakala. */
function scan(chunk) {
  const text = chunk.toString();
  if (!publicUrl) {
    const m = text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
    if (m) {
      publicUrl = m[0];
      const line = '─'.repeat(Math.max(publicUrl.length + 8, 46));
      console.log(
        `\n${line}\n  MÜŞTERİYE GÖNDERECEĞİNİZ ADRES:\n\n  ${publicUrl}\n${line}\n` +
          `  • Bu pencere açık kaldığı sürece çalışır (Ctrl+C ile durur).\n` +
          `  • Bilgisayar uyursa link ölür; yeniden açınca ADRES DEĞİŞİR.\n` +
          `  • Parola yoktur — adresi yalnızca müşterinizle paylaşın.\n`,
      );
    }
  }
  // cloudflared'in gürültülü günlüğünü gizle, yalnızca hataları göster.
  if (/ERR|error|failed/i.test(text)) process.stderr.write(text);
}

tunnel.stdout.on('data', scan);
tunnel.stderr.on('data', scan);

tunnel.on('exit', (code) => {
  if (!publicUrl) {
    console.error(`\n  Tünel açılamadı (çıkış kodu ${code}).`);
    console.error('  Ağınız engelliyorsa README\'deki hesap gerektiren seçeneğe bakın.');
  }
  server.close();
  process.exit(code ?? 0);
});

/** Ctrl+C: önce tüneli, sonra sunucuyu kapat. */
const shutdown = () => {
  console.log('\n  Kapatılıyor…');
  tunnel.kill();
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 2000);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
