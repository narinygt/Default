/* ==========================================================================
   content/fi/reporting.js — "Reporting (Raporlama)"
   ========================================================================== */

SAP.registerTopic({
  id: 'reporting',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'FI raporlaması **iki temel soruya** cevap verir ve tüm araçlar bu ikiliye göre ayrılır:\n\n' +
      '**"Bakiye ne?"** → bakiye raporları ({{FS10N}}, {{FAGLB03}}). ' +
      'Dönem dönem toplamları verir, hızlıdır.\n\n' +
      '**"Bu bakiye hangi belgelerden oluşuyor?"** → **{{dokum}}** raporları ' +
      '({{FBL3N}}, {{FBL1N}}, {{FBL5N}}, {{FAGLL03}}). ' +
      'Tek tek satırları verir, belgeye çift tıklanabilir.\n\n' +
      'Üçüncü bir katman **mali tablolardır** ({{F.01}}): hesapları ' +
      '{{mali-tablo-yapisi}}’na göre gruplayıp bilanço ve gelir tablosu üretir.\n\n' +
      'S/4HANA’da bunların üzerine **Fiori ve {{cds-view}} tabanlı analitik** eklendi — ' +
      'ama klasik raporlar kaldırılmadı ve danışmanlıkta hâlâ ilk başvurulan araçlardır.',

    neden:
      '**Karar desteği.** Mizan bir sayıdır; kararı veren, o sayının **arkasını görebilendir**.\n\n' +
      '**Yasal zorunluluk.** Bilanço ve gelir tablosu belirli bir yapıda sunulmak zorundadır.\n\n' +
      '**Teşhis.** FI’daki sorunların çoğu rapor okuyarak bulunur: ' +
      'hangi belge, hangi kullanıcı, hangi tarih.\n\n' +
      '**Mutabakat.** Muavin defter ile ana muhasebenin tutması ancak ' +
      'karşılaştırmalı raporlarla doğrulanır.\n\n' +
      '**Denetim.** Denetçinin istediği dökümlerin dakikalar içinde üretilebilmesi ' +
      'sistemin olgunluk göstergesidir.',

    sirketOnemi:
      'Raporlama, danışmanın **en çok kullandığı** ama en az yapılandırdığı alandır. ' +
      'Çoğu rapor kutudan çıktığı gibi çalışır; iş, **doğru raporu seçmek ve ' +
      'doğru düzenle kullanmaktır**.\n\n' +
      'En sık karşılaşılan sorun teknik değil, kavramsaldır: ' +
      'kullanıcı bakiye raporunda göremediği bir detayı arar ve ' +
      '"sistem çalışmıyor" der. Oysa aradığı şey **kalem dökümündedir**.\n\n' +
      'Ayırt edici soru şudur: **"{{FBL3N}} boş dönüyor ama hesapta bakiye var. Neden?"** ' +
      'Doğru cevap: hesapta **kalem yönetimi** açık değildir ({{SKB1}}). ' +
      'Bakiye vardır ama kalemler saklanmamıştır. ' +
      'Ayar sonradan açılırsa **geçmiş kalemler görünmez** — yalnızca sonraki kayıtlar.',

    gercekHayat:
      'Mali işler müdürü soruyor: *"770 hesabında 4,2 milyon TL gider var. Bu ne?"*\n\n' +
      'Muhasebeci {{FS10N}} açıyor — bakiyeyi görüyor ama **detayı göremiyor**. ' +
      'Rapor dönem dönem toplamları veriyor: Ocak 380.000, Şubat 410.000…\n\n' +
      'Doğru araç {{FBL3N}}: 770 hesabının **her bir kalemini** listeliyor. ' +
      'Ama varsayılan düzende yalnızca belge numarası, tarih ve tutar var. ' +
      '*"Hangi departman?"* sorusunun cevabı yok.\n\n' +
      'Çözüm {{alv-duzeni}}: **maliyet yeri** sütunu eklenir, ' +
      'masraf türüne göre alt toplam alınır, düzen kaydedilir.\n\n' +
      'Artık soru şuna dönüşüyor: *"Pazarlama 1,2 milyon harcamış — Ekim’de bir sıçrama var, ' +
      'hangi belge?"* Çift tıkla belgeye inilir, faturayı kimin girdiği görülür.\n\n' +
      '**Raporlama becerisi, doğru aracı seçip düzenini kurmaktır** — ' +
      'yeni rapor yazmak değil.',

    muhasebeMantigi:
      'FI raporlamasının muhasebe mantığı **iki seviyeli veri yapısına** dayanır:\n\n' +
      '**Kalem seviyesi** — her belge satırı. Ayrıntı burada; ' +
      'ama milyonlarca satır olduğu için toplama pahalıdır.\n\n' +
      '**Toplam seviyesi** — hesap × dönem bazında birikmiş tutarlar. ' +
      'Hızlıdır ama ayrıntı yoktur.\n\n' +
      'Klasik SAP bu ikisini **ayrı tablolarda** tutardı ({{BSEG}} ve {{GLT0}}) ve ' +
      'aralarında tutarsızlık oluşabilirdi — *"toplam tablosu ile kalem tablosu tutmuyor"* ' +
      'klasik bir sorundu.\n\n' +
      'S/4HANA’da **toplam tablosu kaldırıldı**: {{ACDOCA}} yalnızca kalemleri tutar, ' +
      'toplamlar okuma anında hesaplanır. ' +
      'Tutarsızlık **yapısal olarak imkânsız** hâle geldi.\n\n' +
      'Üçüncü katman **mali tablo yapısıdır**: hesapları bilanço/gelir tablosu ' +
      'satırlarına eşleyen hiyerarşi. Bu, muhasebe verisinin ' +
      '**sunum biçimine** dönüştüğü yerdir.',

    kavramlar: ['dokum', 'alv-duzeni', 'mali-tablo-yapisi', 'mizan',
                'cds-view', 'evrensel-kayit-defteri'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Raporlama süreci **soruyla başlar, araçla değil**. ' +
      'Doğru sıra: soruyu netleştir → uygun rapor türünü seç → düzeni kur → ' +
      'kaydet ve tekrar kullan.',

    roller:[
      { rol:'Muhasebe kullanıcısı', gorev:'Günlük dökümleri alır ({{FBL3N}}, {{FBL1N}}); düzenleri kullanır.' },
      { rol:'Ana muhasebe', gorev:'Mizan ve mali tabloları üretir ({{F.01}}); mutabakat yapar.' },
      { rol:'FI danışmanı', gorev:'{{mali-tablo-yapisi}}’nı ({{OB58}}) tasarlar, genel düzenleri kurar.' },
      { rol:'Kontrolör', gorev:'Yönetim raporlarını hazırlar; CO raporlarıyla birleştirir.' },
      { rol:'Denetçi', gorev:'Belge dökümü ve {{degisiklik-belgesi}} ister.' },
      { rol:'Geliştirici', gorev:'Standart rapor yetmezse Report Painter veya {{cds-view}} ile üretir.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Sorudan rapora — doğru araç seçimi',
      adimlar:[
        { ic:'❓', rol:'Kullanıcı', baslik:'Soru netleştirilir',
          aciklama:'*"Bakiye ne?"* mi, *"bu bakiye neyden oluşuyor?"* mu, ' +
                   '*"yasal tablo nasıl görünüyor?"* mü — üçü farklı araç gerektirir.',
          cikti:'Netleşmiş soru', ok:'araç seçilir' },
        { ic:'📊', rol:'Kullanıcı', baslik:'Bakiye sorusu → {{FS10N}} / {{FAGLB03}}',
          aciklama:'Dönem dönem toplamlar. Hızlıdır ama **ayrıntı yoktur**. ' +
                   'S/4HANA’da {{FAGLB03}} defter ve segment filtresi sunar.',
          cikti:'Bakiye tablosu', ok:'detay gerekiyorsa' },
        { ic:'📋', rol:'Kullanıcı', baslik:'Detay sorusu → {{FBL3N}} / {{FAGLL03}}',
          aciklama:'Kalem kalem liste. **Belgeye çift tıklanır.** ' +
                   'Ön koşul: hesapta **kalem yönetimi** açık olmalı.',
          cikti:'Kalem dökümü', ok:'sütun eksikse' },
        { ic:'🎛️', rol:'Kullanıcı', baslik:'{{alv-duzeni}} kurulur ve **kaydedilir**',
          aciklama:'Gerekli sütunlar eklenir (maliyet yeri, vergi kodu, ihtar seviyesi), ' +
                   'alt toplam alınır. **Bir kez kur, hep kullan.**',
          cikti:'Kayıtlı düzen', ok:'yasal tablo' },
        { ic:'📑', rol:'Ana muhasebe', baslik:'Mali tablo → {{F.01}}',
          aciklama:'{{mali-tablo-yapisi}} ({{OB58}}) hesapları bilanço/gelir tablosu ' +
                   'satırlarına eşler.',
          cikti:'Bilanço + gelir tablosu', ok:'özel ihtiyaç' },
        { ic:'🛠️', rol:'Geliştirici', baslik:'Standart yetmezse özel rapor',
          aciklama:'Report Painter ({{GR55}}), {{SQVI}} hızlı sorgu veya ' +
                   'S/4HANA’da {{cds-view}} tabanlı Fiori uygulaması.',
          cikti:'Özel rapor' },
      ],
    },

    adimlar:[
      { rol:'Kullanıcı', eylem:'Bakiyeye bakar', sistem:'{{FS10N}} · {{FAGLB03}}' },
      { rol:'Kullanıcı', eylem:'Kalem dökümü alır', sistem:'{{FBL3N}} · {{FBL1N}} · {{FBL5N}} · {{FAGLL03}}' },
      { rol:'Kullanıcı', eylem:'Sütun ekler ve düzeni kaydeder', sistem:'{{alv-duzeni}} — genel veya kişisel' },
      { rol:'Kullanıcı', eylem:'Belgeye iner', sistem:'Çift tıkla → {{FB03}}' },
      { rol:'Danışman', eylem:'Mali tablo yapısını tanımlar', sistem:'{{OB58}}' },
      { rol:'Ana muhasebe', eylem:'Bilanço/gelir tablosu alır', sistem:'{{F.01}}' },
      { rol:'Kontrolör', eylem:'Özel rapor hazırlar', sistem:'{{GR55}} Report Painter · {{SQVI}}' },
      { rol:'Denetçi', eylem:'Değişiklik izini ister', sistem:'{{FK04}} · {{FD04}} · {{CDHDR}}' },
    ],

    veriAkisi:{
      nereden:'{{ACDOCA}} (S/4) veya {{BSEG}}+{{GLT0}} (ECC); ana veri açıklamaları; ' +
              '{{mali-tablo-yapisi}} hiyerarşisi.',
      nereye:'Ekran listesi, Excel dışa aktarımı, PDF, Fiori panosu.',
      tetikleyen:'Kullanıcı sorgusu; periyodik kapanış; denetim talebi.',
      sonraki:'Karar, mutabakat, düzeltme kaydı.',
    },

    notlar:[
      { tip:'warn', baslik:'Kalem yönetimi kapalıysa döküm alınamaz — ve geriye dönük açılamaz', metin:
        '{{FBL3N}} bir hesap için **boş dönüyorsa** ilk bakılacak yer ' +
        '{{SKB1}}’deki **kalem yönetimi** işaretidir.\n\n' +
        'Bu işaret kapalıysa sistem o hesap için kalemleri **saklamaz** — ' +
        'yalnızca toplamları tutar. Bakiye görünür, ayrıntı görünmez.\n\n' +
        '**Kritik nokta:** ayar sonradan açılabilir ama **geçmişe etki etmez**. ' +
        'Açıldıktan sonraki kayıtlar listelenir; önceki dönemler ' +
        '**kalıcı olarak** ayrıntısız kalır.\n\n' +
        'Bu yüzden hesap açılırken karar doğru verilmelidir. ' +
        'Genel kural: **ayrıntı gerekebilecek her hesapta açık tutulmalıdır**. ' +
        'Kapalı tutmanın tek gerekçesi performanstı — S/4HANA’da o gerekçe de kalktı.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Raporlama **kayıt üretmez** — ama muhasebe verisinin nasıl sunulacağını belirler. ' +
      'Aşağıdaki örnekler aynı verinin farklı raporlarda nasıl göründüğünü gösteriyor.',

    etkilenenHesaplar:[
      { hesap:'Tüm hesaplar', tur:'—', neden:'Raporlama okuma işlemidir; hiçbir hesabı değiştirmez.' },
      { hesap:'Kalem yönetimi açık hesaplar', tur:'Yapısal', neden:'{{SKB1}} — yalnızca bunlarda {{dokum}} alınabilir. Ayar **geriye dönük çalışmaz**.' },
      { hesap:'{{mutabakat-hesabi}}lar', tur:'Bilanço', neden:'Doğrudan kayıt kabul etmez; dökümü muavin defterden ({{FBL1N}}/{{FBL5N}}) alınır.' },
      { hesap:'Mali tablo yapısına atanmamış hesaplar', tur:'Raporlama riski', neden:'{{F.01}}’de **"atanmamış"** satırında toplanır — bilanço tutmuyor gibi görünür.' },
    ],

    fisler:[
      { baslik:'Örnek kayıt — raporlarda nasıl görünecek?',
        belgeTuru:'KR', tarih:'12.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Reklam gideri — maliyet yeri 4200', borc:180000 },
          { hesap:'191', ad:'İndirilecek KDV', borc:36000 },
          { hesap:'320', ad:'Satıcılar — V-3012', alacak:216000 },
        ],
        not:'Bu tek kayıt üç ayrı raporda görünür:\n\n' +
             '**{{FS10N}}** → 770 hesabının Ekim toplamına **180.000 TL eklenir**. ' +
             'Belge numarası görünmez.\n\n' +
             '**{{FBL3N}}** → ayrı bir **satır** olarak listelenir; ' +
             'belge numarası, tarih, tutar ve (düzene eklenirse) **maliyet yeri** görünür.\n\n' +
             '**{{F.01}}** → 770 hesabı gelir tablosunda "Pazarlama giderleri" satırına ' +
             '{{mali-tablo-yapisi}} üzerinden eşlenir; tek başına görünmez, ' +
             '**grup toplamına** girer.' },

      { baslik:'Mutabakat hesabının dökümü — neden {{FBL3N}} çalışmaz?',
        belgeTuru:'—', tarih:'—', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar (mutabakat hesabı)', borc:0, alacak:0,
            not:'{{FBL3N}} → **kullanışsız**' },
        ],
        not:'320 bir {{mutabakat-hesabi}}dır: doğrudan kayıt kabul etmez, ' +
             'kayıtlar satıcı üzerinden gelir.\n\n' +
             '{{FBL3N}} teknik olarak çalışır ama **satıcı bilgisi olmadan** ' +
             'düz bir liste verir — hangi satıcı, hangi fatura belli olmaz.\n\n' +
             '**Doğru araç {{FBL1N}}’dir:** satıcı bazında döküm alır, ' +
             'açık/kapalı kalem ayrımı yapar, vade ve ihtar bilgisini gösterir.\n\n' +
             'Aynı ilke müşteride geçerlidir: 120 için {{FBL5N}} kullanılır.\n\n' +
             '*(Tabloda 0/0 gösterimi, bu hesabın doğrudan kayıt almadığını vurgulamak içindir.)*' },

      { baslik:'Mali tablo yapısında **atanmamış hesap** — sessiz raporlama hatası',
        belgeTuru:'—', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770300', ad:'Yeni açılan reklam gideri hesabı', borc:1240000,
            not:'{{OB58}}’de **atanmamış**' },
          { hesap:'—', ad:'{{F.01}}’de "Atanmamış hesaplar" satırında görünür', alacak:1240000,
            not:'Gelir tablosunda **yanlış yerde**' },
        ],
        not:'Yeni bir gider hesabı açıldı ama {{mali-tablo-yapisi}}’na **eklenmedi**.\n\n' +
             'Sonuç: 1.240.000 TL gider, gelir tablosunda "Pazarlama giderleri" altında değil, ' +
             '**"Atanmamış hesaplar"** satırında toplanıyor.\n\n' +
             'Mizan doğru, toplam doğru — ama **sunum yanlış**. ' +
             'Yönetim raporu pazarlama giderini olduğundan düşük gösteriyor.\n\n' +
             '**Önlem:** hesap açma prosedürüne *"mali tablo yapısına atandı mı?"* ' +
             'kontrolü eklenmelidir. {{F.01}}’de "atanmamış" satırı ' +
             'her zaman **sıfır olmalıdır**.\n\n' +
             '*(Tablodaki iki satır aynı tutarı iki farklı sunumda gösteriyor; ' +
             'gerçekte tek kayıt vardır.)*' },
    ],

    tHesaplar:[
      { hesap:'Reklam gideri', kod:'770300',
        borc:[{ ad:'Ekim faturaları', tutar:1240000 }],
        alacak:[],
        not:'Mizanda doğru — mali tabloda yanlış yerde' },
    ],

    notlar:[
      { tip:'tip', baslik:'Bakiye mi, döküm mü? — soruyu doğru sor', metin:
        'Kullanıcıların en sık yaşadığı sıkıntı, **yanlış rapor türünü** seçmektir.\n\n' +
        '*"Hesapta 4,2 milyon var, bu ne?"* sorusu bir **döküm** sorusudur — ' +
        'ama çoğu kullanıcı bakiye raporunda arar ve bulamaz.\n\n' +
        'Ayrım basittir:\n\n' +
        '**"Ne kadar?"** → bakiye raporu ({{FS10N}}, {{FAGLB03}})\n' +
        '**"Neden bu kadar?"** → kalem dökümü ({{FBL3N}}, {{FAGLL03}})\n' +
        '**"Yasal tabloda nasıl görünüyor?"** → {{F.01}}\n\n' +
        'Döküm raporunun ayırt edici özelliği **belgeye inebilmesidir**: ' +
        'çift tıklama {{FB03}}’ü açar ve *"kim girdi, hangi faturayla"* sorusu cevaplanır.\n\n' +
        'Bu tek özellik, FI teşhis çalışmalarının **temel aracıdır**.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'FI raporları **dört gruba** ayrılır. Doğru grubu seçmek, ' +
      'raporlama becerisinin büyük kısmıdır.',

    liste:[
      { ad:'Bakiye · {{FS10N}} G/L bakiyesi', en:'G/L Account Balances',
        aciklama:'Hesabın dönem dönem borç, alacak ve bakiye toplamları.',
        neZaman:'*"Ne kadar?"* sorusu; hızlı kontrol; mizan hazırlığı.',
        ornek:'Ocak 380.000 · Şubat 410.000 · … Ayrıntı **yoktur**; ' +
              'belge numarası görünmez.',
        tcodes:['FS10N'] },

      { ad:'Bakiye · {{FAGLB03}} defter bazlı bakiye', en:'G/L Balances (New G/L)',
        aciklama:'{{FS10N}}’in defter, {{kar-merkezi}} ve segment filtreli hâli.',
        neZaman:'{{paralel-defter}} veya segment raporlaması varsa.',
        ornek:'**Defter alanı boş bırakılırsa lider defter gelir** — ' +
              'IFRS bakiyesi için defter kodu girilmelidir.',
        tcodes:['FAGLB03'] },

      { ad:'Döküm · {{FBL3N}} G/L kalemleri', en:'G/L Line Items',
        aciklama:'Bir hesabın **tek tek kalemleri**; belgeye çift tıklanabilir.',
        neZaman:'*"Neden bu kadar?"* sorusu; teşhis; denetim dökümü.',
        ornek:'**Ön koşul:** hesapta {{SKB1}} kalem yönetimi açık olmalı. ' +
              'Kapalıysa rapor **boş döner** ve ayar **geriye dönük çalışmaz**.',
        tcodes:['FBL3N'] },

      { ad:'Döküm · {{FBL1N}} / {{FBL5N}} iş ortağı kalemleri', en:'Vendor / Customer Line Items',
        aciklama:'Satıcı ve müşteri bazında döküm; **açık/kapalı kalem** ayrımı yapar.',
        neZaman:'Satıcı borcu, müşteri alacağı, yaşlandırma, ihtar analizi.',
        ornek:'{{mutabakat-hesabi}}nın dökümü buradan alınır — {{FBL3N}}’den değil. ' +
              'Vade, ihtar seviyesi ve ödeme bloğu sütunları eklenebilir.',
        tcodes:['FBL1N','FBL5N'] },

      { ad:'Döküm · {{FAGLL03}} defter bazlı kalemler', en:'G/L Line Items (New G/L)',
        aciklama:'{{FBL3N}}’in defter, kâr merkezi ve segment filtreli hâli.',
        neZaman:'Segment analizi; belge bölme sonucunu görmek.',
        ornek:'{{FBL3N}} **giriş görünümünü**, {{FAGLL03}} **genel defter görünümünü** okur. ' +
              'Farklı satır sayısı göstermeleri **hata değildir** (bkz. {{konu:new-gl}}).',
        tcodes:['FAGLL03'] },

      { ad:'Mali tablo · {{F.01}} bilanço / gelir tablosu', en:'Financial Statements',
        aciklama:'Hesapları {{mali-tablo-yapisi}}’na göre gruplayıp yasal tablo üretir.',
        neZaman:'Dönem sonu; yasal raporlama; yönetim sunumu.',
        ornek:'**"Atanmamış hesaplar" satırı sıfır olmalıdır.** ' +
              'Dolu ise bir hesap yapıya eklenmemiştir ve **yanlış yerde** raporlanıyordur.',
        tcodes:['F.01','OB58'] },

      { ad:'Özel · Report Painter / Writer', en:'Report Painter',
        aciklama:'Programlama olmadan, satır-sütun tanımlayarak özel mali rapor üretme.',
        neZaman:'Standart rapor yetmediğinde; yönetim raporu formatı özel ise.',
        ornek:'Rapor grupları {{GR55}} ile çalıştırılır. ' +
              'Öğrenme eğrisi diktir ama **geliştirici gerektirmez**.',
        tcodes:['GR55'] },

      { ad:'Özel · {{SQVI}} hızlı sorgu', en:'QuickViewer',
        aciklama:'Tabloları birleştirip liste raporu üretir; **kişisel** araçtır.',
        neZaman:'Tek seferlik analiz; hızlı veri çekme.',
        ornek:'Kişiye özeldir, paylaşılmaz. Yaygın kullanım gerekiyorsa ' +
              'SAP Query’ye taşınmalıdır.',
        tcodes:['SQVI'] },

      { ad:'Özel · {{SE16N}} tablo görüntüleme', en:'Table Display',
        aciklama:'Ham tablo verisi. **Rapor değildir** — teşhis aracıdır.',
        neZaman:'Bir alanın gerçekte ne değer taşıdığını görmek gerektiğinde.',
        ornek:'{{VBRK}} `RFBSK` kontrolü, {{T030K}} eksik satır teşhisi gibi. ' +
              '**Kullanıcıya verilmemelidir** — yetki kontrolü zayıftır.',
        tcodes:['SE16N'] },

      { ad:'S/4HANA · Fiori analitik uygulamaları', en:'Fiori Analytical Apps',
        aciklama:'{{cds-view}} tabanlı, anlık hesaplanan görsel raporlar.',
        neZaman:'S/4HANA’da; yönetim panoları ve serbest analiz için.',
        ornek:'Trial Balance, Display Line Items, Financial Statement — ' +
              'klasik raporların modern karşılıkları. **Klasikler kaldırılmadı.**' },
    ],

    karsilastirmaBasliklar:['Bakiye raporu', 'Kalem dökümü'],
    karsilastirma:[
      ['Cevapladığı soru', '**"Ne kadar?"**', '**"Neden bu kadar?"**'],
      ['Veri seviyesi', 'Hesap × dönem toplamı', 'Tek tek belge satırı'],
      ['Belgeye inilir mi', 'Hayır', '**Evet** — çift tıkla {{FB03}}'],
      ['Hız', 'Hızlı', 'Daha yavaş (çok satır)'],
      ['Ön koşul', 'Yok', '**Kalem yönetimi açık olmalı** ({{SKB1}})'],
      ['Tipik araç', '{{FS10N}} · {{FAGLB03}}', '{{FBL3N}} · {{FBL1N}} · {{FAGLL03}}'],
      ['Teşhis değeri', 'Düşük — sorunu gösterir', '**Yüksek** — sebebi gösterir'],
      ['S/4HANA’da', 'Anlık hesaplanır (toplam tablosu yok)', '{{ACDOCA}}’dan doğrudan'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FBL3N', ad:'G/L kalem dökümü — FI’ın en çok kullanılan raporu',
        amac:'Bir G/L hesabının kalemlerini listeler; belgeye inmeyi sağlar.',
        neZaman:'*"Bu bakiye neyden oluşuyor?"* sorusunda; teşhiste; denetim dökümünde.',
        adimlar:[
          { baslik:'Hesap ve şirket kodunu gir' },
          { baslik:'Kalem türünü seç',
            aciklama:'**Açık** · **kapalı** · **tümü**. G/L hesaplarında genelde "tümü" kullanılır.' },
          { baslik:'Tarih aralığını gir' },
          { baslik:'**Düzeni ayarla ve kaydet**',
            aciklama:'Gerekli sütunları ekle (maliyet yeri, vergi kodu, metin), ' +
                     'alt toplam al. {{alv-duzeni}} olarak kaydedilir.' },
          { baslik:'Belgeye çift tıkla', aciklama:'{{FB03}} açılır; kim girdi, hangi belge görünür.' },
        ],
        ekranAkisi:[
          { ekran:'Seçim', islem:'Hesap 770300 · şirket 1000 · 01.01–31.12.2027' },
          { ekran:'Kalem türü', islem:'**Tümü**' },
          { ekran:'Liste', islem:'842 kalem · toplam 4.240.000 TL' },
          { ekran:'Düzen', islem:'**Maliyet yeri** sütunu eklendi · masraf türüne göre alt toplam' },
          { ekran:'Detay', islem:'Şüpheli kaleme çift tık → belge 1900008801' },
        ],
        alanlar:{
          zorunlu:['G/L hesabı','Şirket kodu','Kalem türü'],
          opsiyonel:['Tarih aralığı','Belge türü','Kullanıcı','Metin','Düzen'] },
        hatalar:[
          { mesaj:'Rapor boş dönüyor ama hesapta bakiye var', sebep:'Hesapta **kalem yönetimi kapalı** ({{SKB1}}).', cozum:'{{FS00}}’da işareti aç. **Geriye dönük çalışmaz** — yalnızca sonraki kayıtlar görünür.' },
          { mesaj:'Aradığım sütun listede yok', sebep:'Varsayılan düzende değil.', cozum:'Düzen değiştir → sütun ekle → **düzeni kaydet**. Bir kez kur, hep kullan.' },
          { mesaj:'Çok yavaş çalışıyor', sebep:'Tarih aralığı geniş veya hesap çok hareketli.', cozum:'Aralığı daralt; S/4HANA’da {{FAGLL03}} veya Fiori uygulaması daha hızlıdır.' },
        ],
        ipucu:'**Düzeni kaydetmek, bu raporun en değerli özelliğidir.** ' +
              'Aylık tekrarlanan analizler (ihtar seviyesi, maliyet yeri kırılımı, ' +
              'vergi kodu kontrolü) bir kez kurulup kaydedildiğinde ' +
              'saniyeler sürer.\n\n' +
              'Genel düzen (`/` ile başlayan) tüm ekibin kullanmasını sağlar — ' +
              'herkesin ayrı ayrı sütun eklemesi gerekmez.',
        ilgili:['FAGLL03','FS10N','FB03','FBL1N'] },

      { kod:'F.01', ad:'Mali tablolar — bilanço ve gelir tablosu',
        amac:'Hesapları {{mali-tablo-yapisi}}’na göre gruplayıp yasal tabloları üretir.',
        neZaman:'Dönem sonu; yasal raporlama; yönetim sunumu.',
        adimlar:[
          { baslik:'Şirket kodu ve dönemi gir' },
          { baslik:'**Mali tablo yapısını seç**',
            aciklama:'{{OB58}} ile tanımlanan hiyerarşi. Farklı yapılar farklı sunum verir ' +
                     '(yasal, yönetim, IFRS).' },
          { baslik:'Karşılaştırma dönemini gir', aciklama:'Genelde önceki yıl aynı dönem.' },
          { baslik:'Raporu çalıştır' },
          { baslik:'**"Atanmamış hesaplar" satırını kontrol et**',
            aciklama:'**Sıfır olmalıdır.** Dolu ise bir hesap yapıya eklenmemiştir.' },
        ],
        ekranAkisi:[
          { ekran:'Seçim', islem:'Şirket 1000 · dönem 12/2027 · karşılaştırma 12/2026' },
          { ekran:'Yapı', islem:'Mali tablo yapısı **TDHP**' },
          { ekran:'Sonuç', islem:'Bilanço + gelir tablosu, karşılaştırmalı' },
          { ekran:'**Kontrol**', islem:'"Atanmamış hesaplar" → **0 TL** ✓' },
        ],
        alanlar:{
          zorunlu:['Şirket kodu','Dönem','Mali tablo yapısı'],
          opsiyonel:['Karşılaştırma dönemi','İş alanı','Defter'] },
        hatalar:[
          { mesaj:'"Atanmamış hesaplar" satırında tutar var', sebep:'Yeni açılan hesap {{OB58}} yapısına eklenmemiş.', cozum:'{{OB58}}’de hesabı doğru düğüme ata. **Hesap açma prosedürüne bu kontrol eklenmelidir.**' },
          { mesaj:'Bilanço aktif ve pasif tutmuyor', sebep:'Genelde atanmamış hesap veya yapı hatası.', cozum:'Önce atanmamış satırını kontrol et; sonra {{OB58}} hiyerarşisinde çift atama ara.' },
        ],
        ipucu:'**"Atanmamış hesaplar" satırı bir sağlık göstergesidir.** ' +
              'Sıfırdan farklıysa mizan doğru olsa bile **sunum yanlıştır**: ' +
              'gider ya gelir yanlış grupta toplanıyordur.\n\n' +
              'Yeni hesap açıldığında {{OB58}} güncellenmezse bu satır sessizce dolar ve ' +
              'yönetim raporu ay boyunca yanlış okunur.',
        ilgili:['OB58','FS10N','closing'] },

      { kod:'OB58', ad:'Mali tablo yapısı tanımla',
        amac:'Hangi hesabın bilanço/gelir tablosunun hangi satırında raporlanacağını belirler.',
        neZaman:'Kurulumda; yeni hesap grubu eklendiğinde; farklı sunum gerektiğinde.',
        adimlar:[
          { baslik:'Yapı kodunu ve adını gir' },
          { baslik:'Hiyerarşiyi kur',
            aciklama:'Aktif / Pasif / Gelir / Gider ana düğümleri, altında alt gruplar.' },
          { baslik:'Hesap aralıklarını düğümlere ata',
            aciklama:'**Aralık kullan**, tek tek hesap değil — yeni hesaplar otomatik kapsanır.' },
          { baslik:'Kâr/zarar hesabını tanımla', aciklama:'Gelir–gider farkının aktarılacağı bilanço satırı.' },
          { baslik:'Yapıyı kontrol et', aciklama:'Atanmamış hesap kalmadığını doğrula.' },
        ],
        alanlar:{
          zorunlu:['Yapı kodu','Hiyerarşi düğümleri','Hesap aralıkları','Kâr/zarar hesabı'],
          opsiyonel:['Alternatif diller','Karşılaştırma sütunları'] },
        hatalar:[
          { mesaj:'Account ... is assigned twice', sebep:'Aynı hesap iki düğüme atanmış.', cozum:'Aralıkların çakışmasını gider; hesap **tek düğümde** olmalıdır.' },
        ],
        ipucu:'**Hesap aralığı kullan, tek tek hesap atama.** ' +
              '`770000–779999` şeklinde atarsan, o aralıkta açılan **her yeni hesap** ' +
              'otomatik kapsanır ve "atanmamış hesap" sorunu doğmaz.\n\n' +
              'Tek tek atama, her yeni hesapta {{OB58}}’i güncellemeyi gerektirir — ' +
              've unutulur.',
        ilgili:['F.01','FS00'] },

      { kod:'FAGLL03', ad:'Defter bazlı kalem dökümü',
        amac:'{{FBL3N}}’in defter, kâr merkezi ve segment filtreli hâli.',
        neZaman:'Segment analizinde; {{paralel-defter}} varsa; belge bölme sonucunu görmek için.',
        adimlar:[
          { baslik:'Hesap ve şirket kodunu gir' },
          { baslik:'**Defteri seç**', aciklama:'Boş bırakılırsa lider defter gelir.' },
          { baslik:'Boyut filtresi uygula', aciklama:'Kâr merkezi, segment, bölüm.' },
          { baslik:'Düzeni kur ve kaydet' },
        ],
        ipucu:'**{{FBL3N}} ile farkı kritiktir:** {{FBL3N}} {{BSEG}}’den (giriş görünümü), ' +
              '{{FAGLL03}} genel defter görünümünden okur.\n\n' +
              '{{belge-bolme}} etkinse ikisi **farklı satır sayısı** gösterir — ' +
              'bu bir hata değil, iki farklı görünümdür. ' +
              'Segment analizinde daima {{FAGLL03}} kullanılır.',
        ilgili:['FBL3N','FAGLB03','new-gl'] },

      { kod:'GR55', ad:'Report Painter rapor grubu çalıştır',
        amac:'Programlama olmadan tasarlanmış özel mali raporları çalıştırır.',
        neZaman:'Standart rapor formatı yetmediğinde; özel yönetim raporlarında.',
        adimlar:[
          { baslik:'Rapor grubunu gir' },
          { baslik:'Seçim parametrelerini doldur', aciklama:'Şirket kodu, dönem, versiyon.' },
          { baslik:'Çalıştır ve gerekirse dışa aktar' },
        ],
        ipucu:'Report Painter’ın değeri **geliştirici gerektirmemesidir**: ' +
              'satır ve sütun tanımlayarak rapor kurulur.\n\n' +
              'Öğrenme eğrisi diktir ama bir kez öğrenildiğinde ' +
              'yönetim raporu ihtiyaçlarının çoğu ABAP yazmadan karşılanır.\n\n' +
              'S/4HANA’da yerini büyük ölçüde {{cds-view}} tabanlı Fiori analitiği alıyor.',
        ilgili:['FGI0','F.01'] },

      { kod:'SQVI', ad:'Hızlı sorgu (QuickViewer)',
        amac:'Tabloları birleştirip liste raporu üretir; programlama gerektirmez.',
        neZaman:'Tek seferlik analiz; standart raporun kapsamadığı alan birleşimi.',
        adimlar:[
          { baslik:'Sorgu adı ver ve veri kaynağını seç', aciklama:'Tablo, tablo birleşimi veya mantıksal veritabanı.' },
          { baslik:'Alanları seç ve seçim kriterlerini belirle' },
          { baslik:'Çalıştır' },
        ],
        ipucu:'**{{SQVI}} kişiye özeldir** — başkasıyla paylaşılamaz. ' +
              'Yaygın kullanılacaksa SAP Query’ye (SQ01) taşınmalıdır.\n\n' +
              'Ayrıca büyük tablolarda dikkatli kullanılmalıdır: ' +
              'yanlış birleştirme sistemi yorabilir.',
        ilgili:['SE16N','GR55'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Raporlama tabloları **okur, yazmaz**. Kritik olan hangi raporun ' +
      'hangi tablodan beslendiğini bilmektir — çünkü ' +
      '"iki rapor neden farklı gösteriyor?" sorusunun cevabı buradadır.',

    liste:[
      { ad:'ACDOCA', baslik:'Evrensel kayıt defteri — S/4HANA raporlamasının tek kaynağı',
        tutar:'Tüm FI/CO kalemleri; hesap, maliyet yeri, kâr merkezi, segment, defter aynı satırda.',
        olusturan:'Her FI/CO belgesi',
        guncelleyen:'Belge kaydı',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{FAGLL03}}, {{FAGLB03}} ve Fiori raporları buradan okur.',
        s4:'**Toplam tablosu yoktur** — toplamlar okuma anında hesaplanır. ' +
           'Toplam ile kalem arasında tutarsızlık **imkânsızdır**.',
        alanlar:[
          { ad:'RACCT', aciklama:'Hesap — raporlamanın ana kırılımı' },
          { ad:'RLDNR', aciklama:'Defter — rapor filtresinde **boş bırakılırsa lider defter**' },
          { ad:'PRCTR / SEGMENT', aciklama:'Segment raporlamasının boyutları' },
          { ad:'HSL / WSL', aciklama:'Yerel ve işlem para birimi tutarları' },
        ] },

      { ad:'GLT0', baslik:'Klasik G/L toplam tablosu (ECC)',
        tutar:'Hesap × dönem bazında birikmiş borç/alacak toplamları.',
        olusturan:'Belge kaydı (paralel güncelleme)',
        anahtar:'BUKRS + RACCT + RYEAR',
        iliskiler:'{{FS10N}} klasik olarak buradan okurdu.',
        s4:'**Kaldırıldı.** Toplamlar {{ACDOCA}}’dan anlık hesaplanır. ' +
           '*"Toplam tablosu ile kalem tablosu tutmuyor"* sorunu **ortadan kalktı**.',
        alanlar:[
          { ad:'RACCT', aciklama:'Hesap' },
          { ad:'HSL01…HSL16', aciklama:'Dönem bazında toplamlar (16 dönem)' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri — giriş görünümü',
        tutar:'Kullanıcının girdiği hâliyle satırlar.',
        olusturan:'Belge kaydı',
        iliskiler:'{{FBL3N}} buradan okur.',
        s4:'{{uyumluluk-view}} — {{ACDOCA}}’dan türetilir.',
        alanlar:[
          { ad:'HKONT', aciklama:'G/L hesabı' },
          { ad:'XOPVW', aciklama:'Açık kalem yönetimi işareti' },
        ] },

      { ad:'SKB1', baslik:'G/L hesabı — şirket kodu verisi',
        tutar:'**Kalem yönetimi** ve açık kalem yönetimi işaretleri; para birimi.',
        olusturan:'{{FS00}}',
        iliskiler:'{{FBL3N}}’in çalışıp çalışmayacağını **bu tablo belirler**.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'XKRES', aciklama:'**Kalem yönetimi** — kapalıysa {{FBL3N}} boş döner ve **geriye dönük açılamaz**' },
          { ad:'XOPVW', aciklama:'{{acik-kalem-yonetimi}} — kapatma yapılabilmesi için gerekli' },
          { ad:'MITKZ', aciklama:'Mutabakat hesabı tipi — doluysa doğrudan kayıt kabul etmez' },
        ] },

      { ad:'CDHDR', baslik:'Değişiklik belgesi başlığı',
        tutar:'{{degisiklik-belgesi}} — kim, ne zaman değiştirdi.',
        olusturan:'Ana veri ve belge değişiklikleri',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'OBJECTCLAS', aciklama:'Nesne sınıfı (KRED satıcı, DEBI müşteri…)' },
          { ad:'USERNAME', aciklama:'Değiştiren kullanıcı' },
          { ad:'UDATE / UTIME', aciklama:'Tarih ve saat' },
        ] },

      { ad:'CDPOS', baslik:'Değişiklik belgesi kalemleri',
        tutar:'Hangi alan, **eski değer → yeni değer**.',
        olusturan:'Değişiklik işlemi',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'FNAME', aciklama:'Değişen alan adı' },
          { ad:'VALUE_OLD / VALUE_NEW', aciklama:'**Eski ve yeni değer** — denetimin aradığı bilgi' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Hangi rapor hangi tablodan okur?',
      varliklar:[
        { ad:'ACDOCA', rol:'S/4HANA', hub:true, aciklama:'**Tek kaynak**',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'PRCTR' }] },
        { ad:'BSEG', rol:'Giriş görünümü', aciklama:'{{FBL3N}} buradan',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'GLT0', rol:'ECC toplam', aciklama:'Klasik bakiye — S/4’te kalktı',
          alanlar:[{ ad:'RACCT', tip:'pk' }, { ad:'HSL01' }] },
        { ad:'SKB1', rol:'Ana veri', aciklama:'**Kalem yönetimi işareti**',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }, { ad:'XKRES' }] },
        { ad:'BKPF', rol:'Belge', aciklama:'Belge başlığı',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BUDAT' }, { ad:'USNAM' }] },
        { ad:'CDHDR', rol:'İzleme', aciklama:'Değişiklik izi',
          alanlar:[{ ad:'OBJECTID', tip:'fk' }, { ad:'USERNAME' }] },
        { ad:'CDPOS', rol:'İzleme', aciklama:'Eski → yeni değer',
          alanlar:[{ ad:'FNAME' }, { ad:'VALUE_OLD' }, { ad:'VALUE_NEW' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'**Fiori + FAGLL03**' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'**FBL3N**' },
        { from:'SKB1', to:'BSEG', alanlar:'SAKNR → HKONT', not:'kalem yönetimi şartı' },
        { from:'ACDOCA', to:'GLT0', alanlar:'RACCT', not:'ECC karşılığı' },
        { from:'CDHDR', to:'CDPOS', alanlar:'CHANGENR', not:'başlık → değişiklik' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Raporlamada ekran becerisi, **düzen (layout) yönetiminde** yoğunlaşır. ' +
      'Aynı rapor, düzenine göre işe yarar veya yaramaz hâle gelir.',

    ekranlar:[
      { ad:'{{FBL3N}} — seçim ekranı',
        aciklama:'Hangi verinin geleceğini belirler.',
        alanlar:[
          { ad:'G/L hesabı', zorunlu:true, aciklama:'Tek hesap, aralık veya hesap grubu.' },
          { ad:'Şirket kodu', zorunlu:true },
          { ad:'**Kalem türü**', zorunlu:true, aciklama:'Açık · kapalı · **tümü**. ' +
                   'G/L hesaplarında genelde "tümü"; iş ortağında "açık".' },
          { ad:'Tarih aralığı', zorunlu:false, aciklama:'Geniş aralık raporu yavaşlatır.' },
          { ad:'Düzen', zorunlu:false, aciklama:'Kayıtlı {{alv-duzeni}} seçilir — ' +
                   'boş bırakılırsa varsayılan gelir.' },
        ],
        ipucu:'**Kalem türü seçimi sık yanılgı yaratır.** ' +
              'G/L hesabında "açık kalem" seçilirse ve hesapta ' +
              '{{acik-kalem-yonetimi}} yoksa rapor **boş döner** — ' +
              'hesapta kalem olmasına rağmen.\n\n' +
              'Kural: G/L gider/gelir hesaplarında **"tümü"**, ' +
              'satıcı/müşteri ve kapatma yapılan hesaplarda **"açık"**.' },

      { ad:'{{FBL3N}} — sonuç listesi ve düzen yönetimi',
        aciklama:'Raporun asıl değerinin ortaya çıktığı yer.',
        alanlar:[
          { ad:'Sütun seçimi', zorunlu:false, aciklama:'Maliyet yeri, vergi kodu, metin, ' +
                   'kullanıcı, kâr merkezi — **varsayılanda yoktur, eklenir**.' },
          { ad:'Alt toplam', zorunlu:false, aciklama:'Bir sütuna göre gruplayıp toplam alır.' },
          { ad:'Süzme', zorunlu:false, aciklama:'Sonuç üzerinde ek filtre.' },
          { ad:'**Düzeni kaydet**', zorunlu:false, aciklama:'Kişisel veya **genel** (`/` ile başlar).' },
          { ad:'Belgeye çift tık', zorunlu:false, aciklama:'{{FB03}} açılır.' },
        ],
        ipucu:'**Genel düzen (`/` ile başlayan) ekip verimliliğini değiştirir.** ' +
              'Bir kez kurulup paylaşıldığında herkes aynı sütunlarla çalışır ve ' +
              'her kullanıcının ayrı ayrı sütun eklemesi gerekmez.\n\n' +
              'Aylık rutin analizler için **seçim varyantı + düzen** birlikte kaydedilirse ' +
              'rapor tek tuşa iner.' },

      { ad:'{{F.01}} — mali tablo ekranı',
        aciklama:'Yasal tabloların üretildiği ekran.',
        alanlar:[
          { ad:'Mali tablo yapısı', zorunlu:true, aciklama:'{{OB58}} ile tanımlanan hiyerarşi.' },
          { ad:'Raporlama dönemi', zorunlu:true },
          { ad:'Karşılaştırma dönemi', zorunlu:false, aciklama:'Genelde önceki yıl aynı dönem.' },
          { ad:'Defter', zorunlu:false, aciklama:'{{paralel-defter}} varsa hangi standarda göre.' },
          { ad:'**"Atanmamış hesaplar" satırı**', zorunlu:false, aciklama:'**Sıfır olmalıdır.**' },
        ],
        ipucu:'Rapor çıktığında ilk bakılacak yer **en alttaki "atanmamış hesaplar"** satırıdır. ' +
              'Sıfırdan farklıysa mizan doğru olsa bile sunum yanlıştır ve ' +
              'yönetim raporu yanlış okunur.' },
    ],

    zorunlu:['Hesap / şirket kodu','Kalem türü','Mali tablo yapısı (F.01 için)'],
    opsiyonel:['Tarih aralığı','Düzen','Defter','Boyut filtreleri'],

    hatalar:[
      { mesaj:'{{FBL3N}} boş dönüyor ama hesapta bakiye var', sebep:'Hesapta **kalem yönetimi kapalı** ({{SKB1}} `XKRES`).', cozum:'{{FS00}}’da aç. **Geriye dönük çalışmaz** — geçmiş kalemler kalıcı olarak görünmez.' },
      { mesaj:'"Açık kalem" seçtim, liste boş', sebep:'Hesapta {{acik-kalem-yonetimi}} yok.', cozum:'Kalem türünü **"tümü"** yap. Gider/gelir hesaplarında açık kalem yönetimi olmaz.' },
      { mesaj:'{{FBL3N}} ile {{FAGLL03}} farklı satır sayısı gösteriyor', sebep:'Biri giriş görünümünü, diğeri genel defter görünümünü okur ({{belge-bolme}}).', cozum:'**Hata değildir.** Segment analizinde {{FAGLL03}} kullanılır.' },
      { mesaj:'{{F.01}}’de "atanmamış hesaplar" dolu', sebep:'Yeni hesap {{OB58}} yapısına eklenmemiş.', cozum:'{{OB58}}’de doğru düğüme ata. **Aralık kullanmak** bu sorunu kalıcı çözer.' },
      { mesaj:'Rapor çok yavaş', sebep:'Geniş tarih aralığı veya çok hareketli hesap.', cozum:'Aralığı daralt; S/4HANA’da Fiori uygulaması veya {{FAGLL03}} tercih edilir.' },
      { mesaj:'Aradığım sütun yok', sebep:'Varsayılan düzende değil.', cozum:'Düzen değiştir → sütun ekle → **kaydet**. Genel düzen olarak paylaş.' },
    ],

    ipuclari:[
      '**Düzeni bir kez kur, kaydet, tekrar kullan.** Aylık analizlerin süresi ' +
      'dakikalardan saniyelere iner.',
      'Ekip için **genel düzen** (`/` ile başlayan) tanımla; herkes aynı sütunlarla çalışsın.',
      '"{{FBL3N}} boş" şikâyetinde ilk bak: {{SKB1}} **kalem yönetimi** açık mı?',
      'Yeni hesap açarken **{{OB58}} ataması** kontrol listesine konsun; ' +
      'aralık kullanılırsa sorun kalıcı çözülür.',
      '{{F.01}}’de her seferinde **"atanmamış hesaplar"** satırını kontrol et — ' +
      'sıfır olmalıdır.',
      '{{mutabakat-hesabi}} dökümü için {{FBL3N}} değil **{{FBL1N}}/{{FBL5N}}** kullan.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ACDOCA', ne:'**Okunur** — S/4HANA raporlamasının tek kaynağı' },
      { tablo:'BSEG', ne:'Okunur — {{FBL3N}} giriş görünümü' },
      { tablo:'GLT0', ne:'ECC toplam tablosu; S/4’te kaldırıldı' },
      { tablo:'SKB1', ne:'Kalem yönetimi işareti — raporun çalışıp çalışmayacağını belirler' },
      { tablo:'CDHDR', ne:'Değişiklik izi başlığı' },
      { tablo:'CDPOS', ne:'Değişiklik izi — eski/yeni değer' },
    ],

    commit:
      'Raporlama **salt okuma** işlemidir; commit üretmez.\n\n' +
      'Ama bir istisna vardır: **düzen ve varyant kaydetmek** yazma işlemidir. ' +
      'Genel düzen kaydedildiğinde tüm kullanıcıları etkiler ve ' +
      'bazı kurulumlarda **taşıma isteği** gerektirir.\n\n' +
      'Performans açısından kritik nokta: geniş tarih aralıklı raporlar ' +
      'büyük veri okur ve sistemi yorabilir. ' +
      'ECC’de bu ciddi bir sorundu; S/4HANA’da HANA sayesinde büyük ölçüde hafifledi.',

    belgeNo:
      'Raporlama belge numarası üretmez. ' +
      'Ancak raporun **belgeye inebilmesi** ({{FB03}}) FI teşhisinin temelidir: ' +
      'kalem → belge → kullanıcı → değişiklik izi zinciri buradan başlar.',

    postingLogic:
      'Raporun veri kaynağını belirleyen mantık:\n\n' +
      '**1.** Rapor türü seçilir (bakiye / döküm / mali tablo).\n' +
      '**2.** Kaynak tablo belirlenir: {{FBL3N}} → {{BSEG}}, ' +
      '{{FAGLL03}} → {{ACDOCA}}, {{FS10N}} → toplamlar.\n' +
      '**3.** Hesabın **kalem yönetimi** kontrol edilir; kapalıysa döküm boş döner.\n' +
      '**4.** Seçim kriterleri uygulanır.\n' +
      '**5.** {{alv-duzeni}} sütunları belirler.\n' +
      '**6.** Sonuç listelenir; çift tıklama {{FB03}}’e bağlanır.\n\n' +
      '3. adım, *"rapor neden boş?"* sorusunun en sık cevabıdır.',

    belgeTuru:
      'Belge türü raporlamada **güçlü bir filtredir** ve teşhiste sık kullanılır.\n\n' +
      'Örnek: vergi hesabında **SA** (G/L kaydı) türündeki satırları süzmek, ' +
      'elle atılmış kayıtları anında bulur (bkz. {{konu:taxes}}). ' +
      'Aynı şekilde {{konu:cost-center}}’da yanlış atamalar belge türüyle daraltılır.',

    numberRange:
      'Raporlama numara aralığı kullanmaz. ' +
      'Report Painter rapor grupları ve varyantlar kendi adlandırma alanlarında saklanır.',

    accountDetermination:
      'Raporlamanın hesap belirlemesi yoktur ama **{{mali-tablo-yapisi}}** ' +
      'benzer bir işlev görür: hangi hesabın hangi rapor satırında görüneceğini belirler.\n\n' +
      'Fark şudur: hesap belirleme **kayıt anında** çalışır ve veriyi değiştirir; ' +
      'mali tablo yapısı **rapor anında** çalışır ve yalnızca sunumu değiştirir. ' +
      'Yapı değişirse geçmiş raporlar da yeni yapıya göre çıkar — ' +
      'bu bazen istenir, bazen karışıklık yaratır.',

    tur:
      '**Özelleştirme:** {{mali-tablo-yapisi}} ({{OB58}}), Report Painter tanımları, ' +
      'genel düzenler ve varyantlar.\n\n' +
      '**Ana veri:** hesabın kalem yönetimi işareti ({{SKB1}}) — ' +
      'raporlamayı doğrudan etkiler.\n\n' +
      '**Hareket verisi:** raporlanan kalemlerin kendisi.',

    transport:
      'Mali tablo yapısı ve Report Painter raporları taşınır. ' +
      '**Genel düzenler** kurulumdan kuruluma değişir — bazılarında taşınır, ' +
      'bazılarında her sistemde ayrı kaydedilir.\n\n' +
      '**Kişisel düzenler taşınmaz** ve taşınmamalıdır.\n\n' +
      '**Geçiş kontrolü:** canlıda {{F.01}} çalıştırıp ' +
      '"atanmamış hesaplar" satırının sıfır olduğunu doğrula — ' +
      'hesap planı taşındı ama yapı eksik kalmış olabilir.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe Muhasebesi → İş İşlemleri → Kapanış → Raporlama → Mali Tablo Yapılarını Tanımla', not:'{{OB58}}' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe Muhasebesi → Ana Veri → G/L Hesapları → Hesap Yönetimi', not:'Kalem yönetimi işareti ({{SKB1}})' },
      { yol:'Bilgi sistemleri → Muhasebe → Finansal Muhasebe → Ana Muhasebe', not:'Standart rapor ağacı' },
    ],

    ekstra:[
      { ic:'🔍', baslik:'"Rapor boş dönüyor" — teşhis sırası', metin:
        'FI’da en sık duyulan raporlama şikâyetidir ve **beş olası sebebi** vardır. ' +
        'Sırayla kontrol edilir:\n\n' +
        '**1. Kalem yönetimi kapalı** ({{SKB1}} `XKRES`)\n' +
        'En sık sebep. Hesap kalemleri **saklamıyordur**; yalnızca toplam vardır. ' +
        'Ayar açılabilir ama **geçmişe etki etmez**.\n\n' +
        '**2. Yanlış kalem türü**\n' +
        '"Açık kalem" seçilmiş ama hesapta {{acik-kalem-yonetimi}} yok. ' +
        'Gider/gelir hesaplarında **"tümü"** kullanılmalıdır.\n\n' +
        '**3. Tarih aralığı**\n' +
        'Kayıt tarihi mi belge tarihi mi filtreleniyor? İkisi farklı olabilir.\n\n' +
        '**4. Yanlış şirket kodu veya defter**\n' +
        '{{FAGLL03}}’te defter boş bırakılırsa lider defter gelir; ' +
        'IFRS kalemleri görünmez.\n\n' +
        '**5. Yetki**\n' +
        'Kullanıcının o hesap/şirket kodu için yetkisi yoksa liste boş döner — ' +
        'bazen **hata mesajı bile çıkmadan**. {{SU53}} ile kontrol edilir.\n\n' +
        '**Teşhis ipucu:** aynı raporu **başka bir hesapta** çalıştır. ' +
        'Orada veri geliyorsa sorun hesaba özgüdür (1 veya 2); ' +
        'orada da boşsa sorun seçim kriterlerinde veya yetkidedir (3, 4, 5).' },

      { ic:'📑', baslik:'Mali tablo yapısı: "atanmamış hesaplar" neden sıfır olmalı?', metin:
        '{{mali-tablo-yapisi}}, hesapları bilanço ve gelir tablosu satırlarına eşler. ' +
        'Eşlenmemiş bir hesap kaybolmaz — **"atanmamış hesaplar"** adlı ' +
        'bir toplama satırında görünür.\n\n' +
        '**Neden tehlikeli:** mizan doğrudur, toplam doğrudur, ' +
        'bilanço aktif-pasif tutar. Hiçbir hata mesajı çıkmaz.\n\n' +
        'Ama **sunum yanlıştır**: 1,2 milyon TL pazarlama gideri, ' +
        'gelir tablosunda "Pazarlama giderleri" satırında değil ' +
        'anlamsız bir toplamda durur. Yönetim raporu yanlış okunur.\n\n' +
        '**Nasıl oluşur:** yeni bir hesap açılır, {{OB58}} güncellenmez. ' +
        'Hesap açma ile mali tablo yapısı bakımı **farklı kişilerde** olduğu için ' +
        'bağlantı kopar.\n\n' +
        '**Kalıcı çözüm: hesap aralığı kullanmak.**\n\n' +
        '`770000–779999` şeklinde atanırsa, o aralıkta açılan **her yeni hesap** ' +
        'otomatik kapsanır. Tek tek atama yapılırsa her yeni hesapta ' +
        '{{OB58}} güncellenmelidir — ve unutulur.\n\n' +
        '**Kontrol:** {{F.01}} çalıştırıldığında en alttaki bu satır ' +
        'her zaman **sıfır** olmalıdır. Aylık kapanış listesine konmalıdır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Kalem yönetimi geriye dönük açılamaz', metin:
        '{{SKB1}} `XKRES` işareti kapalıyken yapılan kayıtların **kalemleri saklanmaz**. ' +
        'Yalnızca toplamlar tutulur.\n\n' +
        'İşaret sonradan açılabilir — ama **yalnızca sonraki kayıtlar** için çalışır. ' +
        'Geçmiş dönemler **kalıcı olarak** ayrıntısız kalır ve ' +
        'o dönemler için {{FBL3N}} hiçbir zaman veri göstermez.\n\n' +
        'Bu, denetimde ciddi bir sorun yaratabilir: ' +
        '*"2026 yılındaki bu 3 milyon TL neyden oluşuyor?"* sorusuna ' +
        'sistem üzerinden cevap verilemez.\n\n' +
        '**Kural:** ayrıntı gerekebilecek her hesapta kalem yönetimi **açık** olmalıdır. ' +
        'Kapalı tutmanın tek gerekçesi performanstı; ' +
        'S/4HANA’da o gerekçe de ortadan kalktı.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Raporlama, S/4HANA’da **en çok kazanan** alanlardan biri: ' +
      'toplam tabloları kalktı, tutarsızlık imkânsızlaştı, ' +
      '{{cds-view}} tabanlı anlık analitik geldi. ' +
      'Klasik raporlar **kaldırılmadı** ve hâlâ ilk başvurulan araçlardır.',

    eccFarklari:[
      { konu:'Veri kaynağı', ecc:'{{BSEG}} + {{GLT0}} + CO tabloları', s4:'**{{ACDOCA}}** — tek kaynak' },
      { konu:'Toplam tablosu', ecc:'{{GLT0}}, FAGLFLEXT', s4:'**Yok** — anlık hesaplanır' },
      { konu:'Toplam–kalem tutarsızlığı', ecc:'Olabilir; mutabakat gerekirdi', s4:'**Yapısal olarak imkânsız**' },
      { konu:'Analitik', ecc:'Report Painter, BW’ye aktarım', s4:'**Embedded Analytics** — {{cds-view}}' },
      { konu:'Arayüz', ecc:'SAP GUI liste', s4:'Fiori + GUI **birlikte**' },
      { konu:'Performans', ecc:'Geniş aralık raporları yavaş', s4:'HANA ile belirgin hızlanma' },
      { konu:'Klasik raporlar', ecc:'{{FBL3N}}, {{F.01}}, {{FS10N}}', s4:'**Kaldırılmadı**' },
    ],

    universalJournal:
      'Raporlama açısından {{ACDOCA}}’nın iki somut faydası vardır:\n\n' +
      '**1. Tutarsızlık ortadan kalktı.** ECC’de kalem tablosu ile toplam tablosu ' +
      'ayrıydı ve *"toplam tutmuyor"* klasik bir sorundu. ' +
      'S/4HANA’da toplam **yoktur** — okuma anında hesaplanır.\n\n' +
      '**2. Boyutlar tek satırda.** *"Hangi kâr merkezinde hangi satıcıdan ne kadar alındı?"* ' +
      'sorusu ECC’de {{BSEG}} + COEP birleştirmesi gerektirirdi; ' +
      'S/4HANA’da **tek sorgu**.\n\n' +
      'Sonuç: rapor çeşitliliği arttı ve özel geliştirme ihtiyacı azaldı.',

    kalkanTcodes:[
      { eski:'{{GLT0}} tabanlı bakiye raporları', yeni:'{{FAGLB03}} / Fiori', not:'Toplam tablosu kalktı' },
      { eski:'—', yeni:'—', not:'{{FBL3N}}, {{FAGLL03}}, {{F.01}}, {{OB58}}, {{GR55}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Trial Balance', aciklama:'Mizan — şirket kodu, kâr merkezi, segment ve defter bazlı.' },
      { ad:'Display Line Items in General Ledger', aciklama:'{{FAGLL03}} yerine; filtreler görsel.' },
      { ad:'Display G/L Account Balances', aciklama:'{{FAGLB03}} yerine.' },
      { ad:'Financial Statement', aciklama:'{{F.01}} yerine; karşılaştırmalı ve grafikli.' },
      { ad:'Manage Journal Entries', aciklama:'Belge arama ve inceleme.' },
      { ad:'Custom Analytical Queries', aciklama:'{{cds-view}} üzerine **kullanıcının kendi** raporunu kurması.' },
    ],

    compatibilityViews:[
      '{{BSEG}}, {{GLT0}} — {{ACDOCA}}’dan türetilen görünümler; klasik raporlar bunlarla çalışır.',
      '**Performans notu:** uyumluluk görünümü üzerinden çalışan raporlar, ' +
      '{{ACDOCA}}’yı doğrudan okuyanlardan yavaştır.',
      'Yeni geliştirmeler **{{ACDOCA}} veya CDS view** kullanmalıdır.',
    ],

    performans:
      'En büyük kazanç geniş aralıklı dökümlerde: ECC’de bir yıllık {{FBL3N}} ' +
      'dakikalar sürebiliyordu; HANA ile saniyelere indi.\n\n' +
      'İkinci kazanç **toplam tablosu bakımının kalkması**: ' +
      'ECC’de her kayıt hem kalem hem toplam tablosuna yazıyordu ' +
      '(kilit çakışması kaynağı). S/4HANA’da tek yazma vardır.\n\n' +
      'Üçüncüsü **Embedded Analytics**: raporlama için ayrı bir BW sistemine ' +
      'veri aktarmak çoğu senaryoda gereksizleşti.',

    bestPractices:[
      'Klasik raporları **kullanmaya devam et** — kaldırılmadılar ve teşhiste hâlâ en pratik araçlar.',
      'Yeni raporlarda önce **standart {{cds-view}} var mı** diye bak; ABAP yazmadan önce.',
      'Uyumluluk görünümü üzerinden çalışan **özel raporları gözden geçir**; ' +
      '{{ACDOCA}}’ya taşınırsa hızlanır.',
      'Toplam tablosu okuyan eski özel programları **kaldır** — artık gereksizler.',
      'Geçişte {{F.01}} çalıştırıp **"atanmamış hesaplar"** satırını doğrula; ' +
      'hesap planı taşındı ama yapı eksik kalmış olabilir.',
      'Fiori "Custom Analytical Queries" ile kullanıcıların **kendi raporlarını** ' +
      'kurmasını değerlendir; danışman yükü azalır.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Gelir tablosunda pazarlama gideri eksik: mizan doğru, sunum yanlış',
    hikaye:
      '**Ege Tekstil A.Ş.** yönetim kurulu toplantısında pazarlama müdürü itiraz ediyor: ' +
      '*"Gelir tablosunda pazarlama giderimiz 2,1 milyon görünüyor ama biz 3,3 milyon harcadık."*\n\n' +
      'Mali işler kontrol ediyor: **mizan doğru**, toplam gider doğru, ' +
      'bilanço aktif-pasif tutuyor. Hiçbir hata mesajı yok.\n\n' +
      'Ama gelir tablosunda 1,2 milyon TL **eksik** görünüyor.\n\n' +
      'Bu senaryo, mizanın doğru olup sunumun yanlış olabileceği bir hata sınıfını ' +
      've raporlama teşhisinin nasıl yapıldığını gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · dönem 12/2027' },
      { k:'Pazarlama gideri (gerçek)', v:'3.300.000 TL' },
      { k:'Gelir tablosunda görünen', v:'**2.100.000 TL**' },
      { k:'Fark', v:'**1.200.000 TL**' },
      { k:'Mizan durumu', v:'**Doğru** — toplam gider tutuyor' },
    ],

    adimlar:[
      { baslik:'Önce mizan doğrulanıyor', tcode:'FS10N',
        aciklama:'Sorunun kayıtta mı sunumda mı olduğu ayrıştırılıyor.',
        girdi:[
          { alan:'770100 Reklam gideri', deger:'1.400.000 TL' },
          { alan:'770200 Fuar ve tanıtım', deger:'700.000 TL' },
          { alan:'**770300 Dijital pazarlama**', deger:'**1.200.000 TL**' },
          { alan:'Toplam', deger:'**3.300.000 TL** — mizan doğru ✓' },
        ],
        not:'**Kayıt tarafı tamamen doğru.** Üç hesapta toplam 3,3 milyon TL var.\n\n' +
             'Demek ki sorun **kayıtta değil, sunumda**. ' +
             'Bu ayrım teşhisi hemen daraltıyor: ' +
             'mizan doğru + rapor yanlış = **{{mali-tablo-yapisi}}** sorunu.' },

      { baslik:'Gelir tablosunun tamamı inceleniyor', tcode:'F.01',
        aciklama:'Eksik tutarın nereye gittiği aranıyor.',
        girdi:[
          { alan:'Pazarlama giderleri satırı', deger:'2.100.000 TL' },
          { alan:'Diğer satırlar', deger:'Beklendiği gibi' },
          { alan:'**En alt: "Atanmamış hesaplar"**', deger:'**1.200.000 TL** ' },
          { alan:'Toplam gider', deger:'Doğru — tutar kaybolmamış, **yanlış yerde**' },
        ],
        not:'**Bulundu.** Eksik 1,2 milyon TL kaybolmamış — ' +
             '"atanmamış hesaplar" satırında toplanmış.\n\n' +
             'Bu satır, {{mali-tablo-yapisi}}’na eklenmemiş hesapların ' +
             'toplandığı yerdir. **Her zaman sıfır olmalıdır.**\n\n' +
             'Toplam gider doğru olduğu için bilanço ve kâr rakamı da doğru — ' +
             'yalnızca **grup içi dağılım** yanlış.' },

      { baslik:'Kök sebep — yeni hesap yapıya eklenmemiş', tcode:'OB58',
        aciklama:'Mali tablo yapısında hesap atamaları kontrol ediliyor.',
        girdi:[
          { alan:'Pazarlama giderleri düğümü', deger:'Atanmış: **770100** ve **770200**' },
          { alan:'770300 Dijital pazarlama', deger:'**Hiçbir düğüme atanmamış**' },
          { alan:'Hesap açılış tarihi', deger:'Mart 2027' },
          { alan:'Atama yöntemi', deger:'**Tek tek hesap** — aralık değil' },
        ],
        not:'**Kök sebep bulundu.** 770300 hesabı Mart’ta açılmış ama ' +
             '{{OB58}} yapısına eklenmemiş.\n\n' +
             'Asıl sorun **atama yöntemidir**: hesaplar tek tek atanmış. ' +
             'Bu, her yeni hesapta {{OB58}}’in güncellenmesini gerektirir — ' +
             've hesap açan kişi ile mali tablo yapısını yöneten kişi ' +
             'farklı olduğu için bağlantı kopmuş.\n\n' +
             'Dokuz ay boyunca yönetim raporu pazarlama giderini ' +
             '**eksik göstermiş** ve kimse fark etmemiş.' },

      { baslik:'Düzeltme — aralık ataması yapılıyor', tcode:'OB58',
        aciklama:'Tek hesap eklemek yerine kalıcı çözüm uygulanıyor.',
        girdi:[
          { alan:'Önceki atama', deger:'770100 · 770200 *(tek tek)*' },
          { alan:'**Yeni atama**', deger:'**770000–779999** *(aralık)*' },
          { alan:'Etki', deger:'770300 dâhil, **gelecekteki tüm 770xxx hesapları** kapsanıyor' },
          { alan:'Kontrol', deger:'Çakışan başka aralık var mı → yok ✓' },
        ],
        not:'Tek hesap eklemek sorunu **bugün** çözerdi; ' +
             'aralık ataması **kalıcı** çözüyor.\n\n' +
             'Artık 770 grubunda açılacak her yeni hesap otomatik kapsanacak ve ' +
             'aynı hata tekrarlanamayacak.\n\n' +
             'Aralık atarken **çakışma kontrolü** yapılmalı: ' +
             'aynı hesap iki düğüme atanırsa *"assigned twice"* hatası alınır.' },

      { baslik:'Rapor yeniden alınıyor', tcode:'F.01',
        aciklama:'Düzeltmenin etkisi doğrulanıyor.',
        girdi:[
          { alan:'Pazarlama giderleri', deger:'**3.300.000 TL** ✓' },
          { alan:'"Atanmamış hesaplar"', deger:'**0 TL** ✓' },
          { alan:'Toplam gider', deger:'Değişmedi — zaten doğruydu' },
          { alan:'Geçmiş dönemler', deger:'**Onlar da düzeldi**' },
        ],
        not:'**Önemli bir ayrıntı:** {{mali-tablo-yapisi}} rapor anında çalışır, ' +
             'kayıt anında değil.\n\n' +
             'Bu yüzden düzeltme **geçmişe de etki eder**: Mart–Kasım arası ' +
             'raporlar da artık doğru çıkıyor.\n\n' +
             'Hesap belirlemeden farkı budur — hesap belirleme veriyi değiştirir ' +
             've geçmişe etki etmez; mali tablo yapısı yalnızca sunumu değiştirir ' +
             've **her zaman güncel yapıyla** raporlanır.' },

      { baslik:'İkinci bulgu — kalem yönetimi kapalı hesap', tcode:'FBL3N',
        aciklama:'Kontrol sırasında başka bir sorun ortaya çıkıyor.',
        girdi:[
          { alan:'770300 dökümü', deger:'842 kalem ✓' },
          { alan:'**649000 Diğer gelirler** dökümü', deger:'**Boş** ' },
          { alan:'649000 bakiyesi', deger:'480.000 TL — bakiye **var**' },
          { alan:'{{SKB1}} kalem yönetimi', deger:'**Kapalı**' },
        ],
        not:'İkinci sorun: 649000 hesabında bakiye var ama **döküm alınamıyor**.\n\n' +
             'Sebep: hesapta {{SKB1}} **kalem yönetimi kapalı** — ' +
             'sistem o hesap için kalemleri hiç saklamamış.\n\n' +
             '**Ayar açılabilir ama geçmişe etki etmez.** ' +
             '480.000 TL’nin neyden oluştuğu sistem üzerinden ' +
             '**hiçbir zaman** öğrenilemeyecek.\n\n' +
             'Bu, mali tablo yapısı sorunundan **daha ciddidir**: ' +
             'o düzeltilebildi, bu düzeltilemez.' },

      { baslik:'Kalıcı önlemler', tcode:'FS00',
        aciklama:'İki sorun için de sistemsel önlem alınıyor.',
        girdi:[
          { alan:'Önlem 1', deger:'{{OB58}} atamaları **aralık bazına** çevrildi (tüm gruplar)' },
          { alan:'Önlem 2', deger:'649000 kalem yönetimi **açıldı** — bundan sonrası izlenecek' },
          { alan:'Önlem 3', deger:'Hesap açma prosedürüne **kalem yönetimi + OB58 kontrolü** eklendi' },
          { alan:'Önlem 4', deger:'Aylık kapanışa **"atanmamış hesaplar = 0"** kontrolü eklendi' },
        ],
        not:'**Üçüncü önlem en değerlisi:** hesap açma prosedürüne iki kontrol eklendi. ' +
             'Yeni hesap açan kişi artık *"kalem yönetimi açık mı?"* ve ' +
             '*"mali tablo yapısında kapsanıyor mu?"* sorularını cevaplamak zorunda.\n\n' +
             'Aralık ataması sayesinde ikinci soru çoğu durumda kendiliğinden ' +
             '"evet" oluyor — ama yeni bir hesap grubu açıldığında ' +
             'kontrol yine devrede.' },
    ],

    sonuc:
      '**Mizan doğruydu, sunum yanlıştı — ve dokuz ay kimse fark etmedi.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Mizan doğru + rapor yanlış = mali tablo yapısı sorunu.** ' +
      'Bu ayrım teşhisi anında daraltır. Kayıt tarafı doğruysa ' +
      'sorun {{OB58}}’dedir. {{F.01}}’deki **"atanmamış hesaplar"** satırı ' +
      'her zaman **sıfır olmalıdır** — sıfırdan farklıysa bir hesap yanlış yerde raporlanıyordur.\n\n' +
      '**2. Hesap aralığı kullan, tek tek atama.** ' +
      '`770000–779999` şeklinde atanırsa o grupta açılan her yeni hesap ' +
      'otomatik kapsanır. Tek tek atama, her yeni hesapta {{OB58}} güncellemesi gerektirir ' +
      've hesap açan kişi ile yapıyı yöneten kişi farklı olduğu için **unutulur**.\n\n' +
      '**3. Mali tablo yapısı rapor anında çalışır — düzeltme geçmişe de etki eder.** ' +
      'Hesap belirlemeden farkı budur: hesap belirleme veriyi değiştirir ve geçmişi etkilemez; ' +
      'yapı yalnızca sunumu değiştirir ve raporlar **her zaman güncel yapıyla** çıkar. ' +
      'Bu senaryoda Mart–Kasım raporları da kendiliğinden düzeldi.\n\n' +
      '**4. Kalem yönetimi kapalıysa kayıp kalıcıdır.** ' +
      'İkinci bulgu daha ciddiydi: 649000 hesabında bakiye var ama döküm alınamıyor. ' +
      'Ayar açılabilir ama **geçmişe etki etmez** — o 480.000 TL’nin neyden oluştuğu ' +
      'sistem üzerinden hiçbir zaman öğrenilemeyecek. ' +
      '**Ayrıntı gerekebilecek her hesapta kalem yönetimi açık olmalıdır.**',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'FI raporları dört gruptur: **bakiye** · **{{dokum}}** · **mali tablo** · **özel rapor**.',
      '**"Ne kadar?"** → bakiye ({{FS10N}}) · **"Neden bu kadar?"** → döküm ({{FBL3N}}).',
      'Dökümün ayırt edici özelliği **belgeye inebilmesidir** — teşhisin temel aracı.',
      '**Kalem yönetimi kapalıysa {{FBL3N}} boş döner** ve ayar **geriye dönük çalışmaz**.',
      '{{mutabakat-hesabi}} dökümü {{FBL1N}}/{{FBL5N}} ile alınır, {{FBL3N}} ile değil.',
      '{{F.01}}’de **"atanmamış hesaplar" satırı sıfır olmalıdır**.',
      '{{OB58}}’de **aralık ataması** kullan — yeni hesaplar otomatik kapsanır.',
      '{{alv-duzeni}} bir kez kurulup **kaydedilir**; aylık analiz saniyelere iner.',
    ],

    onemliNoktalar:[
      '**"{{FBL3N}} boş dönüyor ama bakiye var. Neden?"** Hesapta **kalem yönetimi kapalıdır** ({{SKB1}} `XKRES`). Ayar açılabilir ama **geçmişe etki etmez** — o dönemlerin ayrıntısı kalıcı olarak kayıptır. Mülakatın klasik raporlama sorusudur.',
      '**"Bakiye raporu ile döküm farkı nedir?"** Bakiye *"ne kadar?"*, döküm *"neden bu kadar?"* sorusunu cevaplar. Dökümün ayırt edici özelliği **belgeye çift tıklanabilmesidir** ({{FB03}}) — FI teşhisinin temeli budur.',
      '**"Mutabakat hesabının dökümü nasıl alınır?"** {{FBL1N}} (satıcı) veya {{FBL5N}} (müşteri) ile. {{FBL3N}} teknik olarak çalışır ama iş ortağı bilgisi olmadan kullanışsız bir liste verir.',
      '**"{{F.01}}’de atanmamış hesaplar satırı ne demek?"** {{mali-tablo-yapisi}}’na eklenmemiş hesaplar orada toplanır. **Mizan doğru olsa bile sunum yanlıştır.** Her zaman sıfır olmalıdır.',
      '**"{{FBL3N}} ile {{FAGLL03}} neden farklı satır sayısı gösteriyor?"** {{FBL3N}} **giriş görünümünü** ({{BSEG}}), {{FAGLL03}} **genel defter görünümünü** okur. {{belge-bolme}} etkinse fark normaldir. Segment analizinde {{FAGLL03}} kullanılır.',
      '**"Mali tablo yapısı değişirse geçmiş raporlar ne olur?"** **Onlar da değişir** — yapı rapor anında çalışır. Hesap belirlemeden farkı budur: o veriyi değiştirir ve geçmişi etkilemez.',
      '**"S/4HANA’da raporlama ne kazandı?"** Toplam tabloları kalktı → **toplam–kalem tutarsızlığı imkânsız**. Boyutlar tek satırda → birleştirme gerekmiyor. {{cds-view}} tabanlı anlık analitik geldi. **Klasik raporlar kaldırılmadı.**',
      '**"Yeni rapor gerekiyor, ne yaparım?"** Sırayla: standart rapor + düzen → Report Painter ({{GR55}}) → S/4HANA’da standart {{cds-view}} → en son ABAP geliştirme.',
    ],

    sikHatalar:[
      { hata:'Detay sorusunu bakiye raporunda aramak.', dogru:'*"Neden bu kadar?"* sorusu {{dokum}} raporuna aittir ({{FBL3N}}); bakiye raporu yalnızca toplam verir.' },
      { hata:'Kalem yönetimini kapalı bırakmak.', dogru:'Ayrıntı gerekebilecek her hesapta açık olmalıdır. **Geriye dönük açılamaz** — kayıp kalıcıdır.' },
      { hata:'Mutabakat hesabının dökümünü {{FBL3N}} ile almak.', dogru:'{{FBL1N}}/{{FBL5N}} kullanılır; iş ortağı, vade ve ihtar bilgisi orada.' },
      { hata:'{{OB58}}’de hesapları tek tek atamak.', dogru:'**Aralık** kullanılır; yeni hesaplar otomatik kapsanır ve "atanmamış hesap" sorunu doğmaz.' },
      { hata:'{{F.01}}’de "atanmamış hesaplar" satırını kontrol etmemek.', dogru:'Her raporda kontrol edilmelidir; sıfırdan farklıysa sunum yanlıştır.' },
      { hata:'Her seferinde sütunları elle eklemek.', dogru:'{{alv-duzeni}} **kaydedilir**; ekip için genel düzen (`/`) tanımlanır.' },
      { hata:'G/L gider hesabında "açık kalem" seçmek.', dogru:'Gider/gelir hesaplarında {{acik-kalem-yonetimi}} yoktur; **"tümü"** seçilir.' },
      { hata:'{{SE16N}}’i kullanıcıya rapor aracı olarak vermek.', dogru:'Teşhis aracıdır, rapor değil; yetki kontrolü zayıftır.' },
    ],

    ipuclari:[
      '**Düzeni bir kez kur, kaydet.** Aylık analizler dakikalardan saniyelere iner; ' +
      'ekip için genel düzen (`/` ile başlayan) tanımla.',
      '"Rapor boş" teşhis sırası: kalem yönetimi → kalem türü → tarih → defter/şirket kodu → yetki.',
      'Aynı raporu **başka bir hesapta** çalıştır: veri geliyorsa sorun hesaba özgü, ' +
      'gelmiyorsa seçim kriterinde veya yetkide.',
      '{{OB58}}’de **aralık** kullan; hesap açma prosedürüne bu kontrolü ekle.',
      'Aylık kapanışa **"atanmamış hesaplar = 0"** kontrolünü koy.',
      'Belge türü filtresi güçlü bir teşhis aracıdır: vergi hesabında **SA** satırları ' +
      'elle atılmış kayıtları anında bulur.',
    ],

    quiz:[
      { soru:'{{FBL3N}} bir hesap için boş dönüyor ama {{FS10N}}’de bakiye görünüyor. Sebep?',
        secenekler:[
          'Yetki eksikliği',
          'Yanlış tarih aralığı',
          '**Hesapta kalem yönetimi kapalı ({{SKB1}})**',
          'Hesap bloklu',
        ], dogru:2,
        aciklama:'Kalem yönetimi kapalıyken sistem o hesap için **kalemleri saklamaz**; ' +
                 'yalnızca toplamlar tutulur. Bakiye görünür, ayrıntı görünmez.\n\n' +
                 '**Ayar sonradan açılabilir ama geçmişe etki etmez.** ' +
                 'Önceki dönemlerin ayrıntısı **kalıcı olarak** kayıptır — ' +
                 'denetimde ciddi sorun yaratabilir.' },

      { soru:'{{F.01}}’de "atanmamış hesaplar" satırında 1,2 milyon TL var. Ne anlama gelir?',
        secenekler:[
          'Bilanço tutmuyor',
          'Mizan hatalı',
          '**Bir hesap mali tablo yapısına eklenmemiş; mizan doğru ama sunum yanlış**',
          'Kayıp kayıt var',
        ], dogru:2,
        aciklama:'{{mali-tablo-yapisi}}’na eklenmemiş hesaplar bu satırda toplanır. ' +
                 '**Tutar kaybolmaz** — yanlış yerde raporlanır.\n\n' +
                 'Mizan doğru, toplam doğru, bilanço tutar, hata mesajı çıkmaz. ' +
                 'Ama yönetim raporu yanlış okunur.\n\n' +
                 '**Kalıcı çözüm:** {{OB58}}’de tek tek hesap yerine **aralık** atamak.' },

      { soru:'Satıcı mutabakat hesabının (320) dökümü nasıl alınır?',
        secenekler:[
          '{{FBL3N}} ile',
          '**{{FBL1N}} ile**',
          '{{FS10N}} ile',
          '{{SE16N}} ile',
        ], dogru:1,
        aciklama:'320 bir {{mutabakat-hesabi}}dır; kayıtlar satıcı üzerinden gelir. ' +
                 '{{FBL3N}} teknik olarak çalışır ama **iş ortağı bilgisi olmadan** ' +
                 'düz bir liste verir.\n\n' +
                 '{{FBL1N}} satıcı bazında döküm alır, **açık/kapalı kalem** ayrımı yapar, ' +
                 'vade ve ihtar seviyesini gösterir. Müşteride karşılığı {{FBL5N}}’dir.' },

      { soru:'Mali tablo yapısı düzeltilirse geçmiş dönem raporları ne olur?',
        secenekler:[
          'Değişmez — geçmiş kayıtlar eski yapıyla kalır',
          '**Onlar da düzelir — yapı rapor anında çalışır**',
          'Yeniden kayıt gerekir',
          'Yalnızca cari yıl düzelir',
        ], dogru:1,
        aciklama:'{{mali-tablo-yapisi}} **rapor anında** çalışır, kayıt anında değil. ' +
                 'Raporlar her zaman **güncel yapıyla** üretilir.\n\n' +
                 'Hesap belirlemeden farkı budur: hesap belirleme kayıt anında çalışır, ' +
                 'veriyi değiştirir ve **geçmişe etki etmez**. ' +
                 'Mali tablo yapısı yalnızca **sunumu** değiştirir.' },

      { soru:'{{FBL3N}} ile {{FAGLL03}} farklı satır sayısı gösteriyor. Neden?',
        secenekler:[
          'Biri bozuk',
          'Farklı tarih aralığı',
          '**{{FBL3N}} giriş görünümünü, {{FAGLL03}} genel defter görünümünü okur**',
          'Yetki farkı',
        ], dogru:2,
        aciklama:'{{FBL3N}} {{BSEG}}’den (kullanıcının girdiği satırlar), ' +
                 '{{FAGLL03}} genel defter görünümünden (bölünmüş satırlar) okur.\n\n' +
                 '{{belge-bolme}} etkinse 3 satırlık bir belge genel defterde 6 satır olabilir. ' +
                 '**Bu bir hata değil, iki farklı görünümdür.** ' +
                 'Segment analizinde daima {{FAGLL03}} kullanılır.' },

      { soru:'{{OB58}}’de hesaplar nasıl atanmalıdır ve neden?',
        secenekler:[
          'Tek tek — daha kontrollü',
          '**Aralık olarak — yeni hesaplar otomatik kapsanır**',
          'Hesap grubuna göre',
          'Atama gerekmez',
        ], dogru:1,
        aciklama:'`770000–779999` şeklinde atanırsa o grupta açılan **her yeni hesap** ' +
                 'otomatik kapsanır.\n\n' +
                 'Tek tek atama, her yeni hesapta {{OB58}}’in güncellenmesini gerektirir. ' +
                 'Hesap açan kişi ile mali tablo yapısını yöneten kişi genelde farklı olduğu için ' +
                 'bu bağlantı **kopar** ve "atanmamış hesap" sorunu doğar.' },

      { soru:'S/4HANA’da "toplam tablosu ile kalem tablosu tutmuyor" sorunu neden kalktı?',
        secenekler:[
          'Otomatik düzeltme programı geldi',
          'Mutabakat gece işine dönüştü',
          '**Toplam tablosu kaldırıldı; toplamlar {{ACDOCA}}’dan anlık hesaplanır**',
          'Kalem tablosu kaldırıldı',
        ], dogru:2,
        aciklama:'ECC’de her kayıt hem kalem ({{BSEG}}) hem toplam ({{GLT0}}) tablosuna yazılırdı; ' +
                 'iki yazma, tutarsızlık ihtimali.\n\n' +
                 'S/4HANA’da toplam tablosu **yoktur** — {{ACDOCA}} yalnızca kalemleri tutar, ' +
                 'toplamlar okuma anında hesaplanır. ' +
                 'Tutarsızlık **yapısal olarak imkânsızdır**.' },

      { soru:'G/L gider hesabında {{FBL3N}} çalıştırırken hangi kalem türü seçilmelidir?',
        secenekler:[
          'Açık kalem',
          '**Tümü**',
          'Kapalı kalem',
          'Fark etmez',
        ], dogru:1,
        aciklama:'Gider/gelir hesaplarında {{acik-kalem-yonetimi}} **yoktur** — ' +
                 'kapatma yapılmaz, kalemler açık/kapalı diye ayrılmaz.\n\n' +
                 '"Açık kalem" seçilirse rapor **boş döner**, hesapta kalem olmasına rağmen.\n\n' +
                 'Kural: G/L gider/gelir hesaplarında **"tümü"**; ' +
                 'satıcı/müşteri ve kapatma yapılan hesaplarda **"açık"**.' },
    ],

    flashcards:[
      { on:'Bakiye raporu vs kalem dökümü', arka:'**Bakiye** → *"Ne kadar?"*\nFS10N · FAGLB03 · hızlı · ayrıntı **yok**\n\n**Döküm** → *"Neden bu kadar?"*\nFBL3N · FAGLL03 · **belgeye çift tıklanır** ← teşhisin temeli\n\nÖn koşul: **kalem yönetimi açık**.' },
      { on:'FBL3N boş dönüyor — teşhis sırası', arka:'**1. Kalem yönetimi kapalı** (SKB1-XKRES) ← en sık\n2. Yanlış kalem türü ("açık" seçilmiş)\n3. Tarih aralığı\n4. Yanlış şirket kodu / defter\n5. Yetki (SU53)\n\n**İpucu:** aynı raporu başka hesapta dene.' },
      { on:'Kalem yönetimi geriye dönük açılır mı?', arka:'**HAYIR.**\n\nKapalıyken yapılan kayıtların kalemleri **hiç saklanmamıştır**.\n\nAyar açılır → **yalnızca sonraki kayıtlar** görünür.\n\nGeçmiş dönemler **kalıcı olarak** ayrıntısız kalır → denetimde ciddi sorun.' },
      { on:'"Atanmamış hesaplar" satırı ne demek?', arka:'Mali tablo yapısına (OB58) **eklenmemiş** hesaplar orada toplanır.\n\n**Her zaman sıfır olmalı.**\n\nDolu ise: mizan doğru, toplam doğru, **sunum yanlış** — hata mesajı çıkmaz.\n\nKalıcı çözüm: **aralık ataması**.' },
      { on:'OB58’de neden aralık kullanılır?', arka:'`770000–779999` → o grupta açılan **her yeni hesap otomatik kapsanır**.\n\nTek tek atama → her yeni hesapta OB58 güncellenmeli → **unutulur** (hesap açan ile yapıyı yöneten farklı kişiler).' },
      { on:'Mutabakat hesabının dökümü nasıl alınır?', arka:'**FBL1N** (satıcı) / **FBL5N** (müşteri)\n\nFBL3N teknik olarak çalışır ama **iş ortağı bilgisi vermez** → kullanışsız liste.\n\nFBL1N: açık/kapalı ayrımı + vade + ihtar seviyesi.' },
      { on:'FBL3N vs FAGLL03', arka:'**FBL3N** → BSEG · **giriş görünümü**\n**FAGLL03** → **genel defter görünümü** + defter/segment filtresi\n\nBelge bölme etkinse **farklı satır sayısı** gösterirler → **hata değil**.\n\nSegment analizinde → FAGLL03.' },
      { on:'Mali tablo yapısı ne zaman çalışır?', arka:'**Rapor anında** — kayıt anında değil.\n\n→ Yapı düzeltilirse **geçmiş raporlar da düzelir**.\n\n**Hesap belirlemeden farkı:** o kayıt anında çalışır, veriyi değiştirir, geçmişi **etkilemez**.' },
      { on:'G/L gider hesabında hangi kalem türü?', arka:'**"Tümü"**\n\nGider/gelir hesaplarında **açık kalem yönetimi yoktur** — kapatma yapılmaz.\n\n"Açık kalem" seçilirse rapor **boş döner** (kalem olmasına rağmen).\n\nSatıcı/müşteri → "açık".' },
      { on:'ALV düzeni neden önemli?', arka:'Gerekli sütunlar **varsayılanda yoktur**: maliyet yeri, vergi kodu, ihtar seviyesi.\n\nBir kez ekle → **düzeni kaydet** → aylık analiz saniyelere iner.\n\n**Genel düzen** (`/` ile başlar) → tüm ekip aynı sütunlarla çalışır.' },
      { on:'S/4HANA raporlamada ne kazandı?', arka:'• **Toplam tablosu kalktı** → toplam–kalem tutarsızlığı **imkânsız**\n• Boyutlar **tek satırda** → birleştirme gerekmiyor\n• **CDS view** tabanlı anlık analitik\n• Geniş aralıklı dökümler saniyelere indi\n\n**Klasik raporlar kaldırılmadı.**' },
      { on:'Yeni rapor gerekiyor — sıra nedir?', arka:'**1.** Standart rapor + **düzen** (çoğu ihtiyaç burada biter)\n**2.** Report Painter (GR55) — geliştirici gerekmez\n**3.** S/4HANA: standart **CDS view** var mı?\n**4.** En son: ABAP geliştirme' },
    ],
  },

  },
});
