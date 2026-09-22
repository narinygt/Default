/* ==========================================================================
   views.js — Ekranlar
   #/                ana sayfa (konu kartları)
   #/konu/<id>       konu sayfası (11 bölüm)
   #/tcode/<KOD>     işlem kodu detayı
   #/tablo/<AD>      tablo detayı
   #/terim/<anahtar> sözlük detayı
   #/favoriler #/notlar #/ara/<q>
   ========================================================================== */

(function (SAP) {
  'use strict';

  var esc = SAP.esc, mk = SAP.mk, mkp = SAP.mkp, mkul = SAP.mkul;
  /** Sözlük alanını DİLE GÖRE oku (`aciklama` → EN modda `aciklama_en`). */
  var A = SAP.alan;
  var U = SAP.ui;
  var T = function (k) { return SAP.i18n.t(k); };

  /* ------------------------------------------------------ yardımcı --- */

  function grup(id) {
    return SAP.GROUPS.find(function (x) { return x.id === id; }) || {};
  }
  /** Konu başlığı — dile göre. */
  function bas(t) { return SAP.i18n.baslik(t); }
  /** İki haneli sıra numarası: 01, 02… Kitap dizini böyle numaralanır. */
  function nn(i) { return (i + 1 < 10 ? '0' : '') + (i + 1); }

  /** İlgili konular — kart değil, düz liste. */
  function relatedGrid(ids) {
    var items = (ids || []).map(SAP.topic).filter(Boolean);
    if (!items.length) return '';
    return '<div class="rel-list">' + items.map(function (t) {
      return '<a class="rel-item" data-go="#/konu/' + esc(t.id) + '" href="#/konu/' + esc(t.id) + '">' +
        '<span>' + esc(bas(t)) + '</span>' +
        '<span class="m">' + esc(SAP.i18n.seviye(t.level)) + '</span>' +
      '</a>';
    }).join('') + '</div>';
  }

  /** Bir T-code veya tablonun geçtiği konuları bulur (geri bağlantı). */
  function backlinks(kind, key) {
    var K = SAP.upper(key);
    return SAP.allTopics().filter(function (t) {
      var arr = kind === 'tcode' ? t.tcodes : t.tables;
      return (arr || []).some(function (x) { return SAP.upper(x) === K; });
    });
  }

  /* ==================================================== İÇİNDEKİLER ====
     Ana sayfa bir KİTABIN İÇİNDEKİLER SAYFASIDIR:
       · üstte tek bir eylem ("kaldığın yerden devam et") + ince çubuk
       · altında dokuz bölüm, her biri numaralı bir konu listesi
     Kart ızgarası, rozet, istatistik kutusu ve üst süzgeç şeridi YOK.
     Süzgeç gerekmiyor çünkü dizinin tamamı zaten tek ekranda taranabilir;
     gezinme tek yerde (sol sütun) duruyor. */

  SAP.view('home', function () {
    var all = SAP.allTopics();
    var hazir = all.filter(function (t) { return t.status === 'ready'; });

    var toplamBolum = 0, okunanBolum = 0;
    hazir.forEach(function (t) {
      toplamBolum += SAP.sectionIds(t).length;
      okunanBolum += SAP.store.readCount(t.id);
    });
    var genel = toplamBolum ? Math.round((okunanBolum / toplamBolum) * 100) : 0;

    /* Devam edilecek konu: yarım kalan varsa o, yoksa ilk bitmemiş konu. */
    var yarim = null, enYuksek = 0;
    hazir.forEach(function (t) {
      var p = SAP.store.percent(t.id);
      if (p > 0 && p < 100 && p >= enYuksek) { enYuksek = p; yarim = t; }
    });
    var hedef = yarim ||
      hazir.filter(function (t) { return SAP.store.percent(t.id) < 100; })[0] || hazir[0];

    /* Devam düğmesi: hap biçimli ana eylem + düğme-içinde-düğme ok. */
    var resume = hedef
      ? '<div class="hero-acts">' +
          '<a class="cta" data-go="#/konu/' + esc(hedef.id) + '" href="#/konu/' + esc(hedef.id) + '">' +
            '<span class="cta-t"><small>' + esc(yarim ? T('home.resume') : T('home.start')) + '</small>' +
              esc(bas(hedef)) + '</span>' +
            '<span class="cta-ic" aria-hidden="true">' + U.icon('arrow-up-right') + '</span>' +
          '</a>' +
          '<div class="hero-prog">' +
            '<span>' + esc(T('home.progress')) + '</span>' +
            '<span class="resume-bar"><i style="width:' + genel + '%"></i></span>' +
            '<span class="tnum">' + SAP.i18n.yuzde(genel) + '</span>' +
          '</div>' +
        '</div>'
      : '';

    /* Dokuz bölüm, 01'den başlayan sürekli numaralandırma.
       Numara KONUYA aittir, gruba değil: kitapta bölüm 3'ün ilk konusu
       "12" ise okuyucu onu 12 olarak arar. */
    var sira = 0;
    var bolumler = SAP.GROUPS.map(function (g, gi) {
      var list = all.filter(function (t) { return t.grup === g.id; });
      if (!list.length) return '';

      var satirlar = list.map(function (t) {
        var i = sira++;
        var p = SAP.store.percent(t.id);
        var durum = p >= 100 ? ' done' : p > 0 ? ' part' : '';
        var acik = SAP.store.isTocOpen(t.id);
        return '<div class="idx-wrap">' +
          '<button class="idx-row' + (p >= 100 ? ' read' : '') + '" type="button" ' +
                  'data-action="toc-toggle" data-t="' + esc(t.id) + '" ' +
                  'aria-expanded="' + (acik ? 'true' : 'false') + '">' +
            '<span class="idx-n">' + nn(i) + '</span>' +
            '<span class="idx-t">' + esc(bas(t)) + '</span>' +
            /* Süre ve sayaç YOK. Bir kitabın içindekiler sayfasında
               "40 dk" yazmaz; okuma hızı okuyucunun işidir. Kalan iki
               işaret bilgi taşır: seviye ve okundu durumu. */
            '<span class="idx-m">' +
              '<span class="idx-lv">' + esc(SAP.i18n.seviye(t.level)) + '</span>' +
              '<span class="idx-dot' + durum + '"></span>' +
            '</span>' +
          '</button>' +
          '<div class="idx-sum' + (acik ? ' open' : '') + '" data-sum="' + esc(t.id) + '"><div>' +
            esc(SAP.i18n.ozet(t)) +
            '<a class="idx-go" data-go="#/konu/' + esc(t.id) + '" href="#/konu/' + esc(t.id) + '">' +
              esc(T('home.start')) + U.icon('arrow-right') + '</a>' +
          '</div></div>' +
        '</div>';
      }).join('');

      /* --h: grubun tonu (catalog.js). Renk yalnızca numara ve ince
         şeritte görünür — dolgu yok, bkz. theme.css "GRUP RENGİ". */
      return '<section class="part bezel b-' + (gi % 9) + '" style="--h:' + SAP.grupHue(g.id) + '">' +
        '<div class="part-h">' +
          '<span class="part-n">' + nn(gi) + '</span>' +
          '<h2>' + esc(SAP.i18n.grup(g)) + '</h2>' +
        '</div>' +
        '<div class="idx">' + satirlar + '</div>' +
      '</section>';
    }).join('');

    return '<div class="wrap-full">' +
      /* Alt başlık YOK: "Otuz altı konu, dokuz bölüm" bilgisi zaten
         dizinin kendisinde duruyor — sayarak değil bakarak görülür. */
      /* Künye: başlık + T-hesap motifi. Motif süs değil, kitabın
         konusunun resmi — borç solda, alacak sağda, arada tek dikey
         kural. Gömülü SVG: harici dosya yok (çevrimdışı kuralı),
         currentColor ile iki temada da doğru. aria-hidden çünkü
         bilgi taşımıyor, ritim taşıyor. */
      '<section class="hero">' +
        '<span class="eyebrow">' + esc(T('hero.eyebrow')) + '</span>' +
        '<h1 class="hero-t">' + esc(T('hero.title')) + '</h1>' +
        '<p class="hero-p">' + esc(T('hero.lede').replace('{n}', all.length)) + '</p>' +
        komutAlani() +
        resume +
      '</section>' +
      '<header class="toc-head">' +
        '<span class="eyebrow">' + esc(T('hero.parts')) + '</span>' +
        '<h2>' + esc(T('home.title')) + '</h2>' +
      '</header>' +
      '<div class="bento">' + bolumler + '</div>' +
    '</div>';
  });

  /* ================================================== KOMUT ALANI ====
     Sayfanın tek cesur öğesi (theme.css ilke 7). SAP'de her iş sol
     üstteki komut alanına bir işlem kodu yazmakla başlar; ana sayfa da
     öyle başlar. `/n` öneki SAP'deki "yeni işlem" yazımıdır.
     Sonuçlar alanın ALTINDA, yerinde listelenir — palet açılmaz, çünkü
     alan zaten sayfanın kendisi. Arama motoru paletle aynıdır
     (SAP.search), iki ayrı sıralama yoktur. */

  var DENE = ['FB50', 'F110', 'FBL1N', 'BSEG', 'ACDOCA'];
  var TUR_ETIKET = { topic: 'search.kind.topic', tcode: 'search.kind.tcode',
                     table: 'search.kind.table', term: 'search.kind.term' };

  function komutAlani() {
    return '<div class="cmd">' +
      '<label class="cmd-l" for="cmd-in">' + esc(T('cmd.label')) + '</label>' +
      '<div class="cmd-field">' +
        '<span class="cmd-pre" aria-hidden="true">/n</span>' +
        '<input id="cmd-in" class="cmd-in" type="text" autocomplete="off" ' +
          'spellcheck="false" autocapitalize="characters" ' +
          'placeholder="' + esc(T('cmd.placeholder')) + '" ' +
          'role="combobox" aria-expanded="false" aria-controls="cmd-res" ' +
          'aria-autocomplete="list">' +
        '<kbd class="cmd-kbd">Enter</kbd>' +
      '</div>' +
      '<div class="cmd-res" id="cmd-res" role="listbox" aria-label="' + esc(T('search.title')) + '"></div>' +
      '<div class="cmd-try"><span>' + esc(T('cmd.try')) + '</span>' +
        DENE.map(function (k) {
          return '<button class="cmd-chip" type="button" data-cmd="' + k + '">' + k + '</button>';
        }).join('') +
      '</div>' +
    '</div>';
  }

  SAP.onRender(function (route, host) {
    var input = host.querySelector('#cmd-in');
    if (!input) return;
    var box = host.querySelector('#cmd-res');
    var res = [], sel = 0;

    function ciz() {
      var q = input.value.trim();
      res = q ? SAP.search(q, 6) : [];
      sel = 0;
      input.setAttribute('aria-expanded', res.length || q ? 'true' : 'false');
      if (!q) { box.innerHTML = ''; return; }
      if (!res.length) {
        box.innerHTML = '<p class="cmd-empty">' + esc(T('cmd.empty')) + '</p>';
        return;
      }
      box.innerHTML = res.map(function (r, i) {
        var sistem = r.tur === 'tcode' || r.tur === 'table';
        return '<a class="cmd-row' + (i === sel ? ' sel' : '') + '" role="option" ' +
            'id="cmd-o' + i + '" aria-selected="' + (i === sel) + '" ' +
            'data-go="' + esc(r.href) + '" href="' + esc(r.href) + '">' +
          '<b' + (sistem ? ' class="sys"' : '') + '>' + esc(r.baslik) + '</b>' +
          '<span class="alt">' + esc(r.alt || '') + '</span>' +
          '<span class="kind">' + esc(T(TUR_ETIKET[r.tur] || 'search.topic')) + '</span>' +
        '</a>';
      }).join('');
      isaretle();
    }

    function isaretle() {
      var rows = box.querySelectorAll('.cmd-row');
      rows.forEach(function (r, i) {
        r.classList.toggle('sel', i === sel);
        r.setAttribute('aria-selected', i === sel ? 'true' : 'false');
      });
      if (rows[sel]) input.setAttribute('aria-activedescendant', 'cmd-o' + sel);
      else input.removeAttribute('aria-activedescendant');
    }

    input.addEventListener('input', ciz);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!res.length) return;
        e.preventDefault();
        sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + res.length) % res.length;
        isaretle();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (res[sel]) SAP.go(res[sel].href);
      } else if (e.key === 'Escape') {
        input.value = ''; ciz();
      }
    });

    host.querySelectorAll('[data-cmd]').forEach(function (b) {
      b.addEventListener('click', function () {
        input.value = b.dataset.cmd;
        input.focus();
        ciz();
      });
    });
  });

  /* Dizin satırı açılıp kapanır. Tam sayfa çizim YOK (Ders #4). */
  SAP.action('toc-toggle', function (btn) {
    var id = btn.dataset.t;
    var box = btn.parentElement.querySelector('[data-sum="' + id + '"]');
    if (!box) return;
    var acik = SAP.store.toggleToc(id);
    box.classList.toggle('open', acik);
    btn.setAttribute('aria-expanded', acik ? 'true' : 'false');
  });

  SAP.action('random-topic', function () {
    var hazir = SAP.allTopics().filter(function (t) { return t.status === 'ready'; });
    if (!hazir.length) return;
    SAP.go('#/konu/' + hazir[Math.floor(Math.random() * hazir.length)].id);
  });

  /* Bölüm katlama. Tam sayfa çizim YAPILMAZ (bkz. Ders #4): kaydırma
     konumu korunmalı, yoksa katlanan bölümün başlığı ekrandan kaçar. */
  SAP.action('toggle-section', function (el) {
    var sec = el.closest('.section');
    if (!sec) return;
    SAP.store.toggleSection(el.dataset.t, el.dataset.s);
    var kapali = sec.classList.toggle('closed');
    el.setAttribute('aria-expanded', kapali ? 'false' : 'true');
  });


  /* ================================================= KONU SAYFASI ==== */

  SAP.view('konu', function (route) {
    var t = SAP.topic(route.parts[0]);
    if (!t) return notFound(esc(T('nf.topic')) + esc(route.parts[0] || ''));

    var ids = SAP.sectionIds(t);
    var yuzde = SAP.store.percent(t.id);
    var fav = SAP.store.isFav(t.id);
    var tamam = ids.length && SAP.store.readCount(t.id) >= ids.length;

    /* --- başlık — kutu değil, kural çizgisiyle biten bir künye ---
       Uyarı yalnızca EKSİK olan konularda çıkar: bu konunun TR'de var olan
       her bölümü sections_en'de de varsa (tam çeviri), uyarı gösterilmez.
       Kısmen çevrilmiş bir konuda uyarı kalır — okuyucu bazı bölümlerin
       Türkçe kaldığını bilmeli. */
    var enBolumler = t.sections_en ? Object.keys(t.sections_en) : [];
    var tamCevrili = ids.length > 0 && ids.every(function (id) { return enBolumler.indexOf(id) !== -1; });
    var uyari = tamCevrili ? '' : SAP.i18n.govdeUyarisi();
    var head = '<header class="thead" style="--h:' + SAP.grupHue(t.grup) + '">' +
      '<div class="thead-k">' + esc(SAP.i18n.grup(grup(t.grup))) + '</div>' +
      '<h1>' + esc(bas(t)) + '</h1>' +
      '<p>' + esc(SAP.i18n.ozet(t)) + '</p>' +
      '<div class="thead-m">' +
        '<span>' + esc(SAP.i18n.seviye(t.level)) + '</span>' +
        '<span class="thead-acts">' +
          (ids.length ? '<button class="btn sm' + (tamam ? ' on' : '') + '" type="button" ' +
            'data-action="topic-complete" data-t="' + esc(t.id) + '">' +
            (tamam ? U.icon('check') + esc(T('topic.done')) : esc(T('topic.markAll'))) + '</button>' : '') +
          '<button class="btn sm' + (fav ? ' on' : '') + '" type="button" data-action="toggle-fav" ' +
            'data-t="' + esc(t.id) + '">' + U.icon('bookmark') +
            esc(fav ? T('topic.unfav') : T('topic.fav')) + '</button>' +
          '<button class="btn sm" type="button" data-action="print">' +
            U.icon('printer') + esc(T('topic.print')) + '</button>' +
        '</span>' +
      '</div>' +
      (ids.length ? '<div class="resume-m" style="margin-top:16px">' +
        '<span class="resume-bar" style="max-width:200px"><i style="width:' + yuzde + '%"></i></span>' +
        '<span class="tnum">' + SAP.i18n.yuzde(yuzde) + '</span></div>' : '') +
    '</header>' +
    (uyari ? '<p class="lang-notice">' + esc(uyari) + '</p>' : '');

    /* --- içerik hazır değilse --- */
    if (!ids.length) {
      return '<div class="topic-layout"><div>' + head +
        '<div class="print-head">' + esc(T('app.name')) + ' — ' + esc(bas(t)) + '</div>' +
        U.note('warn', '', T('topic.soon')) +
        (t.tcodes && t.tcodes.length ? U.subH('', T('ref.tcode')) + U.chips(t.tcodes) : '') +
        (t.tables && t.tables.length ? U.subH('', T('ref.table')) + U.chips(t.tables) : '') +
        U.subH('', T('topic.related')) + relatedGrid(t.related) +
      '</div></div>';
    }

    /* --- bölümler --- */
    var govde = SAP.SECTIONS.filter(function (s) { return ids.indexOf(s.id) !== -1; })
      .map(function (s, i) {
        var okundu = SAP.store.isRead(t.id, s.id);
        var icerik;
        try {
          icerik = s.render(SAP.sectionData(t, s.id), t);
        } catch (err) {
          console.error('[SAP] bölüm çizim hatası:', t.id, s.id, err);
          icerik = U.note('err', SAP.i18n.etiket('Bu bölüm çizilemedi'), esc(err && err.message));
        }
        var kapali = SAP.store.isSectionClosed(t.id, s.id);
        /* Başlığın kendisi katlama düğmesidir; "Okundu işaretle" onun
           İÇİNDE ayrı bir buton olarak durur. Olay delegasyonu en içteki
           taşıyıcıyı seçtiği için (bkz. Ders #7) ikisi çakışmaz. */
        return '<section class="section' + (kapali ? ' closed' : '') + '" id="b-' + esc(s.id) + '">' +
          '<div class="section-h" data-action="toggle-section" ' +
               'data-t="' + esc(t.id) + '" data-s="' + esc(s.id) + '" ' +
               'role="button" tabindex="0" aria-expanded="' + (kapali ? 'false' : 'true') + '">' +
            '<span class="num">' + nn(i) + '</span>' +
            '<h2>' + esc(SAP.i18n.bolum(s.id, s.ad)) + '</h2>' +
            '<button class="readbtn' + (okundu ? ' on' : '') + '" type="button" data-action="toggle-read" ' +
              'data-t="' + esc(t.id) + '" data-s="' + esc(s.id) + '">' +
              esc(okundu ? T('topic.read') : T('topic.markRead')) + '</button>' +
            '<span class="chev">' + U.icon('chevron-down') + '</span>' +
          '</div>' +
          '<div class="section-body">' + icerik + '</div>' +
        '</section>';
      }).join('');

    /* --- içindekiler --- */
    var toc = '<aside class="toc"><div class="toc-label">' + esc(T('topic.onPage')) + '</div>' +
      SAP.SECTIONS.filter(function (s) { return ids.indexOf(s.id) !== -1; })
        .map(function (s, i) {
          return '<button class="toc-item' + (SAP.store.isRead(t.id, s.id) ? ' read' : '') + '" type="button" ' +
            'data-action="goto-section" data-s="b-' + esc(s.id) + '">' +
            '<span class="n">' + nn(i) + '</span>' +
            '<span class="tx">' + esc(SAP.i18n.bolum(s.id, s.ad)) + '</span></button>';
        }).join('') +
    '</aside>';

    /* --- alt gezinme --- */
    var sirali = SAP.allTopics();
    var idx = sirali.indexOf(t);
    var onceki = sirali[idx - 1], sonraki = sirali[idx + 1];
    var pager = '<div class="pager">' +
      (onceki ? '<a class="pg" data-go="#/konu/' + esc(onceki.id) + '" href="#/konu/' + esc(onceki.id) + '">' +
        '<span class="lb">' + esc(T('topic.prev')) + '</span>' +
        '<span class="tt">' + esc(bas(onceki)) + '</span></a>' : '<span style="flex:1"></span>') +
      (sonraki ? '<a class="pg next" data-go="#/konu/' + esc(sonraki.id) + '" href="#/konu/' + esc(sonraki.id) + '">' +
        '<span class="lb">' + esc(T('topic.next')) + '</span>' +
        '<span class="tt">' + esc(bas(sonraki)) + '</span></a>' : '<span style="flex:1"></span>') +
    '</div>';

    return '<div class="topic-layout">' +
      '<div>' +
        '<div class="print-head">' + esc(T('app.name')) + ' — ' + esc(bas(t)) + '</div>' +
        head + govde +
        '<section class="section"><div class="section-h plain">' +
          '<span class="num"></span><h2>' + esc(T('topic.related')) + '</h2></div>' +
          relatedGrid(t.related) + '</section>' +
        /* Notlar numaralı bir bölüm DEĞİL: ilerleme yüzdesine girmez,
           içindekilerde görünmez. Sayfanın sonunda duran bir defter
           kenarıdır — okuyucunun kendi yazdığı yer. */
        '<section class="section"><div class="section-h plain">' +
          '<span class="num"></span><h2>' + esc(T('notes.mine')) + '</h2></div>' +
          SAP.learn.notesHTML(t.id) + '</section>' +
        pager +
      '</div>' + toc +
    '</div>';
  });

  SAP.action('goto-section', function (btn) {
    var el = document.getElementById(btn.dataset.s);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ================================================ İŞLEM KODU ==== */

  SAP.view('tcode', function (route) {
    var kod = route.parts[0] || '';
    var x = SAP.tcode(kod);
    if (!x) return notFound(esc(T('nf.tcode')) + esc(kod));

    var konular = backlinks('tcode', x.kod);
    var ayniKonu = [];
    SAP.tcodeMap.forEach(function (v) {
      if (v.konu === x.konu && SAP.upper(v.kod) !== SAP.upper(x.kod)) ayniKonu.push(v.kod);
    });

    return '<div class="wrap">' +
      '<div class="dt-head">' +
        '<div class="dt-badge">' + esc(x.kod) + '</div>' +
        '<div class="bd"><h1>' + esc(A(x, 'ad')) + '</h1>' +
          '<div class="lede">' + mk(A(x, 'aciklama')) + '</div></div>' +
      '</div>' +

      '<div class="chiprow">' +
        '<span class="tag">' + esc(x.modul) + '</span>' +
        '<span class="tag ready">' + esc(SAP.i18n.tur(x.tur)) + '</span>' +
      '</div>' +

      (x.s4 ? U.note('warn', SAP.i18n.etiket('S/4HANA’daki durumu'), A(x, 's4')) : '') +
      (x.fiori ? U.note('info', SAP.i18n.etiket('Fiori karşılığı'), x.fiori) : '') +

      (konular.length
        ? '<div class="panel"><h3>' + esc(T('ref.usedIn')) + '</h3>' + relatedGrid(konular.map(function (t) { return t.id; })) + '</div>'
        : (x.konu && SAP.topic(x.konu)
            ? '<div class="panel"><h3>' + esc(T('ref.usedIn')) + '</h3>' + relatedGrid([x.konu]) + '</div>' : '')) +

      (ayniKonu.length
        ? '<div class="panel"><h3>' + esc(T('ref.siblings')) + '</h3>' + U.chips(ayniKonu.slice(0, 24)) + '</div>'
        : '') +
    '</div>';
  });

  /* ==================================================== TABLO ==== */

  SAP.view('tablo', function (route) {
    var ad = route.parts[0] || '';
    var x = SAP.table(ad);
    if (!x) return notFound(esc(T('nf.table')) + esc(ad));

    var konular = backlinks('table', x.ad);

    return '<div class="wrap">' +
      '<div class="dt-head">' +
        '<div class="dt-badge tbl-b">' + esc(x.ad) + '</div>' +
        '<div class="bd"><h1>' + esc(A(x, 'baslik')) + '</h1>' +
          '<div class="lede">' + mk(A(x, 'aciklama')) + '</div></div>' +
      '</div>' +

      '<div class="chiprow">' +
        '<span class="tag">' + esc(x.modul) + '</span>' +
        '<span class="tag ready">' + esc(SAP.i18n.tur(x.tur)) + '</span>' +
      '</div>' +

      U.kv([
        [SAP.i18n.etiket('Birincil anahtar'), x.anahtar],
        [SAP.i18n.etiket('Nasıl oluşur / kim doldurur'), A(x, 'olusturan')],
      ]) +

      /* Alan açıklamaları da dile duyarlı: EN üst-katmanı `alanlar_en`
         olarak gelir ve aynı SIRADA olduğu varsayılır (aynı tablo, aynı
         alan listesi). Eksikse Türkçesine düşer. */
      (x.alanlar && x.alanlar.length
        ? '<div class="panel"><h3>' + esc(T('ref.keyFields')) + '</h3>' +
          U.tbl([{ ad:SAP.i18n.etiket('Alan'), w:'22%', mono:true },
                 { ad:SAP.i18n.etiket('Ne işe yarar') }],
            x.alanlar.map(function (a, i) {
              var en = SAP.i18n.get() === 'en' && x.alanlar_en && x.alanlar_en[i];
              return [a.ad + (a.tip === 'pk' ? '  · PK' : a.tip === 'fk' ? '  · FK' : ''),
                      (en && en.aciklama) || a.aciklama];
            })) + '</div>'
        : '') +

      (x.s4 ? U.note('warn', SAP.i18n.etiket('S/4HANA’daki yapısı'), A(x, 's4')) : '') +

      (konular.length
        ? '<div class="panel"><h3>' + esc(T('ref.tableInTopics')) + '</h3>' + relatedGrid(konular.map(function (t) { return t.id; })) + '</div>'
        : (x.konu && SAP.topic(x.konu)
            ? '<div class="panel"><h3>' + esc(T('ref.usedIn')) + '</h3>' + relatedGrid([x.konu]) + '</div>' : '')) +
    '</div>';
  });

  /* ==================================================== TERİM ==== */

  SAP.view('terim', function (route) {
    var k = route.parts[0] || '';
    var x = SAP.term(k);
    if (!x) return notFound(esc(T('nf.term')) + esc(k));

    /* Başlık ve alt başlık DİLE GÖRE yer değiştirir: EN modda İngilizce
       ad başa geçer, Türkçesi altta kalır (markup.js'teki terim çipiyle
       aynı kural). Eskiden her iki modda da Türkçe ad başlıktaydı. */
    var enMod = SAP.i18n.get() === 'en' && x.en;
    var ust = enMod ? x.en : x.ad;
    var alt = enMod ? x.ad : x.en;

    /* `ilgili` listesi KARIŞIK: çoğu sözlük anahtarı ama bazıları konu
       id'si ('lsmw', 'data-upload', 'error-handling'). Hepsine `terim:`
       öneki basılınca altı terim sayfasında kırık çip (.ref-miss)
       oluşuyordu — konu denetimi bunu görmüyor çünkü hata sözlük
       verisinde, konu gövdesinde değil. Artık her giriş kendi türüne
       çözülüyor. */
    var iliskili = (x.ilgili || []).map(function (id) {
      return (SAP.term(id) ? 'terim:' : SAP.topic(id) ? 'konu:' : 'terim:') + id;
    });

    return '<div class="wrap">' +
      '<div class="dt-head">' +
        '<div class="dt-badge">' + esc(T('ref.term')) + '</div>' +
        '<div class="bd"><h1>' + esc(ust) + '</h1>' +
          '<div class="lede">' + esc(alt) + '</div></div>' +
      '</div>' +

      '<div class="panel"><h3>' + esc(T('ref.definition')) + '</h3>' +
        '<div class="prose">' + mkp(A(x, 'aciklama')) + '</div>' +
        (x.detay ? '<div class="prose" style="margin-top:12px">' + mkp(A(x, 'detay')) + '</div>' : '') +
      '</div>' +

      (iliskili.length
        ? '<div class="panel"><h3>' + esc(T('ref.related')) + '</h3>' + U.chips(iliskili) + '</div>'
        : '') +

      (x.konu && SAP.topic(x.konu)
        ? '<div class="panel"><h3>' + esc(T('ref.termInTopic')) + '</h3>' + relatedGrid([x.konu]) + '</div>'
        : '') +
    '</div>';
  });

  /* ================================================ FAVORİLER ==== */

  /* ⚠️ Burası bir zamanlar `topicCard` ile kart ızgarası basıyordu. Kart
     ızgarası tasarım yenilemesinde kaldırıldı (§5b) ama bu satır
     güncellenmedi: favori VARKEN sayfa `topicCard is not defined` ile
     çöküyordu. Boş durumda çökmediği için de gözden kaçmıştı — denetim
     setinde favori dolu senaryosu yoktu (bkz. son-kontrol-genel.mjs).
     Artık ilgili konular listesiyle aynı bileşen kullanılıyor. */
  SAP.view('favoriler', function () {
    var list = SAP.store.d.favorites.filter(function (id) { return SAP.topic(id); });
    return '<div class="wrap">' +
      '<header class="toc-head"><h1>' + esc(T('fav.title')) + '</h1></header>' +
      (list.length
        ? relatedGrid(list)
        : '<div class="empty">' + esc(T('fav.empty')) + '</div>') +
    '</div>';
  });

  /* =================================================== NOTLAR ==== */

  SAP.view('notlar', function () {
    var notes = SAP.store.d.notes;
    var ids = Object.keys(notes).filter(function (id) { return SAP.topic(id); });

    return '<div class="wrap">' +
      '<header class="toc-head"><h1>' + esc(T('notes.title')) + '</h1></header>' +
      (ids.length
        ? ids.map(function (id) {
            var t = SAP.topic(id);
            /* Başlık i18n'den gelir (eskiden ham `t.title` idi: İngilizce
               sitede Türkçe başlık görünüyordu) ve `t.icon` BASILMAZ —
               katalogdaki ikonlar emoji, arayüzde emoji yok (theme.css
               ilke 5). Bu sayfa denetlenmediği için ikisi de kaçmıştı. */
            return '<div class="panel" style="--h:' + (t.hue || 274) + '">' +
              '<h3>' + esc(bas(t)) +
                '<a class="btn sm" style="margin-left:auto" data-go="#/konu/' + esc(id) + '" ' +
                'href="#/konu/' + esc(id) + '">' + esc(T('home.start')) + '</a></h3>' +
              '<div class="prose" style="white-space:pre-wrap">' + esc(notes[id]) + '</div>' +
            '</div>';
          }).join('')
        : '<div class="empty">' + esc(T('notes.empty')) + '</div>') +
    '</div>';
  });

  /* ==================================================== ARAMA ==== */

  SAP.view('ara', function (route) {
    var q = route.parts.join('/') || '';
    var res = SAP.search(q, 60);

    return '<div class="wrap">' +
      '<header class="toc-head"><h1>' + esc(T('search.title')) + '</h1>' +
      '<p>“' + esc(q) + '” · <span class="tnum">' + res.length + '</span></p></header>' +
      (res.length
        ? '<div class="panel">' + res.map(function (r) {
            /* `r.ic` KALDIRILDI: search.js böyle bir alan üretmiyor (emoji
               döneminden kalma), esc(undefined) boş span basıyordu. */
            return '<a class="pres" data-go="' + esc(r.href) + '" href="' + esc(r.href) + '">' +
              '<span class="bd"><b>' + esc(r.baslik) + '</b><span>' + esc(r.alt) + '</span></span>' +
              '<span class="kind">' + esc(T('search.kind.' + r.tur)) + '</span></a>';
          }).join('') + '</div>'
        : '<div class="empty">' + esc(T('search.empty')) + '</div>') +
    '</div>';
  });

  /* ================================================ BULUNAMADI ==== */

  function notFound(msg) {
    return '<div class="empty">' + (msg || esc(T('nf.title'))) +
      '<br><button class="btn sm" style="margin-top:12px" data-go="#/">' +
      esc(T('nf.back')) + '</button></div>';
  }
  SAP.view('notfound', function () { return notFound(); });

  /* ================================================ GİRİŞ HAREKETİ ====
     Görünüm alanına giren öğeler ağır bir yukarı-süzülmeyle belirir
     (theme.css .rv). IntersectionObserver — scroll dinleyicisi YOK.
     İlk ekranda zaten görünen öğeler de aynı sahnede, kademeli girer. */
  var REVEAL = '.hero > *, .toc-head, .bento > .part, .thead, .section, ' +
               '.dt-head, .panel, .pager';
  var io = null;
  SAP.onRender(function (route, host) {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    var kume = host.querySelectorAll(REVEAL);
    var ilk = 0;
    kume.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var gorunur = r.top < window.innerHeight;
      /* İlk ekrandakiler 90ms arayla sırayla; aşağıdakiler kendi anında. */
      el.style.setProperty('--rv-d', (gorunur ? Math.min(ilk++, 8) * 90 : 0) + 'ms');
      el.classList.add('rv');
      io.observe(el);
    });
  });

})(window.SAP);
