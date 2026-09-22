/* ==========================================================================
   learn.js — Notlar, ilerleme, favori ve yazdırma
   --------------------------------------------------------------------------
   Notlar tam sayfa yeniden çizim YAPMAZ; DOM'u noktasal günceller —
   yazarken sayfa yeniden çizilirse imleç ve kaydırma konumu kaybolur.
   ========================================================================== */

(function (SAP) {
  'use strict';

  var esc = SAP.esc, mk = SAP.mk;
  var T = function (k) { return SAP.i18n.t(k); };


  /* ============================================== MİNİ SINAV ====
     KALDIRILDI (kullanıcı talebi) — öğrenme bölümüyle birlikte.
     Gerekçesi sections.js'te yazılı. Quiz verisi ve `store.d.quiz`
     puanları duruyor; geri istenirse quizHTML yeniden yazılır. */

  /* ================================================= SORU KARTLARI ====
     KALDIRILDI (kullanıcı talebi, Eylül 2026).

     Gerekçe: kart, içeriği yüksek boş bir kutunun ortasında tek satır
     olarak gösteriyordu; sayfanın geri kalanının yoğunluğu yanında
     boşluk olarak okunuyordu.

     UYARI — İçerik SİLİNMEDİ: `ogrenme.flashcards` verisi 36 konu dosyasında
     duruyor (yaklaşık 430 kart). Özellik geri istenirse bu blok ve
     sections.js'teki iki satır geri konur; içerik yeniden yazılmaz.
     Bölümün özet / önemli noktalar / sık hatalar / quiz parçaları
     zaten aynı bilgiyi taşıyor. */

  /* ======================================================= NOTLAR ==== */

  function notesHTML(topicId) {
    var v = SAP.store.note(topicId);
    return '<div class="notes">' +
      '<textarea data-note="' + esc(topicId) + '" rows="6" ' +
        'placeholder="' + esc(T('notes.ph')) + '">' + esc(v) + '</textarea>' +
      '<div class="notes-f"><span data-note-status>' +
        (v ? T('notes.saved') + ' · ' + v.length + ' ' + T('notes.chars') : '') +
      '</span></div>' +
    '</div>';
  }

  var noteTimer = null;
  document.addEventListener('input', function (e) {
    var ta = e.target;
    if (!ta || !ta.dataset || ta.dataset.note === undefined) return;
    clearTimeout(noteTimer);
    var id = ta.dataset.note, val = ta.value;
    var status = ta.parentElement.querySelector('[data-note-status]');
    if (status) status.textContent = T('notes.saving');
    noteTimer = setTimeout(function () {
      SAP.store.setNote(id, val);
      if (status) status.textContent = val.trim()
        ? T('notes.saved') + ' · ' + val.length + ' ' + T('notes.chars') : '';
    }, 500);
  });

  /* ============================================ İLERLEME / FAVORİ ==== */

  SAP.action('toggle-read', function (btn) {
    SAP.store.toggleRead(btn.dataset.t, btn.dataset.s);
    SAP.render({ keepScroll: true });
  });

  SAP.action('toggle-fav', function (btn) {
    var eklendi = SAP.store.toggleFav(btn.dataset.t);
    var t = SAP.topic(btn.dataset.t);
    SAP.toast((eklendi ? T('topic.fav') : T('topic.unfav')) + ': ' + (t ? SAP.i18n.baslik(t) : ''));
    SAP.render({ keepScroll: true });
  });

  SAP.action('topic-complete', function (btn) {
    var tid = btn.dataset.t;
    var t = SAP.topic(tid);
    if (!t) return;
    var ids = SAP.sectionIds(t);
    var hepsi = SAP.store.readCount(tid) >= ids.length;
    if (hepsi) {
      delete SAP.store.d.progress[tid];
      SAP.toast('—');
    } else {
      var p = SAP.store.d.progress[tid] || (SAP.store.d.progress[tid] = {});
      ids.forEach(function (s) { p[s] = 1; });
      SAP.toast(T('topic.done') + ': ' + SAP.i18n.baslik(t));
    }
    SAP.store.save();
    SAP.render({ keepScroll: true });
  });

  SAP.action('print', function () { window.print(); });

  SAP.learn = { notesHTML: notesHTML };

})(window.SAP);
