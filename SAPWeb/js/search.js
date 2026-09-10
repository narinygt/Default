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
  var indexDil = null;   // indeks hangi dilde kuruldu (bkz. build())

  function build() {
    var ix = [];

    /* Konu indeksi İKİ DİLİ birden taşır.
       Başlıklar Türkçeleştirildikten sonra "Accounts Payable" araması
       sonuçsuz kalıyordu — oysa danışman kavramı çoğu zaman İngilizce
       adıyla arar. Görünen etiket seçili dilden gelir; ARANAN metin
       her iki dili de içerir. */
    SAP.allTopics().forEach(function (t) {
      var trAd = t.title;
      var enAd = SAP.i18n.baslikDil(t, 'en');
      ix.push({
        tur: 'topic', baslik: SAP.i18n.baslik(t),
        alt: SAP.i18n.ozet(t),
        href: '#/konu/' + encodeURIComponent(t.id),
        anahtar: SAP.norm([trAd, enAd, t.summary, SAP.i18n.ozetDil(t, 'en'),
                           t.id, t.level || ''].join(' ')),
        ad: SAP.norm(SAP.i18n.baslik(t)),
        agirlik: t.status === 'ready' ? 3 : 1,
      });
    });

    SAP.tcodeMap.forEach(function (x) {
      ix.push({
        tur: 'tcode', baslik: x.kod,
        alt: x.ad + ' — ' + (x.modul || ''),
        href: '#/tcode/' + encodeURIComponent(SAP.upper(x.kod)),
        anahtar: SAP.norm(x.kod + ' ' + x.ad + ' ' + (x.aciklama || '') + ' ' + (x.modul || '')),
        ad: SAP.norm(x.kod),
        agirlik: 2,
      });
    });

    SAP.tableMap.forEach(function (x) {
      ix.push({
        tur: 'table', baslik: x.ad,
        alt: x.baslik + ' — ' + (x.modul || ''),
        href: '#/tablo/' + encodeURIComponent(SAP.upper(x.ad)),
        anahtar: SAP.norm(x.ad + ' ' + x.baslik + ' ' + (x.aciklama || '')),
        ad: SAP.norm(x.ad),
        agirlik: 2,
      });
    });

    SAP.termMap.forEach(function (x, k) {
      ix.push({
        tur: 'term', baslik: x.ad,
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
    /* ⚠️ İndeks DİLE BAĞLI: görünen başlık seçili dilden geliyor.
       Dil değiştiğinde yeniden kurulmazsa palet eski dilde kalırdı. */
    var d = SAP.i18n.get();
    if (!index || indexDil !== d) { index = build(); indexDil = d; }
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
