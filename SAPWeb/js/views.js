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
  var U = SAP.ui;

  /* Ana sayfa süzgeç durumu — oturum içi, kalıcı değil. */
  var filtre = { grup: null, favori: false, hazir: false, seviye: null };

  /* ------------------------------------------------------ yardımcı --- */

  function lvClass(l) { return 'lv-' + SAP.slug(l || ''); }

  function grup(id) {
    return SAP.GROUPS.find(function (x) { return x.id === id; }) || {};
  }
  function grupAdi(id) { return grup(id).ad || ''; }

  /** Konunun rengi grubundan gelir — konu başına ayrı ton yoktur. */
  function hue(t) { return SAP.grupHue(t && t.grup); }

  /* Konu kartı. Renk, ikon ve ilerleme halkası birlikte kartı
     "taranabilir" yapar: göz önce renge, sonra ikona, sonra başlığa
     gider. Üçü de aynı gruptan gelir. */
  function topicCard(t) {
    var yuzde = SAP.store.percent(t.id);
    var fav = SAP.store.isFav(t.id);
    var hazir = t.status === 'ready';

    return '<div class="card' + (hazir ? '' : ' soon') + '" style="--h:' + hue(t) + '" ' +
        'data-go="#/konu/' + esc(t.id) + '" role="button" tabindex="0">' +
      '<button class="card-fav' + (fav ? ' on' : '') + '" type="button" data-action="toggle-fav" ' +
        'data-t="' + esc(t.id) + '" aria-label="Favorilere ekle" title="Favorilere ekle">' +
        (fav ? '★' : '☆') + '</button>' +
      '<div class="card-top">' +
        '<span class="card-ic">' + esc(t.icon) + '</span>' +
        '<div class="card-h"><h3>' + esc(t.title) + '</h3>' +
          '<div class="sub">' + esc(t.level) + ' · ' + esc(t.minutes) + ' dk</div></div>' +
      '</div>' +
      '<div class="card-desc">' + esc(t.summary) + '</div>' +
      '<div class="card-foot">' +
        (hazir ? '' : '<span class="tag soon">Yakında</span>') +
        (yuzde
          ? '<span class="card-prog"><span class="ring-mini" style="--p:' + yuzde + '"></span>' +
            '<span>%' + yuzde + '</span></span>'
          : (hazir ? '<span class="card-go">Başla →</span>' : '')) +
      '</div>' +
    '</div>';
  }

  function relatedGrid(ids) {
    var items = (ids || []).map(SAP.topic).filter(Boolean);
    if (!items.length) return '';
    return '<div class="rel-grid">' + items.map(function (t) {
      return '<a class="rel" style="--h:' + hue(t) + '" data-go="#/konu/' + esc(t.id) + '" ' +
        'href="#/konu/' + esc(t.id) + '">' +
        '<span class="ic">' + esc(t.icon) + '</span>' +
        '<span class="tx"><b>' + esc(t.title) + '</b>' +
          '<span>' + esc(t.level) + ' · ' + esc(t.minutes) + ' dk</span></span>' +
      '</a>';
    }).join('') + '</div>';
  }

  /* Açılıştaki tek eylem çağrısı. "Nereden devam edeyim?" sorusunu
     kullanıcı yerine sistem cevaplar: yarım kalan konu varsa oraya,
     yoksa ilk konuya. Boş bir kahraman alanını doldurmak için değil —
     öğrenmeye dönmenin önündeki tek adımı kaldırmak için var. */
  function heroCta(hazir) {
    if (!hazir.length) return '';

    var yarim = null, enYuksek = 0;
    hazir.forEach(function (t) {
      var p = SAP.store.percent(t.id);
      if (p > 0 && p < 100 && p >= enYuksek) { enYuksek = p; yarim = t; }
    });

    var hedef = yarim || hazir.filter(function (t) { return SAP.store.percent(t.id) < 100; })[0] || hazir[0];
    var etiket = yarim ? 'Kaldığın yerden devam et' : 'Öğrenmeye başla';

    return '<div class="hero-cta">' +
      '<a class="btn pri" data-go="#/konu/' + esc(hedef.id) + '" href="#/konu/' + esc(hedef.id) + '">' +
        esc(etiket) + ' <b>' + esc(hedef.title) + '</b></a>' +
      '<button class="btn" type="button" data-action="random-topic">🎲 Rastgele konu</button>' +
    '</div>';
  }

  /** Bir T-code veya tablonun geçtiği konuları bulur (geri bağlantı). */
  function backlinks(kind, key) {
    var K = SAP.upper(key);
    return SAP.allTopics().filter(function (t) {
      var arr = kind === 'tcode' ? t.tcodes : t.tables;
      return (arr || []).some(function (x) { return SAP.upper(x) === K; });
    });
  }

  /* ==================================================== ANA SAYFA ==== */

  SAP.view('home', function () {
    var all = SAP.allTopics();
    var hazir = all.filter(function (t) { return t.status === 'ready'; });

    /* Genel ilerleme: yalnızca içeriği hazır konular üzerinden hesaplanır. */
    var toplamBolum = 0, okunanBolum = 0;
    hazir.forEach(function (t) {
      toplamBolum += SAP.sectionIds(t).length;
      okunanBolum += SAP.store.readCount(t.id);
    });
    var genel = toplamBolum ? Math.round((okunanBolum / toplamBolum) * 100) : 0;

    var liste = all.filter(function (t) {
      if (filtre.grup && t.grup !== filtre.grup) return false;
      if (filtre.favori && !SAP.store.isFav(t.id)) return false;
      if (filtre.hazir && t.status !== 'ready') return false;
      if (filtre.seviye && t.level !== filtre.seviye) return false;
      return true;
    });

    var grupChips = SAP.GROUPS.map(function (g) {
      var n = all.filter(function (t) { return t.grup === g.id; }).length;
      return '<button class="fchip" type="button" style="--h:' + g.hue + '" ' +
        'data-action="filter-grup" data-v="' + esc(g.id) + '" ' +
        'aria-pressed="' + (filtre.grup === g.id) + '">' +
        '<span class="ic">' + g.ic + '</span>' + esc(g.ad) +
        '<span class="n">' + n + '</span></button>';
    }).join('');

    /* Katalog GRUPLARA BÖLÜNMÜŞ olarak çizilir. 36 kartlık tek bir duvar
       hem dağınık görünüyor hem de nereye bakacağını söylemiyordu;
       renkli grup başlıkları sayfaya hem ritim hem yön veriyor. */
    var kartlar = liste.length
      ? SAP.GROUPS.map(function (g) {
          var list = liste.filter(function (t) { return t.grup === g.id; });
          if (!list.length) return '';
          var okunmus = list.filter(function (t) { return SAP.store.percent(t.id) >= 100; }).length;
          return '<section class="grp" style="--h:' + g.hue + '">' +
            '<div class="grp-h">' +
              '<span class="grp-ic">' + g.ic + '</span>' +
              '<h2>' + esc(g.ad) + '</h2>' +
              '<span class="grp-n">' +
                (okunmus ? okunmus + ' / ' + list.length + ' tamamlandı' : list.length + ' konu') +
              '</span>' +
            '</div>' +
            '<div class="cards">' + list.map(topicCard).join('') + '</div>' +
          '</section>';
        }).join('')
      : '<div class="empty"><span class="ic">🔍</span>' +
        '<b>Bu süzgeçlere uyan konu yok</b>' +
        '<button class="btn pri" style="margin-top:14px" type="button" data-action="filter-clear">Süzgeçleri temizle</button></div>';

    /* Masthead ASİMETRİKTİR: solda mesaj, sağda künye. Altı eşit kutuluk
       bir "istatistik şeridi" yerine, sağ sütunda çizgiyle bölünmüş bir
       künye listesi duruyor — editoryal bir açılış, şablon değil. */
    return '<div class="wrap-full">' +
      '<div class="masthead">' +
        '<div class="hero">' +
          '<div class="kicker">Finansal Muhasebe · Danışman seviyesi</div>' +
          '<h1>SAP S/4HANA<br>Financial Accounting</h1>' +
          '<p>İşlem kodu ezberlemeden öte: her sürecin iş mantığını, muhasebe etkisini, ' +
          'SAP ekranlarını, tablolarını ve S/4HANA’daki çalışma şeklini birlikte öğreten ' +
          'interaktif eğitim platformu.</p>' +
          heroCta(hazir) +
        '</div>' +

        '<dl class="ledger">' +
          '<div><dt>Konu</dt><dd>' + all.length + '</dd></div>' +
          '<div><dt>İçeriği hazır</dt><dd>' + hazir.length + '</dd></div>' +
          '<div><dt>İşlem kodu</dt><dd>' + SAP.tcodeMap.size + '</dd></div>' +
          '<div><dt>Tablo</dt><dd>' + SAP.tableMap.size + '</dd></div>' +
          '<div><dt>Sözlük terimi</dt><dd>' + SAP.termMap.size + '</dd></div>' +
          '<div class="prog"><dt>Genel ilerleme</dt><dd>%' + genel + '</dd>' +
            '<div class="bar"><i style="width:' + genel + '%"></i></div></div>' +
        '</dl>' +
      '</div>' +

      '<div class="cat-head">' +
        '<h2>Konular</h2>' +
        '<span class="cat-count">' + liste.length + ' / ' + all.length + '</span>' +
      '</div>' +

      '<div class="filters">' +
        '<button class="fchip" type="button" data-action="filter-clear" aria-pressed="' +
          (!filtre.grup && !filtre.favori && !filtre.hazir && !filtre.seviye) + '">Tümü</button>' +
        grupChips +
        '<span class="grow"></span>' +
        '<button class="fchip" type="button" data-action="filter-hazir" aria-pressed="' + filtre.hazir + '">' +
          '<span class="ic">✅</span>Hazır</button>' +
        '<button class="fchip" type="button" data-action="filter-favori" aria-pressed="' + filtre.favori + '">' +
          '<span class="ic">⭐</span>Favoriler</button>' +
      '</div>' +

      kartlar +
    '</div>';
  });

  SAP.action('filter-grup', function (el) {
    filtre.grup = (filtre.grup === el.dataset.v) ? null : el.dataset.v;
    SAP.render({ keepScroll: true });
  });
  SAP.action('random-topic', function () {
    var hazir = SAP.allTopics().filter(function (t) { return t.status === 'ready'; });
    if (!hazir.length) return;
    SAP.go('#/konu/' + hazir[Math.floor(Math.random() * hazir.length)].id);
  });
  SAP.action('filter-favori', function () { filtre.favori = !filtre.favori; SAP.render({ keepScroll: true }); });
  SAP.action('filter-hazir', function () { filtre.hazir = !filtre.hazir; SAP.render({ keepScroll: true }); });
  SAP.action('filter-clear', function () {
    filtre = { grup: null, favori: false, hazir: false, seviye: null };
    SAP.render({ keepScroll: true });
  });

  /* ================================================= KONU SAYFASI ==== */

  SAP.view('konu', function (route) {
    var t = SAP.topic(route.parts[0]);
    if (!t) return notFound('Konu bulunamadı: ' + esc(route.parts[0] || ''));

    var ids = SAP.sectionIds(t);
    var yuzde = SAP.store.percent(t.id);
    var fav = SAP.store.isFav(t.id);
    var tamam = ids.length && SAP.store.readCount(t.id) >= ids.length;

    /* --- başlık --- */
    var head = '<div class="thead">' +
      '<div class="thead-top">' +
        '<span class="thead-ic">' + esc(t.icon) + '</span>' +
        '<div style="flex:1;min-width:0">' +
          '<div class="kicker">' + esc(grup(t.grup).ic || '') + ' ' + esc(grupAdi(t.grup)) + '</div>' +
          '<h1>' + esc(t.title) + '</h1>' +
          '<div class="lede">' + esc(t.summary) + '</div>' +
        '</div>' +
        '<div class="thead-acts">' +
          '<button class="iconbtn' + (fav ? ' on' : '') + '" type="button" data-action="toggle-fav" ' +
            'data-t="' + esc(t.id) + '" title="Favorilere ekle">' + (fav ? '★' : '☆') + '</button>' +
          '<button class="btn sm" type="button" data-action="print" title="PDF olarak dışa aktar">PDF</button>' +
        '</div>' +
      '</div>' +
      '<div class="thead-meta">' +
        '<span class="tag ' + lvClass(t.level) + '">' + esc(t.level) + '</span>' +
        '<span class="tag">' + esc(t.minutes) + ' dk</span>' +
        (ids.length ? '<span class="tag">' + SAP.store.readCount(t.id) + ' / ' + ids.length + ' bölüm</span>' : '') +
        (ids.length ? '<button class="readbtn' + (tamam ? ' on' : '') + '" type="button" ' +
          'data-action="topic-complete" data-t="' + esc(t.id) + '">' +
          (tamam ? '✓ Konu tamamlandı' : 'Tümünü okundu işaretle') + '</button>' : '') +
      '</div>' +
      (ids.length ? '<div class="bar" style="margin-top:14px"><i style="width:' + yuzde + '%"></i></div>' : '') +
    '</div>';

    /* --- içerik hazır değilse --- */
    if (!ids.length) {
      return '<div class="topic-layout" style="--h:' + hue(t) + '"><div>' + head +
        '<div class="print-head">SAP S/4HANA FI Eğitim Platformu — ' + esc(t.title) + '</div>' +
        U.note('warn', 'Bu konunun derin içeriği henüz yazılmadı',
          'Platform motoru hazır; bu konu sıradaki içerik partisinde 11 bölümün tamamıyla doldurulacak. ' +
          'Aşağıdaki işlem kodu ve tablo bağlantıları şimdiden kullanılabilir.') +
        (t.tcodes && t.tcodes.length ? U.subH('⌨️', 'Bu konuda geçecek işlem kodları') + U.chips(t.tcodes) : '') +
        (t.tables && t.tables.length ? U.subH('🗃️', 'Bu konuda geçecek tablolar') + U.chips(t.tables) : '') +
        U.subH('🔗', 'İlgili konular') + relatedGrid(t.related) +
      '</div></div>';
    }

    /* --- bölümler --- */
    var govde = SAP.SECTIONS.filter(function (s) { return ids.indexOf(s.id) !== -1; })
      .map(function (s, i) {
        var okundu = SAP.store.isRead(t.id, s.id);
        var icerik;
        try {
          icerik = s.render(t.sections[s.id], t);
        } catch (err) {
          console.error('[SAP] bölüm çizim hatası:', t.id, s.id, err);
          icerik = U.note('err', 'Bu bölüm çizilemedi', esc(err && err.message));
        }
        return '<section class="section" id="b-' + esc(s.id) + '">' +
          '<div class="section-h">' +
            '<span class="num">' + (i + 1) + '</span>' +
            '<h2>' + esc(s.ad) + '</h2>' +
            '<button class="readbtn' + (okundu ? ' on' : '') + '" type="button" data-action="toggle-read" ' +
              'data-t="' + esc(t.id) + '" data-s="' + esc(s.id) + '">' +
              (okundu ? '✓ Okundu' : 'Okundu işaretle') + '</button>' +
          '</div>' + icerik +
        '</section>';
      }).join('');

    /* --- içindekiler --- */
    var toc = '<aside class="toc"><div class="toc-label">Bu sayfada</div>' +
      SAP.SECTIONS.filter(function (s) { return ids.indexOf(s.id) !== -1; })
        .map(function (s, i) {
          return '<button class="toc-item' + (SAP.store.isRead(t.id, s.id) ? ' read' : '') + '" type="button" ' +
            'data-action="goto-section" data-s="b-' + esc(s.id) + '">' +
            '<span class="n">' + (SAP.store.isRead(t.id, s.id) ? '✓' : (i + 1)) + '</span>' +
            '<span class="tx">' + esc(s.ad) + '</span></button>';
        }).join('') +
    '</aside>';

    /* --- alt gezinme --- */
    var sirali = SAP.allTopics();
    var idx = sirali.indexOf(t);
    var onceki = sirali[idx - 1], sonraki = sirali[idx + 1];
    var pager = '<div class="pager">' +
      (onceki ? '<a class="pg" data-go="#/konu/' + esc(onceki.id) + '" href="#/konu/' + esc(onceki.id) + '">' +
        '<span>← Önceki konu</span><b>' + esc(onceki.title) + '</b></a>' : '<span style="flex:1"></span>') +
      (sonraki ? '<a class="pg next" data-go="#/konu/' + esc(sonraki.id) + '" href="#/konu/' + esc(sonraki.id) + '">' +
        '<span>Sonraki konu →</span><b>' + esc(sonraki.title) + '</b></a>' : '<span style="flex:1"></span>') +
    '</div>';

    return '<div class="topic-layout" style="--h:' + hue(t) + '">' +
      '<div>' +
        '<div class="print-head">SAP S/4HANA FI Eğitim Platformu — ' + esc(t.title) + '</div>' +
        head + govde +
        '<section class="section"><div class="section-h plain"><h2>İlgili Konular</h2></div>' +
          relatedGrid(t.related) + '</section>' +
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
    if (!x) return notFound('İşlem kodu sözlükte yok: ' + esc(kod));

    var konular = backlinks('tcode', x.kod);
    var ayniKonu = [];
    SAP.tcodeMap.forEach(function (v) {
      if (v.konu === x.konu && SAP.upper(v.kod) !== SAP.upper(x.kod)) ayniKonu.push(v.kod);
    });

    return '<div class="wrap">' +
      '<div class="dt-head">' +
        '<div class="dt-badge">' + esc(x.kod) + '</div>' +
        '<div class="bd"><h1>' + esc(x.ad) + '</h1>' +
          '<div class="lede">' + mk(x.aciklama) + '</div></div>' +
      '</div>' +

      '<div class="chiprow">' +
        '<span class="tag">' + esc(x.modul) + '</span>' +
        '<span class="tag ready">' + esc(x.tur) + '</span>' +
      '</div>' +

      (x.s4 ? U.note('warn', 'S/4HANA’daki durumu', x.s4) : '') +
      (x.fiori ? U.note('info', 'Fiori karşılığı', '**' + x.fiori + '**') : '') +

      (konular.length
        ? '<div class="panel"><h3>📚 Bu işlem kodu şu konularda anlatılıyor</h3>' + relatedGrid(konular.map(function (t) { return t.id; })) + '</div>'
        : (x.konu && SAP.topic(x.konu)
            ? '<div class="panel"><h3>📚 İlgili konu</h3>' + relatedGrid([x.konu]) + '</div>' : '')) +

      (ayniKonu.length
        ? '<div class="panel"><h3>⌨️ Aynı alandaki diğer işlem kodları</h3>' + U.chips(ayniKonu.slice(0, 24)) + '</div>'
        : '') +
    '</div>';
  });

  /* ==================================================== TABLO ==== */

  SAP.view('tablo', function (route) {
    var ad = route.parts[0] || '';
    var x = SAP.table(ad);
    if (!x) return notFound('Tablo sözlükte yok: ' + esc(ad));

    var konular = backlinks('table', x.ad);

    return '<div class="wrap">' +
      '<div class="dt-head">' +
        '<div class="dt-badge tbl-b">' + esc(x.ad) + '</div>' +
        '<div class="bd"><h1>' + esc(x.baslik) + '</h1>' +
          '<div class="lede">' + mk(x.aciklama) + '</div></div>' +
      '</div>' +

      '<div class="chiprow">' +
        '<span class="tag">' + esc(x.modul) + '</span>' +
        '<span class="tag ready">' + esc(x.tur) + '</span>' +
      '</div>' +

      U.kv([
        ['Birincil anahtar', x.anahtar],
        ['Nasıl oluşur / kim doldurur', x.olusturan],
      ]) +

      (x.alanlar && x.alanlar.length
        ? '<div class="panel"><h3>🔑 En önemli alanlar</h3>' +
          U.tbl([{ ad:'Alan', w:'22%', mono:true }, { ad:'Ne işe yarar' }],
            x.alanlar.map(function (a) {
              return [a.ad + (a.tip === 'pk' ? '  🔑' : a.tip === 'fk' ? '  🔗' : ''), a.aciklama];
            })) + '</div>'
        : '') +

      (x.s4 ? U.note('warn', 'S/4HANA’daki yapısı', x.s4) : '') +

      (konular.length
        ? '<div class="panel"><h3>📚 Bu tablo şu konularda anlatılıyor</h3>' + relatedGrid(konular.map(function (t) { return t.id; })) + '</div>'
        : (x.konu && SAP.topic(x.konu)
            ? '<div class="panel"><h3>📚 İlgili konu</h3>' + relatedGrid([x.konu]) + '</div>' : '')) +
    '</div>';
  });

  /* ==================================================== TERİM ==== */

  SAP.view('terim', function (route) {
    var k = route.parts[0] || '';
    var x = SAP.term(k);
    if (!x) return notFound('Terim sözlükte yok: ' + esc(k));

    return '<div class="wrap">' +
      '<div class="dt-head">' +
        '<div class="dt-badge" style="font-family:var(--font);font-size:17px">📖</div>' +
        '<div class="bd"><h1>' + esc(x.ad) + '</h1>' +
          '<div class="lede">' + esc(x.en) + '</div></div>' +
      '</div>' +

      '<div class="panel"><h3>Tanım</h3><div class="prose">' + mkp(x.aciklama) + '</div>' +
        (x.detay ? '<div class="prose" style="margin-top:12px">' + mkp(x.detay) + '</div>' : '') +
      '</div>' +

      (x.ilgili && x.ilgili.length
        ? '<div class="panel"><h3>🔗 İlişkili terimler</h3>' + U.chips(x.ilgili, 'terim') + '</div>'
        : '') +

      (x.konu && SAP.topic(x.konu)
        ? '<div class="panel"><h3>📚 Bu terimin anlatıldığı konu</h3>' + relatedGrid([x.konu]) + '</div>'
        : '') +
    '</div>';
  });

  /* ================================================ FAVORİLER ==== */

  SAP.view('favoriler', function () {
    var list = SAP.store.d.favorites.map(SAP.topic).filter(Boolean);
    return '<div class="wrap-full">' +
      '<div class="hero"><h1>⭐ Favorilerim</h1><p>Yıldızladığın konular burada toplanır.</p></div>' +
      (list.length
        ? '<div class="cards">' + list.map(topicCard).join('') + '</div>'
        : '<div class="empty">Henüz favori konu yok.<br>' +
          'Bir konu kartındaki yıldıza tıklayarak ekleyebilirsin.</div>') +
    '</div>';
  });

  /* =================================================== NOTLAR ==== */

  SAP.view('notlar', function () {
    var notes = SAP.store.d.notes;
    var ids = Object.keys(notes).filter(function (id) { return SAP.topic(id); });

    return '<div class="wrap">' +
      '<div class="hero"><h1>📝 Notlarım</h1><p>Konu sayfalarında yazdığın notların tamamı.</p></div>' +
      (ids.length
        ? ids.map(function (id) {
            var t = SAP.topic(id);
            return '<div class="panel" style="--h:' + (t.hue || 274) + '">' +
              '<h3>' + esc(t.icon) + ' ' + esc(t.title) +
                '<a class="btn sm" style="margin-left:auto" data-go="#/konu/' + esc(id) + '" ' +
                'href="#/konu/' + esc(id) + '">Konuya git →</a></h3>' +
              '<div class="prose" style="white-space:pre-wrap">' + esc(notes[id]) + '</div>' +
            '</div>';
          }).join('')
        : '<div class="empty">Henüz not yok.<br>' +
          'Bir konunun "Öğrenme Bölümü" kısmındaki not alanını kullanabilirsin.</div>') +
    '</div>';
  });

  /* ==================================================== ARAMA ==== */

  SAP.view('ara', function (route) {
    var q = route.parts.join('/') || '';
    var res = SAP.search(q, 60);

    return '<div class="wrap">' +
      '<div class="hero"><h1>🔍 “' + esc(q) + '”</h1><p>' + res.length + ' sonuç bulundu.</p></div>' +
      (res.length
        ? '<div class="panel">' + res.map(function (r) {
            return '<a class="pres" data-go="' + esc(r.href) + '" href="' + esc(r.href) + '">' +
              '<span class="ic">' + esc(r.ic) + '</span>' +
              '<span class="bd"><b>' + esc(r.baslik) + '</b><span>' + esc(r.alt) + '</span></span>' +
              '<span class="kind">' + esc(r.tur) + '</span></a>';
          }).join('') + '</div>'
        : '<div class="empty">Sonuç yok. Farklı bir terim dene.</div>') +
    '</div>';
  });

  /* ================================================ BULUNAMADI ==== */

  function notFound(msg) {
    return '<div class="empty">' + (msg || 'Sayfa bulunamadı.') +
      '<br><button class="btn sm" style="margin-top:12px" data-go="#/">Ana sayfaya dön</button></div>';
  }
  SAP.view('notfound', function () { return notFound(); });

})(window.SAP);
