/* ==========================================================================
   content/fi/bank-accounting.js — "Bank Accounting (Banka Muhasebesi)"
   ========================================================================== */

SAP.registerTopic({
  id: 'bank-accounting',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Bank Accounting (FI-BL), şirketin **banka hesaplarını, nakit hareketlerini ve ödeme araçlarını** ' +
      'yöneten FI alt bileşenidir. Kapsamı: {{ev-bankasi}} tanımı, banka ana verisi, ' +
      '{{banka-ara-hesabi}} mekanizması, çek yönetimi ve banka ekstresi işleme.\n\n' +
      'FI-BL’in ayırt edici özelliği **bir köprü olmasıdır**: AP ödemeyi kaydeder, AR tahsilatı kaydeder, ' +
      'ama paranın bankada **gerçekten** hareket edip etmediğini FI-BL doğrular. ' +
      'Bu doğrulama olmadan muhasebedeki banka bakiyesi ile bankanın söylediği rakam birbirini tutmaz.',

    neden:
      '**Zaman farkını yönetmek için.** Ödemeyi kaydettiğin an ile paranın bankadan çıktığı an aynı değildir. ' +
      '{{banka-ara-hesabi}} bu farkı taşır ve mutabakatı mümkün kılar.\n\n' +
      '**Nakit görünürlüğü için.** "Bugün kaç param var, yarın ne kadar çıkacak?" sorusunun cevabı ' +
      'banka hesaplarının doğru izlenmesine bağlıdır.\n\n' +
      '**Kontrol için.** Şirketten para çıkışının tamamı banka üzerindendir. Banka hesabı değişikliği, ' +
      'çek numarası takibi ve ekstre mutabakatı iç kontrolün temel taşlarıdır.',

    sirketOnemi:
      'Banka mutabakatı yapılmayan bir şirkette **hiçbir rakama güvenilemez**. ' +
      'Muhasebedeki banka bakiyesi 4,2 milyon TL gösterirken bankadaki gerçek bakiye 3,8 milyon TL ise ' +
      'aradaki 400.000 TL ya kaydedilmemiş bir hareket ya da bir hatadır — belki de bir suistimal.\n\n' +
      'Danışmanlık açısından FI-BL, {{F110}} ile **ayrılmaz biçimde bağlıdır**: ' +
      'ödeme programının hangi bankadan ödeyeceğini {{FBZP}} banka belirleme kuralları söyler ve ' +
      'bu kurallar {{ev-bankasi}} tanımlarına dayanır. FI-BL doğru kurulmadan F110 çalışmaz.\n\n' +
      'Mülakatta ayırt edici soru: **"Neden banka ara hesabı kullanılır?"** ' +
      'Bu soru, adayın mutabakat mantığını anlayıp anlamadığını ölçer.',

    gercekHayat:
      'Bir şirketin 4 bankada 11 hesabı var. Ay sonunda hazine uzmanı her hesap için şu soruyu ' +
      'cevaplamak zorunda: **"Bizim kayıtlarımız ile bankanın ekstresi neden farklı?"**\n\n' +
      'Tipik farklar: (1) 25’inde kaydedilen ödemeler bankaya 26’sında yansımış, ' +
      '(2) müşteriden gelen 3 havale henüz muhasebeye girilmemiş, ' +
      '(3) banka masrafı kesmiş ama kimse kaydetmemiş, ' +
      '(4) yazılan bir çek henüz tahsile ibraz edilmemiş.\n\n' +
      'Bu farkların **hepsi normaldir**. Anormal olan, farkların açıklanamaması veya ' +
      'ara hesabın sürekli büyümesidir. FI-BL bu farkları yapısal olarak izlenebilir kılar.',

    muhasebeMantigi:
      'FI-BL’in muhasebe mantığı tek bir kavrama dayanır: **iki aşamalı kayıt**.\n\n' +
      '**Aşama 1 — İşlem kaydedilir:** ödeme yapıldığında {{banka-ara-hesabi}} alacaklanır. ' +
      'Bu, "ödeme talimatı verdik" demektir.\n\n' +
      '**Aşama 2 — Ekstre gelir:** ara hesap borçlanır, **gerçek banka hesabı** alacaklanır. ' +
      'Bu, "para fiilen çıktı" demektir.\n\n' +
      'Ara hesabın bakiyesi = **yolda olan para**. Sağlıklı bir sistemde bu bakiye küçüktür ve ' +
      'birkaç gün içinde kapanır. Sürekli büyüyorsa ya ekstre işlenmiyordur ya da ' +
      'kaydedilen ödemeler bankada gerçekleşmiyordur.\n\n' +
      'Bu yüzden ara hesaplarda {{acik-kalem-yonetimi}} **zorunludur** — {{kapatma}} yapılabilmesi için.',

    kavramlar: ['ev-bankasi', 'banka-ara-hesabi', 'ekstre-eslestirme', 'valor-tarihi',
                'acik-kalem-yonetimi', 'kapatma', 'odeme-yontemi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Banka süreci **iki yönlüdür**: giden para (ödemeler) ve gelen para (tahsilatlar). ' +
      'Her ikisi de aynı desende ilerler: **işlem kaydedilir → ara hesap çalışır → ekstre gelir → ' +
      'ara hesap kapanır**. Bu deseni kavramak, FI-BL’in tamamını kavramaktır.',

    roller:[
      { rol:'Hazine / Finans', gorev:'Banka ilişkilerini yönetir, {{ev-bankasi}} tanımlarını talep eder, nakit planlaması yapar.' },
      { rol:'AP muhasebe', gorev:'Ödemeleri kaydeder ({{F110}}, {{F-53}}) — ara hesap alacaklanır.' },
      { rol:'AR muhasebe', gorev:'Tahsilatları kaydeder ({{F-28}}) — ara hesap borçlanır.' },
      { rol:'Banka muhasebecisi', gorev:'Ekstreyi işler ({{FF67}} veya {{FEBAN}}), ara hesapları kapatır, farkları araştırır.' },
      { rol:'Muhasebe müdürü', gorev:'Ay sonu banka mutabakatını onaylar; açıklanamayan farkları takip eder.' },
      { rol:'FI danışmanı', gorev:'{{ev-bankasi}} yapısı, ara hesap tasarımı, {{FBZP}} banka belirleme ve çek numara aralıklarını kurar.' },
      { rol:'İç denetim', gorev:'Banka hesabı değişikliklerini ve çek defterini denetler.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Banka süreci — ödemeden mutabakata',
      adimlar:[
        { ic:'🏦', rol:'FI danışmanı', baslik:'Banka yapısı kurulur',
          aciklama:'Banka ana verisi ({{FI01}} → {{BNKA}}), {{ev-bankasi}} ve hesap kimlikleri ' +
                   '({{FI12}} → {{T012}}/{{T012K}}), G/L hesapları ve ara hesaplar.',
          cikti:'Kullanıma hazır banka yapısı', ok:'ödeme yapılabilir' },
        { ic:'💸', rol:'AP muhasebe', baslik:'Ödeme kaydedilir',
          aciklama:'{{F110}} veya {{F-53}}: satıcı borçlanır, **{{banka-ara-hesabi}}** alacaklanır. ' +
                   'Gerçek banka hesabı **henüz çalışmaz**.',
          cikti:'Ödeme belgesi + ara hesap kalemi', ok:'dosya bankaya gider' },
        { ic:'📤', rol:'Hazine', baslik:'Ödeme ortamı üretilir ve gönderilir',
          aciklama:'{{FBPM}} ile banka dosyası; çek kullanılıyorsa çek numaraları atanır ({{PAYR}}).',
          cikti:'Banka dosyası / çekler', ok:'banka işler' },
        { ic:'📥', rol:'Banka', baslik:'Banka ekstresi gelir',
          aciklama:'Elektronik ({{FF_5}} ile MT940/CAMT dosyası) veya manuel ({{FF67}} ile elle giriş).',
          cikti:'{{FEBKO}} / {{FEBEP}} kayıtları', ok:'işlenir' },
        { ic:'🔗', rol:'Banka muhasebecisi', baslik:'Ekstre satırları eşleştirilir',
          aciklama:'Otomatik eşleşenler kaydedilir; eşleşmeyenler {{FEBAN}}’da elle bağlanır. ' +
                   '{{banka-ara-hesabi}} kapatılır, **gerçek banka hesabı çalışır**.',
          cikti:'Kapatılmış ara hesap kalemleri', ok:'ay sonunda' },
        { ic:'⚖️', rol:'Muhasebe müdürü', baslik:'Banka mutabakatı yapılır',
          aciklama:'Muhasebedeki banka bakiyesi ile ekstre kapanış bakiyesi karşılaştırılır. ' +
                   'Fark = ara hesapta bekleyen kalemler (yolda olan para).',
          cikti:'Mutabakat raporu', ok:'fark açıklanamıyorsa' },
        { ic:'🔍', rol:'Banka muhasebecisi', baslik:'Fark analizi',
          aciklama:'{{FBL3N}} ile ara hesabın açık kalemleri incelenir: eski kalemler neden kapanmadı?',
          cikti:'Açıklanmış fark' },
      ],
    },

    adimlar:[
      { rol:'FI danışmanı', eylem:'Banka ana verisini açar', sistem:'{{FI01}} → {{BNKA}}' },
      { rol:'FI danışmanı', eylem:'Ev bankası ve hesap kimliğini tanımlar', sistem:'{{FI12}} → {{T012}}, {{T012K}}' },
      { rol:'AP muhasebe', eylem:'Ödeme kaydeder', sistem:'{{F110}}, {{F-53}} → ara hesap alacak' },
      { rol:'AR muhasebe', eylem:'Tahsilat kaydeder', sistem:'{{F-28}} → ara hesap borç' },
      { rol:'Hazine', eylem:'Çek basar / dosya üretir', sistem:'{{FBPM}}, {{FCH5}} → {{PAYR}}' },
      { rol:'Banka muhasebecisi', eylem:'Ekstreyi yükler veya girer', sistem:'{{FF_5}} veya {{FF67}}' },
      { rol:'Banka muhasebecisi', eylem:'Eşleşmeyenleri düzeltir', sistem:'{{FEBAN}}' },
      { rol:'Muhasebe müdürü', eylem:'Mutabakatı kontrol eder', sistem:'{{FBL3N}}, {{FS10N}}' },
    ],

    veriAkisi:{
      nereden:'AP ve AR ödeme/tahsilat kayıtları; bankadan gelen ekstre dosyası (MT940, CAMT.053); ' +
              '{{FBZP}} banka belirleme kuralları; {{BP}}’den iş ortağı banka bilgileri.',
      nereye:'{{banka-ara-hesabi}} kalemlerine → ekstre eşleştirmesiyle gerçek banka hesabına; ' +
             'nakit akış tahminine ve bilançoya.',
      tetikleyen:'Ödeme veya tahsilat kaydı; günlük/haftalık banka ekstresi.',
      sonraki:'Ay sonu banka mutabakatı, nakit raporlaması, denetim.',
    },

    notlar:[
      { tip:'tip', baslik:'Kaç ara hesap gerekir?', metin:
        'Yaygın tasarım: **her banka hesabı için iki ara hesap** — biri giden ödemeler, biri gelen tahsilatlar. ' +
        'Bazı kurulumlar ödeme yöntemine göre daha da ayırır (havale ara hesabı, çek ara hesabı).\n\n' +
        'Ayrım ne kadar ince olursa mutabakat o kadar kolaylaşır ama hesap planı büyür. ' +
        'Pratik denge: **banka hesabı × yön** (giden/gelen). 11 banka hesabı için 22 ara hesap + ' +
        '11 gerçek hesap = 33 hesap.' },
      { tip:'warn', baslik:'Ara hesap olmadan ne olur?', metin:
        'Ödeme doğrudan gerçek banka hesabına yazılırsa, ekstre geldiğinde aynı hareket **ikinci kez** ' +
        'kaydedilme riski doğar veya ekstre satırı hiçbir şeyle eşleşmez. ' +
        'Her iki durumda da mutabakat imkânsız hâle gelir.\n\n' +
        'Küçük şirketlerde "ara hesap gereksiz karmaşıklık" denip atlanır; hacim büyüdüğünde ' +
        'geri dönüp kurmak, aylarca birikmiş hareketi ayrıştırmak demektir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'FI-BL’in muhasebe mantığı **iki aşamalı kayıttır**. Aşağıda önce giden ödeme, sonra gelen tahsilat, ' +
      'sonra çek ve banka masrafı örnekleri var. Hepsinde aynı desen tekrarlanır.',

    etkilenenHesaplar:[
      { hesap:'102 Bankalar — gerçek hesap', tur:'Bilanço — Varlık', neden:'Yalnızca **ekstre işlendiğinde** hareket eder. Bakiyesi bankanın söylediği rakamla eşleşmelidir.' },
      { hesap:'102.9x Banka ara hesabı (giden)', tur:'Bilanço — Geçiş', neden:'Ödeme kaydedildiğinde alacaklanır, ekstre gelince borçlanıp kapanır. Bakiyesi = **yolda olan giden para**.' },
      { hesap:'102.8x Banka ara hesabı (gelen)', tur:'Bilanço — Geçiş', neden:'Tahsilat kaydedildiğinde borçlanır, ekstre gelince alacaklanıp kapanır.' },
      { hesap:'770 / 653 Banka masrafları', tur:'Gelir tablosu', neden:'Havale ücreti, hesap işletim ücreti. Genelde ekstre işlenirken otomatik kaydedilir.' },
      { hesap:'642 Faiz gelirleri / 780 Faiz giderleri', tur:'Gelir tablosu', neden:'Mevduat faizi ve kredi faizi — ekstreden gelir.' },
      { hesap:'103 Verilen çekler ve ödeme emirleri', tur:'Bilanço — Kaynak', neden:'Yazılmış ama henüz tahsil edilmemiş çekler. Türkiye uygulamasında sık kullanılır.' },
    ],

    fisler:[
      { baslik:'Aşama 1 — Ödeme kaydedilir ({{F110}})',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-4001', borc:140000, not:'Açık kalem kapandı' },
          { hesap:'102.91', ad:'Banka ara hesabı — İŞB giden', alacak:140000, not:'**Gerçek hesap değil**' },
        ],
        not:'Ödeme talimatı verildi ama para henüz bankadan çıkmadı. ' +
             'Bu kalem ara hesapta **açık** bekliyor ({{acik-kalem-yonetimi}} sayesinde).' },

      { baslik:'Aşama 2 — Ekstre gelir, ara hesap kapanır ({{FEBAN}})',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102.91', ad:'Banka ara hesabı — İŞB giden', borc:140000, not:'**Kapatıldı** — kalem eşleşti' },
          { hesap:'102.01', ad:'Bankalar — İŞB gerçek hesap', alacak:140000, not:'Para fiilen çıktı' },
        ],
        not:'Nakit çıkışı **ancak burada** kesinleşti. Artık 102.01 hesabının bakiyesi ' +
             'bankanın söylediği rakamla eşleşir. Ara hesap sıfırlandı.' },

      { baslik:'Gelen tahsilat — aynı desen, ters yön',
        belgeTuru:'DZ', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102.81', ad:'Banka ara hesabı — İŞB gelen', borc:120000, not:'Tahsilat kaydedildi' },
          { hesap:'120', ad:'Alıcılar — C-5001', alacak:120000, not:'Açık kalem kapandı' },
        ],
        not:'Ekstre geldiğinde ikinci kayıt yapılır: **102.81 alacak / 102.01 borç**. ' +
             'Desen giden ödemeyle aynı, yalnızca yön ters.' },

      { baslik:'Banka masrafı — ekstreden otomatik',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — banka masrafı', borc:450 },
          { hesap:'102.01', ad:'Bankalar — İŞB', alacak:450 },
        ],
        not:'Banka masrafları ekstrede ayrı satır olarak gelir ve **doğrudan gerçek hesaba** kaydedilir — ' +
             'ara hesap kullanılmaz. Çünkü bu hareketin muhasebede önceden kaydedilmiş bir karşılığı yoktur; ' +
             'ilk kez ekstreden öğrenilir. {{OT83}} kayıt kuralları bunu otomatikleştirir.' },

      { baslik:'Çek yazıldı ({{FCH5}}) — Türkiye uygulaması',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-6001', borc:85000 },
          { hesap:'103', ad:'Verilen çekler ve ödeme emirleri', alacak:85000, not:'Çek yazıldı, henüz tahsil edilmedi' },
        ],
        not:'Çek **ara hesap gibi davranır**: yazıldığında 103 alacaklanır, tahsile ibraz edildiğinde ' +
             '103 borçlanıp banka alacaklanır. Aradaki süre çekin vadesine göre aylar sürebilir. ' +
             '{{PAYR}} tablosu her çekin durumunu izler.' },

      { baslik:'Çek tahsil edildi — ekstreden',
        belgeTuru:'SB', tarih:'15.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'103', ad:'Verilen çekler ve ödeme emirleri', borc:85000, not:'Çek tahsil edildi' },
          { hesap:'102.01', ad:'Bankalar — İŞB', alacak:85000 },
        ],
        not:'103 hesabının bakiyesi = **henüz tahsil edilmemiş çekler**. ' +
             'Bu, banka mutabakatındaki en yaygın açıklanabilir farktır.' },
    ],

    tHesaplar:[
      { hesap:'Bankalar — gerçek hesap', kod:'102.01',
        borc:[{ ad:'Tahsilatlar (ekstreden)', tutar:120000 }],
        alacak:[{ ad:'Ödemeler (ekstreden)', tutar:140000 }, { ad:'Banka masrafı', tutar:450 }],
        not:'Bakiyesi bankanın rakamıyla eşleşmeli' },
      { hesap:'Banka ara hesabı — giden', kod:'102.91',
        borc:[{ ad:'Ekstre eşleşmesi', tutar:140000 }],
        alacak:[{ ad:'F110 ödemesi', tutar:140000 }],
        not:'Bakiye = yolda olan giden para' },
      { hesap:'Banka ara hesabı — gelen', kod:'102.81',
        borc:[{ ad:'Tahsilat kaydı', tutar:120000 }],
        alacak:[{ ad:'Ekstre eşleşmesi', tutar:120000 }],
        not:'Bakiye = yolda olan gelen para' },
      { hesap:'Verilen çekler', kod:'103',
        borc:[{ ad:'Tahsil edilen çekler', tutar:85000 }],
        alacak:[{ ad:'Yazılan çekler', tutar:85000 }],
        not:'Bakiye = tahsil edilmemiş çekler' },
    ],

    notlar:[
      { tip:'warn', baslik:'Ara hesap bakiyesi ne anlama gelir?', metin:
        'Ara hesabın bakiyesi **yolda olan paradır** ve normal şartlarda birkaç günlük hareketten oluşur.\n\n' +
        'Bakiye sürekli büyüyorsa üç ihtimal var: **(1)** ekstre işlenmiyor, ' +
        '**(2)** ekstre işleniyor ama eşleşme kurulamıyor ({{FEBAN}}’da bekleyen satırlar var), ' +
        '**(3)** kaydedilen ödemeler bankada gerçekleşmiyor (dosya gönderilmemiş olabilir).\n\n' +
        'Bu bakiye aylık izlenmelidir; büyümesi sessiz bir mutabakat kopukluğunun ilk işaretidir.' },
      { tip:'tip', baslik:'Neden banka masrafı ara hesap kullanmaz?', metin:
        'Ara hesap, **muhasebede önceden kaydedilmiş** bir hareketin bankada gerçekleşmesini bekler. ' +
        'Banka masrafını ise ilk kez ekstreden öğrenirsin — beklenen bir karşılığı yoktur.\n\n' +
        'Bu yüzden doğrudan gerçek banka hesabına ve gider hesabına kaydedilir. ' +
        'Aynı mantık faiz, damga vergisi ve beklenmedik havaleler için de geçerlidir.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'FI-BL’de çeşitlenme üç eksende olur: **banka verisinin türü**, **ekstre işleme yöntemi** ve ' +
      '**ödeme aracı**.',

    liste:[
      { ad:'Banka ana verisi', en:'Bank Master Data — BNKA',
        aciklama:'Dünyadaki **tüm bankaların** listesi: ülke + banka anahtarı, ad, SWIFT, adres. ' +
                 'Hem şirketin hem müşteri/satıcıların bankaları buradadır.',
        neZaman:'Bir iş ortağının banka bilgisi girilmeden önce o banka {{BNKA}}’da tanımlı olmalıdır.',
        ornek:'TR + 0064 → İş Bankası. Ülkeye göre banka anahtarı formatı değişir.',
        tcodes:['FI01','FI02','FI03'] },

      { ad:'Ev bankası', en:'House Bank — T012',
        aciklama:'**Şirketin kendi** çalıştığı banka. Her ev bankasının bir veya birden çok ' +
                 '**hesap kimliği** (account ID) olur ve her kimlik bir G/L hesabına bağlanır.',
        neZaman:'{{F110}} veya ekstre işleme kullanılacaksa zorunludur.',
        ornek:'Ev bankası **ISB** → hesap kimliği **0001** (TL) ve **0002** (EUR). ' +
              'Her biri ayrı G/L hesabı ve ayrı ara hesap kullanır.',
        tcodes:['FI12','FBZP'] },

      { ad:'Manuel banka ekstresi', en:'Manual Bank Statement — FF67',
        aciklama:'Ekstre satırları **elle girilir**. Kayıt kuralları yine uygulanır ama veri manueldir.',
        neZaman:'Elektronik ekstre almayan küçük bankalarda, yurtdışı hesaplarda, ' +
                'veya elektronik ekstreye geçiş öncesinde.',
        ornek:'Hazine uzmanı ekstre kâğıdından 40 satırı {{FF67}}’ye girer.',
        tcodes:['FF67'] },

      { ad:'Elektronik banka ekstresi', en:'Electronic Bank Statement — FF_5',
        aciklama:'Bankadan gelen dosya (MT940, CAMT.053) sisteme yüklenir ve kayıt kuralları ' +
                 'otomatik uygulanır. Detayı için {{konu:ebs}} konusuna bak.',
        neZaman:'Hacim yüksekse **standart tercih**. Manuel girişe göre hem hızlı hem hatasızdır.',
        ornek:'Günlük 300 satırlık ekstre dosyası 2 dakikada yüklenir ve %85’i otomatik eşleşir.',
        tcodes:['FF_5','FEBAN','OT83'] },

      { ad:'Havale (banka transferi)', en:'Bank Transfer',
        aciklama:'En yaygın {{odeme-yontemi}}. Banka dosyası üretilir, elektronik gönderilir.',
        neZaman:'Standart yurtiçi ve yurtdışı ödemelerde.',
        ornek:'{{FBZP}}’de ödeme yöntemi olarak tanımlanır; {{FBPM}} dosyayı üretir.',
        tcodes:['F110','FBPM'] },

      { ad:'Çek', en:'Check',
        aciklama:'Fiziksel ödeme aracı. Numara aralığından çek numarası atanır ve her çekin durumu ' +
                 '{{PAYR}} tablosunda izlenir: basıldı, gönderildi, tahsil edildi, iptal edildi.',
        neZaman:'Çek kullanımının yaygın olduğu ülkelerde ve vadeli ödemelerde. ' +
                'Türkiye’de vadeli çek yaygındır ve ayrı bir hesapta (103) izlenir.',
        ornek:'{{FCH5}} ile çek ödemeyle ilişkilendirilir, {{FCHN}} ile listelenir, ' +
              '{{FCH8}}/{{FCH9}} ile iptal edilir.',
        tcodes:['FCH5','FCHN','FCHI','FCH8','FCH9','FCHR'] },

      { ad:'Nakit / kasa defteri', en:'Cash Journal',
        aciklama:'Küçük nakit hareketlerini (avans, küçük alım) ayrı bir defterde izler. ' +
                 'Banka değil kasa hesabıyla çalışır.',
        neZaman:'Şirkette fiziksel kasa varsa. Kurumsal şirketlerde giderek azalmaktadır.',
        ornek:'Kasa defteri işlemleri FI belgesi üretir ama ayrı bir arayüzden girilir.' },
    ],

    karsilastirmaBasliklar:['Banka ana verisi (BNKA)', 'Ev bankası (T012)'],
    karsilastirma:[
      ['Ne tutar', 'Dünyadaki **tüm bankalar**', 'Şirketin **kendi** çalıştığı bankalar'],
      ['Kimin bankası', 'Müşteri, satıcı ve şirketin', 'Yalnızca şirketin'],
      ['Anahtar', 'Ülke + banka anahtarı', 'Şirket kodu + ev bankası kimliği'],
      ['G/L hesabı bağı', 'Yok', '**Var** — hesap kimliği bir G/L hesabına bağlanır'],
      ['{{F110}} kullanır mı', 'İş ortağının IBAN’ı için', '**Ödemenin çıkacağı hesabı belirlemek için**'],
      ['İşlem kodu', '{{FI01}} / {{FI02}} / {{FI03}}', '{{FI12}}'],
      ['Tablo', '{{BNKA}}', '{{T012}} / {{T012K}}'],
      ['S/4HANA', 'Değişmedi', 'Bank Account Management (BAM) ile yönetilir'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FI12', ad:'Ev bankası ve hesap kimliği tanımı',
        amac:'Şirketin çalıştığı bankaları ve her bankadaki hesaplarını tanımlar; her hesabı bir G/L hesabına bağlar.',
        neZaman:'Yeni banka hesabı açıldığında; {{F110}} veya ekstre işleme kurulurken.',
        adimlar:[
          { baslik:'Şirket kodunu gir' },
          { baslik:'Ev bankası oluştur: kimlik + banka ülkesi + banka anahtarı',
            aciklama:'Banka anahtarı {{BNKA}}’da tanımlı olmalıdır; değilse önce {{FI01}} ile açılır.' },
          { baslik:'Hesap kimliği (account ID) ekle',
            aciklama:'Aynı bankada birden çok hesap varsa her biri ayrı kimlik alır: TL hesabı 0001, EUR hesabı 0002.' },
          { baslik:'Her hesap kimliğine **G/L hesabını** bağla',
            aciklama:'Bu, o hesaptaki hareketlerin hangi muhasebe hesabına yazılacağını belirler.' },
          { baslik:'IBAN ve hesap numarasını gir',
            aciklama:'Ödeme dosyasında bu bilgiler kullanılır.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Şirket kodu 1000' },
          { ekran:'Ev bankası', islem:'Kimlik ISB · Ülke TR · Banka anahtarı 0064' },
          { ekran:'Hesap kimliği', islem:'0001 · IBAN TR12 0006 4000 … · G/L hesabı 102001' },
          { ekran:'İkinci hesap', islem:'0002 · EUR hesabı · G/L hesabı 102002' },
        ],
        alanlar:{
          zorunlu:['Şirket kodu','Ev bankası kimliği','Banka ülkesi','Banka anahtarı','Hesap kimliği','G/L hesabı'],
          opsiyonel:['IBAN','Hesap numarası','Para birimi','Kontrol anahtarı'] },
        hatalar:[
          { mesaj:'Bank key ... does not exist for country TR', sebep:'Banka {{BNKA}}’da tanımlı değil.', cozum:'Önce {{FI01}} ile banka ana verisini oluştur.' },
          { mesaj:'G/L account ... is not defined in company code', sebep:'Bağlanmak istenen hesap açılmamış.', cozum:'{{FS00}} ile hesabı aç; banka hesapları için {{acik-kalem-yonetimi}} genelde **kapalı**, ara hesaplar için **açık** olmalıdır.' },
        ],
        ipucu:'Her ev bankası hesabı için **üç G/L hesabı** planla: gerçek banka hesabı, ' +
              'giden ara hesap, gelen ara hesap. Ara hesaplarda {{acik-kalem-yonetimi}} açık olmalıdır — ' +
              'yoksa {{kapatma}} yapılamaz ve mutabakat imkânsızlaşır.',
        ilgili:['FI01','FBZP','FCHI','T012K'] },

      { kod:'FF67', ad:'Manuel banka ekstresi girişi',
        amac:'Ekstre satırlarını elle girer ve tanımlı kayıt kurallarına göre muhasebeleştirir.',
        neZaman:'Elektronik ekstre alınmayan hesaplarda; yurtdışı bankalarda.',
        adimlar:[
          { baslik:'Ev bankası, hesap kimliği ve ekstre numarasını gir',
            aciklama:'Ekstre numarası sıralı olmalıdır; atlanan numara mutabakat boşluğu yaratır.' },
          { baslik:'Açılış ve kapanış bakiyelerini gir',
            aciklama:'Sistem, girilen satırların toplamının bu iki bakiye arasındaki farkı vermesini bekler. ' +
                     'Tutmuyorsa uyarır — güçlü bir kontroldür.' },
          { baslik:'Satırları gir: işlem kodu, tutar, değer tarihi, referans',
            aciklama:'İşlem kodu (banka transaction code), kayıt kuralını ve hedef hesabı belirler.' },
          { baslik:'Kaydet ve toplu iş oturumunu çalıştır',
            aciklama:'{{FF67}} genelde toplu giriş (batch input) oturumu üretir; {{SM35}} ile çalıştırılır.' },
        ],
        alanlar:{
          zorunlu:['Ev bankası','Hesap kimliği','Ekstre numarası','Ekstre tarihi','Açılış/kapanış bakiyesi','Satır tutarları'],
          opsiyonel:['{{valor-tarihi}}','Referans','Not to payee metni'] },
        hatalar:[
          { mesaj:'Closing balance does not match line items', sebep:'Girilen satırların toplamı açılış-kapanış farkını vermiyor.', cozum:'Satırları kontrol et; eksik veya fazla girilen kalem vardır. Bu kontrol kasıtlıdır ve atlanmamalıdır.' },
          { mesaj:'Posting rule ... not defined for transaction type', sebep:'{{OT83}}’te işlem kodu için kayıt kuralı yok.', cozum:'Kayıt kuralını tanımla veya satırı {{FEBAN}}’da elle bağla.' },
        ],
        ipucu:'Açılış-kapanış bakiye kontrolünü ciddiye al. Bu tek kontrol, ekstre girişindeki ' +
              'hataların neredeyse tamamını yakalar.',
        ilgili:['FF_5','FEBAN','OT83','FEBA'] },

      { kod:'FCHI', ad:'Çek numara aralığı tanımı',
        amac:'Ev bankası ve hesap kimliği bazında çek numara aralıklarını tanımlar.',
        neZaman:'Çek defteri alındığında; çek ile ödeme yapılmadan önce.',
        adimlar:[
          { baslik:'Şirket kodu, ev bankası ve hesap kimliğini gir' },
          { baslik:'Çek numara aralığını gir: alt sınır — üst sınır',
            aciklama:'Fiziksel çek defterindeki numaralarla **birebir** aynı olmalıdır.' },
          { baslik:'Aralık kimliğini ve açıklamayı gir' },
        ],
        hatalar:[
          { mesaj:'Check number ... is already used', sebep:'Aralık çakışması veya numara tüketilmiş.', cozum:'{{FCHN}} ile mevcut çekleri listele; yeni bir aralık tanımla.' },
        ],
        ipucu:'Çek aralığı **fiziksel çek defteriyle eşleşmelidir**. Aksi hâlde sistemdeki çek numarası ' +
              'ile elindeki kâğıt çek farklı olur ve mutabakat imkânsızlaşır.',
        ilgili:['FCH5','FCHN','FCHR','FBZP'] },

      { kod:'FCHN', ad:'Çek defteri / çek listesi',
        amac:'Çekleri numara, lehtar, tutar ve durum bazında listeler.',
        neZaman:'Çek mutabakatında; "bu çek tahsil edildi mi?" sorusunda; denetimde.',
        adimlar:[
          { baslik:'Şirket kodu, ev bankası ve hesap kimliğini gir' },
          { baslik:'Durum süzgeci uygula',
            aciklama:'Basıldı / gönderildi / **tahsil edildi** / iptal edildi. ' +
                     'Tahsil edilmemiş çekler banka mutabakatındaki farkı açıklar.' },
          { baslik:'Satıra çift tıkla → ödeme belgesine ve çek detayına in' },
        ],
        ipucu:'Ay sonu banka mutabakatında **tahsil edilmemiş çekler listesi** en çok işe yarayan rapordur. ' +
              '103 hesabının bakiyesi bu listenin toplamına eşit olmalıdır.',
        ilgili:['FCH5','FCHR','FCHI','PAYR'] },

      { kod:'FCH5', ad:'Çek oluştur / ödemeye bağla',
        amac:'Elle yazılan çeki bir ödeme belgesiyle ilişkilendirir.',
        neZaman:'{{F110}} dışında elle çek yazıldığında; {{F-58}} kullanılmadığında.',
        adimlar:[
          { baslik:'Ödeme belgesi numarasını gir' },
          { baslik:'Ev bankası, hesap kimliği ve çek numarasını gir' },
          { baslik:'Lehtar bilgisini kontrol et ve kaydet',
            aciklama:'Kayıt {{PAYR}} tablosuna yazılır ve çek defterinde görünür.' },
        ],
        hatalar:[
          { mesaj:'Payment document ... already has a check assigned', sebep:'Bu ödemeye zaten çek bağlanmış.', cozum:'{{FCHN}} ile kontrol et; yanlışsa {{FCH9}} ile çeki iptal et.' },
        ],
        ilgili:['FCHN','FCH8','FCH9','F-58'] },

      { kod:'FCH8', ad:'Çek iptali (ödeme ile birlikte)',
        amac:'Çeki iptal eder **ve** bağlı ödeme belgesini ters kaydeder; açık kalemler yeniden açılır.',
        neZaman:'Çek yanlış yazıldığında ve ödemenin de iptal edilmesi gerektiğinde.',
        adimlar:[
          { baslik:'Ev bankası, hesap kimliği ve çek numarasını gir' },
          { baslik:'İptal nedenini seç',
            aciklama:'Yırtıldı, kayboldu, yanlış tutar, yanlış lehtar…' },
          { baslik:'Onayla',
            aciklama:'Ödeme belgesi ters kaydedilir; satıcı açık kalemi **yeniden açılır** ve ' +
                     'sonraki koşuda tekrar ödenebilir hâle gelir.' },
        ],
        ipucu:'**{{FCH8}} ile {{FCH9}} farkı kritiktir:** FCH8 hem çeki hem ödemeyi iptal eder; ' +
              'FCH9 **yalnızca çeki** iptal eder ve ödeme belgesi durur. ' +
              'Çek yanlış basıldı ama ödeme doğruysa FCH9 kullanılır — sonra yeni çek bağlanır.',
        ilgili:['FCH9','FCHN','FBRA','FB08'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'FI-BL tabloları üç gruptur: **banka tanımları** ({{BNKA}}, {{T012}}, {{T012K}}), ' +
      '**ekstre verisi** ({{FEBKO}}, {{FEBEP}}) ve **çek defteri** ({{PAYR}}). ' +
      'Muhasebe kayıtları ise normal FI tablolarına ({{BKPF}}/{{BSEG}}) gider.',

    liste:[
      { ad:'BNKA', baslik:'Banka ana verisi',
        tutar:'Ülke + banka anahtarı bazında banka adı, SWIFT kodu, adres. **Dünyadaki tüm bankalar.**',
        olusturan:'{{FI01}}; ayrıca ülke bankalarının toplu yüklenmesiyle',
        guncelleyen:'{{FI01}}, {{FI02}}',
        anahtar:'BANKS + BANKL',
        iliskiler:'{{T012}} (ev bankası) ve iş ortağı banka verisi (LFBK/KNBK) buraya işaret eder.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'BANKS', aciklama:'Banka ülkesi' },
          { ad:'BANKL', aciklama:'Banka anahtarı — formatı ülkeye göre değişir' },
          { ad:'BANKA', aciklama:'Banka adı' },
          { ad:'SWIFT', aciklama:'SWIFT/BIC kodu — uluslararası ödemede zorunlu' },
        ] },

      { ad:'T012', baslik:'Ev bankası tanımı',
        tutar:'Şirket kodunun çalıştığı bankalar: ev bankası kimliği, banka ülkesi ve anahtarı.',
        olusturan:'{{FI12}}',
        guncelleyen:'{{FI12}}',
        anahtar:'BUKRS + HBKID',
        iliskiler:'{{BNKA}}’ya bağlanır; {{T012K}} ile hesap kimlikleri.',
        s4:'S/4HANA’da Bank Account Management (BAM) ile yönetilir; tablo korundu.',
        alanlar:[
          { ad:'HBKID', aciklama:'Ev bankası kimliği (örn. ISB)' },
          { ad:'BANKS / BANKL', aciklama:'{{BNKA}}’ya referans' },
        ] },

      { ad:'T012K', baslik:'Ev bankası hesap kimlikleri',
        tutar:'Her ev bankası hesabının IBAN’ı, hesap numarası ve **karşılık gelen G/L hesabı**.',
        olusturan:'{{FI12}}',
        guncelleyen:'{{FI12}}',
        anahtar:'BUKRS + HBKID + HKTID',
        iliskiler:'{{REGUH}} `HBKID`/`HKTID` üzerinden buraya işaret eder; {{FBZP}} banka belirleme buraya bakar.',
        s4:'BAM ile yönetilir.',
        alanlar:[
          { ad:'HKTID', aciklama:'Hesap kimliği (örn. 0001)' },
          { ad:'HKONT', aciklama:'**G/L hesabı** — bu hesaptaki hareketlerin muhasebe karşılığı' },
          { ad:'BANKN / IBAN', aciklama:'Hesap numarası ve IBAN' },
        ] },

      { ad:'PAYR', baslik:'Çek kayıt defteri',
        tutar:'Her çekin numarası, lehtarı, tutarı, bağlı ödeme belgesi ve **durumu**.',
        olusturan:'Ödeme ortamı üretimi ({{F110}} çek yöntemi) veya {{FCH5}}',
        guncelleyen:'{{FCH5}}, {{FCHR}}, {{FCH8}}, {{FCH9}}',
        anahtar:'ZBUKR + HBKID + HKTID + CHECT',
        iliskiler:'Ödeme belgesine (`VBLNR`) ve {{T012K}}’ye bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'CHECT', aciklama:'Çek numarası' },
          { ad:'VBLNR', aciklama:'Bağlı ödeme belgesi' },
          { ad:'ZALDT', aciklama:'Çek tarihi' },
          { ad:'BANCD', aciklama:'**Tahsil tarihi** — doluysa çek bankada tahsil edilmiştir' },
          { ad:'VOIDR', aciklama:'İptal nedeni — doluysa çek iptal edilmiş' },
        ] },

      { ad:'FEBKO', baslik:'Banka ekstresi başlığı',
        tutar:'Her ekstrenin başlık bilgisi: ev bankası, hesap, ekstre numarası, tarih, açılış/kapanış bakiyesi.',
        olusturan:'{{FF_5}} (elektronik) veya {{FF67}} (manuel)',
        guncelleyen:'Ekstre yükleme işlemleri',
        anahtar:'KUKEY',
        iliskiler:'{{FEBEP}} ile satırları.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'AZDAT', aciklama:'Ekstre tarihi' },
          { ad:'ASBTR / AEBTR', aciklama:'Açılış ve kapanış bakiyesi' },
          { ad:'ANZDS', aciklama:'Satır sayısı' },
        ] },

      { ad:'FEBEP', baslik:'Banka ekstresi kalemleri',
        tutar:'Ekstrenin satırları: banka işlem kodu, tutar, {{valor-tarihi}}, açıklama metni ve ' +
              '**kayıt durumu**.',
        olusturan:'{{FF_5}} / {{FF67}}',
        guncelleyen:'{{FEBAN}} ile eşleştirme yapıldığında durum güncellenir',
        anahtar:'KUKEY + ESNUM',
        iliskiler:'{{FEBKO}}’nun çocuğu; eşleştiği FI belgesine bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'VGINT / VGEXT', aciklama:'İç ve dış banka işlem kodu — kayıt kuralını belirler' },
          { ad:'KWBTR', aciklama:'Satır tutarı' },
          { ad:'VALUT', aciklama:'{{valor-tarihi}}' },
          { ad:'SGTXT / Not to payee', aciklama:'Açıklama metni — otomatik eşleştirmenin ana girdisi' },
          { ad:'EPVOZ / Durum', aciklama:'Satırın işlenme durumu — {{FEBAN}}’da bekleyenler buradan bulunur' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Banka muhasebesi tablo ilişkileri',
      varliklar:[
        { ad:'BNKA', rol:'Ana veri', aciklama:'Tüm bankalar',
          alanlar:[{ ad:'BANKS', tip:'pk' }, { ad:'BANKL', tip:'pk' }, { ad:'BANKA' }, { ad:'SWIFT' }] },
        { ad:'T012', rol:'Yapılandırma', aciklama:'Ev bankası',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'HBKID', tip:'pk' }, { ad:'BANKL', tip:'fk' }] },
        { ad:'T012K', rol:'Yapılandırma', hub:true, aciklama:'Hesap kimlikleri',
          alanlar:[{ ad:'HBKID', tip:'fk' }, { ad:'HKTID', tip:'pk' }, { ad:'HKONT', tip:'fk' }, { ad:'IBAN' }] },
        { ad:'SKB1', rol:'Ana veri', aciklama:'Banka G/L hesabı',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'XOPVW' }] },
        { ad:'REGUH', rol:'Ödeme', aciklama:'Ödeme başlığı',
          alanlar:[{ ad:'VBLNR', tip:'pk' }, { ad:'HBKID', tip:'fk' }, { ad:'HKTID', tip:'fk' }] },
        { ad:'PAYR', rol:'Çek', aciklama:'Çek defteri',
          alanlar:[{ ad:'CHECT', tip:'pk' }, { ad:'VBLNR', tip:'fk' }, { ad:'BANCD' }] },
        { ad:'FEBKO', rol:'Ekstre', aciklama:'Ekstre başlığı',
          alanlar:[{ ad:'KUKEY', tip:'pk' }, { ad:'HBKID', tip:'fk' }, { ad:'AZDAT' }] },
        { ad:'FEBEP', rol:'Ekstre', aciklama:'Ekstre kalemleri',
          alanlar:[{ ad:'KUKEY', tip:'fk' }, { ad:'ESNUM', tip:'pk' }, { ad:'VGINT' }, { ad:'KWBTR' }] },
      ],
      iliskiler:[
        { from:'BNKA', to:'T012', alanlar:'BANKS + BANKL', not:'ev bankası bir bankaya bağlıdır' },
        { from:'T012', to:'T012K', alanlar:'BUKRS + HBKID', not:'bir bankada birçok hesap' },
        { from:'T012K', to:'SKB1', alanlar:'HKONT → SAKNR', not:'hesap kimliği → G/L hesabı' },
        { from:'T012K', to:'REGUH', alanlar:'HBKID + HKTID', not:'ödeme hangi hesaptan çıktı' },
        { from:'REGUH', to:'PAYR', alanlar:'VBLNR', not:'ödemeye bağlı çek' },
        { from:'T012K', to:'FEBKO', alanlar:'HBKID + HKTID', not:'hesabın ekstresi' },
        { from:'FEBKO', to:'FEBEP', alanlar:'KUKEY', not:'ekstre → satırlar' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'FI-BL’de günlük iş iki ekranda geçer: **ekstre işleme** ({{FF67}} veya {{FEBAN}}) ve ' +
      '**mutabakat kontrolü** ({{FBL3N}}). Yapılandırma tarafında ise {{FI12}} merkezdedir.',

    ekranlar:[
      { ad:'{{FI12}} — Ev bankası tanımlama',
        aciklama:'Üç katmanlı bir ekran: ev bankası → hesap kimliği → G/L hesabı bağı.',
        alanlar:[
          { ad:'Ev bankası kimliği (`HBKID`)', zorunlu:true, aciklama:'5 karakter, serbest metin (ISB, GRNT). Anlamlı bir kısaltma seç — {{FBZP}}’de sık göreceksin.' },
          { ad:'Banka ülkesi + Banka anahtarı', zorunlu:true, aciklama:'{{BNKA}}’ya referans. Banka tanımlı değilse önce {{FI01}}.' },
          { ad:'Hesap kimliği (`HKTID`)', zorunlu:true, aciklama:'Aynı bankadaki her hesap için ayrı (0001 TL, 0002 EUR).' },
          { ad:'**G/L hesabı (`HKONT`)**', zorunlu:true, aciklama:'Bu hesabın muhasebe karşılığı. Gerçek banka hesabı girilir; ara hesaplar {{FBZP}}’de ayrıca tanımlanır.' },
          { ad:'IBAN / Hesap numarası', zorunlu:false, aciklama:'Ödeme dosyasında kullanılır.' },
        ],
        ipucu:'Ev bankası kimliğini anlamlı seç: **ISB**, **GRNT**, **AKBNK** gibi. ' +
              '{{FBZP}} banka belirlemede ve {{REGUH}} kayıtlarında sürekli karşına çıkacak.' },

      { ad:'{{FF67}} — Manuel ekstre giriş ekranı',
        aciklama:'Üstte ekstre başlığı, altta satır tablosu. Bakiye kontrolü en değerli özelliğidir.',
        alanlar:[
          { ad:'Ev bankası / Hesap kimliği', zorunlu:true, aciklama:'Hangi hesabın ekstresi.' },
          { ad:'Ekstre numarası', zorunlu:true, aciklama:'**Sıralı olmalıdır.** Atlanan numara mutabakat boşluğu yaratır.' },
          { ad:'Açılış bakiyesi', zorunlu:true, aciklama:'Bir önceki ekstrenin kapanış bakiyesine eşit olmalıdır.' },
          { ad:'Kapanış bakiyesi', zorunlu:true, aciklama:'Sistem satır toplamlarının bu farkı vermesini bekler — **güçlü bir kontrol**.' },
          { ad:'Satır: işlem kodu', zorunlu:true, aciklama:'Banka işlem kodu; {{OT83}}’teki kayıt kuralını ve hedef hesabı belirler.' },
          { ad:'Satır: tutar / {{valor-tarihi}}', zorunlu:true, aciklama:'Valör tarihi nakit yönetimi için, kayıt tarihi muhasebe dönemi için kullanılır.' },
          { ad:'Satır: referans / açıklama', zorunlu:false, aciklama:'Otomatik eşleştirmenin ana girdisi — belge numarası, fatura no veya iş ortağı adı.' },
        ],
        ipucu:'Açılış-kapanış bakiye kontrolünü **asla atlama**. Bu tek kontrol, ekstre girişindeki ' +
              'hataların neredeyse tamamını yakalar ve mutabakatı kurtarır.' },

      { ad:'{{FEBAN}} — Ekstre düzeltme (post-processing)',
        aciklama:'Otomatik eşleşmeyen satırların elle bağlandığı ekran. Detayı için {{konu:ebs}} konusuna bak.',
        alanlar:[
          { ad:'Ekstre / satır seçimi', zorunlu:true, aciklama:'İşlenmemiş satırlar listelenir.' },
          { ad:'Hedef: G/L hesabı veya açık kalem', zorunlu:true, aciklama:'Satır ya doğrudan bir hesaba yazılır ya da bir açık kalemle eşleştirilir.' },
          { ad:'Kayıt kuralı', zorunlu:false, aciklama:'Otomatik belirlenir; elle değiştirilebilir.' },
        ] },

      { ad:'{{FBL3N}} — Ara hesap kontrolü',
        aciklama:'Banka mutabakatının asıl yapıldığı yer.',
        alanlar:[
          { ad:'Hesap', zorunlu:true, aciklama:'{{banka-ara-hesabi}} (102.91, 102.81 gibi).' },
          { ad:'Kalem tipi', zorunlu:true, aciklama:'**Açık kalemler** + anahtar tarih = ay sonu.' },
          { ad:'Düzen', zorunlu:false, aciklama:'Belge tarihi ve tutara göre sırala; eski kalemler üste gelsin.' },
        ],
        ipucu:'Ara hesapta **30 günden eski açık kalem** varsa mutlaka araştır. ' +
              'Normal şartlarda kalemler birkaç gün içinde kapanır.' },
    ],

    zorunlu:['Ev bankası kimliği','Hesap kimliği','G/L hesabı','Ekstre numarası','Açılış/kapanış bakiyesi','Satır tutarı ve işlem kodu'],
    opsiyonel:['IBAN','Valör tarihi','Referans','Not to payee metni','Çek numarası'],

    hatalar:[
      { mesaj:'Bank key ... does not exist for country TR', sebep:'Banka {{BNKA}}’da tanımlı değil.', cozum:'{{FI01}} ile banka ana verisini oluştur.' },
      { mesaj:'Closing balance does not match line items', sebep:'Girilen satırların toplamı açılış-kapanış farkını vermiyor.', cozum:'Satırları kontrol et; eksik veya fazla kalem vardır.' },
      { mesaj:'Posting rule ... not defined', sebep:'{{OT83}}’te banka işlem kodu için kayıt kuralı yok.', cozum:'Kural tanımla veya satırı {{FEBAN}}’da elle bağla.' },
      { mesaj:'No suitable house bank found (F110)', sebep:'{{FBZP}} banka belirlemede sıralama veya kullanılabilir tutar eksik.', cozum:'{{FBZP}} → Banka belirleme → **kullanılabilir tutarları gir** (boş = sıfır).' },
      { mesaj:'Check number ... is already used', sebep:'Çek numarası tüketilmiş veya aralık çakışıyor.', cozum:'{{FCHN}} ile kontrol et; {{FCHI}} ile yeni aralık tanımla.' },
      { mesaj:'G/L account ... requires open item management for clearing', sebep:'Ara hesapta {{acik-kalem-yonetimi}} kapalı.', cozum:'Bakiyeyi sıfırla, {{FS00}}’da ayarı aç, bakiyeyi geri yükle. **Hesap açılırken doğru kurulmalıydı.**' },
      { mesaj:'Statement number ... already exists', sebep:'Aynı ekstre iki kez yüklenmiş.', cozum:'Mükerrer yüklemeyi iptal et; {{FEBA}} ile mevcut ekstreleri kontrol et.' },
    ],

    ipuclari:[
      'Her banka hesabı için **üç G/L hesabı** planla: gerçek hesap + giden ara hesap + gelen ara hesap. ' +
      'Ara hesaplarda {{acik-kalem-yonetimi}} **açık** olmalıdır.',
      'Ara hesap bakiyelerini **haftalık** izle. Büyüme, mutabakat kopukluğunun ilk ve tek sessiz işaretidir.',
      'Ay sonunda ara hesapta 30 günden eski açık kalem varsa tek tek araştır — ' +
      'bunlar genelde kaydedilmemiş veya iki kez kaydedilmiş hareketlerdir.',
      'Çek kullanılıyorsa {{FCHN}} ile **tahsil edilmemiş çekler** listesi al; ' +
      '103 hesabının bakiyesi bu listenin toplamına eşit olmalıdır.',
      'Ev bankası kimliğini anlamlı kısaltmayla ver ({{FBZP}} ve {{REGUH}}’ta sürekli göreceksin).',
      'Elektronik ekstreye geçmek FI-BL’deki en yüksek getirili iyileştirmedir: ' +
      'manuel girişteki hata riski ortadan kalkar ve mutabakat günlerden saatlere iner.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BNKA', ne:'Banka ana verisi — {{FI01}} ile' },
      { tablo:'T012', ne:'Ev bankası tanımı — {{FI12}} ile' },
      { tablo:'T012K', ne:'Hesap kimlikleri ve G/L hesabı bağı' },
      { tablo:'FEBKO', ne:'Ekstre başlığı — {{FF_5}} veya {{FF67}} ile' },
      { tablo:'FEBEP', ne:'Ekstre satırları ve işlenme durumu' },
      { tablo:'PAYR', ne:'Çek kayıtları; tahsil edildiğinde `BANCD` dolar' },
      { tablo:'BKPF / BSEG', ne:'Ekstre işlemenin ürettiği FI belgeleri' },
      { tablo:'BSIS', ne:'Ara hesap açık kalemleri (açık kalem yönetimli olduğu için)' },
    ],

    commit:
      'Banka ekstresi işleme **iki aşamalıdır**: önce ekstre verisi ({{FEBKO}}/{{FEBEP}}) yazılır, ' +
      'sonra kayıt kuralları uygulanarak FI belgeleri üretilir.\n\n' +
      'Bu ayrım önemlidir: ekstre yüklenmiş olabilir ama satırlar **henüz muhasebeleşmemiş** olabilir. ' +
      '{{FEBA}} ile ekstrenin yüklenip yüklenmediği, {{FEBAN}} ile satırların işlenip işlenmediği ayrı ayrı kontrol edilir.\n\n' +
      'Bazı kurulumlarda ekstre işleme toplu giriş (batch input) oturumu üretir ve {{SM35}} ile çalıştırılır; ' +
      'bu durumda oturum çalıştırılmadan hiçbir muhasebe kaydı oluşmaz.',

    belgeNo:
      'Ekstre işleme genelde **iki belge** üretir: bir tanesi banka hesabı ile ara hesap arasındaki ' +
      'hareket (belge türü **SB** veya benzeri), diğeri gerekiyorsa açık kalem kapatması.\n\n' +
      'Çek numarası ayrı bir aralıktan gelir ({{FCHI}} ile tanımlanır) ve ' +
      '**fiziksel çek defteriyle eşleşmelidir**.',

    postingLogic:
      'Ekstre satırının muhasebeleşme zinciri:\n\n' +
      '**1. Banka işlem kodu** (bankadan gelen kod, örn. 051, 835) okunur.\n' +
      '**2. {{OT83}}** — bu kod hangi **kayıt kuralına** eşleniyor?\n' +
      '**3. Kayıt kuralı** — hangi hesaplar borç/alacak yazılacak? (hesap sembolleri üzerinden)\n' +
      '**4. Hesap sembolü çözümlenir** — sembol, o ev bankası hesabının gerçek G/L hesabına dönüşür.\n' +
      '**5. Eşleştirme denenir** — açıklama metnindeki belge numarası veya tutar ile açık kalem aranır.\n' +
      '**6.** Eşleşirse kapatma yapılır; eşleşmezse satır {{FEBAN}}’a düşer.',

    belgeTuru:
      'Banka ekstresi kayıtlarında genelde **SB** (banka kaydı) veya şirkete özel bir tür kullanılır. ' +
      'Belge türü {{OT83}} kayıt kuralında tanımlanır. Çek ödemelerinde **KZ** kullanılır.',

    numberRange:
      'İki ayrı numaralandırma vardır: **FI belge numarası** ({{FBN1}}) ve ' +
      '**çek numarası** ({{FCHI}}). Çek numarası mali yıla bağlı değildir ve ' +
      'fiziksel çek defteriyle eşleşmelidir.',

    accountDetermination:
      'Ekstre işlemede hesaplar **hesap sembolleri** (account symbols) üzerinden belirlenir. ' +
      'Bu, {{OT83}}’ün en zarif kısmıdır: kayıt kuralında "banka hesabı" ve "ara hesap" gibi ' +
      '**semboller** kullanılır; sembol, hangi ev bankası hesabına ait olduğuna göre ' +
      'gerçek G/L hesabına çözümlenir.\n\n' +
      'Sayesinde tek bir kayıt kuralı 11 farklı banka hesabı için çalışır. ' +
      'Detayı için {{konu:ebs}} konusuna bak.',

    tur:
      '**Özelleştirme:** {{ev-bankasi}} tanımları (S/4HANA öncesi), {{OT83}} kayıt kuralları ve ' +
      'hesap sembolleri, çek numara aralıkları, {{FBZP}} banka belirleme.\n\n' +
      '**Ana veri:** {{BNKA}} banka kayıtları; S/4HANA’da ev bankası hesapları da ana veriye taşındı (BAM).\n\n' +
      '**Hareket verisi:** ekstreler, çekler, ödeme kayıtları.',

    transport:
      '{{OT83}} kayıt kuralları ve hesap sembolleri taşınır. ' +
      '{{ev-bankasi}} tanımları **sisteme özgüdür** — test sistemindeki banka hesapları canlıdakinden farklıdır ' +
      've genelde taşınmaz.\n\n' +
      '**Kritik:** {{FBZP}} banka belirleme ayarları ev bankalarına referans verir. ' +
      'FBZP taşındıktan sonra hedef sistemde ev bankalarının varlığı **mutlaka kontrol edilmelidir**.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Banka Muhasebesi → Banka Hesapları → Ev Bankalarını Tanımla', not:'{{ev-bankasi}} ({{FI12}})' },
      { yol:'SPRO → … → Banka Muhasebesi → İş İşlemleri → Ödeme İşlemleri → Manuel Banka Ekstresi → Global Ayarları Yap', not:'{{OT83}} — hesap sembolleri ve kayıt kuralları' },
      { yol:'SPRO → … → Banka Muhasebesi → İş İşlemleri → Çek Ödemesi → Çek Numara Aralıklarını Tanımla', not:'{{FCHI}}' },
      { yol:'SPRO → … → Satıcı Hesapları → İş İşlemleri → Giden Ödemeler → Otomatik Giden Ödemeler → Ödeme Programı Yapılandırması → Banka Belirleme', not:'{{FBZP}} — hangi bankadan ödenecek' },
    ],

    ekstra:[
      { ic:'⚖️', baslik:'Banka mutabakatı nasıl yapılır? — dört adım', metin:
        'Ay sonunda muhasebedeki banka bakiyesi ile ekstrenin kapanış bakiyesi karşılaştırılır. ' +
        'Fark neredeyse her zaman açıklanabilir dört kalemden oluşur:\n\n' +
        '**1. Yolda olan giden ödemeler** — kaydedildi, bankaya yansımadı. ' +
        '→ giden {{banka-ara-hesabi}}nın bakiyesi.\n\n' +
        '**2. Yolda olan gelen tahsilatlar** — kaydedildi, bankaya yansımadı. ' +
        '→ gelen ara hesabın bakiyesi.\n\n' +
        '**3. Tahsil edilmemiş çekler** — yazıldı, ibraz edilmedi. ' +
        '→ 103 hesabının bakiyesi ({{FCHN}} listesiyle doğrulanır).\n\n' +
        '**4. Bankanın kaydettiği ama bize ulaşmayan hareketler** — masraf, faiz, beklenmedik havale. ' +
        '→ ekstre işlenince kaybolur.\n\n' +
        'Bu dördü açıklandıktan sonra kalan fark **gerçek bir hatadır** ve araştırılmalıdır.' },

      { ic:'🔐', baslik:'Banka tarafında iç kontrol', metin:
        'Banka, suistimal riskinin en yüksek olduğu alandır. Üç temel kontrol:\n\n' +
        '**Görevler ayrılığı:** ödeme kaydeden, onaylayan ve banka dosyasını gönderen kişiler **farklı olmalıdır**.\n\n' +
        '**Banka hesabı değişikliği:** iş ortaklarının IBAN değişiklikleri {{CDPOS}} üzerinden izlenmeli ve ' +
        'ayrı onaya bağlanmalıdır — sahte "banka hesabımız değişti" e-postası en yaygın dolandırıcılık yöntemidir.\n\n' +
        '**Çek defteri kontrolü:** kullanılmayan çek numaraları {{FCHN}} ile düzenli kontrol edilmeli; ' +
        'kayıp çekler {{FCH9}} ile iptal edilmelidir.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Ara hesapta açık kalem yönetimi zorunludur', metin:
        '{{banka-ara-hesabi}}nda {{acik-kalem-yonetimi}} kapalıysa ekstre eşleştirmesi ' +
        '**hiç çalışmaz**: kalemler kapatılamaz, bakiye şişer ve mutabakat imkânsızlaşır.\n\n' +
        'Bu ayar hesap açılırken yapılmalıdır. Hareket görmüş bir hesapta değiştirmek, ' +
        'bakiyeyi sıfırlayıp geri yüklemeyi gerektirir ve canlıda risklidir.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'FI-BL’de S/4HANA’nın getirdiği en büyük değişiklik **Bank Account Management (BAM)**tir: ' +
      'ev bankası hesapları yapılandırma olmaktan çıkıp **onay akışlı ana veriye** dönüştü. ' +
      'Ekstre işleme mantığı ise değişmedi.',

    eccFarklari:[
      { konu:'Ev bankası yönetimi', ecc:'{{FI12}} — customizing gibi davranır, taşıma isteği gerektirir', s4:'**Bank Account Management** — ana veri, Fiori arayüzü, onay akışı' },
      { konu:'Banka hesabı açma', ecc:'Danışman/yetkili tarafından IMG’den', s4:'**İş kullanıcısı** tarafından, onay akışıyla' },
      { konu:'Ekstre işleme', ecc:'{{FF_5}}, {{FEBAN}}', s4:'**Aynı** + Fiori "Reprocess Bank Statement Items"' },
      { konu:'Nakit görünürlüğü', ecc:'Ayrı Cash Management modülü', s4:'Entegre Cash Management — banka bakiyeleri anlık' },
      { konu:'Ödeme ortamı', ecc:'Klasik RFFO* programları yaygın', s4:'**PMW standart** ({{FBPM}})' },
      { konu:'Banka ana verisi', ecc:'{{BNKA}} / {{FI01}}', s4:'Değişmedi' },
    ],

    universalJournal:
      'Banka hareketleri de {{ACDOCA}}’ya yazılır ve banka hesabı, kâr merkezi ve iş ortağı ' +
      'aynı satırda tutulur. Pratik sonucu: nakit akış raporları tek tablodan üretilebilir ve ' +
      'banka mutabakatı için gereken kalem sorguları belirgin şekilde hızlanır.',

    kalkanTcodes:[
      { eski:'{{FI12}}', yeni:'FI12_HBANK / BAM (Fiori)', not:'Klasik işlem çalışır ama BAM önerilir' },
      { eski:'Klasik RFFO* ödeme ortamı programları', yeni:'{{FBPM}} (PMW)', not:'Yeni kurulumlarda PMW' },
      { eski:'FF.5', yeni:'{{FF_5}}', not:'Aynı işlev, güncel sürüm' },
    ],

    fiori:[
      { ad:'Manage Bank Accounts', aciklama:'Ev bankası hesaplarını onay akışıyla yönetir (BAM). FI-BL’deki en büyük yenilik.' },
      { ad:'Reprocess Bank Statement Items', aciklama:'{{FEBAN}}’ın Fiori karşılığı; eşleşmeyen satırlar görsel iş listesi olarak.' },
      { ad:'Cash Flow Analyzer', aciklama:'Banka bakiyelerini ve beklenen nakit hareketlerini birlikte gösterir.' },
      { ad:'Bank Statement Monitor', aciklama:'Hangi hesapların ekstresi yüklendi, hangileri eksik — mutabakat kontrolü.' },
      { ad:'Manage Checks', aciklama:'{{FCHN}} yerine; çek defteri yönetimi.' },
    ],

    compatibilityViews:[
      '{{BNKA}}, {{T012}}, {{T012K}}, {{PAYR}}, {{FEBKO}}, {{FEBEP}} — **hepsi fiziksel tablo olarak duruyor**.',
      'FI-BL, S/4HANA’da tablo yapısı en az değişen alanlardan biridir.',
      'Değişen, bu tabloların **nasıl yönetildiğidir** (BAM ile ana veri gibi), yapısı değil.',
    ],

    performans:
      'Ekstre işleme ve mutabakat sorguları {{ACDOCA}} üzerinden çalıştığı için hızlandı. ' +
      'Asıl kazanç ise BAM ile gelen **süreç hızıdır**: yeni banka hesabı açmak eskiden ' +
      'danışman + taşıma isteği gerektirirken artık iş kullanıcısı tarafından onay akışıyla yapılabiliyor.',

    bestPractices:[
      'S/4HANA geçişinde ev bankası hesaplarını **BAM’a taşı** ve banka hesabı değişikliklerini ' +
      'onay akışına bağla — iç kontrol açısından en yüksek getirili adımdır.',
      'Elektronik ekstreye geçmemiş hesaplar varsa geçiş projesi bunun için iyi bir fırsattır.',
      'Ödeme ortamı için PMW kullan; klasik RFFO* programlarına yeni geliştirme yapma.',
      'Ara hesap yapısını geçişte gözden geçir: her banka hesabı × yön deseni sürdürülebilir mi?',
      'Geçiş öncesi ara hesaplardaki eski açık kalemleri temizle; kirli bakiyeler yeni sisteme taşınır.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Ay sonu banka mutabakatı: 400.000 TL fark nereden geliyor?',
    hikaye:
      '**Marmara Tekstil A.Ş.**’de 30 Eylül. Muhasebe müdürü İş Bankası hesabının mutabakatını yapıyor. ' +
      'Muhasebedeki bakiye **3.850.000 TL**, bankanın ekstresi **4.250.000 TL** gösteriyor. ' +
      'Aradaki **400.000 TL** fark.\n\n' +
      'Bu senaryo, banka mutabakatının nasıl yapıldığını ve farkın dört bileşene nasıl ayrıştırıldığını ' +
      'adım adım gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · Ev bankası ISB · Hesap kimliği 0001' },
      { k:'Gerçek banka hesabı', v:'102001' },
      { k:'Giden ara hesap', v:'102091 (açık kalem yönetimli ✓)' },
      { k:'Gelen ara hesap', v:'102081 (açık kalem yönetimli ✓)' },
      { k:'Çek hesabı', v:'103000 — verilen çekler' },
      { k:'Tarih', v:'30.09.2026' },
    ],

    adimlar:[
      { baslik:'Bakiyeler karşılaştırılır', tcode:'FS10N',
        aciklama:'İlk adım: muhasebe ne diyor, banka ne diyor?',
        girdi:[
          { alan:'Muhasebe — 102001 bakiyesi', deger:'3.850.000 TL (borç)' },
          { alan:'Banka ekstresi kapanış bakiyesi', deger:'4.250.000 TL' },
          { alan:'**Fark**', deger:'**400.000 TL** — banka daha fazla gösteriyor' },
        ],
        not:'Banka daha fazla gösteriyorsa: ya bizim kaydettiğimiz bir çıkış bankada henüz gerçekleşmemiş, ' +
             'ya bankaya gelen bir para bizde kayıtlı değil. Her ikisi de olabilir.' },

      { baslik:'Bileşen 1 — Giden ara hesap kontrol edilir', tcode:'FBL3N',
        aciklama:'25 Eylül ödeme koşusunun bir kısmı bankaya 1 Ekim’de yansıyacak. ' +
                 'Bu kalemler ara hesapta **açık** bekliyor.',
        girdi:[
          { alan:'Hesap / Kalem tipi', deger:'102091 · **Açık kalemler** · 30.09.2026' },
          { alan:'Bulgu', deger:'8 açık kalem, toplam **310.000 TL** alacak' },
          { alan:'Detay', deger:'Hepsi 28–30 Eylül tarihli ödemeler — ekstreye henüz yansımamış' },
          { alan:'Anlamı', deger:'Bizim kayıtlarımızda para çıktı, bankada henüz çıkmadı' },
        ],
        not:'Bu **normal ve beklenen** bir farktır. Ödeme dosyası bankaya gönderildi ama ' +
             'banka henüz işlemedi. 1–2 gün içinde kapanacak.' },

      { baslik:'Bileşen 2 — Gelen ara hesap kontrol edilir', tcode:'FBL3N',
        aciklama:'Müşterilerden gelen tahsilatlardan bazıları kaydedildi ama ekstreye yansımadı.',
        girdi:[
          { alan:'Hesap', deger:'102081 · Açık kalemler · 30.09.2026' },
          { alan:'Bulgu', deger:'3 açık kalem, toplam **45.000 TL** borç' },
          { alan:'Anlamı', deger:'Bizde tahsilat kayıtlı, bankaya henüz girmemiş' },
        ],
        not:'Bu kalemler farkı **azaltır** (bizim bakiyemiz bu kadar fazla görünüyor).' },

      { baslik:'Bileşen 3 — Tahsil edilmemiş çekler', tcode:'FCHN',
        aciklama:'Yazılmış ama henüz bankaya ibraz edilmemiş çekler.',
        girdi:[
          { alan:'Süzgeç', deger:'Ev bankası ISB · Durum: **tahsil edilmemiş**' },
          { alan:'Bulgu', deger:'5 çek, toplam **135.000 TL**' },
          { alan:'Doğrulama', deger:'103000 hesabının bakiyesi = 135.000 TL ✓ **eşleşiyor**' },
          { alan:'Anlamı', deger:'Çekler yazıldı, karşı taraf henüz bozdurmadı' },
        ],
        not:'{{FCHN}} listesinin toplamı ile 103 hesabının bakiyesi **eşleşmelidir**. ' +
             'Eşleşmiyorsa çek kaydı ile muhasebe kaydı arasında kopukluk vardır.' },

      { baslik:'Bileşen 4 — Ekstrede olup bizde olmayanlar', tcode:'FEBAN',
        aciklama:'Ekstre yüklenmiş ama bazı satırlar henüz işlenmemiş.',
        girdi:[
          { alan:'İşlenmemiş satırlar', deger:'4 satır bekliyor' },
          { alan:'Satır 1', deger:'Banka masrafı 450 TL — kayıt kuralı tanımlı, işlenecek' },
          { alan:'Satır 2', deger:'Mevduat faizi 1.200 TL — kayıt kuralı tanımlı' },
          { alan:'Satır 3–4', deger:'Müşteriden 2 havale, toplam **178.750 TL** — açıklama metni eşleşmedi' },
          { alan:'Toplam etki', deger:'+179.500 TL bizim kayıtlarımıza girecek' },
        ],
        not:'Havalelerin eşleşmemesinin sebebi: müşteri açıklama alanına fatura numarası yazmamış. ' +
             '{{FEBAN}}’da elle müşteri hesabına bağlanacak.' },

      { baslik:'Mutabakat tablosu çıkarılır', tcode:'FBL3N',
        aciklama:'Dört bileşen bir araya getirilip fark açıklanıyor.',
        girdi:[
          { alan:'Muhasebe bakiyesi (102001)', deger:'3.850.000 TL' },
          { alan:'(+) Yolda olan giden ödemeler', deger:'+310.000 TL (henüz bankadan çıkmadı)' },
          { alan:'(−) Yolda olan gelen tahsilatlar', deger:'−45.000 TL (henüz bankaya girmedi)' },
          { alan:'(+) Tahsil edilmemiş çekler', deger:'+135.000 TL (henüz bozdurulmadı)' },
          { alan:'(−) Ekstrede olup işlenmemiş', deger:'−179.500 TL (faiz + havaleler − masraf)' },
          { alan:'**Hesaplanan banka bakiyesi**', deger:'3.850.000 + 310.000 − 45.000 + 135.000 − 179.500 = **4.070.500 TL**' },
          { alan:'Gerçek ekstre bakiyesi', deger:'4.250.000 TL' },
          { alan:'**Açıklanamayan fark**', deger:'**179.500 TL**' },
        ],
        not:'Hesap tutmuyor! Ama sebep basit: ekstredeki 4 satır **henüz işlenmedi**. ' +
             'Onlar işlendiğinde muhasebe bakiyesi 179.500 TL artacak ve fark kapanacak.' },

      { baslik:'Bekleyen ekstre satırları işlenir', tcode:'FEBAN',
        aciklama:'İki havale elle müşteri hesaplarına bağlanıyor; masraf ve faiz otomatik kaydediliyor.',
        girdi:[
          { alan:'Havale 1 — 98.750 TL', deger:'C-5001 müşterisinin açık faturasıyla eşleştirildi' },
          { alan:'Havale 2 — 80.000 TL', deger:'C-5012 müşterisinin açık faturasıyla eşleştirildi' },
          { alan:'Banka masrafı', deger:'450 TL → 770 gider hesabına (kural otomatik)' },
          { alan:'Mevduat faizi', deger:'1.200 TL → 642 faiz geliri (kural otomatik)' },
        ],
        fis:{ baslik:'Belge 1000005678 — Ekstre kaydı', belgeTuru:'SB', tarih:'30.09.2026',
          satirlar:[
            { hesap:'102001', ad:'Bankalar — İŞB', borc:179500, not:'Net giriş' },
            { hesap:'120', ad:'Alıcılar — C-5001', alacak:98750, not:'Açık kalem kapandı' },
            { hesap:'120', ad:'Alıcılar — C-5012', alacak:80000, not:'Açık kalem kapandı' },
            { hesap:'642', ad:'Faiz gelirleri', alacak:1200 },
            { hesap:'770', ad:'Banka masrafları', borc:450 },
          ], not:'Havaleler doğrudan gerçek banka hesabına yazıldı — **ara hesap kullanılmadı**. ' +
                 'Çünkü bu tahsilatların muhasebede önceden kaydedilmiş bir karşılığı yoktu; ' +
                 'ilk kez ekstreden öğrenildi.' },
        tabloEtkisi:[
          { tablo:'FEBEP', ne:'4 satırın durumu "işlendi" olarak güncellendi' },
          { tablo:'BSID', ne:'İki müşteri açık kalemi kapandı' },
        ] },

      { baslik:'Mutabakat yeniden kontrol edilir', tcode:'FS10N',
        aciklama:'Bekleyen satırlar işlendikten sonra tablo tutuyor.',
        girdi:[
          { alan:'Yeni muhasebe bakiyesi', deger:'3.850.000 + 179.500 = **4.029.500 TL**' },
          { alan:'(+) Yolda giden ödemeler', deger:'+310.000 TL' },
          { alan:'(−) Yolda gelen tahsilatlar', deger:'−45.000 TL' },
          { alan:'(+) Tahsil edilmemiş çekler', deger:'+135.000 TL' },
          { alan:'**Hesaplanan**', deger:'**4.429.500 TL**' },
          { alan:'Gerçek ekstre bakiyesi', deger:'4.250.000 TL' },
          { alan:'Kalan fark', deger:'179.500 TL — **çift sayım hatası tespit edildi**' },
        ],
        not:'İşlenen satırlar hem muhasebe bakiyesine eklenip hem de "ekstrede olup bizde olmayan" ' +
             'kaleminde tutulmuş. Doğru tablo: 4.029.500 + 310.000 − 45.000 + 135.000 = 4.429.500 değil; ' +
             'ekstredeki satırlar artık kaydedildiği için o düzeltme kaleminin **çıkarılması** gerekir. ' +
             'Düzeltilmiş hesap: **4.250.000 TL ✓ tutuyor**.' },
    ],

    sonuc:
      '**400.000 TL’lik fark tamamen açıklandı:**\n\n' +
      '• **310.000 TL** yolda olan giden ödemeler (ara hesapta bekliyor)\n' +
      '• **−45.000 TL** yolda olan gelen tahsilatlar\n' +
      '• **135.000 TL** tahsil edilmemiş çekler\n' +
      '• **179.500 TL** ekstrede olup henüz işlenmemiş satırlar (işlendi)\n\n' +
      '**Üç kritik ders:**\n\n' +
      '**1. Banka mutabakatı bir "fark bulma" değil, "farkı bileşenlerine ayırma" işidir.** ' +
      'Fark her zaman vardır ve normaldir; anormal olan farkın **açıklanamamasıdır**.\n\n' +
      '**2. {{banka-ara-hesabi}} bu işi mümkün kılar.** Ara hesap olmasaydı "yolda olan para"yı ' +
      'ayrı bir kalemde göremezdik ve mutabakat tahmine dayanırdı. ' +
      'Ara hesabın bakiyesi doğrudan mutabakat tablosunun bir satırıdır.\n\n' +
      '**3. Mutabakat sırasında çift sayıma dikkat.** İşlenen ekstre satırları hem muhasebe ' +
      'bakiyesini artırır hem de düzeltme kaleminden çıkar. Aynı tutarı iki kez saymak, ' +
      'mutabakatta en sık yapılan aritmetik hatadır.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'FI-BL banka hesaplarını, nakit hareketlerini ve ödeme araçlarını yönetir; AP/AR ile banka arasında **köprüdür**.',
      'Temel mekanizma **iki aşamalı kayıttır**: işlem kaydedilir (ara hesap) → ekstre gelir (gerçek hesap).',
      '{{banka-ara-hesabi}}nın bakiyesi = **yolda olan para**. Sürekli büyüyorsa mutabakat kopmuştur.',
      'Ara hesaplarda {{acik-kalem-yonetimi}} **zorunludur** — yoksa eşleştirme yapılamaz.',
      '{{BNKA}} dünyadaki tüm bankalar; {{T012}}/{{T012K}} şirketin **kendi** hesapları ve G/L bağı.',
      'Çekler {{PAYR}} tablosunda izlenir; tahsil edilmemiş çekler mutabakattaki yaygın farktır.',
      'Banka masrafı ve faiz **ara hesap kullanmaz** — ilk kez ekstreden öğrenilir, doğrudan kaydedilir.',
      'S/4HANA’da ev bankası hesapları **Bank Account Management (BAM)** ile onay akışlı ana veriye dönüştü.',
    ],

    onemliNoktalar:[
      '**"Neden banka ara hesabı kullanılır?"** Ödemenin kaydedildiği an ile paranın fiilen çıktığı an farklıdır. Ara hesap bu ikisini ayırır ve mutabakatı mümkün kılar. **En çok sorulan FI-BL sorusudur.**',
      '**"Banka ana verisi ile ev bankası farkı?"** {{BNKA}} dünyadaki tüm bankalar (müşteri/satıcı bankaları dâhil); {{T012}} şirketin kendi çalıştığı bankalar ve G/L hesabı bağı.',
      '**"Ara hesap bakiyesi ne anlama gelir?"** Yolda olan para. Normal şartlarda birkaç günlük hareket; sürekli büyüyorsa ekstre işlenmiyordur.',
      '**"Banka masrafı neden ara hesap kullanmaz?"** Ara hesap, önceden kaydedilmiş bir hareketin bankada gerçekleşmesini bekler. Masrafı ilk kez ekstreden öğrenirsin.',
      '**"Banka mutabakatındaki dört bileşen nedir?"** Yolda giden ödemeler, yolda gelen tahsilatlar, tahsil edilmemiş çekler, ekstrede olup işlenmemiş satırlar.',
      '**"FCH8 ile FCH9 farkı?"** FCH8 hem çeki hem ödemeyi iptal eder; FCH9 **yalnızca çeki** iptal eder, ödeme durur.',
      '**"Ev bankası neden F110 için kritik?"** {{FBZP}} banka belirleme kuralları ev bankası hesaplarına referans verir; tanım eksikse "No suitable house bank found" alınır.',
      '**"S/4HANA’da ne değişti?"** Ev bankası hesapları **BAM** ile ana veriye ve onay akışına taşındı; iş kullanıcısı hesap açabiliyor.',
    ],

    sikHatalar:[
      { hata:'Ödemeyi doğrudan gerçek banka hesabına yazmak.', dogru:'{{banka-ara-hesabi}} kullanılır; ekstre gelince kapatılır. Aksi hâlde mutabakat imkânsızlaşır.' },
      { hata:'Ara hesapta {{acik-kalem-yonetimi}} açmayı unutmak.', dogru:'Hesap açılırken açılmalıdır. Sonradan değiştirmek bakiyeyi sıfırlamayı gerektirir.' },
      { hata:'Ara hesap bakiyesinin büyümesini görmezden gelmek.', dogru:'Haftalık izlenmelidir; büyüme mutabakat kopukluğunun tek sessiz işaretidir.' },
      { hata:'Ekstre giriş ekranındaki bakiye kontrolünü atlamak.', dogru:'Açılış-kapanış farkı satır toplamına eşit olmalıdır; bu kontrol hataların çoğunu yakalar.' },
      { hata:'Banka masrafını ara hesap üzerinden kaydetmek.', dogru:'Doğrudan gerçek hesaba ve gider hesabına yazılır — önceden kaydedilmiş karşılığı yoktur.' },
      { hata:'Çek numara aralığını fiziksel defterden farklı tanımlamak.', dogru:'{{FCHI}} aralığı çek defteriyle **birebir** eşleşmelidir.' },
      { hata:'Yanlış basılmış çek için {{FCH8}} kullanmak (ödeme doğruyken).', dogru:'{{FCH9}} kullanılır — yalnızca çek iptal edilir, ödeme durur, yeni çek bağlanır.' },
      { hata:'Mutabakatta işlenen ekstre satırlarını iki kez saymak.', dogru:'Satır işlendiğinde hem bakiyeye girer hem düzeltme kaleminden çıkar. En sık aritmetik hatadır.' },
    ],

    ipuclari:[
      'Her banka hesabı için **üç G/L hesabı** planla: gerçek + giden ara + gelen ara.',
      'Ara hesap bakiyelerini haftalık izle; 30 günden eski açık kalem varsa araştır.',
      '{{FCHN}} ile tahsil edilmemiş çekler listesi al ve 103 hesabının bakiyesiyle karşılaştır — eşleşmelidir.',
      'Ev bankası kimliğini anlamlı kısaltmayla ver; {{FBZP}} ve {{REGUH}}’ta sürekli göreceksin.',
      'Elektronik ekstreye geçmek FI-BL’deki **en yüksek getirili** iyileştirmedir.',
      'Mutabakatı bir tablo olarak yaz: muhasebe bakiyesi + yolda giden − yolda gelen + tahsil edilmemiş çek ' +
      '= ekstre bakiyesi. Tutmuyorsa eksik bir bileşen vardır.',
    ],

    quiz:[
      { soru:'{{F110}} ile ödeme kaydedildi. Hangi hesap alacaklanır?',
        secenekler:[
          'Gerçek banka hesabı (102001)',
          '**Banka ara hesabı (102091)**',
          'Satıcılar hesabı',
          'Kasa hesabı',
        ], dogru:1,
        aciklama:'Ödeme kaydedildiğinde para henüz bankadan çıkmamıştır; yalnızca talimat verilmiştir. ' +
                 '{{banka-ara-hesabi}} alacaklanır. Gerçek banka hesabı **ancak ekstre işlendiğinde** ' +
                 'çalışır. Bu iki aşamalı yapı mutabakatı mümkün kılar.' },

      { soru:'{{BNKA}} tablosu ile {{T012}} tablosu arasındaki fark nedir?',
        secenekler:[
          'BNKA eski, T012 yeni tablodur',
          '**BNKA dünyadaki tüm bankalar; T012 şirketin kendi çalıştığı bankalar**',
          'BNKA ekstre verisi, T012 çek verisi tutar',
          'İkisi aynıdır',
        ], dogru:1,
        aciklama:'{{BNKA}} banka ana verisidir: müşteri, satıcı ve şirketin bankaları dâhil ' +
                 'tüm bankaların listesi. {{T012}} ise **ev bankası** tanımıdır — yalnızca şirketin ' +
                 'kendi hesapları ve bunların G/L hesabı bağı ({{T012K}}).' },

      { soru:'Banka ara hesabının bakiyesi 3 aydır sürekli büyüyor. Bu neyin işaretidir?',
        secenekler:[
          'Şirketin nakdi artıyor',
          'Normal — ara hesap her zaman büyür',
          '**Ekstre işlenmiyor veya eşleştirme kurulamıyor — mutabakat kopmuş**',
          'Ödeme koşusu çok sık çalıştırılıyor',
        ], dogru:2,
        aciklama:'Ara hesabın bakiyesi "yolda olan para"dır ve normal şartlarda birkaç günlük ' +
                 'hareketten oluşur. Sürekli büyüme üç şeyden birini gösterir: ekstre işlenmiyor, ' +
                 '{{FEBAN}}’da bekleyen satırlar var, veya kaydedilen ödemeler bankada gerçekleşmiyor.' },

      { soru:'Banka masrafı neden ara hesap üzerinden kaydedilmez?',
        secenekler:[
          'Tutarı küçük olduğu için',
          '**Muhasebede önceden kaydedilmiş bir karşılığı yok — ilk kez ekstreden öğreniliyor**',
          'Gider hesabı olduğu için',
          'Teknik olarak mümkün olmadığı için',
        ], dogru:1,
        aciklama:'{{banka-ara-hesabi}}, muhasebede **zaten kaydedilmiş** bir hareketin bankada ' +
                 'gerçekleşmesini bekler. Banka masrafını, faizi ve beklenmedik havaleleri ise ' +
                 'ilk kez ekstreden öğrenirsin; beklenen bir karşılıkları yoktur, doğrudan kaydedilirler.' },

      { soru:'Banka mutabakatındaki farkın dört tipik bileşeni hangisi **değildir**?',
        secenekler:[
          'Yolda olan giden ödemeler',
          'Tahsil edilmemiş çekler',
          'Ekstrede olup işlenmemiş satırlar',
          '**Kapatılmamış satıcı faturaları**',
        ], dogru:3,
        aciklama:'Satıcı faturaları AP tarafındadır ve banka bakiyesini etkilemez (ödenene kadar). ' +
                 'Mutabakat farkının dört bileşeni: yolda giden ödemeler, yolda gelen tahsilatlar, ' +
                 'tahsil edilmemiş çekler ve ekstrede olup henüz işlenmemiş satırlar.' },

      { soru:'Çek yanlış basıldı ama ödeme tutarı ve satıcı doğru. Hangi işlem kullanılır?',
        secenekler:[
          '{{FCH8}} — hem çeki hem ödemeyi iptal eder',
          '**{{FCH9}} — yalnızca çeki iptal eder, ödeme durur**',
          '{{FB08}} ile ödeme ters kaydedilir',
          '{{FBRA}} ile kapatma geri alınır',
        ], dogru:1,
        aciklama:'{{FCH9}} yalnızca çeki iptal eder; ödeme belgesi ve kapatma **durur**. ' +
                 'Sonra yeni bir çek {{FCH5}} ile aynı ödemeye bağlanır. ' +
                 '{{FCH8}} ise ödemeyi de ters kaydeder ve satıcı açık kalemi yeniden açılır — ' +
                 'ödeme de yanlışsa o kullanılır.' },

      { soru:'Ara hesapta {{acik-kalem-yonetimi}} kapalıysa ne olur?',
        secenekler:[
          'Kayıt yapılamaz',
          'Bakiye görünmez',
          '**Ekstre eşleştirmesi çalışmaz; kalemler kapatılamaz ve bakiye şişer**',
          'Hiçbir şey olmaz',
        ], dogru:2,
        aciklama:'{{kapatma}} yalnızca açık kalem yönetimli hesaplarda yapılabilir. ' +
                 'Ara hesapta bu ayar kapalıysa ödeme kalemi ile ekstre kalemi eşleştirilemez, ' +
                 'bakiye sürekli büyür ve mutabakat imkânsızlaşır. ' +
                 'Bu ayar hesap **açılırken** yapılmalıdır.' },

      { soru:'S/4HANA’da FI-BL’deki en büyük değişiklik nedir?',
        secenekler:[
          'Ekstre formatları değişti',
          'Çek yönetimi kaldırıldı',
          '**Ev bankası hesapları Bank Account Management ile onay akışlı ana veriye dönüştü**',
          'BNKA tablosu kaldırıldı',
        ], dogru:2,
        aciklama:'ECC’de ev bankası {{FI12}} ile customizing gibi yönetilirdi ve taşıma isteği gerektirirdi. ' +
                 'S/4HANA’da **BAM** ile ana veriye taşındı: iş kullanıcısı Fiori üzerinden hesap açabiliyor ' +
                 've değişiklikler onay akışından geçiyor. Tablolar ({{BNKA}}, {{T012}}) korundu.' },
    ],

    flashcards:[
      { on:'Neden banka ara hesabı kullanılır?', arka:'Ödemenin **kaydedildiği an** ile paranın **fiilen çıktığı an** farklıdır.\n\nÖdeme → ara hesap alacak\nEkstre → ara hesap borç, gerçek hesap alacak\n\nAra hesap bakiyesi = **yolda olan para**.' },
      { on:'BNKA ile T012 farkı nedir?', arka:'**BNKA** — dünyadaki *tüm* bankalar (müşteri/satıcı bankaları dâhil). FI01 ile açılır.\n\n**T012** — şirketin *kendi* çalıştığı bankalar (ev bankası). FI12 ile açılır.\n\n**T012K** — hesap kimlikleri + G/L hesabı bağı.' },
      { on:'Ara hesap bakiyesi büyüyorsa ne anlama gelir?', arka:'**Mutabakat kopmuş.** Üç ihtimal:\n1. Ekstre işlenmiyor\n2. FEBAN’da bekleyen satırlar var\n3. Kaydedilen ödemeler bankada gerçekleşmiyor\n\nHaftalık izlenmelidir.' },
      { on:'Banka masrafı neden ara hesap kullanmaz?', arka:'Ara hesap, **önceden kaydedilmiş** bir hareketin bankada gerçekleşmesini bekler.\n\nMasrafı, faizi ve beklenmedik havaleleri ilk kez **ekstreden öğrenirsin** — beklenen karşılığı yoktur.\n\nDoğrudan gerçek hesaba yazılır.' },
      { on:'Banka mutabakatının dört bileşeni nedir?', arka:'1. **Yolda olan giden ödemeler** (giden ara hesap)\n2. **Yolda olan gelen tahsilatlar** (gelen ara hesap)\n3. **Tahsil edilmemiş çekler** (103 hesabı / FCHN)\n4. **Ekstrede olup işlenmemiş satırlar** (FEBAN)' },
      { on:'Her banka hesabı için kaç G/L hesabı planlanır?', arka:'**Üç:**\n• Gerçek banka hesabı (102001)\n• Giden ara hesap (102091)\n• Gelen ara hesap (102081)\n\nAra hesaplarda **açık kalem yönetimi zorunlu**.' },
      { on:'FCH8 ile FCH9 farkı nedir?', arka:'**FCH8** — çeki **ve** ödemeyi iptal eder. Satıcı açık kalemi yeniden açılır.\n\n**FCH9** — **yalnızca çeki** iptal eder. Ödeme belgesi durur.\n\nÇek yanlış basıldı ama ödeme doğruysa → FCH9.' },
      { on:'PAYR tablosunda hangi alan çekin tahsil edildiğini gösterir?', arka:'**BANCD** — tahsil (bank clearing) tarihi.\n\nDoluysa çek bankada tahsil edilmiştir.\nBoşsa çek hâlâ dolaşımdadır ve mutabakatta fark yaratır.\n\n**VOIDR** dolu ise çek iptal edilmiştir.' },
      { on:'Manuel ekstre girişindeki en değerli kontrol nedir?', arka:'**Açılış–kapanış bakiye kontrolü.**\n\nGirilen satırların toplamı, açılış ve kapanış bakiyesi arasındaki farka eşit olmalıdır.\n\nBu tek kontrol, ekstre girişindeki hataların neredeyse tamamını yakalar.' },
      { on:'Ev bankası neden F110 için kritiktir?', arka:'{{FBZP}} banka belirleme kuralları **ev bankası hesaplarına** referans verir.\n\nTanım eksikse: **"No suitable house bank found"**\n\nAyrıca kullanılabilir tutar girilmemişse (boş = sıfır) o bankadan hiç ödeme yapılmaz.' },
      { on:'S/4HANA’da FI-BL’de ne değişti?', arka:'**Bank Account Management (BAM):**\n• Ev bankası hesapları customizing → **ana veri**\n• Fiori arayüzü + **onay akışı**\n• İş kullanıcısı hesap açabiliyor\n\nTablolar (BNKA, T012, PAYR, FEBKO/FEBEP) **korundu**.' },
      { on:'Ekstre yüklendi ama muhasebe kaydı yok. Neden?', arka:'Ekstre işleme **iki aşamalıdır**:\n1. Veri yüklenir (FEBKO/FEBEP)\n2. Kayıt kuralları uygulanır → FI belgesi\n\nSatırlar FEBAN’da bekliyor olabilir, veya toplu giriş oturumu (SM35) çalıştırılmamıştır.' },
    ],
  },

  },
});
