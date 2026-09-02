/**
 * REFERANS LOGOLARI
 * =================================================================
 * Liste sabittir: logo eklenmez, çıkarılmaz. Yalnızca görüntüleme
 * ölçüleri burada ayarlanır.
 *
 * NEDEN HER LOGOYA AYRI GENİŞLİK:
 * Logoların en-boy oranı 0.81 (İETT, dikey) ile 7.67 (Hidromek,
 * çok yatay) arasında değişiyor — dokuz kat fark. Hepsine aynı
 * yüksekliği vermek (eski yöntem) dikey logoları devleştirip yatay
 * olanları şeride eziyor; hepsine aynı genişliği vermek bunun
 * tersini yapıyor. İkisi de "nizami" görünmüyor.
 *
 * Bunun yerine ORTAK BİR YÜKSEKLİK TAVANI + logoya özel GENİŞLİK
 * TAVANI kullanılır. Logo, iki tavandan hangisine önce değerse orada
 * durur; oranı hiç bozulmaz (`object-fit: contain`). Genişlik değerleri
 * orana göre kademelendirilmiştir:
 *
 *   oran < 1.4   dikey/kare   dar kutu   → yükseklik tavanına dayanır
 *   1.4 – 2.6    normal       orta kutu
 *   2.6 – 4.5    yatay        geniş kutu
 *   > 4.5        çok yatay    en geniş kutu (yoksa şerit gibi incelir)
 *
 * Amaç eşit piksel değil, ekranda benzer GÖRSEL AĞIRLIK: çok yatay bir
 * kelime-logo daha alçak ama daha geniş, dikey bir amblem daha dar ama
 * tam yükseklikte durur.
 *
 * `w` = masaüstündeki genişlik tavanı (px). Dar ekranlarda tek bir
 * ölçek katsayısıyla (--k) topluca küçültülür.
 * `iw`/`ih` = dosyanın doğal boyutu; CLS'i önlemek için gereklidir.
 */

export interface ReferenceLogo {
  src: string;
  alt: string;
  /** Doğal genişlik/yükseklik — layout kaymasını önler. */
  iw: number;
  ih: number;
  /** Masaüstü genişlik tavanı (px). Orana göre kademelendirilmiştir. */
  w: number;
}

export const references: readonly ReferenceLogo[] = [
  // oran 3.95 — yatay
  { src: '/logos/mercedes-benz.svg', alt: 'Mercedes-Benz Türkiye', iw: 1400, ih: 354, w: 150 },
  // oran 2.07 — normal. Dosyanın tuvali 100×100 kareydi ve çizim ortada
  // duruyordu (üstte %33, altta %33 boşluk); logo diğerlerinin üçte biri
  // kadar görünüyordu. viewBox çizim sınırlarına kırpıldı — renk, şekil
  // ve oran değişmedi, yalnızca boş tuval kaldırıldı.
  { src: '/logos/pwc.svg', alt: 'PwC', iw: 70, ih: 34, w: 96 },
  // oran 2.28 — normal
  { src: '/logos/fusion-consulting.svg', alt: 'Fusion Consulting', iw: 66, ih: 29, w: 104 },
  // oran 3.24 — yatay
  { src: '/logos/boehringer-ingelheim.svg', alt: 'Boehringer Ingelheim', iw: 583, ih: 180, w: 142 },
  // oran 4.11 — yatay. Tuvalinde %50 dikey boşluk vardı; viewBox çizim
  // sınırlarına kırpıldı. Gerçek oran ortaya çıkınca kutu genişletildi.
  { src: '/logos/wavin.svg', alt: 'Orbia Wavin Netherlands', iw: 285, ih: 69, w: 148 },
  // oran 1.56 — normal (dar tarafta)
  { src: '/logos/imerys.webp', alt: 'Imerys', iw: 700, ih: 450, w: 78 },
  // oran 3.17 — yatay
  { src: '/logos/gsk.webp', alt: 'GSK', iw: 700, ih: 221, w: 138 },
  // oran 1.75 — normal (dar tarafta)
  { src: '/logos/beko.svg', alt: 'BEKO', iw: 100, ih: 57, w: 82 },
  // oran 7.67 — en yatay logo; en geniş kutu. Dosyada ayrıca %27 dikey
  // şeffaf boşluk var (görünen çizimin gerçek oranı 10.19), bu yüzden
  // kutu bir miktar daha geniş: yoksa görünen yazı fazla inceliyor.
  { src: '/logos/hidromek.webp', alt: 'Hidromek Türkiye', iw: 560, ih: 73, w: 230 },
  // oran 5.06 — çok yatay
  { src: '/logos/flint.webp', alt: 'Flint Group', iw: 435, ih: 86, w: 165 },
  // oran 1.93 — normal (dar tarafta)
  { src: '/logos/peri.svg', alt: 'PERI', iw: 110, ih: 57, w: 88 },
  // oran 5.06 — çok yatay
  { src: '/logos/enerjisa.svg', alt: 'Enerjisa', iw: 243, ih: 48, w: 160 },
  // oran 1.64 — normal (dar tarafta)
  { src: '/logos/aydem.webp', alt: 'Aydem', iw: 700, ih: 428, w: 80 },
  // oran 2.19 — normal
  { src: '/logos/nuh-cimento.webp', alt: 'Nuh Çimento', iw: 300, ih: 137, w: 98 },
  // oran 4.41 — yatay
  { src: '/logos/belbim.svg', alt: 'Belbim', iw: 119, ih: 27, w: 152 },
  // oran 1.09 — kare
  { src: '/logos/tcdd.webp', alt: 'TCDD', iw: 300, ih: 276, w: 52 },
  // oran 0.81 — tek dikey logo
  { src: '/logos/iett.svg', alt: 'İETT', iw: 89, ih: 110, w: 44 },
];
