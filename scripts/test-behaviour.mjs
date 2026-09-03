/**
 * DAVRANIŞ TESTLERİ — dist/ üzerinde gerçek tarayıcıyla.
 * Form doğrulaması, dil değiştirici, menü, akordeon, çerez onayı.
 *
 *   node scripts/test-behaviour.mjs
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  try {
    const p = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = join(dist, p);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    } catch {
      file = join(dist, p, 'index.html');
    }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('404');
  }
});
await new Promise((r) => server.listen(4400, r));
const base = 'http://localhost:4400';

const browser = await chromium.launch();
const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`);
};

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const jsErrors = [];
page.on('pageerror', (e) => jsErrors.push(e.message));

/* ---------- 1. Form: boş gönderim engellenir ve hata gösterilir ---------- */
await page.goto(`${base}/tr/iletisim`, { waitUntil: 'networkidle' });
await page.click('[data-submit]');
await page.waitForTimeout(200);

const nameErr = await page.textContent('#err-name');
check('Boş form gönderilmiyor, ad alanı hatası çıkıyor', Boolean(nameErr?.trim()), nameErr?.trim());

const focused = await page.evaluate(() => document.activeElement?.id);
check('Odak ilk hatalı alana taşınıyor', focused === 'cf-name', `odak: ${focused}`);

const invalid = await page.getAttribute('#cf-name', 'aria-invalid');
check('Hatalı alan aria-invalid taşıyor', invalid === 'true');

/* ---------- 2. E-posta format doğrulaması ---------- */
await page.fill('#cf-email', 'bu-bir-eposta-degil');
await page.click('#cf-company');
await page.waitForTimeout(150);
const emailErr = (await page.textContent('#err-email'))?.trim();
check('Geçersiz e-posta net mesaj veriyor', Boolean(emailErr), emailErr);

await page.fill('#cf-email', 'ad.soyad@sirket.com');
await page.click('#cf-company');
await page.waitForTimeout(150);
const emailErr2 = (await page.textContent('#err-email'))?.trim();
check('Geçerli e-posta girilince hata siliniyor', !emailErr2);

/* ---------- 3. KVKK onayı zorunlu ---------- */
await page.fill('#cf-name', 'Test Kullanıcı');
await page.fill('#cf-company', 'Test A.Ş.');
await page.selectOption('#cf-topic', 's4hana');
await page.fill('#cf-message', 'Bu bir test mesajıdır ve yeterince uzundur.');
await page.click('[data-submit]');
await page.waitForTimeout(200);
const kvkkErr = (await page.textContent('#err-kvkk'))?.trim();
check('KVKK onayı olmadan gönderilmiyor', Boolean(kvkkErr), kvkkErr);

/* ---------- 4. Endpoint yokken sahte başarı gösterilmiyor ---------- */
await page.check('#cf-kvkk');
await page.waitForTimeout(3200); // bot kontrolü: 3 sn'lik alt sınırı aş
await page.click('[data-submit]');
await page.waitForTimeout(300);
const statusClass = (await page.getAttribute('[data-status]', 'class')) || '';
const statusText = (await page.textContent('[data-status]')) || '';
check(
  'Gönderim altyapısı yokken SAHTE başarı gösterilmiyor',
  statusClass.includes('is-pending') && !statusClass.includes('is-success'),
  statusText.slice(0, 60) + '…',
);

/* ---------- 5. Dil değiştirici aynı sayfada kalıyor ---------- */
await page.goto(`${base}/tr/cozumler/sap-private-cloud`, { waitUntil: 'networkidle' });
await page.click('.lang-switch a[hreflang="en"]');
await page.waitForLoadState('networkidle');
check(
  'Dil değiştirince aynı sayfanın karşılığına gidiliyor',
  page.url().endsWith('/en/solutions/sap-private-cloud'),
  page.url().replace(base, ''),
);

/* ---------- 6. Akordeon çalışıyor ---------- */
await page.goto(`${base}/tr/cozumler/s4hana-donusumu`, { waitUntil: 'networkidle' });
const firstOpen = await page.evaluate(() => document.querySelector('.acc-item')?.hasAttribute('open'));
await page.click('.acc-q');
await page.waitForTimeout(200);
const afterOpen = await page.evaluate(() => document.querySelector('.acc-item')?.hasAttribute('open'));
check('SSS akordeonu açılıyor', !firstOpen && afterOpen === true);

/* ---------- 7. Mobil menü ---------- */
const m = await browser.newPage({ viewport: { width: 390, height: 800 } });
await m.goto(`${base}/tr`, { waitUntil: 'networkidle' });
const hiddenBefore = await m.evaluate(() => document.querySelector('[data-mobile-menu]')?.hidden);
await m.click('[data-menu-toggle]');
await m.waitForTimeout(250);
const hiddenAfter = await m.evaluate(() => document.querySelector('[data-mobile-menu]')?.hidden);
const ctaVisible = await m.isVisible('.mobile-cta');
check('Mobil menü açılıyor', hiddenBefore === true && hiddenAfter === false);
check('Mobil menüde CTA butonu görünür', ctaVisible);
await m.keyboard.press('Escape');
await m.waitForTimeout(200);
const hiddenEsc = await m.evaluate(() => document.querySelector('[data-mobile-menu]')?.hidden);
check('Escape ile menü kapanıyor', hiddenEsc === true);
await m.close();

/* ---------- 7b. Menü düğmesi aşağı kaydırılmışken de TEK dokunuşta açılır ----------
   Kullanıcının bildirdiği hata buydu: sayfa kaydırıldıktan sonra düğme
   bazen tepki vermiyordu. Header o sırada 76 px'ten 60 px'e küçülüp
   düğmeyi yukarı kaydırdığı için, dokunuşun düğmenin kaydırmadan ÖNCEKİ
   konumuna gelmesi de ayrıca sınanır. */
const mt = await browser.newPage({
  viewport: { width: 390, height: 800 },
  hasTouch: true,
  isMobile: true,
});
await mt.goto(`${base}/tr`, { waitUntil: 'networkidle' });
const kutuTepede = await mt.evaluate(() => {
  const b = document.querySelector('[data-menu-toggle]').getBoundingClientRect();
  return { cx: b.x + b.width / 2, cy: b.y + b.height / 2 };
});

let dokunusBasarili = 0;
for (const y of [400, 1500, 3000]) {
  await mt.evaluate((v) => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, v);
  }, y);
  await mt.waitForTimeout(400);
  // Parmak, kaydırmadan önceki konuma basıyor.
  await mt.touchscreen.tap(kutuTepede.cx, kutuTepede.cy);
  await mt.waitForTimeout(200);
  const acik = await mt.evaluate(() => !document.querySelector('[data-mobile-menu]').hidden);
  if (acik) dokunusBasarili += 1;
  if (acik) {
    await mt.keyboard.press('Escape');
    await mt.waitForTimeout(200);
  }
}
check(
  'Aşağı kaydırılmışken düğme tek dokunuşta açıyor',
  dokunusBasarili === 3,
  `${dokunusBasarili}/3 konumda açıldı`,
);

/* Küçülmüş header ile menünün üst kenarı çakışmalı; arada sayfa içeriğinin
   göründüğü bir şerit kalmamalı. */
await mt.touchscreen.tap(kutuTepede.cx, kutuTepede.cy);
await mt.waitForTimeout(300);
const hiza = await mt.evaluate(() => ({
  menuTop: document.querySelector('[data-mobile-menu]').getBoundingClientRect().top,
  headerBottom: document.querySelector('.header-inner').getBoundingClientRect().bottom,
}));
check(
  'Menü, küçülmüş header ile boşluksuz hizalanıyor',
  Math.abs(hiza.menuTop - hiza.headerBottom) < 1,
  `menü ${hiza.menuTop}px / header altı ${hiza.headerBottom}px`,
);

/* Kaydırma eşiği çevresindeki küçük hareketler header'ı açıp kapatmamalı
   (histerezis). Aksi halde düğme parmağın altında sürekli yer değiştirir. */
await mt.evaluate(() => window.scrollTo(0, 0));
await mt.waitForTimeout(400);
const degisim = await mt.evaluate(async () => {
  const h = document.querySelector('[data-header]');
  let sayac = 0;
  let onceki = h.hasAttribute('data-scrolled');
  for (const y of [10, 26, 18, 30, 20, 28, 16, 25, 22, 27]) {
    window.scrollTo(0, y);
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => setTimeout(r, 60));
    const simdi = h.hasAttribute('data-scrolled');
    if (simdi !== onceki) sayac += 1;
    onceki = simdi;
  }
  return sayac;
});
check('Eşik çevresinde header durumu titremiyor', degisim === 0, `${degisim} durum değişimi`);

/* ---------- 7c. Menü kaydırılmışken GERÇEKTEN çiziliyor mu? ----------
   Asıl hata buydu ve yalnızca yüksekliği ölçmek yakalıyor.

   `backdrop-filter`, uygulandığı öğeyi içindeki `position: fixed`
   çocuklar için bir "içeren blok" yapar. Bulanıklık .site-header
   üzerindeyken, çocuğu olan mobil menü viewport'a değil header'ın
   kutusuna hizalanıp 390×1 px'e iniyordu: düğme çarpıya dönüyor, sayfa
   kaydırma kilitleniyor (kullanıcıya donma gibi görünüyor) ama menü
   ekranda yok. Sayfanın tepesinde bulanıklık uygulanmadığı için sorun
   yalnızca aşağı kaydırıldığında çıkıyordu.

   Bu yüzden burada `top` değil YÜKSEKLİK ve genişlik ölçülür; ayrıca
   menünün fixed hizasının header'a kaymadığı doğrulanır. */
await mt.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, 1500);
});
await mt.waitForTimeout(500);
if (!(await mt.evaluate(() => document.querySelector('[data-mobile-menu]').hidden))) {
  await mt.keyboard.press('Escape');
  await mt.waitForTimeout(250);
}
const kutuKaydirilmis = await mt.evaluate(() => {
  const r = document.querySelector('[data-menu-toggle]').getBoundingClientRect();
  return { cx: r.x + r.width / 2, cy: r.y + r.height / 2 };
});
await mt.touchscreen.tap(kutuKaydirilmis.cx, kutuKaydirilmis.cy);
await mt.waitForTimeout(400);
const cizim = await mt.evaluate(() => {
  const m = document.querySelector('[data-mobile-menu]');
  const r = m.getBoundingClientRect();
  return {
    w: Math.round(r.width),
    h: Math.round(r.height),
    // fixed menü viewport'a hizalıysa offsetParent yoktur.
    hizaHeaderaKaydi: m.offsetParent !== null,
    ilkBaglantiGorunur: (() => {
      const a = m.querySelector('a');
      const ar = a.getBoundingClientRect();
      return ar.height > 0 && ar.bottom <= window.innerHeight;
    })(),
  };
});
check(
  'Kaydırılmışken menü ekranı gerçekten kaplıyor',
  cizim.h > 400 && cizim.w > 300 && !cizim.hizaHeaderaKaydi && cizim.ilkBaglantiGorunur,
  `menü ${cizim.w}×${cizim.h}px, header'a hizalandı: ${cizim.hizaHeaderaKaydi ? 'EVET (hata)' : 'hayır'}`,
);

/* Açık menü, çerez banner'ının üstünde kalmalı — yoksa banner menünün
   alt kısmını ve CTA'sını kapatıyor. */
const ustte = await mt.evaluate(() => {
  const cta = document.querySelector('.mobile-cta');
  const cr = cta.getBoundingClientRect();
  const ortaX = cr.x + cr.width / 2;
  const ortaY = cr.y + cr.height / 2;
  const enUstte = document.elementFromPoint(ortaX, ortaY);
  return { ctaErisilebilir: cta.contains(enUstte) || cta === enUstte, ustteki: enUstte?.className ?? '' };
});
check(
  'Açık menüde CTA çerez banner\'ının altında kalmıyor',
  ustte.ctaErisilebilir,
  ustte.ctaErisilebilir ? '' : `CTA'nın üstünde: "${ustte.ustteki}"`,
);
await mt.close();

/* ---------- 8. Çerez banner'ı: reddet analitiği yüklemiyor ---------- */
const c = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await c.goto(`${base}/tr`, { waitUntil: 'networkidle' });
const bannerShown = await c.isVisible('[data-cookie-banner]');
check('Çerez banner\'ı ilk ziyarette görünüyor', bannerShown);

const btnSizes = await c.evaluate(() => {
  const r = document.querySelector('[data-cookie-reject]')?.getBoundingClientRect();
  const a = document.querySelector('[data-cookie-accept]')?.getBoundingClientRect();
  return r && a ? { rw: Math.round(r.width), aw: Math.round(a.width) } : null;
});
check(
  'Reddet ve kabul et aynı görsel ağırlıkta',
  btnSizes !== null && Math.abs(btnSizes.rw - btnSizes.aw) <= 2,
  btnSizes ? `reddet ${btnSizes.rw}px / kabul ${btnSizes.aw}px` : '',
);

await c.click('[data-cookie-reject]');
await c.waitForTimeout(300);
const gaLoaded = await c.evaluate(() => Boolean(document.getElementById('ga-src')));
const bannerGone = await c.evaluate(() => document.querySelector('[data-cookie-banner]')?.hidden);
check('Reddedince analitik YÜKLENMİYOR', !gaLoaded);
check('Reddedince banner kapanıyor', bannerGone === true);
await c.close();

/* ---------- 9. Klavye ile gezinme: skip link ---------- */
await page.goto(`${base}/tr`, { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
const firstFocus = await page.evaluate(() => document.activeElement?.className);
check('İlk Tab "içeriğe geç" bağlantısına gidiyor', String(firstFocus).includes('skip-link'));

/* ---------- 10. Scroll'da header küçülüp koyulaşıyor ---------- */
await page.goto(`${base}/tr`, { waitUntil: 'networkidle' });
const headerBefore = await page.evaluate(() => {
  const h = document.querySelector('[data-header]');
  return {
    scrolled: h.hasAttribute('data-scrolled'),
    height: Math.round(h.querySelector('.header-inner').getBoundingClientRect().height),
    bg: getComputedStyle(h).backgroundColor,
    lightLogo: getComputedStyle(h.querySelector('.brand-light')).display,
  };
});
await page.mouse.wheel(0, 600);
await page.waitForTimeout(500);
const headerAfter = await page.evaluate(() => {
  const h = document.querySelector('[data-header]');
  return {
    scrolled: h.hasAttribute('data-scrolled'),
    height: Math.round(h.querySelector('.header-inner').getBoundingClientRect().height),
    // Zemin ve bulanıklık ::before katmanında durur: doğrudan header'a
    // uygulanınca içindeki fixed menüyü kırıyordu (bkz. 7c).
    bg: getComputedStyle(h).backgroundColor,
    lightLogo: getComputedStyle(h.querySelector('.brand-light')).display,
    darkLogo: getComputedStyle(h.querySelector('.brand-dark')).display,
  };
});
check(
  'Scroll edilince header küçülüyor',
  !headerBefore.scrolled && headerAfter.scrolled && headerAfter.height < headerBefore.height,
  `${headerBefore.height}px -> ${headerAfter.height}px`,
);
check(
  'Scroll edilince header yarı saydam koyu zemin alıyor',
  // Ana sayfanın hero'su tam ekran koyu görsel olduğu için header
  // TEPEDE DE koyudur (opak --surface-darkest); scroll'da yarı saydam
  // sürüme geçer. Eskiden tepede saydamdı — hero açık zeminliydi.
  headerBefore.bg === 'rgb(12, 74, 76)' && headerAfter.bg.startsWith('rgba(12, 74, 76'),
  headerAfter.bg,
);
check(
  'Koyu zeminde logo açık sürüme geçiyor',
  headerAfter.lightLogo === 'none' && headerAfter.darkLogo === 'block',
);

/* ---------- 11. JS hatası yok ---------- */
check('Sayfalarda JavaScript hatası yok', jsErrors.length === 0, jsErrors.join(' | '));

await browser.close();
server.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} test geçti.`);
if (failed.length) process.exit(1);
