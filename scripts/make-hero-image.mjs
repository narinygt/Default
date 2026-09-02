/**
 * HERO GÖRSELİ HAZIRLAYICI
 * =================================================================
 *   node scripts/make-hero-image.mjs
 *
 * Kaynak: quantum.png (800×942, saf siyah zemin, opak)
 *
 * Üretilenler (public/media/):
 *   quantum.webp           Olduğu gibi — siyah zeminin kendisi fon olacaksa
 *   quantum-cutout.webp    Siyah zemin alfaya çevrilmiş — lacivert üzerine oturur
 *   quantum-duotone.webp   Marka renklerine (lacivert/teal) indirgenmiş kesim
 *
 * NOT — çözünürlük sınırı:
 * Kaynak yalnızca 800px geniş. Hero'da tam genişlikte fon olarak
 * kullanılırsa 1440px ve üzeri ekranlarda büyütülür ve yumuşar.
 * Bu yüzden "background" seçeneğinde görsel sağa yaslanır ve doğal
 * boyutunun üzerine çıkarılmaz. Tam genişlikte keskin bir fon
 * isteniyorsa en az 2400px genişliğinde bir kaynak gerekir.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const p = (rel) => resolve(root, rel);
const SRC = p('quantum.png');

await mkdir(p('public/media'), { recursive: true });

const meta = await sharp(SRC).metadata();
const { width, height } = meta;
console.log(`kaynak: ${width}×${height}`);

/* 1. Olduğu gibi ------------------------------------------------- */
await sharp(SRC).webp({ quality: 82 }).toFile(p('public/media/quantum.webp'));
console.log('✓ public/media/quantum.webp');

/**
 * Parlaklığı alfa kanalına çevirir: saf siyah zemin tamamen şeffaf olur.
 * `linear(2.6, -12)` eğrisi, nesnenin kendi koyu bölgelerinin gereksiz
 * yere şeffaflaşmasını engeller — yalnızca siyaha çok yakın pikseller
 * tamamen kaybolur, nesne katı kalır.
 */
async function luminanceAlpha() {
  return sharp(SRC).greyscale().linear(2.6, -12).raw().toBuffer();
}

/* 2. Kesim (siyah zemin kaldırılmış) -----------------------------
   Dosya yolundan gelen bir pipeline'a joinChannel ile eklenen kanal
   alfa olarak tanınmıyordu (çıktı 3 kanal kalıyordu). Kaynağı önce
   ham 3 kanallı tampona çevirip alfayı ona eklemek güvenilir sonuç
   veriyor — duotone adımında da aynı yöntem kullanılıyor.            */
const alpha = await luminanceAlpha();

const rgbBody = await sharp(SRC).removeAlpha().raw().toBuffer();

await sharp(rgbBody, { raw: { width, height, channels: 3 } })
  .joinChannel(alpha, { raw: { width, height, channels: 1 } })
  .webp({ quality: 84, alphaQuality: 90 })
  .toFile(p('public/media/quantum-cutout.webp'));
console.log('✓ public/media/quantum-cutout.webp');

/* 3. Marka renklerine indirgenmiş kesim -------------------------- */
/**
 * Altın/bakır tonu markanın dışında kaldığı için görselin gri tonlusu
 * teal ile boyanır. Luminans korunur, renk markaya döner.
 */
/**
 * `greyscale()` tek kanallı bir görüntü bırakır ve alfa eklenemez.
 * Bunun yerine renk matrisi kullanılır: her çıkış kanalı, girişin
 * luminansının hedef renkle ölçeklenmiş hâli olur. Üç kanal korunur,
 * luminans korunur, renk markaya döner.
 */
/**
 * Duotone doğrudan piksel üzerinde hesaplanır.
 *
 * Sharp'ın gamma/recomb zinciriyle denendiğinde sonuç öngörülemedi:
 * ya nesne lacivert zeminle aynı parlaklıkta kalıp kayboldu, ya da
 * highlight'lar ezilip siluete döndü. Kaynak çok karanlık olduğu için
 * (kanal ortalamaları 26/17/10) burada açık bir ton eğrisi ve iki uçlu
 * bir renk rampası gerekiyor; ikisini de elle yazmak hem okunur hem
 * ayarlanabilir.
 */
const SHADOW = [10, 48, 82]; // koyu uç — lacivert ailesinden
const HIGHLIGHT = [205, 242, 244]; // parlak uç — çok açık teal
/** Ton eğrisi: 1'den küçük üs orta tonları yukarı çeker. */
const CURVE = 0.45;

const srcRgb = await sharp(SRC).removeAlpha().raw().toBuffer();
const duotoneBody = Buffer.alloc(width * height * 3);

for (let i = 0, o = 0; i < srcRgb.length; i += 3, o += 3) {
  const lum = (0.2126 * srcRgb[i] + 0.7152 * srcRgb[i + 1] + 0.0722 * srcRgb[i + 2]) / 255;
  const t = Math.pow(lum, CURVE);
  duotoneBody[o] = SHADOW[0] + (HIGHLIGHT[0] - SHADOW[0]) * t;
  duotoneBody[o + 1] = SHADOW[1] + (HIGHLIGHT[1] - SHADOW[1]) * t;
  duotoneBody[o + 2] = SHADOW[2] + (HIGHLIGHT[2] - SHADOW[2]) * t;
}

await sharp(duotoneBody, { raw: { width, height, channels: 3 } })
  .joinChannel(alpha, { raw: { width, height, channels: 1 } })
  .webp({ quality: 84, alphaQuality: 90 })
  .toFile(p('public/media/quantum-duotone.webp'));
console.log('✓ public/media/quantum-duotone.webp');

/* Boyut raporu ---------------------------------------------------- */
const { statSync } = await import('node:fs');
for (const f of ['quantum.webp', 'quantum-cutout.webp', 'quantum-duotone.webp']) {
  console.log(`   ${f}: ${(statSync(p('public/media/' + f)).size / 1024).toFixed(0)} KB`);
}
