/* ==========================================================================
   content/fi/foreign-currency.js — "Foreign Currency Valuation"
   ========================================================================== */

SAP.registerTopic({
  id: 'foreign-currency',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Yabancı para değerlemesi, **dövizli kalemlerin ve bakiyelerin dönem sonunda güncel kurla ' +
      'yeniden ölçülmesidir**. Amaç: bilançoda gösterilen tutarın, o tarihteki gerçek değeri yansıtması.\n\n' +
      'Konunun üç ayrı kavramı vardır ve karıştırılmamalıdır:\n\n' +
      '**Çevrim (translation):** dövizli bir işlem kaydedilirken yerel paraya dönüştürülür. Kayıt anında olur.\n\n' +
      '**Değerleme (valuation):** dönem sonunda açık kalemler güncel kurla yeniden ölçülür. ' +
      'Fark **gerçekleşmemiştir** ve genelde ters kaydedilir.\n\n' +
      '**Gerçekleşme (realization):** kalem ödendiğinde/tahsil edildiğinde fark kesinleşir. ' +
      'Bu fark **kalıcıdır**.',

    neden:
      '**Gerçeği göstermek için.** 10.000 EUR’luk borç 35,00 kuruyla kaydedildi; bugün kur 38,80. ' +
      'Bilançoda 350.000 TL yazmak yanıltıcıdır — gerçek yükümlülük 388.000 TL’dir.\n\n' +
      '**Yasal zorunluluk.** Muhasebe standartları dövizli kalemlerin dönem sonu kuruyla ' +
      'değerlenmesini zorunlu kılar.\n\n' +
      '**Risk görünürlüğü.** Değerleme, kur riskinin büyüklüğünü ortaya çıkarır. ' +
      '"Kur %10 artarsa ne kadar zarar ederiz?" sorusunun cevabı buradan çıkar.',

    sirketOnemi:
      'İthalat/ihracat yapan veya döviz kredisi kullanan şirketlerde kur farkı, **kârın en büyük ' +
      'tek belirleyicisi** olabilir. Operasyonel olarak kârlı bir şirket, kur hareketi nedeniyle ' +
      'zarar açıklayabilir.\n\n' +
      'Danışmanlık açısından bu konu, kapanışın en çok hata alınan adımıdır. ' +
      'Sebep: yapılandırma çok katmanlıdır ({{OB08}} kurlar, {{OB59}} değerleme yöntemi, ' +
      '{{OBA1}} hesap belirleme) ve herhangi bir katmandaki eksik, koşuyu durdurur.\n\n' +
      'Ayırt edici soru şudur: **"Gerçekleşmiş ve gerçekleşmemiş kur farkı arasındaki fark nedir, ' +
      'muhasebede nasıl ele alınır?"**',

    gercekHayat:
      'Bir ithalatçı Ocak’ta 100.000 EUR’luk mal alıyor. Kur 35,00 → borç 3.500.000 TL kaydediliyor.\n\n' +
      '**31 Ocak:** kur 38,80. Borç hâlâ ödenmedi. Değerleme yapılır: 388.000 TL ek yükümlülük görünür ve ' +
      '380.000 TL kambiyo zararı yazılır. Ama bu fark **gerçekleşmemiştir** — kur geri düşebilir. ' +
      'Bu yüzden 1 Şubat’ta ters kaydedilir.\n\n' +
      '**15 Şubat:** borç ödenir, kur 37,20. Gerçek fark: (37,20 − 35,00) × 100.000 = **220.000 TL zarar**. ' +
      'Bu **gerçekleşmiştir** ve kalıcıdır.\n\n' +
      'Ocak bilançosunda 380.000 TL zarar göründü, gerçekleşen 220.000 TL oldu. ' +
      'Değerleme bir tahmindir; gerçek rakam ödeme anında belli olur.',

    muhasebeMantigi:
      'Kur farkının muhasebe mantığı **iki soruya** dayanır:\n\n' +
      '**1. Kalem kapandı mı?** Kapanmadıysa fark gerçekleşmemiştir → ters kaydedilir. ' +
      'Kapandıysa gerçekleşmiştir → kalıcıdır.\n\n' +
      '**2. Döviz tutarı değişti mi?** **Hayır.** 10.000 EUR borç, 10.000 EUR olarak kalır. ' +
      'Değişen yalnızca **yerel para karşılığıdır**. Bu yüzden değerleme kaydı döviz tarafında ' +
      'sıfırdır; yalnızca yerel para satırı hareket eder.\n\n' +
      'Kritik ayrım: değerleme **açık kalemin kendisini değiştirmez**. Orijinal kalem 3.500.000 TL ' +
      'olarak durmaya devam eder; fark ayrı bir düzeltme kaydında tutulur ve sonraki dönem geri alınır.',

    kavramlar: ['kur-farki', 'degerleme', 'kur-tipi', 'paralel-para-birimi', 'donem-sonu',
                'acik-kalem', 'tahakkuk', 'kapatma'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Kur yönetimi üç ayrı süreçten oluşur: **kurların beslenmesi** (günlük), ' +
      '**işlem anında çevrim** (sürekli) ve **dönem sonu değerleme** (aylık). ' +
      'İlki genelde otomatiktir ve kopukluğu sessizce fark edilmez.',

    roller:[
      { rol:'BT / entegrasyon', gorev:'Kurları merkez bankası veya veri sağlayıcıdan çekip {{TCURR}}’a besler (genelde günlük otomatik iş).' },
      { rol:'Hazine', gorev:'Kur riskini izler, gerekirse korunma (hedging) işlemleri yapar, beslemeyi doğrular.' },
      { rol:'Muhasebe uzmanı', gorev:'Dövizli faturaları kaydeder; kur otomatik gelir ama gerektiğinde elle girilebilir.' },
      { rol:'Ana muhasebe uzmanı', gorev:'Dönem sonunda {{F.05}} / {{FAGL_FC_VAL}} çalıştırır, sonucu kontrol eder.' },
      { rol:'Muhasebe müdürü', gorev:'Değerleme sonucunu onaylar; kur farkının kâra etkisini yönetime raporlar.' },
      { rol:'FI danışmanı', gorev:'{{OB59}} değerleme yöntemleri, {{OBA1}} hesap belirleme ve {{paralel-para-birimi}} yapısını kurar.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Kur yönetimi — beslemeden gerçekleşmeye',
      adimlar:[
        { ic:'📡', rol:'BT / Hazine', baslik:'Kurlar beslenir',
          aciklama:'Merkez bankası veya veri sağlayıcıdan günlük kurlar {{TCURR}} tablosuna yazılır ' +
                   '({{OB08}}). Genelde otomatik iş olarak planlanır.',
          cikti:'Güncel {{TCURR}} kayıtları', ok:'işlem yapılır' },
        { ic:'🧾', rol:'Muhasebe', baslik:'Dövizli işlem kaydedilir (çevrim)',
          aciklama:'Belge para birimi EUR girilir; sistem {{TCURR}}’dan kuru bulup **yerel para karşılığını** ' +
                   'hesaplar. Her iki tutar da {{BSEG}}’de saklanır.',
          cikti:'FI belgesi — döviz + yerel tutar', ok:'dönem sonu gelir' },
        { ic:'📅', rol:'Ana muhasebe', baslik:'Dönem sonu değerlemesi çalıştırılır',
          aciklama:'{{F.05}} / {{FAGL_FC_VAL}} — açık kalemler ve bakiyeler dönem sonu kuruyla yeniden ölçülür. ' +
                   'Fark **gerçekleşmemiştir**.',
          cikti:'Değerleme belgesi', ok:'sonraki dönem' },
        { ic:'↩', rol:'Sistem', baslik:'Değerleme ters kaydedilir',
          aciklama:'Genelde sonraki dönemin ilk günü. Fark henüz gerçekleşmediği için geçici bir kayıttır.',
          cikti:'Ters kayıt', ok:'kalem kapanır' },
        { ic:'💸', rol:'AP / AR', baslik:'Ödeme veya tahsilat yapılır',
          aciklama:'{{F110}} veya {{F-28}} ile kalem kapatılır. Kapatma anındaki kur ile kayıt kuru ' +
                   'arasındaki fark **gerçekleşir**.',
          cikti:'Gerçekleşmiş kur farkı', ok:'kalıcı kayıt' },
        { ic:'📊', rol:'Muhasebe müdürü', baslik:'Kur etkisi raporlanır',
          aciklama:'Dönemin toplam kur farkı (gerçekleşmiş + gerçekleşmemiş) kâra etkisiyle birlikte sunulur.',
          cikti:'Kur riski raporu' },
      ],
    },

    adimlar:[
      { rol:'BT', eylem:'Kurları besler', sistem:'{{OB08}} → {{TCURR}} — genelde otomatik' },
      { rol:'Muhasebe', eylem:'Dövizli belge kaydeder', sistem:'{{FB60}}, {{FB70}}, {{MIRO}} — kur otomatik' },
      { rol:'Ana muhasebe', eylem:'Dönem sonu değerlemesi yapar', sistem:'{{F.05}} / {{FAGL_FC_VAL}}' },
      { rol:'Sistem', eylem:'Değerlemeyi ters kaydeder', sistem:'Otomatik — ters kayıt tarihinde' },
      { rol:'AP / AR', eylem:'Kalemi kapatır', sistem:'{{F110}}, {{F-28}} → gerçekleşmiş fark' },
      { rol:'Muhasebe müdürü', eylem:'Kur etkisini raporlar', sistem:'{{FBL3N}} — kur farkı hesapları' },
    ],

    veriAkisi:{
      nereden:'{{TCURR}} kur tablosu; dövizli açık kalemler ({{BSIK}}, {{BSID}}, {{BSIS}}); ' +
              '{{OB59}} değerleme yöntemi; {{OBA1}} hesap belirleme.',
      nereye:'Kur farkı hesaplarına (646/656) ve düzeltilen bilanço kalemlerine; ' +
             'sonraki dönemde ters kayıtla geri alınır.',
      tetikleyen:'Dönem sonu takvimi; ayrıca her ödeme/tahsilat gerçekleşmiş fark üretir.',
      sonraki:'Mali tablolar, kur riski raporlaması, vergi hesaplaması.',
    },

    notlar:[
      { tip:'warn', baslik:'Kur beslemesi sessiz bir arıza noktasıdır', metin:
        'Kurlar genelde otomatik beslenir ve kimse günlük kontrol etmez. Besleme koparsa ' +
        '**hiçbir hata mesajı çıkmaz** — sadece o günün kuru {{TCURR}}’da olmaz.\n\n' +
        'Sorun kapanışta patlar: {{F.05}} "Exchange rate not found" hatası verir ve ' +
        'kapanış durur. Kontrol listesine **"kurlar güncel mi?"** maddesi eklenmelidir.\n\n' +
        'Daha sinsi bir durum: dövizli fatura girilirken kur bulunamazsa sistem son mevcut kuru ' +
        'kullanabilir — **yanlış kurla kayıt** oluşur ve fark edilmez.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Kur farkının muhasebesini anlamanın anahtarı şu: **döviz tutarı hiç değişmez, ' +
      'yalnızca yerel para karşılığı değişir.** Aşağıdaki örneklerde bunu takip et.',

    etkilenenHesaplar:[
      { hesap:'320 Satıcılar / 120 Alıcılar', tur:'Bilanço', neden:'Dövizli borç/alacak. Döviz tutarı sabit kalır; **yerel para karşılığı** değerlemeyle değişir.' },
      { hesap:'656 Kambiyo zararı', tur:'Gelir tablosu — Gider', neden:'Kur aleyhte hareket ettiğinde. Hem gerçekleşmiş hem gerçekleşmemiş fark buraya yazılabilir (ayrı hesaplar da kullanılabilir).' },
      { hesap:'646 Kambiyo kârı', tur:'Gelir tablosu — Gelir', neden:'Kur lehte hareket ettiğinde.' },
      { hesap:'Değerleme düzeltme hesabı', tur:'Bilanço', neden:'Bazı kurulumlar değerleme farkını mutabakat hesabına değil ayrı bir düzeltme hesabına yazar — mutabakat hesabının muavin defterle uyumunu korumak için.' },
      { hesap:'102 Bankalar (dövizli)', tur:'Bilanço — Varlık', neden:'Dövizli banka hesapları da değerlenir; bakiye değerlemesi ({{F.05}} bakiye seçeneği).' },
      { hesap:'646.01 / 656.01 Gerçekleşmemiş kur farkı', tur:'Gelir tablosu', neden:'Değerlemeden doğan, **ters kaydedilecek** fark. Ayrı alt hesapta izlenmesi önerilir — vergi matrahına farklı girer.' },
      { hesap:'646.02 / 656.02 Gerçekleşmiş kur farkı', tur:'Gelir tablosu', neden:'Ödeme/tahsilat anında **kesinleşen** fark. Kalıcıdır, ters kaydedilmez.' },
      { hesap:'391 Hesaplanan KDV', tur:'Bilanço — Kaynak', neden:'**{{kur-farki-faturasi}}** düzenlendiğinde. Muhasebe kaydından ayrı bir yükümlülüktür ve SAP bunu otomatik üretmez.' },
      { hesap:'159 / 340 Avanslar', tur:'Bilanço', neden:'**Parasal olmayan** kalemlerdir → {{parasal-kalem}} olmadıkları için **değerlenmez**. Değerleme listesine dâhil edilmemelidir.' },
      { hesap:'258 Yapılmakta olan yatırımlar', tur:'Bilanço — Varlık', neden:'Yatırım dönemindeki kur farkları **maliyete eklenebilir** (aşağıdaki teknik bloğa bakın).' },
    ],

    fisler:[
      { baslik:'Adım 1 — Dövizli fatura kaydedilir (çevrim) · 100.000 EUR @ 35,00',
        belgeTuru:'KR', tarih:'15.01.2027', paraBirimi:'EUR',
        satirlar:[
          { hesap:'153', ad:'Ticari mallar', borc:3500000, not:'100.000 EUR × 35,00' },
          { hesap:'320', ad:'Satıcılar — V-9001', alacak:3500000, not:'Döviz: 100.000 EUR' },
        ],
        not:'{{BSEG}}’de **iki tutar** saklanır: `WRBTR` = 100.000 (belge para birimi EUR) ve ' +
             '`DMBTR` = 3.500.000 (yerel para TRY). Kur {{TCURR}}’dan otomatik geldi.\n\n' +
             'Bu bir **çevrimdir**, değerleme değil. Kayıt anında bir kez yapılır.' },

      { baslik:'Adım 2 — Dönem sonu değerlemesi ({{F.05}}) · 31.01 kuru 38,80',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'656', ad:'Kambiyo zararı (gerçekleşmemiş)', borc:380000, not:'(38,80 − 35,00) × 100.000' },
          { hesap:'320', ad:'Satıcılar — değerleme düzeltmesi', alacak:380000, not:'Yerel para yükümlülüğü arttı' },
        ],
        not:'**Döviz tarafında hiçbir şey değişmedi** — borç hâlâ 100.000 EUR. ' +
             'Değişen yalnızca yerel para karşılığı: 3.500.000 → 3.880.000 TL.\n\n' +
             'Orijinal kalem **değişmedi**; fark ayrı bir düzeltme kaydında tutuluyor. ' +
             'Bu yüzden {{BSIK}}’teki açık kalem hâlâ 3.500.000 TL gösterir.' },

      { baslik:'Adım 3 — Değerleme ters kaydedilir · 01.02.2027',
        belgeTuru:'SA', tarih:'01.02.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — değerleme düzeltmesi', borc:380000, not:'Düzeltme geri alındı' },
          { hesap:'656', ad:'Kambiyo zararı (gerçekleşmemiş)', alacak:380000 },
        ],
        not:'Fark **gerçekleşmemişti** — kur geri düşebilirdi. Bu yüzden değerleme geçicidir ve ' +
             'sonraki dönemin ilk günü otomatik geri alınır. Şubat tekrar sıfırdan değerlenecek.' },

      { baslik:'Adım 4 — Ödeme yapılır ({{F110}}) · 15.02 kuru 37,20 · GERÇEKLEŞME',
        belgeTuru:'KZ', tarih:'15.02.2027', paraBirimi:'EUR',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — V-9001 (kapatıldı)', borc:3500000, not:'Kayıt kurundan: 100.000 × 35,00' },
          { hesap:'102', ad:'Bankalar (100.000 EUR @ 37,20)', alacak:3720000, not:'Ödeme günü kurundan' },
          { hesap:'656', ad:'Kambiyo zararı (gerçekleşmiş)', borc:220000, not:'(37,20 − 35,00) × 100.000' },
        ],
        not:'**Döviz tarafı denk:** 100.000 EUR borç, 100.000 EUR ödeme. ' +
             'Fark yalnızca yerel paradadır ve **gerçekleşmiştir** — kalem kapandı, kur kesinleşti. ' +
             'Bu kayıt **ters kaydedilmez**.\n\n' +
             'Ocak’ta 380.000 TL zarar tahmin edilmişti; gerçekleşen 220.000 TL oldu. ' +
             'Aradaki 160.000 TL fark, Ocak ters kaydı sayesinde otomatik düzeldi.' },

      { baslik:'**{{kur-farki-faturasi}}** — tahsilatta lehte fark · Türkiye’ye özgü',
        belgeTuru:'DR', tarih:'15.02.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar — kur farkı faturası', borc:264000, not:'220.000 + KDV' },
          { hesap:'601', ad:'Yurtdışı satışlar — kur farkı', alacak:220000, not:'Lehte oluşan fark' },
          { hesap:'391', ad:'Hesaplanan KDV (%20)', alacak:44000, not:'**Asıl işlemin oranıyla**' },
        ],
        not:'**Bu, muhasebe kaydından ayrı bir belge yükümlülüğüdür.**\n\n' +
             'Dövizli satışta tahsilat günü kur yükseldiyse satıcı daha fazla TL almıştır. ' +
             'Bu ek tutar **bedelin parçasıdır** ve KDV’ye tabidir.\n\n' +
             'Kim düzenler: **lehine fark oluşan taraf**. Kur yükseldi → satıcı; ' +
             'kur düştü → alıcı düzenler.\n\n' +
             '**SAP kur farkını otomatik kaydeder ama kur farkı faturasını üretmez.** ' +
             'Ayrı takip edilmesi gereken bir süreçtir; atlanırsa KDV incelemesinde ' +
             'eleştiri konusu olur.\n\n' +
             '*Uygulama esasları KDV Genel Uygulama Tebliği ile belirlenir; ' +
             'güncel düzenleme mali müşavire teyit ettirilmelidir.*' },

      { baslik:'**Yanlış** — verilen avansın değerlenmesi',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'Verilen sipariş avansları (dövizli)', borc:190000, not:'**Yapılmamalı**' },
          { hesap:'646', ad:'Kambiyo kârı', alacak:190000, not:'Gerçekte var olmayan kâr' },
        ],
        not:'**Bu kayıt yanlıştır.** Verilen avans bir {{parasal-kalem}} **değildir**: ' +
             'karşılığında para değil **mal** alınacaktır.\n\n' +
             'Satıcıya 50.000 EUR avans verdiysen, kur ne olursa olsun sana ' +
             '50.000 EUR’luk **mal** gelecek — geri para gelmeyecek. ' +
             'Dolayısıyla kur riski **yoktur** ve kur farkı doğmaz.\n\n' +
             'Avans, **verildiği günün kuruyla** kayda alınır ve o değerde kalır.\n\n' +
             '**SAP’ta önlem:** avans hesapları ({{F.05}} seçim ekranında ve {{OBA1}}’de) ' +
             'değerleme listesine **dâhil edilmemelidir**. ' +
             'Dâhil edilirse her dönem sahte kur farkı üretilir.' },

      { baslik:'Yatırım dönemi kur farkı — **maliyete eklenir**',
        belgeTuru:'SA', tarih:'30.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'258', ad:'Yapılmakta olan yatırımlar', borc:340000, not:'Gidere değil **maliyete**' },
          { hesap:'320', ad:'Satıcılar (dövizli makine borcu)', alacak:340000 },
        ],
        not:'Yurtdışından alınan makinenin borcu henüz ödenmedi ve kur yükseldi.\n\n' +
             'VUK uygulamasında, **yatırımın aktifleştirildiği dönemin sonuna kadar** oluşan ' +
             'kur farkları varlığın **maliyetine eklenir**; sonraki dönemlerde oluşanların ' +
             'maliyete eklenmesi ise **ihtiyaridir**.\n\n' +
             'Sonucu: 340.000 TL gider yazılmaz, **amortisman yoluyla** yıllara yayılır.\n\n' +
             '**SAP bunu otomatik yapmaz.** {{F.05}} farkı 656 hesabına yazar; ' +
             'yatırım dönemine ait olanların 258’e aktarılması **elle** yapılır. ' +
             'Dönem sonu kontrol listesine konmalıdır.' },

      { baslik:'Alternatif — dövizli banka hesabı bakiye değerlemesi',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bankalar — EUR hesabı (değerleme)', borc:190000, not:'50.000 EUR × (38,80 − 35,00)' },
          { hesap:'646', ad:'Kambiyo kârı (gerçekleşmemiş)', alacak:190000, not:'Varlık olduğu için kur artışı **kâr**' },
        ],
        not:'Dikkat: aynı kur hareketi **borçta zarar, varlıkta kâr** yaratır. ' +
             'Dövizli borcun yerel karşılığı artarsa zarar; dövizli varlığın yerel karşılığı artarsa kâr.\n\n' +
             'Bu yüzden şirketin net döviz pozisyonu (varlık − borç) kur riskini belirler.' },
    ],

    tHesaplar:[
      { hesap:'Satıcılar (dövizli)', kod:'320',
        borc:[{ ad:'Ödeme (kapatma)', tutar:3500000 }, { ad:'Değerleme ters kaydı', tutar:380000 }],
        alacak:[{ ad:'Fatura', tutar:3500000 }, { ad:'Değerleme düzeltmesi', tutar:380000 }],
        not:'Değerleme geçici; ters kayıtla sıfırlanır' },
      { hesap:'Kambiyo zararı', kod:'656 (gider)',
        borc:[{ ad:'Ocak değerlemesi', tutar:380000 }, { ad:'Gerçekleşen fark', tutar:220000 }],
        alacak:[{ ad:'Ocak ters kaydı', tutar:380000 }],
        not:'Net kalıcı etki: 220.000 TL' },
      { hesap:'Kambiyo kârı', kod:'646 (gelir)',
        borc:[{ ad:'Ters kayıt', tutar:190000 }],
        alacak:[{ ad:'Banka bakiye değerlemesi', tutar:190000 }],
        not:'Gerçekleşmemiş — ters kaydedildi' },
    ],

    notlar:[
      { tip:'tip', baslik:'Neden değerleme ters kaydedilir?', metin:
        'Değerleme bir **tahmindir**: "bugünkü kurla ölçersek durum bu". Ama kalem kapanmadığı için ' +
        'bu fark gerçekleşmemiştir; kur ertesi gün geri dönebilir.\n\n' +
        'Ters kaydedilmezse iki sorun çıkar: **(1)** her ay üst üste değerleme yapılır ve fark ' +
        'mükerrer birikir, **(2)** kalem ödendiğinde gerçek fark hesaplanırken değerleme kaydı ' +
        'ortada durur ve çift sayım olur.\n\n' +
        'Bazı değerleme yöntemleri ters kayıt yapmadan **fark bazlı** çalışır (yalnızca değişimi kaydeder). ' +
        'Bu da geçerli bir yaklaşımdır ve {{OB59}}’da seçilir.' },
      { tip:'warn', baslik:'Düşük değerle değerleme ilkesi', metin:
        'Bazı mevzuatlar **ihtiyatlılık** gerektirir: gerçekleşmemiş **zarar** kaydedilir ama ' +
        'gerçekleşmemiş **kâr** kaydedilmez.\n\n' +
        'Yani dövizli borcun yerel karşılığı artmışsa zarar yazılır; azalmışsa kâr yazılmaz. ' +
        '{{OB59}}’da değerleme ilkesi olarak "düşük değerle değerleme" (lowest value principle) seçilir.\n\n' +
        'IFRS ise genelde **her zaman değerle** ilkesini kullanır — hem kâr hem zarar kaydedilir. ' +
        'Bu yüzden aynı şirket, farklı defterlerde farklı değerleme yöntemi kullanabilir.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Kur konusunda çeşitlenme dört eksende olur: **kur tipi**, **değerleme kapsamı**, ' +
      '**değerleme ilkesi** ve **farkın durumu**.',

    liste:[
      { ad:'Ortalama kur (M)', en:'Average Rate',
        aciklama:'Standart {{kur-tipi}}. Günlük işlemlerin çevriminde ve çoğu değerlemede kullanılır.',
        neZaman:'Varsayılan. Fatura kaydı, değerleme ve raporlamada.',
        ornek:'{{TCURR}}’da `KURST` = M satırları.' },

      { ad:'Alış / satış kuru (B / G)', en:'Bank Buying / Selling Rate',
        aciklama:'Bankanın alış (B) ve satış (G) kurları. Gerçek nakit işlemlerinde daha doğru sonuç verir.',
        neZaman:'Döviz alım-satımı, banka işlemleri; bazı mevzuatlar belirli kalemler için zorunlu kılar.',
        ornek:'Dövizli tahsilatta alış kuru, dövizli ödemede satış kuru kullanılabilir.' },

      { ad:'Açık kalem değerlemesi', en:'Open Item Valuation',
        aciklama:'Satıcı ve müşteri açık kalemleri tek tek değerlenir. Her kalemin kendi kayıt kuru ' +
                 'ile dönem sonu kuru karşılaştırılır.',
        neZaman:'Dövizli AP ve AR kalemleri için — en yaygın kullanım.',
        ornek:'{{F.05}}’te "satıcı açık kalemleri" ve "müşteri açık kalemleri" seçenekleri.',
        tcodes:['F.05','FAGL_FC_VAL'] },

      { ad:'Bakiye değerlemesi', en:'Balance Valuation',
        aciklama:'Dövizli G/L hesaplarının **bakiyesi** değerlenir; kalem bazında değil.',
        neZaman:'Dövizli banka hesapları, dövizli kasa. Bu hesaplarda açık kalem yönetimi yoktur.',
        ornek:'EUR banka hesabının 50.000 EUR bakiyesi dönem sonu kuruyla değerlenir.',
        tcodes:['F.05'] },

      { ad:'Düşük değerle değerleme', en:'Lowest Value Principle',
        aciklama:'İhtiyatlılık ilkesi: gerçekleşmemiş **zarar** kaydedilir, gerçekleşmemiş **kâr** kaydedilmez.',
        neZaman:'Yerel mevzuatın ihtiyatlılık gerektirdiği durumlarda (Türkiye dâhil birçok ülkede ticari muhasebe).',
        ornek:'{{OB59}}’da değerleme ilkesi olarak seçilir.',
        tcodes:['OB59'] },

      { ad:'Her zaman değerle', en:'Always Valuate',
        aciklama:'Hem kâr hem zarar kaydedilir. Simetrik ve daha "gerçekçi" bir yaklaşım.',
        neZaman:'IFRS ve grup raporlamasında yaygın.',
        ornek:'{{paralel-defter}} kullanılıyorsa IFRS defterinde bu ilke, yerel defterde düşük değerle ilkesi.',
        tcodes:['OB59'] },

      { ad:'Gerçekleşmemiş kur farkı', en:'Unrealized Exchange Difference',
        aciklama:'Kalem henüz kapanmadı; fark yalnızca değerleme sonucu. **Ters kaydedilir.**',
        neZaman:'Dönem sonu değerlemesinde.',
        ornek:'31 Ocak’ta 380.000 TL zarar → 1 Şubat’ta geri alınır.' },

      { ad:'Gerçekleşmiş kur farkı', en:'Realized Exchange Difference',
        aciklama:'Kalem ödendi/tahsil edildi; fark kesinleşti. **Kalıcıdır.**',
        neZaman:'Ödeme, tahsilat ve kapatma anında.',
        ornek:'15 Şubat’ta ödeme → 220.000 TL zarar, kalıcı.',
        tcodes:['F110','F-28','OBA1'] },
    ],

    karsilastirmaBasliklar:['Gerçekleşmemiş (Unrealized)', 'Gerçekleşmiş (Realized)'],
    karsilastirma:[
      ['Ne zaman oluşur', 'Dönem sonu **değerlemesinde**', 'Kalem **kapandığında** (ödeme/tahsilat)'],
      ['Kalem durumu', 'Hâlâ açık', 'Kapalı'],
      ['Kalıcı mı', '**Hayır** — ters kaydedilir', '**Evet** — kalıcıdır'],
      ['Hesap anahtarı', 'KDF', 'KDB'],
      ['Vergi etkisi', 'Genelde vergiye tabi değil (mevzuata bağlı)', 'Vergiye tabi'],
      ['İşlem', '{{F.05}} / {{FAGL_FC_VAL}}', '{{F110}}, {{F-28}}, kapatma işlemleri'],
      ['Amaç', 'Bilançoyu gerçeğe yaklaştırmak', 'Gerçek sonucu kaydetmek'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'OB08', ad:'Döviz kurlarını gir',
        amac:'{{kur-tipi}} + para birimi çifti + tarih bazında kurları {{TCURR}} tablosuna yazar.',
        neZaman:'Otomatik besleme koptuğunda; kapanış öncesi eksik kur tespit edildiğinde.',
        adimlar:[
          { baslik:'Kur tipini seç', aciklama:'**M** ortalama (standart), **B** alış, **G** satış.' },
          { baslik:'Geçerlilik tarihini gir',
            aciklama:'Kur o tarihten itibaren geçerlidir. Sistem, işlem tarihinden **önceki en yakın** kuru kullanır.' },
          { baslik:'Para birimi çiftini ve kuru gir',
            aciklama:'Örn. EUR → TRY, kur 38,80. Kotasyon yönüne dikkat: bazı çiftlerde çarpan/bölen ayarı gerekir.' },
        ],
        alanlar:{
          zorunlu:['Kur tipi','Geçerlilik tarihi','Kaynak para birimi','Hedef para birimi','Kur'],
          opsiyonel:['Çarpan/bölen oranı'] },
        hatalar:[
          { mesaj:'Exchange rate ... is not maintained', sebep:'O tarih ve kur tipi için kur yok.', cozum:'Kuru gir. Otomatik besleme varsa neden kopmuş olduğunu araştır.' },
          { mesaj:'Ratio for currency conversion is missing', sebep:'Para birimi çifti için çarpan/bölen tanımı yok (TCURF).', cozum:'IMG → kur çevrim oranlarını tanımla. Yüksek enflasyonlu para birimlerinde gereklidir.' },
        ],
        ipucu:'Sistem, işlem tarihine **eşit veya ondan önceki en yakın** kuru kullanır. ' +
              'Yani 31 Ocak kuru girilmemişse 28 Ocak kuru kullanılır ve **hata vermez**. ' +
              'Bu, yanlış kurla kayıt yapılmasının sessiz sebebidir — besleme düzenli kontrol edilmelidir.',
        ilgili:['TCURR','TCURV','F.05','OB59'] },

      { kod:'F.05', ad:'Yabancı para değerlemesi',
        amac:'Dövizli açık kalemleri ve bakiyeleri dönem sonu kuruyla yeniden ölçer; fark kaydı üretir.',
        neZaman:'Her ay sonu kapanışında, tüm dövizli işlemler kaydedildikten **sonra**.',
        adimlar:[
          { baslik:'Şirket kodu ve değerleme anahtar tarihini gir',
            aciklama:'Genelde ayın son günü. Bu tarihteki kur kullanılır.' },
          { baslik:'**Değerleme yöntemini** seç',
            aciklama:'{{OB59}}’da tanımlı: hangi {{kur-tipi}}, hangi ilke (düşük değerle / her zaman), ' +
                     'ters kaydedilecek mi. Yöntem seçimi sonucu tamamen belirler.' },
          { baslik:'Değerlenecek kalem tiplerini işaretle',
            aciklama:'**G/L bakiyeleri** (dövizli banka/kasa), **satıcı açık kalemleri**, ' +
                     '**müşteri açık kalemleri** — ayrı ayrı seçilir.' },
          { baslik:'Ters kayıt tarihini gir', aciklama:'Genelde sonraki dönemin ilk günü.' },
          { baslik:'**Önce test modunda çalıştır**',
            aciklama:'Değerleme çok sayıda belge üretir; sonucu görmeden gerçek modda çalıştırma.' },
          { baslik:'Sonucu incele ve gerçek modda çalıştır',
            aciklama:'Toplam kur farkını bir önceki ayla karşılaştır; büyük sapma varsa kuru kontrol et.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Şirket kodu 1000 · Anahtar tarih 31.01.2027 · Değerleme yöntemi Z001' },
          { ekran:'Seçim', islem:'Satıcı açık kalemleri ✓ · Müşteri açık kalemleri ✓ · G/L bakiyeleri ✓' },
          { ekran:'Kayıt parametreleri', islem:'Ters kayıt tarihi 01.02.2027 · **Test modu ✓**' },
          { ekran:'Sonuç', islem:'218 kalem değerlendi · net zarar 142.000 TL' },
        ],
        alanlar:{
          zorunlu:['Şirket kodu','Değerleme anahtar tarihi','Değerleme yöntemi','Kalem tipi seçimi'],
          opsiyonel:['Ters kayıt tarihi','Test modu','Hesap/iş ortağı aralığı','Belge türü'] },
        hatalar:[
          { mesaj:'Exchange rate for EUR/TRY on 31.01.2027 not found', sebep:'{{TCURR}}’da o tarihe ait kur yok.', cozum:'{{OB08}} ile kuru gir; otomatik beslemenin neden koptuğunu araştır.' },
          { mesaj:'Account determination for KDF not possible', sebep:'{{OBA1}}’de gerçekleşmemiş kur farkı hesabı tanımsız.', cozum:'{{OBA1}} → KDF hesap anahtarı → ilgili mutabakat hesabı için kâr/zarar hesaplarını tanımla.' },
          { mesaj:'Valuation method ... does not exist', sebep:'{{OB59}}’da yöntem tanımlı değil.', cozum:'Değerleme yöntemini tanımla: kur tipi, ilke, ters kayıt ayarı.' },
          { mesaj:'Posting period is not open', sebep:'Değerleme veya ters kayıt tarihinin dönemi kapalı.', cozum:'{{OB52}} ile aç. Ters kayıt tarihi sonraki dönemdeyse o dönemin de açık olması gerekmez — kayıt yine yapılır.' },
        ],
        ipucu:'{{F.05}} **tüm dövizli işlemler kaydedildikten sonra** çalıştırılmalıdır. ' +
              'Sonradan gelen bir dövizli fatura değerlenmemiş kalır ve kapanış tekrarlanır. ' +
              'Kontrol listesinde faturalardan **sonra**, mali tablolardan **önce** konumlandır.',
        ilgili:['FAGL_FC_VAL','OB59','OBA1','OB08'] },

      { kod:'OB59', ad:'Değerleme yöntemi tanımla',
        amac:'Değerlemenin nasıl yapılacağını belirler: kur tipi, ilke, ters kayıt davranışı.',
        neZaman:'Kurulumda; farklı defterler veya mevzuatlar için farklı yöntem gerektiğinde.',
        adimlar:[
          { baslik:'Yöntem anahtarı ve açıklama gir' },
          { baslik:'**Değerleme ilkesini** seç',
            aciklama:'**Düşük değerle değerleme** (yalnız zarar kaydedilir — ihtiyatlılık), ' +
                     '**yalnız yükselt**, veya **her zaman değerle** (kâr ve zarar — IFRS).' },
          { baslik:'{{kur-tipi}} belirle', aciklama:'Genelde M (ortalama). Alış/satış kuru gerekiyorsa B/G.' },
          { baslik:'Ters kayıt davranışını seç',
            aciklama:'Değerleme kaydı sonraki dönem ters kaydedilecek mi, yoksa **fark bazlı** mı çalışacak.' },
        ],
        ipucu:'{{paralel-defter}} kullanılıyorsa **her defter için ayrı yöntem** tanımlanır: ' +
              'yerel defterde "düşük değerle değerleme" (ihtiyatlılık), IFRS defterinde "her zaman değerle". ' +
              'Aynı kalem iki defterde farklı kur farkı üretir — bu doğrudur, hata değildir.',
        hatalar:[
          { mesaj:'Valuation procedure not consistent', sebep:'İlke ile ters kayıt ayarı uyumsuz.', cozum:'Düşük değerle değerleme genelde ters kayıt gerektirir; ayarları gözden geçir.' },
        ],
        ilgili:['F.05','OBA1','FAGL_FC_VAL'] },

      { kod:'OBA1', ad:'Kur farkı hesap belirleme',
        amac:'Gerçekleşen ve gerçekleşmeyen kur farklarının hangi G/L hesaplarına yazılacağını tanımlar.',
        neZaman:'Kurulumda ve "Account determination for KDF not possible" hatasında.',
        adimlar:[
          { baslik:'Hesap anahtarını seç',
            aciklama:'**KDF** — gerçekleşmemiş kur farkı (değerleme). ' +
                     '**KDB** — gerçekleşmiş kur farkı (kapatma anında). ' +
                     '**KDW** — değerleme düzeltme hesabı (bazı kurulumlarda).' },
          { baslik:'Şirket kodu ve mutabakat hesabını gir',
            aciklama:'Her mutabakat hesabı için ayrı tanım yapılabilir: 320 satıcılar için farklı, ' +
                     '120 müşteriler için farklı kur farkı hesabı.' },
          { baslik:'Kâr ve zarar hesaplarını ayrı gir',
            aciklama:'Kur lehte hareket ederse kâr hesabı (646), aleyhte ise zarar hesabı (656).' },
          { baslik:'Gerekirse bilanço düzeltme hesabını gir',
            aciklama:'Değerleme farkı mutabakat hesabına yazılmak istenmiyorsa ayrı bir düzeltme hesabı kullanılır.' },
        ],
        ipucu:'Değerleme farkını **mutabakat hesabına yazmamak** yaygın bir tercihtir: ' +
              'yazılırsa 320 hesabının bakiyesi ile {{FBL1N}} muavin defter toplamı **uyuşmaz** ' +
              've mutabakat kontrolü bozulur. Ayrı bir düzeltme hesabı bu sorunu çözer.',
        hatalar:[
          { mesaj:'Account determination for entry ... KDF not possible', sebep:'İlgili mutabakat hesabı için tanım yok.', cozum:'{{OBA1}} → KDF → o mutabakat hesabı için kâr/zarar hesaplarını gir.' },
        ],
        ilgili:['F.05','OB59','FAGL_FC_VAL'] },

      { kod:'FAGL_FC_VAL', ad:'Yabancı para değerlemesi (yeni ana muhasebe)',
        amac:'{{F.05}}’in defter bazlı sürümü. {{paralel-defter}} kullanılan sistemlerde bu kullanılır.',
        neZaman:'New G/L veya S/4HANA’da; birden çok defter varsa.',
        adimlar:[
          { baslik:'Şirket kodu, anahtar tarih ve **defter** seç',
            aciklama:'Her defter kendi değerleme yöntemini kullanabilir: yerel defter ihtiyatlı, IFRS defteri simetrik.' },
          { baslik:'Değerleme alanını ve yöntemini gir' },
          { baslik:'Test modunda çalıştır, sonra gerçek' },
        ],
        ipucu:'Paralel defter varsa değerleme **her defter için ayrı çalıştırılmalıdır**. ' +
              'Yalnızca lider defteri değerlemek, IFRS bilançosunu eksik bırakır.',
        ilgili:['F.05','OB59','paralel-defter'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Kur konusunun kendi tabloları ikidir: {{TCURR}} (kurlar) ve {{TCURV}} (kur tipleri). ' +
      'Değerleme kayıtları normal FI tablolarına gider; dövizli tutarlar ise {{BSEG}}’de ' +
      '**paralel alanlarda** saklanır.',

    liste:[
      { ad:'TCURR', baslik:'Döviz kur tablosu',
        tutar:'{{kur-tipi}} + kaynak para birimi + hedef para birimi + tarih bazında kurlar.',
        olusturan:'{{OB08}} veya otomatik besleme programı',
        guncelleyen:'{{OB08}}, günlük besleme işi',
        anahtar:'KURST + FCURR + TCURR + GDATU',
        iliskiler:'{{TCURV}} kur tiplerini, TCURF çarpan/bölen oranlarını tutar.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KURST', aciklama:'{{kur-tipi}}: M ortalama, B alış, G satış' },
          { ad:'GDATU', aciklama:'Geçerlilik tarihi — **ters formatta saklanır** (99999999 − tarih)' },
          { ad:'UKURS', aciklama:'Kur değeri' },
          { ad:'FFACT / TFACT', aciklama:'Çarpan/bölen — yüksek değerli para birimlerinde kullanılır' },
        ] },

      { ad:'TCURV', baslik:'Kur tipi tanımı',
        tutar:'Kur tiplerinin (M, B, G) tanımı ve davranışı: sabit kur mu, ters kotasyon mu.',
        olusturan:'IMG yapılandırması',
        guncelleyen:'IMG',
        anahtar:'KURST',
        s4:'Değişmedi.' },

      { ad:'BSEG', baslik:'Belge kalemleri — çok para birimli tutarlar',
        tutar:'Her kalem **birden çok para biriminde** saklanır: belge para birimi, yerel para, ' +
              've varsa {{paralel-para-birimi}}ler.',
        olusturan:'FI belgesi üreten her işlem',
        guncelleyen:'Kayıt işlemleri',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        s4:'S/4HANA’da {{ACDOCA}} **10’a kadar** paralel para birimi destekler (ECC’de 3).',
        alanlar:[
          { ad:'WRBTR', aciklama:'**Belge para birimi** tutarı (örn. 100.000 EUR)' },
          { ad:'DMBTR', aciklama:'**Yerel para** (şirket kodu para birimi) tutarı — çevrim sonucu' },
          { ad:'DMBE2 / DMBE3', aciklama:'2. ve 3. paralel para birimi tutarları (grup para birimi vb.)' },
          { ad:'KURSF', aciklama:'Kullanılan kur — belgede saklanır' },
        ] },

      { ad:'BKPF', baslik:'Belge başlığı — para birimi ve kur',
        tutar:'Belgenin para birimi, kullanılan kur ve kur tarihi.',
        olusturan:'FI belgesi üreten her işlem',
        guncelleyen:'Kayıt işlemleri',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'WAERS', aciklama:'Belge para birimi' },
          { ad:'KURSF', aciklama:'Kur — elle girilmemişse {{TCURR}}’dan gelir' },
          { ad:'WWERT', aciklama:'**Kur tarihi** — hangi tarihin kuru kullanılacak. Boşsa belge tarihi kullanılır.' },
        ] },

      { ad:'ACDOCA', baslik:'Evrensel Kayıt Defteri — çok para birimi',
        tutar:'Kalemler defter ve para birimi boyutlarıyla birlikte.',
        olusturan:'Muhasebeleşen her işlem',
        guncelleyen:'FI/CO işlemleri',
        s4:'**10’a kadar paralel para birimi** — ECC’nin 3 sınırını aşar. ' +
            'Değerleme her defter ve her para birimi için ayrı hesaplanabilir.',
        alanlar:[
          { ad:'HSL', aciklama:'Şirket kodu para birimi tutarı' },
          { ad:'WSL', aciklama:'Belge para birimi tutarı' },
          { ad:'KSL', aciklama:'Grup para birimi tutarı' },
          { ad:'OSL', aciklama:'Ek para birimi tutarı' },
        ] },

      { ad:'BSIK', baslik:'Satıcı açık kalemleri — değerleme hedefi',
        tutar:'Dövizli açık kalemler; {{F.05}} bunları tarar.',
        olusturan:'Satıcıya yapılan kayıtlar',
        guncelleyen:'Değerleme kalemin kendisini **değiştirmez**; ayrı düzeltme kaydı üretir',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'Kur yapısı ve belge ilişkileri',
      varliklar:[
        { ad:'TCURV', rol:'Yapılandırma', aciklama:'Kur tipleri',
          alanlar:[{ ad:'KURST', tip:'pk' }, { ad:'XINVR' }] },
        { ad:'TCURR', rol:'Kur verisi', hub:true, aciklama:'Kurlar',
          alanlar:[{ ad:'KURST', tip:'fk' }, { ad:'FCURR', tip:'pk' }, { ad:'TCURR', tip:'pk' }, { ad:'GDATU', tip:'pk' }, { ad:'UKURS' }] },
        { ad:'BKPF', rol:'Başlık', aciklama:'Belge para birimi ve kur',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'WAERS' }, { ad:'KURSF' }, { ad:'WWERT' }] },
        { ad:'BSEG', rol:'Kalem', aciklama:'Çok para birimli tutarlar',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'WRBTR' }, { ad:'DMBTR' }, { ad:'DMBE2' }] },
        { ad:'BSIK', rol:'İndeks', aciklama:'Dövizli açık kalemler',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'WAERS' }] },
        { ad:'ACDOCA', rol:'Evrensel', aciklama:'10 para birimine kadar',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HSL' }, { ad:'WSL' }, { ad:'KSL' }] },
        { ad:'T001', rol:'Yapılandırma', aciklama:'Şirket kodu para birimi',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'WAERS' }] },
      ],
      iliskiler:[
        { from:'TCURV', to:'TCURR', alanlar:'KURST', not:'kur tipi tanımı' },
        { from:'TCURR', to:'BKPF', alanlar:'kur okuma', not:'kayıt anında çevrim' },
        { from:'T001', to:'BKPF', alanlar:'BUKRS → WAERS', not:'yerel para birimi' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'başlık → kalem' },
        { from:'BSEG', to:'BSIK', alanlar:'BELNR + BUZEI', not:'dövizli açık kalem' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR', not:'çok para birimli evrensel görünüm' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Kur konusunda üç ekran kritiktir: **{{OB08}}** (kur girişi), **{{F.05}}** (değerleme) ve ' +
      '**{{OBA1}}** (hesap belirleme). Üçü de kapanışta hata kaynağı olabilir.',

    ekranlar:[
      { ad:'{{OB08}} — kur giriş ekranı',
        aciklama:'Basit görünür ama iki tuzağı vardır: geçerlilik tarihi mantığı ve kotasyon yönü.',
        alanlar:[
          { ad:'{{kur-tipi}}', zorunlu:true, aciklama:'M ortalama (standart), B alış, G satış. Değerleme yöntemi hangisini kullanacağını belirtir.' },
          { ad:'Geçerlilik tarihi', zorunlu:true, aciklama:'**Kur o tarihten itibaren geçerlidir.** Sistem, işlem tarihine eşit veya ondan önceki **en yakın** kuru kullanır.' },
          { ad:'Kaynak / hedef para birimi', zorunlu:true, aciklama:'Yön önemlidir: EUR→TRY ile TRY→EUR farklı satırlardır.' },
          { ad:'Kur', zorunlu:true, aciklama:'Çarpan/bölen oranı tanımlıysa görünen değer farklı yorumlanabilir.' },
        ],
        ipucu:'**En sinsi davranış:** 31 Ocak kuru girilmemişse sistem hata vermez, ' +
              '28 Ocak kurunu kullanır. Yani yanlış kurla kayıt yapılır ve kimse fark etmez. ' +
              'Bu yüzden kur beslemesi düzenli kontrol edilmelidir.' },

      { ad:'{{F.05}} — değerleme ekranı',
        aciklama:'Kapanışın en çok belge üreten programı. Test modu vazgeçilmezdir.',
        alanlar:[
          { ad:'Değerleme anahtar tarihi', zorunlu:true, aciklama:'Genelde ayın son günü. Bu tarihteki kur kullanılır.' },
          { ad:'**Değerleme yöntemi**', zorunlu:true, aciklama:'{{OB59}}’da tanımlı. Sonucu tamamen belirler: ilke, kur tipi, ters kayıt.' },
          { ad:'Kalem tipi seçimi', zorunlu:true, aciklama:'G/L bakiyeleri · satıcı açık kalemleri · müşteri açık kalemleri — ayrı ayrı işaretlenir.' },
          { ad:'Ters kayıt tarihi', zorunlu:false, aciklama:'Genelde sonraki dönemin ilk günü.' },
          { ad:'Test modu', zorunlu:false, aciklama:'**Her zaman önce.** Program yüzlerce belge üretebilir.' },
          { ad:'Belge türü', zorunlu:false, aciklama:'Değerleme belgeleri için ayrı tür kullanmak, sonradan ayırt etmeyi kolaylaştırır.' },
        ],
        ipucu:'Test sonucundaki toplam kur farkını **bir önceki ayla karşılaştır**. ' +
              'Büyük sapma varsa iki ihtimal: kur gerçekten çok hareket etmiş, veya ' +
              '{{TCURR}}’da yanlış/eksik kur var.' },

      { ad:'{{OBA1}} — kur farkı hesap belirleme',
        aciklama:'Hangi farkın hangi hesaba gideceğini tanımlar. Eksikse değerleme durur.',
        alanlar:[
          { ad:'Hesap anahtarı', zorunlu:true, aciklama:'**KDF** gerçekleşmemiş (değerleme), **KDB** gerçekleşmiş (kapatma).' },
          { ad:'Şirket kodu + mutabakat hesabı', zorunlu:true, aciklama:'Her mutabakat hesabı için ayrı tanım yapılabilir.' },
          { ad:'Kâr hesabı / Zarar hesabı', zorunlu:true, aciklama:'Kur lehte ise kâr (646), aleyhte ise zarar (656).' },
          { ad:'Bilanço düzeltme hesabı', zorunlu:false, aciklama:'Değerleme farkının mutabakat hesabı yerine yazılacağı hesap.' },
        ],
        ipucu:'**Bilanço düzeltme hesabı kullan.** Değerleme farkı doğrudan 320 hesabına yazılırsa ' +
              'ana muhasebe bakiyesi ile {{FBL1N}} muavin defter toplamı **uyuşmaz** ve ' +
              'mutabakat kontrolü kalıcı olarak bozulur.' },
    ],

    zorunlu:['Kur tipi','Geçerlilik tarihi','Para birimi çifti','Kur','Değerleme anahtar tarihi','Değerleme yöntemi','Kur farkı hesapları'],
    opsiyonel:['Ters kayıt tarihi','Test modu','Belge türü','Bilanço düzeltme hesabı','Çarpan/bölen oranı'],

    hatalar:[
      { mesaj:'Exchange rate for EUR/TRY on 31.01.2027 not found', sebep:'{{TCURR}}’da o tarihe kur yok — otomatik besleme kopmuş olabilir.', cozum:'{{OB08}} ile gir; besleme işini kontrol et. Kontrol listesine "kurlar güncel mi?" maddesi ekle.' },
      { mesaj:'Account determination for entry ... KDF not possible', sebep:'{{OBA1}}’de gerçekleşmemiş kur farkı hesabı tanımsız.', cozum:'{{OBA1}} → KDF → ilgili mutabakat hesabı için kâr/zarar hesaplarını gir.' },
      { mesaj:'Account determination for entry ... KDB not possible', sebep:'Gerçekleşmiş kur farkı hesabı tanımsız — ödeme sırasında alınır.', cozum:'{{OBA1}} → KDB tanımını tamamla.' },
      { mesaj:'Valuation method ... does not exist', sebep:'{{OB59}}’da yöntem yok.', cozum:'Değerleme yöntemini tanımla.' },
      { mesaj:'Ratio for currency conversion is missing (TCURF)', sebep:'Para birimi çifti için çarpan/bölen oranı tanımsız.', cozum:'IMG → kur çevrim oranlarını tanımla.' },
      { mesaj:'Valuation area ... not assigned to ledger', sebep:'{{FAGL_FC_VAL}}’de değerleme alanı defterle eşlenmemiş.', cozum:'IMG → değerleme alanı - defter atamasını yap. {{paralel-defter}} kurulumlarında sık görülür.' },
      { mesaj:'Document currency and local currency are identical', sebep:'Değerlenecek dövizli kalem yok — belge zaten yerel para biriminde.', cozum:'Uyarıdır; seçim kriterlerini kontrol et.' },
    ],

    ipuclari:[
      '{{F.05}}’i **tüm dövizli işlemler kaydedildikten sonra** çalıştır. Sonradan gelen fatura ' +
      'değerlenmemiş kalır ve kapanış tekrarlanır.',
      'Test sonucundaki toplam kur farkını geçen ayla karşılaştır; sapma açıklanabilir olmalıdır.',
      'Değerleme farkını **bilanço düzeltme hesabına** yaz, mutabakat hesabına değil — ' +
      'muavin defter mutabakatı bozulmasın.',
      'Değerleme belgeleri için **ayrı belge türü** kullan; ay sonunda hangilerinin ters kaydedileceğini ' +
      'bir raporla görürsün.',
      'Kur beslemesini kapanış kontrol listesine madde olarak ekle. Kopukluk sessizdir ve ' +
      'sistem eski kuru kullanarak hata bile vermez.',
      '{{paralel-defter}} varsa {{FAGL_FC_VAL}}’i **her defter için** çalıştır; ' +
      'her defterin kendi değerleme yöntemi olabilir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'TCURR', ne:'Kur kayıtları — {{OB08}} veya otomatik besleme' },
      { tablo:'BKPF', ne:'Değerleme belgesi başlığı; kullanılan kur ve kur tarihi' },
      { tablo:'BSEG', ne:'Değerleme farkı kalemleri; dövizli kalemlerde çok para birimli tutarlar' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler; 10’a kadar paralel para birimi' },
      { tablo:'BSIK / BSID', ne:'Açık kalemler taranır ama **değiştirilmez** — fark ayrı kayıtta' },
    ],

    commit:
      'Değerleme **toplu bir programdır** ve her belge ayrı LUW’da yazılır. ' +
      'Koşu yarıda kesilse bile üretilen belgeler kalıcıdır.\n\n' +
      'Bu yüzden {{F.05}} tekrar çalıştırıldığında **önceki değerlemeyi dikkate alır**: ' +
      'aynı dönem için ikinci kez çalıştırılırsa ya fark kaydeder ya da önceki kaydı ' +
      'iptal edip yenisini yazar (değerleme yöntemine bağlı). Mükerrer değerleme oluşmaz.',

    belgeNo:
      'Değerleme belgeleri kendi belge türlerinin aralığından numara alır — genelde **SA** veya ' +
      'özel bir tür (örn. **ZV**). Ayrı tür kullanmak, ay sonunda değerleme belgelerini ' +
      'raporla ayırt etmeyi kolaylaştırır.',

    postingLogic:
      'Değerlemenin karar zinciri:\n\n' +
      '**1. Kalem seçimi:** dövizli açık kalemler ve dövizli G/L bakiyeleri taranır.\n' +
      '**2. Güncel kur okunur:** {{TCURR}}’dan, değerleme yönteminin belirttiği {{kur-tipi}} ile, ' +
      'anahtar tarihe eşit veya ondan önceki en yakın kur.\n' +
      '**3. Fark hesaplanır:** (güncel kur × döviz tutarı) − mevcut yerel para tutarı.\n' +
      '**4. Değerleme ilkesi uygulanır:** düşük değerle değerlemede yalnız zarar kaydedilir; ' +
      'her zaman değerlemede kâr da kaydedilir.\n' +
      '**5. Hesap belirlenir:** {{OBA1}} → KDF anahtarı → kâr veya zarar hesabı + bilanço düzeltme hesabı.\n' +
      '**6. Kayıt yapılır** ve ters kayıt tarihi işaretlenir.\n\n' +
      'Gerçekleşmiş fark ise **kapatma sırasında** hesaplanır: kapatma kuru ile kayıt kuru ' +
      'arasındaki fark, KDB anahtarındaki hesaba yazılır.',

    belgeTuru:
      'Değerleme için ayrı bir belge türü tanımlamak iyi bir uygulamadır. ' +
      'Bu tür {{OBA7}}’de tanımlanır ve genelde ters kayıt türü olarak kendisi belirtilir.',

    numberRange:
      'Değerleme belge türünün aralığı da her mali yıl için açılmalıdır. ' +
      'Yüksek hacimli kurulumlarda değerleme yüzlerce belge üretebilir — aralık geniş tutulmalıdır.',

    accountDetermination:
      '{{OBA1}} kur farkı hesap belirlemesinin merkezidir. Anahtarlar:\n\n' +
      '**KDF** — gerçekleşmemiş kur farkı (değerleme). Girdi: şirket kodu + mutabakat hesabı + ' +
      'para birimi (opsiyonel). Çıktı: kâr hesabı, zarar hesabı, bilanço düzeltme hesabı.\n\n' +
      '**KDB** — gerçekleşmiş kur farkı (kapatma anında). Aynı yapı.\n\n' +
      '**KDW / KDV** — bazı kurulumlarda kullanılan ek düzeltme anahtarları.\n\n' +
      'Her mutabakat hesabı için ayrı tanım yapılabilir: satıcı kur farkı ile müşteri kur farkı ' +
      'ayrı hesaplarda izlenebilir.',

    tur:
      '**Özelleştirme:** {{kur-tipi}} tanımları ({{TCURV}}), çarpan/bölen oranları (TCURF), ' +
      '{{OB59}} değerleme yöntemleri, {{OBA1}} hesap belirleme, {{paralel-para-birimi}} yapısı.\n\n' +
      '**Ana veri sayılabilecek:** kurların kendisi ({{TCURR}}) — teknik olarak yapılandırma tablosudur ' +
      'ama günlük değişen bir veridir ve genelde otomatik beslenir.\n\n' +
      '**Hareket verisi:** değerleme belgeleri.',

    transport:
      'Kur tipleri, çevrim oranları, değerleme yöntemleri ve hesap belirleme **taşınır**.\n\n' +
      '**Kurların kendisi ({{TCURR}}) taşınmaz** — her sistemde ayrı beslenir. ' +
      'Bu mantıklıdır: test sisteminde güncel kur gerekmez. ' +
      'Ama canlıya geçişte kur beslemesinin kurulmuş olması **zorunludur**; ' +
      'yoksa ilk dövizli işlem hata verir.',

    img:[
      { yol:'SPRO → SAP NetWeaver → Genel Ayarlar → Para Birimleri → Kur Tiplerini Kontrol Et', not:'{{TCURV}} — M/B/G tanımları' },
      { yol:'SPRO → SAP NetWeaver → Genel Ayarlar → Para Birimleri → Çevrim Oranlarını Tanımla', not:'TCURF — çarpan/bölen' },
      { yol:'SPRO → SAP NetWeaver → Genel Ayarlar → Para Birimleri → Kurları Gir', not:'{{OB08}} → {{TCURR}}' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → İş İşlemleri → Kapanış → Değerleme → Yabancı Para Değerlemesi → Değerleme Yöntemlerini Tanımla', not:'{{OB59}}' },
      { yol:'SPRO → … → Kapanış → Değerleme → Yabancı Para Değerlemesi → Kur Farkları İçin Hesapları Hazırla', not:'{{OBA1}} — KDF/KDB' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Şirket Kodu → Paralel Para Birimleri', not:'{{paralel-para-birimi}} yapısı' },
    ],

    ekstra:[
      { ic:'💰', baslik:'Kur farkının hesapları — hangi fark nereye yazılır?', metin:
        '**Temel ikili (TDHP):**\n\n' +
        '`646` **Kambiyo kârları** — kur lehte hareket etti\n' +
        '`656` **Kambiyo zararları** — kur aleyhte hareket etti\n\n' +
        'Döviz tutarı **hiç değişmez**; değişen yalnızca yerel para karşılığıdır. ' +
        '320 hesabındaki 100.000 EUR, kur ne olursa olsun 100.000 EUR kalır.\n\n' +
        '---\n\n' +
        '**Neden alt hesap ayrımı önerilir?**\n\n' +
        '`646.01 / 656.01` **gerçekleşmemiş** — {{F.05}} değerlemesinden doğar, ' +
        '**ertesi gün ters kaydedilir**\n' +
        '`646.02 / 656.02` **gerçekleşmiş** — ödeme/tahsilatta kesinleşir, **kalıcıdır**\n\n' +
        'Ayrım iki işe yarar:\n\n' +
        '**1. Vergi matrahı.** Gerçekleşmemiş fark geçici bir değerleme sonucudur; ' +
        'mali müşavir bunu ayrı görebilmelidir.\n\n' +
        '**2. Kontrol.** Dönem başında gerçekleşmemiş hesapların **sıfırlanmış** olması gerekir ' +
        '(ters kayıt çalıştıysa). Sıfır değilse ters kayıt atlanmıştır — ' +
        'dönem sonu kontrol listesinin basit ve etkili bir maddesidir.\n\n' +
        '---\n\n' +
        '**SAP tarafında hesaplar nereye bağlanır?**\n\n' +
        '{{OBA1}} ile iki anahtar kullanılır:\n\n' +
        '**KDF** — açık kalem değerlemesi (satıcı, müşteri, dövizli krediler)\n' +
        '**KDB** — bakiye değerlemesi (dövizli banka hesapları)\n\n' +
        'Her anahtarda **kâr hesabı**, **zarar hesabı** ve gerekiyorsa ' +
        '**bilanço düzeltme hesabı** ayrı ayrı tanımlanır.\n\n' +
        'Düzeltme hesabı neden var? Değerleme farkını doğrudan 320 hesabına yazmak, ' +
        '{{mutabakat-hesabi}} ile satıcı muavin defteri arasında fark yaratırdı. ' +
        'Bunun yerine ayrı bir düzeltme hesabı kullanılır ve bilançoda 320 ile birlikte gösterilir.' },

      { ic:'⚖️', baslik:'Hangi kalem değerlenir? — parasal / parasal olmayan ayrımı', metin:
        '**En sık yapılan kur farkı hatası, yanlış kalemi değerlemektir.**\n\n' +
        '**Değerlenir — {{parasal-kalem}}ler:**\n\n' +
        '`102` dövizli banka · `320` satıcılar · `120` alıcılar · ' +
        '`300/400` krediler · `121/321` senetler\n\n' +
        'Ortak özellik: karşılığında **belirli tutarda para** alınacak veya ödenecek. ' +
        'Kur değişince alacağın/borcun TL karşılığı değişir → **gerçek bir kur riski vardır**.\n\n' +
        '**Değerlenmez — parasal olmayanlar:**\n\n' +
        '`153` stoklar · `253` duran varlıklar · `159` verilen avanslar · `340` alınan avanslar\n\n' +
        'Ortak özellik: karşılığında **mal veya hizmet** alınacak/verilecek, para değil.\n\n' +
        '---\n\n' +
        '**Avans neden değerlenmez? — kavramın kilit noktası**\n\n' +
        'Satıcıya 50.000 EUR avans verdin. Kur 35’ten 40’a çıktı. Kâr ettin mi?\n\n' +
        '**Hayır.** Çünkü sana geri **para** gelmeyecek — 50.000 EUR’luk **mal** gelecek. ' +
        'Malın döviz fiyatı değişmediği sürece senin durumun değişmedi.\n\n' +
        'Avansı değerlersen **gerçekte var olmayan bir kâr** yaratırsın; ' +
        'mal geldiğinde bu kâr geri alınır ve iki dönem birden yanlış olur.\n\n' +
        'Aynı mantık stok ve duran varlık için de geçerlidir: 100.000 EUR’ya alınan makine, ' +
        'alındığı günün kuruyla TL’ye çevrilir ve **o değerde kalır**. ' +
        'Kur yükseldi diye makinenin defter değeri artmaz.\n\n' +
        '**SAP’ta önlem:** {{F.05}} seçim ekranında ve {{OBA1}} yapılandırmasında ' +
        'değerlemeye tabi hesaplar listelenir. **Avans hesapları bu listeye konmamalıdır.** ' +
        'Konursa her dönem sahte kur farkı üretilir ve fark ancak yıllar sonra fark edilir.' },

      { ic:'🧾', baslik:'Kur farkı faturası — SAP’ın yapmadığı, mevzuatın istediği', metin:
        '**Türkiye’ye özgü ve sık atlanan bir yükümlülüktür.**\n\n' +
        'Muhasebede kur farkı zaten `646`/`656` hesabına kaydedilir. ' +
        'Ama KDV açısından ayrı bir soru vardır: *"bedelin kendisi değişti mi?"*\n\n' +
        'Dövize endeksli veya döviz cinsi bir satışta, tahsilat günü kur yükselmişse ' +
        'satıcı **daha fazla TL** tahsil etmiştir. Bu ek tutar bedelin parçasıdır ve ' +
        '**KDV’ye tabidir**.\n\n' +
        '**Kim düzenler:** lehine fark oluşan taraf.\n\n' +
        '• Kur **yükseldi** → satıcı lehine → **satıcı** düzenler\n' +
        '• Kur **düştü** → alıcı lehine → **alıcı** düzenler\n\n' +
        '**KDV oranı** asıl işleme uygulanan oranla aynıdır.\n\n' +
        '---\n\n' +
        '**Danışmanlık açısından kritik nokta**\n\n' +
        '{{F110}} ödemeyi yapar, SAP kur farkını `656`’ya yazar, muhasebe kaydı **tamamdır**. ' +
        'Ama kur farkı faturası **düzenlenmemiştir** — çünkü SAP bunu üretmez.\n\n' +
        'Sonuç: muhasebe doğru, **KDV eksik**. Fark ancak incelemede ortaya çıkar.\n\n' +
        '**Önlem:** dövizli satışların tahsilatlarında oluşan lehte kur farklarını ' +
        'listeleyen bir rapor kurulmalı ve aylık gözden geçirilmelidir. ' +
        '{{FBL5N}}’de kur farkı kalemleri süzülerek elle takip edilebilir.\n\n' +
        '*Uygulama esasları KDV Genel Uygulama Tebliği ile belirlenir; ' +
        'güncel düzenleme mali müşavire teyit ettirilmelidir.*' },

      { ic:'🏗️', baslik:'Yatırım dönemi kur farkı — gider mi, maliyet mi?', metin:
        'Yurtdışından 2.000.000 EUR’ya makine alındı, borç henüz ödenmedi, kur yükseldi. ' +
        'Oluşan kur farkı **gider mi yazılır, makinenin maliyetine mi eklenir?**\n\n' +
        '**VUK uygulaması:** yatırımın **aktifleştirildiği dönemin sonuna kadar** oluşan ' +
        'kur farkları varlığın **maliyetine eklenir**. Sonraki dönemlerde oluşanların ' +
        'maliyete eklenmesi ise **ihtiyaridir** — gider de yazılabilir.\n\n' +
        '**Neden önemli:**\n\n' +
        'Maliyete eklenirse → 340.000 TL gider yazılmaz, **amortisman yoluyla** yıllara yayılır. ' +
        'O yılın kârı daha yüksek, sonraki yılların kârı daha düşük görünür.\n\n' +
        'Gider yazılırsa → tamamı o yıl gider olur.\n\n' +
        'İkisi de mevzuata uygun olabilir ama **sonuçları farklıdır** ve ' +
        'seçim tutarlı uygulanmalıdır.\n\n' +
        '---\n\n' +
        '**SAP bunu otomatik ayırmaz.**\n\n' +
        '{{F.05}} tüm açık kalemleri değerler ve farkı `656`’ya yazar — ' +
        'yatırıma ait olanla normal ticari borcu **ayırt etmez**.\n\n' +
        'Yatırım dönemine ait farkların {{yatirim-devam}} hesabına (258) aktarılması ' +
        '**elle** yapılır. Dönem sonu kontrol listesine konmalıdır:\n\n' +
        '*"Dövizli yatırım borcu var mı? Varsa bu dönemin kur farkı 258’e aktarıldı mı?"*' },

      { ic:'💱', baslik:'Paralel para birimi — aynı belge, üç tutar', metin:
        'Bir şirket üç para biriminde raporlamak isteyebilir: **yerel** (TRY, yasal), ' +
        '**grup** (EUR, konsolidasyon), **sabit** (USD, enflasyondan bağımsız karşılaştırma).\n\n' +
        'SAP bunu **paralel para birimi** ile çözer: her belge kaydedilirken üç tutar birden hesaplanır ' +
        've saklanır ({{BSEG}} `DMBTR`, `DMBE2`, `DMBE3`).\n\n' +
        'Her para birimi kendi {{kur-tipi}} ve kur tarihini kullanabilir — bu, yapılandırmada belirlenir.\n\n' +
        'S/4HANA’da {{ACDOCA}} bu sınırı **10 para birimine** çıkardı. ' +
        'Değerleme de her para birimi için ayrı yapılabilir.' },

      { ic:'⚖️', baslik:'Değerleme farkı nereye yazılmalı?', metin:
        'İki seçenek vardır ve seçim önemlidir:\n\n' +
        '**Seçenek 1 — mutabakat hesabına yaz.** Basittir ama **muavin defter mutabakatını bozar**: ' +
        '320 hesabının bakiyesi 3.880.000 TL olurken {{FBL1N}} muavin defter toplamı 3.500.000 TL kalır. ' +
        'Aradaki fark açıklanabilir ama her ay kontrol gerektirir.\n\n' +
        '**Seçenek 2 — ayrı bilanço düzeltme hesabına yaz.** Mutabakat hesabı dokunulmamış kalır; ' +
        'düzeltme hesabı bilançoda mutabakat hesabının yanında gösterilir.\n\n' +
        'Çoğu kurulum **seçenek 2**’yi tercih eder. {{OBA1}}’de "bilanço düzeltme hesabı" alanıyla tanımlanır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Sistem eksik kurda hata vermez', metin:
        '{{TCURR}}’da işlem tarihine ait kur yoksa sistem **hata vermez**; ' +
        'o tarihe eşit veya ondan **önceki en yakın** kuru kullanır.\n\n' +
        'Sonuç: kur beslemesi 3 gün kopmuşsa, o üç günün işlemleri **eski kurla** kaydedilir ve ' +
        'kimse fark etmez. Fark ancak değerleme veya ödeme anında ortaya çıkar.\n\n' +
        'Bu yüzden kur beslemesi izlenmeli ve kapanış kontrol listesine dâhil edilmelidir.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Değerleme **mantığı değişmedi**. Değişen: paralel para birimi sınırının 3’ten **10’a** çıkması, ' +
      'defter bazlı değerlemenin standartlaşması ve Fiori arayüzleri.',

    eccFarklari:[
      { konu:'Paralel para birimi', ecc:'**3** (yerel + 2 ek)', s4:'**10’a kadar** — {{ACDOCA}} sayesinde' },
      { konu:'Değerleme programı', ecc:'{{F.05}} (klasik) / {{FAGL_FC_VAL}} (yeni G/L)', s4:'{{FAGL_FC_VAL}} standart; defter bazlı' },
      { konu:'Defter bazlı değerleme', ecc:'Yeni G/L ile mümkün', s4:'**Standart** — her defter kendi yöntemiyle' },
      { konu:'Kur verisi', ecc:'{{TCURR}}', s4:'Değişmedi' },
      { konu:'Hesap belirleme', ecc:'{{OBA1}}', s4:'Değişmedi' },
      { konu:'Raporlama', ecc:'Klasik raporlar', s4:'Fiori + anlık çok para birimli raporlama' },
    ],

    universalJournal:
      '{{ACDOCA}} her kalemi **çok para birimli** olarak saklar: `HSL` (şirket kodu), `WSL` (belge), ' +
      '`KSL` (grup), `OSL` (ek) ve devamı. Toplam 10 para birimine kadar.\n\n' +
      'Pratik sonucu: konsolidasyon için ayrı çevrim yapmaya gerek kalmaz — grup para birimi tutarı ' +
      'zaten her satırda hazırdır. Ayrıca değerleme her defter ve her para birimi için ' +
      'bağımsız çalıştırılabilir.',

    kalkanTcodes:[
      { eski:'{{F.05}}', yeni:'{{FAGL_FC_VAL}}', not:'F.05 klasik ana muhasebe içindir; yeni G/L ve S/4HANA’da FAGL_FC_VAL kullanılır' },
    ],

    fiori:[
      { ad:'Run Foreign Currency Valuation', aciklama:'{{FAGL_FC_VAL}}’in Fiori karşılığı; koşu durumu ve sonuç görsel.' },
      { ad:'Manage Exchange Rates', aciklama:'{{OB08}} yerine; toplu kur girişi ve besleme durumu izleme.' },
      { ad:'Currency Risk Analysis', aciklama:'Net döviz pozisyonunu ve kur duyarlılığını gösterir.' },
      { ad:'Trial Balance (multi-currency)', aciklama:'Mizanı istenen para biriminde anlık üretir.' },
    ],

    compatibilityViews:[
      '{{TCURR}}, {{TCURV}} — **fiziksel tablo olarak duruyor**, değişmedi.',
      '{{BSEG}} — duruyor; çok para birimli alanlar korundu ama {{ACDOCA}} daha fazlasını taşıyor.',
      'Kur konusu, S/4HANA’da tablo yapısı en az değişen alanlardan biridir.',
    ],

    performans:
      'Değerleme {{ACDOCA}} üzerinden çalıştığı için büyük kalem hacimlerinde hızlandı. ' +
      'Asıl kazanç çok para birimli raporlamadadır: grup para birimi tutarı her satırda hazır olduğu için ' +
      'konsolidasyon çevrimleri anlık yapılabilir.',

    bestPractices:[
      'Geçişte paralel para birimi yapısını gözden geçir; S/4HANA’nın 10 para birimi desteği ' +
      'ECC’de yapılamayan raporlamaları mümkün kılabilir.',
      '{{paralel-defter}} kullanılıyorsa her deftere **kendi değerleme yöntemini** ata: ' +
      'yerel defterde ihtiyatlılık, IFRS defterinde simetrik değerleme.',
      'Kur beslemesini otomatikleştir ve **izlemeye al** — kopukluk sessizdir.',
      'Değerleme farkını bilanço düzeltme hesabına yaz; mutabakat hesabını dokunulmamış bırak.',
      'Değerleme belgeleri için ayrı belge türü kullan; raporlamada ayırt edilebilir olsun.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'100.000 EUR’luk ithalat: değerlemeden gerçekleşmeye',
    hikaye:
      '**Marmara Tekstil A.Ş.** Ocak 2027’de Almanya’dan 100.000 EUR’luk kumaş ithal ediyor. ' +
      'Kur oynak: Ocak’ta 35,00, ay sonunda 38,80, ödeme günü 37,20.\n\n' +
      'Bu senaryo, aynı işlemin üç farklı anda üç farklı rakam ürettiğini ve ' +
      'muhasebenin bunu nasıl ele aldığını gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · Yerel para TRY' },
      { k:'Satıcı', v:'V-9001 (Almanya) · Ödeme koşulu 30 gün' },
      { k:'Tutar', v:'100.000 EUR' },
      { k:'Kurlar', v:'15.01: **35,00** · 31.01: **38,80** · 15.02: **37,20**' },
      { k:'Değerleme yöntemi', v:'Z001 — ortalama kur (M), düşük değerle değerleme, ters kaydedilecek' },
    ],

    adimlar:[
      { baslik:'15 Ocak — fatura kaydedilir (çevrim)', tcode:'MIRO',
        aciklama:'Belge para birimi EUR girilir; sistem {{TCURR}}’dan 15.01 kurunu bulup yerel karşılığı hesaplar.',
        girdi:[
          { alan:'Satıcı / Tutar', deger:'V-9001 · 100.000 EUR' },
          { alan:'Belge para birimi', deger:'EUR' },
          { alan:'Kur — **otomatik**', deger:'35,00 ({{TCURR}}’dan, 15.01 kuru)' },
          { alan:'Yerel karşılık', deger:'3.500.000 TL' },
        ],
        fis:{ baslik:'Belge 5100000891 — İthalat faturası', belgeTuru:'RE', tarih:'15.01.2027', paraBirimi:'EUR',
          satirlar:[
            { hesap:'153', ad:'Ticari mallar', borc:3500000, not:'100.000 EUR × 35,00' },
            { hesap:'320', ad:'Satıcılar — V-9001', alacak:3500000, not:'Döviz: 100.000 EUR' },
          ], not:'Bu bir **çevrimdir**. Kayıt anında bir kez yapılır ve belgede saklanır.' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'`WRBTR` = 100.000 (EUR) · `DMBTR` = 3.500.000 (TRY) · `KURSF` = 35,00' },
          { tablo:'BSIK', ne:'Dövizli açık kalem oluştu — değerleme hedefi' },
          { tablo:'BKPF', ne:'`WAERS` = EUR · `KURSF` = 35,00' },
        ] },

      { baslik:'31 Ocak — kur bulunamıyor', tcode:'F.05',
        aciklama:'Değerleme çalıştırılıyor ama hata veriyor. Otomatik besleme kopmuş.',
        girdi:[
          { alan:'Hata', deger:'"Exchange rate for EUR/TRY on 31.01.2027 not found"' },
          { alan:'Teşhis', deger:'{{TCURR}} kontrolü → son kur 28.01 tarihli' },
          { alan:'Çözüm', deger:'{{OB08}} ile 31.01 kuru girildi: **38,80**' },
        ],
        not:'**Sinsi nokta:** eğer değerleme çalıştırılmasaydı ve 31 Ocak’ta yeni bir dövizli fatura ' +
             'girilseydi, sistem **hata vermeden** 28 Ocak kurunu kullanacaktı. ' +
             'Kur beslemesi kontrol listesine eklendi.' },

      { baslik:'31 Ocak — değerleme yapılır', tcode:'F.05',
        aciklama:'Açık kalem 38,80 kuruyla yeniden ölçülüyor. Fark **gerçekleşmemiş** zarardır.',
        girdi:[
          { alan:'Anahtar tarih / Yöntem', deger:'31.01.2027 · Z001' },
          { alan:'Kayıt kuru', deger:'35,00 → yerel karşılık 3.500.000 TL' },
          { alan:'Değerleme kuru', deger:'38,80 → yerel karşılık 3.880.000 TL' },
          { alan:'**Fark**', deger:'**380.000 TL zarar** (gerçekleşmemiş)' },
          { alan:'Ters kayıt tarihi', deger:'01.02.2027' },
        ],
        fis:{ baslik:'Belge 1000009012 — Kur değerlemesi', belgeTuru:'SA', tarih:'31.01.2027',
          satirlar:[
            { hesap:'656', ad:'Kambiyo zararı (gerçekleşmemiş)', borc:380000, not:'{{OBA1}} → KDF' },
            { hesap:'321', ad:'Satıcılar — değerleme düzeltmesi', alacak:380000, not:'Bilanço düzeltme hesabı' },
          ], not:'Düzeltme **320’ye değil 321’e** yazıldı. Böylece 320 hesabının bakiyesi ' +
                 '{{FBL1N}} muavin defter toplamıyla uyumlu kalıyor ve mutabakat bozulmuyor.\n\n' +
                 'Bilançoda ikisi birlikte gösterilir: 3.500.000 + 380.000 = 3.880.000 TL gerçek yükümlülük.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'**Değişmedi** — açık kalem hâlâ 3.500.000 TL. Değerleme kalemin kendisine dokunmaz.' },
          { tablo:'BKPF', ne:'Ters kayıt tarihi 01.02.2027 olarak işaretlendi' },
        ] },

      { baslik:'1 Şubat — değerleme ters kaydedilir', tcode:'F.05',
        aciklama:'Fark gerçekleşmemişti; kur geri dönebilir. Değerleme otomatik geri alınıyor.',
        fis:{ baslik:'Belge 1000009156 — Değerleme ters kaydı', belgeTuru:'SA', tarih:'01.02.2027',
          satirlar:[
            { hesap:'321', ad:'Satıcılar — değerleme düzeltmesi', borc:380000 },
            { hesap:'656', ad:'Kambiyo zararı (gerçekleşmemiş)', alacak:380000 },
          ], not:'Ocak bilançosu doğru gösterildi; şimdi sıfırlandı. Şubat sonunda **yeniden** değerlenecek — ' +
                 'o zamanki kurla.' } },

      { baslik:'15 Şubat — ödeme yapılır (gerçekleşme)', tcode:'F110',
        aciklama:'Borç ödeniyor. Kur 37,20. Fark artık **gerçekleşiyor** ve kalıcı oluyor.',
        girdi:[
          { alan:'Ödeme tutarı', deger:'100.000 EUR' },
          { alan:'Ödeme günü kuru', deger:'37,20 → 3.720.000 TL banka çıkışı' },
          { alan:'Kapatılan kalem', deger:'3.500.000 TL (kayıt kurundan)' },
          { alan:'**Gerçekleşmiş fark**', deger:'**220.000 TL zarar**' },
        ],
        fis:{ baslik:'Belge 2000002341 — Ödeme', belgeTuru:'KZ', tarih:'15.02.2027', paraBirimi:'EUR',
          satirlar:[
            { hesap:'320', ad:'Satıcılar — V-9001 (kapatıldı)', borc:3500000, not:'100.000 EUR @ 35,00 (kayıt kuru)' },
            { hesap:'102', ad:'Bankalar (100.000 EUR @ 37,20)', alacak:3720000, not:'Ödeme günü kuru' },
            { hesap:'656', ad:'Kambiyo zararı (gerçekleşmiş)', borc:220000, not:'{{OBA1}} → KDB' },
          ], not:'**Döviz tarafı denk:** 100.000 EUR borç, 100.000 EUR ödeme. ' +
                 'Fark yalnızca yerel paradadır ve **kalıcıdır** — kalem kapandı, kur kesinleşti.\n\n' +
                 'Bu kayıt ters kaydedilmez.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'Kalem silindi' },
          { tablo:'BSAK', ne:'Kapatılmış kalem olarak eklendi' },
          { tablo:'BSEG', ne:'Kur farkı satırı; `AUGBL` kapatma belgesi' },
        ] },

      { baslik:'Sonuç analizi', tcode:'FBL3N',
        aciklama:'656 Kambiyo zararı hesabının hareketleri incelendiğinde tablo netleşiyor.',
        girdi:[
          { alan:'31.01 değerleme', deger:'+380.000 TL zarar (gerçekleşmemiş)' },
          { alan:'01.02 ters kayıt', deger:'−380.000 TL' },
          { alan:'15.02 ödeme', deger:'+220.000 TL zarar (gerçekleşmiş)' },
          { alan:'**Net kalıcı etki**', deger:'**220.000 TL zarar**' },
        ],
        not:'Ocak bilançosu 380.000 TL zarar gösterdi — **o tarihte doğruydu**. ' +
             'Gerçekleşen 220.000 TL oldu. Aradaki 160.000 TL fark, ters kayıt sayesinde ' +
             'otomatik olarak düzeldi; elle düzeltme gerekmedi.' },
    ],

    sonuc:
      '**Aynı işlem, üç farklı an, üç farklı rakam:**\n\n' +
      '• **15 Ocak (çevrim):** 3.500.000 TL — işlem kaydedildi\n' +
      '• **31 Ocak (değerleme):** 3.880.000 TL — bilanço gerçeği yansıttı, 380.000 TL gerçekleşmemiş zarar\n' +
      '• **15 Şubat (gerçekleşme):** 3.720.000 TL ödendi — 220.000 TL gerçekleşmiş zarar\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Döviz tutarı hiç değişmedi.** Borç baştan sona 100.000 EUR’ydu. Değişen yalnızca ' +
      'yerel para karşılığıydı. Değerleme kaydı döviz tarafında sıfırdır.\n\n' +
      '**2. Değerleme bir tahmindir, gerçek rakam ödemede belli olur.** ' +
      'Bu yüzden gerçekleşmemiş fark ters kaydedilir — aksi hâlde tahmin ile gerçek üst üste binerdi.\n\n' +
      '**3. Değerleme farkı ayrı bir düzeltme hesabına yazılmalı.** ' +
      'Doğrudan 320’ye yazılsaydı ana muhasebe bakiyesi ile muavin defter toplamı uyuşmayacak ve ' +
      'mutabakat kalıcı olarak bozulacaktı.\n\n' +
      '**4. Kur beslemesi sessiz bir arıza noktasıdır.** Sistem eksik kurda **hata vermez**, ' +
      'eski kuru kullanır. Bu senaryoda kapanışta yakalandı; yakalanmasaydı yanlış kurla ' +
      'kayıtlar oluşacaktı. Beslemenin izlenmesi zorunludur.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'Üç kavram ayrılır: **çevrim** (kayıt anında), **değerleme** (dönem sonu), **gerçekleşme** (kapatma anında).',
      '**Döviz tutarı hiç değişmez**; değişen yalnızca yerel para karşılığıdır.',
      '**Gerçekleşmemiş fark** (değerleme) ters kaydedilir; **gerçekleşmiş fark** (kapatma) kalıcıdır.',
      'Değerleme açık kalemin **kendisini değiştirmez**; fark ayrı bir düzeltme kaydında tutulur.',
      'Yapılandırma üç katmandır: {{OB08}} kurlar → {{OB59}} değerleme yöntemi → {{OBA1}} hesap belirleme.',
      'Hesap anahtarları: **KDF** gerçekleşmemiş, **KDB** gerçekleşmiş kur farkı.',
      'Sistem eksik kurda **hata vermez** — en yakın önceki kuru kullanır. Besleme izlenmelidir.',
      'S/4HANA’da paralel para birimi **10’a** çıktı (ECC’de 3) ve değerleme defter bazlıdır.',
    ],

    onemliNoktalar:[
      '**"Gerçekleşmiş ve gerçekleşmemiş kur farkı arasındaki fark nedir?"** Gerçekleşmemiş: kalem hâlâ açık, değerleme sonucu, **ters kaydedilir** (KDF). Gerçekleşmiş: kalem kapandı, kur kesinleşti, **kalıcıdır** (KDB). **En çok sorulan sorudur.**',
      '**"Değerleme açık kalemi değiştirir mi?"** Hayır. Orijinal kalem kayıt kuruyla durmaya devam eder; fark ayrı bir düzeltme kaydındadır.',
      '**"Değerleme farkı hangi hesaba yazılmalı?"** Mutabakat hesabına değil, **ayrı bir bilanço düzeltme hesabına** — yoksa muavin defter mutabakatı bozulur.',
      '**"Kur bulunamazsa ne olur?"** Sistem **hata vermez**; işlem tarihine eşit veya ondan önceki en yakın kuru kullanır. Yanlış kurla kayıt sessizce oluşur.',
      '**"Düşük değerle değerleme nedir?"** İhtiyatlılık ilkesi: gerçekleşmemiş **zarar** kaydedilir, gerçekleşmemiş **kâr** kaydedilmez. {{OB59}}’da seçilir.',
      '**"Aynı kur hareketi neden bazen kâr bazen zarar?"** Dövizli **borcun** yerel karşılığı artarsa zarar; dövizli **varlığın** yerel karşılığı artarsa kâr.',
      '**"Paralel defter varsa değerleme nasıl yapılır?"** Her defter için ayrı çalıştırılır ve her defter kendi değerleme yöntemini kullanabilir (yerel ihtiyatlı, IFRS simetrik).',
      '**"BSEG’de kaç tutar saklanır?"** `WRBTR` belge para birimi, `DMBTR` yerel, `DMBE2`/`DMBE3` paralel para birimleri. S/4HANA’da {{ACDOCA}} 10’a kadar.',
    ],

    sikHatalar:[
      { hata:'Değerleme farkının döviz tutarını değiştirdiğini sanmak.', dogru:'Döviz tutarı sabittir; yalnızca yerel para karşılığı değişir.' },
      { hata:'Gerçekleşmemiş farkı ters kaydetmemek.', dogru:'Her ay üst üste değerleme yapılır ve fark mükerrer birikir; ödeme anında çift sayım olur.' },
      { hata:'Değerleme farkını mutabakat hesabına yazmak.', dogru:'Ayrı bilanço düzeltme hesabı kullanılır; yoksa muavin defter mutabakatı kalıcı olarak bozulur.' },
      { hata:'{{F.05}}’i faturalardan önce çalıştırmak.', dogru:'Tüm dövizli işlemler kaydedildikten **sonra** çalıştırılır; yoksa sonradan gelen kalemler değerlenmez.' },
      { hata:'Kur beslemesini kontrol etmemek.', dogru:'Sistem eksik kurda hata vermez, eski kuru kullanır. Kapanış kontrol listesine eklenmelidir.' },
      { hata:'Paralel defterde yalnızca lider defteri değerlemek.', dogru:'{{FAGL_FC_VAL}} her defter için ayrı çalıştırılır; IFRS bilançosu eksik kalmasın.' },
      { hata:'Değerlemeyi doğrudan gerçek modda çalıştırmak.', dogru:'Program yüzlerce belge üretir; önce test modu, sonuç geçen ayla karşılaştırılır.' },
      { hata:'KDF ve KDB hesap belirlemesini karıştırmak.', dogru:'KDF gerçekleşmemiş (değerleme), KDB gerçekleşmiş (kapatma). İkisi de {{OBA1}}’de ayrı tanımlanır.' },
    ],

    ipuclari:[
      'Kur beslemesini kapanış kontrol listesine **madde olarak** ekle — kopukluk sessizdir.',
      '{{F.05}} test sonucundaki toplam kur farkını geçen ayla karşılaştır; sapma açıklanabilir olmalıdır.',
      'Değerleme belgeleri için **ayrı belge türü** kullan; ters kaydedilecekleri raporla ayırt edersin.',
      'Değerleme farkını bilanço düzeltme hesabına yaz; mutabakat hesabını dokunulmamış bırak.',
      'Net döviz pozisyonunu (dövizli varlık − dövizli borç) izle; kur riskinin büyüklüğü budur.',
      'Paralel defter varsa her defterin kendi değerleme yöntemi olduğunu doğrula — ' +
      'aynı kalemin iki defterde farklı fark üretmesi **doğrudur**.',
    ],

    quiz:[
      { soru:'Satıcıya verilen 50.000 EUR avans dönem sonunda değerlenmeli midir?',
        secenekler:[
          'Evet, tüm dövizli kalemler değerlenir',
          '**Hayır — avans parasal olmayan bir kalemdir**',
          'Yalnızca kur düşmüşse',
          'Yalnızca yıl sonunda',
        ], dogru:1,
        aciklama:'Avansın karşılığında **para değil mal** alınacaktır. ' +
                 'Kur ne olursa olsun 50.000 EUR’luk mal gelecek — geri para gelmeyecek. ' +
                 'Dolayısıyla **kur riski yoktur**.\n\n' +
                 'Değerlenirse gerçekte var olmayan bir kâr/zarar yaratılır ve ' +
                 'mal geldiğinde geri alınır → iki dönem birden yanlış olur.\n\n' +
                 '**SAP’ta önlem:** avans hesapları {{F.05}} ve {{OBA1}} değerleme listesine ' +
                 '**dâhil edilmemelidir**.' },

      { soru:'Dövizli satışta tahsilat günü kur yükseldi. Muhasebe kaydı dışında ne gerekir?',
        secenekler:[
          'Ek bir işlem gerekmez',
          '**Lehte fark için {{kur-farki-faturasi}} düzenlenir ve KDV hesaplanır**',
          'Değerleme ters kaydedilir',
          'Müşteriye dekont gönderilir, KDV’siz',
        ], dogru:1,
        aciklama:'Satıcı **daha fazla TL** tahsil etmiştir; bu ek tutar bedelin parçasıdır ve ' +
                 '**KDV’ye tabidir**. KDV oranı asıl işlemle aynıdır.\n\n' +
                 'Kur yükseldi → satıcı düzenler. Kur düştü → alıcı düzenler.\n\n' +
                 '**SAP kur farkını otomatik kaydeder ama bu faturayı üretmez.** ' +
                 'Muhasebe doğru, KDV eksik kalır — ayrı takip gerekir.' },

      { soru:'Yatırım (henüz aktifleştirilmemiş makine) borcunun kur farkı nereye yazılır?',
        secenekler:[
          'Her zaman 656 Kambiyo zararı',
          '**Aktifleştirme dönemi sonuna kadar varlığın maliyetine (258) eklenir**',
          'Hiç kaydedilmez',
          'Doğrudan özkaynağa',
        ], dogru:1,
        aciklama:'VUK uygulamasında yatırımın **aktifleştirildiği dönemin sonuna kadar** ' +
                 'oluşan kur farkları **maliyete eklenir**; sonrakiler ihtiyaridir.\n\n' +
                 'Sonucu: gider yazılmaz, **amortisman yoluyla** yıllara yayılır.\n\n' +
                 '**SAP bunu otomatik ayırmaz** — {{F.05}} farkı 656’ya yazar. ' +
                 'Yatırıma ait kısmın 258’e aktarılması **elle** yapılır ve ' +
                 'dönem sonu kontrol listesine konmalıdır.' },

      { soru:'Gerçekleşmemiş kur farkı hesabı dönem başında sıfır değilse ne anlama gelir?',
        secenekler:[
          'Normal bir durumdur',
          'Kur beslemesi eksiktir',
          '**Değerlemenin ters kaydı çalıştırılmamıştır**',
          'Vergi kodu yanlıştır',
        ], dogru:2,
        aciklama:'Değerleme farkı **geçicidir** ve ertesi gün ters kaydedilir. ' +
                 'Ters kayıt çalıştıysa gerçekleşmemiş kur farkı hesapları ' +
                 'dönem başında **sıfırlanmış** olmalıdır.\n\n' +
                 'Sıfır değilse ters kayıt atlanmıştır ve fark **çift sayılmış** olur.\n\n' +
                 'Bu, gerçekleşmiş/gerçekleşmemiş farkı **ayrı alt hesapta** izlemenin ' +
                 'somut faydasıdır: basit ve etkili bir dönem sonu kontrolü sağlar.' },

      { soru:'10.000 EUR’luk borç 35,00 kuruyla kaydedildi. Dönem sonunda kur 38,80. Değerleme sonrası borcun döviz tutarı nedir?',
        secenekler:['10.000 EUR','11.086 EUR','**10.000 EUR — değişmez**','9.021 EUR'],
        dogru:2,
        aciklama:'**Döviz tutarı hiç değişmez.** Borç 10.000 EUR olarak kalır; değişen yalnızca ' +
                 'yerel para karşılığıdır (350.000 → 388.000 TL). Değerleme kaydı döviz tarafında sıfırdır.' },

      { soru:'Dönem sonu değerlemesinde oluşan kur farkı neden ters kaydedilir?',
        secenekler:[
          'Vergi mevzuatı gerektirdiği için',
          '**Fark gerçekleşmemiştir — kalem henüz kapanmadı, kur geri dönebilir**',
          'Teknik bir zorunluluk',
          'Mutabakat hesabını korumak için',
        ], dogru:1,
        aciklama:'Değerleme bir **tahmindir**: "bugünkü kurla ölçersek durum bu". Kalem kapanmadığı için ' +
                 'fark gerçekleşmemiştir. Ters kaydedilmezse her ay üst üste değerleme birikir ve ' +
                 'ödeme anında gerçek fark hesaplanırken çift sayım olur.' },

      { soru:'Değerleme farkı neden mutabakat hesabına (320) değil ayrı bir düzeltme hesabına yazılır?',
        secenekler:[
          'Vergi hesaplaması için',
          '**Ana muhasebe bakiyesi ile muavin defter toplamı uyumlu kalsın diye**',
          'Daha hızlı olduğu için',
          'Zorunlu değildir',
        ], dogru:1,
        aciklama:'320’ye yazılırsa hesabın bakiyesi 3.880.000 TL olurken {{FBL1N}} muavin defter toplamı ' +
                 '3.500.000 TL kalır ve mutabakat kontrolü **kalıcı olarak bozulur**. ' +
                 'Ayrı düzeltme hesabı ({{OBA1}}’de tanımlanır) bu sorunu çözer.' },

      { soru:'{{TCURR}}’da 31 Ocak kuru yoksa dövizli bir fatura girildiğinde ne olur?',
        secenekler:[
          'Hata verir ve kayıt yapılamaz',
          '**Hata vermez — en yakın önceki tarihin kuru kullanılır**',
          'Kur 1,00 kabul edilir',
          'Kullanıcıdan kur girmesi istenir',
        ], dogru:1,
        aciklama:'Sistem, işlem tarihine **eşit veya ondan önceki en yakın** kuru kullanır ve ' +
                 'uyarı vermez. Besleme 3 gün kopmuşsa o günlerin işlemleri eski kurla kaydedilir ve ' +
                 'kimse fark etmez. Bu yüzden kur beslemesi izlenmelidir.' },

      { soru:'"Düşük değerle değerleme" (lowest value principle) ilkesi nedir?',
        secenekler:[
          'En düşük kur kullanılır',
          '**Gerçekleşmemiş zarar kaydedilir, gerçekleşmemiş kâr kaydedilmez**',
          'Yalnızca küçük tutarlar değerlenir',
          'Değerleme yapılmaz',
        ], dogru:1,
        aciklama:'İhtiyatlılık ilkesidir: olası zarar hemen kaydedilir, olası kâr gerçekleşene kadar beklenir. ' +
                 '{{OB59}}’da seçilir. IFRS ise genelde **her zaman değerle** ilkesini kullanır — ' +
                 'bu yüzden aynı şirket farklı defterlerde farklı yöntem kullanabilir.' },

      { soru:'{{OBA1}}’deki KDF ve KDB hesap anahtarları ne için kullanılır?',
        secenekler:[
          'KDF müşteri, KDB satıcı',
          '**KDF gerçekleşmemiş (değerleme), KDB gerçekleşmiş (kapatma) kur farkı**',
          'KDF kâr, KDB zarar',
          'KDF yerel, KDB grup para birimi',
        ], dogru:1,
        aciklama:'**KDF** ({{F.05}} değerlemesi) gerçekleşmemiş farkın hesabını, ' +
                 '**KDB** (ödeme/tahsilat kapatması) gerçekleşmiş farkın hesabını belirler. ' +
                 'Her ikisinde de kâr ve zarar hesapları ayrı tanımlanır.' },

      { soru:'Dövizli bir **banka hesabının** yerel karşılığı kur artışıyla yükseldi. Muhasebe etkisi nedir?',
        secenekler:[
          'Kambiyo zararı',
          '**Kambiyo kârı — varlık olduğu için**',
          'Etki yok',
          'Yalnızca döviz tutarı değişir',
        ], dogru:1,
        aciklama:'Aynı kur hareketi **borçta zarar, varlıkta kâr** yaratır. Dövizli borcun yerel karşılığı ' +
                 'artarsa daha çok ödeyeceksin demektir (zarar); dövizli varlığın yerel karşılığı artarsa ' +
                 'elindeki daha değerli demektir (kâr). Net döviz pozisyonu bu yüzden önemlidir.' },

      { soru:'S/4HANA’da paralel para birimi sayısı kaça çıktı?',
        secenekler:['3 (değişmedi)','5','**10**','Sınırsız'],
        dogru:2,
        aciklama:'ECC’de {{BSEG}} 3 para birimi destekliyordu (yerel + 2 ek). ' +
                 '{{ACDOCA}} bu sınırı **10’a** çıkardı. Pratik sonucu: konsolidasyon için ayrı çevrim ' +
                 'gerekmez, grup para birimi tutarı her satırda hazırdır.' },
    ],

    flashcards:[
      { on:'Kur farkı hangi hesaplara yazılır?', arka:'`646` **Kambiyo kârları** — kur lehte\n`656` **Kambiyo zararları** — kur aleyhte\n\nDöviz tutarı **hiç değişmez**; yalnızca TL karşılığı değişir.\n\nAlt hesap ayrımı önerilir:\n`.01` gerçekleşmemiş (ters kaydedilir)\n`.02` gerçekleşmiş (kalıcı)' },
      { on:'Hangi kalemler değerlenir?', arka:'**Değerlenir (parasal):**\n102 banka · 320 satıcı · 120 alıcı · krediler · senetler\n→ karşılığında **para** alınacak/ödenecek\n\n**Değerlenmez (parasal olmayan):**\n153 stok · 253 duran varlık · **159/340 avanslar**\n→ karşılığında **mal/hizmet**' },
      { on:'Avans neden değerlenmez?', arka:'50.000 EUR avans verdin, kur 35→40 oldu. Kâr ettin mi?\n\n**HAYIR** — sana **para** değil **mal** gelecek.\n\nDeğerlersen **var olmayan kâr** yaratırsın; mal gelince geri alınır → **iki dönem yanlış**.\n\nF.05/OBA1 listesine avans hesapları **konmaz**.' },
      { on:'Kur farkı faturası nedir? (Türkiye)', arka:'Dövizli satışta tahsilat günü **lehte** oluşan fark için düzenlenir ve **KDV hesaplanır**.\n\nKur yükseldi → **satıcı** düzenler\nKur düştü → **alıcı** düzenler\n\nKDV oranı asıl işlemle aynı.\n\n**SAP bunu üretmez** — muhasebe doğru, KDV eksik kalır.' },
      { on:'Yatırım dönemi kur farkı nereye?', arka:'**Aktifleştirme dönemi sonuna kadar → maliyete (258)**\nSonraki dönemler → **ihtiyari**\n\nSonuç: gider yazılmaz, **amortismanla** yayılır.\n\nSAP ayırmaz — F.05 hepsini 656’ya yazar. 258’e aktarım **elle**.' },
      { on:'Gerçekleşmemiş kur farkı hesabı dönem başında sıfır değilse?', arka:'**Ters kayıt çalıştırılmamıştır** → fark **çift sayılmış**.\n\nDeğerleme geçicidir, ertesi gün ters kaydedilir.\n\nBu kontrol, gerçekleşmiş/gerçekleşmemiş farkı **ayrı alt hesapta** izlemenin somut faydasıdır.' },

      { on:'Çevrim, değerleme ve gerçekleşme farkı nedir?', arka:'**Çevrim** — kayıt anında yerel paraya dönüştürme (bir kez)\n\n**Değerleme** — dönem sonunda güncel kurla yeniden ölçme (gerçekleşmemiş, ters kaydedilir)\n\n**Gerçekleşme** — kalem kapandığında farkın kesinleşmesi (kalıcı)' },
      { on:'Değerleme döviz tutarını değiştirir mi?', arka:'**Hayır — hiç değişmez.**\n\n10.000 EUR borç, 10.000 EUR olarak kalır.\n\nDeğişen yalnızca **yerel para karşılığıdır**. Değerleme kaydı döviz tarafında sıfırdır.' },
      { on:'Gerçekleşmemiş kur farkı neden ters kaydedilir?', arka:'Kalem henüz **kapanmadı**; kur geri dönebilir. Değerleme bir tahmindir.\n\nTers kaydedilmezse:\n• Her ay değerleme mükerrer birikir\n• Ödeme anında çift sayım olur' },
      { on:'Değerleme farkı hangi hesaba yazılmalı?', arka:'**Ayrı bir bilanço düzeltme hesabına** (örn. 321), mutabakat hesabına (320) **değil**.\n\nSebep: 320’ye yazılırsa ana muhasebe bakiyesi ile FBL1N muavin defter toplamı uyuşmaz ve mutabakat bozulur.' },
      { on:'OBA1’de KDF ve KDB nedir?', arka:'**KDF** — gerçekleşmemiş kur farkı (F.05 değerlemesi)\n**KDB** — gerçekleşmiş kur farkı (ödeme/tahsilat kapatması)\n\nHer ikisinde kâr ve zarar hesapları ayrı tanımlanır.' },
      { on:'TCURR’da kur yoksa sistem ne yapar?', arka:'**Hata vermez.**\n\nİşlem tarihine **eşit veya ondan önceki en yakın** kuru kullanır.\n\nSonuç: besleme koparsa yanlış kurla kayıt sessizce oluşur. Bu yüzden besleme izlenmelidir.' },
      { on:'Düşük değerle değerleme ilkesi nedir?', arka:'**İhtiyatlılık:** gerçekleşmemiş **zarar** kaydedilir, gerçekleşmemiş **kâr** kaydedilmez.\n\nOB59’da seçilir.\n\nIFRS genelde "her zaman değerle" kullanır — aynı şirket farklı defterlerde farklı yöntem kullanabilir.' },
      { on:'Aynı kur hareketi neden bazen kâr bazen zarar?', arka:'**Dövizli borç** → yerel karşılık artarsa **zarar** (daha çok ödeyeceksin)\n\n**Dövizli varlık** → yerel karşılık artarsa **kâr** (elindeki daha değerli)\n\nNet döviz pozisyonu = varlık − borç' },
      { on:'BSEG’de hangi tutar alanları vardır?', arka:'**WRBTR** — belge para birimi (100.000 EUR)\n**DMBTR** — yerel para (3.500.000 TL)\n**DMBE2 / DMBE3** — paralel para birimleri\n**KURSF** — kullanılan kur\n\nS/4HANA’da ACDOCA 10 para birimine kadar.' },
      { on:'Kur yapılandırmasının üç katmanı nedir?', arka:'1. **OB08** → TCURR — kurların kendisi\n2. **OB59** → değerleme yöntemi (kur tipi, ilke, ters kayıt)\n3. **OBA1** → kur farkı hesap belirleme (KDF/KDB)\n\nHerhangi biri eksikse değerleme durur.' },
      { on:'F.05 ne zaman çalıştırılmalı?', arka:'**Tüm dövizli işlemler kaydedildikten sonra**, mali tablolardan önce.\n\nSonradan gelen bir dövizli fatura değerlenmemiş kalır ve kapanış tekrarlanır.\n\nHer zaman **önce test modu**.' },
      { on:'Paralel defter varsa değerleme nasıl yapılır?', arka:'**Her defter için ayrı** çalıştırılır (FAGL_FC_VAL).\n\nHer defter kendi yöntemini kullanabilir: yerel defterde ihtiyatlılık, IFRS defterinde simetrik.\n\nAynı kalemin iki defterde farklı fark üretmesi **doğrudur**.' },
    ],
  },

  },
});
