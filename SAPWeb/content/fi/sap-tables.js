/* ==========================================================================
   content/fi/sap-tables.js — "SAP Tables (Tablolar)"
   ========================================================================== */

SAP.registerTopic({
  id: 'sap-tables',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'FI tablo mimarisi **üç soruyla** anlaşılır:\n\n' +
      '**"Belge nerede duruyor?"** → başlık {{BKPF}} + kalem {{BSEG}}\n' +
      '**"Bu satıcının açık kalemleri nerede?"** → indeks tabloları {{BSIK}}, {{BSID}}\n' +
      '**"Hesabın bakiyesi nerede?"** → toplam tabloları {{GLT0}}\n\n' +
      'Bu üçlü yapı bir **performans çözümüydü**: {{BSEG}}’in anahtarı belge numarasıyla ' +
      'başladığı için "bu satıcının kalemleri" sorgusu tüm tabloyu tarardı. ' +
      'İndeks ve toplam tabloları bu sorunu çözmek için vardı.\n\n' +
      '**S/4HANA bu yapıyı sadeleştirdi.** {{ACDOCA}} tek tablo olarak geldi; ' +
      'indeks ve toplam tabloları **{{uyumluluk-view}}’a** dönüştü. ' +
      'Sebep basit: HANA’nın sütun bazlı yapısında o sorgular zaten hızlı.',

    neden:
      '**Teşhis.** FI sorunlarının çoğu tablo bakarak çözülür: ' +
      'hangi alan ne değer taşıyor, hangi kayıt eksik.\n\n' +
      '**Rapor anlama.** İki rapor neden farklı gösteriyor? Cevap genelde ' +
      '**farklı tablodan okuduklarıdır**.\n\n' +
      '**Geliştirme.** Özel rapor veya arayüz yazılacaksa doğru tabloyu bilmek şarttır.\n\n' +
      '**Veri geçişi.** Hangi tabloya ne yükleneceği, geçiş projesinin temelidir.\n\n' +
      '**S/4HANA geçişi.** Hangi tablonun kalktığını, hangisinin görünüme dönüştüğünü ' +
      'bilmeden özel programlar taşınamaz.',

    sirketOnemi:
      'Tablo bilgisi, danışmanı **kullanıcıdan ayıran** şeydir. ' +
      'Kullanıcı ekranı bilir; danışman ekranın arkasında ne olduğunu bilir.\n\n' +
      'Pratik değeri şurada ortaya çıkar: bir sorun ekranda anlaşılmıyorsa ' +
      '{{SE16N}} ile tabloya bakılır ve **gerçek değer** görülür. ' +
      'Bu, "SD faturası muhasebeye düşmedi" ({{VBRK}} `RFBSK`) veya ' +
      '"vergi hesabı tutmuyor" ({{BSET}}) gibi teşhislerin temelidir.\n\n' +
      'Mülakatta ayırt edici soru: **"{{BSIK}} ve {{BSAK}} neden ayrı tablolar?"** ' +
      'Doğru cevap: **{{BSIK}} açık, {{BSAK}} kapatılmış** satıcı kalemlerini tutar. ' +
      'Kapatma yapıldığında kayıt birinden diğerine **taşınır**. ' +
      'Sebep performanstı — açık kalem sorgusu küçük tabloda çalışsın diye. ' +
      'S/4HANA’da ikisi de {{uyumluluk-view}}’dır.',

    gercekHayat:
      'Kullanıcı diyor ki: *"Faturayı kaydettim, belge numarası aldım ama ' +
      '{{FB03}}’te bulamıyorum."*\n\n' +
      'Ekran hiçbir şey söylemiyor. Teşhis tabloya bakarak yapılıyor:\n\n' +
      '**1.** {{SE16N}} → {{BKPF}} → belge numarası aranıyor → **kayıt yok**.\n\n' +
      '**2.** Numara verilmiş ama belge yok → iki ihtimal: ' +
      'belge **park edilmiş** ({{VBKPF}}’e bakılır) veya ' +
      '**{{guncelleme-hatasi}}** olmuş ({{SM13}}’e bakılır).\n\n' +
      '**3.** {{VBKPF}}’te bulunuyor → belge park edilmiş, muhasebeleştirilmemiş.\n\n' +
      'Ekran bunu söylemiyordu çünkü {{FB03}} yalnızca {{BKPF}}’ye bakar. ' +
      'Doğru araç {{FBV3}} idi.\n\n' +
      '**Tablo bilgisi olmadan bu teşhis yapılamaz** — kullanıcıya ' +
      '"sistem çalışmıyor" demekten öteye gidilemez.',

    muhasebeMantigi:
      'FI tablo mimarisinin muhasebe mantığı **başlık–kalem ayrımıdır**.\n\n' +
      'Bir muhasebe belgesinin **tekil** bilgileri vardır (tarih, belge türü, ' +
      'para birimi, kaydeden kullanıcı) ve **çoğul** bilgileri vardır ' +
      '(hesap, tutar, borç/alacak).\n\n' +
      'Tekil olanlar **{{BKPF}}**’de bir satır; çoğul olanlar **{{BSEG}}**’de ' +
      'n satır olarak durur. Bağlantı `BUKRS + BELNR + GJAHR` üçlüsüdür.\n\n' +
      'Bu ayrım muhasebenin doğasından gelir: bir yevmiye maddesinin ' +
      'bir tarihi ama birden çok satırı vardır.\n\n' +
      'İkinci mantık **indeks tablolarıdır** ve bunlar muhasebeden değil ' +
      '**performanstan** doğmuştur. Muhasebe açısından {{BSIK}}, ' +
      '{{BSEG}}’in bir alt kümesidir — yeni bilgi taşımaz. ' +
      'Bu yüzden S/4HANA’da görünüme dönüştürülmeleri **muhasebeyi hiç etkilemedi**.',

    kavramlar: ['tablo-anahtari', 'uyumluluk-view', 'evrensel-kayit-defteri',
                'tampon', 'acik-kalem', 'degisiklik-belgesi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Tablo kullanımı bir **teşhis sürecidir**: belirtiden başlanır, ' +
      'doğru tabloya inilir, gerçek değer görülür. ' +
      'Aşağıdaki akış bu yolu izliyor.',

    roller:[
      { rol:'Kullanıcı', gorev:'Belirtiyi bildirir: "belge bulunamıyor", "rapor boş", "tutar yanlış".' },
      { rol:'FI danışmanı', gorev:'Belirtiden doğru tabloyu seçer ve {{SE16N}} ile bakar.' },
      { rol:'FI danışmanı', gorev:'Tablo yapısını {{SE11}} ile inceler: anahtar alanlar, ilişkiler.' },
      { rol:'Geliştirici', gorev:'Özel rapor/arayüz için doğru tabloyu ve anahtarı belirler.' },
      { rol:'Geçiş ekibi', gorev:'S/4HANA’da hangi tablonun görünüme dönüştüğünü doğrular.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Belirtiden tabloya — teşhis akışı',
      adimlar:[
        { ic:'❗', rol:'Kullanıcı', baslik:'Belirti bildirilir',
          aciklama:'*"Belge bulunamıyor"* · *"rapor boş"* · *"iki rapor farklı gösteriyor"*. ' +
                   'Ekran genelde sebebi söylemez.',
          cikti:'Belirti', ok:'tablo seçilir' },
        { ic:'🎯', rol:'Danışman', baslik:'Belirtiye göre tablo seçilir',
          aciklama:'Belge yok → {{BKPF}} / {{VBKPF}} · rapor boş → {{SKB1}} · ' +
                   'SD faturası düşmedi → {{VBRK}} · vergi tutmuyor → {{BSET}}.',
          cikti:'Hedef tablo', ok:'içerik okunur' },
        { ic:'🔍', rol:'Danışman', baslik:'{{SE16N}} ile içerik okunur',
          aciklama:'Anahtar alanlarla süzülür. **Gerçek değer** görülür — ' +
                   'ekranın gösterdiği değil.',
          cikti:'Ham veri', ok:'yapı gerekiyorsa' },
        { ic:'🏗️', rol:'Danışman', baslik:'Gerekirse {{SE11}} ile yapı incelenir',
          aciklama:'{{tablo-anahtari}} hangi alanlar? Hangi tabloya bağlı? ' +
                   'Alan tipi ne?',
          cikti:'Tablo yapısı', ok:'sonuç' },
        { ic:'✅', rol:'Danışman', baslik:'Kök sebep bulunur',
          aciklama:'Belge park edilmiş · kalem yönetimi kapalı · ' +
                   'aktarım bayrağı "A" · vergi satırı yazılmamış.',
          cikti:'Teşhis', ok:'çözüm' },
      ],
    },

    adimlar:[
      { rol:'Danışman', eylem:'Tablo içeriğini okur', sistem:'{{SE16N}} — alan adlarıyla, süzülebilir' },
      { rol:'Danışman', eylem:'Tablo yapısını inceler', sistem:'{{SE11}} — anahtar, alan tipleri' },
      { rol:'Danışman', eylem:'Belge başlığını arar', sistem:'{{BKPF}} — yoksa park veya güncelleme hatası' },
      { rol:'Danışman', eylem:'Park edilmiş belgeye bakar', sistem:'{{VBKPF}} / {{FBV3}}' },
      { rol:'Danışman', eylem:'Açık kalemleri kontrol eder', sistem:'{{BSIK}} / {{BSID}} — S/4’te görünüm' },
      { rol:'Danışman', eylem:'Değişiklik izini izler', sistem:'{{CDHDR}} / {{CDPOS}}' },
      { rol:'Geliştirici', eylem:'Yeni geliştirmede kaynak seçer', sistem:'**{{ACDOCA}}** — görünüm değil' },
    ],

    veriAkisi:{
      nereden:'Kullanıcı işlemleri belgeleri üretir; yapılandırma tabloları okunur.',
      nereye:'{{ACDOCA}} (S/4 tek kaynak) veya {{BKPF}}+{{BSEG}}+indeksler+toplamlar (ECC).',
      tetikleyen:'Her kayıt işlemi; teşhis sorgusu; rapor çalıştırma.',
      sonraki:'Raporlama, teşhis, geliştirme, veri geçişi.',
    },

    notlar:[
      { tip:'warn', baslik:'{{SE16N}} kullanıcıya verilmemelidir', metin:
        '{{SE16N}} güçlü bir teşhis aracıdır — ama **rapor aracı değildir** ve ' +
        'son kullanıcıya verilmemelidir. İki sebebi vardır:\n\n' +
        '**1. Yetki kontrolü zayıftır.** Normal raporlarda şirket kodu ve hesap bazlı ' +
        'yetki kontrolü çalışır. Tablo görüntülemede bu kontrol **çok daha gevşektir**; ' +
        'kullanıcı görmemesi gereken veriyi görebilir.\n\n' +
        '**2. Ham veri yanıltıcıdır.** Tablodaki değer, ekranda gösterilenden farklı olabilir: ' +
        'kodlar çözülmemiştir, tutarlar ters işaretli olabilir ({{BSEG}} `SHKZG` borç/alacak göstergesi), ' +
        'para birimi çevrimi yapılmamıştır.\n\n' +
        'Kullanıcı bu farkı bilmediği için **yanlış sonuç çıkarır** ve ' +
        '"sistem yanlış" der.\n\n' +
        'Kullanıcıya verilmesi gereken şey **doğru rapor + kayıtlı düzendir** ' +
        '(bkz. {{konu:reporting}}).' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Tablolar kayıt üretmez — ama bir muhasebe kaydının **hangi tablolara** ' +
      'ne yazdığını bilmek, teşhisin temelidir. ' +
      'Aşağıda tek bir faturanın tablo izi takip ediliyor.',

    etkilenenHesaplar:[
      { hesap:'Tüm hesaplar', tur:'—', neden:'Tablolar okuma/yazma katmanıdır; muhasebe etkisi kayıt işlemine aittir.' },
      { hesap:'{{BSEG}} `SHKZG` alanı', tur:'Teknik', neden:'**Borç/alacak göstergesi** — tutar her zaman pozitif saklanır, yön bu alanda. Ham veri okurken kritik.' },
      { hesap:'{{BSEG}} `DMBTR` / `WRBTR`', tur:'Teknik', neden:'Yerel para (`DMBTR`) ve işlem para birimi (`WRBTR`) **ayrı alanlarda**.' },
      { hesap:'{{BSET}} vergi satırları', tur:'Vergi', neden:'Vergi, {{BSEG}}’den **ayrı** tabloda; beyan buradan üretilir.' },
      { hesap:'{{ACDOCA}}', tur:'S/4HANA', neden:'FI ve CO **tek satırda**; toplam tablosu yok.' },
    ],

    fisler:[
      { baslik:'Bir satıcı faturasının tablo izi — ECC',
        belgeTuru:'KR', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Gider', borc:100000, not:'{{BSEG}} satır 1 · `SHKZG` = **S** (borç)' },
          { hesap:'191', ad:'İndirilecek KDV', borc:20000, not:'{{BSEG}} satır 2 + **{{BSET}}** vergi satırı' },
          { hesap:'320', ad:'Satıcılar', alacak:120000, not:'{{BSEG}} satır 3 · `SHKZG` = **H** (alacak) + **{{BSIK}}**' },
        ],
        not:'**Bu tek kayıt beş tabloya yazar:**\n\n' +
             '**{{BKPF}}** → 1 satır (başlık: tarih, tür, kullanıcı)\n' +
             '**{{BSEG}}** → 3 satır (kalemler)\n' +
             '**{{BSET}}** → 1 satır (vergi: matrah 100.000 + vergi 20.000)\n' +
             '**{{BSIK}}** → 1 satır (satıcı **açık** kalemi)\n' +
             '**{{GLT0}}** → 3 hesabın dönem toplamı güncellenir\n\n' +
             '⚠️ **Tutarlar {{BSEG}}’de her zaman pozitiftir.** ' +
             'Borç/alacak yönü `SHKZG` alanındadır: **S** = borç (Soll), **H** = alacak (Haben). ' +
             'Ham veri okurken bu bilinmezse toplamlar yanlış hesaplanır.' },

      { baslik:'Aynı kayıt — S/4HANA’da tablo izi',
        belgeTuru:'KR', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Gider', borc:100000, not:'{{ACDOCA}} satır 1' },
          { hesap:'191', ad:'İndirilecek KDV', borc:20000, not:'{{ACDOCA}} satır 2 + {{BSET}}' },
          { hesap:'320', ad:'Satıcılar', alacak:120000, not:'{{ACDOCA}} satır 3' },
        ],
        not:'**S/4HANA’da yazılan tablolar:**\n\n' +
             '**{{BKPF}}** → 1 satır *(duruyor)*\n' +
             '**{{ACDOCA}}** → 3 satır *(FI + CO birlikte)*\n' +
             '**{{BSET}}** → 1 satır *(duruyor — beyan buradan)*\n\n' +
             '**Yazılmayanlar:** {{BSEG}}, {{BSIK}}, {{GLT0}} — ' +
             'bunlar artık **{{uyumluluk-view}}**. Sorgulandıklarında ' +
             '{{ACDOCA}}’dan **türetilirler**.\n\n' +
             'Sonuç: yazma sayısı azaldı, tutarsızlık ihtimali ortadan kalktı.' },

      { baslik:'Ödeme yapıldığında — kalem tablo **değiştirir**',
        belgeTuru:'KZ', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar (kapatma)', borc:120000, not:'{{BSIK}} → **{{BSAK}}**’a taşınır' },
          { hesap:'102', ad:'Bankalar', alacak:120000 },
        ],
        not:'Kapatma yapıldığında satıcı kalemi **{{BSIK}}’ten silinir ve {{BSAK}}’a yazılır**.\n\n' +
             'İkisi de aynı bilgiyi taşır; fark **açık mı kapalı mı** olmasıdır.\n\n' +
             '**Neden ayrı tablo?** Performans. "Bu satıcının açık kalemleri" sorgusu ' +
             'yalnızca açıkları tutan küçük tabloda çalışsın diye. ' +
             'Kapatılmış kalemler yıllar içinde milyonlara ulaşır ve ' +
             'sorguyu yavaşlatırdı.\n\n' +
             '⚠️ S/4HANA’da ikisi de **görünümdür**; taşıma diye bir şey yoktur. ' +
             '{{ACDOCA}}’daki kapatma alanı doldurulur, o kadar.' },
    ],

    tHesaplar:[
      { hesap:'Satıcılar — açık kalem', kod:'{{BSIK}}',
        borc:[],
        alacak:[{ ad:'Fatura kaydı', tutar:120000 }],
        not:'Ödeme yapılınca **{{BSAK}}’a taşınır**' },
      { hesap:'Satıcılar — kapatılmış kalem', kod:'{{BSAK}}',
        borc:[{ ad:'Ödemeyle kapanan', tutar:120000 }],
        alacak:[],
        not:'S/4HANA’da ikisi de görünüm' },
    ],

    notlar:[
      { tip:'tip', baslik:'{{BSEG}}’de tutarlar neden hep pozitif?', metin:
        'Ham veri okurken en sık yapılan hata, **{{BSEG}} tutarlarını doğrudan toplamaktır**.\n\n' +
        'Tutar alanları (`DMBTR`, `WRBTR`) **her zaman pozitiftir**. ' +
        'Borç mu alacak mı olduğu ayrı bir alandadır: **`SHKZG`**.\n\n' +
        '**S** = Soll (borç) · **H** = Haben (alacak)\n\n' +
        'Yani bir belgenin dengeli olup olmadığını anlamak için ' +
        '`SHKZG` = S olanların toplamı ile H olanların toplamı **karşılaştırılır**.\n\n' +
        'Doğrudan toplanırsa 240.000 çıkar (120.000 + 120.000) ve ' +
        '"belge dengesiz" sanılır.\n\n' +
        '**{{ACDOCA}}’da bu değişti:** tutarlar **işaretlidir** — ' +
        'alacak negatif olarak saklanır ve toplam doğrudan alınabilir. ' +
        'Bu, S/4HANA’nın sessiz ama pratik iyileştirmelerinden biridir.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'FI tabloları **beş gruba** ayrılır. Grubu bilmek, ' +
      'tablonun ne işe yaradığını ve S/4HANA’da ne olduğunu anlatır.',

    liste:[
      { ad:'📄 Belge · Başlık–kalem çifti', en:'Header–Item Tables',
        aciklama:'Bir belgenin tekil bilgisi başlıkta, çoğul bilgisi kalemde.',
        neZaman:'Her muhasebe belgesinde.',
        ornek:'{{BKPF}} (başlık) + {{BSEG}} (kalem). ' +
              'Bağlantı: `BUKRS + BELNR + GJAHR`.\n\n' +
              'Aynı desen her yerde: {{VBRK}}/{{VBRP}} (SD faturası), ' +
              '{{RBKP}}/{{RSEG}} (MM faturası), {{VBKPF}}/{{VBSEG}} (park).' },

      { ad:'🗂️ İndeks · Açık / kapalı kalem', en:'Index Tables',
        aciklama:'İş ortağı ve hesap bazında **hızlı erişim** için tutulan alt kümeler.',
        neZaman:'ECC’de performans için; S/4HANA’da **görünüm olarak**.',
        ornek:'**Satıcı:** {{BSIK}} açık · {{BSAK}} kapalı\n' +
              '**Müşteri:** {{BSID}} açık · {{BSAD}} kapalı\n' +
              '**G/L:** {{BSIS}} açık · {{BSAS}} kapalı\n\n' +
              'Kapatma yapıldığında kayıt **birinden diğerine taşınır**. ' +
              'Yeni bilgi taşımazlar — {{BSEG}}’in alt kümesidirler.' },

      { ad:'📊 Toplam · Bakiye tabloları', en:'Totals Tables',
        aciklama:'Hesap × dönem bazında birikmiş toplamlar.',
        neZaman:'ECC’de bakiye raporları için.',
        ornek:'{{GLT0}} (klasik G/L), FAGLFLEXT (New G/L).\n\n' +
              '⚠️ **S/4HANA’da kaldırıldı.** Toplamlar {{ACDOCA}}’dan ' +
              '**anlık hesaplanır** — "toplam tutmuyor" sorunu ortadan kalktı.' },

      { ad:'⚙️ Yapılandırma · Özelleştirme tabloları', en:'Customizing Tables',
        aciklama:'Sistemin nasıl davranacağını belirleyen ayarlar.',
        neZaman:'Her kayıtta okunurlar.',
        ornek:'{{T001}} şirket kodu · {{T030}} hesap belirleme · ' +
              '{{T007A}} vergi kodu · {{T001B}} dönem kontrolü\n\n' +
              '**{{tampon}}lanırlar** — bu yüzden yapılandırma değişikliği ' +
              'bazen hemen etkili olmaz.' },

      { ad:'👤 Ana veri · İş ortağı ve hesap', en:'Master Data Tables',
        aciklama:'Satıcı, müşteri, G/L hesabı, duran varlık bilgileri.',
        neZaman:'Kayıt sırasında okunur; ana veri işlemleriyle güncellenir.',
        ornek:'{{LFA1}}/{{LFB1}} satıcı · {{KNA1}}/{{KNB1}} müşteri · ' +
              '{{SKA1}}/{{SKB1}} G/L hesabı · {{ANLA}} duran varlık\n\n' +
              '**Desen:** `*A1` genel seviye (tüm şirket kodları için ortak), ' +
              '`*B1` şirket kodu seviyesi.' },

      { ad:'🔍 İzleme · Değişiklik ve günlük', en:'Log Tables',
        aciklama:'Kim ne zaman ne değiştirdi; toplu işlem günlükleri.',
        neZaman:'Denetimde; teşhiste.',
        ornek:'{{CDHDR}}/{{CDPOS}} {{degisiklik-belgesi}} · ' +
              '{{NRIV}} numara aralığı durumu\n\n' +
              'Uygulama günlükleri {{SLG1}} ile okunur.' },

      { ad:'⚡ S/4HANA · {{evrensel-kayit-defteri}}', en:'Universal Journal',
        aciklama:'FI ve CO kalemlerinin **tek tabloda** birleşmesi.',
        neZaman:'S/4HANA’da her kayıtta.',
        ornek:'**{{ACDOCA}}** — hesap, maliyet yeri, kâr merkezi, segment, defter ' +
              'aynı satırda. Toplam tablosu **yok**.\n\n' +
              'Yerini aldıkları: {{BSEG}}, COEP, {{GLT0}}, FAGLFLEXA/T ve daha fazlası.' },

      { ad:'🔄 Uyumluluk · Türetilen görünümler', en:'Compatibility Views',
        aciklama:'Eski tablo adıyla sorgulanabilen ama **{{ACDOCA}}’dan türetilen** yapılar.',
        neZaman:'Eski programlar çalışmaya devam etsin diye.',
        ornek:'{{BSEG}}, {{BSIK}}, {{BSAK}}, {{BSID}}, {{GLT0}} — ' +
              'hepsi S/4HANA’da görünümdür.\n\n' +
              '⚠️ **Performans notu:** görünüm üzerinden okuma, ' +
              '{{ACDOCA}}’yı doğrudan okumaktan **yavaştır**. ' +
              'Yeni geliştirmeler {{ACDOCA}} kullanmalıdır.' },
    ],

    karsilastirmaBasliklar:['ECC yapısı', 'S/4HANA yapısı'],
    karsilastirma:[
      ['FI kalemleri', '{{BSEG}} — fiziksel tablo', '**{{ACDOCA}}** · {{BSEG}} görünüm'],
      ['CO kalemleri', 'COEP — **ayrı tablo**', '{{ACDOCA}} — **aynı tablo**'],
      ['Açık kalem indeksi', '{{BSIK}}/{{BSID}} fiziksel', '{{uyumluluk-view}}'],
      ['Kapalı kalem', '{{BSAK}}/{{BSAD}} — kayıt **taşınır**', 'Görünüm — taşıma **yok**'],
      ['Toplamlar', '{{GLT0}}, FAGLFLEXT', '**Yok** — anlık hesaplanır'],
      ['Tutar işareti', '`SHKZG` ile ayrı alanda', '**İşaretli** — alacak negatif'],
      ['Yazma sayısı (1 belge)', '5+ tablo', '**3 tablo** (BKPF, ACDOCA, BSET)'],
      ['Tutarsızlık riski', 'Var — mutabakat gerekirdi', '**Yapısal olarak imkânsız**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'SE16N', ad:'Tablo içeriği — teşhisin ana aracı',
        amac:'Bir tablonun satırlarını alan adlarıyla listeler, süzer, dışa aktarır.',
        neZaman:'Ekranın söylemediğini görmek gerektiğinde.',
        adimlar:[
          { baslik:'Tablo adını gir' },
          { baslik:'Seçim alanlarını doldur',
            aciklama:'**Anahtar alanlarla süz** — anahtar dışı alanla süzmek ' +
                     'büyük tablolarda çok yavaştır ({{tablo-anahtari}}).' },
          { baslik:'Çalıştır ve sonucu incele',
            aciklama:'Alan adları ve teknik adlar birlikte görünür.' },
          { baslik:'Gerekirse Excel’e aktar' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Tablo **VBRK**' },
          { ekran:'Seçim', islem:'`RFBSK` = **A** · faturalama tarihi 01–30.11' },
          { ekran:'Sonuç', islem:'**40 kayıt** — muhasebeye aktarılmamış SD faturaları' },
          { ekran:'Çıktı', islem:'Excel’e aktarılıp incelemeye gönderildi' },
        ],
        alanlar:{
          zorunlu:['Tablo adı'],
          opsiyonel:['Seçim kriterleri','Alan seçimi','Maksimum satır'] },
        hatalar:[
          { mesaj:'Çok yavaş çalışıyor / zaman aşımı', sebep:'Anahtar dışı alanla süzülmüş; tüm tablo taranıyor.', cozum:'Anahtar alanlarla daralt. {{BSEG}}’de satıcı numarasıyla arama yavaştır — {{BSIK}} kullan.' },
          { mesaj:'You are not authorized to display table ...', sebep:'Tablo görüntüleme yetkisi yok.', cozum:'Yetki talebi. **Kullanıcıya verilmemesi doğrudur** — teşhis aracıdır.' },
        ],
        ipucu:'**En değerli kullanımı, ekranın söylemediğini görmektir:**\n\n' +
              '{{VBRK}} `RFBSK` → SD faturası muhasebeye düştü mü?\n' +
              '{{SKB1}} `XKRES` → hesapta kalem yönetimi açık mı?\n' +
              '{{VBKPF}} → belge park mı edilmiş?\n' +
              '{{T030K}} → vergi hesabı tanımlı mı?\n\n' +
              '⚠️ **Kullanıcıya verilmemelidir:** yetki kontrolü zayıftır ve ' +
              'ham veri (çözülmemiş kodlar, `SHKZG` işareti) **yanıltıcıdır**.',
        ilgili:['SE11','SE16','FB03'] },

      { kod:'SE11', ad:'Sözlük — tablo yapısını incele',
        amac:'Tablonun alanlarını, **anahtarını**, veri tiplerini ve ilişkilerini gösterir.',
        neZaman:'Geliştirme öncesi; "bu alan ne tutuyor?" sorusunda; ' +
                'performans sorununda anahtarı görmek için.',
        adimlar:[
          { baslik:'Tablo adını gir ve görüntüle' },
          { baslik:'**Anahtar alanları oku**',
            aciklama:'Anahtar sütunu işaretli alanlar. Sorgu performansını **bunlar belirler**.' },
          { baslik:'Alan tiplerini ve uzunluklarını incele' },
          { baslik:'Yabancı anahtar ilişkilerini gör', aciklama:'Hangi tabloya bağlı.' },
        ],
        ipucu:'**Performans sorunlarının cevabı burada:** {{BSEG}}’in anahtarı ' +
              '`BUKRS + BELNR + GJAHR + BUZEI`’dir.\n\n' +
              'Belge numarasıyla arama **hızlı**; satıcı numarasıyla (`LIFNR`) arama ' +
              '**yavaştır** — çünkü anahtar değil.\n\n' +
              'İndeks tablolarının ({{BSIK}}) varlık sebebi tam olarak budur: ' +
              'anahtarı `LIFNR` ile başlar.',
        ilgili:['SE16N','tablo-anahtari'] },

      { kod:'SE93', ad:'İşlem kodu tanımı — "bu T-code ne çalıştırıyor?"',
        amac:'Bir işlem kodunun arkasındaki programı ve ekranı gösterir.',
        neZaman:'Özel bir işlem kodunun ne yaptığını anlamak gerektiğinde.',
        adimlar:[
          { baslik:'İşlem kodunu gir' },
          { baslik:'Program adını ve ekran numarasını oku' },
          { baslik:'Gerekirse {{SE38}} ile programı incele' },
        ],
        ipucu:'Müşteriye özel (`Z*`) işlem kodlarının ne yaptığını anlamanın ' +
              'en hızlı yoludur.\n\n' +
              'Ayrıca bazı standart raporların işlem kodu yoktur ve ' +
              '{{SE38}} ile program adıyla çalıştırılır ' +
              '(mali tablo programı gibi).',
        ilgili:['SE38','SE11'] },

      { kod:'FB03', ad:'Belgeyi görüntüle — tablo izinin başlangıcı',
        amac:'Muhasebe belgesini gösterir; teşhis zincirinin ilk halkasıdır.',
        neZaman:'Bir kalemden belgeye inildiğinde; belge kontrolünde.',
        adimlar:[
          { baslik:'Belge numarası, şirket kodu, mali yıl gir' },
          { baslik:'Kalemleri incele' },
          { baslik:'**Ortam → Değişiklikler**', aciklama:'{{degisiklik-belgesi}} — kim ne değiştirdi.' },
          { baslik:'Belge başlığından kaydeden kullanıcıyı gör' },
        ],
        ipucu:'⚠️ **{{FB03}} yalnızca {{BKPF}}’ye bakar.**\n\n' +
              'Belge bulunamıyorsa iki ihtimal vardır:\n' +
              '**1.** Belge **park edilmiş** → {{VBKPF}}’te, {{FBV3}} ile görüntülenir\n' +
              '**2.** **{{guncelleme-hatasi}}** olmuş → {{SM13}}’te görünür\n\n' +
              'Bu ayrım tablo bilgisi olmadan yapılamaz.',
        ilgili:['FBV3','SM13','SE16N'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Aşağıdaki tablolar FI’ın omurgasıdır. Her birinin **anahtarı** ve ' +
      '**S/4HANA’daki durumu** ayrı ayrı belirtilmiştir — ' +
      'ikisi de teşhiste ve geçişte kritiktir.',

    liste:[
      { ad:'BKPF', baslik:'Belge başlığı — her belgenin kimliği',
        tutar:'Belgenin tekil bilgileri: tarih, belge türü, para birimi, **kaydeden kullanıcı**, ' +
              'referans, ters kayıt bilgisi.',
        olusturan:'Her muhasebe kaydı',
        guncelleyen:'Ters kayıt işaretlenir; başlık metni değişebilir',
        anahtar:'**BUKRS + BELNR + GJAHR** — üçlü anahtar',
        iliskiler:'{{BSEG}} ve {{ACDOCA}} bu üçlüyle bağlanır.',
        s4:'**Duruyor** — S/4HANA’da da fiziksel tablodur.',
        alanlar:[
          { ad:'BELNR', aciklama:'Belge numarası — **mali yıl içinde** benzersiz', tip:'pk' },
          { ad:'GJAHR', aciklama:'Mali yıl — anahtarın parçası; farklı yıllarda **aynı numara olabilir**', tip:'pk' },
          { ad:'BLART', aciklama:'{{belge-turu}} — KR satıcı, DR müşteri, SA G/L, AF amortisman' },
          { ad:'BUDAT', aciklama:'**Kayıt tarihi** — dönemi belirler' },
          { ad:'BLDAT', aciklama:'Belge tarihi — faturanın kendi tarihi' },
          { ad:'USNAM', aciklama:'**Kaydeden kullanıcı** — dört-göz kontrolünde kullanılır' },
          { ad:'STBLG', aciklama:'Ters kayıt belgesi — doluysa bu belge ters kaydedilmiştir' },
          { ad:'AWTYP / AWKEY', aciklama:'Kaynak belge (VBRK = SD faturası, RMRP = MM faturası)' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri — ECC’nin merkezi',
        tutar:'Belgenin satırları: hesap, tutar, borç/alacak, iş ortağı, vergi kodu, ' +
              'maliyet yeri.',
        olusturan:'Belge kaydı',
        anahtar:'**BUKRS + BELNR + GJAHR + BUZEI**',
        iliskiler:'{{BKPF}} başlığı; {{BSIK}}/{{BSID}} indeksleri.',
        s4:'**{{uyumluluk-view}}** — {{ACDOCA}}’dan türetilir. ' +
           'Yeni geliştirmeler {{ACDOCA}} kullanmalıdır.',
        alanlar:[
          { ad:'BUZEI', aciklama:'Satır numarası', tip:'pk' },
          { ad:'**SHKZG**', aciklama:'**Borç/alacak göstergesi: S = borç, H = alacak.** ' +
                   'Tutar her zaman pozitiftir; yön burada. ⚠️ Ham veri okurken kritik.' },
          { ad:'DMBTR', aciklama:'Yerel para birimi tutarı' },
          { ad:'WRBTR', aciklama:'İşlem para birimi tutarı' },
          { ad:'HKONT', aciklama:'G/L hesabı' },
          { ad:'LIFNR / KUNNR', aciklama:'Satıcı / müşteri — **anahtar değil** → bu alanla arama yavaş' },
          { ad:'MWSKZ', aciklama:'{{vergi-kodu}}' },
          { ad:'UMSKZ', aciklama:'{{ozel-ana-muhasebe-gostergesi}}' },
        ] },

      { ad:'ACDOCA', baslik:'Evrensel kayıt defteri — S/4HANA’nın merkezi',
        tutar:'FI ve CO kalemleri **birlikte**; hesap, maliyet yeri, kâr merkezi, ' +
              'segment, defter aynı satırda.',
        olusturan:'Her FI/CO belgesi',
        anahtar:'**RLDNR + RBUKRS + GJAHR + BELNR + DOCLN**',
        iliskiler:'{{BKPF}} başlığı; {{BSEG}}, {{BSIK}}, {{GLT0}} bundan **türetilir**.',
        s4:'**S/4HANA’nın tek kalem tablosu.** Toplam tablosu yoktur.',
        alanlar:[
          { ad:'RLDNR', aciklama:'**Defter** — anahtarın ilk alanı; 0L lider, 2L IFRS', tip:'pk' },
          { ad:'DOCLN', aciklama:'Satır numarası — belge bölme sonrası {{BSEG}}’den **fazla olabilir**', tip:'pk' },
          { ad:'RACCT', aciklama:'Hesap / masraf türü — **aynı numara**' },
          { ad:'KOSTL / PRCTR / SEGMENT', aciklama:'CO ve raporlama boyutları — **aynı satırda**' },
          { ad:'HSL / WSL / KSL', aciklama:'Yerel / işlem / grup para birimi. ⚠️ **İşaretli** — alacak negatif' },
        ] },

      { ad:'BSIK', baslik:'Satıcı açık kalemleri',
        tutar:'Henüz kapatılmamış satıcı kalemleri.',
        olusturan:'Satıcı kalemi içeren belge',
        guncelleyen:'Kapatma → kayıt **{{BSAK}}’a taşınır**',
        anahtar:'**LIFNR + BUKRS + ...** — satıcıyla başlar, bu yüzden hızlı',
        iliskiler:'{{BSEG}}’in alt kümesi; {{FBL1N}} buradan okur.',
        s4:'{{uyumluluk-view}} — taşıma diye bir şey yok, ' +
           '{{ACDOCA}}’daki kapatma alanı doldurulur.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Satıcı — **anahtarın ilk alanı**; varlık sebebi budur', tip:'pk' },
          { ad:'ZFBDT / ZBD1T', aciklama:'Vade hesabının temeli' },
          { ad:'MANSP / MAHNS', aciklama:'İhtar bloğu ve seviyesi' },
        ] },

      { ad:'BSAK', baslik:'Satıcı kapatılmış kalemleri',
        tutar:'Ödenmiş/kapatılmış satıcı kalemleri.',
        olusturan:'Kapatma işlemi ({{BSIK}}’ten taşınır)',
        anahtar:'LIFNR + BUKRS + ...',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'AUGBL', aciklama:'**Kapatma belgesi** — hangi ödemeyle kapandı' },
          { ad:'AUGDT', aciklama:'Kapatma tarihi' },
        ] },

      { ad:'BSET', baslik:'Vergi satırları',
        tutar:'Matrah ve vergi tutarı — {{BSEG}}’den **ayrı**.',
        olusturan:'Vergi kodu içeren belge',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'KDV beyanı **buradan** üretilir, {{BSEG}}’den değil.',
        s4:'**Duruyor** — beyan hâlâ buna dayanır.',
        alanlar:[
          { ad:'HWBAS', aciklama:'**Matrah** — verginin üzerinden hesaplandığı tutar' },
          { ad:'HWSTE', aciklama:'Vergi tutarı' },
        ] },

      { ad:'GLT0', baslik:'G/L toplam tablosu (ECC)',
        tutar:'Hesap × dönem bazında birikmiş toplamlar.',
        olusturan:'Belge kaydı (paralel güncelleme)',
        anahtar:'BUKRS + RACCT + RYEAR',
        s4:'**Kaldırıldı.** Toplamlar {{ACDOCA}}’dan anlık hesaplanır; ' +
           '*"toplam tutmuyor"* sorunu ortadan kalktı.',
        alanlar:[
          { ad:'HSL01…HSL16', aciklama:'Dönem bazında toplamlar (12 normal + 4 özel)' },
        ] },

      { ad:'CDHDR', baslik:'Değişiklik belgesi başlığı',
        tutar:'{{degisiklik-belgesi}} — kim, ne zaman, hangi nesne.',
        olusturan:'İzlemeye açık alan değişiklikleri',
        anahtar:'OBJECTCLAS + OBJECTID + CHANGENR',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'OBJECTCLAS', aciklama:'Nesne sınıfı — KRED satıcı, DEBI müşteri, BELEG belge' },
          { ad:'USERNAME', aciklama:'Değiştiren kullanıcı' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'FI tablo mimarisi — ECC’den S/4HANA’ya',
      varliklar:[
        { ad:'BKPF', rol:'Başlık', hub:true, aciklama:'**Belge kimliği — her ikisinde de fiziksel**',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }, { ad:'BLART' }, { ad:'USNAM' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'**Tek kalem tablosu** — FI + CO',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }, { ad:'RACCT' }, { ad:'KOSTL' }] },
        { ad:'BSEG', rol:'ECC / görünüm', aciklama:'Kalemler — S/4’te türetilir',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'SHKZG' }, { ad:'HKONT' }] },
        { ad:'BSIK', rol:'İndeks', aciklama:'Satıcı **açık** kalemleri',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'BSAK', rol:'İndeks', aciklama:'Satıcı **kapalı** kalemleri',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'AUGBL' }] },
        { ad:'BSET', rol:'Vergi', aciklama:'Vergi satırları — beyanın kaynağı',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HWBAS' }, { ad:'HWSTE' }] },
        { ad:'GLT0', rol:'Toplam', aciklama:'ECC bakiye — S/4’te **kalktı**',
          alanlar:[{ ad:'RACCT', tip:'pk' }, { ad:'HSL01' }] },
        { ad:'CDHDR', rol:'İzleme', aciklama:'Değişiklik izi',
          alanlar:[{ ad:'OBJECTID', tip:'fk' }, { ad:'USERNAME' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'ACDOCA', alanlar:'BUKRS+BELNR+GJAHR', not:'**S/4HANA ana yol**' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS+BELNR+GJAHR', not:'ECC ana yol' },
        { from:'BSEG', to:'BSIK', alanlar:'BELNR+BUZEI', not:'açık kalem indeksi' },
        { from:'BSIK', to:'BSAK', alanlar:'kapatma', not:'**kayıt taşınır**' },
        { from:'BKPF', to:'BSET', alanlar:'BELNR', not:'vergi satırı' },
        { from:'ACDOCA', to:'GLT0', alanlar:'RACCT', not:'toplam — S/4’te türetilir' },
        { from:'BKPF', to:'CDHDR', alanlar:'BELNR → OBJECTID', not:'değişiklik izi' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Tablo kullanımında iki ekran vardır: **{{SE16N}}** (içerik) ve ' +
      '**{{SE11}}** (yapı). İkisi farklı sorulara cevap verir.',

    ekranlar:[
      { ad:'{{SE16N}} — içerik görüntüleme',
        aciklama:'*"Bu tabloda ne var?"* sorusunun ekranı.',
        alanlar:[
          { ad:'Tablo adı', zorunlu:true },
          { ad:'Seçim kriterleri', zorunlu:false, aciklama:'⚠️ **Anahtar alanlarla süz** — ' +
                   'anahtar dışı alanla süzmek büyük tablolarda çok yavaştır.' },
          { ad:'Maksimum satır', zorunlu:false, aciklama:'Varsayılan sınırı artırmak ' +
                   'büyük tablolarda zaman aşımına yol açar.' },
          { ad:'Alan seçimi', zorunlu:false, aciklama:'Yalnızca gerekli sütunlar seçilirse hızlanır.' },
        ],
        ipucu:'**Teşhis için en sık kullanılan sorgular:**\n\n' +
              '{{VBRK}} `RFBSK` = A → SD faturası muhasebeye düşmedi\n' +
              '{{SKB1}} `XKRES` → hesapta kalem yönetimi açık mı\n' +
              '{{VBKPF}} → belge park mı edilmiş\n' +
              '{{T030K}} → vergi hesabı tanımlı mı\n' +
              '{{CDPOS}} → satıcının banka hesabı ne zaman değişti\n\n' +
              'Bu sorgular ekranların **söylemediğini** gösterir.' },

      { ad:'{{SE11}} — yapı inceleme',
        aciklama:'*"Bu tablo nasıl kurulmuş?"* sorusunun ekranı.',
        alanlar:[
          { ad:'Tablo adı', zorunlu:true },
          { ad:'**Anahtar sütunu**', zorunlu:false, aciklama:'İşaretli alanlar {{tablo-anahtari}}’nı oluşturur — ' +
                   '**sorgu performansını bunlar belirler**.' },
          { ad:'Alan tipleri', zorunlu:false, aciklama:'Veri elemanı, uzunluk, ondalık.' },
          { ad:'Yabancı anahtarlar', zorunlu:false, aciklama:'Hangi tabloya bağlı.' },
        ],
        ipucu:'**Performans sorusu her zaman burada cevaplanır.** ' +
              '{{BSEG}} anahtarı belge numarasıyla başlar; ' +
              'satıcı numarasıyla arama yavaştır.\n\n' +
              'İndeks tablolarının ({{BSIK}}) anahtarı ise `LIFNR` ile başlar — ' +
              'varlık sebepleri budur.' },

      { ad:'{{FB03}} — belgeden tabloya köprü',
        aciklama:'Kullanıcı dilinden teknik dile geçiş noktası.',
        alanlar:[
          { ad:'Belge numarası + şirket kodu + mali yıl', zorunlu:true,
            aciklama:'⚠️ Mali yıl **anahtarın parçasıdır** — farklı yıllarda aynı numara olabilir.' },
          { ad:'Kalemler', zorunlu:false },
          { ad:'Ortam → Değişiklikler', zorunlu:false, aciklama:'{{degisiklik-belgesi}}' },
          { ad:'Belge başlığı', zorunlu:false, aciklama:'Kaydeden kullanıcı ve tarih.' },
        ],
        ipucu:'**Belge bulunamıyorsa teşhis:**\n\n' +
              '**1.** {{FBV3}} ile dene → bulunuyorsa **park edilmiş**\n' +
              '**2.** {{SM13}}’e bak → varsa **{{guncelleme-hatasi}}**\n' +
              '**3.** {{SE16N}} → {{BKPF}} ile doğrula\n\n' +
              '{{FB03}} yalnızca {{BKPF}}’ye baktığı için bu ayrımı kendisi yapamaz.' },
    ],

    zorunlu:['Tablo adı','Belge numarası + şirket kodu + mali yıl (FB03 için)'],
    opsiyonel:['Seçim kriterleri','Alan seçimi','Maksimum satır'],

    hatalar:[
      { mesaj:'{{SE16N}} çok yavaş / zaman aşımı', sebep:'Anahtar dışı alanla süzülmüş; tüm tablo taranıyor.', cozum:'{{SE11}} ile anahtarı gör, ona göre daralt. Satıcı bazlı arama için {{BSEG}} yerine {{BSIK}} kullan.' },
      { mesaj:'Belge numarası var ama {{FB03}} bulamıyor', sebep:'Belge park edilmiş veya {{guncelleme-hatasi}} olmuş.', cozum:'{{FBV3}} ile dene; olmazsa {{SM13}}’e bak.' },
      { mesaj:'Aynı belge numarası iki kez görünüyor', sebep:'**Farklı mali yıllarda** aynı numara — normaldir.', cozum:'`GJAHR` anahtarın parçasıdır; sorguya mali yılı da ekle.' },
      { mesaj:'{{BSEG}} tutarlarını topladım, belge dengesiz çıktı', sebep:'`SHKZG` göstergesi dikkate alınmamış — tutarlar **hep pozitif**.', cozum:'S (borç) ve H (alacak) ayrı toplanıp karşılaştırılır. {{ACDOCA}}’da tutarlar **işaretlidir**, bu sorun yoktur.' },
      { mesaj:'Eski özel raporum S/4HANA’da yavaşladı', sebep:'{{uyumluluk-view}} üzerinden okuyor.', cozum:'{{ACDOCA}}’yı **doğrudan** okuyacak şekilde güncelle.' },
      { mesaj:'Yapılandırma değiştirdim ama etkisi görünmüyor', sebep:'Tablo {{tampon}}lanmış.', cozum:'Kullanıcı oturumunu kapatıp açsın; genelde yeterlidir.' },
    ],

    ipuclari:[
      '**Anahtar alanlarla süz.** {{SE11}} ile anahtarı öğren, sorguyu ona göre kur.',
      'Satıcı/müşteri bazlı arama için {{BSEG}} değil **{{BSIK}}/{{BSID}}** kullan.',
      '{{BSEG}} ham verisi okurken **`SHKZG`** göstergesini unutma — tutarlar hep pozitiftir.',
      'Belge bulunamıyorsa sırayla: {{FBV3}} (park) → {{SM13}} (güncelleme hatası) → {{BKPF}}.',
      '{{SE16N}}’i **kullanıcıya verme** — yetki zayıf, ham veri yanıltıcı.',
      'Yeni geliştirmede **{{ACDOCA}}** oku; uyumluluk görünümü yavaştır.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Belge başlığı — **her iki mimaride de fiziksel**' },
      { tablo:'ACDOCA', ne:'S/4HANA tek kalem tablosu — FI + CO' },
      { tablo:'BSEG', ne:'ECC kalem tablosu; S/4’te {{uyumluluk-view}}' },
      { tablo:'BSIK', ne:'Satıcı açık kalem indeksi; S/4’te görünüm' },
      { tablo:'BSET', ne:'Vergi satırları — **duruyor**' },
      { tablo:'GLT0', ne:'ECC toplam tablosu; S/4’te **kaldırıldı**' },
    ],

    commit:
      'Bir belge kaydı **tek LUW’da** birden çok tabloya yazar.\n\n' +
      '**ECC’de:** {{BKPF}} + {{BSEG}} + indeksler + toplamlar + {{BSET}} — ' +
      'beş veya daha fazla tablo.\n\n' +
      '**S/4HANA’da:** {{BKPF}} + {{ACDOCA}} + {{BSET}} — üç tablo.\n\n' +
      'Yazma sayısının azalması iki fayda getirdi: ' +
      '**performans** (özellikle toplam tablosundaki kilit çakışmaları kalktı) ve ' +
      '**tutarsızlık ihtimalinin ortadan kalkması**.\n\n' +
      '⚠️ **Asenkron güncelleme:** kullanıcıya numara verildikten sonra ' +
      'yazma arka planda yapılır. Başarısız olursa {{guncelleme-hatasi}} oluşur ' +
      've numara verilmiş olmasına rağmen **belge yoktur**.',

    belgeNo:
      'Belge numarası **mali yıl içinde** benzersizdir — ' +
      '{{BKPF}} anahtarı `BUKRS + BELNR + **GJAHR**` üçlüsüdür.\n\n' +
      'Pratik sonucu: **aynı numara farklı yıllarda tekrar kullanılabilir**. ' +
      'Sorgu yaparken mali yıl belirtilmezse iki kayıt gelir ve ' +
      '"çift kayıt var" sanılır.\n\n' +
      'Numara aralığı durumu {{NRIV}} tablosunda tutulur; ' +
      'boşluklar {{guncelleme-hatasi}} veya silinen park belgelerinden kaynaklanır.',

    postingLogic:
      'Bir belge kaydedildiğinde tablo yazma sırası:\n\n' +
      '**1.** Numara alınır ({{NRIV}} güncellenir).\n' +
      '**2.** {{BKPF}} başlık satırı yazılır.\n' +
      '**3.** Kalemler yazılır: ECC’de {{BSEG}}, S/4’te {{ACDOCA}}.\n' +
      '**4.** Vergi varsa {{BSET}} satırı yazılır.\n' +
      '**5.** ECC’de indeks tabloları güncellenir ({{BSIK}}, {{BSIS}}).\n' +
      '**6.** ECC’de toplam tabloları güncellenir ({{GLT0}}).\n' +
      '**7.** {{degisiklik-belgesi}} gerekiyorsa {{CDHDR}}/{{CDPOS}}.\n\n' +
      'S/4HANA’da **5. ve 6. adımlar yoktur** — indeks ve toplamlar ' +
      'okuma anında türetilir.',

    belgeTuru:
      '{{belge-turu}} {{BKPF}} `BLART` alanında saklanır ve ' +
      'teşhiste **güçlü bir filtredir**.\n\n' +
      'Örnek: vergi hesabında `BLART` = **SA** olan satırları süzmek, ' +
      'elle atılmış kayıtları anında bulur (bkz. {{konu:taxes}}).',

    numberRange:
      '{{NRIV}} numara aralığı durumunu tutar: hangi aralık, hangi seviyede.\n\n' +
      'Boşluk sebepleri: {{guncelleme-hatasi}}, silinen park belgeleri, ' +
      'tampon kullanımı. **Boşluk normaldir** ve düzeltilemez.',

    accountDetermination:
      'Hesap belirleme tabloları **{{T030}} ailesindedir** ve ' +
      'üç modül aynı aileye yazar:\n\n' +
      '{{T030}} genel · **{{T030K}}** vergi ({{OB40}}) · ' +
      'MM tarafı {{OBYC}} · SD tarafı {{VKOA}}\n\n' +
      'Ortak yapı: hesap planı + işlem anahtarı + ek kriterler → G/L hesabı.\n\n' +
      'Teşhiste bu bilinirse *"account determination error"* mesajındaki ' +
      'tablo adı doğrudan yönlendirir.',

    tur:
      '**Özelleştirme tabloları:** {{T001}}, {{T004}}, {{T030}}, {{T007A}} — ' +
      '{{tampon}}lanır, taşıma isteğiyle gelir.\n\n' +
      '**Ana veri tabloları:** {{LFA1}}, {{KNA1}}, {{SKA1}}, {{ANLA}} — ' +
      'taşınmaz, hedef sistemde ayrıca oluşturulur.\n\n' +
      '**Hareket tabloları:** {{BKPF}}, {{ACDOCA}}, {{BSET}} — ' +
      'tamponlanmaz, taşınmaz.',

    transport:
      'Tablo **yapısı** taşınır (geliştirme nesnesi), **içerik** taşınmaz — ' +
      'özelleştirme tabloları hariç.\n\n' +
      '**Geçişte kritik nokta:** özel programların okuduğu tablolar ' +
      'S/4HANA’da görünüme dönüşmüş olabilir. ' +
      'Program çalışmaya devam eder ama **yavaşlar**.\n\n' +
      '**Kontrol:** özel programların envanterini çıkar, ' +
      '{{BSEG}}/{{BSIK}}/{{GLT0}} okuyanları işaretle ve ' +
      '{{ACDOCA}}’ya taşımayı planla.',

    img:[
      { yol:'SE11 → Veri sözlüğü (ABAP Dictionary)', not:'Tablo yapısı, anahtar, ilişkiler' },
      { yol:'SE16N → Genel tablo görüntüleme', not:'İçerik — **kullanıcıya verilmez**' },
      { yol:'SPRO → Finansal Muhasebe → ... → Belge Türleri', not:'{{OBA7}} — BLART tanımı' },
    ],

    ekstra:[
      { ic:'🗂️', baslik:'İndeks ve toplam tabloları neden vardı, neden kalktı?', metin:
        'ECC’nin tablo mimarisi bir **performans çözümüydü** ve mantığı şuydu:\n\n' +
        '{{BSEG}}’in anahtarı `BUKRS + BELNR + GJAHR + BUZEI`’dir — ' +
        '**belge numarasıyla** başlar.\n\n' +
        'Bu, "belge 1900001234’ü göster" sorgusunu çok hızlı yapar. ' +
        'Ama "V-2001 satıcısının açık kalemlerini göster" sorgusu ' +
        '**tüm tabloyu taramayı** gerektirir — çünkü `LIFNR` anahtar değildir.\n\n' +
        '**Çözüm: indeks tabloları.** {{BSIK}}’in anahtarı `LIFNR` ile başlar. ' +
        'Aynı bilgi, farklı sırayla saklanır ve sorgu hızlanır.\n\n' +
        '**Aynı mantık toplam tablolarında:** "770 hesabının Ekim bakiyesi" sorgusu ' +
        'binlerce kalemi toplamayı gerektirirdi. {{GLT0}} bu toplamı **önceden** tutar.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Bedeli neydi?**\n\n' +
        '**1.** Her kayıt **birden çok tabloya** yazılır → yavaş, kilit çakışması.\n' +
        '**2.** Tablolar **tutarsız olabilir** → *"toplam tutmuyor"* klasik sorunu.\n' +
        '**3.** Veri **çoğaltılır** → disk ve bakım maliyeti.\n\n' +
        '**HANA neyi değiştirdi?**\n\n' +
        'Sütun bazlı depolama ve bellek içi işleme sayesinde ' +
        '"tüm tabloyu tara" artık **pahalı değil**. ' +
        'Milyonlarca satırda toplama işlemi saniyeler yerine milisaniyeler sürüyor.\n\n' +
        'Bu yüzden indeks ve toplam tablolarının **varlık sebebi ortadan kalktı**. ' +
        '{{uyumluluk-view}}’a dönüştürüldüler: eski programlar çalışmaya devam ediyor, ' +
        'ama veri **tek yerde** tutuluyor.\n\n' +
        '**Mimari ders:** bir tasarım kararı, onu doğuran kısıt ortadan kalktığında ' +
        'gereksizleşir. İndeks tabloları yanlış değildi — ' +
        'sadece artık gerekmiyorlar.' },

      { ic:'⚠️', baslik:'`SHKZG` — ham veri okumanın en sık tuzağı', metin:
        '{{BSEG}}’den veri çekip toplayan herkes bu tuzağa düşer.\n\n' +
        '**Tutar alanları her zaman pozitiftir.** ' +
        'Bir belgede 120.000 borç ve 120.000 alacak varsa, ' +
        '`DMBTR` alanında **iki kez 120.000** görünür.\n\n' +
        'Doğrudan toplanırsa **240.000** çıkar ve belge dengesiz sanılır.\n\n' +
        '**Yön ayrı bir alandadır: `SHKZG`**\n\n' +
        '**S** = Soll (Almanca "borç")\n' +
        '**H** = Haben (Almanca "alacak")\n\n' +
        'Doğru hesaplama: S olanların toplamı ile H olanların toplamı ' +
        '**ayrı ayrı alınır ve karşılaştırılır**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**{{ACDOCA}}’da bu değişti**\n\n' +
        'Tutarlar **işaretlidir**: borç pozitif, alacak **negatif**. ' +
        'Toplam doğrudan alınabilir ve dengeli bir belgede **sıfır** çıkar.\n\n' +
        'Bu, S/4HANA’nın az konuşulan ama pratikte çok işe yarayan ' +
        'iyileştirmelerinden biridir — özellikle veri analizi ve ' +
        'özel rapor yazımında.\n\n' +
        '**Pratik sonuç:** eski bir sorguyu {{BSEG}}’den {{ACDOCA}}’ya taşırken ' +
        '`SHKZG` mantığı **kaldırılmalıdır**; bırakılırsa işaretler iki kez uygulanır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Mali yıl anahtarın parçasıdır', metin:
        '{{BKPF}} anahtarı `BUKRS + BELNR + **GJAHR**` üçlüsüdür.\n\n' +
        'Pratik sonucu: **aynı belge numarası farklı mali yıllarda tekrar kullanılabilir**. ' +
        'Numara aralıkları yıl bazlı tanımlanmışsa bu normaldir.\n\n' +
        '{{SE16N}}’de mali yıl belirtilmeden arama yapılırsa **iki kayıt** gelir ve ' +
        '"çift kayıt var" sanılır.\n\n' +
        'Aynı şekilde {{FB03}}’te mali yıl sorulmasının sebebi budur — ' +
        'boş bırakılırsa sistem hangi yılı göstereceğini bilemez.\n\n' +
        '**Kural:** belge numarasıyla yapılan her sorguya **mali yıl** eklenmelidir.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Tablo mimarisi, S/4HANA’nın **en çok değiştirdiği** alandır. ' +
      '{{ACDOCA}} tek kalem tablosu oldu; indeks ve toplam tabloları ' +
      '{{uyumluluk-view}}’a dönüştü. Muhasebe mantığı **hiç değişmedi**.',

    eccFarklari:[
      { konu:'FI kalemleri', ecc:'{{BSEG}} fiziksel', s4:'**{{ACDOCA}}** · {{BSEG}} görünüm' },
      { konu:'CO kalemleri', ecc:'COEP — ayrı tablo', s4:'{{ACDOCA}} — **aynı tablo**' },
      { konu:'Açık/kapalı indeks', ecc:'{{BSIK}}/{{BSAK}} fiziksel, kayıt **taşınır**', s4:'Görünüm — taşıma **yok**' },
      { konu:'Toplamlar', ecc:'{{GLT0}}, FAGLFLEXT', s4:'**Kaldırıldı** — anlık hesaplanır' },
      { konu:'Tutar işareti', ecc:'`SHKZG` ayrı alanda', s4:'**İşaretli tutar** — alacak negatif' },
      { konu:'Bir belgede yazılan tablo', ecc:'5+', s4:'**3** (BKPF, ACDOCA, BSET)' },
      { konu:'Vergi', ecc:'{{BSET}}', s4:'**{{BSET}} duruyor** — beyan buna dayanır' },
      { konu:'Tutarsızlık riski', ecc:'Var', s4:'**Yapısal olarak imkânsız**' },
    ],

    universalJournal:
      '{{ACDOCA}}’nın tablo mimarisi açısından üç sonucu vardır:\n\n' +
      '**1. Veri çoğaltma bitti.** ECC’de aynı bilgi {{BSEG}}, {{BSIK}}, {{GLT0}} ve ' +
      'COEP’te tekrarlanıyordu. Şimdi **tek yerde**.\n\n' +
      '**2. Tutarsızlık imkânsızlaştı.** Toplam ile kalem farklı tablolarda olmadığı için ' +
      '*"toplam tutmuyor"* sorunu **oluşamaz**.\n\n' +
      '**3. Boyutlar birleşti.** Hesap, maliyet yeri, kâr merkezi, segment ve defter ' +
      '**aynı satırda**. ECC’de birleştirme (join) gerektiren sorgular ' +
      'tek tabloda çalışıyor.\n\n' +
      'Dördüncü, daha az konuşulan sonuç: **tutarlar artık işaretli**. ' +
      '`SHKZG` mantığı gerekmiyor.',

    kalkanTcodes:[
      { eski:'{{GLT0}} tabanlı raporlar', yeni:'{{ACDOCA}} tabanlı', not:'Toplam tablosu kalktı' },
      { eski:'COEP okuyan CO raporları', yeni:'{{ACDOCA}}', not:'FI–CO birleşti' },
      { eski:'—', yeni:'—', not:'{{SE16N}}, {{SE11}}, {{FB03}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'Belge arama ve inceleme — {{FB03}} karşılığı.' },
      { ad:'Display Line Items in General Ledger', aciklama:'{{ACDOCA}} üzerinden kalem dökümü.' },
      { ad:'Custom Analytical Queries', aciklama:'{{cds-view}} üzerine kullanıcının kendi sorgusunu kurması — ' +
             'tablo bilgisi olmadan raporlama.' },
      { ad:'View Browser', aciklama:'Mevcut {{cds-view}}’leri arama — ' +
             'yeni geliştirme öncesi "hazır var mı?" kontrolü.' },
    ],

    compatibilityViews:[
      '{{BSEG}}, {{BSIK}}, {{BSAK}}, {{BSID}}, {{BSAD}}, {{BSIS}}, {{BSAS}}, {{GLT0}} — ' +
      'hepsi **{{ACDOCA}}’dan türetilen görünümler**.',
      'Eski programlar **değiştirilmeden çalışır** — geçişin en büyük kolaylığı budur.',
      '⚠️ **Ama yavaştır.** Yeni geliştirmeler ve performans sorunu yaşayan ' +
      'eski programlar {{ACDOCA}}’yı doğrudan okumalıdır.',
      '{{BKPF}} ve {{BSET}} **gerçek tablo olarak duruyor** — görünüm değil.',
    ],

    performans:
      'İki kaynaktan kazanç geldi:\n\n' +
      '**1. Yazma azaldı.** Bir belge 5+ tablo yerine 3 tabloya yazılıyor. ' +
      'Özellikle toplam tablosundaki **kilit çakışmaları** ortadan kalktı — ' +
      'yoğun kayıt yapılan sistemlerde belirgin fark.\n\n' +
      '**2. Okuma hızlandı.** Sütun bazlı depolama sayesinde ' +
      'büyük tablolarda toplama ve süzme işlemleri çok hızlı. ' +
      'İndeks tablolarına gerek kalmamasının sebebi budur.\n\n' +
      '⚠️ **Uyumluluk görünümleri bu kazancı azaltır.** ' +
      'Eski program {{BSIK}}’i sorguladığında sistem bunu {{ACDOCA}} üzerinden ' +
      '**türetir** — ek iş yükü demektir.',

    bestPractices:[
      'Özel programların **envanterini çıkar**; {{BSEG}}/{{BSIK}}/{{GLT0}} okuyanları işaretle.',
      'Yeni geliştirmelerde **{{ACDOCA}}** veya standart {{cds-view}} kullan.',
      'Sorguyu {{BSEG}}’den {{ACDOCA}}’ya taşırken **`SHKZG` mantığını kaldır** — ' +
      'tutarlar artık işaretli.',
      'Toplam tablosu okuyan programları **kaldır**; artık gereksizler.',
      'Yeni rapor ihtiyacında önce **View Browser** ile hazır CDS view ara.',
      'Geçiş, veri modeli sadeleşmesini **belgelemek** için iyi bir fırsattır — ' +
      'hangi tablonun ne olduğu ekip tarafından bilinmelidir.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Belge numarası var, belge yok: üç ihtimalin elenmesi',
    hikaye:
      '**Kuzey Kimya A.Ş.**’de muhasebe elemanı şikâyet ediyor: ' +
      '*"Dün üç fatura kaydettim, belge numaralarını not aldım. ' +
      'Bugün {{FB03}} ile bakıyorum, ikisi var biri yok."*\n\n' +
      'Kayıp belge: **1900004521**.\n\n' +
      'Ekran hiçbir şey söylemiyor — sadece *"Belge bulunamadı"*. ' +
      'Bu senaryo, tablo bilgisiyle yapılan sistematik bir teşhisi gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · mali yıl 2027' },
      { k:'Kayıp belge', v:'**1900004521**' },
      { k:'Komşu numaralar', v:'1900004520 ✓ · 1900004522 ✓ — ikisi de var' },
      { k:'Belirti', v:'Numara verilmiş, belge yok' },
    ],

    adimlar:[
      { baslik:'İhtimal 1 elenir — yanlış mali yıl mı?', tcode:'SE16N',
        aciklama:'{{BKPF}} anahtarı üçlüdür; mali yıl atlanmış olabilir.',
        girdi:[
          { alan:'Tablo', deger:'{{BKPF}}' },
          { alan:'Seçim', deger:'`BUKRS` = 1000 · `BELNR` = 1900004521 · `GJAHR` = **boş**' },
          { alan:'Sonuç', deger:'**0 kayıt** — hiçbir yılda yok' },
          { alan:'Çıkarım', deger:'Mali yıl sorunu **değil**' },
        ],
        not:'İlk kontrol bu olmalıdır çünkü **aynı numara farklı yıllarda** ' +
             'tekrar kullanılabilir — `GJAHR` anahtarın parçasıdır.\n\n' +
             'Mali yıl boş bırakılarak arandı ve hiçbir yılda bulunamadı. ' +
             'Bu ihtimal elendi.' },

      { baslik:'İhtimal 2 elenir — belge park mı edilmiş?', tcode:'SE16N',
        aciklama:'Park edilmiş belgeler {{BKPF}}’de değil {{VBKPF}}’te durur.',
        girdi:[
          { alan:'Tablo', deger:'{{VBKPF}}' },
          { alan:'Seçim', deger:'`BELNR` = 1900004521' },
          { alan:'Sonuç', deger:'**0 kayıt**' },
          { alan:'Çıkarım', deger:'Park edilmemiş' },
        ],
        not:'Bu, en sık sebeptir: {{FB03}} yalnızca {{BKPF}}’ye bakar; ' +
             'park edilmiş belge {{FBV3}} ile görüntülenir.\n\n' +
             'Ama burada kayıt yok — demek ki belge park da edilmemiş.\n\n' +
             'Geriye tek ihtimal kalıyor.' },

      { baslik:'İhtimal 3 doğrulanır — güncelleme hatası', tcode:'SM13',
        aciklama:'Asenkron güncellemenin başarısız olup olmadığı kontrol ediliyor.',
        girdi:[
          { alan:'Tarih', deger:'Dün · kullanıcı MUHASEBE04' },
          { alan:'Durum', deger:'**Err** (hatalı)' },
          { alan:'Bulunan kayıt', deger:'**1 adet** — saat 16:42' },
          { alan:'Hata', deger:'*"Table space full"* — o an disk dolmuş' },
        ],
        not:'**Kök sebep bulundu: {{guncelleme-hatasi}}.**\n\n' +
             'SAP kaydı iki aşamada yapar: kullanıcıya **numara verilir** ve ekran serbest bırakılır; ' +
             'asıl veritabanı yazımı **arka planda** yapılır.\n\n' +
             'Kullanıcı numarayı görmüş ama arka plandaki yazım başarısız olmuş. ' +
             'Numara harcanmış, belge oluşmamış.\n\n' +
             'Bu yüzden kullanıcı "kaydettim" diyor ve haklı — ' +
             'ekranda gerçekten numara görmüştü.' },

      { baslik:'Güncelleme yeniden çalıştırılabilir mi?', tcode:'SM13',
        aciklama:'Hata detayı inceleniyor.',
        girdi:[
          { alan:'Hata tipi', deger:'Geçici kaynak sorunu (disk)' },
          { alan:'Disk durumu', deger:'Gece temizlik yapılmış, **şu an sorun yok**' },
          { alan:'Karar', deger:'Güncelleme **yeniden çalıştırılabilir**' },
          { alan:'Sonuç', deger:'Belge 1900004521 **oluştu** ✓' },
        ],
        fis:{ baslik:'Belge 1900004521 — yeniden çalıştırma sonrası', belgeTuru:'KR', tarih:'15.11.2027',
          satirlar:[
            { hesap:'770', ad:'Genel yönetim gideri', borc:45000 },
            { hesap:'191', ad:'İndirilecek KDV', borc:9000 },
            { hesap:'320', ad:'Satıcılar', alacak:54000 },
          ], not:'Belge orijinal numarasıyla ve **orijinal kayıt tarihiyle** oluştu.\n\n' +
                 'Güncelleme kaydı tüm veriyi sakladığı için ' +
                 'yeniden girme gerekmedi.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'Başlık satırı **oluştu**' },
          { tablo:'BSEG', ne:'3 kalem yazıldı' },
          { tablo:'BSET', ne:'Vergi satırı yazıldı' },
          { tablo:'BSIK', ne:'Satıcı açık kalemi oluştu' },
        ],
        not:'⚠️ **Her güncelleme hatası yeniden çalıştırılamaz.** ' +
             'Geçici kaynak sorunlarında (disk, bellek, kilit) genelde çalışır. ' +
             'Veri hatası veya program hatası varsa kayıt **yeniden girilmelidir**.\n\n' +
             'Karar {{SM13}}’teki hata detayına bakılarak verilir.' },

      { baslik:'İkinci bulgu — aynı gün başka hatalar var mı?', tcode:'SM13',
        aciklama:'Sorun tekil mi yaygın mı diye kontrol ediliyor.',
        girdi:[
          { alan:'Tarih aralığı', deger:'Son 7 gün · tüm kullanıcılar' },
          { alan:'Hatalı güncelleme', deger:'**14 kayıt**' },
          { alan:'Dağılım', deger:'11’i aynı saat aralığında (16:30–17:00)' },
          { alan:'Sebep', deger:'Aynı disk sorunu — **toplu etkilenme**' },
        ],
        not:'**Tek belge sorunu değilmiş.** 14 kayıt aynı sebeple başarısız olmuş ve ' +
             'hiçbiri fark edilmemiş.\n\n' +
             'Kullanıcılar numara aldıkları için "kaydettim" sanmış; ' +
             'belgeler oluşmadığı için mizanda **eksik**.\n\n' +
             'Bu, {{guncelleme-hatasi}}’nın neden tehlikeli olduğunu gösteriyor: ' +
             '**kimse hata görmez**, yalnızca veri eksik kalır.' },

      { baslik:'Kalıcı önlem — günlük kontrol', tcode:'SM13',
        aciklama:'Fark edilmeyen güncelleme hatalarını yakalamak için rutin kuruluyor.',
        girdi:[
          { alan:'Önlem 1', deger:'{{SM13}} **günlük** kontrol — Basis ekibinin rutinine eklendi' },
          { alan:'Önlem 2', deger:'Hatalı güncelleme varsa **muhasebeye bildirim**' },
          { alan:'Önlem 3', deger:'Ay sonu: numara aralığı boşlukları {{NRIV}} ile kontrol' },
          { alan:'Önlem 4', deger:'Kullanıcı eğitimi: "numara aldım = kaydoldu" **doğru değil**' },
        ],
        not:'**Dördüncü önlem kavramsal ama önemli:** kullanıcılar ' +
             'belge numarası görmeyi "kayıt tamamlandı" sanıyor.\n\n' +
             'Doğrusu: numara **rezerve edildi**, asıl yazma arka planda yapılıyor. ' +
             'Kritik kayıtlarda {{FB03}} ile doğrulama alışkanlığı kazandırılmalı.\n\n' +
             'Birinci önlem ({{SM13}} günlük kontrol) bu hata sınıfının ' +
             '**tek sistemsel erken uyarısıdır**.' },
    ],

    sonuc:
      '**Bir belge kayboldu sanıldı; aslında 14 belge eksikti ve kimse fark etmemişti.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. "Belge bulunamıyor" üç ihtimal demektir ve sırayla elenir.** ' +
      '**(a)** Yanlış mali yıl — `GJAHR` {{BKPF}} anahtarının parçasıdır, ' +
      'aynı numara farklı yıllarda olabilir. ' +
      '**(b)** Belge **park edilmiş** — {{VBKPF}}’tedir, {{FBV3}} ile görüntülenir; ' +
      '{{FB03}} yalnızca {{BKPF}}’ye bakar. ' +
      '**(c)** **{{guncelleme-hatasi}}** — {{SM13}}’te görünür.\n\n' +
      '**2. Belge numarası almak, kaydın tamamlandığı anlamına gelmez.** ' +
      'SAP numarayı verip ekranı serbest bırakır; asıl yazma **asenkron** yapılır. ' +
      'Başarısız olursa numara harcanır, belge oluşmaz ve ' +
      '**kullanıcı hata görmez**.\n\n' +
      '**3. Güncelleme hataları sessizdir ve toplu olabilir.** ' +
      'Bu vakada 14 kayıt aynı sebeple başarısız olmuş, hiçbiri fark edilmemişti. ' +
      'Mizan eksikti ama kimse aramadı. ' +
      '**{{SM13}} günlük kontrolü** bu hata sınıfının tek sistemsel erken uyarısıdır.\n\n' +
      '**4. Teşhis tablo bilgisi gerektirir.** ' +
      'Ekran yalnızca *"belge bulunamadı"* diyor. ' +
      'Hangi tabloya bakılacağını bilmeden — {{BKPF}}, {{VBKPF}}, {{SM13}} — ' +
      'bu üç ihtimal ayrıştırılamaz ve kullanıcıya ' +
      '*"sistem çalışmıyor"* demekten öteye gidilemez. ' +
      '**Tablo bilgisinin pratik değeri tam olarak budur.**',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'FI belgesi **başlık–kalem** çiftidir: {{BKPF}} + {{BSEG}} (ECC) / {{ACDOCA}} (S/4).',
      '{{BKPF}} anahtarı **üçlüdür**: `BUKRS + BELNR + **GJAHR**` — mali yıl anahtarın parçası.',
      '**İndeks tabloları** ({{BSIK}}/{{BSAK}}) performans için vardı; kapatmada kayıt **taşınırdı**.',
      '**Toplam tabloları** ({{GLT0}}) S/4HANA’da **kaldırıldı** — toplamlar anlık hesaplanır.',
      '{{BSEG}}’de tutarlar **hep pozitiftir**; yön **`SHKZG`** alanındadır (S borç / H alacak).',
      '{{ACDOCA}}’da tutarlar **işaretlidir** — alacak negatif, toplam doğrudan alınır.',
      'S/4HANA’da bir belge **3 tabloya** yazar (ECC’de 5+): {{BKPF}}, {{ACDOCA}}, {{BSET}}.',
      '{{BSET}} **duruyor** — KDV beyanı hâlâ buradan üretilir.',
    ],

    onemliNoktalar:[
      '**"{{BSIK}} ve {{BSAK}} neden ayrı?"** {{BSIK}} **açık**, {{BSAK}} **kapatılmış** satıcı kalemlerini tutar; kapatmada kayıt **taşınır**. Sebep performanstı — açık kalem sorgusu küçük tabloda çalışsın diye. S/4HANA’da ikisi de {{uyumluluk-view}}.',
      '**"Belge numarası var ama belge yok. Ne olabilir?"** Üç ihtimal: **(a)** yanlış mali yıl (`GJAHR` anahtarın parçası), **(b)** belge **park edilmiş** ({{VBKPF}}, {{FBV3}}), **(c)** **{{guncelleme-hatasi}}** ({{SM13}}).',
      '**"{{BSEG}} tutarlarını topladım, denge tutmadı. Neden?"** Tutarlar **her zaman pozitiftir**; yön **`SHKZG`** alanındadır: **S** = borç (Soll), **H** = alacak (Haben). Ayrı toplanıp karşılaştırılır. {{ACDOCA}}’da tutarlar işaretlidir, bu sorun yoktur.',
      '**"İndeks tabloları neden kalktı?"** Varlık sebepleri **performanstı**: {{BSEG}} anahtarı belge numarasıyla başladığı için satıcı bazlı sorgu tüm tabloyu tarardı. HANA’da "tüm tabloyu tara" artık pahalı değil → **gerekçe ortadan kalktı**.',
      '**"Hangi tablolar S/4HANA’da duruyor?"** **{{BKPF}}** ve **{{BSET}}** gerçek tablo olarak duruyor. {{BSEG}}, {{BSIK}}, {{BSAK}}, {{GLT0}} → {{uyumluluk-view}}. COEP → {{ACDOCA}}’ya taşındı.',
      '**"Neden {{SE16N}} kullanıcıya verilmez?"** İki sebep: **yetki kontrolü zayıftır** (görmemesi gereken veriyi görebilir) ve **ham veri yanıltıcıdır** (çözülmemiş kodlar, `SHKZG` işareti, çevrilmemiş para birimi).',
      '**"Aynı belge numarası iki kez görünüyor."** **Normaldir** — farklı mali yıllarda aynı numara kullanılabilir. Sorguya `GJAHR` eklenmelidir.',
      '**"Eski özel raporum S/4HANA’da yavaşladı."** {{uyumluluk-view}} üzerinden okuyordur; sistem sorguyu {{ACDOCA}}’dan **türetir**. Çözüm: programı {{ACDOCA}}’yı doğrudan okuyacak şekilde güncellemek.',
    ],

    sikHatalar:[
      { hata:'{{BSEG}} tutarlarını `SHKZG` dikkate almadan toplamak.', dogru:'Tutarlar **hep pozitiftir**; S ve H ayrı toplanıp karşılaştırılır.' },
      { hata:'Belge numarasıyla sorgularken mali yıl vermemek.', dogru:'`GJAHR` **anahtarın parçasıdır**; farklı yıllarda aynı numara olabilir.' },
      { hata:'"Belge bulunamıyor" deyince hemen hata aramak.', dogru:'Önce üç ihtimal elenir: mali yıl → park ({{VBKPF}}) → güncelleme hatası ({{SM13}}).' },
      { hata:'Satıcı bazlı sorguyu {{BSEG}} üzerinden yapmak.', dogru:'`LIFNR` {{BSEG}}’de anahtar **değildir** → çok yavaş. {{BSIK}}/{{BSAK}} kullanılır.' },
      { hata:'{{SE16N}}’i kullanıcıya rapor aracı olarak vermek.', dogru:'Teşhis aracıdır; yetki zayıf, ham veri yanıltıcı. Kullanıcıya **doğru rapor + düzen** verilir.' },
      { hata:'Yeni geliştirmede {{BSEG}} okumak.', dogru:'S/4HANA’da {{uyumluluk-view}}’dır ve **yavaştır**. {{ACDOCA}} doğrudan okunmalıdır.' },
      { hata:'Sorguyu {{ACDOCA}}’ya taşırken `SHKZG` mantığını bırakmak.', dogru:'{{ACDOCA}}’da tutarlar **zaten işaretlidir**; bırakılırsa işaret iki kez uygulanır.' },
      { hata:'Numara aralığındaki boşluğu hata sanmak.', dogru:'**Normaldir** — güncelleme hatası, silinen park belgesi veya tampon kaynaklıdır; düzeltilemez.' },
    ],

    ipuclari:[
      '**Anahtar alanlarla süz.** {{SE11}} ile anahtarı öğren; performans sorusunun cevabı orada.',
      'Teşhis sorguları hazır tut: {{VBRK}} `RFBSK` · {{SKB1}} `XKRES` · {{VBKPF}} · {{T030K}}.',
      '"Belge yok" teşhis sırası: **mali yıl → park → güncelleme hatası**.',
      '{{SM13}}’i **günlük** kontrol listesine koy — güncelleme hataları sessizdir ve toplu olabilir.',
      'Geçişte özel programların **envanterini çıkar**; {{BSEG}}/{{BSIK}}/{{GLT0}} okuyanları işaretle.',
      'Yeni rapor ihtiyacında önce **hazır {{cds-view}} var mı** diye bak.',
    ],

    quiz:[
      { soru:'{{BSIK}} ile {{BSAK}} arasındaki fark nedir?',
        secenekler:[
          'Biri satıcı, diğeri müşteri kalemleri',
          '**Biri açık, diğeri kapatılmış satıcı kalemleri — kapatmada kayıt taşınır**',
          'Biri ECC, diğeri S/4HANA tablosu',
          'Biri başlık, diğeri kalem',
        ], dogru:1,
        aciklama:'{{BSIK}} **açık**, {{BSAK}} **kapatılmış** satıcı kalemlerini tutar. ' +
                 'Ödeme yapıldığında kayıt birinden diğerine **taşınır**.\n\n' +
                 'Sebep performanstı: "bu satıcının açık kalemleri" sorgusu ' +
                 'yalnızca açıkları tutan küçük tabloda çalışsın diye.\n\n' +
                 'S/4HANA’da ikisi de {{uyumluluk-view}}; taşıma diye bir şey yok.' },

      { soru:'{{BSEG}}’den çektiğin tutarları topladın, belge dengesiz çıktı. Sebep?',
        secenekler:[
          'Belge gerçekten dengesiz',
          'Para birimi çevrimi eksik',
          '**Tutarlar hep pozitif; yön `SHKZG` alanında (S borç / H alacak)**',
          'Vergi satırı eksik',
        ], dogru:2,
        aciklama:'{{BSEG}}’de `DMBTR` ve `WRBTR` **her zaman pozitiftir**. ' +
                 'Bir belgede 120.000 borç + 120.000 alacak varsa toplam **240.000** çıkar.\n\n' +
                 'Yön **`SHKZG`** alanındadır: **S** = Soll (borç), **H** = Haben (alacak). ' +
                 'S ve H ayrı toplanıp karşılaştırılır.\n\n' +
                 '{{ACDOCA}}’da tutarlar **işaretlidir** (alacak negatif) — bu sorun yoktur.' },

      { soru:'Kullanıcı belge numarası aldı ama {{FB03}} belgeyi bulamıyor. Hangi sırayla kontrol edilir?',
        secenekler:[
          'Yetki → dönem → hesap',
          '**Mali yıl → park edilmiş mi ({{VBKPF}}) → güncelleme hatası ({{SM13}})**',
          'Numara aralığı → belge türü → şirket kodu',
          'Doğrudan yeniden kaydedilir',
        ], dogru:1,
        aciklama:'**(a)** `GJAHR` {{BKPF}} anahtarının parçasıdır — mali yıl atlanmış olabilir.\n' +
                 '**(b)** {{FB03}} yalnızca {{BKPF}}’ye bakar; **park edilmiş** belge ' +
                 '{{VBKPF}}’tedir ve {{FBV3}} ile görüntülenir.\n' +
                 '**(c)** {{guncelleme-hatasi}} — numara verilmiş ama asenkron yazma ' +
                 'başarısız olmuştur; {{SM13}}’te görünür.\n\n' +
                 'Üçü elenmeden "sistem hatası" denemez.' },

      { soru:'İndeks ve toplam tabloları S/4HANA’da neden kaldırıldı?',
        secenekler:[
          'Yer kapladıkları için',
          'SAP basitleştirmek istediği için',
          '**HANA’da "tüm tabloyu tara" artık pahalı değil — varlık sebepleri ortadan kalktı**',
          'Muhasebe kuralları değiştiği için',
        ], dogru:2,
        aciklama:'İndeks tabloları bir **performans çözümüydü**: {{BSEG}} anahtarı ' +
                 'belge numarasıyla başladığı için satıcı bazlı sorgu tüm tabloyu tarardı.\n\n' +
                 'HANA’nın sütun bazlı depolaması ve bellek içi işlemesi sayesinde ' +
                 'bu tarama artık **milisaniyeler** sürüyor.\n\n' +
                 '**Mimari ders:** bir tasarım kararı, onu doğuran kısıt ortadan kalktığında ' +
                 'gereksizleşir. İndeks tabloları yanlış değildi — artık gerekmiyorlar.' },

      { soru:'S/4HANA’da bir satıcı faturası hangi tablolara **fiziksel olarak** yazar?',
        secenekler:[
          '{{BKPF}}, {{BSEG}}, {{BSIK}}, {{GLT0}}, {{BSET}}',
          '**{{BKPF}}, {{ACDOCA}}, {{BSET}}**',
          'Yalnızca {{ACDOCA}}',
          '{{BKPF}} ve {{BSEG}}',
        ], dogru:1,
        aciklama:'S/4HANA’da **üç tablo** yazılır: {{BKPF}} (başlık), {{ACDOCA}} (kalemler) ' +
                 've {{BSET}} (vergi — beyan buna dayandığı için **duruyor**).\n\n' +
                 '{{BSEG}}, {{BSIK}}, {{GLT0}} artık **{{uyumluluk-view}}**; ' +
                 'sorgulandıklarında {{ACDOCA}}’dan türetilirler.\n\n' +
                 'ECC’de aynı kayıt 5+ tabloya yazılıyordu.' },

      { soru:'Aynı belge numarası iki kez görünüyor. Ne anlama gelir?',
        secenekler:[
          'Çift kayıt yapılmış',
          'Güncelleme hatası',
          '**Farklı mali yıllarda aynı numara — normaldir**',
          'Numara aralığı bozulmuş',
        ], dogru:2,
        aciklama:'{{BKPF}} anahtarı `BUKRS + BELNR + **GJAHR**` üçlüsüdür. ' +
                 'Belge numarası **mali yıl içinde** benzersizdir.\n\n' +
                 'Numara aralıkları yıl bazlı tanımlanmışsa aynı numaranın ' +
                 'farklı yıllarda tekrarlanması **beklenen davranıştır**.\n\n' +
                 'Sorguya `GJAHR` eklenmelidir; {{FB03}}’ün mali yıl sormasının sebebi budur.' },

      { soru:'Neden {{SE16N}} son kullanıcıya verilmemelidir?',
        secenekler:[
          'Çok yavaş çalıştığı için',
          'Lisans gerektirdiği için',
          '**Yetki kontrolü zayıftır ve ham veri yanıltıcıdır**',
          'Veriyi değiştirebildiği için',
        ], dogru:2,
        aciklama:'**1. Yetki:** normal raporlarda şirket kodu/hesap bazlı kontrol çalışır; ' +
                 'tablo görüntülemede bu **çok daha gevşektir**.\n\n' +
                 '**2. Ham veri:** kodlar çözülmemiştir, tutarlar `SHKZG` ile ters işaretli olabilir, ' +
                 'para birimi çevrilmemiştir. Kullanıcı bu farkı bilmediği için ' +
                 '**yanlış sonuç çıkarır** ve "sistem yanlış" der.\n\n' +
                 'Kullanıcıya verilmesi gereken **doğru rapor + kayıtlı düzendir**.' },

      { soru:'Bir sorguyu {{BSEG}}’den {{ACDOCA}}’ya taşırken neye dikkat edilmelidir?',
        secenekler:[
          'Anahtar alanları aynı bırakmak',
          '**`SHKZG` mantığını kaldırmak — {{ACDOCA}}’da tutarlar zaten işaretli**',
          'Mali yılı eklemek',
          'Değişiklik gerekmez',
        ], dogru:1,
        aciklama:'{{BSEG}}’de tutarlar **pozitiftir** ve yön `SHKZG` alanındadır; ' +
                 'sorgular genelde bu alana göre işaret uygular.\n\n' +
                 '{{ACDOCA}}’da tutarlar **zaten işaretlidir** (alacak negatif). ' +
                 'Eski `SHKZG` mantığı bırakılırsa **işaret iki kez uygulanır** ve ' +
                 'alacak kalemleri pozitif çıkar.\n\n' +
                 'S/4HANA’nın az konuşulan ama pratikte önemli bir değişikliğidir.' },
    ],

    flashcards:[
      { on:'FI belgesi hangi tablolarda durur?', arka:'**Başlık–kalem çifti:**\n\n**ECC:** BKPF + **BSEG**\n**S/4:** BKPF + **ACDOCA**\n\nBağlantı: `BUKRS + BELNR + GJAHR`\n\nAynı desen: VBRK/VBRP (SD) · RBKP/RSEG (MM) · VBKPF/VBSEG (park)' },
      { on:'BKPF anahtarı nedir ve neden önemli?', arka:'**`BUKRS + BELNR + GJAHR`** — üçlü.\n\n⚠️ **Mali yıl anahtarın parçası** → aynı numara farklı yıllarda **tekrar kullanılabilir**.\n\nSorguya GJAHR eklenmezse iki kayıt gelir ve "çift kayıt" sanılır.' },
      { on:'BSIK vs BSAK', arka:'**BSIK** — satıcı **AÇIK** kalemleri\n**BSAK** — satıcı **KAPATILMIŞ** kalemleri\n\nKapatmada kayıt **taşınır**.\n\nMüşteri: BSID/BSAD · G/L: BSIS/BSAS\n\nS/4’te ikisi de **uyumluluk görünümü**.' },
      { on:'BSEG’de tutarlar neden hep pozitif?', arka:'Yön ayrı alanda: **`SHKZG`**\n\n**S** = Soll (borç)\n**H** = Haben (alacak)\n\n⚠️ Doğrudan toplarsan 120.000+120.000 = 240.000 → "dengesiz" sanırsın.\n\n**ACDOCA’da tutarlar İŞARETLİ** — alacak negatif.' },
      { on:'Belge numarası var, belge yok — üç ihtimal', arka:'**1. Yanlış mali yıl** (GJAHR anahtarın parçası)\n**2. Belge PARK edilmiş** → VBKPF · FBV3\n**3. GÜNCELLEME HATASI** → SM13\n\nFB03 yalnızca **BKPF**’ye bakar, bu ayrımı kendisi yapamaz.' },
      { on:'Güncelleme hatası nedir?', arka:'Numara verildikten **sonra** asenkron yazmanın başarısız olması.\n\n→ Numara var, **belge yok**\n→ Kullanıcı **hata görmez**\n→ SM13’te görünür\n\n⚠️ Toplu olabilir; **SM13 günlük kontrol** tek erken uyarı.' },
      { on:'İndeks/toplam tabloları neden vardı?', arka:'**Performans.** BSEG anahtarı **belge numarasıyla** başlar → satıcı bazlı sorgu tüm tabloyu tarardı.\n\nBSIK anahtarı **LIFNR** ile başlar → hızlı.\nGLT0 toplamı **önceden** tutar.\n\n**Bedeli:** çok yazma + tutarsızlık riski.' },
      { on:'S/4HANA’da neden kalktılar?', arka:'**HANA’da "tüm tabloyu tara" artık pahalı değil.**\n\nSütun bazlı depolama + bellek içi işleme → milisaniyeler.\n\n→ Varlık sebepleri **ortadan kalktı** → uyumluluk görünümüne dönüştüler.\n\n*Ders: kısıt kalkınca çözüm gereksizleşir.*' },
      { on:'S/4HANA’da bir belge kaç tabloya yazar?', arka:'**Üç:** BKPF · **ACDOCA** · BSET\n\n*(ECC’de 5+: BKPF, BSEG, BSIK, GLT0, BSET)*\n\n**BSET duruyor** — KDV beyanı hâlâ buna dayanır.\n\nBSEG/BSIK/GLT0 → **uyumluluk görünümü**' },
      { on:'SE16N neden kullanıcıya verilmez?', arka:'**1. Yetki kontrolü zayıf** → görmemesi gereken veriyi görür\n\n**2. Ham veri yanıltıcı** → kodlar çözülmemiş, SHKZG işareti, para birimi çevrilmemiş\n\n→ Kullanıcı **yanlış sonuç** çıkarır.\n\nKullanıcıya: **doğru rapor + kayıtlı düzen**.' },
      { on:'BSEG → ACDOCA sorgu taşırken?', arka:'**`SHKZG` mantığını KALDIR.**\n\nBSEG: tutar pozitif + yön ayrı alanda\nACDOCA: tutar **zaten işaretli** (alacak negatif)\n\nBırakılırsa **işaret iki kez uygulanır** → alacaklar pozitif çıkar.' },
      { on:'Teşhis için hazır tablo sorguları', arka:'**VBRK** `RFBSK`=A → SD faturası düşmedi\n**SKB1** `XKRES` → kalem yönetimi açık mı\n**VBKPF** → belge park mı edilmiş\n**T030K** → vergi hesabı tanımlı mı\n**CDPOS** → banka hesabı ne zaman değişti' },
    ],
  },

  },
});
