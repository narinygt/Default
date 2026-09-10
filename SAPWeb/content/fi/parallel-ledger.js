/* ==========================================================================
   content/fi/parallel-ledger.js — "Parallel Ledger (Paralel Defter)"
   ========================================================================== */

SAP.registerTopic({
  id: 'parallel-ledger',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Paralel defter, **aynı işlemi birden çok muhasebe standardına göre kaydetme** yöntemidir. ' +
      'Bir şirket hem yerel vergi mevzuatına hem {{ifrs}}’e göre rapor vermek zorundaysa, ' +
      'aynı olayın iki farklı tutarla kaydedilmesi gerekir.\n\n' +
      'SAP bunu **defterlerle** çözer. **{{lider-defter}}** (standart kodu **0L**) ana standardı taşır; ' +
      'ek defterler (2L, 3L…) diğer standartları taşır. ' +
      'Ortak işlemler **tüm defterlere** yazılır; yalnızca farklı olan kısımlar ' +
      'tek deftere yazılır ({{FB01L}}).\n\n' +
      'Kritik nokta şudur: **veri çoğaltılmaz, fark kaydedilir.** ' +
      'Bir satış faturası iki kez girilmez; her iki standartta da aynı olduğu için ' +
      'tek kayıtla tüm defterlere gider. Yalnızca amortisman gibi **standarda göre değişen** ' +
      'kalemler defter bazlı kaydedilir.',

    neden:
      '**Yasal zorunluluk.** Halka açık şirketler ve büyük ölçekli işletmeler ' +
      'hem yerel mevzuata hem uluslararası standartlara göre rapor verir.\n\n' +
      '**Farklı değerleme kuralları.** Amortisman süresi, karşılık ölçütleri, ' +
      'kiralama muhasebesi, gelir tanıma zamanı — standartlara göre değişir.\n\n' +
      '**Tek sistem, tek doğruluk kaynağı.** Alternatif, ikinci bir muhasebe sistemi ' +
      'veya Excel’de düzeltme tabloları tutmaktır; ikisi de denetlenebilir değildir.\n\n' +
      '**İzlenebilirlik.** Her farkın hangi defterde, hangi belgeyle, hangi gerekçeyle ' +
      'oluştuğu görülebilir olmalıdır.',

    sirketOnemi:
      'Paralel defter, bir şirketin **muhasebe olgunluk seviyesinin göstergesidir**. ' +
      'Kurulumu zordur, işletmesi disiplin ister — ama alternatifi ' +
      '"IFRS düzeltmelerini Excel’de tutmak"tır ve bu, denetimde en çok eleştirilen uygulamadır.\n\n' +
      'Danışman açısından bu konu **{{new-gl}} ile {{asset-accounting}} arasındaki köprüdür**: ' +
      'paralel defterin gerçek hayattaki en yoğun kullanım alanı duran varlıklardır, ' +
      'çünkü amortisman farkları her ay ve her varlık için tekrarlanır.\n\n' +
      'Mülakatta ayırt edici soru: **"Defter grubu boş bırakılırsa ne olur?"** ' +
      'Doğru cevap: kayıt **tüm defterlere** gider. Bu, paralel defterin en temel davranışıdır ' +
      've yanlış bilinirse tüm mimari yanlış kurulur.',

    gercekHayat:
      'Bir üretim şirketi 1.200.000 TL’ye bir makine alıyor.\n\n' +
      '**Yerel mevzuat:** 10 yıl amortisman → yılda 120.000 TL.\n' +
      '**IFRS:** makinenin gerçek faydalı ömrü 8 yıl → yılda 150.000 TL.\n\n' +
      'Aynı varlık, aynı maliyet, **farklı gider**. Fark yılda 30.000 TL.\n\n' +
      'Bu farkı nasıl yönetirsiniz? Üç yol vardır:\n\n' +
      '**1. Excel’de tutmak** — denetlenebilir değil, hata riski yüksek, ' +
      'her ay elle güncellenir.\n\n' +
      '**2. İki ayrı varlık kaydı açmak** — varlık iki kez görünür, envanter bozulur, ' +
      'satışta iki kayıt kapatılır.\n\n' +
      '**3. Paralel defter** — tek varlık, iki {{amortisman-alani}}, her alan bir deftere yazar. ' +
      'Satın alma tek kayıt (tüm defterlere), amortisman defter bazlı. **Doğru çözüm budur.**',

    muhasebeMantigi:
      'Paralel defterin muhasebe mantığı şu ilkeye dayanır: ' +
      '**işlemin kendisi tektir, değerlemesi çoktur.**\n\n' +
      'Bir makine satın alındığında olay birdir: 1.200.000 TL ödendi, bir varlık edinildi. ' +
      'Hiçbir standart bunu tartışmaz. Bu yüzden satın alma kaydı **tüm defterlere** gider.\n\n' +
      'Ama "bu varlık kaç yılda tükenir?" sorusu bir **değerleme yargısıdır** ve ' +
      'standartlara göre değişir. Bu yüzden amortisman **defter bazlı** kaydedilir.\n\n' +
      'Aynı ayrım her yerde geçerlidir: bir dava açıldığı olgu tektir, ' +
      'ama "ne kadar karşılık ayrılmalı?" sorusu standarda göre değişir. ' +
      'Bir kira sözleşmesi imzalandığı olgu tektir, ' +
      'ama IFRS 16 onu bilançoya alır, yerel mevzuat almayabilir.\n\n' +
      '**Pratik kural:** olguyu tüm defterlere yaz, yargıyı defter bazlı yaz.',

    kavramlar: ['lider-defter', 'defter-grubu', 'ifrs', 'amortisman-alani',
                'evrensel-kayit-defteri', 'yerel-para-birimi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Paralel defter süreci iki soruyla yönetilir: ' +
      '**"Bu işlem tüm standartlarda aynı mı?"** ve değilse ' +
      '**"Hangi deftere ne yazılacak?"** ' +
      'Günlük işlemlerin %95’i birinci soruya "evet" der ve hiçbir ek çaba gerektirmez.',

    roller:[
      { rol:'Kullanıcı', gorev:'Normal işlemleri girer — **defter alanına dokunmaz**, kayıt tüm defterlere gider.' },
      { rol:'Ana muhasebe', gorev:'Standart farkı olan kayıtları {{FB01L}} / {{FB50L}} ile **tek deftere** girer.' },
      { rol:'Duran varlık muhasebesi', gorev:'{{AFAB}} çalıştırır; her {{amortisman-alani}} kendi defterine yazar.' },
      { rol:'FI danışmanı', gorev:'{{FINSC_LEDGER}} ile defterleri, defter gruplarını ve alan↔defter eşleşmesini tasarlar.' },
      { rol:'Raporlama', gorev:'{{FAGLL03}} / {{FAGLB03}} ile defter bazlı rapor alır.' },
      { rol:'Denetçi', gorev:'İki defter arasındaki farkların **gerekçelendirilmiş** olmasını arar.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Hangi kayıt hangi deftere gider?',
      adimlar:[
        { ic:'❓', rol:'Muhasebe', baslik:'Soru: bu işlem tüm standartlarda aynı mı?',
          aciklama:'Satış, alış, tahsilat, ödeme → **evet**. ' +
                   'Amortisman, karşılık, kiralama, değerleme → **hayır**.',
          cikti:'Karar', ok:'aynıysa' },
        { ic:'📝', rol:'Kullanıcı', baslik:'Normal kayıt — **defter grubu boş**',
          aciklama:'{{FB60}} / {{FB70}} / {{MIRO}} ile normal giriş. ' +
                   'Defter grubu boş olduğu için kayıt **tüm defterlere** gider.',
          cikti:'Tüm defterlerde aynı kayıt', ok:'farklıysa' },
        { ic:'🎯', rol:'Ana muhasebe', baslik:'Defter bazlı kayıt ({{FB01L}})',
          aciklama:'Defter grubu **belirtilir**; kayıt yalnızca o deftere gider. ' +
                   'Diğer defterler etkilenmez.',
          cikti:'Tek defterde kayıt', ok:'varlıklarda' },
        { ic:'🏭', rol:'Duran varlık', baslik:'{{AFAB}} — alanlar defterlere yazar',
          aciklama:'Her {{amortisman-alani}} bir defter grubuna bağlıdır. ' +
                   'Alan 01 → lider defter, alan 32 → IFRS defteri.',
          cikti:'Defter bazlı amortisman', ok:'dönem sonu' },
        { ic:'📊', rol:'Raporlama', baslik:'Defter bazlı raporlar',
          aciklama:'{{FAGLB03}} ile aynı hesabın **farklı defterlerdeki** bakiyesi görülür. ' +
                   'Fark, standart farkının tutarıdır.',
          cikti:'İki standart, iki tablo', ok:'kapanış' },
        { ic:'📅', rol:'Ana muhasebe', baslik:'Defter bazlı kapanış',
          aciklama:'{{FAGLGVTR}} bakiye devri her defter için ayrı çalıştırılır.',
          cikti:'Devredilmiş bakiyeler' },
      ],
    },

    adimlar:[
      { rol:'Danışman', eylem:'Defterleri tanımlar', sistem:'{{FINSC_LEDGER}} → {{T881}}' },
      { rol:'Danışman', eylem:'Amortisman alanlarını defterlere bağlar', sistem:'{{OADB}} — AA ↔ defter köprüsü' },
      { rol:'Kullanıcı', eylem:'Normal işlemleri girer', sistem:'Defter grubu **boş** → tüm defterler' },
      { rol:'Ana muhasebe', eylem:'Standart farkını girer', sistem:'{{FB01L}} / {{FB50L}} → tek defter' },
      { rol:'Duran varlık', eylem:'Amortisman çalıştırır', sistem:'{{AFAB}} → alan bazında defterler' },
      { rol:'Raporlama', eylem:'Defter bazlı rapor alır', sistem:'{{FAGLB03}}, {{FAGLL03}}' },
      { rol:'Ana muhasebe', eylem:'Bakiye devrini yapar', sistem:'{{FAGLGVTR}} — **her defter için**' },
    ],

    veriAkisi:{
      nereden:'Defter tanımları ({{T881}}), amortisman alanı ↔ defter eşleşmesi, ' +
              'kullanıcının seçtiği defter grubu.',
      nereye:'{{ACDOCA}} — her satır `RLDNR` (defter) alanı taşır; defter bazlı raporlar.',
      tetikleyen:'Her kayıt. Defter grubu boşsa tüm defterlere, doluysa yalnızca o gruba.',
      sonraki:'Defter bazlı kapanış, standart bazlı mali tablolar, denetim.',
    },

    notlar:[
      { tip:'warn', baslik:'Defter grubu boş = tüm defterler', metin:
        'Bu, paralel defterin **en temel ve en çok yanlış anlaşılan** davranışıdır.\n\n' +
        'Kayıt ekranında defter grubu alanı boş bırakılırsa, kayıt **tüm defterlere** gider. ' +
        '"Boş = hiçbir defter" veya "boş = lider defter" **değildir**.\n\n' +
        'Bu tasarım doğrudur: günlük işlemlerin çoğu tüm standartlarda aynıdır ve ' +
        'kullanıcının her faturada defter seçmesi gerekmemelidir.\n\n' +
        'Ama tersi hata **çok pahalıdır**: IFRS farkı olan bir kaydı defter grubu belirtmeden ' +
        'girmek, farkı **yerel deftere de** yazar. Sonuç: yerel mali tablo bozulur ve ' +
        'hata genelde yıl sonunda, denetimde fark edilir.\n\n' +
        '**Önlem:** defter bazlı kayıtlar için ayrı belge türü tanımla ' +
        've bu kayıtları yalnızca {{FB01L}} / {{FB50L}} ile girme disiplinini kur.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Paralel defterin muhasebesi tek bir örnekte anlaşılır: **bir makinenin ömrü**. ' +
      'Satın alma her iki defterde aynı, amortisman farklı, satış anında ' +
      'iki defterde **farklı kâr/zarar** çıkar.',

    etkilenenHesaplar:[
      { hesap:'253 Tesis, makine ve cihazlar', tur:'Bilanço — Varlık', neden:'Satın alma her iki defterde aynı — **olgu tektir**.' },
      { hesap:'257 Birikmiş amortisman', tur:'Bilanço — Varlık (eksi)', neden:'**Defterlere göre farklı** — değerleme yargısı.' },
      { hesap:'770 Amortisman gideri', tur:'Gelir tablosu', neden:'Her defter kendi tutarını taşır.' },
      { hesap:'Karşılık hesapları', tur:'Bilanço — Kaynak', neden:'IFRS ve yerel mevzuat farklı ölçütler kullanır.' },
      { hesap:'Kullanım hakkı varlığı (IFRS 16)', tur:'Bilanço — Varlık', neden:'Yalnızca IFRS defterinde bulunur; yerel defterde yoktur.' },
      { hesap:'689 / 649 Diğer gider-gelir', tur:'Gelir tablosu', neden:'Varlık satışında iki defterde farklı kâr/zarar doğar.' },
    ],

    fisler:[
      { baslik:'Adım 1 — Makine satın alınır · **tüm defterlere** (defter grubu boş)',
        belgeTuru:'KR', tarih:'02.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Tesis, makine ve cihazlar', borc:1200000, not:'Her iki defterde **aynı**' },
          { hesap:'191', ad:'İndirilecek KDV', borc:240000 },
          { hesap:'320', ad:'Satıcılar', alacak:1440000 },
        ],
        not:'**Defter grubu boş bırakıldı** → kayıt lider deftere (0L) ve IFRS defterine (2L) ' +
             'aynı anda gitti.\n\n' +
             'Doğru davranış budur: "1.200.000 TL’ye makine alındı" bir **olgudur**, ' +
             'hiçbir standart bunu farklı görmez.' },

      { baslik:'Adım 2a — Yıllık amortisman · **lider defter (0L)** · 10 yıl',
        belgeTuru:'AF', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Amortisman gideri', borc:120000, not:'Amortisman alanı **01** → defter 0L' },
          { hesap:'257', ad:'Birikmiş amortisman', alacak:120000 },
        ],
        not:'Yerel mevzuata göre 10 yıl → 1.200.000 / 10 = **120.000 TL**.\n\n' +
             'Bu kayıt yalnızca **lider deftere** gitti; IFRS defteri etkilenmedi.' },

      { baslik:'Adım 2b — Yıllık amortisman · **IFRS defteri (2L)** · 8 yıl',
        belgeTuru:'AF', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Amortisman gideri', borc:150000, not:'Amortisman alanı **32** → defter 2L' },
          { hesap:'257', ad:'Birikmiş amortisman', alacak:150000 },
        ],
        not:'IFRS’e göre faydalı ömür 8 yıl → 1.200.000 / 8 = **150.000 TL**.\n\n' +
             '**Aynı {{AFAB}} çalıştırması** her iki kaydı da üretti — kullanıcı iki kez ' +
             'çalıştırmadı. Her {{amortisman-alani}} kendi defterine yazdı.\n\n' +
             'Yıllık fark: 150.000 − 120.000 = **30.000 TL**.' },

      { baslik:'Adım 3 — IFRS 16 kiralama · **yalnızca IFRS defterinde**',
        belgeTuru:'SA', tarih:'01.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'264', ad:'Kullanım hakkı varlığı', borc:800000, not:'{{FB01L}} → defter grubu **2L**' },
          { hesap:'438', ad:'Kiralama yükümlülüğü', alacak:800000 },
        ],
        not:'IFRS 16, operasyonel kiralamaları **bilançoya alır**. Yerel mevzuat almayabilir.\n\n' +
             'Bu kayıt {{FB01L}} ile **yalnızca 2L defterine** girildi. ' +
             'Lider defterde bu varlık ve yükümlülük **hiç yok** — kira gideri olarak izleniyor.\n\n' +
             '⚠️ Defter grubu **boş bırakılsaydı** bu kayıt yerel deftere de gidecek ve ' +
             'yerel bilanço bozulacaktı.' },

      { baslik:'Adım 4 — Makine 3. yıl sonunda satılır · lider defterdeki sonuç',
        belgeTuru:'AA', tarih:'31.12.2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banka (satış bedeli)', borc:900000 },
          { hesap:'257', ad:'Birikmiş amortisman (3 × 120.000)', borc:360000 },
          { hesap:'253', ad:'Tesis, makine ve cihazlar', alacak:1200000 },
          { hesap:'649', ad:'Duran varlık satış kârı', alacak:60000, not:'900.000 − 840.000' },
        ],
        not:'Lider defterde net defter değeri: 1.200.000 − 360.000 = **840.000 TL**. ' +
             '900.000’e satıldığı için **60.000 TL kâr**.' },

      { baslik:'Adım 4 (devamı) — aynı satış · **IFRS defterindeki sonuç**',
        belgeTuru:'AA', tarih:'31.12.2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banka (satış bedeli)', borc:900000 },
          { hesap:'257', ad:'Birikmiş amortisman (3 × 150.000)', borc:450000 },
          { hesap:'253', ad:'Tesis, makine ve cihazlar', alacak:1200000 },
          { hesap:'649', ad:'Duran varlık satış kârı', alacak:150000, not:'900.000 − 750.000' },
        ],
        not:'IFRS defterinde net defter değeri: 1.200.000 − 450.000 = **750.000 TL**. ' +
             'Aynı 900.000’e satıldığı için **150.000 TL kâr**.\n\n' +
             '**Aynı satış, iki defterde 90.000 TL farklı kâr.** ' +
             'Bu bir hata değil, iki standardın farklı değerleme yargısının ' +
             'kaçınılmaz sonucudur — ve paralel defterin var oluş sebebidir.' },
    ],

    tHesaplar:[
      { hesap:'Birikmiş amortisman — **Lider defter (0L)**', kod:'257 / 0L',
        borc:[{ ad:'Satışta kapatma', tutar:360000 }],
        alacak:[{ ad:'3 yıl × 120.000', tutar:360000 }],
        not:'10 yıl · yerel mevzuat' },
      { hesap:'Birikmiş amortisman — **IFRS defteri (2L)**', kod:'257 / 2L',
        borc:[{ ad:'Satışta kapatma', tutar:450000 }],
        alacak:[{ ad:'3 yıl × 150.000', tutar:450000 }],
        not:'8 yıl · IFRS — **aynı hesap, farklı defter, farklı tutar**' },
      { hesap:'Kullanım hakkı varlığı — yalnızca 2L', kod:'264 / 2L',
        borc:[{ ad:'IFRS 16 kiralama', tutar:800000 }],
        alacak:[],
        not:'Lider defterde bu hesap **hiç hareket görmez**' },
    ],

    notlar:[
      { tip:'tip', baslik:'Aynı hesap, farklı defter, farklı bakiye', metin:
        'Paralel defterin en çarpıcı sonucu şudur: **257 hesabının bakiyesi ' +
        'hangi defterde baktığınıza göre değişir.**\n\n' +
        'Lider defterde 360.000 TL, IFRS defterinde 450.000 TL. İkisi de doğrudur.\n\n' +
        'Bu, klasik muhasebe alışkanlığına aykırıdır: "bir hesabın bir bakiyesi olur" ' +
        'varsayımı artık geçerli değildir. {{FAGLB03}}’te **defter alanı boş bırakılırsa** ' +
        'lider defter gelir ve kullanıcı IFRS bakiyesini hiç görmez.\n\n' +
        '**Pratik sonuç:** paralel defterli bir sistemde her rapor sorgusunda ' +
        '"hangi defter?" sorusu sorulmalıdır. Rapor başlığında defter kodunun ' +
        'görünmesi iyi bir uygulamadır — aksi hâlde iki farklı rapor karıştırılır.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Paralel muhasebe için SAP’ta **iki yaklaşım** vardır ve seçim kurulumun başında yapılır. ' +
      'Ayrıca defterlerin kendi çeşitleri ve defter grubu kullanım biçimleri vardır.',

    liste:[
      { ad:'Paralel defter yaklaşımı', en:'Parallel Ledger Approach',
        aciklama:'Her standart için ayrı defter. Aynı hesap, farklı defterde farklı bakiye.',
        neZaman:'**Tercih edilen yaklaşım.** Standartlar arasında çok sayıda fark varsa.',
        ornek:'0L yerel, 2L IFRS. Hesap planı **tek**, defter sayısı çok.',
        tcodes:['FINSC_LEDGER','FB01L'] },

      { ad:'Paralel hesap yaklaşımı', en:'Parallel Accounts Approach',
        aciklama:'Tek defter, her standart için **ayrı hesap grupları**.',
        neZaman:'Az sayıda fark varsa; eski kurulumlarda yaygındır.',
        ornek:'Ortak hesaplar + yalnız-yerel hesaplar + yalnız-IFRS hesaplar. ' +
              '**Dezavantajı:** hesap planı şişer, mali tablo yapısı karmaşıklaşır.' },

      { ad:'{{lider-defter}} (0L)', en:'Leading Ledger',
        aciklama:'Sistemde **tek** olan, tüm şirket kodları için geçerli ana defter.',
        neZaman:'Her zaman vardır — kaldırılamaz.',
        ornek:'Şirket kodunun mali yıl varyantını ve para birimlerini kullanır; ' +
              '**CO ile entegre çalışan defterdir**.' },

      { ad:'Ek defter (non-leading)', en:'Non-Leading Ledger',
        aciklama:'İkinci ve sonraki standartlar için tanımlanan defterler.',
        neZaman:'IFRS, vergi defteri veya grup raporlaması gerektiğinde.',
        ornek:'2L, 3L… **Farklı mali yıl varyantı** kullanabilir (örneğin grup takvimi farklıysa).' },

      { ad:'{{defter-grubu}}', en:'Ledger Group',
        aciklama:'Bir kaydın hangi defter(ler)e gideceğini belirleyen isimlendirilmiş küme.',
        neZaman:'Defter bazlı kayıt girerken.',
        ornek:'Her defter için otomatik olarak kendi adında bir grup oluşur; ' +
              'birden çok defteri kapsayan özel gruplar da tanımlanabilir.' },

      { ad:'Boş defter grubu', en:'Blank Ledger Group',
        aciklama:'Kayıt **tüm defterlere** gider.',
        neZaman:'Günlük işlemlerin %95’inde — satış, alış, tahsilat, ödeme.',
        ornek:'**Varsayılan davranış budur** ve doğrudur: olgular tüm standartlarda aynıdır.' },

      { ad:'Defter bazlı belge', en:'Ledger-Specific Document',
        aciklama:'Yalnızca belirli bir deftere yazılan kayıt.',
        neZaman:'Standart farkı olan her kayıtta: amortisman farkı, karşılık farkı, IFRS 16.',
        ornek:'{{FB01L}} veya {{FB50L}} ile girilir; **ayrı belge türü** kullanmak iyi pratiktir.',
        tcodes:['FB01L','FB50L'] },

      { ad:'{{amortisman-alani}} ↔ defter bağlantısı', en:'Depreciation Area to Ledger',
        aciklama:'Her amortisman alanı bir defter grubuna bağlanır; alan o deftere yazar.',
        neZaman:'Duran varlık paralel muhasebesinde — **en yoğun kullanım alanı**.',
        ornek:'Alan 01 → 0L (yerel), alan 32 → 2L (IFRS). ' +
              'Tek {{AFAB}} çalıştırması her iki defteri de besler.',
        tcodes:['AFAB','OADB'] },
    ],

    karsilastirmaBasliklar:['Paralel defter', 'Paralel hesap'],
    karsilastirma:[
      ['Hesap planı', '**Tek** — sade kalır', 'Şişer — her standart için ayrı hesaplar'],
      ['Aynı hesabın bakiyesi', 'Deftere göre **değişir**', 'Hesap adı farklı olduğu için sabit'],
      ['Mali tablo yapısı', 'Defter başına aynı yapı', 'Standart başına **ayrı yapı** gerekir'],
      ['Yeni standart ekleme', 'Yeni defter tanımla', 'Onlarca yeni hesap aç'],
      ['Raporlama', 'Defter filtresiyle', 'Hesap grubu filtresiyle'],
      ['Duran varlık entegrasyonu', 'Alan ↔ defter, **temiz**', 'Alan ↔ hesap, karmaşık'],
      ['SAP önerisi', '**Tercih edilen**', 'Eski kurulumlarda'],
      ['Kullanıcı hatası riski', 'Defter grubu unutulur', 'Yanlış hesap seçilir'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FINSC_LEDGER', ad:'Defter tanımı — paralel muhasebenin merkezi',
        amac:'Lider ve ek defterleri, defter gruplarını, para birimlerini ve mali yıl varyantlarını tanımlar.',
        neZaman:'Kurulumda; yeni bir raporlama standardı eklendiğinde.',
        adimlar:[
          { baslik:'Defteri tanımla', aciklama:'Kod (2L) ve ad (IFRS Defteri). ' +
                   '**Lider defter yalnızca bir tane** olabilir ve genelde 0L’dir.' },
          { baslik:'Şirket kodlarına ata',
            aciklama:'Ek defter **seçili şirket kodlarında** açılabilir — ' +
                     'yalnızca IFRS raporlayan şirketler için tanımlanır.' },
          { baslik:'Mali yıl varyantını belirle',
            aciklama:'Ek defter **farklı bir varyant** kullanabilir; grup takvimi farklıysa gereklidir.' },
          { baslik:'Para birimlerini ayarla',
            aciklama:'S/4HANA’da sekize kadar. **Sonradan eklemek çok zordur** — baştan planla.' },
          { baslik:'Defter grubunu doğrula',
            aciklama:'Her defter için otomatik olarak aynı adda bir grup oluşur.' },
        ],
        ekranAkisi:[
          { ekran:'Defter listesi', islem:'0L (lider) · 2L (IFRS)' },
          { ekran:'2L ayarları', islem:'Şirket kodu 1000 · mali yıl varyantı K4' },
          { ekran:'Para birimleri', islem:'TRY (yerel) · EUR (grup)' },
          { ekran:'Defter grubu', islem:'2L otomatik oluştu' },
        ],
        alanlar:{
          zorunlu:['Defter kodu','Defter adı','Şirket kodu ataması','Mali yıl varyantı'],
          opsiyonel:['Ek para birimleri','Özel defter grupları'] },
        hatalar:[
          { mesaj:'Only one leading ledger is allowed', sebep:'İkinci bir defter lider olarak işaretlenmiş.', cozum:'Yalnızca 0L lider kalmalı; diğerleri ek defterdir.' },
          { mesaj:'Currency type ... cannot be added after postings exist', sebep:'Kayıt yapıldıktan sonra para birimi eklenmeye çalışılıyor.', cozum:'Para birimleri **baştan** planlanmalıdır; sonradan ekleme migrasyon gerektirir.' },
        ],
        ipucu:'**Para birimi kararı geri dönüşsüzdür.** Kayıt başladıktan sonra ' +
              'yeni bir paralel para birimi eklemek migrasyon projesi gerektirir. ' +
              'Grup para birimi ihtiyacı belirsizse bile **baştan tanımlamak** ' +
              'sonradan eklemekten çok daha ucuzdur.',
        ilgili:['FB01L','FAGLL03','T881'] },

      { kod:'FB01L', ad:'Belge kaydet — defter grubu ile',
        amac:'Yalnızca belirli bir deftere kayıt atar; standart farklarının girildiği ekran.',
        neZaman:'IFRS/yerel farkı olan her kayıtta: karşılık farkı, IFRS 16, değerleme farkı.',
        adimlar:[
          { baslik:'**Defter grubunu gir**',
            aciklama:'Bu alan {{FB01}}’de **yoktur** — {{FB01L}}’in tek farkı budur. ' +
                     '**Boş bırakılırsa kayıt tüm defterlere gider.**' },
          { baslik:'Belge türünü seç',
            aciklama:'Defter bazlı kayıtlar için **ayrı belge türü** tanımlamak iyi pratiktir; ' +
                     'raporda ayrışmayı kolaylaştırır.' },
          { baslik:'Kalemleri gir' },
          { baslik:'Kaydet ve doğrula',
            aciklama:'{{FAGLL03}} ile hem hedef defterde kaydın **olduğunu** hem ' +
                     'diğer defterde **olmadığını** kontrol et.' },
        ],
        alanlar:{
          zorunlu:['Defter grubu','Belge türü','Şirket kodu','Kalemler'],
          opsiyonel:['Referans','Metin'] },
        hatalar:[
          { mesaj:'Ledger group ... does not exist', sebep:'Grup tanımsız veya yanlış yazılmış.', cozum:'{{FINSC_LEDGER}}’de defter gruplarını kontrol et.' },
          { mesaj:'Kayıt istenmeyen deftere de gitti', sebep:'Defter grubu **boş bırakılmış**.', cozum:'Ters kaydet ve doğru grupla yeniden gir. En sık paralel defter hatasıdır.' },
        ],
        ipucu:'Kaydettikten sonra **iki kontrol** yap: hedef defterde kayıt var mı, ' +
              'diğer defterde yok mu? İkinci kontrol atlanırsa "tüm defterlere gitti" hatası ' +
              'aylarca fark edilmez ve yıl sonunda yerel mali tablo bozuk çıkar.',
        ilgili:['FB50L','FAGLL03','FINSC_LEDGER'] },

      { kod:'FB50L', ad:'G/L kaydı — defter grubu ile',
        amac:'{{FB50}}’nin defter grubu alanı eklenmiş hâli; hızlı G/L girişleri için.',
        neZaman:'Yalnızca G/L hesaplarını içeren defter bazlı düzeltmelerde.',
        adimlar:[
          { baslik:'Defter grubunu gir' },
          { baslik:'Hesap, borç/alacak satırlarını gir', aciklama:'Tek ekranda tablo formatında.' },
          { baslik:'Simüle et ve kaydet' },
        ],
        ipucu:'{{FB01L}} her hesap tipini destekler (satıcı, müşteri, G/L); ' +
              '{{FB50L}} yalnızca G/L içindir ama **daha hızlıdır**. ' +
              'Ay sonu IFRS düzeltmeleri genelde yalnızca G/L hesaplarını içerdiği için ' +
              'pratikte {{FB50L}} daha çok kullanılır.',
        ilgili:['FB01L','FB50','FAGLL03'] },

      { kod:'FAGLB03', ad:'Defter bazlı hesap bakiyesi',
        amac:'Aynı hesabın farklı defterlerdeki bakiyesini gösterir.',
        neZaman:'Standart farkını ölçerken; denetim taleplerinde; mutabakat kontrolünde.',
        adimlar:[
          { baslik:'Hesap, şirket kodu ve mali yılı gir' },
          { baslik:'**Defteri seç**', aciklama:'Boş bırakılırsa **lider defter** gelir. ' +
                   'IFRS bakiyesini görmek için 2L girilmelidir.' },
          { baslik:'İki defteri karşılaştır', aciklama:'Fark, standart farkının tutarıdır.' },
        ],
        ipucu:'Defter alanı boş bırakılınca lider defter gelmesi, **sessiz bir tuzaktır**: ' +
              'kullanıcı IFRS bakiyesini istediğini sanır, lider defter bakiyesini görür ve ' +
              'yanlış rapor hazırlar. Rapor çıktısında **defter kodunun görünmesini** sağla.',
        hatalar:[
          { mesaj:'Beklenen IFRS farkı görünmüyor', sebep:'Defter alanı boş → lider defter geldi.', cozum:'Defter alanına 2L gir ve yeniden çalıştır.' },
        ],
        ilgili:['FAGLL03','FS10N'] },

      { kod:'FAGLGVTR', ad:'Bakiye devri — her defter için',
        amac:'Bilanço hesaplarının bakiyelerini sonraki yıla devreder.',
        neZaman:'Yıl sonunda, **her defter için ayrı ayrı**.',
        adimlar:[
          { baslik:'Şirket kodu ve devir yılını gir' },
          { baslik:'**Defteri seç**', aciklama:'Her defter için ayrı çalıştırılmalıdır.' },
          { baslik:'Test modunda çalıştır, sonra gerçek mod' },
          { baslik:'Sonucu doğrula', aciklama:'{{FAGLB03}} ile açılış bakiyelerini her defterde kontrol et.' },
        ],
        ipucu:'**En sık unutulan adım:** lider defter için devir yapılır, ek defter unutulur. ' +
              'Sonuç: IFRS defterinde açılış bakiyeleri sıfır görünür ve ' +
              'yeni yılın ilk raporu tamamen yanlış çıkar.\n\n' +
              'İyi haber: {{FAGLGVTR}} **tekrar çalıştırılabilir** ve fark oluşmaz.',
        ilgili:['FAGLB03','closing'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Paralel defterin tablo mimarisi tek bir alana dayanır: **{{ACDOCA}} `RLDNR`**. ' +
      'Her satır hangi deftere ait olduğunu bu alanda taşır. ' +
      'Defter ayrımı için ayrı tablo yoktur — **aynı tablo, farklı satırlar**.',

    liste:[
      { ad:'ACDOCA', baslik:'Evrensel kayıt defteri — defter alanıyla',
        tutar:'Tüm FI/CO satırları; her satır `RLDNR` (defter) taşır.',
        olusturan:'Her FI/CO belgesi',
        guncelleyen:'Belge kaydı; defter grubu boşsa **her defter için ayrı satır** yazılır',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{T881}} ile defter tanımı; {{BKPF}} ile belge başlığı.',
        s4:'Paralel defterin **tek veri kaynağı**.',
        alanlar:[
          { ad:'RLDNR', aciklama:'**Defter kodu** — 0L lider, 2L IFRS. Anahtarın ilk alanı.', tip:'pk' },
          { ad:'RACCT', aciklama:'G/L hesabı — defterler arasında **aynı** hesap kullanılır' },
          { ad:'HSL', aciklama:'Yerel para birimi tutarı — defterlere göre **farklı olabilir**' },
          { ad:'BELNR', aciklama:'Belge numarası', tip:'fk' },
          { ad:'DOCLN', aciklama:'Satır numarası' },
        ] },

      { ad:'T881', baslik:'Defter tanımları',
        tutar:'Sistemdeki tüm defterler ve özellikleri.',
        olusturan:'{{FINSC_LEDGER}}',
        guncelleyen:'{{FINSC_LEDGER}}',
        anahtar:'RLDNR',
        iliskiler:'{{ACDOCA}} `RLDNR` bu tabloya bakar.',
        s4:'{{FINSC_LEDGER}} ile yönetilir.',
        alanlar:[
          { ad:'RLDNR', aciklama:'Defter kodu', tip:'pk' },
          { ad:'XLEADING', aciklama:'**Lider defter işareti** — sistemde yalnızca bir tane' },
        ] },

      { ad:'BKPF', baslik:'Belge başlığı',
        tutar:'Belge bilgisi; defter bazlı kayıtlarda defter grubu bilgisi de burada.',
        olusturan:'Belge kaydı',
        s4:'Duruyor.',
        alanlar:[
          { ad:'BELNR', aciklama:'Belge numarası', tip:'pk' },
          { ad:'BLART', aciklama:'Belge türü — defter bazlı kayıtlar için ayrı tür önerilir' },
        ] },

      { ad:'ANLB', baslik:'Duran varlık amortisman alanları',
        tutar:'Her varlığın amortisman alanı bazında ayarları — **alan ↔ defter köprüsü**.',
        olusturan:'{{AS01}} (varlık sınıfından türetilir)',
        guncelleyen:'{{AS02}}',
        anahtar:'BUKRS + ANLN1 + ANLN2 + AFABE',
        iliskiler:'Her alan bir defter grubuna bağlıdır; {{AFAB}} bu eşleşmeye göre yazar.',
        s4:'Duruyor.',
        alanlar:[
          { ad:'AFABE', aciklama:'**Amortisman alanı** — 01 yerel, 32 IFRS', tip:'pk' },
          { ad:'AFASL', aciklama:'Amortisman anahtarı — alana göre farklı olabilir' },
          { ad:'NDJAR', aciklama:'Faydalı ömür (yıl) — **alanlar arasında farklı**' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri',
        tutar:'Giriş görünümü. **Defter ayrımını taşımaz** — bu yüzden paralel defter analizinde kullanılmaz.',
        olusturan:'Belge kaydı',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'Defter mimarisi — RLDNR her şeyi ayırır',
      varliklar:[
        { ad:'T881', rol:'Özelleştirme', aciklama:'Defter tanımı',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'XLEADING' }] },
        { ad:'BKPF', rol:'FI', aciklama:'Belge başlığı',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'ACDOCA', rol:'Evrensel', hub:true, aciklama:'**Her satır bir deftere ait**',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }, { ad:'RACCT' }, { ad:'HSL' }] },
        { ad:'ANLB', rol:'Duran varlık', aciklama:'Amortisman alanı ayarları',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'AFABE', tip:'pk' }, { ad:'NDJAR' }] },
        { ad:'ANLA', rol:'Duran varlık', aciklama:'Varlık ana verisi',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'ANLN1', tip:'pk' }] },
        { ad:'BSEG', rol:'Giriş görünümü', aciklama:'Defter ayrımı **yok**',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }] },
      ],
      iliskiler:[
        { from:'T881', to:'ACDOCA', alanlar:'RLDNR', not:'**defter ayrımı**' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'başlık → kalem' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'giriş görünümü' },
        { from:'ANLA', to:'ANLB', alanlar:'ANLN1', not:'varlık → alanlar' },
        { from:'ANLB', to:'ACDOCA', alanlar:'AFABE → RLDNR', not:'**alan → defter**' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Paralel defterde kullanıcı ekranlarındaki tek fark **defter grubu alanıdır**. ' +
      'Ama o tek alan, doğru kullanılmazsa tüm mali tabloları bozabilir.',

    ekranlar:[
      { ad:'{{FINSC_LEDGER}} — defter tanımı',
        aciklama:'Defterlerin, gruplarının ve para birimlerinin tanımlandığı merkezi ekran.',
        alanlar:[
          { ad:'Defter kodu', zorunlu:true, aciklama:'2 karakter. 0L lider, 2L/3L ek defterler.' },
          { ad:'Lider defter işareti', zorunlu:true, aciklama:'**Yalnızca bir defterde** işaretli olabilir.' },
          { ad:'Şirket kodu ataması', zorunlu:true, aciklama:'Ek defter seçili şirket kodlarında açılabilir.' },
          { ad:'Mali yıl varyantı', zorunlu:true, aciklama:'Ek defter **farklı varyant** kullanabilir.' },
          { ad:'Para birimleri', zorunlu:false, aciklama:'S/4’te 8’e kadar. **Sonradan eklenemez** — baştan planla.' },
        ],
        ipucu:'Lider defter, **şirket kodunun** mali yıl varyantını kullanmak zorundadır ve ' +
              'CO ile entegre çalışan defterdir. Ek defterler bu kısıtlara tabi değildir — ' +
              'bu esneklik, grup takvimi farklı olan şirketler için tasarlanmıştır.' },

      { ad:'{{FB01L}} / {{FB50L}} — defter grubu alanı',
        aciklama:'Standart farklarının girildiği ekran; tek fark defter grubu alanıdır.',
        alanlar:[
          { ad:'Defter grubu', zorunlu:false, aciklama:'**Kritik alan.** Boş = tüm defterler. ' +
                   'Dolu = yalnızca o grup. Zorunlu değildir ve **tehlike buradadır**.' },
          { ad:'Belge türü', zorunlu:true, aciklama:'Defter bazlı kayıtlar için ayrı tür tanımla.' },
          { ad:'Kalemler', zorunlu:true },
        ],
        ipucu:'Defter grubu alanının **zorunlu olmaması** paralel defterin en büyük ' +
              'operasyonel riskidir: kullanıcı doldurmayı unutursa hata almaz, ' +
              'kayıt sessizce tüm defterlere gider.\n\n' +
              'Pratik çözüm: defter bazlı kayıtlar için ayrı belge türü tanımla ve ' +
              'o türün varsayılan defter grubunu ayarla; ayrıca ay sonunda ' +
              'o belge türündeki kayıtları gözden geçir.' },

      { ad:'{{FAGLB03}} / {{FAGLL03}} — defter seçimi',
        aciklama:'Raporlarda defter filtresi; paralel defterin görüldüğü yer.',
        alanlar:[
          { ad:'Defter', zorunlu:false, aciklama:'**Boş bırakılırsa lider defter gelir.** ' +
                   'IFRS raporu için 2L girilmelidir.' },
          { ad:'Hesap / şirket kodu', zorunlu:true },
          { ad:'Dönem', zorunlu:true },
        ],
        ipucu:'Rapor çıktısında **defter kodunun görünür olması** sağlanmalıdır. ' +
              'Aksi hâlde iki farklı defterden alınmış iki rapor birbirine karışır ve ' +
              '"aynı hesabın iki farklı bakiyesi" paniği yaşanır.' },
    ],

    zorunlu:['Defter kodu','Lider defter işareti','Şirket kodu ataması','Mali yıl varyantı','Belge türü'],
    opsiyonel:['Defter grubu (kayıtta)','Ek para birimleri','Özel defter grupları'],

    hatalar:[
      { mesaj:'Kayıt istenmeyen deftere de gitti', sebep:'Defter grubu **boş bırakılmış** → tüm defterlere yazıldı.', cozum:'Ters kaydet ({{FB08}}), doğru grupla yeniden gir. **En sık paralel defter hatasıdır** ve hata mesajı vermez.' },
      { mesaj:'Ledger group ... does not exist', sebep:'Grup tanımsız veya yanlış yazılmış.', cozum:'{{FINSC_LEDGER}}’de defter gruplarını kontrol et.' },
      { mesaj:'IFRS defterinde açılış bakiyeleri sıfır', sebep:'{{FAGLGVTR}} yalnızca lider defter için çalıştırılmış.', cozum:'Her defter için ayrı çalıştır. Tekrar çalıştırılabilir, fark oluşmaz.' },
      { mesaj:'Currency type cannot be added after postings exist', sebep:'Kayıt başladıktan sonra para birimi ekleniyor.', cozum:'Migrasyon gerekir. Para birimleri **baştan** planlanmalıdır.' },
      { mesaj:'Amortisman IFRS defterine yazılmıyor', sebep:'{{amortisman-alani}} defter grubuna bağlanmamış.', cozum:'{{OADB}} ile alan ↔ defter grubu eşleşmesini tanımla.' },
      { mesaj:'Only one leading ledger is allowed', sebep:'İkinci defter lider işaretlenmiş.', cozum:'Yalnızca 0L lider kalmalı.' },
    ],

    ipuclari:[
      '**Defter bazlı kayıtlar için ayrı belge türü tanımla.** Raporda ayrışır, ' +
      'kontrol edilebilir, "yanlışlıkla tüm defterlere gitti" hatası kolay yakalanır.',
      'Her defter bazlı kayıttan sonra **iki kontrol** yap: hedef defterde var mı, diğerinde yok mu?',
      '{{FAGLGVTR}} bakiye devrini **her defter için** çalıştır — en sık unutulan kapanış adımıdır.',
      'Para birimlerini **baştan** planla; sonradan eklemek migrasyon projesidir.',
      'Rapor çıktısında defter kodunun görünmesini sağla; iki rapor karışmasın.',
      'Duran varlıkta {{amortisman-alani}} ↔ defter eşleşmesini kurulumda test et — ' +
      'tek {{AFAB}} çalıştırmasının **her iki deftere de** yazdığını doğrula.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ACDOCA', ne:'Her satır `RLDNR` taşır; defter grubu boşsa **her defter için ayrı satır**' },
      { tablo:'BKPF', ne:'Belge başlığı — ortak' },
      { tablo:'BSEG', ne:'Giriş görünümü — **defter ayrımı yok**' },
      { tablo:'T881', ne:'Defter tanımları' },
      { tablo:'ANLB', ne:'Amortisman alanı ayarları — alan ↔ defter köprüsü' },
      { tablo:'FAGLFLEXA', ne:'ECC’de defter bazlı kalemler' },
    ],

    commit:
      'Defter grubu boş bırakılan bir kayıtta sistem **her defter için ayrı satır** yazar — ' +
      'ama **tek LUW’da**. Yani 2 defterli bir sistemde 3 satırlık bir belge ' +
      '{{ACDOCA}}’da 6 satır üretir ve hepsi aynı commit’te yazılır.\n\n' +
      'Bu, veri tutarlılığını garanti eder: bir defterde kayıt olup diğerinde olmaması ' +
      '**teknik olarak imkânsızdır**.\n\n' +
      'Belge numarası ortaktır; defterler arasında numara farkı **yoktur**. ' +
      'Bu, mutabakat ve izlenebilirlik için önemlidir: aynı belge numarası ' +
      'her defterde aranabilir.',

    belgeNo:
      'Defterler **aynı belge numarasını** paylaşır. Ayrı numara aralığı gerekmez.\n\n' +
      'Ancak defter bazlı kayıtlar ({{FB01L}}) için **ayrı belge türü** ve dolayısıyla ' +
      'ayrı aralık tanımlamak yaygın ve önerilen bir pratiktir: ' +
      'böylece "hangi kayıtlar defter bazlı girildi?" sorusu ' +
      'belge türü filtresiyle anında cevaplanır.',

    postingLogic:
      'Kayıt sırasında defter ataması şu sırayla belirlenir:\n\n' +
      '**1.** Defter grubu **dolu mu?** Doluysa yalnızca o gruptaki defterlere yazılır.\n' +
      '**2.** Defter grubu **boşsa** → şirket koduna atanmış **tüm defterlere** yazılır.\n' +
      '**3.** Duran varlık kayıtlarında ({{AFAB}}) her {{amortisman-alani}} ' +
      'kendi defter grubuna yazar — kullanıcı defter seçmez, eşleşme ana veriden gelir.\n' +
      '**4.** CO kaynaklı kayıtlar **yalnızca lider deftere** gider ' +
      '(CO tek bir standartla çalışır).\n\n' +
      '4. maddenin sonucu önemlidir: masraf yeri dağıtımları, iç sipariş kapatmaları ve ' +
      'diğer CO işlemleri IFRS defterinde **görünmez**. IFRS tarafında ihtiyaç varsa ' +
      'ayrıca defter bazlı kayıt girilmelidir.',

    belgeTuru:
      'Belge türü defteri belirlemez ama **iyi bir sınıflandırma aracıdır**. ' +
      'Defter bazlı kayıtlar için ayrı tür (örneğin `ZI` = IFRS düzeltme) tanımlanırsa:\n\n' +
      '**a)** Raporda kolayca süzülür.\n' +
      '**b)** Yetki bu türle sınırlanabilir.\n' +
      '**c)** Ay sonu kontrolünde "bu ay hangi IFRS düzeltmeleri yapıldı?" ' +
      'sorusu tek sorguyla cevaplanır.\n\n' +
      'Bu, zorunlu olmayan ama **danışmanlık kalitesini gösteren** bir tasarım tercihidir.',

    numberRange:
      'Defter başına ayrı aralık gerekmez. Defter bazlı belge türü tanımlanırsa ' +
      'onun aralığı {{FBN1}} ile açılır. ' +
      'Yılbaşında tüm aralıkların açılması normal kapanış rutininin parçasıdır.',

    accountDetermination:
      'Paralel defterin kendi hesap belirlemesi yoktur — **aynı hesaplar** kullanılır. ' +
      'Fark, hesaplarda değil **tutarlardadır**.\n\n' +
      'İstisna duran varlıktır: {{AO90}} ile amortisman alanı bazında ' +
      '**farklı hesaplar** tanımlanabilir. Ama bu genelde tercih edilmez — ' +
      'aynı hesabı kullanıp defterle ayırmak daha temizdir ve ' +
      'mali tablo yapısını tek tutar.',

    tur:
      '**Özelleştirme:** defter tanımları, defter grupları, mali yıl varyantı atamaları, ' +
      'amortisman alanı ↔ defter eşleşmeleri, belge türleri.\n\n' +
      '**Ana veri:** varlık ana verisindeki alan bazlı ayarlar ({{ANLB}} — faydalı ömür, ' +
      'amortisman anahtarı).\n\n' +
      '**Hareket verisi:** {{ACDOCA}} satırları (`RLDNR` ile ayrışmış).',

    transport:
      'Defter tanımları taşınır. **İki kritik uyarı:**\n\n' +
      '**1.** Şirket kodu atamaları hedef sistemde farklı olabilir — ' +
      'ek defter canlıda bazı şirket kodlarında **açılmamış** olabilir.\n\n' +
      '**2. Para birimi ayarları kayıt başladıktan sonra değiştirilemez.** ' +
      'Test sisteminde eklenen bir para birimi canlıda **eklenemeyebilir**. ' +
      'Bu, transport’un çözemediği bir kısıttır — planlama sorunudur.\n\n' +
      'Amortisman alanı ↔ defter eşleşmeleri de taşınır ama ' +
      'hedef sistemdeki varlık sınıfı ayarlarıyla tutarlı olması doğrulanmalıdır.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Defterler → Defter → Defterleri Tanımla', not:'{{FINSC_LEDGER}} → {{T881}}' },
      { yol:'SPRO → … → Defterler → Defter → Defter Gruplarını Tanımla', not:'{{defter-grubu}}' },
      { yol:'SPRO → … → Defterler → Mali Yıl ve Kayıt Dönemleri → Defter Başına Varyant Ata', not:'Ek defter farklı varyant kullanabilir' },
      { yol:'SPRO → Finansal Muhasebe → Duran Varlık Muhasebesi → Değerleme → Amortisman Alanları → Defter Gruplarını Amortisman Alanlarına Ata', not:'{{OADB}} — **AA ↔ paralel defter köprüsü**' },
    ],

    ekstra:[
      { ic:'🏭', baslik:'Duran varlık: paralel defterin en yoğun kullanım alanı', metin:
        'Paralel defterin gerçek hayattaki en büyük yükü **duran varlıklardadır** ve sebebi ' +
        'basittir: amortisman farkı **her ay ve her varlık için** tekrarlanır.\n\n' +
        'Bir karşılık farkı yılda bir kez girilir. Bir IFRS 16 kaydı sözleşme başına bir kez. ' +
        'Ama 2.000 varlığı olan bir şirkette amortisman farkı **her ay 2.000 kez** oluşur.\n\n' +
        'SAP bunu şık çözer: her {{amortisman-alani}} bir defter grubuna bağlanır ' +
        '({{OADB}}) ve **tek {{AFAB}} çalıştırması** her iki defteri de besler. ' +
        'Kullanıcı defter seçmez, iki kez çalıştırmaz.\n\n' +
        'Alan 01 → lider defter (yerel, 10 yıl), alan 32 → IFRS defteri (8 yıl). ' +
        'Varlık ana verisinde her alan için ayrı faydalı ömür ve amortisman anahtarı tanımlıdır.\n\n' +
        '**Kurulumda mutlaka test edilmesi gereken şey:** tek {{AFAB}} çalıştırmasının ' +
        'gerçekten her iki deftere de yazdığı. Eşleşme eksikse amortisman yalnızca ' +
        'lider deftere gider ve IFRS defteri **aylarca eksik kalır**.' },

      { ic:'⚠️', baslik:'CO yalnızca lider defterle çalışır', metin:
        'Kontrolör muhasebesi (CO) tek bir standartla çalışır ve o **lider defterdir**.\n\n' +
        'Pratik sonuçları:\n\n' +
        '**a)** Masraf yeri dağıtımları, iç sipariş kapatmaları, CO değer aktarımları ' +
        'IFRS defterinde **görünmez**.\n\n' +
        '**b)** IFRS tarafında maliyet muhasebesi farkı gerekiyorsa ' +
        'defter bazlı kayıt ({{FB50L}}) ile elle girilmelidir.\n\n' +
        '**c)** Kârlılık analizi (CO-PA) lider defter mantığıyla çalışır; ' +
        'IFRS kârlılığı ayrıca hesaplanmalıdır.\n\n' +
        'Bu, paralel defterin **bilinen ve kabul edilen sınırıdır**. ' +
        'Çoğu şirkette maliyet muhasebesi farkları önemsiz olduğu için sorun yaratmaz — ' +
        'ama IFRS ile yerel maliyetleme kuralları ciddi farklıysa ' +
        'bu, projede baştan konuşulması gereken bir konudur.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Bakiye devri her defter için ayrı yapılır', metin:
        '{{FAGLGVTR}} yalnızca çalıştırıldığı defter için devir yapar. ' +
        'Lider defter için çalıştırılıp ek defter unutulursa, ' +
        'IFRS defterinde **açılış bakiyeleri sıfır** görünür.\n\n' +
        'Sonuç: yeni yılın ilk IFRS raporu tamamen yanlış çıkar ve ' +
        'genelde "IFRS bilançosu neden bu kadar küçük?" sorusuyla fark edilir.\n\n' +
        'İyi haber: {{FAGLGVTR}} **tekrar çalıştırılabilir**; fark oluşmaz, ' +
        'yalnızca eksik devir tamamlanır. Bu yüzden yıl başında ' +
        'her defter için çalıştırmayı kapanış listesine koymak yeterlidir.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Paralel defter mantığı S/4HANA’da **değişmedi** ama uygulaması kolaylaştı: ' +
      '{{FINSC_LEDGER}} tek yönetim noktası oldu, ' +
      'defter ayrımı {{ACDOCA}}’nın anahtar alanına taşındı ve ' +
      'paralel para birimi desteği 3’ten **8’e** çıktı.',

    eccFarklari:[
      { konu:'Defter tanımı', ecc:'Birden çok ayrı işlem', s4:'**{{FINSC_LEDGER}}** — tek nokta' },
      { konu:'Defter verisi', ecc:'{{FAGLFLEXA}} `RLDNR`', s4:'**{{ACDOCA}}** `RLDNR` — anahtarın ilk alanı' },
      { konu:'Paralel para birimi', ecc:'3 para birimi', s4:'**8’e kadar**' },
      { konu:'Defter bazlı kayıt', ecc:'{{FB01L}}', s4:'Aynı + Fiori' },
      { konu:'Duran varlık entegrasyonu', ecc:'Alan ↔ defter grubu', s4:'**Aynı**, ama alan sayısı sınırı gevşedi' },
      { konu:'Genişletilmiş defter', ecc:'Yok', s4:'**Extension Ledger** — yalnızca farkları tutan hafif defter' },
    ],

    universalJournal:
      '{{ACDOCA}}’da `RLDNR` **anahtarın ilk alanıdır**. Bu bir tasarım tercihidir ve ' +
      'sonucu şudur: defter bazlı sorgular son derece hızlıdır, ' +
      'çünkü veri fiziksel olarak deftere göre ayrışır.\n\n' +
      'ECC’de defter ayrımı {{FAGLFLEXA}}’da vardı ama CO verisi ayrı tablodaydı. ' +
      'S/4HANA’da FI ve CO aynı tabloda olduğu için **defter boyutu CO verisini de kapsar** — ' +
      'ancak CO kayıtları hâlâ yalnızca lider deftere yazılır ' +
      '(bu mantıksal bir kısıttır, teknik değil).',

    kalkanTcodes:[
      { eski:'ECC defter tanım işlemleri', yeni:'{{FINSC_LEDGER}}', not:'Tek yönetim noktası' },
      { eski:'—', yeni:'—', not:'{{FB01L}}, {{FB50L}}, {{FAGLL03}}, {{FAGLB03}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Manage Ledgers', aciklama:'Defter tanımlarını görüntüler ve yönetir.' },
      { ad:'Post General Journal Entries', aciklama:'{{FB50L}} yerine; defter grubu alanı içerir.' },
      { ad:'Display Line Items in General Ledger', aciklama:'Defter filtreli kalem raporu.' },
      { ad:'Trial Balance', aciklama:'Defter bazlı mizan — iki standart yan yana karşılaştırılabilir.' },
      { ad:'Asset Accounting Overview', aciklama:'Amortisman alanı ↔ defter eşleşmesini görsel gösterir.' },
    ],

    compatibilityViews:[
      '{{FAGLFLEXA}} — {{ACDOCA}}’dan türetilen görünüm.',
      '{{BSEG}} — defter ayrımı **taşımaz**; paralel defter analizinde kullanılamaz.',
      'Defter bazlı raporlar {{ACDOCA}}’yı doğrudan okumalıdır.',
    ],

    performans:
      'Defter bazlı sorgular {{ACDOCA}}’nın anahtar yapısı sayesinde çok hızlıdır. ' +
      'Asıl kazanç ise iki defteri **yan yana** raporlayabilmektir: ' +
      'ECC’de iki ayrı rapor alınıp Excel’de karşılaştırılırdı; ' +
      'S/4HANA’da tek sorguda iki defter sütun olarak gelir ve fark anında görünür.',

    bestPractices:[
      '**Extension Ledger’ı değerlendir:** yalnızca farkları tutan hafif defter, ' +
      'tam bir ek defterden daha az veri üretir ve simülasyon senaryoları için idealdir.',
      'Para birimlerini geçişte yeniden planla — S/4 sekize kadar destekler ve ' +
      '**bu, sonradan değiştirilemeyen bir karardır**.',
      'Defter bazlı kayıtlar için ayrı belge türü tanımla; Fiori’de filtreleme kolaylaşır.',
      'Duran varlıkta alan ↔ defter eşleşmesini geçişte **test et**; ' +
      'tek {{AFAB}}’ın her iki deftere yazdığını doğrula.',
      'CO’nun yalnızca lider defterle çalıştığını projede baştan netleştir; ' +
      'IFRS maliyet farkı gerekiyorsa manuel süreç tasarla.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'IFRS defteri altı ay eksik kaldı: tek bir eşleşme unutuldu',
    hikaye:
      '**Batı Sanayi A.Ş.** 2027 başında IFRS raporlamaya geçti. ' +
      'IFRS defteri (2L) tanımlandı, açılış bakiyeleri girildi, ekip eğitildi.\n\n' +
      'Temmuz ayında ilk IFRS ara raporu hazırlanıyor ve mali işler müdürü ' +
      'bir tuhaflık fark ediyor: **IFRS defterinde amortisman gideri sıfır**. ' +
      'Oysa şirketin 1.850 duran varlığı var ve lider defterde altı aylık ' +
      '4.200.000 TL amortisman kaydedilmiş.\n\n' +
      'Bu senaryo, paralel defterin en sinsi kurulum hatasını ve ' +
      'düzeltmenin neden düşünüldüğü kadar basit olmadığını gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · TRY' },
      { k:'Defterler', v:'**0L** lider (yerel) · **2L** IFRS' },
      { k:'Varlık sayısı', v:'1.850' },
      { k:'Lider defter amortismanı (6 ay)', v:'4.200.000 TL' },
      { k:'**IFRS defteri amortismanı**', v:'**0 TL**' },
      { k:'Beklenen IFRS amortismanı', v:'~5.100.000 TL (daha kısa ömürler)' },
    ],

    adimlar:[
      { baslik:'Sorun doğrulanır — gerçekten sıfır mı?', tcode:'FAGLB03',
        aciklama:'Önce raporun doğru okunduğundan emin olunuyor. ' +
                 '(Defter alanı boş bırakılmışsa lider defter gelir ve yanlış alarm verilir.)',
        girdi:[
          { alan:'Hesap', deger:'770100 Amortisman gideri' },
          { alan:'Defter **0L**', deger:'4.200.000 TL ✓' },
          { alan:'Defter **2L**', deger:'**0 TL** ✕' },
          { alan:'Kontrol', deger:'Defter alanı bilinçli olarak 2L girildi — okuma hatası **yok**' },
        ],
        not:'İlk adım her zaman budur: **rapor doğru mu okunuyor?** ' +
             '{{FAGLB03}}’te defter alanı boş bırakılırsa lider defter gelir ve ' +
             'kullanıcı IFRS bakiyesini gördüğünü sanır. Burada o tuzağa düşülmedi.' },

      { baslik:'IFRS defterinde başka kayıt var mı?', tcode:'FAGLL03',
        aciklama:'Defterin tamamen mi boş olduğu yoksa yalnızca amortismanın mı eksik olduğu kontrol ediliyor.',
        girdi:[
          { alan:'Defter 2L — satış/alış kayıtları', deger:'**Var** ✓ — 6 aylık tüm faturalar' },
          { alan:'Defter 2L — açılış bakiyeleri', deger:'**Var** ✓' },
          { alan:'Defter 2L — amortisman', deger:'**Yok** ✕' },
          { alan:'Çıkarım', deger:'Defter çalışıyor; sorun **yalnızca duran varlık tarafında**' },
        ],
        not:'Bu ayrım teşhisi daraltıyor: defter tanımı doğru, kayıtlar akıyor, ' +
             'defter grubu boş bırakılan normal işlemler her iki deftere de gidiyor.\n\n' +
             'Eksik olan **yalnızca {{AFAB}} kaynaklı kayıtlar** — ' +
             'yani sorun {{amortisman-alani}} ↔ defter eşleşmesindedir.' },

      { baslik:'Amortisman alanları incelenir', tcode:'OADB',
        aciklama:'Alan ↔ defter grubu eşleşmesi kontrol ediliyor.',
        girdi:[
          { alan:'Alan **01** (yerel)', deger:'Defter grubu **0L** ✓' },
          { alan:'Alan **32** (IFRS)', deger:'Defter grubu **BOŞ** ✕' },
          { alan:'Alan 32 durumu', deger:'Tanımlı, varlıklarda mevcut, değerleri hesaplanıyor' },
          { alan:'**Kök sebep**', deger:'Alan 32 hiçbir deftere **bağlanmamış**' },
        ],
        not:'**Kök sebep bulundu.** Alan 32 kurulumda tanımlanmış, varlık sınıflarına eklenmiş, ' +
             'değerleri (daha kısa faydalı ömürlerle) düzgün hesaplanıyor — ' +
             'ama **hiçbir deftere yazmıyor**.\n\n' +
             'Bu, paralel defter kurulumunun en sinsi hatasıdır: her şey doğru görünür, ' +
             '{{AS03}}’te alan 32 değerleri görünür, {{AW01N}}’de amortisman planı doğrudur — ' +
             'ama muhasebeye hiç düşmez.' },

      { baslik:'Eksik eşleşme tanımlanır', tcode:'OADB',
        aciklama:'Alan 32, IFRS defter grubuna bağlanıyor.',
        girdi:[
          { alan:'Alan 32', deger:'Defter grubu → **2L**' },
          { alan:'Test', deger:'Bir varlık için {{AFAB}} test modunda çalıştırıldı' },
          { alan:'Sonuç', deger:'Alan 01 → 0L, alan 32 → **2L** ✓' },
        ],
        not:'Yapılandırma düzeltmesi **iki dakika** sürdü. ' +
             'Ama asıl iş şimdi başlıyor: geçmiş altı ay ne olacak?' },

      { baslik:'Geriye dönük düzeltme — üç seçenek değerlendirilir', tcode:'AFAB',
        aciklama:'Altı aylık eksik amortismanın nasıl tamamlanacağına karar veriliyor.',
        girdi:[
          { alan:'Seçenek 1', deger:'{{AFAB}}’ı Ocak’tan itibaren **tekrarlama modunda** çalıştır' },
          { alan:'Seçenek 2', deger:'Temmuz’da **toplu yakalama** (catch-up) kaydı at' },
          { alan:'Seçenek 3', deger:'Her ay için ayrı ayrı {{FB50L}} ile elle gir' },
          { alan:'**Seçilen**', deger:'**Seçenek 1** — dönemler açık, {{AFAB}} tekrarlanabilir' },
        ],
        not:'Ocak–Haziran dönemleri IFRS defteri için hâlâ **açıktı** ' +
             '(yalnızca lider defter kapatılmıştı). Bu, şansa değil ' +
             '{{OB52}}’de defter bazlı dönem kontrolü yapılabildiği için mümkün oldu.\n\n' +
             'Dönemler kapalı olsaydı Seçenek 2 seçilecek ve altı aylık amortisman ' +
             'tek bir Temmuz kaydına sıkışacaktı — teknik olarak doğru ama ' +
             'aylık IFRS gelir tablosu **tamamen bozuk** görünecekti.' },

      { baslik:'Amortisman geriye dönük çalıştırılır', tcode:'AFAB',
        aciklama:'Ocak’tan Haziran’a kadar her dönem için tekrar çalıştırılıyor.',
        girdi:[
          { alan:'Dönemler', deger:'01–06 / 2027 · defter 2L' },
          { alan:'Mod', deger:'Tekrarlama (repeat) · **önce test modunda**' },
          { alan:'Etkilenen varlık', deger:'1.850' },
          { alan:'Toplam kayıt', deger:'**5.130.000 TL**' },
        ],
        fis:{ baslik:'Ocak 2027 amortismanı — IFRS defteri (2L)', belgeTuru:'AF', tarih:'31.01.2027',
          satirlar:[
            { hesap:'770', ad:'Amortisman gideri', borc:855000, not:'Alan 32 → defter **2L**' },
            { hesap:'257', ad:'Birikmiş amortisman', alacak:855000 },
          ], not:'Kayıt tarihi **Ocak** — Temmuz değil. Her ay kendi dönemine yazıldı, ' +
                 'böylece aylık IFRS gelir tablosu doğru oldu.\n\n' +
                 'Aynı ay lider defterde 700.000 TL kaydedilmişti; ' +
                 'IFRS’te 855.000 TL — fark **155.000 TL/ay**, kısa faydalı ömürlerden.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'6 dönem × 1.850 varlık için `RLDNR` = **2L** satırları' },
          { tablo:'ANLC', ne:'Alan 32 birikmiş amortisman değerleri güncellendi' },
        ],
        not:'Toplam **5.130.000 TL**, beklenen ~5.100.000 TL ile uyumlu. ' +
             'Lider defterle fark: 5.130.000 − 4.200.000 = **930.000 TL** — ' +
             'altı aylık IFRS/yerel amortisman farkı.' },

      { baslik:'Doğrulama — iki defter karşılaştırılır', tcode:'FAGLB03',
        aciklama:'Düzeltmenin doğru çalıştığı kontrol ediliyor.',
        girdi:[
          { alan:'770100 · defter **0L**', deger:'4.200.000 TL' },
          { alan:'770100 · defter **2L**', deger:'**5.130.000 TL** ✓' },
          { alan:'Fark', deger:'930.000 TL — gerekçelendirilmiş' },
          { alan:'257 birikmiş amortisman', deger:'0L: 4.200.000 · 2L: 5.130.000 ✓' },
        ],
        not:'Aynı hesap, iki defterde iki farklı bakiye — **ve ikisi de doğru**. ' +
             'Fark, faydalı ömür farkının kaçınılmaz sonucu ve ' +
             'denetime **açıklanabilir** durumda.' },

      { baslik:'Önlem — kurulum kontrol listesi güncellenir', tcode:'OADB',
        aciklama:'Aynı hatanın tekrarlanmaması için kalıcı önlem alınıyor.',
        girdi:[
          { alan:'Önlem 1', deger:'Her yeni amortisman alanı için **defter grubu ataması zorunlu adım**' },
          { alan:'Önlem 2', deger:'Kurulum testi: tek {{AFAB}} çalıştırıp **her iki defteri de** kontrol et' },
          { alan:'Önlem 3', deger:'Aylık kapanışa "IFRS defteri amortismanı sıfır mı?" kontrolü eklendi' },
          { alan:'Önlem 4', deger:'{{FAGLGVTR}} bakiye devri **her defter için** kapanış listesine eklendi' },
        ],
        not:'Dördüncü önlem, henüz yaşanmamış ama **aynı sınıftan** bir hatayı önlüyor: ' +
             'bakiye devri lider defter için yapılıp ek defter unutulursa, ' +
             'yeni yılın IFRS açılış bakiyeleri sıfır çıkar. ' +
             'Aynı kök nedene sahip iki hata, tek kontrol listesiyle kapatıldı.' },
    ],

    sonuc:
      '**Altı ay boyunca IFRS defterinde amortisman yoktu** — ve hiçbir hata mesajı çıkmadı.\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Amortisman alanı ↔ defter eşleşmesi paralel defterin en kritik ve en sessiz ayarıdır.** ' +
      'Alan tanımlıysa, varlıklarda görünüyorsa ve değerleri doğru hesaplanıyorsa her şey ' +
      'doğru sanılır. Ama defter grubu atanmamışsa **muhasebeye hiç düşmez**. ' +
      'Kurulum testinde tek {{AFAB}} çalıştırılıp **her iki defterin de** kontrol edilmesi zorunludur.\n\n' +
      '**2. Rapor okumadan önce defter alanını doğrula.** ' +
      '{{FAGLB03}} ve {{FAGLL03}}’te defter boş bırakılırsa **lider defter** gelir. ' +
      'Bu, hem yanlış alarm hem de gerçek sorunun gözden kaçması anlamına gelebilir. ' +
      'Paralel defterli bir sistemde her rapor sorgusunun ilk sorusu "hangi defter?" olmalıdır.\n\n' +
      '**3. Dönemleri defter bazlı yönetmek düzeltme esnekliği verir.** ' +
      'Bu senaryoda lider defter kapatılmış ama IFRS defteri açık kaldığı için ' +
      '{{AFAB}} geriye dönük tekrarlanabildi ve her ay **kendi dönemine** yazıldı. ' +
      'Dönemler kapalı olsaydı altı aylık amortisman tek bir aya sıkışacak, ' +
      'aylık IFRS gelir tablosu kullanılamaz hâle gelecekti.\n\n' +
      '**4. Aynı hesabın iki defterde iki bakiyesi olması normaldir.** ' +
      '770100 hesabı lider defterde 4.200.000, IFRS defterinde 5.130.000 TL — ' +
      'ikisi de doğru. Klasik "bir hesabın bir bakiyesi olur" alışkanlığı ' +
      'paralel defterli sistemde geçerli değildir ve ' +
      'bu, ekibe **kurulumda öğretilmesi gereken** ilk şeydir.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'Paralel defter, **aynı işlemi birden çok muhasebe standardına göre** kaydetme yöntemidir.',
      '**{{lider-defter}} (0L)** sistemde tektir, tüm şirket kodlarında geçerlidir ve **CO ile entegre** çalışır.',
      '**Defter grubu boş** bırakılırsa kayıt **tüm defterlere** gider — en temel davranış.',
      'Standart farkı olan kayıtlar {{FB01L}} / {{FB50L}} ile **tek deftere** girilir.',
      'İlke: **olguyu tüm defterlere yaz, değerleme yargısını defter bazlı yaz.**',
      'Duran varlıkta her {{amortisman-alani}} bir deftere bağlanır; **tek {{AFAB}}** ikisini de besler.',
      'Aynı hesabın **deftere göre farklı bakiyesi** olur — ikisi de doğrudur.',
      '{{FAGLGVTR}} bakiye devri **her defter için ayrı** çalıştırılmalıdır.',
    ],

    onemliNoktalar:[
      '**"Defter grubu boş bırakılırsa ne olur?"** Kayıt **tüm defterlere** gider. "Hiçbiri" veya "yalnızca lider" değil. Paralel defterin en temel davranışıdır ve yanlış bilinirse tüm mimari yanlış kurulur.',
      '**"Lider defterin özellikleri nelerdir?"** Sistemde **tektir**, tüm şirket kodları için geçerlidir, **şirket kodunun** mali yıl varyantını kullanır ve **CO ile entegre** çalışan defterdir. Ek defterler bu kısıtlara tabi değildir.',
      '**"Duran varlıkta paralel defter nasıl çalışır?"** Her {{amortisman-alani}} bir defter grubuna bağlanır ({{OADB}}). Tek {{AFAB}} çalıştırması her iki defteri de besler — kullanıcı defter seçmez.',
      '**"CO hangi defterle çalışır?"** **Yalnızca lider defterle.** Masraf yeri dağıtımları, iç sipariş kapatmaları IFRS defterinde görünmez; gerekiyorsa elle defter bazlı kayıt girilir.',
      '**"Paralel defter mi, paralel hesap mı?"** Paralel defter tercih edilir: hesap planı **tek** kalır, mali tablo yapısı sade olur, yeni standart eklemek yalnızca yeni defter tanımlamaktır.',
      '**"Aynı hesabın iki farklı bakiyesi olabilir mi?"** **Evet ve normaldir.** 257 hesabı lider defterde 360.000, IFRS defterinde 450.000 olabilir. Rapor sorgusunda defter belirtilmezse **lider defter** gelir.',
      '**"Paralel para birimi sonradan eklenebilir mi?"** **Hayır** — kayıt başladıktan sonra migrasyon gerektirir. S/4HANA 8’e kadar destekler; ihtiyaç belirsiz olsa bile **baştan tanımlamak** doğrudur.',
      '**"Bakiye devri nasıl yapılır?"** {{FAGLGVTR}} **her defter için ayrı** çalıştırılır. Unutulursa o defterde açılış bakiyeleri sıfır çıkar. Tekrar çalıştırılabilir, fark oluşmaz.',
    ],

    sikHatalar:[
      { hata:'Defter bazlı kaydı defter grubunu boş bırakarak girmek.', dogru:'Kayıt tüm defterlere gider ve yerel mali tablo bozulur. **Hata mesajı çıkmaz** — bu yüzden en tehlikeli hatadır.' },
      { hata:'{{amortisman-alani}}’nı defter grubuna bağlamayı unutmak.', dogru:'Alan değerleri hesaplanır ama muhasebeye hiç düşmez. Kurulumda tek {{AFAB}} çalıştırıp her iki defter kontrol edilmelidir.' },
      { hata:'{{FAGLGVTR}} bakiye devrini yalnızca lider defter için çalıştırmak.', dogru:'Her defter için ayrı çalıştırılır; unutulursa ek defterde açılış bakiyeleri sıfır çıkar.' },
      { hata:'Raporda defter alanını boş bırakıp IFRS bakiyesi gördüğünü sanmak.', dogru:'Boş bırakılırsa **lider defter** gelir. Rapor çıktısında defter kodu görünür olmalıdır.' },
      { hata:'Paralel para birimini sonradan eklemeye çalışmak.', dogru:'Kayıt başladıktan sonra eklenemez; migrasyon gerekir. Baştan planlanmalıdır.' },
      { hata:'CO işlemlerinin IFRS defterine yansıyacağını varsaymak.', dogru:'CO yalnızca lider defterle çalışır. IFRS farkı gerekiyorsa {{FB50L}} ile elle girilir.' },
      { hata:'Her standart için ayrı varlık kaydı açmak.', dogru:'Tek varlık, birden çok amortisman alanı kullanılır. İki varlık envanteri bozar.' },
      { hata:'Defter bazlı kayıtlar için ayrı belge türü tanımlamamak.', dogru:'Ayrı tür raporda ayrışmayı, kontrolü ve yetkilendirmeyi kolaylaştırır.' },
    ],

    ipuclari:[
      'Defter bazlı her kayıttan sonra **iki kontrol**: hedef defterde var mı, diğerinde yok mu?',
      'Defter bazlı kayıtlar için ayrı belge türü (örneğin `ZI` = IFRS düzeltme) tanımla.',
      'Rapor çıktısında **defter kodunun görünmesini** sağla; iki rapor karışmasın.',
      'Kurulum testinde tek {{AFAB}} çalıştırıp **her iki defterin de** yazıldığını doğrula.',
      'Para birimlerini baştan planla; sonradan eklemek migrasyon projesidir.',
      'Kapanış listesine "{{FAGLGVTR}} her defter için" ve ' +
      '"ek defterde amortisman sıfır mı?" kontrollerini ekle.',
    ],

    quiz:[
      { soru:'Kayıt ekranında defter grubu alanı boş bırakılırsa ne olur?',
        secenekler:[
          'Kayıt hiçbir deftere gitmez',
          'Yalnızca lider deftere gider',
          '**Tüm defterlere gider**',
          'Sistem hata verir',
        ], dogru:2,
        aciklama:'Paralel defterin **en temel davranışıdır**. Günlük işlemlerin çoğu tüm ' +
                 'standartlarda aynı olduğu için bu tasarım doğrudur. ' +
                 'Ama tersi hata pahalıdır: IFRS farkı olan bir kaydı defter grubu belirtmeden ' +
                 'girmek, farkı yerel deftere de yazar ve **hata mesajı çıkmaz**.' },

      { soru:'Duran varlıkta paralel defter nasıl çalışır?',
        secenekler:[
          'Her standart için ayrı varlık kaydı açılır',
          '**Her amortisman alanı bir defter grubuna bağlanır; tek {{AFAB}} her iki defteri de besler**',
          '{{AFAB}} her defter için ayrı çalıştırılır',
          'Amortisman farkı elle girilir',
        ], dogru:1,
        aciklama:'Alan 01 → lider defter (yerel, 10 yıl), alan 32 → IFRS defteri (8 yıl). ' +
                 'Eşleşme {{OADB}} ile tanımlanır ve varlık ana verisinden gelir. ' +
                 'Kullanıcı defter seçmez, {{AFAB}}’ı iki kez çalıştırmaz.' },

      { soru:'Lider defterin ayırt edici özelliği nedir?',
        secenekler:[
          'En çok kayıt alan defterdir',
          'İlk tanımlanan defterdir',
          '**Sistemde tektir, tüm şirket kodlarında geçerlidir ve CO ile entegre çalışır**',
          'Yalnızca IFRS için kullanılır',
        ], dogru:2,
        aciklama:'{{lider-defter}} (0L) sistemde **yalnızca bir tane** olabilir, ' +
                 'şirket kodunun mali yıl varyantını kullanmak zorundadır ve ' +
                 '**CO’nun çalıştığı defterdir**. Ek defterler bu kısıtlara tabi değildir — ' +
                 'farklı mali yıl varyantı bile kullanabilirler.' },

      { soru:'IFRS defterinde amortisman hiç görünmüyor. En olası sebep?',
        secenekler:[
          'IFRS defteri tanımlanmamış',
          '{{AFAB}} çalıştırılmamış',
          '**Amortisman alanı bir defter grubuna bağlanmamış**',
          'Dönem kapalı',
        ], dogru:2,
        aciklama:'Bu, paralel defter kurulumunun **en sinsi hatasıdır**: alan tanımlıdır, ' +
                 'varlıklarda görünür, değerleri doğru hesaplanır — ama defter grubu ' +
                 'atanmadığı için **muhasebeye hiç düşmez**. ' +
                 '{{OADB}} ile eşleşme tanımlanmalıdır.' },

      { soru:'{{FAGLB03}}’te defter alanı boş bırakılırsa hangi defter gelir?',
        secenekler:[
          'Tüm defterlerin toplamı',
          '**Lider defter**',
          'Son kullanılan defter',
          'Rapor hata verir',
        ], dogru:1,
        aciklama:'Boş defter alanı **lider defteri** getirir. Bu sessiz bir tuzaktır: ' +
                 'kullanıcı IFRS bakiyesini istediğini sanır, lider defter bakiyesini görür ve ' +
                 'yanlış rapor hazırlar. Rapor çıktısında **defter kodu görünür olmalıdır**.' },

      { soru:'CO işlemleri (masraf yeri dağıtımı, iç sipariş kapatma) hangi deftere yazılır?',
        secenekler:[
          'Tüm defterlere',
          '**Yalnızca lider deftere**',
          'Yalnızca ek defterlere',
          'Kullanıcının seçtiği deftere',
        ], dogru:1,
        aciklama:'CO tek bir standartla çalışır ve o **lider defterdir**. ' +
                 'Bu, paralel defterin bilinen ve kabul edilen sınırıdır. ' +
                 'IFRS tarafında maliyet farkı gerekiyorsa {{FB50L}} ile elle girilmelidir — ' +
                 'projede baştan konuşulması gereken bir konudur.' },

      { soru:'Paralel defter ile paralel hesap yaklaşımı arasındaki temel fark?',
        secenekler:[
          'Paralel hesap daha hızlıdır',
          '**Paralel defterde hesap planı tek kalır; paralel hesapta her standart için ayrı hesaplar açılır**',
          'Paralel defter yalnızca S/4HANA’da çalışır',
          'Fark yoktur',
        ], dogru:1,
        aciklama:'Paralel defterde **aynı hesap** farklı defterlerde farklı bakiye taşır; ' +
                 'hesap planı sade kalır ve mali tablo yapısı tektir. ' +
                 'Paralel hesapta hesap planı şişer ve her standart için ayrı ' +
                 'mali tablo yapısı gerekir. SAP paralel defteri **tercih eder**.' },

      { soru:'Yeni yılın ilk IFRS raporunda açılış bakiyeleri sıfır çıktı. Sebep?',
        secenekler:[
          'IFRS defteri silinmiş',
          'Dönem kapalı',
          '**{{FAGLGVTR}} bakiye devri yalnızca lider defter için çalıştırılmış**',
          'Para birimi hatası',
        ], dogru:2,
        aciklama:'{{FAGLGVTR}} yalnızca çalıştırıldığı defter için devir yapar. ' +
                 '**En sık unutulan kapanış adımıdır.** ' +
                 'İyi haber: tekrar çalıştırılabilir ve fark oluşmaz — ' +
                 'her defter için çalıştırmak kapanış listesine eklenmelidir.' },
    ],

    flashcards:[
      { on:'Paralel defter nedir?', arka:'**Aynı işlemi birden çok muhasebe standardına göre kaydetme.**\n\n0L lider defter (yerel)\n2L/3L ek defterler (IFRS, vergi)\n\nVeri çoğaltılmaz — **fark kaydedilir**.' },
      { on:'Defter grubu boş bırakılırsa?', arka:'Kayıt **TÜM DEFTERLERE** gider.\n\n"Hiçbiri" veya "yalnızca lider" **değil**.\n\n⚠️ IFRS farkı olan kaydı defter grubu belirtmeden girmek, farkı yerel deftere de yazar — **hata mesajı çıkmaz**.' },
      { on:'Lider defterin özellikleri?', arka:'• Sistemde **tek** (kod 0L)\n• **Tüm** şirket kodlarında geçerli\n• **Şirket kodunun** mali yıl varyantını kullanır\n• **CO ile entegre** çalışan defterdir\n\nEk defterler bu kısıtlara tabi değildir.' },
      { on:'Paralel defterin temel ilkesi?', arka:'**Olguyu tüm defterlere yaz, değerleme yargısını defter bazlı yaz.**\n\n"1.200.000 TL’ye makine alındı" = olgu → tüm defterler\n"Kaç yılda tükenir?" = yargı → defter bazlı' },
      { on:'Duran varlıkta paralel defter nasıl çalışır?', arka:'Her **amortisman alanı** bir defter grubuna bağlanır (**OADB**).\n\nAlan 01 → 0L (yerel, 10 yıl)\nAlan 32 → 2L (IFRS, 8 yıl)\n\n**Tek AFAB** çalıştırması her iki defteri de besler.' },
      { on:'IFRS defterinde amortisman sıfır — sebep?', arka:'**Amortisman alanı defter grubuna bağlanmamış.**\n\nEn sinsi kurulum hatası: alan tanımlı, varlıklarda görünür, değerleri hesaplanır — ama **muhasebeye hiç düşmez**.\n\nOADB ile eşleşme tanımlanmalı.' },
      { on:'FAGLB03’te defter boş bırakılırsa?', arka:'**Lider defter** gelir.\n\nSessiz tuzak: kullanıcı IFRS bakiyesini istediğini sanır, lider defteri görür, yanlış rapor hazırlar.\n\nRapor çıktısında **defter kodu görünmeli**.' },
      { on:'CO hangi defterle çalışır?', arka:'**Yalnızca lider defterle.**\n\nMasraf yeri dağıtımları, iç sipariş kapatmaları IFRS defterinde **görünmez**.\n\nIFRS maliyet farkı gerekiyorsa **FB50L** ile elle girilir. Projede baştan konuşulmalı.' },
      { on:'FB01L ile FB01 farkı?', arka:'**Tek fark: defter grubu alanı.**\n\nFB01L o alanı içerir → tek deftere yazabilir.\n\nFB50L = FB50 + defter grubu (yalnız G/L, daha hızlı — ay sonu IFRS düzeltmelerinde tercih edilir).' },
      { on:'Bakiye devri nasıl yapılır?', arka:'**FAGLGVTR — her defter için AYRI.**\n\nUnutulursa o defterde açılış bakiyeleri **sıfır** çıkar.\n\nEn sık unutulan kapanış adımıdır. ✓ Tekrar çalıştırılabilir, fark oluşmaz.' },
      { on:'Paralel defter mi, paralel hesap mı?', arka:'**Paralel defter tercih edilir:**\n• Hesap planı **tek** kalır\n• Mali tablo yapısı sade\n• Yeni standart = yeni defter\n\nParalel hesap: hesap planı şişer, her standart için ayrı yapı gerekir.' },
      { on:'Aynı hesabın iki bakiyesi olabilir mi?', arka:'**Evet ve normaldir.**\n\n257 hesabı: 0L’de 360.000, 2L’de 450.000 — **ikisi de doğru**.\n\n"Bir hesabın bir bakiyesi olur" alışkanlığı paralel defterde geçerli değildir. Ekibe kurulumda öğretilmeli.' },
    ],
  },

  },
});
