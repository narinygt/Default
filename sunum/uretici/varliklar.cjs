/**
 * SUNUM VARLIKLARI — SVG/WebP kaynakları PNG'ye çevirir.
 * =================================================================
 * pptx yalnızca raster görsel gömer; logolar ise depoda SVG ve WebP
 * olarak duruyor. Bu betik public/brand ve public/logos altındaki
 * dosyaları assets/ içine yüksek çözünürlüklü PNG olarak yazar.
 *
 * Kaynak dosyalar değişmedikçe yeniden çalıştırmak gerekmez; üretilmiş
 * PNG'ler assets/ içinde depoya dahildir.
 *
 *   npm i sharp && node varliklar.cjs
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../public');
const OUT = path.join(__dirname, 'assets');
const refs = JSON.parse(fs.readFileSync(path.join(__dirname, 'refs.json'), 'utf8'));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  // Marka logosu: açık ve koyu zemin sürümleri.
  for (const [src, out] of [
    ['brand/cpeak-logo.svg', 'logo-light.png'],
    ['brand/cpeak-logo-on-dark.svg', 'logo-dark.png'],
  ]) {
    await sharp(path.join(ROOT, src), { density: 600 })
      .resize({ width: 1717 }).png().toFile(path.join(OUT, out));
  }

  // Referans logoları. Genişlik, referans şeridindeki görünen ölçünün
  // altı katı alınır: baskıda ve tam ekran sunumda kenar yumuşamaz.
  for (const r of refs) {
    const src = path.join(ROOT, r.src);
    const out = 'ref-' + path.basename(r.src).replace(/\.(svg|webp)$/, '') + '.png';
    await sharp(src, src.endsWith('.svg') ? { density: 900 } : {})
      .resize({ width: Math.max(600, r.w * 6), fit: 'inside', withoutEnlargement: false })
      .png().toFile(path.join(OUT, out));
  }
  console.log('varlıklar hazır:', OUT);
})().catch((e) => { console.error(e); process.exit(1); });
