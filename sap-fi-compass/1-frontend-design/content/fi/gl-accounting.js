/* ==========================================================================
   content/fi/gl-accounting.js — "G/L Accounting" konusunun derin içeriği
   ========================================================================== */

SAP.registerTopic({
  id: 'gl-accounting',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      '{{ana-muhasebe}} (G/L — General Ledger), mali tabloların üretildiği merkezî defterdir. ' +
      'FI’ın diğer tüm alt bileşenleri (satıcılar, müşteriler, duran varlık, banka) buraya ' +
      '{{mutabakat-hesabi}} üzerinden **özet olarak** yansır.\n\n' +
      'Ayrımı şöyle düşün: 800 satıcının ayrıntısını {{muavin-defter}} tutar; ana muhasebede ise ' +
      'tek bir "320 Satıcılar" satırı görürsün. Bilanço bu tek satırla çıkar, ayrıntı gerektiğinde ' +
      '{{FBL1N}} ile muavin deftere inilir.',

    neden:
      '**Mali tablo üretmek için.** Bilanço ve gelir tablosu yalnızca ana muhasebe hesaplarından çıkar.\n\n' +
      '**Ayrıntıyı yönetilebilir tutmak için.** Her satıcı için ayrı G/L hesabı açılsaydı hesap planı ' +
      'binlerce satır olur ve bilanço okunamaz hâle gelirdi.\n\n' +
      '**Tek doğruluk noktası olmak için.** MM, SD, HR, CO — hepsinin sayısı burada buluşur ve karşılaştırılır.',

    sirketOnemi:
      'Ana muhasebe, şirketin dışarıya gösterdiği yüzüdür. Bir bankadan kredi alırken, bir denetimden geçerken ' +
      'veya vergi beyanı verirken bakılan rakamlar buradan çıkar.\n\n' +
      'Danışmanlık açısından: G/L, FI’ın **omurgasıdır**. Hesap planı tasarımı yanlış kurulursa hatanın maliyeti ' +
      'yıllar sürer — hesap yapısını canlıda değiştirmek, açılmış tüm bakiyelerin taşınması demektir. ' +
      'Bu yüzden projede en çok tartışılan ve en erken kilitlenmesi gereken konu hesap planıdır.',

    gercekHayat:
      'Bir holding düşün: 6 şirket kodu, hepsi aynı hesap planını kullanıyor. Genel müdür "grubun toplam ' +
      'personel gideri ne?" diye soruyor.\n\n' +
      'Eğer her şirket kendi hesap numaralarını kullansaydı bu soruya cevap vermek için manuel eşleştirme ' +
      'tablosu gerekirdi. Ortak {{hesap-plani}} sayesinde tek bir rapor 6 şirketi toplar. ' +
      'Ana muhasebenin şirketlerarası gücü budur — ve bu yüzden "her şirket kendi hesap planını kullansın" ' +
      'talebine danışman direnir.',

    muhasebeMantigi:
      'Ana muhasebede iki tür hesap vardır ve davranışları farklıdır:\n\n' +
      '**Bilanço hesapları** ({{SKA1}} `XBILK` = X): bakiyeleri yıl sonunda sıfırlanmaz, ' +
      'yeni yıla devreder ({{bakiye-devri}}). Kasa, banka, stok, satıcılar, sermaye.\n\n' +
      '**Gelir-gider hesapları**: bir dönemi ölçer, yıl sonunda sıfırlanır ve sonuç özkaynağa aktarılır. ' +
      'Satışlar, giderler, amortisman.\n\n' +
      'Üçüncü bir ayrım daha vardır: hesap {{acik-kalem-yonetimi}}ne tabi mi? ' +
      'Tabi ise her kalem açık/kapalı takip edilir ve {{kapatma}} yapılabilir ({{gr-ir}}, banka ara hesapları, avanslar). ' +
      'Değilse yalnızca bakiye anlamlıdır (satış geliri, kira gideri).',

    kavramlar: ['ana-muhasebe', 'hesap-plani', 'mutabakat-hesabi', 'acik-kalem-yonetimi', 'alan-durumu',
                'bilanco', 'gelir-tablosu', 'bakiye-devri', 'mali-tablo-yapisi', 'evrensel-kayit-defteri'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Ana muhasebenin süreci bir **döngüdür**: hesap yapısı kurulur, kayıtlar akar, mutabakat yapılır, ' +
      'dönem kapatılır ve tablolar üretilir. Kayıtların çoğu başka modüllerden veya muavin defterlerden gelir; ' +
      'ana muhasebeye elle giren kayıtlar genellikle düzeltme, tahakkuk ve virmandır.',

    roller:[
      { rol:'FI danışmanı', gorev:'Hesap planını, hesap gruplarını, alan durumu varyantını ve {{mali-tablo-yapisi}}nı tasarlar.' },
      { rol:'Ana veri ekibi', gorev:'G/L hesaplarını {{FS00}} ile açar ve bakımını yapar.' },
      { rol:'Muhasebe uzmanı', gorev:'Elle kayıtları girer ({{FB50}}), açık kalemleri kapatır ({{F-03}}), hesap mutabakatı yapar.' },
      { rol:'Muhasebe müdürü', gorev:'Dönem açar/kapatır ({{OB52}}), yüksek tutarlı kayıtları onaylar, tabloları imzalar.' },
      { rol:'Denetçi', gorev:'Hesap hareketlerini ({{FBL3N}}) ve değişiklik izlerini ({{CDPOS}}) inceler.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Ana muhasebe döngüsü',
      adimlar:[
        { ic:'🏗️', rol:'FI danışmanı', baslik:'Hesap yapısı kurulur',
          aciklama:'{{hesap-plani}} ({{OB13}}), {{hesap-grubu}} ve {{alan-durumu}} ({{OBD4}}), {{mali-tablo-yapisi}} ({{OB58}}).',
          cikti:'Yapılandırılmış hesap planı', ok:'hesaplar açılır' },
        { ic:'📗', rol:'Ana veri ekibi', baslik:'G/L hesapları açılır',
          aciklama:'{{FS00}} ile hesap planı ve şirket kodu seviyeleri ({{SKA1}} + {{SKB1}}).',
          cikti:'Kullanıma hazır hesaplar', ok:'kayıt akmaya başlar' },
        { ic:'📥', rol:'Tüm modüller', baslik:'Kayıtlar akar',
          aciklama:'MM, SD, HR’den otomatik; muavin defterlerden {{mutabakat-hesabi}} üzerinden; elle {{FB50}} ile.',
          cikti:'FI belgeleri ({{BKPF}}/{{BSEG}}/{{ACDOCA}})', ok:'bakiyeler oluşur' },
        { ic:'🔗', rol:'Muhasebe', baslik:'Açık kalemler kapatılır',
          aciklama:'{{acik-kalem-yonetimi}} açık hesaplarda ({{gr-ir}}, banka ara hesapları) {{F-03}} veya {{F.13}} ile.',
          cikti:'Temizlenmiş geçiş hesapları', ok:'dönem sonu' },
        { ic:'⚖️', rol:'Muhasebe', baslik:'Mutabakat ve kontrol',
          aciklama:'{{FS10N}}/{{FAGLB03}} bakiye, {{FBL3N}}/{{FAGLL03}} kalem. Muavin defter toplamı ile mutabakat hesabı karşılaştırılır.',
          cikti:'Doğrulanmış bakiyeler', ok:'düzeltme gerekiyorsa' },
        { ic:'🔧', rol:'Muhasebe', baslik:'Düzeltme ve tahakkuk kayıtları',
          aciklama:'{{FB50}} ile virman, {{FBS1}} ile ters kaydedilecek tahakkuk, {{AFAB}} amortisman, {{F.05}} kur değerlemesi.',
          cikti:'Düzeltme belgeleri', ok:'dönem kapanır' },
        { ic:'🔒', rol:'Muhasebe müdürü', baslik:'Dönem kapatılır, tablolar alınır',
          aciklama:'{{OB52}} ile dönem kapatılır, {{F.01}} ile bilanço ve gelir tablosu üretilir.',
          cikti:'Mali tablolar', ok:'yıl sonuysa' },
        { ic:'🔄', rol:'Sistem', baslik:'Bakiye devri',
          aciklama:'{{FAGLGVTR}}: bilanço hesapları devreder, gelir-gider hesapları sıfırlanır ve sonuç özkaynağa gider.',
          cikti:'Yeni yıl açılış bakiyeleri' },
      ],
    },

    adimlar:[
      { rol:'FI danışmanı', eylem:'Hesap planı ve grup yapısını tanımlar', sistem:'{{OB13}}, {{OBD4}}, {{OB58}}' },
      { rol:'Ana veri ekibi', eylem:'G/L hesaplarını açar', sistem:'{{FS00}} → {{SKA1}}, {{SKB1}}' },
      { rol:'Sistem / Muhasebe', eylem:'Kayıtlar oluşur', sistem:'{{FB50}}, {{F-02}} ve entegrasyondan otomatik' },
      { rol:'Muhasebe', eylem:'Geçiş hesapları temizlenir', sistem:'{{F-03}}, {{F.13}}' },
      { rol:'Muhasebe', eylem:'Bakiye ve kalem kontrolü', sistem:'{{FS10N}}, {{FBL3N}}, {{FAGLL03}}' },
      { rol:'Muhasebe', eylem:'Dönem sonu düzeltmeleri', sistem:'{{FBS1}}, {{AFAB}}, {{F.05}}, {{F.19}}' },
      { rol:'Muhasebe müdürü', eylem:'Dönem kapatma ve raporlama', sistem:'{{OB52}}, {{F.01}}, {{FAGLGVTR}}' },
    ],

    veriAkisi:{
      nereden:'Muavin defterler ({{BSIK}}, {{BSID}}, {{ANLC}}) mutabakat hesapları üzerinden; MM/SD/HR entegrasyonundan; elle FI kayıtlarından.',
      nereye:'{{ACDOCA}} → bakiyeler → {{mali-tablo-yapisi}} → {{bilanco}} ve {{gelir-tablosu}}. Ayrıca CO tarafına {{maliyet-yeri}} ve {{kar-merkezi}} boyutunda.',
      tetikleyen:'Her muhasebeleşen işlem. Ana muhasebe pasif bir alıcıdır — kendi başına kayıt üretmez, kendisine gelen kaydı toplar.',
      sonraki:'Konsolidasyon, vergi beyanı, yönetim raporlaması, denetim.',
    },

    notlar:[
      { tip:'tip', baslik:'Ana muhasebe kaydı ne zaman elle girilir?', metin:
        'Sağlıklı bir kurulumda elle G/L kaydı yalnızca dört durumda girilir: **virman** (hesaplar arası düzeltme), ' +
        '**tahakkuk/karşılık** (dönemsellik kayıtları), **açılış bakiyeleri** (veri geçişi) ve **hata düzeltme**. ' +
        'Bunların dışında sürekli elle kayıt giriliyorsa entegrasyonda bir eksik var demektir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Ana muhasebede kayıtlar üç kaynaktan gelir ve muhasebe mantığı her birinde aynıdır: ' +
      'iki tarafı denk bir belge. Farklı olan, kaydı **kimin** ürettiği ve hesabın **nasıl** belirlendiğidir.',

    etkilenenHesaplar:[
      { hesap:'Mutabakat hesapları (320, 120, 25x)', tur:'Bilanço', neden:'Muavin defterden otomatik yansır; doğrudan kayıt yapılamaz. Bilançoda tek satır, arkasında binlerce kalem.' },
      { hesap:'Geçiş hesapları ({{gr-ir}}, {{banka-ara-hesabi}})', tur:'Bilanço', neden:'İki olay arasındaki zaman farkını taşır. {{acik-kalem-yonetimi}} **açık olmalıdır**, yoksa kapatma yapılamaz ve bakiye şişer.' },
      { hesap:'Gider hesapları (6xx, 7xx)', tur:'Gelir tablosu', neden:'CO ile entegredir; kayıt anında {{maliyet-yeri}} istenir. S/4HANA’da hesabın tipi "Primary Costs" olmalıdır.' },
      { hesap:'Gelir hesapları (60x)', tur:'Gelir tablosu', neden:'Genelde SD’den otomatik gelir; hesabı {{VKOA}} belirler.' },
      { hesap:'Vergi hesapları (191, 391)', tur:'Bilanço', neden:'{{vergi-kodu}} girildiğinde SAP satırı otomatik ekler; elle yazılmaz ve {{BSET}}’e ayrıca kaydedilir.' },
      { hesap:'Özkaynak / dönem kârı (5xx, 59x)', tur:'Bilanço', neden:'Yıl sonunda gelir-gider hesaplarının bakiyesi buraya aktarılır ({{bakiye-devri}}).' },
    ],

    fisler:[
      { baslik:'Kaynak 1 — Elle virman kaydı ({{FB50}})',
        belgeTuru:'SA', tarih:'30.06.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', alacak:15000, not:'Yanlış hesaba kaydedilmişti' },
          { hesap:'760', ad:'Pazarlama satış dağıtım gideri', borc:15000, not:'Doğru hesap' },
        ],
        not:'Klasik bir virman: toplam gider değişmiyor, sadece sınıf düzeltiliyor. Bilanço etkilenmez, gelir tablosunun **dağılımı** düzelir.' },

      { baslik:'Kaynak 2 — Muavin defterden yansıma (satıcı faturası)',
        belgeTuru:'KR', tarih:'12.06.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:50000 },
          { hesap:'191', ad:'İndirilecek KDV', borc:10000 },
          { hesap:'320', ad:'Satıcılar (mutabakat)', alacak:60000, not:'Muavin defterden otomatik' },
        ],
        not:'Ana muhasebede tek satır olarak "320 Satıcılar 60.000" görünür. Hangi satıcıya ait olduğu ana muhasebede **yoktur** — o bilgi {{BSIK}}’tedir. Bu ayrım ana muhasebenin tasarım felsefesidir.' },

      { baslik:'Kaynak 3 — Dönem sonu tahakkuku ({{FBS1}}, ters kayıtlanacak)',
        belgeTuru:'SA', tarih:'30.06.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — elektrik', borc:8000, not:'Haziranda kullanıldı' },
          { hesap:'381', ad:'Gider tahakkukları', alacak:8000, not:'Fatura henüz gelmedi' },
        ],
        not:'{{tahakkuk-esasi}}: elektrik Haziran’da kullanıldı, faturası Temmuz’da gelecek. Gider Haziran’a yazılır. ' +
             '{{FBS1}} ile girilen bu belge, 01.07.2026’da {{F.81}} ile **otomatik ters kaydedilir**; ' +
             'gerçek fatura geldiğinde çift kayıt olmaz.' },

      { baslik:'Yıl sonu — gelir-gider hesaplarının kapanışı ({{FAGLGVTR}})',
        belgeTuru:'SA', tarih:'31.12.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'600', ad:'Yurtiçi satışlar', borc:1200000, not:'Sıfırlanıyor' },
          { hesap:'621', ad:'Satılan malın maliyeti', alacak:700000, not:'Sıfırlanıyor' },
          { hesap:'770', ad:'Genel yönetim giderleri', alacak:300000, not:'Sıfırlanıyor' },
          { hesap:'590', ad:'Dönem net kârı', alacak:200000, not:'Özkaynağa aktarıldı' },
        ],
        not:'Gelir-gider hesapları sıfırlanır, net sonuç ({{gelir-tablosu}}’nun sonucu) özkaynak altındaki dönem kârı hesabına gider. ' +
             'Bilanço hesapları ise bakiyesiyle yeni yıla devreder — sıfırlanmaz.' },
    ],

    tHesaplar:[
      { hesap:'Genel yönetim gideri', kod:'770 (Gider)',
        borc:[{ ad:'Satıcı faturası', tutar:50000 }, { ad:'Elektrik tahakkuku', tutar:8000 }],
        alacak:[{ ad:'Virman düzeltmesi', tutar:15000 }, { ad:'Yıl sonu kapanış', tutar:43000 }],
        not:'Yıl sonunda sıfırlanır' },
      { hesap:'GR/IR hesabı', kod:'159 (Geçiş — açık kalem yönetimli)',
        borc:[{ ad:'Fatura girişi', tutar:80000 }],
        alacak:[{ ad:'Mal girişi', tutar:80000 }],
        not:'Dönem sonunda sıfıra yakın olmalı' },
      { hesap:'Satıcılar (mutabakat)', kod:'320 (Bilanço)',
        borc:[{ ad:'Ödemeler', tutar:180000 }],
        alacak:[{ ad:'Faturalar', tutar:240000 }],
        not:'Bakiye yeni yıla devreder' },
      { hesap:'Dönem net kârı', kod:'590 (Özkaynak)',
        borc:[],
        alacak:[{ ad:'Yıl sonu aktarımı', tutar:200000 }],
        not:'Gelir tablosunun sonucu buraya düşer' },
    ],

    notlar:[
      { tip:'warn', baslik:'Açık kalem yönetimi yanlış kurulursa', metin:
        '{{gr-ir}} veya {{banka-ara-hesabi}} gibi geçiş hesaplarında {{acik-kalem-yonetimi}} kapalıysa ' +
        'kalemler **hiç kapatılamaz**. Bakiye yıllar içinde şişer ve gerçek durumu göstermez. ' +
        'Hesapta hareket varken bu ayarı değiştirmek kolay değildir — bu yüzden hesap açarken doğru kurmak kritiktir.' },
      { tip:'tip', baslik:'Mutabakat kontrolü nasıl yapılır?', metin:
        '{{FBL1N}} ile satıcı açık kalemlerinin toplamını al, {{FS10N}}/{{FAGLB03}} ile 320 hesabının bakiyesine bak. ' +
        'İkisi eşit olmalıdır. Eşit değilse ya mutabakat hesabına doğrudan kayıt yapılmış (yapılandırma açığı) ' +
        'ya da mutabakat hesabı dönem içinde değiştirilmiştir.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'G/L hesapları üç eksende sınıflanır ve bu sınıflar hesabın davranışını belirler. ' +
      'Bir hesabı açarken üç sorunun da cevabı verilmelidir.',
    liste:[
      { ad:'Bilanço hesabı', en:'Balance Sheet Account',
        aciklama:'Bakiyesi yıl sonunda sıfırlanmaz, yeni yıla devreder. {{SKA1}} `XBILK` = X ile işaretlenir.',
        neZaman:'Varlık, borç ve özkaynak kalemleri için: kasa, banka, stok, satıcılar, sermaye.',
        ornek:'320 Satıcılar — 31 Aralık bakiyesi 1 Ocak açılış bakiyesi olur.' },

      { ad:'Gelir-gider hesabı', en:'P&L Account',
        aciklama:'Bir dönemi ölçer, yıl sonunda sıfırlanır ve sonuç özkaynağa aktarılır.',
        neZaman:'Gelir ve gider kalemleri için: satışlar, giderler, amortisman.',
        ornek:'600 Yurtiçi satışlar — her yıl sıfırdan başlar; yıl sonu {{bakiye-devri}}’nde 590’a aktarılır.' },

      { ad:'Mutabakat hesabı', en:'Reconciliation Account',
        aciklama:'Muavin defterin ana muhasebedeki karşılığıdır. {{SKB1}} `MITKZ` alanıyla işaretlenir: **D** müşteri, **K** satıcı, **A** duran varlık.',
        neZaman:'Satıcı, müşteri ve duran varlık bakiyelerinin ana muhasebeye yansıması gerektiğinde — yani her zaman.',
        ornek:'320 Satıcılar. **Doğrudan kayıt yapılamaz**; kayıt satıcı numarası üzerinden gider.',
        tcodes:['FS00','FBL1N'] },

      { ad:'Açık kalem yönetimli hesap', en:'Open Item Managed Account',
        aciklama:'Her kalem açık/kapalı takip edilir; {{kapatma}} yapılabilir. {{SKB1}} `XOPVW` = X.',
        neZaman:'İki olay arasında geçiş görevi gören hesaplarda: {{gr-ir}}, {{banka-ara-hesabi}}, avans hesapları, personel avansları.',
        ornek:'159 GR/IR — mal girişi alacak yazar, fatura girişi borç yazar, ikisi eşleşince kalem kapanır.',
        tcodes:['F-03','F.13','FBRA'] },

      { ad:'Bakiye hesabı (açık kalem yönetimi kapalı)', en:'Balance-only Account',
        aciklama:'Kalem eşleştirmesi yapılmaz; yalnızca bakiye anlamlıdır.',
        neZaman:'Gelir ve gider hesaplarında, ana banka hesabında. Gereksiz yere açık kalem yönetimi açmak performansı ve kullanımı zorlaştırır.',
        ornek:'770 Genel yönetim gideri — "hangi gider hangi ödemeyle kapandı" diye bir soru yoktur.' },

      { ad:'Birincil masraf hesabı', en:'Primary Cost Element (S/4HANA hesap tipi)',
        aciklama:'FI gider hesabı olmakla birlikte CO’ya da akar. S/4HANA’da {{FS00}}’da hesap tipi olarak seçilir; ECC’de {{KA01}} ile ayrı ana veri gerekiyordu.',
        neZaman:'{{maliyet-yeri}} bazında izlenmesi gereken tüm gider hesaplarında.',
        ornek:'770 Genel yönetim gideri — tip "Primary Costs or Revenue" seçilmezse kayıt CO’ya hiç düşmez.',
        tcodes:['FS00','OKB9','KSB1'] },
    ],

    karsilastirmaBasliklar:['Klasik Ana Muhasebe', 'Yeni Ana Muhasebe (New G/L)'],
    karsilastirma:[
      ['Kalem tablosu', '{{BSEG}} + {{BSIS}}/{{BSAS}}', '{{FAGLFLEXA}} → S/4’te {{ACDOCA}}'],
      ['Toplam tablosu', '{{GLT0}}', '{{FAGLFLEXT}} → S/4’te kaldırıldı'],
      ['Kâr merkezi bazlı bilanço', 'Mümkün değil (ayrı PCA modülü gerekir)', '{{belge-bolme}} ile mümkün'],
      ['Paralel muhasebe', 'Ek hesaplarla veya ek şirket koduyla', '{{paralel-defter}} ile temiz çözüm'],
      ['FI–CO mutabakatı', 'Periyodik mutabakat gerekir', 'Gerçek zamanlı entegrasyon'],
      ['Kalem raporu', '{{FBL3N}}', '{{FAGLL03}}'],
      ['Bakiye raporu', '{{FS10N}}', '{{FAGLB03}}'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FS00', ad:'G/L hesabı merkezi bakım',
        amac:'Hesabın hesap planı ({{SKA1}}) ve şirket kodu ({{SKB1}}) seviyelerini tek ekranda yönetir.',
        neZaman:'Yeni hesap açarken; bir hesabın davranışını (neden bu alan zorunlu, neden kapatma yapılamıyor) teşhis ederken.',
        adimlar:[
          { baslik:'Hesap numarası + şirket kodu gir', aciklama:'Numara, {{hesap-grubu}}’nun aralığında olmalıdır.' },
          { baslik:'*Tip/Tanım*: hesap grubu ve bilanço/gelir-gider ayrımı',
            aciklama:'S/4HANA’da ayrıca **hesap tipi** seçilir. Gider hesabı için "Primary Costs or Revenue" seçilmezse CO’ya akmaz.' },
          { baslik:'*Kontrol verisi*: para birimi, vergi kategorisi, açık kalem yönetimi, mutabakat hesabı tipi',
            aciklama:'{{acik-kalem-yonetimi}} burada açılır. Sonradan değiştirmek zordur — doğru karar burada verilir.' },
          { baslik:'*Yaratma/bank/faiz*: alan durumu grubu',
            aciklama:'Kayıt ekranında hangi alanın zorunlu olacağını belirleyen ayar ({{SKB1}} `FSTAG`).' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Hesap 159000, şirket kodu 1000 → Oluştur' },
          { ekran:'Tip/Tanım', islem:'Hesap grubu: Geçiş hesapları · Bilanço hesabı · Tip: Balance Sheet' },
          { ekran:'Kontrol verisi', islem:'Para birimi TRY · **Açık kalem yönetimi: X** · Kalem görüntüleme: X · Sıralama anahtarı: 014' },
          { ekran:'Yaratma/bank/faiz', islem:'Alan durumu grubu: G001' },
        ],
        alanlar:{
          zorunlu:['Hesap numarası','Şirket kodu','Hesap grubu','Bilanço/Gelir-gider','Kısa metin','Para birimi','Alan durumu grubu'],
          opsiyonel:['Vergi kategorisi','Açık kalem yönetimi','Kalem görüntüleme','Sıralama anahtarı','Mutabakat hesabı tipi','Alternatif hesap numarası'] },
        hatalar:[
          { mesaj:'Account 159000 not created in chart of accounts', sebep:'Hesap planı seviyesi yok.', cozum:'{{FSP0}} ile hesap planı seviyesini oluştur; {{FS00}} zaten ikisini birden yapar.' },
          { mesaj:'Open item management cannot be activated; account has postings', sebep:'Hesapta hareket var.', cozum:'Bakiyeyi sıfırla → ayarı değiştir → bakiyeyi geri yükle. Alternatif: yeni hesap aç ve bakiyeyi taşı.' },
          { mesaj:'Account number not within number range of account group', sebep:'{{hesap-grubu}} aralığı uyumsuz.', cozum:'Doğru grubu seç veya {{OBD4}} ile aralığı düzelt.' },
        ],
        ipucu:'Geçiş hesabı ({{gr-ir}}, banka ara hesabı) açarken **açık kalem yönetimini ve sıralama anahtarını** mutlaka ayarla. ' +
              'Sıralama anahtarı `ZUONR` alanını doldurur ve {{F.13}} ile otomatik kapatmayı mümkün kılar.',
        ilgili:['FSP0','FSS0','OBD4','FBL3N','FS10N'] },

      { kod:'FB50', ad:'G/L kaydı girişi (enter view)',
        amac:'Ana muhasebe kaydını tablo görünümünde girer. Kayıt anahtarı yerine borç/alacak seçilir.',
        neZaman:'Virman, tahakkuk, karşılık ve düzeltme kayıtlarında.',
        adimlar:[
          { baslik:'Tarihler ve şirket kodunu gir', aciklama:'Kayıt tarihi (`BUDAT`) dönemi belirler.' },
          { baslik:'Satırları gir: hesap, B/A, tutar', aciklama:'Gider hesabında maliyet yeri istenebilir.' },
          { baslik:'Bakiye göstergesini kontrol et', aciklama:'Yeşile dönmeden kayıt yapılamaz ({{belge-denkligi}}).' },
          { baslik:'*Belge → Simüle et*', aciklama:'Sistemin ekleyeceği vergi ve {{belge-bolme}} satırlarını kaydetmeden gösterir.' },
          { baslik:'Kaydet', aciklama:'Belge numarası verilir; artık silinemez, yalnızca {{FB08}} ile ters kaydedilir.' },
        ],
        ekranAkisi:[
          { ekran:'Başlık', islem:'Belge tarihi 30.06.2026 · Kayıt tarihi 30.06.2026 · Şirket kodu 1000' },
          { ekran:'Kalem tablosu satır 1', islem:'760 Pazarlama gideri · Borç · 15.000 · Maliyet yeri 2100' },
          { ekran:'Kalem tablosu satır 2', islem:'770 Genel yönetim gideri · Alacak · 15.000 · Maliyet yeri 1200' },
          { ekran:'Simülasyon', islem:'2 satır görünür, bakiye 0 · Kaydet' },
        ],
        alanlar:{
          zorunlu:['Belge tarihi','Kayıt tarihi','Şirket kodu','G/L hesabı','Borç/Alacak','Tutar'],
          opsiyonel:['Belge türü','Referans','Başlık metni','Vergi kodu','Maliyet yeri','Atama','Satır metni'] },
        hatalar:[
          { mesaj:'Posting period 006 2026 is not open for account type S', sebep:'Dönem ana muhasebe için kapalı.', cozum:'{{OB52}} → dönem varyantı → hesap tipi **S** satırında dönemi aç.' },
          { mesaj:'Account 320000 cannot be directly posted to', sebep:'Hesap {{mutabakat-hesabi}}.', cozum:'{{FB60}}/{{FB70}} ile satıcı/müşteri üzerinden kaydet.' },
          { mesaj:'Balance in transaction currency', sebep:'Borç ≠ alacak.', cozum:'Satırları kontrol et; belgeyi saklamak istiyorsan {{FV50}} ile park et.' },
          { mesaj:'Cost center 1200 is blocked for primary postings', sebep:'Maliyet yerine kayıt kilidi konmuş veya geçerlilik tarihi dışında.', cozum:'CO ekibiyle kilidi kaldır veya geçerli bir maliyet yeri kullan.' },
        ],
        ipucu:'Sık girdiğin kayıtlar için **hesap atama şablonu** (account assignment model) oluştur: ekranın üstündeki "Şablon" düğmesiyle hazır satırları çağırırsın. Ay sonu rutin kayıtlarında büyük zaman kazandırır.',
        ilgili:['F-02','FV50','FB03','FB08','FBD1'] },

      { kod:'FBL3N', ad:'G/L kalem listesi',
        amac:'Bir hesabın kalemlerini açık, kapalı veya tüm kalemler bazında listeler. Ana muhasebenin "defter-i kebir sayfası"dır.',
        neZaman:'Bir bakiyenin nereden geldiğini anlamak, geçiş hesaplarını temizlemek ve mutabakat yapmak için.',
        adimlar:[
          { baslik:'Hesap ve şirket kodunu gir' },
          { baslik:'Kalem tipini seç: açık / kapalı / tüm',
            aciklama:'Bu ayrım yalnızca {{acik-kalem-yonetimi}} açık hesaplarda anlamlıdır. Açık kalem seçildiğinde bir **anahtar tarih** girilir.' },
          { baslik:'Düzeni (layout) ayarla',
            aciklama:'Sütun ekle/çıkar, toplam al, alt toplam grupla. Kendi düzenini kaydedip varsayılan yapabilirsin — günlük işte en çok zaman kazandıran alışkanlıktır.' },
          { baslik:'Satıra çift tıkla → belgeye in ({{FB03}})' },
        ],
        ekranAkisi:[
          { ekran:'Seçim ekranı', islem:'G/L hesabı 159000 · Şirket kodu 1000 · **Açık kalemler** · Anahtar tarih 30.06.2026' },
          { ekran:'Kalem listesi', islem:'Kalemler listelenir; borç/alacak toplamı altta' },
          { ekran:'Düzen değiştir', islem:'Atama (`ZUONR`) ve metin sütunları eklenir, atamaya göre alt toplam alınır' },
          { ekran:'Belge detayı', islem:'Çift tık → {{FB03}}' },
        ],
        hatalar:[
          { mesaj:'No items selected', sebep:'Seçim kriterleri çok dar veya hesapta o dönemde hareket yok.', cozum:'Tarih aralığını genişlet; "tüm kalemler" seç. Hesabın kalem görüntülemesi ({{SKB1}} `XKRES`) kapalıysa hiç kalem göstermez.' },
          { mesaj:'Account is not managed on an open item basis', sebep:'Hesapta {{acik-kalem-yonetimi}} kapalı.', cozum:'"Tüm kalemler" ile listele; açık/kapalı ayrımı bu hesapta yoktur.' },
        ],
        ipucu:'Geçiş hesabı temizliğinde düzeni **atama (`ZUONR`) alanına göre alt toplamlı** ayarla. ' +
              'Birbirini götüren kalemler yan yana gelir ve hangilerinin kapatılacağı bir bakışta görünür.',
        ilgili:['FAGLL03','FS10N','FB03','F-03','F.13'] },

      { kod:'F-03', ad:'G/L hesabı kapatma',
        amac:'{{acik-kalem-yonetimi}} açık bir hesapta birbirini götüren kalemleri manuel eşleştirir.',
        neZaman:'{{gr-ir}} ve banka ara hesabı temizliğinde; {{F.13}} otomatik kapatamadığı kalemlerde.',
        adimlar:[
          { baslik:'Hesap, şirket kodu ve kapatma tarihini gir' },
          { baslik:'*Açık kalemleri işle* → kalemler listelenir' },
          { baslik:'Kapatılacak kalemleri seç', aciklama:'Seçilen kalemlerin **net tutarı sıfır olmalıdır**; ekranın altındaki "Atanmamış" alanı sıfırı göstermelidir.' },
          { baslik:'Kaydet', aciklama:'Bir kapatma belgesi üretilir ve kapatılan kalemlerin `AUGBL` alanına yazılır.' },
        ],
        hatalar:[
          { mesaj:'Difference too large for clearing', sebep:'Seçilen kalemlerin toplamı sıfır değil ve fark {{tolerans-grubu}} sınırının dışında.', cozum:'Doğru kalemleri seç; gerçekten küçük bir fark varsa fark satırı gir veya tolerans grubunu gözden geçir.' },
          { mesaj:'Account is not open item managed', sebep:'Hesapta {{acik-kalem-yonetimi}} kapalı.', cozum:'Bu hesapta kapatma yapılamaz; hesap ana verisinin doğru kurulup kurulmadığını sorgula.' },
        ],
        ipucu:'Yanlış kapatma yaptıysan panik yapma: {{FBRA}} ile kapatmayı geri alırsın, kalemler yeniden açık hâle gelir.',
        ilgili:['F.13','FBRA','FBL3N','F-32','F-44'] },

      { kod:'FAGLL03', ad:'G/L kalem listesi (yeni ana muhasebe)',
        amac:'Defter ({{defter}}) bazında kalem raporu. {{FBL3N}}’in New G/L ve S/4HANA karşılığıdır.',
        neZaman:'{{paralel-defter}} kullanılan sistemlerde ve kâr merkezi/bölüm bazlı analizde.',
        adimlar:[
          { baslik:'Hesap, şirket kodu ve **defter** seç', aciklama:'Lider defter 0L’dir. IFRS için ayrı bir defter varsa aynı hesap farklı tutarlar gösterebilir.' },
          { baslik:'Ek boyutlarla süz', aciklama:'{{kar-merkezi}}, bölüm (segment), fonksiyonel alan — {{FBL3N}}’de olmayan alanlar.' },
        ],
        ipucu:'Aynı hesabın 0L ve IFRS defterinde farklı bakiye vermesi normaldir; paralel muhasebenin amacı budur.',
        ilgili:['FBL3N','FAGLB03','FBL3H'] },

      { kod:'F.13', ad:'Otomatik kapatma',
        amac:'Tanımlı kapatma kurallarına göre açık kalemleri toplu ve otomatik eşleştirir.',
        neZaman:'Ay sonunda {{gr-ir}} ve banka ara hesaplarının rutin temizliğinde.',
        adimlar:[
          { baslik:'Şirket kodu, hesap aralığı ve tarih gir' },
          { baslik:'Önce **deneme (test) modunda** çalıştır', aciklama:'Hangi kalemlerin kapatılacağını kaydetmeden gör.' },
          { baslik:'Sonucu incele, sonra gerçek modda çalıştır' },
        ],
        ipucu:'{{F.13}}’ün eşleştirme kriteri hesabın **sıralama anahtarından** doldurulan `ZUONR` (atama) alanıdır. ' +
              'Atama alanı boş kalıyorsa otomatik kapatma çalışmaz — sorun {{F.13}}’te değil, hesap ana verisindedir.',
        hatalar:[
          { mesaj:'No clearing possible / hiçbir kalem kapatılmadı', sebep:'Atama alanları eşleşmiyor veya kapatma kuralı tanımlı değil.', cozum:'{{FS00}}’da sıralama anahtarını ayarla; IMG’de "Automatic Clearing" kurallarını kontrol et.' },
        ],
        ilgili:['F-03','FBRA','FBL3N'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Ana muhasebenin tablo yapısı, S/4HANA ile en çok sadeleşen alandır. ' +
      'ECC’de aynı bilgi dört ayrı yerde tutulurken (kalem, indeks, toplam, yeni G/L kalemi), ' +
      'S/4HANA’da tek kaynak {{ACDOCA}}’dır ve diğerleri {{uyumluluk-view}}’ine dönüşmüştür.',

    liste:[
      { ad:'SKA1', baslik:'Hesap — hesap planı seviyesi',
        tutar:'Numara, hesap grubu, bilanço/gelir-gider ayrımı. Şirket kodundan bağımsızdır.',
        olusturan:'{{FS00}} / {{FSP0}}',
        guncelleyen:'{{FS00}}, {{FSP0}}, veri yükleme',
        anahtar:'KTOPL + SAKNR',
        iliskiler:'{{SKB1}} ile 1-n; {{SKAT}} ile dil bazlı metinler.',
        s4:'Değişmedi; hesap tipi alanı (GLACCOUNT_TYPE) eklendi.',
        alanlar:[
          { ad:'KTOKS', aciklama:'{{hesap-grubu}}' },
          { ad:'XBILK', aciklama:'X = bilanço hesabı, boş = gelir-gider hesabı' },
        ] },

      { ad:'SKB1', baslik:'Hesap — şirket kodu seviyesi',
        tutar:'Hesabın davranış ayarları: para birimi, vergi kategorisi, açık kalem yönetimi, alan durumu grubu, mutabakat tipi, sıralama anahtarı.',
        olusturan:'{{FS00}} / {{FSS0}}',
        guncelleyen:'{{FS00}}, {{FSS0}}',
        anahtar:'BUKRS + SAKNR',
        iliskiler:'{{BSEG}}.HKONT ve {{ACDOCA}}.RACCT buraya işaret eder.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'XOPVW', aciklama:'{{acik-kalem-yonetimi}} — kapatma için gerekli' },
          { ad:'MITKZ', aciklama:'Mutabakat tipi: D / K / A. Doluysa doğrudan kayıt yapılamaz.' },
          { ad:'FSTAG', aciklama:'{{alan-durumu}} grubu' },
          { ad:'ZUAWA', aciklama:'Sıralama anahtarı — `ZUONR` alanını doldurur, {{F.13}} için kritik' },
          { ad:'XKRES', aciklama:'Kalem görüntüleme — kapalıysa {{FBL3N}} kalem göstermez' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri (klasik)',
        tutar:'Her kaydın satır bazında hesabı, tutarı, yönü ve ek boyutları.',
        olusturan:'FI belgesi üreten her işlem',
        guncelleyen:'Kayıt işlemleri; kapatma işlemleri `AUGBL`/`AUGDT` alanlarını günceller',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{BKPF}}’nin çocuğu; {{SKB1}} ile hesap bağı.',
        s4:'Yazılmaya devam eder ama cluster olduğu için raporlamada kullanılmaz.',
        alanlar:[
          { ad:'SHKZG', aciklama:'S = borç, H = alacak' },
          { ad:'AUGBL', aciklama:'Kapatma belgesi — boşsa kalem **açıktır**' },
          { ad:'ZUONR', aciklama:'Atama — otomatik kapatmanın eşleştirme alanı' },
        ] },

      { ad:'ACDOCA', baslik:'Evrensel Kayıt Defteri',
        tutar:'FI + CO + AA + ML verisi tek satırda; defter bazında ayrışır.',
        olusturan:'Muhasebeleşen her işlem',
        guncelleyen:'Tüm FI ve CO işlemleri',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{BKPF}} ile belge numarası; {{SKB1}} ile hesap; CO nesneleriyle doğrudan.',
        s4:'Ana muhasebenin tek gerçek kaynağıdır. Bakiyeler buradan anlık hesaplanır.',
        alanlar:[
          { ad:'RLDNR', aciklama:'{{defter}} — 0L lider defter' },
          { ad:'RACCT', aciklama:'Hesap numarası' },
          { ad:'HSL', aciklama:'Şirket kodu para birimi tutarı' },
          { ad:'RCNTR / PRCTR', aciklama:'Maliyet yeri / kâr merkezi — aynı satırda' },
        ] },

      { ad:'GLT0', baslik:'Klasik ana muhasebe toplamları',
        tutar:'Hesap ve dönem bazında borç/alacak toplamları. {{FS10N}}’in kaynağıdır.',
        olusturan:'Klasik ana muhasebede kayıt anında güncellenirdi',
        guncelleyen:'ECC’de her FI kaydı',
        anahtar:'RLDNR + BUKRS + RACCT + RYEAR',
        iliskiler:'{{BSEG}}’den türetilen özet.',
        s4:'**Kaldırıldı.** Aynı isimde bir {{uyumluluk-view}} {{ACDOCA}}’dan veri üretir; yazma yapılamaz.' },

      { ad:'BSIS', baslik:'G/L açık kalemleri (indeks)',
        tutar:'Açık kalem yönetimli hesapların kapanmamış kalemleri.',
        olusturan:'Açık kalem yönetimli hesaba yapılan kayıt',
        guncelleyen:'Kayıt işlemleri; kapatınca kalem {{BSAS}}’a taşınırdı',
        anahtar:'BUKRS + HKONT + AUGDT + AUGBL + ZUONR + GJAHR + BELNR + BUZEI',
        iliskiler:'{{BSEG}}’in hızlı erişim indeksi.',
        s4:'**Kaldırıldı**, {{uyumluluk-view}}’ine dönüştürüldü. Doğrudan yazan özel programlar bozulur.' },
    ],

    er:{
      type:'er',
      baslik:'Ana muhasebe tablo ilişkileri',
      varliklar:[
        { ad:'SKA1', rol:'Ana veri', aciklama:'Hesap planı seviyesi',
          alanlar:[{ ad:'KTOPL', tip:'pk' }, { ad:'SAKNR', tip:'pk' }, { ad:'XBILK' }] },
        { ad:'SKB1', rol:'Ana veri', aciklama:'Şirket kodu seviyesi',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'SAKNR', tip:'fk' }, { ad:'XOPVW' }, { ad:'MITKZ' }] },
        { ad:'BKPF', rol:'Başlık', aciklama:'Belge kimliği',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'BSEG', rol:'Kalem', aciklama:'Klasik kalem',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'ACDOCA', rol:'Evrensel', hub:true, aciklama:'S/4HANA tek kaynağı',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'RACCT', tip:'fk' }, { ad:'HSL' }] },
        { ad:'BSIS', rol:'İndeks', aciklama:'G/L açık kalemleri (S/4’te view)',
          alanlar:[{ ad:'HKONT', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZUONR' }] },
        { ad:'GLT0', rol:'Toplam', aciklama:'Klasik toplamlar (S/4’te view)',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'RACCT', tip:'fk' }, { ad:'RYEAR' }] },
      ],
      iliskiler:[
        { from:'SKA1', to:'SKB1', alanlar:'SAKNR', not:'bir hesap, çok şirket kodu' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'başlık → kalem' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR + GJAHR', not:'evrensel görünüm' },
        { from:'BSEG', to:'SKB1', alanlar:'HKONT → SAKNR', not:'kalemin hesabı' },
        { from:'ACDOCA', to:'SKB1', alanlar:'RACCT → SAKNR', not:'evrensel kalemin hesabı' },
        { from:'BSEG', to:'BSIS', alanlar:'BELNR + BUZEI', not:'açık kalem indeksi' },
        { from:'ACDOCA', to:'GLT0', alanlar:'RACCT + RYEAR', not:'S/4’te toplamlar buradan üretilir' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Aşağıda ana muhasebede en sık yapılan iki işin ekran akışı var: **kayıt girmek** ve ' +
      '**bir bakiyeyi açıklamak**. İkincisi danışmanlıkta birincisinden daha çok zaman alır.',

    ekranlar:[
      { ad:'{{FB50}} — kayıt girişi',
        aciklama:'Üstte başlık alanları, altta kalem tablosu, sağ üstte bakiye göstergesi.',
        alanlar:[
          { ad:'Kayıt tarihi (`BUDAT`)', zorunlu:true, aciklama:'Dönemi belirler. Dönem kapalıysa kayıt yapılamaz.' },
          { ad:'G/L hesabı', zorunlu:true, aciklama:'Mutabakat hesabı girilemez.' },
          { ad:'B/A ve tutar', zorunlu:true, aciklama:'Toplamlar eşitlenmeden kaydedilemez.' },
          { ad:'Maliyet yeri', zorunlu:false, aciklama:'Gider hesaplarında {{alan-durumu}} genellikle zorunlu kılar.' },
          { ad:'Atama (`ZUONR`)', zorunlu:false, aciklama:'Açık kalem yönetimli hesapta **çok önemlidir**: {{F.13}} bu alana bakarak eşleştirme yapar.' },
        ],
        ipucu:'Kaydetmeden önce her zaman *Belge → Simüle et*. {{belge-bolme}} açık sistemlerde 2 satırlık girdinin 6 satıra dönüştüğünü orada görürsün.' },

      { ad:'{{FBL3N}} — bakiyeyi açıklama',
        aciklama:'"159 hesabının bakiyesi neden 340.000?" sorusunun cevabı bu ekranda bulunur.',
        alanlar:[
          { ad:'G/L hesabı', zorunlu:true, aciklama:'İncelenecek hesap.' },
          { ad:'Kalem tipi', zorunlu:true, aciklama:'Açık / kapalı / tüm. Geçiş hesabı temizliğinde **açık kalemler** seçilir.' },
          { ad:'Anahtar tarih', zorunlu:true, aciklama:'Açık kalem seçildiğinde "hangi tarihte açıktı" sorusunu cevaplar.' },
          { ad:'Düzen (layout)', zorunlu:false, aciklama:'Atama ve metin sütunlarını ekle, atamaya göre alt toplam al — eşleşmeyen kalemler böyle bulunur.' },
        ],
        ipucu:'Düzeni kaydedip varsayılan yaptığında her açılışta hazır gelir. Danışmanlıkta bu küçük alışkanlık günde yarım saat kazandırır.' },

      { ad:'{{F-03}} — kapatma ekranı',
        aciklama:'Açık kalemler listelenir; seçilenlerin net tutarı sıfır olmalıdır.',
        alanlar:[
          { ad:'Hesap ve kapatma tarihi', zorunlu:true, aciklama:'Kapatma belgesinin kayıt tarihi.' },
          { ad:'Kalem seçimi', zorunlu:true, aciklama:'Ekranın altındaki "Atanmamış" alanı **sıfır** olmalıdır; değilse kapatma yapılamaz.' },
        ],
        ipucu:'"Difference too large" hatası alıyorsan çoğu zaman yanlış kalemleri seçmişsindir; tolerans ayarını değiştirmeden önce seçimi kontrol et.' },
    ],

    zorunlu:['Belge tarihi','Kayıt tarihi','Şirket kodu','G/L hesabı','Borç/Alacak','Tutar'],
    opsiyonel:['Belge türü','Referans','Başlık metni','Vergi kodu','Maliyet yeri','Kâr merkezi','Atama','Satır metni'],

    hatalar:[
      { mesaj:'Posting period ... is not open for account type S', sebep:'{{OB52}}’de dönem ana muhasebe (S) için kapalı.', cozum:'Dönem varyantında S satırında dönemi aç; yetkiyi de kontrol et (yetki grubu alanı).' },
      { mesaj:'Account ... cannot be directly posted to', sebep:'{{mutabakat-hesabi}}.', cozum:'{{FB60}}/{{FB70}} ile muavin defter üzerinden kaydet.' },
      { mesaj:'Account ... requires an assignment to a CO object', sebep:'Hesap birincil masraf hesabı ama CO nesnesi girilmemiş.', cozum:'Maliyet yeri gir veya {{OKB9}} ile varsayılan tanımla.' },
      { mesaj:'G/L account ... is blocked for posting in company code ...', sebep:'Hesap {{FS00}}’da kayda kapatılmış.', cozum:'Bloğun sebebini araştır; gerçekten gerekiyorsa kaldır.' },
      { mesaj:'Difference too large for clearing', sebep:'Kapatılacak kalemlerin toplamı sıfır değil, fark {{tolerans-grubu}} dışında.', cozum:'Seçimi düzelt veya fark satırı gir.' },
      { mesaj:'Field Business Area is a required field', sebep:'Şirket kodunun alan durumu varyantı iş alanını zorunlu kılıyor.', cozum:'İş alanını gir; kalıcı çözüm için alan durumu varyantını gözden geçir.' },
      { mesaj:'Ledger 0L: document splitting error — item not assigned', sebep:'{{belge-bolme}} kuralları satırı sınıflandıramadı.', cozum:'Belge bölme karakteristiklerini ve kalem kategorisi atamalarını IMG’de kontrol et.' },
    ],

    ipuclari:[
      'Rutin ay sonu kayıtları için **hesap atama şablonu** (account assignment model) veya **tekrarlayan kayıt** ({{FBD1}} + {{F.14}}) kur. Kira, sigorta ve amortisman benzeri sabit kayıtlar elle girilmemelidir.',
      'Dönem sonu tahakkuklarını {{FBS1}} ile gir; {{F.81}} ile sonraki dönemde otomatik ters kaydedilir ve çift kayıt riski ortadan kalkar.',
      'Bir hesabın bakiyesi beklenmedikse önce {{FS10N}}/{{FAGLB03}} ile hangi dönemde bozulduğunu bul, sonra {{FBL3N}} ile o dönemin kalemlerine in. Tersini yapmak zaman kaybıdır.',
      'Geçiş hesaplarında sıralama anahtarını doğru kur; {{F.13}} otomatik kapatmanın çalışması buna bağlıdır.',
      '{{FBL3N}} düzenlerini kaydet ve varsayılan yap. Her seferinde sütun ayarlamak, danışmanın en çok kaybettiği zamandır.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Belge başlığı' },
      { tablo:'BSEG', ne:'Kalemler (klasik)' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler; her aktif defter için ayrı satır kümesi' },
      { tablo:'BSET', ne:'Vergi kodu varsa vergi satırları' },
      { tablo:'BSIS', ne:'Açık kalem yönetimli hesapta açık kalem (S/4’te view üzerinden)' },
      { tablo:'GLT0', ne:'ECC’de toplamlar; S/4HANA’da güncellenmez, view’den üretilir' },
    ],

    commit:
      'Kayıt tek bir LUW içinde yazılır. Numara ataması ayrı çalıştığı için iptal edilen işlemde bile ' +
      'numara tüketilmiş olabilir — belge numaralarında boşluk normaldir. ' +
      'Asenkron güncelleme takılırsa {{SM13}} ile bakılır.',

    belgeNo:
      'Zincir: {{belge-turu}} → numara aralığı anahtarı ({{T003}}) → {{FBN1}}’deki şirket kodu + mali yıl satırı → ' +
      'sonraki numara. Kaydetme anında verilir.',

    postingLogic:
      'Ana muhasebede kaydın izlediği yol:\n\n' +
      '**1.** Belge türü izin verilen hesap tiplerini belirler.\n' +
      '**2.** {{FB50}}’de seçilen borç/alacak arka planda {{kayit-anahtari}}’na dönüşür (40 borç, 50 alacak).\n' +
      '**3.** Hesabın alan durumu grubu ({{SKB1}} `FSTAG`) ile kayıt anahtarının alan durumu karşılaştırılır; **en kısıtlayıcı** uygulanır.\n' +
      '**4.** Vergi kodu varsa vergi satırı ve {{BSET}} kaydı üretilir.\n' +
      '**5.** {{belge-bolme}} açıksa satırlar kâr merkezi/bölüm bazında bölünür.\n' +
      '**6.** {{belge-denkligi}} kontrol edilir — her defter için ayrı ayrı.\n' +
      '**7.** Numara atanır, {{BKPF}}/{{BSEG}}/{{ACDOCA}} yazılır.\n' +
      '**8.** Hesap açık kalem yönetimliyse indeks kaydı oluşur.',

    belgeTuru:
      'Ana muhasebede en sık kullanılan türler: **SA** (genel G/L kaydı), **AB** (genel belge, her hesap tipine izin verir), ' +
      '**AF** (amortisman), **SB** (G/L hesap kaydı). Tür, numara aralığını ve izin verilen hesap tiplerini belirler.',

    numberRange:
      'Şirket kodu + mali yıl bazlıdır ({{FBN1}}). Yeni yıl satırları {{OBH1}} ile önceki yıldan topluca kopyalanır — ' +
      'yılbaşı hazırlığının standart adımıdır. Aralık **tanımı** taşınabilir ama **güncel sayaç** taşınmaz.',

    accountDetermination:
      'Ana muhasebede kullanıcı hesabı doğrudan girer, otomatik belirleme yalnızca **sistem tarafından üretilen satırlar** için çalışır: ' +
      'vergi satırı {{OB40}}, kur farkı ve fark hesapları IMG’deki otomatik kayıt ayarlarından, ' +
      'MM/SD’den gelen satırlar {{OBYC}}/{{VKOA}}’dan. Hepsi {{T030}} tablosuna yazar.',

    tur:
      '**Özelleştirme:** hesap planı ({{OB13}}), hesap grupları ve alan durumu ({{OBD4}}), alan durumu varyantı, ' +
      'belge türleri ({{OBA7}}), numara aralığı tanımı ({{FBN1}}), {{mali-tablo-yapisi}} ({{OB58}}), otomatik kapatma kuralları.\n\n' +
      '**Ana veri:** G/L hesaplarının kendisi ({{SKA1}} + {{SKB1}}).',

    transport:
      'Yapılandırma taşınır; hesaplar taşınmaz. Bu, projelerde en sık yaşanan sürprizdir: ' +
      'test sisteminde çalışan bir senaryo canlıda "hesap yok" hatası verir. ' +
      'Hesaplar ayrıca yüklenmelidir ({{LTMC}}/{{LSMW}} veya elle).',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → Ana Veri → G/L Hesapları → Hazırlık → Hesap Planını Düzenle', not:'{{hesap-plani}} ({{OB13}})' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → Ana Veri → G/L Hesapları → Hazırlık → Hesap Grupları ve Alan Durumunu Tanımla', not:'{{hesap-grubu}} + {{alan-durumu}} ({{OBD4}})' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Kayıt Dönemleri → Kayıt Dönemlerini Aç ve Kapat', not:'Dönem kontrolü ({{OB52}})' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → İş İşlemleri → Açık Kalem Kapatma → Otomatik Kapatmayı Hazırla', not:'{{F.13}} kapatma kuralları' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → Raporlama → Mali Tablolar → Mali Tablo Yapısını Tanımla', not:'{{mali-tablo-yapisi}} ({{OB58}})' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → İş İşlemleri → Kapanış → Devir → Bakiye Devri', not:'{{bakiye-devri}} ({{FAGLGVTR}})' },
    ],

    ekstra:[
      { ic:'🧩', baslik:'Hesap planı türleri', metin:
        'SAP’ta üç tür hesap planı vardır ve karıştırılmaları yaygındır:\n\n' +
        '**Operasyonel hesap planı** — günlük kayıtların yapıldığı, zorunlu olan plan. {{T001}} `KTOPL` alanında tutulur.\n\n' +
        '**Ülke hesap planı** — yerel mevzuatın istediği numaralandırma. Hesap ana verisindeki *alternatif hesap numarası* alanıyla bağlanır. ' +
        'Türkiye’de Tek Düzen Hesap Planı raporlaması bu yolla çözülebilir.\n\n' +
        '**Grup hesap planı** — konsolidasyon için ortak numaralandırma. Farklı ülkelerdeki şirketlerin ' +
        'farklı operasyonel planlarını tek çatıda toplar.' },

      { ic:'⚖️', baslik:'Alan durumu varyantı ile alan durumu grubu farkı', metin:
        'İkisi karıştırılır ama farklıdır:\n\n' +
        '**Alan durumu grubu** hesaba bağlıdır ({{SKB1}} `FSTAG`) — "bu hesaba kayıt yapılırken hangi alanlar zorunlu?"\n\n' +
        '**Alan durumu varyantı** şirket koduna bağlıdır ({{OBY6}}) — grupları toplayan kapsayıcıdır. ' +
        'Bir şirket kodunun varyantında tanımlı olmayan bir grup, o şirket kodunda kullanılamaz.\n\n' +
        'Bir alan hem hesap grubunda hem kayıt anahtarında tanımlıysa **en kısıtlayıcı olan kazanır**.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Açık kalem yönetimi kararı geri dönülmesi zor bir karardır', metin:
        'Hesapta hareket varken bu ayar değiştirilemez. Değiştirmek için bakiyeyi sıfırlamak, ayarı değiştirmek ve ' +
        'bakiyeyi geri yüklemek gerekir — canlı sistemde riskli bir operasyondur. ' +
        'Bu yüzden hesap açarken "bu hesapta kalem eşleştirmesi yapılacak mı?" sorusu **mutlaka** cevaplanmalıdır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Ana muhasebe, S/4HANA’nın en çok değiştirdiği alandır — ama değişen **veri modelidir, muhasebe değil**. ' +
      'Hesap planı, kayıt mantığı ve mali tablolar aynıdır; toplamların ve indekslerin nerede durduğu değişti.',

    eccFarklari:[
      { konu:'Bakiye kaynağı', ecc:'{{GLT0}} / {{FAGLFLEXT}} toplam tabloları', s4:'{{ACDOCA}}’dan anlık hesaplanır' },
      { konu:'Açık kalem indeksi', ecc:'{{BSIS}} / {{BSAS}} fiziksel tablo', s4:'{{uyumluluk-view}} — fiziksel tablo yok' },
      { konu:'Kalem raporu', ecc:'{{FBL3N}}', s4:'{{FAGLL03}} / {{FBL3H}} / Fiori' },
      { konu:'Masraf türü', ecc:'{{KA01}} ile ayrı ana veri', s4:'G/L hesabının tipi ({{FS00}})' },
      { konu:'Kalem sayısı sınırı', ecc:'{{BSEG}} 999 kalem', s4:'{{ACDOCA}} `DOCLN` 6 hane — pratikte sınır yok' },
      { konu:'Para birimi sayısı', ecc:'2 (yerel + ek)', s4:'10’a kadar paralel para birimi' },
      { konu:'Kilitlenme', ecc:'Toplam tablosu satırı kilitlenir', s4:'Toplam tablosu yok — kilit sorunu ortadan kalkar' },
    ],

    universalJournal:
      'Ana muhasebe açısından {{evrensel-kayit-defteri}}’nin üç somut sonucu vardır:\n\n' +
      '**1. Mutabakat kavramı değişir.** FI ile CO aynı satırda olduğu için aralarında fark oluşamaz. ' +
      'ECC’de ay sonu rutininin bir parçası olan FI–CO mutabakatı gereksizleşir.\n\n' +
      '**2. Bakiye artık saklanmaz, hesaplanır.** Bu yüzden geriye dönük düzeltme kayıtları bakiyeleri anında ' +
      'tutarlı hâle getirir; "toplam tablosu bozuldu, yeniden oluşturalım" senaryosu ortadan kalkar.\n\n' +
      '**3. Her boyut her raporda kullanılabilir.** Maliyet yeri, kâr merkezi, bölüm, varlık numarası aynı satırda ' +
      'olduğu için ek bir birleştirme gerekmeden raporlanır.',

    kalkanTcodes:[
      { eski:'{{KA01}} / KA02', yeni:'{{FS00}}', not:'Masraf türü G/L hesap tipine dönüştü' },
      { eski:'{{FBL3N}}', yeni:'{{FAGLL03}} / {{FBL3H}}', not:'Çalışır ama defter bazlı raporlama için yenisi önerilir' },
      { eski:'{{FS10N}}', yeni:'{{FAGLB03}} / Fiori Trial Balance', not:'Defter bazlı bakiye için' },
      { eski:'{{F.16}}', yeni:'{{FAGLGVTR}}', not:'Bakiye devri yeni ana muhasebe programına taşındı' },
    ],

    fiori:[
      { ad:'Post General Journal Entries', aciklama:'{{FB50}} yerine; Excel şablonuyla toplu yükleme yapabilir.' },
      { ad:'Display Line Items in General Ledger', aciklama:'{{FAGLL03}}’ün Fiori hâli; anlık süzme ve gruplama.' },
      { ad:'Trial Balance', aciklama:'Anlık mizan; hesaptan kaleme, kalemden belgeye tek tıkla iniş.' },
      { ad:'Clear G/L Accounts', aciklama:'{{F-03}} yerine; önerilen eşleşmeleri kendiliğinden gösterir.' },
      { ad:'Manage G/L Account Master Data', aciklama:'{{FS00}} yerine; toplu düzenleme destekler.' },
      { ad:'Financial Statement', aciklama:'{{F.01}} yerine; mali tablo yapısını görsel hiyerarşiyle sunar.' },
    ],

    compatibilityViews:[
      '{{GLT0}}, {{FAGLFLEXT}} — toplam tabloları view’e dönüştü.',
      '{{BSIS}}, {{BSAS}} — G/L açık/kapalı kalem indeksleri view’e dönüştü.',
      'Bu view’lere **yazma yapılamaz**. Eski özel programlar okuma yapıyorsa çalışır; INSERT/UPDATE yapıyorsa geçişte bozulur.',
      'Geçiş projesinde bu tablolara yazan Z-programlarını taramak, ana muhasebe tarafındaki en önemli teknik hazırlıktır.',
    ],

    performans:
      'Toplam tablosu olmadığı için kayıt sırasında kilitlenme yaşanmaz — aynı hesaba eşzamanlı yüzlerce kayıt ' +
      'birbirini bekletmez. Okuma tarafında ise sütun tabanlı depolama sayesinde milyonlarca kalemin toplanması ' +
      'saniyeler sürer. Pratik sonuç: gerçek zamanlı mizan ve anlık bilanço mümkündür.',

    bestPractices:[
      'Hesap planını S/4HANA geçişinde sadeleştir. Raporlama için açılmış onlarca hesabı {{kar-merkezi}} ve ' +
      '{{maliyet-yeri}} boyutlarıyla değiştirebilirsin — evrensel defter zaten bu boyutları taşıyor.',
      'Gider hesaplarını doğru tiple aç ("Primary Costs or Revenue"); yanlış tip sonradan neredeyse düzeltilemez.',
      'Yeni raporları CDS view üzerine kur; {{BSEG}} tabanlı özel raporları taşımak yerine yeniden yaz.',
      'Geçiş öncesi geçiş hesaplarını ({{gr-ir}}, banka ara hesapları) temizle. Kirli açık kalemler yeni sisteme taşınır ve orada temizlemek daha zordur.',
      '{{belge-bolme}} kullanacaksan geçişten **önce** karar ver; sonradan devreye almak çok maliyetlidir.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Bir geçiş hesabının hikâyesi — GR/IR bakiyesi neden 340.000 TL?',
    hikaye:
      '**Marmara Tekstil A.Ş.**’de ay sonu kapanışında muhasebe müdürü 159 GR/IR hesabının bakiyesini görüyor: ' +
      '**340.000 TL alacak**. Beklenen sıfıra yakın bir rakamdı. ' +
      'Bu senaryo, ana muhasebede bir bakiyenin nasıl açıklandığını ve düzeltildiğini baştan sona gösterir — ' +
      'danışmanlıkta en sık yapılan işlerden biridir.',
    veriler:[
      { k:'Şirket kodu', v:'1000' },
      { k:'Hesap', v:'159000 — GR/IR hesabı (açık kalem yönetimli)' },
      { k:'Dönem', v:'Haziran 2026' },
      { k:'Beklenen bakiye', v:'~0 TL' },
      { k:'Görülen bakiye', v:'340.000 TL alacak' },
    ],

    adimlar:[
      { baslik:'Bakiyenin hangi dönemde bozulduğu bulunur', tcode:'FS10N',
        aciklama:'Önce **hangi ay** sorusunu cevapla. Kalem listesine dalmadan önce dönem bazında bakmak zaman kazandırır.',
        girdi:[
          { alan:'Hesap / Şirket kodu', deger:'159000 / 1000' },
          { alan:'Mali yıl', deger:'2026' },
          { alan:'Bulgu', deger:'Ocak–Nisan bakiyesi ~0; **Mayıs’ta 260.000, Haziran’da 340.000 alacak**' },
        ],
        not:'Bakiye Mayıs’ta bozulmuş ve büyüyor. Demek ki mal girişi yapılıp faturası gelmeyen siparişler birikiyor.' },

      { baslik:'Açık kalemler listelenir ve gruplanır', tcode:'FBL3N',
        aciklama:'Açık kalemler, **atama alanına göre alt toplamlı** listelenir. Birbirini götüren kalemler yan yana gelir; yalnız kalanlar sorunludur.',
        girdi:[
          { alan:'Hesap', deger:'159000' },
          { alan:'Kalem tipi', deger:'**Açık kalemler**, anahtar tarih 30.06.2026' },
          { alan:'Düzen', deger:'Atama (`ZUONR`), Referans, Metin sütunları eklendi; atamaya göre alt toplam' },
          { alan:'Bulgu', deger:'18 kalem açık. 14’ü eşleşiyor (mal girişi + fatura). **4 kalem yalnız: toplam 340.000 TL alacak**' },
        ],
        tabloEtkisi:[
          { tablo:'BSIS', ne:'Bu rapor bu tablodan okur (S/4HANA’da {{ACDOCA}} üzerinden view)' },
        ] },

      { baslik:'Yalnız kalan kalemlerin belgesine inilir', tcode:'FB03',
        aciklama:'Her açık kalem çift tıklanarak belgesine gidilir; `AWKEY` alanından kaynak MM belgesine ulaşılır.',
        girdi:[
          { alan:'Kalem 1–3', deger:'Malzeme belgesi 5000001xxx — mal girişi yapılmış, faturası gelmemiş (280.000 TL)' },
          { alan:'Kalem 4', deger:'Malzeme belgesi 5000001999 — **mal iade edilmiş ama fatura düzeltmesi yapılmamış** (60.000 TL)' },
        ],
        not:'İki farklı sorun bulundu: birincisi normal bir zamanlama farkı, ikincisi gerçek bir hata.' },

      { baslik:'Zamanlama farkı için yeniden sınıflama yapılır', tcode:'F.19',
        aciklama:'280.000 TL’lik kısım gerçek bir zamanlama farkıdır: mal geldi, fatura Temmuz’da gelecek. ' +
                 'Bilançoda "GR/IR" olarak değil, **"alınan ama faturalanmamış mallar"** olarak gösterilmelidir.',
        girdi:[
          { alan:'Şirket kodu / Dönem', deger:'1000 / 06.2026' },
          { alan:'Çalıştırma', deger:'Önce deneme modu, sonra gerçek' },
        ],
        fis:{ baslik:'Belge 100000456 — GR/IR yeniden sınıflama', belgeTuru:'SA', tarih:'30.06.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR hesabı', borc:280000, not:'Geçici olarak boşaltılıyor' },
            { hesap:'326', ad:'Alınan ama faturalanmamış mallar', alacak:280000, not:'Bilanço sunum hesabı' },
          ], not:'Bu kayıt **1 Temmuz’da otomatik ters kaydedilir**; {{F.19}} bunu kendisi planlar. Amaç yalnızca 30 Haziran bilançosunda doğru sunum yapmaktır.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'Yeniden sınıflama belgesi ve ters kayıt belgesi (01.07.2026 tarihli)' },
        ] },

      { baslik:'Gerçek hata düzeltilir — iade için fatura düzeltmesi', tcode:'MIRO',
        aciklama:'60.000 TL’lik kalem bir hatadır: mal iade edildi ama satıcıya alacak dekontu girilmedi. ' +
                 'Bu, sınıflama sorunu değil, **eksik işlem**tir.',
        girdi:[
          { alan:'İşlem', deger:'Alacak dekontu (Credit memo)' },
          { alan:'Satınalma siparişi', deger:'4500001456' },
          { alan:'Tutar', deger:'72.000 TL (60.000 + %20 KDV)' },
        ],
        fis:{ baslik:'Belge 5100000234 — Satıcı alacak dekontu', belgeTuru:'RE', tarih:'30.06.2026',
          satirlar:[
            { hesap:'320', ad:'Satıcılar', borc:72000, not:'Satıcıya olan borç azaldı' },
            { hesap:'159', ad:'GR/IR hesabı', alacak:60000, not:'İade hareketinin karşılığı' },
            { hesap:'191', ad:'İndirilecek KDV', alacak:12000, not:'KDV düzeltmesi' },
          ], not:'İade hareketiyle GR/IR’daki 60.000 TL’lik kalem artık eşleşebilir hâle geldi.' } },

      { baslik:'Eşleşen kalemler kapatılır', tcode:'F.13',
        aciklama:'Artık eşleşebilen kalemler otomatik kapatma ile temizlenir. Önce deneme modunda çalıştırılır.',
        girdi:[
          { alan:'Şirket kodu / Hesap', deger:'1000 / 159000' },
          { alan:'Mod', deger:'Önce deneme → 16 kalem kapatılacak → gerçek mod' },
        ],
        tabloEtkisi:[
          { tablo:'BSEG', ne:'Kapatılan kalemlerin `AUGBL` alanına kapatma belgesi numarası yazıldı' },
          { tablo:'BSIS', ne:'Kapatılan kalemler buradan çıktı' },
          { tablo:'BSAS', ne:'Kapatılmış kalem olarak buraya taşındı' },
        ],
        not:'{{F.13}} eşleştirmeyi atama (`ZUONR`) alanına göre yapar. Hiçbir kalem kapatılmıyorsa sorun {{F.13}}’te değil, hesabın sıralama anahtarındadır.' },

      { baslik:'Dönem kapatılır ve tablolar alınır', tcode:'OB52',
        aciklama:'GR/IR temizlendikten sonra Haziran dönemi kapatılır ve mali tablolar üretilir.',
        girdi:[
          { alan:'Dönem kontrolü', deger:'{{OB52}} → dönem 06 kapatıldı, 07 açıldı' },
          { alan:'Rapor', deger:'{{F.01}} → bilanço; 159 hesabı artık ~0, 326 hesabı 280.000' },
        ] },
    ],

    sonuc:
      '340.000 TL’lik bakiye ikiye ayrıldı: **280.000 TL gerçek bir zamanlama farkıydı** (doğru sunum için yeniden ' +
      'sınıflandı) ve **60.000 TL gerçek bir hataydı** (eksik alacak dekontu girildi).\n\n' +
      'Bu senaryodaki asıl ders, ana muhasebe çalışmasının yöntemidir:\n\n' +
      '**1.** Bakiyeyi gör ({{FS10N}}) → **2.** Hangi dönemde bozulduğunu bul → **3.** Açık kalemlere in ({{FBL3N}}) → ' +
      '**4.** Yalnız kalanları belgeye kadar takip et ({{FB03}}) → **5.** Sınıflama sorunu mu, gerçek hata mı ayır → ' +
      '**6.** Düzelt ve kapat ({{F.13}}).\n\n' +
      'Bu altı adım, ana muhasebedeki hemen her bakiye sorununu çözer. Danışmanlıkta "hesap analizi" denen iş budur.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '{{ana-muhasebe}}, mali tabloların üretildiği merkezî defterdir; muavin defterler buraya {{mutabakat-hesabi}} ile özet olarak yansır.',
      'Hesaplar üç eksende sınıflanır: **bilanço/gelir-gider**, **mutabakat hesabı mı**, **açık kalem yönetimli mi**.',
      '{{acik-kalem-yonetimi}} yalnızca geçiş hesaplarında (GR/IR, banka ara hesabı, avanslar) açılır — gelir/gider hesaplarında gereksizdir.',
      'Hesap ana verisi iki katmanlıdır: {{SKA1}} (hesap planı) + {{SKB1}} (şirket kodu).',
      'Bilanço hesapları yıl sonunda devreder; gelir-gider hesapları sıfırlanır ve sonuç özkaynağa aktarılır ({{bakiye-devri}}).',
      'S/4HANA’da bakiyeler saklanmaz, {{ACDOCA}}’dan **anlık hesaplanır**; {{GLT0}} ve {{BSIS}} {{uyumluluk-view}}’ine dönüştü.',
      'Bakiye analizinin yöntemi: bakiye → dönem → açık kalem → belge → düzeltme → kapatma.',
    ],

    onemliNoktalar:[
      '**"Açık kalem yönetimi hangi hesaplarda açılır?"** İki olay arasında geçiş görevi görenlerde: {{gr-ir}}, {{banka-ara-hesabi}}, avans hesapları. Gelir/gider hesaplarında açılmaz.',
      '**"Mutabakat hesabına neden doğrudan kayıt yapılamaz?"** Muavin defter ile ana muhasebe tutarlılığı bozulmasın diye. {{SKB1}} `MITKZ` alanı bunu belirler.',
      '**"Bilanço ve gelir-gider hesabı farkı?"** Bilanço devreder, gelir-gider sıfırlanır. {{SKA1}} `XBILK` alanıyla ayrılır.',
      '**"{{F.13}} neden hiçbir kalemi kapatmıyor?"** Eşleştirme atama (`ZUONR`) alanına göre yapılır; hesabın sıralama anahtarı ({{SKB1}} `ZUAWA`) yanlışsa alan boş kalır ve eşleşme olmaz.',
      '**"Hesap planı türleri nelerdir?"** Operasyonel (zorunlu), ülke (yerel raporlama, alternatif hesap numarasıyla) ve grup (konsolidasyon).',
      '**"S/4HANA’da bakiye nereden geliyor?"** Toplam tablosu yok; {{ACDOCA}}’dan anlık toplanıyor.',
      '**"Alan durumu varyantı ile grubu farkı?"** Varyant şirket koduna ({{OBY6}}), grup hesaba ({{SKB1}} `FSTAG`) bağlıdır. Çakışmada en kısıtlayıcı kazanır.',
      '**"GR/IR bakiyesi neden sıfır olmalı?"** Her mal girişinin bir faturası olmalı. Kalıcı bakiye ya eksik fatura ya eksik mal girişi ya da düzeltilmemiş iade demektir.',
    ],

    sikHatalar:[
      { hata:'Her gelir/gider hesabında {{acik-kalem-yonetimi}} açmak.', dogru:'Yalnızca geçiş hesaplarında açılır. Gereksiz açmak kalem birikmesine ve gereksiz kapatma işine yol açar.' },
      { hata:'Hesapta hareket varken açık kalem yönetimini değiştirmeye çalışmak.', dogru:'Değiştirilemez. Bakiyeyi sıfırla-değiştir-geri yükle gerekir; çoğu zaman yeni hesap açmak daha güvenlidir.' },
      { hata:'Geçiş hesabında sıralama anahtarını ayarlamamak.', dogru:'Sıralama anahtarı `ZUONR`’u doldurur; {{F.13}} otomatik kapatması buna bağlıdır.' },
      { hata:'Test sisteminde açılan hesabın canlıda da olduğunu sanmak.', dogru:'Hesap {{ana-veri}}dir, taşınmaz. Canlıda ayrıca açılmalıdır.' },
      { hata:'GR/IR bakiyesini "nasılsa kapanır" diye görmezden gelmek.', dogru:'Her ay {{F.19}} ile analiz edilmeli; birikirse bilanço gerçeği göstermez ve denetimde sorun çıkar.' },
      { hata:'Bakiye sorununda doğrudan kalem listesine dalmak.', dogru:'Önce {{FS10N}} ile hangi dönemde bozulduğunu bul; sonra o dönemin kalemlerine in. Tersi büyük zaman kaybıdır.' },
      { hata:'S/4HANA’da gider hesabını "Balance Sheet" tipiyle açmak.', dogru:'"Primary Costs or Revenue" seçilmelidir; aksi hâlde kayıt CO’ya hiç akmaz.' },
      { hata:'Yanlış kapatmayı düzeltmek için ters kayıt girmek.', dogru:'{{FBRA}} ile kapatma geri alınır; kalemler yeniden açık hâle gelir. Ek belge üretmeye gerek yoktur.' },
    ],

    ipuclari:[
      '{{FBL3N}} düzenini **atama alanına göre alt toplamlı** ayarla ve kaydet. Geçiş hesabı temizliğinin yarısı bu düzenle biter.',
      'Ay sonu rutin kayıtlarını elle girme: **tekrarlayan kayıt** ({{FBD1}} + {{F.14}}) veya **hesap atama şablonu** kur.',
      'Dönem sonu tahakkuklarını {{FBS1}} ile gir — {{F.81}} sonraki dönemde otomatik ters kaydeder ve çift kayıt riskini sıfırlar.',
      'Yeni hesap açarken üç soruyu cevapla: bilanço mu gelir-gider mi? mutabakat hesabı mı? açık kalem yönetimli mi? Bu üçü hesabın tüm hayatını belirler.',
      '{{F.13}} ve {{AFAB}} gibi toplu işlemleri **her zaman önce deneme modunda** çalıştır.',
      'Bir belgenin kaynağını merak ettiğinde {{FB03}} → belge başlığı → `AWKEY`. Entegrasyon izini en hızlı buradan sürersin.',
    ],

    quiz:[
      { soru:'Hangi hesapta {{acik-kalem-yonetimi}} açılmalıdır?',
        secenekler:['600 Yurtiçi satışlar','770 Genel yönetim gideri','159 GR/IR hesabı','500 Sermaye'],
        dogru:2,
        aciklama:'{{gr-ir}} bir geçiş hesabıdır: mal girişi alacak, fatura girişi borç yazar ve ikisi eşleşince kalem kapanır. ' +
                 'Gelir, gider ve özkaynak hesaplarında kalem eşleştirmesi anlamlı değildir; yalnızca bakiye önemlidir.' },

      { soru:'Yıl sonunda 600 Yurtiçi satışlar hesabının bakiyesine ne olur?',
        secenekler:[
          'Aynen yeni yıla devreder',
          'Sıfırlanır ve sonuç özkaynağa aktarılır',
          'Mutabakat hesabına taşınır',
          'Silinir',
        ], dogru:1,
        aciklama:'{{gelir-tablosu}} hesapları bir dönemi ölçer ve her yıl sıfırdan başlar. Net sonuç {{bakiye-devri}} ile ' +
                 'özkaynak altındaki dönem kârı hesabına aktarılır. {{bilanco}} hesapları ise bakiyesiyle devreder.' },

      { soru:'{{F.13}} çalıştırıldı ama hiçbir kalem kapatılmadı. En olası sebep nedir?',
        secenekler:[
          'Dönem kapalı',
          'Hesabın sıralama anahtarı yanlış; atama (`ZUONR`) alanı boş kalıyor',
          'Kullanıcının yetkisi yok',
          'Hesap bilanço hesabı değil',
        ], dogru:1,
        aciklama:'{{F.13}} eşleştirmeyi atama alanına göre yapar. Bu alan hesabın sıralama anahtarından ({{SKB1}} `ZUAWA`) ' +
                 'otomatik doldurulur. Anahtar yanlışsa alan boş kalır ve eşleşecek kalem bulunamaz. Sorun {{F.13}}’te değil, hesap ana verisindedir.' },

      { soru:'S/4HANA’da bir G/L hesabının bakiyesi nereden hesaplanır?',
        secenekler:[
          '{{GLT0}} toplam tablosundan',
          '{{FAGLFLEXT}} toplam tablosundan',
          '{{ACDOCA}}’daki kalemlerden anlık olarak',
          '{{BSIS}} indeks tablosundan',
        ], dogru:2,
        aciklama:'S/4HANA’da toplam tabloları kaldırıldı. Bakiye {{ACDOCA}}’daki kalemlerden anlık toplanır. ' +
                 '{{GLT0}} ve {{FAGLFLEXT}} artık {{uyumluluk-view}}dir ve verilerini yine ACDOCA’dan üretir.' },

      { soru:'"Account 320000 cannot be directly posted to" hatasının sebebi nedir?',
        secenekler:[
          'Hesap kayda bloklanmış',
          'Hesap bir {{mutabakat-hesabi}} ({{SKB1}} `MITKZ` dolu)',
          'Dönem kapalı',
          'Hesap açık kalem yönetimli',
        ], dogru:1,
        aciklama:'Mutabakat hesabına doğrudan kayıt yapılamaz; muavin defter ile ana muhasebe tutarlılığı bozulmasın diye ' +
                 'SAP bunu engeller. Kayıt {{FB60}}/{{FB70}} ile satıcı/müşteri numarası üzerinden yapılır.' },

      { soru:'GR/IR hesabında dönem sonunda 280.000 TL alacak bakiye var ve bu gerçek bir zamanlama farkı. Doğru işlem nedir?',
        secenekler:[
          'Bakiyeyi gider yazmak',
          '{{F.19}} ile yeniden sınıflamak; kayıt sonraki dönemde otomatik ters kaydedilir',
          'Kalemleri {{F.13}} ile zorla kapatmak',
          'Hiçbir şey yapmamak',
        ], dogru:1,
        aciklama:'Mal geldi, fatura gelmedi — bu normal bir zamanlama farkıdır ama bilançoda "GR/IR" olarak değil, ' +
                 '"alınan ama faturalanmamış mallar" olarak sunulmalıdır. {{F.19}} bu sınıflamayı yapar ve ' +
                 'sonraki dönemde otomatik ters kaydeder; gerçek fatura gelince çift kayıt olmaz.' },

      { soru:'Bir G/L hesabının ana verisi hangi iki tabloda tutulur?',
        secenekler:[
          '{{BKPF}} ve {{BSEG}}',
          '{{SKA1}} ve {{SKB1}}',
          '{{SKA1}} ve {{ACDOCA}}',
          '{{SKB1}} ve {{GLT0}}',
        ], dogru:1,
        aciklama:'{{SKA1}} hesap planı seviyesi (tüm şirket kodları için ortak), {{SKB1}} şirket kodu seviyesi (özel ayarlar). ' +
                 '{{FS00}} ikisini tek ekranda yönetir. {{BKPF}}/{{BSEG}}/{{ACDOCA}} ise hareket verisidir.' },

      { soru:'Yanlış yapılmış bir kapatma (clearing) nasıl düzeltilir?',
        secenekler:[
          '{{FB08}} ile ters kayıt',
          '{{FBRA}} ile kapatma geri alınır',
          '{{FB02}} ile kalem değiştirilir',
          'Yeni bir kapatma belgesi girilir',
        ], dogru:1,
        aciklama:'{{FBRA}} kapatmayı geri alır ve kalemler yeniden {{acik-kalem}} hâline gelir. ' +
                 '{{FB08}} belgenin kendisini ters kaydeder — kapatmayı düzeltmek için yanlış araçtır.' },
    ],

    flashcards:[
      { on:'Ana muhasebe (G/L) ile muavin defter farkı nedir?', arka:'**Muavin defter** ayrıntıyı tutar (800 satıcının tek tek bakiyesi).\n**Ana muhasebe** özeti tutar (tek satır: 320 Satıcılar).\n\nBağlantı: **mutabakat hesabı**.' },
      { on:'Bir G/L hesabı açarken cevaplanması gereken üç soru nedir?', arka:'1. **Bilanço mu, gelir-gider mi?** (SKA1-XBILK)\n2. **Mutabakat hesabı mı?** (SKB1-MITKZ)\n3. **Açık kalem yönetimli mi?** (SKB1-XOPVW)\n\nBu üçü hesabın tüm davranışını belirler.' },
      { on:'Açık kalem yönetimi hangi hesaplarda açılır?', arka:'**Geçiş hesaplarında:** GR/IR, banka ara hesapları, avans hesapları, personel avansları.\n\nGelir ve gider hesaplarında **açılmaz** — orada "hangi gider hangi ödemeyle kapandı" sorusu yoktur.' },
      { on:'Sıralama anahtarı (ZUAWA) neden önemlidir?', arka:'`ZUONR` (atama) alanını **otomatik doldurur**.\n\nF.13 otomatik kapatma eşleştirmeyi bu alana göre yapar. Yanlış anahtar = otomatik kapatma hiç çalışmaz.' },
      { on:'Bilanço ve gelir-gider hesaplarına yıl sonunda ne olur?', arka:'**Bilanço:** bakiye aynen yeni yıla devreder.\n**Gelir-gider:** sıfırlanır, net sonuç özkaynaktaki dönem kârına aktarılır.\n\nİkisini de FAGLGVTR yapar.' },
      { on:'S/4HANA’da G/L bakiyesi nereden gelir?', arka:'**ACDOCA’daki kalemlerden anlık hesaplanır.**\n\nGLT0 ve FAGLFLEXT toplam tabloları kaldırıldı; aynı isimli compatibility view’ler veriyi ACDOCA’dan üretir.' },
      { on:'Hesap planı türleri nelerdir?', arka:'**Operasyonel** — günlük kayıtlar, zorunlu (T001-KTOPL)\n**Ülke** — yerel mevzuat, alternatif hesap numarasıyla bağlanır\n**Grup** — konsolidasyon için ortak numaralandırma' },
      { on:'Bir bakiye sorununu çözmenin altı adımı nedir?', arka:'1. Bakiyeyi gör (FS10N)\n2. Hangi dönemde bozuldu\n3. Açık kalemlere in (FBL3N)\n4. Yalnız kalanları belgeye takip et (FB03)\n5. Sınıflama sorunu mu, gerçek hata mı?\n6. Düzelt ve kapat (F.13)' },
      { on:'GR/IR bakiyesi neden sıfıra yakın olmalıdır?', arka:'Her mal girişinin bir faturası olmalıdır.\n\nKalıcı bakiye üç şeyden birini gösterir: eksik fatura, eksik mal girişi, veya düzeltilmemiş iade.\n\nF.19 ile analiz edilir.' },
      { on:'Yanlış kapatma nasıl geri alınır?', arka:'**FBRA** ile.\n\nKalemler yeniden açık hâle gelir. FB08 (ters kayıt) burada yanlış araçtır — o belgenin kendisini iptal eder, kapatmayı değil.' },
      { on:'Alan durumu varyantı ile alan durumu grubu farkı nedir?', arka:'**Varyant** şirket koduna bağlıdır (OBY6) — grupları toplayan kapsayıcı.\n**Grup** hesaba bağlıdır (SKB1-FSTAG) — o hesapta hangi alan zorunlu.\n\nÇakışmada **en kısıtlayıcı** kazanır.' },
      { on:'FBL3N ile FAGLL03 farkı nedir?', arka:'**FBL3N** klasik kalem raporu — defter kavramı yok.\n**FAGLL03** yeni ana muhasebe raporu — **defter (ledger)** bazında çalışır, kâr merkezi/bölüm gibi ek boyutlarla süzer.\n\nParalel defter varsa FAGLL03 kullanılır.' },
    ],
  },

  },
});
