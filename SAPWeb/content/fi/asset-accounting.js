/* ==========================================================================
   content/fi/asset-accounting.js — "Asset Accounting (Duran Varlık)"
   ========================================================================== */

SAP.registerTopic({
  id: 'asset-accounting',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Asset Accounting (FI-AA), şirketin **çok yıllık kullanılan varlıklarını** — makine, bina, araç, ' +
      'bilgisayar — doğumundan ölümüne kadar izleyen FI alt bileşenidir.\n\n' +
      'AA bir {{muavin-defter}}dir: her varlığın ayrıntısı (edinim değeri, birikmiş amortisman, ' +
      'faydalı ömür, maliyet yeri) burada tutulur; ana muhasebeye {{mutabakat-hesabi}} üzerinden ' +
      'özet olarak yansır. Bilançoda "253 Tesis, makine ve cihazlar 12.400.000 TL" yazar; ' +
      'arkasındaki 1.847 varlığın kim olduğu AA’dadır.\n\n' +
      'AA’yı diğer alt bileşenlerden ayıran şey **zaman boyutudur**: bir fatura tek seferde biter, ' +
      'bir varlık 5-40 yıl boyunca her ay kayıt üretir.',

    neden:
      '**Maliyeti doğru döneme yaymak için.** 60.000 TL’lik makineyi alındığı ay gider yazmak, ' +
      'o ayın kârını yok eder ve sonraki 59 ayı gerçekte olduğundan kârlı gösterir. ' +
      '{{amortisman}} bu çarpıklığı düzeltir.\n\n' +
      '**Farklı mevzuatlara aynı anda uymak için.** Ticari muhasebe 5 yıl der, vergi mevzuatı 4 yıl der, ' +
      'IFRS başka bir yöntem ister. {{amortisman-alani}} sayesinde aynı varlık üç farklı şekilde ' +
      'değerlenir ve üç ayrı rapor üretilir.\n\n' +
      '**Envanter kontrolü için.** Hangi varlık nerede, kimin sorumluluğunda, ne kadar değerinde — ' +
      'sigorta, denetim ve vergi incelemesinde bu bilgi istenir.',

    sirketOnemi:
      'AA, üretim ve enerji gibi sermaye yoğun sektörlerde bilançonun **en büyük kalemidir**. ' +
      'Yanlış kurulmuş bir AA, yıllarca yanlış kâr raporlanması demektir.\n\n' +
      'Danışmanlık açısından AA, FI’ın **en çok yapılandırma isteyen** alanıdır: ' +
      '{{degerleme-plani}}, {{amortisman-alani}}, {{varlik-sinifi}}, hesap belirleme ({{AO90}}), ' +
      '{{amortisman-anahtari}} — bunların hepsi canlıya geçmeden doğru kurulmalıdır. ' +
      'Sonradan düzeltmek, açılmış binlerce varlığın yeniden değerlenmesi anlamına gelir.\n\n' +
      'Ayırt edici soru şudur: **"Amortisman alanı ile defter (ledger) arasındaki ilişki nedir?"** ' +
      'Cevap, paralel muhasebenin gerçekten anlaşılıp anlaşılmadığını ele verir.',

    gercekHayat:
      'Bir tekstil fabrikası 2.400.000 TL’ye dokuma makinesi alıyor. Muhasebe müdürü üç farklı ' +
      'rakamla çalışmak zorunda:\n\n' +
      '**Ticari muhasebe:** 10 yıl faydalı ömür → yıllık 240.000 TL amortisman. Bilanço bu rakamı gösterir.\n\n' +
      '**Vergi mevzuatı:** makine 8 yıl amortismana tabi → yıllık 300.000 TL. Vergi matrahı bundan hesaplanır.\n\n' +
      '**IFRS (grup raporlaması):** bileşen bazlı amortisman → motor 6 yıl, gövde 15 yıl.\n\n' +
      'Üç ayrı defter tutmak yerine SAP’ta **tek varlık kaydı** açılır ve üç {{amortisman-alani}} tanımlanır. ' +
      'Her alan kendi kuralıyla hesaplar; raporlar birbirinden bağımsız çıkar. ' +
      'AA’nın varlık sebebi budur.',

    muhasebeMantigi:
      'Bir varlığın muhasebe hayatı **dört aşamadır**:\n\n' +
      '**1. {{aktiflestirme}}:** harcama gider değil **varlık** yazılır. Bilanço büyür, kâr etkilenmez.\n\n' +
      '**2. {{amortisman}}:** her dönem faydanın tükenen kısmı gider yazılır. ' +
      'Nakit çıkışı **yoktur** — para zaten alım anında çıkmıştı.\n\n' +
      '**3. Çıkış:** varlık satılır, hurdaya ayrılır veya devredilir. ' +
      '{{net-defter-degeri}} ile satış bedeli arasındaki fark kâr/zarar olarak kaydedilir.\n\n' +
      '**4. Kapanış:** yıl sonunda varlık muhasebesi kapatılır ({{AJAB}}) ve yeni yıl açılır ({{AJRW}}).\n\n' +
      'Kritik ayrım: **edinim değeri hiç azalmaz.** 253 hesabı 60.000 TL olarak durmaya devam eder; ' +
      'azalma 257 Birikmiş amortisman hesabında birikir. Bilançoda ikisi netlenir.',

    kavramlar: ['amortisman', 'birikmis-amortisman', 'net-defter-degeri', 'faydali-omur',
                'amortisman-anahtari', 'amortisman-alani', 'degerleme-plani', 'varlik-sinifi',
                'yatirim-devam', 'aktiflestirme', 'hareket-turu', 'mutabakat-hesabi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Varlık süreci diğer FI süreçlerinden farklıdır: **tek bir olayla bitmez**, yıllara yayılır. ' +
      'Bu yüzden AA’da "süreç" derken iki şey kastedilir: bir varlığın **yaşam döngüsü** ve ' +
      'her ay tekrarlanan **amortisman rutini**.',

    roller:[
      { rol:'Talep eden birim', gorev:'Yatırım talebini açar; teknik özellikleri ve kullanım yerini bildirir.' },
      { rol:'Yatırım komitesi / Yönetim', gorev:'Yatırımı onaylar. Genelde bütçe kontrolü CO tarafında yapılır.' },
      { rol:'Satın alma', gorev:'Siparişi açar. Hesap atama kategorisi **A** (varlık) seçilirse mal girişi doğrudan varlığa yazılır.' },
      { rol:'Duran varlık muhasebecisi', gorev:'Varlık ana verisini açar ({{AS01}}), edinimi kaydeder, {{amortisman}} çalıştırır.' },
      { rol:'Envanter sorumlusu', gorev:'Fiziksel sayım yapar, varlığın yerini ve sorumlusunu günceller.' },
      { rol:'Muhasebe müdürü', gorev:'Faydalı ömür değişikliklerini, olağandışı amortismanı ve çıkış kararlarını onaylar.' },
      { rol:'FI danışmanı', gorev:'{{degerleme-plani}}, {{amortisman-alani}}, {{varlik-sinifi}}, {{AO90}} hesap belirleme ve {{amortisman-anahtari}} tasarımını yapar.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Bir varlığın yaşam döngüsü',
      adimlar:[
        { ic:'📝', rol:'Talep eden birim', baslik:'Yatırım talebi ve onay',
          aciklama:'İhtiyaç bildirilir, bütçe kontrolü yapılır. **FI kaydı yok.**',
          cikti:'Onaylı yatırım talebi', ok:'sipariş açılır' },
        { ic:'🏗️', rol:'Muhasebe / Proje', baslik:'Gerekirse yapılmakta olan yatırım açılır',
          aciklama:'Uzun süren yatırımlarda maliyet önce {{yatirim-devam}} hesabında toplanır. ' +
                   '**Amortisman ayrılmaz** çünkü varlık henüz kullanıma hazır değil.',
          cikti:'AuC varlık kaydı', ok:'maliyetler birikir' },
        { ic:'📗', rol:'DV muhasebecisi', baslik:'Varlık ana verisi açılır ({{AS01}})',
          aciklama:'{{varlik-sinifi}} seçilir; hesap belirleme, numara aralığı ve varsayılan ' +
                   '{{amortisman-anahtari}} otomatik gelir.',
          cikti:'{{ANLA}} + {{ANLB}} kayıtları', ok:'varlık alınır' },
        { ic:'💰', rol:'DV muhasebecisi', baslik:'Edinim kaydedilir',
          aciklama:'{{ABZON}} (karşı hesapla), {{F-90}} (satıcıdan) veya MM üzerinden ({{MIGO}} + {{MIRO}}). ' +
                   '{{aktiflestirme}} tarihi amortismanın başlangıcını belirler.',
          cikti:'{{ANEP}} hareketi + FI belgesi', ok:'her ay tekrarlanır' },
        { ic:'📉', rol:'Sistem', baslik:'Aylık amortisman çalıştırılır ({{AFAB}})',
          aciklama:'Dönemin planlanan amortismanı hesaplanıp FI’a kaydedilir. ' +
                   '**Nakit çıkışı yok**, yalnızca gider doğar.',
          cikti:'Amortisman belgesi', ok:'yıllarca sürer' },
        { ic:'🔧', rol:'DV muhasebecisi', baslik:'Yaşam boyu değişiklikler',
          aciklama:'Faydalı ömür güncellemesi ({{AS02}}), olağandışı amortisman ({{ABAA}}), ' +
                   'maliyet yeri değişikliği, transfer ({{ABUMN}}).',
          cikti:'Güncellenmiş değerler', ok:'ömür biter' },
        { ic:'🚪', rol:'DV muhasebecisi', baslik:'Çıkış kaydedilir',
          aciklama:'Satış ({{F-92}}), hurdaya ayırma ({{ABAVN}}) veya transfer. ' +
                   '{{net-defter-degeri}} ile bedel arasındaki fark kâr/zarar yazılır.',
          cikti:'Çıkış belgesi', ok:'yıl sonunda' },
        { ic:'🔒', rol:'Muhasebe müdürü', baslik:'Yıl sonu kapanışı',
          aciklama:'{{AJRW}} yeni yılı açar, {{AJAB}} eski yılı kapatır. Kapanan yılda artık kayıt yapılamaz.',
          cikti:'Kapanmış mali yıl' },
      ],
    },

    adimlar:[
      { rol:'Satın alma', eylem:'Varlık siparişi açar (hesap atama A)', sistem:'{{ME21N}} — FI kaydı yok' },
      { rol:'DV muhasebecisi', eylem:'Varlık ana verisini açar', sistem:'{{AS01}} → {{ANLA}}, {{ANLB}}' },
      { rol:'DV muhasebecisi', eylem:'Edinimi kaydeder', sistem:'{{ABZON}}, {{F-90}} veya {{MIRO}}' },
      { rol:'Sistem', eylem:'Aylık amortisman çalıştırılır', sistem:'{{AFAB}} — önce deneme, sonra gerçek' },
      { rol:'DV muhasebecisi', eylem:'Varlık değerlerini izler', sistem:'{{AW01N}}, {{AR01}}, {{AR02}}' },
      { rol:'DV muhasebecisi', eylem:'Transfer / çıkış kaydeder', sistem:'{{ABUMN}}, {{ABAVN}}, {{F-92}}' },
      { rol:'Proje muhasebesi', eylem:'Yatırımı aktifleştirir', sistem:'{{AIAB}} + {{AIBU}}' },
      { rol:'Muhasebe müdürü', eylem:'Yıl sonu kapatır', sistem:'{{AJRW}} → {{AJAB}}' },
    ],

    veriAkisi:{
      nereden:'MM’den satınalma siparişi ve mal girişi (hesap atama kategorisi A); AP’den satıcı faturası; ' +
              'CO’dan yatırım siparişi/proje maliyetleri; {{varlik-sinifi}}’ndan varsayılan ayarlar.',
      nereye:'{{ANEP}} hareketlerine, {{ANLC}} yıllık değerlerine, FI’a amortisman belgelerine; ' +
             'CO tarafında {{maliyet-yeri}} giderine; bilanço ve vergi raporlarına.',
      tetikleyen:'Aktifleştirme sınırının üzerinde, çok yıllık kullanılacak bir alım.',
      sonraki:'Yıllara yayılan amortisman, dönem sonu kapanışı, çıkışta kâr/zarar hesaplaması.',
    },

    notlar:[
      { tip:'tip', baslik:'Gider mi, varlık mı? — aktifleştirme sınırı', metin:
        'Her alım aktifleştirilmez. Şirketler bir **aktifleştirme sınırı** belirler (örn. 10.000 TL) ve ' +
        'altındaki alımlar doğrudan gider yazılır. Sebep pratiktir: 400 TL’lik bir klavye için ' +
        '5 yıl boyunca amortisman kaydı üretmek, sağladığı doğruluktan pahalıya gelir.\n\n' +
        'SAP’ta bu sınır {{varlik-sinifi}} ve düşük değerli varlık (LVA — low value asset) ' +
        'yapılandırmasıyla yönetilir.' },
      { tip:'warn', baslik:'AuC’de amortisman ayrılmaz', metin:
        '{{yatirim-devam}} (Asset under Construction) henüz kullanıma hazır olmadığı için ' +
        '**amortismana tabi tutulmaz**. Fabrika binası inşa halindeyken fayda sağlamıyordur. ' +
        'Amortisman ancak {{AIBU}} ile gerçek varlığa aktarıldıktan sonra başlar.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'AA’nın muhasebe mantığını anlamanın anahtarı şu: **edinim değeri hiç azalmaz.** ' +
      'Varlık hesabı (253) alım tutarını gösterir; azalma ayrı bir kontra hesapta (257) birikir. ' +
      'Bilançoda ikisi netlenerek {{net-defter-degeri}} bulunur.',

    etkilenenHesaplar:[
      { hesap:'253 Tesis, makine ve cihazlar', tur:'Bilanço — Varlık', neden:'Edinim değeri. {{aktiflestirme}} ile borçlanır, yalnızca **çıkışta** alacaklanır. Amortisman bu hesabı hiç etkilemez.' },
      { hesap:'257 Birikmiş amortisman', tur:'Bilanço — Kontra varlık', neden:'Bugüne kadar ayrılmış toplam amortisman. Her dönem alacaklanır; çıkışta borçlanarak sıfırlanır.' },
      { hesap:'770 / 730 Amortisman gideri', tur:'Gelir tablosu', neden:'Dönemin amortismanı. Varlığın kullanıldığı yere göre genel yönetim, üretim veya pazarlama gideri olur.' },
      { hesap:'258 Yapılmakta olan yatırımlar', tur:'Bilanço — Varlık', neden:'{{yatirim-devam}}. Farklı kaynaklardan gelen maliyetler burada **birikir**, **amortisman ayrılmaz**; tamamlanınca 252/253’e aktarılır. Bilançoda ayrı satırda gösterilir — okuyucu "bu varlık henüz üretime katkı vermiyor" bilgisini görür.' },
      { hesap:'259 Verilen sipariş avansları (yatırım)', tur:'Bilanço — Varlık', neden:'Yatırım için satıcıya verilen avans. **258’den ayrı** izlenir: avans henüz bir maliyet değil, bir alacak hakkıdır.' },
      { hesap:'252 Binalar', tur:'Bilanço — Varlık', neden:'AuC aktifleştirmesinin en sık hedefi. {{AIBU}} ile 258’den buraya aktarılır ve **amortisman o tarihte başlar**.' },
      { hesap:'679 / 689 Duran varlık satış kâr/zararı', tur:'Gelir tablosu', neden:'Satış bedeli ile {{net-defter-degeri}} arasındaki fark.' },
      { hesap:'120 Alıcılar / 102 Bankalar', tur:'Bilanço — Varlık', neden:'Varlık satışında karşı taraf.' },
    ],

    fisler:[
      { baslik:'Adım 1 — Edinim ({{ABZON}}) · 600.000 TL’lik makine',
        belgeTuru:'AA', tarih:'01.03.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Tesis, makine ve cihazlar', borc:600000, not:'{{hareket-turu}} 100 — edinim' },
          { hesap:'191', ad:'İndirilecek KDV', borc:120000 },
          { hesap:'320', ad:'Satıcılar', alacak:720000 },
        ],
        not:'**Gider yazılmadı.** 600.000 TL bilançoya varlık olarak girdi; kâr bu aşamada hiç etkilenmedi. ' +
             'Aktifleştirme tarihi 01.03 olduğu için amortisman Mart ayından itibaren işleyecek.' },

      { baslik:'Adım 2 — Aylık amortisman ({{AFAB}}) · 10 yıl faydalı ömür',
        belgeTuru:'AF', tarih:'31.03.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — amortisman', borc:5000, not:'600.000 / 120 ay' },
          { hesap:'257', ad:'Birikmiş amortisman', alacak:5000, not:'Kontra varlık hesabı' },
        ],
        not:'**Kasadan kuruş çıkmadı.** Para zaten Mart başında ödenmişti. Bu, nakit çıkışı yaratmayan ' +
             'tek büyük gider kalemidir — nakit akış tablosunda kâra geri eklenir.\n\n' +
             '253 hesabı hâlâ 600.000 TL. {{net-defter-degeri}} = 600.000 − 5.000 = **595.000 TL**.' },

      { baslik:'Adım 3 — 3 yıl sonra satış ({{F-92}}) · defter değeri 420.000, satış 500.000',
        belgeTuru:'AA', tarih:'31.03.2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar', borc:590000, not:'500.000 + %18 KDV' },
          { hesap:'257', ad:'Birikmiş amortisman', borc:180000, not:'36 ay × 5.000 — **sıfırlanıyor**' },
          { hesap:'253', ad:'Tesis, makine ve cihazlar', alacak:600000, not:'Edinim değeri **tamamen** çıkıyor' },
          { hesap:'391', ad:'Hesaplanan KDV', alacak:90000 },
          { hesap:'679', ad:'Duran varlık satış kârı', alacak:80000, not:'500.000 − 420.000' },
        ],
        not:'Çıkışta **her iki hesap da temizlenir**: 253’ten edinim değerinin tamamı, 257’den birikmiş ' +
             'amortismanın tamamı çıkar. Kalan {{net-defter-degeri}} (420.000) ile satış bedeli (500.000) ' +
             'arasındaki 80.000 TL kâr olarak kaydedilir. SAP bu hesaplamayı **otomatik** yapar.' },

      { baslik:'Alternatif — hurdaya ayırma ({{ABAVN}}) · bedelsiz çıkış',
        belgeTuru:'AA', tarih:'31.03.2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'257', ad:'Birikmiş amortisman', borc:180000 },
          { hesap:'689', ad:'Duran varlık hurda zararı', borc:420000, not:'Kalan defter değeri gider yazıldı' },
          { hesap:'253', ad:'Tesis, makine ve cihazlar', alacak:600000 },
        ],
        not:'Gelir olmadığı için {{net-defter-degeri}}’nin tamamı **zarar** yazılır. ' +
             'Bu yüzden hurdaya ayırma kararı, defter değeri yüksekken alınırsa kârı ciddi biçimde etkiler.' },

      { baslik:'**Kıst amortisman** — 15 Nisan’da alınan binek otomobil · ilk yıl',
        belgeTuru:'AF', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Amortisman gideri — binek oto (9/12)', borc:180000, not:'240.000 × **9/12**' },
          { hesap:'257', ad:'Birikmiş amortisman', alacak:180000 },
        ],
        not:'Araç: 1.200.000 TL · faydalı ömür 5 yıl · yıllık normal amortisman **240.000 TL**.\n\n' +
             '15 Nisan’da alındı → **ay kesri tam ay** → Nisan dahil **9 ay** → ' +
             '240.000 × 9/12 = **180.000 TL**.\n\n' +
             'Ayrılamayan 60.000 TL (3/12) **kaybolmaz**: 6. yılda gider yazılarak tamamlanır. ' +
             'Yani araç 5 yıl yerine **6 takvim yılına** yayılır.\n\n' +
             'Aynı gün alınan bir **makine** için tam yıl (240.000 TL) ayrılırdı — ' +
             'kıst yalnızca binek otomobile özgüdür.' },

      { baslik:'**Kıst amortisman** — son yıl · ilk yıldan kalan tamamlanıyor',
        belgeTuru:'AF', tarih:'31.12.2032', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Amortisman gideri — kalan 3 ay', borc:60000, not:'İlk yıldan devreden **3/12**' },
          { hesap:'257', ad:'Birikmiş amortisman', alacak:60000 },
        ],
        not:'6. yılda ilk yıldan kalan **60.000 TL** gider yazılır ve varlık tamamen itfa edilir.\n\n' +
             'Toplam kontrol: 180.000 + (4 × 240.000) + 60.000 = **1.200.000 TL** ✓\n\n' +
             '**Toplam amortisman değişmedi** — yalnızca bir yıla kaydırıldı. ' +
             'Kıst amortisman bir *indirim* değil, bir *zamanlama* kuralıdır.' },

      { baslik:'**Azalan bakiyeler** — ilk üç yıl · net defter değeri üzerinden',
        belgeTuru:'AF', tarih:'2027–2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'1. yıl — 600.000 × %40', borc:240000, not:'Taban: edinim değeri' },
          { hesap:'770', ad:'2. yıl — 360.000 × %40', borc:144000, not:'Taban: **NDD** 600.000−240.000' },
          { hesap:'770', ad:'3. yıl — 216.000 × %40', borc:86400, not:'Taban: NDD 360.000−144.000' },
          { hesap:'257', ad:'Birikmiş amortisman (3 yıl toplamı)', alacak:470400 },
        ],
        not:'Makine 600.000 TL · faydalı ömür 5 yıl → normal oran **%20** → ' +
             'azalan bakiyeler oranı **%40** (2 katı, %50 tavanının altında ✓).\n\n' +
             '**Her yıl taban küçülüyor**, bu yüzden tutar da azalıyor: ' +
             '240.000 → 144.000 → 86.400.\n\n' +
             'Normal yöntemde her yıl 120.000 TL olurdu. ' +
             'İlk üç yılda azalan yöntem **110.400 TL fazla** gider yazdı → ' +
             '**vergi ertelemesi** sağladı.' },

      { baslik:'**Azalan bakiyeler** — son yıl · kalan bakiye tamamen ayrılır',
        belgeTuru:'AF', tarih:'31.12.2031', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'5. yıl — kalan NDD’nin **tamamı**', borc:77760, not:'%40 değil, **kalanın tümü**' },
          { hesap:'257', ad:'Birikmiş amortisman', alacak:77760 },
        ],
        not:'4. yıl sonunda kalan net defter değeri: 129.600 − 51.840 = **77.760 TL**.\n\n' +
             '**Son yılda %40 uygulanmaz, kalan bakiyenin tamamı ayrılır.** ' +
             'Aksi hâlde her yıl kalanın %40’ı alındığı için varlık ' +
             '**matematiksel olarak hiçbir zaman sıfırlanmazdı**.\n\n' +
             'SAP’ta bu davranış {{AFAMR}} temel yöntemindeki ' +
             '**"ömür bittiğinde kalan değeri sıfırla"** ayarıyla sağlanır — ' +
             'bu ayar unutulursa varlık defterde küçük bir bakiyeyle sonsuza kadar kalır.\n\n' +
             'Toplam kontrol: 240.000 + 144.000 + 86.400 + 51.840 + 77.760 = **600.000 TL** ✓' },

      { baslik:'AuC adım 1 — yatırım avansı verilir · **258 değil 259**',
        belgeTuru:'KZ', tarih:'10.02.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'259', ad:'Verilen sipariş avansları (yatırım)', borc:600000, not:'Henüz **maliyet değil**' },
          { hesap:'102', ad:'Bankalar', alacak:600000 },
        ],
        not:'İnşaat firmasına %20 avans ödendi ama **henüz hiçbir iş yapılmadı**.\n\n' +
             'Bu tutar 258’e yazılmaz: 258 *gerçekleşmiş maliyeti* gösterir, ' +
             '259 ise *ileride mal/hizmet alma hakkını*. ' +
             'İkisini karıştırmak yatırımın maliyetini olduğundan yüksek gösterir.\n\n' +
             'Hakediş faturası geldikçe avans mahsup edilir ve maliyet 258’e geçer.' },

      { baslik:'AuC adım 2 — hakediş faturası · maliyet 258’de birikmeye başlar',
        belgeTuru:'KR', tarih:'15.05.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'258', ad:'Yapılmakta olan yatırımlar — AuC 4000012', borc:1200000, not:'Amortisman **yok**' },
          { hesap:'191', ad:'İndirilecek KDV', borc:240000 },
          { hesap:'320', ad:'Satıcılar (inşaat firması)', alacak:1440000 },
        ],
        not:'Bina inşa halinde; fayda sağlamadığı için amortismana tabi değil. ' +
             'Maliyetler AuC varlığında ({{ANLA}}) ve 258 hesabında birikir.\n\n' +
             'Kayıt normal bir satıcı faturasıdır — tek fark, karşı satırın ' +
             '**AuC varlık numarasına** yazılmasıdır. Sistem 258 hesabını ' +
             '{{varlik-sinifi}} üzerinden {{AO90}} hesap belirlemesiyle bulur.' },

      { baslik:'AuC adım 3 — maliyet **üç ayrı kaynaktan** birikiyor',
        belgeTuru:'Çeşitli', tarih:'Haziran–Eylül 2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'258', ad:'Satıcı faturaları (inşaat, tesisat)', borc:1900000, not:'{{MIRO}} / {{F-90}}' },
          { hesap:'258', ad:'Depodan çekilen malzeme', borc:280000, not:'MM hareket türü **241**' },
          { hesap:'258', ad:'İç işçilik (kendi ekibimiz)', borc:120000, not:'CO faaliyet aktarımı' },
          { hesap:'320', ad:'Satıcılar', alacak:1900000 },
          { hesap:'153', ad:'Ticari mallar (stok azaldı)', alacak:280000 },
          { hesap:'770', ad:'İşçilik gideri (CO’dan aktarıldı)', alacak:120000 },
        ],
        not:'**AuC’nin en değerli özelliği burada görünüyor:** üç farklı modülden gelen maliyet ' +
             '(FI faturası, MM malzeme çıkışı, CO işçilik aktarımı) **tek nesnede** toplanıyor.\n\n' +
             'İç işçilik satırı özellikle önemli: kendi ekibimizin bu yatırıma harcadığı emek ' +
             'gider olarak kalmaz, **varlığın maliyetine eklenir**. ' +
             'Aksi hâlde varlık olduğundan ucuz, o dönemin gideri olduğundan yüksek görünürdü.\n\n' +
             'Toplam AuC bakiyesi: 1.200.000 + 2.300.000 = **3.500.000 TL**.' },

      { baslik:'AuC adım 4 — aktifleştirme ({{AIBU}}) · inşaat bitti',
        belgeTuru:'AA', tarih:'01.10.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'252', ad:'Binalar — varlık 1200034', borc:3500000, not:'{{hareket-turu}} **336** — AuC transferi' },
          { hesap:'258', ad:'Yapılmakta olan yatırımlar — AuC 4000012', alacak:3500000, not:'AuC **boşaltıldı**' },
        ],
        not:'Bina artık kullanıma hazır. **Amortisman bu tarihten itibaren başlar.**\n\n' +
             'Dikkat: **bilanço toplamı değişmedi.** Varlık bir kalemden diğerine geçti; ' +
             'ne kâr ne zarar oluştu. Aktifleştirme bir **sınıflandırma değişikliğidir**, ' +
             'bir kazanç olayı değil.\n\n' +
             'Kritik alan: aktifleştirme tarihi (01.10.2026). ' +
             'Amortismanın başlangıcını **bu tarih** belirler — faturaların tarihi değil.' },

      { baslik:'AuC adım 5 — **kalem bazlı yerleşim**: tek AuC, üç farklı varlık',
        belgeTuru:'AA', tarih:'01.10.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'252', ad:'Binalar (50 yıl amortisman)', borc:2600000, not:'İnşaat maliyeti' },
          { hesap:'253', ad:'Tesis, makine ve cihazlar (10 yıl)', borc:700000, not:'Üretim hattı' },
          { hesap:'255', ad:'Demirbaşlar (5 yıl)', borc:200000, not:'Ofis donanımı' },
          { hesap:'258', ad:'Yapılmakta olan yatırımlar', alacak:3500000 },
        ],
        not:'**Neden bölmek gerekir?** Üç varlığın {{faydali-omur}} süreleri farklıdır: ' +
             'bina 50 yıl, makine 10 yıl, demirbaş 5 yıl.\n\n' +
             'Hepsini tek bir "bina" varlığına aktarsaydık, 900.000 TL’lik makine ve demirbaş ' +
             '**50 yıla yayılacak** ve amortisman gideri yıllarca eksik hesaplanacaktı.\n\n' +
             'Bu ayrım {{AIAB}} ile tanımlanan **yerleşim kuralında** (settlement rule) yapılır: ' +
             'hangi maliyet kaleminin hangi hedef varlığa gideceği belirlenir. ' +
             'Bu yüzden AuC varlık sınıfı **kalem bazlı yerleşime** ayarlanmalıdır.' },

      { baslik:'AuC adım 6 — **kısmi aktifleştirme**: bir bölüm devreye alındı',
        belgeTuru:'AA', tarih:'01.08.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Tesis, makine ve cihazlar — 1. üretim hattı', borc:1400000, not:'Devreye alındı' },
          { hesap:'258', ad:'Yapılmakta olan yatırımlar', alacak:1400000, not:'Kalan **2.100.000** AuC’de' },
        ],
        not:'Fabrikanın ilk üretim hattı Ağustos’ta devreye alındı, ikincisi hâlâ inşa halinde.\n\n' +
             '**Kısmi aktifleştirme** yapılır: devreye alınan kısım 253’e aktarılır ve ' +
             'amortismanı **Ağustos’ta başlar**; kalan tutar AuC’de bekler.\n\n' +
             'Bu yapılmazsa çalışan hat aylarca amortisman ayrılmadan üretim yapar — ' +
             'maliyetler eksik, kâr olduğundan yüksek görünür.\n\n' +
             '**Uygulamada en sık atlanan adımdır:** proje "tamamen bitsin" diye beklenir ve ' +
             'kısmi devreye almanın muhasebe sonucu gözden kaçar.' },
    ],

    tHesaplar:[
      { hesap:'Tesis, makine ve cihazlar', kod:'253 (Varlık)',
        borc:[{ ad:'Edinim (ABZON)', tutar:600000 }],
        alacak:[{ ad:'Satış çıkışı', tutar:600000 }],
        not:'Edinim değeri; amortisman bu hesabı etkilemez' },
      { hesap:'Birikmiş amortisman', kod:'257 (Kontra varlık)',
        borc:[{ ad:'Çıkışta sıfırlama', tutar:180000 }],
        alacak:[{ ad:'36 ay × 5.000', tutar:180000 }],
        not:'Varlığı bilançoda azaltır' },
      { hesap:'Amortisman gideri', kod:'770 (Gider)',
        borc:[{ ad:'Aylık amortismanlar', tutar:180000 }],
        alacak:[],
        not:'Her yıl sonunda sıfırlanır' },
      { hesap:'Yapılmakta olan yatırımlar', kod:'258 (Varlık)',
        borc:[{ ad:'İnşaat maliyetleri', tutar:3500000 }],
        alacak:[{ ad:'AIBU ile aktifleştirme', tutar:3500000 }],
        not:'Tamamlanınca boşalır' },
    ],

    notlar:[
      { tip:'warn', baslik:'Edinim değeri neden azaltılmaz?', metin:
        'Varlığın **orijinal maliyeti** bilgi olarak korunmalıdır. 253 hesabından amortisman düşülseydi ' +
        '"bu makine kaça alınmıştı?" sorusu cevaplanamaz, sigorta ve vergi incelemesinde sorun çıkardı.\n\n' +
        'Bu yüzden azalma ayrı bir **kontra hesapta** (257) birikir. Bilançoda "253 Makineler 600.000 / ' +
        '257 Birikmiş amortisman (−180.000) = 420.000" şeklinde net gösterilir.' },
      { tip:'tip', baslik:'Amortisman gideri hangi hesaba gider?', metin:
        'Varlığın **kullanıldığı yere** göre değişir: üretim makinesi 730 üretim giderine, ' +
        'satış aracı 760 pazarlama giderine, ofis bilgisayarı 770 genel yönetim giderine.\n\n' +
        'SAP bunu {{AO90}} hesap belirlemesi ve varlığın {{maliyet-yeri}} ataması üzerinden çözer. ' +
        'Bu yüzden varlık ana verisinde maliyet yeri doğru girilmelidir — yanlışsa gider yanlış ' +
        'departmana yüklenir.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'AA’da çeşitlenme üç eksende olur ve aşağıdaki liste bu üç gruba ayrılmıştır:\n\n' +
      '** Varlık hareketleri** — varlığa ne oluyor? *(edinim, transfer, çıkış, AuC)*\n' +
      '** Hesaplama yöntemleri** — tutar nasıl bulunuyor? *(doğrusal, azalan, YST, üretim, kalıntılı)*\n' +
      '** VUK uygulamaları** — mevzuatın özel kuralları *(kıst, fevkalade, özel maliyet…)*\n\n' +
      '━━━━━━━━━━\n\n' +
      '### Hesaplama yöntemleri — aynı varlık, beş sonuç\n\n' +
      'Yöntemleri anlamanın en hızlı yolu **aynı varlığı beş kez hesaplamaktır**.\n\n' +
      '**Varlık:** 600.000 TL · faydalı ömür **5 yıl**\n\n' +
      '**① Doğrusal** — `Tutar ÷ Ömür`\n' +
      '120.000 → 120.000 → 120.000 → 120.000 → 120.000\n\n' +
      '**② Azalan bakiyeler (%40)** — `NDD × (normal oran × 2)`\n' +
      '240.000 → 144.000 → 86.400 → 51.840 → **77.760** *(son yıl kalanın tamamı)*\n\n' +
      '**③ Yıl sayıları toplamı** — `Tutar × (kalan ömür ÷ 15)`\n' +
      '200.000 → 160.000 → 120.000 → 80.000 → 40.000\n\n' +
      '**④ Üretim miktarı** — `(Tutar ÷ toplam üretim) × dönem üretimi`\n' +
      '160.000 → 140.000 → 120.000 → 100.000 → 80.000 *(2 TL/adet)*\n\n' +
      '**⑤ Kalıntı değerli** — `(Tutar − kalıntı) ÷ ömür`\n' +
      '100.000 → 100.000 → 100.000 → 100.000 → 100.000 *(kalıntı 100.000)*\n\n' +
      '**Anlaşılması gereken tek şey:** ①②③④’te **toplam amortisman aynıdır — 600.000 TL**. ' +
      'Değişen yalnızca hangi yıla ne kadar düştüğü. ' +
      'Yani yöntem seçimi bir *vergi indirimi* değil, **vergi ertelemesi** kararıdır.\n\n' +
      '⑤ istisnadır: amortismana tabi tutarın kendisi küçüldüğü için toplam **500.000 TL** olur ve ' +
      'varlık defterde 100.000 TL ile durmaya devam eder.\n\n' +
      '**Türkiye’de hangisi nerede?** ①② vergi alanında (VUK) · ③④⑤ yalnızca IFRS alanında. ' +
      'Aynı varlığın iki alanda farklı yöntemle değerlenmesi, {{paralel-defter}}’in en somut kullanım sebebidir.',

    liste:[
      { ad:'Hareket · Edinim', en:'Acquisition',
        aciklama:'Varlığın kayıtlara girmesi. Üç yolu vardır: **{{ABZON}}** (karşı hesap otomatik, satıcısız), ' +
                 '**{{F-90}}** (doğrudan satıcı hesabına), **MM üzerinden** (sipariş → mal girişi → fatura).',
        neZaman:'{{ABZON}} basit alımlarda; {{F-90}} satıcı faturası doğrudan girilecekse; ' +
                'MM yolu siparişle takip edilen yatırımlarda.',
        ornek:'{{hareket-turu}} **100** — dış edinim. Kayıt: 253 borç / 320 alacak.',
        tcodes:['ABZON','F-90','MIGO','MIRO'] },

      { ad:'Hareket · Hurdaya ayırma', en:'Scrapping — ABAVN',
        aciklama:'Gelir getirmeyen çıkış. {{net-defter-degeri}}’nin tamamı **zarar** yazılır.',
        neZaman:'Varlık kullanılamaz hâle geldiğinde, imha edildiğinde, çalındığında.',
        ornek:'{{hareket-turu}} **200/250**. Defter değeri 420.000 ise 420.000 TL zarar.',
        tcodes:['ABAVN'] },

      { ad:'Hareket · Satış', en:'Retirement with Revenue — F-92 / ABAON',
        aciklama:'Bedelli çıkış. Satış bedeli ile {{net-defter-degeri}} karşılaştırılır; fark kâr veya zarar olur.',
        neZaman:'Varlık üçüncü tarafa satıldığında.',
        ornek:'Defter değeri 420.000, satış 500.000 → **80.000 TL kâr** (679 hesabı).',
        tcodes:['F-92','ABAON'] },

      { ad:'Hareket · AuC özet yerleşim', en:'AuC — Summary Settlement',
        aciklama:'Tüm AuC maliyeti **tek bir hedef varlığa** aktarılır. ' +
                 'Kalemler ayrı ayrı izlenmez, toplam devredilir.',
        neZaman:'Yatırım tek bir varlık üretiyorsa: bir bina, bir makine, bir araç.',
        ornek:'AuC bakiyesi 3.500.000 TL → tamamı 252 Binalar’a. ' +
              'Basittir, yerleşim kuralı tek satırdır. **Varsayılan seçim budur.**',
        tcodes:['AIBU','ABUMN'] },

      { ad:'Hareket · AuC kalem bazlı yerleşim', en:'AuC — Line Item Settlement',
        aciklama:'AuC maliyeti **birden çok hedef varlığa bölünerek** aktarılır. ' +
                 'Her maliyet kalemi ayrı izlenir ve kendi hedefine gider.',
        neZaman:'Yatırım **farklı faydalı ömürde** varlıklar üretiyorsa: ' +
                'bina + makine + demirbaş aynı projeden çıkıyorsa.',
        ornek:'3.500.000 TL → 2.600.000 bina (50 yıl) + 700.000 makine (10 yıl) + ' +
              '200.000 demirbaş (5 yıl). Kural {{AIAB}} ile tanımlanır.\n\n' +
              '**Varlık sınıfında baştan seçilmelidir** — sonradan değiştirilemez.',
        tcodes:['AIAB','AIBU'] },

      { ad:'Hareket · AuC kısmi aktifleştirme', en:'Partial Capitalization',
        aciklama:'Yatırımın **devreye alınan bölümü** aktifleştirilir, kalanı AuC’de bekler.',
        neZaman:'Aşamalı devreye alınan projelerde: fabrikanın ilk hattı çalışırken ' +
                'ikincisi inşa halindeyse.',
        ornek:'3.500.000 TL AuC’den 1.400.000 TL aktifleştirilir; ' +
              'amortisman **yalnızca o kısım için** başlar. ' +
              'Kalan 2.100.000 TL AuC’de amortismansız bekler.\n\n' +
              '**En sık atlanan adımdır** — proje "tamamen bitsin" diye beklenir.',
        tcodes:['AIBU'] },

      { ad:'Hareket · Yatırım avansı', en:'Down Payment on Investment',
        aciklama:'Yatırım için satıcıya verilen avans; **259** hesabında izlenir, 258’de değil.',
        neZaman:'Sözleşmede peşin ödeme öngörülmüşse.',
        ornek:'600.000 TL avans → 259 borç. Hakediş geldikçe mahsup edilir ve ' +
              'maliyet 258’e geçer.\n\n' +
              '**Ayrım önemlidir:** avans bir *alacak hakkıdır*, 258 ise *gerçekleşmiş maliyettir*. ' +
              'Karıştırmak yatırımı olduğundan pahalı gösterir.',
        tcodes:['F-48','F-54'] },

      { ad:'Hareket · Transfer', en:'Transfer — ABUMN',
        aciklama:'Varlığın başka bir varlığa, sınıfa veya şirket koduna aktarılması. ' +
                 'En sık kullanımı {{yatirim-devam}}’ın gerçek varlığa dönüştürülmesidir.',
        neZaman:'AuC aktifleştirmede, sınıf düzeltmesinde, şirketler arası devirde.',
        ornek:'{{hareket-turu}} **300/336**. 258 alacak / 252 borç.',
        tcodes:['ABUMN','AIBU','AIAB'] },

      { ad:'Yöntem ① · Doğrusal (eşit tutarlı)', en:'Straight-line — VUK md. 315',
        aciklama:'Edinim değeri {{faydali-omur}}’e **eşit olarak** bölünür. Her dönem aynı tutar. ' +
                 'Oran = 1 / faydalı ömür.',
        neZaman:'**VUK’un varsayılan yöntemidir.** Faydanın zamana eşit yayıldığı her varlıkta ' +
                'kullanılabilir; ayrıca azalan bakiyeler uygulanamayan mükellefler için tek seçenektir.',
        ornek:'600.000 TL / 10 yıl = yıllık **60.000 TL**.\n\n' +
              '**Kıst uygulanmaz:** varlık 28 Aralık’ta alınsa bile o yıl için ' +
              '**tam yıl** amortismanı ayrılabilir (binek otomobil hariç). ' +
              'Faydalı ömürler Maliye Bakanlığı listesiyle (333 sıra no’lu VUK Genel Tebliği) belirlenir.',
        tcodes:['AFAMA','AFAMR'] },

      { ad:'Yöntem ② · Azalan bakiyeler', en:'Declining Balance — VUK mük. md. 315',
        aciklama:'Amortisman **edinim değeri üzerinden değil, {{net-defter-degeri}} üzerinden** ' +
                 'sabit oranla hesaplanır. Taban küçüldüğü için tutar her yıl azalır.',
        neZaman:'Faydanın ilk yıllarda yoğunlaştığı varlıklarda; **vergi ertelemesi** amacıyla. ' +
                'Yalnızca **bilanço esasına göre** defter tutan mükellefler uygulayabilir.',
        ornek:'Oran = normal oranın **2 katı**, azami **%50**.\n\n' +
              '600.000 × %20 = 120.000 (1. yıl) → 480.000 × %20 = 96.000 (2. yıl) → …\n\n' +
              '**Son yılda kalan net defter değerinin tamamı** ayrılır — aksi hâlde varlık ' +
              'hiçbir zaman sıfırlanmazdı. **Azalandan normale geçilebilir, tersi olmaz.**',
        tcodes:['AFAMD','AFAMS'] },

      { ad:'VUK · {{kist-amortisman}}', en:'Pro-rata — VUK md. 320/2',
        aciklama:'İşletmeye alındığı yıl için **tam yıl değil, kullanıldığı ay kadar** amortisman. ' +
                 'VUK’ta **kural değil istisnadır**.',
        neZaman:'**Yalnızca binek otomobillerde.** Diğer tüm varlıklarda kıst uygulanmaz.',
        ornek:'15 Nisan’da alınan binek oto → **ay kesri tam ay** → Nisan dahil **9 ay** → ' +
              'yıllık amortismanın **9/12’si**.\n\n' +
              'İlk yıl ayrılamayan 3/12’lik kısım **kaybolmaz**: faydalı ömrün ' +
              '**son yılında** gider yazılarak tamamlanır.\n\n' +
              '**İstisnanın istisnası:** faaliyeti binek oto **kiralamak veya işletmek** olanlar ' +
              '(araç kiralama, sürücü kursu) kıst uygulamaz.',
        tcodes:['AFAMP'] },

      { ad:'Yöntem ③ · {{yil-sayilari-toplami}}', en:'Sum-of-the-Years’-Digits — IFRS',
        aciklama:'Sabit taban üzerinden, **her yıl azalan bir oranla** hesaplanan hızlandırılmış yöntem.',
        neZaman:'IFRS raporlamasında; faydanın önde yoğunlaştığı ama azalan bakiyelerin ' +
                'fazla agresif kaldığı varlıklarda.',
        ornek:'`Tutar × (Kalan ömür ÷ Yıl sayıları toplamı)`\n\n' +
              '5 yıl → payda 15 → 200.000 / 160.000 / 120.000 / 80.000 / 40.000\n\n' +
              '**Azalandan farkı:** taban **sabittir**, oran değişir → son yıl özel kural gerekmez.\n\n' +
              '**VUK’ta yoktur** — Türkiye’de yalnızca IFRS {{amortisman-alani}}’nda.' },

      { ad:'Yöntem ④ · {{uretim-miktari-yontemi}}', en:'Units of Production — IFRS',
        aciklama:'Amortisman **zamana değil, fiilen üretilen miktara** göre hesaplanır.',
        neZaman:'Presler, kalıplar, madencilik ekipmanı — durduğunda yıpranmayan varlıklar.',
        ornek:'`Birim = Tutar ÷ Toplam tahmini üretim` → `Dönem = Birim × O dönemin üretimi`\n\n' +
              '600.000 ÷ 300.000 adet = **2 TL/adet**. Yılda 80.000 adet → **160.000 TL**.\n\n' +
              '**Zorluğu:** her dönem fiili üretim miktarının sisteme girilmesi gerekir.\n\n' +
              'VUK’ta genel yöntem değildir; madenlerde (md. 316) benzer mantık vardır.' },

      { ad:'Yöntem ⑤ · {{kalinti-deger}}li hesaplama', en:'Residual Value — IFRS (IAS 16)',
        aciklama:'Ömür sonunda beklenen satış değeri, amortismana tabi tutardan **düşülür**.',
        neZaman:'IFRS raporlamasında; araç, iş makinesi gibi ikinci el değeri anlamlı varlıklarda.',
        ornek:'`Amortismana tabi tutar = Edinim değeri − Kalıntı değer`\n\n' +
              '(600.000 − 100.000) ÷ 5 = **100.000/yıl**. ' +
              '5 yıl sonra {{net-defter-degeri}} **sıfır değil, 100.000 TL**.\n\n' +
              '**VUK’ta kalıntı değer yoktur** — varlık tam itfa edilir ve sıfırlanır. ' +
              'IFRS’te ise her dönem **gözden geçirilir**.\n\n' +
              'Bu fark, {{paralel-defter}} ihtiyacının en somut örneklerinden biridir.' },

      { ad:'VUK · {{fevkalade-amortisman}}', en:'Extraordinary — VUK md. 317',
        aciklama:'Olağandışı değer kaybı hâllerinde normal oranın üzerinde amortisman.',
        neZaman:'Üç hâlde: **afet** (yangın, deprem, su basması), **yeni icatlar** nedeniyle ' +
                'teknik verim düşüşü, **cebri çalışma** nedeniyle aşırı yıpranma.',
        ornek:'Oran serbest değildir — Maliye Bakanlığınca **her işletme için ayrı** belirlenir ve ' +
              '**başvuru gerektirir**. Kendiliğinden uygulanamaz.\n\n' +
              'SAP’ta özel amortisman tipi olarak {{ABMA}} ile girilir.',
        tcodes:['ABMA'] },

      { ad:'VUK · Madenlerde amortisman', en:'Depletion — VUK md. 316',
        aciklama:'Maden ve taş ocaklarında, imtiyaz veya maliyet bedelinin **işletme süresine göre** itfası.',
        neZaman:'Madencilik faaliyetlerinde.',
        ornek:'Nispetler **Maliye ve Sanayi Bakanlıklarınca** belirlenir. ' +
              'Rezervin tükenme hızına bağlı olduğu için standart faydalı ömür listesi kullanılmaz.' },

      { ad:'VUK · {{ozel-maliyet-bedeli}} itfası', en:'Leasehold Improvements — VUK md. 327',
        aciklama:'Kiralanan gayrimenkule yapılan ve kiracıya ait olmayan iyileştirmelerin itfası.',
        neZaman:'Kiralık mağaza/ofis dekorasyonu, asma tavan, klima tesisatı.',
        ornek:'**Kira süresine göre eşit yüzdelerle** itfa edilir — varlığın kendi ömrüne göre değil.\n\n' +
              '• Kira süresi 5 yıl → 5 yılda itfa\n' +
              '• **Süre belli değilse → 5 yıl**\n' +
              '• Süre dolmadan boşaltılırsa **itfa edilmemiş kısım o yıl gider** yazılır' },

      { ad:'VUK · Düşük değerli varlıklar', en:'Low Value Assets — VUK md. 313',
        aciklama:'Belirlenen haddi aşmayan alet, edevat, mefruşat ve peştemallıkların ' +
                 '**doğrudan gider** yazılabilmesi.',
        neZaman:'Küçük tutarlı, çok sayıda varlıkta — takip maliyeti sağladığı doğruluktan pahalıysa.',
        ornek:'Had **her yıl yeniden değerleme oranıyla güncellenir**; güncel tutar için ' +
              'ilgili VUK genel tebliğine bakılmalıdır.\n\n' +
              'SAP’ta ayrı bir {{varlik-sinifi}} (LVA) ve **%100 anında amortisman** ayıran ' +
              'anahtar (`GWG` benzeri) ile yönetilir.',
        tcodes:['AFAMA'] },

      { ad:'VUK · Amortismana tabi olmayanlar', en:'Non-depreciable Assets — VUK md. 314',
        aciklama:'Yıpranmaya tabi olmadığı için amortisman ayrılmayan varlıklar.',
        neZaman:'**Boş arazi ve arsalar.** Ayrıca {{yatirim-devam}} (henüz kullanıma hazır değil).',
        ornek:'Arsa **hiçbir zaman** amortismana tabi değildir; üzerindeki bina ayrı varlık olarak ' +
              'amortismana tabidir. *(İstisna: tarım işletmelerinde vücuda getirilen ' +
              'meyvalık, dutluk gibi tesisler amortismana tabidir.)*\n\n' +
              'SAP’ta amortisman anahtarı **0000** verilerek sağlanır.' },

      { ad:'VUK · {{yenileme-fonu}}', en:'Renewal Fund — VUK md. 328–329',
        aciklama:'Satılan varlığın **yenilenmesi amacıyla** kârın vergilendirilmesinin ertelenmesi.',
        neZaman:'Yenileme zorunlu ya da karar verilip teşebbüse geçilmişse.',
        ornek:'Satış kârı **en fazla 3 yıl** pasifte (549 Özel fonlar) tutulur, ' +
              'yeni varlığın **amortismanlarına mahsup edilir**. ' +
              'Üç yılda kullanılmazsa üçüncü yılın matrahına eklenir.\n\n' +
              '**Vergi ertelemesidir, indirim değil.** SAP’ta standart AA fonksiyonu değildir; ' +
              'elle G/L kaydıyla izlenir.' },

      { ad:'Hareket · Olağandışı amortisman', en:'Unplanned Depreciation — ABAA',
        aciklama:'Planlanan amortismanın dışında, değer düşüklüğü nedeniyle elle kaydedilen amortisman.',
        neZaman:'Hasar, teknolojik eskime, piyasa değerinde kalıcı düşüş.',
        ornek:'Yangında hasar gören makinenin değeri 200.000 TL düşürülür.',
        tcodes:['ABAA'] },

      { ad:'Amortisman alanı', en:'Depreciation Area',
        aciklama:'Aynı varlığın farklı amaçlarla farklı değerlenmesi. Her alan kendi ' +
                 '{{amortisman-anahtari}} ve {{faydali-omur}} değerine sahiptir.',
        neZaman:'Ticari muhasebe, vergi mevzuatı, IFRS ve grup raporlaması aynı anda gerekiyorsa — ' +
                'yani neredeyse her kurumsal şirkette.',
        ornek:'Alan 01 ticari (10 yıl, normal) · Alan 15 vergi (8 yıl, azalan) · Alan 32 IFRS (bileşen bazlı).',
        tcodes:['OADB','AW01N'] },
    ],

    karsilastirmaBasliklar:['Normal (doğrusal)', 'Azalan bakiyeler'],
    karsilastirma:[
      ['VUK dayanağı', 'md. 315', 'mükerrer md. 315'],
      ['Hesaplama tabanı', 'Edinim değeri (**sabit**)', '{{net-defter-degeri}} (**azalan**)'],
      ['Oran', '1 / faydalı ömür', 'Normal oranın **2 katı**, azami **%50**'],
      ['Dönem tutarı', 'Her dönem **aynı**', 'İlk yıllar yüksek, sonra düşer'],
      ['1. yıl (600.000, 5 yıl)', '120.000 TL (%20)', '**240.000 TL** (%40)'],
      ['5. yıl (son)', '120.000 TL', '**Kalan bakiyenin tamamı** — 77.760 TL'],
      ['Kim uygulayabilir', 'Herkes', 'Yalnızca **bilanço esasına** göre defter tutanlar'],
      ['Yöntem değiştirme', 'Azalana **geçilemez**', 'Normale **geçilebilir**'],
      ['Vergi etkisi', 'Vergi eşit dağılır', 'İlk yıllar **daha az vergi** — nakit avantajı'],
      ['SAP’ta tanımı', '{{AFAMR}} temel yöntem', '{{AFAMD}} + son yıl sıfırlama ayarı'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'AS01', ad:'Duran varlık oluştur',
        amac:'Yeni varlık ana verisini {{varlik-sinifi}}’na dayanarak açar.',
        neZaman:'Aktifleştirilecek her alımda — **edinim kaydından önce**.',
        adimlar:[
          { baslik:'Varlık sınıfı ve şirket kodunu gir',
            aciklama:'Sınıf seçilir seçilmez hesap belirleme, numara aralığı ve varsayılan amortisman ' +
                     'ayarları otomatik gelir. **Yanlış sınıf = yanlış hesap = sonradan düzeltmesi zor.**' },
          { baslik:'*Genel* sekmesi',
            aciklama:'Tanım (varlığın adı), miktar, envanter numarası, seri numarası.' },
          { baslik:'*Zaman bağımlı* sekmesi',
            aciklama:'{{maliyet-yeri}}, tesis, sorumlu kişi. Bu alanlar tarih bazlı değişebilir ' +
                     've {{ANLZ}} tablosunda geçerlilik tarihiyle saklanır.' },
          { baslik:'*Amortisman alanları* sekmesi',
            aciklama:'Her {{amortisman-alani}} için {{amortisman-anahtari}} ve {{faydali-omur}} ayrı ayrı ' +
                     'ayarlanır. Ticari 10 yıl, vergi 8 yıl gibi farklılıklar burada tanımlanır.' },
          { baslik:'Kaydet',
            aciklama:'Varlık numarası verilir. **Değeri henüz sıfırdır** — edinim ayrı bir işlemdir.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Varlık sınıfı 3000 (Makine ve tesisat) · Şirket kodu 1000' },
          { ekran:'Genel', islem:'Tanım: Dokuma makinesi Model X · Envanter no: MAK-2026-018' },
          { ekran:'Zaman bağımlı', islem:'Maliyet yeri 3100 (Üretim) · Tesis 1000' },
          { ekran:'Amortisman alanları', islem:'Alan 01: anahtar LINR, ömür 10 yıl · Alan 15: anahtar DEGR, ömür 8 yıl' },
        ],
        alanlar:{
          zorunlu:['Varlık sınıfı','Şirket kodu','Tanım','Amortisman anahtarı','Faydalı ömür'],
          opsiyonel:['Envanter numarası','Seri numarası','Maliyet yeri','Tesis','Sorumlu kişi','Miktar'] },
        hatalar:[
          { mesaj:'Account determination ... for asset class not maintained', sebep:'{{AO90}}’da varlık sınıfı için hesap belirleme eksik.', cozum:'{{AO90}} ile bilanço hesabı, birikmiş amortisman, amortisman gideri ve satış kâr/zarar hesaplarını tanımla.' },
          { mesaj:'Depreciation key ... does not allow useful life of 0', sebep:'Faydalı ömür girilmemiş.', cozum:'Amortisman alanı sekmesinde ömrü gir; varlık sınıfında varsayılan tanımlıysa otomatik gelir.' },
          { mesaj:'Asset class ... is not defined for chart of depreciation ...', sebep:'Sınıf, şirket kodunun {{degerleme-plani}}nda tanımlı değil.', cozum:'{{OAOA}} ile sınıfı ilgili değerleme planına bağla.' },
        ],
        ipucu:'Benzer bir varlığı **şablon olarak kopyala** (giriş ekranında referans varlık numarası gir). ' +
              'Amortisman ayarlarını yeniden düşünmek zorunda kalmazsın ve tutarlılık sağlanır.',
        ilgili:['AS02','AS03','AS11','ABZON','AW01N','OAOA'] },

      { kod:'AW01N', ad:'Varlık gezgini — AA’nın kontrol paneli',
        amac:'Bir varlığın tüm hayatını tek ekranda gösterir: değer alanları, planlanan/gerçekleşen ' +
             'amortisman, tüm hareketler ve bağlı FI belgeleri.',
        neZaman:'Her varlık sorusunda. AA’da teşhis buradan başlar.',
        adimlar:[
          { baslik:'Varlık numarası ve şirket kodunu gir' },
          { baslik:'Sol taraftan {{amortisman-alani}} seç',
            aciklama:'Alan 01 ticari, alan 15 vergi… Her alan **farklı değerler** gösterir. ' +
                     'Yanlış alana bakıp "değerler tutmuyor" demek klasik hatadır.' },
          { baslik:'*Planlanan değerler* sekmesi',
            aciklama:'Edinim değeri, birikmiş amortisman, {{net-defter-degeri}} ve yılın planlanan amortismanı.' },
          { baslik:'*Kayıtlanan değerler* sekmesi',
            aciklama:'Dönem dönem fiilen kaydedilmiş amortisman. Planlanan ile karşılaştırılır.' },
          { baslik:'*Karşılaştırma* sekmesi',
            aciklama:'Yıllar arası değer gelişimi — varlığın ömrü boyunca değerinin nasıl eridiği görülür.' },
          { baslik:'Hareket satırına çift tıkla → FI belgesine in' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Varlık 100018-0 · Şirket kodu 1000 · Mali yıl 2026' },
          { ekran:'Planlanan değerler (alan 01)', islem:'Edinim 600.000 · Birikmiş 50.000 · NDD 550.000' },
          { ekran:'Alan 15 seçildi', islem:'Aynı varlık, vergi alanı: Birikmiş 75.000 · NDD 525.000' },
          { ekran:'Hareketler', islem:'100 Edinim 01.03.2026 · belge 3000000123' },
        ],
        ipucu:'"Bu varlığın amortismanı neden bu kadar?" sorusunun cevabı burada üç adımda bulunur: ' +
              '**(1)** doğru alandasın mı, **(2)** amortisman anahtarı ne, **(3)** faydalı ömür ve ' +
              'aktifleştirme tarihi doğru mu.',
        hatalar:[
          { mesaj:'Asset ... does not exist in company code ...', sebep:'Varlık başka şirket kodunda veya numara yanlış.', cozum:'{{AR01}} ile varlık listesinden ara.' },
        ],
        ilgili:['AS03','AR01','AR02','AFAB'] },

      { kod:'ABZON', ad:'Duran varlık edinimi (otomatik karşı hesapla)',
        amac:'Satıcı faturası olmadan, karşı hesabı otomatik belirlenen varlık alımını kaydeder.',
        neZaman:'Basit alımlarda; satıcı faturası ayrıca AP’de işlenecekse; veri geçişinde açılış değerlerinde.',
        adimlar:[
          { baslik:'Varlık numarası ve belge tarihlerini gir' },
          { baslik:'{{hareket-turu}} seç (genelde 100 — dış edinim)',
            aciklama:'Hareket türü hangi değer alanlarının etkileneceğini ve hangi hesapların ' +
                     'çalışacağını belirler.' },
          { baslik:'Tutarı ve **aktifleştirme tarihini** gir',
            aciklama:'Aktifleştirme tarihi **amortismanın başlangıcını** belirler. Geçmişe tarihlenirse ' +
                     'sistem geçmiş dönemlerin amortismanını da hesaplar.' },
          { baslik:'Simüle et ve kaydet' },
        ],
        alanlar:{
          zorunlu:['Varlık numarası','Belge tarihi','Kayıt tarihi','Hareket türü','Tutar'],
          opsiyonel:['Aktifleştirme tarihi','Metin','Referans','Miktar'] },
        hatalar:[
          { mesaj:'Posting period ... is not open for account type A', sebep:'Dönem duran varlık hesap tipi (A) için kapalı.', cozum:'{{OB52}}’de **A** satırında dönemi aç.' },
          { mesaj:'Asset ... is blocked for acquisition', sebep:'Varlık {{AS05}} ile bloke edilmiş.', cozum:'Bloğu kaldır veya doğru varlığı seç.' },
          { mesaj:'Depreciation area 15 must be posted to G/L', sebep:'Amortisman alanı yapılandırması tutarsız.', cozum:'{{OADB}} ile alanın deftere kayıt ayarını kontrol et.' },
          { mesaj:'Fiscal year ... is already closed for asset accounting', sebep:'Yıl {{AJAB}} ile kapatılmış.', cozum:'Kapanan yıla kayıt yapılamaz; cari yıla kaydet veya yılı yeniden aç (dikkatli — denetim etkisi var).' },
        ],
        ipucu:'Aktifleştirme tarihi ile kayıt tarihini karıştırma. Kayıt tarihi muhasebe dönemini, ' +
              '**aktifleştirme tarihi amortisman başlangıcını** belirler. Makine Mart’ta alınıp ' +
              'Nisan’da kaydedilirse aktifleştirme Mart olmalıdır.',
        ilgili:['F-90','AS01','AW01N','AFAB'] },

      { kod:'AFAMA', ad:'Amortisman anahtarı — SAP’ın sorduğu beş soruya verilen cevap paketi',
        amac:'Bir varlığa "amortisman ayır" demek yetmez. SAP **beş şey** bilmek ister. ' +
             'Amortisman anahtarı, bu beş cevabın paketlenmiş hâlidir.',
        neZaman:'Kurulumda; yeni bir amortisman davranışı gerektiğinde (örneğin binek otomobil için kıst).',
        adimlar:[
          { baslik:'1⃣ "Hangi mantıkla hesaplayayım?"',
            aciklama:'Doğrusal mı, azalan bakiyeler mi? Oranı ben mi vereceğim yoksa ' +
                     '{{faydali-omur}}’den mi hesaplasın? **Ömür bitince ne olsun** — dursun mu, ' +
                     'kalanı sıfırlasın mı?\n\n' +
                     'Cevap **temel yönteme** ({{AFAMR}}) yazılır.' },
          { baslik:'2⃣ "Azalan bakiyelerse, ne kadar hızlı?"',
            aciklama:'Çarpan kaç olsun (VUK’ta **2**)? Tavan var mı (VUK’ta **%50**)? ' +
                     'Alt sınır var mı?\n\n' +
                     'Cevap **azalan bakiyeler yöntemine** ({{AFAMD}}) yazılır. ' +
                     'Doğrusal anahtarlarda bu adım **boş bırakılır**.' },
          { baslik:'3⃣ "Oran zamanla değişecek mi?"',
            aciklama:'*"İlk 4 yıl %40, sonra %25"* gibi bir kademe var mı? ' +
                     'VUK’taki **azalandan normale geçiş** burada tanımlanır.\n\n' +
                     'Cevap **çok seviyeli yönteme** ({{AFAMS}}) yazılır. Gerekmiyorsa boş.' },
          { baslik:'4⃣ "Ne zaman başlasın, ne zaman bitsin?" — **en kritik adım**',
            aciklama:'Varlık Nisan’da alındıysa amortisman **Ocak’tan mı** yoksa **Nisan’dan mı** başlasın? ' +
                     'Çıkışta son ay sayılsın mı?\n\n' +
                     'Cevap **dönem kontrolü yöntemine** ({{AFAMP}}) yazılır. ' +
                     '**{{kist-amortisman}} tam olarak burada yaşar.**' },
          { baslik:'5⃣ "Tavan tutar var mı?"',
            aciklama:'Yıllık amortisman belirli bir tutarı geçmesin mi? ' +
                     'Nadiren kullanılır; çoğu anahtarda **boş**.' },
          { baslik:'Beş cevap birleştirilir ve anahtara bir kod verilir',
            aciklama:'Örneğin `Z_GENEL` veya `Z_BINEK`. Artık bu kod bir varlığa atandığında ' +
                     'sistem amortismanı nasıl hesaplayacağını **tam olarak** bilir.' },
        ],
        ekranAkisi:[
          { ekran:'**Örnek: `Z_GENEL`**', islem:'Genel varlıklar için doğrusal, tam yıl amortisman' },
          { ekran:'1 · Temel yöntem', islem:'Doğrusal · **faydalı ömürden** hesapla · ömür bitince **dur**' },
          { ekran:'2 · Azalan bakiyeler', islem:'*(boş — doğrusal anahtar)*' },
          { ekran:'3 · Çok seviyeli', islem:'*(boş — oran sabit)*' },
          { ekran:'4 · **Dönem kontrolü**', islem:'Edinim: **yıl başından itibaren** → tam yıl' },
          { ekran:'5 · Azami tutar', islem:'*(boş)*' },
          { ekran:'— — —', islem:'— — —' },
          { ekran:'**Örnek: `Z_BINEK`**', islem:'Binek otomobil için doğrusal, **kıst** amortisman' },
          { ekran:'1 · Temel yöntem', islem:'Doğrusal · faydalı ömürden · ömür bitince dur — **Z_GENEL ile aynı**' },
          { ekran:'2 · Azalan bakiyeler', islem:'*(boş)* — **aynı**' },
          { ekran:'3 · Çok seviyeli', islem:'*(boş)* — **aynı**' },
          { ekran:'4 · **Dönem kontrolü**', islem:'Edinim: **edinim ayından itibaren oransal** → **TEK FARK**' },
          { ekran:'5 · Azami tutar', islem:'*(boş)* — **aynı**' },
        ],
        alanlar:{
          zorunlu:['Anahtar kodu','Temel yöntem','Dönem kontrolü yöntemi'],
          opsiyonel:['Azalan bakiyeler yöntemi','Çok seviyeli yöntem','Azami tutar yöntemi'] },
        hatalar:[
          { mesaj:'Varlık amortisman ayırmıyor', sebep:'Anahtar **0000** (amortisman yok) veya {{yatirim-devam}} sınıfından kopyalanmış.', cozum:'{{AW01N}} ile varlığın anahtarını kontrol et.' },
          { mesaj:'Varlık ömür sonunda sıfırlanmıyor, küçük bakiye kalıyor', sebep:'Temel yöntemde **"ömür bitince kalanı sıfırla"** ayarı yapılmamış — azalan bakiyelerde tipik.', cozum:'{{AFAMR}} temel yönteminde ömür sonu davranışını düzelt.' },
          { mesaj:'Binek otomobile tam yıl amortisman ayrılıyor', sebep:'Genel anahtar kullanılmış; dönem kontrolü tam yıl.', cozum:'Kıst dönem kontrolü taşıyan ayrı anahtar tanımla ve araçlara ata.' },
        ],
        ipucu:'**Anahtarı anlamanın en kolay yolu, iki anahtarı yan yana koymaktır.**\n\n' +
              'Yukarıdaki `Z_GENEL` ve `Z_BINEK` beş slotun **dördünde aynıdır**; ' +
              'yalnızca dönem kontrolü farklıdır. ' +
              'İkisi de doğrusal, ikisi de faydalı ömürden hesaplıyor, ikisi de ömür bitince duruyor.\n\n' +
              'Anahtarın neden beş parçaya bölündüğü tam olarak budur: ' +
              '**ortak parçaları paylaşıp yalnızca farklı olanı değiştirebilmek.** ' +
              'Tek parça olsaydı her varlık tipi için sıfırdan anahtar yazmak gerekirdi.\n\n' +
              '**Kullanılmakta olan anahtarın parametresini değiştirme.** ' +
              'O anahtarı taşıyan tüm varlıkların gelecek amortismanı değişir. ' +
              'Değişiklik gerekiyorsa **yeni anahtar** açıp varlıklara ata.',
        ilgili:['AFAMR','AFAMD','AFAMS','AFAMP','AW01N'] },

      { kod:'AFAB', ad:'Amortisman çalıştırma',
        amac:'Dönemin planlanan amortismanını hesaplayıp FI’a kaydeder.',
        neZaman:'Her ay sonu, dönem kapanışından önce. AA’nın en kritik toplu işlemidir.',
        adimlar:[
          { baslik:'Şirket kodu, mali yıl ve dönemi gir' },
          { baslik:'Çalıştırma nedenini seç',
            aciklama:'**Planlanan çalıştırma** (normal aylık), **tekrar** (aynı dönemi yeniden), ' +
                     '**kısıtlı** (yalnızca seçili varlıklar), **yeniden başlatma** (yarım kalan koşu).' },
          { baslik:'**Önce deneme (test) modunda çalıştır**',
            aciklama:'Hangi varlığa ne kadar amortisman ayrılacağını kaydetmeden gösterir. ' +
                     'Bu adım atlanmamalıdır — gerçek koşu geri alınamaz.' },
          { baslik:'Sonucu incele',
            aciklama:'Beklenmedik tutarlar varsa {{AW01N}} ile o varlığa in: amortisman anahtarı, ' +
                     'faydalı ömür ve aktifleştirme tarihini kontrol et.' },
          { baslik:'Gerçek modda arka planda çalıştır',
            aciklama:'Çok sayıda varlıkta ön planda çalıştırma zaman aşımına uğrar; **arka plan işi** olarak planlanır.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Şirket kodu 1000 · Mali yıl 2026 · Dönem 03 · **Test ✓**' },
          { ekran:'Test sonucu', islem:'1.847 varlık · toplam amortisman 284.500 TL' },
          { ekran:'Gerçek çalıştırma', islem:'Arka planda çalıştırıldı → belge 1000004521 (AF)' },
        ],
        alanlar:{
          zorunlu:['Şirket kodu','Mali yıl','Kayıt dönemi','Çalıştırma nedeni'],
          opsiyonel:['Varlık aralığı','Test modu','Liste ayrıntı seviyesi'] },
        hatalar:[
          { mesaj:'Depreciation already posted for period 03', sebep:'Dönem zaten çalıştırılmış.', cozum:'"Tekrar" (repeat) çalıştırma nedenini seç — yalnızca değişen varlıklar için fark kaydedilir.' },
          { mesaj:'Posting period for asset accounting is not open', sebep:'{{OB52}}’de A hesap tipi kapalı.', cozum:'Dönemi aç.' },
          { mesaj:'Error in account determination for asset ...', sebep:'{{AO90}}’da amortisman gideri veya birikmiş amortisman hesabı tanımsız.', cozum:'Varlık sınıfının hesap belirlemesini tamamla.' },
          { mesaj:'Depreciation run terminated', sebep:'Zaman aşımı veya tek bir varlıkta hata.', cozum:'"Yeniden başlatma" (restart) nedeniyle çalıştır; hatalı varlığı log’dan bul.' },
        ],
        ipucu:'{{AFAB}} **her zaman önce deneme modunda** çalıştırılır. Gerçek koşudan sonra düzeltme, ' +
              'ters kayıt gerektirir ve zahmetlidir. Ayrıca çok varlıklı sistemlerde mutlaka ' +
              '**arka plan işi** olarak planlanmalıdır.',
        ilgili:['AW01N','AJAB','AJRW','ABAA'] },

      { kod:'ABAVN', ad:'Duran varlık hurdaya ayırma',
        amac:'Gelir getirmeyen çıkışı kaydeder; {{net-defter-degeri}} zarar yazılır.',
        neZaman:'Varlık kullanılamaz hâle geldiğinde, imha edildiğinde, çalındığında.',
        adimlar:[
          { baslik:'Varlık numarası ve çıkış tarihini gir' },
          { baslik:'Hareket türünü seç (200/250 — hurdaya ayırma)' },
          { baslik:'Tam mı kısmi mi çıkış olduğunu belirt',
            aciklama:'Kısmi çıkışta miktar veya tutar oranı girilir; varlığın bir bölümü kayıtta kalır.' },
          { baslik:'Simüle et ve kaydet',
            aciklama:'Sistem 253 ve 257 hesaplarını otomatik temizler ve kalan defter değerini zarar yazar.' },
        ],
        ipucu:'Hurdaya ayırma **kararı** muhasebe kararı değil, işletme kararıdır. ' +
              'Defter değeri yüksek bir varlığı hurdaya ayırmak o dönemin kârını ciddi biçimde düşürür — ' +
              'bu yüzden genelde yönetim onayı gerektirir.',
        hatalar:[
          { mesaj:'Retirement date is before capitalization date', sebep:'Çıkış tarihi aktifleştirme tarihinden önce.', cozum:'Tarihleri kontrol et; hatalı aktifleştirme varsa önce onu düzelt.' },
        ],
        ilgili:['F-92','ABAON','ABUMN','AW01N'] },

      { kod:'ABUMN', ad:'Duran varlık transferi',
        amac:'Varlığı başka bir varlığa, sınıfa veya şirket koduna aktarır.',
        neZaman:'{{yatirim-devam}} aktifleştirmede, yanlış sınıfta açılmış varlığı düzeltirken, ' +
                'şirketler arası devirde.',
        adimlar:[
          { baslik:'Kaynak varlık ve transfer tarihini gir' },
          { baslik:'Hedef varlığı gir veya yeni varlık oluştur',
            aciklama:'Ekranda "yeni varlık" seçeneğiyle hedefi anında yaratabilirsin.' },
          { baslik:'Tam veya kısmi transfer seç' },
          { baslik:'Simüle et ve kaydet',
            aciklama:'Kaynak varlığın değerleri hedefe taşınır; birikmiş amortisman da devreder.' },
        ],
        ipucu:'Yanlış varlık sınıfında açılmış bir varlığı düzeltmenin tek yolu {{ABUMN}} ile ' +
              'doğru sınıfta yeni bir varlığa transferdir. Sınıf ana veride **değiştirilemez** ' +
              'çünkü hesap belirlemeyi ve numara aralığını etkiler.',
        ilgili:['AIAB','AIBU','ABAVN','AS01'] },

      { kod:'AIAB', ad:'AuC yerleşim kuralı tanımla — **aktifleştirmenin ilk adımı**',
        amac:'Yapılmakta olan yatırımdaki maliyetlerin hangi varlıklara, hangi oranda ' +
             'aktarılacağını tanımlar (settlement rule).',
        neZaman:'Aktifleştirmeden **önce**. {{AIBU}} kural olmadan çalışmaz.',
        adimlar:[
          { baslik:'AuC varlık numarasını gir',
            aciklama:'Sistem üzerinde biriken maliyet kalemlerini listeler.' },
          { baslik:'Yerleşim türünü belirle',
            aciklama:'**Özet** (tüm tutar tek hedefe) veya **kalem bazlı** ' +
                     '(her kalem ayrı hedefe). Varlık sınıfı ayarına bağlıdır.' },
          { baslik:'Hedef varlıkları gir',
            aciklama:'Hedef varlıklar {{AS01}} ile **önceden açılmış olmalıdır**. ' +
                     'AuC kendisi hedef olamaz.' },
          { baslik:'Dağıtım oranını veya tutarını gir',
            aciklama:'Yüzde, sabit tutar veya eşdeğer sayı. ' +
                     'Toplam **%100 olmalıdır**, yoksa kalan AuC’de kalır.' },
          { baslik:'Kaydet — kural artık {{AIBU}} tarafından kullanılabilir' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'AuC varlığı 4000012 · şirket 1000' },
          { ekran:'Maliyet kalemleri', islem:'12 kalem · toplam 3.500.000 TL' },
          { ekran:'Yerleşim kuralı', islem:'252 Binalar %74,3 · 253 Makine %20 · 255 Demirbaş %5,7' },
          { ekran:'Doğrulama', islem:'Toplam **%100** ✓' },
        ],
        alanlar:{
          zorunlu:['AuC varlık numarası','Hedef varlık','Dağıtım oranı/tutarı','Yerleşim türü'],
          opsiyonel:['Geçerlilik dönemi','Yerleşim profili'] },
        hatalar:[
          { mesaj:'Settlement rule is incomplete / total is not 100%', sebep:'Dağıtım oranları toplamı %100 değil.', cozum:'Oranları düzelt. Eksik kalan tutar aktifleştirilmez ve AuC’de asılı kalır.' },
          { mesaj:'Receiver asset does not exist', sebep:'Hedef varlık açılmamış.', cozum:'Önce {{AS01}} ile hedef varlığı doğru {{varlik-sinifi}}’nda aç.' },
          { mesaj:'Line item settlement not allowed for this asset class', sebep:'AuC varlık sınıfı özet yerleşime ayarlı.', cozum:'**Sınıf ayarı sonradan değiştirilemez.** Kalem bazlı gerekiyorsa yeni AuC açılıp maliyet transfer edilmelidir — bu yüzden karar baştan verilmelidir.' },
        ],
        ipucu:'**Yerleşim kuralı tasarımı, faydalı ömrü belirler.** ' +
              'Bina + makine aynı AuC’de birikip tek bir "bina" varlığına aktarılırsa, ' +
              'makine de 50 yıla yayılır ve amortisman yıllarca eksik hesaplanır.\n\n' +
              'Bu yüzden proje başlarken sorulacak soru şudur: ' +
              '**"Bu yatırım kaç farklı faydalı ömürde varlık üretecek?"** ' +
              'Cevap birden fazlaysa AuC sınıfı **kalem bazlı yerleşime** ayarlanmalıdır.',
        ilgili:['AIBU','AS01','ABUMN','AW01N'] },

      { kod:'AIBU', ad:'AuC’yi aktifleştir — **amortismanın başladığı an**',
        amac:'{{AIAB}} ile tanımlanan kurala göre AuC maliyetini hedef varlıklara aktarır.',
        neZaman:'Yatırım kullanıma hazır olduğunda; kısmi devreye almalarda her aşamada.',
        adimlar:[
          { baslik:'AuC varlık numarasını ve **aktifleştirme tarihini** gir',
            aciklama:'**Bu tarih amortismanın başlangıcını belirler** — faturaların tarihi değil. ' +
                     'Varlığın fiilen kullanıma hazır olduğu gün girilmelidir.' },
          { baslik:'Yerleşim kuralını doğrula',
            aciklama:'{{AIAB}} ile tanımlanan hedefler ve oranlar görüntülenir.' },
          { baslik:'**Test modunda çalıştır**',
            aciklama:'Hangi tutarın hangi varlığa gideceği kontrol edilir.' },
          { baslik:'Gerçek modda çalıştır',
            aciklama:'{{hareket-turu}} **336** ile transfer belgesi oluşur: ' +
                     '252/253 borç, 258 alacak.' },
          { baslik:'AuC bakiyesinin **sıfırlandığını** doğrula ({{AW01N}})',
            aciklama:'Kısmi aktifleştirmede kalan tutar bilinçli olarak durur.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'AuC 4000012 · aktifleştirme tarihi **01.10.2026**' },
          { ekran:'Test', islem:'252 → 2.600.000 · 253 → 700.000 · 255 → 200.000' },
          { ekran:'Gerçek', islem:'Belge 4900001188 · hareket türü 336' },
          { ekran:'Kontrol', islem:'{{AW01N}} → AuC bakiyesi **0** ✓' },
        ],
        alanlar:{
          zorunlu:['AuC varlık numarası','Aktifleştirme tarihi','Yerleşim kuralı (önceden)'],
          opsiyonel:['Kısmi tutar','Belge tarihi'] },
        hatalar:[
          { mesaj:'No settlement rule maintained', sebep:'{{AIAB}} ile kural tanımlanmamış.', cozum:'Önce {{AIAB}} çalıştır. **Sıra değiştirilemez.**' },
          { mesaj:'Asset ... is not an asset under construction', sebep:'Varlık AuC sınıfında değil.', cozum:'AuC olarak açılmamış bir varlık {{AIBU}} ile aktifleştirilemez; normal transfer için {{ABUMN}} kullanılır.' },
          { mesaj:'Posting period is not open for account type A', sebep:'Varlık hesap tipi için dönem kapalı.', cozum:'{{OB52}}’de **A** hesap tipini aç.' },
          { mesaj:'Aktifleştirme yapıldı ama amortisman başlamadı', sebep:'Aktifleştirme tarihi gelecek bir tarih veya hedef varlığın amortisman anahtarı 0000.', cozum:'{{AW01N}} ile hedef varlığın amortisman anahtarını kontrol et — AuC sınıfından kopyalanmış olabilir.' },
        ],
        ipucu:'**En kritik alan aktifleştirme tarihidir.** ' +
              'Sistem bu tarihi soruyor çünkü *"varlık ne zaman kullanıma hazır oldu?"* ' +
              'sorusunun cevabını **yalnızca insan bilebilir** — faturaların tarihi bunu göstermez.\n\n' +
              'Yanlış tarih iki yönde de zarar verir: erken tarih, henüz kullanılmayan varlığa ' +
              'amortisman ayırır; geç tarih, çalışan varlığın maliyetini gizler ve ' +
              'o dönemlerin kârını olduğundan yüksek gösterir.',
        ilgili:['AIAB','AW01N','AFAB','ABUMN'] },

      { kod:'AJAB', ad:'Duran varlık yıl sonu kapanışı',
        amac:'Varlık muhasebesinde mali yılı kapatır; kapanan yıla artık kayıt yapılamaz.',
        neZaman:'Yıl sonunda, tüm amortisman koşuları tamamlandıktan **sonra**.',
        adimlar:[
          { baslik:'Şirket kodu ve kapatılacak mali yılı gir' },
          { baslik:'Önce test modunda çalıştır',
            aciklama:'Sistem kapanışa engel olan durumları listeler: eksik amortisman koşusu, ' +
                     'hatalı varlıklar, dengesiz alanlar.' },
          { baslik:'Engelleri gider, sonra gerçek modda kapat' },
        ],
        hatalar:[
          { mesaj:'Depreciation not completely posted for fiscal year', sebep:'Yılın tüm dönemleri için {{AFAB}} çalıştırılmamış.', cozum:'Eksik dönemleri çalıştır; 12 dönemin hepsi tamamlanmalıdır.' },
        ],
        ipucu:'Sıra önemlidir: **{{AJRW}} (yeni yıl açma) → yıl boyunca {{AFAB}} → {{AJAB}} (eski yılı kapatma)**. ' +
              'AJRW yapılmadan yeni yıla varlık kaydı yapılamaz.',
        ilgili:['AJRW','AFAB','OB52'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'AA’nın tablo yapısı **dört katmandır**: ana veri ({{ANLA}}), amortisman ayarları ({{ANLB}}), ' +
      'yıllık değerler ({{ANLC}}) ve hareketler ({{ANEP}}). ' +
      'Bir varlık sorusunun cevabı neredeyse her zaman bu dördünden birindedir.',

    liste:[
      { ad:'ANLA', baslik:'Duran varlık ana kaydı',
        tutar:'Varlığın kimliği: sınıf, tanım, aktifleştirme tarihi, envanter numarası.',
        olusturan:'{{AS01}}',
        guncelleyen:'{{AS01}}, {{AS02}}, {{ABUMN}} (transferde)',
        anahtar:'BUKRS + ANLN1 + ANLN2',
        iliskiler:'{{ANLB}} amortisman ayarları, {{ANLC}} yıllık değerler, {{ANEP}} hareketler, ' +
                  '{{ANLZ}} zaman bağımlı atamalar — hepsi bu kayda bağlıdır.',
        s4:'Ana veri yapısı korundu; değerler {{ACDOCA}}’ya taşındı.',
        alanlar:[
          { ad:'ANLN1', aciklama:'Ana varlık numarası' },
          { ad:'ANLN2', aciklama:'Alt varlık numarası — bileşenleri ayrı izlemek için ({{AS11}})' },
          { ad:'ANLKL', aciklama:'**{{varlik-sinifi}}** — hesap belirlemeyi ve numara aralığını getirir' },
          { ad:'AKTIV', aciklama:'**{{aktiflestirme}} tarihi** — amortismanın başlangıcı' },
          { ad:'DEAKT', aciklama:'Devre dışı bırakma tarihi — çıkış yapıldığında dolar' },
        ] },

      { ad:'ANLB', baslik:'Varlık amortisman alanı verisi',
        tutar:'Her {{amortisman-alani}} için {{amortisman-anahtari}} ve {{faydali-omur}}.',
        olusturan:'{{AS01}} — varlık sınıfından varsayılanlar gelir',
        guncelleyen:'{{AS02}}',
        anahtar:'BUKRS + ANLN1 + ANLN2 + AFABE + BDATU',
        iliskiler:'{{ANLA}}’nın çocuğu. **Bir varlığın birden çok satırı vardır** — her alan için bir tane.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'AFABE', aciklama:'Amortisman alanı numarası (01 ticari, 15 vergi, 32 IFRS)' },
          { ad:'AFASL', aciklama:'{{amortisman-anahtari}}' },
          { ad:'NDJAR / NDPER', aciklama:'Faydalı ömür — yıl ve dönem' },
        ] },

      { ad:'ANLC', baslik:'Varlık yıllık değer toplamları',
        tutar:'Yıl bazında edinim değeri, birikmiş amortisman, dönem amortismanı ve {{net-defter-degeri}}.',
        olusturan:'Edinim ve amortisman kayıtları',
        guncelleyen:'{{ABZON}}, {{AFAB}}, {{ABAVN}}, {{ABUMN}}',
        anahtar:'BUKRS + ANLN1 + ANLN2 + GJAHR + AFABE',
        iliskiler:'{{AW01N}}’in *Planlanan değerler* sekmesi buradan okur.',
        s4:'S/4HANA’da değerler {{ACDOCA}}’dan hesaplanır; ANLC uyumluluk amaçlıdır.',
        alanlar:[
          { ad:'KANSW', aciklama:'Edinim değeri (yıl başı)' },
          { ad:'KNAFA', aciklama:'Birikmiş normal amortisman' },
          { ad:'NAFAG', aciklama:'Yılın kaydedilmiş amortismanı' },
        ] },

      { ad:'ANEP', baslik:'Varlık hareket kalemleri',
        tutar:'Varlığa yapılan **her hareket**: edinim, çıkış, transfer, değer düzeltme.',
        olusturan:'{{ABZON}}, {{F-90}}, {{ABAVN}}, {{ABUMN}}, {{AFAB}}',
        guncelleyen:'Her varlık işlemi',
        anahtar:'BUKRS + ANLN1 + ANLN2 + GJAHR + LNRAN + AFABE',
        iliskiler:'{{ANEK}} ile belge başlığına, oradan FI belgesine bağlanır.',
        s4:'{{ACDOCA}}’ya taşındı; ANEP {{uyumluluk-view}}dir.',
        alanlar:[
          { ad:'BWASL', aciklama:'**{{hareket-turu}}** — 100 edinim, 200 çıkış, 300 transfer' },
          { ad:'ANBTR', aciklama:'Hareket tutarı' },
          { ad:'BZDAT', aciklama:'Değer tarihi — amortisman hesabında kullanılır' },
        ] },

      { ad:'ANLZ', baslik:'Varlık zaman bağımlı verisi',
        tutar:'{{maliyet-yeri}}, tesis, sorumlu kişi gibi **zaman içinde değişebilen** atamalar.',
        olusturan:'{{AS01}}',
        guncelleyen:'{{AS02}} — her değişiklik yeni bir geçerlilik aralığı yaratır',
        anahtar:'BUKRS + ANLN1 + ANLN2 + BDATU',
        iliskiler:'{{ANLA}}’nın çocuğu.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KOSTL', aciklama:'{{maliyet-yeri}} — amortisman giderinin gideceği CO nesnesi' },
          { ad:'BDATU / ADATU', aciklama:'Geçerlilik başlangıç ve bitiş tarihleri' },
        ] },

      { ad:'ANEA', baslik:'Varlık hareketi — amortisman payı',
        tutar:'Çıkış hareketlerinde birikmiş amortismanın ne kadarının düşüleceği.',
        olusturan:'{{ABAVN}}, {{F-92}}, {{ABUMN}}',
        guncelleyen:'Çıkış ve transfer işlemleri',
        s4:'{{ACDOCA}}’ya taşındı.' },

      { ad:'ANEK', baslik:'Varlık belge başlığı',
        tutar:'Varlık belgelerinin başlık bilgisi; FI belgesine köprü kurar.',
        olusturan:'Varlık işlemleri',
        guncelleyen:'Varlık işlemleri',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'Duran varlık tablo ilişkileri',
      varliklar:[
        { ad:'ANLA', rol:'Ana veri', hub:true, aciklama:'Varlık kimliği',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'ANLN1', tip:'pk' }, { ad:'ANLN2', tip:'pk' }, { ad:'ANLKL' }, { ad:'AKTIV' }] },
        { ad:'ANLB', rol:'Ayarlar', aciklama:'Amortisman alanı verisi',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'AFABE', tip:'pk' }, { ad:'AFASL' }, { ad:'NDJAR' }] },
        { ad:'ANLC', rol:'Toplam', aciklama:'Yıllık değerler',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'GJAHR', tip:'pk' }, { ad:'KANSW' }, { ad:'KNAFA' }] },
        { ad:'ANEP', rol:'Hareket', aciklama:'Varlık hareketleri',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'LNRAN', tip:'pk' }, { ad:'BWASL' }, { ad:'ANBTR' }] },
        { ad:'ANLZ', rol:'Zaman bağımlı', aciklama:'Maliyet yeri ve atamalar',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'BDATU', tip:'pk' }, { ad:'KOSTL' }] },
        { ad:'ANEK', rol:'Belge', aciklama:'Varlık belge başlığı',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'BKPF', rol:'FI belgesi', aciklama:'Muhasebe belgesi',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'ACDOCA', rol:'Evrensel', aciklama:'S/4HANA tek kaynağı',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'ANLN1', tip:'fk' }, { ad:'RACCT' }] },
      ],
      iliskiler:[
        { from:'ANLA', to:'ANLB', alanlar:'ANLN1 + ANLN2', not:'her amortisman alanı için bir satır' },
        { from:'ANLA', to:'ANLC', alanlar:'ANLN1 + ANLN2', not:'her yıl ve alan için değerler' },
        { from:'ANLA', to:'ANEP', alanlar:'ANLN1 + ANLN2', not:'varlığın tüm hareketleri' },
        { from:'ANLA', to:'ANLZ', alanlar:'ANLN1 + ANLN2', not:'zaman bağımlı atamalar' },
        { from:'ANEP', to:'ANEK', alanlar:'BELNR', not:'hareket → belge başlığı' },
        { from:'ANEK', to:'BKPF', alanlar:'BELNR', not:'varlık belgesi → FI belgesi' },
        { from:'ANEP', to:'ACDOCA', alanlar:'ANLN1 + BELNR', not:'S/4HANA’da değerler burada' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'AA’da günlük iş üç ekranda geçer: **varlık açmak** ({{AS01}}), **değer izlemek** ({{AW01N}}) ve ' +
      '**amortisman çalıştırmak** ({{AFAB}}). Bunların hepsinde ortak nokta {{amortisman-alani}} kavramıdır — ' +
      'hangi alanda olduğunu bilmeden hiçbir rakam yorumlanamaz.',

    ekranlar:[
      { ad:'{{AS01}} — Varlık sınıfı seçim ekranı',
        aciklama:'Tüm varlığın kaderini belirleyen tek karar burada verilir.',
        alanlar:[
          { ad:'Varlık sınıfı', zorunlu:true, aciklama:'Hesap belirlemeyi, numara aralığını ve varsayılan amortisman ayarlarını getirir. **Sonradan değiştirilemez** — düzeltmek için {{ABUMN}} transferi gerekir.' },
          { ad:'Şirket kodu', zorunlu:true, aciklama:'Şirket kodunun bağlı olduğu {{degerleme-plani}} hangi amortisman alanlarının açılacağını belirler.' },
          { ad:'Referans varlık', zorunlu:false, aciklama:'Şablon olarak kopyalanacak varlık numarası. Tutarlılık için önerilir.' },
          { ad:'Benzer varlık sayısı', zorunlu:false, aciklama:'Aynı anda birden çok özdeş varlık açar (10 adet aynı bilgisayar gibi).' },
        ],
        ipucu:'Varlık sınıfı yanlış seçilirse hesaplar yanlış olur ve düzeltmenin tek yolu ' +
              '{{ABUMN}} ile doğru sınıfta yeni varlığa transferdir. Bu yüzden sınıf seçimi ' +
              'acele edilmeyecek tek adımdır.' },

      { ad:'{{AS01}} — Amortisman alanları sekmesi',
        aciklama:'Aynı varlığın farklı mevzuatlara göre nasıl değerleneceği burada ayarlanır.',
        alanlar:[
          { ad:'Amortisman alanı', zorunlu:true, aciklama:'Değerleme planından gelen alanlar listelenir: 01 ticari, 15 vergi, 32 IFRS…' },
          { ad:'{{amortisman-anahtari}}', zorunlu:true, aciklama:'Hesaplama yöntemi. Her alan **farklı** anahtar kullanabilir.' },
          { ad:'{{faydali-omur}} (yıl/dönem)', zorunlu:true, aciklama:'Her alan için ayrı. Ticari 10 yıl, vergi 8 yıl olabilir.' },
          { ad:'Amortisman başlangıç tarihi', zorunlu:false, aciklama:'Boş bırakılırsa {{aktiflestirme}} tarihinden ve dönem kontrol ayarından hesaplanır.' },
        ],
        ipucu:'Alan 01 genelde **deftere kayıt yapan** alandır; diğerleri çoğu zaman yalnızca raporlama ' +
              'içindir. Hangi alanın FI’a kayıt yaptığı {{OADB}}’de tanımlıdır ve bunu bilmeden ' +
              '"neden iki kere amortisman kaydı oluştu?" sorusu cevaplanamaz.' },

      { ad:'{{AW01N}} — Varlık gezgini',
        aciklama:'AA’nın kontrol paneli. Sol tarafta alan seçimi, sağda değerler ve hareketler.',
        alanlar:[
          { ad:'Amortisman alanı seçimi (sol panel)', zorunlu:true, aciklama:'**Her alan farklı değer gösterir.** Yanlış alana bakıp "değerler tutmuyor" demek en sık yapılan hatadır.' },
          { ad:'Planlanan değerler sekmesi', zorunlu:false, aciklama:'Edinim, birikmiş amortisman, NDD, yılın planlanan amortismanı.' },
          { ad:'Kayıtlanan değerler sekmesi', zorunlu:false, aciklama:'Dönem dönem fiilen kaydedilenler. Planlanandan sapma varsa {{AFAB}} eksik çalıştırılmıştır.' },
          { ad:'Hareketler sekmesi', zorunlu:false, aciklama:'Tüm {{hareket-turu}} kayıtları; çift tıkla FI belgesine inilir.' },
        ] },

      { ad:'{{AFAB}} — Amortisman çalıştırma ekranı',
        aciklama:'Aylık rutinin merkezi. Çalıştırma nedeni seçimi kritiktir.',
        alanlar:[
          { ad:'Mali yıl / Kayıt dönemi', zorunlu:true, aciklama:'Hangi dönemin amortismanı hesaplanacak.' },
          { ad:'Çalıştırma nedeni', zorunlu:true, aciklama:'**Planlanan** (normal), **tekrar** (aynı dönemi yeniden — fark kaydeder), **kısıtlı** (seçili varlıklar), **yeniden başlatma** (yarım kalan koşu).' },
          { ad:'Test modu', zorunlu:false, aciklama:'**Her zaman önce işaretlenir.** Gerçek koşu geri alınamaz.' },
          { ad:'Varlık aralığı', zorunlu:false, aciklama:'Kısıtlı çalıştırmada belirli varlıklar seçilir.' },
        ],
        ipucu:'Binlerce varlıklı sistemde ön planda çalıştırma zaman aşımına uğrar. ' +
              'Gerçek koşuyu **arka plan işi** olarak planla (Program → Arka planda çalıştır).' },
    ],

    zorunlu:['Varlık sınıfı','Şirket kodu','Tanım','Amortisman anahtarı','Faydalı ömür','Hareket türü (edinimde)','Tutar (edinimde)'],
    opsiyonel:['Envanter numarası','Maliyet yeri','Tesis','Sorumlu kişi','Aktifleştirme tarihi','Miktar','Seri numarası'],

    hatalar:[
      { mesaj:'Account determination ... not maintained for asset class', sebep:'{{AO90}}’da varlık sınıfı için hesap belirleme eksik.', cozum:'{{AO90}} → bilanço hesabı, birikmiş amortisman, amortisman gideri, satış kâr/zarar hesaplarını tanımla. AA’nın en sık yapılandırma hatasıdır.' },
      { mesaj:'Posting period ... is not open for account type A', sebep:'{{OB52}}’de duran varlık hesap tipi kapalı.', cozum:'**A** satırında dönemi aç. S satırını açmak yetmez.' },
      { mesaj:'Depreciation already posted for period', sebep:'Dönem zaten çalıştırılmış.', cozum:'Çalıştırma nedenini "tekrar" seç; yalnızca değişen varlıklar için fark kaydedilir.' },
      { mesaj:'Fiscal year ... already closed in asset accounting', sebep:'{{AJAB}} ile yıl kapatılmış.', cozum:'Kapanan yıla kayıt yapılamaz. Cari yıla kaydet; geçmiş yıl gerçekten açılmalıysa denetim etkisi değerlendirilmelidir.' },
      { mesaj:'Asset ... is blocked', sebep:'{{AS05}} ile edinime kapatılmış.', cozum:'Bloğu kaldır veya doğru varlığı kullan.' },
      { mesaj:'Value of depreciation area 15 is greater than area 01', sebep:'Alanlar arası tutarlılık kuralı ihlal edilmiş.', cozum:'{{OADB}}’de alanlar arası bağımlılık kurallarını kontrol et; vergi alanı ticari alandan yüksek amortisman veriyorsa kural gevşetilmelidir.' },
      { mesaj:'Cost center ... is not valid on ...', sebep:'{{ANLZ}}’deki maliyet yeri geçerlilik tarihi dışında.', cozum:'{{AS02}} → zaman bağımlı sekmesinde geçerli bir maliyet yeri gir.' },
    ],

    ipuclari:[
      '{{AW01N}} AA’nın **tek teşhis aracıdır**. Herhangi bir varlık sorusunda önce buraya git; ' +
      'doğru alanda olduğundan emin ol, sonra amortisman anahtarı ve faydalı ömre bak.',
      '{{AFAB}}’ı **her zaman önce test modunda** çalıştır ve toplamı geçen ayla karşılaştır. ' +
      'Beklenmedik sapma varsa yeni edinim veya ömür değişikliği olmuştur.',
      'Yeni varlık açarken benzer bir varlığı **şablon olarak kopyala** — amortisman ayarları hazır gelir.',
      'Varlık sınıfını doğru seçmeye özen göster; sonradan düzeltmenin tek yolu {{ABUMN}} transferidir.',
      'Yıl sonu sırası: **{{AJRW}} → (yıl boyunca {{AFAB}}) → {{AJAB}}**. AJRW yapılmadan yeni yıla kayıt yapılamaz.',
      'Amortisman gideri yanlış departmana düşüyorsa sebep {{ANLZ}}’deki **maliyet yeridir**, ' +
      'hesap belirleme değil.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ANLA', ne:'Varlık ana kaydı — {{AS01}} ile oluşur' },
      { tablo:'ANLB', ne:'Her amortisman alanı için bir satır: anahtar ve faydalı ömür' },
      { tablo:'ANLZ', ne:'Maliyet yeri ve zaman bağımlı atamalar' },
      { tablo:'ANEP', ne:'Her hareket için bir kalem ({{hareket-turu}} ile)' },
      { tablo:'ANEA', ne:'Çıkışlarda birikmiş amortisman payı' },
      { tablo:'ANLC', ne:'Yıllık değer toplamları güncellenir' },
      { tablo:'ANEK', ne:'Varlık belge başlığı — FI belgesine köprü' },
      { tablo:'BKPF', ne:'FI belgesi başlığı (AA belge türü)' },
      { tablo:'BSEG', ne:'FI kalemleri; varlık satırında `ANLN1` dolu' },
      { tablo:'ACDOCA', ne:'S/4HANA’da varlık değerleri **burada** tutulur; ANEP/ANLC uyumluluk view’i' },
    ],

    commit:
      'Varlık işlemleri tek LUW içinde yazılır: AA belgesi ({{ANEP}}/{{ANEK}}) ve FI belgesi ' +
      '({{BKPF}}/{{BSEG}}) birlikte oluşur.\n\n' +
      '{{AFAB}} farklıdır: **binlerce varlık için toplu çalışır** ve genelde birden çok FI belgesi üretir ' +
      '(belge başına kalem sınırı nedeniyle). Koşu yarıda kesilirse "yeniden başlatma" (restart) ' +
      'nedeniyle kaldığı yerden devam eder — bu yüzden yarım kalmış koşu tehlikeli değildir.',

    belgeNo:
      'Varlık işlemleri **iki numara** üretir: AA belge numarası ({{ANEK}}) ve FI belge numarası ({{BKPF}}). ' +
      'FI tarafında tipik belge türleri: **AA** (varlık kaydı), **AF** (amortisman). ' +
      'Varlık numarası ise {{varlik-sinifi}}’na bağlı numara aralığından gelir ve ' +
      'alt varlık numarası (`ANLN2`) ile ikili anahtar oluşturur.',

    postingLogic:
      'AA’nın karar zinciri:\n\n' +
      '**1. {{varlik-sinifi}}** → hesap belirleme anahtarını getirir.\n' +
      '**2. {{AO90}}** → hesap belirleme anahtarı + amortisman alanı → hangi G/L hesapları kullanılacak.\n' +
      '**3. {{hareket-turu}}** → hangi değer alanları etkilenecek (edinim mi, çıkış mı, transfer mi).\n' +
      '**4. {{amortisman-anahtari}}** → tutar nasıl hesaplanacak.\n' +
      '**5. {{OADB}}** → hangi amortisman alanı FI’a **kayıt yapacak** (diğerleri yalnız raporlama).\n' +
      '**6.** FI belgesi üretilir; varlık satırında `ANLN1` taşınır.\n\n' +
      'Bu zincirin herhangi bir halkası eksikse "account determination not possible" alınır.',

    belgeTuru:
      'AA’da kullanılan FI belge türleri: **AA** (varlık kaydı — edinim, çıkış, transfer) ve ' +
      '**AF** (amortisman). Bunlar {{OBA7}}’de tanımlıdır ve duran varlık (A) hesap tipine ' +
      'kayıt yapılmasına izin verir.',

    numberRange:
      'İki ayrı numara aralığı vardır: **varlık numarası** ({{varlik-sinifi}}’na bağlı, {{OAOA}}’da tanımlı) ' +
      've **FI belge numarası** ({{FBN1}}). Varlık numarası aralığı şirket kodu bazındadır ve ' +
      'mali yıla bağlı **değildir** — belge numarasından farkı budur.',

    accountDetermination:
      '{{AO90}} AA’nın hesap belirleme merkezidir. Girdi: **hesap belirleme anahtarı** ' +
      '({{varlik-sinifi}}’ndan gelir) + **amortisman alanı**. Çıktı:\n\n' +
      '• **Bilanço hesabı** (253 — edinim değeri)\n' +
      '• **Birikmiş amortisman hesabı** (257 — kontra varlık)\n' +
      '• **Amortisman gideri hesabı** (770/730)\n' +
      '• **Satış kâr/zarar hesapları** (679/689)\n' +
      '• **Hurda zarar hesabı**\n\n' +
      'Her amortisman alanı için ayrı tanım yapılabilir — vergi alanı farklı hesaplara yazabilir.',

    tur:
      '**Özelleştirme:** {{degerleme-plani}}, {{amortisman-alani}} tanımları ({{OADB}}), ' +
      '{{varlik-sinifi}} ({{OAOA}}), hesap belirleme ({{AO90}}), {{amortisman-anahtari}} ({{AFAMA}}), ' +
      'hareket türleri, dönem kontrol yöntemleri.\n\n' +
      '**Ana veri:** varlık kayıtları ({{ANLA}}/{{ANLB}}/{{ANLZ}}).\n\n' +
      '**Hareket verisi:** edinimler, amortismanlar, çıkışlar ({{ANEP}}).',

    transport:
      'Değerleme planı, amortisman alanları, varlık sınıfları, hesap belirleme ve amortisman ' +
      'anahtarları taşınır. Varlık kayıtları taşınmaz — her sistemde ayrı açılır veya ' +
      '{{LTMC}} ile yüklenir.\n\n' +
      '**Kritik:** {{degerleme-plani}} ülkeye özgüdür ve şirket koduna atanır. ' +
      'Bu atama yapılmadan varlık açılamaz; canlıya geçişte ilk kontrol edilecek şeydir.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Duran Varlık Muhasebesi → Organizasyon Yapıları → Değerleme Planını Kopyala/Sil/Kontrol Et', not:'{{degerleme-plani}} — ülke şablonundan kopyalanır' },
      { yol:'SPRO → … → Duran Varlık Muhasebesi → Değerleme → Amortisman Alanları → Amortisman Alanlarını Tanımla', not:'{{OADB}} — hangi alan deftere kayıt yapar' },
      { yol:'SPRO → … → Duran Varlık Muhasebesi → Organizasyon Yapıları → Varlık Sınıfları → Varlık Sınıflarını Tanımla', not:'{{varlik-sinifi}} ({{OAOA}})' },
      { yol:'SPRO → … → Duran Varlık Muhasebesi → Ana Muhasebe ile Entegrasyon → Hesap Belirlemeyi Ata', not:'{{AO90}} — AA’nın en kritik yapılandırması' },
      { yol:'SPRO → … → Duran Varlık Muhasebesi → Amortisman → Değerleme Yöntemleri → Amortisman Anahtarı → Amortisman Anahtarlarını Tanımla', not:'{{AFAMA}}' },
      { yol:'SPRO → … → Duran Varlık Muhasebesi → Dönem Sonu İşlemleri → Yıl Sonu Kapanışı', not:'{{AJAB}} / {{AJRW}} ayarları' },
    ],

    ekstra:[
      { ic:'🔑', baslik:'Amortisman anahtarı nedir? — bir örnek üzerinden', metin:
        '**Önce şu soruyla başlayalım:** sisteme *"bu makineye amortisman ayır"* dediğinde ' +
        'ne olur? Hiçbir şey — çünkü sistem **nasıl** ayıracağını bilmiyor.\n\n' +
        'Bilmesi gereken beş şey var:\n\n' +
        '**1.** Hangi mantıkla? *(doğrusal / azalan)*\n' +
        '**2.** Azalansa ne kadar hızlı? *(çarpan, tavan)*\n' +
        '**3.** Oran zamanla değişecek mi? *(kademe)*\n' +
        '**4.** Ne zaman başlasın? *(yıl başı / edinim ayı)*\n' +
        '**5.** Tavan tutar var mı?\n\n' +
        '**Amortisman anahtarı, bu beş cevabın bir koda bağlanmış hâlidir.** ' +
        'Varlığa `Z_GENEL` yazarsın, sistem beş cevabı da bilir.\n\n' +
        '**Somut örnek: bir fabrika makinesi**\n\n' +
        'Makine 600.000 TL, faydalı ömür 5 yıl, doğrusal, tam yıl amortisman istiyoruz. ' +
        'Anahtarın içi şöyle doldurulur:\n\n' +
        '**1 → Doğrusal**, oranı ben vermeyeceğim, **faydalı ömürden hesapla** (1/5 = %20), ' +
        '**ömür bitince dur**.\n' +
        '**2 → Boş** (azalan değil).\n' +
        '**3 → Boş** (oran hep %20).\n' +
        '**4 → Yıl başından itibaren** (VUK tam yıla izin veriyor).\n' +
        '**5 → Boş.**\n\n' +
        'Bu paket `Z_GENEL` adını alır. Makineye atanır. İş biter.\n\n' +
        '**Şimdi bir binek otomobil**\n\n' +
        'Aynı şeyleri istiyoruz — doğrusal, faydalı ömürden, ömür bitince dursun. ' +
        'Tek fark: {{kist-amortisman}} gerektiği için **edinim ayından başlamalı**.\n\n' +
        'Yeni anahtar `Z_BINEK`: **1, 2, 3 ve 5 aynı**, yalnızca **4 değişiyor**.\n\n' +
        '**İşte "neden beş parça?" sorusunun cevabı budur.**\n\n' +
        'Anahtar tek parça olsaydı, binek otomobil için her şeyi baştan tanımlamak gerekirdi. ' +
        'Beş parçaya bölündüğü için **dördünü aynen kullanıp yalnızca birini** değiştiriyoruz.\n\n' +
        'Aynı mantıkla üçüncü bir anahtar (`Z_AZALAN`) yaparken yalnızca 1, 2 ve 3’ü ' +
        'değiştirir, dönem kontrolünü `Z_GENEL`’den aynen alırsın.\n\n' +
        '*Bu beş parçanın SAP’taki tanım işlemleri: {{AFAMR}} · {{AFAMD}} · {{AFAMS}} · ' +
        '{{AFAMP}} · azami tutar. Hepsini birleştiren ekran {{AFAMA}}’dır — ' +
        'adım adım örneği o kartta.*' },

      { ic:'⚙️', baslik:'Beş parçanın içinde tam olarak ne var?', metin:
        'Yukarıdaki örnekte "1 → doğrusal, faydalı ömürden, ömür bitince dur" dedik. ' +
        'Bu satırdaki her ifade bir ayar. Parçaların içi şöyle:\n\n' +
        '**① Temel yöntem ({{AFAMR}}) — hesaplamanın iskeleti**\n\n' +
        '• *Amortisman tipi:* normal mi, özel/fevkalade mi\n' +
        '• *Hesaplama tabanı — dört seçenek:*\n' +
        '→ **Yüzde ile:** oranı ben veririm (%20 gibi)\n' +
        '→ **Faydalı ömürden:** sistem hesaplasın (1 ÷ 5 = %20) — *en yaygın*\n' +
        '→ **Toplam yüzde:** kademeli oran tablosu kullanılsın\n' +
        '→ **Anlık (%100):** düşük değerli varlıklarda tek seferde\n' +
        '• *Taban değer:* edinim değeri mi, **{{net-defter-degeri}}** mi ' +
        '(azalan bakiyeler bunu kullanır), yoksa **{{kalinti-deger}} düşülmüş tutar** mı\n' +
        '• *Ömür bitince ne olsun:* **dur** / **kalan değeri sıfırla** / devam et\n' +
        '→ **Azalan bakiyelerde "kalanı sıfırla" seçilmezse varlık asla sıfırlanmaz.** ' +
        'En sık gözden kaçan ayar budur.\n' +
        '• *Çıkış yılı davranışı:* satıldığı yıl amortisman ayrılsın mı\n\n' +
        '**② Azalan bakiyeler yöntemi ({{AFAMD}}) — hızlandırma ayarları**\n\n' +
        '• *Çarpan:* normal oranın kaç katı → VUK’ta **2**\n' +
        '• *Azami yüzde:* tavan → VUK’ta **%50**\n' +
        '• *Asgari yüzde:* alt sınır\n\n' +
        '*Örnek: 5 yıllık varlıkta normal oran %20 → çarpan 2 → %40. ' +
        '2 yıllık bir varlıkta %50 × 2 = %100 çıkardı, ama tavan %50 devreye girer.*\n\n' +
        '**③ Çok seviyeli yöntem ({{AFAMS}}) — kademeli oranlar**\n\n' +
        'Satır satır tanımlanır: *"1–4. yıl → %40"*, *"5. yıldan itibaren → kalanı eşit dağıt"*.\n\n' +
        'VUK’taki **azalandan normale geçiş** tam olarak böyle modellenir.\n\n' +
        '**④ Dönem kontrolü ({{AFAMP}}) — zamanlama**\n\n' +
        'Dört olay için **ayrı ayrı** kural tanımlanır:\n\n' +
        '*edinim* · *sonraki ilave* · *çıkış* · *transfer*\n\n' +
        'Yaygın kurallar: `01` dönem başından oransal · `06` **yıl başından (tam yıl)** · ' +
        '`08` ertesi yıl başından · `11` **ertesi aydan**.\n\n' +
        '**⑤ Azami tutar — tavan**\n\n' +
        'Yıllık amortismanın belirli bir tutarı geçmesini engeller. Çoğu anahtarda boş.' },

      { ic:'📅', baslik:'Kıst amortisman: en çok yanlış bilinen VUK kuralı ve SAP’taki karşılığı', metin:
        '**Yaygın sanı yanlıştır.** "Yıl ortasında alınan varlığa oransal amortisman ayrılır" ' +
        'diye bilinir — VUK’ta bu **genel kural değildir**.\n\n' +
        '**Genel kural (VUK md. 320/1):** varlık yılın hangi ayında alınırsa alınsın, ' +
        'o yıl için **tam yıl** amortismanı ayrılabilir. ' +
        '**28 Aralık’ta alınan bir makineye o yılın tamamı için amortisman ayrılır.**\n\n' +
        '**İstisna (VUK md. 320/2):** **yalnızca binek otomobillerde** kıst uygulanır. ' +
        'Aracın işletmeye kaydedildiği hesap dönemi için **ay kesri tam ay sayılarak** ' +
        'kalan ay kadar amortisman ayrılır.\n\n' +
        '*15 Nisan’da alınan binek oto → Nisan dahil 9 ay → yıllık amortismanın **9/12’si**.*\n\n' +
        '**İlk yıl ayrılamayan kısım kaybolmaz:** faydalı ömrün **son yılında** ' +
        'gider yazılarak tamamlanır. Yani toplam amortisman değişmez, ' +
        'yalnızca **bir yıl kaydırılmış** olur.\n\n' +
        '**İstisnanın istisnası:** faaliyeti binek otomobil **kiralamak veya işletmek** olanlar ' +
        '(araç kiralama şirketleri, sürücü kursları) kıst uygulamaz — onlar için otomobil ' +
        'işletme aracı değil, faaliyet konusudur.\n\n' +
        '**Sayısal örnek**\n\n' +
        'Araç 1.200.000 TL, faydalı ömür 5 yıl → yıllık amortisman **240.000 TL**.\n\n' +
        '15 Nisan’da alındı → Nisan **dahil** 9 ay → ilk yıl **180.000 TL** (9/12).\n' +
        '2–5. yıllar → her yıl **240.000 TL**.\n' +
        '6. yıl → ilk yıldan kalan **60.000 TL**.\n\n' +
        'Toplam: 180.000 + 960.000 + 60.000 = **1.200.000 TL** ✓\n\n' +
        '**Toplam amortisman değişmedi** — 5 yıl yerine 6 takvim yılına yayıldı. ' +
        'Kıst bir *indirim* değil, bir *zamanlama* kuralıdır.\n\n' +
        '**SAP’ta nasıl sağlanır**\n\n' +
        'Amortisman anahtarının **dördüncü parçası** olan dönem kontrolü ({{AFAMP}}) ile. ' +
        'Genel varlıklarda "yıl başından itibaren", binek otomobillerde ' +
        '"edinim ayından itibaren oransal" kuralı seçilir.\n\n' +
        'Yani **iki ayrı anahtar gerekir** ve aralarındaki tek fark budur — ' +
        'somut örneği {{AFAMA}} kartındaki `Z_GENEL` / `Z_BINEK` karşılaştırmasındadır.\n\n' +
        '**Sık yapılan kurulum hatası:** tüm varlıklara tek anahtar verilip ' +
        'binek otomobillere de tam yıl amortisman ayrılması. ' +
        'Mizan tutar, fiş dengelidir, hata mesajı çıkmaz — ' +
        'ama **vergi matrahı yanlış hesaplanır** ve fark ancak incelemede ortaya çıkar.' },

      { ic:'🗂️', baslik:'Standart amortisman anahtarları ve VUK için ne gerekir', metin:
        'SAP standart teslimatında gelen anahtarlar **genel amaçlıdır** ve ' +
        'çoğu Alman/ABD mevzuatına göre tasarlanmıştır. Yaygın olanlar:\n\n' +
        '`0000` — **amortisman yok**. {{yatirim-devam}} ve arazi/arsa için. ' +
        'AuC varlık sınıfı bunu otomatik getirir.\n\n' +
        '`LINA` — doğrusal, **edinim değerinden**, dönem oransal.\n\n' +
        '`LINR` — doğrusal, **kalan faydalı ömürden** hesaplar. ' +
        'Ömür sonradan değiştirilirse kalan değeri kalan ömre yayar.\n\n' +
        '`DG20` / `DG30` — azalan bakiyeler, çarpan **×2** / **×3**.\n\n' +
        '`GWG` — düşük değerli varlık: **%100 anında** amortisman.\n\n' +
        '`MANU` — **elle** amortisman; sistem hesaplamaz, kullanıcı {{ABMA}} ile girer.\n\n' +
        '**Ama VUK için bunlar yeterli değildir.** Türkiye kurulumlarında gereken:\n\n' +
        '**1.** Genel varlıklar için **tam yıl** dönem kontrolü taşıyan doğrusal anahtar.\n' +
        '**2.** Binek otomobiller için **kıst** dönem kontrolü taşıyan ayrı anahtar.\n' +
        '**3.** Azalan bakiyeler için çarpan **2**, tavan **%50** ve ' +
        '**son yıl kalanı sıfırlayan** temel yöntem.\n' +
        '**4.** Azalandan normale geçiş gerekiyorsa {{AFAMS}} çok seviyeli yöntem.\n' +
        '**5.** {{ozel-maliyet-bedeli}} için kira süresine eşit ömür veren yapı.\n\n' +
        'Bu yüzden pratikte **müşteriye özel (`Z*`) anahtarlar** tanımlanır. ' +
        'Standart anahtarı kopyalayıp dönem kontrolünü değiştirmek en yaygın yaklaşımdır.\n\n' +
        '**Danışmanlık notu:** anahtar tasarımı **canlıya geçmeden** tamamlanmalıdır. ' +
        'Kullanılmaya başlanmış bir anahtarın parametresini değiştirmek, ' +
        'o anahtarı kullanan **tüm varlıkların** gelecek amortismanını etkiler — ' +
        'geçmiş kayıtlar değişmez ama tutarsızlık doğar. ' +
        'Değişiklik gerekiyorsa **yeni anahtar** açılıp varlıklara atanır.' },

      { ic:'🏗️', baslik:'Yapılmakta olan yatırım (AuC): neden var, ne kazandırır, hangi hesaplar çalışır', metin:
        '**Çözdüğü problem**\n\n' +
        'Bir fabrika binası 18 ayda biter. Bu sürede onlarca fatura gelir: hafriyat, beton, ' +
        'çelik, elektrik tesisatı, mühendislik, işçilik. Bu harcamalar **ne gider ne de ' +
        'kullanıma hazır bir varlıktır**. Muhasebenin üçüncü bir yere ihtiyacı vardır — ' +
        '{{yatirim-devam}} tam olarak o yerdir.\n\n' +
        'AuC olmasaydı iki kötü seçenek kalırdı:\n\n' +
        '**a)** Harcamaları **gider yazmak** — inşaat yıllarının kârı olduğundan düşük, ' +
        'kullanım yıllarının kârı olduğundan yüksek görünürdü. Dönemsellik ilkesi çiğnenirdi.\n\n' +
        '**b)** Normal varlık olarak açmak — {{AFAB}} henüz kullanılmayan binaya ' +
        '**amortisman ayırmaya başlardı**. Fayda sağlamayan bir varlığın maliyeti tükeniyor gösterilirdi.\n\n' +
        '**Üç somut faydası**\n\n' +
        '**1. Amortismanın doğru anda başlaması.** AuC varlık sınıfı, amortisman anahtarını ' +
        '**0000** (amortisman yok) olarak getirir. Sistem yapısal olarak amortisman ayıramaz. ' +
        'Amortisman ancak {{AIBU}} ile aktifleştirmeden sonra, girilen **aktifleştirme tarihinden** ' +
        'itibaren başlar.\n\n' +
        '**2. Farklı kaynaklardan maliyet toplama.** Aynı AuC nesnesine üç modülden maliyet gelir: ' +
        'FI satıcı faturası ({{MIRO}}, {{F-90}}), MM malzeme çıkışı (hareket türü **241**) ve ' +
        'CO iç işçilik aktarımı. "Bu yatırıma bugüne kadar ne harcadık?" sorusu ' +
        '{{AW01N}} ile her an cevaplanır.\n\n' +
        '**3. Doğru faydalı ömür ataması.** Kalem bazlı yerleşimle aynı projeden çıkan ' +
        'bina (50 yıl), makine (10 yıl) ve demirbaş (5 yıl) **ayrı varlıklara** aktarılır. ' +
        'Hepsi tek varlığa gitseydi makine de 50 yıla yayılır ve amortisman yıllarca eksik olurdu.\n\n' +
        '**Çalışan hesaplar**\n\n' +
        '`259` **Verilen yatırım avansları** — satıcıya ödenen avans. Henüz maliyet değil, ' +
        'bir alacak hakkı. 258’den **ayrı** izlenir.\n\n' +
        '`258` **Yapılmakta olan yatırımlar** — gerçekleşmiş maliyetler burada birikir. ' +
        'Bilançoda ayrı satırda gösterilir; okuyucu "bu varlık henüz üretime katkı vermiyor" ' +
        'bilgisini görür.\n\n' +
        '`252/253/255` **Hedef varlık hesapları** — aktifleştirmede borçlanır.\n\n' +
        '`320` satıcılar, `153` stok, `770` işçilik — maliyetin geldiği karşı hesaplar.\n\n' +
        'Hesap belirleme {{AO90}} ile AuC {{varlik-sinifi}}’na bağlanır; ' +
        '258 hesabını sistem oradan bulur.\n\n' +
        '**Aktifleştirmenin muhasebe niteliği**\n\n' +
        'Aktifleştirme bir **kazanç olayı değildir**. 258 alacak / 252 borç kaydında ' +
        'bilanço toplamı **değişmez**, gelir tablosu **etkilenmez**. ' +
        'Yapılan iş yalnızca bir **sınıflandırma değişikliğidir**: ' +
        '"hazırlanıyor" durumundaki varlık "kullanımda" durumuna geçer.\n\n' +
        'Değişen tek şey, o tarihten sonra **amortisman ayrılmaya başlamasıdır** — ' +
        've bu, gelir tablosunu yıllar boyunca etkiler.' },

      { ic:'⚠️', baslik:'AuC’de en pahalı üç hata', metin:
        '**1. Kısmi devreye almayı atlamak**\n\n' +
        'Fabrikanın ilk üretim hattı Ağustos’ta çalışmaya başlar, ikincisi Aralık’ta biter. ' +
        'Proje ekibi "hepsi bitsin" diye bekler ve Aralık’ta tek seferde aktifleştirir.\n\n' +
        'Sonuç: çalışan hat **dört ay boyunca amortisman ayrılmadan** üretim yapar. ' +
        'O dört ayın maliyeti eksik, kârı olduğundan yüksek görünür. ' +
        'Doğrusu: her devreye alma aşamasında **kısmi aktifleştirme**.\n\n' +
        '**2. Yerleşim kuralını tek hedefe kurmak**\n\n' +
        'Bina, makine ve demirbaş aynı AuC’de birikir ve tamamı "bina" varlığına aktarılır. ' +
        '900.000 TL’lik makine + demirbaş **50 yıla yayılır**.\n\n' +
        'Yıllık amortisman farkı: makine 10 yılda 70.000/yıl olması gerekirken ' +
        '50 yılda 14.000/yıl olur. Fark her yıl birikir ve ' +
        'düzeltilmesi varlık transferi gerektirir.\n\n' +
        '**Önlem:** proje başlarken sor — *"bu yatırım kaç farklı faydalı ömürde varlık üretecek?"* ' +
        'Birden fazlaysa AuC sınıfı **kalem bazlı yerleşime** ayarlanmalıdır. ' +
        'Bu ayar **sonradan değiştirilemez**.\n\n' +
        '**3. Yatırım avansını 258’e yazmak**\n\n' +
        'Avans bir *alacak hakkıdır*, gerçekleşmiş bir maliyet değil. ' +
        '258’e yazılırsa yatırımın maliyeti olduğundan yüksek görünür ve ' +
        'aktifleştirmede varlık şişer.\n\n' +
        'Doğrusu **259** hesabıdır; hakediş faturası geldikçe avans mahsup edilir ve ' +
        'maliyet 258’e geçer.' },

      { ic:'📚', baslik:'Amortisman alanı nedir? — tek makine, üç rakam', metin:
        '**Sorun şu:** aynı makine için üç farklı rakam gerekiyor.\n\n' +
        'Fabrika 2.400.000 TL’ye dokuma makinesi aldı:\n\n' +
        '• **Ticari muhasebe** 10 yıl der → yıllık **240.000 TL**\n' +
        '• **Vergi mevzuatı** 8 yıl der → yıllık **300.000 TL**\n' +
        '• **IFRS** bileşen bazlı der → motor 6 yıl, gövde 15 yıl\n\n' +
        'Üçü de doğru. Ama üç ayrı varlık kaydı açmak envanteri bozar, ' +
        'üç ayrı sistem tutmak denetlenemez.\n\n' +
        '**Çözüm: tek varlık, üç amortisman alanı.**\n\n' +
        'Varlık bir kez açılır. İçinde üç satır olur:\n\n' +
        '`Alan 01` ticari → 10 yıl, doğrusal\n' +
        '`Alan 15` vergi → 8 yıl, azalan bakiyeler\n' +
        '`Alan 32` IFRS → bileşen bazlı\n\n' +
        'Her satırın **kendi {{amortisman-anahtari}} ve kendi {{faydali-omur}}** değeri vardır. ' +
        '{{AFAB}} çalıştığında **üçünü birden** hesaplar.\n\n' +
        '**Amortisman alanı = aynı varlığın bir değerleme açısıdır.** Hepsi bu.\n\n' +
        '**Pratikteki en sık hata:** {{AW01N}}’de varlığa bakarken **hangi alanda** ' +
        'olduğuna dikkat etmemek. Sol panelden alan seçilir; ' +
        'alan 01’de 240.000, alan 15’te 300.000 görünür. ' +
        '"Değerler tutmuyor" denilen durumların çoğu budur.' },

      { ic:'🔗', baslik:'Alan mı, defter mi? — ikisi neden ayrı kavram', metin:
        'Sık karıştırılır çünkü ikisi de "farklı standartlara göre farklı sonuç" üretir. ' +
        'Ama farklı sorulara cevap verirler:\n\n' +
        '**Amortisman alanı → "bu varlık nasıl değerlenecek?"**\n' +
        'Yalnızca duran varlığın içinde yaşar. Alan 15, makinenin vergiye göre ' +
        '8 yılda itfa edileceğini söyler.\n\n' +
        '**{{defter}} → "kayıt hangi muhasebeye yazılacak?"**\n' +
        'Tüm FI’ı kapsar — satıcı faturası da, banka kaydı da deftere gider. ' +
        'Defter 0L yerel muhasebeyi, 2L IFRS’i taşır.\n\n' +
        '**Nasıl birleşirler:** her alan bir deftere **bağlanır** ({{OADB}}).\n\n' +
        '`Alan 01` → `Defter 0L` *(yerel)*\n' +
        '`Alan 32` → `Defter 2L` *(IFRS)*\n\n' +
        'Böylece {{AFAB}} tek çalıştırmada iki defteri de besler: ' +
        'yerel deftere 240.000, IFRS defterine farklı bir tutar yazılır.\n\n' +
        '**Neden ayrı kavramlar?** Çünkü alanlar yalnızca varlıklar içindir; ' +
        'defterler tüm muhasebeyi kapsar. Bir satıcı faturasının "amortisman alanı" olmaz ' +
        'ama **defteri olur**.\n\n' +
        '*Not: S/4HANA’da kayıt yapan her alan bir defterle eşlenmek **zorundadır**. ' +
        'Ayrıntısı {{konu:parallel-ledger}} konusundadır.*' },

      { ic:'📅', baslik:'Amortisman ne zaman başlar? — dönem kontrol yöntemi', metin:
        'Makine ayın 20’sinde alındı. O ay tam amortisman mı, yarım mı, hiç mi?\n\n' +
        'Cevabı **dönem kontrol yöntemi** (period control method) verir ve {{amortisman-anahtari}} ' +
        'içinde tanımlıdır. Yaygın seçenekler:\n\n' +
        '• **Pro rata (gün bazlı):** kaç gün kullanıldıysa o kadar.\n' +
        '• **Ay başı:** ayın herhangi bir gününde alınsa da tam ay sayılır.\n' +
        '• **Sonraki ay:** alındığı ay hiç amortisman ayrılmaz, sonraki aydan başlar.\n' +
        '• **Yıl ortası:** ilk yıl yarım amortisman.\n\n' +
        'Türkiye’de vergi mevzuatı genelde **tam yıl** esasını kullanır: yılın hangi ayında alınırsa ' +
        'alınsın o yıl için tam yıllık amortisman ayrılır (binek otomobiller hariç — orada kıst amortisman uygulanır).' },
    ],

    notlar:[
      { tip:'warn', baslik:'Varlık sınıfı ana veride değiştirilemez', metin:
        '{{varlik-sinifi}} hesap belirlemeyi ve numara aralığını taşıdığı için {{AS02}} ile ' +
        '**değiştirilemez**. Yanlış sınıfta açılmış bir varlığı düzeltmenin tek yolu {{ABUMN}} ile ' +
        'doğru sınıfta yeni bir varlığa transferdir. Bu yüzden {{AS01}}’de sınıf seçimi acele edilmez.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'AA, S/4HANA’da **en çok değişen FI alt bileşenlerinden biridir**. Yeni mimarinin adı ' +
      '**Enterprise Asset Accounting**tir ve en büyük değişiklik, amortisman alanlarının ' +
      'defterlerle **doğrudan eşleştirilmesi** ve değerlerin {{ACDOCA}}’ya taşınmasıdır.',

    eccFarklari:[
      { konu:'Değerlerin yeri', ecc:'{{ANLC}} ve {{ANEP}} tablolarında', s4:'{{ACDOCA}}’da — ANEP/ANLC {{uyumluluk-view}}' },
      { konu:'Amortisman alanı ↔ defter', ecc:'Gevşek bağ; alan 01 dışındakiler çoğu zaman istatistiksel', s4:'**Zorunlu eşleşme** — her kayıt yapan alan bir {{defter}}le eşlenir' },
      { konu:'Gerçek zamanlı kayıt', ecc:'Yalnızca alan 01 anlık kaydeder; diğerleri dönem sonunda', s4:'**Tüm alanlar anlık** kaydeder — dönem sonu beklemek gerekmez' },
      { konu:'Ara hesaplar (technical clearing)', ecc:'Yok', s4:'**Technical Clearing Account** zorunlu — edinimde alan bağımsız ve alan bağımlı kısımlar ayrılır' },
      { konu:'Amortisman koşusu', ecc:'{{AFAB}}', s4:'FAA_DEPRECIATION_POST; {{AFAB}} bu programa yönlendirir' },
      { konu:'Belge sayısı', ecc:'Edinimde tek belge', s4:'Edinimde **iki belge**: operasyonel + değerleme bazlı' },
      { konu:'Yıl sonu', ecc:'{{AJAB}} zorunlu', s4:'Basitleştirildi; bazı adımlar otomatikleşti' },
    ],

    universalJournal:
      'Varlık değerleri artık {{ACDOCA}}’da tutulur ve varlık numarası (`ANLN1`), maliyet yeri, ' +
      'kâr merkezi ve hesap **aynı satırdadır**.\n\n' +
      'Pratik sonuçları: (1) "hangi maliyet yerinde ne kadar amortisman var?" sorusu tek tablodan ' +
      'cevaplanır, (2) FI ile AA arasında mutabakat gereksizleşir, (3) her amortisman alanı kendi ' +
      'defterinde anlık kayıt yaptığı için IFRS bilançosu da gerçek zamanlı çıkar.',

    kalkanTcodes:[
      { eski:'{{AFAB}}', yeni:'FAA_DEPRECIATION_POST', not:'AFAB çalıştırıldığında yeni programa yönlendirir' },
      { eski:'ASKB (periyodik kayıt)', yeni:'—', not:'Gereksizleşti; tüm alanlar anlık kaydediyor' },
      { eski:'AT01 vb. eski varlık raporları', yeni:'Fiori / {{AR01}}', not:'Yeni raporlar tercih edilir' },
    ],

    fiori:[
      { ad:'Manage Fixed Assets', aciklama:'{{AS01}}/{{AS02}} yerine; varlık listesi ve değerleri tek ekranda.' },
      { ad:'Asset Values', aciklama:'{{AW01N}}’in Fiori karşılığı; alan karşılaştırması görsel.' },
      { ad:'Post Depreciation', aciklama:'{{AFAB}} yerine; koşu durumu ve log görsel olarak izlenir.' },
      { ad:'Asset Acquisition', aciklama:'Edinim kaydı için sadeleştirilmiş ekran.' },
      { ad:'Asset Transactions', aciklama:'Varlık hareketlerini süzülebilir liste olarak sunar.' },
      { ad:'Asset Balances', aciklama:'Varlık bakiyelerini sınıf, maliyet yeri ve alan bazında raporlar.' },
    ],

    compatibilityViews:[
      '{{ANEP}}, {{ANEA}}, {{ANLC}}, {{ANEK}} — değer ve hareket tabloları artık {{ACDOCA}}’dan üretilen görünümler.',
      '{{ANLA}}, {{ANLB}}, {{ANLZ}} — **ana veri tabloları fiziksel olarak duruyor**, değişmedi.',
      'Bu ayrım önemlidir: ana veri korunurken değerler evrensel deftere taşındı.',
      '{{ANEP}}’e doğrudan yazan eski Z-programları geçişte bozulur; taranmalıdır.',
    ],

    performans:
      'Varlık değer raporları {{ACDOCA}} üzerinden çalıştığı için büyük varlık portföylerinde ' +
      'belirgin hızlanma vardır. Amortisman koşusu da paralel işleme desteğiyle hızlandı. ' +
      'Buna karşılık edinimde iki belge üretildiği için belge hacmi artar — ' +
      'bu, arşivleme stratejisinde dikkate alınmalıdır.',

    bestPractices:[
      'Geçiş öncesi {{degerleme-plani}} ve {{amortisman-alani}} yapısını gözden geçir; ' +
      'S/4HANA’da alan-defter eşleşmesi **zorunlu** olduğu için gevşek ECC tanımları çalışmaz.',
      'Technical Clearing Account’u geçişte doğru tanımla — edinim kayıtları bunsuz çalışmaz.',
      'Kullanılmayan amortisman alanlarını geçişte temizle; her alan ek belge ve ek işlem yükü demektir.',
      'Varlık ana verisi geçişini {{LTMC}} ile yap; açılış değerleri ve birikmiş amortisman ayrı ayrı yüklenir.',
      '{{ANEP}}/{{ANLC}}’ye yazan özel programları geçiş öncesi tara ve {{ACDOCA}} tabanlı yeniden yaz.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Bir makinenin 3 yıllık hayatı: alımdan satışa, üç farklı defterde',
    hikaye:
      '**Marmara Tekstil A.Ş.** Mart 2026’da 600.000 TL’ye dokuma makinesi alıyor. ' +
      'Ticari muhasebede 10 yıl, vergi mevzuatında 8 yıl amortismana tabi. ' +
      '3 yıl sonra makine 500.000 TL’ye satılıyor.\n\n' +
      'Bu senaryo, aynı varlığın iki farklı defterde nasıl **farklı kâr** ürettiğini ve ' +
      'bunun neden bir hata değil, tasarım olduğunu gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · Değerleme planı TR' },
      { k:'Varlık sınıfı', v:'3000 — Makine ve tesisat' },
      { k:'Edinim', v:'600.000 TL + %20 KDV · 01.03.2026' },
      { k:'Amortisman alanı 01', v:'Ticari — 10 yıl, normal yöntem → **lider defter 0L**' },
      { k:'Amortisman alanı 15', v:'Vergi — 8 yıl, normal yöntem → **vergi defteri**' },
      { k:'Maliyet yeri', v:'3100 — Üretim' },
    ],

    adimlar:[
      { baslik:'Varlık ana verisi açılır', tcode:'AS01',
        aciklama:'Sınıf seçilir seçilmez hesap belirleme ve varsayılan amortisman ayarları geliyor. ' +
                 'İki alan için **farklı** faydalı ömür giriliyor.',
        girdi:[
          { alan:'Varlık sınıfı / Şirket kodu', deger:'3000 / 1000' },
          { alan:'Tanım', deger:'Dokuma makinesi Model X · Envanter no MAK-2026-018' },
          { alan:'Maliyet yeri (zaman bağımlı)', deger:'3100 — Üretim' },
          { alan:'Alan 01 (ticari)', deger:'Anahtar LINR (normal) · **10 yıl**' },
          { alan:'Alan 15 (vergi)', deger:'Anahtar LINR (normal) · **8 yıl**' },
          { alan:'Sonuç', deger:'Varlık numarası **100018-0** oluştu · **değeri henüz sıfır**' },
        ],
        tabloEtkisi:[
          { tablo:'ANLA', ne:'Ana kayıt: ANLKL = 3000, AKTIV henüz boş' },
          { tablo:'ANLB', ne:'**İki satır**: AFABE 01 (10 yıl) ve AFABE 15 (8 yıl)' },
          { tablo:'ANLZ', ne:'Maliyet yeri 3100, geçerlilik 01.03.2026’dan itibaren' },
        ],
        not:'Varlık açmak **değer yaratmaz**. Kayıt sadece bir kimlik oluşturur; edinim ayrı bir işlemdir.' },

      { baslik:'Edinim kaydedilir', tcode:'ABZON',
        aciklama:'Makine aktifleştiriliyor. Aktifleştirme tarihi amortismanın başlangıcını belirliyor.',
        girdi:[
          { alan:'Varlık', deger:'100018-0' },
          { alan:'Hareket türü', deger:'**100** — dış edinim' },
          { alan:'Tutar / KDV', deger:'600.000 TL + 120.000 TL' },
          { alan:'**Aktifleştirme tarihi**', deger:'01.03.2026' },
        ],
        fis:{ baslik:'Belge 3000000123 — Makine edinimi', belgeTuru:'AA', tarih:'01.03.2026',
          satirlar:[
            { hesap:'253', ad:'Tesis, makine ve cihazlar', borc:600000, not:'{{AO90}} hesap belirlemesi' },
            { hesap:'191', ad:'İndirilecek KDV', borc:120000 },
            { hesap:'320', ad:'Satıcılar', alacak:720000 },
          ], not:'**Gider yazılmadı.** Kâr bu aşamada hiç etkilenmedi; bilanço 600.000 TL büyüdü.' },
        tabloEtkisi:[
          { tablo:'ANLA', ne:'`AKTIV` = 01.03.2026 — amortisman başlangıcı belirlendi' },
          { tablo:'ANEP', ne:'Hareket kaydı: BWASL = 100, ANBTR = 600.000 · **her alan için ayrı satır**' },
          { tablo:'ANLC', ne:'Yıllık değerler: edinim 600.000 (alan 01 ve 15 için ayrı)' },
          { tablo:'ACDOCA', ne:'S/4HANA’da değerler burada; `ANLN1` = 100018 aynı satırda' },
        ] },

      { baslik:'Mart amortismanı — iki alan, iki farklı tutar', tcode:'AFAB',
        aciklama:'İlk amortisman koşusu. Aynı varlık, iki alanda **farklı** amortisman üretiyor.',
        girdi:[
          { alan:'Dönem', deger:'2026 / 03 · **Test modu ✓** → sonra gerçek' },
          { alan:'Alan 01 hesabı', deger:'600.000 / 120 ay = **5.000 TL/ay**' },
          { alan:'Alan 15 hesabı', deger:'600.000 / 96 ay = **6.250 TL/ay**' },
        ],
        fis:{ baslik:'Belge 1000004521 — Mart amortismanı (lider defter 0L)', belgeTuru:'AF', tarih:'31.03.2026',
          satirlar:[
            { hesap:'730', ad:'Genel üretim gideri — amortisman', borc:5000, not:'Maliyet yeri 3100’e düşer' },
            { hesap:'257', ad:'Birikmiş amortisman', alacak:5000 },
          ], not:'**Vergi defterinde ayrı bir belge** oluşuyor: 6.250 TL. İki defter, iki farklı gider — ' +
                 'bu bir hata değil, paralel muhasebenin ta kendisidir.' },
        tabloEtkisi:[
          { tablo:'ANLC', ne:'Alan 01: birikmiş 5.000 · Alan 15: birikmiş 6.250' },
          { tablo:'ACDOCA', ne:'İki defter için ayrı satır kümesi (`RLDNR` farklı)' },
        ],
        not:'{{AFAB}} her zaman önce **test modunda** çalıştırılır. Toplam geçen ayla karşılaştırılır; ' +
             'sapma varsa yeni edinim veya ömür değişikliği olmuştur.' },

      { baslik:'3 yıl sonra durum kontrol ediliyor', tcode:'AW01N',
        aciklama:'Şubat 2029 sonunda varlığın iki alandaki değerleri karşılaştırılıyor. ' +
                 '36 ay amortisman ayrılmış durumda.',
        girdi:[
          { alan:'**Alan 01 (ticari)**', deger:'Edinim 600.000 · Birikmiş 180.000 (36×5.000) · **NDD 420.000**' },
          { alan:'**Alan 15 (vergi)**', deger:'Edinim 600.000 · Birikmiş 225.000 (36×6.250) · **NDD 375.000**' },
          { alan:'Fark', deger:'45.000 TL — vergi alanı daha hızlı amortisman ayırdı' },
        ],
        not:'"Değerler tutmuyor" denilen durum tam olarak budur — ama tutmaması **gerekir**. ' +
             'Farklı mevzuat, farklı ömür, farklı sonuç. {{AW01N}}’de hangi alanda olduğunu ' +
             'kontrol etmeden rakam yorumlanamaz.' },

      { baslik:'Makine satılıyor — 500.000 TL', tcode:'F-92',
        aciklama:'Satış bedeli her iki alanda da aynı, ama {{net-defter-degeri}} farklı olduğu için ' +
                 '**kâr da farklı** çıkıyor.',
        girdi:[
          { alan:'Varlık / Çıkış tarihi', deger:'100018-0 / 28.02.2029' },
          { alan:'Satış bedeli', deger:'500.000 TL + %18 KDV = 590.000 TL' },
          { alan:'Müşteri', deger:'C-7001 (makine alıcısı)' },
        ],
        fis:{ baslik:'Belge 3000000876 — Makine satışı (lider defter 0L)', belgeTuru:'AA', tarih:'28.02.2029',
          satirlar:[
            { hesap:'120', ad:'Alıcılar — C-7001', borc:590000 },
            { hesap:'257', ad:'Birikmiş amortisman', borc:180000, not:'**Tamamen sıfırlanıyor**' },
            { hesap:'253', ad:'Tesis, makine ve cihazlar', alacak:600000, not:'Edinim değeri **tamamen** çıkıyor' },
            { hesap:'391', ad:'Hesaplanan KDV', alacak:90000 },
            { hesap:'679', ad:'Duran varlık satış kârı', alacak:80000, not:'500.000 − 420.000' },
          ], not:'Ticari defterde **80.000 TL kâr**. Vergi defterinde ise NDD 375.000 olduğu için ' +
                 'kâr **125.000 TL** çıkar — vergi matrahı bu rakamdan hesaplanır.' },
        tabloEtkisi:[
          { tablo:'ANLA', ne:'`DEAKT` = 28.02.2029 — varlık devre dışı' },
          { tablo:'ANEP', ne:'Çıkış hareketi (BWASL = 210)' },
          { tablo:'ANEA', ne:'Düşülen birikmiş amortisman payı kaydedildi' },
        ],
        not:'SAP kâr/zarar hesabını **otomatik** yapar: bedel − NDD. Kullanıcı yalnızca satış bedelini girer.' },

      { baslik:'Yıl sonu kapanışı', tcode:'AJAB',
        aciklama:'2029 kapanışında sıra: önce yeni yıl açılır, sonra eski yıl kapatılır.',
        girdi:[
          { alan:'Adım 1', deger:'{{AJRW}} → 2030 mali yılı açıldı' },
          { alan:'Adım 2 kontrolü', deger:'2029’un 12 döneminin tamamında {{AFAB}} çalıştırılmış mı? ✓' },
          { alan:'Adım 3', deger:'{{AJAB}} → 2029 kapatıldı, artık kayıt yapılamaz' },
        ],
        not:'Sıra bozulursa hata alınır: {{AJRW}} yapılmadan yeni yıla kayıt yapılamaz, ' +
             'eksik {{AFAB}} varken {{AJAB}} çalışmaz.' },
    ],

    sonuc:
      '**Üç yılın özeti — iki defterde:**\n\n' +
      '**Ticari defter (alan 01):** toplam amortisman 180.000 TL · satıştaki NDD 420.000 TL · ' +
      'satış kârı 80.000 TL → **net etki −100.000 TL**\n\n' +
      '**Vergi defteri (alan 15):** toplam amortisman 225.000 TL · satıştaki NDD 375.000 TL · ' +
      'satış kârı 125.000 TL → **net etki −100.000 TL**\n\n' +
      '**Üç kritik ders:**\n\n' +
      '**1. Toplam etki aynıdır, dağılım farklıdır.** Her iki defterde de üç yıllık net etki ' +
      '−100.000 TL (600.000 alım − 500.000 satış). Değişen, bu tutarın yıllara nasıl dağıldığıdır. ' +
      'Vergi alanı önce daha çok gider yazdı, satışta daha çok kâr gösterdi — sonuç aynı yere çıktı. ' +
      'Amortismanın **zamanlama farkı** yarattığı, kalıcı fark yaratmadığı buradan anlaşılır.\n\n' +
      '**2. "Değerler tutmuyor" şikâyetinin cevabı çoğu zaman "hangi alandasın?"dır.** ' +
      '{{AW01N}}’de alan seçimi kontrol edilmeden hiçbir rakam yorumlanamaz.\n\n' +
      '**3. Edinim değeri hiç azalmadı.** 253 hesabı üç yıl boyunca 600.000 TL olarak durdu; ' +
      'azalma 257’de birikti ve çıkışta ikisi birlikte temizlendi. ' +
      'Bu yapı, "bu makine kaça alınmıştı?" sorusunun her zaman cevaplanabilmesini sağlar.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'AA, çok yıllık varlıkları doğumundan ölümüne izleyen {{muavin-defter}}dir; ana muhasebeye {{mutabakat-hesabi}} ile yansır.',
      '**Edinim değeri hiç azalmaz.** Azalma {{birikmis-amortisman}} kontra hesabında birikir; bilançoda ikisi netlenir.',
      '{{amortisman}} nakit çıkışı yaratmayan tek büyük giderdir — para alım anında çıkmıştır.',
      '{{amortisman-alani}} aynı varlığın ticari, vergi ve IFRS’e göre **farklı değerlenmesini** sağlar.',
      '{{varlik-sinifi}} hesap belirlemeyi, numara aralığını ve varsayılan amortisman ayarlarını getirir — **sonradan değiştirilemez**.',
      '{{amortisman-anahtari}} kendisi hesaplama **yapmaz** — beş yöntemi birleştirir: temel, azalan bakiyeler, çok seviyeli, **dönem kontrolü**, azami tutar.',
      'Hesaplama yöntemleri: **doğrusal · azalan bakiyeler · {{yil-sayilari-toplami}} · ' +
      '{{uretim-miktari-yontemi}} · {{kalinti-deger}}li**. İlk dördünde **toplam amortisman aynıdır**, ' +
      'yalnızca zamanlaması değişir — yöntem seçimi bir **vergi ertelemesi** kararıdır.',
      'Türkiye’de **doğrusal ve azalan** vergi alanında; **YST, üretim miktarı ve kalıntı değerli** ' +
      'yalnızca IFRS alanında kullanılabilir → {{paralel-defter}} ihtiyacının somut sebebi.',
      '**{{kist-amortisman}} VUK’ta kural değil istisnadır:** yalnızca **binek otomobillerde** uygulanır (md. 320/2). Genel kural **tam yıldır**.',
      'Kıst hesabı: **ay kesri tam ay** sayılır; ilk yıl ayrılamayan kısım **son yılda** tamamlanır — toplam değişmez.',
      '{{azalan-bakiyeler}}: oran normalin **2 katı**, azami **%50**; taban **net defter değeri**; **son yıl kalanın tamamı** ayrılır.',
      'Yöntem geçişi tek yönlüdür: **azalandan normale geçilir, normalden azalana geçilemez**.',
      '{{ozel-maliyet-bedeli}} **kira süresine göre** itfa edilir; süre belli değilse **5 yıl** (md. 327).',
      'Boş arazi ve arsalar amortismana **tabi değildir** (md. 314) — SAP’ta anahtar **0000**.',
      '{{yatirim-devam}} (AuC), inşaat sürerken harcamaların bekletildiği **258** hesabıdır; kullanıma hazır olmadığı için **amortismana tabi değildir**.',
      'AuC üç fayda sağlar: **doğru dönemsellik**, farklı modüllerden (FI/MM/CO) **maliyet toplama**, doğru **faydalı ömür ataması**.',
      'Aktifleştirme sırası: **{{AIAB}} (yerleşim kuralı) → {{AIBU}} (aktifleştirme)**; sıra değiştirilemez.',
      'Aktifleştirme **kâr/zarar yaratmaz** — bilanço toplamı değişmez, yalnızca amortisman başlar.',
      'Yatırım avansı **259**’a yazılır, 258’e değil: avans bir alacak hakkıdır, gerçekleşmiş maliyet değil.',
      'Çıkışta hem 253 hem 257 temizlenir; {{net-defter-degeri}} ile bedel arasındaki fark kâr/zarar yazılır.',
      'Yıl sonu sırası: **{{AJRW}} (yeni yıl aç) → {{AFAB}} (12 dönem) → {{AJAB}} (eski yılı kapat)**.',
    ],

    onemliNoktalar:[
      '**"Amortisman alanı nedir?"** Aynı varlığın **bir değerleme açısı**. Tek varlık kaydı içinde alan 01 ticari (10 yıl), alan 15 vergi (8 yıl), alan 32 IFRS satırları bulunur; her birinin kendi anahtarı ve ömrü vardır. {{AFAB}} üçünü birden hesaplar.',
      '**"Alan ile defter farkı nedir?"** **Alan** yalnızca duran varlığın içindedir → *"bu varlık nasıl değerlenecek?"*. **Defter** tüm FI’ı kapsar → *"kayıt hangi muhasebeye yazılacak?"*. Her alan bir deftere bağlanır ({{OADB}}). Bir satıcı faturasının alanı olmaz ama **defteri olur** — ayrımın özü budur.',
      '**"Neden edinim değeri azaltılmaz?"** Orijinal maliyet bilgisi korunmalıdır (sigorta, vergi incelemesi). Azalma kontra hesapta birikir.',
      '**"AuC’de neden amortisman ayrılmaz?"** Varlık henüz kullanıma hazır değildir, fayda sağlamıyordur. AuC {{varlik-sinifi}} amortisman anahtarını **0000** getirir; amortisman {{AIBU}} sonrası, girilen **aktifleştirme tarihinden** başlar.',
      '**"Kıst amortisman ne zaman uygulanır?"** **Yalnızca binek otomobillerde** (VUK md. 320/2). Genel kural tam yıldır: 28 Aralık’ta alınan makineye o yılın tamamı için amortisman ayrılır. **En çok yanlış bilinen VUK kuralıdır.** İlk yıl ayrılamayan kısım son yılda tamamlanır. İstisnanın istisnası: araç kiralama/sürücü kursu faaliyetinde kıst uygulanmaz.',
      '**"Amortisman anahtarı neyi belirler?"** Kendisi hesaplama yapmaz — **beş yöntemi birleştirir**: temel ({{AFAMR}}), azalan bakiyeler ({{AFAMD}}), çok seviyeli ({{AFAMS}}), **dönem kontrolü** ({{AFAMP}}), azami tutar. Kıst amortismanın karşılığı **dönem kontrolüdür**.',
      '**"Azalan bakiyelerde son yıl ne olur?"** **Kalan net defter değerinin tamamı** ayrılır — %40 uygulanmaz. Aksi hâlde her yıl kalanın bir oranı alındığı için varlık **matematiksel olarak hiçbir zaman sıfırlanmazdı**. SAP’ta {{AFAMR}}’deki "ömür bitince kalanı sıfırla" ayarıyla sağlanır.',
      '**"Normal ile azalan arasında geçiş yapılabilir mi?"** **Azalandan normale geçilebilir, normalden azalana geçilemez** (VUK mük. md. 315). SAP’ta geçiş {{AFAMS}} çok seviyeli yöntemle modellenir.',
      '**"Hangi varlıklar amortismana tabi değildir?"** **Boş arazi ve arsalar** (VUK md. 314) ve {{yatirim-devam}}. SAP’ta amortisman anahtarı **0000** verilerek sağlanır. *(İstisna: tarım işletmelerindeki meyvalık, dutluk gibi tesisler amortismana tabidir.)*',
      '**"Özel maliyet bedeli kaç yılda itfa edilir?"** **Kira süresine göre eşit yüzdelerle** — varlığın kendi ömrüne göre değil. **Süre belli değilse 5 yıl**. Kira dolmadan boşaltılırsa itfa edilmemiş kısım o yıl gider yazılır (VUK md. 327).',
      '**"AuC ne işe yarar, neden ayrı bir hesap gerekir?"** İnşaat sürerken harcamalar **ne gider ne kullanıma hazır varlıktır**. Gider yazılsa dönemsellik bozulur; normal varlık açılsa amortisman erken başlar. **258** bu boşluğu doldurur ve üç şey sağlar: doğru dönemsellik, farklı modüllerden (FI/MM/CO) maliyet toplama, doğru faydalı ömür ataması.',
      '**"AuC aktifleştirmesi kâr/zarar yaratır mı?"** **Hayır.** 258 alacak / 252 borç kaydında bilanço toplamı değişmez, gelir tablosu etkilenmez. Bu bir **sınıflandırma değişikliğidir**. Değişen tek şey, o tarihten sonra amortismanın başlamasıdır.',
      '**"Özet ile kalem bazlı yerleşim farkı?"** Özet: tüm maliyet **tek hedefe**. Kalem bazlı: maliyet **birden çok varlığa bölünür** — bina 50 yıl, makine 10 yıl, demirbaş 5 yıl ayrı ayrı. Varlık sınıfında **baştan seçilir, sonradan değiştirilemez**.',
      '**"Yatırım avansı hangi hesaba yazılır?"** **259** Verilen yatırım avansları — **258’e değil**. Avans bir *alacak hakkıdır*, gerçekleşmiş maliyet değil. 258’e yazılırsa yatırım olduğundan pahalı görünür.',
      '**"Varlık sınıfı yanlış seçildi, nasıl düzeltilir?"** Ana veride değiştirilemez. {{ABUMN}} ile doğru sınıfta yeni varlığa transfer edilir.',
      '**"Amortisman gideri yanlış departmana düşüyor."** Sebep {{ANLZ}}’deki **maliyet yeridir**, hesap belirleme değil.',
      '**"Çıkışta kâr/zarar nasıl hesaplanır?"** Satış bedeli − {{net-defter-degeri}}. SAP otomatik yapar; kullanıcı yalnızca bedeli girer.',
      '**"AFAB’ı yanlış çalıştırdım, ne olur?"** Gerçek koşu geri alınamaz; ters kayıt gerekir. Bu yüzden **her zaman önce test modu**.',
      '**"Aktifleştirme tarihi ile kayıt tarihi farkı?"** Kayıt tarihi muhasebe dönemini, **aktifleştirme tarihi amortisman başlangıcını** belirler.',
    ],

    sikHatalar:[
      { hata:'Varlık alımını doğrudan gider yazmak.', dogru:'{{aktiflestirme}} ile bilançoya alınır; maliyeti {{amortisman}} yoluyla yıllara yayılır.' },
      { hata:'253 hesabından amortisman düşmek.', dogru:'Edinim değeri hiç azalmaz; azalma 257 kontra hesabında birikir.' },
      { hata:'{{AW01N}}’de alan seçimini kontrol etmeden değer yorumlamak.', dogru:'Her {{amortisman-alani}} farklı değer gösterir. Önce hangi alanda olduğuna bak.' },
      { hata:'{{AFAB}}’ı doğrudan gerçek modda çalıştırmak.', dogru:'Önce test modu, sonuç incelenir, sonra gerçek koşu — tercihen arka planda.' },
      { hata:'Yıl ortasında alınan her varlığa kıst amortisman uygulamak.', dogru:'VUK’ta genel kural **tam yıldır**. Kıst yalnızca **binek otomobillerde** uygulanır (md. 320/2).' },
      { hata:'Binek otomobillere de genel anahtarı (tam yıl) vermek.', dogru:'Ayrı bir anahtar gerekir: **kıst dönem kontrolü** ({{AFAMP}}). Mizan tutar, hata çıkmaz — ama **vergi matrahı yanlış** hesaplanır.' },
      { hata:'Azalan bakiyelerde son yıl da oranı uygulamak.', dogru:'Son yılda **kalan bakiyenin tamamı** ayrılır; aksi hâlde varlık hiç sıfırlanmaz. {{AFAMR}}’de "ömür bitince sıfırla" ayarı yapılmalıdır.' },
      { hata:'Normal amortismandan azalan bakiyelere geçmeye çalışmak.', dogru:'VUK yalnızca **azalandan normale** geçişe izin verir; tersi mümkün değildir.' },
      { hata:'Özel maliyet bedelini varlığın kendi faydalı ömrüne göre itfa etmek.', dogru:'**Kira süresine göre** eşit yüzdelerle itfa edilir; süre belli değilse **5 yıl** (VUK md. 327).' },
      { hata:'Kullanılmakta olan bir amortisman anahtarının parametresini değiştirmek.', dogru:'O anahtarı kullanan **tüm varlıkların** gelecek amortismanı değişir. **Yeni anahtar** açılıp varlıklara atanmalıdır.' },
      { hata:'Arsayı amortismana tabi tutmak.', dogru:'Boş arazi ve arsalar amortismana tabi **değildir** (VUK md. 314). Anahtar **0000** verilir. Üzerindeki bina ayrı varlıktır ve amortismana tabidir.' },
      { hata:'AuC’ye amortisman ayırmaya çalışmak.', dogru:'AuC kullanıma hazır değildir; amortisman {{AIBU}} ile aktifleştirmeden sonra başlar.' },
      { hata:'Aşamalı devreye alınan projede kısmi aktifleştirmeyi atlamak.', dogru:'Çalışan bölüm aylarca amortismansız üretim yapar; o dönemlerin maliyeti eksik, kârı yüksek görünür. Her devreye almada kısmi aktifleştirme yapılır.' },
      { hata:'Farklı ömürdeki varlıkları tek hedefe yerleştirmek.', dogru:'Makine 50 yıla yayılır ve amortisman yıllarca eksik hesaplanır. AuC sınıfı **kalem bazlı yerleşime** ayarlanmalıdır — **sonradan değiştirilemez**.' },
      { hata:'Yatırım avansını 258 hesabına yazmak.', dogru:'Avans **259**’a yazılır. 258 gerçekleşmiş maliyeti gösterir; avans bir alacak hakkıdır.' },
      { hata:'{{AIAB}} kuralı olmadan {{AIBU}} çalıştırmak.', dogru:'Sıra değiştirilemez: önce yerleşim kuralı ({{AIAB}}), sonra aktifleştirme ({{AIBU}}).' },
      { hata:'Aktifleştirme tarihine fatura tarihini girmek.', dogru:'Tarih, varlığın **fiilen kullanıma hazır olduğu gün** olmalıdır — amortismanın başlangıcını o belirler.' },
      { hata:'Varlık sınıfını {{AS02}} ile değiştirmeye çalışmak.', dogru:'Değiştirilemez. {{ABUMN}} ile doğru sınıfta yeni varlığa transfer edilir.' },
      { hata:'{{OB52}}’de sadece S hesap tipini açmak.', dogru:'Varlık kaydı için **A** hesap tipi de açılmalıdır.' },
      { hata:'{{AJAB}} öncesi tüm dönemlerin {{AFAB}} koşusunu tamamlamamak.', dogru:'12 dönemin hepsi çalıştırılmadan yıl kapatılamaz.' },
      { hata:'İki defterde farklı amortisman görünce hata sanmak.', dogru:'Bu tasarımdır. Farklı mevzuat, farklı ömür, farklı sonuç — paralel muhasebenin amacı budur.' },
    ],

    ipuclari:[
      '{{AW01N}} AA’nın **tek teşhis aracıdır**. Her varlık sorusunda önce buraya git.',
      'Bir amortisman tutarı beklenmedikse üç şeye bak: **doğru alandasın mı**, {{amortisman-anahtari}} ne, ' +
      '{{faydali-omur}} ve {{aktiflestirme}} tarihi doğru mu.',
      'Yeni varlık açarken benzer bir varlığı **şablon olarak kopyala** — hem hızlı hem tutarlı.',
      '{{AFAB}} test sonucunu her ay bir öncekiyle karşılaştır; sapma varsa sebebi ara.',
      'Aynı anda 10 özdeş varlık açacaksan {{AS01}}’de "benzer varlık sayısı" alanını kullan.',
      'Yıl sonunda sırayı ezberle: **AJRW → AFAB (12 dönem) → AJAB**. Sıra bozulursa hata alırsın.',
    ],

    quiz:[
      { soru:'600.000 TL’lik makine için 3 yılda 180.000 TL amortisman ayrıldı. 253 hesabının bakiyesi nedir?',
        secenekler:['420.000 TL','180.000 TL','**600.000 TL**','0 TL'],
        dogru:2,
        aciklama:'**Edinim değeri hiç azalmaz.** 253 hesabı 600.000 TL olarak durmaya devam eder; ' +
                 'azalma 257 Birikmiş amortisman hesabında birikir. Bilançoda ikisi netlenir: ' +
                 '600.000 − 180.000 = 420.000 TL {{net-defter-degeri}}.' },

      { soru:'Aynı varlık, alan 01’de 5.000 TL, alan 15’te 6.250 TL amortisman gösteriyor. Bu nedir?',
        secenekler:[
          'Yapılandırma hatası',
          'Çift kayıt — düzeltilmeli',
          '**Normal** — farklı mevzuata göre farklı faydalı ömür kullanılıyor',
          'Amortisman koşusu iki kez çalıştırılmış',
        ], dogru:2,
        aciklama:'{{amortisman-alani}} kavramının varlık sebebi budur: aynı varlık ticari mevzuata göre ' +
                 '10 yıl, vergi mevzuatına göre 8 yıl amortismana tabi olabilir. ' +
                 'Her alan kendi {{amortisman-anahtari}} ve {{faydali-omur}} değeriyle hesaplar.' },

      { soru:'{{yatirim-devam}} (AuC) hesabında biriken maliyetlere neden amortisman ayrılmaz?',
        secenekler:[
          'Vergi mevzuatı yasakladığı için',
          '**Varlık henüz kullanıma hazır değil, fayda sağlamıyor**',
          'Teknik olarak mümkün olmadığı için',
          'KDV hesaplanamadığı için',
        ], dogru:1,
        aciklama:'Amortisman, varlığın **faydasının tükenmesini** ölçer. İnşa halindeki bina henüz ' +
                 'fayda sağlamıyordur. {{AIBU}} ile gerçek varlığa aktarıldıktan sonra amortisman başlar.' },

      { soru:'600.000 TL, 5 yıl. **Yıl sayıları toplamı** yönteminde ilk yıl amortismanı nedir?',
        secenekler:[
          '120.000 TL',
          '240.000 TL',
          '**200.000 TL**',
          '160.000 TL',
        ], dogru:2,
        aciklama:'Payda = 5+4+3+2+1 = **15**. İlk yıl oranı **5/15**.\n\n' +
                 '600.000 × 5/15 = **200.000 TL**.\n\n' +
                 'Sonraki yıllar: 160.000 (4/15) → 120.000 (3/15) → 80.000 (2/15) → 40.000 (1/15). ' +
                 'Toplam 600.000 ✓\n\n' +
                 '**{{azalan-bakiyeler}}’den farkı:** burada **taban sabittir**, yalnızca oran değişir. ' +
                 'Bu yüzden son yıl özel kural gerekmez.' },

      { soru:'{{uretim-miktari-yontemi}} hangi varlıklarda daha gerçekçidir ve neden?',
        secenekler:[
          'Binalarda — zamanla yıpranır',
          '**Pres ve kalıplarda — durduğunda yıpranmaz, kullanıldıkça yıpranır**',
          'Taşıtlarda — mevzuat zorunlu kılar',
          'Tüm varlıklarda',
        ], dogru:1,
        aciklama:'Bir pres durduğu sürece yıpranmaz. Zamana bağlı yöntemler ' +
                 'üretimin durduğu aylarda da amortisman ayırır ve gerçeği yansıtmaz.\n\n' +
                 '`Birim = Tutar ÷ Toplam tahmini üretim` → `Dönem = Birim × O dönemin üretimi`\n\n' +
                 '**Zorluğu:** her dönem fiili üretim miktarının sisteme girilmesi gerekir. ' +
                 'VUK’ta genel yöntem değildir; IFRS’te kabul edilir.' },

      { soru:'600.000 TL’lik araç, kalıntı değeri 100.000 TL, 5 yıl. IFRS’e göre 5. yıl sonunda net defter değeri?',
        secenekler:[
          '0 TL',
          '**100.000 TL**',
          '120.000 TL',
          '500.000 TL',
        ], dogru:1,
        aciklama:'Amortismana tabi tutar = 600.000 − 100.000 = **500.000 TL** → yıllık 100.000 TL.\n\n' +
                 '5 yıl sonra birikmiş amortisman 500.000, net defter değeri **100.000 TL** — ' +
                 'varlık defterde bu değerle durmaya devam eder.\n\n' +
                 '**VUK’ta kalıntı değer yoktur:** varlık tam itfa edilir ve NDD **sıfırlanır**. ' +
                 'Bu fark, {{paralel-defter}} ihtiyacının somut örneklerinden biridir.' },

      { soru:'Doğrusal, azalan, YST ve üretim miktarı yöntemlerinde **toplam** amortisman nasıl karşılaştırılır?',
        secenekler:[
          'Azalan yöntemde toplam daha yüksektir',
          'Doğrusalda toplam daha düşüktür',
          '**Dördünde de toplam aynıdır — yalnızca zamanlaması değişir**',
          'Üretim miktarında toplam belirsizdir',
        ], dogru:2,
        aciklama:'Dört yöntem de amortismana tabi tutarın **tamamını** dağıtır: 600.000 TL. ' +
                 'Değişen yalnızca **hangi yıla ne kadar** düştüğüdür.\n\n' +
                 'Bu yüzden yöntem seçimi bir *vergi indirimi* değil, bir **vergi ertelemesi** kararıdır.\n\n' +
                 '**Tek istisna {{kalinti-deger}}li hesaplamadır:** orada amortismana tabi tutarın ' +
                 'kendisi küçüldüğü için toplam da düşer (500.000 TL).' },

      { soru:'28 Aralık’ta alınan bir makineye o yıl için ne kadar amortisman ayrılır?',
        secenekler:[
          'Sadece Aralık ayı için 1/12',
          'Hiç ayrılmaz, ertesi yıl başlar',
          '**Tam yıl amortismanı ayrılabilir**',
          'Yarım yıl',
        ], dogru:2,
        aciklama:'VUK md. 320/1’e göre genel kural **tam yıl amortismandır**. ' +
                 'Varlık yılın hangi ayında alınırsa alınsın, o yıl için tam amortisman ayrılabilir.\n\n' +
                 '**{{kist-amortisman}} kural değil istisnadır** ve yalnızca **binek otomobillerde** ' +
                 'uygulanır. Bu, en çok yanlış bilinen VUK kuralıdır.' },

      { soru:'15 Nisan’da alınan binek otomobil için ilk yıl amortismanı nasıl hesaplanır?',
        secenekler:[
          'Tam yıl',
          '**Ay kesri tam ay sayılarak 9/12 oranında**',
          '8/12 oranında',
          'Yarım yıl (6/12)',
        ], dogru:1,
        aciklama:'**Ay kesri tam ay sayılır** → Nisan dahil edilir → Nisan’dan Aralık’a **9 ay**. ' +
                 'Yıllık amortismanın 9/12’si ayrılır.\n\n' +
                 'Ayrılamayan 3/12’lik kısım **kaybolmaz**: faydalı ömrün **son yılında** ' +
                 'gider yazılarak tamamlanır. Toplam amortisman değişmez, ' +
                 'yalnızca bir yıla kaydırılır.' },

      { soru:'Azalan bakiyeler yönteminde **son yılda** ne yapılır?',
        secenekler:[
          'Yine aynı oran (%40) uygulanır',
          'Amortisman ayrılmaz',
          '**Kalan net defter değerinin tamamı ayrılır**',
          'Normal yönteme geçilir',
        ], dogru:2,
        aciklama:'Oran hep **kalan** değere uygulandığı için varlık matematiksel olarak ' +
                 '**hiçbir zaman sıfırlanmazdı**. Bu yüzden VUK son yılda kalan bakiyenin ' +
                 'tamamının ayrılmasını öngörür.\n\n' +
                 'SAP’ta bu davranış {{AFAMR}} temel yöntemindeki ' +
                 '**"ömür bittiğinde kalan değeri sıfırla"** ayarıyla sağlanır — ' +
                 'unutulursa varlık defterde küçük bir bakiyeyle kalır.' },

      { soru:'{{amortisman-anahtari}} içindeki hangi yöntem kıst amortismanı belirler?',
        secenekler:[
          'Temel yöntem ({{AFAMR}})',
          'Azalan bakiyeler yöntemi ({{AFAMD}})',
          '**Dönem kontrolü yöntemi ({{AFAMP}})**',
          'Azami tutar yöntemi',
        ], dogru:2,
        aciklama:'{{donem-kontrolu}}, amortismanın **ne zaman başlayıp biteceğini** belirler; ' +
                 'edinim, ilave, çıkış ve transfer için ayrı kural taşır.\n\n' +
                 'Türkiye kurulumunda **iki ayrı anahtar** gerekir: genel varlıklar için ' +
                 '"yıl başından itibaren" (tam yıl), binek otomobiller için ' +
                 '"edinim ayından itibaren oransal" (kıst). ' +
                 'İkisi aynı temel yöntemi paylaşır, yalnızca dönem kontrolü farklıdır.' },

      { soru:'Kiralanan mağazaya yapılan 300.000 TL’lik dekorasyon (kira süresi 8 yıl) kaç yılda itfa edilir?',
        secenekler:[
          'Dekorasyonun faydalı ömrüne göre (5 yıl)',
          '**Kira süresine göre 8 yılda**',
          'Her zaman 5 yılda',
          'Doğrudan gider yazılır',
        ], dogru:1,
        aciklama:'{{ozel-maliyet-bedeli}} **kira süresine göre eşit yüzdelerle** itfa edilir ' +
                 '(VUK md. 327) — varlığın kendi faydalı ömrüne göre değil.\n\n' +
                 '**Kira süresi belli değilse 5 yıl** kabul edilir. ' +
                 'Süre dolmadan işyeri boşaltılırsa **itfa edilmemiş kısım o yıl gider** yazılır.' },

      { soru:'Azalan bakiyeler yöntemini kimler uygulayabilir ve yöntem değişikliği mümkün müdür?',
        secenekler:[
          'Herkes; iki yönde de geçiş serbest',
          '**Bilanço esasına göre defter tutanlar; azalandan normale geçilir, tersi olmaz**',
          'Herkes; hiçbir geçiş yapılamaz',
          'Sadece anonim şirketler; geçiş serbest',
        ], dogru:1,
        aciklama:'VUK mükerrer md. 315: yöntem **yalnızca bilanço esasına göre** defter tutan ' +
                 'mükelleflere açıktır. **Azalan bakiyelerden normale geçilebilir** ' +
                 '(kalan değer kalan ömre bölünür) ama **normalden azalana geçilemez**.\n\n' +
                 'SAP’ta geçiş {{AFAMS}} çok seviyeli yöntemiyle modellenir.' },

      { soru:'AuC aktifleştirmesi (258 alacak / 252 borç) gelir tablosunu nasıl etkiler?',
        secenekler:[
          'Aktifleştirme kârı yazılır',
          'Gider yazılır',
          '**Hiç etkilemez — bu bir sınıflandırma değişikliğidir**',
          'KDV oluşur',
        ], dogru:2,
        aciklama:'Bilanço toplamı **değişmez**: varlık bir kalemden diğerine geçer. ' +
                 'Ne kâr ne zarar oluşur. Aktifleştirme, varlığın "hazırlanıyor" durumundan ' +
                 '"kullanımda" durumuna geçmesidir. ' +
                 'Değişen tek şey, o tarihten sonra **amortismanın başlamasıdır** — ' +
                 've bu gelir tablosunu yıllar boyunca etkiler.' },

      { soru:'Bir proje bina (50 yıl), makine (10 yıl) ve demirbaş (5 yıl) üretiyor. AuC nasıl kurulmalı?',
        secenekler:[
          'Özet yerleşim — tümü bina varlığına',
          '**Kalem bazlı yerleşim — her biri kendi varlığına**',
          'Üç ayrı AuC açılmalı',
          'AuC kullanılmamalı',
        ], dogru:1,
        aciklama:'Özet yerleşimde 900.000 TL’lik makine ve demirbaş **50 yıla yayılır** ve ' +
                 'amortisman yıllarca eksik hesaplanır. ' +
                 'Kalem bazlı yerleşim ({{AIAB}}) her maliyeti kendi hedefine gönderir. ' +
                 '**Bu ayar varlık sınıfında baştan yapılır ve sonradan değiştirilemez** — ' +
                 'proje başlarken "kaç farklı faydalı ömür?" sorusu sorulmalıdır.' },

      { soru:'Yatırım için satıcıya ödenen avans hangi hesaba yazılır?',
        secenekler:[
          '258 Yapılmakta olan yatırımlar',
          '**259 Verilen yatırım avansları**',
          '253 Tesis, makine ve cihazlar',
          '770 Genel yönetim gideri',
        ], dogru:1,
        aciklama:'Avans **gerçekleşmiş bir maliyet değil**, ileride mal/hizmet alma hakkıdır. ' +
                 '258 ise gerçekleşmiş maliyeti gösterir. ' +
                 'Avansı 258’e yazmak yatırımı olduğundan pahalı gösterir ve ' +
                 'aktifleştirmede varlık şişer. ' +
                 'Hakediş faturası geldikçe avans mahsup edilir ve maliyet 258’e geçer.' },

      { soru:'Fabrikanın ilk hattı Ağustos’ta, ikincisi Aralık’ta devreye giriyor. Ne yapılmalı?',
        secenekler:[
          'Aralık’ta tümü birden aktifleştirilir',
          '**Ağustos’ta kısmi aktifleştirme yapılır, kalan AuC’de bekler**',
          'Ağustos’ta tümü aktifleştirilir',
          'İki ayrı AuC açılır',
        ], dogru:1,
        aciklama:'Aralık’a beklenirse çalışan hat **dört ay amortismansız** üretim yapar; ' +
                 'o dönemlerin maliyeti eksik, kârı olduğundan yüksek görünür. ' +
                 'Kısmi aktifleştirmede devreye alınan kısım 253’e aktarılır ve ' +
                 'amortismanı **Ağustos’ta başlar**; kalan tutar AuC’de bekler. ' +
                 '**Uygulamada en sık atlanan adımdır.**' },

      { soru:'Varlık yanlış sınıfta açıldı. Nasıl düzeltilir?',
        secenekler:[
          '{{AS02}} ile sınıf alanı değiştirilir',
          'Varlık silinir ve yeniden açılır',
          '**{{ABUMN}} ile doğru sınıfta yeni varlığa transfer edilir**',
          '{{AO90}} ile hesap belirleme düzeltilir',
        ], dogru:2,
        aciklama:'{{varlik-sinifi}} hesap belirlemeyi ve numara aralığını taşıdığı için ana veride ' +
                 '**değiştirilemez**. Varlık silinemez (hareketleri var). Tek yol transferdir: ' +
                 'değerler ve birikmiş amortisman yeni varlığa taşınır.' },

      { soru:'Defter değeri 420.000 TL olan makine 500.000 TL’ye satıldı. Muhasebe kaydında ne olur?',
        secenekler:[
          '253 hesabından 420.000 TL çıkar',
          '**253’ten 600.000, 257’den 180.000 çıkar; 80.000 TL kâr yazılır**',
          'Sadece 80.000 TL kâr kaydedilir',
          '257 hesabı değişmez',
        ], dogru:1,
        aciklama:'Çıkışta **her iki hesap da tamamen temizlenir**: edinim değerinin tümü (600.000) ' +
                 '253’ten, birikmiş amortismanın tümü (180.000) 257’den çıkar. ' +
                 'Kalan {{net-defter-degeri}} (420.000) ile bedel (500.000) arasındaki 80.000 TL kâr yazılır.' },

      { soru:'{{AFAB}} çalıştırılırken hangi adım **atlanmamalıdır**?',
        secenekler:[
          'Varlık aralığı girmek',
          '**Önce test (deneme) modunda çalıştırmak**',
          'Log seviyesini ayarlamak',
          'Maliyet yerini kontrol etmek',
        ], dogru:1,
        aciklama:'Gerçek amortisman koşusu **geri alınamaz**; düzeltme ters kayıt gerektirir. ' +
                 'Test modu hangi varlığa ne kadar amortisman ayrılacağını kaydetmeden gösterir. ' +
                 'Ayrıca çok varlıklı sistemlerde koşu **arka plan işi** olarak planlanmalıdır.' },

      { soru:'Amortisman gideri yanlış departmanın maliyet yerine düşüyor. Kaynak nedir?',
        secenekler:[
          '{{AO90}} hesap belirleme',
          '{{amortisman-anahtari}}',
          '**{{ANLZ}}’deki maliyet yeri ataması**',
          'Belge türü',
        ], dogru:2,
        aciklama:'{{AO90}} hangi **G/L hesabının** kullanılacağını belirler; hangi **CO nesnesine** ' +
                 'düşeceğini varlık ana verisindeki zaman bağımlı maliyet yeri ({{ANLZ}} `KOSTL`) belirler. ' +
                 '{{AS02}} → zaman bağımlı sekmesinden düzeltilir.' },

      { soru:'Yıl sonu AA kapanışında doğru sıra nedir?',
        secenekler:[
          '{{AJAB}} → {{AFAB}} → {{AJRW}}',
          '**{{AJRW}} → {{AFAB}} (12 dönem) → {{AJAB}}**',
          '{{AFAB}} → {{AJAB}} → {{AJRW}}',
          'Sıra önemli değil',
        ], dogru:1,
        aciklama:'{{AJRW}} yeni mali yılı açar (yapılmadan yeni yıla kayıt yapılamaz). ' +
                 'Yıl boyunca {{AFAB}} her dönem çalıştırılır. ' +
                 '{{AJAB}} eski yılı kapatır ve **12 dönemin tamamı çalıştırılmadan** çalışmaz.' },
    ],

    flashcards:[
      { on:'Amortisman kaydı nakit çıkışı yaratır mı?', arka:'**Hayır.**\n\n770 Amortisman gideri borç / 257 Birikmiş amortisman alacak\n\nPara zaten alım anında çıkmıştı. Nakit akış tablosunda kâra **geri eklenir**.' },
      { on:'Edinim değeri (253) amortismanla azalır mı?', arka:'**Hayır — hiç azalmaz.**\n\nAzalma **257 Birikmiş amortisman** kontra hesabında birikir.\n\nBilançoda netlenir: 600.000 − 180.000 = 420.000 TL net defter değeri.\n\nSebep: orijinal maliyet bilgisi korunmalıdır.' },
      { on:'Amortisman alanı (depreciation area) nedir?', arka:'Aynı varlığın **farklı amaçlarla farklı değerlenmesini** sağlayan paralel değer kümesi.\n\nAlan 01 ticari (10 yıl)\nAlan 15 vergi (8 yıl)\nAlan 32 IFRS\n\nHer alan kendi anahtarı ve ömrüyle hesaplar.' },
      { on:'Amortisman alanı nedir?', arka:'**Aynı varlığın bir değerleme açısı.**\n\nTek varlık, üç satır:\n`01` ticari → 10 yıl\n`15` vergi → 8 yıl\n`32` IFRS → bileşen bazlı\n\nHer birinin **kendi anahtarı ve ömrü** var. AFAB **üçünü birden** hesaplar.' },
      { on:'Alan mı, defter mi? — fark nedir?', arka:'**Alan** → yalnızca **duran varlıkta** yaşar\n*"Bu varlık nasıl değerlenecek?"*\n\n**Defter** → **tüm FI**’ı kapsar\n*"Kayıt hangi muhasebeye yazılacak?"*\n\nHer alan bir deftere bağlanır (OADB): 01→0L, 32→2L.\n\n**Özü:** satıcı faturasının **alanı olmaz**, ama **defteri olur**.' },
      { on:'Varlığın 4 temel tablosu nedir?', arka:'**ANLA** — ana kayıt (sınıf, aktifleştirme tarihi)\n**ANLB** — amortisman ayarları (her alan için bir satır)\n**ANLC** — yıllık değer toplamları\n**ANEP** — hareketler (edinim, çıkış, transfer)\n\n+ **ANLZ** zaman bağımlı (maliyet yeri)' },
      { on:'Varlık çıkışında muhasebe kaydı nasıl olur?', arka:'**Her iki hesap da tamamen temizlenir:**\n• 253 alacak → edinim değerinin **tümü**\n• 257 borç → birikmiş amortismanın **tümü**\n\nBedel − NDD = kâr (679) veya zarar (689).\n\nSAP hesaplamayı otomatik yapar.' },
      { on:'Beş hesaplama yöntemi — 600.000 TL / 5 yıl / ilk yıl', arka:'**① Doğrusal** → 120.000 *(600.000÷5)*\n**② Azalan %40** → 240.000 *(NDD×%40)*\n**③ YST** → 200.000 *(×5/15)*\n**④ Üretim** → 160.000 *(2 TL×80.000 adet)*\n**⑤ Kalıntılı** → 100.000 *((600−100)÷5)*\n\nİlk dördünde **toplam aynı** (600.000); ⑤’te 500.000.' },
      { on:'Yıl sayıları toplamı (YST) formülü', arka:'`Tutar × (Kalan ömür ÷ Yıl sayıları toplamı)`\n\n5 yıl → payda **5+4+3+2+1 = 15**\n\n200.000 → 160.000 → 120.000 → 80.000 → 40.000\n\n**Azalandan farkı:** taban **sabit**, oran değişir → son yıl özel kural **gerekmez**.\n\nVUK’ta **yok**, IFRS’te var.' },
      { on:'Üretim miktarı esaslı amortisman', arka:'`Birim = Tutar ÷ Toplam tahmini üretim`\n`Dönem = Birim × O dönemin üretimi`\n\n600.000 ÷ 300.000 adet = **2 TL/adet**\n80.000 adet → **160.000 TL**\n\n**Neden:** pres/kalıp durduğunda yıpranmaz.\n**Zorluk:** her dönem fiili miktar girilmeli.' },
      { on:'Kalıntı değer — VUK vs IFRS', arka:'`Amortismana tabi tutar = Edinim − Kalıntı`\n\n**VUK:** kalıntı değer **YOK** → varlık tam itfa, NDD **sıfır**\n**IFRS:** kalıntı **var** ve her dönem gözden geçirilir → NDD sıfırlanmaz\n\n→ Paralel defter ihtiyacının somut sebebi.' },
      { on:'Yöntem seçimi vergi indirimi midir?', arka:'**HAYIR — vergi ertelemesidir.**\n\nDoğrusal, azalan, YST ve üretim yöntemlerinde **toplam amortisman aynıdır** (600.000).\n\nDeğişen yalnızca **hangi yıla ne kadar** düştüğü.\n\n*Tek istisna:* kalıntı değerli hesaplama — orada tutarın kendisi küçülür.' },
      { on:'Türkiye’de hangi yöntem hangi alanda?', arka:'**Vergi alanı (VUK):**\n① Doğrusal · ② Azalan bakiyeler\n\n**IFRS alanı:**\n③ YST · ④ Üretim miktarı · ⑤ Kalıntı değerli\n\nAynı varlık iki alanda **farklı yöntemle** değerlenir → **paralel defter**.' },
      { on:'Kıst amortisman ne zaman uygulanır?', arka:'**YALNIZCA binek otomobillerde** (VUK md. 320/2).\n\nGenel kural **tam yıldır**: 28 Aralık’ta alınan makineye o yılın tamamı için amortisman ayrılır.\n\n**En çok yanlış bilinen VUK kuralı.**\n\nİstisnanın istisnası: araç kiralama / sürücü kursu → kıst **yok**.' },
      { on:'Kıst amortisman nasıl hesaplanır?', arka:'**Ay kesri tam ay sayılır.**\n\n15 Nisan’da alınan oto → Nisan **dahil** → 9 ay → yıllık amortismanın **9/12’si**.\n\nAyrılamayan 3/12 **kaybolmaz**: faydalı ömrün **son yılında** tamamlanır.\n\nToplam değişmez, **bir yıla kaydırılır**.' },
      { on:'Amortisman anahtarı hangi 5 yöntemi birleştirir?', arka:'**1. Temel** (AFAMR) — hangi mantıkla?\n**2. Azalan bakiyeler** (AFAMD) — ne kadar hızlı?\n**3. Çok seviyeli** (AFAMS) — zamanla değişecek mi?\n**4. Dönem kontrolü** (AFAMP) — **ne zaman başlar?** ← kıst\n**5. Azami tutar** — tavan var mı?\n\nAnahtar kendisi **hesaplama yapmaz**.' },
      { on:'VUK’a göre amortisman yöntemleri (9 başlık)', arka:'**1** Normal (md. 315) · **2** Azalan bakiyeler (mük. 315)\n**3** Kıst — binek oto (320/2) · **4** Fevkalade (317)\n**5** Madenlerde (316) · **6** Özel maliyet (327)\n**7** Düşük değerli (313) · **8** Amortismana tabi olmayan (314)\n**9** Yenileme fonu (328–329)' },
      { on:'Azalan bakiyelerde son yıl ne olur?', arka:'**Kalan net defter değerinin TAMAMI ayrılır** — oran uygulanmaz.\n\nSebep: oran hep **kalana** uygulandığı için varlık **matematiksel olarak hiç sıfırlanmazdı**.\n\nSAP’ta: AFAMR → "ömür bitince kalanı sıfırla" ayarı. Unutulursa varlık defterde küçük bakiyeyle kalır.' },
      { on:'Azalan bakiyeler — VUK kuralları', arka:'• Oran = normal oranın **2 katı**, azami **%50**\n• Yalnızca **bilanço esasına** göre defter tutanlar\n• Taban: **net defter değeri** (her yıl küçülür)\n• Son yıl: kalanın tamamı\n• **Azalandan normale geçilir, tersi olmaz**' },
      { on:'Özel maliyet bedeli kaç yılda itfa edilir?', arka:'**Kira süresine göre eşit yüzdelerle** (VUK md. 327) — varlığın kendi ömrüne göre **değil**.\n\n• Kira 8 yıl → 8 yılda\n• **Süre belli değilse → 5 yıl**\n• Süre dolmadan boşaltılırsa → **kalan o yıl gider**' },
      { on:'Hangi varlıklar amortismana tabi değildir?', arka:'**Boş arazi ve arsalar** (VUK md. 314)\n**AuC** (henüz kullanıma hazır değil)\n\nSAP’ta: amortisman anahtarı **0000**.\n\n*İstisna:* tarım işletmelerinde vücuda getirilen meyvalık, dutluk gibi tesisler **amortismana tabidir**.' },
      { on:'Fevkalade amortisman hangi hâllerde?', arka:'**Üç hâl** (VUK md. 317):\n1. **Afet** — yangın, deprem, su basması\n2. **Yeni icatlar** — teknik verim düşüşü\n3. **Cebri çalışma** — aşırı yıpranma\n\nOran serbest değil: **Maliye Bakanlığınca** belirlenir, **başvuru gerekir**.' },
      { on:'Türkiye kurulumunda kaç amortisman anahtarı gerekir?', arka:'**En az iki** — aynı temel yöntem, farklı dönem kontrolü:\n\n**a)** Genel varlıklar → "yıl başından itibaren" (**tam yıl**)\n**b)** Binek otomobil → "edinim ayından oransal" (**kıst**)\n\nTek anahtar kullanılırsa vergi matrahı yanlış hesaplanır — **hata mesajı çıkmaz**.' },
      { on:'AuC (yapılmakta olan yatırım) amortismana tabi midir?', arka:'**Hayır.**\n\nVarlık henüz kullanıma hazır değil, fayda sağlamıyor.\n\nAuC varlık sınıfı amortisman anahtarını **0000** getirir → sistem yapısal olarak ayıramaz.\n\nAIAB (kural) → **AIBU** (aktifleştirme) ile başlar.' },
      { on:'AuC neden gerekli? (üç fayda)', arka:'İnşaat harcaması **ne gider ne kullanıma hazır varlık**.\n\n**1.** Doğru dönemsellik — amortisman fayda başlayınca başlar\n**2.** Farklı modüllerden maliyet toplama (FI faturası + MM malzeme + CO işçilik)\n**3.** Doğru faydalı ömür ataması (kalem bazlı yerleşim)' },
      { on:'AuC’de hangi hesaplar çalışır?', arka:'`259` **Verilen yatırım avansı** — henüz maliyet değil\n`258` **Yapılmakta olan yatırımlar** — maliyet birikir\n`252/253/255` **hedef varlıklar** — aktifleştirmede borç\n`320` satıcı · `153` stok · `770` işçilik — karşı hesaplar\n\nHesap belirleme: **AO90** + varlık sınıfı.' },
      { on:'AuC aktifleştirmesi kâr/zarar yaratır mı?', arka:'**HAYIR.**\n\n258 alacak / 252 borç → bilanço toplamı **değişmez**, gelir tablosu **etkilenmez**.\n\nBu bir **sınıflandırma değişikliğidir**: "hazırlanıyor" → "kullanımda".\n\nDeğişen tek şey: o tarihten sonra **amortisman başlar**.' },
      { on:'Özet vs kalem bazlı yerleşim', arka:'**Özet** — tüm maliyet **tek hedefe**. Basit, varsayılan.\n\n**Kalem bazlı** — maliyet **birden çok varlığa** bölünür: bina 50 yıl, makine 10 yıl, demirbaş 5 yıl.\n\nVarlık sınıfında **baştan seçilir, sonradan değiştirilemez**.' },
      { on:'AIBU’da en kritik alan hangisi?', arka:'**Aktifleştirme tarihi.**\n\nAmortismanın başlangıcını **bu tarih** belirler — faturaların tarihi değil.\n\nSistem soruyor çünkü *"varlık ne zaman kullanıma hazır oldu?"* sorusunu **yalnızca insan bilebilir**.\n\nErken tarih → kullanılmayan varlığa amortisman\nGeç tarih → çalışan varlığın maliyeti gizlenir' },
      { on:'Kısmi aktifleştirme ne zaman gerekir?', arka:'**Aşamalı devreye alınan projelerde.**\n\nİlk hat Ağustos’ta çalışıyor, ikincisi Aralık’ta bitiyor → Ağustos’ta **kısmi aktifleştirme**.\n\nBeklenirse çalışan hat **dört ay amortismansız** üretim yapar: maliyet eksik, kâr yüksek görünür.\n\n**En sık atlanan adım.**' },
      { on:'Varlık sınıfı sonradan değiştirilebilir mi?', arka:'**Hayır.**\n\nHesap belirlemeyi ve numara aralığını taşır.\n\nDüzeltmenin tek yolu: **ABUMN** ile doğru sınıfta yeni varlığa transfer. Değerler ve birikmiş amortisman taşınır.' },
      { on:'Normal ile azalan bakiyeler yöntemi farkı?', arka:'**Normal:** edinim değeri üzerinden, her dönem **aynı** tutar.\n\n**Azalan bakiyeler:** net defter değeri üzerinden, ilk yıllar **yüksek**, sonra düşer.\n\nAzalan yöntem ilk yıllarda vergi avantajı sağlar.' },
      { on:'AFAB çalıştırma nedenleri nelerdir?', arka:'**Planlanan** — normal aylık koşu\n**Tekrar** — aynı dönemi yeniden (fark kaydeder)\n**Kısıtlı** — yalnızca seçili varlıklar\n**Yeniden başlatma** — yarım kalan koşuyu sürdürür\n\nHer zaman önce **test modu**.' },
      { on:'Yıl sonu AA kapanış sırası nedir?', arka:'**1. AJRW** — yeni mali yılı aç\n**2. AFAB** — 12 dönemin tamamını çalıştır\n**3. AJAB** — eski yılı kapat\n\nAJRW olmadan yeni yıla kayıt yapılamaz.\nEksik AFAB varken AJAB çalışmaz.' },
      { on:'S/4HANA’da AA’da en büyük değişiklik nedir?', arka:'**Enterprise Asset Accounting:**\n1. Değerler **ACDOCA**’ya taşındı (ANEP/ANLC compatibility view)\n2. Amortisman alanı ↔ **defter eşleşmesi zorunlu**\n3. Tüm alanlar **anlık** kaydediyor (dönem sonu beklenmiyor)\n4. Technical Clearing Account zorunlu' },
    ],
  },

  },
});
