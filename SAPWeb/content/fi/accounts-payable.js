/* ==========================================================================
   content/fi/accounts-payable.js — "Accounts Payable (Satıcılar)" derin içeriği
   ========================================================================== */

SAP.registerTopic({
  id: 'accounts-payable',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Accounts Payable (FI-AP), şirketin **satıcılara olan borçlarını** yöneten FI alt bileşenidir. ' +
      'Faturanın gelmesinden ödemenin yapılmasına, oradan borcun kapanmasına kadar tüm zinciri kapsar.\n\n' +
      'AP bir {{muavin-defter}}dir: her satıcının ayrıntısı burada tutulur, ana muhasebeye ise ' +
      '{{mutabakat-hesabi}} üzerinden tek satır olarak yansır. Bilançoda "320 Satıcılar 4.500.000 TL" ' +
      'yazar; arkasındaki 800 satıcının kim olduğu AP’dedir.',

    neden:
      '**Ne kadar borçluyuz sorusuna cevap vermek için.** Şirketin nakit planlaması bu rakama dayanır.\n\n' +
      '**Ödemeyi zamanında ve doğru yapmak için.** Erken ödersen nakit sıkışırsın, geç ödersen ' +
      'itibar ve {{iskonto}} kaybedersin. AP bu dengeyi vade takibiyle kurar.\n\n' +
      '**Kontrolü sağlamak için.** Şirketten para çıkışının neredeyse tamamı AP üzerinden olur. ' +
      'Bu yüzden AP, iç kontrolün ve suistimal riskinin en yoğun olduğu alandır.',

    sirketOnemi:
      'AP, **Procure-to-Pay (P2P — satın almadan ödemeye)** sürecinin muhasebe ayağıdır ve MM ile ' +
      'iç içe çalışır. Satın alma siparişi açar, depo malı kabul eder, AP faturayı işler ve öder.\n\n' +
      'Danışmanlık açısından kritik nokta: **AP faturalarının çoğu FI’da elle girilmez, MM’den gelir.** ' +
      'Bir AP danışmanı {{MIRO}}’yu, {{uc-yonlu-eslestirme}}yi ve {{OBYC}} hesap belirlemesini bilmek zorundadır. ' +
      'Mülakatta "FB60 ile MIRO farkı nedir?" sorusu tam olarak bunu ölçer.',

    gercekHayat:
      'Bir üretim şirketi ayda 1.200 satıcı faturası alıyor. Bunların 900’ü siparişe bağlı ' +
      '(hammadde, ambalaj) ve {{MIRO}} ile giriliyor; 300’ü siparişsiz hizmet faturası ' +
      '(kira, danışmanlık, elektrik) ve {{FB60}} ile giriliyor.\n\n' +
      'Ay sonunda muhasebe müdürü {{F110}} çalıştırıyor: sistem vadesi gelen 340 faturayı seçiyor, ' +
      'aynı satıcıya ait olanları birleştiriyor, 47 ödeme üretiyor ve bankaya tek dosya gönderiyor. ' +
      'Elle yapılsaydı bu iş günlerce sürerdi ve hata kaçınılmaz olurdu.',

    muhasebeMantigi:
      'AP’de muhasebe **üç aşamalıdır** ve her aşama ayrı bir kayıt üretir:\n\n' +
      '**1. Borcun doğması (fatura).** Gider veya varlık borçlanır, satıcı alacaklanır. ' +
      'Bu anda kasadan para çıkmaz — {{tahakkuk-esasi}}nın klasik uygulaması.\n\n' +
      '**2. Ödemenin yapılması.** Satıcı borçlanır (borç azalır), banka alacaklanır (para çıkar).\n\n' +
      '**3. Kapatma ({{kapatma}}).** Fatura ile ödeme eşleştirilir ve kalem "kapalı" hale gelir. ' +
      'Genellikle 2. ve 3. adım aynı işlemde ({{F-53}} veya {{F110}}) birlikte olur.\n\n' +
      'Satıcı satırı hiçbir zaman doğrudan G/L hesabına yazılmaz; **satıcı numarası** girilir ve ' +
      'SAP {{LFB1}}’deki `AKONT` alanından mutabakat hesabını kendisi bulur.',

    kavramlar: ['mutabakat-hesabi', 'acik-kalem', 'kapatma', 'odeme-kosulu', 'vade', 'iskonto',
                'odeme-yontemi', 'odeme-blogu', 'gr-ir', 'uc-yonlu-eslestirme', 'yaslandirma', 'avans'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'AP süreci **Procure-to-Pay** zincirinin ikinci yarısıdır. Zincir satın alma talebiyle başlar, ' +
      'ödemeyle biter. AP’nin devreye girdiği nokta faturanın gelmesidir — ama faturanın nasıl ' +
      'işleneceği, **siparişe bağlı olup olmadığına** göre baştan ayrışır.',

    roller:[
      { rol:'Talep eden birim', gorev:'Satın alma talebi açar (ihtiyacı bildirir).' },
      { rol:'Satın alma', gorev:'Satıcı seçer, fiyat pazarlığı yapar, siparişi açar ({{ME21N}}).' },
      { rol:'Depo / Mal kabul', gorev:'Malı teslim alır ve sisteme kaydeder ({{MIGO}}). Bu kayıt FI’da stok ve {{gr-ir}} kaydını doğurur.' },
      { rol:'AP muhasebe uzmanı', gorev:'Faturayı işler ({{MIRO}} veya {{FB60}}), farkları araştırır, blokları yönetir.' },
      { rol:'Muhasebe müdürü', gorev:'Ödeme önerisini onaylar, blokları kaldırır, yüksek tutarlı ödemeleri denetler.' },
      { rol:'Hazine / Finans', gorev:'{{F110}} çalıştırır, banka dosyasını gönderir, nakit planlaması yapar.' },
      { rol:'FI danışmanı', gorev:'{{FBZP}} ödeme yapılandırması, {{OBYC}} hesap belirleme, tolerans ve blok kurallarını tasarlar.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Procure-to-Pay — satın almadan ödemeye',
      adimlar:[
        { ic:'📝', rol:'Talep eden birim', baslik:'Satın alma talebi açılır',
          aciklama:'İhtiyaç bildirilir. Henüz muhasebe kaydı yoktur — talep bir taahhüt bile değildir.',
          cikti:'Satın alma talebi', ok:'onaydan geçer' },
        { ic:'🛒', rol:'Satın alma', baslik:'Satınalma siparişi açılır ({{ME21N}})',
          aciklama:'Satıcı, miktar, fiyat ve teslim tarihi belirlenir. **FI kaydı hâlâ yok** — sipariş bir taahhüttür, borç değildir.',
          cikti:'{{EKKO}} / {{EKPO}} kayıtları', ok:'mal gelir' },
        { ic:'📦', rol:'Depo', baslik:'Mal girişi yapılır ({{MIGO}})',
          aciklama:'**İlk FI kaydı burada doğar:** stok borçlanır, {{gr-ir}} alacaklanır. Satıcıya borç henüz yazılmaz çünkü fatura gelmedi.',
          cikti:'Malzeme belgesi + FI belgesi', ok:'fatura gelir' },
        { ic:'🧾', rol:'AP muhasebe', baslik:'Fatura işlenir ({{MIRO}} veya {{FB60}})',
          aciklama:'Siparişe bağlıysa {{MIRO}} ile {{uc-yonlu-eslestirme}} yapılır. Siparişsizse doğrudan {{FB60}}. ' +
                   '{{gr-ir}} kapanır, satıcıya borç yazılır.',
          cikti:'Satıcı açık kalemi ({{BSIK}})', ok:'fark varsa bloke' },
        { ic:'🚦', rol:'AP muhasebe', baslik:'Fark kontrolü ve blok yönetimi',
          aciklama:'Fiyat veya miktar farkı tolerans dışındaysa fatura ödemeye bloklanır. Araştırılır ve {{MRBR}} ile serbest bırakılır.',
          cikti:'Ödenebilir açık kalem', ok:'vade gelir' },
        { ic:'⚡', rol:'Hazine', baslik:'Ödeme çalıştırılır ({{F110}})',
          aciklama:'Vadesi gelen kalemler seçilir, öneri üretilir, onaydan sonra ödeme kaydedilir ve banka dosyası oluşturulur.',
          cikti:'Ödeme belgesi + {{REGUH}}/{{REGUP}}', ok:'kalem kapanır' },
        { ic:'🔗', rol:'Sistem', baslik:'Açık kalem kapanır',
          aciklama:'Fatura ile ödeme eşleşir; kalem {{BSIK}}’ten {{BSAK}}’a taşınır ve `AUGBL` alanına kapatma belgesi yazılır.',
          cikti:'Kapatılmış kalem', ok:'banka ekstresi gelir' },
        { ic:'🏦', rol:'Hazine', baslik:'Banka ekstresi işlenir',
          aciklama:'{{banka-ara-hesabi}} kapatılır, gerçek banka hesabı çalışır. Nakit çıkışı ancak burada kesinleşir.',
          cikti:'Mutabık banka hesabı' },
      ],
    },

    adimlar:[
      { rol:'Satın alma', eylem:'Sipariş açar', sistem:'{{ME21N}} → {{EKKO}}/{{EKPO}} — FI kaydı yok' },
      { rol:'Depo', eylem:'Mal kabul eder', sistem:'{{MIGO}} → stok borç / {{gr-ir}} alacak' },
      { rol:'AP muhasebe', eylem:'Siparişli faturayı işler', sistem:'{{MIRO}} → {{gr-ir}} borç / satıcı alacak' },
      { rol:'AP muhasebe', eylem:'Siparişsiz faturayı işler', sistem:'{{FB60}} → gider borç / satıcı alacak' },
      { rol:'AP muhasebe', eylem:'Bloklu faturaları çözer', sistem:'{{MRBR}}, {{FB09}}' },
      { rol:'Hazine', eylem:'Toplu ödeme yapar', sistem:'{{F110}} → {{REGUH}}/{{REGUP}}' },
      { rol:'AP muhasebe', eylem:'Tek seferlik ödeme yapar', sistem:'{{F-53}} veya {{F-58}}' },
      { rol:'AP muhasebe', eylem:'Eşleşmeyen kalemleri kapatır', sistem:'{{F-44}}' },
      { rol:'AP muhasebe', eylem:'Yaşlandırma raporu alır', sistem:'{{FBL1N}}, {{S_ALR_87012078}}' },
    ],

    veriAkisi:{
      nereden:'MM’den satınalma siparişi ve mal girişi; satıcıdan gelen kâğıt/e-fatura; {{BP}} ana verisinden ödeme koşulu ve mutabakat hesabı.',
      nereye:'{{BSIK}} açık kalemlerine → {{F110}} ödeme havuzuna → banka dosyasına; ana muhasebede {{mutabakat-hesabi}}’na ve bilançoya.',
      tetikleyen:'Satıcı faturasının gelmesi. Siparişe bağlıysa mal girişi zaten bir FI kaydı üretmiş olur.',
      sonraki:'Ödeme, banka ekstresi mutabakatı, dönem sonunda {{gr-ir}} analizi ({{F.19}}) ve yaşlandırma.',
    },

    notlar:[
      { tip:'tip', baslik:'Sipariş neden FI kaydı üretmez?', metin:
        'Satınalma siparişi bir **taahhüttür**, yükümlülük değil. Muhasebede borç, mal veya hizmet ' +
        'teslim alındığında doğar. Bu yüzden sipariş yalnızca MM tablolarına ({{EKKO}}/{{EKPO}}) yazılır. ' +
        'CO tarafında bütçe taahhüdü (commitment) olarak görünebilir ama FI’a düşmez.' },
      { tip:'warn', baslik:'İki farklı fatura yolu, iki farklı sorun kaynağı', metin:
        '{{FB60}} hatalarının kaynağı genelde **FI ayarlarıdır** (dönem, alan durumu, vergi kodu). ' +
        '{{MIRO}} hatalarının kaynağı genelde **MM ayarlarıdır** ({{OBYC}}, tolerans, sipariş verisi). ' +
        'Hatayı çözmeye başlamadan önce hangi yoldan geldiğini belirle — yanlış yerde arayarak saatler kaybedilir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'AP’nin muhasebe zinciri, aynı ekonomik olayın üç ayrı anda kaydedilmesidir: ' +
      '**mal geldi → fatura geldi → ödeme yapıldı**. Her adım bir öncekini kapatır. ' +
      'Aşağıda siparişli bir alımın tam zinciri, sonra siparişsiz alımın kısa yolu var.',

    etkilenenHesaplar:[
      { hesap:'320 Satıcılar (mutabakat)', tur:'Bilanço — Kaynak', neden:'Satıcıya olan borç. Fatura ile **alacaklanır** (artar), ödeme ile **borçlanır** (azalır). Doğrudan kayıt yapılamaz.' },
      { hesap:'159 GR/IR hesabı', tur:'Bilanço — Geçiş', neden:'Mal girişi ile fatura girişi arasındaki zaman farkını taşır. {{acik-kalem-yonetimi}} **açık olmalıdır**.' },
      { hesap:'153 Ticari mallar / 7xx Giderler', tur:'Bilanço / Gelir tablosu', neden:'Alınan şeyin niteliğine göre: stoklanacaksa varlık, tüketilecekse gider.' },
      { hesap:'191 İndirilecek KDV', tur:'Bilanço — Varlık', neden:'Devletten alacak doğar. {{vergi-kodu}} girildiğinde satır otomatik oluşur ve {{BSET}}’e yazılır.' },
      { hesap:'102 Bankalar / banka ara hesabı', tur:'Bilanço — Varlık', neden:'Ödemede azalır. Ödeme kaydı ile fiilî çıkış arasında {{banka-ara-hesabi}} kullanılır.' },
      { hesap:'159 Verilen avanslar (özel G/L)', tur:'Bilanço — Varlık', neden:'{{avans}} ödendiğinde normal mutabakat hesabı yerine burası çalışır ({{ozel-ana-muhasebe-gostergesi}}).' },
      { hesap:'602 / 653 Kur farkı', tur:'Gelir tablosu', neden:'Döviz faturası ödeme anında farklı kurdaysa gerçekleşmiş {{kur-farki}} doğar.' },
    ],

    fisler:[
      { baslik:'Adım 1 — Mal girişi ({{MIGO}}) · 100.000 TL’lik hammadde',
        belgeTuru:'WE', tarih:'05.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'153', ad:'Ticari mallar (stok)', borc:100000, not:'{{OBYC}} işlem anahtarı **BSX**' },
          { hesap:'159', ad:'GR/IR hesabı', alacak:100000, not:'{{OBYC}} işlem anahtarı **WRX**' },
        ],
        not:'Satıcıya borç **yok** — fatura gelmedi. {{gr-ir}} bu boşluğu taşıyor. Muhasebeci bu kaydı görmez; depo elemanı üretir.' },

      { baslik:'Adım 2 — Fatura girişi ({{MIRO}}) · sipariş fiyatıyla uyumlu',
        belgeTuru:'RE', tarih:'12.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR hesabı', borc:100000, not:'Mal girişindeki alacak kapanıyor' },
          { hesap:'191', ad:'İndirilecek KDV', borc:20000 },
          { hesap:'320', ad:'Satıcılar — V-4001', alacak:120000, not:'Borç artık satıcıda' },
        ],
        not:'{{gr-ir}} sıfırlandı: mal da geldi, fatura da geldi. Bu iki kalem {{acik-kalem-yonetimi}} sayesinde ' +
             'birbirini kapatabilir hale geldi ve {{F.13}} ile otomatik eşleşir.' },

      { baslik:'Adım 3 — Ödeme ({{F110}}) · vade geldi, iskonto süresi geçti',
        belgeTuru:'KZ', tarih:'12.10.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-4001', borc:120000, not:'Açık kalem kapanıyor' },
          { hesap:'102', ad:'Bankalar (ara hesap)', alacak:120000 },
        ],
        not:'Ödeme ve kapatma **tek işlemde** olur. Kalem {{BSIK}}’ten çıkıp {{BSAK}}’a geçer, `AUGBL` alanına bu belgenin numarası yazılır.' },

      { baslik:'Alternatif — erken ödeme yapılsaydı (%2 iskonto)',
        belgeTuru:'KZ', tarih:'22.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-4001', borc:120000, not:'Borcun tamamı kapanır' },
          { hesap:'102', ad:'Bankalar', alacak:117600, not:'Ödenen tutar' },
          { hesap:'602', ad:'Alınan iskontolar (gelir)', alacak:2000, not:'%2 × 100.000 (net üzerinden)' },
          { hesap:'191', ad:'İndirilecek KDV düzeltmesi', alacak:400, not:'İskonto kadar KDV de düzeltilir' },
        ],
        not:'Borcun tamamı (120.000) kapanır ama 117.600 TL ödenir. Aradaki fark **gelir**dir. ' +
             'SAP {{iskonto}} süresini {{odeme-kosulu}}’ndan bilir ve {{F110}} en kârlı ödeme gününü kendisi seçer.' },

      { baslik:'Siparişsiz fatura — kısa yol ({{FB60}}) · 60.000 TL danışmanlık',
        belgeTuru:'KR', tarih:'15.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:50000, not:'Maliyet yeri zorunlu' },
          { hesap:'191', ad:'İndirilecek KDV', borc:10000 },
          { hesap:'320', ad:'Satıcılar — V-2001', alacak:60000 },
        ],
        not:'Sipariş ve mal girişi olmadığı için {{gr-ir}} devreye girmez. Tek kayıtla borç doğar. ' +
             'Hizmet alımlarının standart yoludur.' },

      { baslik:'Avans ödemesi ({{F-48}}) · özel ana muhasebe göstergesi A',
        belgeTuru:'KZ', tarih:'01.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'Verilen sipariş avansları', borc:30000, not:'`UMSKZ` = A → alternatif hesap' },
          { hesap:'102', ad:'Bankalar', alacak:30000 },
        ],
        not:'Satıcı aynı, mutabakat hesabı 320 — ama {{ozel-ana-muhasebe-gostergesi}} "A" girildiği için kayıt 320’ye gitmedi. ' +
             '{{avans}} bir borç değil **alacaktır**; bilançoda ayrı gösterilmesi gerekir. ' +
             'Fatura gelince {{F-54}} ile mahsup edilir.' },
    ],

    tHesaplar:[
      { hesap:'Satıcılar (mutabakat)', kod:'320',
        borc:[{ ad:'F110 ödemesi', tutar:120000 }, { ad:'Avans mahsubu', tutar:30000 }],
        alacak:[{ ad:'MIRO faturası', tutar:120000 }, { ad:'FB60 faturası', tutar:60000 }],
        not:'Alacak bakiyesi = ödenmemiş borç' },
      { hesap:'GR/IR hesabı', kod:'159 (geçiş)',
        borc:[{ ad:'Fatura girişi (MIRO)', tutar:100000 }],
        alacak:[{ ad:'Mal girişi (MIGO)', tutar:100000 }],
        not:'Dönem sonunda sıfır olmalı' },
      { hesap:'Verilen avanslar', kod:'159 (özel G/L)',
        borc:[{ ad:'Avans ödemesi (F-48)', tutar:30000 }],
        alacak:[{ ad:'Fatura ile mahsup (F-54)', tutar:30000 }],
        not:'Mahsup sonrası kapanır' },
      { hesap:'Bankalar', kod:'102',
        borc:[],
        alacak:[{ ad:'Satıcı ödemeleri', tutar:120000 }, { ad:'Avans', tutar:30000 }],
        not:'Nakit çıkışı' },
    ],

    notlar:[
      { tip:'warn', baslik:'İskonto neden net tutar üzerinden hesaplanır?', metin:
        'İskonto malın bedeli üzerinden verilir, KDV üzerinden değil. Bu yüzden 120.000 TL’lik faturada ' +
        '%2 iskonto = 100.000 × %2 = **2.000 TL**’dir, 2.400 TL değil. Ayrıca iskonto kadar ' +
        'indirilecek KDV de düzeltilir. SAP bunu {{odeme-kosulu}} ayarındaki "iskonto matrahı" seçimine göre yapar.' },
      { tip:'tip', baslik:'İskonto gelir mi, maliyet düşüşü mü?', metin:
        'İki yöntem vardır. **Brüt yöntem** (yaygın): fatura tam tutarla kaydedilir, iskonto ödeme anında ' +
        'gelir yazılır. **Net yöntem**: fatura baştan iskontolu kaydedilir, iskonto kaçırılırsa gider yazılır. ' +
        'Türkiye’de brüt yöntem kullanılır; SAP her ikisini de destekler ({{odeme-kosulu}} ayarında belirlenir).' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'AP’de dört ayrı eksende çeşitlenme vardır: faturanın **geliş yolu**, ödemenin **yapılış biçimi**, ' +
      'kapatmanın **türü** ve işlemin **özel ana muhasebe** kategorisi. Mülakatta bu ayrımlar sıkça sorulur.',

    liste:[
      { ad:'FI faturası (siparişsiz)', en:'Non-PO Invoice — FB60',
        aciklama:'Satınalma siparişi ve mal girişi olmadan doğrudan FI’a girilen fatura. Gider hesabı ve maliyet yeri elle seçilir.',
        neZaman:'Hizmet alımlarında: kira, danışmanlık, elektrik, sigorta, avukatlık. Stoklanmayan ve siparişle takip edilmeyen harcamalarda.',
        ornek:'50.000 TL danışmanlık faturası → 770 gider borç / 320 satıcı alacak.',
        tcodes:['FB60','FB65','F-43'] },

      { ad:'MM faturası (siparişli)', en:'PO-based Invoice — MIRO',
        aciklama:'Satınalma siparişine ve mal girişine dayanan fatura. {{uc-yonlu-eslestirme}} yapılır: sipariş ↔ mal girişi ↔ fatura. ' +
                 'Hesabı kullanıcı seçmez, {{OBYC}} belirler.',
        neZaman:'Stoklanan mal ve siparişle takip edilen her alımda. Kurumsal şirketlerde faturaların çoğunluğu bu yoldan gelir.',
        ornek:'100.000 TL hammadde → GR/IR borç / 320 satıcı alacak. Fiyat farkı varsa fatura bloklanır.',
        tcodes:['MIRO','MIGO','MRBR','ME23N'] },

      { ad:'Alacak dekontu', en:'Credit Memo',
        aciklama:'Satıcıdan gelen iade veya iskonto belgesi. Faturanın **tersidir**: satıcı borçlanır, gider/stok alacaklanır.',
        neZaman:'Mal iadesi, fiyat düzeltmesi, sonradan verilen iskontoda.',
        ornek:'Bozuk mal iade edildi → 320 satıcı borç 24.000 / 153 stok alacak 20.000 / 191 KDV alacak 4.000.',
        tcodes:['FB65','MIRO'] },

      { ad:'Manuel ödeme', en:'Manual Payment — F-53 / F-58',
        aciklama:'Tek bir ödemeyi elle kaydeder ve açık kalemi kapatır. {{F-58}} ayrıca çek/form da bastırır.',
        neZaman:'Acil tek seferlik ödemelerde, {{F110}} kapsamı dışındaki istisnalarda, küçük şirketlerde.',
        ornek:'Bir satıcıya elden yapılan acil ödeme.',
        tcodes:['F-53','F-58'] },

      { ad:'Otomatik ödeme', en:'Automatic Payment Program — F110',
        aciklama:'Vadesi gelen tüm kalemleri toplu seçer, öneri üretir, onaydan sonra öder ve banka dosyası oluşturur. ' +
                 'Aynı satıcıya ait kalemleri tek ödemede birleştirir.',
        neZaman:'Rutin ödeme döngülerinde — kurumsal şirketlerin standart yöntemi.',
        ornek:'Ayda iki kez çalıştırılan ödeme koşusu: 340 fatura → 47 ödeme → 1 banka dosyası.',
        tcodes:['F110','FBZP','FBPM','F110S'] },

      { ad:'Avans (verilen)', en:'Down Payment — F-47 / F-48 / F-54',
        aciklama:'Mal/hizmet teslim edilmeden yapılan ödeme. {{ozel-ana-muhasebe-gostergesi}} ile normal borçtan ayrılır. ' +
                 'Üç adımlıdır: talep ({{F-47}}) → ödeme ({{F-48}}) → mahsup ({{F-54}}).',
        neZaman:'Sipariş peşinatı, yurtdışı alımda akreditif öncesi ödeme, proje avanslarında.',
        ornek:'30.000 TL avans → 159 verilen avanslar borç / 102 banka alacak. Bilançoda **varlık** olarak durur.',
        tcodes:['F-47','F-48','F-54','OBYR'] },

      { ad:'Kısmi kapatma', en:'Partial Clearing',
        aciklama:'Borcun bir kısmı ödenir; **orijinal kalem açık kalır**, ödeme ayrı bir açık kalem olarak durur.',
        neZaman:'Uyuşmazlıklı faturada tartışmasız kısmı öderken. Orijinal vade korunduğu için yaşlandırma bozulmaz.',
        ornek:'120.000 TL borcun 80.000 TL’si ödendi → iki açık kalem: +120.000 ve −80.000.',
        tcodes:['F-53','FB05'] },

      { ad:'Kalan kapatma', en:'Residual Clearing',
        aciklama:'Orijinal kalem **kapatılır**, kalan tutar için yeni bir açık kalem üretilir.',
        neZaman:'Farkın kalıcı olduğu, yeni bir vadeye bağlandığı durumlarda.',
        ornek:'120.000 TL kapatıldı, 40.000 TL’lik yeni kalem oluştu — **vadesi bugünden başlar**.',
        tcodes:['F-53','FB05'] },
    ],

    karsilastirmaBasliklar:['FB60 (FI faturası)', 'MIRO (MM faturası)'],
    karsilastirma:[
      ['Sipariş gerekir mi', 'Hayır', 'Evet — siparişe referansla girilir'],
      ['Mal girişi gerekir mi', 'Hayır', 'Genelde evet ({{uc-yonlu-eslestirme}})'],
      ['Hesabı kim belirler', 'Kullanıcı elle seçer', '{{OBYC}} otomatik belirler'],
      ['GR/IR devreye girer mi', 'Hayır', 'Evet — mal girişindeki kalem kapanır'],
      ['Belge türü', 'KR', 'RE'],
      ['Ek tablolar', 'Yok', '{{RBKP}} / {{RSEG}} / {{EKBE}}'],
      ['Fark kontrolü', 'Yok', 'Tolerans dışı fark → **ödeme bloğu**'],
      ['Tipik kullanım', 'Kira, danışmanlık, elektrik', 'Hammadde, ticari mal, ambalaj'],
      ['Hata kaynağı', 'FI ayarları (dönem, alan durumu)', 'MM ayarları (OBYC, tolerans, sipariş)'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FB60', ad:'Satıcı faturası girişi (siparişsiz)',
        amac:'Siparişe bağlı olmayan satıcı faturasını doğrudan FI’da kaydeder.',
        neZaman:'Kira, danışmanlık, elektrik gibi hizmet alımlarında; sipariş ve mal girişi olmayan her faturada.',
        adimlar:[
          { baslik:'Satıcı numarası ve şirket kodunu gir',
            aciklama:'Satıcı girildiği anda ekranın sağında adres, banka ve ödeme koşulu görünür. ' +
                     'Vade, {{mutabakat-hesabi}} ve ödeme yöntemi ana veriden **otomatik** gelir.' },
          { baslik:'Fatura tarihi, kayıt tarihi ve referansı gir',
            aciklama:'Referans (`XBLNR`) alanına satıcının fatura numarasını yaz — mükerrer fatura kontrolü bu alana bakar.' },
          { baslik:'Brüt tutarı ve vergi kodunu gir',
            aciklama:'"Vergiyi hesapla" kutusunu işaretlersen SAP KDV satırını brüt tutardan ayırır.' },
          { baslik:'Gider satırlarını gir',
            aciklama:'G/L hesabı, tutar ve **maliyet yeri**. Gider hesaplarında CO nesnesi genelde zorunludur.' },
          { baslik:'Vade ve ödeme koşulunu kontrol et',
            aciklama:'*Ödeme* sekmesinde görünür. Ana veriden gelir ama bu faturaya özel değiştirilebilir.' },
          { baslik:'Simüle et ve kaydet',
            aciklama:'Simülasyon KDV satırını ve varsa {{belge-bolme}} satırlarını gösterir. Kaydettiğinde ' +
                     '{{BSIK}}’te bir {{acik-kalem}} oluşur.' },
        ],
        ekranAkisi:[
          { ekran:'Temel veri sekmesi', islem:'Satıcı V-2001 · Fatura tarihi 15.09.2026 · Referans DAN-2026-0912 · Tutar 60.000 · Vergi kodu %20' },
          { ekran:'Kalem tablosu', islem:'770 Genel yönetim gideri · 50.000 · Maliyet yeri 1200' },
          { ekran:'Ödeme sekmesi', islem:'Ödeme koşulu ZB01 (ana veriden) · Vade 15.10.2026 · Ödeme yöntemi H' },
          { ekran:'Simülasyon', islem:'3 satır: 770 borç 50.000 / 191 borç 10.000 / 320 alacak 60.000 → Kaydet' },
        ],
        alanlar:{
          zorunlu:['Satıcı','Fatura tarihi','Kayıt tarihi','Şirket kodu','Tutar','G/L hesabı','Vergi kodu (hesap gerektiriyorsa)'],
          opsiyonel:['Referans','Başlık metni','Maliyet yeri','Ödeme koşulu','Ödeme bloğu','Vade tarihi','Atama'] },
        hatalar:[
          { mesaj:'Vendor 100234 is blocked for posting', sebep:'Satıcı ana verisinde kayıt bloğu var ({{LFA1}} `SPERR` veya {{LFB1}}).', cozum:'{{BP}} → ilgili rolde bloğu kaldır. Blok bilinçli konmuşsa önce sebebini araştır.' },
          { mesaj:'Check document number ... — duplicate invoice', sebep:'Aynı satıcıdan aynı referans numarasıyla fatura zaten girilmiş.', cozum:'Uyarıdır, hata değil. Gerçekten mükerrerse iptal et; farklı faturaysa referansı düzelt ve devam et.' },
          { mesaj:'Tax code V1 does not appear in any G/L account item', sebep:'Vergi kodu girildi ama vergiye tabi gider satırı yok.', cozum:'Gider satırında da aynı vergi kodunu seç veya başlıktaki vergi kodunu kaldır.' },
          { mesaj:'Posting period ... is not open for account type K', sebep:'Dönem satıcı hesap tipi (K) için kapalı.', cozum:'{{OB52}}’de **K** satırında dönemi aç — sadece S satırını açmak yetmez.' },
          { mesaj:'Field Cost Center is a required field', sebep:'Gider hesabının {{alan-durumu}} grubu maliyet yerini zorunlu kılıyor.', cozum:'Maliyet yerini gir veya {{OKB9}} ile varsayılan tanımla.' },
        ],
        ipucu:'Aynı satıcıdan düzenli gelen faturalar için **hesap atama şablonu** kur; gider hesabı ve maliyet yeri hazır gelir. ' +
              'Ayrıca referans alanını boş bırakma — mükerrer fatura kontrolünün tek dayanağı odur.',
        ilgili:['FB65','MIRO','F-43','FBL1N','FB03'] },

      { kod:'MIRO', ad:'Lojistik fatura doğrulama (siparişli fatura)',
        amac:'Satınalma siparişine ve mal girişine dayanan faturayı kaydeder; {{uc-yonlu-eslestirme}} yapar.',
        neZaman:'Stoklanan mal ve siparişle takip edilen tüm alımlarda.',
        adimlar:[
          { baslik:'İşlem tipini seç: Fatura / Alacak dekontu' },
          { baslik:'Fatura tarihi ve satıcının fatura numarasını gir' },
          { baslik:'Referans nesnesini gir: satınalma siparişi numarası',
            aciklama:'Sipariş girildiğinde sistem **mal girişi yapılmış ama faturalanmamış** kalemleri otomatik getirir ve miktar/tutarı önerir.' },
          { baslik:'Önerilen miktar ve tutarı faturayla karşılaştır',
            aciklama:'Burası işin özüdür. Sipariş fiyatı 100 TL, fatura 105 TL ise fark oluşur ve tolerans kontrolü devreye girer.' },
          { baslik:'Bakiye göstergesini kontrol et',
            aciklama:'Sağ üstteki gösterge yeşil olmalı: girilen brüt tutar = kalem toplamı + vergi.' },
          { baslik:'Simüle et ve kaydet',
            aciklama:'Fark toleransı aşıyorsa fatura kaydedilir **ama ödemeye bloklanır** (`ZLSPR` dolu). ' +
                     'Bu bir hata değil, tasarımdır.' },
        ],
        ekranAkisi:[
          { ekran:'Başlık', islem:'İşlem: Fatura · Fatura tarihi 12.09.2026 · Referans FTR-889 · Brüt tutar 120.000' },
          { ekran:'Referans nesnesi', islem:'Satınalma siparişi 4500002345 → kalemler otomatik gelir' },
          { ekran:'Kalem tablosu', islem:'100 adet × 1.000 TL = 100.000 TL · Vergi kodu %20' },
          { ekran:'Ödeme sekmesi', islem:'Vade 12.10.2026 · Ödeme bloğu boş (fark yok)' },
          { ekran:'Simülasyon', islem:'159 borç 100.000 / 191 borç 20.000 / 320 alacak 120.000' },
        ],
        alanlar:{
          zorunlu:['İşlem tipi','Fatura tarihi','Referans (satıcı fatura no)','Brüt tutar','Satınalma siparişi','Vergi kodu'],
          opsiyonel:['Kayıt tarihi','Ödeme koşulu','Ödeme bloğu','Planlanan ek maliyetler','Metin'] },
        hatalar:[
          { mesaj:'Balance not zero', sebep:'Girilen brüt tutar ile kalem toplamı + vergi eşleşmiyor.', cozum:'Kalem tutarlarını ve vergi kodunu kontrol et; ek maliyet (navlun) varsa ilgili sekmeye gir.' },
          { mesaj:'Account determination for entry ... WRX ... not possible', sebep:'{{OBYC}}’de {{gr-ir}} hesabı ({{degerleme-sinifi}} kombinasyonu için) tanımlı değil.', cozum:'{{OBYC}} → WRX işlem anahtarı → ilgili değerleme sınıfı için hesabı tanımla.' },
          { mesaj:'Price/quantity variance — invoice blocked for payment', sebep:'Fark tolerans sınırının dışında.', cozum:'Farkı araştır. Haklıysa {{MRBR}} ile serbest bırak; haksızsa satıcıdan alacak dekontu iste.' },
          { mesaj:'No (suitable) item found for purchase order', sebep:'Mal girişi yapılmamış veya kalem zaten tam faturalanmış.', cozum:'{{ME23N}} → *sipariş geçmişi* sekmesinden mal girişi ve fatura durumunu kontrol et.' },
          { mesaj:'Document ... is not an invoice for this vendor', sebep:'Siparişin satıcısı ile faturadaki satıcı farklı.', cozum:'Doğru siparişi seç; farklı fatura adresi varsa siparişte alternatif ödeme alıcısını kontrol et.' },
        ],
        ipucu:'{{ME23N}} → *Sipariş geçmişi* (Purchase Order History) sekmesi, {{EKBE}} tablosunu görsel olarak gösterir: ' +
              'kaç mal girişi, kaç fatura, ne kadar kaldı. MIRO sorunlarının %80’i bu sekmeye bakınca anlaşılır.',
        ilgili:['MIGO','ME23N','MRBR','MR11','FB60'] },

      { kod:'FBL1N', ad:'Satıcı kalem listesi',
        amac:'Bir satıcının veya satıcı grubunun açık, kapalı ve tüm kalemlerini listeler. AP’nin en çok kullanılan raporu.',
        neZaman:'Mutabakat, yaşlandırma, "bu fatura ödendi mi?" sorusu ve ödeme öncesi kontrol için.',
        adimlar:[
          { baslik:'Satıcı ve şirket kodunu gir', aciklama:'Satıcı aralığı veya hesap grubu da verilebilir.' },
          { baslik:'Kalem tipini seç: açık / kapalı / tüm',
            aciklama:'**Açık kalemler** seçildiğinde bir *anahtar tarih* girilir: "bu tarihte hangi kalemler açıktı?"' },
          { baslik:'Düzeni ayarla',
            aciklama:'Vade (`ZFBDT`), atama, ödeme bloğu ve metin sütunlarını ekle. Vadeye göre sırala.' },
          { baslik:'Satıra çift tıkla → belgeye in ({{FB03}})' },
        ],
        ekranAkisi:[
          { ekran:'Seçim ekranı', islem:'Satıcı V-4001 · Şirket kodu 1000 · **Açık kalemler** · Anahtar tarih bugün' },
          { ekran:'Kalem listesi', islem:'Faturalar vade sırasıyla; toplam borç altta' },
          { ekran:'Düzen', islem:'Vade, ödeme bloğu, iskonto tarihi sütunları eklendi' },
          { ekran:'Belge', islem:'Çift tık → {{FB03}}' },
        ],
        hatalar:[
          { mesaj:'No items selected', sebep:'Satıcının o dönemde hareketi yok veya kriter çok dar.', cozum:'"Tüm kalemler" seç, tarih aralığını genişlet, şirket kodunu kontrol et.' },
        ],
        ipucu:'Ödeme bloğu sütununu düzenine ekle ve varsayılan yap. "Neden bu fatura ödenmedi?" sorusunun ' +
              'cevabı çoğu zaman o sütundadır ve tek bakışta görürsün.',
        ilgili:['FK10N','S_ALR_87012078','FB03','F-44','F110'] },

      { kod:'F-53', ad:'Satıcı ödemesi (manuel)',
        amac:'Tek bir giden ödemeyi kaydeder ve seçilen açık kalemleri kapatır.',
        neZaman:'{{F110}} kapsamı dışındaki acil veya istisnai ödemelerde.',
        adimlar:[
          { baslik:'Başlık: belge tarihi, şirket kodu, banka hesabı ve ödeme tutarını gir' },
          { baslik:'Satıcı numarasını gir ve *Açık kalemleri işle* düğmesine bas' },
          { baslik:'Kapatılacak kalemleri seç',
            aciklama:'Ekranın altındaki **"Atanmamış"** alanı sıfır olmalıdır. Sıfır değilse kapatma yapılamaz.' },
          { baslik:'Gerekirse kısmi/kalan kapatma sekmesini kullan',
            aciklama:'*Kısmi ödeme* sekmesi orijinal kalemi açık bırakır; *Kalan kalem* sekmesi kapatıp yeni kalem üretir.' },
          { baslik:'Kaydet' },
        ],
        alanlar:{
          zorunlu:['Belge tarihi','Şirket kodu','Banka G/L hesabı','Tutar','Satıcı'],
          opsiyonel:['Değer tarihi','Metin','Atama','Ödeme yöntemi'] },
        hatalar:[
          { mesaj:'The difference is too large for clearing', sebep:'Seçilen kalemlerin toplamı ödeme tutarına eşit değil ve fark {{tolerans-grubu}} dışında.', cozum:'Seçimi düzelt veya kısmi/kalan kapatma kullan. Tolerans için {{OBA3}}/{{OBA4}}.' },
          { mesaj:'No open items found', sebep:'Satıcının açık kalemi yok veya seçim kriteri yanlış.', cozum:'{{FBL1N}} ile açık kalemleri kontrol et; özel ana muhasebe kalemleri için ilgili göstergeyi seçim ekranında işaretle.' },
        ],
        ipucu:'Avans ({{ozel-ana-muhasebe-gostergesi}}) kalemlerini kapatmak istiyorsan seçim ekranında ' +
              '**"Özel G/L işlemleri"** kutusunu işaretlemelisin; aksi hâlde o kalemler listeye hiç gelmez.',
        ilgili:['F-58','F110','F-44','FB05'] },

      { kod:'F-44', ad:'Satıcı kapatma',
        amac:'Ödeme kaydı yapmadan, birbirini götüren satıcı kalemlerini eşleştirir.',
        neZaman:'Fatura ile alacak dekontunu karşılıklı kapatırken; {{F110}} dışında yapılmış ödemenin faturayla eşleşmediği durumlarda.',
        adimlar:[
          { baslik:'Satıcı, şirket kodu ve kapatma tarihini gir' },
          { baslik:'Açık kalemleri işle → kapatılacakları seç' },
          { baslik:'Net tutarın sıfır olduğunu doğrula ve kaydet',
            aciklama:'Kapatma bir belge üretir ama **hiçbir G/L hesabını hareket ettirmez** (fark yoksa). Sadece kalemleri eşleştirir.' },
        ],
        ipucu:'Yanlış kapatma yaptıysan {{FBRA}} ile geri alabilirsin — yeni bir düzeltme kaydı girmene gerek yok.',
        ilgili:['F-32','F-03','FBRA','F.13'] },

      { kod:'MRBR', ad:'Bloke faturaları serbest bırak',
        amac:'Fiyat, miktar veya tarih farkı nedeniyle ödemeye bloklanmış {{MIRO}} faturalarının blokunu kaldırır.',
        neZaman:'Fark araştırılıp haklı bulunduğunda; her ödeme koşusundan önce rutin olarak.',
        adimlar:[
          { baslik:'Şirket kodu ve seçim kriterlerini gir' },
          { baslik:'Blok sebebini incele',
            aciklama:'Fiyat farkı mı, miktar farkı mı, teslim tarihi farkı mı? Her biri farklı bir araştırma gerektirir.' },
          { baslik:'Haklı olanları seç ve serbest bırak' },
        ],
        ipucu:'Blok kalkmadıkça {{F110}} o faturayı **görmez**. "Faturayı girdim ama ödeme koşusunda çıkmadı" ' +
              'şikâyetlerinin en sık sebebi budur — ikinci sebep satıcı ana verisindeki {{odeme-blogu}}.',
        hatalar:[
          { mesaj:'Blocking reason cannot be deleted manually', sebep:'Blok stokastik (rastgele denetim) blokudur.', cozum:'Bu blok bilinçlidir; yetkili onayı ile kaldırılır.' },
        ],
        ilgili:['MIRO','FBL1N','F110'] },

      { kod:'F-47', ad:'Satıcı avans talebi',
        amac:'Avans ödemesi için istatistiksel bir talep oluşturur. {{F110}} bu talebi görüp öder.',
        neZaman:'Sipariş peşinatı gerektiğinde, avansın ödeme koşusuna dâhil edilmesi istendiğinde.',
        adimlar:[
          { baslik:'Satıcı, tutar ve özel ana muhasebe göstergesini (genelde F) gir' },
          { baslik:'Vade ve varsa siparişi bağla' },
          { baslik:'Kaydet — istatistiksel kalem oluşur',
            aciklama:'Bu kalem **hiçbir G/L hesabını hareket ettirmez**; yalnızca "bu satıcıya avans ödenecek" bilgisini taşır.' },
        ],
        ipucu:'Talep (F) ile ödeme (A) farklı göstergelerdir. Talep istatistikseldir, ödeme gerçek kayıt üretir. ' +
              'Bu ayrımı bilmemek {{OBYR}} yapılandırmasında en sık yapılan hatadır.',
        ilgili:['F-48','F-54','F110','OBYR'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'AP’nin tablo mimarisi üç katmandır: **ana veri** (satıcı kim), **belge** (ne oldu) ve ' +
      '**indeks** (hangi kalem açık). S/4HANA’da indeks katmanı {{uyumluluk-view}}’ine dönüştü ' +
      'ama mantık aynı kaldı.',

    liste:[
      { ad:'LFA1', baslik:'Satıcı — genel katman',
        tutar:'Ad, adres, ülke, vergi numaraları, hesap grubu. Tüm şirket kodları için ortak.',
        olusturan:'{{BP}} (S/4HANA) veya {{XK01}} (ECC)',
        guncelleyen:'{{BP}}, {{XK01}}, {{XK02}}',
        anahtar:'LIFNR',
        iliskiler:'{{LFB1}} (şirket kodu) ve {{LFM1}} (satın alma) ile 1-n; {{BSEG}}.LIFNR buraya işaret eder.',
        s4:'Tablo duruyor ama {{BP}} tarafından CVI senkronizasyonuyla doldurulur.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Satıcı numarası' },
          { ad:'STCD1 / STCD2', aciklama:'Vergi numarası — mükerrer kontrolünün anahtarı' },
          { ad:'SPERR', aciklama:'Merkezi kayıt bloğu — tüm şirket kodlarını etkiler' },
        ] },

      { ad:'LFB1', baslik:'Satıcı — şirket kodu katmanı',
        tutar:'Muhasebe davranışı: mutabakat hesabı, ödeme koşulu, izin verilen ödeme yöntemleri, ödeme bloğu.',
        olusturan:'{{BP}} → FI Vendor rolü',
        guncelleyen:'{{BP}}, {{FK02}}',
        anahtar:'LIFNR + BUKRS',
        iliskiler:'{{LFA1}}’in çocuğu; `AKONT` alanı {{SKB1}}’deki mutabakat hesabına işaret eder.',
        s4:'Değişmedi; {{BP}} üzerinden doldurulur.',
        alanlar:[
          { ad:'AKONT', aciklama:'**{{mutabakat-hesabi}}** — satıcının ana muhasebedeki adresi' },
          { ad:'ZTERM', aciklama:'{{odeme-kosulu}} — vade ve iskonto buradan hesaplanır' },
          { ad:'ZWELS', aciklama:'İzin verilen {{odeme-yontemi}} listesi — {{F110}} bunun dışına çıkamaz' },
          { ad:'ZAHLS', aciklama:'{{odeme-blogu}} — doluysa {{F110}} satıcıyı öneriye almaz' },
          { ad:'ZUAWA', aciklama:'Sıralama anahtarı — `ZUONR` alanını doldurur' },
        ] },

      { ad:'BSIK', baslik:'Satıcı açık kalemleri',
        tutar:'Ödenmemiş satıcı faturaları. {{FBL1N}}’in "açık kalem" seçeneği ve {{F110}}’un seçim havuzu buradan beslenir.',
        olusturan:'Satıcıya yapılan her kayıt ({{FB60}}, {{MIRO}}, {{F-43}})',
        guncelleyen:'Kayıt işlemleri; ödeme yapılınca kalem buradan silinip {{BSAK}}’a taşınır',
        anahtar:'BUKRS + LIFNR + UMSKS + UMSKZ + AUGDT + AUGBL + ZFBDT + BELNR + BUZEI',
        iliskiler:'{{LFB1}} ile satıcı, {{BSEG}} ile belge kalemi bağı.',
        s4:'**Fiziksel tablo kaldırıldı**; aynı isimli {{uyumluluk-view}} veriyi {{ACDOCA}} + {{BSEG}}’den üretir. Yazma yapılamaz.',
        alanlar:[
          { ad:'ZFBDT', aciklama:'Baz tarih — vade bu tarihten hesaplanır' },
          { ad:'ZBD1T', aciklama:'İskonto günü — {{F110}} en kârlı ödeme gününü buradan bulur' },
          { ad:'ZLSPR', aciklama:'Ödeme bloğu — kalem bazında' },
          { ad:'UMSKZ', aciklama:'{{ozel-ana-muhasebe-gostergesi}} — avans kalemlerini normalden ayırır' },
        ] },

      { ad:'BSAK', baslik:'Satıcı kapatılmış kalemleri',
        tutar:'Ödenmiş satıcı kalemleri. Kalem kapatıldığında {{BSIK}}’ten buraya geçer.',
        olusturan:'{{kapatma}} işlemi ({{F110}}, {{F-53}}, {{F-44}})',
        guncelleyen:'Kapatma işlemleri; {{FBRA}} ile geri alınırsa kalem {{BSIK}}’e döner',
        anahtar:'BUKRS + LIFNR + AUGDT + AUGBL + GJAHR + BELNR + BUZEI',
        iliskiler:'`AUGBL` alanı kapatma belgesine işaret eder.',
        s4:'{{uyumluluk-view}}’ine dönüştürüldü.' },

      { ad:'RBKP', baslik:'Lojistik fatura başlığı',
        tutar:'{{MIRO}} ile girilen faturanın MM tarafındaki başlığı. FI belgesinden **ayrı** bir kayıttır.',
        olusturan:'{{MIRO}}',
        guncelleyen:'{{MIRO}}, {{MRBR}} (blok kaldırma)',
        anahtar:'BELNR + GJAHR',
        iliskiler:'{{RSEG}} ile kalemleri, {{BKPF}} ile FI belgesi (`AWKEY` üzerinden) bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'ZLSPR', aciklama:'Ödeme bloğu — fark varsa otomatik dolar' },
          { ad:'RMWWR', aciklama:'Fatura brüt tutarı' },
        ] },

      { ad:'EKBE', baslik:'Satınalma siparişi geçmişi',
        tutar:'Sipariş kaleminin tüm mal girişi ve fatura hareketleri. "Ne kadar geldi, ne kadarı faturalandı?" sorusunun tek adresi.',
        olusturan:'{{MIGO}} ve {{MIRO}}',
        guncelleyen:'Her mal girişi ve fatura girişi',
        anahtar:'EBELN + EBELP + ZEKKN + VGABE + GJAHR + BELNR + BUZEI',
        iliskiler:'{{EKPO}} sipariş kalemine, {{MSEG}} ve {{RSEG}} belgelerine bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'VGABE', aciklama:'**1** = mal girişi, **2** = fatura girişi' },
          { ad:'MENGE / WRBTR', aciklama:'Miktar ve tutar' },
        ] },

      { ad:'REGUH', baslik:'Ödeme çalıştırması — ödeme başlıkları',
        tutar:'{{F110}}’un ürettiği her ödemenin başlığı: alıcı, tutar, banka, ödeme yöntemi, ödeme belgesi.',
        olusturan:'{{F110}} öneri ve ödeme çalıştırması',
        guncelleyen:'{{F110}}',
        anahtar:'LAUFD + LAUFI + XVORL + ZBUKR + LIFNR + KUNNR + VBLNR',
        iliskiler:'{{REGUP}} ile hangi kalemlerin ödendiği bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'XVORL', aciklama:'**X ise yalnızca öneridir**, gerçek ödeme değildir' },
          { ad:'VBLNR', aciklama:'Ödeme belgesi numarası' },
        ] },

      { ad:'REGUP', baslik:'Ödeme çalıştırması — ödenen kalemler',
        tutar:'Her ödemenin hangi fatura kalemlerini kapattığı. "Bu ödeme hangi faturaları kapattı?" sorusunun cevabı.',
        olusturan:'{{F110}}',
        guncelleyen:'{{F110}}',
        anahtar:'LAUFD + LAUFI + XVORL + ZBUKR + LIFNR + KUNNR + VBLNR + BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{REGUH}}’un çocuğu; {{BSAK}} ile kapatılmış kalemlere bağlanır.',
        s4:'Değişmedi.' },
    ],

    er:{
      type:'er',
      baslik:'AP tablo ilişkileri — satıcıdan ödemeye',
      varliklar:[
        { ad:'LFA1', rol:'Ana veri', aciklama:'Satıcı kimliği',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'NAME1' }, { ad:'STCD1' }] },
        { ad:'LFB1', rol:'Ana veri', aciklama:'Satıcı muhasebe verisi',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }, { ad:'ZTERM' }, { ad:'ZWELS' }] },
        { ad:'BKPF', rol:'Başlık', aciklama:'FI belgesi başlığı',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'AWKEY' }] },
        { ad:'BSEG', rol:'Kalem', hub:true, aciklama:'FI belge kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'LIFNR', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'BSIK', rol:'İndeks', aciklama:'Açık kalemler',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZFBDT' }, { ad:'ZLSPR' }] },
        { ad:'BSAK', rol:'İndeks', aciklama:'Kapatılmış kalemler',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'AUGBL' }, { ad:'AUGDT' }] },
        { ad:'REGUH', rol:'Ödeme', aciklama:'Ödeme başlığı',
          alanlar:[{ ad:'LAUFI', tip:'pk' }, { ad:'LIFNR', tip:'fk' }, { ad:'VBLNR' }] },
        { ad:'REGUP', rol:'Ödeme', aciklama:'Ödenen kalemler',
          alanlar:[{ ad:'LAUFI', tip:'fk' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'EKBE', rol:'MM köprü', aciklama:'Sipariş geçmişi',
          alanlar:[{ ad:'EBELN', tip:'fk' }, { ad:'VGABE' }, { ad:'BELNR', tip:'fk' }] },
      ],
      iliskiler:[
        { from:'LFA1', to:'LFB1', alanlar:'LIFNR', not:'genel → şirket kodu' },
        { from:'LFB1', to:'BSEG', alanlar:'LIFNR + BUKRS', not:'satıcının kalemleri' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'başlık → kalem' },
        { from:'BSEG', to:'BSIK', alanlar:'BELNR + BUZEI', not:'açık kalem indeksi' },
        { from:'BSIK', to:'BSAK', alanlar:'ödeme sonrası', not:'kapatılınca taşınır' },
        { from:'REGUH', to:'REGUP', alanlar:'LAUFD + LAUFI', not:'ödeme → ödenen kalemler' },
        { from:'REGUP', to:'BSAK', alanlar:'BELNR + BUZEI', not:'hangi kalem ödendi' },
        { from:'EKBE', to:'BKPF', alanlar:'BELNR → AWKEY', not:'MM hareketi → FI belgesi' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Aşağıda AP’de günlük olarak yapılan üç işin ekran akışı var: **fatura girmek**, ' +
      '**bloklu faturayı çözmek** ve **ödeme yapmak**. Alan mantığını bir kez kavradığında ' +
      'diğer AP ekranları da tanıdık gelir.',

    ekranlar:[
      { ad:'{{FB60}} — Temel veri sekmesi',
        aciklama:'Faturanın başlık bilgisi. Satıcı girildiği an ana veriden gelen değerler ekranı doldurur.',
        alanlar:[
          { ad:'Satıcı', zorunlu:true, aciklama:'Girildiğinde adres, banka ve ödeme koşulu sağ panelde görünür. Yanlış satıcı seçimi en pahalı hatadır.' },
          { ad:'Fatura tarihi (`BLDAT`)', zorunlu:true, aciklama:'Satıcının fatura üzerindeki tarihi. Vade hesabının **baz tarihi** genelde budur.' },
          { ad:'Kayıt tarihi (`BUDAT`)', zorunlu:true, aciklama:'Muhasebe dönemini belirler. Ay sonunda gelen faturalarda dikkatle kontrol edilir.' },
          { ad:'Referans (`XBLNR`)', zorunlu:false, aciklama:'Satıcının fatura numarası. **Mükerrer fatura kontrolü buna bakar** — boş bırakma.' },
          { ad:'Tutar', zorunlu:true, aciklama:'Brüt tutar (KDV dâhil). "Vergiyi hesapla" işaretliyse SAP KDV’yi ayırır.' },
          { ad:'Vergi kodu', zorunlu:false, aciklama:'Hesabın vergi kategorisi zorunlu kılıyorsa istenir.' },
        ],
        ipucu:'Satıcı girer girmez sağdaki panelde çıkan bilgiyi oku: ödeme koşulu ve bloğu doğru mu? ' +
              'Yanlış ana veri, faturayı girdikten sonra fark edilirse düzeltmesi zordur.' },

      { ad:'{{FB60}} — Ödeme sekmesi',
        aciklama:'Vade ve ödeme davranışının belirlendiği sekme. Değerler ana veriden gelir ama bu faturaya özel değiştirilebilir.',
        alanlar:[
          { ad:'Baz tarih (`ZFBDT`)', zorunlu:false, aciklama:'Vade hesabının başlangıcı. Ana veriden gelir; fatura tarihi veya kayıt tarihi olabilir.' },
          { ad:'Ödeme koşulu (`ZTERM`)', zorunlu:false, aciklama:'Vade ve iskonto şartı. Değiştirilirse vade yeniden hesaplanır.' },
          { ad:'Ödeme bloğu (`ZLSPR`)', zorunlu:false, aciklama:'Bu faturaya özel blok. Uyuşmazlık varsa buraya konur; satıcı ana verisindeki bloktan farklıdır.' },
          { ad:'Ödeme yöntemi', zorunlu:false, aciklama:'Boş bırakılırsa {{F110}} satıcı ana verisindeki `ZWELS` listesinden seçer.' },
        ],
        ipucu:'Uyuşmazlıklı faturayı **iptal etme** — ödeme bloğu koy. Fatura kayıtta kalır, yaşlandırmada görünür ' +
              'ama ödenmez. Sorun çözülünce blok kaldırılır.' },

      { ad:'{{MIRO}} — Referans nesnesi ve kalem eşleştirme',
        aciklama:'MIRO’nun kalbi. Sipariş numarası girildiğinde sistem faturalanmayı bekleyen kalemleri getirir.',
        alanlar:[
          { ad:'Satınalma siparişi', zorunlu:true, aciklama:'Girildiğinde mal girişi yapılmış ama faturalanmamış kalemler otomatik gelir ve miktar/tutar önerilir.' },
          { ad:'Miktar', zorunlu:true, aciklama:'Faturadaki miktar. Mal girişinden farklıysa **miktar farkı** oluşur.' },
          { ad:'Tutar', zorunlu:true, aciklama:'Faturadaki tutar. Sipariş fiyatından farklıysa **fiyat farkı** oluşur.' },
          { ad:'Brüt tutar (başlıkta)', zorunlu:true, aciklama:'Kalem toplamı + vergi ile eşleşmeli; eşleşmezse "Balance not zero" hatası alınır.' },
        ],
        ipucu:'Fark oluştuğunda önce {{ME23N}} → *Sipariş geçmişi* sekmesine bak. Genelde ya mal girişi eksik, ' +
              'ya kısmi teslimat var, ya da sipariş fiyatı güncellenmemiş.' },

      { ad:'{{F-53}} — Açık kalem seçim ekranı',
        aciklama:'Ödenecek kalemlerin seçildiği ekran. En kritik gösterge alttaki "Atanmamış" alanıdır.',
        alanlar:[
          { ad:'Banka G/L hesabı', zorunlu:true, aciklama:'Paranın çıkacağı hesap. Genelde {{banka-ara-hesabi}} kullanılır.' },
          { ad:'Tutar', zorunlu:true, aciklama:'Ödenen toplam tutar.' },
          { ad:'Kalem seçimi', zorunlu:true, aciklama:'Seçilen kalemlerin toplamı ödeme tutarına eşit olmalı; **"Atanmamış" alanı sıfır** olmalıdır.' },
          { ad:'Özel G/L işlemleri kutusu', zorunlu:false, aciklama:'Avans kalemlerini listeye dâhil etmek için işaretlenir. Aksi hâlde o kalemler hiç görünmez.' },
        ] },
    ],

    zorunlu:['Satıcı','Fatura tarihi','Kayıt tarihi','Şirket kodu','Tutar','G/L hesabı (FB60) veya sipariş (MIRO)'],
    opsiyonel:['Referans','Başlık metni','Maliyet yeri','Ödeme koşulu','Ödeme bloğu','Vade','Atama','Ödeme yöntemi'],

    hatalar:[
      { mesaj:'Posting period ... is not open for account type K', sebep:'Dönem satıcı hesap tipi için kapalı. Sadece S (ana muhasebe) açılmış olabilir.', cozum:'{{OB52}}’de **K** satırında da dönemi aç. Hesap tipleri ayrı ayrı yönetilir.' },
      { mesaj:'Vendor ... is blocked for posting', sebep:'{{LFA1}} `SPERR` (merkezi) veya {{LFB1}} kayıt bloğu.', cozum:'{{BP}} → ilgili rolde bloğu kaldır; blok bilinçliyse önce sebebini araştır.' },
      { mesaj:'Account determination for entry ... WRX ... not possible', sebep:'{{OBYC}}’de {{gr-ir}} hesabı ilgili {{degerleme-sinifi}} için tanımsız.', cozum:'{{OBYC}} → WRX → değerleme sınıfı satırını tamamla. Malzemenin değerleme sınıfını {{ME23N}}’den öğren.' },
      { mesaj:'Invoice blocked for payment (price variance)', sebep:'Fatura fiyatı sipariş fiyatından tolerans dışı farklı.', cozum:'Farkı araştır → haklıysa {{MRBR}} ile serbest bırak, haksızsa satıcıdan alacak dekontu iste.' },
      { mesaj:'Duplicate invoice check: document ... already exists', sebep:'Aynı satıcı + aynı referans + aynı tutar.', cozum:'Uyarıdır. Gerçekten mükerrerse girme; farklı faturaysa referansı düzelt.' },
      { mesaj:'The difference is too large for clearing', sebep:'Seçilen kalemler ile ödeme tutarı eşleşmiyor, fark tolerans dışında.', cozum:'Seçimi düzelt; kalıcı farksa kısmi/kalan kapatma kullan. Tolerans ayarı {{OBA3}}/{{OBA4}}.' },
      { mesaj:'No open items were found (F-53)', sebep:'Avans kalemleri normal seçime gelmez.', cozum:'Seçim ekranında **"Özel G/L işlemleri"** kutusunu işaretle.' },
      { mesaj:'Withholding tax code missing', sebep:'Satıcı stopaja tabi ama fatura girişinde stopaj kodu gelmemiş.', cozum:'{{BP}} → şirket kodu verisi → stopaj vergisi sekmesini kontrol et.' },
    ],

    ipuclari:[
      'Ödeme koşusundan önce her zaman şu üç kontrolü yap: **(1)** {{MRBR}} ile bloklu faturalar, ' +
      '**(2)** {{FBL1N}} ile ödeme bloğu sütunu, **(3)** vadesi geçmiş ama gözden kaçmış kalemler. ' +
      'Bu üç kontrol, "neden ödenmedi?" sorularının çoğunu ödeme öncesinde çözer.',
      '{{FBL1N}} düzenine **vade, ödeme bloğu ve iskonto tarihi** sütunlarını ekleyip varsayılan yap. ' +
      'AP’de en sık bakılan üç bilgi bunlardır.',
      'Mükerrer fatura kontrolünün çalışması için referans alanı (`XBLNR`) **disiplinli** doldurulmalıdır. ' +
      'Kontrolün hangi alanlara baktığı {{OBY6}} → şirket kodu global parametrelerinde ayarlanır.',
      '{{gr-ir}} hesabını her ay {{FBL3N}} ile açık kalem bazında incele. Kalıcı olarak eşleşmeyecek ' +
      'küçük farkları {{MR11}} ile temizle — yıllarca biriktirme.',
      'Bir faturanın neden ödenmediğini bulmanın en hızlı yolu: {{FBL1N}} → kalemi bul → ödeme bloğu dolu mu? ' +
      'Değilse {{BP}}’de satıcı bloğu var mı? Değilse vade gelmemiş olabilir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'FI belge başlığı; MIRO’dan geliyorsa `AWTYP` = RMRP, `AWKEY` = fatura belgesi' },
      { tablo:'BSEG', ne:'Kalemler; satıcı satırında `LIFNR` dolu, `AUGBL` boş (açık kalem)' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler; her defter için ayrı satır kümesi' },
      { tablo:'BSIK', ne:'Satıcı açık kalemi (S/4HANA’da view üzerinden)' },
      { tablo:'BSET', ne:'Vergi satırları: matrah, vergi tutarı, hesap anahtarı' },
      { tablo:'RBKP', ne:'MIRO faturasının MM başlığı (yalnız MIRO’da)' },
      { tablo:'RSEG', ne:'MIRO faturasının kalemleri (yalnız MIRO’da)' },
      { tablo:'EKBE', ne:'Sipariş geçmişine fatura hareketi eklenir (`VGABE` = 2)' },
    ],

    commit:
      'Fatura kaydı tek bir LUW içinde yazılır. {{MIRO}}’da ek bir katman vardır: ' +
      'önce MM fatura belgesi ({{RBKP}}/{{RSEG}}), ardından FI belgesi üretilir ve ikisi `AWKEY` ile bağlanır. ' +
      'Bu iki adım aynı LUW içindedir — biri başarısız olursa ikisi de yazılmaz.\n\n' +
      '{{F110}}’da durum farklıdır: **öneri** ve **ödeme** ayrı çalıştırmalardır ve arada onay beklenir. ' +
      'Öneri {{REGUH}}/{{REGUP}}’a `XVORL = X` ile yazılır; ödeme çalıştırmasında bu kayıtlar gerçek ödemeye dönüşür.',

    belgeNo:
      'Belge türüne bağlı numara aralığından, **kaydetme anında** verilir. AP’de tipik türler: ' +
      '**KR** satıcı faturası, **KG** satıcı alacak dekontu, **KZ** satıcı ödemesi, **RE** lojistik fatura. ' +
      '{{MIRO}} iki numara üretir: MM fatura numarası ({{RBKP}}) ve FI belge numarası ({{BKPF}}) — ' +
      'bunlar **farklıdır** ve karıştırılmamalıdır.',

    postingLogic:
      '{{FB60}} zinciri: satıcı → {{LFB1}}’den {{mutabakat-hesabi}} ve {{odeme-kosulu}} → ' +
      'gider satırları (kullanıcı girer) → vergi satırı (otomatik) → denge kontrolü → numara → yazma.\n\n' +
      '{{MIRO}} zinciri: sipariş → {{EKBE}}’den faturalanmamış mal girişi kalemleri → ' +
      'miktar/fiyat karşılaştırması → tolerans kontrolü → {{OBYC}}’den hesap belirleme → ' +
      'fark varsa fiyat farkı hesabı (PRD) ve **ödeme bloğu** → FI belgesi.',

    belgeTuru:
      'AP belge türleri hangi hesap tiplerine izin verildiğini belirler. **KR** türü satıcı (K) ve ' +
      'ana muhasebe (S) hesap tiplerine izin verir ama müşteri (D) hesabına kayıt yaptırmaz. ' +
      'Bu, yanlış hesap tipine kayıt yapılmasını yapısal olarak engeller.',

    numberRange:
      'Şirket kodu + mali yıl bazında {{FBN1}} ile tanımlanır. MM fatura numarası ise ayrı bir aralıktan ' +
      'gelir (MM tarafında tanımlanır). Yılbaşında **her ikisi de** açılmalıdır — sadece FI aralığını ' +
      'açıp MM’i unutmak, Ocak ayında MIRO’nun durmasına yol açan klasik hatadır.',

    accountDetermination:
      '{{FB60}}’ta gider hesabını kullanıcı girer; yalnızca vergi ve satıcı satırı otomatiktir.\n\n' +
      '{{MIRO}}’da hesapların tamamı otomatiktir ve {{OBYC}} belirler. Önemli işlem anahtarları:\n' +
      '**BSX** stok hesabı · **WRX** {{gr-ir}} hesabı · **PRD** fiyat farkı · **FR1** navlun karşılığı · ' +
      '**KDM** kur farkı. Her biri {{degerleme-sinifi}} ile birlikte {{T030}}’da bir hesaba eşlenir.',

    tur:
      '**Ana veri:** satıcı kayıtları ({{LFA1}}/{{LFB1}}).\n\n' +
      '**Özelleştirme:** satıcı hesap grupları, {{odeme-kosulu}} tanımları, {{FBZP}} ödeme yapılandırması, ' +
      'tolerans grupları ({{OBA3}}/{{OBA4}}), {{OBYC}} hesap belirleme, {{OBYR}} özel G/L göstergeleri, ' +
      'belge türleri ve numara aralığı tanımı.\n\n' +
      '**Hareket verisi:** faturalar, ödemeler, ödeme çalıştırmaları.',

    transport:
      'Ödeme koşulları, tolerans grupları, {{FBZP}} ayarları ve hesap belirleme taşınır. ' +
      'Satıcı kayıtları ve belgeler taşınmaz. **Dikkat:** {{FBZP}}’deki banka belirleme ayarları ' +
      'sisteme özgü banka hesaplarına referans verir; taşındıktan sonra canlıda kontrol edilmelidir.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Satıcı Hesapları → Ana Veri → Hazırlık → Satıcı Hesap Gruplarını Tanımla', not:'Hesap grubu ve alan durumu' },
      { yol:'SPRO → Finansal Muhasebe → Satıcı Hesapları → İş İşlemleri → Giden Faturalar/Alacak Dekontları → Ödeme Koşullarını Tanımla', not:'{{odeme-kosulu}} — vade ve iskonto' },
      { yol:'SPRO → Finansal Muhasebe → Satıcı Hesapları → İş İşlemleri → Giden Ödemeler → Otomatik Giden Ödemeler → Ödeme Programı Yapılandırması', not:'{{FBZP}} — {{F110}}’un tüm ayarları' },
      { yol:'SPRO → Finansal Muhasebe → Satıcı Hesapları → İş İşlemleri → Giden Ödemeler → Manuel Giden Ödemeler → Ödeme Farkları İçin Tolerans Tanımla', not:'{{OBA3}} — kapatma tolerans sınırları' },
      { yol:'SPRO → Malzeme Yönetimi → Değerleme ve Hesap Atama → Hesap Belirleme → Otomatik Kayıtları Yapılandır', not:'{{OBYC}} — BSX, WRX, PRD işlem anahtarları' },
      { yol:'SPRO → Malzeme Yönetimi → Lojistik Fatura Doğrulama → Fatura Bloğu → Fiyat/Miktar Farkı İçin Tolerans Sınırlarını Belirle', not:'{{MIRO}} blok toleransları' },
      { yol:'SPRO → Finansal Muhasebe → Satıcı Hesapları → İş İşlemleri → Giden Ödemeler → Avanslar → Özel Ana Muhasebe İşlemlerini Tanımla', not:'{{OBYR}} — avans göstergeleri' },
    ],

    ekstra:[
      { ic:'🔐', baslik:'AP’de iç kontrol — nereye dikkat edilir?', metin:
        'Şirketten para çıkışının neredeyse tamamı AP üzerindendir; bu yüzden en çok kontrol gerektiren alandır.\n\n' +
        '**Görevler ayrılığı:** satıcı ana verisini açan kişi ile ödeme yapan kişi **aynı olmamalıdır**. ' +
        'Aksi hâlde sahte satıcı açıp kendine ödeme yapmak mümkün hâle gelir.\n\n' +
        '**Banka hesabı değişikliği:** {{CDPOS}} üzerinden `LFBK` tablosundaki değişiklikler izlenmelidir. ' +
        'En yaygın dolandırıcılık yöntemi, sahte bir e-postayla "banka hesabımız değişti" denmesidir.\n\n' +
        '**Mükerrer fatura:** referans alanı disiplini + SAP’ın mükerrer kontrolü.\n\n' +
        '**Ödeme önerisi onayı:** {{F110}} önerisi mutlaka ikinci bir kişi tarafından incelenmelidir.' },

      { ic:'📊', baslik:'Yaşlandırma neden vade tarihine göre yapılır?', metin:
        'Yaşlandırma, kalemin **vadesinden** itibaren kaç gün geçtiğini ölçer, fatura tarihinden değil. ' +
        'Vade {{BSIK}} tablosundaki `ZFBDT` (baz tarih) + {{odeme-kosulu}} gün sayısıyla hesaplanır.\n\n' +
        'Bu yüzden {{kalan-kapatma}} kullanmak yaşlandırmayı **bozar**: yeni üretilen kalemin vadesi ' +
        'bugünden başlar ve 90 günlük gecikmiş bir borç, aniden "vadesi gelmemiş" görünür. ' +
        '{{kismi-kapatma}} ise orijinal vadeyi korur. Aralarındaki seçim bu yüzden önemlidir.' },
    ],

    notlar:[
      { tip:'warn', baslik:'MIRO’da iki belge numarası vardır', metin:
        '{{MIRO}} kaydedildiğinde ekranda görünen numara **MM fatura numarasıdır** ({{RBKP}}). ' +
        'FI belge numarası farklıdır ve {{BKPF}}’dedir. {{FB03}}’te MM numarasını aramak sonuç vermez; ' +
        '{{MIR4}} ile MM faturasını açıp oradan FI belgesine geçmek gerekir. Yeni başlayanların klasik çıkmazıdır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'AP’nin iş mantığı S/4HANA’da değişmedi — fatura, ödeme ve kapatma aynı şekilde çalışır. ' +
      'Değişenler: **satıcı ana verisinin {{BP}}’ye taşınması**, **indeks tablolarının view’e dönüşmesi** ' +
      've **Fiori tabanlı yeni çalışma listeleri**.',

    eccFarklari:[
      { konu:'Satıcı ana verisi', ecc:'{{FK01}} / {{XK01}}', s4:'{{BP}} zorunlu — FI Vendor rolü ile' },
      { konu:'Açık kalem tablosu', ecc:'{{BSIK}} / {{BSAK}} fiziksel tablo', s4:'{{uyumluluk-view}} — veri {{ACDOCA}}’dan üretilir' },
      { konu:'Terminoloji', ecc:'Vendor', s4:'**Supplier** (Fiori ve yeni dokümantasyonda)' },
      { konu:'Kalem raporu', ecc:'{{FBL1N}}', s4:'{{FBL1N}} çalışır; Fiori "Display Supplier Line Items" önerilir' },
      { konu:'Fatura girişi', ecc:'{{FB60}} / {{MIRO}}', s4:'Aynı + Fiori "Create Supplier Invoice" (makine öğrenmesi destekli hesap önerisi)' },
      { konu:'Ödeme', ecc:'{{F110}}', s4:'{{F110}} + Fiori "Manage Automatic Payments" ile görsel öneri yönetimi' },
      { konu:'Kredi/risk', ecc:'FD32 tabanlı', s4:'SAP Credit Management ({{UKM_BP}}) — AR tarafında' },
    ],

    universalJournal:
      'AP kalemleri artık {{ACDOCA}}’da da tutulur ve satıcı numarası, maliyet yeri, kâr merkezi ' +
      '**aynı satırdadır**. Pratik sonucu: "hangi satıcıya ne kadar ödedik, hangi maliyet yerine düştü?" ' +
      'sorusu tek tablodan cevaplanır — eskiden {{BSEG}} + {{BSIK}} + CO tablolarını birleştirmek gerekiyordu.\n\n' +
      'Ayrıca {{BSEG}}’in 999 kalem sınırı {{ACDOCA}}’da yoktur; çok kalemli toplu faturalar sorunsuz kaydedilir.',

    kalkanTcodes:[
      { eski:'{{FK01}} / {{FK02}} / {{FK03}}', yeni:'{{BP}}', not:'Satıcı ana verisi — kaldırıldı' },
      { eski:'{{XK01}} / {{XK02}}', yeni:'{{BP}}', not:'BP işlemine yönlendirir' },
      { eski:'MK01 / MK02', yeni:'{{BP}}', not:'Satın alma tarafı da BP üzerinden' },
      { eski:'F-43', yeni:'{{FB60}}', not:'Klasik ekran çalışır ama FB60 önerilir' },
    ],

    fiori:[
      { ad:'Create Supplier Invoice', aciklama:'{{FB60}}/{{MIRO}} yerine; sipariş referansı ve hesap önerisi tek ekranda.' },
      { ad:'Manage Supplier Line Items', aciklama:'{{FBL1N}} yerine; süzme, gruplama ve toplu blok kaldırma destekler.' },
      { ad:'Manage Automatic Payments', aciklama:'{{F110}} önerisini görsel olarak yönetir; kalem bazında dâhil/hariç bırakma kolaylaşır.' },
      { ad:'Supplier Invoices List', aciklama:'Bloklu ve onay bekleyen faturaların iş listesi.' },
      { ad:'Days Payable Outstanding', aciklama:'Ortalama ödeme süresini analiz eder — nakit yönetimi göstergesi.' },
      { ad:'Maintain Business Partner', aciklama:'{{BP}} — satıcı ana verisinin tek kapısı.' },
    ],

    compatibilityViews:[
      '{{BSIK}}, {{BSAK}} — satıcı açık/kapalı kalem indeksleri artık fiziksel tablo değil, {{ACDOCA}} üzerinden üretilen görünümler.',
      '{{LFC1}} — satıcı dönemsel bakiyeleri de view’e dönüştü.',
      'Bu view’lere **INSERT/UPDATE yapılamaz**. {{BSIK}}’e doğrudan yazan eski Z-programları geçişte bozulur; taranmalıdır.',
      '{{LFA1}} ve {{LFB1}} fiziksel tablo olarak **duruyor** — ama {{BP}} tarafından doldurulur; doğrudan yazma CVI senkronizasyonunu bozar.',
    ],

    performans:
      'Açık kalem sorguları {{ACDOCA}} üzerinden çalıştığı için büyük satıcı portföylerinde belirgin hızlanma vardır. ' +
      '{{F110}} öneri üretimi de hızlanır — eskiden {{BSIK}} taraması darboğazdı. ' +
      'Buna karşılık {{uyumluluk-view}} üzerinden çalışan eski özel raporlar, doğrudan {{ACDOCA}} sorgulayan ' +
      'yeni raporlardan yavaştır; performans şikâyeti gelirse ilk bakılacak yer budur.',

    bestPractices:[
      'Yeni raporları {{BSIK}} yerine {{ACDOCA}} veya CDS view üzerine kur.',
      'S/4HANA geçişinden önce satıcı mükerrerlerini temizle; {{BP}}’ye taşındıktan sonra birleştirmek çok daha zordur.',
      'Ödeme koşullarını sadeleştir. Yıllar içinde biriken 80 farklı ödeme koşulu geçişte gözden geçirilmelidir.',
      'Fatura girişini mümkün olduğunca {{MIRO}}’ya taşı: {{uc-yonlu-eslestirme}} otomatik kontrol sağlar, {{FB60}} sağlamaz.',
      '{{gr-ir}} hesabını geçişten önce temizle. Kirli açık kalemler yeni sisteme taşınır ve orada çözmek zorlaşır.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Baştan sona bir satın alma: siparişten ödemeye 100.000 TL’lik hammadde',
    hikaye:
      '**Marmara Tekstil A.Ş.** (şirket kodu 1000) Ege Kimya’dan 100 varil boya alıyor. ' +
      'Sipariş açılıyor, mal geliyor, fatura geliyor — ama faturada **fiyat farkı** çıkıyor. ' +
      'Bu senaryo, gerçek hayatta en sık yaşanan AP akışını, fark yönetimi dâhil, adım adım gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 — Marmara Tekstil A.Ş.' },
      { k:'Satıcı', v:'V-4001 Ege Kimya A.Ş. · mutabakat hesabı 320000' },
      { k:'Ödeme koşulu', v:'ZB02 — 30 gün net, 10 gün içinde %2 iskonto' },
      { k:'Sipariş', v:'100 varil × 1.000 TL = 100.000 TL' },
      { k:'Dönem', v:'Eylül 2026' },
      { k:'Fiyat farkı toleransı', v:'%3 veya 500 TL (hangisi küçükse)' },
    ],

    adimlar:[
      { baslik:'Satınalma siparişi açılır — FI kaydı yok', tcode:'ME21N',
        aciklama:'Satın alma 100 varil boya siparişi açıyor. Bu bir **taahhüttür**, borç değildir; ' +
                 'bu yüzden hiçbir muhasebe kaydı oluşmaz.',
        girdi:[
          { alan:'Satıcı', deger:'V-4001 Ege Kimya A.Ş.' },
          { alan:'Malzeme / Miktar', deger:'BOYA-001 · 100 varil' },
          { alan:'Net fiyat', deger:'1.000 TL / varil' },
          { alan:'Teslim tarihi', deger:'05.09.2026' },
        ],
        tabloEtkisi:[
          { tablo:'EKKO', ne:'Sipariş başlığı: 4500002345, satıcı V-4001' },
          { tablo:'EKPO', ne:'Kalem 10: 100 varil × 1.000 TL, değerleme sınıfı 3000' },
        ],
        not:'**FI belgesi yok.** "Sipariş verdik, borcumuz oluştu mu?" sorusunun cevabı hayırdır. Borç mal teslim alınınca doğar.' },

      { baslik:'Mal girişi yapılır — ilk FI kaydı doğar', tcode:'MIGO',
        aciklama:'Depo 100 varili teslim alıp sisteme kaydediyor. Muhasebeci bu kayıttan habersizdir ' +
                 'ama FI’da ilk belge burada oluşur.',
        girdi:[
          { alan:'Hareket türü', deger:'101 — Siparişe mal girişi' },
          { alan:'Satınalma siparişi', deger:'4500002345, kalem 10' },
          { alan:'Miktar', deger:'100 varil (tam teslimat)' },
          { alan:'Belge tarihi', deger:'05.09.2026' },
        ],
        fis:{ baslik:'Belge 5000001234 — Mal girişi', belgeTuru:'WE', tarih:'05.09.2026',
          satirlar:[
            { hesap:'153', ad:'Ticari mallar (stok)', borc:100000, not:'{{OBYC}} → **BSX**' },
            { hesap:'159', ad:'GR/IR hesabı', alacak:100000, not:'{{OBYC}} → **WRX**' },
          ], not:'Değer **sipariş fiyatından** hesaplandı (100 × 1.000). Fatura henüz gelmediği için gerçek fiyat bilinmiyor.' },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'Malzeme belgesi kalemi, hareket türü 101' },
          { tablo:'EKBE', ne:'Sipariş geçmişine satır eklendi: `VGABE` = **1** (mal girişi), 100 varil' },
          { tablo:'BKPF', ne:'`AWTYP` = MKPF, `AWKEY` = malzeme belgesi → FI belgesinin kaynağı izlenebilir' },
          { tablo:'BSIS', ne:'159 hesabında yeni **açık kalem** (alacak 100.000)' },
        ] },

      { baslik:'Fatura gelir — fiyat farkı çıkar', tcode:'MIRO',
        aciklama:'Satıcı 100 varil için **1.050 TL/varil** fatura kesmiş. Sipariş 1.000 TL’ydi. ' +
                 'Toplam fark 5.000 TL — tolerans %3 (3.000 TL) olduğu için **tolerans dışı**.',
        girdi:[
          { alan:'Fatura tarihi', deger:'12.09.2026' },
          { alan:'Referans (satıcı fatura no)', deger:'EGE-2026-4471' },
          { alan:'Brüt tutar', deger:'126.000 TL (105.000 + %20 KDV)' },
          { alan:'Satınalma siparişi', deger:'4500002345 → kalemler otomatik geldi' },
          { alan:'Sistem önerisi', deger:'100 varil × 1.000 = 100.000 TL' },
          { alan:'Elle düzeltilen', deger:'100 varil × 1.050 = 105.000 TL' },
        ],
        fis:{ baslik:'Belge 5100000456 (MM) / 1900000234 (FI) — Satıcı faturası', belgeTuru:'RE', tarih:'12.09.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR hesabı', borc:100000, not:'Mal girişindeki alacak kapanıyor — **sipariş fiyatıyla**' },
            { hesap:'711', ad:'Fiyat farkı', borc:5000, not:'{{OBYC}} → **PRD** · stok standart fiyatlıysa buraya' },
            { hesap:'191', ad:'İndirilecek KDV', borc:21000 },
            { hesap:'320', ad:'Satıcılar — V-4001', alacak:126000, not:'Borç artık satıcıda' },
          ], not:'Dikkat: {{gr-ir}} **100.000** ile kapandı, 105.000 ile değil. Aradaki 5.000 TL fiyat farkı hesabına gitti. ' +
                 'Malzeme hareketli ortalama fiyatlıysa fark stoka eklenirdi (153 hesabına).' },
        tabloEtkisi:[
          { tablo:'RBKP', ne:'MM fatura başlığı 5100000456; `ZLSPR` = **R** (fiyat farkı bloğu)' },
          { tablo:'RSEG', ne:'Fatura kalemi: sipariş 4500002345 kalem 10, 105.000 TL' },
          { tablo:'EKBE', ne:'Sipariş geçmişine satır: `VGABE` = **2** (fatura), 100 varil / 105.000 TL' },
          { tablo:'BSIK', ne:'Satıcı açık kalemi 126.000 TL — **ama ödeme bloklu**' },
          { tablo:'BSIS', ne:'159 hesabındaki açık kalem kapandı' },
        ],
        not:'Fatura **kaydedildi** ama ödemeye bloklandı. Bu bir hata değil, tasarımdır: sistem farkı ' +
             'insan onayına bırakıyor.' },

      { baslik:'Fark araştırılır ve blok kaldırılır', tcode:'MRBR',
        aciklama:'AP uzmanı satın almaya soruyor: fiyat artışı Eylül başında sözleşmeyle kabul edilmiş ' +
                 'ama sipariş güncellenmemiş. Fark **haklı** — blok kaldırılıyor.',
        girdi:[
          { alan:'Şirket kodu', deger:'1000' },
          { alan:'Blok sebebi', deger:'Fiyat farkı (R) — 5.000 TL' },
          { alan:'Karar', deger:'Sözleşme teyit edildi → serbest bırak' },
        ],
        tabloEtkisi:[
          { tablo:'RBKP', ne:'`ZLSPR` temizlendi' },
          { tablo:'BSIK', ne:'Kalem artık {{F110}} tarafından görülebilir' },
        ],
        not:'Blok kalkmadan {{F110}} bu faturayı **hiç görmez**. "Faturayı girdim ama ödeme koşusunda çıkmadı" ' +
             'şikâyetlerinin bir numaralı sebebi budur.' },

      { baslik:'İskonto fırsatı kaçırılır', tcode:'FBL1N',
        aciklama:'Ödeme koşulu ZB02: 10 gün içinde ödenirse %2 iskonto. Fatura 12.09 tarihli, ' +
                 'iskonto son günü **22.09**. Blok araştırması 25.09’a kadar sürdü.',
        girdi:[
          { alan:'Kalem', deger:'126.000 TL · Vade 12.10.2026' },
          { alan:'İskonto son günü', deger:'22.09.2026 — **geçti**' },
          { alan:'Kaçırılan iskonto', deger:'105.000 × %2 = **2.100 TL**' },
        ],
        not:'Blok yönetimindeki gecikmenin somut maliyeti: 2.100 TL. Bu yüzden bloklu faturalar ' +
             '**günlük** takip edilmelidir, ödeme koşusundan önce değil.' },

      { baslik:'Ödeme çalıştırılır', tcode:'F110',
        aciklama:'12.10.2026 vadesi geldiğinde ödeme koşusu bu faturayı seçiyor ve ödüyor.',
        girdi:[
          { alan:'Çalıştırma tarihi / kimliği', deger:'12.10.2026 / AP01' },
          { alan:'Ödeme yöntemi', deger:'H — banka havalesi' },
          { alan:'Seçilen kalem', deger:'1900000234 · 126.000 TL' },
        ],
        fis:{ baslik:'Belge 2000000789 — Ödeme', belgeTuru:'KZ', tarih:'12.10.2026',
          satirlar:[
            { hesap:'320', ad:'Satıcılar — V-4001', borc:126000, not:'Açık kalem kapanıyor' },
            { hesap:'102', ad:'Bankalar (ara hesap)', alacak:126000 },
          ], not:'İskonto süresi geçtiği için indirim uygulanmadı; tam tutar ödendi.' },
        tabloEtkisi:[
          { tablo:'REGUH', ne:'Ödeme başlığı: V-4001, 126.000 TL, ödeme belgesi 2000000789' },
          { tablo:'REGUP', ne:'Bu ödemenin 1900000234 numaralı faturayı kapattığı kaydı' },
          { tablo:'BSIK', ne:'Kalem buradan **silindi**' },
          { tablo:'BSAK', ne:'Kapatılmış kalem olarak eklendi, `AUGBL` = 2000000789' },
        ] },

      { baslik:'Ay sonu kontrolü — GR/IR temiz mi?', tcode:'FBL3N',
        aciklama:'Eylül kapanışında 159 GR/IR hesabı kontrol ediliyor. Bu sipariş için mal girişi ' +
                 've fatura eşleşti, kalem kapandı.',
        girdi:[
          { alan:'Hesap', deger:'159000 · Açık kalemler · 30.09.2026' },
          { alan:'Bu sipariş için', deger:'Kalem yok — eşleşti ve kapandı ✓' },
          { alan:'Diğer siparişler', deger:'6 açık kalem kaldı → {{F.19}} ile yeniden sınıflanacak' },
        ],
        not:'{{gr-ir}} kalemleri {{F.13}} ile otomatik kapatılır; eşleşme ölçütü sipariş numarasından ' +
             'türetilen atama (`ZUONR`) alanıdır.' },
    ],

    sonuc:
      '**Süreç özeti:** sipariş (FI kaydı yok) → mal girişi (stok + GR/IR) → fatura (GR/IR kapandı, ' +
      'satıcı borçlandı, fark PRD’ye gitti) → blok çözümü → ödeme (borç kapandı).\n\n' +
      '**Üç kritik ders:**\n\n' +
      '**1.** {{gr-ir}} her zaman **sipariş fiyatıyla** kapanır. Fatura farkı ayrı bir hesaba gider — ' +
      'malzemenin fiyat kontrolü standart ise fiyat farkı hesabına (PRD), hareketli ortalama ise stoka.\n\n' +
      '**2.** Fiyat farkı bloğu bir arıza değil, **kontrol mekanizmasıdır**. Ama blok yönetimi yavaşsa ' +
      'iskonto kaçar — bu senaryoda 2.100 TL. Bloklu faturalar günlük takip edilmelidir.\n\n' +
      '**3.** Bir AP sorununu çözerken sırayla sor: **fatura hangi yoldan geldi ({{FB60}} mi {{MIRO}} mu)?** → ' +
      '**blok var mı ({{MRBR}}, {{FBL1N}})?** → **satıcı ana verisinde blok var mı ({{BP}})?** → ' +
      '**vade gelmiş mi?** Bu dört soru AP şikâyetlerinin neredeyse tamamını çözer.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'AP, şirketin satıcılara olan borçlarını yöneten {{muavin-defter}}dir; ana muhasebeye {{mutabakat-hesabi}} ile yansır.',
      'Muhasebe zinciri üç adımdır: **fatura** (borç doğar) → **ödeme** (para çıkar) → **{{kapatma}}** (eşleşir).',
      'Faturanın iki yolu vardır: siparişsiz **{{FB60}}** (hesabı kullanıcı seçer) ve siparişli **{{MIRO}}** (hesabı {{OBYC}} belirler).',
      '{{gr-ir}} hesabı mal girişi ile fatura arasındaki zaman farkını taşır ve her zaman **sipariş fiyatıyla** kapanır.',
      '{{uc-yonlu-eslestirme}} farkı tolerans dışındaysa fatura kaydedilir ama **ödemeye bloklanır** ({{MRBR}} ile açılır).',
      'Satıcı ana verisi ({{LFB1}}) vadeyi, mutabakat hesabını, ödeme yöntemini ve bloğu belirler — kullanıcı bunları girmez.',
      'Açık kalemler {{BSIK}}’te, kapatılanlar {{BSAK}}’tadır; S/4HANA’da ikisi de {{uyumluluk-view}}dir.',
      '{{avans}} normal borçtan {{ozel-ana-muhasebe-gostergesi}} ile ayrılır ve bilançoda **varlık** olarak durur.',
    ],

    onemliNoktalar:[
      '**"FB60 ile MIRO farkı nedir?"** FB60 siparişsizdir, hesabı kullanıcı seçer, GR/IR devreye girmez. MIRO siparişlidir, hesabı {{OBYC}} belirler, GR/IR kapanır, üç yönlü eşleştirme yapılır. **En sık sorulan AP sorusudur.**',
      '**"Sipariş açıldığında FI kaydı oluşur mu?"** Hayır. Sipariş bir taahhüttür; borç mal/hizmet teslim alınınca doğar.',
      '**"GR/IR hangi tutarla kapanır?"** Her zaman **sipariş fiyatıyla**. Fatura farkı ayrı hesaba (PRD veya stok) gider.',
      '**"Fatura bloklu, F110 görmüyor. Neden?"** Blok kalkmadan ödeme programı kalemi seçmez. {{MRBR}} ile serbest bırakılır.',
      '**"Ödeme neden yapılmadı?"** Dört ihtimal: kalem bazında ödeme bloğu, satıcı ana verisinde blok ({{LFB1}} `ZAHLS`), vade gelmemiş, ya da ödeme yöntemi ({{LFB1}} `ZWELS`) uyumsuz.',
      '**"Kısmi ile kalan kapatma farkı?"** Kısmi: orijinal kalem açık kalır, vade korunur. Kalan: orijinal kapanır, yeni kalem üretilir ve **vade bugünden başlar** — yaşlandırmayı bozar.',
      '**"Avans neden ayrı hesapta?"** Avans bir borç değil **alacaktır**; bilançoda varlık tarafında gösterilmelidir. {{ozel-ana-muhasebe-gostergesi}} bunu sağlar.',
      '**"MIRO’da hangi tablolar yazılır?"** {{RBKP}}/{{RSEG}} (MM fatura), {{BKPF}}/{{BSEG}}/{{ACDOCA}} (FI belgesi), {{EKBE}} (sipariş geçmişi), {{BSIK}} (açık kalem).',
      '**"S/4HANA’da AP’de ne değişti?"** Satıcı ana verisi {{BP}}’ye taşındı; {{BSIK}}/{{BSAK}} {{uyumluluk-view}}’ine dönüştü; terminoloji Vendor → Supplier oldu.',
    ],

    sikHatalar:[
      { hata:'Siparişli faturayı {{FB60}} ile girmek.', dogru:'{{MIRO}} kullanılmalı. FB60 ile girilirse {{gr-ir}} kapanmaz ve hesap sonsuza kadar açık kalır.' },
      { hata:'Referans alanını (`XBLNR`) boş bırakmak.', dogru:'Satıcının fatura numarası yazılır — mükerrer fatura kontrolünün tek dayanağıdır.' },
      { hata:'Bloklu faturayı iptal edip yeniden girmek.', dogru:'Blok bir kontroldür. Fark araştırılır, haklıysa {{MRBR}} ile serbest bırakılır.' },
      { hata:'Uyuşmazlıklı faturayı iptal etmek.', dogru:'Ödeme bloğu konur. Fatura kayıtta kalır, yaşlandırmada görünür ama ödenmez.' },
      { hata:'{{OB52}}’de sadece S hesap tipini açmak.', dogru:'Satıcı kaydı için **K** hesap tipi de açılmalıdır; hesap tipleri ayrı yönetilir.' },
      { hata:'Yaşlandırmayı düzeltmek için kalan kapatma kullanmak.', dogru:'Kalan kapatma vadeyi sıfırlar ve gecikmiş borcu "yeni" gösterir. Vade korunmalıysa kısmi kapatma kullanılır.' },
      { hata:'{{gr-ir}} bakiyesini yıllarca biriktirmek.', dogru:'Aylık {{F.19}} ile analiz, kalıcı farklar için {{MR11}} ile temizlik yapılır.' },
      { hata:'MIRO’daki MM fatura numarasını {{FB03}}’te aramak.', dogru:'İki ayrı numara vardır. MM numarası için {{MIR4}}, FI numarası için {{FB03}} kullanılır.' },
      { hata:'Satıcı ana verisini açan kişinin ödeme de yapabilmesi.', dogru:'Görevler ayrılığı zorunludur — aksi hâlde sahte satıcı açıp kendine ödeme yapmak mümkün olur.' },
      { hata:'Avans kalemlerini {{F-53}}’te bulamayınca yok sanmak.', dogru:'Seçim ekranında **"Özel G/L işlemleri"** kutusu işaretlenmelidir.' },
    ],

    ipuclari:[
      'Bir AP sorununu çözerken dört soruyu sırayla sor: **hangi yoldan geldi?** → **kalem bazında blok var mı?** → ' +
      '**satıcıda blok var mı?** → **vade gelmiş mi?** Şikâyetlerin neredeyse tamamı bu dördünden biridir.',
      '{{ME23N}} → *Sipariş geçmişi* sekmesi, MIRO sorunlarının %80’ini tek bakışta çözer: kaç mal girişi var, ' +
      'kaç fatura girilmiş, ne kadar kalmış.',
      '{{FBL1N}} düzenine **vade, ödeme bloğu ve iskonto tarihi** sütunlarını ekleyip varsayılan yap.',
      'Bloklu faturaları **günlük** kontrol et, ödeme koşusundan önce değil. Gecikme doğrudan {{iskonto}} kaybıdır.',
      'Yeni satıcıyı **ödeme bloklu** aç, ilk fatura onayından sonra bloğu kaldır. Maliyeti sıfır, koruması yüksek.',
      '{{CDPOS}} üzerinden `LFBK` (satıcı banka hesabı) değişikliklerini periyodik denetle — ödeme dolandırıcılığının ' +
      'en yaygın girişidir.',
    ],

    quiz:[
      { soru:'Satınalma siparişi açıldığında hangi muhasebe kaydı oluşur?',
        secenekler:[
          'Stok borç / Satıcı alacak',
          'Hiçbir FI kaydı oluşmaz',
          'GR/IR borç / Satıcı alacak',
          'Gider borç / Banka alacak',
        ], dogru:1,
        aciklama:'Sipariş bir **taahhüttür**, yükümlülük değil. Muhasebede borç mal/hizmet teslim alındığında doğar. ' +
                 'Sipariş yalnızca {{EKKO}}/{{EKPO}} tablolarına yazılır. İlk FI kaydı {{MIGO}} ile mal girişinde oluşur.' },

      { soru:'Sipariş fiyatı 1.000 TL/adet, fatura 1.050 TL/adet geldi. 100 adet için GR/IR hesabı hangi tutarla kapanır?',
        secenekler:['105.000 TL','100.000 TL','5.000 TL','126.000 TL'],
        dogru:1,
        aciklama:'{{gr-ir}} her zaman **mal girişindeki değerle**, yani sipariş fiyatıyla kapanır (100 × 1.000 = 100.000). ' +
                 'Aradaki 5.000 TL fiyat farkıdır ve {{OBYC}} → **PRD** işlem anahtarındaki hesaba gider ' +
                 '(malzeme hareketli ortalama fiyatlıysa stoka eklenir).' },

      { soru:'Faturayı girdin ama {{F110}} ödeme koşusunda çıkmadı. Aşağıdakilerden hangisi **sebep olamaz**?',
        secenekler:[
          'Kalemde ödeme bloğu var',
          'Satıcı ana verisinde ödeme bloğu var',
          'Faturanın vadesi henüz gelmemiş',
          'Faturada maliyet yeri girilmemiş',
        ], dogru:3,
        aciklama:'Maliyet yeri CO ataması içindir; ödeme seçimini etkilemez (zaten girilmeden fatura kaydedilemezdi). ' +
                 'Diğer üçü klasik sebeplerdir. Dördüncü bir sebep: satıcının {{odeme-yontemi}} listesi ({{LFB1}} `ZWELS`) ' +
                 'koşuda kullanılan yöntemi içermiyor olabilir.' },

      { soru:'{{FB60}} ile {{MIRO}} arasındaki temel fark nedir?',
        secenekler:[
          'FB60 daha hızlıdır, başka fark yoktur',
          'FB60 siparişsizdir ve hesabı kullanıcı seçer; MIRO siparişlidir ve hesabı OBYC belirler',
          'MIRO sadece hizmet faturaları içindir',
          'FB60 KDV hesaplamaz',
        ], dogru:1,
        aciklama:'{{FB60}} siparişsiz faturalar içindir (kira, danışmanlık); gider hesabını kullanıcı seçer, {{gr-ir}} devreye girmez. ' +
                 '{{MIRO}} siparişe dayanır; {{uc-yonlu-eslestirme}} yapar, hesapları {{OBYC}} belirler, GR/IR kapanır ve ' +
                 'ek olarak {{RBKP}}/{{RSEG}} tablolarına yazar.' },

      { soru:'120.000 TL’lik borcun 80.000 TL’si ödendi ve **kısmi kapatma** kullanıldı. Sonuç nedir?',
        secenekler:[
          'Orijinal kalem kapandı, 40.000 TL’lik yeni kalem oluştu',
          'Orijinal kalem açık kaldı, ödeme ayrı bir açık kalem olarak duruyor',
          'Borç tamamen kapandı',
          '40.000 TL gider yazıldı',
        ], dogru:1,
        aciklama:'{{kismi-kapatma}}da orijinal kalem **açık kalır** ve ödeme ayrı bir açık kalem olarak durur; ' +
                 'orijinal vade korunduğu için {{yaslandirma}} bozulmaz. {{kalan-kapatma}} ise orijinali kapatıp ' +
                 '40.000 TL’lik yeni kalem üretir — o kalemin vadesi bugünden başlar.' },

      { soru:'Bir satıcıya ödenen avans neden 320 Satıcılar hesabına yazılmaz?',
        secenekler:[
          'Teknik olarak mümkün değildir',
          'Avans bir alacaktır ve bilançoda ayrı gösterilmelidir; {{ozel-ana-muhasebe-gostergesi}} kullanılır',
          'KDV hesaplanamadığı için',
          'Satıcı ana verisi eksik olduğu için',
        ], dogru:1,
        aciklama:'{{avans}} henüz bir borç değil, satıcıdan mal/hizmet **alacağıdır**. Bilançoda varlık tarafında ' +
                 'gösterilmelidir. {{ozel-ana-muhasebe-gostergesi}} (`UMSKZ`) kaydı alternatif bir mutabakat hesabına ' +
                 'yönlendirir. Fatura gelince {{F-54}} ile normal borca mahsup edilir.' },

      { soru:'{{MIRO}} kaydedildiğinde ekranda görünen belge numarası neyi ifade eder?',
        secenekler:[
          'FI belge numarasını',
          'MM fatura belgesi numarasını ({{RBKP}})',
          'Satınalma siparişi numarasını',
          'Malzeme belgesi numarasını',
        ], dogru:1,
        aciklama:'{{MIRO}} **iki** belge üretir: MM fatura belgesi ({{RBKP}}/{{RSEG}}) ve FI belgesi ({{BKPF}}/{{BSEG}}). ' +
                 'Ekranda MM numarası görünür. Bu numarayı {{FB03}}’te aramak sonuç vermez; {{MIR4}} ile MM faturası açılıp ' +
                 'oradan FI belgesine geçilir.' },

      { soru:'S/4HANA’da {{BSIK}} tablosuna doğrudan yazan eski bir Z-programı ne olur?',
        secenekler:[
          'Normal çalışmaya devam eder',
          'Bozulur — BSIK artık yazma yapılamayan bir {{uyumluluk-view}}dir',
          'Otomatik olarak ACDOCA’ya yönlendirilir',
          'Sadece yavaşlar',
        ], dogru:1,
        aciklama:'S/4HANA’da {{BSIK}} fiziksel tablo değil, {{ACDOCA}} üzerinden üretilen bir görünümdür. ' +
                 'Okuma yapan programlar çalışır, **INSERT/UPDATE yapanlar bozulur**. Geçiş projesinde ' +
                 'bu tablolara yazan özel programları taramak zorunlu bir hazırlık adımıdır.' },
    ],

    flashcards:[
      { on:'AP’de muhasebe zinciri kaç adımdır?', arka:'**Üç adım:**\n1. Fatura → borç doğar (gider/stok borç, satıcı alacak)\n2. Ödeme → para çıkar (satıcı borç, banka alacak)\n3. Kapatma → fatura ile ödeme eşleşir\n\n2 ve 3 genelde aynı işlemde olur (F-53, F110).' },
      { on:'FB60 ile MIRO arasındaki fark nedir?', arka:'**FB60:** siparişsiz · hesabı kullanıcı seçer · GR/IR yok · belge türü KR\n\n**MIRO:** siparişli · hesabı OBYC belirler · GR/IR kapanır · üç yönlü eşleştirme · belge türü RE · ayrıca RBKP/RSEG yazar' },
      { on:'Satınalma siparişi açıldığında FI kaydı oluşur mu?', arka:'**Hayır.**\n\nSipariş bir *taahhüttür*, yükümlülük değil. Borç mal/hizmet teslim alınınca doğar.\n\nİlk FI kaydı MIGO (mal girişi) ile oluşur: stok borç / GR-IR alacak.' },
      { on:'GR/IR hesabı hangi tutarla kapanır?', arka:'**Her zaman sipariş fiyatıyla** (mal girişindeki değerle).\n\nFatura farklı gelirse aradaki fark:\n• Standart fiyatlı malzeme → **PRD** fiyat farkı hesabına\n• Hareketli ortalama → **stoka** eklenir' },
      { on:'Fatura ödemeye neden bloklanır?', arka:'Üç yönlü eşleştirmede **tolerans dışı fark** bulunduğu için: fiyat farkı, miktar farkı veya teslim tarihi farkı.\n\nBu bir hata değil, **kontrol mekanizmasıdır**. MRBR ile araştırılıp serbest bırakılır.' },
      { on:'"Fatura girdim ama F110 görmüyor" — sebepleri?', arka:'1. Kalemde ödeme bloğu (ZLSPR)\n2. Satıcıda ödeme bloğu (LFB1-ZAHLS)\n3. Vade gelmemiş\n4. Ödeme yöntemi uyumsuz (LFB1-ZWELS)\n\nMIRO faturasıysa: MM blok (RBKP-ZLSPR) — MRBR ile açılır.' },
      { on:'Kısmi kapatma ile kalan kapatma farkı nedir?', arka:'**Kısmi:** orijinal kalem açık kalır, ödeme ayrı açık kalem olur. **Vade korunur** → yaşlandırma bozulmaz.\n\n**Kalan:** orijinal kapanır, kalan için yeni kalem üretilir. **Vade bugünden başlar** → yaşlandırma bozulur.' },
      { on:'Avans neden normal mutabakat hesabına yazılmaz?', arka:'Avans bir borç değil, satıcıdan **alacaktır**. Bilançoda varlık tarafında gösterilmelidir.\n\nÖzel ana muhasebe göstergesi (UMSKZ) kaydı alternatif hesaba yönlendirir.\n\nAkış: F-47 talep → F-48 ödeme → F-54 mahsup.' },
      { on:'AP’nin dört ana tablosu nedir?', arka:'**LFA1** satıcı genel · **LFB1** satıcı şirket kodu (AKONT, ZTERM, ZWELS, ZAHLS)\n\n**BSIK** açık kalemler · **BSAK** kapatılmış kalemler\n\nS/4HANA’da BSIK/BSAK compatibility view’dir.' },
      { on:'İskonto neden net tutar üzerinden hesaplanır?', arka:'İskonto malın bedeli üzerinden verilir, KDV üzerinden değil.\n\n120.000 TL’lik faturada %2 iskonto = 100.000 × %2 = **2.000 TL** (2.400 değil).\n\nİskonto kadar indirilecek KDV de düzeltilir.' },
      { on:'MIRO kaç belge numarası üretir?', arka:'**İki:**\n• MM fatura belgesi (RBKP/RSEG) — ekranda görünen\n• FI belgesi (BKPF/BSEG) — farklı numara\n\nİkisi AWKEY ile bağlanır. MM numarası FB03’te aranmaz; MIR4 kullanılır.' },
      { on:'OBYC’de AP açısından önemli işlem anahtarları nelerdir?', arka:'**BSX** → stok hesabı\n**WRX** → GR/IR hesabı\n**PRD** → fiyat farkı\n**FR1** → navlun karşılığı\n**KDM** → kur farkı\n\nHer biri değerleme sınıfıyla birlikte T030’da bir hesaba eşlenir.' },
    ],
  },

  },
});
