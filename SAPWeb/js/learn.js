/* ==========================================================================
   learn.js — Öğrenme katmanı: quiz, flash kartlar, notlar, ilerleme, favori
   --------------------------------------------------------------------------
   Bu bileşenler tam sayfa yeniden çizim YAPMAZ; DOM'u noktasal günceller.
   Sebep: quiz cevabında sayfa yeniden çizilirse kaydırma konumu ve
   flash kartın 3D dönüş animasyonu kaybolur.
   ========================================================================== */

(function (SAP) {
  'use strict';

  var esc = SAP.esc, mk = SAP.mk;
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
      '<div class="quiz-h"><b>🎯 Mini quiz</b>' +
        '<span class="sc" data-quiz-score>' +
          (kayit ? 'Önceki sonuç: ' + kayit.dogru + ' / ' + kayit.toplam : '0 / ' + sorular.length) +
        '</span>' +
      '</div>' + body +
      '<div class="quiz-f">' +
        '<button class="btn sm" type="button" data-action="quiz-reset" data-t="' + esc(topicId) + '">↺ Baştan çöz</button>' +
        '<span style="font-size:12.5px;color:var(--text-3)">Bir şıkka tıklayınca doğru cevap ve açıklaması görünür.</span>' +
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
      SAP.toast(yuzde === 100 ? '🎉 Tam puan! ' + dogruSayisi + ' / ' + toplam
                              : 'Quiz bitti: ' + dogruSayisi + ' / ' + toplam + ' (%' + yuzde + ')');
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

  /* =================================================== FLASH KART ==== */

  /**
   * Tüm kartlar DOM'a basılır, yalnızca güncel olan görünür. Böylece ileri-geri
   * gezinirken içerik yeniden üretilmez ve 3D dönüş animasyonu bozulmaz.
   */
  function flashHTML(topicId, kartlar) {
    var faces = kartlar.map(function (k, i) {
      return '<div class="fc-scene" data-fc-card="' + i + '"' + (i ? ' hidden' : '') + ' ' +
             'data-action="flash-flip" role="button" tabindex="0" aria-label="Kartı çevir">' +
        '<div class="fc-inner">' +
          '<div class="fc-face front">' +
            '<div class="fc-lb">Soru</div>' +
            '<div class="fc-tx">' + mk(k.on) + '</div>' +
            '<div class="fc-hint">Cevap için tıkla · Space</div>' +
          '</div>' +
          '<div class="fc-face back">' +
            '<div class="fc-lb">Cevap</div>' +
            '<div class="fc-tx">' + mk(k.arka) + '</div>' +
            '<div class="fc-hint">← / → ile gezin</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="fc-wrap" data-fc="' + esc(topicId) + '" data-i="0" data-n="' + kartlar.length + '">' +
      faces +
      '<div class="fc-nav">' +
        '<button class="btn sm" type="button" data-action="flash-prev">← Önceki</button>' +
        '<span class="pos" data-fc-pos>1 / ' + kartlar.length + '</span>' +
        '<button class="btn sm" type="button" data-action="flash-next">Sonraki →</button>' +
      '</div>' +
    '</div>';
  }

  function flashShow(wrap, i) {
    var n = Number(wrap.dataset.n);
    i = (i + n) % n;
    wrap.dataset.i = String(i);
    wrap.querySelectorAll('[data-fc-card]').forEach(function (c) {
      var on = Number(c.dataset.fcCard) === i;
      c.hidden = !on;
      if (!on) c.querySelector('.fc-inner').classList.remove('flip');
    });
    var pos = wrap.querySelector('[data-fc-pos]');
    if (pos) pos.textContent = (i + 1) + ' / ' + n;
  }

  SAP.action('flash-flip', function (scene) {
    var inner = scene.querySelector('.fc-inner');
    if (inner) inner.classList.toggle('flip');
  });
  SAP.action('flash-next', function (btn) {
    var w = btn.closest('.fc-wrap'); if (w) flashShow(w, Number(w.dataset.i) + 1);
  });
  SAP.action('flash-prev', function (btn) {
    var w = btn.closest('.fc-wrap'); if (w) flashShow(w, Number(w.dataset.i) - 1);
  });

  /* Flash kart klavye kısayolları — yalnızca kart ekranda görünürken. */
  document.addEventListener('keydown', function (e) {
    var w = document.querySelector('.fc-wrap');
    if (!w) return;
    var t = e.target;
    if (t && typeof t.closest === 'function' && t.closest('input, textarea, select')) return;
    if (document.querySelector('.palette-bg')) return;

    if (e.key === ' ' || e.key === 'Enter') {
      var cur = w.querySelector('[data-fc-card]:not([hidden]) .fc-inner');
      if (cur) { e.preventDefault(); cur.classList.toggle('flip'); }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault(); flashShow(w, Number(w.dataset.i) + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault(); flashShow(w, Number(w.dataset.i) - 1);
    }
  });

  /* ======================================================= NOTLAR ==== */

  function notesHTML(topicId) {
    var v = SAP.store.note(topicId);
    return '<div class="notes">' +
      '<textarea data-note="' + esc(topicId) + '" rows="6" ' +
        'placeholder="Bu konuyla ilgili kendi notlarını buraya yaz. Otomatik kaydedilir.">' + esc(v) + '</textarea>' +
      '<div class="notes-f"><span data-note-status>' +
        (v ? '✓ Kayıtlı · ' + v.length + ' karakter' : 'Henüz not yok') +
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
    if (status) status.textContent = 'Yazılıyor…';
    noteTimer = setTimeout(function () {
      SAP.store.setNote(id, val);
      if (status) status.textContent = val.trim() ? '✓ Kayıtlı · ' + val.length + ' karakter' : 'Henüz not yok';
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
    SAP.toast(eklendi ? '⭐ Favorilere eklendi: ' + (t ? t.title : '')
                      : 'Favorilerden çıkarıldı');
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
      SAP.toast('İlerleme sıfırlandı');
    } else {
      var p = SAP.store.d.progress[tid] || (SAP.store.d.progress[tid] = {});
      ids.forEach(function (s) { p[s] = 1; });
      SAP.toast('✅ Konu tamamlandı: ' + t.title);
    }
    SAP.store.save();
    SAP.render({ keepScroll: true });
  });

  SAP.action('print', function () { window.print(); });

  SAP.learn = { quizHTML: quizHTML, flashHTML: flashHTML, notesHTML: notesHTML };

})(window.SAP);
