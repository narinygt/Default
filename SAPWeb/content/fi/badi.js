/* ==========================================================================
   content/fi/badi.js — "BAdI (Genişletme Noktası) / BAdI (Enhancement Point)"
   ========================================================================== */

SAP.registerTopic({
  id: 'badi',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'BAdI (Business Add-In), SAP’ın standart akışın içine **önceden bıraktığı bir kancadır**. ' +
      'Standart kodu değiştirmek yerine, SAP’ın tanımladığı bir **arayüzü** (interface) ' +
      'müşterinin kendi sınıfında **uygulaman** yeterlidir.\n\n' +
      'İki taraf net ayrılır:\n\n' +
      '**Tanım (definition)** — SAP’ın işi. Kancanın nerede duracağını, hangi metotları ' +
      'taşıyacağını, çoklu kullanıma izin verip vermeyeceğini ve filtre destekleyip ' +
      'desteklemeyeceğini SAP belirler. {{SE18}} bu tanımın ekranıdır.\n\n' +
      '**Uygulama (implementation)** — müşterinin işi. Tanımlı arayüzü kendi sınıfında ' +
      'dolduran koddur. {{SE19}} uygulamanın atandığı ekrandır; gerçek kod {{SE24}}’te durur.\n\n' +
      'Standart koda tek satır bile dokunulmaz — bu, BAdI’nin {{konu:dogrulama-ikame}} ' +
      'konusundaki kural motoruyla paylaştığı temel fikirdir: ikisi de SAP’ın bıraktığı ' +
      'bir noktada devreye girer. Fark, o noktada ne yazılabileceğidir. Doğrulama/ikame ' +
      'önceden tanımlı bir kalıba (önkoşul + kontrol veya önkoşul + alan ataması) sıkışırken, ' +
      'BAdI’nin sınırı **ABAP’ın kendisidir** — herhangi bir tabloyu okuyabilir, dışarıya ' +
      'sistem çağrısı yapabilir, herhangi bir alanı değiştirebilir.',

    neden:
      '**Standart yapılandırma da, kural motoru da yetmez.** {{SPRO}} bir alanı zorunlu ' +
      'yapabilir; {{GGB0}}/{{GGB4}} kayıt anında bir alanı doldurabilir veya kaydı ' +
      'engelleyebilir — ama ikisi de **sabit bir kalıba** bağlıdır: önkoşul + tek bir sonuç. ' +
      'Dışarıdaki bir sisteme sorgu atmak, birden çok tabloyu karmaşık bir mantıkla ' +
      'birleştirmek veya koşullu dallanma kurmak bu kalıba sığmaz.\n\n' +
      '**BAdI, SAP’ın izin verdiği noktada tam ABAP gücü verir.** Standart kod hâlâ ' +
      'değişmediği için sürüm yükseltmesi standart yapılandırma kadar güvenlidir — ' +
      'ama artık kural motorunun sınırı da yoktur.\n\n' +
      '**Dört basamaklı merdiven bu yüzden vardır** (bkz. sirketOnemi): her basamak bir ' +
      'öncekinin yetmediği yerde başlar ve her basamak bir öncekinden daha pahalıdır.',

    sirketOnemi:
      'Danışmanın önünde **dört basamaklı bir merdiven** vardır ve her basamağa inmek ' +
      'bir maliyet artışıdır:\n\n' +
      '**① Standart yapılandırma** ({{SPRO}}) — hiçbir kod yok, yükseltmede risk sıfıra yakın.\n\n' +
      '**② Doğrulama / ikame** (bkz. {{konu:dogrulama-ikame}}) — hâlâ yapılandırma, ama artık ' +
      'bir kural motoru; kayıt anında çalışır ve genelde ABAP gerektirmez.\n\n' +
      '**③ BAdI / genişletme** — artık gerçek kod var, ama SAP’ın **izin verdiği** noktada; ' +
      'standart nesneye dokunulmadığı için yükseltme uyarlama listesinde ({{SPAU}}) **görünmez**.\n\n' +
      '**④ Modifikasyon** — SAP’ın standart kodu doğrudan değiştirilir; her yükseltmede ' +
      'elle uyarlanır ({{SPAU}}/{{SPDD}}), en pahalı ve en kırılgan seçenek — **son çare**.\n\n' +
      'Danışmanın işi, ihtiyacı **mümkün olan en yukarı basamakta** çözmektir. ③’e inmeden ' +
      'önce sorulacak soru: *"bu gerçekten standart yapılandırmayla veya bir kural motoruyla ' +
      'çözülemez mi?"* ④’e inmeden önce sorulacak soru daha serttir: *"bu bir BAdI olarak ' +
      'yazılamaz mı?"* — çünkü ④’ün maliyeti bir kerelik değil, **her yükseltmede tekrarlanan** ' +
      'bir maliyettir ({{z-gelistirme}}, {{standarda-yakin}}).',

    gercekHayat:
      'Bir satıcı faturası kaydedilirken kâr merkezinin **masraf türüne ve tutara göre** ' +
      'belirlenmesi isteniyor: 50.000 TL altı giderler her zaman ilgili departmanın kâr ' +
      'merkezine, 50.000 TL üstü giderler ise otomatik olarak merkezi yönetim kâr merkezine ' +
      'yazılsın.\n\n' +
      '**Önce {{GGB1}} denenir:** önkoşul + hedef alan + değer kaynağı yapısı bir *eşik* ' +
      'mantığına izin vermez — ikame sabit bir değer atar veya başka bir alandan kopyalar, ' +
      '*"tutara göre iki değerden birini seç"* koşullu dallanmasını kuramaz.\n\n' +
      '**BAdI ile çözülür:** ilgili tanımın (örn. `AC_DOCUMENT` — muhasebe belgesi değişim ' +
      'noktası) bir uygulaması yazılır; uygulamanın kod gövdesinde tutar kontrolü iki farklı ' +
      'kâr merkezinden birini seçer. Aynı iş, kural motorunun kalıbına sığmadığı için ABAP’a ' +
      'inmek zorunda kaldı — ama standart koda dokunulmadı, yalnızca SAP’ın bıraktığı ' +
      'kancaya bağlanıldı.',

    muhasebeMantigi:
      'BAdI’nin muhasebe mantığı, {{konu:dogrulama-ikame}} konusundaki ikamenin mantığıyla ' +
      '**aynı köktendir ama daha keskindir**: bir BAdI kendi başına **hiçbir kayıt üretmez** — ' +
      'kaydı üreten her zaman standart posting mantığıdır. BAdI yalnızca o kaydın **bir ' +
      'alanını değiştirebilir**, öncesinde çalışıp değeri belirleyebilir veya (bazı ' +
      'tanımlarda) bir istisna fırlatıp kaydı **durdurabilir**.\n\n' +
      'Fark şudur: ikamenin değiştirebileceği alan **{{GB01}} tablosuyla sınırlıdır** ve ' +
      'değişikliğin mantığı bir ekranda (önkoşul + hedef alan) okunabilir. Bir BAdI ' +
      'uygulamasının **hiçbir sınırı yoktur** — ABAP koduyla herhangi bir tabloyu okuyup ' +
      'herhangi bir alanı yazabilir, ve mantığı yalnızca **kod okunarak** anlaşılır.\n\n' +
      'Bu, denetim izi açısından ikameden bir derece daha risklidir: ikamenin ne yaptığını ' +
      '{{GGB0}} veya {{GGB1}} ekranını açan herhangi bir fonksiyonel danışman görebilir. ' +
      'Bir BAdI’nin ne yaptığını görmek için **{{SE19}}’da hangi uygulamanın aktif olduğunu ' +
      'bulmak ve {{SE24}}’te kodu okumak** gerekir — bu, muhasebe ekibinin kendi başına ' +
      'yapabileceği bir iş değildir.',

    kavramlar: ['z-gelistirme', 'standarda-yakin', 'bapi', 'tasima-istegi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Bir BAdI uygulaması yazmak, {{konu:dogrulama-ikame}}’deki "tanımla → ata → etkinleştir" ' +
      'üçlüsünden farklı bir akıştır — çünkü tanımlama adımı zaten **SAP tarafından ' +
      'yapılmıştır**. Danışmanın/geliştiricinin işi **bul → uygula → etkinleştir → taşı**dır ' +
      've ilk adım genellikle atlanan değil, **en çok zaman alan** adımdır: doğru kancayı bulmak.',

    roller: [
      { rol:'İş birimi', gorev:'İhtiyacı iş diliyle tarif eder: "tutara göre kâr merkezi farklı belirlensin".' },
      { rol:'FI danışmanı', gorev:'Standart yapılandırma veya {{konu:dogrulama-ikame}} ile çözülüp çözülemeyeceğini değerlendirir.' },
      { rol:'FI danışmanı', gorev:'İlgili sürecin çağrı noktasında bir tanım olup olmadığını {{SE18}} ile arar.' },
      { rol:'ABAP geliştirici', gorev:'{{SE19}} ile uygulama oluşturur; filtre değerini ve çoklu kullanım durumunu kontrol eder.' },
      { rol:'ABAP geliştirici', gorev:'Arayüz metotlarını {{SE24}}’te kodlar.' },
      { rol:'FI danışmanı', gorev:'Uygulamayı hem hedef senaryoda hem **normal kayıtlarda** test eder.' },
      { rol:'Basis', gorev:'Nesneyi taşıma isteğiyle ({{tasima-istegi}}) canlıya alır.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'BAdI yazmak — bul, uygula, etkinleştir, taşı',
      adimlar:[
        { ic:'💬', rol:'İş birimi', baslik:'İhtiyaç iş diliyle tarif edilir',
          aciklama:'*"Tutara göre kâr merkezi farklı belirlensin"*. Önce **merdiven ' +
                   'basamakları** tek tek elenir: standart var mı, kural motoru yeter mi?',
          cikti:'İş ihtiyacı', ok:'kalıba sığmıyorsa' },
        { ic:'🔎', rol:'Danışman', baslik:'Kanca aranır ({{SE18}})',
          aciklama:'İlgili çağrı noktasında bir tanım var mı? Varsa: çoklu kullanıma izin ' +
                   'veriyor mu, filtre destekliyor mu, kaç uygulaması zaten aktif?',
          cikti:'Tanım bulundu', ok:'uygulama açılır' },
        { ic:'🧩', rol:'Geliştirici', baslik:'Uygulama oluşturulur ({{SE19}})',
          aciklama:'Ad verilir, sınıf atanır, filtre değeri girilir (destekleniyorsa). ' +
                   '**Boş filtre** ve **çoklu kullanım** burada ilk kez kontrol edilir.',
          cikti:'Uygulama kaydı', ok:'kod yazılır' },
        { ic:'👨‍💻', rol:'Geliştirici', baslik:'Mantık kodlanır ({{SE24}})',
          aciklama:'Arayüz metodunun gövdesine iş mantığı yazılır. Burada yazılanı okumak ' +
                   'için {{konu:dogrulama-ikame}} gibi bir "önkoşul" alanı yoktur — kod, koddur.',
          cikti:'Kodlu sınıf', ok:'etkinleştirilir' },
        { ic:'🔌', rol:'Geliştirici', baslik:'**Etkinleştirilir** ({{SE19}})',
          aciklama:'Pasif kalan uygulama listede görünür ama **çalışmaz** — ' +
                   '{{GGB4}}’ün seviye 0 durumunun BAdI karşılığı.',
          cikti:'Çalışan uygulama', ok:'test edilir' },
        { ic:'🧪', rol:'Danışman', baslik:'İki yönlü test edilir',
          aciklama:'**Pozitif:** hedef senaryo doğru mu? **Negatif:** filtre dışındaki ve ' +
                   'çoklu kullanım altındaki normal kayıtlar bozuluyor mu?',
          cikti:'Doğrulanmış uygulama', ok:'taşınır' },
        { ic:'📦', rol:'Basis', baslik:'**Taşınır** ({{tasima-istegi}})',
          aciklama:'Workbench isteğidir — {{GGB0}} gibi menüden elle taşıma isteğine ' +
                   'eklenmez, kayıt anında **otomatik yakalanır**. Etkinlik durumu ayrı bir ' +
                   'risk taşır (bkz. teknik → transport).',
          cikti:'Canlı uygulama' },
      ],
    },

    adimlar:[
      { rol:'Danışman', eylem:'Merdiven basamaklarını eler', sistem:'{{SPRO}} → {{konu:dogrulama-ikame}} → BAdI' },
      { rol:'Danışman', eylem:'Kanca arar', sistem:'{{SE18}} — arayüz, çoklu kullanım, filtre' },
      { rol:'Geliştirici', eylem:'Uygulama oluşturur', sistem:'{{SE19}} — ad, sınıf, filtre değeri' },
      { rol:'Geliştirici', eylem:'Mantığı kodlar', sistem:'{{SE24}} — arayüz metodu gövdesi' },
      { rol:'Geliştirici', eylem:'**Etkinleştirir**', sistem:'{{SE19}} — pasif kalan uygulama çalışmaz' },
      { rol:'Danışman', eylem:'Pozitif ve negatif test yapar', sistem:'Filtre dışı kayıtlar bozulmamalı' },
      { rol:'Basis', eylem:'Taşıma isteğiyle canlıya alır', sistem:'{{tasima-istegi}} — workbench isteği' },
      { rol:'Danışman', eylem:'Uygulamayı envanterde belgeler', sistem:'{{SXS_ATTR}} / {{TADIR}} üzerinden doğrulanır' },
    ],

    veriAkisi:{
      nereden:'Standart sürecin çağrı noktasına gelen veri (belge, kullanıcı girdisi) + geliştiricinin ABAP kodu.',
      nereye:'Uygulamanın yazdığı herhangi bir tablo — {{BSEG}}, {{BKPF}}, {{ACDOCA}} veya ' +
             'harici sistem; sınır {{GB01}} gibi bir liste değil, kodun kendisidir.',
      tetikleyen:'Tanımın SAP standart kodunda çağrıldığı her an — {{SE18}} arayüzünde belirtilen nokta.',
      sonraki:'Standart sürecin devamı veya (istisna fırlatılırsa) sürecin durması.',
    },

    notlar:[
      { tip:'warn', baslik:'İki tuzak, aynı belirti: "bazen çalışıyor, bazen çalışmıyor"', metin:
        '**Çoklu kullanım tuzağı:** bir tanım birden fazla aktif uygulamaya izin veriyorsa ' +
        '({{SXS_ATTR}} `MULTIPLE_USE` işaretli), hepsi çalışır ama **çalışma sırası SAP ' +
        'tarafından garanti edilmez**. İki uygulama aynı alanı farklı değerlere yazıyorsa ' +
        'sonuç, o an hangisinin son çalıştığına bağlıdır — canlıda *"bazen oluyor bazen ' +
        'olmuyor"* şikâyetinin klasik sebebi budur.\n\n' +
        '**Filtre tuzağı:** tanım bir filtre alanı taşıyorsa (örn. şirket kodu), uygulama ' +
        '**yalnızca o filtre değerinde** çalışır. *"Genişletme çalışmıyor"* ihbarında ' +
        'kontrol edilecek ilk şey budur — çoğu vakada BAdI bozuk değildir, filtre değeri ' +
        'eksiktir.\n\n' +
        '**İkisi de hata mesajı üretmez.** Filtre eşleşmiyorsa uygulama sessizce atlanır; ' +
        'çoklu kullanımda ikisi de kendi içinde "başarıyla" çalışır. Teşhis {{SE18}} → ' +
        'Uygulamalar sekmesinden başlar.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Bir BAdI uygulaması **kendi başına hiçbir muhasebe kaydı üretmez** — kaydı her zaman ' +
      'standart posting mantığı üretir. Ama uygulama, o kaydın satırlarını **kayıt anında, ' +
      'hiçbir iz bırakmadan** değiştirebilir. Aşağıdaki fişler aynı girdiyle üç farklı ' +
      'sonucu gösteriyor: BAdI hiç çalışmadı (filtre tuzağı), BAdI sessizce bir alanı ' +
      'değiştirdi, ve iki aktif uygulama aynı alanı **farklı sırayla** işlediği için aynı ' +
      'girdi iki farklı günde iki farklı sonuç verdi.',

    etkilenenHesaplar:[
      { hesap:'BAdI — kendi başına hiçbir hesap', tur:'—', neden:'Kaydı üreten her zaman standart posting mantığıdır; BAdI yalnızca sonucu değiştirir.' },
      { hesap:'BAdI — değiştirilen alanlar (herhangi bir tablo)', tur:'Değişken', neden:'{{GB01}} gibi bir sınır yok; uygulama {{BSEG}}, {{BKPF}}, hatta {{ACDOCA}} türetimini etkileyebilir.' },
      { hesap:'770200 Pazarlama gideri', tur:'Gelir Tablosu — Gider', neden:'Örnek: kâr merkezi türetme BAdI’sinin hedefi.' },
      { hesap:'{{kar-merkezi}}', tur:'Raporlama boyutu', neden:'BAdI ile en sık değiştirilen alanlardan biri — {{konu:dogrulama-ikame}} konusundaki ikamenin de en yaygın hedefidir.' },
    ],

    fisler:[
      { baslik:'BAdI hiç çalışmadı — filtre tuzağı',
        belgeTuru:'KR', tarih:'08.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770200', ad:'Pazarlama gideri — şirket kodu 2000', borc:62000,
            not:'Kâr merkezi **kullanıcının girdiği gibi** kaldı: PC-2000' },
          { hesap:'320', ad:'Satıcılar', alacak:62000 },
        ],
        not:'Uygulamanın filtre değeri yalnızca şirket kodu **1000** için girilmiş; ' +
             '2000 için tanım **hiçbir zaman çağrılmadı**.\n\n' +
             'Hiçbir hata mesajı çıkmadı çünkü filtre eşleşmemesi bir hata değil, ' +
             '**tasarım gereği bir atlamadır**. Danışman ilk bakışta *"BAdI bozuk"* diye ' +
             'düşündü — oysa doğru soru *"bu şirket kodu için filtre değeri girilmiş mi?"* ' +
             'olmalıydı.' },

      { baslik:'BAdI sessizce alanı değiştirdi — asıl risk',
        belgeTuru:'KR', tarih:'08.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770200', ad:'Pazarlama gideri — kullanıcı PC-2000 girdi', borc:62000,
            not:'Kaydedilen: **PC-9000** — BAdI değiştirdi (tutar > 50.000 kuralı)' },
          { hesap:'320', ad:'Satıcılar', alacak:62000 },
        ],
        not:'Bu kez şirket kodu **1000** olduğu için filtre eşleşti ve uygulama çalıştı: ' +
             'tutar 50.000 TL’yi geçtiği için kâr merkezi PC-9000’e (merkezi yönetim) ' +
             '**zorla** yazıldı.\n\n' +
             '**Hiçbir mesaj çıkmadı.** Kullanıcı {{FB03}} ile belgeyi açıp PC-9000 görürse ' +
             '*"ben PC-2000 girdim"* der — ve haklıdır. Kural tasarım gereği doğru çalıştı ' +
             'ama **belgelenmediği için** kimse bu davranışı bilmiyordu.' },

      { baslik:'Çoklu kullanım — aynı kayıt Pazartesi günü',
        belgeTuru:'KR', tarih:'12.02.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770300', ad:'AR-GE gideri — kullanıcı PC-3000 girdi', borc:118000,
            not:'Kaydedilen: **PC-9000** — eşik kuralı uygulaması önce çalıştı' },
          { hesap:'320', ad:'Satıcılar', alacak:118000 },
        ],
        not:'Aynı tanımda **iki aktif uygulama** var: biri tutar eşiğine göre kâr merkezi ' +
             'seçiyor, diğeri masraf türüne göre eşleme yapıyor. Bu gün eşik kuralı **önce** ' +
             'çalıştı ve sonucu diğer uygulama ezmedi.' },

      { baslik:'Çoklu kullanım — aynı kayıt Salı günü, farklı sonuç',
        belgeTuru:'KR', tarih:'13.02.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770300', ad:'AR-GE gideri — kullanıcı yine PC-3000 girdi', borc:118000,
            not:'Kaydedilen: **PC-4100** — bu kez masraf türü eşlemesi son çalıştı' },
          { hesap:'320', ad:'Satıcılar', alacak:118000 },
        ],
        not:'**Aynı girdi, aynı kullanıcı, bir gün fark — farklı sonuç.** SAP, çoklu ' +
             'kullanıma açık bir tanımda uygulamalar arasında **çalışma sırası garantisi ' +
             'vermez**; bir destek paketi veya yeni bir taşıma bu sırayı değiştirebilir.\n\n' +
             'İkisi de tek başına doğru çalışıyor — hata mesajı yok, dump yok. Sorun yalnızca ' +
             '**iki bağımsız uygulamanın aynı alanı hedeflemesidir**.' },
    ],

    tHesaplar:[
      { hesap:'AR-GE gideri — tutarsız kâr merkezi dağılımı', kod:'770300',
        borc:[{ ad:'PC-9000’e düşen kalemler (eşik kuralı kazandı)', tutar:118000 },
              { ad:'PC-4100’e düşen kalemler (eşleme kazandı)', tutar:118000 }],
        alacak:[],
        not:'Aynı hesap, aynı tür işlem — iki farklı kâr merkezinde. Mutabakat raporu ' +
            'bunu **hata** olarak değil, "beklenmedik dağılım" olarak gösterir.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Hata mesajı yok çünkü hata yok — ikisi de "doğru" çalışıyor', metin:
        'Sistem açısından hiçbir şey yanlış değildir: filtre eşleşmediğinde atlamak ' +
        '**tasarımdır**; çoklu kullanımda her uygulama **kendi mantığında doğru** sonuç ' +
        'üretir. Hata, tek bir uygulamanın kodunda değil, **iki uygulamanın bir arada var ' +
        'olmasındadır** — ve bunu gösteren hiçbir sistem mesajı yoktur.\n\n' +
        'Bu, {{konu:dogrulama-ikame}} konusundaki ikamenin sessizliğinden bir derece ötedir: ' +
        'orada en azından tek bir kural vardır ve davranışı öngörülebilir. Burada davranış ' +
        '**öngörülemezdir** çünkü SAP sıra garantisi vermemiştir.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'BAdI ve genişletme dünyası **üç eksende** çeşitlenir: **merdiven basamağı** (hangi ' +
      'araç kullanılmalı), **kullanım şekli** (tekli/çoklu, filtreli/filtresiz) ve **nesil** ' +
      '(klasik müşteri çıkışı / modern BAdI).',

    liste:[
      { ad:'Basamak · Standart yapılandırma', en:'Standard Configuration',
        aciklama:'Kod yok; {{SPRO}} IMG düğümünde bir ayar.',
        neZaman:'İhtiyaç önceden tanımlı bir alan veya kuralla karşılanıyorsa.',
        ornek:'Yükseltmede risk **sıfıra yakındır** — hiçbir özel kod taşınmaz.' },

      { ad:'Basamak · Doğrulama / İkame', en:'Validation / Substitution',
        aciklama:'Kayıt anında çalışan kural motoru; sabit bir kalıba bağlıdır.',
        neZaman:'İhtiyaç önkoşul + kontrol veya önkoşul + alan ataması kalıbına sığıyorsa.',
        ornek:'Bkz. {{konu:dogrulama-ikame}} — {{GGB0}}/{{GGB1}} ile tanımlanır, kod ' +
              'gerektirmez (kullanıcı çıkışı hariç).' },

      { ad:'Basamak · BAdI / Genişletme', en:'BAdI / Enhancement',
        aciklama:'SAP’ın bıraktığı noktada tam ABAP; standart koda dokunulmaz.',
        neZaman:'İhtiyaç kalıba sığmıyor ama SAP uygun bir kanca bırakmışsa.',
        ornek:'Standart nesne değişmediği için yükseltme uyarlama listesinde ({{SPAU}}) ' +
              '**görünmez**.',
        tcodes:['SE18','SE19'] },

      { ad:'Basamak · Modifikasyon', en:'Modification',
        aciklama:'Standart SAP kodu doğrudan değiştirilir — **son çare**.',
        neZaman:'Hiçbir kanca yoksa ve iş gerçekten SAP’ın standart davranışını değiştirmeyi gerektiriyorsa.',
        ornek:'Her yükseltmede {{SPAU}}/{{SPDD}} ile elle uyarlanır — maliyet bir kerelik değil, **tekrarlıdır**.' },

      { ad:'Kullanım · Tekli (Single Use)',
        aciklama:'Tanım en fazla bir aktif uygulamaya izin verir.',
        neZaman:'SAP bu tanımı kasıtlı olarak tek uygulamaya kilitlemiştir — sonucun tekil olması gereken noktalarda.',
        ornek:'İkinci bir uygulama oluşturmaya çalışırsan {{SE19}} bunu engeller.' },

      { ad:'Kullanım · Çoklu (Multiple Use) — tuzak',
        aciklama:'Birden fazla uygulama aynı anda aktif olabilir; **çalışma sırası garanti değildir**.',
        neZaman:'Tanımın {{SXS_ATTR}} kaydında varsayılan olarak açıktır — kimse kapatmaz.',
        ornek:'İki bağımsız uygulama aynı alanı değiştiriyorsa sonuç **öngörülemez**.' },

      { ad:'Kullanım · Filtreli (Filter-Dependent) — tuzak',
        aciklama:'Tanım bir filtre alanı (örn. şirket kodu) taşır; uygulama yalnız o değerde çalışır.',
        neZaman:'"Genişletme bir şirket kodunda çalışıyor, diğerinde çalışmıyor" ihbarının ilk sebebi.',
        ornek:'Filtre değeri girilmemiş bir şirket kodu için uygulama **sessizce atlanır** — hata yok.' },

      { ad:'Nesil · Klasik müşteri çıkışı (Customer Exit)',
        aciklama:'{{SMOD}}/{{CMOD}} ikilisiyle yönetilen, fonksiyon modülü tabanlı eski nesil.',
        neZaman:'ECC öncesi/erken projelerde; hâlâ birçok kurulumda aktif.',
        ornek:'{{MODSAP}} bu bileşenlerin kaydını tutar: fonksiyon çıkışı, ekran çıkışı, menü çıkışı.',
        tcodes:['CMOD','SMOD'] },

      { ad:'Nesil · Modern BAdI (Interface-Based)',
        aciklama:'Arayüz tabanlı, sınıf içinde uygulanır ({{SE24}}).',
        neZaman:'Yeni geliştirmelerde standart yoldur.',
        ornek:'{{SE18}} tanımı, {{SE19}} uygulaması — arayüz metotları sabit, gövde serbest.' },
    ],

    karsilastirmaBasliklar:['Doğrulama / İkame', 'BAdI'],
    karsilastirma:[
      ['Ne yazar', 'Danışman — sabit kalıpla', 'ABAP geliştirici — serbest kod'],
      ['Görünürlük', '{{GGB0}}/{{GGB1}} ekranında okunur', '{{SE19}}’da bulunur, mantık yalnız {{SE24}}’te okunur'],
      ['Değiştirebileceği alan', '{{GB01}} listesiyle sınırlı', 'Sınırsız — herhangi bir tablo'],
      ['Taşıma', '{{GGB0}}/{{GGB1}} menüsünden özelleştirme isteğine **elle** eklenir', '{{SE19}}/{{SE24}} kaydedildiğinde workbench isteğine **otomatik** girer'],
      ['Çalışma noktası', '{{OB28}}/{{OBBH}} ile atanan sabit çağrı noktaları', '{{SE18}} tanımının SAP kodunda bıraktığı **tek** nokta'],
      ['Sıra garantisi', 'Tek nesne — adımlar sırayla eklenir', '**Çoklu kullanımda garanti yok**'],
      ['Ne zaman tercih edilir', 'İhtiyaç önkoşul + kontrol/atama kalıbına sığıyorsa', 'Kalıba sığmıyor ama SAP bir kanca bırakmışsa'],
      ['Ortak nokta', 'İkisi de **kayıt anında** çalışır', 'İkisi de **sessizce** veri değiştirebilir'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'SE18', ad:'BAdI tanımı — SAP’ın bıraktığı kanca',
        amac:'Bir BAdI tanımının arayüzünü, metotlarını, çoklu kullanım ve filtre desteğini gösterir; var olan tüm uygulamaları listeler.',
        neZaman:'BAdI yazmadan önce "burada gerçekten bir kanca var mı?" sorusunun cevaplandığı ilk ekran; teşhiste "kaç uygulama aktif?" sorusunun cevaplandığı yer.',
        adimlar:[
          { baslik:'Tanım adını gir veya paket/nesne türüyle ara',
            aciklama:'Adı bilinmiyorsa {{SE80}} paket ağacından veya ilgili programın kaynağından bulunur.' },
          { baslik:'Arayüz sekmesini incele',
            aciklama:'Hangi metotlar var, hangi parametreleri taşıyorlar — uygulamada neyin değiştirilebileceğini belirler.' },
          { baslik:'**Çoklu kullanım** işaretini kontrol et',
            aciklama:'İşaretliyse birden fazla uygulama aktif olabilir ve **sıra garanti değildir**.' },
          { baslik:'**Filtre** desteğini kontrol et',
            aciklama:'Doluysa uygulamalar yalnızca belirli bir filtre değerinde çalışır.' },
          { baslik:'Uygulamalar sekmesinden mevcut uygulamaları listele',
            aciklama:'Hangileri aktif, hangi paketten, kim yazmış — teşhisin başlangıç noktası.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Tanım adı: `AC_DOCUMENT` (örnek — muhasebe belgesi değişim noktası)' },
          { ekran:'Arayüz', islem:'Metot: `CHANGE` — belge kalemlerini değiştirme imkânı' },
          { ekran:'Özellikler', islem:'Çoklu kullanım: **İşaretli** · Filtre: **Yok**' },
          { ekran:'Uygulamalar', islem:'2 aktif uygulama listelenir: `Z_PRCTR_ESIK_KURALI`, `Z_PRCTR_MASRAF_ESLEME`' },
        ],
        alanlar:{ zorunlu:['Tanım adı'], opsiyonel:['Paket/nesne türü filtresi'] },
        hatalar:[
          { mesaj:'Bu süreçte bir kanca var mı bilmiyorum', sebep:'Kancanın adı belgelenmemiş.', cozum:'{{SE80}} ile ilgili programın kaynağı taranır; kod içindeki BAdI çağrısı kancanın adını ve konumunu gösterir.' },
          { mesaj:'Tanım var ama hiç uygulama yok', sebep:'Kimse henüz uygulamamış — kanca boş.', cozum:'{{SE19}} ile yeni uygulama oluşturulur.' },
          { mesaj:'Birden fazla uygulama listeleniyor ama davranış tutarsız', sebep:'**Çoklu kullanım tuzağı** — sıra garanti değil.', cozum:'Uygulamaları tek mantığa birleştir veya {{SE24}} kodunda açık öncelik kur.' },
        ],
        ipucu:'**Teşhis her zaman burada başlar.** "Bu BAdI çalışmıyor" şikâyetinde önce ' +
              '{{SE18}} → Uygulamalar sekmesine bakılır: kaç uygulama aktif, hangileri, kim ' +
              'yazmış. Çoklu kullanım işaretliyse ve birden fazla aktif uygulama varsa, ' +
              '"çalışmıyor" değil **"öngörülemez çalışıyor"** demektir — ikisi çok farklı ' +
              'sorunlardır.',
        ilgili:['SE19','SE24','SE80'] },

      { kod:'SE19', ad:'BAdI uygulaması — müşterinin kodu',
        amac:'Tanımlı bir BAdI’ye kendi sınıfını bağlar, filtre değeri atar, aktif/pasif eder.',
        neZaman:'Standart yapılandırma ve kural motoru yetmediğinde, {{SE18}}’de uygun bir kanca bulunduktan sonra.',
        adimlar:[
          { baslik:'Tanım adını gir', aciklama:'{{SE18}}’de bulunan tanım.' },
          { baslik:'Yeni uygulama oluştur, ad ver', aciklama:'Ad genelde `Z*`/`Y*` ile başlar — müşteri geliştirmesi olduğunu gösterir.' },
          { baslik:'Uygulama sınıfını ata', aciklama:'Yeni sınıf oluşturulur veya var olan seçilir — kod {{SE24}}’te yazılır.' },
          { baslik:'**Filtre değerini gir** (tanım filtre destekliyorsa)',
            aciklama:'Boş bırakılırsa uygulamanın davranışı tanıma bağlıdır — kontrol edilmeden varsayım yapılmaz.' },
          { baslik:'**Etkinleştir**', aciklama:'Pasif bırakılan uygulama listelenir ama **çalışmaz**.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Tanım: `AC_DOCUMENT`' },
          { ekran:'Uygulama', islem:'Ad: `Z_PRCTR_ESIK_KURALI` · sınıf: `ZCL_PRCTR_ESIK_KURALI`' },
          { ekran:'Filtre', islem:'Bu tanımda filtre yok — her belgede çalışır' },
          { ekran:'Durum', islem:'**Aktif**' },
        ],
        alanlar:{ zorunlu:['Tanım adı','Uygulama adı','Uygulama sınıfı'], opsiyonel:['Filtre değeri (tanım destekliyorsa)'] },
        hatalar:[
          { mesaj:'Uygulama tanımlı ve kodlu ama hiç çalışmıyor', sebep:'**Pasif** bırakılmış.', cozum:'{{SE19}}’da etkinleştir. "BAdI çalışmıyor" vakalarının en sık sebebi budur — tıpkı {{GGB4}}’ün atlanması gibi.' },
          { mesaj:'Bir şirket kodunda çalışıyor, diğerinde çalışmıyor', sebep:'**Filtre tuzağı** — filtre değeri yalnızca bir kod için girilmiş.', cozum:'{{SE18}}’de tanımın filtre türünü doğrula, eksik değerleri {{SE19}}’da ekle.' },
          { mesaj:'Sonuç güne göre değişiyor, hata mesajı yok', sebep:'**Çoklu kullanım tuzağı** — birden fazla aktif uygulama, sıra garanti değil.', cozum:'{{SE18}} → Uygulamalar sekmesinden tüm aktif uygulamaları listele, çakışan mantığı birleştir.' },
        ],
        ipucu:'**Filtre alanı boş bırakılmaz — ya doldurulur ya da tanımın filtre istemediği ' +
              'bilinçli olarak doğrulanır.** Bu, {{konu:dogrulama-ikame}} konusundaki ' +
              '"önkoşulu boş bırakma" dersinin BAdI karşılığıdır: boş filtre farklı ' +
              'tanımlarda farklı davranır, varsayım yapmak yerine {{SE18}} incelenir.',
        ilgili:['SE18','SE24','GGB4'] },

      { kod:'SE24', ad:'Sınıf oluşturucu — mantığın gerçekte yazıldığı yer',
        amac:'BAdI arayüzünü uygulayan ABAP sınıfının metotlarını kodlamaya ve incelemeye yarar.',
        neZaman:'{{SE19}}’da uygulama sınıfı atandıktan sonra; teşhiste "bu BAdI gerçekte ne yapıyor?" sorusuna cevap ararken.',
        adimlar:[
          { baslik:'Sınıf adını gir', aciklama:'{{SE19}} ekranında görünen uygulama sınıfı.' },
          { baslik:'Uygulanan arayüzü bul', aciklama:'Sınıf {{SE18}} tanımının arayüzünü **implement eder** — metot imzaları sabittir, gövdesi serbesttir.' },
          { baslik:'Metot gövdesini oku/yaz', aciklama:'Gerçek iş mantığı burada durur — hangi alanın hangi koşulda değiştiği yalnızca burada görülür.' },
          { baslik:'Aktive et', aciklama:'Sınıf değişikliği aktive edilmeden çalışmaz.' },
        ],
        alanlar:{ zorunlu:['Sınıf adı'], opsiyonel:[] },
        hatalar:[
          { mesaj:'BAdI’nin ne yaptığını anlamak için doğru yeri bulamıyorum', sebep:'Mantık bir ekranda değil, kod içinde.', cozum:'{{SE19}}’dan sınıf adını al, {{SE24}}’te ilgili arayüz metodunun gövdesini oku — bu, {{GGB0}}’ın önkoşul/kontrol alanlarını okumanın BAdI karşılığıdır ama teknik bilgi gerektirir.' },
          { mesaj:'Kod değişti ama davranış aynı kaldı', sebep:'Sınıf aktive edilmemiş.', cozum:'{{SE24}}’te aktive et; ayrıca {{SE19}}’da uygulamanın hâlâ aktif olduğunu doğrula.' },
        ],
        ipucu:'**Bir BAdI’nin ne yaptığını gerçekten bilmenin tek yolu kodu okumaktır.** ' +
              '{{GGB0}}/{{GGB1}}’in aksine burada bir "önkoşul" veya "kontrol" alanı yoktur — ' +
              'mantık serbest ABAP’tır. Bu yüzden her aktif uygulamanın **iş diliyle bir ' +
              'açıklaması** (sınıf dokümantasyonu veya proje kaydı), {{konu:dogrulama-ikame}} ' +
              'konusundaki ikame açıklamasından daha da kritiktir.',
        ilgili:['SE19','SE18'] },

      { kod:'SE80', ad:'Nesne gezgini — sahiplik ve paket',
        amac:'Bir geliştirme nesnesinin (sınıf, fonksiyon grubu, BAdI uygulaması) hangi pakete ait olduğunu ve kim tarafından yazıldığını gösterir.',
        neZaman:'"Bu uygulamayı kim, hangi proje kapsamında yazmış?" sorusunda; geçiş öncesi envanter çıkarırken.',
        adimlar:[
          { baslik:'Paket veya nesne adıyla ara', aciklama:'BAdI uygulama sınıfının adı {{SE19}}’dan alınır.' },
          { baslik:'Paket ağacında konumu incele', aciklama:'**Z/Y** öneki müşteri geliştirmesini gösterir; SAP standart paketleri farklı adlandırılır.' },
          { baslik:'Nesnenin sahiplik bilgisini gör', aciklama:'{{TADIR}} kaydından gelir: yaratan kullanıcı, oluşturma tarihi.' },
        ],
        alanlar:{ zorunlu:['Nesne adı veya paket'], opsiyonel:[] },
        hatalar:[
          { mesaj:'Bu uygulamayı kimin yazdığını bilmiyorum', sebep:'Proje dokümantasyonu yok.', cozum:'{{SE80}} veya doğrudan {{TADIR}} ({{SE16N}} ile) üzerinden yaratan-kullanıcı alanına bakılır.' },
          { mesaj:'İki farklı proje aynı kancaya dokunmuş, kimse haberdar değil', sebep:'Envanter eksik.', cozum:'{{TADIR}}’de paket bazında filtrelenerek tüm Z/Y sınıfları listelenir ve hangilerinin bir BAdI arayüzü implement ettiği kontrol edilir.' },
        ],
        ipucu:'**Paket önekinin okunması küçük ama önemli bir alışkanlıktır.** `Z*`/`Y*` ' +
              'müşteri geliştirmesidir; bunun dışındaki bir paketten bir "uygulama" ' +
              'çıkıyorsa yanlış nesneye bakılıyor olabilir. Geçiş projelerinde tüm Z/Y ' +
              'sınıfları taranıp hangilerinin BAdI arayüzü implement ettiği listelenir — ' +
              'bu, {{konu:migration}} konusundaki kullanım analizinin BAdI’ye özel hâlidir.',
        ilgili:['SE18','SE19'] },

      { kod:'CMOD', ad:'Proje yönetimi — klasik müşteri çıkışı',
        amac:'Klasik müşteri çıkışlarını ({{SMOD}} kataloğundan seçilen, fonksiyon modülü tabanlı) bir projeye bağlar ve etkinleştirir.',
        neZaman:'Eski (BAdI öncesi) kurulumlarda; S/4HANA dönüşümü öncesi envanter çıkarırken.',
        adimlar:[
          { baslik:'Proje oluştur veya seç', aciklama:'Bir proje birden fazla {{SMOD}} bileşenini gruplayabilir.' },
          { baslik:'Genişletmeyi projeye ata', aciklama:'{{SMOD}} kataloğundan bir genişletme seçilir.' },
          { baslik:'Fonksiyon çıkışının kod gövdesine mantığı yaz', aciklama:'BAdI’nin arayüz metodunun karşılığıdır — burada arayüz yok, doğrudan bir kod gövdesidir.' },
          { baslik:'Projeyi etkinleştir', aciklama:'Etkinleştirilmemiş proje kod içerse bile **çalışmaz**.' },
        ],
        alanlar:{ zorunlu:['Proje adı'], opsiyonel:[] },
        hatalar:[
          { mesaj:'Eski çıkış hâlâ çalışıyor, yeni yazılan BAdI ile çakışıyor', sebep:'Aynı işlevi hem klasik çıkış hem BAdI uyguluyor.', cozum:'İkisi de kontrol edilir — {{CMOD}} projesi aktifse ve aynı alanı BAdI uygulamasıyla birlikte değiştiriyorsa **iki katmanlı çakışma** oluşur, biri kaldırılmalıdır.' },
          { mesaj:'S/4HANA dönüşümünde bu proje ne olacak bilinmiyor', sebep:'Envanter yok.', cozum:'Dönüşüm öncesi tüm aktif {{CMOD}} projeleri listelenir, her biri hâlâ ihtiyaç var mı diye gözden geçirilir (bkz. {{konu:migration}}).' },
        ],
        ipucu:'**Klasik çıkış ile BAdI aynı görünmez ama aynı riski taşır.** Anatomi ' +
              'farklıdır — arayüz + sınıf yerine fonksiyon modülü + kod gövdesi — ama sonuç ' +
              'aynıdır: standart kod dışında çalışan, belgelenmezse kaybolan özel mantık. ' +
              'Eski kurulumlarda genellikle **hem** {{CMOD}} projeleri **hem** BAdI ' +
              'uygulamaları aynı anda aktiftir ve envanter ikisini birden kapsamalıdır.',
        ilgili:['SMOD','SE18'] },

      { kod:'SMOD', ad:'Genişletme tanımları — klasik katalog',
        amac:'SAP’ın sunduğu klasik genişletmelerin (fonksiyon çıkışı, ekran çıkışı, menü çıkışı) tanımlarını listeler.',
        neZaman:'{{CMOD}} projesine hangi bileşenin ekleneceğini ararken.',
        adimlar:[
          { baslik:'Genişletme adıyla veya nesne türüyle ara', aciklama:'Aranan işlevin hangi programda çağrıldığı bilinmelidir.' },
          { baslik:'Bileşenleri incele', aciklama:'Fonksiyon çıkışı, ekran çıkışı ve menü çıkışı türleri — {{MODSAP}} bu ayrımı tutar.' },
        ],
        alanlar:{ zorunlu:['Genişletme adı'], opsiyonel:[] },
        hatalar:[
          { mesaj:'Bu süreç için hem {{SMOD}} hem {{SE18}} sonuç veriyor, hangisi kullanılmalı', sebep:'Aynı işlevin hem klasik hem modern kancası var.', cozum:'Yeni geliştirmede **her zaman modern BAdI** ({{SE18}}) tercih edilir — {{SMOD}} yalnızca zaten kurulmuş klasik projeler için kullanılır.' },
        ],
        ipucu:'**{{SMOD}} bir katalogdur, çalıştırılabilir bir şey değil.** Gerçek ' +
              'etkinleştirme {{CMOD}}’da olur — tıpkı {{SE18}} tanımının kendisi çalışmaz, ' +
              'çalışan şeyin {{SE19}} uygulaması olması gibi. Yeni bir ihtiyaçta {{SMOD}}’da ' +
              'bir eşleşme bulmak, o yolun **hâlâ mevcut ama eski nesil** olduğunu gösterir; ' +
              'modern muadili genellikle bir BAdI olarak da vardır.',
        ilgili:['CMOD','MODSAP'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'BAdI’nin kendi hareket tablosu yoktur — bir kod çatısıdır. Ama üç tablo teşhiste ' +
      'kritiktir: **{{SXS_ATTR}}** (tanımın çoklu kullanım/filtre özellikleri), **{{TADIR}}** ' +
      '(kim yazmış, hangi paket) ve klasik nesil için **{{MODSAP}}**. Uygulamanın ' +
      '**değiştirebileceği** tablolar ise sınırsızdır — en sık {{BKPF}}/{{BSEG}}/{{ACDOCA}}.',

    liste:[
      { ad:'SXS_ATTR', baslik:'BAdI tanım öznitelikleri — tuzakların kaynağı',
        tutar:'Klasik (enhancement-spot öncesi) BAdI tanımlarının kaydı: çoklu uygulamaya izin var mı, filtreli mi, hangi arayüzü kullanıyor.',
        olusturan:'{{SE18}} ile bir BAdI tanımlandığında',
        s4:'Klasik BAdI’ler için duruyor; yeni nesil genişletme noktaları ayrı bir tablo ailesinde tutulur.',
        anahtar:'EXIT_NAME',
        iliskiler:'{{SE18}} ekranının okuduğu tablodur; {{SE19}} her uygulamayı bu tanıma bağlar.',
        alanlar:[
          { ad:'EXIT_NAME', aciklama:'BAdI tanım adı', tip:'pk' },
          { ad:'MULTIPLE_USE', aciklama:'**Birden çok uygulama aktif olabilir mi** — çakışma teşhisinde ilk bakılacak alan' },
          { ad:'FILTER_TYPE', aciklama:'Filtre türü (örn. şirket kodu) — doluysa uygulama yalnız o değerde çalışır' },
        ] },

      { ad:'TADIR', baslik:'Depo nesnesi dizini — sahiplik kaydı',
        tutar:'Sistemdeki her geliştirme nesnesinin (program, sınıf, BAdI uygulaması, tablo) sahibi, paketi ve özgün sistemi.',
        olusturan:'Her geliştirme nesnesi yaratıldığında otomatik',
        s4:'Değişmedi.',
        anahtar:'PGMID + OBJECT + OBJ_NAME',
        iliskiler:'"Bu genişletmeyi kim, hangi projede yazmış?" sorusunun başlangıç noktası — {{SE80}}’in okuduğu tablodur.',
        alanlar:[
          { ad:'OBJECT', aciklama:'Nesne türü (CLAS, FUGR, SXCI…)', tip:'pk' },
          { ad:'OBJ_NAME', aciklama:'Nesne adı', tip:'pk' },
          { ad:'DEVCLASS', aciklama:'Paket — **Z/Y ile başlıyorsa müşteri geliştirmesi**' },
          { ad:'AUTHOR', aciklama:'Yaratan kullanıcı' },
        ] },

      { ad:'MODSAP', baslik:'SAP genişletme bileşenleri — klasik nesil',
        tutar:'Klasik SAP genişletmelerinin (customer exit) hangi bileşenlerden oluştuğunu tutar: fonksiyon çıkışı, ekran çıkışı, menü çıkışı.',
        olusturan:'SAP standardı — müşteri yazmaz, yalnız kullanır',
        s4:'Duruyor ama yeni geliştirmede BAdI tercih edilir.',
        anahtar:'NAME + TYP + MEMBER',
        iliskiler:'{{SMOD}}/{{CMOD}} ikilisinin arkasındaki tablodur.',
        alanlar:[
          { ad:'NAME', aciklama:'Genişletme adı', tip:'pk' },
          { ad:'TYP', aciklama:'Bileşen türü: **E**=fonksiyon çıkışı, **S**=ekran, **M**=menü' },
          { ad:'MEMBER', aciklama:'Bileşen adı — çağrılacak fonksiyon veya ekran' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Kim yazmış, ne değiştiriyor?',
      varliklar:[
        { ad:'TADIR', rol:'Depo', hub:true, aciklama:'**Her geliştirme nesnesinin sahiplik kaydı**',
          alanlar:[{ ad:'OBJECT', tip:'pk' }, { ad:'OBJ_NAME', tip:'pk' }, { ad:'DEVCLASS' }, { ad:'AUTHOR' }] },
        { ad:'SXS_ATTR', rol:'Tanım', aciklama:'Çoklu kullanım ve filtre özellikleri',
          alanlar:[{ ad:'EXIT_NAME', tip:'pk' }, { ad:'MULTIPLE_USE' }, { ad:'FILTER_TYPE' }] },
        { ad:'MODSAP', rol:'Klasik nesil', aciklama:'Fonksiyon/ekran/menü çıkışı bileşenleri',
          alanlar:[{ ad:'NAME', tip:'pk' }, { ad:'TYP' }, { ad:'MEMBER' }] },
        { ad:'BKPF', rol:'Belge', aciklama:'Uygulamanın değiştirebileceği başlık alanları',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'BSEG', rol:'Belge', aciklama:'Uygulamanın en sık değiştirdiği kalem alanları',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT' }, { ad:'PRCTR' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'Değişiklik buraya da yansır',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'PRCTR' }] },
      ],
      iliskiler:[
        { from:'TADIR', to:'SXS_ATTR', alanlar:'OBJ_NAME=EXIT_NAME', not:'tanımın sahiplik kaydı' },
        { from:'TADIR', to:'MODSAP', alanlar:'OBJ_NAME=NAME', not:'klasik genişletme sahipliği' },
        { from:'SXS_ATTR', to:'BSEG', alanlar:'kod aracılığıyla', not:'**sabit anahtar yok — uygulama herhangi bir alanı değiştirebilir**' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'standart belge yapısı' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR', not:'değişiklik buraya da yansır' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Danışman bu konuyla iki farklı taraftan karşılaşır: **{{SE18}}/{{SE19}}** ekranlarından ' +
      '(var olan bir kancayı bulmak) ve **beklenmedik davranış** olarak (bir BAdI’nin sessizce ' +
      'çalıştığını fark etmek).',

    ekranlar:[
      { ad:'{{SE18}} — BAdI tanım ekranı',
        aciklama:'Kancanın kendisi: arayüz, çoklu kullanım, filtre desteği ve tüm uygulamaların listesi.',
        alanlar:[
          { ad:'Tanım adı', zorunlu:true, aciklama:'Bilinmiyorsa {{SE80}} ile ilgili programın kaynağından bulunur.' },
          { ad:'**Arayüz / metotlar**', zorunlu:true, aciklama:'Uygulamada neyin değiştirilebileceğini belirler.' },
          { ad:'**Çoklu kullanım işareti**', zorunlu:true, aciklama:'İşaretliyse sıra garantisi **yoktur**.' },
          { ad:'**Filtre türü**', zorunlu:false, aciklama:'Doluysa uygulama yalnız o filtre değerinde çalışır.' },
          { ad:'Uygulamalar listesi', zorunlu:false, aciklama:'Teşhisin başlangıç noktası — kaç uygulama aktif, hangi paketten.' },
        ],
        ipucu:'**Her teşhis burada başlar.** Çoklu kullanım işaretliyse ve birden fazla aktif ' +
              'uygulama varsa, sorun "çalışmıyor" değil "öngörülemez çalışıyor"dur.' },

      { ad:'{{SE19}} — BAdI uygulama ekranı',
        aciklama:'Müşterinin kancaya bağladığı sınıf, filtre değeri ve aktiflik durumu.',
        alanlar:[
          { ad:'Tanım adı', zorunlu:true },
          { ad:'Uygulama adı ve sınıfı', zorunlu:true, aciklama:'Genelde `Z*`/`Y*` — kod {{SE24}}’te yazılır.' },
          { ad:'**Filtre değeri**', zorunlu:false, aciklama:'Tanım filtre destekliyorsa **doldurulmalıdır**, boş bırakılması bilinçli olmalıdır.' },
          { ad:'**Aktif/Pasif**', zorunlu:true, aciklama:'Pasif uygulama listede görünür ama **çalışmaz**.' },
        ],
        ipucu:'**Filtre değerini boş bırakma — ya doldur ya da bilerek doğrula.** ' +
              '"Genişletme bir şirket kodunda çalışıyor, diğerinde çalışmıyor" ihbarında ilk ' +
              'bakılacak yer burasıdır.' },

      { ad:'{{SE24}} — sınıf ekranı',
        aciklama:'Gerçek ABAP mantığının yazıldığı yer; mantığı görmenin tek yolu.',
        alanlar:[
          { ad:'Sınıf adı', zorunlu:true, aciklama:'{{SE19}} ekranından alınır.' },
          { ad:'Uygulanan arayüz', zorunlu:false, aciklama:'{{SE18}} tanımının arayüzü — metot imzaları sabit.' },
          { ad:'Metot gövdesi', zorunlu:true, aciklama:'İş mantığının kendisi — **kontrol** veya **önkoşul** alanı gibi bir özet yok.' },
        ],
        ipucu:'**Bir BAdI’nin ne yaptığını okumanın tek yolu buradaki kodu okumaktır.** ' +
              'Fonksiyonel bir danışman için bu, {{GGB0}} okumaktan çok daha zordur — bu ' +
              'yüzden aktif her uygulamanın iş diliyle bir açıklaması dışarıda tutulmalıdır.' },
    ],

    zorunlu:['Tanım adı','Uygulama adı ve sınıfı','Aktif/Pasif durumu'],
    opsiyonel:['Filtre değeri (tanım destekliyorsa)','Uygulama açıklaması'],

    hatalar:[
      { mesaj:'BAdI tanımladım/uyguladım ama hiç çalışmıyor', sebep:'Uygulama **pasif** bırakılmış.', cozum:'{{SE19}}’da etkinleştir — bu, "BAdI çalışmıyor" vakalarının en sık sebebidir.' },
      { mesaj:'Bir şirket kodunda çalışıyor, diğerinde çalışmıyor', sebep:'**Filtre tuzağı**.', cozum:'{{SE18}} → filtre türünü doğrula; {{SE19}}’da eksik değeri ekle.' },
      { mesaj:'Sonuç günden güne değişiyor, hiçbir hata mesajı yok', sebep:'**Çoklu kullanım tuzağı** — sıra garanti değil.', cozum:'{{SE18}} → Uygulamalar sekmesinden tüm aktif uygulamaları listele, çakışan mantığı tek uygulamada birleştir.' },
      { mesaj:'Program çöktü ama hata mesajı BAdI’den hiç söz etmiyor', sebep:'Dump, çağrılan sınıfın metodunu gösterir — BAdI adını değil.', cozum:'{{ST22}} ile dump’taki sınıf/metot adını al, {{SE24}}’te o sınıfı aç, {{SE19}}’dan hangi tanıma bağlı olduğunu doğrula.' },
      { mesaj:'Bu genişletmeyi kim yazmış bilmiyorum', sebep:'Proje dokümantasyonu yok.', cozum:'{{SE80}} veya {{SE16N}} ile {{TADIR}} sorgulanır — yaratan kullanıcı ve paket görünür.' },
      { mesaj:'ECC’den gelen bir CMOD projesi S/4HANA’da bulunamıyor', sebep:'Klasik çıkış modernize edilmemiş veya standart BAdI ile örtüşüyor.', cozum:'{{SMOD}}/{{CMOD}} envanteri çıkarılır, her biri için modern bir BAdI karşılığı olup olmadığı {{SE18}}’de kontrol edilir (bkz. {{konu:migration}}).' },
    ],

    ipuclari:[
      '**Teşhis sırası:** {{SE18}} (kanca var mı, kaç uygulama aktif) → {{SE19}} (aktif mi, ' +
      'filtre değeri ne) → {{SE24}} (mantık ne yapıyor) → {{TADIR}}/{{SE80}} (kim yazmış).',
      '**"Bazen çalışıyor bazen çalışmıyor" = çoklu kullanım tuzağı.** SAP sıra garantisi vermez.',
      '**"Bir yerde çalışıyor, başka yerde çalışmıyor" = filtre tuzağı.** Önce filtre değerine bak.',
      '**Runtime hatası nadiren BAdI adını verir** — {{ST22}}’de görünen sınıf/metot üzerinden geriye doğru izlenir.',
      '**Her aktif uygulamayı belgele** — kod, {{GGB0}}/{{GGB1}} ekranından çok daha az görünür.',
      'Merdiveni her zaman yukarıdan aşağı dene: standart → {{konu:dogrulama-ikame}} → BAdI → modifikasyon.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF / BSEG', ne:'Bir uygulama bu alanları **herhangi bir kısıtlama olmadan** değiştirebilir' },
      { tablo:'ACDOCA', ne:'Değişiklik buraya da yansır (S/4HANA)' },
      { tablo:'SXS_ATTR', ne:'**Okunur** — çoklu kullanım ve filtre özellikleri' },
      { tablo:'TADIR', ne:'**Okunur** — sahiplik ve paket bilgisi' },
    ],

    commit:
      'Bir BAdI, standart sürecin **içinde**, SAP’ın belirlediği tek bir noktada çalışır — ' +
      '{{konu:dogrulama-ikame}} konusundaki kural motorunun altı adımlık sabit sırasının ' +
      'aksine, buradaki sıra **tanıma özeldir**.\n\n' +
      'Genel çerçeve şudur:\n\n' +
      '**1.** Standart kod, çağrı noktasına ulaşır.\n' +
      '**2.** SAP {{SXS_ATTR}}’a bakarak tanımın aktif uygulaması olup olmadığını kontrol eder.\n' +
      '**3.** Çoklu kullanım açıksa **tüm aktif uygulamalar** sırayla çağrılır — sıra garanti değildir.\n' +
      '**4.** Filtre varsa, uygulamanın filtre değeri o kayıtla eşleşmiyorsa **atlanır**.\n' +
      '**5.** Eşleşen her uygulamanın metodu çalışır; bir istisna fırlatılırsa (tanıma bağlı olarak) süreç durabilir.\n\n' +
      'Bu esneklik güçlüdür ama aynı zamanda {{konu:dogrulama-ikame}} konusundaki sabit ' +
      'sıranın verdiği **öngörülebilirliği** kaybettirir.',

    belgeNo:
      'Bir BAdI uygulaması istisna fırlatıp kaydı durdurursa, davranış tanıma bağlıdır: ' +
      'bazı çağrı noktalarında numara hiç harcanmaz, bazılarında ise numara verilmiş olabilir ' +
      'ama belge oluşmaz — bu ikinci durum {{guncelleme-hatasi}}’na benzer bir belirti verir.\n\n' +
      'Alan değiştiren bir uygulamanın numaralama üzerinde etkisi yoktur.',

    postingLogic:
      'BAdI çalışma mantığının teşhis açısından üç kritik sorusu vardır:\n\n' +
      '**1.** Tanımın **aktif** bir uygulaması var mı? ({{SE18}} → Uygulamalar)\n' +
      '**2.** Varsa, uygulama **etkin mi**? ({{SE19}} → Aktif/Pasif)\n' +
      '**3.** Filtre değeri bu kayıtla **eşleşiyor mu**? ({{SE19}} → Filtre)\n\n' +
      'Üçü de "evet" ise metot çalışır ve mantığı görmenin tek yolu {{SE24}}’teki kodu ' +
      'okumaktır. Çoklu kullanımda dördüncü ve **cevaplanamayan** bir soru daha eklenir: ' +
      '*"bu sefer hangi uygulama önce çalıştı?"*',

    numberRange:
      'BAdI’nin numara aralığıyla doğrudan bir ilişkisi yoktur; numaralama standart posting ' +
      'mantığına aittir. Bir uygulama numarayı değiştiremez, yalnızca sürecin devam edip ' +
      'etmeyeceğini etkileyebilir.',

    accountDetermination:
      'Doğru konumdaki bir BAdI, hesap belirlemeden **önce veya sonra** çalışabilir — ' +
      'tanıma bağlıdır. Bir uygulama hesabı veya {{kar-merkezi}} gibi bir boyutu değiştirirse, ' +
      'hesap belirleme sonucu veya raporlama boyutu **da değişir**.\n\n' +
      'Bu, {{konu:dogrulama-ikame}} konusundaki ikamenin aynı riskinin daha güçlü bir ' +
      'versiyonudur: ikame yalnızca {{GB01}} listesindeki alanları değiştirebilirken, ' +
      'bir BAdI **herhangi bir alanı** değiştirebilir.',

    tur:
      'BAdI uygulaması **baştan sona bir geliştirme nesnesidir** — sınıf, arayüz, kod. ' +
      '{{konu:dogrulama-ikame}} konusundaki kural motorunun tam tersi: orada tanım/atama/' +
      'etkinlik özelleştirmedir, yalnızca kullanıcı çıkışı geliştirme nesnesidir; burada ' +
      '**her şey** ({{SE19}} kaydı dahil) workbench katmanına aittir.\n\n' +
      'Tek istisna: uygulamanın **aktif/pasif** anahtarı bir yapılandırma anahtarı gibi ' +
      'davranır ve bu yüzden sistemler arasında farklı durabilir (bkz. transport).',

    transport:
      'Bir BAdI uygulaması kaydedildiğinde **otomatik olarak** bir workbench isteğine ' +
      'girer — {{GGB0}}/{{GGB1}}’in aksine menüden elle eklenmesi gerekmez.\n\n' +
      '**En sık geçiş sorunu:** uygulamanın **aktif/pasif** durumu, kodun kendisiyle ' +
      'birlikte taşınsa da hedef sistemde farklı davranabilir — özellikle birden fazla ' +
      'taşıma isteği arasında bölünmüş bir geliştirmede. Canlıda kod dururken uygulama ' +
      '**pasif** gelebilir.\n\n' +
      'Ayrıca çoklu kullanıma açık bir tanımda iki uygulama **farklı taşıma istekleriyle** ' +
      'ayrı ayrı canlıya taşınmışsa, hangisinin önce geldiği çalışma sırasını **etkilemez** ' +
      '— SAP sıra garantisi zaten vermiyordu; taşıma sırası bu belirsizliği çözmez.\n\n' +
      '**Geçiş kontrolü:** canlıda hedef senaryoyu tetikleyen bir test kaydı dene — ' +
      'beklenen alan değişiyor mu?',

    img:[
      { yol:'{{SE18}} → tanım adı veya paket ile ara', not:'Çoğu BAdI’nin {{SPRO}} ağacında doğrudan bir karşılığı yoktur' },
      { yol:'{{SPRO}} → ilgili modül düğümü → "Business Add-Ins (BAdIs)"', not:'Bazı standart BAdI’ler için SAP {{SE19}}’a atlayan bir IMG düğümü bırakmıştır — bu, {{GGB0}} gibi her zaman garanti değildir' },
    ],

    ekstra:[
      { ic:'🪜', baslik:'Dört basamaklı merdiven — her adımın yükseltme maliyeti', metin:
        'Bir ihtiyacı çözerken sorulacak sıra hep aynıdır:\n\n' +
        '**① Standart yapılandırma çözer mi?** ({{SPRO}}) — çözüyorsa dur, kod yazma. ' +
        'Yükseltme maliyeti **sıfır**.\n\n' +
        '**② Bir kural motoruyla çözülür mü?** (bkz. {{konu:dogrulama-ikame}}) — önkoşul + ' +
        'kontrol veya önkoşul + alan ataması kalıbına sığıyorsa buradan çık. Genelde kod ' +
        'gerektirmez, gerektiğinde bile geri dönüşü kolay bir kullanıcı çıkışıdır.\n\n' +
        '**③ Bir BAdI ile mi çözülür?** SAP uygun bir kanca bıraktıysa evet — gerçek kod ' +
        'yazılır ama standart nesneye dokunulmaz, yükseltme uyarlama listesinde ({{SPAU}}) ' +
        'görünmez.\n\n' +
        '**④ Modifikasyon gerekiyor mu?** SAP hiçbir kanca bırakmadıysa ve iş gerçekten ' +
        'standart davranışı değiştirmeyi gerektiriyorsa — **son çare**. Her yükseltmede ' +
        '{{SPAU}}/{{SPDD}} ile elle uyarlanır; maliyet bir kerelik değil, **her sürümde ' +
        'tekrarlanır**.\n\n' +
        '**Danışmanlık ilkesi:** her basamak inişi bir gerekçe ister. "BAdI\'ye koyduk" ' +
        'cümlesi ③’ü ②’den daha kolay yaptırdığı için sık kötüye kullanılır — oysa ② ' +
        'genelde daha az emek, daha az risk ve daha kolay bir teşhis sunar ({{konu:best-practices}}).' },

      { ic:'🎲', baslik:'Çoklu kullanım ve filtre — iki tuzak, tek teşhis yolu', metin:
        'Her iki tuzak da aynı belirtiyi verir: **hiçbir hata mesajı yok**, sonuç beklenenden ' +
        'farklı.\n\n' +
        '**Filtre tuzağı** basittir: {{SXS_ATTR}}’daki `FILTER_TYPE` doluysa, uygulamanın ' +
        'filtre değeri girilmemiş her kayıt için tanım **sessizce atlanır**. Bu, kasıtlı bir ' +
        'tasarımdır — ama belgelenmezse "genişletme bozuk" sanılır.\n\n' +
        '**Çoklu kullanım tuzağı** daha derindir: `MULTIPLE_USE` işaretliyse, birden fazla ' +
        'uygulama **aynı anda** aktif olabilir ve SAP bunlar arasında **hiçbir çalışma sırası ' +
        'garantisi vermez**. İki uygulama farklı takımlarca, farklı yıllarda, birbirinden ' +
        'habersiz yazılmışsa ve aynı alanı hedefliyorsa, sonuç o günkü çalışma sırasına bağlı ' +
        'hâle gelir — ve bu sıra bir destek paketiyle bile değişebilir.\n\n' +
        '**Tek teşhis yolu aynıdır:** {{SE18}} → Uygulamalar sekmesi. Kaç uygulama aktif, ' +
        'hangi filtre değerleriyle, hangi paketten. Bu ekran açılmadan yapılan her varsayım ' +
        '(*"tek uygulama vardır"*, *"her zaman çalışır"*) yanlış çıkabilir.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Runtime hatası nadiren BAdI’nin adını verir', metin:
        'Bir uygulama içinde bir hata oluştuğunda ({{ST22}}’de görünen bir dump veya ekrandaki ' +
        'bir istisna mesajı) hata metni genelde **çağrılan sınıfın adını** gösterir — ' +
        'BAdI tanımının adını değil.\n\n' +
        'Bu, {{konu:error-handling}} konusundaki "belirtiyi doğru araca eşleme" ilkesinin ' +
        'BAdI’ye özel hâlidir: dump’taki sınıf/metot adından geriye doğru gidilir — o sınıf ' +
        '{{SE19}}’da hangi tanıma bağlı, o tanımın kaç uygulaması var, hangileri filtre ' +
        'değeriyle eşleşiyor.\n\n' +
        '**Kısayol yoktur.** Hata mesajını okuyup doğrudan "hangi BAdI" sorusuna cevap vermek ' +
        'nadiren mümkündür; teşhis her zaman sınıf adından tanıma doğru **geriye** işler.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'BAdI kavramı S/4HANA’da **temelde değişmedi**: {{SE18}}, {{SE19}}, {{SE24}}, {{SE80}} ' +
      'aynı şekilde çalışıyor. Değişen, etrafındaki **çerçevedir**: genişletme noktaları ' +
      '(enhancement spot) ile gruplanmış BAdI’ler ve — asıl fark — **clean core** ilkesiyle ' +
      'birlikte gelen "hangi BAdI’ye dokunulabilir" sorusu.',

    eccFarklari:[
      { konu:'Tanım / uygulama ekranları', ecc:'{{SE18}} / {{SE19}}', s4:'**Değişmedi**' },
      { konu:'Sınıf düzenleme', ecc:'{{SE24}}', s4:'**Değişmedi**' },
      { konu:'Klasik müşteri çıkışı', ecc:'{{SMOD}}/{{CMOD}} yaygın', s4:'Duruyor ama geriletilmiş — modern BAdI veya Custom Fields and Logic tercih edilir' },
      { konu:'Hangi BAdI güvenle kullanılır', ecc:'Prensipte hepsi', s4:'**Yalnızca "released" (yayımlanmış) BAdI\'ler** clean-core uyumlu kabul edilir' },
      { konu:'Kodun yeri', ecc:'Genelde çekirdek sistemde, standart ad alanına yakın', s4:'**Clean core** ilkesiyle çekirdek dışına (yan-yana genişletme) itilir' },
      { konu:'"BAdI\'ye koyduk" gerekçesi', ecc:'Genelde yeterli', s4:'**Tek başına yeterli değil** — hangi BAdI, released mi, in-app mi side-by-side mi sorularının cevabı gerekir' },
      { konu:'Değiştirilen sonucun yansıdığı tablo', ecc:'{{BSEG}}', s4:'{{BSEG}} + {{ACDOCA}}' },
    ],

    universalJournal:
      'Bir BAdI uygulamasının değiştirdiği alanlar {{ACDOCA}}’ya da yansır — çünkü uygulama ' +
      'genellikle {{ACDOCA}} yazılmadan **önceki** bir noktada çalışır.\n\n' +
      'Pratik sonucu {{konu:dogrulama-ikame}} konusundaki ikamenin aynı riskiyle örtüşür ama ' +
      'daha geniştir: ikame yalnızca {{GB01}} listesindeki alanları değiştirebilirken bir ' +
      'BAdI **herhangi bir alanı**, dolayısıyla {{belge-bolme}} sonucunu da etkileyebilecek ' +
      'herhangi bir boyutu değiştirebilir. Segment raporlaması yapan bir kurulumda kâr ' +
      'merkezi veya segment alanını değiştiren bir BAdI **özenle test edilmelidir**.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'{{SE18}}, {{SE19}}, {{SE24}}, {{SE80}}, {{CMOD}}, {{SMOD}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Custom Fields and Logic', aciklama:'**Modern alternatif** — bulut ve on-premise’de kod yazmadan alan ekleme ve mantık tanımlama; birçok senaryoda bir BAdI yazmanın yerini alır.' },
      { ad:'Manage Your Solution', aciklama:'Hangi genişletmelerin (in-app / side-by-side) kullanıldığını ve released olup olmadığını görmeye yarar.' },
    ],

    bestPractices:[
      'Dönüşümde/geçişte **aktif tüm BAdI uygulamalarının envanterini çıkar** — {{SE18}} her ' +
      'tanım için Uygulamalar sekmesinden taranır, {{TADIR}} ile paket/sahiplik doğrulanır.',
      'Her aktif uygulamanın **iş diliyle bir açıklaması** olduğundan emin ol — kod, ' +
      '{{GGB0}}/{{GGB1}} ekranından çok daha az görünür olduğu için bu belge tek iz olabilir.',
      'Yeni gereksinimlerde önce **Custom Fields and Logic** alternatifini değerlendir — ' +
      'daha görünür, daha yükseltmeye dayanıklı ve clean-core ile uyumludur.',
      '{{SMOD}}/{{CMOD}} kalıntısı klasik çıkışları gözden geçir; modern bir BAdI karşılığı ' +
      'var mı diye {{SE18}}’de kontrol et.',
      'Çoklu kullanıma açık ve aynı alanı hedefleyen uygulamaları **tek mantıkta birleştir** ' +
      'veya açık bir öncelik kur — sıraya güvenme.',
      '**"BAdI\'ye koyduk" cümlesini tek başına gerekçe sayma** — hangi tanım, released mi, ' +
      'in-app mi side-by-side mi sorularının cevabı olmadan clean-core açısından ' +
      'değerlendirilmemiş demektir.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Kâr merkezi neden bazen böyle, bazen öyle oluyor? — unutulmuş bir çoklu kullanım uygulaması',
    hikaye:
      'Batı Sanayi A.Ş.’de bir kontrolör tuhaf bir şey fark ediyor: AR-GE departmanının ' +
      'girdiği bazı gider kayıtları **PC-9000**’de, bazıları **PC-4100**’de kaydediliyor — ' +
      'aynı hesap, aynı tür işlem, aynı kullanıcı. Kullanıcılar her ikisinde de aynı ' +
      'değeri (PC-3000) girdiklerini söylüyor.\n\n' +
      'Mizan doğru, fiş dengeli, hiçbir hata mesajı yok. Sistem yöneticisi ' +
      '*"kullanıcı yanlış giriyor olmalı"* diyor.\n\n' +
      'Bu senaryo, çoklu kullanıma açık, belgelenmemiş bir BAdI tanımının nasıl ' +
      'öngörülemez şekilde çalıştığını ve nasıl teşhis edildiğini gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · dönem 02/2028' },
      { k:'Belirti', v:'PC-3000 girildi → bazen **PC-9000**, bazen **PC-4100** kaydedildi' },
      { k:'Etkilenen', v:'Yalnızca 770300 hesabına yapılan kayıtlar' },
      { k:'Hata mesajı', v:'**Yok**' },
      { k:'Ne zamandır', v:'Bilinmiyor' },
    ],

    adimlar:[
      { baslik:'Belirti doğrulanır — kullanıcı haklı mı?', tcode:'FB03',
        aciklama:'Şüpheli bir belge açılır ve değişiklik izi kontrol edilir.',
        girdi:[
          { alan:'Belge', deger:'1900012340 · 770300 gider · 118.000 TRY' },
          { alan:'Kaydedilen kâr merkezi', deger:'**PC-9000**' },
          { alan:'Ortam → Değişiklikler', deger:'**Kayıt sonrası hiçbir değişiklik yok**' },
          { alan:'Sonuç', deger:'Değer **kayıt anında** bu şekilde yazılmış' },
        ],
        not:'{{degisiklik-belgesi}} boş — yani kayıttan sonra kimse değiştirmemiş.\n\n' +
             'Demek ki PC-9000 **kayıt anında** yazıldı. İki ihtimal var: kullanıcı gerçekten ' +
             'öyle girdi, veya **bir mekanizma değiştirdi**. Kullanıcı ısrarcı olduğu için ' +
             'ikinci ihtimal araştırılıyor.' },

      { baslik:'Desen aranır — hangi kayıtlar etkileniyor?', tcode:'FBL3N',
        aciklama:'Etkilenen kayıtlar arasında ortak bir örüntü bulunmaya çalışılır.',
        girdi:[
          { alan:'Hesap 770300 — tüm kalemler', deger:'96 kalem' },
          { alan:'PC-9000 olanlar', deger:'**58 kalem**' },
          { alan:'PC-4100 olanlar', deger:'**38 kalem**' },
          { alan:'Tarihe göre dağılım', deger:'Belirli bir güne veya kullanıcıya bağlı **görünmüyor**' },
        ],
        not:'Desen açık: tek hesapta, iki farklı değer, dağılım **rastgele görünüyor**. ' +
             'Şirket kodu veya kullanıcı bazlı bir filtre tuzağı bu kadar karışık bir ' +
             'dağılım yaratmaz — filtre tuzağı olsaydı sonuç **tutarlı** olurdu, bu değil.\n\n' +
             'Karışıklığın kendisi bir ipucu: bu, tek bir kuralın değil, **birden fazla ' +
             'mekanizmanın** aynı alana yazdığını düşündürüyor.' },

      { baslik:'Kanca aranır', tcode:'SE18',
        aciklama:'İlgili çağrı noktasında bir BAdI tanımı olup olmadığı ve kaç uygulaması olduğu kontrol edilir.',
        girdi:[
          { alan:'Tanım', deger:'`AC_DOCUMENT`' },
          { alan:'Çoklu kullanım', deger:'**İşaretli**' },
          { alan:'Aktif uygulama sayısı', deger:'**2**' },
          { alan:'Uygulamalar', deger:'`Z_PRCTR_ESIK_KURALI`, `Z_PRCTR_MASRAF_ESLEME`' },
        ],
        not:'**İki aktif uygulama bulundu — ve tanım çoklu kullanıma açık.**\n\n' +
             'Bu, kimsenin ilk bakacağı yer değildi; BAdI’nin sessizliği, teşhisi çok geciktirdi. ' +
             'Sistem yöneticisi bile böyle bir tanımın var olduğundan haberdar değildi.' },

      { baslik:'Her iki uygulama incelenir', tcode:'SE24',
        aciklama:'İki uygulamanın da ne yaptığı ve neden çakıştığı araştırılır.',
        girdi:[
          { alan:'`Z_PRCTR_ESIK_KURALI`', deger:'Tutar > 100.000 ise **PC-9000** yazar (2024 kuralı)' },
          { alan:'`Z_PRCTR_MASRAF_ESLEME`', deger:'Masraf türü 770300 için her zaman **PC-4100** yazar (2027 kuralı)' },
          { alan:'İkisi de "alan boşsa" kontrolü yapıyor mu?', deger:'**Hayır** — ikisi de koşulsuz üzerine yazıyor' },
          { alan:'Açıklama alanları', deger:'İkisi de **boş**' },
        ],
        not:'**İki uygulama da tek başına doğru çalışıyor** — ama ikisi de aynı alanı, aynı ' +
             'önkoşulla (hesap 770300) hedefliyor ve hiçbiri diğerinin varlığından haberdar ' +
             'değil. Hangisi **son** çalışırsa kaydedilen değer o oluyor, ve bu sıra SAP ' +
             'tarafından garanti edilmiyor.' },

      { baslik:'Geçmiş araştırılır', tcode:'SE16N',
        aciklama:'{{TADIR}} üzerinden her iki uygulamanın kim tarafından, ne zaman yazıldığı bulunur.',
        girdi:[
          { alan:'`Z_PRCTR_ESIK_KURALI`', deger:'2024 · eski bir danışmanlık firması' },
          { alan:'`Z_PRCTR_MASRAF_ESLEME`', deger:'2027 · iç geliştirme ekibi' },
          { alan:'Proje dokümantasyonu', deger:'İkisi için de **kayıt yok**' },
          { alan:'Bağlantı', deger:'2027 ekibi 2024 kuralının varlığından **habersizdi**' },
        ],
        not:'2024’te tek uygulama vardı ve doğru çalışıyordu. 2027’de yeni bir ihtiyaç için ' +
             'ikinci bir uygulama yazıldı — ama kimse {{SE18}}’i açıp *"bu tanımda zaten aktif ' +
             'bir uygulama var mı?"* diye sormadı. Çoklu kullanım izin verdiği için sistem ' +
             'ikisini de sessizce kabul etti.' },

      { baslik:'Düzeltme — iki uygulama tek mantıkta birleştirilir', tcode:'SE24',
        aciklama:'Uygulamalar silinmek yerine tek, açık öncelikli bir mantıkta birleştirilir.',
        girdi:[
          { alan:'Yeni tek uygulama', deger:'`Z_PRCTR_DERIVE_MASTER`' },
          { alan:'Mantık', deger:'Önce masraf türü eşlemesi kontrol edilir; eşleşme yoksa tutar eşiği uygulanır' },
          { alan:'Eski uygulamalar', deger:'**Pasif** edildi (silinmedi — geçmiş referans için)' },
          { alan:'Açıklama', deger:'"770300 kâr merkezi türetmesi — 2024 eşik kuralı + 2027 masraf eşlemesi, öncelik: eşleme > eşik (2028 birleştirmesi)"' },
        ],
        fis:{ baslik:'Test kaydı — birleştirmeden sonra', belgeTuru:'KR', tarih:'20.02.2028',
          satirlar:[
            { hesap:'770300', ad:'AR-GE gideri — kullanıcı PC-3000 girdi', borc:118000,
              not:'Kaydedilen: **PC-4100** — artık her zaman tutarlı ✓' },
            { hesap:'320', ad:'Satıcılar', alacak:118000 },
          ], not:'Aynı girdi artık **her zaman aynı sonucu** veriyor — hangi gün çalıştırılırsa ' +
                 'çalıştırılsın.' },
        tabloEtkisi:[
          { tablo:'SXS_ATTR', ne:'`MULTIPLE_USE` işareti duruyor ama artık yalnız **tek aktif uygulama** var' },
          { tablo:'BSEG', ne:'`PRCTR` artık tutarlı biçimde belirleniyor' },
        ],
        not:'**Geçmiş kayıtlar düzeltilmedi.** 2027–2028 arasında rastgele dağılan kalemler ' +
             'olduğu gibi duruyor; düzeltme gerekiyorsa CO içinde bir aktarımla yapılmalı, ' +
             'FI zaten dengeli.' },

      { baslik:'Kalıcı önlemler', tcode:'SE18',
        aciklama:'Bu hata sınıfının tekrarlanmaması için dört önlem alınır.',
        girdi:[
          { alan:'Önlem 1', deger:'**Tüm aktif BAdI uygulamalarının envanteri** çıkarıldı — 11 tanımda 14 aktif uygulama bulundu, 6’sının açıklaması boştu' },
          { alan:'Önlem 2', deger:'Çoklu kullanıma açık her tanımda **uygulama sayısı ve amacı** dokümante edildi' },
          { alan:'Önlem 3', deger:'Yeni bir uygulama yazılmadan önce {{SE18}} → Uygulamalar sekmesinin kontrol edilmesi **standart** hâline getirildi' },
          { alan:'Önlem 4', deger:'Envanter listesi proje dokümantasyonuna eklendi; devir teslimde aktarılacak' },
        ],
        not:'**İlk önlem en çok şeyi ortaya çıkardı.** 14 aktif uygulamadan 6’sının açıklaması ' +
             'boştu ve ikisi (bu senaryodaki gibi) aynı alanı hedefliyordu.\n\n' +
             'Bu envanter çalışması, BAdI konusunun neden {{konu:best-practices}} ' +
             'konusundaki periyodik gözden geçirme ilkesine ihtiyaç duyduğunun somut kanıtıdır.' },
    ],

    sonuc:
      '**Belgelenmemiş, çoklu kullanıma açık bir BAdI tanımı, iki bağımsız uygulama ' +
      'yüzünden bir yıl boyunca öngörülemez sonuçlar üretti.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Çoklu kullanım tuzağı, ikame tuzağından bir derece daha zordur.** ' +
      '{{konu:dogrulama-ikame}} konusundaki bir ikame en azından **tek** bir kuraldır ve ' +
      'davranışı öngörülebilir. Çoklu kullanıma açık bir BAdI’de iki bağımsız, birbirinden ' +
      'habersiz uygulama aynı alanı hedefleyebilir ve sonuç **SAP’ın garanti etmediği** bir ' +
      'çalışma sırasına bağlı kalır.\n\n' +
      '**2. Teşhis her zaman {{SE18}} → Uygulamalar sekmesinden başlar.** Kaç uygulama aktif ' +
      'sorusunun cevabı olmadan yapılan hiçbir varsayım güvenilir değildir.\n\n' +
      '**3. Runtime hatası ve dump nadiren BAdI’yi işaret eder.** Bu vakada hiç hata bile ' +
      'oluşmadı — iki uygulama da **kendi içinde doğru** çalıştı. Sorun yalnızca ikisinin ' +
      'bir arada var olmasıydı.\n\n' +
      '**4. Yeni bir uygulama yazmadan önce mevcut olanı kontrol etmek zorunludur.** ' +
      '2027 ekibi {{SE18}}’i açıp 2024’ten kalan uygulamayı görseydi, ya onu genişletir ya ' +
      'da bilinçli bir öncelik kurardı. **Aktif uygulama envanteri periyodik olarak ' +
      'gözden geçirilmelidir** — tıpkı {{konu:dogrulama-ikame}} konusundaki aktif ikame ' +
      'envanteri gibi.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'BAdI, SAP’ın standart akışa önceden bıraktığı bir kancadır; SAP tanımı ({{SE18}}) yazar, müşteri uygulamayı ({{SE19}}) yazar.',
      'Dört basamaklı merdiven: standart yapılandırma → doğrulama/ikame → BAdI/genişletme → modifikasyon; her basamak bir öncekinden pahalıdır.',
      'Çoklu kullanıma açık tanımlarda birden fazla uygulama aktif olabilir ve **çalışma sırası garanti değildir**.',
      'Filtreli tanımlarda uygulama yalnızca filtre değeriyle eşleşen kayıtlarda çalışır — eşleşmezse sessizce atlanır.',
      'BAdI kendi başına kayıt üretmez ama herhangi bir alanı sessizce değiştirebilir; bu ikameden daha geniş bir risktir çünkü sınır yoktur.',
    ],
    onemliNoktalar:[
      'SE18 tanım (SAP yazar), SE19 uygulama (müşteri yazar), SE24 gerçek kod, SE80 paket/sahiplik.',
      'Standart nesneye dokunulmadığı için bir BAdI uygulaması SPAU/SPDD listesinde görünmez.',
      'CMOD/SMOD klasik müşteri çıkışlarıdır; hâlâ birçok kurulumda aktiftir ve S/4HANA dönüşümünde tek tek gözden geçirilmelidir.',
      'Bir BAdI’nin ne yaptığını görmenin tek yolu SE24’teki kodu okumaktır — GGB0’daki gibi bir önkoşul/kontrol alanı yoktur.',
      'S/4HANA’da clean-core ilkesiyle yalnızca "released" BAdI’ler güvenli kabul edilir; "BAdI’ye koyduk" cümlesi tek başına yeterli değildir.',
    ],
    sikHatalar:[
      { hata:'BAdI tanımlandı/uygulandı ama çalışmıyor sanılıyor, oysa yalnızca pasif bırakılmış.', dogru:'İlk kontrol her zaman SE19’da Aktif/Pasif durumudur.' },
      { hata:'Filtreli bir tanımda bir şirket kodu için filtre değeri girilmediği fark edilmiyor.', dogru:'SE18’de tanımın filtre türü doğrulanır, eksik değerler SE19’da tamamlanır.' },
      { hata:'Çoklu kullanıma açık bir tanımda yeni bir uygulama yazılırken var olanlar kontrol edilmiyor.', dogru:'Yeni uygulamadan önce SE18 → Uygulamalar sekmesi her zaman açılır.' },
      { hata:'Bir BAdI implementasyonunun mantığı belgelenmeden bırakılıyor.', dogru:'Her aktif uygulamanın iş diliyle bir açıklaması olmalıdır — kod kendiliğinden görünür değildir.' },
      { hata:'Standart yapılandırma veya kural motoru denenmeden doğrudan BAdI’ye gidiliyor.', dogru:'Merdiven her zaman yukarıdan aşağı denenir: standart → doğrulama/ikame → BAdI → modifikasyon.' },
    ],
    ipuclari:[
      '"Bazen çalışıyor bazen çalışmıyor" duyunca ilk şüphe çoklu kullanım olmalıdır.',
      '"Bir yerde çalışıyor, başka yerde çalışmıyor" duyunca ilk şüphe filtre değeri olmalıdır.',
      'Runtime hatasında BAdI adını değil, dump’taki sınıf adını ara.',
      'SPAU/SPDD listesinde bir BAdI uygulaması görünmez — bu yükseltme güvenliğinin sebebidir.',
      'Yeni bir gereksinimde önce Custom Fields and Logic gibi kodsuz alternatifleri değerlendir.',
    ],
    quiz:[
      { soru:'SE18 ve SE19 arasındaki temel fark nedir?', secenekler:[
          'SE18 uygulamayı, SE19 tanımı gösterir',
          'SE18 SAP’ın tanımını, SE19 müşterinin uygulamasını yönetir',
          'İkisi de aynı ekrandır, farklı işlem koduyla açılır',
          'SE18 yalnızca S/4HANA’da kullanılır' ],
        dogru:1, aciklama:'Tanımı SAP yazar ve SE18’de tutulur; uygulamayı müşteri yazar ve SE19 ile atanır.' },
      { soru:'Bir BAdI tanımı "çoklu kullanıma" açıksa ne olur?', secenekler:[
          'Yalnızca bir uygulama aktif olabilir',
          'Birden fazla uygulama aktif olabilir ve çalışma sırası SAP tarafından garanti edilmez',
          'Uygulama otomatik olarak tüm şirket kodlarında çalışır',
          'Filtre desteği devre dışı kalır' ],
        dogru:1, aciklama:'Çoklu kullanım, aynı anda birden fazla aktif uygulamaya izin verir; sıra garantisi yoktur — bu, "bazen çalışıyor bazen çalışmıyor" şikâyetinin klasik sebebidir.' },
      { soru:'Filtreli bir BAdI tanımında, uygulamanın filtre değeri bir şirket kodu için girilmemişse ne olur?', secenekler:[
          'Sistem hata mesajı verir ve kaydı engeller',
          'Uygulama o şirket kodunda sessizce çalışmaz, hiçbir mesaj çıkmaz',
          'Uygulama tüm şirket kodlarında zorla çalışır',
          'BAdI tanımı otomatik olarak devre dışı kalır' ],
        dogru:1, aciklama:'Filtre eşleşmeyen kayıtlarda uygulama atlanır — bu bir hata değil, tasarım gereği bir davranıştır ve hiçbir mesaj üretmez.' },
      { soru:'Bir BAdI uygulaması neden SPAU/SPDD yükseltme uyarlama listesinde görünmez?', secenekler:[
          'BAdI uygulamaları hiçbir zaman transport edilmediği için',
          'Standart SAP nesnesine dokunulmadığı, yalnızca SAP’ın bıraktığı kancaya bağlanıldığı için',
          'SPAU yalnızca doğrulama ve ikame kurallarını taşıdığı için',
          'BAdI uygulamaları müşteri ad alanında olmadığı için' ],
        dogru:1, aciklama:'SPAU/SPDD, standart SAP nesnelerindeki müşteri değişikliklerini (modifikasyonları) uyarlar. BAdI standart kodu değiştirmediği için bu listede yer almaz.' },
      { soru:'Runtime hatasında BAdI teşhisi neden genellikle dump’taki sınıf adından geriye doğru yapılır?', secenekler:[
          'Çünkü ST22 BAdI tanımlarını göstermez',
          'Çünkü hata mesajı çoğunlukla çağrılan uygulama sınıfını gösterir, BAdI tanımının adını değil',
          'Çünkü BAdI hataları hiçbir zaman dump üretmez',
          'Çünkü SE24 hata analiz aracı değildir' ],
        dogru:1, aciklama:'Dump, hatanın oluştuğu sınıf/metodu gösterir; bu sınıfın hangi BAdI tanımına bağlı olduğu SE19 üzerinden ayrıca bulunmalıdır.' },
    ],
    flashcards:[
      { on:'BAdI nedir?', arka:'SAP’ın standart akışa önceden bıraktığı, arayüz uygulayarak bağlanılan bir genişletme noktası.' },
      { on:'SE18 ne işe yarar?', arka:'BAdI tanımını gösterir — arayüz, çoklu kullanım, filtre desteği ve mevcut uygulamaların listesi. SAP’ın yazdığı taraf.' },
      { on:'SE19 ne işe yarar?', arka:'Bir tanıma müşterinin sınıfını bağlar, filtre değeri atar, aktif/pasif eder. Müşterinin yazdığı taraf.' },
      { on:'SE24 ne işe yarar?', arka:'Uygulama sınıfının arayüz metotlarının gerçek ABAP kodunun yazıldığı ve okunduğu yer.' },
      { on:'Çoklu kullanım tuzağı nedir?', arka:'Bir tanımda birden fazla uygulama aktifse, SAP çalışma sırasını garanti etmez — sonuç öngörülemez olabilir.' },
      { on:'Filtre tuzağı nedir?', arka:'Filtreli bir tanımda, filtre değeri girilmemiş kayıtlar için uygulama sessizce atlanır; hata mesajı çıkmaz.' },
      { on:'Dört basamaklı merdiven nedir?', arka:'Standart yapılandırma → doğrulama/ikame → BAdI/genişletme → modifikasyon; her basamak bir öncekinden pahalıdır.' },
      { on:'BAdI ile modifikasyon arasındaki temel fark nedir?', arka:'BAdI standart koda dokunmaz (SAP’ın bıraktığı kancaya bağlanır); modifikasyon standart kodu doğrudan değiştirir ve her yükseltmede SPAU/SPDD ile elle uyarlanır.' },
      { on:'CMOD/SMOD nedir?', arka:'Klasik, fonksiyon modülü tabanlı müşteri çıkışları — BAdI’den önceki nesil; hâlâ birçok eski kurulumda aktif.' },
      { on:'S/4HANA’da clean-core ilkesi BAdI için ne değiştirdi?', arka:'Yalnızca "released" (yayımlanmış) BAdI’ler cloud/clean-core uyumlu kabul edilir; "BAdI’ye koyduk" cümlesi artık tek başına yeterli bir gerekçe değildir.' },
    ],
  },

  },
});
