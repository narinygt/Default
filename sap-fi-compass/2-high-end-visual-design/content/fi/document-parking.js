/* ==========================================================================
   content/fi/document-parking.js — "Document Parking (Ön Kayıt)"
   ========================================================================== */

SAP.registerTopic({
  id: 'document-parking',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Ön kayıt (parking), bir belgeyi **muhasebeleştirmeden** sisteme kaydetmektir. ' +
      'Belge numarası alır, kalemleri saklanır, üzerinde çalışılabilir — ' +
      'ama **mizanı etkilemez**, bakiyelere yansımaz, raporlarda görünmez.\n\n' +
      'Park edilen belge {{VBKPF}} ve {{VBSEG}} tablolarında durur. ' +
      'Muhasebeleştirildiğinde ({{FBV0}}) veri {{BKPF}}/{{BSEG}}’ye taşınır ve ' +
      '**park anında verilen belge numarası korunur**.\n\n' +
      'İki temel kullanım amacı vardır:\n\n' +
      '**1. Dört-göz prensibi** — giren kişi ile onaylayan kişi farklı olsun.\n' +
      '**2. Eksik bilgi** — belge tam değil ama kaybolmasın, sonra tamamlansın.\n\n' +
      'Ön kaydın kardeşi **tutma (hold)** işlemidir ve karıştırılır: ' +
      'tutulan belge **kişiseldir**, başkası göremez ve **denetim izi bırakmaz**.',

    neden:
      '**İç kontrol.** Fatura girenin onaylayan olmaması, en temel muhasebe kontrolüdür.\n\n' +
      '**Eksik bilgiyle çalışabilme.** Maliyet yeri belli değil, onay bekleniyor — ' +
      'belge kaybolmasın diye park edilir.\n\n' +
      '**Yetki ayrımı.** Veri girişi düşük yetkili personele, muhasebeleştirme ' +
      'yetkiliye bırakılabilir.\n\n' +
      '**Toplu kontrol.** Gün içinde park edilen belgeler gün sonunda ' +
      'topluca gözden geçirilip muhasebeleştirilir.\n\n' +
      '**Hata maliyetini düşürme.** Yanlış park edilen belge **silinebilir**; ' +
      'yanlış muhasebeleştirilen belge ise ters kaydedilmek zorundadır ve ' +
      'iz bırakır.',

    sirketOnemi:
      'Ön kayıt, **iç kontrol sisteminin SAP’taki en pratik aracıdır**. ' +
      'Denetçiler "fatura girişi ve onayı ayrı kişilerde mi?" sorusunu sorar; ' +
      'cevabın sistemsel karşılığı budur.\n\n' +
      'Danışman açısından kritik nokta şudur: **park etmek tek başına dört-göz demek değildir.** ' +
      'Aynı kullanıcı hem park edip hem muhasebeleştirebiliyorsa, ' +
      'mekanizma yalnızca bir gecikmeye dönüşür. ' +
      'Ayrım **yetkilendirmeyle** sağlanır, park özelliğiyle değil.\n\n' +
      'Ayırt edici soru şudur: **"Park ile hold arasındaki fark nedir?"** ' +
      'Doğru cevap: park edilen belge **numara alır, başkaları görebilir, ' +
      'raporlanabilir ve denetim izi bırakır**; tutulan belge kişiseldir, ' +
      'numara almaz ve iz bırakmaz. Bu yüzden **hold iç kontrol aracı değildir**.',

    gercekHayat:
      'Bir şirkette satın alma faturaları muhasebe asistanı tarafından giriliyor. ' +
      'Asistan aynı zamanda muhasebeleştirme yetkisine de sahip.\n\n' +
      'Denetim raporu şu bulguyu yazıyor: *"Fatura girişi ve onayı aynı kişide toplanmış; ' +
      'görevler ayrılığı ilkesi ihlal edilmiştir."*\n\n' +
      'Çözüm olarak ön kayıt devreye alınıyor: asistan {{FV60}} ile faturayı **park ediyor**, ' +
      'muhasebe müdürü {{FBV0}} ile inceleyip **muhasebeleştiriyor**.\n\n' +
      'Ama ilk ay sonunda denetçi tekrar bakıyor ve aynı bulguyu yazıyor. Neden?\n\n' +
      'Çünkü asistanın yetkisi değişmemiş — hem park edebiliyor hem ' +
      'muhasebeleştirebiliyor. Yoğun günlerde kendi park ettiği belgeyi ' +
      'kendisi muhasebeleştiriyor.\n\n' +
      '**Ders:** park etme bir *imkân* sunar, kontrolü **yetkilendirme** kurar. ' +
      'Doğru kurulum: asistanda {{FV60}} yetkisi var, {{FBV0}} yetkisi **yok**.',

    muhasebeMantigi:
      'Ön kaydın muhasebe mantığı **tahakkuk zamanlamasıyla** ilgilidir: ' +
      'park edilen belge **henüz bir muhasebe olayı değildir**.\n\n' +
      'Bir fatura eline geçtiğinde kaydedilmesi gerekir — ama ' +
      '"kaydedilmesi gereken an" ile "kaydedilebilir hâle geldiği an" farklı olabilir: ' +
      'maliyet yeri belirsizdir, tutar tartışmalıdır, onay beklenmektedir.\n\n' +
      'Park bu boşluğu **belge kaybolmadan** doldurur: bilgi sistemdedir, ' +
      'aranabilir, raporlanabilir — ama mali tabloya girmemiştir.\n\n' +
      '**Kritik sonuç:** dönem sonunda park edilmiş belgeler **mizanda yoktur**. ' +
      'Eğer bunlar o döneme ait giderlerse, dönem **eksik** kapanır. ' +
      'Bu yüzden kapanış kontrol listesinde "park edilmiş belge kaldı mı?" ' +
      'maddesi bulunmalıdır ({{FBV3}} veya {{FBL3N}} park raporu).',

    kavramlar: ['park-etme', 'dort-goz', 'belge-turu', 'numara-araligi', 'belge-denkligi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Ön kayıt süreci üç aşamalıdır: **park → inceleme → muhasebeleştirme**. ' +
      'Aradaki sürede belge değiştirilebilir, tamamlanabilir veya silinebilir. ' +
      'İsteğe bağlı dördüncü bir aşama vardır: **onay iş akışı** ({{FBV4}}).',

    roller:[
      { rol:'Muhasebe asistanı', gorev:'Faturayı park eder ({{FV60}} / {{FV50}}). **Muhasebeleştirme yetkisi olmamalıdır.**' },
      { rol:'Bölüm sorumlusu', gorev:'Eksik bilgiyi tamamlar (maliyet yeri, açıklama) — {{FBV2}}.' },
      { rol:'Muhasebe müdürü', gorev:'İnceler ({{FBV3}}) ve muhasebeleştirir ({{FBV0}}).' },
      { rol:'Onaylayan (iş akışı varsa)', gorev:'Tutar limitine göre onay verir ({{FBV4}}).' },
      { rol:'Ana muhasebe', gorev:'Dönem sonunda park edilmiş belge kalmadığını doğrular.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Park edilen belgenin yolculuğu',
      adimlar:[
        { ic:'📥', rol:'Asistan', baslik:'Belge park edilir ({{FV60}})',
          aciklama:'Belge **numara alır**, {{VBKPF}}/{{VBSEG}}’ye yazılır. ' +
                   '**Mizanı etkilemez.** Denkliği bile aranmayabilir.',
          cikti:'Park edilmiş belge', ok:'eksik varsa' },
        { ic:'✏️', rol:'Sorumlu', baslik:'Eksikler tamamlanır ({{FBV2}})',
          aciklama:'Maliyet yeri, açıklama, tutar düzeltmesi. ' +
                   'Belge **serbestçe değiştirilebilir** — muhasebeleşmemiş çünkü.',
          cikti:'Tam belge', ok:'onay gerekiyorsa' },
        { ic:'✓', rol:'Onaylayan', baslik:'Onay verilir ({{FBV4}}) — *isteğe bağlı*',
          aciklama:'Tutar limitine göre onay akışı. Onaysız belge muhasebeleştirilemez.',
          cikti:'Onaylı belge', ok:'inceleme' },
        { ic:'🔍', rol:'Müdür', baslik:'İncelenir ({{FBV3}})',
          aciklama:'Salt okunur görüntüleme. **Dört-göz prensibinin uygulandığı an.**',
          cikti:'Kontrol edilmiş belge', ok:'onaylandıysa' },
        { ic:'📤', rol:'Müdür', baslik:'Muhasebeleştirilir ({{FBV0}})',
          aciklama:'{{VBKPF}}→{{BKPF}}, {{VBSEG}}→{{BSEG}}. ' +
                   '**Aynı belge numarası korunur.** Artık mizanda.',
          cikti:'Muhasebe belgesi', ok:'hatalıysa' },
        { ic:'🗑️', rol:'Müdür', baslik:'Veya silinir ({{FBV0}} → sil)',
          aciklama:'Yanlış park edilen belge **silinebilir** — ters kayıt gerekmez, ' +
                   'iz bırakmaz. Muhasebeleşmiş belgede bu mümkün değildir.',
          cikti:'Silinmiş belge' },
      ],
    },

    adimlar:[
      { rol:'Asistan', eylem:'Faturayı park eder', sistem:'{{FV60}} satıcı · {{FV50}} G/L' },
      { rol:'Sistem', eylem:'Belge numarası verir', sistem:'{{VBKPF}} — normal aralıktan' },
      { rol:'Sorumlu', eylem:'Eksikleri tamamlar', sistem:'{{FBV2}}' },
      { rol:'Onaylayan', eylem:'Onay verir (varsa)', sistem:'{{FBV4}}' },
      { rol:'Müdür', eylem:'Belgeyi inceler', sistem:'{{FBV3}} — salt okunur' },
      { rol:'Müdür', eylem:'Muhasebeleştirir', sistem:'{{FBV0}} → {{BKPF}}/{{BSEG}}' },
      { rol:'Müdür', eylem:'Veya siler', sistem:'{{FBV0}} → sil · **iz bırakmaz**' },
      { rol:'Ana muhasebe', eylem:'Dönem sonu kontrolü', sistem:'Park edilmiş belge kaldı mı?' },
    ],

    veriAkisi:{
      nereden:'Kullanıcının girdiği belge verisi; belge türü ve numara aralığı; ' +
              'varsa onay iş akışı tanımı.',
      nereye:'Park aşamasında {{VBKPF}}/{{VBSEG}}; muhasebeleştirmede {{BKPF}}/{{BSEG}}/{{ACDOCA}}.',
      tetikleyen:'Park işlemi ({{FV50}}/{{FV60}}) ve muhasebeleştirme ({{FBV0}}).',
      sonraki:'Normal belge yaşam döngüsü: kapatma, ters kayıt, raporlama.',
    },

    notlar:[
      { tip:'warn', baslik:'Park edilen belge dönem sonunda mizanda yoktur', metin:
        'Bu, ön kaydın en sık gözden kaçan yan etkisidir.\n\n' +
        'Aralık ayında park edilmiş 40 fatura, {{VBKPF}}’de duruyor ama ' +
        '**mizanda yok**. Eğer bunlar Aralık ayına ait giderlerse, ' +
        'Aralık **eksik kapanır** ve gider bir sonraki döneme kayar.\n\n' +
        'Daha sinsi bir varyantı: belge Aralık’ta park edilir, Ocak’ta muhasebeleştirilir. ' +
        'Kayıt tarihi **muhasebeleştirme anında** belirlenir — ' +
        'belgede yazan tarih Aralık olsa bile dönem kapalıysa kayıt Ocak’a düşer.\n\n' +
        '**Önlem:** kapanış kontrol listesine "park edilmiş belge var mı?" maddesini ekle. ' +
        '{{FBV3}} veya park edilmiş belge raporuyla kontrol edilir; ' +
        'döneme ait olanlar dönem kapanmadan muhasebeleştirilir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Ön kaydın muhasebe etkisi **iki aşamalıdır**: park anında hiçbir etki yok, ' +
      'muhasebeleştirme anında normal bir belge kaydı oluşur. ' +
      'Aradaki fark, belgenin **ne zaman mali tabloya girdiğidir**.',

    etkilenenHesaplar:[
      { hesap:'Park aşamasında — **hiçbiri**', tur:'Etki yok', neden:'{{VBKPF}}/{{VBSEG}} muhasebe tablosu değildir; mizan etkilenmez.' },
      { hesap:'320 Satıcılar', tur:'Bilanço — Kaynak', neden:'Muhasebeleştirme anında normal satıcı faturası gibi işler.' },
      { hesap:'770 / 153 vb. gider veya stok', tur:'Değişken', neden:'Faturanın karşı satırı — muhasebeleştirmede oluşur.' },
      { hesap:'191 İndirilecek KDV', tur:'Bilanço — Varlık', neden:'Vergi de muhasebeleştirme anında {{BSET}}’e yazılır.' },
    ],

    fisler:[
      { baslik:'Park anı ({{FV60}}) — **muhasebe kaydı yok**',
        belgeTuru:'KR (park)', tarih:'20.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'Belge 1900008801 park edildi — {{VBKPF}}/{{VBSEG}}’de duruyor', borc:0, alacak:0,
            not:'Mizan **etkilenmez**' },
        ],
        not:'Belge numarası **verildi** (1900008801) ama muhasebe kaydı **yok**.\n\n' +
             'Belge {{FB03}}’te aranırsa bulunmaz — {{FBV3}} ile görüntülenir. ' +
             'Bakiyelerde, mizanda, {{FBL1N}}’de **hiç görünmez**.\n\n' +
             '*(Tabloda 0/0 gösterimi, kaydın G/L etkisi olmadığını vurgulamak içindir.)*' },

      { baslik:'Muhasebeleştirme ({{FBV0}}) — **aynı numarayla** gerçek kayıt',
        belgeTuru:'KR', tarih:'22.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:85000, not:'Maliyet yeri parkta tamamlandı' },
          { hesap:'191', ad:'İndirilecek KDV', borc:17000 },
          { hesap:'320', ad:'Satıcılar — V-3012', alacak:102000 },
        ],
        not:'Belge numarası **1900008801** — park anında verilen numaranın **aynısı**.\n\n' +
             'Bu, ön kaydın önemli bir özelliğidir: numara park anında rezerve edilir ve ' +
             'muhasebeleştirmede korunur. Böylece park aşamasında verilen referans ' +
             '(örneğin satıcıya bildirilen numara) geçerliliğini sürdürür.\n\n' +
             '**Kayıt tarihi muhasebeleştirme anında belirlenir** — parktaki tarih değil.' },

      { baslik:'Dengesiz park — sistem izin verir',
        belgeTuru:'KR (park)', tarih:'20.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Gider — kısmen girilmiş', borc:85000 },
          { hesap:'320', ad:'Satıcılar', alacak:60000, not:'**Eksik** — 25.000 TL fark' },
        ],
        not:'**Park edilen belgenin dengeli olması zorunlu değildir.** ' +
             'Sistem uyarır ama kaydeder.\n\n' +
             'Sebep: park, "yarım bırakılmış işi kaybetmemek" içindir. ' +
             'Kullanıcı fatura girerken telefon çalar, kaldığı yeri park eder, ' +
             'sonra devam eder.\n\n' +
             '**Ama muhasebeleştirme anında denklik zorunludur** ({{belge-denkligi}}): ' +
             '{{FBV0}} dengesiz belgeyi **reddeder** ve hata verir. ' +
             'Bu, parkın esnek, muhasebenin katı olduğu tasarımın örneğidir.' },

      { baslik:'Yanlış park edilen belge — **silinir**, ters kayıt gerekmez',
        belgeTuru:'—', tarih:'21.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'Belge 1900008802 silindi — muhasebe izi yok', borc:0, alacak:0,
            not:'{{VBKPF}}’den kaldırıldı' },
        ],
        not:'Muhasebeleşmemiş belge **silinebilir** ve arkasında **hiçbir muhasebe izi bırakmaz**.\n\n' +
             'Muhasebeleşmiş bir belge ise silinemez — {{FB08}} ile **ters kaydedilir** ve ' +
             'mizanda iki kayıt (asıl + ters) kalıcı olarak görünür.\n\n' +
             'Bu fark, parkın önemli bir avantajıdır: **hata maliyeti düşüktür.** ' +
             'Şüpheli bir belgeyi muhasebeleştirmek yerine park etmek, ' +
             'sonradan temiz bir çıkış imkânı bırakır.\n\n' +
             '*(Belge numarası boşa gider — numara aralığında boşluk oluşur, bu normaldir.)*' },
    ],

    tHesaplar:[
      { hesap:'Satıcılar — park aşaması', kod:'320',
        borc:[],
        alacak:[],
        not:'**Hiçbir hareket yok** — park mizanı etkilemez' },
      { hesap:'Satıcılar — muhasebeleştirme sonrası', kod:'320',
        borc:[],
        alacak:[{ ad:'Belge 1900008801', tutar:102000 }],
        not:'Ancak {{FBV0}} sonrası hareket oluşur' },
      { hesap:'Genel yönetim gideri', kod:'770',
        borc:[{ ad:'Muhasebeleştirilen fatura', tutar:85000 }],
        alacak:[],
        not:'Gider de muhasebeleştirme anında doğar' },
    ],

    notlar:[
      { tip:'tip', baslik:'Park esnek, muhasebeleştirme katı', metin:
        'Ön kaydın tasarım felsefesi şudur: **park aşamasında kurallar gevşer, ' +
        'muhasebeleştirme aşamasında tam uygulanır.**\n\n' +
        'Park aşamasında:\n' +
        '• Belge **dengesiz** olabilir\n' +
        '• Zorunlu alanlar boş kalabilir\n' +
        '• Dönem kapalı olsa bile park edilebilir\n' +
        '• Serbestçe değiştirilebilir, silinebilir\n\n' +
        'Muhasebeleştirme aşamasında:\n' +
        '• Denklik **zorunludur**\n' +
        '• Zorunlu alanlar dolu olmalıdır\n' +
        '• Dönem **açık olmalıdır**\n' +
        '• Artık değiştirilemez, yalnızca ters kaydedilir\n\n' +
        'Bu ayrım kasıtlıdır ve doğrudur: park bir **çalışma alanıdır**, ' +
        'muhasebe defteri değil. Kullanıcıya yarım işi saklama imkânı verirken ' +
        'defterin bütünlüğünü korur.\n\n' +
        '**Pratik sonuç:** "park edildi, demek ki doğru" varsayımı yanlıştır. ' +
        'Park edilmiş belgenin muhasebeleştirilebilir olduğunun garantisi yoktur.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'SAP’ta belgeyi geçici saklamanın **üç yolu** vardır ve ' +
      'üçü sıkça karıştırılır: **park**, **tutma (hold)** ve **ön kayıt (Enjoy park)**. ' +
      'Ayrıca park edilen belgenin kendi durumları vardır.',

    liste:[
      { ad:'Park etme', en:'Parking',
        aciklama:'Belge numara alır, {{VBKPF}}’ye yazılır, **başkaları görebilir**, ' +
                 'raporlanabilir, denetim izi bırakır.',
        neZaman:'Dört-göz prensibi gerektiğinde; eksik bilgi tamamlanacaksa.',
        ornek:'{{FV60}} satıcı faturası · {{FV50}} G/L kaydı. **İç kontrol aracıdır.**',
        tcodes:['FV50','FV60','FBV0'] },

      { ad:'Tutma (hold)', en:'Hold',
        aciklama:'Belge **kişiseldir**: yalnızca tutan kullanıcı görebilir. ' +
                 'Numara **almaz**, denetim izi **bırakmaz**.',
        neZaman:'Kullanıcının kendi çalışmasını geçici saklaması.',
        ornek:'Kayıt ekranında "Tut" butonu. **İç kontrol aracı DEĞİLDİR** — ' +
              'dört-göz için kullanılamaz.' },

      { ad:'Ön kayıtlı belge (klasik)', en:'Parked Document',
        aciklama:'Klasik ekranlardan park edilen belge ({{FBV1}}).',
        neZaman:'Eski ekranları kullanan kurulumlarda.',
        ornek:'Enjoy ekranlarıyla ({{FV60}}) aynı sonucu üretir; ' +
              'ikisi de {{VBKPF}}’ye yazar.' },

      { ad:'Tamamlanmış park belgesi', en:'Complete',
        aciklama:'Tüm zorunlu alanları dolu, dengeli — muhasebeleştirilmeye hazır.',
        neZaman:'Belge tam girildiğinde.',
        ornek:'{{FBV0}} doğrudan muhasebeleştirebilir.' },

      { ad:'Eksik park belgesi', en:'Incomplete',
        aciklama:'Zorunlu alanlar eksik veya dengesiz.',
        neZaman:'Yarım bırakılmış girişlerde.',
        ornek:'{{FBV0}} **reddeder**; önce {{FBV2}} ile tamamlanmalıdır.' },

      { ad:'Onaya tabi park belgesi', en:'Subject to Release',
        aciklama:'Onay iş akışına bağlı; onaysız muhasebeleştirilemez.',
        neZaman:'Tutar limiti aşıldığında; yatırım harcamalarında.',
        ornek:'{{FBV4}} ile onaylanır. Onay seviyeleri tutar bazında tanımlanır.',
        tcodes:['FBV4'] },

      { ad:'Toplu park', en:'Mass Parking',
        aciklama:'Arayüzden gelen belgelerin toplu park edilmesi.',
        neZaman:'Dış sistemden veri aktarımında; kontrolden geçmeden muhasebeleşmesin diye.',
        ornek:'Aktarım programı belgeleri park eder, muhasebe topluca inceleyip muhasebeleştirir.' },

      { ad:'Ön kayıtlı belge silme', en:'Delete Parked Document',
        aciklama:'Belge tamamen silinir; **muhasebe izi kalmaz**.',
        neZaman:'Yanlış park edilen belgelerde.',
        ornek:'{{FBV0}} → sil. Numara boşa gider (aralıkta boşluk normaldir).' },
    ],

    karsilastirmaBasliklar:['Park (parking)', 'Tutma (hold)'],
    karsilastirma:[
      ['Belge numarası', '**Alır** — normal aralıktan', 'Almaz — geçici anahtar'],
      ['Kim görebilir', '**Herkes** (yetkiye göre)', 'Yalnızca **tutan kullanıcı**'],
      ['Tablo', '{{VBKPF}} / {{VBSEG}}', 'Geçici tablolar'],
      ['Raporlanabilir mi', '**Evet**', 'Hayır'],
      ['Denetim izi', '**Bırakır**', 'Bırakmaz'],
      ['Dört-göz için uygun mu', '**Evet**', '**Hayır**'],
      ['Onay akışı', 'Desteklenir ({{FBV4}})', 'Yok'],
      ['Tipik amaç', 'İç kontrol, eksik bilgi', 'Kişisel geçici saklama'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FV60', ad:'Satıcı faturasını park et',
        amac:'Satıcı faturasını muhasebeleştirmeden kaydeder.',
        neZaman:'Fatura girişi ile onayın ayrıldığı kurulumlarda; eksik bilgi varken.',
        adimlar:[
          { baslik:'Satıcı, tutar ve tarihi gir',
            aciklama:'{{FB60}} ile aynı ekran; fark **kaydetme davranışıdır**.' },
          { baslik:'Kalemleri gir',
            aciklama:'Eksik bırakılabilir — park için denklik **zorunlu değildir**.' },
          { baslik:'**Park et** (Kaydet değil)',
            aciklama:'Belge numarası verilir, {{VBKPF}}/{{VBSEG}}’ye yazılır. ' +
                     'Mizan **etkilenmez**.' },
        ],
        ekranAkisi:[
          { ekran:'Temel veri', islem:'Satıcı V-3012 · tutar 102.000 · vergi V1' },
          { ekran:'Kalemler', islem:'770 gider 85.000 · maliyet yeri **boş**' },
          { ekran:'Kaydetme', islem:'**Park et** → belge 1900008801' },
        ],
        alanlar:{
          zorunlu:['Satıcı','Şirket kodu','Tarih'],
          opsiyonel:['Kalemler (eksik olabilir)','Maliyet yeri','Metin'] },
        hatalar:[
          { mesaj:'Document type ... not allowed for parking', sebep:'Belge türü park için tanımlanmamış.', cozum:'{{OBA7}}’de belge türünün park edilebilir olduğunu kontrol et.' },
        ],
        ipucu:'{{FB60}} ile {{FV60}} **aynı ekrandır**; tek fark kaydetme davranışıdır. ' +
              'Aslında {{FB60}} ekranından da "Park et" seçilebilir. ' +
              'Ayrı işlem kodunun varlığı **yetkilendirme içindir**: ' +
              'asistana {{FV60}} verilir, {{FB60}} verilmez — ' +
              'böylece doğrudan muhasebeleştirmesi engellenir.',
        ilgili:['FV50','FBV0','FBV2','FB60'] },

      { kod:'FV50', ad:'G/L belgesini park et',
        amac:'Yalnızca ana muhasebe hesaplarını içeren belgeyi park eder.',
        neZaman:'Yeniden sınıflandırma, tahakkuk, düzeltme kayıtlarında.',
        adimlar:[
          { baslik:'Şirket kodu ve tarihi gir' },
          { baslik:'Hesap, borç/alacak satırlarını gir' },
          { baslik:'Park et' },
        ],
        ipucu:'Tahakkuk ve düzeltme kayıtları için özellikle uygundur: ' +
              'hesaplama kontrol edilene kadar park edilir, ' +
              'doğrulandıktan sonra muhasebeleştirilir.\n\n' +
              'Dönem sonu kapanışında hazırlanan düzeltmelerin ' +
              'önce park edilip topluca gözden geçirilmesi iyi bir pratiktir.',
        ilgili:['FV60','FBV0','FB50'] },

      { kod:'FBV0', ad:'Ön kayıtlı belgeyi muhasebeleştir veya sil — **kritik işlem**',
        amac:'Park edilmiş belgeyi muhasebeleştirir ({{BKPF}}/{{BSEG}}’ye taşır) veya siler.',
        neZaman:'İnceleme sonrası; dört-göz prensibinin uygulandığı adım.',
        adimlar:[
          { baslik:'Belge numarasını gir' },
          { baslik:'Belgeyi incele',
            aciklama:'Kalemler, tutarlar, hesaplar kontrol edilir.' },
          { baslik:'**Muhasebeleştir** veya **Sil**',
            aciklama:'Muhasebeleştirme: {{VBKPF}}→{{BKPF}}, aynı numara korunur. ' +
                     'Silme: belge tamamen kaldırılır, **iz kalmaz**.' },
          { baslik:'Kayıt tarihini kontrol et',
            aciklama:'**Muhasebeleştirme anında** belirlenir; dönem açık olmalıdır.' },
        ],
        alanlar:{
          zorunlu:['Belge numarası','Şirket kodu','Mali yıl'],
          opsiyonel:['Kayıt tarihi düzeltmesi'] },
        hatalar:[
          { mesaj:'Document is not complete / balance not zero', sebep:'Park edilen belge dengesiz veya zorunlu alanları eksik.', cozum:'{{FBV2}} ile tamamla. **Park esnek, muhasebeleştirme katıdır.**' },
          { mesaj:'Posting period ... is not open', sebep:'Belgenin tarihi kapalı döneme denk geliyor.', cozum:'{{OB52}} ile dönemi aç veya kayıt tarihini değiştir. **Belge Aralık’ta park edilip Ocak’ta muhasebeleştirilirse bu hata sık görülür.**' },
          { mesaj:'Document is subject to release', sebep:'Onay iş akışı tanımlı ve onay verilmemiş.', cozum:'{{FBV4}} ile onaylat.' },
          { mesaj:'You are not authorized to post this document', sebep:'Kullanıcının muhasebeleştirme yetkisi yok.', cozum:'**Doğru davranıştır** — dört-göz prensibi çalışıyor demektir.' },
        ],
        ipucu:'**Dört-göz prensibinin gerçekten çalıştığını doğrulamanın tek yolu:** ' +
              'park eden kullanıcının {{FBV0}} yetkisi olmadığını kontrol etmek.\n\n' +
              'Aynı kullanıcı hem {{FV60}} hem {{FBV0}} yetkisine sahipse ' +
              'mekanizma yalnızca bir gecikmedir, kontrol değil. ' +
              'Denetçinin bakacağı yer tam olarak burasıdır.',
        ilgili:['FV60','FBV2','FBV3','FBV4'] },

      { kod:'FBV2', ad:'Ön kayıtlı belgeyi değiştir',
        amac:'Park edilmiş belgenin kalemlerini, tutarlarını ve alanlarını değiştirir.',
        neZaman:'Eksik bilgi tamamlanırken; hata düzeltilirken.',
        adimlar:[
          { baslik:'Belge numarasını gir' },
          { baslik:'Kalemleri değiştir / ekle / sil',
            aciklama:'**Serbestçe** — belge muhasebeleşmemiş.' },
          { baslik:'Yeniden park et' },
        ],
        ipucu:'Muhasebeleşmiş bir belgede yalnızca birkaç alan değiştirilebilir ' +
              '(metin, ödeme koşulu). Park edilmiş belgede ise **her şey** değiştirilebilir: ' +
              'hesap, tutar, satır sayısı.\n\n' +
              'Bu esneklik, parkın "çalışma alanı" olma özelliğinden gelir.',
        ilgili:['FBV0','FBV3','FV60'] },

      { kod:'FBV3', ad:'Ön kayıtlı belgeyi görüntüle',
        amac:'Park edilmiş belgeyi salt okunur gösterir.',
        neZaman:'Onay öncesi inceleme; dönem sonu kontrolü.',
        adimlar:[
          { baslik:'Belge numarasını gir' },
          { baslik:'Kalemleri ve durumu incele' },
        ],
        ipucu:'**{{FB03}} park edilmiş belgeyi bulamaz** — o yalnızca {{BKPF}}’ye bakar. ' +
              'Park edilmiş belge {{FBV3}} ile görüntülenir.\n\n' +
              '"Belge numarası var ama {{FB03}}’te bulunamıyor" şikâyetinin ' +
              'en yaygın sebebi budur: belge park edilmiş, muhasebeleştirilmemiştir.',
        ilgili:['FBV0','FBV2','FB03'] },

      { kod:'FBV4', ad:'Ön kayıtlı belgeyi onayla (release)',
        amac:'Onay iş akışına tabi belgeleri onaylar.',
        neZaman:'Tutar limiti aşan belgelerde; yatırım harcamalarında.',
        adimlar:[
          { baslik:'Onay bekleyen belgeleri listele' },
          { baslik:'Belgeyi incele ve onayla' },
          { baslik:'Onay sonrası {{FBV0}} ile muhasebeleştirilebilir' },
        ],
        ipucu:'Onay iş akışı **isteğe bağlıdır** — park etmek için gerekli değildir. ' +
              'Ama tutar bazlı onay gerekiyorsa (100.000 TL üstü müdür onayı gibi) ' +
              'bu mekanizma dört-göz prensibini **kademeli** hâle getirir.\n\n' +
              'Yapılandırması karmaşıktır; basit dört-göz için ' +
              'yalnızca yetkilendirme ayrımı yeterlidir.',
        ilgili:['FBV0','FBV3'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Ön kaydın tablo mimarisi basittir ve **paraleldir**: ' +
      'park edilmiş belgeler {{VBKPF}}/{{VBSEG}}’de, muhasebeleşmiş belgeler ' +
      '{{BKPF}}/{{BSEG}}’de durur. Muhasebeleştirme, veriyi birinden diğerine **taşır**.',

    liste:[
      { ad:'VBKPF', baslik:'Ön kayıtlı belge başlığı',
        tutar:'Park edilmiş belgelerin başlık verisi: belge türü, tarih, tutar, ' +
              '**park eden kullanıcı**.',
        olusturan:'{{FV50}} / {{FV60}} / {{FBV1}}',
        guncelleyen:'{{FBV2}} değiştirir · {{FBV0}} taşır veya siler',
        anahtar:'AUSBK + BUKRS + BELNR + GJAHR',
        iliskiler:'Muhasebeleştirmede {{BKPF}}’ye taşınır — **aynı belge numarasıyla**.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'BELNR', aciklama:'Belge numarası — **park anında verilir**, muhasebeleşince korunur', tip:'pk' },
          { ad:'BSTAT', aciklama:'Belge durumu: **V** ön kayıt · **Z** istatistiksel' },
          { ad:'USNAM', aciklama:'**Park eden kullanıcı** — dört-göz kontrolünün dayanağı' },
          { ad:'BLART', aciklama:'Belge türü', tip:'fk' },
          { ad:'XPRFG', aciklama:'Onay durumu (release) işareti' },
        ] },

      { ad:'VBSEG', baslik:'Ön kayıtlı belge kalemleri',
        tutar:'Park edilmiş belgenin satırları. Hesap tipine göre **alt tablolara ayrılır**.',
        olusturan:'Park işlemi',
        guncelleyen:'{{FBV2}}',
        anahtar:'AUSBK + BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'Muhasebeleştirmede {{BSEG}}’ye taşınır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'BUZEI', aciklama:'Satır numarası', tip:'pk' },
          { ad:'HKONT', aciklama:'G/L hesabı' },
          { ad:'WRBTR', aciklama:'Tutar — **denklik zorunlu değil**' },
        ] },

      { ad:'BKPF', baslik:'Muhasebe belgesi başlığı',
        tutar:'Muhasebeleştirilmiş belgeler. Park edilmiş belge **burada yoktur**.',
        olusturan:'{{FBV0}} muhasebeleştirmesi veya doğrudan kayıt',
        anahtar:'BUKRS + BELNR + GJAHR',
        s4:'{{ACDOCA}} ile birlikte çalışır.',
        alanlar:[
          { ad:'BELNR', aciklama:'**Parktaki numaranın aynısı**' },
          { ad:'BUDAT', aciklama:'Kayıt tarihi — **muhasebeleştirme anında** belirlenir' },
          { ad:'USNAM', aciklama:'**Muhasebeleştiren** kullanıcı — parktakinden farklı olmalı' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri',
        tutar:'Muhasebeleşmiş kalemler.',
        olusturan:'Muhasebeleştirme',
        s4:'{{uyumluluk-view}}.' },

      { ad:'NRIV', baslik:'Numara aralığı durumu',
        tutar:'Park anında numara **rezerve edilir**; belge silinirse numara boşa gider.',
        olusturan:'{{FBN1}} tanımı',
        s4:'Değişmedi.' },

      { ad:'CDHDR', baslik:'Değişiklik belgesi başlığı',
        tutar:'Park edilmiş belgede yapılan değişiklikler burada izlenir.',
        olusturan:'{{FBV2}} değişiklikleri',
        s4:'Değişmedi.' },
    ],

    er:{
      type:'er',
      baslik:'Park edilmiş ↔ muhasebeleşmiş: paralel yapı',
      varliklar:[
        { ad:'VBKPF', rol:'Park', hub:true, aciklama:'**Ön kayıt başlığı** — mizanda yok',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'BSTAT' }, { ad:'USNAM' }] },
        { ad:'VBSEG', rol:'Park', aciklama:'Ön kayıt kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'BKPF', rol:'Muhasebe', aciklama:'**Muhasebe belgesi** — mizanda var',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'BUDAT' }, { ad:'USNAM' }] },
        { ad:'BSEG', rol:'Muhasebe', aciklama:'Belge kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'Evrensel kalemler',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }] },
        { ad:'NRIV', rol:'Numara', aciklama:'Aralık durumu',
          alanlar:[{ ad:'OBJECT', tip:'pk' }, { ad:'NRLEVEL' }] },
        { ad:'CDHDR', rol:'İzleme', aciklama:'Değişiklik izi',
          alanlar:[{ ad:'OBJECTID', tip:'fk' }, { ad:'USERNAME' }] },
      ],
      iliskiler:[
        { from:'VBKPF', to:'VBSEG', alanlar:'BELNR', not:'park başlık → kalem' },
        { from:'VBKPF', to:'BKPF', alanlar:'BELNR', not:'**muhasebeleştirme (FBV0)**' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'başlık → kalem' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR + BUZEI', not:'evrensel kalem' },
        { from:'NRIV', to:'VBKPF', alanlar:'NRLEVEL → BELNR', not:'numara park anında verilir' },
        { from:'VBKPF', to:'CDHDR', alanlar:'BELNR → OBJECTID', not:'değişiklik izi' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Ön kayıt ekranları normal kayıt ekranlarıyla **aynıdır**; ' +
      'fark yalnızca kaydetme davranışındadır. Asıl tasarım kararı ekranlarda değil, ' +
      '**yetkilendirmededir**.',

    ekranlar:[
      { ad:'{{FV60}} / {{FV50}} — park ekranı',
        aciklama:'{{FB60}} / {{FB50}} ile aynı; fark "Park et" butonundadır.',
        alanlar:[
          { ad:'Satıcı / hesap', zorunlu:true },
          { ad:'Tutar ve tarih', zorunlu:true },
          { ad:'Kalemler', zorunlu:false, aciklama:'**Eksik bırakılabilir** — park için denklik zorunlu değil.' },
          { ad:'"Park et" butonu', zorunlu:true, aciklama:'"Kaydet" yerine bu seçilir.' },
        ],
        ipucu:'{{FB60}} ekranından da "Park et" seçilebilir. ' +
              'Ayrı bir {{FV60}} işlem kodunun varlığı **teknik değil, yetkilendirme amaçlıdır**: ' +
              'asistana yalnızca {{FV60}} verilerek doğrudan muhasebeleştirmesi engellenir.\n\n' +
              'Bu ayrım yapılmazsa park özelliği bir iç kontrol aracı olmaktan çıkar.' },

      { ad:'{{FBV0}} — muhasebeleştirme / silme ekranı',
        aciklama:'Dört-göz prensibinin uygulandığı ekran.',
        alanlar:[
          { ad:'Belge numarası', zorunlu:true },
          { ad:'İnceleme', zorunlu:false, aciklama:'Kalemler, tutarlar, hesaplar.' },
          { ad:'Muhasebeleştir', zorunlu:false, aciklama:'{{VBKPF}}→{{BKPF}}; **denklik zorunlu**.' },
          { ad:'Sil', zorunlu:false, aciklama:'Belge tamamen kaldırılır; **muhasebe izi kalmaz**.' },
          { ad:'Kayıt tarihi', zorunlu:false, aciklama:'**Muhasebeleştirme anında** belirlenir; ' +
                   'dönem açık olmalıdır.' },
        ],
        ipucu:'Bu ekrandaki **kayıt tarihi davranışı** sık sorun yaratır: ' +
              'belge 28 Aralık’ta park edilir, 3 Ocak’ta muhasebeleştirilir. ' +
              'Aralık dönemi kapandıysa kayıt **Ocak’a düşer** ve ' +
              'gider yanlış döneme yazılır.\n\n' +
              'Önlem: dönem kapanmadan önce park edilmiş belgeleri temizle.' },

      { ad:'{{FBV3}} — görüntüleme ekranı',
        aciklama:'Park edilmiş belgeyi salt okunur gösterir.',
        alanlar:[
          { ad:'Belge numarası', zorunlu:true },
          { ad:'Durum', zorunlu:false, aciklama:'Tamamlanmış / eksik / onay bekliyor.' },
          { ad:'Park eden kullanıcı', zorunlu:false, aciklama:'{{VBKPF}} `USNAM` — denetim için önemli.' },
        ],
        ipucu:'**{{FB03}} park edilmiş belgeyi bulamaz.** ' +
              '"Belge numarası var ama görüntülenemiyor" şikâyetinin en yaygın sebebi budur. ' +
              'Teşhis: numarayı {{FBV3}} ile dene — bulunuyorsa belge park edilmiştir.' },
    ],

    zorunlu:['Belge türü','Şirket kodu','Tarih','Satıcı/hesap (park için)','Denklik (muhasebeleştirme için)'],
    opsiyonel:['Kalemler (parkta)','Maliyet yeri','Onay iş akışı'],

    hatalar:[
      { mesaj:'Document is not complete / balance not zero (FBV0)', sebep:'Park edilen belge dengesiz veya eksik.', cozum:'{{FBV2}} ile tamamla. Park esnek, muhasebeleştirme katıdır — bu **beklenen** davranıştır.' },
      { mesaj:'Posting period ... is not open (FBV0)', sebep:'Belge kapalı bir döneme muhasebeleştirilmeye çalışılıyor.', cozum:'{{OB52}} ile dönemi geçici aç veya kayıt tarihini güncelle. **Dönem kapanmadan park temizliği yapılmalıydı.**' },
      { mesaj:'Document not found (FB03)', sebep:'Belge park edilmiş, muhasebeleştirilmemiş.', cozum:'{{FBV3}} ile görüntüle. {{FB03}} yalnızca {{BKPF}}’ye bakar.' },
      { mesaj:'You are not authorized to post this document', sebep:'Kullanıcının {{FBV0}} yetkisi yok.', cozum:'**Doğru davranıştır** — dört-göz prensibi çalışıyor. Yetkili kişiye yönlendir.' },
      { mesaj:'Document is subject to release', sebep:'Onay iş akışı tanımlı, onay verilmemiş.', cozum:'{{FBV4}} ile onaylat.' },
      { mesaj:'Belge numarası aralığında boşluklar var', sebep:'Silinen park belgelerinin numaraları boşa gitmiş.', cozum:'**Normaldir**, düzeltme gerekmez. Numara park anında rezerve edilir; belge silinse de geri alınmaz.' },
    ],

    ipuclari:[
      '**Dört-göz için yetkilendirmeyi ayır:** asistanda {{FV60}} var, {{FBV0}} **yok**. ' +
      'Sadece park özelliğini açmak kontrol kurmaz.',
      'Dönem kapanmadan önce **park edilmiş belge kalmadığını** doğrula — ' +
      'kapanış kontrol listesine ekle.',
      '"Belge {{FB03}}’te bulunamıyor" şikâyetinde {{FBV3}} ile dene; ' +
      'park edilmiş olma ihtimali yüksektir.',
      'Şüpheli bir belgeyi muhasebeleştirmek yerine **park et** — ' +
      'hata maliyeti çok daha düşüktür (silinebilir, ters kayıt gerekmez).',
      'Dönem sonu düzeltme kayıtlarını önce park et, topluca gözden geçir, sonra muhasebeleştir.',
      'Dış sistemden gelen aktarımları park ederek al; kontrolden geçmeden ' +
      'mizana girmesinler.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'VBKPF', ne:'Park edilmiş belge başlığı — **mizanı etkilemez**' },
      { tablo:'VBSEG', ne:'Park edilmiş belge kalemleri' },
      { tablo:'BKPF', ne:'Muhasebeleştirmede oluşur — **aynı belge numarasıyla**' },
      { tablo:'BSEG', ne:'Muhasebeleştirmede oluşur' },
      { tablo:'ACDOCA', ne:'Muhasebeleştirmede oluşur' },
      { tablo:'NRIV', ne:'Numara **park anında** rezerve edilir' },
      { tablo:'CDHDR', ne:'Park edilmiş belgedeki değişiklikler izlenir' },
    ],

    commit:
      'Ön kaydın commit davranışı **iki ayrı olaydır**:\n\n' +
      '**Park:** {{VBKPF}} ve {{VBSEG}} yazılır, numara rezerve edilir. ' +
      'Muhasebe tabloları **hiç dokunulmaz**.\n\n' +
      '**Muhasebeleştirme:** {{VBKPF}}/{{VBSEG}}’den okunur, ' +
      '{{BKPF}}/{{BSEG}}/{{ACDOCA}} yazılır ve **aynı LUW’da** park kayıtları silinir.\n\n' +
      'İkinci aşamanın atomikliği kritiktir: belge hem parkta hem muhasebede ' +
      'görünürse çift kayıt riski doğardı. ' +
      'SAP bunu tek commit ile garanti eder — muhasebeleştirme başarısız olursa ' +
      'belge **parkta kalır**, yarım bir durum oluşmaz.',

    belgeNo:
      '**Belge numarası park anında verilir ve muhasebeleştirmede korunur.** ' +
      'Bu, ön kaydın önemli bir tasarım tercihidir.\n\n' +
      'Avantajı: park aşamasında verilen referans (satıcıya bildirilen numara, ' +
      'dosyaya yazılan numara) muhasebeleştirmeden sonra da geçerlidir.\n\n' +
      'Yan etkisi: **silinen park belgelerinin numaraları boşa gider** ve ' +
      'aralıkta boşluk oluşur. Bu normaldir ve düzeltilemez — ' +
      'denetçiye "bu numara neden yok?" sorusuna cevap ' +
      '"park edilip silinmiş" olur.\n\n' +
      'Bazı kurulumlar park için **ayrı numara aralığı** tanımlar; ' +
      'bu, muhasebe belgelerinin numara sürekliliğini korur ama ' +
      'park↔muhasebe numara devamlılığını bozar.',

    postingLogic:
      'Muhasebeleştirme ({{FBV0}}) sırasında yapılan kontroller:\n\n' +
      '**1.** Belge **dengeli mi**? Değilse reddedilir.\n' +
      '**2.** Zorunlu alanlar dolu mu? (belge türü ve alan durumuna göre)\n' +
      '**3.** Kayıt tarihinin dönemi **açık mı**? ({{OB52}})\n' +
      '**4.** Onay iş akışı varsa **onay verilmiş mi**?\n' +
      '**5.** Kullanıcının **muhasebeleştirme yetkisi** var mı?\n' +
      '**6.** Hesap belirleme, vergi hesaplama, {{belge-bolme}} çalışır.\n' +
      '**7.** {{BKPF}}/{{BSEG}}/{{ACDOCA}} yazılır, park kayıtları silinir.\n\n' +
      'Park aşamasında **hiçbiri** kontrol edilmez (1–4 dâhil). ' +
      'Bu, "park esnek, muhasebeleştirme katı" ilkesinin teknik karşılığıdır.',

    belgeTuru:
      'Belge türü park için de geçerlidir ve {{OBA7}}’de tanımlıdır. ' +
      'Park edilen belge, muhasebeleştirmede **aynı türü** kullanır.\n\n' +
      'Bazı kurulumlar park edilen belgeler için **ayrı belge türü** tanımlar; ' +
      'bu, raporlamada ayrışmayı kolaylaştırır ama **numara devamlılığını bozar** ' +
      've muhasebeleştirmede tür değişikliği gerektirir. ' +
      'Genelde tercih edilmez.',

    numberRange:
      'Park, belge türünün normal numara aralığını kullanır ve ' +
      'numarayı **park anında** çeker ({{NRIV}} güncellenir).\n\n' +
      'Sonuç: park edilip silinen belgelerin numaraları boşa gider. ' +
      'Yılbaşında aralık genişletilirken bu boşluklar hesaba katılmalıdır — ' +
      'yoğun park kullanan kurulumlarda aralık daha hızlı tükenir.',

    accountDetermination:
      'Hesap belirleme, vergi hesaplama ve {{belge-bolme}} **park anında çalışmaz**; ' +
      'yalnızca muhasebeleştirmede devreye girer.\n\n' +
      'Pratik sonucu önemlidir: park edilen bir belge, ' +
      'hesap belirleme hatası yüzünden **muhasebeleştirilemeyebilir** ' +
      've bu ancak {{FBV0}} denendiğinde ortaya çıkar. ' +
      'Park başarılı oldu diye belgenin muhasebeleştirilebilir olduğu ' +
      '**varsayılmamalıdır**.',

    tur:
      '**Özelleştirme:** belge türleri ({{OBA7}}), numara aralıkları ({{FBN1}}), ' +
      'onay iş akışı tanımları, alan durumu grupları.\n\n' +
      '**Yetkilendirme (asıl kontrol katmanı):** {{FV60}} ↔ {{FBV0}} ayrımı, ' +
      'tutar limitleri, şirket kodu bazlı kısıtlar.\n\n' +
      '**Hareket verisi:** {{VBKPF}}/{{VBSEG}} kayıtları.',

    transport:
      'Belge türleri, numara aralıkları ve onay iş akışı tanımları taşınır. ' +
      '**Ama asıl kontrol mekanizması olan yetkilendirme roller üzerinden yönetilir ve ' +
      'genelde ayrı bir süreçtir.**\n\n' +
      'Sonuç: test sisteminde dört-göz prensibi çalışıyor görünebilir ' +
      '(çünkü test kullanıcısı sınırlı yetkilidir), ' +
      'canlıda ise kullanıcılar geniş yetkili olduğu için ' +
      'mekanizma etkisiz kalır.\n\n' +
      '**Geçiş kontrolü:** canlıda park eden kullanıcıların {{FBV0}} yetkisi ' +
      'olmadığını rol bazında doğrula.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Belge Türleri', not:'{{OBA7}} — park edilebilirlik' },
      { yol:'SPRO → … → Belge → Ön Kayıt → Ön Kayıt İçin Onay Prosedürlerini Tanımla', not:'{{FBV4}} onay iş akışı' },
      { yol:'SPRO → … → Belge → Ön Kayıt → Tutar Limitlerini Tanımla', not:'Onay seviyesi için tutar sınırları' },
      { yol:'SPRO → … → Belge → Belge Numara Aralıkları', not:'{{FBN1}} — park numarayı buradan çeker' },
    ],

    ekstra:[
      { ic:'🔐', baslik:'Dört-göz prensibi park özelliğiyle değil, yetkiyle kurulur', metin:
        'Bu, ön kayıt konusundaki **en önemli pratik gerçektir** ve ' +
        'en sık yanlış anlaşılan noktadır.\n\n' +
        'Park özelliğini açmak, dört-göz prensibini **kurmaz**. ' +
        'Aynı kullanıcı hem {{FV60}} hem {{FBV0}} yetkisine sahipse:\n\n' +
        '• Kendi park ettiği belgeyi kendisi muhasebeleştirir\n' +
        '• Yoğun günlerde bunu her zaman yapar\n' +
        '• Denetçi {{VBKPF}} `USNAM` ile {{BKPF}} `USNAM` alanlarını karşılaştırır ve ' +
        'aynı olduklarını görür\n' +
        '• Bulgu yazılır\n\n' +
        '**Doğru kurulum yetkilendirmededir:**\n\n' +
        '**Rol A (asistan):** {{FV60}}, {{FV50}}, {{FBV2}}, {{FBV3}} — ' +
        'park eder, düzeltir, görüntüler.\n' +
        '**Rol B (müdür):** {{FBV0}}, {{FBV3}} — muhasebeleştirir ve siler.\n\n' +
        'İki rol **aynı kullanıcıda birleşmemelidir**.\n\n' +
        'Denetim için hazır cevap: "{{VBKPF}} `USNAM` ile {{BKPF}} `USNAM` ' +
        'hiçbir belgede aynı değildir" — bunu bir sorguyla göstermek, ' +
        'kontrolün çalıştığının en güçlü kanıtıdır.' },

      { ic:'📅', baslik:'Aralık’ta park, Ocak’ta muhasebe: kayıt hangi döneme düşer?', metin:
        'Belge 28 Aralık’ta park edildi, 3 Ocak’ta muhasebeleştirildi. ' +
        'Gider hangi döneme yazılır?\n\n' +
        'Cevap: **{{FBV0}} anında girilen kayıt tarihine göre.**\n\n' +
        'Belgede yazan tarih Aralık olsa bile, muhasebeleştirme sırasında ' +
        'kayıt tarihi kontrol edilir ve o tarihin dönemi **açık olmalıdır**.\n\n' +
        'Üç senaryo:\n\n' +
        '**a)** Aralık dönemi hâlâ açık → kayıt Aralık’a düşer ✓\n' +
        '**b)** Aralık kapalı, kullanıcı tarihi değiştirmiyor → ' +
        '*"Posting period is not open"* hatası, belge muhasebeleşmez\n' +
        '**c)** Aralık kapalı, kullanıcı tarihi Ocak yapıyor → ' +
        'kayıt Ocak’a düşer, **gider yanlış dönemde**\n\n' +
        '(c) senaryosu tehlikelidir çünkü **hata vermez**. ' +
        'Aralık ayı gideri eksik, Ocak ayı gideri fazla görünür.\n\n' +
        '**Önlem:** dönem kapatmadan önce park edilmiş belgeleri listele ve ' +
        'o döneme ait olanları muhasebeleştir. ' +
        'Bu, kapanış kontrol listesinin standart maddesi olmalıdır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Park başarılı olması muhasebeleştirilebilir olduğunu göstermez', metin:
        'Park aşamasında denklik, zorunlu alanlar, dönem, hesap belirleme ve ' +
        'vergi hesaplama **kontrol edilmez**.\n\n' +
        'Sonuç: sorunsuz park edilmiş bir belge {{FBV0}}’da ' +
        '"hesap belirleme hatası", "dönem kapalı", "belge dengesiz" gibi ' +
        'hatalarla reddedilebilir.\n\n' +
        'Bu, dış sistemden toplu park yapılan kurulumlarda özellikle önemlidir: ' +
        '1.000 belge sorunsuz park edilir, muhasebeleştirmede 40’ı hata verir. ' +
        'Aktarım "başarılı" raporlanmıştır ama iş yarım kalmıştır.\n\n' +
        '**Önlem:** toplu park sonrası muhasebeleştirme oranını izle; ' +
        'parkta kalan belgeler için bir yaşlandırma raporu tut.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Ön kayıt mekanizması S/4HANA’da **değişmedi**: {{VBKPF}}/{{VBSEG}} duruyor, ' +
      '{{FV60}}/{{FBV0}} çalışıyor. Değişen, Fiori tabanlı onay uygulamaları ve ' +
      'daha görsel bir iş listesi deneyimi.',

    eccFarklari:[
      { konu:'Park tabloları', ecc:'{{VBKPF}} / {{VBSEG}}', s4:'**Değişmedi**' },
      { konu:'Park işlemleri', ecc:'{{FV50}}, {{FV60}}, {{FBV0}}', s4:'Aynı + Fiori' },
      { konu:'Onay akışı', ecc:'{{FBV4}} + iş akışı', s4:'Fiori "Manage Journal Entries" onay adımı' },
      { konu:'Muhasebe verisi', ecc:'{{BKPF}}/{{BSEG}}', s4:'+ {{ACDOCA}}' },
      { konu:'İş listesi', ecc:'İşlem kodu bazlı liste', s4:'Fiori görsel iş listesi, mobil erişim' },
    ],

    universalJournal:
      'Park edilmiş belgeler {{ACDOCA}}’ya **yazılmaz** — henüz muhasebe kaydı değiller. ' +
      'Muhasebeleştirme anında {{BKPF}}/{{BSEG}} ile birlikte {{ACDOCA}} da oluşur.\n\n' +
      'Bu, ön kaydın {{ACDOCA}} mimarisinde **hiçbir değişiklik gerektirmemesinin** sebebidir: ' +
      'park zaten muhasebe katmanının dışındadır.\n\n' +
      'Yan sonuç: {{ACDOCA}} tabanlı hiçbir rapor park edilmiş belgeleri göstermez. ' +
      'Dönem sonu kontrolü için ayrıca {{VBKPF}} sorgulanmalıdır.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'{{FV50}}, {{FV60}}, {{FBV0}}, {{FBV2}}, {{FBV3}}, {{FBV4}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'Park edilmiş belgeleri listeler, inceler ve muhasebeleştirir; ' +
             '{{FBV0}}’ın görsel karşılığı.' },
      { ad:'Post General Journal Entries', aciklama:'{{FV50}} yerine; park seçeneği içerir.' },
      { ad:'Create Supplier Invoice', aciklama:'{{FV60}} yerine; park ve muhasebeleştirme birlikte.' },
      { ad:'My Inbox (onay)', aciklama:'Onay bekleyen belgeler; mobil cihazdan onaylanabilir.' },
      { ad:'Verify Journal Entries', aciklama:'Onay iş akışının Fiori arayüzü.' },
    ],

    compatibilityViews:[
      '{{VBKPF}}, {{VBSEG}} — **fiziksel tablo olarak duruyor** (uyumluluk görünümü değil).',
      '{{BSEG}} — {{ACDOCA}}’dan türetilen görünüm.',
      'Ön kayıt, S/4HANA geçişinde yapı olarak **hiç etkilenmeyen** alanlardan biridir.',
    ],

    performans:
      'Park işlemleri az veri ürettiği için performans sorunu yaratmaz. ' +
      'Asıl kazanç **Fiori onay akışıdır**: onaylayan kişi masaüstünde ' +
      'SAP GUI açmak yerine telefondan onaylayabilir.\n\n' +
      'Bu, dört-göz prensibinin pratikte **uygulanabilirliğini** artırır: ' +
      'müdürün onaylaması kolaylaştıkça, asistanın "müdür yok, ben yapayım" ' +
      'baskısı azalır.',

    bestPractices:[
      'Fiori onay akışını değerlendir — dört-göz prensibinin **pratikte uygulanmasını** kolaylaştırır.',
      'Geçişte park edilmiş belgeleri **temizle**; devreden park belgeleri ' +
      'yeni sistemde gözden kaçar.',
      'Yetkilendirme ayrımını geçişte yeniden gözden geçir; ' +
      'rol birleştirmeleri sırasında {{FV60}} ve {{FBV0}} aynı role düşebilir.',
      'Dönem sonu kontrol listesine "park edilmiş belge var mı?" maddesini ekle — ' +
      'S/4HANA’da da bu belgeler {{ACDOCA}} raporlarında **görünmez**.',
      'Dış sistemden gelen aktarımları park ederek almayı değerlendir; ' +
      'kontrolden geçmeden mizana girmezler.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Denetim bulgusu iki kez yazıldı: park açıldı ama kontrol kurulmadı',
    hikaye:
      '**Kuzey Lojistik A.Ş.**’nin 2027 iç denetim raporunda şu bulgu var: ' +
      '*"Satıcı fatura girişi ve muhasebeleştirmesi aynı kişide toplanmıştır; ' +
      'görevler ayrılığı ilkesi ihlal edilmiştir."*\n\n' +
      'Muhasebe müdürü çözüm olarak ön kaydı devreye alıyor: ' +
      'asistan artık {{FV60}} ile **park ediyor**, müdür {{FBV0}} ile muhasebeleştiriyor.\n\n' +
      'Altı ay sonra ara denetimde **aynı bulgu tekrar yazılıyor**.\n\n' +
      'Bu senaryo, ön kaydın en sık yapılan kurulum hatasını ve ' +
      'dönem sonunda ortaya çıkan ikinci bir sorunu gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · TRY' },
      { k:'Aylık satıcı faturası', v:'~420 belge' },
      { k:'Park eden', v:'Asistan (kullanıcı MUHASEBE01)' },
      { k:'Muhasebeleştiren', v:'Müdür (kullanıcı MUHASEBE_MD)' },
      { k:'**Denetim bulgusu**', v:'Görevler ayrılığı ihlali — **iki kez** yazıldı' },
    ],

    adimlar:[
      { baslik:'Denetçinin sorgusu tekrarlanır', tcode:'SE16N',
        aciklama:'Denetçinin hangi veriye baktığı anlaşılmaya çalışılıyor.',
        girdi:[
          { alan:'Sorgu', deger:'{{BKPF}} · belge türü KR · son 6 ay' },
          { alan:'Karşılaştırılan', deger:'{{VBKPF}} `USNAM` ↔ {{BKPF}} `USNAM`' },
          { alan:'Toplam belge', deger:'2.480' },
          { alan:'**İki alan aynı olanlar**', deger:'**317 belge (%13)**' },
        ],
        not:'**Sorunun kanıtı bu tek sorgudadır:** 317 belgede park eden ile ' +
             'muhasebeleştiren **aynı kullanıcı**.\n\n' +
             'Bu, denetçinin bulguyu yazarken kullandığı veridir ve ' +
             'tartışmaya yer bırakmaz.' },

      { baslik:'Kök sebep — yetkilendirme değişmemiş', tcode:'SU53',
        aciklama:'Asistanın yetkileri inceleniyor.',
        girdi:[
          { alan:'MUHASEBE01 — {{FV60}} yetkisi', deger:'**Var** ✓ (park edebiliyor)' },
          { alan:'MUHASEBE01 — {{FBV0}} yetkisi', deger:'**Var** (muhasebeleştirebiliyor da)' },
          { alan:'MUHASEBE01 — {{FB60}} yetkisi', deger:'**Var** (doğrudan da kaydedebiliyor)' },
          { alan:'Sonuç', deger:'Park bir **imkân**, kontrol değil' },
        ],
        not:'**Kök sebep bulundu.** Park süreci tanımlandı, eğitim verildi, ' +
             'asistan çoğu zaman kurallara uydu — ama **yetkisi kısıtlanmadı**.\n\n' +
             'Yoğun günlerde, müdür toplantıdayken veya ay sonu baskısında ' +
             'asistan kendi park ettiği belgeyi kendisi muhasebeleştirdi. ' +
             '%13 oranı tam olarak bunu gösteriyor.\n\n' +
             'Dahası: {{FB60}} yetkisi de duruyor, yani park etmeden ' +
             '**doğrudan** kaydetmek de mümkün.' },

      { baslik:'Roller ayrıştırılır', tcode:'PFCG',
        aciklama:'Yetkilendirme yeniden tasarlanıyor.',
        girdi:[
          { alan:'**Rol A — Fatura girişi**', deger:'{{FV60}}, {{FV50}}, {{FBV2}}, {{FBV3}}' },
          { alan:'Rol A’dan **çıkarılan**', deger:'{{FBV0}}, {{FB60}}, {{FB50}}' },
          { alan:'**Rol B — Muhasebeleştirme**', deger:'{{FBV0}}, {{FBV3}}, {{FB03}}' },
          { alan:'Kural', deger:'İki rol **aynı kullanıcıda birleştirilemez**' },
        ],
        not:'Kritik detay: {{FB60}} yetkisi de kaldırıldı. ' +
             'Yalnızca {{FBV0}}’ı kaldırmak yetmezdi — ' +
             'asistan {{FB60}} ile park etmeden doğrudan kaydetmeye devam ederdi.\n\n' +
             '**Yedek plan:** müdür izinliyken belge birikmesin diye ' +
             'ikinci bir kişiye Rol B verildi (muhasebe şefi). ' +
             'Kontrolü delmeden esneklik sağlandı.' },

      { baslik:'İkinci sorun — dönem sonunda park kalıntısı', tcode:'FBV3',
        aciklama:'Aralık kapanışında beklenmedik bir durum çıkıyor.',
        girdi:[
          { alan:'31.12.2027 itibarıyla parkta', deger:'**63 belge** · toplam 1.840.000 TL' },
          { alan:'Bunlardan Aralık’a ait', deger:'**58 belge** · 1.720.000 TL' },
          { alan:'Mizandaki durumu', deger:'**Hiçbiri yok** — park mizanı etkilemez' },
          { alan:'Etki', deger:'Aralık gideri **1.720.000 TL eksik**' },
        ],
        not:'**İkinci ders burada:** park edilmiş belgeler mizanda **görünmez**.\n\n' +
             '58 fatura Aralık ayına ait, muhasebeye ulaşmış, sisteme girilmiş — ' +
             'ama muhasebeleştirilmedikleri için Aralık gideri eksik.\n\n' +
             'Kimse fark etmedi çünkü hiçbir standart rapor bu belgeleri göstermiyor: ' +
             'mizanda yok, {{FBL1N}}’de yok, {{ACDOCA}}’da yok.' },

      { baslik:'Park kalıntısı temizlenir', tcode:'FBV0',
        aciklama:'Aralık dönemi kapanmadan 58 belge muhasebeleştiriliyor.',
        girdi:[
          { alan:'Muhasebeleştirilen', deger:'58 belge' },
          { alan:'Kayıt tarihi', deger:'31.12.2027 — **dönem hâlâ açık**' },
          { alan:'Reddedilen', deger:'**4 belge** — dengesiz veya eksik' },
          { alan:'Silinen', deger:'**5 belge** — mükerrer giriş' },
        ],
        fis:{ baslik:'Belge 1900012204 — parktan muhasebeye', belgeTuru:'KR', tarih:'31.12.2027',
          satirlar:[
            { hesap:'770', ad:'Genel yönetim gideri', borc:142000, not:'Aralık gideri, doğru dönemde' },
            { hesap:'191', ad:'İndirilecek KDV', borc:28400 },
            { hesap:'320', ad:'Satıcılar', alacak:170400 },
          ], not:'Belge numarası **park anında verilen numaranın aynısı**.\n\n' +
                 'Kayıt tarihi 31.12 — Aralık dönemi açık olduğu için ' +
                 'gider **doğru döneme** düştü. Bir hafta sonra yapılsaydı ' +
                 'Aralık kapanmış olacak ve gider Ocak’a kayacaktı.' },
        tabloEtkisi:[
          { tablo:'VBKPF', ne:'58 kayıt silindi (muhasebeleştirildi) + 5 kayıt silindi (mükerrer)' },
          { tablo:'BKPF', ne:'58 muhasebe belgesi — **aynı numaralarla**' },
          { tablo:'ACDOCA', ne:'Aralık gideri 1.720.000 TL arttı' },
        ],
        not:'**4 belge reddedildi** — park sırasında dengesiz veya eksik bırakılmışlardı. ' +
             'Bu, "park başarılı = muhasebeleştirilebilir" varsayımının yanlış olduğunun ' +
             'somut kanıtı.\n\n' +
             '**5 belge silindi** — aynı fatura iki kez park edilmiş. ' +
             'Muhasebeleşmiş olsalardı {{FB08}} ile ters kaydedilmeleri gerekecek ve ' +
             'mizanda kalıcı iz bırakacaklardı. Parkta oldukları için ' +
             '**temiz bir şekilde** silindiler.' },

      { baslik:'Kalıcı önlemler kurulur', tcode:'FBV3',
        aciklama:'İki sorun için de sistemsel çözüm.',
        girdi:[
          { alan:'Önlem 1 — yetki', deger:'Rol A ve Rol B **birleştirilemez** kuralı SoD matrisine eklendi' },
          { alan:'Önlem 2 — izleme', deger:'Aylık sorgu: {{VBKPF}} `USNAM` = {{BKPF}} `USNAM` olan belge var mı?' },
          { alan:'Önlem 3 — kapanış', deger:'"Park edilmiş belge kaldı mı?" kapanış listesine eklendi' },
          { alan:'Önlem 4 — yaşlandırma', deger:'7 günden eski park belgeleri haftalık raporlanıyor' },
        ],
        not:'**Dördüncü önlem en değerlisi:** parkta bekleyen belgelerin ' +
             'yaşlandırma raporu. Bir belge 7 günden fazla parkta kalıyorsa ' +
             'ya unutulmuştur ya bir sorun vardır.\n\n' +
             'Bu rapor, dönem sonunda 63 belgelik bir yığınla karşılaşmayı önler — ' +
             'sorun her hafta küçük parçalar hâlinde çözülür.' },

      { baslik:'Sonraki denetimde doğrulama', tcode:'SE16N',
        aciklama:'Üç ay sonra aynı sorgu tekrarlanıyor.',
        girdi:[
          { alan:'Toplam belge (3 ay)', deger:'1.260' },
          { alan:'{{VBKPF}} `USNAM` = {{BKPF}} `USNAM`', deger:'**0 belge**' },
          { alan:'Parkta 7 günden eski', deger:'**2 belge** (izleniyor)' },
          { alan:'Denetim bulgusu', deger:'**Kapandı**' },
        ],
        not:'Sıfır sonucu, kontrolün çalıştığının kanıtı. ' +
             'Ama asıl değerli olan **sorgunun kendisidir**: ' +
             'denetçiye "kontrolümüz var" demek yerine ' +
             '"işte kanıtı" diyebilmek.\n\n' +
             'Bu sorgu artık aylık rutinde ve bir sonraki denetime ' +
             'hazır cevap olarak duruyor.' },
    ],

    sonuc:
      '**Aynı denetim bulgusu iki kez yazıldı — çünkü park açıldı ama kontrol kurulmadı.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Dört-göz prensibi park özelliğiyle değil, yetkilendirmeyle kurulur.** ' +
      'Aynı kullanıcı hem {{FV60}} hem {{FBV0}} yetkisine sahipse mekanizma ' +
      'yalnızca bir gecikmedir. Ayrıca {{FB60}} yetkisi de kaldırılmalıdır — ' +
      'yoksa kullanıcı park etmeden doğrudan kaydeder. ' +
      'Kanıt tek bir sorguda: **{{VBKPF}} `USNAM` = {{BKPF}} `USNAM` olan belge sayısı sıfır olmalıdır.**\n\n' +
      '**2. Park edilmiş belgeler mizanda görünmez ve dönemi eksik bırakır.** ' +
      '58 Aralık faturası sisteme girilmişti ama muhasebeleştirilmediği için ' +
      'Aralık gideri 1.720.000 TL eksikti. Hiçbir standart rapor bunu göstermez — ' +
      'ne mizan, ne {{FBL1N}}, ne {{ACDOCA}}. ' +
      'Kapanış kontrol listesine **"park edilmiş belge kaldı mı?"** maddesi zorunludur.\n\n' +
      '**3. "Park başarılı" muhasebeleştirilebilir demek değildir.** ' +
      'Park aşamasında denklik, zorunlu alanlar, dönem ve hesap belirleme ' +
      '**kontrol edilmez**. 58 belgenin 4’ü {{FBV0}}’da reddedildi. ' +
      'Toplu park yapan aktarımlarda bu oran ciddi bir yarım-iş yaratır.\n\n' +
      '**4. Parkın hata maliyeti düşüktür — bunu kullan.** ' +
      '5 mükerrer belge **silindi** ve arkalarında hiçbir muhasebe izi kalmadı. ' +
      'Muhasebeleşmiş olsalardı {{FB08}} ile ters kaydedilecek ve ' +
      'mizanda kalıcı olarak görünüp açıklanmaları gerekecekti. ' +
      '**Şüpheli belgeyi muhasebeleştirmek yerine park etmek, temiz bir çıkış bırakır.**',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '{{park-etme}}, belgeyi **muhasebeleştirmeden** kaydetmektir; {{VBKPF}}/{{VBSEG}}’de durur.',
      'Park edilen belge **numara alır** ama **mizanı etkilemez**.',
      'Muhasebeleştirmede ({{FBV0}}) veri {{BKPF}}/{{BSEG}}’ye taşınır — **aynı numarayla**.',
      '**Park esnek, muhasebeleştirme katıdır:** parkta denklik zorunlu değil, {{FBV0}}’da zorunlu.',
      '**{{dort-goz}} prensibi yetkilendirmeyle kurulur** — park özelliğiyle değil.',
      'Park ≠ tutma (hold): hold **kişiseldir**, numara almaz, **denetim izi bırakmaz**.',
      'Park edilmiş belge **silinebilir**; muhasebeleşmiş belge yalnızca ters kaydedilir.',
      'Dönem sonunda park edilmiş belge kalırsa **dönem eksik kapanır**.',
    ],

    onemliNoktalar:[
      '**"Park ile hold farkı nedir?"** Park: numara alır, **herkes görebilir**, raporlanabilir, **denetim izi bırakır** → iç kontrol aracıdır. Hold: kişiseldir, numara almaz, iz bırakmaz → **dört-göz için kullanılamaz**.',
      '**"Dört-göz prensibi nasıl kurulur?"** Park özelliğini açmak **yetmez**. Yetkilendirme ayrılmalıdır: Rol A ({{FV60}}, {{FBV2}}, {{FBV3}}), Rol B ({{FBV0}}). Ayrıca {{FB60}} yetkisi de kaldırılmalıdır. Kanıt: {{VBKPF}} `USNAM` = {{BKPF}} `USNAM` olan belge **sıfır** olmalıdır.',
      '**"Park edilen belge mizanı etkiler mi?"** **Hayır.** {{VBKPF}}/{{VBSEG}} muhasebe tablosu değildir. Dönem sonunda park kalıntısı varsa dönem **eksik kapanır** ve hiçbir standart rapor bunu göstermez.',
      '**"Park edilen belge dengeli olmak zorunda mı?"** **Parkta hayır, muhasebeleştirmede evet.** Park bir çalışma alanıdır; {{FBV0}} dengesiz belgeyi reddeder.',
      '**"Belge numarası ne olur?"** Park anında verilir ve muhasebeleştirmede **korunur**. Silinen park belgelerinin numaraları boşa gider — aralıkta boşluk normaldir.',
      '**"Aralık’ta park, Ocak’ta muhasebe — hangi döneme düşer?"** {{FBV0}} anındaki **kayıt tarihine** göre. Aralık kapalıysa ya hata alınır ya kayıt Ocak’a kayar ve **gider yanlış dönemde** olur.',
      '**"{{FB03}} park edilmiş belgeyi bulur mu?"** **Hayır** — o yalnızca {{BKPF}}’ye bakar. {{FBV3}} kullanılır. "Numara var ama görüntülenemiyor" şikâyetinin ana sebebi budur.',
      '**"Yanlış belge park edilmişse?"** **Silinir** — muhasebe izi kalmaz. Muhasebeleşmiş olsaydı {{FB08}} ile ters kaydedilecek ve mizanda kalıcı iz bırakacaktı.',
    ],

    sikHatalar:[
      { hata:'Park özelliğini açıp yetkilendirmeyi ayırmamak.', dogru:'Aynı kullanıcı hem park edip hem muhasebeleştirebiliyorsa dört-göz **yoktur**. Rol A ve Rol B ayrılmalıdır.' },
      { hata:'{{FBV0}}’ı kaldırıp {{FB60}}’ı bırakmak.', dogru:'Kullanıcı park etmeden doğrudan kaydeder. **İkisi de** kaldırılmalıdır.' },
      { hata:'Dönem kapanmadan park kalıntısını temizlememek.', dogru:'Park edilmiş belgeler mizanda görünmez; dönem eksik kapanır. Kapanış listesine madde ekle.' },
      { hata:'"Park başarılı = muhasebeleştirilebilir" varsaymak.', dogru:'Parkta denklik, dönem ve hesap belirleme kontrol edilmez. {{FBV0}} reddedebilir.' },
      { hata:'Park edilmiş belgeyi {{FB03}} ile aramak.', dogru:'{{FBV3}} kullanılır. {{FB03}} yalnızca muhasebeleşmiş belgeleri görür.' },
      { hata:'Hold’u dört-göz aracı sanmak.', dogru:'Hold kişiseldir, iz bırakmaz, başkası göremez. İç kontrol için **uygun değildir**.' },
      { hata:'Şüpheli belgeyi muhasebeleştirmek.', dogru:'Park et. Silinebilir, iz bırakmaz — hata maliyeti çok daha düşüktür.' },
      { hata:'Park belgelerinin yaşlandırmasını izlememek.', dogru:'7 günden eski park belgeleri haftalık raporlanmalı; dönem sonunda yığın oluşmasın.' },
    ],

    ipuclari:[
      '**Denetime hazır cevap üret:** {{VBKPF}} `USNAM` ile {{BKPF}} `USNAM` alanlarının ' +
      'hiçbir belgede aynı olmadığını gösteren bir sorgu kaydet.',
      'Kapanış kontrol listesine **"park edilmiş belge kaldı mı?"** maddesini ekle.',
      'Parkta 7 günden fazla bekleyen belgeler için **haftalık yaşlandırma raporu** tut.',
      'Şüpheli veya eksik bilgili belgeyi **park et**, muhasebeleştirme — hata maliyeti düşer.',
      'Dönem sonu düzeltme kayıtlarını önce park et, topluca gözden geçir, sonra muhasebeleştir.',
      'Dış sistemden gelen aktarımları park ederek al; kontrolden geçmeden mizana girmesinler.',
    ],

    quiz:[
      { soru:'Park edilmiş bir belge mizanı nasıl etkiler?',
        secenekler:[
          'Normal belge gibi etkiler',
          'Yarı tutarla etkiler',
          '**Hiç etkilemez — {{VBKPF}}/{{VBSEG}} muhasebe tablosu değildir**',
          'Yalnızca bilançoyu etkiler',
        ], dogru:2,
        aciklama:'Park edilen belge numara alır ve sistemde durur ama **muhasebe kaydı değildir**. ' +
                 'Mizanda, {{FBL1N}}’de, {{ACDOCA}} raporlarında **hiç görünmez**. ' +
                 'Dönem sonunda park kalıntısı varsa dönem **eksik kapanır** ve ' +
                 'hiçbir standart rapor bunu göstermez.' },

      { soru:'Dört-göz prensibi nasıl kurulur?',
        secenekler:[
          'Park özelliğini açarak',
          'Onay iş akışı tanımlayarak',
          '**Yetkilendirmeyi ayırarak: park eden kullanıcıda {{FBV0}} yetkisi olmamalı**',
          'Belge türünü değiştirerek',
        ], dogru:2,
        aciklama:'Park bir **imkân** sunar, kontrolü **yetkilendirme** kurar. ' +
                 'Aynı kullanıcı hem {{FV60}} hem {{FBV0}} yetkisine sahipse ' +
                 'mekanizma yalnızca bir gecikmedir. ' +
                 'Ayrıca {{FB60}} yetkisi de kaldırılmalıdır — yoksa park etmeden doğrudan kaydeder.' },

      { soru:'Park ile tutma (hold) arasındaki en önemli fark nedir?',
        secenekler:[
          'Hold daha hızlıdır',
          '**Park edilen belge herkes tarafından görülebilir ve denetim izi bırakır; hold kişiseldir**',
          'Hold daha fazla alan destekler',
          'Fark yoktur',
        ], dogru:1,
        aciklama:'Park: belge numarası alır, {{VBKPF}}’ye yazılır, **başkaları görebilir**, ' +
                 'raporlanabilir, denetim izi bırakır → **iç kontrol aracıdır**.\n' +
                 'Hold: kişiseldir, yalnızca tutan kullanıcı görebilir, numara almaz, ' +
                 'iz bırakmaz → **dört-göz için kullanılamaz**.' },

      { soru:'Park edilen belge dengeli olmak zorunda mıdır?',
        secenekler:[
          'Evet, her zaman',
          '**Parkta hayır, muhasebeleştirmede evet**',
          'Hayır, hiçbir zaman',
          'Belge türüne bağlı',
        ], dogru:1,
        aciklama:'Park bir **çalışma alanıdır**: dengesiz olabilir, zorunlu alanlar boş kalabilir, ' +
                 'dönem kapalı olsa bile park edilebilir. ' +
                 '{{FBV0}} muhasebeleştirmede ise denklik, zorunlu alanlar ve ' +
                 'açık dönem **zorunludur**. "Park esnek, muhasebeleştirme katıdır."' },

      { soru:'Belge 28 Aralık’ta park edildi, 3 Ocak’ta muhasebeleştirildi. Gider hangi döneme düşer?',
        secenekler:[
          'Her zaman Aralık’a',
          'Her zaman Ocak’a',
          '**{{FBV0}} anındaki kayıt tarihine göre — Aralık kapalıysa Ocak’a kayar**',
          'Sistem sorar',
        ], dogru:2,
        aciklama:'Kayıt tarihi **muhasebeleştirme anında** belirlenir. ' +
                 'Aralık açıksa Aralık’a düşer ✓. Kapalıysa ya hata alınır ' +
                 'ya kullanıcı tarihi Ocak yapar ve **gider yanlış döneme** yazılır — ' +
                 've bu durumda **hata mesajı çıkmaz**.' },

      { soru:'Yanlış park edilmiş bir belge nasıl düzeltilir?',
        secenekler:[
          '{{FB08}} ile ters kaydedilir',
          '**{{FBV0}} ile silinir — muhasebe izi kalmaz**',
          'Değiştirilemez',
          'Yeni belge park edilir',
        ], dogru:1,
        aciklama:'Muhasebeleşmemiş belge **silinebilir** ve arkasında hiçbir muhasebe izi bırakmaz. ' +
                 'Muhasebeleşmiş belge silinemez — {{FB08}} ile ters kaydedilir ve ' +
                 'mizanda iki kayıt kalıcı görünür. ' +
                 'Parkın **hata maliyetinin düşük** olmasının sebebi budur.' },

      { soru:'Belge numarası var ama {{FB03}} bulamıyor. En olası sebep?',
        secenekler:[
          'Belge silinmiş',
          'Yanlış şirket kodu',
          '**Belge park edilmiş, muhasebeleştirilmemiş — {{FBV3}} ile görüntülenir**',
          'Numara aralığı hatası',
        ], dogru:2,
        aciklama:'{{FB03}} yalnızca {{BKPF}}’ye bakar — muhasebeleşmiş belgeleri görür. ' +
                 'Park edilmiş belge {{VBKPF}}’dedir ve {{FBV3}} ile görüntülenir. ' +
                 'Bu, "numara var ama görüntülenemiyor" şikâyetinin ana sebebidir.' },

      { soru:'Denetçiye dört-göz prensibinin çalıştığını nasıl kanıtlarsın?',
        secenekler:[
          'Süreç dokümanını gösterirsin',
          'Eğitim kayıtlarını gösterirsin',
          '**{{VBKPF}} `USNAM` ile {{BKPF}} `USNAM` alanlarının hiçbir belgede aynı olmadığını gösteren sorgu**',
          'Rol tanımlarını gösterirsin',
        ], dogru:2,
        aciklama:'Park eden kullanıcı {{VBKPF}} `USNAM`’de, muhasebeleştiren {{BKPF}} `USNAM`’de tutulur. ' +
                 'İkisinin **hiçbir belgede aynı olmaması**, kontrolün fiilen çalıştığının ' +
                 'en güçlü kanıtıdır. Süreç dokümanı niyeti gösterir; ' +
                 'bu sorgu **sonucu** gösterir.' },
    ],

    flashcards:[
      { on:'Park edilen belge mizanı etkiler mi?', arka:'**HAYIR.**\n\nVBKPF/VBSEG **muhasebe tablosu değildir**.\n\nMizanda · FBL1N’de · ACDOCA’da \n\nDönem sonunda park kalıntısı varsa dönem **eksik kapanır** — hiçbir rapor göstermez.' },
      { on:'Dört-göz prensibi nasıl kurulur?', arka:'**Yetkilendirmeyle — park özelliğiyle DEĞİL.**\n\n**Rol A:** FV60, FV50, FBV2, FBV3\n**Rol B:** FBV0, FBV3\n\nFB60 yetkisi de kaldırılmalı — yoksa park etmeden doğrudan kaydeder.' },
      { on:'Park vs Hold', arka:'**Park** — numara alır · herkes görür · raporlanır · **denetim izi bırakır** → iç kontrol aracı ✓\n\n**Hold** — kişisel · numara almaz · iz bırakmaz → dört-göz için **kullanılamaz** ' },
      { on:'"Park esnek, muhasebeleştirme katı" ne demek?', arka:'**Parkta:** dengesiz olabilir · zorunlu alanlar boş · dönem kapalı olabilir · silinebilir\n\n**FBV0’da:** denklik **zorunlu** · alanlar dolu · dönem **açık** · artık değiştirilemez\n\nPark = çalışma alanı, defter değil.' },
      { on:'Belge numarasına ne olur?', arka:'**Park anında verilir, muhasebeleştirmede KORUNUR.**\n\nAvantaj: parkta verilen referans geçerliliğini sürdürür.\n\nYan etki: silinen park belgelerinin numaraları **boşa gider** — aralıkta boşluk **normaldir**.' },
      { on:'Aralık’ta park, Ocak’ta muhasebe — hangi dönem?', arka:'**FBV0 anındaki kayıt tarihine göre.**\n\na) Aralık açık → Aralık ✓\nb) Aralık kapalı, tarih değişmiyor → **hata**\nc) Aralık kapalı, tarih Ocak → **gider yanlış dönemde** hata vermez!' },
      { on:'FB03 park edilmiş belgeyi bulur mu?', arka:'**HAYIR** — FB03 yalnızca BKPF’ye bakar.\n\nPark edilmiş belge **FBV3** ile görüntülenir.\n\n"Numara var ama görüntülenemiyor" şikâyetinin ana sebebi budur.' },
      { on:'Yanlış park edilmiş belge nasıl düzeltilir?', arka:'**FBV0 → Sil.**\n\nMuhasebe izi **kalmaz**.\n\nMuhasebeleşmiş olsaydı: FB08 ile ters kayıt → mizanda **iki kalıcı kayıt**.\n\n→ Şüpheli belgeyi park et, muhasebeleştirme.' },
      { on:'Denetime kanıt — hangi sorgu?', arka:'**VBKPF-USNAM ≠ BKPF-USNAM**\n\nPark eden ile muhasebeleştiren kullanıcının hiçbir belgede aynı olmaması.\n\nSonuç **0 olmalı**.\n\nSüreç dokümanı niyeti, bu sorgu **sonucu** gösterir.' },
      { on:'"Park başarılı" ne anlama gelmez?', arka:'**Muhasebeleştirilebilir olduğu anlamına gelmez.**\n\nParkta kontrol edilmeyenler:\n• Denklik\n• Zorunlu alanlar\n• Dönem açık mı\n• Hesap belirleme\n• Vergi hesaplama\n\nFBV0 reddedebilir.' },
      { on:'Park edilmiş belge hangi tablolarda?', arka:'**VBKPF** (başlık) + **VBSEG** (kalemler)\n\nMuhasebeleştirmede → **BKPF/BSEG/ACDOCA**’ya taşınır ve park kayıtları **silinir** (aynı LUW).\n\nYarım durum oluşamaz.' },
      { on:'Kapanış kontrol listesinde hangi madde?', arka:'**"Park edilmiş belge kaldı mı?"**\n\nDöneme ait park belgeleri kapanmadan önce muhasebeleştirilmeli.\n\n+ Haftalık: 7 günden eski park belgeleri yaşlandırma raporu → dönem sonunda yığın oluşmasın.' },
    ],
  },

  },
});
