/* ==========================================================================
   content/fi/genel-muhasebe.js — "Genel Muhasebe" konusunun derin içeriği
   --------------------------------------------------------------------------
   catalog.js'teki aynı id'li stub ile MERGE edilir; kart bilgileri oradan gelir.
   Bölüm şeması için CLAUDE.md §4'e bak.
   ========================================================================== */

SAP.registerTopic({
  id: 'genel-muhasebe',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Genel muhasebe, bir şirketin para ile ölçülebilen tüm olaylarını belirli kurallara göre kaydeden, ' +
      'sınıflayan, özetleyen ve raporlayan sistemdir. SAP FI bu sistemin yazılıma dökülmüş hâlidir — ' +
      'yani SAP yeni bir muhasebe icat etmez, yüzlerce yıllık muhasebe kurallarını uygular.\n\n' +
      'Bu konuyu atlayıp doğrudan işlem kodlarına geçmek, en sık yapılan hatadır. {{FB50}} ekranını ezberleyebilirsin ' +
      'ama "bu satır neden borç?" sorusuna cevap veremezsen ilk gerçek hatada tıkanırsın.',

    neden:
      'Üç ayrı ihtiyaç aynı sistemi zorunlu kılar:\n\n' +
      '**Yasal zorunluluk.** Şirketler vergi dairesine ve ticaret siciline defter tutmak zorundadır.\n\n' +
      '**Karar alma.** Yönetim "kârlı mıyız, nakdimiz yetiyor mu, hangi müşteri ödemiyor" sorularının cevabını ' +
      'sadece muhasebe verisinden alabilir.\n\n' +
      '**Güven.** Banka kredi verirken, yatırımcı ortak olurken, denetçi imza atarken aynı kurallarla üretilmiş ' +
      'tabloya bakar. Kurallar ortak olmasa hiçbir tablo karşılaştırılamazdı.',

    sirketOnemi:
      'Muhasebe, şirketin **tek gerçek kaydıdır**. Satış ekibi "bu ay çok sattık" der, üretim "kapasitemiz doldu" der; ' +
      'bunların hepsi ancak muhasebeye düştüğünde ölçülebilir bir gerçeğe dönüşür.\n\n' +
      'SAP açısından kritik sonuç şudur: MM’de mal girişi, SD’de fatura, HR’da bordro — hepsi eninde sonunda ' +
      'FI’a bir muhasebe belgesi olarak düşer. FI, tüm modüllerin buluştuğu son duraktır. Bu yüzden FI danışmanı ' +
      'diğer modülleri de anlamak zorundadır.',

    gercekHayat:
      'Bir kafe düşün. Sahibi kasadaki parayı sayıyor ve "bugün 3.000 TL kazandım" diyor. Ama o gün 5.000 TL’lik ' +
      'kahve çekirdeği siparişi verdi, faturası gelmedi. Kirası 20.000 TL, ayın 5’inde ödenecek. Kahve makinesi ' +
      '60.000 TL’ye alındı, 5 yıl kullanılacak.\n\n' +
      'Kasadaki para "kâr" değildir. Gerçek kârı görmek için: gelen siparişin borcunu, kiranın o güne düşen payını ve ' +
      'makinenin yıpranmasını da hesaba katmak gerekir. Muhasebenin varlık sebebi tam olarak budur — ' +
      '**nakit hareketi ile kâr aynı şey değildir.**',

    muhasebeMantigi:
      'Her şey tek bir denklemden çıkar:\n\n' +
      '**VARLIKLAR = KAYNAKLAR** yani **Varlıklar = Borçlar + Özkaynak**\n\n' +
      'Sol taraf "neyim var", sağ taraf "bunu nereden buldum" sorusunu cevaplar. 100.000 TL’lik bir makinen varsa, ' +
      'ya birine borçlanmışsındır ya da kendi paranı koymuşsundur. Üçüncü bir ihtimal yoktur.\n\n' +
      'Bu denklem her işlemde bozulmamalıdır. Denklemi bozmadan kayıt yapmanın yolu {{cift-tarafli-kayit}} ilkesidir: ' +
      'her işlem en az iki hesaba, {{borc}} ve {{alacak}} tarafları eşit olacak şekilde yazılır.\n\n' +
      'SAP bu kuralı yumuşatmaz, **zorlar**: borç ≠ alacak olan bir belge kaydedilemez. En fazla {{park-etme}} ile ' +
      'kenara koyulabilir.',

    kavramlar: ['borc', 'alacak', 'cift-tarafli-kayit', 'bilanco', 'gelir-tablosu', 'tahakkuk-esasi',
                'mizan', 'yevmiye', 'muavin-defter', 'ana-muhasebe'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Muhasebe süreci bir döngüdür ve her dönem baştan işler. Bu döngü SAP’ta birebir aynıdır; ' +
      'sadece adımların bir kısmını sistem otomatik yapar.',

    roller: [
      { rol:'İş birimi (satın alma, satış, depo)', gorev:'Olayı başlatır: sipariş verir, mal kabul eder, fatura keser. Muhasebe belgesi çoğu zaman burada, farkında olmadan doğar.' },
      { rol:'Muhasebe uzmanı', gorev:'Belgeyi sisteme girer veya sistemden düşen belgeyi kontrol eder. Hesap, vergi kodu ve masraf yeri doğru mu bakar.' },
      { rol:'Muhasebe müdürü', gorev:'Yüksek tutarlı ve olağandışı kayıtları onaylar; dönem kapanışını yönetir.' },
      { rol:'Mali müşavir / denetçi', gorev:'Kayıtların mevzuata uygunluğunu denetler, mali tabloları onaylar.' },
      { rol:'SAP FI danışmanı', gorev:'Bu akışın sistemde doğru çalışmasını sağlar: hesap planı, belge türleri, otomatik hesap belirleme ve dönem kontrolü.' },
    ],

    diyagram: {
      type: 'flow',
      baslik: 'Muhasebe döngüsü — bir dönemin başından sonuna',
      adimlar: [
        { ic:'📄', rol:'İş birimi', baslik:'Belgeye dayanan bir olay gerçekleşir',
          aciklama:'Fatura, dekont, bordro, mal kabul fişi… Muhasebede belgesi olmayan kayıt yapılmaz.',
          cikti:'Kaynak belge', ok:'belge muhasebeye ulaşır' },
        { ic:'✍️', rol:'Muhasebe', baslik:'Yevmiye kaydı yapılır',
          aciklama:'Olay {{borc}} ve {{alacak}} olarak hesaplara yazılır. SAP’ta bu bir FI belgesidir ({{BKPF}} + {{BSEG}}).',
          cikti:'FI belgesi', ok:'kayıt hesaplara dağılır' },
        { ic:'📚', rol:'Sistem', baslik:'Defter-i kebire (büyük deftere) aktarım',
          aciklama:'Elle muhasebede ayrı bir adımdır; SAP’ta kayıt anında otomatik olur. Bakiyeler {{ACDOCA}} üzerinden anlık hesaplanır.',
          cikti:'Hesap bakiyeleri', ok:'dönem sonu gelir' },
        { ic:'⚖️', rol:'Muhasebe', baslik:'Mizan alınır ve kontrol edilir',
          aciklama:'{{mizan}} ile borç toplamı = alacak toplamı doğrulanır. Tutmuyorsa kayıt hatası vardır.',
          cikti:'Mizan raporu', ok:'düzeltme gerekiyorsa' },
        { ic:'🔧', rol:'Muhasebe', baslik:'Dönem sonu düzeltme kayıtları',
          aciklama:'{{amortisman}}, {{kur-farki}}, tahakkuklar ve karşılıklar. {{tahakkuk-esasi}} gereği yapılır.',
          cikti:'Düzeltme fişleri', ok:'tablolar üretilir' },
        { ic:'📊', rol:'Muhasebe müdürü', baslik:'Mali tablolar üretilir',
          aciklama:'{{bilanco}} ve {{gelir-tablosu}}. SAP’ta {{F.01}} raporu {{mali-tablo-yapisi}}’na göre üretir.',
          cikti:'Bilanço, gelir tablosu', ok:'yıl sonuysa' },
        { ic:'🔒', rol:'Sistem', baslik:'Kapanış ve devir',
          aciklama:'Gelir-gider hesapları sıfırlanır, sonuç özkaynağa gider; bilanço hesapları yeni yıla devreder ({{bakiye-devri}}).',
          cikti:'Açılış bakiyeleri' },
      ],
    },

    adimlar: [
      { rol:'İş birimi', eylem:'Ekonomik olay gerçekleşir ve belgelenir', sistem:'MM / SD / HR belgesi veya kâğıt fatura' },
      { rol:'Muhasebe', eylem:'Kayıt hangi hesaplara gidecek belirlenir', sistem:'{{hesap-plani}} ve {{hesap-belirleme}} kuralları' },
      { rol:'Muhasebe', eylem:'Yevmiye kaydı girilir', sistem:'{{FB50}}, {{FB60}}, {{F-02}} veya otomatik kayıt' },
      { rol:'Sistem', eylem:'Belge numarası verilir ve hesaplara işlenir', sistem:'{{numara-araligi}} + {{BKPF}}/{{BSEG}}/{{ACDOCA}}' },
      { rol:'Muhasebe', eylem:'Kontrol ve mutabakat yapılır', sistem:'{{FBL3N}}, {{FS10N}}, {{FBL1N}}, {{FBL5N}}' },
      { rol:'Muhasebe', eylem:'Dönem sonu düzeltmeleri kaydedilir', sistem:'{{AFAB}}, {{F.05}}, {{F.19}}' },
      { rol:'Muhasebe müdürü', eylem:'Dönem kapatılır, tablolar alınır', sistem:'{{OB52}}, {{F.01}}, {{FAGLGVTR}}' },
    ],

    veriAkisi: {
      nereden: 'Kaynak belgeler: satıcı faturası, müşteri faturası, banka ekstresi, bordro, mal hareketi. SAP’ta bunların çoğu MM, SD ve HR modüllerinden otomatik akar.',
      nereye: 'Hesap bakiyelerine, oradan {{mizan}}’a ve mali tablolara. Ayrıca CO tarafında {{maliyet-yeri}} raporlarına.',
      tetikleyen: 'Ekonomik olayın belgesi. Belge yoksa kayıt yapılmaz — muhasebenin "belge olmadan kayıt olmaz" kuralı SAP’ta da geçerlidir.',
      sonraki: 'Vergi beyanı, konsolidasyon, yönetim raporlaması ve denetim.',
    },

    notlar: [
      { tip:'tip', baslik:'SAP’ın en büyük farkı', metin:
        'Elle muhasebede "yevmiyeye yaz → büyük deftere aktar → mizan çıkar" üç ayrı iştir. SAP’ta kayıt anında ' +
        'üçü birden olur. Bu yüzden SAP’ta *mizan tutmama* diye bir sorun yoktur; sistem dengesiz belgeyi zaten kabul etmez.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Borç ve alacağın "artış/azalış" anlamı hesabın **tipine** göre değişir. Ezberlenecek tek tablo budur; ' +
      'gerisi bundan türer.\n\n' +
      'Hafıza kuralı: **Varlık ve Gider borçla artar.** Diğer her şey (Kaynak, Özkaynak, Gelir) alacakla artar.',

    etkilenenHesaplar: [
      { hesap:'Varlık (Aktif)', tur:'Bilanço', neden:'Kasa, banka, stok, alacaklar, makine. **Borçla artar, alacakla azalır.** Şirkete giren değer sol tarafa yazılır.' },
      { hesap:'Borç (Pasif)', tur:'Bilanço', neden:'Satıcılara borç, banka kredisi, vergi borcu. **Alacakla artar, borçla azalır.**' },
      { hesap:'Özkaynak', tur:'Bilanço', neden:'Sermaye ve geçmiş yıl kârları. **Alacakla artar.** Ortağın koyduğu para şirket için bir kaynaktır.' },
      { hesap:'Gelir', tur:'Gelir tablosu', neden:'Satış geliri, faiz geliri. **Alacakla artar.** Gelir özkaynağı büyüttüğü için özkaynakla aynı yönde çalışır.' },
      { hesap:'Gider', tur:'Gelir tablosu', neden:'Kira, maaş, {{amortisman}}. **Borçla artar.** Gider özkaynağı küçülttüğü için ters yönde çalışır.' },
    ],

    fisler: [
      { baslik:'Örnek 1 — Peşin satış (10.000 TL + %20 KDV)',
        belgeTuru:'SA', tarih:'01.03.2026', paraBirimi:'TRY',
        satirlar: [
          { hesap:'100', ad:'Kasa', borc:12000, not:'Varlık arttı → borç' },
          { hesap:'600', ad:'Yurtiçi satışlar', alacak:10000, not:'Gelir arttı → alacak' },
          { hesap:'391', ad:'Hesaplanan KDV', alacak:2000, not:'Devlete borç doğdu → alacak' },
        ],
        not:'KDV şirketin geliri değildir; devlet adına tahsil edilir ve bir **borç** olarak durur. Bu yüzden 600 hesabına 12.000 değil 10.000 yazılır.' },

      { baslik:'Örnek 2 — Vadeli mal alımı (50.000 TL + %20 KDV)',
        belgeTuru:'KR', tarih:'05.03.2026', paraBirimi:'TRY',
        satirlar: [
          { hesap:'153', ad:'Ticari mallar', borc:50000, not:'Stok (varlık) arttı → borç' },
          { hesap:'191', ad:'İndirilecek KDV', borc:10000, not:'Devletten alacak doğdu → borç' },
          { hesap:'320', ad:'Satıcılar', alacak:60000, not:'Satıcıya borç doğdu → alacak' },
        ],
        not:'Bu belge SAP’ta {{FB60}} veya {{MIRO}} ile girilir. 320 satırı {{mutabakat-hesabi}} olduğu için doğrudan değil, satıcı ana verisi üzerinden yazılır.' },

      { baslik:'Örnek 3 — Ay sonu amortisman kaydı',
        belgeTuru:'AF', tarih:'31.03.2026', paraBirimi:'TRY',
        satirlar: [
          { hesap:'770', ad:'Genel yönetim gideri — amortisman', borc:1000, not:'Gider arttı → borç' },
          { hesap:'257', ad:'Birikmiş amortisman', alacak:1000, not:'Varlığı azaltan hesap → alacak' },
        ],
        not:'Bu kayıtta **hiç para hareket etmez**. {{tahakkuk-esasi}}’nın en net örneğidir: makine yıprandı, gider doğdu, ama kasadan kuruş çıkmadı. SAP’ta {{AFAB}} bu kaydı otomatik üretir.' },
    ],

    tHesaplar: [
      { hesap:'Kasa', kod:'100 (Varlık)',
        borc:[{ ad:'Peşin satış', tutar:12000 }, { ad:'Ortak sermaye', tutar:50000 }],
        alacak:[{ ad:'Kira ödemesi', tutar:20000 }],
        not:'Varlık hesabı normalde borç bakiyesi verir' },
      { hesap:'Satıcılar', kod:'320 (Borç)',
        borc:[{ ad:'Yapılan ödeme', tutar:20000 }],
        alacak:[{ ad:'Mal alımı', tutar:60000 }],
        not:'Borç hesabı normalde alacak bakiyesi verir' },
      { hesap:'Yurtiçi satışlar', kod:'600 (Gelir)',
        borc:[],
        alacak:[{ ad:'Peşin satış', tutar:10000 }, { ad:'Vadeli satış', tutar:25000 }],
        not:'Gelir hesabı yıl sonunda sıfırlanır' },
      { hesap:'Genel yönetim gideri', kod:'770 (Gider)',
        borc:[{ ad:'Kira', tutar:20000 }, { ad:'Amortisman', tutar:1000 }],
        alacak:[],
        not:'Gider hesabı yıl sonunda sıfırlanır' },
    ],

    notlar: [
      { tip:'warn', baslik:'En sık karıştırılan nokta', metin:
        'Bankadaki paran arttığında banka sana "hesabınız alacaklandırıldı" der. Bu **bankanın kendi defterindeki** ' +
        'ifadedir: banka sana borçlanmıştır. Senin defterinde ise banka bir varlıktır ve **borç** yazılır. ' +
        'Aynı olay iki tarafta ters görünür; buna karşılıklı kayıt denir.' },
      { tip:'tip', baslik:'SAP’ta borç/alacak nerede tutulur?', metin:
        '{{BSEG}} tablosunun `SHKZG` alanında: **S** = Soll (Almanca borç), **H** = Haben (alacak). ' +
        'SAP Almanya’da doğduğu için bu kısaltmalar hâlâ Almancadır ve tüm dünyada aynıdır.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim: 'Muhasebe tek bir şey değildir; kime hitap ettiğine göre farklı türleri vardır. SAP’ta bu ayrım modül ayrımına karşılık gelir.',
    liste: [
      { ad:'Finansal muhasebe', en:'Financial Accounting (FI)',
        aciklama:'Dışarıya — vergi dairesine, bankaya, ortaklara — rapor üretir. Kuralları mevzuatla belirlenir, esneklik yoktur.',
        neZaman:'Yasal defter ve mali tablo gerektiğinde. SAP’ta karşılığı **FI** modülüdür.',
        tcodes:['FB50','F.01','FBL3N'] },

      { ad:'Yönetim muhasebesi', en:'Management / Controlling (CO)',
        aciklama:'İçeriye — yöneticiye — rapor üretir. Hangi ürün kârlı, hangi departman ne harcıyor gibi soruları cevaplar. Kuralları şirket kendi belirler.',
        neZaman:'Karar desteği gerektiğinde. SAP’ta karşılığı **CO** modülüdür; {{maliyet-yeri}} ve {{kar-merkezi}} buranın nesneleridir.',
        tcodes:['KSB1','KS01'] },

      { ad:'Maliyet muhasebesi', en:'Cost Accounting',
        aciklama:'Bir ürünün veya hizmetin birim maliyetini hesaplar. Yönetim muhasebesinin alt dalıdır.',
        neZaman:'Üretim yapan şirketlerde fiyatlama ve stok değerleme için. SAP’ta CO-PC (Product Costing) alanıdır.' },

      { ad:'Vergi muhasebesi', en:'Tax Accounting',
        aciklama:'Vergi mevzuatının istediği şekilde hesaplama yapar. Ticari kâr ile mali kâr çoğu zaman farklıdır.',
        neZaman:'Beyanname dönemlerinde. SAP’ta {{vergi-kodu}} yapısı ve gerekirse ayrı bir {{paralel-defter}} ile çözülür.',
        tcodes:['FTXP','F.12'] },
    ],

    karsilastirmaBasliklar: ['Finansal muhasebe (FI)', 'Yönetim muhasebesi (CO)'],
    karsilastirma: [
      ['Kime hitap eder', 'Dışarıya: devlet, banka, ortak', 'İçeriye: yönetim'],
      ['Kuralları kim koyar', 'Mevzuat — zorunlu ve tek tip', 'Şirket kendisi — esnek'],
      ['Zaman odağı', 'Geçmiş (olan biteni raporlar)', 'Gelecek (bütçe, tahmin)'],
      ['Detay seviyesi', 'Şirket geneli', 'Ürün, departman, proje bazında'],
      ['SAP karşılığı', 'FI modülü, {{ana-muhasebe}}', 'CO modülü, {{maliyet-yeri}}'],
      ['S/4HANA’da', 'Aynı tabloda: {{ACDOCA}}', 'Aynı tabloda: {{ACDOCA}}'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    anlatim:
      'Bu konu teoriktir ama teorinin SAP’taki karşılığını görmek öğrenmeyi hızlandırır. ' +
      'Aşağıdaki üç işlem kodu, yukarıda anlatılan kavramları ekranda görmeni sağlar.',
    liste: [
      { kod:'FB50', ad:'G/L kaydı — borç/alacak mantığını ekranda görmek',
        amac:'Ana muhasebe kaydını tablo görünümünde girer. Her satırda hesap, borç/alacak seçimi ve tutar vardır.',
        neZaman:'Muhasebe mantığını denemek ve elle düzeltme kaydı girmek için. Yukarıdaki üç örnek fiş de bu ekrandan girilebilir.',
        adimlar: [
          { baslik:'Şirket kodunu ve tarihleri gir', aciklama:'Belge tarihi faturanın üstündeki tarih, kayıt tarihi ise **döneme karar veren** tarihtir. İkisi farklı olabilir.' },
          { baslik:'Satırları gir', aciklama:'Her satırda hesap numarası, **B/A** (borç/alacak) seçimi ve tutar. SAP burada {{kayit-anahtari}} sormaz, arka planda kendisi belirler.' },
          { baslik:'Ekranın sağ üstündeki bakiye göstergesine bak', aciklama:'Borç ve alacak eşitlenmeden gösterge kırmızıdır. Yeşile dönmeden kayıt yapılamaz — {{belge-denkligi}} kuralı burada görünür hâle gelir.' },
          { baslik:'Simüle et', aciklama:'*Belge → Simüle et* ile sistemin üreteceği tüm satırları (vergi satırı dâhil) kaydetmeden görürsün. Kaydetmeden önce her zaman simüle et.' },
          { baslik:'Kaydet', aciklama:'Belge numarası verilir ve kayıt geri alınamaz hâle gelir. Yanlışsa silinmez, {{FB08}} ile {{ters-kayit}} yapılır.' },
        ],
        ipucu:'Simülasyon ekranı, muhasebe öğrenmek için en iyi araçtır: girdiğin iki satıra karşılık SAP’ın otomatik eklediği vergi ve fark satırlarını görürsün.',
        ilgili:['F-02','FB03','FB08'] },

      { kod:'FBL3N', ad:'G/L kalem listesi — büyük defteri görmek',
        amac:'Bir hesabın tüm hareketlerini listeler. Elle muhasebedeki "defter-i kebir sayfası" tam olarak budur.',
        neZaman:'Bir hesabın bakiyesinin neden o tutarda olduğunu anlamak için.',
        adimlar: [
          { baslik:'Hesap numarası ve şirket kodunu gir' },
          { baslik:'Açık / kapalı / tüm kalemler seçimini yap', aciklama:'Bu ayrım yalnızca {{acik-kalem-yonetimi}} açık hesaplarda anlamlıdır.' },
          { baslik:'Satıra çift tıkla', aciklama:'Kalemin ait olduğu belgeye ({{FB03}}) inersin. Oradan da kaynak MM/SD belgesine gidebilirsin.' },
        ],
        ilgili:['FS10N','FAGLL03','FB03'] },

      { kod:'F.01', ad:'Bilanço ve gelir tablosu',
        amac:'Kayıtların en sonunda dönüştüğü mali tabloları üretir.',
        neZaman:'Dönem sonunda ve her mutabakat kontrolünde.',
        adimlar: [
          { baslik:'Şirket kodu ve dönem aralığını gir' },
          { baslik:'{{mali-tablo-yapisi}} (FSV) seç', aciklama:'Hangi hesabın hangi bilanço satırında görüneceğini bu yapı belirler. Yanlış FSV = yanlış görünen doğru veri.' },
          { baslik:'Karşılaştırma dönemini gir', aciklama:'Geçen yılın aynı dönemiyle karşılaştırma bu ekranda yapılır.' },
        ],
        ipucu:'Bilançoda aktif ve pasif toplamı eşit çıkmıyorsa veri hatası değil, çoğu zaman FSV’de bir hesabın hiçbir kaleme atanmamış olmasıdır.',
        ilgili:['OB58','FAGLB03'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Muhasebenin kâğıt üzerindeki üç defteri, SAP’ta üç tablo grubuna karşılık gelir. ' +
      'Bu eşleştirmeyi bir kez kurduğunda tablo yapısı ezber olmaktan çıkar.',
    liste: [
      { ad:'BKPF', baslik:'Yevmiye maddesinin başlığı',
        tutar:'Belgenin kimlik bilgisi: numara, {{belge-turu}}, tarih, para birimi, kaydı yapan kullanıcı.',
        olusturan:'Muhasebeleşen her işlem — {{FB50}}, {{FB60}}, {{MIRO}}, {{VF01}}…',
        guncelleyen:'{{FB50}}, {{FB60}}, {{FB70}}, {{F-02}}, {{FB08}}',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'Bir başlığa karşılık {{BSEG}}’de birden çok kalem vardır (1-n ilişkisi).',
        s4:'Değişmedi, hâlâ yazılır. Ancak raporlama artık {{ACDOCA}} üzerinden yapılır.',
        alanlar:[
          { ad:'BLART', aciklama:'{{belge-turu}} — belgenin ne tür bir işlem olduğunu söyler' },
          { ad:'BUDAT', aciklama:'Kayıt tarihi — **dönemi bu tarih belirler**, belge tarihi değil' },
          { ad:'BLDAT', aciklama:'Belge tarihi — faturanın üstündeki tarih' },
        ] },

      { ad:'BSEG', baslik:'Yevmiye maddesinin satırları',
        tutar:'Her satırın hesabı, tutarı ve {{borc}}/{{alacak}} yönü.',
        olusturan:'{{BKPF}} ile aynı anda, aynı işlem tarafından.',
        guncelleyen:'FI belgesi üreten tüm işlemler',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{BKPF}}’nin çocuğudur; müşteri satırı {{KNA1}}’e, satıcı satırı {{LFA1}}’e bağlanır.',
        s4:'Yazılmaya devam eder ama cluster tablo olduğu için yavaştır; raporlar {{ACDOCA}}’ya taşındı.',
        alanlar:[
          { ad:'SHKZG', aciklama:'**S** = borç, **H** = alacak. Muhasebenin en temel kuralının tablo karşılığı.' },
          { ad:'HKONT', aciklama:'Ana muhasebe hesabı' },
          { ad:'DMBTR', aciklama:'Yerel para birimi tutarı' },
        ] },

      { ad:'ACDOCA', baslik:'S/4HANA’nın tek defteri',
        tutar:'FI, CO, duran varlık ve malzeme defterini tek satırda birleştirir. Hem yevmiye hem büyük defter hem de toplam tablosu görevini üstlenir.',
        olusturan:'Muhasebeleşen her işlem',
        guncelleyen:'Tüm FI ve CO işlemleri',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{BKPF}} ile belge numarası üzerinden eşleşir; {{defter}} alanı sayesinde aynı belge birden çok standarda göre saklanabilir.',
        s4:'S/4HANA ile gelen tablodur. ECC’de karşılığı yoktur.',
        alanlar:[
          { ad:'RLDNR', aciklama:'{{defter}} — {{paralel-defter}} mantığının anahtarı' },
          { ad:'HSL', aciklama:'Şirket kodu para birimi tutarı' },
          { ad:'RACCT', aciklama:'Hesap numarası' },
        ] },
    ],

    er: {
      type: 'er',
      baslik: 'Muhasebe belgesinin tablo yapısı',
      varliklar: [
        { ad:'BKPF', rol:'Başlık', hub:true, aciklama:'Belgenin kimliği',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' },
                   { ad:'BLART' }, { ad:'BUDAT' }] },
        { ad:'BSEG', rol:'Kalem', aciklama:'Belgenin satırları',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' },
                   { ad:'SHKZG' }, { ad:'DMBTR' }] },
        { ad:'ACDOCA', rol:'Evrensel defter', aciklama:'S/4HANA’nın tek gerçek kaynağı',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }, { ad:'RLDNR', tip:'pk' },
                   { ad:'RACCT' }, { ad:'HSL' }] },
        { ad:'SKA1', rol:'Ana veri', aciklama:'Hesabın tanımı',
          alanlar:[{ ad:'KTOPL', tip:'pk' }, { ad:'SAKNR', tip:'pk' }, { ad:'XBILK' }] },
      ],
      iliskiler: [
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'bir başlık, çok kalem' },
        { from:'BKPF', to:'ACDOCA', alanlar:'RBUKRS + BELNR + GJAHR', not:'aynı belgenin evrensel görünümü' },
        { from:'BSEG', to:'SKA1', alanlar:'HKONT → SAKNR', not:'kalem hangi hesaba yazıldı' },
      ],
    },
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    postingLogic:
      'SAP’ta bir kaydın muhasebeleşmesi tek bir mantık zincirine dayanır: ' +
      '**belge türü → izin verilen hesap tipleri → kayıt anahtarı → borç/alacak yönü → alan durumu → denge kontrolü → numara ataması.** ' +
      'Bu zincirin herhangi bir halkası tutmazsa kayıt yapılamaz. Aldığın hataların neredeyse tamamı bu zincirin bir halkasındadır.',

    belgeTuru:
      '{{belge-turu}}, belgenin "ne olduğunu" söyler ve iki şeyi belirler: hangi {{hesap-tipi}}’ne kayıt yapılabileceğini ' +
      've hangi {{numara-araligi}}’ndan numara alacağını. Örneğin KR (satıcı faturası) türü ile müşteri hesabına kayıt yapılamaz.',

    numberRange:
      'FI’da numara aralığı **şirket kodu + mali yıl** bazlıdır. Her yıl için ayrı satır tanımlanmazsa yılbaşında ' +
      '"Document number ... not within range" hatası alınır — canlıya geçen her projede yılbaşında yaşanan klasik olaydır.',

    commit:
      'Kaydet tuşuna basıldığında SAP tüm veritabanı değişikliklerini tek bir LUW (mantıksal iş birimi) içinde toplar. ' +
      'Ya hepsi yazılır ya hiçbiri. Bu yüzden "belge numarası verildi ama satırlar eksik" durumu normal şartlarda oluşamaz; ' +
      'oluştuysa asenkron güncelleme takılmıştır ve {{SM13}} ile bakılır.',

    tur:
      '**Hesap planı ve hesap grubu = {{ozellestirme}}** (taşıma isteğine girer). ' +
      '**G/L hesabının kendisi = {{ana-veri}}** (taşıma isteğine girmez, her sistemde ayrı açılır veya yüklenir). ' +
      'Bu ayrımı karıştırmak, veri geçişi projelerinde en pahalı hatadır.',

    transport:
      'Hesap planı yapısı, belge türleri, numara aralığı tanımı ve alan durumu grupları taşınır. ' +
      'Hesapların kendisi, satıcı/müşteri kayıtları ve tüm belgeler taşınmaz.',

    img: [
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → Ana Veri → G/L Hesapları → Hazırlık → Hesap Planını Düzenle', not:'{{hesap-plani}} tanımı ({{OB13}})' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Belge Türleri', not:'{{belge-turu}} tanımı ({{OBA7}})' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Mali Yıl → Mali Yıl Varyantını Düzenle', not:'{{mali-yil-varyanti}} ({{OB29}})' },
    ],

    ekstra: [
      { ic:'🔢', baslik:'Neden hesap numaraları anlamlıdır?', metin:
        'Türkiye’de Tek Düzen Hesap Planı kullanılır ve ilk hane hesabın sınıfını verir: ' +
        '**1** dönen varlıklar, **2** duran varlıklar, **3** kısa vadeli borçlar, **4** uzun vadeli borçlar, ' +
        '**5** özkaynaklar, **6** gelir tablosu hesapları, **7** maliyet hesapları.\n\n' +
        'SAP bu numaralandırmayı zorunlu kılmaz ama {{hesap-grubu}} ve {{numara-araligi}} tanımlarıyla ' +
        'uygulatabilirsin: 6 ile başlayan hesapların yalnızca gelir-gider grubunda açılmasını sağlayabilirsin.' },
    ],

    notlar: [
      { tip:'warn', baslik:'Kayıt tarihi ile belge tarihini karıştırma', metin:
        'Belge tarihi (`BLDAT`) faturanın üstündeki tarihtir ve raporlamada referanstır. ' +
        'Kayıt tarihi (`BUDAT`) hangi muhasebe dönemine düşeceğini belirler. ' +
        '31 Aralık tarihli bir faturayı 5 Ocak’ta kaydederken kayıt tarihini 31.12 yapmazsan gider yanlış yıla düşer.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Muhasebenin kuralları S/4HANA ile değişmedi — değişen, bu kuralların **nerede saklandığıdır**. ' +
      'ECC’de aynı veri onlarca tabloya dağıtılıp sürekli mutabakat gerektirirken, S/4HANA’da tek tabloda toplanır.',

    eccFarklari: [
      { konu:'Verinin yeri', ecc:'{{BSEG}}, {{FAGLFLEXA}}, {{GLT0}}, COEP, {{ANEP}} — ayrı ayrı', s4:'{{ACDOCA}} — tek satırda hepsi' },
      { konu:'Toplamlar', ecc:'Ayrı toplam tablolarında ({{FAGLFLEXT}}) önceden hesaplanır', s4:'Kalem verisinden anlık hesaplanır; toplam tablosu yok' },
      { konu:'FI–CO mutabakatı', ecc:'Ayrı tablolar olduğu için periyodik mutabakat gerekir', s4:'Aynı satırda oldukları için yapısal olarak mutabık' },
      { konu:'Hesap ve masraf türü', ecc:'İki ayrı ana veri: G/L hesabı + {{masraf-turu}}', s4:'Tek ana veri: G/L hesabı, tipi "Primary Costs" seçilerek' },
    ],

    universalJournal:
      'Bu konu açısından en önemli sonuç şudur: eskiden "muhasebe kaydı FI’a, maliyet kaydı CO’ya gider" derdik. ' +
      'S/4HANA’da tek bir satır hem FI hem CO satırıdır. Bu farkı anlatabilmek, S/4HANA’yı gerçekten bilmenin en net göstergesidir.',

    performans:
      'Toplamlar önceden hesaplanmadığı için bakiye raporu artık milyonlarca kalemi anlık toplar. ' +
      'HANA’nın sütun tabanlı yapısı bunu saniyeler içinde yapar. Pratik sonuç: gerçek zamanlı bilanço mümkün hâle gelir.',

    bestPractices: [
      'Hesap planını olabildiğince sade tut; her ihtiyaç için yeni hesap açmak yerine {{maliyet-yeri}} ve {{kar-merkezi}} gibi CO nesnelerini kullan.',
      'Tek bir global hesap planı kullan, ülke özel ihtiyaçları alternatif hesap numarası ile çöz.',
      'Gelir-gider hesaplarını S/4HANA’da doğru tiple aç: yanlış tip seçilirse hesap CO’ya hiç akmaz ve sonradan düzeltmek zordur.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik: 'Bir ayın tamamı: kuruluştan mali tabloya',
    hikaye:
      '**Aroma Kahve A.Ş.** Mart 2026’da kuruldu. Ortaklar 200.000 TL sermaye koydu. Şirket bir kahve makinesi aldı, ' +
      'çekirdek satın aldı, satış yaptı ve ay sonunda tablolarını çıkardı. Aşağıda ayın tamamı adım adım muhasebeleştirilmiştir.',
    veriler: [
      { k:'Şirket', v:'Aroma Kahve A.Ş. — şirket kodu 1000' },
      { k:'Dönem', v:'Mart 2026 (dönem 03)' },
      { k:'Para birimi', v:'TRY' },
      { k:'KDV oranı', v:'%20' },
    ],

    adimlar: [
      { baslik:'Ortaklar sermayeyi bankaya yatırdı', tcode:'FB50',
        aciklama:'Şirketin ilk kaydı. Banka hesabında para var ve karşılığında ortaklara karşı bir yükümlülük (özkaynak) doğdu.',
        girdi:[
          { alan:'Belge tarihi / Kayıt tarihi', deger:'01.03.2026 / 01.03.2026' },
          { alan:'Belge türü', deger:'SA (genel muhasebe belgesi)' },
          { alan:'Satır 1', deger:'102 Bankalar — Borç 200.000' },
          { alan:'Satır 2', deger:'500 Sermaye — Alacak 200.000' },
        ],
        fis:{ baslik:'Belge 100000001 — Sermaye girişi', belgeTuru:'SA', tarih:'01.03.2026',
          satirlar:[
            { hesap:'102', ad:'Bankalar', borc:200000 },
            { hesap:'500', ad:'Sermaye', alacak:200000 },
          ], not:'Varlık arttı (borç), kaynak arttı (alacak). Denklem korundu: 200.000 = 200.000.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'1 başlık satırı: BELNR 100000001, BLART = SA, BUDAT = 01.03.2026' },
          { tablo:'BSEG', ne:'2 kalem: biri SHKZG = S (102 hesabı), biri SHKZG = H (500 hesabı)' },
          { tablo:'ACDOCA', ne:'Aynı 2 kalem, RLDNR = 0L (lider defter) ile' },
        ] },

      { baslik:'Kahve makinesi alındı (60.000 TL + KDV)', tcode:'ABZON',
        aciklama:'Makine 5 yıl kullanılacak, bu yüzden gider değil **varlık** olarak kaydedilir — buna {{aktiflestirme}} denir. ' +
                 'SAP’ta duran varlık kaydı önce {{AS01}} ile açılır, sonra edinim kaydedilir.',
        girdi:[
          { alan:'Varlık numarası', deger:'100001 (Varlık sınıfı: Makine ve tesisat)' },
          { alan:'Tutar', deger:'60.000 TL' },
          { alan:'Aktifleştirme tarihi', deger:'05.03.2026' },
          { alan:'Faydalı ömür', deger:'5 yıl' },
        ],
        fis:{ baslik:'Belge 100000002 — Makine alımı', belgeTuru:'AA', tarih:'05.03.2026',
          satirlar:[
            { hesap:'253', ad:'Tesis, makine ve cihazlar', borc:60000, not:'Duran varlık (aktifleştirildi)' },
            { hesap:'191', ad:'İndirilecek KDV', borc:12000 },
            { hesap:'102', ad:'Bankalar', alacak:72000 },
          ], not:'Dikkat: 60.000 TL **gider yazılmadı**. Makine 5 yıl fayda sağlayacağı için maliyeti 5 yıla yayılacak.' },
        tabloEtkisi:[
          { tablo:'ANLA', ne:'Varlık ana verisi oluştu: 100001' },
          { tablo:'ANEP', ne:'Edinim hareketi kaydedildi (hareket türü 100)' },
          { tablo:'ACDOCA', ne:'FI kalemleri + varlık numarası (ANLN1) aynı satırda' },
        ],
        not:'Aktifleştirme tarihi 05.03 olduğu için amortisman Mart ayından itibaren işlemeye başlar.' },

      { baslik:'Çekirdek satın alındı — vadeli (25.000 TL + KDV)', tcode:'FB60',
        aciklama:'Satıcıya borçlanıldı. Para henüz çıkmadı ama borç doğdu — {{tahakkuk-esasi}} gereği kayıt şimdi yapılır.',
        girdi:[
          { alan:'Satıcı', deger:'V-1001 Anadolu Kahve Ltd.' },
          { alan:'Fatura tarihi / Kayıt tarihi', deger:'10.03.2026 / 10.03.2026' },
          { alan:'Tutar / Vergi kodu', deger:'30.000 TL brüt / KDV %20' },
          { alan:'Ödeme koşulu', deger:'30 gün net → vade 09.04.2026' },
        ],
        fis:{ baslik:'Belge 190000001 — Satıcı faturası', belgeTuru:'KR', tarih:'10.03.2026',
          satirlar:[
            { hesap:'153', ad:'Ticari mallar', borc:25000 },
            { hesap:'191', ad:'İndirilecek KDV', borc:5000 },
            { hesap:'320', ad:'Satıcılar (V-1001)', alacak:30000, not:'{{mutabakat-hesabi}} üzerinden' },
          ], not:'320 satırı doğrudan girilmez; satıcı numarası girilir, SAP satıcının ana verisindeki mutabakat hesabını kendisi bulur.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'Yeni bir **açık kalem** oluştu — henüz ödenmedi' },
          { tablo:'BSEG', ne:'Satıcı satırında LIFNR = V-1001, AUGBL boş (açık)' },
        ] },

      { baslik:'Ay boyunca satış yapıldı (peşin, toplam 48.000 TL brüt)', tcode:'FB70',
        aciklama:'Satış geliri doğdu ve karşılığında kasaya para girdi.',
        fis:{ baslik:'Belge 180000001 — Satış', belgeTuru:'DR', tarih:'31.03.2026',
          satirlar:[
            { hesap:'100', ad:'Kasa', borc:48000 },
            { hesap:'600', ad:'Yurtiçi satışlar', alacak:40000 },
            { hesap:'391', ad:'Hesaplanan KDV', alacak:8000 },
          ], not:'Gelir 48.000 değil **40.000**’dir. 8.000 TL devlete ödenecek bir borçtur.' },
        tabloEtkisi:[
          { tablo:'BSET', ne:'Vergi satırı ayrıca kaydedildi: matrah 40.000, vergi 8.000' },
        ] },

      { baslik:'Satılan malın maliyeti kaydedildi', tcode:'FB50',
        aciklama:'Gelirle **aynı dönemde** onun maliyetini de yazmak gerekir. Buna dönemsellik/eşleştirme ilkesi denir.',
        fis:{ baslik:'Belge 100000003 — Satılan malın maliyeti', belgeTuru:'SA', tarih:'31.03.2026',
          satirlar:[
            { hesap:'621', ad:'Satılan ticari mal maliyeti', borc:18000 },
            { hesap:'153', ad:'Ticari mallar', alacak:18000 },
          ], not:'Stoktan 18.000 TL’lik mal çıktı ve gidere dönüştü. Stokta 25.000 − 18.000 = 7.000 TL kaldı.' } },

      { baslik:'Ay sonu amortisman çalıştırıldı', tcode:'AFAB',
        aciklama:'Makine 5 yıl (60 ay) kullanılacak. Aylık amortisman = 60.000 / 60 = 1.000 TL. ' +
                 'Bu kayıtta **para hareket etmez** ama gider doğar.',
        girdi:[
          { alan:'Şirket kodu / Mali yıl', deger:'1000 / 2026' },
          { alan:'Dönem', deger:'03' },
          { alan:'Çalıştırma tipi', deger:'Önce deneme (test), sonra gerçek' },
        ],
        fis:{ baslik:'Belge 100000004 — Mart amortismanı', belgeTuru:'AF', tarih:'31.03.2026',
          satirlar:[
            { hesap:'770', ad:'Genel yönetim gideri — amortisman', borc:1000 },
            { hesap:'257', ad:'Birikmiş amortisman', alacak:1000 },
          ], not:'253 hesabı 60.000 TL olarak durur; azalma 257 hesabında birikir. {{net-defter-degeri}} = 60.000 − 1.000 = 59.000 TL.' },
        tabloEtkisi:[
          { tablo:'ANLC', ne:'Varlığın dönem amortismanı ve birikmiş amortismanı güncellendi' },
          { tablo:'ACDOCA', ne:'Amortisman kalemi, varlık numarası ve maliyet yeriyle birlikte yazıldı' },
        ],
        not:'{{AFAB}} her zaman önce deneme modunda çalıştırılır. Gerçek modda çalıştıktan sonra ancak ters kayıtla düzeltilebilir.' },

      { baslik:'Dönem kapatıldı ve tablolar alındı', tcode:'F.01',
        aciklama:'Tüm kayıtlar tamamlandıktan sonra {{OB52}} ile Mart dönemi kapatılır ve mali tablolar üretilir.',
        girdi:[
          { alan:'Dönem kontrolü', deger:'{{OB52}} → dönem 03 kapatıldı, dönem 04 açıldı' },
          { alan:'Rapor', deger:'{{F.01}} → mali tablo yapısına göre bilanço + gelir tablosu' },
        ] },
    ],

    sonuc:
      '**Mart 2026 sonucu:**\n\n' +
      'Gelir 40.000 − Satılan malın maliyeti 18.000 − Amortisman 1.000 = **21.000 TL kâr**.\n\n' +
      'Kasadaki nakit değişimi ise bambaşkadır. 200.000 girdi, 72.000 makineye çıktı, 48.000 satıştan girdi, ' +
      'çekirdeğin 30.000 TL’si ise **henüz ödenmedi**. Yani banka + kasa = 176.000 TL, kâr ise 21.000 TL. ' +
      'İkisinin farklı olması bir hata değil, muhasebenin doğru çalıştığının kanıtıdır.\n\n' +
      'Bilanço kontrolü: Varlıklar (176.000 nakit + 7.000 stok + 59.000 net makine + 17.000 KDV alacağı) = ' +
      'Kaynaklar (30.000 satıcı borcu + 8.000 KDV borcu + 200.000 sermaye + 21.000 kâr). Her iki taraf da **259.000 TL**.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet: [
      'Muhasebe tek bir denklem üzerine kuruludur: **Varlıklar = Borçlar + Özkaynak**.',
      'Her işlem en az iki hesabı etkiler ve borç toplamı alacak toplamına eşit olmalıdır ({{cift-tarafli-kayit}}).',
      '**Varlık ve gider borçla artar; borç, özkaynak ve gelir alacakla artar.** Ezberlenecek tek kural budur.',
      '{{tahakkuk-esasi}}: gelir ve gider, para hareketinden bağımsız olarak doğduğu dönemde kaydedilir.',
      '{{bilanco}} bir andaki durumu gösterir ve devreder; {{gelir-tablosu}} bir dönemi gösterir ve yıl sonunda sıfırlanır.',
      'SAP muhasebeyi değiştirmez, uygular: {{BKPF}} yevmiye başlığı, {{BSEG}} satırları, {{ACDOCA}} S/4HANA’nın tek defteridir.',
      'Kâr ile nakit aynı şey değildir. Kârlı bir şirket nakit sıkıntısından batabilir.',
    ],

    onemliNoktalar: [
      '**"Borç ne demek?"** Sorunun cevabı "borçlanmak" değildir. Borç = hesabın **sol tarafı**. Anlamı hesabın tipine göre değişir.',
      '**Kayıt tarihi (`BUDAT`) ile belge tarihi (`BLDAT`) farkı.** Dönemi belirleyen kayıt tarihidir. Pratikte en sık karıştırılan ayrımdır.',
      '**Neden muhasebede kayıt silinmez?** İzlenebilirlik için. Yanlış kayıt {{ters-kayit}} ile düzeltilir ({{FB08}}).',
      '**Gelir ile tahsilat farkı.** Fatura kesildiğinde gelir doğar; para geldiğinde sadece bir varlık başka bir varlığa dönüşür.',
      '**Amortisman neden gider?** Varlığın faydası tükendiği için. Nakit çıkışı olmayan tek büyük gider kalemidir.',
      '**KDV neden gelir değildir?** Devlet adına tahsil edilir; şirketin kasasından geçer ama malı değildir.',
      '**FI ile CO farkı.** FI dışarıya yasal rapor üretir, CO içeriye yönetim raporu. S/4HANA’da ikisi aynı tabloda ({{ACDOCA}}) durur.',
    ],

    sikHatalar: [
      { hata:'"Borç" kelimesini "borçlanmak" ile karıştırmak.', dogru:'Borç, hesabın sol tarafıdır. Kasaya para girdiğinde de "borç" yazılır.' },
      { hata:'Kasadaki parayı kâr sanmak.', dogru:'Kâr = gelir − gider. Nakit ise tahsilat ve ödemelerin sonucu. İkisi bambaşka rakamlardır.' },
      { hata:'Duran varlık alımını gider yazmak.', dogru:'Varlık {{aktiflestirme}} ile bilançoya alınır, maliyeti {{amortisman}} yoluyla yıllara yayılır.' },
      { hata:'KDV dâhil tutarı gelir/gider yazmak.', dogru:'KDV ayrı bir hesapta izlenir; gelir ve gider **KDV hariç** tutardır.' },
      { hata:'Faturayı ödeme yapılınca kaydetmek.', dogru:'Fatura geldiğinde borç doğar ve o an kaydedilir. Ödeme ayrı bir işlemdir.' },
      { hata:'Yanlış kaydı silmeye çalışmak.', dogru:'Muhasebeleşmiş belge silinmez. {{FB08}} ile {{ters-kayit}} yapılır.' },
      { hata:'31 Aralık faturasını Ocak dönemine kaydetmek.', dogru:'Kayıt tarihini 31.12 yaparak doğru döneme düşür; dönem kapalıysa {{OB52}} ile geçici açtır.' },
    ],

    ipuclari: [
      'Bir kaydı yaparken önce **"ne arttı, ne azaldı?"** diye sor. Sonra hesabın tipine bakıp borç/alacak yönünü bul. Bu sıra hiç şaşmaz.',
      'Emin olamadığında {{FB50}} ekranında **Simüle et** düğmesini kullan: SAP’ın senin yerine ekleyeceği satırları kaydetmeden görürsün.',
      'Her yeni öğrendiğin SAP işlemi için "bu hangi muhasebe kaydını üretiyor?" sorusunu cevapla. Kaydı bilmiyorsan işlemi de bilmiyorsundur.',
      'Türkiye’de hesap numarasının ilk hanesi sınıfını verir (1 dönen varlık, 3 kısa vadeli borç, 6 gelir tablosu). Bu, hesabı görünce tipini anlamanı sağlar.',
      'Bilanço tutmuyorsa panik yapma: SAP zaten dengesiz belge kabul etmez. Sorun neredeyse her zaman {{mali-tablo-yapisi}}’nda atanmamış bir hesaptır.',
    ],

    quiz: [
      { soru:'Şirket 50.000 TL’lik makineyi banka havalesiyle peşin aldı. Doğru kayıt hangisidir?',
        secenekler:[
          'Makine hesabı borç 50.000 / Banka hesabı alacak 50.000',
          'Banka hesabı borç 50.000 / Makine hesabı alacak 50.000',
          'Makine gideri borç 50.000 / Banka hesabı alacak 50.000',
          'Makine hesabı borç 50.000 / Sermaye alacak 50.000',
        ], dogru:0,
        aciklama:'Makine bir varlıktır ve arttığı için **borç** yazılır. Banka da bir varlıktır ama azaldığı için **alacak** yazılır. Makine gider değildir; maliyeti {{amortisman}} yoluyla yıllara yayılır.' },

      { soru:'Aşağıdakilerden hangisi nakit çıkışı yaratmayan bir giderdir?',
        secenekler:['Kira gideri', 'Personel maaşı', 'Amortisman gideri', 'Elektrik faturası'],
        dogru:2,
        aciklama:'{{amortisman}}, daha önce ödenmiş bir varlığın yıpranmasını dönemlere dağıtır. Kayıt yapıldığı ay kasadan hiç para çıkmaz. Bu yüzden nakit akış tablosunda kâra geri eklenir.' },

      { soru:'Bir müşteriye 100.000 TL’lik vadeli satış yapıldı. Satış anında kasadaki para değişmedi. Bu durumda ne olur?',
        secenekler:[
          'Hiçbir kayıt yapılmaz, para gelince kaydedilir',
          'Gelir doğar ve müşteriden alacak kaydedilir',
          'Sadece stok azalır, gelir kaydedilmez',
          'Gelir doğar ama alacak kaydedilmez',
        ], dogru:1,
        aciklama:'{{tahakkuk-esasi}} gereği gelir, para geldiğinde değil **doğduğunda** kaydedilir. Karşılığında bir varlık olarak "müşteriden alacak" oluşur. Bu kalem SAP’ta {{BSID}} tablosunda {{acik-kalem}} olarak durur.' },

      { soru:'SAP’ta bir belgenin kaydedilebilmesi için mutlaka sağlanması gereken koşul nedir?',
        secenekler:[
          'En az üç satır olması',
          'Borç ve alacak toplamlarının eşit olması',
          'Vergi kodu girilmiş olması',
          'Maliyet yeri girilmiş olması',
        ], dogru:1,
        aciklama:'{{belge-denkligi}} zorunludur. Denk olmayan belge yalnızca {{park-etme}} ile saklanabilir, muhasebeleşemez. Diğer seçenekler duruma göre gerekebilir ama evrensel koşul değildir.' },

      { soru:'Yanlış kaydedilmiş bir FI belgesi nasıl düzeltilir?',
        secenekler:[
          '{{FB02}} ile tutarı değiştirilir',
          'Veritabanından silinir',
          '{{FB08}} ile ters kaydedilir, sonra doğrusu girilir',
          'Dönem kapatılıp yeniden açılır',
        ], dogru:2,
        aciklama:'Muhasebeleşmiş belgede tutar ve hesap **değiştirilemez**; {{FB02}} yalnızca vade, metin gibi alanları günceller. Doğru yöntem {{ters-kayit}}’tır ({{FB08}}) — iz kaybolmaz, denetimde her iki belge de görünür.' },

      { soru:'Gelir tablosu hesaplarının yıl sonundaki durumu nedir?',
        secenekler:[
          'Bakiyeleri yeni yıla aynen devreder',
          'Sıfırlanır ve sonuç özkaynağa aktarılır',
          'Silinir',
          'Bilanço hesabına dönüşür',
        ], dogru:1,
        aciklama:'{{gelir-tablosu}} hesapları bir **dönemi** ölçer, o yüzden her yıl sıfırdan başlar. Net sonuç özkaynak altındaki kâr/zarar hesabına gider. SAP’ta bunu {{bakiye-devri}} ({{FAGLGVTR}}) yapar. {{bilanco}} hesapları ise devreder.' },
    ],

    flashcards: [
      { on:'Muhasebenin temel denklemi nedir?', arka:'**Varlıklar = Borçlar + Özkaynak**\n\nSol taraf "neyim var", sağ taraf "bunu nereden buldum". Her işlemde bu denklem korunur.' },
      { on:'Hangi hesap tipleri borçla artar?', arka:'**Varlık** ve **Gider**.\n\nDiğer üçü (Borç, Özkaynak, Gelir) alacakla artar. Tek ezber bu.' },
      { on:'BSEG tablosunda SHKZG alanındaki S ve H ne demek?', arka:'**S** = Soll = Borç\n**H** = Haben = Alacak\n\nSAP Almanya’da doğduğu için kısaltmalar Almancadır ve her dilde aynıdır.' },
      { on:'Kayıt tarihi (BUDAT) ile belge tarihi (BLDAT) farkı nedir?', arka:'**BLDAT** = faturanın üstündeki tarih.\n**BUDAT** = kaydın hangi muhasebe dönemine düşeceğini belirleyen tarih.\n\nDönemi belirleyen her zaman BUDAT’tır.' },
      { on:'Tahakkuk esası nedir?', arka:'Gelir ve giderin **para hareketinden bağımsız olarak** doğduğu dönemde kaydedilmesi.\n\nAralık’ta kullanılan elektrik, faturası Ocak’ta gelse bile Aralık gideridir.' },
      { on:'Neden kâr ile nakit farklıdır?', arka:'Kâr = gelir − gider (tahakkuk ettiği dönemde).\nNakit = fiilî tahsilat − fiilî ödeme.\n\nVadeli satış kârı artırır ama nakdi artırmaz. Amortisman kârı düşürür ama nakdi azaltmaz.' },
      { on:'Mutabakat hesabı (reconciliation account) ne işe yarar?', arka:'Muavin defterdeki (satıcı/müşteri/varlık) hareketlerin ana muhasebeye otomatik yansıdığı G/L hesabıdır.\n\nBu hesaba **doğrudan kayıt yapılamaz** — yalnızca muavin defter üzerinden yazılır.' },
      { on:'Muhasebeleşmiş bir belge nasıl düzeltilir?', arka:'Silinmez. **FB08** ile ters kayıt (reversal) yapılır, sonra doğrusu girilir.\n\nHer iki belge de kayıtlarda kalır — denetlenebilirlik esastır.' },
      { on:'KDV neden gelir değildir?', arka:'Devlet adına tahsil edilir. Şirketin kasasından geçer ama malı değildir.\n\nHesaplanan KDV bir **borç**, indirilecek KDV bir **alacak**tır.' },
      { on:'S/4HANA’da muhasebe verisi nerede tutulur?', arka:'**ACDOCA** — Evrensel Kayıt Defteri.\n\nFI, CO, duran varlık ve malzeme defteri tek satırda birleşir. Ayrı toplam tabloları ve FI–CO mutabakatı ortadan kalkar.' },
    ],
  },

  },
});
