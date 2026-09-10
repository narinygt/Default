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


  var I = function (n) { return SAP.ui.icon(n); };

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    var b = document.getElementById('theme-btn');
    if (b) {
      b.innerHTML = I(t === 'dark' ? 'sun' : 'moon');
      var lb = SAP.i18n.t(t === 'dark' ? 'nav.theme.light' : 'nav.theme.dark');
      b.title = lb; b.setAttribute('aria-label', lb);
    }
  }

  SAP.action('toggle-theme', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    SAP.store.d.theme = next;
    SAP.store.save();
    SAP.i18n.set(SAP.store.d.lang || 'tr');
    applyTheme(next);
    /* ER diyagram çizgileri renk değişkeni kullandığı için yeniden çizilir. */
    if (SAP.diagram) SAP.diagram.drawER(document);
  });

  /* ================================================ KENAR ÇUBUĞU ==== */

  function sidebarHTML() {
    var all = SAP.allTopics();
    var T = SAP.i18n.t;

    var toplam = 0, okunan = 0;
    all.forEach(function (t) {
      if (t.status !== 'ready') return;
      toplam += SAP.sectionIds(t).length;
      okunan += SAP.store.readCount(t.id);
    });
    var genel = toplam ? Math.round((okunan / toplam) * 100) : 0;

    var aktif = SAP.route;
    var aktifKonu = aktif.name === 'konu' ? aktif.parts[0] : null;

    /* Gezinme TEK YERDE: bu sütun. Ana sayfada süzgeç şeridi yok.
       Satırlarda ikon YOK — 36 satırlık bir listede ikon sütunu
       gürültüdür; ilk üç kısayol dışında hiçbiri ikon almaz. */
    function item(href, ikon, tx, on) {
      return '<a class="side-item' + (on ? ' active' : '') + '" data-go="' + esc(href) + '" href="' + esc(href) + '">' +
        I(ikon) + '<span>' + esc(tx) + '</span></a>';
    }

    var nav =
      '<div class="side-nav">' +
        item('#/', 'book-open', T('nav.home'), aktif.name === 'home') +
        item('#/favoriler', 'bookmark', T('nav.fav'), aktif.name === 'favoriler') +
        item('#/notlar', 'pencil', T('nav.notes'), aktif.name === 'notlar') +
      '</div>';

    /* Konular sürekli numaralanır (01…36) — kitapta olduğu gibi. */
    var sira = 0;
    var gruplar = SAP.GROUPS.map(function (g) {
      var list = all.filter(function (t) { return t.grup === g.id; });
      if (!list.length) return '';
      /* Okunmakta olan konunun grubu KENDİLİĞİNDEN açılır — kullanıcı
         "neredeyim?" diye aramasın diye. Elle açılanlar zaten saklı. */
      var acik = SAP.store.isGroupOpen(g.id) ||
                 list.some(function (t) { return t.id === aktifKonu; });
      return '<div class="side-group' + (acik ? '' : ' closed') + '" data-grp="' + esc(g.id) + '">' +
        '<button class="side-label" type="button" data-action="toggle-group" data-g="' + esc(g.id) + '" ' +
          'aria-expanded="' + (acik ? 'true' : 'false') + '">' +
          '<span class="tx">' + esc(SAP.i18n.grup(g)) + '</span>' +
          '<span class="chev">' + I('chevron-down') + '</span>' +
        '</button>' +
        '<div class="side-sub">' +
        list.map(function (t) {
          var n = (++sira < 10 ? '0' : '') + sira;
          var p = SAP.store.percent(t.id);
          return '<a class="side-topic' + (aktifKonu === t.id ? ' active' : '') +
              (p >= 100 ? ' done' : '') + '" ' +
            'data-go="#/konu/' + esc(t.id) + '" href="#/konu/' + esc(t.id) + '" ' +
            'title="' + esc(SAP.i18n.baslik(t)) + '">' +
            '<span class="st">' + n + '</span>' +
            '<span class="tx">' + esc(SAP.i18n.baslik(t)) + '</span>' +
          '</a>';
        }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    return '<a class="brand" data-go="#/" href="#/">' +
        '<b>' + esc(T('app.name')) + '</b>' +
      '</a>' +
      '<div class="side-scroll">' + nav + gruplar + '</div>' +
      '<div class="side-foot">' +
        '<div class="pl"><span>' + esc(T('home.progress')) + '</span>' +
          '<b class="tnum">' + SAP.i18n.yuzde(genel) + '</b></div>' +
        '<div class="bar"><i style="width:' + genel + '%"></i></div>' +
      '</div>';
  }

  /* ================================================== DİL ANAHTARI ==== */
  /* Sağ üst köşe. İki düğme, mono punto, aktif olan dolgulu.
     Dil değişince TAM ÇİZİM yapılır — başlıklar, kenar çubuğu, üst çubuk
     ve içerik aynı anda değişmeli; parça güncelleme burada yanlış olurdu. */

  function langHTML() {
    var cur = SAP.i18n.get();
    return SAP.i18n.diller.map(function (d) {
      return '<button type="button" data-action="set-lang" data-l="' + d + '" ' +
        'aria-pressed="' + (d === cur) + '" lang="' + d + '">' + d.toUpperCase() + '</button>';
    }).join('');
  }

  SAP.action('set-lang', function (btn) {
    if (btn.dataset.l === SAP.i18n.get()) return;
    SAP.i18n.set(btn.dataset.l);
    SAP.render();
    applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
  });

  /* =================================================== ÜST ÇUBUK ==== */

  function crumbHTML() {
    var r = SAP.route;
    var parca = [];

    if (r.name === 'konu') {
      var t = SAP.topic(r.parts[0]);
      var g = t && SAP.GROUPS.find(function (x) { return x.id === t.grup; });
      if (g) parca.push('<b class="hidesm">' + esc(SAP.i18n.grup(g)) + '</b><span class="sep hidesm">/</span>');
      parca.push('<span class="cur">' + esc(t ? SAP.i18n.baslik(t) : '—') + '</span>');
    } else if (r.name === 'tcode') {
      parca.push('<b class="hidesm">' + esc(SAP.i18n.t('ref.tcode')) + '</b><span class="sep hidesm">/</span>');
      parca.push('<span class="cur">' + esc(r.parts[0] || '') + '</span>');
    } else if (r.name === 'tablo') {
      parca.push('<b class="hidesm">' + esc(SAP.i18n.t('ref.table')) + '</b><span class="sep hidesm">/</span>');
      parca.push('<span class="cur">' + esc(r.parts[0] || '') + '</span>');
    } else if (r.name === 'terim') {
      var x = SAP.term(r.parts[0]);
      parca.push('<b class="hidesm">' + esc(SAP.i18n.t('ref.term')) + '</b><span class="sep hidesm">/</span>');
      parca.push('<span class="cur">' + esc(x ? x.ad : r.parts[0]) + '</span>');
    } else if (r.name === 'favoriler') {
      parca.push('<span class="cur">' + esc(SAP.i18n.t('fav.title')) + '</span>');
    } else if (r.name === 'notlar') {
      parca.push('<span class="cur">' + esc(SAP.i18n.t('notes.title')) + '</span>');
    } else if (r.name === 'ara') {
      parca.push('<span class="cur">' + esc(SAP.i18n.t('search.title')) + '</span>');
    } else {
      parca.push('<span class="cur">' + esc(SAP.i18n.t('home.title')) + '</span>');
    }
    return parca.join('');
  }

  /* ============================================== KOMUT PALETİ ==== */

  var pal = null, palSel = 0, palRes = [];

  function palResultsHTML(q) {
    if (!q) {
      var oneri = SAP.allTopics().filter(function (t) { return t.status === 'ready'; }).slice(0, 6);
      palRes = oneri.map(function (t) {
        return { tur:'topic', baslik:SAP.i18n.baslik(t), alt:SAP.i18n.ozet(t),
                 href:'#/konu/' + t.id };
      });
      return rows();
    }
    palRes = SAP.search(q, 24);
    if (!palRes.length)
      return '<div class="palette-sec">' + esc(SAP.i18n.t('search.empty')) + '</div>';
    return rows();
  }

  /* İndeksteki tür kodları -> i18n anahtarı. Kod saklanır, etiket
     çizim anında dilden gelir; indeksin dil bilmesi gerekmez. */
  var TUR = { topic: 'search.topic', tcode: 'ref.tcode', table: 'ref.table', term: 'ref.term' };

  function rows() {
    return palRes.map(function (r, i) {
      return '<button class="pres' + (i === palSel ? ' sel' : '') + '" type="button" data-pi="' + i + '">' +
        '<span class="bd"><b>' + esc(r.baslik) + '</b><span>' + esc(r.alt || '') + '</span></span>' +
        '<span class="kind">' + esc(TUR[r.tur] ? SAP.i18n.t(TUR[r.tur]) : r.tur) + '</span></button>';
    }).join('');
  }

  function openPalette() {
    if (pal) return;
    palSel = 0;
    pal = document.createElement('div');
    pal.className = 'palette-bg';
    pal.innerHTML = '<div class="palette" role="dialog" aria-label="' + esc(SAP.i18n.t('nav.search')) + '">' +
      '<div class="palette-in">' +
        '<input type="text" placeholder="' + esc(SAP.i18n.t('nav.searchHint')) +
          '" aria-label="' + esc(SAP.i18n.t('nav.search')) + '">' +
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

  /* ======================================== MENÜ / KATLAMA ==== */
  /* ☰ butonu İKİ farklı iş yapar ve bu bilinçli:
       - dar ekranda (<= 62rem) sütun bir ÇEKMECEDİR → üstüne açılır
       - geniş ekranda sütun yerindedir → KATLANIR, içerik genişler
     Ayrım genişlikten okunur; iki ayrı buton koymak gereksiz olurdu. */

  var DAR = '(max-width: 62rem)';
  function darMi() { return window.matchMedia(DAR).matches; }

  function setMenu(open) {
    var sb = document.getElementById('sidebar');
    var sc = document.getElementById('scrim');
    if (!sb || !sc) return;
    sb.classList.toggle('open', open);
    sc.classList.toggle('show', open);
  }

  function applyCollapse() {
    document.body.classList.toggle('rail-collapsed', !!SAP.store.d.railKapali);
  }

  SAP.action('toggle-menu', function () {
    if (darMi()) {
      var sb = document.getElementById('sidebar');
      setMenu(!(sb && sb.classList.contains('open')));
    } else {
      SAP.store.d.railKapali = !SAP.store.d.railKapali;
      SAP.store.save();
    
  applyCollapse();
      /* ER çizgileri genişliğe göre hesaplanır — düzen değişti, yeniden çiz. */
      if (SAP.diagram) setTimeout(function () { SAP.diagram.drawER(document); }, 280);
    }
  });
  SAP.action('close-menu', function () { setMenu(false); });

  SAP.action('toggle-group', function (btn) {
    var acik = SAP.store.toggleGroup(btn.dataset.g);
    var box = btn.closest('.side-group');
    if (!box) return;
    box.classList.toggle('closed', !acik);
    btn.setAttribute('aria-expanded', acik ? 'true' : 'false');
  });

  applyCollapse();

  /* Kabuk düğmeleri — her çizimde tazelenir, çünkü dil değişebilir. */
  function chromeHTML() {
    var T = SAP.i18n.t;
    var mb = document.getElementById('menu-btn');
    if (mb) { mb.innerHTML = I('menu'); mb.title = T('nav.menu'); mb.setAttribute('aria-label', T('nav.menu')); }

    var sb = document.getElementById('search-btn');
    if (sb) {
      sb.innerHTML = I('search') + '<span class="lb">' + esc(T('nav.search')) + '</span><kbd>Ctrl K</kbd>';
      sb.setAttribute('aria-label', T('nav.search'));
    }

    var ls = document.getElementById('langsw');
    if (ls) { ls.innerHTML = langHTML(); ls.setAttribute('aria-label', T('nav.lang')); }
  }

  /* ============================================= RENDER KANCALARI ==== */

  SAP.onRender(function () {
    var sb = document.getElementById('sidebar');
    if (sb) sb.innerHTML = sidebarHTML();
    var cb = document.getElementById('crumb');
    if (cb) cb.innerHTML = crumbHTML();
    chromeHTML();
    setMenu(false);
    applyCollapse();

    var t = SAP.route.name === 'konu' ? SAP.topic(SAP.route.parts[0]) : null;
    document.title = (t ? SAP.i18n.baslik(t) + ' — ' : '') + SAP.i18n.t('app.name');
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
    /* Dil temadan ÖNCE kurulur: applyTheme düğme etiketini i18n'den okur. */
    SAP.i18n.set(SAP.store.d.lang || 'tr');
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
