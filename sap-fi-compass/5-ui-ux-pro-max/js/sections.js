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
     Phosphor Icons (Light ağırlığı, MIT) — @phosphor-icons/core
     paketinden KOPYALANMIŞ yollar; elle çizilmedi. 256 birimlik viewBox,
     dolgu currentColor. Çevrimdışı kuralı yüzünden paket değil yol
     gömülür (Kural #5). EMOJİ YOK.

     ⚠️ Liste bilerek kısadır. Yeni ikon eklemeden önceki soru:
     "bu ikon olmasa cümle anlaşılmaz mıydı?" Cevap hayırsa eklenmez. */
  var ICONS = {
    'arrow-right':    '<path d="M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z"/>',
    'arrow-up-right':  '<path d="M198,64V168a6,6,0,0,1-12,0V78.48L68.24,196.24a6,6,0,0,1-8.48-8.48L177.52,70H88a6,6,0,0,1,0-12H192A6,6,0,0,1,198,64Z"/>',
    'arrow-left':     '<path d="M222,128a6,6,0,0,1-6,6H54.49l61.75,61.76a6,6,0,1,1-8.48,8.48l-72-72a6,6,0,0,1,0-8.48l72-72a6,6,0,0,1,8.48,8.48L54.49,122H216A6,6,0,0,1,222,128Z"/>',
    'chevron-down':   '<path d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"/>',
    'search':         '<path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z"/>',
    'menu':           '<path d="M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128ZM40,70H216a6,6,0,0,0,0-12H40a6,6,0,0,0,0,12ZM216,186H40a6,6,0,0,0,0,12H216a6,6,0,0,0,0-12Z"/>',
    'book-open':      '<path d="M232,50H160a38,38,0,0,0-32,17.55A38,38,0,0,0,96,50H24a6,6,0,0,0-6,6V200a6,6,0,0,0,6,6H96a26,26,0,0,1,26,26,6,6,0,0,0,12,0,26,26,0,0,1,26-26h72a6,6,0,0,0,6-6V56A6,6,0,0,0,232,50ZM96,194H30V62H96a26,26,0,0,1,26,26V204.31A37.86,37.86,0,0,0,96,194Zm130,0H160a37.87,37.87,0,0,0-26,10.32V88a26,26,0,0,1,26-26h66Z"/>',
    'bookmark':       '<path d="M184,34H72A14,14,0,0,0,58,48V224a6,6,0,0,0,9.18,5.09l60.81-38,60.83,38A6,6,0,0,0,198,224V48A14,14,0,0,0,184,34Zm2,179.17-54.83-34.26a6,6,0,0,0-6.36,0L70,213.17V48a2,2,0,0,1,2-2H184a2,2,0,0,1,2,2Z"/>',
    'pencil':         '<path d="M225.9,74.78,181.21,30.09a14,14,0,0,0-19.8,0L38.1,153.41a13.94,13.94,0,0,0-4.1,9.9V208a14,14,0,0,0,14,14H92.69a13.94,13.94,0,0,0,9.9-4.1L225.9,94.58a14,14,0,0,0,0-19.8ZM94.1,209.41a2,2,0,0,1-1.41.59H48a2,2,0,0,1-2-2V163.31a2,2,0,0,1,.59-1.41L136,72.48,183.51,120ZM217.41,86.1,192,111.51,144.49,64,169.9,38.58a2,2,0,0,1,2.83,0l44.68,44.69a2,2,0,0,1,0,2.83Z"/>',
    'check':          '<path d="M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"/>',
    'printer':        '<path d="M214.67,74H198V40a6,6,0,0,0-6-6H64a6,6,0,0,0-6,6V74H41.33C28.47,74,18,83.87,18,96v80a6,6,0,0,0,6,6H58v34a6,6,0,0,0,6,6H192a6,6,0,0,0,6-6V182h34a6,6,0,0,0,6-6V96C238,83.87,227.53,74,214.67,74ZM70,46H186V74H70ZM186,210H70V158H186Zm40-40H198V152a6,6,0,0,0-6-6H64a6,6,0,0,0-6,6v18H30V96c0-5.51,5.08-10,11.33-10H214.67C220.92,86,226,90.49,226,96Zm-28-54a10,10,0,1,1-10-10A10,10,0,0,1,198,116Z"/>',
    'shuffle':        '<path d="M236.24,179.76a6,6,0,0,1,0,8.48l-24,24a6,6,0,0,1-8.48-8.48L217.52,190H200.94a70.16,70.16,0,0,1-57-29.31l-41.71-58.4A58.11,58.11,0,0,0,55.06,78H32a6,6,0,0,1,0-12H55.06a70.16,70.16,0,0,1,57,29.31l41.71,58.4A58.11,58.11,0,0,0,200.94,178h16.58l-13.76-13.76a6,6,0,0,1,8.48-8.48Zm-92.06-74.41a5.91,5.91,0,0,0,3.48,1.12,6,6,0,0,0,4.89-2.51l1.19-1.67A58.11,58.11,0,0,1,200.94,78h16.58L203.76,91.76a6,6,0,1,0,8.48,8.48l24-24a6,6,0,0,0,0-8.48l-24-24a6,6,0,0,0-8.48,8.48L217.52,66H200.94a70.16,70.16,0,0,0-57,29.31L142.78,97A6,6,0,0,0,144.18,105.35Zm-32.36,45.3a6,6,0,0,0-8.37,1.39l-1.19,1.67A58.11,58.11,0,0,1,55.06,178H32a6,6,0,0,0,0,12H55.06a70.16,70.16,0,0,0,57-29.31l1.19-1.67A6,6,0,0,0,111.82,150.65Z"/>',
  };

  /** 16px Phosphor Light ikonu. Bilinmeyen ad boş döner — sayfayı kırmaz. */
  function icon(ad, sinif) {
    var d = ICONS[ad];
    if (!d) return '';
    return '<svg class="ic' + (sinif ? ' ' + sinif : '') + '" viewBox="0 0 256 256" ' +
      'fill="currentColor" aria-hidden="true" focusable="false">' + d + '</svg>';
  }


  /* Başlık alanları da mk()'dan geçer: yazar başlıkta {{FB50}} yazdığında çipe
     dönmeli, ham metin kalmamalı. mk() zaten içeride escape ettiği için güvenli. */
  /* Alt başlık. `ic` parametresi çağrı yerlerinde duruyor ama ÇİZİLMİYOR
     (tasarım dili ikon yerine tipografik hiyerarşi kullanır). Etiket
     i18n'den geçer: bunlar yazar prozası değil renderer etiketidir. */
  function subH(ic, t) { return '<div class="sub-h">' + mk(SAP.i18n.etiket(t)) + '</div>'; }

  /** Soru-cevap bloğu: küçük soru etiketi + paragraf gövdesi. */
  /* ⚠️ `q` renderer'ın KENDİ etiketidir (yazar prozası değil) — subH()
     gibi SAP.i18n.etiket() üzerinden geçer. Bu satır eklenene kadar EN
     gövde içinde "Bu nedir?" gibi sorular Türkçe kalıyordu; gövde hiç
     çevrilmediği için fark edilmemişti (bkz. Ders #33). */
  function qa(q, body) {
    if (!body) return '';
    return '<div class="qa"><div class="qa-q">' + esc(SAP.i18n.etiket(q)) + '</div><div class="prose">' + mkp(body) + '</div></div>';
  }

  /* Uyarı kutusu. Türü emoji ile değil, RENKLİ SOL KURAL + seyreltilmiş
     büyük harf etiketiyle belli eder; başlık verilmemişse türün kendi
     adı etiket olur — böylece tür bilgisi yalnızca renge bağlı kalmaz
     (renk körlüğü için de gerekli). */
  var NOTE_KEY = { tip:'note.tip', warn:'note.warn', err:'note.err', info:'note.info' };

  /* Uyarı kutusunda İKON YOK: kutu zaten üç şeyle kendini anlatıyor —
     renk, sol kenar şeridi ve tür etiketi. Etiket i18n'den gelir. */
  /* ⚠️ `title` İKİ YERDEN gelir ve DAVRANIŞLARI FARKLIDIR:
       ① renderer'ın kendi sabit etiketi (örn. 'Senaryo') — bunlar
         çağrı yerinde SAP.i18n.etiket() ile ÖNCEDEN çevrilip buraya
         hazır gelir (bkz. altta not('info', SAP.i18n.etiket('Senaryo'), …)).
       ② yazar içeriği (`notlar[].baslik`) — düz metin DEĞİLDİR, içinde
         {{FB08}} gibi çapraz link ve **kalın** biçim geçebilir; bu yüzden
         mk() ile çözülmesi ZORUNLUDUR.
     `title` burada etiket() ÇAĞIRMAZ: ② durumunda içerik metnini
     LABELS_EN sözlüğünde aramak (zararsız da olsa) anlamsızdır ve
     eskiden mk() ile çözülen {{...}} işaretlerini kaçırırdı — tam
     olarak bu satır yüzünden 3 konuda ham `{{` belirdi (bkz. Ders #33). */
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
      (d.gercekHayat ? note('info', SAP.i18n.etiket('Gerçek hayattan örnek'), d.gercekHayat) : '') +
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
        d.adimlar.map(function (a, i) { return [String(i + 1), a.rol, a.eylem, a.sistem || '-']; })
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
        (c.neZaman ? note('tip', SAP.i18n.etiket('Ne zaman tercih edilir?'), c.neZaman) : '') +
        (c.ornek ? note('info', SAP.i18n.etiket('Örnek'), c.ornek) : '') +
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

      if (t.ipucu) b += note('tip', SAP.i18n.etiket('İpucu'), t.ipucu);

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
          /* Satır içi renk ezmesi KALDIRILDI: `--info`/`--text-inv` eski
             temadan kalmış, artık tanımsız tokenlerdi. Zaten kaldırılmaları
             gerekirdi — tablo çipini işlem kodu çipinden ayrı renge boyamak
             "tek vurgu rengi" kuralına aykırı (theme.css ilke 2). */
          '<span class="tc-code">' + esc(t.ad) + '</span>' +
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
        '<h3><span class="tag ready">' + esc(SAP.i18n.etiket('Ekran')) + ' ' + (i + 1) + '</span> ' + mk(e.ad) + '</h3>' +
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

    if (d.universalJournal) out += note('info', SAP.i18n.etiket('Universal Journal (ACDOCA) etkisi'), d.universalJournal);

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
    if (d.hikaye) out += note('info', SAP.i18n.etiket('Senaryo'), d.hikaye);
    if (d.veriler && d.veriler.length) {
      out += kv(d.veriler.map(function (v) { return [v.k, v.v]; }));
    }

    (d.adimlar || []).forEach(function (a, i) {
      out += '<div class="panel">' +
        '<h3><span class="tag ready">' + esc(SAP.i18n.etiket('Adım')) + ' ' + (i + 1) + '</span> ' + mk(a.baslik) + '</h3>' +
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

  /* ================================================ ÖĞRENME BÖLÜMÜ ====
     KALDIRILDI (kullanıcı talebi, Eylül 2026).

     Bölüm şunları çiziyordu: konu özeti · mülakat notları · sık yapılan
     hatalar tablosu · ipuçları · mini quiz. Gerekçe: "profesyonel
     durmuyor" — ve haklı. Bir el kitabında bölüm sonunda quiz olmaz;
     bu, konuyu bir *ders modülüne* çeviriyordu. Aynı bilgi zaten
     bölümlerin içinde (notlar, uyarı kutuları, senaryo) duruyor.

     ⚠️ İÇERİK SİLİNMEDİ: `ogrenme` verisi 36 konu dosyasında olduğu gibi
     duruyor (özet, önemli noktalar, sık hatalar, ipuçları, 8 quiz sorusu
     ve flash kartlar). Geri istenirse renderer ve SECTIONS satırı geri
     konur; içerik yeniden yazılmaz.

     ⚠️ NOTLAR bu bölümün içindeydi ve KAYBOLMADI: konu sayfasının
     sonuna, numarasız kendi bloğuna taşındı (views.js). Notlar ayrı bir
     özelliktir — kenar çubuğunda kendi sayfası var. */

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
