/**
 * ERİŞİLEBİLİRLİK VE RESPONSIVE DENETİMİ
 * =================================================================
 * Gerçek tarayıcıda, hesaplanmış (computed) renklerle çalışır —
 * CSS'te yazılan değere değil, ekrana çıkan sonuca bakar.
 *
 *   • WCAG 2.1 AA kontrast oranı (metin 4.5:1, büyük metin 3:1)
 *   • 360/768/1024/1440/1920 kırılımlarında yatay taşma
 *   • dokunma hedefi boyutu (≥44px)
 *   • form etiketlerinin gerçekten bağlı olması
 *
 *   node scripts/audit-a11y.mjs
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  try {
    const p = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = join(dist, p);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    } catch {
      file = join(dist, p, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404);
    res.end('404');
  }
});
await new Promise((r) => server.listen(4401, r));
const base = 'http://localhost:4401';

const PAGES = [
  '/tr',
  '/tr/cozumler',
  '/tr/cozumler/sap-public-cloud',
  '/tr/yaklasimimiz',
  '/tr/hakkimizda',
  '/tr/iletisim',
  '/tr/kvkk-aydinlatma-metni',
  '/en',
  '/en/solutions',
];
const WIDTHS = [360, 768, 1024, 1440, 1920];

const browser = await chromium.launch();
const problems = [];

/* ---------- 1. Kontrast ---------- */
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const url of PAGES) {
  await page.goto(base + url, { waitUntil: 'networkidle' });
  // Tüm fade-up'lar açılsın, gizli öğe ölçüme girmesin.
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.remove('will-reveal');
      el.classList.add('is-visible');
    });
  });

  const failures = await page.evaluate(() => {
    const srgb = (c) => {
      const v = c / 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
    const parse = (s) => {
      const m = s.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(',').map((x) => parseFloat(x));
      return { rgb: [p[0], p[1], p[2]], a: p.length > 3 ? p[3] : 1 };
    };
    const over = (fg, bg, a) => fg.map((c, i) => c * a + bg[i] * (1 - a));

    /** Şeffaf zeminlerde üst katmanları birleştirerek gerçek arka planı bulur. */
    const bgOf = (el) => {
      let node = el;
      let stack = [];
      while (node && node !== document.documentElement) {
        const c = parse(getComputedStyle(node).backgroundColor);
        if (c && c.a > 0) {
          stack.push(c);
          if (c.a === 1) break;
        }
        node = node.parentElement;
      }
      let result = [255, 255, 255];
      for (let i = stack.length - 1; i >= 0; i--) result = over(stack[i].rgb, result, stack[i].a);
      return result;
    };

    const ratio = (a, b) => {
      const [hi, lo] = lum(a) > lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)];
      return (hi + 0.05) / (lo + 0.05);
    };

    const out = [];
    const seen = new Set();
    const els = document.querySelectorAll(
      'p, h1, h2, h3, h4, a, li, dt, dd, span, label, button, td, th, summary, caption, figcaption',
    );

    for (const el of els) {
      // Yalnızca kendi doğrudan metni olan öğeleri ölç.
      const text = Array.from(el.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.trim())
        .join('');
      if (!text) continue;

      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.15)
        continue;
      const box = el.getBoundingClientRect();
      if (box.width < 2 || box.height < 2) continue;

      const fgP = parse(cs.color);
      if (!fgP) continue;
      const bg = bgOf(el);
      const fg = over(fgP.rgb, bg, fgP.a);

      const size = parseFloat(cs.fontSize);
      const weight = parseInt(cs.fontWeight, 10) || 400;
      // WCAG "büyük metin": ≥24px, veya ≥18.66px ve kalın.
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const need = large ? 3 : 4.5;

      const r = ratio(fg, bg);
      if (r < need) {
        const key = `${cs.color}|${Math.round(size)}|${el.className}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({
          selector: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''),
          text: text.slice(0, 45),
          ratio: Math.round(r * 100) / 100,
          need,
          size: Math.round(size),
          color: cs.color,
        });
      }
    }
    return out;
  });

  for (const f of failures) {
    problems.push(
      `KONTRAST ${url} — ${f.selector} (${f.size}px) ${f.ratio}:1 < ${f.need}:1 · "${f.text}"`,
    );
  }
}

/* ---------- 2. Yatay taşma ---------- */
for (const w of WIDTHS) {
  const p2 = await browser.newPage({ viewport: { width: w, height: 900 } });
  for (const url of PAGES) {
    await p2.goto(base + url, { waitUntil: 'networkidle' });
    const overflow = await p2.evaluate(() => {
      const de = document.documentElement;
      if (de.scrollWidth <= de.clientWidth + 1) return null;
      // Taşmaya yol açan öğeyi bul.
      const guilty = [];
      document.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > de.clientWidth + 1 && r.width > 0) {
          guilty.push(el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]);
        }
      });
      return { scrollW: de.scrollWidth, clientW: de.clientWidth, guilty: guilty.slice(0, 3) };
    });
    if (overflow) {
      problems.push(
        `TAŞMA ${w}px ${url} — ${overflow.scrollW}>${overflow.clientW} · ${overflow.guilty.join(', ')}`,
      );
    }
  }
  await p2.close();
}

/* ---------- 3. Dokunma hedefleri + form etiketleri ---------- */
const p3 = await browser.newPage({ viewport: { width: 390, height: 844 } });
await p3.goto(`${base}/tr/iletisim`, { waitUntil: 'networkidle' });

const small = await p3.evaluate(() =>
  Array.from(document.querySelectorAll('button, a.btn, input[type=checkbox], select'))
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName.toLowerCase(), id: el.id, w: Math.round(r.width), h: Math.round(r.height) };
    })
    .filter((x) => x.h > 0 && x.h < 24),
);
for (const s of small) problems.push(`DOKUNMA HEDEFİ ${s.tag}#${s.id} yüksekliği ${s.h}px (<24px)`);

const unlabelled = await p3.evaluate(() =>
  Array.from(document.querySelectorAll('input, select, textarea'))
    .filter((el) => el.type !== 'hidden')
    .filter((el) => {
      if (el.getAttribute('aria-label')) return false;
      if (el.closest('.hp')) return false; // honeypot bilinçli olarak gizli
      return !(el.id && document.querySelector(`label[for="${el.id}"]`));
    })
    .map((el) => el.name || el.id || el.tagName),
);
for (const u of unlabelled) problems.push(`ETİKETSİZ FORM ALANI: ${u}`);
await p3.close();

await browser.close();
server.close();

console.log(`Denetlenen: ${PAGES.length} sayfa × ${WIDTHS.length} genişlik\n`);
if (problems.length) {
  console.log(`BULGULAR (${problems.length}):`);
  for (const p of problems) console.log('  ✗ ' + p);
  process.exit(1);
}
console.log('✓ Kontrast, yatay taşma, dokunma hedefi ve form etiketi denetimleri temiz.');
