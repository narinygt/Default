/* ==========================================================================
   i18n.js — Arayüz dili (TR / EN)
   --------------------------------------------------------------------------
   KAPSAM — ve sınırı açıkça yazılmıştır:

   ✔ Çevrilir: bütün arayüz metinleri, dokuz grup adı, 36 konunun BAŞLIĞI
     ve ÖZETİ, seviye adları, bölüm adları, boş durum metinleri.

   ✘ Çevrilmez (bilinçli): konuların DERİN İÇERİĞİ — 11 bölümün gövdesi,
     senaryolar, fişler, quiz soruları. Sebep tek: bu içerik ~2 milyon
     karakter ve makine çevirisi muhasebe metninde yanlış terim üretir
     ("kapatma" → closing / clearing ayrımı gibi). Yarım çevrilmiş bir
     muhasebe metni, çevrilmemiş olandan daha tehlikelidir.

   EN seçiliyken konu sayfasının gövdesi Türkçe kalır ve sayfanın başında
   bunu söyleyen bir satır çıkar. Bu bir eksiklik değil, açıklanmış bir
   karardır — bkz. notice() ve CLAUDE.md §10.

   Yeni dil eklemek: DICT'e bir anahtar seti + TOPICS_EN benzeri bir konu
   sözlüğü. Motorda değişiklik gerekmez.
   ========================================================================== */

(function (SAP) {
  'use strict';

  var DILLER = ['tr', 'en'];

  /* ------------------------------------------------------- ARAYÜZ --- */

  var DICT = {
    tr: {
      'app.name':        'SAP S/4HANA FI',
      'app.tagline':     'Finansal Muhasebe El Kitabı',
      'nav.home':        'İçindekiler',
      'nav.fav':         'Favorilerim',
      'nav.notes':       'Notlarım',
      'nav.search':      'Ara',
      'nav.searchHint':  'Konu, işlem kodu, tablo, terim…',
      'nav.menu':        'Menüyü aç/kapat',
      'nav.theme.dark':  'Karanlık moda geç',
      'nav.theme.light': 'Aydınlık moda geç',
      'nav.lang':        'Dil',

      'home.title':      'İçindekiler',
      'home.subtitle':   'Otuz altı konu, dokuz bölüm.',
      'home.resume':     'Kaldığın yerden devam et',
      'home.start':      'Okumaya başla',
      'home.progress':   'Genel ilerleme',
      'home.random':     'Rastgele konu',
      'home.empty':      'Bu süzgece uyan konu yok.',
      'home.clear':      'Süzgeci kaldır',

      'topic.of':        'Bölüm',
      'topic.read':      'Okundu',
      'topic.markRead':  'Okundu işaretle',
      'topic.markAll':   'Tümünü okundu işaretle',
      'topic.done':      'Konu tamamlandı',
      'topic.print':     'PDF',
      'topic.fav':       'Favorilere ekle',
      'topic.unfav':     'Favorilerden çıkar',
      'topic.onPage':    'Bu sayfada',
      'topic.related':   'İlgili konular',
      'topic.prev':      'Önceki',
      'topic.next':      'Sonraki',
      'topic.soon':      'Bu konunun derin içeriği henüz yazılmadı.',
      'topic.minutes':   'dk',
      'topic.sections':  'bölüm',

      'level.Başlangıç': 'Başlangıç',
      'level.Orta':      'Orta',
      'level.İleri':     'İleri',

      'ref.tcode':       'İşlem kodu',
      'ref.table':       'Tablo',
      'ref.term':        'Sözlük',
      'ref.usedIn':      'Bu konularda geçiyor',
      'ref.siblings':    'Aynı alandaki diğerleri',
      'ref.fields':      'Alanlar',
      'ref.related':     'İlgili terimler',

      'fav.title':       'Favorilerim',
      'fav.empty':       'Henüz favori yok. Bir konunun yanındaki yıldıza bas.',
      'notes.title':     'Notlarım',
      'notes.empty':     'Henüz not yok. Konu sayfalarının sonunda not alabilirsin.',
      'notes.mine':      'Notlarım',
      'notes.ph':        'Bu konuyla ilgili kendi notlarını buraya yaz. Otomatik kaydedilir.',
      'notes.saved':     'Kayıtlı',
      'notes.saving':    'Yazılıyor…',
      'notes.chars':     'karakter',
      'search.title':    'Arama sonuçları',
      'search.topic':    'Konu',
      'search.empty':    'Sonuç bulunamadı.',
      'nf.title':        'Sayfa bulunamadı',
      'nf.back':         'İçindekilere dön',

      'quiz.title':      'Mini sınav',
      'quiz.reset':      'Baştan çöz',
      'quiz.hint':       'Bir şıkka tıklayınca doğru cevap ve açıklaması görünür.',
      'quiz.prev':       'Önceki sonuç',
      'quiz.done':       'Sınav bitti',

      'jr.debit':        'Borç',
      'jr.credit':       'Alacak',
      'jr.total':        'Toplam',
      'jr.balanced':     'DENK',
      'jr.unbalanced':   'DENK DEĞİL',

      'note.tip':        'İpucu',
      'note.warn':       'Dikkat',
      'note.err':        'Hata',
      'note.info':       'Not',

      'lang.notice':     'İçerik gövdesi Türkçedir. Arayüz, başlıklar ve ' +
                         'özetler İngilizceye çevrilmiştir; konu metinleri ' +
                         'muhasebe terminolojisi nedeniyle çevrilmemiştir.',
    },

    en: {
      'app.name':        'SAP S/4HANA FI',
      'app.tagline':     'A Financial Accounting Handbook',
      'nav.home':        'Contents',
      'nav.fav':         'Bookmarks',
      'nav.notes':       'Notes',
      'nav.search':      'Search',
      'nav.searchHint':  'Topic, transaction code, table, term…',
      'nav.menu':        'Toggle navigation',
      'nav.theme.dark':  'Switch to dark mode',
      'nav.theme.light': 'Switch to light mode',
      'nav.lang':        'Language',

      'home.title':      'Contents',
      'home.subtitle':   'Thirty-six topics in nine parts.',
      'home.resume':     'Continue where you left off',
      'home.start':      'Start reading',
      'home.progress':   'Overall progress',
      'home.random':     'Random topic',
      'home.empty':      'No topic matches this filter.',
      'home.clear':      'Clear filter',

      'topic.of':        'Section',
      'topic.read':      'Read',
      'topic.markRead':  'Mark as read',
      'topic.markAll':   'Mark all as read',
      'topic.done':      'Topic complete',
      'topic.print':     'PDF',
      'topic.fav':       'Add bookmark',
      'topic.unfav':     'Remove bookmark',
      'topic.onPage':    'On this page',
      'topic.related':   'Related topics',
      'topic.prev':      'Previous',
      'topic.next':      'Next',
      'topic.soon':      'The full text for this topic has not been written yet.',
      'topic.minutes':   'min',
      'topic.sections':  'sections',

      'level.Başlangıç': 'Beginner',
      'level.Orta':      'Intermediate',
      'level.İleri':     'Advanced',

      'ref.tcode':       'Transaction code',
      'ref.table':       'Table',
      'ref.term':        'Glossary',
      'ref.usedIn':      'Appears in these topics',
      'ref.siblings':    'Others in the same area',
      'ref.fields':      'Fields',
      'ref.related':     'Related terms',

      'fav.title':       'Bookmarks',
      'fav.empty':       'No bookmarks yet. Use the star next to a topic.',
      'notes.title':     'Notes',
      'notes.empty':     'No notes yet. You can write notes at the end of any topic.',
      'notes.mine':      'My notes',
      'notes.ph':        'Write your own notes here. Saved automatically.',
      'notes.saved':     'Saved',
      'notes.saving':    'Saving…',
      'notes.chars':     'characters',
      'search.title':    'Search results',
      'search.topic':    'Topic',
      'search.empty':    'Nothing found.',
      'nf.title':        'Page not found',
      'nf.back':         'Back to contents',

      'quiz.title':      'Quick quiz',
      'quiz.reset':      'Start over',
      'quiz.hint':       'Pick an option to reveal the correct answer and the reasoning.',
      'quiz.prev':       'Previous score',
      'quiz.done':       'Quiz finished',

      'jr.debit':        'Debit',
      'jr.credit':       'Credit',
      'jr.total':        'Total',
      'jr.balanced':     'BALANCED',
      'jr.unbalanced':   'NOT BALANCED',

      'note.tip':        'Tip',
      'note.warn':       'Caution',
      'note.err':        'Error',
      'note.info':       'Note',

      'lang.notice':     'Topic bodies remain in Turkish. The interface, ' +
                         'titles and summaries are translated; the topic ' +
                         'text is not, because accounting terminology does ' +
                         'not survive machine translation.',
    },
  };

  /* --------------------------------------------------- GRUP ADLARI --- */

  var GROUPS_EN = {
    'temeller':    'Foundations',
    'surecler':    'Core Processes',
    'islemler':    'Daily Operations',
    'donem-sonu':  'Period End',
    'mimari':      'Ledger Architecture',
    'entegrasyon': 'Integration',
    'teknik':      'Technical & Reporting',
    'veri':        'Data & Migration',
    'ileri':       'Advanced',
  };

  /* ------------------------------------- KONU BAŞLIĞI VE ÖZETİ (EN) --- */

  var TOPICS_EN = {
    'genel-muhasebe': { title: 'General Accounting',
      summary: 'The accounting language you need before touching SAP: debit and credit, double entry, balance sheet and income statement, accrual basis.' },
    'fi-temelleri': { title: 'SAP FI Fundamentals',
      summary: 'What the FI module covers, its components (GL, AP, AR, AA, BL), how it relates to other modules, and the anatomy of an FI document.' },
    'org-yapisi': { title: 'Organisational Structure',
      summary: 'Company, company code, business area, chart of accounts, fiscal year variant, credit control area — the skeleton FI is built on.' },
    'master-data': { title: 'Master Data',
      summary: 'G/L account, vendor, customer and bank master data; account group, field status, reconciliation account and the Business Partner in S/4HANA.' },

    'gl-accounting': { title: 'G/L Accounting',
      summary: 'How the general ledger works: account structure, open item management, posting types, balance and line item reports, the role of ACDOCA.' },
    'accounts-payable': { title: 'Accounts Payable',
      summary: 'The procure-to-pay liability cycle: vendor master, invoice entry, payment, clearing and ageing.' },
    'accounts-receivable': { title: 'Accounts Receivable',
      summary: 'The order-to-cash receivable cycle: customer master, invoice, collection, clearing, ageing and dunning.' },
    'asset-accounting': { title: 'Asset Accounting',
      summary: 'From acquisition to retirement: purchase, depreciation, transfer, scrapping and sale; depreciation areas and parallel valuation.' },
    'bank-accounting': { title: 'Bank Accounting',
      summary: 'House bank setup, bank clearing accounts, manual statements, cheque management and how cash flow reaches the ledger.' },

    'document-posting': { title: 'Document Posting',
      summary: 'How an FI document is born: document type, posting key, field status, number range, posting date vs document date, and reversal.' },
    'document-parking': { title: 'Document Parking',
      summary: 'Parking versus holding, the four-eyes principle built through authorisation, and why parked documents silently leave a period incomplete.' },
    'clearing': { title: 'Clearing',
      summary: 'Matching open items: automatic and manual clearing, tolerances, residual versus partial payment, and resetting a clearing.' },
    'special-gl': { title: 'Special G/L',
      summary: 'Down payments, guarantees and bills of exchange: the indicator mechanism, the alternative reconciliation account, and real versus statistical items.' },
    'f110': { title: 'Automatic Payment Program (F110)',
      summary: 'The four steps of the payment run, the proposal as a safe rehearsal, payment methods, and why an item is silently left out.' },
    'ebs': { title: 'Electronic Bank Statement',
      summary: 'Importing statements, posting rules, interpretation algorithms, and what happens when a line cannot be matched.' },
    'dunning': { title: 'Dunning',
      summary: 'Dunning procedure and levels, why dunning produces no accounting entry, and the customers a run quietly skips.' },
    'taxes': { title: 'Taxes',
      summary: 'What a tax code carries, non-deductible VAT going to cost rather than to an account, and why tax lives in BSET, not BSEG.' },
    'dogrulama-ikame': { title: 'Validation & Substitution',
      summary: 'The rule engine that fires at posting time: validation blocks a wrong entry and is visible; substitution changes a value and is silent.' },
    'e-donusum': { title: 'Turkish E-Invoicing',
      summary: 'Turkey-specific: the accounting document and the e-document are two separate objects with independent lifecycles — and either can fail alone.' },

    'foreign-currency': { title: 'Foreign Currency Valuation',
      summary: 'Translation, valuation and realisation kept apart; monetary versus non-monetary items; why a down payment is never valued.' },
    'closing': { title: 'Closing Operations',
      summary: 'The ten steps of a month-end close, why they run in that order, provisional versus permanent postings, and special periods 13–16.' },

    'new-gl': { title: 'New G/L',
      summary: 'What document splitting is really for: expense lines already carry a profit centre — the problem is the balance sheet lines.' },
    'parallel-ledger': { title: 'Parallel Ledger',
      summary: 'An empty ledger group means all ledgers. Record the fact in every ledger; record the valuation judgement per ledger.' },

    'cost-center': { title: 'Cost Centre Integration',
      summary: 'Why a wrong cost centre triggers no accounting control at all, and why the fix is KB11N rather than a reversal.' },
    'co-integration': { title: 'CO Integration',
      summary: 'FI and CO share one LUW: a missing CO number range stops the FI posting too — the error surfaces in FI, the cause sits in CO.' },
    'mm-integration': { title: 'MM Integration',
      summary: 'OBYC transaction keys, the BSX/WRX asymmetry, account assignment categories, price control S versus V and the “V trap”.' },
    'sd-integration': { title: 'SD Integration',
      summary: 'VKOA criteria and the quiet failure mode: the invoice is issued and sent to the customer, only the FI document never appears.' },

    'sap-tables': { title: 'FI Table Architecture',
      summary: 'Header and item, index and total tables as a performance fix that HANA made unnecessary, and the SHKZG sign trap.' },
    'tcodes': { title: 'Transaction Codes',
      summary: 'Transaction codes are not memorised, they are decoded: about fifteen patterns explain hundreds of codes — starting with their German roots.' },
    'reporting': { title: 'Reporting',
      summary: 'Choosing the right report type: balance answers “how much”, line item answers “why” — and only one of them can drill to the document.' },

    'lsmw': { title: 'LSMW',
      summary: 'Not an upload tool but a recipe book: loading data once is easy, repeating the same load with the same result is not.' },
    'data-upload': { title: 'Data Upload',
      summary: 'Not a speed decision but an error-handling decision: what happens to the fourteen records out of five hundred that fail?' },
    'migration': { title: 'Data Migration',
      summary: 'Not a data-moving exercise but an accounting decision about which past is carried forward — and which is left behind.' },

    'error-handling': { title: 'Error Handling',
      summary: 'Not an error dictionary but a diagnostic method: three classes of error, and the one that separates a consultant is the silent one.' },
    'best-practices': { title: 'Best Practices',
      summary: 'Configuration decisions split in two: those you can undo, and those sealed by data. Only the second kind deserves real care.' },
    's4-yenilikleri': { title: 'What Changed in S/4HANA',
      summary: 'Almost every change follows one sentence: compute the total instead of storing it. Most simplifications are removals, not features.' },
  };

  /* ---------------------------------- BÖLÜM İÇİ ETİKETLER (33+) ---
     Alt başlıklar ve tablo sütun adları. Bunlar YAZAR PROZASI DEĞİL,
     renderer'ın kendi etiketleridir — bu yüzden gövde Türkçe kalsa da
     çevrilirler. Anahtar Türkçe metnin kendisidir: içerik dosyalarına
     dokunmadan çeviri eklenebilsin diye. */
  var LABELS_EN = {
    'Adım adım kullanım': 'Step by step',
    'Alan özeti': 'Field summary',
    'Alanlar': 'Fields',
    'Alınabilecek hatalar ve çözümleri': 'Errors you may hit, and the fix',
    'Arka planda hangi tablolar güncellenir?': 'Which tables are updated behind the scenes?',
    'Bu konuda geçen anahtar kavramlar': 'Key concepts in this topic',
    'ECC ile S/4HANA farkları': 'ECC versus S/4HANA',
    'Ekrana girilenler': 'What you enter on screen',
    'En önemli alanlar': 'The fields that matter most',
    'Hangi hesaplar etkilenir ve neden?': 'Which accounts are affected, and why?',
    'Kalkan / değişen işlem kodları': 'Removed and replaced transaction codes',
    'Karşılaştırma': 'Comparison',
    'Kim ne yapar?': 'Who does what?',
    'Konu özeti': 'Topic summary',
    'Mini quiz': 'Quick quiz',
    'Muhasebe mantığı': 'The accounting logic',
    'Mülakatta sorulan önemli noktalar': 'Points that come up in interviews',
    'Notlarım': 'My notes',
    'Performans farkı': 'Performance difference',
    'SAP Best Practices': 'SAP Best Practices',
    'SPRO / IMG yolları': 'SPRO / IMG paths',
    'Sürecin sonunda ne oldu?': 'How it ended',
    'Süreç adımları': 'Process steps',
    'Sık alınan hatalar': 'Common errors',
    'Sık yapılan hatalar': 'Common mistakes',
    'T hesaplarıyla görünümü': 'Seen as T-accounts',
    'Tablolarda ne değişti?': 'What changed in the tables?',
    'Uyumluluk view’leri': 'Compatibility views',
    'Veri nereden gelir, nereye gider?': 'Where the data comes from and goes',
    'Yeni Fiori uygulamaları': 'New Fiori apps',
    'Örnek ekran akışı': 'Example screen flow',
    'İlgili işlem kodları': 'Related transaction codes',
    'İpuçları': 'Tips',
    'Rol': 'Role',
    'Sorumluluğu': 'Responsibility',
    'Kim': 'Who',
    'Ne yapar': 'Does what',
    'SAP’ta karşılığı': 'In SAP',
    'Hesap': 'Account',
    'Türü': 'Type',
    'Neden': 'Why',
    'Hata mesajı': 'Error message',
    'Sebebi': 'Cause',
    'Çözümü': 'Fix',
    'Konu': 'Topic',
    'ECC': 'ECC',
    'S/4HANA': 'S/4HANA',
    'Eski': 'Old',
    'Yeni': 'New',
    'Not': 'Note',
    'Uygulama': 'App',
    'Ne yapar?': 'What it does',
    'Tablo': 'Table',
    'Ne güncellenir': 'What is updated',
    'Alan': 'Field',
    'Açıklama': 'Description',
    'Zorunlu': 'Required',
    'Ekran': 'Screen',
    'İşlem': 'Action',
    'Değer': 'Value',
    'Girdi': 'Input',
    'Etki': 'Effect',
  };

  /* ------------------------------------------ BÖLÜM ADLARI (11) --- */

  var SECTIONS_EN = {
    tanim:    'What It Is',
    surec:    'Business Process',
    muhasebe: 'Accounting Logic',
    cesitler: 'Variants',
    tcodes:   'Transaction Codes',
    tablolar: 'Tables',
    sapSurec: 'In the System',
    teknik:   'Technical Detail',
    s4hana:   'S/4HANA',
    senaryo:  'Real Scenario',
    ogrenme:  'Review',
  };

  /* ----------------------------------------------------- MOTOR --- */

  var dil = 'tr';

  function normalize(x) { return DILLER.indexOf(x) !== -1 ? x : 'tr'; }

  var i18n = {
    diller: DILLER,

    get: function () { return dil; },

    set: function (x) {
      dil = normalize(x);
      SAP.store.d.lang = dil;
      SAP.store.save();
      document.documentElement.setAttribute('lang', dil);
      return dil;
    },

    /** Arayüz metni. Anahtar yoksa anahtarın kendisi döner — sessiz
        kaybolmasın, ekranda görünsün ki eksik çeviri fark edilsin. */
    t: function (k) {
      var d = DICT[dil] || DICT.tr;
      if (d[k] != null) return d[k];
      if (DICT.tr[k] != null) return DICT.tr[k];
      return k;
    },

    /** Grup adı. */
    grup: function (g) {
      if (dil === 'en' && GROUPS_EN[g.id]) return GROUPS_EN[g.id];
      return g.ad;
    },

    /** Konu başlığı — seçili dilde. */
    baslik: function (t) { return i18n.baslikDil(t, dil); },

    /** Konu özeti — seçili dilde. */
    ozet: function (t) { return i18n.ozetDil(t, dil); },

    /* Belirli bir dildeki karşılık. Arama indeksi bunu kullanır: görünen
       etiket seçili dilden gelir ama ARANAN metin iki dili de içerir. */
    baslikDil: function (t, d) {
      var e = d === 'en' && TOPICS_EN[t.id];
      return e && e.title ? e.title : t.title;
    },
    ozetDil: function (t, d) {
      var e = d === 'en' && TOPICS_EN[t.id];
      return e && e.summary ? e.summary : (t.summary || '');
    },

    /** Seviye adı (Başlangıç / Orta / İleri). */
    seviye: function (lv) { return i18n.t('level.' + lv); },

    /** Renderer etiketi (alt başlık, tablo sütunu). Karşılığı yoksa
        Türkçesi döner — eksik çeviri sayfayı kırmaz, sadece görünür. */
    etiket: function (tr) {
      if (dil === 'en' && LABELS_EN[tr]) return LABELS_EN[tr];
      return tr;
    },

    /** Bölüm adı. */
    bolum: function (id, trAd) {
      if (dil === 'en' && SECTIONS_EN[id]) return SECTIONS_EN[id];
      return trAd;
    },

    /** Yüzde biçimi. Türkçede işaret ÖNDE (%40), İngilizcede ARKADA (40%).
        Küçük ama dil bilen bir arayüzün ele verdiği ilk yerlerden biri. */
    yuzde: function (n) { return dil === 'en' ? n + '%' : '%' + n; },

    /** EN'de konu gövdesinin Türkçe kaldığını söyleyen satır. */
    govdeUyarisi: function () {
      return dil === 'en' ? i18n.t('lang.notice') : '';
    },
  };

  SAP.i18n = i18n;
  SAP.t = i18n.t;

})(window.SAP);
