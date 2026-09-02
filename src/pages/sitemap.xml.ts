/**
 * SITEMAP — route tablosundan üretilir.
 * =================================================================
 * Neden hazır entegrasyon yerine elle:
 *
 * @astrojs/sitemap, dil sürümlerini yol yapısına bakarak eşleştirir.
 * Bu sitede slug'lar dile göre değişiyor (cozumler ↔ solutions), o
 * yüzden entegrasyon sayfaları eşleştiremiyor ve 25 adresten yalnızca
 * birine hreflang ekleyebiliyordu. Ayrıca canonical'da olmayan sondaki
 * eğik çizgiyi ekliyor ve noindex olan kök adresi listeye koyuyordu.
 *
 * Route tablosu zaten her sayfanın her iki dildeki karşılığını biliyor;
 * buradan üretilen sitemap hem eksiksiz hem canonical ile birebir aynı.
 */
import type { APIRoute } from 'astro';
import { SITE_URL } from '@/config/site';
import { ALL_ROUTES, alternates, path, LANGS } from '@/i18n/routes';

const abs = (p: string) => new URL(p, SITE_URL).href;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const entries = ALL_ROUTES.flatMap((ref) => {
    const alt = alternates(ref);

    /** Her sayfa her iki dilde de listelenir; her ikisi de tam
        hreflang kümesini taşır (karşılıklılık şartı). */
    return LANGS.map((lang) => {
      const links = [
        ...LANGS.map(
          (l) =>
            `<xhtml:link rel="alternate" hreflang="${l}" href="${esc(abs(alt[l]))}"/>`,
        ),
        // x-default, dili tarayıcıya göre seçen kök adrese işaret eder.
        `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(SITE_URL + '/')}"/>`,
      ].join('');

      // Ana sayfa en yüksek, çözüm sayfaları yüksek öncelikli.
      const isHome = 'page' in ref && ref.page === 'home';
      const isLegal = 'page' in ref && (ref.page === 'privacy' || ref.page === 'cookies');
      const priority = isHome ? '1.0' : isLegal ? '0.3' : '0.8';

      return (
        `<url>` +
        `<loc>${esc(abs(path(ref, lang)))}</loc>` +
        links +
        `<lastmod>${lastmod}</lastmod>` +
        `<changefreq>${isLegal ? 'yearly' : 'monthly'}</changefreq>` +
        `<priority>${priority}</priority>` +
        `</url>`
      );
    });
  });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
    `xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join('\n') +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
