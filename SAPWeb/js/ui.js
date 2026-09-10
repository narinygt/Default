/* ==========================================================================
   ui.js — Kabuk: kenar çubuğu, üst çubuk, tema, komut paleti ve açılış
   --------------------------------------------------------------------------
   Bu dosya en son yüklenir ve boot() ile uygulamayı başlatır.
   ========================================================================== */

(function (SAP) {
  'use strict';

  var esc = SAP.esc;

  /* ======================================================== TEMA ==== */

  function sysTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /* Tema düğmesinin ikonu tek renk SVG'dir — emoji değil: emoji kendi
     renk paletini getirir ve tek marka rengi kuralını deler. */
  var ICON_MOON = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
    '<path d="M13.2 9.9A5.6 5.6 0 0 1 6.1 2.8a5.6 5.6 0 1 0 7.1 7.1Z" ' +
    'fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>';
  var ICON_SUN = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
    '<circle cx="8" cy="8" r="3.1" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
    '<path d="M8 .9v2.1M8 13v2.1M.9 8h2.1M13 8h2.1M3 3l1.5 1.5M11.5 11.5 13 13M13 3l-1.5 1.5M4.5 11.5 3 13" ' +
    'fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    var b = document.getElementById('theme-btn');
    if (b) {
      b.innerHTML = t === 'dark' ? ICON_SUN : ICON_MOON;
      b.title = t === 'dark' ? 'Aydınlık moda geç' : 'Karanlık moda geç';
    }
  }

  SAP.action('toggle-theme', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    SAP.store.d.theme = next;
    SAP.store.save();
    applyTheme(next);
    /* ER diyagram çizgileri renk değişkeni kullandığı için yeniden çizilir. */
    if (SAP.diagram) SAP.diagram.drawER(document);
  });

  /* ================================================ KENAR ÇUBUĞU ==== */

  function sidebarHTML() {
    var all = SAP.allTopics();

    var toplam = 0, okunan = 0;
    all.forEach(function (t) {
      if (t.status !== 'ready') return;
      toplam += SAP.sectionIds(t).length;
      okunan += SAP.store.readCount(t.id);
    });
    var genel = toplam ? Math.round((okunan / toplam) * 100) : 0;

    var aktif = SAP.route;
    var aktifKonu = aktif.name === 'konu' ? aktif.parts[0] : null;

    /* Gezinme sütununda renk GRUP başlıklarında ve aktif satırda taşınır;
       her satıra ayrı ikon konmaz — 36 satırlık listede emoji sütunu
       gürültü olurdu. Grup rengi listeyi bölmeye yetiyor. */
    function item(href, ic, tx, on) {
      return '<a class="side-item' + (on ? ' active' : '') + '" data-go="' + esc(href) + '" href="' + esc(href) + '">' +
        '<span class="ic">' + ic + '</span><span class="tx">' + esc(tx) + '</span></a>';
    }

    var nav =
      '<div class="side-group side-nav">' +
        item('#/', '🏠', 'Ana Sayfa', aktif.name === 'home') +
        item('#/favoriler', '⭐', 'Favorilerim', aktif.name === 'favoriler') +
        item('#/notlar', '📝', 'Notlarım', aktif.name === 'notlar') +
      '</div>';

    var gruplar = SAP.GROUPS.map(function (g) {
      var list = all.filter(function (t) { return t.grup === g.id; });
      if (!list.length) return '';
      return '<div class="side-group" style="--h:' + g.hue + '">' +
        '<div class="side-label"><span class="ic">' + g.ic + '</span>' + esc(g.ad) +
          '<span class="count">' + list.length + '</span></div>' +
        list.map(function (t) {
          var p = SAP.store.percent(t.id);
          var dot = t.status !== 'ready' ? '' : (p >= 100 ? ' done' : p > 0 ? ' part' : '');
          return '<a class="side-item' + (aktifKonu === t.id ? ' active' : '') + '" ' +
            'data-go="#/konu/' + esc(t.id) + '" href="#/konu/' + esc(t.id) + '" title="' + esc(t.title) + '">' +
            '<span class="tx">' + esc(t.title) + '</span>' +
            '<span class="side-dot' + dot + '"></span></a>';
        }).join('') +
      '</div>';
    }).join('');

    return '<a class="brand" data-go="#/" href="#/">' +
        '<span class="brand-mark">FI</span>' +
        '<span class="brand-txt"><b>SAP S/4HANA FI</b><span>Eğitim Platformu</span></span>' +
      '</a>' +
      '<div class="side-scroll">' + nav + gruplar + '</div>' +
      '<div class="side-foot">' +
        '<div class="pl"><span>Genel ilerleme</span><b>%' + genel + '</b></div>' +
        '<div class="bar"><i style="width:' + genel + '%"></i></div>' +
      '</div>';
  }

  /* =================================================== ÜST ÇUBUK ==== */

  function crumbHTML() {
    var r = SAP.route;
    var parca = [];

    if (r.name === 'konu') {
      var t = SAP.topic(r.parts[0]);
      var g = t && SAP.GROUPS.find(function (x) { return x.id === t.grup; });
      if (g) parca.push('<b class="hidesm">' + esc(g.ad) + '</b><span class="sep hidesm">/</span>');
      parca.push('<span class="cur">' + esc(t ? t.title : 'Bilinmeyen konu') + '</span>');
    } else if (r.name === 'tcode') {
      parca.push('<b class="hidesm">İşlem kodu</b><span class="sep hidesm">/</span>');
      parca.push('<span class="cur">' + esc(r.parts[0] || '') + '</span>');
    } else if (r.name === 'tablo') {
      parca.push('<b class="hidesm">Tablo</b><span class="sep hidesm">/</span>');
      parca.push('<span class="cur">' + esc(r.parts[0] || '') + '</span>');
    } else if (r.name === 'terim') {
      var x = SAP.term(r.parts[0]);
      parca.push('<b class="hidesm">Sözlük</b><span class="sep hidesm">/</span>');
      parca.push('<span class="cur">' + esc(x ? x.ad : r.parts[0]) + '</span>');
    } else if (r.name === 'favoriler') {
      parca.push('<span class="cur">Favorilerim</span>');
    } else if (r.name === 'notlar') {
      parca.push('<span class="cur">Notlarım</span>');
    } else if (r.name === 'ara') {
      parca.push('<span class="cur">Arama sonuçları</span>');
    } else {
      parca.push('<span class="cur">Ana Sayfa</span>');
    }
    return parca.join('');
  }

  /* ============================================== KOMUT PALETİ ==== */

  var pal = null, palSel = 0, palRes = [];

  function palResultsHTML(q) {
    if (!q) {
      var oneri = SAP.allTopics().filter(function (t) { return t.status === 'ready'; }).slice(0, 6);
      palRes = oneri.map(function (t) {
        return { tur:'Konu', ic:t.icon, baslik:t.title, alt:t.summary, href:'#/konu/' + t.id };
      });
      return '<div class="palette-sec">İçeriği hazır konular</div>' + rows();
    }
    palRes = SAP.search(q, 24);
    if (!palRes.length) return '<div class="palette-sec">Sonuç yok</div>';
    return rows();
  }

  function rows() {
    return palRes.map(function (r, i) {
      return '<button class="pres' + (i === palSel ? ' sel' : '') + '" type="button" data-pi="' + i + '">' +
        '<span class="bd"><b>' + esc(r.baslik) + '</b><span>' + esc(r.alt || '') + '</span></span>' +
        '<span class="kind">' + esc(r.tur) + '</span></button>';
    }).join('');
  }

  function openPalette() {
    if (pal) return;
    palSel = 0;
    pal = document.createElement('div');
    pal.className = 'palette-bg';
    pal.innerHTML = '<div class="palette" role="dialog" aria-label="Ara">' +
      '<div class="palette-in">' +
        '<input type="text" placeholder="Konu, işlem kodu, tablo veya terim ara…" aria-label="Arama">' +
      '</div>' +
      '<div class="palette-list">' + palResultsHTML('') + '</div>' +
      '<div class="palette-f"><span><kbd>↑</kbd><kbd>↓</kbd> gez</span>' +
        '<span><kbd>Enter</kbd> aç</span><span><kbd>Esc</kbd> kapat</span></div>' +
    '</div>';
    document.body.appendChild(pal);

    var input = pal.querySelector('input');
    var list = pal.querySelector('.palette-list');
    input.focus();

    input.addEventListener('input', function () {
      palSel = 0;
      list.innerHTML = palResultsHTML(input.value.trim());
    });

    pal.addEventListener('click', function (e) {
      if (e.target === pal) { closePalette(); return; }
      var row = e.target.closest ? e.target.closest('.pres') : null;
      if (row) { pick(Number(row.dataset.pi)); }
    });
  }

  function closePalette() {
    if (!pal) return;
    pal.remove();
    pal = null;
  }

  function pick(i) {
    var r = palRes[i];
    if (!r) return;
    closePalette();
    SAP.go(r.href);
  }

  function movePal(d) {
    if (!palRes.length) return;
    palSel = (palSel + d + palRes.length) % palRes.length;
    var list = pal.querySelector('.palette-list');
    list.innerHTML = rows();
    var sel = list.querySelector('.pres.sel');
    if (sel) sel.scrollIntoView({ block: 'nearest' });
  }

  SAP.action('open-search', openPalette);

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      pal ? closePalette() : openPalette();
      return;
    }
    if (!pal) {
      /* "/" ile de arama açılır — bir metin alanında değilsek. */
      var t = e.target;
      var yaziyor = t && typeof t.closest === 'function' && t.closest('input, textarea, select');
      if (e.key === '/' && !yaziyor) { e.preventDefault(); openPalette(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); movePal(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); movePal(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); pick(palSel); }
  });

  /* ================================================ MOBİL MENÜ ==== */

  function setMenu(open) {
    var sb = document.getElementById('sidebar');
    var sc = document.getElementById('scrim');
    if (!sb || !sc) return;
    sb.classList.toggle('open', open);
    sc.classList.toggle('show', open);
  }
  SAP.action('toggle-menu', function () {
    var sb = document.getElementById('sidebar');
    setMenu(!(sb && sb.classList.contains('open')));
  });
  SAP.action('close-menu', function () { setMenu(false); });

  /* ============================================= RENDER KANCALARI ==== */

  SAP.onRender(function () {
    var sb = document.getElementById('sidebar');
    if (sb) sb.innerHTML = sidebarHTML();
    var cb = document.getElementById('crumb');
    if (cb) cb.innerHTML = crumbHTML();
    setMenu(false);

    var t = SAP.route.name === 'konu' ? SAP.topic(SAP.route.parts[0]) : null;
    document.title = (t ? t.title + ' — ' : '') + 'SAP S/4HANA FI Eğitim Platformu';
  });

  /* İçindekiler listesinde okunmakta olan bölümü işaretle. */
  var spyTimer = null;
  window.addEventListener('scroll', function () {
    if (spyTimer) return;
    spyTimer = setTimeout(function () {
      spyTimer = null;
      var secs = document.querySelectorAll('.section[id]');
      if (!secs.length) return;
      var y = window.scrollY + 140;
      var cur = secs[0].id;
      secs.forEach(function (s) { if (s.offsetTop <= y) cur = s.id; });
      document.querySelectorAll('.toc-item').forEach(function (b) {
        b.classList.toggle('active', b.dataset.s === cur);
      });
    }, 120);
  }, { passive: true });

  /* ======================================================= AÇILIŞ ==== */

  function boot() {
    SAP.store.load();
    applyTheme(SAP.store.d.theme || sysTheme());

    /* Kullanıcı sistem temasını değiştirirse ve elle seçim yapılmadıysa uy. */
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () { if (!SAP.store.d.theme) applyTheme(sysTheme()); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    /* Adres çubuğunda hash yoksa en son bakılan sayfaya dön. */
    if (!location.hash || location.hash === '#' || location.hash === '#/') {
      var last = SAP.store.d.lastRoute;
      if (last && last !== '#/') { location.hash = last; }
    }

    SAP.render();

    /* Geliştirici öz denetimi: çözülemeyen çapraz bağlantı işareti var mı? */
    setTimeout(function () {
      var eksik = SAP.auditRefs();
      var hazir = SAP.allTopics().filter(function (t) { return t.status === 'ready'; }).length;
      console.info('[SAP] Platform hazır — ' + SAP.allTopics().length + ' konu (' + hazir + ' içerik dolu), ' +
        SAP.tcodeMap.size + ' işlem kodu, ' + SAP.tableMap.size + ' tablo, ' + SAP.termMap.size + ' terim.' +
        (eksik.length ? ' ⚠️ ' + eksik.length + ' çözülemeyen işaret var.' : ''));
    }, 0);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})(window.SAP);
