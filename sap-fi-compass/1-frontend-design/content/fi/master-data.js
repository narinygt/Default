/* ==========================================================================
   content/fi/master-data.js — "Master Data (Ana Veri)" konusunun derin içeriği
   ========================================================================== */

SAP.registerTopic({
  id: 'master-data',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      '{{ana-veri}}, işlemler arasında kalıcı olan, sık değişmeyen veridir: bir G/L hesabı, bir satıcı, bir müşteri, ' +
      'bir duran varlık, bir banka. Buna karşılık her fatura, ödeme ve mal hareketi {{hareket-verisi}}dir.\n\n' +
      'Ayrımın pratik karşılığı şudur: **hareket verisi ana veriye referans verir.** ' +
      'Bir satıcı faturası girdiğinde tutarı sen yazarsın ama vadeyi, mutabakat hesabını ve ödeme yöntemini ' +
      'SAP satıcı ana verisinden okur. Yani ana veri, gelecekteki yüzlerce işlemin davranışını önceden belirler.',

    neden:
      '**Tekrarı önlemek için.** Aynı satıcıya 500 fatura giriyorsan adresini 500 kez yazmazsın.\n\n' +
      '**Tutarlılık için.** Ana veri tek yerde tutulduğu için "aynı satıcı üç farklı isimle kayıtlı" sorunu ' +
      'doğru kurgulandığında ortaya çıkmaz.\n\n' +
      '**Davranışı merkezden yönetmek için.** Bir satıcıya ödeme bloğu koyduğunda o satıcının tüm faturaları ' +
      'anında ödeme dışı kalır. Kontrol, kaydın kendisinde değil ana veridedir.',

    sirketOnemi:
      'SAP projelerinin gecikme sebeplerinin başında **ana veri kalitesi** gelir. Yapılandırma iki haftada biter, ' +
      'ana veri temizliği aylar sürer.\n\n' +
      'Bunun sebebi eski sistemden gelen verinin genelde kirli olmasıdır: mükerrer satıcılar, boş vergi numaraları, ' +
      'artık çalışılmayan müşteriler. Bu veri temizlenmeden taşınırsa problem SAP’a da taşınır — ' +
      've SAP’ta düzeltmek çok daha pahalıdır. Danışmanlıkta "garbage in, garbage out" en çok burada geçerlidir.',

    gercekHayat:
      'Bir satıcı ana verisinde ödeme koşulu yanlışlıkla "peşin" tanımlanmış olsun. Muhasebe hiçbir şey fark etmez, ' +
      'çünkü fatura girerken vade otomatik gelir. Ama {{F110}} çalıştığında o satıcının tüm faturaları ' +
      '**vadesi gelmiş** sayılır ve erkenden ödenir.\n\n' +
      'Şirket iki ay boyunca gereksiz yere nakit çıkışı yapar ve kimse sebebini anlamaz. ' +
      'Hata faturada değil, iki yıl önce açılmış bir ana veri kaydındadır. Ana verinin gücü ve riski budur.',

    muhasebeMantigi:
      'Ana verinin muhasebeye bağlandığı yer {{mutabakat-hesabi}}dır. Satıcı ana verisinde ({{LFB1}} `AKONT`) ' +
      'hangi G/L hesabı yazıyorsa, o satıcıya yapılan her kayıt ana muhasebede o hesaba yansır.\n\n' +
      'Bu sayede ana muhasebede tek bir "320 Satıcılar" satırı görürsün ama arkasında 800 satıcının ayrıntısı durur. ' +
      '{{muavin-defter}} ile {{ana-muhasebe}} arasındaki köprü tam olarak bu alandır.\n\n' +
      'Aynı mantık müşteri ({{KNB1}} `AKONT`) ve duran varlık ({{varlik-sinifi}} → hesap belirleme) için de geçerlidir.',

    kavramlar: ['ana-veri', 'hareket-verisi', 'mutabakat-hesabi', 'hesap-grubu', 'alan-durumu',
                'acik-kalem-yonetimi', 'odeme-kosulu', 'odeme-yontemi', 'muavin-defter'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Ana veri açmak teknik olarak bir ekran doldurmaktır ama **süreç olarak bir onay zinciridir**. ' +
      'Kimin ana veri açabileceği, hangi alanların kim tarafından doldurulacağı ve nasıl denetleneceği ' +
      'kurumsal şirketlerde sıkı kurallara bağlıdır. Sebebi basit: ana veri, para akışını yönlendirir.',

    roller:[
      { rol:'Talep eden birim', gorev:'Yeni satıcı/müşteri ihtiyacını bildirir; ticari bilgileri (unvan, adres, vergi no) sağlar.' },
      { rol:'Ana veri ekibi (MDM)', gorev:'Mükerrer kontrolü yapar, genel bölümü açar, hesap grubunu belirler.' },
      { rol:'Satın alma / Satış', gorev:'Kendi bölümünü tamamlar: satın alma organizasyonu / satış alanı verisi.' },
      { rol:'Muhasebe', gorev:'Şirket kodu bölümünü açar: {{mutabakat-hesabi}}, {{odeme-kosulu}}, {{odeme-yontemi}}, {{ihtar-prosedürü}}.' },
      { rol:'Muhasebe müdürü', gorev:'Kritik alanlardaki (banka hesabı, mutabakat hesabı) değişiklikleri onaylar.' },
      { rol:'İç denetim', gorev:'{{CDHDR}}/{{CDPOS}} üzerinden değişiklik geçmişini denetler — özellikle banka hesabı değişikliklerini.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Yeni satıcı ana verisi açma süreci',
      adimlar:[
        { ic:'📝', rol:'Talep eden birim', baslik:'Ana veri talebi açılır',
          aciklama:'Unvan, adres, vergi numarası ve banka bilgisi belgeleriyle birlikte iletilir.',
          cikti:'Ana veri talep formu', ok:'MDM ekibine düşer' },
        { ic:'🔍', rol:'Ana veri ekibi', baslik:'Mükerrer kontrolü yapılır',
          aciklama:'Vergi numarasından arama yapılır ({{SE16N}} → {{LFA1}} `STCD1`). Aynı firma başka isimle kayıtlı olabilir.',
          cikti:'Mükerrer değil onayı', ok:'temiz ise devam' },
        { ic:'🏷️', rol:'Ana veri ekibi', baslik:'Hesap grubu seçilir',
          aciklama:'{{hesap-grubu}} numara aralığını ve hangi alanların zorunlu olacağını belirler. ' +
                   'Yurtdışı satıcı ile tek seferlik satıcı farklı gruplardadır.',
          cikti:'Satıcı numarası', ok:'genel bölüm açılır' },
        { ic:'🌐', rol:'Ana veri ekibi', baslik:'Genel bölüm doldurulur ({{LFA1}})',
          aciklama:'Ad, adres, ülke, vergi numarası. Bu bölüm tüm şirket kodları için ortaktır.',
          cikti:'{{LFA1}} kaydı', ok:'muhasebeye düşer' },
        { ic:'💰', rol:'Muhasebe', baslik:'Şirket kodu bölümü doldurulur ({{LFB1}})',
          aciklama:'{{mutabakat-hesabi}}, {{odeme-kosulu}}, izin verilen {{odeme-yontemi}}, {{ihtar-prosedürü}}.',
          cikti:'{{LFB1}} kaydı', ok:'satın almaya düşer' },
        { ic:'🛒', rol:'Satın alma', baslik:'Satın alma bölümü doldurulur ({{LFM1}})',
          aciklama:'Sipariş para birimi, teslimat koşulu, satın alma grubu. MM tarafı için gereklidir.',
          cikti:'{{LFM1}} kaydı', ok:'onaya gider' },
        { ic:'✓', rol:'Muhasebe müdürü', baslik:'Banka bilgisi onaylanır ve kullanıma açılır',
          aciklama:'Dolandırıcılığın en sık girişi banka hesabı değişikliğidir; bu alan ayrı onaydan geçirilir.',
          cikti:'Kullanıma hazır satıcı' },
      ],
    },

    adimlar:[
      { rol:'Talep eden birim', eylem:'Ana veri talebi ve belgeleri iletir', sistem:'Talep formu / iş akışı' },
      { rol:'Ana veri ekibi', eylem:'Mükerrer kontrolü ve hesap grubu seçimi', sistem:'{{SE16N}} → {{LFA1}}, {{BP}}' },
      { rol:'Ana veri ekibi', eylem:'Genel bölümü açar', sistem:'{{BP}} (S/4HANA) veya {{XK01}} (ECC)' },
      { rol:'Muhasebe', eylem:'Şirket kodu bölümünü tamamlar', sistem:'{{BP}} → FI Vendor rolü veya {{FK01}}' },
      { rol:'Satın alma', eylem:'Satın alma organizasyonu bölümünü tamamlar', sistem:'{{BP}} → Purchasing rolü' },
      { rol:'Muhasebe müdürü', eylem:'Banka ve mutabakat hesabını onaylar', sistem:'Değişiklik onay akışı' },
      { rol:'İç denetim', eylem:'Değişiklik geçmişini periyodik denetler', sistem:'{{CDHDR}} / {{CDPOS}}' },
    ],

    veriAkisi:{
      nereden:'Ticari belgeler (vergi levhası, imza sirküleri, banka teyidi), eski sistem verisi, iş ortağı formları.',
      nereye:'Her fatura, ödeme, mal hareketi ve raporda referans olarak kullanılır. {{F110}} ödeme yöntemini, ' +
             '{{F150}} ihtar prosedürünü buradan okur.',
      tetikleyen:'Yeni iş ortağıyla çalışma kararı veya yeni hesap ihtiyacı.',
      sonraki:'Ana veri açıldıktan sonra ilk işlem genellikle satınalma siparişi veya faturadır.',
    },

    notlar:[
      { tip:'warn', baslik:'Ana verinin sessiz gücü', metin:
        'Ana veri hatası kayıt anında hata vermez — sadece **yanlış davranışa** yol açar. ' +
        'Yanlış ödeme koşulu erken ödeme, yanlış mutabakat hesabı yanlış bilanço kalemi, ' +
        'eksik ihtar prosedürü tahsil edilmeyen alacak demektir. Bu yüzden ana veri denetimi belge denetiminden önemlidir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Ana veri **kendisi muhasebe kaydı üretmez** — bir satıcı açmak hiçbir hesabı etkilemez. ' +
      'Ama ürettiği kayıtların şeklini belirler. Aşağıda aynı 60.000 TL’lik faturanın, ' +
      'yalnızca ana veri farkıyla nasıl bambaşka kayıtlara dönüştüğünü görüyorsun.',

    etkilenenHesaplar:[
      { hesap:'Mutabakat hesabı ({{LFB1}} `AKONT`)', tur:'Bilanço', neden:'Satıcı kaleminin ana muhasebede hangi hesapta görüneceğini belirler. Yurtiçi ve yurtdışı satıcılar farklı hesaplara ayrılabilir.' },
      { hesap:'Alternatif mutabakat hesabı ({{ozel-ana-muhasebe-gostergesi}})', tur:'Bilanço', neden:'{{avans}} gibi işlemlerde normal hesap yerine ayrı hesap kullanılmasını sağlar.' },
      { hesap:'Gider/gelir hesabı', tur:'Gelir tablosu', neden:'Kullanıcı girer ama hesabın {{alan-durumu}} grubu hangi ek alanların zorunlu olacağını belirler.' },
      { hesap:'Vergi hesapları', tur:'Bilanço', neden:'Hesabın {{vergi-kodu}} kategorisi ({{SKB1}} `MWSKZ` ayarı) vergi girilip girilemeyeceğini belirler.' },
    ],

    fisler:[
      { baslik:'Aynı fatura — Satıcı A: mutabakat hesabı 320 (yurtiçi)',
        belgeTuru:'KR', tarih:'05.05.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:50000 },
          { hesap:'191', ad:'İndirilecek KDV', borc:10000 },
          { hesap:'320', ad:'Satıcılar — yurtiçi', alacak:60000, not:'{{LFB1}} `AKONT` = 320' },
        ] },

      { baslik:'Aynı fatura — Satıcı B: mutabakat hesabı 321 (yurtdışı)',
        belgeTuru:'KR', tarih:'05.05.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:50000 },
          { hesap:'191', ad:'İndirilecek KDV', borc:10000 },
          { hesap:'321', ad:'Satıcılar — yurtdışı', alacak:60000, not:'{{LFB1}} `AKONT` = 321' },
        ],
        not:'Kullanıcı hiçbir şeyi farklı yapmadı; **tek fark ana veridir.** Bilançoda yurtiçi ve yurtdışı borçların ayrı satırlarda görünmesi bu sayede sağlanır.' },

      { baslik:'Aynı satıcıya avans — özel ana muhasebe göstergesi ile ({{F-48}})',
        belgeTuru:'KZ', tarih:'08.05.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'Verilen sipariş avansları', borc:30000, not:'`UMSKZ` = A → alternatif hesap devreye girdi' },
          { hesap:'102', ad:'Bankalar', alacak:30000 },
        ],
        not:'Satıcı aynı, mutabakat hesabı 320 — ama {{ozel-ana-muhasebe-gostergesi}} "A" girildiği için kayıt 320’ye değil 159’a gitti. Avans bir borç değil, bir **alacaktır**; bilançoda ayrı görünmesi gerekir.' },
    ],

    tHesaplar:[
      { hesap:'Satıcılar — yurtiçi', kod:'320 (mutabakat)',
        borc:[{ ad:'Ödeme', tutar:60000 }],
        alacak:[{ ad:'Fatura — Satıcı A', tutar:60000 }, { ad:'Fatura — Satıcı C', tutar:45000 }],
        not:'800 satıcının toplamı tek hesapta' },
      { hesap:'Verilen sipariş avansları', kod:'159 (özel G/L)',
        borc:[{ ad:'Avans ödemesi', tutar:30000 }],
        alacak:[{ ad:'Fatura ile mahsup (F-54)', tutar:30000 }],
        not:'Mahsup sonrası sıfırlanır' },
    ],

    notlar:[
      { tip:'tip', baslik:'Mutabakat hesabı sonradan değişirse ne olur?', metin:
        'Eski kayıtlar **eski hesapta kalır**, yeni kayıtlar yeni hesaba gider. Bu yüzden mutabakat hesabı değişikliği ' +
        'bakiye transferi gerektiren ciddi bir operasyondur; canlı sistemde ancak dönem sonunda ve düzeltme kaydıyla yapılır.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:'FI’da dört temel ana veri nesnesi vardır. Her birinin katman yapısı farklıdır ve bu yapı, verinin nerede paylaşıldığını belirler.',
    liste:[
      { ad:'G/L hesabı', en:'General Ledger Account',
        aciklama:'İki katmanlıdır: **hesap planı seviyesi** ({{SKA1}}) tüm şirket kodları için ortaktır — numara, ad, hesap grubu, bilanço/gelir-gider ayrımı. ' +
                 '**Şirket kodu seviyesi** ({{SKB1}}) her şirkete özeldir — para birimi, vergi kategorisi, {{acik-kalem-yonetimi}}, {{alan-durumu}} grubu.',
        neZaman:'Yeni bir muhasebe hesabı gerektiğinde. Ama önce sor: gerçekten yeni hesap mı gerekiyor, yoksa {{maliyet-yeri}} ile ayrıştırmak yeter mi?',
        ornek:'Aynı "770 Genel yönetim gideri" hesabı 5 şirket kodunda kullanılır ama her birinde farklı para biriminde olabilir.',
        tcodes:['FS00','FSP0','FSS0','OBD4'] },

      { ad:'Satıcı (İş Ortağı)', en:'Supplier / Vendor',
        aciklama:'Üç katmanlıdır: **genel** ({{LFA1}}) ad-adres-vergi no, **şirket kodu** ({{LFB1}}) muhasebe ayarları, ' +
                 '**satın alma organizasyonu** ({{LFM1}}) MM ayarları. S/4HANA’da üçü de {{BP}} üzerinden yönetilir.',
        neZaman:'Şirket birinden mal/hizmet alıyor ve borçlanıyorsa.',
        ornek:'Bir grup şirketinde aynı satıcı tek bir {{LFA1}} kaydına sahiptir ama 4 şirket kodunda 4 ayrı {{LFB1}} kaydı olabilir — her birinde farklı ödeme koşuluyla.',
        tcodes:['BP','XK01','FK01','FBL1N'] },

      { ad:'Müşteri (İş Ortağı)', en:'Customer',
        aciklama:'Satıcı ile simetriktir: **genel** ({{KNA1}}), **şirket kodu** ({{KNB1}}), **satış alanı** ({{KNVV}}).',
        neZaman:'Şirket vadeli satış yapıyorsa. Peşin perakende satışta tek bir "toplu müşteri" kaydı yeterli olabilir.',
        ornek:'S/4HANA’da aynı firma hem müşteri hem satıcıysa **tek bir {{BP}} kaydında iki rol** olarak tutulur — ECC’de iki ayrı kayıt gerekiyordu.',
        tcodes:['BP','XD01','FD01','FBL5N'] },

      { ad:'Duran varlık', en:'Asset',
        aciklama:'{{varlik-sinifi}}’ndan türetilir: sınıf hem numara aralığını hem hesap belirlemeyi hem de varsayılan ' +
                 '{{amortisman-anahtari}} ve {{faydali-omur}} değerlerini getirir. Ana kayıt {{ANLA}}, amortisman alanları {{ANLB}}.',
        neZaman:'Çok yıllık kullanılacak, {{aktiflestirme}} sınırının üzerindeki alımlarda.',
        ornek:'"Bilgisayarlar" sınıfında açılan bir varlık otomatik olarak 4 yıl faydalı ömür ve doğru bilanço hesabını alır.',
        tcodes:['AS01','AS02','AW01N','OAOA'] },

      { ad:'Banka ana verisi', en:'Bank Master Data',
        aciklama:'İki farklı şey karıştırılır: **banka ana verisi** ({{BNKA}}) dünyadaki tüm bankaların listesidir; ' +
                 '**{{ev-bankasi}}** ({{T012}}/{{T012K}}) ise şirketin kendi hesaplarıdır.',
        neZaman:'{{F110}} veya elektronik ekstre kullanılacaksa ev bankası tanımı zorunludur.',
        tcodes:['FI12','FCHI'] },
    ],

    karsilastirmaBasliklar:['Ana Veri', 'Özelleştirme (Customizing)'],
    karsilastirma:[
      ['Ne tutar', 'Hesap, satıcı, müşteri, varlık', 'Hesap grubu, belge türü, alan durumu kuralları'],
      ['Kim bakım yapar', 'Ana veri ekibi / muhasebe (son kullanıcı)', 'Danışman / yetkili yapılandırıcı'],
      ['Nerede yapılır', 'Uygulama işlemleri: {{FS00}}, {{BP}}, {{AS01}}', '{{SPRO}} → IMG ağacı'],
      ['Taşıma isteği', '**Girmez** — her sistemde ayrı yüklenir', '**Girer** — geliştirme → test → canlı'],
      ['Canlıda değiştirilebilir mi', 'Evet, günlük iş', 'Hayır, taşıma ile gelir'],
      ['Geçişte nasıl taşınır', '{{LTMC}} / {{LSMW}} ile veri yükleme', 'Taşıma isteği ile'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FS00', ad:'G/L hesabı merkezi bakım',
        amac:'Ana muhasebe hesabının hesap planı ve şirket kodu bölümlerini tek ekranda oluşturur, değiştirir ve görüntüler.',
        neZaman:'Yeni hesap açarken ve bir hesabın davranışını teşhis ederken. Hata analizinde en sık açılan ana veri ekranıdır.',
        adimlar:[
          { baslik:'Hesap numarası + şirket kodunu gir, "Oluştur" seç',
            aciklama:'Numara, {{hesap-grubu}}’nun izin verdiği aralıkta olmalıdır; dışındaysa hata alırsın.' },
          { baslik:'*Tip/Tanım* sekmesi',
            aciklama:'Hesap grubu, bilanço mu gelir-gider mi, kısa ve uzun metin. S/4HANA’da ayrıca **hesap tipi** seçilir: ' +
                     'Balance Sheet / Nonoperating Expense or Income / **Primary Costs or Revenue** / Secondary Costs.' },
          { baslik:'*Kontrol verisi* sekmesi',
            aciklama:'Para birimi, {{vergi-kodu}} kategorisi, **mutabakat hesabı tipi** (D/K/A), ' +
                     '{{acik-kalem-yonetimi}}, kalem görüntüleme, sıralama anahtarı.' },
          { baslik:'*Yaratma/bank/faiz* sekmesi',
            aciklama:'{{alan-durumu}} grubu — kayıt ekranında hangi alanın zorunlu/opsiyonel/gizli olacağını belirleyen alan. ' +
                     '"Bu alan neden zorunlu?" sorusunun cevabı burasıdır.' },
          { baslik:'Kaydet',
            aciklama:'Hesap {{ana-veri}}dir; taşıma isteğine girmez. Test sisteminde açtığın hesap canlıda **yoktur**.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'G/L hesabı 770000, şirket kodu 1000 → Oluştur' },
          { ekran:'Tip/Tanım', islem:'Hesap grubu: Gider hesapları · Gelir-gider hesabı · Tip: Primary Costs' },
          { ekran:'Kontrol verisi', islem:'Para birimi TRY · Vergi kategorisi: - (girilebilir) · Kalem görüntüleme: X' },
          { ekran:'Yaratma/bank/faiz', islem:'Alan durumu grubu: G004 (masraf hesapları)' },
        ],
        alanlar:{
          zorunlu:['G/L hesap numarası','Şirket kodu','Hesap grubu','Bilanço/Gelir-gider','Kısa metin','Hesap para birimi','Alan durumu grubu'],
          opsiyonel:['Vergi kategorisi','Açık kalem yönetimi','Sıralama anahtarı','Alternatif hesap numarası','Faiz göstergesi'] },
        hatalar:[
          { mesaj:'Account 770000 not created in chart of accounts INT', sebep:'Hesap planı seviyesi ({{SKA1}}) yok; sadece şirket kodu bölümü açılmaya çalışılıyor.', cozum:'Önce {{FSP0}} ile hesap planı seviyesini oluştur, sonra {{FSS0}} ile şirket kodu bölümünü ekle. {{FS00}} ikisini birden yapar.' },
          { mesaj:'Account number 770000 not within number range of account group', sebep:'Seçilen {{hesap-grubu}}’nun numara aralığı bu numarayı kapsamıyor.', cozum:'Doğru hesap grubunu seç veya {{OBD4}} ile aralığı genişlet.' },
          { mesaj:'Open item management cannot be activated; account has postings', sebep:'Hesapta hareket varken {{acik-kalem-yonetimi}} açılamaz.', cozum:'Bakiyeyi sıfırla, ayarı değiştir, bakiyeyi geri yükle; ya da SAP’ın dönüştürme programını (RFSEPA02 tipi) kullan. Canlıda dikkatli yapılır.' },
          { mesaj:'Company code area for account ... does not exist', sebep:'Hesap o şirket kodunda açılmamış.', cozum:'{{FSS0}} veya {{FS00}} ile şirket kodu bölümünü ekle.' },
        ],
        ipucu:'Yeni hesap açarken benzer bir hesabı **şablon olarak kopyala** (giriş ekranında "Şablonla oluştur"). Alan durumu ve kontrol ayarlarını yeniden düşünmek zorunda kalmazsın.',
        ilgili:['FSP0','FSS0','OBD4','FBL3N','FS10N'] },

      { kod:'BP', ad:'İş ortağı bakımı — S/4HANA’nın tek kapısı',
        amac:'Müşteri ve satıcı ana verisini tek nesne üzerinden yönetir. Aynı firma **rol** kavramıyla hem müşteri hem satıcı olabilir.',
        neZaman:'S/4HANA’da her müşteri/satıcı işleminde. Klasik {{XK01}}/{{XD01}} ekranları kaldırılmıştır.',
        adimlar:[
          { baslik:'İş ortağı türünü seç', aciklama:'Organization (tüzel kişi), Person (gerçek kişi) veya Group.' },
          { baslik:'Genel veriyi gir', aciklama:'Unvan, adres, iletişim, vergi numarası. Bu kısım {{LFA1}}/{{KNA1}}’e yazılır.' },
          { baslik:'Rol ekle: **FI Vendor** veya **FI Customer**',
            aciklama:'Rol ekranın sağ üstündeki açılır listeden seçilir. Rol eklenmeden muhasebe verisi girilemez — ' +
                     'yeni başlayanların en sık takıldığı yer burasıdır.' },
          { baslik:'Şirket kodu verisini gir', aciklama:'{{mutabakat-hesabi}}, {{odeme-kosulu}}, izin verilen {{odeme-yontemi}} (`ZWELS`), {{ihtar-prosedürü}}.' },
          { baslik:'Gerekirse satın alma / satış rolünü ekle', aciklama:'"Supplier (Purchasing)" veya "Customer (Sales)" rolleri MM/SD verisini açar.' },
          { baslik:'Banka bilgisini gir ve kaydet', aciklama:'IBAN genel veride tutulur; {{F110}} ödeme yaparken buradan okur.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Oluştur → Organization' },
          { ekran:'Adres', islem:'Unvan, ülke, vergi numarası' },
          { ekran:'Rol seçimi', islem:'FI Vendor rolü eklenir → şirket kodu sekmeleri açılır' },
          { ekran:'Şirket kodu verisi', islem:'Mutabakat hesabı 320000, ödeme koşulu 0030, ödeme yöntemi H' },
          { ekran:'Banka verisi', islem:'IBAN TR.. girilir' },
        ],
        alanlar:{
          zorunlu:['İş ortağı türü','Unvan/Ad','Ülke','Rol','Şirket kodu','Mutabakat hesabı'],
          opsiyonel:['Vergi numarası','Ödeme koşulu','Ödeme yöntemi','İhtar prosedürü','Ödeme bloğu','Banka IBAN'] },
        hatalar:[
          { mesaj:'Role FI Vendor cannot be assigned; number range not maintained', sebep:'BP grubu ile satıcı hesap grubu arasındaki eşleme (CVI) eksik.', cozum:'IMG → Cross-Application Components → Master Data Synchronization → Customer/Vendor Integration altında numara aralığı ve grup eşlemesini tamamla.' },
          { mesaj:'Reconciliation account 320000 not permitted', sebep:'Hesap {{SKB1}}’de `MITKZ` = K (satıcı) olarak işaretlenmemiş.', cozum:'{{FS00}} → Kontrol verisi → Mutabakat hesabı tipi = **K** yap.' },
          { mesaj:'Duplicate business partner found', sebep:'Aynı vergi numarası/unvanla kayıt var.', cozum:'Mevcut kaydı kullan. Gerçekten farklı bir tüzel kişilikse uyarıyı geç, ama önce kontrol et.' },
        ],
        ipucu:'BP ekranında hangi rolde olduğunu **sürekli kontrol et**. "Verimi giremiyorum" şikâyetlerinin çoğu yanlış roldeyken alan aramaktan kaynaklanır.',
        ilgili:['XK01','XD01','FK01','FD01','FBL1N','FBL5N'] },

      { kod:'OBD4', ad:'G/L hesap grubu tanımı',
        amac:'Hesap gruplarını, numara aralıklarını ve grup bazında {{alan-durumu}}nu tanımlar.',
        neZaman:'Hesap planı tasarlanırken ve "bu alan neden zorunlu/gizli?" sorusunun kaynağını ararken.',
        adimlar:[
          { baslik:'Hesap planını seç' },
          { baslik:'Grup ekle: kod, ad, numara aralığı (başlangıç–bitiş)' },
          { baslik:'Grubu seçip *Alan durumu* düğmesine bas', aciklama:'Alan grupları (Hesap kontrolü, Belge girişi, Banka/faiz…) tek tek gizli/zorunlu/opsiyonel yapılır.' },
        ],
        ipucu:'Numara aralıklarını en baştan mantıklı kur: 1xxxxx dönen varlık, 3xxxxx kısa vadeli borç gibi. Sonradan düzeltmek, açılmış hesapların taşınmasını gerektirir ve neredeyse imkânsızdır.',
        ilgili:['FS00','OB13'] },

      { kod:'AS01', ad:'Duran varlık oluştur',
        amac:'Yeni duran varlık ana verisini {{varlik-sinifi}}’na dayanarak açar.',
        neZaman:'Aktifleştirilecek bir alım yapıldığında, edinim kaydından **önce**.',
        adimlar:[
          { baslik:'Varlık sınıfı ve şirket kodunu gir', aciklama:'Sınıf, hesap belirlemeyi ve varsayılan amortisman ayarlarını getirir.' },
          { baslik:'*Genel* sekmesi', aciklama:'Tanım, miktar, envanter numarası.' },
          { baslik:'*Zaman bağımlı* sekmesi', aciklama:'{{maliyet-yeri}}, tesis, sorumlu kişi. Bu alanlar tarih bazlı değişebilir ({{ANLZ}}).' },
          { baslik:'*Amortisman alanları* sekmesi', aciklama:'{{amortisman-anahtari}} ve {{faydali-omur}}. Her {{amortisman-alani}} için ayrı ayrı ayarlanabilir — vergi ve ticari amortisman burada ayrışır.' },
        ],
        hatalar:[
          { mesaj:'Account determination ... for asset class not maintained', sebep:'{{AO90}}’da varlık sınıfı için hesap belirleme eksik.', cozum:'{{AO90}} ile bilanço, birikmiş amortisman, amortisman gideri ve satış kâr/zarar hesaplarını tanımla.' },
          { mesaj:'Depreciation key ... does not allow useful life of 0', sebep:'Faydalı ömür girilmemiş.', cozum:'Amortisman alanı sekmesinde ömrü gir; varlık sınıfında varsayılan tanımlanırsa otomatik gelir.' },
        ],
        ilgili:['AS02','AS03','AW01N','ABZON','OAOA','AO90'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Ana veri tablolarının ortak deseni şudur: **genel katman + organizasyon katmanı**. ' +
      'Genel katman kimlik bilgisini, organizasyon katmanı o organizasyona özgü davranışı tutar. ' +
      'Bu deseni bir kez kavradığında hangi bilginin hangi tabloda olduğunu tahmin edebilirsin.',

    liste:[
      { ad:'SKA1', baslik:'G/L hesabı — hesap planı katmanı',
        tutar:'Hesabın kimliği: numara, hesap grubu, bilanço mu gelir-gider mi. **Şirket kodundan bağımsızdır.**',
        olusturan:'{{FS00}} veya {{FSP0}}',
        guncelleyen:'{{FS00}}, {{FSP0}}, veri yükleme araçları',
        anahtar:'KTOPL + SAKNR',
        iliskiler:'{{SKB1}} ile 1-n (bir hesap birçok şirket kodunda); {{SKAT}} ile dil bazlı açıklamalar.',
        s4:'Değişmedi. Yeni "hesap tipi" (GLACCOUNT_TYPE) alanı eklendi — masraf türü ayrımı buraya taşındı.',
        alanlar:[
          { ad:'KTOPL', aciklama:'Hesap planı' },
          { ad:'SAKNR', aciklama:'Hesap numarası' },
          { ad:'KTOKS', aciklama:'{{hesap-grubu}} — numara aralığını ve alan durumunu getirir' },
          { ad:'XBILK', aciklama:'X ise bilanço hesabı; boşsa gelir-gider hesabı' },
        ] },

      { ad:'SKB1', baslik:'G/L hesabı — şirket kodu katmanı',
        tutar:'Hesabın o şirkette nasıl davranacağı: para birimi, vergi kategorisi, açık kalem yönetimi, alan durumu grubu, mutabakat hesabı tipi.',
        olusturan:'{{FS00}} veya {{FSS0}}',
        guncelleyen:'{{FS00}}, {{FSS0}}',
        anahtar:'BUKRS + SAKNR',
        iliskiler:'{{SKA1}}’in çocuğu; {{BSEG}}.HKONT buraya işaret eder.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'MITKZ', aciklama:'Mutabakat hesabı tipi: **D** müşteri, **K** satıcı, **A** duran varlık. Doluysa hesaba doğrudan kayıt yapılamaz.' },
          { ad:'XOPVW', aciklama:'{{acik-kalem-yonetimi}} — kapatma yapılabilmesi için X olmalı' },
          { ad:'FSTAG', aciklama:'{{alan-durumu}} grubu — hangi alan zorunlu/gizli' },
          { ad:'XKRES', aciklama:'Kalem görüntüleme açık mı — kapalıysa {{FBL3N}} kalem göstermez' },
          { ad:'ZUAWA', aciklama:'Sıralama anahtarı — `ZUONR` (atama) alanını otomatik doldurur; {{F.13}} için kritik' },
        ] },

      { ad:'LFA1', baslik:'Satıcı — genel katman',
        tutar:'Ad, adres, ülke, vergi numaraları, hesap grubu. Tüm şirket kodları için ortaktır.',
        olusturan:'{{BP}} (S/4HANA) veya {{XK01}} (ECC)',
        guncelleyen:'{{BP}}, {{XK01}}, {{XK02}}',
        anahtar:'LIFNR',
        iliskiler:'{{LFB1}} (şirket kodu) ve {{LFM1}} (satın alma) ile 1-n; {{BSEG}}.LIFNR buraya işaret eder.',
        s4:'Tablo duruyor ama artık {{BP}} tarafından doldurulur; doğrudan {{XK01}} ile bakım yapılmaz.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Satıcı numarası' },
          { ad:'STCD1 / STCD2', aciklama:'Vergi numarası alanları — mükerrer kontrolünde ilk bakılacak yer' },
          { ad:'KTOKK', aciklama:'Hesap grubu — numara aralığını ve alan durumunu belirler' },
          { ad:'SPERR / LOEVM', aciklama:'Merkezi blok / silme işareti' },
        ] },

      { ad:'LFB1', baslik:'Satıcı — şirket kodu katmanı',
        tutar:'Muhasebe davranışı: mutabakat hesabı, ödeme koşulu, izin verilen ödeme yöntemleri, ödeme bloğu, ihtar prosedürü.',
        olusturan:'{{BP}} → FI Vendor rolü veya {{FK01}}',
        guncelleyen:'{{BP}}, {{FK02}}',
        anahtar:'LIFNR + BUKRS',
        iliskiler:'{{LFA1}}’in çocuğu; {{BSIK}}/{{BSAK}} açık/kapalı kalemleri buraya bağlıdır.',
        s4:'Değişmedi; {{BP}} üzerinden doldurulur.',
        alanlar:[
          { ad:'AKONT', aciklama:'**{{mutabakat-hesabi}}** — bu satıcının ana muhasebedeki adresi' },
          { ad:'ZTERM', aciklama:'{{odeme-kosulu}} — vade buradan hesaplanır' },
          { ad:'ZWELS', aciklama:'İzin verilen {{odeme-yontemi}} listesi — {{F110}} bunun dışına çıkamaz' },
          { ad:'ZAHLS', aciklama:'{{odeme-blogu}} — doluysa {{F110}} bu satıcıyı öneriye almaz' },
          { ad:'MAHNA', aciklama:'{{ihtar-prosedürü}}' },
        ] },

      { ad:'KNB1', baslik:'Müşteri — şirket kodu katmanı',
        tutar:'Müşterinin muhasebe ayarları; {{LFB1}} ile simetriktir.',
        olusturan:'{{BP}} → FI Customer rolü veya {{FD01}}',
        guncelleyen:'{{BP}}, {{FD02}}',
        anahtar:'KUNNR + BUKRS',
        iliskiler:'{{KNA1}}’in çocuğu; {{BSID}}/{{BSAD}} kalemleri buraya bağlanır.',
        s4:'Değişmedi; {{BP}} üzerinden doldurulur.',
        alanlar:[
          { ad:'AKONT', aciklama:'Mutabakat hesabı (genelde 120 Alıcılar)' },
          { ad:'ZTERM', aciklama:'Ödeme koşulu' },
          { ad:'MAHNA / MANSP', aciklama:'İhtar prosedürü / ihtar bloğu' },
        ] },

      { ad:'ANLA', baslik:'Duran varlık — ana kayıt',
        tutar:'Varlığın kimliği: sınıf, tanım, aktifleştirme tarihi, envanter numarası.',
        olusturan:'{{AS01}}',
        guncelleyen:'{{AS01}}, {{AS02}}, {{ABUMN}} (transferde)',
        anahtar:'BUKRS + ANLN1 + ANLN2',
        iliskiler:'{{ANLB}} amortisman ayarları, {{ANLC}} yıllık değerler, {{ANEP}} hareketler, {{ANLZ}} zaman bağımlı atamalar.',
        s4:'Ana veri yapısı korundu; değerler {{ACDOCA}}’ya taşındı.',
        alanlar:[
          { ad:'ANLKL', aciklama:'{{varlik-sinifi}} — hesap belirlemeyi getirir' },
          { ad:'AKTIV', aciklama:'{{aktiflestirme}} tarihi — amortismanın başlangıcı' },
          { ad:'ANLN2', aciklama:'Alt varlık numarası — bileşenleri ayrı izlemek için' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Ana veri tablolarının katman yapısı',
      varliklar:[
        { ad:'SKA1', rol:'Hesap planı', aciklama:'Şirketten bağımsız hesap tanımı',
          alanlar:[{ ad:'KTOPL', tip:'pk' }, { ad:'SAKNR', tip:'pk' }, { ad:'KTOKS' }, { ad:'XBILK' }] },
        { ad:'SKB1', rol:'Şirket kodu', hub:true, aciklama:'Hesabın şirkete özgü davranışı',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'SAKNR', tip:'fk' }, { ad:'MITKZ' }, { ad:'XOPVW' }, { ad:'FSTAG' }] },
        { ad:'LFA1', rol:'Genel', aciklama:'Satıcı kimliği',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'NAME1' }, { ad:'STCD1' }, { ad:'KTOKK' }] },
        { ad:'LFB1', rol:'Şirket kodu', aciklama:'Satıcı muhasebe verisi',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT', tip:'fk' }, { ad:'ZTERM' }] },
        { ad:'KNA1', rol:'Genel', aciklama:'Müşteri kimliği',
          alanlar:[{ ad:'KUNNR', tip:'pk' }, { ad:'NAME1' }, { ad:'KTOKD' }] },
        { ad:'KNB1', rol:'Şirket kodu', aciklama:'Müşteri muhasebe verisi',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT', tip:'fk' }] },
        { ad:'ANLA', rol:'Varlık', aciklama:'Duran varlık ana kaydı',
          alanlar:[{ ad:'ANLN1', tip:'pk' }, { ad:'ANLKL' }, { ad:'AKTIV' }] },
      ],
      iliskiler:[
        { from:'SKA1', to:'SKB1', alanlar:'SAKNR', not:'bir hesap, birçok şirket kodu' },
        { from:'LFA1', to:'LFB1', alanlar:'LIFNR', not:'bir satıcı, birçok şirket kodu' },
        { from:'KNA1', to:'KNB1', alanlar:'KUNNR', not:'bir müşteri, birçok şirket kodu' },
        { from:'LFB1', to:'SKB1', alanlar:'AKONT → SAKNR', not:'mutabakat hesabı bağı' },
        { from:'KNB1', to:'SKB1', alanlar:'AKONT → SAKNR', not:'mutabakat hesabı bağı' },
        { from:'ANLA', to:'SKB1', alanlar:'ANLKL → hesap belirleme', not:'varlık sınıfı üzerinden (AO90)' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:'Aşağıda S/4HANA’da {{BP}} ile bir satıcı açmanın ekran ekran akışı var. En sık takılınan nokta **rol** kavramıdır.',

    ekranlar:[
      { ad:'İş ortağı türü ve numara',
        aciklama:'İlk karar: tüzel kişi mi gerçek kişi mi. Numara, seçilen BP gruba göre iç veya dış atanır.',
        alanlar:[
          { ad:'İş ortağı türü', zorunlu:true, aciklama:'Organization (şirket), Person (gerçek kişi), Group.' },
          { ad:'BP grubu', zorunlu:true, aciklama:'Numara aralığını belirler ve satıcı hesap grubuyla eşlenir (CVI eşlemesi).' },
          { ad:'İş ortağı numarası', zorunlu:false, aciklama:'İç atamada boş bırakılır, sistem verir.' },
        ] },

      { ad:'Adres ve kimlik verisi (genel katman → {{LFA1}})',
        aciklama:'Bu bölüm tüm şirket kodları için ortaktır.',
        alanlar:[
          { ad:'Unvan / Ad', zorunlu:true, aciklama:'Ticari unvan. Tutarlı bir isimlendirme kuralı belirle — mükerrer önlemenin yarısı budur.' },
          { ad:'Ülke / Adres', zorunlu:true, aciklama:'Ülke, vergi hesaplamasını ve ödeme formatını etkiler.' },
          { ad:'Vergi numarası (`STCD1`)', zorunlu:false, aciklama:'Mükerrer kontrolünün anahtarı. Zorunlu yapmak iyi bir uygulamadır.' },
          { ad:'Banka verisi (IBAN)', zorunlu:false, aciklama:'{{F110}} buradan okur. **Değişikliği ayrı onaya bağlanmalıdır** — dolandırıcılığın en sık girişi budur.' },
        ],
        ipucu:'Vergi numarasıyla önce {{SE16N}} → {{LFA1}} araması yap. Aynı firmanın "A.Ş.", "AS", "Anonim Şirketi" gibi üç kayıtla açılması en yaygın ana veri kirliliğidir.' },

      { ad:'Rol ekleme — kritik adım',
        aciklama:'BP ekranının sağ üstündeki rol açılır listesinden **FI Vendor** seçilir. Rol eklenmeden şirket kodu sekmeleri **görünmez**.',
        alanlar:[
          { ad:'Rol: FI Vendor (FLVN00)', zorunlu:true, aciklama:'Muhasebe verisini açar; {{LFB1}} bu rolle yazılır.' },
          { ad:'Rol: Supplier (Purchasing)', zorunlu:false, aciklama:'MM verisini ({{LFM1}}) açar. Satın alma siparişi verilecekse gerekir.' },
          { ad:'Rol: FI Customer (FLCU00)', zorunlu:false, aciklama:'Aynı firma müşteri de ise **aynı BP kaydına** bu rol eklenir — ECC’de iki ayrı kayıt gerekiyordu.' },
        ],
        ipucu:'"Alanları göremiyorum" şikâyeti geldiğinde ilk sorun: hangi roldesin? Roller arası geçiş yapmadan alan aramak boşuna zaman kaybıdır.' },

      { ad:'Şirket kodu verisi (→ {{LFB1}})',
        aciklama:'Muhasebe davranışının belirlendiği asıl ekran.',
        alanlar:[
          { ad:'Mutabakat hesabı (`AKONT`)', zorunlu:true, aciklama:'Hesap {{FS00}}’da `MITKZ` = K olarak işaretli olmalı, aksi hâlde kabul edilmez.' },
          { ad:'Ödeme koşulu (`ZTERM`)', zorunlu:false, aciklama:'Vade ve iskonto buradan hesaplanır. Yanlış değer, sessizce erken/geç ödemeye yol açar.' },
          { ad:'Ödeme yöntemleri (`ZWELS`)', zorunlu:false, aciklama:'{{F110}} yalnızca burada listelenen yöntemleri kullanabilir.' },
          { ad:'Ödeme bloğu (`ZAHLS`)', zorunlu:false, aciklama:'Yeni satıcıyı ilk onaya kadar bloklu açmak iyi bir kontroldür.' },
          { ad:'Sıralama anahtarı (`ZUAWA`)', zorunlu:false, aciklama:'`ZUONR` alanını otomatik doldurur; {{F.13}} ile otomatik kapatma yapılacaksa önemlidir.' },
          { ad:'İhtar prosedürü (`MAHNA`)', zorunlu:false, aciklama:'Satıcıda nadir, müşteride kritiktir.' },
        ] },
    ],

    zorunlu:['İş ortağı türü','BP grubu','Unvan/Ad','Ülke','Rol (FI Vendor / FI Customer)','Şirket kodu','Mutabakat hesabı'],
    opsiyonel:['Vergi numarası','Ödeme koşulu','Ödeme yöntemi','Ödeme bloğu','Sıralama anahtarı','İhtar prosedürü','Banka IBAN','Alternatif ödeme alıcısı'],

    hatalar:[
      { mesaj:'Reconciliation account 320000 not permitted for account type K', sebep:'Hesabın {{SKB1}} `MITKZ` alanı K (satıcı) değil.', cozum:'{{FS00}} → Kontrol verisi → Mutabakat hesabı tipi = K.' },
      { mesaj:'Number range for grouping ... is not maintained (CVI hatası)', sebep:'BP grubu ile satıcı/müşteri hesap grubu eşlemesi yapılmamış.', cozum:'IMG → Cross-Application Components → Master Data Synchronization → Customer/Vendor Integration → numara aralığı ve grup eşlemesini tamamla.' },
      { mesaj:'Field ... is not defined for this account group', sebep:'{{hesap-grubu}}’nun alan durumunda alan **gizli** olarak ayarlı.', cozum:'{{OBD4}} (G/L) veya satıcı/müşteri hesap grubu alan durumu ayarından alanı opsiyonel/zorunlu yap.' },
      { mesaj:'Account 770000 is blocked for posting', sebep:'Hesap {{FS00}}’da kayda kapatılmış.', cozum:'Bloğu kaldır veya doğru hesabı kullan. Blok bilinçli konmuşsa önce sebebini araştır.' },
      { mesaj:'Vendor 100234 is blocked for payment', sebep:'{{odeme-blogu}} (`ZAHLS`) dolu.', cozum:'{{BP}} → şirket kodu verisi → ödeme bloğunu kaldır. Blok bir uyuşmazlık nedeniyle konmuşsa önce çözüm bekle.' },
    ],

    ipuclari:[
      'Ana veri değişikliklerini {{CDHDR}}/{{CDPOS}} üzerinden düzenli denetle. Özellikle `LFBK` (banka hesabı) değişiklikleri: ödeme dolandırıcılığının en yaygın yolu budur.',
      'Yeni satıcıyı **ödeme bloklu** aç, ilk fatura onaylandıktan sonra bloğu kaldır. Basit ama çok etkili bir kontroldür.',
      'Toplu ana veri açarken {{LTMC}} (Migration Cockpit) kullan; {{BP}} ekranını {{LSMW}} ile kaydetmeye çalışma — ekran akışı dinamiktir ve kayıt bozulur.',
      'Hesap açarken benzer hesabı şablon olarak kopyala. Alan durumu ve kontrol ayarları hazır gelir.',
      'Silme yerine **blok** kullan. Ana veri silinemez çünkü geçmiş belgeler ona referans verir; silme işareti (`LOEVM`) yalnızca arşivleme içindir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'SKA1', ne:'Hesap planı seviyesi kaydı' },
      { tablo:'SKB1', ne:'Şirket kodu seviyesi kaydı' },
      { tablo:'SKAT', ne:'Dil bazlı hesap açıklamaları' },
      { tablo:'LFA1', ne:'Satıcı genel verisi ({{BP}} üzerinden)' },
      { tablo:'LFB1', ne:'Satıcı şirket kodu verisi' },
      { tablo:'KNA1', ne:'Müşteri genel verisi' },
      { tablo:'KNB1', ne:'Müşteri şirket kodu verisi' },
      { tablo:'ANLA', ne:'Duran varlık ana kaydı' },
      { tablo:'CDHDR', ne:'Her değişiklik için kim/ne zaman kaydı' },
      { tablo:'CDPOS', ne:'Değişen alanın eski ve yeni değeri' },
    ],

    commit:
      'Ana veri kaydı tek bir LUW içinde yazılır. {{BP}} tarafında ek bir katman vardır: ' +
      'BP kaydedildiğinde **CVI senkronizasyonu** tetiklenir ve {{LFA1}}/{{LFB1}} (veya {{KNA1}}/{{KNB1}}) ' +
      'kayıtları üretilir. Senkronizasyon hata alırsa BP oluşur ama satıcı oluşmaz — ' +
      'bu durumda MDS_LOAD_COCKPIT / MDS_PPO2 ile hata kuyruğuna bakılır.',

    belgeNo:
      'Ana veri numarası {{hesap-grubu}}’na (G/L için `KTOKS`, satıcı için `KTOKK`, müşteri için `KTOKD`, ' +
      'varlık için {{varlik-sinifi}}) bağlı numara aralığından gelir. İç atamada sistem verir, dış atamada kullanıcı. ' +
      'S/4HANA’da BP grubunun kendi numara aralığı da vardır ve satıcı/müşteri aralığıyla **eşlenmelidir** (CVI).',

    postingLogic:
      'Ana veri kayıt üretmez ama kaydın şeklini belirler. Zincir: ' +
      '**hesap grubu → alan durumu → hangi alanlar görünür/zorunlu**, ve ' +
      '**{{mutabakat-hesabi}} → kaydın ana muhasebedeki adresi**.',

    accountDetermination:
      'Ana veri, hesap belirlemenin girdisidir: satıcının `AKONT` alanı satıcı kaleminin hesabını, ' +
      'malzemenin {{degerleme-sinifi}} alanı {{OBYC}} üzerinden stok hesabını, ' +
      'varlığın {{varlik-sinifi}} alanı {{AO90}} üzerinden varlık hesaplarını belirler.',

    tur:
      '**Ana veri:** G/L hesabı, satıcı, müşteri, duran varlık, banka.\n\n' +
      '**Özelleştirme:** hesap grubu, alan durumu grubu, numara aralığı tanımı, varlık sınıfı, CVI eşlemesi.\n\n' +
      'Sınırda görünen ama **özelleştirme** olan şey: alan durumu grupları. Sınırda görünen ama **ana veri** olan şey: ' +
      'ev bankası kayıtları (S/4HANA’da BAM ile ana veriye taşındı).',

    transport:
      'Ana veri **taşınmaz**. Test sisteminde açtığın hesap canlıda yoktur; her sistemde ayrı yüklenir ' +
      '({{LTMC}}, {{LSMW}} veya elle). Hesap grubu, alan durumu ve numara aralığı **tanımı** taşınır — ' +
      'ama numara aralığının **güncel sayacı** taşınmaz.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → Ana Veri → G/L Hesapları → Hazırlık → Hesap Grupları ve Alan Durumunu Tanımla', not:'{{hesap-grubu}} ve {{alan-durumu}} ({{OBD4}})' },
      { yol:'SPRO → Finansal Muhasebe → Satıcı Hesapları → Ana Veri → Hazırlık → Satıcı Hesap Gruplarını Tanımla', not:'Satıcı hesap grubu ve alan durumu' },
      { yol:'SPRO → Finansal Muhasebe → Müşteri Hesapları → Ana Veri → Hazırlık → Müşteri Hesap Gruplarını Tanımla', not:'Müşteri hesap grubu' },
      { yol:'SPRO → Cross-Application Components → Master Data Synchronization → Customer/Vendor Integration', not:'**CVI** — S/4HANA’da BP ile satıcı/müşteri eşlemesi. S/4HANA geçişinin zorunlu adımı.' },
      { yol:'SPRO → Finansal Muhasebe → Duran Varlık Muhasebesi → Organizasyon Yapıları → Varlık Sınıfları → Varlık Sınıflarını Tanımla', not:'{{varlik-sinifi}} ({{OAOA}})' },
    ],

    ekstra:[
      { ic:'🔐', baslik:'Ana veri ve denetim', metin:
        'Ana veri değişiklikleri {{CDHDR}} (kim, ne zaman) ve {{CDPOS}} (hangi alan, eski değer, yeni değer) ' +
        'tablolarına yazılır. Denetçilerin en çok istediği rapor budur.\n\n' +
        'Kritik izlenmesi gerekenler: satıcı **banka hesabı** (`LFBK` tablosu), **mutabakat hesabı** (`AKONT`) ve ' +
        '**ödeme bloğu** (`ZAHLS`). Banka hesabı değişikliği, ödeme dolandırıcılığının en yaygın yöntemidir — ' +
        'sahte bir e-postayla "banka hesabımız değişti" denir ve ödeme başka hesaba gider.' },
      { ic:'🧹', baslik:'Ana veri kalitesi nasıl ölçülür?', metin:
        'Üç basit sorgu çoğu problemi ortaya çıkarır:\n\n' +
        '**Mükerrer:** {{LFA1}}’de aynı `STCD1` (vergi no) değerine sahip birden çok `LIFNR`.\n\n' +
        '**Eksik:** `AKONT` boş olan {{LFB1}} kayıtları, `ZTERM` boş olan satıcılar.\n\n' +
        '**Ölü kayıt:** Son 2 yılda hiç hareketi olmayan ({{BSIK}}/{{BSAK}}’ta görünmeyen) satıcılar. ' +
        'Bunlar silinmez, bloklanır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Ana veri silinmez', metin:
        'Geçmiş belgeler ana veriye referans verdiği için silme neredeyse hiç kullanılmaz. ' +
        'Silme işareti (`LOEVM`) yalnızca arşivleme programına "bu kayıt arşivlenebilir" sinyali verir. ' +
        'Pratikte doğru yöntem **bloklamaktır**: kayda kapat, ödemeye kapat veya merkezi blok koy.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Ana veride S/4HANA’nın getirdiği tek büyük değişiklik **İş Ortağı (Business Partner) zorunluluğudur**. ' +
      'Bu, ECC’den geçen her projenin karşılaştığı ve genelde hafife alınan bir iştir.',

    eccFarklari:[
      { konu:'Müşteri/satıcı bakımı', ecc:'{{XK01}}/{{XD01}} — ayrı ayrı, ayrı numaralarla', s4:'{{BP}} — tek nesne, rollerle ayrışır' },
      { konu:'Aynı firma hem müşteri hem satıcı', ecc:'İki ayrı ana veri, elle eşleştirme', s4:'Tek BP kaydı, iki rol' },
      { konu:'Masraf türü', ecc:'{{KA01}} ile ayrı ana veri', s4:'G/L hesabının tipi ({{FS00}} → Primary Costs)' },
      { konu:'Ev bankası', ecc:'{{FI12}} — özelleştirme gibi davranır', s4:'Bank Account Management (BAM) — ana veri ve iş akışı destekli' },
      { konu:'Hesap ana verisi', ecc:'Hesap tipi kavramı yok', s4:'GLACCOUNT_TYPE zorunlu: Balance Sheet / Primary Costs / Secondary Costs / Nonoperating' },
      { konu:'Veri yükleme', ecc:'{{LSMW}} yaygın', s4:'{{LTMC}} / Migrate Your Data; LSMW BP için **önerilmez**' },
    ],

    universalJournal:
      'Ana veri {{ACDOCA}}’ya doğrudan yazmaz ama onun alanlarını besler: satıcının `AKONT` alanı `RACCT`’yi, ' +
      'varlığın sınıfı `ANLN1` ile ilişkili hesapları, hesabın tipi ise kaydın CO’ya düşüp düşmeyeceğini belirler. ' +
      'Yani ana veri, evrensel defterin **doldurma kurallarıdır**.',

    kalkanTcodes:[
      { eski:'{{FK01}} / {{FK02}} / {{FK03}}', yeni:'{{BP}}', not:'Satıcı — kaldırıldı' },
      { eski:'{{XK01}}', yeni:'{{BP}}', not:'Satıcı merkezi bakım — BP’ye yönlendirir' },
      { eski:'{{FD01}} / {{XD01}}', yeni:'{{BP}}', not:'Müşteri — kaldırıldı' },
      { eski:'{{KA01}} / KA02 / KA03', yeni:'{{FS00}}', not:'Masraf türü G/L hesap tipine dönüştü' },
      { eski:'{{FI12}}', yeni:'FI12_HBANK / BAM', not:'Ev bankası yönetimi Fiori’ye taşındı' },
    ],

    fiori:[
      { ad:'Maintain Business Partner', aciklama:'{{BP}}’nin Fiori karşılığı; rol yönetimi görsel olarak daha anlaşılırdır.' },
      { ad:'Manage G/L Account Master Data', aciklama:'{{FS00}} yerine; toplu düzenleme ve Excel’e/den aktarım destekler.' },
      { ad:'Manage Bank Accounts', aciklama:'Ev bankası hesaplarını onay akışıyla yönetir (BAM).' },
      { ad:'Manage Fixed Assets', aciklama:'{{AS01}}/{{AS02}} yerine; varlık listesi ve değerleri tek ekranda.' },
      { ad:'Migrate Your Data', aciklama:'{{LTMC}}’nin Fiori hâli — S/4HANA 2020 ve sonrası için standart yükleme aracı.' },
    ],

    compatibilityViews:[
      '{{LFA1}}, {{LFB1}}, {{KNA1}}, {{KNB1}} **fiziksel tablo olarak duruyor** — kaldırılmadılar.',
      'Ancak artık {{BP}} tarafından CVI senkronizasyonu ile doldurulurlar; doğrudan yazma yapan özel programlar senkronizasyonu bozar.',
      'Eski özel programların {{LFA1}}’e doğrudan INSERT/UPDATE yapıp yapmadığı geçiş öncesi taranmalıdır.',
    ],

    performans:
      'Ana veri okuma S/4HANA’da belirgin şekilde hızlıdır; ancak {{BP}} ekranı rol sayısı arttıkça yavaşlar. ' +
      'Toplu bakımda ekran yerine Fiori’nin toplu düzenleme özelliğini veya BAPI’yi tercih et.',

    bestPractices:[
      'S/4HANA geçişinde CVI’yı **projenin başında** kur; sona bırakılan CVI en sık gecikme sebeplerindendir.',
      'Geçiş öncesi mükerrer satıcı/müşteri temizliği yap — BP’ye taşındıktan sonra birleştirmek çok daha zordur.',
      'BP grubu ile satıcı/müşteri hesap grubu numara aralıklarını **aynı** tut; farklı olursa aynı iş ortağının iki farklı numarası olur ve raporlama karışır.',
      'Yeni hesap açarken hesap tipini doğru seç: gider hesabını "Primary Costs" yerine "Balance Sheet" açarsan CO’ya hiç akmaz ve sonradan düzeltmek hareket varken imkânsıza yakındır.',
      '{{LSMW}} ile BP yüklemeye çalışma; {{LTMC}} şablonlarını kullan.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Yeni bir tedarikçiyle çalışmaya başlamak — ana veriden ilk ödemeye',
    hikaye:
      '**Marmara Tekstil A.Ş.** yeni bir boya tedarikçisiyle ("Ege Kimya A.Ş.") çalışmaya karar verdi. ' +
      'Bu senaryo, ana verinin açılmasından ilk ödemeye kadar her adımı ve **ana verideki her alanın ' +
      'ilerideki hangi davranışı belirlediğini** gösterir.',
    veriler:[
      { k:'Şirket kodu', v:'1000 — Marmara Tekstil A.Ş.' },
      { k:'Tedarikçi', v:'Ege Kimya A.Ş., vergi no 1234567890' },
      { k:'Anlaşma', v:'60 gün vade, %2 erken ödeme iskontosu (10 gün içinde)' },
      { k:'İlk sipariş', v:'200.000 TL + %20 KDV' },
    ],

    adimlar:[
      { baslik:'Mükerrer kontrolü yapılır', tcode:'SE16N',
        aciklama:'Ana veri ekibi, {{LFA1}} tablosunda vergi numarasıyla arama yapar. Aynı firmanın farklı yazımla kayıtlı olup olmadığı kontrol edilir.',
        girdi:[
          { alan:'Tablo', deger:'LFA1' },
          { alan:'Seçim', deger:'STCD1 = 1234567890' },
          { alan:'Sonuç', deger:'Kayıt yok → yeni açılabilir' },
        ],
        not:'Bu adım atlanırsa aynı firma iki numarayla açılır; bakiyeler bölünür, mutabakat imkânsızlaşır ve iki ayrı ödeme çıkabilir.' },

      { baslik:'BP kaydı açılır — genel katman', tcode:'BP',
        aciklama:'Organization tipinde yeni iş ortağı açılır. Bu bilgi {{LFA1}}’e yazılır ve tüm şirket kodları için ortaktır.',
        girdi:[
          { alan:'İş ortağı türü', deger:'Organization' },
          { alan:'BP grubu', deger:'Z001 — Yurtiçi tedarikçi (iç numara ataması)' },
          { alan:'Unvan', deger:'Ege Kimya A.Ş.' },
          { alan:'Ülke / Adres', deger:'TR / İzmir' },
          { alan:'Vergi no (`STCD1`)', deger:'1234567890' },
          { alan:'Banka (IBAN)', deger:'TR12 0001 ... (ayrı onaya tabi)' },
        ],
        tabloEtkisi:[
          { tablo:'LFA1', ne:'Yeni kayıt: LIFNR = 100456, NAME1, STCD1, KTOKK doldu' },
          { tablo:'CDHDR', ne:'Oluşturma kaydı: kullanıcı, tarih, saat' },
        ] },

      { baslik:'FI Vendor rolü eklenir — şirket kodu katmanı', tcode:'BP',
        aciklama:'Asıl muhasebe kararlarının verildiği adım. Buradaki her alan ilerideki bir davranışı belirler.',
        girdi:[
          { alan:'Rol', deger:'FI Vendor (FLVN00)' },
          { alan:'Şirket kodu', deger:'1000' },
          { alan:'Mutabakat hesabı (`AKONT`)', deger:'320000 — Satıcılar (yurtiçi)' },
          { alan:'Ödeme koşulu (`ZTERM`)', deger:'ZB02 — 60 gün net, 10 gün %2 iskonto' },
          { alan:'Ödeme yöntemi (`ZWELS`)', deger:'H (banka havalesi)' },
          { alan:'Ödeme bloğu (`ZAHLS`)', deger:'A — ilk fatura onaylanana kadar bloklu' },
          { alan:'Sıralama anahtarı (`ZUAWA`)', deger:'001 — atama alanına belge tarihi yazılır' },
        ],
        tabloEtkisi:[
          { tablo:'LFB1', ne:'AKONT = 320000, ZTERM = ZB02, ZWELS = H, ZAHLS = A' },
        ],
        not:'Ödeme bloğunu baştan koymak bilinçli bir kontroldür: satıcı sisteme girer ama ilk fatura kontrol edilmeden para çıkamaz.' },

      { baslik:'İlk fatura girilir', tcode:'FB60',
        aciklama:'Dikkat: kullanıcı vadeyi, mutabakat hesabını ve iskonto şartını **hiç girmedi**. Hepsi ana veriden geldi.',
        girdi:[
          { alan:'Satıcı', deger:'100456 — Ege Kimya A.Ş.' },
          { alan:'Fatura tarihi', deger:'01.06.2026' },
          { alan:'Tutar', deger:'240.000 TL brüt (%20 KDV dâhil)' },
          { alan:'Vade — **otomatik**', deger:'31.07.2026 (60 gün, `ZTERM`’den)' },
          { alan:'İskonto — **otomatik**', deger:'11.06.2026’ya kadar %2 = 4.000 TL' },
          { alan:'Mutabakat hesabı — **otomatik**', deger:'320000 (`AKONT`’tan)' },
        ],
        fis:{ baslik:'Belge 1900000112 — Ege Kimya ilk faturası', belgeTuru:'KR', tarih:'01.06.2026',
          satirlar:[
            { hesap:'153', ad:'Ticari mallar', borc:200000 },
            { hesap:'191', ad:'İndirilecek KDV', borc:40000 },
            { hesap:'320', ad:'Satıcılar — Ege Kimya', alacak:240000, not:'Ana veriden gelen hesap' },
          ] },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'Açık kalem: 240.000 TL, vade 31.07.2026, ödeme bloğu A (ana veriden miras)' },
        ] },

      { baslik:'Ödeme çalıştırılır — blok engelliyor', tcode:'F110',
        aciklama:'Fatura vadesi geldi ama {{F110}} bu kalemi öneriye almadı. Sebep: ana verideki ödeme bloğu.',
        girdi:[
          { alan:'Öneri sonucu', deger:'Kalem "bloklu" olarak istisna listesinde' },
          { alan:'İstisna sebebi', deger:'Payment block A — ana veriden geliyor' },
        ],
        not:'Bu, ana verinin ödeme davranışını nasıl kontrol ettiğinin en somut örneğidir. Blok faturada değil, **satıcıda**dır.' },

      { baslik:'Blok kaldırılır ve ödeme yapılır', tcode:'BP',
        aciklama:'İlk fatura kontrol edildikten sonra {{BP}} → şirket kodu verisi → ödeme bloğu temizlenir. Sonraki {{F110}} çalıştırmasında ödeme gerçekleşir.',
        fis:{ baslik:'Belge 2000000034 — Ödeme', belgeTuru:'KZ', tarih:'31.07.2026',
          satirlar:[
            { hesap:'320', ad:'Satıcılar — Ege Kimya', borc:240000, not:'Açık kalem kapandı' },
            { hesap:'102', ad:'Bankalar', alacak:240000 },
          ], not:'İskonto süresi (11.06) geçtiği için indirim uygulanmadı. Erken ödenseydi 4.000 TL kâr edilecekti — ana veride tanımlı iskonto bunu mümkün kılıyordu.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'Kalem buradan silindi' },
          { tablo:'BSAK', ne:'Kapatılmış kalem olarak buraya taşındı, AUGBL = 2000000034' },
          { tablo:'REGUH', ne:'Ödeme başlığı: alıcı, tutar, banka' },
          { tablo:'REGUP', ne:'Bu ödemenin hangi faturayı kapattığı' },
        ] },
    ],

    sonuc:
      'Kullanıcı fatura girerken sadece **satıcı numarası ve tutar** girdi. Vade, iskonto şartı, mutabakat hesabı, ' +
      'ödeme yöntemi ve ödeme bloğu — hepsi ana veriden geldi.\n\n' +
      'Çıkarılacak ders: **ana veri, gelecekteki yüzlerce işlemin davranışını önceden yazar.** ' +
      'Bu yüzden ana veri hatası tek bir belgeyi değil, o kayda bağlı tüm işlemleri etkiler ve ' +
      'genelde aylar sonra fark edilir.\n\n' +
      'Bu senaryoda iskonto süresi kaçırıldığı için 4.000 TL kaybedildi. Ana veri doğruydu, süreç yavaştı — ' +
      'ama ana veri yanlış olsaydı iskonto **hiç** hesaplanmayacaktı ve kimse fark etmeyecekti.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '{{ana-veri}} kalıcı ve referans verilen veridir; {{hareket-verisi}} tek bir olayı kaydeder.',
      'Ana veri **taşıma isteğine girmez** — her sistemde ayrı açılır veya yüklenir. Yapılandırma taşınır.',
      'Ana veri katmanlıdır: **genel** (tüm şirketler için ortak) + **organizasyon** (şirket kodu / satın alma / satış).',
      '{{mutabakat-hesabi}} ({{LFB1}}/{{KNB1}} `AKONT`), muavin defter ile ana muhasebe arasındaki köprüdür.',
      '{{hesap-grubu}} iki şeyi belirler: numara aralığı ve {{alan-durumu}}.',
      'S/4HANA’da müşteri/satıcı yalnızca {{BP}} ile yönetilir; **rol** eklenmeden muhasebe verisi girilemez.',
      'Ana veri silinmez, **bloklanır**. Geçmiş belgeler ona referans verir.',
      'Ana veri hatası kayıt anında hata vermez — sessizce yanlış davranış üretir. Bu yüzden en tehlikeli hata türüdür.',
    ],

    onemliNoktalar:[
      '**"Ana veri mi customizing mi?"** Hesap = ana veri. Hesap grubu = customizing. Satıcı = ana veri. Satıcı hesap grubu = customizing. Bu ayrım taşıma stratejisini belirler.',
      '**"G/L hesabının iki seviyesi nedir?"** {{SKA1}} hesap planı seviyesi (ortak), {{SKB1}} şirket kodu seviyesi (özel). {{FS00}} ikisini birden yönetir.',
      '**"Mutabakat hesabına neden doğrudan kayıt yapılamaz?"** Muavin defter ile ana muhasebe tutarlılığını korumak için. {{SKB1}} `MITKZ` alanı bunu belirler.',
      '**"S/4HANA’da BP zorunluluğu nedir?"** Customer/Vendor Integration (CVI). Aynı firma tek BP kaydında hem müşteri hem satıcı rolü taşıyabilir.',
      '**"Alan durumu nereden gelir?"** Hesap/satıcı hesap grubundan ve kayıt anahtarından. Çakışırsa **en kısıtlayıcı** kazanır.',
      '**"Ödeme bloğu nerede tanımlanır?"** İki yerde: satıcı ana verisinde ({{LFB1}} `ZAHLS`) tüm faturalar için, veya tek bir kalemde ({{BSEG}}) sadece o fatura için.',
      '**"Ana veri değişikliği nasıl denetlenir?"** {{CDHDR}} + {{CDPOS}}. Özellikle banka hesabı değişiklikleri izlenmelidir.',
    ],

    sikHatalar:[
      { hata:'Test sisteminde açılan hesabın canlıda da olduğunu varsaymak.', dogru:'Ana veri taşınmaz. Canlıda ayrıca açılmalı veya {{LTMC}} ile yüklenmelidir.' },
      { hata:'Mükerrer kontrolü yapmadan satıcı açmak.', dogru:'Önce {{LFA1}}’de vergi numarasıyla ara. Mükerrer kayıt bakiyeyi böler ve çift ödemeye yol açar.' },
      { hata:'{{BP}}’de rol eklemeden şirket kodu verisi aramak.', dogru:'Önce **FI Vendor** / **FI Customer** rolü eklenir; sekmeler ancak o zaman açılır.' },
      { hata:'Ana veriyi silmeye çalışmak.', dogru:'Silinmez, bloklanır. Silme işareti sadece arşivleme içindir.' },
      { hata:'Hareket görmüş hesapta {{acik-kalem-yonetimi}}nu değiştirmeye çalışmak.', dogru:'Bakiye sıfırlanmadan değiştirilemez. Yeni hesap açmak çoğu zaman daha güvenlidir.' },
      { hata:'Gider hesabını S/4HANA’da "Balance Sheet" tipiyle açmak.', dogru:'"Primary Costs or Revenue" seçilmelidir; aksi hâlde kayıt CO’ya hiç akmaz.' },
      { hata:'{{LSMW}} ile {{BP}} yüklemeye çalışmak.', dogru:'BP ekranı dinamiktir, ekran kaydı bozulur. {{LTMC}} şablonları kullanılır.' },
      { hata:'Satıcı banka hesabı değişikliğini normal bir güncelleme gibi görmek.', dogru:'Ayrı onaya bağlanmalı ve {{CDPOS}} üzerinden denetlenmelidir — ödeme dolandırıcılığının en yaygın yoludur.' },
    ],

    ipuclari:[
      'Yeni hesap/satıcı açarken benzer bir kaydı **şablon olarak kopyala**. Alan durumu ve kontrol ayarları hazır gelir, hata riski düşer.',
      'Yeni satıcıyı ödeme bloklu aç, ilk fatura onayından sonra bloğu kaldır. Maliyeti sıfır, koruması yüksek bir kontroldür.',
      '"Bu alan neden zorunlu?" sorusunun cevabı üç yerden birindedir: hesap/satıcı **hesap grubunun alan durumu**, **kayıt anahtarının** alan durumu, veya şirket kodunun **alan durumu varyantı**.',
      'Ana veri kalitesini üç sorguyla ölç: mükerrer vergi numarası, boş `AKONT`, 2 yıldır hareketsiz kayıt.',
      'Toplu ana veri işlerinde ekran otomasyonu yerine {{LTMC}} veya BAPI kullan — daha hızlı ve kırılgan değil.',
      '{{FS00}}’a girip *Kontrol verisi* sekmesine bakmak, bir hesabın davranışıyla ilgili soruların çoğunu tek ekranda cevaplar.',
    ],

    quiz:[
      { soru:'Aşağıdakilerden hangisi taşıma isteğine (transport request) **girer**?',
        secenekler:['Bir G/L hesabı','Bir satıcı kaydı','Hesap grubu ve alan durumu tanımı','Bir duran varlık'],
        dogru:2,
        aciklama:'Hesap grubu ve alan durumu {{ozellestirme}}dir ve taşınır. Hesap, satıcı ve varlık ise {{ana-veri}}dir; her sistemde ayrı açılır veya {{LTMC}}/{{LSMW}} ile yüklenir.' },

      { soru:'{{SKA1}} ile {{SKB1}} arasındaki fark nedir?',
        secenekler:[
          'SKA1 satıcı, SKB1 müşteri verisidir',
          'SKA1 hesap planı seviyesi (ortak), SKB1 şirket kodu seviyesi (özel)',
          'SKA1 eski, SKB1 S/4HANA tablosudur',
          'SKA1 bakiye, SKB1 kalem tutar',
        ], dogru:1,
        aciklama:'{{SKA1}} numara, ad ve hesap grubu gibi tüm şirket kodları için ortak bilgiyi; {{SKB1}} para birimi, {{acik-kalem-yonetimi}} ve {{alan-durumu}} gibi şirkete özgü davranışı tutar.' },

      { soru:'Bir satıcıya yapılan kaydın ana muhasebede hangi hesaba yansıyacağını ne belirler?',
        secenekler:[
          'Kullanıcının kayıt sırasında girdiği hesap',
          'Belge türü',
          'Satıcı ana verisindeki mutabakat hesabı ({{LFB1}} `AKONT`)',
          'Şirket kodunun hesap planı',
        ], dogru:2,
        aciklama:'{{mutabakat-hesabi}} satıcı ana verisinde tanımlıdır. Kullanıcı sadece satıcı numarasını girer; SAP hesabı ana veriden bulur. Bu yüzden yurtiçi/yurtdışı satıcıları farklı hesaplara ayırmak ana veriyle yapılır.' },

      { soru:'S/4HANA’da {{BP}} ile satıcı açtın ama şirket kodu sekmelerini göremiyorsun. Sebep nedir?',
        secenekler:[
          'Şirket kodu tanımlı değil',
          '**FI Vendor** rolü eklenmemiş',
          'Mutabakat hesabı yok',
          'Yetkin yok',
        ], dogru:1,
        aciklama:'{{BP}}’de veri **rollere** göre açılır. FI Vendor (FLVN00) rolü eklenmeden {{LFB1}} verisi girilemez. Yeni başlayanların en sık takıldığı noktadır.' },

      { soru:'Artık çalışılmayan bir satıcı için doğru işlem nedir?',
        secenekler:[
          'Kaydı silmek',
          'Bloklamak (kayda ve/veya ödemeye kapatmak)',
          'Mutabakat hesabını boşaltmak',
          'Hesap grubunu değiştirmek',
        ], dogru:1,
        aciklama:'Ana veri silinmez; geçmiş belgeler ona referans verir. Doğru yöntem bloklamaktır. Silme işareti (`LOEVM`) yalnızca arşivleme programına sinyal verir.' },

      { soru:'Bir kayıt ekranında "Maliyet yeri" alanı hiç görünmüyor. En olası sebep nedir?',
        secenekler:[
          'Maliyet yeri ana verisi yok',
          'CO modülü kurulu değil',
          'Hesabın alan durumu grubunda alan **gizli** olarak ayarlanmış',
          'Dönem kapalı',
        ], dogru:2,
        aciklama:'{{alan-durumu}}, hesabın grubundan ({{SKB1}} `FSTAG`) ve kayıt anahtarından gelir; **en kısıtlayıcı** olan uygulanır. Biri "gizli" diyorsa alan görünmez. {{OBD4}} ve kayıt anahtarı ayarı kontrol edilir.' },

      { soru:'S/4HANA geçişinde ana veri tarafındaki en kritik hazırlık nedir?',
        secenekler:[
          'Hesap planını yeniden numaralamak',
          'CVI (Customer/Vendor Integration) kurulumu ve mükerrer temizliği',
          'Tüm satıcıları silmek',
          'Numara aralıklarını sıfırlamak',
        ], dogru:1,
        aciklama:'S/4HANA’da müşteri/satıcı {{BP}} üzerinden yönetilir. CVI eşlemesi ve mükerrer temizliği geçiş öncesi yapılmazsa geçiş takılır; sonradan birleştirmek çok daha zordur.' },
    ],

    flashcards:[
      { on:'Ana veri ile hareket verisi farkı nedir?', arka:'**Ana veri:** kalıcı, referans verilen (hesap, satıcı, müşteri, varlık).\n**Hareket verisi:** tek bir olayı kaydeden, tarihli (fatura, ödeme).\n\nHareket verisi ana veriye referans verir ve davranışını ondan alır.' },
      { on:'Ana veri taşıma isteğine girer mi?', arka:'**Hayır.**\n\nHer sistemde ayrı açılır veya LTMC/LSMW ile yüklenir.\n\nTaşınan şey: hesap grubu, alan durumu, numara aralığı **tanımı** — yani customizing.' },
      { on:'G/L hesabının iki katmanı nedir?', arka:'**SKA1** — hesap planı seviyesi: numara, ad, hesap grubu, bilanço/gelir-gider. Tüm şirketler için ortak.\n\n**SKB1** — şirket kodu seviyesi: para birimi, vergi kategorisi, açık kalem yönetimi, alan durumu grubu.' },
      { on:'Mutabakat hesabı hangi alanda tutulur?', arka:'Satıcıda **LFB1-AKONT**, müşteride **KNB1-AKONT**.\n\nHesabın kendisi SKB1’de `MITKZ` alanıyla işaretlenir: D müşteri, K satıcı, A duran varlık.' },
      { on:'Hesap grubu neyi belirler?', arka:'İki şeyi:\n1. **Numara aralığı** — hesabın hangi aralıkta açılabileceği\n2. **Alan durumu** — hangi alanların zorunlu/opsiyonel/gizli olacağı\n\nOBD4 ile tanımlanır.' },
      { on:'S/4HANA’da BP nedir, neden zorunludur?', arka:'**Business Partner** — müşteri ve satıcı ana verisinin tek giriş noktası.\n\nCVI (Customer/Vendor Integration) ile LFA1/KNA1’i doldurur.\n\nAynı firma tek kayıtta hem müşteri hem satıcı rolü taşıyabilir.' },
      { on:'BP’de şirket kodu verisini göremiyorsan sebep nedir?', arka:'**Rol eklenmemiştir.**\n\nFI Vendor (FLVN00) veya FI Customer (FLCU00) rolü eklenmeden muhasebe sekmeleri açılmaz.' },
      { on:'ZWELS ve ZAHLS alanları ne işe yarar?', arka:'**ZWELS** = izin verilen ödeme yöntemleri. F110 bunun dışına çıkamaz.\n**ZAHLS** = ödeme bloğu. Doluysa F110 satıcıyı öneriye almaz.\n\nİkisi de LFB1’de, satıcı ana verisindedir.' },
      { on:'Ana veri neden silinmez?', arka:'Geçmiş belgeler ona **referans verir**. Silinirse belgeler yetim kalır.\n\nDoğru yöntem **bloklamaktır**. LOEVM (silme işareti) sadece arşivleme programına sinyaldir.' },
      { on:'Ana veri değişikliği nasıl denetlenir?', arka:'**CDHDR** (kim, ne zaman) + **CDPOS** (hangi alan, eski/yeni değer).\n\nEn kritik izlenecek alan: satıcı **banka hesabı** (LFBK) — ödeme dolandırıcılığının en yaygın yolu.' },
      { on:'Varlık sınıfı (asset class) neyi getirir?', arka:'1. **Numara aralığı**\n2. **Hesap belirleme** (AO90 üzerinden)\n3. Varsayılan **amortisman anahtarı** ve **faydalı ömür**\n\nAS01’de sınıf seçilir seçilmez bunlar otomatik gelir.' },
      { on:'S/4HANA’da bir gider hesabı hangi tiple açılmalı?', arka:'**Primary Costs or Revenue.**\n\n"Balance Sheet" seçilirse kayıt CO’ya **hiç akmaz** ve maliyet yeri raporlarında görünmez.\n\nHareket varken tip değiştirmek neredeyse imkânsızdır.' },
    ],
  },

  },
});
