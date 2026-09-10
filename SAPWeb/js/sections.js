/* ==========================================================================
   sections.js — Konu sayfasındaki 11 bölümün renderer'ları
   --------------------------------------------------------------------------
   Her bölüm bağımsızdır ve verisi yoksa hiç çizilmez. Böylece referans
   nitelikli konular (SAP Tables, Best Practices) muhasebe/senaryo bölümü
   olmadan da düzgün görünür.

   Yeni bölüm eklemek: aşağıdaki SECTIONS dizisine bir nesne eklemek yeterli;
   içindekiler listesi, ilerleme yüzdesi ve yazdırma otomatik uyum sağlar.
   ========================================================================== */

(function (SAP) {
  'use strict';

  var esc = SAP.esc, mk = SAP.mk, mkp = SAP.mkp, mkul = SAP.mkul;

  /* ------------------------------------------------ ortak parçalar --- */

  /* ------------------------------------------------------ İKONLAR ---
     Lucide çizgi ikonları, elle gömülü: 24 birimlik viewBox, 2 birim
     kalınlık, currentColor. Harici paket YOK (Kural #5) ve EMOJİ YOK
     (theme.css ilke 5).

     ⚠️ Liste bilerek kısadır. Yeni ikon eklemeden önceki soru:
     "bu ikon olmasa cümle anlaşılmaz mıydı?" Cevap hayırsa eklenmez. */
  var ICONS = {
    'arrow-right':  '<path d="M5 12h14M12 5l7 7-7 7"/>',
    'arrow-left':   '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'search':       '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'menu':         '<path d="M4 6h16M4 12h16M4 18h16"/>',
    'moon':         '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    'sun':          '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    'book-open':    '<path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    'bookmark':     '<path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    'pencil':       '<path d="M12 20h9"/><path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    'check':        '<path d="M20 6 9 17l-5-5"/>',
    'printer':      '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
    'shuffle':      '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
  };

  /** 16px Lucide ikonu. Bilinmeyen ad boş döner — sayfayı kırmaz. */
  function icon(ad, sinif) {
    var d = ICONS[ad];
    if (!d) return '';
    return '<svg class="ic' + (sinif ? ' ' + sinif : '') + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true" focusable="false">' + d + '</svg>';
  }


  /* Başlık alanları da mk()'dan geçer: yazar başlıkta {{FB50}} yazdığında çipe
     dönmeli, ham metin kalmamalı. mk() zaten içeride escape ettiği için güvenli. */
  /* Alt başlık. `ic` parametresi çağrı yerlerinde duruyor ama ÇİZİLMİYOR
     (tasarım dili ikon yerine tipografik hiyerarşi kullanır). Etiket
     i18n'den geçer: bunlar yazar prozası değil renderer etiketidir. */
  function subH(ic, t) { return '<div class="sub-h">' + mk(SAP.i18n.etiket(t)) + '</div>'; }

  /** Soru-cevap bloğu: küçük soru etiketi + paragraf gövdesi. */
  function qa(q, body) {
    if (!body) return '';
    return '<div class="qa"><div class="qa-q">' + esc(q) + '</div><div class="prose">' + mkp(body) + '</div></div>';
  }

  /* Uyarı kutusu. Türü emoji ile değil, RENKLİ SOL KURAL + seyreltilmiş
     büyük harf etiketiyle belli eder; başlık verilmemişse türün kendi
     adı etiket olur — böylece tür bilgisi yalnızca renge bağlı kalmaz
     (renk körlüğü için de gerekli). */
  var NOTE_KEY = { tip:'note.tip', warn:'note.warn', err:'note.err', info:'note.info' };

  /* Uyarı kutusunda İKON YOK: kutu zaten üç şeyle kendini anlatıyor —
     renk, sol kenar şeridi ve tür etiketi. Etiket i18n'den gelir. */
  function note(kind, title, body) {
    if (!body) return '';
    return '<div class="note ' + kind + '">' +
      '<div class="bd">' +
        '<b class="t">' + (title ? mk(title)
          : esc(SAP.i18n.t(NOTE_KEY[kind] || 'note.info'))) + '</b>' +
        mk(body) +
      '</div></div>';
  }

  function kv(rows) {
    var body = rows.filter(function (r) { return r && r[1]; }).map(function (r) {
      return '<div class="kv-row"><div class="kv-k">' + mk(r[0]) + '</div>' +
             '<div class="kv-v">' + mk(r[1]) + '</div></div>';
    }).join('');
    return body ? '<div class="kv">' + body + '</div>' : '';
  }

  /** cols: [{ad, w, num}] · rows: hücre dizileri (mk uygulanır) */
  function tbl(cols, rows) {
    if (!rows || !rows.length) return '';
    var head = cols.map(function (c) {
      return '<th' + (c.num ? ' class="num"' : '') + (c.w ? ' style="width:' + c.w + '"' : '') +
             '>' + mk(SAP.i18n.etiket(c.ad)) + '</th>';
    }).join('');
    var body = rows.map(function (r) {
      return '<tr>' + r.map(function (cell, i) {
        var c = cols[i] || {};
        /* {html:'…'} biçimindeki hücre hazır HTML'dir (örn. çip listesi);
           düz metin hücreler mk()'dan geçer. */
        var icerik = (cell && typeof cell === 'object' && cell.html !== undefined) ? cell.html : mk(cell);
        return '<td' + (c.num ? ' class="num"' : '') + (c.mono ? ' class="mono"' : '') + '>' + icerik + '</td>';
      }).join('') + '</tr>';
    }).join('');
    return '<div class="tbl-wrap"><table class="tbl"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>';
  }

  function steps(list) {
    if (!list || !list.length) return '';
    return '<div class="steps">' + list.map(function (s) {
      if (typeof s === 'string') return '<div class="step"><div class="step-b">' + mk(s) + '</div></div>';
      return '<div class="step">' +
        (s.baslik ? '<div class="step-t">' + mk(s.baslik) + '</div>' : '') +
        (s.aciklama ? '<div class="step-b">' + mk(s.aciklama) + '</div>' : '') +
        (s.meta && s.meta.length ? '<div class="step-m">' + s.meta.map(function (m) {
          return '<span class="tag">' + mk(m) + '</span>';
        }).join('') + '</div>' : '') +
      '</div>';
    }).join('') + '</div>';
  }

  /** Hata tablosu — birden çok bölümde kullanılır. */
  function errTable(list) {
    if (!list || !list.length) return '';
    return tbl(
      [{ ad:'Hata mesajı', w:'30%' }, { ad:'Sebebi', w:'32%' }, { ad:'Çözümü' }],
      /* ⚠️ Mesaj `'**' + … + '**'` ile SARILMAZ. İçerik yazarı mesajın
         içinde de kalın kullanabiliyor; sarmak `****` üretip biçimi
         bozuyordu (bkz. Ders #28). Vurgu HTML ile veriliyor, işaretle değil. */
      list.map(function (e) {
        return [{ html: '<strong>' + mk(e.mesaj) + '</strong>' }, e.sebep, e.cozum];
      })
    );
  }

  function chips(arr, prefix) {
    if (!arr || !arr.length) return '';
    return '<div class="chiprow">' + arr.map(function (x) {
      return mk('{{' + (prefix ? prefix + ':' : '') + x + '}}');
    }).join('') + '</div>';
  }

  /**
   * Veriden gelen bir tablo/T-code alanını çipe çevirir.
   * İçerik yazarı "BKPF / BSEG" gibi birleşik yazabildiği için ayraçlardan
   * bölünür ve her parça ayrı çip olur. Tek bir işaret üretilseydi
   * "{{BKPF / BSEG}}" çözülemez ve bozuk çip basılırdı.
   */
  function refList(v) {
    if (!v) return '';
    return String(v).split(/\s*[\/,;·]\s*|\s+ve\s+/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean)
      .map(function (s) { return mk('{{' + s + '}}'); })
      .join(' ');
  }

  /* ============================================== 1 — Konunun Tanımı === */

  function renderTanim(d) {
    return '' +
      qa('Bu nedir?', d.nedir) +
      qa('Neden kullanılır?', d.neden) +
      qa('Şirket açısından önemi nedir?', d.sirketOnemi) +
      (d.gercekHayat ? note('info', 'Gerçek hayattan örnek', d.gercekHayat) : '') +
      (d.muhasebeMantigi ? subH('⚖️', 'Muhasebe mantığı') + '<div class="prose">' + mkp(d.muhasebeMantigi) + '</div>' : '') +
      (d.kavramlar && d.kavramlar.length
        ? subH('🔑', 'Bu konuda geçen anahtar kavramlar') + chips(d.kavramlar, 'terim') : '');
  }

  /* =================================================== 2 — İş Süreci === */

  function renderSurec(d) {
    var out = '';
    if (d.anlatim) out += '<div class="prose">' + mkp(d.anlatim) + '</div>';

    if (d.roller && d.roller.length) {
      out += subH('👥', 'Kim ne yapar?');
      out += tbl([{ ad:'Rol', w:'26%' }, { ad:'Sorumluluğu' }],
        d.roller.map(function (r) { return [r.rol, r.gorev]; }));
    }

    if (d.diyagram) out += SAP.diagram.draw(d.diyagram);

    if (d.adimlar && d.adimlar.length) {
      out += subH('📋', 'Süreç adımları');
      out += tbl(
        [{ ad:'#', w:'42px' }, { ad:'Kim', w:'18%' }, { ad:'Ne yapar' }, { ad:'SAP’ta karşılığı', w:'26%' }],
        d.adimlar.map(function (a, i) { return [String(i + 1), a.rol, a.eylem, a.sistem || '—']; })
      );
    }

    if (d.veriAkisi) {
      out += subH('🔀', 'Veri nereden gelir, nereye gider?');
      out += kv([
        ['Girdi (nereden)', d.veriAkisi.nereden],
        ['Çıktı (nereye)', d.veriAkisi.nereye],
        ['Tetikleyen belge', d.veriAkisi.tetikleyen],
        ['Sonraki süreç', d.veriAkisi.sonraki],
      ]);
    }

    if (d.notlar) out += (d.notlar || []).map(function (n) { return note(n.tip || 'tip', n.baslik, n.metin); }).join('');
    return out;
  }

  /* ============================================= 3 — Muhasebe Mantığı === */

  function renderMuhasebe(d) {
    var out = '';
    if (d.anlatim) out += '<div class="prose">' + mkp(d.anlatim) + '</div>';

    if (d.etkilenenHesaplar && d.etkilenenHesaplar.length) {
      out += subH('🧾', 'Hangi hesaplar etkilenir ve neden?');
      out += tbl([{ ad:'Hesap', w:'26%' }, { ad:'Tür', w:'16%' }, { ad:'Neden etkilenir' }],
        d.etkilenenHesaplar.map(function (h) { return [h.hesap, h.tur, h.neden]; }));
    }

    (d.fisler || []).forEach(function (f) { out += SAP.diagram.fis(f); });

    if (d.tHesaplar && d.tHesaplar.length) {
      out += subH('🅃', 'T hesaplarıyla görünümü');
      out += SAP.diagram.tHesaplar(d.tHesaplar);
    }

    if (d.notlar) out += (d.notlar || []).map(function (n) { return note(n.tip || 'tip', n.baslik, n.metin); }).join('');
    return out;
  }

  /* ==================================================== 4 — Çeşitleri === */

  function renderCesitler(d) {
    var list = Array.isArray(d) ? d : (d.liste || []);
    var out = (!Array.isArray(d) && d.anlatim) ? '<div class="prose">' + mkp(d.anlatim) + '</div>' : '';

    out += list.map(function (c) {
      return '<div class="panel">' +
        '<h3>' + mk(c.ad) + (c.en ? ' <span class="tag">' + mk(c.en) + '</span>' : '') + '</h3>' +
        (c.aciklama ? '<div class="prose">' + mkp(c.aciklama) + '</div>' : '') +
        (c.neZaman ? note('tip', 'Ne zaman tercih edilir?', c.neZaman) : '') +
        (c.ornek ? note('info', 'Örnek', c.ornek) : '') +
        (c.tcodes && c.tcodes.length ? chips(c.tcodes) : '') +
      '</div>';
    }).join('');

    if (!Array.isArray(d) && d.karsilastirma && d.karsilastirma.length) {
      out += subH('⚖️', 'Karşılaştırma');
      out += tbl([{ ad:'Kriter', w:'24%' }].concat(d.karsilastirmaBasliklar.map(function (b) { return { ad:b }; })),
        d.karsilastirma);
    }
    return out;
  }

  /* ============================================ 5 — SAP İşlem Kodları === */

  function renderTcodes(d) {
    var list = Array.isArray(d) ? d : (d.liste || []);
    var out = (!Array.isArray(d) && d.anlatim) ? '<div class="prose">' + mkp(d.anlatim) + '</div>' : '';

    out += list.map(function (t) {
      var reg = SAP.tcode(t.kod);
      var b = '';

      if (t.amac) b += qa('Ne işe yarar?', t.amac);
      if (t.neZaman) b += qa('Hangi durumda kullanılır?', t.neZaman);

      if (t.adimlar && t.adimlar.length) {
        b += subH('👣', 'Adım adım kullanım');
        b += steps(t.adimlar);
      }

      if (t.ekranAkisi && t.ekranAkisi.length) {
        b += subH('🖥️', 'Örnek ekran akışı');
        b += tbl([{ ad:'Ekran', w:'28%' }, { ad:'Girilen / yapılan' }],
          t.ekranAkisi.map(function (e) { return [e.ekran, e.islem]; }));
      }

      if (t.alanlar) {
        b += subH('📝', 'Alanlar');
        b += kv([
          ['Zorunlu alanlar', (t.alanlar.zorunlu || []).join(' · ')],
          ['Opsiyonel alanlar', (t.alanlar.opsiyonel || []).join(' · ')],
        ]);
      }

      if (t.hatalar && t.hatalar.length) {
        b += subH('🚨', 'Sık alınan hatalar');
        b += errTable(t.hatalar);
      }

      if (t.ipucu) b += note('tip', 'İpucu', t.ipucu);

      if (t.ilgili && t.ilgili.length) {
        b += subH('🔗', 'İlgili işlem kodları');
        b += chips(t.ilgili);
      }

      return '<div class="tc-card">' +
        '<div class="tc-h">' +
          '<span class="tc-code">' + esc(t.kod) + '</span>' +
          '<span class="nm">' + mk(t.ad || (reg && reg.ad) || '') + '</span>' +
          (reg ? '<a class="go btn sm" data-go="#/tcode/' + encodeURIComponent(SAP.upper(t.kod)) + '" ' +
                 'href="#/tcode/' + encodeURIComponent(SAP.upper(t.kod)) + '">Detay →</a>' : '') +
        '</div>' +
        '<div class="tc-b">' + b + '</div>' +
      '</div>';
    }).join('');

    return out;
  }

  /* =============================================== 6 — SAP Tabloları === */

  function renderTablolar(d) {
    var out = d.anlatim ? '<div class="prose">' + mkp(d.anlatim) + '</div>' : '';

    (d.liste || []).forEach(function (t) {
      out += '<div class="tc-card">' +
        '<div class="tc-h">' +
          '<span class="tc-code" style="background:var(--info);color:var(--text-inv)">' + esc(t.ad) + '</span>' +
          '<span class="nm">' + mk(t.baslik || '') + '</span>' +
          '<a class="go btn sm" data-go="#/tablo/' + encodeURIComponent(SAP.upper(t.ad)) + '" ' +
             'href="#/tablo/' + encodeURIComponent(SAP.upper(t.ad)) + '">Detay →</a>' +
        '</div>' +
        '<div class="tc-b">' +
          kv([
            ['Ne tutar?', t.tutar],
            ['Nasıl oluşur / kim oluşturur?', t.olusturan],
            ['Hangi işlem kodları günceller?', t.guncelleyen],
            ['Birincil anahtar', t.anahtar],
            ['Diğer tablolarla ilişkisi', t.iliskiler],
            ['S/4HANA’daki yapısı', t.s4],
          ]) +
          (t.alanlar && t.alanlar.length
            ? subH('🔑', 'En önemli alanlar') +
              tbl([{ ad:'Alan', w:'20%', mono:true }, { ad:'Ne işe yarar' }],
                  t.alanlar.map(function (a) { return [a.ad, a.aciklama]; }))
            : '') +
        '</div>' +
      '</div>';
    });

    if (d.er) out += SAP.diagram.er(d.er);
    return out;
  }

  /* ================================================= 7 — SAP Süreci === */

  function renderSapSurec(d) {
    var out = d.anlatim ? '<div class="prose">' + mkp(d.anlatim) + '</div>' : '';

    (d.ekranlar || []).forEach(function (e, i) {
      out += '<div class="panel">' +
        '<h3><span class="tag ready">Ekran ' + (i + 1) + '</span> ' + mk(e.ad) + '</h3>' +
        (e.aciklama ? '<div class="prose">' + mkp(e.aciklama) + '</div>' : '') +
        (e.alanlar && e.alanlar.length
          ? tbl([{ ad:'Alan', w:'26%' }, { ad:'Durum', w:'16%' }, { ad:'Açıklama' }],
              e.alanlar.map(function (a) {
                return [a.ad, a.zorunlu ? '**Zorunlu**' : 'Opsiyonel', a.aciklama];
              }))
          : '') +
        (e.ipucu ? note('tip', null, e.ipucu) : '') +
      '</div>';
    });

    if (d.zorunlu || d.opsiyonel) {
      out += subH('📝', 'Alan özeti');
      out += kv([
        ['Zorunlu alanlar', (d.zorunlu || []).join(' · ')],
        ['Opsiyonel alanlar', (d.opsiyonel || []).join(' · ')],
      ]);
    }

    if (d.hatalar && d.hatalar.length) {
      out += subH('🚨', 'Alınabilecek hatalar ve çözümleri');
      out += errTable(d.hatalar);
    }

    if (d.ipuclari && d.ipuclari.length) {
      out += subH('💡', 'İpuçları');
      out += '<div class="prose">' + mkul(d.ipuclari) + '</div>';
    }
    return out;
  }

  /* ============================================= 8 — Teknik Bilgiler === */

  function renderTeknik(d) {
    var out = '';

    if (d.guncellenenTablolar && d.guncellenenTablolar.length) {
      out += subH('🗃️', 'Arka planda hangi tablolar güncellenir?');
      out += tbl([{ ad:'Tablo', w:'22%' }, { ad:'Ne yazılır' }],
        d.guncellenenTablolar.map(function (t) { return [{ html: refList(t.tablo) }, t.ne]; }));
    }

    out += kv([
      ['Commit ne zaman olur?', d.commit],
      ['Belge numarası nasıl oluşur?', d.belgeNo],
      ['Posting Logic (kayıt mantığı)', d.postingLogic],
      ['Belge türünün etkisi', d.belgeTuru],
      ['Number Range nasıl çalışır?', d.numberRange],
      ['Account Determination', d.accountDetermination],
      ['Customizing mi, Master Data mı?', d.tur],
      ['Taşıma isteğine girer mi?', d.transport],
    ]);

    if (d.img && d.img.length) {
      out += subH('🧭', 'SPRO / IMG yolları');
      out += tbl([{ ad:'IMG yolu', w:'55%' }, { ad:'Ne yapılır' }],
        d.img.map(function (i) { return ['`' + i.yol + '`', i.not]; }));
    }

    (d.ekstra || []).forEach(function (x) {
      out += subH(x.ic || '🔩', x.baslik) + '<div class="prose">' + mkp(x.metin) + '</div>';
    });

    if (d.notlar) out += (d.notlar || []).map(function (n) { return note(n.tip || 'warn', n.baslik, n.metin); }).join('');
    return out;
  }

  /* ========================================== 9 — S/4HANA Yenilikleri === */

  function renderS4(d) {
    var out = '';

    if (d.ozet) out += '<div class="prose">' + mkp(d.ozet) + '</div>';

    if (d.eccFarklari && d.eccFarklari.length) {
      out += subH('↔️', 'ECC ile S/4HANA farkları');
      out += tbl([{ ad:'Konu', w:'22%' }, { ad:'ECC (klasik)' }, { ad:'S/4HANA' }],
        d.eccFarklari.map(function (f) { return [f.konu, f.ecc, f.s4]; }));
    }

    if (d.universalJournal) out += note('info', 'Universal Journal (ACDOCA) etkisi', d.universalJournal);

    if (d.kalkanTcodes && d.kalkanTcodes.length) {
      out += subH('🚫', 'Kalkan / değişen işlem kodları');
      out += tbl([{ ad:'Eski', w:'18%' }, { ad:'Yerine', w:'22%' }, { ad:'Not' }],
        d.kalkanTcodes.map(function (t) { return [t.eski, t.yeni, t.not]; }));
    }

    if (d.fiori && d.fiori.length) {
      out += subH('📱', 'Yeni Fiori uygulamaları');
      out += tbl([{ ad:'Uygulama', w:'32%' }, { ad:'Ne yapar' }],
        d.fiori.map(function (f) {
          return [{ html: '<strong>' + mk(f.ad) + '</strong>' }, f.aciklama];
        }));
    }

    if (d.compatibilityViews && d.compatibilityViews.length) {
      out += subH('🪟', 'Uyumluluk view’leri');
      out += '<div class="prose">' + mkul(d.compatibilityViews) + '</div>';
    }

    if (d.performans) out += subH('⚡', 'Performans farkı') + '<div class="prose">' + mkp(d.performans) + '</div>';

    if (d.bestPractices && d.bestPractices.length) {
      out += subH('🏆', 'SAP Best Practices');
      out += '<div class="prose">' + mkul(d.bestPractices) + '</div>';
    }
    return out;
  }

  /* ============================================== 10 — Gerçek Senaryo === */

  function renderSenaryo(d) {
    var out = '';
    if (d.baslik) out += '<div class="sub-h">' + mk(d.baslik) + '</div>';
    if (d.hikaye) out += note('info', 'Senaryo', d.hikaye);
    if (d.veriler && d.veriler.length) {
      out += kv(d.veriler.map(function (v) { return [v.k, v.v]; }));
    }

    (d.adimlar || []).forEach(function (a, i) {
      out += '<div class="panel">' +
        '<h3><span class="tag ready">Adım ' + (i + 1) + '</span> ' + mk(a.baslik) + '</h3>' +
        (a.tcode ? '<div class="chiprow">' + mk('{{' + a.tcode + '}}') + '</div>' : '') +
        (a.aciklama ? '<div class="prose">' + mkp(a.aciklama) + '</div>' : '') +
        (a.girdi && a.girdi.length
          ? subH('⌨️', 'Ekrana girilenler') +
            tbl([{ ad:'Alan', w:'32%' }, { ad:'Değer' }], a.girdi.map(function (g) { return [g.alan, g.deger]; }))
          : '') +
        (a.fis ? SAP.diagram.fis(a.fis) : '') +
        (a.tabloEtkisi && a.tabloEtkisi.length
          ? subH('🗃️', 'Tablolarda ne değişti?') +
            tbl([{ ad:'Tablo', w:'22%' }, { ad:'Değişiklik' }],
                a.tabloEtkisi.map(function (t) { return [{ html: refList(t.tablo) }, t.ne]; }))
          : '') +
        (a.not ? note('tip', null, a.not) : '') +
      '</div>';
    });

    if (d.sonuc) out += subH('✓', 'Sürecin sonunda ne oldu?') + '<div class="prose">' + mkp(d.sonuc) + '</div>';
    return out;
  }

  /* ============================================ 11 — Öğrenme Bölümü === */

  function renderOgrenme(d, topic) {
    var out = '';

    if (d.ozet && d.ozet.length) {
      out += subH('📌', 'Konu özeti');
      out += '<div class="prose">' + mkul(d.ozet) + '</div>';
    }

    if (d.onemliNoktalar && d.onemliNoktalar.length) {
      out += subH('⭐', 'Mülakatta sorulan önemli noktalar');
      out += '<div class="prose">' + mkul(d.onemliNoktalar) + '</div>';
    }

    if (d.sikHatalar && d.sikHatalar.length) {
      out += subH('⚠️', 'Sık yapılan hatalar');
      out += tbl([{ ad:'Yanlış yaklaşım', w:'45%' }, { ad:'Doğrusu' }],
        d.sikHatalar.map(function (h) { return ['✕ ' + h.hata, '✓ ' + h.dogru]; }));
    }

    if (d.ipuclari && d.ipuclari.length) {
      out += subH('💡', 'İpuçları');
      out += '<div class="prose">' + mkul(d.ipuclari) + '</div>';
    }

    if (d.quiz && d.quiz.length) {
      out += subH('🎯', 'Mini quiz');
      out += SAP.learn.quizHTML(topic.id, d.quiz);
    }

    /* `d.flashcards` bilerek ÇİZİLMİYOR — soru kartı bölümü kaldırıldı
       (kullanıcı talebi). Veri duruyor; gerekçe learn.js'te yazılı. */

    out += subH('📝', 'Notlarım');
    out += SAP.learn.notesHTML(topic.id);

    return out;
  }

  /* ==================================================== bölüm listesi === */

  var SECTIONS = [
    { id:'tanim',     ad:'Konunun Tanımı',    ic:'💡', render:renderTanim },
    { id:'surec',     ad:'İş Süreci',         ic:'🔄', render:renderSurec },
    { id:'muhasebe',  ad:'Muhasebe Mantığı',  ic:'⚖️', render:renderMuhasebe },
    { id:'cesitler',  ad:'Çeşitleri',         ic:'🧩', render:renderCesitler },
    { id:'tcodes',    ad:'SAP İşlem Kodları', ic:'⌨️', render:renderTcodes },
    { id:'tablolar',  ad:'SAP Tabloları',     ic:'🗃️', render:renderTablolar },
    { id:'sapSurec',  ad:'SAP Süreci',        ic:'🖥️', render:renderSapSurec },
    { id:'teknik',    ad:'Teknik Bilgiler',   ic:'🔩', render:renderTeknik },
    { id:'s4hana',    ad:'S/4HANA Yenilikleri', ic:'🚀', render:renderS4 },
    { id:'senaryo',   ad:'Gerçek Senaryo',    ic:'🏢', render:renderSenaryo },
    { id:'ogrenme',   ad:'Öğrenme Bölümü',    ic:'🎓', render:renderOgrenme },
  ];

  /** Konunun gerçekten içeriği olan bölümlerinin id listesi. */
  function sectionIds(topic) {
    if (!topic || !topic.sections) return [];
    return SECTIONS.filter(function (s) {
      var v = topic.sections[s.id];
      if (!v) return false;
      if (Array.isArray(v)) return v.length > 0;
      return true;
    }).map(function (s) { return s.id; });
  }

  SAP.SECTIONS = SECTIONS;
  SAP.sectionIds = sectionIds;
  SAP.ui = SAP.ui || {};
  SAP.ui.note = note;
  SAP.ui.kv = kv;
  SAP.ui.tbl = tbl;
  SAP.ui.subH = subH;
  SAP.ui.icon = icon;
  SAP.ui.steps = steps;
  SAP.ui.chips = chips;

})(window.SAP);
