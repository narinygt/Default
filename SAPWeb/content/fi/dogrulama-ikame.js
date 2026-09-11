/* ==========================================================================
   content/fi/dogrulama-ikame.js — "Doğrulama ve İkame (Validation & Substitution)"
   ========================================================================== */

SAP.registerTopic({
  id: 'dogrulama-ikame',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Doğrulama ve ikame, **kayıt anında devreye giren kural motorudur**. ' +
      'Standart alan kontrollerinin yetmediği yerde şirkete özgü kural koymayı sağlar.\n\n' +
      'İkisi zıt yönde çalışır:\n\n' +
      '**Doğrulama (validation)** — *"bu kayıt kabul edilebilir mi?"* ' +
      'Koşul sağlanmazsa kaydı **engeller**. Veriye dokunmaz, yalnızca **reddeder**.\n\n' +
      '**İkame (substitution)** — *"bu alan ne olmalı?"* ' +
      'Alan değerini **otomatik doldurur veya değiştirir**. Reddetmez, **müdahale eder**.\n\n' +
      'Her ikisi de aynı yapıyı kullanır: **önkoşul** (hangi durumda çalışsın) + ' +
      '**kural** (ne yapılsın).\n\n' +
      'Kritik ayrım: doğrulama **görünürdür** (kullanıcı hata mesajı alır), ' +
      'ikame **sessizdir** (kullanıcı bir şey girer, sistem başka bir şey kaydeder). ' +
      'Bu, ikamenin hem gücü hem tehlikesidir.',

    neden:
      '**Standart kontroller yetmez.** {{alan-durumu}} bir alanı zorunlu yapabilir ' +
      'ama *"belge türü SA ise metin zorunlu olsun"* diyemez.\n\n' +
      '**Şirkete özgü kurallar.** *"100.000 TL üstü kayıt belirli bir belge türüyle yapılmalı"* ' +
      'gibi politikalar sistemsel olarak dayatılabilir.\n\n' +
      '**Kullanıcı hatasını kaynağında önlemek.** Sonradan düzeltmek yerine ' +
      '**hiç oluşmasını engellemek**.\n\n' +
      '**Otomatik doldurma.** Kullanıcının her seferinde yazmasına gerek olmayan ' +
      'alanlar (valör tarihi, atama alanı) ikameyle doldurulur.\n\n' +
      '**Denetim gereksinimleri.** Denetçinin istediği kontroller ' +
      'prosedür yerine **sistemde** kurulabilir.',

    sirketOnemi:
      'Bu konu, danışmanın **"yapılamaz" demeden önce** bakması gereken son yerdir. ' +
      'Standart yapılandırmayla çözülemeyen birçok gereksinim ' +
      'doğrulama veya ikameyle çözülür — **ABAP geliştirme yapmadan**.\n\n' +
      'Ama aynı ölçüde tehlikelidir. İkame **veriyi sessizce değiştirir**: ' +
      'kullanıcı ekranda bir değer görür, tabloda başka bir değer durur. ' +
      'Belgelenmemiş bir ikame, yıllar sonra ' +
      '*"bu alan neden hep böyle doluyor?"* sorusuyla ortaya çıkar ve ' +
      'kimse sebebini bilmez.\n\n' +
      'Ayırt edici soru şudur: **"Doğrulama ile ikame arasındaki fark nedir?"** ' +
      'Doğru cevap: **doğrulama engeller, ikame değiştirir.** ' +
      'Doğrulama veriye dokunmaz; ikame kullanıcının girdiğini ' +
      '**sessizce** değiştirebilir. Bu yüzden ikame belgelenmek zorundadır.',

    gercekHayat:
      'Muhasebe müdürü bir kural istiyor: *"Kasa hesabına 50.000 TL üstü kayıt yapılmasın."*\n\n' +
      'Standart yapılandırmada bunun karşılığı **yok**: {{alan-durumu}} tutar sınırı koymaz, ' +
      '{{tolerans-grubu}} yalnızca fark toleransıdır.\n\n' +
      '**Doğrulama çözüyor:**\n\n' +
      '**Önkoşul:** hesap = 100 (Kasa)\n' +
      '**Kontrol:** tutar ≤ 50.000\n' +
      '**Mesaj:** hata — *"Kasa hesabına 50.000 TL üstü kayıt yapılamaz"*\n\n' +
      'Artık kural sistemde. Kullanıcı 60.000 TL girmeye çalışırsa kayıt **geçmez**.\n\n' +
      '━━━━━━━━━━\n\n' +
      'Aynı şirkette ikinci bir istek: *"Banka kayıtlarında atama alanı boş kalmasın, ' +
      'otomatik olarak belge tarihi yazılsın."*\n\n' +
      '**İkame çözüyor:** önkoşul hesap = 102, kural `ZUONR` = belge tarihi.\n\n' +
      'Kullanıcı hiçbir şey yapmıyor, alan kendiliğinden doluyor.\n\n' +
      '**Ama fark burada:** doğrulama kullanıcıya **görünür** (hata mesajı alır); ' +
      'ikame **görünmez**. Kullanıcı atama alanının neden dolu olduğunu bilmez.',

    muhasebeMantigi:
      'Doğrulama ve ikamenin muhasebe mantığı **iç kontrol** kavramına dayanır.\n\n' +
      'İç kontrolün iki yolu vardır: **önleyici** ve **tespit edici**.\n\n' +
      '**Tespit edici kontrol** hatayı sonradan bulur: mutabakat, rapor incelemesi, ' +
      'denetim. Hata oluşmuştur, düzeltilir.\n\n' +
      '**Önleyici kontrol** hatanın **oluşmasını** engeller. ' +
      'Doğrulama tam olarak budur — ve muhasebede önleyici kontrol ' +
      'her zaman tespit ediciden **üstündür**, çünkü düzeltme maliyeti yoktur.\n\n' +
      'İkame ise farklı bir kategoridedir: bir **kontrol** değil, ' +
      'bir **standartlaştırma** aracıdır. Kullanıcı hatasını engellemez, ' +
      'ihtiyaç bırakmaz.\n\n' +
      '**Ama ikamenin bir muhasebe riski vardır:** veriyi değiştirdiği için ' +
      '*"kaydedilen, girilen midir?"* sorusunu doğurur. ' +
      'Denetim izi açısından ikame kuralları **belgelenmiş** olmalıdır.',

    kavramlar: ['alan-durumu', 'belge-turu', 'tolerans-grubu', 'belge-denkligi',
                'ozellestirme', 'tasima-istegi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Kural kurmak **üç adımdır** ve ikisi sık atlanır: tanımla → **ata** → **etkinleştir**. ' +
      'Yalnızca tanımlamak hiçbir şey yapmaz.',

    roller:[
      { rol:'İş birimi', gorev:'Kuralı **iş diliyle** ister: "kasaya 50.000 üstü kayıt olmasın".' },
      { rol:'FI danışmanı', gorev:'Kuralın standart yapılandırmayla çözülüp çözülemeyeceğini değerlendirir.' },
      { rol:'FI danışmanı', gorev:'{{GGB0}} / {{GGB1}} ile kuralı tanımlar.' },
      { rol:'FI danışmanı', gorev:'{{OB28}} / {{OBBH}} ile şirket koduna ve **çağrı noktasına** atar.' },
      { rol:'FI danışmanı', gorev:'{{GGB4}} ile **etkinleştirir** — en sık atlanan adım.' },
      { rol:'Test ekibi', gorev:'Hem kuralın çalıştığını hem **normal kayıtları engellemediğini** test eder.' },
      { rol:'Geliştirici', gorev:'Standart alanlar yetmezse kullanıcı çıkışı yazar ({{GCX2}}).' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Kural kurma — üç adım, ikisi atlanır',
      adimlar:[
        { ic:'💬', rol:'İş birimi', baslik:'Kural iş diliyle istenir',
          aciklama:'*"Kasaya 50.000 üstü kayıt olmasın"* · *"SA belgesinde metin zorunlu olsun"*. ' +
                   'Önce **standart çözüm var mı** diye bakılır.',
          cikti:'İş kuralı', ok:'standart yetmiyorsa' },
        { ic:'🤔', rol:'Danışman', baslik:'Doğrulama mı, ikame mi?',
          aciklama:'**Engellenecekse** → doğrulama. **Doldurulacak/değiştirilecekse** → ikame. ' +
                   'Karar bu tek soruyla verilir.',
          cikti:'Araç seçimi', ok:'tanımlanır' },
        { ic:'📝', rol:'Danışman', baslik:'1⃣ Kural tanımlanır ({{GGB0}} / {{GGB1}})',
          aciklama:'**Önkoşul** (hangi durumda) + **kural** (ne yapılsın) + ' +
                   'doğrulamada **mesaj** (hata/uyarı/bilgi).',
          cikti:'Tanımlı kural', ok:'atanır' },
        { ic:'🔗', rol:'Danışman', baslik:'2⃣ Şirket koduna **atanır** ({{OB28}} / {{OBBH}})',
          aciklama:'Ayrıca **çağrı noktası** seçilir: belge başlığı · kalem · tam belge. ' +
                   'Yanlış nokta seçilirse kural **hiç çalışmaz**.',
          cikti:'Atanmış kural', ok:'etkinleştirilir' },
        { ic:'🔌', rol:'Danışman', baslik:'3⃣ **Etkinleştirilir** ({{GGB4}})',
          aciklama:'**0** pasif · **1** aktif · **2** toplu giriş hariç aktif. ' +
                   '**En sık atlanan adım** — kural tanımlı ama çalışmıyor.',
          cikti:'Çalışan kural', ok:'test edilir' },
        { ic:'🧪', rol:'Test ekibi', baslik:'İki yönlü test edilir',
          aciklama:'**Pozitif:** kural yakalıyor mu? **Negatif:** normal kayıtları ' +
                   'yanlışlıkla engelliyor mu? İkincisi daha önemlidir.',
          cikti:'Doğrulanmış kural', ok:'belgelenir' },
        { ic:'📋', rol:'Danışman', baslik:'**Belgelenir** — özellikle ikame',
          aciklama:'İkame veriyi **sessizce** değiştirir. Belgelenmezse yıllar sonra ' +
                   'sebebi bilinmeyen bir davranışa dönüşür.',
          cikti:'Belgelenmiş kural' },
      ],
    },

    adimlar:[
      { rol:'Danışman', eylem:'Standart çözüm arar', sistem:'{{alan-durumu}}, {{belge-turu}}, {{tolerans-grubu}}' },
      { rol:'Danışman', eylem:'Doğrulama tanımlar', sistem:'{{GGB0}} — önkoşul + kontrol + mesaj' },
      { rol:'Danışman', eylem:'İkame tanımlar', sistem:'{{GGB1}} — önkoşul + alan ataması' },
      { rol:'Danışman', eylem:'Şirket koduna atar', sistem:'{{OB28}} doğrulama · {{OBBH}} ikame' },
      { rol:'Danışman', eylem:'**Etkinleştirir**', sistem:'{{GGB4}} — seviye 1 veya 2' },
      { rol:'Test ekibi', eylem:'Pozitif ve negatif test yapar', sistem:'Normal kayıtlar engellenmemeli' },
      { rol:'Basis', eylem:'Taşıma isteğiyle canlıya alır', sistem:'{{tasima-istegi}}' },
      { rol:'Danışman', eylem:'Kuralı belgeler', sistem:'Özellikle ikame — sessiz davranış' },
    ],

    veriAkisi:{
      nereden:'Kayıt ekranından gelen alan değerleri; {{GB01}} hangi alanların ' +
              'kullanılabilir/değiştirilebilir olduğunu belirler.',
      nereye:'Doğrulama → hata mesajı (kayıt engellenir). ' +
             'İkame → {{BKPF}}/{{BSEG}} alanları **değiştirilerek** kaydedilir.',
      tetikleyen:'Her belge kaydı — atanmış çağrı noktasında.',
      sonraki:'Belge kaydı veya reddi.',
    },

    notlar:[
      { tip:'warn', baslik:'Kural tanımlamak yetmez — atanmalı ve etkinleştirilmeli', metin:
        'Üç adımın **ikisi sık atlanır** ve sonuç aynıdır: kural **hiç çalışmaz**.\n\n' +
        '**1. Tanımlama** ({{GGB0}}/{{GGB1}}) — kural yazılır. ' +
        'Bu tek başına hiçbir şey yapmaz.\n\n' +
        '**2. Atama** ({{OB28}}/{{OBBH}}) — şirket koduna ve **çağrı noktasına** bağlanır. ' +
        'Atanmamış kural, tanımlı olsa bile çalışmaz.\n\n' +
        '**3. Etkinleştirme** ({{GGB4}}) — etkinlik seviyesi **1** veya **2** yapılır. ' +
        'Seviye **0** ise kural atanmış olsa bile **pasiftir**.\n\n' +
        '**Teşhis sırası:** kural çalışmıyorsa sırayla bu üçü kontrol edilir. ' +
        'Vakaların çoğu **etkinleştirmede** çözülür.\n\n' +
        'Dördüncü ihtimal: **yanlış çağrı noktası**. Kalem seviyesindeki bir kural ' +
        'başlık alanına bakamaz; başlık seviyesindeki kural kalem alanına bakamaz.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Doğrulama **kayıt üretmez** — engeller. İkame ise kaydı **değiştirir**. ' +
      'Aşağıdaki örnekler ikisinin muhasebe sonucunu karşılaştırıyor.',

    etkilenenHesaplar:[
      { hesap:'Doğrulama — hiçbir hesap', tur:'—', neden:'Kayıt **oluşmaz**; hata mesajı verilir ve kullanıcı düzeltir.' },
      { hesap:'İkame — değiştirilen alanlar', tur:'Değişken', neden:'{{BKPF}}/{{BSEG}} alanları kullanıcının girdiğinden **farklı** kaydedilir.' },
      { hesap:'100 Kasa', tur:'Bilanço — Varlık', neden:'Örnek doğrulama hedefi: tutar sınırı.' },
      { hesap:'102 Bankalar', tur:'Bilanço — Varlık', neden:'Örnek ikame hedefi: atama alanı otomatik doldurma.' },
      { hesap:'{{kar-merkezi}} / {{maliyet-yeri}}', tur:'Raporlama boyutu', neden:'İkamenin en yaygın kullanımı: boyut alanlarını otomatik türetmek.' },
    ],

    fisler:[
      { baslik:'Doğrulama devreye girdi — **kayıt oluşmadı**',
        belgeTuru:'—', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'100', ad:'Kasa — kullanıcı 60.000 TL girdi', borc:0, alacak:0,
            not:'**Hata:** "Kasa hesabına 50.000 TL üstü kayıt yapılamaz"' },
        ],
        not:'**Belge hiç oluşmadı.** Doğrulama kaydı reddetti; ' +
             'kullanıcı hata mesajını aldı ve tutarı düzeltmek zorunda kaldı.\n\n' +
             'Muhasebe açısından bu **önleyici bir kontroldür**: hata oluşmadı, ' +
             'düzeltme maliyeti yok, denetim izinde iz yok.\n\n' +
             'Aynı sonuç tespit edici kontrolle (rapor incelemesi) sağlansaydı: ' +
             'kayıt oluşacak, sonradan bulunacak, {{FB08}} ile ters kaydedilecek ve ' +
             'mizanda **iki kalıcı kayıt** görünecekti.\n\n' +
             '*(Tabloda 0/0 gösterimi, kaydın hiç oluşmadığını vurgulamak içindir.)*' },

      { baslik:'İkame devreye girdi — kayıt **değiştirilerek** oluştu',
        belgeTuru:'SA', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bankalar — atama alanı **ikame ile doldu**', borc:250000,
            not:'Kullanıcı boş bıraktı · sistem `ZUONR` = **12112027** yazdı' },
          { hesap:'120', ad:'Alıcılar — tahsilat', alacak:250000 },
        ],
        not:'Kullanıcı atama alanını **boş bıraktı**; ikame kuralı belge tarihini yazdı.\n\n' +
             '**Kayıt oluştu ama kullanıcının girdiğiyle birebir aynı değil.**\n\n' +
             'Fayda: atama alanı hiçbir zaman boş kalmıyor, ' +
             'banka mutabakatı kolaylaşıyor.\n\n' +
             '**Risk:** kullanıcı bu alanın neden dolu olduğunu **bilmiyor**. ' +
             'Belgelenmemişse yıllar sonra *"bu alan neden hep tarih içeriyor?"* ' +
             'sorusu cevapsız kalır.' },

      { baslik:'İkame kullanıcının girdiğini **değiştirdi** — en riskli senaryo',
        belgeTuru:'SA', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Gider — kullanıcı **kâr merkezi PC-2000** girdi', borc:80000,
            not:'Kaydedilen: **PC-1000** — ikame değiştirdi' },
          { hesap:'320', ad:'Satıcılar', alacak:80000 },
        ],
        not:'İkame kuralı, masraf yerine göre kâr merkezini **zorla** türetiyor ve ' +
             'kullanıcının elle girdiği değeri **eziyor**.\n\n' +
             '**Kullanıcı PC-2000 girdi, sistem PC-1000 kaydetti** — ' +
             've hiçbir mesaj çıkmadı.\n\n' +
             'Kullanıcı belgeyi {{FB03}} ile açıp PC-1000 görürse ' +
             '*"ben öyle girmedim"* der ve haklıdır.\n\n' +
             '**Tasarım dersi:** ikame yalnızca **boş alanları doldurmalıdır**; ' +
             'kullanıcının girdiğini ezen kurallar ancak zorunlu bir gerekçe varsa ' +
             've **belgelenmiş** olarak kurulmalıdır. ' +
             'Aksi hâlde kullanıcının sisteme güveni zedelenir.' },

      { baslik:'Doğrulama uyarı seviyesinde — kayıt **geçti**',
        belgeTuru:'KR', tarih:'20.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Gider — metin alanı boş', borc:45000, not:'**Uyarı** verildi ama geçti' },
          { hesap:'320', ad:'Satıcılar', alacak:45000 },
        ],
        not:'Doğrulama mesaj tipi **W (uyarı)** olarak tanımlanmış: ' +
             'kullanıcı uyarıldı ama **Enter ile geçebildi**.\n\n' +
             '**Mesaj tipi seçimi kuralın etkisini tamamen belirler:**\n\n' +
             '**E (hata)** — kayıt **engellenir**, geçilemez\n' +
             '**W (uyarı)** — uyarır, kullanıcı **geçebilir**\n' +
             '**I (bilgi)** — yalnızca bilgilendirir\n\n' +
             'Politika gerçekten dayatılacaksa **E** kullanılmalıdır. ' +
             '**W** ile kurulan bir kural, ilk yoğun günde herkes tarafından ' +
             'geçilir ve fiilen etkisiz kalır.' },
    ],

    tHesaplar:[
      { hesap:'Kasa — doğrulama korumalı', kod:'100',
        borc:[{ ad:'50.000 altı kayıtlar', tutar:340000 }],
        alacak:[],
        not:'50.000 üstü kayıt **hiç oluşmadı**' },
      { hesap:'Bankalar — ikame ile atama alanı dolu', kod:'102',
        borc:[{ ad:'Tahsilatlar (ZUONR otomatik)', tutar:1250000 }],
        alacak:[],
        not:'Atama alanı **hiç boş kalmıyor**' },
    ],

    notlar:[
      { tip:'tip', baslik:'Önleyici kontrol, tespit ediciden üstündür', metin:
        'Muhasebe iç kontrolünde iki yaklaşım vardır:\n\n' +
        '**Tespit edici:** hata oluşur, sonradan bulunur (mutabakat, rapor, denetim). ' +
        'Düzeltme gerekir: {{FB08}} ters kayıt → mizanda **iki kalıcı kayıt** → ' +
        'denetimde açıklama gerekir.\n\n' +
        '**Önleyici:** hata **hiç oluşmaz**. Doğrulama tam olarak budur.\n\n' +
        'Fark somuttur: yanlış hesaba yapılan bir kayıt tespit edici kontrolle ' +
        'üç belge yaratır (asıl + ters + doğru). ' +
        'Doğrulama ile **sıfır belge** yaratır — kullanıcı ilk denemede uyarılır.\n\n' +
        '**Danışmanlık ilkesi:** bir hata sınıfı tekrarlanıyorsa çözüm ' +
        '"kullanıcıyı eğitmek" değil, **kuralı sisteme koymaktır**. ' +
        'Bu ilke {{konu:document-parking}} (dört-göz) ve ' +
        '{{konu:taxes}} ("yalnızca otomatik kayıt") konularında da görülür.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Kural motoru **üç eksende** çeşitlenir: **araç** (doğrulama / ikame), ' +
      '**çağrı noktası** (nerede çalışsın) ve **mesaj tipi** (ne kadar sert olsun).',

    liste:[
      { ad:'Araç · Doğrulama (validation)', en:'Validation — GGB0',
        aciklama:'Koşul sağlanmazsa kaydı **engeller**. Veriye **dokunmaz**.',
        neZaman:'Bir kaydın oluşmasını önlemek gerektiğinde.',
        ornek:'**Önkoşul:** hesap = 100 → **Kontrol:** tutar ≤ 50.000 → ' +
              '**Mesaj:** hata\n\n' +
              'Kullanıcı **görür** ve düzeltmek zorunda kalır.',
        tcodes:['GGB0','OB28'] },

      { ad:'Araç · İkame (substitution)', en:'Substitution — GGB1',
        aciklama:'Alan değerini **doldurur veya değiştirir**. Engellemez, **müdahale eder**.',
        neZaman:'Alanı otomatik doldurmak veya standartlaştırmak gerektiğinde.',
        ornek:'**Önkoşul:** hesap = 102 → **Kural:** `ZUONR` = belge tarihi\n\n' +
              'Kullanıcı **görmez** — bu yüzden belgelenmesi zorunludur.',
        tcodes:['GGB1','OBBH'] },

      { ad:'Çağrı noktası · Belge başlığı', en:'Document Header — 0001',
        aciklama:'Başlık alanları üzerinde çalışır: belge türü, tarih, referans, başlık metni.',
        neZaman:'Kural yalnızca başlık bilgisine bakıyorsa.',
        ornek:'*"Belge türü SA ise referans alanı zorunlu"*\n\n' +
              '**Kalem alanlarına erişemez** — hesap veya tutara bakan kural ' +
              'burada çalışmaz.' },

      { ad:'Çağrı noktası · Kalem', en:'Line Item — 0002',
        aciklama:'Her satır için ayrı çalışır: hesap, tutar, maliyet yeri, vergi kodu.',
        neZaman:'En yaygın nokta — kural hesap veya tutara bakıyorsa.',
        ornek:'*"Hesap 100 ise tutar ≤ 50.000"*\n\n' +
              '**Başlık alanını değiştiremez** (ikamede). ' +
              'Başlık alanı okunabilir ama yazılamaz.' },

      { ad:'Çağrı noktası · Tam belge', en:'Complete Document — 0003',
        aciklama:'Belge **bir bütün olarak** hazır olduğunda, kaydedilmeden hemen önce çalışır.',
        neZaman:'Kural satırlar arası ilişkiye bakıyorsa.',
        ornek:'*"Belgede 100 hesabı varsa toplam tutar 50.000’i geçmesin"* — ' +
              'tek satıra bakarak anlaşılamaz, **belgenin tamamı** gerekir.\n\n' +
              'Satır toplamları ve karşılıklı kontroller için tek uygun noktadır.' },

      { ad:'Mesaj · E — Hata', en:'Error',
        aciklama:'Kayıt **engellenir**. Kullanıcı geçemez.',
        neZaman:'Politika gerçekten dayatılacaksa.',
        ornek:'**Tek gerçek koruma budur.** Diğer tipler tavsiye niteliğindedir.' },

      { ad:'Mesaj · W — Uyarı', en:'Warning',
        aciklama:'Uyarır ama kullanıcı **Enter ile geçebilir**.',
        neZaman:'Dikkat çekmek yeterliyse; geçiş kabul edilebilirse.',
        ornek:'**Pratikte etkisiz kalma riski yüksektir:** ilk yoğun günde ' +
              'herkes geçmeye başlar ve kural fiilen kalkar.' },

      { ad:'Mesaj · I — Bilgi', en:'Information',
        aciklama:'Yalnızca bilgilendirir; akışı hiç kesmez.',
        neZaman:'Kullanıcıyı haberdar etmek yeterliyse.',
        ornek:'Kontrol amacı taşımaz; bilgilendirme aracıdır.' },

      { ad:'Etkinlik · Seviye 0 / 1 / 2', en:'Activation Level — GGB4',
        aciklama:'Kuralın çalışıp çalışmayacağını belirler.',
        neZaman:'Her kural için **zorunlu** son adım.',
        ornek:'**0** pasif · **1** aktif · **2** **toplu giriş hariç** aktif\n\n' +
              'Seviye **2** neden var? Veri yüklemelerinde ({{toplu-giris}}) ' +
              'kuralın devre dışı kalması istenebilir — ' +
              'yüklenen eski veri güncel kuralı sağlamayabilir.',
        tcodes:['GGB4'] },

      { ad:'İleri · Kullanıcı çıkışı (user exit)', en:'User Exit — RGGBS000',
        aciklama:'Standart alanlarla kurulamayan mantık için **ABAP** kodu.',
        neZaman:'Kural tablo okuması veya karmaşık hesaplama gerektiriyorsa.',
        ornek:'İkamede `U`-tipi çıkış, doğrulamada `B`-tipi kural. ' +
              '{{GCX2}} ile atanır.\n\n' +
              '**En son seçenek:** ABAP bakımı gerektirir ve ' +
              'yükseltmelerde gözden geçirilmesi gerekir.',
        tcodes:['GCX2'] },
    ],

    karsilastirmaBasliklar:['Doğrulama', 'İkame'],
    karsilastirma:[
      ['Ne yapar', 'Kaydı **engeller**', 'Alanı **doldurur/değiştirir**'],
      ['Veriye dokunur mu', '**Hayır** — reddeder', '**Evet** — değiştirir'],
      ['Kullanıcı görür mü', '**Evet** — hata mesajı alır', '**Hayır** — sessizdir'],
      ['İşlem kodu', '{{GGB0}} tanım · {{OB28}} atama', '{{GGB1}} tanım · {{OBBH}} atama'],
      ['Yapı', 'Önkoşul + kontrol + **mesaj**', 'Önkoşul + **alan ataması**'],
      ['Tipik kullanım', 'Tutar sınırı, zorunlu alan, hesap kısıtı', 'Boyut türetme, tarih doldurma, standartlaştırma'],
      ['Risk', 'Fazla sıkı kural işi durdurur', '**Sessiz veri değişikliği** — belgelenmezse kaybolur'],
      ['İç kontrol türü', '**Önleyici kontrol**', 'Kontrol değil — **standartlaştırma**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'GGB0', ad:'Doğrulama tanımla — önleyici kontrolün aracı',
        amac:'Kayıt anında çalışan kontrol kuralları tanımlar.',
        neZaman:'Standart yapılandırmayla engellenemeyen bir kayıt engellenecekse.',
        adimlar:[
          { baslik:'Uygulama alanını ve çağrı noktasını seç',
            aciklama:'FI belgeleri için uygulama alanı **FI**; çağrı noktası ' +
                     'belge başlığı / **kalem** / tam belge.' },
          { baslik:'Doğrulama adı ver ve açıklama yaz',
            aciklama:'Açıklama **iş diliyle** yazılmalıdır — yıllar sonra okunacak.' },
          { baslik:'**Önkoşul** tanımla',
            aciklama:'*Kural hangi durumda çalışsın?* Örnek: `BSEG-HKONT = 100`. ' +
                     'Önkoşul sağlanmıyorsa kontrol hiç çalışmaz.' },
          { baslik:'**Kontrol** tanımla',
            aciklama:'*Sağlanması gereken koşul.* Örnek: `BSEG-WRBTR <= 50000`.' },
          { baslik:'**Mesajı** tanımla',
            aciklama:'Tip (**E** hata / **W** uyarı / **I** bilgi) ve metin. ' +
                     'Metin kullanıcıya **ne yapması gerektiğini** söylemelidir.' },
          { baslik:'{{OB28}} ile ata, {{GGB4}} ile **etkinleştir**',
            aciklama:'Bu iki adım olmadan kural **çalışmaz**.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Uygulama alanı **FI** · çağrı noktası **kalem**' },
          { ekran:'Doğrulama', islem:'Ad: `Z_KASA_LIMIT` · açıklama: "Kasa 50.000 üstü kayıt yasağı"' },
          { ekran:'Önkoşul', islem:'`BSEG-HKONT` = `0000000100`' },
          { ekran:'Kontrol', islem:'`BSEG-WRBTR` <= `50000`' },
          { ekran:'Mesaj', islem:'Tip **E** · "Kasa hesabına 50.000 TL üstü kayıt yapılamaz"' },
          { ekran:'Sonraki adım', islem:'{{OB28}} atama → {{GGB4}} etkinleştirme' },
        ],
        alanlar:{
          zorunlu:['Uygulama alanı','Çağrı noktası','Doğrulama adı','Önkoşul','Kontrol','Mesaj'],
          opsiyonel:['Kullanıcı çıkışı (B-tipi kural)'] },
        hatalar:[
          { mesaj:'Kural tanımladım ama çalışmıyor', sebep:'Atanmamış ({{OB28}}) veya etkinleştirilmemiş ({{GGB4}}).', cozum:'Sırayla kontrol et: tanım → atama → **etkinleştirme (seviye 1/2)**. Vakaların çoğu üçüncüde çözülür.' },
          { mesaj:'Field ... is not allowed in this Boolean class', sebep:'Alan o çağrı noktasında kullanılamıyor ({{GB01}}).', cozum:'Farklı çağrı noktası seç. Başlık alanına bakan kural kalem noktasında çalışmaz.' },
          { mesaj:'Kural normal kayıtları da engelliyor', sebep:'Önkoşul çok geniş tanımlanmış.', cozum:'Önkoşulu daralt. **Negatif test** (normal kayıt geçiyor mu?) pozitif testten önemlidir.' },
        ],
        ipucu:'**Önkoşul ile kontrolü karıştırmak en sık tasarım hatasıdır.**\n\n' +
              '**Önkoşul:** *kural hangi durumda devreye girsin?* (hesap = 100)\n' +
              '**Kontrol:** *o durumda ne sağlanmalı?* (tutar ≤ 50.000)\n\n' +
              'İkisi ters yazılırsa kural **tüm kayıtlarda** çalışır ve ' +
              'sistemi kullanılamaz hâle getirir.\n\n' +
              '**Mesaj metnini kullanıcı diliyle yaz.** *"Doğrulama Z_KASA_LIMIT başarısız"* ' +
              'yerine *"Kasa hesabına 50.000 TL üstü kayıt yapılamaz — ' +
              'banka hesabını kullanın"* yazılmalıdır.',
        ilgili:['GGB1','GGB4','OB28','GB01'] },

      { kod:'GGB1', ad:'İkame tanımla — güçlü ama sessiz araç',
        amac:'Alan değerini kayıt anında otomatik dolduran veya değiştiren kural tanımlar.',
        neZaman:'Alanı otomatik doldurmak veya standartlaştırmak gerektiğinde.',
        adimlar:[
          { baslik:'Uygulama alanını ve çağrı noktasını seç',
            aciklama:'**Kalem noktasındaki ikame başlık alanını değiştiremez.**' },
          { baslik:'İkame adı ver ve açıklama yaz',
            aciklama:'Açıklama **kritiktir** — ikame sessiz çalıştığı için ' +
                     'tek belge bu alandır.' },
          { baslik:'**Önkoşul** tanımla', aciklama:'Kural hangi durumda çalışsın?' },
          { baslik:'**Değiştirilecek alanı** seç',
            aciklama:'{{GB01}} hangi alanların değiştirilebileceğini belirler; ' +
                     'listede olmayan alan seçilemez.' },
          { baslik:'Değeri belirle',
            aciklama:'Sabit değer · başka alandan kopyalama · **kullanıcı çıkışı** ({{GCX2}}).' },
          { baslik:'{{OBBH}} ile ata, {{GGB4}} ile **etkinleştir**' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Uygulama alanı **FI** · çağrı noktası **kalem**' },
          { ekran:'İkame', islem:'Ad: `Z_ZUONR_TARIH` · açıklama: "Banka kaydında atama alanına belge tarihi"' },
          { ekran:'Önkoşul', islem:'`BSEG-HKONT` = `0000000102`' },
          { ekran:'Alan', islem:'`BSEG-ZUONR` **değiştirilecek**' },
          { ekran:'Değer', islem:'`BKPF-BLDAT` alanından kopyala' },
          { ekran:'Sonraki adım', islem:'{{OBBH}} atama → {{GGB4}} etkinleştirme' },
        ],
        alanlar:{
          zorunlu:['Uygulama alanı','Çağrı noktası','İkame adı','Önkoşul','Hedef alan','Değer kaynağı'],
          opsiyonel:['Kullanıcı çıkışı (U-tipi)'] },
        hatalar:[
          { mesaj:'Field ... cannot be substituted', sebep:'Alan {{GB01}}’de ikameye kapalı.', cozum:'{{GB01}} değiştirilebilir ama **SAP notu olmadan yapılmamalıdır** — bazı alanların ikameye kapalı olması kasıtlıdır ve veri bütünlüğünü korur.' },
          { mesaj:'Başlık alanını değiştiremiyorum', sebep:'Kalem çağrı noktasında başlık alanı **yazılamaz**.', cozum:'Başlık çağrı noktası kullan. Ama o noktada kalem alanları okunamaz.' },
          { mesaj:'İkame kullanıcının girdiğini eziyor, şikâyet var', sebep:'Kural boş/dolu kontrolü yapmıyor.', cozum:'Önkoşula **"alan boşsa"** koşulu ekle; yalnızca boş alanları doldur.' },
        ],
        ipucu:'**İkame yalnızca boş alanları doldurmalıdır.**\n\n' +
              'Kullanıcının elle girdiği değeri ezen bir ikame, ' +
              '*"ben öyle girmedim"* şikâyetine yol açar ve ' +
              'kullanıcının sisteme güvenini zedeler.\n\n' +
              'Çözüm basittir: önkoşula **"alan boşsa"** koşulunu ekle.\n\n' +
              '**Her ikame belgelenmelidir.** Sessiz çalıştığı için ' +
              'belgelenmemiş bir ikame, yıllar sonra sebebi bilinmeyen ' +
              'bir sistem davranışına dönüşür ve kimse dokunmaya cesaret edemez.',
        ilgili:['GGB0','GGB4','OBBH','GB01','GCX2'] },

      { kod:'GGB4', ad:'Etkinleştirme — en sık atlanan adım',
        amac:'Tanımlanmış doğrulama ve ikamelerin etkinlik seviyesini belirler.',
        neZaman:'Her kural tanımlandıktan **sonra** — bu adım olmadan kural çalışmaz.',
        adimlar:[
          { baslik:'Uygulama alanını ve çağrı noktasını seç' },
          { baslik:'Şirket kodunu bul' },
          { baslik:'**Etkinlik seviyesini gir**',
            aciklama:'**0** pasif · **1** aktif · **2** **toplu giriş hariç** aktif.' },
          { baslik:'Kaydet ve test et' },
        ],
        alanlar:{
          zorunlu:['Uygulama alanı','Çağrı noktası','Şirket kodu','Etkinlik seviyesi'],
          opsiyonel:[] },
        hatalar:[
          { mesaj:'Kural tanımlı ve atanmış ama çalışmıyor', sebep:'Etkinlik seviyesi **0**.', cozum:'Seviye **1** yap. Bu, "kural çalışmıyor" vakalarının en sık sebebidir.' },
          { mesaj:'Kural elle kayıtta çalışıyor, veri yüklemesinde çalışmıyor', sebep:'Seviye **2** — toplu giriş hariç tutulmuş.', cozum:'Bilinçli bir tercih olabilir. Yükleme sırasında da çalışması gerekiyorsa seviye **1** yapılır.' },
        ],
        ipucu:'**Seviye 2 neden var?** Veri yüklemelerinde ({{toplu-giris}}, {{LSMW}}) ' +
              'kuralın devre dışı kalması istenebilir.\n\n' +
              'Sebep: geçişte yüklenen **eski veri**, bugünün kuralını sağlamayabilir. ' +
              'Örneğin 2019’daki bir kayıt, 2027’de konulan tutar sınırını aşıyor olabilir.\n\n' +
              'Kural seviye 1 olsaydı geçmiş veri **yüklenemezdi**.\n\n' +
              'Ama bu bir **açık kapıdır**: toplu giriş yoluyla kural atlatılabilir. ' +
              'Kritik kontrollerde seviye **1** tercih edilmelidir.',
        ilgili:['GGB0','GGB1','OB28','OBBH'] },

      { kod:'OB28', ad:'FI belgesi doğrulamasını şirket koduna ata',
        amac:'{{GGB0}} ile tanımlanan doğrulamayı şirket koduna ve çağrı noktasına bağlar.',
        neZaman:'Doğrulama tanımlandıktan sonra, etkinleştirmeden önce.',
        adimlar:[
          { baslik:'Şirket kodunu gir' },
          { baslik:'Çağrı noktasını seç', aciklama:'Belge başlığı · kalem · tam belge.' },
          { baslik:'Doğrulama adını gir' },
          { baslik:'Etkinlik seviyesini gir', aciklama:'Burada da girilebilir; {{GGB4}} ile aynı alandır.' },
        ],
        ipucu:'**Aynı şirket kodu + çağrı noktası için tek doğrulama atanabilir.** ' +
              'İkinci bir kural gerekiyorsa mevcut doğrulamanın içine ' +
              '**ek adım** olarak eklenir.\n\n' +
              'Bu, tasarımda önemli bir kısıttır: kurallar tek bir doğrulama nesnesi ' +
              'içinde büyür ve zamanla karmaşıklaşır. ' +
              'Bu yüzden her adımın **açıklaması** iyi yazılmalıdır.',
        ilgili:['GGB0','GGB4','OBBH'] },

      { kod:'OBBH', ad:'FI belgesi ikamesini şirket koduna ata',
        amac:'{{GGB1}} ile tanımlanan ikameyi şirket koduna ve çağrı noktasına bağlar.',
        neZaman:'İkame tanımlandıktan sonra.',
        adimlar:[
          { baslik:'Şirket kodunu gir' },
          { baslik:'Çağrı noktasını seç',
            aciklama:'Nokta seçimi **hangi alanların değiştirilebileceğini** belirler.' },
          { baslik:'İkame adını gir' },
          { baslik:'Etkinlik seviyesini gir' },
        ],
        ipucu:'**Çağrı noktası seçimi geri dönüşü zor bir karardır.** ' +
              'Kalem noktasındaki ikame **başlık alanını değiştiremez**; ' +
              'başlık noktasındaki ikame **kalem alanlarını okuyamaz**.\n\n' +
              'Yanlış nokta seçilirse kural ya çalışmaz ya beklenmedik davranır. ' +
              'Kural tasarlanırken *"hangi alanları okumam ve hangilerini yazmam gerekiyor?"* ' +
              'sorusu önce cevaplanmalıdır.',
        ilgili:['GGB1','GGB4','OB28'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Doğrulama ve ikamenin **kendi hareket tablosu yoktur** — kural motorudur. ' +
      'Ama iki tablo kritiktir: **{{GB01}}** (hangi alan kullanılabilir) ve ' +
      'kuralların etkilediği **{{BKPF}}/{{BSEG}}**.',

    liste:[
      { ad:'GB01', baslik:'Boolean sınıfı alan kontrolü — **kısıtların kaynağı**',
        tutar:'Hangi alanın doğrulamada **kullanılabileceğini** ve ikamede ' +
              '**değiştirilebileceğini** tutar.',
        olusturan:'SAP standart teslimatı',
        guncelleyen:'Değiştirilebilir ama **SAP notu olmadan yapılmamalıdır**',
        anahtar:'CLASS + TABNAME + FIELDNAME',
        iliskiler:'{{GGB0}} ve {{GGB1}} bu tabloya bakarak alan listesini sunar.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'CLASS', aciklama:'Boolean sınıfı — FI belgeleri için **09**', tip:'pk' },
          { ad:'TABNAME / FIELDNAME', aciklama:'{{BKPF}} / {{BSEG}} alanları', tip:'pk' },
          { ad:'EXCL_SUBST', aciklama:'**İkameden hariç** işareti — doluysa o alan **değiştirilemez**' },
        ] },

      { ad:'BKPF', baslik:'Belge başlığı — başlık noktası kuralları burada çalışır',
        tutar:'Belge türü, tarihler, referans, başlık metni.',
        olusturan:'Belge kaydı',
        iliskiler:'Başlık çağrı noktasındaki kurallar bu alanları okur/yazar.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'BLART', aciklama:'{{belge-turu}} — kuralların en sık önkoşulu' },
          { ad:'BLDAT / BUDAT', aciklama:'Belge ve kayıt tarihi — ikamede sık kaynak alan' },
          { ad:'XBLNR', aciklama:'Referans — doğrulamada sık zorunlu kılınan alan' },
          { ad:'BKTXT', aciklama:'Başlık metni' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri — kalem noktası kuralları burada çalışır',
        tutar:'Hesap, tutar, maliyet yeri, atama alanı, vergi kodu.',
        olusturan:'Belge kaydı',
        iliskiler:'Kalem çağrı noktasındaki kurallar bu alanları okur/yazar.',
        s4:'{{uyumluluk-view}} ama kural motoru kayıt anında çalıştığı için etkilenmez.',
        alanlar:[
          { ad:'HKONT', aciklama:'G/L hesabı — **en sık önkoşul alanı**' },
          { ad:'WRBTR / DMBTR', aciklama:'Tutar — tutar sınırı kurallarında kullanılır' },
          { ad:'ZUONR', aciklama:'**Atama alanı** — ikamenin en yaygın hedefi' },
          { ad:'KOSTL / PRCTR', aciklama:'Maliyet yeri / kâr merkezi — boyut türetme ikamesi' },
          { ad:'SGTXT', aciklama:'Kalem metni — doğrulamada sık zorunlu kılınır' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Kural motoru — ne okur, ne yazar?',
      varliklar:[
        { ad:'GB01', rol:'Kısıt', aciklama:'**Hangi alan kullanılabilir/değiştirilebilir**',
          alanlar:[{ ad:'CLASS', tip:'pk' }, { ad:'TABNAME', tip:'pk' }, { ad:'FIELDNAME', tip:'pk' }, { ad:'EXCL_SUBST' }] },
        { ad:'BKPF', rol:'Belge', hub:true, aciklama:'Başlık — başlık noktası kuralları',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'BLDAT' }, { ad:'XBLNR' }] },
        { ad:'BSEG', rol:'Belge', aciklama:'Kalemler — kalem noktası kuralları',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT' }, { ad:'WRBTR' }, { ad:'ZUONR' }, { ad:'PRCTR' }] },
        { ad:'T001', rol:'Organizasyon', aciklama:'Şirket kodu — kural buraya atanır',
          alanlar:[{ ad:'BUKRS', tip:'pk' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'İkame sonucu buraya da yansır',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'PRCTR' }] },
      ],
      iliskiler:[
        { from:'GB01', to:'BKPF', alanlar:'TABNAME/FIELDNAME', not:'başlık alan kısıtı' },
        { from:'GB01', to:'BSEG', alanlar:'TABNAME/FIELDNAME', not:'**kalem alan kısıtı**' },
        { from:'T001', to:'BKPF', alanlar:'BUKRS', not:'kural şirket koduna atanır' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'başlık → kalem' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR', not:'ikame sonucu yansır' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Kullanıcı bu konuyla **yalnızca sonuç olarak** karşılaşır: ' +
      'ya hata mesajı alır (doğrulama) ya alan kendiliğinden dolar (ikame). ' +
      'Danışman için üç ekran vardır.',

    ekranlar:[
      { ad:'{{GGB0}} — doğrulama tanım ekranı',
        aciklama:'Üç parçalı kural yapısı: önkoşul, kontrol, mesaj.',
        alanlar:[
          { ad:'Uygulama alanı + çağrı noktası', zorunlu:true,
            aciklama:'FI + belge başlığı / **kalem** / tam belge. ' +
                     'Nokta seçimi **hangi alanlara erişilebileceğini** belirler.' },
          { ad:'**Önkoşul**', zorunlu:true, aciklama:'*Kural hangi durumda çalışsın?* ' +
                   'Boş bırakılırsa **her kayıtta** çalışır — tehlikeli.' },
          { ad:'**Kontrol**', zorunlu:true, aciklama:'*O durumda ne sağlanmalı?*' },
          { ad:'**Mesaj tipi ve metni**', zorunlu:true,
            aciklama:'**E** engeller · **W** geçilebilir · **I** bilgilendirir. ' +
                     'Metin kullanıcıya **ne yapması gerektiğini** söylemeli.' },
        ],
        ipucu:'**Önkoşulu boş bırakmak en tehlikeli hatadır** — ' +
              'kural her kayıtta çalışır ve sistemi kullanılamaz hâle getirir.\n\n' +
              'Test ederken **negatif test** pozitiften önemlidir: ' +
              'kuralın yakalaması gereken kayıt engelleniyor mu ✓ ' +
              've **normal kayıtlar geçiyor mu** ✓' },

      { ad:'{{GGB1}} — ikame tanım ekranı',
        aciklama:'Önkoşul + hedef alan + değer kaynağı.',
        alanlar:[
          { ad:'Uygulama alanı + çağrı noktası', zorunlu:true,
            aciklama:'**Kalem noktası başlık alanını yazamaz.**' },
          { ad:'Önkoşul', zorunlu:true, aciklama:'**"Alan boşsa"** koşulu eklenmesi önerilir — ' +
                   'kullanıcının girdiğini ezmemek için.' },
          { ad:'Hedef alan', zorunlu:true, aciklama:'{{GB01}} listesinden seçilir; ' +
                   'kapalı alanlar görünmez.' },
          { ad:'Değer kaynağı', zorunlu:true, aciklama:'Sabit değer · başka alan · ' +
                   '**kullanıcı çıkışı** ({{GCX2}}).' },
          { ad:'Açıklama', zorunlu:false, aciklama:'**Fiilen zorunludur** — ' +
                   'ikame sessiz çalıştığı için tek belge bu alandır.' },
        ],
        ipucu:'**İkame yalnızca boş alanları doldurmalıdır.** ' +
              'Kullanıcının girdiğini ezen kural, *"ben öyle girmedim"* şikâyeti ve ' +
              'sisteme güven kaybı yaratır.\n\n' +
              'Önkoşula *"alan boşsa"* koşulu eklemek bunu çözer.' },

      { ad:'{{GGB4}} — etkinleştirme ekranı',
        aciklama:'Kuralı fiilen devreye alan ekran.',
        alanlar:[
          { ad:'Uygulama alanı + çağrı noktası', zorunlu:true },
          { ad:'Şirket kodu', zorunlu:true },
          { ad:'**Etkinlik seviyesi**', zorunlu:true,
            aciklama:'**0** pasif · **1** aktif · **2** toplu giriş hariç aktif.' },
        ],
        ipucu:'**"Kural çalışmıyor" vakalarının çoğu burada çözülür.**\n\n' +
              'Teşhis sırası: tanım var mı ({{GGB0}}/{{GGB1}}) → ' +
              'atanmış mı ({{OB28}}/{{OBBH}}) → **etkinleştirilmiş mi ({{GGB4}})** → ' +
              'doğru çağrı noktası mı?\n\n' +
              'Seviye **2** seçiliyse kural elle kayıtta çalışır ama ' +
              'veri yüklemesinde çalışmaz — bu bazen kasıtlı, bazen sürprizdir.' },
    ],

    zorunlu:['Uygulama alanı','Çağrı noktası','Önkoşul','Kontrol veya hedef alan','Etkinlik seviyesi'],
    opsiyonel:['Kullanıcı çıkışı','Mesaj metni özelleştirmesi'],

    hatalar:[
      { mesaj:'Kural tanımladım ama hiç çalışmıyor', sebep:'Atanmamış veya etkinleştirilmemiş.', cozum:'Sırayla: tanım → **atama** ({{OB28}}/{{OBBH}}) → **etkinleştirme** ({{GGB4}} seviye 1/2) → çağrı noktası. Çoğu vaka üçüncüde çözülür.' },
      { mesaj:'Field ... is not allowed in this Boolean class', sebep:'Alan o çağrı noktasında kullanılamıyor ({{GB01}}).', cozum:'Farklı çağrı noktası seç. Başlık alanı kalem noktasında okunabilir ama yazılamaz.' },
      { mesaj:'Field ... cannot be substituted', sebep:'{{GB01}}’de ikameye kapalı.', cozum:'{{GB01}} değiştirilebilir ama **SAP notu olmadan yapılmamalıdır** — kapalılık kasıtlı olabilir.' },
      { mesaj:'Kural normal kayıtları da engelliyor, iş durdu', sebep:'Önkoşul çok geniş veya boş bırakılmış.', cozum:'Önkoşulu daralt. Acil durumda {{GGB4}} ile **seviye 0** yapılıp kural geçici durdurulabilir.' },
      { mesaj:'İkame kullanıcının girdiğini değiştiriyor', sebep:'Önkoşulda "alan boşsa" kontrolü yok.', cozum:'Önkoşula bu koşulu ekle; ikame yalnızca boş alanları doldursun.' },
      { mesaj:'Kural elle kayıtta çalışıyor, yüklemede çalışmıyor', sebep:'Etkinlik seviyesi **2** (toplu giriş hariç).', cozum:'Kritik kontrollerde seviye **1** kullanılmalıdır — aksi hâlde toplu giriş bir **açık kapıdır**.' },
    ],

    ipuclari:[
      '**Üç adımı asla atlama:** tanımla → ata → **etkinleştir**. ' +
      'Üçüncüsü en sık atlanandır.',
      '**Önkoşulu boş bırakma** — kural her kayıtta çalışır ve sistemi durdurur.',
      '**Negatif test pozitiften önemlidir:** normal kayıtlar geçiyor mu?',
      'İkamede önkoşula **"alan boşsa"** koşulu ekle; kullanıcının girdiğini ezme.',
      '**Her ikameyi belgele** — sessiz çalıştığı için tek iz açıklama alanıdır.',
      'Acil durumda kural {{GGB4}} ile **seviye 0** yapılarak geçici durdurulabilir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Başlık noktası ikamesi bu alanları **değiştirebilir**' },
      { tablo:'BSEG', ne:'Kalem noktası ikamesi bu alanları değiştirir' },
      { tablo:'ACDOCA', ne:'İkame sonucu buraya da yansır (S/4HANA)' },
      { tablo:'GB01', ne:'**Okunur** — hangi alan kullanılabilir/değiştirilebilir' },
      { tablo:'T001', ne:'Kural şirket koduna atanır' },
    ],

    commit:
      'Doğrulama ve ikame, belge kaydının **içinde** çalışır — ayrı bir adım değildir.\n\n' +
      '**Sıra kritiktir:**\n\n' +
      '**1.** Kullanıcı alanları girer, standart alan kontrolleri çalışır.\n' +
      '**2.** **İkame** çalışır — alanlar **değiştirilir**.\n' +
      '**3.** **Doğrulama** çalışır — değiştirilmiş **son hâl** kontrol edilir.\n' +
      '**4.** Hesap belirleme, vergi hesaplama, {{belge-bolme}} çalışır.\n' +
      '**5.** Denklik kontrolü.\n' +
      '**6.** Tablolara yazılır.\n\n' +
      '**2. ve 3. adımın sırası önemlidir:** doğrulama, ikamenin ' +
      '**değiştirdiği değeri** görür — kullanıcının girdiğini değil.\n\n' +
      'Bu, beklenmedik etkileşimlere yol açabilir: ikame bir alanı değiştirir, ' +
      'doğrulama o yeni değeri reddeder ve kullanıcı ' +
      '*"ben o değeri girmedim ki"* der — haklıdır.',

    belgeNo:
      'Doğrulama kaydı engellerse **numara harcanmaz** — belge hiç oluşmaz. ' +
      'Bu, {{guncelleme-hatasi}}’ndan farklıdır: orada numara verilir ama belge oluşmaz.\n\n' +
      'İkame numara üzerinde etkili değildir; yalnızca alan içeriğini değiştirir.',

    postingLogic:
      'Kural motorunun çalışma mantığı:\n\n' +
      '**1.** Çağrı noktasına gelinir (başlık / kalem / tam belge).\n' +
      '**2.** Şirket koduna **atanmış** kural var mı? ({{OB28}}/{{OBBH}})\n' +
      '**3.** Kural **etkin mi**? ({{GGB4}} seviye 1 veya 2)\n' +
      '**4.** Toplu giriş mi ve seviye **2** mi? → kural **atlanır**.\n' +
      '**5.** **Önkoşul** değerlendirilir. Sağlanmıyorsa kural atlanır.\n' +
      '**6a.** Doğrulamada: **kontrol** değerlendirilir; sağlanmıyorsa **mesaj** verilir.\n' +
      '**6b.** İkamede: hedef alan **değiştirilir**.\n\n' +
      '2., 3. ve 5. adımlar *"kural neden çalışmıyor?"* sorusunun ' +
      '**üç olası cevabıdır** ve teşhis bu sırayla yapılır.',

    belgeTuru:
      '{{belge-turu}} kuralların **en sık önkoşul alanıdır**: ' +
      '*"belge türü SA ise metin zorunlu"*, *"KR ise referans zorunlu"*.\n\n' +
      'Ayrıca belge türü, kuralın hangi kayıtlarda çalışacağını daraltmanın ' +
      'en temiz yoludur — hesap bazlı önkoşuldan daha az yan etkisi olur.',

    numberRange:
      'Doğrulama/ikame numara aralığı kullanmaz. ' +
      'Doğrulama kaydı engellediğinde numara **harcanmaz**, ' +
      'aralıkta boşluk oluşmaz.',

    accountDetermination:
      'Kural motoru hesap belirlemeden **önce** çalışır (ikame) ve ' +
      'ona girdi sağlar.\n\n' +
      'Pratik sonucu önemlidir: ikame bir hesabı veya {{degerleme-sinifi}}’nı değiştirirse ' +
      '**hesap belirleme sonucu da değişir**. ' +
      'Bu, güçlü ama riskli bir kullanımdır ve dikkatli test gerektirir.',

    tur:
      '**Tamamı özelleştirmedir.** Doğrulama ve ikame tanımları, atamalar ve ' +
      'etkinlik seviyeleri — hepsi {{ozellestirme}}.\n\n' +
      'Kullanıcı çıkışları ise **geliştirme nesnesidir** (`RGGBS000`, `RGGBR000`) ve ' +
      'ayrı taşınır.\n\n' +
      'Hareket verisi üretmez; yalnızca hareket verisini **etkiler**.',

    transport:
      'Doğrulama ve ikame kuralları taşınır ama **standart yapılandırmadan farklı** ' +
      'bir mekanizma kullanır: {{GGB0}}/{{GGB1}} menüsünden ' +
      '**açıkça taşıma isteğine eklenir**.\n\n' +
      '**En sık geçiş sorunu:** kural taşınır ama ' +
      '**etkinlik seviyesi taşınmaz** veya sıfırlanır. ' +
      'Canlıda kural tanımlı görünür ama çalışmaz.\n\n' +
      'Ayrıca kullanıcı çıkışı kullanılıyorsa ABAP nesnesi **ayrı** taşınır; ' +
      'biri gelip diğeri gelmezse kural hata verir.\n\n' +
      '**Geçiş kontrolü:** canlıda kuralın yakalaması gereken bir test kaydı dene — ' +
      'engelleniyor mu?',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Belge Girişi İçin Doğrulamalar', not:'{{GGB0}} + {{OB28}}' },
      { yol:'SPRO → Finansal Muhasebe → Özel Amaçlı Defter → Araçlar → Doğrulama/İkame/Kural → İkameyi Koru', not:'{{GGB1}}' },
      { yol:'SPRO → … → Doğrulama/İkame/Kural → Doğrulama/İkame Etkinleştir', not:'{{GGB4}} — **atlanmamalı**' },
      { yol:'SPRO → … → Araçlar → Kullanıcı Çıkışlarını Koru', not:'{{GCX2}} — RGGBS000 / RGGBR000' },
    ],

    ekstra:[
      { ic:'⚖️', baslik:'Doğrulama mı, ikame mi? — tek soruyla karar', metin:
        'İkisi arasında seçim yapmak için **tek bir soru** yeterlidir:\n\n' +
        '**"Kullanıcı bu kaydı yapabilsin mi?"**\n\n' +
        '**Hayır → doğrulama.** Kayıt engellenir, kullanıcı hata mesajı alır ve ' +
        'düzeltmek zorunda kalır.\n\n' +
        '**Evet, ama alan şöyle olsun → ikame.** Kayıt geçer, alan otomatik düzeltilir.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Aynı ihtiyaç iki farklı çözümle karşılanabilir — ve sonuçları farklıdır:**\n\n' +
        '*İhtiyaç: "banka kayıtlarında atama alanı boş kalmasın."*\n\n' +
        '**Doğrulama çözümü:** alan boşsa **hata** ver. ' +
        'Kullanıcı elle doldurmak zorunda kalır. ' +
        '→ Kullanıcı **bilinçli** olur, ama her kayıtta iş yükü doğar.\n\n' +
        '**İkame çözümü:** alan boşsa belge tarihini **yaz**. ' +
        'Kullanıcı hiçbir şey yapmaz. ' +
        '→ İş yükü sıfır, ama kullanıcı alanın anlamını **hiç öğrenmez**.\n\n' +
        '**Hangisi doğru?** Duruma bağlı. Alan bir **karar** taşıyorsa ' +
        '(hangi kâr merkezi) doğrulama uygundur — kararı kullanıcı vermelidir. ' +
        'Alan **mekanik** bir bilgi taşıyorsa (tarih, referans) ikame uygundur.\n\n' +
        '**Kötü tasarım:** karar gerektiren bir alanı ikameyle doldurmak. ' +
        'Sistem kullanıcı adına karar verir ve kimse fark etmez.' },

      { ic:'🔇', baslik:'İkamenin sessizliği — en büyük riski', metin:
        'Doğrulama **görünürdür**: kullanıcı hata mesajı alır, ' +
        'sistemde bir kural olduğunu bilir.\n\n' +
        'İkame **görünmezdir**: kullanıcı bir şey girer veya boş bırakır, ' +
        'sistem başka bir şey kaydeder ve **hiçbir mesaj çıkmaz**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Bunun üç sonucu vardır:**\n\n' +
        '**1. Kullanıcı güveni.** Kullanıcı {{FB03}} ile belgeyi açıp ' +
        'girdiğinden farklı bir değer görürse *"ben öyle girmedim"* der — ' +
        've haklıdır. Açıklanamayan sistem davranışı güven kaybettirir.\n\n' +
        '**2. Kurumsal hafıza kaybı.** İkameyi kuran danışman gider, ' +
        'kural çalışmaya devam eder. Yıllar sonra ' +
        '*"bu alan neden hep böyle doluyor?"* sorulur ve ' +
        '**kimse bilmez**. Kimse dokunmaya da cesaret edemez.\n\n' +
        '**3. Teşhis zorluğu.** Bir alan beklenmedik değer taşıyorsa ' +
        'ikame ihtimali **akla en son gelen** şeydir. ' +
        'Saatler yanlış yerde aranır.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Üç kural bu riski yönetir:**\n\n' +
        '**a)** İkame yalnızca **boş alanları** doldursun — ' +
        'önkoşula *"alan boşsa"* koşulu ekle.\n\n' +
        '**b)** Her ikamenin **açıklaması iş diliyle** yazılsın; ' +
        'sessiz çalıştığı için tek iz o alandır.\n\n' +
        '**c)** Aktif ikamelerin **listesi** proje dokümanında tutulsun ve ' +
        'devir teslimde aktarılsın.\n\n' +
        'Bu üç kural uygulanırsa ikame güçlü bir araçtır. ' +
        'Uygulanmazsa **teknik borç** olur.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Önkoşulu boş bırakmak sistemi durdurur', metin:
        'Önkoşul, kuralın **hangi durumda çalışacağını** belirler. ' +
        'Boş bırakılırsa kural **her kayıtta** çalışır.\n\n' +
        'Doğrulamada bunun sonucu ağırdır: *"tutar ≤ 50.000"* kontrolü ' +
        'önkoşulsuz tanımlanırsa **tüm kayıtlar** 50.000 sınırına tabi olur ve ' +
        'şirket fiilen çalışamaz hâle gelir.\n\n' +
        'İkamede sonuç daha sinsidir: her kayıtta bir alan değiştirilir ve ' +
        'kimse sebebini anlamaz.\n\n' +
        '**Acil çözüm:** {{GGB4}} ile etkinlik seviyesi **0** yapılarak ' +
        'kural anında durdurulabilir. Bu, kural motorunun ' +
        '**en değerli güvenlik valfidir** — kuralı silmeye gerek yok.\n\n' +
        '**Kalıcı çözüm:** önkoşulu daralt ve **negatif test** yap — ' +
        'normal kayıtlar geçiyor mu?' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Doğrulama ve ikame S/4HANA’da **değişmedi**: {{GGB0}}, {{GGB1}}, {{GGB4}}, ' +
      '{{OB28}}, {{OBBH}} aynı şekilde çalışıyor. ' +
      'Değişen, aynı işi yapan **modern alternatiflerin** eklenmesi.',

    eccFarklari:[
      { konu:'Doğrulama / ikame', ecc:'{{GGB0}} / {{GGB1}}', s4:'**Değişmedi**' },
      { konu:'Etkinleştirme', ecc:'{{GGB4}}', s4:'**Değişmedi**' },
      { konu:'Alan kısıtları', ecc:'{{GB01}}', s4:'**Değişmedi**' },
      { konu:'Modern alternatif', ecc:'Yok', s4:'**BAdI** ve genişletme noktaları' },
      { konu:'İkame sonucu', ecc:'{{BSEG}}', s4:'{{BSEG}} + {{ACDOCA}}' },
      { konu:'Belge bölme ile etkileşim', ecc:'New G/L’de var', s4:'Aynı — ikame **bölmeden önce** çalışır' },
    ],

    universalJournal:
      'İkamenin değiştirdiği alanlar {{ACDOCA}}’ya da yansır — ' +
      'çünkü ikame **kayıt anında**, {{ACDOCA}} yazılmadan önce çalışır.\n\n' +
      'Pratik sonucu: {{kar-merkezi}} veya segment alanını değiştiren bir ikame, ' +
      '{{belge-bolme}} sonucunu da **etkiler**. ' +
      'Sıra şöyledir: ikame → doğrulama → hesap belirleme → **belge bölme** → yazma.\n\n' +
      'Bu yüzden segment raporlaması yapan bir kurulumda boyut alanlarını değiştiren ' +
      'ikameler **dikkatle test edilmelidir** — bölme sonucu beklenmedik şekilde değişebilir.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'{{GGB0}}, {{GGB1}}, {{GGB4}}, {{OB28}}, {{OBBH}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'Doğrulama mesajları burada da görünür.' },
      { ad:'Custom Fields and Logic', aciklama:'**Modern alternatif** — bulut ve on-premise’de ' +
             'kod yazmadan alan ekleme ve mantık tanımlama.' },
      { ad:'Manage Your Solution', aciklama:'Yapılandırma ve genişletme noktalarına erişim.' },
    ],

    compatibilityViews:[
      '{{GB01}} — **fiziksel tablo olarak duruyor**.',
      'Kural motoru kayıt anında çalıştığı için {{BSEG}}’in görünüme dönüşmesinden ' +
      '**etkilenmez** — ikame yazma anında devrededir.',
      'Kullanıcı çıkışları (`RGGBS000`) çalışmaya devam eder.',
    ],

    performans:
      'Doğrulama ve ikame **her kayıtta** çalışır — bu, performans açısından ' +
      'dikkat gerektiren bir noktadır.\n\n' +
      'Basit alan karşılaştırmaları hızlıdır. Ama **kullanıcı çıkışı** içinde ' +
      'tablo okuması yapılıyorsa, her belge kaydında o okuma tekrarlanır.\n\n' +
      'Yoğun kayıt yapılan sistemlerde bu birikir. ' +
      '**İyi pratik:** kullanıcı çıkışında tablo okuması yapılacaksa ' +
      'sonuç bellekte önbelleğe alınmalıdır.',

    bestPractices:[
      'Geçişte **aktif kuralların envanterini çıkar** — özellikle ikameler. ' +
      'Belgelenmemiş olanlar geçişte kaybolur veya sürpriz yaratır.',
      'Etkinlik seviyelerinin canlıya **doğru taşındığını** doğrula; ' +
      'en sık geçiş sorunu budur.',
      'Yeni gereksinimlerde **Custom Fields and Logic** alternatifini değerlendir — ' +
      'daha görünür ve yükseltmeye dayanıklı.',
      'Kullanıcı çıkışı kullanan kuralları gözden geçir; ' +
      'BAdI veya standart çözüme taşınabilir mi?',
      'Boyut alanlarını ({{kar-merkezi}}, segment) değiştiren ikameleri ' +
      '{{belge-bolme}} ile birlikte **yeniden test et**.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Kâr merkezi neden hep aynı geliyor? — belgelenmemiş bir ikame',
    hikaye:
      '**Batı Gıda A.Ş.**’de kontrolör bir tuhaflık fark ediyor: ' +
      'Pazarlama departmanının girdiği bazı giderler, kâr merkezi olarak ' +
      '**PC-1000 (Üretim)** görünüyor — oysa kullanıcılar PC-2000 (Satış) giriyor.\n\n' +
      'Kullanıcılar ısrarlı: *"Biz PC-2000 giriyoruz, kaydedince PC-1000 oluyor."*\n\n' +
      'Mizan doğru, fiş dengeli, hata mesajı yok. ' +
      'Sistem yöneticisi *"kullanıcı yanlış giriyor"* diyor.\n\n' +
      'Bu senaryo, belgelenmemiş bir ikamenin nasıl yıllarca sessizce çalıştığını ' +
      've nasıl teşhis edildiğini gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · dönem 11/2027' },
      { k:'Belirti', v:'Girilen PC-2000 → kaydedilen **PC-1000**' },
      { k:'Etkilenen', v:'Yalnızca **770300** hesabına yapılan kayıtlar' },
      { k:'Hata mesajı', v:'**Yok**' },
      { k:'Ne zamandan beri', v:'Bilinmiyor' },
    ],

    adimlar:[
      { baslik:'Belirti doğrulanır — kullanıcı haklı mı?', tcode:'FB03',
        aciklama:'Şüpheli bir belge açılıp değişiklik izi kontrol ediliyor.',
        girdi:[
          { alan:'Belge', deger:'1900007742 · 770300 gider · 45.000 TL' },
          { alan:'Kaydedilen kâr merkezi', deger:'**PC-1000**' },
          { alan:'Ortam → Değişiklikler', deger:'**Kayıt sonrası değişiklik yok**' },
          { alan:'Çıkarım', deger:'Değer **kayıt anında** böyle yazılmış' },
        ],
        not:'{{degisiklik-belgesi}} boş — yani kimse sonradan değiştirmemiş.\n\n' +
             'Demek ki değer **kayıt anında** PC-1000 olarak yazılmış. ' +
             'İki ihtimal var: kullanıcı gerçekten öyle girdi, ' +
             'veya **bir kural değiştirdi**.\n\n' +
             'Kullanıcılar ısrarlı olduğu için ikinci ihtimal araştırılıyor.' },

      { baslik:'Desen aranıyor — hangi kayıtlar etkilenmiş?', tcode:'FBL3N',
        aciklama:'Etkilenen kayıtların ortak noktası bulunmaya çalışılıyor.',
        girdi:[
          { alan:'770300 hesabı — tüm kalemler', deger:'184 kalem' },
          { alan:'Kâr merkezi PC-1000', deger:'**184 kalem — hepsi**' },
          { alan:'Diğer gider hesapları (770100, 770200)', deger:'Kâr merkezleri **karışık** — normal' },
          { alan:'Desen', deger:'Yalnızca **770300** hesabı, **istisnasız** PC-1000' },
        ],
        not:'**Desen çok net:** tek bir hesapta, istisnasız aynı değer.\n\n' +
             'Kullanıcı hatası bu kadar tutarlı olamaz — 184 kayıtta ' +
             'hiç istisna olmaması **bir kuralın** varlığını gösteriyor.\n\n' +
             'Hesap bazlı olduğu için önkoşulun hesap olduğu tahmin ediliyor.' },

      { baslik:'İkame aranıyor', tcode:'OBBH',
        aciklama:'Şirket koduna atanmış ikame olup olmadığı kontrol ediliyor.',
        girdi:[
          { alan:'Şirket kodu', deger:'1000' },
          { alan:'Çağrı noktası', deger:'**Kalem**' },
          { alan:'Atanmış ikame', deger:'**`Z_PRCTR_DERIVE`** — var!' },
          { alan:'Etkinlik seviyesi', deger:'**1** (aktif)' },
        ],
        not:'**İkame bulundu.** Şirket koduna atanmış ve aktif.\n\n' +
             'Buraya bakmak akla **en son** gelen şeydi — ' +
             'ikamenin sessizliğinin teşhisi zorlaştırdığının somut örneği.\n\n' +
             'Sistem yöneticisi bile böyle bir kural olduğunu bilmiyordu.' },

      { baslik:'Kural incelenir', tcode:'GGB1',
        aciklama:'İkamenin ne yaptığı ve neden kurulduğu araştırılıyor.',
        girdi:[
          { alan:'İkame adı', deger:'`Z_PRCTR_DERIVE`' },
          { alan:'**Açıklama**', deger:'**Boş** — hiçbir açıklama yazılmamış' },
          { alan:'Önkoşul', deger:'`BSEG-HKONT` = `0000770300`' },
          { alan:'Hedef alan', deger:'`BSEG-PRCTR`' },
          { alan:'Değer', deger:'Sabit **PC-1000**' },
          { alan:'"Alan boşsa" koşulu', deger:'**YOK** — kullanıcının girdiğini **eziyor**' },
        ],
        not:'**İki tasarım hatası bir arada:**\n\n' +
             '**1. Açıklama boş.** Kuralın neden kurulduğu **hiçbir yerde yazılı değil**. ' +
             'İkame sessiz çalıştığı için tek iz açıklama alanıydı ve o da boş.\n\n' +
             '**2. Boş/dolu kontrolü yok.** Kural, alan dolu olsa bile ' +
             '**üzerine yazıyor**. Kullanıcının girdiği PC-2000 eziliyor.\n\n' +
             'Bu ikinci hata, kullanıcı şikâyetinin doğrudan sebebi.' },

      { baslik:'Kuralın geçmişi araştırılıyor', tcode:'SE16N',
        aciklama:'Kural ne zaman ve neden kurulmuş?',
        girdi:[
          { alan:'Taşıma isteği kaydı', deger:'2024 · eski danışman firması' },
          { alan:'Proje dokümanı', deger:'İkameye dair **kayıt yok**' },
          { alan:'Muhtemel gerekçe', deger:'770300 o zaman **yalnızca Üretim** tarafından kullanılıyordu' },
          { alan:'Değişen ne?', deger:'2026’da hesap **Pazarlama’ya da açıldı** — kural güncellenmedi' },
        ],
        not:'**Kural kurulduğunda doğruydu.** 2024’te 770300 hesabı yalnızca ' +
             'Üretim tarafından kullanılıyordu; kâr merkezini otomatik doldurmak ' +
             'kullanıcı yükünü azaltıyordu.\n\n' +
             '2026’da hesap Pazarlama’ya da açıldı ama **kural güncellenmedi**. ' +
             'O günden beri Pazarlama’nın girdiği kâr merkezi eziliyor.\n\n' +
             'Bu, {{konu:cost-center}}’daki {{OKB9}} varsayılanının eskimesiyle ' +
             '**aynı hata sınıfıdır**: bir kural kurulduğunda doğruydu, ' +
             'organizasyon değişti, kural güncellenmedi.' },

      { baslik:'Düzeltme — kural iyileştiriliyor', tcode:'GGB1',
        aciklama:'Kural kaldırılmıyor, doğru çalışacak hâle getiriliyor.',
        girdi:[
          { alan:'Önkoşula eklenen', deger:'**`BSEG-PRCTR` = boş**' },
          { alan:'Etki', deger:'Yalnızca **boş** alanları doldurur; girileni **ezmez**' },
          { alan:'Açıklama yazıldı', deger:'"770300 hesabında kâr merkezi boşsa PC-1000 türet (2024 kararı, ' +
                                          '2027’de boş-kontrolü eklendi)"' },
          { alan:'Test', deger:'PC-2000 girildi → **korundu** ✓ · boş bırakıldı → PC-1000 ✓' },
        ],
        fis:{ baslik:'Test kaydı — düzeltme sonrası', belgeTuru:'KR', tarih:'25.11.2027',
          satirlar:[
            { hesap:'770300', ad:'Dijital pazarlama — kullanıcı **PC-2000** girdi', borc:45000,
              not:'Kaydedilen: **PC-2000** ✓ — artık ezilmiyor' },
            { hesap:'320', ad:'Satıcılar', alacak:45000 },
          ], not:'Kullanıcının girdiği değer **korundu**.\n\n' +
                 'Boş bırakıldığında ise kural devreye giriyor ve PC-1000 yazıyor — ' +
                 'yani orijinal fayda **kaybolmadı**.\n\n' +
                 '**Doğru tasarım:** ikame boşluğu doldurur, kararı ezmez.' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'`PRCTR` = PC-2000 — kullanıcının girdiği değer' },
          { tablo:'ACDOCA', ne:'Aynı değer yansıdı' },
        ],
        not:'**Geçmiş kayıtlar düzelmedi.** 2026–2027 arası ' +
             'yanlış kâr merkezine düşmüş kayıtlar duruyor.\n\n' +
             'Düzeltme için {{KB11N}} ile CO içinde taşıma gerekir ' +
             '(bkz. {{konu:cost-center}}) — FI zaten doğru.' },

      { baslik:'Kalıcı önlemler', tcode:'GGB1',
        aciklama:'Aynı sınıf hatanın tekrarlanmaması için üç önlem.',
        girdi:[
          { alan:'Önlem 1', deger:'**Tüm aktif ikameler listelendi** — 7 adet bulundu, 4’ünün açıklaması boştu' },
          { alan:'Önlem 2', deger:'Hepsine iş diliyle **açıklama yazıldı**' },
          { alan:'Önlem 3', deger:'İkame listesi **proje dokümanına** eklendi; devir teslimde aktarılacak' },
          { alan:'Önlem 4', deger:'Yeni ikame kuralı: **açıklama zorunlu** + **"alan boşsa" koşulu** standart' },
        ],
        not:'**Birinci önlem en çok şey ortaya çıkardı:** 7 aktif ikame vardı ve ' +
             'sistem yöneticisi **hiçbirini bilmiyordu**.\n\n' +
             'Dördünün açıklaması boştu; ikisi de kullanıcının girdiğini eziyordu. ' +
             'Biri artık gereksizdi (hesap kapatılmış) ve **kaldırıldı**.\n\n' +
             'Bu envanter çalışması, ikame konusunun neden ' +
             '**belgelenmek zorunda** olduğunun kanıtı.' },
    ],

    sonuc:
      '**Belgelenmemiş bir ikame iki yıl boyunca kullanıcının girdiğini sessizce ezdi.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. İkame sessizdir ve teşhiste akla en son gelir.** ' +
      'Doğrulama hata mesajı verir; ikame **hiçbir şey söylemez**. ' +
      'Kullanıcı bir değer girer, sistem başkasını kaydeder. ' +
      'Bu vakada sistem yöneticisi bile böyle bir kural olduğunu bilmiyordu — ' +
      '**7 aktif ikamenin hiçbirini**.\n\n' +
      '**2. İkame yalnızca boş alanları doldurmalıdır.** ' +
      'Önkoşula **"alan boşsa"** koşulu eklenmemişse kural, kullanıcının ' +
      'bilinçli girdiği değeri **ezer**. Kullanıcı *"ben öyle girmedim"* der ve haklıdır. ' +
      'Bu tek koşul, şikâyetin doğrudan çözümüydü — ve orijinal faydayı da korudu.\n\n' +
      '**3. Açıklama alanı fiilen zorunludur.** ' +
      'İkame sessiz çalıştığı için **tek iz** açıklamadır. ' +
      'Boş bırakılırsa kural, sebebi bilinmeyen bir sistem davranışına dönüşür ve ' +
      'kimse dokunmaya cesaret edemez. Envanterde 4 kuralın açıklaması boştu.\n\n' +
      '**4. Kurallar organizasyon değişince eskir.** ' +
      'Bu kural 2024’te **doğruydu** — hesap yalnızca Üretim tarafından kullanılıyordu. ' +
      '2026’da hesap Pazarlama’ya açıldı, kural güncellenmedi. ' +
      'Bu, {{konu:cost-center}}’daki {{OKB9}} varsayılanının eskimesiyle ' +
      '**tam olarak aynı hata sınıfıdır**: kural doğruydu, dünya değişti, kural kalmaya devam etti. ' +
      '**Aktif kural envanteri periyodik gözden geçirilmelidir.**',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '**Doğrulama engeller, ikame değiştirir** — temel ayrım budur.',
      'Doğrulama **görünürdür** (hata mesajı); ikame **sessizdir** (kullanıcı fark etmez).',
      'Her ikisi de aynı yapıyı kullanır: **önkoşul** (hangi durumda) + **kural** (ne yapılsın).',
      'Üç adım zorunludur: **tanımla ({{GGB0}}/{{GGB1}}) → ata ({{OB28}}/{{OBBH}}) → etkinleştir ({{GGB4}})**.',
      '**Çağrı noktası** erişimi belirler: kalem noktası **başlık alanını yazamaz**.',
      'Mesaj tipi kuralın gücünü belirler: **E** engeller · **W** geçilebilir · **I** bilgi.',
      '{{GB01}} hangi alanın kullanılabilir/değiştirilebilir olduğunu tutar.',
      '**İkame yalnızca boş alanları doldurmalı** ve **belgelenmelidir**.',
    ],

    onemliNoktalar:[
      '**"Doğrulama ile ikame farkı nedir?"** **Doğrulama engeller, ikame değiştirir.** Doğrulama veriye dokunmaz, kaydı reddeder ve kullanıcı **hata mesajı görür**. İkame alan değerini **sessizce** doldurur/değiştirir — kullanıcı fark etmez. Bu, ikamenin hem gücü hem riskidir.',
      '**"Kural tanımladım ama çalışmıyor. Neden?"** Üç adımdan biri eksiktir: **tanım** → **atama** ({{OB28}}/{{OBBH}}) → **etkinleştirme** ({{GGB4}} seviye 1/2). Vakaların çoğu **etkinleştirmede** çözülür. Dördüncü ihtimal: yanlış çağrı noktası.',
      '**"Çağrı noktası neden önemli?"** Erişimi belirler. **Kalem** noktasındaki ikame **başlık alanını yazamaz**; **başlık** noktasındaki kural kalem alanlarını **okuyamaz**. Satırlar arası ilişkiye bakan kural **tam belge** noktasında olmalıdır.',
      '**"Etkinlik seviyesi 2 ne demek?"** **Toplu giriş hariç** aktif. Veri yüklemelerinde ({{toplu-giris}}, {{LSMW}}) kural devre dışı kalır — çünkü yüklenen eski veri bugünün kuralını sağlamayabilir. Ama bu bir **açık kapıdır**; kritik kontrollerde seviye **1** kullanılır.',
      '**"İkame neden riskli?"** **Sessiz veri değişikliği.** Kullanıcı bir değer girer, sistem başkasını kaydeder ve hiçbir mesaj çıkmaz. Belgelenmemişse yıllar sonra sebebi bilinmeyen bir davranışa dönüşür. Çözüm: önkoşula **"alan boşsa"** koşulu + **açıklama yazmak**.',
      '**"Mesaj tipi neden kritik?"** **E** kaydı engeller (tek gerçek koruma). **W** uyarır ama kullanıcı **geçebilir** — ilk yoğun günde herkes geçer ve kural fiilen kalkar. Politika dayatılacaksa **E** kullanılmalıdır.',
      '**"Bir alanı ikame edemiyorum. Neden?"** {{GB01}}’de o alan ikameye **kapalıdır**. Tablo değiştirilebilir ama **SAP notu olmadan yapılmamalıdır** — kapalılık veri bütünlüğü için kasıtlı olabilir.',
      '**"Doğrulama ile ikame sırası nedir?"** **İkame önce çalışır, doğrulama sonra.** Yani doğrulama, ikamenin **değiştirdiği değeri** kontrol eder — kullanıcının girdiğini değil. Bu, beklenmedik etkileşimlere yol açabilir.',
    ],

    sikHatalar:[
      { hata:'Kuralı tanımlayıp etkinleştirmeyi atlamak.', dogru:'{{GGB4}} ile seviye **1** veya **2** yapılmalıdır. "Kural çalışmıyor" vakalarının en sık sebebidir.' },
      { hata:'Önkoşulu boş bırakmak.', dogru:'Kural **her kayıtta** çalışır ve sistemi kullanılamaz hâle getirir. Acil durumda {{GGB4}} seviye 0 ile durdurulur.' },
      { hata:'İkameye "alan boşsa" koşulu eklememek.', dogru:'Kullanıcının bilinçli girdiği değer **ezilir**; *"ben öyle girmedim"* şikâyeti doğar.' },
      { hata:'İkamenin açıklamasını boş bırakmak.', dogru:'Sessiz çalıştığı için **tek iz** açıklamadır. Boşsa kural sebebi bilinmeyen bir davranışa dönüşür.' },
      { hata:'Sadece pozitif test yapmak.', dogru:'**Negatif test daha önemlidir:** normal kayıtlar geçiyor mu? Fazla geniş önkoşul işi durdurur.' },
      { hata:'Kritik kontrolü **W (uyarı)** ile kurmak.', dogru:'Kullanıcı geçebilir; ilk yoğun günde kural fiilen kalkar. Politika dayatılacaksa **E** kullanılır.' },
      { hata:'Kalem noktasında başlık alanını değiştirmeye çalışmak.', dogru:'Kalem noktası başlık alanını **yazamaz**. Başlık noktası kullanılır — ama o noktada kalem alanları okunamaz.' },
      { hata:'Aktif kuralların envanterini tutmamak.', dogru:'İkameler sessizdir; belgelenmemiş kurallar devir teslimde kaybolur ve yıllar sonra sürpriz yaratır.' },
    ],

    ipuclari:[
      '**Karar sorusu tek:** *"Kullanıcı bu kaydı yapabilsin mi?"* ' +
      'Hayır → doğrulama · Evet ama alan şöyle olsun → ikame.',
      'Üç adımı kontrol listesi yap: **tanımla → ata → etkinleştir**.',
      '**Negatif test** yap: normal kayıtlar geçiyor mu?',
      'İkamede **"alan boşsa"** koşulu standart olsun; kullanıcının kararını ezme.',
      'Her kuralın açıklamasını **iş diliyle** yaz — yıllar sonra okunacak.',
      '**Aktif kural envanterini** proje dokümanında tut ve periyodik gözden geçir; ' +
      'organizasyon değişince kurallar eskir.',
    ],

    quiz:[
      { soru:'Doğrulama ile ikame arasındaki temel fark nedir?',
        secenekler:[
          'Doğrulama FI’da, ikame CO’da çalışır',
          '**Doğrulama kaydı engeller; ikame alan değerini değiştirir**',
          'İkame daha hızlıdır',
          'Doğrulama yalnızca uyarı verir',
        ], dogru:1,
        aciklama:'**Doğrulama** veriye **dokunmaz** — koşul sağlanmazsa kaydı **reddeder** ve ' +
                 'kullanıcı **hata mesajı görür**.\n\n' +
                 '**İkame** engellemez — alan değerini **doldurur veya değiştirir** ve ' +
                 '**sessizce** çalışır; kullanıcı fark etmez.\n\n' +
                 'Bu sessizlik, ikamenin hem gücü hem en büyük riskidir.' },

      { soru:'Bir kural tanımladın ama çalışmıyor. Hangi sırayla kontrol edilir?',
        secenekler:[
          'Yetki → dönem → hesap',
          '**Tanım → atama ({{OB28}}/{{OBBH}}) → etkinleştirme ({{GGB4}}) → çağrı noktası**',
          'Doğrudan yeniden tanımlanır',
          'Taşıma isteği kontrol edilir',
        ], dogru:1,
        aciklama:'Kural kurmak **üç adımdır** ve son ikisi sık atlanır:\n\n' +
                 '**1.** Tanım ({{GGB0}}/{{GGB1}}) — tek başına hiçbir şey yapmaz\n' +
                 '**2.** Atama ({{OB28}}/{{OBBH}}) — şirket koduna + çağrı noktasına\n' +
                 '**3.** **Etkinleştirme** ({{GGB4}} seviye 1/2) — ' +
                 'seviye 0 ise kural **pasiftir**\n\n' +
                 'Vakaların çoğu üçüncüde çözülür. Dördüncü ihtimal: **yanlış çağrı noktası**.' },

      { soru:'Kalem çağrı noktasındaki bir ikame başlık alanını değiştirebilir mi?',
        secenekler:[
          'Evet, tüm alanlara erişir',
          '**Hayır — okuyabilir ama yazamaz**',
          'Yalnızca belge türünü değiştirebilir',
          'Etkinlik seviyesine bağlıdır',
        ], dogru:1,
        aciklama:'Çağrı noktası **erişimi belirler**. Kalem noktasındaki ikame ' +
                 'başlık alanlarını **okuyabilir** ama **yazamaz**.\n\n' +
                 'Tersi de geçerlidir: başlık noktasındaki kural kalem alanlarını ' +
                 '**okuyamaz** (hesap, tutar).\n\n' +
                 'Satırlar arası ilişkiye bakan kurallar için **tam belge** noktası kullanılır — ' +
                 'örneğin *"belgede 100 hesabı varsa toplam 50.000’i geçmesin"*.' },

      { soru:'Etkinlik seviyesi **2** ne anlama gelir ve riski nedir?',
        secenekler:[
          'İki kez çalışır',
          'Yalnızca uyarı verir',
          '**Toplu giriş hariç aktif — toplu giriş yoluyla kural atlatılabilir**',
          'Pasif',
        ], dogru:2,
        aciklama:'Seviye **2**, kuralın {{toplu-giris}} işlemlerinde **çalışmamasını** sağlar.\n\n' +
                 '**Neden var:** veri geçişinde yüklenen **eski veri**, bugünün kuralını ' +
                 'sağlamayabilir. Kural seviye 1 olsaydı geçmiş veri yüklenemezdi.\n\n' +
                 '**Riski:** bu bir **açık kapıdır**. Toplu giriş yoluyla ' +
                 'kural atlatılabilir. Kritik kontrollerde seviye **1** tercih edilmelidir.' },

      { soru:'İkame kullanıcının girdiği değeri eziyor. Doğru çözüm nedir?',
        secenekler:[
          'İkame kaldırılır',
          'Etkinlik seviyesi 0 yapılır',
          '**Önkoşula "alan boşsa" koşulu eklenir**',
          'Doğrulamaya çevrilir',
        ], dogru:2,
        aciklama:'İkame **yalnızca boş alanları doldurmalıdır**. ' +
                 'Önkoşula *"alan boşsa"* koşulu eklendiğinde:\n\n' +
                 '• Kullanıcı değer girdiyse → **korunur**\n' +
                 '• Boş bıraktıysa → kural devreye girer\n\n' +
                 'Böylece orijinal fayda **kaybolmaz** ama kullanıcının bilinçli kararı ' +
                 '**ezilmez**. Kuralı kaldırmak gerekmez.' },

      { soru:'Kritik bir politika kuralı hangi mesaj tipiyle kurulmalıdır?',
        secenekler:[
          'W (uyarı) — kullanıcı bilgilenir',
          '**E (hata) — kayıt engellenir**',
          'I (bilgi) — en esnek',
          'Fark etmez',
        ], dogru:1,
        aciklama:'**E (hata)** tek gerçek korumadır — kayıt **engellenir** ve ' +
                 'kullanıcı geçemez.\n\n' +
                 '**W (uyarı)** ile kurulan kural, kullanıcının **Enter ile geçebildiği** ' +
                 'bir tavsiyedir. Pratikte ilk yoğun günde herkes geçmeye başlar ve ' +
                 'kural **fiilen kalkar**.\n\n' +
                 'Politika gerçekten dayatılacaksa **E** kullanılmalıdır.' },

      { soru:'Doğrulama ve ikame hangi sırayla çalışır ve bunun sonucu nedir?',
        secenekler:[
          'Doğrulama önce, ikame sonra',
          '**İkame önce, doğrulama sonra — doğrulama değiştirilmiş değeri kontrol eder**',
          'Aynı anda',
          'Rastgele',
        ], dogru:1,
        aciklama:'**İkame önce** çalışır ve alanları değiştirir; **doğrulama sonra** ' +
                 'çalışır ve **değiştirilmiş son hâli** kontrol eder.\n\n' +
                 'Pratik sonucu: doğrulama, kullanıcının girdiğini **görmez** — ' +
                 'ikamenin ürettiği değeri görür.\n\n' +
                 'Bu, beklenmedik etkileşimlere yol açabilir: ikame bir alanı değiştirir, ' +
                 'doğrulama o yeni değeri reddeder ve kullanıcı ' +
                 '*"ben o değeri girmedim ki"* der — haklıdır.' },

      { soru:'Bir alanı ikame edemiyorsun. Sebep ve doğru yaklaşım nedir?',
        secenekler:[
          'Yetki eksik — yetki talep edilir',
          'Kural yanlış — yeniden yazılır',
          '**{{GB01}}’de alan ikameye kapalı — SAP notu olmadan açılmamalıdır**',
          'Çağrı noktası değiştirilir',
        ], dogru:2,
        aciklama:'{{GB01}} tablosu hangi alanın doğrulamada **kullanılabileceğini** ve ' +
                 'ikamede **değiştirilebileceğini** tutar.\n\n' +
                 'Tablo teknik olarak değiştirilebilir — ama **SAP notu olmadan ' +
                 'yapılmamalıdır**. Bazı alanların ikameye kapalı olması ' +
                 '**kasıtlıdır** ve veri bütünlüğünü korur.\n\n' +
                 'Önce farklı bir çağrı noktası veya farklı bir çözüm aranmalıdır.' },
    ],

    flashcards:[
      { on:'Doğrulama vs İkame', arka:'**Doğrulama** → **ENGELLER**\nVeriye dokunmaz · kullanıcı **hata mesajı görür**\nGGB0 + OB28\n\n**İkame** → **DEĞİŞTİRİR**\nAlanı doldurur/değiştirir · **SESSİZ**\nGGB1 + OBBH' },
      { on:'Kural kurmanın üç adımı', arka:'**1. Tanımla** — GGB0 / GGB1\n**2. Ata** — OB28 / OBBH (şirket kodu + çağrı noktası)\n**3. ETKİNLEŞTİR** — GGB4 (seviye 1/2)\n\n3. adım **en sık atlanan**; "kural çalışmıyor" vakalarının çoğu burada.' },
      /* ⚠️ Dış italik KALDIRILDI: italik tek satırlıktır ve içinde yıldız
         taşıyamaz; bu satır hem `\n` hem `**kalın**` içeriyordu ve
         ham `*` olarak çiziliyordu (bkz. Ders #28). Vurguyu zaten
         içteki kalınlar taşıyor. */
      { on:'Karar sorusu: doğrulama mı ikame mi?', arka:'**"Kullanıcı bu kaydı yapabilsin mi?"**\n\n**Hayır** → doğrulama (engelle)\n**Evet ama alan şöyle olsun** → ikame (doldur)\n\nAlan bir **karar** taşıyorsa (kâr merkezi) → doğrulama.\nAlan **mekanik** ise (tarih) → ikame.' },
      { on:'Çağrı noktaları ve kısıtları', arka:'**Başlık (0001)** → başlık alanları · kalem alanlarını **okuyamaz**\n**Kalem (0002)** → en yaygın · başlık alanını **YAZAMAZ**\n**Tam belge (0003)** → satırlar arası ilişki için **tek uygun** nokta' },
      { on:'Mesaj tipleri', arka:'**E (hata)** → kayıt **engellenir** ← tek gerçek koruma\n**W (uyarı)** → kullanıcı **geçebilir** ilk yoğun günde kural fiilen kalkar\n**I (bilgi)** → yalnızca bilgilendirir\n\nPolitika dayatılacaksa **E**.' },
      { on:'Etkinlik seviyeleri (GGB4)', arka:'**0** → pasif\n**1** → aktif\n**2** → **toplu giriş hariç** aktif\n\n*Seviye 2 neden var:* geçişte yüklenen eski veri bugünün kuralını sağlamayabilir.\n\nAma **açık kapı** — kritik kontrollerde **1**.' },
      { on:'İkamenin en büyük riski', arka:'**Sessiz veri değişikliği.**\n\nKullanıcı bir değer girer → sistem başkasını kaydeder → **hiçbir mesaj yok**.\n\nBelgelenmemişse yıllar sonra *"bu alan neden hep böyle doluyor?"* → **kimse bilmez**.' },
      { on:'İkame tasarımının üç kuralı', arka:'**a)** Yalnızca **boş alanları** doldur → önkoşula *"alan boşsa"* ekle\n**b)** **Açıklamayı iş diliyle** yaz → sessiz çalıştığı için tek iz\n**c)** Aktif ikamelerin **listesini** proje dokümanında tut' },
      { on:'İkame ve doğrulama sırası', arka:'**İkame ÖNCE, doğrulama SONRA.**\n\n→ Doğrulama, ikamenin **değiştirdiği** değeri kontrol eder — kullanıcının girdiğini **değil**.\n\nBeklenmedik etkileşim: ikame değiştirir, doğrulama reddeder → *"ben o değeri girmedim"*.' },
      { on:'GB01 tablosu ne yapar?', arka:'Hangi alanın **doğrulamada kullanılabileceğini** ve **ikamede değiştirilebileceğini** tutar.\n\nFI belgeleri için boolean sınıfı **09**.\n\nDeğiştirilebilir ama **SAP notu olmadan yapılmamalı** — kapalılık kasıtlı olabilir.' },
      { on:'Önkoşulu boş bırakmak', arka:'Kural **HER KAYITTA** çalışır → sistem kullanılamaz hâle gelir.\n\n**Acil çözüm:** GGB4 → seviye **0** (kuralı silmeye gerek yok — güvenlik valfi)\n\n**Kalıcı:** önkoşulu daralt + **negatif test** yap.' },
      { on:'Neden negatif test daha önemli?', arka:'**Pozitif test:** kural yakalaması gerekeni engelliyor mu?\n**Negatif test:** **normal kayıtlar geçiyor mu?**\n\nFazla geniş önkoşul → **iş durur**. ' +
        'Yakalamayan kural rahatsız edicidir; **durduran kural felakettir**.' },
    ],
  },

  },
});
