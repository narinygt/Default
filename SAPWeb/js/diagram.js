/* ==========================================================================
   diagram.js — Bildirimsel veriden diyagram çizimi
   --------------------------------------------------------------------------
   Mermaid gibi kütüphaneler CDN'den yüklendiği için kullanılmaz (çevrimdışı
   çalışma garantisi). Dört çizim tipi vardır:
     flow     — süreç akışı (rol + adım + çıktı, oklarla)
     er       — varlık-ilişki diyagramı (kutular + SVG bağlantı çizgileri)
     tHesap   — klasik T hesap
     fis      — muhasebe fişi (borç/alacak dengesi kontrollü)
   ========================================================================== */

(function (SAP) {
  'use strict';

  var mk = SAP.mk, esc = SAP.esc;

  /* ================================================== süreç akışı === */

  /**
   * d = { baslik, adimlar:[{ rol, ic, baslik, aciklama, cikti, ok }] }
   * `ok` bir sonraki adıma giden okun etiketidir (opsiyonel).
   */
  function flow(d) {
    if (!d || !d.adimlar || !d.adimlar.length) return '';
    var body = d.adimlar.map(function (n, i) {
      var out = '';
      out += '<div class="flow-node">';
      /* Adım işareti EMOJİ değil SIRA NUMARASI: bir süreç şemasında
         okunması gereken şey adımın kaçıncı olduğudur. `n.ic` verisi
         içerikte duruyor ama çizilmiyor (bkz. theme.css ilke 4). */
      out += '<div class="fn-ic">' + (i + 1) + '</div>';
      out += '<div class="fn-b">';
      if (n.rol) out += '<div class="fn-r">' + mk(n.rol) + '</div>';
      out += '<div class="fn-t">' + mk(n.baslik) + '</div>';
      if (n.aciklama) out += '<div class="fn-d">' + mk(n.aciklama) + '</div>';
      if (n.cikti) out += '<div class="fn-o"><span class="fn-o-k">Çıktı</span>' + mk(n.cikti) + '</div>';
      out += '</div></div>';
      if (i < d.adimlar.length - 1) {
        out += '<div class="flow-arrow">' + (n.ok ? '<span class="lb">' + mk(n.ok) + '</span>' : '') + '</div>';
      }
      return out;
    }).join('');

    return '<div class="dia">' +
      (d.baslik ? '<div class="dia-t">' + mk(d.baslik) + '</div>' : '') +
      '<div class="flow">' + body + '</div></div>';
  }

  /* ============================================== ER diyagramı === */

  /**
   * d = {
   *   baslik,
   *   varliklar:[{ ad, rol, aciklama, hub:true, alanlar:[{ad, tip:'pk'|'fk', not}] }],
   *   iliskiler:[{ from, to, alanlar, not }]
   * }
   */
  function er(d) {
    if (!d || !d.varliklar || !d.varliklar.length) return '';

    var ents = d.varliklar.map(function (v) {
      var fields = (v.alanlar || []).map(function (f) {
        var badge = f.tip === 'pk' ? '<span class="pk">PK</span>'
                  : f.tip === 'fk' ? '<span class="pk fk">FK</span>' : '';
        return '<li>' + badge + '<span>' + esc(f.ad) + '</span>' +
               (f.not ? '<span style="font-family:var(--font-sans);color:var(--ink-3);font-size:10.5px">' +
                        mk(f.not) + '</span>' : '') + '</li>';
      }).join('');
      return '<div class="er-ent' + (v.hub ? ' hub' : '') + '" data-ent="' + esc(v.ad) + '">' +
        '<div class="er-ent-h"><b>' + esc(v.ad) + '</b>' +
          (v.rol ? '<span class="rl">' + mk(v.rol) + '</span>' : '') + '</div>' +
        (v.aciklama ? '<div class="er-ent-d">' + mk(v.aciklama) + '</div>' : '') +
        (fields ? '<ul>' + fields + '</ul>' : '') +
      '</div>';
    }).join('');

    var rels = (d.iliskiler || []).map(function (r) {
      return '<div class="er-rel">' +
        '<code>' + esc(r.from) + '</code>' +
        /* Ok, karakterle ÇİZİLMEZ. Eskiden `──▶` yazıyordu — kutu çizim
           karakterlerinden yapılmış bir ok, fontu değişince hizası bozulan
           ve baskıda dağılan bir çözüm. Artık Lucide `arrow-right` (16px,
           currentColor — theme.css ilke 5).
           SAP.ui, diagram.js'ten SONRA yüklenir ama er() yalnızca çizim
           anında çağrılır; yine de eksikse tipografik ok'a düşer. */
        '<span class="ar">' +
          (SAP.ui && SAP.ui.icon ? SAP.ui.icon('arrow-right') : '→') +
        '</span>' +
        '<code>' + esc(r.to) + '</code>' +
        (r.alanlar ? '<span class="lb">' + esc(r.alanlar) + '</span>' : '') +
        (r.not ? '<span class="lb">· ' + mk(r.not) + '</span>' : '') +
      '</div>';
    }).join('');

    return '<div class="dia">' +
      (d.baslik ? '<div class="dia-t">' + mk(d.baslik) + '</div>' : '') +
      /* data-er bir HTML niteliğidir — mk() burada KULLANILMAZ, esc kalmalı. */
      '<div class="er" data-er=\'' + esc(JSON.stringify(d.iliskiler || [])) + '\'>' +
        '<svg class="er-canvas" aria-hidden="true"></svg>' +
        '<div class="er-grid">' + ents + '</div>' +
      '</div>' +
      (rels ? '<div class="er-rels">' + rels + '</div>' : '') +
    '</div>';
  }

  /**
   * Kutular yerleştikten sonra aralarındaki bağlantı çizgilerini çizer.
   * Ölçüm DOM'a bağlı olduğu için render sonrası ve pencere yeniden
   * boyutlandığında çağrılır. Ölçüm başarısız olursa çizgi çizilmez —
   * ilişki listesi zaten metin olarak görünür (bozulmaz).
   */
  function drawER(root) {
    (root || document).querySelectorAll('.er').forEach(function (er) {
      var svg = er.querySelector('.er-canvas');
      var grid = er.querySelector('.er-grid');
      if (!svg || !grid) return;

      var rels;
      try { rels = JSON.parse(er.dataset.er || '[]'); } catch (e) { rels = []; }

      var box = er.getBoundingClientRect();
      /* Düzen henüz oturmadıysa (genişlik 0) çizme; ResizeObserver tekrar çağıracak. */
      if (box.width < 40) return;

      svg.setAttribute('viewBox', '0 0 ' + Math.round(box.width) + ' ' + Math.round(box.height));
      svg.setAttribute('width', Math.round(box.width));
      svg.setAttribute('height', Math.round(box.height));

      var paths = '';
      rels.forEach(function (r) {
        var a = er.querySelector('[data-ent="' + CSS.escape(String(r.from)) + '"]');
        var b = er.querySelector('[data-ent="' + CSS.escape(String(r.to)) + '"]');
        if (!a || !b || a === b) return;

        var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        var ax, ay, bx, by, c1x, c1y, c2x, c2y;

        var sameRow = Math.abs(ra.top - rb.top) < 12;
        if (sameRow) {
          var leftFirst = ra.left <= rb.left;
          ax = (leftFirst ? ra.right : ra.left) - box.left;
          bx = (leftFirst ? rb.left : rb.right) - box.left;
          ay = ra.top + ra.height / 2 - box.top;
          by = rb.top + rb.height / 2 - box.top;
          var midx = (ax + bx) / 2;
          c1x = midx; c1y = ay; c2x = midx; c2y = by;
        } else {
          var aTop = ra.top <= rb.top;
          ax = ra.left + ra.width / 2 - box.left;
          bx = rb.left + rb.width / 2 - box.left;
          ay = (aTop ? ra.bottom : ra.top) - box.top;
          by = (aTop ? rb.top : rb.bottom) - box.top;
          var midy = (ay + by) / 2;
          c1x = ax; c1y = midy; c2x = bx; c2y = midy;
        }

        paths += '<path d="M ' + ax.toFixed(1) + ' ' + ay.toFixed(1) +
                 ' C ' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ', ' +
                 c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ', ' +
                 bx.toFixed(1) + ' ' + by.toFixed(1) + '" ' +
                 'fill="none" stroke="var(--rule-firm)" stroke-width="1.5" ' +
                 'stroke-dasharray="4 4" marker-end="url(#erhead)"/>';
      });

      svg.innerHTML =
        '<defs><marker id="erhead" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" ' +
        'markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--rule-firm)"/>' +
        '</marker></defs>' + paths;
    });
  }

  /* ==================================================== T hesap === */

  /** d = { hesap, kod, borc:[{ad,tutar}], alacak:[{ad,tutar}], not } */
  function tHesap(d) {
    var side = function (rows) {
      return (rows || []).map(function (r) {
        return '<div class="ln"><i>' + mk(r.ad) + '</i><b>' + SAP.num(r.tutar) + '</b></div>';
      }).join('');
    };
    var sum = function (rows) {
      return (rows || []).reduce(function (n, r) { return n + (Number(r.tutar) || 0); }, 0);
    };
    var db = sum(d.borc), cr = sum(d.alacak);
    var bal = db - cr;

    return '<div class="tacc">' +
      '<div class="tacc-h"><b>' + mk(d.hesap) + '</b>' +
        (d.kod ? '<span>' + mk(d.kod) + '</span>' : '') + '</div>' +
      '<div class="tacc-body">' +
        '<div class="tacc-col"><div class="lb">Borç</div>' + side(d.borc) + '</div>' +
        '<div class="tacc-col"><div class="lb">Alacak</div>' + side(d.alacak) + '</div>' +
      '</div>' +
      '<div class="tacc-foot"><div>' + SAP.num(db) + '</div><div>' + SAP.num(cr) + '</div></div>' +
      '<div class="tacc-bal">Kalan: <b>' + SAP.num(Math.abs(bal)) + '</b> ' +
        (bal === 0 ? '(kapalı)' : bal > 0 ? 'borç bakiyesi' : 'alacak bakiyesi') +
        (d.not ? ' · ' + mk(d.not) : '') +
      '</div>' +
    '</div>';
  }

  function tHesaplar(list, baslik) {
    if (!list || !list.length) return '';
    return '<div class="dia">' +
      (baslik ? '<div class="dia-t">' + mk(baslik) + '</div>' : '') +
      '<div class="tacc-wrap">' + list.map(tHesap).join('') + '</div></div>';
  }

  /* ============================================== muhasebe fişi === */

  /**
   * d = { baslik, belgeTuru, tarih, paraBirimi,
   *       satirlar:[{ hesap, ad, borc, alacak, not }], not }
   * Borç ve alacak toplamı eşit değilse görünür biçimde uyarır — muhasebe
   * kaydının denk olması bu platformun öğrettiği ilk kuraldır.
   */
  function fis(d) {
    var cur = d.paraBirimi || 'TRY';
    var db = 0, cr = 0;
    var rows = (d.satirlar || []).map(function (r) {
      db += Number(r.borc) || 0;
      cr += Number(r.alacak) || 0;
      return '<tr>' +
        '<td class="acc">' + esc(r.hesap || '') + '</td>' +
        '<td>' + mk(r.ad || '') + (r.not ? '<br><span style="font-size:11.5px;color:var(--ink-3)">' + mk(r.not) + '</span>' : '') + '</td>' +
        '<td class="num dr">' + (r.borc ? '<b>' + SAP.num(r.borc) + '</b>' : '') + '</td>' +
        '<td class="num cr">' + (r.alacak ? '<b>' + SAP.num(r.alacak) + '</b>' : '') + '</td>' +
      '</tr>';
    }).join('');

    var denk = Math.abs(db - cr) < 0.005;

    return '<div class="jr">' +
      '<div class="jr-h"><b>' + mk(d.baslik || 'Muhasebe Fişi') + '</b>' +
        (d.belgeTuru ? '<span class="tag">Belge türü: ' + esc(d.belgeTuru) + '</span>' : '') +
        (d.tarih ? '<span class="mt">' + esc(d.tarih) + '</span>' : '') +
        '<span class="mt" style="margin-left:auto">' + esc(cur) + '</span>' +
      '</div>' +
      '<table><thead><tr>' +
        '<th style="width:112px">Hesap</th><th>Açıklama</th>' +
        '<th class="num" style="width:118px">Borç</th>' +
        '<th class="num" style="width:118px">Alacak</th>' +
      '</tr></thead><tbody>' + rows + '</tbody>' +
      '<tfoot><tr><td></td><td>' +
        (denk ? 'Toplam (denk ✓)' : '<span class="jr-bad">Toplam — DENK DEĞİL ✕</span>') +
      '</td>' +
        '<td class="num">' + SAP.num(db) + '</td>' +
        '<td class="num">' + SAP.num(cr) + '</td>' +
      '</tr></tfoot></table>' +
      (d.not ? '<div class="jr-note">' + mk(d.not) + '</div>' : '') +
    '</div>';
  }

  /* ------------------------------------------------------ dağıtıcı --- */

  var byType = { flow: flow, er: er, fis: fis, tHesap: tHesap };

  function draw(d) {
    if (!d) return '';
    if (Array.isArray(d)) return d.map(draw).join('');
    var fn = byType[d.type];
    return fn ? fn(d) : '';
  }

  SAP.diagram = {
    flow: flow, er: er, drawER: drawER,
    tHesap: tHesap, tHesaplar: tHesaplar, fis: fis, draw: draw,
  };

  /* ER çizgileri ölçüme dayalıdır: kutular yerleşmeden doğru koordinat çıkmaz.
     Bu yüzden üç ayrı tetikleyici vardır — render sonrası, kutu boyutu
     değiştiğinde (ResizeObserver) ve pencere yeniden boyutlandığında. */
  var ro = window.ResizeObserver ? new ResizeObserver(function () { drawER(document); }) : null;

  SAP.onRender(function (route, host) {
    var erler = host.querySelectorAll('.er');
    if (!erler.length) return;
    requestAnimationFrame(function () { drawER(host); });
    if (ro) erler.forEach(function (e) { ro.observe(e); });
  });

  var rz = null;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () { drawER(document); }, 140);
  });

})(window.SAP);
