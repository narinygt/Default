/* ==========================================================================
   content/fi/e-donusum.js — "E-Dönüşüm (e-Fatura, e-Arşiv, e-İrsaliye, e-Defter)"

   Türkiye'ye özgü konu. Ana tez: muhasebe belgesi ile e-belge AYRI iki nesnedir.
   ========================================================================== */

SAP.registerTopic({
  id: 'e-donusum',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'E-dönüşüm, kâğıt belgelerin elektronik belgelerle değiştirilmesidir — ' +
      'ama bu tanım yanıltıcıdır ve **en büyük yanlış anlamanın kaynağıdır**.\n\n' +
      'E-fatura, *"faturayı yazıcı yerine e-posta ile göndermek"* değildir.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Bu konunun tek cümlelik tezi:**\n\n' +
      '**Muhasebe belgesi ile e-belge, iki ayrı nesnedir ve iki ayrı yaşam döngüsü vardır.**\n\n' +
      'Kâğıt dünyada fatura **tek bir şeydi**: kaydettin, yazdırdın, gönderdin. ' +
      'Elektronik dünyada **iki şey** vardır:\n\n' +
      '**① Muhasebe belgesi** → {{BKPF}} + {{BSEG}} · SAP’ta kaydedilir · ' +
      'cari hesabı borçlandırır · mizana girer\n\n' +
      '**② E-belge** → {{EDOCUMENT}} · {{ubl-tr}} XML üretilir · imzalanır · ' +
      '{{gib}}’e gider · **kabul veya red** alır\n\n' +
      '━━━━━━━━━━\n\n' +
      '**İkisi birbirinden bağımsız başarısız olabilir.**\n\n' +
      'Fatura FI’da sorunsuz muhasebeleşmiş, cari hesapta borç doğmuş, ' +
      'mizanda görünüyor olabilir — ve aynı anda e-belge **reddedilmiş** ' +
      'veya **hiç gönderilememiş** olabilir.\n\n' +
      'Sistem bu durumda **hata vermez**. Muhasebe açısından her şey yolundadır.',

    neden:
      '**Yasal zorunluluk.** Bu bir tercih değildir; {{gib}} belirli hadleri aşan ' +
      'mükellefler için zorunlu kılar. Uymamak cezaya tabidir.\n\n' +
      '**Belgenin hukuki hâli değişti.** Artık geçerli olan **{{ubl-tr}} XML**’dir — ' +
      'ekrandaki görüntü veya PDF değil. Uyuşmazlıkta gönderilen dosya esastır.\n\n' +
      '**Süreç iki taraflı oldu.** Kâğıt faturayı gönderirdin ve biterdi. ' +
      'E-faturada karşı taraf **yanıt verir** — ve {{ticari-fatura}} senaryosunda ' +
      '**reddedebilir**.\n\n' +
      '**Dönem kapanışı sertleşti.** {{e-defter}} beratı alınan dönem ' +
      '**yasal olarak** kesinleşir. {{OB52}} disiplini artık yalnızca ' +
      'muhasebe düzeni değil, **mevzuat uyumu** meselesidir.',

    sirketOnemi:
      'E-dönüşüm, FI danışmanının **Türkiye’ye özgü** en kritik uzmanlık alanıdır. ' +
      'Standart SAP bilgisi burada yetmez: mevzuat, entegratör mimarisi ve ' +
      'SAP’ın kesiştiği yerdir.\n\n' +
      'Şirket açısından riski somuttur:\n\n' +
      '**Reddedilen fatura tahsil edilemez.** Karşı taraf faturayı almamıştır; ' +
      'kayıtlarına girmemiştir. Cari hesapta alacak görünür ama ' +
      'müşteri *"böyle bir fatura yok"* der.\n\n' +
      '**Gönderilemeyen fatura KDV beyanını bozar.** Muhasebede hesaplanan KDV vardır, ' +
      'GİB tarafında karşılığı yoktur.\n\n' +
      '**Berat gecikirse ceza doğar.** {{e-defter}} yükleme süreleri kesindir.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Mülakat sorusu:** *"Fatura SAP’ta başarıyla kaydedildi. E-fatura süreci ' +
      'de başarılı mıdır?"*\n\n' +
      'Doğru cevap: **Hayır, bu iki ayrı sorudur.** ' +
      '{{BKPF}}’te belge oluşması, {{EDOCUMENT}} statüsü hakkında ' +
      '**hiçbir şey söylemez**. İkisi ayrı kontrol edilir.',

    gercekHayat:
      'Satış müdürü arıyor: **"Müşteri ödemiyor, faturayı almadığını söylüyor. ' +
      'Ama biz kestik, sistemde duruyor."**\n\n' +
      'Muhasebeci {{FB03}}’te belgeyi açıyor — **fatura orada**. ' +
      '{{FBL5N}}’de cari hesapta **borç görünüyor**. Mizan doğru.\n\n' +
      'Herkes müşterinin oyaladığını düşünüyor.\n\n' +
      '━━━━━━━━━━\n\n' +
      'Danışman {{EDOC_COCKPIT}}’i açıyor. Aynı faturanın e-belge statüsü:\n\n' +
      '🚫 **RED — "Alıcı e-fatura mükellefi değil"**\n\n' +
      'Fatura {{e-arsiv}} olarak kesilmesi gerekirken {{e-fatura}} olarak gönderilmiş ' +
      '(veya tersi). {{gib}} reddetmiş. Müşteriye **hiç ulaşmamış**.\n\n' +
      'Müşteri doğru söylüyordu.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Bu vakanın öğrettiği:** muhasebe tarafına bakarak ' +
      'e-belge hakkında hüküm verilemez. ' +
      '{{FB03}} *"kaydettik mi?"* sorusunu, {{EDOC_COCKPIT}} ise ' +
      '*"gönderebildik mi?"* sorusunu cevaplar. **İkisi farklı sorulardır.**',

    muhasebeMantigi:
      'E-dönüşüm muhasebe kayıtlarını **değiştirmez** — bu önemli ve rahatlatıcı bir gerçektir. ' +
      'Satış faturası yine `120 / 600 + 391` olarak kaydedilir.\n\n' +
      'Değişen **kaydın etrafındaki yükümlülüklerdir**:\n\n' +
      '**Numaralandırma.** E-fatura numarası SAP belge numarasından **ayrıdır**: ' +
      '16 karakterlik, GİB formatında, **kesintisiz** bir seridir. ' +
      'Kâğıt faturadaki matbaa serisinin karşılığıdır.\n\n' +
      '**İptal kavramı değişti.** Muhasebede iptal {{FB08}} ters kayıttır ve ' +
      'her zaman mümkündür. E-tarafta:\n' +
      '• {{e-arsiv}} → belirli süre içinde **iptal edilebilir**\n' +
      '• {{e-fatura}} → ⚠️ **iptal edilemez**. {{ticari-fatura}} senaryosunda ' +
      'alıcı reddedebilir; aksi hâlde **iade faturası** kesilir.\n\n' +
      '**Dönem kesinleşmesi.** {{berat}} alınan dönem yasal olarak kapanır. ' +
      'Muhasebede {{OB52}} ile açabilirsin — ama **yapmamalısın**.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Kritik sonuç:** muhasebe ile e-belge arasındaki **iptal asimetrisi**, ' +
      'e-dönüşümdeki hataların neden bu kadar pahalı olduğunu açıklar.\n\n' +
      '{{FB08}} ile SAP’ta belgeyi ters kaydedersin — ama GİB tarafındaki ' +
      'e-fatura **yerinde durur**. İki taraf **ayrışır**. ' +
      'Düzeltme her iki tarafta **ayrı ayrı** yapılmalıdır.',

    kavramlar: ['gib', 'e-fatura', 'e-arsiv', 'e-irsaliye', 'e-defter', 'berat',
                'ozel-entegrator', 'ubl-tr', 'mali-muhur', 'mukellef-sorgulama',
                'temel-fatura', 'ticari-fatura'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Akış **iki koldan** ilerler ve bu ikilik konunun tamamını açıklar: ' +
      'bir kol muhasebeye, diğeri {{gib}}’e gider. ' +
      'İkisi aynı kayıttan doğar ama **ayrı ayrı** başarılı veya başarısız olur.',

    roller:[
      { rol:'Satış / Muhasebe', gorev:'Faturayı keser — {{VF01}} veya {{FB70}}.' },
      { rol:'Sistem', gorev:'**Kol 1:** {{BKPF}} + {{BSEG}} muhasebe belgesi oluşur.' },
      { rol:'Sistem', gorev:'**Kol 2:** {{EDOCUMENT}} e-belgesi oluşur — belge tipi burada belirlenir.' },
      { rol:'Sistem', gorev:'{{mukellef-sorgulama}} → alıcı kayıtlı mı? → {{e-fatura}} / {{e-arsiv}}' },
      { rol:'Sistem', gorev:'{{ubl-tr}} XML üretilir ve {{mali-muhur}} ile imzalanır.' },
      { rol:'{{ozel-entegrator}}', gorev:'XML’i {{gib}}’e iletir.' },
      { rol:'{{gib}} / Alıcı', gorev:'Kabul veya **red** yanıtı döner.' },
      { rol:'Sistem', gorev:'Yanıt {{EDOCUMENT}} statüsüne işlenir.' },
      { rol:'Danışman', gorev:'⭐ {{EDOC_COCKPIT}} **günlük** kontrol edilir.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Tek kayıt, iki kol — muhasebe ve e-belge ayrışması',
      adimlar:[
        { ic:'🧾', rol:'Kullanıcı', baslik:'Fatura kesilir',
          aciklama:'{{VF01}} (SD) veya {{FB70}} (FI). ' +
                   'Kullanıcı açısından **tek bir işlem**.',
          cikti:'Fatura', ok:'ikiye ayrılır' },
        { ic:'📗', rol:'Sistem · Kol 1', baslik:'Muhasebe belgesi oluşur',
          aciklama:'{{BKPF}} + {{BSEG}} · cari hesap borçlanır · mizana girer.\n\n' +
                   '✅ Bu kol **genelde sorunsuzdur** ve kullanıcı burayı görür.',
          cikti:'{{BKPF}}', ok:'aynı anda' },
        { ic:'📡', rol:'Sistem · Kol 2', baslik:'E-belge oluşur — **ayrı nesne**',
          aciklama:'{{EDOCUMENT}} kaydı açılır. ' +
                   '⚠️ Kullanıcı bu kolu **görmez** — sorunların kaynağı budur.',
          cikti:'{{EDOCUMENT}}', ok:'tip belirlenir' },
        { ic:'🔍', rol:'Sistem', baslik:'{{mukellef-sorgulama}} — hangi belge tipi?',
          aciklama:'Alıcı e-fatura sistemine **kayıtlı mı**?\n\n' +
                   'Kayıtlı → **{{e-fatura}}** · Kayıtsız → **{{e-arsiv}}**\n\n' +
                   '⚠️ Bu karar **liste güncelliğine** bağlıdır. ' +
                   'Eski liste = yanlış belge tipi = **red**.',
          cikti:'Belge tipi', ok:'XML üretilir' },
        { ic:'📄', rol:'Sistem', baslik:'{{ubl-tr}} XML üretilir',
          aciklama:'Faturanın **hukuken geçerli hâli** budur — ekran görüntüsü değil. ' +
                   '`EDOCUMENTFILE`’a saklanır.',
          cikti:'XML', ok:'imzalanır' },
        { ic:'🔏', rol:'Sistem', baslik:'{{mali-muhur}} ile imzalanır',
          aciklama:'Tüzel kişi **mali mühür**, gerçek kişi **e-imza**. ' +
                   '⚠️ Sertifika süresi dolmuşsa **tüm gönderim durur**.',
          cikti:'İmzalı XML', ok:'gönderilir' },
        { ic:'🚚', rol:'{{ozel-entegrator}}', baslik:'GİB’e iletilir',
          aciklama:'Çoğu kurulumda gönderimi **entegratörün add-on’u** yapar, ' +
                   'SAP standardı değil.\n\n' +
                   '⚠️ Sorun giderirken ilk soru: *"hata SAP’ta mı, entegratörde mi?"*',
          cikti:'Gönderim', ok:'yanıt bekle' },
        { ic:'↩️', rol:'{{gib}} / Alıcı', baslik:'Yanıt döner — **kabul veya red**',
          aciklama:'{{temel-fatura}}: red hakkı yok, süreç biter.\n' +
                   '{{ticari-fatura}}: ⚠️ alıcı **reddedebilir**.\n\n' +
                   'Red gelirse muhasebe belgesi **yerinde durur** — iki taraf ayrışır.',
          cikti:'Statü', ok:'işlenir' },
        { ic:'📊', rol:'Danışman', baslik:'⭐ {{EDOC_COCKPIT}} günlük kontrol',
          aciklama:'Muhasebe kapanışı bu kontrolü **kapsamaz**. ' +
                   'Ayrı bir günlük rutin olmalıdır.',
          cikti:'Temiz statü listesi' },
      ],
    },

    adimlar:[
      { rol:'Kullanıcı', eylem:'Fatura keser', sistem:'{{VF01}} / {{FB70}}' },
      { rol:'Sistem', eylem:'Muhasebe belgesi üretir', sistem:'{{BKPF}} + {{BSEG}}' },
      { rol:'Sistem', eylem:'E-belge üretir', sistem:'{{EDOCUMENT}}' },
      { rol:'Sistem', eylem:'Belge tipini belirler', sistem:'{{mukellef-sorgulama}}' },
      { rol:'Sistem', eylem:'XML üretir ve imzalar', sistem:'{{ubl-tr}} + {{mali-muhur}}' },
      { rol:'Entegratör', eylem:'GİB’e iletir', sistem:'{{ozel-entegrator}} add-on’u' },
      { rol:'GİB / Alıcı', eylem:'Yanıt verir', sistem:'Kabul / red' },
      { rol:'Danışman', eylem:'Statü izler', sistem:'⭐ {{EDOC_COCKPIT}} — **günlük**' },
    ],

    veriAkisi:{
      nereden:'SD faturası ({{VBRK}}) veya FI faturası ({{BKPF}}).',
      nereye:'{{EDOCUMENT}} → {{ubl-tr}} XML → entegratör → {{gib}} → alıcı.',
      tetikleyen:'Fatura muhasebeleştirme; e-irsaliyede **SD teslimatı**.',
      sonraki:'Statü izleme · red hâlinde iade faturası · dönem sonunda {{e-defter}} + {{berat}}.',
    },

    notlar:[
      { tip:'warn', baslik:'Muhasebe kapanışı e-belge kontrolünü kapsamaz', metin:
        'Ay sonu kapanış listesi ({{konu:closing}}) muhasebe tarafını kontrol eder: ' +
        'mizan denk mi, dönem kapandı mı, değerleme yapıldı mı.\n\n' +
        '**Hiçbiri e-belge statüsüne bakmaz.**\n\n' +
        'Bu yüzden bir ay boyunca reddedilmiş faturalar birikebilir ve ' +
        'kapanış **sorunsuz** görünür — çünkü muhasebe tarafı gerçekten sorunsuzdur.\n\n' +
        '⭐ **Kalıcı çözüm iki adımdır:**\n\n' +
        '**1. Günlük:** {{EDOC_COCKPIT}}’te hata ve red statüsü **sıfır** olmalı.\n' +
        '**2. Ay sonu:** kapanış listesine *"e-belge statüsü temiz mi?"* maddesi eklenir.\n\n' +
        'Bu, {{konu:error-handling}} konusundaki **② sessiz hata** sınıfının ' +
        'Türkiye’ye özgü en pahalı örneğidir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      '⭐ **E-dönüşüm muhasebe kaydını değiştirmez.** Bu, konunun en rahatlatıcı gerçeğidir: ' +
      'satış faturası e-fatura da olsa kâğıt da olsa aynı kaydı üretir.\n\n' +
      'Değişen, **düzeltme mekanizmasıdır** — ve asıl zorluk oradadır.',

    etkilenenHesaplar:[
      { hesap:'120 Alıcılar', tur:'Bilanço — Varlık', neden:'Fatura kaydı borç doğurur — **e-belge statüsünden bağımsız**.' },
      { hesap:'600 Yurt içi satışlar', tur:'Gelir', neden:'Hasılat kaydı — değişmez.' },
      { hesap:'391 Hesaplanan KDV', tur:'Bilanço — Kaynak', neden:'⚠️ Beyan GİB’e gider; **e-belge gitmezse ayrışma** doğar.' },
      { hesap:'360 Ödenecek vergiler', tur:'Bilanço — Kaynak', neden:'{{tevkifat}}lı e-faturada ayrı satır.' },
      { hesap:'610 Satıştan iadeler', tur:'Gelir (–)', neden:'Red gelirse **iade faturası** — ters kayıt değil.' },
    ],

    fisler:[
      { baslik:'① Normal e-fatura — muhasebe kaydı kâğıtla **aynı**',
        belgeTuru:'RV', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar', borc:120000, not:'{{BSID}} açık kalem' },
          { hesap:'600', ad:'Yurt içi satışlar', alacak:100000 },
          { hesap:'391', ad:'Hesaplanan KDV %20', alacak:20000, not:'{{BSET}}' },
        ],
        not:'✅ **E-dönüşüm bu kaydı hiç değiştirmedi.**\n\n' +
             'Muhasebe açısından e-fatura ile kâğıt fatura **birebir aynıdır**. ' +
             'Hesaplar aynı, tutarlar aynı, {{BSET}} aynı.\n\n' +
             'Değişen, bu kaydın **yanında** ikinci bir nesnenin ({{EDOCUMENT}}) ' +
             'doğması ve onun **kendi kaderinin** olmasıdır.\n\n' +
             'Bu ayrımı görmemek, e-dönüşüm sorunlarının **kaynağıdır**.' },

      { baslik:'② {{tevkifat}}lı e-fatura — XML’de ayrı alan ister',
        belgeTuru:'RV', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar', borc:108000, not:'Tevkifat düşülmüş tahsil edilecek' },
          { hesap:'600', ad:'Yurt içi satışlar', alacak:100000 },
          { hesap:'391', ad:'Hesaplanan KDV (satıcı payı)', alacak:8000, not:'%40 satıcıda' },
        ],
        not:'Tevkifatlı işlemde KDV’nin bir kısmını **alıcı** beyan eder.\n\n' +
             'Örnek: 20.000 KDV’nin %60’ı (12.000) alıcıda, %40’ı (8.000) satıcıda. ' +
             'Fatura tutarı 120.000 yerine **108.000** tahsil edilir.\n\n' +
             '⚠️ **E-dönüşüm açısından kritik nokta:** tevkifat oranı ve kodu ' +
             '{{ubl-tr}} XML’inde **ayrı alanlarda** taşınır. ' +
             'Muhasebe kaydı doğru olsa bile XML’de tevkifat bilgisi eksikse ' +
             '{{gib}} belgeyi **reddeder**.\n\n' +
             'Yani: *"muhasebe doğru, e-belge yanlış"* durumunun somut örneği. ' +
             'Kaynak genelde vergi kodu ile e-belge alan eşlemesinin eksik olmasıdır.' },

      { baslik:'③ Red geldi — düzeltme **iade faturasıyla**, ters kayıtla değil',
        belgeTuru:'RV', tarih:'20.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'610', ad:'Satıştan iadeler', borc:100000 },
          { hesap:'391', ad:'Hesaplanan KDV', borc:20000 },
          { hesap:'120', ad:'Alıcılar', alacak:120000 },
        ],
        not:'⚠️ **Burada bir muhasebe tercihi değil, bir mevzuat kısıtı var.**\n\n' +
             '{{FB08}} ile ters kayıt yapmak **SAP’ta mümkündür** ve muhasebeyi düzeltir. ' +
             'Ama {{gib}} tarafındaki e-fatura **yerinde durur** — ters kayıt ' +
             'GİB’e giden bir belge üretmez.\n\n' +
             'Sonuç: **iki taraf ayrışır.** SAP’ta belge iptal, GİB’de belge geçerli.\n\n' +
             '**Doğru yol:** {{e-fatura}} iptal edilemez; ' +
             '**iade faturası** kesilir. İade faturası da bir e-belgedir, ' +
             'GİB’e gider ve orijinali **karşılar**.\n\n' +
             '{{e-arsiv}} ise farklıdır — belirli süre içinde **iptal edilebilir**.' },
    ],

    tHesaplar:[
      { hesap:'Alıcılar — red senaryosu', kod:'120',
        borc:[{ ad:'① Orijinal e-fatura', tutar:120000 }],
        alacak:[{ ad:'③ İade faturası', tutar:120000 }],
        not:'Muhasebe kapanıyor · **her iki belge de GİB’e gitti**' },
    ],

    notlar:[
      { tip:'warn', baslik:'İptal asimetrisi — e-dönüşümün en pahalı tuzağı', metin:
        'Muhasebede iptal **her zaman mümkündür**: {{FB08}} ters kayıt yapar.\n\n' +
        'E-belge tarafında **öyle değildir** ve üç farklı kural vardır:\n\n' +
        '**{{e-arsiv}}** → belirli süre içinde **iptal edilebilir**\n' +
        '**{{e-fatura}} / {{temel-fatura}}** → ⚠️ **iptal edilemez, reddedilemez** → ' +
        'yalnızca **iade faturası**\n' +
        '**{{e-fatura}} / {{ticari-fatura}}** → alıcı süresi içinde **reddedebilir**; ' +
        'süre geçtiyse yine iade faturası\n\n' +
        '━━━━━━━━━━\n\n' +
        '⚠️ **Tehlike şurada:** kullanıcı SAP’ta {{FB08}} yapar, ' +
        'muhasebe düzelir, **rahatlar**. GİB tarafında fatura **hâlâ geçerlidir**.\n\n' +
        'Bu ayrışma genelde **KDV beyanında** ortaya çıkar: ' +
        'muhasebedeki hesaplanan KDV ile GİB’e giden e-fatura toplamı **tutmaz**.\n\n' +
        '**Kural:** e-belge üretmiş bir faturada düzeltme, ' +
        '**her iki tarafta ayrı ayrı** yapılır. ' +
        'Muhasebeyi düzeltmek işin **yarısıdır**.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'E-dönüşüm tek bir belge değil, bir **belge ailesidir**. ' +
      'Her birinin kendi tetikleyicisi, kendi zamanlaması ve kendi iptal kuralı vardır.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Önce en sık karıştırılan ayrım: e-Fatura mı, e-Arşiv mi?**\n\n' +
      'Bu **kullanıcının tercihi değildir**. Tek bir soruya bağlıdır:\n\n' +
      '**"Alıcı e-fatura sistemine kayıtlı mı?"**\n\n' +
      '**Kayıtlı** → **{{e-fatura}}** zorunlu · GİB üzerinden alıcıya **iletilir** · ' +
      'iptal edilemez\n' +
      '**Kayıtsız** → **{{e-arsiv}}** · GİB’e **raporlanır** · alıcıya e-posta/kâğıt · ' +
      'süre içinde iptal edilebilir\n\n' +
      'Yanlış tip seçilirse {{gib}} **reddeder** — ve bu red **sessizdir**.\n\n' +
      'Kararı {{mukellef-sorgulama}} listesi verir; ' +
      '**listenin güncelliği bu yüzden kritiktir**.',

    liste:[
      { ad:'📨 Belge · {{e-fatura}} — kayıtlı mükellefler arası', en:'e-Invoice',
        aciklama:'Alıcı e-fatura sistemine kayıtlıysa **zorunludur**. ' +
                 'GİB üzerinden alıcıya **iletilir**.',
        neZaman:'B2B satışlarda, alıcı kayıtlıysa.',
        ornek:'**İki senaryo vardır ve farkları kritiktir:**\n\n' +
              '**{{temel-fatura}}** — alıcının sistem üzerinden **red hakkı yoktur**. ' +
              'Fatura iletilir, süreç biter.\n\n' +
              '**{{ticari-fatura}}** — ⚠️ alıcı süresi içinde **kabul veya red** yanıtı verir. ' +
              'Yani fatura muhasebeleşmiş olsa bile **reddedilebilir**.\n\n' +
              '⚠️ **İptal edilemez.** Düzeltme **iade faturasıyla** yapılır.',
        tcodes:['EDOC_COCKPIT'] },

      { ad:'📄 Belge · {{e-arsiv}} — kayıtsız alıcı / nihai tüketici', en:'e-Archive Invoice',
        aciklama:'Alıcı e-fatura sistemine kayıtlı **değilse** kesilir. ' +
                 'GİB’e **raporlanır**, alıcıya ayrıca iletilir.',
        neZaman:'Nihai tüketici satışları, kayıtsız mükellefler, internet satışları.',
        ornek:'**{{e-fatura}}’dan üç farkı:**\n\n' +
              '**1. İletim** — GİB üzerinden alıcıya gitmez; **raporlanır**. ' +
              'Alıcıya e-posta veya kâğıt çıktı ile ulaştırılır.\n' +
              '**2. Red yok** — alıcı sistem üzerinden reddedemez.\n' +
              '**3. ⭐ İptal edilebilir** — belirli bir süre içinde. ' +
              'Bu, e-faturaya göre **önemli bir esnekliktir**.\n\n' +
              '⚠️ Bir müşteri sonradan e-fatura mükellefi olursa, ' +
              'ona artık e-arşiv kesilemez — bu, bu konudaki **senaryonun** konusudur.',
        tcodes:['EDOC_COCKPIT'] },

      { ad:'🚚 Belge · {{e-irsaliye}} — mal hareketiyle birlikte', en:'e-Delivery Note',
        aciklama:'Sevk irsaliyesinin elektronik hâli. **Faturadan bağımsız** bir belgedir.',
        neZaman:'Mal sevkiyatında — fatura kesilmeden önce olabilir.',
        ornek:'⚠️ **Tetikleyicisi FI değil, lojistiktir:** ' +
              'SD teslimatı veya MM mal hareketi.\n\n' +
              'Bu yüzden e-irsaliye sorunları çoğu zaman **muhasebede değil, ' +
              'lojistik tarafında** çözülür — ve FI danışmanına gelen ' +
              'e-irsaliye sorunlarının çoğu aslında **teslimat verisi** sorunudur.\n\n' +
              '**Zamanlama farkı önemlidir:** irsaliye **malın sevkinde** düzenlenir, ' +
              'fatura sonra kesilebilir. İkisi **aynı anda olmak zorunda değildir**.',
        tcodes:['EDOC_COCKPIT'] },

      { ad:'📚 Belge · {{e-defter}} — yevmiye ve kebir', en:'e-Ledger',
        aciklama:'Yevmiye ve Büyük Defter’in elektronik üretilip {{berat}} ile onaylatılması.',
        neZaman:'Aylık (veya üç aylık) dönemler hâlinde, dönem kapanışından sonra.',
        ornek:'**Akış:** dönem kapanır → XML üretilir → imzalanır → ' +
              '**{{berat}}** hesaplanır → GİB’e yüklenir → onay alınır.\n\n' +
              '⭐ **En kritik sonuç:** beratı alınan dönem **yasal olarak kesinleşir**.\n\n' +
              '{{OB52}} ile o dönemi teknik olarak açabilirsin — ' +
              'ama açıp kayıt yaparsan defter ile SAP **ayrışır** ve ' +
              'bu bir **mevzuat sorunudur**, muhasebe sorunu değil.\n\n' +
              'Bu, Türkiye’de dönem disiplininin neden başka ülkelerden ' +
              '**daha katı** olduğunun gerekçesidir (bkz. {{konu:closing}}).',
        tcodes:['OB52'] },

      { ad:'🧾 Belge · e-Müstahsil ve e-SMM', en:'Other e-Documents',
        aciklama:'Sektöre özgü diğer e-belgeler.',
        neZaman:'Tarımsal alım (müstahsil) ve serbest meslek faaliyetlerinde.',
        ornek:'**e-Müstahsil Makbuzu** — çiftçiden yapılan alımlarda. ' +
              'Tarım ve gıda sektöründe yaygın.\n\n' +
              '**e-Serbest Meslek Makbuzu (e-SMM)** — avukat, doktor, ' +
              'danışman gibi serbest meslek erbabı için.\n\n' +
              'İkisi de aynı çatı altında çalışır: {{ubl-tr}} XML, {{mali-muhur}}, ' +
              'GİB’e iletim. Fark **belge tipi ve alan setindedir**.\n\n' +
              'Sektöre göre e-Bilet, e-Adisyon gibi başka türler de vardır.' },

      { ad:'🔀 Gönderim · Doğrudan entegrasyon', en:'Direct Integration',
        aciklama:'Şirket kendi sistemini doğrudan {{gib}}’e bağlar.',
        neZaman:'Çok yüksek hacimde; teknik ekip kapasitesi varsa.',
        ornek:'**Avantaj:** aracı yok, maliyet düşük, tam kontrol.\n\n' +
              '**Dezavantaj:** ⚠️ **tüm teknik yük şirkettedir** — ' +
              'GİB arayüz değişiklikleri, sertifika yönetimi, saklama yükümlülüğü, ' +
              'kesinti durumunda müdahale.\n\n' +
              'GİB arayüzü **mevzuatla değişir**; her değişiklikte ' +
              'geliştirme yapmak gerekir. Bu yüzden pratikte **azınlıktadır**.' },

      { ad:'🔀 Gönderim · {{ozel-entegrator}} — en yaygın', en:'Private Integrator',
        aciklama:'GİB yetkili aracı kurum; arayüz, iletim ve saklamayı üstlenir.',
        neZaman:'⭐ Kurulumların **çoğunluğu**.',
        ornek:'**Danışman için en kritik mimari bilgi budur:**\n\n' +
              'SAP standardı e-belgeyi **üretir** ({{EDOCUMENT}} + {{ubl-tr}} XML). ' +
              '**Gönderimi** ise çoğu kurulumda **entegratörün SAP add-on’u** yapar.\n\n' +
              '⚠️ Yani sistemde **iki ayrı yazılım** vardır ve ' +
              'sorun giderirken ilk soru şudur:\n\n' +
              '**"Hata SAP tarafında mı, entegratör tarafında mı?"**\n\n' +
              '**Ayrım noktası:** {{EDOCUMENT}} kaydı **oluştu mu**?\n' +
              '• Oluşmadıysa → sorun **SAP’ta** (tetikleyici, eşleme, veri)\n' +
              '• Oluştu ama gönderilmediyse → sorun **entegratörde** veya iletişimde\n\n' +
              'Bu tek soru, teşhis süresini yarıya indirir.' },

      { ad:'🔀 Gönderim · GİB Portal', en:'GİB Portal',
        aciklama:'GİB’in kendi web arayüzünden **elle** giriş.',
        neZaman:'Çok düşük hacimli mükellefler.',
        ornek:'⚠️ **SAP entegrasyonu yoktur.** Faturalar elle girilir.\n\n' +
              'Bu, SAP kullanan bir şirket için **uygun değildir** — ' +
              'çift giriş demektir ve mutabakatsızlık **kaçınılmazdır**.\n\n' +
              'Danışman olarak karşılaşırsan bu genelde ' +
              '**geçici bir durumdur** veya küçük bir yan şirkettir.' },

      { ad:'🏷️ Fatura tipi · SATIŞ / İADE / TEVKİFAT / İSTİSNA', en:'Invoice Type Codes',
        aciklama:'{{ubl-tr}} XML’inde faturanın **niteliğini** belirten kod.',
        neZaman:'Her e-faturada — yanlış tip **red sebebidir**.',
        ornek:'**Yaygın tipler:**\n\n' +
              '**SATIŞ** — normal satış faturası\n' +
              '**İADE** — iade faturası (red sonrası düzeltmede)\n' +
              '**TEVKİFAT** — {{tevkifat}} içeren fatura\n' +
              '**İSTİSNA** — KDV istisnası olan işlemler (**istisna kodu zorunlu**)\n' +
              '**ÖZEL MATRAH** — özel matrah şekilleri\n' +
              '**İHRAÇ KAYITLI** — ihracat kayıtlı teslimler\n\n' +
              '⚠️ **SAP tarafında bu tip, vergi kodundan ve satış belge türünden türetilir.** ' +
              'Eşleme eksikse tip yanlış gider ve GİB reddeder.\n\n' +
              'İstisna faturasında ayrıca **istisna kodu** zorunludur; ' +
              'boş giderse belge **reddedilir**.',
        tcodes:['FTXP'] },
    ],

    karsilastirmaBasliklar:['{{e-fatura}}', '{{e-arsiv}}'],
    karsilastirma:[
      ['Alıcı', 'Sisteme **kayıtlı** mükellef', 'Kayıtsız / nihai tüketici'],
      ['Seçim', '⚠️ **Tercih değil** — {{mukellef-sorgulama}} belirler', 'Aynı — alıcının durumu belirler'],
      ['İletim', 'GİB üzerinden alıcıya **iletilir**', 'GİB’e **raporlanır**, alıcıya ayrıca'],
      ['Alıcı yanıtı', '{{ticari-fatura}}’da **red mümkün**', 'Red yok'],
      ['İptal', '🚫 **İptal edilemez**', '✅ Süre içinde **iptal edilebilir**'],
      ['Düzeltme', '**İade faturası**', 'İptal veya iade faturası'],
      ['Yanlış tip seçilirse', '**GİB reddeder** — sessizce', 'Aynı'],
      ['Format', '{{ubl-tr}} XML', '{{ubl-tr}} XML'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'EDOC_COCKPIT', ad:'eDocument Cockpit — e-belgenin gerçek durumu',
        amac:'E-belgelerin statüsünü gösterir: oluştu, gönderildi, kabul, **red**, hata.',
        neZaman:'⭐ **Her gün.** Ve müşteri *"fatura gelmedi"* dediği her seferde.',
        adimlar:[
          { baslik:'Tarih aralığı ve e-belge tipi seçilir' },
          { baslik:'**Statüye göre süzülür**',
            aciklama:'Önce **hata** ve **red**; başarılılar zaten sorun değil.' },
          { baslik:'Belgeye çift tıkla — hata detayı ve XML görülür' },
          { baslik:'Kaynak muhasebe belgesine geçilir',
            aciklama:'{{FB03}} veya {{VF03}} — iki tarafı **yan yana** görmek için.' },
          { baslik:'Geçici hataysa {{EDOC_RESUBMIT}}; kalıcıysa **önce kaynak veri**' },
        ],
        ekranAkisi:[
          { ekran:'Belirti', islem:'Müşteri: *"Fatura gelmedi"* · {{FB03}}’te belge **var**' },
          { ekran:'{{EDOC_COCKPIT}}', islem:'Aynı fatura → statü **RED**' },
          { ekran:'Detay', islem:'*"Alıcı e-fatura mükellefi"* — {{e-arsiv}} kesilmiş' },
          { ekran:'Kök sebep', islem:'{{mukellef-sorgulama}} listesi **güncel değil**' },
          { ekran:'Çözüm', islem:'Liste güncellendi → iade faturası → doğru tiple yeniden' },
        ],
        alanlar:{
          zorunlu:['Tarih aralığı'],
          opsiyonel:['E-belge tipi','Statü','Şirket kodu','Kaynak belge numarası'] },
        hatalar:[
          { mesaj:'Fatura kestim ama cockpit’te **hiç görünmüyor**', sebep:'E-belge **hiç oluşmamış** — tetikleyici çalışmamış.', cozum:'⚠️ Bu **SAP tarafı** sorunudur, entegratör değil. E-belge tipi ataması, müşteri ana verisi ve belge türü eşlemesi kontrol edilir.' },
          { mesaj:'Statü "gönderildi"de takılı kalmış', sebep:'Entegratörden yanıt dönmemiş.', cozum:'Entegratör portalından kontrol et. Sorun **SAP dışındadır**.' },
          { mesaj:'Statü **red** — sebep yazmıyor', sebep:'Red gerekçesi yanıt dosyasındadır.', cozum:'`EDOCUMENTFILE`’daki **gelen yanıt XML**’ini oku.' },
          { mesaj:'Toplu yeniden gönderdim, yine hata', sebep:'Kalıcı veri hatası — iletişim sorunu değil.', cozum:'⚠️ {{EDOC_RESUBMIT}} yalnızca **geçici** hataları çözer. Önce kaynak veriyi düzelt.' },
        ],
        ipucu:'⭐ **Bu ekran günlük rutin olmalıdır** ve bu, konunun ' +
              'en yüksek getirili tek tavsiyesidir.\n\n' +
              'Sebebi: muhasebe kapanışı e-belge statüsünü **kapsamaz**. ' +
              'Mizan denk, dönem kapalı, her şey yolunda görünür — ' +
              've bir ay boyunca reddedilmiş faturalar birikmiş olabilir.\n\n' +
              'Hedef basittir: **hata ve red statüsü = 0**.\n\n' +
              'Bu, {{konu:error-handling}} konusundaki *"{{SLG1}} kırmızı = 0"* ' +
              'kuralının e-dönüşümdeki karşılığıdır.',
        ilgili:['EDOC_RESUBMIT','FB03','VF03'] },

      { kod:'EDOC_RESUBMIT', ad:'Yeniden gönderim — ama önce sebebi ayır',
        amac:'Hata durumundaki e-belgeleri toplu yeniden gönderir.',
        neZaman:'**Yalnızca geçici** hatalarda: entegratör kesintisi, ağ sorunu, GİB bakımı.',
        adimlar:[
          { baslik:'⚠️ **Önce hata sebebini oku** — geçici mi, kalıcı mı?',
            aciklama:'Bu ayrım yapılmadan yeniden gönderim **zaman kaybıdır**.' },
          { baslik:'Geçici ise: tarih aralığı ve statü ile süz, yeniden gönder' },
          { baslik:'Kalıcı ise: **kaynak veriyi düzelt**',
            aciklama:'Yanlış belge tipi, eksik istisna kodu, hatalı vergi eşlemesi.' },
          { baslik:'{{EDOC_COCKPIT}}’te statüyü **doğrula**' },
        ],
        ekranAkisi:[
          { ekran:'Durum', islem:'47 belge **hata** statüsünde' },
          { ekran:'Ayrım', islem:'39’u *"bağlantı zaman aşımı"* → **geçici**' },
          { ekran:'', islem:'8’i *"istisna kodu eksik"* → ⚠️ **kalıcı**' },
          { ekran:'Eylem', islem:'39 yeniden gönderildi ✓ · 8’inde önce **vergi kodu** düzeltildi' },
        ],
        alanlar:{ zorunlu:['Tarih aralığı'], opsiyonel:['E-belge tipi','Statü'] },
        hatalar:[
          { mesaj:'Yeniden gönderdim, aynı hata', sebep:'Kalıcı veri hatası.', cozum:'Hata metnini oku. *"Zaman aşımı / bağlantı"* geçicidir; *"kod eksik / geçersiz / mükellef değil"* **kalıcıdır**.' },
          { mesaj:'Aynı fatura iki kez gitti mi?', sebep:'Yeniden gönderim endişesi.', cozum:'Çerçeve aynı e-belge kimliğini kullanır; **çift kayıt üretmez**. Yine de gönderim öncesi statü kontrol edilir.' },
        ],
        ipucu:'⚠️ **En sık yapılan hata: her hatada yeniden göndermek.**\n\n' +
              'Yeniden gönderim yalnızca **iletişim** sorunlarını çözer. ' +
              'Veri hatası varsa aynı hatalı XML tekrar gider ve tekrar reddedilir.\n\n' +
              '**Ayrım kuralı:**\n' +
              '*"Zaman aşımı", "bağlantı", "servis kullanılamıyor"* → **geçici** → yeniden gönder\n' +
              '*"Kod eksik", "geçersiz", "mükellef değil", "format"* → **kalıcı** → önce veriyi düzelt\n\n' +
              'Bu ayrım, {{konu:error-handling}}’deki *"belirti mi kök sebep mi?"* ' +
              'sorusunun buradaki hâlidir.',
        ilgili:['EDOC_COCKPIT','FTXP'] },

      { kod:'FTXP', ad:'Vergi kodu — e-belge alanlarının kaynağı',
        amac:'Vergi kodları ve oranları; e-belge tipi ve istisna kodu **buradan türetilir**.',
        neZaman:'Yeni vergi kodu açarken; istisna ve tevkifat redlerinde.',
        adimlar:[
          { baslik:'Ülke ve vergi kodu girilir' },
          { baslik:'Oran ve hesap anahtarı tanımlanır' },
          { baslik:'⚠️ **E-belge eşlemesi kontrol edilir**',
            aciklama:'İstisna kodu, tevkifat oranı, fatura tipi ataması. ' +
                     'Bu eşleme çoğu kurulumda **entegratör add-on’unda** tutulur.' },
        ],
        ekranAkisi:[
          { ekran:'Belirti', islem:'İstisna faturası **red** — *"istisna kodu eksik"*' },
          { ekran:'{{FTXP}}', islem:'Vergi kodu **doğru** · oran %0 · muhasebe **sorunsuz**' },
          { ekran:'Kök sebep', islem:'Vergi kodu ↔ **istisna kodu** eşlemesi yapılmamış' },
          { ekran:'Ders', islem:'⭐ Muhasebe doğru, **e-belge alanı** eksik' },
        ],
        alanlar:{ zorunlu:['Ülke','Vergi kodu','Oran'], opsiyonel:['İstisna kodu eşlemesi','Tevkifat oranı'] },
        hatalar:[
          { mesaj:'İstisna faturası reddediliyor', sebep:'İstisna kodu boş gidiyor.', cozum:'Vergi kodu ile istisna kodu eşlemesi tanımlanır — muhasebe tarafı doğru olsa bile bu **ayrı bir eşlemedir**.' },
          { mesaj:'Tevkifatlı fatura reddediliyor', sebep:'Tevkifat oranı XML’de eksik.', cozum:'{{tevkifat}} kodu ile e-belge alanı eşlemesi kontrol edilir.' },
        ],
        ipucu:'⭐ **Bu kod, konunun ana tezinin en somut kanıtıdır.**\n\n' +
              'Bir vergi kodu **muhasebe açısından mükemmel** çalışabilir: ' +
              'doğru oran, doğru hesap, doğru {{BSET}} kaydı.\n\n' +
              'Ve aynı vergi kodu **e-belge açısından eksik** olabilir: ' +
              'istisna kodu eşlenmemiş, tevkifat oranı taşınmıyor.\n\n' +
              'Sonuç: muhasebe temiz, e-fatura **reddediliyor**.\n\n' +
              '**Kural:** yeni vergi kodu açma sürecine ' +
              '*"e-belge alan eşlemesi yapıldı mı?"* adımı eklenmelidir — ' +
              'tıpkı {{konu:error-handling}}’de hesap ataması için söylendiği gibi.',
        ilgili:['OB40','EDOC_COCKPIT'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Tablo yapısı, konunun tezini **doğrudan görünür kılar**: ' +
      'muhasebe tarafı {{BKPF}}/{{BSEG}}, e-belge tarafı {{EDOCUMENT}}. ' +
      '**İki ayrı tablo, iki ayrı statü, iki ayrı kader.**',

    liste:[
      { ad:'EDOCUMENT', baslik:'E-belge başlığı — muhasebe belgesinin elektronik ikizi',
        tutar:'Her e-belgenin **statüsü** ve kaynak belgeye bağlantısı.',
        olusturan:'Fatura kaydı e-belge tetikleyicisini çalıştırdığında',
        anahtar:'**EDOC_GUID**',
        iliskiler:'`SOURCE_KEY` → {{BKPF}} veya {{VBRK}}. XML → `EDOCUMENTFILE`.',
        s4:'S/4HANA’da **DRC** çatısı altında; yapı korunur.',
        alanlar:[
          { ad:'EDOC_GUID', aciklama:'E-belge kimliği', tip:'pk' },
          { ad:'SOURCE_TYPE', aciklama:'FI faturası mı, SD faturası mı' },
          { ad:'SOURCE_KEY', aciklama:'⭐ **Muhasebe belgesine köprü** — iki tarafı bağlayan alan', tip:'fk' },
          { ad:'EDOC_TYPE', aciklama:'e-fatura / e-arşiv / e-irsaliye' },
          { ad:'EDOC_STATUS', aciklama:'⭐ **Statü** — hata ve **red** burada görünür' },
        ] },

      { ad:'EDOCUMENTFILE', baslik:'Gönderilen XML — uyuşmazlıkta tek kanıt',
        tutar:'{{ubl-tr}} XML’i ve GİB’den dönen **yanıt** dosyaları.',
        olusturan:'E-belge üretimi ve her yanıt alışı',
        anahtar:'EDOC_GUID + FILE_GUID',
        iliskiler:'{{EDOCUMENT}} başlığına bağlı.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'FILE_TYPE', aciklama:'Giden XML mi, **gelen yanıt** mı' },
          { ad:'FILE_RAW', aciklama:'⭐ **XML içeriği.** *"Ne gönderdik?"* ve *"red sebebi ne?"* — ikisinin de cevabı' },
        ] },

      { ad:'BKPF', baslik:'Muhasebe tarafı — e-belgeden **bağımsız**',
        tutar:'Belge başlığı. ⚠️ Burada **her şey yolunda** olabilir.',
        olusturan:'Fatura kaydı',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'{{EDOCUMENT}}.`SOURCE_KEY` buraya işaret eder.',
        s4:'Kalemler {{ACDOCA}}’da.',
        alanlar:[
          { ad:'BELNR', aciklama:'Belge numarası — ⚠️ **e-fatura numarasından farklıdır**', tip:'pk' },
          { ad:'XBLNR', aciklama:'Referans — e-fatura numarası genelde buraya yazılır' },
          { ad:'STBLG', aciklama:'⚠️ Ters kayıt. **Dolu olması e-belgenin iptal edildiği anlamına gelmez**' },
        ] },

      { ad:'BSET', baslik:'Vergi satırları — XML’in vergi bölümünün kaynağı',
        tutar:'Matrah, vergi tutarı, vergi kodu.',
        olusturan:'Vergi içeren her FI belgesi',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{ubl-tr}} XML’inin vergi bölümü buradan türetilir.',
        s4:'Duruyor.',
        alanlar:[
          { ad:'MWSKZ', aciklama:'⭐ Vergi kodu — **e-belge tipi ve istisna kodu bundan türetilir**' },
          { ad:'HWBAS / HWSTE', aciklama:'Matrah ve vergi tutarı — XML’e taşınan değerler' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'İki kol, tek kaynak — muhasebe ve e-belge ayrışması',
      varliklar:[
        { ad:'BKPF', rol:'Muhasebe', hub:true, aciklama:'**Kol 1** — burada her şey yolunda olabilir',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'XBLNR' }, { ad:'STBLG' }] },
        { ad:'BSET', rol:'Vergi', aciklama:'XML vergi bölümünün **kaynağı**',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'MWSKZ' }, { ad:'HWSTE' }] },
        { ad:'EDOCUMENT', rol:'E-belge', aciklama:'⭐ **Kol 2** — red ve hata **burada**',
          alanlar:[{ ad:'EDOC_GUID', tip:'pk' }, { ad:'SOURCE_KEY', tip:'fk' }, { ad:'EDOC_STATUS' }] },
        { ad:'EDOCUMENTFILE', rol:'XML', aciklama:'Gönderilen dosya — **hukuki kanıt**',
          alanlar:[{ ad:'EDOC_GUID', tip:'fk' }, { ad:'FILE_RAW' }] },
        { ad:'VBRK', rol:'SD faturası', aciklama:'SD kaynaklı e-belgelerde kaynak',
          alanlar:[{ ad:'VBELN', tip:'pk' }, { ad:'RFBSK' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'EDOCUMENT', alanlar:'SOURCE_KEY', not:'⭐ **iki kolu bağlayan tek alan**' },
        { from:'VBRK', to:'EDOCUMENT', alanlar:'SOURCE_KEY', not:'SD kaynaklı' },
        { from:'BKPF', to:'BSET', alanlar:'BELNR', not:'vergi satırları' },
        { from:'EDOCUMENT', to:'EDOCUMENTFILE', alanlar:'EDOC_GUID', not:'XML ve yanıtlar' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Günlük çalışmada üç ekran yeter: **{{EDOC_COCKPIT}}** (statü), ' +
      '**{{FB03}}/{{VF03}}** (kaynak belge) ve **{{FTXP}}** (vergi eşlemesi).',

    ekranlar:[
      { ad:'{{EDOC_COCKPIT}} — günlük rutin',
        aciklama:'E-belgenin gerçek durumunu gösteren tek ekran.',
        alanlar:[
          { ad:'Tarih aralığı', zorunlu:true, aciklama:'Günlük kontrolde dünden bugüne.' },
          { ad:'**Statü**', zorunlu:false, aciklama:'⭐ Önce **hata** ve **red** süzülür. Hedef: **0**.' },
          { ad:'E-belge tipi', zorunlu:false, aciklama:'e-fatura / e-arşiv / e-irsaliye.' },
          { ad:'Kaynak belge', zorunlu:false, aciklama:'{{FB03}} / {{VF03}}’e geçiş için.' },
        ],
        ipucu:'⭐ **Hedef basit: hata ve red statüsü = 0.**\n\n' +
              'Muhasebe kapanışı bu kontrolü kapsamaz — mizan denk olsa bile ' +
              'reddedilmiş faturalar birikmiş olabilir.\n\n' +
              '{{konu:error-handling}}’deki *"{{SLG1}} kırmızı = 0"* kuralının ' +
              'e-dönüşümdeki karşılığıdır ve aynı sebeple gereklidir: ' +
              '**sessiz hatalar ancak bakılırsa görünür.**' },

      { ad:'{{FB03}} / {{VF03}} — kaynak belge',
        aciklama:'Muhasebe tarafını görmek için. ⚠️ **E-belge hakkında bilgi vermez.**',
        alanlar:[
          { ad:'Belge numarası', zorunlu:true, aciklama:'⚠️ **E-fatura numarasından farklıdır.**' },
          { ad:'`XBLNR` Referans', zorunlu:false, aciklama:'E-fatura numarası genelde burada.' },
          { ad:'`STBLG`', zorunlu:false, aciklama:'⚠️ Ters kayıt — **e-belge iptali demek değildir**.' },
        ],
        ipucu:'⚠️ **Bu ekrana bakarak e-belge hakkında hüküm verme.**\n\n' +
              '{{FB03}} *"kaydettik mi?"* sorusunu cevaplar. ' +
              '*"Gönderebildik mi?"* sorusunun cevabı **{{EDOC_COCKPIT}}**’tedir.\n\n' +
              'Bu iki soruyu karıştırmak, bu konudaki hataların **çoğunun kaynağıdır**.' },

      { ad:'{{FTXP}} — vergi kodu ve e-belge eşlemesi',
        aciklama:'İstisna ve tevkifat redlerinin kaynağı.',
        alanlar:[
          { ad:'Vergi kodu', zorunlu:true, aciklama:'Muhasebe tarafı.' },
          { ad:'**İstisna kodu eşlemesi**', zorunlu:false, aciklama:'⚠️ Eksikse istisna faturası **reddedilir**.' },
          { ad:'**Tevkifat oranı**', zorunlu:false, aciklama:'XML’de ayrı alan; eksikse red.' },
        ],
        ipucu:'⭐ Bir vergi kodu **muhasebe açısından mükemmel**, ' +
              '**e-belge açısından eksik** olabilir.\n\n' +
              'Yeni vergi kodu açma sürecine ' +
              '*"e-belge alan eşlemesi yapıldı mı?"* adımı eklenmelidir.' },
    ],

    zorunlu:['Geçerli {{mali-muhur}}','Güncel {{mukellef-sorgulama}} listesi','Vergi kodu ↔ e-belge eşlemesi'],
    opsiyonel:['Entegratör portal erişimi','E-arşiv iptal yetkisi'],

    hatalar:[
      { mesaj:'Fatura kesildi ama {{EDOC_COCKPIT}}’te **hiç yok**', sebep:'E-belge tetikleyicisi çalışmamış.', cozum:'⚠️ **SAP tarafı** sorunu. E-belge tipi ataması, müşteri ana verisi ve belge türü eşlemesi kontrol edilir.' },
      { mesaj:'Statü **RED** — "alıcı e-fatura mükellefi değil"', sebep:'Yanlış belge tipi — {{mukellef-sorgulama}} listesi eski.', cozum:'Liste güncellenir; fatura doğru tiple yeniden kesilir. Bu konudaki **senaryonun** konusu.' },
      { mesaj:'Statü **RED** — "istisna kodu eksik"', sebep:'Vergi kodu ↔ istisna kodu eşlemesi yok.', cozum:'{{FTXP}}. ⚠️ Muhasebe doğru olsa bile bu **ayrı bir eşlemedir**.' },
      { mesaj:'Bir sabah **tüm gönderim durdu**', sebep:'{{mali-muhur}} sertifikası süresi dolmuş.', cozum:'Sertifika yenilenir. **Kalıcı önlem:** son kullanma tarihi takvime bağlanır.' },
      { mesaj:'Statü "gönderildi"de **takılı**', sebep:'Entegratörden yanıt dönmemiş.', cozum:'Entegratör portalı kontrol edilir — sorun **SAP dışındadır**.' },
      { mesaj:'{{FB08}} yaptım ama GİB’de fatura duruyor', sebep:'⚠️ **İptal asimetrisi.** Ters kayıt e-belge üretmez.', cozum:'{{e-fatura}} iptal edilemez — **iade faturası** kesilir. {{e-arsiv}} ise süre içinde iptal edilebilir.' },
      { mesaj:'KDV beyanı ile GİB e-fatura toplamı tutmuyor', sebep:'Reddedilen veya gönderilemeyen faturalar.', cozum:'{{EDOC_COCKPIT}}’te dönem taranır; muhasebede olup GİB’e gitmeyenler bulunur.' },
      { mesaj:'Berat alınmış döneme kayıt yapıldı', sebep:'{{OB52}} açık bırakılmış.', cozum:'⚠️ **Mevzuat sorunu.** Düzeltme sonraki döneme. Berat sonrası dönem {{OB52}}’de **kapatılmalıdır**.' },
    ],

    ipuclari:[
      '⭐ **{{EDOC_COCKPIT}} günlük açılır — hedef: hata ve red = 0.**',
      '⭐ {{FB03}} *"kaydettik mi?"*, {{EDOC_COCKPIT}} *"gönderebildik mi?"* — **farklı sorular**.',
      'Sorun giderirken ilk ayrım: **{{EDOCUMENT}} oluştu mu?** ' +
      'Oluşmadıysa SAP, oluştu ama gitmediyse entegratör.',
      'Red sebebi ekranda değil, `EDOCUMENTFILE`’daki **yanıt XML**’indedir.',
      'Yeniden gönderim yalnızca **geçici** hataları çözer — ' +
      '*"kod eksik / mükellef değil"* kalıcıdır, önce veri düzeltilir.',
      '{{mali-muhur}} son kullanma tarihini **takvime bağla** — ' +
      'yoksa bir sabah tüm gönderim durur.',
      '{{mukellef-sorgulama}} listesi **düzenli güncellenir**; ' +
      'eski liste = yanlış belge tipi = sessiz red.',
      '⚠️ {{berat}} alınan dönemi {{OB52}}’de **kapat** — ' +
      'artık muhasebe değil **mevzuat** meselesi.',
      'Yeni vergi kodu açarken *"e-belge alan eşlemesi yapıldı mı?"* diye sor.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'EDOCUMENT', ne:'E-belge başlığı ve **statüsü** — her yanıtta güncellenir' },
      { tablo:'EDOCUMENTFILE', ne:'Giden XML ve gelen yanıt dosyaları' },
      { tablo:'BKPF', ne:'Muhasebe belgesi — **e-belgeden bağımsız**' },
      { tablo:'BSET', ne:'Vergi satırları — XML vergi bölümünün kaynağı' },
    ],

    commit:
      '⚠️ **E-belge üretimi muhasebe LUW’unun içinde değildir.**\n\n' +
      'Bu, konunun teknik temelidir ve tezini açıklar:\n\n' +
      'Fatura muhasebeleşir ve **commit olur** — belge kesindir. ' +
      'E-belge üretimi ve gönderimi **sonrasında**, ayrı bir işlem olarak çalışır.\n\n' +
      'Sonuç: e-belge tarafı çökse bile **muhasebe belgesi geri alınmaz**. ' +
      'Bu **kasıtlı bir tasarımdır** — aksi hâlde entegratör kesintisi ' +
      'tüm faturalamayı durdururdu.\n\n' +
      'Ama bedeli şudur: **iki taraf ayrışabilir** ve sistem bunu ' +
      'hata olarak bildirmez.',

    belgeNo:
      '⚠️ **İki ayrı numara vardır ve karıştırılmamalıdır:**\n\n' +
      '**SAP belge numarası** — {{BKPF}}.`BELNR` · şirket kodu + yıl bazında · ' +
      '{{FBN1}} numara aralığından\n\n' +
      '**E-fatura numarası** — GİB formatında **16 karakter**: ' +
      '3 harflik seri öneki + 4 haneli yıl + 9 haneli sıra numarası. ' +
      'Kâğıt faturadaki matbaa serisinin karşılığıdır.\n\n' +
      'E-fatura numarası genelde {{BKPF}}.`XBLNR` (referans) alanına yazılır — ' +
      'böylece iki numara birbirine bağlanır.\n\n' +
      '⚠️ **Kesintisizlik zorunludur.** E-fatura serisinde boşluk olmamalıdır. ' +
      'Bu, {{guncelleme-hatasi}} nedeniyle numara yanmasının ' +
      'e-tarafta neden daha ciddi olduğunu açıklar.',

    postingLogic:
      'Fatura kaydından e-belgeye giden sıra:\n\n' +
      '**1.** Fatura muhasebeleşir → {{BKPF}} + {{BSEG}} + {{BSET}} · **commit**\n' +
      '**2.** E-belge tetikleyicisi çalışır → kaynak tipi ve belge türü kontrol edilir\n' +
      '**3.** {{EDOCUMENT}} kaydı açılır\n' +
      '**4.** {{mukellef-sorgulama}} → e-belge **tipi** belirlenir\n' +
      '**5.** {{ubl-tr}} XML üretilir — {{BSET}}’ten vergi, ana veriden taraf bilgileri\n' +
      '**6.** {{mali-muhur}} ile imzalanır\n' +
      '**7.** Entegratöre iletilir (çoğu kurulumda **add-on**)\n' +
      '**8.** Yanıt alınır → `EDOC_STATUS` güncellenir\n\n' +
      '⭐ **Teşhiste bu sıra doğrudan kullanılır:** hangi adımda durdu?\n' +
      '• 3. adım olmadıysa → **tetikleyici/eşleme** sorunu (SAP)\n' +
      '• 5. adımda hata → **veri/eşleme** sorunu (SAP)\n' +
      '• 7. adımda takılı → **entegratör** sorunu\n' +
      '• 8. adımda red → **mevzuat/veri** sorunu',

    belgeTuru:
      '{{belge-turu}} ile e-belge tipi arasında **eşleme** vardır: ' +
      'hangi fatura türünün e-belge üreteceği ve hangi tipte üreteceği ' +
      'yapılandırmayla belirlenir.\n\n' +
      '⚠️ **Sık atlanan durum:** yeni bir satış belge türü veya fatura türü ' +
      'açıldığında e-belge eşlemesi yapılmazsa, o türle kesilen faturalar ' +
      '**hiç e-belge üretmez**.\n\n' +
      'Belirtisi nettir ve tanınması kolaydır: fatura {{FB03}}’te **var**, ' +
      '{{EDOC_COCKPIT}}’te **hiç yok**. ' +
      'Red değil, **yokluk** — bu ayrım teşhisi hızlandırır.',

    numberRange:
      'E-fatura serisi SAP belge numara aralığından **ayrıdır** ve ' +
      'genelde entegratör add-on’unda veya ayrı bir aralıkta yönetilir.\n\n' +
      '⚠️ **Yıl geçişinde kontrol edilmelidir** — tıpkı {{FBN1}} gibi. ' +
      'Yeni yılın e-fatura serisi tanımlanmamışsa 1 Ocak’ta ' +
      'e-fatura kesilemez (muhasebe kaydı yapılabilir ama e-belge üretilemez).\n\n' +
      'Bu, {{konu:error-handling}}’de anlatılan yıl sonu numara aralığı ' +
      'kontrolünün **e-dönüşümdeki ikinci hâlidir** ve ' +
      'aynı kontrol listesine eklenmelidir.',

    accountDetermination:
      'E-dönüşüm hesap belirlemeyi **değiştirmez** — {{VKOA}} ve {{OB40}} ' +
      'aynı şekilde çalışır.\n\n' +
      'Ama ters yönde bir bağımlılık vardır: **vergi kodu**, hem hesap belirlemeyi ' +
      'hem de **e-belge alanlarını** besler.\n\n' +
      'Bu yüzden bir vergi kodu iki ayrı yerde eksik olabilir:\n' +
      '• {{OB40}}’ta hesap ataması yok → **muhasebe** hatası (konuşan)\n' +
      '• E-belge eşlemesi yok → **e-belge** reddi (sessiz)\n\n' +
      '⚠️ İlki kaydı **durdurur**, ikincisi durdurmaz. ' +
      'Bu asimetri, e-belge hatalarının neden geç fark edildiğini açıklar.',

    tur:
      'SAP’ın **eDocument Framework**’ü ülkeden bağımsız bir çatıdır; ' +
      'Türkiye’ye özgü kısım **yerelleştirme** ile gelir.\n\n' +
      'Üç katman vardır ve sorumluluk sınırı burada çizilir:\n\n' +
      '**1. Çerçeve (SAP standardı)** — {{EDOCUMENT}} yaşam döngüsü, statü yönetimi, ' +
      '{{EDOC_COCKPIT}}\n' +
      '**2. Yerelleştirme (SAP Türkiye)** — {{ubl-tr}} formatı, alan eşlemeleri\n' +
      '**3. Entegratör add-on’u (üçüncü taraf)** — GİB iletişimi, imzalama, saklama\n\n' +
      '⭐ **Danışman için pratik sonucu:** bir sorun geldiğinde ' +
      '**hangi katmanda** olduğu belirlenir. ' +
      'Üçüncü katman SAP desteği kapsamında **değildir** — ' +
      'entegratör firmasına gider.',

    transport:
      'E-dönüşüm yapılandırması **iki kaynaktan** gelir ve ikisi ayrı taşınır:\n\n' +
      '**SAP tarafı** — e-belge tipi tanımları, kaynak tipi eşlemeleri, ' +
      'vergi kodu ilişkileri → normal {{tasima-istegi}}\n\n' +
      '**Entegratör add-on’u** — kendi tabloları ve ayarları → ' +
      '⚠️ genelde **ayrı yönetilir**\n\n' +
      '**Klasik geçiş hatası:** SAP tarafı canlıya taşınır, ' +
      'entegratör ayarları unutulur. Sonuç: e-belge **oluşur** ama ' +
      '**gönderilemez** — ve bu, en zor teşhis edilen durumlardan biridir ' +
      'çünkü SAP tarafında her şey doğru görünür.',

    img:[
      { yol:'eDocument → Genel ayarlar → Kaynak tipi tanımlama', not:'Hangi belge e-belge üretecek' },
      { yol:'eDocument → E-belge tipi ataması', not:'⚠️ Yeni fatura türünde atlanırsa e-belge **hiç oluşmaz**' },
      { yol:'FTXP → Vergi kodu', not:'⚠️ İstisna ve tevkifat **e-belge eşlemesi**' },
      { yol:'OB52 → Dönem kapatma', not:'⚠️ {{berat}} alınan dönem **kapatılmalı**' },
      { yol:'Entegratör add-on ayarları', not:'⚠️ SAP IMG dışında; **ayrı taşınır**' },
    ],

    ekstra:[
      { ic:'🔀', baslik:'"Hata SAP’ta mı, entegratörde mi?" — tek soruyla ayrım', metin:
        'E-dönüşüm teşhisinde **en değerli tek soru** budur, çünkü ' +
        'cevabı aramanın yarısını eler.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Ayrım noktası: {{EDOCUMENT}} kaydı oluştu mu?**\n\n' +
        '**Oluşmadıysa → SAP tarafı**\n' +
        'Tetikleyici çalışmamış. Sebepler:\n' +
        '• Belge türü ↔ e-belge tipi eşlemesi eksik (yeni tür açılmış)\n' +
        '• Müşteri ana verisinde e-belge bilgisi yok\n' +
        '• Kaynak tipi tanımlanmamış\n\n' +
        '**Oluştu ama "gönderildi"de takılı → entegratör/iletişim**\n' +
        'SAP işini yapmış. Entegratör portalından kontrol edilir.\n\n' +
        '**Oluştu ve red geldi → veri/mevzuat**\n' +
        'İletişim çalışıyor, **içerik** yanlış. Red sebebi ' +
        '`EDOCUMENTFILE`’daki yanıt XML’inde.\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Belirtiyi tanımak:**\n\n' +
        '{{EDOC_COCKPIT}}’te belge **hiç yok** → SAP\n' +
        'Belge var, statü **hata/takılı** → entegratör\n' +
        'Belge var, statü **red** → veri\n\n' +
        'Bu üçlü, {{konu:error-handling}}’deki *"belirti → araç"* ' +
        'eşlemesinin e-dönüşümdeki hâlidir.' },

      { ic:'⚖️', baslik:'Neden iki taraf ayrışabiliyor? — tasarımın gerekçesi', metin:
        'Bir soru haklı olarak akla gelir: ' +
        '*"Madem e-belge zorunlu, neden SAP fatura kaydını e-belge başarılı olana ' +
        'kadar bekletmiyor?"*\n\n' +
        'Cevap, **bilinçli bir tasarım tercihidir**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Eğer bağlı olsaydı:** entegratör kesintisi, GİB bakımı veya ' +
        'ağ sorunu **tüm faturalamayı durdururdu**. ' +
        'Şirket satış yapamaz, mal sevk edemez hâle gelirdi.\n\n' +
        'Dış bir servisin erişilebilirliği, şirketin **muhasebe kaydı yapma ' +
        'yeteneğini** belirlemiş olurdu. Bu kabul edilemez.\n\n' +
        '**Ayrık olduğu için:** fatura kaydedilir, e-belge sonra gönderilir, ' +
        'kesinti geçince yeniden denenir. İş **durmaz**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '⚠️ **Ama bu esnekliğin bedeli vardır:** iki taraf ayrışabilir ve ' +
        'sistem bunu hata olarak bildirmez.\n\n' +
        '**Bedeli ödemenin yolu izlemedir.** Tasarım ayrık olduğu için ' +
        'kontrol **insana** kalır — ve bu, {{EDOC_COCKPIT}}’in neden ' +
        'günlük rutin olması gerektiğinin gerçek sebebidir.\n\n' +
        '**Genel mimari ders:** iki sistem gevşek bağlandığında ' +
        'dayanıklılık kazanılır, **tutarlılık garantisi kaybedilir**. ' +
        'Kaybedilen garanti bir **izleme yükümlülüğüne** dönüşür — ' +
        've bu yükümlülük üstlenilmezse, kazanılan dayanıklılık ' +
        'sessiz hatalara ödenmiş olur.' },
    ],

    notlar:[
      { tip:'warn', baslik:'{{FB08}} e-faturayı iptal etmez', metin:
        'Bu, e-dönüşümde yapılan **en pahalı yanlış varsayımdır**.\n\n' +
        'Kullanıcı hatalı faturayı görür, {{FB08}} ile ters kaydeder, ' +
        'muhasebe düzelir ve **konuyu kapatır**.\n\n' +
        '⚠️ **GİB tarafında fatura hâlâ geçerlidir.** ' +
        'Ters kayıt GİB’e giden bir belge **üretmez**.\n\n' +
        '**Doğru yol belge tipine göre değişir:**\n\n' +
        '**{{e-arsiv}}** → süre içinde **iptal edilebilir**\n' +
        '**{{e-fatura}}** → iptal edilemez → **iade faturası** kesilir ' +
        '(bu da bir e-belgedir ve GİB’e gider)\n' +
        '**{{ticari-fatura}} senaryosu** → alıcı süresi içinde reddedebilir\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Ayrışma nerede ortaya çıkar?** Genelde **KDV beyanında**: ' +
        'muhasebedeki hesaplanan KDV ile GİB’deki e-fatura toplamı **tutmaz**.\n\n' +
        'O noktada geriye dönük düzeltme çok daha pahalıdır — ' +
        'bu yüzden kural baştan bilinmelidir: ' +
        '**e-belge üretmiş bir faturada düzeltme her iki tarafta ayrı ayrı yapılır.**' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'S/4HANA’da eDocument çerçevesi **DRC** (Document and Reporting Compliance) ' +
      'adı altında toplandı. Mantık aynı; kapsam genişledi — ' +
      'e-belge **ve** yasal raporlama tek çatıda.',

    eccFarklari:[
      { konu:'Çerçeve adı', ecc:'eDocument Framework', s4:'**DRC** — Document and Reporting Compliance' },
      { konu:'Kapsam', ecc:'Yalnızca e-belge', s4:'E-belge **+ yasal raporlama** birlikte' },
      { konu:'{{EDOCUMENT}} tablosu', ecc:'Var', s4:'**Duruyor** — yapı korundu' },
      { konu:'İzleme ekranı', ecc:'{{EDOC_COCKPIT}}', s4:'Cockpit **duruyor** + Fiori uygulamaları' },
      { konu:'Vergi verisi', ecc:'{{BSET}} + {{BSEG}}', s4:'{{BSET}} duruyor; {{ACDOCA}} tutarı taşır' },
      { konu:'Bulut', ecc:'Yok', s4:'⭐ **Cloud edition** — GİB uyum güncellemeleri SAP tarafından' },
      { konu:'Entegratör add-on’u', ecc:'Gerekli', s4:'⚠️ **Hâlâ gerekli** — Türkiye’de yaygın model' },
    ],

    universalJournal:
      '{{evrensel-kayit-defteri}} e-dönüşümü **doğrudan değiştirmedi** — ' +
      'e-belge zaten ayrı bir nesneydi ve öyle kaldı.\n\n' +
      'Dolaylı bir fayda var: {{ACDOCA}} tek kaynak olduğu için ' +
      '*"muhasebede ne var?"* sorusu **tek sorguyla** cevaplanıyor. ' +
      'Bu, e-belge ile muhasebe arasındaki **mutabakatı kolaylaştırır**.\n\n' +
      '⚠️ Ama ayrışma sorununu **çözmez**: {{EDOCUMENT}} hâlâ ayrı bir tablodur ' +
      've hâlâ bağımsız olarak başarısız olabilir.\n\n' +
      'Yani {{konu:error-handling}}’de anlatılan *"FI/CO mutabakat sınıfı ortadan kalktı"* ' +
      'iyileşmesinin **e-dönüşümde bir karşılığı yoktur** — ' +
      'çünkü buradaki ikinci taraf SAP’ın **dışındadır**.',

    kalkanTcodes:[
      { eski:'{{EDOC_COCKPIT}}', yeni:'**Duruyor**', not:'+ Fiori izleme uygulamaları' },
      { eski:'—', yeni:'**DRC** çatısı', not:'E-belge ve yasal raporlama birleşti' },
      { eski:'—', yeni:'**Cloud edition**', not:'⭐ Mevzuat güncellemeleri SAP tarafından gelir' },
    ],

    fiori:[
      { ad:'eDocument Cockpit (Fiori)', aciklama:'{{EDOC_COCKPIT}} karşılığı — ' +
             'statü dağılımı **grafik** olarak; günlük kontrolü hızlandırır.' },
      { ad:'Manage Electronic Documents', aciklama:'Belge bazında statü, ' +
             'yeniden gönderim ve XML görüntüleme.' },
      { ad:'Statistics for Electronic Documents', aciklama:'Dönemsel red/hata oranı — ' +
             '⭐ *"bu ay kaç fatura reddedildi?"* sorusunun ekranı.' },
      { ad:'Manage Journal Entries', aciklama:'Kaynak muhasebe belgesine geçiş.' },
    ],

    compatibilityViews:[
      '{{EDOCUMENT}} ve `EDOCUMENTFILE` **gerçek tablodur** — görünüm değil.',
      'Özel e-belge raporları {{uyumluluk-view}}’dan **etkilenmez**.',
      '⚠️ Ama vergi verisini {{BSEG}}’den okuyan eski özel raporlar etkilenir — ' +
      '`SHKZG` işaret mantığı ({{konu:sap-tables}}).',
    ],

    performans:
      'E-belge üretimi **asenkron** olduğu için fatura kaydını yavaşlatmaz.\n\n' +
      '⚠️ Darboğaz genelde **entegratör tarafındadır**: yoğun dönemlerde ' +
      '(ay sonu, kampanya) gönderim kuyruğu birikir.\n\n' +
      'Belirtisi: {{EDOC_COCKPIT}}’te *"gönderildi"* statüsünde **çok sayıda** belge ' +
      've yanıt gecikmesi.\n\n' +
      'Bu bir SAP performans sorunu **değildir** — kapasite planlaması ' +
      'entegratörle konuşulur. Yanlış yerde optimizasyon yapmamak için ' +
      'bu ayrım önemlidir.',

    bestPractices:[
      '⭐ **{{EDOC_COCKPIT}} kontrolünü ay sonu kapanış listesine ekle** — ' +
      'muhasebe kapanışı bunu kapsamıyor.',
      '{{mukellef-sorgulama}} listesini **düzenli güncelle**; ' +
      'güncelleme sıklığını süreç olarak tanımla.',
      '⚠️ {{mali-muhur}} son kullanma tarihini **takvime bağla** — ' +
      'yenilenmezse bir sabah tüm gönderim durur.',
      'Yeni **fatura türü** veya **vergi kodu** açma sürecine ' +
      '*"e-belge eşlemesi yapıldı mı?"* adımı ekle.',
      'Yıl geçişinde **e-fatura serisini** de kontrol et — {{FBN1}} yanında.',
      '{{berat}} alınan dönemi {{OB52}}’de **kapat ve kapalı tut**.',
      '⚠️ Geçişte **entegratör ayarlarının ayrı taşındığını** unutma — ' +
      'SAP tarafı doğru görünürken gönderim çalışmayabilir.',
      'Aylık **mutabakat**: muhasebedeki hesaplanan KDV ile ' +
      'GİB’e giden e-fatura toplamı karşılaştırılır.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'"Müşteri ödemiyor" — aslında faturayı hiç almamıştı',
    hikaye:
      '**Ege Plastik A.Ş.**’de tahsilat toplantısı. 90 günü geçmiş alacaklar ' +
      'gözden geçiriliyor ve bir müşteri dikkat çekiyor: **Marmara Ambalaj**.\n\n' +
      'Cari hesapta **4 fatura**, toplam **687.000 TRY**, hepsi vadesi geçmiş.\n\n' +
      'Satış temsilcisi: *"Aradım, muhasebeleri böyle bir fatura olmadığını söylüyor. ' +
      'Oyalıyorlar herhâlde."*\n\n' +
      'Muhasebe müdürü {{FB03}}’te faturaları açıyor — **hepsi yerinde**. ' +
      '{{FBL5N}}’de cari hesap **doğru**. Mizan **denk**.\n\n' +
      '━━━━━━━━━━\n\n' +
      'Danışman tek soru soruyor: **"E-belge statüsüne baktınız mı?"**\n\n' +
      'Bakılmamış. Kimsenin aklına gelmemiş — çünkü muhasebe tarafında ' +
      '**hiçbir sorun yok**.',
    veriler:[
      { k:'Müşteri', v:'Marmara Ambalaj — 4 fatura' },
      { k:'Tutar', v:'**687.000 TRY** · hepsi 90 gün+ vadesi geçmiş' },
      { k:'{{FB03}}', v:'Faturalar **var** ✓' },
      { k:'{{FBL5N}}', v:'Cari hesap borcu **doğru** ✓' },
      { k:'Müşterinin iddiası', v:'*"Böyle bir fatura yok"*' },
      { k:'Bakılmayan yer', v:'⚠️ **{{EDOC_COCKPIT}}**' },
    ],

    adimlar:[
      { baslik:'E-belge statüsü — muhasebenin göstermediği taraf', tcode:'EDOC_COCKPIT',
        aciklama:'İlk kez bu ekrana bakılıyor.',
        girdi:[
          { alan:'Süzgeç', deger:'Müşteri Marmara Ambalaj · son 6 ay' },
          { alan:'4 faturanın statüsü', deger:'🚫 **RED**' },
          { alan:'Red sebebi', deger:'*"Alıcı e-fatura mükellefidir"*' },
          { alan:'Kesilen tip', deger:'**{{e-arsiv}}** — yanlış' },
        ],
        not:'**Müşteri doğru söylüyordu.**\n\n' +
             'Faturalar {{e-arsiv}} olarak kesilmiş, ' +
             '{{gib}} *"bu alıcı e-fatura mükellefi, e-arşiv kabul edilmez"* ' +
             'diyerek **reddetmiş**.\n\n' +
             'Reddedilen e-arşiv fatura alıcıya **hiç ulaşmaz**. ' +
             'Marmara Ambalaj’ın kayıtlarında böyle bir fatura **yok** — ' +
             'çünkü gerçekten yok.\n\n' +
             '⚠️ Ve SAP bu durumda **hiçbir uyarı vermemişti**: ' +
             'muhasebe belgesi başarıyla oluşmuştu.' },

      { baslik:'Neden yanlış tip seçildi?', tcode:'SE16N',
        aciklama:'Belge tipi kararının kaynağı inceleniyor.',
        girdi:[
          { alan:'Müşteri ana verisi', deger:'E-belge tipi = **e-arşiv**' },
          { alan:'Son güncelleme', deger:'{{CDHDR}} → **14 ay önce**' },
          { alan:'GİB mükellef listesi', deger:'Marmara Ambalaj **kayıtlı** — 8 ay önce eklenmiş' },
          { alan:'Sistemdeki liste', deger:'⚠️ **11 ay önce** güncellenmiş' },
        ],
        not:'**Kök sebep bulundu.**\n\n' +
             'Marmara Ambalaj 8 ay önce e-fatura mükellefi olmuş. ' +
             'Sistemdeki {{mukellef-sorgulama}} listesi ise **11 ay önce** güncellenmiş.\n\n' +
             'Yani liste, müşterinin mükellef olmasından **önceki** durumu gösteriyor.\n\n' +
             '⚠️ **Bu bir yazılım hatası değil, bir süreç eksikliğidir:** ' +
             'liste güncelleme **kimsenin görevi değildi**. ' +
             'İlk kurulumda yüklenmiş ve unutulmuş.' },

      { baslik:'Kapsam ne kadar? — tek müşteri mi?', tcode:'EDOC_COCKPIT',
        aciklama:'Aynı sınıf hata taranıyor.',
        girdi:[
          { alan:'Tarama', deger:'Son 12 ay · statü **RED**' },
          { alan:'Sonuç', deger:'⚠️ **63 fatura** · **11 farklı müşteri**' },
          { alan:'Toplam tutar', deger:'**2.940.000 TRY**' },
          { alan:'En eski', deger:'**9 ay önce** — hiç fark edilmemiş' },
        ],
        not:'⚠️ **Sorun tek müşteride değildi.**\n\n' +
             '11 müşteri e-fatura mükellefi olmuş, sistem hepsine ' +
             'hâlâ {{e-arsiv}} kesiyordu. 63 fatura, 9 aydır reddediliyordu.\n\n' +
             '**Hiçbiri fark edilmemişti** çünkü:\n' +
             '• Muhasebe tarafı sorunsuzdu\n' +
             '• Kapanış listesinde e-belge kontrolü **yoktu**\n' +
             '• {{EDOC_COCKPIT}} kimsenin günlük rutininde **değildi**\n\n' +
             'Bu, {{konu:error-handling}}’deki **② sessiz hata** sınıfının ' +
             'ders kitabı örneğidir.' },

      { baslik:'Neden tahsilat toplantısına kadar çıkmadı?', tcode:'FBL5N',
        aciklama:'Mevcut kontrollerin neden yakalamadığı inceleniyor.',
        girdi:[
          { alan:'Ay sonu kapanışı', deger:'Sorunsuz — mizan denk ✓' },
          { alan:'{{F150}} ihtar', deger:'Çalışmış — ihtarlar gönderilmiş' },
          { alan:'⚠️ İhtar sonucu', deger:'Müşteriler *"fatura yok"* demiş, **kayda geçmemiş**' },
          { alan:'KDV beyanı', deger:'Muhasebeden üretilmiş — **fark görülmemiş**' },
        ],
        not:'**Üç kontrol de sorunu kaçırdı ve her biri kendi açısından haklıydı.**\n\n' +
             '**Kapanış** muhasebeye bakar — muhasebe doğruydu.\n' +
             '**İhtar** vadesi geçen kalemi bulur — kalem gerçekten vadesi geçmişti.\n' +
             '**KDV beyanı** muhasebeden üretilir — muhasebe tutarlıydı.\n\n' +
             '⚠️ **Hiçbiri "bu fatura karşı tarafa ulaştı mı?" sorusunu sormuyordu.**\n\n' +
             'Müşteriler ihtara *"fatura yok"* diye cevap vermiş ama ' +
             'bu cevaplar **kayda geçmemiş** — satış temsilcileri ' +
             'bunu bir *"oyalama"* olarak yorumlamış.\n\n' +
             'Sinyal **vardı**; okunamamıştı.' },

      { baslik:'Düzeltme — 63 fatura için iki adım', tcode:'EDOC_COCKPIT',
        aciklama:'Önce ana veri, sonra faturaların yeniden düzenlenmesi.',
        girdi:[
          { alan:'① Mükellef listesi', deger:'GİB’den **güncel** liste yüklendi' },
          { alan:'② Ana veri', deger:'11 müşterinin e-belge tipi → **e-fatura**' },
          { alan:'③ Reddedilen faturalar', deger:'⚠️ **Yeniden gönderilemez** — tip yanlıştı' },
          { alan:'④ Çözüm', deger:'İptal + **doğru tiple yeniden düzenleme**' },
          { alan:'⑤ Doğrulama', deger:'{{EDOC_COCKPIT}} → red **0** ✓' },
        ],
        fis:{ baslik:'Yeniden düzenlenen faturalardan biri', belgeTuru:'RV', tarih:'28.11.2027',
          satirlar:[
            { hesap:'120', ad:'Alıcılar — Marmara Ambalaj', borc:187000 },
            { hesap:'600', ad:'Yurt içi satışlar', alacak:155833.33 },
            { hesap:'391', ad:'Hesaplanan KDV %20', alacak:31166.67 },
          ], not:'Muhasebe kaydı **orijinaliyle aynı** — değişen yalnızca ' +
                 'e-belge tipi ve fatura tarihi.\n\n' +
                 '⚠️ Ama vade **yeniden başladı**: 9 aylık gecikme ' +
                 'tahsilat açısından **geri kazanılamadı**.\n\n' +
                 'Bu, sessiz hatanın gerçek maliyetidir — ' +
                 'muhasebe düzeltilebilir, **geçen zaman düzeltilemez**.' },
        tabloEtkisi:[
          { tablo:'EDOCUMENT', ne:'Yeni kayıtlar — tip **e-fatura**, statü kabul' },
          { tablo:'BKPF', ne:'İptal + yeni belgeler' },
          { tablo:'KNB1', ne:'11 müşterinin e-belge tipi güncellendi' },
        ],
        not:'⚠️ **Reddedilen fatura yeniden gönderilemedi.** ' +
             '{{EDOC_RESUBMIT}} yalnızca **geçici** hataları çözer; ' +
             'burada hata **kalıcıydı** — belge tipi yanlıştı.\n\n' +
             'Doğru yol: mevcut belgeleri iptal edip ' +
             '**doğru tiple yeniden düzenlemek**.' },

      { baslik:'Kalıcı önlemler', tcode:'EDOC_COCKPIT',
        aciklama:'Beş önlem — kontrol, süreç, izleme, sinyal ve mutabakat.',
        girdi:[
          { alan:'① Günlük kontrol', deger:'{{EDOC_COCKPIT}} → **hata ve red = 0** · sabah rutini' },
          { alan:'② Kapanış listesi', deger:'Ay sonu adımlarına **"e-belge statüsü temiz mi?"** eklendi' },
          { alan:'③ Süreç sahibi', deger:'{{mukellef-sorgulama}} listesi güncelleme **aylık görev** olarak atandı' },
          { alan:'④ Sinyal', deger:'⭐ İhtar yanıtı *"fatura yok"* → **e-belge kontrolü tetikler**' },
          { alan:'⑤ Mutabakat', deger:'Aylık: muhasebe hesaplanan KDV ↔ GİB e-fatura toplamı' },
        ],
        not:'**Dördüncü önlem en ilginç olanıdır.**\n\n' +
             'Sinyal **zaten vardı**: müşteriler aylardır *"fatura yok"* diyordu. ' +
             'Ama bu cevap bir **veri** olarak görülmüyor, ' +
             'bir **bahane** olarak yorumlanıyordu.\n\n' +
             'Yeni kural basit: ihtar veya tahsilat görüşmesinde ' +
             '*"böyle bir fatura yok"* cevabı gelirse, ' +
             'satış temsilcisi bunu **e-belge kontrolü talebi** olarak iletir.\n\n' +
             '━━━━━━━━━━\n\n' +
             '**Beşinci önlem en güvenilir olanıdır.** ' +
             'Diğerleri insan disiplinine bağlı; mutabakat ise ' +
             '**sayısal ve kaçınılmazdır**: muhasebedeki hesaplanan KDV ile ' +
             'GİB’e giden e-fatura toplamı tutmuyorsa **bir şey eksiktir**.' },
    ],

    sonuc:
      '**Muhasebe kusursuzdu, faturalar 9 aydır karşı tarafa hiç ulaşmıyordu.**\n\n' +
      '**Beş kritik ders:**\n\n' +
      '**1. Muhasebe belgesi ile e-belge iki ayrı nesnedir.** ' +
      '{{FB03}}’te fatura görmek, {{FBL5N}}’de borç görmek, mizanın denk olması — ' +
      'hiçbiri e-belgenin karşı tarafa ulaştığını **göstermez**. ' +
      '{{FB03}} *"kaydettik mi?"*, {{EDOC_COCKPIT}} *"gönderebildik mi?"* sorusunu cevaplar. ' +
      'Bu iki soruyu karıştırmak, bu vakanın **tek sebebidir**.\n\n' +
      '**2. Belge tipi kullanıcının tercihi değildir.** ' +
      '{{e-fatura}} mı {{e-arsiv}} mi olacağı **alıcının mükellefiyet durumuna** bağlıdır. ' +
      'Karar {{mukellef-sorgulama}} listesinden gelir — ve **liste eskirse karar yanlış olur**. ' +
      'Liste güncelleme bir **süreç sahibi** gerektirir; kimsenin görevi değilse yapılmaz.\n\n' +
      '**3. Muhasebe kapanışı e-belge kontrolünü kapsamaz.** ' +
      'Kapanış, ihtar ve KDV beyanı — üçü de sorunu kaçırdı ve **üçü de kendi açısından haklıydı**. ' +
      'Hiçbiri *"bu fatura karşı tarafa ulaştı mı?"* sorusunu sormuyordu. ' +
      'Bu soru **ayrı bir kontrol** ister.\n\n' +
      '**4. Sinyal vardı, okunamadı.** ' +
      'Müşteriler aylardır *"fatura yok"* diyordu. Bu cevap bir **veri** değil, ' +
      'bir **bahane** olarak yorumlandı. ' +
      'Sessiz hatalarda sinyal genelde vardır — ama beklenmedik bir yerden ve ' +
      'beklenmedik bir dille gelir.\n\n' +
      '**5. Muhasebe düzeltilebilir, geçen zaman düzeltilemez.** ' +
      'Faturalar doğru tiple yeniden düzenlendi ve muhasebe orijinaliyle aynı oldu. ' +
      'Ama **vade yeniden başladı**: 9 aylık tahsilat gecikmesi geri kazanılamadı. ' +
      'Bu, {{konu:error-handling}}’de anlatılan *"düzeltme maliyeti zamanla artar"* ' +
      'ilkesinin en somut hâlidir.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '⭐ **Ana tez:** muhasebe belgesi ({{BKPF}}) ile e-belge ({{EDOCUMENT}}) ' +
      '**iki ayrı nesnedir** ve **bağımsız** başarısız olabilir.',
      '{{FB03}} *"kaydettik mi?"*, {{EDOC_COCKPIT}} *"gönderebildik mi?"* — **farklı sorular**.',
      '**{{e-fatura}} mı {{e-arsiv}} mi**, kullanıcının tercihi değil — ' +
      '**alıcının mükellefiyet durumu** belirler ({{mukellef-sorgulama}}).',
      '**İptal asimetrisi:** e-arşiv süre içinde iptal edilebilir; ' +
      'e-fatura **edilemez** → **iade faturası**.',
      '⚠️ **{{FB08}} e-faturayı iptal etmez** — muhasebe düzelir, GİB tarafı **kalır**.',
      'Faturanın hukuki hâli **{{ubl-tr}} XML**’dir — ekran veya PDF değil.',
      '**Teşhis ayrımı:** {{EDOCUMENT}} oluştu mu? Oluşmadıysa **SAP**, ' +
      'oluştu ama gitmediyse **entegratör**, red geldiyse **veri**.',
      '{{berat}} alınan dönem **yasal olarak** kesinleşir — {{OB52}} artık mevzuat meselesi.',
      '⭐ **{{EDOC_COCKPIT}} günlük rutin olmalı** — muhasebe kapanışı bunu kapsamaz.',
    ],

    onemliNoktalar:[
      '**"Fatura SAP’ta başarıyla kaydedildi. E-fatura süreci de başarılı mıdır?"** ⭐ **Hayır — bu iki ayrı sorudur.** {{BKPF}}’te belge oluşması {{EDOCUMENT}} statüsü hakkında **hiçbir şey söylemez**. E-belge üretimi muhasebe LUW’unun **dışında**, asenkron çalışır. Bu **kasıtlı bir tasarımdır**: aksi hâlde entegratör kesintisi tüm faturalamayı durdururdu. Bedeli, iki tarafın ayrışabilmesidir.',
      '**"e-Fatura ile e-Arşiv arasındaki fark nedir, hangisini seçersin?"** Seçim **yoktur** — alıcı e-fatura sistemine **kayıtlıysa** {{e-fatura}} zorunludur, kayıtsızsa {{e-arsiv}} kesilir. Karar {{mukellef-sorgulama}} listesinden gelir. Farkları: e-fatura GİB üzerinden **iletilir** ve **iptal edilemez**; e-arşiv **raporlanır**, alıcıya ayrıca gönderilir ve süre içinde **iptal edilebilir**.',
      '**"Hatalı e-fatura kesildi, nasıl düzeltilir?"** ⚠️ **{{FB08}} yeterli değildir.** Ters kayıt muhasebeyi düzeltir ama GİB tarafındaki fatura **yerinde kalır** — ters kayıt GİB’e giden belge üretmez. Doğru yol: {{e-arsiv}} ise süre içinde **iptal**; {{e-fatura}} ise **iade faturası** (bu da bir e-belgedir ve GİB’e gider). Ayrışma genelde **KDV beyanında** ortaya çıkar.',
      '**"E-fatura gitmiyor. Nereden başlarsın?"** ⭐ **Tek soruyla ikiye böl: {{EDOCUMENT}} kaydı oluştu mu?** **Oluşmadıysa** → SAP tarafı (belge türü ↔ e-belge tipi eşlemesi, müşteri ana verisi, kaynak tipi). **Oluştu ama "gönderildi"de takılı** → entegratör/iletişim. **Oluştu ve red geldi** → veri/mevzuat; red sebebi `EDOCUMENTFILE`’daki **yanıt XML**’inde.',
      '**"İstisna faturası reddediliyor ama vergi kodu doğru. Neden?"** Vergi kodu **iki ayrı yeri** besler: {{OB40}} hesap ataması (muhasebe) ve **e-belge alan eşlemesi** (istisna kodu, tevkifat oranı). Birincisi eksikse kayıt **durur** — konuşan hata. İkincisi eksikse kayıt **geçer**, e-belge **reddedilir** — sessiz hata. Bu asimetri, e-belge hatalarının neden geç fark edildiğini açıklar.',
      '**"Neden SAP faturayı e-belge başarılı olana kadar bekletmiyor?"** Bilinçli tasarım. Bağlı olsaydı entegratör kesintisi, GİB bakımı veya ağ sorunu **tüm faturalamayı durdururdu** — dış bir servisin erişilebilirliği şirketin muhasebe yapma yeteneğini belirlerdi. Gevşek bağlantı **dayanıklılık kazandırır**, **tutarlılık garantisini kaybettirir** — ve kaybedilen garanti bir **izleme yükümlülüğüne** dönüşür.',
      '**"{{e-defter}} beratı alınan döneme kayıt yapılabilir mi?"** {{OB52}} ile **teknik olarak** açabilirsin — ama yapmamalısın. Berat alınan dönem **yasal olarak kesinleşir**; kayıt yaparsan defter ile SAP **ayrışır** ve bu bir **mevzuat sorunudur**. Türkiye’de dönem disiplininin neden daha katı olduğunun gerekçesi budur. Düzeltme **sonraki döneme** kaydedilir.',
      '**"Bir sabah hiçbir e-fatura gitmiyor. İlk bakacağın yer?"** **{{mali-muhur}} sertifikası.** Süresi dolmuşsa imzalama başarısız olur ve **tüm gönderim durur**. Belirti tipiktir: dün çalışıyordu, bugün **hiçbiri** gitmiyor — tek tek değil, **toptan** durma. Kalıcı önlem: son kullanma tarihi **takvime bağlanır**.',
    ],

    sikHatalar:[
      { hata:'{{FB03}}’te faturayı görüp *"her şey yolunda"* demek.', dogru:'⭐ Muhasebe belgesi ile e-belge **ayrı nesnelerdir**. {{EDOC_COCKPIT}} ayrıca kontrol edilir.' },
      { hata:'{{FB08}} ile e-faturayı iptal ettiğini sanmak.', dogru:'⚠️ Ters kayıt GİB’e belge **göndermez**. e-Fatura iptal edilemez — **iade faturası** kesilir.' },
      { hata:'E-fatura / e-arşiv seçimini kullanıcıya bırakmak.', dogru:'Bu bir tercih değil, **alıcının mükellefiyet durumunun** sonucudur. {{mukellef-sorgulama}} belirler.' },
      { hata:'{{mukellef-sorgulama}} listesini bir kez yükleyip unutmak.', dogru:'Liste **sürekli değişir**. Güncelleme bir **süreç sahibi** gerektirir; kimsenin görevi değilse yapılmaz.' },
      { hata:'Her hatada {{EDOC_RESUBMIT}} çalıştırmak.', dogru:'Yeniden gönderim yalnızca **geçici** hataları çözer. *"Kod eksik / mükellef değil"* **kalıcıdır** — önce veri düzeltilir.' },
      { hata:'Muhasebe kapanışını yeterli saymak.', dogru:'⭐ Kapanış e-belge statüsünü **kapsamaz**. Ay sonu listesine *"e-belge temiz mi?"* eklenir.' },
      { hata:'Red sebebini ekranda aramak.', dogru:'Sebep `EDOCUMENTFILE`’daki **gelen yanıt XML**’indedir.' },
      { hata:'Sorunu doğrudan entegratöre yönlendirmek.', dogru:'Önce **{{EDOCUMENT}} oluştu mu?** diye bak. Oluşmadıysa sorun **SAP’tadır**.' },
      { hata:'{{mali-muhur}} son kullanma tarihini takip etmemek.', dogru:'Yenilenmezse bir sabah **tüm gönderim durur**. Takvime bağlanır.' },
      { hata:'Yeni vergi kodu açıp e-belge eşlemesini atlamak.', dogru:'Muhasebe doğru çalışır, e-fatura **reddedilir**. Süreç listesine adım eklenir.' },
      { hata:'{{berat}} alınan dönemi açık bırakmak.', dogru:'⚠️ Artık muhasebe değil **mevzuat** meselesi. {{OB52}}’de kapatılır ve kapalı tutulur.' },
      { hata:'Müşterinin *"fatura yok"* demesini bahane saymak.', dogru:'⭐ Bu bir **sinyaldir**. E-belge kontrolünü tetiklemelidir.' },
    ],

    ipuclari:[
      '⭐ **{{EDOC_COCKPIT}} her sabah açılır — hedef: hata ve red = 0.**',
      '⭐ Teşhiste ilk soru: **{{EDOCUMENT}} oluştu mu?** SAP / entegratör ayrımını bu yapar.',
      'Belirti okuma: cockpit’te **hiç yok** → SAP · **takılı** → entegratör · **red** → veri.',
      'Red sebebi için `EDOCUMENTFILE`’daki **yanıt XML**’ini oku.',
      'Hata metni *"zaman aşımı / bağlantı"* → geçici · ' +
      '*"kod / geçersiz / mükellef"* → **kalıcı**, önce veriyi düzelt.',
      '{{mali-muhur}} ve **e-fatura serisi** yıl/tarih kontrollerini takvime bağla.',
      'Yeni fatura türü veya vergi kodu → *"e-belge eşlemesi yapıldı mı?"*',
      'Aylık mutabakat: **hesaplanan KDV ↔ GİB e-fatura toplamı**. ' +
      'En güvenilir kontrol budur — insan disiplinine bağlı değil, **sayısaldır**.',
      '{{berat}} sonrası dönemi {{OB52}}’de kapat.',
    ],

    quiz:[
      { soru:'Fatura SAP’ta başarıyla kaydedildi. E-fatura süreci de başarılı mıdır?',
        secenekler:[
          'Evet — kayıt başarılıysa e-fatura da gitmiştir',
          '**Hayır — muhasebe belgesi ve e-belge ayrı nesnelerdir, bağımsız başarısız olabilirler**',
          'Sadece SD faturalarında ayrıdır',
          'S/4HANA’da birleştiler, artık aynıdır',
        ], dogru:1,
        aciklama:'⭐ **Bu konunun tezi.** Fatura kaydı iki kol üretir:\n\n' +
                 '**Kol 1:** {{BKPF}} + {{BSEG}} — muhasebe\n' +
                 '**Kol 2:** {{EDOCUMENT}} — e-belge\n\n' +
                 'E-belge üretimi muhasebe LUW’unun **dışında**, asenkron çalışır. ' +
                 'Muhasebe commit olur; e-belge sonra üretilir ve gönderilir.\n\n' +
                 'Sonuç: fatura mizanda görünürken e-belge **reddedilmiş** olabilir — ' +
                 've sistem hata **vermez**, çünkü muhasebe açısından sorun yoktur.' },

      { soru:'Hatalı bir e-fatura kesildi. {{FB08}} ile ters kayıt yeterli midir?',
        secenekler:[
          'Evet, ters kayıt her şeyi düzeltir',
          '**Hayır — muhasebe düzelir ama GİB’deki e-fatura yerinde kalır; iade faturası gerekir**',
          'Evet, ama dönem açık olmalı',
          'Hayır, e-fatura hiç düzeltilemez',
        ], dogru:1,
        aciklama:'⚠️ **İptal asimetrisi** — e-dönüşümdeki en pahalı yanlış varsayım.\n\n' +
                 '{{FB08}} muhasebeyi düzeltir ama **GİB’e giden bir belge üretmez**. ' +
                 'E-fatura GİB tarafında **geçerli kalır** ve iki taraf **ayrışır**.\n\n' +
                 '**Doğru yol belge tipine göre:**\n' +
                 '• {{e-arsiv}} → süre içinde **iptal edilebilir**\n' +
                 '• {{e-fatura}} → iptal edilemez → **iade faturası** (bu da GİB’e gider)\n\n' +
                 'Ayrışma genelde **KDV beyanında** ortaya çıkar: muhasebedeki ' +
                 'hesaplanan KDV ile GİB e-fatura toplamı tutmaz.' },

      { soru:'Bir fatura {{e-fatura}} mi {{e-arsiv}} mi olacak — bunu ne belirler?',
        secenekler:[
          'Kullanıcının fatura ekranındaki seçimi',
          'Fatura tutarı',
          '**Alıcının e-fatura sistemine kayıtlı olup olmadığı**',
          'Satış belge türü',
        ], dogru:2,
        aciklama:'Bu **bir tercih değildir**. Tek soruya bağlıdır: ' +
                 '*"Alıcı e-fatura sistemine kayıtlı mı?"*\n\n' +
                 '**Kayıtlı** → {{e-fatura}} **zorunlu**\n' +
                 '**Kayıtsız** → {{e-arsiv}}\n\n' +
                 'Kararı {{mukellef-sorgulama}} listesi verir.\n\n' +
                 '⚠️ **Liste sürekli değişir** — yeni mükellefler eklenir. ' +
                 'Sistemdeki kopya eskirse, artık e-fatura mükellefi olmuş bir müşteriye ' +
                 'e-arşiv kesilir ve {{gib}} **sessizce reddeder**. ' +
                 'Bu, bu konudaki senaryonun tam olarak konusudur.' },

      { soru:'E-fatura gitmiyor. Sorunun SAP’ta mı entegratörde mi olduğunu ayıran tek soru nedir?',
        secenekler:[
          'Fatura mizanda görünüyor mu?',
          '**{{EDOCUMENT}} kaydı oluştu mu?**',
          'Müşteri faturayı aldı mı?',
          'Dönem açık mı?',
        ], dogru:1,
        aciklama:'⭐ **Teşhisin yarısını eleyen soru.**\n\n' +
                 '**Oluşmadıysa → SAP tarafı.** Tetikleyici çalışmamış: ' +
                 'belge türü ↔ e-belge tipi eşlemesi eksik, müşteri ana verisi ' +
                 'veya kaynak tipi tanımı eksik.\n\n' +
                 '**Oluştu ama "gönderildi"de takılı → entegratör/iletişim.** ' +
                 'SAP işini yapmış.\n\n' +
                 '**Oluştu ve red geldi → veri/mevzuat.** ' +
                 'İletişim çalışıyor, **içerik** yanlış.\n\n' +
                 'Belirti okuması: cockpit’te **hiç yok** / **takılı** / **red** — ' +
                 'üçü üç farklı yere işaret eder.' },

      { soru:'İstisna faturası reddediliyor ama {{FTXP}}’de vergi kodu doğru görünüyor. Neden?',
        secenekler:[
          'GİB sistemi arızalı',
          'Dönem kapalı',
          '**Vergi kodu ile istisna kodu e-belge eşlemesi yapılmamış**',
          'Müşteri e-fatura mükellefi değil',
        ], dogru:2,
        aciklama:'Bir vergi kodu **iki ayrı yeri** besler:\n\n' +
                 '**1. Muhasebe** — {{OB40}} hesap ataması, oran, {{BSET}} kaydı\n' +
                 '**2. E-belge** — istisna kodu, tevkifat oranı, fatura tipi\n\n' +
                 'Bunlar **ayrı eşlemelerdir**. Birincisi mükemmel çalışırken ' +
                 'ikincisi eksik olabilir.\n\n' +
                 '⚠️ **Asimetri kritiktir:** hesap ataması eksikse kayıt **durur** ' +
                 '(konuşan hata). E-belge eşlemesi eksikse kayıt **geçer**, ' +
                 'e-belge **reddedilir** (sessiz hata).\n\n' +
                 'Bu yüzden yeni vergi kodu açma sürecine ' +
                 '*"e-belge eşlemesi yapıldı mı?"* adımı eklenir.' },

      { soru:'Neden SAP, fatura kaydını e-belge başarılı olana kadar bekletmiyor?',
        secenekler:[
          'Teknik bir kısıt',
          'SAP’ın gözden kaçırdığı bir eksiklik',
          '**Bilinçli tasarım — aksi hâlde entegratör kesintisi tüm faturalamayı durdururdu**',
          'Mevzuat gereği',
        ], dogru:2,
        aciklama:'Bağlı olsaydı, dış bir servisin erişilebilirliği ' +
                 'şirketin **muhasebe kaydı yapma yeteneğini** belirlerdi. ' +
                 'Entegratör kesintisi, GİB bakımı veya ağ sorunu ' +
                 'satışı ve sevkiyatı durdururdu — kabul edilemez.\n\n' +
                 'Ayrık olduğu için fatura kaydedilir, e-belge sonra gönderilir, ' +
                 'kesinti geçince yeniden denenir. **İş durmaz.**\n\n' +
                 '⚠️ **Bedeli:** iki taraf ayrışabilir ve sistem bunu bildirmez.\n\n' +
                 '**Mimari ders:** gevşek bağlantı **dayanıklılık kazandırır**, ' +
                 '**tutarlılık garantisini kaybettirir** — ve kaybedilen garanti ' +
                 'bir **izleme yükümlülüğüne** dönüşür. ' +
                 '{{EDOC_COCKPIT}}’in günlük rutin olmasının gerçek sebebi budur.' },

      { soru:'{{e-defter}} beratı alınan bir döneme kayıt yapılabilir mi?',
        secenekler:[
          'Evet, {{OB52}} açıksa sorun yok',
          '**Teknik olarak açılabilir ama yapılmamalı — dönem yasal olarak kesinleşmiştir**',
          'Hayır, SAP fiziksel olarak engeller',
          'Yalnızca özel dönemlere yapılabilir',
        ], dogru:1,
        aciklama:'{{berat}} alınan dönem **yasal olarak kesinleşir**. ' +
                 '{{OB52}} ile teknik olarak açabilirsin — SAP engellemez.\n\n' +
                 '⚠️ Ama kayıt yaparsan **e-defter ile SAP ayrışır** ve ' +
                 'bu bir **mevzuat sorunudur**, muhasebe sorunu değil.\n\n' +
                 'Düzeltme **sonraki döneme** kaydedilir.\n\n' +
                 '⭐ Bu, Türkiye’de dönem disiplininin neden başka ülkelerden ' +
                 '**daha katı** olduğunun gerekçesidir: {{OB52}} artık ' +
                 'yalnızca muhasebe düzeni değil, **yasal uyum** aracıdır.' },

      { soru:'Bir sabah hiçbir e-fatura gönderilemiyor. İlk bakılacak yer?',
        secenekler:[
          'Dönem ayarları',
          '**{{mali-muhur}} sertifikasının süresi**',
          'Müşteri ana verileri',
          'Vergi kodları',
        ], dogru:1,
        aciklama:'Belirti tipiktir ve **ayırt edicidir**: dün çalışıyordu, ' +
                 'bugün **hiçbiri** gitmiyor — tek tek değil, **toptan** durma.\n\n' +
                 'Tek tek redler veri sorununa işaret eder; ' +
                 '**toptan durma** ise altyapıya: sertifika, entegratör kesintisi ' +
                 'veya GİB bakımı.\n\n' +
                 '{{mali-muhur}} (tüzel kişi) veya e-imza (gerçek kişi) süresi dolmuşsa ' +
                 'imzalama başarısız olur ve **hiçbir belge gönderilemez**.\n\n' +
                 '**Kalıcı önlem:** sertifika son kullanma tarihi **takvime bağlanır** — ' +
                 '{{FBN1}} numara aralığı ve e-fatura serisi kontrolüyle aynı listeye.' },
    ],

    flashcards:[
      { on:'⭐ Konunun tezi — tek cümle', arka:'**Muhasebe belgesi ile e-belge İKİ AYRI NESNEDİR.**\n\n**Kol 1:** {{BKPF}} + {{BSEG}} → mizan\n**Kol 2:** {{EDOCUMENT}} → GİB\n\nBağımsız başarısız olabilirler.\nSistem bunu **hata olarak bildirmez**.' },
      { on:'İki ekran, iki farklı soru', arka:'**{{FB03}}** → *"Kaydettik mi?"*\n**{{EDOC_COCKPIT}}** → *"Gönderebildik mi?"*\n\n⚠️ Mizan denk + cari borç doğru + belge yerinde\n= e-belge gitti **DEMEK DEĞİLDİR**' },
      { on:'e-Fatura mı, e-Arşiv mi?', arka:'⚠️ **Tercih DEĞİL** — alıcının durumu belirler\n\n**Kayıtlı mükellef** → **e-Fatura**\nGİB üzerinden **iletilir** · 🚫 iptal edilemez\n\n**Kayıtsız / nihai tüketici** → **e-Arşiv**\nGİB’e **raporlanır** · ✅ süre içinde iptal\n\nKarar: {{mukellef-sorgulama}} listesi' },
      { on:'⚠️ İptal asimetrisi', arka:'**Muhasebe:** {{FB08}} her zaman mümkün\n\n**E-belge:**\n• e-Arşiv → ✅ süre içinde **iptal**\n• e-Fatura → 🚫 **iptal edilemez** → **iade faturası**\n• Ticari senaryo → alıcı **reddedebilir**\n\n⚠️ {{FB08}} GİB’e belge **göndermez** → iki taraf **ayrışır**' },
      { on:'⭐ Teşhisi ikiye bölen soru', arka:'**"{{EDOCUMENT}} kaydı oluştu mu?"**\n\n**Hiç yok** → **SAP** tarafı\n(belge türü eşlemesi, ana veri, kaynak tipi)\n\n**Var, "gönderildi"de takılı** → **entegratör**\n\n**Var, RED** → **veri / mevzuat**\n(sebep: yanıt XML’inde)' },
      { on:'Geçici mi, kalıcı mı hata?', arka:'**GEÇİCİ** → {{EDOC_RESUBMIT}} çalışır\n*"zaman aşımı" · "bağlantı" · "servis kullanılamıyor"*\n\n**KALICI** → ⚠️ önce **veriyi düzelt**\n*"kod eksik" · "geçersiz" · "mükellef değil" · "format"*\n\nYeniden göndermek aynı hatalı XML’i tekrar yollar' },
      { on:'Üç katman — sorumluluk sınırı', arka:'**1. Çerçeve (SAP)** — {{EDOCUMENT}}, statü, cockpit\n**2. Yerelleştirme (SAP TR)** — {{ubl-tr}}, alan eşlemeleri\n**3. Entegratör add-on (3. taraf)** — GİB iletimi, imza, saklama\n\n⚠️ 3. katman **SAP desteği kapsamında değil**' },
      { on:'Vergi kodu iki yeri besler', arka:'**1. Muhasebe** — {{OB40}}, oran, {{BSET}}\nEksikse → kayıt **DURUR** (konuşan hata)\n\n**2. E-belge** — istisna kodu, tevkifat oranı\nEksikse → kayıt **GEÇER**, e-belge **REDDEDİLİR** (sessiz)\n\n⭐ Bu asimetri redlerin neden geç fark edildiğini açıklar' },
      { on:'Neden iki taraf ayrışabiliyor?', arka:'**Bilinçli tasarım.**\n\nBağlı olsaydı → entegratör kesintisi **tüm faturalamayı** durdururdu\n\nAyrık olduğu için → iş **durmaz**\n\n⚠️ Bedeli: tutarlılık garantisi yok\n→ Kaybedilen garanti = **izleme yükümlülüğü**\n→ {{EDOC_COCKPIT}} **günlük**' },
      { on:'{{berat}} ve dönem kapanışı', arka:'{{e-defter}} → XML → imza → **berat** → GİB\n\n⭐ **Beratı alınan dönem YASAL olarak kesinleşir**\n\n{{OB52}} ile açabilirsin ama **açma** — defter ile SAP ayrışır, bu **mevzuat sorunudur**\n\n→ Türkiye’de dönem disiplini neden daha katı' },
      { on:'"Bir sabah hiçbiri gitmiyor"', arka:'**Belirti ayırt edici:** tek tek değil **TOPTAN** durma\n\n→ Altyapı sorunu:\n**{{mali-muhur}} sertifikası süresi doldu**\nveya entegratör kesintisi / GİB bakımı\n\nTek tek redler = **veri** sorunu\nToptan durma = **altyapı**\n\n📅 Sertifika tarihini **takvime bağla**' },
      { on:'Muhasebe kapanışının kör noktası', arka:'⚠️ Kapanış · ihtar · KDV beyanı — **üçü de** e-belge statüsünü kaçırır\n\nHiçbiri *"fatura karşı tarafa ulaştı mı?"* diye sormaz\n\n⭐ **İki ek kontrol:**\n① Günlük {{EDOC_COCKPIT}} → hata+red = **0**\n② Aylık: hesaplanan KDV ↔ GİB e-fatura toplamı' },
      { on:'Sinyal vardı, okunamadı', arka:'Müşteri: *"Böyle bir fatura yok"*\n\n❌ **Bahane** olarak yorumlandı\n✅ Aslında bir **VERİ**\n\n⭐ Kural: tahsilat/ihtar görüşmesinde bu cevap gelirse → **e-belge kontrolü tetiklenir**\n\n*Sessiz hatalarda sinyal genelde vardır — beklenmedik yerden, beklenmedik dille gelir.*' },
    ],
  },

  },
});
