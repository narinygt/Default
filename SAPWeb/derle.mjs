/* ==========================================================================
   derle.mjs — tek-dosya.html üretir (derle.ps1'in Node karşılığı)
   --------------------------------------------------------------------------
   ÇALIŞTIRMA:  node derle.mjs

   Neden iki betik var: `derle.ps1` Windows'ta çift tıklanabilen PowerShell
   sürümüdür; bu dosya ise PowerShell'in bulunmadığı ortamlarda (CI, macOS,
   Linux, konteyner) aynı çıktıyı üretir. İKİSİ DE AYNI SONUCU VERMELİDİR —
   birinde bir kural değişirse diğerine de taşınmalıdır.

   Kurallar (ikisinde de aynı):
   · Dosya listesi index.html'den okunur — yeni konu eklenince betik
     güncellenmez.
   · Gövdede `</script` dizisi varsa üretim durur (gömülü blok erken kapanır).
   · Değiştirme DÜZ METİNLE yapılır, regex ile değil: JS gövdesinde geçen
     `$1` / `$&` gibi diziler regex değiştirme metninde özel anlam kazanır
     ve içeriği sessizce bozar (bkz. CLAUDE.md Ders #13).
   ========================================================================== */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = dirname(fileURLToPath(import.meta.url));
const out = join(src, 'tek-dosya.html');

let html = readFileSync(join(src, 'index.html'), 'utf8');

const cssFiles = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map((m) => m[1]);
const jsFiles = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);

console.log(`CSS : ${cssFiles.length} dosya`);
console.log(`JS  : ${jsFiles.length} dosya`);

const eksik = [...cssFiles, ...jsFiles].filter((f) => {
  try { readFileSync(join(src, f)); return false; } catch { return true; }
});
if (eksik.length) {
  console.error(`Eksik dosya: ${eksik.join(', ')}`);
  process.exit(1);
}

const gom = (list) =>
  list
    .map((f) => `/* ================= ${f} ================= */\n` + readFileSync(join(src, f), 'utf8'))
    .join('\n');

const css = gom(cssFiles);
const js = gom(jsFiles);

if (js.includes('</script')) {
  console.error('JS icinde </script> dizisi var - gomulemez.');
  process.exit(1);
}

for (const f of cssFiles) html = html.split(`<link rel="stylesheet" href="${f}">`).join('');
for (const f of jsFiles) html = html.split(`<script src="${f}"></script>`).join('');

html = html.split('</head>').join(`<style>\n${css}\n</style>\n</head>`);
html = html.split('</body>').join(`<script>\n${js}\n</script>\n</body>`);

const banner =
  '<!-- OTOMATIK URETILDI - ELLE DUZENLEME. Kaynak: index.html + css/ + js/ + data/ + content/  ' +
  '·  Yeniden uretmek icin: .\\derle.ps1  veya  node derle.mjs -->';
html = banner + '\n' + html;

writeFileSync(out, html, 'utf8');
console.log(`\ntek-dosya.html uretildi: ${Math.round(html.length / 1024).toLocaleString('tr-TR')} KB`);
