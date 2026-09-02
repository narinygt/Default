/**
 * DERLEME DOĞRULAYICI
 * =================================================================
 * dist/ içindeki her sayfayı yayına uygunluk açısından denetler:
 *   • tek bir <h1>
 *   • title ve meta description dolu
 *   • JSON-LD geçerli ve içinde doldurulmamış placeholder yok
 *   • karşılıklı hreflang (tr ↔ en) ve canonical
 *   • görsellerde alt metni ve lazy yükleme
 *   • dilin gerektirdiği <html lang>
 *
 *   node scripts/verify-build.mjs
 *
 * Deploy öncesi çalıştırın; hata varsa çıkış kodu 1 döner.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) files.push(p);
  }
})(dist);

const problems = [];
const notes = [];

/** Kök yönlendirme ve 404, normal sayfa kurallarının dışındadır. */
const isUtility = (rel) => rel === '/index.html' || rel.startsWith('/404');

for (const file of files.sort()) {
  const html = readFileSync(file, 'utf8');
  const rel = '/' + file.slice(dist.length + 1).split(sep).join('/');
  const util = isUtility(rel);

  const count = (re) => (html.match(re) || []).length;

  /** HTML varlıklarını çözer — aksi hâlde "&" 5 karakter sayılır ve
      başlık uzunluğu ölçümü yanlış çıkar. */
  const decode = (s) =>
    s
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'");

  const grab = (re) => decode((html.match(re) || [])[1] || '');

  // --- Başlık yapısı ---
  const h1s = count(/<h1[\s>]/g);
  if (!util && h1s !== 1) problems.push(`${rel} — <h1> sayısı ${h1s} (tam 1 olmalı)`);

  // --- Meta ---
  const title = grab(/<title>(.*?)<\/title>/s);
  const desc = grab(/name="description" content="(.*?)"/s);
  if (!title) problems.push(`${rel} — <title> yok`);
  if (title.length > 65) notes.push(`${rel} — title ${title.length} karakter (arama sonucunda kırpılabilir)`);
  if (!util) {
    if (!desc) problems.push(`${rel} — meta description yok`);
    else if (desc.length > 165)
      notes.push(`${rel} — meta description ${desc.length} karakter (kırpılabilir)`);
  }

  // --- html lang ---
  const lang = grab(/<html lang="(.*?)"/);
  if (!lang) problems.push(`${rel} — <html lang> yok`);

  // --- Canonical + hreflang ---
  if (!util) {
    if (!/rel="canonical"/.test(html)) problems.push(`${rel} — canonical yok`);
    for (const hl of ['tr', 'en', 'x-default']) {
      if (!html.includes(`hreflang="${hl}"`)) problems.push(`${rel} — hreflang="${hl}" yok`);
    }
  }

  // --- Open Graph / Twitter ---
  if (!util) {
    for (const tag of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card']) {
      if (!html.includes(`"${tag}"`)) problems.push(`${rel} — ${tag} yok`);
    }
  }

  // --- Yapısal veri ---
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const parsed = JSON.parse(m[1]);
      if (JSON.stringify(parsed).includes('TODO:'))
        problems.push(`${rel} — JSON-LD içinde doldurulmamış placeholder var`);
    } catch {
      problems.push(`${rel} — JSON-LD ayrıştırılamadı`);
    }
  }

  // --- Görseller ---
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\balt=/.test(tag)) problems.push(`${rel} — alt metni olmayan <img>`);
    // Header logosu ilk boyamada görünür; lazy olması CLS/LCP'ye zarar verir.
    const isEagerByDesign = tag.includes('brand-img');
    if (!isEagerByDesign && !/loading="lazy"/.test(tag))
      notes.push(`${rel} — <img> lazy değil: ${tag.slice(0, 70)}…`);
  }

  // --- Erişilebilirlik: boş bağlantı / buton ---
  if (/<a[^>]*>\s*<\/a>/.test(html)) problems.push(`${rel} — metni olmayan <a>`);
}

console.log(`Denetlenen sayfa: ${files.length}\n`);

if (notes.length) {
  console.log(`Notlar (${notes.length}):`);
  for (const n of notes) console.log('  · ' + n);
  console.log('');
}

if (problems.length) {
  console.log(`HATALAR (${problems.length}):`);
  for (const p of problems) console.log('  ✗ ' + p);
  process.exit(1);
}

console.log('✓ Tüm kontroller temiz.');
