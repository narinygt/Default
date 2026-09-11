/* ==========================================================================
   content/fi/dunning.js — "Dunning (İhtar)"
   ========================================================================== */

SAP.registerTopic({
  id: 'dunning',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'İhtar (dunning), vadesi geçmiş müşteri alacakları için **kademeli hatırlatma** sürecidir. ' +
      'SAP bunu tek bir programla otomatikleştirir: {{F150}} açık kalemleri tarar, ' +
      'hangi müşteriye hangi seviyede ihtar gideceğini belirler, mektupları basar ve ' +
      'ihtar bilgisini müşteri kalemine **geri yazar**.\n\n' +
      'Mekanizmanın kalbi **ihtar prosedürüdür** ({{FBMP}}): kaç seviye olacağı, ' +
      'her seviyenin kaç gün gecikmeden sonra devreye gireceği, hangi metnin basılacağı ve ' +
      'gecikme faizi/ihtar ücreti alınıp alınmayacağı burada tanımlanır.\n\n' +
      'Kritik ayrım şudur: **ihtar bir muhasebe işlemi değildir.** ' +
      'İhtar çalıştırması normalde **hiçbir muhasebe kaydı üretmez** — ' +
      'yalnızca müşteri ve kalem üzerindeki ihtar alanlarını günceller. ' +
      'Bu yüzden mizanda hiçbir iz bırakmaz.',

    neden:
      '**Tahsilat hızı.** Sistematik hatırlatma, tahsilat süresini belirgin şekilde kısaltır.\n\n' +
      '**Ölçek.** Binlerce müşterinin vade takibini elle yapmak imkânsızdır.\n\n' +
      '**Tutarlılık.** Her müşteriye aynı kurallar uygulanır; keyfî davranış ortadan kalkar.\n\n' +
      '**Hukuki dayanak.** İhtar geçmişi ({{KNB1}}’de saklanır), yasal takip başlatmanın ' +
      've şüpheli alacak karşılığı ayırmanın belgesel dayanağıdır.\n\n' +
      '**Kademeli baskı.** İlk seviye nazik bir hatırlatma, son seviye yasal takip uyarısıdır — ' +
      'müşteri ilişkisi bir anda kopmaz.',

    sirketOnemi:
      'İhtar, **nakit döngüsünün en doğrudan müdahale noktasıdır**. ' +
      'Tahsilat süresini 10 gün kısaltmak, aynı ciroda ciddi bir işletme sermayesi ' +
      'serbestliği anlamına gelir.\n\n' +
      'Danışman açısından bu konu, {{accounts-receivable}} ile {{clearing}} arasındaki ' +
      'operasyonel köprüdür ve **yapılandırmanın davranışa doğrudan çevrildiği** ' +
      'ender konulardan biridir: {{FBMP}}’de girilen bir gün sayısı, ' +
      'ertesi gün müşterinin postasına düşer.\n\n' +
      'Ayırt edici soru şudur: **"İhtar çalıştırması muhasebe kaydı üretir mi?"** ' +
      'Doğru cevap: **normalde hayır**. Yalnızca ihtar ücreti veya gecikme faizi ' +
      'tanımlanmışsa ayrı bir kayıt oluşur — o da ihtarın kendisinden değil, ' +
      'faiz hesaplamasından doğar.',

    gercekHayat:
      'Bir toptancının 340 açık müşteri kalemi var. Tahsilat sorumlusu her hafta ' +
      'Excel’e döküp vadesi geçenleri süzüyor, telefon açıyor, mail atıyor.\n\n' +
      'Sorunlar: hangi müşteriye ne zaman ne söylendiği **kayıtlı değil**. ' +
      'Bazı müşteriler üç kez aranıyor, bazıları hiç. ' +
      'Yasal takibe geçilecek müşteri için "kaç kez uyardık?" sorusuna cevap yok.\n\n' +
      '{{F150}} ile bu süreç şuna dönüşüyor: her pazartesi program çalışıyor, ' +
      'vadesi 14 günü geçenlere 1. seviye, 30 günü geçenlere 2. seviye, ' +
      '60 günü geçenlere 3. seviye (yasal uyarı) mektubu otomatik basılıyor.\n\n' +
      'Her müşterinin **kaçıncı seviyede** olduğu {{KNB1}}’de tutuluyor; ' +
      'yasal takip kararı verilirken üç ihtarın da tarihi belgeli.\n\n' +
      'Tahsilat sorumlusunun işi "kim aranacak?" listesi çıkarmaktan ' +
      '"3. seviyedekilerle görüşmeye" dönüşüyor.',

    muhasebeMantigi:
      'İhtarın muhasebe mantığı **dolaylıdır**: kendisi kayıt üretmez ama ' +
      'iki muhasebe kararının **girdisidir**.\n\n' +
      '**1. Şüpheli alacak karşılığı.** Bir alacağın tahsilinin şüpheli hâle geldiğine ' +
      'karar vermek yargı gerektirir. İhtar seviyesi bu yargının **nesnel ölçütüdür**: ' +
      '"3. seviye ihtar almış ve hâlâ ödenmemiş alacaklara %50 karşılık ayrılır" gibi ' +
      'bir politika, hem denetlenebilir hem tutarlıdır.\n\n' +
      '**2. Yasal takip ve alacağın değersizleşmesi.** Son seviyeye gelmiş ' +
      've hâlâ tahsil edilmemiş alacak, {{supheli-alacak}} hesabına aktarılır ' +
      '({{ozel-ana-muhasebe-gostergesi}} ile veya doğrudan hesap değişikliğiyle).\n\n' +
      'Yalnızca iki durumda ihtar **doğrudan** kayıt üretir: ' +
      '**ihtar ücreti** (sabit tutar) ve **gecikme faizi** ({{F.2B}} ile hesaplanır). ' +
      'Bunlar müşteriye borç, işletmeye gelir yazılır.',

    kavramlar: ['ihtar', 'acik-kalem', 'yaslandirma', 'supheli-alacak', 'vade', 'odeme-blogu'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'İhtar süreci **iki katmanlıdır**: bir kez yapılan yapılandırma ({{FBMP}} prosedürü + ' +
      'müşteri ana verisine atama) ve periyodik çalıştırma ({{F150}}). ' +
      'Çalıştırma dört adımdan oluşur ve **her adım geri alınabilir** — ' +
      'son adıma kadar müşteriye hiçbir şey gitmez.',

    roller:[
      { rol:'FI danışmanı', gorev:'{{FBMP}} ile prosedürü, seviyeleri ve metinleri tanımlar.' },
      { rol:'AR muhasebe', gorev:'Müşteri ana verisine ihtar prosedürünü atar ({{FD02}} / {{BP}}).' },
      { rol:'Tahsilat sorumlusu', gorev:'{{F150}} çalıştırır, **öneriyi inceler ve düzenler**.' },
      { rol:'Tahsilat sorumlusu', gorev:'İhtar bloğu koyar (anlaşmaya varılan müşteriler için).' },
      { rol:'Sistem', gorev:'Mektupları basar, ihtar seviyesini müşteri ve kaleme yazar.' },
      { rol:'Ana muhasebe', gorev:'Yüksek seviyedeki alacaklar için karşılık değerlendirir.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'İhtar çalıştırması — dört adım, son adıma kadar geri alınabilir',
      adimlar:[
        { ic:'⚙️', rol:'Danışman', baslik:'Prosedür tanımlanır ({{FBMP}})',
          aciklama:'Seviye sayısı, gecikme günleri, metinler, ücret/faiz ayarları. ' +
                   'Sonuç {{T047}} tablosuna yazılır. **Bir kez yapılır.**',
          cikti:'İhtar prosedürü', ok:'müşteriye atanır' },
        { ic:'👤', rol:'AR muhasebe', baslik:'Müşteri ana verisine atanır',
          aciklama:'{{KNB1}} `MAHNA` alanı. **Prosedür atanmamış müşteri ihtar almaz** — ' +
                   'en sık "neden ihtar gitmedi?" sebebidir.',
          cikti:'İhtara açık müşteri', ok:'periyodik çalıştırma' },
        { ic:'▶', rol:'Tahsilat', baslik:'1. Parametreler ({{F150}})',
          aciklama:'İhtar tarihi, belge tarihine kadar, şirket kodu, müşteri aralığı. ' +
                   '**İhtar tarihi**, gecikme gününün hesaplandığı referanstır.',
          cikti:'Çalıştırma parametreleri', ok:'öneri üretilir' },
        { ic:'📋', rol:'Sistem', baslik:'2. Öneri (dunning proposal)',
          aciklama:'Hangi müşteriye hangi seviyede ihtar gideceği listelenir. ' +
                   '**Henüz hiçbir şey basılmadı, hiçbir alan güncellenmedi.**',
          cikti:'İhtar önerisi', ok:'incelenir' },
        { ic:'✏️', rol:'Tahsilat', baslik:'3. Öneri düzenlenir',
          aciklama:'Anlaşmaya varılmış müşteriler çıkarılır, seviye elle değiştirilebilir. ' +
                   '**Öneri silinip yeniden üretilebilir** — bu adımda risk yok.',
          cikti:'Onaylı öneri', ok:'basım' },
        { ic:'📨', rol:'Sistem', baslik:'4. İhtar basımı — **geri dönüşü yok**',
          aciklama:'Mektuplar basılır, {{KNB1}} ve kalem üzerindeki ihtar seviyesi **güncellenir**. ' +
                   'Bu noktadan sonra seviye elle düzeltilmelidir.',
          cikti:'Basılı ihtar + güncel seviye', ok:'takip' },
        { ic:'⚖️', rol:'Ana muhasebe', baslik:'Yüksek seviyeler değerlendirilir',
          aciklama:'Son seviyeye gelmiş alacaklar için karşılık ayrılır veya yasal takip başlar.',
          cikti:'Karşılık / yasal takip' },
      ],
    },

    adimlar:[
      { rol:'Danışman', eylem:'İhtar prosedürünü tanımlar', sistem:'{{FBMP}} → {{T047}}' },
      { rol:'AR muhasebe', eylem:'Prosedürü müşteriye atar', sistem:'{{FD02}} / {{BP}} → {{KNB1}} `MAHNA`' },
      { rol:'Tahsilat', eylem:'Parametreleri girer', sistem:'{{F150}} — ihtar tarihi kritik' },
      { rol:'Sistem', eylem:'Öneri üretir', sistem:'Açık kalemleri tarar, seviye belirler' },
      { rol:'Tahsilat', eylem:'Öneriyi inceler ve düzenler', sistem:'Müşteri çıkarma, seviye değiştirme' },
      { rol:'Sistem', eylem:'İhtarları basar', sistem:'Mektup + {{KNB1}} seviye güncellemesi' },
      { rol:'Tahsilat', eylem:'İhtar bloğu koyar', sistem:'{{FD02}} — anlaşmalı müşteriler' },
      { rol:'Ana muhasebe', eylem:'Karşılık değerlendirir', sistem:'{{FBL5N}} — ihtar seviyesi filtresi' },
    ],

    veriAkisi:{
      nereden:'İhtar prosedürü ({{T047}}), müşteri ana verisi ({{KNB1}} `MAHNA`, ihtar bloğu), ' +
              'açık kalemler ({{BSID}}), ödeme koşulundan gelen vade.',
      nereye:'{{KNB1}} ihtar seviyesi ve son ihtar tarihi; {{BSEG}}/{{BSID}} kalem ihtar seviyesi; ' +
             'basılan mektup; varsa faiz/ücret kaydı.',
      tetikleyen:'{{F150}} çalıştırması — genelde haftalık veya iki haftada bir.',
      sonraki:'Tahsilat, ödeme anlaşması, karşılık ayırma, yasal takip.',
    },

    notlar:[
      { tip:'tip', baslik:'Öneri adımı bir güvenlik ağıdır — kullan', metin:
        '{{F150}}’nin en değerli özelliği **öneri adımının basımdan ayrı olmasıdır**.\n\n' +
        'Öneri üretildiğinde hiçbir şey basılmaz, hiçbir alan güncellenmez, ' +
        'müşteriye hiçbir şey gitmez. Öneri **silinip yeniden üretilebilir**.\n\n' +
        'Bu, şunları yapmanı sağlar: yeni prosedürü canlıda **denemek**, ' +
        'anlaşmaya varılmış müşterileri listeden çıkarmak, ' +
        'yanlış seviyeye düşen bir müşteriyi düzeltmek.\n\n' +
        '**Basımdan sonra ise geri dönüş yoktur:** ihtar seviyesi {{KNB1}}’ye yazılmıştır ve ' +
        'düzeltmek için elle müdahale gerekir. Mektup zaten postaya çıkmıştır.\n\n' +
        'Pratik kural: **prosedür değişikliğinden sonraki ilk çalıştırmayı ' +
        'yalnızca öneri aşamasına kadar götür ve listeyi gözden geçir.**' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'İhtarın kendisi kayıt üretmez. Ama ihtar sürecinin **etrafında** üç muhasebe olayı vardır: ' +
      'ihtar ücreti, gecikme faizi ve şüpheli alacak karşılığı. ' +
      'Bunları ihtardan ayırt etmek, konuyu doğru anlamanın anahtarıdır.',

    etkilenenHesaplar:[
      { hesap:'120 Alıcılar', tur:'Bilanço — Varlık', neden:'İhtar edilen alacak burada durur. **İhtar bakiyeyi değiştirmez**, yalnızca kalemin ihtar seviyesi güncellenir.' },
      { hesap:'128 Şüpheli ticari alacaklar', tur:'Bilanço — Varlık', neden:'Yüksek seviyeye gelmiş alacaklar buraya aktarılır.' },
      { hesap:'129 Şüpheli alacak karşılığı', tur:'Bilanço — Varlık (eksi)', neden:'Tahsil edilemeyeceği öngörülen kısım için ayrılan karşılık.' },
      { hesap:'654 Karşılık giderleri', tur:'Gelir tablosu — Gider', neden:'Karşılık ayrılırken gider yazılır.' },
      { hesap:'642 Faiz gelirleri', tur:'Gelir tablosu — Gelir', neden:'Gecikme faizi ({{F.2B}} ile hesaplanır).' },
      { hesap:'649 Diğer olağan gelirler', tur:'Gelir tablosu — Gelir', neden:'İhtar ücreti — sabit tutar.' },
    ],

    fisler:[
      { baslik:'İhtar çalıştırması — **muhasebe kaydı yok**',
        belgeTuru:'—', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'Muhasebe kaydı oluşmaz — yalnızca ihtar alanları güncellenir', borc:0, alacak:0,
            not:'{{KNB1}} seviye ve tarih · {{BSID}} kalem seviyesi' },
        ],
        not:'**Bu, konunun en sık yanlış bilinen noktasıdır.** ' +
             '{{F150}} 340 müşteriye ihtar basabilir ve mizanda **tek bir kuruş** değişmez.\n\n' +
             'Güncellenen alanlar: müşterinin ihtar seviyesi, son ihtar tarihi ve ' +
             'her kalemin kaçıncı seviyede ihtar aldığı.\n\n' +
             '*(Tabloda 0/0 gösterimi, kaydın G/L etkisi olmadığını vurgulamak içindir.)*' },

      { baslik:'İhtar ücreti — sabit tutar (prosedürde tanımlıysa)',
        belgeTuru:'DR', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar — C-5010', borc:150, not:'Müşteri borcu arttı' },
          { hesap:'649', ad:'Diğer olağan gelirler — ihtar ücreti', alacak:150 },
        ],
        not:'İhtar ücreti prosedürde **seviye bazında** tanımlanır: ' +
             '1. seviyede 0 TL, 2. seviyede 150 TL, 3. seviyede 300 TL gibi.\n\n' +
             'Tutarlar küçüktür ama **caydırıcılık amacı** taşır. ' +
             'Türkiye uygulamasında yaygın değildir; sözleşmede öngörülmemişse ' +
             'müşteri ödemeyi reddedebilir ve tahsil edilemeyen bir kalem doğar.' },

      { baslik:'Gecikme faizi ({{F.2B}}) — hesaplanan tutar',
        belgeTuru:'DR', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar — C-5010', borc:8400, not:'240.000 × %14 × 90/360' },
          { hesap:'642', ad:'Faiz gelirleri', alacak:8400 },
        ],
        not:'Gecikme faizi **ihtarın parçası değildir** — ayrı bir programla ({{F.2B}}) ' +
             'hesaplanır ve kaydedilir.\n\n' +
             'Faiz göstergesi müşteri ana verisinde tanımlı olmalıdır; ' +
             'yoksa hesaplama o müşteriyi **atlar** ve hata vermez.\n\n' +
             'Karıştırılmaması gereken nokta: ihtar mektubu faizden bahsedebilir ' +
             'ama faizin **kaydı** ayrı bir işlemdir.' },

      { baslik:'Şüpheli alacağa aktarım — 3. seviye sonrası',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'128', ad:'Şüpheli ticari alacaklar — C-5010', borc:240000 },
          { hesap:'120', ad:'Alıcılar — C-5010', alacak:240000, not:'Normal alacaktan çıkarıldı' },
        ],
        not:'Alacak hâlâ **varlıktır** — sadece niteliği değişti. ' +
             'Bilançoda ayrı satırda gösterilir ki okuyucu riski görebilsin.\n\n' +
             'Aktarım kararının **nesnel ölçütü ihtar seviyesidir**: ' +
             '"3. seviye ihtar almış ve 30 gün geçmiş alacaklar" gibi bir politika, ' +
             'hem denetlenebilir hem tutarlıdır.' },

      { baslik:'Şüpheli alacak karşılığı — tahsil edilemeyecek kısım',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'654', ad:'Karşılık giderleri', borc:120000, not:'%50 karşılık' },
          { hesap:'129', ad:'Şüpheli alacak karşılığı', alacak:120000, not:'Varlığı azaltan hesap' },
        ],
        not:'Karşılık, alacağı **silmez** — tahsil edilemeyeceği öngörülen kısmı ' +
             'bilançodan düşer. Alacak 128’de durmaya devam eder, ' +
             'net değeri 240.000 − 120.000 = **120.000 TL** görünür.\n\n' +
             'Karşılık oranı ihtar seviyesine bağlanabilir: ' +
             '2. seviye %25, 3. seviye %50, yasal takip %100 gibi. ' +
             'İhtarın muhasebeye en somut katkısı budur.' },

      { baslik:'Tahsilat gerçekleşirse — karşılık iptal edilir',
        belgeTuru:'DZ', tarih:'20.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bankalar', borc:240000 },
          { hesap:'128', ad:'Şüpheli ticari alacaklar', alacak:240000 },
        ],
        not:'Tahsilat gelince alacak kapanır. **Ayrıca karşılık da iptal edilmelidir:** ' +
             '129 borç / 644 konusu kalmayan karşılıklar alacak.\n\n' +
             'Bu ikinci kayıt sık unutulur ve karşılık hesabı yıllarca ' +
             'tahsil edilmiş alacaklar için şişkin kalır. ' +
             'Dönem sonunda 128 ile 129’un **birlikte** gözden geçirilmesi gerekir.' },
    ],

    tHesaplar:[
      { hesap:'Alıcılar', kod:'120 (varlık)',
        borc:[{ ad:'Satış faturaları', tutar:1850000 }, { ad:'İhtar ücreti', tutar:150 }],
        alacak:[{ ad:'Tahsilatlar', tutar:1420000 }, { ad:'Şüpheliye aktarım', tutar:240000 }],
        not:'İhtarın kendisi bu hesabı **etkilemez**' },
      { hesap:'Şüpheli ticari alacaklar', kod:'128 (varlık)',
        borc:[{ ad:'120’den aktarım', tutar:240000 }],
        alacak:[{ ad:'Tahsilat', tutar:240000 }],
        not:'3. seviye ihtar sonrası' },
      { hesap:'Şüpheli alacak karşılığı', kod:'129 (varlık eksi)',
        borc:[{ ad:'Karşılık iptali', tutar:120000 }],
        alacak:[{ ad:'Karşılık ayrılması', tutar:120000 }],
        not:'Tahsilat olunca **iptal edilmeli** — sık unutulur' },
    ],

    notlar:[
      { tip:'warn', baslik:'İhtar seviyesi bir muhasebe verisi değil, bir süreç verisidir', metin:
        'İhtar seviyesi {{KNB1}} ve kalem üzerinde tutulur; **mizanda hiçbir karşılığı yoktur**.\n\n' +
        'Bu, iki pratik sonuç doğurur:\n\n' +
        '**1.** İhtar geçmişi bir mali tablo kalemi değildir — ' +
        'raporlanması için {{FBL5N}} gibi kalem raporları kullanılır.\n\n' +
        '**2.** Seviye **elle değiştirilebilir** ({{FD02}} veya kalem değişikliğiyle). ' +
        'Bu bir esneklik ama aynı zamanda bir risk: karşılık politikası ihtar seviyesine ' +
        'bağlıysa, seviyeyi değiştirmek karşılık tutarını da değiştirir.\n\n' +
        'İyi uygulama: seviye değişikliği yetkisini sınırlamak ve ' +
        'değişiklikleri {{CDHDR}}/{{CDPOS}} üzerinden izlemek.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'İhtar süreci üç eksende çeşitlenir: **seviye stratejisi**, **kapsam** ve ' +
      '**engelleme mekanizmaları**. Ayrıca ihtar bloğunun nerede tanımlandığı ' +
      '(müşteri mi kalem mi) pratikte önemli bir ayrımdır.',

    liste:[
      { ad:'Kademeli ihtar', en:'Multi-Level Dunning',
        aciklama:'Gecikme arttıkça sertleşen 3–4 seviyeli hatırlatma.',
        neZaman:'**Standart yaklaşım.** Müşteri ilişkisini koruyarak baskıyı artırır.',
        ornek:'1. seviye 14 gün (nazik hatırlatma) · 2. seviye 30 gün (uyarı) · ' +
              '3. seviye 60 gün (yasal takip bildirimi).',
        tcodes:['FBMP','F150'] },

      { ad:'Tek seviyeli ihtar', en:'Single-Level Dunning',
        aciklama:'Tek bir hatırlatma tipi; seviye ilerlemez.',
        neZaman:'Küçük tutarlı, çok sayıda müşterisi olan işlerde; abonelik modellerinde.',
        ornek:'Her ay aynı metin gönderilir. Basit ama **kademeli baskı yoktur**.' },

      { ad:'Ödeme koşuluna göre ihtar', en:'Payment-Term-Based',
        aciklama:'Gecikme günü, ödeme koşulundan gelen **vade tarihine** göre hesaplanır.',
        neZaman:'Normal akış — her zaman.',
        ornek:'Fatura 01.10, ödeme koşulu 30 gün → vade 31.10. ' +
              '14 gün gecikme = 14.11’de 1. seviye.' },

      { ad:'İhtar bloğu — müşteri seviyesinde', en:'Customer Dunning Block',
        aciklama:'Müşterinin **tüm kalemleri** ihtardan muaf tutulur.',
        neZaman:'Ödeme planına bağlanmış, dava sürecinde veya stratejik müşterilerde.',
        ornek:'{{KNB1}} ihtar bloğu alanı. **Kaldırılması unutulursa** müşteri ' +
              'yıllarca hiç ihtar almaz — periyodik gözden geçirme şart.',
        tcodes:['FD02'] },

      { ad:'İhtar bloğu — kalem seviyesinde', en:'Item Dunning Block',
        aciklama:'Yalnızca **belirli bir kalem** ihtardan muaf tutulur.',
        neZaman:'İtiraz edilen tek bir fatura varken; müşterinin diğer borçları takip edilmeye devam eder.',
        ornek:'{{FB09}} ile kalem üzerindeki ihtar bloğu alanı doldurulur. ' +
              '**Müşteri bloğuna tercih edilmelidir** — daha hedefli.' },

      { ad:'İhtar ücreti', en:'Dunning Charge',
        aciklama:'Seviye bazında sabit tutar; müşteriye borç yazılır.',
        neZaman:'Sözleşmede öngörülmüşse.',
        ornek:'2. seviye 150 TL, 3. seviye 300 TL. Türkiye’de yaygın değildir; ' +
              'sözleşmesiz uygulanırsa tahsil edilemez.' },

      { ad:'Gecikme faizi', en:'Interest on Arrears',
        aciklama:'Gecikme süresi ve tutara göre hesaplanan faiz. **İhtardan ayrı bir programdır.**',
        neZaman:'Sözleşmede faiz öngörülmüşse.',
        ornek:'{{F.2B}} ile hesaplanır. Müşteri ana verisinde **faiz göstergesi** ' +
              'tanımlı olmalıdır; yoksa müşteri sessizce atlanır.',
        tcodes:['F.2B'] },

      { ad:'Asgari tutar kuralı', en:'Minimum Amount',
        aciklama:'Belirli bir tutarın altındaki borçlar için ihtar üretilmez.',
        neZaman:'Her kurulumda tanımlanmalıdır.',
        ornek:'50 TL altı ihtar edilmez — posta ve işlem maliyeti borçtan büyük olur.' },

      { ad:'Yasal takip seviyesi', en:'Legal Dunning Level',
        aciklama:'Son seviye; yasal süreç başlatma bildirimi.',
        neZaman:'Diğer seviyeler sonuçsuz kaldığında.',
        ornek:'Bu seviyeye gelen alacaklar genelde {{supheli-alacak}} hesabına aktarılır ' +
              've karşılık ayrılır.' },
    ],

    karsilastirmaBasliklar:['Müşteri bloğu', 'Kalem bloğu'],
    karsilastirma:[
      ['Kapsam', 'Müşterinin **tüm** kalemleri', 'Yalnızca **o kalem**'],
      ['Nerede tanımlanır', '{{KNB1}} — {{FD02}}', 'Kalem üzerinde — {{FB09}}'],
      ['Tipik kullanım', 'Ödeme planı, dava süreci', 'İtiraz edilen tek fatura'],
      ['Risk', 'Kaldırılması **unutulur** → yıllarca ihtar gitmez', 'Sınırlı — tek kalem'],
      ['Diğer borçlar', 'Onlar da takipten çıkar', '**Takip edilmeye devam eder**'],
      ['Tercih', 'Yalnızca gerçekten gerekiyorsa', '**Varsayılan tercih**'],
      ['Gözden geçirme', 'Periyodik **zorunlu**', 'Kalem kapanınca kendiliğinden biter'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'F150', ad:'İhtar çalıştırması — sürecin motoru',
        amac:'Vadesi geçmiş açık kalemleri tarar, ihtar seviyesini belirler, mektupları basar.',
        neZaman:'Periyodik olarak — genelde haftalık veya iki haftada bir.',
        adimlar:[
          { baslik:'Çalıştırma tarihi ve tanımlayıcıyı gir',
            aciklama:'Aynı gün birden çok çalıştırma için tanımlayıcı ayırt edicidir.' },
          { baslik:'**İhtar tarihini** ve "belge tarihine kadar"ı gir',
            aciklama:'İhtar tarihi, **gecikme gününün hesaplandığı referanstır**. ' +
                     'Geçmiş bir tarih girilirse daha az kalem yakalanır.' },
          { baslik:'Şirket kodu ve müşteri aralığını gir' },
          { baslik:'**Öneriyi üret ve incele**',
            aciklama:'Hangi müşteriye hangi seviye. **Hiçbir şey basılmadı, hiçbir alan güncellenmedi.**' },
          { baslik:'Öneriyi düzenle',
            aciklama:'Müşteri çıkar, seviye değiştir, blok koy. Öneri **silinip yeniden üretilebilir**.' },
          { baslik:'İhtarları bas — **geri dönüşü yok**',
            aciklama:'Mektuplar basılır, {{KNB1}} ve kalem seviyeleri güncellenir.' },
        ],
        ekranAkisi:[
          { ekran:'Parametreler', islem:'İhtar tarihi 15.11.2027 · belge tarihine kadar 15.11.2027' },
          { ekran:'Serbest seçim', islem:'Şirket 1000 · müşteri C-5000 → C-5999' },
          { ekran:'Öneri', islem:'42 müşteri · 1. seviye 28 · 2. seviye 11 · 3. seviye 3' },
          { ekran:'Düzenleme', islem:'C-5010 ödeme planı → çıkarıldı' },
          { ekran:'Basım', islem:'41 mektup · seviyeler güncellendi' },
        ],
        alanlar:{
          zorunlu:['Çalıştırma tarihi','Tanımlayıcı','İhtar tarihi','Belge tarihine kadar','Şirket kodu'],
          opsiyonel:['Müşteri aralığı','İhtar prosedürü','Çıktı aygıtı'] },
        hatalar:[
          { mesaj:'No dunning notices were created', sebep:'Müşterilere prosedür atanmamış, hepsi bloklu, tutarlar asgari sınırın altında veya gecikme yetersiz.', cozum:'{{KNB1}} `MAHNA` alanını kontrol et — **en sık sebep budur**. Sonra blok ve asgari tutar ayarlarına bak.' },
          { mesaj:'Dunning run already exists for this date/identifier', sebep:'Aynı tarih+tanımlayıcı ile çalıştırma var.', cozum:'Farklı tanımlayıcı kullan veya eski çalıştırmayı sil.' },
          { mesaj:'Öneri boş ama açık kalemler var', sebep:'İhtar tarihi çok erken; gecikme günü henüz dolmamış.', cozum:'İhtar tarihini ve prosedürdeki gün sayılarını karşılaştır.' },
        ],
        ipucu:'**Öneri adımı ile basım adımını asla birleştirme.** ' +
              'Prosedür değişikliğinden sonraki ilk çalıştırmayı yalnızca öneriye kadar götür ve ' +
              'listeyi gözden geçir. Basımdan sonra ihtar seviyesi yazılmıştır ve ' +
              'geri almak elle müdahale gerektirir — mektup da postaya çıkmıştır.',
        ilgili:['FBMP','FBL5N','FD02'] },

      { kod:'FBMP', ad:'İhtar prosedürü tanımı',
        amac:'Seviyeleri, gün aralıklarını, metinleri ve ücret/faiz ayarlarını tanımlar.',
        neZaman:'Kurulumda; ihtar politikası değiştiğinde.',
        adimlar:[
          { baslik:'Prosedür başlığını tanımla',
            aciklama:'**İhtar aralığı** (iki ihtar arasındaki asgari gün) ve seviye sayısı. ' +
                     'Sonuç {{T047}}’ye yazılır.' },
          { baslik:'Seviyeleri tanımla',
            aciklama:'Her seviye için **gecikme günü** ve asgari tutar. ' +
                     'Seviye 1: 14 gün, seviye 2: 30 gün, seviye 3: 60 gün.' },
          { baslik:'Metinleri (form) ata',
            aciklama:'Her seviyenin kendi mektup metni olur; sertlik kademeli artar.' },
          { baslik:'Ücret ve faiz ayarlarını gir',
            aciklama:'Seviye bazında sabit ücret; faiz göstergesi.' },
          { baslik:'Hesap belirlemeyi kontrol et',
            aciklama:'Ücret ve faiz kaydedilecekse gelir hesabı tanımlı olmalıdır.' },
        ],
        alanlar:{
          zorunlu:['Prosedür kodu','Seviye sayısı','Gecikme günleri','Metin (form)'],
          opsiyonel:['İhtar ücreti','Faiz göstergesi','Asgari tutar','Para birimi bazında ayarlar'] },
        hatalar:[
          { mesaj:'Dunning level ... has no form assigned', sebep:'Seviyeye metin atanmamış.', cozum:'Her seviye için form ata; aksi hâlde o seviye basılamaz.' },
        ],
        ipucu:'**İhtar aralığı (dunning interval) ile gecikme günü farklıdır** ve karıştırılır:\n\n' +
              '**Gecikme günü** — vadeden kaç gün sonra bu seviye devreye girer.\n' +
              '**İhtar aralığı** — aynı müşteriye iki ihtar arasında geçmesi gereken asgari süre.\n\n' +
              'Aralık 10 gün ise, dün 1. seviye almış müşteri bugün 2. seviye alamaz — ' +
              'gecikme günü dolmuş olsa bile. Bu, haftalık çalıştırmalarda ' +
              '"neden seviye ilerlemiyor?" sorusunun cevabıdır.',
        ilgili:['F150','T047','FD02'] },

      { kod:'FBL5N', ad:'Müşteri kalemleri — ihtar seviyesi filtresiyle',
        amac:'Açık kalemleri listeler; ihtar seviyesi ve son ihtar tarihi görüntülenebilir.',
        neZaman:'Karşılık değerlendirmesinde; "kim hangi seviyede?" sorusunda.',
        adimlar:[
          { baslik:'Müşteri ve şirket kodunu gir' },
          { baslik:'Açık kalemleri seç' },
          { baslik:'**İhtar seviyesi sütununu ekle**',
            aciklama:'Düzen değiştirilerek `MAHNS` (ihtar seviyesi) ve `MADAT` (son ihtar tarihi) eklenir.' },
          { baslik:'Seviyeye göre süz ve karşılık değerlendir' },
        ],
        ipucu:'İhtar seviyesi sütunu **varsayılan düzende yoktur**; elle eklenmelidir. ' +
              'Bir kez ekleyip düzeni kaydet — karşılık değerlendirmesinin ' +
              'her ay tekrarlanan işidir.\n\n' +
              'Kaydedilmiş bir düzenle "3. seviye ihtar almış açık kalemler" sorgusu ' +
              'saniyeler sürer ve karşılık politikasının nesnel dayanağı olur.',
        ilgili:['F150','FD02','FBL5H'] },

      { kod:'FD02', ad:'Müşteri ana verisini değiştir — ihtar alanları',
        amac:'İhtar prosedürünü, bloğunu ve seviyesini yönetir.',
        neZaman:'Prosedür atarken; blok koyarken/kaldırırken; seviye düzeltirken.',
        adimlar:[
          { baslik:'Müşteri ve şirket kodunu gir' },
          { baslik:'Ödeme işlemleri sekmesine geç',
            aciklama:'İhtar alanları burada: prosedür, blok, seviye, son ihtar tarihi.' },
          { baslik:'İhtar prosedürünü ata',
            aciklama:'{{KNB1}} `MAHNA`. **Boşsa müşteri hiç ihtar almaz.**' },
          { baslik:'Gerekirse blok koy',
            aciklama:'Blok anahtarı girilir; **kaldırılması unutulmamalı**.' },
        ],
        ipucu:'"Bu müşteriye neden ihtar gitmiyor?" sorusunun teşhis sırası: ' +
              '**1)** {{KNB1}} `MAHNA` dolu mu, **2)** ihtar bloğu var mı, ' +
              '**3)** kalem seviyesinde blok var mı, **4)** tutar asgari sınırın üstünde mi, ' +
              '**5)** gecikme günü ve ihtar aralığı dolmuş mu.\n\n' +
              'Vakaların çoğu **birinci maddede** çözülür.',
        ilgili:['F150','FBMP','BP'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'İhtarın tablo tarafı iki katmandır: **yapılandırma** ({{T047}}) ve ' +
      '**sonuç** ({{KNB1}} müşteri seviyesi + kalem seviyesi). ' +
      'Ayrıca çalıştırma verisi geçici tablolarda ({{MHNK}}, {{MHND}}) tutulur.',

    liste:[
      { ad:'KNB1', baslik:'Müşteri şirket kodu verisi — ihtar alanları burada',
        tutar:'İhtar prosedürü, bloğu, **son ihtar seviyesi** ve tarihi.',
        olusturan:'{{BP}} → FI Customer rolü',
        guncelleyen:'{{FD02}} elle; **{{F150}} basımda otomatik**',
        anahtar:'KUNNR + BUKRS',
        iliskiler:'{{T047}} ile prosedür üzerinden; {{BSID}} açık kalemleri.',
        s4:'{{BP}} ile yönetilir.',
        alanlar:[
          { ad:'MAHNA', aciklama:'**İhtar prosedürü** — boşsa müşteri **hiç ihtar almaz**' },
          { ad:'MANSP', aciklama:'İhtar bloğu — doluysa tüm kalemler muaf' },
          { ad:'MAHNS', aciklama:'Son ihtar **seviyesi** — {{F150}} basımda günceller' },
          { ad:'MADAT', aciklama:'Son ihtar tarihi — ihtar aralığı kontrolünde kullanılır' },
          { ad:'AKONT', aciklama:'{{mutabakat-hesabi}}', tip:'fk' },
        ] },

      { ad:'T047', baslik:'İhtar prosedürü tanımı',
        tutar:'Prosedürün başlık ayarları: ihtar aralığı, seviye sayısı, asgari tutarlar.',
        olusturan:'{{FBMP}}',
        guncelleyen:'{{FBMP}}',
        anahtar:'MAHNA',
        iliskiler:'{{KNB1}} `MAHNA` bu tabloya bakar.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'MAHNA', aciklama:'Prosedür kodu', tip:'pk' },
          { ad:'MANWT', aciklama:'**İhtar aralığı (gün)** — iki ihtar arasındaki asgari süre' },
        ] },

      { ad:'BSID', baslik:'Müşteri açık kalemleri',
        tutar:'İhtar edilecek kalemler; her kalemin **kendi ihtar seviyesi** vardır.',
        olusturan:'Müşteri kalemi içeren belgeler',
        guncelleyen:'{{F150}} basımda kalem seviyesini yazar',
        anahtar:'KUNNR + BUKRS + BELNR + BUZEI',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'MANSP', aciklama:'**Kalem** ihtar bloğu — müşteri bloğundan bağımsız' },
          { ad:'MAHNS', aciklama:'Kalemin ihtar seviyesi' },
          { ad:'ZFBDT / ZBD1T', aciklama:'Vade hesabının temeli — gecikme buradan hesaplanır' },
        ] },

      { ad:'MHNK', baslik:'İhtar verisi — başlık',
        tutar:'İhtar çalıştırmasının müşteri bazlı sonucu.',
        olusturan:'{{F150}}',
        guncelleyen:'Yeni çalıştırma',
        s4:'Değişmedi.' },

      { ad:'MHND', baslik:'İhtar verisi — kalem',
        tutar:'Hangi kalemin hangi seviyede ihtar edildiği.',
        olusturan:'{{F150}}',
        s4:'Değişmedi.' },

      { ad:'BSEG', baslik:'Belge kalemleri',
        tutar:'İhtar seviyesi ve bloğu kalem bazında burada da tutulur.',
        olusturan:'Belge kaydı',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'İhtar — yapılandırmadan müşteriye',
      varliklar:[
        { ad:'T047', rol:'Özelleştirme', aciklama:'İhtar prosedürü',
          alanlar:[{ ad:'MAHNA', tip:'pk' }, { ad:'MANWT' }] },
        { ad:'KNB1', rol:'Ana veri', hub:true, aciklama:'**Müşteri ihtar alanları**',
          alanlar:[{ ad:'KUNNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }, { ad:'MAHNA', tip:'fk' }, { ad:'MANSP' }, { ad:'MAHNS' }] },
        { ad:'BSID', rol:'Açık kalem', aciklama:'İhtar edilecek kalemler',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'MAHNS' }, { ad:'MANSP' }] },
        { ad:'MHNK', rol:'İhtar verisi', aciklama:'Çalıştırma sonucu — başlık',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'LAUFD' }] },
        { ad:'MHND', rol:'İhtar verisi', aciklama:'Çalıştırma sonucu — kalem',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'MAHNS' }] },
        { ad:'BKPF', rol:'FI', aciklama:'Belge başlığı',
          alanlar:[{ ad:'BELNR', tip:'pk' }] },
      ],
      iliskiler:[
        { from:'T047', to:'KNB1', alanlar:'MAHNA', not:'prosedür ataması' },
        { from:'KNB1', to:'BSID', alanlar:'KUNNR', not:'müşteri → açık kalemler' },
        { from:'BKPF', to:'BSID', alanlar:'BELNR', not:'belge → kalem' },
        { from:'BSID', to:'MHND', alanlar:'BELNR', not:'**ihtar edilen kalem**' },
        { from:'KNB1', to:'MHNK', alanlar:'KUNNR', not:'çalıştırma sonucu' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      '{{F150}} ekranı diğer toplu işlemlere ({{F110}}) benzer: parametre → öneri → ' +
      'düzenleme → basım. Farkı, **öneri adımının tamamen risksiz** olmasıdır.',

    ekranlar:[
      { ad:'{{F150}} — parametre ekranı',
        aciklama:'Çalıştırmanın kapsamı ve referans tarihleri belirlenir.',
        alanlar:[
          { ad:'Çalıştırma tarihi + tanımlayıcı', zorunlu:true, aciklama:'Birlikte benzersiz olmalıdır.' },
          { ad:'**İhtar tarihi**', zorunlu:true, aciklama:'**Gecikme gününün hesaplandığı referans.** ' +
                   'Geçmiş tarih girilirse daha az kalem yakalanır.' },
          { ad:'Belge tarihine kadar', zorunlu:true, aciklama:'Bu tarihten sonraki belgeler dikkate alınmaz.' },
          { ad:'Şirket kodu', zorunlu:true },
          { ad:'Müşteri aralığı', zorunlu:false, aciklama:'Boşsa tüm müşteriler taranır.' },
        ],
        ipucu:'İhtar tarihi ile çalıştırma tarihi **farklı olabilir** ve bu kasıtlı bir esnekliktir: ' +
              'ayın 20’sinde çalıştırıp ihtar tarihini ayın 15’i yapabilirsin. ' +
              'Ama sonuç şudur: 15–20 arasında vadesi dolan kalemler **yakalanmaz**. ' +
              '"Neden bu fatura ihtar edilmedi?" sorusunun sık sebeplerinden biridir.' },

      { ad:'{{F150}} — öneri ekranı (dunning proposal)',
        aciklama:'Sürecin **güvenlik ağı**. Hiçbir şey basılmadı, hiçbir alan güncellenmedi.',
        alanlar:[
          { ad:'Müşteri listesi', zorunlu:false, aciklama:'Hangi müşteri hangi seviyede.' },
          { ad:'Müşteri çıkarma', zorunlu:false, aciklama:'Anlaşmaya varılmış müşteriler listeden çıkarılır.' },
          { ad:'Seviye değiştirme', zorunlu:false, aciklama:'Elle seviye düşürülüp yükseltilebilir.' },
          { ad:'Öneriyi silme', zorunlu:false, aciklama:'**Tamamen silinip yeniden üretilebilir.**' },
        ],
        ipucu:'Bu ekranda yapılan hiçbir şey geri alınamaz değildir. ' +
              'Prosedürü değiştirdikten sonra öneriyi üret, listeye bak, ' +
              'beklediğin gibi değilse öneriyi sil ve prosedürü düzelt.\n\n' +
              '**Canlı sistemde prosedür testinin tek güvenli yolu budur.**' },

      { ad:'{{F150}} — basım adımı',
        aciklama:'Geri dönüşü olmayan adım.',
        alanlar:[
          { ad:'Çıktı aygıtı', zorunlu:true },
          { ad:'Basım modu', zorunlu:true, aciklama:'Yazıcı, PDF veya e-posta.' },
          { ad:'Sonuç', zorunlu:false, aciklama:'{{KNB1}} `MAHNS` ve `MADAT` **güncellenir**; ' +
                   'kalem seviyeleri yazılır.' },
        ],
        ipucu:'Basımdan sonra seviyeyi geri almak için {{FD02}} ile elle düzeltmek gerekir — ' +
              've mektup zaten çıkmıştır. Bu yüzden basım adımı ' +
              '**öneri gözden geçirilmeden** çalıştırılmamalıdır.' },

      { ad:'{{FBMP}} — prosedür tanımı',
        aciklama:'İhtar politikasının sisteme çevrildiği yer.',
        alanlar:[
          { ad:'İhtar aralığı', zorunlu:true, aciklama:'İki ihtar arasındaki **asgari gün**. ' +
                   'Gecikme gününden farklıdır.' },
          { ad:'Seviye sayısı', zorunlu:true, aciklama:'Genelde 3–4.' },
          { ad:'Seviye başına gecikme günü', zorunlu:true, aciklama:'Vadeden kaç gün sonra devreye girer.' },
          { ad:'Metin (form)', zorunlu:true, aciklama:'Her seviyenin kendi mektubu.' },
          { ad:'Asgari tutar', zorunlu:false, aciklama:'Altındaki borçlar ihtar edilmez.' },
          { ad:'İhtar ücreti / faiz göstergesi', zorunlu:false },
        ],
        ipucu:'Seviye sayısını **az tut**. Beş seviyeli bir prosedür, ' +
              'haftalık çalıştırmada müşterinin son seviyeye ulaşması için ' +
              'aylar gerektirir ve baskı etkisi kaybolur. ' +
              'Üç seviye (hatırlatma → uyarı → yasal) çoğu iş için yeterlidir.' },
    ],

    zorunlu:['Çalıştırma tarihi','Tanımlayıcı','İhtar tarihi','Şirket kodu','Prosedür kodu','Seviye metinleri'],
    opsiyonel:['Müşteri aralığı','İhtar ücreti','Faiz göstergesi','Asgari tutar'],

    hatalar:[
      { mesaj:'No dunning notices were created', sebep:'**En sık:** müşterilere ihtar prosedürü atanmamış ({{KNB1}} `MAHNA` boş). Diğerleri: blok, asgari tutar, yetersiz gecikme.', cozum:'Teşhis sırası: MAHNA → müşteri bloğu → kalem bloğu → asgari tutar → gecikme günü + ihtar aralığı.' },
      { mesaj:'Seviye ilerlemiyor, hep 1. seviye basılıyor', sebep:'**İhtar aralığı** dolmamış; son ihtardan bu yana yeterli gün geçmemiş.', cozum:'{{T047}} `MANWT` değerini çalıştırma sıklığıyla karşılaştır. Haftalık çalıştırmada 10 günlük aralık, seviyeleri yavaşlatır.' },
      { mesaj:'Dunning run already exists for this date/identifier', sebep:'Aynı tarih+tanımlayıcı kullanılmış.', cozum:'Farklı tanımlayıcı ver veya eski çalıştırmayı sil.' },
      { mesaj:'Dunning level ... has no form assigned', sebep:'Seviyeye metin atanmamış.', cozum:'{{FBMP}}’de her seviye için form ata.' },
      { mesaj:'Bir müşteri yıllardır hiç ihtar almıyor', sebep:'Müşteri ihtar bloğu konulmuş ve **kaldırılması unutulmuş**.', cozum:'{{KNB1}} `MANSP` alanı dolu müşterileri periyodik listele ve gözden geçir.' },
      { mesaj:'İhtar mektubunda faiz görünüyor ama muhasebede yok', sebep:'Faiz ihtarın parçası değildir; ayrı program ({{F.2B}}) çalıştırılmamış.', cozum:'{{F.2B}} ile faizi hesapla ve kaydet. Müşteride faiz göstergesi tanımlı olmalıdır.' },
    ],

    ipuclari:[
      '**Öneri ile basımı asla birleştirme.** Prosedür değişikliğinden sonraki ilk çalıştırmayı ' +
      'yalnızca öneriye kadar götür.',
      '"Neden ihtar gitmedi?" teşhisinde ilk bak: {{KNB1}} `MAHNA` dolu mu? ' +
      'Vakaların çoğu burada çözülür.',
      'Kalem bloğunu müşteri bloğuna **tercih et** — daha hedefli, kaldırılması unutulsa bile ' +
      'kalem kapanınca etkisi biter.',
      'İhtar bloğu olan müşterileri **periyodik listele**; kaldırılması unutulan bloklar ' +
      'yıllarca takipsiz alacak yaratır.',
      '{{FBL5N}}’e ihtar seviyesi sütununu ekleyip **düzeni kaydet**; ' +
      'karşılık değerlendirmesinin her ay tekrarlanan işidir.',
      'Seviye sayısını üçte tut; fazlası baskı etkisini zayıflatır.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'KNB1', ne:'**İhtar seviyesi** (`MAHNS`) ve son ihtar tarihi (`MADAT`) — basımda' },
      { tablo:'BSID', ne:'Kalem bazında ihtar seviyesi' },
      { tablo:'BSEG', ne:'Kalem ihtar alanları' },
      { tablo:'MHNK', ne:'Çalıştırma sonucu — müşteri başlığı' },
      { tablo:'MHND', ne:'Çalıştırma sonucu — kalem' },
      { tablo:'T047', ne:'Prosedür tanımı ({{FBMP}})' },
    ],

    commit:
      'İhtar çalıştırması **iki ayrı aşamada** commit eder ve bu ayrım sürecin ' +
      'güvenlik mantığının temelidir:\n\n' +
      '**Aşama 1 — öneri:** yalnızca geçici çalıştırma tabloları yazılır. ' +
      'Ana veri ve kalemler **hiç dokunulmaz**. Öneri silinebilir.\n\n' +
      '**Aşama 2 — basım:** mektuplar üretilir ve **aynı LUW’da** {{KNB1}} ile ' +
      'kalem ihtar seviyeleri güncellenir.\n\n' +
      'İkinci aşamanın atomikliği önemlidir: mektup basılıp seviye yazılmaması ' +
      '(veya tersi) tutarsızlık yaratırdı. ' +
      'Ama pratikte şu risk vardır: **basım tamamlandıktan sonra yazıcı sorunu** — ' +
      'seviye yazılmıştır, mektup çıkmamıştır. Bu durumda mektubu yeniden bastırmak ' +
      'için çalıştırmadan tekrar çıktı alınır; seviye ikinci kez artmaz.',

    belgeNo:
      'İhtar **belge numarası üretmez** — bir muhasebe belgesi değildir. ' +
      'Çalıştırma, tarih + tanımlayıcı ikilisiyle tanımlanır.\n\n' +
      'İhtar ücreti veya faiz kaydedilirse **o zaman** normal bir FI belgesi ' +
      '(genelde DR/DA) oluşur ve kendi numarasını alır.',

    postingLogic:
      'İhtar seçim mantığı sırayla şu filtreleri uygular:\n\n' +
      '**1.** Müşteride ihtar prosedürü var mı? ({{KNB1}} `MAHNA`) — yoksa **atlanır**.\n' +
      '**2.** Müşteri ihtar bloğu var mı? — varsa atlanır.\n' +
      '**3.** Kalem ihtar bloğu var mı? — varsa o kalem atlanır.\n' +
      '**4.** Kalem vadesi geçmiş mi? Gecikme günü hangi seviyeye denk geliyor?\n' +
      '**5.** Son ihtardan bu yana **ihtar aralığı** kadar gün geçmiş mi? — geçmemişse ' +
      'seviye ilerlemez.\n' +
      '**6.** Tutar asgari sınırın üstünde mi?\n' +
      '**7.** Kalan kalemler için en yüksek seviye belirlenir — ' +
      '**müşteri tek bir seviyede ihtar alır**, kalemler farklı seviyelerde olsa bile.\n\n' +
      '7. madde sık şaşırtır: bir müşterinin üç kalemi 1., bir kalemi 3. seviyedeyse ' +
      'müşteriye **tek bir 3. seviye mektup** gider ve tüm kalemler listelenir.',

    belgeTuru:
      'İhtarın kendi belge türü yoktur. İhtar ücreti kaydedilirse ' +
      'müşteri borç belgesi türü (DR veya DA) kullanılır; ' +
      'gecikme faizi de aynı şekilde.',

    numberRange:
      'İhtar için numara aralığı gerekmez. Ücret/faiz belgeleri ' +
      'ilgili belge türünün aralığını kullanır.',

    accountDetermination:
      'İhtarın kendisi hesap kullanmaz. İhtar ücreti ve gecikme faizi için ' +
      'gelir hesapları tanımlanmalıdır — ücret {{FBMP}} içinde, ' +
      'faiz ise faiz hesaplama yapılandırmasında ({{OB46}} ve ilgili adımlar).\n\n' +
      'Tanımsızsa ücret/faiz **sessizce kaydedilmez** ve mektupta görünen tutar ' +
      'muhasebeye düşmez — SD entegrasyonundaki sessiz hataya benzer bir durum.',

    tur:
      '**Özelleştirme:** ihtar prosedürleri ({{FBMP}} → {{T047}}), seviye tanımları, ' +
      'metin formları, asgari tutarlar, ücret ayarları.\n\n' +
      '**Ana veri:** müşterinin ihtar prosedürü, bloğu ve **mevcut seviyesi** ({{KNB1}}).\n\n' +
      '**Hareket verisi:** kalem ihtar seviyeleri, çalıştırma sonuçları ({{MHNK}}/{{MHND}}).\n\n' +
      'Dikkat: **ihtar seviyesi ana veride tutulan bir hareket bilgisidir** — ' +
      'ana veri taşınırken bu alan hedef sisteme gitmez ve gitmemelidir.',

    transport:
      'Prosedür tanımları ve metin formları taşınır. **İki uyarı:**\n\n' +
      '**1.** Prosedür taşınır ama **müşterilere atanması taşınmaz** — ' +
      'o ana veridir. Canlıda müşterilere prosedür atanmamışsa ' +
      'ihtar çalışır ama **hiçbir mektup üretmez**.\n\n' +
      '**2.** Metin formları ayrı taşınabilir ve sürüm uyuşmazlığı ' +
      'basım hatalarına yol açar.\n\n' +
      'Geçiş kontrolü: canlıda {{KNB1}} `MAHNA` alanı dolu müşteri sayısını ' +
      'toplam müşteri sayısıyla karşılaştır.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Müşteri Muhasebesi → İş İşlemleri → İhtar → İhtar Prosedürü → İhtar Prosedürlerini Tanımla', not:'{{FBMP}} → {{T047}}' },
      { yol:'SPRO → … → İhtar → İhtar Prosedürü → İhtar Metinlerini Tanımla', not:'Seviye başına form' },
      { yol:'SPRO → … → İhtar → İhtar Bloğu Nedenlerini Tanımla', not:'Blok anahtarları' },
      { yol:'SPRO → Finansal Muhasebe → Müşteri Muhasebesi → İş İşlemleri → Faiz Hesaplama', not:'{{F.2B}} — gecikme faizi (ihtardan **ayrı**)' },
    ],

    ekstra:[
      { ic:'⏱', baslik:'Gecikme günü ile ihtar aralığı — en çok karıştırılan ikili', metin:
        'İki ayrı gün sayısı vardır ve farkları anlaşılmazsa ' +
        '"seviye neden ilerlemiyor?" sorusu cevapsız kalır.\n\n' +
        '**Gecikme günü (days in arrears):** vadeden kaç gün sonra bu seviyenin ' +
        'devreye gireceği. Seviye 1: 14 gün, seviye 2: 30 gün.\n\n' +
        '**İhtar aralığı (dunning interval):** aynı müşteriye **iki ihtar arasında** ' +
        'geçmesi gereken asgari süre. {{T047}} `MANWT`.\n\n' +
        '**Çakıştıkları senaryo:** ihtar aralığı 10 gün. Müşteri 15 Kasım’da ' +
        '1. seviye ihtar aldı. 20 Kasım’da çalıştırma yapıldı ve gecikme artık ' +
        '32 gün — yani 2. seviyeye denk geliyor.\n\n' +
        'Ama son ihtardan yalnızca **5 gün** geçti. İhtar aralığı 10 gün olduğu için ' +
        'sistem **hiç ihtar üretmez**. Müşteri 25 Kasım’dan önce ikinci mektubu almaz.\n\n' +
        '**Pratik sonuç:** çalıştırma sıklığı ile ihtar aralığı **uyumlu** olmalıdır. ' +
        'Haftalık çalıştırma + 10 günlük aralık, seviyelerin ilerlemesini yavaşlatır. ' +
        'Ya aralığı 7 güne indir ya çalıştırmayı iki haftada bire çek.' },

      { ic:'📬', baslik:'Müşteri tek seviyede ihtar alır — kalemler farklı olsa bile', metin:
        'Bir müşterinin dört açık kalemi var: üçü 20 gün gecikmiş (1. seviye), ' +
        'biri 70 gün gecikmiş (3. seviye).\n\n' +
        'Sistem **dört ayrı mektup göndermez**. Müşteriye **tek bir mektup** gider ve ' +
        'seviyesi **en yüksek olan** kalemin seviyesidir: 3. seviye.\n\n' +
        'Mektupta dört kalem de listelenir ama tonu ve metni 3. seviyenindir — ' +
        'yani yasal takip uyarısı içerir.\n\n' +
        'Bu davranış **doğrudur ve kasıtlıdır**: bir müşteriye aynı gün üç farklı ' +
        'sertlikte mektup göndermek anlamsız olurdu.\n\n' +
        'Ama pratik bir sonucu vardır: **eski bir küçük kalem, tüm ilişkiyi ' +
        'yasal takip seviyesine çeker**. 200 TL’lik unutulmuş bir fark, ' +
        'düzenli ödeyen bir müşteriye yasal uyarı gönderilmesine yol açabilir.\n\n' +
        '**Önlem:** asgari tutar kuralını dikkatli ayarla ve ' +
        'küçük bakiye farklarını dönem sonunda temizle ({{F-32}} kalan kapatma).' },
    ],

    notlar:[
      { tip:'warn', baslik:'İhtar bloğu kaldırılması unutulan bir ayardır', metin:
        'Müşteri ihtar bloğu ({{KNB1}} `MANSP`) genelde geçici bir sebeple konur: ' +
        'ödeme planına bağlandı, itiraz var, üst yönetim talimatı.\n\n' +
        'Sorun şudur: **blok kendiliğinden kalkmaz** ve bir son kullanma tarihi yoktur.\n\n' +
        'Sonuç: sebep ortadan kalktıktan yıllar sonra bile müşteri ihtar almaz. ' +
        'Alacak birikir, kimse fark etmez, çünkü ihtar listesinde **hiç görünmez**.\n\n' +
        '**Önlem:** {{KNB1}} `MANSP` alanı dolu müşterileri listeleyen bir sorgu ' +
        'kaydet ve çeyreklik gözden geçir. Ayrıca **kalem bloğunu tercih et** — ' +
        'kalem kapanınca etkisi kendiliğinden biter.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'İhtar mekanizması S/4HANA’da **değişmedi**: {{FBMP}}, {{F150}}, {{T047}}, ' +
      '{{KNB1}} alanları aynı. Değişen, Fiori tabanlı tahsilat uygulamaları ve ' +
      'SAP Collections Management ile daha gelişmiş bir alternatifin sunulması.',

    eccFarklari:[
      { konu:'İhtar prosedürü', ecc:'{{FBMP}} → {{T047}}', s4:'**Değişmedi**' },
      { konu:'İhtar çalıştırması', ecc:'{{F150}}', s4:'Aynı + Fiori "Manage Dunning Notices"' },
      { konu:'Müşteri ana verisi', ecc:'{{XD01}} / {{FD02}}', s4:'{{BP}}' },
      { konu:'Açık kalem verisi', ecc:'{{BSID}} fiziksel', s4:'{{uyumluluk-view}} — {{ACDOCA}}’dan' },
      { konu:'Tahsilat yönetimi', ecc:'Yalnızca ihtar', s4:'**SAP Collections Management** — iş listesi, öncelik puanı' },
      { konu:'Analiz', ecc:'{{FBL5N}} + Excel', s4:'Fiori tahsilat analiz uygulamaları' },
    ],

    universalJournal:
      'İhtar {{ACDOCA}}’ya doğrudan yazmaz — çünkü muhasebe kaydı üretmez. ' +
      'Ama ihtar edilen kalemler {{ACDOCA}}’dan okunur ve ' +
      'analiz artık **boyutlarla birlikte** yapılabilir.\n\n' +
      'Pratik kazanç: "hangi satış organizasyonunun müşterileri daha çok ihtar alıyor?" veya ' +
      '"hangi kâr merkezinde vadesi geçmiş alacak birikiyor?" gibi sorular ' +
      'ek birleştirme olmadan cevaplanır.',

    kalkanTcodes:[
      { eski:'{{XD01}} / {{FD02}}', yeni:'{{BP}}', not:'İhtar alanları BP içinde' },
      { eski:'—', yeni:'—', not:'{{F150}}, {{FBMP}}, {{FBL5N}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Manage Dunning Notices', aciklama:'İhtar önerilerini görsel liste olarak gösterir; ' +
             'müşteri çıkarma ve seviye değiştirme kolaylaşır.' },
      { ad:'Schedule Dunning Runs', aciklama:'{{F150}} yerine; periyodik çalıştırma planlama.' },
      { ad:'Manage Customer Line Items', aciklama:'{{FBL5N}} yerine; ihtar seviyesi filtreli.' },
      { ad:'Collections Worklist', aciklama:'SAP Collections Management — öncelik puanına göre ' +
             'sıralanmış tahsilat iş listesi.' },
      { ad:'Overdue Receivables', aciklama:'Vadesi geçmiş alacakların yaşlandırma analizi.' },
    ],

    compatibilityViews:[
      '{{BSID}}, {{BSAD}} — {{ACDOCA}}’dan türetilen görünümler.',
      '{{KNB1}}, {{T047}}, {{MHNK}}, {{MHND}} — **fiziksel tablo olarak duruyor**.',
      'İhtar, S/4HANA geçişinde yapı olarak etkilenmeyen alanlardandır.',
    ],

    performans:
      'İhtar çalıştırması açık kalem taraması yaptığı için ECC’de büyük müşteri ' +
      'portföylerinde yavaştı; HANA ile belirgin hızlandı.\n\n' +
      'Asıl fark **Collections Management** ile gelir: klasik ihtar "kim gecikti?" sorusuna ' +
      'cevap verir; Collections Management "kimi **önce** aramalıyım?" sorusuna ' +
      'öncelik puanıyla cevap verir (tutar, gecikme, müşteri geçmişi, ödeme davranışı).',

    bestPractices:[
      'Klasik ihtar yeterliyse **onda kal** — Collections Management ayrı bir ' +
      'yapılandırma ve süreç yatırımı gerektirir.',
      'Fiori "Manage Dunning Notices" ile öneri düzenlemeyi kolaylaştır; ' +
      'öneri adımının kullanılma oranı artar.',
      'Geçişte müşterilerin {{KNB1}} `MAHNA` alanının dolu olduğunu doğrula — ' +
      'prosedür taşınır ama **atama taşınmaz**.',
      'İhtar bloğu olan müşterileri geçiş öncesi temizle; ' +
      'yeni sistemde eski bloklar gözden kaçar.',
      'Vadesi geçmiş alacak analizini {{ACDOCA}} boyutlarıyla zenginleştir — ' +
      'hangi segmentin tahsilatının kötü olduğu ilk kez görülebilir hâle gelir.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'İhtar çalıştı, 42 müşteri seçildi, 3 mektup gitti: kalan 39 nerede?',
    hikaye:
      '**Doğu Ticaret A.Ş.** tahsilat sorumlusu ilk kez {{F150}} çalıştırıyor. ' +
      'Öneri ekranında **42 müşteri** listeleniyor — beklendiği gibi.\n\n' +
      'Basım yapılıyor. Yazıcıdan **3 mektup** çıkıyor.\n\n' +
      'Kalan 39 müşteriye ne oldu? Bu senaryo, ihtarın en sık iki yapılandırma ' +
      'sorununu ve teşhis yöntemini gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · TRY' },
      { k:'Açık müşteri kalemi', v:'340 kalem · 187 müşteri' },
      { k:'Vadesi geçmiş', v:'42 müşteri · toplam 2.860.000 TL' },
      { k:'İhtar prosedürü', v:'Z1 · 3 seviye (14 / 30 / 60 gün)' },
      { k:'**Sorun**', v:'Öneride 42, basımda **3 mektup**' },
    ],

    adimlar:[
      { baslik:'Öneri yeniden üretilir ve dikkatle okunur', tcode:'F150',
        aciklama:'Bu kez öneri listesindeki **durum sütunu** inceleniyor.',
        girdi:[
          { alan:'Listelenen müşteri', deger:'42' },
          { alan:'"İhtar edilecek" durumunda', deger:'**3**' },
          { alan:'"Prosedür yok" durumunda', deger:'**31**' },
          { alan:'"Bloklu" durumunda', deger:'**8**' },
        ],
        not:'**İlk ders burada:** öneri listesi "ihtar edilecek müşteriler" listesi **değildir** — ' +
             '"incelenen müşteriler" listesidir. Durum sütunu okunmadan sayıya bakmak yanıltır.\n\n' +
             '42 müşterinin yalnızca 3’ü gerçekten ihtar edilebilir durumda; ' +
             'diğerleri iki sebepten eleniyor.' },

      { baslik:'Birinci sebep — 31 müşteride prosedür yok', tcode:'FBL5N',
        aciklama:'Müşteri ana verisindeki ihtar prosedürü alanı kontrol ediliyor.',
        girdi:[
          { alan:'Toplam müşteri', deger:'187' },
          { alan:'{{KNB1}} `MAHNA` dolu', deger:'**23**' },
          { alan:'`MAHNA` boş', deger:'**164**' },
          { alan:'Sebep', deger:'Prosedür yeni tanımlandı, **müşterilere hiç atanmadı**' },
        ],
        not:'**Prosedür tanımlamak yetmez — müşteriye atanmalıdır.**\n\n' +
             'Bu, "prosedür taşınır ama atama taşınmaz" kuralının canlıdaki karşılığı: ' +
             '{{FBMP}} yapılandırması test sisteminden geldi, ' +
             'ama {{KNB1}} `MAHNA` bir **ana veri** alanı ve taşınmadı.\n\n' +
             'Danışman prosedürü kurdu, "ihtar hazır" dedi; kimse müşterilere ' +
             'atanması gerektiğini söylemedi.' },

      { baslik:'Toplu atama yapılır', tcode:'FD02',
        aciklama:'164 müşteriye prosedür atanıyor — tek tek değil, toplu değişiklikle.',
        girdi:[
          { alan:'Yöntem', deger:'Toplu ana veri değişikliği (XD99 / LSMW veya {{BP}} toplu güncelleme)' },
          { alan:'Atanan', deger:'`MAHNA` = **Z1** · 164 müşteri' },
          { alan:'İstisna', deger:'12 kamu müşterisi hariç tutuldu (farklı prosedür Z2)' },
        ],
        tabloEtkisi:[
          { tablo:'KNB1', ne:'`MAHNA` alanı 164 müşteride dolduruldu' },
        ],
        not:'**Kritik detay:** atama sırasında müşteri segmentleri ayrıştırıldı. ' +
             'Kamu müşterilerine daha uzun vadeli bir prosedür (Z2: 30/60/90 gün) atandı — ' +
             'çünkü ödeme süreçleri yapısal olarak daha uzun ve ' +
             'aynı sertlikte ihtar göndermek ilişkiyi bozardı.' },

      { baslik:'İkinci sebep — 8 müşteride blok var', tcode:'FD02',
        aciklama:'Bloklu müşteriler tek tek inceleniyor.',
        girdi:[
          { alan:'Bloklu müşteri', deger:'8' },
          { alan:'Ödeme planına bağlı (geçerli)', deger:'**2**' },
          { alan:'Dava sürecinde (geçerli)', deger:'**1**' },
          { alan:'**Sebebi bilinmeyen / eski**', deger:'**5**' },
          { alan:'En eski blok tarihi', deger:'**2024** — 3 yıllık' },
        ],
        not:'Beş müşterinin bloğu yıllar önce konmuş ve **sebebi kimse bilmiyor**. ' +
             'Bu beş müşterinin toplam vadesi geçmiş alacağı: **410.000 TL**.\n\n' +
             'Üç yıl boyunca bu müşterilere hiç ihtar gitmedi ve ' +
             'ihtar listesinde **hiç görünmedikleri** için kimse fark etmedi.\n\n' +
             'Bu, ihtar bloğunun en tipik sorunudur: **son kullanma tarihi yoktur.**' },

      { baslik:'Bloklar temizlenir, öneri yeniden üretilir', tcode:'F150',
        aciklama:'Geçersiz bloklar kaldırılıp öneri yeniden çalıştırılıyor.',
        girdi:[
          { alan:'Kaldırılan blok', deger:'5 müşteri' },
          { alan:'Korunan blok', deger:'3 müşteri (ödeme planı + dava)' },
          { alan:'**Yeni öneri**', deger:'42 müşteri · **39’u ihtar edilecek**' },
          { alan:'Seviye dağılımı', deger:'1. seviye 26 · 2. seviye 10 · 3. seviye 3' },
        ],
        not:'Öneri artık gerçeği yansıtıyor. Ama **basım henüz yapılmadı** — ' +
             'liste bir kez daha gözden geçiriliyor.' },

      { baslik:'Öneri düzenlenir — iki müşteri çıkarılır', tcode:'F150',
        aciklama:'Basımdan önce son kontrol.',
        girdi:[
          { alan:'C-5044', deger:'Dün ödeme sözü verdi → **çıkarıldı**' },
          { alan:'C-5112', deger:'3. seviye ama tutar **180 TL** → çıkarıldı' },
          { alan:'C-5112 detayı', deger:'Eski bir kuruş farkı; müşterinin diğer borcu yok' },
          { alan:'Basılacak', deger:'**37 mektup**' },
        ],
        not:'**C-5112 vakası öğreticidir:** 180 TL’lik unutulmuş bir bakiye farkı ' +
             '70 gün gecikmiş olduğu için 3. seviyeye (yasal takip uyarısı) düşmüş.\n\n' +
             'Düzenli ödeyen bir müşteriye 180 TL için yasal uyarı göndermek ' +
             'ilişkiyi zedeler. Kalem {{F-32}} ile kalan kapatma yapılarak temizlendi ve ' +
             'asgari tutar sınırı 50 TL’den **250 TL’ye** çıkarıldı.' },

      { baslik:'İhtarlar basılır', tcode:'F150',
        aciklama:'Basım adımı çalıştırılıyor — geri dönüşü olmayan adım.',
        girdi:[
          { alan:'Basılan', deger:'37 mektup' },
          { alan:'Güncellenen', deger:'{{KNB1}} `MAHNS` ve `MADAT` · kalem seviyeleri' },
          { alan:'Muhasebe kaydı', deger:'**Yok** — mizan değişmedi' },
        ],
        tabloEtkisi:[
          { tablo:'KNB1', ne:'37 müşteride ihtar seviyesi ve tarihi güncellendi' },
          { tablo:'BSID', ne:'İlgili kalemlerde seviye yazıldı' },
          { tablo:'MHNK', ne:'Çalıştırma sonucu kaydedildi' },
          { tablo:'ACDOCA', ne:'**Değişiklik yok** — ihtar muhasebe kaydı üretmez' },
        ],
        not:'Mizan kontrol edildi: **tek kuruş değişmedi**. ' +
             'İhtar bir süreç işlemidir, muhasebe işlemi değil.' },

      { baslik:'İkinci hafta — seviyeler ilerlemiyor', tcode:'F150',
        aciklama:'Bir hafta sonra tekrar çalıştırılıyor ama beklenen olmuyor.',
        girdi:[
          { alan:'Beklenen', deger:'1. seviyedekilerin bir kısmı 2. seviyeye geçmeli' },
          { alan:'Gerçekleşen', deger:'**Hiçbir yeni ihtar üretilmedi**' },
          { alan:'Prosedür ihtar aralığı', deger:'{{T047}} `MANWT` = **14 gün**' },
          { alan:'Son ihtardan geçen', deger:'**7 gün**' },
        ],
        not:'**İkinci ders:** gecikme günü ile **ihtar aralığı** farklı şeylerdir.\n\n' +
             'Müşterilerin gecikmesi 2. seviyeye denk gelse bile, ' +
             'son ihtardan yalnızca 7 gün geçti ve prosedürdeki ihtar aralığı 14 gün.\n\n' +
             'Sistem doğru davranıyor: aynı müşteriye bir hafta içinde ikinci mektup ' +
             'göndermek anlamsız olurdu. ' +
             'Çözüm: **çalıştırmayı iki haftada bire çekmek** ' +
             '(veya aralığı 7 güne indirmek — ama bu daha agresif bir politikadır).' },

      { baslik:'Önlemler ve rutinleştirme', tcode:'FBL5N',
        aciklama:'Süreç kalıcı hâle getiriliyor.',
        girdi:[
          { alan:'Önlem 1', deger:'Çalıştırma **iki haftada bir** — ihtar aralığıyla uyumlu' },
          { alan:'Önlem 2', deger:'Yeni müşteri açılışında `MAHNA` **zorunlu alan** yapıldı' },
          { alan:'Önlem 3', deger:'Bloklu müşteri listesi **çeyreklik** gözden geçirme' },
          { alan:'Önlem 4', deger:'Asgari tutar 250 TL — küçük farklar yasal seviyeye çıkmasın' },
          { alan:'Önlem 5', deger:'{{FBL5N}} ihtar seviyesi düzeni kaydedildi (karşılık için)' },
        ],
        not:'İkinci önlem en kalıcısı: müşteri hesap grubunun **alan durumunda** ' +
             '`MAHNA` zorunlu yapıldı. Artık prosedürsüz müşteri **açılamıyor** — ' +
             'sorun kaynağında kapatıldı.' },
    ],

    sonuc:
      '**42 müşterilik öneriden 3 mektup çıktı** — ve iki sebebi de yapılandırmadaydı.\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Öneri listesi "ihtar edilecekler" listesi değildir.** ' +
      '"İncelenen müşteriler" listesidir ve **durum sütunu** okunmadan sayıya bakmak yanıltır. ' +
      '42’nin 31’i prosedürsüz, 8’i bloklu, yalnızca 3’ü ihtar edilebilir durumdaydı.\n\n' +
      '**2. Prosedür tanımlamak yetmez — müşteriye atanmalıdır.** ' +
      '{{FBMP}} bir **özelleştirmedir** ve taşınır; {{KNB1}} `MAHNA` bir **ana veri** alanıdır ve ' +
      'taşınmaz. "Neden ihtar gitmedi?" sorusunun teşhis sırasında ilk madde budur ve ' +
      'vakaların çoğu orada çözülür.\n\n' +
      '**3. İhtar bloğunun son kullanma tarihi yoktur.** ' +
      'Beş müşterinin bloğu üç yıl önce konmuş, sebebi unutulmuş, ' +
      '410.000 TL takipsiz kalmıştı. Bloklu müşteriler **hiçbir ihtar listesinde görünmediği** için ' +
      'kendiliğinden fark edilmezler — periyodik gözden geçirme zorunludur. ' +
      'Mümkünse kalem bloğu tercih edilmelidir; kalem kapanınca etkisi biter.\n\n' +
      '**4. Çalıştırma sıklığı ile ihtar aralığı uyumlu olmalıdır.** ' +
      'Haftalık çalıştırma + 14 günlük ihtar aralığı, çalıştırmaların yarısını ' +
      'boşa çıkarır. Gecikme günü "bu seviye ne zaman devreye girer"i, ' +
      'ihtar aralığı "aynı müşteriye ne sıklıkta yazılır"ı belirler — ' +
      'ikisi farklı sorulardır ve ikisi de ayarlanmalıdır.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '{{ihtar}}, vadesi geçmiş alacaklar için **kademeli hatırlatma** sürecidir ({{F150}}).',
      'Prosedür {{FBMP}} ile tanımlanır ({{T047}}), müşteriye {{KNB1}} `MAHNA` ile atanır.',
      '**İhtar muhasebe kaydı üretmez** — yalnızca ihtar alanlarını günceller.',
      'Çalıştırma dört adımdır: parametre → **öneri** → düzenleme → basım.',
      '**Öneri adımı risksizdir**; basım adımının geri dönüşü yoktur.',
      '**Gecikme günü** ≠ **ihtar aralığı**: biri seviyeyi, diğeri sıklığı belirler.',
      'Müşteri **tek bir seviyede** ihtar alır — en yüksek kalem seviyesi geçerlidir.',
      'İhtar ücreti ve gecikme faizi ({{F.2B}}) ihtardan **ayrı** kayıt üretir.',
    ],

    onemliNoktalar:[
      '**"İhtar çalıştırması muhasebe kaydı üretir mi?"** **Normalde hayır.** Yalnızca {{KNB1}} ve kalem ihtar alanları güncellenir; mizanda tek kuruş değişmez. Ücret veya faiz tanımlıysa **ayrı** bir kayıt oluşur.',
      '**"Müşteriye neden ihtar gitmiyor?"** Teşhis sırası: (1) {{KNB1}} `MAHNA` dolu mu — **vakaların çoğu burada**, (2) müşteri bloğu, (3) kalem bloğu, (4) asgari tutar, (5) gecikme günü + ihtar aralığı.',
      '**"Gecikme günü ile ihtar aralığı farkı?"** Gecikme günü: vadeden kaç gün sonra bu seviye devreye girer. İhtar aralığı: aynı müşteriye iki ihtar arasında geçmesi gereken **asgari süre** ({{T047}} `MANWT`). Aralık dolmamışsa gecikme yeterli olsa bile ihtar üretilmez.',
      '**"Bir müşterinin kalemleri farklı seviyelerdeyse?"** Müşteriye **tek mektup** gider ve seviyesi **en yüksek** kalemin seviyesidir. Tüm kalemler mektupta listelenir. Yan etki: küçük eski bir kalem tüm ilişkiyi yasal seviyeye çeker.',
      '**"Öneri adımı ne işe yarar?"** Basımdan önce **hiçbir şey güncellenmez**; öneri silinip yeniden üretilebilir. Canlı sistemde prosedür testinin tek güvenli yoludur.',
      '**"Prosedür taşınırsa ihtar çalışır mı?"** **Hayır.** {{FBMP}} özelleştirmedir ve taşınır; {{KNB1}} `MAHNA` ana veridir ve taşınmaz. Canlıda müşterilere ayrıca atanmalıdır.',
      '**"Gecikme faizi ihtarın parçası mı?"** **Hayır** — ayrı bir programdır ({{F.2B}}). Müşteride faiz göstergesi tanımlı değilse hesaplama o müşteriyi sessizce atlar.',
      '**"İhtar seviyesi nerede tutulur?"** İki yerde: müşteri bazında {{KNB1}} `MAHNS`, kalem bazında {{BSID}}/{{BSEG}}. Elle değiştirilebilir — karşılık politikası buna bağlıysa risk oluşturur.',
    ],

    sikHatalar:[
      { hata:'Prosedürü tanımlayıp müşteriye atamayı unutmak.', dogru:'{{KNB1}} `MAHNA` boşsa müşteri **hiç ihtar almaz**. Yeni müşteri açılışında alanı zorunlu yap.' },
      { hata:'Öneri listesindeki müşteri sayısını "gidecek mektup sayısı" sanmak.', dogru:'Öneri "incelenen müşteriler" listesidir; **durum sütunu** okunmalıdır.' },
      { hata:'Öneri adımını atlayıp doğrudan basmak.', dogru:'Basımın geri dönüşü yoktur. Prosedür değişikliğinden sonra mutlaka öneri incelenir.' },
      { hata:'Müşteri bloğu koyup kaldırmayı unutmak.', dogru:'Bloğun son kullanma tarihi yoktur; bloklu müşteriler hiçbir listede görünmez. Çeyreklik gözden geçir.' },
      { hata:'Çalıştırma sıklığını ihtar aralığından kısa tutmak.', dogru:'Çalıştırmaların yarısı boşa çıkar. İkisi uyumlu ayarlanmalıdır.' },
      { hata:'İhtarın muhasebe kaydı ürettiğini sanmak.', dogru:'Üretmez. Ücret/faiz varsa onlar ayrı kayıttır.' },
      { hata:'Gecikme faizini ihtarın parçası sanmak.', dogru:'{{F.2B}} ayrı programdır; müşteride faiz göstergesi tanımlı olmalıdır.' },
      { hata:'Asgari tutarı çok düşük bırakmak.', dogru:'Küçük bakiye farkları müşteriyi yasal takip seviyesine çeker ve ilişkiyi zedeler.' },
    ],

    ipuclari:[
      '**Öneri ile basımı ayır.** Prosedür değişikliğinden sonraki ilk çalıştırmayı ' +
      'yalnızca öneriye kadar götür — canlıda test etmenin güvenli yolu.',
      '"Neden ihtar gitmedi?" teşhisinde ilk bakılacak yer {{KNB1}} `MAHNA`.',
      'Kalem bloğunu müşteri bloğuna tercih et; kalem kapanınca etkisi kendiliğinden biter.',
      '{{KNB1}} `MANSP` dolu müşterileri listeleyen bir sorgu kaydet, çeyreklik çalıştır.',
      '{{FBL5N}}’e ihtar seviyesi (`MAHNS`) sütununu ekleyip **düzeni kaydet** — ' +
      'karşılık değerlendirmesinin dayanağı olur.',
      'Müşteri segmentlerine farklı prosedür ata: kamu için uzun vadeli, ' +
      'perakende için agresif. Tek prosedür her müşteriye uymaz.',
    ],

    quiz:[
      { soru:'{{F150}} ihtar çalıştırması hangi muhasebe kaydını üretir?',
        secenekler:[
          'Müşteri borç / gelir alacak',
          'Şüpheli alacak aktarımı',
          '**Normalde hiçbir kayıt üretmez**',
          'Karşılık kaydı',
        ], dogru:2,
        aciklama:'İhtar bir **süreç işlemidir**, muhasebe işlemi değil. ' +
                 '340 müşteriye ihtar basılabilir ve mizanda tek kuruş değişmez. ' +
                 'Yalnızca {{KNB1}} ve kalem ihtar alanları güncellenir. ' +
                 'İhtar ücreti veya gecikme faizi tanımlıysa **onlar** ayrı kayıt üretir.' },

      { soru:'Bir müşteriye hiç ihtar gitmiyor. İlk kontrol edilecek şey?',
        secenekler:[
          'Ödeme koşulu',
          '**{{KNB1}} `MAHNA` — ihtar prosedürü atanmış mı**',
          'Mutabakat hesabı',
          'Kredi limiti',
        ], dogru:1,
        aciklama:'Prosedür atanmamış müşteri {{F150}} tarafından **hiç seçilmez**. ' +
                 'Prosedür tanımlamak ({{FBMP}}) bir özelleştirmedir ve taşınır; ' +
                 'müşteriye atama bir **ana veri** işlemidir ve taşınmaz. ' +
                 'Teşhis vakalarının çoğu burada çözülür.' },

      { soru:'Bir müşterinin 3 kalemi 1. seviyede, 1 kalemi 3. seviyede. Ne olur?',
        secenekler:[
          '4 ayrı mektup gider',
          '2 mektup gider (her seviye için bir tane)',
          '**Tek mektup gider, seviyesi 3 olur, tüm kalemler listelenir**',
          'Hiç mektup gitmez',
        ], dogru:2,
        aciklama:'Müşteriye **tek bir mektup** gider ve seviyesi **en yüksek** kalemin ' +
                 'seviyesidir. Aynı gün üç farklı sertlikte mektup göndermek anlamsız olurdu. ' +
                 'Yan etkisi: küçük ve eski bir kalem, düzenli ödeyen bir müşteriyi ' +
                 'yasal takip seviyesine çekebilir.' },

      { soru:'Gecikme 32 gün (2. seviyeye denk), ama sistem ihtar üretmiyor. Sebep?',
        secenekler:[
          'Prosedür yanlış',
          'Kalem bloklu',
          '**İhtar aralığı dolmamış — son ihtardan yeterli gün geçmemiş**',
          'Tutar asgari sınırın altında',
        ], dogru:2,
        aciklama:'**Gecikme günü** ile **ihtar aralığı** ({{T047}} `MANWT`) farklı şeylerdir. ' +
                 'Gecikme 2. seviyeye denk gelse bile, son ihtardan itibaren ' +
                 'ihtar aralığı kadar gün geçmemişse sistem ihtar üretmez. ' +
                 'Çalıştırma sıklığı ile aralık uyumlu olmalıdır.' },

      { soru:'İhtar önerisinde 42 müşteri var. Bu ne anlama gelir?',
        secenekler:[
          '42 mektup basılacak',
          '**42 müşteri incelendi; kaçının ihtar edileceği durum sütununda görülür**',
          '42 müşteri bloklu',
          '42 müşteri 1. seviyede',
        ], dogru:1,
        aciklama:'Öneri listesi "ihtar edilecekler" değil **"incelenen müşteriler"** listesidir. ' +
                 'Prosedürsüz, bloklu veya asgari tutarın altındaki müşteriler de listede ' +
                 'görünür ama ihtar edilmez. **Durum sütunu okunmadan sayıya bakmak yanıltır.**' },

      { soru:'Öneri adımının en önemli değeri nedir?',
        secenekler:[
          'Daha hızlı çalışır',
          'Mektupları önizler',
          '**Hiçbir alan güncellenmez; öneri silinip yeniden üretilebilir**',
          'Muhasebe kaydını simüle eder',
        ], dogru:2,
        aciklama:'Öneri aşamasında hiçbir mektup basılmaz, {{KNB1}} güncellenmez, ' +
                 'müşteriye hiçbir şey gitmez. Öneri **tamamen silinebilir**. ' +
                 'Bu, canlı sistemde yeni bir prosedürü test etmenin **tek güvenli yoludur**. ' +
                 'Basımdan sonra ise seviye yazılmıştır ve mektup postaya çıkmıştır.' },

      { soru:'Gecikme faizi nasıl hesaplanır ve kaydedilir?',
        secenekler:[
          '{{F150}} ihtar çalıştırması sırasında otomatik',
          '**{{F.2B}} ile ayrı bir program çalıştırılarak**',
          'Elle {{FB70}} ile',
          'İhtar prosedüründe otomatik kaydedilir',
        ], dogru:1,
        aciklama:'Faiz **ihtarın parçası değildir**. İhtar mektubu faizden bahsedebilir ama ' +
                 'faizin hesaplanması ve kaydedilmesi ayrı bir programla ({{F.2B}}) yapılır. ' +
                 'Müşteri ana verisinde **faiz göstergesi** tanımlı olmalıdır; ' +
                 'yoksa hesaplama o müşteriyi sessizce atlar.' },

      { soru:'İhtar bloğunun en büyük operasyonel riski nedir?',
        secenekler:[
          'Performansı yavaşlatır',
          'Mizanı bozar',
          '**Son kullanma tarihi yoktur; kaldırılması unutulur ve müşteri hiçbir listede görünmez**',
          'Prosedürü siler',
        ], dogru:2,
        aciklama:'Blok genelde geçici bir sebeple konur (ödeme planı, itiraz) ama ' +
                 '**kendiliğinden kalkmaz**. Bloklu müşteri ihtar listelerinde ' +
                 '**hiç görünmediği** için yıllarca takipsiz kalabilir. ' +
                 'Önlem: bloklu müşterileri periyodik listele; mümkünse ' +
                 '**kalem bloğunu** tercih et — kalem kapanınca etkisi biter.' },
    ],

    flashcards:[
      { on:'İhtar muhasebe kaydı üretir mi?', arka:'**Normalde HAYIR.**\n\nYalnızca ihtar alanları güncellenir:\n• KNB1-MAHNS (seviye)\n• KNB1-MADAT (tarih)\n• Kalem seviyeleri\n\nMizan **değişmez**. Ücret/faiz varsa **onlar** ayrı kayıttır.' },
      { on:'"Neden ihtar gitmedi?" — teşhis sırası', arka:'**1. KNB1-MAHNA dolu mu?** ← vakaların çoğu\n2. Müşteri ihtar bloğu var mı?\n3. Kalem bloğu var mı?\n4. Tutar asgari sınırın üstünde mi?\n5. Gecikme günü + ihtar aralığı dolmuş mu?' },
      { on:'Gecikme günü vs ihtar aralığı', arka:'**Gecikme günü** — vadeden kaç gün sonra bu **seviye** devreye girer (14/30/60)\n\n**İhtar aralığı** — aynı müşteriye iki ihtar arasında geçmesi gereken asgari süre (T047-MANWT)\n\nAralık dolmamışsa gecikme yeterli olsa bile ihtar **üretilmez**.' },
      { on:'F150 dört adımı', arka:'**1. Parametre** — ihtar tarihi kritik\n**2. Öneri** — hiçbir şey güncellenmez ✓ risksiz\n**3. Düzenleme** — çıkar, seviye değiştir, sil\n**4. Basım** — **geri dönüşü yok**' },
      { on:'Kalemler farklı seviyelerdeyse?', arka:'Müşteriye **TEK mektup** gider.\n\nSeviyesi **en yüksek** kalemin seviyesidir.\nTüm kalemler mektupta listelenir.\n\nYan etki: küçük eski bir kalem tüm ilişkiyi yasal seviyeye çeker.' },
      { on:'Öneri listesinde 42 müşteri var — ne demek?', arka:'**42 mektup demek DEĞİL.**\n\nÖneri = "incelenen müşteriler" listesi.\n\nDurum sütunu okunmalı:\n• Prosedür yok\n• Bloklu\n• Asgari tutarın altında\n• **İhtar edilecek** ← gerçek sayı' },
      { on:'Prosedür taşınırsa ihtar çalışır mı?', arka:'**HAYIR.**\n\nFBMP prosedürü = **özelleştirme** → taşınır ✓\nKNB1-MAHNA ataması = **ana veri** → taşınmaz \n\nCanlıda müşterilere ayrıca atanmalıdır.' },
      { on:'Gecikme faizi nasıl kaydedilir?', arka:'**F.2B** ile — ihtardan **ayrı** program.\n\nMüşteride **faiz göstergesi** tanımlı olmalı; yoksa hesaplama o müşteriyi **sessizce atlar**.\n\nİhtar mektubu faizden bahsedebilir ama kaydı ayrıdır.' },
      { on:'İhtar bloğunun riski nedir?', arka:'**Son kullanma tarihi yoktur.**\n\nGeçici sebeple konur (ödeme planı, itiraz), kaldırılması **unutulur**.\n\nBloklu müşteri hiçbir ihtar listesinde **görünmez** → yıllarca takipsiz kalır.\n\n→ Kalem bloğunu tercih et.' },
      { on:'İhtar seviyesi nerede tutulur?', arka:'**İki yerde:**\n\n• Müşteri bazında: **KNB1-MAHNS** + MADAT\n• Kalem bazında: **BSID/BSEG-MAHNS**\n\nBasım adımında **ikisi de** güncellenir.\nElle değiştirilebilir — karşılık politikası buna bağlıysa risk.' },
      { on:'İhtarın muhasebeye katkısı nedir?', arka:'**Dolaylı — karşılık kararının nesnel ölçütü.**\n\n"3. seviye ihtar almış ve 30 gün geçmiş alacaklara %50 karşılık" politikası:\n• Denetlenebilir\n• Tutarlı\n• Belgeli\n\nAyrıca yasal takibin dayanağı.' },
      { on:'Çalıştırma sıklığı ne olmalı?', arka:'**İhtar aralığıyla uyumlu.**\n\nHaftalık çalıştırma + 14 günlük aralık → çalıştırmaların **yarısı boşa** çıkar.\n\nYa aralığı 7 güne indir (agresif) ya çalıştırmayı iki haftada bire çek.' },
    ],
  },

  },
});
