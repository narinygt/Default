/**
 * Bölüm görsellerinin KENAR TONUNU dört kenarda eşitler.
 *
 * Neden: görseller sayfada çerçevesiz duruyor, kenarları maskeyle
 * zemine karışıyor. Maske dört kenarda eşit uzunlukta olsa bile,
 * görselin kendi zemin tonu bir kenarda koyu diğerinde açıksa solma
 * bir tarafta belirgin, diğerinde görünmez oluyor; göz bunu "görsel
 * yamuk duruyor" diye okuyor. Ölçülen dengesizlik: süreç 20, finans
 * 11, yapay zeka 26 birim parlaklık.
 *
 * Ne yapar: her kenarın dış bandındaki ZEMİN tonunu ölçer, dördünün
 * ortalamasını hedef alır ve farkı kenardan içeri doğru yumuşakça
 * sönen bir düzeltmeyle uygular. Düzeltme yalnızca zemine benzeyen
 * piksellere işler — yazılar, ikonlar ve nesneler dokunulmadan kalır.
 *
 * Kullanım: node scripts/normalize-figure-edges.mjs [--kontrol]
 *   --kontrol  dosyaları yazmaz, yalnızca ölçüm raporunu basar.
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MEDYA = path.join(KOK, 'public/media');

const DOSYALAR = [
  'surec-adimlari', 'surec-adimlari-en',
  'bulut-modelleri', 'bulut-modelleri-en',
  'finans-mimari', 'finans-mimari-en',
  'yapay-zeka-akisi', 'yapay-zeka-akisi-en',
];

/** Düzeltmenin kenardan içeri sönme mesafesi (ilgili eksenin oranı). */
const BANT = 0.14;
/** Kenar tonu ölçülen dış bandın kalınlığı. */
const OLCUM_BANDI = 0.03;
/** Bir piksel, zemin tonundan bu kadar saparsa "içerik" sayılır ve
 *  düzeltmeden muaf tutulur. */
const ICERIK_SAPMASI = 26;

const L = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const kisitla = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
/** 0..1 aralığında yumuşak geçiş (smoothstep). */
const yumusak = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

/** Bir kenarın dış bandındaki ZEMİN tonu — medyan, içerikten etkilenmesin. */
function kenarTonu(data, W, H, K, yon) {
  const uzun = yon === 'sol' || yon === 'sag' ? H : W;
  const kalinlik = Math.max(2, Math.round((yon === 'sol' || yon === 'sag' ? W : H) * OLCUM_BANDI));
  const orn = [];
  for (let u = 0; u < uzun; u++) {
    for (let d = 0; d < kalinlik; d++) {
      const x = yon === 'sol' ? d : yon === 'sag' ? W - 1 - d : u;
      const y = yon === 'ust' ? d : yon === 'alt' ? H - 1 - d : u;
      const i = (y * W + x) * K;
      orn.push(L(data[i], data[i + 1], data[i + 2]));
    }
  }
  orn.sort((a, b) => a - b);
  return orn[Math.floor(orn.length / 2)];
}

async function isle(ad, yazmaVar) {
  const giris = path.join(MEDYA, `${ad}.webp`);
  const { data, info } = await sharp(giris).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: K } = info;

  const ton = {
    sol: kenarTonu(data, W, H, K, 'sol'),
    sag: kenarTonu(data, W, H, K, 'sag'),
    ust: kenarTonu(data, W, H, K, 'ust'),
    alt: kenarTonu(data, W, H, K, 'alt'),
  };
  const hedef = (ton.sol + ton.sag + ton.ust + ton.alt) / 4;
  const delta = {
    sol: hedef - ton.sol, sag: hedef - ton.sag,
    ust: hedef - ton.ust, alt: hedef - ton.alt,
  };
  const oncesi = Math.max(...Object.values(ton)) - Math.min(...Object.values(ton));

  if (!yazmaVar) return { ad, ton, delta, oncesi };

  const cikti = Buffer.from(data);
  const bantX = W * BANT;
  const bantY = H * BANT;

  for (let y = 0; y < H; y++) {
    const wUst = yumusak(1 - y / bantY);
    const wAlt = yumusak(1 - (H - 1 - y) / bantY);
    for (let x = 0; x < W; x++) {
      const wSol = yumusak(1 - x / bantX);
      const wSag = yumusak(1 - (W - 1 - x) / bantX);
      const toplam = wSol + wSag + wUst + wAlt;
      if (toplam <= 0) continue;

      // Kenarların ağırlıklı ortalaması; köşelerde iki kenar harmanlanır.
      const karisim = (wSol * delta.sol + wSag * delta.sag + wUst * delta.ust + wAlt * delta.alt) / toplam;
      const guc = Math.min(1, Math.max(wSol, wSag, wUst, wAlt));

      const i = (y * W + x) * K;
      const l = L(data[i], data[i + 1], data[i + 2]);

      // Yerel zemin tonu: hangi kenara yakınsak onunki
      const yerel = (wSol * ton.sol + wSag * ton.sag + wUst * ton.ust + wAlt * ton.alt) / toplam;
      // İçerik (yazı, ikon, nesne) düzeltmeden muaf
      const zeminlik = yumusak(1 - Math.abs(l - yerel) / ICERIK_SAPMASI);
      if (zeminlik <= 0) continue;

      const d = karisim * guc * zeminlik;
      cikti[i] = kisitla(data[i] + d);
      cikti[i + 1] = kisitla(data[i + 1] + d);
      cikti[i + 2] = kisitla(data[i + 2] + d);
    }
  }

  await sharp(cikti, { raw: { width: W, height: H, channels: K } })
    /* Kalite 92: kaynak dosyalar zaten kayıplı WebP, bu ikinci nesil.
       88'de yeniden sıkıştırma düzeltme bandının DIŞINDA da 20/255'e
       varan oynamalar yapıyordu; 92'de bu 6/255'in altına iniyor ve
       dosya boyutu kabul edilebilir kalıyor. Kayıpsız yazmak dosyayı
       6 katına çıkarıyordu, site için uygun değil. */
    .webp({ quality: 92, effort: 6 })
    .toFile(giris + '.yeni');

  return { ad, ton, delta, oncesi, gecici: giris + '.yeni' };
}

const yazmaVar = !process.argv.includes('--kontrol');
for (const ad of DOSYALAR) {
  const s = await isle(ad, yazmaVar);
  console.log(
    `${ad.padEnd(20)} ton sol ${s.ton.sol.toFixed(1)} sağ ${s.ton.sag.toFixed(1)} ` +
    `üst ${s.ton.ust.toFixed(1)} alt ${s.ton.alt.toFixed(1)}  dengesizlik ${s.oncesi.toFixed(1)}` +
    (s.gecici ? '  → yazıldı' : '')
  );
}
