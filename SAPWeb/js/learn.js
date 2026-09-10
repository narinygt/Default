/* ==========================================================================
   learn.js — Öğrenme katmanı: quiz, notlar, ilerleme, favori
   --------------------------------------------------------------------------
   Bu bileşenler tam sayfa yeniden çizim YAPMAZ; DOM'u noktasal günceller.
   Sebep: quiz cevabında sayfa yeniden çizilirse kaydırma konumu ve
   açılmış açıklamalar kaybolur.
   ========================================================================== */

(function (SAP) {
  'use strict';

  var esc = SAP.esc, mk = SAP.mk;
  var T = function (k) { return SAP.i18n.t(k); };
  var HARF = ['A', 'B', 'C', 'D', 'E', 'F'];

  /* Oturum içi quiz durumu: { topicId: { qIndex: seciliIndex } } */
  var quizState = {};

  /* ======================================================== QUIZ ==== */

  function quizHTML(topicId, sorular) {
    var kayit = SAP.store.d.quiz[topicId];
    var body = sorular.map(function (q, qi) {
      var opts = q.secenekler.map(function (o, oi) {
        return '<button class="opt" type="button" data-action="quiz-answer" ' +
          'data-t="' + esc(topicId) + '" data-q="' + qi + '" data-o="' + oi + '">' +
          '<span class="mk">' + HARF[oi] + '</span><span>' + mk(o) + '</span></button>';
      }).join('');

      return '<div class="quiz-q" data-qi="' + qi + '" data-dogru="' + q.dogru + '">' +
        '<div class="q"><span class="n">' + (qi + 1) + '</span><span>' + mk(q.soru) + '</span></div>' +
        '<div class="opts">' + opts + '</div>' +
        '<div class="quiz-ex" hidden>' + mk(q.aciklama || '') + '</div>' +
      '</div>';
    }).join('');

    return '<div class="quiz" data-quiz="' + esc(topicId) + '" data-toplam="' + sorular.length + '">' +
      '<div class="quiz-h"><b>' + esc(T('quiz.title')) + '</b>' +
        '<span class="sc tnum" data-quiz-score>' +
          (kayit ? kayit.dogru + ' / ' + kayit.toplam : '0 / ' + sorular.length) +
        '</span>' +
      '</div>' + body +
      '<div class="quiz-f">' +
        '<button class="btn sm" type="button" data-action="quiz-reset" data-t="' + esc(topicId) + '">' +
          esc(T('quiz.reset')) + '</button>' +
        '<span class="quiz-hint">' + esc(T('quiz.hint')) + '</span>' +
      '</div>' +
    '</div>';
  }

  SAP.action('quiz-answer', function (btn) {
    var box = btn.closest('.quiz-q');
    var quiz = btn.closest('.quiz');
    if (!box || !quiz || box.dataset.cevaplandi) return;

    var topicId = btn.dataset.t;
    var qi = Number(btn.dataset.q);
    var secilen = Number(btn.dataset.o);
    var dogru = Number(box.dataset.dogru);

    box.dataset.cevaplandi = '1';
    (quizState[topicId] || (quizState[topicId] = {}))[qi] = secilen;

    box.querySelectorAll('.opt').forEach(function (o, i) {
      o.disabled = true;
      if (i === dogru) o.classList.add('ok');
      else if (i === secilen) o.classList.add('bad');
    });

    var ex = box.querySelector('.quiz-ex');
    if (ex && ex.textContent.trim()) ex.hidden = false;

    /* Skoru tazele ve tüm sorular cevaplandıysa kalıcı olarak sakla. */
    var toplam = Number(quiz.dataset.toplam);
    var cevaplar = quizState[topicId] || {};
    var dogruSayisi = 0, cevaplanan = 0;
    quiz.querySelectorAll('.quiz-q').forEach(function (q, i) {
      if (cevaplar[i] == null) return;
      cevaplanan++;
      if (cevaplar[i] === Number(q.dataset.dogru)) dogruSayisi++;
    });

    var sc = quiz.querySelector('[data-quiz-score]');
    if (sc) sc.textContent = dogruSayisi + ' / ' + toplam;

    if (cevaplanan === toplam) {
      SAP.store.d.quiz[topicId] = { dogru: dogruSayisi, toplam: toplam, ts: Date.now() };
      SAP.store.save();
      var yuzde = Math.round((dogruSayisi / toplam) * 100);
      SAP.toast(T('quiz.done') + ': ' + dogruSayisi + ' / ' + toplam +
                ' (' + SAP.i18n.yuzde(yuzde) + ')');
    }
  });

  SAP.action('quiz-reset', function (btn) {
    var topicId = btn.dataset.t;
    delete quizState[topicId];
    var quiz = btn.closest('.quiz');
    if (!quiz) return;
    quiz.querySelectorAll('.quiz-q').forEach(function (q) {
      delete q.dataset.cevaplandi;
      q.querySelectorAll('.opt').forEach(function (o) {
        o.disabled = false;
        o.classList.remove('ok', 'bad');
      });
      var ex = q.querySelector('.quiz-ex');
      if (ex) ex.hidden = true;
    });
    var sc = quiz.querySelector('[data-quiz-score]');
    if (sc) sc.textContent = '0 / ' + quiz.dataset.toplam;
  });

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

  SAP.learn = { quizHTML: quizHTML, notesHTML: notesHTML };

})(window.SAP);
