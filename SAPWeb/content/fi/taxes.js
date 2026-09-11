/* ==========================================================================
   content/fi/taxes.js — "Taxes (Vergiler)"
   ========================================================================== */

SAP.registerTopic({
  id: 'taxes',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'SAP’ta vergi, **iki karakterlik bir vergi koduyla** yönetilir. Kullanıcı faturayı girerken ' +
      'yalnızca kodu seçer ({{FTXP}}’de tanımlı); sistem oranı uygular, vergi tutarını hesaplar, ' +
      'doğru hesaba kaydeder ve {{BSET}} tablosuna beyan için ayrı bir satır yazar.\n\n' +
      'Vergi kodu **üç şeyi birden** taşır: **oran** (%20, %10, %0), **tip** (A = çıkış/hesaplanan, ' +
      'V = giriş/indirilecek) ve **hesap ataması** ({{OB40}} üzerinden hangi G/L hesabına gideceği).\n\n' +
      'Bu üçlü tek kodda birleştiği için kullanıcı hata yapamaz: yanlış oran giremez, ' +
      'vergiyi yanlış hesaba yazamaz. Ama **yanlış kodu seçebilir** — ve vergi konusundaki ' +
      'hataların neredeyse tamamı budur.',

    neden:
      '**Yasal zorunluluk.** KDV beyannamesi belge belge değil, vergi kodu bazında toplanarak verilir.\n\n' +
      '**İndirim hakkı.** Alışta ödenen KDV (indirilecek) ile satışta tahsil edilen KDV (hesaplanan) ' +
      'ayrı hesaplarda izlenmezse mahsup yapılamaz.\n\n' +
      '**Denetlenebilirlik.** {{BSET}} tablosu her verginin matrahını ve tutarını ayrı tutar; ' +
      'vergi incelemesinde istenen ilk döküm budur.\n\n' +
      '**Hata önleme.** Oranı kullanıcıya elle girdirmek yerine koda bağlamak, ' +
      'binlerce faturada tutarlılık sağlar.',

    sirketOnemi:
      'Vergi, **yanlış yapıldığında geriye dönük düzeltilmesi en pahalı** FI alanıdır: ' +
      'beyanname verilmiştir, ödeme yapılmıştır, düzeltme beyannamesi ve ceza riski doğar.\n\n' +
      'Danışman açısından kritik nokta şu: vergi hataları **muhasebe hatası gibi görünmez**. ' +
      'Fiş dengelidir, mizan tutar, hiçbir alarm çalmaz. Yalnızca beyanname hazırlanırken ' +
      'ya da denetimde ortaya çıkar.\n\n' +
      'Ayırt edici soru şudur: **"İndirilemeyen KDV nereye kaydedilir?"** ' +
      'Doğru cevap: ayrı bir vergi hesabına **değil**, **giderin veya varlığın maliyetine** — ' +
      'çünkü indirilemiyorsa o bir vergi alacağı değil, gerçek bir maliyettir.',

    gercekHayat:
      'Bir şirket binek otomobil kiralıyor. Fatura geliyor: 10.000 TL + %20 KDV = 12.000 TL.\n\n' +
      'Muhasebeci alışkanlıkla **V1 (indirilecek %20)** kodunu seçiyor. Fiş dengeli, kayıt geçiyor, ' +
      'hiçbir hata mesajı yok.\n\n' +
      'Ama Türk vergi mevzuatında binek otomobil kiralama KDV’si **indirilemez**. ' +
      'Doğru kod indirilemeyen KDV kodudur ve o kod 2.000 TL’yi ayrı bir vergi hesabına değil, ' +
      '**gider hesabına** eklemelidir: gider 10.000 değil 12.000 TL olmalıdır.\n\n' +
      'Sonuç: 12 ay boyunca her ay 2.000 TL fazla KDV indirimi alındı, gider 24.000 TL eksik yazıldı. ' +
      'Fark denetimde çıktı; düzeltme beyannamesi ve gecikme faizi ödendi.\n\n' +
      '**Ders:** vergi kodu seçimi bir muhasebe kararıdır, bir tuş alışkanlığı değil.',

    muhasebeMantigi:
      'KDV, işletme için bir **gelir veya gider değildir** — devlet adına tahsil edilen ' +
      'veya devletten alacaklı olunan bir tutardır. Bu yüzden gelir tablosunda değil ' +
      '**bilançoda** izlenir.\n\n' +
      '**Hesaplanan KDV (satışta tahsil edilen):** işletmenin devlete **borcudur** → kaynak hesabı (391).\n\n' +
      '**İndirilecek KDV (alışta ödenen):** işletmenin devletten **alacağıdır** → varlık hesabı (191).\n\n' +
      'Ay sonunda ikisi mahsuplaşır. Hesaplanan > indirilecek ise fark **ödenecek KDV** olur (360); ' +
      'tersi ise **devreden KDV** olarak sonraki aya taşınır.\n\n' +
      '**İndirilemeyen KDV bu mantığın dışındadır:** indirilemiyorsa devletten alacak değildir, ' +
      'dolayısıyla varlık da değildir. O yüzden ilgili **giderin veya varlığın maliyetine eklenir**.',

    kavramlar: ['vergi-kodu', 'matrah', 'tevkifat', 'hesap-belirleme', 'belge-turu'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Vergi süreci iki katmanlıdır: **yapılandırma** (bir kez, danışman yapar) ve ' +
      '**günlük kullanım** (her faturada, kullanıcı yapar). Ay sonunda üçüncü bir katman gelir: ' +
      '**beyan ve mahsup**.',

    roller:[
      { rol:'FI danışmanı', gorev:'{{FTXP}} ile vergi kodlarını, {{OB40}} ile hesap atamalarını tanımlar.' },
      { rol:'Muhasebe kullanıcısı', gorev:'Fatura girerken doğru vergi kodunu seçer. **Sürecin en kritik kararı budur.**' },
      { rol:'Vergi sorumlusu', gorev:'Ay sonunda {{S_ALR_87012357}} ile beyan raporunu alır, kontrol eder.' },
      { rol:'Ana muhasebe', gorev:'KDV mahsup kaydını yapar, ödenecek/devreden KDV’yi belirler.' },
      { rol:'Denetçi', gorev:'{{BSET}} dökümünü ister; beyanname ile mizanı karşılaştırır.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Vergi kodundan beyannameye',
      adimlar:[
        { ic:'⚙️', rol:'Danışman', baslik:'Vergi kodu tanımlanır ({{FTXP}})',
          aciklama:'Ülke + kod + oran + tip (A/V). Kod {{T007A}} tablosuna yazılır. ' +
                   '**Bir kez yapılır, sonra hiç değişmemelidir** (bkz. teknik bölümü).',
          cikti:'Vergi kodu', ok:'hesap atanır' },
        { ic:'🔗', rol:'Danışman', baslik:'Hesap atanır ({{OB40}})',
          aciklama:'İşlem anahtarı bazında: **MWS** hesaplanan, **VST** indirilecek, **NAV** indirilemeyen. ' +
                   'Sonuç {{T030K}} tablosuna yazılır.',
          cikti:'Vergi hesabı eşleşmesi', ok:'kullanıma açılır' },
        { ic:'🧾', rol:'Kullanıcı', baslik:'Fatura girilir — **kod seçilir**',
          aciklama:'{{FB60}} / {{FB70}} / {{MIRO}} ekranında vergi kodu seçilir. ' +
                   'Sistem oranı uygular, tutarı hesaplar. **Sürecin tek insan kararı burada.**',
          cikti:'Vergi satırı', ok:'kaydedilir' },
        { ic:'💾', rol:'Sistem', baslik:'{{BSET}} tablosuna yazılır',
          aciklama:'Matrah ve vergi tutarı **{{BSEG}}’den ayrı** bir tabloya kaydedilir. ' +
                   'Beyanname bu tablodan üretilir.',
          cikti:'Vergi kaydı', ok:'ay sonu' },
        { ic:'📊', rol:'Vergi sorumlusu', baslik:'Beyan raporu alınır ({{S_ALR_87012357}})',
          aciklama:'Vergi koduna göre hesaplanan ve indirilecek KDV özetlenir; ' +
                   'rapor **mizanla karşılaştırılır**.',
          cikti:'Beyan verisi', ok:'mahsup yapılır' },
        { ic:'⚖️', rol:'Ana muhasebe', baslik:'KDV mahsubu ({{FB50}})',
          aciklama:'391 borçlandırılır, 191 alacaklandırılır. Fark **ödenecek** (360) ' +
                   'veya **devreden** KDV olur.',
          cikti:'Mahsup fişi' },
      ],
    },

    adimlar:[
      { rol:'Danışman', eylem:'Vergi kodunu tanımlar', sistem:'{{FTXP}} → {{T007A}}' },
      { rol:'Danışman', eylem:'Vergi hesabını atar', sistem:'{{OB40}} → {{T030K}}' },
      { rol:'Danışman', eylem:'İzinli kodları sınırlar', sistem:'{{OBZT}} — kullanıcı hatasını azaltır' },
      { rol:'Kullanıcı', eylem:'Faturada vergi kodunu seçer', sistem:'{{FB60}}, {{FB70}}, {{MIRO}}' },
      { rol:'Sistem', eylem:'Vergiyi hesaplar ve yazar', sistem:'{{BSEG}} + {{BSET}}' },
      { rol:'Vergi sorumlusu', eylem:'Beyan raporunu alır', sistem:'{{S_ALR_87012357}}' },
      { rol:'Vergi sorumlusu', eylem:'Raporu mizanla karşılaştırır', sistem:'{{FBL3N}} — 191 ve 391 bakiyeleri' },
      { rol:'Ana muhasebe', eylem:'Mahsup kaydını yapar', sistem:'{{FB50}}' },
    ],

    veriAkisi:{
      nereden:'Vergi kodu tanımı ({{T007A}}), hesap ataması ({{T030K}}), faturadaki matrah.',
      nereye:'{{BSET}} vergi satırları, {{BSEG}} vergi kalemi, 191/391 hesapları, beyanname.',
      tetikleyen:'Vergi kodu içeren her belge kaydı.',
      sonraki:'Ay sonu mahsup, beyanname, ödeme.',
    },

    notlar:[
      { tip:'warn', baslik:'Vergi hatası hiçbir alarm üretmez', metin:
        'Yanlış vergi kodu seçildiğinde fiş **dengelidir**, mizan **tutar**, ' +
        'hiçbir hata mesajı çıkmaz. Sistem "bu kod bu işlem için yanlış" diyemez — ' +
        'çünkü hangi kodun doğru olduğu **mevzuat bilgisidir**, sistem bilgisi değil.\n\n' +
        'Bu yüzden vergi kontrolü **rapor karşılaştırmasıyla** yapılır: ' +
        '{{S_ALR_87012357}} beyan raporundaki toplamlar, {{FBL3N}}’deki 191 ve 391 hesap ' +
        'bakiyeleriyle **birebir tutmalıdır**. Tutmuyorsa ya elle vergi hesabına kayıt atılmıştır ' +
        'ya bir belge vergi kodsuz girilmiştir.\n\n' +
        'Önleyici tedbir: {{OBZT}} ile hangi işlemde hangi kodun seçilebileceğini sınırlamak.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'KDV muhasebesinin tek cümlelik özeti: **alışta ödenen vergi varlıktır, satışta tahsil edilen ' +
      'vergi borçtur, ay sonunda mahsuplaşırlar.** İstisna: indirilemeyen KDV — o varlık değil maliyettir.',

    etkilenenHesaplar:[
      { hesap:'191 İndirilecek KDV', tur:'Bilanço — Varlık', neden:'Alışta ödenen, devletten alacaklı olunan KDV. {{OB40}} → **VST**.' },
      { hesap:'391 Hesaplanan KDV', tur:'Bilanço — Kaynak', neden:'Satışta tahsil edilen, devlete borç olan KDV. {{OB40}} → **MWS**.' },
      { hesap:'360 Ödenecek vergi ve fonlar', tur:'Bilanço — Kaynak', neden:'Mahsup sonrası devlete ödenecek net KDV.' },
      { hesap:'190 Devreden KDV', tur:'Bilanço — Varlık', neden:'İndirilecek > hesaplanan ise fark sonraki döneme taşınır.' },
      { hesap:'İlgili gider/varlık hesabı', tur:'Değişken', neden:'**İndirilemeyen KDV** ayrı hesaba değil, maliyetin içine gider. {{OB40}} → **NAV**.' },
      { hesap:'360 Ödenecek stopaj', tur:'Bilanço — Kaynak', neden:'{{tevkifat}} — satıcıya ödenmeyip vergi dairesine yatırılacak kesinti.' },
    ],

    fisler:[
      { baslik:'Alış faturası — indirilecek KDV (V1, %20)',
        belgeTuru:'KR', tarih:'10.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:10000, not:'Matrah — {{BSET}} `HWBAS`' },
          { hesap:'191', ad:'İndirilecek KDV', borc:2000, not:'{{OB40}} → **VST** · devletten alacak' },
          { hesap:'320', ad:'Satıcılar', alacak:12000, not:'{{LFB1}} `AKONT`' },
        ],
        not:'Gider **10.000** TL’dir, 12.000 değil. KDV gidere dâhil edilmez çünkü ' +
             'devletten geri alınacaktır — bu yüzden **varlık** olarak kaydedilir.' },

      { baslik:'Satış faturası — hesaplanan KDV (A1, %20)',
        belgeTuru:'DR', tarih:'12.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar', borc:36000 },
          { hesap:'600', ad:'Yurtiçi satışlar', alacak:30000, not:'Matrah' },
          { hesap:'391', ad:'Hesaplanan KDV', alacak:6000, not:'{{OB40}} → **MWS** · devlete borç' },
        ],
        not:'Gelir **30.000** TL’dir. Tahsil edilen 6.000 TL KDV işletmenin geliri değil, ' +
             'devlet adına tahsil edilmiş bir tutardır.' },

      { baslik:'**İndirilemeyen KDV** — vergi maliyete eklenir',
        belgeTuru:'KR', tarih:'15.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri (binek oto kirası)', borc:12000, not:'**Matrah + KDV** — {{OB40}} → **NAV**' },
          { hesap:'320', ad:'Satıcılar', alacak:12000 },
        ],
        not:'**191 hesabı hiç kullanılmadı.** İndirilemeyen KDV devletten alacak olmadığı için ' +
             'varlık değildir; gerçek bir maliyettir ve gidere eklenir.\n\n' +
             'Dikkat: gider 10.000 değil **12.000** TL. Bu, vergi konusundaki en sık ' +
             'kavram hatasının doğru hâlidir.' },

      { baslik:'Sabit kıymet alımında indirilemeyen KDV',
        belgeTuru:'KR', tarih:'15.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'254', ad:'Taşıtlar (binek otomobil)', borc:1200000, not:'**Matrah + KDV** — amortismana tabi tutar' },
          { hesap:'320', ad:'Satıcılar', alacak:1200000 },
        ],
        not:'Aynı mantık varlık alımında daha da önemlidir: indirilemeyen KDV ' +
             '**varlığın maliyetine** girer, dolayısıyla **amortismana da tabi olur**. ' +
             '191’e yazılsaydı hem KDV yanlış indirilecek hem amortisman eksik hesaplanacaktı.' },

      { baslik:'Ay sonu KDV mahsubu — ödenecek KDV çıkan durum',
        belgeTuru:'SA', tarih:'31.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'391', ad:'Hesaplanan KDV', borc:180000, not:'Hesap sıfırlanır' },
          { hesap:'191', ad:'İndirilecek KDV', alacak:145000, not:'Hesap sıfırlanır' },
          { hesap:'360', ad:'Ödenecek vergi ve fonlar', alacak:35000, not:'Devlete ödenecek net tutar' },
        ],
        not:'Hesaplanan (180.000) > indirilecek (145.000) olduğu için fark **ödenir**. ' +
             'Her iki KDV hesabı da mahsup sonrası **sıfırlanır** — bu, ay sonu ' +
             'kontrol noktalarından biridir.' },

      { baslik:'Ay sonu KDV mahsubu — devreden KDV çıkan durum',
        belgeTuru:'SA', tarih:'30.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'391', ad:'Hesaplanan KDV', borc:90000 },
          { hesap:'190', ad:'Devreden KDV', borc:22000, not:'Sonraki döneme taşınacak alacak' },
          { hesap:'191', ad:'İndirilecek KDV', alacak:112000 },
        ],
        not:'İndirilecek (112.000) > hesaplanan (90.000) olduğu için ödeme çıkmaz; ' +
             'fark **190 Devreden KDV** olarak varlıkta kalır ve sonraki ay indirilecek KDV’ye eklenir.\n\n' +
             'Yatırım yapılan dönemlerde bu durum aylarca sürebilir.' },

      { baslik:'{{tevkifat}} — stopajlı hizmet faturası',
        belgeTuru:'KR', tarih:'20.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Danışmanlık gideri', borc:100000 },
          { hesap:'191', ad:'İndirilecek KDV', borc:20000 },
          { hesap:'320', ad:'Satıcılar', alacak:100000, not:'Satıcıya **fiilen ödenecek** tutar' },
          { hesap:'360', ad:'Ödenecek stopaj (%20)', alacak:20000, not:'Vergi dairesine yatırılacak' },
        ],
        not:'Fatura tutarı 120.000 TL ama satıcıya 100.000 TL ödenir. ' +
             'Aradaki 20.000 TL kesilip **doğrudan vergi dairesine** yatırılır.\n\n' +
             'Satıcının borcu 120.000 değil 100.000 görünür — çünkü kalan kısım artık ' +
             'satıcıya değil devlete borçtur.' },
    ],

    tHesaplar:[
      { hesap:'İndirilecek KDV', kod:'191 (varlık)',
        borc:[{ ad:'Alış faturaları', tutar:145000 }],
        alacak:[{ ad:'Ay sonu mahsup', tutar:145000 }],
        not:'Mahsup sonrası **sıfırlanır**' },
      { hesap:'Hesaplanan KDV', kod:'391 (kaynak)',
        borc:[{ ad:'Ay sonu mahsup', tutar:180000 }],
        alacak:[{ ad:'Satış faturaları', tutar:180000 }],
        not:'Mahsup sonrası **sıfırlanır**' },
      { hesap:'Ödenecek vergi ve fonlar', kod:'360 (kaynak)',
        borc:[{ ad:'Vergi dairesine ödeme', tutar:35000 }],
        alacak:[{ ad:'KDV mahsubu', tutar:35000 }, { ad:'Stopaj kesintileri', tutar:20000 }],
        not:'Ödeme yapılana kadar borç' },
    ],

    notlar:[
      { tip:'tip', baslik:'"KDV gider midir?" — üç farklı cevap', metin:
        'Bu sorunun tek bir cevabı yoktur; duruma göre değişir:\n\n' +
        '**1. İndirilebiliyorsa → hayır, varlıktır.** Devletten geri alınacaktır (191).\n\n' +
        '**2. İndirilemiyorsa → evet, ama ayrı bir gider değil.** ' +
        'İlgili giderin veya varlığın **maliyetine eklenir**. Ayrı bir "KDV gideri" hesabı açmak ' +
        'yanlıştır: maliyet o kalemin gerçek maliyetidir.\n\n' +
        '**3. Satışta tahsil edilen → hiçbiri, borçtur.** İşletmenin geliri değildir (391).\n\n' +
        'Üç durumun da ortak mantığı: KDV bir **aracılık** işlemidir; işletme devlet adına ' +
        'tahsil eder veya devletten alacaklanır. Yalnızca indirilemediğinde gerçek bir ' +
        'kaynak çıkışına dönüşür.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Vergi kodları üç eksende çeşitlenir: **yön** (giriş/çıkış), **indirilebilirlik** ve ' +
      '**hesaplama biçimi**. Türkiye kurulumlarında ayrıca {{tevkifat}} dördüncü bir eksen ekler.',

    liste:[
      { ad:'Çıkış vergisi (hesaplanan)', en:'Output Tax — tip A',
        aciklama:'Satışta müşteriden tahsil edilen KDV. Devlete borçtur.',
        neZaman:'Her satış faturasında, alacak dekontunda.',
        ornek:'A1 = %20 hesaplanan KDV → 391 hesabı. {{OB40}} → **MWS**.',
        tcodes:['FTXP','OB40'] },

      { ad:'Giriş vergisi (indirilecek)', en:'Input Tax — tip V',
        aciklama:'Alışta satıcıya ödenen KDV. Devletten alacaktır.',
        neZaman:'Her alış faturasında, {{MIRO}} kaydında.',
        ornek:'V1 = %20 indirilecek KDV → 191 hesabı. {{OB40}} → **VST**.',
        tcodes:['FTXP','OB40'] },

      { ad:'İndirilemeyen giriş vergisi', en:'Non-deductible Input Tax',
        aciklama:'Ödenen ama indirilemeyen KDV. Ayrı hesaba değil, **maliyete** eklenir.',
        neZaman:'Binek otomobil, temsil-ağırlama gibi mevzuatın indirimine izin vermediği harcamalar.',
        ornek:'{{OB40}} → **NAV** anahtarı; sistem KDV’yi gider/varlık satırına ekler.',
        tcodes:['FTXP','OB40'] },

      { ad:'Kısmen indirilebilen vergi', en:'Partially Deductible',
        aciklama:'KDV’nin bir kısmı indirilir, kalanı maliyete eklenir.',
        neZaman:'Hem vergiye tabi hem istisna faaliyeti olan işletmelerde (kısmi istisna).',
        ornek:'%60 indirilebilir tanımlanan bir kodda 2.000 TL KDV’nin 1.200’ü 191’e, 800’ü gidere gider.' },

      { ad:'Sıfır oranlı vergi', en:'Zero-rated — %0',
        aciklama:'Oran %0 ama işlem **vergiye tabidir**; beyannamede matrah olarak görünür.',
        neZaman:'İhracat, ihraç kayıtlı teslim, bazı teşvikli işlemler.',
        ornek:'Matrah beyan edilir, vergi 0 TL. **Vergisiz işlemle karıştırılmamalıdır.**' },

      { ad:'Vergisiz / istisna', en:'Exempt / Not Taxable',
        aciklama:'İşlem vergi kapsamı **dışındadır**; matrah da beyannamede farklı satırda raporlanır.',
        neZaman:'Kanunen istisna işlemler.',
        ornek:'Sıfır oranlıdan farkı **beyannamedeki yeridir** — muhasebe kaydı aynı görünür.' },

      { ad:'{{tevkifat}} (stopaj)', en:'Withholding Tax',
        aciklama:'Ödeyenin, ödeyeceği tutardan vergiyi kesip doğrudan vergi dairesine yatırması.',
        neZaman:'Serbest meslek ödemeleri, kira, bazı hizmet alımları, yurt dışı ödemeler.',
        ornek:'Satıcı ana verisinde tevkifat tipi ve kodu tanımlı olmalıdır — yoksa kesinti yapılmaz.',
        tcodes:['FB60','F110'] },

      { ad:'Otomatik hesaplama', en:'Calculate Tax Automatically',
        aciklama:'Kullanıcı yalnızca kodu seçer; sistem matrahtan vergiyi hesaplar.',
        neZaman:'Normal akış — **tercih edilen yöntem**.',
        ornek:'Kayıt ekranındaki "Vergiyi hesapla" kutusu işaretlenir.' },

      { ad:'Elle vergi girişi', en:'Manual Tax Entry',
        aciklama:'Kullanıcı vergi tutarını kendisi yazar; sistem hesaplamaz.',
        neZaman:'Yuvarlama farkı olan faturalar, sistemin oranı birebir tutturamadığı durumlar.',
        ornek:'**Riskli:** kullanıcı hatası doğrudan beyana yansır. Tolerans sınırı tanımlanmalıdır.' },
    ],

    karsilastirmaBasliklar:['Sıfır oranlı (%0)', 'Vergisiz (istisna)'],
    karsilastirma:[
      ['Vergi kapsamı', 'Kapsam **içinde**', 'Kapsam **dışında**'],
      ['Oran', '%0', 'Yok'],
      ['Matrah beyanı', 'Beyannamede matrah olarak görünür', 'Ayrı satırda / hiç görünmez'],
      ['Muhasebe kaydı', 'Vergi satırı 0 TL', 'Vergi satırı yok'],
      ['İndirim hakkı etkisi', 'Genelde etkilemez', 'Kısmi istisnada indirimi **sınırlar**'],
      ['Tipik kullanım', 'İhracat, ihraç kayıtlı', 'Kanuni istisnalar'],
      ['{{BSET}} kaydı', '**Oluşur** (tutar 0)', 'Genelde oluşmaz'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FTXP', ad:'Vergi kodu tanımla — vergi yapılandırmasının merkezi',
        amac:'Ülke bazında vergi kodlarını, oranlarını ve tiplerini tanımlar.',
        neZaman:'Kurulumda; yeni oran veya yeni istisna tipi geldiğinde.',
        adimlar:[
          { baslik:'Ülkeyi gir', aciklama:'Vergi kodları **ülkeye bağlıdır**; TR için tanımlanan kod DE’de geçerli değildir.' },
          { baslik:'Vergi kodunu gir', aciklama:'İki karakter. Yerleşik kural: **A** ile başlayanlar çıkış, **V** ile başlayanlar giriş.' },
          { baslik:'Vergi tipini seç', aciklama:'**A** = çıkış (hesaplanan), **V** = giriş (indirilecek). Kaydedildikten sonra değişmez.' },
          { baslik:'Oranı gir', aciklama:'İlgili işlem anahtarı satırına yüzde yazılır (MWS / VST / NAV).' },
          { baslik:'Hesap atamasını kontrol et', aciklama:'Ekrandan {{OB40}}’a geçilerek hesap doğrulanır.' },
        ],
        ekranAkisi:[
          { ekran:'Ülke', islem:'TR' },
          { ekran:'Vergi kodu', islem:'V1 · "İndirilecek KDV %20"' },
          { ekran:'Özellikler', islem:'Vergi tipi = **V**' },
          { ekran:'Oranlar', islem:'VST satırı → 20,000' },
          { ekran:'Hesaplar', islem:'{{OB40}} → VST → 191000' },
        ],
        alanlar:{
          zorunlu:['Ülke','Vergi kodu','Vergi tipi (A/V)','Oran'],
          opsiyonel:['Hedef vergi kodu','İndirilebilirlik yüzdesi','Beyan bölümü'] },
        hatalar:[
          { mesaj:'Tax code ... does not exist in company code country', sebep:'Kod başka ülke için tanımlanmış.', cozum:'Şirket kodunun ülkesini ({{OBY6}}) kontrol et; kodu doğru ülkede tanımla.' },
          { mesaj:'Tax code ... has no account assignment', sebep:'{{OB40}}’ta hesap atanmamış.', cozum:'{{OB40}} ile ilgili işlem anahtarına (MWS/VST/NAV) hesap ata.' },
        ],
        ipucu:'**Kullanılmaya başlanmış bir vergi kodunun oranı asla değiştirilmemelidir.** ' +
              'Değiştirilirse geçmiş belgeler eski oranla, yeniler yeni oranla kalır ama ' +
              '**rapor ikisini aynı kod altında toplar** — beyan tutarsız çıkar ve sebebi ' +
              'aylar sonra anlaşılır. Oran değişikliğinde **yeni kod** açılır (bkz. Teknik bölümü).',
        ilgili:['OB40','FTXA','BSET','T007A'] },

      { kod:'OB40', ad:'Vergi hesap belirleme',
        amac:'Hangi vergi işleminin hangi G/L hesabına kaydedileceğini tanımlar.',
        neZaman:'Yeni vergi kodu tanımlandıktan hemen sonra.',
        adimlar:[
          { baslik:'İşlem anahtarını seç',
            aciklama:'**MWS** hesaplanan KDV · **VST** indirilecek KDV · **NAV** indirilemeyen (maliyete eklenir).' },
          { baslik:'Hesap planını gir' },
          { baslik:'Kurallara göre ayrıştır',
            aciklama:'İsteğe bağlı: vergi koduna göre farklı hesap kullanılabilir ' +
                     '(örneğin %20 ve %10 için ayrı hesaplar).' },
          { baslik:'G/L hesabını ata', aciklama:'Sonuç {{T030K}} tablosuna yazılır.' },
        ],
        alanlar:{ zorunlu:['İşlem anahtarı','Hesap planı','G/L hesabı'], opsiyonel:['Vergi koduna göre ayrım'] },
        hatalar:[
          { mesaj:'Error in account determination: table T030K key TR MWS', sebep:'Vergi hesabı atanmamış.', cozum:'{{OB40}} → MWS → hesap ata. SD faturalarındaki en sık vergi hatasıdır.' },
        ],
        ipucu:'Vergi hesapları {{FS00}}’da **"yalnızca otomatik kayıt"** işaretiyle açılmalıdır. ' +
              'Böylece kullanıcı elle kayıt atamaz — bu, beyan ile mizanın tutmasını garanti eden ' +
              'en basit ve en etkili tedbirdir.',
        ilgili:['FTXP','T030K','FS00'] },

      { kod:'S_ALR_87012357', ad:'KDV beyan raporu',
        amac:'Dönem içindeki hesaplanan ve indirilecek KDV’yi vergi koduna göre özetler.',
        neZaman:'Her ay, beyanname öncesi; ayrıca denetim taleplerinde.',
        adimlar:[
          { baslik:'Şirket kodu ve dönemi gir' },
          { baslik:'Raporu çalıştır', aciklama:'Vergi kodu bazında matrah ve vergi tutarları listelenir.' },
          { baslik:'**Mizanla karşılaştır**',
            aciklama:'Rapordaki hesaplanan KDV toplamı = {{FBL3N}}’de 391 bakiyesi; ' +
                     'indirilecek toplam = 191 bakiyesi. **Birebir tutmalıdır.**' },
          { baslik:'Fark varsa araştır',
            aciklama:'Genelde iki sebep: vergi hesabına **elle** kayıt atılmış ya da ' +
                     'bir belge vergi kodsuz girilmiş.' },
        ],
        ipucu:'Bu rapor {{BSET}} tablosundan üretilir, {{BSEG}}’den değil. ' +
              'Vergi hesabına elle atılan bir kayıt {{BSEG}}’i etkiler ama {{BSET}}’e satır yazmaz — ' +
              'işte rapor ile mizanın ayrışmasının en yaygın sebebi budur.',
        hatalar:[
          { mesaj:'Rapor toplamı ile hesap bakiyesi tutmuyor', sebep:'Vergi hesabına elle kayıt atılmış veya vergi kodsuz belge var.', cozum:'{{FBL3N}}’de 191/391 hesabında **belge türü SA** olan satırları ara; genelde suçlu odur.' },
        ],
        ilgili:['FBL3N','BSET','FTXP'] },

      { kod:'F.12', ad:'Vergi dökümü (advance return listesi)',
        amac:'Belge bazında vergi kalemlerini listeler; beyan raporundaki tutarın hangi belgelerden geldiğini gösterir.',
        neZaman:'Beyan raporundaki bir tutarı kırmak gerektiğinde; denetimde.',
        adimlar:[
          { baslik:'Şirket kodu, dönem ve vergi kodunu gir' },
          { baslik:'Raporu çalıştır', aciklama:'Belge belge matrah ve vergi tutarı görünür.' },
          { baslik:'Şüpheli belgeye çift tıkla', aciklama:'{{FB03}} ile belgeye geçilir.' },
        ],
        ipucu:'Beyan raporu ile mizan tutmadığında teşhis sırası: ' +
              '**1)** {{S_ALR_87012357}} ile toplamı gör, **2)** {{F.12}} ile belge kırılımını al, ' +
              '**3)** {{FBL3N}} ile hesap hareketlerini al, **4)** iki listeyi karşılaştır — ' +
              'farkta kalan belge suçludur.',
        ilgili:['S_ALR_87012357','FB03','FBL3N'] },

      { kod:'OBZT', ad:'İşlem bazında izinli vergi kodları',
        amac:'Hangi vergi kodunun hangi işlemde seçilebileceğini sınırlar.',
        neZaman:'Kullanıcı hatalarını azaltmak için; özellikle çok sayıda kod varsa.',
        adimlar:[
          { baslik:'İşlem tipini seç', aciklama:'Giriş vergisi / çıkış vergisi.' },
          { baslik:'İzinli kodları listele', aciklama:'Kullanıcı yalnızca bu kodları görebilir.' },
        ],
        ipucu:'Basit ama etkili bir önlem: satış işlemlerinde yalnızca **A** kodlarının, ' +
              'alış işlemlerinde yalnızca **V** kodlarının seçilebilmesi, ' +
              'yön hatasını tamamen ortadan kaldırır.',
        ilgili:['FTXP','FB60','FB70'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Verginin tablo mimarisinde anlaşılması gereken **tek kritik nokta** şudur: ' +
      'vergi bilgisi {{BSEG}}’de değil, **{{BSET}}’te** tutulur. ' +
      'Beyanname {{BSET}}’ten üretilir. Bu ayrım, "rapor ile mizan neden tutmuyor?" ' +
      'sorusunun cevabıdır.',

    liste:[
      { ad:'BSET', baslik:'Vergi satırları — beyannamenin kaynağı',
        tutar:'Her belgenin vergi bilgisi: matrah, vergi tutarı, vergi kodu, işlem anahtarı.',
        olusturan:'Vergi kodu içeren her FI belgesi',
        guncelleyen:'Belge kaydı; ters kayıt yeni satır ekler',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{BKPF}} ile belge anahtarı üzerinden; {{T007A}} ile vergi kodu üzerinden.',
        s4:'Duruyor. {{ACDOCA}} vergi tutarını taşır ama **beyan hâlâ BSET’e dayanır**.',
        alanlar:[
          { ad:'HWBAS', aciklama:'**Matrah** (yerel para) — verginin üzerinden hesaplandığı tutar' },
          { ad:'HWSTE', aciklama:'**Vergi tutarı** (yerel para)' },
          { ad:'MWSKZ', aciklama:'Vergi kodu', tip:'fk' },
          { ad:'KTOSL', aciklama:'İşlem anahtarı — MWS / VST / NAV' },
          { ad:'KSCHL', aciklama:'Koşul türü — hesaplama prosedüründen gelir' },
        ] },

      { ad:'T007A', baslik:'Vergi kodu tanımları',
        tutar:'{{FTXP}} ile tanımlanan kodların ülke, tip ve prosedür bilgisi.',
        olusturan:'{{FTXP}}',
        guncelleyen:'{{FTXP}}',
        anahtar:'KALSM + MWSKZ',
        iliskiler:'{{BSET}} `MWSKZ` bu tabloya bakar.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KALSM', aciklama:'Vergi hesaplama prosedürü — ülkeye bağlıdır' },
          { ad:'MWSKZ', aciklama:'Vergi kodu (2 karakter)' },
          { ad:'MWART', aciklama:'**A** çıkış · **V** giriş — kaydedildikten sonra değişmez' },
        ] },

      { ad:'T030K', baslik:'Vergi hesap belirleme — "vergi hangi hesaba yazılacak?"',
        tutar:'Bir vergi işleminin hangi G/L hesabına kaydedileceği. ' +
              'Kayıt sırasında sistem bu tabloyu okuyup 191 veya 391 hesabını bulur.',
        olusturan:'{{OB40}}',
        guncelleyen:'{{OB40}}; değişiklikler taşıma isteğiyle sisteme geçer',
        anahtar:'**KTOPL** (hesap planı) + **KTOSL** (işlem anahtarı) + **MWSKZ** (vergi kodu)',
        iliskiler:'{{T007A}}’dan vergi kodu okunur → burada hesap bulunur → ' +
                  '{{BSEG}} `HKONT` ve {{BSET}}’e yazılır. ' +
                  '**{{T030}} ailesinin vergi üyesidir**; {{OBYC}} (MM) ve {{VKOA}} (SD) aynı aileye yazar.',
        s4:'Değişmedi — S/4HANA’da da vergi hesap belirlemesinin tek kaynağıdır.',
        alanlar:[
          { ad:'KTOPL', aciklama:'**Hesap planı** — anahtarın ilk alanı. Farklı hesap planı kullanan şirket kodları için ayrı satır gerekir.' },
          { ad:'KTOSL', aciklama:'**İşlem anahtarı** — verginin türü. `MWS` hesaplanan · `VST` indirilecek · `NAV` indirilemeyen · `NVV` indirilemeyen/dağıtılan' },
          { ad:'MWSKZ', aciklama:'**Vergi kodu** — yalnızca "koda göre ayrım" işaretliyse dolar. **Boşsa o anahtardaki tüm kodlar aynı hesaba gider.**' },
          { ad:'KONTS', aciklama:'**Belirlenen G/L hesabı** — 191 indirilecek, 391 hesaplanan' },
          { ad:'KONTH', aciklama:'Alacak tarafı hesabı — borç/alacak ayrımı yapılan kurulumlarda' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri',
        tutar:'Vergi **kalemi** burada da vardır (191/391 satırı) ama matrah bilgisi yoktur.',
        olusturan:'Belge kaydı',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'MWSKZ', aciklama:'Kalemin vergi kodu' },
          { ad:'HKONT', aciklama:'Vergi hesabı (191/391)' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Vergi tablo ilişkileri — BSET neden ayrı?',
      varliklar:[
        { ad:'T007A', rol:'Özelleştirme', aciklama:'Vergi kodu tanımı',
          alanlar:[{ ad:'KALSM', tip:'pk' }, { ad:'MWSKZ', tip:'pk' }, { ad:'MWART' }] },
        { ad:'T030K', rol:'Özelleştirme', aciklama:'Vergi hesabı',
          alanlar:[{ ad:'KTOSL', tip:'pk' }, { ad:'MWSKZ', tip:'fk' }, { ad:'KONTS' }] },
        { ad:'BKPF', rol:'FI', hub:true, aciklama:'Belge başlığı',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }] },
        { ad:'BSEG', rol:'FI', aciklama:'Belge kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'MWSKZ', tip:'fk' }, { ad:'HKONT' }] },
        { ad:'BSET', rol:'Vergi', aciklama:'**Vergi satırları — beyanın kaynağı**',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'MWSKZ', tip:'fk' }, { ad:'HWBAS' }, { ad:'HWSTE' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'Evrensel kayıt defteri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'MWSKZ', tip:'fk' }] },
      ],
      iliskiler:[
        { from:'T007A', to:'BSET', alanlar:'MWSKZ', not:'kod tanımı' },
        { from:'T030K', to:'BSEG', alanlar:'KONTS → HKONT', not:'vergi hesabı' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'başlık → kalem' },
        { from:'BKPF', to:'BSET', alanlar:'BELNR', not:'**başlık → vergi satırı**' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR + BUZEI', not:'evrensel kalem' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Kullanıcı açısından vergi süreci tek bir alandan ibarettir: **vergi kodu**. ' +
      'Ama o alanın arkasında üç ekran vardır — tanım ({{FTXP}}), hesap ({{OB40}}) ve ' +
      'kontrol ({{S_ALR_87012357}}).',

    ekranlar:[
      { ad:'{{FTXP}} — vergi kodu tanımı',
        aciklama:'Ülke seçilir, kod girilir, tip ve oran tanımlanır.',
        alanlar:[
          { ad:'Ülke', zorunlu:true, aciklama:'Vergi kodları **ülkeye bağlıdır**. Şirket kodunun ülkesi ({{OBY6}}) belirleyicidir.' },
          { ad:'Vergi kodu', zorunlu:true, aciklama:'İki karakter. Yerleşik kural: A* çıkış, V* giriş — zorunlu değil ama izlenmesi hayat kurtarır.' },
          { ad:'Vergi tipi', zorunlu:true, aciklama:'**A** veya **V**. Kaydedildikten sonra **değiştirilemez**.' },
          { ad:'Oran (%)', zorunlu:true, aciklama:'İlgili işlem anahtarı satırına yazılır. **Sonradan değiştirilmemelidir.**' },
          { ad:'İndirilebilirlik', zorunlu:false, aciklama:'Kısmi indirim için yüzde; boşsa %100 indirilebilir sayılır.' },
        ],
        ipucu:'Kod isimlendirmesini baştan disiplinli yap: `V1` %20 indirilecek, `V2` %10, ' +
              '`V0` %0, `VN` indirilemeyen, `A1` %20 hesaplanan… ' +
              'Yıllar sonra 40 kod olduğunda bu disiplin tek kurtarıcıdır.' },

      { ad:'{{OB40}} — vergi hesabı ataması',
        aciklama:'İşlem anahtarı bazında G/L hesabı atanır.',
        alanlar:[
          { ad:'İşlem anahtarı', zorunlu:true, aciklama:'**MWS** hesaplanan · **VST** indirilecek · **NAV** indirilemeyen (maliyete eklenir)' },
          { ad:'Hesap planı', zorunlu:true },
          { ad:'Vergi koduna göre ayrım', zorunlu:false, aciklama:'İşaretlenirse her kod için ayrı hesap tanımlanabilir.' },
          { ad:'G/L hesabı', zorunlu:true, aciklama:'{{FS00}}’da **"yalnızca otomatik kayıt"** işaretli olmalıdır.' },
        ],
        ipucu:'**NAV anahtarı özeldir:** ona atanan hesap aslında kullanılmaz — ' +
              'sistem indirilemeyen KDV’yi ilgili gider/varlık satırına ekler. ' +
              'Bu davranışı bilmeden "NAV hesabına hiç kayıt gelmiyor" diye saatler harcanabilir.' },

      { ad:'Kayıt ekranı — vergi kodu alanı ({{FB60}} / {{FB70}} / {{MIRO}})',
        aciklama:'Kullanıcının vergiyle tek teması burasıdır.',
        alanlar:[
          { ad:'Vergi kodu', zorunlu:true, aciklama:'Doğru kodun seçilmesi **kullanıcının mevzuat bilgisine** bağlıdır; sistem denetleyemez.' },
          { ad:'Vergiyi hesapla', zorunlu:false, aciklama:'İşaretliyse sistem matrahtan hesaplar. **İşaretli tutulmalıdır.**' },
          { ad:'Vergi tutarı', zorunlu:false, aciklama:'Elle girilirse sistem hesaplamaz; yuvarlama farkı dışında kullanılmamalıdır.' },
        ],
        ipucu:'"Vergiyi hesapla" kutusu işaretli değilken vergi tutarını elle girmek, ' +
              'vergi hatalarının ikinci en yaygın kaynağıdır. ' +
              '{{OBZT}} ile kod listesini daraltmak ilk savunma hattıdır.' },
    ],

    zorunlu:['Ülke','Vergi kodu','Vergi tipi (A/V)','Oran','İşlem anahtarı','G/L hesabı'],
    opsiyonel:['İndirilebilirlik yüzdesi','Vergi koduna göre hesap ayrımı','Hedef vergi kodu'],

    hatalar:[
      { mesaj:'Tax code ... does not exist in company code country ...', sebep:'Vergi kodu şirket kodunun ülkesi için tanımlı değil.', cozum:'{{OBY6}} ile ülkeyi doğrula; {{FTXP}}’de doğru ülkede tanımla. Çok ülkeli kurulumlarda çok sık görülür.' },
      { mesaj:'Error in account determination: table T030K key ... MWS', sebep:'{{OB40}}’ta hesap atanmamış.', cozum:'{{OB40}} → MWS/VST/NAV satırına hesap ata.' },
      { mesaj:'Tax entry not possible in this item', sebep:'Kalem vergi kodu kabul etmiyor — hesap ayarı veya kalem tipi uygun değil.', cozum:'{{FS00}}’da hesabın vergi kategorisini kontrol et (`-`, `+`, `*` veya boş).' },
      { mesaj:'The difference is too large for clearing / tax amount incorrect', sebep:'Elle girilen vergi, hesaplanandan tolerans dışı sapıyor.', cozum:'Tutarı düzelt veya vergi tolerans sınırını gözden geçir. Yuvarlama farkı 1–2 kuruşu geçmemelidir.' },
      { mesaj:'Beyan raporu ile 191/391 bakiyesi tutmuyor', sebep:'Vergi hesabına **elle** kayıt atılmış ({{BSET}}’e satır yazmaz) veya vergi kodsuz belge var.', cozum:'{{FBL3N}}’de vergi hesabında belge türü SA olan satırları ara; hesapları {{FS00}}’da "yalnızca otomatik kayıt" yap.' },
    ],

    ipuclari:[
      '**Vergi hesaplarını {{FS00}}’da "yalnızca otomatik kayıt" yap.** ' +
      'Tek bir işaret, beyan ile mizanın ayrışmasını büyük ölçüde önler.',
      'Kullanılmaya başlanmış kodun **oranını asla değiştirme**; yeni kod aç.',
      '{{OBZT}} ile alış işlemlerinde yalnızca V*, satış işlemlerinde yalnızca A* kodlarını göster.',
      'Ay sonunda {{S_ALR_87012357}} toplamlarını {{FBL3N}}’deki 191/391 bakiyeleriyle **her ay** karşılaştır.',
      'İndirilemeyen KDV için ayrı gider hesabı **açma**; NAV mekanizması tutarı doğru kaleme ekler.',
      '{{tevkifat}} kullanılacaksa satıcı ana verisinde tevkifat tipi ve kodu **tanımlı olmalıdır** — ' +
      'eksikse sistem sessizce kesinti yapmaz.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BSET', ne:'**Vergi satırları** — matrah ve vergi tutarı; beyannamenin kaynağı' },
      { tablo:'BSEG', ne:'Vergi kalemi (191/391 satırı) ve kalemlerin `MWSKZ` alanı' },
      { tablo:'BKPF', ne:'Belge başlığı' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler; vergi kodu ve tutarı taşır' },
      { tablo:'T007A', ne:'Vergi kodu tanımı ({{FTXP}})' },
      { tablo:'T030K', ne:'Vergi hesap belirleme ({{OB40}})' },
    ],

    commit:
      'Vergi hesaplaması **belge kaydının içinde**, tek LUW’da yapılır. ' +
      '{{BSEG}} ve {{BSET}} aynı commit’te yazılır; biri yazılıp diğeri yazılamaz.\n\n' +
      'Bu, veri bütünlüğü açısından iyi haberdir ama şu sonucu doğurur: ' +
      'vergi hesabına **{{FB50}} ile elle** atılan bir kayıt {{BSEG}}’e satır yazar, ' +
      '**{{BSET}}’e yazmaz** — çünkü o bir vergi işlemi değil, düz bir G/L kaydıdır. ' +
      'Beyan raporu ile mizanın ayrışmasının teknik açıklaması budur.',

    belgeNo:
      'Verginin ayrı bir belge numarası yoktur; ana belgenin bir parçasıdır. ' +
      '{{BSET}} satırları aynı `BELNR` altında `BUZEI` ile numaralanır.',

    postingLogic:
      'Vergi hesaplama zinciri:\n\n' +
      '**1.** Kullanıcı vergi kodunu seçer.\n' +
      '**2.** Sistem {{T007A}}’dan kodun tipini (A/V) ve prosedürünü okur.\n' +
      '**3.** Hesaplama prosedürü oranı bulur ve matrahtan vergiyi hesaplar.\n' +
      '**4.** {{T030K}}’dan işlem anahtarına (MWS/VST/NAV) göre hesap belirlenir.\n' +
      '**5.** **NAV ise** tutar ayrı satır olmaz, ilgili gider/varlık satırına **eklenir**.\n' +
      '**6.** {{BSEG}} vergi kalemi + {{BSET}} vergi satırı birlikte yazılır.\n\n' +
      'Kısmi indirimde 3. ve 5. adım birlikte çalışır: tutarın bir kısmı VST hesabına, ' +
      'kalanı maliyete gider.',

    belgeTuru:
      'Vergi belge türünü etkilemez ama belge türü **vergiyi etkileyebilir**: ' +
      '{{OBA7}}’de belge türüne izin verilen hesap tipleri, vergi kaleminin oluşmasını sınırlayabilir. ' +
      'Ayrıca ters kayıt türü (`AB`, `KA`) vergi satırını da ters çevirir.',

    numberRange:
      'Verginin kendi numara aralığı yoktur. Ancak KDV beyanı için **resmî belge numarası** ' +
      '(official document numbering) kullanan ülkelerde ayrı bir aralık tanımlanır; ' +
      'Türkiye kurulumlarında e-fatura numaralandırması bu mekanizmayla ilişkilidir.',

    accountDetermination:
      '{{OB40}} → {{T030K}}. İşlem anahtarları:\n\n' +
      '**MWS** — hesaplanan (çıkış) KDV → 391\n' +
      '**VST** — indirilecek (giriş) KDV → 191\n' +
      '**NAV** — indirilemeyen KDV → *hesap atanır ama kullanılmaz*; tutar gider/varlık satırına eklenir\n' +
      '**NVV** — indirilemeyen, hesap atamasına dağıtılan\n\n' +
      'Aynı mimari MM’de {{OBYC}}, SD’de {{VKOA}} olarak çalışır — **üçü de {{T030}} ailesine** yazar.',

    tur:
      '**Özelleştirme:** vergi kodları ({{FTXP}}), hesap atamaları ({{OB40}}), ' +
      'hesaplama prosedürü, izinli kod listeleri ({{OBZT}}).\n\n' +
      '**Ana veri:** hesabın vergi kategorisi ({{SKB1}}), satıcı/müşterinin tevkifat bilgisi.\n\n' +
      '**Hareket verisi:** {{BSET}} satırları.',

    transport:
      '**Vergi kodları taşınmaz gibi davranır ve bu bir tuzaktır.** ' +
      '{{FTXP}}’de tanımlanan kodun *yapısı* taşıma isteğine girer, ama **oranlar** ' +
      'çoğu kurulumda taşınmaz — hedef sistemde ayrıca girilmesi gerekir.\n\n' +
      'Sonuç: test sisteminde %20 hesaplayan kod, canlıda **%0** hesaplayabilir ve ' +
      'hiçbir hata vermez. Canlıya geçişte **her vergi kodunun oranı tek tek doğrulanmalıdır**.\n\n' +
      '{{OB40}} hesap atamaları normal şekilde taşınır.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Satış/Satın Alma Vergisi → Hesaplama → Vergi Kodlarını Tanımla', not:'{{FTXP}}' },
      { yol:'SPRO → Finansal Muhasebe → … → Satış/Satın Alma Vergisi → Kayıt → Vergi Hesaplarını Tanımla', not:'{{OB40}} → {{T030K}}' },
      { yol:'SPRO → Finansal Muhasebe → … → Satış/Satın Alma Vergisi → Temel Ayarlar → Hesaplama Prosedürünü Ata', not:'Ülke ↔ prosedür eşleşmesi' },
      { yol:'SPRO → Finansal Muhasebe → … → Stopaj Vergisi → Genişletilmiş Stopaj Vergisi', not:'{{tevkifat}} yapılandırması' },
    ],

    ekstra:[
      { ic:'🗂️', baslik:'{{T030K}} — vergi hesap belirlemenin anatomisi', metin:
        'Kullanıcı faturaya `V1` yazar ve sistem 191 hesabını bulur. ' +
        'Bu bulmayı sağlayan tablo **{{T030K}}**’dır.\n\n' +
        '**Anahtar üç alandan oluşur:**\n\n' +
        '`KTOPL` **hesap planı** — hangi hesap planında çalışıyoruz\n' +
        '`KTOSL` **işlem anahtarı** — verginin türü\n' +
        '`MWSKZ` **vergi kodu** — *(opsiyonel, aşağıya bakın)*\n\n' +
        '---\n\n' +
        '**İşlem anahtarları ne anlama gelir?**\n\n' +
        '`MWS` **hesaplanan (çıkış) KDV** → 391. Satış faturalarında oluşur.\n\n' +
        '`VST` **indirilecek (giriş) KDV** → 191. Alış faturalarında oluşur.\n\n' +
        '`NAV` **indirilemeyen KDV** → hesap atanır ama **kullanılmaz**. ' +
        'Sistem tutarı ilgili gider/varlık satırına **ekler**. ' +
        '(Bu davranış ayrı bir bloğun konusudur.)\n\n' +
        '`NVV` indirilemeyen, hesap atamasına dağıtılan varyant.\n\n' +
        '---\n\n' +
        '**Üçüncü alanın (`MWSKZ`) püf noktası**\n\n' +
        '{{OB40}}’ta **"vergi koduna göre ayrım"** diye bir işaret vardır ve ' +
        'davranışı köklü biçimde değiştirir:\n\n' +
        '**İşaretsiz (varsayılan):** `MWSKZ` alanı **boş** kalır. ' +
        'O işlem anahtarındaki **tüm vergi kodları aynı hesaba** gider. ' +
        'V1, V2, V0 — hepsi 191’e.\n\n' +
        '**İşaretli:** her vergi kodu için **ayrı satır** tanımlanabilir. ' +
        'V1 → 191001, V2 → 191002 gibi.\n\n' +
        'Ne zaman gerekir? Farklı oranları ayrı hesapta izlemek istendiğinde ' +
        'veya indirilemeyen KDV’nin ayrı hesapta tutulması gerektiğinde.\n\n' +
        '**Sonradan işaretlemek risklidir:** geçmiş kayıtlar eski hesapta, ' +
        'yeniler yeni hesapta kalır ve hesap bakiyeleri anlamsızlaşır.\n\n' +
        '---\n\n' +
        '**En sık hata: eksik satır**\n\n' +
        '*"Error in account determination: table T030K key TR MWS"*\n\n' +
        'Mesaj tam olarak eksik anahtarı verir: hesap planı **TR**, işlem anahtarı **MWS**. ' +
        '{{OB40}}’ta o satır tanımlanmamıştır.\n\n' +
        'Çok hesap planlı kurulumlarda klasik senaryo: bir hesap planı için tanımlanır, ' +
        'diğeri unutulur. Test sisteminde çalışan vergi kaydı canlıda hata verir.\n\n' +
        '**Kontrol:** kullanılan **tüm hesap planları** için MWS ve VST satırlarının ' +
        'var olduğunu doğrula.' },

      { ic:'🚫', baslik:'Oran değiştirme: en pahalı vergi hatası', metin:
        'KDV oranı %18’den %20’ye çıktığında iki yol vardır:\n\n' +
        '**Yanlış yol:** mevcut V1 kodunun oranını 18’den 20’ye çevirmek. ' +
        'Sonuç: geçmiş belgeler %18 tutarla, yeni belgeler %20 tutarla {{BSET}}’te durur — ' +
        'veri doğrudur. Ama **beyan raporu ikisini aynı kod altında toplar** ve ' +
        'ortalama oran ne %18 ne %20 çıkar. Denetimde "bu tutar hangi orandan?" sorusuna ' +
        'cevap verilemez.\n\n' +
        '**Doğru yol:** yeni bir kod açmak (örneğin V3 = %20), eskisini kapatmak. ' +
        'Her kod tek bir oranı temsil eder, geçmiş dönem raporları bozulmaz, ' +
        'denetimde kod bazında ayrışma net görünür.\n\n' +
        '**Genel kural:** *kullanılmış bir vergi kodunun oranı değiştirilmez.* ' +
        'Bu, SAP’ın teknik olarak engellemediği ama muhasebe disiplininin yasakladığı bir işlemdir.' },

      { ic:'🔍', baslik:'NAV: hesap atanır ama kullanılmaz', metin:
        '{{OB40}}’ta **NAV** işlem anahtarına bir hesap atanır — ama o hesaba genelde ' +
        '**hiç kayıt gelmez**. Sebebi şudur: indirilemeyen KDV ayrı bir satır olarak değil, ' +
        'ilgili gider veya varlık satırına **eklenerek** kaydedilir.\n\n' +
        'Yani 10.000 TL gider + 2.000 TL indirilemeyen KDV → tek satır: **12.000 TL gider**.\n\n' +
        'Atanan hesap yalnızca bazı özel senaryolarda (dağıtılamayan tutarlar) devreye girer. ' +
        'Bu davranışı bilmeyen danışman "NAV hesabına neden kayıt gelmiyor?" diye ' +
        'yapılandırmayı boşuna arar.\n\n' +
        'Öğretici sonuç: **indirilemeyen KDV bir vergi kalemi değil, bir maliyet kalemidir.** ' +
        'SAP’ın davranışı bu muhasebe gerçeğini birebir yansıtır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Vergi hesabına elle kayıt atılmamalı', metin:
        '{{FB50}} ile 191 veya 391 hesabına atılan bir kayıt {{BSEG}}’e satır yazar ama ' +
        '**{{BSET}}’e yazmaz**. Beyan raporu {{BSET}}’ten üretildiği için o tutar ' +
        'beyanda **görünmez** — mizanda görünür.\n\n' +
        'Sonuç: rapor ile mizan ayrışır ve sebebi aylar sonra aranır.\n\n' +
        'Önlem: vergi hesaplarını {{FS00}}’da **"yalnızca otomatik kayıt"** olarak işaretle. ' +
        'Tek bir kutucuk, bu hata sınıfını tamamen kapatır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Vergi mimarisi S/4HANA’da **neredeyse hiç değişmedi**: {{FTXP}}, {{OB40}}, {{BSET}} aynı. ' +
      'Değişen, raporlamanın {{ACDOCA}} üzerinden hızlanması ve ' +
      'bazı ülkelerde SAP Document and Reporting Compliance ile e-beyan entegrasyonu.',

    eccFarklari:[
      { konu:'{{FTXP}} / {{OB40}}', ecc:'Vergi kodu ve hesap tanımı', s4:'**Değişmedi**' },
      { konu:'{{BSET}}', ecc:'Vergi satırları', s4:'**Duruyor** — beyan hâlâ buradan üretilir' },
      { konu:'Vergi tutarı', ecc:'{{BSEG}} + {{BSET}}', s4:'+ {{ACDOCA}} (raporlama için)' },
      { konu:'Beyan raporu', ecc:'{{S_ALR_87012357}}', s4:'Aynı + Fiori vergi uygulamaları' },
      { konu:'E-beyan / e-fatura', ecc:'Ülke eklentileri', s4:'SAP Document and Reporting Compliance' },
      { konu:'Performans', ecc:'Büyük {{BSET}}’te rapor yavaş', s4:'HANA ile belirgin hızlanma' },
    ],

    universalJournal:
      '{{ACDOCA}} vergi kodunu ve tutarını satır bazında taşır. Bu, **analiz için** büyük kolaylık: ' +
      '"hangi kâr merkezinde ne kadar indirilemeyen KDV var?" gibi sorular tek tablodan cevaplanır.\n\n' +
      '**Ama beyan hâlâ {{BSET}}’ten üretilir** — çünkü beyanname matrah kırılımı ister ve ' +
      'matrah {{ACDOCA}}’nın değil {{BSET}}’in konusudur. Bu ayrımı bilmemek, ' +
      '"S/4HANA’da BSET kalktı mı?" sorusuna yanlış cevap verdirir. **Kalkmadı.**',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'{{FTXP}}, {{OB40}}, {{F.12}}, {{S_ALR_87012357}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Manage Tax Items', aciklama:'Vergi kalemlerini listeler ve filtreler.' },
      { ad:'Tax Declaration', aciklama:'Beyan verisi hazırlama ve gözden geçirme.' },
      { ad:'Display Financial Document', aciklama:'{{FB03}} yerine; vergi satırları görünür.' },
      { ad:'Document and Reporting Compliance', aciklama:'Ülke bazlı e-beyan ve e-fatura entegrasyonu.' },
    ],

    compatibilityViews:[
      '{{BSET}}, {{T007A}}, {{T030K}} — **fiziksel tablo olarak duruyor**.',
      '{{BSEG}} vergi kalemi için uyumluluk görünümü üzerinden okunur.',
      'Vergi, S/4HANA geçişinde yapı olarak en az etkilenen FI alanıdır.',
    ],

    performans:
      'Vergi raporları büyük {{BSET}} tablosunu taradığı için ECC’de yavaştı; ' +
      'HANA ile belirgin şekilde hızlandı. Asıl kazanç ise {{ACDOCA}} sayesinde ' +
      'vergi verisinin **diğer boyutlarla birlikte** analiz edilebilmesidir.',

    bestPractices:[
      'Geçişte **her vergi kodunun oranını canlı sistemde tek tek doğrula** — oranlar taşınmayabilir.',
      'Kullanılmayan eski vergi kodlarını geçişte sadeleştir; ama **kullanılmış olanları silme** ' +
      '(geçmiş belgeler ve raporlar onlara referans verir).',
      'Vergi hesaplarını "yalnızca otomatik kayıt" olarak işaretle — geçiş, bunu düzeltmek için iyi bir fırsattır.',
      'Ülke bazlı e-beyan gereksinimlerini Document and Reporting Compliance ile değerlendir.',
      'Beyan raporu ile mizan mutabakatını **aylık rutine** al; geçiş sonrası ilk üç ay özellikle kontrol et.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Beyan raporu ile mizan tutmuyor: 84.000 TL nereden geldi?',
    hikaye:
      '**Anadolu Makine A.Ş.** vergi sorumlusu, Mayıs 2027 KDV beyannamesini hazırlarken ' +
      'bir tutarsızlık fark ediyor: {{S_ALR_87012357}} raporundaki hesaplanan KDV toplamı ' +
      '**180.000 TL**, ama mizanda 391 hesabının bakiyesi **264.000 TL**.\n\n' +
      'Fark: **84.000 TL**. Hangisi doğru? Beyanname hangisine göre verilecek?\n\n' +
      'Bu senaryo, verginin en sinsi hata sınıfını ve teşhis yöntemini gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · Ülke TR' },
      { k:'Dönem', v:'Mayıs 2027' },
      { k:'Beyan raporu — hesaplanan KDV', v:'180.000 TL' },
      { k:'Mizan — 391 bakiyesi', v:'264.000 TL' },
      { k:'**Fark**', v:'**84.000 TL**' },
    ],

    adimlar:[
      { baslik:'Farkın yönü belirlenir', tcode:'FBL3N',
        aciklama:'Önce hangi tarafın fazla olduğuna bakılıyor — bu, olası sebepleri ikiye indiriyor.',
        girdi:[
          { alan:'Hesap', deger:'391 Hesaplanan KDV' },
          { alan:'Mizan bakiyesi', deger:'264.000 TL' },
          { alan:'Beyan raporu', deger:'180.000 TL' },
          { alan:'Çıkarım', deger:'**Mizan fazla** → {{BSET}}’e yazılmayan bir kayıt var' },
        ],
        not:'Mantık şu: beyan raporu {{BSET}}’ten, mizan {{BSEG}}’den gelir. ' +
             'Mizan fazlaysa, **{{BSEG}}’e yazılıp {{BSET}}’e yazılmayan** bir kayıt vardır. ' +
             'Bunun tek yolu **elle** atılmış bir G/L kaydıdır.\n\n' +
             'Tersi olsaydı (rapor fazla) sebep farklı olurdu: ters kaydedilmiş ama ' +
             'vergi satırı temizlenmemiş belgeler aranırdı.' },

      { baslik:'Hesap hareketleri belge türüne göre süzülür', tcode:'FBL3N',
        aciklama:'391 hesabının hareketleri belge türüne göre gruplanıyor.',
        girdi:[
          { alan:'Belge türü **DR** (müşteri faturası)', deger:'176.000 TL — normal satış KDV’si' },
          { alan:'Belge türü **RV** (SD faturası)', deger:'4.000 TL — normal' },
          { alan:'Belge türü **SA** (G/L kaydı)', deger:'**84.000 TL — şüpheli**' },
          { alan:'Toplam', deger:'264.000 TL' },
        ],
        not:'**SA belge türü, vergi hesabında bir alarm işaretidir.** ' +
             'Vergi kalemleri normalde fatura kayıtlarından (DR/KR/RV) doğar. ' +
             'SA türünde bir vergi kaydı, birinin **elle** kayıt attığı anlamına gelir.' },

      { baslik:'Şüpheli belge açılır', tcode:'FB03',
        aciklama:'84.000 TL’lik SA belgesi inceleniyor.',
        girdi:[
          { alan:'Belge', deger:'100004521 · Belge türü SA · 20.05.2027' },
          { alan:'Açıklama', deger:'"Nisan KDV düzeltmesi"' },
          { alan:'Kaydeden', deger:'Muhasebe müdürü' },
        ],
        fis:{ baslik:'Belge 100004521 — elle atılan düzeltme', belgeTuru:'SA', tarih:'20.05.2027',
          satirlar:[
            { hesap:'120', ad:'Alıcılar — düzeltme', borc:84000 },
            { hesap:'391', ad:'Hesaplanan KDV', alacak:84000, not:'**Vergi kodu yok** → {{BSET}}’e satır yazılmadı' },
          ], not:'Fiş **dengeli**, kayıt **geçerli**, mizan **doğru**. ' +
                 'Ama vergi kodu girilmediği için sistem bunu bir vergi işlemi saymadı ve ' +
                 '{{BSET}}’e satır yazmadı. **Beyanname bu 84.000 TL’yi hiç görmüyor.**' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'391 hesabına 84.000 TL alacak satırı **yazıldı**' },
          { tablo:'BSET', ne:'**Satır yazılmadı** — sorunun kaynağı' },
        ],
        not:'Müdür, Nisan ayında eksik faturalanan bir satışın KDV’sini düzeltmek istemiş ve ' +
             'doğrudan vergi hesabına kayıt atmış. Muhasebe açısından **niyeti doğru**; ' +
             'ama yöntemi vergi mimarisini atlıyor.' },

      { baslik:'Doğrulama — F.12 ile belge kırılımı alınır', tcode:'F.12',
        aciklama:'Teşhisin doğruluğu bağımsız bir raporla kontrol ediliyor.',
        girdi:[
          { alan:'Dönem', deger:'Mayıs 2027 · vergi kodu A1' },
          { alan:'Listelenen belge sayısı', deger:'312 belge · toplam 180.000 TL' },
          { alan:'100004521 belgesi', deger:'**Listede yok**' },
        ],
        not:'{{F.12}} de {{BSET}}’ten okuduğu için şüpheli belgeyi göstermiyor. ' +
             'Bu, teşhisi **iki bağımsız kaynakla** doğruladı: ' +
             'belge {{BSEG}}’de var, {{BSET}}’te yok.' },

      { baslik:'Düzeltme — belge ters kaydedilir', tcode:'FB08',
        aciklama:'Elle atılan kayıt iptal ediliyor.',
        girdi:[
          { alan:'Ters kaydedilen', deger:'100004521' },
          { alan:'Ters kayıt sebebi', deger:'01 — hatalı kayıt' },
          { alan:'Sonuç', deger:'391 bakiyesi 264.000 → **180.000 TL**' },
        ],
        not:'Ters kayıt sonrası mizan ile beyan raporu **eşitlendi**. ' +
             'Ama asıl düzeltme henüz yapılmadı — eksik faturalanan satış hâlâ eksik.' },

      { baslik:'Doğru yöntemle yeniden kaydedilir', tcode:'FB70',
        aciklama:'Aynı düzeltme, bu kez **vergi koduyla** ve müşteri faturası olarak giriliyor.',
        girdi:[
          { alan:'İşlem', deger:'{{FB70}} — müşteri faturası (belge türü DR)' },
          { alan:'Matrah', deger:'420.000 TL' },
          { alan:'Vergi kodu', deger:'**A1** (%20 hesaplanan)' },
          { alan:'Hesaplanan KDV', deger:'84.000 TL — **sistem hesapladı**' },
        ],
        fis:{ baslik:'Belge 1800005612 — doğru yöntem', belgeTuru:'DR', tarih:'31.05.2027',
          satirlar:[
            { hesap:'120', ad:'Alıcılar', borc:504000 },
            { hesap:'600', ad:'Yurtiçi satışlar', alacak:420000, not:'Matrah — {{BSET}} `HWBAS`' },
            { hesap:'391', ad:'Hesaplanan KDV', alacak:84000, not:'{{OB40}} → MWS · **{{BSET}}’e yazıldı**' },
          ], not:'Bu kez vergi kodu girildiği için sistem {{BSET}}’e satır yazdı. ' +
                 'Ayrıca ilk kayıtta hiç görünmeyen **420.000 TL gelir** de artık muhasebede — ' +
                 'elle atılan kayıt yalnızca KDV’yi düzeltmiş, geliri unutmuştu.' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'Müşteri, gelir ve KDV kalemleri' },
          { tablo:'BSET', ne:'**Vergi satırı yazıldı** — matrah 420.000, vergi 84.000' },
          { tablo:'BSID', ne:'Müşteri açık kalemi 504.000 TL' },
        ],
        not:'**Elle atılan kayıt aslında iki hata içeriyordu:** ' +
             '(1) vergi kodu yoktu, (2) gelir hiç kaydedilmemişti. ' +
             'Doğru yöntem ikisini birden çözdü.' },

      { baslik:'Önlem — vergi hesapları kilitlenir', tcode:'FS00',
        aciklama:'Aynı hatanın tekrarını **sistemsel olarak** imkânsız hâle getiriyoruz.',
        girdi:[
          { alan:'Hesaplar', deger:'191 ve 391' },
          { alan:'Ayar', deger:'**"Yalnızca otomatik kayıt"** işaretlendi' },
          { alan:'Etki', deger:'Bu hesaplara elle kayıt **artık mümkün değil**' },
          { alan:'Ek önlem', deger:'Aylık mutabakat kontrolü kapanış listesine eklendi' },
        ],
        not:'Bu tek kutucuk, hata sınıfını tamamen kapatır: kullanıcı iyi niyetle bile olsa ' +
             'vergi hesabına elle kayıt atamaz, doğru işlemi kullanmak zorunda kalır.' },
    ],

    sonuc:
      '**84.000 TL’lik fark, iyi niyetle atılmış tek bir elle kayıttan çıktı** — ve o kayıt ' +
      'aynı zamanda 420.000 TL’lik geliri de atlamıştı.\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Vergi bilgisi {{BSEG}}’de değil {{BSET}}’te tutulur.** Beyanname {{BSET}}’ten üretilir. ' +
      'Vergi hesabına vergi kodsuz atılan kayıt mizanı etkiler ama beyana **hiç yansımaz**.\n\n' +
      '**2. Farkın yönü teşhisi ikiye böler.** Mizan fazlaysa {{BSET}}’e yazılmayan elle kayıt ara; ' +
      'rapor fazlaysa temizlenmemiş ters kayıt ara. Bu ayrım aramayı dakikalara indirir.\n\n' +
      '**3. Vergi hesabında SA belge türü alarm işaretidir.** Vergi kalemleri fatura kayıtlarından ' +
      '(DR/KR/RV) doğar; SA türü birinin elle kayıt attığını gösterir. Teşhisin en hızlı filtresi budur.\n\n' +
      '**4. Çözüm yapılandırmadadır, eğitimde değil.** "Bir daha yapmayın" demek yerine ' +
      'vergi hesaplarını {{FS00}}’da **"yalnızca otomatik kayıt"** yapmak, ' +
      'hatayı sistemsel olarak imkânsız kılar. Bu, danışmanlıkta tercih edilen çözüm biçimidir: ' +
      '**hatayı önlemek, hatırlatmaktan güvenilirdir.**',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'Vergi kodu **üç şeyi** taşır: oran, tip (A çıkış / V giriş) ve hesap ataması.',
      'Vergi bilgisi **{{BSET}}** tablosunda tutulur; beyanname {{BSEG}}’den değil buradan üretilir.',
      'Hesaplanan KDV (391) devlete **borç**, indirilecek KDV (191) devletten **alacaktır**.',
      '**İndirilemeyen KDV** ayrı hesaba değil, **giderin veya varlığın maliyetine** eklenir ({{OB40}} → NAV).',
      'İşlem anahtarları: **MWS** hesaplanan · **VST** indirilecek · **NAV** indirilemeyen.',
      'Kullanılmaya başlanmış kodun **oranı değiştirilmez** — yeni kod açılır.',
      'Vergi hesabına **elle** atılan kayıt {{BSET}}’e yazmaz → beyan ile mizan ayrışır.',
      'Önlem: vergi hesaplarını {{FS00}}’da **"yalnızca otomatik kayıt"** yap.',
    ],

    onemliNoktalar:[
      '**"İndirilemeyen KDV nereye kaydedilir?"** Ayrı bir vergi hesabına **değil**, ilgili giderin veya varlığın **maliyetine**. İndirilemiyorsa devletten alacak değildir, dolayısıyla varlık değil maliyettir. En sık sorulan vergi sorusudur.',
      '**"Beyan raporu ile mizan neden tutmaz?"** Rapor {{BSET}}’ten, mizan {{BSEG}}’den gelir. Vergi hesabına vergi kodsuz elle kayıt atılırsa {{BSEG}}’e yazılır, {{BSET}}’e yazılmaz.',
      '**"Vergi kodunun oranı değiştirilebilir mi?"** Teknik olarak evet, **muhasebeten hayır**. Geçmiş ve yeni belgeler aynı kod altında farklı oranlarla toplanır; beyan tutarsız çıkar. Yeni kod açılır.',
      '**"MWS, VST, NAV nedir?"** {{OB40}} işlem anahtarları: hesaplanan, indirilecek, indirilemeyen. NAV’a atanan hesap genelde **kullanılmaz** — tutar gider/varlık satırına eklenir.',
      '**"Sıfır oranlı ile vergisiz farkı?"** Sıfır oranlı **kapsam içindedir** (matrah beyan edilir, vergi 0); vergisiz **kapsam dışındadır**. Muhasebe kaydı benzer, **beyannamedeki yeri farklıdır**.',
      '**"{{tevkifat}} nasıl çalışır?"** Ödeyen, ödeyeceği tutardan vergiyi keser ve doğrudan vergi dairesine yatırır. Satıcının borcu kesinti kadar azalır. Satıcı ana verisinde tevkifat tipi/kodu tanımlı olmalıdır.',
      '**"Vergi hatası nasıl fark edilir?"** Fiş dengeli, mizan tutar, alarm yok. Tek yol: {{S_ALR_87012357}} beyan raporunu {{FBL3N}}’deki 191/391 bakiyeleriyle **her ay** karşılaştırmak.',
      '**"Canlıya geçişte vergiyle ilgili risk?"** Vergi kodu **yapısı** taşınır ama **oranlar taşınmayabilir**. Testte %20 hesaplayan kod canlıda %0 hesaplayabilir ve hata vermez.',
    ],

    sikHatalar:[
      { hata:'İndirilemeyen KDV’yi 191 hesabına yazmak.', dogru:'Giderin/varlığın maliyetine eklenir ({{OB40}} → NAV). 191 yalnızca **indirilebilen** KDV içindir.' },
      { hata:'Kullanılan vergi kodunun oranını değiştirmek.', dogru:'Yeni kod açılır. Aksi hâlde geçmiş ve yeni belgeler aynı kod altında farklı oranlarla toplanır.' },
      { hata:'Vergi hesabına {{FB50}} ile elle kayıt atmak.', dogru:'Doğru işlemi kullan ({{FB70}}/{{FB60}}). Elle kayıt {{BSET}}’e yazmaz, beyandan düşer.' },
      { hata:'İndirilemeyen KDV için ayrı gider hesabı açmak.', dogru:'Gerekmez ve yanlıştır; tutar ilgili kalemin gerçek maliyetidir, ayrı izlenmez.' },
      { hata:'Sıfır oranlı ile vergisizi aynı saymak.', dogru:'Sıfır oranlı kapsam içindedir ve matrahı beyan edilir; vergisiz kapsam dışındadır.' },
      { hata:'Beyan raporunu mizanla hiç karşılaştırmamak.', dogru:'Aylık rutin olmalıdır; vergi hatasının başka erken uyarısı yoktur.' },
      { hata:'Canlıya geçişte vergi oranlarını doğrulamamak.', dogru:'Her kodun oranı canlıda tek tek kontrol edilmelidir — oranlar taşınmayabilir.' },
      { hata:'Vergi hesaplarını normal kayda açık bırakmak.', dogru:'{{FS00}}’da **"yalnızca otomatik kayıt"** işaretlenir; hata sınıfını sistemsel olarak kapatır.' },
    ],

    ipuclari:[
      'Vergi kodu isimlendirmesini baştan disiplinli yap: `V1` %20 indirilecek, `V0` %0, ' +
      '`VN` indirilemeyen, `A1` %20 hesaplanan. 40 kod olduğunda tek kurtarıcı budur.',
      '{{OBZT}} ile alışta yalnızca V*, satışta yalnızca A* kodlarını göster — yön hatasını sıfırlar.',
      'Beyan farkı teşhisinde ilk filtre: {{FBL3N}}’de vergi hesabında **belge türü SA** olan satırlar.',
      'Farkın **yönü** teşhisi ikiye böler: mizan fazla → elle kayıt; rapor fazla → temizlenmemiş ters kayıt.',
      '{{F.12}} ile beyan raporundaki tutarı belge belge kırabilirsin — denetimde en çok istenen dökümdür.',
      'NAV hesabına kayıt gelmemesi **normaldir**; boşuna yapılandırma arama.',
    ],

    quiz:[
      { soru:'Binek otomobil kiralama faturasındaki indirilemeyen KDV nereye kaydedilir?',
        secenekler:[
          '191 İndirilecek KDV hesabına',
          'Ayrı bir "KDV gideri" hesabına',
          '**İlgili gider hesabının maliyetine eklenir**',
          '391 Hesaplanan KDV hesabına',
        ], dogru:2,
        aciklama:'İndirilemeyen KDV devletten geri alınamaz; dolayısıyla varlık değil **gerçek bir maliyettir**. ' +
                 '{{OB40}} → **NAV** anahtarı tutarı ilgili gider/varlık satırına ekler. ' +
                 '10.000 TL gider + 2.000 TL KDV → tek satır **12.000 TL gider**. Ayrı hesap açılmaz.' },

      { soru:'KDV beyannamesi hangi tablodan üretilir?',
        secenekler:[
          '{{BSEG}}',
          '**{{BSET}}**',
          '{{BKPF}}',
          '{{T030K}}',
        ], dogru:1,
        aciklama:'Vergi bilgisi (matrah + vergi tutarı) {{BSEG}}’den **ayrı** olarak {{BSET}}’te tutulur. ' +
                 'Bu ayrım kritiktir: vergi hesabına vergi kodsuz elle kayıt atılırsa {{BSEG}}’e yazılır ' +
                 'ama {{BSET}}’e yazılmaz — mizanda görünür, beyanda görünmez.' },

      { soru:'KDV oranı %18’den %20’ye çıktı. Ne yapılmalı?',
        secenekler:[
          'Mevcut kodun oranı 20 yapılır',
          '**Yeni bir vergi kodu açılır, eskisi kapatılır**',
          'Kullanıcılar tutarı elle girer',
          '{{OB40}}’ta hesap değiştirilir',
        ], dogru:1,
        aciklama:'Mevcut kodun oranı değiştirilirse geçmiş belgeler %18, yeniler %20 tutarla kalır — ' +
                 'veri doğrudur ama **rapor ikisini aynı kod altında toplar** ve beyan tutarsız çıkar. ' +
                 'Her kod tek bir oranı temsil etmelidir.' },

      { soru:'Beyan raporu 180.000 TL, mizandaki 391 bakiyesi 264.000 TL. İlk aranacak şey nedir?',
        secenekler:[
          'Vergi kodu tanımı',
          '**Vergi hesabında belge türü SA olan elle kayıtlar**',
          '{{OB40}} hesap ataması',
          'Kur farkları',
        ], dogru:1,
        aciklama:'**Mizan fazlaysa** {{BSEG}}’e yazılıp {{BSET}}’e yazılmayan bir kayıt vardır — ' +
                 'bunun tek yolu elle atılmış G/L kaydıdır. Vergi kalemleri normalde fatura ' +
                 'kayıtlarından (DR/KR/RV) doğar; **SA belge türü alarm işaretidir**.' },

      { soru:'{{OB40}}’ta NAV anahtarına atanan hesaba neden kayıt gelmez?',
        secenekler:[
          'Yapılandırma eksiktir',
          '**İndirilemeyen KDV ayrı satır olmaz, gider/varlık satırına eklenir**',
          'Hesap bloklanmıştır',
          'NAV yalnızca ECC’de çalışır',
        ], dogru:1,
        aciklama:'Bu bir hata değil, **tasarım gereğidir**. İndirilemeyen KDV bir vergi kalemi değil ' +
                 'bir maliyet kalemidir; bu yüzden ilgili gider veya varlık satırına eklenerek kaydedilir. ' +
                 'Atanan hesap yalnızca özel dağıtım senaryolarında devreye girer.' },

      { soru:'Sıfır oranlı (%0) ile vergisiz (istisna) arasındaki temel fark nedir?',
        secenekler:[
          'Oran farklıdır',
          'Muhasebe kaydı farklıdır',
          '**Sıfır oranlı kapsam içindedir ve matrahı beyan edilir; vergisiz kapsam dışındadır**',
          'Fark yoktur',
        ], dogru:2,
        aciklama:'Sıfır oranlı işlem **vergiye tabidir**, oranı sadece %0’dır — matrah beyannamede görünür ve ' +
                 '{{BSET}}’e satır yazılır. Vergisiz işlem kapsam dışıdır. ' +
                 'Muhasebe kaydı benzer göründüğü için karıştırılır; **fark beyannamededir**.' },

      { soru:'Canlıya geçişte vergiyle ilgili en sinsi risk nedir?',
        secenekler:[
          '{{OB40}} hesapları taşınmaz',
          '**Vergi kodu taşınır ama oranı taşınmayabilir — sistem hata vermeden %0 hesaplar**',
          '{{BSET}} tablosu oluşmaz',
          'Belge türleri değişir',
        ], dogru:1,
        aciklama:'Kodun *yapısı* taşıma isteğine girer ama **oranlar** çoğu kurulumda hedef sistemde ' +
                 'ayrıca girilmelidir. Testte %20 hesaplayan kod canlıda %0 hesaplar ve ' +
                 '**hiçbir hata vermez**. Geçişte her kodun oranı tek tek doğrulanmalıdır.' },

      { soru:'Vergi hesaplarına elle kayıt atılmasını sistemsel olarak nasıl engellersin?',
        secenekler:[
          'Kullanıcı yetkisini kaldırırsın',
          '**{{FS00}}’da hesabı "yalnızca otomatik kayıt" olarak işaretlersin**',
          'Belge türünü kısıtlarsın',
          '{{OBZT}} ile kod listesini daraltırsın',
        ], dogru:1,
        aciklama:'"Yalnızca otomatik kayıt" (post automatically only) işareti, hesaba yalnızca ' +
                 'otomatik mekanizmaların ({{OB40}} hesap belirlemesi) kayıt atmasına izin verir. ' +
                 'Kullanıcı iyi niyetle bile olsa elle kayıt atamaz. ' +
                 '**Tek kutucuk, tüm hata sınıfını kapatır.**' },
    ],

    flashcards:[
      { on:'Vergi kodu hangi üç şeyi taşır?', arka:'**1. Oran** (%20, %10, %0)\n**2. Tip** — A çıkış (hesaplanan) / V giriş (indirilecek)\n**3. Hesap ataması** — OB40 üzerinden hangi G/L hesabına\n\nTanım: FTXP → T007A' },
      { on:'Vergi bilgisi hangi tabloda tutulur?', arka:'**BSET** — matrah (HWBAS) + vergi tutarı (HWSTE) + vergi kodu.\n\n**BSEG değil.** Beyanname BSET’ten üretilir.\n\nBu ayrım, "rapor ile mizan neden tutmuyor?" sorusunun cevabıdır.' },
      { on:'İndirilemeyen KDV nereye kaydedilir?', arka:'**İlgili giderin veya varlığın maliyetine eklenir.**\n\n10.000 gider + 2.000 KDV → tek satır **12.000 gider**\n\n191’e yazılmaz (varlık değil), ayrı gider hesabı açılmaz.\nOB40 → **NAV** anahtarı.' },
      { on:'MWS, VST, NAV nedir?', arka:'{{OB40}} işlem anahtarları:\n\n**MWS** — hesaplanan (çıkış) KDV → 391\n**VST** — indirilecek (giriş) KDV → 191\n**NAV** — indirilemeyen → hesap atanır ama **kullanılmaz**, tutar maliyete eklenir' },
      { on:'Vergi oranı değişti. Ne yaparsın?', arka:'**Yeni kod açarsın**, eskisini kapatırsın.\n\nMevcut kodun oranını değiştirirsen geçmiş belgeler eski oranla, yeniler yeni oranla kalır — ama rapor **ikisini aynı kod altında toplar**.\n\nHer kod = tek oran.' },
      { on:'Beyan raporu ile mizan neden ayrışır?', arka:'Rapor **BSET**’ten, mizan **BSEG**’den gelir.\n\nVergi hesabına **vergi kodsuz elle kayıt** atılırsa BSEG’e yazılır, BSET’e yazılmaz → mizanda var, beyanda yok.\n\nÖnlem: FS00 → "yalnızca otomatik kayıt".' },
      { on:'Beyan farkı teşhisi — nereden başlarsın?', arka:'**Farkın yönüne bak:**\n\n**Mizan fazla** → BSET’e yazılmayan elle kayıt ara (FBL3N’de belge türü **SA**)\n\n**Rapor fazla** → temizlenmemiş ters kayıt ara\n\nYön, aramayı ikiye böler.' },
      { on:'391 ve 191 hesapları ne anlama gelir?', arka:'**391 Hesaplanan KDV** — satışta tahsil edilen, devlete **borç** (kaynak)\n\n**191 İndirilecek KDV** — alışta ödenen, devletten **alacak** (varlık)\n\nAy sonunda mahsuplaşır → 360 ödenecek veya 190 devreden.' },
      { on:'Sıfır oranlı vs vergisiz farkı?', arka:'**Sıfır oranlı (%0):** kapsam **içinde**, matrah beyan edilir, BSET’e satır yazılır. (İhracat)\n\n**Vergisiz (istisna):** kapsam **dışında**, farklı beyan satırı.\n\nMuhasebe kaydı benzer — **fark beyannamededir**.' },
      { on:'Tevkifat (stopaj) nasıl çalışır?', arka:'Ödeyen, ödeyeceği tutardan vergiyi **keser** ve doğrudan vergi dairesine yatırır.\n\nFatura 120.000 → satıcıya 100.000 ödenir, 20.000 devlete.\n\nSatıcı ana verisinde tevkifat tipi/kodu **tanımlı olmalı** — yoksa sessizce kesinti yapılmaz.' },
      { on:'Canlıya geçişte vergi riski nedir?', arka:'**Vergi kodu taşınır, oranı taşınmayabilir.**\n\nTestte %20 hesaplayan kod canlıda **%0** hesaplar ve **hiçbir hata vermez**.\n\nGeçişte her kodun oranı **tek tek** doğrulanmalıdır.' },
      { on:'Vergi hatası nasıl fark edilir?', arka:'**Kendiliğinden fark edilmez.** Fiş dengeli, mizan tutar, alarm yok.\n\nTek yol: **S_ALR_87012357** beyan raporunu **FBL3N**’deki 191/391 bakiyeleriyle **her ay** karşılaştırmak.\n\nAylık rutin olmalı.' },
    ],
  },

  },
});
