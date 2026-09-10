/* ==========================================================================
   core.js — SAP namespace, kayıt defterleri, kalıcı durum, router, olaylar
   --------------------------------------------------------------------------
   Bu dosya ES module DEĞİL. file:// altında import/export CORS'a takıldığı
   için tüm dosyalar klasik <script src> ile yüklenir ve tek bir global
   SAP nesnesine kayıt olur. Yükleme sırası index.html'de sabittir:
     core → markup → diagram → veri → içerik → sections → views → learn →
     search → ui (ui.js en sonda boot() çağırır)
   ========================================================================== */

window.SAP = (function () {
  'use strict';

  /* =================================================== yardımcılar === */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** Türkçe karakterleri URL/anahtar güvenli hale getirir. */
  function slug(s) {
    var map = { ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i', ö: 'o', Ö: 'o',
                ş: 's', Ş: 's', ü: 'u', Ü: 'u' };
    return String(s || '')
      .replace(/[çÇğĞıİöÖşŞüÜ]/g, function (c) { return map[c]; })
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /** Türkçe'ye duyarlı büyük harf (i → İ, ı → I). */
  function upper(s) {
    return String(s || '').replace(/i/g, 'İ').replace(/ı/g, 'I').toUpperCase();
  }

  /** Arama/eşleştirme için normalize: küçük harf + aksansız. */
  function norm(s) {
    return slug(s).replace(/-/g, ' ').trim();
  }

  function num(n, dec) {
    if (n == null || n === '') return '';
    var v = Number(n);
    if (!isFinite(v)) return String(n);
    return v.toLocaleString('tr-TR', {
      minimumFractionDigits: dec == null ? 2 : dec,
      maximumFractionDigits: dec == null ? 2 : dec,
    });
  }

  function el(id) { return document.getElementById(id); }

  /* ============================================== kayıt defterleri === */

  var modules  = [];
  var topics   = new Map();   // id -> topic
  var order    = [];          // konu id'leri, katalogdaki sıra
  var tcodes   = new Map();   // KOD -> {kod, ad, aciklama, modul, konu}
  var tables   = new Map();   // AD  -> {ad, baslik, aciklama, modul, konu}
  var terms    = new Map();   // anahtar -> {anahtar, ad, en, aciklama, konu}

  function registerModule(m) {
    modules.push(m);
    modules.sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
    return m;
  }

  /**
   * Konu kaydı. catalog.js tüm konuları "stub" olarak (status:'planned')
   * kaydeder; content/fi/*.js aynı id ile derin `sections` gönderip stub'ı
   * zenginleştirir. Bu yüzden kayıt MERGE'dir, üzerine yazma değildir.
   */
  function registerTopic(t) {
    var cur = topics.get(t.id);
    if (!cur) {
      topics.set(t.id, t);
      order.push(t.id);
      if (!t.status) t.status = t.sections ? 'ready' : 'planned';
      return t;
    }
    var sections = Object.assign({}, cur.sections || {}, t.sections || {});
    Object.assign(cur, t);
    cur.sections = sections;
    if (Object.keys(sections).length) cur.status = 'ready';
    return cur;
  }

  function registerTcodes(list)  { list.forEach(function (x) { tcodes.set(upper(x.kod), x); }); }
  function registerTables(list)  { list.forEach(function (x) { tables.set(upper(x.ad), x); }); }
  function registerTerms(list)   { list.forEach(function (x) { terms.set(slug(x.anahtar || x.ad), x); }); }

  function topic(id)  { return topics.get(id) || null; }
  function allTopics() { return order.map(function (id) { return topics.get(id); }); }
  function tcode(k)   { return tcodes.get(upper(k)) || null; }
  function table(k)   { return tables.get(upper(k)) || null; }
  function term(k)    { return terms.get(slug(k)) || null; }

  /* ================================================= kalıcı durum === */

  var KEY = 'sapfi_v1';

  var store = {
    d: {
      theme: null,
      progress: {},     // { topicId: { sectionId: true } }
      favorites: [],
      notes: {},        // { topicId: 'metin' }
      quiz: {},         // { topicId: { dogru, toplam, ts } }
      lastRoute: '',
      lang: 'tr',          // arayüz dili — bkz. i18n.js
      railKapali: false,   // geniş ekranda gezinme sütunu katlı mı
      acikGrup: {},        // { grupId: 1 } — kenar çubuğunda AÇILMIŞ gruplar
      kapaliBolum: {},     // { 'tid:sid': 1 } — konu sayfasında katlanmış bölümler
      acikDizin: {},       // { topicId: 1 } — içindekilerde açıklaması açık satırlar
    },

    load: function () {
      try {
        var raw = localStorage.getItem(KEY);
        if (!raw) return;
        var s = JSON.parse(raw);
        if (s && typeof s === 'object') {
          Object.keys(store.d).forEach(function (k) {
            if (s[k] != null) store.d[k] = s[k];
          });
        }
      } catch (e) { /* bozuk kayıt veya özel sekme — varsayılanla devam */ }
    },

    save: function () {
      try { localStorage.setItem(KEY, JSON.stringify(store.d)); }
      catch (e) { /* kota / özel sekme — sessizce geç */ }
    },

    reset: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      store.d = { theme: store.d.theme, progress: {}, favorites: [], notes: {}, quiz: {},
                  lastRoute: '', lang: store.d.lang, railKapali: false,
                  acikGrup: {}, kapaliBolum: {}, acikDizin: {} };
    },

    /* --- katlama durumu ---
       Açık/kapalı değil KAPALI olan saklanır: varsayılan açıktır, bu yüzden
       kayıt yalnızca kullanıcı bir şeyi kapattığında büyür. */
    /* ⚠️ VARSAYILAN KAPALI. Eskiden tersiydi (kapalı olanlar saklanıyordu)
       ve dokuz grup açık gelince kenar çubuğunda 36 satır birden
       görünüyordu. Artık AÇIK olanlar saklanır: sütun dokuz satırla
       başlar, kullanıcı bastıkça derinleşir. */
    isGroupOpen: function (gid) { return !!store.d.acikGrup[gid]; },
    toggleGroup: function (gid) {
      if (store.d.acikGrup[gid]) { delete store.d.acikGrup[gid]; store.save(); return false; }
      store.d.acikGrup[gid] = 1; store.save(); return true;
    },
    /* İçindekilerde açıklaması AÇIK olan satırlar. Varsayılan kapalıdır
       (dizin taranabilir kalsın), bu yüzden açık olanlar saklanır. */
    isTocOpen: function (tid) { return !!store.d.acikDizin[tid]; },
    toggleToc: function (tid) {
      if (store.d.acikDizin[tid]) { delete store.d.acikDizin[tid]; store.save(); return false; }
      store.d.acikDizin[tid] = 1; store.save(); return true;
    },

    isSectionClosed: function (tid, sid) { return !!store.d.kapaliBolum[tid + ':' + sid]; },
    toggleSection: function (tid, sid) {
      var k = tid + ':' + sid;
      if (store.d.kapaliBolum[k]) delete store.d.kapaliBolum[k];
      else store.d.kapaliBolum[k] = 1;
      store.save();
    },

    /* --- ilerleme --- */
    isRead: function (tid, sid) {
      return !!(store.d.progress[tid] && store.d.progress[tid][sid]);
    },
    toggleRead: function (tid, sid) {
      var p = store.d.progress[tid] || (store.d.progress[tid] = {});
      if (p[sid]) delete p[sid]; else p[sid] = 1;
      if (!Object.keys(p).length) delete store.d.progress[tid];
      store.save();
    },
    readCount: function (tid) {
      var p = store.d.progress[tid];
      return p ? Object.keys(p).length : 0;
    },
    /** Konunun tamamlanma yüzdesi (0-100). Bölümü olmayan konu 0 döner. */
    percent: function (tid) {
      var t = topics.get(tid);
      if (!t || !t.sections) return 0;
      var total = SAP.sectionIds(t).length;
      if (!total) return 0;
      return Math.round((store.readCount(tid) / total) * 100);
    },

    /* --- favoriler --- */
    isFav: function (tid) { return store.d.favorites.indexOf(tid) !== -1; },
    toggleFav: function (tid) {
      var i = store.d.favorites.indexOf(tid);
      if (i === -1) store.d.favorites.push(tid); else store.d.favorites.splice(i, 1);
      store.save();
      return i === -1;
    },

    /* --- notlar --- */
    note: function (tid) { return store.d.notes[tid] || ''; },
    setNote: function (tid, v) {
      if (v && v.trim()) store.d.notes[tid] = v; else delete store.d.notes[tid];
      store.save();
    },
  };

  /* ======================================================== router === */

  var route = { name: 'home', parts: [], hash: '#/' };

  function parseHash() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean).map(decodeURIComponent);
    var name = parts.length ? parts[0] : 'home';
    return { name: name, parts: parts.slice(1), hash: location.hash || '#/' };
  }

  function go(hash) {
    if (location.hash === hash) { render(); return; }
    location.hash = hash;
  }

  /* ================================================ render / boot === */

  var views = {};          // ad -> fn(route) => html
  var afterRender = [];    // DOM yerleştikten sonra çalışacak kancalar

  function view(name, fn) { views[name] = fn; }
  function onRender(fn)   { afterRender.push(fn); }

  var scrollTargets = {};  // hash -> scrollTop (geri tuşunda konumu koru)

  function render(opts) {
    opts = opts || {};
    route = parseHash();

    var fn = views[route.name] || views.notfound;
    var host = el('view');
    if (!host) return;

    var html;
    try {
      html = fn(route);
    } catch (err) {
      console.error('[SAP] görünüm hatası:', route, err);
      html = '<div class="empty"><span class="ic">⚠️</span>Bu sayfa çizilirken bir hata oluştu.' +
             '<br><small>' + esc(err && err.message) + '</small></div>';
    }
    host.innerHTML = html;

    afterRender.forEach(function (h) {
      try { h(route, host); } catch (e) { console.error('[SAP] render kancası:', e); }
    });

    if (!opts.keepScroll) window.scrollTo(0, 0);

    if (route.name !== 'ara') {
      store.d.lastRoute = route.hash;
      store.save();
    }
  }

  /* ============================================== olay delegasyonu === */

  var actions = {};
  function action(name, fn) { actions[name] = fn; }

  /* En içteki data-action / data-go taşıyıcısı kazanır: ağaçta yukarı doğru
     yürüyüp ilk eşleşende dururuz. Böylece kartın içindeki favori butonu,
     kartın kendi navigasyonunu tetiklemez. */
  document.addEventListener('click', function (e) {
    var node = e.target;
    if (!node || node.nodeType !== 1) return;   // metin düğümü / document olabilir

    while (node && node !== document.body) {
      var ds = node.dataset;
      if (ds && ds.action !== undefined) {
        if (node.disabled) return;
        var fn = actions[ds.action];
        if (fn) { e.preventDefault(); fn(node, e); return; }
      }
      if (ds && ds.go !== undefined) {
        if (node.disabled) return;
        e.preventDefault();
        go(ds.go);
        return;
      }
      node = node.parentElement;
    }
  });

  window.addEventListener('hashchange', function () { render(); });

  /* ==================================================== bildirim === */

  var toastTimer = null;
  function toast(msg) {
    var old = document.querySelector('.toast');
    if (old) old.remove();
    var n = document.createElement('div');
    n.className = 'toast';
    n.textContent = msg;
    document.body.appendChild(n);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { n.remove(); }, 2200);
  }

  /* ======================================================== dışa === */

  var SAP = {
    // yardımcı
    esc: esc, slug: slug, upper: upper, norm: norm, num: num, el: el,
    // kayıt
    registerModule: registerModule, registerTopic: registerTopic,
    registerTcodes: registerTcodes, registerTables: registerTables,
    registerTerms: registerTerms,
    // sorgu
    modules: modules, topic: topic, allTopics: allTopics,
    tcode: tcode, table: table, term: term,
    tcodeMap: tcodes, tableMap: tables, termMap: terms,
    // durum
    store: store,
    // yönlendirme
    get route() { return route; },
    go: go, view: view, onRender: onRender, render: render,
    action: action, actions: actions,
    toast: toast,
    scrollTargets: scrollTargets,
  };

  return SAP;
})();
