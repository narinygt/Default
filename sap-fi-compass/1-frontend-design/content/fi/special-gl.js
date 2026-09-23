/* ==========================================================================
   content/fi/special-gl.js — "Special G/L (Özel Ana Muhasebe)"
   ========================================================================== */

SAP.registerTopic({
  id: 'special-gl',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Özel ana muhasebe (Special G/L), bir satıcı veya müşteri işleminin ' +
      '**normal mutabakat hesabından farklı bir hesapta** izlenmesini sağlar.\n\n' +
      'Normalde satıcıya olan borç {{LFB1}} `AKONT` alanındaki mutabakat hesabına (320) yazılır. ' +
      'Ama satıcıya **avans** verildiğinde bu bir borç değil, bir **alacaktır** — ' +
      've bilançoda 320’de değil 159’da (verilen avanslar) görünmelidir.\n\n' +
      'Mekanizma tek bir karakterle çalışır: **{{ozel-ana-muhasebe-gostergesi}}**. ' +
      'Kullanıcı `A` (avans) girer, sistem mutabakat hesabını **değiştirerek** kaydeder. ' +
      'Satıcı yine aynı satıcıdır, kalem yine satıcı kalemidir — yalnızca G/L hesabı farklıdır.\n\n' +
      'Kritik ayrım şudur: **iş ortağı aynı kalır, muhasebe hesabı değişir.** ' +
      'Bu sayede "bu satıcıyla toplam ilişkim ne?" sorusu tek yerden cevaplanırken, ' +
      'bilançoda avans ile borç ayrı ayrı raporlanır.',

    neden:
      '**Bilanço doğruluğu.** Verilen avans bir varlıktır, satıcı borcuyla netleştirilerek ' +
      'gösterilemez. Alınan avans bir yükümlülüktür, müşteri alacağından düşülemez.\n\n' +
      '**Yasal zorunluluk.** Tekdüzen hesap planında avanslar (159, 340), teminatlar (126, 326) ve ' +
      'senetler (121, 321) ayrı hesaplarda izlenir.\n\n' +
      '**İş ortağı bütünlüğü.** Avansı ayrı bir G/L kaydıyla izlerseniz, satıcıyla bağlantısı kopar. ' +
      'Özel ana muhasebe hem ayırır hem bağlı tutar.\n\n' +
      '**Süreç entegrasyonu.** {{F110}} avansları görür ve mahsup önerir; ' +
      'ihtar programı istatistiksel kalemleri dikkate alır.',

    sirketOnemi:
      'Özel ana muhasebe, FI’ın **"ara kavramıdır"**: temel işlemleri bilen ama mimariye ' +
      'hâkim olmayan kullanıcılar burada zorlanır. Çünkü tek bir alan (gösterge), ' +
      'kaydın hem hesabını hem davranışını değiştirir.\n\n' +
      'Danışman açısından bu konu **avans süreçlerinin tamamını** kapsar: ' +
      'talep → ödeme → fatura → mahsup zinciri. Zincirin bir halkası atlanırsa ' +
      'avans bilançoda **asılı kalır** ve yıllarca kimse fark etmez.\n\n' +
      'Ayırt edici soru şudur: **"Avans mahsup edilmezse ne olur?"** ' +
      'Doğru cevap: satıcı borcu **ve** verilen avans **aynı anda** bilançoda görünür — ' +
      'yani hem varlık hem yükümlülük şişer. Fiş dengelidir, mizan tutar, ' +
      'hiçbir alarm çalmaz. Bu, en sık rastlanan bilanço şişmesi sebebidir.',

    gercekHayat:
      'Bir şirket yeni bir makine siparişi veriyor: 1.200.000 TL, **%30 peşin**.\n\n' +
      '360.000 TL avans ödeniyor. Muhasebeci alışkanlıkla normal ödeme kaydı yapıyor: ' +
      'satıcı borç / banka alacak.\n\n' +
      'Sorun: **satıcıya henüz bir borç yok** — fatura gelmedi. ' +
      'Kayıt, olmayan bir borcu kapatıyor ve satıcı hesabında **ters bakiye** yaratıyor.\n\n' +
      'Üç ay sonra fatura geliyor: 1.200.000 TL. Sistem satıcıya 1.200.000 TL borç yazıyor. ' +
      'Satıcı bakiyesi: 1.200.000 − 360.000 = 840.000 TL. **Rakam doğru.**\n\n' +
      'Ama bilanço yanlış: verilen avans üç ay boyunca **159 hesabında hiç görünmedi**. ' +
      'Ara dönem bilançosunda 360.000 TL varlık eksik raporlandı.\n\n' +
      'Doğru yol: avansı **`A` göstergesiyle** ödemek. O zaman 159 hesabı borçlanır, ' +
      'satıcı bakiyesi bozulmaz, fatura geldiğinde {{F-54}} ile mahsup edilir.',

    muhasebeMantigi:
      'Özel ana muhasebenin muhasebe mantığı **netleştirme yasağına** dayanır.\n\n' +
      'Muhasebenin temel ilkelerinden biri şudur: **varlıklar ve yükümlülükler ' +
      'birbiriyle netleştirilerek gösterilemez** (yasal netleştirme hakkı yoksa).\n\n' +
      'Satıcıya 360.000 TL avans verdiniz ve aynı satıcıya 1.200.000 TL borcunuz var. ' +
      'Bilançoda "840.000 TL borç" yazmak **yanlıştır**: ' +
      '360.000 TL bir **varlıktır** (mal/hizmet alma hakkı), ' +
      '1.200.000 TL bir **yükümlülüktür**. İkisi ayrı gösterilmelidir.\n\n' +
      'Özel ana muhasebe tam olarak bunu sağlar. Mahsup ({{F-54}}) ise ' +
      'gerçekten netleştirme hakkı doğduğunda — yani fatura geldiğinde — yapılır.\n\n' +
      'İkinci mantık katmanı **istatistiksel kalemlerdir**: avans *talebi* bir yükümlülük ' +
      'değildir, henüz para çıkmamıştır. Bu yüzden bilançoyu etkilemez ama ' +
      'sistemde izlenir ({{F-47}}).',

    kavramlar: ['ozel-ana-muhasebe-gostergesi', 'mutabakat-hesabi', 'acik-kalem',
                'avans', 'teminat', 'kapatma'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Özel ana muhasebenin tipik süreci **dört adımlı avans zinciridir**: ' +
      'talep → ödeme → fatura → mahsup. Her adım farklı bir işlem kullanır ve ' +
      'son adım atlanırsa avans bilançoda asılı kalır.',

    roller:[
      { rol:'Satın alma', gorev:'Sözleşmede avans şartını belirler; muhasebeye bildirir.' },
      { rol:'AP muhasebe', gorev:'{{F-47}} ile avans talebi oluşturur (istatistiksel).' },
      { rol:'Hazine', gorev:'{{F-48}} veya {{F110}} ile avansı öder.' },
      { rol:'AP muhasebe', gorev:'Fatura geldiğinde {{F-54}} ile avansı mahsup eder. **En sık atlanan adım.**' },
      { rol:'Ana muhasebe', gorev:'Ay sonunda açık avansları kontrol eder ({{FBL1N}} özel G/L filtresiyle).' },
      { rol:'FI danışmanı', gorev:'{{FBKP}} ile göstergeleri ve mutabakat hesabı eşleşmelerini tanımlar.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Avans zinciri — dört adım, biri atlanırsa bilanço şişer',
      adimlar:[
        { ic:'📋', rol:'AP muhasebe', baslik:'Avans talebi ({{F-47}}) — **istatistiksel**',
          aciklama:'Gösterge **F**. Bilançoyu **etkilemez**, yalnızca izlenir. ' +
                   '{{F110}} bu talebi görüp ödeme önerisine alır.',
          cikti:'İstatistiksel kalem', ok:'ödeme zamanı gelir' },
        { ic:'💸', rol:'Hazine', baslik:'Avans ödenir ({{F-48}} veya {{F110}})',
          aciklama:'Gösterge **A**. **159 Verilen avanslar** borçlanır, banka alacaklanır. ' +
                   'Talep kalemi kapanır.',
          cikti:'Gerçek avans kalemi', ok:'mal/hizmet gelir' },
        { ic:'🧾', rol:'AP muhasebe', baslik:'Fatura kaydedilir ({{FB60}} / {{MIRO}})',
          aciklama:'**Normal kayıt** — gösterge yok. 320 Satıcılar alacaklanır. ' +
                   'Avans hâlâ 159’da duruyor.',
          cikti:'Satıcı borcu', ok:'**mahsup gerekir**' },
        { ic:'🔗', rol:'AP muhasebe', baslik:'**Avans mahsup edilir ({{F-54}})**',
          aciklama:'159 alacaklanır, 320 borçlanır. Avans ile borç netleşir. ' +
                   '**Bu adım atlanırsa bilanço şişer.**',
          cikti:'Netleşmiş bakiye', ok:'kalan ödenir' },
        { ic:'💰', rol:'Hazine', baslik:'Kalan tutar ödenir ({{F-53}} / {{F110}})',
          aciklama:'Fatura tutarı − avans = kalan. Satıcı açık kalemi kapanır.',
          cikti:'Kapanmış işlem' },
      ],
    },

    adimlar:[
      { rol:'AP muhasebe', eylem:'Avans talebi oluşturur', sistem:'{{F-47}} — gösterge **F**, istatistiksel' },
      { rol:'Hazine', eylem:'Avansı öder', sistem:'{{F-48}} veya {{F110}} — gösterge **A**' },
      { rol:'AP muhasebe', eylem:'Faturayı kaydeder', sistem:'{{FB60}} / {{MIRO}} — **gösterge yok**' },
      { rol:'AP muhasebe', eylem:'Avansı mahsup eder', sistem:'{{F-54}} — **atlanmamalı**' },
      { rol:'Hazine', eylem:'Kalanı öder', sistem:'{{F-53}} / {{F110}}' },
      { rol:'Ana muhasebe', eylem:'Açık avansları kontrol eder', sistem:'{{FBL1N}} — özel G/L göstergesi filtresi' },
      { rol:'AR muhasebe', eylem:'Müşteri avansı alır', sistem:'{{F-29}} — gösterge **A**, 340 hesabı' },
      { rol:'AR muhasebe', eylem:'Müşteri avansını mahsup eder', sistem:'{{F-39}}' },
    ],

    veriAkisi:{
      nereden:'Satıcı/müşteri ana verisi ({{LFB1}}/{{KNB1}} `AKONT`), ' +
              'özel G/L göstergesi tanımı ({{FBKP}}), alternatif mutabakat hesabı eşleşmesi.',
      nereye:'{{BSEG}} `UMSKZ` alanı, {{BSIK}}/{{BSID}} açık kalemleri, ' +
             'alternatif mutabakat hesapları (159, 340, 126, 326).',
      tetikleyen:'Özel G/L göstergesi girilen her kayıt.',
      sonraki:'Mahsup ({{F-54}}/{{F-39}}), kalan ödeme, dönem sonu avans kontrolü.',
    },

    notlar:[
      { tip:'warn', baslik:'Mahsup adımı en sık atlanan adımdır', metin:
        'Avans zincirinin dördüncü adımı ({{F-54}}) atlandığında **hiçbir hata oluşmaz**:\n\n' +
        'Satıcı borcu 1.200.000 TL olarak durur, verilen avans 360.000 TL olarak durur. ' +
        'Fiş dengelidir, mizan tutar, {{FBL1N}} normal görünür.\n\n' +
        'Ama bilanço **her iki tarafta da şişmiştir**: 360.000 TL fazla varlık, ' +
        '360.000 TL fazla yükümlülük. Bilanço büyüklüğü olduğundan büyük görünür, ' +
        'oran analizleri bozulur.\n\n' +
        'Daha kötüsü: kalan ödeme yapılırken kullanıcı 1.200.000 TL’nin tamamını öderse ' +
        '**avans ikinci kez ödenmiş olur**. Bu, gerçek bir nakit kaybıdır.\n\n' +
        '**Önlem:** ay sonu kapanış listesine "açık avanslar" kontrolünü ekle: ' +
        '{{FBL1N}} → özel G/L göstergesi **A** → açık kalemler. ' +
        'Faturası gelmiş bir avans bu listede kalmamalıdır.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Özel ana muhasebenin muhasebe etkisi **avans zincirinin dört adımında** izlenir. ' +
      'Aşağıdaki fişler aynı işlemin tüm aşamalarını gösteriyor — ' +
      'ayrıca mahsubun atlandığı hatalı senaryo da var.',

    etkilenenHesaplar:[
      { hesap:'159 Verilen sipariş avansları', tur:'Bilanço — Varlık', neden:'Satıcıya verilen avans. Gösterge **A** → alternatif mutabakat hesabı.' },
      { hesap:'340 Alınan sipariş avansları', tur:'Bilanço — Kaynak', neden:'Müşteriden alınan avans. Bir yükümlülüktür — mal/hizmet borcu.' },
      { hesap:'320 Satıcılar', tur:'Bilanço — Kaynak', neden:'Normal mutabakat hesabı ({{LFB1}} `AKONT`); gösterge girilmediğinde kullanılır.' },
      { hesap:'120 Alıcılar', tur:'Bilanço — Varlık', neden:'Müşterinin normal mutabakat hesabı.' },
      { hesap:'126 Verilen depozito ve teminatlar', tur:'Bilanço — Varlık', neden:'Gösterge **T** veya benzeri; kira/ihale teminatları.' },
      { hesap:'326 Alınan depozito ve teminatlar', tur:'Bilanço — Kaynak', neden:'Müşteriden alınan teminat.' },
      { hesap:'121 Alacak senetleri', tur:'Bilanço — Varlık', neden:'Gösterge **W** — senede bağlanmış müşteri alacağı.' },
      { hesap:'İstatistiksel kalemler', tur:'Bilanço etkisi **yok**', neden:'Avans talebi (gösterge **F**) yalnızca izlenir, kayıt üretmez.' },
    ],

    fisler:[
      { baslik:'Adım 1 — Avans talebi ({{F-47}}) · **istatistiksel, bilanço etkisi yok**',
        belgeTuru:'KA', tarih:'05.07.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'İstatistiksel kalem — Satıcı V-2001, gösterge **F**', borc:0, alacak:0,
            not:'Yalnızca izleme; **G/L hesabı etkilenmez**' },
        ],
        not:'Avans **talebi** bir yükümlülük değildir — henüz para çıkmadı, ' +
             'sözleşme gereği bir niyet var.\n\n' +
             'Bu yüzden kayıt **istatistikseldir** (noted item): bilançoyu etkilemez, ' +
             'ama {{F110}} bu talebi görüp ödeme önerisine alabilir ve ' +
             '{{FBL1N}}’de izlenebilir.\n\n' +
             '*(Tabloda 0/0 gösterimi, kaydın G/L etkisi olmadığını vurgulamak içindir.)*' },

      { baslik:'Adım 2 — Avans ödenir ({{F-48}}) · gösterge **A**',
        belgeTuru:'KZ', tarih:'10.07.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'Verilen sipariş avansları — V-2001', borc:360000, not:'Gösterge **A** → alternatif mutabakat hesabı' },
          { hesap:'102', ad:'Bankalar', alacak:360000 },
        ],
        not:'**320 Satıcılar hesabı hiç kullanılmadı.** ' +
             'Kalem yine satıcı kalemidir ({{BSIK}}’te durur, satıcı numarası taşır) ' +
             'ama G/L tarafında **159** hesabına yazıldı.\n\n' +
             'Bilançoda doğru yerde: **varlık** olarak, çünkü karşılığında mal/hizmet alma hakkı var.\n\n' +
             'Talep kalemi (adım 1) bu ödemeyle kapandı.' },

      { baslik:'Adım 3 — Fatura gelir ({{FB60}}) · **gösterge yok**',
        belgeTuru:'KR', tarih:'15.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Tesis, makine ve cihazlar', borc:1000000 },
          { hesap:'191', ad:'İndirilecek KDV', borc:200000 },
          { hesap:'320', ad:'Satıcılar — V-2001', alacak:1200000, not:'**Normal** mutabakat hesabı' },
        ],
        not:'Fatura **normal kayıttır** — özel G/L göstergesi girilmez. ' +
             '320 hesabı alacaklanır.\n\n' +
             '**Şu anda bilançoda iki kalem var:**\n' +
             '159 Verilen avans: 360.000 TL (varlık)\n' +
             '320 Satıcılar: 1.200.000 TL (yükümlülük)\n\n' +
             'İkisi de doğru ama **netleştirilmeleri gerekiyor** — çünkü artık ' +
             'yasal netleştirme hakkı doğdu.' },

      { baslik:'Adım 4 — Avans mahsup edilir ({{F-54}}) · **kritik adım**',
        belgeTuru:'KA', tarih:'15.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-2001', borc:360000, not:'Borç azaldı' },
          { hesap:'159', ad:'Verilen sipariş avansları — V-2001', alacak:360000, not:'Avans kapandı' },
        ],
        not:'Avans ile borç netleşti. **Bilanço artık doğru:**\n' +
             '159 Verilen avans: **0 TL**\n' +
             '320 Satıcılar: **840.000 TL** (kalan borç)\n\n' +
             'Bu adım atlanırsa bilanço her iki tarafta 360.000 TL şişer ' +
             've kalan ödemede avansın ikinci kez ödenmesi riski doğar.' },

      { baslik:'Adım 5 — Kalan tutar ödenir ({{F-53}})',
        belgeTuru:'KZ', tarih:'30.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-2001', borc:840000 },
          { hesap:'102', ad:'Bankalar', alacak:840000 },
        ],
        not:'1.200.000 − 360.000 = **840.000 TL** ödendi. ' +
             'Toplam nakit çıkışı: 360.000 + 840.000 = 1.200.000 TL ✓\n\n' +
             'Satıcı açık kalemi kapandı, işlem tamamlandı.' },

      { baslik:'**Hatalı senaryo** — mahsup atlanır, tam tutar ödenir',
        belgeTuru:'KZ', tarih:'30.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-2001', borc:1200000, not:'**Tam fatura tutarı**' },
          { hesap:'102', ad:'Bankalar', alacak:1200000, not:'**Fazla ödeme**' },
        ],
        not:'{{F-54}} atlandığı için satıcı borcu 1.200.000 TL göründü ve ' +
             'kullanıcı tamamını ödedi.\n\n' +
             '**Sonuç:** toplam nakit çıkışı 360.000 + 1.200.000 = **1.560.000 TL**. ' +
             'Fatura 1.200.000 TL. **360.000 TL fazla ödendi.**\n\n' +
             'Ayrıca 159 hesabında 360.000 TL avans hâlâ açık duruyor — ' +
             'artık satıcıdan **alacaklı** durumdayız ama kimse fark etmiyor.\n\n' +
             'Bu, özel ana muhasebenin doğru kullanılmamasının ' +
             '**gerçek nakit kaybına** dönüştüğü noktadır.' },

      { baslik:'Müşteri avansı — ayna işlem ({{F-29}}) · gösterge **A**',
        belgeTuru:'DZ', tarih:'12.07.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bankalar', borc:250000 },
          { hesap:'340', ad:'Alınan sipariş avansları — C-5002', alacak:250000, not:'**Yükümlülük** — mal/hizmet borcu' },
        ],
        not:'Müşteriden alınan avans bir **yükümlülüktür**: para alındı ama ' +
             'karşılığında mal/hizmet verilmedi.\n\n' +
             'Bu yüzden 120 Alıcılar (varlık) değil **340 Alınan avanslar** (kaynak) kullanılır.\n\n' +
             'Satıcı tarafının **tam aynası**: orada varlık, burada yükümlülük.\n' +
             'Mahsup {{F-39}} ile yapılır.' },
    ],

    tHesaplar:[
      { hesap:'Verilen sipariş avansları', kod:'159 (varlık)',
        borc:[{ ad:'Avans ödemesi ({{F-48}})', tutar:360000 }],
        alacak:[{ ad:'Mahsup ({{F-54}})', tutar:360000 }],
        not:'Mahsup sonrası **sıfırlanmalı**' },
      { hesap:'Satıcılar', kod:'320 (kaynak)',
        borc:[{ ad:'Avans mahsubu', tutar:360000 }, { ad:'Kalan ödeme', tutar:840000 }],
        alacak:[{ ad:'Fatura', tutar:1200000 }],
        not:'Normal mutabakat hesabı' },
      { hesap:'Alınan sipariş avansları', kod:'340 (kaynak)',
        borc:[{ ad:'Mahsup ({{F-39}})', tutar:250000 }],
        alacak:[{ ad:'Müşteri avansı ({{F-29}})', tutar:250000 }],
        not:'Satıcı tarafının aynası' },
    ],

    notlar:[
      { tip:'tip', baslik:'Neden ayrı bir G/L kaydı yetmez?', metin:
        'Akla gelen basit çözüm şudur: avansı {{FB50}} ile doğrudan 159 hesabına yaz, ' +
        'satıcıyla uğraşma.\n\n' +
        'Bu **üç şeyi kaybettirir**:\n\n' +
        '**1. İş ortağı bağlantısı.** Kalem satıcı numarası taşımaz. ' +
        '"V-2001 ile toplam ilişkim ne?" sorusu cevaplanamaz; ' +
        '{{FBL1N}} bu avansı hiç görmez.\n\n' +
        '**2. Otomatik mahsup.** {{F-54}} çalışamaz — avansı satıcı kalemi olarak bulamaz. ' +
        'Mahsup elle yapılır ve unutulur.\n\n' +
        '**3. Süreç entegrasyonu.** {{F110}} avansı görmez, ödeme önerisinde dikkate almaz. ' +
        'Satıcı bakiye raporları eksik kalır.\n\n' +
        'Özel ana muhasebe bu üçünü korurken **yalnızca G/L hesabını** değiştirir. ' +
        'Tasarımın zarafeti buradadır: **ayırır ama koparmaz**.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Özel ana muhasebe kalemleri **iki büyük sınıfa** ayrılır: ' +
      '**gerçek** (bilançoyu etkiler) ve **istatistiksel** (yalnızca izlenir). ' +
      'Bu ayrım, göstergenin davranışını belirleyen en temel özelliktir.',

    liste:[
      { ad:'Gerçek özel G/L kalemi', en:'Real Special G/L Item',
        aciklama:'Alternatif mutabakat hesabına **gerçek kayıt** üretir; bilançoyu etkiler.',
        neZaman:'Avans ödendiğinde, teminat verildiğinde, senet alındığında.',
        ornek:'Gösterge **A** (avans) → 159 hesabı borçlanır, banka alacaklanır.',
        tcodes:['F-48','F-29'] },

      { ad:'İstatistiksel kalem', en:'Statistical / Noted Item',
        aciklama:'**Bilançoyu etkilemez**; yalnızca izleme amaçlı tek taraflı kayıt.',
        neZaman:'Avans talebi, kefalet, garanti gibi henüz gerçekleşmemiş taahhütlerde.',
        ornek:'Gösterge **F** (avans talebi) → G/L etkisi yok, ' +
              'ama {{F110}} görür ve ödeme önerisine alır.',
        tcodes:['F-47','F-37'] },

      { ad:'Verilen avans (satıcı)', en:'Down Payment Made — gösterge A',
        aciklama:'Satıcıya ödenen avans; **varlık** olarak izlenir.',
        neZaman:'Sipariş öncesi peşin ödeme gerektiğinde.',
        ornek:'159 Verilen sipariş avansları. Mahsup {{F-54}} ile.',
        tcodes:['F-48','F-54'] },

      { ad:'Alınan avans (müşteri)', en:'Down Payment Received — gösterge A',
        aciklama:'Müşteriden alınan avans; **yükümlülük** olarak izlenir.',
        neZaman:'Müşteriden peşin tahsilat yapıldığında.',
        ornek:'340 Alınan sipariş avansları. Mahsup {{F-39}} ile.',
        tcodes:['F-29','F-39'] },

      { ad:'Teminat / depozito', en:'Guarantee / Security Deposit',
        aciklama:'Sözleşme güvencesi olarak verilen veya alınan tutarlar.',
        neZaman:'Kira sözleşmeleri, ihale teminatları, kamu işlerinde.',
        ornek:'126 Verilen depozito ve teminatlar / 326 Alınan depozito ve teminatlar. ' +
              '**Uzun süre açık kalır** — dönem sonu kontrolü önemlidir.' },

      { ad:'Senet', en:'Bill of Exchange — gösterge W',
        aciklama:'Alacağın senede bağlanması; farklı vade ve risk profili taşır.',
        neZaman:'Senetle çalışılan sektörlerde (tekstil, gıda toptancılığı).',
        ornek:'121 Alacak senetleri / 321 Borç senetleri. ' +
              'Ayrı hesapta izlenir çünkü **ciro edilebilir ve iskonto ettirilebilir**.' },

      { ad:'Şüpheli alacak', en:'Doubtful Receivable',
        aciklama:'Tahsili şüpheli hâle gelen alacağın ayrı izlenmesi.',
        neZaman:'Müşteri ödeme güçlüğüne düştüğünde; ihtar sürecinin sonunda.',
        ornek:'128 Şüpheli ticari alacaklar. Normal alacaktan ayrılır ki ' +
              'yaşlandırma ve karşılık hesabı doğru çalışsın.' },

      { ad:'Otomatik gösterge', en:'Automatic Special G/L Indicator',
        aciklama:'Sistem tarafından otomatik atanan gösterge; kullanıcı seçmez.',
        neZaman:'Senet işlemleri, bazı ödeme yöntemlerinde.',
        ornek:'Ödeme programı senet ödemesinde ilgili göstergeyi kendi atar.' },
    ],

    karsilastirmaBasliklar:['Gerçek kalem', 'İstatistiksel kalem'],
    karsilastirma:[
      ['Bilanço etkisi', '**Var** — G/L hesabı hareket görür', '**Yok** — yalnızca izlenir'],
      ['Karşı kayıt', 'Var (banka, kasa)', 'Yok — tek taraflı'],
      ['Tipik gösterge', '**A** avans, **T** teminat', '**F** avans talebi'],
      ['Tipik işlem', '{{F-48}}, {{F-29}}', '{{F-47}}, {{F-37}}'],
      ['{{F110}} davranışı', 'Ödenmiş kalem olarak görür', '**Ödeme önerisine alır**'],
      ['Mizanda görünür mü?', 'Evet', 'Hayır'],
      ['Kapanma biçimi', 'Mahsupla ({{F-54}})', 'Ödeme yapılınca otomatik'],
      ['Amaç', 'Doğru bilanço sunumu', 'Süreç izleme ve ödeme tetikleme'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'F-47', ad:'Satıcı avans talebi — istatistiksel',
        amac:'Satıcıya ödenecek avans için istatistiksel kalem oluşturur; ' +
             '{{F110}} bunu görüp ödeme önerisine alır.',
        neZaman:'Sözleşmede avans şartı varken, ödemeden önce.',
        adimlar:[
          { baslik:'Satıcı ve şirket kodunu gir' },
          { baslik:'**Özel G/L göstergesini gir** — genelde `F`',
            aciklama:'Bu gösterge kaydı **istatistiksel** yapar; bilanço etkilenmez.' },
          { baslik:'Tutar ve vade tarihini gir',
            aciklama:'Vade, {{F110}}’un talebi ne zaman ödeme önerisine alacağını belirler.' },
          { baslik:'Kaydet', aciklama:'G/L hesabı hareket **görmez**.' },
        ],
        ekranAkisi:[
          { ekran:'Başlık', islem:'Belge türü KA · şirket 1000' },
          { ekran:'Satıcı', islem:'V-2001 · özel G/L göstergesi **F**' },
          { ekran:'Kalem', islem:'360.000 TL · vade 10.07.2027' },
        ],
        alanlar:{
          zorunlu:['Satıcı','Şirket kodu','Özel G/L göstergesi','Tutar','Vade'],
          opsiyonel:['Metin','Referans','Satın alma siparişi'] },
        hatalar:[
          { mesaj:'Special G/L indicator ... not defined for account type K', sebep:'Gösterge satıcı hesap tipi için tanımlanmamış.', cozum:'{{FBKP}} ile göstergeyi tanımla ve alternatif mutabakat hesabını ata.' },
        ],
        ipucu:'Avans talebi adımı **isteğe bağlıdır** — doğrudan {{F-48}} ile de ödeme yapılabilir. ' +
              'Ama talep oluşturulursa {{F110}} avansı **otomatik** ödeme önerisine alır ve ' +
              'süreç insan takibinden çıkar. Düzenli avans çalışan şirketlerde ' +
              'bu adım ciddi zaman kazandırır.',
        ilgili:['F-48','F110','FBL1N'] },

      { kod:'F-48', ad:'Satıcı avansı öde — gerçek kalem',
        amac:'Avansı öder ve **159 Verilen avanslar** hesabına kaydeder.',
        neZaman:'Avans ödemesi yapılırken.',
        adimlar:[
          { baslik:'Banka hesabı, tutar ve tarihi gir' },
          { baslik:'Satıcıyı ve **özel G/L göstergesini** gir',
            aciklama:'Gösterge **A**. Bu, mutabakat hesabını 320’den **159**’a çevirir.' },
          { baslik:'Varsa avans talebini seç',
            aciklama:'{{F-47}} ile talep oluşturulmuşsa burada seçilir ve kapanır.' },
          { baslik:'Simüle et ve kaydet',
            aciklama:'Kayıt: 159 borç / banka alacak. **320 hiç kullanılmaz.**' },
        ],
        alanlar:{
          zorunlu:['Banka hesabı','Tutar','Satıcı','Özel G/L göstergesi'],
          opsiyonel:['Avans talebi referansı','Metin'] },
        hatalar:[
          { mesaj:'Alternative reconciliation account not defined', sebep:'{{FBKP}}’de gösterge ↔ hesap eşleşmesi eksik.', cozum:'{{FBKP}} ile mutabakat hesabı 320 için gösterge **A** → 159 eşleşmesini tanımla.' },
          { mesaj:'Account ... requires special G/L indicator', sebep:'159 hesabı yalnızca özel G/L ile kullanılacak şekilde tanımlanmış.', cozum:'Doğru davranış; göstergeyi gir.' },
        ],
        ipucu:'Kayıttan sonra {{FBL1N}}’de satıcıyı özel G/L göstergesi filtresiyle sorgula: ' +
              'avans **satıcı kalemi olarak** görünmelidir. ' +
              'Görünmüyorsa yanlışlıkla düz G/L kaydı yapılmış demektir ve ' +
              '{{F-54}} ile mahsup **çalışmaz**.',
        ilgili:['F-47','F-54','FBL1N','FBKP'] },

      { kod:'F-54', ad:'Satıcı avansını mahsup et — **en kritik işlem**',
        amac:'Verilen avansı satıcı faturasıyla netleştirir.',
        neZaman:'Fatura kaydedildikten sonra, **her zaman**.',
        adimlar:[
          { baslik:'Satıcı ve şirket kodunu gir' },
          { baslik:'Mahsup edilecek faturayı seç',
            aciklama:'Fatura belge numarası girilir.' },
          { baslik:'Açık avansları listele ve seç',
            aciklama:'Sistem o satıcının açık avanslarını gösterir; ' +
                     'kısmi mahsup de yapılabilir.' },
          { baslik:'Kaydet',
            aciklama:'Kayıt: 320 borç / 159 alacak. Avans kapanır, satıcı borcu azalır.' },
        ],
        ekranAkisi:[
          { ekran:'Başlık', islem:'Satıcı V-2001 · fatura 1900007712' },
          { ekran:'Avans listesi', islem:'360.000 TL açık avans seçildi' },
          { ekran:'Simülasyon', islem:'320 borç 360.000 / 159 alacak 360.000' },
        ],
        alanlar:{
          zorunlu:['Satıcı','Fatura referansı','Mahsup edilecek avans'],
          opsiyonel:['Kısmi tutar','Metin'] },
        hatalar:[
          { mesaj:'No down payments found for vendor', sebep:'Avans özel G/L göstergesiyle değil, düz G/L kaydıyla yapılmış.', cozum:'Avans kaydını ters kaydet, {{F-48}} ile gösterge **A** kullanarak yeniden gir.' },
          { mesaj:'Down payment amount exceeds invoice amount', sebep:'Avans faturadan büyük.', cozum:'Kısmi mahsup yap; kalan avans açık kalır ve sonraki faturayla mahsup edilir.' },
        ],
        ipucu:'**Bu işlem atlandığında hiçbir hata oluşmaz** — ve tehlike buradadır. ' +
              'Bilanço her iki tarafta şişer, kalan ödemede avans ikinci kez ödenebilir.\n\n' +
              'Ay sonu kapanışına şu kontrolü ekle: {{FBL1N}} → gösterge **A** → açık kalemler. ' +
              'Faturası gelmiş bir avans bu listede **kalmamalıdır**.',
        ilgili:['F-48','FBL1N','F-53'] },

      { kod:'F-29', ad:'Müşteri avansı al — ayna işlem',
        amac:'Müşteriden alınan avansı **340 Alınan avanslar** hesabına kaydeder.',
        neZaman:'Müşteriden peşin tahsilat yapıldığında.',
        adimlar:[
          { baslik:'Banka hesabı, tutar ve tarihi gir' },
          { baslik:'Müşteriyi ve özel G/L göstergesini gir', aciklama:'Gösterge **A**.' },
          { baslik:'Kaydet', aciklama:'Kayıt: banka borç / **340** alacak.' },
        ],
        ipucu:'Satıcı tarafının **tam aynasıdır** ama muhasebe mantığı terstir: ' +
              'orada avans bir **varlıktır** (mal alma hakkı), ' +
              'burada bir **yükümlülüktür** (mal verme borcu). ' +
              'Bu yüzden 120 değil **340** hesabı kullanılır.',
        hatalar:[
          { mesaj:'Alternative reconciliation account not defined for account type D', sebep:'Müşteri hesap tipi için gösterge tanımlanmamış.', cozum:'{{FBKP}} ile müşteri mutabakat hesabı 120 → gösterge A → 340 eşleşmesini tanımla.' },
        ],
        ilgili:['F-39','F-37','FBKP'] },

      { kod:'F-39', ad:'Müşteri avansını mahsup et',
        amac:'Alınan avansı satış faturasıyla netleştirir.',
        neZaman:'Satış faturası kesildikten sonra.',
        adimlar:[
          { baslik:'Müşteri ve faturayı gir' },
          { baslik:'Açık avansları seç' },
          { baslik:'Kaydet', aciklama:'Kayıt: 340 borç / 120 alacak.' },
        ],
        ipucu:'{{F-54}}’ün müşteri karşılığıdır ve **aynı risk** geçerlidir: ' +
              'atlanırsa hem alınan avans hem müşteri alacağı bilançoda durur ve ' +
              'müşteriden **fazla tahsilat** yapılabilir.',
        ilgili:['F-29','FBL5N'] },

      { kod:'FBKP', ad:'Özel G/L göstergesi yapılandırması',
        amac:'Göstergeleri, tiplerini ve alternatif mutabakat hesabı eşleşmelerini tanımlar.',
        neZaman:'Kurulumda; yeni bir özel işlem tipi gerektiğinde.',
        adimlar:[
          { baslik:'Özel G/L bölümüne gir' },
          { baslik:'Hesap tipini seç', aciklama:'**K** satıcı · **D** müşteri.' },
          { baslik:'Göstergeyi tanımla',
            aciklama:'Tek karakter. Tipi belirlenir: **gerçek** mi **istatistiksel** mi.' },
          { baslik:'**Mutabakat hesabı eşleşmesini gir**',
            aciklama:'Normal hesap (320) → alternatif hesap (159). ' +
                     'Her mutabakat hesabı için ayrı satır gerekir.' },
        ],
        alanlar:{
          zorunlu:['Hesap tipi','Gösterge','Normal mutabakat hesabı','Alternatif hesap'],
          opsiyonel:['İstatistiksel işareti','Hedef özel G/L göstergesi'] },
        hatalar:[
          { mesaj:'Alternative reconciliation account not defined', sebep:'Eşleşme yalnızca bazı mutabakat hesapları için tanımlanmış.', cozum:'**Kullanılan tüm mutabakat hesapları için** eşleşme girilmelidir — birden çok 320* hesabı varsa hepsi.' },
        ],
        ipucu:'En sık yapılandırma hatası: şirketin birden çok satıcı mutabakat hesabı olması ' +
              '(yurtiçi 320, yurtdışı 321, grup şirketleri 322) ve eşleşmenin ' +
              'yalnızca biri için tanımlanması.\n\n' +
              'Sonuç: bazı satıcılara avans ödenebilir, bazılarına ödenemez — ' +
              've hata mesajı sebebi açıkça söylemez.',
        ilgili:['F-48','F-29','FS00'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Özel ana muhasebenin tablo tarafı sadedir: **tek bir alan** ({{BSEG}} `UMSKZ`) ' +
      'her şeyi belirler. Ayrı tablo yoktur — kalemler normal satıcı/müşteri ' +
      'açık kalem tablolarında durur.',

    liste:[
      { ad:'BSEG', baslik:'Belge kalemleri — özel G/L göstergesi burada',
        tutar:'Kalemin özel G/L göstergesi (`UMSKZ`) ve kullanılan alternatif mutabakat hesabı.',
        olusturan:'Belge kaydı',
        guncelleyen:'Mahsup ve kapatma işlemleri',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{BSIK}}/{{BSID}} açık kalem indeksleri; {{LFB1}}/{{KNB1}} ana veri.',
        s4:'{{uyumluluk-view}}; {{ACDOCA}} `UMSKZ` alanını taşır.',
        alanlar:[
          { ad:'UMSKZ', aciklama:'**Özel G/L göstergesi** — A avans, F talep, W senet. Boşsa normal kalem.' },
          { ad:'HKONT', aciklama:'Kullanılan G/L hesabı — gösterge varsa **alternatif** hesap (159)' },
          { ad:'LIFNR / KUNNR', aciklama:'Satıcı / müşteri — **gösterge olsa da dolu kalır**', tip:'fk' },
          { ad:'UMSKS', aciklama:'Özel G/L işlem tipi — A avans, W senet, D diğer' },
        ] },

      { ad:'BSIK', baslik:'Satıcı açık kalemleri',
        tutar:'Avans kalemleri de **burada** durur — normal borçlarla aynı tabloda.',
        olusturan:'Satıcı kalemi içeren her belge',
        guncelleyen:'Kapatma → {{BSAK}}’a taşınır',
        anahtar:'LIFNR + BUKRS + BELNR + BUZEI',
        iliskiler:'{{FBL1N}} bu tablodan okur; `UMSKZ` ile filtrelenebilir.',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'UMSKZ', aciklama:'Gösterge — {{FBL1N}}’de **filtre olarak** kullanılır' },
          { ad:'LIFNR', aciklama:'Satıcı — avans da satıcıya bağlıdır', tip:'fk' },
        ] },

      { ad:'BSID', baslik:'Müşteri açık kalemleri',
        tutar:'Müşteri avansları ve teminatları burada.',
        olusturan:'Müşteri kalemi içeren her belge',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'UMSKZ', aciklama:'Gösterge — A alınan avans, W senet' },
        ] },

      { ad:'LFB1', baslik:'Satıcı şirket kodu verisi',
        tutar:'**Normal** mutabakat hesabı (`AKONT`). Alternatif hesap burada **değil**, ' +
              'yapılandırmadadır ({{FBKP}}).',
        olusturan:'{{BP}} → FI Vendor rolü',
        s4:'{{BP}} ile yönetilir.',
        alanlar:[
          { ad:'AKONT', aciklama:'{{mutabakat-hesabi}} — 320. Gösterge girilince **kullanılmaz**.' },
        ] },

      { ad:'T074', baslik:'Özel G/L hesap belirleme',
        tutar:'Gösterge ↔ alternatif mutabakat hesabı eşleşmesi.',
        olusturan:'{{FBKP}}',
        guncelleyen:'{{FBKP}}',
        anahtar:'KOART + SHBKZ + HKONT',
        iliskiler:'Kayıt sırasında bu tablo okunarak alternatif hesap bulunur.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KOART', aciklama:'Hesap tipi — **K** satıcı, **D** müşteri' },
          { ad:'SHBKZ', aciklama:'Özel G/L göstergesi' },
          { ad:'HKONT', aciklama:'Normal mutabakat hesabı (320)' },
          { ad:'SKONT', aciklama:'**Alternatif** mutabakat hesabı (159)' },
        ] },

      { ad:'ACDOCA', baslik:'Evrensel kayıt defteri',
        tutar:'Özel G/L kalemleri de burada; `UMSKZ` alanıyla ayrışır.',
        olusturan:'Her FI belgesi',
        s4:'S/4HANA’da özel G/L analizinin ana kaynağı.' },
    ],

    er:{
      type:'er',
      baslik:'Özel G/L — tek alan her şeyi belirler',
      varliklar:[
        { ad:'LFB1', rol:'Ana veri', aciklama:'Satıcı şirket kodu verisi',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT', tip:'fk' }] },
        { ad:'T074', rol:'Özelleştirme', aciklama:'**Gösterge → alternatif hesap**',
          alanlar:[{ ad:'KOART', tip:'pk' }, { ad:'SHBKZ', tip:'pk' }, { ad:'HKONT', tip:'fk' }, { ad:'SKONT' }] },
        { ad:'BKPF', rol:'FI', aciklama:'Belge başlığı',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'BSEG', rol:'FI', hub:true, aciklama:'Kalem — **UMSKZ burada**',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'UMSKZ' }, { ad:'HKONT' }, { ad:'LIFNR', tip:'fk' }] },
        { ad:'BSIK', rol:'İndeks', aciklama:'Satıcı açık kalemleri',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'UMSKZ' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'Evrensel kalemler',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'UMSKZ' }, { ad:'RACCT' }] },
      ],
      iliskiler:[
        { from:'LFB1', to:'T074', alanlar:'AKONT → HKONT', not:'normal hesap' },
        { from:'T074', to:'BSEG', alanlar:'SKONT → HKONT', not:'**alternatif hesap**' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'başlık → kalem' },
        { from:'BSEG', to:'BSIK', alanlar:'BELNR + BUZEI', not:'açık kalem' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR + BUZEI', not:'evrensel kalem' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Kullanıcı açısından özel ana muhasebe **tek bir alandan** ibarettir: ' +
      'özel G/L göstergesi. Ama o alanın doğru doldurulması ve ' +
      'mahsup adımının atlanmaması sürecin tamamını belirler.',

    ekranlar:[
      { ad:'{{F-48}} — avans ödeme ekranı',
        aciklama:'Banka bilgisi ve satıcı bilgisi girilir; gösterge alanı kritiktir.',
        alanlar:[
          { ad:'Banka hesabı', zorunlu:true, aciklama:'Ödemenin çıktığı hesap.' },
          { ad:'Tutar / tarih', zorunlu:true },
          { ad:'Satıcı', zorunlu:true, aciklama:'Avans **satıcıya bağlı** kalır — bu, tasarımın kalbidir.' },
          { ad:'**Özel G/L göstergesi**', zorunlu:true, aciklama:'**A**. Boş bırakılırsa normal ödeme olur ve ' +
                   'olmayan bir borç kapatılmaya çalışılır.' },
          { ad:'Avans talebi referansı', zorunlu:false, aciklama:'{{F-47}} ile talep varsa seçilir ve kapanır.' },
        ],
        ipucu:'Gösterge alanı boş bırakılırsa sistem **hata vermez** — normal bir ödeme kaydı yapar. ' +
              'Sonuç: satıcı hesabında ters bakiye oluşur ve 159 hesabı hiç hareket görmez.\n\n' +
              'Kayıttan sonra kontrol: {{FBL1N}} → satıcı → gösterge **A** filtresi. ' +
              'Avans burada görünmüyorsa yanlış girilmiştir.' },

      { ad:'{{F-54}} — avans mahsup ekranı',
        aciklama:'Fatura ile avansın netleştirildiği ekran; sürecin en kritik adımı.',
        alanlar:[
          { ad:'Satıcı', zorunlu:true },
          { ad:'Fatura belge numarası', zorunlu:true, aciklama:'Mahsup edilecek fatura.' },
          { ad:'Avans seçimi', zorunlu:true, aciklama:'Sistem açık avansları listeler; ' +
                   'birden çoksa hepsi veya bir kısmı seçilebilir.' },
          { ad:'Kısmi tutar', zorunlu:false, aciklama:'Avans faturadan büyükse kısmi mahsup yapılır; ' +
                   'kalan avans açık kalır.' },
        ],
        ipucu:'Avans listesi **boş geliyorsa** iki ihtimal var: ' +
              '(1) avans özel G/L göstergesiyle değil düz G/L kaydıyla yapılmış, ' +
              '(2) yanlış satıcı seçilmiş.\n\n' +
              'Birinci durum daha yaygındır ve düzeltmesi: avans kaydını ters kaydet, ' +
              '{{F-48}} ile gösterge kullanarak yeniden gir.' },

      { ad:'{{FBL1N}} — açık avans kontrolü',
        aciklama:'Özel ana muhasebenin **kontrol noktası**.',
        alanlar:[
          { ad:'Satıcı / şirket kodu', zorunlu:true },
          { ad:'Açık kalemler', zorunlu:true, aciklama:'Açık kalem seçeneği işaretlenir.' },
          { ad:'**Özel G/L göstergesi**', zorunlu:false, aciklama:'**A** girilirse yalnızca avanslar listelenir. ' +
                   'Boş bırakılırsa normal kalemler gelir — **avanslar görünmez**.' },
          { ad:'Tarih aralığı', zorunlu:false },
        ],
        ipucu:'**Kritik davranış:** {{FBL1N}}’de özel G/L göstergesi alanı boş bırakılırsa ' +
              'avanslar **listelenmez**. Kullanıcı "satıcının açık kalemleri" diye baktığında ' +
              'avansı görmez ve olmadığını sanır.\n\n' +
              'Bu, "avans nerede kayboldu?" sorusunun en yaygın cevabıdır. ' +
              'Tüm kalemleri görmek için gösterge alanına `*` girilir veya ' +
              'ayrı ayrı sorgulanır.' },

      { ad:'{{FBKP}} — gösterge yapılandırması',
        aciklama:'Göstergelerin ve hesap eşleşmelerinin tanımlandığı ekran.',
        alanlar:[
          { ad:'Hesap tipi', zorunlu:true, aciklama:'**K** satıcı · **D** müşteri' },
          { ad:'Gösterge', zorunlu:true, aciklama:'Tek karakter — A, F, W, T…' },
          { ad:'İstatistiksel işareti', zorunlu:false, aciklama:'İşaretliyse bilanço etkilenmez.' },
          { ad:'Normal → alternatif hesap', zorunlu:true, aciklama:'320 → 159. ' +
                   '**Kullanılan her mutabakat hesabı için ayrı satır.**' },
        ],
        ipucu:'Şirketin birden çok satıcı mutabakat hesabı varsa (yurtiçi/yurtdışı/grup) ' +
              'eşleşme **hepsi için** tanımlanmalıdır. ' +
              'Eksikse bazı satıcılara avans ödenemez ve hata mesajı sebebi açıkça söylemez.' },
    ],

    zorunlu:['Satıcı/müşteri','Özel G/L göstergesi','Tutar','Banka hesabı','Alternatif mutabakat hesabı (yapılandırma)'],
    opsiyonel:['Avans talebi referansı','Kısmi mahsup tutarı','Metin'],

    hatalar:[
      { mesaj:'Special G/L indicator ... is not defined for account type K', sebep:'Gösterge satıcı hesap tipi için tanımlanmamış.', cozum:'{{FBKP}} → hesap tipi K → göstergeyi tanımla.' },
      { mesaj:'Alternative reconciliation account not defined for account 320100', sebep:'O mutabakat hesabı için eşleşme girilmemiş.', cozum:'{{FBKP}}’de **kullanılan tüm** mutabakat hesapları için eşleşme tanımla — birden çok 320* hesabı varsa hepsi.' },
      { mesaj:'No down payments found for vendor (F-54)', sebep:'Avans düz G/L kaydıyla yapılmış; satıcı kalemi değil.', cozum:'Avans kaydını ters kaydet, {{F-48}} ile gösterge **A** kullanarak yeniden gir.' },
      { mesaj:'FBL1N’de avans görünmüyor', sebep:'Özel G/L göstergesi filtresi boş bırakılmış.', cozum:'Gösterge alanına **A** veya `*` gir. Bu bir hata değil, filtre davranışıdır.' },
      { mesaj:'Account 159000 requires a special G/L indicator', sebep:'Hesap yalnızca özel G/L ile kullanılacak şekilde tanımlanmış.', cozum:'Doğru davranıştır — düz kayıt engellenir. Göstergeyi gir.' },
      { mesaj:'Down payment amount exceeds invoice amount', sebep:'Avans faturadan büyük.', cozum:'Kısmi mahsup yap; kalan avans sonraki faturayla mahsup edilir.' },
    ],

    ipuclari:[
      '**Ay sonu kapanışına "açık avanslar" kontrolünü ekle:** {{FBL1N}} → gösterge **A** → ' +
      'açık kalemler. Faturası gelmiş bir avans bu listede kalmamalıdır.',
      '{{FBL1N}}’de gösterge alanı boş bırakılırsa avanslar **görünmez** — ' +
      '"avans kayboldu" şikâyetinin ilk sebebi budur.',
      'Avans ödemesinden sonra mutlaka {{FBL1N}} ile satıcı kalemi olarak göründüğünü doğrula; ' +
      'görünmüyorsa {{F-54}} çalışmaz.',
      '{{FBKP}}’de **kullanılan tüm** mutabakat hesapları için eşleşme tanımla.',
      'Alternatif mutabakat hesaplarını ({{FS00}}) "yalnızca otomatik kayıt" **yapma** — ' +
      'özel G/L işlemleri bu hesaplara satıcı/müşteri kalemi olarak yazar.',
      'Teminat gibi uzun süre açık kalan kalemleri yıllık olarak gözden geçir; ' +
      'sözleşmesi biten teminatlar bilançoda unutulur.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BSEG', ne:'`UMSKZ` özel G/L göstergesi + alternatif hesap `HKONT`' },
      { tablo:'BSIK', ne:'Satıcı açık kalemleri — avanslar da burada' },
      { tablo:'BSID', ne:'Müşteri açık kalemleri — alınan avanslar' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler; `UMSKZ` ile ayrışır' },
      { tablo:'BKPF', ne:'Belge başlığı' },
      { tablo:'T074', ne:'Gösterge ↔ alternatif hesap eşleşmesi ({{FBKP}})' },
    ],

    commit:
      'Özel G/L kaydı normal FI kaydından **teknik olarak farklı değildir** — ' +
      'aynı LUW, aynı tablolar, aynı commit mantığı.\n\n' +
      'Tek fark, hesap belirleme adımında {{T074}} tablosunun okunması ve ' +
      '{{LFB1}} `AKONT` yerine oradaki alternatif hesabın kullanılmasıdır.\n\n' +
      'Bu sadelik önemlidir: özel G/L özel bir modül değil, ' +
      '**normal FI kaydının bir varyantıdır**. Bu yüzden tüm standart mekanizmalar ' +
      '(kapatma, ters kayıt, kur değerlemesi, ihtar) özel G/L kalemleri üzerinde de çalışır.',

    belgeNo:
      'Özel G/L belgeleri normal numara aralıklarını kullanır. ' +
      'Ancak avans işlemleri için ayrı belge türü (KA) yaygındır ve ' +
      'bu türün kendi aralığı olur — raporda ayrışmayı kolaylaştırır.',

    postingLogic:
      'Özel G/L kaydının hesap belirleme zinciri:\n\n' +
      '**1.** Kullanıcı satıcı/müşteri ve **özel G/L göstergesi** girer.\n' +
      '**2.** Sistem {{LFB1}} `AKONT`’tan **normal** mutabakat hesabını okur (320).\n' +
      '**3.** {{T074}}’te (hesap tipi + gösterge + normal hesap) aranır.\n' +
      '**4.** Bulunan **alternatif hesap** (159) kaleme yazılır.\n' +
      '**5.** Gösterge **istatistiksel** olarak tanımlıysa karşı kayıt üretilmez; ' +
      'kalem yalnızca izleme amaçlı yazılır.\n' +
      '**6.** {{BSEG}} `UMSKZ` alanına gösterge kaydedilir — ' +
      'raporlama ve mahsup bu alana bakar.\n\n' +
      '3. adımda eşleşme bulunamazsa *"Alternative reconciliation account not defined"* ' +
      'hatası alınır ve **belge kaydedilemez**.',

    belgeTuru:
      'Belge türü özel G/L davranışını belirlemez ama sınıflandırma için önemlidir. ' +
      'Yaygın kullanım: **KA** (satıcı belgesi) avans talebi ve mahsup için, ' +
      '**KZ** (satıcı ödemesi) avans ödemesi için, **DZ** müşteri avansı için.\n\n' +
      'Belge türü ayrıca {{OBA7}}’de izin verilen hesap tiplerini sınırlar; ' +
      'özel G/L kalemleri satıcı (K) veya müşteri (D) tipinde olduğu için ' +
      'belge türünün bu tipe izin vermesi gerekir.',

    numberRange:
      'Ayrı aralık zorunlu değildir. Avans belge türleri için ayrı aralık tanımlanırsa ' +
      '{{FBN1}} ile açılır ve yılbaşında genişletilir.',

    accountDetermination:
      '{{FBKP}} → {{T074}}. Anahtar üçlüsü:\n\n' +
      '**Hesap tipi** (K satıcı / D müşteri) + **gösterge** (A, F, W…) + ' +
      '**normal mutabakat hesabı** (320) → **alternatif hesap** (159).\n\n' +
      'Kritik nokta: eşleşme **normal mutabakat hesabı bazındadır**. ' +
      'Şirketin birden çok satıcı mutabakat hesabı varsa (320100 yurtiçi, ' +
      '320200 yurtdışı, 320300 grup) **her biri için ayrı satır** gerekir.\n\n' +
      'Bu, en sık atlanan yapılandırma detayıdır ve sonucu şudur: ' +
      'bazı satıcılara avans ödenebilir, bazılarına ödenemez.',

    tur:
      '**Özelleştirme:** özel G/L göstergeleri, istatistiksel işareti, ' +
      'mutabakat hesabı eşleşmeleri ({{FBKP}} → {{T074}}), belge türleri.\n\n' +
      '**Ana veri:** satıcı/müşteri normal mutabakat hesabı ({{LFB1}}/{{KNB1}} `AKONT`), ' +
      'alternatif hesapların G/L ana verisi ({{SKB1}}).\n\n' +
      '**Hareket verisi:** {{BSEG}} `UMSKZ` alanlı kalemler.',

    transport:
      'Gösterge tanımları ve hesap eşleşmeleri taşınır. ' +
      '**Ama eşleşmeler G/L hesap numaralarına referans verir:** ' +
      'hedef sistemde 159000 hesabı açılmamışsa veya farklı numaralanmışsa ' +
      'eşleşme çalışmaz.\n\n' +
      'Ayrıca hedef sistemde **ek mutabakat hesapları** olabilir ' +
      '(test sisteminde tek 320, canlıda üç tane). ' +
      'Bu durumda testte çalışan avans işlemi canlıda ' +
      '*"Alternative reconciliation account not defined"* verir.\n\n' +
      '**Geçiş kontrolü:** canlıdaki tüm satıcı/müşteri mutabakat hesaplarını listele, ' +
      'her biri için eşleşmenin var olduğunu doğrula.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Satıcı Muhasebesi → İş İşlemleri → Avanslar → Verilen Avanslar → Avanslar İçin Alternatif Mutabakat Hesabı Tanımla', not:'{{FBKP}} → {{T074}}' },
      { yol:'SPRO → Finansal Muhasebe → Müşteri Muhasebesi → İş İşlemleri → Avanslar → Alınan Avanslar İçin Alternatif Mutabakat Hesabı Tanımla', not:'Müşteri tarafı — ayna yapılandırma' },
      { yol:'SPRO → Finansal Muhasebe → Satıcı Muhasebesi → İş İşlemleri → Senetler', not:'Senet göstergeleri (W)' },
      { yol:'SPRO → Finansal Muhasebe → Genel Ayarlar → Belge → Belge Türleri', not:'{{OBA7}} — KA, KZ, DZ türleri' },
    ],

    ekstra:[
      { ic:'📊', baslik:'İstatistiksel kalem: bilançoyu etkilemeden izleme', metin:
        'Avans **talebi** neden bilançoyu etkilemez? Çünkü henüz hiçbir şey olmadı: ' +
        'para çıkmadı, mal gelmedi, yasal bir yükümlülük doğmadı. ' +
        'Yalnızca sözleşmede bir avans şartı var.\n\n' +
        'Muhasebe ilkesi açıktır: **gerçekleşmemiş işlem kaydedilmez.** ' +
        'Ama süreç açısından bu bilginin sistemde olması gerekir — ' +
        'yoksa avans ödemesi kimsenin aklına gelmez.\n\n' +
        'SAP bunu **istatistiksel kalemle** çözer: kalem {{BSEG}}’e yazılır, ' +
        '{{FBL1N}}’de görünür, {{F110}} onu ödeme önerisine alır — ' +
        'ama **karşı kayıt üretilmez**, dolayısıyla mizanı ve bilançoyu etkilemez.\n\n' +
        'Aynı mekanizma kefalet ve garantiler için de kullanılır: ' +
        'bir yükümlülük değil ama izlenmesi gereken bir taahhüt.\n\n' +
        '**Danışmanlık notu:** istatistiksel kalemler denetimde ' +
        '"nazım hesaplar" mantığının sistem karşılığıdır ve ' +
        'bilanço dipnotlarının veri kaynağı olabilirler.' },

      { ic:'🔀', baslik:'Neden birden çok mutabakat hesabı sorun yaratır?', metin:
        '{{T074}} eşleşmesinin anahtarı üç alandır: hesap tipi + gösterge + ' +
        '**normal mutabakat hesabı**.\n\n' +
        'Üçüncü alan, en sık gözden kaçan detaydır. Şirketin tek bir satıcı mutabakat hesabı ' +
        'varsa (320000) sorun çıkmaz. Ama gerçek kurulumlarda genelde birden çoktur:\n\n' +
        '320100 Yurtiçi satıcılar · 320200 Yurtdışı satıcılar · 320300 Grup şirketleri\n\n' +
        'Her biri için **ayrı bir eşleşme satırı** gerekir. Yalnızca 320100 tanımlanmışsa:\n\n' +
        '**a)** Yurtiçi satıcılara avans ödenir ✓\n' +
        '**b)** Yurtdışı satıcılara avans **ödenemez** \n\n' +
        'Hata mesajı *"Alternative reconciliation account not defined"* der ama ' +
        '**hangi hesap için** olduğunu her zaman net söylemez. ' +
        'Kullanıcı "dün çalışıyordu, bugün çalışmıyor" der — ' +
        'aslında farklı bir satıcı grubuyla çalışmaktadır.\n\n' +
        '**Teşhis:** satıcının {{LFB1}} `AKONT` değerini oku, {{FBKP}}’de ' +
        'o hesap için eşleşme var mı bak.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Alternatif hesapları "yalnızca otomatik kayıt" yapma', metin:
        'Vergi hesaplarında doğru olan uygulama burada **yanlıştır**.\n\n' +
        '159 veya 340 gibi alternatif mutabakat hesaplarına ' +
        '{{FS00}}’da "yalnızca otomatik kayıt" işareti konursa, ' +
        'özel G/L işlemleri **çalışmaz** — çünkü bu işlemler o hesaplara ' +
        'satıcı/müşteri kalemi olarak yazar.\n\n' +
        'Doğru ayar: hesabı **mutabakat hesabı** olarak işaretlemektir ' +
        '({{SKB1}} `MITKZ` = K veya D). Bu, hesaba **doğrudan** kayıt atılmasını ' +
        'zaten engeller ama özel G/L işlemlerine izin verir.\n\n' +
        'İki ayar karıştırılırsa avans süreci hiç çalışmaz ve ' +
        'sebebi yapılandırmada saatlerce aranır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Özel ana muhasebe S/4HANA’da **hiç değişmedi**: göstergeler aynı, ' +
      '{{T074}} aynı, {{F-48}}/{{F-54}} aynı. ' +
      'Değişen yalnızca kalemlerin {{ACDOCA}}’da tutulması ve ' +
      'Fiori uygulamalarının gelmesi.',

    eccFarklari:[
      { konu:'Göstergeler', ecc:'{{FBKP}} → {{T074}}', s4:'**Değişmedi**' },
      { konu:'İşlemler', ecc:'{{F-47}}, {{F-48}}, {{F-54}}, {{F-29}}, {{F-39}}', s4:'**Aynı** + Fiori' },
      { konu:'Kalem verisi', ecc:'{{BSEG}} `UMSKZ`', s4:'{{ACDOCA}} `UMSKZ`' },
      { konu:'Açık kalem indeksi', ecc:'{{BSIK}} / {{BSID}} fiziksel', s4:'{{uyumluluk-view}}' },
      { konu:'Ana veri', ecc:'{{XK01}} / {{XD01}}', s4:'{{BP}}' },
      { konu:'Raporlama', ecc:'{{FBL1N}} gösterge filtresi', s4:'Aynı + Fiori "Manage Down Payments"' },
    ],

    universalJournal:
      '{{ACDOCA}} `UMSKZ` alanını taşır, dolayısıyla özel G/L analizleri ' +
      'artık **tek tablodan** yapılabilir.\n\n' +
      'Pratik kazanç: "hangi kâr merkezinde ne kadar açık avans var?" gibi sorular ' +
      'birleştirme (join) gerektirmeden cevaplanır. ' +
      'ECC’de {{BSIK}} ve {{BSEG}} birleştirilip kâr merkezi bulunması gerekirdi.\n\n' +
      'Ayrıca {{belge-bolme}} etkinse avans kalemleri de bölünür ve ' +
      'segment bazlı avans raporu alınabilir.',

    kalkanTcodes:[
      { eski:'{{XK01}} / {{XD01}}', yeni:'{{BP}}', not:'Ana veri — mutabakat hesabı buradan gelir' },
      { eski:'—', yeni:'—', not:'{{F-47}}, {{F-48}}, {{F-54}}, {{F-29}}, {{F-39}}, {{FBKP}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Manage Down Payments', aciklama:'Açık avansları görsel liste olarak gösterir; ' +
             'mahsup edilmemiş avansların takibi kolaylaşır.' },
      { ad:'Post Outgoing Payments', aciklama:'{{F-53}}/{{F-48}} yerine; özel G/L göstergesi alanı içerir.' },
      { ad:'Manage Supplier Line Items', aciklama:'{{FBL1N}} yerine; gösterge filtresi görsel.' },
      { ad:'Supplier Balances', aciklama:'Normal borç ve avansları ayrı ayrı gösterir.' },
    ],

    compatibilityViews:[
      '{{BSIK}}, {{BSID}}, {{BSEG}} — {{ACDOCA}}’dan türetilen görünümler.',
      '{{T074}} — **fiziksel tablo olarak duruyor**.',
      'Özel ana muhasebe, S/4HANA geçişinde yapı olarak **hiç etkilenmeyen** alanlardan biridir.',
    ],

    performans:
      'Açık avans raporları {{ACDOCA}} üzerinden çalıştığı için hızlandı. ' +
      'Asıl kazanç Fiori "Manage Down Payments" uygulamasıdır: ' +
      'mahsup edilmemiş avansların **görsel iş listesi** olarak sunulması, ' +
      'bu konudaki en sık hatanın (mahsup atlama) fark edilmesini kolaylaştırır.',

    bestPractices:[
      'Fiori "Manage Down Payments" uygulamasını **aylık rutine** al; ' +
      'mahsup edilmemiş avansların takibi için en pratik araçtır.',
      'Geçişte **tüm mutabakat hesapları için** {{T074}} eşleşmesini doğrula — ' +
      'canlıda test ortamından fazla hesap olabilir.',
      'Açık avansları geçişten önce temizle; devreden bakiyeler yeni sistemde ' +
      'bağlantısız kalabilir.',
      'Alternatif hesapların {{SKB1}} `MITKZ` (mutabakat hesabı tipi) ayarını kontrol et.',
      '{{belge-bolme}} etkinse avans kalemlerinin de bölündüğünü ve ' +
      'segment bilançosuna doğru yansıdığını test et.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'360.000 TL iki kez ödendi: mahsup adımı atlandı',
    hikaye:
      '**Akdeniz Gıda A.Ş.** yeni bir paketleme hattı sipariş ediyor: 1.200.000 TL, %30 peşin.\n\n' +
      'Avans ödeniyor, makine geliyor, fatura kaydediliyor, kalan ödeniyor. ' +
      'Süreç bitti sanılıyor.\n\n' +
      'Üç ay sonra satıcı arıyor: *"Hesabınızda 360.000 TL alacağınız var, ' +
      'iade edelim mi yoksa sonraki siparişe mi sayalım?"*\n\n' +
      'Muhasebe şaşırıyor: fazla ödeme yapıldığından **kimsenin haberi yok**. ' +
      'Bu senaryo, özel ana muhasebenin doğru kullanılmamasının ' +
      'nasıl gerçek nakit kaybına dönüştüğünü ve nasıl teşhis edildiğini gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · TRY' },
      { k:'Satıcı', v:'V-2001 · mutabakat hesabı **320100**' },
      { k:'Sipariş', v:'1.200.000 TL + %20 KDV · %30 peşin' },
      { k:'Avans', v:'360.000 TL — 10.07.2027' },
      { k:'Fatura', v:'1.200.000 + 240.000 KDV = 1.440.000 TL — 15.09.2027' },
      { k:'**Sorun**', v:'Toplam ödenen **1.800.000 TL** — 360.000 TL fazla' },
    ],

    adimlar:[
      { baslik:'Avans doğru şekilde ödenmişti', tcode:'F-48',
        aciklama:'İlk adım aslında doğru yapılmış — sorun burada değil.',
        girdi:[
          { alan:'Satıcı', deger:'V-2001' },
          { alan:'Özel G/L göstergesi', deger:'**A** ✓' },
          { alan:'Tutar', deger:'360.000 TL' },
        ],
        fis:{ baslik:'Belge 1500002201 — avans ödemesi', belgeTuru:'KZ', tarih:'10.07.2027',
          satirlar:[
            { hesap:'159', ad:'Verilen sipariş avansları — V-2001', borc:360000, not:'Gösterge **A**' },
            { hesap:'102', ad:'Bankalar', alacak:360000 },
          ], not:'Doğru kayıt: 159 hesabı borçlandı, satıcı kalemi olarak {{BSIK}}’te duruyor. ' +
                 '{{F-54}} bu kalemi bulabilecek durumda.' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'`UMSKZ` = **A** · `HKONT` = 159000' },
          { tablo:'BSIK', ne:'Satıcı açık kalemi — gösterge A' },
        ],
        not:'**Bu adım doğruydu.** Avans hem bilançoda doğru yerde hem satıcıya bağlı. ' +
             'Sorun sonraki adımlarda.' },

      { baslik:'Fatura kaydedildi — normal kayıt', tcode:'MIRO',
        aciklama:'Makine geldi, fatura kaydedildi.',
        girdi:[
          { alan:'Satıcı', deger:'V-2001' },
          { alan:'Tutar', deger:'1.200.000 + 240.000 KDV' },
          { alan:'Özel G/L göstergesi', deger:'**Yok** ✓ (doğru — fatura normal kayıttır)' },
        ],
        fis:{ baslik:'Belge 5100004411 — satıcı faturası', belgeTuru:'RE', tarih:'15.09.2027',
          satirlar:[
            { hesap:'253', ad:'Tesis, makine ve cihazlar', borc:1200000 },
            { hesap:'191', ad:'İndirilecek KDV', borc:240000 },
            { hesap:'320', ad:'Satıcılar — V-2001', alacak:1440000, not:'**Normal** mutabakat hesabı' },
          ], not:'Bu da doğru. Fatura normal kayıttır, gösterge girilmez.\n\n' +
                 '**Ama şu anda bilançoda iki kalem var:**\n' +
                 '159 Verilen avans: 360.000 TL (varlık)\n' +
                 '320 Satıcılar: 1.440.000 TL (yükümlülük)\n\n' +
                 'Netleştirilmeleri gerekiyor.' },
        not:'İki adım da doğru yapıldı. Sorun **yapılmayan** adımda.' },

      { baslik:'**Mahsup adımı atlandı** — hata burada', tcode:'F-54',
        aciklama:'{{F-54}} hiç çalıştırılmadı. Kimse fark etmedi.',
        girdi:[
          { alan:'Beklenen işlem', deger:'{{F-54}} — 320 borç 360.000 / 159 alacak 360.000' },
          { alan:'Yapılan', deger:'**Hiçbir şey**' },
          { alan:'Sistem uyarısı', deger:'**Yok** — hata mesajı çıkmaz' },
          { alan:'Bilanço durumu', deger:'159: 360.000 açık · 320: 1.440.000 açık' },
        ],
        not:'**Sürecin kritik açığı budur:** {{F-54}} atlandığında sistem hiçbir uyarı vermez. ' +
             'Fiş dengeli, mizan tutar, {{FBL1N}} normal görünür.\n\n' +
             'Satıcı borcu 1.440.000 TL olarak durur — sanki hiç avans ödenmemiş gibi.' },

      { baslik:'Tam tutar ödendi — nakit kaybı oluştu', tcode:'F-53',
        aciklama:'Ödeme günü geldiğinde {{FBL1N}}’de görünen 1.440.000 TL ödendi.',
        girdi:[
          { alan:'{{FBL1N}}’de görünen açık kalem', deger:'1.440.000 TL' },
          { alan:'Ödenen', deger:'**1.440.000 TL**' },
          { alan:'Ödenmesi gereken', deger:'1.440.000 − 360.000 = **1.080.000 TL**' },
          { alan:'**Fazla ödeme**', deger:'**360.000 TL**' },
        ],
        fis:{ baslik:'Belge 1500003876 — kalan ödeme (hatalı)', belgeTuru:'KZ', tarih:'30.09.2027',
          satirlar:[
            { hesap:'320', ad:'Satıcılar — V-2001', borc:1440000, not:'**Tam tutar**' },
            { hesap:'102', ad:'Bankalar', alacak:1440000, not:'**360.000 TL fazla**' },
          ], not:'Toplam nakit çıkışı: 360.000 + 1.440.000 = **1.800.000 TL**\n' +
                 'Fatura tutarı: **1.440.000 TL**\n' +
                 '**Fark: 360.000 TL fazla ödendi.**\n\n' +
                 '159 hesabında avans hâlâ açık — artık satıcıdan **alacaklıyız**.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'320 kalemi kapandı; **159 kalemi hâlâ açık**' },
          { tablo:'BSAK', ne:'Kapatılan fatura ve ödeme kalemleri' },
        ],
        not:'Ödemeyi yapan kişi {{FBL1N}}’de gördüğü tutarı ödedi ve ' +
             '**hiçbir hata yapmadı** — kendi bakış açısından.\n\n' +
             'Sorun, {{FBL1N}}’de gösterge filtresi boş olduğu için ' +
             'avansın o listede **hiç görünmemesidir**.' },

      { baslik:'Teşhis — açık avanslar sorgulanır', tcode:'FBL1N',
        aciklama:'Satıcının aramasından sonra araştırma başlıyor.',
        girdi:[
          { alan:'İlk sorgu', deger:'V-2001 · açık kalemler · gösterge **boş**' },
          { alan:'Sonuç', deger:'**Açık kalem yok** — her şey normal görünüyor' },
          { alan:'İkinci sorgu', deger:'V-2001 · açık kalemler · gösterge **A**' },
          { alan:'**Sonuç**', deger:'**360.000 TL açık avans** ' },
        ],
        not:'**Teşhisin kilit noktası:** {{FBL1N}}’de özel G/L göstergesi alanı ' +
             'boş bırakılırsa avanslar **listelenmez**.\n\n' +
             'İlk sorgu "her şey yolunda" dedi. İkinci sorgu sorunu ortaya çıkardı.\n\n' +
             'Bu davranış, hem sorunun **oluşmasının** hem geç **fark edilmesinin** sebebidir. ' +
             'Ödeme yapan kişi de aynı filtreyle bakmış ve avansı görmemişti.' },

      { baslik:'Doğrulama — 159 hesabı kontrol edilir', tcode:'FBL3N',
        aciklama:'Sorunun büyüklüğü ve başka örnekleri araştırılıyor.',
        girdi:[
          { alan:'Hesap', deger:'159000 Verilen sipariş avansları' },
          { alan:'Bakiye', deger:'**2.140.000 TL**' },
          { alan:'Açık kalem sayısı', deger:'**7 avans**' },
          { alan:'Faturası gelmiş olanlar', deger:'**4 tanesi** — mahsup edilmemiş' },
        ],
        not:'Sorun tek bir satıcıyla sınırlı değil: **dört avans** mahsup edilmemiş. ' +
             'İkisinde fazla ödeme yapılmış (toplam 590.000 TL), ' +
             'ikisinde henüz ödeme yapılmadığı için kayıp yok ama bilanço şişmiş.\n\n' +
             'Bu, tek bir kullanıcı hatası değil **süreç eksikliğidir**: ' +
             'mahsup adımı hiçbir kontrol listesinde yok.' },

      { baslik:'Düzeltme — geriye dönük mahsup', tcode:'F-54',
        aciklama:'Mahsup şimdi yapılıyor; fazla ödeme satıcı alacağına dönüşüyor.',
        girdi:[
          { alan:'Satıcı', deger:'V-2001' },
          { alan:'Fatura', deger:'5100004411' },
          { alan:'Mahsup edilen avans', deger:'360.000 TL' },
        ],
        fis:{ baslik:'Belge 1700001042 — avans mahsubu', belgeTuru:'KA', tarih:'15.10.2027',
          satirlar:[
            { hesap:'320', ad:'Satıcılar — V-2001', borc:360000, not:'Fatura zaten ödendiği için **ters bakiye** oluşur' },
            { hesap:'159', ad:'Verilen sipariş avansları', alacak:360000, not:'Avans kapandı ✓' },
          ], not:'159 hesabı **sıfırlandı** ✓\n\n' +
                 'Ama 320 hesabında artık **360.000 TL ters bakiye** var: ' +
                 'satıcıya borçlu değiliz, satıcıdan **alacaklıyız**.\n\n' +
                 'Bu, gerçek durumun muhasebedeki doğru yansımasıdır — ' +
                 've satıcıyla görüşmenin dayanağıdır.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'159 kalemi kapandı; 320’de ters bakiyeli açık kalem' },
        ],
        not:'Satıcıyla anlaşıldı: 360.000 TL **sonraki siparişe** sayılacak. ' +
             'Ters bakiye, o siparişin faturasıyla kapanacak.' },

      { baslik:'Önlem — süreç ve kontrol eklendi', tcode:'FBL1N',
        aciklama:'Aynı hatanın tekrarlanmaması için üç kalıcı önlem alınıyor.',
        girdi:[
          { alan:'Önlem 1 — kapanış kontrolü', deger:'{{FBL1N}} → gösterge **A** → açık kalemler sorgusu ' +
                                                    'ay sonu listesine eklendi' },
          { alan:'Önlem 2 — süreç', deger:'Fatura kaydeden kişi, satıcının açık avansı varsa ' +
                                          '**{{F-54}} yapmadan** işlemi kapatamaz' },
          { alan:'Önlem 3 — eğitim', deger:'Ödeme ekibine {{FBL1N}} gösterge filtresi davranışı anlatıldı' },
          { alan:'Önlem 4 — rapor', deger:'"Faturası gelmiş ama mahsup edilmemiş avanslar" varyantı kaydedildi' },
        ],
        not:'Dördüncü önlem en değerlisi: **avansı olan satıcıların faturalarını** listeleyen ' +
             'bir varyant, mahsup gereken durumları **proaktif** olarak gösteriyor.\n\n' +
             'S/4HANA’da Fiori "Manage Down Payments" aynı işi görsel olarak yapar.' },
    ],

    sonuc:
      '**360.000 TL fazla ödendi ve üç ay boyunca kimse fark etmedi.**\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. {{F-54}} mahsup adımı sessizce atlanabilir.** ' +
      'Sistem uyarı vermez, fiş dengelidir, mizan tutar. ' +
      'Ama bilanço her iki tarafta şişer ve kalan ödemede ' +
      'avans **ikinci kez ödenebilir** — bu, gerçek nakit kaybıdır.\n\n' +
      '**2. {{FBL1N}}’de gösterge filtresi boş bırakılırsa avanslar görünmez.** ' +
      'Bu davranış hem sorunun oluşmasının hem geç fark edilmesinin sebebidir: ' +
      'ödeme yapan kişi listede gördüğü tutarı ödedi ve kendi açısından hata yapmadı. ' +
      'Teşhis için gösterge alanına **A** veya `*` girilmelidir.\n\n' +
      '**3. Avans ödemesi doğru yapılmıştı — hata zincirin sonundaydı.** ' +
      '{{F-48}} gösterge **A** ile çalıştırılmış, kayıt kusursuzdu. ' +
      'Özel ana muhasebede **tek bir doğru adım yetmez**; ' +
      'zincirin tamamı (talep → ödeme → fatura → **mahsup**) tamamlanmalıdır.\n\n' +
      '**4. Çözüm kontrol listesindedir, dikkatte değil.** ' +
      '"Mahsubu unutmayın" demek işe yaramaz. ' +
      'Ay sonuna {{FBL1N}} gösterge **A** sorgusunu eklemek ve ' +
      '"faturası gelmiş ama mahsup edilmemiş avanslar" varyantı kaydetmek, ' +
      'hatayı **sistemsel olarak** yakalar. ' +
      'Danışmanlıkta tercih edilen çözüm biçimi budur.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'Özel ana muhasebe, satıcı/müşteri işlemini **farklı bir mutabakat hesabında** izler.',
      'Mekanizma tek karakterdir: **{{ozel-ana-muhasebe-gostergesi}}** ({{BSEG}} `UMSKZ`).',
      '**İş ortağı aynı kalır, G/L hesabı değişir** — ayırır ama koparmaz.',
      'Avans zinciri dört adımdır: talep ({{F-47}}) → ödeme ({{F-48}}) → fatura → **mahsup ({{F-54}})**.',
      '**Gerçek** kalem bilançoyu etkiler; **istatistiksel** kalem yalnızca izlenir.',
      'Eşleşme {{FBKP}} → {{T074}}: hesap tipi + gösterge + **normal mutabakat hesabı** → alternatif hesap.',
      '{{FBL1N}}’de gösterge filtresi **boşsa avanslar görünmez**.',
      '{{F-54}} atlanırsa bilanço şişer ve **fazla ödeme** riski doğar.',
    ],

    onemliNoktalar:[
      '**"Avans mahsup edilmezse ne olur?"** Satıcı borcu **ve** verilen avans aynı anda bilançoda durur — hem varlık hem yükümlülük şişer. Fiş dengeli, mizan tutar, **alarm yok**. Kalan ödemede avans ikinci kez ödenebilir.',
      '**"Neden ayrı bir G/L kaydı yetmez?"** Üç şey kaybolur: iş ortağı bağlantısı ({{FBL1N}} görmez), otomatik mahsup ({{F-54}} çalışmaz), süreç entegrasyonu ({{F110}} görmez).',
      '**"Gerçek ve istatistiksel kalem farkı?"** Gerçek kalem G/L hesabına kayıt üretir, bilançoyu etkiler ({{F-48}}, gösterge A). İstatistiksel kalem karşı kayıt üretmez, yalnızca izlenir ({{F-47}}, gösterge F) — ama {{F110}} onu **ödeme önerisine alır**.',
      '**"Alternatif mutabakat hesabı nasıl belirlenir?"** {{T074}}: hesap tipi (K/D) + gösterge + **normal mutabakat hesabı** → alternatif hesap. Üçüncü alan en sık atlanan detaydır.',
      '**"Birden çok mutabakat hesabı varsa?"** Her biri için **ayrı eşleşme satırı** gerekir. Eksikse bazı satıcılara avans ödenebilir, bazılarına ödenemez ve hata mesajı sebebi net söylemez.',
      '**"Müşteri avansı neden 340’ta?"** Alınan avans bir **yükümlülüktür** (mal/hizmet verme borcu), varlık değil. Satıcı tarafının aynasıdır: orada 159 varlık, burada 340 kaynak.',
      '**"{{FBL1N}}’de avans neden görünmüyor?"** Özel G/L göstergesi filtresi boş bırakılmıştır. Boşsa **yalnızca normal kalemler** listelenir. Gösterge alanına **A** veya `*` girilmelidir.',
      '**"Alternatif hesabı yalnızca otomatik kayıt yapmalı mıyım?"** **Hayır.** Özel G/L işlemleri o hesaplara satıcı/müşteri kalemi olarak yazar; işaret konursa süreç çalışmaz. Doğrusu hesabı **mutabakat hesabı** olarak işaretlemektir.',
    ],

    sikHatalar:[
      { hata:'{{F-54}} mahsup adımını atlamak.', dogru:'Fatura kaydedildikten sonra **her zaman** mahsup yapılır. Atlanırsa bilanço şişer ve fazla ödeme riski doğar.' },
      { hata:'Avansı düz G/L kaydıyla ({{FB50}}) 159 hesabına yazmak.', dogru:'{{F-48}} ile gösterge **A** kullanılır. Düz kayıtta {{F-54}} avansı bulamaz.' },
      { hata:'Avans ödemesinde göstergeyi boş bırakmak.', dogru:'Normal ödeme olur, olmayan borç kapatılır, satıcıda ters bakiye oluşur.' },
      { hata:'{{FBL1N}}’de gösterge filtresi boşken "avans yok" sonucuna varmak.', dogru:'Gösterge alanına **A** veya `*` gir. Boşsa avanslar listelenmez.' },
      { hata:'{{FBKP}}’de yalnızca bir mutabakat hesabı için eşleşme tanımlamak.', dogru:'Kullanılan **tüm** mutabakat hesapları için ayrı satır gerekir.' },
      { hata:'Alternatif hesabı "yalnızca otomatik kayıt" yapmak.', dogru:'Özel G/L işlemleri çalışmaz. Hesap **mutabakat hesabı** olarak işaretlenmelidir.' },
      { hata:'Müşteri avansını 120 hesabında izlemek.', dogru:'Alınan avans bir **yükümlülüktür** → 340 hesabı. 120 varlıktır.' },
      { hata:'Teminatları dönem sonunda gözden geçirmemek.', dogru:'Sözleşmesi biten teminatlar bilançoda yıllarca unutulur; yıllık kontrol gerekir.' },
    ],

    ipuclari:[
      '**Ay sonu kapanışına ekle:** {{FBL1N}} → gösterge **A** → açık kalemler. ' +
      'Faturası gelmiş avans bu listede kalmamalıdır.',
      '"Faturası gelmiş ama mahsup edilmemiş avanslar" için bir rapor varyantı kaydet — ' +
      'proaktif kontrol, hatırlatmadan güvenilirdir.',
      'Avans ödemesinden sonra {{FBL1N}} ile **satıcı kalemi olarak** göründüğünü doğrula.',
      '{{F-54}}’te avans listesi boş geliyorsa: avans düz G/L kaydıyla yapılmış olabilir.',
      'Teşhiste satıcının {{LFB1}} `AKONT` değerini oku, {{FBKP}}’de o hesap için eşleşme var mı bak.',
      'S/4HANA’da Fiori "Manage Down Payments" uygulaması mahsup takibini görselleştirir.',
    ],

    quiz:[
      { soru:'Satıcıya verilen avans neden 320 Satıcılar hesabında izlenmez?',
        secenekler:[
          'Teknik olarak mümkün değildir',
          '**Avans bir varlıktır (mal alma hakkı); satıcı borcuyla netleştirilerek gösterilemez**',
          'Satıcı hesabı dolu olduğu için',
          'Vergi mevzuatı gereği',
        ], dogru:1,
        aciklama:'Muhasebenin **netleştirme yasağı** ilkesi: varlıklar ve yükümlülükler ' +
                 'birbiriyle netleştirilerek gösterilemez. Avans (varlık) ile satıcı borcu ' +
                 '(yükümlülük) ayrı gösterilmelidir. Netleştirme, gerçekten hak doğduğunda ' +
                 '({{F-54}} mahsubuyla) yapılır.' },

      { soru:'{{F-54}} avans mahsubu atlanırsa ne olur?',
        secenekler:[
          'Sistem hata verir ve ödeme yapılamaz',
          'Fatura kaydedilemez',
          '**Hiçbir hata olmaz; bilanço her iki tarafta şişer ve avans ikinci kez ödenebilir**',
          'Avans otomatik mahsup edilir',
        ], dogru:2,
        aciklama:'**Sistem hiçbir uyarı vermez.** Fiş dengeli, mizan tutar, {{FBL1N}} normal görünür. ' +
                 'Ama satıcı borcu ve avans aynı anda bilançoda durur; ' +
                 'kalan ödemede tam tutar ödenirse avans **ikinci kez** ödenmiş olur — ' +
                 'gerçek nakit kaybı.' },

      { soru:'{{FBL1N}}’de satıcının açık kalemlerine bakıldı, avans görünmüyor. Sebep?',
        secenekler:[
          'Avans kapanmış',
          '**Özel G/L göstergesi filtresi boş bırakılmış**',
          'Yanlış şirket kodu',
          'Avans başka satıcıya kaydedilmiş',
        ], dogru:1,
        aciklama:'{{FBL1N}}’de gösterge alanı **boşsa yalnızca normal kalemler** listelenir; ' +
                 'özel G/L kalemleri görünmez. Bu davranış, "avans nerede kayboldu?" ' +
                 'sorusunun en yaygın cevabıdır. Gösterge alanına **A** veya `*` girilmelidir.' },

      { soru:'Avans **talebi** ({{F-47}}, gösterge F) bilançoyu neden etkilemez?',
        secenekler:[
          'Tutar küçük olduğu için',
          'Sistem hatası',
          '**İstatistiksel kalemdir; henüz para çıkmamış, yükümlülük doğmamıştır**',
          'Sonradan etkiler',
        ], dogru:2,
        aciklama:'Talep aşamasında hiçbir şey gerçekleşmemiştir — para çıkmadı, mal gelmedi. ' +
                 '"Gerçekleşmemiş işlem kaydedilmez" ilkesi gereği bilanço etkilenmez. ' +
                 'Ama kalem sistemde izlenir ve **{{F110}} onu ödeme önerisine alır**.' },

      { soru:'Alternatif mutabakat hesabı hangi üç bilgiyle belirlenir?',
        secenekler:[
          'Şirket kodu + satıcı + tutar',
          '**Hesap tipi (K/D) + özel G/L göstergesi + normal mutabakat hesabı**',
          'Belge türü + gösterge + tarih',
          'Yalnızca gösterge',
        ], dogru:1,
        aciklama:'{{T074}} anahtarı bu üçlüdür. **Üçüncü alan** en sık atlanan detaydır: ' +
                 'şirketin birden çok satıcı mutabakat hesabı varsa (320100 yurtiçi, ' +
                 '320200 yurtdışı) **her biri için ayrı eşleşme** gerekir.' },

      { soru:'Müşteriden alınan avans hangi hesapta izlenir ve neden?',
        secenekler:[
          '120 Alıcılar — müşteri kalemidir',
          '159 Verilen avanslar — avans hesabıdır',
          '**340 Alınan avanslar — bir yükümlülüktür (mal/hizmet verme borcu)**',
          '102 Bankalar — para geldiği için',
        ], dogru:2,
        aciklama:'Para alındı ama karşılığında mal/hizmet verilmedi → bu bir **yükümlülüktür**. ' +
                 'Satıcı tarafının tam aynasıdır: orada 159 **varlık** (mal alma hakkı), ' +
                 'burada 340 **kaynak** (mal verme borcu).' },

      { soru:'Avansı {{FB50}} ile doğrudan 159 hesabına yazmanın sakıncası nedir?',
        secenekler:[
          'Hesap bloklanır',
          'Vergi hesaplanmaz',
          '**İş ortağı bağlantısı kopar; {{FBL1N}} görmez ve {{F-54}} mahsup çalışmaz**',
          'Sakıncası yoktur',
        ], dogru:2,
        aciklama:'Düz G/L kaydında kalem **satıcı numarası taşımaz**. Sonuç: ' +
                 '{{FBL1N}} avansı hiç görmez, {{F-54}} onu bulamaz (mahsup çalışmaz) ve ' +
                 '{{F110}} ödeme önerisinde dikkate almaz. ' +
                 'Özel ana muhasebenin tasarım zarafeti **ayırıp koparmamasıdır**.' },

      { soru:'Alternatif mutabakat hesabı (159) {{FS00}}’da nasıl ayarlanmalıdır?',
        secenekler:[
          '**Yalnızca otomatik kayıt** işaretlenmeli',
          '**Mutabakat hesabı olarak işaretlenmeli (hesap tipi K veya D)**',
          'Hiçbir özel ayar gerekmez',
          'Açık kalem yönetimi kapatılmalı',
        ], dogru:1,
        aciklama:'"Yalnızca otomatik kayıt" işareti burada **yanlıştır** — özel G/L işlemleri ' +
                 'bu hesaplara satıcı/müşteri kalemi olarak yazar ve işaret konursa süreç çalışmaz. ' +
                 'Doğrusu hesabı **mutabakat hesabı** olarak işaretlemektir; ' +
                 'bu zaten doğrudan kaydı engeller ama özel G/L’ye izin verir.' },
    ],

    flashcards:[
      { on:'Özel ana muhasebe nedir?', arka:'Satıcı/müşteri işlemini **farklı bir mutabakat hesabında** izleme.\n\nMekanizma: tek karakterlik **özel G/L göstergesi** (BSEG-UMSKZ).\n\n**İş ortağı aynı kalır, G/L hesabı değişir** — ayırır ama koparmaz.' },
      { on:'Avans zinciri — dört adım', arka:'**1. Talep** F-47 (gösterge F, istatistiksel)\n**2. Ödeme** F-48 (gösterge A) → 159 borç\n**3. Fatura** FB60/MIRO (gösterge yok) → 320 alacak\n**4. MAHSUP** F-54 → 320 borç / 159 alacak\n\n4. adım en sık atlanan.' },
      { on:'F-54 atlanırsa ne olur?', arka:'**Hiçbir hata olmaz.** Fiş dengeli, mizan tutar.\n\nAma:\n• Bilanço **her iki tarafta şişer**\n• Kalan ödemede avans **ikinci kez ödenebilir** → gerçek nakit kaybı\n\nÖnlem: ay sonu FBL1N gösterge A kontrolü.' },
      { on:'Gerçek vs istatistiksel kalem', arka:'**Gerçek** — G/L kaydı üretir, bilançoyu etkiler (F-48, gösterge **A**)\n\n**İstatistiksel** — karşı kayıt yok, yalnızca izlenir (F-47, gösterge **F**)\n\nAma F110 istatistiksel kalemi de **ödeme önerisine alır**.' },
      { on:'Alternatif hesap nasıl belirlenir?', arka:'**T074** anahtarı — üç alan:\n\n1. Hesap tipi (**K** satıcı / **D** müşteri)\n2. Özel G/L göstergesi\n3. **Normal mutabakat hesabı** (320)\n\n→ Alternatif hesap (159)\n\n3. alan en sık atlanan detay.' },
      { on:'FBL1N’de avans neden görünmüyor?', arka:'**Özel G/L göstergesi filtresi boş bırakılmış.**\n\nBoşsa yalnızca **normal kalemler** listelenir.\n\nÇözüm: gösterge alanına **A** veya `*` gir.\n\n"Avans nerede kayboldu?" sorusunun en yaygın cevabı.' },
      { on:'Neden ayrı bir G/L kaydı yetmez?', arka:'**Üç şey kaybolur:**\n\n1. **İş ortağı bağlantısı** — FBL1N görmez\n2. **Otomatik mahsup** — F-54 bulamaz\n3. **Süreç entegrasyonu** — F110 görmez\n\nÖzel G/L bunları korurken yalnızca hesabı değiştirir.' },
      { on:'Müşteri avansı hangi hesapta?', arka:'**340 Alınan sipariş avansları** — bir **YÜKÜMLÜLÜK**.\n\nPara alındı, mal/hizmet verilmedi → borç.\n\nSatıcı tarafının aynası:\n159 = **varlık** (mal alma hakkı)\n340 = **kaynak** (mal verme borcu)' },
      { on:'Birden çok mutabakat hesabı sorunu', arka:'320100 yurtiçi · 320200 yurtdışı · 320300 grup\n\n**Her biri için ayrı T074 satırı gerekir.**\n\nYalnızca biri tanımlıysa: bazı satıcılara avans ödenir, bazılarına ödenemez — hata mesajı sebebi net söylemez.' },
      { on:'Alternatif hesap FS00 ayarı?', arka:'"Yalnızca otomatik kayıt" — **YANLIŞ**, özel G/L çalışmaz\n\n✓ **Mutabakat hesabı** olarak işaretle (SKB1-MITKZ = K veya D)\n\nBu zaten doğrudan kaydı engeller ama özel G/L’ye izin verir.' },
      { on:'Özel G/L kalem tipleri', arka:'**A** — avans (verilen 159 / alınan 340)\n**F** — avans talebi (istatistiksel)\n**W** — senet (121 / 321)\n**T** — teminat (126 / 326)\n\nHepsi tek karakter, hepsi UMSKZ alanında.' },
      { on:'Mahsup listesi boş geliyor — sebep?', arka:'**Avans düz G/L kaydıyla yapılmış**, özel G/L göstergesiyle değil.\n\nKalem satıcı numarası taşımadığı için F-54 bulamaz.\n\nDüzeltme: avans kaydını ters kaydet, **F-48 + gösterge A** ile yeniden gir.' },
    ],
  },

  },
});
