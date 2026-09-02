/**
 * TEK KAYNAK — Kurumsal bilgiler.
 * =================================================================
 * Sitedeki tüm adres / telefon / e-posta / sicil bilgileri yalnızca
 * bu dosyadan okunur. Bir bilgiyi güncellemek için başka hiçbir
 * dosyaya dokunmanız gerekmez.
 *
 * `TODO` ile başlayan değerler DOLDURULMAMIŞ placeholder'lardır.
 * Sitede kesikli çerçeveyle ve "doldurulacak" etiketiyle görünürler,
 * böylece yayına yanlışlıkla uydurma bilgiyle çıkılmaz.
 * Gerçek değeri yazdığınız anda uyarı biçimlendirmesi kendiliğinden kalkar.
 */

/** Doldurulmamış alanları işaretleyen önek. */
export const TODO = 'TODO:';

/** Bir değerin hâlâ placeholder olup olmadığını söyler. */
export const isTodo = (value: string): boolean => value.startsWith(TODO);

/** Placeholder önekini ayıklayıp gösterilecek metni döndürür. */
export const todoLabel = (value: string): string =>
  isTodo(value) ? value.slice(TODO.length).trim() : value;

/**
 * Yayın alan adı. `.example` tescil edilemeyen ayrılmış bir uzantıdır;
 * kimsenin gerçek alan adına çakışmaz. Canonical URL, hreflang ve
 * sitemap.xml bu değerden üretilir — DEPLOY ÖNCESİ MUTLAKA DEĞİŞTİRİN.
 */
export const SITE_URL = 'https://www.cpeakconsultancy.com';

export const site = {
  name: 'CPeak Consultancy',
  /**
   * Logo. Dosyaların ÜZERİNE yazın; kodda değişiklik gerekmez.
   * Şu an public/brand/ içinde geçici placeholder'lar duruyor.
   */
  logo: {
    src: '/brand/cpeak-logo.svg',
    /**
     * Koyu zeminde (scroll'lu header, footer) kullanılan sürüm.
     * `npm run assets` ile açık sürümden BEYAZ knockout olarak türetilir:
     * logonun lacivert kısmı footer zeminiyle aynı renk olduğu için
     * orijinal dosya koyu zeminde okunmuyor. Ayrıntı için
     * scripts/make-brand-assets.mjs başındaki açıklamaya bakın.
     */
    srcOnDark: '/brand/cpeak-logo-on-dark.svg',
    /** Logonun doğal en/boy oranı (viewBox) — CLS'i önlemek için. */
    width: 1717,
    height: 591,
  },
  contact: {
    email: 'info@cpeakconsultancy.com',
    phone: '+90 (507) 032 81 70',
    linkedin: 'https://tr.linkedin.com/company/cpeak-consultancy',
    address: {
      street: 'Bostancı Mahallesi, Şemsettin Günaltay Caddesi No: 31/8',
      district: 'Kadıköy',
      city: 'İstanbul',
      postalCode: '34744',
      country: 'TR',
    },
    /** Ziyaretçiye verilen yanıt süresi taahhüdü — metinlerde de geçer. */
    responseTimeHours: 1, // bir iş günü
  },
  /** Ticaret sicil / vergi bilgileri — footer'da yasal olarak gerekir. */
  legal: {
    companyLegalName: `${TODO} CPeak Danışmanlık A.Ş. / Ltd. Şti. (tam unvan)`,
    tradeRegistryNo: `${TODO} Ticaret Sicil No`,
    taxOffice: `${TODO} Vergi Dairesi`,
    taxNo: `${TODO} Vergi No`,
    mersisNo: `${TODO} MERSİS No`,
  },
  /**
   * ANA SAYFA HERO GÖRSELİ — dört seçenek arasında geçiş yapar.
   * Tek yapmanız gereken aşağıdaki değeri değiştirmek.
   *
   *   'ledger'     Defter çizgilerinden ağ grafiğine dönüşen imza öğesi.
   *                Markaya özgü, paletle birebir uyumlu. (varsayılan)
   *
   *   'image'      public/media/hero-team.webp, lacivert panel içinde.
   *                (Kullanıcı tarafından sağlanan fotoğraf — 2026-08-30'da
   *                kuantum görselinin yerine geçti.)
   *
   *   'duotone'    Eski kuantum görselinin marka renklerine indirgenmiş
   *                sürümü. 'image' artık farklı bir kaynak kullandığı için
   *                bu seçenek kuantum görseliyle kalmaya devam ediyor.
   *
   *   'background' Hero'nun tamamı koyu zemin olur, görsel sağa yaslı
   *                fon olarak akar, metin beyaza döner. 'image' ile aynı
   *                kaynağı (hero-team.webp) kullanır.
   *
   * NOT: hero-team.webp 1200×800 — 'background' seçeneğinde çok geniş
   * ekranlarda görsel doğal boyutunun ötesine büyütülmez; sağa yaslanıp
   * zemine karışır. Tam genişlikte keskin bir fon isteniyorsa daha geniş
   * bir kaynak gerekir.
   */
  hero: {
    visual: 'ledger' as 'ledger' | 'image' | 'duotone' | 'background',
  },

  /** Google Analytics 4 ölçüm kimliği. Boş bırakılırsa GA hiç yüklenmez. */
  analytics: {
    ga4MeasurementId: '', // örn. 'G-XXXXXXXXXX'
  },
  /**
   * İletişim formu. Gönderim altyapısı 2. fazda kurulacak.
   *
   * `endpoint` BOŞ olduğu sürece form gerçekten göndermez ve
   * ziyaretçiye sahte bir "teşekkürler" GÖSTERMEZ — bunun yerine
   * durumu açıkça söyleyip doğrudan e-posta adresini verir.
   * Endpoint yazıldığı anda form JSON POST etmeye başlar.
   */
  form: {
    endpoint: '', // örn. '/api/contact' veya harici bir servis URL'i
    recipient: 'dummy@dummy.com',
  },
} as const;

/**
 * Adresi görüntülenecek satırlara böler.
 *
 * Birden fazla alanı birleştiren satırlarda (posta kodu + ilçe),
 * parçalardan HERHANGİ BİRİ doldurulmamışsa satırın tamamı
 * "beklemede" sayılır. Aksi halde yarı dolu bir satır ekranda
 * gerçek adres gibi görünür — sitenin kaçınmak istediği tam olarak
 * budur.
 */
export function addressLines(): { text: string; pending: boolean }[] {
  const a = site.contact.address;

  const line = (...parts: string[]) => ({
    text: parts.map(todoLabel).join(' ').trim(),
    pending: parts.some(isTodo),
  });

  return [line(a.street), line(a.postalCode, a.district), line(a.city)];
}

/**
 * Adresin tek satırlık hâli — harita servisine verilen sorgu metni.
 *
 * Adresin HERHANGİ bir parçası hâlâ placeholder ise `null` döner:
 * yarım bir adresle harita açmak ziyaretçiyi yanlış noktaya götürür,
 * bağlantıyı hiç göstermemek daha doğrudur.
 */
export function addressQuery(): string | null {
  const a = site.contact.address;
  const parts = [a.street, a.postalCode, a.district, a.city];
  if (parts.some(isTodo)) return null;

  return `${a.street}, ${a.postalCode} ${a.district}, ${a.city}`;
}

/**
 * Adresin harita bağlantısı.
 *
 * Google Maps'in resmi "search" uç noktası kullanılır: platformdan
 * bağımsızdır — mobilde yüklü Maps uygulamasını, masaüstünde tarayıcıyı
 * açar. API anahtarı gerektirmez, sayfaya üçüncü taraf script yüklemez.
 *
 * Adres tamamlanmadıysa `null` döner; çağıran taraf bağlantıyı basmaz.
 */
export function mapsUrl(): string | null {
  const query = addressQuery();
  if (query === null) return null;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Haftalık çalışma saatleri — hem sayfada hem schema.org verisinde kullanılır. */
export const officeHours = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const,
  opens: '09:00',
  closes: '18:00',
  timezone: 'Europe/Istanbul',
};
