/* ==========================================================================
   content/fi/org-yapisi.js — "Kuruluş Yapısı (Organizasyon Yapısı)"
   ========================================================================== */

SAP.registerTopic({
  id: 'org-yapisi',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Kuruluş yapısı, FI’ın üzerine kurulduğu **iskelettir**. Hiçbir kayıt yapılmadan önce ' +
      'şu soruların cevabı sisteme tanımlanmış olmalıdır:\n\n' +
      '**"Kim kaydediyor?"** → {{sirket-kodu}} (yasal muhasebe birimi)\n' +
      '**"Hangi hesapları kullanıyor?"** → {{hesap-plani}}\n' +
      '**"Yılı nasıl bölüyor?"** → {{mali-yil-varyanti}}\n' +
      '**"Hangi para biriminde?"** → yerel para birimi\n\n' +
      'Bu dört karar **birbirine bağlıdır** ve neredeyse hiçbiri sonradan değiştirilemez. ' +
      'Bir şirket kodunun hesap planını canlıya geçtikten sonra değiştirmek pratikte ' +
      'imkânsızdır — tüm kayıtlar o hesap planına referans verir.\n\n' +
      'Kuruluş yapısının ayırt edici özelliği budur: **hata yapmanın bedeli, ' +
      'hatanın büyüklüğüyle değil, ne zaman fark edildiğiyle orantılıdır.**',

    neden:
      '**Yasal zorunluluk.** Her tüzel kişilik kendi bilançosunu ve gelir tablosunu üretmek zorundadır; ' +
      'bunun sistemdeki karşılığı şirket kodudur.\n\n' +
      '**Veri ayrıştırma.** Aynı sistemde çalışan iki şirketin kayıtları karışmamalıdır.\n\n' +
      '**Ortak kullanım.** Tersine, bazı şeyler **paylaşılmalıdır**: aynı satıcı iki şirkete de ' +
      'mal satıyorsa iki kez tanımlanmamalıdır.\n\n' +
      '**Konsolidasyon.** Grup raporlaması için şirketlerin nasıl birleşeceği baştan planlanmalıdır.\n\n' +
      '**Yetkilendirme.** Kim hangi şirket kodunda işlem yapabilir — yetki bu yapıya dayanır.',

    sirketOnemi:
      'Kuruluş yapısı, projenin **ilk iki haftasında** verilen ve **on yıl yaşayan** kararlardır. ' +
      'Danışmanlıkta "geri dönüşü olmayan kararlar" listesinin başında gelir.\n\n' +
      'Tipik pahalı hata: her ülke için ayrı hesap planı kurmak. ' +
      'Kısa vadede kolaydır, uzun vadede konsolidasyonu imkânsızlaştırır ve ' +
      'ortak {{kontrol-alani}} kurulamaz.\n\n' +
      'Mülakatta ayırt edici soru: **"Şirket ile şirket kodu arasındaki fark nedir?"** ' +
      'Doğru cevap: **şirket kodu** yasal muhasebe birimidir (bilanço üretir); ' +
      '**şirket** konsolidasyon çatısıdır. Bir şirkete birden çok şirket kodu bağlanabilir. ' +
      'İkisi karıştırıldığında konsolidasyon yapısı yanlış kurulur.',

    gercekHayat:
      'Bir holding Türkiye ve Almanya’da faaliyet gösteriyor. Kurulum toplantısında ' +
      'üç soru masaya geliyor:\n\n' +
      '**1. Kaç şirket kodu?** İki — iki ayrı tüzel kişilik, iki ayrı bilanço.\n\n' +
      '**2. Kaç hesap planı?** Burada tartışma çıkıyor. Türkiye TDHP, Almanya SKR kullanıyor. ' +
      'İki ayrı hesap planı kurmak "doğal" görünüyor.\n\n' +
      '**Ama:** ayrı hesap planlarıyla ortak {{kontrol-alani}} kurulamaz — ' +
      'şirketler arası maliyet dağıtımı imkânsızlaşır. Konsolidasyon da elle eşleştirme gerektirir.\n\n' +
      '**Çözüm:** tek bir **operasyonel hesap planı** kurulur (grup standardı). ' +
      'Yerel yasal ihtiyaçlar **ülke hesap planıyla** karşılanır: aynı hesabın ' +
      'yerel raporlamada farklı numarayla görünmesini sağlar.\n\n' +
      '**3. Mali yıl varyantı?** İkisi de Ocak–Aralık → aynı varyant. ' +
      'Farklı olsaydı ortak kontrol alanı yine kurulamazdı.\n\n' +
      'Üç sorunun cevabı birbirine bağlı — **bu yüzden birlikte kararlaştırılır**.',

    muhasebeMantigi:
      'Kuruluş yapısının muhasebe mantığı **tek bir ilkeye** dayanır: ' +
      '**bilanço, bir tüzel kişilik için üretilir.**\n\n' +
      'Bir bilançonun anlamlı olması için borçlar ve alacaklar **aynı hukuki varlığa** ait olmalıdır. ' +
      'Bu yüzden {{sirket-kodu}}, FI’ın en temel ayrım birimidir: ' +
      'her belge bir şirket koduna aittir ve şirket kodları arası kayıt ' +
      '**iki ayrı belge** üretir (grup içi borç/alacak hesaplarıyla).\n\n' +
      'İkinci ilke: **hesap planı bilançonun dilidir.** İki şirket aynı hesap planını kullanıyorsa ' +
      'bilançoları **doğrudan toplanabilir**. Farklı hesap planları kullanıyorsa ' +
      'her hesabın karşılığı elle eşleştirilmelidir.\n\n' +
      'Üçüncü ilke: **mali yıl varyantı dönemsellik ilkesinin sistemdeki karşılığıdır.** ' +
      'Hangi tarihin hangi döneme düştüğünü belirler; ' +
      'özel dönemler (13–16) kapanış kayıtlarının normal aylardan ayrılmasını sağlar.',

    kavramlar: ['sirket-kodu', 'hesap-plani', 'mali-yil-varyanti', 'is-alani',
                'kredi-kontrol-alani', 'kontrol-alani', 'kar-merkezi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Kuruluş yapısı kurulumu **yukarıdan aşağıya** ilerler: önce paylaşılan yapılar ' +
      '(hesap planı, mali yıl varyantı), sonra şirket kodu, en son atamalar. ' +
      'Sıra değiştirilemez — alt seviye üst seviyeye referans verir.',

    roller:[
      { rol:'Proje yönetimi', gorev:'Kaç tüzel kişilik, kaç ülke, konsolidasyon nasıl olacak — **iş kararı**.' },
      { rol:'FI danışmanı', gorev:'Hesap planı, mali yıl varyantı, şirket kodu tasarımını yapar.' },
      { rol:'CO danışmanı', gorev:'{{kontrol-alani}} tasarımını FI ile **birlikte** yapar — bağımlıdır.' },
      { rol:'Mali müşavir', gorev:'Yerel yasal raporlama gereksinimlerini belirtir (ülke hesap planı).' },
      { rol:'Yetkilendirme', gorev:'Şirket kodu bazlı yetki yapısını kurar.' },
      { rol:'Temel ayar (Basis)', gorev:'Ayarları taşıma isteğiyle test → canlı sistemlere taşır.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Kurulum sırası — üstten alta, geri dönüşsüz',
      adimlar:[
        { ic:'📗', rol:'FI danışmanı', baslik:'{{hesap-plani}} tanımlanır ({{OB13}})',
          aciklama:'**En temel karar.** Grup genelinde **tek operasyonel hesap planı** hedeflenmelidir; ' +
                   'aksi hâlde ortak kontrol alanı ve kolay konsolidasyon imkânsızlaşır.',
          cikti:'Hesap planı', ok:'yıl bölünür' },
        { ic:'📅', rol:'FI danışmanı', baslik:'{{mali-yil-varyanti}} tanımlanır ({{OB29}})',
          aciklama:'Kaç normal dönem (genelde 12), kaç **özel dönem** (13–16). ' +
                   'Takvim yılından farklıysa (Nisan–Mart) burada belirlenir.',
          cikti:'Mali yıl varyantı', ok:'şirket açılır' },
        { ic:'🏢', rol:'FI danışmanı', baslik:'{{sirket-kodu}} oluşturulur ({{OX02}})',
          aciklama:'**Kopyalayarak oluştur** — sıfırdan değil. Kopyalama, yüzlerce bağlı ayarı ' +
                   'birlikte getirir ve unutulan ayar riskini azaltır.',
          cikti:'Şirket kodu', ok:'ayarlar bağlanır' },
        { ic:'🔗', rol:'FI danışmanı', baslik:'Global parametreler atanır ({{OBY6}})',
          aciklama:'Hesap planı · mali yıl varyantı · yerel para birimi · ülke · ' +
                   'kayıt dönemi varyantı · alan durumu varyantı.',
          cikti:'Yapılandırılmış şirket kodu', ok:'CO kurulur' },
        { ic:'🎛️', rol:'CO danışmanı', baslik:'{{kontrol-alani}} kurulur ({{OKKP}})',
          aciklama:'Şirket kodları atanır. **Şart: aynı hesap planı + aynı mali yıl varyantı.** ' +
                   'Bu yüzden CO tasarımı FI’dan bağımsız yapılamaz.',
          cikti:'CO organizasyonu', ok:'ek yapılar' },
        { ic:'💳', rol:'FI danışmanı', baslik:'Ek organizasyon birimleri',
          aciklama:'{{kredi-kontrol-alani}} ({{OB45}}), {{is-alani}} ({{OX03}}), ' +
                   'konsolidasyon şirketi ({{OX15}}), {{kar-merkezi}} yapısı.',
          cikti:'Tam organizasyon', ok:'taşınır' },
        { ic:'🚚', rol:'Basis', baslik:'Taşıma isteğiyle canlıya alınır',
          aciklama:'Yapılandırma test sisteminde doğrulanıp {{tasima-istegi}} ile taşınır.',
          cikti:'Canlı sistem' },
      ],
    },

    adimlar:[
      { rol:'FI danışmanı', eylem:'Hesap planı tanımlar', sistem:'{{OB13}} → {{T004}}' },
      { rol:'FI danışmanı', eylem:'Mali yıl varyantı tanımlar', sistem:'{{OB29}} → {{T009}}' },
      { rol:'FI danışmanı', eylem:'Şirket kodunu **kopyalayarak** oluşturur', sistem:'{{OX02}} → {{T001}}' },
      { rol:'FI danışmanı', eylem:'Global parametreleri atar', sistem:'{{OBY6}} — dört kritik alan' },
      { rol:'FI danışmanı', eylem:'Kayıt dönemi varyantını atar', sistem:'{{OB52}} → {{T001B}}' },
      { rol:'CO danışmanı', eylem:'Kontrol alanını kurar ve şirket kodlarını atar', sistem:'{{OKKP}} → {{TKA01}}' },
      { rol:'FI danışmanı', eylem:'Kredi kontrol alanı tanımlar', sistem:'{{OB45}} → {{T014}}' },
      { rol:'Basis', eylem:'Yapılandırmayı taşır', sistem:'{{tasima-istegi}}' },
    ],

    veriAkisi:{
      nereden:'İş kararları: kaç tüzel kişilik, hangi ülkeler, konsolidasyon ihtiyacı, ' +
              'yerel yasal raporlama gereksinimleri.',
      nereye:'{{T001}} şirket kodu · {{T004}} hesap planı · {{T009}} mali yıl varyantı · ' +
             '{{T880}} şirket · {{T014}} kredi kontrol alanı · {{TKA01}} kontrol alanı.',
      tetikleyen:'Kurulum projesi; yeni şirket/ülke eklenmesi; birleşme-devralma.',
      sonraki:'Ana veri kurulumu, hesap belirleme, kullanıcı yetkilendirme.',
    },

    notlar:[
      { tip:'warn', baslik:'Şirket kodunu kopyalayarak oluştur, sıfırdan değil', metin:
        '{{OX02}}’de "yeni girdi" ile şirket kodu açmak **teknik olarak mümkündür** ' +
        'ama pratikte yanlıştır.\n\n' +
        'Bir şirket koduna bağlı **yüzlerce ayar** vardır: belge türleri, numara aralıkları, ' +
        'tolerans grupları, alan durumu, vergi ayarları, banka tanımları…\n\n' +
        'Sıfırdan açılan şirket kodunda bunların hiçbiri yoktur. ' +
        'Eksikler **tek tek hata olarak** ortaya çıkar ve her biri ayrı ayrı çözülür — ' +
        'haftalar sürer.\n\n' +
        '**Doğru yöntem:** çalışan bir şirket kodunu (veya SAP’ın örnek şirket kodunu) ' +
        '**kopyala**, sonra farklılıkları düzelt. ' +
        'Kopyalama bağlı ayarları birlikte getirir.\n\n' +
        'Kopyalamadan sonra mutlaka kontrol edilecekler: ' +
        'ülke, para birimi, vergi ayarları, banka hesapları, adres. ' +
        'Bunlar kaynak şirket kodundan gelir ve **yanlış kalırsa fark edilmesi zordur**.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Kuruluş yapısının muhasebe etkisi **doğrudan bir fiş üretmez** — ama ' +
      'her fişin hangi bilançoya gideceğini belirler. ' +
      'Aşağıdaki örnekler yapının kayıtlara nasıl yansıdığını gösteriyor.',

    etkilenenHesaplar:[
      { hesap:'Tüm hesaplar', tur:'Değişken', neden:'Her kayıt bir {{sirket-kodu}}’na aittir; bilanço şirket kodu bazında üretilir.' },
      { hesap:'395 / 195 Grup içi borç ve alacaklar', tur:'Bilanço', neden:'Şirket kodları arası işlemlerde **iki ayrı belge** oluşur; bu hesaplar köprüyü kurar.' },
      { hesap:'Ülke hesap planı karşılıkları', tur:'Raporlama', neden:'Operasyonel hesap planı grup standardı; yerel yasal rapor için **alternatif hesap numarası** kullanılır.' },
      { hesap:'Kayıt dönemi kontrolü', tur:'Yapısal', neden:'{{T001B}} — hangi dönemde hangi hesap tipine kayıt yapılabileceği ({{OB52}}).' },
    ],

    fisler:[
      { baslik:'Normal kayıt — tek şirket kodu',
        belgeTuru:'KR', tarih:'10.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — **şirket kodu 1000**', borc:50000 },
          { hesap:'191', ad:'İndirilecek KDV', borc:10000 },
          { hesap:'320', ad:'Satıcılar', alacak:60000 },
        ],
        not:'Üç satır da **aynı şirket koduna** ait. Belge tek, bilanço tek.\n\n' +
             'Bu, kayıtların **%99’unun** hâlidir. Şirket kodu alanı kayıt ekranında ' +
             'bir kez girilir ve tüm satırlar onu devralır.' },

      { baslik:'Şirketler arası kayıt — **iki belge oluşur**',
        belgeTuru:'KR', tarih:'15.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Gider — **şirket kodu 2000** (masrafı üstlenen)', borc:80000 },
          { hesap:'395', ad:'Grup içi borçlar — şirket 1000’e', alacak:80000, not:'2000’in belgesi' },
          { hesap:'195', ad:'Grup içi alacaklar — şirket 2000’den', borc:80000, not:'1000’in belgesi' },
          { hesap:'320', ad:'Satıcılar — **şirket kodu 1000** (faturayı alan)', alacak:80000 },
        ],
        not:'Fatura 1000’e geldi ama masraf 2000’e ait. **Tek belge yetmez** — ' +
             'çünkü her tüzel kişilik kendi bilançosunu üretir.\n\n' +
             'Sistem **iki ayrı belge** oluşturur ve aralarındaki köprüyü ' +
             'grup içi hesaplarla kurar. Her şirketin belgesi kendi içinde dengelidir.\n\n' +
             'Konsolidasyonda 395 ve 195 **karşılıklı elenir** — ' +
             'grup dışına bir borç doğmamıştır.' },

      { baslik:'Ülke hesap planı — **tek kayıt**, iki numarayla raporlanır',
        belgeTuru:'KR', tarih:'20.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'400100', ad:'Ofis giderleri (operasyonel/grup planı)', borc:50000,
            not:'Yerel raporda **770** olarak basılır' },
          { hesap:'160000', ad:'Satıcılar (operasyonel/grup planı)', alacak:50000,
            not:'Yerel raporda **320** olarak basılır' },
        ],
        not:'**Kayıt yalnızca bir kez yapılır** — operasyonel (grup) hesap planında.\n\n' +
             'Türkiye’deki yasal rapor TDHP numaralarını ister: 770 ve 320. ' +
             'Bunun için G/L hesap ana verisinde **alternatif hesap numarası** tanımlanır:\n\n' +
             '`400100` → alternatif `770`\n' +
             '`160000` → alternatif `320`\n\n' +
             'Rapor alınırken hangi numaranın basılacağı seçilir. ' +
             '**Tek kayıt, iki görünüm.**\n\n' +
             'Böylece hem konsolidasyon doğrudan çalışır (tüm ülkeler aynı planda) ' +
             'hem yerel yasal uyum sağlanır — **ikinci bir operasyonel plan kurmadan**.' },
    ],

    tHesaplar:[
      { hesap:'Grup içi borçlar — Şirket 2000', kod:'395',
        borc:[],
        alacak:[{ ad:'1000’in ödediği masraf', tutar:80000 }],
        not:'Konsolidasyonda elenir' },
      { hesap:'Grup içi alacaklar — Şirket 1000', kod:'195',
        borc:[{ ad:'2000 adına ödenen', tutar:80000 }],
        alacak:[],
        not:'395 ile **karşılıklı** — toplamları eşit olmalı' },
    ],

    notlar:[
      { tip:'tip', baslik:'Grup içi hesaplar dönem sonunda mutlaka karşılaştırılır', metin:
        'Şirketler arası işlemler 395/195 gibi karşılıklı hesaplar üretir ve ' +
        'bu hesaplar **birbirine eşit olmalıdır**: ' +
        'A şirketinin B’den alacağı = B şirketinin A’ya borcu.\n\n' +
        'Eşit değilse üç sebep vardır:\n\n' +
        '**1.** Bir taraf kaydetti, diğeri kaydetmedi (zamanlama farkı).\n' +
        '**2.** Kur farkı — işlem dövizliyse iki taraf farklı kurla çevirmiş olabilir.\n' +
        '**3.** Yanlış hesap kullanılmış.\n\n' +
        'Bu karşılaştırma **konsolidasyonun ön koşuludur**: elenmesi gereken kalemler ' +
        'eşit değilse grup bilançosu tutmaz.\n\n' +
        'Dönem sonu kapanış listesine "grup içi hesap mutabakatı" maddesi konmalıdır.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Organizasyon birimleri **iki gruba** ayrılır: **zorunlu olanlar** (onlarsız FI çalışmaz) ve ' +
      '**isteğe bağlı olanlar** (ihtiyaca göre kurulur). ' +
      'Aşağıdaki liste bu ayrımı takip ediyor.',

    liste:[
      { ad:'Zorunlu · {{sirket-kodu}}', en:'Company Code',
        aciklama:'**Yasal muhasebe birimi.** Bilanço ve gelir tablosu bu seviyede üretilir.',
        neZaman:'Her tüzel kişilik için bir tane. FI’ın en temel birimidir.',
        ornek:'4 karakter (1000, TR01). Her belge bir şirket koduna aittir. ' +
              '{{T001}} tablosunda saklanır.',
        tcodes:['OX02','OBY6'] },

      { ad:'Zorunlu · {{hesap-plani}}', en:'Chart of Accounts',
        aciklama:'Kullanılabilir G/L hesaplarının listesi — **bilançonun dili**.',
        neZaman:'En az bir tane. Birden çok şirket kodu **aynı** planı paylaşabilir.',
        ornek:'**Grup genelinde tek operasyonel plan hedeflenmelidir.** ' +
              'Ayrı planlar ortak {{kontrol-alani}}’nı ve kolay konsolidasyonu engeller.',
        tcodes:['OB13','FS00'] },

      { ad:'Zorunlu · {{mali-yil-varyanti}}', en:'Fiscal Year Variant',
        aciklama:'Yılın dönemlere nasıl bölüneceği; **dönemsellik ilkesinin sistemdeki karşılığı**.',
        neZaman:'Her şirket koduna atanır.',
        ornek:'`K4` takvim yılı (12 normal + 4 özel dönem). ' +
              'Nisan–Mart gibi kaymış yıllar için ayrı varyant tanımlanır.',
        tcodes:['OB29'] },

      { ad:'Zorunlu · Yerel para birimi', en:'Local Currency',
        aciklama:'Şirket kodunun defter tuttuğu para birimi ({{T001}} `WAERS`).',
        neZaman:'Şirket kodu tanımlanırken. **Sonradan değiştirilemez.**',
        ornek:'Grup ve serbest para birimleri **ek olarak** tanımlanabilir — ' +
              'ama bu da kayıt başlamadan yapılmalıdır ({{paralel-para-birimi}}).' },

      { ad:'İsteğe bağlı · Ülke hesap planı', en:'Country Chart of Accounts',
        aciklama:'Yerel yasal raporlama için **alternatif hesap numaraları**.',
        neZaman:'Grup operasyonel planı kullanırken yerel mevzuat farklı numara istiyorsa.',
        ornek:'Kayıt 400100’e yapılır, yasal rapor 770 numarasıyla basılır. ' +
              '**İki ayrı hesap planı kurmadan** hem konsolidasyon hem yerel uyum sağlanır.' },

      { ad:'İsteğe bağlı · Şirket (konsolidasyon)', en:'Company',
        aciklama:'Konsolidasyon çatısı. Bir şirkete **birden çok şirket kodu** bağlanabilir.',
        neZaman:'Grup konsolidasyonu yapılacaksa.',
        ornek:'**Şirket kodu ile karıştırılmamalıdır:** şirket kodu bilanço üretir, ' +
              'şirket konsolidasyon birimidir. {{T880}} tablosunda saklanır.',
        tcodes:['OX15'] },

      { ad:'İsteğe bağlı · {{is-alani}}', en:'Business Area',
        aciklama:'Şirket kodundan **bağımsız**, faaliyet bazlı raporlama birimi.',
        neZaman:'Faaliyet raporlaması şirket kodu sınırlarını aşıyorsa.',
        ornek:'**S/4HANA’da yerini büyük ölçüde {{kar-merkezi}} ve segment aldı.** ' +
              'Yeni kurulumlarda genelde tercih edilmez.',
        tcodes:['OX03'] },

      { ad:'İsteğe bağlı · {{kredi-kontrol-alani}}', en:'Credit Control Area',
        aciklama:'Müşteri {{kredi-limiti}} kontrolünün yapıldığı birim.',
        neZaman:'Kredili satış yapılıyorsa.',
        ornek:'Birden çok şirket kodu bağlanırsa müşterinin **toplam riski** birlikte izlenir. ' +
              'Ayrı alanlar kurulursa her şirket kendi limitini bağımsız yönetir.',
        tcodes:['OB45'] },

      { ad:'İsteğe bağlı · {{kontrol-alani}} (CO)', en:'Controlling Area',
        aciklama:'Maliyet muhasebesinin yapıldığı çerçeve.',
        neZaman:'CO kullanılıyorsa — pratikte her kurulumda.',
        ornek:'**FI’a bağımlıdır:** bağlı şirket kodları **aynı hesap planını** ve ' +
              '**aynı mali yıl varyantını** kullanmak zorundadır. ' +
              'Bu yüzden CO tasarımı FI’dan bağımsız yapılamaz.',
        tcodes:['OKKP'] },

      { ad:'İsteğe bağlı · {{kar-merkezi}} / segment', en:'Profit Center / Segment',
        aciklama:'Sorumluluk ve segment bazlı raporlama birimleri.',
        neZaman:'Segment bilançosu gerekiyorsa — {{belge-bolme}} ile birlikte.',
        ornek:'S/4HANA’da {{ACDOCA}} boyutu olarak taşınır; ' +
              '{{is-alani}}’nın modern alternatifidir.' },
    ],

    karsilastirmaBasliklar:['Şirket kodu', 'Şirket (konsolidasyon)'],
    karsilastirma:[
      ['Amaç', '**Yasal muhasebe** birimi', '**Konsolidasyon** çatısı'],
      ['Bilanço üretir mi', '**Evet** — ana amacı budur', 'Hayır — birleştirir'],
      ['Tablo', '{{T001}}', '{{T880}}'],
      ['İşlem kodu', '{{OX02}}', '{{OX15}}'],
      ['Sayısal ilişki', 'Bir şirkete **birden çok** şirket kodu', 'Bir şirket kodu **tek** şirkete'],
      ['Belgede bulunur mu', '**Evet** — her belgede', 'Hayır — türetilir'],
      ['Zorunlu mu', '**Evet**', 'Hayır — konsolidasyon yapılmıyorsa gerekmez'],
      ['Sık hata', '—', 'İkisini aynı sanmak → konsolidasyon yapısı yanlış kurulur'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'OX02', ad:'Şirket kodu oluştur / değiştir',
        amac:'Yasal muhasebe birimini tanımlar; adres ve temel bilgileri tutar.',
        neZaman:'Yeni tüzel kişilik eklendiğinde.',
        adimlar:[
          { baslik:'**Kopyalanacak şirket kodunu seç**',
            aciklama:'"Şirket kodunu kopyala, sil, kontrol et" seçeneği kullanılır. ' +
                     '**Sıfırdan açma** — yüzlerce bağlı ayar eksik kalır.' },
          { baslik:'Yeni kod ve adı gir', aciklama:'4 karakter. İsimlendirme standardı baştan belirlenmelidir.' },
          { baslik:'Adres bilgilerini düzelt',
            aciklama:'Kopyalamadan gelen adres kaynak şirketindir; **mutlaka değiştirilir**.' },
          { baslik:'Kopyalanan ayarları gözden geçir',
            aciklama:'Ülke, para birimi, vergi ayarları, banka hesapları — ' +
                     'hepsi kaynaktan gelir ve **yanlış kalırsa fark edilmesi zordur**.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'"Şirket kodunu kopyala, sil, kontrol et"' },
          { ekran:'Kopyalama', islem:'Kaynak **1000** → hedef **2000**' },
          { ekran:'Onay', islem:'Bağlı tablolar da kopyalansın mı? → **Evet**' },
          { ekran:'Düzeltme', islem:'Ad, adres, ülke, para birimi güncellenir' },
        ],
        alanlar:{
          zorunlu:['Şirket kodu','Şirket adı','Şehir','Ülke','Para birimi','Dil'],
          opsiyonel:['Adres detayları','Vergi numarası'] },
        hatalar:[
          { mesaj:'Company code ... already exists', sebep:'Kod kullanılmış.', cozum:'Farklı kod seç. **Silinen şirket kodunun kodu yeniden kullanılmamalıdır** — eski taşıma kayıtlarıyla çakışabilir.' },
          { mesaj:'Kopyalama sonrası belge kaydedilemiyor', sebep:'Bağlı ayarlar kısmen kopyalanmış.', cozum:'{{OBY6}} global parametrelerini ve numara aralıklarını kontrol et.' },
        ],
        ipucu:'**Kopyalamadan sonraki kontrol listesi:** ülke · para birimi · vergi ayarları · ' +
              'banka hesapları · adres · numara aralıkları.\n\n' +
              'Bunlar kaynak şirket kodundan gelir. Ülke yanlış kalırsa **vergi kodları çalışmaz**; ' +
              'para birimi yanlış kalırsa **her kayıt yanlış çevrilir** ve ' +
              'düzeltmesi imkânsıza yakındır.',
        ilgili:['OBY6','OB13','OB29'] },

      { kod:'OBY6', ad:'Şirket kodu global parametreleri — **en kritik ekran**',
        amac:'Şirket kodunun hesap planı, mali yıl varyantı, para birimi gibi ' +
             'temel bağlantılarını tanımlar.',
        neZaman:'Şirket kodu oluşturulduktan hemen sonra.',
        adimlar:[
          { baslik:'Şirket kodunu seç' },
          { baslik:'**Hesap planını ata**',
            aciklama:'**Kayıt başladıktan sonra değiştirilemez.** Tüm kayıtlar bu plana referans verir.' },
          { baslik:'**Mali yıl varyantını ata**',
            aciklama:'Değiştirilmesi dönem eşleşmesini bozar; pratikte geri dönüşsüzdür.' },
          { baslik:'Kayıt dönemi varyantını ata', aciklama:'{{OB52}}’nin bağlandığı varyant.' },
          { baslik:'Alan durumu varyantını ata', aciklama:'Hangi alanların zorunlu/opsiyonel olduğu.' },
          { baslik:'Ülke ve para birimini doğrula',
            aciklama:'Ülke **vergi kodlarını** belirler; yanlışsa vergi çalışmaz.' },
        ],
        ekranAkisi:[
          { ekran:'Liste', islem:'Şirket kodu 2000 seçilir' },
          { ekran:'Detay', islem:'Hesap planı **INT** · mali yıl varyantı **K4**' },
          { ekran:'Detay', islem:'Ülke **TR** · para birimi **TRY** · dil **TR**' },
          { ekran:'Detay', islem:'Alan durumu varyantı **0001** · kayıt dönemi varyantı **1000**' },
        ],
        alanlar:{
          zorunlu:['Hesap planı','Mali yıl varyantı','Ülke','Para birimi','Alan durumu varyantı','Kayıt dönemi varyantı'],
          opsiyonel:['İş alanı zorunlu işareti','Vergi numaraları','Şirket (konsolidasyon)'] },
        hatalar:[
          { mesaj:'Chart of accounts cannot be changed — postings exist', sebep:'Şirket kodunda kayıt yapılmış.', cozum:'**Değiştirilemez.** Farklı hesap planı gerekiyorsa yeni şirket kodu kurulup veri taşınmalıdır — proje büyüklüğünde bir iştir.' },
          { mesaj:'Fiscal year variant ... is not defined', sebep:'Varyant {{OB29}} ile tanımlanmamış.', cozum:'Önce varyantı tanımla; sıra atlanamaz.' },
        ],
        ipucu:'**Bu ekrandaki dört alan projenin kaderini belirler:** ' +
              'hesap planı, mali yıl varyantı, ülke ve para birimi.\n\n' +
              'Dördü de kayıt başladıktan sonra **pratikte değiştirilemez**. ' +
              'Bu yüzden şirket kodu açmadan önce şu soru cevaplanmalıdır: ' +
              '*"Bu şirket ileride hangi kontrol alanına bağlanacak?"* ' +
              'Çünkü kontrol alanı **aynı hesap planı ve aynı mali yıl varyantı** şart koşar.',
        ilgili:['OX02','OB13','OB29','OKKP'] },

      { kod:'OB13', ad:'Hesap planı tanımla',
        amac:'Kullanılabilir G/L hesaplarının listesini ve özelliklerini tanımlar.',
        neZaman:'Kurulumun en başında.',
        adimlar:[
          { baslik:'Hesap planı kodunu ve adını gir', aciklama:'4 karakter (INT, TDHP).' },
          { baslik:'Dil ve hesap numarası uzunluğunu belirle',
            aciklama:'Uzunluk sonradan değiştirilirse mevcut hesaplar etkilenir.' },
          { baslik:'Grup hesap planını ata (varsa)',
            aciklama:'Konsolidasyon için üst seviye eşleştirme.' },
          { baslik:'Bloklama işaretini kontrol et',
            aciklama:'Yeni plan hazırlanırken bloklu tutulup sonra açılabilir.' },
        ],
        alanlar:{
          zorunlu:['Hesap planı kodu','Ad','Dil','Hesap numarası uzunluğu'],
          opsiyonel:['Grup hesap planı','Bloklama işareti'] },
        hatalar:[
          { mesaj:'Chart of accounts is blocked', sebep:'Bloklama işareti açık.', cozum:'Hazırlık bittiyse bloğu kaldır.' },
        ],
        ipucu:'**Kaç hesap planı kurulmalı?** Cevap neredeyse her zaman **bir tane**.\n\n' +
              'Her ülkeye ayrı plan kurmak kısa vadede kolaydır ama:\n' +
              '• Ortak {{kontrol-alani}} kurulamaz → şirketler arası maliyet dağıtımı biter\n' +
              '• Konsolidasyon elle eşleştirme gerektirir\n' +
              '• Grup raporlaması her seferinde dönüştürme ister\n\n' +
              'Yerel yasal ihtiyaç **ülke hesap planıyla** (alternatif hesap numarası) çözülür — ' +
              'ayrı operasyonel plan kurmadan.',
        ilgili:['OBY6','FS00','OKKP'] },

      { kod:'OB29', ad:'Mali yıl varyantı tanımla',
        amac:'Yılın dönemlere nasıl bölüneceğini ve özel dönem sayısını belirler.',
        neZaman:'Kurulumda; mali yıl takvim yılından farklıysa.',
        adimlar:[
          { baslik:'Varyant kodunu gir', aciklama:'`K4` takvim yılı + 4 özel dönem (standart).' },
          { baslik:'Normal dönem sayısını belirle', aciklama:'Genelde 12.' },
          { baslik:'**Özel dönem sayısını belirle**',
            aciklama:'13–16. Kapanış kayıtlarının Aralık’tan **ayrılmasını** sağlar.' },
          { baslik:'Takvim yılına bağlı mı işaretini seç',
            aciklama:'Nisan–Mart gibi kaymış yıllarda **işaretlenmez** ve dönem tarihleri elle girilir.' },
        ],
        alanlar:{
          zorunlu:['Varyant kodu','Normal dönem sayısı','Özel dönem sayısı'],
          opsiyonel:['Takvim yılına bağlı işareti','Dönem tarihleri'] },
        hatalar:[
          { mesaj:'Period ... is not defined in fiscal year variant', sebep:'Kaymış yılda dönem tarihleri eksik girilmiş.', cozum:'Varyantın dönem tablosunu tamamla; her günün bir döneme düşmesi gerekir.' },
        ],
        ipucu:'**Özel dönemler neden var?** Aralık ayında hem normal işlemler hem ' +
              'kapanış kayıtları yapılır. Hepsi 12. döneme yazılırsa ' +
              '*"Aralık ayının gerçek gideri neydi?"* sorusu cevaplanamaz.\n\n' +
              'Özel dönemler (13–16) kapanış kayıtlarını ayırır: ' +
              '13 → denetim düzeltmeleri, 14 → vergi düzeltmeleri gibi.\n\n' +
              'Aynı tarihe (31.12) kayıt yapılır ama **farklı döneme** düşer.',
        ilgili:['OB52','OBY6','closing'] },

      { kod:'OKKP', ad:'Kontrol alanı — FI ile CO’nun buluştuğu nokta',
        amac:'CO organizasyonunu kurar ve şirket kodlarını atar.',
        neZaman:'FI kuruluş yapısı tamamlandıktan sonra.',
        adimlar:[
          { baslik:'Kontrol alanını tanımla', aciklama:'Para birimi, hesap planı, mali yıl varyantı.' },
          { baslik:'**Şirket kodlarını ata**',
            aciklama:'**Şart:** bağlı şirket kodları **aynı hesap planını** ve ' +
                     '**aynı mali yıl varyantını** kullanmalıdır.' },
          { baslik:'Etkin bileşenleri seç', aciklama:'Maliyet yeri, iç sipariş, CO-PA…' },
          { baslik:'Numara aralıklarını tanımla ({{KANK}})',
            aciklama:'**Eksikse gider kayıtları hiç yapılamaz** — FI’ı da durdurur.' },
        ],
        ipucu:'**Bu ekran, kuruluş yapısı kararlarının sınandığı yerdir.** ' +
              'Farklı hesap planı kullanan şirket kodları aynı kontrol alanına ' +
              '**bağlanamaz** — ve bu, hesap planı kararının neden ' +
              'CO’dan önce ve CO düşünülerek verilmesi gerektiğini gösterir.\n\n' +
              'Ayrıntısı {{konu:co-integration}} konusundadır.',
        ilgili:['OBY6','OB13','KANK'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Kuruluş yapısının tabloları küçük ve sadedir ama **her FI belgesi bunlara referans verir**. ' +
      '{{T001}} en çok okunan yapılandırma tablolarından biridir.',

    liste:[
      { ad:'T001', baslik:'Şirket kodu tanımı — FI’ın temel tablosu',
        tutar:'Şirket kodunun adı, ülkesi, **para birimi**, **hesap planı** ve ' +
              '**mali yıl varyantı** bağlantıları.',
        olusturan:'{{OX02}}',
        guncelleyen:'{{OBY6}} global parametreler',
        anahtar:'BUKRS',
        iliskiler:'{{BKPF}}, {{BSEG}}, {{ACDOCA}} — her belge bir şirket koduna aittir.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'BUKRS', aciklama:'Şirket kodu (4 karakter)', tip:'pk' },
          { ad:'BUTXT', aciklama:'Şirket adı' },
          { ad:'LAND1', aciklama:'**Ülke** — vergi kodlarını belirler' },
          { ad:'WAERS', aciklama:'**Yerel para birimi** — sonradan değiştirilemez' },
          { ad:'KTOPL', aciklama:'**Hesap planı** — kayıt başladıktan sonra değiştirilemez', tip:'fk' },
          { ad:'PERIV', aciklama:'**Mali yıl varyantı**', tip:'fk' },
          { ad:'RCOMP', aciklama:'Şirket (konsolidasyon birimi)', tip:'fk' },
        ] },

      { ad:'T004', baslik:'Hesap planı tanımı',
        tutar:'Hesap planlarının kodu, adı, dili ve hesap numarası uzunluğu.',
        olusturan:'{{OB13}}',
        anahtar:'KTOPL',
        iliskiler:'{{T001}} `KTOPL` · {{SKA1}} hesap ana verisi · {{T030}} hesap belirleme.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KTOPL', aciklama:'Hesap planı kodu', tip:'pk' },
          { ad:'KTPLT', aciklama:'Hesap planı adı' },
          { ad:'XSPEA', aciklama:'Bloklama işareti' },
        ] },

      { ad:'T009', baslik:'Mali yıl varyantı',
        tutar:'Normal ve özel dönem sayısı, takvim yılına bağlılık.',
        olusturan:'{{OB29}}',
        anahtar:'PERIV',
        iliskiler:'{{T001}} `PERIV`; dönem tarihleri T009B alt tablosunda.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'PERIV', aciklama:'Varyant kodu', tip:'pk' },
          { ad:'ANZBP', aciklama:'Normal dönem sayısı (genelde 12)' },
          { ad:'ANZSP', aciklama:'**Özel dönem sayısı** (genelde 4 → dönem 13–16)' },
          { ad:'XKALE', aciklama:'Takvim yılına bağlı mı' },
        ] },

      { ad:'T880', baslik:'Şirket (konsolidasyon)',
        tutar:'Konsolidasyon birimleri. Bir şirkete **birden çok şirket kodu** bağlanabilir.',
        olusturan:'{{OX15}}',
        anahtar:'RCOMP',
        s4:'Değişmedi.' },

      { ad:'T014', baslik:'Kredi kontrol alanı',
        tutar:'Kredi limiti kontrolünün yapıldığı birim ve para birimi.',
        olusturan:'{{OB45}}',
        anahtar:'KKBER',
        s4:'SAP Credit Management ile birlikte kullanılır.' },

      { ad:'T001B', baslik:'Kayıt dönemi kontrolü',
        tutar:'Hangi dönemde hangi hesap tipine kayıt yapılabileceği.',
        olusturan:'{{OB52}}',
        anahtar:'BUKRS/varyant + hesap tipi',
        s4:'Değişmedi. Ayrıntısı {{konu:closing}} konusundadır.' },

      { ad:'TKA01', baslik:'Kontrol alanı',
        tutar:'CO organizasyonu; hesap planı ve mali yıl varyantı **şirket kodlarıyla aynı olmalıdır**.',
        olusturan:'{{OKKP}}',
        anahtar:'KOKRS',
        s4:'Değişmedi.' },
    ],

    er:{
      type:'er',
      baslik:'Organizasyon iskeleti — her şey T001’e bağlanır',
      varliklar:[
        { ad:'T004', rol:'Yapılandırma', aciklama:'Hesap planı',
          alanlar:[{ ad:'KTOPL', tip:'pk' }, { ad:'KTPLT' }] },
        { ad:'T009', rol:'Yapılandırma', aciklama:'Mali yıl varyantı',
          alanlar:[{ ad:'PERIV', tip:'pk' }, { ad:'ANZBP' }, { ad:'ANZSP' }] },
        { ad:'T880', rol:'Yapılandırma', aciklama:'Şirket (konsolidasyon)',
          alanlar:[{ ad:'RCOMP', tip:'pk' }] },
        { ad:'T001', rol:'Organizasyon', hub:true, aciklama:'**Şirket kodu — merkez**',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'KTOPL', tip:'fk' }, { ad:'PERIV', tip:'fk' }, { ad:'WAERS' }, { ad:'RCOMP', tip:'fk' }] },
        { ad:'TKA01', rol:'CO', aciklama:'Kontrol alanı',
          alanlar:[{ ad:'KOKRS', tip:'pk' }, { ad:'KTOPL', tip:'fk' }] },
        { ad:'T014', rol:'Organizasyon', aciklama:'Kredi kontrol alanı',
          alanlar:[{ ad:'KKBER', tip:'pk' }] },
        { ad:'BKPF', rol:'Hareket', aciklama:'Her belge bir şirket koduna ait',
          alanlar:[{ ad:'BUKRS', tip:'fk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }] },
        { ad:'SKA1', rol:'Ana veri', aciklama:'G/L hesabı (hesap planı seviyesi)',
          alanlar:[{ ad:'KTOPL', tip:'fk' }, { ad:'SAKNR', tip:'pk' }] },
      ],
      iliskiler:[
        { from:'T004', to:'T001', alanlar:'KTOPL', not:'**hesap planı ataması**' },
        { from:'T009', to:'T001', alanlar:'PERIV', not:'mali yıl varyantı' },
        { from:'T880', to:'T001', alanlar:'RCOMP', not:'konsolidasyon' },
        { from:'T001', to:'BKPF', alanlar:'BUKRS', not:'**her belge bir şirket kodunda**' },
        { from:'T004', to:'SKA1', alanlar:'KTOPL', not:'hesap planı → hesaplar' },
        { from:'T004', to:'TKA01', alanlar:'KTOPL', not:'**aynı plan şartı**' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Kuruluş yapısında kullanıcı ekranı **yoktur** — hepsi yapılandırmadır. ' +
      'Danışman için kritik olan üç ekran: {{OX02}}, {{OBY6}} ve {{OKKP}}.',

    ekranlar:[
      { ad:'{{OX02}} — şirket kodu kopyalama',
        aciklama:'Yeni şirket kodunun oluşturulduğu ekran.',
        alanlar:[
          { ad:'Kaynak şirket kodu', zorunlu:true, aciklama:'**Çalışan bir şirket kodu** seçilir; ' +
                   'bağlı ayarlar birlikte kopyalanır.' },
          { ad:'Hedef şirket kodu', zorunlu:true, aciklama:'4 karakter, benzersiz.' },
          { ad:'Ad ve adres', zorunlu:true, aciklama:'Kopyalamadan gelen kaynak bilgisi **mutlaka düzeltilir**.' },
          { ad:'Bağlı tablolar da kopyalansın mı', zorunlu:true, aciklama:'**Evet** — asıl fayda budur.' },
        ],
        ipucu:'Kopyalama sonrası kontrol listesi: **ülke · para birimi · vergi ayarları · ' +
              'banka hesapları · adres · numara aralıkları**.\n\n' +
              'Ülke yanlış kalırsa vergi kodları çalışmaz. ' +
              'Para birimi yanlış kalırsa **her kayıt yanlış çevrilir** ve düzeltmesi ' +
              'imkânsıza yakındır.' },

      { ad:'{{OBY6}} — global parametreler',
        aciklama:'Projenin kaderini belirleyen dört alanın bulunduğu ekran.',
        alanlar:[
          { ad:'**Hesap planı**', zorunlu:true, aciklama:'Kayıt başladıktan sonra **değiştirilemez**.' },
          { ad:'**Mali yıl varyantı**', zorunlu:true, aciklama:'Değiştirilmesi dönem eşleşmesini bozar.' },
          { ad:'**Ülke**', zorunlu:true, aciklama:'Vergi kodlarını belirler.' },
          { ad:'**Para birimi**', zorunlu:true, aciklama:'Sonradan değiştirilemez.' },
          { ad:'Alan durumu varyantı', zorunlu:true, aciklama:'Hangi alanların zorunlu olduğu.' },
          { ad:'Kayıt dönemi varyantı', zorunlu:true, aciklama:'{{OB52}}’nin bağlandığı varyant.' },
        ],
        ipucu:'Şirket kodu açmadan önce cevaplanması gereken soru: ' +
              '*"Bu şirket ileride hangi {{kontrol-alani}}’na bağlanacak?"*\n\n' +
              'Çünkü kontrol alanı **aynı hesap planı** ve **aynı mali yıl varyantı** şart koşar. ' +
              'Bu iki alan burada seçilir ve sonradan değiştirilemez.' },

      { ad:'{{OB13}} / {{OB29}} — paylaşılan yapılar',
        aciklama:'Şirket kodundan **önce** tanımlanması gereken yapılar.',
        alanlar:[
          { ad:'Hesap planı kodu', zorunlu:true, aciklama:'Grup genelinde **tek plan** hedeflenmelidir.' },
          { ad:'Hesap numarası uzunluğu', zorunlu:true },
          { ad:'Mali yıl varyantı kodu', zorunlu:true },
          { ad:'Normal + özel dönem sayısı', zorunlu:true, aciklama:'12 + 4 standarttır.' },
        ],
        ipucu:'Bu ekranlar **şirket kodundan önce** çalıştırılır. ' +
              'Sıra atlanırsa {{OBY6}}’da atanacak değer bulunamaz ve ' +
              'kurulum yarıda kalır.' },
    ],

    zorunlu:['Şirket kodu','Hesap planı','Mali yıl varyantı','Ülke','Para birimi','Alan durumu varyantı'],
    opsiyonel:['Şirket (konsolidasyon)','İş alanı','Kredi kontrol alanı','Ülke hesap planı'],

    hatalar:[
      { mesaj:'Chart of accounts cannot be changed — postings exist', sebep:'Şirket kodunda kayıt yapılmış.', cozum:'**Değiştirilemez.** Farklı plan gerekiyorsa yeni şirket kodu kurulup veri taşınır — proje büyüklüğünde bir iştir. Bu yüzden karar baştan doğru verilmelidir.' },
      { mesaj:'Company codes have different charts of accounts (OKKP)', sebep:'Aynı kontrol alanına farklı hesap planlı şirket kodları bağlanmaya çalışılıyor.', cozum:'Ya hesap planlarını hizala ya ayrı kontrol alanı kur. **Şirketler arası maliyet dağıtımı ikinci seçenekte imkânsızlaşır.**' },
      { mesaj:'Fiscal year variants are not the same', sebep:'Kontrol alanı ile şirket kodunun varyantları farklı.', cozum:'Aynı olmalıdır; dönem eşleşmesi başka türlü kurulamaz.' },
      { mesaj:'Kopyalama sonrası vergi kodları çalışmıyor', sebep:'Ülke alanı kaynak şirket kodundan gelmiş ve düzeltilmemiş.', cozum:'{{OBY6}}’da ülkeyi düzelt; vergi kodları **ülkeye bağlıdır**.' },
      { mesaj:'Field ... is not available for input', sebep:'Alan durumu varyantı o alanı gizlemiş.', cozum:'Alan durumu grubunu kontrol et. Hesap ana verisi ile belge türü **ikisi birden** alanı etkiler.' },
      { mesaj:'Posting period ... is not open', sebep:'{{OB52}} kayıt dönemi varyantı ayarlanmamış.', cozum:'Yeni şirket kodunda dönemler açılmalıdır; kopyalama bunu getirmeyebilir.' },
    ],

    ipuclari:[
      '**Şirket kodunu her zaman kopyalayarak oluştur** — sıfırdan açmak haftalar kaybettirir.',
      'Kopyalama sonrası **ülke ve para birimini** mutlaka doğrula; ' +
      'ikisi de sessizce yanlış kalabilir ve düzeltilmesi imkânsıza yakındır.',
      '**Grup genelinde tek operasyonel hesap planı** hedefle; yerel ihtiyacı ' +
      'ülke hesap planıyla çöz.',
      'Şirket kodu açmadan önce sor: *"hangi kontrol alanına bağlanacak?"* — ' +
      'hesap planı ve mali yıl varyantı buna göre seçilir.',
      'Özel dönemleri (13–16) baştan tanımla; sonradan eklemek mümkün ama ' +
      'geçmiş yıllar için işe yaramaz.',
      'Grup içi hesapların ({{konu:closing}} kapanışında) karşılıklı eşitliğini ' +
      'dönem sonu listesine koy.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'T001', ne:'Şirket kodu tanımı ve global parametreler' },
      { tablo:'T004', ne:'Hesap planı tanımı' },
      { tablo:'T009', ne:'Mali yıl varyantı' },
      { tablo:'T880', ne:'Şirket (konsolidasyon birimi)' },
      { tablo:'T014', ne:'Kredi kontrol alanı' },
      { tablo:'TKA01', ne:'Kontrol alanı — hesap planı ve varyant uyumu' },
    ],

    commit:
      'Kuruluş yapısı **yapılandırmadır**, hareket verisi değildir — ' +
      'LUW ve commit mantığı işlem kayıtlarındaki gibi çalışmaz.\n\n' +
      'Ama önemli bir teknik sonuç vardır: {{T001}} **her belge kaydında okunur**. ' +
      'Şirket kodunun hesap planı, mali yıl varyantı ve para birimi bilgisi ' +
      'kaydın her aşamasında kullanılır.\n\n' +
      'Bu yüzden {{T001}} en çok okunan yapılandırma tablolarından biridir ve ' +
      'tampon belleğe (buffer) alınır. Yapılandırma değişikliği sonrası ' +
      'bazen tampon yenilenmesi gerekebilir.',

    belgeNo:
      'Kuruluş yapısı belge numarası üretmez. ' +
      'Ancak **numara aralıkları şirket kodu bazındadır** ({{FBN1}}): ' +
      'her şirket kodu kendi aralıklarını kullanır ve ' +
      'yeni şirket kodu açıldığında aralıkların da açılması gerekir.\n\n' +
      'Kopyalama bunu genelde getirir ama **doğrulanmalıdır** — ' +
      'getirmezse ilk kayıt denemesinde hata alınır.',

    postingLogic:
      'Bir belge kaydedilirken kuruluş yapısı şu sırayla devreye girer:\n\n' +
      '**1.** Şirket kodu girilir → {{T001}} okunur.\n' +
      '**2.** Hesap planı belirlenir → kullanılabilir hesaplar sınırlanır.\n' +
      '**3.** Mali yıl varyantı → kayıt tarihinin hangi döneme düştüğü hesaplanır.\n' +
      '**4.** Kayıt dönemi varyantı → {{T001B}} okunur, dönem açık mı kontrol edilir.\n' +
      '**5.** Alan durumu varyantı → hangi alanların zorunlu olduğu belirlenir.\n' +
      '**6.** Yerel para birimi → işlem para biriminden çevrim yapılır.\n' +
      '**7.** Ülke → vergi kodları ve hesaplama prosedürü belirlenir.\n\n' +
      'Yedi adımın hepsi **tek bir alandan** (şirket kodu) türetilir. ' +
      'Kuruluş yapısının neden bu kadar kritik olduğunun teknik açıklaması budur.',

    belgeTuru:
      'Belge türleri **şirket kodundan bağımsız** olarak tanımlanır ({{OBA7}}) ' +
      'ama numara aralıkları şirket kodu bazındadır.\n\n' +
      'Pratik sonuç: yeni şirket kodu açıldığında belge türlerini yeniden tanımlamak ' +
      'gerekmez, ama **numara aralıklarını açmak gerekir**.',

    numberRange:
      '{{FBN1}} ile şirket kodu + belge türü bazında tanımlanır. ' +
      'Yeni şirket kodunda **her belge türü için** aralık açılmalıdır.\n\n' +
      'Kopyalama genelde getirir; getirmezse ilk kayıt denemesinde ' +
      '*"Number range ... does not exist"* hatası alınır.',

    accountDetermination:
      'Hesap belirleme tabloları ({{T030}} ailesi) **hesap planı bazındadır**. ' +
      'Bu, hesap planı kararının bir başka sonucudur:\n\n' +
      'Aynı hesap planını paylaşan şirket kodları **aynı hesap belirleme kurallarını** kullanır. ' +
      'Farklı planlar kullanılıyorsa her plan için ayrı kural seti gerekir — ' +
      '{{OBYC}}, {{VKOA}}, {{OB40}} hepsi ayrı ayrı tanımlanmalıdır.\n\n' +
      'Tek plan kullanmanın somut faydalarından biri budur: ' +
      'hesap belirleme **bir kez** kurulur.',

    tur:
      '**Tamamı özelleştirmedir.** Kuruluş yapısında ana veri veya hareket verisi yoktur.\n\n' +
      'Bu, taşıma açısından avantajdır (her şey taşıma isteğiyle gider) ama ' +
      'aynı zamanda risktir: canlıda elle değişiklik yapılmamalıdır.',

    transport:
      'Kuruluş yapısı ayarları {{tasima-istegi}} ile taşınır. **Üç uyarı:**\n\n' +
      '**1.** Şirket kodu kopyalama **taşınmaz** — hedef sistemde ayrıca yapılır. ' +
      'Kopyalama bir *işlemdir*, yapılandırma kaydı değil.\n\n' +
      '**2.** Numara aralıkları çoğu kurulumda **taşınmaz**; ' +
      'canlıda elle tanımlanır. Bu, canlıya geçişte kayıtların durmasının klasik sebebidir.\n\n' +
      '**3.** Hesap planı taşınır ama **hesaplar ayrı taşınır** ({{SKA1}}/{{SKB1}}); ' +
      'plan gelir, içi boş olabilir.\n\n' +
      '**Geçiş kontrolü:** canlıda bir test kaydı yap — ' +
      'numara aralığı, dönem ve hesap belirlemenin çalıştığını doğrular.',

    img:[
      { yol:'SPRO → Kurumsal Yapı → Tanım → Finansal Muhasebe → Şirket Kodunu Düzenle/Kopyala/Sil/Kontrol Et', not:'{{OX02}} — **kopyalayarak oluştur**' },
      { yol:'SPRO → Kurumsal Yapı → Tanım → Finansal Muhasebe → Şirketi Tanımla', not:'{{OX15}} — konsolidasyon birimi' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Global Parametreler', not:'{{OBY6}} — **dört kritik alan**' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe Muhasebesi → Ana Veri → Hesap Planı → Hesap Planı Listesini Düzenle', not:'{{OB13}}' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Mali Yıl → Mali Yıl Varyantlarını Koru', not:'{{OB29}}' },
    ],

    ekstra:[
      { ic:'🧭', baslik:'Kaç hesap planı kurulmalı? — projenin en pahalı kararı', metin:
        '**Kısa cevap: bir tane.** Uzun cevap şöyle:\n\n' +
        '**"Her ülkeye ayrı plan" yaklaşımının cazibesi:** Türkiye TDHP, Almanya SKR kullanıyor. ' +
        'Her ülkeye kendi planını vermek doğal görünür ve ilk kurulumda kolaydır.\n\n' +
        '**Bedeli üç yerde ödenir:**\n\n' +
        '**1. Ortak kontrol alanı kurulamaz.** {{OKKP}}, bağlı şirket kodlarının ' +
        '**aynı hesap planını** kullanmasını şart koşar. Ayrı planlar → ayrı kontrol alanları → ' +
        '**şirketler arası maliyet dağıtımı imkânsız**.\n\n' +
        '**2. Hesap belirleme çoğalır.** {{OBYC}}, {{VKOA}}, {{OB40}} hepsi hesap planı bazındadır. ' +
        'İki plan = iki kat yapılandırma = iki kat bakım.\n\n' +
        '**3. Konsolidasyon elle eşleştirme ister.** Her hesabın karşılığı ' +
        'tablo tutularak eşleştirilir; hesap eklendikçe tablo bakımı büyür.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Doğru çözüm: tek operasyonel plan + ülke hesap planı**\n\n' +
        'Kayıt **grup planında** yapılır (400100). ' +
        'G/L hesap ana verisinde **alternatif hesap numarası** tanımlanır (770). ' +
        'Yerel yasal rapor bu numarayla basılır.\n\n' +
        'Sonuç: tek kayıt, iki görünüm. Konsolidasyon doğrudan çalışır, ' +
        'yerel uyum sağlanır, kontrol alanı ortak kurulabilir.\n\n' +
        '**Bu karar, kayıt başladıktan sonra geri alınamaz.** ' +
        'Şirket kodunun hesap planını değiştirmek, ' +
        'yeni şirket kodu kurup tüm veriyi taşımak demektir.' },

      { ic:'🏢', baslik:'Şirket ile şirket kodu — mülakatın klasik sorusu', metin:
        'İkisi de "şirket" kelimesini taşır ve sık karıştırılır. ' +
        'Ama farklı sorulara cevap verirler:\n\n' +
        '**{{sirket-kodu}} → "kim bilanço üretiyor?"**\n\n' +
        'Yasal muhasebe birimidir. Her belge bir şirket koduna aittir. ' +
        'Bilanço ve gelir tablosu bu seviyede çıkar. ' +
        '{{T001}} tablosunda, {{OX02}} ile tanımlanır. **Zorunludur.**\n\n' +
        '**Şirket → "kimler birlikte konsolide olacak?"**\n\n' +
        'Konsolidasyon çatısıdır. Bilanço üretmez, **birleştirir**. ' +
        '{{T880}} tablosunda, {{OX15}} ile tanımlanır. ' +
        '**İsteğe bağlıdır** — konsolidasyon yapılmıyorsa gerekmez.\n\n' +
        '**Sayısal ilişki:** bir şirkete **birden çok** şirket kodu bağlanabilir. ' +
        'Bir şirket kodu **tek** şirkete aittir.\n\n' +
        '*Örnek:* "Anadolu Holding" bir şirkettir; ' +
        'altında TR01 (Türkiye), DE01 (Almanya) şirket kodları vardır. ' +
        'Her biri kendi bilançosunu üretir, holding düzeyinde konsolide edilirler.\n\n' +
        '**Neden karıştırılır?** Çünkü tek şirketli kurulumlarda ikisi de tek olur ve ' +
        'fark görünmez. Fark, ikinci tüzel kişilik eklendiğinde ortaya çıkar — ' +
        've o zaman yapı yanlış kurulmuşsa düzeltmek zordur.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Geri dönüşü olmayan dört alan', metin:
        '{{OBY6}}’daki şu dört alan, kayıt başladıktan sonra **pratikte değiştirilemez**:\n\n' +
        '**1. Hesap planı** — tüm kayıtlar ona referans verir.\n' +
        '**2. Mali yıl varyantı** — dönem eşleşmesi bozulur.\n' +
        '**3. Yerel para birimi** — tüm çevrimler yanlış olur.\n' +
        '**4. Ülke** — vergi yapılandırmasının tamamı buna bağlıdır.\n\n' +
        'SAP bazılarını teknik olarak engellemez ama **sonuçları düzeltilemez**.\n\n' +
        'Bu yüzden şirket kodu açmadan önce şu üç soru cevaplanmalıdır:\n\n' +
        '• Bu şirket hangi {{kontrol-alani}}’na bağlanacak? *(hesap planı + varyant belirler)*\n' +
        '• Grup raporlaması nasıl yapılacak? *(hesap planı belirler)*\n' +
        '• Yerel yasal rapor hangi numaralarla basılacak? *(ülke hesap planı gerekir mi)*\n\n' +
        '**Bu üç soruyu sormak, kuruluş yapısı danışmanlığının özüdür.**' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Kuruluş yapısı S/4HANA’da **büyük ölçüde aynı kaldı**: şirket kodu, hesap planı, ' +
      'mali yıl varyantı değişmedi. ' +
      'Değişenler: {{is-alani}}’nın gözden düşmesi, {{kar-merkezi}}/segment’in öne çıkması ve ' +
      'daha fazla paralel para birimi desteği.',

    eccFarklari:[
      { konu:'{{sirket-kodu}}', ecc:'{{T001}} — yasal birim', s4:'**Değişmedi**' },
      { konu:'{{hesap-plani}}', ecc:'Operasyonel + ülke + grup', s4:'**Değişmedi**' },
      { konu:'{{is-alani}}', ecc:'Yaygın kullanım', s4:'**Gözden düştü** — yerini kâr merkezi/segment aldı' },
      { konu:'{{kar-merkezi}}', ecc:'Ayrı defter (EC-PCA)', s4:'{{ACDOCA}} boyutu — **öne çıktı**' },
      { konu:'Paralel para birimi', ecc:'3 para birimi', s4:'**8’e kadar**' },
      { konu:'Müşteri/satıcı', ecc:'Ayrı ana veri', s4:'{{BP}} — iş ortağı' },
      { konu:'Kontrol alanı', ecc:'Aynı hesap planı şartı', s4:'**Aynı şart** — değişmedi' },
    ],

    universalJournal:
      '{{ACDOCA}} kuruluş yapısını doğrudan değiştirmedi ama ' +
      '**hangi organizasyon biriminin önemli olduğunu** değiştirdi.\n\n' +
      'ECC’de {{is-alani}}, kâr merkezi ve segment ayrı mekanizmalardı. ' +
      'S/4HANA’da hepsi {{ACDOCA}}’nın **birer alanıdır** ve eşit kolaylıkta raporlanır.\n\n' +
      'Sonuç: iş alanının teknik avantajı kalmadı. ' +
      '{{belge-bolme}} ile birlikte kâr merkezi ve segment **dengeli bilanço** üretebiliyor; ' +
      'iş alanı bunu hiçbir zaman düzgün yapamadı.\n\n' +
      'Yeni kurulumlarda iş alanı yerine **kâr merkezi + segment** tercih edilir.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'{{OX02}}, {{OBY6}}, {{OB13}}, {{OB29}}, {{OKKP}} **kaldırılmadı**' },
      { eski:'{{XK01}} / {{XD01}}', yeni:'{{BP}}', not:'Ana veri tarafı değişti (kuruluş yapısı değil)' },
    ],

    fiori:[
      { ad:'Manage Company Codes', aciklama:'Şirket kodu bilgilerini görüntüler ve yönetir.' },
      { ad:'Manage Chart of Accounts', aciklama:'Hesap planı ve hesap listesi yönetimi.' },
      { ad:'Manage G/L Account Master Data', aciklama:'{{FS00}} yerine; alternatif hesap numarası burada.' },
      { ad:'Manage Profit Centers', aciklama:'Kâr merkezi yapısı — iş alanının modern alternatifi.' },
      { ad:'Trial Balance', aciklama:'Şirket kodu, kâr merkezi ve segment bazlı mizan.' },
    ],

    compatibilityViews:[
      '{{T001}}, {{T004}}, {{T009}}, {{T880}}, {{T014}} — **fiziksel tablo olarak duruyor**.',
      'Kuruluş yapısı, S/4HANA geçişinde **hiç etkilenmeyen** alandır.',
      'Geçişte yapılan iş, mevcut yapının **gözden geçirilmesidir** — değiştirilmesi değil.',
    ],

    performans:
      'Kuruluş yapısı küçük yapılandırma tablolarından oluştuğu için ' +
      'performans etkisi yoktur.\n\n' +
      'Dolaylı kazanç: {{is-alani}} yerine kâr merkezi kullanıldığında ' +
      'raporlama {{ACDOCA}} üzerinden tek sorguyla yapılır; ' +
      'ECC’de iş alanı raporları ayrı mekanizmalar gerektiriyordu.',

    bestPractices:[
      'Geçişte kuruluş yapısını **değiştirme** — gözden geçir. ' +
      'Değişiklik gerekiyorsa bu ayrı bir dönüşüm projesidir.',
      '{{is-alani}} kullanılıyorsa **kâr merkezi/segment’e geçişi** değerlendir; ' +
      'S/4HANA’da iş alanının teknik avantajı kalmadı.',
      'Paralel para birimi ihtiyacını **geçişte yeniden değerlendir** — ' +
      'S/4 sekize kadar destekler ve bu, sonradan eklenmesi zor bir ayardır.',
      'Birden çok hesap planı varsa, **tek plana geçiş** maliyetini hesapla; ' +
      'geçiş, böyle bir sadeleştirme için ender bir fırsattır.',
      'Yeni şirket kodu eklenecekse geçiş **sonrasına** bırak; ' +
      'iki değişikliği aynı anda yapmak sorun kaynağını gizler.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'İkinci ülke eklendi: hesap planı kararı üç ay sonra geri geldi',
    hikaye:
      '**Anadolu Holding** SAP’a Türkiye’de tek şirket koduyla (TR01) geçti. ' +
      'Kurulum sorunsuz, altı ay boyunca her şey yolunda.\n\n' +
      'Sonra Almanya’daki iştirak (DE01) sisteme alınacak. ' +
      'Alman mali müşavir **SKR hesap planı** istiyor — yasal raporlama için gerekli.\n\n' +
      'Danışman "ayrı hesap planı kuralım, sorun değil" diyor ve kuruluyor.\n\n' +
      'Üç ay sonra CFO şunu soruyor: *"Merkez BT giderini iki şirkete nasıl dağıtacağız?"*\n\n' +
      'Bu senaryo, kuruluş yapısı kararlarının neden **CO düşünülerek** verilmesi ' +
      'gerektiğini gösteriyor.',
    veriler:[
      { k:'TR01', v:'Türkiye · hesap planı **TDHP** · mali yıl K4' },
      { k:'DE01', v:'Almanya · hesap planı **SKR** · mali yıl K4' },
      { k:'Merkez BT gideri', v:'Aylık 480.000 TL — her iki şirkete hizmet veriyor' },
      { k:'**Sorun**', v:'Şirketler arası maliyet dağıtımı **yapılamıyor**' },
    ],

    adimlar:[
      { baslik:'Sorun ortaya çıkıyor — ortak kontrol alanı kurulamıyor', tcode:'OKKP',
        aciklama:'CO danışmanı iki şirket kodunu aynı kontrol alanına bağlamaya çalışıyor.',
        girdi:[
          { alan:'Kontrol alanı', deger:'1000' },
          { alan:'Atanan şirket kodları', deger:'TR01 + DE01' },
          { alan:'**Hata**', deger:'*"Company codes have different charts of accounts"*' },
          { alan:'Sebep', deger:'TR01 → TDHP · DE01 → SKR' },
        ],
        not:'{{OKKP}}, bağlı şirket kodlarının **aynı hesap planını** kullanmasını şart koşar.\n\n' +
             'İki ayrı kontrol alanı kurulabilir — ama o zaman ' +
             '**şirketler arası maliyet dağıtımı imkânsızlaşır**. ' +
             'Merkez BT gideri TR01’de kalır, DE01’e aktarılamaz.\n\n' +
             'Bu, hesap planı kararının **CO’yu da bağladığının** somut kanıtı.' },

      { baslik:'İkinci sorun — hesap belirleme iki kat', tcode:'OBYC',
        aciklama:'Almanya için MM entegrasyonu kurulurken fark ediliyor.',
        girdi:[
          { alan:'{{OBYC}} kayıtları', deger:'TDHP için tanımlı · **SKR için yok**' },
          { alan:'{{VKOA}} kayıtları', deger:'TDHP için tanımlı · **SKR için yok**' },
          { alan:'{{OB40}} vergi hesapları', deger:'TDHP için tanımlı · **SKR için yok**' },
          { alan:'Yapılacak iş', deger:'Tüm hesap belirleme **ikinci kez** kurulacak' },
        ],
        not:'Hesap belirleme tabloları ({{T030}} ailesi) **hesap planı bazındadır**.\n\n' +
             'İki plan = iki kat yapılandırma = iki kat bakım. ' +
             'Yeni bir değerleme sınıfı eklendiğinde **iki yere** girilmesi gerekir ve ' +
             'biri unutulduğunda o hesap planında sessiz hata oluşur.\n\n' +
             'Bu, tek plan kullanmanın en somut ama en az konuşulan faydasıdır.' },

      { baslik:'Üçüncü sorun — konsolidasyon elle eşleştirme istiyor', tcode:'F.01',
        aciklama:'Grup bilançosu hazırlanmaya çalışılıyor.',
        girdi:[
          { alan:'TR01 mizanı', deger:'TDHP numaralarıyla (770, 320, 120…)' },
          { alan:'DE01 mizanı', deger:'SKR numaralarıyla (farklı numaralar)' },
          { alan:'Grup bilançosu', deger:'Her hesabın karşılığı **elle eşleştirilecek**' },
          { alan:'Bakım yükü', deger:'Yeni hesap açıldıkça eşleştirme tablosu büyüyor' },
        ],
        not:'İki mizan **doğrudan toplanamaz** — çünkü aynı kavram farklı numaralarda.\n\n' +
             'Eşleştirme tablosu kurulabilir ama **canlı bir bakım yüküdür**: ' +
             'her yeni hesapta güncellenmesi gerekir ve unutulursa ' +
             'grup bilançosunda o tutar **kaybolur**.' },

      { baslik:'Doğru çözüm değerlendiriliyor', tcode:'OB13',
        aciklama:'Geriye dönük düzeltmenin maliyeti hesaplanıyor.',
        girdi:[
          { alan:'Seçenek 1', deger:'DE01’i **tek operasyonel plana** (TDHP veya yeni grup planı) taşı' },
          { alan:'Seçenek 1 maliyeti', deger:'DE01’de kayıt var → **hesap planı değiştirilemez**' },
          { alan:'Gerçek maliyet', deger:'**Yeni şirket kodu** kur + tüm veriyi taşı + eski kodu kapat' },
          { alan:'Seçenek 2', deger:'Mevcut yapıyla devam, dağıtımı **elle** yap' },
        ],
        not:'**{{OBY6}}’da hesap planı, kayıt başladıktan sonra değiştirilemez.**\n\n' +
             'Düzeltmenin tek yolu yeni şirket kodu kurup veri taşımaktır — ' +
             'açılış bakiyeleri, açık kalemler, duran varlıklar, geçmiş belgeler.\n\n' +
             'Bu, **proje büyüklüğünde bir iştir** ve üç aylık bir kurulum kararının ' +
             'bedelidir.' },

      { baslik:'Karar: mevcut yapıyla devam + elle dağıtım', tcode:'FB50',
        aciklama:'Maliyet-fayda analizi sonrası pragmatik karar veriliyor.',
        girdi:[
          { alan:'Karar', deger:'Veri taşıma yapılmayacak — maliyeti faydayı aşıyor' },
          { alan:'BT gideri dağıtımı', deger:'Aylık **elle** şirketler arası fatura' },
          { alan:'Konsolidasyon', deger:'Eşleştirme tablosu kurulacak ve bakımı yapılacak' },
          { alan:'Kabul edilen yük', deger:'Aylık ~4 saat elle işlem + eşleştirme bakımı' },
        ],
        fis:{ baslik:'Şirketler arası BT gideri — elle fatura', belgeTuru:'SA', tarih:'31.03.2028',
          satirlar:[
            { hesap:'195', ad:'Grup içi alacaklar — DE01’den (TR01 belgesi)', borc:216000 },
            { hesap:'770', ad:'BT gideri — TR01 payı azaldı', alacak:216000 },
          ], not:'DE01 tarafında ayna kayıt: 770 gider borç / 395 grup içi borç alacak.\n\n' +
                 'CO otomatik dağıtımı ({{KSV5}}) yapamadığı için ' +
                 'her ay **elle** hesaplanıp kaydediliyor.\n\n' +
                 'Tutar doğru ama süreç kırılgan: hesaplama hatası veya ' +
                 'unutma riski her ay tekrarlanıyor.' },
        not:'**Pragmatik karar doğru olabilir** — ama bedeli her ay ödenir. ' +
             'Baştan tek plan kurulsaydı bu iş {{KSV5}} ile ' +
             'otomatik yapılacaktı.' },

      { baslik:'Üçüncü ülke için kural konuyor', tcode:'OB13',
        aciklama:'Aynı hatanın tekrarlanmaması için standart belirleniyor.',
        girdi:[
          { alan:'Kural 1', deger:'Yeni şirket kodları **tek operasyonel hesap planını** kullanacak' },
          { alan:'Kural 2', deger:'Yerel yasal ihtiyaç **ülke hesap planıyla** karşılanacak' },
          { alan:'Kural 3', deger:'Şirket kodu açılmadan önce **CO tasarımı** onaylanacak' },
          { alan:'Kural 4', deger:'Mali yıl varyantı **tüm şirketlerde aynı** (K4)' },
        ],
        not:'**En değerli kural üçüncüsü:** şirket kodu açmadan önce ' +
             '*"bu şirket hangi kontrol alanına bağlanacak?"* sorusu cevaplanacak.\n\n' +
             'Bu tek soru, hesap planı ve mali yıl varyantı kararlarını ' +
             'doğru yönlendirmeye yeterlidir — çünkü {{OKKP}} ikisini de şart koşar.' },
    ],

    sonuc:
      '**Üç aylık bir kurulum kararı, kalıcı bir operasyonel yüke dönüştü.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Hesap planı kararı CO’yu da bağlar.** ' +
      '{{OKKP}}, aynı kontrol alanına bağlı şirket kodlarının **aynı hesap planını** ' +
      've **aynı mali yıl varyantını** kullanmasını şart koşar. ' +
      'Ayrı planlar → ayrı kontrol alanları → **şirketler arası maliyet dağıtımı imkânsız**. ' +
      'Bu yüzden hesap planı kararı FI danışmanının tek başına vereceği bir karar değildir.\n\n' +
      '**2. Hesap belirleme hesap planı bazındadır.** ' +
      '{{OBYC}}, {{VKOA}}, {{OB40}} — hepsi ayrı ayrı kurulur ve ayrı ayrı bakılır. ' +
      'İki plan, kalıcı olarak iki kat yapılandırma yükü demektir ve ' +
      'birinde yapılan değişiklik diğerinde unutulduğunda **sessiz hata** üretir.\n\n' +
      '**3. Yerel yasal ihtiyaç ayrı plan gerektirmez.** ' +
      '**Ülke hesap planı** (alternatif hesap numarası) tam da bunun için vardır: ' +
      'kayıt grup planında yapılır, yasal rapor yerel numaralarla basılır. ' +
      'Tek kayıt, iki görünüm.\n\n' +
      '**4. Karar penceresi kayıt başlayana kadardır.** ' +
      '{{OBY6}}’daki hesap planı, mali yıl varyantı, para birimi ve ülke alanları ' +
      'kayıt yapıldıktan sonra **pratikte değiştirilemez**. ' +
      'Düzeltme, yeni şirket kodu kurup tüm veriyi taşımak demektir — ' +
      'proje büyüklüğünde bir iş. ' +
      'Bu yüzden şirket kodu açmadan önce sorulacak soru şudur: ' +
      '**"Bu şirket hangi kontrol alanına bağlanacak ve grup raporlaması nasıl olacak?"**',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '{{sirket-kodu}} **yasal muhasebe birimidir** — bilanço bu seviyede üretilir ({{T001}}).',
      '**Şirket** ise konsolidasyon çatısıdır ({{T880}}); bir şirkete **birden çok şirket kodu** bağlanabilir.',
      '{{OBY6}}’daki **dört alan geri dönüşsüzdür**: hesap planı, mali yıl varyantı, para birimi, ülke.',
      '**Grup genelinde tek operasyonel hesap planı** hedeflenmelidir; yerel ihtiyaç **ülke hesap planıyla** çözülür.',
      '{{OKKP}} kontrol alanı, bağlı şirket kodlarının **aynı hesap planı + aynı mali yıl varyantı** kullanmasını şart koşar.',
      'Şirket kodu **kopyalanarak** oluşturulur — sıfırdan açmak yüzlerce ayarı eksik bırakır.',
      'Şirketler arası işlemler **iki belge** üretir; grup içi hesaplar konsolidasyonda elenir.',
      '{{is-alani}} S/4HANA’da gözden düştü; yerini {{kar-merkezi}} ve segment aldı.',
    ],

    onemliNoktalar:[
      '**"Şirket ile şirket kodu farkı nedir?"** **Şirket kodu** yasal muhasebe birimidir, **bilanço üretir** ({{T001}}, {{OX02}}). **Şirket** konsolidasyon çatısıdır, birleştirir ({{T880}}, {{OX15}}). Bir şirkete birden çok şirket kodu bağlanır. Mülakatın klasik sorusudur.',
      '**"Kaç hesap planı kurulmalı?"** Neredeyse her zaman **bir tane**. Ayrı planlar: ortak {{kontrol-alani}} kurulamaz, hesap belirleme iki kat olur, konsolidasyon elle eşleştirme ister. Yerel ihtiyaç **ülke hesap planıyla** çözülür.',
      '**"Hesap planı sonradan değiştirilebilir mi?"** **Hayır** — kayıt başladıktan sonra pratikte imkânsızdır. Düzeltme, yeni şirket kodu kurup tüm veriyi taşımak demektir.',
      '**"Kontrol alanı ile şirket kodu ilişkisi?"** Bir kontrol alanına birden çok şirket kodu bağlanabilir — **şart: aynı hesap planı ve aynı mali yıl varyantı**. Bu yüzden FI kuruluş kararları CO düşünülerek verilmelidir.',
      '**"Şirket kodu nasıl oluşturulur?"** **Kopyalayarak** — sıfırdan değil. Yüzlerce bağlı ayar (belge türleri, numara aralıkları, tolerans grupları) kopyalamayla gelir. Sonrasında ülke, para birimi ve vergi ayarları doğrulanmalıdır.',
      '**"Şirketler arası kayıt nasıl çalışır?"** **İki ayrı belge** oluşur — her tüzel kişilik kendi bilançosunu üretmek zorundadır. Grup içi hesaplar (195/395) köprüyü kurar ve konsolidasyonda **karşılıklı elenir**.',
      '**"Özel dönemler ne işe yarar?"** Kapanış kayıtlarının Aralık’tan **ayrılmasını** sağlar. Aynı tarihe (31.12) kayıt yapılır ama farklı döneme düşer; böylece "Aralık’ın gerçek gideri neydi?" sorusu cevaplanabilir.',
      '**"İş alanı hâlâ kullanılmalı mı?"** S/4HANA’da **gözden düştü**. Dengeli bilanço üretemez; {{belge-bolme}} ile {{kar-merkezi}} ve segment bunu yapabiliyor. Yeni kurulumlarda tercih edilmez.',
    ],

    sikHatalar:[
      { hata:'Her ülkeye ayrı hesap planı kurmak.', dogru:'Tek operasyonel plan + **ülke hesap planı**. Ayrı planlar ortak kontrol alanını, kolay konsolidasyonu ve tek seferlik hesap belirlemeyi kaybettirir.' },
      { hata:'Şirket kodunu sıfırdan oluşturmak.', dogru:'**Kopyalanarak** oluşturulur; yüzlerce bağlı ayar birlikte gelir.' },
      { hata:'Kopyalama sonrası ülke ve para birimini kontrol etmemek.', dogru:'İkisi de kaynak şirketten gelir. Ülke yanlışsa **vergi çalışmaz**; para birimi yanlışsa her kayıt yanlış çevrilir.' },
      { hata:'Şirket ile şirket kodunu aynı sanmak.', dogru:'Şirket kodu bilanço üretir, şirket konsolide eder. Karıştırılırsa konsolidasyon yapısı yanlış kurulur.' },
      { hata:'CO tasarımını FI kuruluşundan sonra düşünmek.', dogru:'{{OKKP}} aynı hesap planı ve varyant şart koşar. Şirket kodu açmadan önce "hangi kontrol alanına bağlanacak?" sorulmalıdır.' },
      { hata:'Özel dönemleri tanımlamamak.', dogru:'Kapanış kayıtları Aralık’a karışır ve ayın gerçek gideri görünmez olur.' },
      { hata:'Yeni şirket kodunda numara aralıklarını açmayı unutmak.', dogru:'{{FBN1}} şirket kodu bazındadır; kopyalama getirmezse ilk kayıt hata verir.' },
      { hata:'Grup içi hesapları dönem sonunda karşılaştırmamak.', dogru:'Karşılıklı hesaplar eşit olmalıdır; eşit değilse konsolidasyon tutmaz.' },
    ],

    ipuclari:[
      '**Şirket kodu açmadan önce üç soruyu sor:** hangi kontrol alanına bağlanacak? ' +
      'grup raporlaması nasıl olacak? yerel yasal rapor hangi numaralarla basılacak?',
      'Şirket kodunu **kopyalayarak** oluştur; sonra ülke, para birimi, vergi ve ' +
      'banka ayarlarını tek tek doğrula.',
      'Yerel yasal numara ihtiyacını **ülke hesap planıyla** çöz — ayrı operasyonel plan kurma.',
      'Canlıya geçmeden bir **test kaydı** yap: numara aralığı, dönem ve hesap belirlemenin ' +
      'çalıştığını doğrular.',
      'Grup içi hesapların karşılıklı eşitliğini **dönem sonu listesine** koy.',
      'S/4HANA geçişinde kuruluş yapısını **değiştirme, gözden geçir** — ' +
      'ama birden çok hesap planı varsa sadeleştirme fırsatını değerlendir.',
    ],

    quiz:[
      { soru:'Şirket ile şirket kodu arasındaki temel fark nedir?',
        secenekler:[
          'Aynı şeyin iki adı',
          '**Şirket kodu bilanço üretir (yasal birim); şirket konsolidasyon çatısıdır**',
          'Şirket kodu daha büyük bir birimdir',
          'Şirket yalnızca CO’da kullanılır',
        ], dogru:1,
        aciklama:'**{{sirket-kodu}}** yasal muhasebe birimidir; her belge bir şirket koduna aittir ve ' +
                 'bilanço bu seviyede üretilir ({{T001}}, {{OX02}}).\n\n' +
                 '**Şirket** konsolidasyon birimidir; bilanço üretmez, **birleştirir** ' +
                 '({{T880}}, {{OX15}}). Bir şirkete **birden çok** şirket kodu bağlanabilir.\n\n' +
                 'Tek şirketli kurulumlarda fark görünmez; ikinci tüzel kişilik eklendiğinde ortaya çıkar.' },

      { soru:'İki şirket kodu neden aynı kontrol alanına bağlanamayabilir?',
        secenekler:[
          'Farklı ülkelerde oldukları için',
          'Farklı para birimi kullandıkları için',
          '**Farklı hesap planı veya farklı mali yıl varyantı kullandıkları için**',
          'Bağlanamaz, her şirket kodu ayrı kontrol alanı ister',
        ], dogru:2,
        aciklama:'{{OKKP}}, bağlı şirket kodlarının **aynı hesap planını** ve ' +
                 '**aynı mali yıl varyantını** kullanmasını şart koşar.\n\n' +
                 'Bu şart sağlanmazsa ayrı kontrol alanları kurulur ve ' +
                 '**şirketler arası maliyet dağıtımı imkânsızlaşır**.\n\n' +
                 'Bu yüzden hesap planı kararı FI danışmanının tek başına vereceği bir karar değildir — ' +
                 'CO tasarımını da bağlar.' },

      { soru:'Yerel yasal raporlama farklı hesap numaraları istiyor. Ne yapılmalı?',
        secenekler:[
          'Her ülke için ayrı operasyonel hesap planı kurulur',
          '**Tek operasyonel plan + ülke hesap planı (alternatif hesap numarası)**',
          'Her ay elle dönüştürülür',
          'Yerel rapordan vazgeçilir',
        ], dogru:1,
        aciklama:'**Ülke hesap planı** tam da bunun için vardır: kayıt grup planında yapılır ' +
                 '(400100), yasal rapor yerel numarayla basılır (770).\n\n' +
                 '**Tek kayıt, iki görünüm.** Konsolidasyon doğrudan çalışır, ' +
                 'ortak kontrol alanı kurulabilir, hesap belirleme bir kez yapılır.\n\n' +
                 'Ayrı operasyonel plan kurmak bu üç faydayı da kaybettirir.' },

      { soru:'Şirket kodunda kayıt yapıldıktan sonra hesap planı değiştirilebilir mi?',
        secenekler:[
          'Evet, {{OBY6}}’dan değiştirilir',
          'Evet, ama dönem kapalı olmalı',
          '**Hayır — pratikte imkânsızdır; yeni şirket kodu kurup veri taşımak gerekir**',
          'Yalnızca yıl başında değiştirilebilir',
        ], dogru:2,
        aciklama:'Tüm kayıtlar hesap planına referans verir. ' +
                 'Değiştirilmesi geçmiş belgeleri anlamsızlaştırırdı.\n\n' +
                 'Düzeltmenin tek yolu **yeni şirket kodu kurup tüm veriyi taşımaktır**: ' +
                 'açılış bakiyeleri, açık kalemler, duran varlıklar, geçmiş belgeler. ' +
                 '**Proje büyüklüğünde bir iştir.**\n\n' +
                 'Aynı kısıt mali yıl varyantı, para birimi ve ülke için de geçerlidir.' },

      { soru:'Yeni şirket kodu nasıl oluşturulmalıdır?',
        secenekler:[
          '{{OX02}}’de "yeni girdi" ile sıfırdan',
          '**Çalışan bir şirket kodu kopyalanarak**',
          'Taşıma isteğiyle test sisteminden getirilerek',
          'Ana veri yüklemesiyle',
        ], dogru:1,
        aciklama:'Bir şirket koduna **yüzlerce ayar** bağlıdır: belge türleri, numara aralıkları, ' +
                 'tolerans grupları, alan durumu, vergi ayarları, banka tanımları.\n\n' +
                 'Sıfırdan açılan şirket kodunda bunların hiçbiri yoktur; ' +
                 'eksikler tek tek hata olarak çıkar ve **haftalar sürer**.\n\n' +
                 'Kopyalama sonrası **ülke, para birimi, vergi ayarları ve adres** ' +
                 'mutlaka doğrulanmalıdır — kaynak şirketten gelirler.' },

      { soru:'Fatura TR01’e geldi ama masraf DE01’e ait. Sistem ne yapar?',
        secenekler:[
          'Tek belgede iki şirket kodu kullanır',
          '**İki ayrı belge oluşturur, grup içi hesaplarla bağlar**',
          'Kayıt yapılamaz',
          'Masrafı TR01’de bırakır',
        ], dogru:1,
        aciklama:'Her tüzel kişilik **kendi bilançosunu** üretmek zorundadır; ' +
                 'tek belge iki bilançoyu birden besleyemez.\n\n' +
                 'Sistem iki belge oluşturur ve aralarındaki köprüyü grup içi hesaplarla ' +
                 '(195 alacak / 395 borç) kurar. Her belge kendi içinde dengelidir.\n\n' +
                 'Konsolidasyonda bu iki hesap **karşılıklı elenir** — ' +
                 'grup dışına bir borç doğmamıştır.' },

      { soru:'Özel dönemler (13–16) ne işe yarar?',
        secenekler:[
          'Yılı 16 aya böler',
          'Gelecek yılın kayıtları için kullanılır',
          '**Kapanış kayıtlarını Aralık ayının normal işlemlerinden ayırır**',
          'Yalnızca vergi kayıtları için',
        ], dogru:2,
        aciklama:'Aralık’ta hem normal işlemler hem kapanış kayıtları yapılır. ' +
                 'Hepsi 12. döneme yazılırsa *"Aralık ayının gerçek gideri neydi?"* ' +
                 'sorusu cevaplanamaz.\n\n' +
                 'Özel dönemler aynı tarihe (31.12) kayıt yapılmasına izin verir ama ' +
                 'kayıt **farklı döneme** düşer. Böylece denetim düzeltmeleri, ' +
                 'vergi düzeltmeleri ayrı ayrı izlenebilir.' },

      { soru:'S/4HANA’da {{is-alani}} yerine ne tercih edilir ve neden?',
        secenekler:[
          'Şirket kodu — daha basit',
          '**{{kar-merkezi}} ve segment — {{belge-bolme}} ile dengeli bilanço üretebiliyorlar**',
          'İş alanı hâlâ tercih edilir',
          'Kontrol alanı',
        ], dogru:1,
        aciklama:'İş alanının kalıcı zayıflığı **dengeli bilanço üretememesidir**: ' +
                 'satıcı ve banka kalemleri iş alanı taşımaz.\n\n' +
                 '{{belge-bolme}} bu sorunu çözer ama **kâr merkezi ve segment için** ' +
                 'tasarlanmıştır. S/4HANA’da her ikisi de {{ACDOCA}} boyutu olduğu için ' +
                 'eşit kolaylıkta raporlanır.\n\n' +
                 'İş alanı kaldırılmadı ama teknik avantajı kalmadı; ' +
                 'yeni kurulumlarda tercih edilmez.' },
    ],

    flashcards:[
      { on:'Şirket kodu vs Şirket', arka:'**Şirket kodu** — yasal muhasebe birimi, **bilanço üretir**\nT001 · OX02 · **zorunlu**\n\n**Şirket** — konsolidasyon çatısı, **birleştirir**\nT880 · OX15 · isteğe bağlı\n\nBir şirkete **birden çok** şirket kodu bağlanır.' },
      { on:'OBY6’daki geri dönüşsüz dört alan', arka:'**1. Hesap planı** — tüm kayıtlar referans verir\n**2. Mali yıl varyantı** — dönem eşleşmesi bozulur\n**3. Para birimi** — tüm çevrimler yanlış olur\n**4. Ülke** — vergi yapılandırması buna bağlı\n\nKayıt başladıktan sonra **pratikte değiştirilemez**.' },
      { on:'Kaç hesap planı kurulmalı?', arka:'**Bir tane.**\n\nAyrı planların bedeli:\n• Ortak kontrol alanı **kurulamaz**\n• Hesap belirleme **iki kat** (OBYC/VKOA/OB40)\n• Konsolidasyon **elle eşleştirme** ister\n\nYerel ihtiyaç → **ülke hesap planı**.' },
      { on:'Kontrol alanı şartı nedir?', arka:'Bağlı şirket kodları **aynı hesap planını** ve **aynı mali yıl varyantını** kullanmalı.\n\n→ Bu yüzden FI kuruluş kararları **CO düşünülerek** verilir.\n\nŞirket kodu açmadan sor: *"hangi kontrol alanına bağlanacak?"*' },
      { on:'Şirket kodu nasıl oluşturulur?', arka:'**KOPYALAYARAK** — sıfırdan değil.\n\nYüzlerce bağlı ayar birlikte gelir: belge türleri, numara aralıkları, tolerans grupları, alan durumu.\n\nSonra doğrula: **ülke · para birimi · vergi · banka · adres**' },
      { on:'Şirketler arası kayıt nasıl olur?', arka:'**İki ayrı belge** oluşur — her tüzel kişilik kendi bilançosunu üretmek zorunda.\n\nKöprü: grup içi hesaplar\n`195` alacak (bir tarafta)\n`395` borç (diğer tarafta)\n\nKonsolidasyonda **karşılıklı elenir**.' },
      { on:'Ülke hesap planı ne işe yarar?', arka:'**Tek kayıt, iki görünüm.**\n\nKayıt grup planında (400100), yasal rapor yerel numarayla (770).\n\nG/L ana verisinde **alternatif hesap numarası** tanımlanır.\n\n→ Ayrı operasyonel plan kurmadan yerel uyum.' },
      { on:'Özel dönemler (13–16) neden var?', arka:'Kapanış kayıtlarını **Aralık’ın normal işlemlerinden ayırmak** için.\n\nAynı tarihe (31.12) kayıt yapılır ama **farklı döneme** düşer.\n\n13 → denetim düzeltmeleri\n14 → vergi düzeltmeleri\n\n→ "Aralık’ın gerçek gideri neydi?" cevaplanabilir.' },
      { on:'İş alanı vs kâr merkezi (S/4HANA)', arka:'**İş alanı** — dengeli bilanço **üretemez** (satıcı/banka kalemleri taşımaz)\n\n**Kâr merkezi + segment** — belge bölme ile **dengeli bilanço üretir**\n\nS/4’te ikisi de ACDOCA boyutu → iş alanının teknik avantajı **kalmadı**.' },
      { on:'Kurulum sırası nedir?', arka:'**Yukarıdan aşağıya, sıra atlanamaz:**\n\n1. Hesap planı (OB13)\n2. Mali yıl varyantı (OB29)\n3. Şirket kodu — **kopyala** (OX02)\n4. Global parametreler (OBY6)\n5. Kontrol alanı (OKKP)\n6. Ek birimler (OB45, OX03, OX15)' },
      { on:'T001 neden kritik?', arka:'**Her belge kaydında okunur.**\n\nŞirket kodundan türetilenler:\nhesap planı → kullanılabilir hesaplar\nmali yıl varyantı → dönem\nkayıt dönemi varyantı → dönem açık mı\npara birimi → çevrim\nülke → **vergi kodları**' },
      { on:'Grup içi hesaplar neden kontrol edilir?', arka:'A’nın B’den alacağı = B’nin A’ya borcu **olmalı**.\n\nEşit değilse:\n1. Zamanlama farkı (biri kaydetmedi)\n2. **Kur farkı** (dövizliyse)\n3. Yanlış hesap\n\n→ Konsolidasyonun **ön koşulu**. Dönem sonu listesine konur.' },
    ],
  },

  },
});
