/* ==========================================================================
   content/fi/error-handling.js — "Error Handling (Hata Yönetimi ve Çözümler)"
   ========================================================================== */

SAP.registerTopic({
  id: 'error-handling',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Bu konu bir **hata sözlüğü değildir**. SAP’ta binlerce mesaj vardır; ' +
      'hepsini ezberlemek mümkün değildir ve gerekmez.\n\n' +
      'Öğretilen şey **teşhis yöntemidir**: bir hatayı gördüğünde ' +
      'hangi sırayla, nereye bakacağın.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Tüm FI hataları üç sınıfa girer** ve sınıfı bilmek çözümün yerini söyler:\n\n' +
      '**① Konuşan hata** — sistem sana ne olduğunu **söyler**.\n' +
      '*"Dönem 10 şirket kodu 1000 için kapalı"* · *"Hesap belirleme yapılamadı"*\n' +
      '→ Mesajın kendisi çözümü işaret eder. **En kolay sınıf.**\n\n' +
      '**② Sessiz hata** — sistem **hiçbir şey söylemez**, sonuç yanlıştır.\n' +
      'Boş liste · eksik satır · yanlış kâr merkezi · muhasebeleşmemiş belge\n' +
      '→ **En tehlikeli sınıf.** Kullanıcı çoğu zaman fark etmez.\n\n' +
      '**③ Çöken hata** — program durur, teknik ekran gelir (dump).\n' +
      '→ Nadir ama gürültülü. {{ST22}} ile analiz edilir.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Danışmanı ayıran şey ① değil ②’dir.** ' +
      'Konuşan hatayı herkes çözer — mesajı okur, ayarı düzeltir. ' +
      'Sessiz hatayı **fark edebilmek** deneyim ister.',

    neden:
      '**Zaman.** Yanlış yerde arama, FI destek işinin en büyük maliyetidir. ' +
      'Yöntemi olan danışman dakikalarda, olmayan saatlerde çözer.\n\n' +
      '**Doğru soru.** *"Hata veriyor"* bir bilgi değildir. ' +
      '*"Hangi işlem, hangi mesaj numarası, hangi kullanıcı, ne zaman"* bilgidir.\n\n' +
      '**Kök sebep.** Belirtiyi düzeltmek hatayı **erteler**. ' +
      'Dönemi elle açmak bugünü kurtarır; **neden kapalıydı** sorusu yarını kurtarır.\n\n' +
      '**Sessizleri görmek.** En pahalı hatalar mesaj vermeyenlerdir. ' +
      'Ay sonunda değil, **aylar sonra** bulunurlar.',

    sirketOnemi:
      'Muhasebe hatası **geriye dönük düzeltilemez** — yalnızca **yeni belgeyle** düzeltilir. ' +
      'SAP’ta muhasebeleşmiş bir belge hiçbir kodla **silinemez**.\n\n' +
      'Bunun somut sonucu şudur:\n\n' +
      '**Hata önlenirse** → sıfır belge.\n' +
      '**Hata sonradan bulunursa** → orijinal + ters kayıt + doğru kayıt = **üç belge**.\n\n' +
      'Üç belge yalnızca fazla iş değildir: mizanda görünür, denetimde sorulur, ' +
      've düzeltme **başka bir döneme** düşerse karşılaştırmalı raporları bozar.\n\n' +
      'Bu yüzden hata yönetimi bir **teşhis** konusu olduğu kadar bir ' +
      '**önleme** konusudur — ve önlemenin aracı {{konu:dogrulama-ikame}}’dir.\n\n' +
      '**Sık karşılaşılan soru:** *"Kullanıcı bir rapor açıyor, liste boş geliyor, ' +
      'hata da vermiyor. Nereden başlarsın?"* ' +
      'Bu soru, ② sınıfını tanıyıp tanımadığını ölçer.',

    gercekHayat:
      'Kullanıcı arıyor: **"Fatura kaydedemiyorum, hata veriyor."**\n\n' +
      'Bu cümlede **hiçbir kullanılabilir bilgi yoktur**. ' +
      'Deneyimsiz danışman sisteme girer, denemeye başlar ve saatler kaybeder.\n\n' +
      'Deneyimli danışman **dört soru** sorar:\n\n' +
      '**1.** Hangi işlem kodu? → *{{FB60}}*\n' +
      '**2.** Mesajın **tam metni** ve numarası? → *F5 201*\n' +
      '**3.** Hangi kullanıcı, hangi şirket kodu? → *MUHASEBE07, 1000*\n' +
      '**4.** **Daha önce çalışıyor muydu?** → *Dün çalışıyordu*\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Dördüncü soru en değerlisidir** ve en çok atlanan sorudur.\n\n' +
      '*"Hiç çalışmadı"* → **yapılandırma** eksik. Yeni bir hesap, yeni bir vergi kodu, ' +
      'yeni bir şirket kodu olabilir.\n\n' +
      '*"Dün çalışıyordu"* → **bir şey değişti**. Taşıma geldi, dönem kapandı, ' +
      'rol değişti, ana veri güncellendi.\n\n' +
      'Bu iki cevap **tamamen farklı yerlere** bakmayı gerektirir. ' +
      'Sormadan başlamak, yanlış yarısını aramak demektir.',

    muhasebeMantigi:
      'FI hatalarının çoğu aslında **muhasebenin kendi kurallarının** sistemdeki karşılığıdır. ' +
      'Sistem keyfî engel koymaz — **muhasebe ilkesini korur**.\n\n' +
      '**"Dönem kapalı"** → *Kapanmış döneme kayıt yapılmaz.* ' +
      'Kapanan dönemin mizanı beyan edilmiştir; sonradan kayıt beyanı geçersiz kılar.\n\n' +
      '**"Belge dengesiz"** → *Her borcun bir alacağı vardır.* ' +
      'Çift taraflı kayıt ilkesinin doğrudan uygulaması.\n\n' +
      '**"Hesap belirleme yapılamadı"** → *Otomatik kayıt hangi hesaba gideceğini bilmeli.* ' +
      'Sistem hesabı **tahmin etmez** — tanımlanmamışsa durur. Doğru davranış budur.\n\n' +
      '**"Hesap kilitli / kayda kapalı"** → *Kullanılmayan hesaba kayıt yanlıştır.*\n\n' +
      '**"Alan zorunlu"** → *Maliyet gideri bir maliyet nesnesine düşmelidir.*\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Bu bakış açısının pratik faydası büyüktür:** hatayı *"sistem izin vermiyor"* ' +
      'diye değil, *"muhasebe kuralı ne diyor?"* diye okursun.\n\n' +
      'O zaman çözüm de değişir: **engeli kaldırmak** yerine ' +
      '**kuralın neden devreye girdiğini** anlarsın. ' +
      'Çoğu zaman hata haklıdır ve asıl yanlış olan **girilmek istenen kayıttır**.',

    kavramlar: ['kilitleme', 'guncelleme-hatasi', 'yetki-nesnesi', 'tampon',
                'belge-denkligi', 'alan-durumu', 'tasima-istegi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Teşhis **sabit bir sırayla** yapılır. Sıra önemlidir: her adım ' +
      'bir sonrakinin arama alanını daraltır. Sıçramak, yanlış yerde aramaya yol açar.',

    roller:[
      { rol:'Kullanıcı', gorev:'Hatayı bildirir — genelde eksik bilgiyle.' },
      { rol:'Danışman', gorev:'**Dört soruyu** sorar: işlem · mesaj · kullanıcı · "önce çalışıyor muydu?"' },
      { rol:'Danışman', gorev:'Mesaj numarasını alır — `F5 201` gibi. Metin değil **numara** aranır.' },
      { rol:'Danışman', gorev:'Sınıfı belirler: konuşan · sessiz · çöken.' },
      { rol:'Danışman', gorev:'Sınıfa göre aracı seçer: {{OBA5}} · {{SU53}} · {{SM12}} · {{SM13}} · {{SLG1}} · {{ST22}}' },
      { rol:'Danışman', gorev:'**Kök sebebi** bulur — belirtiyi değil.' },
      { rol:'Danışman', gorev:'Çözer, doğrular ve **aynı sınıfı tarar**.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'FI hata teşhisi — sabit sıra',
      adimlar:[
        { ic:'📞', rol:'Kullanıcı', baslik:'Hata bildirilir',
          aciklama:'*"Fatura kaydedemiyorum"* — kullanılabilir bilgi **yok**.',
          cikti:'Belirsiz bildirim', ok:'dört soru' },
        { ic:'❓', rol:'Danışman', baslik:'Dört soru sorulur',
          aciklama:'İşlem kodu · **mesaj numarası** · kullanıcı+şirket kodu · ' +
                   '**"daha önce çalışıyor muydu?"**\n\n' +
                   'Dördüncüsü aramayı **ikiye böler**: hiç çalışmadıysa yapılandırma, ' +
                   'dün çalışıyorsa **değişiklik**.',
          cikti:'Yapılandırılmış bilgi', ok:'sınıflandır' },
        { ic:'🧭', rol:'Danışman', baslik:'Hata sınıfı belirlenir',
          aciklama:'**① Konuşan** — mesaj var, çözümü işaret ediyor.\n' +
                   '**② Sessiz** — mesaj yok, sonuç yanlış.\n' +
                   '**③ Çöken** — program durdu, dump ekranı.',
          cikti:'Sınıf', ok:'araç seçilir' },
        { ic:'💬', rol:'Danışman', baslik:'① Konuşan hata — mesajın kaynağına git',
          aciklama:'Mesaj numarası (`F5 201`) alınır. ' +
                   'Uzun metin okunur — çoğu mesaj **çözümü kendisi yazar**. ' +
                   'Mesaj sınıfı değiştirilebilir mi: {{OBA5}}',
          cikti:'Ayar düzeltmesi', ok:'sessizse' },
        { ic:'🔇', rol:'Danışman', baslik:'② Sessiz hata — üç ihtimali sırayla ele',
          aciklama:'**Veri var mı?** {{SE16N}} ile tabloya bak.\n' +
                   '**Yetki var mı?** Hemen {{SU53}}.\n' +
                   '**Kayıt gerçekten oluştu mu?** {{SM13}} — {{guncelleme-hatasi}}.',
          cikti:'Kök sebep', ok:'çökmüşse' },
        { ic:'💥', rol:'Danışman', baslik:'③ Çöken hata — {{ST22}}',
          aciklama:'Dump analizi. Çoğu dump **veri hatasıdır**, program hatası değil: ' +
                   'sıfıra bölme, eksik özelleştirme, taşmış alan.',
          cikti:'Teknik neden', ok:'toplu işlemse' },
        { ic:'📜', rol:'Danışman', baslik:'Toplu işlemse günlüğe bak',
          aciklama:'Ekrandaki özet yetmez. {{SLG1}} ayrıntılı günlük, ' +
                   '{{SM37}} işin durumu, {{SP01}} çıktı kuyruğu.',
          cikti:'Satır bazında hata', ok:'çöz' },
        { ic:'✓', rol:'Danışman', baslik:'Kök sebep çözülür ve **aynı sınıf taranır**',
          aciklama:'Bir kullanıcıda çıkan hata genelde **yalnız değildir**. ' +
                   'Aynı rolü, aynı hesabı, aynı vergi kodunu kullanan ' +
                   'diğerleri de kontrol edilir.',
          cikti:'Kalıcı çözüm' },
      ],
    },

    adimlar:[
      { rol:'Danışman', eylem:'Mesaj numarasını alır', sistem:'Mesajın üstüne çift tıkla → uzun metin' },
      { rol:'Danışman', eylem:'Sınıfı belirler', sistem:'Konuşan / sessiz / çöken' },
      { rol:'Danışman', eylem:'Yetki kontrol eder', sistem:'{{SU53}} — **hemen sonra**' },
      { rol:'Danışman', eylem:'Kilit kontrol eder', sistem:'{{SM12}}' },
      { rol:'Danışman', eylem:'Güncelleme hatası arar', sistem:'{{SM13}}' },
      { rol:'Danışman', eylem:'Toplu işlem günlüğünü okur', sistem:'{{SLG1}} · {{SM37}}' },
      { rol:'Danışman', eylem:'Dump analiz eder', sistem:'{{ST22}}' },
      { rol:'Danışman', eylem:'Aynı sınıfı tarar', sistem:'Diğer kullanıcı / hesap / kod' },
    ],

    veriAkisi:{
      nereden:'Kullanıcı ekranı, toplu işlem günlüğü veya dump.',
      nereye:'Kök sebep: özelleştirme · ana veri · yetki · zamanlama.',
      tetikleyen:'Kayıt denemesi · toplu çalıştırma · rapor açma.',
      sonraki:'Düzeltme + **aynı sınıfın taranması** + gerekiyorsa önleyici kural.',
    },

    notlar:[
      { tip:'tip', baslik:'Mesaj numarası metinden değerlidir', metin:
        'Hata mesajının **metnini** aramak zayıf bir stratejidir: ' +
        'metin dile göre değişir, sürümle güncellenir ve çeviri eksik olabilir.\n\n' +
        '**Mesaj numarası değişmez.** Biçimi: **sınıf + numara** → `F5 201`\n\n' +
        '**Numaraya nasıl ulaşılır:** mesajın üzerine **çift tıkla** → ' +
        'uzun metin açılır. Uzun metin çoğu zaman şunları içerir:\n\n' +
        '• **Teşhis** — ne oldu\n' +
        '• **Sistem yanıtı** — sistem ne yaptı\n' +
        '• **Prosedür** — **ne yapılması gerektiği**\n\n' +
        'Üçüncü bölüm çoğu vakayı **tek başına** çözer ve ' +
        'yeni danışmanların en çok atladığı yerdir.\n\n' +
        '**Sık görülen mesaj sınıfları:**\n' +
        '`F5` FI belge kaydı · `FS` G/L · `F4` fatura · `AA` duran varlık · ' +
        '`KI` CO · `M8` MM fatura doğrulama · `GLT` toplam kayıtları' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Hatanın kendisi kayıt üretmez — ama **hatalı kaydın düzeltilmesi** üretir. ' +
      'Ve düzeltmenin maliyeti, hatanın **ne zaman** bulunduğuna bağlıdır.\n\n' +
      'Aşağıdaki üç fiş, aynı hatanın üç farklı zamanda bulunmasının bedelini gösterir.',

    etkilenenHesaplar:[
      { hesap:'Hatalı gider hesabı', tur:'Gelir tablosu', neden:'Yanlış hesaba atılan tutar **dönem sonucunu** bozar.' },
      { hesap:'İlgili KDV hesabı', tur:'Bilanço', neden:'Yanlış vergi kodu **beyanı** etkiler — {{BSET}}.' },
      { hesap:'Karşı hesap', tur:'Değişken', neden:'Ters kayıt **aynı hesapları** ters yönde çalıştırır.' },
      { hesap:'—', tur:'Kayıt sayısı', neden:'Önlenirse **0** belge · sonradan bulunursa **3** belge.' },
    ],

    fisler:[
      { baslik:'① Hata önlendi — kayıt hiç oluşmadı (0 belge)',
        belgeTuru:'KR', tarih:'10.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:100000, not:'Maliyet yeri **girildi** ✓' },
          { hesap:'191', ad:'İndirilecek KDV', borc:20000 },
          { hesap:'320', ad:'Satıcılar', alacak:120000 },
        ],
        not:'**En ucuz senaryo.** {{konu:dogrulama-ikame}} kuralı ' +
             'maliyet yeri boşken kaydı **engelledi**; kullanıcı doldurdu ve doğru kayıt oluştu.\n\n' +
             'Sistemde **tek belge** var ve o da doğru. ' +
             'Düzeltme yok, ters kayıt yok, denetimde açıklama yok.\n\n' +
             '**Önleyici kontrolün değeri budur** — ve bu değer ' +
             'yalnızca aşağıdaki iki fişle karşılaştırınca görülür.' },

      { baslik:'② Hata aynı dönemde bulundu — ters kayıt + doğru kayıt (3 belge)',
        belgeTuru:'KR', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar', borc:120000, not:'{{FB08}} ters kayıt' },
          { hesap:'770', ad:'Genel yönetim gideri', alacak:100000 },
          { hesap:'191', ad:'İndirilecek KDV', alacak:20000 },
        ],
        not:'Orijinal belge **yerinde kalır** — SAP’ta muhasebeleşmiş belge **silinemez**.\n\n' +
             '{{FB08}} yeni bir belge üretir ve ikisini {{BKPF}} `STBLG` alanıyla bağlar. ' +
             'Sonra **doğru kayıt** üçüncü belge olarak girilir.\n\n' +
             '**Toplam: 3 belge.** Mizanda görünür ama aynı dönemde olduğu için ' +
             'dönem sonucu **doğru** çıkar.\n\n' +
             'Kabul edilebilir maliyet — ama önlenebilirdi.' },

      { baslik:'③ Hata sonraki dönemde bulundu — en pahalısı',
        belgeTuru:'SA', tarih:'08.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'760', ad:'Pazarlama gideri (doğru hesap)', borc:100000 },
          { hesap:'770', ad:'Genel yönetim gideri (yanlış hesap)', alacak:100000 },
        ],
        not:'**En pahalı senaryo.** Hata Kasım’da yapıldı, **Ocak’ta** bulundu.\n\n' +
             'Üç ek sorun doğar:\n\n' +
             '**1. Dönem kapalı.** Kasım’a kayıt yapılamaz; düzeltme **Ocak’a** düşer.\n\n' +
             '**2. Karşılaştırmalı raporlar bozulur.** Kasım’ın gideri fazla, ' +
             'Ocak’ınki eksik görünür. *"Ocak’ta pazarlama gideri neden patladı?"* sorusu gelir.\n\n' +
             '**3. Beyan verilmiş olabilir.** Vergi kodu da yanlışsa ' +
             '**düzeltme beyannamesi** gerekir — muhasebe işi olmaktan çıkar.\n\n' +
             'Bu fiş yalnızca **hesap düzeltmesidir**; KDV doğruydu. ' +
             'Yanlış olsaydı {{BSET}} de düzeltilmeliydi ve iş çok daha büyürdü.' },
    ],

    tHesaplar:[
      { hesap:'Genel yönetim gideri — üç belgenin izi', kod:'770',
        borc:[{ ad:'① Orijinal (yanlış hesap)', tutar:100000 }],
        alacak:[
          { ad:'② {{FB08}} ters kayıt', tutar:100000 },
          { ad:'③ Ocak düzeltmesi', tutar:0 },
        ],
        not:'Hesap **kapanıyor** ama üç satır iz bırakıyor' },
    ],

    notlar:[
      { tip:'warn', baslik:'Düzeltmenin maliyeti zamanla üstel artar', metin:
        'Aynı hata, bulunduğu ana göre **tamamen farklı** maliyetler doğurur:\n\n' +
        '**Kayıt anında** → 0 belge · 0 dakika\n' +
        '**Aynı gün** → 3 belge · 10 dakika\n' +
        '**Aynı dönem içinde** → 3 belge · mizan kontrolü gerekir\n' +
        '**Dönem kapandıktan sonra** → 3 belge + **yanlış döneme düşen düzeltme** + ' +
        'karşılaştırmalı rapor bozulması\n' +
        '**Beyan verildikten sonra** → yukarıdakiler + **düzeltme beyannamesi**\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Bu tablo, hata yönetiminin neden bir önleme konusu olduğunu gösterir.**\n\n' +
        'Danışmanlıkta doğru refleks, hatayı hızlı çözmek **değil**, ' +
        'aynı hatanın tekrar edip edemeyeceğini sormaktır:\n\n' +
        '*"Bu neden mümkün oldu ve nasıl imkânsız hâle getirilir?"*\n\n' +
        'Cevap genelde üçünden biridir: {{konu:dogrulama-ikame}} kuralı · ' +
        '{{alan-durumu}} zorunlu yapma · veya {{OB52}} dönem disiplini.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Aşağıda FI’da **en sık karşılaşılan hatalar** üç sınıfa ayrılmış hâlde. ' +
      'Her biri için: **ne demek · neden oluyor · nasıl çözülür · kalıcı önlem**.\n\n' +
      '━━━━━━━━━━\n\n' +
      '** Konuşan hatalar (①)** — mesaj var, çözümü işaret ediyor. ' +
      'Sıkıcı ama kolay; mesajın uzun metnini okumak çoğunu bitirir.\n\n' +
      '** Sessiz hatalar (②)** — mesaj yok, sonuç yanlış. ' +
      '**Bu konunun asıl değeri buradadır.** Bunları bilmeyen danışman ' +
      'hatanın varlığından bile haberdar olmaz.\n\n' +
      '** Çöken hatalar (③)** — program durur. Gürültülü ama nadir.',

    liste:[
      /* ---------- ① KONUŞAN ---------- */
      { ad:'① · "Dönem kapalı" — `F5 201` / `FGV 007`', en:'Posting period closed',
        aciklama:'{{OB52}}’de o dönem, o hesap türü için açık değil.',
        neZaman:'Ay başında ve ay sonunda; en sık görülen FI hatası.',
        ornek:'**Kontrol sırası:**\n\n' +
              '**1.** {{OB52}} → dönem varyantı → hesap türü satırı\n' +
              '**2.** **Hesap türü ayrımını atlama:** `+` genel satırdır ama ' +
              '`S` (G/L), `K` (satıcı), `D` (müşteri), `A` (varlık) **ayrı satır** olabilir. ' +
              'Satıcı kaydı için `K` kapalıysa `+` açık olsa bile hata alırsın.\n' +
              '**3.** İki tarih aralığı vardır: normal dönem ve **özel dönem** (13–16).\n' +
              '**4.** Varlık kaydıysa ayrıca **AA dönemi** kontrol edilir.\n\n' +
              '**Kalıcı önlem:** dönem açma/kapama **takvime bağlanır** ve ' +
              'yetki tek kişide toplanır. Herkes {{OB52}} yetkisi alırsa ' +
              'dönem disiplini çöker.',
        tcodes:['OB52'] },

      { ad:'① · "Hesap belirleme yapılamadı"', en:'Account determination error',
        aciklama:'Otomatik kayıt hangi hesaba gideceğini **bulamıyor**. ' +
                 'Sistem hesabı tahmin etmez — tanımsızsa durur.',
        neZaman:'Yeni malzeme, yeni vergi kodu, yeni değerleme sınıfı devreye girince.',
        ornek:'**Modül hangi tabloya bakacağını söyler:**\n\n' +
              '**MM** kaynaklı ise → {{OBYC}} (`BSX` stok, `WRX` GR/IR, `PRD` fiyat farkı)\n' +
              '**SD** kaynaklı ise → {{VKOA}}\n' +
              '**Vergi** ise → {{OB40}} / {{T030K}}\n' +
              '**Duran varlık** ise → {{AO90}}\n\n' +
              '**En sık sebep: yeni bir değerleme sınıfı** açılmış ama ' +
              '{{OBYC}}’ye satır eklenmemiş.\n\n' +
              '**Kalıcı önlem:** yeni değerleme sınıfı / vergi kodu açma sürecine ' +
              '*"hesap ataması yapıldı mı?"* adımı eklenir.',
        tcodes:['OBYC','VKOA','OB40'] },

      { ad:'① · "Belge dengesiz" — borç ≠ alacak', en:'Document not balanced',
        aciklama:'Çift taraflı kayıt ilkesi. Ekranda görünmeyen bir satır olabilir.',
        neZaman:'Elle çok satırlı kayıtta; toplu yüklemede.',
        ornek:'**Görünmeyen sebepler:**\n\n' +
              '• **Kuruş farkı** — döviz çevriminde yuvarlama\n' +
              '• **Vergi satırı** otomatik eklenip toplamı değiştirmiş\n' +
              '• **{{belge-bolme}}** aktifse: belge girişte denk ama ' +
              '**defter görünümünde** bölme boyutu (kâr merkezi) dolu olmadığı için denksiz\n\n' +
              'Üçüncüsü en kafa karıştırıcıdır: hata *"dengesiz"* der ' +
              'ama sorun **denge değil, eksik bölme karakteristiğidir** ' +
              '(bkz. {{konu:new-gl}}).\n\n' +
              '**Not:** park etme denklik aramaz ({{konu:document-parking}}) — ' +
              'bu hata yalnızca **muhasebeleştirmede** çıkar.',
        tcodes:['FB50','FBV0'] },

      { ad:'① · "Hesap kayda kapalı / kilitli"', en:'Account blocked for posting',
        aciklama:'{{FS00}}’de hesap kilitli veya **silme işareti** konmuş.',
        neZaman:'Hesap planı düzenlemesi sonrası; devir hesaplarında.',
        ornek:'**Üç ayrı ayar karıştırılır:**\n\n' +
              '**Kayda kapalı** — geçici, kaldırılabilir\n' +
              '**Silme işareti** — hesap kaldırılacak, kullanılmamalı\n' +
              '**Şirket kodunda yok** — hesap **planda** var ama bu şirket kodunda **açılmamış**\n\n' +
              'Üçüncüsü farklı bir mesaj verir ve çözümü de farklıdır: ' +
              '{{FS00}}’de **şirket kodu verisi eklenir** ({{SKB1}}).\n\n' +
              'Kilidi kaldırmadan önce sor: **neden kilitliydi?** ' +
              'Genelde bir sebebi vardır.',
        tcodes:['FS00'] },

      { ad:'① · "Alan zorunlu" / "Alan değiştirilemez"', en:'Field status error',
        aciklama:'{{alan-durumu}} grubu alanı zorunlu ya da gizli yapmış.',
        neZaman:'Yeni hesap açılınca; kâr merkezi/maliyet yeri zorunluluğunda.',
        ornek:'**Alan durumu iki yerden gelir ve ikisi de geçerlidir:**\n\n' +
              '**1.** G/L hesabının **alan durumu grubu** ({{FS00}} → {{OBC4}})\n' +
              '**2.** **Kayıt anahtarının** alan durumu ({{OB41}})\n\n' +
              'İkisi çakışırsa **daha kısıtlayıcı olan kazanır**. ' +
              'Bu yüzden *"hesapta opsiyonel yaptım ama hâlâ zorunlu istiyor"* olur — ' +
              'kayıt anahtarı zorunlu tutuyordur.\n\n' +
              '**Ayrıca:** {{konu:dogrulama-ikame}} kuralı da alan zorunluluğu ' +
              'dayatabilir. Alan durumu temizse **doğrulamaya** bak.',
        tcodes:['FS00','OBC4','OB41'] },

      { ad:'① · "Yetkiniz yok" — net mesajlı hâli', en:'Not authorized',
        aciklama:'`S_TCODE` yok — işlem **hiç başlamıyor**.',
        neZaman:'Yeni kullanıcı, rol değişikliği, taşıma sonrası.',
        ornek:'**{{SU53}}** ile eksik nesne görülür, ekran görüntüsü ' +
              'yetkilendirme ekibine gider.\n\n' +
              '**{{SU53}} yalnızca SON başarısız kontrolü gösterir** — ' +
              'hemen çalıştırılmalı.\n\n' +
              '**"Dün çalışıyordu" ise:** {{SU01}} → rol **geçerlilik tarihi**. ' +
              'Süresi dolmuş roller sessizce düşer.\n\n' +
              'Rol atandıktan sonra **oturum kapatılıp açılmalı** — ' +
              'yetkiler oturum başında {{tampon}}a alınır.\n\n' +
              '**Bu hatanın sessiz kardeşi aşağıda** — asıl tehlikeli olan o.',
        tcodes:['SU53','SU01','PFCG'] },

      /* ---------- ② SESSİZ ---------- */
      { ad:'② · Boş liste — hata yok, veri yok sanılıyor', en:'Empty result, no error',
        aciklama:'**En yanıltıcı FI hatası.** İşlem açılıyor, çalışıyor, boş dönüyor.',
        neZaman:'Rapor ve döküm işlemlerinde; yeni kullanıcılarda.',
        ornek:'**Üç farklı sebep, aynı belirti:**\n\n' +
              '**1. Veri yetkisi yok.** `S_TCODE` var ama `F_BKPF_BUK` yok. ' +
              'Rapor yetkiyi **süzgeç** olarak uygular; yetkisiz şirket kodu ' +
              '**hiç sorgulanmaz** → boş sonuç, program açısından **hata değil** ' +
              '(bkz. {{konu:tcodes}}).\n\n' +
              '**2. Kalem yönetimi kapalı.** G/L hesabında açık değilse döküm alınamaz ' +
              've **geriye dönük açılamaz** (bkz. {{konu:reporting}}).\n\n' +
              '**3. Seçim yanlış.** Tarih aralığı, "açık kalem" tarihi, şirket kodu.\n\n' +
              '**Teşhis sırası:** {{SE16N}} ile tabloda veri var mı → ' +
              'varsa **hemen** {{SU53}} → sonra hesap ayarı.',
        tcodes:['SU53','SE16N'] },

      { ad:'② · Belge numarası verildi ama belge yok', en:'Update termination',
        aciklama:'{{guncelleme-hatasi}}. Numara **diyalogda** verilir, kayıt ' +
                 '**güncelleme görevinde** yazılır. İkincisi çökerse numara yanar.',
        neZaman:'Toplu yüklemelerde ve yoğun anlarda; tek tek kayıtta nadir.',
        ornek:'**{{SM13}}** ile güncelleme kayıtları incelenir.\n\n' +
              '**Neden bu kadar tehlikeli:** kullanıcı ekranda ' +
              '*"Belge 1900001234 kaydedildi"* mesajını **görür** ve işine devam eder. ' +
              'Belge yoktur.\n\n' +
              'Toplu yüklemede **hiç fark edilmez** — 500 kayıttan 14’ü ' +
              'sessizce kaybolur (bkz. {{konu:sap-tables}} senaryosu).\n\n' +
              '**Kalıcı önlem:** toplu yükleme sonrası **sayı mutabakatı** ' +
              'zorunlu adım olmalı: gönderilen = oluşan.',
        tcodes:['SM13','SM21'] },

      { ad:'② · Kayıt oluyor ama alan değerleri "kendiliğinden" değişiyor', en:'Silent substitution',
        aciklama:'Aktif bir **ikame** kullanıcının girdiğini eziyor.',
        neZaman:'Kâr merkezi, maliyet yeri, iş alanı gibi türetilen alanlarda.',
        ornek:'Belirti kullanıcı diliyle şöyle gelir: ' +
              '*"Ben doğru girdim ama raporda başka görünüyor."*\n\n' +
              'Teşhiste **akla en son gelen** şeydir çünkü ikame **sessizdir** — ' +
              'hiçbir mesaj vermez (bkz. {{konu:dogrulama-ikame}}).\n\n' +
              '**Kontrol:** {{GGB1}} ikame tanımı · {{OBBH}} atama · {{GGB4}} etkinlik.\n\n' +
              '**Kalıcı önlem:** aktif ikame **envanteri** tutulur ve ' +
              'her ikamenin açıklaması **iş diliyle** yazılır. ' +
              'Açıklaması boş bir ikame, iki yıl sonra kimsenin çözemeyeceği bir tuzaktır.',
        tcodes:['GGB1','OBBH','GGB4'] },

      { ad:'② · Ayar değiştirildi ama etkisi görünmüyor', en:'Buffer / transport issue',
        aciklama:'İki farklı sebep: **{{tampon}}** veya **taşıma gelmemiş**.',
        neZaman:'Özelleştirme değişikliği sonrası.',
        ornek:'**Önce hangisi olduğunu ayır:**\n\n' +
              '**Tampon** — değişikliği **sen** yaptın, aynı sistemde. ' +
              '{{T001}}, {{T004}}, {{T030}} tamponlanır. ' +
              'Çözüm: oturumu kapat/aç; olmazsa `/$sync` ' +
              '( canlıda tüm kullanıcıları etkiler).\n\n' +
              '**Taşıma** — değişiklik **başka sistemde** yapıldı. ' +
              '{{tasima-istegi}} canlıya gelmemiş veya **hatayla** gelmiş. ' +
              'Kontrol: `STMS` taşıma günlüğü, dönüş kodu.\n\n' +
              '**Dönüş kodu 4 "başarılı" değildir** — uyarıyla geçti demektir ' +
              've bazı nesneler gelmemiş olabilir.',
        tcodes:['SE16N'] },

      { ad:'② · CO’da var, FI’da yok (veya tersi)', en:'FI-CO reconciliation gap',
        aciklama:'Gerçek zamanlı bütünleşme kopmuş veya işlem **yalnızca CO içi**.',
        neZaman:'Maliyet yeri aktarmalarından sonra.',
        ornek:'**Önce normal olanı ele:** {{KB11N}} ile yapılan ' +
              'CO içi yeniden kaydetme **FI’ı hiç ilgilendirmez** — ' +
              'FI zaten doğrudur, yalnızca CO nesnesi yanlıştı. ' +
              'Bu bir hata **değildir** (bkz. {{konu:cost-center}}).\n\n' +
              '**Gerçek sorun** ise gerçek zamanlı bütünleşmenin çalışmamasıdır: ' +
              '{{FAGLCOFIRTINT}} ayarı, {{KANK}} numara aralığı eksikliği.\n\n' +
              '{{KANK}} eksikse **FI kaydı da durur** — CO numara aralığı ' +
              'olmadan FI/CO ortak LUW tamamlanamaz.',
        tcodes:['KB11N','FAGLCOFIRTINT','KANK'] },

      { ad:'② · Toplu işlem "bitti" dedi ama sonuç eksik', en:'Batch partial failure',
        aciklama:'Ekrandaki özet mesaj **yeterli değildir**.',
        neZaman:'{{F110}}, {{AFAB}}, {{F.05}}, {{FF_5}} sonrası.',
        ornek:'**Üç ayrı yere bakılır ve üçü farklı şey söyler:**\n\n' +
              '**{{SM37}}** — iş **çalıştı mı, bitti mi**?\n' +
              '**{{SLG1}}** — **satır bazında ne oldu?** ({{BALHDR}})\n' +
              '**{{SP01}}** — çıktı üretildi mi?\n\n' +
              'Bir iş **"başarıyla tamamlandı"** görünürken ' +
              'günlükte onlarca hata satırı olabilir. ' +
              'İşin durumu **program çöktü mü** sorusunu cevaplar, ' +
              '**iş doğru yapıldı mı** sorusunu değil.\n\n' +
              '{{F110}} özelinde: **öneri** ile **ödeme** ayrı adımlardır; ' +
              'öneride bloke edilen kalemler sessizce dışarıda kalır.',
        tcodes:['SM37','SLG1','SP01'] },

      /* ---------- ③ ÇÖKEN ---------- */
      { ad:'③ · Program çöktü — dump ekranı', en:'ABAP short dump',
        aciklama:'{{ST22}} ile analiz edilir. Çoğu **veri hatasıdır**, program hatası değil.',
        neZaman:'Nadir; genelde beklenmedik veri veya eksik özelleştirmede.',
        ornek:'**{{ST22}}’de okunacak üç şey:**\n\n' +
              '**Hata tipi** — `CX_SY_ZERODIVIDE` sıfıra bölme · ' +
              '`CONVT_NO_NUMBER` sayı bekleyen alana metin · ' +
              '`TABLE_INVALID_INDEX` eksik satır\n' +
              '**Kaynak satır** — hangi programın neresinde\n' +
              '**"Kullanıcı ne yapıyordu"** — hangi işlem, hangi veri\n\n' +
              '**Yaygın yanlış refleks:** *"program bozuk, geliştiriciye gönder."*\n' +
              'Çoğu dump **eksik özelleştirmeden** doğar: tanımsız kur, ' +
              'sıfır ömürlü amortisman anahtarı, boş numara aralığı.\n\n' +
              'Önce **veriyi** kontrol et — çoğu vaka orada biter.',
        tcodes:['ST22','SM21'] },

      { ad:'③ · İşlem donuyor / kayıt kaydedilmiyor', en:'Lock / enqueue',
        aciklama:'{{kilitleme}} — başka bir kullanıcı veya iş aynı nesneyi tutuyor.',
        neZaman:'{{F110}} çalışırken; aynı ana veriyi iki kişi açtığında.',
        ornek:'**{{SM12}}** ile kilit sahibi ve zamanı görülür.\n\n' +
              '**En sık senaryo:** {{F110}} çalışırken kullanıcı aynı satıcıya ' +
              'ödeme yapmaya çalışıyor → ödeme programı kalemi **kilitlemiş**.\n\n' +
              '**Kilit elle silinmez** — çalışan işlem yarım kalır ve ' +
              'tutarsız veri bırakabilir.\n\n' +
              '**Doğru sıra:** ① {{SM12}}’de sahibi bul ② {{SM37}}’de iş hâlâ ' +
              'çalışıyor mu bak ③ çalışıyorsa **bekle** ④ iş çökmüş ve kilit ' +
              '**artık sahipsizse** Basis ile birlikte kaldır.',
        tcodes:['SM12','SM37'] },
    ],

    karsilastirmaBasliklar:['Konuşan hata (①)', 'Sessiz hata (②)'],
    karsilastirma:[
      ['Mesaj', 'Var — çözümü işaret eder', '**Yok**'],
      ['Fark edilme', 'Anında', '**Günler / aylar sonra**'],
      ['Kullanıcı davranışı', 'Bildirir', '**Etrafından dolaşır**'],
      ['Teşhis zorluğu', 'Düşük', '**Yüksek**'],
      ['Tipik araç', '{{OBA5}} · mesaj uzun metni', '{{SU53}} · {{SM13}} · {{SLG1}}'],
      ['Muhasebe etkisi', 'Kayıt **oluşmaz** — zarar yok', '**Yanlış kayıt oluşur**'],
      ['Düzeltme maliyeti', 'Sıfır', '**3 belge + dönem sorunu**'],
      ['Önleme aracı', 'Zaten önlüyor', '{{konu:dogrulama-ikame}} · mutabakat'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'SU53', ad:'Yetki hatası analizi — **hemen sonra** çalıştır',
        amac:'Son başarısız yetki kontrolünü gösterir.',
        neZaman:'Yetki mesajında **ve** boş liste geldiğinde.',
        adimlar:[
          { baslik:'Kullanıcı hatayı alır veya **boş liste** görür' },
          { baslik:'**Hemen** {{SU53}} çalıştırılır',
            aciklama:'Araya başka işlem girerse iz **kaybolur** — yalnızca son kontrol tutulur.' },
          { baslik:'Başarısız nesne ve eksik değer okunur',
            aciklama:'`F_BKPF_BUK` + `BUKRS` = 2000 gibi.' },
          { baslik:'Ekran görüntüsü yetkilendirme ekibine gider' },
          { baslik:'Rol atandıktan sonra **oturum kapatılıp açılır**',
            aciklama:'Yetkiler oturum başında {{tampon}}a alınır.' },
        ],
        ekranAkisi:[
          { ekran:'Belirti', islem:'{{FBL5N}} açıldı, **boş liste**, hata **yok**' },
          { ekran:'{{SU53}}', islem:'Başarısız: **`F_BKPF_BUK`** · `BUKRS` = **2000**' },
          { ekran:'Mevcut', islem:'Kullanıcıda yalnızca `BUKRS` = 1000' },
          { ekran:'Çözüm', islem:'İkinci rol atandı → oturum yenilendi → **47 kalem** ✓' },
        ],
        alanlar:{ zorunlu:[], opsiyonel:['Başka kullanıcı için görüntüleme (yetki gerekir)'] },
        hatalar:[
          { mesaj:'{{SU53}} "yetki kontrolü başarılı" diyor', sebep:'Araya başka işlem girmiş, iz kaybolmuş.', cozum:'Hatayı **tekrarlat**, hemen ardından çalıştır.' },
          { mesaj:'Rol atandı ama hâlâ çalışmıyor', sebep:'Yetkiler oturum başında {{tampon}}a alınır.', cozum:'Oturumu kapatıp aç. Devam ederse {{SU01}}’de rolün **geçerlilik tarihini** kontrol et.' },
          { mesaj:'Hata yok ama liste boş', sebep:'Veri yetkisi süzgeç olarak uygulanmış.', cozum:'Tam olarak bu araç için: boş listeden **hemen sonra** {{SU53}}.' },
        ],
        ipucu:'**Kullanıcılara "{{SU53}} refleksi" öğretmek**, bu konudaki ' +
              'en yüksek getirili tek eylemdir.\n\n' +
              'Sessiz bir hatayı **görünür kılabilecek tek kişi onu yaşayandır**. ' +
              'Kullanıcı boş liste görünce *"veri yok"* deyip geçerse, ' +
              'hata aylarca sürer.\n\n' +
              'Öğretilecek kural tek cümle: ' +
              '**"Boş liste gördün mü, hemen {{SU53}} çalıştır ve ekran görüntüsü al."**',
        ilgili:['SU01','PFCG','SE16N'] },

      { kod:'SM13', ad:'Güncelleme hataları — "numara var, belge yok"',
        amac:'Çöken güncelleme görevlerini gösterir.',
        neZaman:'Belge numarası verilmiş ama belge bulunamıyorsa; **her toplu yükleme sonrası**.',
        adimlar:[
          { baslik:'Kullanıcı, tarih aralığı ve durum girilir',
            aciklama:'Durum: **Hata (Err)** seçilir.' },
          { baslik:'Kayda çift tıkla — hata mesajı ve modül görünür' },
          { baslik:'Kök sebep okunur',
            aciklama:'Genelde kilit çakışması, tablo alanı taşması veya özel kod hatası.' },
          { baslik:'Gerekirse güncelleme **yeniden çalıştırılır** veya silinir',
            aciklama:'Bu karar Basis ile birlikte verilir.' },
        ],
        ekranAkisi:[
          { ekran:'Belirti', islem:'*"Belge 1900001234 kaydedildi"* — ama {{FB03}}’te **yok**' },
          { ekran:'{{SM13}}', islem:'Durum **Err** · kullanıcı · tarih' },
          { ekran:'Ayrıntı', islem:'`FI` modülü · kilit çakışması' },
          { ekran:'Kapsam', islem:'Aynı yüklemede **14 kayıt** aynı durumda' },
        ],
        alanlar:{ zorunlu:['Kullanıcı','Tarih'], opsiyonel:['Durum','İstemci'] },
        hatalar:[
          { mesaj:'{{SM13}} boş görünüyor', sebep:'Kayıtların saklama süresi dolmuş veya tarih aralığı dar.', cozum:'Aralığı genişlet; çok eskiyse iz kalmamış olabilir.' },
          { mesaj:'Numara yandı, tekrar kullanılamıyor', sebep:'Numara diyalogda verilir, güncellemede yazılır.', cozum:'Normaldir. Belge numaralarında **boşluk** oluşur; denetimde açıklanabilir olmalı.' },
        ],
        ipucu:'**Toplu yükleme sonrası {{SM13}} kontrolü zorunlu adım olmalıdır.**\n\n' +
              'Tek tek kayıtta güncelleme hatası nadirdir ve kullanıcı fark eder. ' +
              'Toplu yüklemede **hiç fark edilmez**: 500 kayıt gönderilir, ' +
              '486’sı oluşur, 14’ü sessizce kaybolur.\n\n' +
              'Basit ve etkili önlem: **sayı mutabakatı** — ' +
              'gönderilen kayıt sayısı = oluşan belge sayısı. ' +
              'Eşit değilse {{SM13}}.',
        ilgili:['SM21','SM12','ST22'] },

      { kod:'SLG1', ad:'Uygulama günlüğü — toplu işlemin gerçek sonucu',
        amac:'Ekrandaki özet mesajın **arkasındaki ayrıntıyı** gösterir.',
        neZaman:'{{F110}}, {{AFAB}}, {{F.05}}, {{FF_5}} sonrası.',
        adimlar:[
          { baslik:'Nesne ve alt nesne seçilir', aciklama:'Hangi programın günlüğü.' },
          { baslik:'Tarih ve kullanıcı ile daraltılır' },
          { baslik:'Mesaj sınıfına göre süzülür',
            aciklama:'**Kırmızı** hata · **sarı** uyarı · **yeşil** bilgi. Önce kırmızılar.' },
          { baslik:'Satır bazında hata okunur', aciklama:'Hangi belge / satıcı / varlık başarısız oldu.' },
        ],
        ekranAkisi:[
          { ekran:'{{SM37}}', islem:'İş durumu: **Başarıyla tamamlandı** ✓' },
          { ekran:'{{SLG1}}', islem:'Aynı iş → **17 kırmızı mesaj**' },
          { ekran:'Çelişki', islem:'İş çökmedi ama **17 kalem işlenmedi**' },
          { ekran:'Ders', islem:'İş durumu ≠ işin doğru yapılması' },
        ],
        alanlar:{ zorunlu:['Nesne','Tarih'], opsiyonel:['Alt nesne','Kullanıcı','Mesaj sınıfı'] },
        hatalar:[
          { mesaj:'Günlük bulunamadı', sebep:'Program günlük yazmıyor veya saklama süresi dolmuş.', cozum:'{{SM37}} iş günlüğüne bak; bazı programlar yalnızca liste çıktısı üretir ({{SP01}}).' },
          { mesaj:'Çok fazla mesaj var', sebep:'Bilgi mesajları da geliyor.', cozum:'Yalnızca **kırmızı** ile süz; {{BALHDR}} `PROBCLASS` alanı sınıfı tutar.' },
        ],
        ipucu:'**{{SM37}} ile {{SLG1}} farklı sorulara cevap verir** ve ' +
              'karıştırılmaları en sık yapılan teşhis hatasıdır:\n\n' +
              '**{{SM37}}** → *"Program çalıştı mı, çöktü mü?"*\n' +
              '**{{SLG1}}** → *"İş doğru yapıldı mı?"*\n\n' +
              'Bir iş **"başarıyla tamamlandı"** görünürken günlükte ' +
              'onlarca hata satırı olabilir — program çökmemiştir, ' +
              'sadece bazı kalemleri işleyememiştir.\n\n' +
              '**Toplu işlemde her ikisine de bakılır.**',
        ilgili:['SM37','SP01','BALHDR'] },

      { kod:'OBA5', ad:'Mesaj kontrolü — hatayı uyarıya çevirmek',
        amac:'Bazı mesajların sınıfını değiştirir: hata (E) ↔ uyarı (W) ↔ kapalı (-).',
        neZaman:'İş süreci gereği bir kontrolün gevşetilmesi veya **sıkılaştırılması** gerektiğinde.',
        adimlar:[
          { baslik:'Uygulama alanı girilir', aciklama:'`F5`, `F4`, `AA` gibi mesaj sınıfı.' },
          { baslik:'Mesaj numarası ve kullanıcı adı girilir',
            aciklama:'Kullanıcı **boş** bırakılırsa **herkes** için geçerlidir.' },
          { baslik:'Yeni sınıf seçilir', aciklama:'`E` hata · `W` uyarı · `I` bilgi · `-` kapalı' },
          { baslik:'Taşıma isteğine kaydedilir' },
        ],
        ekranAkisi:[
          { ekran:'İstek', islem:'*"Bu uyarı her kayıtta çıkıyor, kapatalım"*' },
          { ekran:'Kontrol', islem:'Mesajın **sınıfı değiştirilebilir mi?** Çoğu değiştirilemez' },
          { ekran:'Karar', islem:'Kapatmadan önce: **uyarı neden çıkıyor?**' },
          { ekran:'Sonuç', islem:'Kök sebep düzeltildi — mesaj zaten çıkmıyor' },
        ],
        alanlar:{ zorunlu:['Uygulama alanı','Mesaj numarası','Yeni sınıf'], opsiyonel:['Kullanıcı adı'] },
        hatalar:[
          { mesaj:'Mesaj listede yok', sebep:'Her mesajın sınıfı değiştirilemez.', cozum:'Yalnızca SAP’ın izin verdiği mesajlar {{OBA5}}’te görünür. Görünmüyorsa **değiştirilemez** — kök sebebi çöz.' },
          { mesaj:'Değişiklik etkili olmuyor', sebep:'Kullanıcı adı alanı dolu.', cozum:'Belirli bir kullanıcı için tanımlanmış; herkes için boş bırakılır.' },
        ],
        ipucu:'**{{OBA5}} bir "hatayı sustur" aracı değildir.**\n\n' +
              'En sık kötüye kullanımı budur: uyarı rahatsız edince kapatılır, ' +
              've uyarının **koruduğu şey** ortadan kalkar.\n\n' +
              '**Doğru kullanım iki yönlüdür:**\n\n' +
              '**Gevşetme** — iş süreci gereği o kontrol geçerli değilse, ' +
              've bu **belgelenmişse**.\n\n' +
              '** Sıkılaştırma** — az bilinen ama daha değerli kullanım: ' +
              'bir **uyarıyı hataya** çevirmek. ' +
              '{{konu:dogrulama-ikame}} konusundaki ilkeyle aynı: ' +
              '**yalnızca `E` gerçek korumadır**, `W` ilk yoğun günde geçilir.\n\n' +
              'Kapatmadan önce tek soru: **bu uyarı neyi koruyordu?**',
        ilgili:['OB28','GGB0','FS00'] },

      { kod:'ST22', ad:'Dump analizi — çoğu dump veri hatasıdır',
        amac:'Program çökmesinin teknik nedenini gösterir.',
        neZaman:'Kullanıcı teknik hata ekranı gördüğünde.',
        adimlar:[
          { baslik:'Tarih ve kullanıcı ile dump bulunur' },
          { baslik:'**Hata tipi** okunur', aciklama:'`CX_SY_ZERODIVIDE`, `CONVT_NO_NUMBER` gibi.' },
          { baslik:'"Kullanıcı ne yapıyordu" bölümü okunur',
            aciklama:'Hangi işlem, hangi veri — asıl ipucu buradadır.' },
          { baslik:'Önce **veri** kontrol edilir, sonra program' },
        ],
        ekranAkisi:[
          { ekran:'Dump', islem:'`CX_SY_ZERODIVIDE` · {{AFAB}} sırasında' },
          { ekran:'Veri', islem:'Bir varlığın **faydalı ömrü = 0**' },
          { ekran:'Kök sebep', islem:'Ana veri hatası — **program hatası değil**' },
          { ekran:'Çözüm', islem:'{{AS02}} ile ömür düzeltildi, {{AFAB}} tekrar çalıştı ✓' },
        ],
        alanlar:{ zorunlu:['Tarih'], opsiyonel:['Kullanıcı','Hata tipi'] },
        hatalar:[
          { mesaj:'Dump anlaşılmıyor', sebep:'Teknik içerik.', cozum:'**Hata tipi** ve **"kullanıcı ne yapıyordu"** bölümleri yeterlidir; kaynak kodu okumak gerekmez.' },
          { mesaj:'Aynı dump tekrarlıyor', sebep:'Kök sebep düzeltilmemiş.', cozum:'Veri düzeltilmediyse her çalıştırmada tekrarlar. Aynı sorunu taşıyan **diğer kayıtları da tara**.' },
        ],
        ipucu:'**En yaygın yanlış refleks:** *"program bozuk, geliştiriciye gönder."*\n\n' +
              'Danışmanlıkta gördüğün dump’ların çoğu **veri veya özelleştirme** ' +
              'kaynaklıdır: tanımsız döviz kuru, sıfır faydalı ömür, ' +
              'boş numara aralığı, eksik hesap ataması.\n\n' +
              '**Sıra:** ① hata tipini oku ② hangi veriyle çöktüğünü bul ' +
              '③ o veriyi kontrol et ④ **hâlâ anlamsızsa** geliştiriciye git.\n\n' +
              'Bu sıra, çoğu vakayı üçüncü adımda bitirir.',
        ilgili:['SM21','SM13','SLG1'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Hata teşhisinde tablolar iki iş görür: **hatayı doğrulamak** ' +
      '(*"veri gerçekten var mı?"*) ve **kapsamı ölçmek** ' +
      '(*"kaç kayıt etkilendi?"*).',

    liste:[
      { ad:'T001B', baslik:'Kayıt dönemleri — "dönem kapalı" hatasının kaynağı',
        tutar:'Dönem varyantı bazında, hesap türüne göre **açık dönem aralıkları**.',
        olusturan:'{{OB52}}',
        anahtar:'**BUKRS/RRCTY + MKOAR + VONKT**',
        iliskiler:'Şirket kodunun dönem varyantı {{T001}}’den gelir.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'MKOAR', aciklama:'**Hesap türü** — `+` genel · `S` G/L · `K` satıcı · `D` müşteri · `A` varlık', tip:'pk' },
          { ad:'FRPE1 / TOPE1', aciklama:'**Birinci** aralık — normal dönemler' },
          { ad:'FRPE2 / TOPE2', aciklama:'**İkinci** aralık — genelde özel dönemler (13–16)' },
          { ad:'BUKRS', aciklama:'Boş olabilir — o zaman **tüm şirket kodları** için geçerli' },
        ] },

      { ad:'BALHDR', baslik:'Uygulama günlüğü başlığı — toplu işlemin gerçek sonucu',
        tutar:'Toplu işlemlerin ürettiği günlük başlıkları.',
        olusturan:'{{F110}}, {{AFAB}}, {{FF_5}} gibi programlar',
        anahtar:'**LOGNUMBER**',
        iliskiler:'{{SLG1}} bu tabloyu okur; mesaj satırları `BALM`’da.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'OBJECT / SUBOBJECT', aciklama:'Hangi programın günlüğü' },
          { ad:'ALDATE / ALUSER', aciklama:'Ne zaman, kim çalıştırdı' },
          { ad:'PROBCLASS', aciklama:'**En yüksek mesaj sınıfı** — 1 çok kritik … 4 bilgi. Süzmenin en hızlı yolu' },
        ] },

      { ad:'BKPF', baslik:'Kapsam ölçmenin tablosu',
        tutar:'Belge başlıkları — **hangi işlem, hangi kullanıcı, ne zaman**.',
        olusturan:'Her FI kaydı',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'`STBLG` ters kayıt bağlantısını tutar.',
        s4:'Duruyor; kalemler {{ACDOCA}}’da.',
        alanlar:[
          { ad:'TCODE', aciklama:'**Belgeyi üreten işlem** — *"bu hatalı kayıtlar hangi ekrandan girildi?"*' },
          { ad:'USNAM', aciklama:'Kaydeden kullanıcı — aynı hatayı yapan başkaları var mı?' },
          { ad:'STBLG', aciklama:'**Ters kayıt belgesi** — dolu ise bu belge iptal edilmiş' },
          { ad:'CPUDT', aciklama:'Giriş tarihi — **kayıt tarihinden farklı olabilir**' },
        ] },

      { ad:'CDHDR', baslik:'Değişiklik belgeleri — "dün çalışıyordu" sorusunun cevabı',
        tutar:'Ana veri ve bazı özelleştirmelerde **kim neyi ne zaman değiştirdi**.',
        olusturan:'Değişiklik belgesi açık olan her nesne',
        anahtar:'OBJECTCLAS + OBJECTID + CHANGENR',
        iliskiler:'Alan bazında ayrıntı {{CDPOS}}’ta — eski ve yeni değer.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'OBJECTCLAS', aciklama:'Nesne sınıfı — `KRED` satıcı, `DEBI` müşteri, `SACH` G/L' },
          { ad:'UDATE / USERNAME', aciklama:'*"Dün çalışıyordu"* dendiğinde **ilk bakılacak yer**' },
          { ad:'TCODE', aciklama:'Değişikliğin yapıldığı işlem' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Teşhis tablolarının ilişkisi',
      varliklar:[
        { ad:'BKPF', rol:'Belge', hub:true, aciklama:'**Kapsam ölçme** — kim, hangi kodla, ne zaman',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'TCODE' }, { ad:'USNAM' }, { ad:'STBLG' }] },
        { ad:'T001B', rol:'Ayar', aciklama:'*"Dönem kapalı"* hatasının **kaynağı**',
          alanlar:[{ ad:'MKOAR', tip:'pk' }, { ad:'FRPE1' }, { ad:'TOPE1' }] },
        { ad:'CDHDR', rol:'Değişiklik', aciklama:'*"Dün çalışıyordu"* — **ne değişti?**',
          alanlar:[{ ad:'CHANGENR', tip:'pk' }, { ad:'UDATE' }, { ad:'USERNAME' }] },
        { ad:'CDPOS', rol:'Ayrıntı', aciklama:'**Eski ve yeni değer**',
          alanlar:[{ ad:'CHANGENR', tip:'fk' }, { ad:'FNAME' }, { ad:'VALUE_OLD' }, { ad:'VALUE_NEW' }] },
        { ad:'BALHDR', rol:'Günlük', aciklama:'**Toplu işlemin** gerçek sonucu',
          alanlar:[{ ad:'LOGNUMBER', tip:'pk' }, { ad:'OBJECT' }, { ad:'PROBCLASS' }] },
      ],
      iliskiler:[
        { from:'CDHDR', to:'CDPOS', alanlar:'CHANGENR', not:'**alan bazında** eski → yeni' },
        { from:'BKPF', to:'T001B', alanlar:'BUKRS', not:'dönem kontrolü' },
        { from:'BKPF', to:'CDHDR', alanlar:'—', not:'ana veri değişikliği belgeyi etkiler' },
        { from:'BALHDR', to:'BKPF', alanlar:'—', not:'toplu işlem → ürettiği belgeler' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Teşhis üç ekranda yapılır ve **sıra önemlidir**: ' +
      'mesajın kendisi → yetki/kilit/güncelleme → toplu işlem günlüğü.',

    ekranlar:[
      { ad:'Mesajın kendisi — çift tıkla',
        aciklama:'En çok atlanan ve en çok işe yarayan adım.',
        alanlar:[
          { ad:'Mesaj numarası', zorunlu:true, aciklama:'`F5 201` gibi. **Metin değil numara** aranır — metin dile göre değişir.' },
          { ad:'Teşhis', zorunlu:false, aciklama:'Ne oldu.' },
          { ad:'Sistem yanıtı', zorunlu:false, aciklama:'Sistem ne yaptı.' },
          { ad:'**Prosedür**', zorunlu:false, aciklama:'**Ne yapılması gerektiği** — çoğu vakayı tek başına çözer.' },
        ],
        ipucu:'**Mesajın uzun metnini okumak, FI destek işinin en yüksek ' +
              'getirili tek alışkanlığıdır.**\n\n' +
              'SAP mesajlarının çoğunda **Prosedür** bölümü vardır ve ' +
              'orada çözüm **yazılıdır**. Yeni danışmanlar bu bölümü ' +
              'neredeyse hiç açmaz; deneyimliler önce oraya bakar.' },

      { ad:'{{SU53}} · {{SM12}} · {{SM13}} — üç sessiz sebep',
        aciklama:'Mesaj yoksa veya mesaj yeterli değilse.',
        alanlar:[
          { ad:'{{SU53}}', zorunlu:false, aciklama:'**Yetki** — boş liste geldiyse **hemen** çalıştır.' },
          { ad:'{{SM12}}', zorunlu:false, aciklama:'**Kilit** — işlem donuyorsa. Elle silme.' },
          { ad:'{{SM13}}', zorunlu:false, aciklama:'**Güncelleme hatası** — numara var belge yok.' },
          { ad:'{{SM21}}', zorunlu:false, aciklama:'Sistem günlüğü — uygulama değil **sistem** sorunuysa.' },
        ],
        ipucu:'Bu üçü **farklı belirtilere** karşılık gelir ve karıştırılmamalıdır:\n\n' +
              '**Boş liste** → {{SU53}}\n' +
              '**İşlem donuyor** → {{SM12}}\n' +
              '**"Kaydedildi" dedi ama belge yok** → {{SM13}}\n\n' +
              'Belirtiyi doğru eşleştirmek, teşhis süresini dakikalara indirir.' },

      { ad:'{{SLG1}} · {{SM37}} · {{SP01}} — toplu işlem üçlüsü',
        aciklama:'Toplu işlemde **üçüne de** bakılır; üçü farklı şey söyler.',
        alanlar:[
          { ad:'{{SM37}}', zorunlu:false, aciklama:'*"Program çalıştı mı, çöktü mü?"*' },
          { ad:'{{SLG1}}', zorunlu:false, aciklama:'*"İş **doğru** yapıldı mı?"* — satır bazında.' },
          { ad:'{{SP01}}', zorunlu:false, aciklama:'*"Çıktı üretildi mi?"* — {{F150}} ihtar mektupları.' },
        ],
        ipucu:'**{{SM37}}’de "başarıyla tamamlandı" görmek yetmez.**\n\n' +
              'İş durumu **programın çökmediğini** söyler; ' +
              'kalemlerin **işlendiğini** söylemez.\n\n' +
              'Bir {{F110}} çalıştırması başarıyla bitip **hiçbir ödeme üretmemiş** olabilir — ' +
              'tüm kalemler öneride bloke edilmiştir. ' +
              '{{SM37}} yeşil, {{SLG1}} kırmızı.' },
    ],

    zorunlu:['Mesaj numarası','İşlem kodu','Kullanıcı ve şirket kodu'],
    opsiyonel:['Ekran görüntüsü','"Daha önce çalışıyor muydu?" cevabı'],

    hatalar:[
      { mesaj:'Posting period ... is not open (`F5 201`)', sebep:'{{OB52}}’de dönem kapalı.', cozum:'**Hesap türü satırını** kontrol et — `+` açık olsa bile `K`/`D`/`A` kapalı olabilir.' },
      { mesaj:'Account determination for entry ... not possible', sebep:'{{OBYC}}/{{VKOA}}/{{OB40}}’ta satır yok.', cozum:'Modül hangi tabloya bakacağını söyler. Genelde **yeni değerleme sınıfı** eklenmiş, satır eklenmemiştir.' },
      { mesaj:'Belge dengesiz — ama ekranda denk görünüyor', sebep:'{{belge-bolme}} aktif; defter görünümünde bölme boyutu eksik.', cozum:'Kâr merkezi gibi bölme karakteristiği dolduruldu mu bak ({{konu:new-gl}}).' },
      { mesaj:'Liste boş geliyor, hata yok', sebep:'Veri yetkisi yok — süzgeç olarak uygulanmış.', cozum:'{{SE16N}} ile veri var mı bak → **hemen** {{SU53}}.' },
      { mesaj:'"Belge kaydedildi" dedi ama {{FB03}}’te yok', sebep:'{{guncelleme-hatasi}}.', cozum:'{{SM13}}. Toplu yüklemede **sayı mutabakatı** yap.' },
      { mesaj:'İşlem donuyor, kaydetmiyor', sebep:'{{kilitleme}} — başka işlem nesneyi tutuyor.', cozum:'{{SM12}} sahibi bul → {{SM37}} iş çalışıyor mu → çalışıyorsa **bekle**.' },
      { mesaj:'Ayarı değiştirdim, etkisi yok', sebep:'{{tampon}} veya taşıma gelmemiş.', cozum:'Aynı sistemde ise oturum yenile / `/$sync`. Farklı sistemde ise `STMS` taşıma dönüş kodu.' },
      { mesaj:'Toplu işlem "bitti" ama sonuç eksik', sebep:'{{SM37}} yalnızca çökme durumunu gösterir.', cozum:'{{SLG1}} ile **satır bazında** günlüğü oku.' },
      { mesaj:'Kullanıcı doğru girdi ama raporda farklı görünüyor', sebep:'Aktif bir **ikame** eziyor.', cozum:'{{GGB1}} / {{OBBH}} / {{GGB4}} — akla en son gelen ama gerçek sebep ({{konu:dogrulama-ikame}}).' },
    ],

    ipuclari:[
      '**Mesajın üzerine çift tıkla — "Prosedür" bölümü çoğu vakayı çözer.**',
      'Metni değil **numarayı** ara: `F5 201`. Metin dile ve sürüme göre değişir.',
      '**"Daha önce çalışıyor muydu?"** sorusu aramayı ikiye böler: ' +
      'hiç çalışmadıysa **yapılandırma**, dün çalışıyorsa **değişiklik** ({{CDHDR}}).',
      'Boş liste **"veri yok" demek değildir**: {{SE16N}} → sonra **hemen** {{SU53}}.',
      'Toplu işlemde {{SM37}} yetmez — {{SLG1}} satır bazında gerçeği söyler.',
      'Toplu yükleme sonrası **sayı mutabakatı**: gönderilen = oluşan. Değilse {{SM13}}.',
      'Dump gördüğünde önce **veriyi** kontrol et; çoğu dump program hatası değildir.',
      'Kilit **elle silinmez** — önce {{SM37}}’de iş hâlâ çalışıyor mu bak.',
      'Çözdükten sonra **aynı sınıfı tara**: aynı rolü, hesabı, vergi kodunu ' +
      'kullanan başkaları da etkilenmiş olabilir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'T001B', ne:'Dönem aralıkları — {{OB52}} ile **okunur/yazılır**' },
      { tablo:'BALHDR', ne:'Toplu işlem günlüğü başlığı — program yazar' },
      { tablo:'CDHDR', ne:'Değişiklik başlığı — ana veri değişince yazılır' },
      { tablo:'CDPOS', ne:'Alan bazında **eski → yeni** değer' },
    ],

    commit:
      'Hata yönetiminde LUW kavramı kritiktir çünkü **"kaydedildi" mesajı ' +
      'kaydın yazıldığı anlamına gelmez**.\n\n' +
      'SAP\'ta kayıt iki aşamalıdır:\n\n' +
      '**1. Diyalog görevi** — kullanıcı kaydeder, **numara verilir**, ekran döner.\n' +
      '**2. Güncelleme görevi** — asıl yazma **asenkron** yapılır.\n\n' +
      'İkincisi çökerse kullanıcı **başarı mesajını görmüştür** ama belge yoktur. ' +
      'Numara da **yanmıştır** — belge numaralarında boşluk oluşur.\n\n' +
      'Bu, {{guncelleme-hatasi}}’nın neden bu kadar sinsi olduğunu açıklar ve ' +
      'toplu yüklemede **sayı mutabakatının** neden zorunlu olduğunu gösterir.',

    belgeNo:
      'Belge numarası **diyalog aşamasında** verilir. Bu yüzden:\n\n' +
      '• Güncelleme çökerse numara **yanar** — o numarada belge olmaz.\n' +
      '• Numara aralığında **boşluk** oluşur ve bu normaldir.\n' +
      '• Denetimde *"bu numaralar neden atlanmış?"* sorusu gelebilir; ' +
      'cevap {{SM13}} kayıtlarıdır.\n\n' +
      'Numara aralığı **dolduğunda** ise farklı bir hata gelir ve ' +
      'tüm kayıt durur. {{FBN1}} ile aralık kontrol edilir — ' +
      'yıl sonu geçişlerinde atlanan bir kontroldür.',

    postingLogic:
      'Bir kayıt denemesi sırasında kontroller **şu sırayla** çalışır. ' +
      'Sıra bilinirse, hatanın hangi katmandan geldiği anlaşılır:\n\n' +
      '**1. Yetki** — `S_TCODE`, sonra nesne yetkileri\n' +
      '**2. {{alan-durumu}}** — zorunlu/opsiyonel/gizli\n' +
      '**3. Ana veri** — hesap var mı, kilitli mi, şirket kodunda açık mı\n' +
      '**4. Dönem** — {{OB52}} / {{T001B}}, hesap türü bazında\n' +
      '**5. {{konu:dogrulama-ikame}}** — önce **ikame**, sonra **doğrulama**\n' +
      '**6. Denklik** — borç = alacak (ve {{belge-bolme}} varsa defter görünümünde de)\n' +
      '**7. Hesap belirleme** — otomatik satırlar için {{OBYC}}/{{VKOA}}/{{OB40}}\n' +
      '**8. Numara aralığı** — belge numarası verilir\n' +
      '**9. Güncelleme görevi** — **asenkron**, burada çökerse sessizdir\n\n' +
      '**Pratik kullanım:** hata hangi aşamada geldi? ' +
      'Alan hatası aldıysan dönem kontrolüne **daha gelmemiştir** — ' +
      'dönemi kontrol etmek zaman kaybıdır.',

    belgeTuru:
      '{{belge-turu}} üç ayrı hata kaynağıdır:\n\n' +
      '**Numara aralığı eksik** → *"Belge türü ... için numara aralığı bulunamadı"*. ' +
      '{{OBA7}} + {{FBN1}}. Yıl bazlı aralıklarda **yıl sonunda** patlar.\n\n' +
      '**İzin verilen hesap türü** → belge türü yalnızca belirli hesap türlerine ' +
      'izin verir; `KR` ile G/L kaydı denenirse hata gelir.\n\n' +
      '**Ters kayıt belge türü** → {{FB08}} için tanımlı değilse iptal edilemez.',

    numberRange:
      '**Yıl sonu geçişinde en sık atlanan kontrol.**\n\n' +
      'Belge numara aralıkları **yıl bazlı** tanımlanabilir. ' +
      'Yeni yıla ait aralık {{FBN1}} ile açılmamışsa, ' +
      '1 Ocak sabahı **hiçbir kayıt yapılamaz**.\n\n' +
      'Aynı durum CO tarafında {{KANK}} için geçerlidir ve daha da kötüdür: ' +
      'CO numara aralığı eksikse **FI kaydı da durur** ' +
      '(bkz. {{konu:co-integration}}).\n\n' +
      '**Kalıcı önlem:** yıl sonu kontrol listesine ' +
      '*"gelecek yıl numara aralıkları açıldı mı?"* maddesi konur — ' +
      've **Aralık ayında** kontrol edilir, Ocak’ta değil.',

    accountDetermination:
      '*"Hesap belirleme yapılamadı"* hatası, **hangi modülden geldiğine göre** ' +
      'farklı tabloya yönlendirir:\n\n' +
      '**MM** ({{MIGO}}, {{MIRO}}) → {{OBYC}} · anahtarlar `BSX` `WRX` `PRD` `GBB` `FR1`\n' +
      '**SD** ({{VF01}}) → {{VKOA}} · `ERL` `ERS` `ERF`\n' +
      '**Vergi** → {{OB40}} / {{T030K}} · üç alanlı anahtar\n' +
      '**Duran varlık** → {{AO90}} · değerleme sınıfı bazında\n\n' +
      '**En sık kök sebep aynıdır:** yeni bir **değerleme sınıfı**, ' +
      'yeni bir **vergi kodu** veya yeni bir **hesap grubu** açılmış, ' +
      'ama hesap atama tablosuna satır eklenmemiş.\n\n' +
      'Bu yüzden "yeni X açma" süreçlerine ' +
      '*"hesap ataması yapıldı mı?"* adımı eklenmelidir.',

    tur:
      'Mesaj sınıfları hatanın **gücünü** belirler:\n\n' +
      '**E (Error)** — kayıt **engellenir**. Tek gerçek koruma.\n' +
      '**W (Warning)** — uyarır, kullanıcı **Enter ile geçer**.\n' +
      '**I (Information)** — bilgi verir.\n' +
      '**A (Abort)** — işlem sonlanır.\n' +
      '**S (Success)** — başarı.\n\n' +
      '**W ile kurulan koruma, koruma değildir.** ' +
      'İlk yoğun günde herkes Enter’a basar ve kural fiilen kalkar. ' +
      '{{konu:dogrulama-ikame}} konusundaki ilkeyle aynıdır.',

    transport:
      'Hataların önemli bir kısmı **taşıma kaynaklıdır**:\n\n' +
      '**Eksik taşıma** — ayar test sisteminde var, canlıda yok.\n' +
      '**Sıra hatası** — bağımlı nesne önce gelmiş.\n' +
      '**Dönüş kodu 4** — *"başarılı"* değildir; **uyarıyla geçti** demektir ' +
      've bazı nesneler gelmemiş olabilir. `STMS` günlüğü satır satır okunur.\n\n' +
      '**Rol ({{PFCG}}) ayrı taşınır.** Özelleştirme canlıya gitmiş olsa bile ' +
      'rol güncellenmemişse kullanıcı yetkisiz kalır — ' +
      'geçişte en sık atlanan adımlardan biri.',

    img:[
      { yol:'OB52 → Kayıt dönemlerini aç ve kapat', not:'Hesap türü satırlarını ayrı kontrol et' },
      { yol:'OBA5 → Mesaj kontrolü', not:'Hata ↔ uyarı. Kapatmadan önce "neyi koruyordu?"' },
      { yol:'FBN1 → Belge numara aralıkları', not:'Yıl sonu kontrolü — **Aralık ayında**' },
      { yol:'OBC4 → Alan durumu grupları', not:'{{OB41}} kayıt anahtarıyla birlikte değerlendirilir' },
      { yol:'PFCG → Rol bakımı', not:'Yetki hatalarının kaynağı; ayrı taşınır' },
    ],

    ekstra:[
      { ic:'🎯', baslik:'Belirti → araç eşlemesi (teşhis kartı)', metin:
        'Teşhisin tamamı, **belirtiyi doğru araca eşlemekten** ibarettir. ' +
        'Bu tablo, konunun pratik özetidir:\n\n' +
        '| Belirti | İlk bakılacak yer |\n' +
        '|---|---|\n' +
        '| Mesajlı hata | **Mesaja çift tıkla → Prosedür** |\n' +
        '| *"Yetkiniz yok"* | {{SU53}} → {{SU01}} rol geçerliliği |\n' +
        '| **Boş liste, hata yok** | {{SE16N}} (veri var mı) → **hemen** {{SU53}} |\n' +
        '| *"Kaydedildi"* ama belge yok | {{SM13}} |\n' +
        '| İşlem donuyor | {{SM12}} → {{SM37}} |\n' +
        '| Toplu işlem eksik | {{SM37}} + **{{SLG1}}** |\n' +
        '| Çıktı gelmedi | {{SP01}} |\n' +
        '| Program çöktü | {{ST22}} → **önce veriyi kontrol et** |\n' +
        '| Ayar etkisiz (aynı sistem) | {{tampon}} → oturum yenile / `/$sync` |\n' +
        '| Ayar etkisiz (başka sistem) | `STMS` taşıma dönüş kodu |\n' +
        '| **Değer kendiliğinden değişiyor** | {{GGB1}} ikame envanteri |\n' +
        '| *"Dün çalışıyordu"* | {{CDHDR}} / {{CDPOS}} — **ne değişti?** |\n' +
        '| Sistem geneli sorun | {{SM21}} |\n\n' +
        '**Bu tabloyu ezberlemek, hata mesajlarını ezberlemekten ' +
        'kat kat verimlidir** — çünkü mesajlar binlerce, belirtiler ise ondur.' },

      { ic:'🔁', baslik:'Kök sebep mi, belirti mi? — üç kez "neden" sor', metin:
        'Bir hatayı çözmenin iki yolu vardır ve ikisi **çok farklı** sonuç verir.\n\n' +
        '**Belirtiyi düzeltmek:** dönemi aç, kaydı yaptır, dönemi kapat. ' +
        'Bugün çözülür, **yarın tekrar eder**.\n\n' +
        '**Kök sebebi bulmak:** *"dönem neden kapalıydı?"* diye sormak.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Örnek — üç kez "neden":**\n\n' +
        '*Fatura kaydedilemiyor.* **Neden?**\n' +
        '→ Dönem kapalı. **Neden?**\n' +
        '→ Ay sonu kapanışı yapılmış. **Neden fatura geç geldi?**\n' +
        '→ Satın alma faturaları muhasebeye **haftada bir** toplu geliyor.\n\n' +
        '**Gerçek sorun bulundu:** dönem değil, **fatura akışı**.\n\n' +
        'Belirtiyi düzeltmek her ay tekrar eden bir iş yaratır; ' +
        'kök sebebi düzeltmek sorunu **bitirir**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Danışmanın kapanış refleksi iki soru olmalı:**\n\n' +
        '**1.** *"Bu neden mümkün oldu?"* → kök sebep\n' +
        '**2.** *"Başka kimde var?"* → aynı sınıfı tara\n\n' +
        'İkinci soru sıklıkla **bildirilmemiş vakalar** ortaya çıkarır. ' +
        'Kullanıcılar sessiz hataları bildirmez — **etrafından dolaşır** ' +
        '(bkz. {{konu:tcodes}} senaryosu: tarama iki kullanıcı daha buldu).' },
    ],

    notlar:[
      { tip:'warn', baslik:'"Hatayı kapatmak" bir çözüm değildir', metin:
        'Danışmana gelen en yaygın **yanlış** istek: ' +
        '*"Bu uyarı her kayıtta çıkıyor, kapatabilir misin?"*\n\n' +
        '{{OBA5}} bunu teknik olarak mümkün kılar — ama soru şu olmalı: ' +
        '**bu uyarı neyi koruyordu?**\n\n' +
        'Uyarı çok çıkıyorsa iki ihtimal vardır:\n\n' +
        '**1.** Kullanıcılar gerçekten çok hata yapıyor → ' +
        'uyarı **işini yapıyor**, kapatılmamalı. Eğitim veya ' +
        '{{konu:dogrulama-ikame}} ile **önleme** gerekir.\n\n' +
        '**2.** Uyarı bu iş süreci için **anlamsız** → ' +
        'kapatılabilir, ama **gerekçesi belgelenmeli**.\n\n' +
        'Gerekçesiz kapatılan bir mesaj, iki yıl sonra ' +
        '*"bu kontrol neden yok?"* sorusuna cevapsız kalır — ' +
        've kimse geri açmaya cesaret edemez.\n\n' +
        '**Aynı ilke ters yönde de geçerli ve daha değerlidir:** ' +
        'kritik bir kontrol **W** ile kurulmuşsa, {{OBA5}} ile **E** yapılır. ' +
        'Yalnızca `E` gerçek korumadır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'S/4HANA hata **sınıflarını** değiştirmedi — dönem, yetki, hesap belirleme ' +
      've kilit hataları aynı. Değişen üç şey var: ' +
      '**bazı hata sınıfları ortadan kalktı**, **yeni bir sınıf doğdu** (geçiş hataları), ' +
      've Fiori arayüzü mesajları **farklı gösteriyor**.',

    eccFarklari:[
      { konu:'Dönem hataları', ecc:'{{OB52}}', s4:'**Aynı** — değişmedi' },
      { konu:'Yetki hataları', ecc:'`S_TCODE` + nesne', s4:'**Aynı** + Fiori kutucuk yetkisi' },
      { konu:'FI/CO mutabakat farkı', ecc:'Ayrı tablolar → **fark oluşabilirdi**', s4:'**Sınıf ortadan kalktı** — {{ACDOCA}} tek tablo' },
      { konu:'Toplam tablosu tutarsızlığı', ecc:'GLT0 ≠ {{BSEG}} olabilirdi ({{F.03}})', s4:'**Kalktı** — toplam tablosu yok, anlık hesaplanır' },
      { konu:'İndeks tablosu tutarsızlığı', ecc:'{{BSIK}} ≠ {{BSEG}} olabilirdi', s4:'**Kalktı** — indeksler görünüme dönüştü' },
      { konu:'Geçiş hataları', ecc:'Yok', s4:'**Yeni sınıf** — iş ortağı, hesap eşleme, bakiye taşıma' },
      { konu:'Hata mesajı gösterimi', ecc:'GUI durum çubuğu', s4:'Fiori **mesaj kutusu** — uzun metne erişim farklı' },
      { konu:'Dump analizi', ecc:'{{ST22}}', s4:'{{ST22}} **duruyor**' },
    ],

    universalJournal:
      '**{{evrensel-kayit-defteri}} bütün bir hata sınıfını ortadan kaldırdı.**\n\n' +
      'ECC’de FI ve CO **ayrı tablolarda** dururdu; aralarındaki tutarsızlık ' +
      'gerçek ve sık bir sorundu. {{F.03}} gibi mutabakat raporları ' +
      'bu yüzden vardı ve ay sonunda **rutin olarak** çalıştırılırdı.\n\n' +
      'S/4HANA’da FI ve CO **aynı satırdadır** ({{ACDOCA}}). ' +
      'Mutabakatsızlık **yapısal olarak imkânsızdır**.\n\n' +
      'Aynı mantık toplam ve indeks tabloları için de geçerli: ' +
      'GLT0 ile {{BSEG}} arasındaki fark, {{BSIK}} ile {{BSEG}} arasındaki fark — ' +
      'bu tablolar **artık türetilmiş görünüm** olduğu için ' +
      'kaynakla tutarsız olamazlar.\n\n' +
      '**Mimari ders:** bir veriyi **iki yerde tutmayı bırakınca**, ' +
      '*"iki yer uyuşmuyor"* hata sınıfı kendiliğinden yok olur.',

    kalkanTcodes:[
      { eski:'{{F.03}} — FI mutabakat', yeni:'**Gereksiz**', not:'FI/CO tek tabloda; tutarsızlık yapısal olarak imkânsız' },
      { eski:'Toplam tablosu düzeltme programları', yeni:'**Gereksiz**', not:'Toplam tablosu yok — anlık hesaplanır' },
      { eski:'İndeks yeniden oluşturma', yeni:'**Gereksiz**', not:'İndeksler {{uyumluluk-view}}’a dönüştü' },
      { eski:'—', yeni:'**Yeni:** geçiş kontrol raporları', not:'Yeni hata sınıfı: eşleme ve bakiye taşıma' },
    ],

    fiori:[
      { ad:'Mesaj kutusu', aciklama:'Fiori’de mesajlar durum çubuğunda değil ' +
             '**kutuda** gösterilir. Uzun metne erişim GUI’den farklıdır — ' +
             'kullanıcı *"detay yok"* sanabilir.' },
      { ad:'Manage Journal Entries', aciklama:'Belge arama ve düzeltme; ' +
             'iptal edilmiş belgeler **işaretli** görünür.' },
      { ad:'Application Jobs', aciklama:'{{SM37}} + {{SLG1}} karşılığı — ' +
             'iş durumu ve günlük **aynı ekranda**.' },
      { ad:'Display Technical Job Log', aciklama:'Toplu işlem günlüğünün Fiori hâli.' },
      { ad:'Fiori kutucuk yetkisi', aciklama:'**Yeni bir sessiz hata kaynağı:** ' +
             'kullanıcının `S_TCODE` yetkisi var ama **kutucuk rolde yok** → ' +
             'uygulama Launchpad’de **görünmez**. Kullanıcı *"uygulama kayboldu"* der.' },
    ],

    compatibilityViews:[
      '{{uyumluluk-view}} **yeni bir hata sınıfı** yarattı: ' +
      'eski özel raporlar çalışır ama **yavaşlar**.',
      'Görünüme **yazma** denemesi hata verir — eski özel kodlar ' +
      '{{BSEG}}’e yazmaya çalışıyorsa çalışmaz.',
      '{{BSEG}}’de tutarlar **pozitif + `SHKZG`**, {{ACDOCA}}’da **işaretli**. ' +
      'Sorgu taşınırken `SHKZG` mantığı **kaldırılmazsa işaret iki kez uygulanır** ' +
      '(bkz. {{konu:sap-tables}}).',
    ],

    performans:
      'Performans sorunları S/4HANA’da **hata gibi görünmez** ama ' +
      'kullanıcı için aynı şeydir: rapor açılmıyorsa çalışmıyordur.\n\n' +
      'İki yönlü değişim oldu:\n\n' +
      '**Hızlanan:** standart döküm ve bakiye raporları — sütun bazlı depolama.\n\n' +
      '** Yavaşlayan:** {{uyumluluk-view}} üzerinden çalışan **eski özel raporlar**. ' +
      'Görünüm her sorguda {{ACDOCA}}’dan yeniden türetilir.\n\n' +
      '**Kalıcı çözüm:** özel raporları doğrudan {{ACDOCA}} okuyacak şekilde ' +
      'yeniden yazmak. Geçişte bu iş **kapsam dışı bırakılır** ve ' +
      'canlıya alındıktan sonra sorun olarak geri döner.',

    bestPractices:[
      'Geçiş öncesi **dump ve güncelleme hatası envanteri** çıkar: ' +
      '{{ST22}} ve {{SM13}}’teki mevcut hatalar geçişten sonra ' +
      '**"S/4HANA bozdu"** diye raporlanır. Önce mevcut durumu belgele.',
      'Mevcut {{konu:dogrulama-ikame}} kurallarını gözden geçir — ' +
      'bazıları {{ACDOCA}} alan yapısıyla uyumsuz olabilir.',
      'Kullanıcılara **Fiori’de uzun metne nasıl erişileceğini** öğret; ' +
      'yoksa *"hata detayı yok"* şikâyeti gelir.',
      '**Fiori kutucuk yetkisini** rol tasarımına dahil et — ' +
      '`S_TCODE` yeterli değil, uygulama görünmezse kullanıcı erişemez.',
      'Geçiş sonrası ilk ay **{{SM13}} ve {{SLG1}} günlük kontrol edilir**; ' +
      'sessiz hatalar bu dönemde yoğunlaşır.',
      'Özel raporların {{uyumluluk-view}} kullanıp kullanmadığını **geçişten önce** tespit et; ' +
      'performans sorunu canlıda değil testte bulunmalı.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'"Amortisman çalıştı" — ama 34 varlık işlenmemişti',
    hikaye:
      '**Kuzey Metal A.Ş.**’de Kasım ayı kapanışı. Muhasebe müdürü ' +
      '{{AFAB}} amortisman çalıştırmasını arka planda başlatıyor.\n\n' +
      '{{SM37}}’de iş **yeşil**: *"Başarıyla tamamlandı."*\n\n' +
      'Kapanış tamamlanıyor, mizan alınıyor, yönetime rapor gidiyor.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Üç hafta sonra**, Aralık kapanışında bir kontrol sırasında ' +
      'birikmiş amortisman hesabının beklenenden **düşük** olduğu fark ediliyor.\n\n' +
      'Fark: **1.847.000 TRY**.',
    veriler:[
      { k:'İşlem', v:'**{{AFAB}}** — Kasım 2027 dönemi' },
      { k:'{{SM37}} durumu', v:'**Başarıyla tamamlandı** ✓ (yeşil)' },
      { k:'Beklenen amortisman', v:'8.420.000 TRY' },
      { k:'Kaydedilen', v:'**6.573.000 TRY**' },
      { k:'Fark', v:'**1.847.000 TRY**' },
      { k:'Fark edilme', v:'**3 hafta sonra** — Aralık kapanışında' },
    ],

    adimlar:[
      { baslik:'İş gerçekten başarılı mıydı? — iki ekran çelişiyor', tcode:'SM37',
        aciklama:'Önce işin durumu, sonra işin günlüğü.',
        girdi:[
          { alan:'{{SM37}}', deger:'İş `RAPOST2000` · durum **Başarıyla tamamlandı**' },
          { alan:'Süre', deger:'14 dakika — normal' },
          { alan:'Çıkarım', deger:'Program **çökmedi**' },
          { alan:'Ama', deger:'*"Çökmedi"* ≠ *"doğru yaptı"*' },
        ],
        not:'**Bu senaryonun kalbi burası.**\n\n' +
             '{{SM37}} yalnızca **programın çökmediğini** söyler. ' +
             'Kalemlerin işlendiğini **söylemez**.\n\n' +
             'Muhasebe müdürü yeşil rengi görüp kapanışa devam etti — ' +
             've bu, tamamen makul görünen bir davranıştı. ' +
             'Sorun kişide değil, **kontrol adımının eksikliğinde**.' },

      { baslik:'Gerçek sonuç: uygulama günlüğü', tcode:'SLG1',
        aciklama:'Ekrandaki özetin arkasındaki ayrıntı okunuyor.',
        girdi:[
          { alan:'Nesne', deger:'Duran varlık amortismanı · Kasım 2027' },
          { alan:'Kırmızı mesaj', deger:'**34 satır**' },
          { alan:'Mesaj', deger:'*"Amortisman anahtarı ... için faydalı ömür eksik"*' },
          { alan:'Etkilenen', deger:'34 varlık — toplam **1.847.000 TRY**' },
        ],
        not:'**İş yeşil, günlük kırmızı.**\n\n' +
             'Program 34 varlığı işleyemedi, **hata verdi, devam etti** ve ' +
             'kalan varlıkları normal şekilde işledi. ' +
             'Bu, toplu programların **tasarlanmış davranışıdır** — ' +
             'bir hatalı kayıt yüzünden 5.000 varlığın işlenmemesi istenmez.\n\n' +
             'Ama bu tasarım, **günlük okunmazsa** hatayı görünmez kılar.' },

      { baslik:'34 varlığın ortak noktası nedir?', tcode:'SE16N',
        aciklama:'Tek tek bakmak yerine ortak desen aranıyor.',
        girdi:[
          { alan:'Tablo', deger:'{{ANLB}} — varlık amortisman parametreleri' },
          { alan:'Süzgeç', deger:'34 varlık numarası' },
          { alan:'Ortak nokta', deger:'Hepsi **aynı varlık sınıfı**: `Z400` (kalıp ve aparat)' },
          { alan:'Eksik alan', deger:'Faydalı ömür = **boş**' },
        ],
        not:'**Tek tek bakmak yerine desen aramak**, teşhis süresini ' +
             'saatlerden dakikalara indirir.\n\n' +
             '34 varlığın hepsi aynı sınıftan geliyorsa, sorun ' +
             '34 ayrı hata değil — **bir tane** hatadır.' },

      { baslik:'"Dün çalışıyordu" — ne değişti?', tcode:'SE16N',
        aciklama:'Varlık sınıfı yeni mi, yoksa bir şey mi değişti?',
        girdi:[
          { alan:'Tablo', deger:'{{CDHDR}} / {{CDPOS}} — değişiklik belgeleri' },
          { alan:'Bulgu', deger:'`Z400` sınıfı **12.10.2027**’de açılmış' },
          { alan:'Açan', deger:'Danışman — yeni ürün hattı için' },
          { alan:'Eksik', deger:'Sınıfın **varsayılan faydalı ömrü** girilmemiş' },
        ],
        not:'**Kök sebep bulundu.**\n\n' +
             'Yeni varlık sınıfı açılmış ama {{OAOA}}’da **varsayılan ömür** ' +
             'tanımlanmamış. Kullanıcılar varlıkları açarken ömrü de girmemiş — ' +
             'çünkü diğer sınıflarda **otomatik geliyordu**.\n\n' +
             'Ekim’de açılan varlıklar Ekim ve Kasım’da amortisman ayıramadı. ' +
             'Ekim’de kimse fark etmedi çünkü **tutar küçüktü** ve ' +
             'yine günlük okunmamıştı.' },

      { baslik:'Kapsam gerçekten 34 mü? — Ekim de kontrol edilir', tcode:'SLG1',
        aciklama:'Bir dönem bulunca öncekiler de taranır.',
        girdi:[
          { alan:'Ekim 2027 günlüğü', deger:'**11 kırmızı satır** — aynı hata' },
          { alan:'Ekim farkı', deger:'412.000 TRY' },
          { alan:'Toplam etki', deger:'**2.259.000 TRY** (Ekim + Kasım)' },
          { alan:'Ders', deger:'Bir dönemde bulunan hata **ilk oluştuğu dönem değildir**' },
        ],
        not:'**Kritik adım.** Hatanın **bulunduğu** dönem, ' +
             '**başladığı** dönem değildir.\n\n' +
             'Kasım’da 34, Ekim’de 11 varlık etkilenmiş. ' +
             'Yalnızca Kasım düzeltilseydi, Ekim farkı ' +
             'sessizce kalacak ve yıl sonunda tekrar sorun olacaktı.\n\n' +
             '**Kural:** bir toplu işlem hatası bulunduğunda ' +
             '**önceki dönemler de taranır**.' },

      { baslik:'Düzeltme — ana veri, sonra tekrar çalıştırma', tcode:'AFAB',
        aciklama:'Önce kök sebep, sonra eksik amortisman.',
        girdi:[
          { alan:'① {{OAOA}}', deger:'`Z400` sınıfına **varsayılan ömür** tanımlandı' },
          { alan:'② {{AS02}}', deger:'45 varlığın ömrü toplu güncellendi' },
          { alan:'③ {{AFAB}}', deger:'**Tekrar çalıştırma** modu · Kasım dönemi' },
          { alan:'④ Ekim', deger:'Kapalı — fark **Kasım’a** yansıtıldı' },
          { alan:'⑤ Doğrulama', deger:'{{SLG1}} → **0 kırmızı** ✓' },
        ],
        fis:{ baslik:'Eksik amortismanın tamamlanması', belgeTuru:'AF', tarih:'30.11.2027',
          satirlar:[
            { hesap:'770', ad:'Amortisman gideri', borc:2259000, not:'Ekim + Kasım farkı' },
            { hesap:'257', ad:'Birikmiş amortisman', alacak:2259000 },
          ], not:'Ekim dönemi kapalı olduğu için **iki ayın farkı Kasım’a** düştü.\n\n' +
                 'Muhasebe doğru — toplam amortisman yerinde. ' +
                 'Ama **Kasım gideri şişkin** görünüyor ve ' +
                 'aylık karşılaştırmalı raporda açıklama gerektiriyor.\n\n' +
                 'Hata Ekim’de bulunsaydı bu sorun **hiç doğmayacaktı**.' },
        tabloEtkisi:[
          { tablo:'ANLB', ne:'Faydalı ömür dolduruldu — 45 varlık' },
          { tablo:'ANLC', ne:'Amortisman değerleri yeniden hesaplandı' },
          { tablo:'ACDOCA', ne:'Amortisman kalemleri **Kasım dönemine** yazıldı' },
        ],
        not:'**Sıra önemliydi.** Önce {{OAOA}} (sınıf varsayılanı), ' +
             'sonra {{AS02}} (mevcut varlıklar), en son {{AFAB}}.\n\n' +
             'Sınıf düzeltilmeden varlıklar düzeltilseydi, ' +
             'Aralık’ta açılan yeni varlıklar **aynı hatayı** tekrarlayacaktı.' },

      { baslik:'Kalıcı önlemler — bir daha sessiz kalmasın', tcode:'SLG1',
        aciklama:'Dört önlem: kontrol, önleme, süreç, tarama.',
        girdi:[
          { alan:'Önlem 1 — Kontrol', deger:'Kapanış listesine **"{{SLG1}} kırmızı = 0"** adımı eklendi. {{SM37}} yeşili artık **yeterli sayılmıyor**' },
          { alan:'Önlem 2 — Önleme', deger:'{{konu:dogrulama-ikame}} kuralı: **faydalı ömür boşsa varlık açılamaz** (mesaj tipi **E**)' },
          { alan:'Önlem 3 — Süreç', deger:'Yeni varlık sınıfı açma listesine **"varsayılan ömür tanımlandı mı?"** maddesi' },
          { alan:'Önlem 4 — Tarama', deger:'Tüm varlık sınıfları tarandı → **2 sınıfta daha** eksik varsayılan bulundu' },
        ],
        not:'**Dördüncü önlem iki sınıf daha ortaya çıkardı** — ' +
             'henüz varlık açılmamıştı, yani sorun **patlamadan** önlendi.\n\n' +
             'Bu, teşhisin son adımının neden *"başka kimde var?"* ' +
             'olması gerektiğini gösteriyor.\n\n' +
             '━━━━━━━━━━\n\n' +
             '**İkinci önlem en değerlisi.** Kontrol adımı ({{SLG1}}) hatayı ' +
             '**bir ay sonra** yakalar; doğrulama kuralı ise ' +
             '**hiç oluşmasına izin vermez**.\n\n' +
             'Ve mesaj tipi bilinçli olarak **E** seçildi — ' +
             '**W** olsaydı kullanıcılar Enter’a basıp geçerdi.' },
    ],

    sonuc:
      '**İş yeşildi, günlük kırmızıydı — ve fark 3 hafta sonra bulundu.**\n\n' +
      '**Beş kritik ders:**\n\n' +
      '**1. {{SM37}} ile {{SLG1}} farklı sorulara cevap verir.** ' +
      '{{SM37}} *"program çöktü mü?"*, {{SLG1}} *"iş doğru yapıldı mı?"*. ' +
      'Toplu programlar hatalı kalemi **atlayıp devam edecek** şekilde tasarlanmıştır — ' +
      'bu doğru bir tasarımdır, ama günlük okunmazsa hatayı **görünmez** kılar. ' +
      'Kapanış listesinde *"{{SLG1}} kırmızı = 0"* adımı olmalıdır.\n\n' +
      '**2. Hatanın bulunduğu dönem, başladığı dönem değildir.** ' +
      'Kasım’da 34 varlık göründü; Ekim de taranınca **11 tane daha** çıktı. ' +
      'Bir toplu işlem hatası bulununca **önceki dönemler de taranır**.\n\n' +
      '**3. Gecikme, düzeltmenin maliyetini artırdı.** ' +
      'Ekim kapalı olduğu için iki ayın farkı **Kasım’a** düştü. ' +
      'Muhasebe doğru ama Kasım gideri şişkin göründü ve ' +
      'karşılaştırmalı rapor açıklama gerektirdi. ' +
      'Ekim’de bulunsaydı bu sorun **hiç doğmayacaktı**.\n\n' +
      '**4. Kök sebep 34 varlık değil, bir varlık sınıfıydı.** ' +
      'Tek tek bakmak yerine **ortak desen** arandığı için ' +
      'teşhis dakikalar sürdü. Ve {{CDHDR}} *"ne değişti?"* sorusunu ' +
      'cevaplayarak sınıfın Ekim’de açıldığını gösterdi.\n\n' +
      '**5. Kontrol etmek ile önlemek farklı şeylerdir.** ' +
      '{{SLG1}} kontrolü hatayı **bir ay sonra** yakalar. ' +
      'Doğrulama kuralı ({{konu:dogrulama-ikame}}) **hiç oluşmasına izin vermez**. ' +
      'İkisi birlikte kurulmalı — ve kural **`E`** olmalı, ' +
      '`W` ilk yoğun günde geçilir.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'Bu konu **hata sözlüğü değil, teşhis yöntemidir** — mesajlar binlerce, belirtiler ondur.',
      '**Üç hata sınıfı:** ① konuşan (mesaj var) · ② **sessiz** (mesaj yok, sonuç yanlış) · ③ çöken (dump).',
      '**Danışmanı ayıran ② sınıfıdır.** Konuşan hatayı herkes çözer.',
      '**Mesaja çift tıkla → "Prosedür" bölümü** çoğu vakayı tek başına çözer.',
      'Metni değil **numarayı** ara: `F5 201`. Metin dile ve sürüme göre değişir.',
      '**"Daha önce çalışıyor muydu?"** aramayı ikiye böler: hiç çalışmadıysa **yapılandırma**, dün çalışıyorsa **değişiklik** ({{CDHDR}}).',
      '**{{SM37}} ≠ {{SLG1}}:** biri *"çöktü mü?"*, diğeri *"doğru yapıldı mı?"*.',
      '**Boş liste "veri yok" demek değildir:** {{SE16N}} → **hemen** {{SU53}}.',
      'Düzeltme maliyeti zamanla artar: önlenirse **0 belge**, sonra bulunursa **3 belge + dönem sorunu**.',
      'Kapanış refleksi iki soru: *"bu neden mümkün oldu?"* ve *"başka kimde var?"*',
    ],

    onemliNoktalar:[
      '**"Kullanıcı rapor açıyor, liste boş, hata yok. Nereden başlarsın?"** Bu ② sınıfıdır. Sıra: **(1)** {{SE16N}} ile tabloda veri var mı — varsa sorun **erişim**, yoksa **kayıt**; **(2)** varsa **hemen** {{SU53}} — `S_TCODE` var ama `F_BKPF_BUK` yoksa rapor yetkiyi **süzgeç** olarak uygular, yetkisiz şirket kodu hiç sorgulanmaz ve bu program açısından **hata değildir**; **(3)** yetki tamamsa hesapta **kalem yönetimi** kontrol edilir.',
      '**"{{SM37}} yeşil ama sonuç eksik. Nasıl olur?"** {{SM37}} **programın çökmediğini** söyler, kalemlerin işlendiğini değil. Toplu programlar hatalı kalemi **atlayıp devam eder** — doğru tasarımdır. Gerçek sonuç **{{SLG1}}**’dedir. Kapanış listesinde *"{{SLG1}} kırmızı = 0"* adımı olmalı.',
      '**"Dönem kapalı hatası alıyorum ama {{OB52}}’de dönem açık."** **Hesap türü satırı.** `+` genel satırdır; `S` (G/L), `K` (satıcı), `D` (müşteri), `A` (varlık) **ayrı satır** olabilir. Satıcı faturası için `K` kapalıysa `+` açık olsa bile hata alırsın. Ayrıca **ikinci tarih aralığı** (özel dönemler 13–16) ve varlık için **AA dönemi** kontrol edilir.',
      '**"Belge kaydedildi dedi ama belge yok."** {{guncelleme-hatasi}}. Numara **diyalogda** verilir, kayıt **güncelleme görevinde** asenkron yazılır. İkincisi çökerse kullanıcı başarı mesajını görür, belge yoktur, **numara yanar**. Teşhis: {{SM13}}. Toplu yüklemede hiç fark edilmez — **sayı mutabakatı** zorunlu olmalı.',
      '**"Hesap belirleme yapılamadı — nereye bakarım?"** **Modül tabloyu söyler:** MM → {{OBYC}}, SD → {{VKOA}}, vergi → {{OB40}}/{{T030K}}, varlık → {{AO90}}. En sık kök sebep: **yeni değerleme sınıfı / vergi kodu** açılmış, hesap atama satırı eklenmemiş.',
      '**"Bu uyarıyı kapatabilir misin?"** {{OBA5}} bunu mümkün kılar ama önce sor: **bu uyarı neyi koruyordu?** Çok çıkıyorsa ya uyarı **işini yapıyordur** (kapatılmamalı, önleme gerekir) ya da süreç için anlamsızdır (kapatılır ama **gerekçe belgelenir**). Ters yön daha değerli: kritik bir kontrol `W` ise {{OBA5}} ile **`E`** yapılır — yalnızca `E` gerçek korumadır.',
      '**"Program çöktü, geliştiriciye mi göndereyim?"** Hayır — önce **veriyi** kontrol et. Danışmanın gördüğü dump’ların çoğu **veri veya özelleştirme** kaynaklıdır: tanımsız kur, sıfır faydalı ömür, boş numara aralığı. Sıra: hata tipini oku → hangi veriyle çöktü → o veriyi kontrol et → **hâlâ anlamsızsa** geliştirici.',
      '**"S/4HANA hangi hata sınıflarını ortadan kaldırdı?"** **Mutabakat hataları.** ECC’de FI ve CO ayrı tablolardaydı, tutarsızlık mümkündü ({{F.03}}); toplam ({{GLT0}}) ve indeks ({{BSIK}}) tabloları kaynakla uyuşmayabilirdi. {{ACDOCA}}’da hepsi **tek tablo veya türetilmiş görünüm** — tutarsızlık **yapısal olarak imkânsız**. Buna karşılık **yeni sınıf doğdu:** geçiş hataları ve {{uyumluluk-view}} performans sorunları.',
    ],

    sikHatalar:[
      { hata:'{{SM37}}’de "başarıyla tamamlandı" görüp toplu işlemi doğru saymak.', dogru:'İş durumu **çökme** bilgisidir. Satır bazında gerçek **{{SLG1}}**’dedir. Kapanışta ikisine de bakılır.' },
      { hata:'Hata mesajının **metnini** aramak.', dogru:'Metin dile ve sürüme göre değişir. **Numara** aranır (`F5 201`) ve mesaja **çift tıklanıp** uzun metin okunur.' },
      { hata:'Mesajın "Prosedür" bölümünü hiç açmamak.', dogru:'SAP mesajlarının çoğunda çözüm **yazılıdır**. En yüksek getirili alışkanlık budur.' },
      { hata:'Boş liste gelince "veri yok" sonucuna varmak.', dogru:'② sınıfı hatanın en tipik hâli. {{SE16N}} → **hemen** {{SU53}}.' },
      { hata:'{{SU53}}’ü çok sonra çalıştırmak.', dogru:'Yalnızca **son** başarısız kontrolü gösterir. Araya işlem girerse iz kaybolur — hatayı **tekrarlatıp** hemen çalıştır.' },
      { hata:'Dönem hatasında yalnızca `+` satırına bakmak.', dogru:'**Hesap türü** satırları ayrıdır: `S` `K` `D` `A`. Ayrıca ikinci aralık ve AA dönemi.' },
      { hata:'Kilidi {{SM12}}’den elle silmek.', dogru:'Çalışan işlem yarım kalır, tutarsız veri bırakabilir. Önce {{SM37}}’de iş çalışıyor mu bak — çalışıyorsa **bekle**.' },
      { hata:'Dump görünce doğrudan geliştiriciye göndermek.', dogru:'Çoğu dump **veri hatasıdır**. Önce hata tipi + hangi veriyle çöktüğü kontrol edilir.' },
      { hata:'Uyarıyı gerekçesiz kapatmak.', dogru:'İki yıl sonra *"bu kontrol neden yok?"* sorusu cevapsız kalır. Kapatma gerekçesi **belgelenir**.' },
      { hata:'Belirtiyi düzeltip kapatmak.', dogru:'Dönemi açıp kaydettirmek bugünü kurtarır, yarın tekrar eder. **Üç kez "neden"** sor.' },
      { hata:'Çözdükten sonra taramamak.', dogru:'*"Başka kimde var?"* Sessiz hatalar **bildirilmez, etrafından dolaşılır** — tarama olmadan görünmezler.' },
      { hata:'Toplu yükleme sonrası kayıt sayısını kontrol etmemek.', dogru:'**Sayı mutabakatı** zorunlu adım: gönderilen = oluşan. Değilse {{SM13}}.' },
    ],

    ipuclari:[
      '**Mesaja çift tıkla → "Prosedür"** — en yüksek getirili tek alışkanlık.',
      '**"Daha önce çalışıyor muydu?"** — aramayı yarıya indirir. Cevap "dün çalışıyordu" ise {{CDHDR}}.',
      'Belirti → araç eşlemesini ezberle (teknik bölümdeki kart); mesajları değil.',
      'Toplu işlemde **her zaman üçü**: {{SM37}} (çöktü mü) · {{SLG1}} (doğru mu) · {{SP01}} (çıktı).',
      'Bir dönemde hata bulduysan **önceki dönemleri de tara** — başladığı dönem farklıdır.',
      'Tek tek bakma, **ortak desen** ara: aynı sınıf, aynı rol, aynı vergi kodu.',
      'Kapanış refleksi: *"bu neden mümkün oldu?"* + *"başka kimde var?"*',
      'Kalıcı çözüm üç yerden birindedir: {{konu:dogrulama-ikame}} kuralı · ' +
      '{{alan-durumu}} zorunluluğu · süreç kontrol listesi.',
    ],

    quiz:[
      { soru:'{{SM37}}’de iş "başarıyla tamamlandı" görünüyor ama sonuç eksik. Neden?',
        secenekler:[
          'İş aslında çökmüştür, ekran yanlış gösteriyor',
          '**{{SM37}} programın çökmediğini söyler; kalemlerin işlendiğini değil — {{SLG1}}’e bakılır**',
          'Yetki eksikliğidir',
          'Dönem kapalıdır',
        ], dogru:1,
        aciklama:'Toplu programlar hatalı kalemi **atlayıp devam edecek** şekilde tasarlanmıştır — ' +
                 'bir hatalı kayıt yüzünden 5.000 varlığın işlenmemesi istenmez. ' +
                 'Bu **doğru bir tasarımdır**.\n\n' +
                 'Ama sonucu şudur: program çökmez, iş **yeşil** görünür, ' +
                 'buna rağmen onlarca kalem işlenmemiş olabilir.\n\n' +
                 '**{{SM37}}** → *"program çöktü mü?"*\n' +
                 '**{{SLG1}}** → *"iş doğru yapıldı mı?"*\n\n' +
                 'Kapanış listesinde **"{{SLG1}} kırmızı = 0"** adımı olmalıdır.' },

      { soru:'Kullanıcı bir rapor açıyor, liste boş geliyor, hata mesajı yok. İlk iki adım?',
        secenekler:[
          'Dönemi ve belge türünü kontrol et',
          '**{{SE16N}} ile tabloda veri var mı bak → varsa hemen {{SU53}}**',
          'Programı yeniden başlat',
          '{{ST22}}’de dump ara',
        ], dogru:1,
        aciklama:'Bu ② sınıfı (sessiz) hatanın en tipik hâlidir.\n\n' +
                 '**1. {{SE16N}}** — veri gerçekten var mı? ' +
                 'Varsa sorun **erişimdedir**; yoksa sorun **kayıttadır**. ' +
                 'Bu ayrım yapılmadan teşhis yanlış yöne gider.\n\n' +
                 '**2. {{SU53}}** — **hemen**. `S_TCODE` var ama `F_BKPF_BUK` yoksa, ' +
                 'rapor yetkiyi bir **süzgeç** olarak uygular: yetkili şirket kodları ' +
                 'listelenir, yetkisiz olan **hiç sorgulanmaz** → boş sonuç. ' +
                 'Program açısından bu **hata değildir**, o yüzden mesaj çıkmaz.' },

      { soru:'{{OB52}}’de dönem açık görünüyor ama "dönem kapalı" hatası alınıyor. En olası sebep?',
        secenekler:[
          'Tampon sorunu',
          '**Hesap türü satırı — `+` açık ama `K`/`D`/`A` kapalı**',
          'Belge türü yanlış',
          'Yetki eksik',
        ], dogru:1,
        aciklama:'{{OB52}} / {{T001B}}’de dönem **hesap türü bazında** tanımlanır:\n\n' +
                 '`+` genel · `S` G/L · `K` satıcı · `D` müşteri · `A` varlık\n\n' +
                 'Satıcı faturası kaydediyorsan **`K` satırı** geçerlidir; ' +
                 '`+` açık olsa bile `K` kapalıysa hata alırsın.\n\n' +
                 'İki kontrol daha: **ikinci tarih aralığı** (özel dönemler 13–16) ' +
                 've varlık kaydıysa ayrıca **AA dönemi**.' },

      { soru:'"Belge 1900001234 kaydedildi" mesajı geldi ama {{FB03}}’te belge yok. Ne oldu?',
        secenekler:[
          'Kullanıcı yanlış numara okudu',
          'Belge park edilmiş',
          '**{{guncelleme-hatasi}} — numara diyalogda verildi, güncelleme görevi çöktü**',
          'Dönem kapandığı için silindi',
        ], dogru:2,
        aciklama:'SAP’ta kayıt **iki aşamalıdır**:\n\n' +
                 '**1. Diyalog görevi** — numara verilir, ekran döner, kullanıcı ' +
                 '**başarı mesajını görür**.\n' +
                 '**2. Güncelleme görevi** — asıl yazma **asenkron** yapılır.\n\n' +
                 'İkincisi çökerse belge oluşmaz ama **numara yanar**.\n\n' +
                 'Teşhis: **{{SM13}}**.\n\n' +
                 'Tek kayıtta nadirdir; **toplu yüklemede hiç fark edilmez**. ' +
                 'Bu yüzden yükleme sonrası **sayı mutabakatı** ' +
                 '(gönderilen = oluşan) zorunlu olmalıdır.' },

      { soru:'Kullanıcı: "Kâr merkezini doğru girdim ama raporda başka görünüyor." Sebep?',
        secenekler:[
          'Rapor yanlış çalışıyor',
          'Kullanıcı yanlış hatırlıyor',
          '**Aktif bir ikame değeri sessizce ezmiş**',
          'Belge bölme devrede',
        ], dogru:2,
        aciklama:'**İkame sessizdir** — hiçbir mesaj vermez, hiçbir iz göstermez. ' +
                 'Bu yüzden teşhiste **akla en son gelen** şeydir.\n\n' +
                 'Kontrol: {{GGB1}} tanım → {{OBBH}} atama → {{GGB4}} etkinlik.\n\n' +
                 'Doğrulama **engeller ve görünürdür**; ikame **değiştirir ve sessizdir** ' +
                 '(bkz. {{konu:dogrulama-ikame}}).\n\n' +
                 '**Kalıcı önlem:** aktif ikame **envanteri** tutulur ve ' +
                 'her ikamenin açıklaması iş diliyle yazılır. ' +
                 'Açıklaması boş bir ikame, yıllar sonra çözülemeyen bir tuzaktır.' },

      { soru:'Kullanıcı bir uyarının kapatılmasını istiyor. Doğru yaklaşım?',
        secenekler:[
          '{{OBA5}} ile hemen kapat — kullanıcı isteği önceliklidir',
          '**Önce sor: bu uyarı neyi koruyordu? Çok çıkıyorsa işini yapıyor olabilir**',
          'Hiçbir mesaj kapatılamaz',
          'Uyarıyı hataya çevir',
        ], dogru:1,
        aciklama:'{{OBA5}} teknik olarak mümkün kılar ama **bir "sustur" aracı değildir**.\n\n' +
                 'Uyarı çok çıkıyorsa iki ihtimal var:\n\n' +
                 '**1.** Kullanıcılar gerçekten çok hata yapıyor → uyarı **işini yapıyor**. ' +
                 'Kapatmak yerine {{konu:dogrulama-ikame}} ile **önlemek** gerekir.\n' +
                 '**2.** Bu süreç için anlamsız → kapatılabilir, ama **gerekçe belgelenmeli**.\n\n' +
                 '**Ters yön daha değerlidir:** kritik bir kontrol `W` ile kurulmuşsa ' +
                 '{{OBA5}} ile **`E`** yapılır. **Yalnızca `E` gerçek korumadır** — ' +
                 '`W` ilk yoğun günde Enter’la geçilir.' },

      { soru:'Bir dump ({{ST22}}) gördün. İlk yapman gereken?',
        secenekler:[
          'Geliştiriciye gönder',
          'SAP notu ara',
          '**Hata tipini ve hangi veriyle çöktüğünü oku — çoğu dump veri hatasıdır**',
          'Sistemi yeniden başlat',
        ], dogru:2,
        aciklama:'Danışmanın gördüğü dump’ların çoğu **program hatası değil**, ' +
                 '**veri veya özelleştirme** hatasıdır: tanımsız döviz kuru, ' +
                 'sıfır faydalı ömür, boş numara aralığı, eksik hesap ataması.\n\n' +
                 '**Sıra:**\n' +
                 '① Hata tipini oku (`CX_SY_ZERODIVIDE` gibi)\n' +
                 '② *"Kullanıcı ne yapıyordu"* bölümünden hangi veriyle çöktüğünü bul\n' +
                 '③ O veriyi kontrol et\n' +
                 '④ **Hâlâ anlamsızsa** geliştiriciye git\n\n' +
                 'Bu sıra çoğu vakayı **üçüncü adımda** bitirir.' },

      { soru:'S/4HANA hangi hata sınıfını **yapısal olarak** ortadan kaldırdı?',
        secenekler:[
          'Yetki hataları',
          'Dönem hataları',
          '**FI/CO ve toplam/indeks tablosu mutabakat farkları**',
          'Dump’lar',
        ], dogru:2,
        aciklama:'ECC’de FI ve CO **ayrı tablolarda** dururdu; aralarındaki fark ' +
                 'gerçek bir sorundu ve {{F.03}} gibi mutabakat raporları bu yüzden vardı. ' +
                 'Aynı şekilde toplam ({{GLT0}}) ve indeks ({{BSIK}}) tabloları ' +
                 'kaynakla tutarsız olabilirdi.\n\n' +
                 '{{ACDOCA}}’da hepsi **tek tablo veya ondan türetilmiş görünümdür** — ' +
                 'tutarsızlık **yapısal olarak imkânsızdır**.\n\n' +
                 '**Mimari ders:** bir veriyi iki yerde tutmayı bırakınca, ' +
                 '*"iki yer uyuşmuyor"* hata sınıfı kendiliğinden yok olur.\n\n' +
                 'Buna karşılık **yeni bir sınıf doğdu:** geçiş hataları ve ' +
                 '{{uyumluluk-view}} performans sorunları.' },
    ],

    flashcards:[
      { on:'Üç hata sınıfı', arka:'**① Konuşan** — mesaj var, çözümü işaret eder\n*Kolay. Uzun metni oku.*\n\n**② Sessiz** — mesaj yok, sonuç yanlış\n*En tehlikeli. Danışmanı ayıran sınıf.*\n\n**③ Çöken** — program durdu (dump)\n*Gürültülü ama nadir.*' },
      { on:'En yüksek getirili alışkanlık', arka:'**Mesajın üzerine ÇİFT TIKLA**\n\nUzun metin üç bölüm içerir:\n• **Teşhis** — ne oldu\n• **Sistem yanıtı** — sistem ne yaptı\n• **Prosedür** — **ne yapılmalı**\n\nÜçüncüsü çoğu vakayı **tek başına** çözer.' },
      { on:'Mesaj numarası vs metin', arka:'**Metin** — dile göre değişir, sürümle güncellenir, çevirisi eksik olabilir\n\n**Numara** — `F5 201` · **değişmez**\n\nSınıflar: `F5` FI kayıt · `FS` G/L · `AA` varlık · `KI` CO · `M8` MM fatura' },
      { on:'Aramayı ikiye bölen soru', arka:'**"Daha önce çalışıyor muydu?"**\n\n*"Hiç çalışmadı"* → **YAPILANDIRMA**\nYeni hesap, vergi kodu, değerleme sınıfı\n\n*"Dün çalışıyordu"* → **DEĞİŞİKLİK**\n{{CDHDR}} / {{CDPOS}} · taşıma · rol · dönem' },
      { on:'{{SM37}} ≠ {{SLG1}}', arka:'**{{SM37}}** → *"Program çöktü mü?"*\n\n**{{SLG1}}** → *"İş DOĞRU yapıldı mı?"*\n\nİş **yeşil**, günlük **kırmızı** olabilir.\nToplu programlar hatalı kalemi **atlayıp devam eder**.\n\nKapanışta: **"SLG1 kırmızı = 0"**' },
      { on:'Boş liste geldi, hata yok', arka:'**1.** {{SE16N}} → tabloda veri var mı?\n→ Varsa **erişim** sorunu, yoksa **kayıt** sorunu\n\n**2.** **HEMEN** {{SU53}}\n\n**Neden mesaj yok?** Rapor yetkiyi **süzgeç** olarak uygular — yetkisiz şirket kodu **hiç sorgulanmaz**. Program açısından hata değil.' },
      { on:'"Kaydedildi" dedi, belge yok', arka:'**{{guncelleme-hatasi}}**\n\n① **Diyalog görevi** → numara verilir, mesaj çıkar\n② **Güncelleme görevi** → asenkron yazma\n\nİkincisi çökerse: **mesaj var, belge yok, numara yandı**\n\n{{SM13}}\nToplu yüklemede **sayı mutabakatı** şart' },
      { on:'"Dönem kapalı" ama OB52 açık', arka:'**HESAP TÜRÜ SATIRI**\n\n`+` genel · `S` G/L · **`K` satıcı** · `D` müşteri · `A` varlık\n\nSatıcı faturası için `K` kapalıysa `+` açık olsa bile hata!\n\nİki kontrol daha:\n• **İkinci aralık** (özel dönem 13–16)\n• Varlıksa **AA dönemi**' },
      { on:'"Hesap belirleme yapılamadı"', arka:'**Modül tabloyu söyler:**\n\n**MM** → {{OBYC}} (BSX/WRX/PRD/GBB)\n**SD** → {{VKOA}} (ERL/ERS/ERF)\n**Vergi** → {{OB40}} / {{T030K}}\n**Varlık** → {{AO90}}\n\nEn sık sebep: **yeni değerleme sınıfı** açılmış, satır eklenmemiş' },
      { on:'Belirti → araç kartı', arka:'Boş liste → **{{SU53}}**\nBelge yok → **{{SM13}}**\nDonuyor → **{{SM12}}**\nToplu eksik → **{{SLG1}}**\nÇıktı yok → **{{SP01}}**\nÇöktü → **{{ST22}}**\nAyar etkisiz → **{{tampon}}** / STMS\nDeğer değişiyor → **{{GGB1}}**\n"Dün çalışıyordu" → **{{CDHDR}}**' },
      { on:'Düzeltmenin maliyeti', arka:'**Önlendi** → 0 belge ✓\n**Aynı gün** → 3 belge\n**Aynı dönem** → 3 belge + mizan kontrolü\n**Dönem kapandıktan sonra** → + yanlış döneme düşen düzeltme\n**Beyandan sonra** → + **düzeltme beyannamesi** \n\n→ Hata yönetimi bir **önleme** konusudur' },
      { on:'{{OBA5}} — "hatayı sustur" aracı DEĞİL', arka:'Kapatmadan önce: **bu uyarı neyi koruyordu?**\n\nÇok çıkıyorsa ya uyarı **işini yapıyordur** (önleme gerekir) ya da anlamsızdır (**gerekçe belgelenir**)\n\n**Ters yön daha değerli:**\nKritik kontrol `W` ise → **`E`** yap\n**Yalnızca `E` gerçek korumadır**' },
      { on:'Kapanış refleksi — iki soru', arka:'**1. "Bu neden mümkün oldu?"**\n→ Kök sebep. Üç kez "neden" sor.\n→ Belirtiyi düzeltmek yarın tekrar eder.\n\n**2. "Başka kimde var?"**\n→ Aynı rol / hesap / vergi kodu / sınıf\n→ Sessiz hatalar **bildirilmez, etrafından dolaşılır**' },
      { on:'S/4HANA — kalkan hata sınıfı', arka:'**Mutabakat farkları YAPISAL OLARAK imkânsız**\n\nECC: FI ≠ CO · GLT0 ≠ BSEG · BSIK ≠ BSEG\nS/4: hepsi {{ACDOCA}} veya ondan **türetilmiş görünüm**\n\n*Bir veriyi iki yerde tutmayı bırakınca, "iki yer uyuşmuyor" hatası yok olur.*\n\nYeni sınıf: **geçiş hataları** + uyumluluk görünümü performansı' },
    ],
  },

  },
});
