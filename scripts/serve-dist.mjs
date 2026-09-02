/**
 * dist/ İÇİN STATİK SUNUCU — sıfır bağımlılık.
 * =================================================================
 *   node scripts/serve-dist.mjs [port]
 *
 * Neden Astro'nun `preview` komutu yerine bu:
 *   • Vite tabanlı sunucular bilinmeyen `Host` başlıklarını reddeder;
 *     tünel adresleri bu duruma girer. Burada Host denetimi yoktur.
 *   • HMR / websocket yoktur — tünel üzerinden kopacak bir şey yok.
 *   • Yayına çıkacak dosyaların birebir aynısını sunar.
 *
 * Astro `format: 'directory'` ile ürettiği için /tr/iletisim adresi
 * dist/tr/iletisim/index.html dosyasına karşılık gelir; bu eşleme
 * aşağıda yapılır.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(root, 'dist');
// `PORT` ortam değişkeni argv[2]'den ÖNCE gelir. Bu modül `share.mjs`
// tarafından `import` edildiğinde, o anda çalışan process'in argv[2]'si
// serve-dist'in değil share'in kendi bayrağıdır (`--no-build`, `--port`
// gibi) — argv önce okunursa `Number('--no-build')` NaN döner ve sunucu
// ERR_SOCKET_BAD_PORT ile çöker. share.mjs zaten import'tan önce
// `process.env.PORT`'u set ediyor, bu yüzden env önceliği o senaryoyu
// düzeltir; doğrudan `node scripts/serve-dist.mjs <port>` çalıştırımı da
// env boşken argv[2]'ye düşerek eskisi gibi çalışmaya devam eder.
const PORT = Number(process.env.PORT || process.argv[2] || 4321);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

/** Dizin dışına çıkmayı engeller (path traversal). */
function safeJoin(base, target) {
  const p = normalize(join(base, target));
  return p.startsWith(base) ? p : null;
}

async function resolveFile(urlPath) {
  const candidates = [];
  const direct = safeJoin(DIST, urlPath);
  if (!direct) return null;

  try {
    if ((await stat(direct)).isDirectory()) candidates.push(join(direct, 'index.html'));
    else candidates.push(direct);
  } catch {
    // Dosya yok: dizin biçimli adres olabilir (/tr/iletisim → .../index.html)
    candidates.push(join(direct, 'index.html'), `${direct}.html`);
  }

  for (const c of candidates) {
    try {
      const s = await stat(c);
      if (s.isFile()) return c;
    } catch {
      /* sıradakine bak */
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const file = await resolveFile(urlPath);

  if (!file) {
    // 404 sayfası da statik olarak üretiliyor.
    const notFound = join(DIST, '404.html');
    try {
      const body = await readFile(notFound);
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404');
    }
    return;
  }

  try {
    const body = await readFile(file);
    const ext = extname(file);
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      // Geçici demo: tarayıcı eski sürümü göstermesin.
      'Cache-Control': 'no-cache',
      // Demo sitesi arama motorlarına düşmesin.
      'X-Robots-Tag': 'noindex, nofollow',
    });
    res.end(body);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500');
  }
});

export function start() {
  return new Promise((res) => server.listen(PORT, () => res(server)));
}

// Doğrudan çalıştırıldıysa dinlemeye başla.
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('serve-dist.mjs')) {
  await start();
  console.log(`dist/ yayında → http://localhost:${PORT}`);
}
