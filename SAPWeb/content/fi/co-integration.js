/* ==========================================================================
   content/fi/co-integration.js — "CO Integration (Kontrolörlük Entegrasyonu)"
   ========================================================================== */

SAP.registerTopic({
  id: 'co-integration',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'CO entegrasyonu, **finansal muhasebe (FI) ile yönetim muhasebesi (CO) arasındaki ' +
      'köprüdür**. İkisi aynı olayı farklı sorularla kaydeder:\n\n' +
      '**FI:** "Dışarıya karşı ne oldu?" → yasal mali tablo, denetlenebilir, ' +
      'kurallar mevzuatla belirlenir.\n' +
      '**CO:** "İçeride ne oldu?" → yönetim raporu, serbest tasarlanır, ' +
      'kurallar şirketin kendisi belirler.\n\n' +
      'Köprüyü **{{masraf-turu}}** kurar: bir G/L hesabının CO karşılığı. ' +
      'Numaraları **aynıdır** — 770300 hesabı, 770300 masraf türüdür.\n\n' +
      'Entegrasyon iki yönlüdür ve bu simetri kritiktir:\n\n' +
      '**FI → CO:** bir gider kaydedildiğinde CO nesnesine de yazılır. ' +
      '**Her zaman** olur, otomatiktir.\n' +
      '**CO → FI:** CO içi bir değer aktarımı belirli koşullarda FI belgesi üretir. ' +
      '**Bazen** olur, koşula bağlıdır ({{FAGLCOFIRTINT}}).\n\n' +
      'S/4HANA’da bu ayrım büyük ölçüde anlamını yitirdi: FI ve CO satırları ' +
      '{{ACDOCA}}’da **aynı tabloda** durur.',

    neden:
      '**İki farklı okuyucu.** Mali tablo dışarıya (vergi dairesi, banka, ortak), ' +
      'yönetim raporu içeriye (müdür, yönetim kurulu) gider. ' +
      'İhtiyaçları farklıdır.\n\n' +
      '**Farklı kırılım.** FI hesap bazında toplar; CO birim, ürün, proje, ' +
      'müşteri bazında kırar.\n\n' +
      '**Farklı zaman.** FI dönem sonunda kapanır; CO sürekli izlenir.\n\n' +
      '**Ama aynı gerçeklik.** İkisi de aynı parayı sayar. ' +
      'Tutarların **tutması zorunludur** — yoksa iki farklı gerçek doğar ve ' +
      'hangisine güvenileceği belirsizleşir.',

    sirketOnemi:
      'FI–CO entegrasyonu, **ERP’nin en temel vaadidir**: aynı veriyi bir kez girip ' +
      'iki farklı amaçla kullanmak.\n\n' +
      'Danışman açısından bu konu, {{cost-center}} konusunun **mimari çerçevesidir**: ' +
      'maliyet yeri günlük kullanımı, CO entegrasyonu ise ' +
      '"neden böyle çalışıyor" sorusunu açıklar.\n\n' +
      'S/4HANA öncesi kurulumlarda ay sonunun ciddi bir bölümü ' +
      '**FI–CO mutabakatına** giderdi: iki tablo karşılaştırılır, farklar aranır, ' +
      'aktarım hataları düzeltilirdi. ' +
      '{{ACDOCA}} bu işi tamamen ortadan kaldırdı — ' +
      've bu, S/4HANA’nın FI tarafındaki **en somut faydasıdır**.\n\n' +
      'Mülakatta ayırt edici soru: **"CO içi bir dağıtım FI’ı etkiler mi?"** ' +
      'Doğru cevap: **normalde hayır**. Ama şirket kodu, kâr merkezi, bölüm veya ' +
      'fonksiyonel alan **değişiyorsa evet** — çünkü bunlar FI’ın da raporladığı ' +
      'boyutlardır ve tutarsız kalamazlar.',

    gercekHayat:
      'Bir şirkette Bilgi İşlem maliyet yeri, tüm departmanlara hizmet veriyor. ' +
      'Aylık gideri 480.000 TL.\n\n' +
      'Ay sonunda bu gider kullanıcı sayısına göre departmanlara dağıtılıyor: ' +
      'Üretim %45, Satış %30, İdari %25.\n\n' +
      '**Soru:** bu dağıtım muhasebeye yansır mı?\n\n' +
      '**Senaryo A — hepsi aynı şirket kodunda, aynı kâr merkezinde:** ' +
      'Hayır. FI için hiçbir şey değişmedi — gider yine aynı hesapta, ' +
      'aynı şirket kodunda, aynı kâr merkezinde. ' +
      'Yalnızca CO içinde etiket değişti.\n\n' +
      '**Senaryo B — departmanlar farklı kâr merkezlerinde:** ' +
      '**Evet.** Kâr merkezi FI’ın da raporladığı bir boyuttur ve ' +
      'kâr merkezi bazlı bilanço çıkarılıyorsa ({{new-gl}}) ' +
      'bu aktarımın FI’a yansıması **zorunludur**. ' +
      'Yoksa CO’da Üretim’in gideri artar, FI’da artmaz — ' +
      'iki farklı gerçek doğar.\n\n' +
      'İşte {{FAGLCOFIRTINT}} tam olarak bu ayrımı yönetir: ' +
      'hangi CO aktarımının FI belgesi üreteceğini tanımlar.',

    muhasebeMantigi:
      'FI–CO entegrasyonunun muhasebe mantığı **tek bir ilkeye** dayanır: ' +
      '**aynı olay, iki bakış açısı — ama tek gerçeklik.**\n\n' +
      'Bir gider kaydedildiğinde toplam tutar hem FI’da hem CO’da aynıdır. ' +
      'Farklı olan **kırılımdır**: FI hesap bazında, CO nesne bazında.\n\n' +
      'Bu ilkenin iki sonucu vardır:\n\n' +
      '**1. CO içi hareketler toplamı değiştirmez.** ' +
      'Bir gideri maliyet yerinden diğerine taşımak, ' +
      'şirketin toplam giderini değiştirmez — bu yüzden **FI’ı etkilemez**.\n\n' +
      '**2. Ama FI’ın raporladığı bir boyut değişiyorsa, FI da değişmelidir.** ' +
      'Şirket kodu, kâr merkezi, bölüm ve fonksiyonel alan böyledir. ' +
      'Bunlar FI mali tablolarında raporlanır; CO’da değişip FI’da değişmemeleri ' +
      '**tutarsızlık** yaratır.\n\n' +
      'Klasik yapıda bu tutarsızlık ay sonu mutabakatıyla yönetilirdi. ' +
      '{{new-gl}} gerçek zamanlı entegrasyonu getirdi; ' +
      '{{ACDOCA}} ise sorunu **yapısal olarak** ortadan kaldırdı.',

    kavramlar: ['masraf-turu', 'maliyet-yeri', 'kontrol-alani', 'ic-siparis',
                'kar-merkezi', 'evrensel-kayit-defteri'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'CO entegrasyonu üç katmanda çalışır: **organizasyon kurulumu** (bir kez), ' +
      '**günlük FI→CO akışı** (otomatik) ve **dönem sonu CO→FI geri akışı** ' +
      '(koşullu).',

    roller:[
      { rol:'CO danışmanı', gorev:'{{kontrol-alani}} kurar ({{OKKP}}), numara aralıklarını tanımlar ({{KANK}}).' },
      { rol:'FI danışmanı', gorev:'Masraf türlerini ve {{FAGLCOFIRTINT}} varyantını tanımlar.' },
      { rol:'Muhasebe kullanıcısı', gorev:'Gideri CO nesnesiyle kaydeder — **FI ve CO aynı anda yazılır**.' },
      { rol:'Kontrolör', gorev:'Dönem sonunda dağıtım, yerleşim ve maliyetlendirme çalıştırır.' },
      { rol:'Ana muhasebe', gorev:'ECC’de FI–CO mutabakatını yapar; **S/4HANA’da bu iş yoktur**.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'FI ile CO arasındaki iki yönlü akış',
      adimlar:[
        { ic:'🏛️', rol:'Danışman', baslik:'{{kontrol-alani}} kurulur ({{OKKP}})',
          aciklama:'Şirket kodları atanır. **Şart:** aynı hesap planı ve aynı mali yıl varyantı. ' +
                   'Numara aralıkları ({{KANK}}) tanımlanır.',
          cikti:'CO organizasyonu', ok:'köprü kurulur' },
        { ic:'🔗', rol:'Danışman', baslik:'Masraf türleri tanımlanır ({{KA01}})',
          aciklama:'G/L hesabının CO karşılığı. **Numaraları aynıdır.** ' +
                   'S/4HANA’da hesabın bir özelliğidir.',
          cikti:'FI ↔ CO köprüsü', ok:'günlük kullanım' },
        { ic:'🧾', rol:'Kullanıcı', baslik:'**FI → CO:** gider kaydedilir',
          aciklama:'{{FB50}} / {{MIRO}}. CO nesnesi zorunludur. ' +
                   'FI ve CO **aynı LUW’da** yazılır — ayrı adım yok.',
          cikti:'Entegre kayıt', ok:'ay sonu' },
        { ic:'🔀', rol:'Kontrolör', baslik:'CO içi işlemler çalışır',
          aciklama:'Dağıtım ({{KSU5}}), devir ({{KSV5}}), yerleşim ({{KO88}}), ' +
                   'yeniden kayıt ({{KB11N}}).',
          cikti:'Dağıtılmış maliyet', ok:'boyut değişti mi?' },
        { ic:'❓', rol:'Sistem', baslik:'**CO → FI:** boyut kontrolü',
          aciklama:'Şirket kodu, {{kar-merkezi}}, bölüm veya fonksiyonel alan değişti mi? ' +
                   'Değiştiyse FI belgesi **üretilir**; değişmediyse üretilmez.',
          cikti:'Koşullu FI belgesi', ok:'raporlama' },
        { ic:'📊', rol:'Kontrolör', baslik:'Raporlanır',
          aciklama:'S/4HANA’da FI ve CO **aynı tablodan** ({{ACDOCA}}) raporlanır; ' +
                   'mutabakat gerekmez.',
          cikti:'Tutarlı raporlar' },
      ],
    },

    adimlar:[
      { rol:'CO danışmanı', eylem:'Kontrol alanını kurar', sistem:'{{OKKP}} → {{TKA01}}' },
      { rol:'CO danışmanı', eylem:'CO numara aralıklarını tanımlar', sistem:'{{KANK}} — **eksikse FI de durur**' },
      { rol:'FI danışmanı', eylem:'Masraf türlerini tanımlar', sistem:'{{KA01}} → {{CSKB}} (S/4: {{FS00}})' },
      { rol:'FI danışmanı', eylem:'Gerçek zamanlı entegrasyon varyantını tanımlar', sistem:'{{FAGLCOFIRTINT}}' },
      { rol:'Kullanıcı', eylem:'Gideri CO nesnesiyle kaydeder', sistem:'FI + CO **aynı LUW**' },
      { rol:'Kontrolör', eylem:'Ay sonu dağıtımını yapar', sistem:'{{KSV5}}, {{KSU5}}' },
      { rol:'Kontrolör', eylem:'İç siparişleri yerleştirir', sistem:'{{KO88}}' },
      { rol:'Sistem', eylem:'Boyut değişimini FI’a yansıtır', sistem:'Koşullu FI belgesi' },
    ],

    veriAkisi:{
      nereden:'FI belgeleri, masraf türü tanımları, CO nesneleri, ' +
              '{{FAGLCOFIRTINT}} varyant kuralları.',
      nereye:'{{ACDOCA}} (S/4) — FI ve CO satırları birlikte; ECC’de ayrıca {{COEP}}.',
      tetikleyen:'Masraf türü olan her kayıt (FI→CO); boyut değiştiren her CO işlemi (CO→FI).',
      sonraki:'Ürün maliyetlendirme, kârlılık analizi, yönetim raporlaması.',
    },

    notlar:[
      { tip:'tip', baslik:'CO → FI geri akışı ne zaman devreye girer?', metin:
        'CO içi bir aktarım **normalde FI belgesi üretmez** — çünkü şirketin ' +
        'toplam gideri değişmez.\n\n' +
        'Ama şu **dört boyuttan biri** değişiyorsa FI belgesi üretilir:\n\n' +
        '**1. Şirket kodu** — iki farklı tüzel kişilik arasında değer aktarımı. ' +
        'Bu, FI’da karşılıklı borç/alacak yaratır ve **zorunlu** olarak kaydedilir.\n\n' +
        '**2. {{kar-merkezi}}** — kâr merkezi bazlı bilanço çıkarılıyorsa ' +
        'FI’ın da bilmesi gerekir.\n\n' +
        '**3. Bölüm (business area)** — FI’da raporlanan bir boyuttur.\n\n' +
        '**4. Fonksiyonel alan** — gelir tablosunun fonksiyon esaslı sunumunda kullanılır ' +
        '(üretim maliyeti / pazarlama gideri / yönetim gideri ayrımı).\n\n' +
        'Ortak nokta: **dördü de FI mali tablolarında raporlanan boyutlardır.** ' +
        'CO’da değişip FI’da değişmemeleri iki farklı gerçek yaratırdı.\n\n' +
        'Kural {{FAGLCOFIRTINT}} varyantında tanımlanır ve ' +
        'hangi boyut değişimlerinin FI belgesi üreteceği seçilebilir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'CO entegrasyonunun muhasebe etkisi **koşulludur**: çoğu CO işlemi FI’ı etkilemez, ' +
      'ama boyut değiştiren işlemler etkiler. ' +
      'Aşağıdaki fişler bu ayrımı adım adım gösteriyor.',

    etkilenenHesaplar:[
      { hesap:'Gider hesapları (7xx)', tur:'Gelir tablosu', neden:'Masraf türü tanımlıysa CO nesnesi zorunludur.' },
      { hesap:'Devir masraf türü (kategori 42)', tur:'**Yalnızca CO**', neden:'ECC’de FI hesabı değildir; S/4HANA’da G/L hesabı olarak da açılır.' },
      { hesap:'Şirketler arası hesaplar', tur:'Bilanço', neden:'Şirket kodu değiştiren CO aktarımı bu hesapları kullanır.' },
      { hesap:'Yeniden sınıflandırma hesapları', tur:'Gelir tablosu', neden:'Fonksiyonel alan değişiminde kullanılabilir.' },
      { hesap:'Duran varlık (25x)', tur:'Bilanço — Varlık', neden:'{{ic-siparis}} yerleşimi varlığa yapılırsa aktifleştirme olur.' },
    ],

    fisler:[
      { baslik:'**FI → CO:** gider kaydı — tek kayıt, iki boyut',
        belgeTuru:'KR', tarih:'05.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Bilgi işlem gideri — **maliyet yeri 6100**', borc:480000,
            not:'FI: hesap 770 · CO: maliyet yeri 6100' },
          { hesap:'191', ad:'İndirilecek KDV', borc:96000 },
          { hesap:'320', ad:'Satıcılar', alacak:576000 },
        ],
        not:'**FI ve CO aynı LUW’da yazıldı.** Ayrı bir aktarım adımı yok.\n\n' +
             'S/4HANA’da bu üç satır {{ACDOCA}}’da durur ve ilk satırın ' +
             '`RACCT` = 770, `KOSTL` = 6100 alanları **aynı satırdadır**.\n\n' +
             'ECC’de {{BSEG}}’e üç satır, {{COEP}}’e bir CO satırı yazılırdı — ' +
             'aynı olayın **iki kaydı** vardı.' },

      { baslik:'**CO içi dağıtım** — aynı kâr merkezi · **FI etkisi yok**',
        belgeTuru:'CO', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'6100 Bilgi İşlem → 3100 Üretim (%45) · 216.000 TL', borc:0, alacak:0 },
          { hesap:'—', ad:'6100 Bilgi İşlem → 2100 Satış (%30) · 144.000 TL', borc:0, alacak:0 },
          { hesap:'—', ad:'6100 Bilgi İşlem → 5100 İdari (%25) · 120.000 TL', borc:0, alacak:0 },
        ],
        not:'Üç maliyet yeri de **aynı kâr merkezine** bağlı olduğu için ' +
             '**FI belgesi oluşmadı**.\n\n' +
             'Mantık: FI için hiçbir şey değişmedi. Gider yine 770 hesabında, ' +
             'yine aynı şirket kodunda, yine aynı kâr merkezinde. ' +
             'Yalnızca CO içindeki etiket değişti.\n\n' +
             '6100 maliyet yerinin bakiyesi **sıfırlandı** ✓' },

      { baslik:'**CO → FI:** kâr merkezi değişen dağıtım — **FI belgesi oluşur**',
        belgeTuru:'CO/FI', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Bilgi işlem gideri — **KM PC-1000 Üretim**', borc:216000,
            not:'Kâr merkezi değişti → FI yansıması' },
          { hesap:'770', ad:'Bilgi işlem gideri — **KM PC-9000 Genel**', alacak:216000,
            not:'Kaynak kâr merkezinden çıktı' },
        ],
        not:'Bu kez hedef maliyet yeri **farklı bir kâr merkezine** bağlı. ' +
             '{{FAGLCOFIRTINT}} kuralı devreye girdi ve **FI belgesi üretildi**.\n\n' +
             'Dikkat: **aynı hesap** hem borç hem alacak. Toplam gider değişmedi — ' +
             'yalnızca kâr merkezleri arasında yer değiştirdi.\n\n' +
             'Bu olmadan CO’da Üretim’in gideri artar, FI’da artmazdı ve ' +
             'kâr merkezi bazlı bilanço **tutmazdı**.' },

      { baslik:'Şirket kodu değişen aktarım — **her zaman FI belgesi**',
        belgeTuru:'SA', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Hizmet gideri — şirket kodu 2000', borc:180000, not:'Alıcı şirket' },
          { hesap:'395', ad:'Grup içi borçlar — şirket 2000', alacak:180000 },
        ],
        not:'İki farklı tüzel kişilik arasında değer aktarımı yapıldı. ' +
             'Bu, FI için **zorunlu bir kayıttır** — iki ayrı şirketin ' +
             'mali tabloları etkilenir.\n\n' +
             'Karşı tarafta ayna kayıt oluşur: şirket 1000’de ' +
             '395 grup içi alacaklar borç / 770 gider alacak.\n\n' +
             'Şirket kodu değişimi, FI belgesi üretmesi **hiçbir koşula bağlı olmayan** ' +
             'tek durumdur — kapatılamaz.' },

      { baslik:'{{ic-siparis}} yerleşimi ({{KO88}}) — hedef **duran varlık**',
        belgeTuru:'AA', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Tesis, makine ve cihazlar', borc:1850000, not:'**Aktifleştirme** — FI belgesi' },
          { hesap:'770', ad:'Yatırım gideri (siparişte toplanan)', alacak:1850000 },
        ],
        not:'Yatırım siparişinde biriken maliyet, **duran varlığa** yerleştirildi.\n\n' +
             'Bu, kesinlikle bir FI olayıdır: gider **varlığa dönüştü**, ' +
             'bilanço büyüdü, artık amortismana tabi.\n\n' +
             'Yerleşim hedefi maliyet yeri olsaydı FI belgesi ' +
             '(kâr merkezi değişmedikçe) oluşmazdı. ' +
             '**Hedef türü, FI etkisini belirler.**' },

      { baslik:'❌ Yerleşim atlanırsa — maliyet siparişte asılı kalır',
        belgeTuru:'—', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'İç sipariş 500118 · bakiye **1.850.000 TL** · yerleşim **yapılmadı**', borc:0, alacak:0,
            not:'Ne varlıkta ne maliyet yerinde' },
        ],
        not:'{{KO88}} çalıştırılmazsa maliyet **siparişte kalır**:\n\n' +
             '• Duran varlık **oluşmaz** → amortisman başlamaz\n' +
             '• Maliyet yeri raporlarında **görünmez**\n' +
             '• FI’da gider olarak durur ama **hiçbir birime ait değildir**\n\n' +
             'Bilanço da gelir tablosu da yanlış olur: ' +
             'aktifleştirilmesi gereken 1,85 milyon TL **gider yazılmış** görünür.\n\n' +
             'İç siparişlerin **en sık sorunu** budur ve ' +
             'yıl sonu kapanış kontrol listesine "açık iç sipariş var mı?" ' +
             'maddesi konmalıdır.' },
    ],

    tHesaplar:[
      { hesap:'Bilgi işlem gideri (FI)', kod:'770',
        borc:[{ ad:'Fatura', tutar:480000 }, { ad:'KM aktarımı (giren)', tutar:216000 }],
        alacak:[{ ad:'KM aktarımı (çıkan)', tutar:216000 }],
        not:'Net etki **sıfır** — toplam gider değişmedi' },
      { hesap:'Maliyet yeri 6100 Bilgi İşlem (CO)', kod:'6100',
        borc:[{ ad:'Doğrudan gider', tutar:480000 }],
        alacak:[{ ad:'Dağıtım', tutar:480000 }],
        not:'Ay sonunda **sıfırlanmalı**' },
      { hesap:'İç sipariş 500118 (CO)', kod:'500118',
        borc:[{ ad:'Yatırım harcamaları', tutar:1850000 }],
        alacak:[{ ad:'Yerleşim ({{KO88}})', tutar:1850000 }],
        not:'Yerleşim sonrası **sıfırlanmalı**' },
    ],

    notlar:[
      { tip:'warn', baslik:'"Toplam değişmiyorsa FI etkilenmez" kuralının istisnası', metin:
        'Genel kural şudur: CO içi hareket toplam gideri değiştirmez, ' +
        'bu yüzden FI’ı etkilemez.\n\n' +
        'Ama bu kuralın **dört istisnası** vardır ve hepsinin ortak sebebi aynıdır: ' +
        '**FI de o boyutu raporluyor.**\n\n' +
        '**Şirket kodu** — iki tüzel kişilik; FI’da karşılıklı borç/alacak zorunlu.\n' +
        '**{{kar-merkezi}}** — kâr merkezi bilançosu çıkarılıyorsa FI bilmeli.\n' +
        '**Bölüm** — FI’da raporlanan boyut.\n' +
        '**Fonksiyonel alan** — fonksiyon esaslı gelir tablosunda kullanılır.\n\n' +
        'Bunların dışındaki her CO hareketi (maliyet yeri değişimi, ' +
        'iç sipariş yerleşimi maliyet yerine, faaliyet aktarımı) ' +
        'FI’ı **etkilemez**.\n\n' +
        '**Pratik teşhis:** "bu CO işlemi FI belgesi üretti mi?" sorusunun cevabı ' +
        'her zaman "hangi boyut değişti?" sorusundadır.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'CO entegrasyonu **akış yönüne**, **CO bileşenine** ve ' +
      '**masraf türü kategorisine** göre çeşitlenir. ' +
      'Bir de klasik/gerçek zamanlı/birleşik mimari kuşakları vardır.',

    liste:[
      { ad:'FI → CO akışı', en:'FI to CO',
        aciklama:'Gider kaydı CO nesnesine de yazılır. **Otomatik ve her zaman.**',
        neZaman:'Masraf türü tanımlı her hesapta.',
        ornek:'{{FB50}} ile 770 hesabına kayıt → maliyet yeri 4200’e de yazılır.' },

      { ad:'CO → FI akışı', en:'Real-Time Integration CO to FI',
        aciklama:'CO içi aktarım FI belgesi üretir. **Koşulludur.**',
        neZaman:'Şirket kodu, kâr merkezi, bölüm veya fonksiyonel alan değiştiğinde.',
        ornek:'{{FAGLCOFIRTINT}} varyantında hangi boyutların tetikleyeceği tanımlanır.',
        tcodes:['FAGLCOFIRTINT'] },

      { ad:'Birincil masraf türü', en:'Primary Cost Element — kategori 1',
        aciklama:'G/L gider hesabının CO karşılığı; **FI’dan CO’ya köprü**.',
        neZaman:'Her gider hesabı için.',
        ornek:'770300 hesabı ↔ 770300 masraf türü. **Numaralar aynıdır.**',
        tcodes:['KA01'] },

      { ad:'Gelir masraf türü', en:'Revenue Element — kategori 11',
        aciklama:'Gelir hesaplarının CO karşılığı; kârlılık analizinde kullanılır.',
        neZaman:'CO-PA kullanılıyorsa.',
        ornek:'600 hesabı → kategori 11. Maliyet yerine kaydedilemez, ' +
              'kârlılık segmentine gider.' },

      { ad:'Devir masraf türü', en:'Assessment Element — kategori 42',
        aciklama:'Yalnızca CO içi devir işlemlerinde kullanılır.',
        neZaman:'{{KSV5}} devri çalıştırıldığında.',
        ornek:'ECC’de FI hesap planında **yoktur**; S/4HANA’da G/L hesabı olarak da açılır.' },

      { ad:'Hizmet aktarım masraf türü', en:'Internal Activity — kategori 43',
        aciklama:'Faaliyet türü aktarımlarında kullanılır (makine saati, işçilik saati).',
        neZaman:'Üretim maliyetlendirmesinde.',
        ornek:'Üretim maliyet yerinden üretim siparişine saat bazlı aktarım.' },

      { ad:'Maliyet yeri muhasebesi', en:'CCA — Cost Center Accounting',
        aciklama:'CO’nun en temel bileşeni; sorumluluk bazlı gider izleme.',
        neZaman:'Neredeyse her kurulumda.',
        ornek:'Ayrıntısı {{cost-center}} konusundadır.',
        tcodes:['KS01','KSB1'] },

      { ad:'İç sipariş muhasebesi', en:'Internal Orders',
        aciklama:'Geçici maliyet toplama; sonunda **yerleştirilir**.',
        neZaman:'Proje, kampanya, yatırım, bakım.',
        ornek:'{{KO88}} ile maliyet yerine, duran varlığa veya G/L hesabına yerleşir.',
        tcodes:['KO01','KO88'] },

      { ad:'Kârlılık analizi', en:'CO-PA — Profitability Analysis',
        aciklama:'Ürün, müşteri, bölge bazında kârlılık.',
        neZaman:'Satış kârlılığı analiz edilecekse.',
        ornek:'S/4HANA’da **account-based CO-PA** {{ACDOCA}} ile entegre — ' +
              'FI ile fark oluşamaz.' },

      { ad:'Ürün maliyetlendirme', en:'Product Costing',
        aciklama:'Üretilen mamulün maliyetinin hesaplanması.',
        neZaman:'Üretim yapan şirketlerde.',
        ornek:'Maliyet yerlerinin faaliyet oranları üzerinden ürüne yansıması.' },
    ],

    karsilastirmaBasliklar:['Klasik (ECC eski)', 'New G/L gerçek zamanlı', 'S/4HANA ({{ACDOCA}})'],
    karsilastirma:[
      ['CO verisi', '{{COEP}} — ayrı tablo', '{{COEP}} + FI yansıması', '**{{ACDOCA}}** — aynı tablo'],
      ['CO→FI aktarımı', 'Ay sonu **toplu**', '**Gerçek zamanlı**', 'Kavram olarak **yok**'],
      ['Mutabakat ihtiyacı', '**Yüksek** — fark sık', 'Düşük', '**Yapısal olarak imkânsız**'],
      ['Fark oluşabilir mi', 'Evet', 'Nadiren (yapılandırma hatası)', '**Hayır**'],
      ['Kâr merkezi', 'Ayrı defter (EC-PCA)', 'G/L içinde', '{{ACDOCA}} boyutu'],
      ['İkincil masraf türü', 'FI hesap planında yok', 'Yok', '**G/L hesabı olarak var**'],
      ['Ay sonu iş yükü', 'Mutabakat + düzeltme', 'Kontrol', '**Yok**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'KA01', ad:'Masraf türü oluştur — FI ↔ CO köprüsü',
        amac:'Bir G/L hesabının CO karşılığını tanımlar.',
        neZaman:'Yeni gider hesabı açıldığında. **S/4HANA’da {{FS00}} içinde yapılır.**',
        adimlar:[
          { baslik:'Masraf türü numarasını gir',
            aciklama:'**G/L hesap numarasıyla aynı olmalıdır** — bu bir kural değil zorunluluktur.' },
          { baslik:'Geçerlilik aralığını gir' },
          { baslik:'**Kategoriyi seç**',
            aciklama:'**1** birincil · **11** gelir · **42** devir · **43** hizmet aktarımı. ' +
                     'Kategori yanlışsa işlem tipi çalışmaz.' },
          { baslik:'Kaydet',
            aciklama:'Artık o hesaba yapılan kayıt CO nesnesi **ister**.' },
        ],
        ekranAkisi:[
          { ekran:'Başlangıç', islem:'Masraf türü 770300 · geçerlilik 01.01.2027–31.12.9999' },
          { ekran:'Temel veri', islem:'Ad "Reklam gideri" · **kategori 1**' },
          { ekran:'Kontrol', islem:'Kayıt için CO nesnesi zorunlu' },
        ],
        alanlar:{
          zorunlu:['Masraf türü (= G/L hesabı)','Geçerlilik aralığı','Ad','Kategori'],
          opsiyonel:['Öznitelik karışımı','Fonksiyonel alan'] },
        hatalar:[
          { mesaj:'G/L account ... does not exist in chart of accounts', sebep:'Masraf türü açılmadan önce G/L hesabı açılmalıdır.', cozum:'Önce {{FS00}} ile hesabı aç, sonra masraf türünü tanımla. **Sıra önemlidir.**' },
          { mesaj:'Cost element category ... not allowed', sebep:'Hesap tipiyle kategori uyumsuz (gider hesabına kategori 11 gibi).', cozum:'Gider hesabı → kategori 1 · gelir hesabı → kategori 11.' },
        ],
        ipucu:'**Masraf türü açmak bir taahhüttür:** o andan itibaren o hesaba ' +
              'yapılan **her kayıt** CO nesnesi ister. ' +
              'CO nesnesi girilmezse ve {{OKB9}} varsayılanı yoksa ' +
              '**belge kaydedilemez**.\n\n' +
              'Bu yüzden bilanço hesaplarına masraf türü **açılmaz** — ' +
              'satıcı veya banka hesabına CO nesnesi sorulmasının anlamı yoktur.',
        ilgili:['KA02','KA03','FS00','OKB9'] },

      { kod:'OKKP', ad:'Kontrol alanı ayarları',
        amac:'CO organizasyonunu kurar; hangi şirket kodlarının hangi kontrol alanına ' +
             'bağlı olduğunu belirler.',
        neZaman:'Kurulumda; yeni şirket kodu eklendiğinde.',
        adimlar:[
          { baslik:'Kontrol alanını tanımla',
            aciklama:'Para birimi, hesap planı, mali yıl varyantı.' },
          { baslik:'**Şirket kodlarını ata**',
            aciklama:'**Şart:** bağlı şirket kodları **aynı hesap planını** ve ' +
                     '**aynı mali yıl varyantını** kullanmalıdır.' },
          { baslik:'Bileşenleri etkinleştir',
            aciklama:'Maliyet yeri muhasebesi, iç siparişler, kârlılık analizi…' },
          { baslik:'**Numara aralıklarını tanımla** ({{KANK}})',
            aciklama:'İş işlemi bazında. **Eksikse CO ve FI kayıtları durur.**' },
        ],
        alanlar:{
          zorunlu:['Kontrol alanı','Para birimi','Hesap planı','Mali yıl varyantı','Şirket kodu ataması'],
          opsiyonel:['Etkin bileşenler','Kâr merkezi muhasebesi'] },
        hatalar:[
          { mesaj:'Chart of accounts of company code differs from controlling area', sebep:'Şirket kodu farklı hesap planı kullanıyor.', cozum:'Ya hesap planlarını hizala ya ayrı kontrol alanı kur. **Sonradan değiştirmesi çok zordur.**' },
          { mesaj:'Fiscal year variant is not the same', sebep:'Mali yıl varyantları farklı.', cozum:'Aynı olmalıdır; aksi hâlde dönem eşleşmesi kurulamaz.' },
        ],
        ipucu:'**Bir kontrol alanına birden çok şirket kodu bağlamak** ' +
              'şirketler arası maliyet dağıtımını mümkün kılar — ' +
              'holding yapılarında çok değerlidir.\n\n' +
              'Ama şartı ağırdır: **aynı hesap planı ve aynı mali yıl varyantı**. ' +
              'Bu, kurulumun ilk haftasında verilecek bir karardır; ' +
              'sonradan değiştirmek pratikte imkânsızdır.',
        ilgili:['KANK','TKA01','KS01'] },

      { kod:'KANK', ad:'CO numara aralıkları — **sessiz kırılma noktası**',
        amac:'CO belgeleri için iş işlemi bazında numara aralığı tanımlar.',
        neZaman:'Kurulumda ve **her yılbaşında**.',
        adimlar:[
          { baslik:'Kontrol alanını gir' },
          { baslik:'İş işlemi gruplarını tanımla',
            aciklama:'**COIN** gerçek FI→CO kaydı · **RKU1** yeniden kayıt · ' +
                     '**RKIU** devir · **KOAO** yerleşim.' },
          { baslik:'Her gruba numara aralığı ata' },
          { baslik:'Yılbaşında aralıkları kontrol et',
            aciklama:'FI aralıklarıyla **birlikte** açılmalıdır.' },
        ],
        alanlar:{
          zorunlu:['Kontrol alanı','İş işlemi grubu','Numara aralığı'],
          opsiyonel:['Yıl bazlı aralık'] },
        hatalar:[
          { mesaj:'Number range for CO business transaction COIN is missing', sebep:'Gerçek kayıt aralığı tanımsız.', cozum:'{{KANK}} ile tanımla. **Bu eksikse gider kayıtları hiç yapılamaz** — FI ekranında hata alınır ama sebep CO’dadır.' },
        ],
        ipucu:'**En sinsi CO sorunudur.** CO numara aralığı eksikse veya tükendiyse ' +
              'CO kaydı başarısız olur — ve FI ile aynı LUW’da olduğu için ' +
              '**FI kaydı da başarısız olur**.\n\n' +
              'Klasik senaryo: yılbaşında FI numara aralıkları özenle açılır, ' +
              'CO unutulur. 1 Ocak sabahı tüm gider kayıtları durur ve ' +
              'ekip hatayı FI tarafında arar.\n\n' +
              '**Önlem:** yıl sonu kapanış listesinde CO aralıkları, ' +
              'FI aralıklarının **hemen yanında** olmalıdır.',
        ilgili:['OKKP','KA01'] },

      { kod:'FAGLCOFIRTINT', ad:'Gerçek zamanlı CO→FI entegrasyon varyantı',
        amac:'Hangi CO değer aktarımlarının FI belgesi üreteceğini tanımlar.',
        neZaman:'{{new-gl}} kurulumunda; kâr merkezi bazlı raporlama gerektiğinde.',
        adimlar:[
          { baslik:'Varyantı tanımla' },
          { baslik:'**Tetikleyici boyutları seç**',
            aciklama:'Şirket kodu · {{kar-merkezi}} · bölüm · fonksiyonel alan. ' +
                     'Seçilenler değiştiğinde FI belgesi üretilir.' },
          { baslik:'Belge türü ve hesap belirlemeyi tanımla' },
          { baslik:'Şirket koduna ata' },
        ],
        alanlar:{
          zorunlu:['Varyant','Tetikleyici boyutlar','Belge türü'],
          opsiyonel:['Kural bazlı seçim (BAdI)'] },
        hatalar:[
          { mesaj:'CO belgesi oluştu ama FI belgesi oluşmadı', sebep:'Değişen boyut varyantta seçili değil.', cozum:'Varyantı kontrol et. **Kâr merkezi bazlı bilanço çıkarılıyorsa kâr merkezi mutlaka seçili olmalıdır.**' },
        ],
        ipucu:'**Kâr merkezi kutusunu işaretlemeyi unutmak**, kâr merkezi bazlı ' +
              'bilanço çıkaran kurulumlarda sinsi bir hataya yol açar: ' +
              'CO’da dağıtım yapılır, kâr merkezleri arası maliyet aktarılır, ' +
              'ama FI’da **hiçbir şey değişmez**.\n\n' +
              'Sonuç: CO raporu ile kâr merkezi bilançosu **tutmaz** ve ' +
              'fark ay sonunda aranır.',
        ilgili:['KSV5','new-gl','KSU5'] },

      { kod:'KO88', ad:'İç sipariş yerleşimi (settlement)',
        amac:'İç siparişte biriken maliyeti hedefe aktarır.',
        neZaman:'Sipariş tamamlandığında; **her ay sonunda** açık siparişler için.',
        adimlar:[
          { baslik:'Sipariş numarasını ve dönemi gir' },
          { baslik:'Yerleşim kuralını kontrol et',
            aciklama:'Hedef: maliyet yeri, duran varlık veya G/L hesabı. ' +
                     '**Hedef türü FI etkisini belirler.**' },
          { baslik:'Test modunda çalıştır' },
          { baslik:'Gerçek modda çalıştır ve **siparişin sıfırlandığını doğrula**' },
        ],
        alanlar:{
          zorunlu:['Sipariş numarası','Dönem','Yerleşim kuralı'],
          opsiyonel:['Yerleşim tipi (kısmi/tam)'] },
        hatalar:[
          { mesaj:'No settlement rule maintained for order ...', sebep:'Siparişte yerleşim kuralı tanımlanmamış.', cozum:'{{KO02}} ile hedef ve oran tanımla.' },
          { mesaj:'Sipariş bakiyesi sıfırlanmadı', sebep:'Kısmi yerleşim yapılmış veya bazı masraf türleri kapsam dışı.', cozum:'Yerleşim kuralını ve kapsamı kontrol et.' },
        ],
        ipucu:'**Yerleşim atlanırsa maliyet siparişte asılı kalır:** ' +
              'ne duran varlık oluşur, ne maliyet yeri raporunda görünür. ' +
              'Yatırım siparişlerinde bu, **aktifleştirilmesi gereken tutarın ' +
              'gider olarak kalması** demektir — hem bilanço hem gelir tablosu yanlış olur.\n\n' +
              'Yıl sonu kapanış listesine **"açık iç sipariş var mı?"** maddesini ekle.',
        ilgili:['KO01','KO02','cost-center'] },

      { kod:'KA03', ad:'Masraf türünü görüntüle — teşhis noktası',
        amac:'Bir hesabın CO karşılığını ve kategorisini gösterir.',
        neZaman:'"CO nesnesi gerekli" hatasının teşhisinde.',
        adimlar:[
          { baslik:'Masraf türü (= hesap numarası) ve kontrol alanını gir' },
          { baslik:'Kategoriyi ve geçerlilik aralığını kontrol et' },
        ],
        ipucu:'*"Account requires an assignment to a CO object"* hatasında ' +
              'teşhis sırası: **1)** {{KA03}} ile masraf türü var mı, ' +
              '**2)** kategorisi doğru mu, **3)** geçerlilik aralığında mı, ' +
              '**4)** {{OKB9}} varsayılanı tanımlı mı.\n\n' +
              'Tersi durumda da işe yarar: bir hesaba **istemeden** CO nesnesi ' +
              'soruluyorsa, muhtemelen yanlışlıkla masraf türü açılmıştır.',
        ilgili:['KA01','OKB9','KSB1'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'CO entegrasyonunun tablo mimarisi, **S/4HANA’nın en büyük değişikliğinin** yaşandığı yerdir: ' +
      'ECC’de FI ({{BSEG}}) ve CO ({{COEP}}) ayrı tablolardaydı ve mutabakat gerektiriyordu. ' +
      'S/4HANA’da **{{ACDOCA}}’da tek satır**.',

    liste:[
      { ad:'ACDOCA', baslik:'Evrensel kayıt defteri — FI ve CO birlikte',
        tutar:'FI ve CO satırlarının tamamı; hesap, maliyet yeri, kâr merkezi, ' +
              'iç sipariş **aynı satırda**.',
        olusturan:'Her FI/CO belgesi',
        guncelleyen:'Belge kaydı; CO içi işlemler de buraya yazar',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{CSKB}} ile `RACCT`, {{CSKS}} ile `KOSTL`, {{AUFK}} ile `AUFNR` üzerinden.',
        s4:'**S/4HANA’nın merkezi tablosu.** {{COEP}} dâhil birçok tablonun yerini aldı.',
        alanlar:[
          { ad:'RACCT', aciklama:'Hesap / masraf türü — **aynı numara**' },
          { ad:'KOSTL', aciklama:'{{maliyet-yeri}} — CO boyutu' },
          { ad:'AUFNR', aciklama:'{{ic-siparis}}' },
          { ad:'PRCTR', aciklama:'{{kar-merkezi}}' },
          { ad:'RFAREA', aciklama:'Fonksiyonel alan — CO→FI tetikleyicilerinden' },
          { ad:'HSL', aciklama:'Yerel para birimi tutarı' },
        ] },

      { ad:'CSKB', baslik:'Masraf türü ana verisi',
        tutar:'G/L hesabının CO karşılığı ve **kategorisi**.',
        olusturan:'{{KA01}}',
        guncelleyen:'{{KA02}}',
        anahtar:'KOKRS + KSTAR + DATBI',
        iliskiler:'`KSTAR` = G/L hesap numarası.',
        s4:'S/4HANA’da masraf türü **hesabın özelliği** oldu; ' +
           'CSKB uyumluluk için doldurulmaya devam eder.',
        alanlar:[
          { ad:'KSTAR', aciklama:'Masraf türü = **G/L hesap numarası**', tip:'pk' },
          { ad:'KATYP', aciklama:'**Kategori:** 1 birincil · 11 gelir · 42 devir · 43 hizmet' },
        ] },

      { ad:'CSKA', baslik:'Masraf türü — hesap planı seviyesi',
        tutar:'Masraf türünün hesap planı bazlı tanımı.',
        olusturan:'{{KA01}}',
        anahtar:'KTOPL + KSTAR',
        s4:'Duruyor.' },

      { ad:'COEP', baslik:'CO gerçek kalemleri (ECC)',
        tutar:'ECC’de CO tarafındaki kalemler — FI’dan **ayrı** tablo.',
        olusturan:'FI kaydı veya CO işlemi',
        anahtar:'KOKRS + BELNR + BUZEI',
        iliskiler:'ECC’de {{BSEG}} ile mutabakat gerektirirdi.',
        s4:'**{{ACDOCA}} ile birleşti.** {{uyumluluk-view}} olarak okunabilir.',
        alanlar:[
          { ad:'OBJNR', aciklama:'CO nesnesi — kodlanmış (KS* maliyet yeri, OR* sipariş)' },
          { ad:'KSTAR', aciklama:'Masraf türü', tip:'fk' },
          { ad:'WOGBTR', aciklama:'Nesne para birimi tutarı' },
        ] },

      { ad:'TKA01', baslik:'Kontrol alanı tanımı',
        tutar:'Kontrol alanının para birimi, hesap planı ve mali yıl varyantı.',
        olusturan:'{{OKKP}}',
        anahtar:'KOKRS',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KOKRS', aciklama:'{{kontrol-alani}}', tip:'pk' },
          { ad:'KTOPL', aciklama:'Hesap planı — **şirket kodlarıyla aynı olmalı**', tip:'fk' },
          { ad:'WAERS', aciklama:'Kontrol alanı para birimi' },
        ] },

      { ad:'AUFK', baslik:'İç sipariş ana verisi',
        tutar:'Sipariş tanımı, tipi, durumu, yerleşim kuralı.',
        olusturan:'{{KO01}}',
        anahtar:'AUFNR',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'AUFNR', aciklama:'Sipariş numarası', tip:'pk' },
          { ad:'AUART', aciklama:'Sipariş tipi' },
          { ad:'PHAS0/1/2/3', aciklama:'Durum: açıldı · serbest · teknik kapalı · kapalı' },
        ] },

      { ad:'CSKS', baslik:'Maliyet yeri ana verisi',
        tutar:'Maliyet yerleri ve kâr merkezi ataması.',
        olusturan:'{{KS01}}',
        s4:'Değişmedi. Ayrıntısı {{cost-center}} konusundadır.' },
    ],

    er:{
      type:'er',
      baslik:'FI–CO mimarisi: ECC ayrı, S/4HANA tek',
      varliklar:[
        { ad:'TKA01', rol:'Özelleştirme', aciklama:'Kontrol alanı',
          alanlar:[{ ad:'KOKRS', tip:'pk' }, { ad:'KTOPL', tip:'fk' }] },
        { ad:'CSKB', rol:'CO ana veri', aciklama:'Masraf türü',
          alanlar:[{ ad:'KOKRS', tip:'fk' }, { ad:'KSTAR', tip:'pk' }, { ad:'KATYP' }] },
        { ad:'SKB1', rol:'FI ana veri', aciklama:'G/L hesabı',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }] },
        { ad:'CSKS', rol:'CO ana veri', aciklama:'Maliyet yeri',
          alanlar:[{ ad:'KOSTL', tip:'pk' }, { ad:'PRCTR', tip:'fk' }] },
        { ad:'AUFK', rol:'CO ana veri', aciklama:'İç sipariş',
          alanlar:[{ ad:'AUFNR', tip:'pk' }, { ad:'AUART' }] },
        { ad:'ACDOCA', rol:'Evrensel', hub:true, aciklama:'**FI + CO tek satırda**',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'RACCT', tip:'fk' }, { ad:'KOSTL', tip:'fk' }, { ad:'AUFNR', tip:'fk' }, { ad:'PRCTR' }] },
        { ad:'COEP', rol:'ECC', aciklama:'CO kalemleri (eski)',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'OBJNR' }, { ad:'KSTAR', tip:'fk' }] },
        { ad:'BSEG', rol:'FI', aciklama:'FI kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT' }, { ad:'KOSTL' }] },
      ],
      iliskiler:[
        { from:'TKA01', to:'CSKB', alanlar:'KOKRS', not:'kontrol alanı' },
        { from:'SKB1', to:'CSKB', alanlar:'SAKNR → KSTAR', not:'**aynı numara**' },
        { from:'CSKB', to:'ACDOCA', alanlar:'KSTAR → RACCT', not:'masraf türü köprüsü' },
        { from:'CSKS', to:'ACDOCA', alanlar:'KOSTL', not:'maliyet yeri' },
        { from:'AUFK', to:'ACDOCA', alanlar:'AUFNR', not:'iç sipariş' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR', not:'FI kalemi' },
        { from:'ACDOCA', to:'COEP', alanlar:'BELNR', not:'**ECC’de ayrı, S/4’te birleşik**' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'CO entegrasyonunda kullanıcı ekranı **yoktur** — entegrasyon arka planda çalışır. ' +
      'Danışman için üç yapılandırma ekranı ve bir teşhis ekranı önemlidir.',

    ekranlar:[
      { ad:'{{OKKP}} — kontrol alanı ayarları',
        aciklama:'CO organizasyonunun kurulduğu ekran.',
        alanlar:[
          { ad:'Kontrol alanı', zorunlu:true },
          { ad:'Hesap planı', zorunlu:true, aciklama:'**Bağlı şirket kodlarıyla aynı olmalıdır.**' },
          { ad:'Mali yıl varyantı', zorunlu:true, aciklama:'Şirket kodlarıyla **aynı** olmalıdır.' },
          { ad:'Şirket kodu ataması', zorunlu:true, aciklama:'Birden çok olabilir — ' +
                   'şirketler arası dağıtımı mümkün kılar.' },
          { ad:'Etkin bileşenler', zorunlu:true, aciklama:'Maliyet yeri, iç sipariş, CO-PA…' },
        ],
        ipucu:'**Bu ekrandaki kararlar geri dönüşsüzdür.** ' +
              'Bir kontrol alanına birden çok şirket kodu bağlamak veya bağlamamak, ' +
              'kurulumun ilk haftasında verilir ve sonradan değiştirilemez.\n\n' +
              'Holding yapılarında tek kontrol alanı, şirketler arası maliyet dağıtımını ' +
              'mümkün kılar — ama tüm şirketlerin **aynı hesap planını** kullanmasını şart koşar.' },

      { ad:'{{KANK}} — CO numara aralıkları',
        aciklama:'Sessiz kırılma noktası.',
        alanlar:[
          { ad:'Kontrol alanı', zorunlu:true },
          { ad:'İş işlemi grubu', zorunlu:true, aciklama:'**COIN** gerçek kayıt · **RKU1** yeniden kayıt · ' +
                   '**RKIU** devir · **KOAO** yerleşim.' },
          { ad:'Numara aralığı', zorunlu:true },
        ],
        ipucu:'**Yılbaşı kontrol listesine FI aralıklarının hemen yanına koy.** ' +
              'CO aralığı eksikse CO kaydı başarısız olur ve ' +
              'aynı LUW’da olduğu için **FI kaydı da olmaz**.\n\n' +
              'Kullanıcı {{FB50}} ekranında hata alır, sebep CO’dadır ve ' +
              'ekip saatlerce FI tarafında arar.' },

      { ad:'{{FAGLCOFIRTINT}} — gerçek zamanlı entegrasyon varyantı',
        aciklama:'Hangi CO aktarımının FI belgesi üreteceğini belirler.',
        alanlar:[
          { ad:'Varyant', zorunlu:true },
          { ad:'Şirket kodu değişimi', zorunlu:false, aciklama:'**Fiilen zorunlu** — ' +
                   'iki tüzel kişilik arası aktarım kaydedilmelidir.' },
          { ad:'{{kar-merkezi}} değişimi', zorunlu:false, aciklama:'Kâr merkezi bilançosu ' +
                   'çıkarılıyorsa **mutlaka seçilmelidir**.' },
          { ad:'Bölüm değişimi', zorunlu:false },
          { ad:'Fonksiyonel alan değişimi', zorunlu:false, aciklama:'Fonksiyon esaslı ' +
                   'gelir tablosu sunuluyorsa seçilmelidir.' },
        ],
        ipucu:'**Kâr merkezi kutusunu unutmak** en sık yapılan yapılandırma hatasıdır. ' +
              'Sonucu şudur: CO’da kâr merkezleri arası dağıtım yapılır, ' +
              'FI’da hiçbir şey değişmez ve **kâr merkezi bilançosu tutmaz**.\n\n' +
              'Fark ay sonunda aranır ve sebebi CO tarafında değil ' +
              'bu varyantta olduğu için bulunması zordur.' },

      { ad:'{{KA03}} — masraf türü teşhisi',
        aciklama:'"CO nesnesi gerekli" hatalarının teşhis noktası.',
        alanlar:[
          { ad:'Masraf türü (= hesap)', zorunlu:true },
          { ad:'Kontrol alanı', zorunlu:true },
          { ad:'Kategori', zorunlu:false, aciklama:'1 / 11 / 42 / 43' },
          { ad:'Geçerlilik aralığı', zorunlu:false, aciklama:'Tarih aralığında değilse ' +
                   'masraf türü "yok" gibi davranır.' },
        ],
        ipucu:'İki yönlü teşhis aracıdır:\n\n' +
              '**a)** *"CO nesnesi gerekli"* hatası alıyorsan → masraf türü **vardır**, ' +
              'CO nesnesi girmen gerekir.\n\n' +
              '**b)** Bir gider hesabı CO raporlarında **hiç görünmüyorsa** → ' +
              'masraf türü **yoktur**, açılmalıdır.' },
    ],

    zorunlu:['Kontrol alanı','Hesap planı uyumu','Mali yıl varyantı uyumu','CO numara aralıkları','Masraf türü'],
    opsiyonel:['{{FAGLCOFIRTINT}} varyantı','Etkin CO bileşenleri','{{OKB9}} varsayılanları'],

    hatalar:[
      { mesaj:'Account ... requires an assignment to a CO object', sebep:'Masraf türü var ama CO nesnesi girilmemiş ve {{OKB9}} yok.', cozum:'Kayıtta CO nesnesi gir veya {{OKB9}} tanımla. **En sık CO entegrasyon hatasıdır.**' },
      { mesaj:'Number range for CO business transaction COIN is missing', sebep:'CO numara aralığı tanımsız.', cozum:'{{KANK}} ile tanımla. **Bu eksikse FI kaydı da yapılamaz** — hata FI ekranında görünür ama sebep CO’dadır.' },
      { mesaj:'Chart of accounts of company code differs from controlling area', sebep:'Şirket kodu farklı hesap planı kullanıyor.', cozum:'Hesap planlarını hizala veya ayrı kontrol alanı kur. **Sonradan değiştirmesi pratikte imkânsızdır.**' },
      { mesaj:'Cost element ... does not exist', sebep:'G/L hesabının masraf türü tanımlanmamış.', cozum:'{{KA01}} ile tanımla (S/4HANA: {{FS00}} içinde hesap tipini "birincil masraf" yap).' },
      { mesaj:'CO dağıtımı yapıldı ama FI belgesi oluşmadı', sebep:'{{FAGLCOFIRTINT}} varyantında değişen boyut seçili değil.', cozum:'Kâr merkezi bilançosu çıkarılıyorsa **kâr merkezi kutusu işaretli olmalıdır**.' },
      { mesaj:'FI–CO farkı var (ECC)', sebep:'Aktarım hatası veya yapılandırma eksikliği.', cozum:'Mutabakat raporunu çalıştır. **S/4HANA’da bu sorun yapısal olarak oluşamaz.**' },
    ],

    ipuclari:[
      '**Yılbaşında CO numara aralıklarını FI aralıklarıyla birlikte aç** — ' +
      'eksikse gider kayıtları durur ve sebep FI’da aranır.',
      '{{FAGLCOFIRTINT}} varyantında **kâr merkezi kutusunu** kontrol et; ' +
      'kâr merkezi bilançosu çıkarılıyorsa zorunludur.',
      'Bilanço hesaplarına masraf türü **açma** — CO nesnesi sorulması anlamsızdır ' +
      've kayıtları gereksiz zorlaştırır.',
      '"CO nesnesi gerekli" hatasında {{KA03}} ile masraf türünü ve ' +
      '**geçerlilik aralığını** kontrol et.',
      'Yıl sonu kapanışına **"açık iç sipariş var mı?"** maddesini ekle; ' +
      'yerleşmemiş maliyet ne varlıkta ne maliyet yerinde görünür.',
      'Kontrol alanı ↔ şirket kodu kararını **kurulumun ilk haftasında** ver; ' +
      'sonradan değiştirilemez.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ACDOCA', ne:'FI ve CO satırları **birlikte**; `RACCT`, `KOSTL`, `AUFNR`, `PRCTR`' },
      { tablo:'BSEG', ne:'FI kalemleri' },
      { tablo:'BKPF', ne:'Belge başlığı' },
      { tablo:'COEP', ne:'ECC’de CO kalemleri — S/4’te {{ACDOCA}}’ya taşındı' },
      { tablo:'CSKB', ne:'Masraf türü ana verisi (okunur)' },
      { tablo:'AUFK', ne:'İç sipariş ana verisi' },
    ],

    commit:
      'FI ve CO kaydı **aynı LUW’da** yazılır. Bu, entegrasyonun teknik temelidir ve ' +
      'iki önemli sonucu vardır:\n\n' +
      '**1. Tutarlılık garantisi.** FI kaydı olup CO kaydı olmayan bir durum ' +
      '(veya tersi) oluşamaz.\n\n' +
      '**2. Karşılıklı bağımlılık.** CO tarafındaki bir sorun **FI kaydını da durdurur**. ' +
      'En tipik örnek: {{KANK}} numara aralığı eksikse gider kaydı hiç yapılamaz.\n\n' +
      'ECC’de bu ilke geçerliydi ama **iki ayrı tabloya** yazıldığı için ' +
      'teorik tutarsızlık mümkündü (güncelleme hataları, aktarım sorunları) ve ' +
      'bu yüzden mutabakat raporları vardı.\n\n' +
      'S/4HANA’da **tek satır** yazıldığı için tutarsızlık ' +
      '**yapısal olarak imkânsızdır** — mutabakat kavramı ortadan kalkmıştır.',

    belgeNo:
      'ECC’de FI ve CO **ayrı belge numaraları** alırdı: ' +
      'FI {{FBN1}} aralığından, CO {{KANK}} aralığından. ' +
      'Aynı olayın iki numarası vardı ve eşleştirme `AWKEY` benzeri alanlarla yapılırdı.\n\n' +
      'S/4HANA’da FI kaynaklı kayıtlar tek belge numarası kullanır.\n\n' +
      '**Ama CO içi işlemler** ({{KB11N}}, {{KSV5}}, {{KO88}}) hâlâ kendi ' +
      'CO belge numaralarını alır — çünkü FI karşılıkları yoktur ' +
      '(veya koşullu olarak vardır). ' +
      'Bu yüzden {{KANK}} aralıkları S/4HANA’da da **gereklidir**.',

    postingLogic:
      '**FI → CO yönü:**\n' +
      '1. Hesabın masraf türü var mı? Yoksa CO’ya yansımaz.\n' +
      '2. CO nesnesi girilmiş mi? Yoksa {{OKB9}} varsayılanı aranır.\n' +
      '3. Bulunamazsa → *"requires an assignment to a CO object"* → **belge kaydedilemez**.\n' +
      '4. CO nesnesinden kâr merkezi türetilir.\n' +
      '5. {{ACDOCA}}’ya tek satır yazılır (S/4) veya {{BSEG}}+{{COEP}} (ECC).\n\n' +
      '**CO → FI yönü:**\n' +
      '1. CO işlemi çalışır (dağıtım, devir, yerleşim, yeniden kayıt).\n' +
      '2. Kaynak ve hedef nesnelerin **boyutları karşılaştırılır**.\n' +
      '3. {{FAGLCOFIRTINT}} varyantındaki tetikleyici boyutlardan biri değiştiyse ' +
      '→ **FI belgesi üretilir**.\n' +
      '4. Değişmediyse yalnızca CO kaydı oluşur.\n\n' +
      'İkinci yöndeki 3. adım, konunun **kavramsal merkezidir**: ' +
      'FI yalnızca **kendi raporladığı bir boyut** değiştiğinde devreye girer.',

    belgeTuru:
      'CO→FI belgeleri için ayrı bir belge türü tanımlanır ' +
      '({{FAGLCOFIRTINT}} varyantında belirtilir) — genelde `AB` veya özel bir tür.\n\n' +
      'Ayrı tür kullanmak **iyi bir pratiktir**: raporda ' +
      '"bu belge CO’dan mı geldi?" sorusu belge türü filtresiyle cevaplanır.',

    numberRange:
      '**İki ayrı aralık ailesi vardır ve ikisi de yılbaşında açılmalıdır:**\n\n' +
      '**FI:** {{FBN1}} — belge türü bazında.\n' +
      '**CO:** {{KANK}} — iş işlemi bazında (COIN, RKU1, RKIU, KOAO).\n\n' +
      'CO aralığı eksikse **FI kaydı da başarısız olur** çünkü ikisi aynı LUW’dadır.\n\n' +
      'Bu, yılbaşında sık yaşanan bir kesintidir: FI aralıkları özenle açılır, ' +
      'CO unutulur ve 1 Ocak sabahı gider kayıtları durur.',

    accountDetermination:
      'CO entegrasyonunun kendi hesap belirlemesi sınırlıdır ama üç yerde devreye girer:\n\n' +
      '**1. CO→FI belgeleri** için hesap belirleme ({{FAGLCOFIRTINT}} içinde).\n' +
      '**2. Devir masraf türleri** (kategori 42) — CO içi, FI hesabı yok.\n' +
      '**3. {{ic-siparis}} yerleşimi** — hedef türüne göre farklı hesaplar ' +
      '(duran varlık, maliyet yeri, G/L).\n\n' +
      'S/4HANA’da ikincil masraf türleri **G/L hesabı olarak da açıldığı için** ' +
      'bu ayrım sadeleşti.',

    tur:
      '**Özelleştirme:** {{kontrol-alani}} ({{OKKP}}, {{TKA01}}), CO numara aralıkları ({{KANK}}), ' +
      '{{FAGLCOFIRTINT}} varyantı, dağıtım/devir döngüleri, sipariş tipleri.\n\n' +
      '**Ana veri:** masraf türleri ({{CSKB}}), maliyet yerleri ({{CSKS}}), ' +
      'iç siparişler ({{AUFK}}), faaliyet türleri.\n\n' +
      '**Hareket verisi:** {{ACDOCA}} satırları, CO belgeleri.',

    transport:
      'Kontrol alanı ayarları, numara aralıkları ve entegrasyon varyantı taşınır. ' +
      '**Ama üç tuzak vardır:**\n\n' +
      '**1.** Masraf türleri ve maliyet yerleri **ana veridir, taşınmaz** — ' +
      'hedef sistemde ayrıca oluşturulmalıdır.\n\n' +
      '**2.** CO numara aralıkları çoğu kurulumda **taşınmaz**; ' +
      'canlıda elle tanımlanmalıdır. Bu, geçişte gider kayıtlarının ' +
      'durmasının en sık sebebidir.\n\n' +
      '**3.** Kontrol alanı ↔ şirket kodu ataması, hedef sistemdeki ' +
      'şirket kodu yapısına bağlıdır ve **hesap planı uyumu** doğrulanmalıdır.\n\n' +
      '**Geçiş kontrolü:** canlıda bir test gider kaydı yap; ' +
      'CO satırının oluştuğunu {{KSB1}} ile doğrula.',

    img:[
      { yol:'SPRO → Kontrolörlük → Genel Kontrolörlük → Organizasyon → Kontrol Alanını Koru', not:'{{OKKP}} → {{TKA01}}' },
      { yol:'SPRO → Kontrolörlük → Genel Kontrolörlük → Organizasyon → Numara Aralıklarını Koru', not:'{{KANK}} — **eksikse FI de durur**' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe Muhasebesi → İş İşlemleri → Kontrolörlük ile Gerçek Zamanlı Entegrasyon', not:'{{FAGLCOFIRTINT}}' },
      { yol:'SPRO → Kontrolörlük → Maliyet Yeri Muhasebesi → Ana Veri → Masraf Türleri', not:'{{KA01}} · S/4HANA’da {{FS00}} içinde' },
    ],

    ekstra:[
      { ic:'🔄', baslik:'CO → FI: hangi boyut değişirse FI devreye girer?', metin:
        'CO içi bir aktarım normalde FI belgesi **üretmez** — ' +
        'çünkü şirketin toplam gideri değişmez.\n\n' +
        'Ama **dört boyuttan** biri değişiyorsa üretir:\n\n' +
        '**1. Şirket kodu.** İki tüzel kişilik arası aktarım. ' +
        'FI’da karşılıklı borç/alacak **zorunludur** — kapatılamaz, ' +
        'çünkü iki ayrı şirketin mali tablosu etkilenir.\n\n' +
        '**2. {{kar-merkezi}}.** Kâr merkezi bazlı bilanço çıkarılıyorsa ({{new-gl}}) ' +
        'FI’ın da bilmesi gerekir.\n\n' +
        '**3. Bölüm (business area).** FI’da raporlanan bir boyut.\n\n' +
        '**4. Fonksiyonel alan.** Gelir tablosunun fonksiyon esaslı sunumunda ' +
        'kullanılır (üretim maliyeti / pazarlama / yönetim ayrımı).\n\n' +
        '**Ortak mantık:** dördü de **FI’ın raporladığı** boyutlardır. ' +
        'CO’da değişip FI’da değişmemeleri iki farklı gerçek yaratırdı.\n\n' +
        'Bunların dışındaki her CO hareketi FI’ı etkilemez: ' +
        'maliyet yeri değişimi (aynı kâr merkezinde), faaliyet aktarımı, ' +
        'iç sipariş yerleşimi (maliyet yerine).\n\n' +
        '**Teşhis sorusu:** "bu CO işlemi FI belgesi üretti mi?" → ' +
        '"hangi boyut değişti?"' },

      { ic:'🏛️', baslik:'Bir kontrol alanı, birden çok şirket kodu: ne kazandırır, ne şart koşar?', metin:
        'Kontrol alanına **birden çok şirket kodu** bağlanabilir ve ' +
        'bu, holding yapılarında değerli bir imkândır.\n\n' +
        '**Kazandırdığı:** şirketler arası maliyet dağıtımı. ' +
        'Merkezi bir Bilgi İşlem birimi, grup şirketlerine hizmet veriyorsa ' +
        'maliyeti tek bir CO işlemiyle dağıtılabilir.\n\n' +
        '**Şart koştuğu — ve bu ağırdır:**\n\n' +
        '**a) Aynı hesap planı.** Tüm bağlı şirket kodları aynı hesap planını ' +
        'kullanmalıdır. Farklı ülkelerde farklı yasal hesap planı gerekiyorsa ' +
        'bu şart sağlanamaz.\n\n' +
        '**b) Aynı mali yıl varyantı.** Dönem eşleşmesi için zorunludur.\n\n' +
        '**c) Şirketler arası aktarımlar FI belgesi üretir** — ' +
        've bunlar grup içi borç/alacak hesaplarında birikir, ' +
        'konsolidasyonda elenmesi gerekir.\n\n' +
        '**Karar zamanlaması kritiktir:** bu, kurulumun **ilk haftasında** verilir. ' +
        'Sonradan kontrol alanı birleştirmek veya ayırmak, ' +
        'tüm CO geçmişinin taşınmasını gerektirir ve pratikte yapılmaz.\n\n' +
        'Alternatif: her şirket koduna ayrı kontrol alanı. ' +
        'Basittir ama şirketler arası dağıtım imkânını **tamamen** ortadan kaldırır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'S/4HANA’da FI–CO mutabakatı bir kavram olarak yoktur', metin:
        'ECC’de ay sonunun ciddi bir bölümü FI ile CO arasındaki farkları aramaya giderdi. ' +
        'Sebep basitti: aynı olay **iki tabloya** yazılıyordu ({{BSEG}} ve {{COEP}}) ve ' +
        'teorik olarak tutarsız olabiliyorlardı.\n\n' +
        'S/4HANA’da **tek satır** vardır. Hesap ve maliyet yeri aynı {{ACDOCA}} satırında durur. ' +
        'Tutarsızlık **yapısal olarak imkânsızdır**.\n\n' +
        'Pratik sonuçları:\n\n' +
        '• FI–CO mutabakat raporları **gereksizdir** — geçişte kaldırılmalıdır\n' +
        '• Bu iş için ayrılan ay sonu süresi **serbest kalır**\n' +
        '• Özel geliştirilmiş mutabakat programları **çalışmaz hâle gelir** ' +
        '(COEP artık uyumluluk görünümüdür)\n\n' +
        'Geçiş projelerinde bu programların **envanteri çıkarılmalı** ve ' +
        'kaldırılmalıdır; aksi hâlde anlamsız farklar raporlayıp ' +
        'gereksiz araştırma yaratırlar.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'CO entegrasyonu, **S/4HANA’nın FI tarafında en çok değişen alanıdır**. ' +
      '{{ACDOCA}} ile FI ve CO satırları birleşti, ' +
      'masraf türü G/L hesabının özelliği oldu, ' +
      'FI–CO mutabakatı **kavram olarak ortadan kalktı**.',

    eccFarklari:[
      { konu:'Kalem verisi', ecc:'{{BSEG}} (FI) + {{COEP}} (CO) — **ayrı**', s4:'**{{ACDOCA}}** — tek satır' },
      { konu:'Masraf türü', ecc:'Ayrı ana veri ({{KA01}})', s4:'**G/L hesabının özelliği** ({{FS00}})' },
      { konu:'İkincil masraf türü', ecc:'FI hesap planında **yok**', s4:'**G/L hesabı olarak açılır**' },
      { konu:'FI–CO mutabakatı', ecc:'Ay sonu işi', s4:'**Kavram olarak yok**' },
      { konu:'CO→FI gerçek zamanlı', ecc:'{{FAGLCOFIRTINT}} ({{new-gl}} ile)', s4:'Aynı, ama iç mimari birleşik' },
      { konu:'CO-PA', ecc:'Ayrı tablolar (CE1xxxx)', s4:'**Account-based** — {{ACDOCA}}’da' },
      { konu:'Kâr merkezi', ecc:'Ayrı defter (EC-PCA)', s4:'{{ACDOCA}} boyutu' },
    ],

    universalJournal:
      '{{ACDOCA}}, CO entegrasyonu açısından şu soruyu çözdü: ' +
      '*"aynı olay neden iki tabloda iki kez duruyor?"*\n\n' +
      'ECC’de bir gider kaydı {{BSEG}}’e (hesap boyutu) ve {{COEP}}’e (CO boyutu) ' +
      'ayrı ayrı yazılırdı. İkisi aynı LUW’da yazılsa bile ' +
      'farklı tablolar olduğu için mutabakat gerektiriyordu.\n\n' +
      'S/4HANA’da **tek satır** vardır: `RACCT` (hesap) ve `KOSTL` (maliyet yeri) ' +
      'aynı satırda durur. Fark oluşması **fiziksel olarak mümkün değildir**.\n\n' +
      'İkinci büyük değişiklik **masraf türüdür**: artık ayrı bir ana veri değil, ' +
      'G/L hesabının bir özelliğidir. Hesap açarken "birincil masraf türü" seçilir ve ' +
      'iş biter. {{KA01}} çalışmaya devam eder ama zorunlu değildir.\n\n' +
      'Üçüncüsü **ikincil masraf türleridir**: ECC’de FI hesap planında yoktular ' +
      '(yalnızca CO içindeydiler). S/4HANA’da G/L hesabı olarak da açılırlar — ' +
      'bu, devir ve yerleşim işlemlerinin FI tarafında da izlenebilmesini sağlar.',

    kalkanTcodes:[
      { eski:'{{KA01}} / {{KA02}}', yeni:'{{FS00}}', not:'Masraf türü hesabın özelliği; {{KA01}} zorunlu değil' },
      { eski:'FI–CO mutabakat raporları', yeni:'—', not:'**Gereksiz oldu, kaldırılmalı**' },
      { eski:'EC-PCA kâr merkezi defteri', yeni:'{{ACDOCA}} boyutu', not:'Ayrı defter kalktı' },
      { eski:'—', yeni:'—', not:'{{OKKP}}, {{KANK}}, {{KSB1}}, {{KO88}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Manage G/L Account Master Data', aciklama:'{{FS00}} yerine; masraf türü ayarı burada.' },
      { ad:'Cost Centers — Actual Line Items', aciklama:'{{KSB1}} yerine.' },
      { ad:'Manage Internal Orders', aciklama:'{{KO01}}/{{KO02}} yerine.' },
      { ad:'Run Settlement', aciklama:'{{KO88}} yerine; yerleşim çalıştırma.' },
      { ad:'Profitability Analysis', aciklama:'Account-based CO-PA — FI ile fark oluşamaz.' },
      { ad:'Display Line Items in General Ledger', aciklama:'FI ve CO boyutları birlikte filtrelenebilir.' },
    ],

    compatibilityViews:[
      '{{COEP}} — {{ACDOCA}}’dan türetilen görünüm; eski programlar çalışır ama **yavaştır**.',
      '{{BSEG}} — aynı şekilde uyumluluk görünümü.',
      '{{CSKB}}, {{CSKA}}, {{CSKS}}, {{AUFK}}, {{TKA01}} — **fiziksel tablo olarak duruyor**.',
      'Yeni geliştirmeler {{ACDOCA}}’yı **doğrudan** okumalıdır.',
    ],

    performans:
      'En büyük kazanç **ay sonu iş yükünün azalmasıdır**: ' +
      'FI–CO mutabakatı, fark araştırması ve düzeltme kayıtları tamamen ortadan kalktı.\n\n' +
      'Raporlama tarafında da kazanç somuttur: ECC’de ' +
      '"hangi maliyet yerinde hangi satıcıdan ne kadar alındı?" sorusu ' +
      '{{BSEG}} ve {{COEP}} birleştirmesi gerektirirdi. ' +
      'S/4HANA’da **tek tablo, tek sorgu**.\n\n' +
      'Account-based CO-PA ile kârlılık analizi de FI’dan türediği için ' +
      'kârlılık raporu ile gelir tablosu arasında **fark oluşamaz**.',

    bestPractices:[
      'Geçişte **FI–CO mutabakat programlarının envanterini çıkar ve kaldır**; ' +
      'anlamsız farklar raporlayıp gereksiz araştırma yaratırlar.',
      'Masraf türlerini G/L hesabı özelliğine dönüştür — ' +
      'numaralar zaten aynı olduğu için dönüşüm mekaniktir.',
      'İkincil masraf türlerinin hesap planına eklenmesini planla.',
      'CO numara aralıklarını ({{KANK}}) geçiş kontrol listesine ekle — ' +
      '**taşınmaz**, canlıda elle tanımlanmalıdır.',
      'Account-based CO-PA’ya geçişi değerlendir; FI ile kârlılık mutabakatı da kalkar.',
      'Yeni geliştirmelerde {{COEP}} yerine **{{ACDOCA}}** oku; ' +
      'uyumluluk görünümü yavaştır.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'1 Ocak sabahı gider kayıtları durdu: hata FI’da, sebep CO’da',
    hikaye:
      '**Anadolu Holding**’de yılbaşı hazırlıkları özenle yapıldı: ' +
      'FI numara aralıkları açıldı, dönemler {{OB52}} ile ayarlandı, ' +
      'bakiye devri {{FAGLGVTR}} ile her defter için çalıştırıldı.\n\n' +
      '**2 Ocak sabahı** muhasebe ekibi çalışmaya başlıyor ve ilk fatura kaydında ' +
      'hata alıyor. İkinci fatura, üçüncü fatura — **hepsi aynı hata**.\n\n' +
      'Gider kayıtlarının tamamı durmuş. Ama tahsilat kayıtları, ' +
      'banka kayıtları ve satıcı ödemeleri **sorunsuz çalışıyor**.\n\n' +
      'Bu senaryo, FI ile CO’nun aynı LUW’da olmasının pratik sonucunu ve ' +
      'hatanın neden yanlış yerde arandığını gösteriyor.',
    veriler:[
      { k:'Şirket kodu / Kontrol alanı', v:'1000 / 1000' },
      { k:'Tarih', v:'02.01.2028' },
      { k:'Çalışan işlemler', v:'Tahsilat ({{F-28}}), ödeme ({{F-53}}), banka' },
      { k:'**Duran işlemler**', v:'**Tüm gider kayıtları** ({{FB50}}, {{FB60}}, {{MIRO}})' },
      { k:'Hata mesajı', v:'"Number range for CO business transaction COIN is missing"' },
    ],

    adimlar:[
      { baslik:'Hata deseni incelenir — hangi işlemler çalışıyor?', tcode:'FB60',
        aciklama:'Neyin çalışıp neyin durduğu ayrıştırılıyor.',
        girdi:[
          { alan:'{{FB60}} gider faturası', deger:'**Hata** ✕' },
          { alan:'{{FB50}} G/L gider kaydı', deger:'**Hata** ✕' },
          { alan:'{{F-28}} müşteri tahsilatı', deger:'Çalışıyor ✓' },
          { alan:'{{F-53}} satıcı ödemesi', deger:'Çalışıyor ✓' },
          { alan:'{{FB50}} banka virman (gider hesabı yok)', deger:'Çalışıyor ✓' },
        ],
        not:'**Desen çok net:** yalnızca **gider hesabı içeren** kayıtlar duruyor.\n\n' +
             'Tahsilat, ödeme ve virman kayıtları bilanço hesapları kullanıyor ve ' +
             'sorunsuz çalışıyor.\n\n' +
             'Bu desen tek bir şeye işaret ediyor: sorun **gider hesaplarına özgü** bir şeyde. ' +
             'Gider hesaplarını diğerlerinden ayıran nedir? **Masraf türü** — ' +
             'yani CO entegrasyonu.' },

      { baslik:'Hata mesajı okunur — sebep CO’da', tcode:'FB60',
        aciklama:'Mesajın tam metni inceleniyor.',
        girdi:[
          { alan:'Mesaj', deger:'"Number range for CO business transaction **COIN** is missing"' },
          { alan:'COIN nedir?', deger:'CO’nun **gerçek FI→CO kaydı** iş işlemi' },
          { alan:'Nerede tanımlanır?', deger:'{{KANK}} — CO numara aralıkları' },
          { alan:'Ekip nerede arıyordu?', deger:'{{FBN1}} FI numara aralıklarında' },
        ],
        not:'**Hata FI ekranında görünüyor ama sebep CO’da.**\n\n' +
             'Ekip iki saat boyunca {{FBN1}}’de FI aralıklarını kontrol etti — ' +
             'hepsi doğru açılmıştı. Çünkü sorun orada değildi.\n\n' +
             'FI ve CO **aynı LUW’da** yazıldığı için CO kaydı başarısız olunca ' +
             'FI kaydı da başarısız oluyor ve kullanıcı hatayı FI ekranında görüyor.' },

      { baslik:'CO numara aralıkları kontrol edilir', tcode:'KANK',
        aciklama:'Kök sebep doğrulanıyor.',
        girdi:[
          { alan:'Kontrol alanı', deger:'1000' },
          { alan:'COIN (gerçek kayıt)', deger:'**2027 aralığı var · 2028 YOK** ✕' },
          { alan:'RKU1 (yeniden kayıt)', deger:'2028 yok ✕' },
          { alan:'RKIU (devir)', deger:'2028 yok ✕' },
          { alan:'KOAO (yerleşim)', deger:'2028 yok ✕' },
        ],
        not:'**Kök sebep bulundu.** CO numara aralıkları yıl bazlı tanımlanmış ve ' +
             '2028 yılı için **hiçbiri açılmamış**.\n\n' +
             'Yılbaşı kontrol listesinde "numara aralıklarını aç" maddesi vardı — ' +
             'ama yalnızca **FI aralıkları** kastediliyordu. ' +
             'CO aralıkları listede **hiç yoktu**.\n\n' +
             'Sonuç: yıl boyunca sorunsuz çalışan sistem, 1 Ocak’ta durdu.' },

      { baslik:'Aralıklar açılır', tcode:'KANK',
        aciklama:'2028 yılı için tüm CO iş işlemi aralıkları tanımlanıyor.',
        girdi:[
          { alan:'COIN', deger:'2028 · 0100000000–0199999999' },
          { alan:'RKU1', deger:'2028 · 0200000000–0299999999' },
          { alan:'RKIU', deger:'2028 · 0300000000–0399999999' },
          { alan:'KOAO', deger:'2028 · 0400000000–0499999999' },
          { alan:'Süre', deger:'**4 dakika**' },
        ],
        not:'Düzeltme dört dakika sürdü. Ama **kesinti üç saatti** ve ' +
             'bunun iki saati hatayı **yanlış yerde aramakla** geçti.\n\n' +
             'Bu, CO entegrasyonunun en tipik operasyonel sorunudur: ' +
             'küçük bir yapılandırma eksiği, yanlış katmanda aranan bir hata ve ' +
             'orantısız bir kesinti.' },

      { baslik:'Test kaydı yapılır ve CO satırı doğrulanır', tcode:'FB60',
        aciklama:'Yalnızca FI kaydının geçmesi yeterli değil — CO satırı da kontrol ediliyor.',
        girdi:[
          { alan:'Test faturası', deger:'V-3001 · 12.000 TL · maliyet yeri 5100' },
          { alan:'FI kaydı', deger:'Belge 1900000012 oluştu ✓' },
          { alan:'CO kontrolü', deger:'{{KSB1}} → maliyet yeri 5100 → **kalem görünüyor** ✓' },
        ],
        fis:{ baslik:'Belge 1900000012 — test kaydı', belgeTuru:'KR', tarih:'02.01.2028',
          satirlar:[
            { hesap:'770', ad:'Genel yönetim gideri — maliyet yeri 5100', borc:10000 },
            { hesap:'191', ad:'İndirilecek KDV', borc:2000 },
            { hesap:'320', ad:'Satıcılar — V-3001', alacak:12000 },
          ], not:'FI belgesi oluştu **ve** {{ACDOCA}}’da `KOSTL` = 5100 alanı doldu.\n\n' +
                 '{{KSB1}} ile maliyet yeri 5100 sorgulandığında kalem görünüyor — ' +
                 'CO tarafının da çalıştığının kanıtı.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'FI ve CO satırları birlikte; `KOSTL` dolu ✓' },
          { tablo:'BKPF', ne:'Belge başlığı' },
        ],
        not:'**Doğrulamanın iki ayağı olmalı:** FI belgesi oluştu mu **ve** ' +
             'CO satırı yazıldı mı?\n\n' +
             'Yalnızca "belge kaydedildi" görmek yetmez — ' +
             'CO tarafı sessizce boş kalabilir (masraf türü eksikse böyle olur).' },

      { baslik:'İkinci sorun ortaya çıkıyor — CO→FI dağıtımı', tcode:'KSV5',
        aciklama:'Ocak ayı sonunda beklenmedik bir durum.',
        girdi:[
          { alan:'Dağıtım', deger:'6100 Bilgi İşlem → 3 maliyet yeri · 480.000 TL' },
          { alan:'CO belgesi', deger:'Oluştu ✓' },
          { alan:'FI belgesi', deger:'**Oluşmadı** ✕' },
          { alan:'Beklenen', deger:'Hedef maliyet yerleri **farklı kâr merkezlerinde**' },
        ],
        not:'Dağıtım CO’da çalıştı ama FI’da **hiçbir şey değişmedi**.\n\n' +
             'Bu şirkette kâr merkezi bazlı bilanço çıkarılıyor ({{new-gl}} + {{belge-bolme}}). ' +
             'Kâr merkezleri arası maliyet aktarımının FI’a yansıması **zorunlu**.\n\n' +
             'Yansımadığı için: CO’da Üretim’in gideri arttı, ' +
             'FI’da kâr merkezi bilançosunda **artmadı**. ' +
             'İki farklı gerçek doğdu.' },

      { baslik:'{{FAGLCOFIRTINT}} varyantı kontrol edilir', tcode:'FAGLCOFIRTINT',
        aciklama:'Gerçek zamanlı entegrasyon ayarları inceleniyor.',
        girdi:[
          { alan:'Şirket kodu değişimi', deger:'İşaretli ✓' },
          { alan:'Bölüm değişimi', deger:'İşaretli ✓' },
          { alan:'Fonksiyonel alan değişimi', deger:'İşaretli ✓' },
          { alan:'**Kâr merkezi değişimi**', deger:'**İşaretsiz** ✕' },
        ],
        not:'**İkinci kök sebep bulundu.** Varyantta kâr merkezi kutusu işaretlenmemiş.\n\n' +
             'Bu ayar, {{new-gl}} kurulumu yapılırken atlanmış. ' +
             'O dönemde kâr merkezi bazlı bilanço henüz kullanılmıyordu ve ' +
             'kutunun işaretlenmemesi sorun yaratmıyordu.\n\n' +
             'Belge bölme sonradan açılınca kâr merkezi bilançosu çıkarılmaya başlandı — ' +
             'ama bu varyant **güncellenmedi**.' },

      { baslik:'Varyant düzeltilir ve dağıtım yeniden çalıştırılır', tcode:'KSV5',
        aciklama:'Kâr merkezi kutusu işaretlenip dağıtım tekrarlanıyor.',
        girdi:[
          { alan:'Varyant', deger:'Kâr merkezi değişimi **işaretlendi**' },
          { alan:'Eski dağıtım', deger:'Ters çevrildi' },
          { alan:'Yeni dağıtım', deger:'Çalıştırıldı · **FI belgesi oluştu** ✓' },
        ],
        fis:{ baslik:'CO→FI belgesi — kâr merkezi aktarımı', belgeTuru:'AB', tarih:'31.01.2028',
          satirlar:[
            { hesap:'770', ad:'Bilgi işlem gideri — KM PC-1000 Üretim', borc:216000 },
            { hesap:'770', ad:'Bilgi işlem gideri — KM PC-2000 Satış', borc:144000 },
            { hesap:'770', ad:'Bilgi işlem gideri — KM PC-5000 İdari', borc:120000 },
            { hesap:'770', ad:'Bilgi işlem gideri — KM PC-9000 Genel', alacak:480000 },
          ], not:'**Aynı hesap** hem borç hem alacak. Toplam gider değişmedi ' +
                 '(net etki sıfır) — yalnızca kâr merkezleri arasında yer değiştirdi.\n\n' +
                 'Artık CO raporu ile kâr merkezi bilançosu **tutuyor**.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'CO→FI satırları; her biri farklı `PRCTR` taşıyor' },
        ],
        not:'Bu belge olmadan kâr merkezi bilançosu ile CO raporu ' +
             'her ay **480.000 TL** ayrışacaktı.' },

      { baslik:'Kalıcı önlemler', tcode:'KANK',
        aciklama:'İki sorun için de kontrol listesi güncelleniyor.',
        girdi:[
          { alan:'Önlem 1', deger:'Yıl sonu listesine **"CO numara aralıkları ({{KANK}})"** eklendi — ' +
                                  'FI aralıklarının hemen yanına' },
          { alan:'Önlem 2', deger:'2 Ocak’ta **test gider kaydı** yapma adımı eklendi' },
          { alan:'Önlem 3', deger:'Test kaydında **CO satırı da doğrulanıyor** ({{KSB1}})' },
          { alan:'Önlem 4', deger:'{{FAGLCOFIRTINT}} varyantı, mimari değişikliklerde ' +
                                  '**gözden geçirilecek konfigürasyon** listesine alındı' },
        ],
        not:'**Dördüncü önlem en değerlisi:** belge bölme, paralel defter veya ' +
             'kâr merkezi raporlaması gibi mimari değişiklikler yapıldığında ' +
             '{{FAGLCOFIRTINT}} varyantı da gözden geçirilmeli.\n\n' +
             'Bu tür varyantlar bir kez ayarlanıp unutulur ve ' +
             'mimari değişince sessizce eksik kalırlar.' },
    ],

    sonuc:
      '**İki ayrı CO yapılandırma eksiği, iki farklı şekilde ortaya çıktı.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. FI ve CO aynı LUW’dadır — CO’daki sorun FI’ı durdurur.** ' +
      'CO numara aralığı eksikse gider kaydı hiç yapılamaz. ' +
      'Hata **FI ekranında** görünür, sebep **CO’dadır** ve ekip iki saat ' +
      'yanlış yerde arar. ' +
      '**Teşhis ipucu:** yalnızca gider kayıtları duruyorsa (tahsilat/ödeme çalışıyorsa) ' +
      'sorun gider hesaplarını diğerlerinden ayıran şeydedir — yani **CO entegrasyonunda**.\n\n' +
      '**2. Yılbaşında CO numara aralıkları da açılmalıdır.** ' +
      '{{FBN1}} özenle yapılır, {{KANK}} unutulur. ' +
      'Kontrol listesinde ikisi **yan yana** olmalıdır. ' +
      'Düzeltme dört dakika, kesinti üç saat sürdü.\n\n' +
      '**3. CO→FI geri akışı koşulludur ve koşul yapılandırılır.** ' +
      'CO içi aktarım normalde FI belgesi üretmez — ama şirket kodu, **kâr merkezi**, ' +
      'bölüm veya fonksiyonel alan değişiyorsa üretmelidir. ' +
      'Bu koşul {{FAGLCOFIRTINT}} varyantında tanımlanır ve ' +
      '**kâr merkezi kutusunu unutmak** en sık hatadır.\n\n' +
      '**4. Yapılandırma varyantları mimari değişince eskir.** ' +
      'Kâr merkezi kutusu, {{new-gl}} kurulumunda haklı olarak işaretlenmemişti — ' +
      'o zaman kâr merkezi bilançosu yoktu. ' +
      'Belge bölme sonradan açılınca varyant **güncellenmedi** ve ' +
      'CO ile FI her ay 480.000 TL ayrışmaya başladı. ' +
      '**Mimari değişikliklerde bağlı varyantlar da gözden geçirilmelidir.**',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'CO entegrasyonu **FI (dışarıya rapor) ile CO (içeriye rapor)** arasındaki köprüdür.',
      'Köprüyü **{{masraf-turu}}** kurar; numarası **G/L hesabıyla aynıdır**.',
      '**FI → CO** her zaman ve otomatiktir; **CO → FI** koşulludur.',
      'CO→FI tetikleyicileri: **şirket kodu, {{kar-merkezi}}, bölüm, fonksiyonel alan** — ' +
      'dördü de **FI’ın raporladığı** boyutlardır.',
      'FI ve CO **aynı LUW’dadır**: CO’daki sorun **FI kaydını da durdurur**.',
      '**{{KANK}} CO numara aralıkları** eksikse gider kayıtları hiç yapılamaz.',
      '{{kontrol-alani}}’na birden çok şirket kodu bağlanabilir — şart: **aynı hesap planı**.',
      'S/4HANA’da FI ve CO **{{ACDOCA}}’da tek satır** — mutabakat kavramı **ortadan kalktı**.',
    ],

    onemliNoktalar:[
      '**"CO içi bir dağıtım FI’ı etkiler mi?"** **Normalde hayır** — toplam gider değişmez. Ama **şirket kodu, kâr merkezi, bölüm veya fonksiyonel alan** değişiyorsa **evet**, çünkü bunlar FI’ın da raporladığı boyutlardır. Kural {{FAGLCOFIRTINT}} varyantındadır.',
      '**"CO numara aralığı eksikse ne olur?"** CO kaydı başarısız olur ve **aynı LUW’da olduğu için FI kaydı da olmaz**. Hata FI ekranında görünür, sebep CO’dadır. Yılbaşında {{KANK}} da açılmalıdır.',
      '**"Masraf türü ile G/L hesabı ilişkisi?"** Numaraları **aynıdır**. ECC’de ayrı ana veriydi ({{KA01}}); S/4HANA’da **hesabın özelliğidir** ({{FS00}}).',
      '**"Bir kontrol alanına birden çok şirket kodu bağlanabilir mi?"** **Evet** — şirketler arası maliyet dağıtımını mümkün kılar. Şart: **aynı hesap planı** ve **aynı mali yıl varyantı**. Karar kurulumun ilk haftasında verilir, sonradan değiştirilemez.',
      '**"S/4HANA’da FI–CO mutabakatı?"** **Kavram olarak yok.** {{BSEG}} + {{COEP}} birleşip {{ACDOCA}}’da tek satır oldu; tutarsızlık **yapısal olarak imkânsız**. Eski mutabakat programları geçişte kaldırılmalıdır.',
      '**"İç sipariş yerleşimi ({{KO88}}) atlanırsa?"** Maliyet siparişte **asılı kalır**: ne duran varlık oluşur ne maliyet yeri raporunda görünür. Yatırım siparişlerinde bu, aktifleştirilmesi gereken tutarın **gider olarak kalması** demektir.',
      '**"Masraf türü kategorileri nedir?"** **1** birincil (gider hesabı) · **11** gelir · **42** devir (CO içi) · **43** hizmet aktarımı. Kategori yanlışsa ilgili işlem tipi çalışmaz.',
      '**"Bilanço hesabına masraf türü açılır mı?"** **Hayır.** Açılırsa o hesaba yapılan her kayıt CO nesnesi ister ve satıcı/banka kayıtları gereksiz yere zorlaşır.',
    ],

    sikHatalar:[
      { hata:'Yılbaşında yalnızca FI numara aralıklarını açmak.', dogru:'{{KANK}} CO aralıkları eksikse **gider kayıtları durur**. Kontrol listesinde yan yana olmalıdır.' },
      { hata:'CO kaynaklı hatayı FI tarafında aramak.', dogru:'Yalnızca gider kayıtları duruyorsa (tahsilat çalışıyorsa) sorun CO entegrasyonundadır.' },
      { hata:'{{FAGLCOFIRTINT}} varyantında kâr merkezi kutusunu unutmak.', dogru:'Kâr merkezi bilançosu çıkarılıyorsa zorunludur; yoksa CO ile FI her ay ayrışır.' },
      { hata:'Mimari değişince ({{belge-bolme}} açılması gibi) bağlı varyantları gözden geçirmemek.', dogru:'Varyantlar bir kez ayarlanıp unutulur; mimari değişince sessizce eksik kalırlar.' },
      { hata:'Bilanço hesaplarına masraf türü açmak.', dogru:'O hesaba yapılan her kayıt CO nesnesi ister; satıcı ve banka kayıtları gereksiz zorlaşır.' },
      { hata:'{{KO88}} yerleşimini atlamak.', dogru:'Maliyet siparişte asılı kalır; aktifleştirilmesi gereken tutar gider olarak durur.' },
      { hata:'Farklı hesap planı kullanan şirket kodlarını aynı kontrol alanına bağlamaya çalışmak.', dogru:'Mümkün değildir. Ya hesap planlarını hizala ya ayrı kontrol alanı kur.' },
      { hata:'S/4HANA geçişinde eski FI–CO mutabakat programlarını bırakmak.', dogru:'Anlamsız farklar raporlar; envanteri çıkarılıp kaldırılmalıdır.' },
    ],

    ipuclari:[
      '**Teşhis deseni:** yalnızca gider kayıtları duruyorsa sorun CO’dadır — ' +
      'gider hesaplarını diğerlerinden ayıran tek şey masraf türüdür.',
      'Yılbaşı kontrol listesinde {{KANK}}’ı {{FBN1}}’in **hemen yanına** koy.',
      '2 Ocak’ta bir **test gider kaydı** yap ve {{KSB1}} ile CO satırının ' +
      'oluştuğunu da doğrula — yalnızca "belge kaydedildi" yetmez.',
      'Mimari değişikliklerde ({{belge-bolme}}, paralel defter) ' +
      '{{FAGLCOFIRTINT}} varyantını gözden geçir.',
      'Yıl sonu kapanışına **"açık iç sipariş var mı?"** maddesini ekle.',
      'S/4HANA geçişinde FI–CO mutabakat programlarının **envanterini çıkar** ve kaldır.',
    ],

    quiz:[
      { soru:'CO içi bir dağıtım ({{KSV5}}) FI belgesi üretir mi?',
        secenekler:[
          'Her zaman üretir',
          'Hiçbir zaman üretmez',
          '**Şirket kodu, kâr merkezi, bölüm veya fonksiyonel alan değişiyorsa üretir**',
          'Yalnızca ay sonunda üretir',
        ], dogru:2,
        aciklama:'Normalde üretmez — CO içi hareket şirketin **toplam giderini değiştirmez**. ' +
                 'Ama bu dört boyuttan biri değişiyorsa üretir, çünkü **dördü de FI’ın ' +
                 'raporladığı boyutlardır**. CO’da değişip FI’da değişmemeleri ' +
                 'iki farklı gerçek yaratırdı. Kural {{FAGLCOFIRTINT}} varyantındadır.' },

      { soru:'CO numara aralığı ({{KANK}}) tanımlı değilse ne olur?',
        secenekler:[
          'Yalnızca CO raporları çalışmaz',
          'Sistem varsayılan aralık kullanır',
          '**CO kaydı başarısız olur ve aynı LUW’da olduğu için FI kaydı da olmaz**',
          'Kayıt yapılır, numara sonra atanır',
        ], dogru:2,
        aciklama:'FI ve CO **aynı LUW’da** yazılır. CO tarafı başarısız olursa ' +
                 'FI kaydı da olmaz. Kullanıcı hatayı **FI ekranında** görür ama ' +
                 'sebep CO’dadır — bu yüzden ekip genelde yanlış yerde arar. ' +
                 'Yılbaşında {{KANK}} da açılmalıdır.' },

      { soru:'Tahsilat ve ödeme kayıtları çalışıyor, gider kayıtları durmuş. İlk şüphen?',
        secenekler:[
          'FI numara aralıkları',
          'Dönem kapalı',
          '**CO entegrasyonu — gider hesaplarını ayıran tek şey masraf türüdür**',
          'Yetkilendirme',
        ], dogru:2,
        aciklama:'Tahsilat ve ödeme **bilanço hesapları** kullanır ve CO’ya yansımaz. ' +
                 'Gider hesaplarını diğerlerinden ayıran tek şey **masraf türü** — ' +
                 'yani CO entegrasyonu. Bu desen, hatanın CO tarafında olduğunun ' +
                 'en hızlı göstergesidir.' },

      { soru:'Masraf türü numarası ile G/L hesap numarası arasındaki ilişki?',
        secenekler:[
          'Bağımsızdır',
          'Masraf türü 9 ile başlar',
          '**Aynıdır — 770300 hesabı, 770300 masraf türüdür**',
          'Eşleştirme tablosuyla tanımlanır',
        ], dogru:2,
        aciklama:'Masraf türü numarası **G/L hesap numarasıyla aynı olmak zorundadır**. ' +
                 'ECC’de ayrı bir ana veriydi ({{KA01}}); S/4HANA’da hesabın ' +
                 '**bir özelliği** oldu ({{FS00}} içinde "birincil masraf türü" seçilir).' },

      { soru:'Bir kontrol alanına birden çok şirket kodu bağlamanın şartı nedir?',
        secenekler:[
          'Aynı ülkede olmaları',
          'Aynı para birimini kullanmaları',
          '**Aynı hesap planını ve aynı mali yıl varyantını kullanmaları**',
          'Şart yoktur',
        ], dogru:2,
        aciklama:'Bu şart, şirketler arası maliyet dağıtımının bedelidir. ' +
                 'Farklı ülkelerde farklı yasal hesap planı gerekiyorsa sağlanamaz. ' +
                 'Karar **kurulumun ilk haftasında** verilir — ' +
                 'sonradan kontrol alanı birleştirmek/ayırmak pratikte imkânsızdır.' },

      { soru:'S/4HANA’da FI–CO mutabakatı neden gereksiz oldu?',
        secenekler:[
          'Otomatik düzeltme programı geldi',
          'CO kaldırıldı',
          '**{{BSEG}} ve {{COEP}} birleşip {{ACDOCA}}’da tek satır oldu — tutarsızlık yapısal olarak imkânsız**',
          'Mutabakat gece işine dönüştü',
        ], dogru:2,
        aciklama:'ECC’de aynı olay **iki tabloya** yazılırdı ve teorik tutarsızlık mümkündü. ' +
                 'S/4HANA’da hesap (`RACCT`) ve maliyet yeri (`KOSTL`) **aynı satırdadır**; ' +
                 'fark oluşması **fiziksel olarak mümkün değildir**. ' +
                 'Eski mutabakat programları geçişte kaldırılmalıdır.' },

      { soru:'{{ic-siparis}} yerleşimi ({{KO88}}) atlanırsa ne olur?',
        secenekler:[
          'Sipariş otomatik kapanır',
          'Maliyet maliyet yerine gider',
          '**Maliyet siparişte asılı kalır — ne varlıkta ne maliyet yerinde görünür**',
          'FI belgesi ters kaydedilir',
        ], dogru:2,
        aciklama:'Yerleşim yapılmazsa maliyet siparişte kalır: duran varlık **oluşmaz** ' +
                 '(amortisman başlamaz), maliyet yeri raporlarında **görünmez**. ' +
                 'Yatırım siparişlerinde bu, aktifleştirilmesi gereken tutarın ' +
                 '**gider olarak kalması** demektir — hem bilanço hem gelir tablosu yanlış olur.' },

      { soru:'{{FAGLCOFIRTINT}} varyantında kâr merkezi kutusu işaretlenmemişse ne olur?',
        secenekler:[
          'CO dağıtımı çalışmaz',
          'FI kayıtları durur',
          '**CO’da kâr merkezleri arası dağıtım yapılır ama FI’a yansımaz — kâr merkezi bilançosu tutmaz**',
          'Hata mesajı alınır',
        ], dogru:2,
        aciklama:'CO belgesi oluşur, FI belgesi oluşmaz ve **hata mesajı çıkmaz**. ' +
                 'Sonuç: CO’da bir kâr merkezinin gideri artar, ' +
                 'FI’daki kâr merkezi bilançosunda artmaz. ' +
                 'Fark her ay birikir ve sebebi CO’da değil bu varyantta olduğu için ' +
                 'bulunması zordur.' },
    ],

    flashcards:[
      { on:'FI ile CO farkı nedir?', arka:'**FI** — "dışarıya karşı ne oldu?" · yasal mali tablo · mevzuat belirler\n\n**CO** — "içeride ne oldu?" · yönetim raporu · şirket belirler\n\n**Köprü:** masraf türü (numarası hesapla **aynı**).' },
      { on:'CO → FI geri akışı ne zaman olur?', arka:'**Dört boyuttan biri değişirse:**\n\n1. **Şirket kodu** (zorunlu)\n2. **Kâr merkezi**\n3. Bölüm\n4. Fonksiyonel alan\n\nOrtak sebep: **dördü de FI’ın raporladığı boyutlar**.\n\nKural: FAGLCOFIRTINT varyantı.' },
      { on:'CO numara aralığı (KANK) eksikse?', arka:'**CO kaydı başarısız → FI kaydı da olmaz** (aynı LUW).\n\nHata **FI ekranında** görünür, sebep **CO’da**.\n\nKlasik: yılbaşında FBN1 açılır, **KANK unutulur** → 1 Ocak’ta gider kayıtları durur.' },
      { on:'Teşhis: gider kayıtları durdu, tahsilat çalışıyor', arka:'**Sorun CO’da.**\n\nTahsilat/ödeme = **bilanço hesapları** → CO’ya yansımaz\nGider = **masraf türü var** → CO entegrasyonu devrede\n\nGider hesaplarını ayıran tek şey masraf türüdür.' },
      { on:'Masraf türü kategorileri', arka:'**1** — birincil (gider hesabı)\n**11** — gelir\n**42** — devir (CO içi, KSV5)\n**43** — hizmet aktarımı (faaliyet)\n\nKategori yanlışsa ilgili işlem tipi **çalışmaz**.' },
      { on:'Kontrol alanına çok şirket kodu bağlamanın şartı?', arka:'**Aynı hesap planı** + **aynı mali yıl varyantı**\n\n✓ Kazanç: şirketler arası maliyet dağıtımı\n⚠️ Karar **kurulumun ilk haftasında** verilir — sonradan değiştirilemez.' },
      { on:'S/4HANA’da FI–CO mutabakatı', arka:'**Kavram olarak YOK.**\n\nECC: BSEG (FI) + COEP (CO) → iki tablo → mutabakat\nS/4: **ACDOCA tek satır** → tutarsızlık **fiziksel olarak imkânsız**\n\n→ Eski mutabakat programları **kaldırılmalı**.' },
      { on:'KO88 yerleşimi atlanırsa?', arka:'**Maliyet siparişte asılı kalır.**\n\n✕ Duran varlık oluşmaz → amortisman başlamaz\n✕ Maliyet yeri raporunda görünmez\n✕ Aktifleştirilecek tutar **gider olarak kalır**\n\n→ Yıl sonu listesine "açık iç sipariş?" ekle.' },
      { on:'FAGLCOFIRTINT — kâr merkezi kutusu unutulursa?', arka:'CO belgesi oluşur, **FI belgesi oluşmaz** — ve **hata mesajı çıkmaz**.\n\nSonuç: CO’da kâr merkezi gideri artar, FI’daki kâr merkezi bilançosunda artmaz.\n\nFark her ay birikir, sebebi bulunması zor.' },
      { on:'Bilanço hesabına masraf türü açılır mı?', arka:'**HAYIR.**\n\nAçılırsa o hesaba yapılan **her kayıt CO nesnesi ister** → satıcı, banka, stok kayıtları gereksiz zorlaşır.\n\nMasraf türü yalnızca **gelir tablosu** hesapları içindir.' },
      { on:'S/4HANA’da masraf türü nerede tanımlanır?', arka:'**FS00 içinde — G/L hesabının özelliği.**\n\nHesap açarken "birincil masraf türü" seçilir, iş biter.\n\nKA01 çalışmaya devam eder ama **zorunlu değil**.\n\nİkincil masraf türleri de artık **G/L hesabı**.' },
      { on:'"Toplam değişmiyorsa FI etkilenmez" — istisnası?', arka:'**FI’ın da raporladığı bir boyut değişiyorsa.**\n\nŞirket kodu · kâr merkezi · bölüm · fonksiyonel alan\n\nBunlar mali tabloda raporlanır; CO’da değişip FI’da değişmemeleri **iki farklı gerçek** yaratırdı.' },
    ],
  },

  },
});
