/* ==========================================================================
   content/fi/cost-center.js — "Cost Center Integration (Maliyet Yeri Entegrasyonu)"
   ========================================================================== */

SAP.registerTopic({
  id: 'cost-center',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Maliyet yeri entegrasyonu, **bir gider kaydının FI’da hesaba, CO’da maliyet yerine ' +
      'aynı anda yazılmasıdır**.\n\n' +
      'Kullanıcı {{FB50}} ile 770 hesabına 50.000 TL gider girer ve ' +
      '**maliyet yeri** alanına 4200 (Pazarlama) yazar. Tek kayıtla iki soru cevaplanır:\n\n' +
      '**FI sorusu:** "Hangi gider türü?" → 770 Genel yönetim gideri\n' +
      '**CO sorusu:** "Kim harcadı?" → Pazarlama departmanı\n\n' +
      'Bağlantıyı kuran şey **{{masraf-turu}}** (cost element) kavramıdır: ' +
      'bir G/L hesabının CO tarafındaki karşılığı. ' +
      'Masraf türü yoksa hesap CO’ya **hiç yansımaz**; ' +
      'masraf türü varsa ama CO nesnesi girilmemişse **belge kaydedilemez**.\n\n' +
      'S/4HANA’da bu ayrım büyük ölçüde kalktı: masraf türü artık G/L hesabının ' +
      'bir **özelliğidir** ve veri {{ACDOCA}}’da tek satırda tutulur.',

    neden:
      '**Sorumluluk muhasebesi.** "Bu ay 12 milyon TL gider oldu" bilgisi yönetilemez; ' +
      '"Pazarlama 2,1 milyon, Üretim 6,4 milyon" bilgisi yönetilebilir.\n\n' +
      '**Bütçe kontrolü.** Plan–gerçek karşılaştırması ancak maliyet yeri bazında anlamlıdır.\n\n' +
      '**Maliyet dağıtımı.** Ortak giderler (kira, elektrik, yönetim) ' +
      'üretim birimlerine dağıtılabilir hâle gelir.\n\n' +
      '**Ürün maliyeti.** Üretim maliyet yerlerinin masrafları, ' +
      'faaliyet oranları üzerinden ürünlere yansır.\n\n' +
      '**Kâr merkezi türetmesi.** Maliyet yeri bir {{kar-merkezi}}’ne bağlıdır; ' +
      'FI kaydındaki kâr merkezi bu zincirden gelir.',

    sirketOnemi:
      'Maliyet yeri, **FI ile CO arasındaki en yoğun kullanılan köprüdür**. ' +
      'Bir şirkette günde binlerce gider kaydı yapılır ve ' +
      'her birinde bu köprü çalışır.\n\n' +
      'Danışman açısından kritik olan şudur: **maliyet yeri hataları gider tutarını değiştirmez.** ' +
      'Mizan doğrudur, gelir tablosu doğrudur — ama yönetim raporu yanlıştır. ' +
      'Pazarlama\'nın gideri Üretim’e yazılmıştır ve kimse fark etmez, ' +
      'çünkü **toplam aynıdır**.\n\n' +
      'Ayırt edici soru şudur: **"Yanlış maliyet yerine düşen gider nasıl düzeltilir?"** ' +
      'Doğru cevap: **{{KB11N}} ile CO içinde taşınır**, FI belgesi ters kaydedilmez. ' +
      'Çünkü FI tarafı doğrudur — yalnızca CO nesnesi yanlıştır. ' +
      'Ters kayıt gereksiz iki belge yaratır ve mizanı kirletir.',

    gercekHayat:
      'Bir üretim şirketinde elektrik faturası geliyor: 340.000 TL.\n\n' +
      'Muhasebe kaydı basit: 770 gider borç, 320 satıcı alacak. ' +
      'Ama "maliyet yeri" alanına ne yazılacak?\n\n' +
      'Fatura tek — elektrik tüm fabrikaya ait. ' +
      'Üretim, depo, ofis ve yemekhane hepsi aynı sayaçtan besleniyor.\n\n' +
      'İki yöntem var:\n\n' +
      '**a)** Faturayı **teknik bir maliyet yerine** (örneğin 9900 Genel Tesis) yaz, ' +
      'ay sonunda {{KSV5}} ile alan m²’lerine göre dağıt.\n\n' +
      '**b)** Faturayı girerken **dört satıra böl** ve her satıra farklı maliyet yeri yaz.\n\n' +
      '(a) tercih edilir: dağıtım oranı bir kez tanımlanır, her ay otomatik çalışır. ' +
      '(b) her fatura için elle hesaplama gerektirir ve tutarsızlık üretir.\n\n' +
      '**Bu, maliyet yeri tasarımının özüdür:** gider nereye *düşer* ile ' +
      'nereye *ait* olduğu farklı sorulardır; ikincisi dağıtımla çözülür.',

    muhasebeMantigi:
      'Maliyet yerinin muhasebe mantığı şu ilkeye dayanır: ' +
      '**FI "ne harcandı"yı, CO "kim harcadı"yı kaydeder.**\n\n' +
      'İki soru da aynı olayın parçasıdır ve **aynı tutarı** paylaşır — ' +
      'bu yüzden ayrı kayıt değil, aynı kaydın iki boyutudur.\n\n' +
      'Kritik nokta: **maliyet yeri yalnızca gelir tablosu hesaplarında anlamlıdır.** ' +
      'Bilanço hesapları (satıcı, banka, stok) maliyet yeri taşımaz — ' +
      'çünkü bir varlık veya borç "harcanmaz".\n\n' +
      'Bu yüzden bir fatura kaydında yalnızca **gider satırı** maliyet yeri ister; ' +
      'satıcı ve KDV satırları istemez. ' +
      '({{belge-bolme}} etkinse o satırlara da kâr merkezi atanır ama ' +
      'bu farklı bir mekanizmadır — bkz. {{new-gl}}.)\n\n' +
      'İkinci ilke: **CO içi hareketler FI’ı etkilemez.** ' +
      '{{KB11N}} ile gideri bir maliyet yerinden diğerine taşımak ' +
      'mizanda **hiçbir değişiklik yaratmaz** — toplam gider aynıdır.',

    kavramlar: ['maliyet-yeri', 'masraf-turu', 'kar-merkezi', 'kontrol-alani', 'ic-siparis'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Maliyet yeri süreci iki katmanlıdır: **günlük kayıt** (her gider işleminde otomatik) ve ' +
      '**dönem sonu dağıtımı** (ortak giderlerin gerçek sahiplerine aktarılması).',

    roller:[
      { rol:'CO danışmanı', gorev:'Maliyet yeri hiyerarşisini ve {{OKB9}} varsayılan atamalarını tasarlar.' },
      { rol:'Muhasebe kullanıcısı', gorev:'Gider girerken maliyet yerini yazar — **veya sistem türetir**.' },
      { rol:'Maliyet yeri sorumlusu', gorev:'Kendi biriminin giderlerini izler ({{KSB1}}), bütçe sapmasını açıklar.' },
      { rol:'CO muhasebe', gorev:'Yanlış atamaları {{KB11N}} ile düzeltir; ay sonu dağıtımını çalıştırır ({{KSV5}}).' },
      { rol:'Kontrolör', gorev:'Plan–gerçek karşılaştırması yapar ({{S_ALR_87013611}}).' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Gider kaydından yönetim raporuna',
      adimlar:[
        { ic:'🏗️', rol:'CO danışmanı', baslik:'Maliyet yeri oluşturulur ({{KS01}})',
          aciklama:'Kontrol alanı, geçerlilik aralığı, sorumlu ve **{{kar-merkezi}} ataması**. ' +
                   'Kâr merkezi ataması FI kaydına da yansır.',
          cikti:'Maliyet yeri ana verisi', ok:'hesap hazırlanır' },
        { ic:'🔗', rol:'CO danışmanı', baslik:'Masraf türü tanımlanır ({{KA01}})',
          aciklama:'G/L hesabının CO karşılığı. **Yoksa hesap CO’ya hiç yansımaz.** ' +
                   'S/4HANA’da bu, hesabın bir özelliğidir.',
          cikti:'Masraf türü', ok:'kullanıma hazır' },
        { ic:'🧾', rol:'Kullanıcı', baslik:'Gider kaydedilir ({{FB50}} / {{FB60}})',
          aciklama:'Gider satırına maliyet yeri girilir. Girilmezse **{{OKB9}} varsayılanı** devreye girer; ' +
                   'o da yoksa **belge kaydedilemez**.',
          cikti:'FI + CO kaydı', ok:'eş zamanlı' },
        { ic:'⚡', rol:'Sistem', baslik:'FI ve CO **aynı anda** yazılır',
          aciklama:'ECC’de {{BSEG}} + COEP (iki tablo). S/4HANA’da **{{ACDOCA}}’da tek satır**. ' +
                   'Mutabakat gerekmez.',
          cikti:'Entegre kayıt', ok:'ay sonu' },
        { ic:'📊', rol:'Sorumlu', baslik:'Giderler izlenir ({{KSB1}})',
          aciklama:'Maliyet yeri sorumlusu kendi kalemlerini görür; ' +
                   'FI belgesine çift tıkla geçebilir.',
          cikti:'Birim gider raporu', ok:'ortak giderler' },
        { ic:'🔀', rol:'CO muhasebe', baslik:'Dağıtım yapılır ({{KSV5}} / {{KSU5}})',
          aciklama:'Ortak giderler (kira, elektrik, yönetim) gerçek sahiplerine aktarılır. ' +
                   '**FI’ı etkilemez** — toplam gider aynıdır.',
          cikti:'Dağıtılmış maliyet', ok:'raporlama' },
        { ic:'📈', rol:'Kontrolör', baslik:'Plan–gerçek karşılaştırılır',
          aciklama:'{{S_ALR_87013611}} ile bütçe sapması analiz edilir.',
          cikti:'Yönetim raporu' },
      ],
    },

    adimlar:[
      { rol:'CO danışmanı', eylem:'Maliyet yeri oluşturur', sistem:'{{KS01}} → {{CSKS}}' },
      { rol:'CO danışmanı', eylem:'Masraf türü tanımlar', sistem:'{{KA01}} → {{CSKB}}' },
      { rol:'CO danışmanı', eylem:'Varsayılan atama tanımlar', sistem:'{{OKB9}} — kullanıcı hatasını azaltır' },
      { rol:'Kullanıcı', eylem:'Gideri maliyet yeriyle kaydeder', sistem:'{{FB50}} / {{FB60}} / {{MIRO}}' },
      { rol:'Sistem', eylem:'FI + CO eş zamanlı yazar', sistem:'{{ACDOCA}} tek satır (S/4)' },
      { rol:'Sorumlu', eylem:'Giderleri izler', sistem:'{{KSB1}}' },
      { rol:'CO muhasebe', eylem:'Yanlış atamayı düzeltir', sistem:'{{KB11N}} — **FI belgesi oluşmaz**' },
      { rol:'CO muhasebe', eylem:'Ortak gideri dağıtır', sistem:'{{KSV5}} devir · {{KSU5}} dağıtım' },
      { rol:'Kontrolör', eylem:'Plan–gerçek karşılaştırır', sistem:'{{S_ALR_87013611}}' },
    ],

    veriAkisi:{
      nereden:'G/L hesabı ve masraf türü ({{CSKB}}), maliyet yeri ana verisi ({{CSKS}}), ' +
              'varsayılan atamalar ({{OKB9}}), kullanıcının girdiği maliyet yeri.',
      nereye:'{{ACDOCA}} `KOSTL` ve `PRCTR` alanları (S/4); ECC’de ayrıca COEP; ' +
             'maliyet yeri raporları.',
      tetikleyen:'Masraf türü olan bir hesaba yapılan her kayıt.',
      sonraki:'Dağıtım, plan–gerçek analizi, ürün maliyetlendirme.',
    },

    notlar:[
      { tip:'tip', baslik:'Kâr merkezi maliyet yerinden türetilir', metin:
        'Bir gider kaydında kullanıcı yalnızca **maliyet yerini** girer. ' +
        '{{kar-merkezi}} alanı otomatik dolar.\n\n' +
        'Zincir şudur: maliyet yeri ana verisinde ({{CSKS}} `PRCTR`) bir kâr merkezi tanımlıdır. ' +
        'Kayıt sırasında sistem bu bağlantıyı okur ve kâr merkezini kaleme yazar.\n\n' +
        'Pratik sonuçları:\n\n' +
        '**a)** Maliyet yerinin kâr merkezi değişirse, **yeni kayıtlar** yeni kâr merkezine gider; ' +
        'geçmiş kayıtlar değişmez.\n\n' +
        '**b)** {{belge-bolme}} etkinse, satıcı ve KDV satırları bu kâr merkezinin ' +
        'oranında bölünür — yani **maliyet yeri seçimi bilanço bölmesini de etkiler**.\n\n' +
        '**c)** Maliyet yerine kâr merkezi atanmamışsa belge kaydedilemez ' +
        '(belge bölme etkinse) veya kâr merkezi boş kalır.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Maliyet yerinin muhasebe etkisi **FI tarafında sıfırdır** — ' +
      'gider tutarı ve hesabı değişmez. Değişen, kaydın **taşıdığı boyuttur**. ' +
      'Aşağıdaki fişler bu ayrımı gösteriyor.',

    etkilenenHesaplar:[
      { hesap:'770 / 760 / 750 Gider hesapları', tur:'Gelir tablosu', neden:'Masraf türü tanımlıysa CO nesnesi **zorunludur**.' },
      { hesap:'320 Satıcılar', tur:'Bilanço — Kaynak', neden:'Maliyet yeri **taşımaz** — bilanço hesapları harcanmaz.' },
      { hesap:'191 İndirilecek KDV', tur:'Bilanço — Varlık', neden:'Maliyet yeri taşımaz.' },
      { hesap:'153 Stoklar', tur:'Bilanço — Varlık', neden:'Maliyet yeri taşımaz; stok bir varlıktır.' },
      { hesap:'Devir masraf türü (kategori 42)', tur:'CO içi', neden:'{{KSV5}} devri bu tür altında toplar; **FI hesabı değildir**.' },
    ],

    fisler:[
      { baslik:'Gider kaydı — FI ve CO **aynı anda**',
        belgeTuru:'KR', tarih:'10.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — **maliyet yeri 4200 Pazarlama**', borc:50000,
            not:'FI: 770 hesabı · CO: maliyet yeri 4200' },
          { hesap:'191', ad:'İndirilecek KDV', borc:10000, not:'Maliyet yeri **yok**' },
          { hesap:'320', ad:'Satıcılar', alacak:60000, not:'Maliyet yeri **yok**' },
        ],
        not:'**Tek kayıt, iki boyut.** Gider satırı hem 770 hesabına hem 4200 maliyet yerine yazıldı.\n\n' +
             'Satıcı ve KDV satırları maliyet yeri taşımaz — **bilanço hesapları harcanmaz**.\n\n' +
             'S/4HANA’da bu üç satır {{ACDOCA}}’da durur ve ilk satırın `KOSTL` alanı doludur. ' +
             'ECC’de ayrıca COEP’e bir CO kaydı yazılırdı.' },

      { baslik:'Yanlış maliyet yeri — FI doğru, CO yanlış',
        belgeTuru:'KR', tarih:'12.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Reklam gideri — **maliyet yeri 3100 Üretim** ', borc:180000,
            not:'FI **doğru**, CO **yanlış** — Pazarlama olmalıydı' },
          { hesap:'191', ad:'İndirilecek KDV', borc:36000 },
          { hesap:'320', ad:'Satıcılar', alacak:216000 },
        ],
        not:'**Mizan tamamen doğrudur:** 770 hesabına 180.000 TL gider yazıldı, ' +
             'gelir tablosu doğru, KDV doğru, satıcı borcu doğru.\n\n' +
             'Yanlış olan tek şey **CO nesnesi**: reklam gideri Üretim maliyet yerine düştü.\n\n' +
             'Sonuç: Üretim’in bütçesi aşılmış görünür, Pazarlama’nın bütçesi ' +
             'kullanılmamış görünür. **Hiçbir muhasebe kontrolü bunu yakalamaz** — ' +
             'çünkü toplam doğrudur.' },

      { baslik:'Düzeltme — {{KB11N}} ile **CO içinde** taşınır',
        belgeTuru:'CO belgesi', tarih:'13.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'CO kaydı: 3100 Üretim → 4200 Pazarlama · 180.000 TL', borc:0, alacak:0,
            not:'**FI belgesi oluşmaz** — mizan değişmez' },
        ],
        not:'{{KB11N}} yalnızca **CO nesnesini** değiştirir. ' +
             'Üretim maliyet yerinden 180.000 TL çıkar, Pazarlama’ya girer.\n\n' +
             '**FI tarafı hiç dokunulmaz:** 770 hesabının bakiyesi aynı kalır, ' +
             'mizan değişmez, gelir tablosu değişmez.\n\n' +
             'Bu, doğru düzeltme yöntemidir. ' +
             'Alternatif ({{FB08}} ile ters kaydedip yeniden girmek) ' +
             'mizanda **iki gereksiz belge** yaratır ve FI’ı kirletir.\n\n' +
             '*(Tabloda 0/0 gösterimi, FI etkisi olmadığını vurgulamak içindir.)*' },

      { baslik:'**Yanlış düzeltme yöntemi** — FI’dan ters kayıt',
        belgeTuru:'KR', tarih:'13.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar', borc:216000, not:'Ters kayıt' },
          { hesap:'770', ad:'Reklam gideri — MY 3100', alacak:180000 },
          { hesap:'191', ad:'İndirilecek KDV', alacak:36000 },
        ],
        not:'**Bu yöntem yanlıştır** ama sık kullanılır.\n\n' +
             'Sonucu: mizanda üç belge olur (asıl + ters + yeniden kayıt), ' +
             'satıcı hesabında gereksiz hareketler oluşur, ' +
             'KDV beyanında üç satır görünür ve ' +
             'denetimde "bu ters kayıt neden?" sorusu doğar.\n\n' +
             'Oysa **FI hiç yanlış değildi** — yalnızca CO nesnesi yanlıştı. ' +
             '{{KB11N}} bunu tek CO belgesiyle, FI’a dokunmadan çözer.' },

      { baslik:'Ay sonu dağıtımı ({{KSV5}}) — ortak gider paylaştırılır',
        belgeTuru:'CO belgesi', tarih:'31.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'9900 Genel Tesis → 3100 Üretim (%55) · 204.000 TL', borc:0, alacak:0 },
          { hesap:'—', ad:'9900 Genel Tesis → 4200 Pazarlama (%20) · 74.000 TL', borc:0, alacak:0 },
          { hesap:'—', ad:'9900 Genel Tesis → 5100 İdari (%25) · 92.000 TL', borc:0, alacak:0 },
        ],
        not:'Elektrik faturası (370.000 TL) önce teknik maliyet yeri **9900**’e yazılmıştı. ' +
             'Ay sonunda alan m²’lerine göre üç birime dağıtıldı.\n\n' +
             '**FI’da hiçbir değişiklik yok:** 770 hesabında hâlâ 370.000 TL var. ' +
             'Yalnızca CO tarafında maliyet, gerçek sahiplerine aktarıldı.\n\n' +
             '9900 maliyet yerinin bakiyesi **sıfırlandı** — ' +
             'teknik maliyet yerlerinin ay sonunda sıfırlanması ' +
             'dağıtımın doğru çalıştığının kontrolüdür.' },

      { baslik:'{{ic-siparis}} yerleşimi ({{KO88}}) — maliyet hedefe aktarılır',
        belgeTuru:'CO belgesi', tarih:'31.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'İç sipariş 500042 (fuar) → maliyet yeri 4200 Pazarlama · 285.000 TL', borc:0, alacak:0 },
        ],
        not:'Fuar için açılan {{ic-siparis}}’te üç aydır maliyet birikiyordu ' +
             '(stand, seyahat, tanıtım malzemesi).\n\n' +
             'Fuar bitince {{KO88}} ile toplam maliyet Pazarlama maliyet yerine **yerleştirildi**.\n\n' +
             '**Yerleşim yapılmazsa** maliyet siparişte asılı kalır ve ' +
             'hiçbir maliyet yeri raporunda görünmez — ' +
             'iç siparişlerin en sık sorunudur.' },
    ],

    tHesaplar:[
      { hesap:'Genel yönetim gideri (FI)', kod:'770',
        borc:[{ ad:'Faturalar', tutar:600000 }],
        alacak:[],
        not:'**CO hareketleri bu hesabı etkilemez**' },
      { hesap:'Maliyet yeri 4200 Pazarlama (CO)', kod:'4200',
        borc:[{ ad:'Doğrudan giderler', tutar:230000 }, { ad:'Dağıtımdan gelen', tutar:74000 },
              { ad:'İç sipariş yerleşimi', tutar:285000 }],
        alacak:[],
        not:'CO nesnesi — mizanda **yoktur**' },
      { hesap:'Maliyet yeri 9900 Genel Tesis (CO)', kod:'9900',
        borc:[{ ad:'Elektrik, kira, güvenlik', tutar:370000 }],
        alacak:[{ ad:'Dağıtım ({{KSV5}})', tutar:370000 }],
        not:'Ay sonunda **sıfırlanmalı** — dağıtım kontrolü' },
    ],

    notlar:[
      { tip:'warn', baslik:'Maliyet yeri hatası hiçbir muhasebe kontrolünü tetiklemez', metin:
        'Yanlış maliyet yerine düşen bir gider için:\n\n' +
        '• Fiş **dengelidir**\n' +
        '• Mizan **tutar**\n' +
        '• Gelir tablosu **doğrudur**\n' +
        '• KDV **doğrudur**\n' +
        '• Hiçbir hata mesajı **çıkmaz**\n\n' +
        'Çünkü yanlış olan tutar değil, **etiket**tir. ' +
        'Toplam gider aynı kalır, yalnızca hangi birimin harcadığı yanlıştır.\n\n' +
        'Bu hatanın tek yakalanma yolu **bütçe sapması analizidir**: ' +
        'Üretim’in bütçesi beklenmedik şekilde aşılmışsa, ' +
        '{{KSB1}} ile kalemler incelenir ve "reklam gideri Üretim’de ne arıyor?" ' +
        'sorusu sorulur.\n\n' +
        '**Önlem:** {{OKB9}} ile varsayılan atamalar tanımlamak ve ' +
        'maliyet yeri sorumlularının aylık olarak kendi kalemlerini ' +
        '({{KSB1}}) gözden geçirmesini rutinleştirmek.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'CO nesneleri (gider taşıyıcıları) çeşitlenir ve ' +
      'hangisinin ne zaman kullanılacağı önemli bir tasarım kararıdır. ' +
      'Ayrıca dağıtım yöntemlerinin kendi çeşitleri vardır.',

    liste:[
      { ad:'Maliyet yeri', en:'Cost Center',
        aciklama:'**Kalıcı** organizasyon birimi; bir sorumlusu vardır.',
        neZaman:'Departmanlar, bölümler, fabrika alanları — sürekli var olan birimler.',
        ornek:'4200 Pazarlama · 3100 Üretim · 5100 İdari İşler.',
        tcodes:['KS01','KSB1'] },

      { ad:'{{ic-siparis}}', en:'Internal Order',
        aciklama:'**Geçici** maliyet toplama nesnesi; biter ve yerleştirilir.',
        neZaman:'Fuar, kampanya, bakım işi, küçük yatırım — başı sonu belli işler.',
        ornek:'500042 "2027 Sanayi Fuarı". Biriken maliyet {{KO88}} ile ' +
              'maliyet yerine veya duran varlığa **yerleştirilir**.',
        tcodes:['KO01','KO88'] },

      { ad:'Teknik / toplayıcı maliyet yeri', en:'Technical Cost Center',
        aciklama:'Ortak giderleri geçici olarak toplayan maliyet yeri.',
        neZaman:'Tek faturanın birden çok birimi ilgilendirdiği durumlarda.',
        ornek:'9900 Genel Tesis (elektrik, kira, güvenlik). ' +
              'Ay sonunda dağıtılır ve **sıfırlanmalıdır**.' },

      { ad:'Dağıtım (distribution)', en:'Distribution — {{KSU5}}',
        aciklama:'Masrafları **orijinal masraf türüyle** hedeflere aktarır.',
        neZaman:'Hedef maliyet yerinde giderin **türü** görünmesi gerektiğinde.',
        ornek:'Elektrik gideri hedefte de "elektrik gideri" olarak görünür. ' +
              '**Şeffaf ama çok satır üretir.**',
        tcodes:['KSU5'] },

      { ad:'Devir (assessment)', en:'Assessment — {{KSV5}}',
        aciklama:'Masrafları **devir masraf türü** (kategori 42) altında toplayarak aktarır.',
        neZaman:'Detay gerekmediğinde; yönetim giderlerinin dağıtımında.',
        ornek:'Hedefte tek satır: "Genel gider payı 74.000 TL". ' +
              'Orijinal türler **görünmez** — daha sade ama daha az şeffaf.',
        tcodes:['KSV5'] },

      { ad:'Birincil masraf türü', en:'Primary Cost Element — kategori 1',
        aciklama:'Bir G/L gider hesabının CO karşılığı.',
        neZaman:'Her gider hesabı için — FI’dan CO’ya köprü.',
        ornek:'770 hesabı ↔ 770 masraf türü. **Numaralar aynıdır.**',
        tcodes:['KA01'] },

      { ad:'İkincil masraf türü', en:'Secondary Cost Element — kategori 42/43',
        aciklama:'Yalnızca **CO içinde** kullanılan tür; FI karşılığı **yoktur**.',
        neZaman:'Devir (42), hizmet aktarımı (43) işlemlerinde.',
        ornek:'Devir masraf türü 9430000. FI hesap planında bu numara **yoktur** — ' +
              'S/4HANA’da ise G/L hesabı olarak da açılır.' },

      { ad:'Varsayılan hesap ataması', en:'Default Account Assignment — {{OKB9}}',
        aciklama:'Kullanıcı maliyet yeri girmezse sistemin kullanacağı varsayılan.',
        neZaman:'Sabit bir birime ait giderlerde; kullanıcı hatasını azaltmak için.',
        ornek:'Hesap 770500 (kira) → her zaman maliyet yeri 9900. ' +
              'Kullanıcı düşünmek zorunda kalmaz.',
        tcodes:['OKB9'] },

      { ad:'İstatistiksel atama', en:'Statistical Posting',
        aciklama:'Gerçek maliyet bir nesneye, istatistiksel kopyası başkasına yazılır.',
        neZaman:'Aynı gideri iki boyutta izlemek gerektiğinde.',
        ornek:'Gerçek maliyet iç siparişe, istatistiksel kopya maliyet yerine — ' +
              'veya tersi. Çifte sayım olmaz çünkü biri **istatistikseldir**.' },
    ],

    karsilastirmaBasliklar:['Dağıtım ({{KSU5}})', 'Devir ({{KSV5}})'],
    karsilastirma:[
      ['Masraf türü', '**Orijinal korunur**', '**Devir türü** (kategori 42) altında toplanır'],
      ['Hedefte görünüm', 'Elektrik, kira, temizlik ayrı ayrı', 'Tek satır: "genel gider payı"'],
      ['Şeffaflık', '**Yüksek** — kaynak tür görünür', 'Düşük — detay kaybolur'],
      ['Satır sayısı', 'Çok — her tür için ayrı', 'Az — tek satır'],
      ['Performans', 'Daha yavaş', 'Daha hızlı'],
      ['Tipik kullanım', 'Üretim maliyet dağıtımı', 'Yönetim gideri dağıtımı'],
      ['FI etkisi', '**Yok**', '**Yok**'],
      ['Tercih', 'Detay gerekiyorsa', 'Sadelik yeterliyse'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'KS01', ad:'Maliyet yeri oluştur',
        amac:'Yeni maliyet yeri ana verisi açar.',
        neZaman:'Yeni departman kurulduğunda; organizasyon değiştiğinde.',
        adimlar:[
          { baslik:'Maliyet yeri kodu ve **geçerlilik aralığını** gir',
            aciklama:'Geçerlilik aralığı {{CSKS}} anahtarının parçasıdır — ' +
                     'aynı kod farklı tarihlerde farklı ayarlara sahip olabilir.' },
          { baslik:'Ad ve sorumlu kişiyi gir' },
          { baslik:'Maliyet yeri tipini seç',
            aciklama:'Üretim, hizmet, yönetim, satış — raporlama ve dağıtımda kullanılır.' },
          { baslik:'**Kâr merkezini ata**',
            aciklama:'{{CSKS}} `PRCTR`. FI kaydındaki kâr merkezi buradan türetilir — ' +
                     '**boş bırakılmamalıdır**.' },
          { baslik:'Hiyerarşi alanını gir',
            aciklama:'Standart hiyerarşideki yeri; raporlarda gruplama sağlar.' },
        ],
        ekranAkisi:[
          { ekran:'Başlangıç', islem:'Maliyet yeri 4200 · geçerlilik 01.01.2027–31.12.9999' },
          { ekran:'Temel veri', islem:'Ad "Pazarlama" · sorumlu · tip: satış' },
          { ekran:'Kontrol', islem:'Kâr merkezi **PC-4000**' },
          { ekran:'Hiyerarşi', islem:'Standart hiyerarşi düğümü: SATIS' },
        ],
        alanlar:{
          zorunlu:['Maliyet yeri','Geçerlilik aralığı','Ad','Sorumlu','Maliyet yeri tipi','Hiyerarşi alanı'],
          opsiyonel:['Kâr merkezi (ama pratikte zorunlu)','Şirket kodu','Fonksiyonel alan'] },
        hatalar:[
          { mesaj:'Cost center ... already exists in this period', sebep:'Aynı kod aynı tarihte tanımlı.', cozum:'{{KS02}} ile mevcut kaydı değiştir veya farklı geçerlilik aralığı kullan.' },
          { mesaj:'Profit center ... does not exist', sebep:'Atanan kâr merkezi tanımsız veya geçerlilik dışı.', cozum:'Kâr merkezini önce oluştur.' },
        ],
        ipucu:'**Kâr merkezi atamasını boş bırakma.** ' +
              '{{belge-bolme}} etkinse, kâr merkezi türetilemeyen bir maliyet yerine ' +
              'yapılan kayıt *"Balancing field Profit Center not filled"* hatasıyla ' +
              '**reddedilir** — ve sebebi maliyet yeri ana verisinde aranmaz, ' +
              'belge bölme yapılandırmasında boşuna aranır.',
        ilgili:['KS02','KS03','KSB1','CSKS'] },

      { kod:'KSB1', ad:'Maliyet yeri gerçek kalemleri — en çok kullanılan CO raporu',
        amac:'Bir maliyet yerine düşen tüm kalemleri listeler.',
        neZaman:'Bütçe sapması analizinde; "bu gider buraya neden düştü?" sorusunda.',
        adimlar:[
          { baslik:'Maliyet yeri (veya grubu) ve dönemi gir' },
          { baslik:'Kalemleri listele',
            aciklama:'Masraf türü, tutar, belge numarası, açıklama.' },
          { baslik:'**Belgeye çift tıkla**',
            aciklama:'FI belgesine geçilir — CO kaleminden FI’a inmenin en hızlı yolu.' },
          { baslik:'Masraf türüne göre grupla',
            aciklama:'Hangi gider türünün bütçeyi aştığı görülür.' },
        ],
        alanlar:{
          zorunlu:['Maliyet yeri / grubu','Dönem aralığı'],
          opsiyonel:['Masraf türü / grubu','Belge türü','Kullanıcı'] },
        hatalar:[
          { mesaj:'No line items found', sebep:'Dönem yanlış, maliyet yeri yanlış veya hiç kayıt yok.', cozum:'Kontrol alanı ve dönem aralığını kontrol et. Maliyet yeri geçerlilik aralığında olmalı.' },
        ],
        ipucu:'Bu rapor **CO’dan FI’a inen köprüdür**: bir kaleme çift tıklayınca ' +
              'FI belgesine ulaşılır ve "bu gider kim tarafından, hangi faturayla girildi?" ' +
              'sorusu anında cevaplanır.\n\n' +
              'Maliyet yeri sorumlularının aylık rutini bu rapor olmalıdır — ' +
              'yanlış atamaları yakalamanın **tek pratik yolu** budur.',
        ilgili:['KB11N','S_ALR_87013611','FB03'] },

      { kod:'KB11N', ad:'CO içi yeniden kayıt — **doğru düzeltme yöntemi**',
        amac:'Yanlış CO nesnesine düşen gideri CO içinde taşır.',
        neZaman:'Yanlış maliyet yeri girildiğinde. **FI doğruysa her zaman bu kullanılır.**',
        adimlar:[
          { baslik:'Kaynak ve hedef CO nesnesini gir',
            aciklama:'Örneğin 3100 Üretim → 4200 Pazarlama.' },
          { baslik:'Masraf türü ve tutarı gir' },
          { baslik:'Referans belgeyi gir',
            aciklama:'Hangi FI belgesinden kaynaklandığı — izlenebilirlik için önemli.' },
          { baslik:'Kaydet',
            aciklama:'**CO belgesi oluşur, FI belgesi oluşmaz.** Mizan değişmez.' },
        ],
        ekranAkisi:[
          { ekran:'Başlık', islem:'Kayıt tarihi 13.10.2027 · masraf türü 770100' },
          { ekran:'Kalemler', islem:'Kaynak 3100 · hedef 4200 · 180.000 TL' },
          { ekran:'Sonuç', islem:'CO belgesi 100002841 · **FI belgesi yok**' },
        ],
        alanlar:{
          zorunlu:['Kaynak CO nesnesi','Hedef CO nesnesi','Masraf türü','Tutar'],
          opsiyonel:['Referans belge','Metin'] },
        hatalar:[
          { mesaj:'Cost element ... not valid for this posting', sebep:'Masraf türü tanımsız veya kategori uygun değil.', cozum:'{{KA03}} ile masraf türünü ve kategorisini kontrol et.' },
          { mesaj:'Period is not open in CO', sebep:'CO dönemi kapalı.', cozum:'CO dönem kilidini kontrol et — FI döneminden **ayrıdır**.' },
        ],
        ipucu:'**Bu işlemin varlık sebebi şudur:** yanlış maliyet yeri bir FI hatası değildir. ' +
              'Gider tutarı doğru, hesap doğru, mizan doğru — yalnızca CO etiketi yanlış.\n\n' +
              '{{FB08}} ile ters kaydetmek mizanda **üç belge** (asıl + ters + yeni) yaratır, ' +
              'satıcı hesabını kirletir ve KDV beyanında gereksiz satırlar üretir.\n\n' +
              '{{KB11N}} tek CO belgesiyle, **FI’a hiç dokunmadan** çözer. ' +
              'Bu ayrımı bilmek, FI hatası ile CO hatasını birbirine karıştırmamanın anahtarıdır.',
        ilgili:['KSB1','KA03','FB08'] },

      { kod:'OKB9', ad:'Varsayılan hesap ataması',
        amac:'Kullanıcı CO nesnesi girmediğinde kullanılacak varsayılanı tanımlar.',
        neZaman:'Sabit bir birime ait gider hesaplarında; kullanıcı hatasını azaltmak için.',
        adimlar:[
          { baslik:'Şirket kodu ve masraf türünü gir' },
          { baslik:'Varsayılan CO nesnesini gir',
            aciklama:'Maliyet yeri veya iç sipariş.' },
          { baslik:'Gerekirse iş alanı/değerleme alanı bazında detaylandır',
            aciklama:'"Detay" göstergesiyle daha ince kurallar tanımlanabilir.' },
        ],
        alanlar:{
          zorunlu:['Şirket kodu','Masraf türü','Varsayılan CO nesnesi'],
          opsiyonel:['İş alanı','Değerleme alanı','Kâr merkezi'] },
        hatalar:[
          { mesaj:'Account ... requires an assignment to a CO object', sebep:'Masraf türü var ama CO nesnesi girilmemiş ve {{OKB9}} tanımı yok.', cozum:'Ya kayıtta maliyet yeri gir ya {{OKB9}} ile varsayılan tanımla. **En sık CO entegrasyon hatasıdır.**' },
        ],
        ipucu:'{{OKB9}} kullanıcı hatasını azaltır ama **iki ucu keskindir**: ' +
              'varsayılan tanımlanınca kullanıcı düşünmeyi bırakır ve ' +
              'gerçekten farklı bir maliyet yerine ait giderler de ' +
              'varsayılana düşer.\n\n' +
              '**Doğru kullanım:** yalnızca gerçekten sabit olan hesaplarda tanımla ' +
              '(kira, sigorta, abonelik). Değişken hesaplarda (770 genel gider) ' +
              'tanımlama — kullanıcı düşünsün.',
        ilgili:['KA03','KSB1','FB50'] },

      { kod:'KSV5', ad:'Maliyet yeri devri (assessment)',
        amac:'Ortak giderleri devir masraf türü altında hedeflere aktarır.',
        neZaman:'Ay sonu kapanışında; teknik maliyet yerlerini sıfırlamak için.',
        adimlar:[
          { baslik:'Devir döngüsünü (cycle) seç' },
          { baslik:'Dönemi gir' },
          { baslik:'**Test modunda çalıştır**',
            aciklama:'Dağıtım oranlarını ve tutarları kontrol et.' },
          { baslik:'Gerçek modda çalıştır' },
          { baslik:'Kaynak maliyet yerinin **sıfırlandığını** doğrula',
            aciklama:'Sıfırlanmıyorsa döngü tüm masraf türlerini kapsamıyor demektir.' },
        ],
        ipucu:'**Kontrol noktası:** dağıtım sonrası teknik maliyet yerlerinin bakiyesi ' +
              '**sıfır olmalıdır**. Sıfır değilse döngü bazı masraf türlerini kapsamıyor ' +
              've o giderler hiçbir birime ulaşmıyor demektir.\n\n' +
              'Bu kontrol ay sonu kapanış listesine konmalıdır — ' +
              'dağıtımın doğru çalıştığının en basit ve en güvenilir göstergesidir.',
        hatalar:[
          { mesaj:'Sender cost center still has balance after assessment', sebep:'Döngü bazı masraf türlerini kapsamıyor.', cozum:'Döngü segmentindeki masraf türü grubunu genişlet.' },
        ],
        ilgili:['KSU5','KSB1','closing'] },

      { kod:'S_ALR_87013611', ad:'Maliyet yeri plan/gerçek karşılaştırma',
        amac:'Maliyet yeri bazında plan, gerçek ve sapmayı gösterir.',
        neZaman:'Aylık yönetim raporlamasında; bütçe toplantılarında.',
        adimlar:[
          { baslik:'Kontrol alanı, mali yıl ve dönemi gir' },
          { baslik:'Maliyet yeri veya grubunu seç' },
          { baslik:'Rapor: masraf türü bazında plan / gerçek / sapma' },
          { baslik:'Sapan kalemlerde {{KSB1}}’e in ve detayı incele' },
        ],
        ipucu:'**Yanlış maliyet yeri atamalarının yakalandığı yer burasıdır.** ' +
              'Bütçe sapması beklenmedikse ({{KSB1}} ile) kalemler incelenir ve ' +
              '"reklam gideri Üretim’de ne arıyor?" sorusu sorulur.\n\n' +
              'Plan girilmemişse bu rapor işe yaramaz — ' +
              '{{KP06}} ile plan verisi girilmesi gerekir.',
        ilgili:['KSB1','KP06','KB11N'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Maliyet yeri entegrasyonunun tablo mimarisi **S/4HANA’da köklü değişti**: ' +
      'ECC’de FI ({{BSEG}}) ve CO ({{COEP}}) ayrı tablolardaydı ve mutabakat gerekiyordu. ' +
      'S/4HANA’da ikisi **{{ACDOCA}}’da tek satır**.',

    liste:[
      { ad:'CSKS', baslik:'Maliyet yeri ana verisi',
        tutar:'Maliyet yerlerinin tanımı, sorumlusu ve **kâr merkezi ataması**.',
        olusturan:'{{KS01}}',
        guncelleyen:'{{KS02}}',
        anahtar:'KOKRS + KOSTL + **DATBI**',
        iliskiler:'{{ACDOCA}} `KOSTL` bu tabloya bakar; `PRCTR` alanı kâr merkezini türetir.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KOKRS', aciklama:'{{kontrol-alani}}', tip:'pk' },
          { ad:'KOSTL', aciklama:'Maliyet yeri kodu', tip:'pk' },
          { ad:'DATBI', aciklama:'**Geçerlilik bitiş tarihi — anahtarın parçası.** ' +
                   'Aynı kod farklı dönemlerde farklı ayarlara sahip olabilir.' },
          { ad:'PRCTR', aciklama:'**{{kar-merkezi}}** — FI kaydına buradan türetilir', tip:'fk' },
          { ad:'VERAK', aciklama:'Sorumlu kişi' },
        ] },

      { ad:'CSKB', baslik:'Masraf türü ana verisi',
        tutar:'G/L hesabının CO karşılığı ve **kategorisi**.',
        olusturan:'{{KA01}}',
        guncelleyen:'{{KA02}}',
        anahtar:'KOKRS + KSTAR + DATBI',
        iliskiler:'Masraf türü numarası **G/L hesap numarasıyla aynıdır**.',
        s4:'S/4HANA’da masraf türü G/L hesabının **özelliği** oldu ({{FS00}} içinde); ' +
           'ayrı {{KA01}} zorunluluğu kalktı.',
        alanlar:[
          { ad:'KSTAR', aciklama:'Masraf türü = **G/L hesap numarası**', tip:'pk' },
          { ad:'KATYP', aciklama:'**Kategori:** 1 birincil · 11 gelir · 42 devir · 43 hizmet aktarımı' },
        ] },

      { ad:'ACDOCA', baslik:'Evrensel kayıt defteri — FI ve CO birlikte',
        tutar:'FI ve CO satırları **aynı tabloda**; maliyet yeri, kâr merkezi ve ' +
              'hesap aynı satırda.',
        olusturan:'Her FI/CO belgesi',
        guncelleyen:'Belge kaydı; CO içi hareketler de buraya yazılır',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{CSKS}} ile `KOSTL` üzerinden; {{CSKB}} ile `RACCT` üzerinden.',
        s4:'**S/4HANA’nın en büyük değişikliği burada:** ' +
           '{{COEP}} ile {{BSEG}} birleşti, mutabakat kavramı ortadan kalktı.',
        alanlar:[
          { ad:'KOSTL', aciklama:'**Maliyet yeri** — CO boyutu, FI satırıyla aynı yerde' },
          { ad:'PRCTR', aciklama:'{{kar-merkezi}} — maliyet yerinden türetilir' },
          { ad:'RACCT', aciklama:'Hesap / masraf türü — **aynı numara**' },
          { ad:'AUFNR', aciklama:'{{ic-siparis}} — varsa' },
          { ad:'HSL', aciklama:'Yerel para birimi tutarı' },
        ] },

      { ad:'COEP', baslik:'CO gerçek kalemleri (ECC)',
        tutar:'ECC’de CO tarafındaki kalemler — FI’dan **ayrı** tablo.',
        olusturan:'FI kaydı veya CO işlemi',
        anahtar:'KOKRS + BELNR + BUZEI',
        s4:'**{{ACDOCA}} ile birleşti.** Uyumluluk görünümü olarak okunabilir.',
        alanlar:[
          { ad:'OBJNR', aciklama:'CO nesnesi — kodlanmış maliyet yeri/sipariş' },
          { ad:'KSTAR', aciklama:'Masraf türü', tip:'fk' },
        ] },

      { ad:'AUFK', baslik:'İç sipariş ana verisi',
        tutar:'Geçici maliyet toplama nesneleri.',
        olusturan:'{{KO01}}',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'AUFNR', aciklama:'Sipariş numarası', tip:'pk' },
          { ad:'AUART', aciklama:'Sipariş tipi' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri',
        tutar:'FI kalemleri; `KOSTL` alanı burada da vardır.',
        olusturan:'Belge kaydı',
        s4:'{{uyumluluk-view}} — {{ACDOCA}}’dan türetilir.' },
    ],

    er:{
      type:'er',
      baslik:'FI–CO köprüsü: S/4HANA’da tek tablo',
      varliklar:[
        { ad:'CSKS', rol:'CO ana veri', aciklama:'Maliyet yeri',
          alanlar:[{ ad:'KOKRS', tip:'pk' }, { ad:'KOSTL', tip:'pk' }, { ad:'DATBI', tip:'pk' }, { ad:'PRCTR', tip:'fk' }] },
        { ad:'CSKB', rol:'CO ana veri', aciklama:'Masraf türü',
          alanlar:[{ ad:'KSTAR', tip:'pk' }, { ad:'KATYP' }] },
        { ad:'SKB1', rol:'FI ana veri', aciklama:'G/L hesabı (şirket kodu)',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }] },
        { ad:'ACDOCA', rol:'Evrensel', hub:true, aciklama:'**FI + CO tek satırda**',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'RACCT', tip:'fk' }, { ad:'KOSTL', tip:'fk' }, { ad:'PRCTR' }, { ad:'AUFNR', tip:'fk' }] },
        { ad:'AUFK', rol:'CO ana veri', aciklama:'İç sipariş',
          alanlar:[{ ad:'AUFNR', tip:'pk' }, { ad:'AUART' }] },
        { ad:'COEP', rol:'ECC', aciklama:'CO kalemleri (eski)',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'KSTAR', tip:'fk' }] },
        { ad:'BKPF', rol:'FI', aciklama:'Belge başlığı',
          alanlar:[{ ad:'BELNR', tip:'pk' }] },
      ],
      iliskiler:[
        { from:'SKB1', to:'CSKB', alanlar:'SAKNR → KSTAR', not:'**aynı numara**' },
        { from:'CSKB', to:'ACDOCA', alanlar:'KSTAR → RACCT', not:'masraf türü' },
        { from:'CSKS', to:'ACDOCA', alanlar:'KOSTL', not:'**maliyet yeri**' },
        { from:'CSKS', to:'ACDOCA', alanlar:'PRCTR', not:'kâr merkezi türetmesi' },
        { from:'AUFK', to:'ACDOCA', alanlar:'AUFNR', not:'iç sipariş' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'başlık → kalem' },
        { from:'ACDOCA', to:'COEP', alanlar:'BELNR', not:'ECC karşılığı' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Kullanıcı açısından maliyet yeri **tek bir alandır** — ama o alan boş kalırsa ' +
      'belge kaydedilemez. Danışman açısından ise üç ekran önemlidir: ' +
      '{{KS01}} (ana veri), {{OKB9}} (varsayılan) ve {{KB11N}} (düzeltme).',

    ekranlar:[
      { ad:'Kayıt ekranı — maliyet yeri alanı ({{FB50}} / {{FB60}} / {{MIRO}})',
        aciklama:'Kullanıcının CO ile tek teması.',
        alanlar:[
          { ad:'Maliyet yeri', zorunlu:false, aciklama:'**Masraf türü varsa fiilen zorunludur.** ' +
                   'Boşsa {{OKB9}} varsayılanı denenir; o da yoksa belge **kaydedilemez**.' },
          { ad:'İç sipariş', zorunlu:false, aciklama:'Maliyet yeri yerine kullanılabilir.' },
          { ad:'Kâr merkezi', zorunlu:false, aciklama:'**Otomatik dolar** — maliyet yerinden türetilir.' },
        ],
        ipucu:'Alan yalnızca **gelir tablosu hesaplarında** görünür/anlamlıdır. ' +
              'Satıcı, banka, stok satırlarında maliyet yeri sorulmaz — ' +
              'çünkü bilanço hesapları "harcanmaz".\n\n' +
              '"Bu satırda maliyet yeri alanı neden yok?" sorusunun cevabı budur.' },

      { ad:'{{KS01}} — maliyet yeri ana verisi',
        aciklama:'Maliyet yerinin tanımlandığı ekran.',
        alanlar:[
          { ad:'Maliyet yeri + geçerlilik aralığı', zorunlu:true, aciklama:'**Aralık anahtarın parçasıdır** — ' +
                   'aynı kod farklı dönemlerde farklı ayarlara sahip olabilir.' },
          { ad:'Ad ve sorumlu', zorunlu:true },
          { ad:'Maliyet yeri tipi', zorunlu:true, aciklama:'Üretim, hizmet, yönetim, satış.' },
          { ad:'**Kâr merkezi**', zorunlu:false, aciklama:'Teknik olarak zorunlu değil ama ' +
                   '**pratikte zorunludur** — belge bölme etkinse boşluk belgeyi reddettirir.' },
          { ad:'Hiyerarşi alanı', zorunlu:true, aciklama:'Raporlarda gruplama.' },
        ],
        ipucu:'**Geçerlilik aralığı mantığını anla:** maliyet yerini "kapatmak" için ' +
              'silinmez — geçerlilik bitiş tarihi geçmişe çekilir. ' +
              'Böylece geçmiş kayıtlar korunur, yeni kayıt yapılamaz.\n\n' +
              'Aynı mantıkla sorumlu değişikliği yeni bir zaman dilimi açar; ' +
              'geçmiş raporlarda eski sorumlu görünmeye devam eder.' },

      { ad:'{{OKB9}} — varsayılan hesap ataması',
        aciklama:'Kullanıcı CO nesnesi girmediğinde devreye giren kural.',
        alanlar:[
          { ad:'Şirket kodu', zorunlu:true },
          { ad:'Masraf türü', zorunlu:true, aciklama:'Hangi hesap için varsayılan tanımlanıyor.' },
          { ad:'Maliyet yeri / iç sipariş', zorunlu:true, aciklama:'Varsayılan CO nesnesi.' },
          { ad:'Detay göstergesi', zorunlu:false, aciklama:'İş alanı veya değerleme alanı bazında ' +
                   'daha ince kurallar.' },
        ],
        ipucu:'**İki ucu keskin bir araçtır.** Kullanıcı hatasını azaltır ama ' +
              'kullanıcının düşünmesini de engeller: gerçekten başka bir birime ait ' +
              'giderler sessizce varsayılana düşer.\n\n' +
              '**Doğru kullanım:** yalnızca sabit hesaplarda tanımla (kira, sigorta, abonelik). ' +
              'Genel gider hesaplarında tanımlama — kullanıcı düşünsün ve ' +
              'boş bıraktığında hata alsın.' },

      { ad:'{{KB11N}} — CO içi düzeltme',
        aciklama:'Yanlış CO nesnesinin düzeltildiği ekran.',
        alanlar:[
          { ad:'Kaynak CO nesnesi', zorunlu:true },
          { ad:'Hedef CO nesnesi', zorunlu:true },
          { ad:'Masraf türü ve tutar', zorunlu:true },
          { ad:'Referans belge', zorunlu:false, aciklama:'İzlenebilirlik için **girilmelidir**.' },
        ],
        ipucu:'**FI belgesi oluşmaz, mizan değişmez.** ' +
              'Bu, aracın varlık sebebidir: yanlış maliyet yeri bir FI hatası değildir.\n\n' +
              'Referans belge alanını doldur — altı ay sonra ' +
              '"bu 180.000 TL neden taşınmış?" sorusuna cevap ancak böyle verilebilir.' },
    ],

    zorunlu:['Maliyet yeri (masraf türü varsa)','Kontrol alanı','Geçerlilik aralığı','Masraf türü kategorisi'],
    opsiyonel:['İç sipariş','Kâr merkezi (türetilir)','{{OKB9}} varsayılanı'],

    hatalar:[
      { mesaj:'Account ... requires an assignment to a CO object', sebep:'Hesabın masraf türü var ama CO nesnesi girilmemiş ve {{OKB9}} tanımı yok.', cozum:'Kayıtta maliyet yeri gir veya {{OKB9}} ile varsayılan tanımla. **En sık CO entegrasyon hatasıdır.**' },
      { mesaj:'Cost center ... does not exist on ...', sebep:'Maliyet yeri o tarihte geçerli değil ({{CSKS}} `DATBI`).', cozum:'Geçerlilik aralığını kontrol et. Kapatılmış maliyet yerine geçmiş tarihli kayıt yapılamaz.' },
      { mesaj:'Cost element ... does not exist', sebep:'G/L hesabının masraf türü tanımlanmamış.', cozum:'{{KA01}} ile tanımla (S/4HANA’da {{FS00}} içinde hesap tipini "birincil masraf" yap).' },
      { mesaj:'Balancing field "Profit Center" in line item ... not filled', sebep:'Maliyet yerine kâr merkezi atanmamış ve {{belge-bolme}} etkin.', cozum:'{{KS02}} ile maliyet yerine kâr merkezi ata. **Hata belge bölmede görünür ama sebep CO ana verisindedir.**' },
      { mesaj:'Period is not open in CO (KB11N)', sebep:'CO dönemi kapalı.', cozum:'CO dönem kilidi FI’dan **ayrıdır**; ayrıca açılmalıdır.' },
      { mesaj:'Sender cost center still has balance after assessment', sebep:'Devir döngüsü bazı masraf türlerini kapsamıyor.', cozum:'Döngü segmentindeki masraf türü grubunu genişlet. **Teknik maliyet yerleri ay sonunda sıfırlanmalıdır.**' },
    ],

    ipuclari:[
      '**Yanlış maliyet yerini {{KB11N}} ile düzelt**, {{FB08}} ile ters kaydetme — ' +
      'FI zaten doğrudur.',
      '{{OKB9}} varsayılanlarını **yalnızca sabit hesaplarda** tanımla; ' +
      'değişken hesaplarda kullanıcı düşünmelidir.',
      'Maliyet yeri ana verisinde **kâr merkezini boş bırakma** — ' +
      'belge bölme etkinse kayıtlar reddedilir ve sebep CO’da aranmaz.',
      'Ay sonunda teknik maliyet yerlerinin **sıfırlandığını** doğrula; ' +
      'dağıtımın doğru çalıştığının en basit kontrolüdür.',
      'Maliyet yeri sorumlularına aylık {{KSB1}} gözden geçirmesini rutinleştir — ' +
      'yanlış atamaları yakalamanın tek pratik yolu.',
      'CO dönem kilidinin FI’dan **ayrı** olduğunu unutma; kapanışta ikisi de yönetilir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ACDOCA', ne:'`KOSTL` maliyet yeri, `PRCTR` kâr merkezi, `RACCT` hesap — **tek satırda**' },
      { tablo:'BSEG', ne:'FI kalemi; `KOSTL` alanı da var' },
      { tablo:'BKPF', ne:'Belge başlığı' },
      { tablo:'COEP', ne:'ECC’de ayrı CO kalemi — S/4’te {{ACDOCA}}’ya taşındı' },
      { tablo:'CSKS', ne:'Maliyet yeri ana verisi (okunur)' },
      { tablo:'CSKB', ne:'Masraf türü ana verisi (okunur)' },
    ],

    commit:
      'FI ve CO kaydı **aynı LUW’da** yazılır — bu, "gerçek zamanlı entegrasyonun" ' +
      'teknik anlamıdır.\n\n' +
      'ECC’de bile bu böyleydi ({{BSEG}} ve {{COEP}} aynı commit’te yazılırdı), ' +
      'ama **iki ayrı tabloya** yazıldığı için teorik olarak tutarsızlık mümkündü ' +
      've mutabakat raporları vardı.\n\n' +
      'S/4HANA’da **tek satır** yazıldığı için tutarsızlık ' +
      '**yapısal olarak imkânsızdır**. FI–CO mutabakatı bir kavram olarak ortadan kalkmıştır.\n\n' +
      'Kritik detay: **CO kaydı başarısız olursa FI kaydı da olmaz.** ' +
      'Örneğin CO numara aralığı ({{KANK}}) tanımlı değilse, ' +
      'gider kaydı hiç oluşmaz — hata FI ekranında görünür ama sebebi CO’dadır.',

    belgeNo:
      'ECC’de FI ve CO **ayrı belge numaraları** alırdı: ' +
      'FI belgesi {{FBN1}} aralığından, CO belgesi {{KANK}} aralığından.\n\n' +
      'S/4HANA’da tek belge numarası vardır; CO satırları aynı {{ACDOCA}} belgesinin ' +
      'parçasıdır.\n\n' +
      '**Ama CO içi işlemler** ({{KB11N}}, {{KSV5}}, {{KO88}}) hâlâ kendi ' +
      'CO belge numaralarını alır — çünkü onların FI karşılığı yoktur. ' +
      '{{KANK}} aralıklarının tanımlı olması bu yüzden hâlâ gereklidir.',

    postingLogic:
      'Bir gider kaydında CO ataması şu sırayla belirlenir:\n\n' +
      '**1.** Hesabın **masraf türü** var mı? Yoksa CO’ya hiç yansımaz, iş biter.\n' +
      '**2.** Kullanıcı CO nesnesi (maliyet yeri / iç sipariş) girdi mi? Girdiyse kullanılır.\n' +
      '**3.** Girmediyse **{{OKB9}}** varsayılanı aranır.\n' +
      '**4.** O da yoksa → *"Account requires an assignment to a CO object"* → ' +
      '**belge kaydedilemez**.\n' +
      '**5.** CO nesnesi bulunduysa, ondan **kâr merkezi türetilir** ({{CSKS}} `PRCTR`).\n' +
      '**6.** {{belge-bolme}} etkinse bu kâr merkezi bölme karakteristiği olarak kullanılır.\n' +
      '**7.** {{ACDOCA}}’ya tek satır yazılır: hesap + maliyet yeri + kâr merkezi.\n\n' +
      '4. maddedeki hata en sık CO entegrasyon hatasıdır ve ' +
      'çözümü **iki yönlüdür**: ya kullanıcı girsin ya {{OKB9}} tanımlansın.',

    belgeTuru:
      'Belge türü CO atamasını doğrudan etkilemez. ' +
      'Ama {{OBA7}}’de belge türüne izin verilen hesap tipleri, ' +
      'gider hesabının kullanılıp kullanılamayacağını belirler.\n\n' +
      'CO içi işlemler ({{KB11N}}) FI belge türü kullanmaz — ' +
      'kendi CO iş işlemi tipine sahiptirler.',

    numberRange:
      '**{{KANK}} — CO numara aralıkları**, iş işlemi bazında tanımlanır: ' +
      'gerçek kayıtlar (COIN), yeniden kayıt (RKU1), devir (RKIU), ' +
      'yerleşim (KOAO) gibi.\n\n' +
      '**Kritik davranış:** CO numara aralığı tanımlı değilse ' +
      'o iş işlemi çalışmaz — ve **FI kaydı da başarısız olur**, ' +
      'çünkü ikisi aynı LUW’dadır.\n\n' +
      'Yılbaşında CO aralıklarının da açılması gerekir; ' +
      'FI aralıkları açılıp CO unutulursa gider kayıtları durur ve ' +
      'hata mesajı sebebi net söylemez.',

    accountDetermination:
      'Maliyet yerinin kendi hesap belirlemesi yoktur. ' +
      'Ama iki türetme zinciri vardır:\n\n' +
      '**1. Kâr merkezi türetmesi:** maliyet yeri → {{CSKS}} `PRCTR` → kalem.\n' +
      '**2. Varsayılan CO nesnesi:** hesap → {{OKB9}} → maliyet yeri/sipariş.\n\n' +
      'Ayrıca {{KSV5}} devri için **devir masraf türü** (kategori 42) tanımlanmalıdır; ' +
      'bu, FI hesabı olmayan bir CO nesnesidir. ' +
      'S/4HANA’da ise G/L hesabı olarak da açılır (ikincil masraf türleri ' +
      'hesap planına dâhil edildi).',

    tur:
      '**Özelleştirme:** {{kontrol-alani}} ayarları ({{OKKP}}), CO numara aralıkları ({{KANK}}), ' +
      '{{OKB9}} varsayılan atamaları, devir/dağıtım döngüleri.\n\n' +
      '**Ana veri:** maliyet yerleri ({{CSKS}}), masraf türleri ({{CSKB}}), ' +
      'iç siparişler ({{AUFK}}), maliyet yeri hiyerarşisi.\n\n' +
      '**Hareket verisi:** {{ACDOCA}} satırları, CO içi belgeler.',

    transport:
      'Kontrol alanı ayarları, {{OKB9}} atamaları ve numara aralıkları taşınır. ' +
      '**Ama maliyet yerleri ve masraf türleri ana veridir ve taşınmaz** — ' +
      'hedef sistemde ayrıca oluşturulmalıdır.\n\n' +
      'Bu, klasik bir geçiş sorunu yaratır: {{OKB9}} varsayılanları taşınır ama ' +
      'referans verdikleri maliyet yerleri canlıda yoksa ' +
      'kayıtlar *"Cost center does not exist"* hatası verir.\n\n' +
      '**Geçiş kontrolü:** {{OKB9}} tablosundaki tüm maliyet yerlerinin ' +
      'canlıda mevcut ve **geçerlilik aralığında** olduğunu doğrula.',

    img:[
      { yol:'SPRO → Kontrolörlük → Genel Kontrolörlük → Organizasyon → Kontrol Alanını Koru', not:'{{OKKP}} → {{TKA01}}' },
      { yol:'SPRO → Kontrolörlük → Genel Kontrolörlük → Organizasyon → Numara Aralıklarını Koru', not:'{{KANK}} — **eksikse FI kaydı da durur**' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe Muhasebesi → İş İşlemleri → Varsayılan Hesap Atamasını Tanımla', not:'{{OKB9}}' },
      { yol:'SPRO → Kontrolörlük → Maliyet Yeri Muhasebesi → Ana Veri → Maliyet Yerleri', not:'{{KS01}} · standart hiyerarşi' },
    ],

    ekstra:[
      { ic:'🔧', baslik:'Neden {{KB11N}}, neden {{FB08}} değil?', metin:
        'Yanlış maliyet yerine düşen bir gider için iki düzeltme yolu vardır ve ' +
        'aralarındaki fark **danışmanlık kalitesini gösterir**.\n\n' +
        '**Yanlış yol — {{FB08}} ile ters kayıt:**\n' +
        'Asıl belge ters kaydedilir, doğru maliyet yeriyle yeniden girilir. ' +
        'Sonuç: mizanda **üç belge** (asıl + ters + yeni), satıcı hesabında ' +
        'üç hareket, KDV beyanında üç satır. ' +
        'Denetimde "bu ters kayıtlar neden?" sorusu doğar ve ' +
        'her biri açıklanmak zorunda kalır.\n\n' +
        '**Doğru yol — {{KB11N}} ile CO içi taşıma:**\n' +
        'Tek CO belgesi oluşur. FI’a **hiç dokunulmaz**: ' +
        'mizan aynı, satıcı hesabı aynı, KDV aynı. ' +
        'Yalnızca CO nesnesi değişir.\n\n' +
        '**Ayrımın mantığı şudur:** yanlış maliyet yeri bir **FI hatası değildir**. ' +
        'Gider tutarı doğru, hesap doğru, dönem doğru. ' +
        'Yanlış olan yalnızca **yönetim muhasebesi etiketidir** ve ' +
        'o etiket CO’da yaşar.\n\n' +
        '**Genel ilke:** hatayı **oluştuğu katmanda** düzelt. ' +
        'FI hatası FI’da, CO hatası CO’da düzeltilir. ' +
        'Bu ilke MM ve SD entegrasyonlarında da geçerlidir ' +
        '(kaynak modülden iptal kuralı).' },

      { ic:'📅', baslik:'Geçerlilik aralığı: maliyet yeri silinmez, kapatılır', metin:
        '{{CSKS}} anahtarının **üçüncü alanı `DATBI`** (geçerlilik bitiş tarihi) ' +
        've bu, ana veri tasarımında önemli bir tercihtir.\n\n' +
        'Bir departman kapandığında maliyet yeri **silinmez** — ' +
        'silinemez de, çünkü geçmiş kayıtlar ona referans verir.\n\n' +
        'Bunun yerine geçerlilik bitiş tarihi geçmişe çekilir. Sonuç:\n\n' +
        '• Geçmiş kayıtlar **korunur** ve raporlanabilir\n' +
        '• Yeni kayıt **yapılamaz** (*"Cost center does not exist on [tarih]"*)\n' +
        '• Rapor sorguları eski dönemler için hâlâ çalışır\n\n' +
        'Aynı mekanizma **değişiklikler** için de kullanılır: ' +
        'maliyet yerinin sorumlusu veya kâr merkezi değişirse ' +
        '{{KS02}} yeni bir zaman dilimi açar.\n\n' +
        '**Pratik sonuç:** kâr merkezi değişikliği **geçmişe etki etmez**. ' +
        'Eski kayıtlar eski kâr merkezinde kalır, yeni kayıtlar yeniye gider. ' +
        'Bu, "geçmiş raporları neden değişmedi?" sorusunun cevabıdır — ' +
        've doğru davranıştır: raporların geçmişe dönük değişmemesi ' +
        'muhasebenin temel beklentisidir.' },
    ],

    notlar:[
      { tip:'warn', baslik:'CO numara aralığı eksikse FI kaydı da durur', metin:
        '{{KANK}} ile tanımlanan CO numara aralıkları, iş işlemi bazındadır ' +
        '(COIN gerçek kayıt, RKU1 yeniden kayıt, RKIU devir…).\n\n' +
        'Bir aralık tanımlı değilse veya tükendiyse, o iş işlemi çalışmaz. ' +
        '**Ve FI kaydı da başarısız olur** — çünkü ikisi aynı LUW’dadır.\n\n' +
        'Kullanıcı {{FB50}} ekranında hata alır ama mesaj CO’yu işaret eder ve ' +
        'sebep FI tarafında aranır. Klasik senaryo: yılbaşında FI numara aralıkları ' +
        'açılır, **CO unutulur** ve 1 Ocak sabahı gider kayıtları durur.\n\n' +
        '**Önlem:** yıl sonu kapanış listesine "CO numara aralıkları açıldı mı?" ' +
        'maddesini FI aralıklarının **hemen yanına** ekle.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'S/4HANA’nın FI–CO alanındaki **en büyük değişikliği burada**: ' +
      '{{ACDOCA}} ile FI ve CO satırları aynı tabloda birleşti. ' +
      'Masraf türü artık ayrı bir ana veri değil, **G/L hesabının özelliği**. ' +
      'FI–CO mutabakatı bir kavram olarak ortadan kalktı.',

    eccFarklari:[
      { konu:'Kalem verisi', ecc:'{{BSEG}} (FI) + {{COEP}} (CO) — **ayrı**', s4:'**{{ACDOCA}}** — tek satır' },
      { konu:'Masraf türü', ecc:'Ayrı ana veri ({{KA01}} → {{CSKB}})', s4:'**G/L hesabının özelliği** ({{FS00}} içinde)' },
      { konu:'İkincil masraf türü', ecc:'FI hesap planında **yok**', s4:'**G/L hesabı olarak da açılır**' },
      { konu:'FI–CO mutabakatı', ecc:'Rapor + gerçek zamanlı aktarım', s4:'**Kavram olarak yok** — aynı tablo' },
      { konu:'Maliyet yeri ana verisi', ecc:'{{KS01}} → {{CSKS}}', s4:'**Değişmedi**' },
      { konu:'Dağıtım / devir', ecc:'{{KSU5}} / {{KSV5}}', s4:'Aynı + Fiori uygulamaları' },
      { konu:'Raporlama', ecc:'CO raporları ayrı, FI raporları ayrı', s4:'Tek kaynaktan, boyut filtreleriyle' },
    ],

    universalJournal:
      '{{ACDOCA}}’nın maliyet yeri entegrasyonuna etkisi **en somut olduğu yerdir**.\n\n' +
      'ECC’de bir gider kaydı iki tabloya yazılırdı: {{BSEG}} (FI boyutu) ve ' +
      '{{COEP}} (CO boyutu). Aynı olayın iki kaydı vardı ve teorik olarak ' +
      'tutarsız olabilirlerdi. Bu yüzden mutabakat raporları ve ' +
      'gerçek zamanlı aktarım mekanizmaları geliştirilmişti.\n\n' +
      'S/4HANA’da **tek satır** vardır ve `RACCT` (hesap) ile `KOSTL` (maliyet yeri) ' +
      'aynı satırda durur. Tutarsızlık **yapısal olarak imkânsızdır**.\n\n' +
      'Pratik kazanç: "hangi maliyet yerinde hangi hesaptan ne kadar harcandı?" ' +
      'sorusu **tek tablodan, birleştirme olmadan** cevaplanır. ' +
      'ECC’de bu sorgu {{BSEG}} ve {{COEP}} birleştirmesi gerektirirdi.',

    kalkanTcodes:[
      { eski:'{{KA01}} / {{KA02}}', yeni:'{{FS00}}', not:'Masraf türü artık hesabın özelliği; ' +
             '{{KA01}} çalışmaya devam eder ama zorunlu değil' },
      { eski:'FI–CO mutabakat raporları', yeni:'—', not:'**Gereksiz oldu**' },
      { eski:'—', yeni:'—', not:'{{KS01}}, {{KSB1}}, {{KB11N}}, {{OKB9}}, {{KSV5}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Manage Cost Centers', aciklama:'{{KS01}}/{{KS02}} yerine; ana veri yönetimi.' },
      { ad:'Cost Centers — Actual Line Items', aciklama:'{{KSB1}} yerine; FI belgesine geçiş korunur.' },
      { ad:'Cost Centers — Plan/Actual', aciklama:'{{S_ALR_87013611}} yerine; görsel sapma analizi.' },
      { ad:'Repost Costs', aciklama:'{{KB11N}} yerine; CO içi taşıma.' },
      { ad:'Run Assessment / Distribution', aciklama:'{{KSV5}}/{{KSU5}} yerine; dönem sonu dağıtımı.' },
    ],

    compatibilityViews:[
      '{{COEP}} — {{ACDOCA}}’dan türetilen görünüm; eski programlar çalışmaya devam eder.',
      '{{BSEG}} — aynı şekilde uyumluluk görünümü.',
      '{{CSKS}}, {{CSKB}}, {{AUFK}} — **fiziksel tablo olarak duruyor**.',
      'Yeni geliştirmeler {{ACDOCA}}’yı **doğrudan** okumalıdır — görünümler yavaştır.',
    ],

    performans:
      'En büyük kazanç **mutabakat yükünün kalkmasıdır**. ' +
      'ECC’de ay sonunda FI ile CO arasındaki farklar aranır, ' +
      'aktarım hataları düzeltilir, mutabakat raporları çalıştırılırdı — ' +
      'bu iş tamamen ortadan kalktı.\n\n' +
      'Raporlama tarafında da tek tablo okuma, birleştirmeli sorgulardan ' +
      'belirgin şekilde hızlıdır. ' +
      'Ayrıca gider analizleri artık FI ve CO boyutlarını **birlikte** ' +
      'kullanabiliyor: "hangi kâr merkezinde hangi satıcıdan ne kadar alındı?" ' +
      'gibi sorular tek sorguya indi.',

    bestPractices:[
      'Geçişte masraf türlerini G/L hesabı özelliğine dönüştür; ' +
      '**hesap ile masraf türü numarası zaten aynıdır**, dönüşüm mekaniktir.',
      'İkincil masraf türlerinin hesap planına eklenmesini planla — ' +
      'S/4HANA’da G/L hesabı olarak açılırlar.',
      'FI–CO mutabakat raporlarını ve özel programlarını **kaldır**; gereksizler.',
      'Yeni geliştirmelerde {{COEP}} yerine **{{ACDOCA}}** oku.',
      '{{OKB9}} varsayılanlarının referans verdiği maliyet yerlerinin ' +
      'canlıda ve **geçerlilik aralığında** olduğunu doğrula.',
      'CO numara aralıklarını ({{KANK}}) geçiş kontrol listesine ekle — ' +
      'eksikse gider kayıtları durur.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Üretim bütçesi %40 aşıldı: gider yanlış yerde, mizan doğru',
    hikaye:
      '**Marmara Üretim A.Ş.**’nin Ekim ayı yönetim toplantısında ' +
      'Üretim müdürü itiraz ediyor: *"Bütçemiz %40 aşılmış görünüyor ama ' +
      'biz olağandışı hiçbir harcama yapmadık."*\n\n' +
      'Mali işler kontrol ediyor: gelir tablosu doğru, mizan tutuyor, ' +
      'toplam gider bütçeye uygun. Ama **Üretim maliyet yerinde** ' +
      '1.240.000 TL fazla gider var.\n\n' +
      'Bu senaryo, hiçbir muhasebe kontrolünün yakalayamadığı bir hata sınıfını ve ' +
      'doğru düzeltme yöntemini gösteriyor.',
    veriler:[
      { k:'Şirket kodu / Kontrol alanı', v:'1000 / 1000' },
      { k:'Üretim maliyet yeri', v:'3100 · bütçe 3.100.000 TL' },
      { k:'Gerçekleşen', v:'**4.340.000 TL** — %40 sapma' },
      { k:'Pazarlama maliyet yeri', v:'4200 · bütçe 1.800.000 TL' },
      { k:'Pazarlama gerçekleşen', v:'**620.000 TL** — %66 **kullanılmamış**' },
      { k:'Toplam gider', v:'Bütçeye **uygun** — mizan doğru' },
    ],

    adimlar:[
      { baslik:'İlk gözlem — iki sapma birbirini dengeliyor', tcode:'S_ALR_87013611',
        aciklama:'Plan–gerçek raporu tüm maliyet yerleri için alınıyor.',
        girdi:[
          { alan:'3100 Üretim', deger:'Plan 3.100.000 · Gerçek 4.340.000 · **+1.240.000**' },
          { alan:'4200 Pazarlama', deger:'Plan 1.800.000 · Gerçek 620.000 · **−1.180.000**' },
          { alan:'Diğer maliyet yerleri', deger:'Sapma normal aralıkta' },
          { alan:'**Toplam**', deger:'Sapma **+60.000** — ihmal edilebilir' },
        ],
        not:'**İlk ipucu buradadır:** iki sapma birbirini neredeyse tam dengeliyor. ' +
             'Bu desen, gerçek bir bütçe aşımı değil bir **atama hatası** işaretidir.\n\n' +
             'Gerçek aşımda toplam da artardı. Burada toplam neredeyse aynı — ' +
             'yani para harcandı ama **yanlış etiketlendi**.' },

      { baslik:'Kalemler incelenir — desen ortaya çıkıyor', tcode:'KSB1',
        aciklama:'Üretim maliyet yerinin Ekim kalemleri listeleniyor.',
        girdi:[
          { alan:'Toplam kalem', deger:'284' },
          { alan:'Masraf türü 770300 (reklam)', deger:'**18 kalem · 1.240.000 TL**' },
          { alan:'Soru', deger:'**Reklam gideri Üretim maliyet yerinde ne arıyor?**' },
          { alan:'Belge türü', deger:'Hepsi KR (satıcı faturası)' },
        ],
        not:'Reklam gideri bir üretim maliyeti değildir. ' +
             '18 faturanın tamamı Pazarlama’ya ait olmalıydı.\n\n' +
             '{{KSB1}}’in en değerli özelliği burada devreye giriyor: ' +
             'bir kaleme **çift tıklayınca FI belgesine geçiliyor** ve ' +
             '"bu gider kim tarafından, hangi faturayla girildi?" sorusu cevaplanıyor.' },

      { baslik:'Kök sebep — {{OKB9}} varsayılanı', tcode:'OKB9',
        aciklama:'Faturaları giren kullanıcı maliyet yeri yazmamış. Peki 3100 nereden geldi?',
        girdi:[
          { alan:'Kontrol', deger:'{{OKB9}} · şirket 1000 · masraf türü 770300' },
          { alan:'**Tanımlı varsayılan**', deger:'Maliyet yeri **3100 Üretim**' },
          { alan:'Tanımlanma tarihi', deger:'2025 — eski bir organizasyon yapısından kalma' },
          { alan:'O tarihte', deger:'Reklam bütçesi Üretim altındaydı' },
        ],
        not:'**Kök sebep bulundu.** 2025’te organizasyon farklıydı: ' +
             'pazarlama işlevi Üretim’in altındaydı ve {{OKB9}} varsayılanı ' +
             'o zaman doğruydu.\n\n' +
             '2026’da Pazarlama ayrı bir birim oldu, kendi maliyet yeri açıldı (4200) — ' +
             'ama **{{OKB9}} güncellenmedi**.\n\n' +
             'Kullanıcı maliyet yeri yazmadığı için sistem sessizce eski varsayılanı ' +
             'kullanmaya devam etti. **Hiçbir hata mesajı çıkmadı** çünkü ' +
             'varsayılan geçerli bir maliyet yeriydi.' },

      { baslik:'Düzeltme kararı — {{KB11N}} mi, {{FB08}} mi?', tcode:'KB11N',
        aciklama:'İki yöntem değerlendiriliyor.',
        girdi:[
          { alan:'Seçenek 1 — {{FB08}}', deger:'18 belge ters kaydedilir + 18 belge yeniden girilir = **54 belge**' },
          { alan:'Seçenek 1 etkisi', deger:'Satıcı hesabında 36 gereksiz hareket · KDV beyanında 36 satır' },
          { alan:'**Seçenek 2 — {{KB11N}}** ✓', deger:'Tek CO belgesi · **FI’a hiç dokunulmaz**' },
          { alan:'Seçenek 2 etkisi', deger:'Mizan **değişmez** · KDV **değişmez** · satıcı **değişmez**' },
        ],
        not:'**Seçenek 2 seçildi ve sebebi nettir:** FI tarafı **hiç yanlış değil**.\n\n' +
             '770300 hesabına 1.240.000 TL reklam gideri yazılmış — **doğru**. ' +
             'KDV doğru, satıcı borcu doğru, dönem doğru.\n\n' +
             'Yanlış olan tek şey **CO etiketidir**. ' +
             'Hatayı oluştuğu katmanda düzeltmek, ' +
             'FI’ı 36 gereksiz belgeyle kirletmekten iyidir.' },

      { baslik:'CO içi taşıma yapılır', tcode:'KB11N',
        aciklama:'1.240.000 TL Üretim’den Pazarlama’ya taşınıyor.',
        girdi:[
          { alan:'Kaynak', deger:'Maliyet yeri **3100** Üretim' },
          { alan:'Hedef', deger:'Maliyet yeri **4200** Pazarlama' },
          { alan:'Masraf türü', deger:'770300 Reklam gideri' },
          { alan:'Tutar', deger:'1.240.000 TL' },
          { alan:'Referans', deger:'"Ekim reklam giderleri — OKB9 varsayılan hatası"' },
        ],
        fis:{ baslik:'CO belgesi 100003912 — yeniden kayıt', belgeTuru:'CO', tarih:'02.11.2027',
          satirlar:[
            { hesap:'—', ad:'3100 Üretim → 4200 Pazarlama · masraf türü 770300 · 1.240.000 TL', borc:0, alacak:0,
              not:'**FI belgesi oluşmadı**' },
          ], not:'CO belgesi oluştu, FI belgesi **oluşmadı**.\n\n' +
                 '770300 hesabının bakiyesi **değişmedi** (hâlâ 1.240.000 TL), ' +
                 'mizan **değişmedi**, gelir tablosu **değişmedi**.\n\n' +
                 'Yalnızca CO tarafında maliyet, 3100’den çıkıp 4200’e geçti.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'CO içi satırlar: 3100 alacak, 4200 borç · **FI hesabı etkilenmedi**' },
          { tablo:'BKPF', ne:'**Kayıt yok** — FI belgesi oluşmadı' },
        ],
        not:'Referans alanına açıklama yazıldı. ' +
             'Altı ay sonra "bu 1.240.000 TL neden taşınmış?" sorusuna ' +
             'cevap ancak böyle verilebilir.' },

      { baslik:'Doğrulama — plan/gerçek yeniden alınıyor', tcode:'S_ALR_87013611',
        aciklama:'Düzeltmenin etkisi kontrol ediliyor.',
        girdi:[
          { alan:'3100 Üretim', deger:'Plan 3.100.000 · Gerçek **3.100.000** · sapma **0** ✓' },
          { alan:'4200 Pazarlama', deger:'Plan 1.800.000 · Gerçek **1.860.000** · sapma +60.000 ✓' },
          { alan:'Mizan', deger:'**Değişmedi** — 770300 hesabı aynı' },
          { alan:'KDV beyanı', deger:'**Değişmedi**' },
        ],
        not:'Her iki maliyet yeri de bütçesine uygun hâle geldi ve ' +
             'FI tarafında **hiçbir şey değişmedi**.\n\n' +
             'Üretim müdürünün itirazı haklıydı: gerçekten olağandışı harcama yapmamışlardı.' },

      { baslik:'Kök sebep düzeltilir — {{OKB9}} güncellenir', tcode:'OKB9',
        aciklama:'Aynı hatanın tekrarlanmaması için varsayılan düzeltiliyor.',
        girdi:[
          { alan:'Masraf türü 770300', deger:'Varsayılan 3100 → **4200** olarak güncellendi' },
          { alan:'Ek denetim', deger:'**Tüm {{OKB9}} kayıtları** gözden geçirildi' },
          { alan:'Bulunan', deger:'**7 kayıt daha** eski organizasyon yapısına referans veriyor' },
          { alan:'Karar', deger:'Değişken hesaplarda varsayılan **kaldırıldı** — kullanıcı düşünsün' },
        ],
        not:'**En değerli bulgu son satırdadır:** 7 varsayılan daha eskimişti ' +
             've hepsi sessizce yanlış maliyet yerlerine yazıyordu.\n\n' +
             'Karar iki yönlü oldu:\n' +
             '**a)** Gerçekten sabit hesaplarda (kira, sigorta) varsayılan **korundu**.\n' +
             '**b)** Değişken hesaplarda (reklam, danışmanlık, seyahat) varsayılan **kaldırıldı** — ' +
             'artık kullanıcı maliyet yeri girmezse **hata alıyor** ve düşünmek zorunda kalıyor.\n\n' +
             '{{OKB9}}’un "iki ucu keskin" doğası tam olarak budur: ' +
             'kullanıcı hatasını azaltırken kullanıcının düşünmesini de engeller.' },

      { baslik:'Kalıcı önlemler', tcode:'KSB1',
        aciklama:'Hatanın erken yakalanması için rutin kuruluyor.',
        girdi:[
          { alan:'Önlem 1', deger:'Maliyet yeri sorumluları **aylık {{KSB1}}** gözden geçirmesi yapıyor' },
          { alan:'Önlem 2', deger:'{{OKB9}} kayıtları **yıllık** gözden geçiriliyor' },
          { alan:'Önlem 3', deger:'Organizasyon değişikliğinde {{OKB9}} kontrolü **zorunlu adım**' },
          { alan:'Önlem 4', deger:'Değişken hesaplarda varsayılan **tanımlanmıyor**' },
        ],
        not:'**Birinci önlem en etkilisidir:** maliyet yeri sorumlusu kendi kalemlerini ' +
             'aylık gözden geçirirse, "reklam gideri bende ne arıyor?" sorusu ' +
             'bir ay içinde sorulur — yıl sonunu beklemez.\n\n' +
             'Bu hata sınıfının **tek pratik erken uyarısı** budur, ' +
             'çünkü hiçbir muhasebe kontrolü onu yakalayamaz.' },
    ],

    sonuc:
      '**1.240.000 TL yanlış maliyet yerine düştü ve hiçbir muhasebe kontrolü yakalamadı.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Maliyet yeri hataları muhasebe kontrollerini tetiklemez.** ' +
      'Fiş dengeli, mizan tutar, gelir tablosu doğru, KDV doğru, hata mesajı yok. ' +
      'Çünkü yanlış olan **tutar değil etikettir** — toplam gider aynı kalır. ' +
      'Tek erken uyarı: maliyet yeri sorumlusunun aylık {{KSB1}} gözden geçirmesi.\n\n' +
      '**2. Birbirini dengeleyen iki sapma, atama hatası işaretidir.** ' +
      'Bir maliyet yeri +1.240.000, diğeri −1.180.000 ve toplam neredeyse sıfır. ' +
      'Gerçek bütçe aşımında toplam da artardı. ' +
      'Bu desen görüldüğünde önce **atama hatası** aranmalıdır.\n\n' +
      '**3. Yanlış maliyet yeri {{KB11N}} ile düzeltilir, {{FB08}} ile değil.** ' +
      'FI tarafı hiç yanlış değildi: hesap doğru, tutar doğru, KDV doğru. ' +
      'Ters kayıt 18 belge yerine **54 belge** yaratacak, satıcı hesabını ve ' +
      'KDV beyanını gereksiz yere kirletecekti. ' +
      '**Genel ilke: hatayı oluştuğu katmanda düzelt.**\n\n' +
      '**4. {{OKB9}} varsayılanları eskir ve sessizce yanlış yazar.** ' +
      'Organizasyon değişti, maliyet yeri değişti, varsayılan **kalmaya devam etti**. ' +
      'Sistem hata vermedi çünkü varsayılan geçerli bir maliyet yeriydi. ' +
      'Sonuç: değişken hesaplarda varsayılan **tanımlanmamalı** — ' +
      'kullanıcı boş bırakınca hata alsın ve düşünsün. ' +
      'Varsayılan yalnızca gerçekten sabit hesaplarda (kira, sigorta, abonelik) anlamlıdır.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'Maliyet yeri entegrasyonu, gider kaydının **FI’da hesaba, CO’da maliyet yerine** aynı anda yazılmasıdır.',
      'Köprüyü **{{masraf-turu}}** kurar: G/L hesabının CO karşılığı; **numaraları aynıdır**.',
      'Masraf türü varsa **CO nesnesi zorunludur**; yoksa belge kaydedilemez.',
      '{{kar-merkezi}}, maliyet yerinden **otomatik türetilir** ({{CSKS}} `PRCTR`).',
      '**Maliyet yeri yalnızca gelir tablosu hesaplarında** anlamlıdır — bilanço hesapları taşımaz.',
      'Yanlış maliyet yeri **{{KB11N}}** ile CO içinde düzeltilir — **FI belgesi oluşmaz**.',
      '{{OKB9}} varsayılanı kullanıcı hatasını azaltır ama **eskiyip sessizce yanlış yazar**.',
      'S/4HANA’da FI ve CO **{{ACDOCA}}’da tek satır** — mutabakat kavramı ortadan kalktı.',
    ],

    onemliNoktalar:[
      '**"Yanlış maliyet yerine düşen gider nasıl düzeltilir?"** **{{KB11N}}** ile CO içinde taşınır; FI belgesi **oluşmaz**, mizan değişmez. {{FB08}} ile ters kaydetmek yanlıştır — FI zaten doğrudur. **Genel ilke: hatayı oluştuğu katmanda düzelt.**',
      '**"Account requires an assignment to a CO object" hatası ne demek?"** Hesabın masraf türü var ama CO nesnesi girilmemiş ve {{OKB9}} varsayılanı da yok. Çözüm iki yönlü: ya kullanıcı girsin ya varsayılan tanımlansın. **En sık CO entegrasyon hatasıdır.**',
      '**"Kâr merkezi nereden gelir?"** Maliyet yerinden türetilir ({{CSKS}} `PRCTR`). Kullanıcı girmez. Maliyet yerine kâr merkezi atanmamışsa ve {{belge-bolme}} etkinse belge **reddedilir** — hata belge bölmede görünür ama sebep CO ana verisindedir.',
      '**"Hangi satırlar maliyet yeri taşır?"** Yalnızca **gelir tablosu** hesapları. Satıcı, banka, stok gibi bilanço hesapları taşımaz — bir varlık veya borç "harcanmaz".',
      '**"Dağıtım ({{KSU5}}) ile devir ({{KSV5}}) farkı?"** Dağıtım **orijinal masraf türünü korur** (şeffaf, çok satır); devir **devir türü altında toplar** (sade, az satır). İkisi de FI’ı etkilemez.',
      '**"Masraf türü ile G/L hesabı ilişkisi?"** Numaraları **aynıdır**. ECC’de ayrı ana veriydi ({{KA01}}); S/4HANA’da hesabın bir **özelliğidir** ({{FS00}} içinde).',
      '**"S/4HANA’da ne değişti?"** {{BSEG}} + {{COEP}} → tek {{ACDOCA}} satırı. FI–CO mutabakatı **kavram olarak ortadan kalktı**; tutarsızlık yapısal olarak imkânsız.',
      '**"CO numara aralığı eksikse ne olur?"** {{KANK}} tanımı yoksa CO kaydı başarısız olur ve **FI kaydı da olmaz** (aynı LUW). Yılbaşında CO aralıkları da açılmalıdır.',
    ],

    sikHatalar:[
      { hata:'Yanlış maliyet yerini {{FB08}} ile ters kaydederek düzeltmek.', dogru:'{{KB11N}} ile CO içinde taşınır. FI doğrudur; ters kayıt mizanı gereksiz belgelerle kirletir.' },
      { hata:'{{OKB9}} varsayılanlarını değişken hesaplarda tanımlamak.', dogru:'Yalnızca sabit hesaplarda (kira, sigorta) tanımla. Değişken hesaplarda kullanıcı düşünmelidir.' },
      { hata:'{{OKB9}} kayıtlarını organizasyon değişiminde güncellememek.', dogru:'Eski varsayılan **sessizce** yanlış maliyet yerine yazar; hata mesajı çıkmaz.' },
      { hata:'Maliyet yerine kâr merkezi atamayı unutmak.', dogru:'Belge bölme etkinse kayıtlar reddedilir ve sebep belge bölmede boşuna aranır.' },
      { hata:'Bilanço satırlarında maliyet yeri aramak.', dogru:'Yalnızca gelir tablosu hesapları maliyet yeri taşır.' },
      { hata:'Teknik maliyet yerlerinin ay sonunda sıfırlandığını kontrol etmemek.', dogru:'Sıfır değilse dağıtım döngüsü bazı masraf türlerini kapsamıyor demektir.' },
      { hata:'Yılbaşında yalnızca FI numara aralıklarını açmak.', dogru:'CO aralıkları ({{KANK}}) eksikse gider kayıtları **durur**.' },
      { hata:'{{ic-siparis}} yerleşimini ({{KO88}}) atlamak.', dogru:'Maliyet siparişte asılı kalır, hiçbir maliyet yeri raporunda görünmez.' },
    ],

    ipuclari:[
      '**Birbirini dengeleyen iki bütçe sapması gördüğünde atama hatası ara** — ' +
      'gerçek aşımda toplam da artar.',
      'Maliyet yeri sorumlularına **aylık {{KSB1}}** gözden geçirmesini rutinleştir; ' +
      'bu hata sınıfının tek erken uyarısıdır.',
      '{{KSB1}}’de kaleme **çift tıkla** — FI belgesine geçersin, ' +
      '"kim, hangi faturayla girdi?" anında cevaplanır.',
      '{{KB11N}}’de **referans belge alanını doldur**; altı ay sonra ' +
      '"bu taşıma neden yapıldı?" sorusunun tek cevabı odur.',
      'Ay sonunda teknik maliyet yerlerinin **sıfırlandığını** doğrula.',
      '{{OKB9}} kayıtlarını **yıllık** gözden geçir; organizasyon değişiklikleriyle eskirler.',
    ],

    quiz:[
      { soru:'Reklam gideri yanlışlıkla Üretim maliyet yerine düştü. Nasıl düzeltilir?',
        secenekler:[
          '{{FB08}} ile ters kaydedilip yeniden girilir',
          '**{{KB11N}} ile CO içinde taşınır — FI belgesi oluşmaz**',
          'Belge değiştirilir',
          'Düzeltilemez',
        ], dogru:1,
        aciklama:'**FI tarafı hiç yanlış değil:** hesap doğru, tutar doğru, KDV doğru, dönem doğru. ' +
                 'Yanlış olan yalnızca **CO etiketidir**. {{KB11N}} tek CO belgesiyle, ' +
                 'FI’a hiç dokunmadan çözer. Ters kayıt mizanda üç belge yaratır ve ' +
                 'satıcı hesabını, KDV beyanını gereksiz kirletir.' },

      { soru:'"Account ... requires an assignment to a CO object" hatasının sebebi?',
        secenekler:[
          'Hesap bloklanmış',
          'Dönem kapalı',
          '**Hesabın masraf türü var ama CO nesnesi girilmemiş ve {{OKB9}} varsayılanı yok**',
          'Kontrol alanı tanımsız',
        ], dogru:2,
        aciklama:'Masraf türü tanımlı bir hesap, CO nesnesi (maliyet yeri veya iç sipariş) ' +
                 '**olmadan kaydedilemez**. Çözüm iki yönlü: ya kullanıcı kayıtta girsin ' +
                 'ya {{OKB9}} ile varsayılan tanımlansın. En sık CO entegrasyon hatasıdır.' },

      { soru:'Bir gider kaydında kâr merkezi alanı nereden dolar?',
        secenekler:[
          'Kullanıcı elle girer',
          'Hesap ana verisinden',
          '**Maliyet yerinden türetilir ({{CSKS}} `PRCTR`)**',
          'Şirket kodundan',
        ], dogru:2,
        aciklama:'Maliyet yeri ana verisinde bir kâr merkezi tanımlıdır ve ' +
                 'kayıt sırasında sistem bu bağlantıyı okuyup kaleme yazar. ' +
                 'Maliyet yerine kâr merkezi atanmamışsa ve {{belge-bolme}} etkinse ' +
                 'belge **reddedilir** — hata belge bölmede görünür ama sebep CO’dadır.' },

      { soru:'Bir satıcı faturasında hangi satırlar maliyet yeri taşır?',
        secenekler:[
          'Tüm satırlar',
          '**Yalnızca gider (gelir tablosu) satırları**',
          'Yalnızca satıcı satırı',
          'Yalnızca KDV satırı',
        ], dogru:1,
        aciklama:'Maliyet yeri "kim harcadı" sorusuna cevap verir ve ' +
                 'bu soru yalnızca **gelir tablosu** hesapları için anlamlıdır. ' +
                 'Satıcı, banka, stok gibi bilanço hesapları maliyet yeri taşımaz — ' +
                 'bir varlık veya borç "harcanmaz".' },

      { soru:'İki maliyet yerinin sapması birbirini dengeliyor (+1,2M / −1,18M). Ne düşünürsün?',
        secenekler:[
          'Gerçek bir bütçe aşımı',
          '**Atama hatası — gider yanlış maliyet yerine düşmüş**',
          'Muhasebe hatası',
          'Plan verisi yanlış',
        ], dogru:1,
        aciklama:'Gerçek bütçe aşımında **toplam da artardı**. ' +
                 'İki sapmanın birbirini dengelemesi, paranın harcandığını ama ' +
                 '**yanlış etiketlendiğini** gösterir. ' +
                 'Bu desen görüldüğünde önce atama hatası aranmalıdır.' },

      { soru:'Dağıtım ({{KSU5}}) ile devir ({{KSV5}}) arasındaki fark nedir?',
        secenekler:[
          'Dağıtım daha hızlıdır',
          '**Dağıtım orijinal masraf türünü korur; devir, devir türü altında toplar**',
          'Devir FI belgesi üretir',
          'Fark yoktur',
        ], dogru:1,
        aciklama:'**Dağıtım:** hedefte "elektrik gideri", "kira gideri" ayrı ayrı görünür — ' +
                 'şeffaf ama çok satır. **Devir:** hedefte tek satır "genel gider payı" — ' +
                 'sade ama detay kaybolur. **İkisi de FI’ı etkilemez.**' },

      { soru:'{{OKB9}} varsayılanının en büyük riski nedir?',
        secenekler:[
          'Performansı yavaşlatır',
          'Belgeyi reddeder',
          '**Organizasyon değişince eskir ve sessizce yanlış maliyet yerine yazar**',
          'Mizanı bozar',
        ], dogru:2,
        aciklama:'Varsayılan geçerli bir maliyet yeri olduğu sürece sistem **hata vermez**. ' +
                 'Organizasyon değişip yeni maliyet yeri açıldığında eski varsayılan ' +
                 'kalmaya devam eder ve gider aylarca yanlış yere yazılır. ' +
                 '**Değişken hesaplarda varsayılan tanımlanmamalıdır** — kullanıcı düşünsün.' },

      { soru:'S/4HANA’da maliyet yeri entegrasyonunda ne değişti?',
        secenekler:[
          'Maliyet yeri kavramı kalktı',
          '{{KSB1}} kaldırıldı',
          '**{{BSEG}} + {{COEP}} birleşip {{ACDOCA}}’da tek satır oldu; FI–CO mutabakatı kalktı**',
          'Masraf türü zorunlu olmaktan çıktı',
        ], dogru:2,
        aciklama:'ECC’de bir gider kaydı {{BSEG}}’e (FI) ve {{COEP}}’e (CO) **ayrı ayrı** ' +
                 'yazılırdı; teorik tutarsızlık mümkündü ve mutabakat raporları vardı. ' +
                 'S/4HANA’da **tek satır** var — tutarsızlık **yapısal olarak imkânsız**. ' +
                 'Ayrıca masraf türü artık G/L hesabının özelliği.' },
    ],

    flashcards:[
      { on:'Maliyet yeri entegrasyonu nedir?', arka:'Gider kaydının **FI’da hesaba, CO’da maliyet yerine** aynı anda yazılması.\n\n**FI sorusu:** "ne harcandı?" → 770\n**CO sorusu:** "kim harcadı?" → 4200 Pazarlama\n\nKöprü: **masraf türü** (numarası hesapla aynı).' },
      { on:'Yanlış maliyet yeri nasıl düzeltilir?', arka:'**KB11N — CO içi yeniden kayıt.**\n\n✓ FI belgesi **oluşmaz** · mizan **değişmez**\n\nFB08 ile ters kayıt: 3 belge, kirli satıcı hesabı, gereksiz KDV satırları\n\n**İlke: hatayı oluştuğu katmanda düzelt.**' },
      { on:'"Requires an assignment to a CO object" — sebep?', arka:'Hesabın **masraf türü var** ama CO nesnesi girilmemiş **ve OKB9 varsayılanı yok**.\n\nÇözüm iki yönlü:\n• Kullanıcı kayıtta girsin\n• OKB9 ile varsayılan tanımlansın\n\nEn sık CO entegrasyon hatası.' },
      { on:'Kâr merkezi nereden gelir?', arka:'**Maliyet yerinden türetilir** — CSKS-PRCTR.\n\nKullanıcı girmez, otomatik dolar.\n\nMaliyet yerine kâr merkezi atanmamışsa + belge bölme etkinse → belge **reddedilir**. Hata bölmede görünür, sebep CO’da.' },
      { on:'Hangi satırlar maliyet yeri taşır?', arka:'**Yalnızca gelir tablosu hesapları.**\n\n✓ 770 gider · 600 gelir\n320 satıcı · 102 banka · 153 stok · 191 KDV\n\nSebep: bir **varlık veya borç "harcanmaz"**.' },
      { on:'Dağıtım (KSU5) vs devir (KSV5)', arka:'**Dağıtım** — orijinal masraf türü **korunur** → şeffaf, çok satır\n\n**Devir** — devir türü (kat. 42) altında **toplanır** → sade, az satır, detay kaybolur\n\n**İkisi de FI’ı etkilemez.**' },
      { on:'OKB9’un riski nedir?', arka:'**Eskir ve sessizce yanlış yazar.**\n\nOrganizasyon değişir, yeni maliyet yeri açılır, **varsayılan kalır**.\n\nSistem hata vermez (varsayılan geçerli bir MY).\n\n→ **Değişken hesaplarda tanımlama**; kullanıcı düşünsün.' },
      { on:'S/4HANA’da ne değişti?', arka:'**BSEG (FI) + COEP (CO) → tek ACDOCA satırı**\n\n• FI–CO mutabakatı **kavram olarak kalktı**\n• Tutarsızlık **yapısal olarak imkânsız**\n• Masraf türü = **G/L hesabının özelliği** (FS00)\n• İkincil masraf türleri hesap planında' },
      { on:'Atama hatasının işareti nedir?', arka:'**Birbirini dengeleyen iki bütçe sapması.**\n\nMY-A: +1.240.000\nMY-B: −1.180.000\nToplam: ~0\n\nGerçek aşımda **toplam da artardı**. Bu desen → önce atama hatası ara.' },
      { on:'Maliyet yeri hatası nasıl yakalanır?', arka:'**Hiçbir muhasebe kontrolü yakalamaz.**\n\nFiş dengeli · mizan tutar · gelir tablosu doğru · KDV doğru · hata mesajı yok\n\nTek erken uyarı: **maliyet yeri sorumlusunun aylık KSB1 gözden geçirmesi**.' },
      { on:'CSKS geçerlilik aralığı ne işe yarar?', arka:'**DATBI anahtarın parçasıdır.**\n\nMaliyet yeri **silinmez, kapatılır** — bitiş tarihi geçmişe çekilir.\n\n✓ Geçmiş kayıtlar korunur\nYeni kayıt yapılamaz\n\nKâr merkezi değişikliği **geçmişe etki etmez**.' },
      { on:'CO numara aralığı eksikse?', arka:'**KANK tanımı yoksa CO kaydı başarısız → FI kaydı da olmaz** (aynı LUW).\n\nKlasik senaryo: yılbaşında FI aralıkları açılır, **CO unutulur** → 1 Ocak sabahı gider kayıtları durur.\n\n→ Kapanış listesine ekle.' },
    ],
  },

  },
});
