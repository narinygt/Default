/**
 * MARKA VARLIĞI ÜRETİCİSİ
 * =================================================================
 *   node scripts/make-brand-assets.mjs
 *
 * Kaynak dosyalar (elle konur, script bunlara DOKUNMAZ):
 *   public/brand/cpeak-logo.svg   — açık zemin sürümü, iki renkli
 *   public/brand/favicon.svg      — "C" markası
 *
 * Üretilenler:
 *   public/brand/cpeak-logo-on-dark.svg   koyu zemin sürümü (bkz. aşağıdaki not)
 *   public/brand/apple-touch-icon.png     180×180, iOS ana ekran ikonu
 *   public/og/cpeak-og-tr.png             1200×630 paylaşım görseli
 *   public/og/cpeak-og-en.png             1200×630 paylaşım görseli
 *
 * ─────────────────────────────────────────────────────────────────
 * KOYU ZEMİN SÜRÜMÜ HAKKINDA — okumadan geçmeyin
 * ─────────────────────────────────────────────────────────────────
 * Logo iki marka rengi kullanıyor: #003F82 (lacivert) ve #11676A (teal).
 * Footer ve scroll'lu header zemini de #003F82. Sonuç:
 *
 *   • "Consultancy" kelimesi zeminle AYNI renk → tamamen görünmez
 *   • "C Peak" teal → lacivert üzerinde 1.56:1, okunmuyor
 *
 * Bu yüzden koyu zemin için tek renkli BEYAZ sürüm türetiliyor.
 * Yeni bir marka rengi uydurulmuyor; logo yeniden çizilmiyor; yalnızca
 * tek renge indirgeniyor — kurumsal kimliklerde standart uygulamadır.
 *
 * Tasarımcınızdan gerçek bir koyu zemin sürümü gelirse dosyanın üzerine
 * yazın. Script, içinde aşağıdaki işaret yoksa dosyaya DOKUNMAZ; yani
 * sizin sürümünüzü ezmez.
 */
import sharp from 'sharp';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const p = (rel) => resolve(root, rel);

const NAVY = '#003f82';
const TEAL = '#11676A';
const AMBER = '#e8b33a';
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

/** Türetilmiş dosyaları işaretler — elle konan dosyalar bunu içermez. */
const GENERATED_MARK = 'cpeak:generated-on-dark';

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ------------------------------------------------------------------ */
/* 1. Koyu zemin logosu                                               */
/* ------------------------------------------------------------------ */

const LOGO_LIGHT = p('public/brand/cpeak-logo.svg');
const LOGO_DARK = p('public/brand/cpeak-logo-on-dark.svg');

const lightSvg = await readFile(LOGO_LIGHT, 'utf8');

/** Logonun doğal en/boy oranı — site config'i bununla uyumlu olmalı. */
const dims = lightSvg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
if (dims) {
  console.log(`   logo viewBox: ${dims[1]} × ${dims[2]}  (site.ts içindeki width/height ile eşleşmeli)`);
}

let writeDark = true;
if (existsSync(LOGO_DARK)) {
  const current = await readFile(LOGO_DARK, 'utf8');
  const isGenerated = current.includes(GENERATED_MARK);
  const isCopyOfLight = current.trim() === lightSvg.trim();
  // Elle konmuş, ışığın kopyası olmayan bir dosyaya dokunma.
  if (!isGenerated && !isCopyOfLight) {
    writeDark = false;
    console.log('   koyu zemin logosu elle konmuş görünüyor — dokunulmadı');
  }
}

if (writeDark) {
  const darkSvg = lightSvg
    // Her iki marka rengini de beyaza indirger.
    .replace(/#003F82/gi, '#FFFFFF')
    .replace(/#11676A/gi, '#FFFFFF')
    .replace(
      '<svg',
      `<!-- ${GENERATED_MARK} — scripts/make-brand-assets.mjs tarafından üretildi.\n` +
        `     Lacivert zeminde okunabilirlik için tek renge indirgenmiş sürüm.\n` +
        `     Tasarımcı sürümü geldiğinde bu dosyanın üzerine yazın. -->\n<svg`,
    );
  await writeFile(LOGO_DARK, darkSvg, 'utf8');
  console.log('✓ public/brand/cpeak-logo-on-dark.svg (beyaz knockout türetildi)');
}

/* ------------------------------------------------------------------ */
/* 2. Apple touch icon                                                */
/* ------------------------------------------------------------------ */

/**
 * iOS, apple-touch-icon için SVG kabul etmez ve saydamlığı siyaha
 * çevirir. Bu yüzden "C" markası lacivert yuvarlak kareye yerleştirilip
 * PNG olarak yazılır.
 */
const faviconSvg = await readFile(p('public/brand/favicon.svg'), 'utf8');

const markWhite = faviconSvg.replace(/#11676A/gi, '#FFFFFF').replace(/#003F82/gi, '#FFFFFF');
const markPng = await sharp(Buffer.from(markWhite))
  .resize({ width: 108, height: 132, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const iconBg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
     <rect width="180" height="180" rx="38" fill="${NAVY}"/>
   </svg>`,
);

await sharp(iconBg)
  .composite([{ input: markPng, gravity: 'center' }])
  .png({ compressionLevel: 9 })
  .toFile(p('public/brand/apple-touch-icon.png'));
console.log('✓ public/brand/apple-touch-icon.png');

/* ------------------------------------------------------------------ */
/* 3. Open Graph görselleri                                           */
/* ------------------------------------------------------------------ */

/** Defter çizgileri — sitenin imza dokusu, %8 opaklıkta. */
function ledgerLines(width, height, step = 34) {
  let out = '';
  for (let y = step; y < height; y += step) {
    out += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>`;
  }
  return out;
}

/** Ağ düğümleri — geometri sabittir, her çalıştırmada aynı görsel çıkar. */
function network(ox, oy) {
  const nodes = [
    [0, 0], [120, -52], [232, 34], [58, 116], [190, 150], [300, 96],
  ];
  const edges = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 2], [2, 5], [4, 5]];
  let out = '<g>';
  for (const [a, b] of edges) {
    out += `<line x1="${ox + nodes[a][0]}" y1="${oy + nodes[a][1]}" x2="${ox + nodes[b][0]}" y2="${oy + nodes[b][1]}" stroke="#5aa9ac" stroke-opacity="0.9" stroke-width="1.6"/>`;
  }
  nodes.forEach(([x, y], i) => {
    out += `<circle cx="${ox + x}" cy="${oy + y}" r="${i === 2 ? 7 : 4.5}" fill="${i === 2 ? AMBER : '#5aa9ac'}"/>`;
  });
  return out + '</g>';
}

function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = w;
    } else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function ogSvg({ title, kicker, locale }) {
  const W = 1200;
  const H = 630;
  const lines = wrap(title, 26);
  const lineHeight = 62;
  const startY = 320 - ((lines.length - 1) * lineHeight) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  ${ledgerLines(W, H)}
  ${network(800, 350)}
  <line x1="80" y1="150" x2="140" y2="150" stroke="${TEAL}" stroke-width="3"/>
  <text x="80" y="196" font-family="${FONT}" font-size="19" font-weight="500" fill="${AMBER}" letter-spacing="2.4">${esc(kicker.toLocaleUpperCase(locale))}</text>
  ${lines
    .map(
      (l, i) =>
        `<text x="80" y="${startY + i * lineHeight}" font-family="${FONT}" font-size="52" font-weight="600" fill="#ffffff" letter-spacing="-1">${esc(l)}</text>`,
    )
    .join('\n  ')}
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${TEAL}"/>
</svg>`;
}

const pages = [
  {
    file: 'public/og/cpeak-og-tr.png',
    title: 'SAP finansında 15 yıl, bulutta yeni bir mimari.',
    kicker: 'SAP Finans · Bulut Mimarisi',
    // Türkçe büyük harf: i → İ. Varsayılan toUpperCase() bunu yanlış yapar.
    locale: 'tr-TR',
  },
  {
    file: 'public/og/cpeak-og-en.png',
    title: 'Fifteen years in SAP finance. A new architecture in the cloud.',
    kicker: 'SAP Finance · Cloud Architecture',
    locale: 'en-GB',
  },
];

await mkdir(p('public/og'), { recursive: true });

/** Gerçek logo, koyu zemin sürümünden alınıp görsele yerleştirilir. */
const darkLogoSvg = await readFile(LOGO_DARK, 'utf8');
const logoOnOg = await sharp(Buffer.from(darkLogoSvg)).resize({ width: 260 }).png().toBuffer();
const logoMeta = await sharp(logoOnOg).metadata();

for (const page of pages) {
  await sharp(Buffer.from(ogSvg(page)))
    .composite([{ input: logoOnOg, top: 74 - Math.round((logoMeta.height ?? 0) / 2) + 20, left: 80 }])
    .png({ compressionLevel: 9 })
    .toFile(p(page.file));
  console.log(`✓ ${page.file}`);
}

console.log('\nBitti.');
