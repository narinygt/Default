/**
 * Schema.org yapısal verisi.
 * =================================================================
 * ÖNEMLİ: Doldurulmamış (TODO) kurumsal alanlar yapısal veriye HİÇ
 * yazılmaz. Arama motoruna "TODO: +90 ___" göndermek, boş bırakmaktan
 * çok daha kötüdür. `clean()` bu alanları sessizce eler; bilgi
 * girildiği anda schema kendiliğinden zenginleşir.
 */
import { SITE_URL, site, officeHours, isTodo, mapsUrl } from '@/config/site';
import { path, type Lang, type RouteRef } from '@/i18n/routes';

/** TODO placeholder ise undefined döndürür — schema'ya yazılmaz. */
const clean = (value: string): string | undefined => (isTodo(value) ? undefined : value);

/** undefined alanları nesneden ayıklar. */
const compact = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;

export const abs = (p: string): string => new URL(p, SITE_URL).href;

const description: Record<Lang, string> = {
  tr: 'SAP finans modülleri, S/4HANA dönüşümü ve SAP bulut mimarisi üzerine çalışan bağımsız danışmanlık şirketi.',
  en: 'Independent consultancy specialising in SAP finance modules, S/4HANA transformation and SAP cloud architecture.',
};

/** Organization + ProfessionalService — her sayfada bulunur. */
export function organizationSchema(lang: Lang) {
  const address = compact({
    '@type': 'PostalAddress',
    streetAddress: clean(site.contact.address.street),
    addressLocality: clean(site.contact.address.city),
    addressRegion: clean(site.contact.address.district),
    postalCode: clean(site.contact.address.postalCode),
    addressCountry: site.contact.address.country,
  });

  const sameAs = [clean(site.contact.linkedin)].filter(Boolean);

  return compact({
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: site.name,
    url: abs(path({ page: 'home' }, lang)),
    logo: abs(site.logo.src),
    description: description[lang],
    email: clean(site.contact.email),
    telephone: clean(site.contact.phone),
    // Yalnızca ülke dışında bir alan doldurulmuşsa adres yazılır.
    address: Object.keys(address).length > 2 ? address : undefined,
    // Sayfadaki adres bağlantısının aynısı — adres eksikse `null` gelir, yazılmaz.
    hasMap: mapsUrl() ?? undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    areaServed: [
      { '@type': 'Country', name: 'Türkiye' },
      { '@type': 'AdministrativeArea', name: 'EMEA' },
    ],
    knowsAbout: [
      'SAP FI',
      'SAP CO',
      'SAP S/4HANA',
      'SAP Cloud ERP Public Edition',
      'SAP Cloud ERP Private Edition',
      'RISE with SAP',
      'Financial close automation',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: officeHours.days,
      opens: officeHours.opens,
      closes: officeHours.closes,
    },
  });
}

/** WebSite — arama motorunun dil sürümlerini eşlemesine yardım eder. */
export function webSiteSchema(lang: Lang) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    inLanguage: lang,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/** Çözüm sayfaları için Service. */
export function serviceSchema(opts: {
  lang: Lang;
  name: string;
  description: string;
  ref: RouteRef;
  serviceType: string;
}) {
  return {
    '@type': 'Service',
    '@id': `${abs(path(opts.ref, opts.lang))}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    provider: { '@id': `${SITE_URL}/#organization` },
    url: abs(path(opts.ref, opts.lang)),
    areaServed: [
      { '@type': 'Country', name: 'Türkiye' },
      { '@type': 'AdministrativeArea', name: 'EMEA' },
    ],
  };
}

/** Akordeon SSS bölümleri için FAQPage. */
export function faqSchema(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Kırıntı navigasyonu. */
export function breadcrumbSchema(
  lang: Lang,
  trail: ReadonlyArray<{ name: string; ref: RouteRef }>,
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(path(item.ref, lang)),
    })),
  };
}

/** Parçaları tek bir @graph içinde birleştirir. */
export function buildGraph(...nodes: unknown[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  });
}
