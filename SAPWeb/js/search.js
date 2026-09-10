/* ==========================================================================
   search.js — Arama indeksi
   --------------------------------------------------------------------------
   Konu, işlem kodu, tablo ve terim tek bir indekste toplanır. Puanlama basit
   ama öngörülebilir: tam eşleşme > baştan eşleşme > içinde geçme. Türkçe
   karakterler SAP.norm ile sadeleştirildiği için "ödeme" araması "odeme"
   yazımını da bulur.
   ========================================================================== */

(function (SAP) {
  'use strict';

  var index = null;

  function build() {
    var ix = [];

    SAP.allTopics().forEach(function (t) {
      ix.push({
        tur: 'Konu', ic: t.icon, baslik: t.title,
        alt: t.summary,
        href: '#/konu/' + encodeURIComponent(t.id),
        anahtar: SAP.norm(t.title + ' ' + t.summary + ' ' + t.id + ' ' + (t.level || '')),
        ad: SAP.norm(t.title),
        agirlik: t.status === 'ready' ? 3 : 1,
      });
    });

    SAP.tcodeMap.forEach(function (x) {
      ix.push({
        tur: 'İşlem kodu', ic: '⌨️', baslik: x.kod,
        alt: x.ad + ' — ' + (x.modul || ''),
        href: '#/tcode/' + encodeURIComponent(SAP.upper(x.kod)),
        anahtar: SAP.norm(x.kod + ' ' + x.ad + ' ' + (x.aciklama || '') + ' ' + (x.modul || '')),
        ad: SAP.norm(x.kod),
        agirlik: 2,
      });
    });

    SAP.tableMap.forEach(function (x) {
      ix.push({
        tur: 'Tablo', ic: '🗃️', baslik: x.ad,
        alt: x.baslik + ' — ' + (x.modul || ''),
        href: '#/tablo/' + encodeURIComponent(SAP.upper(x.ad)),
        anahtar: SAP.norm(x.ad + ' ' + x.baslik + ' ' + (x.aciklama || '')),
        ad: SAP.norm(x.ad),
        agirlik: 2,
      });
    });

    SAP.termMap.forEach(function (x, k) {
      ix.push({
        tur: 'Terim', ic: '📖', baslik: x.ad,
        alt: x.en + ' — ' + x.aciklama,
        href: '#/terim/' + encodeURIComponent(k),
        anahtar: SAP.norm(x.ad + ' ' + x.en + ' ' + x.aciklama),
        ad: SAP.norm(x.ad),
        agirlik: 1,
      });
    });

    return ix;
  }

  function search(q, limit) {
    if (!index) index = build();
    var n = SAP.norm(q);
    if (!n) return [];

    var kelimeler = n.split(' ').filter(Boolean);

    return index.map(function (it) {
      var puan = 0;

      if (it.ad === n) puan += 120;
      else if (it.ad.indexOf(n) === 0) puan += 70;
      else if (it.ad.indexOf(n) !== -1) puan += 45;

      kelimeler.forEach(function (k) {
        if (it.anahtar.indexOf(' ' + k) !== -1 || it.anahtar.indexOf(k) === 0) puan += 14;
        else if (it.anahtar.indexOf(k) !== -1) puan += 7;
        else puan -= 25;                       // aranan kelime hiç geçmiyorsa cezalandır
      });

      return puan > 0 ? Object.assign({ score: puan + it.agirlik }, it) : null;
    }).filter(Boolean)
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, limit || 20);
  }

  /** İçerik sonradan kaydedilirse indeks tazelensin. */
  search.reset = function () { index = null; };

  SAP.search = search;

})(window.SAP);
