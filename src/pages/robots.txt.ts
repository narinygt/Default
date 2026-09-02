/**
 * robots.txt — statik dosya değil, config'den üretilir.
 * Böylece SITE_URL değiştiğinde sitemap adresi kendiliğinden düzelir;
 * elle güncellenmesi unutulan bir dosya kalmaz.
 */
import type { APIRoute } from 'astro';
import { SITE_URL } from '@/config/site';

export const GET: APIRoute = () => {
  const body = `# CPeak Consultancy
# Site tamamen dizine açıktır; gizlenen bölüm yoktur.

User-agent: *
Allow: /

# Kök adres ziyaretçiyi tarayıcı diline göre yönlendirir ve
# noindex taşır; dizine girmesi gereken adresler /tr ve /en altındadır.

Sitemap: ${new URL('/sitemap.xml', SITE_URL).href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
