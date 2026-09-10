/* ==========================================================================
   content/fi/new-gl.js — "New G/L (Yeni Ana Muhasebe)"
   ========================================================================== */

SAP.registerTopic({
  id: 'new-gl',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Yeni Ana Muhasebe (New G/L), SAP’ın klasik ana muhasebesinin **üç eksik özelliğini** ' +
      'kapatmak için getirdiği mimaridir: **paralel defter**, **belge bölme** ve ' +
      '**gerçek zamanlı FI–CO entegrasyonu**.\n\n' +
      'Klasik ana muhasebede tek bir defter vardı ({{GLT0}} toplamları) ve raporlama boyutları ' +
      'sınırlıydı. Kâr merkezi için ayrı bir defter (EC-PCA), maliyet muhasebesi için ayrı ' +
      'tablolar, özel amaçlı defterler için FI-SL vardı. **Hepsi ayrı ayrı mutabakat gerektiriyordu.**\n\n' +
      'New G/L bunları tek bir genişletilmiş yapıda birleştirdi ({{FAGLFLEXA}} / {{FAGLFLEXT}}). ' +
      'S/4HANA ise bu birleşmeyi **bir adım ileri** taşıdı: {{ACDOCA}} ile FI ve CO satırları ' +
      'aynı tabloda tutuluyor ({{evrensel-kayit-defteri}}).',

    neden:
      '**Bölüm/segment bazlı bilanço zorunluluğu.** IFRS 8 ve benzeri standartlar, ' +
      'segment bazında **tam bilanço** ister. Klasik yapıda gelir tablosu ayrıştırılabiliyordu ' +
      'ama bilanço ayrıştırılamıyordu — çünkü satıcı/müşteri satırının kâr merkezi yoktu.\n\n' +
      '**Paralel muhasebe.** Aynı işlemi yerel mevzuata ve IFRS’e göre farklı kaydetme ihtiyacı.\n\n' +
      '**Mutabakat yükünü kaldırmak.** FI ile CO arasındaki farklar ay sonunda saatlerce aranıyordu.\n\n' +
      '**Tek doğruluk kaynağı.** Aynı işlem üç yerde üç farklı toplam üretmemeli.',

    sirketOnemi:
      'New G/L bir "özellik" değil, bir **mimari karardır**. Etkisi kurulumun ilk gününde alınır ve ' +
      'sonradan değiştirilmesi son derece maliyetlidir — özellikle {{belge-bolme}} ' +
      '**sonradan açılamaz** (kapalı dönemlerdeki belgelerin bölünmemiş olması sorunu).\n\n' +
      'Danışman açısından New G/L, FI’ın "temel işlemler" seviyesinden ' +
      '"mimari tasarım" seviyesine geçiş noktasıdır. Bu konuyu bilmeden ' +
      'paralel defter, segment raporlaması veya S/4HANA geçiş projesi yönetilemez.\n\n' +
      'Mülakatta ayırt edici soru: **"Belge bölme ne işe yarar?"** ' +
      'Yüzeysel cevap "kalemleri böler" der. Doğru cevap: ' +
      '**satıcı/müşteri ve vergi satırlarına kâr merkezi/segment atayarak ' +
      'o boyutlarda tam bilanço üretilmesini sağlar** — bu olmadan segment bilançosu çıkarılamaz.',

    gercekHayat:
      'Bir holding iki iş kolunda faaliyet gösteriyor: **Üretim** ve **Hizmet**. ' +
      'Yönetim her iş kolu için ayrı bilanço istiyor: "Hizmet biriminin borçları ne kadar?"\n\n' +
      'Klasik ana muhasebede bu sorunun cevabı **yoktur**. Neden? Bir fatura kaydında:\n\n' +
      'Gider satırının kâr merkezi vardır (masraf yeri üzerinden gelir). ' +
      'Ama **satıcı satırının kâr merkezi yoktur** — satıcı bir bilanço hesabıdır, ' +
      'kâr merkezi taşımaz. KDV satırı da öyle.\n\n' +
      'Sonuç: gelir tablosunu iş koluna ayırabilirsiniz, ama **borçları ayıramazsınız**. ' +
      'Bilanço çıkmaz.\n\n' +
      '{{belge-bolme}} tam olarak bu sorunu çözer: satıcı ve KDV satırlarını ' +
      'gider satırlarının oranında **böler** ve her parçaya ilgili kâr merkezini atar. ' +
      'Artık "Hizmet biriminin satıcılara borcu 340.000 TL" sorusunun bir cevabı vardır.',

    muhasebeMantigi:
      'New G/L’in muhasebe mantığı tek bir ilkeye dayanır: **her satır, raporlanmak istenen ' +
      'her boyutu taşımalıdır.**\n\n' +
      'Klasik yapıda bu ilke yalnızca gelir tablosu hesapları için sağlanıyordu. ' +
      'Bilanço hesapları (satıcı, müşteri, banka, vergi) boyutsuzdu.\n\n' +
      '{{belge-bolme}} bu boşluğu doldurur ve şu muhasebe kuralını korur: ' +
      '**bölünmüş belge, her boyut içinde ayrı ayrı dengeli olmalıdır.** ' +
      'Yani yalnızca belgenin toplamı değil, her kâr merkezinin borç–alacak toplamı da eşit olmalıdır.\n\n' +
      'Bunu sağlamak için sistem gerektiğinde **denkleştirme satırı** (`zero-balance clearing`) üretir. ' +
      'Bu, muhasebede "her alt küme kendi içinde dengeli" ilkesinin sistemsel karşılığıdır.',

    kavramlar: ['belge-bolme', 'kar-merkezi', 'evrensel-kayit-defteri', 'lider-defter',
                'mutabakat-hesabi', 'yerel-para-birimi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'New G/L’de kullanıcı açısından **hiçbir şey değişmez** — fatura aynı ekrandan aynı şekilde girilir. ' +
      'Değişen, kaydın arkasında olan bitendir: belge bölünür, boyutlar türetilir, ' +
      'defterlere dağıtılır.',

    roller:[
      { rol:'Kullanıcı', gorev:'Faturayı normal şekilde girer. **Bölmeyi görmez, bilmesi de gerekmez.**' },
      { rol:'Sistem', gorev:'Belgeyi bölme kurallarına göre işler, boyutları türetir, denkleştirme satırı ekler.' },
      { rol:'FI danışmanı', gorev:'Bölme karakteristiklerini ve kalem kategorilerini tasarlar — **kurulumun en kritik kararı**.' },
      { rol:'Raporlama', gorev:'{{FAGLL03}} ile defter/segment bazlı kalem raporu alır.' },
      { rol:'Ana muhasebe', gorev:'Segment bilançosunun dengeli olduğunu doğrular.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Bir faturanın New G/L içindeki yolculuğu',
      adimlar:[
        { ic:'🧾', rol:'Kullanıcı', baslik:'Fatura girilir ({{FB60}})',
          aciklama:'Gider satırına masraf yeri girilir; satıcı ve KDV satırı **boyutsuzdur**. ' +
                   'Kullanıcı için akış klasik yapıyla aynıdır.',
          cikti:'Ham belge', ok:'bölme devreye girer' },
        { ic:'✂️', rol:'Sistem', baslik:'**Belge bölme** çalışır',
          aciklama:'Satıcı ve KDV satırları, gider satırlarının **oranında** bölünür. ' +
                   'Her parçaya ilgili kâr merkezi/segment atanır.',
          cikti:'Bölünmüş kalemler', ok:'denge kontrol edilir' },
        { ic:'⚖️', rol:'Sistem', baslik:'Boyut bazında denge sağlanır',
          aciklama:'Her kâr merkezi kendi içinde borç = alacak olmalıdır. ' +
                   'Değilse **denkleştirme satırı** üretilir.',
          cikti:'Dengeli bölünmüş belge', ok:'defterlere yazılır' },
        { ic:'📚', rol:'Sistem', baslik:'Defterlere dağıtılır',
          aciklama:'Defter grubu belirtilmemişse kayıt **tüm defterlere** gider ' +
                   '(lider + ek defterler).',
          cikti:'Defter kayıtları', ok:'tablolar güncellenir' },
        { ic:'💾', rol:'Sistem', baslik:'Tablolar güncellenir',
          aciklama:'ECC’de {{FAGLFLEXA}} + {{FAGLFLEXT}}; S/4HANA’da **{{ACDOCA}}**. ' +
                   'Bölme bilgisi {{FAGL_SPLINFO}}’ya yazılır.',
          cikti:'Kalıcı kayıt', ok:'raporlanır' },
        { ic:'📊', rol:'Raporlama', baslik:'Segment bilançosu alınır',
          aciklama:'{{FAGLL03}} / {{FAGLB03}} ile defter ve segment bazlı raporlar; ' +
                   'artık **bilanço da** ayrıştırılabilir.',
          cikti:'Segment bilançosu' },
      ],
    },

    adimlar:[
      { rol:'Kullanıcı', eylem:'Faturayı girer', sistem:'{{FB60}} — akış değişmez' },
      { rol:'Sistem', eylem:'Kalem kategorisini belirler', sistem:'Hesap ↔ kalem kategorisi eşleşmesi' },
      { rol:'Sistem', eylem:'Belgeyi böler', sistem:'Bölme kuralı + karakteristikler' },
      { rol:'Sistem', eylem:'Denkleştirme satırı ekler', sistem:'Sıfır bakiye kapatma hesabı' },
      { rol:'Sistem', eylem:'Defterlere yazar', sistem:'{{ACDOCA}} (S/4) veya {{FAGLFLEXA}} (ECC)' },
      { rol:'Sistem', eylem:'Bölme bilgisini saklar', sistem:'{{FAGL_SPLINFO}} — kapatmada kullanılır' },
      { rol:'Raporlama', eylem:'Segment raporu alır', sistem:'{{FAGLL03}}, {{FAGLB03}}' },
    ],

    veriAkisi:{
      nereden:'Kullanıcının girdiği belge; masraf yeri → kâr merkezi türetmesi; ' +
              'kalem kategorisi ↔ hesap eşleşmesi; bölme kuralları.',
      nereye:'{{ACDOCA}} (S/4) veya {{FAGLFLEXA}}/{{FAGLFLEXT}} (ECC); {{FAGL_SPLINFO}}; ' +
             '{{BKPF}}/{{BSEG}} (giriş görünümü olarak korunur).',
      tetikleyen:'Her FI belgesi — bölme etkinse istisnasız.',
      sonraki:'Segment/kâr merkezi bazlı raporlama, kapatma işlemleri, dönem sonu.',
    },

    notlar:[
      { tip:'tip', baslik:'İki görünüm: giriş ve genel defter', metin:
        'New G/L’de her belgenin **iki görünümü** vardır ve bu ayrım kafa karıştırır:\n\n' +
        '**Giriş görünümü (entry view):** kullanıcının girdiği hâl. ' +
        '3 satır girdiyse burada 3 satır görünür. {{BSEG}} bu görünümü taşır.\n\n' +
        '**Genel defter görünümü (G/L view):** bölme sonrası hâl. ' +
        '3 satır 6 satıra çıkmış olabilir. {{ACDOCA}} / {{FAGLFLEXA}} bu görünümü taşır.\n\n' +
        '{{FB03}}’te belge açıldığında iki görünüm arasında geçiş yapılabilir. ' +
        '"Ben 3 satır girdim, neden 6 satır var?" sorusunun cevabı budur — ' +
        've bu bir hata değil, bölmenin **çalıştığının kanıtıdır**.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'New G/L’in muhasebe etkisi tek bir örnekte görülür: **bölmesiz ve bölmeli aynı fatura**. ' +
      'Tutarlar aynıdır, hesaplar aynıdır — değişen, satırların taşıdığı **boyutlardır**.',

    etkilenenHesaplar:[
      { hesap:'Tüm bilanço hesapları', tur:'Bilanço', neden:'Bölme sayesinde artık kâr merkezi/segment taşırlar — klasik yapıda taşımazlardı.' },
      { hesap:'320 Satıcılar', tur:'Bilanço — Kaynak', neden:'Gider satırlarının oranında bölünür; her parça bir kâr merkezine ait olur.' },
      { hesap:'191 İndirilecek KDV', tur:'Bilanço — Varlık', neden:'Vergi satırı da bölünür — segment bilançosunun tamamlanması için gerekli.' },
      { hesap:'Sıfır bakiye kapatma hesabı', tur:'Bilanço — Teknik', neden:'Boyut bazında denge sağlanamadığında sistem bu hesabı kullanır.' },
      { hesap:'120 Alıcılar', tur:'Bilanço — Varlık', neden:'Satış tarafında aynı mantık; gelir satırlarının oranında bölünür.' },
    ],

    fisler:[
      { baslik:'**Bölmesiz** (klasik ana muhasebe) — segment bilançosu çıkmaz',
        belgeTuru:'KR', tarih:'10.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Gider — Üretim (KM: 1000)', borc:60000, not:'Kâr merkezi **var**' },
          { hesap:'770', ad:'Gider — Hizmet (KM: 2000)', borc:40000, not:'Kâr merkezi **var**' },
          { hesap:'191', ad:'İndirilecek KDV', borc:20000, not:'Kâr merkezi **YOK**' },
          { hesap:'320', ad:'Satıcılar', alacak:120000, not:'Kâr merkezi **YOK**' },
        ],
        not:'Gider satırları kâr merkezi taşıyor ama **satıcı ve KDV taşımıyor**.\n\n' +
             'Sonuç: "Üretim biriminin satıcılara borcu ne kadar?" sorusunun cevabı **yok**. ' +
             'Gelir tablosu ayrıştırılabilir, **bilanço ayrıştırılamaz**.' },

      { baslik:'**Bölmeli** (New G/L) — aynı fatura, 6 satır',
        belgeTuru:'KR', tarih:'10.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Gider — Üretim (KM: 1000)', borc:60000 },
          { hesap:'770', ad:'Gider — Hizmet (KM: 2000)', borc:40000 },
          { hesap:'191', ad:'İndirilecek KDV (KM: 1000)', borc:12000, not:'**%60 → Üretim**' },
          { hesap:'191', ad:'İndirilecek KDV (KM: 2000)', borc:8000, not:'**%40 → Hizmet**' },
          { hesap:'320', ad:'Satıcılar (KM: 1000)', alacak:72000, not:'**%60 → Üretim**' },
          { hesap:'320', ad:'Satıcılar (KM: 2000)', alacak:48000, not:'**%40 → Hizmet**' },
        ],
        not:'Kullanıcı **yine 4 satır girdi**; sistem 6 satır üretti.\n\n' +
             'Bölme oranı gider dağılımından geldi: 60.000 / 40.000 = **%60 / %40**.\n\n' +
             'Şimdi her kâr merkezi kendi içinde dengeli:\n' +
             '**Üretim:** 60.000 + 12.000 = 72.000 borç, 72.000 alacak ✓\n' +
             '**Hizmet:** 40.000 + 8.000 = 48.000 borç, 48.000 alacak ✓\n\n' +
             'Artık segment bilançosu çıkarılabilir.' },

      { baslik:'Denkleştirme satırı gereken durum — ödeme',
        belgeTuru:'ZP', tarih:'20.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar (KM: 1000)', borc:72000, not:'Bölme bilgisinden geldi' },
          { hesap:'320', ad:'Satıcılar (KM: 2000)', borc:48000, not:'Bölme bilgisinden geldi' },
          { hesap:'102', ad:'Banka (KM: 1000)', alacak:120000, not:'Banka tek kâr merkezinde' },
          { hesap:'395', ad:'Sıfır bakiye kapatma (KM: 1000)', alacak:0, not:'Denkleştirme' },
          { hesap:'395', ad:'Sıfır bakiye kapatma (KM: 2000)', borc:0, not:'Denkleştirme' },
        ],
        not:'Ödeme yapılırken satıcı borcu **bölme bilgisiyle** kapatılır ' +
             '({{FAGL_SPLINFO}} sayesinde hangi parçanın hangi kâr merkezine ait olduğu bilinir).\n\n' +
             'Ama banka tek bir kâr merkezindedir. Bu durumda Hizmet kâr merkezi ' +
             '48.000 borç taşır ama karşılığı yoktur → sistem **sıfır bakiye kapatma hesabıyla** ' +
             'iki kâr merkezi arasında teknik bir denkleştirme yapar.\n\n' +
             '*(Örnekteki 0 tutarlar gösterimi basitleştirmek içindir; gerçekte ' +
             'KM 2000’e 48.000 alacak, KM 1000’e 48.000 borç yazılır.)*' },

      { baslik:'Satış faturası — gelir tarafında bölme',
        belgeTuru:'DR', tarih:'15.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar (KM: 1000)', borc:180000, not:'**%75 → Üretim**' },
          { hesap:'120', ad:'Alıcılar (KM: 2000)', borc:60000, not:'**%25 → Hizmet**' },
          { hesap:'600', ad:'Satışlar — Üretim (KM: 1000)', alacak:150000 },
          { hesap:'600', ad:'Satışlar — Hizmet (KM: 2000)', alacak:50000 },
          { hesap:'391', ad:'Hesaplanan KDV (KM: 1000)', alacak:30000 },
          { hesap:'391', ad:'Hesaplanan KDV (KM: 2000)', alacak:10000 },
        ],
        not:'Aynı mantık satış tarafında: müşteri ve KDV satırları **gelir dağılımının oranında** ' +
             'bölünür. Böylece "Hizmet biriminin müşterilerden alacağı" sorusu cevaplanabilir.' },
    ],

    tHesaplar:[
      { hesap:'Satıcılar — Üretim segmenti', kod:'320 / KM 1000',
        borc:[{ ad:'Ödeme', tutar:72000 }],
        alacak:[{ ad:'Fatura (bölünmüş)', tutar:72000 }],
        not:'Bölme sayesinde segment bazında izlenebilir' },
      { hesap:'Satıcılar — Hizmet segmenti', kod:'320 / KM 2000',
        borc:[{ ad:'Ödeme', tutar:48000 }],
        alacak:[{ ad:'Fatura (bölünmüş)', tutar:48000 }],
        not:'Klasik yapıda bu ayrım **mümkün değildi**' },
      { hesap:'Alıcılar — Üretim segmenti', kod:'120 / KM 1000',
        borc:[{ ad:'Satış faturası', tutar:180000 }],
        alacak:[],
        not:'Segment bilançosunun varlık tarafı' },
    ],

    notlar:[
      { tip:'warn', baslik:'Bölme oranı kimden gelir?', metin:
        'Bölme, **gelir tablosu satırlarının dağılımını** taban alır. ' +
        'Yani satıcı satırı, gider satırlarının oranında bölünür.\n\n' +
        'Peki gider satırı yoksa ne olur? Örneğin bir satıcıdan **sabit kıymet** alındığında ' +
        'karşı satır bilanço hesabıdır (varlık). Bu durumda bölme, varlık satırının ' +
        'taşıdığı boyuttan türetilir.\n\n' +
        'Ya hiçbir satır boyut taşımıyorsa? O zaman **varsayılan atama** devreye girer ' +
        '(genelde bir "dummy" kâr merkezi). Bu, yapılandırmada tanımlanmalıdır — ' +
        'tanımlanmazsa belge **kaydedilemez** ve kullanıcı ' +
        '*"Ledger 0L: document splitting error"* hatası alır.\n\n' +
        'Bu hatanın teşhisi hep aynıdır: **hangi satır hangi boyutu taşımıyor?**' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'New G/L’in üç ana yeteneği vardır ve **her biri ayrı ayrı açılabilir**: ' +
      'belge bölme, paralel defter, gerçek zamanlı FI–CO entegrasyonu. ' +
      'Belge bölmenin de kendi içinde çeşitleri vardır.',

    liste:[
      { ad:'Pasif bölme', en:'Passive Splitting',
        aciklama:'Sonraki belge, önceki belgenin bölme bilgisini **devralır**.',
        neZaman:'Ödeme, kapatma, ters kayıt gibi bir önceki belgeye bağlı işlemlerde.',
        ornek:'Faturada satıcı %60/%40 bölünmüşse, ödemede de aynı oran uygulanır. ' +
              'Bilgi {{FAGL_SPLINFO}}’dan okunur. **Yapılandırma gerektirmez.**' },

      { ad:'Aktif bölme', en:'Active Splitting',
        aciklama:'Sistem, bölme kurallarına göre satırı **kendisi böler**.',
        neZaman:'Fatura gibi bölme bilgisinin ilk kez üretildiği belgelerde.',
        ornek:'Satıcı satırı, gider satırlarının oranında bölünür. ' +
              '**Kalem kategorisi ve iş işlemi** yapılandırmasına dayanır.' },

      { ad:'Sıfır bakiye denkleştirmesi', en:'Zero-Balance Clearing',
        aciklama:'Boyut bazında denge sağlanamadığında sistem teknik bir denkleştirme satırı üretir.',
        neZaman:'İki kâr merkezi arasında değer aktarımı olan işlemlerde (ödeme, transfer).',
        ornek:'Banka tek kâr merkezindeyken iki kâr merkezinin borcu ödendiğinde. ' +
              'Ayrı bir "sıfır bakiye kapatma" hesabı tanımlanmalıdır.' },

      { ad:'Bölme karakteristiği', en:'Splitting Characteristic',
        aciklama:'Hangi boyutta bölme yapılacağını belirler.',
        neZaman:'Yapılandırmada; **sonradan değiştirilmesi çok maliyetlidir**.',
        ornek:'Kâr merkezi, segment, iş alanı, fon. Her biri için "sıfır bakiye" ve ' +
              '"zorunlu alan" ayarı ayrıca yapılır.' },

      { ad:'Kalem kategorisi', en:'Item Category',
        aciklama:'Her hesabın bölme açısından **ne tür bir kalem** olduğunu söyler.',
        neZaman:'Her hesap için tanımlanmalıdır — eksikse belge kaydedilemez.',
        ornek:'01000 satıcı, 02000 müşteri, 03000 stok, 20000 gider, 30000 gelir, 05100 vergi.' },

      { ad:'Paralel defter', en:'Parallel Ledger',
        aciklama:'Aynı işlemi birden çok muhasebe standardına göre kaydetme.',
        neZaman:'IFRS + yerel mevzuat birlikte raporlanacaksa.',
        ornek:'Ayrıntısı {{parallel-ledger}} konusundadır.',
        tcodes:['FB01L','FINSC_LEDGER'] },

      { ad:'Gerçek zamanlı FI–CO entegrasyonu', en:'Real-Time Integration CO→FI',
        aciklama:'CO içindeki değer aktarımları (masraf yeri dağıtımı vb.) **anında** FI’a yansır.',
        neZaman:'CO kullanılan her kurulumda.',
        ornek:'Klasik yapıda bu aktarım ay sonunda toplu yapılırdı ve FI–CO farkı doğardı; ' +
              'New G/L’de fark oluşamaz.' },

      { ad:'Segment', en:'Segment',
        aciklama:'IFRS 8 raporlaması için tasarlanmış, kâr merkezinden **türetilen** boyut.',
        neZaman:'Segment bazlı raporlama zorunluysa.',
        ornek:'Kâr merkezi ana verisinde segment alanı doldurulur; sistem otomatik türetir.' },
    ],

    karsilastirmaBasliklar:['Klasik Ana Muhasebe', 'New G/L', 'S/4HANA ({{ACDOCA}})'],
    karsilastirma:[
      ['Toplam tablosu', '{{GLT0}}', '{{FAGLFLEXT}}', '**Toplam tablosu yok** — anlık toplanır'],
      ['Kalem tablosu', '{{BSEG}}', '{{FAGLFLEXA}}', '**{{ACDOCA}}**'],
      ['Belge bölme', 'Yok', '**Var**', 'Var'],
      ['Paralel defter', 'Yok (özel çözümler)', '**Var**', 'Var'],
      ['Segment bilançosu', 'Çıkarılamaz', '**Çıkarılabilir**', 'Çıkarılabilir'],
      ['FI–CO entegrasyonu', 'Ay sonu toplu aktarım', 'Gerçek zamanlı', '**Aynı tabloda** — aktarım kavramı yok'],
      ['Kâr merkezi muhasebesi', 'Ayrı defter (EC-PCA)', 'G/L içinde', 'G/L içinde'],
      ['Mutabakat ihtiyacı', 'Yüksek', 'Düşük', '**Yapısal olarak imkânsız**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FAGLL03', ad:'G/L hesap kalemleri (New G/L) — defter ve boyut bazlı',
        amac:'Ana muhasebe kalemlerini defter, segment ve kâr merkezi filtreleriyle listeler.',
        neZaman:'Segment/kâr merkezi bazlı analiz gerektiğinde; bölmenin doğru çalıştığını doğrularken.',
        adimlar:[
          { baslik:'Hesap ve şirket kodunu gir' },
          { baslik:'**Defteri seç**', aciklama:'Boş bırakılırsa lider defter (0L) kullanılır. ' +
                   'IFRS defterini görmek için ilgili defter kodu girilir.' },
          { baslik:'Boyut filtresi uygula', aciklama:'Kâr merkezi, segment, bölüm — ' +
                   '{{FBL3N}}’de bulunmayan alanlar.' },
          { baslik:'Kalemleri incele', aciklama:'Bölünmüş satırlar **ayrı ayrı** görünür.' },
        ],
        ekranAkisi:[
          { ekran:'Seçim', islem:'Hesap 320000 · Şirket 1000 · Defter **0L**' },
          { ekran:'Boyut', islem:'Kâr merkezi = 2000 (Hizmet)' },
          { ekran:'Sonuç', islem:'Yalnızca Hizmet segmentine düşen satıcı borcu' },
        ],
        alanlar:{
          zorunlu:['Hesap','Şirket kodu'],
          opsiyonel:['Defter','Kâr merkezi','Segment','Bölüm','Tarih aralığı'] },
        hatalar:[
          { mesaj:'Rapor boş dönüyor ama FBL3N’de kalem var', sebep:'Yanlış defter seçilmiş veya bölme boyutu farklı.', cozum:'Defteri boş bırak (lider defter) ve boyut filtrelerini kaldırarak yeniden dene.' },
        ],
        ipucu:'**{{FBL3N}} ile {{FAGLL03}} farkı:** {{FBL3N}} {{BSEG}}’den (giriş görünümü) okur, ' +
              '{{FAGLL03}} genel defter görünümünden okur. ' +
              'Bölme etkinse ikisi **farklı satır sayısı** gösterir — bu bir hata değil, ' +
              'iki farklı görünümdür. Segment analizinde daima {{FAGLL03}} kullanılır.',
        ilgili:['FAGLB03','FBL3N','FB03'] },

      { kod:'FAGLB03', ad:'G/L hesap bakiyeleri (New G/L)',
        amac:'Hesap bakiyelerini defter ve boyut bazında gösterir.',
        neZaman:'Segment bilançosu kontrolünde; dönem bazlı bakiye analizinde.',
        adimlar:[
          { baslik:'Hesap, şirket kodu ve mali yılı gir' },
          { baslik:'Defteri seç', aciklama:'Farklı defterlerde farklı bakiye görebilirsin — ' +
                   'paralel muhasebenin göstergesi.' },
          { baslik:'Boyut kır', aciklama:'Kâr merkezi/segment bazında bakiye dağılımı.' },
        ],
        ipucu:'Segment bilançosunun **dengeli olup olmadığını** kontrol etmenin en hızlı yolu: ' +
              'her segment için toplam borç ve alacak bakiyesini karşılaştır. ' +
              'Eşit değilse bölme yapılandırmasında eksik vardır.',
        ilgili:['FAGLL03','FS10N'] },

      { kod:'FB03', ad:'Belgeyi görüntüle — iki görünüm',
        amac:'Belgeyi hem giriş görünümünde hem genel defter görünümünde gösterir.',
        neZaman:'Bölmenin ne yaptığını anlamak için; bölme sorunlarını teşhis ederken.',
        adimlar:[
          { baslik:'Belge numarasını gir' },
          { baslik:'**Giriş görünümünü** incele', aciklama:'Kullanıcının girdiği satırlar.' },
          { baslik:'**Genel defter görünümüne** geç',
            aciklama:'Bölünmüş satırlar ve türetilen boyutlar burada görünür.' },
          { baslik:'Farkı karşılaştır', aciklama:'Satır sayısı ve boyut atamaları — ' +
                   'bölmenin ne yaptığının en net kanıtı.' },
        ],
        ipucu:'Belge bölmeyi öğrenmenin **en etkili yolu** budur: aynı belgeyi iki görünümde ' +
              'yan yana koymak. Anlatılan her kural, burada somut satırlar olarak görünür.',
        ilgili:['FAGLL03','FB60','FB70'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'New G/L’in tablo mimarisi, klasik yapının üzerine **eklenerek** kuruldu: ' +
      '{{BKPF}}/{{BSEG}} giriş görünümü olarak kaldı, genel defter görünümü için ' +
      '{{FAGLFLEXA}}/{{FAGLFLEXT}} eklendi. S/4HANA bunların yerine **{{ACDOCA}}**’yı getirdi.',

    liste:[
      { ad:'ACDOCA', baslik:'Evrensel kayıt defteri — S/4HANA’nın tek kalem tablosu',
        tutar:'FI ve CO satırlarının tamamı; defter, kâr merkezi, segment, masraf yeri, ' +
              'malzeme ve sekize kadar para birimi aynı satırda.',
        olusturan:'Her FI/CO belgesi',
        guncelleyen:'Belge kaydı; toplam tablosu **yoktur** — toplamlar anlık hesaplanır',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{BKPF}} ile belge anahtarı üzerinden; {{T881}} ile defter üzerinden.',
        s4:'**S/4HANA’nın merkezi tablosu.** {{FAGLFLEXA}}, {{FAGLFLEXT}}, {{GLT0}}, ' +
           'COEP ve daha fazlasının yerini aldı.',
        alanlar:[
          { ad:'RLDNR', aciklama:'**Defter** — 0L lider defter, 2L/3L ek defterler', tip:'pk' },
          { ad:'RACCT', aciklama:'G/L hesabı' },
          { ad:'PRCTR', aciklama:'{{kar-merkezi}} — bölme sayesinde bilanço satırlarında da dolu' },
          { ad:'SEGMENT', aciklama:'Segment — kâr merkezinden türetilir' },
          { ad:'KOSTL', aciklama:'Masraf yeri — CO boyutu, aynı satırda' },
          { ad:'HSL / WSL / KSL', aciklama:'Yerel / işlem / grup para birimi tutarları' },
        ] },

      { ad:'FAGLFLEXA', baslik:'New G/L kalem tablosu (ECC)',
        tutar:'Genel defter görünümündeki kalemler — bölünmüş satırlar dâhil.',
        olusturan:'Her FI belgesi (New G/L etkinse)',
        guncelleyen:'Belge kaydı',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{BSEG}} giriş görünümü, FAGLFLEXA genel defter görünümü.',
        s4:'**{{ACDOCA}} ile değiştirildi**; uyumluluk görünümü olarak okunabilir.',
        alanlar:[
          { ad:'RLDNR', aciklama:'Defter' },
          { ad:'PRCTR', aciklama:'Kâr merkezi — bölme sonucu' },
          { ad:'DOCLN', aciklama:'Satır numarası — bölme sonrası satır sayısı artabilir' },
        ] },

      { ad:'FAGLFLEXT', baslik:'New G/L toplam tablosu (ECC)',
        tutar:'Hesap × defter × boyut bazında dönemsel toplamlar.',
        olusturan:'Belge kaydı (paralel güncelleme)',
        s4:'**Kaldırıldı.** S/4HANA’da toplam tablosu yoktur; {{ACDOCA}} anlık toplanır. ' +
           'Toplam ile kalem arasında **tutarsızlık oluşamaz**.',
        alanlar:[
          { ad:'RLDNR', aciklama:'Defter' },
          { ad:'RACCT', aciklama:'Hesap' },
          { ad:'HSL01…HSL16', aciklama:'Dönem bazında toplamlar' },
        ] },

      { ad:'FAGL_SPLINFO', baslik:'Belge bölme bilgisi',
        tutar:'Her kaleme bölme sonucu atanan karakteristikler.',
        olusturan:'Bölme etkinse her FI belgesi',
        guncelleyen:'Kapatma işlemleri bu bilgiyi **okur**',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'Pasif bölmenin kaynağı — ödeme ve kapatma bu tablodan okur.',
        s4:'Duruyor; sonuç ayrıca {{ACDOCA}} satırlarına yansır.',
        alanlar:[
          { ad:'PRCTR', aciklama:'Kaleme atanan kâr merkezi' },
          { ad:'SEGMENT', aciklama:'Kaleme atanan segment' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri — giriş görünümü',
        tutar:'Kullanıcının girdiği hâliyle satırlar. Bölme burada **görünmez**.',
        olusturan:'Belge kaydı',
        s4:'{{uyumluluk-view}}; {{ACDOCA}}’dan türetilir.' },

      { ad:'T881', baslik:'Defter tanımları',
        tutar:'Lider ve ek defterler.',
        olusturan:'{{FINSC_LEDGER}}',
        s4:'{{ACDOCA}} her satırda `RLDNR` taşır.' },
    ],

    er:{
      type:'er',
      baslik:'Giriş görünümü ↔ genel defter görünümü',
      varliklar:[
        { ad:'BKPF', rol:'FI', hub:true, aciklama:'Belge başlığı — **ortak**',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }] },
        { ad:'BSEG', rol:'Giriş görünümü', aciklama:'Kullanıcının girdiği satırlar',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'ACDOCA', rol:'Genel defter görünümü', aciklama:'**Bölünmüş** satırlar + boyutlar',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }, { ad:'PRCTR' }, { ad:'SEGMENT' }] },
        { ad:'FAGL_SPLINFO', rol:'Bölme', aciklama:'Bölme bilgisi — pasif bölmenin kaynağı',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'fk' }, { ad:'PRCTR' }] },
        { ad:'T881', rol:'Özelleştirme', aciklama:'Defter tanımı',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'XLEADING' }] },
        { ad:'FAGLFLEXA', rol:'ECC', aciklama:'ECC kalem tablosu',
          alanlar:[{ ad:'RLDNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'PRCTR' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'giriş görünümü' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'**genel defter görünümü**' },
        { from:'BSEG', to:'FAGL_SPLINFO', alanlar:'BELNR + BUZEI', not:'bölme sonucu' },
        { from:'FAGL_SPLINFO', to:'ACDOCA', alanlar:'PRCTR / SEGMENT', not:'boyut ataması' },
        { from:'T881', to:'ACDOCA', alanlar:'RLDNR', not:'defter' },
        { from:'BKPF', to:'FAGLFLEXA', alanlar:'BELNR', not:'ECC karşılığı' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'New G/L’de kullanıcı ekranları değişmez; değişen **yapılandırma ekranlarıdır**. ' +
      'FI danışmanının burada aldığı kararlar geri dönüşü zor kararlardır.',

    ekranlar:[
      { ad:'Belge bölme karakteristikleri (SPRO)',
        aciklama:'Hangi boyutta bölme yapılacağı ve her boyut için denge kuralı.',
        alanlar:[
          { ad:'Karakteristik', zorunlu:true, aciklama:'Kâr merkezi, segment, iş alanı, fon. ' +
                   '**Sonradan eklemek çok maliyetlidir.**' },
          { ad:'Sıfır bakiye', zorunlu:false, aciklama:'İşaretlenirse bu boyut **kendi içinde dengeli** ' +
                   'olmak zorundadır; sistem gerekirse denkleştirme satırı üretir. ' +
                   'Segment bilançosu için **zorunludur**.' },
          { ad:'Zorunlu alan', zorunlu:false, aciklama:'İşaretlenirse boyut boş bırakılamaz; ' +
                   'türetilemezse belge **kaydedilemez**.' },
        ],
        ipucu:'"Sıfır bakiye" ve "zorunlu alan" ikilisi tasarımın kalbidir. ' +
              'İkisi de açıksa segment bilançosu garanti altındadır ' +
              'ama **her belgenin** boyut türetebilmesi gerekir. ' +
              'Türetilemeyen tek bir senaryo bile üretimi durdurur — ' +
              'bu yüzden varsayılan atama kuralları baştan tanımlanmalıdır.' },

      { ad:'Kalem kategorisi ataması (SPRO)',
        aciklama:'Her G/L hesabının bölme açısından ne tür bir kalem olduğu.',
        alanlar:[
          { ad:'Hesap aralığı', zorunlu:true, aciklama:'Hesap planındaki aralıklar.' },
          { ad:'Kalem kategorisi', zorunlu:true, aciklama:'01000 satıcı · 02000 müşteri · ' +
                   '03000 stok · 05100 vergi · 20000 gider · 30000 gelir · 04000 nakit' },
        ],
        ipucu:'**Yeni açılan bir hesap için kalem kategorisi atanmazsa** o hesabı içeren ' +
              'her belge *"document splitting error"* verir. ' +
              'Hesap açma prosedürüne bu kontrol eklenmelidir — ' +
              'canlıda en sık karşılaşılan bölme hatası budur.' },

      { ad:'İş işlemi ve varyantı (SPRO)',
        aciklama:'Hangi işlem tipinde hangi kalem kategorilerinin bulunabileceği.',
        alanlar:[
          { ad:'İş işlemi', zorunlu:true, aciklama:'0300 satıcı faturası, 0200 müşteri faturası, ' +
                   '1000 ödeme, 0000 diğer.' },
          { ad:'Varyant', zorunlu:true, aciklama:'İşlemin izin verdiği kalem kategorisi kümesi.' },
        ],
        ipucu:'Bu ekran, bölme kurallarının "hangi durumda ne yapılacağını" tanımlar. ' +
              'Standart varyantlar çoğu senaryoyu kapsar; özel senaryo için ' +
              'kopyalanıp uyarlanır — **standart varyant doğrudan değiştirilmez**.' },

      { ad:'{{FB03}} — iki görünüm karşılaştırması',
        aciklama:'Bölmenin sonucunu görmenin ve teşhis etmenin ana ekranı.',
        alanlar:[
          { ad:'Giriş görünümü', zorunlu:false, aciklama:'Kullanıcının girdiği satırlar ({{BSEG}}).' },
          { ad:'Genel defter görünümü', zorunlu:false, aciklama:'Bölünmüş satırlar ({{ACDOCA}}).' },
          { ad:'Defter seçimi', zorunlu:false, aciklama:'Farklı defterlerde farklı satırlar görünebilir.' },
        ],
        ipucu:'Bölme hatası teşhisinde ilk adım: **hatasız kaydedilebilen benzer bir belgeyi** ' +
              'iki görünümde aç ve sorunlu belgeyle karşılaştır. ' +
              'Fark, eksik yapılandırmayı doğrudan gösterir.' },
    ],

    zorunlu:['Bölme karakteristiği','Kalem kategorisi ataması','İş işlemi varyantı','Sıfır bakiye kapatma hesabı'],
    opsiyonel:['Segment türetme kuralı','Varsayılan kâr merkezi','Ek defterler'],

    hatalar:[
      { mesaj:'Ledger 0L: document splitting error / Balancing field "Profit Center" in line item 001 not filled', sebep:'Satır bölme karakteristiğini türetemiyor — en sık sebep hesaba **kalem kategorisi atanmamış** olması.', cozum:'Hesabın kalem kategorisi atamasını kontrol et; yoksa ata. Varsayılan kâr merkezi kuralı tanımlıysa devreye girer.' },
      { mesaj:'Item category ... not allowed in business transaction ...', sebep:'İşlem varyantı bu kalem kategorisine izin vermiyor.', cozum:'İş işlemi varyantını genişlet veya doğru işlem tipini kullan. Standart varyantı değiştirme, kopyala.' },
      { mesaj:'Account ... requires an assignment to a CO object', sebep:'Gelir tablosu hesabı CO nesnesi (masraf yeri/iç sipariş) bekliyor.', cozum:'Kayıtta masraf yeri gir veya hesap için varsayılan atama ({{OKB9}}) tanımla.' },
      { mesaj:'Segment bilançosu dengesiz çıkıyor', sebep:'Sıfır bakiye ayarı işaretlenmemiş veya denkleştirme hesabı tanımsız.', cozum:'Bölme karakteristiğinde "sıfır bakiye"yi işaretle ve kapatma hesabını tanımla. **Geçmiş belgeler düzelmez** — yalnızca yeni belgeler doğru olur.' },
      { mesaj:'FBL3N ve FAGLL03 farklı satır sayısı gösteriyor', sebep:'Bu bir hata değildir: {{FBL3N}} giriş görünümünü, {{FAGLL03}} genel defter görünümünü okur.', cozum:'Segment analizinde daima {{FAGLL03}} kullan.' },
    ],

    ipuclari:[
      '**Belge bölmeyi canlıya geçtikten sonra açmaya çalışma.** Kapalı dönemlerdeki belgeler ' +
      'bölünmemiş kalır; segment bilançosu geçmiş dönemler için asla tutmaz.',
      'Yeni hesap açma prosedürüne **kalem kategorisi ataması** kontrolünü ekle — ' +
      'canlıdaki bölme hatalarının çoğu bu eksiklikten doğar.',
      'Bölmeyi anlamak için {{FB03}}’te aynı belgeyi iki görünümde karşılaştır; ' +
      'teorik anlatımdan çok daha hızlı öğretir.',
      'Segment analizinde {{FBL3N}} değil **{{FAGLL03}}** kullan.',
      'Varsayılan kâr merkezi kuralını baştan tanımla — türetilemeyen tek senaryo üretimi durdurur.',
      'Bölme karakteristiklerini **mümkün olduğunca az** tut; her karakteristik ' +
      'her belgede türetilebilmek zorundadır.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Belge başlığı — her iki görünümde ortak' },
      { tablo:'BSEG', ne:'**Giriş görünümü** — kullanıcının girdiği satırlar' },
      { tablo:'ACDOCA', ne:'**Genel defter görünümü** (S/4) — bölünmüş satırlar + tüm boyutlar' },
      { tablo:'FAGLFLEXA', ne:'Genel defter görünümü (ECC)' },
      { tablo:'FAGLFLEXT', ne:'Toplamlar (ECC) — S/4’te kaldırıldı' },
      { tablo:'FAGL_SPLINFO', ne:'Bölme bilgisi — pasif bölmenin kaynağı' },
    ],

    commit:
      'Bölme, belge kaydının **içinde** yapılır — ayrı bir adım veya arka plan işi değildir. ' +
      '{{BSEG}}, {{ACDOCA}} ve {{FAGL_SPLINFO}} **aynı LUW’da** yazılır.\n\n' +
      'Bunun pratik sonucu: bölme başarısız olursa **belge hiç kaydedilmez**. ' +
      'Yarı bölünmüş belge diye bir şey yoktur. ' +
      'Bu, MM entegrasyonundaki "gürültülü hata" davranışının bir benzeridir ve iyidir — ' +
      'sessiz veri bozulması yerine açık hata alınır.',

    belgeNo:
      'Bölme belge numarasını etkilemez; giriş ve genel defter görünümü **aynı numarayı** paylaşır. ' +
      'Değişen yalnızca satır numaralarıdır: {{BSEG}}’de `BUZEI`, {{ACDOCA}}’da `DOCLN`.',

    postingLogic:
      'Bölme algoritmasının adımları:\n\n' +
      '**1.** Belge türünden **iş işlemi** belirlenir (satıcı faturası, ödeme, vb.).\n' +
      '**2.** Her satırın hesabından **kalem kategorisi** okunur.\n' +
      '**3.** İşlem varyantı, bu kategori kombinasyonuna izin veriyor mu diye kontrol edilir.\n' +
      '**4.** Bölme kuralı, hangi satırın hangi satırın oranında bölüneceğini söyler ' +
      '(genelde bilanço satırları, gelir tablosu satırlarının oranında).\n' +
      '**5.** Boyutlar türetilir; türetilemezse varsayılan atama devreye girer.\n' +
      '**6.** Sıfır bakiye işaretliyse boyut bazında denge kontrol edilir; ' +
      'gerekirse **denkleştirme satırı** üretilir.\n' +
      '**7.** Sonuç {{ACDOCA}}’ya, bölme bilgisi {{FAGL_SPLINFO}}’ya yazılır.\n\n' +
      'Sonraki belgeler (ödeme, kapatma) 4. adımı atlar ve doğrudan {{FAGL_SPLINFO}}’dan okur — ' +
      'bu **pasif bölmedir**.',

    belgeTuru:
      'Belge türü, **iş işlemini** belirlediği için bölmeyi doğrudan etkiler. ' +
      'KR (satıcı faturası) ile SA (G/L kaydı) farklı bölme kuralları tetikler.\n\n' +
      'Pratik sonuç: aynı muhasebe etkisini yaratan iki kayıt, farklı belge türleriyle girildiğinde ' +
      '**farklı bölünebilir**. Bu yüzden "aynı işlemi hep aynı işlemle gir" disiplini ' +
      'New G/L’de daha da önemlidir.',

    numberRange:
      'Ek defterler için ayrı numara aralığı gerekmez — belge numarası ortaktır. ' +
      'Ancak yalnızca belirli bir deftere yapılan kayıtlar ({{FB01L}}) için ' +
      'ayrı belge türü ve aralık tanımlamak yaygın bir pratiktir; ' +
      'bu, defter bazlı düzeltmelerin raporda ayrışmasını kolaylaştırır.',

    accountDetermination:
      'Bölmenin kendi hesap belirlemesi yoktur ama **sıfır bakiye kapatma hesabı** tanımlanmalıdır. ' +
      'Bu hesap teknik bir hesaptır: boyutlar arası denkleştirme satırları buraya yazılır ve ' +
      '**şirket toplamında daima sıfırlanır**.\n\n' +
      'Hesap {{FS00}}’da "yalnızca otomatik kayıt" olarak açılmalıdır; ' +
      'elle kayıt atılırsa segment dengesi bozulur.',

    tur:
      '**Özelleştirme:** bölme karakteristikleri, kalem kategorisi atamaları, iş işlemi varyantları, ' +
      'defter tanımları, sıfır bakiye kapatma hesabı.\n\n' +
      '**Ana veri:** kâr merkezi (segment alanı dâhil), masraf yeri, G/L hesabı.\n\n' +
      '**Hareket verisi:** {{ACDOCA}} satırları, {{FAGL_SPLINFO}}.',

    transport:
      'Bölme yapılandırması normal şekilde taşınır. **Ama şu tuzağa dikkat:** ' +
      'kalem kategorisi atamaları **hesap aralıklarına** dayanır. ' +
      'Hedef sistemde farklı hesap numaraları kullanılıyorsa veya yeni hesaplar açılmışsa ' +
      'aralıklar boşluk bırakabilir.\n\n' +
      'Sonuç: testte sorunsuz çalışan bölme, canlıda belirli hesaplarda ' +
      '*"document splitting error"* verir. **Geçişte hesap aralıklarının kapsamı doğrulanmalıdır.**',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe Muhasebesi → İş İşlemleri → Belge Bölme → Belge Bölme Karakteristiklerini Tanımla', not:'Kâr merkezi, segment · sıfır bakiye · zorunlu alan' },
      { yol:'SPRO → … → Belge Bölme → G/L Hesaplarını Kalem Kategorilerine Ata', not:'**En sık unutulan adım**' },
      { yol:'SPRO → … → Belge Bölme → İş İşlemi Varyantlarını Tanımla', not:'Standart varyantı kopyala, değiştirme' },
      { yol:'SPRO → … → Belge Bölme → Belge Bölmeyi Etkinleştir', not:'Şirket kodu bazında kapatılabilir' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe Muhasebesi → Ana Ayarlar → Defterler → Defterleri Tanımla', not:'{{FINSC_LEDGER}}' },
    ],

    ekstra:[
      { ic:'⏳', baslik:'Belge bölme neden sonradan açılamaz?', metin:
        'Teknik olarak açılabilir. Ama sonucu kullanılamaz ve sebebi şudur:\n\n' +
        'Bölme yalnızca **açıldıktan sonra kaydedilen** belgelere uygulanır. ' +
        'Geçmiş belgeler bölünmemiş kalır — {{ACDOCA}}’daki satırlarında ' +
        'satıcı/müşteri/vergi kalemleri **boyutsuzdur**.\n\n' +
        'Sonuç: 2027 Haziran’da bölmeyi açarsanız, Haziran öncesi için ' +
        'segment bilançosu **asla tutmaz**. Açılış bakiyeleri boyutsuzdur, ' +
        'kapanan borçlar bölme bilgisi olmadığı için kapatılamaz, ' +
        'karşılaştırmalı raporlar anlamsızlaşır.\n\n' +
        'SAP bu geçiş için özel araçlar sunar (migration servisi) ama süreç ' +
        'ayrı bir proje büyüklüğündedir ve genelde **mali yıl başına** denk getirilir.\n\n' +
        '**Danışmanlık kuralı:** belge bölme kararı, kurulumun *ilk haftasında* alınır. ' +
        '"Şimdilik kapalı kalsın, sonra açarız" en pahalı FI kararlarından biridir.' },

      { ic:'🔄', baslik:'Aktif ve pasif bölme — neden ikisi de gerekli?', metin:
        '**Aktif bölme** faturada çalışır: satıcı satırı, gider satırlarının oranında bölünür. ' +
        'Kural tabanlıdır, yapılandırmaya dayanır.\n\n' +
        '**Pasif bölme** ödemede çalışır: sistem faturanın bölme bilgisini ' +
        '{{FAGL_SPLINFO}}’dan okur ve **aynı oranı** uygular. Kural aramaz.\n\n' +
        'İkisi neden farklı? Çünkü ödeme belgesinde bölmeyi türetecek bir gelir tablosu satırı ' +
        'yoktur — sadece satıcı ve banka vardır. Kural tabanlı bölme burada çalışamaz.\n\n' +
        'Pasif bölmenin sonucu şudur: **fatura nasıl bölündüyse, ödemesi de öyle bölünür.** ' +
        'Bu, kapatmanın boyut bazında tutarlı kalmasını sağlar. ' +
        '{{FAGL_SPLINFO}} silinirse veya bozulursa kapatma işlemleri hata verir — ' +
        'tablonun kritikliği buradan gelir.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Kalem kategorisi atanmamış hesap = duran üretim', metin:
        'Yeni bir G/L hesabı açıldığında **kalem kategorisi atanmazsa** o hesabı içeren ' +
        'her belge *"document splitting error"* verir ve **kaydedilemez**.\n\n' +
        'Bu, canlıdaki en sık New G/L sorunudur ve tipik senaryosu şudur: ' +
        'ay sonunda yeni bir gider hesabı açılır, ilk kayıt denenir, hata alınır, ' +
        'kimse sebebi bilmez, kapanış gecikir.\n\n' +
        '**Önlem:** hesap açma prosedürüne kalem kategorisi kontrolünü zorunlu adım olarak ekle. ' +
        'Hesap planında hesap aralıklarını geniş tanımlamak da riski azaltır ' +
        '(örneğin 770000–779999 aralığının tamamı 20000 kategorisine atanır).' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'S/4HANA, New G/L’in hedefini **tamamladı**. New G/L farklı defterleri tek yapıda birleştirmişti; ' +
      '{{ACDOCA}} ile FI ve CO da **aynı tabloya** taşındı. ' +
      'Toplam tabloları kaldırıldı — toplam ile kalem arasında tutarsızlık **yapısal olarak imkânsız** hâle geldi.',

    eccFarklari:[
      { konu:'Kalem tablosu', ecc:'{{FAGLFLEXA}} + COEP (CO ayrı)', s4:'**{{ACDOCA}}** — FI ve CO birlikte' },
      { konu:'Toplam tablosu', ecc:'{{FAGLFLEXT}}, {{GLT0}}', s4:'**Yok** — anlık toplanır' },
      { konu:'FI–CO mutabakatı', ecc:'Gerçek zamanlı aktarım (New G/L)', s4:'**Kavram olarak yok** — aynı tablo' },
      { konu:'Kâr merkezi muhasebesi', ecc:'G/L içinde (EC-PCA kalktı)', s4:'{{ACDOCA}} boyutu' },
      { konu:'Belge bölme', ecc:'Var', s4:'**Aynı mantık, değişmedi**' },
      { konu:'Para birimi', ecc:'3 para birimi', s4:'**8’e kadar** paralel para birimi' },
      { konu:'Defter tanımı', ecc:'Ayrı işlemler', s4:'{{FINSC_LEDGER}} tek nokta' },
    ],

    universalJournal:
      '{{ACDOCA}}, New G/L’in mantıksal devamıdır ve şu soruyu çözer: ' +
      '*"aynı işlem neden farklı tablolarda farklı şekilde duruyor?"*\n\n' +
      'ECC’de bir gider kaydı {{BSEG}}’e, {{FAGLFLEXA}}’ya, {{FAGLFLEXT}}’ye ve CO tarafında ' +
      'COEP’e yazılırdı. Dört yazma, dört tutarsızlık ihtimali, dört mutabakat.\n\n' +
      'S/4HANA’da **tek satır** vardır ve tüm boyutları taşır. ' +
      '{{BSEG}} ve {{FAGLFLEXA}} uyumluluk görünümü olarak {{ACDOCA}}’dan **türetilir** — ' +
      'yani ayrı veri değil, aynı verinin farklı okunuşudur.\n\n' +
      'Toplam tablosunun kaldırılması ayrıca şu klasik sorunu bitirdi: ' +
      '"toplam tablosu ile kalem tablosu tutmuyor" hatası artık **oluşamaz**.',

    kalkanTcodes:[
      { eski:'{{GLT0}} tabanlı raporlar', yeni:'{{FAGLL03}} / {{FAGLB03}}', not:'Klasik toplam raporları' },
      { eski:'EC-PCA kâr merkezi raporları', yeni:'{{ACDOCA}} boyut raporları', not:'Ayrı kâr merkezi defteri kalktı' },
      { eski:'—', yeni:'—', not:'{{FAGLL03}}, {{FAGLB03}}, {{FB03}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Display Line Items in General Ledger', aciklama:'{{FAGLL03}} yerine; defter ve boyut filtreli.' },
      { ad:'Display G/L Account Balances', aciklama:'{{FAGLB03}} yerine.' },
      { ad:'Manage Journal Entries', aciklama:'Belge görüntüleme ve iki görünüm karşılaştırması.' },
      { ad:'Profit Center — Balance Sheet', aciklama:'Belge bölmenin ürünü: segment/kâr merkezi bilançosu.' },
      { ad:'Trial Balance', aciklama:'Defter ve boyut bazlı mizan.' },
    ],

    compatibilityViews:[
      '{{BSEG}}, {{FAGLFLEXA}}, {{GLT0}} — **{{ACDOCA}}’dan türetilen görünümler**.',
      '{{FAGLFLEXT}} — toplam tablosu kavramı kalktığı için anlık hesaplanır.',
      'Eski özel programlar bu görünümler sayesinde çalışmaya devam eder; ' +
      'ama **yeni geliştirmeler {{ACDOCA}}’yı doğrudan okumalıdır** (performans).',
    ],

    performans:
      'En büyük kazanç toplam tablolarının kalkmasıdır: ' +
      'ECC’de her kayıt hem kalem hem toplam tablosuna yazıyordu (kilit çakışması kaynağı). ' +
      'S/4HANA’da tek yazma vardır, toplamlar okuma anında hesaplanır.\n\n' +
      'Segment/kâr merkezi raporları da belirgin şekilde hızlandı — ' +
      'boyutlar aynı satırda olduğu için birleştirme (join) gerekmez.',

    bestPractices:[
      'Geçişte belge bölme yapılandırmasını **olduğu gibi taşı**; mantık değişmedi.',
      'Kalem kategorisi atamalarında **hesap aralıklarının kapsamını** doğrula — ' +
      'yeni hesaplar aralık dışında kalabilir.',
      'Yeni geliştirmelerde {{BSEG}} yerine **{{ACDOCA}}** oku; uyumluluk görünümü yavaştır.',
      'Toplam tablosu okuyan özel raporları gözden geçir; artık gereksizdir.',
      'Paralel para birimi ihtiyacını geçişte yeniden değerlendir — S/4HANA sekize kadar destekler ' +
      've bu, sonradan eklemesi zor bir ayardır.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Segment bilançosu istendi: bölme olmadan neden çıkmıyor?',
    hikaye:
      '**Ege Holding A.Ş.** iki iş kolunda çalışıyor: **Üretim** (KM 1000) ve **Hizmet** (KM 2000). ' +
      'Yönetim kurulu, her iş kolu için ayrı bilanço istiyor: ' +
      '*"Hizmet biriminin borçları ve alacakları ne kadar?"*\n\n' +
      'Mali işler müdürü raporu hazırlamaya çalışıyor ve şu duvara çarpıyor: ' +
      'gelir tablosunu ayırabiliyor, **bilançoyu ayıramıyor**.\n\n' +
      'Bu senaryo sorunun kaynağını, belge bölmenin nasıl çözdüğünü ve ' +
      'geçişte karşılaşılan gerçek engelleri gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · TRY' },
      { k:'Kâr merkezleri', v:'1000 Üretim · 2000 Hizmet' },
      { k:'Mevcut durum', v:'Belge bölme **kapalı**' },
      { k:'İstenen', v:'Kâr merkezi bazında **tam bilanço**' },
      { k:'Örnek fatura', v:'120.000 TL (100.000 gider + 20.000 KDV)' },
    ],

    adimlar:[
      { baslik:'Mevcut durum incelenir — sorunun kaynağı', tcode:'FB03',
        aciklama:'Tipik bir satıcı faturası açılıyor ve boyutlar kontrol ediliyor.',
        girdi:[
          { alan:'Belge', deger:'1900004102 · KR · 10.06.2027' },
          { alan:'Gider satırı 1', deger:'60.000 TL · **KM 1000** ✓' },
          { alan:'Gider satırı 2', deger:'40.000 TL · **KM 2000** ✓' },
          { alan:'KDV satırı', deger:'20.000 TL · **KM yok** ' },
          { alan:'Satıcı satırı', deger:'120.000 TL · **KM yok** ' },
        ],
        fis:{ baslik:'Belge 1900004102 — bölme kapalı', belgeTuru:'KR', tarih:'10.06.2027',
          satirlar:[
            { hesap:'770', ad:'Gider — Üretim', borc:60000, not:'KM 1000' },
            { hesap:'770', ad:'Gider — Hizmet', borc:40000, not:'KM 2000' },
            { hesap:'191', ad:'İndirilecek KDV', borc:20000, not:'**KM yok**' },
            { hesap:'320', ad:'Satıcılar', alacak:120000, not:'**KM yok**' },
          ], not:'Gelir tablosu satırları boyutlu, **bilanço satırları boyutsuz**. ' +
                 'Segment bilançosunun çıkmamasının teknik sebebi tam olarak budur.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'4 satır; ikisinde `PRCTR` **boş**' },
        ],
        not:'Bu, bir hata değil klasik davranıştır: satıcı bir bilanço hesabıdır ve ' +
             'doğal olarak bir kâr merkezi taşımaz. ' +
             'Bilanço satırlarına boyut atamak, **belge bölmenin işidir**.' },

      { baslik:'Boyutsuz tutar ölçülür', tcode:'FAGLL03',
        aciklama:'Sorunun büyüklüğü sayısallaştırılıyor — karar için gerekli.',
        girdi:[
          { alan:'Hesap', deger:'320000 Satıcılar · Haziran 2027' },
          { alan:'Toplam bakiye', deger:'4.850.000 TL' },
          { alan:'KM 1000’e atanmış', deger:'0 TL' },
          { alan:'KM 2000’e atanmış', deger:'0 TL' },
          { alan:'**Boyutsuz**', deger:'**4.850.000 TL — %100**' },
        ],
        not:'Satıcı borcunun **tamamı** boyutsuz. Aynı durum müşteri (120), banka (102) ve ' +
             'vergi (191/391) hesaplarında da geçerli.\n\n' +
             'Yani segment bilançosunun **varlık ve kaynak tarafının neredeyse tamamı** eksik. ' +
             'Elle dağıtım yapmak teorik olarak mümkün ama binlerce belge için imkânsız ' +
             've her ay tekrarlanması gerekir.' },

      { baslik:'Belge bölme yapılandırılır (test sisteminde)', tcode:'SPRO',
        aciklama:'Üç yapılandırma adımı sırayla tamamlanıyor.',
        girdi:[
          { alan:'1. Karakteristik', deger:'**Kâr merkezi** · sıfır bakiye ✓ · zorunlu alan ✓' },
          { alan:'2. Kalem kategorileri', deger:'320* → 01000 satıcı · 120* → 02000 müşteri · ' +
                                              '770*/600* → 20000/30000 · 191*/391* → 05100 vergi' },
          { alan:'3. Denkleştirme hesabı', deger:'395000 Sıfır bakiye kapatma · "yalnızca otomatik kayıt"' },
          { alan:'4. Etkinleştirme', deger:'Şirket kodu 1000 için açıldı' },
        ],
        tabloEtkisi:[
          { tablo:'FAGL_SPLINFO', ne:'Bundan sonraki her belge için bölme bilgisi yazılacak' },
        ],
        not:'**"Sıfır bakiye" işareti kritiktir:** o olmadan bölme yapılır ama ' +
             'her kâr merkezinin kendi içinde dengeli olması **garanti edilmez** — ' +
             've dengesiz bir segment bilançosu, olmayan bilançodan daha kötüdür.' },

      { baslik:'İlk test — ve ilk hata', tcode:'FB60',
        aciklama:'Aynı fatura yeniden giriliyor.',
        girdi:[
          { alan:'İşlem', deger:'{{FB60}} · 100.000 + %20 KDV' },
          { alan:'**Hata**', deger:'*"Balancing field Profit Center in line item 003 not filled"*' },
          { alan:'Satır 003', deger:'KDV satırı — 191000 hesabı' },
        ],
        not:'Hesap **191000 için kalem kategorisi atanmamıştı**. ' +
             'Aralık tanımı `191000–191999` yerine `190000–190999` girilmişti — ' +
             'tek haneli bir yazım hatası.\n\n' +
             'Bu, New G/L’in en sık canlı hatasının birebir örneğidir: ' +
             '**kalem kategorisi eksikliği belgeyi tamamen kaydedilemez yapar.** ' +
             'Hata mesajı satır numarasını verdiği için teşhis hızlıdır — ' +
             'yeter ki nereye bakılacağı bilinsin.' },

      { baslik:'Düzeltme ve başarılı kayıt', tcode:'FB60',
        aciklama:'Aralık düzeltiliyor ve fatura yeniden giriliyor.',
        girdi:[
          { alan:'Düzeltme', deger:'191000–191999 → kalem kategorisi **05100 vergi**' },
          { alan:'Kullanıcının girdiği', deger:'4 satır' },
          { alan:'**Sistemin ürettiği**', deger:'**6 satır**' },
        ],
        fis:{ baslik:'Belge 1900004156 — genel defter görünümü', belgeTuru:'KR', tarih:'12.06.2027',
          satirlar:[
            { hesap:'770', ad:'Gider — Üretim (KM 1000)', borc:60000 },
            { hesap:'770', ad:'Gider — Hizmet (KM 2000)', borc:40000 },
            { hesap:'191', ad:'İndirilecek KDV (KM 1000)', borc:12000, not:'**%60 bölündü**' },
            { hesap:'191', ad:'İndirilecek KDV (KM 2000)', borc:8000, not:'**%40 bölündü**' },
            { hesap:'320', ad:'Satıcılar (KM 1000)', alacak:72000, not:'**%60 bölündü**' },
            { hesap:'320', ad:'Satıcılar (KM 2000)', alacak:48000, not:'**%40 bölündü**' },
          ], not:'Her kâr merkezi kendi içinde dengeli:\n' +
                 '**KM 1000:** 60.000 + 12.000 = 72.000 borç = 72.000 alacak ✓\n' +
                 '**KM 2000:** 40.000 + 8.000 = 48.000 borç = 48.000 alacak ✓' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'**4 satır** — giriş görünümü değişmedi' },
          { tablo:'ACDOCA', ne:'**6 satır** — genel defter görünümü, hepsi `PRCTR` dolu' },
          { tablo:'FAGL_SPLINFO', ne:'Bölme oranı kaydedildi — ödemede kullanılacak' },
        ],
        not:'{{FB03}}’te iki görünüm yan yana konduğunda fark net görünüyor: ' +
             'kullanıcı 4 satır girdi, genel defterde 6 satır var. ' +
             '**Bu bir hata değil, bölmenin çalıştığının kanıtı.**' },

      { baslik:'Ödeme — pasif bölme devreye giriyor', tcode:'F-53',
        aciklama:'Fatura ödeniyor ve bölme bilgisinin nasıl devraldığı görülüyor.',
        girdi:[
          { alan:'Ödenen', deger:'120.000 TL · banka KM 1000' },
          { alan:'Satıcı satırı', deger:'**{{FAGL_SPLINFO}}’dan** 72.000 / 48.000 olarak bölündü' },
          { alan:'Denkleştirme', deger:'395000 hesabında KM 1000 ↔ KM 2000 arası 48.000 TL' },
        ],
        not:'Ödeme belgesinde bölmeyi türetecek bir gider satırı **yok** — ' +
             'sadece satıcı ve banka var. Kural tabanlı (aktif) bölme burada çalışamaz.\n\n' +
             'Sistem faturanın bölme bilgisini {{FAGL_SPLINFO}}’dan okuyup **aynı oranı** uyguladı: ' +
             'bu **pasif bölmedir**.\n\n' +
             'Banka tek kâr merkezinde olduğu için sistem ayrıca denkleştirme satırı üretti — ' +
             'KM 2000 borcu KM 1000 bankasından ödendiği için aradaki fark ' +
             'sıfır bakiye kapatma hesabında dengelendi.' },

      { baslik:'Segment bilançosu alınır', tcode:'FAGLB03',
        aciklama:'Nihayet istenen rapor çıkarılıyor.',
        girdi:[
          { alan:'Rapor', deger:'Kâr merkezi bazlı bakiye · Haziran 2027' },
          { alan:'**KM 1000 Üretim**', deger:'Varlık 2.900.000 = Kaynak 2.900.000 ✓' },
          { alan:'**KM 2000 Hizmet**', deger:'Varlık 1.950.000 = Kaynak 1.950.000 ✓' },
          { alan:'Denkleştirme hesabı', deger:'Şirket toplamında **0 TL** ✓' },
        ],
        not:'Her segment kendi içinde dengeli ve denkleştirme hesabı şirket toplamında sıfır — ' +
             'bu **üç kontrol birlikte** sağlanıyorsa bölme doğru çalışıyor demektir.\n\n' +
             '**Ama önemli sınır:** bu rapor yalnızca **bölme açıldıktan sonraki** belgeleri kapsıyor. ' +
             'Haziran öncesi hareketler hâlâ boyutsuz.' },

      { baslik:'Geçiş kararı — mali yıl başı seçiliyor', tcode:'SPRO',
        aciklama:'Canlıya alma zamanlaması planlanıyor.',
        girdi:[
          { alan:'Seçenek 1', deger:'Hemen aç → geçmiş dönemler boyutsuz kalır, **karşılaştırmalı rapor bozulur**' },
          { alan:'Seçenek 2 ✓', deger:'**01.01.2028 mali yıl başında aç** — temiz başlangıç' },
          { alan:'Ek çalışma', deger:'Açılış bakiyeleri kâr merkezlerine dağıtılacak' },
          { alan:'Geçiş süresi', deger:'6 ay hazırlık: hesap aralıkları, test, eğitim' },
        ],
        not:'Mali yıl başı seçildi çünkü **açılış bakiyeleri** o noktada elle dağıtılabilir ' +
             've yıl içi karşılaştırmalar tutarlı kalır.\n\n' +
             'Yıl ortasında açılsaydı Ocak–Haziran boyutsuz, Temmuz–Aralık boyutlu olacak; ' +
             'yıllık segment bilançosu **hiçbir zaman** doğru çıkmayacaktı.' },
    ],

    sonuc:
      'Segment bilançosu çıktı — ama **bir sonraki mali yıldan itibaren**.\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Segment bilançosu bir raporlama sorunu değil, bir veri sorunudur.** ' +
      'Bilanço satırları (satıcı, müşteri, banka, vergi) doğal olarak kâr merkezi taşımaz. ' +
      'Hiçbir rapor, veride olmayan boyutu üretemez. {{belge-bolme}} tam olarak bu boşluğu doldurur.\n\n' +
      '**2. Kalem kategorisi ataması en sık hata kaynağıdır.** ' +
      'Tek haneli bir aralık yazım hatası, o hesabı içeren **her belgeyi kaydedilemez** yapar. ' +
      'Hata mesajı satır numarasını verir; teşhis hızlıdır ama nereye bakılacağını bilmek gerekir.\n\n' +
      '**3. Aktif ve pasif bölme farklı problemleri çözer.** ' +
      'Faturada kural tabanlı **aktif** bölme çalışır; ödemede türetecek satır olmadığı için ' +
      'sistem {{FAGL_SPLINFO}}’dan okuyup **pasif** bölme yapar. ' +
      'Bu ikilik olmadan kapatma işlemleri boyut tutarlılığını koruyamazdı.\n\n' +
      '**4. Zamanlama, yapılandırmadan daha önemlidir.** ' +
      'Belge bölme geçmişe uygulanmaz. Yıl ortasında açılırsa o yılın segment bilançosu ' +
      '**hiçbir zaman** doğru çıkmaz. Doğru an **mali yıl başıdır** — ' +
      've bu karar, teknik bir karar değil bir **proje planı kararıdır**.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'New G/L üç şey getirdi: **belge bölme**, **paralel defter**, **gerçek zamanlı FI–CO entegrasyonu**.',
      '{{belge-bolme}}, bilanço satırlarına (satıcı, müşteri, vergi) kâr merkezi/segment atar.',
      'Bu olmadan **segment bilançosu çıkarılamaz** — gelir tablosu ayrışır, bilanço ayrışmaz.',
      'İki görünüm vardır: **giriş görünümü** ({{BSEG}}) ve **genel defter görünümü** ({{ACDOCA}}).',
      '**Aktif bölme** kural tabanlıdır (fatura); **pasif bölme** {{FAGL_SPLINFO}}’dan okur (ödeme).',
      '"Sıfır bakiye" ayarı, her boyutun **kendi içinde dengeli** olmasını garanti eder.',
      'Kalem kategorisi atanmamış hesap → *"document splitting error"* → belge **kaydedilemez**.',
      'Belge bölme **sonradan açılmaz** — geçmiş belgeler bölünmemiş kalır.',
    ],

    onemliNoktalar:[
      '**"Belge bölme ne işe yarar?"** Satıcı/müşteri/vergi gibi **bilanço satırlarına** kâr merkezi ve segment atar. Bu olmadan segment bilançosu çıkarılamaz. Yüzeysel "kalemleri böler" cevabı yetersizdir — **neden** bölündüğü sorulmaktadır.',
      '**"Aktif ve pasif bölme farkı?"** Aktif: kural tabanlı, faturada çalışır, bilanço satırını gelir tablosu satırlarının oranında böler. Pasif: {{FAGL_SPLINFO}}’dan okur, ödemede çalışır — çünkü ödemede türetecek gelir tablosu satırı yoktur.',
      '**"Giriş görünümü ile genel defter görünümü farkı?"** Giriş = kullanıcının girdiği satırlar ({{BSEG}}). Genel defter = bölünmüş satırlar ({{ACDOCA}}). 4 satır girip 6 satır görmek **normaldir**.',
      '**"Belge bölme sonradan açılabilir mi?"** Teknik olarak evet, **pratikte hayır**. Geçmiş belgeler bölünmemiş kalır; o dönemler için segment bilançosu asla tutmaz. Doğru an **mali yıl başıdır**.',
      '**"Sıfır bakiye ayarı ne yapar?"** Her boyutun kendi içinde borç = alacak olmasını zorunlu kılar; gerekirse sistem **denkleştirme satırı** üretir. Segment bilançosu için zorunludur.',
      '**"En sık New G/L hatası nedir?"** Hesaba **kalem kategorisi atanmamış** olması. Sonuç: *"Balancing field ... not filled"* ve belge kaydedilemez. Yeni hesap açma prosedürüne kontrol eklenmelidir.',
      '**"{{FBL3N}} ile {{FAGLL03}} farkı?"** {{FBL3N}} giriş görünümünü ({{BSEG}}), {{FAGLL03}} genel defter görünümünü okur. Farklı satır sayısı göstermeleri **hata değildir**. Segment analizinde {{FAGLL03}} kullanılır.',
      '**"S/4HANA New G/L’i değiştirdi mi?"** Belge bölme mantığı **aynı**. Değişen: {{ACDOCA}} ile FI ve CO aynı tabloda, toplam tabloları kaldırıldı, 8 para birimi desteği geldi.',
    ],

    sikHatalar:[
      { hata:'Belge bölmeyi canlıya geçtikten sonra açmaya çalışmak.', dogru:'Geçmiş belgeler bölünmez; segment bilançosu o dönemler için asla tutmaz. Doğru an mali yıl başıdır.' },
      { hata:'Yeni hesap açarken kalem kategorisi atamayı unutmak.', dogru:'O hesabı içeren her belge kaydedilemez. Hesap açma prosedürüne zorunlu kontrol ekle.' },
      { hata:'"4 satır girdim, 6 satır var" diye hata sanmak.', dogru:'Bu bölmenin çalıştığının kanıtıdır. {{FB03}}’te iki görünümü karşılaştır.' },
      { hata:'Segment analizinde {{FBL3N}} kullanmak.', dogru:'{{FBL3N}} giriş görünümünü okur; boyutlar eksik görünür. {{FAGLL03}} kullanılmalıdır.' },
      { hata:'"Sıfır bakiye" ayarını işaretlememek.', dogru:'Bölme yapılır ama boyut bazında denge garanti edilmez; dengesiz segment bilançosu çıkar.' },
      { hata:'Çok sayıda bölme karakteristiği tanımlamak.', dogru:'Her karakteristik **her belgede** türetilebilmek zorundadır. Az ve öz tut.' },
      { hata:'Sıfır bakiye kapatma hesabını normal kayda açık bırakmak.', dogru:'{{FS00}}’da "yalnızca otomatik kayıt" yapılmalıdır; elle kayıt segment dengesini bozar.' },
      { hata:'Geçişte kalem kategorisi hesap aralıklarını doğrulamamak.', dogru:'Yeni hesaplar aralık dışında kalabilir; testte çalışan bölme canlıda hata verir.' },
    ],

    ipuclari:[
      'Belge bölmeyi öğrenmenin en hızlı yolu: {{FB03}}’te aynı belgeyi **iki görünümde** karşılaştırmak.',
      'Bölme hatası teşhisinde hata mesajı **satır numarasını verir** — o satırın hesabının ' +
      'kalem kategorisini kontrol et.',
      'Kalem kategorisi aralıklarını **geniş** tanımla (770000–779999 gibi); ' +
      'yeni hesaplar otomatik kapsanır.',
      'Segment bilançosunun doğruluğunu üç kontrolle doğrula: her segment dengeli, ' +
      'denkleştirme hesabı şirket toplamında sıfır, {{FAGLB03}} ile {{FAGLL03}} tutarlı.',
      'Varsayılan kâr merkezi kuralını baştan tanımla — türetilemeyen tek senaryo üretimi durdurur.',
      'Yeni geliştirmelerde {{ACDOCA}}’yı doğrudan oku; {{BSEG}} uyumluluk görünümü yavaştır.',
    ],

    quiz:[
      { soru:'Belge bölmenin asıl amacı nedir?',
        secenekler:[
          'Belgeleri daha küçük parçalara ayırıp performansı artırmak',
          '**Bilanço satırlarına (satıcı, müşteri, vergi) kâr merkezi/segment atayarak segment bilançosu üretmek**',
          'Vergi hesaplamasını kolaylaştırmak',
          'Paralel defterleri senkronize etmek',
        ], dogru:1,
        aciklama:'Gider ve gelir satırları zaten kâr merkezi taşır; sorun **bilanço satırlarındadır**. ' +
                 'Satıcı, müşteri, banka ve vergi hesapları doğal olarak boyutsuzdur. ' +
                 'Bölme, bu satırları gelir tablosu satırlarının oranında bölerek boyut atar — ' +
                 'segment bilançosunun tek yolu budur.' },

      { soru:'Kullanıcı 4 satır girdi, {{FB03}}’te 6 satır görünüyor. Bu ne anlama gelir?',
        secenekler:[
          'Belge bozulmuş, ters kaydedilmeli',
          'Çift kayıt oluşmuş',
          '**Belge bölme çalışmış; giriş görünümü 4, genel defter görünümü 6 satır**',
          'Paralel defter kaydı',
        ], dogru:2,
        aciklama:'İki görünüm vardır: **giriş görünümü** ({{BSEG}}) kullanıcının girdiği satırları, ' +
                 '**genel defter görünümü** ({{ACDOCA}}) bölünmüş satırları gösterir. ' +
                 'Satır sayısının artması bölmenin **çalıştığının kanıtıdır**, hata değil.' },

      { soru:'Ödeme belgesinde bölme nasıl yapılır?',
        secenekler:[
          'Aktif bölme kuralları yeniden çalışır',
          '**{{FAGL_SPLINFO}}’dan faturanın bölme bilgisi okunur — pasif bölme**',
          'Kullanıcı elle böler',
          'Ödeme belgesi bölünmez',
        ], dogru:1,
        aciklama:'Ödeme belgesinde bölmeyi türetecek bir gelir tablosu satırı **yoktur** — ' +
                 'sadece satıcı ve banka vardır. Bu yüzden kural tabanlı (aktif) bölme çalışamaz. ' +
                 'Sistem faturanın bölme oranını {{FAGL_SPLINFO}}’dan okur ve aynısını uygular.' },

      { soru:'*"Balancing field Profit Center in line item 003 not filled"* hatasının en olası sebebi?',
        secenekler:[
          'Kâr merkezi ana verisi kilitli',
          '**O satırdaki hesaba kalem kategorisi atanmamış**',
          'Dönem kapalı',
          'Defter tanımı eksik',
        ], dogru:1,
        aciklama:'New G/L’in en sık canlı hatasıdır. Kalem kategorisi atanmamış bir hesap ' +
                 'bölme algoritmasınca sınıflandırılamaz, boyut türetilemez ve ' +
                 '**belge hiç kaydedilemez**. Yeni hesap açma prosedürüne bu kontrol eklenmelidir.' },

      { soru:'Belge bölme canlıya geçtikten 6 ay sonra açılırsa ne olur?',
        secenekler:[
          'Sistem geçmiş belgeleri otomatik böler',
          'Hiçbir sorun olmaz',
          '**Geçmiş belgeler bölünmemiş kalır; o dönemler için segment bilançosu tutmaz**',
          'Belge bölme açılamaz',
        ], dogru:2,
        aciklama:'Bölme yalnızca **açıldıktan sonraki** belgelere uygulanır. ' +
                 'Geçmiş belgelerin bilanço satırları boyutsuz kalır, açılış bakiyeleri dağıtılamaz, ' +
                 'karşılaştırmalı raporlar anlamsızlaşır. Doğru an **mali yıl başıdır**.' },

      { soru:'"Sıfır bakiye" (zero balance) ayarı ne yapar?',
        secenekler:[
          'Sıfır tutarlı satırları siler',
          '**Her boyutun kendi içinde borç = alacak olmasını zorunlu kılar; gerekirse denkleştirme satırı üretir**',
          'Bakiyesi sıfır olan hesapları raporlamaz',
          'Dönem sonunda hesapları sıfırlar',
        ], dogru:1,
        aciklama:'Segment bilançosunun anlamlı olması için her segmentin **kendi içinde dengeli** ' +
                 'olması gerekir. Bu ayar olmadan bölme yapılır ama denge garanti edilmez — ' +
                 'dengesiz bir segment bilançosu, olmayan bilançodan daha kötüdür.' },

      { soru:'Segment analizinde {{FBL3N}} yerine neden {{FAGLL03}} kullanılır?',
        secenekler:[
          '{{FBL3N}} yavaştır',
          '{{FBL3N}} S/4HANA’da kaldırıldı',
          '**{{FBL3N}} giriş görünümünü okur; boyutlar bölünmemiş hâliyle görünür**',
          'İkisi aynıdır',
        ], dogru:2,
        aciklama:'{{FBL3N}} {{BSEG}}’den (giriş görünümü) okur — bölme öncesi hâl. ' +
                 '{{FAGLL03}} genel defter görünümünden okur ve bölünmüş satırları, ' +
                 'defter ve segment filtreleriyle birlikte gösterir. ' +
                 'Farklı satır sayısı göstermeleri **beklenen davranıştır**.' },

      { soru:'S/4HANA’da New G/L’e göre ne değişti?',
        secenekler:[
          'Belge bölme kaldırıldı',
          '**FI ve CO {{ACDOCA}}’da birleşti, toplam tabloları kaldırıldı**',
          'Paralel defter desteği bitti',
          'Kalem kategorileri kalktı',
        ], dogru:1,
        aciklama:'Belge bölme mantığı **aynı kaldı**. Değişen: {{FAGLFLEXA}} + COEP yerine tek ' +
                 '{{ACDOCA}}, toplam tablolarının ({{FAGLFLEXT}}, {{GLT0}}) kaldırılması ' +
                 've 8’e kadar paralel para birimi. Toplam ile kalem arasında ' +
                 'tutarsızlık artık **yapısal olarak imkânsız**.' },
    ],

    flashcards:[
      { on:'New G/L hangi üç şeyi getirdi?', arka:'**1. Belge bölme** — bilanço satırlarına boyut\n**2. Paralel defter** — IFRS + yerel birlikte\n**3. Gerçek zamanlı FI–CO entegrasyonu**\n\nHepsi klasik ana muhasebede yoktu.' },
      { on:'Belge bölme neyi çözer?', arka:'**Bilanço satırlarının boyutsuz olmasını.**\n\nGider/gelir satırları zaten kâr merkezi taşır.\nSatıcı, müşteri, banka, vergi **taşımaz**.\n\nBölme onları gelir tablosu satırlarının oranında böler → **segment bilançosu** çıkar.' },
      { on:'Giriş görünümü vs genel defter görünümü', arka:'**Giriş görünümü** — kullanıcının girdiği satırlar · **BSEG**\n\n**Genel defter görünümü** — bölünmüş satırlar + boyutlar · **ACDOCA**\n\n4 satır girip 6 satır görmek **normaldir**. FB03’te ikisi karşılaştırılır.' },
      { on:'Aktif vs pasif bölme', arka:'**Aktif** — kural tabanlı, **faturada**. Satıcı satırı gider satırlarının oranında bölünür.\n\n**Pasif** — **FAGL_SPLINFO**’dan okur, **ödemede**. Çünkü ödemede türetecek gelir tablosu satırı yok.' },
      { on:'"Balancing field ... not filled" hatası — sebep?', arka:'**Hesaba kalem kategorisi atanmamış.**\n\nEn sık New G/L canlı hatasıdır.\nHata mesajı **satır numarasını** verir → o satırın hesabına bak.\n\nÖnlem: hesap açma prosedürüne kontrol ekle.' },
      { on:'"Sıfır bakiye" ayarı ne yapar?', arka:'Her boyutun **kendi içinde** borç = alacak olmasını zorunlu kılar.\n\nGerekirse sistem **denkleştirme satırı** üretir (sıfır bakiye kapatma hesabı).\n\nSegment bilançosu için **zorunludur**.' },
      { on:'Belge bölme sonradan açılabilir mi?', arka:'**Teknik olarak evet, pratikte hayır.**\n\nGeçmiş belgeler bölünmemiş kalır → o dönemler için segment bilançosu **asla tutmaz**.\n\nDoğru an: **mali yıl başı**. Açılış bakiyeleri o noktada dağıtılabilir.' },
      { on:'FBL3N vs FAGLL03', arka:'**FBL3N** — BSEG’den, **giriş görünümü**\n**FAGLL03** — genel defter görünümü + defter/segment filtresi\n\nFarklı satır sayısı **hata değil**.\n\nSegment analizinde daima **FAGLL03**.' },
      { on:'Kalem kategorisi nedir?', arka:'Her hesabın bölme açısından **ne tür kalem** olduğu:\n\n01000 satıcı · 02000 müşteri\n03000 stok · 04000 nakit\n05100 vergi · 20000 gider · 30000 gelir\n\n**Atanmazsa belge kaydedilemez.**' },
      { on:'S/4HANA’da New G/L’e göre ne değişti?', arka:'**Belge bölme mantığı aynı.**\n\nDeğişenler:\n• FI + CO → tek **ACDOCA**\n• Toplam tabloları (FAGLFLEXT, GLT0) **kaldırıldı**\n• 8’e kadar paralel para birimi\n• Toplam–kalem tutarsızlığı **imkânsız**' },
      { on:'FAGL_SPLINFO ne işe yarar?', arka:'Bölme sonucunda her kaleme atanan **karakteristikleri** saklar.\n\n**Pasif bölmenin kaynağıdır:** ödeme ve kapatma işlemleri bu tablodan okuyup faturayla aynı oranı uygular.\n\nBozulursa kapatma hata verir.' },
      { on:'Segment bilançosunun doğruluğu nasıl kontrol edilir?', arka:'**Üç kontrol birlikte:**\n\n1. Her segment kendi içinde dengeli (varlık = kaynak)\n2. Denkleştirme hesabı **şirket toplamında sıfır**\n3. FAGLB03 ile FAGLL03 tutarlı\n\nÜçü de sağlanıyorsa bölme doğru çalışıyor.' },
    ],
  },

  },
});
