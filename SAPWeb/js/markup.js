/* ==========================================================================
   markup.js — Çapraz bağlantı motoru + satır içi mini biçimlendirme
   --------------------------------------------------------------------------
   İçerik yazarı düz metinde şunu yazar:
       "{{FB50}} ile kayıt girilir, {{BSEG}} tablosuna yazılır."
   Burada {{...}} işaretleri tıklanabilir çiplere çevrilir. Anahtar sırayla
   T-code → tablo → terim → konu defterlerinde aranır. Açık önek de yazılabilir:
       {{tcode:FB50}}  {{tablo:BSEG}}  {{terim:kapatma}}  {{konu:gl-accounting}}
   İsteğe bağlı etiket:  {{FB50|G/L kayıt ekranı}}

   SIRA KRİTİK: önce HTML escape, sonra biçimlendirme, en son işaret çözümleme.
   Aksi halde içerikten gelen metin HTML olarak yorumlanır.
   ========================================================================== */

(function (SAP) {
  'use strict';

  /** Çözülemeyen işaretler burada birikir; SAP.auditRefs() raporlar. */
  SAP.unresolved = [];

  var REF = /\{\{([^}|]+)(?:\|([^}]*))?\}\}/g;

  function chip(cls, href, label, tip) {
    return '<a class="ref ' + cls + '" data-go="' + SAP.esc(href) + '" href="' + SAP.esc(href) + '"' +
           (tip ? ' title="' + SAP.esc(tip) + '"' : '') + '>' + SAP.esc(label) + '</a>';
  }

  /** Tek bir {{...}} anahtarını çipe çevirir; bulunamazsa null döner. */
  function resolve(rawKey, label) {
    var key = String(rawKey).trim();
    var kind = null;
    var m = /^(tcode|tablo|table|terim|term|konu|topic)\s*:\s*(.+)$/i.exec(key);
    if (m) { kind = m[1].toLowerCase(); key = m[2].trim(); }

    var x;

    if (!kind || kind === 'tcode') {
      x = SAP.tcode(key);
      if (x) return chip('ref-tcode', '#/tcode/' + encodeURIComponent(SAP.upper(x.kod)),
                         label || x.kod, x.ad + (x.aciklama ? ' — ' + x.aciklama : ''));
      if (kind) return null;
    }

    if (!kind || kind === 'tablo' || kind === 'table') {
      x = SAP.table(key);
      if (x) return chip('ref-table', '#/tablo/' + encodeURIComponent(SAP.upper(x.ad)),
                         label || x.ad, x.baslik + (x.aciklama ? ' — ' + x.aciklama : ''));
      if (kind) return null;
    }

    if (!kind || kind === 'terim' || kind === 'term') {
      x = SAP.term(key);
      if (x) return chip('ref-term', '#/terim/' + encodeURIComponent(SAP.slug(x.anahtar || x.ad)),
                         label || x.ad, x.aciklama);
      if (kind) return null;
    }

    if (!kind || kind === 'konu' || kind === 'topic') {
      x = SAP.topic(key) || SAP.topic(SAP.slug(key));
      if (x) return chip('ref-topic', '#/konu/' + encodeURIComponent(x.id),
                         label || x.title, x.summary);
    }

    return null;
  }

  function applyRefs(s) {
    return s.replace(REF, function (all, key, label) {
      var out = resolve(key, label);
      if (out) return out;
      var k = String(key).trim();
      if (SAP.unresolved.indexOf(k) === -1) SAP.unresolved.push(k);
      return '<span class="ref ref-miss" title="Sözlükte bulunamadı: ' + SAP.esc(k) + '">' +
             SAP.esc(label || k) + '</span>';
    });
  }

  function inline(s) {
    return s
      .replace(/`([^`\n]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
      .replace(/(^|\s)--(\s|$)/g, '$1—$2')
      .replace(/->/g, '→');
  }

  /** Satır içi metin: escape + biçim + çapraz link. Yeni satır <br> olur. */
  function mk(s) {
    if (s == null || s === '') return '';
    return applyRefs(inline(SAP.esc(s))).replace(/\n/g, '<br>');
  }

  /** Blok metin: boş satırlar paragrafa dönüşür. */
  function mkp(s) {
    if (s == null || s === '') return '';
    return String(s).split(/\n\s*\n/).map(function (par) {
      return '<p>' + applyRefs(inline(SAP.esc(par.trim()))).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  /** Dizi → <ul>. Her öğe mk()'dan geçer. */
  function mkul(arr, cls) {
    if (!arr || !arr.length) return '';
    return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>' +
      arr.map(function (x) { return '<li>' + mk(x) + '</li>'; }).join('') + '</ul>';
  }

  function mkol(arr) {
    if (!arr || !arr.length) return '';
    return '<ol>' + arr.map(function (x) { return '<li>' + mk(x) + '</li>'; }).join('') + '</ol>';
  }

  /* ------------------------------------------------- öz denetim ------- */

  /**
   * Kayıtlı tüm içeriği derinlemesine gezip her metindeki {{...}} işaretini
   * çözmeyi dener. Konsola rapor basar ve çözülemeyenlerin listesini döner.
   * Doğrulama adımı #4: bu liste boş olmalı.
   */
  function auditRefs() {
    var missing = new Map();   // anahtar -> [nerede]
    var seen = new Set();
    var count = 0;

    function walk(node, path) {
      if (node == null) return;
      if (typeof node === 'string') {
        var m, re = new RegExp(REF.source, 'g');
        while ((m = re.exec(node))) {
          count++;
          if (!resolve(m[1], m[2])) {
            var k = m[1].trim();
            if (!missing.has(k)) missing.set(k, []);
            if (missing.get(k).length < 4) missing.get(k).push(path);
          }
        }
        return;
      }
      if (typeof node !== 'object') return;
      if (seen.has(node)) return;
      seen.add(node);
      if (Array.isArray(node)) {
        node.forEach(function (v, i) { walk(v, path + '[' + i + ']'); });
      } else {
        Object.keys(node).forEach(function (k) { walk(node[k], path + '.' + k); });
      }
    }

    SAP.allTopics().forEach(function (t) { walk(t, t.id); });
    SAP.tcodeMap.forEach(function (v, k) { walk(v, 'tcode:' + k); });
    SAP.tableMap.forEach(function (v, k) { walk(v, 'tablo:' + k); });
    SAP.termMap.forEach(function (v, k) { walk(v, 'terim:' + k); });

    /* İkinci geçiş: bazı alanlar metinde {{…}} taşımaz ama renderer onlardan
       çizim anında işaret üretir (örn. teknik.guncellenenTablolar[].tablo).
       Bu değerler yukarıdaki tarama tarafından görülemez; ayrıca denetlenir. */
    function checkRef(deger, path) {
      if (!deger) return;
      String(deger).split(/\s*[\/,;·]\s*|\s+ve\s+/).forEach(function (parca) {
        var s = parca.trim();
        if (!s) return;
        count++;
        if (!resolve(s, null)) {
          if (!missing.has(s)) missing.set(s, []);
          if (missing.get(s).length < 4) missing.get(s).push(path);
        }
      });
    }

    SAP.allTopics().forEach(function (t) {
      var s = t.sections || {};
      ((s.teknik || {}).guncellenenTablolar || []).forEach(function (x, i) {
        checkRef(x.tablo, t.id + '.teknik.guncellenenTablolar[' + i + '].tablo');
      });
      ((s.senaryo || {}).adimlar || []).forEach(function (a, ai) {
        (a.tabloEtkisi || []).forEach(function (x, i) {
          checkRef(x.tablo, t.id + '.senaryo.adimlar[' + ai + '].tabloEtkisi[' + i + '].tablo');
        });
        if (a.tcode) checkRef(a.tcode, t.id + '.senaryo.adimlar[' + ai + '].tcode');
      });
      /* tanim.kavramlar: renderer her anahtarı '{{terim:<anahtar>}}' olarak çizer. */
      ((s.tanim || {}).kavramlar || []).forEach(function (x, i) {
        checkRef('terim:' + x, t.id + '.tanim.kavramlar[' + i + ']');
      });
      /* cesitler.liste[].tcodes ve tcodes.liste[].ilgili de çizim anında çipe döner. */
      ((s.cesitler || {}).liste || []).forEach(function (c, ci) {
        (c.tcodes || []).forEach(function (x, i) {
          checkRef(x, t.id + '.cesitler.liste[' + ci + '].tcodes[' + i + ']');
        });
      });
      ((s.tcodes || {}).liste || []).forEach(function (c, ci) {
        (c.ilgili || []).forEach(function (x, i) {
          checkRef(x, t.id + '.tcodes.liste[' + ci + '].ilgili[' + i + ']');
        });
      });
      (t.tcodes || []).forEach(function (x, i) { checkRef(x, t.id + '.tcodes[' + i + ']'); });
      (t.tables || []).forEach(function (x, i) { checkRef(x, t.id + '.tables[' + i + ']'); });
      (t.related || []).forEach(function (x, i) {
        count++;
        if (!SAP.topic(x)) {
          if (!missing.has(x)) missing.set(x, []);
          missing.get(x).push(t.id + '.related[' + i + ']');
        }
      });
    });

    var out = [];
    missing.forEach(function (where, key) { out.push({ anahtar: key, nerede: where }); });

    if (out.length) {
      console.warn('[SAP] Çözülemeyen ' + out.length + ' işaret (' + count + ' işaret tarandı):');
      console.table(out.map(function (x) { return { anahtar: x.anahtar, ilkGorulen: x.nerede[0] }; }));
    } else {
      console.info('[SAP] ✓ ' + count + ' çapraz bağlantı işaretinin tamamı çözüldü.');
    }
    return out;
  }

  SAP.mk = mk;
  SAP.mkp = mkp;
  SAP.mkul = mkul;
  SAP.mkol = mkol;
  SAP.refChip = chip;
  SAP.resolveRef = resolve;
  SAP.auditRefs = auditRefs;

})(window.SAP);
