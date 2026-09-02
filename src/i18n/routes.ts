/**
 * ROUTE TABLOSU — sitenin omurgası.
 * =================================================================
 * Her sayfa burada TEK bir kayıt olarak tanımlanır ve her kayıt her
 * dilde bir slug taşımak ZORUNDADIR (TypeScript bunu derleme anında
 * denetler). Sayfalar bu tablodan üretildiği için:
 *
 *   • bir dilde var olup diğerinde olmayan sayfa oluşamaz,
 *   • dil değiştirici her zaman aynı sayfanın karşılığını bulur,
 *   • hreflang ve sitemap kendiliğinden tutarlı kalır.
 *
 * Yeni sayfa eklemek = buraya bir satır eklemek.
 */

export const LANGS = ['tr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'tr';

/** <html lang> ve hreflang için tam dil etiketleri. */
export const HTML_LANG: Record<Lang, string> = {
  tr: 'tr-TR',
  en: 'en',
};

/** Her dilde bir slug taşımayı zorunlu kılan tip. */
type Slugs = Record<Lang, string>;

/** Beş çözüm sayfası. Sıra, sitedeki gösterim sırasıdır. */
export const SOLUTIONS = [
  { key: 'finance', slug: { tr: 'sap-finans-modulleri', en: 'sap-finance-modules' } },
  { key: 's4hana', slug: { tr: 's4hana-donusumu', en: 's4hana-transformation' } },
  { key: 'publicCloud', slug: { tr: 'sap-public-cloud', en: 'sap-public-cloud' } },
  { key: 'privateCloud', slug: { tr: 'sap-private-cloud', en: 'sap-private-cloud' } },
  { key: 'ai', slug: { tr: 'yapay-zeka-ile-finans', en: 'ai-in-finance' } },
] as const satisfies ReadonlyArray<{ key: string; slug: Slugs }>;

export type SolutionKey = (typeof SOLUTIONS)[number]['key'];

export const SOLUTION_KEYS = SOLUTIONS.map((s) => s.key) as readonly SolutionKey[];

/** Üst düzey sayfalar. `home` kök sayfadır, slug'ı boştur. */
export const PAGES = {
  home: { tr: '', en: '' },
  solutions: { tr: 'cozumler', en: 'solutions' },
  approach: { tr: 'yaklasimimiz', en: 'approach' },
  about: { tr: 'hakkimizda', en: 'about' },
  contact: { tr: 'iletisim', en: 'contact' },
  privacy: { tr: 'kvkk-aydinlatma-metni', en: 'privacy-notice' },
  cookies: { tr: 'gizlilik-politikasi', en: 'cookie-policy' },
} as const satisfies Record<string, Slugs>;

export type PageKey = keyof typeof PAGES;

/**
 * Sitedeki her adresi tek bir tiple ifade eder.
 * Örn. `{ page: 'about' }` veya `{ solution: 's4hana' }`.
 */
export type RouteRef = { page: PageKey } | { solution: SolutionKey };

const solutionBySlug = new Map(SOLUTIONS.map((s) => [s.key, s]));

/** Bir route referansını verilen dildeki mutlak yola çevirir. */
export function path(ref: RouteRef, lang: Lang): string {
  if ('solution' in ref) {
    const entry = solutionBySlug.get(ref.solution);
    if (!entry) throw new Error(`Bilinmeyen çözüm anahtarı: ${ref.solution}`);
    return `/${lang}/${PAGES.solutions[lang]}/${entry.slug[lang]}`;
  }
  const slug = PAGES[ref.page][lang];
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

/** Sitedeki tüm route referansları — sitemap ve derleme denetimi için. */
export const ALL_ROUTES: RouteRef[] = [
  ...(Object.keys(PAGES) as PageKey[]).map((page) => ({ page })),
  ...SOLUTION_KEYS.map((solution) => ({ solution })),
];

/**
 * Diğer dildeki karşılık — dil değiştirici bunu kullanır.
 * Ziyaretçi bulunduğu sayfanın çevirisinde kalır, ana sayfaya atılmaz.
 */
export function alternates(ref: RouteRef): Record<Lang, string> {
  return { tr: path(ref, 'tr'), en: path(ref, 'en') };
}

/** `tr` -> `en`, `en` -> `tr`. */
export const otherLang = (lang: Lang): Lang => (lang === 'tr' ? 'en' : 'tr');
