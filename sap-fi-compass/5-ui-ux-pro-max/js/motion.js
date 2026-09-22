/* ==========================================================================
   motion.js — Hareket katmanı (GSAP 3 + ScrollTrigger + SplitText + Lenis)
   --------------------------------------------------------------------------
   Kütüphaneler js/vendor/ altında YEREL — çevrimdışı kuralı bozulmaz.
   Site React değil; aynı kütüphaneler çerçevesiz kullanılır. Her çizimde
   (SAP.onRender) önceki sahne gsap.context ile geri alınır, yeni sahne
   kurulur: ScrollTrigger'lar, SplitText bölmeleri ve olay dinleyicileri
   birlikte temizlenir, bellek sızmaz.

   HER HAREKETİN BİR GEREKÇESİ VAR:
     · Yumuşak kaydırma (Lenis)  → uzun okuma sayfalarında sarsıntısız akış.
     · Başlık satır açılımı      → sayfanın ilk mesajına dikkat çekmek.
     · Komut alanı yazı ipucu    → alana ne yazılacağını göstermek.
     · (5. sürüm: paralaks kaldırıldı, kademe 40–50ms)
     · Manyetik ana düğme        → tek ana eylemin dokunulabilir olduğunu
                                   hissettirmek (yalnızca fareli cihaz).
     · Kart / bölüm girişleri    → içeriğin okuma sırasıyla belirmesi.
     · Okuma çubuğu (scrub)      → konu sayfasında nerede olunduğu.

   Hareket azaltma tercihi açıksa HİÇBİRİ çalışmaz: Lenis kurulmaz, sahne
   kurulmaz, sayfa durağan ve eksiksiz görünür.
   Yalnızca transform / opacity canlandırılır.
   ========================================================================== */

(function (SAP) {
  'use strict';

  if (!window.gsap || !window.ScrollTrigger) return;   // kütüphane yoksa site durağan çalışır
  var gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  if (window.SplitText) gsap.registerPlugin(window.SplitText);

  var azalt = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fare = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var EASE_IN = 'power4.out';     // ağır, yumuşak iniş — tüm girişler
  var EASE_UI = 'power3.out';

  /* ------------------------------------------------------ Lenis ---- */
  var lenis = null;
  if (!azalt && window.Lenis) {
    lenis = new window.Lenis({
      lerp: 0.1,
      smoothWheel: true,
      /* İç kaydırma kapları kendi kaydırmasını yapar: kenar çubuğu,
         arama paleti, mobil menü. */
      prevent: function (node) {
        return !!(node.closest && node.closest('.side-scroll, .palette-list, .sidebar.open, .cmd-res'));
      },
    });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  SAP.motion = {
    /** Bölüme kaydır. Lenis yoksa false döner, çağıran tarayıcıya bırakır. */
    scrollTo: function (el) {
      if (!lenis) return false;
      lenis.resize();   /* sayfa yüksekliği çizimden sonra değişmiş olabilir */
      lenis.scrollTo(el, { offset: -(16 + 60 + 24), duration: 1.2 });
      return true;
    },
  };

  /* ---------------------------------------------- okuma çubuğu ---- */
  var cubuk = document.createElement('div');
  cubuk.className = 'read-prog';
  cubuk.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cubuk);

  /* ------------------------------------------------ yardımcılar ---- */

  /** Başlığı satırlara böler; her satır maskenin altından yükselir. */
  function satirAc(el, gecikme) {
    if (!el || !window.SplitText) return;
    var s = window.SplitText.create(el, { type: 'lines,words', mask: 'lines', linesClass: 'st-line' });
    gsap.from(s.lines, { yPercent: 110, duration: 1.15, ease: EASE_IN, stagger: 0.09, delay: gecikme || 0 });
  }

  /** Görünüm alanına giren öğeler sırayla yükselir (tek sefer). */
  function kademeli(secici, host, y) {
    var els = host.querySelectorAll(secici);
    if (!els.length) return;
    /* ⚠️ autoAlpha DEĞİL opacity: visibility:hidden öğeler Tab sırasından
       düşer; klavye kullanıcısı henüz kaydırılmamış içeriği atlıyordu
       (keyboard-nav). Odak içeri girerse öğe beklemeden görünür olur. */
    gsap.set(els, { opacity: 0, y: y || 56 });
    ST.batch(els, {
      start: 'top 90%',
      once: true,
      onEnter: function (grup) {
        gsap.to(grup, { opacity: 1, y: 0, duration: 1, ease: EASE_IN, stagger: 0.04, overwrite: true });
      },
    });
    els.forEach(function (el) {
      el.addEventListener('focusin', function () {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.3, ease: EASE_UI, overwrite: true });
      }, { once: true });
    });
  }

  /** Manyetik düğme: imleci yumuşakça izler, iç daire biraz daha fazla. */
  function manyetik(btn) {
    if (!btn || !fare) return;
    var ic = btn.querySelector('.cta-ic');
    var x = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'power3' });
    var y = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'power3' });
    var ix = ic && gsap.quickTo(ic, 'x', { duration: 0.6, ease: 'power3' });
    var iy = ic && gsap.quickTo(ic, 'y', { duration: 0.6, ease: 'power3' });
    function hareket(e) {
      var r = btn.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      x(dx * 0.18); y(dy * 0.28);
      if (ic) { ix(dx * 0.12); iy(dy * 0.18); }
    }
    function birak() { x(0); y(0); if (ic) { ix(0); iy(0); } }
    btn.addEventListener('pointermove', hareket);
    btn.addEventListener('pointerleave', birak);
    return function () {
      btn.removeEventListener('pointermove', hareket);
      btn.removeEventListener('pointerleave', birak);
    };
  }

  /** Komut alanı ipucu: örnek kodlar yer tutucuda yazılıp silinir.
      Alana odaklanınca ya da bir şey yazılınca durur. */
  function yaziIpucu(input) {
    if (!input) return;
    var ornek = ['FB50', 'F110', 'BSEG', 'FBL1N', 'ACDOCA'];
    var ilk = input.getAttribute('placeholder');
    var tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, delay: 1.6 });
    ornek.forEach(function (kod) {
      var o = { n: 0 };
      tl.to(o, { n: kod.length, duration: kod.length * 0.09, ease: 'none', roundProps: 'n',
                 onUpdate: function () { input.setAttribute('placeholder', kod.slice(0, o.n)); } })
        .to(o, { n: 0, duration: kod.length * 0.05, ease: 'none', roundProps: 'n', delay: 1.4,
                 onUpdate: function () { input.setAttribute('placeholder', kod.slice(0, o.n)); } });
    });
    function dur() { tl.kill(); input.setAttribute('placeholder', ilk); }
    input.addEventListener('focus', dur, { once: true });
    return function () { tl.kill(); input.setAttribute('placeholder', ilk); input.removeEventListener('focus', dur); };
  }

  /* --------------------------------------------------- sahne ---- */
  var ctx = null, temizle = [];

  SAP.onRender(function (route, host) {
    if (ctx) ctx.revert();
    temizle.forEach(function (f) { f && f(); });
    temizle = [];
    if (lenis) { lenis.resize(); lenis.scrollTo(0, { immediate: true, force: true }); }
    cubuk.classList.toggle('on', route.name === 'konu' && !azalt);
    if (azalt) return;

    ctx = gsap.context(function () {
      /* Sayfa geçişi: yeni görünüm hafifçe yükselerek gelir. */
      gsap.from(host, { autoAlpha: 0, y: 18, duration: 0.6, ease: EASE_UI, clearProps: 'transform,opacity,visibility' });

      /* --- ana sayfa --- */
      if (route.name === 'home') {
        satirAc(host.querySelector('.hero-t'), 0.1);
        gsap.from(host.querySelectorAll('.hero-copy > :not(.hero-t)'),
                  { autoAlpha: 0, y: 28, duration: 1, ease: EASE_IN, stagger: 0.05, delay: 0.35 });
        gsap.from(host.querySelector('.hero-tool'),
                  { autoAlpha: 0, y: 64, duration: 1.2, ease: EASE_IN, delay: 0.25 });
        /* Paralaks KALDIRILDI (5. sürüm, ui-ux-pro-max: excessive-motion —
           görünüm başına 1-2 ana hareket; paralaks bilgi taşımıyordu). */
        satirAcIzle(host.querySelector('.toc-head h2'));
        kademeli('.bento > .part', host, 72);
        temizle.push(manyetik(host.querySelector('.cta')));
        temizle.push(yaziIpucu(host.querySelector('#cmd-in')));
      }

      /* --- konu sayfası --- */
      if (route.name === 'konu') {
        satirAc(host.querySelector('.thead h1'), 0.05);
        gsap.from(host.querySelectorAll('.thead > :not(h1)'),
                  { autoAlpha: 0, y: 24, duration: 0.9, ease: EASE_IN, stagger: 0.05, delay: 0.25 });
        gsap.from(host.querySelector('.toc'), { autoAlpha: 0, x: 24, duration: 1, ease: EASE_IN, delay: 0.4 });
        kademeli('.section', host, 48);
        gsap.fromTo(cubuk, { scaleX: 0 }, {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: host, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
        });
      }

      /* --- işlem kodu / tablo / terim detayı --- */
      if (route.name === 'tcode' || route.name === 'tablo' || route.name === 'terim') {
        kademeli('.dt-head, .panel', host, 40);
      }
    }, host);

    /* Yazı tipleri ve açılır kapanır bölümler yüksekliği değiştirir. */
    setTimeout(yenile, 120);
  });

  /** Düzen değişince iki ölçüyü birlikte tazele: Lenis sınırı + tetikleyiciler. */
  function yenile() { if (lenis) lenis.resize(); ST.refresh(); }

  /** Kaydırmayla görünen başlık: satır açılımı ekrana girince başlar. */
  function satirAcIzle(el) {
    if (!el || !window.SplitText) return;
    var s = window.SplitText.create(el, { type: 'lines', mask: 'lines' });
    gsap.from(s.lines, { yPercent: 110, duration: 1.1, ease: EASE_IN, stagger: 0.08,
                         scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  }

  /* Bölüm açma/kapama, dizin özeti ve dil değişimi düzeni değiştirir:
     ScrollTrigger konumları tazelenir. */
  /* ⚠️ Bölüme atlama (goto-section) HARİÇ: ScrollTrigger.refresh kaydırma
     konumunu kaydedip geri yüklerken Lenis'in süren kaydırmasını yarıda
     keser; atlama hedefin binlerce piksel üstünde duruyordu. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-action]');
    if (a && a.dataset.action !== 'goto-section') setTimeout(yenile, 320);
  });

})(window.SAP);
