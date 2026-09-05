/**
 * SUNUM GÖRSELLERİ — sitenin kendi görsellerini pptx'e hazırlar.
 * =================================================================
 * pptx WebP gömemez; ayrıca sitedeki bölüm görselleri sayfaya
 * ÇERÇEVESİZ oturur: dört kenarları zemine sönerek biter
 * (global.css `.section-figure`, --figure-ramp: %3; 3:2 oranı yüzünden
 * dikeyde 1.5 katı, böylece dört kenar PİKSEL olarak eşit söner).
 *
 * Aynı rampa burada piksele işlenir: görselin üzerine, slaytın zemin
 * rengini taşıyan ve kenarlara doğru saydamlığı azalan bir katman
 * bindirilir. Sonuç, sunumda da kutu kenarı değil zemine karışan bir
 * görsel olur — deste boyunca yeni bir çizgi ya da çerçeve eklemeden.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = '/home/user/Default/public/media';
const OUT = path.join(__dirname, 'assets');
fs.mkdirSync(OUT, { recursive: true });

const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));

/**
 * Zemin rengini taşıyan bindirme katmanı üretir. `alphaAt(x, y)` 1
 * döndürdüğünde görsel tamamen görünür, 0 döndürdüğünde yerini zemin
 * rengi alır.
 */
function veil(w, h, bg, alphaAt) {
  const [r, g, b] = rgb(bg);
  const buf = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      buf[i] = r; buf[i + 1] = g; buf[i + 2] = b;
      buf[i + 3] = Math.round(255 * (1 - alphaAt(x, y)));
    }
  }
  return { input: buf, raw: { width: w, height: h, channels: 4 } };
}

/** Bölüm görseli: dört kenarda eşit uzunlukta sönerek zemine karışır. */
async function figure(name, bg, outName) {
  const W = 1800, H = 1200, ramp = Math.round(W * 0.03);
  const edge = (i, n) => Math.min(1, Math.min(i, n - 1 - i) / ramp);
  await sharp(path.join(SRC, name + '.webp'))
    .resize(W, H)
    .composite([veil(W, H, bg, (x, y) => edge(x, W) * edge(y, H))])
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, outName));
  console.log(outName);
}

(async () => {
  // Sitede her görselin iki dili var: '-en' ekli dosya İngilizce,
  // eksiz olan Türkçe. Sunumda da ikisi birden üretilir.
  const figures = [
    ['finans-mimari', 'FFFFFF', 'fig-finance'],
    ['bulut-modelleri', 'F7F8F7', 'fig-cloud'],
    ['surec-adimlari', 'FFFFFF', 'fig-process'],
    ['yapay-zeka-akisi', 'FFFFFF', 'fig-ai'],
  ];
  for (const [src, bg, out] of figures) {
    await figure(src + '-en', bg, out + '.jpg');       // İngilizce
    await figure(src, bg, out + '-tr.jpg');            // Türkçe
  }

  // KAPAK — sitedeki hero'nun 'background' varyantı: görsel sağa yaslı,
  // sol kenarı uzun bir rampayla lacivert zemine karışıyor. Parlaklık
  // düzleştirmeden ÖNCE düşürülür; sonra düşürülseydi zemin de kararır
  // ve slaytın lacivertiyle arasında dikiş izi kalırdı.
  const W = 1300, H = 1448, ramp = Math.round(W * 0.45);   // 0.898 — kapaktaki yuva oranı
  await sharp(path.join(SRC, 'hero-team.webp'))
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.92 })
    .composite([veil(W, H, '003F82', (x) => Math.min(1, x / ramp))])
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, 'cover-hero.jpg'));
  console.log('cover-hero.jpg');

  // KAPANIŞ — kuantum görselinin markaya indirgenmiş (duotone) sürümü.
  // Kesit sürümü altın tonluydu ve paletle çakışıyordu.
  const qw = 900, qh = Math.round(900 / 0.849), qr = Math.round(qw * 0.10);
  const qEdge = (i, n) => Math.min(1, Math.min(i, n - 1 - i) / qr);
  await sharp(path.join(SRC, 'quantum-duotone.webp'))
    .resize(qw, qh).flatten({ background: rgb('003F82').reduce((o, v, i) => (o['rgb'[i]] = v, o), {}) })
    .composite([veil(qw, qh, '003F82', (x, y) => qEdge(x, qw) * qEdge(y, qh))])
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, 'quantum.jpg'));
  console.log('quantum.jpg');
})().catch((e) => { console.error(e); process.exit(1); });
