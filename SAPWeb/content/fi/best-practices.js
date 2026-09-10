/* ==========================================================================
   content/fi/best-practices.js — "Best Practices (Danışmanlık Pratiği)"

   Ana tez: Yapılandırma kararları İKİYE ayrılır — geri alınabilenler ve
   VERİYLE MÜHÜRLENENLER. Proje riski, ikincisinin listesini bilmemekten doğar.
   ========================================================================== */

SAP.registerTopic({
  id: 'best-practices',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      '"İyi pratik" denince akla genelde bir liste gelir: dokümantasyon yap, ' +
      'test et, taşıma isteklerini küçük tut.\n\n' +
      'Bu listeler doğrudur ve **işe yaramaz** — çünkü hepsi aynı şeyi söyler: ' +
      '*"dikkatli ol"*. Dikkatli olmak bir yöntem değildir.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Bu konunun tezi:**\n\n' +
      '**Yapılandırma kararları ikiye ayrılır: geri alınabilenler ve ' +
      '*veriyle mühürlenenler*. Proje riskinin tamamı, ikincisinin ' +
      'listesini bilmemekten doğar.**\n\n' +
      'Çünkü SAP’ta hiçbir ayar *"değiştirilemez"* diye işaretli değildir. ' +
      'Hepsi {{SPRO}}’da aynı görünür, hepsi aynı kolaylıkla açılır. ' +
      'Fark, **üzerine veri yazıldıktan sonra** ortaya çıkar:\n\n' +
      '• {{odeme-kosulu}} yanlışsa → değiştirirsin, biter.\n' +
      '• {{belge-bolme}} kapalı kurulmuşsa → **sonradan açılamaz.**\n\n' +
      'İkisi de bir onay kutusudur. İkisi de aynı ekranda durur. ' +
      'Aralarındaki fark **beş dakika ile bir sonraki projedir**.\n\n' +
      '━━━━━━━━━━\n\n' +
      'Bu ayrımı taşıyan kavram: {{tek-yonlu-kapi}}.',

    neden:
      '**Çünkü hata maliyeti eşit değildir.** Bütün kararlara aynı özeni ' +
      'göstermek imkânsızdır; bir projede binlerce ayar vardır. ' +
      'Özen **seçici** olmak zorundadır — ve doğru yere yönlendirilmelidir.\n\n' +
      '**Çünkü zaman baskısı gerçektir.** Canlıya geçiş tarihi yaklaşınca ' +
      'tartışmalar kısalır. O anda hangi kararın "sonra bakarız" ' +
      'diyebileceğinizi, hangisinin diyemeyeceğinizi **önceden** bilmelisiniz.\n\n' +
      '**Çünkü müşteri de bilmiyor.** *"Şimdilik segment raporu istemiyoruz"* ' +
      'cümlesi masum görünür. Onu bir {{tek-yonlu-kapi}} kararına ' +
      'çevirmek danışmanın işidir.\n\n' +
      '**Çünkü sistem uyarmaz.** {{SPRO}} bir onay kutusunu kaldırırken ' +
      '*"bu geri alınamaz"* demez.',

    sirketOnemi:
      'Şirket açısından bu konu bir **risk yönetimi** konusudur, ' +
      'teknik bir konu değil.\n\n' +
      'Bir ERP projesinde alınan kararların ömrü, projeyi alan ekibin ' +
      'şirkette kalma süresinden **uzundur**. Beş yıl sonra kimse ' +
      '*"neden böyle kurulmuş?"* sorusunu cevaplayamaz — ' +
      'çünkü SAP **ne yapıldığını** tutar ({{degisiklik-belgesi}}), ' +
      '**neden yapıldığını** tutmaz.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Danışmanın asıl kattığı değer üç yerdedir:**\n\n' +
      '**1.** Hangi kararın geri alınamaz olduğunu **karar anında** bilmek.\n' +
      '**2.** O kararı doğru soruyla sormak: *"bugün istiyor muyuz?"* değil, ' +
      '**"üç yıl içinde isteme ihtimalimiz var mı?"**\n' +
      '**3.** Cevabı **gerekçesiyle** yazmak — çünkü gerekçe olmayan karar, ' +
      'iki yıl sonra bir hata gibi görünür.\n\n' +
      'İşlem kodunu herkes öğrenir. Bu üç madde öğrenilmez, **taşınır**.',

    gercekHayat:
      'Toplantıda mali işler müdürü: *"Segment bazlı bilanço istemiyoruz, ' +
      'bizim tek bir işimiz var."*\n\n' +
      'Deneyimsiz cevap: *"Tamam, {{belge-bolme}}yi kapatıyoruz."*\n\n' +
      '**Deneyimli cevap üç cümledir:**\n\n' +
      '*"Peki. Ama şunu bilerek kapatalım: bu ayar canlıya geçtikten sonra ' +
      '**açılamaz**. Üç yıl içinde bir iş kolu ayırma, bir satın alma ' +
      'veya bir yatırımcı raporlaması ihtimali varsa, bugün açık kurup ' +
      'kullanmamak — kapatıp sonra pişman olmaktan **çok daha ucuz**. ' +
      'Kararı böyle bir tutanağa yazalım mı?"*\n\n' +
      '━━━━━━━━━━\n\n' +
      'Bu cevabın üç özelliği var ve üçü de bilinçli:\n\n' +
      '**Kararı almıyor** — müşteriye ait bir karardır.\n' +
      '**Bilgiyi ekliyor** — "geri alınamaz" bilgisi masada yoktu.\n' +
      '**Yazılı hâle getiriyor** — iki yıl sonra bu bir hata değil, ' +
      'bir **karar** olarak okunacak.',

    muhasebeMantigi:
      'Yapılandırma hataları muhasebede **üç farklı ağırlıkta** görünür ' +
      've ayrım kritiktir:\n\n' +
      '**① Kayıt durur.** Hesap belirleme eksik, numara aralığı yok, ' +
      'dönem kapalı. Rahatsız edicidir ama **iyi haberdir**: ' +
      'hata anında görünür ve yanlış veri oluşmaz.\n\n' +
      '**② Kayıt geçer, mizan tutar, sonuç yanlıştır.** Yanlış ' +
      '{{mutabakat-hesabi}}, yanlış {{vergi-kodu}}, uyarı seviyesinde ' +
      'bırakılmış bir doğrulama. **Asıl tehlike burada.**\n\n' +
      '**③ Kayıt geçer ama sonradan düzeltilemez.** {{belge-bolme}} kapalı ' +
      'kurulmuştur; geçmiş kayıtlarda bölme bilgisi **hiç oluşmamıştır**. ' +
      'Ayarı sonradan açsanız bile geçmiş veri o bilgiyi kazanmaz.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Üçüncü sınıfın tanımı budur:** ayar geri alınabilir olsa bile ' +
      '**veri geri alınamaz**. Bir ayarın "tek yönlü kapı" olmasının ' +
      'sebebi ayarın kendisi değil, **onun üretmediği veridir**.\n\n' +
      'Bu yüzden soru hep aynıdır: *"bu ayar kapalıyken üretilen veri, ' +
      'ayar açıldığında geriye dönük tamamlanabilir mi?"* ' +
      'Cevap hayırsa, elinizde bir {{tek-yonlu-kapi}} var.',

    kavramlar: ['tek-yonlu-kapi', 'standarda-yakin', 'z-gelistirme', 'badi',
                'akim-verisi', 'tasima-sirasi', 'regresyon-testi', 'negatif-test'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Bir yapılandırma değişikliği doğduğu andan canlıya çıkana kadar ' +
      '**altı durak**tan geçer. İyi pratiklerin çoğu bu duraklardan birine ' +
      'aittir; hangisine ait olduğunu bilmek, ne zaman uygulanacağını da söyler.',

    roller:[
      { rol:'İş tarafı', gorev:'İhtiyacı tarif eder — çözümü değil.' },
      { rol:'Danışman', gorev:'**Bu bir {{tek-yonlu-kapi}} mı?** diye sorar.' },
      { rol:'Danışman', gorev:'{{standarda-yakin}} seçenek var mı, araştırır.' },
      { rol:'Danışman', gorev:'Kararı **gerekçesiyle** yazar.' },
      { rol:'Danışman', gorev:'Geliştirme sisteminde yapar, {{tasima-istegi}}ne alır.' },
      { rol:'Test kullanıcısı', gorev:'Test sisteminde **pozitif ve {{negatif-test}}**.' },
      { rol:'Danışman', gorev:'{{regresyon-testi}} — **eskiden çalışan** bozuldu mu?' },
      { rol:'BT', gorev:'{{STMS}} ile **sırayla** taşır ({{tasima-sirasi}}).' },
      { rol:'Danışman', gorev:'Canlıda **doğrular** — taşındı ≠ çalışıyor.' },
      { rol:'Danışman', gorev:'{{akim-verisi}} tablolarını canlıda **ayrıca** ayarlar.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Bir yapılandırma değişikliğinin yolculuğu',
      adimlar:[
        { ic:'💬', rol:'İş tarafı', baslik:'İhtiyaç doğar',
          aciklama:'İhtiyaç genelde **çözüm olarak** gelir: ' +
                   '*"şu alana bir kontrol koyun"*. ' +
                   'Danışmanın ilk işi ihtiyacı çözümden **ayırmaktır**.',
          cikti:'Tarif edilmiş ihtiyaç', ok:'sınıflandır' },
        { ic:'🚪', rol:'Danışman', baslik:'**Bu bir tek yönlü kapı mı?**',
          aciklama:'Tek soru: *"bu ayar yanlış kurulursa, üzerine veri yazıldıktan ' +
                   'sonra geri alınabilir mi?"*\n\n' +
                   'Cevap hayırsa karar **yavaşlar** ve yazılı hâle gelir. ' +
                   'Evetse hızlı verilir ve gerekirse sonra değiştirilir.',
          cikti:'Karar sınıfı', ok:'çözüm aranır' },
        { ic:'🎯', rol:'Danışman', baslik:'{{standarda-yakin}} çözüm var mı?',
          aciklama:'Sıra: **standart ayar** → {{badi}} / genişletme → ' +
                   'son çare **modifikasyon**.\n\n' +
                   'Aşağı indikçe sürüm yükseltme maliyeti artar; ' +
                   '{{z-gelistirme}} bir maliyet değil **borçtur**.',
          cikti:'Çözüm yaklaşımı', ok:'gerekçe yazılır' },
        { ic:'📝', rol:'Danışman', baslik:'Karar **gerekçesiyle** yazılır',
          aciklama:'SAP **ne yapıldığını** zaten tutar ({{degisiklik-belgesi}}). ' +
                   'Tutmadığı şey **neden**dir.\n\n' +
                   'Üç satır yeter: neyi çözüyor · hangi alternatifler elendi · ' +
                   'hangi varsayıma dayanıyor.',
          cikti:'Karar kaydı', ok:'yapılır' },
        { ic:'🔧', rol:'Danışman', baslik:'Geliştirme sisteminde yapılır',
          aciklama:'Değişiklik **küçük ve amaç odaklı** bir ' +
                   '{{tasima-istegi}}ne alınır. "Her şey içinde" tek büyük istek, ' +
                   'sırası bozulduğunda geri alınamaz.',
          cikti:'{{tasima-istegi}}', ok:'test edilir' },
        { ic:'🧪', rol:'Test', baslik:'Pozitif **ve** {{negatif-test}}',
          aciklama:'Mutlu yolu herkes test eder. Asıl değer ' +
                   '*"yanlış veri durduruluyor mu?"* sorusundadır — ' +
                   'çünkü kontroller **yalnızca ihlal edildiklerinde** görünür.',
          cikti:'Test sonucu', ok:'regresyon' },
        { ic:'🔁', rol:'Danışman', baslik:'{{regresyon-testi}} — eskiden çalışan bozuldu mu?',
          aciklama:'FI’da yapılandırma **paylaşımlıdır**: bir vergi kodunun ' +
                   'hesap ataması değişince ona bağlı **her süreç** etkilenir.\n\n' +
                   'Kapsam tahminle değil {{E071}} bağımlılığıyla belirlenir.',
          cikti:'Yeşil çekirdek küme', ok:'taşınır' },
        { ic:'🚚', rol:'BT', baslik:'{{STMS}} ile **sırayla** taşınır',
          aciklama:'{{tasima-sirasi}} bozulursa **eski hâl yeniyi ezer** — ' +
                   've hiçbir hata mesajı çıkmaz.',
          cikti:'Canlıda ayar', ok:'doğrulanır' },
        { ic:'✓', rol:'Danışman', baslik:'Canlıda **doğrulanır** — taşındı ≠ çalışıyor',
          aciklama:'İki sebeple: taşıma hata dönmüş olabilir ({{SE09}} günlüğü), ' +
                   've **{{akim-verisi}} tabloları taşımayla gelmez** — ' +
                   '{{OB52}}, {{TCURR}} canlıda ayrıca ayarlanır.',
          cikti:'Çalışan yapılandırma' },
      ],
    },

    adimlar:[
      { rol:'İş tarafı', eylem:'İhtiyacı tarif eder', sistem:'Toplantı' },
      { rol:'Danışman', eylem:'Tek yönlü kapı mı?', sistem:'Karar — sistemde değil' },
      { rol:'Danışman', eylem:'Standart çözüm aranır', sistem:'{{SPRO}}' },
      { rol:'Danışman', eylem:'Gerekçe yazılır', sistem:'Karar kaydı' },
      { rol:'Danışman', eylem:'Ayar yapılır', sistem:'{{SPRO}} · {{tasima-istegi}}' },
      { rol:'Test', eylem:'Pozitif + negatif test', sistem:'Test sistemi' },
      { rol:'Danışman', eylem:'Regresyon testi', sistem:'Çekirdek küme' },
      { rol:'BT', eylem:'Sırayla taşır', sistem:'{{STMS}} · {{SE09}}' },
      { rol:'Danışman', eylem:'Canlıda doğrular', sistem:'{{akim-verisi}} ayrı' },
    ],

    veriAkisi:{
      nereden:'İş ihtiyacı → danışman kararı → geliştirme sistemi.',
      nereye:'Test sistemi → canlı sistem; içerik {{E070}}/{{E071}}’de kayıtlı.',
      tetikleyen:'Değişiklik talebi veya proje yapılandırma planı.',
      sonraki:'Canlıda doğrulama → {{akim-verisi}} ayarları → karar kaydının arşivlenmesi.',
    },

    notlar:[
      { tip:'warn', baslik:'"Test sisteminde çalışıyordu" — üç sebep', metin:
        'Bu cümle bir danışmanın en sık duyduğu şikâyettir ve neredeyse ' +
        'her zaman **üç sebepten birine** dayanır:\n\n' +
        '━━━━━━━━━━\n\n' +
        '**1. {{akim-verisi}} — ayar taşınmamıştır çünkü taşınmaz.**\n\n' +
        'Bazı yapılandırma tabloları taşıma isteğine **hiç girmez**: ' +
        '{{OB52}} dönem açma, {{TCURR}} kurlar, ihtar tarihleri. ' +
        'Bunlar her sistemde **ayrı ayrı** ayarlanır.\n\n' +
        'Test sisteminde dönem açıktı, canlıda değil. Ayar "taşınmadı" değil, ' +
        '**taşınacak bir şey yoktu**.\n\n' +
        '**2. {{tasima-sirasi}} bozulmuştur.**\n\n' +
        'Aynı nesneye dokunan iki istek ters sırada gitmiştir; ' +
        '**eski hâl yeniyi ezmiştir** ve hata mesajı çıkmamıştır. ' +
        'Teşhis: {{E071}}’de iki isteğin ortak nesnesi var mı?\n\n' +
        '**3. Bağımlı bir nesne taşınmamıştır.**\n\n' +
        'Ayar taşındı ama dayandığı G/L hesabı, vergi kodu veya ' +
        '{{odeme-kosulu}} taşınmadı. Test sisteminde elle açılmıştı ' +
        've kimse fark etmemişti.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Teşhis sırası:** önce *"bu tablo akım verisi mi?"* ' +
        '(en sık sebep, en hızlı kontrol) → sonra {{E071}} çakışması → ' +
        'sonra bağımlılık.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Yapılandırma hatalarının muhasebeye yansıması, konunun ' +
      '**en somut** kısmıdır. Aşağıdaki üç fiş de **dengelidir**, ' +
      'sistem üçünü de kabul eder ve üçü de bir yapılandırma hatasının ' +
      'sonucudur.\n\n' +
      'Ortak özellikleri: **hiçbiri hata mesajı üretmez.**',

    etkilenenHesaplar:[
      { hesap:'320 Satıcılar', tur:'Bilanço — Kaynak', neden:'Doğru {{mutabakat-hesabi}}.' },
      { hesap:'336 Diğer çeşitli borçlar', tur:'Bilanço — Kaynak', neden:'Yanlış `AKONT` ile buraya düşer.' },
      { hesap:'191 İndirilecek KDV', tur:'Bilanço — Varlık', neden:'Yanlış {{vergi-kodu}} burayı şişirir.' },
      { hesap:'770 Genel yönetim giderleri', tur:'Gelir tablosu', neden:'Uyarı geçilince yanlış boyutla kaydedilir.' },
    ],

    fisler:[
      { baslik:'① Yanlış {{mutabakat-hesabi}} — kayıt geçer, bilanço yanlış',
        belgeTuru:'KR', tarih:'12.03.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'153', ad:'Ticari mallar', borc:100000 },
          { hesap:'191', ad:'İndirilecek KDV %20', borc:20000 },
          { hesap:'336', ad:'Diğer çeşitli borçlar — satıcı V-2087', alacak:120000,
            not:'`AKONT` yanlış girilmiş' },
        ],
        not:'**Fiş dengeli, sistem kabul etti, hata mesajı çıkmadı.**\n\n' +
             'Satıcının {{LFB1}}.`AKONT` alanına `336` yazılmıştı. ' +
             'Ana veri açılırken kimse fark etmedi çünkü ' +
             '**SAP hangi hesabın "doğru" olduğunu bilmez** — ' +
             'girdiğiniz hesabı kullanır.\n\n' +
             '**Sonuçları:**\n\n' +
             '• {{FBL1N}} satıcı dökümü **doğru** görünür — satıcı bazlı bakiye tutar\n' +
             '• Ama {{FS10N}}’de `320` **eksik**, `336` **fazla**\n' +
             '• Bilanço sunumu yanlış: ticari borç, diğer borç gibi görünür\n' +
             '• Yaşlandırma ve {{F110}} çalışır — çünkü açık kalem yönetimi ' +
             'hesaptan bağımsızdır\n\n' +
             '**Bu yüzden `AKONT` yükleme öncesi elle doğrulanması gereken ' +
             'az sayıdaki alandan biridir** (bkz. {{konu:migration}}).' },

      { baslik:'② Düzeltme — ayar değişir, **geçmiş kalır**',
        belgeTuru:'SA', tarih:'31.03.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'336', ad:'Diğer çeşitli borçlar — sınıflandırma düzeltmesi', borc:120000 },
          { hesap:'320', ad:'Satıcılar', alacak:120000 },
        ],
        not:'**Konunun özü bu fişte.**\n\n' +
             'Satıcı ana verisindeki `AKONT` {{FK02}} ile düzeltilebilir — ' +
             'bu bir **çift yönlü kapıdır**, beş dakika sürer.\n\n' +
             '**Ama geçmiş kayıtlar taşınmaz.** Değişiklikten sonraki ' +
             'kayıtlar `320`’ye gider; öncekiler `336`’da **kalır**.\n\n' +
             'Yani ayar geri alınabilir, **veri geri alınamaz** — ve ' +
             'yukarıdaki gibi bir sınıflandırma düzeltme kaydı gerekir.\n\n' +
             'Bu kaydın kendi bedeli de var: `336` ve `320` artık ' +
             '**satıcı bazlı mutabık değildir** — düzeltme G/L seviyesinde ' +
             'yapıldı, satıcı kalemleri hâlâ eski hesabın altında duruyor. ' +
             'Bilanço doğrulanır ama {{FBL1N}} ile {{FS10N}} arasındaki ' +
             'köprü bozulur.\n\n' +
             '**Genel kural:** *"ayar değiştirilebilir"* ile ' +
             '*"hata düzeltilebilir"* **aynı şey değildir**.' },

      { baslik:'③ Uyarı (W) seviyesinde bırakılmış kontrol — sessizce geçilir',
        belgeTuru:'KR', tarih:'18.04.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim giderleri — kapatılmış kâr merkezi', borc:45000 },
          { hesap:'320', ad:'Satıcılar — danışmanlık faturası', alacak:45000 },
        ],
        not:'Kâr merkezi kontrolü bir doğrulamayla kurulmuştu ama ' +
             'mesaj tipi **W (uyarı)** bırakılmıştı.\n\n' +
             '**W ile kurulan kural, ilk yoğun günde herkes tarafından ' +
             'geçilir ve fiilen kalkar.** Kullanıcı Enter’a basar, kayıt geçer.\n\n' +
             '**Sonuç:** mizan doğru, fiş dengeli, gider doğru hesapta — ' +
             'ama CO tarafında **kapatılmış bir kâr merkezine** yazıldı ve ' +
             'bütçe raporu bozuldu ({{konu:cost-center}}).\n\n' +
             '**{{OBA5}} bir "hatayı sustur" aracı değildir** — ve tersi ' +
             'daha değerlidir: **kritik bir kontrol `W` ise `E` yapılır.**\n\n' +
             'Bu ayrımın testi de özeldir: pozitif test bunu **göremez**. ' +
             'Yalnızca {{negatif-test}} yakalar — kural bilerek ihlal edilir ' +
             've sistemin gerçekten **durdurup durdurmadığına** bakılır.' },
    ],

    tHesaplar:[
      { hesap:'Yanlış sınıflandırma — iki hesap', kod:'336 / 320',
        borc:[{ ad:'336 düzeltme aktarımı', tutar:120000 }],
        alacak:[{ ad:'336’ya yanlış giden faturalar', tutar:120000 }],
        not:'Düzeltme **G/L seviyesinde** yapıldı; satıcı kalemleri eski hesabın altında' },
    ],

    notlar:[
      { tip:'err', baslik:'Üç fişin ortak özelliği — ve neden bu konu var', metin:
        'Yukarıdaki üç fiş de:\n\n' +
        '**dengelidir** — borç = alacak\n' +
        '**sistem tarafından kabul edilmiştir** — hata mesajı yok\n' +
        '**mizanı bozmaz** — toplamlar tutar\n' +
        've **üçü de yanlıştır**\n\n' +
        '━━━━━━━━━━\n\n' +
        'Bu, {{konu:error-handling}}’deki **② sessiz hata** sınıfının ' +
        '**yapılandırma kaynaklı** hâlidir. Fark şudur:\n\n' +
        'Sessiz hataların çoğu **kullanıcı** hatasıdır ve tek belgeyi etkiler.\n' +
        'Yapılandırma kaynaklı olanlar **her belgeyi** etkiler ve ' +
        'düzeltilene kadar **birikirler**.\n\n' +
        'Birinci fişte hata bir kez yapıldı (ana veri açılırken) ama ' +
        'sonuç **her faturada** tekrarlandı.\n\n' +
        '**Bu yüzden yapılandırma testinin ölçütü "çalışıyor mu?" değil, ' +
        '"yanlış kullanıldığında ne olur?"dur.**' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Bu bölüm konunun **çalışma listesidir**: hangi karar tek yönlü kapı, ' +
      'hangisi değil.\n\n' +
      'Liste ezberlenmez — **ölçüt** ezberlenir:\n\n' +
      '*"Bu ayar yanlış kurulursa, üzerine veri yazıldıktan sonra ' +
      'geri alınabilir mi?"*\n\n' +
      'Cevap **hayır** ise tek yönlü kapıdır ve kararı yavaşlatmak gerekir.',

    liste:[
      /* --- TEK YÖNLÜ KAPILAR --- */
      { ad:'{{hesap-plani}} — tek yönlü', en:'Chart of Accounts',
        aciklama:'Şirket kodunun bağlı olduğu hesap planı ve hesap numaralandırma yapısı.',
        neZaman:'Proje başında, **bir kez**.',
        ornek:'**Neden geri alınamaz:** her belge bir hesaba yazılır. ' +
              'Hesap planını değiştirmek, **açılmış tüm bakiyelerin taşınması** ' +
              'demektir — pratikte yeni bir {{konu:migration}} projesidir.\n\n' +
              'Numara yapısı da aynı derecede kalıcıdır: hesap numarasına ' +
              'anlam yüklediyseniz (`320.01` yurtiçi / `320.02` yurtdışı), ' +
              'sonradan bölmek **1:n problemidir** ve otomatik yapılamaz.\n\n' +
              '**Doğru zamanda sorulacak soru:** hangi ayrımları hesap ' +
              'numarasında, hangilerini **boyutlarda** ({{kar-merkezi}}, ' +
              '{{is-alani}}, segment) tutacağız? Boyutlar sonradan ' +
              'eklenebilir, hesap numarası eklenemez.',
        tcodes:['OB13','FS00'] },

      { ad:'{{belge-bolme}} — tek yönlü', en:'Document Splitting',
        aciklama:'Bilanço kalemlerinin kâr merkezi / segment bazında bölünmesi.',
        neZaman:'{{konu:new-gl}} kurulumunda.',
        ornek:'**Konunun en klasik tek yönlü kapısı.**\n\n' +
              'Bölme kapalıyken kaydedilen belgelerde bölme bilgisi ' +
              '({{FAGL_SPLINFO}}) **hiç oluşmaz**. Ayarı sonradan açarsanız ' +
              'yalnızca **yeni** belgeler bölünür; geçmiş veri o bilgiyi ' +
              '**kazanmaz** ve kazandırılamaz.\n\n' +
              'Sonuç: segment bilançosu **açıldığı tarihten itibaren** ' +
              'anlamlıdır; öncesi eksiktir ve karşılaştırma yapılamaz.\n\n' +
              '**Karar kuralı:** bölmeyi açık kurup kullanmamak, ' +
              'kapalı kurup sonra pişman olmaktan **çok daha ucuzdur**.',
        tcodes:['FAGLL03'] },

      { ad:'Şirket kodu para birimi — tek yönlü', en:'Company Code Currency',
        aciklama:'{{yerel-para-birimi}} ve varsa {{paralel-para-birimi}}ler.',
        neZaman:'Şirket kodu açılırken.',
        ornek:'Her kalem hem işlem hem yerel para biriminde saklanır. ' +
              'Yerel para birimini değiştirmek, **tüm geçmişin yeniden ' +
              'değerlenmesi** demektir.\n\n' +
              'Paralel para birimi (grup para birimi) **sonradan eklenemez** — ' +
              'daha doğrusu eklenir ama **geçmiş kayıtlarda boş kalır**, ' +
              'yani raporlama açısından işe yaramaz.\n\n' +
              'İhtiyaç ihtimali varsa **baştan** tanımlanır; ' +
              'S/4HANA’da {{ACDOCA}} sekize kadar para birimi taşır ve ' +
              'boş bırakmak ucuzdur.',
        tcodes:['OX02','OBY6'] },

      { ad:'{{mali-yil-varyanti}} — tek yönlü', en:'Fiscal Year Variant',
        aciklama:'Mali yılın kaç dönemden oluştuğu ve ne zaman başladığı.',
        neZaman:'Şirket kodu açılırken.',
        ornek:'Dönem yapısı her belgenin `MONAT` alanına yazılmıştır. ' +
              'Varyantı değiştirmek geçmiş belgelerin **dönem atamasını** ' +
              'anlamsız kılar.\n\n' +
              '{{ozel-donem}} sayısı da (13–16) buraya bağlıdır ve ' +
              'sonradan artırmak kapanış yapısını etkiler.',
        tcodes:['OB29'] },

      { ad:'Defter yapısı ve {{amortisman-alani}} — tek yönlü', en:'Ledger / Depreciation Area',
        aciklama:'{{paralel-defter}} kurgusu ve {{degerleme-plani}} içindeki alanlar.',
        neZaman:'Kurulumda.',
        ornek:'Bir deftere sonradan geçmiş yazılamaz: IFRS defteri ' +
              'iki yıl sonra açılırsa, o iki yılın IFRS değerlemesi **yoktur**.\n\n' +
              'Aynısı {{amortisman-alani}} için geçerlidir — yeni bir alan ' +
              'açılırsa geçmiş amortisman o alanda **hesaplanmamıştır** ' +
              've geriye dönük hesaplatmak özel bir programla, ' +
              'kısıtlı biçimde mümkündür.\n\n' +
              '{{ifrs}} ihtimali varsa defter **baştan** açılır; ' +
              'kullanılmayan defter maliyetsizdir.',
        tcodes:['FINSC_LEDGER','OADB'] },

      { ad:'Kullanılmış {{vergi-kodu}}nun oranı — tek yönlü', en:'Tax Code Rate',
        aciklama:'Bir vergi kodunun yüzdesi ve hesap ataması.',
        neZaman:'Oran değişikliğinde — **yeni kod açılır, eski değiştirilmez**.',
        ornek:'Vergi kodu belgede **kod olarak** saklanır, oran olarak değil. ' +
              'Oranı değiştirirseniz **geçmiş belgeler de yeni oranla ' +
              'yorumlanır** — beyan ve düzeltme hesaplamaları bozulur.\n\n' +
              '**Doğru yol:** yeni bir kod açılır (`A1` → `A2`), ' +
              'eskisi kapatılır. Bu, KDV oranı değiştiğinde ' +
              'her Türkiye kurulumunda yaşanan bir durumdur ' +
              '(bkz. {{konu:taxes}}).',
        tcodes:['FTXP'] },

      /* --- ÇİFT YÖNLÜ KAPILAR --- */
      { ad:'{{odeme-kosulu}}, tolerans, alan durumu — çift yönlü', en:'Reversible Settings',
        aciklama:'Her zaman değiştirilebilen, geçmişi etkilemeyen ayarlar.',
        neZaman:'İhtiyaç doğduğunda.',
        ornek:'Bunlar **hızlı** karar verilir ve gerekirse değiştirilir:\n\n' +
              '{{odeme-kosulu}} · {{tolerans-grubu}} · {{alan-durumu}} · ' +
              'ihtar prosedürü · kullanıcı yetkileri · rapor düzenleri ({{alv-duzeni}})\n\n' +
              '**Dikkat:** değiştirmek serbesttir ama **geçmişi düzeltmez**. ' +
              'Ödeme koşulunu düzeltmek, o koşulla açılmış faturaların ' +
              'vadesini **değiştirmez** — onlar tek tek düzeltilir.\n\n' +
              'Bu ayrım pratikte zaman kazandırır: proje toplantılarının ' +
              'çoğu bu listedeki kararlara harcanır, oysa ' +
              'gerçek risk **yukarıdaki listededir**.',
        tcodes:['OBB8','OBA4'] },

      /* --- TAŞIMA --- */
      { ad:'{{tasima-istegi}} — küçük ve amaç odaklı', en:'Transport Request',
        aciklama:'Yapılandırma değişikliklerinin sistemler arası taşınma birimi.',
        neZaman:'Her yapılandırma değişikliğinde.',
        ornek:'**İyi istek:** tek bir amaç, birkaç nesne, açıklayıcı metin ' +
              '(*"KDV %20 yeni vergi kodu A2"*).\n\n' +
              '**Kötü istek:** "FI ayarları" adlı, üç haftalık ' +
              'her şeyi içeren tek istek. Sorun çıktığında **geri alınamaz**, ' +
              'çünkü içindeki iyi değişiklikler de geri gider.\n\n' +
              '{{tasima-sirasi}} kuralı: aynı nesneye dokunan istekler ' +
              '**serbest bırakılma sırasıyla** taşınır. Ters sırada ' +
              '**eski hâl yeniyi ezer** ve hata mesajı çıkmaz.\n\n' +
              'İçerik {{E071}}’de görülür; çakışma teşhisi oradan yapılır.',
        tcodes:['SE09','STMS'] },

      { ad:'{{akim-verisi}} — taşınmayan yapılandırma', en:'Current Settings',
        aciklama:'Canlıda doğrudan değiştirilen, taşıma isteğine girmeyen tablolar.',
        neZaman:'Sürekli — dönem açma, kur girişi.',
        ornek:'Örnekler: {{OB52}} dönem açma/kapama · {{TCURR}} döviz kurları · ' +
              'ihtar çalıştırma tarihleri.\n\n' +
              '**"Test sisteminde çalışıyordu" şikâyetlerinin en sık sebebi budur** — ' +
              'ayar taşınmadı değil, **taşınacak bir şey yoktu**.\n\n' +
              'Bir yetki sorusu doğurur: canlıda özelleştirme kapalıdır ama ' +
              'akım verisi tablolarına yazma yetkisi **açık kalmak zorundadır**. ' +
              'Kimin yazabileceği bilinçli seçilir — ' +
              '{{OB52}} yetkisi, dönem disiplininin **tek** teknik dayanağıdır.',
        tcodes:['OB52','SM30'] },

      /* --- TEST --- */
      { ad:'{{negatif-test}} — asıl değer burada', en:'Negative Testing',
        aciklama:'Sistemin yapılmaması gerekeni **engellediğini** doğrulayan test.',
        neZaman:'Her kontrol kurulduğunda — **istisnasız**.',
        ornek:'Mutlu yolu herkes test eder. Ama bir kontrol ' +
              '**yalnızca ihlal edildiğinde** görünür.\n\n' +
              '**Test edilecekler:** kapalı döneme kayıt · zorunlu ' +
              '{{kar-merkezi}} boş · dört-göz kuralı tek kullanıcıyla · ' +
              'dengesiz belge · yetkisiz şirket kodu.\n\n' +
              '**Neden zorunlu:** {{konu:dogrulama-ikame}}’de kural üç adımda ' +
              'kurulur ve **üçüncüsü (etkinleştirme) sık atlanır**. ' +
              'Etkinleştirilmemiş kural sessizce hiçbir şey yapmaz — ' +
              've pozitif test bunu **göremez**.',
        tcodes:['GGB4','OBA5'] },

      { ad:'{{regresyon-testi}} — paylaşımlı yapılandırma', en:'Regression Testing',
        aciklama:'Yeni değişikliğin **eskiden çalışanı** bozmadığını doğrular.',
        neZaman:'Her taşımadan sonra.',
        ornek:'FI’da kritiktir çünkü yapılandırma **paylaşımlıdır**: ' +
              'bir vergi kodunun hesap ataması değişince ona bağlı ' +
              '**her süreç** etkilenir.\n\n' +
              '**Kapsam tahminle değil bağımlılıkla belirlenir:** ' +
              '{{E071}} hangi nesnenin değiştiğini söyler; ' +
              'geri kalanı o nesnenin kullanıldığı yerlerdir.\n\n' +
              '**Sabit çekirdek küme** tutulur ve her taşımadan sonra koşulur: ' +
              'bir satıcı faturası · bir {{F110}} koşusu · bir müşteri tahsilatı · ' +
              'bir {{AFAB}} · bir ay sonu kapanışı.',
        tcodes:['SE09'] },
    ],

    karsilastirmaBasliklar:['Tek yönlü kapı', 'Çift yönlü kapı'],
    karsilastirma:[
      ['Örnek', '{{hesap-plani}} · {{belge-bolme}} · para birimi', '{{odeme-kosulu}} · tolerans · alan durumu'],
      ['Geri alınabilir mi?', '**Veri yazıldıktan sonra hayır**', 'Evet'],
      ['Karar hızı', '**Yavaş** — yazılı, gerekçeli', 'Hızlı'],
      ['Kim karar verir?', '**İş tarafı** — danışman bilgi verir', 'Danışman önerir, iş onaylar'],
      ['Yanlışsa maliyet', '**Yeni proje**', 'Bir ayar değişikliği'],
      ['Doğru soru', '*"Üç yıl içinde isteme ihtimali var mı?"*', '*"Bugün ne lazım?"*'],
      ['Şüphedeyken', '**Açık kur, kullanma**', 'Basit olanı seç'],
      ['Toplantı süresi', 'Uzun — ve hak ediyor', 'Kısa tutulmalı'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    anlatim:
      'Bu konunun işlem kodları yapılandırma yapmaz, ' +
      '**yapılandırmayı yönetir**: nerede duruyor ({{SPRO}}), ' +
      'neyi taşıyor ({{SE09}}), nasıl gidiyor ({{STMS}}), ' +
      'kim değiştirdi ({{CDHDR}}).',

    liste:[
      { kod:'SE09', ad:'Taşıma organizatörü',
        amac:'Taşıma isteklerini görüntüler, serbest bırakır ve **içeriğini** gösterir.',
        neZaman:'Her taşımadan önce ve "test sisteminde çalışıyordu" teşhisinde.',
        adimlar:[
          { baslik:'İsteklerini listele — kendi kullanıcın veya proje' },
          { baslik:'**İçeriği aç** — nesne listesi ({{E071}})',
            aciklama:'Bir isteğin neyi taşıdığını görmenin en hızlı yolu.' },
          { baslik:'Serbest bırak — önce **görev**, sonra **istek**',
            aciklama:'Görev serbest bırakılmadan istek bırakılamaz.' },
          { baslik:'Çakışma kontrolü: iki istek aynı nesneye dokunuyor mu?',
            aciklama:'{{tasima-sirasi}} sorunlarının teşhisi buradadır.' },
          { baslik:'Taşıma günlüğünü oku — **dönüş kodu 8 hata demektir**' },
        ],
        ekranAkisi:[
          { ekran:'İstek listesi', islem:'3 açık istek görüldü' },
          { ekran:'İçerik', islem:'İstek A: `T007A` (vergi kodu) · İstek B: `T007A` + `T030K`' },
          { ekran:'Çakışma', islem:'**İkisi de `T007A`’ya dokunuyor** → sıra kritik' },
          { ekran:'Sıra', islem:'A önce serbest bırakıldı ama **B önce taşınmış**' },
          { ekran:'Sonuç', islem:'A, B’nin değişikliğini **ezmiş** — hata mesajı yok' },
          { ekran:'Düzeltme', islem:'B yeniden taşındı; sıra kuralı yazılı hâle getirildi' },
        ],
        alanlar:{
          zorunlu:['İstek türü','Kısa açıklama'],
          opsiyonel:['Görev sahipleri','Hedef sistem'] },
        hatalar:[
          { mesaj:'"Nesne başka bir istekte kilitli"', sebep:'Aynı nesne serbest bırakılmamış başka bir istekte.', cozum:'Diğer istek serbest bırakılır veya nesne oradan çıkarılır. Bu kilit **koruyucudur** — {{tasima-sirasi}} çakışmasını önler.' },
          { mesaj:'Taşındı ama canlıda etkisi yok', sebep:'Tablo {{akim-verisi}} olabilir — taşımaya hiç girmemiştir.', cozum:'Canlıda **ayrıca** ayarlanır ({{SM30}} / {{OB52}}).' },
          { mesaj:'Dönüş kodu 8', sebep:'Taşıma hata verdi — bağımlı nesne eksik veya sözlük uyumsuzluğu.', cozum:'Günlük okunur. **Dönüş kodu 4 de masum değildir**: uyarıdır ama içerik eksik taşınmış olabilir.' },
        ],
        ipucu:'**Taşımadan önce içeriğe bak, sonra değil.**\n\n' +
              'İki soru: *"bu istekte olmaması gereken bir şey var mı?"* ve ' +
              '*"bu nesneye dokunan başka bekleyen istek var mı?"*\n\n' +
              'İkincisi, en sık ve en sinsi taşıma sorununu önler.',
        ilgili:['STMS','SM30','SPRO'] },

      { kod:'STMS', ad:'Taşıma yönetim sistemi',
        amac:'Taşıma kuyruğunu yönetir ve istekleri hedef sisteme aktarır.',
        neZaman:'Test ve canlıya aktarımda.',
        adimlar:[
          { baslik:'Hedef sistemin kuyruğunu aç' },
          { baslik:'**Sırayı kontrol et** — serbest bırakılma sırası',
            aciklama:'{{tasima-sirasi}}: ters sıra **eski hâli yeniye ezdirir**.' },
          { baslik:'İstekleri içe aktar — tekil veya toplu' },
          { baslik:'Günlüğü oku — dönüş kodu 8 hatadır, 4 uyarıdır' },
          { baslik:'Canlıda **doğrula** — taşındı ≠ çalışıyor' },
        ],
        ekranAkisi:[
          { ekran:'Kuyruk', islem:'Canlı sistem kuyruğunda **14 istek** bekliyor' },
          { ekran:'Karar', islem:'Tümü mü, seçili mi? → **tümü, sırayla**' },
          { ekran:'Aktarım', islem:'14 istek sırayla içe aktarıldı' },
          { ekran:'Günlük', islem:'13 × RC 0 · 1 × **RC 4** (uyarı)' },
          { ekran:'İnceleme', islem:'RC 4: bağımlı bir tablo eksik → o istek yeniden taşındı' },
        ],
        alanlar:{
          zorunlu:['Hedef sistem','İstek numarası'],
          opsiyonel:['Zamanlama','Toplu içe aktarma'] },
        hatalar:[
          { mesaj:'Toplu aktarımda sıra karıştı', sebep:'İstekler tek tek ve keyfî sırada aktarılmış.', cozum:'Kuyruk **bütün olarak** aktarılır; seçmeli aktarım sırayı bozar.' },
          { mesaj:'"Sistemde özelleştirme kapalı"', sebep:'{{SCC4}} istemci ayarı — canlıda doğru davranış.', cozum:'Değişiklik **geliştirme sisteminde** yapılıp taşınır. İstisna: {{akim-verisi}}.' },
        ],
        ipucu:'**Taşıma bir teslim değil, bir adımdır.** ' +
              'RC 0 dönmesi ayarın **çalıştığı** anlamına gelmez; ' +
              'yalnızca **kopyalandığı** anlamına gelir.\n\n' +
              'Canlıda doğrulama listesi kısa olabilir ama **olmalıdır**.',
        ilgili:['SE09','SPRO'] },

      { kod:'SPRO', ad:'Uygulama yapılandırması (IMG)',
        amac:'Tüm yapılandırma ağacı; her düğüm bir ayar ekranına açılır.',
        neZaman:'Her yapılandırma işinde.',
        adimlar:[
          { baslik:'SAP Referans IMG’yi aç' },
          { baslik:'Düğümdeki **işlem kodunu** oku — `OB*` ezberi gereksiz',
            aciklama:'Kod düğümün yanında yazılıdır (bkz. {{konu:tcodes}}).' },
          { baslik:'**Belgeyi () oku** — SAP’ın kendi açıklaması',
            aciklama:'Çoğu "bu ayar ne yapar?" sorusu burada cevaplanır.' },
          { baslik:'Değişikliği yap → {{tasima-istegi}}ne al' },
          { baslik:'İstek **küçük ve amaç odaklı** olsun' },
        ],
        ekranAkisi:[
          { ekran:'Ağaç', islem:'Mali Muhasebe → Ana Muhasebe → İş İşlemleri' },
          { ekran:'Düğüm', islem:'Yanında işlem kodu yazılı: `OB52`' },
          { ekran:'Belge', islem:'açıldı → *"bu tablo akım verisidir"* yazıyor' },
          { ekran:'Sonuç', islem:'Taşıma isteği **beklenmedi** — canlıda ayrıca ayarlandı' },
        ],
        alanlar:{
          zorunlu:['IMG düğümü'],
          opsiyonel:['Proje IMG (yalnızca kapsam)'] },
        hatalar:[
          { mesaj:'"Değişiklik yapılamaz — istemci koruması"', sebep:'{{SCC4}} ayarı; canlıda beklenen davranıştır.', cozum:'Geliştirme sisteminde yapılır ve taşınır.' },
          { mesaj:'Ayar yapıldı ama taşıma isteği sorulmadı', sebep:'Tablo **{{akim-verisi}}** olarak işaretli.', cozum:'Bu bir hata değildir. Ayar her sistemde **ayrı** yapılır — ve bu bilinerek yapılmalıdır.' },
        ],
        ipucu:'**IMG belgesini okumak, bu konudaki en yüksek getirili alışkanlıktır.**\n\n' +
              'Her düğümün yanında bir belge simgesi vardır ve SAP orada ' +
              'ayarın ne yaptığını, nelere bağlı olduğunu ve ' +
              '**sonradan değiştirilip değiştirilemeyeceğini** yazar.\n\n' +
              'Tek yönlü kapı listesinin çoğu oradan çıkarılabilir.',
        ilgili:['SE09','SM30','OBA5'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'İyi pratiğin tablo tarafı iki soruyla ilgilidir: ' +
      '**"ne taşındı?"** ({{E070}}/{{E071}}) ve ' +
      '**"kim değiştirdi?"** ({{CDHDR}}/{{CDPOS}}).',

    liste:[
      { ad:'E070', baslik:'Taşıma isteği başlığı — değişiklik zaman çizelgesi',
        tutar:'Her istek bir satır: sahibi, türü, durumu, serbest bırakılma zamanı.',
        olusturan:'{{SE09}}',
        anahtar:'TRKORR',
        iliskiler:'Nesneler {{E071}}’de.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'TRKORR', aciklama:'İstek numarası' },
          { ad:'AS4DATE', aciklama:'Serbest bırakılma tarihi — *"bu ayar canlıya ne zaman gitti?"*' },
          { ad:'AS4USER', aciklama:'Sahibi — sorulacak kişi' },
          { ad:'TRSTATUS', aciklama:'Durum — **R** serbest bırakılmış' },
        ] },

      { ad:'E071', baslik:'Taşıma isteği nesneleri — çakışma teşhisi',
        tutar:'Bir isteğin **tam olarak neyi** taşıdığı.',
        olusturan:'{{SE09}}',
        anahtar:'TRKORR + PGMID + OBJECT + OBJ_NAME',
        iliskiler:'{{E070}} başlığına bağlı.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'OBJECT', aciklama:'Nesne türü — `TABU` tablo, `PROG` program' },
          { ad:'OBJ_NAME', aciklama:'Nesne adı — **iki isteğin çakışıp çakışmadığı buradan**' },
          { ad:'TRKORR', aciklama:'Hangi istekte' },
        ] },

      { ad:'CDHDR', baslik:'Değişiklik belgesi — "dün çalışıyordu" sorusunun cevabı',
        tutar:'Ana veri ve bazı yapılandırma değişikliklerinin başlığı.',
        olusturan:'Değişiklik yapan her işlem',
        anahtar:'OBJECTCLAS + OBJECTID + CHANGENR',
        iliskiler:'Alan bazında ayrıntı {{CDPOS}}’ta.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'UDATE / UTIME', aciklama:'Ne zaman' },
          { ad:'USERNAME', aciklama:'Kim' },
          { ad:'TCODE', aciklama:'Hangi işlemle' },
        ] },

      { ad:'TCURR', baslik:'Döviz kurları — akım verisi örneği',
        tutar:'Kur tipi + para birimi çifti + tarih bazında kurlar.',
        olusturan:'{{OB08}} veya arayüz',
        anahtar:'KURST + FCURR + TCURR + GDATU',
        iliskiler:'{{konu:foreign-currency}} değerlemesi buradan okur.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'GDATU', aciklama:'Tarih **ters** saklanır — doğrudan okumayı zorlaştırır' },
          { ad:'UKURS', aciklama:'Kur' },
          { ad:'KURST', aciklama:'{{kur-tipi}} — M, B, G' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Değişikliğin izi — kim, ne, ne zaman',
      varliklar:[
        { ad:'E070', rol:'Başlık', hub:true, aciklama:'**Taşıma isteği** — ne zaman canlıya gitti',
          alanlar:[{ ad:'TRKORR', tip:'pk' }, { ad:'AS4DATE' }, { ad:'AS4USER' }] },
        { ad:'E071', rol:'Kalem', aciklama:'**Nesne listesi** — çakışma buradan görülür',
          alanlar:[{ ad:'TRKORR', tip:'fk' }, { ad:'OBJ_NAME', tip:'pk' }] },
        { ad:'CDHDR', rol:'Ana veri', aciklama:'**Değişiklik belgesi** başlığı',
          alanlar:[{ ad:'CHANGENR', tip:'pk' }, { ad:'USERNAME' }, { ad:'UDATE' }] },
        { ad:'CDPOS', rol:'Alan', aciklama:'Eski ve yeni değer',
          alanlar:[{ ad:'CHANGENR', tip:'fk' }, { ad:'FNAME' }] },
        { ad:'TCURR', rol:'Akım verisi', aciklama:'**Taşınmaz** — her sistemde ayrı',
          alanlar:[{ ad:'GDATU', tip:'pk' }, { ad:'UKURS' }] },
      ],
      iliskiler:[
        { from:'E070', to:'E071', alanlar:'TRKORR', not:'istek → nesneler' },
        { from:'CDHDR', to:'CDPOS', alanlar:'CHANGENR', not:'başlık → alan değişiklikleri' },
        { from:'E071', to:'TCURR', alanlar:'—', not:'**bağlantı yok** — akım verisi' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Üç ekran, üç soru: **{{SPRO}}** *"ayar nerede?"*, ' +
      '**{{SE09}}** *"ne taşıyorum?"*, **{{STMS}}** *"sırayla mı gitti?"*',

    ekranlar:[
      { ad:'{{SPRO}} — yapılandırma ağacı',
        aciklama:'Ayarın yapıldığı yer.',
        alanlar:[
          { ad:'**Belge simgesi ()**', zorunlu:false, aciklama:'SAP’ın kendi açıklaması. ' +
                   'Ayarın **geri alınabilir olup olmadığı** genelde burada yazar.' },
          { ad:'Düğümdeki işlem kodu', zorunlu:false, aciklama:'Yazılıdır — `OB*` ezberi gereksiz.' },
          { ad:'{{tasima-istegi}}', zorunlu:true, aciklama:'Sorulmadıysa tablo ' +
                   '**{{akim-verisi}}**dir.' },
        ],
        ipucu:'IMG belgesini okumak bu konudaki **en yüksek getirili alışkanlıktır**.' },

      { ad:'{{SE09}} — istek içeriği',
        aciklama:'Neyin taşındığı ve neyle çakıştığı.',
        alanlar:[
          { ad:'Nesne listesi', zorunlu:true, aciklama:'Taşımadan **önce** okunur.' },
          { ad:'Çakışma kontrolü', zorunlu:false, aciklama:'Aynı nesneye dokunan ' +
                   'başka bekleyen istek var mı?' },
        ],
        ipucu:'İstek **küçük ve amaç odaklı** olmalı; "her şey içinde" tek istek geri alınamaz.' },

      { ad:'{{STMS}} — kuyruk ve sıra',
        aciklama:'Hedef sisteme aktarım.',
        alanlar:[
          { ad:'**Sıra**', zorunlu:true, aciklama:'Serbest bırakılma sırasıyla. ' +
                   'Ters sırada **eski hâl yeniyi ezer**.' },
          { ad:'Dönüş kodu', zorunlu:true, aciklama:'8 hata · 4 uyarı — ' +
                   '**4 de masum değildir**.' },
        ],
        ipucu:'Kuyruk **bütün olarak** aktarılır; seçmeli aktarım sırayı bozar.' },
    ],

    zorunlu:['Karar sınıfı (tek/çift yönlü)','Gerekçe kaydı','Taşıma isteği','Negatif test'],
    opsiyonel:['Regresyon çekirdek kümesi','Karar tutanağı imzası'],

    hatalar:[
      { mesaj:'"Test sisteminde çalışıyordu, canlıda çalışmıyor"', sebep:'En sık: tablo {{akim-verisi}} — taşımaya hiç girmedi.', cozum:'Canlıda **ayrıca** ayarlanır. Sonraki iki ihtimal: {{tasima-sirasi}} çakışması, bağımlı nesne eksik.' },
      { mesaj:'Taşıma RC 0 ama ayar canlıda eski hâlinde', sebep:'Başka bir istek **sonra** taşınıp üzerine yazmış.', cozum:'{{E071}}’de ortak nesne aranır; doğru sırayla yeniden taşınır.' },
      { mesaj:'"Nesne başka bir istekte kilitli"', sebep:'Aynı nesne serbest bırakılmamış başka istekte.', cozum:'Bu kilit **koruyucudur** — çakışmayı önler. Diğer istek serbest bırakılır.' },
      { mesaj:'Kural kurdum ama çalışmıyor', sebep:'{{konu:dogrulama-ikame}}: **etkinleştirme adımı** atlanmış ({{GGB4}}).', cozum:'{{negatif-test}} bunu yakalar; pozitif test **göremez**.' },
      { mesaj:'Uyarı çıkıyor, kullanıcılar geçiyor', sebep:'Mesaj tipi **W** bırakılmış.', cozum:'Kritik kontrol **E** yapılır ({{OBA5}}). W ile kurulan kural ilk yoğun günde fiilen kalkar.' },
      { mesaj:'Bir ayarı düzelttim ama geçmiş kayıtlar hâlâ yanlış', sebep:'Ayar geri alınabilir, **veri geri alınamaz**.', cozum:'Düzeltme/aktarım kaydı gerekir. Bu, kararın ne kadar "geri alınabilir" olduğunun gerçek ölçüsüdür.' },
      { mesaj:'Yıllar sonra "bu neden böyle kurulmuş?" sorusu cevapsız', sebep:'Gerekçe yazılmamış; SAP **ne yapıldığını** tutar, **neden**i tutmaz.', cozum:'Karar kaydı: neyi çözüyor · hangi alternatifler elendi · hangi varsayıma dayanıyor.' },
    ],

    ipuclari:[
      'Her ayarda tek soru: **"veri yazıldıktan sonra geri alınabilir mi?"**',
      'Tek yönlü kapıda doğru soru *"bugün istiyor muyuz?"* değil, **"üç yıl içinde?"**',
      'Şüphedeyken **açık kur, kullanma** — kapatıp pişman olmaktan ucuz.',
      'Kararı **gerekçesiyle** yaz: neyi çözüyor, ne elendi, hangi varsayım.',
      'Çözüm sırası: **standart ayar → {{badi}} → modifikasyon**.',
      '{{tasima-istegi}}ni **küçük ve amaç odaklı** tut.',
      'Taşımadan **önce** {{E071}} içeriğine bak, sonra değil.',
      'Her kontrolde **{{negatif-test}}** yap — pozitif test kontrolü göremez.',
      'Kritik kontrol **W ise E yap**; {{OBA5}} susturma aracı değildir.',
      'Sabit bir {{regresyon-testi}} çekirdek kümesi tut ve her taşımadan sonra koş.',
      '{{akim-verisi}} tablolarını canlıda **ayrıca** ayarla ve **kimin yazabileceğini** seç.',
      'Her sessiz hata sınıfını bir **kontrol sorgusuna** çevir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'E070', ne:'Taşıma isteği başlığı — **ne zaman canlıya gitti**' },
      { tablo:'E071', ne:'Nesne listesi — **çakışma teşhisi**' },
      { tablo:'CDHDR', ne:'Değişiklik belgesi — kim, ne zaman' },
      { tablo:'CDPOS', ne:'Alan bazında eski/yeni değer' },
      { tablo:'TCURR', ne:'{{akim-verisi}} — taşınmaz' },
    ],

    commit:
      'Yapılandırma değişikliği **anında** yazılır ve {{tampon}}lanır. ' +
      'Bu iki sonuç doğurur:\n\n' +
      '**1.** Ayarı değiştirdiniz ama etkisini görmüyorsanız, ' +
      'sebep tampon olabilir — `/$sync` ile temizlenir ' +
      '(bkz. {{konu:tcodes}}).\n\n' +
      '**2.** Yapılandırma değişikliği **çalışan işlemleri etkilemez** ' +
      'ama bir sonraki kaydı etkiler. Bu yüzden canlıda yapılandırma ' +
      'değişikliği **yoğun saatlerde yapılmaz**: yarısı eski, yarısı ' +
      'yeni ayarla kaydedilmiş belgeler teşhis edilmesi zor bir ' +
      'tutarsızlık üretir.',

    belgeNo:
      'Yapılandırma değişikliklerinin "belge numarası" {{tasima-istegi}} ' +
      'numarasıdır. **Bu numara bir denetim aracıdır** ve az kullanılır:\n\n' +
      '*"Bu ayar canlıya ne zaman gitti?"* → {{E070}}.`AS4DATE`\n' +
      '*"Kim yaptı?"* → {{E070}}.`AS4USER`\n' +
      '*"Tam olarak neyi değiştirdi?"* → {{E071}}\n\n' +
      'Bu üçlü, {{konu:error-handling}}’deki **"dün çalışıyordu"** ' +
      'sorusunun yapılandırma tarafındaki cevabıdır. ' +
      'Ana veri tarafında karşılığı {{CDHDR}}/{{CDPOS}}’tur.',

    postingLogic:
      'Yapılandırmanın kayda etkisi **üç katmanlıdır** ve teşhis bu sırayla yapılır:\n\n' +
      '**1. Var mı?** Hesap belirleme, numara aralığı, dönem. ' +
      'Yoksa kayıt **durur** — konuşan hata.\n\n' +
      '**2. Doğru mu?** {{mutabakat-hesabi}}, {{vergi-kodu}}, hesap ataması. ' +
      'Yanlışsa kayıt **geçer** — sessiz hata.\n\n' +
      '**3. Zorlayıcı mı?** Doğrulama kuralları, mesaj tipi (W/E), ' +
      'yetkilendirme. Zayıfsa kural **fiilen yoktur**.\n\n' +
      'Danışman özenini bu sıraya göre dağıtır: birinci katman kendini ' +
      'gösterir, **ikinci ve üçüncü göstermez**.',

    belgeTuru:
      'Belge türü tasarımı da bir iyi pratik konusudur ve iki kural taşır:\n\n' +
      '**1. Ayrı amaç → ayrı belge türü.** Geçiş kayıtları, düzeltme kayıtları ' +
      've tekrarlayan kayıtlar ayrı türlerle kesilir; sonradan ' +
      '{{BKPF}}.`BLART` ile **süzülebilir** olurlar.\n\n' +
      '**2. Belge türü bir yetki nesnesidir.** `F_BKPF_BLA` ile ' +
      'kimin hangi türde kayıt atabileceği kontrol edilir. ' +
      'Bu, {{dort-goz}} prensibinin en sessiz kurulma yollarından biridir.\n\n' +
      'Aşırıya kaçmamak gerekir: her senaryoya ayrı belge türü açmak ' +
      'kullanıcıyı yorar ve yanlış seçim riskini artırır.',

    numberRange:
      'Numara aralıkları bir {{tek-yonlu-kapi}}ya yakındır: ' +
      'aralık **daraltılamaz** (kullanılmış numaralar vardır) ve ' +
      'aralıklar **çakışamaz**.\n\n' +
      'Ayrıca numara aralıkları çoğu sistemde **taşınmaz** — ' +
      'her sistemde ayrıca tanımlanır. Bu, "test sisteminde çalışıyordu" ' +
      'vakalarının bir başka sebebidir.\n\n' +
      'Aralık tükenmesi sessiz bir risktir: yıl sonunda ' +
      'kalan kapasite kontrol edilir, tükendiğinde kayıt **durur**.',

    accountDetermination:
      'Hesap belirleme tabloları ({{T030}}, {{OBYC}}, {{VKOA}}, {{T030K}}) ' +
      'bu konunun en iyi örneğidir çünkü **iki katmanda** yanlış olabilirler:\n\n' +
      '**Eksik** → kayıt durur. Konuşan hata, kolay.\n' +
      '**Yanlış** → kayıt geçer, yanlış hesaba yazar. Sessiz hata.\n\n' +
      'Bu yüzden hesap belirleme testinde tek soru yetmez. ' +
      'İki soru sorulur: *"kayıt geçti mi?"* **ve** ' +
      '*"hangi hesaba gitti?"*\n\n' +
      'İkincisi atlanırsa test *"başarılı"* raporlanır ve ' +
      'hata canlıda, ay sonunda bulunur.',

    tur:
      '**Karar türleri ve kim verir:**\n\n' +
      '** Tek yönlü kapı** — kararı **iş tarafı** verir, danışman bilgi verir ' +
      've yazılı hâle getirir.\n\n' +
      '** Çift yönlü kapı** — danışman önerir, iş tarafı onaylar, ' +
      'hızlı geçilir.\n\n' +
      '** Teknik karar** — danışmana aittir (istek büyüklüğü, ' +
      'test kapsamı, adlandırma).\n\n' +
      '**En sık karıştırılan:** teknik görünen bir kararın aslında ' +
      'birinci sınıfa ait olması. *"Hesap numarası kaç haneli olsun?"* ' +
      'teknik bir soru gibi durur; değildir.',

    transport:
      '**Taşıma disiplininin üç kuralı:**\n\n' +
      '**1. Küçük ve amaç odaklı istekler.** Geri alınabilirliğin ön koşuludur.\n\n' +
      '**2. Sırayla taşı.** {{tasima-sirasi}} bozulursa ' +
      '**eski hâl yeniyi ezer** ve hata mesajı çıkmaz.\n\n' +
      '**3. Kuyruğu bütün olarak aktar.** Seçmeli aktarım sırayı bozar; ' +
      '"şu ikisini alalım, diğerleri sonra" cümlesi klasik bir tuzaktır.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Ve taşınmayan üç şey:** {{akim-verisi}} tabloları · ' +
      'numara aralıkları (çoğu durumda) · {{LSMW}} projeleri ' +
      '(kendi dışa/içe aktarması var — bkz. {{konu:lsmw}}).',

    img:[
      { yol:'SPRO → düğümdeki belge simgesi', not:'Ayarın geri alınabilirliği genelde burada yazar' },
      { yol:'SE09 → istek içeriği', not:'Taşımadan **önce** okunur' },
      { yol:'STMS → içe aktarma kuyruğu', not:'**Bütün olarak** aktarılır' },
      { yol:'OBA5 → mesaj kontrolü', not:'Kritik kontrol **W ise E** yapılır' },
    ],

    ekstra:[
      { ic:'🚪', baslik:'Tek yönlü kapı testi — dört soru', metin:
        'Bir ayarın hangi sınıfa ait olduğunu anlamak için ' +
        'listeyi ezberlemek gerekmez. **Dört soru** yeterlidir:\n\n' +
        '━━━━━━━━━━\n\n' +
        '**1. Bu ayar veriye yazılıyor mu?**\n' +
        'Belgeye, kaleme veya ana veriye bir değer olarak giriyorsa ' +
        '(hesap numarası, para birimi, dönem, vergi kodu) ' +
        '→ **muhtemelen tek yönlü**.\n' +
        'Yalnızca çalışma anında okunuyorsa (tolerans, alan durumu) ' +
        '→ ✓ çift yönlü.\n\n' +
        '**2. Ayar kapalıyken üretilmeyen bir veri var mı?**\n' +
        '{{belge-bolme}} kapalıyken {{FAGL_SPLINFO}} **hiç oluşmaz**. ' +
        'Sonradan açmak geçmişi tamamlamaz.\n' +
        '→ **Tek yönlü.**\n\n' +
        '**3. Değiştirirsem geçmiş kayıtlar taşınır mı?**\n' +
        'Cevap neredeyse her zaman **hayır**dır. Asıl soru şudur: ' +
        '*taşınmaması ne kadar zarar verir?* ' +
        'Bir {{mutabakat-hesabi}} değişikliğinde düzeltme kaydı yeter; ' +
        'bir hesap planı değişikliğinde yetmez.\n\n' +
        '**4. IMG belgesi ne diyor?**\n' +
        'SAP çoğu kritik ayarın belgesinde ' +
        '*"bu ayar üretimde değiştirilmemelidir"* benzeri bir uyarı yazar. ' +
        'Okunmadığı için görülmez.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Şüphedeyken kural:** ayarı **açık kur, kullanma**. ' +
        'Kullanılmayan bir defter, boş bir para birimi alanı veya ' +
        'çalışan ama kimsenin bakmadığı bir bölme bilgisi ' +
        '**neredeyse maliyetsizdir**. Tersi bir projedir.' },

      { ic:'📝', baslik:'Dokümantasyon: SAP "ne"yi tutar, siz "neden"i tutun', metin:
        'Dokümantasyon tavsiyeleri genelde işe yaramaz çünkü ' +
        '**yanlış şeyi** yazmayı önerirler.\n\n' +
        'SAP **ne yapıldığını zaten tutuyor**:\n\n' +
        '• {{CDHDR}}/{{CDPOS}} — ana veride hangi alan, ne zaman, kim tarafından\n' +
        '• {{E070}}/{{E071}} — hangi ayar ne zaman canlıya gitti\n' +
        '• {{SPRO}} — ayarın şu anki hâli zaten orada\n\n' +
        'Bunları bir Word belgesine kopyalamak **çift kayıt** üretir ve ' +
        'ikisi zamanla ayrışır — ayrışınca da ikisi de güvenilmez olur.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Tutulması gereken tek şey: NEDEN.**\n\n' +
        'Üç satır yeter ve bir karar için şunları içerir:\n\n' +
        '**① Neyi çözüyor.** *"Yurtdışı satıcı ödemelerinde iki ayrı ' +
        'ödeme yöntemi gerekiyordu."*\n' +
        '**② Hangi alternatifler elendi ve neden.** *"Tek yöntemle ' +
        'banka ayrımı yapılamıyordu."*\n' +
        '**③ Hangi varsayıma dayanıyor.** **En değerli satır budur.** ' +
        '*"Yalnızca iki bankayla çalışıldığı varsayımıyla."*\n\n' +
        'Üçüncü satır, kararın **ne zaman gözden geçirilmesi gerektiğini** ' +
        'söyler. Üçüncü banka eklendiğinde bu karar yeniden bakılmalıdır — ' +
        've yazılı olmasaydı kimse bilmezdi.\n\n' +
        'Bu, {{konu:dogrulama-ikame}}’deki *"kural 2024’te doğruydu"* ' +
        'vakasının **önleyicisidir**: o kuralın da bir varsayımı vardı ' +
        've yazılmamıştı.' },

      { ic:'🧪', baslik:'Test senaryosu yazımı — üç kural', metin:
        'FI test senaryolarının çoğu şöyle yazılır: ' +
        '*"{{FB60}} ile satıcı faturası gir, kaydet, belge oluştuğunu doğrula."*\n\n' +
        'Bu senaryo neredeyse hiçbir şey test etmez.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Kural 1 — Sonucu değil, DOĞRU sonucu doğrula.**\n\n' +
        '*"Belge oluştu"* yetmez. *"`320` hesabına gitti mi?"*, ' +
        '*"KDV `191`’e mi düştü?"*, *"vade doğru hesaplandı mı?"* ' +
        '{{konu:mm-integration}}’deki OBYC hataları tam olarak ' +
        'bu eksiklik yüzünden canlıya çıkar.\n\n' +
        '**Kural 2 — {{negatif-test}} olmadan test tamamlanmaz.**\n\n' +
        'Kurulan her kontrol **bilerek ihlal edilir**: kapalı döneme kayıt ' +
        'denenir, zorunlu alan boş bırakılır, dört-göz kuralı tek ' +
        'kullanıcıyla test edilir.\n\n' +
        'Sebebi basit: bir kontrol **yalnızca ihlal edildiğinde** görünür. ' +
        'Etkinleştirilmemiş bir doğrulama kuralı pozitif testte ' +
        '**mükemmel** çalışıyor gibi durur.\n\n' +
        '**Kural 3 — Test verisi "temiz" olmamalı.**\n\n' +
        'Gerçek hayatta veriler yuvarlak değildir. Test kümesine ' +
        'bilinçli olarak şunlar konur: kuruşlu tutarlar · dövizli belge · ' +
        'iskontolu fatura · çok kalemli belge · uzun satıcı adı · ' +
        'Türkçe karakterli metin.\n\n' +
        '{{konu:sd-integration}}’deki *"KDV iskontodan sonra hesaplanır"* ' +
        'hatası yalnızca **iskontolu** bir test verisiyle yakalanır.' },
    ],

    notlar:[
      { tip:'tip', baslik:'Z geliştirme bir maliyet değil, bir borçtur', metin:
        '{{z-gelistirme}} kararı genelde tek seferlik bir maliyetle ' +
        'değerlendirilir: *"şu geliştirme 15 adam-gün."*\n\n' +
        'Bu hesap eksiktir. **Geliştirme bir borçtur ve faizi vardır:**\n\n' +
        '• Her destek paketinde uyumluluk kontrolü\n' +
        '• Her sürüm yükseltmesinde {{SPAU}} ile elle uyarlama\n' +
        '• Her yeni danışmana devir\n' +
        '• Ve en pahalısı: **{{konu:migration}}’da taşınma yükü**\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Üç seviye, üç farklı faiz oranı:**\n\n' +
        '**① Özel rapor** — standardı değiştirmez, sürüm yükseltmede ' +
        'genelde sorunsuzdur. **Faiz düşük.**\n' +
        '**② {{badi}} / genişletme** — SAP’ın izin verdiği noktadan bağlanır. ' +
        '**Faiz orta.**\n' +
        '**③ Modifikasyon** — standart kod değiştirilir. ' +
        'Her yükseltmede {{SPAU}} ile elle ele alınır. **Faiz yüksek.**\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Asıl sorun yazmak değil, envanteri kaybetmektir.** ' +
        'Beş yıl sonra hangi geliştirmenin hâlâ kullanıldığı bilinmez ve ' +
        '**hepsi** yükseltmeye taşınır — kullanılmayanlar dahil.\n\n' +
        'Basit önlem: her geliştirmenin **son kullanım tarihi** izlenir. ' +
        'Bir yıldır çalışmamış bir program, taşınmadan önce sorgulanır.' },

      { tip:'warn', baslik:'Danışmanın en pahalı alışkanlığı: "sonra bakarız"', metin:
        'Proje baskısı altında en sık kurulan cümle budur ve ' +
        '**çift yönlü kapılarda tamamen doğrudur**.\n\n' +
        'Tehlike, cümlenin **yanlış kapıda** kullanılmasıdır.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**"Sonra bakarız" demenin güvenli olduğu yerler:**\n' +
        '{{odeme-kosulu}} · tolerans · alan durumu · rapor düzeni · ' +
        'ihtar prosedürü · kullanıcı yetkileri\n\n' +
        '**Asla denemeyeceğin yerler:**\n' +
        '{{hesap-plani}} · {{belge-bolme}} · para birimi · ' +
        '{{mali-yil-varyanti}} · defter yapısı · {{amortisman-alani}}\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Ayrımı yapmanın maliyeti çok düşüktür:** bir soru sormak ' +
        've cevabı yazmak. Yapmamanın maliyeti bir sonraki projedir.\n\n' +
        'Bu yüzden konunun tezi bir liste değil, bir **refleks** öneriyor: ' +
        'her ayarda, karar vermeden önce, ' +
        '*"bu ayar veriye yazılıyor mu?"* diye sormak.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'S/4HANA iyi pratikleri **değiştirmedi** ama iki tanesini ' +
      '**kolaylaştırdı** (mutabakat ve raporlama) ve ' +
      'bir tanesini **zorlaştırdı**: {{z-gelistirme}} yükü artık ' +
      'yalnızca bir bakım maliyeti değil, aynı zamanda bir **geçiş engelidir**.',

    eccFarklari:[
      { konu:'{{tek-yonlu-kapi}} kavramı', ecc:'Geçerli', s4:'**Aynen geçerli** — hatta bazıları arttı' },
      { konu:'FI–CO mutabakatı', ecc:'Ayrı program ve kontrol', s4:'**Yapısal olarak gereksiz**' },
      { konu:'{{toplam-tablosu}} tutarsızlığı', ecc:'Mutabakat programı gerekir', s4:'**Ortadan kalktı** — toplam hesaplanır' },
      { konu:'{{z-gelistirme}}', ecc:'Bakım maliyeti', s4:'**Geçiş engeli** — {{basitlestirme-listesi}}’nde çıkar' },
      { konu:'Raporlama geliştirmesi', ecc:'Çoğu için ABAP rapor gerekir', s4:'{{cds-view}} + {{gomulu-analitik}}' },
      { konu:'Taşıma disiplini', ecc:'{{STMS}} / {{E070}}', s4:'**Aynı** — değişmedi' },
      { konu:'{{akim-verisi}}', ecc:'Var', s4:'**Aynı** — {{OB52}}, {{TCURR}} hâlâ taşınmaz' },
      { konu:'Yeni tek yönlü kapı', ecc:'—', s4:'{{is-ortagi}} numaralandırma stratejisi' },
    ],

    universalJournal:
      '{{evrensel-kayit-defteri}} bir iyi pratiği **gereksiz kıldı**: ' +
      'FI ile CO arasındaki mutabakat.\n\n' +
      'ECC’de bu düzenli bir kontroldü çünkü iki ayrı tablo kümesi ' +
      'ayrışabiliyordu. S/4HANA’da **tek satır kaynağı** olduğu için ' +
      'ayrışma **yapısal olarak imkânsızdır**.\n\n' +
      'Bu, konunun genel ilkesinin güzel bir örneğidir: ' +
      '**en iyi kontrol, gereksiz hâle gelen kontroldür.** ' +
      'Bir hatayı yakalamaktansa **oluşmasını imkânsız kılmak** her zaman ucuzdur.\n\n' +
      'Ama dikkat: gereksizleşen kontrolü **kaldırmak** da bir karardır. ' +
      'Eski kapanış kontrol listelerinde o adım hâlâ duruyorsa, ' +
      'her ay boşuna zaman harcanıyor demektir.',

    kalkanTcodes:[
      { eski:'FI–CO mutabakat programları', yeni:'**Gereksiz**', not:'Tek satır kaynağı' },
      { eski:'Toplam tablosu mutabakatı', yeni:'**Gereksiz**', not:'Toplamlar hesaplanıyor' },
      { eski:'Özel bakiye raporları', yeni:'{{cds-view}} / {{gomulu-analitik}}', not:'ABAP yazmadan' },
      { eski:'{{SE09}} / {{STMS}}', yeni:'**Aynen duruyor**', not:'Taşıma disiplini değişmedi' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'{{fiori}} arayüzü; ' +
             'arka planda **aynı** yapılandırmayı kullanır — ' +
             'bildiğiniz ayarlar aynen geçerli.' },
      { ad:'Rol tasarımı = arayüz tasarımı', aciklama:'Fiori’de kullanıcı ' +
             'yalnızca rolündeki uygulamaları görür. Yetkilendirme artık ' +
             'aynı zamanda bir **kullanılabilirlik** kararıdır.' },
      { ad:'Custom Fields and Logic', aciklama:'Alan ekleme ve basit mantık ' +
             'için **modifikasyonsuz** yol — {{z-gelistirme}} borcunu düşürür.' },
    ],

    compatibilityViews:[
      'Eski tabloları okuyan {{z-gelistirme}}ler {{uyumluluk-view}} ' +
      'üzerinden çalışır ve **yavaşlayabilir** — geçiş sonrası ' +
      'performans şikâyetlerinin ana sebebi budur (bkz. {{konu:s4-yenilikleri}}).',
      'Bu, geliştirme envanteri tutmanın **somut** getirisidir: ' +
      'hangi programın hangi tabloyu okuduğunu bilen ekip, ' +
      'geçiş sonrası neyi uyarlayacağını da bilir.',
    ],

    performans:
      'S/4HANA yapılandırma performansını doğrudan etkilemez ama ' +
      'bir iyi pratiği daha **görünür** kılar: gereksiz karmaşıklığın maliyeti.\n\n' +
      'Çok sayıda {{paralel-defter}}, aşırı ayrıntılı {{hesap-plani}} veya ' +
      'gereksiz {{amortisman-alani}} eskiden yalnızca **bakım** yüküydü. ' +
      '{{ACDOCA}} her boyutu her satırda taşıdığı için artık ' +
      '**veri hacmi** yükü de var.\n\n' +
      'Yine de kural değişmedi: **şüphedeyken açık kur.** ' +
      'Kullanılmayan bir defter, sonradan açılamayan bir defterden ' +
      'her zaman ucuzdur.',

    bestPractices:[
      '{{tek-yonlu-kapi}} listesi S/4HANA’da da **aynen geçerli**.',
      'Gereksizleşen kontrolleri kapanış listesinden **çıkar** (FI–CO mutabakatı).',
      '{{z-gelistirme}} envanteri tut — artık bir **geçiş engeli**.',
      'Yeni raporlama ihtiyaçlarında önce {{cds-view}}’e bak, ABAP’a değil.',
      'Alan ekleme için **Custom Fields and Logic** — modifikasyon değil.',
      'Taşıma disiplini değişmedi: küçük istek, doğru sıra, bütün kuyruk.',
      '{{akim-verisi}} hâlâ taşınmıyor — canlıda ayrıca ayarla.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'"Segment raporu istemiyoruz" — sekiz ay sonra istendi',
    hikaye:
      '**Marmara Endüstri A.Ş.** iki iş kolunda çalışıyordu: ' +
      'ambalaj ve kimya. İkisi de aynı şirket kodunda, aynı hesap planında.\n\n' +
      'Kurulum toplantısında {{belge-bolme}} gündeme geldi. ' +
      'Mali işler müdürü netti:\n\n' +
      '*"Segment bazlı bilanço istemiyoruz. Tek bir bilançomuz var, ' +
      'iş kolu ayrımını gider tarafında {{kar-merkezi}} ile yapıyoruz. ' +
      'Bölmeyi açmayalım, sistemi karmaşıklaştırmayalım."*\n\n' +
      'Talep makuldü. Belge bölme kurulumu gerçekten karmaşıktır, ' +
      'ek yapılandırma ve test ister.\n\n' +
      'Danışman kabul etti ve bölme **kapalı** kuruldu.\n\n' +
      '━━━━━━━━━━\n\n' +
      'Canlıya geçiş: **01.01.2028**.\n\n' +
      'Eylül 2028: şirket kimya iş kolu için **yatırımcı görüşmelerine** başladı.\n\n' +
      'Yatırımcının ilk isteği: *"kimya iş kolunun son iki yıllık ' +
      '**bilançosunu** görelim."*',
    veriler:[
      { k:'Şirket kodu', v:'Tek — iki iş kolu içinde' },
      { k:'Belge bölme', v:'**Kapalı** (bilinçli karar)' },
      { k:'Kâr merkezi', v:'Var — **gider tarafında**' },
      { k:'Canlıya geçiş', v:'01.01.2028' },
      { k:'Talep', v:'Eylül 2028 — iş kolu **bilançosu**' },
      { k:'Mevcut', v:'İş kolu **gelir tablosu** ✓' },
      { k:'Olmayan', v:'İş kolu **bilançosu**' },
    ],

    adimlar:[
      { baslik:'Kâr merkezi bazlı bilanço alınamaz mı?', tcode:'FAGLB03',
        aciklama:'İlk ihtimal — belki zaten vardır.',
        girdi:[
          { alan:'Gider hesapları (7xx)', deger:'Kâr merkezi **dolu**' },
          { alan:'Gelir hesapları (6xx)', deger:'Kâr merkezi **dolu**' },
          { alan:'Satıcılar (320)', deger:'**Boş**' },
          { alan:'Alıcılar (120)', deger:'**Boş**' },
          { alan:'Bankalar (102)', deger:'**Boş**' },
        ],
        not:'**{{konu:new-gl}}’deki temel ayrım burada somutlaşıyor.**\n\n' +
             'Gider ve gelir satırları kâr merkezini **zaten taşır** — ' +
             'kullanıcı girer veya {{OKB9}} türetir. Bu yüzden ' +
             'iş kolu **gelir tablosu** sorunsuz çıkıyor.\n\n' +
             'Sorun **bilanço satırlarındadır**: satıcı, müşteri, banka, vergi. ' +
             'Bunlara kimse kâr merkezi girmez — ' +
             've {{belge-bolme}} kapalıysa sistem de **türetmez**.\n\n' +
             'Yani bilanço kalemlerinin iş kolu bilgisi ' +
             '**hiç oluşmamıştı**.' },

      { baslik:'Bölmeyi şimdi açsak?', tcode:'SPRO',
        aciklama:'İkinci ihtimal — ayarı değiştirmek.',
        girdi:[
          { alan:'Ayar değiştirilebilir mi?', deger:'Teknik olarak **evet**' },
          { alan:'Geçmiş belgeler bölünür mü?', deger:'**Hayır**' },
          { alan:'{{FAGL_SPLINFO}} geçmiş kayıtlar', deger:'**Boş — ve doldurulamaz**' },
          { alan:'Etki', deger:'Yalnızca **açıldığı tarihten sonraki** belgeler' },
        ],
        not:'**Konunun tezi tam olarak burada.**\n\n' +
             '{{belge-bolme}} ayarı bir onay kutusudur ve ' +
             '**değiştirilebilir**. Ama değiştirmek işe yaramaz.\n\n' +
             'Çünkü sorun ayarda değil, **ayarın üretmediği veridedir**: ' +
             'bölme kapalıyken kaydedilen 20 aylık belgede ' +
             '{{FAGL_SPLINFO}} kaydı **hiç oluşmamıştır**.\n\n' +
             '**Ayar geri alınabilir, veri geri alınamaz.**\n\n' +
             'Ve bir belgeyi geriye dönük bölmek mümkün değildir: ' +
             'bölme, kayıt anında bilinen bilgilerle (hangi gider hangi ' +
             'kâr merkezine gitti) yapılır. O bağlantı kaydedilmemişse ' +
             'sonradan **yeniden kurulamaz** — hangi satıcı borcunun ' +
             'hangi iş koluna ait olduğu artık bir tahmindir.' },

      { baslik:'Elle dağıtalım mı?', tcode:'FBL1N',
        aciklama:'Üçüncü ihtimal — veriyi elle üretmek.',
        girdi:[
          { alan:'Kapsam', deger:'20 ay · **~34.000 bilanço kalemi**' },
          { alan:'Satıcı borçları', deger:'Faturaya inip gider satırına bakmak gerekir' },
          { alan:'Banka hareketleri', deger:'**Çoğu ortak** — ayrıştırılamaz' },
          { alan:'Vergi kalemleri', deger:'Ortak — oransal dağıtım gerekir' },
          { alan:'Sonuç', deger:'**Yaklaşık** bilanço — denetlenemez' },
        ],
        not:'Teknik olarak kısmen mümkün: her satıcı faturasının ' +
             'gider satırındaki kâr merkezine bakılıp borç ona atanabilir.\n\n' +
             '**Ama iki grup kalem ayrıştırılamaz:**\n\n' +
             '• **Ortak bankalar** — tek hesaptan iki iş kolunun ödemesi çıkmış\n' +
             '• **Vergi kalemleri** — tek beyanname, oransal dağıtım gerekir\n\n' +
             'Sonuç bir bilanço değil, bir **tahmindir**. ' +
             'Yatırımcı bunu kabul etmez; denetçi de onaylamaz.\n\n' +
             'Ve dikkat: bu işin maliyeti belge bölmeyi ' +
             'baştan kurmanın maliyetinden **kat kat fazladır** — ' +
             'üstelik sonucu daha kötüdür.' },

      { baslik:'Ne yapıldı?', tcode:'FAGLL03',
        aciklama:'Kabul edilen çözüm.',
        girdi:[
          { alan:'Karar', deger:'Belge bölme **01.01.2029**’da açıldı' },
          { alan:'Geçmiş', deger:'2028 iş kolu bilançosu **üretilemedi**' },
          { alan:'Yatırımcı', deger:'2029 bilançosunu bekledi — **bir yıl**' },
          { alan:'Ek maliyet', deger:'Bölme kurulumu + test + yeniden eğitim' },
          { alan:'Görüşme', deger:'**Ertelendi**' },
        ],
        not:'Bölme sonunda kuruldu — ama **bir yıl geç** ve ' +
             'canlı sistemde, çok daha zor koşullarda.\n\n' +
             'Kurulum sırasında ek bir sorun çıktı: bölme açıldığında ' +
             '**geçmiş açık kalemler** bölünmemiş olarak duruyordu. ' +
             'Onlar kapanana kadar (bazı satıcı bakiyeleri aylarca sürdü) ' +
             'segment bilançosu **karışık** kaldı: bir kısmı bölünmüş, ' +
             'bir kısmı bölünmemiş.\n\n' +
             'Yani gecikmenin bedeli yalnızca bir yıl değildi — ' +
             '**geçiş dönemi** de cabası oldu.' },
    ],

    sonuc:
      '**Bu senaryoda verilen karar yanlış değildi. Eksik olan bilgiydi.**\n\n' +
      'Mali işler müdürü *"segment raporu istemiyoruz"* derken **doğruyu** ' +
      'söylüyordu — o gün gerçekten istemiyorlardı. ' +
      'Danışman da makul davrandı: gereksiz karmaşıklıktan kaçındı.\n\n' +
      'Masada olmayan tek şey şuydu: **bu kararın geri alınamaz olduğu.**\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Üç kalıcı ders:**\n\n' +
      '**1. Tek yönlü kapılarda soru değişir.**\n' +
      'Çift yönlü bir kararda doğru soru *"bugün ne lazım?"*tır.\n' +
      'Tek yönlü bir kararda doğru soru **"üç yıl içinde isteme ' +
      'ihtimalimiz var mı?"**dır.\n\n' +
      'Bu senaryoda ikinci soru sorulsaydı cevap muhtemelen ' +
      '*"aslında kimya kolunu ayırmayı düşünüyoruz"* olurdu.\n\n' +
      '**2. Ayarın geri alınabilirliği, hatanın düzeltilebilirliği değildir.**\n' +
      '{{belge-bolme}} onay kutusu her zaman değiştirilebilir. ' +
      'Değiştirmek **işe yaramaz** çünkü sorun ayarda değil, ' +
      '**ayarın üretmediği veridedir**.\n\n' +
      'Bir ayarın tek yönlü kapı olup olmadığı, ' +
      '*"kapalıyken üretilmeyen bir veri var mı?"* sorusuyla anlaşılır.\n\n' +
      '**3. Şüphedeyken açık kur, kullanma.**\n' +
      'Belge bölme açık kurulup kullanılmasaydı maliyeti ' +
      '**biraz ek yapılandırma ve test** olurdu. ' +
      'Kapalı kurulmasının maliyeti **bir yıl ve ertelenmiş bir ' +
      'yatırımcı görüşmesi** oldu.\n\n' +
      '━━━━━━━━━━\n\n' +
      'Bu asimetri, konunun tamamının özetidir: ' +
      '**tek yönlü kapılarda fazladan hazırlık ucuz, eksik hazırlık pahalıdır.** ' +
      'Ve hangi kapının tek yönlü olduğunu bilmek, ' +
      'bir danışmanın taşıdığı en değerli şeydir.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '**Yapılandırma kararları ikiye ayrılır: geri alınabilenler ve ' +
      'veriyle mühürlenenler.** Risk, ikincisinin listesini bilmemekten doğar.',
      '{{tek-yonlu-kapi}} testi: *"bu ayar kapalıyken üretilmeyen bir veri var mı?"*',
      'Tek yönlü kapıda soru **"bugün istiyor muyuz?"** değil, ' +
      '**"üç yıl içinde isteme ihtimalimiz var mı?"**',
      '**Şüphedeyken açık kur, kullanma** — kapatıp pişman olmaktan ucuz.',
      '**Ayarın geri alınabilirliği ≠ hatanın düzeltilebilirliği.**',
      'Çözüm sırası: **standart ayar → {{badi}} → modifikasyon**; ' +
      '{{z-gelistirme}} bir maliyet değil **borçtur**.',
      'SAP **ne yapıldığını** tutar; siz **neden**i tutun — ' +
      'özellikle **hangi varsayıma** dayandığını.',
      '{{akim-verisi}} taşınmaz — *"test sisteminde çalışıyordu"*nun en sık sebebi.',
      '{{tasima-sirasi}} bozulursa **eski hâl yeniyi ezer** ve hata mesajı çıkmaz.',
      '**{{negatif-test}} olmadan test tamamlanmaz** — kontrol yalnızca ' +
      'ihlal edildiğinde görünür.',
      'Kritik kontrol **W ise E** yapılır; {{OBA5}} susturma aracı değildir.',
    ],

    onemliNoktalar:[
      '**"Bir yapılandırma kararının riskli olup olmadığını nasıl anlarsın?"** Tek soru: **"bu ayar yanlış kurulursa, üzerine veri yazıldıktan sonra geri alınabilir mi?"** Dört alt kontrol: (1) ayar veriye yazılıyor mu (hesap, para birimi, dönem, vergi kodu) · (2) ayar kapalıyken **üretilmeyen bir veri** var mı · (3) değiştirirsem geçmiş taşınır mı (cevap hep hayır — asıl soru *taşınmaması ne kadar zarar verir*) · (4) **IMG belgesi ne diyor**.',
      '**"FI\'daki tek yönlü kapılar neler?"** {{hesap-plani}} ve numaralandırma yapısı · şirket kodunun {{yerel-para-birimi}} ve {{paralel-para-birimi}}leri · {{mali-yil-varyanti}} · **{{belge-bolme}}** · defter yapısı ({{paralel-defter}}) · {{degerleme-plani}} ve {{amortisman-alani}} · kullanılmış {{vergi-kodu}}nun oranı. Karşıtı çift yönlü: {{odeme-kosulu}}, {{tolerans-grubu}}, {{alan-durumu}}, ihtar prosedürü — bunlar hızlı karar verilir, uzun tartışmak **zaman kaybıdır**.',
      '**"Belge bölmeyi sonradan açabilir miyiz?"** **Ayar değişir ama işe yaramaz.** Bölme kapalıyken kaydedilen belgelerde {{FAGL_SPLINFO}} **hiç oluşmamıştır** ve geriye dönük **doldurulamaz** — bölme kayıt anındaki bilgiyle yapılır, o bağlantı kaydedilmemişse yeniden kurulamaz. Sonuç: segment bilançosu **yalnızca açıldığı tarihten sonrası için** anlamlıdır. Bu, "ayar geri alınabilir ama veri geri alınamaz" ilkesinin en net örneğidir.',
      '**"Test sisteminde çalışıyordu, canlıda çalışmıyor. Nereden başlarsın?"** Üç sebep, **bu sırayla**: **①** tablo **{{akim-verisi}}** mi? ({{OB52}}, {{TCURR}}) — taşımaya hiç girmez, her sistemde ayrı ayarlanır. En sık sebep, en hızlı kontrol. **②** {{tasima-sirasi}} çakışması — {{E071}}\'de iki isteğin ortak nesnesi var mı? Ters sırada **eski hâl yeniyi ezer**, hata mesajı çıkmaz. **③** Bağımlı nesne taşınmamış (hesap, vergi kodu test sisteminde elle açılmıştı).',
      '**"Test senaryosu nasıl yazılır?"** Üç kural: **①** Sonucu değil **doğru sonucu** doğrula — "belge oluştu" yetmez, *hangi hesaba gitti?* **②** **{{negatif-test}} olmadan test tamamlanmaz**: kurulan her kontrol **bilerek ihlal edilir**, çünkü kontrol yalnızca ihlal edildiğinde görünür (etkinleştirilmemiş bir doğrulama pozitif testte mükemmel görünür). **③** Test verisi **temiz olmamalı**: kuruşlu tutar, dövizli belge, **iskontolu fatura**, Türkçe karakter.',
      '**"Z geliştirme kararını nasıl verirsin?"** {{standarda-yakin}} ölçütü duygusal değil ticaridir: **"bu farklılık rekabet avantajı sağlıyor mu, yoksa alışkanlık mı?"** Sıra: standart ayar → {{badi}}/genişletme → son çare modifikasyon. Geliştirme bir maliyet değil **borçtur**: her destek paketinde kontrol, her yükseltmede {{SPAU}}, her yeni danışmana devir ve {{konu:migration}}\'da **geçiş engeli**. Asıl sorun yazmak değil **envanteri kaybetmektir**.',
      '**"Ne dokümante edilir?"** **SAP "ne yapıldığını" zaten tutuyor** ({{CDHDR}}/{{CDPOS}}, {{E070}}/{{E071}}, {{SPRO}}); bunları kopyalamak **çift kayıt** üretir ve ikisi zamanla ayrışır. Tutulacak tek şey **NEDEN**: (1) neyi çözüyor (2) hangi alternatifler elendi (3) **hangi varsayıma dayanıyor** — en değerli satır budur, çünkü kararın **ne zaman gözden geçirileceğini** söyler.',
      '**"Bir ayarı düzelttim ama geçmiş kayıtlar hâlâ yanlış."** **Ayarın geri alınabilirliği, hatanın düzeltilebilirliği değildir.** Örnek: satıcının `AKONT` {{mutabakat-hesabi}} {{FK02}} ile beş dakikada düzeltilir, ama **geçmiş kayıtlar taşınmaz** — eski hesapta kalırlar ve bir sınıflandırma aktarım kaydı gerekir. O kaydın da bedeli var: düzeltme G/L seviyesinde yapılır, satıcı kalemleri eski hesabın altında kalır ve {{FBL1N}} ile {{FS10N}} arasındaki köprü bozulur.',
      '**"Taşıma disiplininin kuralları neler?"** **①** İstekler **küçük ve amaç odaklı** — geri alınabilirliğin ön koşulu; "her şey içinde" tek istek geri alınamaz çünkü iyi değişiklikler de geri gider. **②** **Sırayla taşı** — {{tasima-sirasi}} bozulursa eski hâl yeniyi ezer, **hata mesajı çıkmaz**. **③** Kuyruğu **bütün olarak** aktar; seçmeli aktarım sırayı bozar. Ve taşımadan **önce** {{E071}} içeriğine bak: *"olmaması gereken bir şey var mı?"* ve *"bu nesneye dokunan başka bekleyen istek var mı?"*',
    ],

    sikHatalar:[
      { hata:'Tüm yapılandırma kararlarına aynı özeni göstermek.', dogru:'Özen **seçici** olmalı: {{tek-yonlu-kapi}}lara uzun, çift yönlülere kısa zaman.' },
      { hata:'"Şimdilik istemiyoruz" cevabını olduğu gibi kabul etmek.', dogru:'Tek yönlü kapıda doğru soru **"üç yıl içinde isteme ihtimali var mı?"**' },
      { hata:'Ayarın değiştirilebilir olmasına bakıp "geri alınabilir" sanmak.', dogru:'**Ayar geri alınabilir, veri geri alınamaz.** Asıl soru: kapalıyken üretilmeyen veri var mı?' },
      { hata:'Şüphedeyken ayarı kapalı kurmak.', dogru:'**Açık kur, kullanma.** Kullanılmayan defter/bölme neredeyse maliyetsizdir.' },
      { hata:'Yalnızca mutlu yolu test etmek.', dogru:'Kontrol **yalnızca ihlal edildiğinde** görünür. {{negatif-test}} zorunludur.' },
      { hata:'"Belge oluştu" görünce testi başarılı saymak.', dogru:'*Hangi hesaba gitti?* sorusu sorulmalı — hesap belirleme hataları böyle canlıya çıkar.' },
      { hata:'Test verisini yuvarlak ve temiz seçmek.', dogru:'Kuruşlu, dövizli, **iskontolu** ve çok kalemli veri konur; hatalar orada saklıdır.' },
      { hata:'Kritik kontrolü uyarı (W) seviyesinde bırakmak.', dogru:'W ile kurulan kural ilk yoğun günde **fiilen kalkar**. Kritikse **E**.' },
      { hata:'Üç haftalık her şeyi tek taşıma isteğine koymak.', dogru:'Sorun çıkınca **geri alınamaz** — iyi değişiklikler de geri gider.' },
      { hata:'Taşıma kuyruğundan seçmeli aktarım yapmak.', dogru:'Sırayı bozar. Kuyruk **bütün olarak** aktarılır.' },
      { hata:'"Taşındı" ile "çalışıyor"u aynı sanmak.', dogru:'RC 0 yalnızca **kopyalandığını** söyler. Canlıda doğrulama listesi kısa olabilir ama olmalıdır.' },
      { hata:'{{akim-verisi}} tablolarını taşımaya güvenmek.', dogru:'Taşınmazlar. {{OB52}} ve {{TCURR}} canlıda **ayrıca** ayarlanır.' },
      { hata:'SAP’ın zaten tuttuğu bilgiyi Word’e kopyalamak.', dogru:'Çift kayıt ayrışır ve **ikisi de güvenilmez** olur. Yalnızca **neden**i yaz.' },
      { hata:'Gerekçenin varsayım satırını atlamak.', dogru:'En değerli satır odur: kararın **ne zaman gözden geçirileceğini** söyler.' },
      { hata:'Z geliştirmeyi tek seferlik maliyetle değerlendirmek.', dogru:'Bir **borçtur**: destek paketi, {{SPAU}}, devir ve geçiş engeli.' },
      { hata:'Gereksizleşen kontrolleri listede tutmak.', dogru:'S/4HANA’da FI–CO mutabakatı **yapısal olarak gereksiz** — her ay boşuna zaman.' },
    ],

    ipuclari:[
      'Her ayarda refleks soru: **"bu ayar veriye yazılıyor mu?"**',
      'IMG düğümündeki ** belgeyi oku** — geri alınabilirlik genelde orada yazar.',
      'Tek yönlü kapı kararlarını **tutanağa** geçir; iki yıl sonra karar gibi okunsun.',
      'Gerekçenin üç satırı: neyi çözüyor · ne elendi · **hangi varsayım**.',
      'Taşıma isteğini **küçük** tut ve açıklayıcı adlandır.',
      'Taşımadan önce {{E071}}’de **çakışma** kontrol et.',
      'Kuyruğu **bütün olarak** aktar.',
      'Canlıda kısa bir **doğrulama listesi** tut — taşındı ≠ çalışıyor.',
      'Her kontrol için bir **negatif test** yaz; kural ihlal edilerek denenir.',
      'Sabit bir {{regresyon-testi}} çekirdek kümesi: fatura · {{F110}} · tahsilat · {{AFAB}} · kapanış.',
      'Test verisine **iskontolu** ve **dövizli** örnek koy.',
      'Canlıda yapılandırma değişikliğini **yoğun saatlerde yapma**.',
      'Geliştirme envanteri tut; **son kullanım tarihini** izle.',
      'Her sessiz hata sınıfını bir **kontrol sorgusuna** çevir.',
    ],

    quiz:[
      { soru:'Bir yapılandırma kararının "tek yönlü kapı" olup olmadığını anlamanın en güvenilir yolu nedir?',
        secenekler:[
          'Ayarın SPRO’da değiştirilebilir olup olmadığına bakmak',
          '**"Bu ayar kapalıyken üretilmeyen bir veri var mı?" diye sormak**',
          'SAP destek notlarını aramak',
          'Diğer projelerde nasıl yapıldığına bakmak',
        ], dogru:1,
        aciklama:'**Birinci seçenek en yaygın hatadır.** SAP’ta neredeyse ' +
                 'her ayar değiştirilebilir; hiçbiri *"geri alınamaz"* diye ' +
                 'işaretli değildir.\n\n' +
                 '**Kritik olan ayar değil, ayarın ÜRETMEDİĞİ veridir.**\n\n' +
                 '{{belge-bolme}} kapalıyken {{FAGL_SPLINFO}} kaydı ' +
                 '**hiç oluşmaz**. Ayarı sonradan açarsanız yalnızca ' +
                 'yeni belgeler bölünür; geçmiş veri o bilgiyi ' +
                 '**kazanmaz ve kazandırılamaz**.\n\n' +
                 'Bu yüzden doğru soru ayarın kendisiyle değil, ' +
                 '**verinin iziyle** ilgilidir.' },

      { soru:'Müşteri "şimdilik segment raporu istemiyoruz" diyor. Doğru danışman tepkisi nedir?',
        secenekler:[
          'Kabul edip belge bölmeyi kapalı kurmak — müşteri isteği esastır',
          'Israr edip açtırmak',
          '**Bilgiyi eklemek: "bu karar geri alınamaz; üç yıl içinde ihtimal var mı?" ve cevabı yazılı hâle getirmek**',
          'Kararı proje sonuna ertelemek',
        ], dogru:2,
        aciklama:'Danışmanın işi **kararı almak değil**, kararın ' +
                 '**doğru bilgiyle** alınmasını sağlamaktır.\n\n' +
                 'Müşteri *"istemiyoruz"* derken doğruyu söylüyordur — ' +
                 'o gün gerçekten istemiyordur. Masada olmayan tek şey ' +
                 '**kararın geri alınamaz olduğudur**.\n\n' +
                 'Doğru tepkinin üç özelliği var:\n\n' +
                 '**① Kararı almıyor** — müşteriye aittir.\n' +
                 '**② Bilgiyi ekliyor** — "geri alınamaz" bilgisi eksikti.\n' +
                 '**③ Yazılı hâle getiriyor** — iki yıl sonra bu bir hata değil, ' +
                 'bir **karar** olarak okunacak.\n\n' +
                 'Ve tek yönlü kapıda soru değişir: *"bugün istiyor muyuz?"* ' +
                 'değil, **"üç yıl içinde isteme ihtimalimiz var mı?"**' },

      { soru:'"Test sisteminde çalışıyordu, canlıda çalışmıyor." En sık sebep hangisidir?',
        secenekler:[
          'Taşıma isteği hata vermiş',
          'Yetki eksikliği',
          '**Tablo akım verisidir — taşıma isteğine hiç girmez, her sistemde ayrı ayarlanır**',
          'Canlıda özelleştirme kapalı',
        ], dogru:2,
        aciklama:'**{{akim-verisi}}** — ve teşhis sırasında **ilk** bakılacak yer, ' +
                 'çünkü hem en sık sebep hem en hızlı kontrol.\n\n' +
                 'Bazı yapılandırma tabloları taşıma isteğine **hiç girmez**: ' +
                 '{{OB52}} dönem açma, {{TCURR}} kurlar, ihtar tarihleri.\n\n' +
                 'Yani ayar "taşınmadı" değil — **taşınacak bir şey yoktu**. ' +
                 'Test sisteminde dönem açıktı, canlıda değil.\n\n' +
                 '**Diğer iki ihtimal, bu sırayla:**\n' +
                 '**②** {{tasima-sirasi}} çakışması — {{E071}}’de ortak nesne var mı? ' +
                 'Ters sırada **eski hâl yeniyi ezer** ve hata mesajı çıkmaz.\n' +
                 '**③** Bağımlı nesne taşınmamış — hesap veya vergi kodu ' +
                 'test sisteminde elle açılmıştı.' },

      { soru:'Bir doğrulama kuralı kurdunuz. Testi nasıl yaparsınız?',
        secenekler:[
          'Doğru veriyle kayıt atıp geçtiğini doğrularım',
          '**Kuralı bilerek ihlal edip sistemin gerçekten durdurduğunu doğrularım**',
          'Yapılandırma ekranında ayarın kayıtlı olduğuna bakarım',
          'Kullanıcıya sorarım',
        ], dogru:1,
        aciklama:'**{{negatif-test}} — ve bu, test senaryolarının ' +
                 'asıl değerinin bulunduğu yerdir.**\n\n' +
                 'Bir kontrol **yalnızca ihlal edildiğinde** görünür. ' +
                 'Doğru veriyle kayıt atmak, kuralın çalıştığını ' +
                 '**kanıtlamaz** — kural hiç yokken de o kayıt geçerdi.\n\n' +
                 'Somut örnek: {{konu:dogrulama-ikame}}’de kural üç adımda ' +
                 'kurulur — tanımla → ata → **etkinleştir** ({{GGB4}}). ' +
                 'Üçüncü adım sık atlanır ve etkinleştirilmemiş kural ' +
                 '**sessizce hiçbir şey yapmaz**.\n\n' +
                 'Pozitif test bunu **göremez**; negatif test ilk denemede yakalar.\n\n' +
                 'Aynı mantık mesaj tipinde de geçerli: **W** ile kurulan ' +
                 'kural geçilebilir, yani fiilen yoktur. Kritikse **E** olmalı.' },

      { soru:'Satıcının mutabakat hesabı (AKONT) yanlış girilmiş; 20 faturası yanlış hesaba gitmiş. Ana veriyi düzeltmek yeterli mi?',
        secenekler:[
          'Evet, düzeltince geçmiş kayıtlar da taşınır',
          '**Hayır — ayar düzelir ama geçmiş kayıtlar eski hesapta kalır; sınıflandırma düzeltme kaydı gerekir**',
          'Hayır, satıcıyı silip yeniden açmak gerekir',
          'Evet, bir gecelik toplu iş bunu düzeltir',
        ], dogru:1,
        aciklama:'**"Ayarın geri alınabilirliği ≠ hatanın düzeltilebilirliği."**\n\n' +
                 '`AKONT` alanı {{FK02}} ile beş dakikada düzeltilir — ' +
                 'bu bir **çift yönlü kapıdır**. Ama düzeltmeden **sonraki** ' +
                 'kayıtlar yeni hesaba gider; öncekiler eski hesapta **kalır**.\n\n' +
                 'Bir sınıflandırma aktarım kaydı gerekir ' +
                 '(`336` borç / `320` alacak).\n\n' +
                 '**Ve o kaydın da bir bedeli var:** düzeltme G/L seviyesinde ' +
                 'yapılır, satıcı kalemleri hâlâ eski hesabın altında durur. ' +
                 'Bilanço doğrulanır ama {{FBL1N}} ile {{FS10N}} arasındaki ' +
                 '**köprü bozulur**.\n\n' +
                 'Bu yüzden `AKONT`, yükleme öncesi **elle doğrulanması ' +
                 'gereken** az sayıdaki alandan biridir.' },

      { soru:'Yapılandırma kararlarında ne dokümante edilmelidir?',
        secenekler:[
          'Yapılan tüm ayarların ekran görüntüleri',
          'Değiştirilen tablo ve alan adları',
          '**Kararın gerekçesi: neyi çözüyor, hangi alternatifler elendi, hangi varsayıma dayanıyor**',
          'Taşıma isteği numaraları listesi',
        ], dogru:2,
        aciklama:'**SAP "ne yapıldığını" zaten tutuyor:**\n\n' +
                 '{{CDHDR}}/{{CDPOS}} — ana veride hangi alan, ne zaman, kim\n' +
                 '{{E070}}/{{E071}} — hangi ayar ne zaman canlıya gitti\n' +
                 '{{SPRO}} — ayarın şu anki hâli\n\n' +
                 'Bunları ayrıca yazmak **çift kayıt** üretir; ikisi zamanla ' +
                 'ayrışır ve ayrışınca **ikisi de güvenilmez** olur.\n\n' +
                 'Tutmadığı tek şey **neden**dir.\n\n' +
                 '**Üçüncü satır en değerlidir:** *"hangi varsayıma dayanıyor?"* ' +
                 'Çünkü kararın **ne zaman gözden geçirilmesi gerektiğini** söyler. ' +
                 '*"Yalnızca iki bankayla çalışıldığı varsayımıyla"* yazılmışsa, ' +
                 'üçüncü banka eklendiğinde karar yeniden bakılır.\n\n' +
                 'Bu, {{konu:dogrulama-ikame}}’deki *"kural 2024’te doğruydu"* ' +
                 'vakasının **önleyicisidir**.' },

      { soru:'Aynı vergi kodu tablosuna dokunan iki taşıma isteği ters sırada canlıya gitti. Ne olur?',
        secenekler:[
          'Sistem hata verir ve ikinci taşımayı reddeder',
          'Son taşınan kazanır ve bu her zaman doğrudur',
          '**Eski hâl yeniyi ezer ve hiçbir hata mesajı çıkmaz**',
          'İki değişiklik birleştirilir',
        ], dogru:2,
        aciklama:'**{{tasima-sirasi}} sessiz bir hata sınıfıdır.**\n\n' +
                 'Taşıma sistemi isteğin **içeriğini** yazar; ' +
                 '"daha yeni mi?" diye sormaz. Önce serbest bırakılmış ' +
                 'ama **sonra** taşınan bir istek, aradaki değişikliği ' +
                 '**ezer** — ve dönüş kodu **0** döner.\n\n' +
                 'Yani teknik olarak her şey başarılıdır; yalnızca ' +
                 'sonuç yanlıştır.\n\n' +
                 '**Teşhis:** {{E071}}’de iki isteğin ortak nesnesi var mı? ' +
                 'Kuyruk sırası {{STMS}}’te görülür.\n\n' +
                 '**Önlem tasarımdadır:** istekler **küçük ve amaç odaklı** ' +
                 'tutulur, kuyruk **bütün olarak** aktarılır ve ' +
                 'seçmeli aktarımdan kaçınılır.\n\n' +
                 'SAP’ın "nesne başka istekte kilitli" uyarısı da ' +
                 'tam olarak bunu önlemek içindir — o kilit **koruyucudur**.' },

      { soru:'Şüphedeyken (örneğin paralel defter ihtiyacı belirsizken) ne yapılır?',
        secenekler:[
          'Kapalı kurulur, ihtiyaç doğarsa açılır',
          '**Açık kurulur ama kullanılmaz — sonradan açmak mümkün olmayabilir**',
          'Karar proje sonuna ertelenir',
          'İki ayrı sistem kurulur',
        ], dogru:1,
        aciklama:'**"Şüphedeyken açık kur, kullanma."**\n\n' +
                 'Sebebi bir **maliyet asimetrisidir**:\n\n' +
                 '**Açık kurup kullanmamak:** biraz ek yapılandırma, ' +
                 'biraz ek test. Kullanılmayan bir defter, boş bir para birimi ' +
                 'alanı veya kimsenin bakmadığı bir bölme bilgisi ' +
                 '**neredeyse maliyetsizdir**.\n\n' +
                 '**Kapalı kurup sonra ihtiyaç duymak:** ' +
                 'ayar açılsa bile **geçmiş veri o bilgiyi kazanmaz**. ' +
                 'Yeni bir defter açılırsa geçmiş yıllar o defterde ' +
                 '**değerlenmemiştir**; belge bölme açılırsa geçmiş belgeler ' +
                 '**bölünmez**.\n\n' +
                 'Fazladan hazırlık **ucuz**, eksik hazırlık **pahalıdır** — ' +
                 've bu asimetri tek yönlü kapıların tamamında geçerlidir.' },
    ],

    flashcards:[
      { on:'Konunun tezi — tek cümle', arka:'**Yapılandırma kararları ikiye ayrılır:**\n**geri alınabilenler** ve **veriyle mühürlenenler**\n\nRisk, ikincisinin **listesini bilmemekten** doğar\n\nSAP’ta hiçbir ayar "geri alınamaz" diye işaretli değildir' },
      { on:'Tek yönlü kapı testi', arka:'**"Bu ayar kapalıyken ÜRETİLMEYEN bir veri var mı?"**\n\nDört alt kontrol:\n① Ayar veriye yazılıyor mu?\n② Kapalıyken oluşmayan kayıt var mı?\n③ Değişirse geçmiş taşınır mı?\n④ **IMG belgesi ne diyor?**' },
      { on:'FI tek yönlü kapılar', arka:'{{hesap-plani}} + numaralandırma\n{{yerel-para-birimi}} / {{paralel-para-birimi}}\n{{mali-yil-varyanti}}\n**{{belge-bolme}}**\nDefter yapısı ({{paralel-defter}})\n{{degerleme-plani}} / {{amortisman-alani}}\nKullanılmış {{vergi-kodu}} oranı' },
      { on:'Çift yönlü kapılar', arka:'{{odeme-kosulu}} · {{tolerans-grubu}} · {{alan-durumu}}\nihtar prosedürü · yetkiler · rapor düzeni\n\n**Hızlı karar ver, gerekirse değiştir**\n\nAma: değiştirmek **geçmişi düzeltmez**\n\nToplantı süresinin çoğu buraya harcanıyor — oysa risk diğer listede' },
      { on:'Doğru soru değişir', arka:'**Çift yönlü kapıda:**\n*"Bugün ne lazım?"*\n\n**Tek yönlü kapıda:**\n**"Üç yıl içinde isteme ihtimalimiz var mı?"**\n\nve şüphedeyken:\n**AÇIK KUR, KULLANMA**' },
      { on:'Ayar ≠ Hata', arka:'**"Ayarın geri alınabilirliği,\nhatanın düzeltilebilirliği DEĞİLDİR."**\n\n`AKONT` → {{FK02}} ile 5 dakika ✓\nAma geçmiş kayıtlar **eski hesapta kalır**\n→ sınıflandırma aktarım kaydı gerekir\n→ ve {{FBL1N}} ↔ {{FS10N}} köprüsü bozulur' },
      { on:'"Test sisteminde çalışıyordu"', arka:'**① {{akim-verisi}}** — en sık, en hızlı kontrol\n{{OB52}} · {{TCURR}} → **taşımaya hiç girmez**\n\n**②** {{tasima-sirasi}} çakışması\n{{E071}}’de ortak nesne? → eski hâl yeniyi **ezer**\n\n**③** Bağımlı nesne taşınmamış' },
      { on:'Taşıma disiplini — üç kural', arka:'**①** İstek **küçük ve amaç odaklı**\n(yoksa geri alınamaz)\n\n**②** **Sırayla taşı**\nters sıra → eski hâl yeniyi ezer, **hata mesajı yok**\n\n**③** Kuyruğu **bütün olarak** aktar\nseçmeli aktarım sırayı bozar' },
      { on:'Test — üç kural', arka:'**①** Sonucu değil **DOĞRU sonucu** doğrula\n"belge oluştu" ✕ → *hangi hesaba gitti?* ✓\n\n**②** **{{negatif-test}}** — kural **bilerek ihlal edilir**\n(kontrol yalnızca ihlal edilince görünür)\n\n**③** Test verisi **temiz olmasın**\nkuruşlu · dövizli · **iskontolu** · Türkçe karakter' },
      { on:'Ne dokümante edilir?', arka:'SAP **"ne"yi zaten tutuyor**:\n{{CDHDR}}/{{CDPOS}} · {{E070}}/{{E071}} · {{SPRO}}\n\nSiz **NEDEN**i tutun:\n① Neyi çözüyor\n② Ne elendi\n③ **Hangi varsayıma dayanıyor**\n\n→ ③ kararın **ne zaman gözden geçirileceğini** söyler' },
      { on:'Z geliştirme = borç', arka:'Tek seferlik maliyet **değil**, faizli borç:\n• her destek paketi\n• her yükseltmede {{SPAU}}\n• her yeni danışmana devir\n• **geçiş engeli**\n\n① Özel rapor — faiz düşük\n② {{badi}} — faiz orta\n③ Modifikasyon — faiz yüksek\n\nAsıl sorun: **envanteri kaybetmek**' },
      { on:'Senaryonun dersi', arka:'*"Segment raporu istemiyoruz"* → bölme **kapalı**\n8 ay sonra: iş kolu **bilançosu** istendi\n\nGider satırları kâr merkezi taşıyordu ✓\n**Bilanço satırları taşımıyordu** ✕\n\n{{FAGL_SPLINFO}} geçmişte **hiç oluşmamıştı**\n→ geriye dönük **doldurulamaz**\n\nKarar yanlış değildi — **eksik olan bilgiydi**' },
    ],
  },

  },
});
