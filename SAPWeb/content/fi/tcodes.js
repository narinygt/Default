/* ==========================================================================
   content/fi/tcodes.js — "SAP Transaction Codes (İşlem Kodları)"
   ========================================================================== */

SAP.registerTopic({
  id: 'tcodes',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'İşlem kodu, bir SAP ekranına giden **kısayoldur**. Menüde beş tıklamayla ' +
      'ulaşılan ekran, komut alanına `FB60` yazılarak tek adımda açılır.\n\n' +
      'Ama asıl mesele kısayol olması değil — **kodların rastgele olmamasıdır**.\n\n' +
      '`FK01` · `FD01` · `FS00` · `FBL1N` · `BSIK`\n\n' +
      'Bu beşi ezberlenecek beş şey gibi görünür. Aslında **iki harflik bir kural** ' +
      'hepsini açıklar: SAP Almanca geliştirildi ve harfler Almanca kelimelerin baş harfidir.\n\n' +
      '**K** = *Kreditor* (satıcı) · **D** = *Debitor* (müşteri) · **S** = *Sachkonto* (G/L hesabı)\n\n' +
      'Kural görülünce liste kendiliğinden çözülür: `FK01` satıcı açar, `FD01` müşteri açar, ' +
      '`FS00` G/L hesabı açar, `BSIK` satıcı kalemlerini tutar.\n\n' +
      '**Bu konunun tezi:** işlem kodları ezberlenmez, **çözülür**. ' +
      'Yaklaşık 15 kalıp, yüzlerce kodu tahmin edilebilir hâle getirir.',

    neden:
      '**Hız.** Menüde gezinmek yavaştır; danışman günde onlarca ekran değiştirir.\n\n' +
      '**Tahmin edilebilirlik.** Kalıbı bilen, hiç görmediği bir kodun ne yaptığını ' +
      '**tahmin edebilir** — ve genelde doğru tahmin eder.\n\n' +
      '**İletişim.** Danışmanlar birbirine ekran adıyla değil **kodla** konuşur: ' +
      '*"F-53 ile öde"*, *"FBL1N\'den bak"*.\n\n' +
      '**Yetkilendirme.** Roller işlem kodu bazında verilir; hangi kodun ne yaptığını ' +
      'bilmeden rol tasarlanamaz.\n\n' +
      '**Belgeleme.** Süreç dokümanları işlem koduyla yazılır; ' +
      'ekran adları sürümle ve dille değişir, **kod değişmez**.',

    sirketOnemi:
      'İşlem kodu bilgisi, danışmanın **görünür yetkinliğidir**. ' +
      'Toplantıda *"o ekranın adı neydi?"* diye düşünen kişiyle ' +
      '*"FBL3N\'de kalem yönetimi kapalı olabilir"* diyen kişi arasındaki fark budur.\n\n' +
      'Ama gerçek değer başka yerde: **kalıbı bilen, bilmediği kodu bulabilir.** ' +
      'SAP\'ta on binlerce işlem kodu vardır; hiç kimse hepsini bilmez. ' +
      'Fark, arama stratejisindedir.\n\n' +
      'Mülakatta ayırt edici soru: **"F-02 ile FB50 arasındaki fark nedir?"** ' +
      'Yüzeysel cevap *"ikisi de G/L kaydı yapar"*. ' +
      'Doğru cevap: **`F-02` eski nesil, {{kayit-anahtari}} girmeyi gerektirir; ' +
      '`FB50` yeni nesil (Enjoy), kayıt anahtarını borç/alacak seçiminden kendisi türetir.** ' +
      'Bu ayrım, tirenin (`F-`) neyi işaret ettiğini bilip bilmediğini ölçer.',

    gercekHayat:
      'Yeni danışman ekranda bir hata görüyor: *"Belge tipi AB için numara aralığı eksik"*. ' +
      'Belge tipi ayarını değiştirmesi gerekiyor ama **hangi işlem kodu** olduğunu bilmiyor.\n\n' +
      '**Ezberden gitmeye çalışırsa** takılır — bilmediği bir kodu hatırlayamaz.\n\n' +
      '**Kalıptan giderse** üç adımda bulur:\n\n' +
      '**1.** Bu bir **özelleştirme** ayarı → FI özelleştirme kodları **`OB`** ile başlar.\n' +
      '**2.** {{SE16N}} → {{TSTCT}} → `TCODE` = `OB*` ve `TTEXT` içinde *belge*\n' +
      '**3.** Sonuç: **{{OBA7}}** — Belge Türlerini Tanımla.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Daha da hızlısı:** {{SPRO}} açılır, IMG ağacında *Belge Türü* aranır ve ' +
      'düğüme tıklanınca **kod zaten oradadır**.\n\n' +
      'İkisi de aynı yere çıkar. Fark, **ezber gerektirmemesidir**.',

    muhasebeMantigi:
      'İşlem kodlarının muhasebe mantığı, kodların **muhasebe kayıt türüne göre** ' +
      'gruplanmış olmasıdır.\n\n' +
      'Muhasebede üç temel kayıt vardır: **borç doğuran** (fatura), ' +
      '**borç kapatan** (ödeme/tahsilat) ve **düzeltici** (ters kayıt, aktarma).\n\n' +
      'SAP bu üçlüyü ayrı kod ailelerine dağıtır:\n\n' +
      '**Doğuran:** {{FB60}} satıcı faturası · {{FB70}} müşteri faturası · {{FB50}} G/L\n' +
      '**Kapatan:** {{F-53}} ödeme · {{F-28}} tahsilat · {{F-32}} kapatma · {{F110}} toplu ödeme\n' +
      '**Düzeltici:** {{FB08}} ters kayıt · {{FB02}} değişiklik · {{KB11N}} CO aktarma\n\n' +
      'Bu gruplama tesadüf değildir: **kapatma işlemleri neredeyse tamamı `F-` ailesindedir**, ' +
      'çünkü {{acik-kalem}} seçimi gerektiren eski nesil diyalog ekranlarıdır. ' +
      'Yeni nesil `FB` ekranları tek satır kayıt için tasarlandı; ' +
      'kapatma **doğası gereği** çok kalemli bir seçim ekranı ister.\n\n' +
      'Yani kod ailesi, **işin muhasebe doğasını** yansıtır.',

    kavramlar: ['kayit-anahtari', 'acik-kalem', 'ozellestirme', 'yetki-nesnesi',
                'dokum', 'alv-duzeni'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Doğru kodu bulmanın **dört yolu** vardır ve hepsi farklı duruma uyar. ' +
      'Deneyimli danışman ezberden değil, **bu dört yoldan** gider.',

    roller:[
      { rol:'Kullanıcı', gorev:'İhtiyacı iş diliyle söyler: *"satıcı faturası gireceğim"*.' },
      { rol:'Danışman', gorev:'Kalıptan tahmin eder — modül harfi + işlem türü.' },
      { rol:'Danışman', gorev:'Emin değilse {{TSTCT}}’de **açıklamadan arar**.' },
      { rol:'Danışman', gorev:'Özelleştirmeyse {{SPRO}} ağacından gider — kod düğümde yazılıdır.' },
      { rol:'Danışman', gorev:'Özel (`Z*`) kodsa {{SE93}} ile arkasındaki programa bakar.' },
      { rol:'Kullanıcı', gorev:'Sık kullandığı kodları **favorilere** ekler.' },
      { rol:'Yetkilendirme', gorev:'Kodu role ekler — {{PFCG}}, {{yetki-nesnesi}} `S_TCODE`.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Doğru işlem kodunu bulmanın dört yolu',
      adimlar:[
        { ic:'❓', rol:'Kullanıcı', baslik:'İhtiyaç iş diliyle ifade edilir',
          aciklama:'*"Satıcı faturası gireceğim"* · *"belge türü ayarını değiştireceğim"* · ' +
                   '*"bu Z kodu ne yapıyor?"*',
          cikti:'İhtiyaç', ok:'tür belirlenir' },
        { ic:'🧭', rol:'Danışman', baslik:'İşlem türü belirlenir',
          aciklama:'**Kayıt / rapor** mı, **özelleştirme** mi, **teknik** mi? ' +
                   'Bu soru hangi yolun kullanılacağını belirler.',
          cikti:'Tür', ok:'yol seçilir' },
        { ic:'🔤', rol:'Danışman', baslik:'1️⃣ Kalıptan tahmin — en hızlısı',
          aciklama:'Modül harfi + işlem harfi + numara. ' +
                   'Satıcı faturası → FI + fatura → **{{FB60}}**. ' +
                   'Deneyimli danışmanın %80’i buradan çözülür.',
          cikti:'Tahmin', ok:'tutmazsa' },
        { ic:'🔍', rol:'Danışman', baslik:'2️⃣ Açıklamadan arama — en güvenilir',
          aciklama:'{{SE16N}} → {{TSTCT}} → `TTEXT` içinde `*fatura*`. ' +
                   'Kodu bilmeden **ne yaptığını** bilmek yeterlidir.',
          cikti:'Aday kodlar', ok:'özelleştirmeyse' },
        { ic:'⚙️', rol:'Danışman', baslik:'3️⃣ {{SPRO}} ağacı — özelleştirme için',
          aciklama:'IMG ağacında konu aranır; düğüme tıklanınca **kod zaten oradadır**. ' +
                   '`OB*` kodlarını ezberlemeye gerek kalmaz.',
          cikti:'Özelleştirme ekranı', ok:'özel kodsa' },
        { ic:'🧩', rol:'Danışman', baslik:'4️⃣ {{SE93}} — "bu kod ne çalıştırıyor?"',
          aciklama:'Özellikle müşteriye özel `Z*` kodlarında. ' +
                   'Program adı ve ekran numarası görünür.',
          cikti:'Program adı', ok:'kullanıma alınır' },
        { ic:'⭐', rol:'Kullanıcı', baslik:'Favorilere eklenir, {{SU3}} ile varsayılan verilir',
          aciklama:'Sık kullanılan kod favoriye; şirket kodu gibi tekrar eden alanlar ' +
                   '{{SU3}} **parametreleriyle** otomatik dolar.',
          cikti:'Hızlı erişim' },
      ],
    },

    adimlar:[
      { rol:'Danışman', eylem:'Kalıptan tahmin eder', sistem:'Modül harfi + işlem türü' },
      { rol:'Danışman', eylem:'Açıklamadan arar', sistem:'{{SE16N}} → {{TSTCT}} → `TTEXT`' },
      { rol:'Danışman', eylem:'Menü ağacından gider', sistem:'{{SMEN}} → uygulama menüsü' },
      { rol:'Danışman', eylem:'Özelleştirme kodunu bulur', sistem:'{{SPRO}} — düğümde yazılı' },
      { rol:'Danışman', eylem:'Özel kodu çözer', sistem:'{{SE93}} → program adı' },
      { rol:'Kullanıcı', eylem:'Favorilere ekler', sistem:'Easy Access → Favoriler' },
      { rol:'Kullanıcı', eylem:'Varsayılan alan değeri verir', sistem:'{{SU3}} → Parametreler' },
      { rol:'Yetkilendirme', eylem:'Kodu role ekler', sistem:'{{PFCG}} — `S_TCODE`' },
    ],

    veriAkisi:{
      nereden:'Kullanıcı komut alanına kodu yazar veya menüden seçer.',
      nereye:'{{TSTC}}’den program adı okunur, program çalıştırılır.',
      tetikleyen:'Komut alanı girişi · menü tıklaması · favori · Fiori kutucuğu.',
      sonraki:'İlgili ekran açılır — yetki kontrolü (`S_TCODE`) **önce** yapılır.',
    },

    notlar:[
      { tip:'tip', baslik:'Komut alanı önekleri — az bilinen ama günlük kullanım', metin:
        'Komut alanına kodu doğrudan yazmak, **mevcut işlemi kapatmadan** yeni kod ' +
        'çalıştırmaya çalışır ve çoğu zaman hata verir. Önekler bunu çözer:\n\n' +
        '**`/n<kod>`** — mevcut işlemi **kapat**, yenisini başlat. ' +
        'En sık kullanılan önektir. Örnek: `/nFB03`\n\n' +
        '**`/o<kod>`** — yenisini **ayrı oturumda** aç. ' +
        'İki ekranı yan yana karşılaştırmak için: kaydı bir pencerede yaparken ' +
        'diğerinde tabloya bakmak.\n\n' +
        '**`/n`** — yalnızca mevcut işlemi kapatır, ana menüye döner.\n\n' +
        '**`/i`** — bulunulan oturumu **kapatır**.\n\n' +
        '**`/nex`** — sistemden **onay sormadan** çıkar. ' +
        '⚠️ Kaydedilmemiş veri **sorulmadan gider**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**`/$sync`** — tüm **{{tampon}}ları** temizler.\n\n' +
        'Bu sonuncusu bir danışman aracıdır ve şu soruyu çözer: ' +
        '*"Özelleştirmeyi değiştirdim ama etkisi görünmüyor."* ' +
        '{{T001}}, {{T004}}, {{T030}} gibi yapılandırma tabloları tamponlanır; ' +
        'değişiklik hemen okunmayabilir.\n\n' +
        '⚠️ **Canlı sistemde dikkatli kullanılır** — tüm kullanıcıları etkiler ve ' +
        'geçici performans düşüşü yaratır. Test sisteminde serbesttir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'İşlem kodu kendisi kayıt üretmez — ama **hangi kodun hangi kaydı ürettiğini** ' +
      'bilmek, kod haritasının muhasebe karşılığıdır. ' +
      'Aşağıda en sık kullanılan dört kodun ürettiği kayıtlar var.',

    etkilenenHesaplar:[
      { hesap:'{{FB60}} → 320 Satıcılar', tur:'Bilanço — Kaynak', neden:'Satıcı faturası **borç doğurur**.' },
      { hesap:'{{FB70}} → 120 Alıcılar', tur:'Bilanço — Varlık', neden:'Müşteri faturası **alacak doğurur**.' },
      { hesap:'{{F-53}} → 102 Bankalar', tur:'Bilanço — Varlık', neden:'Ödeme borcu **kapatır**.' },
      { hesap:'{{AFAB}} → 257 / 770', tur:'Karma', neden:'Amortisman **toplu** çalışır, tek tek girilmez.' },
      { hesap:'{{FB08}} → aynı hesaplar ters', tur:'Düzeltici', neden:'Ters kayıt **yeni belge** üretir, eskisini silmez.' },
    ],

    fisler:[
      { baslik:'{{FB60}} — satıcı faturası (borç doğuran)',
        belgeTuru:'KR', tarih:'10.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:100000 },
          { hesap:'191', ad:'İndirilecek KDV', borc:20000 },
          { hesap:'320', ad:'Satıcılar', alacak:120000, not:'**Açık kalem** oluştu' },
        ],
        not:'`FB` ailesi **yeni nesildir**: tek ekran, {{kayit-anahtari}} girmeye gerek yok. ' +
             'Borç/alacak seçimi yapılır, sistem kayıt anahtarını **kendisi türetir**.\n\n' +
             'Aynı kaydı `F-43` ile de yapabilirsin — ama orada ' +
             '**31** (satıcı alacak) ve **40** (G/L borç) anahtarlarını **elle girmen** gerekir.\n\n' +
             'Sonuç aynı belgedir. Fark **kullanım kolaylığıdır**, muhasebe değil.' },

      { baslik:'{{F-53}} — ödeme (borç kapatan)',
        belgeTuru:'KZ', tarih:'25.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar (kapatma)', borc:120000, not:'{{BSIK}} → {{BSAK}}' },
          { hesap:'102', ad:'Bankalar', alacak:120000 },
        ],
        not:'**Kapatma işlemleri neden hep `F-` ailesinde?**\n\n' +
             'Çünkü kapatma, doğası gereği **açık kalem seçimi** gerektirir: ' +
             'hangi faturaları kapatacağını bir listeden işaretlersin.\n\n' +
             'Yeni nesil `FB` ekranları **tek satır kayıt** için tasarlandı; ' +
             'çok kalemli seçim ekranı sunmazlar.\n\n' +
             'Yani kod ailesi keyfi değil — **işin muhasebe doğasını** yansıtıyor.' },

      { baslik:'{{FB08}} — ters kayıt (düzeltici)',
        belgeTuru:'KR', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar', borc:120000 },
          { hesap:'770', ad:'Genel yönetim gideri', alacak:100000 },
          { hesap:'191', ad:'İndirilecek KDV', alacak:20000 },
        ],
        not:'⚠️ **Ters kayıt silme değildir** — orijinal belge yerinde kalır, ' +
             '**yeni bir belge** üretilir ve ikisi birbirine bağlanır ' +
             '({{BKPF}} `STBLG` alanı).\n\n' +
             'Mizanda **iki kayıt** görünür. Bu, denetim izinin gereğidir: ' +
             'SAP\'ta muhasebeleşmiş bir belge **hiçbir kodla silinemez**.\n\n' +
             'Bu yüzden {{FB08}}, {{konu:dogrulama-ikame}} konusundaki ' +
             '*"önleyici kontrol tespit ediciden üstündür"* ilkesinin somut sebebidir: ' +
             'hata önlenirse **sıfır belge**, sonradan bulunursa **üç belge** oluşur.' },

      { baslik:'{{AFAB}} — amortisman (toplu üreten)',
        belgeTuru:'AF', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Amortisman gideri', borc:45000 },
          { hesap:'257', ad:'Birikmiş amortisman', alacak:45000 },
        ],
        not:'Bazı kodlar **tek belge**, bazıları **toplu** üretir. ' +
             'Bu ayrım kodun nasıl kullanılacağını belirler.\n\n' +
             '**Toplu üretenler:** {{AFAB}} amortisman · {{F110}} ödeme · ' +
             '{{F.05}} kur değerlemesi · {{F.13}} otomatik kapatma\n\n' +
             '**Ortak özellikleri:**\n' +
             '• Önce **test çalıştırması** (deneme) yapılır\n' +
             '• Arka planda çalışır → {{SM37}} ile izlenir\n' +
             '• Günlük üretir → {{SLG1}} ile okunur\n' +
             '• Hata tek satırda olsa bile **tümü etkilenebilir**\n\n' +
             'Toplu bir kodu test çalıştırması yapmadan canlıda çalıştırmak, ' +
             'danışmanlıkta en pahalı hatalardan biridir.' },
    ],

    tHesaplar:[
      { hesap:'Satıcılar — kod bazında hareket', kod:'320',
        borc:[{ ad:'{{F-53}} ödeme', tutar:120000 }],
        alacak:[{ ad:'{{FB60}} fatura', tutar:120000 }],
        not:'Doğuran ve kapatan **farklı kod ailelerinde**' },
    ],

    notlar:[
      { tip:'warn', baslik:'Aynı kaydı üreten birden çok kod vardır', metin:
        'Bir muhasebe kaydının **tek bir doğru işlem kodu yoktur**. ' +
        'Aynı satıcı faturası şu üç yoldan girilebilir:\n\n' +
        '**{{FB60}}** — yeni nesil, tek ekran, kayıt anahtarı yok\n' +
        '**`F-43`** — eski nesil, kayıt anahtarı elle girilir\n' +
        '**{{MIRO}}** — MM tarafından, satın alma siparişine bağlı\n\n' +
        'Üçü de {{BKPF}} + {{BSEG}} üretir ve muhasebe sonucu **aynıdır**.\n\n' +
        '**Ama üçü aynı değildir:**\n\n' +
        '{{MIRO}} sipariş ve mal girişiyle **eşleştirme** yapar (bkz. {{konu:mm-integration}}); ' +
        'diğer ikisi yapmaz. Siparişe bağlı bir faturayı {{FB60}} ile girmek ' +
        '**GR/IR hesabını açıkta bırakır**.\n\n' +
        '**Kural:** kod seçimi bir kolaylık tercihi değil, ' +
        '**sürecin hangi kontrolden geçeceği** kararıdır.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Aşağıdaki **on iki kalıp**, FI’da karşılaşacağın kodların neredeyse tamamını açıklar. ' +
      'Ezberlenecek olan kodlar değil, **bu kalıplardır**.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Üç harfin anahtarı — Almanca kökler**\n\n' +
      'SAP Almanca geliştirildi. Üç harf hem işlem kodlarında hem tablo adlarında ' +
      '**aynı anlamı** taşır:\n\n' +
      '| Harf | Almanca | Türkçe | İşlem kodu | Tablo |\n' +
      '|---|---|---|---|---|\n' +
      '| **K** | *Kreditor* | Satıcı | `FK01` `FK03` | {{BSIK}} {{BSAK}} |\n' +
      '| **D** | *Debitor* | Müşteri | `FD01` `FD03` | {{BSID}} {{BSAD}} |\n' +
      '| **S** | *Sachkonto* | G/L hesabı | `FS00` | {{BSIS}} {{BSAS}} |\n\n' +
      'Tablo adları da aynı mantıkla çözülür: **BS** + **I/A** + **K/D/S**\n\n' +
      '**I** = *offen* (açık kalem) · **A** = *ausgeglichen* (kapatılmış)\n\n' +
      'Yani {{BSAK}} = kapatılmış satıcı kalemleri, {{BSID}} = açık müşteri kalemleri. ' +
      'Sekiz tablo adı, **iki kuralla** çözülür.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Sayı ekleri**\n\n' +
      '**01** oluştur · **02** değiştir · **03** görüntüle\n\n' +
      '`AS01/02/03` varlık · `FK01/02/03` satıcı · `KS01/02/03` maliyet yeri\n\n' +
      '**9x** = eski veri aktarımı (*Altdaten*): `AS91` devir varlığı\n\n' +
      '⚠️ **Ünlü istisna: {{FS00}}.** G/L hesabında `FS01/02/03` yoktur; ' +
      '`FS00` **tek ekranda** üçünü de yapar — mod ekranın içinden seçilir. ' +
      'Kalıbın istisnası olduğu için sık sorulur.',

    liste:[
      { ad:'📝 Kayıt · `F-` tireli — eski nesil', en:'Classic posting',
        aciklama:'{{kayit-anahtari}} **elle girilir**. Çok kalemli ve kapatmalı işlemler için.',
        neZaman:'Kapatma, avans, karmaşık çok satırlı kayıtlar.',
        ornek:'`F-02` G/L · `F-43` satıcı faturası · **{{F-53}}** ödeme · ' +
              '**{{F-28}}** tahsilat · **{{F-32}}** müşteri kapatma · `F-44` satıcı kapatma\n\n' +
              '**Tire (`-`) eski nesli işaret eder.** Kapatma işlemlerinin ' +
              'neredeyse tamamı bu ailededir — çünkü {{acik-kalem}} seçim ekranı gerekir.',
        tcodes:['F-53','F-28','F-32'] },

      { ad:'📝 Kayıt · `FB` tiresiz — yeni nesil (Enjoy)', en:'Enjoy posting',
        aciklama:'Tek ekran, kayıt anahtarı **gerekmez** — borç/alacak seçilir, sistem türetir.',
        neZaman:'Günlük tek belgelik kayıtlar. Kullanıcıya verilecek varsayılan.',
        ornek:'**{{FB50}}** G/L · **{{FB60}}** satıcı faturası · **{{FB70}}** müşteri faturası · ' +
              '**{{FB03}}** görüntüle · **{{FB08}}** ters kayıt · {{FB02}} değiştir\n\n' +
              '**Son rakam ipucu:** `0` girişi, `2` değiştirme, `3` görüntüleme eğilimindedir.',
        tcodes:['FB50','FB60','FB03'] },

      { ad:'📋 Döküm · `FBL_N` — kalem listeleri', en:'Line item display',
        aciklama:'Hesap bazında {{dokum}}; **belgeye inilebilir**.',
        neZaman:'*"Bakiye neden bu kadar?"* sorusunda.',
        ornek:'**{{FBL1N}}** satıcı (**1**) · **{{FBL3N}}** G/L (**3**) · ' +
              '**{{FBL5N}}** müşteri (**5**)\n\n' +
              'Sondaki **`N`** = *neu* (yeni) — eski `FBL1` sürümünün ALV’li hâli.\n\n' +
              '⚠️ Döküm için hesapta **kalem yönetimi açık** olmalıdır ' +
              've geriye dönük açılamaz (bkz. {{konu:reporting}}).',
        tcodes:['FBL1N','FBL3N','FBL5N'] },

      { ad:'📊 Rapor · `F.` noktalı — eski rapor programları', en:'Classic reports',
        aciklama:'Nokta (`.`) rapor tipi işlemi işaret eder. Çoğu **toplu** çalışır.',
        neZaman:'Dönem sonu ve toplu işlemler.',
        ornek:'**{{F.01}}** mali tablo · **{{F.05}}** kur değerlemesi · ' +
              '**{{F.13}}** otomatik kapatma · {{F.19}} GR/IR analizi · `F.80` toplu ters kayıt\n\n' +
              '⚠️ Bu ailenin tamamında **önce test çalıştırması** yapılır.',
        tcodes:['F.01','F.05','F.13'] },

      { ad:'📊 Rapor · `S_ALR_87012xxx` — üretilmiş kodlar', en:'Generated report codes',
        aciklama:'Rapor ağacından **otomatik üretilmiş** kodlar. Okunabilir değildirler.',
        neZaman:'Standart mali raporlar.',
        ornek:'{{S_ALR_87012357}} KDV listesi · {{S_ALR_87012284}} mali tablo · ' +
              '{{S_ALR_87013611}} maliyet yeri planlanan/fiili\n\n' +
              '**Bunlar ezberlenmez** — sistem üretmiştir, anlamlı değildirler. ' +
              '**Menüden veya favoriden** erişilir. Kalıbı bilmenin faydası: ' +
              'bu öneki görünce *"bu bir standart rapordur, menüde vardır"* denir.' },

      { ad:'⚙️ Özelleştirme · `OB` / `OBA` / `OBY`', en:'FI Customizing',
        aciklama:'FI yapılandırma ekranlarına **kısayol**. Hepsi {{SPRO}} ağacında da vardır.',
        neZaman:'Yapılandırma değişikliğinde.',
        ornek:'**{{OB52}}** dönem açma · **{{OBA7}}** belge türleri · ' +
              '**{{OB40}}** vergi hesapları · {{OB58}} mali tablo yapısı · ' +
              '{{OB08}} döviz kuru · {{OBYC}} MM hesap belirleme\n\n' +
              '**Ezberlemeye gerek yok:** {{SPRO}} ağacında konu aranır, ' +
              'düğüme tıklanınca kod **zaten görünür**.',
        tcodes:['OB52','OBA7','OB40'] },

      { ad:'⚙️ Özelleştirme · `GG` — kural motoru', en:'Validation / Substitution',
        aciklama:'{{konu:dogrulama-ikame}} araçları. FI-SL kökenli oldukları için ayrı önek.',
        neZaman:'Kayıt anında kural koyarken.',
        ornek:'**{{GGB0}}** doğrulama · **{{GGB1}}** ikame · **{{GGB4}}** etkinleştirme\n\n' +
              'Atama ayrı ailededir: {{OB28}} ve {{OBBH}}.',
        tcodes:['GGB0','GGB1','GGB4'] },

      { ad:'🏛️ Varlık · `A` — duran varlık', en:'Asset Accounting',
        aciklama:'Duran varlık muhasebesinin tamamı `A` ile başlar.',
        neZaman:'Varlık edinimi, amortisman, satış.',
        ornek:'{{AS01}} varlık aç · `AS91` **devir** varlığı (9x = eski veri) · ' +
              '**{{AFAB}}** amortisman · {{ABZON}} edinim · {{AW01N}} varlık gezgini · ' +
              '{{AIAB}}/{{AIBU}} yatırım dağıtımı · {{AFAMA}} amortisman anahtarı\n\n' +
              '**{{AW01N}}** ailenin en değerli kodudur: bir varlığın ' +
              '**tüm hareketlerini ve tüm alanlarını** tek ekranda gösterir.',
        tcodes:['AS01','AFAB','AW01N'] },

      { ad:'💰 Toplu işlem · `F110` / `F150` — programlar', en:'Batch programs',
        aciklama:'Numaralı, tiresiz, noktasız kodlar genelde **büyük programlardır**.',
        neZaman:'Toplu ödeme ve ihtar.',
        ornek:'**{{F110}}** otomatik ödeme · **{{F150}}** ihtar\n\n' +
              '**Ortak deseni:** parametre → **öneri** → kontrol → çalıştırma. ' +
              'Öneri adımı, toplu işlemin **geri alınabilir tek noktasıdır**.',
        tcodes:['F110','F150'] },

      { ad:'🔗 CO · `K` — kontrol muhasebesi', en:'Controlling',
        aciklama:'CO nesneleri ve işlemleri `K` ile başlar.',
        neZaman:'Maliyet yeri, masraf türü, iç sipariş işlemlerinde.',
        ornek:'{{KS01}} maliyet yeri · {{KA01}} masraf türü · {{KO01}} iç sipariş · ' +
              '**{{KB11N}}** yeniden kaydetme · {{KSU5}} dağıtım · {{KSV5}} devir · ' +
              '{{OKB9}} varsayılan atama\n\n' +
              '⚠️ CO içi düzeltme **{{FB08}} ile değil {{KB11N}} ile** yapılır — ' +
              'FI zaten doğrudur (bkz. {{konu:cost-center}}).',
        tcodes:['KS01','KB11N','OKB9'] },

      { ad:'🔧 Teknik · `SE` / `SM` / `SU` / `ST`', en:'Technical',
        aciklama:'Modül değil, **sistem** araçları. Danışmanın teşhis takımı.',
        neZaman:'Teşhis, geliştirme, yetki analizi.',
        ornek:'**{{SE16N}}** tablo içeriği · {{SE11}} tablo yapısı · {{SE93}} kod tanımı · ' +
              '{{SE38}} program\n' +
              '**{{SM12}}** kilitler · **{{SM13}}** güncelleme hataları · {{SM37}} işler\n' +
              '**{{SU53}}** yetki hatası · {{SU3}} kendi parametrelerin\n' +
              '{{ST05}} SQL izleme\n\n' +
              '⚠️ Bu aile **son kullanıcıya verilmez** (bkz. {{konu:sap-tables}}).',
        tcodes:['SE16N','SM13','SU53'] },

      { ad:'🌐 Merkezi bakım · `X` — tüm alanlar', en:'Central maintenance',
        aciklama:'`X` = tüm görünümler birlikte. FI + MM veya FI + SD aynı ekranda.',
        neZaman:'Ana veri açarken — **tercih edilen yol**.',
        ornek:'**{{XK01}}** satıcı (FI + satın alma) · **{{XD01}}** müşteri (FI + satış)\n\n' +
              'Karşılaştır: {{FK01}} yalnızca **muhasebe** görünümü, ' +
              '`MK01` yalnızca **satın alma** görünümü.\n\n' +
              '⚠️ {{FK01}} ile açılan satıcıya **sipariş girilemez** — ' +
              'satın alma görünümü yoktur. Klasik yeni danışman hatası.',
        tcodes:['XK01','XD01','FK01'] },
    ],

    karsilastirmaBasliklar:['`F-43` (eski nesil)', '{{FB60}} (yeni nesil)'],
    karsilastirma:[
      ['Ekran sayısı', 'Çok ekranlı, satır satır', '**Tek ekran**'],
      ['{{kayit-anahtari}}', '**Elle girilir** (31, 40 …)', 'Gerekmez — sistem türetir'],
      ['Öğrenme eğrisi', 'Dik — anahtar bilgisi şart', '**Düşük**'],
      ['Çok kalemli kayıt', '**Güçlü**', 'Sınırlı'],
      ['Açık kalem seçimi', '**Var**', 'Yok'],
      ['Muhasebe sonucu', 'Aynı belge', '**Aynı belge**'],
      ['Kime verilir', 'Muhasebe uzmanı', '**Son kullanıcı**'],
      ['S/4HANA durumu', 'Duruyor', 'Duruyor · Fiori karşılığı var'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'SE93', ad:'İşlem kodu tanımı — "bu kod ne çalıştırıyor?"',
        amac:'Bir işlem kodunun arkasındaki programı, ekranı ve tipini gösterir.',
        neZaman:'Özel (`Z*`) kodları çözerken; bir kodun ne yaptığını doğrularken.',
        adimlar:[
          { baslik:'İşlem kodunu gir ve görüntüle' },
          { baslik:'**İşlem tipini** oku',
            aciklama:'Diyalog · rapor · **parametre işlemi** · nesne yöntemi. ' +
                     'Tip, kodun nasıl davranacağını belirler.' },
          { baslik:'Program ve ekran numarasını al' },
          { baslik:'Gerekirse {{SE38}} ile programı incele' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'İşlem kodu **`ZFI_RAPOR`**' },
          { ekran:'Tanım', islem:'Tip: **rapor işlemi** · program `ZFIR_ACIK_KALEM`' },
          { ekran:'Çıkarım', islem:'Özel bir ABAP raporu — standart değil' },
          { ekran:'Devam', islem:'{{SE38}} ile kaynak incelendi, {{BSIK}} okuduğu görüldü' },
        ],
        alanlar:{
          zorunlu:['İşlem kodu'],
          opsiyonel:['Paket','Yetki nesnesi ataması'] },
        hatalar:[
          { mesaj:'Transaction ... does not exist', sebep:'Kod yok veya farklı yazılmış.', cozum:'{{TSTCT}}’de **açıklamadan** ara; kod bu istemciye taşınmamış olabilir.' },
          { mesaj:'Kod var ama çalıştırınca hata veriyor', sebep:'Arkasındaki program taşınmamış.', cozum:'{{SE38}} ile programın varlığını kontrol et.' },
        ],
        ipucu:'**Parametre işlemi** kavramı az bilinir ama sık karşılaşılır: ' +
              'başka bir işlem kodunu **önceden doldurulmuş alanlarla** çağıran koddur.\n\n' +
              'Örnek: `Z_FB03_1000` kodu, {{FB03}}’ü şirket kodu 1000 sabitlenmiş ' +
              'olarak açar. Kullanıcı alanı değiştiremez.\n\n' +
              'Bu, **yetkilendirmede kullanılan bir tekniktir** — kullanıcıyı ' +
              'tek şirket koduna kısıtlamanın pratik yolu.',
        ilgili:['SE38','SE16N','TSTC'] },

      { kod:'SU3', ad:'Kendi kullanıcı verin — varsayılan alan değerleri',
        amac:'Sık tekrarlanan alanlara **otomatik varsayılan** atar.',
        neZaman:'İlk gün. Danışmanın sisteme yerleşirken yaptığı ilk ayar.',
        adimlar:[
          { baslik:'{{SU3}} çalıştır' },
          { baslik:'**Parametreler** sekmesine geç' },
          { baslik:'Parametre kimliğini ve değerini gir',
            aciklama:'`BUK` = 1000 (şirket kodu) · `CAC` = 1000 (kontrol alanı) · ' +
                     '`GJR` = 2027 (mali yıl).' },
          { baslik:'Kaydet — etkisi **sonraki ekranda** görünür' },
        ],
        ekranAkisi:[
          { ekran:'Parametreler', islem:'`BUK` = **1000**' },
          { ekran:'Test', islem:'{{FB03}} açıldı → şirket kodu **dolu geldi**' },
          { ekran:'Kazanç', islem:'Günde onlarca ekranda tekrar eden giriş ortadan kalktı' },
        ],
        alanlar:{
          zorunlu:['Parametre kimliği','Değer'],
          opsiyonel:['Varsayılan yazıcı','Tarih/sayı biçimi','Oturum dili'] },
        hatalar:[
          { mesaj:'Parametre girdim ama alan dolmuyor', sebep:'O alan parametre kimliğine bağlı değil.', cozum:'Alanın üzerinde `F1` → **Teknik bilgi** → parametre kimliği görünür; boşsa desteklenmiyordur.' },
          { mesaj:'Varsayılan yanlış şirket kodunu getiriyor', sebep:'Eski `BUK` değeri duruyor.', cozum:'{{SU3}}’ten güncelle. ⚠️ Yanlış varsayılan **yanlış şirket koduna kayıt** riskidir.' },
        ],
        ipucu:'**Bir alanın parametre kimliğini nasıl bulursun?**\n\n' +
              'Alanın üzerine gel → **`F1`** → **Teknik bilgi** → *Parameter ID*.\n\n' +
              'Bu, danışmanın en çok zaman kazandıran küçük numarasıdır ve ' +
              'aynı yol alanın **teknik adını** da verir — ' +
              'tabloda arama yaparken tam olarak buna ihtiyacın olur.',
        ilgili:['SMEN','SE93'] },

      { kod:'SPRO', ad:'IMG — özelleştirmenin tek kapısı',
        amac:'Tüm yapılandırma ekranlarını **ağaç yapısında** sunar.',
        neZaman:'`OB*` kodunu hatırlamadığın her seferde.',
        adimlar:[
          { baslik:'{{SPRO}} → SAP Referans IMG' },
          { baslik:'Ağaçta konuyu bul',
            aciklama:'Finansal Muhasebe → … Arama işlevi de kullanılabilir.' },
          { baslik:'Düğümün yanındaki **işlem kodunu oku**',
            aciklama:'Kod düğümde **yazılıdır** — ezberlemeye gerek yok.' },
          { baslik:'Saat ikonuyla ekranı aç' },
        ],
        alanlar:{
          zorunlu:[],
          opsiyonel:['Proje IMG','Belgeleme','Taşıma isteği'] },
        hatalar:[
          { mesaj:'Aradığım düğümü bulamıyorum', sebep:'IMG ağacı çok derin.', cozum:'Ağaç içinde **arama** kullan; veya {{TSTCT}}’de açıklamadan ara.' },
          { mesaj:'Değişiklik kaydedilmiyor / taşıma isteği soruyor', sebep:'Özelleştirme taşıma isteği gerektirir.', cozum:'{{tasima-istegi}} oluştur. İstemci ayarı değişikliğe kapalıysa Basis ekibine danış.' },
        ],
        ipucu:'**{{SPRO}}, `OB*` ezberini gereksiz kılar.**\n\n' +
              'Yeni danışmanların yaptığı en yaygın verimsizlik, ' +
              'özelleştirme kodlarını ezberlemeye çalışmaktır. ' +
              'Yüzlerce tanesi vardır ve çoğu yılda bir kez kullanılır.\n\n' +
              'Doğru alışkanlık: **konuyu ağaçta bul, kodu oradan oku.** ' +
              'Sık kullandıkların zaten kendiliğinden ezberlenir.',
        ilgili:['OB52','OBA7','SE93'] },

      { kod:'SE16N', ad:'{{TSTCT}} üzerinden kod arama',
        amac:'İşlem kodunu **açıklamasından** bulur — kalıp yetmediğinde.',
        neZaman:'*"Ne yaptığını biliyorum ama kodunu bilmiyorum."*',
        adimlar:[
          { baslik:'{{SE16N}} → tablo **{{TSTCT}}**' },
          { baslik:'`SPRSL` = `TR` (veya `EN`)',
            aciklama:'Dil verilmezse tüm diller gelir; sonuç okunmaz olur.' },
          { baslik:'`TTEXT` alanına joker ile ara',
            aciklama:'Örnek: `*ihtar*` · `*amortisman*` · `*doğrulama*`' },
          { baslik:'`TCODE` ile de daralt', aciklama:'Örnek: `OB*` yalnızca FI özelleştirmesi' },
        ],
        ekranAkisi:[
          { ekran:'Tablo', islem:'**{{TSTCT}}**' },
          { ekran:'Seçim', islem:'`SPRSL` = TR · `TTEXT` = `*ihtar*`' },
          { ekran:'Sonuç', islem:'**{{F150}}** — İhtar · birkaç ilgili kod' },
          { ekran:'Daraltma', islem:'`TCODE` = `OB*` eklendi → yalnızca ihtar **özelleştirmesi**' },
        ],
        alanlar:{
          zorunlu:['Tablo adı'],
          opsiyonel:['Dil','Metin deseni','Kod deseni'] },
        hatalar:[
          { mesaj:'Çok fazla sonuç geliyor', sebep:'Desen çok geniş veya dil verilmemiş.', cozum:'`SPRSL` ekle ve `TCODE` deseniyle daralt (`OB*`, `F*`, `S_ALR*`).' },
          { mesaj:'Türkçe arama sonuç vermiyor', sebep:'Metinler o dilde çevrilmemiş olabilir.', cozum:'`SPRSL` = `EN` ile İngilizce terimden ara — genelde daha kapsamlıdır.' },
        ],
        ipucu:'**Türkçe sonuç bulamazsan İngilizceye geç.** ' +
              'SAP metinlerinin çevirisi eksik olabilir; İngilizce metin tabanı ' +
              '**her zaman tamdır**.\n\n' +
              'Faydalı İngilizce anahtarlar: *dunning* (ihtar) · *depreciation* (amortisman) · ' +
              '*clearing* (kapatma) · *valuation* (değerleme) · *parking* (park).',
        ilgili:['TSTC','TSTCT','SE93'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'İşlem kodları da veridir ve **iki tabloda** durur: ' +
      '{{TSTC}} tanımı, {{TSTCT}} açıklamayı tutar. ' +
      'Kod aramanın teknik temeli budur.',

    liste:[
      { ad:'TSTC', baslik:'İşlem kodu tanımları',
        tutar:'Sistemdeki **tüm** işlem kodları ve arkalarındaki program.',
        olusturan:'SAP standart teslimatı; özel kodlar {{SE93}} ile',
        anahtar:'**TCODE**',
        iliskiler:'Metinler {{TSTCT}}’de, dile göre ayrı satırda.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'TCODE', aciklama:'İşlem kodu', tip:'pk' },
          { ad:'PGMNA', aciklama:'ABAP programı — "bu kod ne çalıştırıyor?"' },
          { ad:'DYPNO', aciklama:'Ekran numarası' },
          { ad:'CINFO', aciklama:'Tip: diyalog / rapor / **parametre işlemi**' },
        ] },

      { ad:'TSTCT', baslik:'İşlem kodu metinleri — aramanın asıl tablosu',
        tutar:'Kodların **dile göre** açıklamaları.',
        olusturan:'SAP standart teslimatı',
        anahtar:'**SPRSL + TCODE**',
        iliskiler:'{{TSTC}}’nin metin uzantısı.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'SPRSL', aciklama:'Dil — `TR` / `EN` / `DE`. ⚠️ **Verilmezse tüm diller gelir**', tip:'pk' },
          { ad:'TCODE', aciklama:'İşlem kodu', tip:'pk' },
          { ad:'TTEXT', aciklama:'**Açıklama** — `*ihtar*` gibi jokerle aranır' },
        ] },

      { ad:'BKPF', baslik:'Kodun ürettiği belgenin izi',
        tutar:'Her belgede **hangi işlemle** oluşturulduğu saklanır.',
        olusturan:'Belge kaydı',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'`TCODE` alanı {{TSTC}}’ye işaret eder.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'TCODE', aciklama:'**Belgeyi üreten işlem kodu** — denetimde ve teşhiste çok değerli' },
          { ad:'BLART', aciklama:'{{belge-turu}} — kod ile birlikte kaydın kaynağını anlatır' },
          { ad:'USNAM', aciklama:'Kaydeden kullanıcı' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'İşlem kodu → program → üretilen belge',
      varliklar:[
        { ad:'TSTC', rol:'Tanım', hub:true, aciklama:'**İşlem kodu ve programı**',
          alanlar:[{ ad:'TCODE', tip:'pk' }, { ad:'PGMNA' }, { ad:'DYPNO' }, { ad:'CINFO' }] },
        { ad:'TSTCT', rol:'Metin', aciklama:'Açıklama — **aramanın tablosu**',
          alanlar:[{ ad:'SPRSL', tip:'pk' }, { ad:'TCODE', tip:'pk' }, { ad:'TTEXT' }] },
        { ad:'BKPF', rol:'Belge', aciklama:'Kodun **ürettiği** belge',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'TCODE', tip:'fk' }, { ad:'BLART' }, { ad:'USNAM' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'Kalemler — tek tablo',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }] },
      ],
      iliskiler:[
        { from:'TSTC', to:'TSTCT', alanlar:'TCODE', not:'**dile göre metin**' },
        { from:'TSTC', to:'BKPF', alanlar:'TCODE', not:'kod → ürettiği belge' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'başlık → kalem' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'İşlem kodu kullanmanın üç arayüzü vardır: **komut alanı** (en hızlı), ' +
      '**menü** (en güvenilir) ve **favoriler** (en pratik).',

    ekranlar:[
      { ad:'Komut alanı — sol üstteki kutu',
        aciklama:'Kodun yazıldığı yer. Önekler burada işe yarar.',
        alanlar:[
          { ad:'`/n<kod>`', zorunlu:false, aciklama:'Mevcut işlemi **kapat**, yenisini başlat. ' +
                   'En sık kullanılan önek.' },
          { ad:'`/o<kod>`', zorunlu:false, aciklama:'**Ayrı oturumda** aç — iki ekranı ' +
                   'karşılaştırmak için.' },
          { ad:'`/n`', zorunlu:false, aciklama:'İşlemi kapat, ana menüye dön.' },
          { ad:'`/i`', zorunlu:false, aciklama:'Bulunulan oturumu kapat.' },
          { ad:'`/nex`', zorunlu:false, aciklama:'⚠️ **Onay sormadan** çıkış — ' +
                   'kaydedilmemiş veri sorulmadan gider.' },
          { ad:'`/$sync`', zorunlu:false, aciklama:'**{{tampon}}ları temizle.** ' +
                   '*"Ayarı değiştirdim, etkisi görünmüyor"* sorununun çözümü. ' +
                   '⚠️ Canlıda tüm kullanıcıları etkiler.' },
        ],
        ipucu:'**`/o` en az bilinen ama en çok işe yarayan önektir.**\n\n' +
              'Kaydı bir oturumda yaparken diğerinde {{SE16N}} ile tabloya bakmak, ' +
              'veya {{FBL3N}} ile bakiyeyi izlerken kayıt girmek mümkün olur.\n\n' +
              'Oturum sayısı sınırlıdır (genelde 6) ve fazlası bellek tüketir; ' +
              'işi biten oturum **`/i`** ile kapatılır.' },

      { ad:'{{SMEN}} — SAP Easy Access menüsü',
        aciklama:'Kodu bilmiyorsan **en güvenilir** yol.',
        alanlar:[
          { ad:'Menü ağacı', zorunlu:false, aciklama:'Muhasebe → Finansal Muhasebe → … ' +
                   'İş sürecinin mantığını izler.' },
          { ad:'**Favoriler**', zorunlu:false, aciklama:'Sık kullanılan kodlar. ' +
                   'Klasörlenebilir ve **dışa aktarılabilir** — yeni sisteme taşınır.' },
          { ad:'Teknik ad gösterimi', zorunlu:false, aciklama:'Ek → Ayarlar → ' +
                   '*Teknik adları göster*. **Öğrenirken açılmalıdır.**' },
        ],
        ipucu:'⭐ **"Teknik adları göster" ayarını ilk gün aç.**\n\n' +
              'Menüde gezinirken her düğümün yanında **işlem kodu görünür**. ' +
              'Bu, kod öğrenmenin en zahmetsiz yoludur: iş yaparken ' +
              'kodlar kendiliğinden aşina hâle gelir.\n\n' +
              'Kapalıyken yalnızca ekran adları görünür ve kod bilgisi **hiç oluşmaz**.' },

      { ad:'{{SU3}} — varsayılan parametreler',
        aciklama:'Tekrar eden alan girişlerini bitirir.',
        alanlar:[
          { ad:'`BUK`', zorunlu:false, aciklama:'Şirket kodu varsayılanı.' },
          { ad:'`CAC`', zorunlu:false, aciklama:'{{kontrol-alani}} varsayılanı.' },
          { ad:'`GJR`', zorunlu:false, aciklama:'Mali yıl varsayılanı.' },
          { ad:'Varsayılan yazıcı', zorunlu:false, aciklama:'Toplu raporlarda ' +
                   'çıktı hedefi sorulmasını engeller.' },
        ],
        ipucu:'**Bir alanın parametre kimliği:** alanın üzerinde **`F1`** → ' +
              '**Teknik bilgi** → *Parameter ID*.\n\n' +
              'Aynı ekran alanın **teknik adını** da verir — ' +
              '{{SE16N}} ile tabloda arama yaparken tam olarak buna ihtiyacın olur.\n\n' +
              '⚠️ Yanlış `BUK` varsayılanı, **yanlış şirket koduna kayıt** riskidir; ' +
              'birden çok şirket kodunda çalışıyorsan boş bırakmak daha güvenlidir.' },
    ],

    zorunlu:['İşlem kodu','`S_TCODE` yetkisi'],
    opsiyonel:['Önek (`/n`, `/o`)','Parametre varsayılanları','Favori'],

    hatalar:[
      { mesaj:'You are not authorized to use transaction ...', sebep:'`S_TCODE` yetkisi yok.', cozum:'{{SU53}} ile eksik yetkiyi gör, ekran görüntüsüyle yetkilendirmeye ilet.' },
      { mesaj:'Transaction ... does not exist', sebep:'Kod yok, yanlış yazılmış veya bu sürümde kaldırılmış.', cozum:'{{TSTCT}}’de açıklamadan ara. S/4HANA’da kaldırılmış olabilir — **basitleştirme listesine** bak.' },
      { mesaj:'Kod açılıyor ama liste **boş** geliyor — hata da yok', sebep:'⚠️ `S_TCODE` var ama **veri yetkisi** yok (`F_BKPF_BUK`).', cozum:'En yanıltıcı hatadır: işlem başlar, veri gelmez. {{SU53}} kontrol edilir. Detay: bu konudaki senaryo.' },
      { mesaj:'Ayarı değiştirdim ama etkisi görünmüyor', sebep:'Tablo {{tampon}}lanmış.', cozum:'Oturumu kapatıp aç; olmazsa `/$sync`. ⚠️ Canlıda tüm kullanıcıları etkiler.' },
      { mesaj:'Komut alanına kod yazdım, hata verdi', sebep:'Mevcut işlem hâlâ açık.', cozum:'`/n` öneki ile yaz: `/nFB03`.' },
      { mesaj:'`Z*` kod ne yapıyor bilmiyorum', sebep:'Müşteriye özel geliştirme.', cozum:'{{SE93}} ile programı bul, {{SE38}} ile incele.' },
    ],

    ipuclari:[
      '⭐ **"Teknik adları göster" ayarını ilk gün aç** — kodlar iş yaparken kendiliğinden öğrenilir.',
      '`/o` ile ikinci oturum aç: bir tarafta kayıt, diğerinde tablo.',
      'Kodu bilmiyorsan {{TSTCT}}’de **açıklamadan** ara; Türkçe sonuç vermezse **İngilizceye geç**.',
      'Özelleştirmede `OB*` ezberleme — {{SPRO}} ağacında konuyu bul, kod düğümde yazılı.',
      '{{SU3}} → `BUK` ile şirket kodunu varsayılan yap; ' +
      '⚠️ çok şirketli çalışıyorsan boş bırak.',
      'Alanın parametre kimliğini ve teknik adını **`F1` → Teknik bilgi** verir.',
      'Favorileri **dışa aktar** — yeni sisteme veya yeni projeye taşınır.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'TSTC', ne:'İşlem kodu tanımı — **okunur**, kayıt sırasında güncellenmez' },
      { tablo:'TSTCT', ne:'Kod açıklamaları — dile göre' },
      { tablo:'BKPF', ne:'`TCODE` alanına **belgeyi üreten kod** yazılır' },
    ],

    commit:
      'İşlem kodu bir LUW başlatmaz — **program başlatır**. ' +
      'LUW, programın içindeki kayıt işlemiyle başlar.\n\n' +
      'Ama bir ayrım önemlidir: **diyalog** işlemleri kullanıcı etkileşimi bekler, ' +
      '**rapor** işlemleri seçim ekranından sonra tek seferde çalışır.\n\n' +
      'Toplu programlar ({{F110}}, {{AFAB}}, {{F.05}}) **arka planda** çalıştırılabilir; ' +
      'o zaman LUW arka plan işine aittir ve {{SM37}} ile izlenir.',

    belgeNo:
      '{{BKPF}} `TCODE` alanı, belgeyi **hangi işlemin ürettiğini** saklar.\n\n' +
      'Bu alan teşhiste çok değerlidir: vergi hesabında `TCODE` = `FB50` olan satırlar ' +
      '**elle atılmış** kayıtlardır (bkz. {{konu:taxes}}). ' +
      'Aynı şekilde `TCODE` = `FB08` olanlar ters kayıtlardır.\n\n' +
      'Denetimde de kullanılır: *"bu kayıt hangi ekrandan girildi?"* sorusunun cevabı burada.',

    postingLogic:
      'Bir işlem kodu çalıştırıldığında sıra:\n\n' +
      '**1.** {{TSTC}}’den program ve ekran okunur.\n' +
      '**2.** **`S_TCODE` yetkisi** kontrol edilir → yoksa işlem **hiç başlamaz**.\n' +
      '**3.** Program başlar; ekran çizilir.\n' +
      '**4.** Program içinde **nesne bazlı yetki** kontrolleri yapılır ' +
      '(`F_BKPF_BUK` şirket kodu, `F_BKPF_KOA` hesap türü).\n' +
      '**5.** Kayıt yapılırsa {{konu:dogrulama-ikame}} kuralları devreye girer.\n' +
      '**6.** Belge yazılır; `TCODE` alanı doldurulur.\n\n' +
      '⚠️ **2. ve 4. adımın ayrı olması kritiktir.** ' +
      '`S_TCODE` varsa işlem **açılır**; veri yetkisi yoksa **boş liste** gelir. ' +
      'Kullanıcı hata görmez ve *"kayıt yok"* sanır. ' +
      'Bu, bu konudaki senaryonun konusudur.',

    belgeTuru:
      '{{belge-turu}} ile işlem kodu **birbirine bağlıdır** ama aynı şey değildir.\n\n' +
      '{{FB60}} varsayılan olarak `KR` üretir, {{FB70}} `DR` üretir — ' +
      'ama kullanıcı bunu **değiştirebilir** (yetkisi varsa).\n\n' +
      'Teşhiste ikisi birlikte kullanılır: `BLART` = `SA` **ve** `TCODE` = `FB50` ' +
      'olan satırlar, otomatik olması gereken bir hesaba **elle** atılmış kayıtlardır.',

    numberRange:
      'İşlem kodları numara aralığı kullanmaz. ' +
      'Ürettikleri belgeler {{belge-turu}}’ne bağlı aralıktan numara alır.\n\n' +
      'Özel kodlar {{SE93}} ile oluşturulur ve `Z` veya `Y` ile başlamalıdır — ' +
      'SAD ad alanı çakışmasını önleyen kural budur.',

    accountDetermination:
      'İşlem kodu hesap belirlemeyi **tetikler** ama içermez. ' +
      '{{MIRO}} çalıştırıldığında {{OBYC}} devreye girer; ' +
      '{{VF01}} çalıştırıldığında {{VKOA}}.\n\n' +
      'Pratik sonucu: *"account determination error"* mesajı aldığında ' +
      'hangi tabloya bakacağını **kodun modülü** söyler — ' +
      'MM kodu ise {{OBYC}}, SD kodu ise {{VKOA}}, FI vergi ise {{T030K}}.',

    tur:
      '{{SE93}}’teki **işlem tipi** kodun davranışını belirler:\n\n' +
      '**Diyalog işlemi** — bir ekrana bağlıdır, kullanıcı etkileşimi bekler ({{FB60}}).\n\n' +
      '**Rapor işlemi** — bir ABAP raporunu seçim ekranıyla çalıştırır ({{F.01}}).\n\n' +
      '**Parametre işlemi** — başka bir işlemi **önceden doldurulmuş alanlarla** çağırır. ' +
      'Kullanıcıyı tek şirket koduna kısıtlamanın pratik yoludur.\n\n' +
      '**Nesne yöntemi işlemi** — bir iş nesnesi yöntemini çalıştırır.',

    transport:
      'Standart işlem kodları taşınmaz — **sistemle gelirler**.\n\n' +
      'Özel (`Z*`) kodlar {{SE93}} ile oluşturulur ve **taşınır**. ' +
      '⚠️ Kod taşınır ama **arkasındaki program ayrı bir nesnedir**; ' +
      'biri gelip diğeri gelmezse *"kod var ama çalışmıyor"* durumu oluşur.\n\n' +
      '**Roller ({{PFCG}}) ayrıca taşınır.** Kod canlıya gitmiş olsa bile ' +
      'rol güncellenmemişse kullanıcı **yetkisiz** kalır — ' +
      'geçişte en sık atlanan adımlardan biri.',

    img:[
      { yol:'SE93 → İşlem kodu bakımı', not:'Özel kod oluşturma ve tip belirleme' },
      { yol:'SU3 → Kendi kullanıcı verisi → Parametreler', not:'`BUK`, `CAC`, `GJR`' },
      { yol:'PFCG → Rol bakımı → Menü', not:'Koda `S_TCODE` yetkisi rolden gelir' },
      { yol:'Easy Access → Ek → Ayarlar → Teknik adları göster', not:'⭐ İlk gün açılmalı' },
    ],

    ekstra:[
      { ic:'🔤', baslik:'Almanca kökler — 8 tablo adını 2 kuralla çözmek', metin:
        'SAP Almanya’da geliştirildi ve **Almanca kısaltmalar kod adlarına gömüldü**. ' +
        'Bu, tarihsel bir tuhaflık değil — **öğrenmeyi kısaltan bir anahtardır**.\n\n' +
        '**Üç hesap türü harfi:**\n\n' +
        '**K** = *Kreditor* → satıcı\n' +
        '**D** = *Debitor* → müşteri\n' +
        '**S** = *Sachkonto* → G/L hesabı\n\n' +
        'Bu üç harf **hem işlem kodlarında hem tablo adlarında** aynıdır:\n\n' +
        '`FK01` satıcı açar · `FD01` müşteri açar · `FS00` G/L açar\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Tablo adları: BS + I/A + K/D/S**\n\n' +
        '**I** = *offen* (açık kalem) · **A** = *ausgeglichen* (kapatılmış)\n\n' +
        '| | Satıcı (K) | Müşteri (D) | G/L (S) |\n' +
        '|---|---|---|---|\n' +
        '| **Açık (I)** | {{BSIK}} | {{BSID}} | {{BSIS}} |\n' +
        '| **Kapalı (A)** | {{BSAK}} | {{BSAD}} | {{BSAS}} |\n\n' +
        '**Sekiz tablo adı, iki kuralla çözüldü.** ' +
        'Bunları ayrı ayrı ezberlemeye çalışmak, kuralı görmemektir.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Diğer sık görülen Almanca izler:**\n\n' +
        '**`SHKZG`** — *Soll/Haben-Kennzeichen* → **S** borç, **H** alacak ' +
        '(bkz. {{konu:sap-tables}})\n' +
        '**`BUKRS`** — *Buchungskreis* → şirket kodu\n' +
        '**`BELNR`** — *Belegnummer* → belge numarası\n' +
        '**`GJAHR`** — *Geschäftsjahr* → mali yıl\n' +
        '**`WRBTR`** — *Währungsbetrag* → para birimi tutarı\n' +
        '**`BLART`** — *Belegart* → belge türü\n' +
        '**`N`** eki — *neu* (yeni) → {{FBL1N}}, {{ME21N}}, {{KB11N}}\n\n' +
        '**`BUK`** parametresi de *Buchungskreis*’tir — {{SU3}}’teki varsayılan.\n\n' +
        '**Pratik sonuç:** alan adı tanımadığında Almanca kökü tahmin etmeyi dene; ' +
        'şaşırtıcı ölçüde sık tutar.' },

      { ic:'🔒', baslik:'`S_TCODE` yetiyor mu? — iki katmanlı yetki', metin:
        'İşlem kodu yetkisi **iki katmanlıdır** ve bu ayrım bilinmezse ' +
        'teşhis edilemeyen bir hata sınıfı doğar.\n\n' +
        '**Katman 1 — `S_TCODE`:** *"Bu kodu çalıştırabilir mi?"*\n' +
        'Yoksa işlem **hiç başlamaz** ve net bir mesaj gelir: ' +
        '*"You are not authorized to use transaction ..."*\n\n' +
        '**Katman 2 — nesne yetkileri:** *"Hangi veriyi görebilir?"*\n' +
        '`F_BKPF_BUK` şirket kodu · `F_BKPF_KOA` hesap türü · `F_BKPF_BLA` belge türü\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Tehlikeli olan durum: birinci var, ikinci yok.**\n\n' +
        'İşlem **açılır**, kullanıcı seçim ekranını görür, çalıştırır ve ' +
        '**boş liste** gelir. Hiçbir hata mesajı çıkmaz.\n\n' +
        'Kullanıcı iki yanlış sonuçtan birine varır: ' +
        '*"veri yok"* veya *"sistem bozuk"*. ' +
        'İkisi de yanlıştır — veri vardır, **görme yetkisi yoktur**.\n\n' +
        '**Neden hata vermiyor?** Çoğu FI raporu yetkiyi bir **süzgeç** olarak uygular: ' +
        'yetkili şirket kodlarını listeler ve yalnızca onları sorgular. ' +
        'Liste boşsa sorgu boş döner — bu, program açısından ' +
        '**hatalı bir durum değildir**.\n\n' +
        '**Teşhis:** kullanıcı boş liste aldıktan **hemen sonra** {{SU53}} çalıştırır; ' +
        'son başarısız yetki kontrolü görünür. Ekran görüntüsü yetkilendirme ekibine gider.\n\n' +
        '⚠️ **{{SU53}} son kontrolü gösterir** — araya başka bir işlem girerse ' +
        'iz kaybolur. Bu yüzden *"hemen sonra"* şarttır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Yetki `S_TCODE` ile bitmez', metin:
        'Yeni danışmanların en sık yanılgısı: *"role işlem kodunu ekledim, yetki tamam."*\n\n' +
        '**Tamam değildir.** `S_TCODE` yalnızca kodun **çalışmasına** izin verir. ' +
        'Hangi veriyi göreceğini ayrı nesneler belirler:\n\n' +
        '`F_BKPF_BUK` — **şirket kodu**\n' +
        '`F_BKPF_KOA` — hesap türü (S / K / D / A)\n' +
        '`F_BKPF_BLA` — belge türü\n\n' +
        'Her birinde ayrıca **etkinlik** vardır: **01** oluştur · **02** değiştir · **03** görüntüle.\n\n' +
        '**Pratik sonuç:** *"görüntüleyebilsin ama kaydedemesin"* isteği ' +
        'kod ekleyerek değil, **etkinlik 03 verip 01/02 vermeyerek** çözülür.\n\n' +
        'Aynı şekilde *"yalnızca kendi şirket kodunu görsün"* isteği ' +
        '`F_BKPF_BUK` ile çözülür — işlem kodu listesiyle değil.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'İşlem kodları S/4HANA’da **kaldırılmadı** — komut alanı ve {{SMEN}} çalışmaya devam ediyor. ' +
      'Değişen iki şey var: **Fiori uygulamaları** birincil arayüz oldu ve ' +
      'bazı kodlar **basitleştirme listesiyle** kaldırıldı veya yönlendirildi.',

    eccFarklari:[
      { konu:'Komut alanı', ecc:'Birincil erişim', s4:'**Duruyor** — GUI’de aynı' },
      { konu:'Birincil arayüz', ecc:'SAP GUI menüsü', s4:'**Fiori Launchpad** kutucukları' },
      { konu:'FI kayıt kodları', ecc:'{{FB50}}, {{FB60}}, {{FB70}}', s4:'**Duruyor** + Fiori karşılıkları' },
      { konu:'Döküm kodları', ecc:'{{FBL1N}}, {{FBL3N}}, {{FBL5N}}', s4:'Duruyor · Fiori: *Display Line Items*' },
      { konu:'MM kayıt kodları', ecc:'`MB01`, `MB1A`, `MB1B`, `MB31` …', s4:'**Kaldırıldı** → {{MIGO}}' },
      { konu:'Satıcı/müşteri ana verisi', ecc:'{{XK01}}, {{XD01}}, {{FK01}}, {{FD01}}', s4:'**{{BP}}** — tek iş ortağı işlemi' },
      { konu:'Teknik kodlar', ecc:'{{SE16N}}, {{SE93}}, {{SM13}}', s4:'**Duruyor**' },
      { konu:'Kod bulma', ecc:'Menü + {{TSTCT}}', s4:'+ **Fiori Apps Reference Library**' },
    ],

    universalJournal:
      '{{evrensel-kayit-defteri}} işlem kodlarını doğrudan değiştirmedi — ' +
      'aynı kodlar aynı ekranları açıyor.\n\n' +
      'Ama **arkada** okudukları tablo değişti: {{FBL3N}} artık {{ACDOCA}}’dan ' +
      '(uyumluluk görünümü üzerinden) okuyor.\n\n' +
      'Pratik sonucu: **kod aynı, performans farklı.** ' +
      'Uyumluluk görünümü üzerinden çalışan eski özel raporlar yavaşlayabilir ' +
      '(bkz. {{konu:sap-tables}}).',

    kalkanTcodes:[
      { eski:'{{XK01}} / {{FK01}} / `MK01`', yeni:'**{{BP}}**', not:'Satıcı ana verisi — **tek iş ortağı işlemi**' },
      { eski:'{{XD01}} / {{FD01}} / `VD01`', yeni:'**{{BP}}**', not:'Müşteri ana verisi' },
      { eski:'`MB01`, `MB1A`, `MB1B`, `MB1C`, `MB31`', yeni:'{{MIGO}}', not:'MM mal hareketleri birleşti' },
      { eski:'`ME21` (N’siz)', yeni:'{{ME21N}}', not:'Eski sürüm kaldırıldı' },
      { eski:'—', yeni:'—', not:'FI kayıt ve döküm kodları **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Fiori Apps Reference Library', aciklama:'**Kod → uygulama** eşlemesinin resmi kaynağı. ' +
             'Bir işlem kodunun Fiori karşılığı var mı, buradan bakılır.' },
      { ad:'Post General Journal Entries', aciklama:'{{FB50}} karşılığı.' },
      { ad:'Create Supplier Invoice', aciklama:'{{FB60}} karşılığı.' },
      { ad:'Display Supplier Line Items', aciklama:'{{FBL1N}} karşılığı — ' +
             'aynı veri, **filtre ve grafik** eklenmiş hâli.' },
      { ad:'Manage Journal Entries', aciklama:'{{FB03}} + {{FBV3}} birleşimi.' },
      { ad:'Transaction kutucukları', aciklama:'Fiori karşılığı olmayan kodlar ' +
             '**GUI kutucuğu** olarak Launchpad’e eklenir — böylece hiçbir işlev kaybolmaz.' },
    ],

    compatibilityViews:[
      'İşlem kodları {{uyumluluk-view}}’dan **etkilenmez** — kod aynı çalışır.',
      'Etkilenen **performanstır**: eski kod, görünüm üzerinden okuduğunda yavaşlar.',
      '{{TSTC}} ve {{TSTCT}} **gerçek tablo olarak duruyor**.',
    ],

    performans:
      'S/4HANA’da kod başlatma maliyeti değişmedi. ' +
      'Değişen, kodların **arkasındaki sorguların** hızlanmasıdır.\n\n' +
      '{{FBL3N}} gibi döküm kodları sütun bazlı depolama sayesinde ' +
      'büyük hesaplarda belirgin şekilde hızlandı.\n\n' +
      '⚠️ Ama **{{uyumluluk-view}} üzerinden** çalışan özel kodlar tersine yavaşlayabilir; ' +
      'geçiş sonrası performans testi bu yüzden gereklidir.',

    bestPractices:[
      'Geçişte **kullanılan kodların envanterini çıkar** — {{BKPF}} `TCODE` alanından ' +
      'son bir yılın gerçek kullanımı çekilebilir. Varsayımla değil, **veriyle** planla.',
      'Envanteri **basitleştirme listesiyle** karşılaştır; kaldırılan kodları işaretle.',
      'Ana veri süreçlerini **{{BP}}**’ye göre yeniden yaz — ' +
      '{{XK01}}/{{XD01}} alışkanlığı en çok direnç gören değişikliktir.',
      'Eğitim dokümanlarındaki ekran görüntülerini güncelle; ' +
      'kod aynı kalsa bile **Fiori arayüzü farklıdır**.',
      'Fiori karşılığı olmayan kodlar için **GUI kutucuğu** ekle — ' +
      'kullanıcı "eski ekranım yok" demesin.',
      'Rolleri ({{PFCG}}) gözden geçir: kaldırılan kodlar rollerde **ölü satır** bırakır.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'"FBL5N boş geliyor" — hata vermeyen yetki eksiği',
    hikaye:
      '**Doğu Tekstil A.Ş.**’de yeni işe başlayan bir muhasebe elemanı arıyor: ' +
      '*"{{FBL5N}} açılıyor ama çalıştırınca liste boş geliyor. ' +
      'Hata da vermiyor. Müşterinin açık faturaları olduğunu biliyorum."*\n\n' +
      'Danışman aynı kullanıcının ekranında deniyor — gerçekten boş.\n\n' +
      'Kendi kullanıcısıyla deniyor — **47 kalem geliyor**.\n\n' +
      'Aynı kod, aynı seçim, farklı sonuç. Ve **hiçbir hata mesajı yok**.',
    veriler:[
      { k:'İşlem kodu', v:'**{{FBL5N}}** — müşteri kalem listesi' },
      { k:'Kullanıcı', v:'MUHASEBE07 (yeni personel)' },
      { k:'Seçim', v:'Müşteri 100234 · şirket kodu **2000** · açık kalemler' },
      { k:'Sonuç', v:'**0 kalem** — hata mesajı **yok**' },
      { k:'Danışman kullanıcısıyla', v:'**47 kalem**' },
    ],

    adimlar:[
      { baslik:'Veri gerçekten var mı? — önce bu doğrulanır', tcode:'SE16N',
        aciklama:'Ekrana güvenmeden tabloya bakılıyor.',
        girdi:[
          { alan:'Tablo', deger:'{{BSID}} — müşteri **açık** kalemleri' },
          { alan:'Seçim', deger:'`KUNNR` = 100234 · `BUKRS` = **2000**' },
          { alan:'Sonuç', deger:'**47 kayıt**' },
          { alan:'Çıkarım', deger:'Veri **var** — sorun görüntülemede' },
        ],
        not:'İlk adım her zaman budur: *"veri gerçekten var mı?"*\n\n' +
             'Varsa sorun **veri değil erişimdir**; yoksa sorun **kaydetmededir**. ' +
             'Bu ayrım yapılmadan teşhis yanlış yöne gider.\n\n' +
             'Burada veri var — demek ki kullanıcı **göremiyor**.' },

      { baslik:'İlk hipotez elenir — kalem yönetimi kapalı mı?', tcode:'SE16N',
        aciklama:'Döküm alınamamasının bilinen sebebi kontrol ediliyor.',
        girdi:[
          { alan:'Tablo', deger:'{{KNB1}} — müşteri şirket kodu verisi' },
          { alan:'Kontrol', deger:'Müşteri 100234 · şirket kodu 2000 · **kayıt var**' },
          { alan:'Çıkarım', deger:'Müşteri bu şirket kodunda **tanımlı**' },
          { alan:'Ek not', deger:'Müşteri hesaplarında kalem yönetimi **zaten zorunludur**' },
        ],
        not:'{{konu:reporting}}’de işlenen *"kalem yönetimi kapalıysa döküm alınamaz"* ' +
             'sorunu **G/L hesaplarına özgüdür**.\n\n' +
             'Müşteri ve satıcı hesaplarında kalem yönetimi **her zaman açıktır** — ' +
             'açık kalem takibi bu hesapların varlık sebebidir.\n\n' +
             'Bu hipotez elendi.' },

      { baslik:'Yetki kontrol edilir — ama hata mesajı yoktu', tcode:'SU53',
        aciklama:'Kullanıcı boş listeyi aldıktan **hemen sonra** çalıştırıyor.',
        girdi:[
          { alan:'Çalıştıran', deger:'MUHASEBE07 — boş listeden **hemen sonra**' },
          { alan:'Başarısız nesne', deger:'**`F_BKPF_BUK`**' },
          { alan:'Eksik değer', deger:'`BUKRS` = **2000**' },
          { alan:'Mevcut yetki', deger:'`BUKRS` = **1000** (yalnızca)' },
        ],
        not:'**Kök sebep bulundu.**\n\n' +
             'Kullanıcının **`S_TCODE`** yetkisi vardı — bu yüzden {{FBL5N}} **açıldı**. ' +
             'Ama **`F_BKPF_BUK`** yetkisi yalnızca şirket kodu **1000** içindi; ' +
             'sorgu **2000** içindi.\n\n' +
             '⚠️ **Neden hata vermedi?** Çoğu FI raporu yetkiyi bir **süzgeç** olarak uygular: ' +
             'yetkili şirket kodlarını listeler ve yalnızca onları sorgular. ' +
             '2000 listede olmadığı için sorgu **hiç çalışmadı** ve boş döndü. ' +
             'Program açısından bu **hatalı bir durum değildir**.\n\n' +
             'Kullanıcı ise *"veri yok"* sandı.' },

      { baslik:'Neden 1000 yetkisi var da 2000 yok?', tcode:'PFCG',
        aciklama:'Rolün nasıl atandığı inceleniyor.',
        girdi:[
          { alan:'Kullanıcının rolü', deger:'`Z_FI_MUHASEBE_1000`' },
          { alan:'Rol adı', deger:'Şirket kodu **adına gömülmüş**' },
          { alan:'Kullanıcının görevi', deger:'**Her iki** şirket kodunda çalışıyor' },
          { alan:'Sebep', deger:'İşe alımda yalnızca 1000 rolü atanmış — 2000 unutulmuş' },
        ],
        not:'**Süreç hatası, sistem hatası değil.**\n\n' +
             'Yeni personel süreci rol atamasını içeriyor ama ' +
             '*"hangi şirket kodlarında çalışacak?"* sorusu **sorulmamış**. ' +
             'Varsayılan olarak tek rol atanmış.\n\n' +
             'Rol adında şirket kodunun geçmesi (`Z_FI_MUHASEBE_1000`) ' +
             'aslında iyi bir tasarım — eksikliği **görünür** kılıyor. ' +
             'Rol adı `Z_FI_MUHASEBE` olsaydı kimse fark etmezdi.' },

      { baslik:'Çözüm ve doğrulama', tcode:'SU53',
        aciklama:'İkinci rol atanıyor ve sonuç test ediliyor.',
        girdi:[
          { alan:'Atanan rol', deger:'`Z_FI_MUHASEBE_2000`' },
          { alan:'Kullanıcı işlemi', deger:'Oturumu kapatıp açtı — **yetki tamponu** yenilendi' },
          { alan:'{{FBL5N}} tekrar', deger:'**47 kalem** ✓' },
          { alan:'{{SU53}}', deger:'Başarısız kontrol **yok** ✓' },
        ],
        fis:{ baslik:'Görünür hâle gelen kalemlerden biri', belgeTuru:'DR', tarih:'05.11.2027',
          satirlar:[
            { hesap:'120', ad:'Alıcılar — şirket kodu 2000', borc:88500, not:'{{BSID}} açık kalem' },
            { hesap:'600', ad:'Yurt içi satışlar', alacak:73750 },
            { hesap:'391', ad:'Hesaplanan KDV', alacak:14750 },
          ], not:'Belge **hep vardı** — kullanıcı göremiyordu.\n\n' +
                 'Muhasebede hiçbir şey değişmedi; değişen **erişimdi**.' },
        tabloEtkisi:[
          { tablo:'BSID', ne:'**Değişmedi** — veri zaten oradaydı, yalnızca yetki değişti' },
        ],
        not:'⚠️ **Oturum kapatıp açmak gerekti.** Yetkiler oturum başında ' +
             '**{{tampon}}a** alınır; rol atandıktan sonra mevcut oturumda ' +
             'hemen etkili olmaz.\n\n' +
             'Bu, *"yetki verdim ama hâlâ çalışmıyor"* şikâyetinin ' +
             'en sık sebebidir ve çözümü basittir.' },

      { baslik:'Kalıcı önlemler', tcode:'PFCG',
        aciklama:'Aynı sınıf sorunun tekrarlanmaması için dört önlem.',
        girdi:[
          { alan:'Önlem 1', deger:'İşe alım kontrol listesine **"hangi şirket kodları?"** sorusu eklendi' },
          { alan:'Önlem 2', deger:'Kullanıcılara **{{SU53}} refleksi** öğretildi: boş liste → hemen SU53 → ekran görüntüsü' },
          { alan:'Önlem 3', deger:'Rol adlandırmada şirket kodu **korunacak** — eksiklik görünür kalsın' },
          { alan:'Önlem 4', deger:'Aynı durumdaki 6 kullanıcı **tarandı**; 2’sinde aynı eksik bulundu' },
        ],
        not:'**Dördüncü önlem iki kişi daha ortaya çıkardı** — ' +
             'ikisi de sorunu bildirmemişti.\n\n' +
             'Biri *"o şirket kodunda hiç hareket yok herhâlde"* diye düşünmüş, ' +
             'diğeri işini Excel’den takip etmeye başlamış.\n\n' +
             '**Sessiz hataların en tehlikeli yanı budur:** kullanıcılar ' +
             'bildirmek yerine **etrafından dolaşır** ve sorun görünmez kalır.\n\n' +
             'İkinci önlem ({{SU53}} refleksi) bu yüzden en değerlisidir: ' +
             'kullanıcıyı, sessiz bir hatayı **görünür kılabilecek** hâle getirir.' },
    ],

    sonuc:
      '**İşlem kodu açıldı, hata vermedi, boş liste döndü — ve iki kullanıcı daha aynı durumdaydı.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Yetki iki katmanlıdır ve ikinci katman sessizdir.** ' +
      '**`S_TCODE`** kodun **çalışmasına** izin verir — yoksa net bir mesaj gelir. ' +
      '**`F_BKPF_BUK`** hangi **veriyi** göreceğini belirler — yoksa ' +
      '**boş liste** gelir ve **hiçbir mesaj çıkmaz**. ' +
      'Çoğu FI raporu yetkiyi süzgeç olarak uyguladığı için, ' +
      'yetkisiz şirket kodu **hiç sorgulanmaz** ve bu program açısından hata değildir.\n\n' +
      '**2. Teşhis "veri var mı?" sorusuyla başlar.** ' +
      '{{SE16N}} ile {{BSID}}’ye bakılıp 47 kayıt görülmeseydi, ' +
      'saatlerce kayıt sürecinde hata aranabilirdi. ' +
      'Veri varsa sorun **erişimdedir**; yoksa **kaydetmededir**.\n\n' +
      '**3. {{SU53}} "hemen sonra" çalıştırılmalıdır.** ' +
      'Yalnızca **son** başarısız yetki kontrolünü gösterir; ' +
      'araya başka bir işlem girerse iz kaybolur. ' +
      'Ayrıca yeni atanan rol, oturum kapatılıp açılana kadar etkili olmaz — ' +
      'yetkiler oturum başında {{tampon}}a alınır.\n\n' +
      '**4. Sessiz hatalar bildirilmez, etrafından dolaşılır.** ' +
      'Tarama iki kullanıcı daha buldu; ikisi de şikâyet etmemişti. ' +
      'Biri veri olmadığını varsaymış, diğeri Excel’e geçmişti. ' +
      'Bu yüzden çözüm yalnızca yetki düzeltmek değil, ' +
      'kullanıcıya **{{SU53}} refleksi** kazandırmaktır — ' +
      'sessiz bir hatayı görünür kılabilen tek kişi onu yaşayandır.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '**İşlem kodları ezberlenmez, çözülür** — yaklaşık 15 kalıp yüzlerce kodu açıklar.',
      '**Almanca kökler anahtardır:** **K**reditor satıcı · **D**ebitor müşteri · **S**achkonto G/L.',
      'Tablo adları da aynı harflerle: **BS + I**(açık)**/A**(kapalı) **+ K/D/S** → sekiz tablo, iki kural.',
      '**`F-` tireli eski nesil** ({{kayit-anahtari}} gerekir) · **`FB` yeni nesil** (gerekmez).',
      '**Kapatma işlemleri `F-` ailesindedir** — açık kalem seçim ekranı gerektirir.',
      'Sayı ekleri: **01** oluştur · **02** değiştir · **03** görüntüle · **9x** eski veri. İstisna: **{{FS00}}**.',
      '**Yetki iki katmanlı:** `S_TCODE` kodu açar · `F_BKPF_BUK` **veriyi** belirler.',
      '`S_TCODE` var + veri yetkisi yok = **boş liste, hata mesajı yok**.',
    ],

    onemliNoktalar:[
      '**"`F-02` ile {{FB50}} farkı nedir?"** İkisi de G/L kaydı yapar ve **aynı belgeyi** üretir. Fark: **`F-02` eski nesil**, {{kayit-anahtari}} (40/50) **elle girilir**; **{{FB50}} yeni nesil (Enjoy)**, borç/alacak seçiminden anahtarı **kendisi türetir**. Tire (`-`) eski nesli işaret eder.',
      '**"Neden kapatma işlemleri hep `F-` ailesinde?"** Kapatma doğası gereği **{{acik-kalem}} seçimi** gerektirir — bir listeden fatura işaretlersin. Yeni nesil `FB` ekranları **tek satır kayıt** için tasarlandı, çok kalemli seçim sunmaz. Kod ailesi **işin muhasebe doğasını** yansıtır.',
      '**"{{BSIK}} adı nereden geliyor?"** **BS** + **I** (*offen* = açık) + **K** (*Kreditor* = satıcı). Aynı kuralla: {{BSAK}} kapatılmış satıcı, {{BSID}} açık müşteri, {{BSAS}} kapatılmış G/L. **Sekiz tablo adı, iki kural.**',
      '**"{{FK01}} ile {{XK01}} farkı?"** **{{FK01}}** yalnızca **muhasebe** görünümünü açar; **{{XK01}}** merkezi — FI **ve satın alma** görünümlerini birlikte. ⚠️ {{FK01}} ile açılan satıcıya **sipariş girilemez**. Klasik yeni danışman hatası.',
      '**"İşlem kodu açılıyor ama liste boş, hata da yok. Neden?"** **`S_TCODE`** var (kod çalışıyor) ama **`F_BKPF_BUK`** yok (veri yetkisi). Rapor yetkiyi **süzgeç** olarak uygular; yetkisiz şirket kodu **hiç sorgulanmaz** → boş sonuç, program açısından **hata değil**. Teşhis: boş listeden **hemen sonra** {{SU53}}.',
      '**"Kodu bilmiyorum, nasıl bulurum?"** Dört yol: **(1)** kalıptan tahmin, **(2)** {{SE16N}} → {{TSTCT}} → `TTEXT` içinde jokerle ara, **(3)** özelleştirmeyse {{SPRO}} ağacı (kod düğümde **yazılıdır**), **(4)** `Z*` kodsa {{SE93}}. Türkçe sonuç yoksa **İngilizceye geç**.',
      '**"`FS01/02/03` neden yok?"** **{{FS00}} istisnadır** — G/L hesabında oluştur/değiştir/görüntüle **tek ekranda**, mod ekranın içinden seçilir. `01/02/03` kalıbı {{AS01}}, {{FK01}}, {{KS01}}’de geçerlidir.',
      '**"S/4HANA’da hangi kodlar kalktı?"** FI kayıt ve döküm kodları **kalkmadı**. Kalkanlar: ana veride {{XK01}}/{{XD01}}/{{FK01}}/{{FD01}} → **{{BP}}**; MM’de `MB01`/`MB1A`/`MB31` → {{MIGO}}; `ME21` → {{ME21N}}. Kaynak: **basitleştirme listesi** ve **Fiori Apps Reference Library**.',
    ],

    sikHatalar:[
      { hata:'Özelleştirme kodlarını (`OB*`) ezberlemeye çalışmak.', dogru:'Yüzlercesi var ve çoğu yılda bir kullanılır. **{{SPRO}} ağacında konuyu bul** — kod düğümde yazılıdır.' },
      { hata:'Komut alanına kodu öneksiz yazmak.', dogru:'Mevcut işlem açıkken hata verir. **`/n<kod>`** kullanılır.' },
      { hata:'`S_TCODE` verince yetkiyi tamam saymak.', dogru:'Kod **açılır** ama veri gelmeyebilir. `F_BKPF_BUK` (şirket kodu) ve **etkinlik** (01/02/03) ayrıca gerekir.' },
      { hata:'Boş liste gelince "veri yok" sonucuna varmak.', dogru:'Önce {{SE16N}} ile tabloda veri var mı bakılır; sonra **hemen** {{SU53}} çalıştırılır.' },
      { hata:'{{SU53}}’ü çok sonra çalıştırmak.', dogru:'Yalnızca **son** başarısız kontrolü gösterir. Araya işlem girerse iz kaybolur.' },
      { hata:'Rol atadıktan sonra oturumu yenilememek.', dogru:'Yetkiler oturum başında **{{tampon}}a** alınır. Kapatıp açmak gerekir.' },
      { hata:'{{FK01}} ile satıcı açıp sipariş girmeye çalışmak.', dogru:'{{FK01}} yalnızca muhasebe görünümü açar. Satın alma için **{{XK01}}** kullanılır.' },
      { hata:'Menüde "teknik adları göster" ayarını kapalı bırakmak.', dogru:'Açıkken kodlar **iş yaparken kendiliğinden** öğrenilir. Kapalıyken kod bilgisi hiç oluşmaz.' },
    ],

    ipuclari:[
      '⭐ **İlk gün iki ayar:** menüde *teknik adları göster* + {{SU3}}’te `BUK` parametresi.',
      'Almanca kökü tahmin et: **K**reditor · **D**ebitor · **S**achkonto · *neu* = `N` eki.',
      '`/o` ile ikinci oturum: bir tarafta kayıt, diğerinde {{SE16N}}.',
      'Alanın **parametre kimliği ve teknik adı**: üzerinde `F1` → **Teknik bilgi**.',
      'Kod ararken Türkçe sonuç vermezse **İngilizce metinden** ara — metin tabanı her zaman tam.',
      'Boş liste = *"veri yok"* değil. Sırayla: {{SE16N}} (veri var mı) → {{SU53}} (yetki var mı).',
      'Geçiş planlarken **{{BKPF}} `TCODE`** alanından son bir yılın gerçek kullanımını çek — ' +
      'varsayımla değil veriyle planla.',
    ],

    quiz:[
      { soru:'`F-43` ile {{FB60}} arasındaki temel fark nedir?',
        secenekler:[
          'Farklı belge türü üretirler',
          '**`F-43` eski nesil — {{kayit-anahtari}} elle girilir; {{FB60}} yeni nesil — sistem türetir**',
          '`F-43` yalnızca görüntüleme yapar',
          'Biri FI, diğeri MM kodudur',
        ], dogru:1,
        aciklama:'İkisi de satıcı faturası kaydeder ve **aynı belgeyi** üretir.\n\n' +
                 '**`F-43`** eski nesildir: **31** (satıcı alacak) ve **40** (G/L borç) ' +
                 '{{kayit-anahtari}} değerlerini **elle** girmen gerekir.\n\n' +
                 '**{{FB60}}** yeni nesildir (Enjoy): tek ekran, borç/alacak seçilir, ' +
                 'sistem anahtarı **kendisi türetir**.\n\n' +
                 '**Tire (`-`) eski nesli işaret eder** — kalıbın en kullanışlı parçası.' },

      { soru:'{{BSAK}} tablosunun adı nasıl çözülür?',
        secenekler:[
          'Rastgele bir kısaltmadır',
          '**BS + A (*ausgeglichen* = kapatılmış) + K (*Kreditor* = satıcı)**',
          'BS + Asset + Konto',
          'Balance Sheet Account Key',
        ], dogru:1,
        aciklama:'**BS** + **A** + **K** olarak çözülür:\n\n' +
                 '**A** = *ausgeglichen* → **kapatılmış** kalem *(I = offen → açık)*\n' +
                 '**K** = *Kreditor* → **satıcı** *(D = Debitor müşteri, S = Sachkonto G/L)*\n\n' +
                 'Aynı iki kuralla sekiz tablo çözülür: ' +
                 '{{BSIK}}/{{BSAK}} satıcı · {{BSID}}/{{BSAD}} müşteri · {{BSIS}}/{{BSAS}} G/L.\n\n' +
                 'Ayrı ayrı ezberlemeye çalışmak, **kuralı görmemektir**.' },

      { soru:'Kullanıcı bir kodu açabiliyor ama liste boş geliyor ve hata mesajı yok. Sebep?',
        secenekler:[
          'Kod bozuk',
          'Veri gerçekten yok',
          '**`S_TCODE` var ama veri yetkisi (`F_BKPF_BUK`) yok**',
          'Dönem kapalı',
        ], dogru:2,
        aciklama:'Yetki **iki katmanlıdır**:\n\n' +
                 '**`S_TCODE`** → kodun **çalışmasına** izin verir. Yoksa net mesaj gelir.\n' +
                 '**`F_BKPF_BUK`** → hangi **veriyi** göreceğini belirler.\n\n' +
                 'İkincisi yoksa işlem **açılır**, çalışır ve **boş liste** döner.\n\n' +
                 'Sebep: çoğu FI raporu yetkiyi bir **süzgeç** olarak uygular — ' +
                 'yetkili şirket kodları listelenir ve yalnızca onlar sorgulanır. ' +
                 'Yetkisiz kod **hiç sorgulanmaz** → boş sonuç, program açısından **hata değil**.\n\n' +
                 'Teşhis: boş listeden **hemen sonra** {{SU53}}.' },

      { soru:'{{FK01}} ile {{XK01}} arasındaki fark nedir?',
        secenekler:[
          'Biri oluşturur, diğeri değiştirir',
          '**{{FK01}} yalnızca muhasebe görünümü · {{XK01}} merkezi — FI + satın alma**',
          '{{XK01}} yalnızca S/4HANA’da var',
          'Fark yoktur',
        ], dogru:1,
        aciklama:'**`X`** = *cross* → **tüm alanlar birlikte**.\n\n' +
                 '**{{XK01}}** satıcıyı FI **ve satın alma** görünümleriyle açar.\n' +
                 '**{{FK01}}** yalnızca **muhasebe** görünümünü açar.\n' +
                 '`MK01` ise yalnızca **satın alma** görünümünü.\n\n' +
                 '⚠️ **Klasik hata:** {{FK01}} ile açılan satıcıya **sipariş girilemez** — ' +
                 'satın alma görünümü yoktur.\n\n' +
                 'S/4HANA’da üçü de **{{BP}}**’ye taşındı.' },

      { soru:'Bilmediğin bir özelleştirme kodunu bulmanın en pratik yolu nedir?',
        secenekler:[
          'Kod listesini ezberlemek',
          'Rastgele `OB` kombinasyonları denemek',
          '**{{SPRO}} ağacında konuyu bulmak — kod düğümde yazılıdır**',
          'Basis ekibine sormak',
        ], dogru:2,
        aciklama:'Yüzlerce `OB*` kodu vardır ve çoğu **yılda bir** kullanılır; ' +
                 'ezberlemek verimsizdir.\n\n' +
                 '**{{SPRO}} → IMG ağacı** açılır, konu aranır ve ' +
                 'düğümün yanında **işlem kodu zaten yazılıdır**.\n\n' +
                 'Alternatif: {{SE16N}} → {{TSTCT}} → `TCODE` = `OB*` ve ' +
                 '`TTEXT` içinde anahtar kelime.\n\n' +
                 'Sık kullandıkların zaten **kendiliğinden** ezberlenir.' },

      { soru:'`FS01`, `FS02`, `FS03` kodları neden yok?',
        secenekler:[
          'S/4HANA’da kaldırıldılar',
          '**{{FS00}} istisnadır — üç modu tek ekranda yapar**',
          'G/L hesabı özelleştirmeden açılır',
          'Yerlerini {{BP}} aldı',
        ], dogru:1,
        aciklama:'**01/02/03** kalıbı ({{AS01}}, {{FK01}}, {{KS01}}) yaygındır ama ' +
                 'G/L hesabında **{{FS00}} istisnadır**.\n\n' +
                 'Tek ekranda oluştur/değiştir/görüntüle yapılır; ' +
                 'mod **ekranın içinden** seçilir.\n\n' +
                 'Kalıbın en bilinen istisnası olduğu için **sık sorulur** — ' +
                 'kalıbı gerçekten anlayıp anlamadığını ölçer.' },

      { soru:'`/$sync` komutu ne yapar ve ne zaman gerekir?',
        secenekler:[
          'Oturumu senkronize eder',
          'Verileri yedekler',
          '**{{tampon}}ları temizler — "ayarı değiştirdim ama etkisi görünmüyor" durumunda**',
          'Arka plan işlerini başlatır',
        ], dogru:2,
        aciklama:'{{T001}}, {{T004}}, {{T030}} gibi **yapılandırma tabloları ' +
                 '{{tampon}}lanır** — performans için bellekte tutulurlar.\n\n' +
                 'Bu yüzden bir özelleştirme değişikliği **hemen etkili olmayabilir**.\n\n' +
                 '`/$sync` tüm tamponları temizler ve değişiklik anında görünür.\n\n' +
                 '⚠️ **Canlı sistemde dikkatli kullanılır** — tüm kullanıcıları etkiler ve ' +
                 'geçici performans düşüşü yaratır. Genelde **oturumu kapatıp açmak** yeterlidir.' },

      { soru:'S/4HANA geçişinde kullanılan işlem kodlarının envanteri en doğru nasıl çıkarılır?',
        secenekler:[
          'Kullanıcılara anket yapılır',
          'Rollerdeki ({{PFCG}}) kod listesi alınır',
          '**{{BKPF}} `TCODE` alanından son bir yılın gerçek kullanımı çekilir**',
          'Menü ağacı dışa aktarılır',
        ], dogru:2,
        aciklama:'{{BKPF}} `TCODE` alanı, her belgeyi **hangi işlemin ürettiğini** saklar. ' +
                 'Son bir yılın verisi, **gerçekte kullanılan** kodları verir.\n\n' +
                 'Rollerdeki liste **yanıltıcıdır** — roller genelde ' +
                 'kullanılmayan kodlar da içerir (ölü satırlar).\n\n' +
                 'Anket ise eksik kalır; kullanıcılar sık kullandıklarını sayar, ' +
                 'ayda bir kullandıklarını unutur.\n\n' +
                 '**Varsayımla değil, veriyle planla.** ' +
                 'Envanter sonra **basitleştirme listesiyle** karşılaştırılır.' },
    ],

    flashcards:[
      { on:'Üç Almanca harf — kodların anahtarı', arka:'**K** = *Kreditor* → **satıcı**\n**D** = *Debitor* → **müşteri**\n**S** = *Sachkonto* → **G/L hesabı**\n\nHem kodlarda hem tablolarda aynı:\n`FK01` `FD01` `FS00`\nBSI**K** BSI**D** BSI**S**' },
      { on:'Sekiz tablo adı, iki kural', arka:'**BS** + **I/A** + **K/D/S**\n\n**I** = *offen* → **AÇIK** kalem\n**A** = *ausgeglichen* → **KAPALI** kalem\n\n| | Satıcı | Müşteri | G/L |\n|---|---|---|---|\n| Açık | BSIK | BSID | BSIS |\n| Kapalı | BSAK | BSAD | BSAS |' },
      { on:'`F-` tireli vs `FB` tiresiz', arka:'**`F-`** → **ESKİ** nesil\nKayıt anahtarı **elle** (31, 40, 50…)\nÇok kalemli · açık kalem seçimi **var**\n→ F-02, F-43, **F-53**, **F-28**, **F-32**\n\n**`FB`** → **YENİ** nesil (Enjoy)\nTek ekran · anahtar **gerekmez**\n→ FB50, FB60, FB70, FB03, FB08' },
      { on:'Kapatma neden hep `F-` ailesinde?', arka:'Kapatma **açık kalem seçimi** gerektirir — bir listeden fatura işaretlersin.\n\n`FB` ekranları **tek satır kayıt** için tasarlandı, çok kalemli seçim sunmaz.\n\n→ **Kod ailesi, işin muhasebe doğasını yansıtır.**' },
      { on:'Sayı ekleri ve ünlü istisna', arka:'**01** oluştur · **02** değiştir · **03** görüntüle\n`AS01/02/03` · `FK01/02/03` · `KS01/02/03`\n\n**9x** = eski veri (*Altdaten*) → `AS91`\n\n⚠️ **İSTİSNA: FS00**\nG/L hesabı — üç modu **tek ekranda**' },
      { on:'`FBL1N` / `FBL3N` / `FBL5N`', arka:'**1** = satıcı · **3** = G/L · **5** = müşteri\n\nSondaki **`N`** = *neu* (yeni) — ALV’li sürüm\n\n⚠️ Döküm için hesapta **kalem yönetimi açık** olmalı ve **geriye dönük açılamaz**.' },
      { on:'Yetkinin iki katmanı', arka:'**Katman 1 — `S_TCODE`**\n*"Bu kodu çalıştırabilir mi?"*\nYoksa → **net hata mesajı**\n\n**Katman 2 — `F_BKPF_BUK`**\n*"Hangi veriyi görebilir?"*\nYoksa → **BOŞ LİSTE, hata YOK** ⚠️' },
      { on:'Boş liste geldi, hata yok — teşhis', arka:'**1.** {{SE16N}} → tabloda veri var mı?\n→ Varsa sorun **erişim**, yoksa **kayıt**\n\n**2.** **HEMEN** {{SU53}}\n→ Son başarısız yetki kontrolü\n\n**3.** Rol atandıktan sonra **oturumu kapat/aç**\n(yetkiler oturum başında tamponlanır)' },
      { on:'Komut alanı önekleri', arka:'**`/n<kod>`** → işlemi kapat, yenisini başlat *(en sık)*\n**`/o<kod>`** → **ayrı oturumda** aç\n**`/i`** → oturumu kapat\n**`/nex`** → ⚠️ onaysız çıkış\n**`/$sync`** → **tamponları temizle**' },
      { on:'`/$sync` ne zaman?', arka:'*"Ayarı değiştirdim ama etkisi görünmüyor."*\n\nT001, T004, T030 gibi yapılandırma tabloları **tamponlanır**.\n\n⚠️ Canlıda **tüm kullanıcıları** etkiler.\nÖnce **oturumu kapatıp açmayı** dene.' },
      { on:'Kodu bilmiyorsan — dört yol', arka:'**1.** Kalıptan tahmin *(en hızlı)*\n**2.** {{SE16N}} → **TSTCT** → `TTEXT` = `*ihtar*` *(en güvenilir)*\n**3.** {{SPRO}} ağacı — kod düğümde **yazılı** *(özelleştirme)*\n**4.** {{SE93}} — `Z*` kod ne çalıştırıyor?\n\n💡 Türkçe sonuç yoksa **İngilizceye geç**' },
      { on:'İlk gün yapılacak iki ayar', arka:'⭐ **1. Menü → Ek → Ayarlar → "Teknik adları göster"**\n→ Kodlar iş yaparken **kendiliğinden** öğrenilir\n\n⭐ **2. {{SU3}} → Parametreler**\n`BUK` şirket kodu · `CAC` kontrol alanı · `GJR` mali yıl\n\n💡 Alanın parametre kimliği: **`F1` → Teknik bilgi**' },
      { on:'S/4HANA’da kalkan kodlar', arka:'**Ana veri:** XK01 · XD01 · FK01 · FD01 → **BP**\n**MM:** MB01 · MB1A · MB1B · MB31 → **MIGO**\n**ME21** → ME21N\n\n✅ **FI kayıt ve döküm kodları kalkmadı**\n\nKaynak: **basitleştirme listesi** + **Fiori Apps Reference Library**' },
    ],
  },

  },
});
