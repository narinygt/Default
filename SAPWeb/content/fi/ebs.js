/* ==========================================================================
   content/fi/ebs.js — "Electronic Bank Statement (Elektronik Banka Ekstresi)"
   ========================================================================== */

SAP.registerTopic({
  id: 'ebs',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Elektronik Banka Ekstresi (EBS), bankadan gelen **standart formatlı bir dosyanın** sisteme ' +
      'yüklenmesi ve içindeki satırların otomatik muhasebeleştirilmesidir.\n\n' +
      'Süreç üç katmandan oluşur: **dosya yükleme** ({{FF_5}}) → **otomatik yorumlama ve kayıt** ' +
      '(kayıt kuralları) → **eşleşmeyenlerin elle düzeltilmesi** ({{FEBAN}}).\n\n' +
      'EBS’in özü şudur: banka her hareket için bir **işlem kodu** gönderir; sistem bu kodu bir ' +
      '**kayıt kuralına** eşler; kural hangi hesapların çalışacağını söyler. ' +
      'Ayrıca açıklama metninden ({{ekstre-eslestirme}}) belge numarası aranarak açık kalem kapatılmaya çalışılır.',

    neden:
      '**Hacim.** Günde 300 satırlık ekstreyi elle girmek pratik değildir; hem yavaş hem hatalıdır.\n\n' +
      '**Doğruluk.** Otomatik yorumlama, elle giriş hatalarını ortadan kaldırır ve ' +
      'bakiye kontrolü dosyadan gelir.\n\n' +
      '**Hız.** Manuel mutabakat günler sürerken EBS ile saatlere iner. ' +
      'Tipik bir kurulumda satırların **%80–90’ı otomatik eşleşir**; insan yalnızca kalanla ilgilenir.\n\n' +
      '**Nakit görünürlüğü.** Ekstre günlük yüklendiğinde banka bakiyesi neredeyse gerçek zamanlı bilinir.',

    sirketOnemi:
      'EBS, FI-BL’deki **en yüksek getirili tek iyileştirmedir**. Kurulumu birkaç haftalık bir iştir; ' +
      'getirisi her gün tekrar eder.\n\n' +
      'Danışmanlık açısından EBS, "yapılandırması zor ama mantığı basit" bir konudur. ' +
      'Zorluk {{OT83}}’ün çok katmanlı yapısındadır: hesap sembolleri → sembol hesap ataması → ' +
      'kayıt kuralları → işlem kodu ataması. Bu dört katman doğru kurulmadan hiçbir satır otomatik kaydedilmez.\n\n' +
      'Mülakatta ayırt edici soru: **"Hesap sembolü (account symbol) nedir, neden kullanılır?"** — ' +
      'bu soru adayın EBS’i gerçekten kurup kurmadığını ölçer.',

    gercekHayat:
      'Bir perakende zinciri 4 bankada 11 hesap kullanıyor ve günde ortalama 340 ekstre satırı alıyor.\n\n' +
      'EBS öncesi: iki kişi tam zamanlı ekstre giriyor, mutabakat ay sonunda 4 gün sürüyor, ' +
      'ara hesap bakiyesi sürekli 1–2 milyon TL arasında dolaşıyor.\n\n' +
      'EBS sonrası: dosyalar her sabah otomatik yükleniyor, 340 satırın 291’i (%86) kendiliğinden ' +
      'kaydediliyor. Kalan 49 satır {{FEBAN}}’da bir kişi tarafından 40 dakikada işleniyor. ' +
      'Mutabakat günlük yapılıyor ve ara hesap bakiyesi 50.000 TL’nin altına iniyor.\n\n' +
      'Eşleşmeyen satırların çoğu: müşterinin açıklama alanına fatura numarası yazmaması.',

    muhasebeMantigi:
      'EBS ayrı bir muhasebe mantığı getirmez; {{konu:bank-accounting}} konusundaki **iki aşamalı kaydın** ' +
      'ikinci aşamasını otomatikleştirir.\n\n' +
      'Her ekstre satırı için sistem şu soruyu sorar: **"Bu hareketin muhasebede önceden kaydedilmiş ' +
      'bir karşılığı var mı?"**\n\n' +
      '**Varsa** (bizim yaptığımız ödeme, kaydettiğimiz tahsilat): {{banka-ara-hesabi}} kapatılır ve ' +
      'gerçek banka hesabı çalışır. İki satırlık basit bir kayıt.\n\n' +
      '**Yoksa** (banka masrafı, faiz, beklenmedik havale): doğrudan gerçek banka hesabı ve ' +
      'ilgili gelir/gider hesabı çalışır; ara hesap kullanılmaz.\n\n' +
      'Kayıt kuralları bu iki durumu ayırt etmek için tanımlanır.',

    kavramlar: ['ekstre-eslestirme', 'banka-ara-hesabi', 'valor-tarihi', 'ev-bankasi',
                'acik-kalem-yonetimi', 'kapatma', 'acik-kalem'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'EBS süreci **günlük bir rutindir** ve dört adımdan oluşur: dosya alınır, yüklenir, ' +
      'otomatik işlenir, kalanlar elle düzeltilir. Sağlıklı bir kurulumda dördüncü adım ' +
      'toplam sürenin küçük bir kısmını alır.',

    roller:[
      { rol:'Banka', gorev:'Her gün belirlenen saatte standart formatta ekstre dosyası üretir ve gönderir.' },
      { rol:'BT / entegrasyon', gorev:'Dosyayı bankadan alır ve SAP sunucusundaki dizine bırakır ({{AL11}} ile görülür).' },
      { rol:'Banka muhasebecisi', gorev:'Dosyayı yükler ({{FF_5}}), sonucu kontrol eder, eşleşmeyenleri {{FEBAN}}’da işler.' },
      { rol:'AR muhasebe', gorev:'Eşleşmeyen tahsilatları doğru müşteriye bağlar; müşteriyle iletişime geçer.' },
      { rol:'Muhasebe müdürü', gorev:'Günlük ara hesap bakiyesini izler; eşleşme oranını takip eder.' },
      { rol:'FI danışmanı', gorev:'{{OT83}} yapılandırmasını kurar: hesap sembolleri, kayıt kuralları, işlem kodu ataması, yorumlama algoritması.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'EBS günlük akışı — dosyadan mutabakata',
      adimlar:[
        { ic:'🏦', rol:'Banka', baslik:'Ekstre dosyası üretilir',
          aciklama:'Standart format: **MT940** (SWIFT), **CAMT.053** (ISO20022 XML) veya **BAI2** (ABD). ' +
                   'Her satırda banka işlem kodu, tutar, {{valor-tarihi}} ve açıklama metni bulunur.',
          cikti:'Ekstre dosyası', ok:'sisteme aktarılır' },
        { ic:'📥', rol:'BT / Kullanıcı', baslik:'Dosya sisteme alınır ({{FF_5}})',
          aciklama:'Sunucudaki dizinden veya kullanıcının bilgisayarından yüklenir. ' +
                   'Veri {{FEBKO}} (başlık) ve {{FEBEP}} (satırlar) tablolarına yazılır.',
          cikti:'{{FEBKO}} / {{FEBEP}} kayıtları', ok:'yorumlama başlar' },
        { ic:'🧭', rol:'Sistem', baslik:'İşlem kodu → kayıt kuralı eşlemesi',
          aciklama:'Bankanın gönderdiği işlem kodu ({{OT83}}’te tanımlı) bir **kayıt kuralına** eşlenir. ' +
                   'Kural, hangi hesapların borç/alacak yazılacağını **hesap sembolleriyle** söyler.',
          cikti:'Belirlenmiş kayıt kuralı', ok:'hesaplar çözümlenir' },
        { ic:'🔑', rol:'Sistem', baslik:'Hesap sembolleri gerçek hesaba çözümlenir',
          aciklama:'"BANK" sembolü → o ev bankası hesabının G/L hesabı. ' +
                   'Bu sayede **tek kural 11 farklı banka hesabı için çalışır**.',
          cikti:'Gerçek G/L hesapları', ok:'eşleştirme denenir' },
        { ic:'🔍', rol:'Sistem', baslik:'Açık kalem aranır (yorumlama algoritması)',
          aciklama:'Açıklama metninde belge numarası, referans veya tutar aranır. ' +
                   'Bulunursa {{banka-ara-hesabi}} kalemi kapatılır.',
          cikti:'Eşleşen açık kalem', ok:'eşleşirse' },
        { ic:'✓', rol:'Sistem', baslik:'FI belgesi otomatik oluşur',
          aciklama:'Ara hesap kapanır, gerçek banka hesabı çalışır. Satır "işlendi" olarak işaretlenir.',
          cikti:'FI belgesi', ok:'eşleşmezse' },
        { ic:'✋', rol:'Banka muhasebecisi', baslik:'Eşleşmeyenler elle işlenir ({{FEBAN}})',
          aciklama:'Satır doğru hesaba veya açık kaleme elle bağlanır. ' +
                   'Tekrarlayan bir desen varsa {{OT83}} kuralı güncellenir.',
          cikti:'Tam işlenmiş ekstre', ok:'gün sonu' },
        { ic:'⚖️', rol:'Muhasebe müdürü', baslik:'Ara hesap ve eşleşme oranı izlenir',
          aciklama:'Ara hesap bakiyesi düşük mü? Eşleşme oranı %80’in üstünde mi? ' +
                   'Değilse kural iyileştirmesi gerekir.',
          cikti:'Mutabık banka hesabı' },
      ],
    },

    adimlar:[
      { rol:'Banka', eylem:'Ekstre dosyası üretir', sistem:'MT940 / CAMT.053 / BAI2' },
      { rol:'BT', eylem:'Dosyayı sunucuya bırakır', sistem:'{{AL11}} ile dizin kontrol edilir' },
      { rol:'Banka muhasebecisi', eylem:'Dosyayı yükler', sistem:'{{FF_5}} → {{FEBKO}}, {{FEBEP}}' },
      { rol:'Sistem', eylem:'Kayıt kurallarını uygular', sistem:'{{OT83}} yapılandırması' },
      { rol:'Sistem', eylem:'Açık kalem eşleştirmesi dener', sistem:'Yorumlama algoritması' },
      { rol:'Banka muhasebecisi', eylem:'Eşleşmeyenleri işler', sistem:'{{FEBAN}}' },
      { rol:'Banka muhasebecisi', eylem:'Yüklenen ekstreleri kontrol eder', sistem:'{{FEBA}}' },
      { rol:'Muhasebe müdürü', eylem:'Ara hesabı izler', sistem:'{{FBL3N}}' },
    ],

    veriAkisi:{
      nereden:'Bankadan gelen standart formatlı dosya; {{OT83}} yapılandırması; ' +
              '{{banka-ara-hesabi}}ndaki açık kalemler; {{T012K}}’den hesap–G/L bağı.',
      nereye:'{{FEBKO}}/{{FEBEP}} ekstre tablolarına; oradan FI belgelerine ({{BKPF}}/{{BSEG}}); ' +
             'kapatılan ara hesap kalemlerine ve gerçek banka hesabına.',
      tetikleyen:'Bankanın günlük ekstre dosyası. Genelde her sabah otomatik yüklenecek şekilde planlanır.',
      sonraki:'Günlük mutabakat, nakit raporlaması, ay sonu banka mutabakatı.',
    },

    notlar:[
      { tip:'tip', baslik:'Eşleşme oranı bir kalite göstergesidir', metin:
        'Sağlıklı bir EBS kurulumunda satırların **%80–90’ı otomatik** eşleşir. ' +
        'Oran bunun altındaysa üç yerde iyileştirme yapılabilir:\n\n' +
        '**(1) Kayıt kuralları** — banka işlem kodlarının bir kısmı eşlenmemiş olabilir.\n' +
        '**(2) Yorumlama algoritması** — açıklama metninden belge numarası çıkarma kuralı zayıf olabilir.\n' +
        '**(3) Süreç** — müşterilere havale açıklamasına fatura numarası yazmaları hatırlatılabilir.\n\n' +
        'Üçüncüsü genelde en büyük kazancı sağlar ve teknik bir iş değildir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'EBS’in ürettiği kayıtlar iki gruba ayrılır: **karşılığı olan** hareketler (ara hesap kapanır) ve ' +
      '**karşılığı olmayan** hareketler (doğrudan kaydedilir). Kayıt kuralları bu ayrımı yapar.',

    etkilenenHesaplar:[
      { hesap:'102001 Bankalar — gerçek hesap', tur:'Bilanço — Varlık', neden:'**Her** ekstre satırında çalışır. Ekstre işlendikten sonra bakiyesi bankanın rakamıyla eşleşmelidir.' },
      { hesap:'102091 / 102081 Ara hesaplar', tur:'Bilanço — Geçiş', neden:'Yalnızca **karşılığı olan** hareketlerde çalışır; kapatılarak sıfırlanır.' },
      { hesap:'770 Banka masrafları', tur:'Gelir tablosu', neden:'Karşılığı yok — ilk kez ekstreden öğrenilir, doğrudan kaydedilir.' },
      { hesap:'642 Faiz gelirleri / 780 Faiz giderleri', tur:'Gelir tablosu', neden:'Aynı şekilde doğrudan kaydedilir.' },
      { hesap:'120 Alıcılar', tur:'Bilanço — Varlık', neden:'Eşleşen tahsilatlarda müşteri açık kalemi kapatılır.' },
      { hesap:'Geçici fark hesabı', tur:'Bilanço', neden:'Eşleştirilemeyen ama kaydedilmesi gereken satırlar için ara depo; sonradan {{FEBAN}} ile düzeltilir.' },
    ],

    fisler:[
      { baslik:'Durum 1 — Karşılığı olan: giden ödeme ekstreye yansıdı',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102091', ad:'Banka ara hesabı — giden', borc:140000, not:'**Kapatıldı** — F110 kalemi eşleşti' },
          { hesap:'102001', ad:'Bankalar — İŞB', alacak:140000, not:'Para fiilen çıktı' },
        ],
        not:'Sistem açıklama metnindeki ödeme belgesi numarasını bulup ara hesaptaki kalemi kapattı. ' +
             'Bu, EBS’in en sık ürettiği kayıt tipidir ve **tamamen otomatiktir**.' },

      { baslik:'Durum 2 — Karşılığı olan: müşteri tahsilatı eşleşti',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102001', ad:'Bankalar — İŞB', borc:98750, not:'Para girdi' },
          { hesap:'120', ad:'Alıcılar — C-5001', alacak:98750, not:'**Açık kalem kapandı**' },
        ],
        not:'Müşteri havale açıklamasına fatura numarasını yazmış; sistem {{BSID}}’de o kalemi bulup kapattı. ' +
             'Ara hesap kullanılmadı çünkü tahsilat **önceden kaydedilmemişti** — ilk kez ekstreden öğrenildi.' },

      { baslik:'Durum 3 — Karşılığı olmayan: banka masrafı',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — banka masrafı', borc:450, not:'Kayıt kuralından' },
          { hesap:'102001', ad:'Bankalar — İŞB', alacak:450 },
        ],
        not:'İşlem kodu (örn. 835) doğrudan bir kayıt kuralına eşlenmiş; kural masraf hesabını söylüyor. ' +
             '**Hiçbir açık kalem aranmaz** — bu bir bilgi kaydıdır.' },

      { baslik:'Durum 4 — Eşleşmeyen tahsilat (geçici hesaba)',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102001', ad:'Bankalar — İŞB', borc:80000, not:'Para girdi — kesin' },
          { hesap:'102099', ad:'Banka geçici hesabı', alacak:80000, not:'**Kime ait olduğu bilinmiyor**' },
        ],
        not:'Havale geldi ama açıklama boş; hangi müşteriye ait olduğu anlaşılamadı. ' +
             'Sistem parayı geçici hesaba park etti. **Banka bakiyesi doğru**, yalnızca karşı taraf belirsiz. ' +
             '{{FEBAN}}’da elle düzeltilecek.' },

      { baslik:'Durum 4 devamı — {{FEBAN}} ile düzeltme',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102099', ad:'Banka geçici hesabı', borc:80000, not:'Geçici hesap boşaltıldı' },
          { hesap:'120', ad:'Alıcılar — C-5012', alacak:80000, not:'Doğru müşteriye bağlandı' },
        ],
        not:'AR ekibi tutarı ve tarihi inceleyip müşteriyi buldu. Geçici hesap sıfırlandı. ' +
             'Bu hesabın bakiyesi **günlük sıfıra inmelidir** — inmezse bekleyen iş var demektir.' },
    ],

    tHesaplar:[
      { hesap:'Bankalar — gerçek hesap', kod:'102001',
        borc:[{ ad:'Tahsilatlar', tutar:178750 }],
        alacak:[{ ad:'Ödemeler', tutar:140000 }, { ad:'Masraf', tutar:450 }],
        not:'Ekstre sonrası bankanın rakamıyla eşleşir' },
      { hesap:'Banka ara hesabı — giden', kod:'102091',
        borc:[{ ad:'Ekstre eşleşmesi', tutar:140000 }],
        alacak:[{ ad:'F110 ödemesi', tutar:140000 }],
        not:'EBS bu hesabı otomatik kapatır' },
      { hesap:'Banka geçici hesabı', kod:'102099',
        borc:[{ ad:'FEBAN düzeltmesi', tutar:80000 }],
        alacak:[{ ad:'Eşleşmeyen havale', tutar:80000 }],
        not:'**Günlük sıfıra inmeli**' },
    ],

    notlar:[
      { tip:'tip', baslik:'Geçici hesap neden gerekli?', metin:
        'Eşleşmeyen bir satır için iki seçenek vardır: **kaydetme** veya **geçici hesaba kaydet**.\n\n' +
        'Kaydetmemek banka bakiyesini yanlış bırakır — para bankada var ama muhasebede yok. ' +
        'Geçici hesaba kaydetmek ise banka bakiyesini **doğru** tutar; yalnızca karşı taraf belirsiz kalır.\n\n' +
        'Bu yüzden çoğu kurulum geçici hesap kullanır. Kritik kural: bu hesabın bakiyesi ' +
        '**günlük sıfıra inmelidir**. Birikmesi, {{FEBAN}}’da işlenmemiş satır olduğunu gösterir.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'EBS’te çeşitlenme iki eksende olur: **dosya formatı** ve **kayıt kuralı tipi**.',

    liste:[
      { ad:'MT940', en:'SWIFT MT940',
        aciklama:'SWIFT’in metin tabanlı standart ekstre formatı. Onlarca yıldır kullanılır ve ' +
                 'neredeyse her banka destekler.',
        neZaman:'Yaygın standart. Türkiye’de bankaların çoğu MT940 verir.',
        ornek:'Satır etiketleri: `:61:` hareket, `:86:` açıklama (not to payee), `:60F:` açılış bakiyesi.',
        tcodes:['FF_5'] },

      { ad:'CAMT.053', en:'ISO 20022 XML',
        aciklama:'XML tabanlı modern standart. MT940’tan **çok daha zengin** veri taşır: ' +
                 'yapılandırılmış referanslar, ayrıntılı iş ortağı bilgisi, çoklu tutar alanları.',
        neZaman:'Yeni kurulumlarda tercih edilmelidir. Eşleşme oranı MT940’a göre belirgin şekilde yüksektir ' +
                'çünkü referans alanları yapılandırılmıştır.',
        ornek:'SEPA bölgesinde standart; Türkiye’de giderek yaygınlaşıyor.',
        tcodes:['FF_5'] },

      { ad:'BAI2', en:'Bank Administration Institute',
        aciklama:'ABD bankalarının kullandığı format.',
        neZaman:'ABD operasyonu olan şirketlerde.' },

      { ad:'Manuel ekstre', en:'Manual Statement — FF67',
        aciklama:'Dosya yok; satırlar elle girilir. Kayıt kuralları yine uygulanır.',
        neZaman:'Elektronik ekstre vermeyen bankalarda; yurtdışı küçük hesaplarda.',
        ornek:'Bkz. {{konu:bank-accounting}} konusu.',
        tcodes:['FF67'] },

      { ad:'Açık kalem kapatan kural', en:'Posting Rule with Clearing',
        aciklama:'Kural, bir açık kalemi kapatmayı hedefler. Sistem açıklama metninde belge numarası arar.',
        neZaman:'Bizim yaptığımız ödemeler ve kaydettiğimiz tahsilatlar için — ' +
                'yani {{banka-ara-hesabi}}nda karşılığı olan hareketlerde.',
        ornek:'İşlem kodu 051 (giden havale) → ara hesabı kapat.',
        tcodes:['OT83'] },

      { ad:'Doğrudan kayıt yapan kural', en:'Posting Rule without Clearing',
        aciklama:'Kural, sabit iki hesap arasında kayıt yapar; açık kalem aramaz.',
        neZaman:'Banka masrafı, faiz, damga vergisi gibi karşılığı olmayan hareketlerde.',
        ornek:'İşlem kodu 835 (masraf) → 770 gider borç / banka alacak.',
        tcodes:['OT83'] },

      { ad:'Müşteri arayan kural', en:'Posting Rule with Customer Search',
        aciklama:'Gelen havalelerde açıklama metninden **müşteri numarası veya fatura numarası** arayarak ' +
                 '{{BSID}}’de açık kalem bulmaya çalışır.',
        neZaman:'Tahsilatların otomatik eşleşmesi istendiğinde. Eşleşme oranını en çok bu kural etkiler.',
        ornek:'"FT2026000341 ödemesi" metninden fatura numarası çıkarılır ve müşteri kalemi kapatılır.',
        tcodes:['OT83','FEBAN'] },
    ],

    karsilastirmaBasliklar:['MT940', 'CAMT.053'],
    karsilastirma:[
      ['Format', 'Metin (SWIFT etiketli)', 'XML (ISO 20022)'],
      ['Veri zenginliği', 'Sınırlı — açıklama tek serbest alan', '**Zengin** — yapılandırılmış referans alanları'],
      ['Eşleşme oranı', 'Orta (%70–85)', '**Yüksek** (%85–95)'],
      ['İş ortağı bilgisi', 'Serbest metinde gömülü', 'Ayrı yapılandırılmış alanlarda'],
      ['Yaygınlık', 'Neredeyse her banka', 'Giderek yaygınlaşıyor'],
      ['Yeni kurulumda', 'Kabul edilebilir', '**Tercih edilmeli**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FF_5', ad:'Elektronik banka ekstresi yükleme',
        amac:'Bankadan gelen dosyayı sisteme alır ve kayıt kurallarına göre muhasebeleştirir.',
        neZaman:'Her gün, ekstre dosyası geldiğinde. Genelde arka plan işi olarak planlanır.',
        adimlar:[
          { baslik:'Dosya formatını seç', aciklama:'MT940, CAMT.053, BAI2 veya çok bankalı format.' },
          { baslik:'Dosya yolunu gir',
            aciklama:'Sunucudaki dizin ({{AL11}} ile kontrol edilir) veya yerel dosya. ' +
                     'Otomatik yüklemede sunucu dizini kullanılır.' },
          { baslik:'Kayıt parametrelerini ayarla',
            aciklama:'**Toplu iş oturumu üret** mi, **doğrudan kaydet** mi? ' +
                     'Doğrudan kayıt hızlıdır; toplu iş oturumu ({{SM35}}) hataları tek tek görmeyi sağlar.' },
          { baslik:'Test modunda çalıştır (ilk kurulumda)',
            aciklama:'Hangi satırların hangi kurala eşleşeceğini kaydetmeden gösterir.' },
          { baslik:'Gerçek modda çalıştır ve sonuç listesini incele',
            aciklama:'Kaç satır işlendi, kaç satır {{FEBAN}}’a düştü — eşleşme oranı buradan okunur.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Format: MT940 · Dosya: /usr/sap/interface/ekstre_20260926.txt' },
          { ekran:'Kayıt parametreleri', islem:'Doğrudan kayıt ✓ · Ekstre numarası otomatik' },
          { ekran:'Sonuç listesi', islem:'340 satır okundu · 291 kaydedildi · 49 FEBAN’a düştü' },
        ],
        alanlar:{
          zorunlu:['Dosya formatı','Dosya yolu','Şirket kodu / ev bankası eşlemesi'],
          opsiyonel:['Test modu','Toplu iş oturumu adı','Ekstre numarası','Kayıt tarihi'] },
        hatalar:[
          { mesaj:'Statement number ... already exists', sebep:'Aynı ekstre daha önce yüklenmiş.', cozum:'{{FEBA}} ile kontrol et; mükerrer yüklemeyi iptal et. Otomatik yüklemede dosya arşivleme mantığı gözden geçirilmelidir.' },
          { mesaj:'House bank / account ID could not be determined', sebep:'Dosyadaki hesap numarası hiçbir {{T012K}} kaydıyla eşleşmiyor.', cozum:'{{FI12}}’de hesap numarası/IBAN’ın dosyadakiyle **birebir** aynı olduğundan emin ol. Boşluk ve format farkı sık sorundur.' },
          { mesaj:'Posting rule not found for transaction ...', sebep:'{{OT83}}’te banka işlem kodu eşlenmemiş.', cozum:'İşlem kodunu kayıt kuralına ata; geçici olarak satırlar {{FEBAN}}’a düşer.' },
          { mesaj:'Error in file structure / parse error', sebep:'Dosya formatı bozuk veya seçilen formatla uyuşmuyor.', cozum:'{{AL11}} ile dosyayı görüntüle; bankadan yeniden iste. Karakter kodlaması (UTF-8 / ANSI) farkı sık sebeptir.' },
        ],
        ipucu:'İlk kurulumda **her yeni banka için** birkaç gün test modunda çalıştır ve ' +
              'hangi işlem kodlarının eşleşmediğini topla. Bu liste, {{OT83}} yapılandırmasının ' +
              'yol haritasıdır.',
        ilgili:['FEBAN','FEBA','OT83','FF67'] },

      { kod:'FEBAN', ad:'Banka ekstresi düzeltme (post-processing)',
        amac:'Otomatik eşleşmeyen ekstre satırlarını elle hesaba veya açık kaleme bağlar.',
        neZaman:'Her ekstre yüklemesinden sonra. EBS’in günlük insan emeği burada harcanır.',
        adimlar:[
          { baslik:'Şirket kodu, ev bankası ve tarih aralığını gir',
            aciklama:'İşlenmemiş satırlar listelenir; durum göstergesi sarı/kırmızıdır.' },
          { baslik:'Satırı seç ve açıklama metnini oku',
            aciklama:'Metinde müşteri adı, fatura numarası veya referans ipucu olabilir.' },
          { baslik:'Hedefi belirle: açık kalem mi, doğrudan hesap mı?',
            aciklama:'Tahsilatsa müşteri seçilip açık kalem listesinden eşleştirilir; ' +
                     'masraf/faiz ise doğrudan G/L hesabı girilir.' },
          { baslik:'Kayıt kuralını gerekirse değiştir',
            aciklama:'Sistem bir kural önerir; uygun değilse elle seçilir.' },
          { baslik:'Kaydet — satır "işlendi" olur',
            aciklama:'FI belgesi oluşur ve geçici hesap varsa boşaltılır.' },
        ],
        ekranAkisi:[
          { ekran:'Seçim', islem:'Şirket kodu 1000 · Ev bankası ISB · 26.09.2026' },
          { ekran:'Satır listesi', islem:'49 işlenmemiş satır; tutar ve açıklama görünür' },
          { ekran:'Satır detayı', islem:'Havale 80.000 TL · açıklama: "ODEME" (bilgi yok)' },
          { ekran:'Eşleştirme', islem:'Müşteri C-5012 seçildi → açık kalemler listelendi → 80.000 TL eşleşti' },
        ],
        alanlar:{
          zorunlu:['Ekstre satırı','Hedef hesap veya iş ortağı','Kayıt kuralı'],
          opsiyonel:['Metin','Atama','Kısmi/kalan kapatma seçimi'] },
        hatalar:[
          { mesaj:'No open items found for customer ...', sebep:'Müşterinin açık kalemi yok veya tutar uyuşmuyor.', cozum:'{{FBL5N}} ile kontrol et; kısmi ödeme olabilir. Doğru müşteri mi, teyit et.' },
          { mesaj:'Difference too large for clearing', sebep:'Tahsilat tutarı açık kalemle eşleşmiyor.', cozum:'Kısmi kapatma kullan veya birden çok kalem seç.' },
          { mesaj:'Posting period is not open', sebep:'Ekstre tarihinin dönemi kapalı.', cozum:'{{OB52}} ile aç veya kayıt tarihini değiştir.' },
        ],
        ipucu:'{{FEBAN}}’da tekrar eden bir desen fark edersen (aynı banka kodu hep elle işleniyorsa) ' +
              'bu bir **yapılandırma fırsatıdır**: {{OT83}}’te kural ekleyerek o deseni otomatikleştir. ' +
              'EBS’in olgunlaşması böyle olur.',
        ilgili:['FF_5','FEBA','OT83','FBL5N'] },

      { kod:'FEBA', ad:'Banka ekstresi görüntüleme',
        amac:'Yüklenmiş ekstreleri ve satır bazında işlenme durumunu gösterir.',
        neZaman:'"Bu ekstre yüklendi mi?" sorusunda; mükerrer yükleme kontrolünde; mutabakat öncesinde.',
        adimlar:[
          { baslik:'Şirket kodu, ev bankası ve tarih aralığını gir' },
          { baslik:'Ekstre listesini incele',
            aciklama:'Her ekstrenin numarası, tarihi, açılış/kapanış bakiyesi ve **işlenme durumu** görünür.' },
          { baslik:'Ekstreye çift tıkla → satır detayına in' },
        ],
        ipucu:'Ekstre numaralarının **sıralı** olduğunu kontrol et. Atlanan bir numara, ' +
              'yüklenmemiş bir ekstre demektir ve mutabakatta açıklanamayan fark yaratır.',
        ilgili:['FF_5','FEBAN','FEBKO'] },

      { kod:'OT83', ad:'EBS global ayarları — kayıt kuralları ve hesap sembolleri',
        amac:'EBS’in tüm yapılandırmasını dört katmanda toplar. **EBS’in kalbidir.**',
        neZaman:'Kurulumda ve her yeni banka/işlem kodu eklendiğinde.',
        adimlar:[
          { baslik:'1) Hesap sembollerini tanımla (Account symbols)',
            aciklama:'Soyut isimler: **BANK** (gerçek banka hesabı), **OUTGOING** (giden ara hesap), ' +
                     '**INCOMING** (gelen ara hesap), **CHARGES** (masraf). ' +
                     'Bunlar henüz gerçek hesap değildir.' },
          { baslik:'2) Hesap sembollerine hesap ata (Assign accounts to symbols)',
            aciklama:'Sembol → gerçek G/L hesabı. Maske kullanılır: `+++++++++0` gibi bir maske, ' +
                     'ev bankası hesabının G/L numarasını **otomatik yerine koyar**. ' +
                     '**Tek tanım 11 banka hesabı için çalışır** — sembollerin varlık sebebi budur.' },
          { baslik:'3) Kayıt kurallarını oluştur (Create posting rules)',
            aciklama:'Her kural bir muhasebe kaydı şablonudur: hangi sembol borç, hangi sembol alacak, ' +
                     'belge türü ne, kapatma yapılacak mı.' },
          { baslik:'4) Dış işlemleri kayıt kurallarına ata (Assign external transactions)',
            aciklama:'Bankanın gönderdiği işlem kodu (051, 835, 202…) hangi kurala eşlenecek? ' +
                     'Ayrıca **yorumlama algoritması** burada seçilir: açıklama metninde ne aranacak?' },
          { baslik:'5) Banka hesaplarını ata (Assign bank accounts to transaction types)',
            aciklama:'Hangi ev bankası hesabı hangi işlem tipi kümesini kullanacak.' },
        ],
        ekranAkisi:[
          { ekran:'Hesap sembolleri', islem:'BANK, OUTGOING, INCOMING, CHARGES, INTEREST tanımlandı' },
          { ekran:'Sembol → hesap', islem:'BANK → maske 1020++, OUTGOING → 102091, CHARGES → 770100' },
          { ekran:'Kayıt kuralı', islem:'Kural Z01: OUTGOING borç / BANK alacak · kapatma **var**' },
          { ekran:'İşlem kodu ataması', islem:'051 (giden havale) → kural Z01 · yorumlama algoritması 001' },
        ],
        alanlar:{
          zorunlu:['Hesap sembolleri','Sembol-hesap ataması','Kayıt kuralları','İşlem kodu ataması'],
          opsiyonel:['Yorumlama algoritması','Fark hesabı','Belge türü'] },
        hatalar:[
          { mesaj:'Account symbol ... has no account assignment', sebep:'2. katman eksik.', cozum:'Sembole G/L hesabı veya maske ata.' },
          { mesaj:'Posting rule ... is incomplete', sebep:'Kuralda borç veya alacak sembolü eksik.', cozum:'Kuralı tamamla; her kural en az iki sembol içermelidir.' },
          { mesaj:'External transaction ... not assigned', sebep:'Banka işlem kodu hiçbir kurala eşlenmemiş.', cozum:'4. katmanda atamayı yap. Bu, en sık karşılaşılan EBS yapılandırma eksiğidir.' },
        ],
        ipucu:'**Hesap sembolü kavramını kavramadan EBS kurulamaz.** Sembol, "gerçek banka hesabı" gibi ' +
              'soyut bir rol tanımlar; maske sayesinde her ev bankası hesabı için doğru G/L hesabına ' +
              'çözümlenir. Böylece **tek kayıt kuralı tüm bankalar için** çalışır. ' +
              'Sembol olmasaydı her banka hesabı için ayrı kural yazmak gerekirdi.',
        ilgili:['FF_5','FEBAN','FI12','T012K'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'EBS’in kendi tabloları ikidir: {{FEBKO}} (ekstre başlığı) ve {{FEBEP}} (satırlar). ' +
      'Ürettiği muhasebe kayıtları ise normal FI tablolarına gider.',

    liste:[
      { ad:'FEBKO', baslik:'Banka ekstresi başlığı',
        tutar:'Her ekstrenin kimliği: ev bankası, hesap kimliği, ekstre numarası, tarih, ' +
              'açılış ve kapanış bakiyesi, satır sayısı.',
        olusturan:'{{FF_5}} (elektronik) veya {{FF67}} (manuel)',
        guncelleyen:'Yükleme işlemleri',
        anahtar:'KUKEY',
        iliskiler:'{{FEBEP}} ile satırları; {{T012K}} ile banka hesabı.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KUKEY', aciklama:'Ekstre kimliği (iç anahtar)' },
          { ad:'AZNUM', aciklama:'Ekstre numarası — **sıralı olmalıdır**' },
          { ad:'AZDAT', aciklama:'Ekstre tarihi' },
          { ad:'ASBTR / AEBTR', aciklama:'Açılış ve kapanış bakiyesi — dosyadan gelir' },
          { ad:'HBKID / HKTID', aciklama:'Ev bankası ve hesap kimliği' },
        ] },

      { ad:'FEBEP', baslik:'Banka ekstresi kalemleri',
        tutar:'Ekstrenin satırları: banka işlem kodu, tutar, {{valor-tarihi}}, açıklama metni ve ' +
              '**işlenme durumu**.',
        olusturan:'{{FF_5}} / {{FF67}}',
        guncelleyen:'{{FEBAN}} ile eşleştirme yapıldığında durum güncellenir',
        anahtar:'KUKEY + ESNUM',
        iliskiler:'{{FEBKO}}’nun çocuğu; eşleştiği FI belgesine bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'ESNUM', aciklama:'Satır numarası' },
          { ad:'VGEXT', aciklama:'**Dış işlem kodu** — bankanın gönderdiği kod (051, 835…). Kayıt kuralı buna göre seçilir.' },
          { ad:'VGINT', aciklama:'İç işlem kodu — SAP’ın kendi sınıflandırması' },
          { ad:'KWBTR', aciklama:'Satır tutarı' },
          { ad:'VALUT', aciklama:'{{valor-tarihi}} — nakit yönetimi bunu kullanır' },
          { ad:'SGTXT', aciklama:'Açıklama metni (not to payee) — **otomatik eşleştirmenin ana girdisi**' },
          { ad:'ANWSO / Durum', aciklama:'Satırın işlenme durumu; işlenmemişse {{FEBAN}}’da görünür' },
        ] },

      { ad:'T012K', baslik:'Ev bankası hesap kimlikleri',
        tutar:'Her hesabın IBAN’ı, hesap numarası ve G/L hesabı. ' +
              'EBS yüklemede dosyadaki hesap numarası buradaki kayıtla **eşleşmelidir**.',
        olusturan:'{{FI12}}',
        guncelleyen:'{{FI12}}',
        anahtar:'BUKRS + HBKID + HKTID',
        iliskiler:'{{FEBKO}} bu kayda bağlanır; hesap sembolü maskesi buradaki G/L hesabını kullanır.',
        s4:'Bank Account Management ile yönetilir.',
        alanlar:[
          { ad:'BANKN / IBAN', aciklama:'**Dosyadakiyle birebir eşleşmelidir** — boşluk/format farkı yükleme hatası verir' },
          { ad:'HKONT', aciklama:'G/L hesabı — hesap sembolü maskesi bunu kullanır' },
        ] },

      { ad:'BKPF', baslik:'EBS’in ürettiği FI belgeleri',
        tutar:'Ekstre işlemenin ürettiği muhasebe belgelerinin başlığı.',
        olusturan:'{{FF_5}} veya {{FEBAN}}',
        guncelleyen:'Ekstre işleme',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'BLART', aciklama:'Genelde SB (banka kaydı) — kayıt kuralında tanımlı' },
          { ad:'XBLNR', aciklama:'Referans — genelde ekstre numarası yazılır' },
        ] },

      { ad:'BSIS', baslik:'Ara hesap açık kalemleri',
        tutar:'{{banka-ara-hesabi}}ndaki kapanmamış kalemler. EBS bunları kapatmayı hedefler.',
        olusturan:'Ödeme/tahsilat kayıtları',
        guncelleyen:'EBS eşleştirmesi kalemleri kapatır',
        s4:'{{uyumluluk-view}} — {{ACDOCA}}’dan üretilir.' },
    ],

    er:{
      type:'er',
      baslik:'EBS tablo ilişkileri',
      varliklar:[
        { ad:'T012K', rol:'Yapılandırma', aciklama:'Banka hesabı ve G/L bağı',
          alanlar:[{ ad:'HBKID', tip:'pk' }, { ad:'HKTID', tip:'pk' }, { ad:'IBAN' }, { ad:'HKONT', tip:'fk' }] },
        { ad:'FEBKO', rol:'Ekstre', hub:true, aciklama:'Ekstre başlığı',
          alanlar:[{ ad:'KUKEY', tip:'pk' }, { ad:'HBKID', tip:'fk' }, { ad:'AZNUM' }, { ad:'ASBTR' }] },
        { ad:'FEBEP', rol:'Ekstre', aciklama:'Ekstre satırları',
          alanlar:[{ ad:'KUKEY', tip:'fk' }, { ad:'ESNUM', tip:'pk' }, { ad:'VGEXT' }, { ad:'KWBTR' }, { ad:'SGTXT' }] },
        { ad:'BKPF', rol:'Belge', aciklama:'Üretilen FI belgesi',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'XBLNR' }] },
        { ad:'BSEG', rol:'Kalem', aciklama:'Belge kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'BSIS', rol:'İndeks', aciklama:'Ara hesap açık kalemleri',
          alanlar:[{ ad:'HKONT', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'SKB1', rol:'Ana veri', aciklama:'Banka ve ara hesaplar',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'XOPVW' }] },
      ],
      iliskiler:[
        { from:'T012K', to:'FEBKO', alanlar:'HBKID + HKTID', not:'hangi hesabın ekstresi' },
        { from:'FEBKO', to:'FEBEP', alanlar:'KUKEY', not:'ekstre → satırlar' },
        { from:'FEBEP', to:'BKPF', alanlar:'işleme sonrası', not:'satır → FI belgesi' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'başlık → kalem' },
        { from:'BSEG', to:'BSIS', alanlar:'BELNR + BUZEI', not:'ara hesap kalemi kapatılır' },
        { from:'T012K', to:'SKB1', alanlar:'HKONT → SAKNR', not:'hesap sembolü maskesi buraya çözümlenir' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'EBS’te günlük iş iki ekranda geçer: **yükleme** ({{FF_5}}) ve **düzeltme** ({{FEBAN}}). ' +
      'Yapılandırma tarafında ise {{OT83}}’ün dört katmanı vardır ve sırası önemlidir.',

    ekranlar:[
      { ad:'{{FF_5}} — yükleme ekranı',
        aciklama:'Dosya seçimi ve kayıt parametreleri.',
        alanlar:[
          { ad:'Dosya formatı', zorunlu:true, aciklama:'MT940 / CAMT.053 / BAI2. Yanlış format seçilirse ayrıştırma hatası alınır.' },
          { ad:'Dosya yolu', zorunlu:true, aciklama:'Sunucu dizini ({{AL11}} ile kontrol edilir) veya yerel dosya.' },
          { ad:'Kayıt modu', zorunlu:true, aciklama:'**Doğrudan kayıt** (hızlı) veya **toplu iş oturumu** ({{SM35}} ile çalıştırılır, hatalar tek tek görülür).' },
          { ad:'Test modu', zorunlu:false, aciklama:'Kaydetmeden hangi satırın hangi kurala eşleşeceğini gösterir. **İlk kurulumda vazgeçilmez.**' },
          { ad:'Ekstre numarası', zorunlu:false, aciklama:'Genelde dosyadan okunur; elle de verilebilir.' },
        ],
        ipucu:'Sonuç listesindeki **"işlendi / işlenmedi"** sayıları eşleşme oranını verir. ' +
              'Bu oranı her gün not et; düşerse bir şey değişmiş demektir (banka kod değiştirmiş olabilir).' },

      { ad:'{{FEBAN}} — düzeltme ekranı',
        aciklama:'İşlenmemiş satırların listesi ve eşleştirme paneli.',
        alanlar:[
          { ad:'Satır listesi', zorunlu:true, aciklama:'Durum göstergesi renklidir: yeşil işlendi, sarı kısmen, kırmızı işlenmedi.' },
          { ad:'Açıklama metni (`SGTXT`)', zorunlu:false, aciklama:'**En önemli ipucu.** Müşteri adı, fatura numarası veya referans burada gizlidir.' },
          { ad:'Hedef: iş ortağı veya G/L hesabı', zorunlu:true, aciklama:'Tahsilatsa müşteri, masrafsa gider hesabı.' },
          { ad:'Kayıt kuralı', zorunlu:true, aciklama:'Sistem önerir; uygun değilse elle seçilir.' },
          { ad:'Açık kalem seçimi', zorunlu:false, aciklama:'İş ortağı seçildiğinde açık kalemler listelenir; kısmi/kalan kapatma da mümkündür.' },
        ],
        ipucu:'Tutarı ve tarihi kullanarak {{FBL5N}}’de arama yapmak, açıklaması boş havalelerin ' +
              'müşterisini bulmanın en pratik yoludur.' },

      { ad:'{{OT83}} — yapılandırma ekranı (dört katman)',
        aciklama:'EBS’in tüm mantığı burada kurulur. Katmanların sırası önemlidir.',
        alanlar:[
          { ad:'1) Hesap sembolleri', zorunlu:true, aciklama:'Soyut roller: BANK, OUTGOING, INCOMING, CHARGES.' },
          { ad:'2) Sembol → hesap ataması', zorunlu:true, aciklama:'**Maske kullanılır.** `+++++++++0` gibi bir maske, ev bankası hesabının G/L numarasını yerine koyar. Tek tanım tüm bankalar için çalışır.' },
          { ad:'3) Kayıt kuralları', zorunlu:true, aciklama:'Hangi sembol borç, hangi sembol alacak, belge türü, kapatma yapılacak mı.' },
          { ad:'4) Dış işlem kodu ataması', zorunlu:true, aciklama:'Bankanın kodu (051, 835) → kayıt kuralı. **Ayrıca yorumlama algoritması burada seçilir.**' },
        ],
        ipucu:'Yorumlama algoritması, açıklama metninde ne aranacağını belirler: ' +
              'belge numarası, referans, çek numarası veya iş ortağı. ' +
              'Doğru algoritma seçimi eşleşme oranını doğrudan etkiler.' },
    ],

    zorunlu:['Dosya formatı','Dosya yolu','Hesap sembolleri','Sembol-hesap ataması','Kayıt kuralları','İşlem kodu ataması'],
    opsiyonel:['Test modu','Toplu iş oturumu','Yorumlama algoritması','Fark hesabı','Geçici hesap'],

    hatalar:[
      { mesaj:'House bank / account ID could not be determined', sebep:'Dosyadaki hesap numarası/IBAN, {{T012K}}’deki kayıtla eşleşmiyor.', cozum:'{{FI12}}’de hesap numarasını dosyadakiyle **birebir** aynı yap. Boşluk, tire ve format farkı en sık sebeptir.' },
      { mesaj:'Posting rule not found for external transaction 051', sebep:'{{OT83}} 4. katmanda işlem kodu eşlenmemiş.', cozum:'Kodu bir kayıt kuralına ata. Bu, EBS’in en sık yapılandırma eksiğidir.' },
      { mesaj:'Account symbol BANK has no account assignment', sebep:'{{OT83}} 2. katman eksik.', cozum:'Sembole G/L hesabı veya maske ata.' },
      { mesaj:'Statement number 245 already exists', sebep:'Mükerrer yükleme.', cozum:'{{FEBA}} ile kontrol et; dosya arşivleme mantığını gözden geçir.' },
      { mesaj:'Error in file structure', sebep:'Format uyuşmazlığı veya karakter kodlaması sorunu.', cozum:'{{AL11}} ile dosyayı görüntüle; formatı ve kodlamayı (UTF-8/ANSI) kontrol et.' },
      { mesaj:'Difference too large for clearing (FEBAN)', sebep:'Tahsilat tutarı açık kalemle eşleşmiyor.', cozum:'Kısmi kapatma kullan veya birden çok kalem seç.' },
      { mesaj:'Opening balance does not match previous closing balance', sebep:'Bir ekstre atlanmış.', cozum:'{{FEBA}} ile ekstre numaralarının sıralı olduğunu kontrol et; eksik ekstreyi bankadan iste.' },
    ],

    ipuclari:[
      'İlk kurulumda **her banka için birkaç gün test modunda** çalıştır ve eşleşmeyen işlem kodlarını topla. ' +
      'Bu liste {{OT83}} yapılandırmasının yol haritasıdır.',
      'Eşleşme oranını günlük not et. Ani düşüş, bankanın işlem kodu değiştirdiğinin işaretidir.',
      '{{FEBAN}}’da tekrar eden bir desen görürsen **kural ekle**. EBS’in olgunlaşması böyle olur: ' +
      'her ay biraz daha az elle iş.',
      'Ekstre numaralarının sıralı olduğunu {{FEBA}} ile düzenli kontrol et; atlanan numara ' +
      'mutabakatta açıklanamayan fark yaratır.',
      'Açıklaması boş havalelerde tutar + tarih ile {{FBL5N}}’de arama yap — müşteriyi bulmanın en hızlı yolu.',
      'Müşterilere havale açıklamasına **fatura numarası** yazmalarını hatırlat. ' +
      'Teknik olmayan bu tek adım, eşleşme oranını en çok artıran şeydir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'FEBKO', ne:'Ekstre başlığı — dosyadan okunan bakiyeler ve kimlik' },
      { tablo:'FEBEP', ne:'Ekstre satırları; işlendikçe durum alanı güncellenir' },
      { tablo:'BKPF', ne:'Üretilen FI belgeleri (genelde SB türü)' },
      { tablo:'BSEG', ne:'Belge kalemleri; ara hesap kapatılırsa `AUGBL` dolar' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler' },
      { tablo:'BSIS', ne:'Kapatılan ara hesap kalemleri buradan çıkar' },
      { tablo:'BSID', ne:'Müşteri tahsilatı eşleştiyse açık kalem kapanır' },
    ],

    commit:
      'EBS **iki aşamalı** çalışır ve bu ayrım kritiktir:\n\n' +
      '**Aşama 1 — Veri yükleme:** dosya okunur, {{FEBKO}}/{{FEBEP}} yazılır. ' +
      'Bu aşama başarılı olsa bile **hiçbir muhasebe kaydı oluşmamış** olabilir.\n\n' +
      '**Aşama 2 — Muhasebeleştirme:** kayıt kuralları uygulanır ve FI belgeleri üretilir. ' +
      'Doğrudan kayıt modunda her satır ayrı LUW’dur; toplu iş oturumu modunda ' +
      'oturum {{SM35}} ile çalıştırılana kadar hiçbir belge oluşmaz.\n\n' +
      'Bu yüzden "ekstre yüklendi ama muhasebe kaydı yok" durumu normaldir ve ' +
      '{{FEBA}} (yüklendi mi?) ile {{FEBAN}} (işlendi mi?) ayrı ayrı kontrol edilir.',

    belgeNo:
      'EBS’in ürettiği belgeler kayıt kuralında tanımlı belge türünden (genelde **SB**) ' +
      'numara alır. Bir ekstre satırı bazen **iki belge** üretir: biri banka hareketi, ' +
      'diğeri açık kalem kapatması — kayıt kuralının yapısına bağlıdır.',

    postingLogic:
      'Bir ekstre satırının muhasebeleşme zinciri **beş adımdır**:\n\n' +
      '**1. Dış işlem kodu okunur** ({{FEBEP}} `VGEXT`) — bankanın gönderdiği kod.\n' +
      '**2. Kayıt kuralı bulunur** — {{OT83}} 4. katmandaki atama.\n' +
      '**3. Hesap sembolleri çözümlenir** — sembol + maske → gerçek G/L hesabı. ' +
      'Maske, o ev bankası hesabının {{T012K}}’deki G/L numarasını yerine koyar.\n' +
      '**4. Yorumlama algoritması çalışır** — açıklama metninde ({{FEBEP}} `SGTXT`) ' +
      'belge numarası, referans veya çek numarası aranır.\n' +
      '**5. Kayıt yapılır** — bulunursa açık kalem kapatılarak, bulunmazsa geçici hesaba.',

    belgeTuru:
      'Kayıt kuralında tanımlanır; genelde **SB** (banka kaydı) kullanılır. ' +
      'Farklı işlem tipleri için farklı türler tanımlanabilir (masraf için ayrı tür gibi) ' +
      'ama pratikte tek tür yeterlidir.',

    numberRange:
      'Kullanılan belge türünün {{FBN1}}’deki aralığından gelir. ' +
      'Yüksek hacimli EBS kurulumlarında bu aralığın **geniş** tanımlanması gerekir — ' +
      'günde yüzlerce belge üretilebilir.',

    accountDetermination:
      'EBS’in en özgün yanı **hesap sembolü** mekanizmasıdır:\n\n' +
      'Kayıt kuralında gerçek hesap numarası yazılmaz; "BANK", "OUTGOING" gibi **soyut semboller** kullanılır. ' +
      'Sembol → hesap atamasında **maske** verilir (örn. `+++++++++0`). ' +
      'Maskedeki `+` işaretleri, o ev bankası hesabının {{T012K}}’deki G/L hesap numarasından doldurulur.\n\n' +
      'Sonuç: **tek bir kayıt kuralı 11 farklı banka hesabı için çalışır.** ' +
      'Sembol olmasaydı her hesap için ayrı kural yazmak ve her yeni banka hesabında ' +
      'tüm kuralları çoğaltmak gerekirdi.',

    tur:
      '**Özelleştirme:** {{OT83}}’ün dört katmanı (hesap sembolleri, sembol-hesap ataması, ' +
      'kayıt kuralları, işlem kodu ataması), yorumlama algoritmaları.\n\n' +
      '**Ana veri:** {{ev-bankasi}} hesapları ({{T012K}}) — S/4HANA’da BAM ile ana veri.\n\n' +
      '**Hareket verisi:** ekstreler ({{FEBKO}}/{{FEBEP}}) ve üretilen FI belgeleri.',

    transport:
      '{{OT83}} yapılandırması taşınır: hesap sembolleri, kayıt kuralları, işlem kodu atamaları.\n\n' +
      '**Ama sembol-hesap ataması dikkat gerektirir:** maskeler G/L hesap numaralarına referans verir. ' +
      'Hedef sistemde hesap numaraları farklıysa maskeler çalışmaz. ' +
      'Ayrıca ev bankası hesapları taşınmadığı için hedef sistemde ayrıca tanımlanmalıdır.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Banka Muhasebesi → İş İşlemleri → Ödeme İşlemleri → Elektronik Banka Ekstresi → Global Ayarları Yap', not:'{{OT83}} — dört katmanın tamamı' },
      { yol:'… → Elektronik Banka Ekstresi → Global Ayarlar → Hesap Sembollerini Tanımla', not:'1. katman' },
      { yol:'… → Elektronik Banka Ekstresi → Global Ayarlar → Hesapları Hesap Sembollerine Ata', not:'2. katman — **maske mantığı**' },
      { yol:'… → Elektronik Banka Ekstresi → Global Ayarlar → Kayıt Kurallarını Oluştur', not:'3. katman' },
      { yol:'… → Elektronik Banka Ekstresi → Global Ayarlar → Dış İşlemleri Kayıt Kurallarına Ata', not:'4. katman — **yorumlama algoritması burada**' },
      { yol:'… → Elektronik Banka Ekstresi → Banka Hesaplarını İşlem Tiplerine Ata', not:'Hangi hesap hangi kural kümesini kullanır' },
    ],

    ekstra:[
      { ic:'🔑', baslik:'Hesap sembolü ve maske — EBS’in en zarif fikri', metin:
        'Şirketin 11 banka hesabı var ve her biri farklı bir G/L hesabı kullanıyor: ' +
        '102001, 102002, 102003…\n\n' +
        'Kayıt kuralında gerçek hesap yazsaydık **her hesap için ayrı kural** gerekirdi — ' +
        '11 hesap × 8 işlem tipi = 88 kural.\n\n' +
        'Bunun yerine kuralda **"BANK"** sembolü kullanılır. Sembol-hesap atamasında ' +
        'maske verilir: `+++++++++0`. Sistem, işlenen satırın hangi ev bankası hesabına ait ' +
        'olduğunu bilir ve {{T012K}}’den o hesabın G/L numarasını alıp maskeye yerleştirir.\n\n' +
        'Sonuç: **8 kural, 11 hesap.** Yeni bir banka hesabı eklendiğinde tek bir kural bile ' +
        'değiştirmek gerekmez.\n\n' +
        'Mülakatta "hesap sembolü nedir?" sorusuna bu cevap verilirse EBS’i gerçekten kurmuş olduğun anlaşılır.' },

      { ic:'🔍', baslik:'Yorumlama algoritması — eşleşme oranının anahtarı', metin:
        'Yorumlama algoritması (interpretation algorithm), açıklama metninde **ne aranacağını** belirler. ' +
        'Yaygın seçenekler:\n\n' +
        '• **001 — Standart:** belge numarası arar.\n' +
        '• **011 — Fatura numarası:** referans alanıyla eşleştirir.\n' +
        '• **012 — Çek numarası:** {{PAYR}}’da arar.\n' +
        '• **021 — Referans belge numarası:** `XBLNR` alanıyla eşleştirir.\n\n' +
        'Doğru algoritma seçimi eşleşme oranını doğrudan etkiler. ' +
        'Giden ödemelerde belge numarası (001) iyi çalışır çünkü ödeme dosyasına o numarayı biz yazarız. ' +
        'Gelen tahsilatlarda ise müşterinin ne yazdığına bağlıdır — bu yüzden eşleşme oranı orada düşüktür.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Yüklendi ≠ muhasebeleşti', metin:
        'Ekstre yükleme ve muhasebeleştirme **iki ayrı aşamadır**. Dosya başarıyla yüklenmiş olabilir ' +
        'ama satırlar hâlâ {{FEBAN}}’da bekliyor olabilir; toplu iş oturumu modundaysa ' +
        'oturum {{SM35}} ile çalıştırılmamış olabilir.\n\n' +
        'Bu yüzden mutabakat öncesi iki kontrol yapılır: {{FEBA}} (ekstre yüklendi mi?) ve ' +
        '{{FEBAN}} (bekleyen satır var mı?).' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'EBS’in **mantığı ve tabloları değişmedi**. Değişen: Fiori tabanlı düzeltme arayüzü, ' +
      'Bank Account Management entegrasyonu ve makine öğrenmesi destekli eşleştirme önerileri.',

    eccFarklari:[
      { konu:'Yükleme', ecc:'{{FF_5}}', s4:'**Aynı** + Fiori "Import Bank Statements"' },
      { konu:'Düzeltme', ecc:'{{FEBAN}} — klasik ALV', s4:'{{FEBAN}} çalışır + Fiori "Reprocess Bank Statement Items" (görsel iş listesi)' },
      { konu:'Yapılandırma', ecc:'{{OT83}} dört katman', s4:'**Aynı** — değişmedi' },
      { konu:'Tablolar', ecc:'{{FEBKO}} / {{FEBEP}}', s4:'**Aynı** — fiziksel tablo olarak duruyor' },
      { konu:'Banka hesabı yönetimi', ecc:'{{FI12}} customizing', s4:'Bank Account Management — ana veri, onay akışı' },
      { konu:'Eşleştirme desteği', ecc:'Yorumlama algoritması', s4:'+ **makine öğrenmesi** ile öneri (Cash Application)' },
      { konu:'Nakit görünürlüğü', ecc:'Ayrı Cash Management', s4:'Entegre — ekstre yüklenince nakit tahmini anlık güncellenir' },
    ],

    universalJournal:
      'EBS’in ürettiği belgeler {{ACDOCA}}’ya da yazılır. Pratik sonucu: banka hareketleri ' +
      'kâr merkezi ve iş ortağı boyutlarıyla birlikte tek tablodan raporlanabilir. ' +
      'Ara hesap kalemlerinin sorgulanması da hızlanır çünkü {{BSIS}} yerine {{ACDOCA}} kullanılır.',

    kalkanTcodes:[
      { eski:'FF.5', yeni:'{{FF_5}}', not:'Aynı işlev, güncel sürüm' },
      { eski:'—', yeni:'—', not:'{{FEBAN}}, {{FEBA}}, {{OT83}} kaldırılmadı; aynen çalışır' },
    ],

    fiori:[
      { ad:'Reprocess Bank Statement Items', aciklama:'{{FEBAN}} yerine; eşleşmeyen satırlar görsel iş listesi olarak, öneri destekli.' },
      { ad:'Import Bank Statements', aciklama:'{{FF_5}} yerine; sürükle-bırak dosya yükleme.' },
      { ad:'Bank Statement Monitor', aciklama:'Hangi hesabın ekstresi yüklendi, hangisi eksik — **mutabakatın ilk kontrolü**.' },
      { ad:'Cash Application (ML)', aciklama:'Makine öğrenmesiyle gelen tahsilatları müşterilerle eşleştirir; geçmiş eşleşmelerden öğrenir. Eşleşme oranını belirgin artırır.' },
      { ad:'Cash Flow Analyzer', aciklama:'Ekstre yüklenince nakit tahmini anlık güncellenir.' },
    ],

    compatibilityViews:[
      '{{FEBKO}}, {{FEBEP}} — **fiziksel tablo olarak duruyor**, değişmedi.',
      '{{BSIS}} — ara hesap açık kalemleri {{uyumluluk-view}}; EBS eşleştirmesi {{ACDOCA}} üzerinden çalışır.',
      'EBS, S/4HANA’da tablo yapısı en az değişen FI alanlarından biridir.',
    ],

    performans:
      'Açık kalem arama {{ACDOCA}} üzerinden yapıldığı için büyük ara hesaplarda eşleştirme hızlandı. ' +
      'Asıl kazanç ise **Cash Application** ile gelen makine öğrenmesi desteğidir: ' +
      'geçmiş eşleştirmelerden öğrenerek açıklaması zayıf havaleleri de doğru müşteriye önerebilir.',

    bestPractices:[
      'Yeni kurulumlarda bankadan **CAMT.053** iste; MT940’a göre eşleşme oranı belirgin şekilde yüksektir.',
      'Cash Application (ML) özelliğini değerlendir — özellikle gelen tahsilat hacmi yüksekse.',
      'Ekstre yüklemeyi **arka plan işi** olarak günlük planla; elle yükleme unutulabilir.',
      'Eşleşme oranını bir performans göstergesi olarak izle ve düşüşleri araştır.',
      '{{OT83}} yapılandırmasını dokümante et — dört katmanlı yapı, devir teslimde en çok soru çıkaran konudur.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Bir EBS kurulumu: %0’dan %88 eşleşme oranına',
    hikaye:
      '**Marmara Tekstil A.Ş.** İş Bankası hesabı için EBS kuruyor. Günlük ortalama 120 ekstre satırı var. ' +
      'Bu senaryo, ilk yüklemedeki %0 eşleşmeden üç haftada %88’e nasıl çıkıldığını ve ' +
      '{{OT83}}’ün dört katmanının nasıl kurulduğunu gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · Ev bankası ISB · Hesap kimliği 0001' },
      { k:'Format', v:'MT940 (banka CAMT.053 vermiyor)' },
      { k:'Hesaplar', v:'102001 gerçek · 102091 giden ara · 102081 gelen ara · 102099 geçici' },
      { k:'Günlük hacim', v:'~120 satır' },
      { k:'Hedef', v:'%80+ otomatik eşleşme' },
    ],

    adimlar:[
      { baslik:'İlk yükleme — test modunda', tcode:'FF_5',
        aciklama:'Yapılandırma yapılmadan dosya test modunda yükleniyor. Amaç: ' +
                 '**banka hangi işlem kodlarını gönderiyor?** sorusunu cevaplamak.',
        girdi:[
          { alan:'Format / Dosya', deger:'MT940 · /usr/sap/interface/isb_20260901.txt' },
          { alan:'Mod', deger:'**Test ✓** — kayıt yapılmayacak' },
          { alan:'Sonuç', deger:'118 satır okundu · **0 satır eşleşti**' },
          { alan:'Hata', deger:'"Posting rule not found" — tüm satırlar için' },
          { alan:'**Kritik çıktı**', deger:'Kullanılan işlem kodları: 051, 052, 202, 835, 840, 951' },
        ],
        not:'Bu liste, {{OT83}} yapılandırmasının **yol haritasıdır**. ' +
             'Her kodun ne anlama geldiği bankaya sorulur veya ekstre açıklamalarından çıkarılır.' },

      { baslik:'Katman 1 — Hesap sembolleri tanımlanır', tcode:'OT83',
        aciklama:'Soyut roller tanımlanıyor. Henüz gerçek hesap yok.',
        girdi:[
          { alan:'BANK', deger:'Gerçek banka hesabı' },
          { alan:'OUTGOING', deger:'Giden ödemeler ara hesabı' },
          { alan:'INCOMING', deger:'Gelen tahsilatlar ara hesabı' },
          { alan:'CHARGES', deger:'Banka masrafları' },
          { alan:'INTEREST', deger:'Faiz geliri' },
          { alan:'TEMP', deger:'Geçici hesap (eşleşmeyenler için)' },
        ],
        not:'Semboller **soyuttur**. "BANK" hangi hesap olduğunu henüz bilmiyor — ' +
             'bu, bir sonraki katmanda maskeyle çözülecek.' },

      { baslik:'Katman 2 — Sembollere hesap atanır (maske ile)', tcode:'OT83',
        aciklama:'EBS’in en zarif kısmı. Maske sayesinde tek tanım tüm banka hesapları için çalışacak.',
        girdi:[
          { alan:'BANK', deger:'Maske **`+++++++++`** → ev bankası hesabının G/L numarası yerine konur' },
          { alan:'OUTGOING', deger:'Maske `+++++++91` → 102001 için **102091** olur' },
          { alan:'INCOMING', deger:'Maske `+++++++81` → 102001 için **102081** olur' },
          { alan:'CHARGES', deger:'Sabit hesap **770100**' },
          { alan:'INTEREST', deger:'Sabit hesap **642000**' },
          { alan:'TEMP', deger:'Maske `+++++++99` → **102099**' },
        ],
        not:'Maske mantığı: `+` işaretleri {{T012K}}’deki G/L hesap numarasından doldurulur. ' +
             'Şirket ikinci bir banka hesabı (102002) eklediğinde **hiçbir tanım değişmez** — ' +
             'maske otomatik olarak 102092, 102082, 102099 üretir.' },

      { baslik:'Katman 3 — Kayıt kuralları oluşturulur', tcode:'OT83',
        aciklama:'Her kural bir muhasebe kaydı şablonu. Semboller kullanılıyor, gerçek hesap yazılmıyor.',
        girdi:[
          { alan:'**Z01** — Giden ödeme', deger:'OUTGOING borç / BANK alacak · **kapatma var** · belge türü SB' },
          { alan:'**Z02** — Gelen tahsilat (eşleşen)', deger:'BANK borç / müşteri alacak · **kapatma var** · SB' },
          { alan:'**Z03** — Banka masrafı', deger:'CHARGES borç / BANK alacak · kapatma **yok** · SB' },
          { alan:'**Z04** — Faiz geliri', deger:'BANK borç / INTEREST alacak · kapatma yok · SB' },
          { alan:'**Z05** — Eşleşmeyen giriş', deger:'BANK borç / TEMP alacak · kapatma yok · SB' },
        ],
        not:'Z05 kritiktir: eşleşmeyen para geçici hesaba yazılır. Böylece **banka bakiyesi doğru kalır**, ' +
             'yalnızca karşı taraf belirsizdir.' },

      { baslik:'Katman 4 — İşlem kodları kurallara atanır', tcode:'OT83',
        aciklama:'Bankanın kodları kurallara eşleniyor. Yorumlama algoritması da burada seçiliyor.',
        girdi:[
          { alan:'051 (giden havale)', deger:'→ Kural **Z01** · yorumlama algoritması **001** (belge numarası)' },
          { alan:'052 (giden EFT)', deger:'→ Kural **Z01** · algoritma 001' },
          { alan:'202 (gelen havale)', deger:'→ Kural **Z02** · algoritma **021** (referans belge no)' },
          { alan:'835 (masraf)', deger:'→ Kural **Z03** · algoritma yok' },
          { alan:'840 (BSMV/damga)', deger:'→ Kural **Z03** · algoritma yok' },
          { alan:'951 (faiz)', deger:'→ Kural **Z04** · algoritma yok' },
        ],
        not:'Giden ödemelerde algoritma 001 iyi çalışır çünkü ödeme belgesi numarasını ' +
             '**biz** dosyaya yazarız. Gelen havalelerde ise müşterinin ne yazdığına bağlıdır.' },

      { baslik:'İkinci yükleme — ilk gerçek sonuç', tcode:'FF_5',
        aciklama:'Yapılandırma tamamlandı, dosya yeniden yükleniyor.',
        girdi:[
          { alan:'Sonuç', deger:'118 satır · **74 eşleşti (%63)** · 44 satır {{FEBAN}}’a düştü' },
          { alan:'Eşleşenler', deger:'Tüm giden ödemeler (051, 052) · tüm masraf ve faiz satırları' },
          { alan:'Eşleşmeyenler', deger:'**44 gelen havale** — açıklama metninde fatura numarası yok' },
        ],
        fis:{ baslik:'Belge 1000006001 — Giden ödeme eşleşmesi', belgeTuru:'SB', tarih:'01.09.2026',
          satirlar:[
            { hesap:'102091', ad:'Banka ara hesabı — giden', borc:140000, not:'F110 kalemi **otomatik kapatıldı**' },
            { hesap:'102001', ad:'Bankalar — İŞB', alacak:140000 },
          ], not:'Algoritma 001, açıklama metnindeki ödeme belgesi numarasını buldu ve ara hesabı kapattı. ' +
                 'Hiç insan müdahalesi olmadan.' },
        tabloEtkisi:[
          { tablo:'FEBEP', ne:'74 satır "işlendi", 44 satır "işlenmedi"' },
          { tablo:'BSIS', ne:'Ara hesaptaki 38 kalem kapandı' },
        ] },

      { baslik:'Eşleşmeyenler analiz edilir', tcode:'FEBAN',
        aciklama:'44 gelen havalenin açıklama metinleri inceleniyor. Üç desen çıkıyor.',
        girdi:[
          { alan:'**Desen 1** — 19 satır', deger:'Açıklama: "FT2026000341" → **fatura numarası var** ama algoritma bulamıyor' },
          { alan:'**Desen 2** — 14 satır', deger:'Açıklama: müşteri unvanı yazılmış, numara yok' },
          { alan:'**Desen 3** — 11 satır', deger:'Açıklama boş veya "ODEME"' },
        ],
        not:'Desen 1 bir **yapılandırma sorunudur** — düzeltilebilir. ' +
             'Desen 2 ve 3 ise **süreç sorunudur** — müşteriyle konuşmak gerekir.' },

      { baslik:'Yorumlama algoritması düzeltilir', tcode:'OT83',
        aciklama:'Desen 1 için algoritma değiştiriliyor: referans belge numarası yerine ' +
                 'fatura numarası arayan algoritma seçiliyor.',
        girdi:[
          { alan:'Önceki', deger:'202 → algoritma 021 (referans belge no)' },
          { alan:'**Yeni**', deger:'202 → algoritma **011** (fatura/referans numarası, serbest arama)' },
          { alan:'Sonuç', deger:'19 satırlık desen artık **otomatik eşleşiyor**' },
        ],
        not:'Yorumlama algoritması seçimi eşleşme oranını doğrudan etkiler. ' +
             'İlk seçim yanlıştı ve tek bir ayar değişikliği %16 kazandırdı.' },

      { baslik:'Süreç iyileştirmesi — müşterilere bilgilendirme', tcode:'FEBAN',
        aciklama:'Desen 2 ve 3 için teknik çözüm yok. AR ekibi, düzenli havale gönderen ' +
                 '18 müşteriye açıklama alanına **fatura numarası** yazmalarını bildiriyor.',
        girdi:[
          { alan:'Aksiyon', deger:'18 müşteriye e-posta + fatura dip notuna açıklama eklendi' },
          { alan:'2 hafta sonra', deger:'Desen 2 ve 3 satır sayısı 25’ten **9**’a düştü' },
        ],
        not:'**En büyük kazanç teknik değil süreç iyileştirmesinden geldi.** ' +
             'EBS projelerinde sık gözden kaçan gerçek budur.' },

      { baslik:'Üç hafta sonra — kararlı durum', tcode:'FF_5',
        aciklama:'Yapılandırma ve süreç iyileştirmeleri sonrası günlük rutin oturdu.',
        girdi:[
          { alan:'Günlük satır', deger:'~120' },
          { alan:'**Otomatik eşleşen**', deger:'**106 satır (%88)**' },
          { alan:'{{FEBAN}}’da işlenen', deger:'14 satır · ~15 dakika' },
          { alan:'Geçici hesap (102099) bakiyesi', deger:'Gün sonunda **sıfır** ✓' },
          { alan:'Ara hesap bakiyesi', deger:'1.200.000 TL → **48.000 TL**’ye düştü' },
        ] },
    ],

    sonuc:
      '**Sonuç: %0 → %88 eşleşme, üç haftada.**\n\n' +
      'Kazancın dağılımı: {{OT83}} temel yapılandırması **%63**, yorumlama algoritması düzeltmesi **%16**, ' +
      'müşteri bilgilendirmesi **%9**.\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Hesap sembolü + maske, EBS’in en zarif fikridir.** 6 kural, 11 banka hesabı için çalışıyor. ' +
      'Yeni hesap eklendiğinde hiçbir tanım değişmiyor. Bu mekanizmayı anlamadan EBS kurulamaz.\n\n' +
      '**2. İlk yükleme test modunda yapılır ve amacı kayıt değil, keşiftir:** ' +
      'banka hangi işlem kodlarını gönderiyor? O liste yapılandırmanın yol haritasıdır.\n\n' +
      '**3. Yorumlama algoritması seçimi eşleşme oranını doğrudan belirler.** ' +
      'Tek bir ayar değişikliği %16 kazandırdı. {{FEBAN}}’daki desenler bu ayarın doğru olup olmadığını söyler.\n\n' +
      '**4. En büyük kazanç bazen teknik değildir.** Müşterilere "açıklamaya fatura numarası yazın" ' +
      'demek, hiçbir yapılandırmanın sağlayamayacağı bir iyileştirme getirdi. ' +
      'EBS’i olgunlaştırmak, {{FEBAN}}’daki desenleri okuyup **doğru yerde** müdahale etmektir.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'EBS, bankadan gelen standart dosyanın yüklenip satırların **otomatik muhasebeleştirilmesidir**.',
      'Akış: dosya ({{FF_5}}) → otomatik kayıt (kurallar) → eşleşmeyenler elle ({{FEBAN}}).',
      '{{OT83}} dört katmandır: **hesap sembolleri → sembol-hesap ataması → kayıt kuralları → işlem kodu ataması**.',
      '**Hesap sembolü + maske** sayesinde tek kural tüm banka hesapları için çalışır — EBS’in en özgün fikri.',
      '**Yorumlama algoritması** açıklama metninde ne aranacağını belirler ve eşleşme oranını doğrudan etkiler.',
      'Karşılığı olan hareketler {{banka-ara-hesabi}}nı kapatır; karşılığı olmayanlar (masraf, faiz) doğrudan kaydedilir.',
      'Eşleşmeyen satırlar **geçici hesaba** yazılır — banka bakiyesi doğru kalır, karşı taraf belirsiz olur.',
      'Sağlıklı kurulumda eşleşme oranı **%80–90**; altındaysa kural, algoritma veya süreç iyileştirilmelidir.',
    ],

    onemliNoktalar:[
      '**"Hesap sembolü nedir, neden kullanılır?"** Kayıt kuralında gerçek hesap yerine soyut rol ("BANK") yazılır; maske sayesinde her ev bankası hesabının G/L numarasına çözümlenir. **Tek kural tüm hesaplar için çalışır.** EBS’in en ayırt edici mülakat sorusudur.',
      '**"{{OT83}}’ün dört katmanı nedir?"** (1) hesap sembolleri, (2) sembollere hesap ataması (maske), (3) kayıt kuralları, (4) dış işlem kodu ataması + yorumlama algoritması.',
      '**"Yorumlama algoritması ne işe yarar?"** Açıklama metninde ne aranacağını belirler: belge numarası, fatura numarası, çek numarası, referans. Eşleşme oranını en çok etkileyen ayardır.',
      '**"Eşleşmeyen satır ne olur?"** Geçici hesaba kaydedilir — banka bakiyesi doğru kalır. {{FEBAN}}’da elle düzeltilir. Geçici hesabın bakiyesi **günlük sıfıra inmelidir**.',
      '**"Ekstre yüklendi ama kayıt yok. Neden?"** Yükleme ve muhasebeleştirme **iki ayrı aşamadır**. Satırlar {{FEBAN}}’da bekliyor olabilir veya toplu iş oturumu ({{SM35}}) çalıştırılmamıştır.',
      '**"MT940 ile CAMT.053 farkı?"** CAMT.053 XML tabanlı ve **yapılandırılmış referans alanları** içerir; eşleşme oranı belirgin şekilde yüksektir. Yeni kurulumlarda tercih edilmelidir.',
      '**"Banka masrafı neden ara hesap kullanmaz?"** Muhasebede önceden kaydedilmiş karşılığı yoktur; ilk kez ekstreden öğrenilir.',
      '**"Eşleşme oranı düşükse ne yapılır?"** Üç yerde iyileştirme: kayıt kuralları (eksik işlem kodu), yorumlama algoritması (yanlış arama), süreç (müşteriye açıklama yazdırma).',
    ],

    sikHatalar:[
      { hata:'Yapılandırma yapmadan dosyayı gerçek modda yüklemek.', dogru:'İlk yükleme **test modunda** yapılır; amaç bankanın hangi işlem kodlarını gönderdiğini keşfetmektir.' },
      { hata:'Kayıt kuralında gerçek G/L hesabı yazmak.', dogru:'**Hesap sembolü** kullanılır; maske ile her banka hesabına çözümlenir. Aksi hâlde her hesap için ayrı kural gerekir.' },
      { hata:'Eşleşmeyen satırı kaydetmemek.', dogru:'Geçici hesaba kaydedilir; banka bakiyesi doğru kalır. Kaydetmemek bakiyeyi yanlış bırakır.' },
      { hata:'Geçici hesabın bakiyesini izlememek.', dogru:'Günlük sıfıra inmelidir; birikmesi işlenmemiş satır olduğunu gösterir.' },
      { hata:'"Ekstre yüklendi" ile "muhasebeleşti"yi aynı sanmak.', dogru:'İki ayrı aşamadır. {{FEBA}} yüklemeyi, {{FEBAN}} işlenmeyi gösterir.' },
      { hata:'Ekstre numaralarının sıralı olduğunu kontrol etmemek.', dogru:'Atlanan numara, yüklenmemiş ekstre demektir ve mutabakatta açıklanamayan fark yaratır.' },
      { hata:'{{FEBAN}}’daki tekrar eden deseni elle işlemeye devam etmek.', dogru:'Desen bir **yapılandırma fırsatıdır**; {{OT83}}’te kural eklenerek otomatikleştirilir.' },
      { hata:'Düşük eşleşme oranını yalnızca teknik sorun sanmak.', dogru:'Sebep çoğu zaman süreçtedir: müşteriler açıklamaya fatura numarası yazmıyordur.' },
      { hata:'Banka hesap numarasını {{T012K}}’de dosyadakinden farklı girmek.', dogru:'**Birebir** aynı olmalıdır; boşluk ve format farkı "house bank could not be determined" hatası verir.' },
    ],

    ipuclari:[
      'İlk kurulumda test modunda yükleyip **eşleşmeyen işlem kodlarının listesini** çıkar — ' +
      'bu, {{OT83}} yapılandırmasının yol haritasıdır.',
      'Eşleşme oranını günlük not et; ani düşüş bankanın kod değiştirdiğinin işaretidir.',
      '{{FEBAN}}’daki desenleri oku: tekrar eden bir şey varsa kural ekle, açıklama zayıfsa süreç iyileştir.',
      'Geçici hesap bakiyesini gün sonunda kontrol et — sıfır olmalı.',
      'Yeni kurulumda bankadan **CAMT.053** iste; MT940’a göre eşleşme oranı belirgin şekilde yüksektir.',
      'Müşterilere havale açıklamasına fatura numarası yazmalarını hatırlat — ' +
      'teknik olmayan bu adım eşleşme oranını en çok artıran şeydir.',
    ],

    quiz:[
      { soru:'EBS’te **hesap sembolü** (account symbol) neden kullanılır?',
        secenekler:[
          'Hesapları gizlemek için',
          '**Tek kayıt kuralının tüm banka hesapları için çalışmasını sağlamak için**',
          'Vergi hesaplaması için',
          'Yetki kontrolü için',
        ], dogru:1,
        aciklama:'Kayıt kuralında gerçek hesap yazılsaydı her banka hesabı için ayrı kural gerekirdi ' +
                 '(11 hesap × 8 işlem tipi = 88 kural). Sembol + **maske** sayesinde sistem, ' +
                 'işlenen satırın hangi ev bankası hesabına ait olduğunu bilir ve {{T012K}}’den ' +
                 'G/L numarasını alıp yerine koyar. **6 kural, 11 hesap.**' },

      { soru:'{{OT83}} yapılandırmasının dört katmanı doğru sırayla hangisidir?',
        secenekler:[
          'Kayıt kuralları → semboller → işlem kodu → hesap ataması',
          '**Hesap sembolleri → sembollere hesap ataması → kayıt kuralları → işlem kodu ataması**',
          'İşlem kodu → kayıt kuralları → semboller → hesap ataması',
          'Hesap ataması → semboller → işlem kodu → kayıt kuralları',
        ], dogru:1,
        aciklama:'Önce soyut roller (semboller) tanımlanır, sonra bunlara gerçek hesap/maske atanır, ' +
                 'sonra bu sembolleri kullanan kayıt kuralları yazılır, en son bankanın işlem kodları ' +
                 'bu kurallara eşlenir. Sıra bozulursa referanslar oluşturulamaz.' },

      { soru:'Bir gelen havale eşleşmedi. Sistem ne yapmalıdır?',
        secenekler:[
          'Satırı atlar, kayıt yapmaz',
          '**Geçici hesaba kaydeder — banka bakiyesi doğru kalır**',
          'Hata verir ve tüm yüklemeyi durdurur',
          'Rastgele bir müşteriye bağlar',
        ], dogru:1,
        aciklama:'Kaydetmemek banka bakiyesini yanlış bırakır (para bankada var, muhasebede yok). ' +
                 'Geçici hesaba kaydetmek banka bakiyesini **doğru** tutar; yalnızca karşı taraf belirsiz kalır ' +
                 've {{FEBAN}}’da düzeltilir. Geçici hesabın bakiyesi günlük sıfıra inmelidir.' },

      { soru:'"Ekstre yüklendi ama hiçbir muhasebe kaydı yok." En olası sebep nedir?',
        secenekler:[
          'Dosya bozuk',
          'Banka hesabı tanımlı değil',
          '**Satırlar {{FEBAN}}’da bekliyor veya toplu iş oturumu ({{SM35}}) çalıştırılmamış**',
          'Dönem kapalı',
        ], dogru:2,
        aciklama:'EBS **iki aşamalıdır**: (1) veri yükleme ({{FEBKO}}/{{FEBEP}}), (2) muhasebeleştirme. ' +
                 'Birinci aşama başarılı olsa bile ikincisi tamamlanmamış olabilir. ' +
                 '{{FEBA}} yüklemeyi, {{FEBAN}} işlenmeyi gösterir.' },

      { soru:'Eşleşme oranı %55’te takılı kaldı. En büyük iyileştirme fırsatı genelde nerededir?',
        secenekler:[
          'Daha güçlü donanım',
          'Dosya formatını değiştirmek',
          '**Yorumlama algoritması ve müşterilerin açıklama alanına yazdığı bilgi**',
          'Daha sık yükleme yapmak',
        ], dogru:2,
        aciklama:'Giden ödemeler genelde kolay eşleşir (belge numarasını biz yazarız). ' +
                 'Düşük oranın sebebi neredeyse her zaman **gelen tahsilatlardır**: ' +
                 'ya yorumlama algoritması yanlış seçilmiştir ya da müşteriler açıklamaya ' +
                 'fatura numarası yazmıyordur. İkincisi teknik değil süreç sorunudur.' },

      { soru:'MT940 yerine CAMT.053 tercih edilmesinin ana sebebi nedir?',
        secenekler:[
          'Dosya boyutu küçüktür',
          '**Yapılandırılmış referans alanları içerir; eşleşme oranı belirgin şekilde yüksektir**',
          'Daha hızlı yüklenir',
          'Türkiye’de zorunludur',
        ], dogru:1,
        aciklama:'MT940 metin tabanlıdır ve açıklama tek serbest alandır. ' +
                 'CAMT.053 (ISO 20022 XML) referansları, iş ortağı bilgisini ve tutar detaylarını ' +
                 '**ayrı yapılandırılmış alanlarda** taşır. Bu, otomatik eşleştirmeyi belirgin şekilde kolaylaştırır.' },

      { soru:'Banka masrafı satırı için kayıt kuralında neden kapatma (clearing) tanımlanmaz?',
        secenekler:[
          'Tutarı küçük olduğu için',
          '**Muhasebede önceden kaydedilmiş bir karşılığı yok — ilk kez ekstreden öğreniliyor**',
          'Gider hesabı olduğu için',
          'Vergiye tabi olmadığı için',
        ], dogru:1,
        aciklama:'Kapatma, {{banka-ara-hesabi}}nda **bekleyen bir kalemi** hedefler. ' +
                 'Banka masrafının böyle bir karşılığı yoktur; ilk kez ekstreden öğrenilir. ' +
                 'Bu yüzden kural doğrudan masraf hesabı ile banka hesabı arasında kayıt yapar.' },

      { soru:'Ekstre numaralarında atlama var (243, 245 yüklenmiş ama 244 yok). Sonucu nedir?',
        secenekler:[
          'Hiçbir sorun yok, numaralar önemsizdir',
          '**Yüklenmemiş bir ekstre var; mutabakatta açıklanamayan fark oluşur**',
          'Sistem otomatik tamamlar',
          'Sadece raporlamayı etkiler',
        ], dogru:1,
        aciklama:'Ekstre numaraları sıralıdır ve her ekstrenin açılış bakiyesi bir öncekinin kapanış ' +
                 'bakiyesine eşit olmalıdır. Atlanan numara, o günün hareketlerinin hiç kaydedilmediği ' +
                 'anlamına gelir. {{FEBA}} ile düzenli kontrol edilmeli, eksik ekstre bankadan istenmelidir.' },
    ],

    flashcards:[
      { on:'EBS akışı üç adımda nedir?', arka:'1. **Dosya yükleme** (FF_5) → FEBKO/FEBEP\n2. **Otomatik kayıt** — kayıt kuralları uygulanır\n3. **Elle düzeltme** (FEBAN) — eşleşmeyenler\n\nSağlıklı kurulumda 3. adım küçük kalır.' },
      { on:'OT83’ün dört katmanı nedir?', arka:'1. **Hesap sembolleri** (BANK, OUTGOING, CHARGES)\n2. **Sembollere hesap ataması** — maske ile\n3. **Kayıt kuralları** — sembol borç/alacak\n4. **Dış işlem kodu ataması** + yorumlama algoritması' },
      { on:'Hesap sembolü + maske neden zarif bir çözümdür?', arka:'Kuralda gerçek hesap yerine **"BANK"** yazılır.\n\nMaske (`+++++++91`) o ev bankası hesabının G/L numarasını yerine koyar.\n\n**6 kural, 11 banka hesabı.** Yeni hesap eklendiğinde hiçbir tanım değişmez.' },
      { on:'Yorumlama algoritması ne yapar?', arka:'Açıklama metninde (**not to payee**) **ne aranacağını** belirler:\n• 001 belge numarası\n• 011 fatura/referans\n• 012 çek numarası\n• 021 referans belge no\n\nEşleşme oranını en çok etkileyen ayardır.' },
      { on:'Eşleşmeyen satır ne olur?', arka:'**Geçici hesaba** kaydedilir (örn. 102099).\n\nBanka bakiyesi **doğru kalır**; yalnızca karşı taraf belirsizdir.\n\nFEBAN’da elle düzeltilir. Geçici hesap bakiyesi **günlük sıfıra inmelidir**.' },
      { on:'"Ekstre yüklendi ama kayıt yok" — neden?', arka:'EBS **iki aşamalıdır**:\n1. Veri yükleme (FEBKO/FEBEP)\n2. Muhasebeleştirme\n\nSatırlar FEBAN’da bekliyor olabilir, veya toplu iş oturumu (SM35) çalıştırılmamıştır.\n\nFEBA = yüklendi mi · FEBAN = işlendi mi' },
      { on:'MT940 ile CAMT.053 farkı nedir?', arka:'**MT940** — SWIFT metin formatı, açıklama tek serbest alan, eşleşme %70–85\n\n**CAMT.053** — ISO 20022 XML, **yapılandırılmış referans alanları**, eşleşme %85–95\n\nYeni kurulumda CAMT.053 tercih edilmeli.' },
      { on:'Hangi hareketler ara hesap kullanır, hangileri kullanmaz?', arka:'**Kullanır** (karşılığı var): bizim yaptığımız ödemeler, kaydettiğimiz tahsilatlar → ara hesap kapatılır.\n\n**Kullanmaz** (karşılığı yok): banka masrafı, faiz, beklenmedik havale → doğrudan gerçek hesaba.' },
      { on:'Sağlıklı bir EBS’te eşleşme oranı ne olmalı?', arka:'**%80–90.**\n\nAltındaysa üç yerde iyileştirme:\n1. **Kayıt kuralları** — eksik işlem kodu\n2. **Yorumlama algoritması** — yanlış arama\n3. **Süreç** — müşteri açıklamaya numara yazmıyor\n\nÜçüncüsü genelde en büyük kazancı verir.' },
      { on:'"House bank could not be determined" hatası neden alınır?', arka:'Dosyadaki hesap numarası/IBAN, **T012K**’deki kayıtla eşleşmiyor.\n\nEn sık sebep: boşluk, tire veya format farkı.\n\nFI12’de hesap numarasını dosyadakiyle **birebir** aynı yap.' },
      { on:'FEBAN’da tekrar eden bir desen görürsen ne yapmalısın?', arka:'Bu bir **yapılandırma fırsatıdır**.\n\nOT83’te kural ekleyerek o deseni otomatikleştir.\n\nEBS’in olgunlaşması böyle olur: her ay biraz daha az elle iş.' },
      { on:'S/4HANA’da EBS’te ne değişti?', arka:'**Mantık ve tablolar değişmedi** (FEBKO/FEBEP duruyor, OT83 aynı).\n\nEklenenler:\n• Fiori "Reprocess Bank Statement Items"\n• **Cash Application (ML)** — geçmiş eşleşmelerden öğrenerek öneri\n• Bank Account Management entegrasyonu' },
    ],
  },

  },
});
