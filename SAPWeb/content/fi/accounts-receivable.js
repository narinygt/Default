/* ==========================================================================
   content/fi/accounts-receivable.js — "Accounts Receivable (Müşteriler)"
   ========================================================================== */

SAP.registerTopic({
  id: 'accounts-receivable',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Accounts Receivable (FI-AR), şirketin **müşterilerden olan alacaklarını** yöneten FI alt bileşenidir. ' +
      'Faturanın kesilmesinden tahsilata, tahsil edilmeyen alacakların takibinden ({{ihtar}}) ' +
      'şüpheli alacak karşılığına kadar tüm zinciri kapsar.\n\n' +
      'AR, {{accounts-payable}}’ın **aynadaki görüntüsüdür**: orada borçlanıyorduk, burada alacaklanıyoruz. ' +
      'Tablo yapısı, kapatma mantığı ve özel ana muhasebe kavramları birebir simetriktir. ' +
      'Bu simetriyi görmek AR’ı öğrenmeyi çok hızlandırır.',

    neden:
      '**Nakit girişini yönetmek için.** Şirketin yaşaması sattığından değil, **tahsil ettiğinden** ' +
      'gelir. Kârlı bir şirket, alacağını tahsil edemediği için batabilir.\n\n' +
      '**Riski ölçmek için.** Hangi müşteri geç ödüyor, hangisine daha fazla kredi açılabilir? ' +
      '{{yaslandirma}} ve {{kredi-limiti}} bu soruları cevaplar.\n\n' +
      '**Yasal zorunluluk için.** Alacaklar bilançonun en büyük kalemlerinden biridir ve ' +
      'tahsil kabiliyetine göre değerlenmek zorundadır ({{supheli-alacak}}).',

    sirketOnemi:
      'AR, **Order-to-Cash (O2C — siparişten tahsilata)** sürecinin muhasebe ayağıdır ve SD ile iç içe çalışır. ' +
      'Faturaların büyük çoğunluğu FI’da elle girilmez; SD’de kesilir ve FI’a **otomatik** düşer.\n\n' +
      'Danışmanlık açısından kritik nokta budur: bir AR danışmanı {{VKOA}} gelir hesabı belirlemesini ' +
      've SD faturasının muhasebeye aktarım mekanizmasını bilmek zorundadır. ' +
      'Mülakatta "SD faturası kesildi ama FI belgesi oluşmadı, ne yaparsın?" sorusu tam olarak bunu ölçer.',

    gercekHayat:
      'Bir toptancı 400 bayiye vadeli satış yapıyor. Ay sonunda 12 milyon TL alacak görünüyor ' +
      'ama bunun 2,4 milyonu 90 günü geçmiş.\n\n' +
      'Finans müdürü {{FBL5N}} ile yaşlandırma alıyor: 18 bayi vadesini 60 günden fazla aşmış. ' +
      '{{F150}} ile ihtar çalıştırılıyor — 11 bayiye 1. seviye hatırlatma, 7 bayiye 3. seviye ' +
      'gecikme faizli uyarı gidiyor. Aynı anda o bayilerin {{kredi-limiti}} düşürülüyor ve ' +
      'yeni siparişleri bloklanıyor.\n\n' +
      'Bu, AR’ın sadece muhasebe değil, aynı zamanda bir **risk yönetimi** aracı olduğunu gösterir.',

    muhasebeMantigi:
      'AR’de muhasebe **üç aşamalıdır** ve AP ile tam simetriktir:\n\n' +
      '**1. Alacağın doğması (fatura).** Müşteri borçlanır, gelir alacaklanır. ' +
      'Para henüz gelmemiştir — {{tahakkuk-esasi}} gereği gelir satış anında kaydedilir.\n\n' +
      '**2. {{tahsilat}}.** Banka/kasa borçlanır, müşteri alacaklanır. ' +
      'Dikkat: **tahsilat gelir değildir** — bir varlık (alacak) başka bir varlığa (nakit) dönüşür.\n\n' +
      '**3. {{kapatma}}.** Fatura ile tahsilat eşleştirilir. Genelde 2. ve 3. adım {{F-28}}’de birliktedir.\n\n' +
      'Müşteri satırı doğrudan G/L hesabına yazılmaz; **müşteri numarası** girilir ve SAP ' +
      '{{KNB1}}’deki `AKONT` alanından {{mutabakat-hesabi}}nı kendisi bulur.',

    kavramlar: ['mutabakat-hesabi', 'acik-kalem', 'kapatma', 'tahsilat', 'vade', 'yaslandirma',
                'ihtar', 'supheli-alacak', 'kredi-limiti', 'kismi-kapatma', 'kalan-kapatma', 'avans'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'AR süreci **Order-to-Cash** zincirinin ikinci yarısıdır. Zincir satış siparişiyle başlar, ' +
      'tahsilatla biter. AR’ın devreye girdiği nokta faturadır — ama faturanın **nereden geldiği** ' +
      '(SD mi, doğrudan FI mı) tüm akışı belirler.',

    roller:[
      { rol:'Satış', gorev:'Siparişi alır ({{VA01}}). {{kredi-limiti}} aşılırsa sipariş bloklanır.' },
      { rol:'Sevkiyat / Depo', gorev:'Malı gönderir. Teslimat kaydı stok çıkışını ve maliyet kaydını doğurur.' },
      { rol:'Faturalama', gorev:'SD faturasını keser ({{VF01}}). Kaydedildiğinde FI belgesi **otomatik** oluşur.' },
      { rol:'AR muhasebe uzmanı', gorev:'Siparişsiz faturaları girer ({{FB70}}), tahsilatları kaydeder ({{F-28}}), kalemleri kapatır.' },
      { rol:'Tahsilat / Kredi kontrol', gorev:'{{yaslandirma}} takip eder, {{ihtar}} çalıştırır ({{F150}}), kredi limitlerini yönetir.' },
      { rol:'Muhasebe müdürü', gorev:'{{supheli-alacak}} kararını verir, karşılık ayırır, alacak silmeyi onaylar.' },
      { rol:'FI danışmanı', gorev:'{{VKOA}} hesap belirleme, {{FBMP}} ihtar prosedürü, tolerans ve özel G/L göstergelerini tasarlar.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Order-to-Cash — siparişten tahsilata',
      adimlar:[
        { ic:'🛒', rol:'Satış', baslik:'Satış siparişi alınır ({{VA01}})',
          aciklama:'{{kredi-limiti}} kontrolü burada yapılır. Limit aşılırsa sipariş bloklanır ve sevkiyat durur. **FI kaydı yok.**',
          cikti:'Satış siparişi', ok:'mal hazırlanır' },
        { ic:'🚚', rol:'Sevkiyat', baslik:'Teslimat ve mal çıkışı',
          aciklama:'Stok azalır, satılan malın maliyeti gider yazılır. Müşteriye alacak **henüz doğmaz** — fatura kesilmedi.',
          cikti:'Teslimat belgesi + FI stok kaydı', ok:'fatura kesilir' },
        { ic:'🧾', rol:'Faturalama', baslik:'Fatura kesilir ({{VF01}})',
          aciklama:'**Alacak burada doğar.** SD faturası kaydedilince FI belgesi otomatik oluşur; gelir hesabını {{VKOA}} belirler.',
          cikti:'{{VBRK}}/{{VBRP}} + FI belgesi', ok:'alacak açık kalem olur' },
        { ic:'📋', rol:'AR muhasebe', baslik:'Açık kalem takibe girer',
          aciklama:'Kalem {{BSID}}’ye düşer. Vade {{odeme-kosulu}}’ndan hesaplanır ve {{yaslandirma}} başlar.',
          cikti:'{{acik-kalem}}', ok:'vade dolar' },
        { ic:'💰', rol:'AR muhasebe', baslik:'Tahsilat kaydedilir ({{F-28}})',
          aciklama:'Banka borçlanır, müşteri alacaklanır ve açık kalem **aynı işlemde** kapatılır.',
          cikti:'Tahsilat belgesi', ok:'ödenmezse' },
        { ic:'📨', rol:'Tahsilat ekibi', baslik:'İhtar süreci başlar ({{F150}})',
          aciklama:'Vadesi geçmiş kalemler için kademeli {{ihtar}} gönderilir. Seviye arttıkça dil sertleşir, gecikme faizi eklenir.',
          cikti:'İhtarname + {{MHNK}} kaydı', ok:'tahsil edilemezse' },
        { ic:'⚠️', rol:'Muhasebe müdürü', baslik:'Şüpheli alacak karşılığı ayrılır',
          aciklama:'{{supheli-alacak}} olarak sınıflanır ({{ozel-ana-muhasebe-gostergesi}}), karşılık gider yazılır.',
          cikti:'Karşılık kaydı', ok:'tamamen tahsil edilemezse' },
        { ic:'🗑️', rol:'Muhasebe müdürü', baslik:'Alacak silinir (write-off)',
          aciklama:'Hukuki süreç tükendiğinde alacak kayıtlardan çıkarılır ve zarar kesinleşir.',
          cikti:'Silme kaydı' },
      ],
    },

    adimlar:[
      { rol:'Satış', eylem:'Sipariş alır, kredi kontrolü yapılır', sistem:'{{VA01}} — FI kaydı yok' },
      { rol:'Sevkiyat', eylem:'Mal çıkışı yapar', sistem:'Teslimat → stok alacak / SMM borç' },
      { rol:'Faturalama', eylem:'SD faturası keser', sistem:'{{VF01}} → müşteri borç / gelir alacak ({{VKOA}})' },
      { rol:'AR muhasebe', eylem:'Siparişsiz fatura girer', sistem:'{{FB70}} → müşteri borç / gelir alacak' },
      { rol:'AR muhasebe', eylem:'Tahsilatı kaydeder ve kapatır', sistem:'{{F-28}} → banka borç / müşteri alacak' },
      { rol:'AR muhasebe', eylem:'Eşleşmeyen kalemleri kapatır', sistem:'{{F-32}}' },
      { rol:'Tahsilat ekibi', eylem:'Yaşlandırma alır, ihtar çalıştırır', sistem:'{{FBL5N}}, {{S_ALR_87012168}}, {{F150}}' },
      { rol:'Muhasebe müdürü', eylem:'Şüpheli alacak karşılığı ayırır', sistem:'{{F-30}} / özel G/L göstergesi' },
    ],

    veriAkisi:{
      nereden:'SD’den satış faturası ({{VBRK}}/{{VBRP}}); doğrudan FI faturaları; banka ekstresinden gelen tahsilatlar; {{BP}} ana verisinden ödeme koşulu, mutabakat hesabı ve ihtar prosedürü.',
      nereye:'{{BSID}} açık kalemlerine → yaşlandırma ve ihtar süreçlerine; ana muhasebede {{mutabakat-hesabi}}’na ve bilançoya; nakit akış tahminine.',
      tetikleyen:'Faturanın kesilmesi. SD’den geliyorsa muhasebe hiçbir şey girmez; belge otomatik düşer.',
      sonraki:'Tahsilat, banka mutabakatı, dönem sonunda yaşlandırma ve şüpheli alacak değerlemesi.',
    },

    notlar:[
      { tip:'tip', baslik:'Sipariş ve teslimat neden alacak doğurmaz?', metin:
        'Sipariş bir taahhüttür. Teslimat ise stoku azaltır ve maliyeti gider yazar ama **alacağı doğurmaz** — ' +
        'çünkü henüz fatura kesilmemiştir. Muhasebede alacak, faturayla doğar. ' +
        'Bu ayrım "mal gitti ama fatura kesilmedi" durumunun neden ayrı takip edilmesi gerektiğini açıklar.' },
      { tip:'warn', baslik:'Tahsilat gelir değildir', metin:
        'Para geldiğinde gelir kaydedilmez. Gelir zaten fatura anında kaydedilmişti. ' +
        'Tahsilat sadece bilanço içinde bir yer değiştirmedir: **alacak azalır, nakit artar**. ' +
        'Bunu karıştırmak, gelirin iki kez kaydedilmesine yol açan klasik hatadır.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'AR’nin muhasebe zinciri AP’nin aynasıdır: orada satıcı **alacaklanıyordu**, burada müşteri ' +
      '**borçlanıyor**. Aşağıda önce SD’den gelen faturanın tam zinciri, sonra kısmi tahsilat, ' +
      'şüpheli alacak ve müşteri avansı örnekleri var.',

    etkilenenHesaplar:[
      { hesap:'120 Alıcılar (mutabakat)', tur:'Bilanço — Varlık', neden:'Müşteriden alacak. Fatura ile **borçlanır** (artar), tahsilat ile **alacaklanır** (azalır). Doğrudan kayıt yapılamaz.' },
      { hesap:'600 Yurtiçi satışlar', tur:'Gelir tablosu', neden:'Satış geliri. SD faturasında hesabı {{VKOA}} belirler; FI faturasında kullanıcı seçer.' },
      { hesap:'391 Hesaplanan KDV', tur:'Bilanço — Kaynak', neden:'Devlete borç doğar. Şirketin geliri değildir, devlet adına tahsil edilir.' },
      { hesap:'153 Ticari mallar / 621 SMM', tur:'Bilanço / Gelir tablosu', neden:'Mal çıkışında stok azalır, satılan malın maliyeti gider yazılır. **Faturadan ayrı** bir kayıttır.' },
      { hesap:'102 Bankalar', tur:'Bilanço — Varlık', neden:'Tahsilatta artar. Ekstre gelene kadar {{banka-ara-hesabi}} kullanılabilir.' },
      { hesap:'128 Şüpheli ticari alacaklar', tur:'Bilanço — Varlık', neden:'{{supheli-alacak}} olarak sınıflanan kalemler {{ozel-ana-muhasebe-gostergesi}} ile buraya taşınır.' },
      { hesap:'129 Şüpheli alacak karşılığı', tur:'Bilanço — Kontra varlık', neden:'Alacağı azaltan hesap. Karşılık ayrıldığında alacaklanır, karşılığı gider (654) borçlanır.' },
      { hesap:'340 Alınan sipariş avansları', tur:'Bilanço — Kaynak', neden:'Müşteriden peşin alınan tutar. Bir gelir değil **borçtur** — mal/hizmet henüz verilmedi.' },
    ],

    fisler:[
      { baslik:'Adım 1 — Mal çıkışı (teslimat) · maliyet 60.000 TL',
        belgeTuru:'WL', tarih:'03.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'621', ad:'Satılan ticari mal maliyeti', borc:60000, not:'Gider doğdu' },
          { hesap:'153', ad:'Ticari mallar (stok)', alacak:60000, not:'Stok azaldı' },
        ],
        not:'**Müşteriye alacak yok.** Mal gitti ama fatura kesilmedi. Gelir de henüz kaydedilmedi — ' +
             'yalnızca maliyet tarafı işlendi. Bu ara durum "faturalanmamış teslimat" olarak izlenir.' },

      { baslik:'Adım 2 — SD faturası kesildi ({{VF01}}) · 100.000 TL + KDV',
        belgeTuru:'RV', tarih:'05.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar — C-5001', borc:120000, not:'{{mutabakat-hesabi}} — alacak doğdu' },
          { hesap:'600', ad:'Yurtiçi satışlar', alacak:100000, not:'{{VKOA}} hesap belirlemesi' },
          { hesap:'391', ad:'Hesaplanan KDV', alacak:20000, not:'Devlete borç' },
        ],
        not:'Muhasebeci bu kaydı **girmedi**; faturalama ekibi {{VF01}}’de fatura kesince otomatik oluştu. ' +
             'Gelir 120.000 değil **100.000**’dir; KDV şirketin malı değildir.\n\n' +
             'Bu satışın kârı: 100.000 gelir − 60.000 maliyet = **40.000 TL**.' },

      { baslik:'Adım 3 — Tam tahsilat ({{F-28}}) · vadesinde ödendi',
        belgeTuru:'DZ', tarih:'05.12.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bankalar', borc:120000, not:'Nakit girdi' },
          { hesap:'120', ad:'Alıcılar — C-5001', alacak:120000, not:'Açık kalem kapandı' },
        ],
        not:'**Gelir kaydı yok** — gelir zaten faturada kaydedilmişti. Bu sadece bilanço içinde ' +
             'yer değiştirmedir: alacak azaldı, nakit arttı. Kalem {{BSID}}’den {{BSAD}}’a taşındı.' },

      { baslik:'Alternatif — kısmi tahsilat · 120.000’in 70.000’i geldi',
        belgeTuru:'DZ', tarih:'05.12.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bankalar', borc:70000 },
          { hesap:'120', ad:'Alıcılar — C-5001 (kısmi ödeme kalemi)', alacak:70000, not:'{{kismi-kapatma}}' },
        ],
        not:'{{kismi-kapatma}} seçilirse **orijinal 120.000 TL’lik kalem açık kalır** ve ödeme ayrı bir ' +
             'açık kalem olarak durur. Orijinal vade korunduğu için {{yaslandirma}} bozulmaz.\n\n' +
             '{{kalan-kapatma}} seçilseydi orijinal kalem kapanır, 50.000 TL’lik yeni kalem üretilirdi — ' +
             've o kalemin **vadesi bugünden başlardı**, yani 90 gün gecikmiş alacak "yeni" görünürdü.' },

      { baslik:'Müşteri avansı ({{F-29}}) · peşin alınan 40.000 TL',
        belgeTuru:'DZ', tarih:'20.10.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bankalar', borc:40000 },
          { hesap:'340', ad:'Alınan sipariş avansları', alacak:40000, not:'`UMSKZ` = A → alternatif hesap' },
        ],
        not:'Para geldi ama **gelir değil**. Mal/hizmet henüz verilmedi; bu bir **borçtur** ' +
             '(müşteriye mal borcu). Bilançoda kaynak tarafında durur. Fatura kesilince {{F-39}} ile mahsup edilir.' },

      { baslik:'Şüpheli alacak karşılığı · 90 günü geçen 30.000 TL',
        belgeTuru:'SA', tarih:'31.12.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'654', ad:'Karşılık giderleri', borc:30000, not:'Gider doğdu' },
          { hesap:'129', ad:'Şüpheli ticari alacaklar karşılığı', alacak:30000, not:'Kontra varlık hesabı' },
        ],
        not:'**Alacak silinmedi.** 120 hesabı hâlâ 30.000 TL gösteriyor; karşılık hesabı onu ' +
             'bilançoda azaltıyor. Net alacak = 30.000 − 30.000 = 0. Müşteri sonradan öderse ' +
             'karşılık iptal edilir (konusu kalmayan karşılık geliri).' },
    ],

    tHesaplar:[
      { hesap:'Alıcılar (mutabakat)', kod:'120',
        borc:[{ ad:'SD faturası', tutar:120000 }, { ad:'FI faturası', tutar:48000 }],
        alacak:[{ ad:'Tahsilat', tutar:120000 }],
        not:'Borç bakiyesi = tahsil edilmemiş alacak' },
      { hesap:'Yurtiçi satışlar', kod:'600 (Gelir)',
        borc:[],
        alacak:[{ ad:'SD faturası', tutar:100000 }, { ad:'FI faturası', tutar:40000 }],
        not:'Yıl sonunda sıfırlanır' },
      { hesap:'Alınan sipariş avansları', kod:'340 (Kaynak)',
        borc:[{ ad:'Fatura ile mahsup (F-39)', tutar:40000 }],
        alacak:[{ ad:'Alınan avans (F-29)', tutar:40000 }],
        not:'Mahsup sonrası kapanır' },
      { hesap:'Şüpheli alacak karşılığı', kod:'129 (Kontra varlık)',
        borc:[],
        alacak:[{ ad:'Ayrılan karşılık', tutar:30000 }],
        not:'Alacağı bilançoda azaltır' },
    ],

    notlar:[
      { tip:'warn', baslik:'Kısmi mi kalan mı? Yaşlandırmayı belirleyen karar', metin:
        'Bu seçim AR’de en çok sonuç doğuran teknik karardır. {{kismi-kapatma}} orijinal vadeyi korur — ' +
        'gecikmiş alacak gecikmiş görünmeye devam eder. {{kalan-kapatma}} yeni kalem ürettiği için ' +
        'vade sıfırlanır ve **90 gün gecikmiş bir alacak aniden "vadesi gelmemiş" hâle gelir**. ' +
        'Tahsilat performansını ölçen raporlar bu yüzden bozulur. Varsayılan tercih kısmi kapatma olmalıdır.' },
      { tip:'tip', baslik:'Gelir ne zaman kaydedilir?', metin:
        'Faturayla. Sipariş alındığında değil, mal gönderildiğinde değil, para geldiğinde değil. ' +
        'Mal gönderilip fatura kesilmediyse yalnızca maliyet kaydedilir; gelir beklemededir. ' +
        'Dönem sonunda bu durum "faturalanmamış teslimat" olarak tahakkuk ettirilir.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'AR’de çeşitlenme dört eksende olur: faturanın **geliş yolu**, tahsilatın **kapatma biçimi**, ' +
      '**özel ana muhasebe** kategorisi ve alacağın **risk durumu**.',

    liste:[
      { ad:'SD faturası', en:'SD Billing Document — VF01',
        aciklama:'Satış siparişi ve teslimat üzerinden kesilen fatura. FI belgesi **otomatik** oluşur; ' +
                 'gelir hesabını {{VKOA}} belirler. Kurumsal şirketlerde faturaların çoğunluğu budur.',
        neZaman:'Mal veya standart hizmet satışında; SD modülü kullanılıyorsa her zaman.',
        ornek:'Teslimat 80001234 → fatura 90005678 → FI belgesi 1800000091 (belge türü RV).',
        tcodes:['VF01','VF02','VF04','VKOA'] },

      { ad:'FI faturası', en:'Direct FI Invoice — FB70',
        aciklama:'SD’den geçmeden doğrudan FI’da kesilen fatura. Gelir hesabını kullanıcı seçer.',
        neZaman:'Kira geliri, hurda satışı, sabit kıymet satışı, grup içi yansıtmalar gibi ' +
                'SD’de tanımlı olmayan satışlarda.',
        ornek:'Boş depo alanının kiraya verilmesi → 120 borç / 649 diğer gelir alacak.',
        tcodes:['FB70','FB75'] },

      { ad:'Alacak dekontu', en:'Credit Memo — FB75',
        aciklama:'Müşteriye kesilen iade/iskonto belgesi. Faturanın tersidir: müşteri alacaklanır, gelir borçlanır.',
        neZaman:'Mal iadesi, fiyat düzeltmesi, sonradan verilen ciro primi.',
        ornek:'12.000 TL’lik iade → 600 gelir borç 10.000 / 391 KDV borç 2.000 / 120 müşteri alacak 12.000.',
        tcodes:['FB75','VF01'] },

      { ad:'Tam kapatma', en:'Full Clearing',
        aciklama:'Tahsilat tutarı fatura tutarına eşittir; kalem tamamen kapanır ve {{BSAD}}’a taşınır.',
        neZaman:'Normal tahsilatta.',
        ornek:'120.000 TL fatura, 120.000 TL tahsilat.',
        tcodes:['F-28','F-32'] },

      { ad:'Kısmi kapatma', en:'Partial Clearing',
        aciklama:'Orijinal kalem **açık kalır**, tahsilat ayrı bir açık kalem olarak durur. Orijinal vade korunur.',
        neZaman:'Müşteri borcunun bir kısmını ödediğinde ve **vade takibinin bozulmaması** gerektiğinde. ' +
                'AR’de varsayılan tercih budur.',
        ornek:'120.000 TL borcun 70.000 TL’si ödendi → iki açık kalem: +120.000 ve −70.000.',
        tcodes:['F-28','FB05'] },

      { ad:'Kalan kapatma', en:'Residual Clearing',
        aciklama:'Orijinal kalem kapatılır, kalan tutar için **yeni kalem** üretilir. Yeni kalemin vadesi bugünden başlar.',
        neZaman:'Fark kalıcıysa ve yeni bir ödeme planına bağlandıysa. **Yaşlandırmayı sıfırladığı için dikkatli seçilir.**',
        ornek:'120.000 kapatıldı, 50.000 TL’lik yeni kalem oluştu — vadesi bugün.',
        tcodes:['F-28','FB05'] },

      { ad:'Müşteri avansı', en:'Customer Down Payment — F-29 / F-39',
        aciklama:'Mal/hizmet verilmeden alınan tutar. {{ozel-ana-muhasebe-gostergesi}} ile normal alacaktan ayrılır ve ' +
                 'bilançoda **kaynak** tarafında gösterilir (müşteriye mal borcu).',
        neZaman:'Peşin tahsilatlı satışlarda, proje avanslarında, sipariş kaparosunda.',
        ornek:'40.000 TL avans → 102 banka borç / 340 alınan avans alacak.',
        tcodes:['F-29','F-39','OBXR'] },

      { ad:'Şüpheli alacak', en:'Doubtful Receivable',
        aciklama:'Tahsil riski doğmuş alacak. {{ozel-ana-muhasebe-gostergesi}} (genelde E) ile ayrılır ve ' +
                 'karşılık ayrılarak bilançoda net değere getirilir. **Alacak silinmez.**',
        neZaman:'Vadesi uzun süre geçmiş, ihtarlara cevap alınamamış, müşteri mali sıkıntıda ise.',
        ornek:'30.000 TL şüpheli → 654 karşılık gideri borç / 129 karşılık alacak.',
        tcodes:['F-30','FBL5N'] },
    ],

    karsilastirmaBasliklar:['Accounts Payable (AP)', 'Accounts Receivable (AR)'],
    karsilastirma:[
      ['Neyi izler', 'Satıcılara **borç**', 'Müşterilerden **alacak**'],
      ['Bilanço tarafı', 'Kaynak (pasif)', 'Varlık (aktif)'],
      ['Fatura etkisi', 'Satıcı **alacaklanır**', 'Müşteri **borçlanır**'],
      ['Ana veri', '{{LFA1}} / {{LFB1}}', '{{KNA1}} / {{KNB1}}'],
      ['Açık / kapalı kalem', '{{BSIK}} / {{BSAK}}', '{{BSID}} / {{BSAD}}'],
      ['Entegre modül', 'MM — satın alma', 'SD — satış'],
      ['Hesap belirleme', '{{OBYC}}', '{{VKOA}}'],
      ['Ana işlem', '{{FB60}} fatura · {{F110}} ödeme', '{{FB70}} fatura · {{F-28}} tahsilat'],
      ['Kalem raporu', '{{FBL1N}}', '{{FBL5N}}'],
      ['Belge türleri', 'KR fatura · KZ ödeme', 'DR fatura · DZ tahsilat · RV SD faturası'],
      ['Takip aracı', 'Vade yönetimi, iskonto', '{{ihtar}}, {{kredi-limiti}}, {{supheli-alacak}}'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FB70', ad:'Müşteri faturası girişi',
        amac:'SD’den geçmeyen, doğrudan FI’da kesilen müşteri faturasını kaydeder.',
        neZaman:'Kira geliri, hurda satışı, grup içi yansıtma gibi SD’de tanımlı olmayan satışlarda.',
        adimlar:[
          { baslik:'Müşteri numarası ve şirket kodunu gir',
            aciklama:'Müşteri girildiği an sağ panelde adres ve ödeme koşulu görünür. Vade ve ' +
                     '{{mutabakat-hesabi}} ana veriden **otomatik** gelir.' },
          { baslik:'Fatura tarihi, kayıt tarihi ve referansı gir' },
          { baslik:'Brüt tutarı ve vergi kodunu gir',
            aciklama:'"Vergiyi hesapla" işaretliyse SAP KDV’yi brüt tutardan ayırır.' },
          { baslik:'Gelir satırını gir',
            aciklama:'G/L gelir hesabı ve tutar. Gerekirse {{kar-merkezi}} girilir.' },
          { baslik:'Simüle et ve kaydet',
            aciklama:'Kaydedildiğinde {{BSID}}’de bir {{acik-kalem}} oluşur ve {{yaslandirma}} başlar.' },
        ],
        ekranAkisi:[
          { ekran:'Temel veri', islem:'Müşteri C-5001 · Fatura tarihi 05.11.2026 · Tutar 48.000 · Vergi kodu %20' },
          { ekran:'Kalem tablosu', islem:'649 Diğer olağan gelir · 40.000 · Kâr merkezi 1000' },
          { ekran:'Ödeme sekmesi', islem:'Ödeme koşulu ZB03 (ana veriden) · Vade 05.12.2026' },
          { ekran:'Simülasyon', islem:'120 borç 48.000 / 649 alacak 40.000 / 391 alacak 8.000' },
        ],
        alanlar:{
          zorunlu:['Müşteri','Fatura tarihi','Kayıt tarihi','Şirket kodu','Tutar','G/L gelir hesabı'],
          opsiyonel:['Referans','Başlık metni','Kâr merkezi','Ödeme koşulu','Vade','İhtar bloğu','Atama'] },
        hatalar:[
          { mesaj:'Customer 5001 is blocked for posting', sebep:'Müşteri ana verisinde kayıt bloğu var.', cozum:'{{BP}} → FI Customer rolü → bloğu kaldır. Blok kredi riski nedeniyle konmuşsa önce kredi kontrol ile görüş.' },
          { mesaj:'Posting period ... is not open for account type D', sebep:'Dönem müşteri hesap tipi (D) için kapalı.', cozum:'{{OB52}}’de **D** satırında dönemi aç.' },
          { mesaj:'Account 120000 cannot be directly posted to', sebep:'Kullanıcı gelir satırına yanlışlıkla mutabakat hesabını yazmış.', cozum:'Gelir satırına gelir hesabı (6xx) yaz; müşteri satırını SAP otomatik üretir.' },
          { mesaj:'Tax code A1 does not appear in any G/L account item', sebep:'Vergi kodu başlıkta var ama gelir satırında yok.', cozum:'Gelir satırında da aynı vergi kodunu seç.' },
        ],
        ipucu:'Referans alanına kendi fatura numaranı yaz. AR’de mükerrer kontrolü AP kadar kritik değildir ' +
              'ama mutabakat sırasında müşteriyle konuşurken bu numara üzerinden anlaşırsın.',
        ilgili:['FB75','VF01','FBL5N','F-28'] },

      { kod:'F-28', ad:'Müşteri tahsilatı kaydet',
        amac:'Gelen tahsilatı banka/kasa hesabına kaydeder ve **aynı işlemde** müşterinin açık kalemini kapatır.',
        neZaman:'Banka ekstresinden veya dekonttan gelen her tahsilatta. AR’nin en sık kullanılan işlemidir.',
        adimlar:[
          { baslik:'Başlık: belge tarihi, şirket kodu, banka hesabı ve tahsil edilen tutarı gir' },
          { baslik:'Müşteri numarasını gir ve *Açık kalemleri işle* düğmesine bas' },
          { baslik:'Kapatılacak kalemleri seç',
            aciklama:'Ekranın altındaki **"Atanmamış"** alanı sıfır olmalıdır. Sıfır değilse kapatma yapılamaz.' },
          { baslik:'Tutar tam eşleşmiyorsa kısmi veya kalan sekmesini kullan',
            aciklama:'*Kısmi ödeme* sekmesi orijinal kalemi açık bırakır (vade korunur). ' +
                     '*Kalan kalem* sekmesi kapatıp yeni kalem üretir (vade sıfırlanır).' },
          { baslik:'Kaydet',
            aciklama:'Belge türü DZ olur. Kalem {{BSID}}’den {{BSAD}}’a taşınır.' },
        ],
        ekranAkisi:[
          { ekran:'Başlık', islem:'Belge tarihi 05.12.2026 · Banka hesabı 102000 · Tutar 120.000' },
          { ekran:'Açık kalem seçimi', islem:'Müşteri C-5001 → 3 açık kalem listelendi' },
          { ekran:'Kalem seçimi', islem:'1 kalem seçildi (120.000) → "Atanmamış" = 0' },
          { ekran:'Kaydet', islem:'Belge 1400000123 (DZ) oluştu' },
        ],
        alanlar:{
          zorunlu:['Belge tarihi','Şirket kodu','Banka G/L hesabı','Tutar','Müşteri'],
          opsiyonel:['Değer tarihi','Metin','Atama','Kâr merkezi'] },
        hatalar:[
          { mesaj:'The difference is too large for clearing', sebep:'Seçilen kalemler ile tahsilat tutarı eşleşmiyor, fark {{tolerans-grubu}} dışında.', cozum:'Seçimi düzelt veya kısmi/kalan kapatma kullan. Tolerans ayarı {{OBA3}}.' },
          { mesaj:'No open items found', sebep:'Müşterinin açık kalemi yok veya avans kalemleri seçime dâhil değil.', cozum:'{{FBL5N}} ile kontrol et; avans için seçim ekranında **"Özel G/L işlemleri"** kutusunu işaretle.' },
          { mesaj:'Enter a value date', sebep:'Banka hesabı değer tarihi zorunlu tanımlanmış.', cozum:'Paranın bankada valörlendiği tarihi gir.' },
        ],
        ipucu:'Müşteri hangi faturayı ödediğini belirtmediyse **en eski kalemden başlayarak** kapat (FIFO). ' +
              'Bu, {{yaslandirma}} raporunun gerçeği yansıtmasını sağlar. Rastgele seçim yaparsan ' +
              'gecikmiş alacaklar açık kalmaya devam eder ve tablo bozulur.',
        ilgili:['F-32','FBL5N','FB05','F-29'] },

      { kod:'FBL5N', ad:'Müşteri kalem listesi',
        amac:'Müşterinin açık, kapalı ve tüm kalemlerini listeler. AR’nin en çok kullanılan raporu.',
        neZaman:'Yaşlandırma, mutabakat, "bu fatura tahsil edildi mi?" sorusu ve ihtar öncesi kontrolde.',
        adimlar:[
          { baslik:'Müşteri ve şirket kodunu gir', aciklama:'Müşteri aralığı veya hesap grubu da verilebilir.' },
          { baslik:'Kalem tipini seç: açık / kapalı / tüm',
            aciklama:'**Açık kalemler** seçildiğinde anahtar tarih girilir: "bu tarihte hangi kalemler açıktı?"' },
          { baslik:'Düzeni ayarla',
            aciklama:'**Vade (`ZFBDT`)**, gecikme günü, ihtar seviyesi ve atama sütunlarını ekle; vadeye göre sırala.' },
          { baslik:'Satıra çift tıkla → belgeye in ({{FB03}})' },
        ],
        ekranAkisi:[
          { ekran:'Seçim', islem:'Müşteri aralığı C-5000..C-5999 · **Açık kalemler** · Anahtar tarih bugün' },
          { ekran:'Kalem listesi', islem:'Vade sırasıyla listelendi; toplam alacak altta' },
          { ekran:'Düzen', islem:'Gecikme günü ve ihtar seviyesi sütunları eklendi, müşteriye göre alt toplam' },
        ],
        ipucu:'Düzene **gecikme günü** ve **ihtar seviyesi** sütunlarını ekleyip varsayılan yap. ' +
              'Tahsilat toplantısına bu tek raporla girebilirsin.',
        hatalar:[
          { mesaj:'No items selected', sebep:'Kriter çok dar veya müşterinin hareketi yok.', cozum:'"Tüm kalemler" seç, tarih aralığını genişlet.' },
        ],
        ilgili:['FD10N','S_ALR_87012168','FBL5H','F-28','F150'] },

      { kod:'F-32', ad:'Müşteri kapatma',
        amac:'Tahsilat kaydı yapmadan, birbirini götüren müşteri kalemlerini eşleştirir.',
        neZaman:'Faturayı alacak dekontuyla karşılıklı kapatırken; banka ekstresinden ayrı kaydedilmiş ' +
                'tahsilatı faturayla eşleştirirken.',
        adimlar:[
          { baslik:'Müşteri, şirket kodu ve kapatma tarihini gir' },
          { baslik:'Açık kalemleri işle → kapatılacakları seç' },
          { baslik:'Net tutarın sıfır olduğunu doğrula ve kaydet',
            aciklama:'Fark yoksa hiçbir G/L hesabı hareket etmez; sadece kalemler eşleşir.' },
        ],
        ipucu:'Yanlış kapatma yaptıysan {{FBRA}} ile geri alırsın; düzeltme kaydı girmene gerek yok.',
        ilgili:['F-44','F-03','FBRA','F.13'] },

      { kod:'F-29', ad:'Müşteriden alınan avans',
        amac:'Mal/hizmet verilmeden alınan tutarı {{ozel-ana-muhasebe-gostergesi}} ile ayrı hesapta kaydeder.',
        neZaman:'Peşin tahsilatlı satışta, proje avansında, sipariş kaparosunda.',
        adimlar:[
          { baslik:'Müşteri, banka hesabı ve tutarı gir' },
          { baslik:'Özel ana muhasebe göstergesini seç (genelde A)',
            aciklama:'Bu gösterge kaydı 120 yerine 340 Alınan avanslar hesabına yönlendirir ({{OBXR}} ile tanımlanır).' },
          { baslik:'Kaydet' },
        ],
        ipucu:'Avans **gelir değildir**. Fatura kesilene kadar bilançoda borç olarak durur. ' +
              'Fatura kesildiğinde {{F-39}} ile mahsup edilerek normal alacağa dönüştürülür.',
        hatalar:[
          { mesaj:'Special G/L indicator A is not defined for account type D', sebep:'{{OBXR}}’de müşteri tarafı için gösterge tanımlı değil.', cozum:'{{OBXR}} ile göstergeyi ve alternatif mutabakat hesabını tanımla.' },
        ],
        ilgili:['F-39','OBXR','F-47','FBL5N'] },

      { kod:'F150', ad:'İhtar (dunning) çalıştırma',
        amac:'Vadesi geçmiş alacaklar için ihtar seviyelerine göre öneri üretir, ihtarnameleri basar ve ' +
             'ihtar verisini müşteri kaydına yazar.',
        neZaman:'Düzenli aralıklarla (genelde ayda 1-2 kez) tahsilat sürecinin parçası olarak.',
        adimlar:[
          { baslik:'Çalıştırma tarihi ve kimliğini gir',
            aciklama:'{{F110}} ile aynı mantık: tarih + kimlik bir çalıştırmayı benzersiz kılar.' },
          { baslik:'Parametreleri gir: şirket kodu, müşteri aralığı, ihtar tarihi' },
          { baslik:'Öneriyi çalıştır (dunning proposal)',
            aciklama:'Sistem hangi müşteriye hangi seviyede ihtar gideceğini hesaplar. ' +
                     '{{ihtar-prosedürü}} ve gecikme günleri belirleyicidir.' },
          { baslik:'Öneriyi incele ve düzenle',
            aciklama:'Bir müşteriyi çıkarmak, seviyesini değiştirmek veya bloklamak mümkündür.' },
          { baslik:'İhtarnameleri bas ve veriyi güncelle',
            aciklama:'{{MHNK}}/{{MHND}} tablolarına ihtar seviyesi ve tarihi yazılır. ' +
                     'Bir sonraki çalıştırmada müşteri bir üst seviyeden devam eder.' },
        ],
        alanlar:{
          zorunlu:['Çalıştırma tarihi','Kimlik','Şirket kodu','İhtar tarihi'],
          opsiyonel:['Müşteri aralığı','İhtar alanı','Yalnız belirli prosedür'] },
        hatalar:[
          { mesaj:'No accounts selected for dunning', sebep:'Müşterilerde {{ihtar-prosedürü}} atanmamış veya gecikme günleri henüz dolmamış.', cozum:'{{BP}} → şirket kodu verisi → `MAHNA` alanını doldur; {{FBMP}}’de gün aralıklarını kontrol et.' },
          { mesaj:'Customer is blocked for dunning', sebep:'Müşteri ana verisinde ihtar bloğu (`MANSP`) var.', cozum:'Blok bilinçliyse (uyuşmazlık) bırak; değilse {{BP}}’den kaldır.' },
        ],
        ipucu:'İhtar bir **satış ilişkisi** meselesidir. Öneriyi ham hâliyle basma — satış ekibiyle ' +
              'gözden geçir. Yanlış zamanda giden 3. seviye ihtar, kazanılmış bir müşteriyi kaybettirebilir.',
        ilgili:['FBMP','FBL5N','S_ALR_87012168'] },

      { kod:'VF01', ad:'SD faturası oluştur',
        amac:'Satış siparişi veya teslimat üzerinden fatura keser; kaydedildiğinde FI belgesi otomatik oluşur.',
        neZaman:'Mal ve standart hizmet satışlarında — kurumsal şirketlerde faturaların çoğunluğu.',
        adimlar:[
          { baslik:'Faturalanacak belgeyi (teslimat veya sipariş) gir' },
          { baslik:'Kalemleri ve fiyatlandırmayı kontrol et' },
          { baslik:'Kaydet → SD faturası ve FI belgesi birlikte oluşur',
            aciklama:'FI belgesi oluşmazsa {{VBRK}} tablosundaki `RFBSK` alanı "A" (aktarılmadı) kalır.' },
        ],
        hatalar:[
          { mesaj:'Document ... saved (no accounting document generated)', sebep:'{{VKOA}}’da gelir hesabı belirlemesi eksik — en sık sebep.', cozum:'{{VKOA}}’da ilgili hesap belirleme grubu için hesabı tanımla, sonra {{VF02}} → *Muhasebeye aktar* ile yeniden dene. **Faturayı iptal etmeye gerek yok.**' },
          { mesaj:'Posting period is not open', sebep:'FI dönemi kapalı.', cozum:'{{OB52}} ile aç, {{VF02}} ile yeniden aktar.' },
        ],
        ipucu:'"Fatura kesildi ama muhasebeye düşmedi" şikâyetinde ilk bakılacak yer {{VKOA}}’dır. ' +
              'İkinci ihtimal kapalı dönem. Her ikisinde de fatura iptal edilmez, düzeltilip yeniden aktarılır.',
        ilgili:['VF02','VF04','VKOA','FBL5N'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'AR tabloları AP ile **birebir simetriktir**: LFA1↔KNA1, LFB1↔KNB1, BSIK↔BSID, BSAK↔BSAD. ' +
      'Bu simetriyi bilmek, AP öğrendikten sonra AR’yi yarı sürede öğrenmeni sağlar.',

    liste:[
      { ad:'KNA1', baslik:'Müşteri — genel katman',
        tutar:'Ad, adres, ülke, vergi numarası, hesap grubu. Tüm şirket kodları için ortak.',
        olusturan:'{{BP}} (S/4HANA) veya {{XD01}} (ECC)',
        guncelleyen:'{{BP}}, {{XD01}}, {{XD02}}',
        anahtar:'KUNNR',
        iliskiler:'{{KNB1}} (şirket kodu) ve {{KNVV}} (satış alanı) ile 1-n; {{BSEG}}.KUNNR buraya işaret eder.',
        s4:'Tablo duruyor ama {{BP}} tarafından CVI senkronizasyonuyla doldurulur.',
        alanlar:[
          { ad:'KUNNR', aciklama:'Müşteri numarası' },
          { ad:'NAME1', aciklama:'Unvan' },
          { ad:'KTOKD', aciklama:'Hesap grubu — numara aralığını ve alan durumunu belirler' },
          { ad:'SPERR / LOEVM', aciklama:'Merkezi blok / silme işareti' },
        ] },

      { ad:'KNB1', baslik:'Müşteri — şirket kodu katmanı',
        tutar:'Muhasebe davranışı: mutabakat hesabı, ödeme koşulu, ihtar prosedürü, ihtar bloğu.',
        olusturan:'{{BP}} → FI Customer rolü',
        guncelleyen:'{{BP}}, {{FD02}}',
        anahtar:'KUNNR + BUKRS',
        iliskiler:'{{KNA1}}’in çocuğu; `AKONT` alanı {{SKB1}}’deki mutabakat hesabına işaret eder.',
        s4:'Değişmedi; {{BP}} üzerinden doldurulur.',
        alanlar:[
          { ad:'AKONT', aciklama:'**{{mutabakat-hesabi}}** — genelde 120 Alıcılar' },
          { ad:'ZTERM', aciklama:'{{odeme-kosulu}} — vade buradan hesaplanır' },
          { ad:'MAHNA', aciklama:'{{ihtar-prosedürü}} — {{F150}} buna bakar' },
          { ad:'MANSP', aciklama:'İhtar bloğu — doluysa müşteriye ihtar gitmez' },
          { ad:'ZUAWA', aciklama:'Sıralama anahtarı — `ZUONR` alanını doldurur' },
        ] },

      { ad:'BSID', baslik:'Müşteri açık kalemleri',
        tutar:'Tahsil edilmemiş müşteri faturaları. {{FBL5N}} açık kalem seçeneği ve {{F150}} ihtar seçimi buradan beslenir.',
        olusturan:'Müşteriye yapılan her kayıt ({{FB70}}, {{VF01}})',
        guncelleyen:'Kayıt işlemleri; tahsilat yapılınca kalem {{BSAD}}’a taşınır',
        anahtar:'BUKRS + KUNNR + UMSKS + UMSKZ + AUGDT + AUGBL + ZFBDT + BELNR + BUZEI',
        iliskiler:'{{KNB1}} ile müşteri, {{BSEG}} ile belge kalemi bağı.',
        s4:'**Fiziksel tablo kaldırıldı**; {{uyumluluk-view}} olarak {{ACDOCA}}’dan üretilir.',
        alanlar:[
          { ad:'ZFBDT', aciklama:'Baz tarih — vade bu tarihten hesaplanır' },
          { ad:'MANSP', aciklama:'İhtar bloğu — kalem bazında' },
          { ad:'MAHNS', aciklama:'Ulaşılan ihtar seviyesi' },
          { ad:'UMSKZ', aciklama:'{{ozel-ana-muhasebe-gostergesi}} — avans ve şüpheli alacağı ayırır' },
        ] },

      { ad:'BSAD', baslik:'Müşteri kapatılmış kalemleri',
        tutar:'Tahsil edilmiş müşteri kalemleri. Kapatıldığında {{BSID}}’den buraya geçer.',
        olusturan:'{{kapatma}} işlemi ({{F-28}}, {{F-32}})',
        guncelleyen:'Kapatma işlemleri; {{FBRA}} ile geri alınırsa kalem {{BSID}}’ye döner',
        anahtar:'BUKRS + KUNNR + AUGDT + AUGBL + GJAHR + BELNR + BUZEI',
        s4:'{{uyumluluk-view}}’ine dönüştürüldü.' },

      { ad:'VBRK', baslik:'SD fatura başlığı',
        tutar:'SD faturasının müşterisi, tarihi, net tutarı ve **muhasebeye aktarım durumu**.',
        olusturan:'{{VF01}} / {{VF04}}',
        guncelleyen:'{{VF01}}, {{VF02}}',
        anahtar:'VBELN',
        iliskiler:'{{VBRP}} ile kalemleri; {{BKPF}} ile `AWKEY` üzerinden FI belgesi.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'RFBSK', aciklama:'**Aktarım durumu**: C = aktarıldı, A = aktarılmadı. Sorun teşhisinde ilk bakılacak alan.' },
          { ad:'NETWR', aciklama:'Net fatura tutarı' },
          { ad:'FKART', aciklama:'Fatura tipi (F2 standart, G2 alacak dekontu)' },
        ] },

      { ad:'VBRP', baslik:'SD fatura kalemleri',
        tutar:'Fatura satırları. Gelir hesabı belirlemesi bu satırların malzeme ve hesap belirleme grubuna bakar.',
        olusturan:'{{VF01}}',
        guncelleyen:'{{VF01}}, {{VF02}}',
        anahtar:'VBELN + POSNR',
        iliskiler:'{{VBRK}}’nın çocuğu; {{VKOA}} hesap belirlemesinin girdisi.',
        s4:'Değişmedi.' },

      { ad:'KNKK', baslik:'Müşteri kredi yönetimi verisi',
        tutar:'Kredi kontrol alanı bazında {{kredi-limiti}} ve kullanılan risk.',
        olusturan:'FD32 (ECC) / {{UKM_BP}} (S/4HANA)',
        guncelleyen:'Kredi yönetimi işlemleri',
        anahtar:'KUNNR + KKBER',
        s4:'S/4HANA’da SAP Credit Management (UKMBP_CMS_SGM) kullanılır; KNKK uyumluluk amaçlıdır.' },

      { ad:'MHNK', baslik:'İhtar verisi — başlık',
        tutar:'Müşteri bazında son ihtar tarihi ve ulaşılan ihtar seviyesi.',
        olusturan:'{{F150}}',
        guncelleyen:'Her ihtar çalıştırması',
        anahtar:'KUNNR + BUKRS + MABER + MANST',
        iliskiler:'{{MHND}} ile kalem bazında ihtar detayı.',
        s4:'Değişmedi.' },
    ],

    er:{
      type:'er',
      baslik:'AR tablo ilişkileri — müşteriden tahsilata',
      varliklar:[
        { ad:'KNA1', rol:'Ana veri', aciklama:'Müşteri kimliği',
          alanlar:[{ ad:'KUNNR', tip:'pk' }, { ad:'NAME1' }, { ad:'KTOKD' }] },
        { ad:'KNB1', rol:'Ana veri', aciklama:'Müşteri muhasebe verisi',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }, { ad:'MAHNA' }] },
        { ad:'VBRK', rol:'SD', aciklama:'SD fatura başlığı',
          alanlar:[{ ad:'VBELN', tip:'pk' }, { ad:'KUNRG', tip:'fk' }, { ad:'RFBSK' }] },
        { ad:'BKPF', rol:'Başlık', aciklama:'FI belge başlığı',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'AWKEY' }] },
        { ad:'BSEG', rol:'Kalem', hub:true, aciklama:'FI belge kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'KUNNR', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'BSID', rol:'İndeks', aciklama:'Açık kalemler',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZFBDT' }, { ad:'MAHNS' }] },
        { ad:'BSAD', rol:'İndeks', aciklama:'Kapatılmış kalemler',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'AUGBL' }, { ad:'AUGDT' }] },
        { ad:'MHNK', rol:'İhtar', aciklama:'İhtar geçmişi',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'MANST' }, { ad:'MADAT' }] },
      ],
      iliskiler:[
        { from:'KNA1', to:'KNB1', alanlar:'KUNNR', not:'genel → şirket kodu' },
        { from:'KNB1', to:'BSEG', alanlar:'KUNNR + BUKRS', not:'müşterinin kalemleri' },
        { from:'VBRK', to:'BKPF', alanlar:'VBELN → AWKEY', not:'SD faturası → FI belgesi' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'başlık → kalem' },
        { from:'BSEG', to:'BSID', alanlar:'BELNR + BUZEI', not:'açık kalem indeksi' },
        { from:'BSID', to:'BSAD', alanlar:'tahsilat sonrası', not:'kapatılınca taşınır' },
        { from:'BSID', to:'MHNK', alanlar:'KUNNR + BUKRS', not:'ihtar seviyesi izlenir' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'AR’de günlük iş üç ekranda geçer: **fatura girmek** ({{FB70}}), **tahsilat kaydetmek** ({{F-28}}) ve ' +
      '**alacakları izlemek** ({{FBL5N}}). Kritik nokta {{F-28}}’deki kalem seçimidir — orada verilen karar ' +
      'yaşlandırma raporunun doğruluğunu belirler.',

    ekranlar:[
      { ad:'{{FB70}} — Temel veri sekmesi',
        aciklama:'Faturanın başlık bilgisi. Müşteri girildiği an ana veriden gelen değerler ekranı doldurur.',
        alanlar:[
          { ad:'Müşteri', zorunlu:true, aciklama:'Girildiğinde adres ve ödeme koşulu sağ panelde görünür.' },
          { ad:'Fatura tarihi (`BLDAT`)', zorunlu:true, aciklama:'Vade hesabının baz tarihi genelde budur.' },
          { ad:'Kayıt tarihi (`BUDAT`)', zorunlu:true, aciklama:'Muhasebe dönemini belirler.' },
          { ad:'Tutar', zorunlu:true, aciklama:'Brüt tutar (KDV dâhil).' },
          { ad:'Vergi kodu', zorunlu:false, aciklama:'Gelir hesabının vergi kategorisi zorunlu kılıyorsa istenir.' },
        ] },

      { ad:'{{F-28}} — Açık kalem seçim ekranı',
        aciklama:'AR’nin en kritik ekranı. Hangi kalemin kapatılacağı burada belirlenir ve bu karar yaşlandırmayı doğrudan etkiler.',
        alanlar:[
          { ad:'Banka G/L hesabı', zorunlu:true, aciklama:'Paranın girdiği hesap.' },
          { ad:'Tutar', zorunlu:true, aciklama:'Tahsil edilen toplam.' },
          { ad:'Kalem seçimi', zorunlu:true, aciklama:'**"Atanmamış" alanı sıfır olmalıdır.** Sıfır değilse kapatma yapılamaz.' },
          { ad:'Kısmi ödeme sekmesi', zorunlu:false, aciklama:'Orijinal kalem açık kalır, **vade korunur**. AR’de varsayılan tercih.' },
          { ad:'Kalan kalem sekmesi', zorunlu:false, aciklama:'Orijinal kapanır, yeni kalem üretilir, **vade sıfırlanır**. Dikkatli kullanılır.' },
          { ad:'Özel G/L işlemleri kutusu', zorunlu:false, aciklama:'Avans ve şüpheli alacak kalemlerini listeye dâhil eder.' },
        ],
        ipucu:'Müşteri hangi faturayı ödediğini söylemediyse **en eski kalemden** kapat. ' +
              'Rastgele seçim, gecikmiş alacakları açık bırakıp yaşlandırmayı bozar.' },

      { ad:'{{FBL5N}} — Yaşlandırma görünümü',
        aciklama:'Alacakların vadeye göre dağılımını gösteren çalışma ekranı.',
        alanlar:[
          { ad:'Kalem tipi', zorunlu:true, aciklama:'**Açık kalemler** + anahtar tarih.' },
          { ad:'Düzen', zorunlu:false, aciklama:'Vade, gecikme günü, ihtar seviyesi, atama sütunları eklenir.' },
          { ad:'Sıralama/alt toplam', zorunlu:false, aciklama:'Müşteriye göre alt toplam alınır; en riskli müşteriler üste gelir.' },
        ] },
    ],

    zorunlu:['Müşteri','Fatura/belge tarihi','Kayıt tarihi','Şirket kodu','Tutar','G/L hesabı (FB70) veya banka hesabı (F-28)'],
    opsiyonel:['Referans','Başlık metni','Kâr merkezi','Ödeme koşulu','Vade','İhtar bloğu','Atama','Değer tarihi'],

    hatalar:[
      { mesaj:'Posting period ... is not open for account type D', sebep:'Dönem müşteri hesap tipi için kapalı.', cozum:'{{OB52}}’de **D** satırında dönemi aç. S satırını açmak yetmez.' },
      { mesaj:'Customer ... is blocked for posting', sebep:'{{KNA1}} `SPERR` veya {{KNB1}} kayıt bloğu.', cozum:'{{BP}} → FI Customer rolünde bloğu kaldır. Kredi riski nedeniyle konmuşsa önce kredi kontrol ile görüş.' },
      { mesaj:'Document ... saved (no accounting document generated)', sebep:'SD faturası muhasebeye aktarılmadı — {{VKOA}}’da gelir hesabı belirlemesi eksik.', cozum:'{{VKOA}}’yı tamamla, {{VF02}} → *Muhasebeye aktar*. Faturayı iptal etme.' },
      { mesaj:'The difference is too large for clearing', sebep:'Tahsilat ile seçilen kalemler eşleşmiyor.', cozum:'Kısmi veya kalan kapatma kullan; tolerans için {{OBA3}}.' },
      { mesaj:'No open items found (F-28)', sebep:'Avans/şüpheli alacak kalemleri normal seçime gelmez.', cozum:'Seçim ekranında **"Özel G/L işlemleri"** kutusunu işaretle.' },
      { mesaj:'Credit limit exceeded (satış siparişinde)', sebep:'Müşterinin {{kredi-limiti}} aşıldı.', cozum:'Tahsilat yapılmasını bekle veya kredi yöneticisinden limit artışı/serbest bırakma iste ({{UKM_BP}}).' },
      { mesaj:'No accounts selected for dunning', sebep:'{{ihtar-prosedürü}} atanmamış veya gecikme günleri dolmamış.', cozum:'{{BP}} → `MAHNA` alanını doldur; {{FBMP}}’de gün aralıklarını kontrol et.' },
    ],

    ipuclari:[
      '{{FBL5N}} düzenine **gecikme günü** ve **ihtar seviyesi** sütunlarını ekleyip varsayılan yap — ' +
      'tahsilat toplantısının tek raporu bu olur.',
      'Tahsilatlarda **en eski kalemden kapatma (FIFO)** disiplinini benimse. Bu, yaşlandırmanın ' +
      'gerçeği yansıtmasını sağlar ve tahsilat performansı ölçülebilir hâle gelir.',
      '{{kalan-kapatma}}yı istisnai durumlar dışında kullanma; vadeyi sıfırladığı için gecikmiş alacakları gizler.',
      'Banka ekstresinden gelen toplu tahsilatları {{F-28}} yerine {{FEBAN}} üzerinden işlemek daha hızlıdır — ' +
      'ekstre satırı doğrudan açık kaleme bağlanır.',
      'İhtar önerisini basmadan önce **satış ekibiyle gözden geçir**. İhtar teknik bir işlem değil, ' +
      'müşteri ilişkisi kararıdır.',
      'Dönem sonunda {{S_ALR_87012168}} ile yaşlandırma al ve 90+ gün grubunu {{supheli-alacak}} ' +
      'değerlendirmesine gönder. Bu, denetçinin ilk soracağı analizdir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'FI belge başlığı; SD’den geliyorsa `AWTYP` = VBRK, `AWKEY` = SD fatura numarası' },
      { tablo:'BSEG', ne:'Kalemler; müşteri satırında `KUNNR` dolu, `AUGBL` boş (açık kalem)' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler; müşteri, kâr merkezi ve gelir hesabı aynı satırda' },
      { tablo:'BSID', ne:'Müşteri açık kalemi (S/4HANA’da view üzerinden)' },
      { tablo:'BSET', ne:'Hesaplanan KDV satırları' },
      { tablo:'VBRK', ne:'SD faturasıysa; `RFBSK` alanı "C" (aktarıldı) olur' },
      { tablo:'MHNK', ne:'İhtar çalıştırıldıysa müşterinin ihtar seviyesi ve tarihi' },
    ],

    commit:
      'Fatura ve tahsilat kayıtları tek LUW içinde yazılır. **SD faturası farklıdır:** ' +
      '{{VF01}} önce SD belgesini ({{VBRK}}/{{VBRP}}) yazar, ardından muhasebe aktarımını tetikler. ' +
      'Bu ikinci adım başarısız olursa **SD faturası kaydedilmiş ama FI belgesi oluşmamış** olur ' +
      've `RFBSK` alanı "A" kalır. Bu yüzden SD faturası kesildikten sonra muhasebeye düşüp düşmediği ' +
      'kontrol edilmelidir — AP’de böyle bir ara durum yoktur.',

    belgeNo:
      'Belge türüne bağlı aralıktan kaydetme anında verilir. AR’de tipik türler: ' +
      '**DR** müşteri faturası (FI), **DG** müşteri alacak dekontu, **DZ** müşteri tahsilatı, ' +
      '**RV** SD faturası. SD faturası **iki numara** üretir: SD fatura numarası ({{VBRK}}) ve ' +
      'FI belge numarası ({{BKPF}}) — çoğu kurulumda bunlar aynı olacak şekilde ayarlanır ' +
      '(SD fatura tipi ile FI numara aralığı eşitlenir), ama zorunlu değildir.',

    postingLogic:
      '{{FB70}} zinciri: müşteri → {{KNB1}}’den {{mutabakat-hesabi}} ve {{odeme-kosulu}} → ' +
      'gelir satırı (kullanıcı girer) → vergi satırı (otomatik) → denge kontrolü → numara → yazma.\n\n' +
      '{{VF01}} zinciri: SD faturası → fiyatlandırma koşulları → {{VKOA}} hesap belirlemesi ' +
      '(satış organizasyonu + hesap belirleme grubu + malzeme grubu) → FI belgesi → {{BSID}} açık kalemi.',

    belgeTuru:
      'AR belge türleri hangi hesap tiplerine izin verildiğini belirler. **DR** türü müşteri (D) ve ' +
      'ana muhasebe (S) hesap tiplerine izin verir, satıcı (K) hesabına kayıt yaptırmaz. ' +
      '**RV** türü SD faturaları için ayrılmıştır ve genelde kendi numara aralığını kullanır.',

    numberRange:
      'Şirket kodu + mali yıl bazında {{FBN1}} ile tanımlanır. SD fatura numara aralığı ayrıca ' +
      'SD tarafında tanımlanır. Yılbaşında **her ikisi de** açılmalıdır.',

    accountDetermination:
      '{{FB70}}’te gelir hesabını kullanıcı girer; vergi ve müşteri satırı otomatiktir.\n\n' +
      '{{VF01}}’de hesapların tamamı otomatiktir ve {{VKOA}} belirler. Belirleme kriterleri: ' +
      '**satış organizasyonu + hesap belirleme grubu (müşteri) + hesap belirleme grubu (malzeme) + ' +
      'hesap anahtarı**. Hesap anahtarı fiyatlandırma koşulundan gelir: ERL gelir, ERS iskonto, ERF navlun. ' +
      'Hepsi {{T030}} tablosuna yazar.',

    tur:
      '**Ana veri:** müşteri kayıtları ({{KNA1}}/{{KNB1}}/{{KNVV}}), kredi limitleri.\n\n' +
      '**Özelleştirme:** müşteri hesap grupları, {{odeme-kosulu}}, {{FBMP}} ihtar prosedürü, ' +
      '{{VKOA}} hesap belirleme, {{OBXR}} özel G/L göstergeleri, tolerans grupları, belge türleri.\n\n' +
      '**Hareket verisi:** faturalar, tahsilatlar, ihtar çalıştırmaları.',

    transport:
      'Ödeme koşulları, ihtar prosedürleri, {{VKOA}} hesap belirlemesi ve tolerans grupları taşınır. ' +
      'Müşteri kayıtları, kredi limitleri ve belgeler taşınmaz.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Müşteri Hesapları → Ana Veri → Hazırlık → Müşteri Hesap Gruplarını Tanımla', not:'Hesap grubu ve alan durumu' },
      { yol:'SPRO → Finansal Muhasebe → Müşteri Hesapları → İş İşlemleri → Gelen Faturalar/Alacak Dekontları → Ödeme Koşullarını Tanımla', not:'{{odeme-kosulu}} — vade' },
      { yol:'SPRO → Finansal Muhasebe → Müşteri Hesapları → İş İşlemleri → İhtar → İhtar Prosedürünü Tanımla', not:'{{FBMP}} — ihtar seviyeleri ve gün aralıkları' },
      { yol:'SPRO → Satış ve Dağıtım → Temel Fonksiyonlar → Hesap Atama/Maliyetler → Gelir Hesabı Belirleme', not:'{{VKOA}} — SD gelir hesabı belirleme' },
      { yol:'SPRO → Finansal Muhasebe → Müşteri Hesapları → İş İşlemleri → Gelen Ödemeler → Avanslar → Özel Ana Muhasebe İşlemlerini Tanımla', not:'{{OBXR}} — avans ve şüpheli alacak göstergeleri' },
      { yol:'SPRO → Finansal Muhasebe → Müşteri Hesapları → İş İşlemleri → Gelen Ödemeler → Manuel Gelen Ödemeler → Ödeme Farkları İçin Tolerans Tanımla', not:'{{OBA3}} — kapatma tolerans sınırları' },
    ],

    ekstra:[
      { ic:'📉', baslik:'Yaşlandırma nasıl okunur?', metin:
        'Yaşlandırma, açık kalemleri **vadeden itibaren** geçen güne göre gruplar: ' +
        'vadesi gelmemiş · 1-30 · 31-60 · 61-90 · 90+ gün.\n\n' +
        'Yorumlama kuralları: **90+ grubu toplamın %5’ini geçiyorsa** tahsilat süreci zayıftır. ' +
        'Tek bir müşteri 90+ grubunun yarısından fazlasını oluşturuyorsa **yoğunlaşma riski** vardır. ' +
        'Vadesi gelmemiş grubun payı düşükse ya vadeler çok kısadır ya da satış yavaşlamıştır.\n\n' +
        'Bu analiz {{FBL5N}} veya {{S_ALR_87012168}} ile alınır ve {{supheli-alacak}} kararının girdisidir.' },

      { ic:'🔗', baslik:'AR–SD entegrasyonunun kırılma noktası', metin:
        'SD faturası kesildiğinde FI belgesinin **otomatik** oluşması beklenir. Oluşmazsa ' +
        '{{VBRK}} tablosundaki `RFBSK` alanı "A" (aktarılmadı) kalır.\n\n' +
        'Sebepler sıklık sırasına göre: **(1)** {{VKOA}}’da hesap belirleme eksik, ' +
        '**(2)** FI dönemi kapalı, **(3)** gelir hesabı bloklu veya kayda kapalı, ' +
        '**(4)** {{belge-bolme}} kuralları satırı sınıflandıramadı.\n\n' +
        'Çözüm her durumda aynıdır: eksiği gider, {{VF02}} → *Muhasebeye aktar* ile yeniden dene. ' +
        '**Faturayı iptal etmek gerekmez** ve iptal etmek yanlıştır — SD tarafında numara boşa gider.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Kalan kapatma yaşlandırmayı bozar', metin:
        '{{kalan-kapatma}} yeni bir kalem ürettiği için vade **bugünden** başlar. ' +
        '90 gün gecikmiş bir alacak, kısmi tahsilat sonrası "vadesi gelmemiş" görünmeye başlar. ' +
        'Tahsilat performansı ölçen tüm raporlar bozulur ve {{ihtar}} süreci sıfırlanır. ' +
        'AR’de varsayılan tercih **kısmi kapatma** olmalıdır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'AR’nin iş mantığı değişmedi. Değişenler: **müşteri ana verisinin {{BP}}’ye taşınması**, ' +
      '**kredi yönetiminin tamamen yenilenmesi** (FD32 → SAP Credit Management) ve ' +
      '**indeks tablolarının {{uyumluluk-view}}’ine dönüşmesi**.',

    eccFarklari:[
      { konu:'Müşteri ana verisi', ecc:'{{FD01}} / {{XD01}}', s4:'{{BP}} zorunlu — FI Customer rolü ile' },
      { konu:'Aynı firma hem müşteri hem satıcı', ecc:'İki ayrı ana veri kaydı', s4:'Tek BP kaydı, iki rol' },
      { konu:'Kredi yönetimi', ecc:'FD32 — FI-AR içinde', s4:'{{UKM_BP}} — SAP Credit Management (FIN-FSCM-CR), ayrı bileşen' },
      { konu:'Açık kalem tablosu', ecc:'{{BSID}} / {{BSAD}} fiziksel tablo', s4:'{{uyumluluk-view}} — veri {{ACDOCA}}’dan' },
      { konu:'Terminoloji', ecc:'Customer', s4:'**Customer** korundu (satıcı Vendor→Supplier oldu, müşteri değişmedi)' },
      { konu:'Kalem raporu', ecc:'{{FBL5N}}', s4:'{{FBL5N}} çalışır; {{FBL5H}} ve Fiori önerilir' },
      { konu:'Tahsilat yönetimi', ecc:'Manuel takip', s4:'FSCM Collections Management ile iş listesi ve puanlama' },
    ],

    universalJournal:
      'AR kalemleri {{ACDOCA}}’da müşteri numarası, kâr merkezi ve gelir hesabıyla **aynı satırda** tutulur. ' +
      'Pratik sonucu: "hangi müşteriden hangi üründe ne kadar gelir elde ettik ve ne kadarı tahsil edilmedi?" ' +
      'sorusu tek tablodan cevaplanır. Eskiden {{BSID}} + {{VBRP}} + CO-PA birleştirmesi gerekiyordu.',

    kalkanTcodes:[
      { eski:'{{FD01}} / {{FD02}} / {{FD03}}', yeni:'{{BP}}', not:'Müşteri ana verisi — kaldırıldı' },
      { eski:'{{XD01}} / {{XD02}}', yeni:'{{BP}}', not:'BP işlemine yönlendirir' },
      { eski:'FD32 / FD33', yeni:'{{UKM_BP}}', not:'Kredi yönetimi tamamen yeni bileşene taşındı' },
      { eski:'F.2x serisi eski yaşlandırma raporları', yeni:'{{FBL5N}} / Fiori', not:'Yeni raporlar tercih edilir' },
    ],

    fiori:[
      { ad:'Manage Customer Line Items', aciklama:'{{FBL5N}} yerine; yaşlandırma görselleştirmesi ve toplu işlem destekler.' },
      { ad:'Post Incoming Payments', aciklama:'{{F-28}} yerine; açık kalemleri otomatik eşleştirme önerisiyle gösterir.' },
      { ad:'Create Outgoing Invoices', aciklama:'{{FB70}} yerine.' },
      { ad:'Manage Dunning Notices', aciklama:'{{F150}} önerisini görsel iş listesi olarak yönetir.' },
      { ad:'Days Sales Outstanding (DSO)', aciklama:'Ortalama tahsilat süresini analiz eder — AR’nin ana performans göstergesi.' },
      { ad:'Process Receivables', aciklama:'FSCM Collections — müşteri bazında tahsilat görev listesi ve iletişim geçmişi.' },
    ],

    compatibilityViews:[
      '{{BSID}}, {{BSAD}} — müşteri açık/kapalı kalem indeksleri artık {{ACDOCA}} üzerinden üretilen görünümler.',
      '{{KNC1}} — müşteri dönemsel bakiyeleri de view’e dönüştü.',
      'Bu view’lere **yazma yapılamaz**; {{BSID}}’ye doğrudan INSERT yapan eski Z-programları geçişte bozulur.',
      '{{KNA1}} ve {{KNB1}} fiziksel tablo olarak duruyor ama {{BP}} tarafından doldurulur.',
    ],

    performans:
      'Yaşlandırma ve açık kalem raporları {{ACDOCA}} üzerinden çalıştığı için büyük müşteri ' +
      'portföylerinde belirgin hızlanma vardır. {{F150}} ihtar seçimi de hızlanır. ' +
      'Buna karşılık {{uyumluluk-view}} üzerinden çalışan eski özel raporlar yavaş kalır — ' +
      'performans şikâyetinde ilk bakılacak yer budur.',

    bestPractices:[
      'Kredi yönetimini geçişte {{UKM_BP}}’ye taşı; FD32 verisi otomatik dönüşmez, ayrı bir geçiş adımıdır.',
      'Yeni raporları {{BSID}} yerine {{ACDOCA}} veya CDS view üzerine kur.',
      'Geçiş öncesi müşteri mükerrerlerini temizle; {{BP}}’de birleştirmek çok daha zordur.',
      'Ödeme koşullarını sadeleştir — yıllar içinde biriken onlarca koşul geçişte gözden geçirilmelidir.',
      'Tahsilat sürecini FSCM Collections Management ile yapılandırmayı değerlendir; Excel tabanlı takip ' +
      'listelerini sisteme taşımak AR’nin en hızlı kazanç alanıdır.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Bir alacağın hayatı: satıştan tahsilata, gecikmeden şüpheli alacağa',
    hikaye:
      '**Marmara Tekstil A.Ş.** bayisi **Ankara Tekstil Ltd.**’ye (C-5001) 120.000 TL’lik satış yapıyor. ' +
      'Ödeme koşulu 30 gün. Bayi vadesinde ödemiyor, kısmi ödeme yapıyor, ihtar alıyor ve ' +
      'kalan tutar sonunda şüpheli alacağa dönüşüyor. ' +
      'Bu senaryo AR’nin tüm aşamalarını — iyi ve kötü senaryoyu birlikte — gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 — Marmara Tekstil A.Ş.' },
      { k:'Müşteri', v:'C-5001 Ankara Tekstil Ltd. · mutabakat hesabı 120000' },
      { k:'Ödeme koşulu', v:'ZB03 — 30 gün net' },
      { k:'İhtar prosedürü', v:'Z001 — 4 seviye (10 / 20 / 30 / 45 gün gecikme)' },
      { k:'Satış', v:'100.000 TL + %20 KDV = 120.000 TL · maliyet 60.000 TL' },
      { k:'Dönem', v:'Kasım–Aralık 2026' },
    ],

    adimlar:[
      { baslik:'Satış siparişi alınır — kredi kontrolü', tcode:'VA01',
        aciklama:'Satış temsilcisi siparişi giriyor. Sistem müşterinin {{kredi-limiti}}ni kontrol ediyor: ' +
                 'limit 500.000 TL, mevcut risk 180.000 TL → sipariş serbest.',
        girdi:[
          { alan:'Müşteri', deger:'C-5001 Ankara Tekstil Ltd.' },
          { alan:'Malzeme / Miktar', deger:'KUMAŞ-220 · 500 metre' },
          { alan:'Net değer', deger:'100.000 TL' },
          { alan:'Kredi kontrolü', deger:'Limit 500.000 · Risk 180.000 → **serbest**' },
        ],
        not:'**FI kaydı yok.** Sipariş bir taahhüttür. Kredi limiti aşılsaydı sipariş bloklanır ve sevkiyat durdurulurdu.' },

      { baslik:'Mal gönderilir — maliyet kaydedilir, alacak doğmaz', tcode:'VF01',
        aciklama:'Sevkiyat yapılıyor. Stok azalıyor ve maliyet gider yazılıyor. ' +
                 'Ama müşteriye alacak **henüz doğmadı** çünkü fatura kesilmedi.',
        fis:{ baslik:'Belge 4900000567 — Mal çıkışı', belgeTuru:'WL', tarih:'03.11.2026',
          satirlar:[
            { hesap:'621', ad:'Satılan ticari mal maliyeti', borc:60000 },
            { hesap:'153', ad:'Ticari mallar (stok)', alacak:60000 },
          ], not:'Gelir henüz yok, sadece maliyet var. Bu ara durum dönem sonunda "faturalanmamış teslimat" olarak izlenir.' },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'Mal çıkışı hareketi (601)' },
        ] },

      { baslik:'Fatura kesilir — alacak doğar', tcode:'VF01',
        aciklama:'Faturalama ekibi teslimat üzerinden fatura kesiyor. **FI belgesi otomatik oluşuyor**; ' +
                 'muhasebe hiçbir şey girmiyor.',
        girdi:[
          { alan:'Teslimat', deger:'80001234' },
          { alan:'Fatura tipi', deger:'F2 — standart fatura' },
          { alan:'Net tutar / KDV', deger:'100.000 / 20.000 TL' },
          { alan:'Vade — otomatik', deger:'05.12.2026 (30 gün, ZB03’ten)' },
        ],
        fis:{ baslik:'Belge 1800000091 — SD faturası', belgeTuru:'RV', tarih:'05.11.2026',
          satirlar:[
            { hesap:'120', ad:'Alıcılar — C-5001', borc:120000, not:'{{mutabakat-hesabi}} — alacak doğdu' },
            { hesap:'600', ad:'Yurtiçi satışlar', alacak:100000, not:'{{VKOA}} hesap belirlemesi' },
            { hesap:'391', ad:'Hesaplanan KDV', alacak:20000 },
          ], not:'Satışın kârı: 100.000 gelir − 60.000 maliyet = **40.000 TL**. Ama henüz **tahsil edilmedi**.' },
        tabloEtkisi:[
          { tablo:'VBRK', ne:'SD fatura başlığı; `RFBSK` = **C** (muhasebeye aktarıldı ✓)' },
          { tablo:'BKPF', ne:'`AWTYP` = VBRK, `AWKEY` = 90005678 → kaynak izlenebilir' },
          { tablo:'BSID', ne:'Yeni **açık kalem**: 120.000 TL, vade 05.12.2026' },
          { tablo:'BSET', ne:'Vergi satırı: matrah 100.000, KDV 20.000' },
        ],
        not:'`RFBSK` alanı "A" kalsaydı FI belgesi oluşmamış olurdu — sebebi neredeyse her zaman {{VKOA}} eksiğidir.' },

      { baslik:'Vade geçer, ödeme gelmez — 1. ihtar', tcode:'F150',
        aciklama:'05.12 vadesi geldi ama ödeme yok. 15.12’de (10 gün gecikme) ihtar çalıştırılıyor.',
        girdi:[
          { alan:'Çalıştırma tarihi / kimlik', deger:'15.12.2026 / AR01' },
          { alan:'İhtar prosedürü', deger:'Z001 — 1. seviye (10 gün gecikme)' },
          { alan:'Sonuç', deger:'C-5001 için 1. seviye ihtarname basıldı' },
        ],
        tabloEtkisi:[
          { tablo:'MHNK', ne:'Müşteri ihtar seviyesi = 1, son ihtar tarihi 15.12.2026' },
          { tablo:'BSID', ne:'Kalemde `MAHNS` = 1 (ulaşılan ihtar seviyesi)' },
        ],
        not:'İhtar bir muhasebe kaydı **üretmez**; yalnızca takip verisi yazar. Muhasebe etkisi yoktur.' },

      { baslik:'Kısmi ödeme gelir — 70.000 TL', tcode:'F-28',
        aciklama:'Bayi 70.000 TL gönderiyor, kalanı için süre istiyor. AR uzmanı **kısmi kapatma** seçiyor — ' +
                 'çünkü orijinal vadenin korunması, gecikmenin izlenebilmesi için şart.',
        girdi:[
          { alan:'Banka hesabı / Tutar', deger:'102000 / 70.000 TL' },
          { alan:'Müşteri', deger:'C-5001 → açık kalem listelendi (120.000)' },
          { alan:'Seçim', deger:'**Kısmi ödeme** sekmesi → 70.000 TL girildi' },
        ],
        fis:{ baslik:'Belge 1400000234 — Kısmi tahsilat', belgeTuru:'DZ', tarih:'22.12.2026',
          satirlar:[
            { hesap:'102', ad:'Bankalar', borc:70000, not:'Nakit girdi' },
            { hesap:'120', ad:'Alıcılar — C-5001', alacak:70000, not:'{{kismi-kapatma}} kalemi' },
          ], not:'**Gelir kaydı yok** — gelir faturada kaydedilmişti. Bu sadece varlık dönüşümüdür.' },
        tabloEtkisi:[
          { tablo:'BSID', ne:'İki açık kalem: orijinal **+120.000** (vade 05.12, hâlâ açık) ve ödeme **−70.000**' },
        ],
        not:'{{kalan-kapatma}} seçilseydi orijinal kalem kapanır, 50.000 TL’lik yeni kalem üretilir ve ' +
             '**vadesi 22.12’den başlardı** — 17 günlük gecikme silinir, ihtar seviyesi sıfırlanırdı. ' +
             'Bu yüzden kısmi kapatma seçildi.' },

      { baslik:'Gecikme sürer — 3. ihtar ve kredi bloğu', tcode:'F150',
        aciklama:'Kalan 50.000 TL için ödeme gelmiyor. 45 gün gecikmede 3. seviye ihtar gidiyor ve ' +
                 'müşterinin kredi limiti düşürülüyor.',
        girdi:[
          { alan:'İhtar seviyesi', deger:'3 — gecikme faizli sert uyarı' },
          { alan:'Kredi limiti', deger:'500.000 → 200.000 TL’ye düşürüldü ({{UKM_BP}})' },
          { alan:'Sonuç', deger:'Yeni siparişler otomatik bloklanır' },
        ],
        not:'AR yalnızca muhasebe değil, **risk yönetimidir**. Tahsil edilemeyen alacak, yeni satışı durdurur.' },

      { baslik:'Dönem sonu — şüpheli alacak karşılığı', tcode:'F-30',
        aciklama:'31.12 kapanışında kalan 50.000 TL 90+ gün grubunda. Muhasebe müdürü karşılık ayırıyor.',
        girdi:[
          { alan:'Yaşlandırma', deger:'{{S_ALR_87012168}} → 50.000 TL, 90+ gün' },
          { alan:'Karar', deger:'%100 karşılık ayrılacak' },
          { alan:'Özel G/L göstergesi', deger:'E — şüpheli alacak' },
        ],
        fis:{ baslik:'Belge 1000000891 — Şüpheli alacak karşılığı', belgeTuru:'SA', tarih:'31.12.2026',
          satirlar:[
            { hesap:'654', ad:'Karşılık giderleri', borc:50000, not:'Gider doğdu — kâr azalır' },
            { hesap:'129', ad:'Şüpheli ticari alacaklar karşılığı', alacak:50000, not:'Kontra varlık' },
          ], not:'**Alacak silinmedi.** 120 hesabı hâlâ 50.000 TL gösteriyor; 129 hesabı onu bilançoda ' +
                 'sıfıra indiriyor. Müşteri sonradan öderse karşılık iptal edilir ve gelir yazılır.' },
        tabloEtkisi:[
          { tablo:'BSID', ne:'Kalem `UMSKZ` = E ile şüpheli alacak olarak sınıflandı' },
        ] },
    ],

    sonuc:
      '**Sonuç tablosu:** 100.000 TL gelir kaydedildi, 60.000 TL maliyet yazıldı — kâğıt üzerinde **40.000 TL kâr**. ' +
      'Ama 70.000 TL tahsil edildi ve 50.000 TL için karşılık ayrıldı (50.000 TL gider). ' +
      'Gerçek sonuç: 100.000 − 60.000 − 50.000 = **−10.000 TL zarar**.\n\n' +
      '**Üç kritik ders:**\n\n' +
      '**1. Satış kâr getirmez, tahsilat getirir.** Fatura kesildiğinde kâr görünür ama tahsil edilmezse ' +
      'karşılık gideri o kârı silip götürür. AR’nin varlık sebebi budur.\n\n' +
      '**2. {{kismi-kapatma}} ile {{kalan-kapatma}} seçimi teknik değil, yönetsel bir karardır.** ' +
      'Kalan kapatma seçilseydi 17 günlük gecikme kayıtlardan silinecek, ihtar süreci sıfırlanacak ve ' +
      'müşterinin gerçek riski görünmez hâle gelecekti.\n\n' +
      '**3. Şüpheli alacakta alacak silinmez, karşılık ayrılır.** 120 hesabı borcu göstermeye devam eder ' +
      '(hukuki takip sürüyor), 129 karşılık hesabı bilançoda onu netler. Tahsilat gerçekleşirse karşılık iptal edilir.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'AR, müşterilerden olan alacakları yöneten {{muavin-defter}}dir; ana muhasebeye {{mutabakat-hesabi}} ile yansır.',
      'AP’nin **aynasıdır**: LFA1↔{{KNA1}}, LFB1↔{{KNB1}}, BSIK↔{{BSID}}, BSAK↔{{BSAD}}, OBYC↔{{VKOA}}.',
      'Muhasebe zinciri: **fatura** (alacak doğar) → **{{tahsilat}}** (nakde döner) → **{{kapatma}}**.',
      '**Tahsilat gelir değildir** — gelir faturada kaydedilir; tahsilat sadece varlık dönüşümüdür.',
      'Faturanın iki yolu: **{{VF01}}** (SD’den otomatik, hesabı {{VKOA}} belirler) ve **{{FB70}}** (doğrudan FI).',
      'SD faturası kesildi ama FI belgesi yoksa {{VBRK}} `RFBSK` = "A" kalır; sebep genelde {{VKOA}} eksiğidir.',
      '{{kismi-kapatma}} vadeyi korur, {{kalan-kapatma}} sıfırlar — AR’de varsayılan tercih kısmi olmalıdır.',
      '{{supheli-alacak}}ta alacak silinmez; karşılık ayrılarak bilançoda net değere getirilir.',
    ],

    onemliNoktalar:[
      '**"Tahsilat gelir midir?"** Hayır. Gelir fatura anında kaydedilir. Tahsilat alacağı nakde çevirir — bilanço içi yer değiştirme.',
      '**"SD faturası kesildi ama muhasebeye düşmedi. Ne yaparsın?"** {{VBRK}} `RFBSK` alanını kontrol et; "A" ise {{VKOA}}’yı tamamla ve {{VF02}} → *Muhasebeye aktar*. **Faturayı iptal etme.**',
      '**"Kısmi ile kalan kapatma farkı?"** Kısmi: orijinal kalem açık kalır, **vade korunur**. Kalan: orijinal kapanır, yeni kalem üretilir, **vade sıfırlanır** ve yaşlandırma bozulur.',
      '**"Müşteri avansı neden 120’ye yazılmaz?"** Avans bir alacak değil **borçtur** (müşteriye mal borcu). {{ozel-ana-muhasebe-gostergesi}} ile 340 hesabına yönlendirilir.',
      '**"Şüpheli alacakta alacak silinir mi?"** Hayır. Karşılık ayrılır (654 borç / 129 alacak); 120 hesabı bakiyeyi göstermeye devam eder.',
      '**"İhtar muhasebe kaydı üretir mi?"** Hayır. Yalnızca {{MHNK}}/{{MHND}} takip verisi ve kalemdeki `MAHNS` seviyesi güncellenir.',
      '**"VKOA neye göre hesap belirler?"** Satış organizasyonu + müşteri hesap belirleme grubu + malzeme hesap belirleme grubu + hesap anahtarı (ERL gelir, ERS iskonto).',
      '**"AR ile AP tablo simetrisi nedir?"** Müşteri {{KNA1}}/{{KNB1}}, açık kalem {{BSID}}, kapalı {{BSAD}}. Satıcı tarafında LFA1/LFB1, BSIK, BSAK.',
    ],

    sikHatalar:[
      { hata:'Tahsilatı gelir olarak kaydetmek.', dogru:'Gelir faturada kaydedildi. Tahsilat: banka borç / müşteri alacak — gelir hesabı hiç çalışmaz.' },
      { hata:'SD faturası muhasebeleşmedi diye faturayı iptal edip yeniden kesmek.', dogru:'{{VKOA}} eksiği giderilir, {{VF02}} ile yeniden aktarılır. İptal, SD numarasını boşa harcar.' },
      { hata:'Her kısmi tahsilatta kalan kapatma kullanmak.', dogru:'Vadeyi sıfırlar ve gecikmiş alacağı gizler. Varsayılan **kısmi kapatma** olmalıdır.' },
      { hata:'Müşteri avansını 120 Alıcılar hesabına yazmak.', dogru:'Avans bir borçtur; {{ozel-ana-muhasebe-gostergesi}} ile 340 hesabına yazılır.' },
      { hata:'Şüpheli alacakta 120 hesabını doğrudan azaltmak.', dogru:'Karşılık hesabı (129) kullanılır. Alacak takibi sürdüğü için 120 bakiyesi korunur.' },
      { hata:'{{OB52}}’de sadece S hesap tipini açmak.', dogru:'Müşteri kaydı için **D** hesap tipi de açılmalıdır.' },
      { hata:'Tahsilatta rastgele kalem kapatmak.', dogru:'En eski kalemden başla (FIFO). Aksi hâlde gecikmiş alacaklar açık kalır ve yaşlandırma yanlış çıkar.' },
      { hata:'İhtarname önerisini kontrol etmeden basmak.', dogru:'İhtar bir müşteri ilişkisi kararıdır; satış ekibiyle gözden geçirilmelidir.' },
      { hata:'Avans kalemlerini {{F-28}}’de bulamayınca yok sanmak.', dogru:'Seçim ekranında **"Özel G/L işlemleri"** kutusu işaretlenmelidir.' },
    ],

    ipuclari:[
      '**AP’yi biliyorsan AR’yi yarı sürede öğrenirsin.** Tablo, işlem ve kavramlar birebir simetriktir; ' +
      'tek fark yönün tersine dönmesidir (borç↔alacak, varlık↔kaynak).',
      '{{FBL5N}} düzenine **gecikme günü** ve **ihtar seviyesi** sütunlarını ekle, varsayılan yap.',
      'Tahsilatlarda FIFO disiplinini benimse — yaşlandırmanın gerçeği yansıtması buna bağlıdır.',
      'Dönem sonunda {{S_ALR_87012168}} ile yaşlandırma al; **90+ gün grubu toplamın %5’ini geçiyorsa** ' +
      'tahsilat süreci gözden geçirilmelidir.',
      'Toplu tahsilatları {{F-28}} yerine {{FEBAN}} üzerinden işle — banka ekstresi satırı doğrudan ' +
      'açık kaleme bağlanır, çok daha hızlıdır.',
      '"Fatura muhasebeye düşmedi" şikâyetinde ilk komut: {{SE16N}} → {{VBRK}} → `RFBSK` alanına bak.',
    ],

    quiz:[
      { soru:'Müşteriden 120.000 TL tahsil edildi. Doğru kayıt hangisidir?',
        secenekler:[
          'Banka borç 120.000 / Yurtiçi satışlar alacak 120.000',
          'Banka borç 120.000 / Alıcılar alacak 120.000',
          'Alıcılar borç 120.000 / Banka alacak 120.000',
          'Banka borç 100.000 / Satışlar alacak 100.000 / KDV alacak 20.000',
        ], dogru:1,
        aciklama:'{{tahsilat}} **gelir kaydı değildir** — gelir fatura anında kaydedilmişti. ' +
                 'Tahsilat bilanço içi bir dönüşümdür: alacak azalır (120 alacaklanır), nakit artar (banka borçlanır).' },

      { soru:'SD faturası kesildi ama FI belgesi oluşmadı. İlk kontrol edilecek şey nedir?',
        secenekler:[
          'Müşteri ana verisinde mutabakat hesabı',
          '{{VBRK}} tablosundaki `RFBSK` alanı ve {{VKOA}} hesap belirlemesi',
          'Numara aralığı',
          'Kredi limiti',
        ], dogru:1,
        aciklama:'`RFBSK` = "A" ise fatura muhasebeye aktarılmamıştır. En sık sebep {{VKOA}}’da eksik gelir hesabı ' +
                 'belirlemesidir. Düzeltilip {{VF02}} → *Muhasebeye aktar* ile yeniden denenir; **fatura iptal edilmez.**' },

      { soru:'90 gün gecikmiş 120.000 TL’lik alacağın 70.000 TL’si tahsil edildi. **Kalan kapatma** seçilirse ne olur?',
        secenekler:[
          'Orijinal kalem açık kalır, vade korunur',
          'Orijinal kalem kapanır, 50.000 TL’lik yeni kalem oluşur ve **vadesi bugünden başlar**',
          'Borç tamamen kapanır',
          '50.000 TL gider yazılır',
        ], dogru:1,
        aciklama:'{{kalan-kapatma}} yeni kalem ürettiği için vade sıfırlanır: 90 gün gecikmiş alacak aniden ' +
                 '"vadesi gelmemiş" görünür, {{yaslandirma}} bozulur ve {{ihtar}} süreci sıfırlanır. ' +
                 'Bu yüzden AR’de varsayılan tercih {{kismi-kapatma}} olmalıdır.' },

      { soru:'Müşteriden mal teslim edilmeden 40.000 TL avans alındı. Bu tutar bilançoda nerede gösterilir?',
        secenekler:[
          'Varlık — Alıcılar hesabında',
          'Gelir tablosunda — satış geliri olarak',
          'Kaynak — Alınan sipariş avansları hesabında',
          'Kayıt yapılmaz, fatura kesilince kaydedilir',
        ], dogru:2,
        aciklama:'{{avans}} bir gelir değildir; mal/hizmet henüz verilmemiştir. Şirketin müşteriye ' +
                 '**mal borcu** doğmuştur, bu yüzden bilançoda kaynak tarafında (340) gösterilir. ' +
                 '{{ozel-ana-muhasebe-gostergesi}} ile normal alacaktan ayrılır; fatura kesilince {{F-39}} ile mahsup edilir.' },

      { soru:'Şüpheli hale gelen 50.000 TL’lik alacak için doğru muhasebe işlemi nedir?',
        secenekler:[
          '120 Alıcılar hesabından doğrudan düşülür',
          '654 Karşılık gideri borç / 129 Şüpheli alacak karşılığı alacak',
          'Gelir hesabı ters kaydedilir',
          'Hiçbir kayıt yapılmaz, hukuki süreç beklenir',
        ], dogru:1,
        aciklama:'Alacak **silinmez** — hukuki takip sürdüğü için 120 hesabı bakiyeyi göstermeye devam eder. ' +
                 'Karşılık hesabı (129, kontra varlık) alacağı bilançoda netler. Müşteri sonradan öderse ' +
                 'karşılık iptal edilir ve gelir yazılır.' },

      { soru:'{{F150}} ihtar çalıştırması hangi muhasebe kaydını üretir?',
        secenekler:[
          'Gecikme faizi geliri kaydı',
          'Şüpheli alacak karşılığı',
          'Hiçbir muhasebe kaydı üretmez',
          'Alacağı kapatır',
        ], dogru:2,
        aciklama:'{{ihtar}} bir takip işlemidir; {{MHNK}}/{{MHND}} tablolarına ihtar seviyesi ve tarihi yazar, ' +
                 'kalemde `MAHNS` alanını günceller. **Muhasebe etkisi yoktur.** Gecikme faizi ayrıca ' +
                 'faturalanırsa o zaman kayıt oluşur.' },

      { soru:'AP ile AR arasındaki tablo simetrisinde {{BSIK}}’in AR karşılığı nedir?',
        secenekler:['{{BSAD}}','{{BSID}}','{{KNB1}}','{{VBRK}}'],
        dogru:1,
        aciklama:'{{BSIK}} satıcı **açık** kalemleri, {{BSID}} müşteri **açık** kalemleridir. ' +
                 'Kapatılmışlar {{BSAK}} (satıcı) ve {{BSAD}} (müşteri). Her ikisi de S/4HANA’da {{uyumluluk-view}}dir.' },

      { soru:'Satış 100.000 TL gelir, 60.000 TL maliyet. 50.000 TL için şüpheli alacak karşılığı ayrıldı. Gerçek sonuç nedir?',
        secenekler:['40.000 TL kâr','10.000 TL zarar','50.000 TL kâr','Değişmez, 40.000 TL kâr'],
        dogru:1,
        aciklama:'100.000 gelir − 60.000 maliyet − 50.000 karşılık gideri = **−10.000 TL zarar**. ' +
                 'Bu, AR’nin varlık sebebini özetler: **satış kâr getirmez, tahsilat getirir.** ' +
                 'Tahsil edilemeyen alacağın karşılığı, kâğıt üzerindeki kârı silip götürür.' },
    ],

    flashcards:[
      { on:'Tahsilat gelir midir?', arka:'**Hayır.**\n\nGelir fatura anında kaydedilir. Tahsilat sadece bilanço içi dönüşümdür:\n**Banka borç / Alıcılar alacak**\n\nGelir hesabı hiç çalışmaz.' },
      { on:'AR ile AP tablo simetrisi nedir?', arka:'**Satıcı → Müşteri**\nLFA1 → KNA1\nLFB1 → KNB1\nBSIK → **BSID** (açık)\nBSAK → **BSAD** (kapalı)\nOBYC → **VKOA**\nFBL1N → FBL5N' },
      { on:'SD faturası kesildi ama FI belgesi yok. Ne yaparsın?', arka:'**VBRK-RFBSK** alanına bak: "A" = aktarılmadı.\n\nEn sık sebep: **VKOA**’da gelir hesabı belirlemesi eksik.\n\nÇözüm: VKOA’yı tamamla → **VF02 → Muhasebeye aktar**.\n\n⚠️ Faturayı iptal etme.' },
      { on:'Kısmi ile kalan kapatma farkı nedir?', arka:'**Kısmi:** orijinal kalem açık kalır, ödeme ayrı kalem olur. **Vade korunur** → yaşlandırma doğru kalır.\n\n**Kalan:** orijinal kapanır, yeni kalem üretilir. **Vade bugünden başlar** → gecikme silinir, ihtar sıfırlanır.\n\nAR’de varsayılan: kısmi.' },
      { on:'Müşteri avansı neden 120 hesabına yazılmaz?', arka:'Avans bir **alacak değil, borçtur** — müşteriye mal/hizmet borcu.\n\nBilançoda **kaynak** tarafında (340 Alınan avanslar) gösterilir.\n\nÖzel G/L göstergesi ile ayrılır; fatura kesilince F-39 ile mahsup edilir.' },
      { on:'Şüpheli alacakta alacak silinir mi?', arka:'**Hayır.** Karşılık ayrılır:\n**654 Karşılık gideri borç / 129 Karşılık alacak**\n\n120 hesabı bakiyeyi göstermeye devam eder (hukuki takip sürüyor).\n129 kontra hesabı bilançoda netler.' },
      { on:'VKOA neye göre gelir hesabını belirler?', arka:'Dört kritere göre:\n1. **Satış organizasyonu**\n2. **Müşteri** hesap belirleme grubu\n3. **Malzeme** hesap belirleme grubu\n4. **Hesap anahtarı** (ERL gelir, ERS iskonto, ERF navlun)\n\nSonuç T030 tablosuna yazılır.' },
      { on:'İhtar (F150) muhasebe kaydı üretir mi?', arka:'**Hayır.**\n\nSadece takip verisi yazar:\n• MHNK/MHND tablolarına ihtar seviyesi ve tarih\n• Kalemde MAHNS alanı güncellenir\n\nGecikme faizi ayrıca faturalanırsa o zaman kayıt oluşur.' },
      { on:'Yaşlandırma nasıl yorumlanır?', arka:'Vadeden itibaren gün gruplarına ayrılır: gelmemiş · 1-30 · 31-60 · 61-90 · **90+**\n\n**90+ grubu toplamın %5’ini geçiyorsa** tahsilat süreci zayıftır.\n\nTek müşteri 90+’ın yarısındansa **yoğunlaşma riski** vardır.' },
      { on:'Mal gönderildi ama fatura kesilmedi. Muhasebe durumu nedir?', arka:'Sadece **maliyet** kaydedilir:\n621 SMM borç / 153 Stok alacak\n\n**Gelir ve alacak yok** — bunlar faturayla doğar.\n\nDönem sonunda "faturalanmamış teslimat" olarak tahakkuk ettirilir.' },
      { on:'S/4HANA’da AR’de ne değişti?', arka:'1. Müşteri ana verisi → **BP** (FI Customer rolü)\n2. Kredi yönetimi FD32 → **UKM_BP** (SAP Credit Management)\n3. BSID/BSAD → **compatibility view**\n4. FSCM Collections Management ile tahsilat iş listesi' },
      { on:'Tahsilatta hangi kalemden başlanmalı?', arka:'**En eskiden (FIFO).**\n\nMüşteri hangi faturayı ödediğini belirtmediyse en eski kalem kapatılır.\n\nRastgele seçim gecikmiş alacakları açık bırakır ve yaşlandırma raporunu bozar.' },
    ],
  },

  },
});
