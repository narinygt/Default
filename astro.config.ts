import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/config/site';

/** Geçici demo tünellerinin alan adları — baştaki nokta alt alanları kapsar. */
const TUNNEL_HOSTS = [
  '.trycloudflare.com', // cloudflared quick tunnel (hesap gerektirmez)
  '.loca.lt', // localtunnel
  '.ngrok-free.app',
  '.ngrok.io',
];

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // Küçük stil dosyalarını HTML'e gömer — "kritik CSS inline" gereksinimi.
    inlineStylesheets: 'auto',
    format: 'directory',
  },
  // Sitemap elle üretilir: src/pages/sitemap.xml.ts
  // Gerekçe o dosyanın başındaki açıklamada.
  integrations: [],

  /**
   * TÜNEL ÜZERİNDEN ERİŞİM
   * ---------------------------------------------------------------
   * Vite, bilinmeyen bir `Host` başlığıyla gelen istekleri güvenlik
   * gereği reddeder ("Blocked request. This host is not allowed").
   * Tünel adresleri (`*.trycloudflare.com` gibi) tam olarak bu duruma
   * girer ve dev/preview sunucusu boş sayfa döner.
   *
   * Aşağıdaki liste yalnızca bilinen tünel sağlayıcılarını açar;
   * `true` ile hepsini açmak DNS rebinding'e kapı aralar, o yüzden
   * tek tek yazıldı.
   *
   * NOT: `npm run share` bu ayara ihtiyaç duymaz — o, dist/ klasörünü
   * kendi bağımsız sunucusuyla yayınlar ve Host denetimi yapmaz.
   * Bu ayar yalnızca `npm run dev` / `npm run preview` tünellemek
   * istediğinizde devreye girer.
   */
  vite: {
    server: { allowedHosts: TUNNEL_HOSTS },
    preview: { allowedHosts: TUNNEL_HOSTS },
  },
});
