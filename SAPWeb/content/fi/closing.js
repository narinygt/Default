/* ==========================================================================
   content/fi/closing.js — "Closing Operations (Kapanış İşlemleri)"
   ========================================================================== */

SAP.registerTopic({
  id: 'closing',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Kapanış, bir dönemin mali tablolarını üretmeden önce yapılan **düzeltme, değerleme ve ' +
      'mutabakat işlemlerinin tamamıdır**. İki ölçekte yaşanır: her ay tekrarlanan **ay sonu kapanışı** ' +
      've yılda bir yapılan, çok daha kapsamlı **yıl sonu kapanışı**.\n\n' +
      'Kapanışın özü şudur: gün içinde kaydedilen işlemler **ham veridir**. ' +
      'Bunlar tek başına doğru bir mali tablo üretmez çünkü bazı gelir ve giderler henüz kaydedilmemiş ' +
      '({{tahakkuk}}), bazı varlıklar değerlenmemiş ({{degerleme}}), bazı kalemler yanlış sınıfta durmaktadır.\n\n' +
      'Kapanış, ham veriyi **raporlanabilir bilgiye** dönüştüren köprüdür.',

    neden:
      '**Doğru dönem sonucu için.** {{tahakkuk-esasi}} gereği gelir ve gider, para hareketinden ' +
      'bağımsız olarak doğduğu döneme yazılmalıdır. Kapanış bu düzeltmeleri yapar.\n\n' +
      '**Yasal zorunluluk.** Mali tablolar belirli sürelerde ve belirli kurallara göre üretilmek zorundadır.\n\n' +
      '**Güvenilirlik.** Kapanış aynı zamanda bir **kontrol turudur**: geçiş hesapları temizlenir, ' +
      'mutabakatlar yapılır, açıklanamayan farklar bulunur. Kapanış yapılmayan bir sistemde ' +
      'hatalar aylarca fark edilmez.\n\n' +
      '**Dönemi kilitlemek.** Kapatılan döneme kayıt yapılamaz; raporlanan rakam değişmez hâle gelir.',

    sirketOnemi:
      'Kapanış, muhasebe departmanının **en yoğun ve en görünür işidir**. Her ay 3–10 gün sürer ve ' +
      'gecikmesi doğrudan yönetime yansır: "Ocak sonuçlarını neden hâlâ göremiyoruz?"\n\n' +
      'Danışmanlık açısından kapanış, FI’ın **tüm alt bileşenlerinin buluştuğu** yerdir: ' +
      'AA amortismanı, AP/AR yaşlandırması, MM’in {{gr-ir}} hesabı, banka mutabakatı, ' +
      'kur değerlemesi — hepsi burada bir araya gelir. Bu yüzden kapanış sorunlarını çözebilmek ' +
      'tüm modülleri bilmeyi gerektirir.\n\n' +
      'Ayırt edici soru şudur: **"Ay sonu kapanış adımlarını sırayla anlat."** ' +
      'Sıranın neden o sıra olduğunu açıklayabilmek, kapanışın gerçekten yapılmış olduğunu gösterir.',

    gercekHayat:
      'Bir üretim şirketinde Ocak kapanışı. Muhasebe müdürünün kontrol listesinde 23 madde var ve ' +
      '**sıra kritik**:\n\n' +
      'Önce MM dönemi kapatılır (yoksa stok hareketleri gelmeye devam eder ve maliyet değişir). ' +
      'Sonra {{gr-ir}} analizi yapılır. Sonra amortisman çalıştırılır — ama {{AFAB}}’dan önce ' +
      'tüm varlık edinimleri kaydedilmiş olmalıdır. Sonra kur değerlemesi, sonra yeniden sınıflamalar, ' +
      'en son bilanço.\n\n' +
      'Sıra bozulursa: amortisman eksik kalır, kur farkı yanlış hesaplanır, bilanço iki kez üretilir. ' +
      'Bu yüzden kapanış bir **kontrol listesi disiplinidir**, teknik bir iş değil.',

    muhasebeMantigi:
      'Kapanış kayıtları dört gruba ayrılır ve her grubun mantığı farklıdır:\n\n' +
      '**1. {{tahakkuk}} kayıtları** — doğmuş ama belgesi gelmemiş gelir/gider. ' +
      'Sonraki dönemde **ters kaydedilir** ({{FBS1}} + {{F.81}}) çünkü gerçek belge gelecektir.\n\n' +
      '**2. {{degerleme}} kayıtları** — dövizli kalemlerin güncel kurla ölçülmesi ({{F.05}}). ' +
      'Genelde **ters kaydedilir** çünkü fark henüz gerçekleşmemiştir.\n\n' +
      '**3. Yeniden sınıflama kayıtları** — tutar doğru ama bilançoda yanlış kalemde duruyor ' +
      '({{F.19}}, {{FAGLF101}}). **Ters kaydedilir** çünkü yalnızca sunum amaçlıdır.\n\n' +
      '**4. Kalıcı kayıtlar** — amortisman ({{AFAB}}), {{karsilik}}lar, kesinleşmiş farklar. ' +
      '**Ters kaydedilmez.**\n\n' +
      'Bu ayrım kritiktir: ilk üç grup **geçicidir** ve sonraki dönemde geri alınır; ' +
      'dördüncü grup kalıcıdır. Karıştırılırsa ya çift kayıt olur ya da düzeltme unutulur.',

    kavramlar: ['donem-sonu', 'kayit-donemi', 'ozel-donem', 'tahakkuk', 'karsilik', 'degerleme',
                'kur-farki', 'bakiye-devri', 'mali-tablo-yapisi', 'gr-ir', 'amortisman'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Kapanış bir **sıralı kontrol listesidir** ve sıra keyfî değildir: her adım bir öncekinin ' +
      'tamamlanmasına bağlıdır. Aşağıdaki akış, tipik bir ay sonu kapanışının mantıksal sırasını gösterir.',

    roller:[
      { rol:'Lojistik / Üretim', gorev:'Tüm mal hareketlerini ve üretim kayıtlarını tamamlar; MM dönemi kapatılır.' },
      { rol:'AP muhasebe', gorev:'Gelen tüm faturaları işler, blokları çözer, {{gr-ir}} farklarını araştırır.' },
      { rol:'AR muhasebe', gorev:'Faturaları keser, tahsilatları kaydeder, yaşlandırma raporunu hazırlar.' },
      { rol:'Duran varlık muhasebecisi', gorev:'Edinim ve çıkışları tamamlar, {{AFAB}} çalıştırır.' },
      { rol:'Banka muhasebecisi', gorev:'Tüm ekstreleri işler, {{banka-ara-hesabi}}nı temizler, mutabakat yapar.' },
      { rol:'Ana muhasebe uzmanı', gorev:'{{tahakkuk}} ve {{karsilik}} kayıtlarını girer, geçiş hesaplarını kapatır.' },
      { rol:'Muhasebe müdürü', gorev:'Kontrol listesini yönetir, dönemleri kapatır ({{OB52}}), tabloları onaylar.' },
      { rol:'FI danışmanı', gorev:'Kapanış programlarını yapılandırır, hataları çözer, kontrol listesini sisteme taşır.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Ay sonu kapanış sırası — her adım bir öncekine bağlı',
      adimlar:[
        { ic:'📦', rol:'Lojistik', baslik:'1. Lojistik dönemi kapatılır',
          aciklama:'MM dönemi kapatılmazsa stok hareketleri gelmeye devam eder ve maliyet sürekli değişir. ' +
                   '**FI kapanışından önce MM kapanmalıdır.**',
          cikti:'Sabitlenmiş stok hareketleri', ok:'faturalar tamamlanır' },
        { ic:'🧾', rol:'AP / AR', baslik:'2. Tüm faturalar işlenir',
          aciklama:'Gelen ve giden faturalar kaydedilir; bloklu faturalar çözülür ({{MRBR}}). ' +
                   'Eksik fatura, eksik gider demektir.',
          cikti:'Tam fatura seti', ok:'GR/IR analizi' },
        { ic:'🔗', rol:'AP muhasebe', baslik:'3. GR/IR analizi ve temizliği',
          aciklama:'{{F.13}} ile eşleşenler kapatılır, {{MR11}} ile kalıcı farklar yazılır, ' +
                   'kalan zamanlama farkı {{F.19}} ile yeniden sınıflanır.',
          cikti:'Temiz {{gr-ir}} hesabı', ok:'varlıklar' },
        { ic:'🏭', rol:'DV muhasebecisi', baslik:'4. Amortisman çalıştırılır',
          aciklama:'{{AFAB}} — ama önce tüm edinim ve çıkışlar kaydedilmiş olmalıdır. ' +
                   'Sonradan gelen bir edinim, amortismanın tekrar çalıştırılmasını gerektirir.',
          cikti:'Amortisman belgesi', ok:'banka' },
        { ic:'🏦', rol:'Banka muhasebecisi', baslik:'5. Banka mutabakatı',
          aciklama:'Tüm ekstreler işlenir ({{FEBAN}}), {{banka-ara-hesabi}} kalemleri kapatılır, ' +
                   'mutabakat tablosu çıkarılır.',
          cikti:'Mutabık banka hesapları', ok:'değerleme' },
        { ic:'💱', rol:'Ana muhasebe', baslik:'6. Yabancı para değerlemesi',
          aciklama:'{{F.05}} / {{FAGL_FC_VAL}} — dövizli açık kalemler ve bakiyeler güncel kurla değerlenir. ' +
                   '**Tüm kalemler kaydedildikten sonra** yapılmalıdır.',
          cikti:'Kur farkı kayıtları', ok:'tahakkuklar' },
        { ic:'📝', rol:'Ana muhasebe', baslik:'7. Tahakkuk ve karşılık kayıtları',
          aciklama:'{{FBS1}} ile ters kaydedilecek {{tahakkuk}}lar; kalıcı {{karsilik}}lar {{FB50}} ile.',
          cikti:'Düzeltme kayıtları', ok:'yeniden sınıflama' },
        { ic:'🔀', rol:'Ana muhasebe', baslik:'8. Yeniden sınıflamalar',
          aciklama:'{{FAGLF101}} — alacak/borç vade sınıflaması, borç bakiyeli müşterinin satıcı tarafına taşınması.',
          cikti:'Doğru sunulmuş bilanço', ok:'kontroller' },
        { ic:'⚖️', rol:'Muhasebe müdürü', baslik:'9. Kontroller ve mutabakatlar',
          aciklama:'Muavin defter toplamı = {{mutabakat-hesabi}} bakiyesi mi? Geçiş hesapları temiz mi? ' +
                   'Mizan denk mi?',
          cikti:'Doğrulanmış veri', ok:'kapatma' },
        { ic:'🔒', rol:'Muhasebe müdürü', baslik:'10. Dönem kapatılır ve tablolar alınır',
          aciklama:'{{OB52}} ile tüm hesap tipleri kapatılır; {{F.01}} / {{S_ALR_87012284}} ile mali tablolar.',
          cikti:'Mali tablolar' },
      ],
    },

    adimlar:[
      { rol:'Lojistik', eylem:'MM dönemini kapatır', sistem:'MMPV — FI’dan **önce**' },
      { rol:'AP / AR', eylem:'Tüm faturaları işler', sistem:'{{MIRO}}, {{FB60}}, {{VF01}}, {{MRBR}}' },
      { rol:'AP muhasebe', eylem:'GR/IR temizliği ve analizi', sistem:'{{F.13}}, {{MR11}}, {{F.19}}' },
      { rol:'DV muhasebecisi', eylem:'Amortisman çalıştırır', sistem:'{{AFAB}} — önce test modu' },
      { rol:'Banka muhasebecisi', eylem:'Ekstreleri işler, mutabakat yapar', sistem:'{{FEBAN}}, {{FBL3N}}' },
      { rol:'Ana muhasebe', eylem:'Kur değerlemesi yapar', sistem:'{{F.05}} / {{FAGL_FC_VAL}}' },
      { rol:'Ana muhasebe', eylem:'Tahakkuk ve karşılık girer', sistem:'{{FBS1}}, {{FB50}}' },
      { rol:'Ana muhasebe', eylem:'Yeniden sınıflama yapar', sistem:'{{FAGLF101}}' },
      { rol:'Muhasebe müdürü', eylem:'Dönemi kapatır', sistem:'{{OB52}} — tüm hesap tipleri' },
      { rol:'Muhasebe müdürü', eylem:'Mali tabloları alır', sistem:'{{F.01}}, {{S_ALR_87012284}}, {{FAGLB03}}' },
      { rol:'Ana muhasebe', eylem:'(Yıl sonu) bakiye devri', sistem:'{{FAGLGVTR}}, {{AJRW}}, {{AJAB}}' },
    ],

    veriAkisi:{
      nereden:'Tüm FI alt bileşenleri ve entegre modüller: MM stok hareketleri, SD faturaları, ' +
              'AA amortismanı, AP/AR kalemleri, banka ekstreleri, {{TCURR}} kurları.',
      nereye:'Düzeltme belgelerine → hesap bakiyelerine → {{mali-tablo-yapisi}} üzerinden bilanço ve ' +
             'gelir tablosuna; yıl sonunda yeni yıl açılış bakiyelerine.',
      tetikleyen:'Takvim: her ayın son iş günü ve mali yıl sonu.',
      sonraki:'Vergi beyanı, konsolidasyon, yönetim raporlaması, denetim.',
    },

    notlar:[
      { tip:'warn', baslik:'Sıra neden önemli?', metin:
        'Kapanış adımları birbirine bağlıdır ve sıra bozulursa iş tekrarlanır:\n\n' +
        '• **MM dönemi FI’dan önce kapatılmazsa** stok hareketleri gelmeye devam eder; ' +
        'GR/IR analizi ve maliyet hesapları geçersiz olur.\n\n' +
        '• **Amortisman edinimlerden önce çalıştırılırsa** yeni varlıklar amortismansız kalır; ' +
        '{{AFAB}} "tekrar" modunda yeniden çalıştırılmalıdır.\n\n' +
        '• **Kur değerlemesi tüm kalemler kaydedilmeden yapılırsa** sonradan gelen dövizli kalemler ' +
        'değerlenmemiş olur.\n\n' +
        '• **Yeniden sınıflama değerlemeden önce yapılırsa** yanlış tutarlar sınıflanır.' },
      { tip:'tip', baslik:'İki dönem aralığı hilesi', metin:
        '{{OB52}}’de iki dönem aralığı vardır. **1. aralık** normal kullanıcılar, ' +
        '**2. aralık** yetki grubu olan kullanıcılar içindir.\n\n' +
        'Kapanış sırasında 1. aralık kapatılır (kullanıcılar kayıt yapamaz) ama 2. aralık açık bırakılır ' +
        '(kapanış ekibi düzeltme yapabilir). Kapanış bitince 2. aralık da kapatılır. ' +
        'Bu, kapanışı hem güvenli hem esnek kılan standart yöntemdir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Kapanış kayıtlarının ayırt edici özelliği **geçici mi kalıcı mı** olduklarıdır. ' +
      'Aşağıda dört tipin örnekleri var; her birinin sonraki dönemde ne olacağına dikkat et.',

    etkilenenHesaplar:[
      { hesap:'381 Gider tahakkukları', tur:'Bilanço — Kaynak', neden:'Doğmuş ama faturası gelmemiş giderler. Sonraki dönemde **ters kaydedilir**.' },
      { hesap:'181 Gelir tahakkukları', tur:'Bilanço — Varlık', neden:'Doğmuş ama faturası kesilmemiş gelirler. Ters kaydedilir.' },
      { hesap:'129 / 47x Karşılıklar', tur:'Bilanço — Kontra varlık / Kaynak', neden:'{{karsilik}}lar **kalıcıdır**; ters kaydedilmez, gerçekleşince kullanılır.' },
      { hesap:'326 Alınan ama faturalanmamış mallar', tur:'Bilanço — Kaynak', neden:'{{gr-ir}} yeniden sınıflaması ({{F.19}}). Sonraki dönem **ters kaydedilir**.' },
      { hesap:'646 / 656 Kur farkı', tur:'Gelir tablosu', neden:'Değerleme farkı. Gerçekleşmemişse sonraki dönem ters kaydedilir.' },
      { hesap:'257 Birikmiş amortisman', tur:'Bilanço — Kontra varlık', neden:'{{AFAB}} kaydı **kalıcıdır**; ters kaydedilmez.' },
      { hesap:'590 Dönem net kârı', tur:'Bilanço — Özkaynak', neden:'Yıl sonunda gelir-gider hesaplarının sonucu buraya aktarılır ({{bakiye-devri}}).' },
    ],

    fisler:[
      { baslik:'Tip 1 — Tahakkuk ({{FBS1}}) · GEÇİCİ, ters kaydedilecek',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — elektrik', borc:45000, not:'Ocakta kullanıldı' },
          { hesap:'381', ad:'Gider tahakkukları', alacak:45000, not:'Fatura henüz gelmedi' },
        ],
        not:'Elektrik Ocakta kullanıldı, faturası Şubatta gelecek. {{tahakkuk-esasi}} gereği gider Ocağa yazılır.\n\n' +
             '{{FBS1}} ile girildiği için **01.02.2027’de {{F.81}} ile otomatik ters kaydedilir**. ' +
             'Gerçek fatura Şubatta girildiğinde çift kayıt olmaz.' },

      { baslik:'Tip 1 devamı — otomatik ters kayıt ({{F.81}})',
        belgeTuru:'SA', tarih:'01.02.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'381', ad:'Gider tahakkukları', borc:45000, not:'Tahakkuk kapandı' },
          { hesap:'770', ad:'Genel yönetim gideri — elektrik', alacak:45000 },
        ],
        not:'Şubatta gerçek fatura 47.000 TL olarak geldi. Net Şubat gideri: −45.000 + 47.000 = **2.000 TL**. ' +
             'Yani Ocak 45.000, Şubat 2.000 gider gördü — tahminle gerçek arasındaki fark doğru döneme dağıldı.' },

      { baslik:'Tip 2 — Kur değerlemesi ({{F.05}}) · GEÇİCİ',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'656', ad:'Kambiyo zararı', borc:38000, not:'Gerçekleşmemiş kur farkı' },
          { hesap:'320', ad:'Satıcılar — değerleme farkı', alacak:38000, not:'Dövizli borç arttı' },
        ],
        not:'10.000 EUR’luk satıcı borcu 35,00 kuruyla kaydedilmişti; 31 Ocak kuru 38,80. ' +
             'Fark 38.000 TL **gerçekleşmemiştir** — borç henüz ödenmedi.\n\n' +
             'Bu yüzden 01.02’de ters kaydedilir. Gerçek fark ödeme anında ({{F110}}) kesinleşir.' },

      { baslik:'Tip 3 — GR/IR yeniden sınıflama ({{F.19}}) · GEÇİCİ',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR hesabı', borc:280000, not:'Geçici boşaltma' },
          { hesap:'326', ad:'Alınan ama faturalanmamış mallar', alacak:280000, not:'Bilanço sunum hesabı' },
        ],
        not:'Tutar doğru, hesap da doğru — ama **bilançoda sunumu yanlış**. GR/IR teknik bir geçiş hesabıdır; ' +
             'bilançoda "alınan ama faturalanmamış mallar" olarak gösterilmelidir.\n\n' +
             'Yalnızca sunum amaçlı olduğu için 01.02’de ters kaydedilir.' },

      { baslik:'Tip 4 — Şüpheli alacak karşılığı · KALICI',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'654', ad:'Karşılık giderleri', borc:120000 },
          { hesap:'129', ad:'Şüpheli ticari alacaklar karşılığı', alacak:120000, not:'**Ters kaydedilmez**' },
        ],
        not:'{{karsilik}} kalıcı bir kayıttır. Ters kaydedilmez; alacak tahsil edilirse ' +
             'karşılık iptal edilerek gelir yazılır, tahsil edilemezse alacak silinirken kullanılır.\n\n' +
             '**Tahakkuk ile karşılık farkı:** tahakkukta tutar bellidir (fatura gelecek), ' +
             'karşılıkta tahmin edilir (tahsil edilir mi bilinmiyor).' },

      { baslik:'Yıl sonu — gelir-gider kapanışı ({{FAGLGVTR}}) · KALICI',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'600', ad:'Yurtiçi satışlar', borc:12400000, not:'Sıfırlanıyor' },
          { hesap:'621', ad:'Satılan malın maliyeti', alacak:7200000, not:'Sıfırlanıyor' },
          { hesap:'770', ad:'Genel yönetim giderleri', alacak:3100000, not:'Sıfırlanıyor' },
          { hesap:'590', ad:'Dönem net kârı', alacak:2100000, not:'Özkaynağa aktarıldı' },
        ],
        not:'{{gelir-tablosu}} hesapları bir **dönemi** ölçer; her yıl sıfırdan başlar. ' +
             'Net sonuç özkaynağa gider. {{bilanco}} hesapları ise bakiyesiyle yeni yıla **devreder**.' },
    ],

    tHesaplar:[
      { hesap:'Gider tahakkukları', kod:'381 (geçici)',
        borc:[{ ad:'Şubat ters kaydı', tutar:45000 }],
        alacak:[{ ad:'Ocak tahakkuku', tutar:45000 }],
        not:'Sonraki dönem sıfırlanır' },
      { hesap:'Şüpheli alacak karşılığı', kod:'129 (kalıcı)',
        borc:[],
        alacak:[{ ad:'Ayrılan karşılık', tutar:120000 }],
        not:'Ters kaydedilmez; gerçekleşince kullanılır' },
      { hesap:'GR/IR hesabı', kod:'159',
        borc:[{ ad:'F.19 sınıflama', tutar:280000 }],
        alacak:[{ ad:'Mal girişleri (net)', tutar:280000 }],
        not:'Sınıflama sonraki dönem geri alınır' },
      { hesap:'Dönem net kârı', kod:'590 (özkaynak)',
        borc:[],
        alacak:[{ ad:'Yıl sonu aktarımı', tutar:2100000 }],
        not:'Gelir tablosunun sonucu' },
    ],

    notlar:[
      { tip:'warn', baslik:'Geçici mi kalıcı mı? — kapanışın en kritik ayrımı', metin:
        'Bir kapanış kaydının sonraki dönemde ters kaydedilip kaydedilmeyeceğini bilmek zorunludur:\n\n' +
        '**Ters kaydedilir (geçici):** {{tahakkuk}}lar, gerçekleşmemiş {{degerleme}} farkları, ' +
        'yeniden sınıflamalar. Ortak özellikleri: gerçek belge/işlem **sonradan gelecek**.\n\n' +
        '**Ters kaydedilmez (kalıcı):** amortisman, {{karsilik}}lar, kesinleşmiş farklar, ' +
        'kalıcı GR/IR farkı yazımı ({{MR11}}).\n\n' +
        'Karıştırılırsa: geçici kayıt ters kaydedilmezse **çift gider** oluşur; ' +
        'kalıcı kayıt ters kaydedilirse **gider kaybolur**. Her ikisi de mali tabloyu bozar.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Kapanış üç ölçekte yaşanır ve her birinin kapsamı farklıdır: **gün sonu**, **ay sonu**, **yıl sonu**. ' +
      'Ayrıca kapanış kayıtları geçici/kalıcı olarak ikiye ayrılır.',

    liste:[
      { ad:'Gün sonu kapanışı', en:'Daily Closing',
        aciklama:'Günlük rutin kontroller: banka ekstresi işlendi mi, toplu işler tamamlandı mı, ' +
                 'hatalı belgeler var mı.',
        neZaman:'Her iş günü sonunda. Hafif bir kontrol turudur, muhasebe kaydı üretmez.',
        ornek:'{{FEBAN}}’da bekleyen satır kaldı mı? {{SM13}}’te takılan güncelleme var mı?' },

      { ad:'Ay sonu kapanışı', en:'Month-End Closing',
        aciklama:'Asıl kapanış. Tahakkuklar, değerlemeler, amortisman, mutabakatlar ve mali tablolar.',
        neZaman:'Her ayın sonunda; tipik olarak 3–10 iş günü sürer.',
        ornek:'Bu konunun ana odağı. 10 adımlık standart akış.',
        tcodes:['OB52','AFAB','F.05','F.19','FAGLF101','F.01'] },

      { ad:'Yıl sonu kapanışı', en:'Year-End Closing',
        aciklama:'Ay sonu kapanışının tamamı **artı** yıla özgü işlemler: {{bakiye-devri}}, ' +
                 'AA yıl kapanışı, envanter sayımı, vergi hesaplamaları, denetim hazırlığı.',
        neZaman:'Mali yıl sonunda; haftalar sürebilir ve denetimle iç içe geçer.',
        ornek:'{{FAGLGVTR}} bakiye devri + {{AJRW}}/{{AJAB}} varlık yıl kapanışı.',
        tcodes:['FAGLGVTR','AJRW','AJAB','F.16'] },

      { ad:'Özel dönem kapanışı', en:'Special Period Closing',
        aciklama:'{{ozel-donem}}ler (13–16), Aralık kaydından **ayrı** tutulması gereken yıl sonu ' +
                 'düzeltmeleri için kullanılır.',
        neZaman:'Denetim düzeltmeleri, vergi ayarlamaları, geç gelen bilgiler için. ' +
                'Aralık ayının kendi rakamı bozulmadan düzeltme yapılmasını sağlar.',
        ornek:'Denetçi Aralık sonrası 500.000 TL’lik bir düzeltme istedi → dönem 13’e kaydedilir.',
        tcodes:['OB52','OB29'] },

      { ad:'Geçici kapanış kaydı', en:'Reversing Entry',
        aciklama:'Sonraki dönemde **otomatik ters kaydedilen** kayıt. Gerçek belge sonradan geleceği için.',
        neZaman:'{{tahakkuk}}lar, gerçekleşmemiş {{degerleme}} farkları, sunum amaçlı yeniden sınıflamalar.',
        ornek:'{{FBS1}} ile girilir, {{F.81}} ile toplu ters kaydedilir.',
        tcodes:['FBS1','F.81','F.05','F.19'] },

      { ad:'Kalıcı kapanış kaydı', en:'Permanent Entry',
        aciklama:'Ters kaydedilmeyen, kesin kayıt.',
        neZaman:'Amortisman, {{karsilik}}lar, kesinleşmiş fark yazımları.',
        ornek:'{{AFAB}} amortismanı, şüpheli alacak karşılığı, {{MR11}} ile yazılan GR/IR farkı.',
        tcodes:['AFAB','FB50','MR11'] },

      { ad:'Yeniden sınıflama', en:'Reclassification',
        aciklama:'Tutar ve hesap doğru ama **bilançoda sunumu** yanlış olan kalemlerin taşınması.',
        neZaman:'{{gr-ir}} bakiyesi, borç bakiyeli müşteri (satıcı tarafına), alacak bakiyeli satıcı, ' +
                'vade bazında kısa/uzun vadeli ayrımı.',
        ornek:'{{F.19}} GR/IR sınıflaması, {{FAGLF101}} alacak/borç vade sınıflaması.',
        tcodes:['F.19','FAGLF101'] },
    ],

    karsilastirmaBasliklar:['Tahakkuk (Accrual)', 'Karşılık (Provision)'],
    karsilastirma:[
      ['Tutar', '**Bellidir** — fatura gelecek', '**Tahmindir** — belirsiz'],
      ['Zamanlama', 'Belli — sonraki dönem', 'Belirsiz'],
      ['Gerçekleşme', 'Neredeyse kesin', 'Muhtemel ama kesin değil'],
      ['Ters kaydedilir mi', '**Evet** — sonraki dönem otomatik', '**Hayır** — kalıcıdır'],
      ['Örnek', 'Kullanılmış ama faturası gelmemiş elektrik', 'Şüpheli alacak, kıdem tazminatı, garanti'],
      ['SAP işlemi', '{{FBS1}} + {{F.81}}', '{{FB50}} — normal kayıt'],
      ['Bilanço kalemi', '381 Gider tahakkukları', '129 / 47x Karşılıklar'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'OB52', ad:'Kayıt dönemi açma / kapama',
        amac:'Hangi dönemlerin hangi {{hesap-tipi}} için açık olduğunu belirler. Kapanışın kilit taşıdır.',
        neZaman:'Her ay sonu kapanışında ve "posting period not open" hatasında.',
        adimlar:[
          { baslik:'Dönem varyantını seç',
            aciklama:'Şirket kodu bir varyanta atanmıştır ({{OBY6}}); birden çok şirket aynı varyantı paylaşabilir. ' +
                     'Varyantı değiştirmek **tüm bağlı şirketleri** etkiler.' },
          { baslik:'Hesap tipi satırlarını ayrı ayrı ayarla',
            aciklama:'**+** tüm tipler için varsayılan, **S** ana muhasebe, **D** müşteri, **K** satıcı, ' +
                     '**A** duran varlık, **M** malzeme. Her satır bağımsızdır.' },
          { baslik:'İki dönem aralığını kullan',
            aciklama:'**1. aralık** normal kullanıcılar için. **2. aralık** yetki grubu olan kullanıcılar için — ' +
                     'kapanış ekibinin ayrıcalıklı erişimi böyle sağlanır.' },
          { baslik:'Yetki grubunu gir', aciklama:'2. aralığa erişecek kullanıcıların yetki grubu (örn. FI01).' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Dönem varyantı 1000' },
          { ekran:'Satır: hesap tipi +', islem:'1. aralık: 02/2027–02/2027 · 2. aralık: 01/2027–02/2027 · yetki grubu FI01' },
          { ekran:'Satır: hesap tipi K', islem:'Aynı şekilde ayarlanır — S’yi açmak K’yı açmaz' },
        ],
        alanlar:{
          zorunlu:['Dönem varyantı','Hesap tipi','1. aralık başlangıç/bitiş','Mali yıl'],
          opsiyonel:['2. aralık','Yetki grubu','Hesap aralığı'] },
        hatalar:[
          { mesaj:'Posting period 001 2027 is not open for account type K', sebep:'Yalnızca S satırı açılmış.', cozum:'**K** satırında da dönemi aç. Hesap tipleri ayrı ayrı yönetilir — en sık yapılan kapanış hatasıdır.' },
          { mesaj:'You are not authorized for posting period', sebep:'Kullanıcı 2. aralığa erişim yetki grubunda değil.', cozum:'Yetki ekibiyle kullanıcıyı ilgili gruba ekle veya 1. aralığı geçici aç.' },
        ],
        ipucu:'Kapanış sırasında **1. aralığı kapat, 2. aralığı açık bırak**: kullanıcılar kayıt yapamaz ' +
              'ama kapanış ekibi düzeltme yapabilir. Kapanış bitince 2. aralık da kapatılır. ' +
              'Bu, kapanışı hem güvenli hem esnek kılan standart yöntemdir.',
        ilgili:['OBY6','T001B','FB50','OB29'] },

      { kod:'FBS1', ad:'Ters kayıtlanacak tahakkuk belgesi',
        amac:'{{tahakkuk}} kaydını, sonraki dönemde **otomatik ters kaydedilecek** şekilde girer.',
        neZaman:'Doğmuş ama belgesi gelmemiş gelir/gider kayıtlarında.',
        adimlar:[
          { baslik:'Normal belge girişi gibi başla: tarihler, şirket kodu, kalemler' },
          { baslik:'**Ters kayıt tarihi** ve **ters kayıt nedeni** alanlarını doldur',
            aciklama:'Bu iki alan {{FBS1}}’i normal kayıttan ayırır. Ters kayıt tarihi genelde ' +
                     'sonraki dönemin ilk günüdür (01.02.2027).' },
          { baslik:'Kaydet',
            aciklama:'Belge normal şekilde muhasebeleşir; ayrıca "ters kaydedilecek" olarak işaretlenir.' },
          { baslik:'Sonraki dönemde {{F.81}} çalıştır',
            aciklama:'Vadesi gelen tüm tahakkuk belgeleri **topluca** ters kaydedilir.' },
        ],
        alanlar:{
          zorunlu:['Belge tarihi','Kayıt tarihi','Şirket kodu','Ters kayıt tarihi','Ters kayıt nedeni','Kalemler'],
          opsiyonel:['Referans','Başlık metni'] },
        hatalar:[
          { mesaj:'Reversal date must be after posting date', sebep:'Ters kayıt tarihi kayıt tarihinden önce.', cozum:'Sonraki dönemin bir tarihini gir.' },
          { mesaj:'Posting period for reversal date is not open', sebep:'Ters kayıt tarihinin dönemi henüz açılmamış.', cozum:'Normaldir — {{F.81}} çalıştırılırken o dönem açık olacaktır. Kayıt yine de yapılır.' },
        ],
        ipucu:'{{FBS1}} kullanmadan elle tahakkuk girip sonraki ay ters kaydetmeyi **unutmak**, ' +
              'kapanışta en sık yapılan hatalardan biridir ve **çift gider** yaratır. ' +
              'FBS1 bu riski yapısal olarak ortadan kaldırır.',
        ilgili:['F.81','FB50','FB08'] },

      { kod:'F.81', ad:'Tahakkuk belgelerini ters kaydet',
        amac:'{{FBS1}} ile girilmiş tahakkukları planlanan tarihte topluca ters kaydeder.',
        neZaman:'Her ayın ilk günlerinde, önceki ayın tahakkuklarını geri almak için.',
        adimlar:[
          { baslik:'Şirket kodu ve ters kayıt tarih aralığını gir' },
          { baslik:'**Önce test modunda** çalıştır', aciklama:'Hangi belgelerin ters kaydedileceğini gösterir.' },
          { baslik:'Sonucu incele, gerçek modda çalıştır' },
        ],
        ipucu:'Bu adımı kontrol listesine koy ve **ayın ilk iş günü** çalıştır. ' +
              'Unutulursa geçen ayın tahakkukları duruyor demektir ve bu ayın gideri şişer.',
        hatalar:[
          { mesaj:'No documents selected', sebep:'O tarih aralığında ters kaydedilecek tahakkuk yok.', cozum:'Tarih aralığını kontrol et; {{FBS1}} ile girilen belgelerin ters kayıt tarihine bak.' },
        ],
        ilgili:['FBS1','FB08','F.80'] },

      { kod:'F.19', ad:'GR/IR analizi ve yeniden sınıflama',
        amac:'{{gr-ir}} hesabının bakiyesini bilançoda doğru kalemde sunar.',
        neZaman:'Her ay sonunda, GR/IR temizliğinden sonra.',
        adimlar:[
          { baslik:'Şirket kodu, hesap aralığı ve anahtar tarihi gir' },
          { baslik:'Ters kayıt tarihini gir',
            aciklama:'Genelde sonraki dönemin ilk günü. Sınıflama **yalnızca sunum amaçlıdır** ve geri alınır.' },
          { baslik:'Test modunda çalıştır ve sonucu incele',
            aciklama:'Mal geldi/fatura gelmedi (alacak bakiye) ve fatura geldi/mal gelmedi (borç bakiye) ' +
                     'kalemleri **ayrı** sınıflanır — biri kaynak, diğeri varlık tarafında gösterilir.' },
          { baslik:'Gerçek modda çalıştır' },
        ],
        ipucu:'{{F.19}} bakiyeyi **azaltmaz**, yalnızca taşır. GR/IR bakiyesi gerçekten yüksekse ' +
              'sorun sınıflamada değil, eşleşmemiş kalemlerdedir — önce {{F.13}} ve {{MR11}} çalıştırılmalıdır.',
        hatalar:[
          { mesaj:'Account ... is not a GR/IR account', sebep:'Hesap GR/IR olarak yapılandırılmamış.', cozum:'IMG’de GR/IR hesap tanımını kontrol et.' },
        ],
        ilgili:['F.13','MR11','FBL3N','gr-ir'] },

      { kod:'FAGLF101', ad:'Alacak/borç yeniden sınıflama',
        amac:'Alacak ve borçları vadeye göre kısa/uzun vadeli sınıflar; ' +
             'borç bakiyeli müşteriyi satıcı tarafına, alacak bakiyeli satıcıyı müşteri tarafına taşır.',
        neZaman:'Ay ve yıl sonu kapanışında, bilanço üretilmeden önce.',
        adimlar:[
          { baslik:'Şirket kodu, anahtar tarih ve değerleme alanını gir' },
          { baslik:'Sınıflama ve ters kayıt tarihlerini belirle' },
          { baslik:'Test modunda çalıştır',
            aciklama:'Hangi kalemlerin taşınacağını gösterir: 1 yıldan uzun vadeli alacaklar, ' +
                     'borç bakiyeli müşteriler, alacak bakiyeli satıcılar.' },
          { baslik:'Gerçek modda çalıştır' },
        ],
        ipucu:'Borç bakiyeli bir müşteri (fazla ödeme yapmış), bilançoda **alacak tarafında** değil ' +
              '**borç tarafında** gösterilmelidir — çünkü artık ona borçlusundur. ' +
              'Bu sınıflama olmadan bilanço yanıltıcı olur.',
        ilgili:['F.19','F.01','yaslandirma'] },

      { kod:'FAGLGVTR', ad:'Bakiye devri (yıl sonu)',
        amac:'Bilanço hesaplarının bakiyesini yeni yıla, gelir-gider hesaplarının sonucunu özkaynağa aktarır.',
        neZaman:'Yıl sonunda. **Tekrar çalıştırılabilir** — yeni kayıtlar geldikçe fark aktarılır.',
        adimlar:[
          { baslik:'Şirket kodu ve devredilecek mali yılı gir' },
          { baslik:'Defter (ledger) seç',
            aciklama:'{{paralel-defter}} varsa **her defter için ayrı** çalıştırılmalıdır.' },
          { baslik:'Test modunda çalıştır ve sonucu incele' },
          { baslik:'Gerçek modda çalıştır',
            aciklama:'Bilanço hesapları bakiyeleriyle devreder; gelir-gider hesapları sıfırlanır ve ' +
                     'sonuç özkaynaktaki kâr/zarar hesabına gider.' },
        ],
        ipucu:'{{FAGLGVTR}} **tekrar çalıştırılabilir bir işlemdir**. Yıl kapandıktan sonra geçmiş yıla ' +
              'düzeltme kaydı girilirse yeniden çalıştırılarak devir güncellenir. ' +
              'Bu yüzden erken çalıştırmaktan çekinme.',
        hatalar:[
          { mesaj:'Retained earnings account not defined', sebep:'Kâr/zarar aktarım hesabı tanımlanmamış.', cozum:'IMG → Bakiye devri → kâr/zarar hesabını gelir-gider hesap tipine ata.' },
        ],
        ilgili:['F.16','AJRW','AJAB','OB52'] },

      { kod:'F.01', ad:'Bilanço / gelir tablosu',
        amac:'{{mali-tablo-yapisi}}na göre bilanço ve gelir tablosu üretir.',
        neZaman:'Kapanışın son adımında ve her mutabakat kontrolünde.',
        adimlar:[
          { baslik:'Şirket kodu ve dönem aralığını gir' },
          { baslik:'{{mali-tablo-yapisi}} (FSV) seç',
            aciklama:'Hangi hesabın hangi satırda görüneceğini bu yapı belirler. ' +
                     'Farklı amaçlar için farklı FSV kullanılabilir (yasal, yönetim, IFRS).' },
          { baslik:'Karşılaştırma dönemini gir', aciklama:'Geçen yılın aynı dönemiyle karşılaştırma.' },
          { baslik:'Çalıştır ve hiyerarşiyi incele' },
        ],
        hatalar:[
          { mesaj:'Aktif ve pasif toplamı eşit değil', sebep:'FSV’de bir hesap hiçbir kaleme atanmamış.', cozum:'{{OB58}} → FSV’de "atanmamış hesaplar" kalemini kontrol et. Veri hatası **değildir** — SAP zaten dengesiz belge kabul etmez.' },
        ],
        ipucu:'Bilanço tutmuyorsa panik yapma: sorun neredeyse her zaman {{OB58}}’de ' +
              '**atanmamış bir hesaptır**. FSV’de o kalem özellikle kontrol edilir.',
        ilgili:['OB58','S_ALR_87012284','FAGLB03','GR55'] },

      { kod:'AJAB', ad:'Duran varlık yıl sonu kapanışı',
        amac:'Varlık muhasebesinde mali yılı kapatır.',
        neZaman:'Yıl sonunda, tüm {{AFAB}} koşuları tamamlandıktan sonra.',
        adimlar:[
          { baslik:'Şirket kodu ve kapatılacak yılı gir' },
          { baslik:'Test modunda çalıştır — engelleri gör',
            aciklama:'Eksik amortisman koşusu, hatalı varlıklar, dengesiz alanlar listelenir.' },
          { baslik:'Engelleri gider, gerçek modda kapat' },
        ],
        ipucu:'Sıra: **{{AJRW}} (yeni yıl aç) → yıl boyunca {{AFAB}} → {{AJAB}} (eski yılı kapat)**. ' +
              'AJRW yapılmadan yeni yıla varlık kaydı yapılamaz.',
        ilgili:['AJRW','AFAB','OB52'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Kapanışın kendi tabloları azdır; asıl iş **mevcut tablolar üzerinde düzeltme kayıtları üretmektir**. ' +
      'Kapanışa özgü tek yapılandırma tablosu {{T001B}} (dönem kontrolü) ve raporlamayı belirleyen ' +
      '{{mali-tablo-yapisi}} tanımlarıdır.',

    liste:[
      { ad:'T001B', baslik:'Kayıt dönemi açık/kapalı tanımı',
        tutar:'{{OB52}}’de girilen dönem satırları: dönem varyantı, hesap tipi, iki dönem aralığı, yetki grubu.',
        olusturan:'{{OB52}}',
        guncelleyen:'{{OB52}} — her ay sonu',
        anahtar:'RRCTY + BUKRS + MKOAR + BKONT',
        iliskiler:'Şirket kodu {{T001}} üzerinden dönem varyantına bağlıdır ({{OBY6}} ile atanır).',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'MKOAR', aciklama:'Hesap tipi: **+** varsayılan, **S** ana muhasebe, **D** müşteri, **K** satıcı, **A** varlık, **M** malzeme' },
          { ad:'FRPE1 / TOPE1', aciklama:'**1. dönem aralığı** — normal kullanıcılar' },
          { ad:'FRPE2 / TOPE2', aciklama:'**2. dönem aralığı** — yetki grubu olanlar (kapanış ekibi)' },
          { ad:'BRGRU', aciklama:'Yetki grubu — 2. aralığa kimler erişebilir' },
        ] },

      { ad:'T009', baslik:'Mali yıl varyantı',
        tutar:'Yılın kaç normal ve kaç {{ozel-donem}}e bölündüğü, dönem sınırları.',
        olusturan:'{{OB29}}',
        guncelleyen:'{{OB29}}',
        anahtar:'PERIV',
        iliskiler:'{{T001}}.PERIV üzerinden şirket koduna bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'ANZBP', aciklama:'Normal dönem sayısı (genelde 12)' },
          { ad:'ANZSP', aciklama:'**Özel dönem sayısı** (genelde 4) — yıl sonu düzeltmeleri için' },
        ] },

      { ad:'BKPF', baslik:'Kapanış belgelerinin başlığı',
        tutar:'Kapanış kayıtlarının başlıkları. Tahakkuk belgelerinde ters kayıt bilgisi de burada.',
        olusturan:'{{FBS1}}, {{AFAB}}, {{F.05}}, {{F.19}}, {{FAGLGVTR}}',
        guncelleyen:'Kapanış programları',
        anahtar:'BUKRS + BELNR + GJAHR',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'STGRD / STJAH', aciklama:'**Ters kayıt nedeni ve yılı** — {{FBS1}} belgelerinde dolu' },
          { ad:'STODT', aciklama:'**Planlanan ters kayıt tarihi** — {{F.81}} bu tarihe bakar' },
          { ad:'MONAT', aciklama:'Kayıt dönemi — özel dönem kayıtlarında 13–16 olur' },
        ] },

      { ad:'ACDOCA', baslik:'Evrensel Kayıt Defteri',
        tutar:'Tüm kapanış kayıtları burada da tutulur; defter bazında ayrışır.',
        olusturan:'Kapanış işlemleri',
        guncelleyen:'Tüm kapanış programları',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{paralel-defter}} varsa her defter için ayrı kapanış yapılır.',
        s4:'S/4HANA’da bakiyeler buradan **anlık hesaplanır**; ayrı toplam tablosu yoktur.',
        alanlar:[
          { ad:'RLDNR', aciklama:'{{defter}} — {{FAGLGVTR}} her defter için ayrı çalıştırılır' },
          { ad:'POPER', aciklama:'Kayıt dönemi' },
        ] },

      { ad:'FAGLFLEXT', baslik:'Yeni ana muhasebe toplam tablosu',
        tutar:'Hesap/defter/dönem bazında toplamlar. Bakiye devri bu tabloya yazardı.',
        olusturan:'ECC’de her kayıt',
        guncelleyen:'ECC’de kayıt ve bakiye devri',
        s4:'**Kaldırıldı** — {{uyumluluk-view}}. Toplamlar {{ACDOCA}}’dan anlık hesaplanır ve ' +
            'bakiye devri artık toplam tablosu güncellemez.' },

      { ad:'ANLC', baslik:'Varlık yıllık değerleri',
        tutar:'Varlıkların yıl bazında değerleri. {{AJAB}} yıl kapanışında kontrol edilir.',
        olusturan:'{{AFAB}}, edinim/çıkış işlemleri',
        guncelleyen:'AA işlemleri',
        s4:'{{ACDOCA}}’ya taşındı; uyumluluk amaçlıdır.' },
    ],

    er:{
      type:'er',
      baslik:'Kapanış yapılandırması ve belge ilişkileri',
      varliklar:[
        { ad:'T009', rol:'Yapılandırma', aciklama:'Mali yıl varyantı',
          alanlar:[{ ad:'PERIV', tip:'pk' }, { ad:'ANZBP' }, { ad:'ANZSP' }] },
        { ad:'T001', rol:'Yapılandırma', aciklama:'Şirket kodu',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'PERIV', tip:'fk' }] },
        { ad:'T001B', rol:'Yapılandırma', hub:true, aciklama:'Dönem kontrolü',
          alanlar:[{ ad:'BUKRS', tip:'fk' }, { ad:'MKOAR', tip:'pk' }, { ad:'FRPE1' }, { ad:'FRPE2' }, { ad:'BRGRU' }] },
        { ad:'BKPF', rol:'Belge', aciklama:'Kapanış belgeleri',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'MONAT' }, { ad:'STODT' }, { ad:'STGRD' }] },
        { ad:'BSEG', rol:'Kalem', aciklama:'Düzeltme kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT', tip:'fk' }, { ad:'DMBTR' }] },
        { ad:'ACDOCA', rol:'Evrensel', aciklama:'Defter bazlı kapanış',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'POPER' }] },
        { ad:'SKB1', rol:'Ana veri', aciklama:'Hesap ayarları',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'XOPVW' }] },
      ],
      iliskiler:[
        { from:'T009', to:'T001', alanlar:'PERIV', not:'şirket kodu bir mali yıl varyantına bağlıdır' },
        { from:'T001', to:'T001B', alanlar:'BUKRS → dönem varyantı', not:'dönem kontrolü' },
        { from:'T001B', to:'BKPF', alanlar:'dönem kontrolü', not:'kayıt izni verir' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'başlık → kalem' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR + GJAHR', not:'defter bazlı görünüm' },
        { from:'BSEG', to:'SKB1', alanlar:'HKONT → SAKNR', not:'kalemin hesabı' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Kapanış tek bir ekranda yaşanmaz; **bir dizi programın doğru sırayla çalıştırılmasıdır**. ' +
      'Aşağıda en kritik üç ekranın ayrıntısı ve kapanış kontrol listesinin kendisi var.',

    ekranlar:[
      { ad:'{{OB52}} — dönem kontrol ekranı',
        aciklama:'Kapanışın kilit taşı. Her satır bir hesap tipi için dönem izni tanımlar.',
        alanlar:[
          { ad:'Dönem varyantı', zorunlu:true, aciklama:'**Dikkat:** varyant birden çok şirket kodu tarafından paylaşılabilir; değişiklik hepsini etkiler.' },
          { ad:'Hesap tipi (`MKOAR`)', zorunlu:true, aciklama:'**+** varsayılan (diğer satır yoksa geçerli), **S/D/K/A/M** özel. Özel satır varsa **+** yerine o geçerlidir.' },
          { ad:'1. dönem aralığı', zorunlu:true, aciklama:'Normal kullanıcıların kayıt yapabileceği dönemler.' },
          { ad:'2. dönem aralığı', zorunlu:false, aciklama:'**Yetki grubu olanların** kayıt yapabileceği dönemler — kapanış ekibi için.' },
          { ad:'Yetki grubu (`BRGRU`)', zorunlu:false, aciklama:'2. aralığa kimlerin erişeceğini belirler.' },
        ],
        ipucu:'**+** satırı bir "varsayılan"dır. S için özel bir satır varsa, S kayıtlarında ' +
              '**+** satırı değil o satır geçerlidir. "Dönemi açtım ama hâlâ hata alıyorum" ' +
              'şikâyetinin sebebi genelde bu önceliği bilmemektir.' },

      { ad:'{{FBS1}} — tahakkuk giriş ekranı',
        aciklama:'Normal belge girişine iki alan eklenmiştir; onlar bu ekranı özel kılar.',
        alanlar:[
          { ad:'Belge/kayıt tarihi', zorunlu:true, aciklama:'Kapanış dönemine ait (örn. 31.01.2027).' },
          { ad:'**Ters kayıt tarihi** (`STODT`)', zorunlu:true, aciklama:'Genelde sonraki dönemin ilk günü (01.02.2027). {{F.81}} bu tarihe bakar.' },
          { ad:'**Ters kayıt nedeni** (`STGRD`)', zorunlu:true, aciklama:'Ters kaydın hangi tarihe düşeceğini belirler; tahakkuk için alternatif tarih gerektiren neden seçilir.' },
          { ad:'Kalemler', zorunlu:true, aciklama:'Gider/gelir hesabı ve tahakkuk hesabı (381/181).' },
        ],
        ipucu:'Ters kayıt tarihini **sonraki dönemin ilk günü** yap. Ay ortası bir tarih verirsen ' +
              'tahakkuk o ayın bir kısmında duruyor, kalanında durmuyor gibi görünür ve ' +
              'ara raporlar yanıltıcı olur.' },

      { ad:'{{F.05}} — kur değerlemesi ekranı',
        aciklama:'Dövizli kalemlerin ve bakiyelerin güncel kurla değerlenmesi.',
        alanlar:[
          { ad:'Şirket kodu / Değerleme anahtar tarihi', zorunlu:true, aciklama:'Genelde ayın son günü.' },
          { ad:'Değerleme yöntemi', zorunlu:true, aciklama:'{{OB59}}’da tanımlı: hangi {{kur-tipi}}, hangi ilke (düşük değerle / her zaman), ters kaydedilecek mi.' },
          { ad:'Değerlenecek kalemler', zorunlu:true, aciklama:'G/L bakiyeleri, satıcı açık kalemleri, müşteri açık kalemleri — ayrı ayrı işaretlenir.' },
          { ad:'Ters kayıt tarihi', zorunlu:false, aciklama:'Gerçekleşmemiş fark ters kaydedilecekse.' },
          { ad:'Test modu', zorunlu:false, aciklama:'**Her zaman önce test.** Değerleme çok sayıda belge üretir.' },
        ],
        ipucu:'Değerleme **tüm kalemler kaydedildikten sonra** yapılmalıdır. Sonradan gelen bir ' +
              'dövizli fatura değerlenmemiş kalır ve kapanış tekrarlanır.' },

      { ad:'Kapanış kontrol listesi — sistemdeki karşılığı',
        aciklama:'Kapanış bir ekran değil, bir disiplindir. SAP’ta üç şekilde yönetilir.',
        alanlar:[
          { ad:'Elle kontrol listesi', zorunlu:false, aciklama:'Excel veya doküman. Küçük şirketlerde yaygın; hataya açık.' },
          { ad:'Schedule Manager (SCMA)', zorunlu:false, aciklama:'SAP’ın kapanış görev planlayıcısı: adımlar, bağımlılıklar, sorumlular ve durum takibi.' },
          { ad:'Fiori Financial Closing Cockpit', zorunlu:false, aciklama:'S/4HANA’da modern karşılığı; görev şablonları, otomatik çalıştırma ve ilerleme izleme.' },
        ],
        ipucu:'Kapanışı Excel’den sisteme taşımak, kapanış süresini kısaltmanın en etkili yoludur: ' +
              'bağımlılıklar zorlanır, adım atlanmaz, durum herkesçe görünür.' },
    ],

    zorunlu:['Dönem varyantı','Hesap tipi','Dönem aralığı','Şirket kodu','Değerleme anahtar tarihi','Ters kayıt tarihi (tahakkukta)'],
    opsiyonel:['2. dönem aralığı','Yetki grubu','Değerleme yöntemi','Test modu','Karşılaştırma dönemi'],

    hatalar:[
      { mesaj:'Posting period ... is not open for account type ...', sebep:'{{OB52}}’de ilgili hesap tipi kapalı.', cozum:'Her hesap tipini **ayrı ayrı** aç. **+** satırı varsayılandır; özel satır varsa o geçerlidir.' },
      { mesaj:'Depreciation not completely posted for fiscal year', sebep:'{{AJAB}} öncesi tüm dönemlerin {{AFAB}} koşusu tamamlanmamış.', cozum:'Eksik dönemleri çalıştır; 12 dönemin hepsi tamamlanmalıdır.' },
      { mesaj:'Exchange rate for ... not found', sebep:'{{TCURR}}’da değerleme tarihine ait kur yok.', cozum:'{{OB08}} ile kuru gir. Kurlar genelde otomatik beslenir; beslenmede kopukluk olabilir.' },
      { mesaj:'Retained earnings account not defined for chart of accounts', sebep:'Bakiye devri için kâr/zarar hesabı tanımlanmamış.', cozum:'IMG → Bakiye devri → kâr/zarar hesabını gelir-gider hesap tipine ata.' },
      { mesaj:'Balance carryforward already performed', sebep:'{{FAGLGVTR}} zaten çalıştırılmış.', cozum:'Uyarıdır — işlem **tekrar çalıştırılabilir**; yeni kayıtlar için fark aktarılır.' },
      { mesaj:'Aktif ve pasif toplamı eşit değil ({{F.01}})', sebep:'{{mali-tablo-yapisi}}nda atanmamış hesap var.', cozum:'{{OB58}} → "atanmamış hesaplar" kalemini incele. Veri hatası değildir.' },
      { mesaj:'Document ... cannot be reversed — period closed', sebep:'{{F.81}} çalıştırılırken ters kayıt dönemi kapalı.', cozum:'{{OB52}} ile dönemi aç; kapanış sırasında 2. aralık kullanılır.' },
      { mesaj:'GR/IR account has balance after clearing', sebep:'Eşleşmeyen kalemler var.', cozum:'Normaldir — zamanlama farkı {{F.19}} ile sınıflanır, kalıcı fark {{MR11}} ile yazılır.' },
    ],

    ipuclari:[
      '**Kapanış bir kontrol listesi disiplinidir.** Sırayı yaz, sorumluyu belirle, durumu izle. ' +
      'Teknik zorluk değil, koordinasyon zorluğudur.',
      'Kapanış sırasında {{OB52}}’de **1. aralığı kapat, 2. aralığı açık bırak**: ' +
      'kullanıcılar kayıt yapamaz, kapanış ekibi düzeltme yapabilir.',
      'Tüm toplu işleri ({{AFAB}}, {{F.05}}, {{F.13}}, {{F.19}}) **önce test modunda** çalıştır ve ' +
      'sonucu bir öncekiyle karşılaştır. Beklenmedik sapma varsa sebebi ara.',
      '{{F.81}}’i **ayın ilk iş günü** kontrol listesine koy. Unutulursa geçen ayın tahakkukları ' +
      'duruyor demektir ve bu ayın gideri şişer.',
      'Geçici ve kalıcı kayıtları ayrı belge türleriyle gir; ay sonunda hangisinin ters kaydedileceğini ' +
      'bir bakışta görürsün.',
      'Kapanış süresini kısaltmanın en etkili yolu **sıralı bağımlılıkları paralelleştirmektir**: ' +
      'banka mutabakatı ile AA amortismanı aynı anda yapılabilir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'T001B', ne:'{{OB52}} ile dönem açma/kapama satırları' },
      { tablo:'BKPF', ne:'Kapanış belgelerinin başlıkları; tahakkukta `STODT`/`STGRD` dolu' },
      { tablo:'BSEG', ne:'Düzeltme kalemleri' },
      { tablo:'ACDOCA', ne:'Tüm kapanış kayıtları, defter bazında' },
      { tablo:'ANLC', ne:'{{AFAB}} amortisman değerleri' },
      { tablo:'BSIS', ne:'Kapatılan geçiş hesabı kalemleri' },
      { tablo:'FAGLFLEXT', ne:'ECC’de bakiye devri toplamları — S/4HANA’da güncellenmez' },
    ],

    commit:
      'Kapanış programlarının çoğu **toplu işlemdir** ve her belge ayrı LUW’da yazılır. ' +
      'Sonucu: bir koşu yarıda kesilse bile üretilen belgeler kalıcıdır.\n\n' +
      'Bu yüzden {{AFAB}}, {{F.05}} ve {{F.13}} gibi programlar **"tekrar" veya "yeniden başlatma" ' +
      'modlarına sahiptir**: kaldığı yerden devam eder veya yalnızca farkı işler. ' +
      'Yarım kalmış bir koşu tehlikeli değildir ama fark edilmezse eksik kapanışa yol açar — ' +
      'bu yüzden koşu sonuç listeleri okunmalıdır.',

    belgeNo:
      'Kapanış belgeleri kendi türlerinin aralığından numara alır: **SA** genel düzeltme, ' +
      '**AF** amortisman, **AB** genel. {{ozel-donem}} kayıtlarında da aynı aralık kullanılır — ' +
      'özel dönemin ayrı numara aralığı **yoktur**; ayrım `MONAT` alanındadır (13–16).',

    postingLogic:
      'Kapanışın teknik omurgası **dönem kontrolüdür**. Her kayıtta:\n\n' +
      '**1.** `BUDAT`’tan dönem hesaplanır ({{T009}} mali yıl varyantına göre).\n' +
      '**2.** {{T001B}}’de o dönem, o **hesap tipi** için açık mı bakılır.\n' +
      '**3.** Özel hesap tipi satırı varsa o geçerlidir; yoksa **+** satırı kullanılır.\n' +
      '**4.** 1. aralıkta değilse 2. aralık kontrol edilir; kullanıcı yetki grubunda mı bakılır.\n' +
      '**5.** Geçerse kayıt devam eder.\n\n' +
      'Tahakkuk belgelerinde ek olarak `STODT` (ters kayıt tarihi) ve `STGRD` (neden) yazılır; ' +
      '{{F.81}} bu alanlara bakarak ters kaydedilecek belgeleri bulur.',

    belgeTuru:
      'Kapanışta ayrı belge türleri kullanmak iyi bir uygulamadır: ' +
      '**ZA** tahakkuk (geçici), **ZK** karşılık (kalıcı), **ZR** yeniden sınıflama gibi. ' +
      'Böylece ay sonunda hangi belgelerin ters kaydedileceği bir raporla görülür.',

    numberRange:
      'Kapanış belge türlerinin aralıkları da **her mali yıl için** açılmalıdır ({{FBN1}}, {{OBH1}}). ' +
      'Yıl sonu kapanışı sırasında yeni yılın aralıkları açık olmalıdır — ' +
      'çünkü bakiye devri yeni yıla kayıt üretir.',

    accountDetermination:
      'Kapanış programları hesapları farklı yerlerden alır:\n\n' +
      '• **Kur farkı hesapları** → {{OBA1}} (hesap anahtarları KDF gerçekleşmemiş, KDB gerçekleşmiş).\n' +
      '• **GR/IR sınıflama hesapları** → IMG’de yeniden sınıflama ayarları.\n' +
      '• **Kâr/zarar aktarım hesabı** → bakiye devri ayarlarında.\n' +
      '• **Amortisman hesapları** → {{AO90}}.\n' +
      '• **Tahakkuk hesapları** → kullanıcı girer.',

    tur:
      '**Özelleştirme:** {{OB52}} dönem kontrolü, {{OB29}} mali yıl varyantı, {{OB59}} değerleme yöntemleri, ' +
      '{{OBA1}} kur farkı hesapları, {{OB58}} mali tablo yapısı, bakiye devri ayarları, ' +
      'yeniden sınıflama tanımları.\n\n' +
      '**Hareket verisi:** kapanış belgeleri.\n\n' +
      'Kapanışta ana veri yoktur — tamamen yapılandırma + hareket verisi konusudur.',

    transport:
      'Dönem varyantı, mali yıl varyantı, değerleme yöntemleri, kur farkı hesap belirlemesi, ' +
      'FSV ve yeniden sınıflama ayarları taşınır.\n\n' +
      '**Ama {{OB52}}’deki dönem aralıkları taşınmaz** — her sistemde ayrı yönetilir. ' +
      'Bu mantıklıdır: test sistemi ile canlının açık dönemleri farklıdır. ' +
      'Yeni bir sisteme geçişte dönem açma **manuel bir adımdır** ve unutulursa hiçbir kayıt yapılamaz.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Kayıt Dönemleri → Kayıt Dönemlerini Aç ve Kapat', not:'{{OB52}} — kapanışın kilit taşı' },
      { yol:'SPRO → … → Mali Yıl → Mali Yıl Varyantını Düzenle', not:'{{OB29}} — normal + özel dönem sayısı' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → İş İşlemleri → Kapanış → Değerleme → Yabancı Para Değerlemesi → Değerleme Yöntemlerini Tanımla', not:'{{OB59}}' },
      { yol:'SPRO → … → Kapanış → Değerleme → Kur Farkları İçin Hesapları Hazırla', not:'{{OBA1}} — KDF/KDB hesap anahtarları' },
      { yol:'SPRO → … → Kapanış → Yeniden Sınıflama → Alacak/Borç Yeniden Sınıflaması', not:'{{FAGLF101}} ayarları' },
      { yol:'SPRO → … → Kapanış → Devir → Bakiye Devri', not:'{{FAGLGVTR}} — kâr/zarar hesabı ataması' },
      { yol:'SPRO → … → Raporlama → Mali Tablolar → Mali Tablo Yapısını Tanımla', not:'{{OB58}} — FSV' },
    ],

    ekstra:[
      { ic:'📅', baslik:'Özel dönemler neden var?', metin:
        '31 Aralık’ta mali tablolar üretildi ve yönetime sunuldu. Şubatta denetçi 500.000 TL’lik ' +
        'bir düzeltme istedi. Bu düzeltme Aralık’a mı kaydedilmeli?\n\n' +
        'Kaydedilirse **Aralık ayının kendi rakamı bozulur** ve aylık trend analizleri anlamsızlaşır. ' +
        'Kaydedilmezse yılın toplamı yanlış kalır.\n\n' +
        'Çözüm: {{ozel-donem}}ler (13–16). Düzeltme dönem 13’e kaydedilir — ' +
        '**yılın toplamına girer ama Aralık ayının rakamını bozmaz**. ' +
        '{{OB29}}’da mali yıl varyantı 12 normal + 4 özel dönem olarak tanımlanır.\n\n' +
        'Pratik kullanım: 13 denetim düzeltmeleri, 14 vergi düzeltmeleri, 15–16 konsolidasyon.' },

      { ic:'🔁', baslik:'Bakiye devri neden tekrar çalıştırılabilir?', metin:
        '{{FAGLGVTR}} yıl sonunda çalıştırılır ve bakiyeleri yeni yıla aktarır. ' +
        'Ama kapanış bittikten sonra geçmiş yıla düzeltme kaydı girilebilir (özel dönem, denetim düzeltmesi).\n\n' +
        'Bu durumda devir eskimiş olur. SAP bunu şöyle çözer: **{{FAGLGVTR}} tekrar çalıştırılabilir** ve ' +
        'yalnızca **farkı** aktarır. Mükerrer devir oluşmaz.\n\n' +
        'Pratik sonuç: bakiye devrini erken çalıştırmaktan çekinme. Yeni yılda kayıt yapılabilmesi için ' +
        'zaten gereklidir ve sonradan düzeltmeler otomatik yansır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'OB52’de "+" satırının önceliği', metin:
        '{{T001B}}’de hesap tipi **+** satırı bir *varsayılandır*. Ama S, D, K, A veya M için ' +
        '**özel bir satır varsa**, o hesap tipinde **+** satırı değil özel satır geçerlidir.\n\n' +
        '"Dönemi + satırında açtım ama satıcı kaydı hâlâ hata veriyor" şikâyetinin sebebi budur: ' +
        'K için ayrı bir satır vardır ve o kapalıdır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Kapanışın **adımları ve mantığı değişmedi**; değişen, bazı adımların **gereksizleşmesi** ve ' +
      'kapanış süresinin kısalmasıdır. En büyük kazanç: FI–CO mutabakatı ve toplam tablosu ' +
      'yeniden oluşturma adımlarının ortadan kalkması.',

    eccFarklari:[
      { konu:'FI–CO mutabakatı', ecc:'Ayrı bir kapanış adımı — periyodik mutabakat programı', s4:'**Gereksiz** — aynı satırda oldukları için yapısal olarak mutabık' },
      { konu:'Toplam tablosu', ecc:'{{FAGLFLEXT}} güncellenir; bozulursa yeniden oluşturma programı', s4:'**Yok** — bakiyeler {{ACDOCA}}’dan anlık hesaplanır' },
      { konu:'Bakiye devri', ecc:'{{F.16}} (klasik) / {{FAGLGVTR}} (yeni G/L)', s4:'{{FAGLGVTR}} — defter bazında' },
      { konu:'Duran varlık kapanışı', ecc:'{{AJAB}} zorunlu, katı sıra', s4:'Basitleştirildi; bazı kontroller otomatikleşti' },
      { konu:'Kapanış yönetimi', ecc:'Schedule Manager (SCMA)', s4:'**Financial Closing Cockpit** (Fiori) — görev şablonları, otomatik çalıştırma' },
      { konu:'Kapanış süresi', ecc:'Tipik 5–10 iş günü', s4:'Anlık raporlama sayesinde belirgin kısalma' },
      { konu:'Amortisman', ecc:'{{AFAB}}', s4:'FAA_DEPRECIATION_POST; tüm alanlar anlık kaydediyor' },
    ],

    universalJournal:
      'Kapanış açısından {{evrensel-kayit-defteri}}’nin üç somut kazancı vardır:\n\n' +
      '**1. FI–CO mutabakatı ortadan kalkar.** ECC’de her kapanışta yapılan bu adım, ' +
      'FI ve CO satırı aynı kayıt olduğu için gereksizleşir.\n\n' +
      '**2. Toplam tablosu bakımı biter.** Bakiyeler anlık hesaplandığı için "toplam tablosu bozuldu, ' +
      'yeniden oluşturalım" senaryosu yok olur.\n\n' +
      '**3. Ara raporlar gerçek zamanlı.** Kapanış devam ederken bile güncel bilanço alınabilir; ' +
      'bu, "soft close" (yumuşak kapanış) yaklaşımını mümkün kılar.',

    kalkanTcodes:[
      { eski:'FI–CO mutabakat programları', yeni:'—', not:'Gereksizleşti' },
      { eski:'Toplam tablosu yeniden oluşturma', yeni:'—', not:'Toplam tablosu yok' },
      { eski:'{{F.16}}', yeni:'{{FAGLGVTR}}', not:'Yeni ana muhasebe programı' },
      { eski:'{{AFAB}}', yeni:'FAA_DEPRECIATION_POST', not:'AFAB yönlendirir' },
      { eski:'SCMA (Schedule Manager)', yeni:'Financial Closing Cockpit', not:'Fiori tabanlı, şablon destekli' },
    ],

    fiori:[
      { ad:'Financial Closing Cockpit', aciklama:'Kapanış görevlerini şablon olarak tanımlar, bağımlılıkları zorlar, ilerlemeyi izler. Kapanışın Excel’den çıkıp sisteme taşınması.' },
      { ad:'Trial Balance', aciklama:'Anlık mizan; kapanış devam ederken bile güncel.' },
      { ad:'Financial Statement', aciklama:'{{F.01}} yerine; FSV hiyerarşisi görsel, kalemden belgeye tek tıkla iniş.' },
      { ad:'Post Depreciation', aciklama:'{{AFAB}} yerine; koşu durumu ve log görsel.' },
      { ad:'Run Foreign Currency Valuation', aciklama:'{{F.05}} yerine.' },
      { ad:'Manage Journal Entries', aciklama:'Kapanış düzeltmelerini iş listesi olarak yönetir.' },
    ],

    compatibilityViews:[
      '{{FAGLFLEXT}}, {{GLT0}} — toplam tabloları {{uyumluluk-view}}; **artık yazılmaz**.',
      '{{BSIS}}, {{BSAS}} — G/L açık kalem indeksleri view.',
      '{{T001B}}, {{T009}} — yapılandırma tabloları **fiziksel olarak duruyor**, değişmedi.',
      'Toplam tablosuna yazan eski kapanış programları geçişte gözden geçirilmelidir.',
    ],

    performans:
      'Kapanış programlarının çoğu {{ACDOCA}} üzerinden çalıştığı için hızlandı. ' +
      'Asıl kazanç ise **iş süreci tarafındadır**: mutabakat adımları ortadan kalktığı ve ' +
      'raporlar anlık üretildiği için kapanış takvimi kısalır. ' +
      'Birçok şirket S/4HANA geçişiyle kapanış süresini birkaç gün kısaltır.',

    bestPractices:[
      'Kapanışı **Financial Closing Cockpit**’e taşı; Excel kontrol listesi hataya açıktır ve ' +
      'bağımlılıkları zorlamaz.',
      'Artık gereksizleşen adımları (FI–CO mutabakatı, toplam tablosu bakımı) kontrol listesinden **çıkar** — ' +
      'geçiş sonrası eski listeyi aynen kullanmak boşa zaman harcatır.',
      'Anlık raporlama sayesinde "soft close" yaklaşımını değerlendir: ay içinde de güncel tablo alınabilir.',
      'Geçiş öncesi geçiş hesaplarını ({{gr-ir}}, banka ara hesapları) temizle; kirli bakiyeler taşınır.',
      '{{paralel-defter}} kullanılıyorsa {{FAGLGVTR}}’nin **her defter için** çalıştırıldığını doğrula.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Ocak 2027 ay sonu kapanışı: 10 adım, 3 gün, 2 sürpriz',
    hikaye:
      '**Marmara Tekstil A.Ş.**’de Ocak kapanışı. Muhasebe müdürünün kontrol listesi 10 ana adımdan oluşuyor ve ' +
      'hedef 3 iş günü. Bu senaryo kapanışın sırasını, her adımın neden o sırada olduğunu ve ' +
      'yolda çıkan iki sürprizin nasıl çözüldüğünü gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · Dönem varyantı 1000' },
      { k:'Kapatılacak dönem', v:'01 / 2027 (Ocak)' },
      { k:'Mali yıl varyantı', v:'12 normal + 4 özel dönem' },
      { k:'Hedef', v:'3 iş günü — 1 Şubat’ta başla, 3 Şubat’ta bitir' },
      { k:'Ekip', v:'AP, AR, DV, banka, ana muhasebe uzmanları + müdür' },
    ],

    adimlar:[
      { baslik:'Adım 0 — Önceki ayın tahakkukları ters kaydedilir', tcode:'F.81',
        aciklama:'**Ayın ilk işi.** Aralık tahakkukları geri alınmazsa Ocak gideri şişer.',
        girdi:[
          { alan:'Ters kayıt tarih aralığı', deger:'01.01.2027 – 31.01.2027' },
          { alan:'Test sonucu', deger:'7 tahakkuk belgesi ters kaydedilecek · toplam 340.000 TL' },
          { alan:'Gerçek çalıştırma', deger:'7 belge ters kaydedildi ✓' },
        ],
        not:'Bu adım atlanırsa Aralık’ta tahmin edilen giderler Ocak’ta **tekrar** durur ve ' +
             'Ocak gideri 340.000 TL fazla görünür. Kontrol listesinin ilk maddesi olmalıdır.' },

      { baslik:'Adım 1 — Lojistik dönemi kapatılır', tcode:'OB52',
        aciklama:'MM dönemi FI’dan **önce** kapatılır. Yoksa stok hareketleri gelmeye devam eder ve ' +
                 'GR/IR analizi geçersiz olur.',
        girdi:[
          { alan:'MM dönemi (MMPV)', deger:'Şubat’a açıldı — Ocak MM kayıtları durdu' },
          { alan:'{{OB52}} hesap tipi **M**', deger:'Ocak kapatıldı' },
          { alan:'Diğer hesap tipleri', deger:'Henüz açık — FI kapanışı devam edecek' },
        ],
        not:'Sıra kritik: MM açıkken GR/IR analizi yapmak, sonradan gelen mal girişleriyle ' +
             'sonucu geçersiz kılar.' },

      { baslik:'Adım 2 — Tüm faturalar işlenir', tcode:'MRBR',
        aciklama:'AP ve AR ekipleri bekleyen tüm faturaları kaydeder; bloklu faturalar çözülür.',
        girdi:[
          { alan:'Bloklu MM faturaları', deger:'14 fatura → 11’i çözüldü, 3’ü uyuşmazlıkta kaldı' },
          { alan:'Bekleyen AP faturaları', deger:'Tümü kaydedildi' },
          { alan:'SD faturaları', deger:'{{VF04}} ile faturalanmayı bekleyen teslimat kalmadı ✓' },
          { alan:'{{VBRK}} kontrolü', deger:'`RFBSK` = "A" olan fatura yok — hepsi muhasebeleşti ✓' },
        ],
        not:'Eksik fatura = eksik gider/gelir. Bu adım tamamlanmadan sonraki adımlar anlamsızdır.' },

      { baslik:'Adım 3 — GR/IR analizi ve temizliği', tcode:'F.13',
        aciklama:'Üç aşamalı: otomatik kapatma → kalıcı fark yazımı → yeniden sınıflama.',
        girdi:[
          { alan:'{{F.13}} test → gerçek', deger:'1.180 kalem otomatik kapatıldı' },
          { alan:'{{MR11}}', deger:'Küçük kalıcı farklar yazıldı: 42 kalem, 18.400 TL' },
          { alan:'Kalan bakiye', deger:'**280.000 TL** — gerçek zamanlama farkı (mal geldi, fatura gelmedi)' },
        ],
        fis:{ baslik:'Belge 1000008801 — GR/IR yeniden sınıflama ({{F.19}})', belgeTuru:'SA', tarih:'31.01.2027',
          satirlar:[
            { hesap:'159', ad:'GR/IR hesabı', borc:280000, not:'Geçici boşaltma' },
            { hesap:'326', ad:'Alınan ama faturalanmamış mallar', alacak:280000, not:'Bilanço sunum hesabı' },
          ], not:'**Ters kaydedilecek** — 01.02.2027’de otomatik geri alınır. Yalnızca sunum amaçlıdır.' } },

      { baslik:'Adım 4 — Amortisman çalıştırılır', tcode:'AFAB',
        aciklama:'**Sürpriz 1 burada çıkıyor.** Test koşusu geçen aydan çok farklı bir toplam veriyor.',
        girdi:[
          { alan:'Test sonucu', deger:'1.891 varlık · **312.400 TL**' },
          { alan:'Geçen ay', deger:'284.500 TL — **27.900 TL fazla**' },
          { alan:'Araştırma', deger:'{{AW01N}} → Ocakta 6 yeni varlık aktifleştirilmiş (üretim hattı yatırımı)' },
          { alan:'Karar', deger:'Sapma **açıklandı ve doğru** → gerçek modda çalıştırıldı' },
        ],
        fis:{ baslik:'Belge 1000008812 — Ocak amortismanı', belgeTuru:'AF', tarih:'31.01.2027',
          satirlar:[
            { hesap:'730', ad:'Genel üretim gideri — amortisman', borc:248000 },
            { hesap:'770', ad:'Genel yönetim gideri — amortisman', borc:64400 },
            { hesap:'257', ad:'Birikmiş amortisman', alacak:312400 },
          ], not:'**Kalıcı kayıt** — ters kaydedilmez.' },
        not:'Test sonucunu geçen ayla karşılaştırmak, kapanışın en değerli tek alışkanlığıdır. ' +
             'Sapma her zaman kötü değildir ama **açıklanabilir olmalıdır**.' },

      { baslik:'Adım 5 — Banka mutabakatı', tcode:'FEBAN',
        aciklama:'Tüm ekstreler işlenir, ara hesaplar temizlenir, mutabakat tablosu çıkarılır.',
        girdi:[
          { alan:'Bekleyen ekstre satırı', deger:'0 ✓ — hepsi işlendi' },
          { alan:'Giden ara hesap (102091)', deger:'Açık kalem: 185.000 TL (28–31 Ocak ödemeleri)' },
          { alan:'Gelen ara hesap (102081)', deger:'Açık kalem: 22.000 TL' },
          { alan:'Tahsil edilmemiş çekler ({{FCHN}})', deger:'96.000 TL — 103 hesabıyla eşleşti ✓' },
          { alan:'Sonuç', deger:'4 banka hesabının tamamı mutabık ✓' },
        ] },

      { baslik:'Adım 6 — Yabancı para değerlemesi', tcode:'F.05',
        aciklama:'**Sürpriz 2 burada çıkıyor.** Program kur bulamıyor.',
        girdi:[
          { alan:'İlk deneme', deger:'Hata: "Exchange rate for USD/TRY on 31.01.2027 not found"' },
          { alan:'Teşhis', deger:'{{TCURR}} kontrolü → 31 Ocak kuru beslenmemiş (otomatik besleme kopmuş)' },
          { alan:'Çözüm', deger:'{{OB08}} ile 31.01.2027 kurları elle girildi: EUR 38,80 · USD 35,45' },
          { alan:'Değerleme yöntemi', deger:'Z001 — ortalama kur (M), ters kaydedilecek' },
          { alan:'Test → gerçek', deger:'218 kalem değerlendi' },
        ],
        fis:{ baslik:'Belge 1000008834 — Kur değerlemesi', belgeTuru:'SA', tarih:'31.01.2027',
          satirlar:[
            { hesap:'656', ad:'Kambiyo zararı', borc:142000, not:'Gerçekleşmemiş' },
            { hesap:'320', ad:'Satıcılar — değerleme farkı', alacak:98000 },
            { hesap:'120', ad:'Alıcılar — değerleme farkı', alacak:44000 },
          ], not:'**Ters kaydedilecek** — 01.02.2027’de geri alınır. Fark henüz gerçekleşmedi; ' +
                 'gerçek fark ödeme/tahsilat anında kesinleşir.' },
        not:'Kur besleme kopukluğu sessiz bir arızadır — kimse fark etmez, kapanışta patlar. ' +
             'Kontrol listesine "kurlar güncel mi?" maddesi eklendi.' },

      { baslik:'Adım 7 — Tahakkuk ve karşılık kayıtları', tcode:'FBS1',
        aciklama:'Doğmuş ama belgesi gelmemiş gelir/giderler ve karşılıklar.',
        girdi:[
          { alan:'Tahakkuklar ({{FBS1}} — geçici)', deger:'Elektrik 45.000 · su 8.000 · danışmanlık 60.000 · toplam **113.000 TL**' },
          { alan:'Ters kayıt tarihi', deger:'01.02.2027 — {{F.81}} ile geri alınacak' },
          { alan:'Karşılıklar ({{FB50}} — kalıcı)', deger:'Şüpheli alacak 120.000 TL' },
        ],
        fis:{ baslik:'Belge 1000008845 — Elektrik tahakkuku', belgeTuru:'SA', tarih:'31.01.2027',
          satirlar:[
            { hesap:'770', ad:'Genel yönetim gideri — elektrik', borc:45000 },
            { hesap:'381', ad:'Gider tahakkukları', alacak:45000 },
          ], not:'{{FBS1}} ile girildi → 01.02’de **otomatik** ters kaydedilecek. ' +
                 'Gerçek fatura Şubatta gelince çift kayıt olmaz.' },
        not:'Tahakkuk (geçici) ile karşılık (kalıcı) ayrımı burada net görülür: ' +
             'elektrik faturası **gelecek**, şüpheli alacağın tahsil edilip edilmeyeceği ise **belirsiz**.' },

      { baslik:'Adım 8 — Yeniden sınıflamalar', tcode:'FAGLF101',
        aciklama:'Tutar doğru ama bilançoda yanlış tarafta duran kalemler taşınır.',
        girdi:[
          { alan:'Borç bakiyeli müşteriler', deger:'3 müşteri fazla ödeme yapmış → **satıcı tarafına** taşındı, 68.000 TL' },
          { alan:'Alacak bakiyeli satıcılar', deger:'2 satıcı → müşteri tarafına, 15.000 TL' },
          { alan:'Uzun vadeli alacaklar', deger:'1 yıldan uzun vadeli: 240.000 TL → duran varlık tarafına' },
          { alan:'Ters kayıt', deger:'01.02.2027 — sunum amaçlı, geri alınacak' },
        ],
        not:'Fazla ödeme yapmış bir müşteri artık **sana borçlu değil, sen ona borçlusun**. ' +
             'Bilançoda alacak tarafında göstermek yanıltıcı olur.' },

      { baslik:'Adım 9 — Kontroller ve mutabakatlar', tcode:'FBL3N',
        aciklama:'Kapanış öncesi son doğrulama turu.',
        girdi:[
          { alan:'Muavin defter mutabakatı', deger:'{{FBL1N}} toplamı = 320 hesabı bakiyesi ✓ · {{FBL5N}} = 120 ✓' },
          { alan:'Geçiş hesapları', deger:'GR/IR sınıflandı ✓ · banka ara hesapları açıklandı ✓' },
          { alan:'Mizan', deger:'Borç toplamı = alacak toplamı ✓' },
          { alan:'Amortisman', deger:'Ocak dönemi tamamlandı ✓' },
          { alan:'{{SM13}}', deger:'Takılan güncelleme yok ✓' },
        ] },

      { baslik:'Adım 10 — Dönem kapatılır ve tablolar alınır', tcode:'OB52',
        aciklama:'Kapanışın son adımı. Önce 1. aralık kapatılır, düzeltme payı bırakılır, sonra tamamen kapatılır.',
        girdi:[
          { alan:'{{OB52}} — 1. aralık', deger:'Tüm hesap tipleri (S, D, K, A, M) → **Şubat’a** alındı' },
          { alan:'{{OB52}} — 2. aralık', deger:'Ocak açık bırakıldı, yetki grubu FI01 (kapanış ekibi düzeltme yapabilsin)' },
          { alan:'Mali tablolar', deger:'{{F.01}} → bilanço ve gelir tablosu üretildi' },
          { alan:'Kontrol', deger:'Aktif = pasif ✓ · atanmamış hesap yok ✓' },
          { alan:'3 gün sonra', deger:'2. aralık da kapatıldı — Ocak tamamen kilitlendi' },
        ],
        not:'İki aşamalı kapatma standart yöntemdir: kullanıcılar hemen durdurulur, ' +
             'kapanış ekibine birkaç gün düzeltme payı bırakılır.' },
    ],

    sonuc:
      '**Ocak kapanışı 3 iş gününde tamamlandı.** İki sürpriz çıktı ve ikisi de kontrol sayesinde yakalandı:\n\n' +
      '• **Amortisman sapması** — test sonucunun geçen ayla karşılaştırılması sayesinde fark edildi; ' +
      'sebep yeni yatırımlardı, sapma açıklanabilirdi.\n' +
      '• **Eksik kur** — otomatik besleme kopmuştu, kimse fark etmemişti. Kontrol listesine yeni madde eklendi.\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Sıra keyfî değildir.** MM önce kapanmalı (yoksa GR/IR analizi geçersiz), ' +
      'amortisman edinimlerden sonra çalışmalı, değerleme tüm kalemler kaydedildikten sonra yapılmalı. ' +
      'Sıra bozulursa iş tekrarlanır.\n\n' +
      '**2. Geçici–kalıcı ayrımı hayatidir.** Tahakkuk, değerleme ve yeniden sınıflama **ters kaydedilir**; ' +
      'amortisman ve karşılıklar **kalır**. Karıştırılırsa ya çift gider ya kayıp gider oluşur.\n\n' +
      '**3. Toplu işleri test modunda çalıştır ve geçen ayla karşılaştır.** ' +
      'Kapanışın en değerli tek alışkanlığı budur; iki sürprizden biri bu sayede yakalandı.\n\n' +
      '**4. Kapanış teknik değil koordinasyon işidir.** Zorluk {{AFAB}}’ı çalıştırmak değil, ' +
      '10 adımı doğru sırayla, doğru kişilere, doğru zamanda yaptırmaktır. ' +
      'Bu yüzden kontrol listesini sisteme taşımak (Financial Closing Cockpit) en yüksek getirili iyileştirmedir.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'Kapanış, ham veriyi raporlanabilir bilgiye dönüştüren düzeltme, değerleme ve mutabakat işlemleridir.',
      '**Sıra keyfî değildir:** MM kapanır → faturalar → GR/IR → amortisman → banka → değerleme → tahakkuk → sınıflama → kontrol → kapatma.',
      'Kapanış kayıtları **geçici** (ters kaydedilir) veya **kalıcı** (kaydedilmez) olarak ikiye ayrılır.',
      '**Geçici:** {{tahakkuk}}, gerçekleşmemiş {{degerleme}}, yeniden sınıflama. **Kalıcı:** amortisman, {{karsilik}}, kesinleşmiş farklar.',
      '{{FBS1}} + {{F.81}} ikilisi tahakkukları **otomatik** ters kaydeder — unutma riskini yapısal olarak ortadan kaldırır.',
      '{{OB52}}’de hesap tipleri **ayrı ayrı** yönetilir; **+** varsayılandır ama özel satır varsa o geçerlidir.',
      '{{ozel-donem}}ler (13–16) yıl sonu düzeltmelerini Aralık ayının rakamını bozmadan yapmayı sağlar.',
      'S/4HANA’da FI–CO mutabakatı ve toplam tablosu bakımı **gereksizleşti**; kapanış süresi kısaldı.',
    ],

    onemliNoktalar:[
      '**"Ay sonu kapanış adımlarını sırayla anlat."** MM dönemi → faturalar → GR/IR → amortisman → banka → kur değerlemesi → tahakkuk/karşılık → yeniden sınıflama → kontroller → dönem kapatma + tablolar. **Sıranın nedenini açıklayabilmek asıl ölçüttür.**',
      '**"Tahakkuk ile karşılık farkı?"** Tahakkukta tutar bellidir (fatura gelecek) ve ters kaydedilir; karşılıkta tahmin edilir (gerçekleşir mi belirsiz) ve kalıcıdır.',
      '**"Hangi kapanış kayıtları ters kaydedilir?"** Tahakkuklar, gerçekleşmemiş kur farkı, yeniden sınıflamalar. Ortak özellik: gerçek belge/işlem **sonradan gelecek**.',
      '**"Özel dönem ne işe yarar?"** Yıl sonu düzeltmelerini Aralık ayının kendi rakamını bozmadan yapmayı sağlar. Yılın toplamına girer, ay rakamına girmez.',
      '**"MM dönemi neden FI’dan önce kapatılır?"** Açık kalırsa stok hareketleri gelmeye devam eder ve GR/IR analizi ile maliyetler geçersiz olur.',
      '**"OB52’de + satırı ne demek?"** Varsayılan. Ama S/D/K/A/M için özel satır varsa o hesap tipinde **özel satır geçerlidir**.',
      '**"Bakiye devri tekrar çalıştırılabilir mi?"** Evet. Geçmiş yıla düzeltme girilirse {{FAGLGVTR}} yeniden çalıştırılır ve yalnızca fark aktarılır.',
      '**"S/4HANA kapanışı nasıl kısalttı?"** FI–CO mutabakatı ve toplam tablosu bakımı gereksizleşti; bakiyeler anlık hesaplandığı için ara raporlar gerçek zamanlı.',
    ],

    sikHatalar:[
      { hata:'Önceki ayın tahakkuklarını ters kaydetmeyi unutmak.', dogru:'{{F.81}} ayın **ilk iş günü** çalıştırılır. Unutulursa bu ayın gideri şişer.' },
      { hata:'Tahakkuku normal kayıtla ({{FB50}}) girmek.', dogru:'{{FBS1}} kullanılır; ters kayıt otomatikleşir ve unutma riski ortadan kalkar.' },
      { hata:'MM dönemini FI’dan sonra kapatmak.', dogru:'MM **önce** kapatılır; yoksa stok hareketleri GR/IR analizini geçersiz kılar.' },
      { hata:'{{OB52}}’de yalnızca S hesap tipini kapatmak.', dogru:'Tüm tipler (S, D, K, A, M) ayrı ayrı yönetilir.' },
      { hata:'Toplu işleri doğrudan gerçek modda çalıştırmak.', dogru:'Önce test modu; sonuç geçen ayla karşılaştırılır. Sapma açıklanabilir olmalıdır.' },
      { hata:'Amortismanı edinimler tamamlanmadan çalıştırmak.', dogru:'Yeni varlıklar amortismansız kalır; {{AFAB}} "tekrar" modunda yeniden çalıştırılmalıdır.' },
      { hata:'Kur değerlemesini tüm kalemler kaydedilmeden yapmak.', dogru:'Sonradan gelen dövizli kalemler değerlenmemiş kalır.' },
      { hata:'{{F.19}} sınıflamasının bakiyeyi azaltacağını sanmak.', dogru:'Sınıflama bakiyeyi **taşır**, azaltmaz. Yüksek bakiye eşleşmemiş kalemlerdendir; önce {{F.13}}/{{MR11}}.' },
      { hata:'Bilanço tutmayınca veri hatası aramak.', dogru:'Sebep neredeyse her zaman {{OB58}}’de **atanmamış hesaptır**. SAP dengesiz belge kabul etmez.' },
    ],

    ipuclari:[
      '**Kontrol listesini yaz ve sisteme taşı.** Kapanış teknik değil koordinasyon işidir; ' +
      'Financial Closing Cockpit bağımlılıkları zorlar ve adım atlanmasını önler.',
      'Kapanışta {{OB52}}’de **1. aralığı kapat, 2. aralığı açık bırak** — kullanıcılar durur, ekip çalışır.',
      'Her toplu işi test modunda çalıştır ve **geçen ayla karşılaştır**. Kapanışın en değerli alışkanlığıdır.',
      '{{F.81}}’i ayın ilk iş günü kontrol listesinin ilk maddesi yap.',
      'Geçici ve kalıcı kayıtlar için **ayrı belge türleri** kullan; ay sonunda hangisinin ters kaydedileceğini bir raporla görürsün.',
      'Kur beslemesini düzenli kontrol et — kopukluk sessizdir ve kapanışta patlar.',
      'Kapanış süresini kısaltmak için sıralı olmayan adımları paralelleştir: banka mutabakatı ile ' +
      'amortisman aynı anda yapılabilir.',
    ],

    quiz:[
      { soru:'Ay sonu kapanışında MM dönemi neden FI’dan **önce** kapatılır?',
        secenekler:[
          'MM daha hızlı kapanır',
          '**Açık kalırsa stok hareketleri gelmeye devam eder ve GR/IR analizi ile maliyetler geçersiz olur**',
          'Yetki kısıtı nedeniyle',
          'Zorunlu değildir, sıra önemsizdir',
        ], dogru:1,
        aciklama:'MM dönemi açıkken mal girişi ve tüketim kayıtları gelmeye devam eder. ' +
                 'Bu kayıtlar {{gr-ir}} bakiyesini ve stok maliyetlerini değiştirir. ' +
                 'FI kapanışı yapıldıktan sonra gelen bir mal girişi, tüm analizi geçersiz kılar.' },

      { soru:'Aşağıdaki kapanış kayıtlarından hangisi sonraki dönemde **ters kaydedilmez**?',
        secenekler:[
          'Elektrik gideri tahakkuku',
          'Gerçekleşmemiş kur farkı değerlemesi',
          '**Şüpheli alacak karşılığı**',
          'GR/IR yeniden sınıflaması',
        ], dogru:2,
        aciklama:'{{karsilik}} **kalıcı** bir kayıttır: gerçekleşip gerçekleşmeyeceği belirsizdir ve ' +
                 'bir belge beklenmez. Diğer üçü **geçicidir** — gerçek belge/işlem sonradan gelecektir, ' +
                 'bu yüzden ters kaydedilirler.' },

      { soru:'{{FBS1}} ile normal belge girişi ({{FB50}}) arasındaki fark nedir?',
        secenekler:[
          'FBS1 daha hızlıdır',
          '**FBS1’de ters kayıt tarihi ve nedeni girilir; belge {{F.81}} ile otomatik ters kaydedilir**',
          'FBS1 sadece gelir kayıtları içindir',
          'FBS1 muhasebeleşmez',
        ], dogru:1,
        aciklama:'{{FBS1}} normal bir kayıt yapar **ama** belgeyi "ters kaydedilecek" olarak işaretler ' +
                 '(`STODT` ters kayıt tarihi, `STGRD` neden). Sonraki dönemde {{F.81}} bu belgeleri ' +
                 'topluca ters kaydeder. Elle girip sonradan ters kaydetmeyi unutma riskini ortadan kaldırır.' },

      { soru:'{{ozel-donem}}ler (13–16) ne işe yarar?',
        secenekler:[
          'Aylık kapanışı hızlandırır',
          '**Yıl sonu düzeltmelerini Aralık ayının kendi rakamını bozmadan yapmayı sağlar**',
          'Ek yetki kontrolü sağlar',
          'Farklı para birimleri için kullanılır',
        ], dogru:1,
        aciklama:'Denetim düzeltmesi Aralık’a kaydedilirse Aralık ayının rakamı bozulur ve ' +
                 'aylık trend analizleri anlamsızlaşır. Özel döneme kaydedilirse **yılın toplamına girer ' +
                 'ama Aralık ayının rakamını etkilemez**. {{OB29}}’da 12 normal + 4 özel olarak tanımlanır.' },

      { soru:'{{OB52}}’de "+" hesap tipi satırı ne anlama gelir?',
        secenekler:[
          'Tüm hesap tiplerini zorla açar',
          '**Varsayılandır — ama S/D/K/A/M için özel satır varsa o geçerlidir**',
          'Yalnızca ana muhasebe için geçerlidir',
          'Özel dönemleri açar',
        ], dogru:1,
        aciklama:'**+** satırı, özel bir satırı olmayan hesap tipleri için geçerlidir. ' +
                 'K (satıcı) için ayrı bir satır varsa, satıcı kayıtlarında **+** değil o satır geçerlidir. ' +
                 '"Dönemi + satırında açtım ama hâlâ hata alıyorum" şikâyetinin sebebi budur.' },

      { soru:'{{F.19}} GR/IR yeniden sınıflaması hesabın bakiyesini ne yapar?',
        secenekler:[
          'Sıfırlar',
          'Azaltır',
          '**Değiştirmez — yalnızca bilançoda başka bir kaleme taşır**',
          'İki katına çıkarır',
        ], dogru:2,
        aciklama:'{{F.19}} bir **sunum** işlemidir: tutar ve hesap doğrudur ama GR/IR teknik bir geçiş ' +
                 'hesabıdır ve bilançoda "alınan ama faturalanmamış mallar" olarak gösterilmelidir. ' +
                 'Kayıt sonraki dönem ters kaydedilir. Bakiye yüksekse sorun sınıflamada değil, ' +
                 'eşleşmemiş kalemlerdedir.' },

      { soru:'Bakiye devri ({{FAGLGVTR}}) yıl kapandıktan sonra geçmiş yıla düzeltme girilirse ne yapılır?',
        secenekler:[
          'Devir geçersiz olur, elle düzeltilir',
          '**{{FAGLGVTR}} tekrar çalıştırılır; yalnızca fark aktarılır**',
          'Yeni yıl bakiyeleri elle güncellenir',
          'Düzeltme girilemez',
        ], dogru:1,
        aciklama:'{{bakiye-devri}} **tekrar çalıştırılabilir** bir işlemdir ve mükerrer devir oluşturmaz; ' +
                 'yalnızca farkı aktarır. Bu yüzden erken çalıştırmaktan çekinilmez — ' +
                 'zaten yeni yılda kayıt yapılabilmesi için gereklidir.' },

      { soru:'S/4HANA kapanış süresini neden kısalttı?',
        secenekler:[
          'Daha hızlı donanım kullanıyor',
          '**FI–CO mutabakatı ve toplam tablosu bakımı gereksizleşti; bakiyeler anlık hesaplanıyor**',
          'Kapanış adımları azaltıldı',
          'Otomatik kapanış yapıyor',
        ], dogru:1,
        aciklama:'{{evrensel-kayit-defteri}} sayesinde FI ve CO satırı **aynı kayıttır** — aralarında fark ' +
                 'oluşamaz, mutabakat gereksizleşir. Toplam tablosu olmadığı için "bozuldu, yeniden oluşturalım" ' +
                 'senaryosu yok olur. Bakiyeler anlık hesaplandığı için kapanış devam ederken bile ' +
                 'güncel rapor alınabilir.' },
    ],

    flashcards:[
      { on:'Ay sonu kapanış sırası nedir?', arka:'0. Önceki ay tahakkuklarını ters kaydet (F.81)\n1. **MM dönemi kapat**\n2. Faturaları tamamla\n3. GR/IR analizi\n4. Amortisman (AFAB)\n5. Banka mutabakatı\n6. Kur değerlemesi\n7. Tahakkuk/karşılık\n8. Yeniden sınıflama\n9. Kontroller\n10. Dönem kapat + tablolar' },
      { on:'Hangi kapanış kayıtları ters kaydedilir?', arka:'**Geçici (ters kaydedilir):**\n• Tahakkuklar\n• Gerçekleşmemiş kur farkı\n• Yeniden sınıflamalar\n\n**Kalıcı (kaydedilmez):**\n• Amortisman\n• Karşılıklar\n• Kesinleşmiş farklar (MR11)' },
      { on:'Tahakkuk ile karşılık farkı nedir?', arka:'**Tahakkuk:** tutar **belli** (fatura gelecek) → ters kaydedilir (FBS1 + F.81)\n\n**Karşılık:** tutar **tahmin** (gerçekleşir mi belirsiz) → kalıcıdır\n\nÖrnek: elektrik tahakkuku vs. şüpheli alacak karşılığı.' },
      { on:'FBS1 neden normal kayıttan farklıdır?', arka:'İki ek alan içerir:\n• **STODT** — ters kayıt tarihi\n• **STGRD** — ters kayıt nedeni\n\nSonraki dönemde **F.81** bu belgeleri topluca ters kaydeder.\n\nTers kaydetmeyi unutma riskini yapısal olarak ortadan kaldırır.' },
      { on:'MM dönemi neden FI’dan önce kapatılır?', arka:'Açık kalırsa **stok hareketleri gelmeye devam eder**.\n\nSonuç: GR/IR analizi ve stok maliyetleri geçersiz olur, kapanış tekrarlanır.\n\nSıra: MM kapat → FI kapanışını başlat.' },
      { on:'Özel dönemler (13–16) ne işe yarar?', arka:'Yıl sonu düzeltmelerini **Aralık ayının rakamını bozmadan** yapmayı sağlar.\n\nYılın toplamına girer, ay rakamına girmez.\n\nOB29’da mali yıl varyantı: 12 normal + 4 özel dönem.' },
      { on:'OB52’de iki dönem aralığı ne işe yarar?', arka:'**1. aralık** → normal kullanıcılar\n**2. aralık** → yetki grubu olanlar (kapanış ekibi)\n\nKapanışta 1. kapatılır, 2. açık bırakılır: kullanıcılar durur, ekip düzeltme yapabilir.' },
      { on:'OB52’de "+" satırının önceliği nedir?', arka:'**+** varsayılandır.\n\nAma S/D/K/A/M için **özel bir satır varsa**, o hesap tipinde özel satır geçerlidir.\n\n"+’da açtım ama satıcı kaydı hata veriyor" → K satırı ayrı ve kapalıdır.' },
      { on:'F.19 GR/IR sınıflaması bakiyeyi azaltır mı?', arka:'**Hayır — taşır.**\n\nGR/IR teknik bir geçiş hesabıdır; bilançoda "alınan ama faturalanmamış mallar" olarak sunulmalıdır.\n\nSonraki dönem ters kaydedilir. Bakiye yüksekse önce F.13 ve MR11 çalıştırılmalı.' },
      { on:'Bakiye devri tekrar çalıştırılabilir mi?', arka:'**Evet.**\n\nGeçmiş yıla düzeltme girilirse FAGLGVTR yeniden çalıştırılır ve **yalnızca fark** aktarılır. Mükerrer devir oluşmaz.\n\nBu yüzden erken çalıştırmaktan çekinilmez.' },
      { on:'Kapanışta en değerli tek alışkanlık nedir?', arka:'**Toplu işleri test modunda çalıştırıp sonucu geçen ayla karşılaştırmak.**\n\nAFAB, F.05, F.13, F.19 — hepsi test modunu destekler.\n\nSapma her zaman hata değildir ama **açıklanabilir olmalıdır**.' },
      { on:'S/4HANA kapanışı nasıl kısalttı?', arka:'1. **FI–CO mutabakatı gereksizleşti** (aynı satır)\n2. **Toplam tablosu bakımı yok** (anlık hesaplama)\n3. **Ara raporlar gerçek zamanlı** → "soft close" mümkün\n4. Financial Closing Cockpit ile görev yönetimi' },
    ],
  },

  },
});
