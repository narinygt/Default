/* ==========================================================================
   content/fi/s4-yenilikleri.js — "S/4HANA Yenilikleri"

   Ana tez: S/4HANA'daki değişikliklerin neredeyse tamamı TEK BİR CÜMLENİN
   sonucudur — "toplamı saklamak yerine her seferinde yeniden hesapla."
   Yani çoğu yenilik, yeni bir özellik değil; GEREKSİZLEŞEN bir çözümün
   kaldırılmasıdır.
   ========================================================================== */

SAP.registerTopic({
  id: 's4-yenilikleri',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'S/4HANA, SAP’ın {{bellek-ici}} veritabanı üzerinde çalışan yeni nesil ERP’sidir.\n\n' +
      'Bu tanım doğrudur ve **hiçbir şey açıklamaz**. Yeniliklerin listesi de ' +
      'açıklamaz: {{ACDOCA}} geldi, {{is-ortagi}} zorunlu oldu, ' +
      'bazı işlem kodları kalktı, {{fiori}} çıktı… ' +
      'Bunlar birbirinden bağımsız değişiklikler gibi görünür.\n\n' +
      'Değildir.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Bu konunun tezi:**\n\n' +
      '**Değişikliklerin neredeyse tamamı tek bir cümlenin sonucudur:**\n\n' +
      '**"Toplamı saklamak yerine, her seferinde yeniden hesapla."**\n\n' +
      'Eski SAP tasarımındaki pek çok yapı, tek bir kısıtı aşmak için vardı: ' +
      '**diskten okumak pahalıdır.** Bu yüzden bakiyeler önceden hesaplanıp ' +
      '{{toplam-tablosu}}larına yazılırdı ({{GLT0}}, {{FAGLFLEXT}}, ' +
      '{{KNC1}}, {{LFC1}}); açık kalemler farklı anahtarla ikinci kez ' +
      'kopyalanırdı ({{BSIK}}, {{BSID}}, {{BSIS}}).\n\n' +
      'Bellek içi veritabanında bu kısıt kalktı. Kısıt kalkınca ' +
      '**çözüm gereksizleşti**.\n\n' +
      '⭐ **Sonuç:** S/4HANA’daki basitleştirmelerin çoğu yeni bir özellik ' +
      'değil, **artık gereksiz olan bir çözümün kaldırılmasıdır.**',

    neden:
      '**Yer kazancı.** Toplam ve indeks tabloları veritabanının büyük ' +
      'kısmını kaplıyordu. Kaldırıldılar.\n\n' +
      '⭐ **Asıl kazanç: tutarlılık.** Saklanan bir toplam, kalemlerle ' +
      '**ayrışabilir** — güncelleme yarıda kalırsa mizan ile döküm tutmaz. ' +
      'Hesaplanan bir toplam ayrışamaz. Mutabakat programlarının bir kısmı ' +
      'bu yüzden **gereksizleşti**.\n\n' +
      '**Tek satır kaynağı.** FI, CO, varlık ve malzeme değerleri ' +
      '{{ACDOCA}}’da buluştu; FI–CO ayrışması **yapısal olarak imkânsız** hâle geldi.\n\n' +
      '**Gerçek zamanlı raporlama.** Toplamlar hesaplandığı için ' +
      'gecelik toplu işlere gerek kalmadı ({{gomulu-analitik}}).\n\n' +
      '**Boyut zenginliği.** {{ACDOCA}} her satırda tüm boyutları taşır: ' +
      'defter, kâr merkezi, segment, fonksiyonel alan ve sekize kadar para birimi.',

    sirketOnemi:
      'Şirket açısından S/4HANA bir **yazılım yükseltmesi değil**, ' +
      'raporlama yeteneğinin değişmesidir.\n\n' +
      'Somut örnek: ECC’de *"geçen çarşamba itibarıyla satıcı yaşlandırması"* ' +
      'sorusu, o günün toplam tablosu saklanmadığı için ' +
      '**pratikte cevaplanamazdı**. S/4HANA’da kalemlerden hesaplanır.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⚠️ **Ama en yaygın yanılgı da tam burada:**\n\n' +
      '*"S/4HANA hızlı, o hâlde raporlarımız hızlanacak."*\n\n' +
      '**Hayır.** Eski tabloları okuyan özel raporlarınız ' +
      '({{z-gelistirme}}) artık {{uyumluluk-view}} üzerinden çalışır — ' +
      've bu **yavaşlayabilir**, çünkü eskiden hazır duran bir tablo ' +
      'artık **her çağrıda hesaplanmaktadır**.\n\n' +
      '⭐ **Hız, kod uyarlandığı ölçüde gelir.** Bu, geçiş bütçesinin ' +
      'en sık unutulan kalemidir ve gerçek senaryoda göreceğiniz gibi ' +
      'yalnızca bir performans meselesi de değildir.',

    gercekHayat:
      'Yönetici sorar: *"S/4HANA’ya geçince ne kazanacağız?"*\n\n' +
      'Zayıf cevap: *"Daha hızlı olacak, arayüz modern olacak, ' +
      '{{ACDOCA}} tek tablo."*\n\n' +
      'Bu cevap teknik ve ikna edici değildir; üstelik ilk maddesi ' +
      '**koşullu olarak doğrudur**.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Güçlü cevap üç somut değişikliktir:**\n\n' +
      '**1.** *"Ay sonu mutabakat adımlarınızın bir kısmı **ortadan kalkacak** — ' +
      'FI ile CO’nun ayrışması artık mümkün değil."*\n\n' +
      '**2.** *"Bugün soramadığınız soruları sorabileceksiniz: ' +
      'herhangi bir geçmiş tarih itibarıyla bakiye, herhangi bir boyut kırılımında — ' +
      'çünkü toplam saklanmıyor, hesaplanıyor."*\n\n' +
      '**3.** ⚠️ *"Ama mevcut özel raporlarınızın bir kısmı **uyarlanmazsa ' +
      'yavaşlayacak** ve bir kısmı **sessizce yanlış sonuç verecek**. ' +
      'Bu, geçiş bütçesinin bir kalemidir."*\n\n' +
      'Üçüncü madde, cevabı satış konuşmasından **danışmanlığa** çevirir.',

    muhasebeMantigi:
      'Muhasebe açısından **hiçbir şey değişmedi**: çift taraflı kayıt, ' +
      'borç–alacak dengesi, {{mutabakat-hesabi}} mantığı, ' +
      'dönem kapanışı — hepsi aynı.\n\n' +
      'Değişen, **bu kayıtların nerede saklandığıdır**.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**ECC’de bir satıcı faturası kaydedildiğinde:**\n\n' +
      '{{BKPF}} başlık · {{BSEG}} kalemler · {{BSIK}} açık kalem kopyası · ' +
      '{{LFC1}} satıcı bakiyesi · {{GLT0}}/{{FAGLFLEXT}} G/L toplamları · ' +
      '`COEP` CO satırı\n\n' +
      '**Aynı fatura S/4HANA’da:**\n\n' +
      '{{BKPF}} başlık · {{ACDOCA}} kalemler — **hepsi bu.**\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Muhasebeci için pratik sonucu:** *"mizan ile döküm tutmuyor"* ' +
      'sorunu **kalktı**. Çünkü mizan artık ayrı bir tablodan değil, ' +
      '**dökümün kendisinden** hesaplanıyor.\n\n' +
      '⚠️ **Ama bir şey değişti ve önemlidir:** {{BSEG}}’de tutarlar ' +
      '**her zaman pozitifti**, yön ayrı bir alanda (`SHKZG`: S borç / H alacak) ' +
      'saklanırdı. {{ACDOCA}}’da tutarlar **işaretlidir** — alacak negatiftir.\n\n' +
      'Bu, muhasebe mantığını değiştirmez ama **her sorguyu** değiştirir. ' +
      'Konunun en pahalı ayrıntısı budur ve senaryoda karşınıza çıkacak.',

    kavramlar: ['bellek-ici', 'toplam-tablosu', 'evrensel-kayit-defteri',
                'uyumluluk-view', 'is-ortagi', 'gomulu-analitik', 'fiori', 'merkezi-finans'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Bir belgenin **yolculuğu** ECC ile S/4HANA arasındaki farkı ' +
      'en somut gösteren şeydir. Aynı fatura, aynı muhasebe — ' +
      'farklı sayıda durak.',

    roller:[
      { rol:'Kullanıcı', gorev:'Faturayı girer — ekran **aynı** ({{FB60}} veya {{fiori}}).' },
      { rol:'Sistem', gorev:'Doğrulama ve hesap belirleme — **değişmedi**.' },
      { rol:'Sistem', gorev:'{{BKPF}} başlığı yazar — **değişmedi**.' },
      { rol:'Sistem', gorev:'⭐ Kalemleri **{{ACDOCA}}’ya** yazar — tek tablo.' },
      { rol:'Sistem', gorev:'⚠️ Toplam tablolarını **yazmaz** — artık yoklar.' },
      { rol:'Sistem', gorev:'⚠️ İndeks tablolarını **yazmaz** — artık görünümler.' },
      { rol:'Sistem', gorev:'CO satırını **ayrıca yazmaz** — aynı satır CO alanlarını taşır.' },
      { rol:'Kullanıcı', gorev:'{{FBL1N}} dökümü alır — kalemlerden **hesaplanır**.' },
      { rol:'Kullanıcı', gorev:'{{FS10N}} bakiyesi alır — ⭐ **aynı kalemlerden** hesaplanır.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Aynı fatura, iki mimari',
      adimlar:[
        { ic:'📝', rol:'Kullanıcı', baslik:'Fatura girilir',
          aciklama:'Ekran ve muhasebe mantığı **değişmedi**. ' +
                   'Vergi kodu, hesap belirleme, doğrulama kuralları — hepsi aynı.',
          cikti:'Kayıt talebi', ok:'doğrulanır' },
        { ic:'🧾', rol:'Sistem', baslik:'{{BKPF}} — belge başlığı',
          aciklama:'Belge numarası, tarih, belge türü, para birimi. ' +
                   '**Bu tablo değişmedi.**',
          cikti:'Başlık kaydı', ok:'kalemler yazılır' },
        { ic:'⭐', rol:'Sistem', baslik:'{{ACDOCA}} — **tek kalem tablosu**',
          aciklama:'FI kalemleri, CO nesneleri, varlık boyutu, defter, segment, ' +
                   'fonksiyonel alan ve **sekize kadar para birimi** — ' +
                   'hepsi **aynı satırda**.\n\n' +
                   '⚠️ Tutarlar **işaretlidir**: alacak negatif.',
          cikti:'Kalem satırları', ok:'ECC’de devam ederdi' },
        { ic:'🚫', rol:'ECC’de vardı', baslik:'{{BSIK}} / {{BSID}} — açık kalem kopyası',
          aciklama:'ECC’de aynı kalem, **farklı anahtarla** ikinci kez yazılırdı: ' +
                   '{{BSEG}} anahtarı belge numarasıyla başlar, ' +
                   '{{BSIK}} anahtarı `LIFNR` ile.\n\n' +
                   '⭐ S/4HANA’da **yazılmaz** — {{uyumluluk-view}} oldular.',
          cikti:'—', ok:'ve devam ederdi' },
        { ic:'🚫', rol:'ECC’de vardı', baslik:'{{GLT0}} / {{FAGLFLEXT}} — toplam tabloları',
          aciklama:'Hesap ve dönem bazında bakiyeler **önceden hesaplanıp** saklanırdı.\n\n' +
                   '⚠️ İki dezavantajı vardı: yer kaplarlar ve ' +
                   '**kalemlerle ayrışabilirler**.\n\n' +
                   '⭐ S/4HANA’da **yazılmaz** — bakiye kalemlerden hesaplanır.',
          cikti:'—', ok:'ve devam ederdi' },
        { ic:'🚫', rol:'ECC’de vardı', baslik:'`COEP` — ayrı CO satırı',
          aciklama:'Aynı gider CO tarafında **ikinci kez** kaydedilirdi ve ' +
                   'FI ile ayrışabilirdi; mutabakat defteri bu yüzden vardı.\n\n' +
                   '⭐ S/4HANA’da aynı {{ACDOCA}} satırı **hem FI hem CO** ' +
                   'alanlarını taşır → ayrışma **imkânsız**.',
          cikti:'—', ok:'okuma tarafı' },
        { ic:'📊', rol:'Kullanıcı', baslik:'{{FBL1N}} döküm · {{FS10N}} bakiye',
          aciklama:'⭐ **İkisi de aynı kaynaktan** ({{ACDOCA}}) hesaplanır.\n\n' +
                   'Bu yüzden *"mizan ile döküm tutmuyor"* sorunu ' +
                   '**yapısal olarak** ortadan kalktı.',
          cikti:'Tutarlı rapor', ok:'eski kod?' },
        { ic:'⚠️', rol:'Özel kod', baslik:'{{z-gelistirme}} eski tabloyu okuyorsa',
          aciklama:'{{uyumluluk-view}} devreye girer: sorgu çalışır ama ' +
                   'sonuç **okuma anında hesaplanır**.\n\n' +
                   '⚠️ **Ücretsiz değildir** ve `SHKZG` semantiği ' +
                   'değiştiği için **sessizce yanlış** sonuç verebilir.',
          cikti:'Uyarlanması gereken kod' },
      ],
    },

    adimlar:[
      { rol:'Kullanıcı', eylem:'Fatura girer', sistem:'{{FB60}} / {{fiori}} — **aynı**' },
      { rol:'Sistem', eylem:'Başlık yazar', sistem:'{{BKPF}} — **aynı**' },
      { rol:'Sistem', eylem:'⭐ Kalemleri yazar', sistem:'{{ACDOCA}} — **tek tablo**' },
      { rol:'Sistem', eylem:'Toplam yazmaz', sistem:'⚠️ {{GLT0}} / {{FAGLFLEXT}} yok' },
      { rol:'Sistem', eylem:'İndeks yazmaz', sistem:'⚠️ {{BSIK}} / {{BSID}} görünüm' },
      { rol:'Sistem', eylem:'CO satırı yazmaz', sistem:'⭐ Aynı satır CO taşır' },
      { rol:'Kullanıcı', eylem:'Rapor alır', sistem:'Hepsi {{ACDOCA}}’dan hesaplanır' },
    ],

    veriAkisi:{
      nereden:'Kullanıcı girişi veya entegre modüller (MM, SD, AA).',
      nereye:'{{BKPF}} + {{ACDOCA}} — ve başka hiçbir yere.',
      tetikleyen:'Her muhasebe kaydı.',
      sonraki:'Raporlar ve {{gomulu-analitik}} aynı satırlardan okur.',
    },

    notlar:[
      { tip:'tip', baslik:'⭐ Bir mimari ders: kısıt kalkınca çözüm gereksizleşir', metin:
        'S/4HANA’yı anlamanın en kısa yolu, **ne eklendiğine değil ' +
        'ne kaldırıldığına** bakmaktır.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Kaldırılanların ortak özelliği:** hepsi bir **performans çözümüydü**.\n\n' +
        '| Yapı | Neden vardı | Neden gereksizleşti |\n' +
        '|---|---|---|\n' +
        '| {{toplam-tablosu}} | Bakiye hesaplamak pahalıydı | Artık ucuz |\n' +
        '| İndeks tabloları | Farklı anahtarla tarama pahalıydı | Artık ucuz |\n' +
        '| Mutabakat defteri | İki kopya ayrışabilirdi | Tek kopya var |\n' +
        '| Gecelik toplu işler | Rapor için hazırlık gerekirdi | Anında hesaplanır |\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Genel ilke — yalnızca SAP için değil:** bir sistemdeki ' +
        'karmaşıklığın önemli bir kısmı, artık geçerli olmayan bir ' +
        'kısıtın kalıntısıdır.\n\n' +
        'Bu yüzden *"neden böyle yapılmış?"* sorusunun cevabı genelde ' +
        '*"o zamanki donanımda başka türlü olmuyordu"*dur — ' +
        've kısıt kalktığında **çözümü de sorgulamak gerekir**.\n\n' +
        '⚠️ Ama kaldırma **bedava değildir**: eski yapıya bağlı her şeyin ' +
        '(özel kod, arayüz, alışkanlık) uyarlanması gerekir. ' +
        '{{uyumluluk-view}} bu bedeli **erteler**, ortadan kaldırmaz.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Muhasebe mantığı değişmedi; aşağıdaki fişler ECC’de de aynıdır. ' +
      'Değişen **nereye yazıldıklarıdır** — ve son iki fişte olduğu gibi, ' +
      '**kaç kere yazıldıklarıdır**.',

    etkilenenHesaplar:[
      { hesap:'770 Genel yönetim giderleri', tur:'Gelir tablosu', neden:'⭐ S/4’te G/L hesabı **ve** {{masraf-turu}} — tek nesne.' },
      { hesap:'320 Satıcılar', tur:'Bilanço — Kaynak', neden:'{{acik-kalem}}; artık {{BSIK}} kopyası yok.' },
      { hesap:'191 İndirilecek KDV', tur:'Bilanço — Varlık', neden:'Vergi mantığı değişmedi ({{BSET}} duruyor).' },
      { hesap:'257 Birikmiş amortismanlar', tur:'Bilanço — Varlık (−)', neden:'⭐ Her {{amortisman-alani}} **kendi defterine** gerçek zamanlı yazar.' },
    ],

    fisler:[
      { baslik:'① Satıcı faturası — **aynı fiş, daha az tablo**',
        belgeTuru:'KR', tarih:'14.05.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim giderleri', borc:50000,
            not:'kâr merkezi 4100 · fonksiyonel alan · segment' },
          { hesap:'191', ad:'İndirilecek KDV %20', borc:10000 },
          { hesap:'320', ad:'Satıcılar — danışmanlık', alacak:60000 },
        ],
        not:'**ECC’de bu fiş altı tabloya yazardı:**\n\n' +
             '{{BKPF}} · {{BSEG}} (3 satır) · {{BSIK}} (açık kalem kopyası) · ' +
             '{{LFC1}} (satıcı bakiyesi) · {{GLT0}}/{{FAGLFLEXT}} (G/L toplamları) · ' +
             '`COEP` (CO satırı)\n\n' +
             '**S/4HANA’da iki tabloya yazar:**\n\n' +
             '{{BKPF}} · {{ACDOCA}} (3 satır)\n\n' +
             '⭐ Ve o üç {{ACDOCA}} satırı, ECC’de altı tabloya dağılmış ' +
             '**tüm boyutları** taşır: defter, kâr merkezi, segment, ' +
             'fonksiyonel alan, CO nesnesi ve sekize kadar para birimi.\n\n' +
             '⚠️ **Kritik ayrıntı:** `320` satırının tutarı {{ACDOCA}}’da ' +
             '**−60.000** olarak durur. {{BSEG}}’de +60.000 ve `SHKZG = H` idi.' },

      { baslik:'② FI–CO ayrışması — **artık imkânsız**',
        belgeTuru:'KR', tarih:'20.05.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — maliyet yeri 4100', borc:120000 },
          { hesap:'320', ad:'Satıcılar', alacak:120000 },
        ],
        not:'⭐ **Bu fişin S/4HANA’daki en büyük yeniliği görünmüyor — ' +
             'çünkü yenilik bir şeyin *olmamasıdır*.**\n\n' +
             '**ECC’de:** gider satırı FI’da {{BSEG}}’e, CO’da `COEP`’e ' +
             '**ayrı ayrı** yazılırdı. İki kayıt teoride hep eşitti; ' +
             'pratikte ayrışabiliyordu (dönem farkı, güncelleme hatası, ' +
             'CO’da yapılan aktarımlar). Mutabakat defteri ve ' +
             'aylık kontrol adımları bu yüzden vardı.\n\n' +
             '**S/4HANA’da:** tek {{ACDOCA}} satırı hem `RACCT` (G/L hesabı) ' +
             'hem `RCNTR` (maliyet yeri) alanlarını taşır. ' +
             'İki kayıt yok ki ayrışsın.\n\n' +
             '⭐ **Pratik sonuç:** ay sonu kontrol listenizdeki ' +
             '"FI–CO mutabakatı" adımı **silinmelidir**. ' +
             'Duruyorsa her ay boşuna zaman harcanıyor demektir ' +
             '(bkz. {{konu:best-practices}}).' },

      { baslik:'③ Amortisman — **yerel defter (0L)**',
        belgeTuru:'AF', tarih:'31.05.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Amortisman gideri — VUK, 5 yıl', borc:100000 },
          { hesap:'257', ad:'Birikmiş amortismanlar', alacak:100000 },
        ],
        not:'Yeni Varlık Muhasebesi’nde **{{amortisman-alani}} = defter**. ' +
             'Yerel alan (01) {{lider-defter}}e (`0L`) yazar.\n\n' +
             'Bu fiş ECC’de de aynıydı — fark bir sonraki fişte.' },

      { baslik:'④ Aynı varlık, **IFRS defteri (2L)** — gerçek zamanlı',
        belgeTuru:'AF', tarih:'31.05.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Amortisman gideri — IFRS, 8 yıl', borc:62500 },
          { hesap:'257', ad:'Birikmiş amortismanlar', alacak:62500 },
        ],
        not:'⭐ **Yeni Varlık Muhasebesi’nin asıl değişikliği burada.**\n\n' +
             '**ECC’de:** yalnızca alan 01 gerçek zamanlı FI’a yazardı. ' +
             'Diğer alanlar (IFRS, vergi) **periyodik** olarak ve ' +
             'çoğunlukla **delta** (fark) kayıtlarıyla aktarılırdı. ' +
             'Yani IFRS defteri ay içinde **eksikti** ve ' +
             'ayrı bir program çalışana kadar rapor alınamazdı.\n\n' +
             '**S/4HANA’da:** her amortisman alanı **kendi defterine ' +
             'gerçek zamanlı** ve **tam tutarla** yazar. ' +
             'Delta mantığı ortadan kalktı.\n\n' +
             '⭐ **Pratik sonuç:** IFRS raporu ayın herhangi bir gününde ' +
             '**doğrudur**. Ay sonu beklemeye gerek yok.\n\n' +
             '⚠️ Ama dikkat: aynı varlık iki defterde **farklı bakiye** taşır ' +
             '(bu fişte 100.000 ve 62.500). Bu **normaldir** ve ' +
             '{{konu:parallel-ledger}}’de anlatılan ilkenin ' +
             'varlık tarafındaki karşılığıdır.' },
    ],

    tHesaplar:[
      { hesap:'Birikmiş amortisman — **lider defter 0L**', kod:'257 · VUK',
        borc:[],
        alacak:[{ ad:'Mayıs amortismanı (5 yıl)', tutar:100000 }],
        not:'Yerel mevzuata göre — {{amortisman-alani}} 01' },
      { hesap:'Birikmiş amortisman — **IFRS defteri 2L**', kod:'257 · IFRS',
        borc:[],
        alacak:[{ ad:'Mayıs amortismanı (8 yıl)', tutar:62500 }],
        not:'⭐ **Gerçek zamanlı** — ECC’de periyodik ve delta idi' },
    ],

    notlar:[
      { tip:'err', baslik:'⚠️ SHKZG tuzağı — konunun en pahalı ayrıntısı', metin:
        'Muhasebe mantığı değişmedi ama **tutarın saklanma biçimi** değişti. ' +
        'Bu tek fark, taşınan her sorguyu etkiler.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**{{BSEG}} — eski dünya**\n\n' +
        'Tutarlar **her zaman pozitiftir** (`DMBTR`). ' +
        'Yön ayrı bir alanda saklanır: `SHKZG` = **S** (borç) veya **H** (alacak).\n\n' +
        'Toplama almak için yön mantığı **elle** uygulanır:\n' +
        '`IF SHKZG = "H". amount = amount * -1. ENDIF.`\n\n' +
        '**{{ACDOCA}} — yeni dünya**\n\n' +
        'Tutarlar **işaretlidir** (`HSL`): alacak **negatif** saklanır. ' +
        'Toplamak için ek mantık gerekmez — doğrudan toplanır.\n\n' +
        '━━━━━━━━━━\n\n' +
        '⚠️ **Tehlike:** eski bir sorgu yeni tabloya taşınırken ' +
        '`SHKZG` mantığı **kaldırılmazsa**, işaret **iki kez** uygulanır. ' +
        'Alacak satırları pozitife döner ve toplamlar anlamsızlaşır — ' +
        'çoğu zaman **sıfıra yakın** çıkar.\n\n' +
        '⭐ **Ve bu hata sessizdir:** program çöker değil, ' +
        '**yanlış sayı üretir**. Rapor boş veya tuhaf görünür; ' +
        'kimse mizanla karşılaştırmazsa aylarca fark edilmez.\n\n' +
        'Gerçek senaryoda tam olarak bu olmuş.' },

      { tip:'warn', baslik:'Masraf türü ile G/L hesabı birleşti', metin:
        'ECC’de bir gider iki ayrı nesneydi: **G/L hesabı** ({{SKA1}}) ve ' +
        '**{{masraf-turu}}** ({{CSKB}}). İkisi ayrı ayrı açılır, ' +
        'ayrı ayrı bakımı yapılırdı — ve **tutarsız olabilirlerdi**: ' +
        'G/L hesabı var ama masraf türü yoksa CO kaydı oluşmazdı.\n\n' +
        '⭐ **S/4HANA’da tek nesne:** masraf türü, G/L hesabının bir ' +
        '**hesap tipidir** ({{FS00}}’da seçilir: birincil maliyet / gelir, ' +
        'ikincil maliyet, bilanço, vb.).\n\n' +
        '**Üç pratik sonucu var:**\n\n' +
        '**1.** Masraf türü açmak artık **G/L hesabı açmaktır** — ' +
        'iki adım tek adıma indi.\n' +
        '**2.** ⚠️ **Sahiplik değişti:** hesap planı eskiden muhasebenin, ' +
        'masraf türleri kontrolörlüğün alanıydı. Artık **tek liste** var ' +
        've kimin sahip olduğu **açıkça kararlaştırılmalıdır**.\n' +
        '**3.** ⚠️ {{brownfield}} geçişte bu **hazırlık gerektirir**: ' +
        'eşleşmeyen masraf türleri dönüşümü **durdurur** ' +
        '(bkz. {{konu:migration}}).' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Yenilikleri ezberlemek yerine **dört öbeğe** ayırmak yeterlidir. ' +
      'Üçü tezin doğrudan sonucudur; dördüncüsü (arayüz ve dağıtım) ' +
      'ondan bağımsızdır.',

    liste:[
      /* --- ÖBEK 1: VERİ MİMARİSİ --- */
      { ad:'⭐ Öbek 1 · {{evrensel-kayit-defteri}} ({{ACDOCA}})', en:'Universal Journal',
        aciklama:'FI, CO, varlık ve malzeme değerlerinin **tek satır kaynağı**.',
        neZaman:'Her muhasebe kaydında — istisnasız.',
        ornek:'**Ne birleşti:** {{BSEG}} (FI kalemleri) · `COEP` (CO satırları) · ' +
              '{{ANLC}} (varlık değerleri) · malzeme değerleme\n\n' +
              '**Her satırda ne var:** defter (`RLDNR`) · G/L hesabı (`RACCT`) · ' +
              'maliyet yeri (`RCNTR`) · kâr merkezi (`PRCTR`) · segment · ' +
              'fonksiyonel alan · **sekize kadar para birimi**\n\n' +
              '⭐ **En büyük kazanç hız değil tutarlılıktır:** ' +
              'FI ile CO’nun ayrışması **yapısal olarak imkânsız**.\n\n' +
              '⚠️ Tutarlar **işaretlidir** — {{BSEG}}’den farklı.',
        tcodes:['FAGLL03','SE16N'] },

      { ad:'🚫 Öbek 1 · Kalkan {{toplam-tablosu}}ları', en:'Removed Aggregates',
        aciklama:'Önceden hesaplanıp saklanan bakiyeler.',
        neZaman:'Artık hiç — bakiye kalemlerden hesaplanır.',
        ornek:'**Kalkanlar:** {{GLT0}} (klasik G/L toplamları) · ' +
              '{{FAGLFLEXT}} (yeni G/L toplamları) · ' +
              '{{KNC1}} / {{LFC1}} (müşteri / satıcı bakiyeleri)\n\n' +
              '**Neden vardılar:** diskten okuyup toplamak pahalıydı.\n\n' +
              '**Neden gereksizleştiler:** {{bellek-ici}} veritabanında ' +
              'aynı toplamı hesaplamak yeterince hızlı.\n\n' +
              '⭐ **Kazanç yalnızca yer değil:** saklanan toplam ' +
              'kalemlerle **ayrışabilirdi**; hesaplanan toplam ayrışamaz.',
        tcodes:['FS10N'] },

      { ad:'🚫 Öbek 1 · Kalkan indeks tabloları', en:'Removed Index Tables',
        aciklama:'Aynı kalemin farklı anahtarla ikinci kopyası.',
        neZaman:'Artık hiç — {{uyumluluk-view}} oldular.',
        ornek:'**Açık kalemler:** {{BSIK}} (satıcı) · {{BSID}} (müşteri) · {{BSIS}} (G/L)\n' +
              '**Kapatılmışlar:** {{BSAK}} · {{BSAD}} · {{BSAS}}\n\n' +
              '**Neden vardılar:** {{BSEG}} anahtarı **belge numarasıyla** başlar; ' +
              'satıcı bazlı sorgu tüm tabloyu tarardı. {{BSIK}} anahtarı ' +
              '`LIFNR` ile başlar (bkz. {{konu:sap-tables}}).\n\n' +
              '⚠️ **Okunur ama YAZILAMAZ.** Eski yükleme programları ' +
              'bunlara yazmaya çalışıyorsa **çalışmaz** — ' +
              'açık kalem artık **belge kaydıyla** oluşur.',
        tcodes:['FBL1N','FBL5N'] },

      /* --- ÖBEK 2: ANA VERİ --- */
      { ad:'👥 Öbek 2 · {{is-ortagi}} zorunluluğu', en:'Business Partner',
        aciklama:'Satıcı ve müşteri tek nesnede birleşti; taraf türü artık **rol**.',
        neZaman:'Her satıcı/müşteri işleminde.',
        ornek:'**Sorun neydi:** aynı firma hem satıcı hem müşteriyse ' +
              '{{LFA1}} ve {{KNA1}}’de **iki ayrı kayıt** açılırdı; ' +
              'adres iki yerde tutulur ve zamanla **ayrışırdı**.\n\n' +
              '**Çözüm:** tek kimlik ({{BUT000}}), çok rol.\n\n' +
              '⚠️ **Yanlış anlaşılan nokta:** şirket kodu verisi **kaybolmadı** — ' +
              'hâlâ {{LFB1}} / {{KNB1}}’de durur ve `AKONT` ' +
              '{{mutabakat-hesabi}} oradadır. Değişen **kimlik katmanıdır**.\n\n' +
              '⚠️ {{brownfield}} geçişte {{cvi}} dönüşümü **ön koşuldur** ' +
              've projelerin en sık geciktiği adımdır.',
        tcodes:['BP','XK01'] },

      { ad:'💰 Öbek 2 · Masraf türü = G/L hesabı', en:'Cost Element in G/L',
        aciklama:'{{masraf-turu}} ayrı nesne olmaktan çıktı; G/L hesabının **tipi** oldu.',
        neZaman:'Gider hesabı açarken.',
        ornek:'ECC: {{SKA1}} (G/L) + {{CSKB}} (masraf türü) → **iki nesne, iki adım**\n' +
              'S/4: {{FS00}}’da **hesap tipi** seçilir → **tek nesne, tek adım**\n\n' +
              '⚠️ **Sahiplik sorusu doğar:** hesap planı muhasebenin, ' +
              'masraf türleri kontrolörlüğün alanıydı. Artık tek liste var — ' +
              'kimin sahip olduğu **açıkça kararlaştırılmalıdır**.\n\n' +
              '⚠️ Brownfield geçişte eşleşmeyen masraf türleri ' +
              'dönüşümü **durdurur**.',
        tcodes:['FS00'] },

      /* --- ÖBEK 3: SÜREÇ --- */
      { ad:'🏢 Öbek 3 · Yeni Varlık Muhasebesi', en:'New Asset Accounting',
        aciklama:'{{amortisman-alani}} = defter; her alan **gerçek zamanlı** kendi defterine yazar.',
        neZaman:'Her amortisman koşusunda.',
        ornek:'**ECC:** yalnızca alan 01 gerçek zamanlı FI’a yazardı. ' +
              'Diğerleri **periyodik** ve **delta** kayıtlarıyla aktarılırdı — ' +
              'IFRS defteri ay içinde **eksikti**.\n\n' +
              '**S/4:** her alan kendi defterine **tam tutarla ve anında** yazar. ' +
              'Delta mantığı **kalktı**.\n\n' +
              '⭐ Ayrıca **planlanan amortisman anında hesaplanır** — ' +
              '{{ANLC}}’de saklanan bir toplamdan değil. ' +
              '{{AW01N}} varlık gezgini bu yüzden her zaman günceldir.\n\n' +
              '⚠️ Tek {{AFAB}} koşusu **tüm defterleri** besler ' +
              '(bkz. {{konu:parallel-ledger}}).',
        tcodes:['AFAB','AW01N'] },

      { ad:'📊 Öbek 3 · {{gomulu-analitik}}', en:'Embedded Analytics',
        aciklama:'Raporlama, aktarım olmadan **işlem verisinin üstünde** çalışır.',
        neZaman:'Gerçek zamanlı raporlama ihtiyacında.',
        ornek:'Teknik dayanağı {{cds-view}}lerdir: veri **kopyalanmaz**, ' +
              'tanımlı görünümler üzerinden okunur.\n\n' +
              '⭐ **Pratik sonuç gecikmenin kalkmasıdır:** klasik kurgu ' +
              'gece aktarır, rapor ertesi gün doğrudur. Gömülü analitikte ' +
              'rapor **şu anki** veriyi gösterir.\n\n' +
              '⚠️ Veri ambarının yerini **tamamen almaz**: birden çok ' +
              'kaynak sistemin birleştirilmesi ve çok uzun tarihçe ' +
              'hâlâ ayrı bir çözüm ister.',
        tcodes:['FGI0'] },

      /* --- ÖBEK 4: ARAYÜZ VE DAĞITIM --- */
      { ad:'🖥️ Öbek 4 · {{fiori}} — görev merkezli arayüz', en:'SAP Fiori',
        aciklama:'Rol bazlı web arayüzü; klasik ekranların yerine geçen kullanıcı katmanı.',
        neZaman:'Kullanıcı deneyimi tasarımında.',
        ornek:'⚠️ **Fiori "yeni görünümlü GUI" değildir.**\n\n' +
              'Klasik ekran **işlem** merkezliydi: bir ekranda çok iş ' +
              '({{FB60}} hem girer hem park eder hem şablon kullanır).\n' +
              'Fiori **görev** merkezlidir: bir uygulama bir iş.\n\n' +
              '⭐ **Danışman için iki sonucu var:**\n\n' +
              '**1.** Rol tasarımı artık aynı zamanda **arayüz tasarımıdır** — ' +
              'kullanıcı yalnızca rolündeki uygulamaları görür.\n' +
              '**2.** Pek çok Fiori uygulaması arka planda **aynı** işlem kodunu ' +
              'çağırır; bildiğiniz yapılandırma **aynen geçerlidir**.\n\n' +
              'Klasik işlemler kaldırılmadı — başlatıcıdan çağrılabilirler.' },

      { ad:'🌉 Öbek 4 · {{merkezi-finans}}', en:'Central Finance',
        aciklama:'Kaynak sistemler yerinde kalır; belge **kopyaları** merkezi S/4HANA’ya akar.',
        neZaman:'Çok sistemli gruplarda, geçişi parçalara bölmek için.',
        ornek:'Kaynak sistemler (SAP veya SAP dışı) çalışmaya devam eder; ' +
              'merkezi sistem yalnızca **raporlama ve konsolidasyon** için beslenir.\n\n' +
              '⭐ Hiçbir şirket kodunu durdurmadan grup raporlamasını ' +
              'S/4HANA’ya taşımanın yoludur; dönüşüm sonraya bırakılır.\n\n' +
              '⚠️ Bir geçiş değil bir **köprüdür**: eşleme (hesap planı, ' +
              'şirket kodu, maliyet nesnesi) kurulmadan çalışmaz ve ' +
              'eşlemenin bakımı **süreklidir**.' },
    ],

    karsilastirmaBasliklar:['ECC', 'S/4HANA'],
    karsilastirma:[
      ['FI kalemleri', '{{BSEG}}', '⭐ **{{ACDOCA}}**'],
      ['CO satırları', '`COEP` — **ayrı kayıt**', 'Aynı {{ACDOCA}} satırında'],
      ['FI–CO ayrışması', '⚠️ Mümkün — mutabakat gerekir', '✅ **Yapısal olarak imkânsız**'],
      ['G/L bakiyeleri', '{{GLT0}} / {{FAGLFLEXT}} **saklanır**', '**Hesaplanır**'],
      ['Açık kalemler', '{{BSIK}} / {{BSID}} fiziksel tablo', '{{uyumluluk-view}} — ⚠️ **yazılamaz**'],
      ['Tutar işareti', '⚠️ Hep pozitif + `SHKZG`', '⭐ **İşaretli** (alacak negatif)'],
      ['Satıcı / müşteri', '{{LFA1}} / {{KNA1}} bağımsız', '⚠️ **{{is-ortagi}} zorunlu**'],
      ['Masraf türü', '{{CSKB}} — ayrı nesne', 'G/L hesabının **tipi**'],
      ['Amortisman alanları', 'Yalnızca 01 gerçek zamanlı', '⭐ **Hepsi** gerçek zamanlı'],
      ['Para birimi', '2 (+ ek alanlar)', '**8’e kadar**'],
      ['Raporlama', 'Ayrı ambar / gecelik aktarım', '{{gomulu-analitik}} — canlı'],
      ['Muhasebe mantığı', 'Çift taraflı kayıt', '⭐ **Aynı — hiç değişmedi**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    anlatim:
      'S/4HANA az sayıda **yeni** işlem kodu getirdi; asıl değişiklik ' +
      'bazılarının **kalkması** ve bazılarının **arkasındaki tablonun** değişmesidir. ' +
      'Bu bölümdeki üç kod, konunun üç ayrı sorusunu cevaplar: ' +
      '*veri nerede* ({{SE16N}}), *neden yavaş* ({{SAT}}), *defter ne durumda* ({{FINSC_LEDGER}}).',

    liste:[
      { kod:'SE16N', ad:'Tablo görüntüleme — S/4 gözüyle',
        amac:'Tablo içeriğini gösterir; S/4HANA’da **görünüm mü tablo mu** olduğunu anlamanın en hızlı yolu.',
        neZaman:'Teşhiste — *"bu veri gerçekten nerede duruyor?"*',
        adimlar:[
          { baslik:'{{ACDOCA}}’ya bak — gerçek kalem tablosu',
            aciklama:'`RBUKRS` + `GJAHR` + `BELNR` ile bir belgeyi süz.' },
          { baslik:'⭐ `HSL` alanına dikkat — **işaretli** tutar',
            aciklama:'Alacak satırları **negatiftir**. {{BSEG}}’de öyle değildi.' },
          { baslik:'{{BSIK}}’e bak — aynı veri, **görünüm** üzerinden',
            aciklama:'Sonuç gelir ama arkada {{ACDOCA}}’dan hesaplanır.' },
          { baslik:'⚠️ Karşılaştır: aynı kalem iki yerde **farklı işaretle**',
            aciklama:'Bu, taşınan sorguların neden bozulduğunun kanıtıdır.' },
          { baslik:'{{SE11}} ile nesne türünü doğrula — tablo mu, görünüm mü?' },
        ],
        ekranAkisi:[
          { ekran:'{{ACDOCA}}', islem:'Belge 1900004417 → 3 satır · `HSL`: +50.000 · +10.000 · **−60.000**' },
          { ekran:'{{BSIK}}', islem:'Aynı satıcı kalemi → tutar **+60.000**, `SHKZG` = **H**' },
          { ekran:'⚠️ Çıkarım', islem:'**Aynı kalem, iki farklı gösterim** — sorgu mantığı buna göre yazılmalı' },
          { ekran:'{{SE11}}', islem:'{{BSIK}} → nesne türü: **görünüm** (tablo değil)' },
        ],
        alanlar:{
          zorunlu:['Tablo/görünüm adı'],
          opsiyonel:['Süzgeç alanları','Çıktı düzeni'] },
        hatalar:[
          { mesaj:'{{BSIK}}’e yazmaya çalışan program hata veriyor', sebep:'⚠️ Artık **görünüm** — yazılamaz.', cozum:'Açık kalem **belge kaydıyla** oluşturulur; program uyarlanır.' },
          { mesaj:'Sorgu sonucu ECC’dekinden farklı', sebep:'⭐ `SHKZG` semantiği — {{ACDOCA}}’da tutar **işaretli**.', cozum:'Taşınan sorgudan yön mantığı **kaldırılır**; yoksa işaret iki kez uygulanır.' },
          { mesaj:'Görünümden okuma çok yavaş', sebep:'{{uyumluluk-view}} okuma anında **hesaplanır**.', cozum:'Kritik programlar {{ACDOCA}}’ya taşınır. Görünüm bir **köprüdür**, kalıcı çözüm değil.' },
        ],
        ipucu:'⚠️ **{{SE16N}} kullanıcıya verilmez** — yetki kontrolü zayıftır ve ' +
              'ham veri yanıltıcıdır (bkz. {{konu:sap-tables}}).\n\n' +
              '⭐ Danışman için ise tek bir şey için vazgeçilmezdir: ' +
              'aynı kalemi {{ACDOCA}}’da ve {{BSIK}}’te yan yana görüp ' +
              '**işaret farkını gözle doğrulamak**.',
        ilgili:['SE11','SE16H','FAGLL03'] },

      { kod:'SAT', ad:'Çalışma zamanı analizi',
        amac:'Bir programın zamanı nerede harcadığını ölçer (eski adı SE30).',
        neZaman:'⭐ Geçiş sonrası *"neden yavaşladı?"* sorusunda.',
        adimlar:[
          { baslik:'Şüpheli programı {{SM37}}’den bul — en uzun süren işler' },
          { baslik:'{{SAT}} ile ölçüm al — **gerçek veriyle**' },
          { baslik:'⭐ Veritabanı süresini ayır: hangi tablo/görünüm okunuyor?' },
          { baslik:'{{ST05}} SQL izi ile doğrula — üretilen sorguyu gör',
            aciklama:'{{uyumluluk-view}} okuması burada **açıkça** görünür.' },
          { baslik:'Kararı ver: görünüm mü okunuyor, {{ACDOCA}}’ya mı taşınmalı?' },
        ],
        ekranAkisi:[
          { ekran:'{{SM37}}', islem:'Kapanış işlerinin en uzun 3’ü: hepsi `Z_FI_*` programı' },
          { ekran:'{{SAT}}', islem:'Sürenin **%86’sı** veritabanında' },
          { ekran:'{{ST05}}', islem:'Sorgu {{BSIS}}’e gidiyor → arkada {{ACDOCA}} taranıyor' },
          { ekran:'Karar', islem:'Üç program doğrudan {{ACDOCA}}’ya taşındı' },
          { ekran:'Ölçüm', islem:'Kapanış **4,5 günden 2 güne** indi' },
        ],
        alanlar:{
          zorunlu:['Program veya işlem'],
          opsiyonel:['Varyant','Ölçüm kısıtı'] },
        hatalar:[
          { mesaj:'Ölçüm gerçek durumu yansıtmıyor', sebep:'Test verisi küçük.', cozum:'⭐ Ölçüm **gerçek hacimle** yapılır; küçük veride uyumluluk view’i ucuz görünür.' },
          { mesaj:'Sürenin çoğu ABAP tarafında', sebep:'Döngü içinde tek tek okuma.', cozum:'Toplu okuma. ⚠️ Görünüm üzerinden döngüsel okuma, S/4’te ECC’dekinden **çok daha pahalıdır**.' },
        ],
        ipucu:'⭐ **Geçiş sonrası performans şikâyetlerinde ilk soru şudur: ' +
              '"bu program hangi tabloyu okuyor?"**\n\n' +
              'Cevap bir {{uyumluluk-view}} ise sorun bulunmuştur. ' +
              'Görünümler bir **köprüdür** — geçişi mümkün kılarlar, ' +
              'kalıcı çözüm değildirler.',
        ilgili:['ST05','SM37','SE16N'] },

      { kod:'FINSC_LEDGER', ad:'Defter tanımları',
        amac:'Defterleri, para birimlerini ve şirket kodu atamalarını yönetir.',
        neZaman:'Kurulumda ve defter yapısını incelerken.',
        adimlar:[
          { baslik:'Defterleri listele — {{lider-defter}} `0L` ve ek defterler' },
          { baslik:'⭐ Para birimi sütunlarına bak — **sekize kadar**',
            aciklama:'ECC’de iki (+ ek alanlar) idi.' },
          { baslik:'Şirket kodu atamalarını kontrol et' },
          { baslik:'⚠️ Defter yapısı bir {{tek-yonlu-kapi}}dır',
            aciklama:'Sonradan açılan deftere **geçmiş yazılmaz** (bkz. {{konu:best-practices}}).' },
        ],
        ekranAkisi:[
          { ekran:'Defter listesi', islem:'`0L` (lider, VUK) · `2L` (IFRS)' },
          { ekran:'Para birimleri', islem:'TRY yerel · EUR grup · **6 slot boş**' },
          { ekran:'Varlık bağlantısı', islem:'{{amortisman-alani}} 01 → `0L` · 32 → `2L`' },
          { ekran:'⭐ Sonuç', islem:'Tek {{AFAB}} koşusu **iki defteri birden** besler' },
        ],
        alanlar:{
          zorunlu:['Defter kodu','Şirket kodu ataması','Para birimleri'],
          opsiyonel:['Mali yıl varyantı (defter bazlı)'] },
        hatalar:[
          { mesaj:'IFRS raporu eksik çıkıyor', sebep:'Defter ataması veya {{amortisman-alani}} köprüsü eksik.', cozum:'{{OADB}}’de alan → defter eşleşmesi kontrol edilir.' },
          { mesaj:'Yeni defter açtık ama geçmiş yok', sebep:'⚠️ **Beklenen davranış** — defter yapısı tek yönlü kapıdır.', cozum:'Geçmiş yazılamaz. ⭐ Bu yüzden defterler **baştan** açılır; kullanılmayan defter maliyetsizdir.' },
        ],
        ipucu:'⭐ **Boş para birimi slotu maliyetsizdir, sonradan eklenen ' +
              'para birimi ise geçmişte boş kalır.**\n\n' +
              'Aynı ilke defterler için de geçerlidir — ' +
              '{{konu:best-practices}}’teki *"şüphedeyken açık kur, kullanma"* ' +
              'kuralının S/4HANA’daki en somut uygulaması budur.',
        ilgili:['FAGLL03','OADB','AFAB'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Bu konunun tablo bölümü aslında **konunun kendisidir**: ' +
      'S/4HANA’nın tamamı bir tablo mimarisi kararıdır.\n\n' +
      '⭐ Okuma sırası: önce ne **geldi** ({{ACDOCA}}), sonra ne **kalktı** ' +
      '({{GLT0}}, {{BSIK}}), en son ne **kaldı** ({{BKPF}}, {{LFB1}}).',

    liste:[
      { ad:'ACDOCA', baslik:'⭐ Evrensel Kayıt Defteri — tek satır kaynağı',
        tutar:'FI kalemleri + CO nesneleri + varlık boyutu + malzeme değerleme.',
        olusturan:'Muhasebe kaydı üreten **her** işlem',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'Başlık {{BKPF}}; eski tablolar {{uyumluluk-view}} olarak buradan üretilir.',
        s4:'**Yeni ve merkezi.** Doğrudan yazılmaz — her satır bir belge kaydından doğar.',
        alanlar:[
          { ad:'RLDNR', aciklama:'⭐ **Defter** — anahtarın ilk parçası; paralel defterler burada ayrışır' },
          { ad:'RACCT', aciklama:'G/L hesabı' },
          { ad:'RCNTR', aciklama:'⭐ Maliyet yeri — **CO ayrı tabloda değil, burada**' },
          { ad:'PRCTR', aciklama:'Kâr merkezi' },
          { ad:'HSL', aciklama:'⚠️ Yerel para birimi tutarı — **İŞARETLİ**, alacak negatif' },
          { ad:'DRCRK', aciklama:'Borç/alacak göstergesi — bilgi amaçlı; **tutar zaten işaretli**' },
        ] },

      { ad:'GLT0', baslik:'🚫 Kalkan toplam tablosu — neden vardı, neden gitti',
        tutar:'Klasik G/L: hesap + dönem bazında **önceden hesaplanmış** bakiyeler.',
        olusturan:'ECC’de her FI kaydı',
        anahtar:'BUKRS + RACCT + RYEAR',
        iliskiler:'ECC’de {{BSEG}} kalemlerinin özeti.',
        s4:'⚠️ **{{uyumluluk-view}}** — okunur, yazılmaz. Bakiye {{ACDOCA}}’dan hesaplanır.',
        alanlar:[
          { ad:'HSL01–HSL16', aciklama:'Dönem bazında bakiye — **16 sütun**; bu yapı hesaplamayı hızlandırmak içindi' },
          { ad:'RACCT', aciklama:'Hesap' },
          { ad:'⭐ Ders', aciklama:'Saklanan toplam **ayrışabilir**; hesaplanan toplam ayrışamaz' },
        ] },

      { ad:'BSIK', baslik:'🚫 Kalkan indeks tablosu — anahtar meselesi',
        tutar:'Açık satıcı kalemleri — aynı kalemin **ikinci kopyası**.',
        olusturan:'ECC’de her satıcı kaydı',
        anahtar:'LIFNR + BUKRS + BELNR',
        iliskiler:'ECC’de {{BSEG}}’in satıcı bazlı kopyası.',
        s4:'⚠️ **Görünüm** — okunur, **yazılamaz**.',
        alanlar:[
          { ad:'LIFNR', aciklama:'⭐ **Anahtarın ilk parçası** — varlık sebebi buydu: {{BSEG}} belge numarasıyla başlar' },
          { ad:'SHKZG', aciklama:'⚠️ Borç/alacak — tutar **pozitif**, yön burada. {{ACDOCA}}’da öyle değil' },
          { ad:'ZFBDT', aciklama:'Vade tarihi' },
        ] },

      { ad:'BUT000', baslik:'İş Ortağı — yeni kimlik katmanı',
        tutar:'{{is-ortagi}} genel verisi.',
        olusturan:'{{BP}} veya {{cvi}} dönüşümü',
        anahtar:'PARTNER',
        iliskiler:'Şirket kodu verisi hâlâ {{LFB1}} / {{KNB1}}’de.',
        s4:'**Zorunlu.** {{XK01}}/{{XD01}} bile arka planda buraya yazar.',
        alanlar:[
          { ad:'PARTNER', aciklama:'İş ortağı numarası' },
          { ad:'TYPE', aciklama:'Kişi / Kuruluş / Grup' },
          { ad:'⚠️ Not', aciklama:'`AKONT` **burada değil** — {{LFB1}}’de. Kimlik katmanı ile şirket kodu verisi ayrı' },
        ] },

      { ad:'MATDOC', baslik:'Aynı desen, FI dışında',
        tutar:'Malzeme belgeleri — S/4’te tek tablo.',
        olusturan:'{{MIGO}} ve stok hareketi üreten her işlem',
        anahtar:'MBLNR + MJAHR + ZEILE',
        iliskiler:'FI tarafındaki {{ACDOCA}} ile **aynı mimari kararın** MM karşılığı.',
        s4:'Yeni. Konunun dışında ama **deseni** kanıtlıyor.',
        alanlar:[
          { ad:'MBLNR', aciklama:'Malzeme belgesi' },
          { ad:'⭐ Ders', aciklama:'MKPF + MSEG + MARD + MBEW birleşti; toplamlar **hesaplanıyor** — FI ile aynı ilke' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Ne kaldı, ne kalktı, ne geldi',
      varliklar:[
        { ad:'ACDOCA', rol:'⭐ Merkez', hub:true, aciklama:'**Tek satır kaynağı** — FI + CO + AA',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'RLDNR', tip:'pk' }, { ad:'RACCT' }, { ad:'HSL' }] },
        { ad:'BKPF', rol:'Kaldı', aciklama:'Belge başlığı — **değişmedi**',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'BSIK', rol:'Görünüm', aciklama:'⚠️ **Yazılamaz** — {{ACDOCA}}’dan üretilir',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'SHKZG' }] },
        { ad:'GLT0', rol:'Görünüm', aciklama:'⚠️ Toplam **hesaplanır**, saklanmaz',
          alanlar:[{ ad:'RACCT', tip:'fk' }, { ad:'HSL' }] },
        { ad:'BUT000', rol:'Yeni', aciklama:'**{{is-ortagi}}** kimliği',
          alanlar:[{ ad:'PARTNER', tip:'pk' }] },
        { ad:'LFB1', rol:'Kaldı', aciklama:'Şirket kodu verisi — `AKONT` **hâlâ burada**',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'AKONT' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'başlık → kalemler' },
        { from:'ACDOCA', to:'BSIK', alanlar:'—', not:'⚠️ görünüm **buradan üretilir**' },
        { from:'ACDOCA', to:'GLT0', alanlar:'—', not:'⚠️ toplam **hesaplanır**' },
        { from:'BUT000', to:'LFB1', alanlar:'PARTNER', not:'{{cvi}} eşlemesi' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'S/4HANA’da ekranların çoğu **aynıdır**. Danışman için değişen üç yer var: ' +
      'satıcı/müşteri artık {{BP}} ile açılır, tablolara bakarken ' +
      '**görünüm mü tablo mu** diye sorulur, ve defter yapısı ' +
      '{{FINSC_LEDGER}}’dan yönetilir.',

    ekranlar:[
      { ad:'{{BP}} — İş Ortağı',
        aciklama:'Satıcı ve müşterinin **tek** bakım ekranı.',
        alanlar:[
          { ad:'İş ortağı rolü', zorunlu:true, aciklama:'⭐ Satıcı, müşteri veya **ikisi birden**. ' +
                   'Rol eklemek yeni kayıt açmak değildir.' },
          { ad:'Şirket kodu verisi', zorunlu:true, aciklama:'⚠️ Hâlâ ayrı bir katman — ' +
                   '`AKONT` {{mutabakat-hesabi}} burada.' },
          { ad:'Numaralandırma', zorunlu:true, aciklama:'⚠️ İş ortağı numarası satıcı ' +
                   'numarasıyla **aynı olmak zorunda değil** — strateji baştan seçilir.' },
        ],
        ipucu:'⚠️ {{XK01}}/{{XD01}} hâlâ çalışır ama arka planda {{cvi}} üzerinden ' +
              '{{BUT000}}’e yazar. **Tek doğru giriş yolu {{BP}}’dir.**' },

      { ad:'{{SE16N}} — "tablo mu, görünüm mü?"',
        aciklama:'Teşhisin başlangıç noktası.',
        alanlar:[
          { ad:'⭐ `HSL` işareti', zorunlu:false, aciklama:'{{ACDOCA}}’da alacak **negatif**. ' +
                   'Bu tek gözlem, taşınan sorguların neden bozulduğunu anlatır.' },
          { ad:'Nesne türü', zorunlu:false, aciklama:'{{SE11}} ile doğrulanır: ' +
                   'tablo mu {{uyumluluk-view}} mü?' },
        ],
        ipucu:'⭐ Aynı kalemi {{ACDOCA}}’da ve {{BSIK}}’te yan yana görmek, ' +
              '`SHKZG` farkını anlatmanın en hızlı yoludur.' },

      { ad:'{{FINSC_LEDGER}} — defter ve para birimi',
        aciklama:'Defter yapısının tek yerden görünümü.',
        alanlar:[
          { ad:'Defterler', zorunlu:true, aciklama:'{{lider-defter}} `0L` + ek defterler.' },
          { ad:'⭐ Para birimleri', zorunlu:false, aciklama:'**Sekize kadar**. ' +
                   'Boş slot maliyetsizdir; sonradan eklenen para birimi ' +
                   'geçmişte **boş kalır**.' },
        ],
        ipucu:'⚠️ Defter yapısı bir {{tek-yonlu-kapi}}dır — ' +
              'sonradan açılan deftere **geçmiş yazılmaz**.' },
    ],

    zorunlu:['{{is-ortagi}} kullanımı','Defter yapısı','Hesap planı (masraf türü dahil)'],
    opsiyonel:['{{fiori}} başlatıcı','{{gomulu-analitik}}','{{merkezi-finans}}'],

    hatalar:[
      { mesaj:'Program {{BSIK}}’e yazamıyor', sebep:'⚠️ Artık **görünüm**.', cozum:'Açık kalem **belge kaydıyla** oluşur; yükleme programı uyarlanır.' },
      { mesaj:'Taşınan rapor yanlış toplam veriyor (sıfıra yakın)', sebep:'⭐ `SHKZG` mantığı **iki kez** uygulanmış — {{ACDOCA}} tutarı zaten işaretli.', cozum:'Sorgudan yön mantığı **kaldırılır**. ⚠️ Bu hata **sessizdir**: program çökmez, yanlış sayı üretir.' },
      { mesaj:'Geçiş sonrası kapanış uzadı', sebep:'Özel programlar {{uyumluluk-view}} okuyor.', cozum:'{{SAT}}/{{ST05}} ile ölçülür, kritik programlar {{ACDOCA}}’ya taşınır.' },
      { mesaj:'"Masraf türü bulunamadı"', sebep:'S/4’te masraf türü ayrı nesne değil — G/L hesabının **tipi**.', cozum:'{{FS00}}’da hesap tipi kontrol edilir.' },
      { mesaj:'Satıcı açılmıyor — "iş ortağı zorunlu"', sebep:'{{is-ortagi}} kullanımı zorunlu.', cozum:'{{BP}} ile açılır. {{brownfield}} geçişte {{cvi}} tamamlanmış olmalı.' },
      { mesaj:'IFRS defteri ay içinde eksik görünüyor', sebep:'ECC alışkanlığı — orada periyodik aktarım gerekirdi.', cozum:'⭐ S/4’te **gerçek zamanlıdır**; eksikse defter/{{amortisman-alani}} ataması ({{OADB}}) kontrol edilir.' },
      { mesaj:'Yeni para birimi ekledik ama geçmişte boş', sebep:'⚠️ Beklenen davranış.', cozum:'Geriye dönük doldurulmaz. Para birimi slotları **baştan** açılır.' },
    ],

    ipuclari:[
      '⭐ Tezi hatırla: **"toplamı saklamak yerine hesapla"** — geri kalanı sonuçtur.',
      '⚠️ {{ACDOCA}}’da tutarlar **işaretlidir**; taşınan sorgudan `SHKZG` mantığını **kaldır**.',
      '{{uyumluluk-view}}ler okunur, **yazılamaz** — ve **ücretsiz değildir**.',
      '⭐ Geçiş sonrası ilk soru: *"bu program hangi tabloyu okuyor?"*',
      'FI–CO mutabakatı adımını kapanış listesinden **çıkar**.',
      '{{is-ortagi}} tek giriş yolu; şirket kodu verisi hâlâ {{LFB1}}’de.',
      'Masraf türü artık G/L hesabının **tipi** — sahiplik sorusunu netleştir.',
      '⭐ Her {{amortisman-alani}} **gerçek zamanlı** yazar; IFRS raporu her gün doğru.',
      'Para birimi ve defter slotlarını **baştan** aç — sonradan geçmiş dolmaz.',
      '{{fiori}} arka planda aynı yapılandırmayı kullanır; bilgin **aynen geçerli**.',
      '⚠️ "S/4HANA hızlı" cümlesi **kod uyarlandığı ölçüde** doğrudur.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Belge başlığı — **değişmedi**' },
      { tablo:'ACDOCA', ne:'⭐ Kalemler — FI + CO + AA **tek satırda**' },
      { tablo:'BSIK', ne:'⚠️ Artık **görünüm** — yazılmaz' },
      { tablo:'GLT0', ne:'⚠️ Artık **görünüm** — toplam hesaplanır' },
      { tablo:'BUT000', ne:'{{is-ortagi}} kimliği' },
      { tablo:'LFB1', ne:'Şirket kodu verisi — **kaldı**' },
    ],

    commit:
      'Kayıt anındaki LUW mantığı **değişmedi**: FI ve CO hâlâ aynı ' +
      'iş biriminde çalışır. Değişen, **kaç tabloya yazıldığıdır**.\n\n' +
      '⭐ Yazılan tablo sayısı azaldığı için {{guncelleme-hatasi}} yüzeyi ' +
      'de **daraldı**: eskiden toplam tablosu güncellenemezse ' +
      'kalemler ile bakiye ayrışırdı. Artık ayrışacak ikinci bir yer yok.\n\n' +
      '⚠️ Ama {{SM13}} kontrolü **hâlâ gereklidir** — güncelleme hatası ' +
      'kalkmadı, yalnızca sonucu daha az yıkıcı hâle geldi.',

    belgeNo:
      'Belge numaralandırma **değişmedi**: {{BKPF}} başlığı aynı, ' +
      'numara aralıkları aynı, mali yıl hâlâ anahtarın parçası.\n\n' +
      '⭐ Değişen, kalem numaralandırmasıdır: {{BSEG}}’de `BUZEI` ' +
      '**üç haneliydi** (999 satır sınırı). {{ACDOCA}}’da `DOCLN` ' +
      '**altı hanelidir** — belge bölme ve çok defterli kayıtlar ' +
      'çok daha fazla satır ürettiği için gerekliydi.\n\n' +
      '⚠️ Eski `BUZEI` sınırına takılan özel programlar bu farkı ' +
      'hesaba katmalıdır.',

    postingLogic:
      'Kayıt mantığı **katman katman** aynı kaldı:\n\n' +
      '**1.** Doğrulama ve {{konu:dogrulama-ikame}} kuralları — aynı\n' +
      '**2.** Hesap belirleme ({{T030}}, {{OBYC}}, {{VKOA}}) — aynı\n' +
      '**3.** Vergi hesaplama ({{BSET}}) — aynı\n' +
      '**4.** {{belge-bolme}} — aynı mantık, sonuç {{ACDOCA}}’ya yazılır\n' +
      '**5.** ⭐ Yazma — **burada değişti**: tek tablo\n\n' +
      '⭐ **Bu yüzden FI yapılandırma bilginiz aynen geçerlidir.** ' +
      'S/4HANA yeni bir muhasebe sistemi değil, aynı muhasebenin ' +
      '**farklı saklanmasıdır**.',

    belgeTuru:
      'Belge türü mantığı değişmedi. Tek fark: {{ACDOCA}} satırları ' +
      '**defter bazında** çoğaldığı için aynı belge birden çok defterde ' +
      'satır üretir ve `RLDNR` anahtarın parçasıdır.\n\n' +
      'Yani `BELNR` + `DOCLN` tek başına bir satırı **belirlemez** — ' +
      '`RLDNR` de gerekir. Özel raporlarda sık atlanan bir ayrıntıdır ve ' +
      '**tutarları defter sayısı kadar katlar**.',

    accountDetermination:
      'Hesap belirleme tabloları **aynen duruyor**: {{T030}}, {{OBYC}}, ' +
      '{{VKOA}}, {{T030K}}, {{T074}}.\n\n' +
      '⭐ Tek anlamlı değişiklik masraf türü tarafında: ' +
      'G/L hesabı açılırken **hesap tipi** seçilir ve bu, ' +
      'ECC’de {{CSKB}}’de yapılan işin yerine geçer.\n\n' +
      '⚠️ {{brownfield}} geçişte bu bir hazırlık adımıdır: ' +
      'eşleşmeyen masraf türleri dönüşümü **durdurur**.',

    tur:
      '**Dört öbek, tek sebep:**\n\n' +
      '**① Veri mimarisi** — {{ACDOCA}}, kalkan {{toplam-tablosu}}ları ve ' +
      'indeks tabloları. ⭐ Tezin doğrudan sonucu.\n\n' +
      '**② Ana veri** — {{is-ortagi}}, masraf türü birleşmesi. ' +
      'Tekilleştirme mantığının ana veriye uygulanması.\n\n' +
      '**③ Süreç** — Yeni Varlık Muhasebesi, {{gomulu-analitik}}. ' +
      'Hesaplama ucuzlayınca gerçek zamanlı hâle gelenler.\n\n' +
      '**④ Arayüz ve dağıtım** — {{fiori}}, bulut sürümleri, ' +
      '{{merkezi-finans}}. ⚠️ **Bu öbek tezden bağımsızdır** ve ' +
      'ayrı değerlendirilir.',

    transport:
      'Taşıma mekanizması **değişmedi** ({{SE09}}, {{STMS}}, {{E070}}/{{E071}}). ' +
      '{{akim-verisi}} kavramı da aynen duruyor.\n\n' +
      '⚠️ Değişen tek şey **taşınacak kod miktarıdır**: ' +
      '{{z-gelistirme}} envanteri artık yalnızca bir bakım yükü değil, ' +
      '{{basitlestirme-listesi}}’nde çıkan bir **geçiş engelidir** ' +
      '(bkz. {{konu:best-practices}}).',

    img:[
      { yol:'FINSC_LEDGER → Defter ve para birimi tanımları', not:'⚠️ **Tek yönlü kapı**' },
      { yol:'FS00 → Hesap tipi (masraf türü)', not:'⭐ ECC’deki CSKB’nin yerine' },
      { yol:'BP → İş ortağı rol tanımları', not:'{{cvi}} eşlemesiyle birlikte' },
      { yol:'OADB → Amortisman alanı ↔ defter köprüsü', not:'Gerçek zamanlı yazma buradan' },
    ],

    ekstra:[
      { ic:'⚖️', baslik:'⭐ SHKZG → HSL: tek alanın maliyeti', metin:
        'Bu, S/4HANA geçişinin **en ucuz görünen, en pahalı** ayrıntısıdır.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Eski dünya — {{BSEG}}.`DMBTR`**\n\n' +
        'Tutar **her zaman pozitif**. Yön ayrı alanda: `SHKZG` = S / H.\n\n' +
        'Bir satıcı bakiyesi hesaplamak için ABAP kodu şöyle yazılırdı:\n\n' +
        '`LOOP AT items. IF SHKZG = "H". total = total - DMBTR. ` ' +
        '`ELSE. total = total + DMBTR. ENDIF. ENDLOOP.`\n\n' +
        '**Yeni dünya — {{ACDOCA}}.`HSL`**\n\n' +
        'Tutar **işaretli**. Alacak zaten negatif. Toplam:\n\n' +
        '`SELECT SUM( HSL ) FROM ACDOCA WHERE ...`\n\n' +
        '━━━━━━━━━━\n\n' +
        '⚠️ **Şimdi tuzağa bakın:** eski program {{ACDOCA}}’ya taşınır ' +
        'ama `SHKZG` bloğu **silinmez**. Ne olur?\n\n' +
        'Alacak satırı zaten −60.000’dir. Program *"alacak, o hâlde çıkar"* ' +
        'der ve **+60.000** yapar. Borç satırları da toplanır.\n\n' +
        '**Sonuç: borçlar ve alacaklar birbirini götürür ve toplam ' +
        'sıfıra yakın çıkar.**\n\n' +
        '⭐ **Ve bu hata sessizdir:**\n\n' +
        '• Program **çökmez** — dump yok\n' +
        '• Sorgu **çalışır** — hata mesajı yok\n' +
        '• Sonuç **makul görünür** — özellikle kontrol raporlarında ' +
        'sıfıra yakın bir fark "her şey tutuyor" gibi okunur\n\n' +
        '⚠️ Bu, {{konu:error-handling}}’deki **② sessiz hata** sınıfının ' +
        'S/4HANA geçişine özgü hâlidir ve gerçek senaryoda ' +
        'sekiz ay boyunca fark edilmemiştir.\n\n' +
        '**Önlem tek satırlık bir kontroldür:** taşınan her raporun toplamı ' +
        'geçişten sonra **bir kez** {{FS10N}} mizanıyla karşılaştırılır.' },

      { ic:'🌉', baslik:'Uyumluluk view’i bir köprüdür, bir çözüm değil', metin:
        '{{uyumluluk-view}}ler geçişi **mümkün kılan** şeydir: ' +
        'binlerce özel program eski tabloları okuduğu hâlde ' +
        'geçişten sonra çalışmaya devam eder.\n\n' +
        'Ama iki şey **söylenmez** ve ikisi de önemlidir:\n\n' +
        '━━━━━━━━━━\n\n' +
        '**1. ⚠️ Ücretsiz değildir.**\n\n' +
        'ECC’de {{BSIS}} **fiziksel bir tabloydu** ve kendi indeksi vardı. ' +
        'S/4HANA’da aynı isim bir **görünümdür** ve her çağrıda ' +
        '{{ACDOCA}}’dan hesaplanır.\n\n' +
        'Tek seferlik sorguda fark edilmez. ⚠️ Ama bir **döngü içinde** ' +
        'çağrılıyorsa maliyet çarpılır — ve eski ABAP kodu ' +
        'döngü içinde okumaya alışkındır.\n\n' +
        '**2. ⚠️ Birebir değildir.**\n\n' +
        'Görünüm alan **adlarını** korur ama {{ACDOCA}}’nın semantiği ' +
        'farklıdır. `SHKZG` bunun en görünür örneğidir; ' +
        'ama tek örneği değildir — defter boyutu (`RLDNR`) de ' +
        'eski sorgularda **hiç yoktu** ve dikkate alınmazsa ' +
        'tutarlar **defter sayısı kadar katlanır**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Doğru kullanım:** görünümler geçişin **ilk gününde** ' +
        'her şeyin çalışmasını sağlar. Sonrasında kritik programlar ' +
        '(kapanış, mutabakat, yasal rapor) **ölçülür** ve ' +
        '{{ACDOCA}}’ya taşınır.\n\n' +
        'Taşınmayanlar kalabilir — ama **bilinçli olarak** kalmalıdır, ' +
        'unutuldukları için değil.' },

      { ic:'🔢', baslik:'Sekiz para birimi ve "boş slot maliyetsizdir" kuralı', metin:
        'ECC’de bir şirket kodu **iki** para birimi taşırdı ' +
        '(yerel + isteğe bağlı iki paralel alan). {{ACDOCA}} ' +
        '**sekize kadar** taşır.\n\n' +
        'Bu, teknik bir kapasite artışı gibi görünür. Aslında ' +
        'bir **karar kolaylığıdır**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '⚠️ **Neden önemli:** para birimi bir {{tek-yonlu-kapi}}dır. ' +
        'Sonradan eklenen bir para birimi **geçmiş kayıtlarda boş kalır** — ' +
        'yani raporlama açısından işe yaramaz.\n\n' +
        'ECC’de iki slot vardı ve ikisi de genelde doluydu; ' +
        '*"grup para birimi lazım olur mu?"* sorusu gerçek bir ' +
        'kısıt altında tartışılırdı.\n\n' +
        '⭐ S/4HANA’da soru kolaylaştı: **boş slot maliyetsizdir.** ' +
        'İhtimal varsa açılır ve kullanılmaz.\n\n' +
        'Aynı ilke defterler için de geçerlidir: kullanılmayan bir ' +
        '{{ifrs}} defteri neredeyse bedavadır; ' +
        'sonradan açılan bir defterde **geçmiş yoktur**.\n\n' +
        '⭐ Bu, {{konu:best-practices}}’teki *"şüphedeyken açık kur, ' +
        'kullanma"* kuralının en somut uygulamasıdır.' },
    ],

    notlar:[
      { tip:'tip', baslik:'S/4HANA neyi DEĞİŞTİRMEDİ — ve bu neden iyi haber', metin:
        'Geçiş projelerinde en çok zaman kaybettiren şey, ' +
        '**değişmeyen şeylerin de değiştiğini sanmaktır**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Aynen duran her şey:**\n\n' +
        '• Çift taraflı kayıt ve borç–alacak dengesi\n' +
        '• {{mutabakat-hesabi}} mantığı ve `AKONT` ({{LFB1}}’de)\n' +
        '• Hesap belirleme tabloları ({{T030}}, {{OBYC}}, {{VKOA}}, {{T030K}})\n' +
        '• Vergi mantığı ve {{BSET}}\n' +
        '• {{belge-bolme}} kuralları\n' +
        '• {{konu:dogrulama-ikame}} kural motoru ({{GGB0}}, {{OB28}}, {{GGB4}})\n' +
        '• Dönem kapama ({{OB52}}) ve kapanış sırası\n' +
        '• {{BKPF}}, belge türleri, numara aralıkları\n' +
        '• Taşıma disiplini ({{SE09}}, {{STMS}}, {{akim-verisi}})\n' +
        '• {{acik-kalem}} yönetimi ve kapatma mantığı\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Yani FI bilginizin büyük kısmı doğrudan taşınır.** ' +
        'Öğrenilmesi gereken şey yeni bir muhasebe değil, ' +
        '**verinin nerede durduğu** ve bunun sorgulara etkisidir.\n\n' +
        'Bu konudaki her yeniliğin **bu tek cümleye** bağlanabilmesi ' +
        'de zaten tezin kendisidir.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Bu konunun kendisi S/4HANA hakkında olduğu için bu bölüm ' +
      '**bir kademe yukarı** bakıyor: S/4HANA’nın kendi **sürümleri** ' +
      'arasındaki farklar ve hangisinin ne zaman seçildiği.',

    eccFarklari:[
      { konu:'Dağıtım', ecc:'Yalnızca yerinde', s4:'Yerinde · Özel bulut · **Genel bulut**' },
      { konu:'Yapılandırma erişimi', ecc:'Tam {{SPRO}}', s4:'⚠️ Genel bulutta **kısıtlı** — rehberli yapılandırma' },
      { konu:'{{z-gelistirme}}', ecc:'Serbest', s4:'⚠️ Genel bulutta **yalnızca genişletme** — modifikasyon yok' },
      { konu:'Sürüm yükseltme', ecc:'Müşteri kararı', s4:'Genel bulutta **zorunlu ve düzenli**' },
      { konu:'Veri geçişi aracı', ecc:'{{LSMW}}', s4:'{{LTMC}} — genel bulutta **tek yol**' },
      { konu:'Türkiye yerelleştirmesi', ecc:'Add-on ve özel geliştirme yaygın', s4:'⚠️ Bulutta add-on **kısıtlı** — {{konu:e-donusum}} planlanmalı' },
      { konu:'Muhasebe mantığı', ecc:'Aynı', s4:'⭐ **Üç sürümde de aynı**' },
    ],

    universalJournal:
      '{{evrensel-kayit-defteri}} **üç dağıtım modelinde de aynıdır**. ' +
      'Bulut ile yerinde arasındaki fark veri modelinde değil, ' +
      '**erişim ve değiştirme özgürlüğündedir**.\n\n' +
      '⭐ Bu, öğrenme açısından iyi haberdir: {{ACDOCA}} bilgisi ' +
      'hangi sürümde çalışırsanız çalışın geçerlidir.',

    kalkanTcodes:[
      { eski:'{{GLT0}} okuyan raporlar', yeni:'{{FAGLL03}} / {{FS10N}}', not:'Aynı sonuç, {{ACDOCA}}’dan' },
      { eski:'FI–CO mutabakat programları', yeni:'**Gereksiz**', not:'⭐ Yapısal olarak imkânsız' },
      { eski:'{{XK01}} / {{XD01}} (tek yol olarak)', yeni:'**{{BP}}**', not:'⚠️ Eskiler çalışır ama tek doğru yol BP' },
      { eski:'{{CSKB}} masraf türü bakımı', yeni:'{{FS00}} hesap tipi', not:'Tek nesne' },
      { eski:'Periyodik amortisman aktarımı', yeni:'**Gerçek zamanlı**', not:'Her defter anında' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'Belge girişi ve görüntüleme; ' +
             'arka planda **aynı** yapılandırma.' },
      { ad:'Trial Balance', aciklama:'⭐ {{gomulu-analitik}} örneği — ' +
             'mizan **canlı veriden**, aktarım yok.' },
      { ad:'Display Line Items', aciklama:'{{FBL1N}}/{{FBL5N}} karşılığı; ' +
             'kalemler {{ACDOCA}}’dan okunur.' },
      { ad:'Custom Fields and Logic', aciklama:'⭐ Modifikasyonsuz alan ekleme — ' +
             '{{z-gelistirme}} borcunu düşürür (bkz. {{konu:best-practices}}).' },
    ],

    compatibilityViews:[
      '⭐ **Üç dağıtım modelinde de aynı kural:** eski tablolar ' +
      '{{uyumluluk-view}} olarak okunur, **yazılamaz**.',
      '⚠️ Genel bulutta {{SE16N}} ile ham tablo erişimi de **kısıtlıdır** — ' +
      'teşhis alışkanlıkları değişir; {{cds-view}} ve Fiori uygulamaları kullanılır.',
      'Görünümler geçişi mümkün kılar ama **kalıcı çözüm değildir**: ' +
      'kritik programlar ölçülüp {{ACDOCA}}’ya taşınır.',
    ],

    performans:
      '⚠️ **Bu konudaki en yaygın yanılgı:** *"S/4HANA hızlı, ' +
      'o hâlde her şey hızlanacak."*\n\n' +
      'Gerçek üç parçalıdır:\n\n' +
      '**1. Standart işlemler** — genelde hızlanır; toplam tablosu ' +
      'güncellemeleri kalktı.\n\n' +
      '**2. Standart raporlar** — hızlanır; {{ACDOCA}}’dan doğrudan okurlar.\n\n' +
      '**3. ⚠️ Özel programlar** — **uyarlanmazsa yavaşlayabilir**. ' +
      'Eski tabloları okuyan kod {{uyumluluk-view}} üzerinden çalışır ' +
      've sonuç okuma anında hesaplanır.\n\n' +
      '⭐ **Ölçüm olmadan tahmin edilmez:** {{SAT}} ve {{ST05}} ile ' +
      '**gerçek hacimde** ölçülür. Küçük test verisinde ' +
      'uyumluluk view’i ucuz görünür ve yanıltır.',

    bestPractices:[
      '⭐ Tezi öğren, listeyi değil: **"toplamı saklamak yerine hesapla."**',
      '⚠️ Taşınan her sorgudan `SHKZG` mantığını **kaldır**.',
      'Taşınan her raporu geçişten sonra **bir kez** {{FS10N}} ile karşılaştır.',
      'Kapanış listesinden **FI–CO mutabakatını çıkar**.',
      '⭐ Geçiş sonrası ilk 30 günde kritik programları {{SAT}} ile **ölç**.',
      'Defter ve para birimi slotlarını **baştan** aç.',
      '{{is-ortagi}} numaralandırma stratejisini **geçişten önce** kararlaştır.',
      'Masraf türü listesinin **sahibini** netleştir (muhasebe mi, kontrolörlük mü).',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'"Geçtik ama kapanış uzadı" — ve sekiz aydır yanlış olan rapor',
    hikaye:
      '**Trakya Cam Sanayi A.Ş.** {{brownfield}} yöntemiyle S/4HANA’ya geçti. ' +
      'Dönüşüm teknik olarak sorunsuzdu; kullanıcılar ekranlarını ' +
      'tanıdı, muhasebe aynı şekilde çalıştı.\n\n' +
      'Yönetime verilen gerekçelerden biri şuydu: ' +
      '*"ay sonu kapanış kısalacak."*\n\n' +
      '━━━━━━━━━━\n\n' +
      'İlk üç ay sonunda ölçüm alındı:\n\n' +
      '**Geçiş öncesi kapanış: 3 gün**\n' +
      '**Geçiş sonrası kapanış: 4,5 gün**\n\n' +
      'Kapanış kısalmamış, **uzamıştı**.\n\n' +
      'Mali işler müdürü haklı olarak sordu: ' +
      '*"Hani hızlı olacaktı?"*',
    veriler:[
      { k:'Yaklaşım', v:'{{brownfield}} — yerinde dönüşüm' },
      { k:'Özel program sayısı', v:'**214** (`Z_FI_*`)' },
      { k:'Kapanış — önce', v:'3 gün' },
      { k:'⚠️ Kapanış — sonra', v:'**4,5 gün**' },
      { k:'Beklenti', v:'Kısalması' },
      { k:'Hata mesajı', v:'**Yok** — her şey çalışıyor' },
    ],

    adimlar:[
      { baslik:'Zaman nerede harcanıyor?', tcode:'SM37',
        aciklama:'Ölçümle başlanıyor — tahminle değil.',
        girdi:[
          { alan:'Kapanış işleri', deger:'Toplam **41 arka plan işi**' },
          { alan:'En uzun 3 iş', deger:'⚠️ Sürenin **%71’i**' },
          { alan:'Üçünün türü', deger:'Hepsi özel program (`Z_FI_*`)' },
          { alan:'Standart işler', deger:'✅ Hepsi **hızlanmış**' },
        ],
        not:'⭐ **İlk bulgu tezi doğruluyor.**\n\n' +
             'Standart işler ({{AFAB}}, {{F.05}}, {{FAGLGVTR}}) gerçekten ' +
             '**hızlanmıştı** — toplam tablosu güncellemeleri kalkmıştı.\n\n' +
             '⚠️ Yavaşlayan yalnızca **özel programlardı** ve ' +
             'onlar sürenin çoğunu tutuyordu.\n\n' +
             'Yani *"S/4HANA hızlı"* cümlesi doğruydu; ' +
             'eksik olan ikinci yarısıydı: **"uyarlanmış kod için."**' },

      { baslik:'Bu üç program ne yapıyor?', tcode:'SAT',
        aciklama:'Çalışma zamanı analizi.',
        girdi:[
          { alan:'Sürenin dağılımı', deger:'⚠️ **%86 veritabanında**' },
          { alan:'Z_FI_MIZAN', deger:'{{BSIS}} okuyor' },
          { alan:'Z_FI_YASLANDIRMA', deger:'{{BSIK}} okuyor' },
          { alan:'Z_FI_MUTABAKAT', deger:'{{BSAS}} okuyor' },
          { alan:'Ortak nokta', deger:'⭐ **Üçü de {{uyumluluk-view}}**' },
        ],
        not:'⭐ **Sorun bulundu.**\n\n' +
             'ECC’de {{BSIS}} **fiziksel bir tabloydu** ve kendi indeksi vardı; ' +
             'okuma ucuzdu.\n\n' +
             'S/4HANA’da aynı isim bir **görünümdür** ve her çağrıda ' +
             '{{ACDOCA}}’dan **hesaplanır**.\n\n' +
             '⚠️ Üstelik üç program da bunu **döngü içinde** yapıyordu — ' +
             'eski ABAP alışkanlığı. Tek sorguda fark edilmeyecek bir maliyet, ' +
             'binlerce çağrıda çarpıldı.\n\n' +
             '{{ST05}} SQL izi bunu doğruladı: her çağrı {{ACDOCA}} taraması ' +
             'üretiyordu.' },

      { baslik:'Programları taşırken bir şey daha çıktı', tcode:'SE16N',
        aciklama:'Z_FI_MIZAN {{ACDOCA}}’ya taşınıyor — ve sonuç karşılaştırılıyor.',
        girdi:[
          { alan:'Yeni sürüm sonucu', deger:'Toplam borç 84.200.000' },
          { alan:'Eski sürüm sonucu', deger:'⚠️ Toplam borç **1.340.000**' },
          { alan:'{{FS10N}} mizanı', deger:'84.200.000 ✓' },
          { alan:'Çıkarım', deger:'⚠️ **Eski rapor sekiz aydır yanlış**' },
        ],
        not:'⚠️ **Asıl bulgu burada — ve aranmıyordu.**\n\n' +
             'Program {{BSIS}} okurken `SHKZG` mantığını uyguluyordu: ' +
             '*"alacaksa çıkar."* ECC’de doğruydu, çünkü tutarlar ' +
             '**hep pozitifti**.\n\n' +
             '{{uyumluluk-view}} bu alanı **koruyor** ama tutar zaten ' +
             '{{ACDOCA}}’dan geliyor ve **işaretli**.\n\n' +
             '⭐ Sonuç: alacak satırlarına işaret **iki kez** uygulanıyor, ' +
             'pozitife dönüyorlar ve borçlarla birbirlerini götürüyorlar. ' +
             'Toplam **sıfıra yakın** çıkıyor.\n\n' +
             '⚠️ **Neden sekiz ay fark edilmedi:**\n\n' +
             '• Program **çökmedi** — dump yok\n' +
             '• Sorgu **çalıştı** — hata mesajı yok\n' +
             '• Rapor bir **kontrol** raporuydu ve sıfıra yakın fark ' +
             '*"her şey tutuyor"* gibi okundu\n' +
             '• Kimse sonucu {{FS10N}} mizanıyla **karşılaştırmadı**' },

      { baslik:'Ne yapıldı?', tcode:'FAGLL03',
        aciklama:'Düzeltme ve tarama.',
        girdi:[
          { alan:'1. adım', deger:'Üç program {{ACDOCA}}’ya taşındı' },
          { alan:'Kapanış', deger:'⭐ **4,5 günden 2 güne** indi' },
          { alan:'2. adım', deger:'⚠️ **214 programın tamamı** tarandı' },
          { alan:'`SHKZG` kullanan', deger:'**31 program**' },
          { alan:'Yanlış sonuç veren', deger:'⚠️ **9 program**' },
          { alan:'3. adım', deger:'Her taşınan rapor {{FS10N}} ile **karşılaştırıldı**' },
        ],
        not:'Kapanış beklenenden de iyi geldi: **3 günden 2 güne**. ' +
             'Yani S/4HANA vaadi doğruydu — yalnızca **kod uyarlanınca**.\n\n' +
             '⚠️ Ama asıl kazanç bu değildi: tarama **dokuz yanlış rapor** buldu. ' +
             'Üçü yönetim raporlamasında kullanılıyordu.\n\n' +
             '⭐ Kalıcı önlem bir satırlık bir kural oldu:\n\n' +
             '**"S/4HANA’ya taşınan her rapor, ilk çalıştırmasında ' +
             '{{FS10N}} mizanıyla karşılaştırılır."**\n\n' +
             'Bu kontrol beş dakika sürüyor ve dokuz raporun sekizini ' +
             'ilk ayda yakalardı.' },
    ],

    sonuc:
      '⭐ **Bu senaryoda iki ayrı hata vardı ve biri diğerini gizledi.**\n\n' +
      'Görünen hata **performanstı** ve şikâyet edildi. ' +
      'Görünmeyen hata **yanlış rapordu** ve sekiz ay boyunca ' +
      'kimse şikâyet etmedi — çünkü rapor bir sayı üretiyordu ve ' +
      'sayı makul görünüyordu.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Üç kalıcı ders:**\n\n' +
      '**1. Kaldırılan tablo geri getirilmedi — taklit edildi.**\n' +
      '⭐ Ve taklit iki şeyi vaat etmez: **ücretsiz olmayı** ve ' +
      '**birebir olmayı**.\n\n' +
      'Ücretsiz değil, çünkü okuma anında hesaplanır. ' +
      'Birebir değil, çünkü `SHKZG` semantiği değişti.\n\n' +
      '⚠️ **Ve ikinci fark sessizdir** — birincisi şikâyet üretir, ' +
      'ikincisi üretmez.\n\n' +
      '**2. "S/4HANA hızlı" cümlesinin eksik yarısı vardır.**\n' +
      'Tamamı şudur: **"uyarlanmış kod için hızlı."** ' +
      'Uyarlanmamış kod için {{uyumluluk-view}} bir **köprüdür** — ' +
      'geçişi mümkün kılar, bedava yapmaz.\n\n' +
      'Bu yüzden kod uyarlama, geçiş bütçesinin bir kalemidir; ' +
      'geçiş sonrası bir sürpriz değil.\n\n' +
      '**3. ⭐ Taşınan her raporun bir doğrulama noktası olmalıdır.**\n' +
      'Beş dakikalık bir karşılaştırma ({{FS10N}} mizanı) ' +
      'dokuz yanlış raporun sekizini ilk ayda yakalardı.\n\n' +
      'Bu, {{konu:best-practices}}’teki ilkenin somut hâlidir: ' +
      '**her sessiz hata sınıfı bir kontrol sorgusuna çevrilir.**\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ Ve dikkat: bu senaryodaki hiçbir bulgu **yeni bir SAP bilgisi** ' +
      'gerektirmedi. Gereken tek şey konunun tezini bilmekti — ' +
      '**"toplam artık saklanmıyor, hesaplanıyor"** — ve bunun ' +
      'sorgulara ne yaptığını sormaktı.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '⭐ **Tez:** S/4HANA’daki değişikliklerin neredeyse tamamı tek bir cümlenin ' +
      'sonucudur — **"toplamı saklamak yerine her seferinde hesapla."**',
      'Çoğu yenilik **yeni bir özellik değil**, gereksizleşen bir çözümün kaldırılmasıdır.',
      '{{toplam-tablosu}}ları ({{GLT0}}, {{FAGLFLEXT}}, {{KNC1}}, {{LFC1}}) ve ' +
      'indeks tabloları ({{BSIK}}, {{BSID}}, {{BSIS}}) **kalktı** → {{uyumluluk-view}}.',
      '⭐ **Asıl kazanç hız değil tutarlılık:** hesaplanan toplam kalemlerle **ayrışamaz**. ' +
      'FI–CO mutabakatı **yapısal olarak gereksiz**.',
      '⚠️ **{{ACDOCA}}’da tutarlar işaretlidir** (alacak negatif); {{BSEG}}’de ' +
      'pozitif + `SHKZG` idi. Taşınan sorgudan yön mantığı **kaldırılmalı**.',
      '{{is-ortagi}} zorunlu — ama şirket kodu verisi hâlâ {{LFB1}}’de.',
      '{{masraf-turu}} artık G/L hesabının **tipi**; ayrı nesne değil.',
      '⭐ Her {{amortisman-alani}} **gerçek zamanlı** kendi defterine yazar; delta kalktı.',
      '{{fiori}} yeni bir GUI değil, **görev merkezli** bir arayüz katmanı.',
      '⚠️ **"S/4HANA hızlı"** cümlesinin eksik yarısı: **uyarlanmış kod için**.',
      '⭐ Muhasebe mantığı, hesap belirleme ve yapılandırma bilgisi **aynen geçerli**.',
    ],

    onemliNoktalar:[
      '**"S/4HANA\'nın en önemli yeniliği nedir?"** Liste sayma: ⭐ **tek cümle** söylenir — **"toplamı saklamak yerine her seferinde hesapla."** {{bellek-ici}} veritabanı bir kısıtı ("diskten okumak pahalıdır") kaldırdı; o kısıt için var olan yapılar ({{toplam-tablosu}}ları, indeks tabloları, mutabakat defteri, gecelik toplu işler) **gereksizleşti**. Yani basitleştirmelerin çoğu yeni bir özellik değil, **bir çözümün kaldırılmasıdır**. {{ACDOCA}}, {{is-ortagi}}, kalkan tcode\'lar — hepsi bu cümlenin sonucu.',
      '**"ACDOCA ne kazandırdı?"** Hız ikinci sıradadır. ⭐ **Birinci kazanç tutarlılıktır:** saklanan bir toplam kalemlerle **ayrışabilir** (güncelleme yarıda kalır, mizan ile döküm tutmaz); hesaplanan bir toplam ayrışamaz. İkinci kazanç **tek satır kaynağıdır**: aynı satır hem `RACCT` (G/L) hem `RCNTR` (maliyet yeri) taşıdığı için **FI–CO ayrışması yapısal olarak imkânsız** — ay sonu mutabakat adımı **silinmelidir**.',
      '**"Eski raporlarım çalışmaya devam eder mi?"** Evet — {{uyumluluk-view}} sayesinde. ⚠️ **Ama iki şey vaat edilmez:** **①** **ücretsiz değil** — ECC\'de {{BSIS}} fiziksel tabloydu, artık her çağrıda {{ACDOCA}}\'dan hesaplanıyor; döngü içinde okuyan eski ABAP kodu **yavaşlar**. **②** **birebir değil** — `SHKZG` semantiği değişti ve defter boyutu (`RLDNR`) eski sorgularda **hiç yoktu**. ⭐ Görünüm bir **köprüdür**, kalıcı çözüm değil.',
      '**"BSEG ile ACDOCA arasındaki en tehlikeli fark nedir?"** ⭐ **Tutarın işareti.** {{BSEG}}\'de tutarlar **hep pozitifti**, yön ayrı alandaydı (`SHKZG` = S/H). {{ACDOCA}}\'da tutarlar **işaretlidir** — alacak negatif. ⚠️ Taşınan sorgudan `SHKZG` mantığı **kaldırılmazsa işaret iki kez uygulanır**: alacaklar pozitife döner, borçlarla birbirlerini götürür ve toplam **sıfıra yakın** çıkar. Ve bu hata **sessizdir**: program çökmez, sorgu çalışır, sonuç makul görünür.',
      '**"İş Ortağı zorunluluğu ne değiştirdi?"** Kimlik katmanını. ECC\'de aynı firma hem satıcı hem müşteriyse **iki ayrı kayıt** açılır ve adres verileri zamanla **ayrışırdı**. Artık tek kimlik ({{BUT000}}), çok **rol**. ⚠️ **Yanlış anlaşılan nokta:** şirket kodu verisi **kaybolmadı** — `AKONT` {{mutabakat-hesabi}} hâlâ {{LFB1}}\'de. ⚠️ {{brownfield}} geçişte {{cvi}} dönüşümü **ön koşuldur** ve teknik dönüşümden **önce** yapılır.',
      '**"Masraf türü nereye gitti?"** G/L hesabıyla **birleşti**: {{masraf-turu}} artık ayrı bir nesne ({{CSKB}}) değil, G/L hesabının **hesap tipidir** ({{FS00}}\'da seçilir). Üç sonucu var: **①** masraf türü açmak = G/L hesabı açmak (iki adım tek adım) · **②** ⚠️ **sahiplik sorusu** — hesap planı muhasebenin, masraf türleri kontrolörlüğün alanıydı; artık tek liste var · **③** ⚠️ brownfield geçişte eşleşmeyen masraf türleri dönüşümü **durdurur**.',
      '**"Yeni Varlık Muhasebesi\'nde ne değişti?"** ⭐ **{{amortisman-alani}} = defter** ve her alan **gerçek zamanlı** kendi defterine **tam tutarla** yazar. ECC\'de yalnızca alan 01 gerçek zamanlıydı; diğerleri **periyodik** ve **delta** kayıtlarıyla aktarılırdı — yani IFRS defteri ay içinde **eksikti** ve rapor alınamazdı. Artık IFRS raporu ayın herhangi bir günü **doğrudur**. Ayrıca planlanan amortisman **anında hesaplanır** ({{ANLC}}\'de saklanan bir toplamdan değil), {{AW01N}} bu yüzden hep günceldir.',
      '**"Geçiş sonrası kapanış uzadı, neden?"** ⭐ İlk soru: **"bu programlar hangi tabloyu okuyor?"** Cevap bir {{uyumluluk-view}} ise sorun bulunmuştur. Teşhis: {{SM37}} (en uzun işler) → {{SAT}} (süre nerede) → {{ST05}} (üretilen SQL). ⚠️ Standart işler genelde **hızlanır**; yavaşlayan özel programlardır ve süre payının çoğunu onlar tutar. Çözüm: kritik programlar {{ACDOCA}}\'ya taşınır. ⚠️ Ölçüm **gerçek hacimle** yapılır — küçük test verisinde uyumluluk view\'i ucuz görünür.',
      '**"S/4HANA\'da FI bilgim geçerli mi?"** ⭐ **Büyük ölçüde evet.** Aynen duranlar: çift taraflı kayıt · {{mutabakat-hesabi}} mantığı ve `AKONT` · hesap belirleme ({{T030}}, {{OBYC}}, {{VKOA}}, {{T030K}}) · vergi ve {{BSET}} · {{belge-bolme}} kuralları · doğrulama/ikame motoru · {{OB52}} ve kapanış sırası · {{BKPF}}, belge türleri, numara aralıkları · taşıma disiplini · {{acik-kalem}} yönetimi. Öğrenilmesi gereken yeni bir muhasebe değil, **verinin nerede durduğu** ve bunun **sorgulara etkisidir**.',
    ],

    sikHatalar:[
      { hata:'S/4HANA yeniliklerini birbirinden bağımsız bir liste olarak öğrenmek.', dogru:'⭐ Neredeyse hepsi **tek bir cümlenin** sonucu: "toplamı saklamak yerine hesapla."' },
      { hata:'"S/4HANA hızlı, raporlarım hızlanır" varsaymak.', dogru:'⚠️ Cümlenin eksik yarısı: **uyarlanmış kod için**. Eski kod {{uyumluluk-view}} üzerinden **yavaşlayabilir**.' },
      { hata:'Taşınan sorguda `SHKZG` mantığını bırakmak.', dogru:'⚠️ İşaret **iki kez** uygulanır, toplam sıfıra yakın çıkar — ve hata **sessizdir**.' },
      { hata:'{{BSIK}} / {{BSIS}} tablolarına yazmaya çalışmak.', dogru:'Artık **görünüm**. Açık kalem **belge kaydıyla** oluşur.' },
      { hata:'Uyumluluk view’ini kalıcı çözüm saymak.', dogru:'⭐ Bir **köprüdür**. Kritik programlar ölçülüp {{ACDOCA}}’ya taşınır.' },
      { hata:'Kapanış listesinde FI–CO mutabakatını tutmaya devam etmek.', dogru:'⭐ **Yapısal olarak gereksiz** — her ay boşuna zaman.' },
      { hata:'{{is-ortagi}} gelince {{LFB1}}’in kalktığını sanmak.', dogru:'⚠️ **Kalmadı, duruyor.** `AKONT` {{mutabakat-hesabi}} hâlâ orada.' },
      { hata:'Masraf türünü ayrı nesne olarak aramak.', dogru:'G/L hesabının **tipi** ({{FS00}}). ⚠️ Brownfield’de hazırlık gerektirir.' },
      { hata:'IFRS defterinin ay içinde eksik olduğunu varsaymak (ECC alışkanlığı).', dogru:'⭐ Artık **gerçek zamanlı**. Eksikse {{OADB}} ataması kontrol edilir.' },
      { hata:'Para birimi veya defteri "sonra ekleriz" diye boş bırakmak.', dogru:'⚠️ Sonradan eklenen **geçmişte boş kalır**. Boş slot **maliyetsizdir** — baştan aç.' },
      { hata:'{{fiori}}’yi "yeni görünümlü GUI" sanmak.', dogru:'İşlem merkezli değil **görev merkezli**; rol tasarımı artık **arayüz tasarımıdır**.' },
      { hata:'Gömülü analitiğin veri ambarının yerini aldığını sanmak.', dogru:'⚠️ Almaz. Çok kaynaklı birleştirme ve uzun tarihçe hâlâ ayrı çözüm ister.' },
      { hata:'Taşınan raporu doğrulamadan kullanmaya başlamak.', dogru:'⭐ İlk çalıştırmada {{FS10N}} mizanıyla **karşılaştır** — beş dakika.' },
      { hata:'Performansı küçük test verisiyle ölçmek.', dogru:'⚠️ Uyumluluk view’i küçük veride **ucuz görünür**. Ölçüm gerçek hacimde yapılır.' },
    ],

    ipuclari:[
      '⭐ Tezi ezberle, listeyi değil: **"toplamı saklamak yerine hesapla."**',
      'Yeni bir şey duyduğunda sor: *"bu hangi kısıt kalktığı için gereksizleşti?"*',
      '⚠️ {{ACDOCA}}’da `HSL` **işaretlidir** — {{SE16N}}’de gözle doğrula.',
      'Taşınan her sorgudan `SHKZG` mantığını **kaldır**.',
      '⭐ Taşınan her raporu ilk çalıştırmada {{FS10N}} ile karşılaştır.',
      'Geçiş sonrası ilk 30 günde kritik programları {{SAT}} ile **ölç**.',
      'Ölçümü **gerçek hacimle** yap.',
      'FI–CO mutabakatını kapanış listesinden **çıkar**.',
      '{{is-ortagi}} numaralandırma stratejisini geçişten **önce** kararlaştır.',
      'Masraf türü listesinin **sahibini** netleştir.',
      '⭐ Defter ve para birimi slotlarını **baştan** aç — sonradan geçmiş dolmaz.',
      'Yapılandırma bilgin geçerli: {{T030}}, {{OBYC}}, {{VKOA}}, {{BSET}} **aynı**.',
    ],

    quiz:[
      { soru:'S/4HANA’daki basitleştirmelerin ortak sebebi nedir?',
        secenekler:[
          'SAP arayüzü modernize etmek istedi',
          '**Bellek içi veritabanı bir kısıtı kaldırdı; o kısıt için var olan çözümler gereksizleşti**',
          'Bulut uyumluluğu zorunlu kıldı',
          'Rakip ürünlere yanıt verildi',
        ], dogru:1,
        aciklama:'⭐ **Konunun tezi:** *"toplamı saklamak yerine her seferinde hesapla."*\n\n' +
                 'Eski SAP tasarımındaki pek çok yapı tek bir kısıtı aşmak için vardı: ' +
                 '**diskten okumak pahalıydı**. Bu yüzden bakiyeler önceden ' +
                 'hesaplanıp {{toplam-tablosu}}larına yazılır, açık kalemler ' +
                 'farklı anahtarla ikinci kez kopyalanırdı.\n\n' +
                 '{{bellek-ici}} veritabanında bu kısıt kalktı — ve ' +
                 '**kısıt kalkınca çözüm gereksizleşti**.\n\n' +
                 '⭐ Bu yüzden S/4HANA’daki basitleştirmelerin çoğu ' +
                 'yeni bir özellik değil, **artık gereksiz olan bir çözümün ' +
                 'kaldırılmasıdır**. Bu tek cümle, yeniliklerin neredeyse ' +
                 'tamamını açıklar.' },

      { soru:'Toplam tablolarının kaldırılmasının en önemli kazancı hangisidir?',
        secenekler:[
          'Veritabanı yer tasarrufu',
          'Kayıt işlemi hızlandı',
          '**Tutarlılık — hesaplanan toplam kalemlerle ayrışamaz**',
          'Lisans maliyeti düştü',
        ], dogru:2,
        aciklama:'Yer ve hız gerçek kazançlardır ama **ikincildir**.\n\n' +
                 '⭐ **Asıl kazanç tutarlılıktır.** Saklanan bir toplamın iki ' +
                 'dezavantajı vardı ve ikincisi daha ağırdı: ' +
                 '**kalemlerle ayrışabilirdi**. Güncelleme yarıda kalırsa ' +
                 'mizan ile döküm tutmazdı ve mutabakat programları ' +
                 'bu yüzden vardı.\n\n' +
                 'Hesaplanan bir toplam ayrışamaz — çünkü ortada ' +
                 'ayrışacak ikinci bir kayıt yok.\n\n' +
                 '⭐ Aynı ilkenin en görünür sonucu: FI ile CO tek ' +
                 '{{ACDOCA}} satırında olduğu için **ayrışmaları ' +
                 'yapısal olarak imkânsız**. Ay sonu FI–CO mutabakatı adımı ' +
                 '**silinmelidir** — duruyorsa her ay boşuna zaman harcanıyor.' },

      { soru:'ECC’den taşınan bir rapor S/4HANA’da sıfıra yakın toplamlar veriyor. En olası sebep?',
        secenekler:[
          'Yetki eksikliği veri getirmiyor',
          'Dönem kapalı',
          '**SHKZG yön mantığı kaldırılmamış; ACDOCA’da tutarlar zaten işaretli**',
          'Uyumluluk view’i bozuk',
        ], dogru:2,
        aciklama:'⭐ **Konunun en pahalı ayrıntısı.**\n\n' +
                 '{{BSEG}}’de tutarlar **hep pozitifti**; yön ayrı alandaydı ' +
                 '(`SHKZG` = S borç / H alacak). Kod *"alacaksa çıkar"* ' +
                 'mantığını **elle** uygulardı.\n\n' +
                 '{{ACDOCA}}’da tutarlar **işaretlidir** — alacak zaten negatif.\n\n' +
                 '⚠️ Eski mantık silinmezse işaret **iki kez** uygulanır: ' +
                 'alacaklar pozitife döner ve borçlarla birbirlerini götürür. ' +
                 'Toplam **sıfıra yakın** çıkar.\n\n' +
                 '⭐ **Ve bu hata sessizdir:** program çökmez, sorgu çalışır, ' +
                 'sonuç makul görünür — özellikle kontrol raporlarında ' +
                 'sıfıra yakın bir fark *"her şey tutuyor"* gibi okunur.\n\n' +
                 'Önlem tek satır: taşınan her rapor ilk çalıştırmada ' +
                 '{{FS10N}} mizanıyla **karşılaştırılır**.' },

      { soru:'Uyumluluk view’leri (compatibility views) hakkında hangisi doğrudur?',
        secenekler:[
          'Eski tabloların aynısıdır, hiçbir fark yoktur',
          'Yalnızca okuma için vardır ve performansı etkilemez',
          '**Okunur ama yazılamaz; ücretsiz değildir ve semantiği birebir değildir**',
          'Yalnızca bulut sürümünde bulunur',
        ], dogru:2,
        aciklama:'{{uyumluluk-view}}ler geçişi **mümkün kılan** şeydir: ' +
                 'binlerce özel program eski tabloları okuduğu hâlde çalışmaya devam eder.\n\n' +
                 '⚠️ **Ama iki şey söylenmez:**\n\n' +
                 '**1. Ücretsiz değildir.** ECC’de {{BSIS}} **fiziksel bir tabloydu** ' +
                 've kendi indeksi vardı. Artık her çağrıda {{ACDOCA}}’dan ' +
                 '**hesaplanır**. Tek sorguda fark edilmez; ' +
                 'döngü içinde çağrılıyorsa maliyet çarpılır.\n\n' +
                 '**2. Birebir değildir.** Alan **adları** korunur ama ' +
                 'semantik farklıdır: `SHKZG` en görünür örnektir, ' +
                 've defter boyutu (`RLDNR`) eski sorgularda **hiç yoktu**.\n\n' +
                 '⚠️ Ayrıca **yazılamazlar** — açık kalem artık ' +
                 '**belge kaydıyla** oluşur.\n\n' +
                 '⭐ Doğru bakış: görünüm bir **köprüdür**, kalıcı çözüm değil.' },

      { soru:'S/4HANA’da İş Ortağı zorunlu oldu. LFB1 tablosuna ne oldu?',
        secenekler:[
          'Kaldırıldı, verisi BUT000’e taşındı',
          '**Duruyor — şirket kodu verisi ve AKONT hâlâ orada**',
          'Uyumluluk view’i oldu',
          'Yalnızca eski kayıtlar için kaldı',
        ], dogru:1,
        aciklama:'⚠️ **Bu en sık yanlış bilinen noktadır.**\n\n' +
                 '{{is-ortagi}} bir **kimlik katmanıdır**: satıcı ve müşteri ' +
                 'artık tek nesnenin **rolleridir** ve ortak veri ' +
                 '({{BUT000}}) tek yerde tutulur.\n\n' +
                 '⭐ Ama **şirket kodu verisi kaybolmadı** — hâlâ {{LFB1}} / ' +
                 '{{KNB1}}’de durur ve `AKONT` {{mutabakat-hesabi}} oradadır.\n\n' +
                 'Yani değişen **kimlik katmanıdır**, muhasebe verisi değil. ' +
                 'Bu yüzden {{konu:migration}}’da satıcı yüklemesi hâlâ ' +
                 '**iki adımdır**: genel veri, sonra şirket kodu verisi.\n\n' +
                 '⚠️ İkinci adım atlanırsa satıcı açılır ama ' +
                 '**kayıt yapılamaz** — `AKONT` yoktur.' },

      { soru:'Yeni Varlık Muhasebesi’nde amortisman alanları nasıl çalışır?',
        secenekler:[
          'ECC’deki gibi — yalnızca alan 01 gerçek zamanlı',
          '**Her alan kendi defterine gerçek zamanlı ve tam tutarla yazar**',
          'Tüm alanlar tek deftere yazar',
          'Amortisman artık FI’a hiç yazılmaz',
        ], dogru:1,
        aciklama:'⭐ **{{amortisman-alani}} = defter.**\n\n' +
                 '**ECC’de:** yalnızca alan 01 gerçek zamanlı FI’a yazardı. ' +
                 'Diğer alanlar (IFRS, vergi) **periyodik** olarak ve ' +
                 'çoğunlukla **delta** (fark) kayıtlarıyla aktarılırdı.\n\n' +
                 'Sonucu şuydu: IFRS defteri ay içinde **eksikti** ve ' +
                 'ayrı bir program çalışana kadar rapor alınamazdı.\n\n' +
                 '**S/4HANA’da:** her alan kendi defterine **tam tutarla ve ' +
                 'anında** yazar. Delta mantığı **kalktı**.\n\n' +
                 '⭐ Pratik sonuç: IFRS raporu ayın herhangi bir gününde ' +
                 '**doğrudur**.\n\n' +
                 '⚠️ Aynı varlığın iki defterde farklı bakiye taşıması ' +
                 '**normaldir** (bkz. {{konu:parallel-ledger}}). ' +
                 'Tek {{AFAB}} koşusu tüm defterleri besler.' },

      { soru:'Geçişten sonra ay sonu kapanış uzadı. İlk sorulacak soru nedir?',
        secenekler:[
          'Donanım yeterli mi?',
          'Kullanıcılar yeni ekranlara alıştı mı?',
          '**Yavaşlayan programlar hangi tabloyu okuyor?**',
          'Veritabanı yeniden indekslenmeli mi?',
        ], dogru:2,
        aciklama:'⭐ **Cevap bir {{uyumluluk-view}} ise sorun bulunmuştur.**\n\n' +
                 'Teşhis sırası: {{SM37}} (en uzun işler hangileri?) → ' +
                 '{{SAT}} (süre nerede harcanıyor?) → {{ST05}} ' +
                 '(hangi SQL üretiliyor?).\n\n' +
                 '⚠️ Tipik bulgu: **standart işler hızlanmıştır**, ' +
                 'yavaşlayan **özel programlardır** ve sürenin çoğunu ' +
                 'onlar tutar. Çünkü eski tabloları okuyorlar ve ' +
                 'o tablolar artık her çağrıda hesaplanıyor.\n\n' +
                 'Üstelik eski ABAP kodu **döngü içinde** okumaya alışkındır — ' +
                 'tek sorguda fark edilmeyecek maliyet binlerce çağrıda çarpılır.\n\n' +
                 '⚠️ **Ölçüm gerçek hacimle yapılır:** küçük test verisinde ' +
                 'uyumluluk view’i ucuz görünür ve yanıltır.' },

      { soru:'S/4HANA’da FI yapılandırma bilgisi ne kadar geçerli?',
        secenekler:[
          'Neredeyse hiçbiri — sistem baştan farklı',
          'Yalnızca hesap planı kısmı',
          '**Büyük ölçüde aynen geçerli — muhasebe ve hesap belirleme değişmedi**',
          'Yalnızca bulut sürümünde geçerli',
        ], dogru:2,
        aciklama:'⭐ **Aynen duran her şey:**\n\n' +
                 'Çift taraflı kayıt · {{mutabakat-hesabi}} mantığı ve `AKONT` · ' +
                 'hesap belirleme ({{T030}}, {{OBYC}}, {{VKOA}}, {{T030K}}) · ' +
                 'vergi mantığı ve {{BSET}} · {{belge-bolme}} kuralları · ' +
                 'doğrulama ve ikame motoru · {{OB52}} ve kapanış sırası · ' +
                 '{{BKPF}}, belge türleri, numara aralıkları · ' +
                 'taşıma disiplini · {{acik-kalem}} yönetimi.\n\n' +
                 'Değişen **kaydın nereye yazıldığıdır**, nasıl hesaplandığı değil.\n\n' +
                 '⭐ Yani S/4HANA yeni bir muhasebe sistemi değil, ' +
                 '**aynı muhasebenin farklı saklanmasıdır**. ' +
                 'Öğrenilmesi gereken şey verinin nerede durduğu ve ' +
                 'bunun **sorgulara etkisidir** — ' +
                 've bu konunun tamamı zaten odur.' },
    ],

    flashcards:[
      { on:'⭐ S/4HANA — tek cümle', arka:'**"Toplamı saklamak yerine, her seferinde yeniden hesapla."**\n\n{{bellek-ici}} bir kısıtı kaldırdı → o kısıt için var olan çözümler **gereksizleşti**\n\n⭐ Çoğu yenilik **yeni özellik değil**, kaldırılan bir çözümdür' },
      { on:'Ne kalktı ve neden vardı', arka:'**{{toplam-tablosu}}** ({{GLT0}}, {{FAGLFLEXT}}, {{KNC1}}, {{LFC1}})\n→ bakiye hesaplamak pahalıydı\n\n**İndeks tabloları** ({{BSIK}}, {{BSID}}, {{BSIS}})\n→ farklı anahtarla tarama pahalıydı\n\n**Mutabakat defteri**\n→ iki kopya ayrışabilirdi\n\n⭐ Hepsi birer **performans çözümüydü**' },
      { on:'⭐ Asıl kazanç: hız değil TUTARLILIK', arka:'Saklanan toplam → kalemlerle **ayrışabilir**\nHesaplanan toplam → **ayrışamaz**\n\n→ *"mizan ile döküm tutmuyor"* sorunu **kalktı**\n\n→ FI–CO tek {{ACDOCA}} satırında\n= ayrışma **yapısal olarak imkânsız**\n\n⚠️ Kapanış listesinden mutabakat adımını **çıkar**' },
      { on:'⚠️ SHKZG tuzağı — en pahalı ayrıntı', arka:'**{{BSEG}}**: tutar hep **pozitif** + `SHKZG` (S/H)\n**{{ACDOCA}}**: tutar **İŞARETLİ** (alacak negatif)\n\n⚠️ Eski mantık silinmezse **işaret iki kez** uygulanır\n→ alacaklar pozitife döner\n→ toplam **sıfıra yakın** çıkar\n\n⭐ Ve **sessizdir**: çökmez, hata vermez, makul görünür' },
      { on:'🌉 Uyumluluk view’i', arka:'Eski tablolar **okunur, YAZILAMAZ**\n\n⚠️ İki şey vaat edilmez:\n**① Ücretsiz değil** — okuma anında hesaplanır\n**② Birebir değil** — `SHKZG` + `RLDNR` semantiği\n\n⭐ Bir **KÖPRÜ**dür, kalıcı çözüm değil' },
      { on:'👥 İş Ortağı — ne değişti, ne değişmedi', arka:'**Değişti:** tek kimlik ({{BUT000}}), çok **rol**\nsatıcı + müşteri aynı nesne\n\n⚠️ **Değişmedi:** şirket kodu verisi hâlâ {{LFB1}}/{{KNB1}}\n→ `AKONT` {{mutabakat-hesabi}} **orada**\n\n⚠️ Brownfield’de {{cvi}} **ön koşul**' },
      { on:'💰 Masraf türü', arka:'ECC: {{SKA1}} (G/L) + {{CSKB}} (masraf türü)\n→ **iki nesne, iki adım**\n\nS/4: {{FS00}}’da **hesap tipi**\n→ **tek nesne, tek adım**\n\n⚠️ Sahiplik sorusu: muhasebe mi, kontrolörlük mü?\n⚠️ Brownfield’de eşleşmeyen tür dönüşümü **durdurur**' },
      { on:'🏢 Yeni Varlık Muhasebesi', arka:'⭐ **{{amortisman-alani}} = defter**\n\nECC: yalnızca alan 01 gerçek zamanlı\ndiğerleri **periyodik + delta**\n→ IFRS defteri ay içinde **eksik**\n\nS/4: **her alan gerçek zamanlı ve tam tutarla**\n→ IFRS raporu her gün **doğru**' },
      { on:'⚠️ "S/4HANA hızlı" — eksik yarım', arka:'Tamamı: **"UYARLANMIŞ KOD İÇİN hızlı."**\n\n✅ Standart işlemler → hızlanır\n✅ Standart raporlar → hızlanır\n⚠️ **Özel programlar → yavaşlayabilir**\n\nTeşhis: {{SM37}} → {{SAT}} → {{ST05}}\n⚠️ Ölçüm **gerçek hacimle**' },
      { on:'✅ Ne DEĞİŞMEDİ', arka:'Çift taraflı kayıt · {{mutabakat-hesabi}}\nHesap belirleme ({{T030}}, {{OBYC}}, {{VKOA}})\nVergi ve {{BSET}} · {{belge-bolme}}\nDoğrulama/ikame · {{OB52}} · kapanış sırası\n{{BKPF}} · belge türü · numara aralığı\nTaşıma disiplini · {{acik-kalem}}\n\n⭐ **FI bilgin aynen geçerli**' },
      { on:'🔢 Sekiz para birimi kuralı', arka:'ECC: **2** para birimi → S/4: **8’e kadar**\n\n⚠️ Para birimi bir {{tek-yonlu-kapi}}\n→ sonradan eklenen **geçmişte boş kalır**\n\n⭐ **Boş slot maliyetsizdir**\nAynısı defterler için de geçerli\n\n= *"şüphedeyken açık kur, kullanma"*' },
      { on:'⭐ Senaryonun dersi', arka:'**Kaldırılan tablo geri getirilmedi — TAKLİT EDİLDİ**\n\nTaklit iki şey vaat etmez:\n**ücretsiz olmayı** · **birebir olmayı**\n\n⚠️ Ve ikinci fark **sessizdir**:\nbirincisi şikâyet üretir, ikincisi üretmez\n\n⭐ Önlem: taşınan her rapor ilk çalıştırmada {{FS10N}} ile karşılaştırılır' },
    ],
  },

  },
});
