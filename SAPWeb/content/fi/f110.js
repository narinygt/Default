/* ==========================================================================
   content/fi/f110.js — "Automatic Payment Program (F110)" derin içeriği
   ========================================================================== */

SAP.registerTopic({
  id: 'f110',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Otomatik Ödeme Programı ({{F110}}), vadesi gelen borçları **toplu olarak seçen, öneri üreten, ' +
      'onaydan sonra ödemeyi kaydeden ve bankaya gönderilecek dosyayı oluşturan** programdır.\n\n' +
      'Tek bir çalıştırmada yüzlerce fatura seçilir, aynı satıcıya ait olanlar tek ödemede birleştirilir, ' +
      '{{iskonto}} fırsatları değerlendirilir, hangi bankadan ödeneceğine karar verilir ve ' +
      'ödeme dosyası üretilir. Elle yapılsa günler sürecek bir iş dakikalara iner.\n\n' +
      'F110’un ayırt edici özelliği **iki aşamalı** olmasıdır: önce **öneri (proposal)**, sonra ' +
      '**ödeme (payment run)**. Arada insan onayı vardır — çünkü buradan gerçek para çıkar.',

    neden:
      '**Hacim.** 300 faturayı elle {{F-53}} ile ödemek pratik değildir.\n\n' +
      '**Doğruluk.** Vade, {{iskonto}} süresi, {{odeme-blogu}} ve banka seçimi kurallarla yapılır; ' +
      'insan hatası ortadan kalkar.\n\n' +
      '**Nakit optimizasyonu.** Program her kalem için "bugün ödersem iskonto kazanır mıyım, ' +
      'yoksa vadeye kadar bekleyip nakitte mi kalsam?" hesabını yapar ve en kârlı günü seçer.\n\n' +
      '**Kontrol.** Öneri aşaması, para çıkmadan önce zorunlu bir denetim noktası yaratır.',

    sirketOnemi:
      'F110, şirketten para çıkışının ana kapısıdır. Bu yüzden hem **en çok kontrol gerektiren** ' +
      'hem de **en çok yapılandırma isteyen** FI işlemidir.\n\n' +
      'Danışmanlık açısından: F110’un kendisi basittir, zor olan {{FBZP}} yapılandırmasıdır. ' +
      '"F110 hiçbir kalem seçmiyor" veya "yanlış bankadan ödüyor" şikâyetlerinin cevabı ' +
      'neredeyse her zaman FBZP’dedir. Mülakatta "FBZP’de kaç adım vardır ve ne yaparlar?" ' +
      'sorusu, adayın gerçekten F110 kurup kurmadığını ölçer.',

    gercekHayat:
      'Bir üretim şirketi ayın 10’u ve 25’inde ödeme koşusu yapıyor. 25 Eylül sabahı hazine uzmanı ' +
      'F110’u açıyor: parametreleri giriyor, öneriyi çalıştırıyor.\n\n' +
      'Sistem 340 açık kalemi tarıyor: 47’si bloklu (dâhil edilmiyor), 61’i vadesi gelmemiş ' +
      '(bir sonraki koşuya kalıyor), 232’si ödenecek. Bunlardan 18’i iskonto süresindeymiş — ' +
      'program onları öne alıyor. 232 kalem, 89 satıcı için **89 ödemede** birleştiriliyor.\n\n' +
      'Muhasebe müdürü öneriyi inceliyor, uyuşmazlık çıkan 3 satıcıyı çıkarıyor. ' +
      'Ödeme çalıştırılıyor: 86 ödeme belgesi ve tek bir banka dosyası oluşuyor. ' +
      'Dosya bankaya gönderiliyor, ertesi gün ekstre geliyor ve {{banka-ara-hesabi}} kapanıyor.',

    muhasebeMantigi:
      'F110’un ürettiği kayıt son derece basittir:\n\n' +
      '**Satıcı borçlanır** (borç azalır) **/ Banka alacaklanır** (para çıkar).\n\n' +
      'Bunun yanında iki şey daha olur: **{{kapatma}}** — ödenen faturalar {{BSIK}}’ten {{BSAK}}’a taşınır; ' +
      've varsa **{{iskonto}}** geliri ile **{{kur-farki}}** ayrı satırlarda kaydedilir.\n\n' +
      'Genelde banka hesabına doğrudan değil {{banka-ara-hesabi}}na yazılır. Sebep: ' +
      'ödemeyi kaydettiğin an ile paranın gerçekten bankadan çıktığı an aynı değildir. ' +
      'Gerçek çıkış banka ekstresi geldiğinde ({{FEBAN}}) kesinleşir.',

    kavramlar: ['odeme-yontemi', 'odeme-blogu', 'ev-bankasi', 'banka-ara-hesabi', 'vade',
                'iskonto', 'kapatma', 'acik-kalem', 'avans', 'kur-farki'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'F110 tek bir işlem gibi görünse de **dört ayrı aşamadan** oluşur ve her aşama ayrı bir ' +
      'durum kaydeder. Bu aşamaları ayırt etmek, hata teşhisinin yarısıdır: ' +
      'sorun parametrelerde mi, öneride mi, ödemede mi, yoksa dosya üretiminde mi?',

    roller:[
      { rol:'AP muhasebe uzmanı', gorev:'Koşu öncesi hazırlık: bloklu faturaları çözer ({{MRBR}}), uyuşmazlıkları kapatır.' },
      { rol:'Hazine / Finans uzmanı', gorev:'Parametreleri girer, öneriyi çalıştırır, nakit durumuna göre inceler.' },
      { rol:'Muhasebe müdürü', gorev:'Öneriyi **onaylar**. Bu, para çıkmadan önceki son kontrol noktasıdır.' },
      { rol:'Hazine', gorev:'Ödemeyi çalıştırır, banka dosyasını üretir ve bankaya gönderir.' },
      { rol:'Banka', gorev:'Dosyayı işler, ödemeleri gerçekleştirir, ekstre gönderir.' },
      { rol:'AP muhasebe', gorev:'Ekstreyi işler ({{FEBAN}}), {{banka-ara-hesabi}}nı kapatır.' },
      { rol:'FI danışmanı', gorev:'{{FBZP}} yapılandırması: şirket kodu ayarları, ödeme yöntemleri, banka belirleme, ödeme ortamı.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'F110 — dört aşamalı ödeme koşusu',
      adimlar:[
        { ic:'🧹', rol:'AP muhasebe', baslik:'Koşu öncesi hazırlık',
          aciklama:'Bloklu faturalar çözülür ({{MRBR}}), {{odeme-blogu}} olanlar gözden geçirilir, ' +
                   'ödeme yöntemi eksik satıcılar tamamlanır.',
          cikti:'Temiz ödeme havuzu', ok:'koşu açılır' },
        { ic:'⚙️', rol:'Hazine', baslik:'1. Parametreler girilir',
          aciklama:'Çalıştırma tarihi + kimlik (bu ikisi koşuyu benzersiz kılar), şirket kodu, ' +
                   '{{odeme-yontemi}}, sonraki ödeme tarihi ve satıcı aralığı.',
          cikti:'Parametre kaydı ({{REGUV}})', ok:'öneri çalıştırılır' },
        { ic:'📋', rol:'Sistem', baslik:'2. Öneri (proposal) üretilir',
          aciklama:'Vadesi gelen kalemler seçilir, satıcı bazında gruplanır, banka belirlenir. ' +
                   '**Hiçbir muhasebe kaydı yapılmaz** — {{REGUH}}’a `XVORL = X` ile yazılır.',
          cikti:'Öneri listesi + istisna listesi', ok:'incelenir' },
        { ic:'👁️', rol:'Muhasebe müdürü', baslik:'3. Öneri incelenir ve düzenlenir',
          aciklama:'Kalem çıkarılabilir, bloklanabilir, ödeme yöntemi veya bankası değiştirilebilir. ' +
                   '**İstisna listesi** en önemli çıktıdır: neden ödenmeyecekleri gösterir.',
          cikti:'Onaylanmış öneri', ok:'onay verilir' },
        { ic:'💸', rol:'Hazine', baslik:'4. Ödeme çalıştırılır (payment run)',
          aciklama:'**Muhasebe kayıtları burada oluşur:** satıcı borçlanır, banka alacaklanır, ' +
                   'faturalar kapatılır. Öneri kayıtları gerçek ödemeye dönüşür.',
          cikti:'Ödeme belgeleri + {{BSAK}} kayıtları', ok:'dosya üretilir' },
        { ic:'📄', rol:'Sistem', baslik:'5. Ödeme ortamı üretilir',
          aciklama:'{{FBPM}} veya klasik program banka dosyasını (ödeme talimatı) oluşturur; ' +
                   'çek kullanılıyorsa çek numaraları atanır ({{PAYR}}).',
          cikti:'Banka dosyası / çekler', ok:'bankaya gider' },
        { ic:'🏦', rol:'AP muhasebe', baslik:'6. Banka ekstresi işlenir',
          aciklama:'{{FEBAN}} ile ekstre işlenir; {{banka-ara-hesabi}} kapatılır ve gerçek banka hesabı çalışır.',
          cikti:'Mutabık banka hesabı' },
      ],
    },

    adimlar:[
      { rol:'AP muhasebe', eylem:'Blokları çözer, havuzu temizler', sistem:'{{MRBR}}, {{FBL1N}}, {{FB09}}' },
      { rol:'Hazine', eylem:'Parametreleri girer', sistem:'{{F110}} → Parametre sekmesi → {{REGUV}}' },
      { rol:'Sistem', eylem:'Öneri üretir', sistem:'{{REGUH}}/{{REGUP}} — `XVORL` = X' },
      { rol:'Muhasebe müdürü', eylem:'Öneriyi inceler ve düzenler', sistem:'{{F110}} → Öneri düzenle' },
      { rol:'Hazine', eylem:'Ödemeyi çalıştırır', sistem:'{{F110}} → Ödeme çalıştır — belge türü KZ' },
      { rol:'Sistem', eylem:'Ödeme ortamını üretir', sistem:'{{FBPM}} veya RFFO* programları' },
      { rol:'AP muhasebe', eylem:'Banka ekstresini işler', sistem:'{{FEBAN}}, {{FF_5}}' },
    ],

    veriAkisi:{
      nereden:'{{BSIK}} açık kalemleri; {{LFB1}}’den {{odeme-yontemi}}, {{odeme-blogu}} ve ödeme koşulu; ' +
              '{{BP}}’den satıcı banka bilgisi (IBAN); {{FBZP}} yapılandırmasından banka belirleme kuralları.',
      nereye:'{{REGUH}}/{{REGUP}} ödeme kayıtlarına → FI ödeme belgelerine → {{BSAK}} kapatılmış kalemlere → ' +
             'banka dosyasına ve nakit akış tahminine.',
      tetikleyen:'Vadesi gelen borçlar ve şirketin ödeme takvimi.',
      sonraki:'Banka dosyasının gönderimi, ekstre mutabakatı ve {{banka-ara-hesabi}}nın kapatılması.',
    },

    notlar:[
      { tip:'warn', baslik:'Öneri ile ödeme arasındaki fark hayatidir', metin:
        '**Öneri hiçbir muhasebe kaydı yapmaz** — sadece "şunları ödeyeceğim" listesidir ve geri alınabilir ' +
        '(öneriyi silmek serbesttir). **Ödeme çalıştırması ise gerçek kayıt üretir** ve geri alınması ' +
        'zordur: her ödeme belgesi tek tek ters kaydedilmeli, kapatmalar {{FBRA}} ile geri alınmalıdır. ' +
        'Bu yüzden onay adımı atlanmamalıdır.' },
      { tip:'tip', baslik:'Çalıştırma tarihi + kimlik = benzersiz koşu', metin:
        'F110’da bir koşu **çalıştırma tarihi (`LAUFD`) + kimlik (`LAUFI`)** ikilisiyle tanımlanır. ' +
        'Aynı gün birden çok koşu yapılacaksa kimlikler farklı olmalıdır (AP01, AP02…). ' +
        'Kimlik serbest metindir ama disiplinli bir adlandırma, sonradan koşuyu bulmayı kolaylaştırır.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'F110’un ürettiği muhasebe kaydı sadedir ama üç varyasyonu vardır: **düz ödeme**, ' +
      '**iskontolu ödeme** ve **döviz ödemesi (kur farklı)**. Ayrıca birden çok faturanın ' +
      'tek ödemede birleşmesi, kayıtta nasıl göründüğünü değiştirir.',

    etkilenenHesaplar:[
      { hesap:'320 Satıcılar (mutabakat)', tur:'Bilanço — Kaynak', neden:'Ödemeyle **borçlanır** (borç azalır). Kapatılan faturaların toplamı kadar.' },
      { hesap:'102 Banka ara hesabı', tur:'Bilanço — Varlık', neden:'Ödeme kaydedildiğinde alacaklanır. Gerçek banka hesabı ekstre gelince çalışır.' },
      { hesap:'602 Alınan iskontolar', tur:'Gelir tablosu — Gelir', neden:'{{iskonto}} süresinde ödeme yapıldığında kazanılan indirim gelir yazılır.' },
      { hesap:'191 İndirilecek KDV', tur:'Bilanço — Varlık', neden:'İskonto tutarı kadar KDV de düzeltilir (iskonto matrahı ayarına göre).' },
      { hesap:'646 / 656 Kur farkı', tur:'Gelir tablosu', neden:'Döviz faturası, kaydedildiği kurdan farklı bir kurla ödendiğinde gerçekleşmiş {{kur-farki}} doğar.' },
      { hesap:'159 Verilen avanslar', tur:'Bilanço — Varlık', neden:'{{avans}} talebi ({{F-47}}) F110 tarafından ödenirse özel G/L hesabı çalışır.' },
    ],

    fisler:[
      { baslik:'Örnek 1 — Düz ödeme · üç fatura tek ödemede birleşti',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-4001 (fatura 1)', borc:60000, not:'Kapatıldı' },
          { hesap:'320', ad:'Satıcılar — V-4001 (fatura 2)', borc:45000, not:'Kapatıldı' },
          { hesap:'320', ad:'Satıcılar — V-4001 (fatura 3)', borc:35000, not:'Kapatıldı' },
          { hesap:'102', ad:'Banka ara hesabı', alacak:140000, not:'Tek ödeme' },
        ],
        not:'Üç fatura ayrı satırlar olarak kapatıldı ama bankaya **tek ödeme** çıktı. ' +
             '{{REGUP}} tablosu bu ödemenin hangi üç faturayı kapattığını tutar — mutabakatta bu bilgi hayatidir.' },

      { baslik:'Örnek 2 — İskontolu ödeme · %2 iskonto süresinde ödendi',
        belgeTuru:'KZ', tarih:'22.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-4001', borc:120000, not:'Borcun **tamamı** kapandı' },
          { hesap:'102', ad:'Banka ara hesabı', alacak:117600, not:'Fiilen ödenen tutar' },
          { hesap:'602', ad:'Alınan iskontolar (gelir)', alacak:2000, not:'100.000 × %2 (net üzerinden)' },
          { hesap:'191', ad:'İndirilecek KDV düzeltmesi', alacak:400, not:'İskonto kadar KDV düzeltmesi' },
        ],
        not:'Borcun tamamı (120.000) kapandı ama 117.600 TL ödendi. Fark **gelirdir**. ' +
             'F110 iskonto süresini {{odeme-kosulu}}’ndan bilir ve en kârlı günü kendisi seçer.' },

      { baslik:'Örnek 3 — Döviz ödemesi · kur değişmiş',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'EUR',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-7001 (10.000 EUR @ 35,00)', borc:350000, not:'Fatura kurundan' },
          { hesap:'102', ad:'Banka ara hesabı (10.000 EUR @ 36,20)', alacak:362000, not:'Ödeme günü kurundan' },
          { hesap:'656', ad:'Kambiyo zararı', borc:12000, not:'Gerçekleşmiş {{kur-farki}}' },
        ],
        not:'Döviz cinsinden borç **10.000 EUR** olarak kapandı — döviz tarafında fark yok. ' +
             'Fark yerel para birimindedir: fatura 35,00 kurundan kaydedilmişti, ödeme 36,20’den yapıldı. ' +
             'Aradaki 12.000 TL **gerçekleşmiş** kur farkıdır ve gider yazılır.' },

      { baslik:'Örnek 4 — Kısmi ödeme (öneride elle düzenlendi)',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-5001 (kısmi ödeme kalemi)', borc:40000 },
          { hesap:'102', ad:'Banka ara hesabı', alacak:40000 },
        ],
        not:'Öneri ekranında kalem tutarı elle 40.000’e düşürüldü. Orijinal 100.000 TL’lik kalem ' +
             '**açık kalmaya devam eder**; ödeme ayrı bir kalem olarak durur ({{kismi-kapatma}}).' },

      { baslik:'Ekstre geldiğinde — ara hesap kapanır ({{FEBAN}})',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banka ara hesabı', borc:140000, not:'Ara hesap kapatıldı' },
          { hesap:'102', ad:'Bankalar — gerçek hesap', alacak:140000, not:'Para fiilen çıktı' },
        ],
        not:'Nakit çıkışı **ancak burada** kesinleşir. {{banka-ara-hesabi}}nın bakiyesi sürekli büyüyorsa ' +
             'ya ekstre işlenmiyordur ya da ödemeler bankada gerçekleşmemiştir — her ikisi de araştırılmalıdır.' },
    ],

    tHesaplar:[
      { hesap:'Satıcılar (mutabakat)', kod:'320',
        borc:[{ ad:'F110 ödemeleri', tutar:260000 }],
        alacak:[{ ad:'Faturalar', tutar:380000 }],
        not:'Kalan = ödenmemiş borç' },
      { hesap:'Banka ara hesabı', kod:'102 (geçiş)',
        borc:[{ ad:'Ekstre mutabakatı', tutar:140000 }],
        alacak:[{ ad:'F110 ödemesi', tutar:140000 }],
        not:'Ekstre sonrası sıfırlanmalı' },
      { hesap:'Alınan iskontolar', kod:'602 (gelir)',
        borc:[],
        alacak:[{ ad:'Erken ödeme iskontoları', tutar:2000 }],
        not:'Yıl sonunda sıfırlanır' },
      { hesap:'Kambiyo zararı', kod:'656 (gider)',
        borc:[{ ad:'Döviz ödemesi kur farkı', tutar:12000 }],
        alacak:[],
        not:'Gerçekleşmiş kur farkı' },
    ],

    notlar:[
      { tip:'tip', baslik:'F110 iskonto kararını nasıl verir?', metin:
        'Program her kalem için şunu hesaplar: "Bugün ödersem %2 iskonto kazanırım. ' +
        'Vadeye kadar beklersem parayı 20 gün daha elimde tutarım."\n\n' +
        '20 günde %2 kazanç, yıllık yaklaşık **%36** demektir — çoğu şirket için mevduat faizinden yüksektir. ' +
        'Bu yüzden {{FBZP}}’de tanımlanan **azami nakit iskonto oranı** ayarı önemlidir: ' +
        'program bu eşiğin üzerindeki iskontoları kaçırmaz.' },
      { tip:'warn', baslik:'Ara hesap kullanılmazsa ne olur?', metin:
        'Ödeme doğrudan gerçek banka hesabına yazılırsa, banka ekstresi geldiğinde ' +
        'aynı hareket **ikinci kez** kaydedilme riski doğar veya mutabakat imkânsızlaşır. ' +
        '{{banka-ara-hesabi}} bu iki anı ayırarak mutabakatı mümkün kılar. ' +
        'Ara hesabın açık kalem yönetimli olması **şarttır**.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'F110 çevresinde dört eksende çeşitlenme vardır: **çalıştırma tipi**, **ödeme yöntemi**, ' +
      '**ödeme ortamı üretim yöntemi** ve **özel durumlar**.',

    liste:[
      { ad:'Öneri çalıştırması', en:'Proposal Run',
        aciklama:'Hangi kalemlerin ödeneceğini hesaplar ve listeler. **Hiçbir muhasebe kaydı yapmaz.** ' +
                 '{{REGUH}}/{{REGUP}}’a `XVORL = X` ile yazılır ve serbestçe silinebilir.',
        neZaman:'Her zaman — ödeme çalıştırmasından önce zorunlu adımdır. Atlanabilir ama atlanmamalıdır.',
        ornek:'232 kalem seçildi, 89 ödemede birleşti, 47 kalem istisna listesinde.',
        tcodes:['F110'] },

      { ad:'Ödeme çalıştırması', en:'Payment Run',
        aciklama:'Öneriyi gerçek ödemeye çevirir: muhasebe kayıtlarını üretir, faturaları kapatır. ' +
                 'Geri alınması zordur.',
        neZaman:'Öneri onaylandıktan sonra.',
        ornek:'86 ödeme belgesi (KZ) oluştu, kalemler {{BSAK}}’a taşındı.',
        tcodes:['F110'] },

      { ad:'Zamanlanmış çalıştırma', en:'Scheduled Run — F110S',
        aciklama:'F110’u belirli gün ve saatlerde otomatik başlatır. Gece çalışıp sabaha öneri hazır olur.',
        neZaman:'Düzenli ödeme takvimi olan, hacmi yüksek şirketlerde.',
        tcodes:['F110S'] },

      { ad:'Banka havalesi', en:'Bank Transfer',
        aciklama:'En yaygın {{odeme-yontemi}}. Banka dosyası üretilir, elektronik olarak gönderilir.',
        neZaman:'Standart yurtiçi ve yurtdışı ödemelerde.',
        ornek:'Ödeme yöntemi kodu genelde "H" veya "T"; ülkeye göre değişir.' },

      { ad:'Çek', en:'Check',
        aciklama:'Fiziksel çek basılır ve numaralandırılır. Çek defteri {{PAYR}} tablosunda izlenir.',
        neZaman:'Çek kullanımı yaygın ülkelerde ve bazı özel ödeme türlerinde.',
        ornek:'{{FCHN}} ile çek listesi, {{FCHI}} ile numara aralığı tanımı.',
        tcodes:['FCH5','FCHN','FCHI'] },

      { ad:'Klasik ödeme ortamı programları', en:'Classic RFFO* Programs',
        aciklama:'Ülkeye özgü eski çıktı programları. Her ülke ve format için ayrı program vardır.',
        neZaman:'Eski kurulumlarda hâlâ kullanılır. Yeni projelerde önerilmez.',
        ornek:'RFFOAVIS (ödeme bildirimi), RFFOUS_C (çek).' },

      { ad:'Payment Medium Workbench (PMW)', en:'Payment Medium Workbench — FBPM',
        aciklama:'Modern ödeme ortamı üretim aracı. Format ağacı (format tree) ile ülke ve banka ' +
                 'formatları esnek biçimde tanımlanır; SEPA, ISO20022 gibi standartlar desteklenir.',
        neZaman:'Yeni kurulumlarda **standart tercih**. Klasik programlar yerine kullanılır.',
        tcodes:['FBPM','FBZP'] },

      { ad:'Avans ödemesi', en:'Down Payment via F110',
        aciklama:'{{F-47}} ile açılan avans **talebi** istatistikseldir; F110 bu talebi görür ve öder. ' +
                 'Ödeme özel G/L hesabına ({{avans}}) yazılır.',
        neZaman:'Sipariş peşinatlarının ödeme koşusuna dâhil edilmesi istendiğinde.',
        tcodes:['F-47','F-48','OBYR'] },
    ],

    karsilastirmaBasliklar:['Öneri (Proposal)', 'Ödeme (Payment Run)'],
    karsilastirma:[
      ['Muhasebe kaydı', '**Yok** — hiçbir hesap hareket etmez', '**Var** — satıcı borç / banka alacak'],
      ['Tablo kaydı', '{{REGUH}}/{{REGUP}}, `XVORL` = **X**', 'Aynı tablolar, `XVORL` = **boş**'],
      ['Açık kalem', 'Açık kalır', '{{BSIK}}’ten {{BSAK}}’a taşınır'],
      ['Geri alma', 'Öneri silinir — serbest', 'Her belge tek tek ters kaydedilir, {{FBRA}} gerekir'],
      ['Düzenlenebilir mi', '**Evet** — kalem çıkarma, tutar değiştirme, banka değiştirme', 'Hayır'],
      ['Banka dosyası', 'Üretilmez', 'Üretilir ({{FBPM}})'],
      ['Amaç', 'Kontrol ve onay', 'Gerçekleştirme'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'F110', ad:'Otomatik ödeme programı',
        amac:'Vadesi gelen borçları toplu seçer, öneri üretir, ödemeyi kaydeder ve banka dosyasını oluşturur.',
        neZaman:'Rutin ödeme koşularında — kurumsal şirketlerin standart ödeme yöntemi.',
        adimlar:[
          { baslik:'Çalıştırma tarihi ve kimliği gir',
            aciklama:'Bu ikili (`LAUFD` + `LAUFI`) koşuyu benzersiz kılar. Aynı gün ikinci koşu için farklı kimlik verilir.' },
          { baslik:'*Parametre* sekmesini doldur',
            aciklama:'**Ödeme kayıt tarihi** (belgelerin düşeceği tarih), **belge girişi son tarihi** ' +
                     '(bu tarihe kadar girilmiş belgeler dâhil), **şirket kodları**, **ödeme yöntemleri**, ' +
                     '**sonraki ödeme tarihi** ve satıcı aralığı.' },
          { baslik:'*Sonraki ödeme tarihi* alanını doğru gir — en kritik alan',
            aciklama:'Program şunu sorar: "Bu kalem bir sonraki koşuya kadar bekleyebilir mi?" ' +
                     'Bekleyemiyorsa (vadesi veya iskonto süresi dolacaksa) **bugün öder**. ' +
                     'Bu alan yanlışsa ya erken ödersin ya iskontoyu kaçırırsın.' },
          { baslik:'*Ek log* sekmesinde log seviyesini aç',
            aciklama:'"Ödeme yöntemi seçimi", "kalem bazında" ve "banka belirleme" loglarını işaretle. ' +
                     'Kalem neden seçilmedi sorusunun cevabı **yalnızca** bu logda görünür.' },
          { baslik:'Öneriyi çalıştır ve durumu izle',
            aciklama:'Durum satırı "Öneri oluşturuldu" olmalı. Ekranda kendiliğinden yenilenmezse ' +
                     '*Durum* sekmesinde yenile tuşuna bas.' },
          { baslik:'Öneriyi görüntüle ve düzenle',
            aciklama:'İki liste vardır: **ödenecekler** ve **istisnalar**. İstisna listesi neden ' +
                     'ödenmeyeceklerini kodla açıklar — teşhisin ana kaynağıdır.' },
          { baslik:'Ödemeyi çalıştır',
            aciklama:'Muhasebe kayıtları burada oluşur. Durum "Ödeme çalıştırması tamamlandı" olur.' },
          { baslik:'Ödeme ortamını üret',
            aciklama:'*Yazdırma/veri ortamı* sekmesinde varyant tanımlıysa otomatik çalışır; ' +
                     'değilse {{FBPM}} ile ayrıca üretilir.' },
        ],
        ekranAkisi:[
          { ekran:'Durum sekmesi', islem:'Çalıştırma tarihi 25.09.2026 · Kimlik AP01 → "Parametreler henüz girilmedi"' },
          { ekran:'Parametre sekmesi', islem:'Kayıt tarihi 25.09 · Belge girişi son tarihi 25.09 · Şirket kodu 1000 · Ödeme yöntemi H · Sonraki ödeme tarihi 10.10.2026' },
          { ekran:'Ek log sekmesi', islem:'Ödeme yöntemi seçimi + kalem bazında + banka belirleme işaretlendi' },
          { ekran:'Durum → Öneri', islem:'"Öneri oluşturuldu": 232 kalem / 89 ödeme / 47 istisna' },
          { ekran:'Öneriyi düzenle', islem:'3 satıcı çıkarıldı → 86 ödeme kaldı' },
          { ekran:'Durum → Ödeme', islem:'"Ödeme çalıştırması tamamlandı": 86 belge oluştu' },
        ],
        alanlar:{
          zorunlu:['Çalıştırma tarihi','Kimlik','Ödeme kayıt tarihi','Belge girişi son tarihi','Şirket kodu','Ödeme yöntemi','Sonraki ödeme tarihi'],
          opsiyonel:['Satıcı/müşteri aralığı','Serbest seçim kriterleri','Ek log ayarları','Yazdırma varyantı'] },
        hatalar:[
          { mesaj:'No valid payment method found', sebep:'Satıcının {{LFB1}} `ZWELS` listesi koşudaki yöntemi içermiyor, ya da ödeme yöntemi şirket kodu seviyesinde tanımsız.', cozum:'{{BP}} → şirket kodu verisinde ödeme yöntemini ekle; {{FBZP}} → "Ödeme yöntemleri / şirket kodu" adımını kontrol et.' },
          { mesaj:'No suitable house bank found / Bank determination incomplete', sebep:'{{FBZP}} banka belirlemede sıralama (ranking order) veya kullanılabilir tutar (available amounts) tanımsız.', cozum:'{{FBZP}} → Banka belirleme → sıralama sırası + kullanılabilir tutarları gir. Tutar 0 ise banka hiç seçilmez.' },
          { mesaj:'Item is blocked for payment', sebep:'Kalemde ({{BSEG}} `ZLSPR`) veya satıcıda ({{LFB1}} `ZAHLS`) {{odeme-blogu}} var.', cozum:'Bloğun sebebini araştır; haklıysa {{FB09}} veya {{BP}} ile kaldır. MM faturasıysa {{MRBR}}.' },
          { mesaj:'Payment amount is below minimum', sebep:'{{FBZP}} şirket kodu ayarlarında asgari ödeme tutarı belirlenmiş.', cozum:'Bilinçli bir ayardır; küçük tutarlar bir sonraki koşuya birikir. Gerekirse eşiği düşür.' },
          { mesaj:'Proposal has already been created', sebep:'Aynı tarih+kimlik ile öneri zaten var.', cozum:'Öneriyi sil ve yeniden çalıştır, ya da yeni bir kimlik kullan.' },
          { mesaj:'Payment run already carried out — parameters cannot be changed', sebep:'Ödeme çalıştırılmış; parametre değiştirilemez.', cozum:'Yeni bir koşu aç. Ödemeyi geri almak gerekiyorsa belgeleri {{FB08}} ile ters kaydet ve kapatmaları {{FBRA}} ile aç.' },
        ],
        ipucu:'**Ek log’u her zaman aç.** "Kalem neden seçilmedi?" sorusunun cevabı yalnızca orada bulunur ' +
              've bu soru F110 ile ilgili şikâyetlerin çoğunluğudur. Log kapalıysa kör kalırsın.',
        ilgili:['FBZP','F110S','FBPM','F-53','FBL1N','FEBAN'] },

      { kod:'FBZP', ad:'Ödeme programı yapılandırması — F110’un beyni',
        amac:'F110’un tüm davranışını belirleyen beş ayarı tek ekranda toplar.',
        neZaman:'Kurulumda ve "F110 şunu neden yapıyor/yapmıyor?" sorusunun her tekrarında.',
        adimlar:[
          { baslik:'1) Tüm şirket kodları (All company codes)',
            aciklama:'Hangi şirket kodunun hangi şirket adına ödeme yapacağını belirler. ' +
                     'Merkezi ödeme yapısında (bir şirket diğerleri adına öder) burası kritiktir. ' +
                     'Ayrıca satıcı/müşteri kalemlerinin birlikte değerlendirilip değerlendirilmeyeceği burada ayarlanır.' },
          { baslik:'2) Ödeme yapan şirket kodları (Paying company codes)',
            aciklama:'Asgari ödeme tutarı, ödeme bildirimi (payment advice) formu ve ' +
                     'kambiyo farkı ayarları. Bankaya giden dosyada görünecek şirket burasıdır.' },
          { baslik:'3) Ödeme yöntemleri / ülke (Payment methods in country)',
            aciklama:'Ödeme yönteminin **karakterini** tanımlar: havale mi çek mi, ' +
                     'zorunlu ana veri alanları (IBAN gerekli mi?), ödeme ortamı programı veya PMW format ağacı.' },
          { baslik:'4) Ödeme yöntemleri / şirket kodu (Payment methods in company code)',
            aciklama:'Asgari/azami tutar sınırları, döviz izni, tek tek ödeme zorunluluğu, ' +
                     'ödeme bildirimi formu. **"No valid payment method found" hatasının ana kaynağı burasıdır.**' },
          { baslik:'5) Banka belirleme (Bank determination)',
            aciklama:'En kritik adım. Dört alt bölüm: **Sıralama sırası** (hangi banka önce denenir), ' +
                     '**Banka hesapları** (yöntem + banka → G/L hesabı ve ara hesap), ' +
                     '**Kullanılabilir tutarlar** (her bankadan azami ne kadar çıkabilir), ' +
                     '**Değer tarihi** ve **ücretler**.' },
        ],
        ekranAkisi:[
          { ekran:'FBZP giriş', islem:'Beş düğme: All company codes / Paying company codes / Pmnt methods in country / Pmnt methods in company code / Bank determination' },
          { ekran:'Banka belirleme → Sıralama', islem:'Ödeme yöntemi H → 1. sıra: İş Bankası, 2. sıra: Garanti' },
          { ekran:'Banka belirleme → Banka hesapları', islem:'H + İş Bankası + hesap ID 0001 → G/L 102001, ara hesap 102900' },
          { ekran:'Banka belirleme → Kullanılabilir tutarlar', islem:'İş Bankası 0001 → giden ödeme için 5.000.000 TL' },
        ],
        hatalar:[
          { mesaj:'No amounts available for house bank', sebep:'Kullanılabilir tutar hiç girilmemiş veya 0.', cozum:'Kullanılabilir tutarlar bölümüne gerçekçi bir üst sınır gir. **Boş bırakmak "sınırsız" demek değildir, "hiç" demektir.**' },
          { mesaj:'Payment method H not defined for company code 1000', sebep:'4. adım (şirket kodu seviyesi) eksik.', cozum:'Ödeme yöntemini şirket kodu için tanımla; ülke seviyesinde tanımlı olması yetmez.' },
        ],
        ipucu:'FBZP’yi ezberlemenin yolu **sırasını hatırlamaktır**: kim ödüyor (1-2) → nasıl ödüyor (3-4) → ' +
              'hangi bankadan ödüyor (5). Bir sorunla karşılaştığında bu sırayla ilerlersen kaynağı hızla bulursun.',
        ilgili:['F110','FBPM','FI12','FCHI'] },

      { kod:'FBPM', ad:'Ödeme ortamı programı (PMW)',
        amac:'Payment Medium Workbench ile banka dosyasını üretir.',
        neZaman:'F110 ödeme çalıştırmasından sonra; yazdırma varyantı otomatik çalışmadıysa elle.',
        adimlar:[
          { baslik:'Çalıştırma tarihi ve kimliği gir (F110 koşusuyla aynı)' },
          { baslik:'Format ağacını (format tree) seç',
            aciklama:'Ülke ve bankanın istediği format: SEPA, ISO20022 (CAMT/PAIN), yerel banka formatı.' },
          { baslik:'Çalıştır → dosya üretilir',
            aciklama:'Dosya sunucuda bir dizine yazılabilir ({{AL11}} ile görülür) veya indirilebilir.' },
        ],
        ipucu:'Dosya üretilmiyorsa sırayla kontrol et: ödeme çalıştırması gerçekten tamamlandı mı, ' +
              '{{FBZP}} 3. adımda format ağacı atanmış mı, varyant tanımlı mı.',
        ilgili:['F110','FBZP'] },

      { kod:'F110S', ad:'Ödeme programını zamanla',
        amac:'F110 koşusunu belirli gün ve saatlerde otomatik başlatır.',
        neZaman:'Düzenli ödeme takvimi olan şirketlerde; gece koşusuyla sabaha öneri hazır olur.',
        ipucu:'Zamanlanmış koşuda bile **öneri ile ödeme ayrı planlanmalıdır**. ' +
              'Otomatik öneri + insan onayı + otomatik ödeme en güvenli düzendir. ' +
              'Onaysız tam otomatik ödeme, iç kontrol açısından kabul edilmez.',
        ilgili:['F110','FBPM'] },

      { kod:'F-53', ad:'Manuel satıcı ödemesi',
        amac:'Tek bir ödemeyi elle kaydeder ve açık kalemleri kapatır.',
        neZaman:'F110 kapsamı dışındaki acil ödemelerde; koşu dışı istisnalarda.',
        ipucu:'F110 varken F-53’ün sürekli kullanılması bir **süreç sorununun** işaretidir: ' +
              'ya blok yönetimi yavaştır ya ödeme takvimi ihtiyacı karşılamıyordur. ' +
              'Manuel ödeme oranı yüksekse önce sebebi araştırılmalıdır.',
        ilgili:['F110','F-58','F-44'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'F110’un tablo yapısı üç katmandır: **kontrol** ({{REGUV}} — koşunun durumu), ' +
      '**ödeme başlıkları** ({{REGUH}} — kime ne kadar) ve **ödenen kalemler** ({{REGUP}} — hangi faturalar). ' +
      'Bu üçlü, "bu ödeme hangi faturaları kapattı?" sorusunun tek kaynağıdır.',

    liste:[
      { ad:'REGUV', baslik:'Ödeme çalıştırması — kontrol kaydı',
        tutar:'Koşunun durumu: parametreler girildi mi, öneri üretildi mi, ödeme yapıldı mı, dosya oluştu mu.',
        olusturan:'{{F110}} — parametre girildiğinde',
        guncelleyen:'Her aşamada {{F110}}',
        anahtar:'LAUFD + LAUFI',
        iliskiler:'{{REGUH}} ve {{REGUP}} bu koşuya bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'LAUFD', aciklama:'Çalıştırma tarihi' },
          { ad:'LAUFI', aciklama:'Çalıştırma kimliği — tarih ile birlikte koşuyu benzersiz kılar' },
          { ad:'XVORL', aciklama:'Öneri aşamasında mı' },
        ] },

      { ad:'REGUH', baslik:'Ödeme çalıştırması — ödeme başlıkları',
        tutar:'Her ödemenin başlığı: alıcı, tutar, para birimi, ödeme yöntemi, ev bankası, ödeme belgesi numarası.',
        olusturan:'{{F110}} öneri ve ödeme çalıştırması',
        guncelleyen:'{{F110}}',
        anahtar:'LAUFD + LAUFI + XVORL + ZBUKR + LIFNR + KUNNR + VBLNR',
        iliskiler:'{{REGUP}} ile kalemleri, {{LFA1}} ile satıcı, {{T012K}} ile banka hesabı bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'XVORL', aciklama:'**X ise yalnızca öneridir** — gerçek ödeme değil. En kritik ayrım alanı.' },
          { ad:'RWBTR', aciklama:'Ödeme tutarı' },
          { ad:'VBLNR', aciklama:'Ödeme belgesi numarası — ödeme çalıştırmasından sonra dolar' },
          { ad:'HBKID / HKTID', aciklama:'Ev bankası ve hesap kimliği — banka belirlemenin sonucu' },
          { ad:'ZALDT', aciklama:'Ödeme tarihi' },
        ] },

      { ad:'REGUP', baslik:'Ödeme çalıştırması — ödenen kalemler',
        tutar:'Her ödemenin hangi fatura kalemlerini kapattığı. Bir ödeme birçok faturayı kapatabilir.',
        olusturan:'{{F110}}',
        guncelleyen:'{{F110}}',
        anahtar:'LAUFD + LAUFI + XVORL + ZBUKR + LIFNR + KUNNR + VBLNR + BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{REGUH}}’un çocuğu; {{BSAK}} ile kapatılmış kalemlere bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'BELNR / BUZEI', aciklama:'Ödenen fatura belgesi ve kalemi' },
          { ad:'WRBTR', aciklama:'Kalem tutarı' },
          { ad:'SKNTO', aciklama:'Bu kalemde kazanılan {{iskonto}}' },
        ] },

      { ad:'T042', baslik:'Ödeme programı — şirket kodu ayarları',
        tutar:'{{FBZP}}’de girilen yapılandırma: ödeme yapan şirket kodu, tolerans günleri, asgari tutar.',
        olusturan:'{{FBZP}}',
        guncelleyen:'{{FBZP}}',
        s4:'Değişmedi.' },

      { ad:'T012K', baslik:'Ev bankası hesap kimlikleri',
        tutar:'Her {{ev-bankasi}} hesabının IBAN’ı ve karşılık gelen G/L hesabı. Banka belirleme buraya bakar.',
        olusturan:'{{FI12}} / Bank Account Management',
        guncelleyen:'{{FI12}}',
        anahtar:'BUKRS + HBKID + HKTID',
        iliskiler:'{{REGUH}} `HBKID`/`HKTID` üzerinden buraya işaret eder.',
        s4:'S/4HANA’da Bank Account Management (BAM) ile yönetilir.' },

      { ad:'BSIK', baslik:'Satıcı açık kalemleri — F110’un seçim havuzu',
        tutar:'Ödenmemiş satıcı faturaları. F110 kalemleri buradan seçer.',
        olusturan:'Satıcıya yapılan her kayıt',
        guncelleyen:'Ödeme sonrası kalem {{BSAK}}’a taşınır',
        s4:'{{uyumluluk-view}} — veri {{ACDOCA}}’dan üretilir.',
        alanlar:[
          { ad:'ZFBDT / ZBD1T', aciklama:'Baz tarih ve iskonto günü — F110 ödeme gününü buradan hesaplar' },
          { ad:'ZLSPR', aciklama:'{{odeme-blogu}} — doluysa kalem seçilmez' },
          { ad:'ZLSCH', aciklama:'Kalem bazında ödeme yöntemi — satıcı ana verisini ezer' },
        ] },

      { ad:'PAYR', baslik:'Çek kayıt defteri',
        tutar:'Basılan çekler: numara, lehtar, tutar, ödeme belgesi ve tahsil durumu.',
        olusturan:'Ödeme ortamı üretimi (çek yöntemi kullanılıyorsa)',
        guncelleyen:'{{FCH5}}, ödeme ortamı programları',
        s4:'Değişmedi.' },
    ],

    er:{
      type:'er',
      baslik:'F110 tablo ilişkileri — koşudan kapatılmış kaleme',
      varliklar:[
        { ad:'REGUV', rol:'Kontrol', aciklama:'Koşunun durumu',
          alanlar:[{ ad:'LAUFD', tip:'pk' }, { ad:'LAUFI', tip:'pk' }, { ad:'XVORL' }] },
        { ad:'REGUH', rol:'Ödeme', hub:true, aciklama:'Ödeme başlıkları',
          alanlar:[{ ad:'LAUFD', tip:'fk' }, { ad:'LAUFI', tip:'fk' }, { ad:'LIFNR', tip:'fk' }, { ad:'VBLNR' }, { ad:'HBKID' }] },
        { ad:'REGUP', rol:'Ödeme', aciklama:'Ödenen kalemler',
          alanlar:[{ ad:'LAUFI', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'BUZEI' }, { ad:'SKNTO' }] },
        { ad:'BSIK', rol:'İndeks', aciklama:'Seçim havuzu (açık)',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZLSPR' }, { ad:'ZFBDT' }] },
        { ad:'BSAK', rol:'İndeks', aciklama:'Ödeme sonrası (kapalı)',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'AUGBL' }, { ad:'AUGDT' }] },
        { ad:'LFB1', rol:'Ana veri', aciklama:'Satıcı ödeme ayarları',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'ZWELS' }, { ad:'ZAHLS' }] },
        { ad:'T012K', rol:'Yapılandırma', aciklama:'Ev bankası hesabı',
          alanlar:[{ ad:'HBKID', tip:'pk' }, { ad:'HKTID', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'BKPF', rol:'Belge', aciklama:'Ödeme belgesi',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
      ],
      iliskiler:[
        { from:'REGUV', to:'REGUH', alanlar:'LAUFD + LAUFI', not:'koşu → ödemeler' },
        { from:'REGUH', to:'REGUP', alanlar:'LAUFD + LAUFI + VBLNR', not:'ödeme → ödenen kalemler' },
        { from:'BSIK', to:'REGUP', alanlar:'BELNR + BUZEI', not:'seçilen açık kalem' },
        { from:'REGUP', to:'BSAK', alanlar:'BELNR + BUZEI', not:'ödeme sonrası kapatılmış' },
        { from:'LFB1', to:'REGUH', alanlar:'LIFNR', not:'ödeme yöntemi ve blok buradan' },
        { from:'T012K', to:'REGUH', alanlar:'HBKID + HKTID', not:'banka belirlemenin sonucu' },
        { from:'REGUH', to:'BKPF', alanlar:'VBLNR → BELNR', not:'ödeme belgesi' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'F110 ekranı **sekmelerden** oluşur ve her sekme bir aşamaya karşılık gelir. ' +
      'Sekmelerin sırasını ve ne işe yaradığını bilmek, ekranda kaybolmayı önler.',

    ekranlar:[
      { ad:'Durum (Status) sekmesi',
        aciklama:'Koşunun hangi aşamada olduğunu gösterir. Her işlemden sonra buraya dönülür ve **yenilenir**.',
        alanlar:[
          { ad:'Çalıştırma tarihi (`LAUFD`)', zorunlu:true, aciklama:'Koşunun kimliğinin ilk yarısı. Genelde bugünün tarihi.' },
          { ad:'Kimlik (`LAUFI`)', zorunlu:true, aciklama:'5 karakterlik serbest metin. Aynı gün ikinci koşu için farklı olmalı.' },
          { ad:'Durum metni', zorunlu:false, aciklama:'"Parametreler girilmedi" → "Öneri oluşturuldu" → "Ödeme tamamlandı" sırasını izler.' },
        ],
        ipucu:'Durum kendiliğinden yenilenmez. Öneri bittiğinde ekran hâlâ eski durumu gösteriyor olabilir — ' +
              'yenile tuşuna bas. Yeni başlayanların "öneri çalışmadı" sanmasının bir numaralı sebebi budur.' },

      { ad:'Parametre (Parameter) sekmesi',
        aciklama:'Koşunun kapsamını belirleyen ekran. Buradaki dört tarih alanı en çok karıştırılan alanlardır.',
        alanlar:[
          { ad:'Ödeme kayıt tarihi (Posting date)', zorunlu:true, aciklama:'Ödeme belgelerinin düşeceği muhasebe tarihi. Dönem açık olmalıdır.' },
          { ad:'Belge girişi son tarihi (Docs entered up to)', zorunlu:true, aciklama:'Bu tarihe kadar **sisteme girilmiş** belgeler dikkate alınır. Genelde bugün.' },
          { ad:'Şirket kodları', zorunlu:true, aciklama:'Virgülle birden çok girilebilir.' },
          { ad:'Ödeme yöntemleri', zorunlu:true, aciklama:'Boşluksuz sırayla yazılır (örn. "HT"). Sıra **öncelik** belirtir.' },
          { ad:'Sonraki ödeme tarihi (Next payment date)', zorunlu:true, aciklama:'**En kritik alan.** Program "bu kalem bir sonraki koşuya kadar bekleyebilir mi?" sorusunu buna göre cevaplar. Yanlışsa ya erken ödersin ya iskonto kaçar.' },
          { ad:'Satıcı/müşteri aralığı', zorunlu:false, aciklama:'Boş bırakılırsa tümü dâhil edilir.' },
        ],
        ipucu:'"Sonraki ödeme tarihi"ni gerçek ödeme takvimine göre gir. İki haftada bir ödüyorsan ' +
              'bugünün 14 gün sonrası. Yanlışlıkla yarını yazarsan program neredeyse hiçbir şey ödemez; ' +
              'çok ileri bir tarih yazarsan vadesi gelmemiş borçları erken ödersin.' },

      { ad:'Serbest seçim (Free selection) sekmesi',
        aciklama:'Standart parametrelerin dışında ek süzme yapmaya yarar.',
        alanlar:[
          { ad:'Alan adı', zorunlu:false, aciklama:'Belge türü, tutar, atama gibi alanlara göre dâhil etme/hariç tutma.' },
          { ad:'Hariç tut kutusu', zorunlu:false, aciklama:'Seçilen değerleri **dışarıda bırakır**.' },
        ],
        ipucu:'Belirli bir belge türünü veya tutar aralığını hariç tutmak için kullanılır. ' +
              'Örneğin acil ödemeler için ayrı bir belge türü kullanıp diğer koşularda hariç tutabilirsin.' },

      { ad:'Ek log (Additional log) sekmesi',
        aciklama:'Teşhisin tek kaynağı. **Her koşuda açılmalıdır.**',
        alanlar:[
          { ad:'Ödeme yöntemi seçimi (tüm belgelerde)', zorunlu:false, aciklama:'Neden bu yöntem seçildi / neden hiçbiri seçilmedi.' },
          { ad:'Kalem bazında ödeme yöntemi seçimi', zorunlu:false, aciklama:'Kalem kalem karar gerekçesi.' },
          { ad:'Ödeme belgesi kalemleri', zorunlu:false, aciklama:'Üretilecek muhasebe satırları.' },
          { ad:'Satıcı/müşteri aralığı', zorunlu:false, aciklama:'Log’u belirli satıcılarla sınırlayarak okunabilir tutar.' },
        ],
        ipucu:'Log’u tüm satıcılar için açarsan çıktı devasa olur. Sorun yaşadığın satıcıyı yaz, ' +
              'yalnızca onun kararlarını oku. Teşhis süresi dakikalardan saniyelere iner.' },

      { ad:'Yazdırma / veri ortamı (Printout/data medium) sekmesi',
        aciklama:'Ödeme dosyası ve bildirim formlarının üretim ayarları.',
        alanlar:[
          { ad:'Program ve varyant', zorunlu:false, aciklama:'PMW kullanılıyorsa format ağacı, klasikse RFFO* programı ve varyantı.' },
        ],
        ipucu:'Varyant tanımlı değilse ödeme kaydedilir ama **dosya üretilmez**. ' +
              '"Ödeme yapıldı ama bankaya bir şey gitmedi" durumunun sebebi budur; {{FBPM}} ile sonradan üretilir.' },
    ],

    zorunlu:['Çalıştırma tarihi','Kimlik','Ödeme kayıt tarihi','Belge girişi son tarihi','Şirket kodu','Ödeme yöntemi','Sonraki ödeme tarihi'],
    opsiyonel:['Satıcı aralığı','Serbest seçim kriterleri','Ek log ayarları','Yazdırma varyantı','Ödeme bildirimi formu'],

    hatalar:[
      { mesaj:'No valid payment method found', sebep:'Satıcının {{LFB1}} `ZWELS` listesi koşudaki yöntemi içermiyor veya yöntem şirket kodu seviyesinde ({{FBZP}} 4. adım) tanımsız.', cozum:'Ek log’u aç ve satıcıyı yaz — log tam olarak hangi kontrolde takıldığını söyler. Sonra {{BP}} veya {{FBZP}}’de eksiği gider.' },
      { mesaj:'No suitable house bank found', sebep:'{{FBZP}} banka belirlemede sıralama veya kullanılabilir tutar eksik.', cozum:'Kullanılabilir tutarlar bölümünü kontrol et — **boş bırakmak "sınırsız" değil "hiç" demektir.**' },
      { mesaj:'Item blocked for payment', sebep:'Kalemde ({{BSEG}} `ZLSPR`) veya satıcıda ({{LFB1}} `ZAHLS`) blok var; MM faturasıysa {{RBKP}} `ZLSPR`.', cozum:'{{FB09}}, {{BP}} veya {{MRBR}} ile bloğu kaldır.' },
      { mesaj:'Amount is less than minimum amount', sebep:'{{FBZP}}’de asgari ödeme tutarı eşiği var.', cozum:'Bilinçli ayardır; küçük tutarlar birikir. Eşiği gözden geçir.' },
      { mesaj:'No documents found for the specified selection', sebep:'Vadesi gelen kalem yok; "sonraki ödeme tarihi" çok yakın girilmiş olabilir.', cozum:'Tarihi ödeme takvimine göre düzelt; {{FBL1N}} ile gerçekten vadesi gelen kalem var mı kontrol et.' },
      { mesaj:'Payment run already carried out', sebep:'Bu tarih+kimlik ile ödeme yapılmış.', cozum:'Yeni bir kimlik ile koşu aç. Geri alma gerekiyorsa belgeleri {{FB08}}, kapatmaları {{FBRA}} ile aç.' },
      { mesaj:'Company code ... not defined in payment program', sebep:'{{FBZP}} 1. adımda şirket kodu tanımsız.', cozum:'"Tüm şirket kodları" adımına şirket kodunu ekle ve ödeme yapan şirket kodunu belirt.' },
      { mesaj:'House bank account has insufficient available amount', sebep:'Kullanılabilir tutar toplam ödemeden az.', cozum:'Tutarı artır veya ikinci bir banka tanımla; program sıralamaya göre diğerine geçer.' },
    ],

    ipuclari:[
      '**Ek log’u her koşuda aç** ve sorun yaşadığın satıcıyı log aralığına yaz. F110 teşhisinin %90’ı burada biter.',
      'Koşu öncesi rutini oturt: **(1)** {{MRBR}} bloklu faturalar, **(2)** {{FBL1N}} ödeme bloğu sütunu, ' +
      '**(3)** ödeme yöntemi eksik satıcılar. Bu üç kontrol sürprizleri ortadan kaldırır.',
      'Öneri listesinden çok **istisna listesini** oku. Ödenecekler zaten beklendiği gibidir; ' +
      'öğretici olan ödenmeyeceklerin gerekçesidir.',
      'Öneriyi **her zaman** üret ve onaylat. Doğrudan ödeme çalıştırmak teknik olarak mümkündür ' +
      'ama iç kontrol açısından kabul edilemez ve geri alması çok zordur.',
      'Test sisteminde F110 denerken **ödeme ortamı varyantını kaldır** — yanlışlıkla gerçek bir ' +
      'banka dosyası üretip göndermeyi önlersin.',
      'Ödeme sonrası {{banka-ara-hesabi}}nın bakiyesini izle. Büyümeye devam ediyorsa ekstre ' +
      'işlenmiyor demektir ve mutabakat kopmuştur.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'REGUV', ne:'Koşunun durumu — her aşamada güncellenir' },
      { tablo:'REGUH', ne:'Ödeme başlıkları; öneride `XVORL` = X, ödemede boş ve `VBLNR` dolu' },
      { tablo:'REGUP', ne:'Ödenen kalemler; hangi ödemenin hangi faturayı kapattığı' },
      { tablo:'BKPF', ne:'Ödeme belgesi başlığı (belge türü KZ)' },
      { tablo:'BSEG', ne:'Satıcı borç ve banka alacak kalemleri; kapatılan faturalara `AUGBL` yazılır' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler' },
      { tablo:'BSIK', ne:'Ödenen kalemler buradan **silinir**' },
      { tablo:'BSAK', ne:'Kapatılmış kalem olarak eklenir' },
      { tablo:'PAYR', ne:'Çek yöntemi kullanıldıysa çek kaydı' },
    ],

    commit:
      'F110 **iki ayrı LUW zinciri** çalıştırır. Öneri aşamasında yalnızca {{REGUV}}/{{REGUH}}/{{REGUP}} ' +
      'yazılır; hiçbir FI belgesi üretilmez ve muhasebe etkisi yoktur.\n\n' +
      'Ödeme aşamasında her ödeme için ayrı bir kayıt LUW’u çalışır: FI belgesi + kapatma + indeks ' +
      'güncellemesi birlikte yazılır. Bir ödeme başarısız olursa **diğerleri etkilenmez** — ' +
      'bu yüzden kısmen tamamlanmış koşu mümkündür ve log’dan hangi ödemelerin başarısız olduğu okunur.',

    belgeNo:
      'Ödeme belgeleri **KZ** (satıcı ödemesi) belge türünden, {{FBN1}}’de tanımlı aralıktan numara alır. ' +
      'Her ödeme ayrı bir belge numarası alır — 86 ödeme = 86 belge. ' +
      'Öneri aşamasında belge numarası **verilmez**; {{REGUH}} `VBLNR` alanı ödeme çalıştırmasından sonra dolar.',

    postingLogic:
      'F110’un karar zinciri şudur:\n\n' +
      '**1. Kalem seçimi:** {{BSIK}}’ten vadesi "sonraki ödeme tarihine" kadar dolacak kalemler alınır; ' +
      'bloklu olanlar elenir.\n' +
      '**2. Ödeme yöntemi:** kalemdeki `ZLSCH` varsa o, yoksa satıcıdaki `ZWELS` listesinden ' +
      'koşu parametresindeki sıraya göre ilk uygun olan seçilir.\n' +
      '**3. Gruplama:** aynı satıcı + aynı yöntem + aynı para birimi kalemleri **tek ödemede** birleştirilir ' +
      '(tek tek ödeme zorunluysa birleştirilmez).\n' +
      '**4. Banka belirleme:** {{FBZP}} sıralamasına göre ilk banka denenir; kullanılabilir tutar yetmezse ' +
      'sonrakine geçilir.\n' +
      '**5. İskonto kararı:** iskonto süresi "sonraki ödeme tarihinden" önce doluyorsa bugün ödenir.\n' +
      '**6. Kayıt:** satıcı borç / banka alacak + iskonto + kur farkı satırları; faturalar kapatılır.',

    belgeTuru:
      'Ödeme belgesi türü {{FBZP}} 2. adımda (ödeme yapan şirket kodları) tanımlanır; ' +
      'standart **KZ**’dir. Kapatma belgesi ayrı bir tür kullanabilir. ' +
      'Belge türü, ödeme belgesinin hangi numara aralığından numara alacağını belirler.',

    numberRange:
      'KZ belge türü için şirket kodu + mali yıl bazında {{FBN1}}’de aralık tanımlı olmalıdır. ' +
      'Yılbaşında açılmazsa ilk ödeme koşusu durur — {{OBH1}} ile toplu kopyalanır.',

    accountDetermination:
      'F110’da hesaplar üç kaynaktan gelir:\n\n' +
      '**Satıcı hesabı:** {{LFB1}} `AKONT` (mutabakat hesabı).\n' +
      '**Banka hesabı:** {{FBZP}} banka belirlemede ödeme yöntemi + ev bankası + hesap kimliği ' +
      'kombinasyonuna atanmış G/L hesabı (genelde {{banka-ara-hesabi}}).\n' +
      '**İskonto ve kur farkı hesapları:** IMG’deki otomatik kayıt ayarlarından ' +
      '(hesap anahtarları SKE iskonto, KDF kur farkı).',

    tur:
      '**Özelleştirme:** {{FBZP}}’nin beş adımı, ödeme yöntemleri, banka belirleme kuralları, ' +
      'ödeme ortamı format ağaçları, belge türleri.\n\n' +
      '**Ana veri:** satıcının ödeme yöntemi ({{LFB1}} `ZWELS`), ödeme bloğu (`ZAHLS`), ' +
      'banka bilgisi (IBAN); {{ev-bankasi}} hesapları.\n\n' +
      '**Hareket verisi:** koşular ({{REGUV}}/{{REGUH}}/{{REGUP}}) ve ödeme belgeleri.',

    transport:
      '{{FBZP}} ayarları taşınır. **Ama dikkat:** banka belirleme ayarları sisteme özgü ' +
      '{{ev-bankasi}} kayıtlarına referans verir. Ev bankaları ana veri olduğu için taşınmaz; ' +
      'bu yüzden FBZP taşındıktan sonra hedef sistemde banka belirleme **mutlaka kontrol edilmelidir**. ' +
      'Kullanılabilir tutarlar da genelde her sistemde ayrı ayarlanır.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Satıcı Hesapları → İş İşlemleri → Giden Ödemeler → Otomatik Giden Ödemeler → Ödeme Programı Yapılandırması', not:'{{FBZP}} — beş adımın tamamı' },
      { yol:'SPRO → … → Otomatik Giden Ödemeler → Ödeme Ortamı → Payment Medium Workbench → Format Ağaçlarını Oluştur', not:'PMW format tanımı ({{FBPM}})' },
      { yol:'SPRO → Finansal Muhasebe → Banka Muhasebesi → Banka Hesapları → Ev Bankalarını Tanımla', not:'{{ev-bankasi}} ve hesap kimlikleri ({{FI12}})' },
      { yol:'SPRO → … → Giden Ödemeler → Otomatik Giden Ödemeler → Ödeme Ortamı → Çek Yönetimi → Çek Numara Aralıklarını Tanımla', not:'Çek aralığı ({{FCHI}})' },
    ],

    ekstra:[
      { ic:'🏦', baslik:'Banka belirleme nasıl çalışır? — dört bölüm', metin:
        '{{FBZP}}’nin 5. adımı dört alt bölümden oluşur ve sırayla çalışır:\n\n' +
        '**1. Sıralama sırası (Ranking order):** ödeme yöntemi + para birimi için bankaların denenme sırası. ' +
        '"Önce İş Bankası, yetmezse Garanti."\n\n' +
        '**2. Banka hesapları (Bank accounts):** ödeme yöntemi + ev bankası + hesap kimliği kombinasyonuna ' +
        'karşılık gelen G/L hesabı ve ara hesap.\n\n' +
        '**3. Kullanılabilir tutarlar (Available amounts):** her banka hesabından o koşuda azami ne kadar ' +
        'çıkabileceği. **Boş bırakmak "sınırsız" değil "hiç" demektir** — en sık yapılan yapılandırma hatası budur.\n\n' +
        '**4. Değer tarihi ve ücretler:** valör günü ve banka masrafı ayarları.\n\n' +
        'Program 1’den 4’e sırayla ilerler. Herhangi birinde tanım yoksa "No suitable house bank found" alınır.' },

      { ic:'🔄', baslik:'Yanlış ödeme koşusu nasıl geri alınır?', metin:
        'Öneri aşamasındaysa kolaydır: **öneriyi sil**, hiçbir iz kalmaz.\n\n' +
        'Ödeme çalıştırıldıysa geri alma zahmetlidir ve sırayla yapılır:\n' +
        '**1.** Banka dosyası **gönderildiyse** önce bankayı ara ve durdur — sistemdeki düzeltme parayı geri getirmez.\n' +
        '**2.** Ödeme belgelerini {{FB08}} ile ters kaydet (toplu için {{F.80}}).\n' +
        '**3.** Ters kayıt kapatmayı otomatik açmazsa {{FBRA}} ile kapatmaları geri al — kalemler yeniden {{BSIK}}’e döner.\n' +
        '**4.** Çek üretildiyse {{FCH8}}/{{FCH9}} ile çekleri iptal et.\n\n' +
        'Bu zahmet, öneri onayının neden atlanmaması gerektiğini açıklar.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Kullanılabilir tutar boş bırakılamaz', metin:
        '{{FBZP}} banka belirlemede "kullanılabilir tutarlar" bölümü boşsa program o bankadan ' +
        '**hiç ödeme yapmaz**. Sezgiye aykırıdır: boş = sınırsız değil, boş = sıfır. ' +
        '"No suitable house bank found" hatasının en sık sebebi budur.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'F110 S/4HANA’da **kaldırılmadı ve mantığı değişmedi** — hâlâ ödeme sürecinin çekirdeğidir. ' +
      'Değişenler: Fiori tabanlı öneri yönetimi, {{ev-bankasi}} yönetiminin Bank Account Management’a ' +
      'taşınması ve ödeme ortamında PMW’nin standart hâline gelmesi.',

    eccFarklari:[
      { konu:'F110’un kendisi', ecc:'Çekirdek ödeme programı', s4:'**Aynı** — kaldırılmadı, mantığı değişmedi' },
      { konu:'Ev bankası yönetimi', ecc:'{{FI12}} — customizing gibi', s4:'Bank Account Management (BAM) — ana veri + onay akışı' },
      { konu:'Öneri yönetimi', ecc:'Klasik ALV listeleri', s4:'Fiori "Manage Automatic Payments" — görsel, süzülebilir' },
      { konu:'Ödeme ortamı', ecc:'Klasik RFFO* programları yaygın', s4:'**PMW standart** — SEPA/ISO20022 format ağaçları' },
      { konu:'Satıcı ana verisi', ecc:'{{XK01}}/{{FK01}}', s4:'{{BP}} — ödeme yöntemi ve banka bilgisi BP üzerinden' },
      { konu:'Açık kalem seçimi', ecc:'{{BSIK}} fiziksel tablo taranır', s4:'{{ACDOCA}} üzerinden — belirgin hızlanma' },
      { konu:'Nakit görünürlüğü', ecc:'Ayrı Cash Management modülü', s4:'Entegre Cash Management — ödeme koşusu nakit tahminine anlık yansır' },
    ],

    universalJournal:
      'Ödeme belgeleri de {{ACDOCA}}’ya yazılır ve satıcı, banka hesabı, kâr merkezi aynı satırda tutulur. ' +
      'Kalem seçimi {{BSIK}} yerine {{ACDOCA}} üzerinden yapıldığı için büyük satıcı portföylerinde ' +
      'öneri üretimi belirgin şekilde hızlanır — ECC’de bu adım en büyük darboğazdı.',

    kalkanTcodes:[
      { eski:'{{FI12}}', yeni:'FI12_HBANK / BAM', not:'Ev bankası yönetimi Fiori’ye ve ana veriye taşındı' },
      { eski:'Klasik RFFO* programları', yeni:'{{FBPM}} (PMW)', not:'Çalışmaya devam eder ama yeni kurulumlarda PMW kullanılır' },
      { eski:'{{XK01}}/{{FK01}}', yeni:'{{BP}}', not:'Satıcı ödeme verisi BP üzerinden' },
    ],

    fiori:[
      { ad:'Manage Automatic Payments', aciklama:'F110 önerisini görsel olarak yönetir; kalem bazında dâhil/hariç bırakma çok kolaylaşır.' },
      { ad:'Manage Bank Accounts', aciklama:'Ev bankası hesaplarını onay akışıyla yönetir (BAM).' },
      { ad:'Cash Flow Analyzer', aciklama:'Ödeme koşusunun nakit üzerindeki etkisini önceden gösterir.' },
      { ad:'Payment Blocks', aciklama:'Bloklu kalemleri iş listesi olarak yönetir; koşu öncesi temizliği hızlandırır.' },
      { ad:'Days Payable Outstanding', aciklama:'Ortalama ödeme süresini analiz eder.' },
    ],

    compatibilityViews:[
      '{{BSIK}}, {{BSAK}} — {{uyumluluk-view}}; F110 artık {{ACDOCA}} üzerinden çalışır.',
      '{{REGUH}}, {{REGUP}}, {{REGUV}} — **fiziksel tablo olarak duruyor**, değişmedi.',
      'Bu ayrım önemlidir: ödeme koşusu tabloları korunurken açık kalem indeksleri view’e dönüştü.',
    ],

    performans:
      'Öneri üretimi ECC’ye göre belirgin şekilde hızlıdır çünkü kalem seçimi sütun tabanlı {{ACDOCA}} ' +
      'üzerinden yapılır. Ödeme kaydı tarafında büyük fark yoktur — orada darboğaz veritabanı değil, ' +
      'her ödeme için ayrı LUW çalıştırılmasıdır.',

    bestPractices:[
      'Yeni kurulumlarda ödeme ortamı için **PMW kullan**; klasik RFFO* programlarına yeni geliştirme yapma.',
      'Ev bankası yönetimini BAM’a taşı ve banka hesabı değişikliklerini onay akışına bağla — ' +
      'ödeme dolandırıcılığına karşı en etkili kontroldür.',
      'Öneri onayını **zorunlu** bir süreç adımı yap; teknik olarak atlanabilir olması onaysız çalışmayı meşrulaştırmaz.',
      'Kullanılabilir tutarları gerçekçi belirle ve düzenli gözden geçir; unutulan düşük limitler koşuları sessizce yarım bırakır.',
      'Test sisteminde ödeme ortamı varyantını kaldır veya sahte bir dizine yönlendir.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'25 Eylül ödeme koşusu: 340 kalemden 86 ödemeye',
    hikaye:
      '**Marmara Tekstil A.Ş.** ayın 10’u ve 25’inde ödeme koşusu yapıyor. ' +
      '25 Eylül sabahı hazine uzmanı koşuyu açıyor. Bu senaryo, koşunun her aşamasını ' +
      've çıkan üç sorunun nasıl çözüldüğünü gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 — Marmara Tekstil A.Ş.' },
      { k:'Koşu', v:'Çalıştırma tarihi 25.09.2026 · Kimlik AP01' },
      { k:'Ödeme yöntemi', v:'H — banka havalesi' },
      { k:'Sonraki ödeme tarihi', v:'10.10.2026 (bir sonraki koşu)' },
      { k:'Ev bankaları', v:'İŞB (1. sıra, limit 5.000.000) · GRNT (2. sıra, limit 3.000.000)' },
      { k:'Açık kalem havuzu', v:'340 kalem, toplam 8.900.000 TL' },
    ],

    adimlar:[
      { baslik:'Koşu öncesi hazırlık', tcode:'MRBR',
        aciklama:'AP uzmanı önce bloklu faturaları temizliyor. Bu adım atlanırsa öneride ' +
                 'beklenmedik istisnalar çıkar ve koşu gecikir.',
        girdi:[
          { alan:'{{MRBR}}', deger:'12 bloklu MM faturası → 9’u çözüldü, 3’ü uyuşmazlıkta kaldı' },
          { alan:'{{FBL1N}}', deger:'Ödeme bloğu sütunu kontrol edildi → 5 kalem bilinçli bloklu' },
          { alan:'{{BP}}', deger:'2 yeni satıcıda ödeme yöntemi eksikti → "H" eklendi' },
        ],
        not:'Bu üç kontrol koşu öncesi rutin olmalıdır. Yapılmazsa istisna listesi kalabalıklaşır ' +
             've gerçek sorunlar gözden kaçar.' },

      { baslik:'Parametreler girilir', tcode:'F110',
        aciklama:'Koşu açılıyor ve parametre sekmesi dolduruluyor. **Sonraki ödeme tarihi** en kritik alan.',
        girdi:[
          { alan:'Çalıştırma tarihi / Kimlik', deger:'25.09.2026 / AP01' },
          { alan:'Ödeme kayıt tarihi', deger:'25.09.2026 (dönem 09 açık ✓)' },
          { alan:'Belge girişi son tarihi', deger:'25.09.2026' },
          { alan:'Şirket kodu / Ödeme yöntemi', deger:'1000 / H' },
          { alan:'**Sonraki ödeme tarihi**', deger:'10.10.2026 — bir sonraki koşu tarihi' },
          { alan:'Ek log', deger:'Ödeme yöntemi seçimi + kalem bazında + banka belirleme **açıldı**' },
        ],
        tabloEtkisi:[
          { tablo:'REGUV', ne:'Koşu kaydı oluştu: LAUFD 25.09.2026, LAUFI AP01, durum "parametreler girildi"' },
        ],
        not:'"Sonraki ödeme tarihi" 10.10 girildiği için program şunu soruyor: ' +
             '"Bu kalem 10 Ekim’e kadar bekleyebilir mi?" Bekleyemiyorsa bugün ödenecek.' },

      { baslik:'Öneri çalıştırılır', tcode:'F110',
        aciklama:'Sistem 340 kalemi tarıyor ve ödenecekleri seçiyor. **Hiçbir muhasebe kaydı yapılmıyor.**',
        girdi:[
          { alan:'Taranan', deger:'340 açık kalem / 8.900.000 TL' },
          { alan:'Bloklu (elendi)', deger:'8 kalem — kalem veya satıcı bloğu' },
          { alan:'Vadesi gelmemiş (elendi)', deger:'61 kalem — 10.10’a kadar bekleyebilir' },
          { alan:'Diğer istisnalar', deger:'39 kalem — aşağıda incelenecek' },
          { alan:'**Ödenecek**', deger:'232 kalem → 89 satıcı → **89 ödeme**' },
          { alan:'İskonto fırsatı', deger:'18 kalem iskonto süresinde → öne alındı, 34.200 TL kazanç' },
        ],
        tabloEtkisi:[
          { tablo:'REGUH', ne:'89 ödeme başlığı, **`XVORL` = X** (yalnızca öneri)' },
          { tablo:'REGUP', ne:'232 kalem satırı — hangi ödeme hangi faturayı kapatacak' },
          { tablo:'BSIK', ne:'**Değişmedi** — kalemler hâlâ açık' },
        ],
        not:'Öneri geri alınabilir: silinirse hiçbir iz kalmaz. Muhasebe henüz hiç etkilenmedi.' },

      { baslik:'İstisna listesi incelenir — üç sorun bulunur', tcode:'F110',
        aciklama:'39 istisnanın gerekçeleri **ek log**dan okunuyor. Üç farklı sorun çıkıyor.',
        girdi:[
          { alan:'**Sorun 1** — 14 kalem', deger:'"No valid payment method found" → satıcılarda `ZWELS` boş' },
          { alan:'Kök sebep', deger:'Yeni açılan satıcılarda ödeme yöntemi girilmemiş ({{BP}} → {{LFB1}})' },
          { alan:'**Sorun 2** — 6 kalem', deger:'"No suitable house bank found" → EUR ödemeleri' },
          { alan:'Kök sebep', deger:'{{FBZP}} banka belirlemede EUR için **kullanılabilir tutar girilmemiş** (boş = sıfır)' },
          { alan:'**Sorun 3** — 19 kalem', deger:'"Item is blocked for payment" → 3 satıcıda uyuşmazlık' },
          { alan:'Kök sebep', deger:'Bilinçli blok — fiyat uyuşmazlığı çözülmedi, ödenmemeli' },
        ],
        not:'İstisna listesi öneri listesinden **daha öğreticidir**. Ödenecekler beklendiği gibidir; ' +
             'öğretici olan ödenmeyeceklerin gerekçesidir.' },

      { baslik:'Sorunlar giderilir ve öneri yenilenir', tcode:'FBZP',
        aciklama:'İki sorun düzeltiliyor, üçüncüsü bilinçli olarak bırakılıyor.',
        girdi:[
          { alan:'Sorun 1 çözümü', deger:'{{BP}} → 14 satıcıya ödeme yöntemi "H" eklendi' },
          { alan:'Sorun 2 çözümü', deger:'{{FBZP}} → Banka belirleme → Kullanılabilir tutarlar → İŞB/EUR: 500.000 EUR girildi' },
          { alan:'Sorun 3 kararı', deger:'Bırakıldı — uyuşmazlık çözülene kadar ödenmeyecek' },
          { alan:'Öneri', deger:'Silindi ve yeniden çalıştırıldı → **252 kalem / 97 ödeme**' },
        ],
        not:'{{FBZP}}’de kullanılabilir tutarı **boş bırakmak "sınırsız" değil "hiç" demektir**. ' +
             'Bu, F110 yapılandırmasında en sık yapılan hatadır.' },

      { baslik:'Öneri onaylanır ve düzenlenir', tcode:'F110',
        aciklama:'Muhasebe müdürü öneriyi inceliyor. Nakit durumu nedeniyle iki büyük ödeme sonraki koşuya erteleniyor.',
        girdi:[
          { alan:'İncelenen', deger:'97 ödeme / 7.240.000 TL' },
          { alan:'Erteleme', deger:'2 satıcı (toplam 890.000 TL) öneriden çıkarıldı' },
          { alan:'Kısmi ödeme', deger:'1 satıcıda 100.000 TL’lik kalem 40.000’e düşürüldü' },
          { alan:'**Onaylanan**', deger:'95 ödeme / 6.290.000 TL' },
        ],
        not:'Öneri ekranında tutar değiştirmek {{kismi-kapatma}} üretir: orijinal kalem açık kalır.' },

      { baslik:'Ödeme çalıştırılır — muhasebe kayıtları oluşur', tcode:'F110',
        aciklama:'**Gerçek kayıtlar burada üretiliyor.** 95 ödeme belgesi oluşuyor ve faturalar kapanıyor.',
        girdi:[
          { alan:'Oluşan belge', deger:'95 adet, belge türü **KZ**' },
          { alan:'Kapatılan kalem', deger:'249 fatura kalemi' },
          { alan:'Toplam ödeme', deger:'6.290.000 TL' },
          { alan:'Kazanılan iskonto', deger:'34.200 TL (gelir yazıldı)' },
        ],
        fis:{ baslik:'Belge 2000001234 — V-4001 ödemesi (3 fatura birleşti)', belgeTuru:'KZ', tarih:'25.09.2026',
          satirlar:[
            { hesap:'320', ad:'Satıcılar — V-4001 (fatura 1)', borc:60000 },
            { hesap:'320', ad:'Satıcılar — V-4001 (fatura 2)', borc:45000 },
            { hesap:'320', ad:'Satıcılar — V-4001 (fatura 3)', borc:35000 },
            { hesap:'102', ad:'Banka ara hesabı — İŞB', alacak:139200, not:'Fiilen ödenen' },
            { hesap:'602', ad:'Alınan iskontolar', alacak:667, not:'Fatura 2 iskonto süresindeydi' },
            { hesap:'191', ad:'İndirilecek KDV düzeltmesi', alacak:133 },
          ], not:'Üç fatura ayrı satırlarda kapatıldı ama bankaya **tek ödeme** çıkıyor. ' +
                 '{{REGUP}} bu ödemenin hangi üç faturayı kapattığını tutuyor.' },
        tabloEtkisi:[
          { tablo:'REGUH', ne:'`XVORL` **boşaldı**, `VBLNR` = 2000001234 ödeme belgesi numarası yazıldı' },
          { tablo:'BSIK', ne:'249 kalem buradan **silindi**' },
          { tablo:'BSAK', ne:'249 kalem eklendi, `AUGBL` = ilgili ödeme belgesi' },
          { tablo:'BKPF', ne:'95 ödeme belgesi başlığı (KZ)' },
        ] },

      { baslik:'Banka dosyası üretilir ve gönderilir', tcode:'FBPM',
        aciklama:'PMW ile ISO20022 formatında ödeme dosyası oluşturuluyor.',
        girdi:[
          { alan:'Format ağacı', deger:'ISO20022 PAIN.001 — İŞ Bankası' },
          { alan:'Dosya', deger:'95 ödeme talimatı, 6.290.000 TL' },
          { alan:'Gönderim', deger:'Bankaya iletildi' },
        ],
        not:'Varyant tanımlı olmasaydı ödeme kaydedilir ama dosya üretilmezdi — ' +
             '"ödeme yapıldı ama bankaya bir şey gitmedi" durumu tam olarak budur.' },

      { baslik:'Ertesi gün — banka ekstresi işlenir', tcode:'FEBAN',
        aciklama:'Ekstre geliyor ve {{banka-ara-hesabi}} kapatılıyor. Nakit çıkışı **ancak burada** kesinleşiyor.',
        fis:{ baslik:'Belge 1000004567 — Banka ekstresi', belgeTuru:'SB', tarih:'26.09.2026',
          satirlar:[
            { hesap:'102', ad:'Banka ara hesabı — İŞB', borc:6290000, not:'Ara hesap kapatıldı' },
            { hesap:'102', ad:'Bankalar — İŞB gerçek hesap', alacak:6290000, not:'Para fiilen çıktı' },
          ] },
        tabloEtkisi:[
          { tablo:'FEBKO', ne:'Ekstre başlığı' },
          { tablo:'FEBEP', ne:'Ekstre kalemleri — ödeme dosyasıyla eşleşti' },
        ],
        not:'Ara hesabın bakiyesi sıfırlandı. Sıfırlanmıyorsa ya ekstre eksik işlenmiştir ' +
             'ya bazı ödemeler bankada gerçekleşmemiştir — her ikisi de araştırılmalıdır.' },
    ],

    sonuc:
      '**Koşu özeti:** 340 kalem tarandı → 89 ödeme önerildi → 3 sorun tespit edildi → ' +
      '2’si düzeltildi → 97 ödemeye çıktı → müdür 2 ödemeyi erteledi → **95 ödeme gerçekleşti**. ' +
      'Kazanılan iskonto: 34.200 TL.\n\n' +
      '**Üç kritik ders:**\n\n' +
      '**1. Ek log olmadan F110 teşhis edilemez.** Üç sorunun da kök sebebi yalnızca log’da görünüyordu. ' +
      'Log kapalı olsaydı "39 kalem neden ödenmedi?" sorusu cevapsız kalırdı.\n\n' +
      '**2. İstisna listesi öneri listesinden değerlidir.** Ödenecekler beklendiği gibidir; ' +
      'sistemin ne öğrettiği, ödenmeyeceklerin gerekçesindedir.\n\n' +
      '**3. Öneri ile ödeme arasındaki fark hayatidir.** Öneri aşamasında üç sorun bulundu ve ' +
      'düzeltildi — hiçbir muhasebe kaydı bozulmadı. Doğrudan ödeme çalıştırılsaydı 39 kalem eksik ' +
      'ödenecek ve düzeltmek için 95 belgeyi ters kaydetmek gerekecekti.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '{{F110}}, vadesi gelen borçları toplu seçen, öneri üreten, ödemeyi kaydeden ve banka dosyasını oluşturan programdır.',
      '**İki aşamalıdır:** öneri (muhasebe kaydı **yok**, geri alınabilir) ve ödeme (kayıt **var**, geri alması zor).',
      'Koşu **çalıştırma tarihi (`LAUFD`) + kimlik (`LAUFI`)** ikilisiyle tanımlanır.',
      'Muhasebe kaydı sadedir: **satıcı borç / banka (ara hesap) alacak**, artı {{iskonto}} ve {{kur-farki}} satırları.',
      'F110’un davranışını **{{FBZP}}** belirler: 5 adım — şirket kodları, ödeme yapan şirket, yöntem/ülke, yöntem/şirket kodu, **banka belirleme**.',
      'Tablolar: {{REGUV}} (durum), {{REGUH}} (ödeme başlıkları), {{REGUP}} (ödenen kalemler). `XVORL` = X ise **öneridir**.',
      '**Ek log** açılmadan teşhis yapılamaz; "kalem neden seçilmedi" sorusunun cevabı yalnızca oradadır.',
      'Kullanılabilir tutar **boş bırakılamaz** — boş "sınırsız" değil "sıfır" demektir.',
    ],

    onemliNoktalar:[
      '**"FBZP’de kaç adım var, ne yaparlar?"** Beş: (1) tüm şirket kodları, (2) ödeme yapan şirket kodları, (3) ödeme yöntemleri/ülke, (4) ödeme yöntemleri/şirket kodu, (5) **banka belirleme**. Sıra: kim ödüyor → nasıl ödüyor → hangi bankadan.',
      '**"Öneri ile ödeme farkı?"** Öneri muhasebe kaydı yapmaz ({{REGUH}} `XVORL` = X), serbestçe silinir. Ödeme gerçek kayıt üretir, geri alması {{FB08}} + {{FBRA}} gerektirir.',
      '**"F110 hiçbir kalem seçmiyor. Ne yaparsın?"** Ek log’u aç. Sırayla: ödeme yöntemi var mı ({{LFB1}} `ZWELS`), blok var mı (`ZAHLS`/`ZLSPR`), vade "sonraki ödeme tarihine" kadar doluyor mu, banka belirleme tam mı.',
      '**"Sonraki ödeme tarihi ne işe yarar?"** Program "bu kalem bir sonraki koşuya kadar bekleyebilir mi?" sorusunu buna göre cevaplar. Yanlışsa ya erken ödersin ya {{iskonto}} kaçırırsın.',
      '**"Bir ödeme hangi faturaları kapattı?"** {{REGUP}} tablosundan okunur. Aynı satıcının kalemleri tek ödemede birleşir.',
      '**"Neden banka ara hesabı kullanılır?"** Ödemenin kaydedildiği an ile paranın fiilen çıktığı an farklıdır. Ara hesap bu ikisini ayırır ve mutabakatı mümkün kılar.',
      '**"Kullanılabilir tutar boş bırakılırsa?"** Program o bankadan **hiç ödeme yapmaz**. "No suitable house bank found" hatasının bir numaralı sebebi.',
      '**"S/4HANA’da F110 kalktı mı?"** Hayır. Mantığı aynı; Fiori "Manage Automatic Payments" ile öneri yönetimi kolaylaştı, ev bankası BAM’a taşındı, PMW standart oldu.',
    ],

    sikHatalar:[
      { hata:'Ek log’u açmadan koşu yapmak.', dogru:'Her koşuda ek log açılır ve sorunlu satıcı log aralığına yazılır. Teşhisin tek kaynağıdır.' },
      { hata:'Öneriyi atlayıp doğrudan ödeme çalıştırmak.', dogru:'Öneri zorunlu bir kontrol noktasıdır. Ödeme geri alması çok zordur.' },
      { hata:'{{FBZP}}’de kullanılabilir tutarı boş bırakmak.', dogru:'Boş = sıfır. Gerçekçi bir üst sınır girilmelidir.' },
      { hata:'"Sonraki ödeme tarihi"ne yarını yazmak.', dogru:'Bir sonraki koşu tarihi yazılır. Yarın yazılırsa program neredeyse hiçbir şey ödemez.' },
      { hata:'Ödeme yöntemini sadece ülke seviyesinde tanımlamak.', dogru:'{{FBZP}} 4. adımda **şirket kodu** seviyesinde de tanımlanmalıdır.' },
      { hata:'Ödemeyi doğrudan gerçek banka hesabına yazmak.', dogru:'{{banka-ara-hesabi}} kullanılır; ekstre geldiğinde kapatılır. Aksi hâlde mutabakat imkânsızlaşır.' },
      { hata:'Yanlış koşuyu düzeltmek için yeni ödeme yapmak.', dogru:'Belgeler {{FB08}}/{{F.80}} ile ters kaydedilir, kapatmalar {{FBRA}} ile açılır. Dosya gönderildiyse önce banka aranır.' },
      { hata:'Test sisteminde ödeme ortamı varyantını açık bırakmak.', dogru:'Test koşusunda varyant kaldırılır — yanlışlıkla gerçek dosya üretilmesi önlenir.' },
      { hata:'İstisna listesini okumadan öneriyi onaylamak.', dogru:'İstisna listesi ödenmeyeceklerin gerekçesini verir; asıl öğretici çıktı odur.' },
    ],

    ipuclari:[
      'Koşu öncesi üç kontrolü rutin hâline getir: **{{MRBR}}** bloklu faturalar, **{{FBL1N}}** ödeme bloğu sütunu, ' +
      '**{{BP}}** ödeme yöntemi eksik satıcılar.',
      'Ek log’u tüm satıcılar için açma — çıktı devasa olur. Sorunlu satıcıyı log aralığına yaz.',
      'Kimlik (`LAUFI`) için disiplinli bir adlandırma kullan: AP01, AP02, ACIL1… Sonradan koşu bulmak kolaylaşır.',
      'Durum sekmesi kendiliğinden yenilenmez — öneri bittiğinde yenile tuşuna bas. ' +
      '"Öneri çalışmadı" sanmanın bir numaralı sebebi budur.',
      '{{banka-ara-hesabi}} bakiyesini haftalık izle. Büyüyorsa ekstre işlenmiyor veya ödemeler bankada gerçekleşmiyordur.',
      'FBZP’yi ezberlemek yerine **sırasını** hatırla: kim ödüyor (1-2) → nasıl ödüyor (3-4) → hangi bankadan (5).',
    ],

    quiz:[
      { soru:'F110 öneri (proposal) çalıştırması hangi muhasebe kaydını üretir?',
        secenekler:[
          'Satıcı borç / Banka alacak',
          'Hiçbir muhasebe kaydı üretmez',
          'Sadece iskonto kaydı',
          'Banka ara hesabı kaydı',
        ], dogru:1,
        aciklama:'Öneri yalnızca {{REGUH}}/{{REGUP}} tablolarına `XVORL` = X ile yazılır. ' +
                 'Hiçbir G/L hesabı hareket etmez, {{BSIK}} değişmez. Bu yüzden öneri serbestçe silinebilir. ' +
                 'Muhasebe kayıtları **ödeme çalıştırmasında** oluşur.' },

      { soru:'{{FBZP}}’de banka belirlemede "kullanılabilir tutarlar" boş bırakılırsa ne olur?',
        secenekler:[
          'Sınırsız ödeme yapılır',
          'Varsayılan bir limit uygulanır',
          'O bankadan **hiç ödeme yapılmaz**',
          'Uyarı verilir ama ödeme yapılır',
        ], dogru:2,
        aciklama:'Sezgiye aykırıdır ama boş = sıfırdır. Program o bankayı hiç seçmez ve ' +
                 '"No suitable house bank found" hatası alınır. F110 yapılandırmasında en sık yapılan hatadır.' },

      { soru:'"Sonraki ödeme tarihi" (next payment date) alanı ne işe yarar?',
        secenekler:[
          'Ödeme belgelerinin kayıt tarihini belirler',
          'Program "bu kalem bir sonraki koşuya kadar bekleyebilir mi?" sorusunu buna göre cevaplar',
          'Banka dosyasının gönderim tarihidir',
          'Vade tarihini günceller',
        ], dogru:1,
        aciklama:'Bu alan koşunun **kapsamını** belirler. Kalemin vadesi veya {{iskonto}} süresi bu tarihten ' +
                 'önce doluyorsa bugün ödenir. Yarın yazılırsa program neredeyse hiçbir şey ödemez; ' +
                 'çok ileri bir tarih yazılırsa vadesi gelmemiş borçlar erken ödenir.' },

      { soru:'Bir ödemenin hangi faturaları kapattığı hangi tablodan okunur?',
        secenekler:['{{REGUH}}','{{REGUP}}','{{REGUV}}','{{BSIK}}'],
        dogru:1,
        aciklama:'{{REGUH}} ödeme **başlıklarını** tutar (kime, ne kadar). {{REGUP}} ise o ödemenin ' +
                 'hangi fatura kalemlerini kapattığını tutar. Aynı satıcının birden çok faturası ' +
                 'tek ödemede birleştiğinde bu ayrım kritik hâle gelir. {{REGUV}} koşunun durumunu tutar.' },

      { soru:'F110 hiçbir kalem seçmiyor. İlk yapılacak şey nedir?',
        secenekler:[
          'FBZP’yi sıfırdan yapılandırmak',
          '**Ek log’u açıp** koşuyu tekrarlamak',
          'Tüm satıcıların bloklarını kaldırmak',
          'Yeni bir şirket kodu tanımlamak',
        ], dogru:1,
        aciklama:'Ek log, her kalem için "neden seçilmedi" gerekçesini yazar: ödeme yöntemi yok mu, ' +
                 'blok mu var, vade mi gelmemiş, banka mı bulunamadı. Bu bilgi **başka hiçbir yerde yoktur**. ' +
                 'Log’suz teşhis, karanlıkta arama yapmaktır.' },

      { soru:'Neden ödeme doğrudan gerçek banka hesabına değil, banka ara hesabına yazılır?',
        secenekler:[
          'Vergi mevzuatı gerektirdiği için',
          'Ödemenin kaydedildiği an ile paranın fiilen çıktığı an farklı olduğu için',
          'Banka hesabına doğrudan kayıt yapılamadığı için',
          'İskonto hesaplanabilsin diye',
        ], dogru:1,
        aciklama:'{{banka-ara-hesabi}} bu iki anı ayırır. Ödeme kaydedilir → ara hesap alacaklanır. ' +
                 'Ekstre gelir ({{FEBAN}}) → ara hesap kapatılır, gerçek hesap çalışır. ' +
                 'Ara hesabın bakiyesi sürekli büyüyorsa mutabakat yapılmıyor demektir.' },

      { soru:'Ödeme çalıştırması yapıldı ve banka dosyası gönderildi. Ödeme yanlıştı. İlk adım nedir?',
        secenekler:[
          '{{FB08}} ile belgeleri ters kaydetmek',
          '{{FBRA}} ile kapatmaları geri almak',
          '**Bankayı arayıp ödemeyi durdurmak**',
          'Yeni bir F110 koşusu açmak',
        ], dogru:2,
        aciklama:'Sistemdeki düzeltme parayı geri getirmez. Dosya gönderildiyse önce bankayla temas kurulur. ' +
                 'Sonra sırayla: belgeler {{FB08}}/{{F.80}} ile ters kaydedilir, kapatmalar {{FBRA}} ile açılır, ' +
                 'çek varsa iptal edilir. Bu zahmet, öneri onayının neden atlanmaması gerektiğini gösterir.' },

      { soru:'{{REGUH}} tablosunda `XVORL` alanı "X" ise bu ne anlama gelir?',
        secenekler:[
          'Ödeme iptal edilmiş',
          'Kayıt yalnızca **öneridir**, gerçek ödeme değil',
          'Ödeme bloklu',
          'Çek ile ödenmiş',
        ], dogru:1,
        aciklama:'`XVORL` = X öneri aşamasını gösterir: muhasebe kaydı yoktur, `VBLNR` (ödeme belgesi) boştur ' +
                 've kayıt serbestçe silinebilir. Ödeme çalıştırıldığında `XVORL` boşalır ve `VBLNR` dolar.' },
    ],

    flashcards:[
      { on:'F110 kaç aşamalıdır?', arka:'**İki ana aşama:**\n1. **Öneri** — muhasebe kaydı YOK, REGUH-XVORL = X, serbestçe silinir\n2. **Ödeme** — kayıt VAR, faturalar kapanır, geri alması zor\n\nArada **insan onayı** olmalıdır.' },
      { on:'Bir F110 koşusu neyle benzersiz kılınır?', arka:'**Çalıştırma tarihi (LAUFD) + Kimlik (LAUFI)**\n\nAynı gün ikinci koşu için farklı kimlik verilir (AP01, AP02…).' },
      { on:'FBZP’nin beş adımı nedir?', arka:'1. Tüm şirket kodları\n2. Ödeme yapan şirket kodları\n3. Ödeme yöntemleri / **ülke**\n4. Ödeme yöntemleri / **şirket kodu**\n5. **Banka belirleme**\n\nSıra: kim ödüyor → nasıl ödüyor → hangi bankadan.' },
      { on:'F110’un ürettiği muhasebe kaydı nedir?', arka:'**Satıcı borç / Banka (ara hesap) alacak**\n\nArtı varsa:\n• İskonto geliri (602)\n• KDV düzeltmesi\n• Kur farkı (646/656)\n\nVe faturalar kapatılır: BSIK → BSAK.' },
      { on:'F110’un üç tablosu nedir?', arka:'**REGUV** — koşunun durumu\n**REGUH** — ödeme başlıkları (kime, ne kadar)\n**REGUP** — ödenen kalemler (hangi faturalar)\n\nXVORL = X ise sadece öneridir.' },
      { on:'"Sonraki ödeme tarihi" ne işe yarar?', arka:'Program şunu sorar: **"Bu kalem bir sonraki koşuya kadar bekleyebilir mi?"**\n\nBekleyemiyorsa (vade veya iskonto süresi dolacaksa) bugün öder.\n\nYanlış girilirse ya erken ödersin ya iskonto kaçar.' },
      { on:'"No valid payment method found" — sebepleri?', arka:'1. Satıcıda ödeme yöntemi yok (LFB1-ZWELS)\n2. Yöntem **şirket kodu** seviyesinde tanımsız (FBZP 4. adım)\n3. Yöntemin zorunlu alanı eksik (örn. IBAN)\n\n**Ek log** hangisi olduğunu tam olarak söyler.' },
      { on:'Kullanılabilir tutar boş bırakılırsa ne olur?', arka:'**O bankadan hiç ödeme yapılmaz.**\n\nBoş = sınırsız DEĞİL, boş = sıfır.\n\n"No suitable house bank found" hatasının bir numaralı sebebidir.' },
      { on:'Neden banka ara hesabı kullanılır?', arka:'Ödemenin **kaydedildiği an** ile paranın **fiilen çıktığı an** farklıdır.\n\nÖdeme → ara hesap alacaklanır\nEkstre (FEBAN) → ara hesap kapanır, gerçek hesap çalışır\n\nBakiyesi büyüyorsa mutabakat yapılmıyordur.' },
      { on:'Ek log neden her koşuda açılmalı?', arka:'**"Kalem neden seçilmedi?"** sorusunun cevabı yalnızca orada bulunur.\n\nAçılacaklar: ödeme yöntemi seçimi + kalem bazında + banka belirleme.\n\nSorunlu satıcıyı log aralığına yaz — çıktı okunabilir kalır.' },
      { on:'Yanlış ödeme koşusu nasıl geri alınır?', arka:'**Öneriyse:** sil, iz kalmaz.\n\n**Ödeme yapıldıysa sırayla:**\n1. Dosya gönderildiyse **bankayı ara**\n2. FB08 / F.80 ile ters kaydet\n3. FBRA ile kapatmaları aç\n4. Çek varsa iptal et' },
      { on:'S/4HANA’da F110 değişti mi?', arka:'**Kaldırılmadı, mantığı aynı.**\n\nDeğişenler:\n• Fiori "Manage Automatic Payments" ile görsel öneri yönetimi\n• Ev bankası → Bank Account Management (BAM)\n• Ödeme ortamı → **PMW standart**\n• Kalem seçimi ACDOCA üzerinden, daha hızlı' },
    ],
  },

  },
});
