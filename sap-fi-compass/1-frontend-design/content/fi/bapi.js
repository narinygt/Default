/* ==========================================================================
   content/fi/bapi.js — "BAPI (İş Nesnesi Arayüzü)"
   ========================================================================== */

SAP.registerTopic({
  id: 'bapi',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'BAPI (Business Application Programming Interface), belirli kurallara uyan ve ' +
      'bir **iş nesnesinin** ({{SWO1}} — Business Object Repository) metodu olarak ' +
      '**yayımlanmış** bir fonksiyon modülüdür.\n\n' +
      'Üç şey onu sıradan bir fonksiyon modülünden ayırır:\n\n' +
      '**1. Ekrandan bağımsızdır.** Ekranı taklit etmez, iş mantığını **doğrudan** çağırır.\n\n' +
      '**2. Sürüm boyunca sabit kalır.** SAP, yayımlanmış bir BAPI\'nin arayüzünü ' +
      '(parametre isimleri, alan yapısı) **geriye dönük uyumlu** tutmayı taahhüt eder — ' +
      'ekran değişebilir, BAPI değişmez.\n\n' +
      '**3. Uzaktan çağrılabilir.** `RFC` (Remote Function Call) özelliği taşır; ' +
      'dış bir sistem, bir arayüz programı veya kendi SAP sisteminizdeki bir ' +
      'ABAP programı aynı şekilde çağırabilir.\n\n' +
      'Adlandırma deseni bu kökenden gelir: `BAPI_<NESNE>_<METOT>` — örneğin ' +
      '`BAPI_ACC_DOCUMENT_POST`, `ACC_DOCUMENT` iş nesnesinin `POST` metodudur.',

    neden:
      '**Ekran bağımlılığından kurtulmak için.** {{toplu-giris}}, ekran akışını ' +
      'oynatarak çalışır — ekran bir alan ekler veya sırasını değiştirirse program ' +
      '**bozulur**. BAPI ekrana hiç dokunmaz; aynı iş mantığına doğrudan girer.\n\n' +
      '**Sürüm geçişlerinde kırılmamak için.** Bir SAP sürüm yükseltmesi ekranları ' +
      'değiştirebilir ama yayımlanmış bir BAPI\'nin arayüzü **sabit kalır**. Bu, ' +
      'dış sistemlerle kurulan entegrasyonların en kritik gereksinimidir.\n\n' +
      '**Yapılandırılmış hata bildirimi için.** BAPI bir sorun olduğunda program ' +
      '**çökmez** (dump atmaz); sorunu `RETURN` tablosuna **mesaj** olarak yazar. ' +
      'Çağıran program bu tabloyu okuyup karar verir.\n\n' +
      '**Dış sistem entegrasyonu için.** `RFC` özelliği sayesinde bir web servisi, ' +
      'bir orta katman (middleware) veya başka bir SAP sistemi aynı BAPI\'yi ' +
      'çağırabilir — {{SM59}}\'da tanımlı bir bağlantı üzerinden.',

    sirketOnemi:
      'BAPI\'yi anlamayan bir danışman onu "hızlı bir toplu yükleme aracı" sanır. ' +
      'Anlayan danışman şunu bilir: **BAPI\'yi tehlikeli yapan şey yavaşlığı değil, ' +
      'sessizliğidir.**\n\n' +
      'Ayırt edici soru şudur: **"`BAPI_TRANSACTION_COMMIT` çağrılmazsa ne olur?"** ' +
      'Doğru cevap: **hiçbir şey olmaz** — tam olarak da bu yüzden tehlikelidir. ' +
      'BAPI `RETURN` tablosunda hata döndürmez, hatta çoğu zaman bir belge ' +
      'numarası bile **verir**. Ekranda her şey başarılı görünür. Ama veritabanına ' +
      '**hiçbir şey yazılmamıştır**.\n\n' +
      '{{toplu-giris}} bu riski taşımaz — oturum kaydı ekranın kendisidir, ' +
      'yarım kalmış bir işlem oturumda **görünür kalır**. BAPI ile yazılan bir ' +
      'programda böyle bir güvenlik ağı **yoktur**; onu kurmak yazarın işidir.',

    gercekHayat:
      'Bir geliştirici der ki: *"BAPI\'yi test ettim, çalıştı — belge numarası aldım."*\n\n' +
      'Ertesi gün kullanıcı şikâyet eder: *"Dün girdiğim 40 fatura hiçbirinde yok."*\n\n' +
      'Teşhis:\n\n' +
      '**1.** {{FB03}} ile dün alınan belge numaralarından biri aranır → **belge yok**.\n\n' +
      '**2.** Numara aralığı ({{NRIV}}) kontrol edilir → numara **gerçekten verilmiş**, ' +
      'sonraki çalıştırmada bir sonraki numaradan devam ediyor.\n\n' +
      '**3.** Programın kaynak kodu incelenir → `CALL FUNCTION BAPI_ACC_DOCUMENT_POST` ' +
      'var, `RETURN` tablosu **okunmuyor**, ve `BAPI_TRANSACTION_COMMIT` satırı ' +
      '**hiç yazılmamış**.\n\n' +
      'Test sırasında geliştirici "belge numarası döndü" dediği için işlemi ' +
      '**başarılı sanmıştı**. Oysa BAPI, commit çağrılmasa bile bir sonraki ' +
      'numarayı ayırıp döndürür — bu, {{guncelleme-hatasi}}\'nın doğurduğu ' +
      '*"numara var, kayıt yok"* belirtisiyle **aynı ailedendir**, ama sebebi farklıdır: ' +
      'orada arka plan güncellemesi başarısız olur, burada güncelleme **hiç istenmemiştir**.',

    muhasebeMantigi:
      'BAPI\'nin kendisi **muhasebe kaydı üretmez** — bir arayüzdür, bir işlem değil.\n\n' +
      'Ama `BAPI_ACC_DOCUMENT_POST` çağrılıp `BAPI_TRANSACTION_COMMIT` ile ' +
      'kalıcı hâle getirildiğinde, ürettiği kayıt **{{FB50}} ile elle atılan kayıtla ' +
      'birebir aynıdır**: aynı doğrulamalar çalışır, aynı hesap belirleme kuralları ' +
      'devreye girer, aynı tablolara ({{BKPF}}, {{BSEG}}, {{ACDOCA}}) yazılır.\n\n' +
      'Muhasebe açısından tek fark **görünmezdir**: {{BKPF}}\'nin `TCODE` alanında ' +
      'BAPI\'yi çağıran programın işlem kodu durur, elle girişte ise `FB50` durur. ' +
      'Bu, geçiş ve arayüz kayıtlarının sonradan **süzülebilmesini** sağlar.\n\n' +
      'Asıl muhasebe riski kaydın **yanlış** olması değil, kaydın **hiç olmamasıdır** — ' +
      've bu, ekranda hiçbir iz bırakmaz. Commit çağrılmadan biten bir BAPI çağrısı, ' +
      'muhasebe açısından hiç yaşanmamış bir işlemdir; ne mizanda görünür ne raporda, ' +
      'çünkü hiçbir tabloya yazılmamıştır.',

    kavramlar: ['bapi', 'toplu-giris', 'idoc', 'guncelleme-hatasi', 'badi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Bir BAPI\'yi doğru kullanmak **altı adımlık** bir disiplindir. ' +
      'İlk dördü "veriyi doğru gönder", son ikisi ' +
      '**"gönderilenin gerçekten yazıldığını doğrula"** adımlarıdır — ' +
      've çoğu hata tam olarak bu son ikisinin atlanmasından doğar.',

    roller: [
      { rol: 'Danışman / Geliştirici', gorev: 'Doğru BAPI\'yi bulur — {{BAPI}} (BAPI Explorer) veya {{SWO1}} ile iş nesnesi üzerinden.' },
      { rol: 'Danışman / Geliştirici', gorev: 'Giriş yapılarını doldurur, {{SE37}} ile tek kayıtla test eder.' },
      { rol: 'Geliştirici', gorev: 'Programda `RETURN` tablosunu okur; tip `E`/`A` mesajı varsa devam etmez.' },
      { rol: 'Geliştirici', gorev: '`BAPI_TRANSACTION_COMMIT` çağırır — **atlanmaması gereken tek satır**.' },
      { rol: 'Danışman', gorev: 'Sonucu {{FB03}} veya {{SE16N}} ile bağımsız olarak doğrular.' },
      { rol: 'Dış sistem', gorev: '{{SM59}} bağlantısı üzerinden aynı BAPI\'yi uzaktan (`RFC`) çağırabilir.' },
    ],

    diyagram: {
      type: 'flow',
      baslik: 'BAPI çağrısı — altı adım, iki doğrulama',
      adimlar: [
        { rol: 'Geliştirici', baslik: 'Doğru BAPI bulunur',
          aciklama: '{{BAPI}} (BAPI Explorer) iş nesnesine göre ağaç gösterir; ' +
                    '{{SWO1}} tek bir nesnenin metotlarını gösterir.',
          cikti: 'Fonksiyon modülü adı', ok: 'giriş yapıları doldurulur' },
        { rol: 'Geliştirici', baslik: 'Giriş yapıları doldurulur ve {{SE37}} ile denenir',
          aciklama: 'Önce **`TESTRUN` = X** ile simülasyon yapılır — hiçbir şey yazılmaz, ' +
                    'yalnızca doğrulamalar çalışır.',
          cikti: 'Doldurulmuş parametreler', ok: 'gerçek çağrı yapılır' },
        { rol: 'Program', baslik: 'BAPI gerçek modda çağrılır',
          aciklama: '`TESTRUN` boş bırakılır. BAPI iş kurallarını çalıştırır ve ' +
                    'bir **belge numarası döndürebilir** — bu henüz kalıcı olduğu ' +
                    'anlamına **gelmez**.',
          cikti: 'Belge numarası + `RETURN` tablosu', ok: '`RETURN` okunur' },
        { rol: 'Program', baslik: '`RETURN` tablosu satır satır okunur',
          aciklama: 'Tip `E` (hata) veya `A` (iptal) varsa işlem **durdurulmalı** ve ' +
                    '`BAPI_TRANSACTION_ROLLBACK` çağrılmalıdır.',
          cikti: 'Karar: devam et / geri al', ok: 'hata yoksa commit edilir' },
        { rol: 'Program', baslik: '`BAPI_TRANSACTION_COMMIT` çağrılır',
          aciklama: '**Bu satır olmadan hiçbir şey kalıcı olmaz.** ' +
                    'BAPI\'nin en çok atlanan ve en pahalı kuralı budur.',
          cikti: 'Kalıcı kayıt', ok: 'bağımsız doğrulama yapılır' },
        { rol: 'Danışman', baslik: 'Sonuç {{FB03}} veya {{SE16N}} ile doğrulanır',
          aciklama: '`RETURN`\'ün "başarılı" demesi yetmez — belge gerçekten ' +
                    '{{BKPF}}\'de mi, **bağımsız bir sorguyla** görülür.',
          cikti: 'Doğrulanmış kayıt' },
      ],
    },

    adimlar: [
      { rol: 'Danışman', eylem: 'Doğru BAPI\'yi bulur', sistem: '{{BAPI}} / {{SWO1}}' },
      { rol: 'Geliştirici', eylem: 'Tek kayıtla test eder', sistem: '{{SE37}} — önce `TESTRUN`' },
      { rol: 'Geliştirici', eylem: 'Gerçek modda çağırır', sistem: '`TESTRUN` boş — belge numarası dönebilir' },
      { rol: 'Geliştirici', eylem: '`RETURN` tablosunu okur', sistem: 'Tip `E`/`A` varsa dur' },
      { rol: 'Geliştirici', eylem: 'Kalıcı hâle getirir veya geri alır', sistem: '`BAPI_TRANSACTION_COMMIT` / `_ROLLBACK`' },
      { rol: 'Danışman', eylem: 'Bağımsız doğrular', sistem: '{{FB03}} / {{SE16N}} → {{BKPF}}' },
    ],

    veriAkisi: {
      nereden: 'Çağıran program — elle çalıştırılan bir işlem, arka plan işi ({{SM37}}) veya dış sistemden gelen `RFC` çağrısı.',
      nereye: 'İş nesnesinin ilgili işlem tablosuna: `BAPI_ACC_DOCUMENT_POST` için {{BKPF}}/{{BSEG}}/{{ACDOCA}}.',
      tetikleyen: 'Programdaki `CALL FUNCTION` satırı; commit çağrılana kadar geçici.',
      sonraki: 'Bağımsız doğrulama ({{FB03}}/{{SE16N}}) → hatalıysa {{konu:error-handling}} teşhis akışı.',
    },

    notlar: [
      { tip: 'warn', baslik: 'Commit tuzağı — konunun tek en önemli noktası', metin:
        '`BAPI_TRANSACTION_COMMIT` **örtük değildir.** Bir BAPI çağrısı bittiğinde ' +
        'veri veritabanına yazılmış **değildir** — geçici bir çalışma alanındadır ve ' +
        'commit çağrılana kadar **oradan hiçbir yere gitmez**.\n\n' +
        'BAPI bu ara durumda bile `RETURN` tablosunda **hata döndürmeyebilir**, ' +
        've hatta `BAPI_ACC_DOCUMENT_POST` gibi bazı BAPI\'ler numara aralığından ' +
        '({{NRIV}}) bir belge numarası **ayırıp döndürür** — commit hiç çağrılmasa bile.\n\n' +
        'Sonuç: ekran (veya log) *"belge 1900000456 oluşturuldu"* der, ' +
        'ama {{FB03}} ile aranınca **belge yoktur**. Numara harcanmıştır, kayıt yoktur.\n\n' +
        'Tek güvenli alışkanlık: **her BAPI çağrısını `BAPI_TRANSACTION_COMMIT` veya ' +
        '`BAPI_TRANSACTION_ROLLBACK` ile bilinçli olarak kapatmak**, ve sonucu ' +
        'ekrana değil **tabloya bakarak** doğrulamak.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'BAPI\'nin kendisi bir hesap hareketi üretmez. Ama `BAPI_ACC_DOCUMENT_POST` ' +
      'çağrılıp kalıcı hâle getirildiğinde ortaya çıkan kayıt, ' +
      'elle atılan bir kayıtla **ayırt edilemez**. Aşağıdaki üç fiş aynı çağrının ' +
      '**üç farklı sonucunu** gösteriyor.',

    etkilenenHesaplar: [
      { hesap: '`RETURN` tablosu', tur: 'Teknik', neden: 'Hesap hareketi değildir ama kaydın gerçekleşip gerçekleşmediğinin **ilk göstergesidir** — tip `S/E/W/I/A`.' },
      { hesap: '{{BKPF}} / {{BSEG}} / {{ACDOCA}}', tur: 'Sonuç', neden: 'Commit sonrası yazılan tablolar — normal {{FB50}} kaydıyla **birebir aynı**.' },
      { hesap: '{{BKPF}} `TCODE`', tur: 'Teknik', neden: 'BAPI\'yi çağıran programın işlem kodunu taşır; geçiş/arayüz kayıtları buradan **süzülür**.' },
      { hesap: 'Numara aralığı ({{NRIV}})', tur: 'Risk', neden: 'Commit çağrılmasa bile **tüketilir** — commitsiz denemeler sayı aralığında **boşluk** bırakır.' },
    ],

    fisler: [
      { baslik: '① Doğru çağrı — `BAPI_ACC_DOCUMENT_POST` + `COMMIT`',
        belgeTuru: 'KR', tarih: '15.03.2028', paraBirimi: 'TRY',
        satirlar: [
          { hesap: '770', ad: 'Genel yönetim gideri', borc: 50000, not: '{{BSEG}} satır 1' },
          { hesap: '191', ad: 'İndirilecek KDV', borc: 10000, not: '{{BSEG}} satır 2' },
          { hesap: '320', ad: 'Satıcılar', alacak: 60000, not: '{{BSEG}} satır 3' },
        ],
        not: '`RETURN` tablosu **boş** (hiç `E`/`A` yok) → `BAPI_TRANSACTION_COMMIT` ' +
             'çağrıldı → {{BKPF}} + {{BSEG}} + {{ACDOCA}} yazıldı.\n\n' +
             '**{{FB03}} ile doğrulandığında bu kayıt, {{FB50}} ile elle atılmış ' +
             'bir kayıttan hiçbir şekilde ayırt edilemez** — tek fark {{BKPF}} `TCODE`.' },

      { baslik: '② Aynı çağrı — `TESTRUN` modunda',
        belgeTuru: 'KR', tarih: '15.03.2028', paraBirimi: 'TRY',
        satirlar: [
          { hesap: '770', ad: 'Genel yönetim gideri', borc: 50000, not: 'Simülasyon' },
          { hesap: '191', ad: 'İndirilecek KDV', borc: 10000, not: 'Simülasyon' },
          { hesap: '320', ad: 'Satıcılar', alacak: 60000, not: 'Simülasyon' },
        ],
        not: '`TESTRUN` = **X** ile çağrıldı. `RETURN` tablosu **aynı** sonucu verir ' +
             '(doğrulamalar tam olarak çalışır) ama **hiçbir tabloya yazılmaz** — ' +
             'commit çağrılsa bile.\n\n' +
             'Bu **kasıtlı ve zararsızdır**: geliştirme ve test sırasında verinin ' +
             'geçerli olup olmadığını görmenin doğru yoludur. Tehlike, bunu ' +
             '**production\'da fark etmeden** kapalı bırakmaktır.' },

      { baslik: '③ Commit tuzağı — `RETURN` başarılı, kayıt yok',
        belgeTuru: 'KR', tarih: '15.03.2028', paraBirimi: 'TRY',
        satirlar: [
          { hesap: '770', ad: 'Genel yönetim gideri', borc: 50000, not: '**Yalnızca çalışma alanında**' },
          { hesap: '191', ad: 'İndirilecek KDV', borc: 10000, not: '**Yalnızca çalışma alanında**' },
          { hesap: '320', ad: 'Satıcılar', alacak: 60000, not: '**Yalnızca çalışma alanında**' },
        ],
        not: '`RETURN` tablosu **boş** ve BAPI bir belge numarası **döndürdü** — ' +
             'ekran/log *"başarılı"* der. Ama `BAPI_TRANSACTION_COMMIT` satırı ' +
             '**hiç çağrılmadı**.\n\n' +
             '{{FB03}} ile aranınca belge **yoktur**. Numara aralığında ' +
             'harcanmış ama karşılıksız kalmış bir numara vardır — ' +
             '{{guncelleme-hatasi}}\'nın doğurduğu belirtiyle aynı görünür, ' +
             'ama sebebi farklıdır: orada yazım denenip **başarısız olur**, ' +
             'burada yazım **hiç istenmez**.\n\n' +
             'Bu fişteki tutarlar yalnızca **ne olması gerektiğini** gösterir — ' +
             'gerçekte {{BKPF}}\'ye hiçbir satır yazılmadığı için mizanda bu kayıt **yoktur**.' },
    ],

    tHesaplar: [
      { hesap: 'Satıcılar — yalnızca ① numaralı fiş kalıcıdır', kod: '320',
        borc: [],
        alacak: [{ ad: 'Fatura kaydı (commit edildi)', tutar: 60000 }],
        not: '② ve ③ numaralı çağrılar bu hesaba **hiç dokunmadı** — ' +
             'ikisi de ekranda/loglarda başarılı görünse bile.' },
    ],

    notlar: [
      { tip: 'warn', baslik: '`RETURN` "başarılı" demesi, kayıt yazıldığı anlamına gelmez', metin:
        'Bir BAPI\'nin `RETURN` tablosunda hiç `E`/`A` tipi mesaj olmaması, ' +
        'yalnızca **iş kurallarının ihlal edilmediğini** gösterir. ' +
        '**Verinin kalıcı olduğunu göstermez.**\n\n' +
        'Bu ikisi ancak `BAPI_TRANSACTION_COMMIT` çağrıldığında **aynı şey** olur. ' +
        'Çağrılmadıysa `RETURN` tertemiz, belge numarası elde, ' +
        've {{BKPF}}\'de **hiçbir satır yoktur**.\n\n' +
        'Bu yüzden bir BAPI programının doğruluğu `RETURN`\'e bakarak değil, ' +
        '**hedef tabloya** ({{SE16N}} veya {{FB03}}) bakarak doğrulanır — ' +
        'tıpkı {{konu:sap-tables}} konusunda ekranın söylemediğinin tabloda ' +
        'görüldüğü gibi.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'FI\'da en çok kullanılan BAPI\'ler beş işleve ayrılır. Hepsi aynı disiplini ' +
      'paylaşır (test → çağır → `RETURN` oku → commit), ama commit\'e ihtiyaç ' +
      'duymayan **okuma amaçlı** bir istisna da vardır.',

    liste: [
      { ad: '`BAPI_ACC_DOCUMENT_POST` — G/L belgesi', en: 'G/L Posting',
        aciklama: 'Genel muhasebe, satıcı ve müşteri kalemlerini tek çağrıda kaydeder.',
        neZaman: 'Arayüz programlarında en sık kullanılan BAPI; {{FB50}}/{{FB60}} ekranının ekransız karşılığı.',
        ornek: 'Giriş yapıları: `DOCUMENTHEADER` (başlık), `ACCOUNTGL`/`ACCOUNTPAYABLE`/`ACCOUNTRECEIVABLE` ' +
               '(kalemler), `CURRENCYAMOUNT` (tutarlar).\n\n' +
               'Çıktı: `OBJ_TYPE`, `OBJ_KEY`, `OBJ_SYS` — belge kimliği; ' +
               '`RETURN` boşsa ve commit çağrıldıysa {{BKPF}}/{{BSEG}}/{{ACDOCA}} yazılır.',
        tcodes: ['SE37'] },

      { ad: '`BAPI_ACC_INVOICE_RECEIPT_POST` — Fatura girişi', en: 'Invoice Receipt Posting',
        aciklama: 'MM tarafındaki fatura girişini (satın alma siparişine bağlı) ekransız gerçekleştirir.',
        neZaman: 'Fatura arayüzlerinde; {{konu:mm-integration}} akışının ekransız karşılığı.',
        ornek: 'Sipariş numarası, miktar ve tutar {{konu:data-upload}}\'daki gibi bir ara tablodan okunup ' +
               'buraya beslenir. Vergi kodu ve hesap belirleme {{konu:mm-integration}}\'daki `OBYC` mantığıyla ' +
               'aynı şekilde çalışır — BAPI onu **atlamaz**, yalnızca ekranını atlar.',
        tcodes: ['SE37'] },

      { ad: 'Satıcı / müşteri ana verisi BAPI\'leri', en: 'Vendor / Customer Master',
        aciklama: 'Klasik `BAPI_VENDOR_*` / `BAPI_CUSTOMER_*` ailesi — ana veri oluşturma ve değiştirme.',
        neZaman: 'ECC ve S/4HANA\'nın erken sürümlerinde ana veri yüklemesinde.',
        ornek: '**S/4HANA\'da dikkat:** satıcı ve müşteri, {{is-ortagi|İş Ortağı (Business Partner)}} ' +
               'modeline taşındığı için bu klasik BAPI\'lerin bir kısmı yerini ' +
               '`BAPI_BUPA_*` ailesine bırakmıştır. Hangi sürümde hangisinin geçerli olduğu ' +
               'proje bazında {{BAPI}} (BAPI Explorer) üzerinden **doğrulanmalıdır** — ' +
               'körü körüne eski bir ETL şablonu kopyalamak S/4HANA\'da hataya götürür.',
        tcodes: ['SE37'] },

      { ad: '`BAPI_FIXEDASSET_OVRTAKE_CREATE` — Duran varlık devir', en: 'Fixed Asset Takeover',
        aciklama: 'Eski sistemden gelen duran varlıkların **açılış değerleriyle** oluşturulmasını sağlar.',
        neZaman: 'Veri geçişi projelerinde, {{konu:migration}}\'daki manuel `AS91` girişinin toplu karşılığı olarak.',
        ornek: 'Varlık ana verisi + birikmiş amortisman + net defter değeri tek çağrıda beslenir. ' +
               '`AS91`de olduğu gibi bu da **muhasebe kaydı üretmez** — G/L tarafı ayrıca ' +
               'geçiş fişiyle dengelenmelidir.',
        tcodes: ['SE37'] },

      { ad: '`BAPI_GL_ACC_GETBALANCE` — Bakiye okuma', en: 'Balance Read (no commit needed)',
        aciklama: 'Bir G/L hesabının dönem bakiyesini **okur**; yazma işlemi değildir.',
        neZaman: 'Rapor ve arayüz programlarında bakiye sorgusu gerektiğinde.',
        ornek: '**İstisna budur:** okuma amaçlı BAPI\'lerde commit **gerekmez** — ' +
               'çünkü hiçbir şey değiştirilmez. Commit yalnızca veri **yazan** BAPI\'lerde ' +
               'zorunludur. Bir BAPI\'nin isim ekinde `GET`/`READ` görmek bu ayrımın ' +
               'ilk işaretidir.',
        tcodes: ['SE37'] },

      { ad: 'Desen · `RETURN` tablosu — beş mesaj tipi', en: 'RETURN Structure',
        aciklama: 'Her BAPI çağrısının sonucunu taşıyan ortak yapı: `TYPE`, `ID`, `NUMBER`, `MESSAGE`.',
        neZaman: 'Her BAPI çağrısından sonra — istisnasız.',
        ornek: '**`S`** başarı · **`E`** hata (işlem durmalı) · **`W`** uyarı (devam edilebilir) · ' +
               '**`I`** bilgi · **`A`** iptal (işlem durmalı, genelde kilit/yetki sorunu).\n\n' +
               'Kural basittir: **`E` veya `A` varsa commit çağrılmaz**, ' +
               '`BAPI_TRANSACTION_ROLLBACK` çağrılır. Yalnızca `S`/`W`/`I` varsa devam edilir.',
      },
    ],

    karsilastirmaBasliklar: ['{{toplu-giris}}', 'BAPI', '{{idoc}}', 'LSMW', 'OData / CDS'],
    karsilastirma: [
      ['Hız', 'Yavaş — ekran akışı', '**Hızlı**', 'Orta — asenkron', 'Araç (yöntem değil)', '**Hızlı**'],
      ['Ekran bağımlılığı', '**Var** — kırılgan', 'Yok', 'Yok', 'Yok', 'Yok'],
      ['Doğrulamalar', 'Ekran doğrulamaları', '**İş mantığı**', 'İş mantığı', 'BAPI/kayıt seçimine bağlı', 'Servis tanımına bağlı'],
      ['Hata bildirimi', 'Ekran diliyle', '**`RETURN` — yapılandırılmış**', 'Statü + segment', 'Seçilen yönteme bağlı', 'HTTP durum kodu + mesaj'],
      ['Kalıcılık nasıl garanti edilir?', 'Oturum kapanınca', '**Elle `COMMIT` çağrısıyla**', 'Statü güncellemesiyle', 'Seçilen yönteme bağlı', 'Servis katmanınca'],
      ['Tekrar çalıştırma', 'Hazır gelir ({{SM35}})', 'Senin kurgun ({{konu:data-upload}})', 'Sistemde kalır', 'Seçilen yönteme bağlı', 'İstemci sorumluluğunda'],
      ['Uzaktan erişim (RFC/HTTP)', 'Yok', '**Var — {{SM59}}**', 'Var', 'Yok', '**Var — HTTP tabanlı**'],
      ['Tipik kullanım', 'Tek seferlik, BAPI yoksa', '**Program, yüksek hacim**', 'Sürekli arayüz', 'Geçiş / ana veri', '**Modern web / mobil entegrasyon**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste: [
      { kod: 'BAPI', ad: 'BAPI Explorer — iş nesnesine göre arama',
        amac: 'Sistemdeki tüm BAPI\'leri iş nesnesine göre ağaç halinde gösterir; parametre, dokümantasyon ve örnek kullanım tek ekrandadır.',
        neZaman: '"Bu işlem için bir BAPI var mı?" sorusunun cevaplandığı **ilk durak**.',
        adimlar: [
          { baslik: 'İş nesnesi ağacında ilgili alana in',
            aciklama: 'Örn. muhasebe belgesi için `ACC_DOCUMENT`.' },
          { baslik: 'Metodu seç ve parametre listesini incele' },
          { baslik: 'Dokümantasyon sekmesinden zorunlu/opsiyonel alanları oku' },
          { baslik: 'Gerekirse {{SE37}}\'ye geçip tek kayıtla test et' },
        ],
        ekranAkisi: [
          { ekran: 'Ağaç', islem: '`ACC_DOCUMENT` iş nesnesi açıldı' },
          { ekran: 'Metotlar', islem: '`POST` metodu seçildi → `BAPI_ACC_DOCUMENT_POST`' },
          { ekran: 'Parametreler', islem: '`DOCUMENTHEADER`, `ACCOUNTGL`, `CURRENCYAMOUNT` görüldü' },
          { ekran: 'Sonraki adım', islem: '{{SE37}}\'de test edildi' },
        ],
        alanlar: { zorunlu: ['İş nesnesi adı'], opsiyonel: ['Metot adı', 'Anahtar kelime araması'] },
        hatalar: [
          { mesaj: 'Aradığım işlem için BAPI görünmüyor', sebep: 'O işlem için standart bir BAPI yayımlanmamış.', cozum: 'İş nesnesini ({{SWO1}}) genel metotlarla kontrol et; yoksa {{konu:data-upload}}\'daki {{toplu-giris}} veya {{konu:lsmw}} \'kayıt (recording)\' yöntemine düş.' },
        ],
        ipucu: '**BAPI Explorer bir arama aracıdır, çalıştırma aracı değildir.** ' +
               'Doğru BAPI\'yi burada bul, gerçek testi {{SE37}}\'de yap.',
        ilgili: ['SWO1', 'SE37'] },

      { kod: 'SE37', ad: 'Fonksiyon modülü — test ve inceleme',
        amac: 'Bir BAPI\'yi (veya herhangi bir fonksiyon modülünü) tek kayıtla, parametreleri elle doldurarak çalıştırır.',
        neZaman: 'Program yazmadan önce; alan yapısını anlamak için; commit tuzağını göstermek için **en iyi ekran**.',
        adimlar: [
          { baslik: 'Fonksiyon modülü adını gir, **Test / Çalıştır**' },
          { baslik: 'Giriş yapılarını doldur',
            aciklama: 'Önce **`TESTRUN` = X** ile dene — hiçbir şey yazılmadan doğrulamaları görürsün.' },
          { baslik: 'Çalıştır ve **`RETURN` tablosunu** oku',
            aciklama: 'Tip `E`/`A` var mı diye satır satır kontrol et.' },
          { baslik: '`TESTRUN`\'ı kaldırıp gerçek modda çalıştır' },
          { baslik: '**`BAPI_TRANSACTION_COMMIT`\'i ayrıca çağır**',
            aciklama: 'Yoksa kayıt **yazılmaz** — ve BAPI yine "başarılı" görünür.' },
        ],
        ekranAkisi: [
          { ekran: 'Test', islem: 'BAPI çalıştı · `RETURN` **boş** · belge numarası **döndü**' },
          { ekran: 'Kontrol', islem: '{{FB03}} → **belge yok**' },
          { ekran: 'Sebep', islem: '`BAPI_TRANSACTION_COMMIT` ayrıca çağrılmadı' },
          { ekran: 'Ders', islem: '*"`RETURN` temiz döndü"* ≠ *"kayıt yazıldı"*' },
        ],
        alanlar: { zorunlu: ['Fonksiyon modülü adı'], opsiyonel: ['Giriş yapıları', 'Tablo parametreleri', '`TESTRUN`'] },
        hatalar: [
          { mesaj: 'BAPI başarılı göründü ama kayıt yok', sebep: '`BAPI_TRANSACTION_COMMIT` ayrıca çağrılmadı.', cozum: '**BAPI\'nin en sık atlanan kuralı.** {{SE37}}\'de test ederken de commit ayrı bir fonksiyon modülü çağrısıdır — unutulursa test verisi de kalıcı olmaz.' },
          { mesaj: '`RETURN` tablosunda tip `E` mesajlar var', sebep: 'İş doğrulaması başarısız (eksik zorunlu alan, geçersiz kod).', cozum: 'Mesaj metni genelde **doğrudan anlamlıdır** — hangi alanın sorunlu olduğunu söyler. Ekran hatalarından teşhisi kolaydır; BAPI\'nin gerçek avantajı budur.' },
          { mesaj: 'Zorunlu alan hatası (eksik parametre)', sebep: 'Giriş yapısındaki bir `X` bayrak alanı doldurulmamış.', cozum: 'Çoğu BAPI giriş yapısında hangi alanların "dolu sayılacağını" belirleyen ayrı bir `X` yapısı vardır (örn. `DOCUMENTHEADERX`). Dokümantasyona bak.' },
        ],
        ipucu: '**Commit tuzağı BAPI\'nin en pahalı sürprizidir** çünkü **sessizdir**: ' +
               'BAPI başarı döner, belge numarası verir, veritabanında **hiçbir şey yoktur**.\n\n' +
               'Toplu bir yüklemede bu fark edilmez — tüm çalıştırma "başarılı" görünür ve ' +
               '**hiçbir kayıt oluşmaz**. Tek güvenli kontrol: sonucu ekranda değil ' +
               '{{FB03}}/{{SE16N}} ile **tabloda** doğrulamak.',
        ilgili: ['BAPI', 'ST22'] },

      { kod: 'SWO1', ad: 'İş nesnesi oluşturucu (Business Object Builder)',
        amac: 'BOR (Business Object Repository) nesnelerini ve bunlara bağlı metotları gösterir.',
        neZaman: 'Bir BAPI\'nin hangi iş nesnesinin metodu olduğunu anlamak gerektiğinde; adlandırma mantığını çözmek için.',
        adimlar: [
          { baslik: 'İş nesnesi adını gir (örn. `BUS2081` — muhasebe belgesi)' },
          { baslik: 'Metotlar sekmesinde BAPI olarak işaretli metotları gör' },
          { baslik: 'Bir metoda çift tıklayıp arkasındaki fonksiyon modülü adını gör' },
        ],
        ekranAkisi: [
          { ekran: 'Nesne', islem: '`BUS2081` — Muhasebe belgesi' },
          { ekran: 'Metotlar', islem: '`POST` → arkasında `BAPI_ACC_DOCUMENT_POST`' },
        ],
        alanlar: { zorunlu: ['İş nesnesi adı (BOR nesnesi)'], opsiyonel: ['Metot adı'] },
        hatalar: [
          { mesaj: 'İş nesnesini bulamıyorum', sebep: 'Nesne adı bilinmiyor.', cozum: '{{BAPI}} (BAPI Explorer) üzerinden ilgili modülün ağacına girip nesneyi orada bul.' },
        ],
        ipucu: '`BAPI_<NESNE>_<METOT>` adlandırması buradan gelir. ' +
               '`ACC_DOCUMENT` nesnesinin `POST` metodu → `BAPI_ACC_DOCUMENT_POST`.',
        ilgili: ['BAPI', 'SE80'] },

      { kod: 'SM59', ad: 'RFC bağlantı tanımları',
        amac: 'Dış sistemlerin SAP\'a (veya SAP\'ın dışarıya) hangi adres ve kullanıcıyla bağlandığını tutar.',
        neZaman: 'Bir BAPI dış sistemden veya başka bir SAP sisteminden **uzaktan** çağrılacaksa.',
        adimlar: [
          { baslik: 'Bağlantı türünü seç (örn. `3` — ABAP bağlantısı)' },
          { baslik: 'Hedef sistem, istemci, kullanıcı bilgilerini gir' },
          { baslik: '**Bağlantı testi** butonuyla doğrula' },
          { baslik: 'Yetki testiyle (Authorization Test) çağıran kullanıcının BAPI\'ye erişimini doğrula' },
        ],
        ekranAkisi: [
          { ekran: 'Şikâyet', islem: '*"Dış sistem BAPI\'yi çağırıyor ama yetki hatası alıyor"*' },
          { ekran: '{{SM59}}', islem: 'Bağlantı testi ✓ ama Yetki testi **başarısız**' },
          { ekran: 'Sebep', islem: 'Bağlantıdaki teknik kullanıcının rolünde BAPI yetkisi **eksik**' },
          { ekran: 'Çözüm', islem: 'Rol düzeltildi → yetki testi ✓' },
        ],
        alanlar: { zorunlu: ['Bağlantı adı', 'Bağlantı türü', 'Hedef sistem/kullanıcı'], opsiyonel: ['Güvenlik ayarları', 'Zaman aşımı'] },
        hatalar: [
          { mesaj: '"No authorization" — uzaktan çağrıda yetki hatası', sebep: 'Bağlantıdaki kullanıcının rolünde BAPI\'ye erişim yok.', cozum: 'Sebep genelde çağrılan koddan değil, **buradaki teknik kullanıcının rolünden** kaynaklanır.' },
          { mesaj: 'Bağlantı testi başarılı ama BAPI çağrısı zaman aşımına uğruyor', sebep: 'BAPI çok büyük bir veri kümesini tek çağrıda işlemeye çalışıyor.', cozum: 'Veriyi parçalara böl; büyük hacimlerde {{idoc}} daha uygun olabilir.' },
        ],
        ipucu: 'Uzaktan çağrılan bir BAPI "yetki yok" derse sebep çoğu zaman ' +
               'koddaki değil, **buradaki bağlantı kullanıcısındadır**.',
        ilgili: ['BAPI'] },

      { kod: 'ST22', ad: 'ABAP dump analizi',
        amac: 'Program çökmelerinin (short dump) ayrıntısını gösterir.',
        neZaman: 'Bir BAPI çağrısı hata mesajı vermeden **çökerse** — nadir ama gerçekleşir.',
        adimlar: [
          { baslik: 'Tarih/saat ve kullanıcıyla dump\'ı bul' },
          { baslik: 'Hata türünü oku (örn. `CONVT_NO_NUMBER`, `TABLE_NOT_LOCKED`)' },
          { baslik: 'ABAP çağrı yığınından hangi satırda çöktüğünü gör' },
        ],
        ekranAkisi: [
          { ekran: 'Dump', islem: '`CONVT_NO_NUMBER` — sayısal alana metin gönderilmiş' },
          { ekran: 'Sebep', islem: 'Giriş yapısındaki tutar alanına virgüllü metin (`"1.234,56"`) atanmış' },
          { ekran: 'Çözüm', islem: 'Kaynak veri BAPI\'ye gönderilmeden önce sayısal tipe dönüştürüldü' },
        ],
        alanlar: { zorunlu: ['Tarih/saat aralığı'], opsiyonel: ['Kullanıcı', 'Program adı'] },
        hatalar: [
          { mesaj: 'BAPI çağrısı `RETURN` üretmeden çöküyor', sebep: 'Genelde tip uyuşmazlığı (metin → sayı) veya doldurulmamış zorunlu bir yapı alanı.', cozum: 'Dump\'ın ABAP çağrı yığınından hangi parametrenin sorunlu olduğu görülür.' },
        ],
        ipucu: '**BAPI hataları normalde çökmez — çökme, giriş verisinin ABAP tip ' +
               'sistemiyle uyuşmadığı istisnai durumlarda görülür.** `RETURN` boşsa ve ' +
               'yine de dump varsa, sorun genelde çağırma kodunun kendisindedir.',
        ilgili: ['SE37'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'BAPI\'nin kendine ait iki tablosu vardır — {{TFDIR}} (hangi fonksiyon modülleri ' +
      'var) ve {{TADIR}} (hangi geliştirme nesnesine ait). Asıl muhasebe etkisi ise ' +
      'commit sonrası yazılan {{BKPF}}/{{BSEG}}/{{ACDOCA}} üçlüsünde görülür.',

    liste: [
      { ad: 'TFDIR', baslik: 'Fonksiyon modülü kataloğu',
        tutar: 'Sistemdeki her fonksiyon modülünün kaydı — RFC özelliği taşıyıp taşımadığı dahil.',
        olusturan: '{{SE37}} ile fonksiyon modülü oluşturulduğunda',
        anahtar: 'FUNCNAME',
        iliskiler: '{{BAPI}} (BAPI Explorer) ve {{SWO1}} burayı okuyarak listeyi oluşturur.',
        s4: 'Değişmedi.',
        alanlar: [
          { ad: 'FUNCNAME', aciklama: 'Fonksiyon modülü adı — `BAPI_...` ile başlıyorsa BAPI olma **adayıdır**, garantisi değildir', tip: 'pk' },
          { ad: 'FMODE', aciklama: 'Bağlam bilgisi — RFC etkinliği burada işaretlenir' },
        ] },

      { ad: 'TADIR', baslik: 'Depo nesnesi dizini',
        tutar: 'Sistemdeki her geliştirme nesnesinin (fonksiyon modülü, iş nesnesi, sınıf) sahibi, paketi ve orijinal sistemi.',
        olusturan: 'Her geliştirme nesnesi yaratıldığında otomatik',
        anahtar: 'PGMID + OBJECT + OBJ_NAME',
        iliskiler: 'Bir BAPI\'nin ait olduğu paket ve transport durumu buradan izlenir.',
        s4: 'Değişmedi.',
        alanlar: [
          { ad: 'OBJ_NAME', aciklama: 'Nesne adı — fonksiyon modülü adıyla eşleşir', tip: 'pk' },
          { ad: 'DEVCLASS', aciklama: 'Geliştirme paketi — hangi projeye/modüle ait olduğunu gösterir' },
        ] },

      { ad: 'BKPF', baslik: 'Belge başlığı — commit sonrası ilk yazılan tablo',
        tutar: '`BAPI_ACC_DOCUMENT_POST` başarıyla commit edildiğinde oluşan belgenin başlık bilgisi.',
        olusturan: 'Commit edilmiş BAPI çağrısı veya elle kayıt — **fark yoktur**',
        anahtar: 'BUKRS + BELNR + GJAHR',
        iliskiler: '{{BSEG}} ve {{ACDOCA}} bu üçlüyle bağlanır.',
        s4: 'Duruyor — S/4HANA\'da da fiziksel tablodur.',
        alanlar: [
          { ad: 'TCODE', aciklama: 'BAPI\'yi çağıran **programın** işlem kodu — geçiş/arayüz kayıtları buradan süzülür' },
          { ad: 'BELNR', aciklama: '`RETURN`\'de dönen belge numarasıyla aynıdır — **ama numara dönmesi belgenin var olduğu anlamına gelmez**' },
        ] },

      { ad: 'BSEG', baslik: 'Belge kalemleri',
        tutar: 'BAPI\'nin giriş yapılarından (`ACCOUNTGL`, `ACCOUNTPAYABLE`…) türeyen satırlar.',
        olusturan: 'Commit edilmiş BAPI çağrısı',
        anahtar: 'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler: '{{BKPF}} başlığı; içerik {{konu:sap-tables}} konusunda ayrıntılı işlenir.',
        s4: 'S/4HANA\'da uyumluluk görünümüdür; okuma {{ACDOCA}} üzerinden yapılır.',
        alanlar: [
          { ad: 'SHKZG', aciklama: 'Borç/alacak göstergesi — BAPI giriş yapısındaki `+`/`-` işaretinden **türetilir**' },
        ] },

      { ad: 'ACDOCA', baslik: 'Evrensel kayıt defteri',
        tutar: 'S/4HANA\'da FI ve CO kalemlerinin tek satırda birleştiği kayıt — commit sonrası buraya da yazılır.',
        olusturan: 'Commit edilmiş BAPI çağrısı',
        anahtar: 'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler: '{{BKPF}} başlığı.',
        s4: 'S/4HANA\'nın tek kalem tablosu.',
        alanlar: [
          { ad: 'RACCT', aciklama: 'Hesap — BAPI\'nin `ACCOUNTGL`/`ACCOUNTPAYABLE` yapısındaki hesap alanından gelir' },
        ] },
    ],

    er: {
      type: 'er',
      baslik: 'BAPI çağrısından kalıcı kayda — commit\'in rolü',
      varliklar: [
        { ad: 'TFDIR', rol: 'Katalog', aciklama: 'Fonksiyon modülü kaydı — her BAPI burada bir satırdır',
          alanlar: [{ ad: 'FUNCNAME', tip: 'pk' }] },
        { ad: 'TADIR', rol: 'Depo', aciklama: 'Geliştirme nesnesinin paketi ve sahibi',
          alanlar: [{ ad: 'OBJ_NAME', tip: 'pk' }, { ad: 'DEVCLASS' }] },
        { ad: 'RETURN', rol: 'Çıktı', aciklama: 'Her çağrının mesaj tablosu — henüz **kalıcılık kanıtı değildir**',
          alanlar: [{ ad: 'TYPE' }, { ad: 'ID' }, { ad: 'NUMBER' }, { ad: 'MESSAGE' }] },
        { ad: 'BKPF', rol: 'Sonuç', hub: true, aciklama: 'Yalnızca commit çağrıldıysa oluşur',
          alanlar: [{ ad: 'BUKRS', tip: 'pk' }, { ad: 'BELNR', tip: 'pk' }, { ad: 'GJAHR', tip: 'pk' }, { ad: 'TCODE' }] },
        { ad: 'BSEG', rol: 'Sonuç', aciklama: 'Kalemler — {{BKPF}}\'ye bağlı',
          alanlar: [{ ad: 'BELNR', tip: 'fk' }, { ad: 'BUZEI', tip: 'pk' }, { ad: 'SHKZG' }] },
        { ad: 'ACDOCA', rol: 'S/4HANA', aciklama: 'FI + CO — {{BKPF}}\'ye bağlı',
          alanlar: [{ ad: 'BELNR', tip: 'fk' }, { ad: 'DOCLN', tip: 'pk' }, { ad: 'RACCT' }] },
      ],
      iliskiler: [
        { from: 'TFDIR', to: 'TADIR', alanlar: 'FUNCNAME → OBJ_NAME', not: 'her fonksiyon modülü bir depo nesnesidir' },
        { from: 'TFDIR', to: 'RETURN', alanlar: '—', not: 'çağrı → mesaj tablosu' },
        { from: 'RETURN', to: 'BKPF', alanlar: '`COMMIT` çağrılırsa', not: '**tek koşullu geçiş — konunun özü**' },
        { from: 'BKPF', to: 'BSEG', alanlar: 'BUKRS+BELNR+GJAHR', not: 'kalemler' },
        { from: 'BKPF', to: 'ACDOCA', alanlar: 'BUKRS+BELNR+GJAHR', not: 'S/4HANA kalemleri' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'BAPI ile çalışırken iki ekran birbirini tamamlar: **{{SE37}}** çağrıyı test eder, ' +
      '**{{FB03}}/{{SE16N}}** sonucu bağımsız doğrular. Aradaki fark atlanırsa ' +
      'commit tuzağı fark edilmez.',

    ekranlar: [
      { ad: '{{SE37}} — fonksiyon modülü test ekranı',
        aciklama: 'Giriş parametrelerinin doldurulup tek kayıtla çalıştırıldığı ekran.',
        alanlar: [
          { ad: 'Giriş yapıları (Import)', zorunlu: true, aciklama: 'BAPI\'ye özgü başlık/kalem yapıları — örn. `DOCUMENTHEADER`.' },
          { ad: 'Tablo parametreleri', zorunlu: true, aciklama: 'Genelde kalemler burada döngü olarak taşınır (`ACCOUNTGL` gibi).' },
          { ad: '`TESTRUN`', zorunlu: false, aciklama: '**Doldurulursa** (X) simülasyon yapılır, hiçbir şey yazılmaz. Boş bırakılırsa gerçek çağrıdır.' },
          { ad: '`RETURN` (çıktı)', zorunlu: false, aciklama: 'Çalıştırma sonrası otomatik doldurulur; tip `E`/`A` var mı **satır satır** kontrol edilir.' },
        ],
        ipucu: '**Bu ekranda commit ayrı bir fonksiyon modülü çağrısıdır.** ' +
               'BAPI\'yi test ettikten sonra `BAPI_TRANSACTION_COMMIT`\'i **de** ' +
               'aynı ekranda ayrıca çalıştırmadan kayıt kalıcı olmaz.' },

      { ad: '{{FB03}} / {{SE16N}} — bağımsız doğrulama',
        aciklama: '`RETURN`\'ün söylediğine değil, **hedef tabloda gerçekten ne olduğuna** bakılan ekran.',
        alanlar: [
          { ad: 'Belge numarası + şirket kodu + mali yıl', zorunlu: true, aciklama: '`RETURN`\'de dönen `OBJ_KEY` buraya girilir.' },
          { ad: 'Tablo adı ({{SE16N}} kullanılıyorsa)', zorunlu: false, aciklama: '{{BKPF}} ile başlanır — yoksa belge hiç yazılmamıştır.' },
        ],
        ipucu: '**"`RETURN` temiz" ile "belge var" aynı şey değildir.** ' +
               'Bir BAPI programının doğruluğu yalnızca burada, ' +
               '**hedef tabloya bakarak** kanıtlanır.' },
    ],

    zorunlu: ['Giriş yapıları (Import)', 'Tablo parametreleri', 'Belge numarası + şirket kodu + mali yıl (doğrulamada)'],
    opsiyonel: ['`TESTRUN`', 'Tablo adı ({{SE16N}} doğrulamasında)'],

    hatalar: [
      { mesaj: 'BAPI "başarılı" ama {{FB03}} belgeyi bulamıyor', sebep: '`BAPI_TRANSACTION_COMMIT` çağrılmadı.', cozum: '**Konunun tek en önemli hatası.** Commit\'i ekle; test ederken de {{SE37}}\'de ayrıca çalıştır.' },
      { mesaj: '`RETURN` tablosunda `E` tipi mesaj var ama program devam etti', sebep: 'Program `RETURN`’ü okumadan doğrudan commit çağırıyor.', cozum: 'Commit’ten önce `RETURN` içinde `TYPE` alanı E veya A mı diye kontrol edilmeli; varsa `BAPI_TRANSACTION_ROLLBACK` çağrılır.' },
      { mesaj: 'Aynı veriyi ikinci kez gönderince mükerrer kayıt oluştu', sebep: 'BAPI tekrar çalıştırılabilirlik **getirmez** — bu senin kurgunun işidir.', cozum: '{{konu:data-upload}} konusundaki ara tablo (staging) deseni uygulanmalı: işlenen satır **damgalanmalı**.' },
      { mesaj: 'Uzaktan çağrıda "No authorization"', sebep: '{{SM59}} bağlantısındaki teknik kullanıcının rolünde BAPI yetkisi eksik.', cozum: 'Bağlantı kullanıcısının rolü düzeltilir; kod tarafında değişiklik gerekmez.' },
      { mesaj: 'Satıcı/müşteri BAPI\'si S/4HANA\'da beklenmedik hata veriyor', sebep: '{{is-ortagi|İş Ortağı (Business Partner)}} modeli devreye girdiği için klasik BAPI kısmen geçerliliğini yitirmiş olabilir.', cozum: '{{BAPI}} (BAPI Explorer) ile ilgili sürümde geçerli BAPI\'nin `BAPI_BUPA_*` ailesine taşınıp taşınmadığı kontrol edilir.' },
    ],

    ipuclari: [
      '**Her zaman önce `TESTRUN` ile dene** — hiçbir şey yazılmadan doğrulamaları görürsün.',
      '**Commit veya rollback, `RETURN` okunmadan asla çağrılmaz.**',
      'Sonucu ekranda değil **{{FB03}}/{{SE16N}} ile tabloda** doğrula.',
      'BAPI tekrar çalıştırılabilirlik getirmez — ara tablo deseni ({{konu:data-upload}}) elle kurulmalıdır.',
      'Uzaktan çağrı hatalarında önce {{SM59}}\'daki bağlantı kullanıcısına bak.',
      'Satıcı/müşteri BAPI\'lerini S/4HANA\'da kullanmadan önce {{BAPI}} ile güncelliğini doğrula.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar: [
      { tablo: 'TFDIR', ne: 'Fonksiyon modülü kaydı — BAPI\'nin kendisi burada tanımlanır' },
      { tablo: 'BKPF', ne: 'Yalnızca commit çağrıldıysa yazılan belge başlığı' },
      { tablo: 'BSEG', ne: 'Yalnızca commit çağrıldıysa yazılan kalemler' },
      { tablo: 'ACDOCA', ne: 'S/4HANA — yalnızca commit çağrıldıysa yazılır' },
    ],

    commit:
      'BAPI çağrısı bittiğinde veri **veritabanına yazılmamıştır** — geçici bir ' +
      'çalışma alanındadır (LUW içinde, henüz commit edilmemiş).\n\n' +
      '`BAPI_TRANSACTION_COMMIT` bu çalışma alanını **kalıcı hâle getirir**. ' +
      'Çağrılmazsa iki şey olabilir: (a) program sonlanır ve veri **kaybolur**, ' +
      'veya (b) bir sonraki işlem farklı bir LUW açar ve önceki veri yine kaybolur.\n\n' +
      '**En tehlikeli kısım:** bazı BAPI\'ler (`BAPI_ACC_DOCUMENT_POST` dahil) ' +
      'commit çağrılmadan **önce** bir belge numarası döndürür — çünkü numara ' +
      'aralığı ({{NRIV}}) tahsisi genelde ayrı bir işlemdir. Program bu numarayı ' +
      'kaydedip "başarılı" der, ama {{BKPF}}\'ye hiçbir satır yazılmaz.\n\n' +
      '`BAPI_TRANSACTION_ROLLBACK`, açık kalan LUW\'u **bilinçli olarak** geri alır. ' +
      'Commit çağrılmadan program sonlanırsa da veri kaybolur — ama **bilinçsizce**, ' +
      've bu ayrım kod okumadan anlaşılmaz.',

    belgeNo:
      '`RETURN`\'de dönen belge numarası, {{NRIV}} numara aralığından ' +
      '**commit\'ten bağımsız olarak** tahsis edilebilir.\n\n' +
      'Pratik sonucu: commit çağrılmayan bir test veya başarısız bir çalıştırma ' +
      '**numarayı tüketir** ama karşılığında kayıt bırakmaz. Numara aralığında ' +
      'boşluk oluşur — {{guncelleme-hatasi}}\'nın bıraktığı boşlukla **aynı görünür**, ' +
      'ama sebebi farklıdır (orada asenkron yazım başarısız olur, burada yazım ' +
      'hiç istenmez).\n\n' +
      'Bu boşluklar tek başına bir hata değildir — ama sık ve büyükse, ' +
      '**test ortamlarında `TESTRUN` kullanılmadığının** işaretidir.',

    postingLogic:
      '`RETURN` tablosunun beş mesaj tipi ve doğru tepki:\n\n' +
      '**`S`** (Success) — devam et.\n' +
      '**`W`** (Warning) — devam edilebilir, ama mesaj kaydedilmelidir.\n' +
      '**`I`** (Info) — bilgi amaçlı, işlemi etkilemez.\n' +
      '**`E`** (Error) — **dur**, commit çağırma, `ROLLBACK` çağır.\n' +
      '**`A`** (Abort) — **dur**, genelde kilit veya yetki sorunu; `ROLLBACK` çağır.\n\n' +
      'Doğru akış: **`TESTRUN` ile dene → `RETURN`\'ü oku → sorun yoksa gerçek modda ' +
      'çağır → `RETURN`\'ü tekrar oku → `E`/`A` yoksa `COMMIT`, varsa `ROLLBACK`.**\n\n' +
      'Bu beş adımdan herhangi biri atlanırsa (en sık atlanan: son commit adımı) ' +
      'çağrı sessizce anlamsızlaşır.',

    tur:
      'Bir BAPI, fonksiyon modülü olarak **bir geliştirme nesnesidir** — {{TADIR}}\'da ' +
      'kayıtlıdır ve bir taşıma isteğiyle taşınır.\n\n' +
      'BAPI olarak **yayımlanması** ({{SWO1}} üzerinden bir iş nesnesi metodu olarak ' +
      'kayda geçirilmesi) ayrı bir adımdır — bir fonksiyon modülü yazılıp derlenmesi ' +
      'onu otomatik olarak BAPI yapmaz.',

    transport:
      'Fonksiyon modülünün kendisi ({{TFDIR}}/{{TADIR}} kaydı) ve BOR nesnesine ' +
      'bağlanması ({{SWO1}}) **taşıma isteğine girer**.\n\n' +
      'Bir BAPI\'yi **çağıran program** da (arayüz, ETL, özel `Z*` program) ayrı bir ' +
      'geliştirme nesnesidir ve kendi taşıma isteğiyle taşınır — BAPI\'nin kendisi ' +
      'taşınırken çağıran kod otomatik gelmez.',

    ekstra: [
      { baslik: 'Commit tuzağı neden bu kadar sık yaşanır?', metin:
        'Üç sebebi bir araya gelir:\n\n' +
        '**1. Test sırasında fark edilmez.** {{SE37}}\'de bir BAPI\'yi test ederken ' +
        'geliştirici genelde tek bir çağrı yapıp `RETURN`\'ün boş olduğunu görür ve ' +
        'yeterli sanır. Commit\'i **ayrı bir işlem** olarak hatırlamak gerekir.\n\n' +
        '**2. `RETURN` hatayı göstermez.** Çünkü ortada bir hata **yoktur** — ' +
        'iş kuralları ihlal edilmemiştir. Eksik olan tek şey commit çağrısıdır ve ' +
        'bu, `RETURN`\'ün ölçtüğü bir şey **değildir**.\n\n' +
        '**3. Belge numarası yanıltıcı bir kanıttır.** Program bir numara aldığı için ' +
        '"iş bitti" sanır — oysa numara tahsisi ile kaydın kalıcı olması **iki ayrı olaydır**.\n\n' +
        '**Kalıcı önlem:** kod incelemesinde (code review) her `CALL FUNCTION` ' +
        'satırının sonunda bir `COMMIT` veya `ROLLBACK` çağrısı olup olmadığı ' +
        '**aranan tek şey** olmalıdır. Bu, {{konu:error-handling}} konusundaki ' +
        '"sessiz hata" sınıfının en pahalı örneklerinden biridir.' },

      { baslik: 'BAPI ile {{toplu-giris}} arasındaki gerçek fark', metin:
        'İkisi de "toplu veri girme" aracı gibi göründüğü için sık karıştırılır, ' +
        'ama farkları **yapısaldır**:\n\n' +
        '{{toplu-giris}} ekranı **oynatır** — her alan, her tab tuşu, her onay ' +
        'diyaloğu sırayla işlenir. Bu yavaştır ama bir güvenlik ağı getirir: ' +
        'yarım kalan bir oturum {{SM35}}\'te **görünür kalır**, kimse onu ' +
        'kaybetmez.\n\n' +
        'BAPI ekranı **atlar** — doğrudan iş mantığına girer. Bu hızlıdır ama ' +
        'güvenlik ağı **yoktur**: commit çağrılmazsa veri hiçbir yerde görünmeden ' +
        'kaybolur, çünkü ortada bir "oturum" kaydı hiç yoktur.\n\n' +
        '**Sonuç:** BAPI, {{toplu-giris}}\'in hazır verdiği iki şeyi ' +
        '(kalıcılık garantisi ve tekrar çalıştırılabilirlik) **elle inşa etmeyi** ' +
        'gerektirir — bkz. {{konu:data-upload}}.' },
    ],

    notlar: [
      { tip: 'warn', baslik: 'Numara aralığı boşluğu — commit tuzağının kanıtı', metin:
        'Bir BAPI programı düzenli olarak numara aralığında ({{NRIV}}) beklenenden ' +
        'fazla boşluk bırakıyorsa, bu genelde **başarısız denemelerin commit\'e ' +
        'ulaşmadığının** işaretidir.\n\n' +
        'Tek başına anormal değildir — ama büyüklüğü ve sıklığı, ' +
        '`RETURN` kontrolünün ve `ROLLBACK` çağrısının **eksik olup olmadığını** ' +
        'sorgulamak için yeterli bir sebeptir.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Klasik BAPI\'lerin **büyük çoğunluğu S/4HANA\'da hâlâ çalışır** — arayüz ' +
      'sözü tutulmuştur. Asıl değişen, satıcı/müşteri ana verisinde ' +
      '{{is-ortagi|İş Ortağı (Business Partner)}} modelinin zorunlu hâle gelmesi ve ' +
      'modern entegrasyonlarda BAPI\'nin yanına **OData/CDS**\'in eklenmiş olmasıdır.',

    eccFarklari: [
      { konu: 'G/L, satıcı, müşteri kaydı BAPI\'leri', ecc: '`BAPI_ACC_DOCUMENT_POST` vb.', s4: '**Aynı şekilde çalışır** — arayüz sabit kalmıştır' },
      { konu: 'Satıcı/müşteri ana verisi BAPI\'leri', ecc: '`BAPI_VENDOR_*` / `BAPI_CUSTOMER_*` doğrudan geçerli', s4: '**{{is-ortagi|İş Ortağı}} zorunlu** — bir kısmı `BAPI_BUPA_*` ailesine kaymıştır' },
      { konu: 'Bazı klasik BAPI\'lerin S/4HANA karşılığı', ecc: '—', s4: '`_SRVAPI` sonekli servis odaklı varyantlar bazı iş nesnelerinde eklenmiştir' },
      { konu: 'Dış sistem entegrasyonu', ecc: 'BAPI/RFC ağırlıklı', s4: '**OData/CDS + API Business Hub** yeni tercih edilen yoldur' },
      { konu: 'Duran varlık devri', ecc: '`BAPI_FIXEDASSET_OVRTAKE_CREATE`', s4: 'Aynı BAPI geçerlidir; Yeni Varlık Muhasebesi mimarisiyle uyumludur' },
    ],

    kalkanTcodes: [
      { eski: 'Klasik `BAPI_VENDOR_CREATE`', yeni: '`BAPI_BUPA_CREATE_FROM_DATA` (proje bazında doğrulanmalı)', not: '{{is-ortagi|İş Ortağı}} modeli devreye girdiği için' },
      { eski: '—', yeni: '—', not: '{{BAPI}}, {{SE37}}, {{SWO1}} **kaldırılmadı**' },
    ],

    fiori: [
      { ad: 'API Business Hub', aciklama: 'S/4HANA\'nın yayımladığı OData/API servislerinin kataloğu — BAPI Explorer\'ın modern, web tabanlı karşılığı.' },
      { ad: 'Manage Journal Entries', aciklama: 'BAPI ile yazılmış bir G/L kaydının {{FB03}} karşılığı Fiori uygulaması.' },
    ],

    bestPractices: [
      'Yeni bir arayüz tasarlanıyorsa önce **OData/CDS servisi var mı** kontrol edilir — BAPI ikinci sıradadır.',
      'Var olan bir BAPI arayüzü S/4HANA\'ya geçerken **`RETURN` ve commit mantığı değiştirilmez** — arayüz sözleşmesi aynıdır.',
      'Satıcı/müşteri BAPI\'leri kullanılmadan önce {{is-ortagi|İş Ortağı}} geçişinin o sistemde tamamlanıp tamamlanmadığı doğrulanır.',
      'Uzaktan erişim güvenliği için {{SM59}} bağlantı kullanıcılarının yetkisi düzenli gözden geçirilir.',
    ],
  },

  /* ================================================= 10. SENARYO === */
  senaryo: {
    baslik: 'Gece arayüzü — 400 belgeden 137\'si hiç yazılmamış',
    hikaye:
      'Her gece 02:00\'de çalışan bir arka plan işi, dış bir satış sisteminden gelen ' +
      'faturaları `BAPI_ACC_DOCUMENT_POST` ile FI\'a aktarıyor. Program üç ay boyunca ' +
      '"sorunsuz" çalıştı — günlük (log) her zaman *"400 kayıt işlendi"* yazıyordu.\n\n' +
      'Ay sonu kapanışında mizan ile satış sisteminin toplamı **uyuşmadı**: ' +
      'aradaki fark 1.940.000 TRY.',
    veriler: [
      { k: 'Gönderilen fatura sayısı (gece işi)', v: '400' },
      { k: '{{BKPF}}\'de bulunan belge sayısı', v: '263' },
      { k: 'Eksik belge sayısı', v: '137' },
      { k: 'Mizan farkı', v: '1.940.000 TRY' },
    ],
    adimlar: [
      { baslik: 'Belirti — ay sonu mutabakatı tutmuyor',
        aciklama: 'Muhasebe, dış sistemdeki fatura toplamıyla FI mizanı arasında ' +
                  'fark bildirdi. İlk bakışta "kaç faturanın işlendiği" değil ' +
                  '"toplamın tutup tutmadığı" sorgulandı.' },
      { baslik: 'İş günlüğü kontrol edilir', tcode: 'SM37',
        aciklama: 'Arka plan işi her gece **hatasız** tamamlanmış görünüyordu — ' +
                  'iş durumu yeşildi, dump yoktu.' },
      { baslik: 'Program günlüğü incelenir', tcode: 'SLG1',
        aciklama: 'Program kendi günlüğüne *"400/400 işlendi"* yazmıştı. Ama bu satır, ' +
                  'programın kendi `RETURN` okuma mantığından geliyordu — ve ' +
                  'kod incelendiğinde `RETURN` tipi `E`/`A` kontrolü **vardı**, ' +
                  'ama `BAPI_TRANSACTION_COMMIT` çağrısı **koşullu bir dal içinde ' +
                  'unutulmuştu**: yalnızca ilk 263 kayıt bu dala giriyordu, ' +
                  'kalan 137\'si farklı bir işlem türü (kredi notu) olduğu için ' +
                  'başka bir kod yoluna düşüyor ve orada commit **hiç çağrılmıyordu**.' },
      { baslik: 'Bağımsız doğrulama yapılır', tcode: 'SE16N',
        aciklama: '{{BKPF}} `TCODE` alanı bu arayüz programının kendi kodunu taşıyacak ' +
                  'şekilde süzüldü → **263 kayıt**. Dış sistemdeki 400 fatura numarasıyla ' +
                  'karşılaştırıldı → **137 numara hiç {{BKPF}}\'de görünmüyordu**.',
        not: 'Numara aralığı ({{NRIV}}) kontrol edildiğinde bu 137 numaranın ' +
             '**tahsis edilmiş ama karşılıksız** olduğu doğrulandı — commit tuzağının ' +
             'klasik izi.' },
      { baslik: 'Kök sebep düzeltilir',
        aciklama: 'Kredi notu dalına eksik olan `BAPI_TRANSACTION_COMMIT` satırı ' +
                  'eklendi. Ayrıca her iki dal için de commit\'ten **önce** `RETURN` ' +
                  'tipi tekrar kontrol edilip sonucun {{konu:data-upload}}\'daki ' +
                  'ara tablo desenine göre **satır bazında damgalanması** sağlandı.' },
    ],
    sonuc:
      '137 fatura, kaynak dosyadan tekrar okunup **yalnızca eksik olanlar** ' +
      '(ara tablodaki damga sayesinde, mükerrer risk olmadan) yeniden gönderildi. ' +
      'Mizan farkı kapandı.\n\n' +
      'Kalıcı önlem tek cümledir: **iş günlüğünün "başarılı" demesi yeterli değildir — ' +
      'her gece çalışan arayüz, ertesi sabah {{BKPF}} sayısıyla kaynak sistemin ' +
      'kayıt sayısı karşılaştırılarak doğrulanır.** Üç ay boyunca hiç kimse bunu ' +
      'yapmadı çünkü iş günlüğü hep yeşildi — ve tam olarak bu yüzden hata ' +
      'üç ay boyunca fark edilmedi.',
  },

  /* ================================================ 11. ÖĞRENME === */
  ogrenme: {
    ozet: [
      'BAPI, bir iş nesnesine ekrandan bağımsız, sürüm boyunca sabit kalan bir arayüzdür.',
      '`BAPI_TRANSACTION_COMMIT` örtük değildir — çağrılmazsa veri yazılmaz.',
      '`RETURN` tablosu (TYPE S/E/W/I/A) başarıyı değil iş kuralı ihlalinin olup olmadığını gösterir.',
      'Doğru akış: TESTRUN → RETURN oku → gerçek çağrı → RETURN oku → COMMIT veya ROLLBACK.',
      'BAPI tekrar çalıştırılabilirlik getirmez — ara tablo deseni elle kurulmalıdır.',
    ],
    onemliNoktalar: [
      'Belge numarası dönmesi, kaydın kalıcı olduğu anlamına gelmez.',
      'Commit\'ten önce E/A tipi mesaj kontrolü zorunludur.',
      'Uzaktan çağrı yetki hataları genelde SM59 bağlantı kullanıcısından kaynaklanır.',
      'Satıcı/müşteri BAPI\'leri S/4HANA\'da İş Ortağı modeliyle kısmen değişmiştir.',
      'Sonuç ekrandan değil hedef tablodan doğrulanır.',
    ],
    sikHatalar: [
      { hata: 'BAPI çağrısından sonra commit çağırmayı unutmak', dogru: 'Her BAPI çağrısı bilinçli olarak COMMIT veya ROLLBACK ile kapatılır.' },
      { hata: 'RETURN\'ün boş olmasını kaydın yazıldığının kanıtı saymak', dogru: 'Sonuç hedef tabloda (FB03/SE16N) doğrulanır.' },
      { hata: 'BAPI\'nin toplu-giriş gibi tekrar çalıştırılabilir olduğunu varsaymak', dogru: 'Ara tablo deseniyle mükerrer kayıt koruması elle kurulur.' },
      { hata: 'TESTRUN\'ı production\'da unutup açık bırakmak veya hiç kullanmamak', dogru: 'Geliştirmede TESTRUN ile denenir, production\'da kapalı olduğu doğrulanır.' },
    ],
    ipuclari: [
      'Yeni bir BAPI kullanmadan önce SE37\'de TESTRUN ile deneyin.',
      'RETURN tablosunu satır satır, tip alanına göre kontrol edin.',
      'Commit sonrası sonucu mutlaka bağımsız bir sorguyla doğrulayın.',
    ],
    quiz: [
      { soru: 'BAPI_ACC_DOCUMENT_POST çağrıldı, RETURN tablosu boş döndü ve bir belge numarası alındı. Bu, belgenin kesin olarak oluştuğu anlamına gelir mi?',
        secenekler: ['Evet, RETURN boşsa belge her zaman oluşmuştur', 'Hayır, BAPI_TRANSACTION_COMMIT ayrıca çağrılmadıysa kayıt yazılmamış olabilir', 'Yalnızca hafta sonu çalıştırmalarında hayır', 'Yalnızca uzaktan (RFC) çağrılarda hayır'],
        dogru: 1, aciklama: 'RETURN\'ün boş olması yalnızca iş kurallarının ihlal edilmediğini gösterir; kalıcılık için ayrıca commit çağrılması gerekir.' },
      { soru: 'RETURN tablosunda TYPE = E olan bir satır görüldüğünde doğru davranış nedir?',
        secenekler: ['Yine de commit çağırıp devam etmek', 'Commit çağırmadan işlemi durdurmak ve gerekirse ROLLBACK çağırmak', 'Mesajı yok sayıp bir sonraki kayda geçmek', 'TESTRUN moduna geçmek'],
        dogru: 1, aciklama: 'E (Error) ve A (Abort) tipi mesajlar işlemin durdurulması gerektiğini gösterir; commit çağrılmaz.' },
      { soru: 'BAPI ile toplu-giriş (batch input) arasındaki en temel fark nedir?',
        secenekler: ['BAPI her zaman daha yavaştır', 'BAPI ekranı taklit etmez, iş mantığına doğrudan girer; toplu-giriş ekran akışını oynatır', 'Toplu-giriş uzaktan çağrılabilir, BAPI çağrılamaz', 'İkisi de aynı mekanizmayı kullanır'],
        dogru: 1, aciklama: 'Toplu-giriş ekranı oynatarak çalışır (kırılgan ama hazır güvenlik ağı verir); BAPI ekranı atlar (hızlıdır ama güvenlik ağı yoktur).' },
      { soru: 'Bir BAPI programında BAPI_TRANSACTION_COMMIT satırı hiç yazılmadıysa, ekranda/logda ne görülür?',
        secenekler: ['Her zaman açık bir hata mesajı', 'Genelde "başarılı" görünüm — RETURN temiz, belge numarası döner', 'Program dump verir', 'Sistem otomatik olarak commit çağırır'],
        dogru: 1, aciklama: 'Commit tuzağının tehlikesi tam olarak budur: hiçbir hata belirtisi yoktur, sonuç sessizce yanlış olur.' },
      { soru: 'BAPI_GL_ACC_GETBALANCE gibi yalnızca okuma yapan bir BAPI\'de commit çağrılması gerekir mi?',
        secenekler: ['Evet, her BAPI çağrısından sonra commit zorunludur', 'Hayır, veri değiştirilmediği için commit gerekmez', 'Yalnızca RFC üzerinden çağrılıyorsa gerekir', 'Yalnızca TESTRUN kapalıysa gerekir'],
        dogru: 1, aciklama: 'Commit yalnızca veri yazan BAPI\'lerde zorunludur; okuma amaçlı BAPI\'ler bir şey değiştirmediği için commit gerektirmez.' },
      { soru: 'S/4HANA\'da klasik satıcı/müşteri BAPI\'leri ile ilgili hangi ifade doğrudur?',
        secenekler: ['Hepsi kaldırılmıştır, yalnızca OData kullanılabilir', 'İş Ortağı modeli zorunlu hâle geldiği için bir kısmı BAPI_BUPA_* ailesine kaymış olabilir, proje bazında doğrulanmalıdır', 'Hiçbir şey değişmemiştir, hepsi birebir aynıdır', 'Yalnızca müşteri BAPI\'leri etkilenmiştir, satıcı BAPI\'leri etkilenmemiştir'],
        dogru: 1, aciklama: 'Business Partner modeli nedeniyle klasik satıcı/müşteri BAPI\'lerinin bir kısmı yerini BAPI_BUPA_* ailesine bırakmış olabilir; bu her sistemde BAPI Explorer üzerinden doğrulanmalıdır.' },
    ],
    flashcards: [
      { on: 'BAPI ne demektir?', arka: 'Business Application Programming Interface — bir iş nesnesine ekrandan bağımsız, sürüm boyunca sabit kalan standart fonksiyon arayüzü.' },
      { on: 'Commit tuzağı nedir?', arka: 'BAPI_TRANSACTION_COMMIT çağrılmadan biten bir BAPI çağrısının, RETURN temiz ve belge numarası dönmüş olsa bile veritabanına hiçbir şey yazmamasıdır.' },
      { on: 'RETURN tablosundaki beş mesaj tipi nedir?', arka: 'S (başarı), E (hata — dur), W (uyarı — devam edilebilir), I (bilgi), A (iptal — dur).' },
      { on: 'TESTRUN ne işe yarar?', arka: 'BAPI\'yi hiçbir şey yazmadan, yalnızca doğrulamaları çalıştırarak simüle eder.' },
      { on: 'BAPI ile toplu-giriş arasındaki temel fark nedir?', arka: 'Toplu-giriş ekranı oynatır (yavaş ama tekrar çalıştırma hazır gelir); BAPI ekranı atlar (hızlı ama tekrar çalıştırma kurgulanmalıdır).' },
      { on: 'BAPI_ACC_DOCUMENT_POST ne yapar?', arka: 'G/L, satıcı ve müşteri kalemlerini tek çağrıda, ekransız olarak kaydeder — FB50/FB60\'ın ekransız karşılığıdır.' },
      { on: 'S/4HANA\'da satıcı/müşteri BAPI\'lerinde nelere dikkat edilir?', arka: 'İş Ortağı (Business Partner) modeli zorunlu hâle geldiği için bir kısmı BAPI_BUPA_* ailesine kaymış olabilir; BAPI Explorer ile doğrulanmalıdır.' },
      { on: 'SM59\'un BAPI ile ilgisi nedir?', arka: 'Bir BAPI\'nin dış sistemden veya başka bir SAP sisteminden uzaktan (RFC) çağrılabilmesi için gereken bağlantı tanımlarını tutar.' },
      { on: 'Bir BAPI programının doğruluğu nasıl kanıtlanır?', arka: 'RETURN\'e bakarak değil, hedef tabloya (FB03/SE16N ile BKPF) bakarak.' },
      { on: 'BAPI tekrar çalıştırılabilirlik getirir mi?', arka: 'Hayır — bu, geliştiricinin ara tablo (staging) deseniyle elle kurması gereken bir özelliktir.' },
    ],
  },

  } /* sections */
});
