/**
 * Görsel doğrulama — dist/ üzerinden ekran görüntüsü alır.
 * Kullanım:  node scripts/shoot.mjs <cikti-dizini>
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { join, resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const outDir = process.argv[2] || join(root, '.shots');
await mkdir(outDir, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = join(dist, p);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    } catch {
      file = join(dist, p, 'index.html');
    }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(await readFile(join(dist, '404.html')).catch(() => 'not found'));
  }
});

await new Promise((r) => server.listen(4390, r));
const base = 'http://localhost:4390';

const browser = await chromium.launch();

const shots = [
  { name: '01-home-desktop', url: '/tr', w: 1440, h: 1200, full: true },
  { name: '02-home-mobile', url: '/tr', w: 390, h: 900, full: true },
  { name: '03-solutions-overview', url: '/tr/cozumler', w: 1440, h: 1200, full: true },
  { name: '04-solution-detail', url: '/tr/cozumler/s4hana-donusumu', w: 1440, h: 1200, full: true },
  { name: '05-contact', url: '/tr/iletisim', w: 1440, h: 1000, full: false },
  { name: '06-contact-mobile', url: '/tr/iletisim', w: 390, h: 900, full: false },
  { name: '07-home-en', url: '/en', w: 1440, h: 1000, full: false },
  { name: '08-approach', url: '/tr/yaklasimimiz', w: 1440, h: 1200, full: true },
  { name: '09-legal', url: '/tr/kvkk-aydinlatma-metni', w: 1440, h: 1000, full: false },
  { name: '10-404', url: '/yok-boyle-bir-sayfa', w: 1440, h: 800, full: false },
  { name: '11-narrow-360', url: '/tr/cozumler', w: 360, h: 900, full: false },
  { name: '12-tablet-768', url: '/tr', w: 768, h: 1000, full: false },
];

/** Çerez banner'ı içeriği örtmesin diye tercih önceden kaydedilir. */
const context = await browser.newContext();
await context.addInitScript(() => {
  try {
    localStorage.setItem('cpeak-consent', JSON.stringify({ analytics: false, at: '2026-01-01' }));
  } catch {}
});

for (const s of shots) {
  const page = await context.newPage();
  await page.setViewportSize({ width: s.w, height: s.h });
  await page.goto(base + s.url, { waitUntil: 'networkidle' });
  // Scroll ile tetiklenen fade-up'ları tetikle.
  // ADIM BOYU KÜÇÜK OLMALI: IntersectionObserver yalnızca kare başına
  // örnekleme yapar, büyük sıçramalarda aradaki öğeleri hiç görmez ve
  // ekran görüntüsünde boş bölümler çıkar.
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    // Sitede html{scroll-behavior:smooth} tanımlı. Kapatılmazsa
    // scrollTo yumuşak animasyonla ilerler, döngü sayfa daha
    // yukarıdayken biter ve alt bölümler hiç tetiklenmez.
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    const step = Math.round(window.innerHeight * 0.4);
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await wait(70);
    }
    window.scrollTo(0, 0);
    await wait(300);
    document.documentElement.style.scrollBehavior = prev;
  });

  // Tüm fade-up'lar tamamlanana kadar bekle (en fazla 4 sn).
  await page
    .waitForFunction(() => document.querySelectorAll('.reveal:not(.is-visible)').length === 0, {
      timeout: 4000,
    })
    .catch(() => console.warn(`  ! ${s.name}: bazı bölümler açılmadı`));
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(outDir, s.name + '.png'), fullPage: s.full });
  console.log('✓', s.name, `${s.w}px`, s.url);
  await page.close();
}

// Mobil menü açık hâli
const mp = await context.newPage();
await mp.setViewportSize({ width: 390, height: 800 });
await mp.goto(base + '/tr', { waitUntil: 'networkidle' });
await mp.click('[data-menu-toggle]');
await mp.waitForTimeout(300);
await mp.screenshot({ path: join(outDir, '13-mobile-menu.png') });
console.log('✓ 13-mobile-menu');
await mp.close();

// Masaüstü dropdown açık + scroll'lu header
const dp = await context.newPage();
await dp.setViewportSize({ width: 1440, height: 800 });
await dp.goto(base + '/tr', { waitUntil: 'networkidle' });
await dp.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, 400);
});
await dp.waitForTimeout(400);
await dp.hover('.nav-trigger');
await dp.waitForTimeout(350);
await dp.screenshot({ path: join(outDir, '14-header-scrolled-dropdown.png') });
console.log('✓ 14-header-scrolled-dropdown');
await dp.close();

// Çerez banner'ı görünür hâliyle tek kare
const cp = await browser.newPage({ viewport: { width: 1440, height: 800 } });
await cp.goto(base + '/tr', { waitUntil: 'networkidle' });
await cp.waitForTimeout(400);
await cp.screenshot({ path: join(outDir, '15-cookie-banner.png') });
console.log('✓ 15-cookie-banner');
await cp.close();

await browser.close();
server.close();
console.log('\nÇıktı:', outDir);
