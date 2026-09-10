/* ==========================================================================
   content/fi/lsmw.js — "LSMW (Legacy System Migration Workbench)"

   Ana tez: LSMW bir yükleme aracı değil, bir TARİF DEFTERİDİR.
   ========================================================================== */

SAP.registerTopic({
  id: 'lsmw',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'LSMW, eski sistemlerden SAP’a veri aktarmak için kullanılan **14 adımlı** klasik araçtır.\n\n' +
      'Ama bu tanım aracın **ne olduğunu** söyler, **neden böyle tasarlandığını** söylemez.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Bu konunun tezi:**\n\n' +
      '**LSMW bir yükleme aracı değil, bir *tarif defteridir*.**\n\n' +
      'Veriyi yüklemek kolaydır — bir kez. Zor olan **aynı yüklemeyi ' +
      'onlarca kez, farklı sistemlerde, aynı sonuçla tekrarlamaktır**.\n\n' +
      'Bir veri geçişi projesinde aynı yükleme şunlar için tekrarlanır:\n\n' +
      '• Geliştirme sisteminde **deneme**\n' +
      '• Test sisteminde **prova** (birden çok kez)\n' +
      '• Kullanıcı kabul testinde\n' +
      '• Canlıya geçişte — **tek şansla**\n\n' +
      'Her seferinde eşlemeyi baştan yapmak hem yavaştır hem de ' +
      '**farklı sonuç üretme riski** taşır.\n\n' +
      'LSMW’nin 14 adımı bu yüzden vardır: **tarif bir kez yazılır, ' +
      'defalarca uygulanır** — ve taşınabilir bir nesne olarak ' +
      'sisteme kaydedilir.',

    neden:
      '**Tekrarlanabilirlik.** Aynı tarif, aynı sonucu üretir. ' +
      'Elle yapılan eşleme her seferinde biraz farklıdır.\n\n' +
      '**Taşınabilirlik.** Proje geliştirme sisteminde hazırlanır, ' +
      '**dışa aktarılır**, test ve canlı sisteme taşınır.\n\n' +
      '**Ayrıştırma.** Eşleme kuralları veriden **ayrıdır**. ' +
      'Veri değişince tarif değişmez; tarif değişince veri değişmez.\n\n' +
      '**Denetlenebilirlik.** Hangi alanın nereden geldiği **belgelidir**. ' +
      'Altı ay sonra *"bu kâr merkezi nereden geldi?"* sorusu cevaplanabilir.\n\n' +
      '**Programsızlık.** ABAP yazmadan, ekran kaydı ({{kayit-recording}}) ' +
      'veya standart nesne ile çalışır.',

    sirketOnemi:
      'Veri geçişi, ERP projelerinin **en çok küçümsenen** ve en sık ' +
      'geciktiren parçasıdır.\n\n' +
      'Sebebi şudur: **veri kalitesi sorunu, aracın sorunu değildir** — ' +
      'ama araç çalıştırılana kadar **görünmez**.\n\n' +
      'Eski sistemde 12.000 satıcı vardır. Yükleme başlar ve şunlar ortaya çıkar:\n\n' +
      '• 340’ında vergi numarası **yok**\n' +
      '• 89’unda ülke kodu **geçersiz**\n' +
      '• 1.200’ü aslında **mükerrer** kayıt\n' +
      '• 45’inde ödeme koşulu SAP’ta **tanımlı değil**\n\n' +
      'Bunların hiçbiri LSMW’nin hatası değildir — ama hepsi ' +
      '**LSMW çalıştırılınca** ortaya çıkar.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Danışman için asıl ders:** LSMW’nin en değerli çıktısı ' +
      'yüklenen veri değil, **ilk deneme çalıştırmasının hata listesidir**. ' +
      'O liste, veri temizliği projesinin **iş planıdır**.\n\n' +
      'Bu yüzden deneme çalıştırması **mümkün olan en erken** yapılmalıdır — ' +
      'veri hazır olduğunda değil, veri **hazırlanırken**.',

    gercekHayat:
      'Proje yöneticisi: *"Satıcı verilerini yükleyin, dosya hazır."*\n\n' +
      'Deneyimsiz yaklaşım: dosyayı al, LSMW kur, çalıştır, hataları düzelt, ' +
      'tekrar çalıştır. Hatalar bitmez; her turda yenisi çıkar.\n\n' +
      '━━━━━━━━━━\n\n' +
      'Deneyimli yaklaşım **ters sıradan** başlar:\n\n' +
      '**1.** Önce SAP’ta **elle bir satıcı aç** ({{XK01}}).\n' +
      '**2.** Hangi alanlar **zorunlu**, not al.\n' +
      '**3.** Bu listeyi kaynak dosyayla karşılaştır — **eksikler** görünür.\n' +
      '**4.** Sonra LSMW kur.\n\n' +
      '**Neden bu sıra daha hızlı:** LSMW’nin zorunlu alan hatası ' +
      '**satır satır** gelir ve her turda bir sonrakine takılırsın. ' +
      'Elle bir kayıt açmak ise **tüm zorunlu alanları bir kerede** gösterir.\n\n' +
      '⭐ **Kural:** eşleme, kaynak dosyadan değil ' +
      '**SAP’ın zorunlu alan listesinden** başlanarak yapılır.',

    muhasebeMantigi:
      'LSMW ile FI tarafında iki tür veri taşınır ve **ikisi tamamen farklıdır**:\n\n' +
      '**① Ana veri** — satıcı, müşteri, G/L hesabı, varlık.\n' +
      'Muhasebe kaydı **üretmez**. Yanlışsa düzeltilir, iz kalmaz.\n\n' +
      '**② Hareket verisi** — açık kalemler, bakiyeler.\n' +
      '⚠️ **Muhasebe kaydı üretir.** Yanlışsa {{FB08}} gerekir ve **iz kalır**.\n\n' +
      '━━━━━━━━━━\n\n' +
      'İkinci grup çok daha risklidir ve **ayrı bir kural** ister: ' +
      'açılış bakiyeleri **karşı hesap** üzerinden atılır.\n\n' +
      'Her satıcı borcunun bir karşılığı olmalıdır; ' +
      'bu karşılık genelde bir **geçiş hesabıdır** (örn. `199` veya `399`).\n\n' +
      '⭐ **Kontrol basittir ve kesindir:** tüm açılış kayıtları girildikten sonra ' +
      '**geçiş hesabının bakiyesi sıfır olmalıdır**.\n\n' +
      'Sıfır değilse ya bir kalem eksik yüklenmiştir ya da fazla. ' +
      'Bu tek kontrol, {{sayi-mutabakati}}’nın muhasebe tarafındaki karşılığıdır ' +
      've **tutar bazında** çalıştığı için adet kontrolünden **daha güçlüdür**.',

    kavramlar: ['kayit-recording', 'toplu-giris', 'alan-esleme', 'donusum-kurali',
                'sayi-mutabakati', 'tasima-istegi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'LSMW’nin 14 adımı korkutucu görünür ama aslında **dört mantıksal öbektir**. ' +
      'Öbekleri görünce sıra kendiliğinden anlaşılır: ' +
      '**tanımla → eşle → oku ve dönüştür → yaz.**',

    roller:[
      { rol:'Danışman', gorev:'⭐ **Önce elle bir kayıt açar** — zorunlu alanları görmek için.' },
      { rol:'Danışman', gorev:'Proje / alt proje / nesne yapısını kurar.' },
      { rol:'Danışman', gorev:'**Aktarım yöntemini** seçer: standart nesne · {{kayit-recording}} · {{bapi}} · {{idoc}}' },
      { rol:'Danışman', gorev:'Kaynak yapıyı ve alanlarını tanımlar.' },
      { rol:'Danışman', gorev:'{{alan-esleme}} ve {{donusum-kurali}} yazar.' },
      { rol:'Danışman', gorev:'Dosyayı okur, dönüştürür, **görüntüleyip kontrol eder**.' },
      { rol:'Danışman', gorev:'⚠️ Önce **küçük bir alt kümeyle** deneme yapar.' },
      { rol:'Danışman', gorev:'Toplu giriş oturumunu oluşturur ve çalıştırır.' },
      { rol:'Danışman', gorev:'⭐ {{sayi-mutabakati}} yapar — **atlanmaz**.' },
      { rol:'Danışman', gorev:'Projeyi dışa aktarır, sonraki sisteme taşır.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'LSMW — 14 adım, dört öbek',
      adimlar:[
        { ic:'📋', rol:'Hazırlık', baslik:'⭐ Adım 0 — LSMW’de olmayan adım',
          aciklama:'Önce SAP’ta **elle bir kayıt aç**. Zorunlu alanları not et. ' +
                   'Bu adım araçta yoktur ama **en çok zaman kazandıran** adımdır.',
          cikti:'Zorunlu alan listesi', ok:'proje kurulur' },
        { ic:'🗂️', rol:'Öbek 1 · Tanımla', baslik:'Adım 1 — Proje / alt proje / nesne',
          aciklama:'Üç seviyeli yapı. **Taşınabilir birim** budur; ' +
                   'dışa aktarma bu seviyede yapılır.',
          cikti:'Proje iskeleti', ok:'yöntem seçilir' },
        { ic:'🔀', rol:'Öbek 1 · Tanımla', baslik:'Adım 2 — **Aktarım yöntemi** (en kritik karar)',
          aciklama:'**Standart nesne** varsa onu kullan · yoksa {{bapi}} · ' +
                   'o da yoksa {{kayit-recording}}\n\n' +
                   '⚠️ Bu karar sonradan değiştirilirse **eşlemenin çoğu yeniden yapılır**.',
          cikti:'Yöntem', ok:'yapı tanımlanır' },
        { ic:'🧱', rol:'Öbek 2 · Eşle', baslik:'Adım 3–5 — Kaynak yapı ve alanlar',
          aciklama:'Dosyanın **hangi sütunları var**, tipleri ne. ' +
                   'Çok seviyeli veride (başlık + kalem) **ilişki** de burada tanımlanır.',
          cikti:'Kaynak tanımı', ok:'eşlenir' },
        { ic:'🔗', rol:'Öbek 2 · Eşle', baslik:'Adım 6 — ⭐ {{alan-esleme}} ve {{donusum-kurali}}',
          aciklama:'**İşin asıl yeri burasıdır.** Tarih biçimi, ondalık ayracı, ' +
                   'sola sıfır dolgu, sabit değerler.\n\n' +
                   'Diğer 13 adım altyapı; **bu adım içeriktir**.',
          cikti:'Eşleme kuralları', ok:'okunur' },
        { ic:'📥', rol:'Öbek 3 · Oku', baslik:'Adım 9–10 — Veriyi oku ve **görüntüle**',
          aciklama:'⚠️ **Görüntüleme adımı atlanmamalı.** ' +
                   'Sütun kayması ve ayraç hatası **burada** görülür — ' +
                   'yükleme sırasında değil.',
          cikti:'Okunmuş veri', ok:'dönüştürülür' },
        { ic:'⚙️', rol:'Öbek 3 · Dönüştür', baslik:'Adım 11–12 — Dönüştür ve görüntüle',
          aciklama:'Kurallar uygulanır. ⭐ **İkinci görüntüleme burada:** ' +
                   'değerler SAP biçimine **gerçekten** dönüştü mü?',
          cikti:'Dönüştürülmüş veri', ok:'yazılır' },
        { ic:'🎯', rol:'Öbek 4 · Yaz', baslik:'⚠️ Önce **küçük alt kümeyle** deneme',
          aciklama:'10–20 satırla çalıştır. Hata listesini oku. ' +
                   'Bu liste **veri temizliği iş planıdır**.\n\n' +
                   '12.000 satırla başlamak, aynı hatayı 12.000 kez görmektir.',
          cikti:'Hata listesi', ok:'düzelt ve tekrarla' },
        { ic:'▶️', rol:'Öbek 4 · Yaz', baslik:'Adım 13–14 — Oturum oluştur ve çalıştır',
          aciklama:'{{toplu-giris}} oturumu {{SM35}}’te oluşur. ' +
                   'İlk çalıştırma **görüntülemeli** modda yapılır.',
          cikti:'Kayıtlar', ok:'doğrula' },
        { ic:'✅', rol:'Kontrol', baslik:'⭐ {{sayi-mutabakati}} — atlanmaz',
          aciklama:'**Adet:** gönderilen = oluşan.\n' +
                   '**Tutar:** kaynak toplamı = sistem toplamı.\n\n' +
                   'Adet tutup tutar tutmuyorsa → {{donusum-kurali}} hatası.',
          cikti:'Doğrulanmış yükleme', ok:'taşı' },
        { ic:'📦', rol:'Taşıma', baslik:'Projeyi dışa aktar',
          aciklama:'⚠️ LSMW projesi {{tasima-istegi}} ile **taşınmaz** — ' +
                   'kendi **dışa/içe aktarma** mekanizması vardır.',
          cikti:'Taşınabilir proje' },
      ],
    },

    adimlar:[
      { rol:'Danışman', eylem:'⭐ Elle örnek kayıt açar', sistem:'{{XK01}} / {{FS00}} / {{AS01}}' },
      { rol:'Danışman', eylem:'Proje/alt proje/nesne kurar', sistem:'{{LSMW}} adım 1' },
      { rol:'Danışman', eylem:'Aktarım yöntemi seçer', sistem:'Adım 2 — **en kritik karar**' },
      { rol:'Danışman', eylem:'Kaynak yapı ve alanları tanımlar', sistem:'Adım 3–5' },
      { rol:'Danışman', eylem:'Eşleme ve dönüşüm yazar', sistem:'⭐ Adım 6' },
      { rol:'Danışman', eylem:'Okur ve **görüntüler**', sistem:'Adım 9–10' },
      { rol:'Danışman', eylem:'Dönüştürür ve **görüntüler**', sistem:'Adım 11–12' },
      { rol:'Danışman', eylem:'Küçük alt kümeyle dener', sistem:'⚠️ 10–20 satır' },
      { rol:'Danışman', eylem:'Oturum oluşturur ve çalıştırır', sistem:'Adım 13–14 · {{SM35}}' },
      { rol:'Danışman', eylem:'Mutabakat yapar', sistem:'⭐ Adet **ve** tutar' },
    ],

    veriAkisi:{
      nereden:'Eski sistemden alınan düz dosya (CSV / TXT) veya Excel.',
      nereye:'SAP ana veri veya hareket tabloları.',
      tetikleyen:'Elle çalıştırma — LSMW zamanlanmış bir araç değildir.',
      sonraki:'{{sayi-mutabakati}} → hata düzeltme → tekrar → proje dışa aktarma.',
    },

    notlar:[
      { tip:'warn', baslik:'Adım 2 geri dönülmesi en pahalı karardır', metin:
        '14 adımın çoğu sonradan değiştirilebilir. **Adım 2 — aktarım yöntemi — değiştirilemez** ' +
        'demek yanlış olur, ama değiştirildiğinde **eşlemenin çoğu yeniden yapılır**.\n\n' +
        'Sebebi: her yöntemin **hedef alan yapısı farklıdır**.\n\n' +
        '{{kayit-recording}} → hedef alanlar **ekran alanlarıdır**\n' +
        '{{bapi}} → hedef alanlar **yapı alanlarıdır**\n' +
        '**Standart nesne** → hedef alanlar SAP’ın tanımladığı **nesne alanlarıdır**\n\n' +
        'Yani eşleme adımında yazdığın her satır, seçtiğin yönteme **bağlıdır**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Doğru seçim sırası:**\n\n' +
        '**1. Standart nesne var mı?** → varsa **onu kullan**. ' +
        'SAP bakımını üstlenir, sürüm değişiminde bozulmaz.\n' +
        '**2. {{bapi}} var mı?** → varsa onu kullan. ' +
        'Ekrandan bağımsız, **doğrulamaları çalıştırır**, hata mesajı **anlamlıdır**.\n' +
        '**3. Son çare: {{kayit-recording}}.** ' +
        '⚠️ Ekran değişirse **bozulur** ve hata mesajı ekran diliyle gelir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'LSMW ile ana veri taşımak muhasebe kaydı **üretmez**. ' +
      'Ama **açılış bakiyeleri** taşımak üretir — ve bu, veri geçişinin ' +
      '**muhasebe açısından en riskli** kısmıdır.',

    etkilenenHesaplar:[
      { hesap:'320 Satıcılar', tur:'Bilanço — Kaynak', neden:'Açık satıcı kalemleri **tek tek** taşınır.' },
      { hesap:'120 Alıcılar', tur:'Bilanço — Varlık', neden:'Açık müşteri kalemleri **tek tek** taşınır.' },
      { hesap:'G/L hesapları', tur:'Karma', neden:'Yalnızca **bakiye** taşınır, kalem değil.' },
      { hesap:'⭐ 399 Geçiş hesabı', tur:'Geçici', neden:'Tüm açılışın karşı hesabı. **Sonunda sıfır olmalı.**' },
    ],

    fisler:[
      { baslik:'① Açık satıcı kalemi taşıma — **tek tek**',
        belgeTuru:'KR', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'399', ad:'Geçiş hesabı', borc:120000 },
          { hesap:'320', ad:'Satıcılar — ABC Ltd.', alacak:120000, not:'{{BSIK}} açık kalem' },
        ],
        not:'⭐ **Neden tek tek, toplu değil?**\n\n' +
             'Satıcı bakiyesi **toplu** taşınsaydı ({{BSIS}}’e tek satır), ' +
             'sonradan {{F-53}} ile **ödeme yapılamazdı** — ' +
             'kapatılacak **açık kalem** olmazdı.\n\n' +
             'Aynı şekilde {{F110}} çalışmaz, {{F150}} ihtar üretemez, ' +
             '{{FBL1N}} dökümü anlamsız olur.\n\n' +
             '**Kural:** {{acik-kalem}} yönetimi olan hesaplarda ' +
             '(satıcı, müşteri) **her fatura ayrı belge** olarak taşınır. ' +
             'Vade tarihi, ödeme koşulu ve referans **korunmalıdır**.' },

      { baslik:'② G/L bakiyesi taşıma — **toplu**',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Tesis makine ve cihazlar', borc:4500000 },
          { hesap:'100', ad:'Kasa', borc:85000 },
          { hesap:'102', ad:'Bankalar', borc:1240000 },
          { hesap:'399', ad:'Geçiş hesabı', alacak:5825000 },
        ],
        not:'G/L hesaplarında **kalem değil bakiye** taşınır — ' +
             'çünkü açık kalem yönetimi yoktur.\n\n' +
             '⚠️ **İstisna:** {{acik-kalem}} yönetimi **açık** olan G/L hesapları ' +
             '(GR/IR, geçici hesaplar) yine **tek tek** taşınmalıdır. ' +
             'Toplu taşınırsa {{F.13}} otomatik kapatma çalışamaz.\n\n' +
             '⚠️ **Duran varlık ayrıca dikkat ister:** varlık bakiyeleri normal ' +
             'G/L kaydıyla değil, **devir varlığı** olarak (`AS91`) taşınır — ' +
             'yoksa {{ANLC}} boş kalır ve {{AFAB}} amortisman hesaplayamaz ' +
             '(bkz. {{konu:asset-accounting}}).' },

      { baslik:'③ ⭐ Kontrol — geçiş hesabı **sıfırlanmalı**',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'399', ad:'Geçiş hesabı — tüm borçlar', borc:5945000 },
          { hesap:'399', ad:'Geçiş hesabı — tüm alacaklar', alacak:5945000 },
        ],
        not:'⭐ **Veri geçişinin en güçlü tek kontrolü budur.**\n\n' +
             'Tüm açılış kayıtları girildikten sonra geçiş hesabının ' +
             'bakiyesi **sıfır olmalıdır**.\n\n' +
             '**Neden bu kadar güçlü:**\n\n' +
             '• Adet kontrolünden **daha güvenilir** — tutar bazında çalışır\n' +
             '• Eksik **veya** fazla yüklemeyi yakalar\n' +
             '• {{donusum-kurali}} hatasını (ondalık ayracı, kur) yakalar\n' +
             '• **Tek sayıya** bakılır — yorum gerektirmez\n\n' +
             '⚠️ Sıfır değilse yükleme **eksiktir veya hatalıdır** — ' +
             'başka açıklaması yoktur.\n\n' +
             'Bu, {{sayi-mutabakati}}’nın muhasebe tarafındaki hâlidir ve ' +
             '{{konu:migration}} konusunda da aynı rolü oynar.' },
    ],

    tHesaplar:[
      { hesap:'⭐ Geçiş hesabı — sıfırlanmalı', kod:'399',
        borc:[{ ad:'Aktif kalemlerin karşılığı', tutar:5945000 }],
        alacak:[{ ad:'Pasif kalemlerin karşılığı', tutar:5945000 }],
        not:'**Sıfır = yükleme tam.** Sıfır değilse eksik veya fazla var' },
    ],

    notlar:[
      { tip:'warn', baslik:'Açılış bakiyesi taşımada dört karar', metin:
        'Bakiye taşımadan önce **dört soru** cevaplanır. ' +
        'Yanlış cevap sonradan düzeltilemez veya çok pahalıdır:\n\n' +
        '**1. Hangi tarih?** Genelde geçiş yılından **bir gün önce** ' +
        '(31.12). Dönem {{OB52}}’de açık olmalı ve ' +
        'yükleme sonrası **kapatılmalı**.\n\n' +
        '**2. Kalem mi bakiye mi?** {{acik-kalem}} yönetimi olan hesaplar ' +
        '**tek tek**; diğerleri toplu. Yanlış seçim {{F110}}, {{F-53}} ve ' +
        '{{F.13}}’ü çalışmaz hâle getirir.\n\n' +
        '**3. Karşı hesap ne?** Bir **geçiş hesabı** açılır ve ' +
        'sonunda **sıfırlanır**. Doğrudan sermayeye atmak, ' +
        'kontrol imkânını **ortadan kaldırır**.\n\n' +
        '**4. Numara aralığı hazır mı?** ⚠️ Geçiş belgeleri için ayrı bir ' +
        '{{belge-turu}} ve {{FBN1}} aralığı tanımlanır — ' +
        'böylece geçiş kayıtları sonradan **ayırt edilebilir** ' +
        '({{BKPF}}.`BLART` ile süzülür).\n\n' +
        '⭐ Dördüncüsü en çok atlanan ve **en çok pişmanlık yaratan** karardır: ' +
        'geçiş kayıtları normal belge türüyle atılırsa, ' +
        'yıllar sonra *"bu bakiye nereden geldi?"* sorusu **cevapsız kalır**.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      '14 adımın **dört öbeği** ve **dört aktarım yöntemi** — ' +
      'LSMW’yi anlamak bu iki listeyi bilmekten ibarettir.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Yöntem seçimi sıralı bir karardır**, tercih değil:\n\n' +
      '**1.** Standart nesne var mı? → **kullan**\n' +
      '**2.** Yoksa {{bapi}} var mı? → **kullan**\n' +
      '**3.** O da yoksa → {{kayit-recording}} (**son çare**)\n\n' +
      'Sebep: yukarıdan aşağı gidildikçe **kırılganlık artar**. ' +
      'Standart nesnenin bakımını SAP yapar; kayıt ise ' +
      'ekran değişince **bozulur**.',

    liste:[
      /* --- Öbekler --- */
      { ad:'📦 Öbek 1 · Tanımla — adım 1–2', en:'Define',
        aciklama:'Proje yapısı ve **aktarım yöntemi**.',
        neZaman:'En başta.',
        ornek:'**Proje → Alt proje → Nesne** üç seviyeli yapı.\n\n' +
              '**Taşınabilir birim** budur: dışa aktarma bu seviyede yapılır.\n\n' +
              '⚠️ Adım 2 (yöntem) **en kritik karardır** — ' +
              'sonradan değişirse eşlemenin çoğu yeniden yapılır.',
        tcodes:['LSMW'] },

      { ad:'📦 Öbek 2 · Eşle — adım 3–6', en:'Map',
        aciklama:'Kaynak yapı, alanlar, ilişkiler ve **eşleme kuralları**.',
        neZaman:'Yöntem seçildikten sonra.',
        ornek:'⭐ **Adım 6 işin asıl yeridir.** Diğer 13 adım altyapı; ' +
              'bu adım **içeriktir**.\n\n' +
              '{{alan-esleme}} ve {{donusum-kurali}} burada yazılır.\n\n' +
              'Çok seviyeli veride (fatura başlığı + kalemler) ' +
              '**başlık–kalem ilişkisi** de burada tanımlanır — ' +
              'ortak bir anahtar alanla.',
        tcodes:['LSMW'] },

      { ad:'📦 Öbek 3 · Oku ve dönüştür — adım 9–12', en:'Read & Convert',
        aciklama:'Dosya okunur, kurallar uygulanır, **iki kez görüntülenir**.',
        neZaman:'Eşleme bitince.',
        ornek:'⭐ **İki görüntüleme adımı vardır ve ikisi de atlanmamalıdır:**\n\n' +
              '**Adım 10 — okunmuş veri:** sütunlar doğru mu? ' +
              'Ayraç hatası ve sütun kayması **burada** görünür.\n\n' +
              '**Adım 12 — dönüştürülmüş veri:** tarih `20271231` oldu mu? ' +
              'Hesap numarası sola sıfır dolgulu mu?\n\n' +
              '⚠️ Bu iki adımı atlayıp doğrudan yüklemek, ' +
              'hatayı **en pahalı yerde** görmektir.',
        tcodes:['LSMW'] },

      { ad:'📦 Öbek 4 · Yaz — adım 13–14', en:'Import',
        aciklama:'{{toplu-giris}} oturumu oluşturulur ve çalıştırılır.',
        neZaman:'Görüntüleme temiz olunca.',
        ornek:'⚠️ **Önce küçük alt kümeyle** (10–20 satır) çalıştırılır.\n\n' +
              'İlk çalıştırma **görüntülemeli** modda — ekran ekran izlenir. ' +
              'Sonraki turlar arka planda.\n\n' +
              'Oturum {{SM35}}’te görünür; hatalı satırlar orada kalır ve ' +
              '**düzeltilip yeniden** işlenebilir.',
        tcodes:['SM35'] },

      /* --- Yöntemler --- */
      { ad:'🥇 Yöntem 1 · Standart nesne — **ilk tercih**', en:'Standard Object',
        aciklama:'SAP’ın hazır tanımladığı aktarım nesneleri.',
        neZaman:'⭐ **Varsa her zaman.**',
        ornek:'**Avantaj:** bakımı **SAP yapar**. Sürüm değişiminde bozulmaz, ' +
              'alan listesi hazır gelir, doğrulamalar çalışır.\n\n' +
              '**Dezavantaj:** her nesne için yoktur ve ' +
              'özel alanları desteklemeyebilir.\n\n' +
              'Kullanılabiliyorsa **tartışmasız ilk tercihtir**.' },

      { ad:'🥈 Yöntem 2 · {{bapi}} — sağlam ikinci', en:'BAPI',
        aciklama:'İş nesnesine **ekrandan bağımsız** erişim.',
        neZaman:'Standart nesne yoksa.',
        ornek:'**Avantajları:**\n\n' +
              '• Ekran değişikliğinden **etkilenmez**\n' +
              '• İş doğrulamalarını **çalıştırır** — veri bütünlüğü korunur\n' +
              '• Hata mesajı **anlamlıdır** (yapılandırılmış return tablosu)\n' +
              '• Ekran akışından **hızlıdır**\n\n' +
              '⚠️ **En sık hata:** `BAPI_TRANSACTION_COMMIT` çağrılmaz ' +
              've kayıt **yazılmaz**. BAPI *"başarılı"* döner, ' +
              'veritabanında **hiçbir şey yoktur**.\n\n' +
              '{{SE37}} ile tek kayıtla test ederken de aynı tuzak vardır.',
        tcodes:['SE37'] },

      { ad:'🥉 Yöntem 3 · {{kayit-recording}} — son çare', en:'Recording',
        aciklama:'Ekran akışının adım adım kaydedilip tekrarlanması.',
        neZaman:'Standart nesne **ve** BAPI yoksa; özel (`Z*`) işlemlerde.',
        ornek:'⚠️ **Neden son çare:**\n\n' +
              '• Ekran değişirse **bozulur** (destek paketi, sürüm yükseltme)\n' +
              '• Koşullu ekranlar **tuzaktır** — örnek kayıt o yolu izlemediyse ' +
              'o ekran kayda **hiç girmez** ve yükleme orada takılır\n' +
              '• Hata mesajı ekran diliyle gelir, **teşhisi zordur**\n' +
              '• Yavaştır — her satır için tüm ekran akışı çalışır\n\n' +
              '⭐ **Kritik kural:** örnek kayıt, veri kümesinin ' +
              '**en karmaşık satırıyla** alınır — en basitiyle değil. ' +
              'Basit kayıtla alınan recording, karmaşık satırlarda ' +
              'olmayan ekranlara **takılır**.',
        tcodes:['SHDB'] },

      { ad:'🔌 Yöntem 4 · {{idoc}} — sürekli akış için', en:'IDoc',
        aciklama:'Mesaj tabanlı aktarım; **tek seferlik geçişten çok** entegrasyon aracı.',
        neZaman:'Sürekli veri akışı gerekiyorsa.',
        ornek:'Tek seferlik veri geçişi için **fazla ağırdır**: ' +
              'partner profili ({{WE20}}), mesaj tipi, port tanımı gerekir.\n\n' +
              '**Ama bir avantajı vardır:** her IDoc **kendi statüsünü tutar** ' +
              've başarısız olanlar {{BD87}} ile **tek tek yeniden işlenebilir**.\n\n' +
              'Sürekli arayüzlerde bu izlenebilirlik değerlidir ' +
              '(bkz. {{konu:data-upload}}).',
        tcodes:['WE02','WE20','BD87'] },
    ],

    karsilastirmaBasliklar:['{{kayit-recording}}', '{{bapi}}'],
    karsilastirma:[
      ['Bağımlılık', '⚠️ **Ekran akışına**', 'Yapı tanımına'],
      ['Ekran değişirse', '🚫 **Bozulur**', '✅ Etkilenmez'],
      ['İş doğrulamaları', 'Ekran doğrulamaları', '✅ **İş mantığı çalışır**'],
      ['Hata mesajı', 'Ekran diliyle — **teşhisi zor**', '✅ **Yapılandırılmış** return tablosu'],
      ['Hız', 'Yavaş — tüm ekran akışı', '✅ **Hızlı**'],
      ['Kurulum kolaylığı', '✅ **Kolay** — kaydet ve kullan', 'Yapı bilgisi gerekir'],
      ['Özel (`Z*`) işlem', '✅ **Çalışır**', '🚫 BAPI yoksa olmaz'],
      ['Commit tuzağı', 'Yok', '⚠️ `BAPI_TRANSACTION_COMMIT` **zorunlu**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'LSMW', ad:'Legacy System Migration Workbench',
        amac:'14 adımlı veri aktarım tarifini oluşturur, saklar ve çalıştırır.',
        neZaman:'Tekrarlanacak yüklemelerde; tek seferlik 20 satır için gerekmez.',
        adimlar:[
          { baslik:'⭐ **Önce elle bir kayıt aç** — zorunlu alanları gör',
            aciklama:'LSMW’de olmayan ama en çok zaman kazandıran adım.' },
          { baslik:'Proje / alt proje / nesne oluştur' },
          { baslik:'**Aktarım yöntemini** seç',
            aciklama:'Standart nesne → {{bapi}} → {{kayit-recording}} sırasıyla.' },
          { baslik:'Kaynak yapı, alanlar ve eşleme',
            aciklama:'⭐ Adım 6 işin **asıl yeri**.' },
          { baslik:'Oku → **görüntüle** → dönüştür → **görüntüle**',
            aciklama:'İki görüntüleme adımı da atlanmaz.' },
          { baslik:'⚠️ Küçük alt kümeyle dene, sonra tam yükle' },
          { baslik:'⭐ {{sayi-mutabakati}} yap' },
          { baslik:'Projeyi **dışa aktar** — sonraki sisteme' },
        ],
        ekranAkisi:[
          { ekran:'Hazırlık', islem:'{{XK01}} ile elle bir satıcı açıldı → **14 zorunlu alan**' },
          { ekran:'Karşılaştırma', islem:'Kaynak dosyada **11 alan** var → ⚠️ 3 eksik' },
          { ekran:'Karar', islem:'2’si sabit atandı, 1’i için kaynak dosya güncellendi' },
          { ekran:'Deneme', islem:'20 satır → **4 hata** → veri temizliği listesi çıktı' },
          { ekran:'Tam yükleme', islem:'12.000 satır → **11.943 başarılı** · 57 hatalı' },
          { ekran:'Mutabakat', islem:'⚠️ 57 hatalı satır {{SM35}}’te kaldı → düzeltilip yeniden' },
        ],
        alanlar:{
          zorunlu:['Proje','Alt proje','Nesne','Aktarım yöntemi'],
          opsiyonel:['Dönüşüm kuralları','Sabit değerler','Çeviri tabloları'] },
        hatalar:[
          { mesaj:'Alan eşlemesi yaptım ama değer boş gidiyor', sebep:'{{kayit-recording}}’de o alan **kayda girmemiş**.', cozum:'Kayıt alınırken alan boş bırakılmışsa kayda girmez. **Yeniden kayıt** alınır — tüm alanlar doldurularak.' },
          { mesaj:'Bazı satırlar bilinmeyen ekranda takılıyor', sebep:'⚠️ **Koşullu ekran** — örnek kayıt o yolu izlememiş.', cozum:'Örnek kaydı **en karmaşık satırla** yeniden al.' },
          { mesaj:'Hesap numarası "bulunamadı" diyor ama hesap var', sebep:'⚠️ **Sola sıfır dolgu** eksik — Excel baştaki sıfırları atmış.', cozum:'{{donusum-kurali}} ile sola sıfır doldur; kaynak sütunu **metin** biçiminde tut.' },
          { mesaj:'Tarih hatası', sebep:'Biçim uyuşmazlığı.', cozum:'SAP iç biçimi `YYYYMMDD`. Dönüşüm kuralı yazılır.' },
          { mesaj:'Proje test sisteminde yok', sebep:'LSMW projesi {{tasima-istegi}} ile **taşınmaz**.', cozum:'LSMW’nin kendi **dışa/içe aktarma** menüsü kullanılır.' },
        ],
        ipucu:'⭐ **En büyük verimlilik kazancı adım 6’dan önce gelir:** ' +
              'SAP’ta elle bir kayıt açıp **zorunlu alanları görmek**.\n\n' +
              'LSMW’nin zorunlu alan hataları **satır satır** gelir — ' +
              'her turda bir sonrakine takılırsın ve on tur döner durursun.\n\n' +
              'Elle bir kayıt açmak, **tüm zorunlu alanları bir kerede** gösterir.\n\n' +
              'Kural: eşleme kaynak dosyadan değil, ' +
              '**SAP’ın zorunlu alan listesinden** başlanarak yapılır.',
        ilgili:['SHDB','SM35','LTMC'] },

      { kod:'SHDB', ad:'Toplu giriş kaydı — recording alma',
        amac:'Bir işlemin ekran akışını kaydeder; {{toplu-giris}} iskeleti üretir.',
        neZaman:'Standart nesne ve {{bapi}} yoksa; özel (`Z*`) işlemlerde.',
        adimlar:[
          { baslik:'Yeni kayıt oluştur, işlem kodunu gir' },
          { baslik:'⭐ **En karmaşık örnek kaydı** gir — en basitini değil',
            aciklama:'Koşullu ekranların kayda girmesi için.' },
          { baslik:'⚠️ **Tüm alanları doldur** — boş alan kayda girmez' },
          { baslik:'Kaydı bitir, ekran akışını gözden geçir' },
          { baslik:'{{LSMW}}’de bu kaydı aktarım yöntemi olarak seç' },
        ],
        ekranAkisi:[
          { ekran:'Deneme 1', islem:'Basit satıcıyla kayıt alındı — 3 ekran' },
          { ekran:'Yükleme', islem:'⚠️ Banka bilgisi olan satıcılarda **takıldı**' },
          { ekran:'Sebep', islem:'Banka ekranı örnek kayıtta **hiç açılmamış**' },
          { ekran:'Deneme 2', islem:'Banka bilgili satıcıyla yeniden — **5 ekran** ✓' },
        ],
        alanlar:{ zorunlu:['Kayıt adı','İşlem kodu'], opsiyonel:['Varsayılan değerler'] },
        hatalar:[
          { mesaj:'Kayıtta bazı alanlar yok', sebep:'Kayıt alınırken **boş bırakılmışlar**.', cozum:'Boş alan kayda girmez. Yeniden kayıt alınır — **tüm alanlar** doldurularak.' },
          { mesaj:'Yükleme bilinmeyen ekranda duruyor', sebep:'⚠️ Koşullu ekran.', cozum:'En karmaşık veriyle yeniden kayıt al.' },
          { mesaj:'Destek paketi sonrası kayıt bozuldu', sebep:'Ekran akışı değişmiş.', cozum:'⚠️ Recording’in **yapısal zayıflığı** budur. Yeniden alınır — veya {{bapi}}’ye geçilir.' },
        ],
        ipucu:'⭐ **Tek kural: en karmaşık satırla kaydet.**\n\n' +
              'Recording, gördüğü ekranları kaydeder — görmediklerini bilmez. ' +
              'Basit bir satıcıyla alınan kayıt, banka bilgisi veya ' +
              'ek adres içeren satıcılarda **olmayan ekranlara takılır**.\n\n' +
              'Veri kümesindeki **en çok alan dolu olan** satır seçilir.',
        ilgili:['LSMW','SM35'] },

      { kod:'SM35', ad:'Toplu giriş kuyruğu — hatalı satırlar burada bekler',
        amac:'Oturumları çalıştırır, izler ve **hatalı satırları saklar**.',
        neZaman:'Her {{toplu-giris}} yüklemesinden sonra.',
        adimlar:[
          { baslik:'Oturumu seç' },
          { baslik:'⭐ İlk çalıştırma **görüntülemeli** modda',
            aciklama:'Ekran ekran izlenir; nerede takıldığı görülür.' },
          { baslik:'Sonraki turlar arka planda' },
          { baslik:'**Hatalı** oturumu aç — kalan satırlar orada' },
          { baslik:'Düzelt ve **yeniden işle**' },
        ],
        ekranAkisi:[
          { ekran:'Oturum', islem:'12.000 satır · durum **Hatalı**' },
          { ekran:'Detay', islem:'11.943 işlendi · **57 hatalı**' },
          { ekran:'Hata', islem:'*"Ödeme koşulu Z030 mevcut değil"*' },
          { ekran:'Çözüm', islem:'{{OBB8}}’de koşul tanımlandı → 57 satır **yeniden işlendi** ✓' },
        ],
        alanlar:{ zorunlu:['Oturum adı'], opsiyonel:['Durum','Kullanıcı','Tarih'] },
        hatalar:[
          { mesaj:'Oturum "hatalı" — ne yapmalı?', sebep:'Bazı satırlar işlenememiş.', cozum:'⭐ **Kaybolmadılar** — oturumda beklerler. Sebep düzeltilip **yeniden işlenir**.' },
          { mesaj:'Aynı satır iki kez işlendi mi?', sebep:'Yeniden işleme endişesi.', cozum:'{{toplu-giris}} yalnızca **işlenmemiş** satırları tekrarlar. Başarılılar atlanır.' },
          { mesaj:'Oturum kayboldu', sebep:'Başarılı oturumlar ayarına göre **silinir**.', cozum:'Silme ayarı kontrol edilir. ⚠️ Geçiş projelerinde oturumlar **saklanmalıdır** — denetim izi.' },
        ],
        ipucu:'⭐ **{{toplu-giris}}’in en değerli özelliği: hatalı satırlar kaybolmaz.**\n\n' +
              'Oturumda beklerler; sebep düzeltilince **yeniden işlenirler** ' +
              've başarılı satırlar **tekrarlanmaz**.\n\n' +
              'Bu, {{bapi}} ile yazılan özel yükleme programlarına göre ' +
              'gerçek bir avantajdır — orada tekrar çalıştırılabilirliği ' +
              '**sen kurgularsın** (bkz. {{konu:data-upload}}).\n\n' +
              '⚠️ Ama {{sayi-mutabakati}} yine de gerekir: ' +
              '{{guncelleme-hatasi}} oturumda **hata olarak görünmeyebilir**.',
        ilgili:['SHDB','LSMW','SM13'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'LSMW’nin kendi tabloları danışmanı ilgilendirmez — ' +
      'önemli olan **hedef tablolar** ve **doğrulama tablolarıdır**.',

    liste:[
      { ad:'BKPF', baslik:'Geçiş belgelerini ayırt etmenin yolu',
        tutar:'Belge başlığı — ⭐ `BLART` ve `TCODE` ile **geçiş kayıtları süzülür**.',
        olusturan:'Açılış bakiyesi yüklemesi',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'Kalemler {{BSEG}} / {{ACDOCA}}.',
        s4:'Kalemler {{ACDOCA}}’da.',
        alanlar:[
          { ad:'BLART', aciklama:'⭐ **Geçiş için ayrı belge türü** tanımlanmalı — sonradan ayırt etmenin tek yolu' },
          { ad:'TCODE', aciklama:'Yükleme aracının kullandığı işlem' },
          { ad:'XBLNR', aciklama:'Referans — **eski sistem belge numarası** buraya yazılır' },
          { ad:'BKTXT', aciklama:'Belge başlığı metni — *"Açılış bakiyesi 2027"* gibi' },
        ] },

      { ad:'BSIK', baslik:'Taşınan açık satıcı kalemleri — doğrulama',
        tutar:'Açık satıcı kalemleri.',
        olusturan:'Açılış kalemi yüklemesi',
        anahtar:'LIFNR + BUKRS + BELNR',
        iliskiler:'S/4HANA’da {{uyumluluk-view}}.',
        s4:'Görünüme dönüştü.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Satıcı — adet ve tutar mutabakatı buradan' },
          { ad:'ZFBDT', aciklama:'⚠️ **Vade tarihi** — taşınmazsa {{F110}} ve {{F150}} yanlış çalışır' },
          { ad:'ZTERM', aciklama:'Ödeme koşulu — ⚠️ SAP’ta **tanımlı olmalı**' },
        ] },

      { ad:'LFA1', baslik:'Taşınan satıcı ana verisi',
        tutar:'Satıcı genel verisi.',
        olusturan:'Ana veri yüklemesi',
        anahtar:'LIFNR',
        iliskiler:'Şirket kodu verisi {{LFB1}}’de — ⚠️ **ayrı yüklenir**.',
        s4:'{{BP}} ile yönetilir.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Satıcı numarası — iç mi dış mı numaralama?' },
          { ad:'STCD1 / STCD2', aciklama:'Vergi numarası — ⚠️ Türkiye’de **zorunlu** ve e-belgede kullanılır' },
        ] },

      { ad:'LFB1', baslik:'⚠️ Ayrı yüklenmesi gereken şirket kodu verisi',
        tutar:'Satıcının **şirket kodu** bazlı verisi.',
        olusturan:'Ayrı bir yükleme adımı',
        anahtar:'LIFNR + BUKRS',
        iliskiler:'{{LFA1}} genel veriye bağlı.',
        s4:'{{BP}} rolü olarak.',
        alanlar:[
          { ad:'AKONT', aciklama:'⭐ **Mutabakat hesabı** — eksikse satıcıya kayıt yapılamaz' },
          { ad:'ZTERM', aciklama:'Ödeme koşulu' },
          { ad:'ZWELS', aciklama:'Ödeme yöntemi — {{F110}} için gerekli' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Yükleme sırası — bağımlılık zinciri',
      varliklar:[
        { ad:'LFA1', rol:'1. adım', hub:true, aciklama:'**Genel veri** — önce bu',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'STCD1' }] },
        { ad:'LFB1', rol:'2. adım', aciklama:'⚠️ **Şirket kodu verisi** — ayrı yükleme',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }] },
        { ad:'BKPF', rol:'3. adım', aciklama:'**Açılış belgesi** — ana veri hazır olmalı',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'XBLNR' }] },
        { ad:'BSIK', rol:'Sonuç', aciklama:'Taşınan **açık kalemler**',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZFBDT' }] },
      ],
      iliskiler:[
        { from:'LFA1', to:'LFB1', alanlar:'LIFNR', not:'⚠️ **ayrı yükleme adımı**' },
        { from:'LFB1', to:'BKPF', alanlar:'—', not:'ana veri **önce** olmalı' },
        { from:'BKPF', to:'BSIK', alanlar:'BELNR', not:'açık kalem oluşur' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Üç ekran: **{{SHDB}}** (kayıt al), **{{LSMW}}** (tarifi kur), ' +
      '**{{SM35}}** (çalıştır ve hataları topla).',

    ekranlar:[
      { ad:'{{SHDB}} — kayıt alma',
        aciklama:'Ekran akışının kaydedilmesi.',
        alanlar:[
          { ad:'İşlem kodu', zorunlu:true, aciklama:'Kaydedilecek işlem.' },
          { ad:'⭐ **Örnek veri**', zorunlu:true, aciklama:'**En karmaşık** satır seçilir — ' +
                   'koşullu ekranların kayda girmesi için.' },
          { ad:'Tüm alanlar', zorunlu:true, aciklama:'⚠️ Boş bırakılan alan **kayda girmez**.' },
        ],
        ipucu:'Recording, **gördüğü ekranları** kaydeder. ' +
              'Görmediği ekranı bilmez ve yükleme orada **takılır**.' },

      { ad:'{{LSMW}} — 14 adım',
        aciklama:'Tarifin kurulduğu yer.',
        alanlar:[
          { ad:'Adım 2 — yöntem', zorunlu:true, aciklama:'⚠️ **En kritik karar.** ' +
                   'Standart nesne → {{bapi}} → {{kayit-recording}}' },
          { ad:'⭐ Adım 6 — eşleme', zorunlu:true, aciklama:'**İşin asıl yeri.** ' +
                   '{{alan-esleme}} ve {{donusum-kurali}}.' },
          { ad:'Adım 10 ve 12 — görüntüle', zorunlu:false, aciklama:'⚠️ **İkisi de atlanmaz.** ' +
                   'Okunmuş ve dönüştürülmüş veri ayrı ayrı kontrol edilir.' },
        ],
        ipucu:'⭐ Adım 6 dışındaki her şey **altyapıdır**. ' +
              'Zamanın çoğu orada geçer ve geçmelidir.' },

      { ad:'{{SM35}} — çalıştır ve topla',
        aciklama:'Oturum yönetimi.',
        alanlar:[
          { ad:'Çalıştırma modu', zorunlu:true, aciklama:'⭐ İlk tur **görüntülemeli**; ' +
                   'sonrakiler arka planda.' },
          { ad:'Hatalı oturum', zorunlu:false, aciklama:'⭐ Kalan satırlar **kaybolmaz** — ' +
                   'düzeltilip yeniden işlenir.' },
        ],
        ipucu:'Hatalı satırların oturumda beklemesi, ' +
              '{{toplu-giris}}’in **en değerli özelliğidir**. ' +
              'Başarılı satırlar tekrarlanmaz.' },
    ],

    zorunlu:['Kaynak dosya','Aktarım yöntemi','Alan eşlemesi'],
    opsiyonel:['Dönüşüm kuralları','Sabit değerler','Çeviri tabloları'],

    hatalar:[
      { mesaj:'Hesap/satıcı "bulunamadı" ama sistemde var', sebep:'⚠️ **Sola sıfır dolgu** eksik — Excel baştaki sıfırları atmış.', cozum:'{{donusum-kurali}} ile doldur; kaynak sütunu **metin** biçiminde tut.' },
      { mesaj:'Tarih hatası', sebep:'Biçim uyuşmazlığı.', cozum:'SAP iç biçimi `YYYYMMDD`.' },
      { mesaj:'Tutarlar 100 kat yanlış', sebep:'Ondalık ayracı — `1.234,56` ile `1,234.56` karışmış.', cozum:'⭐ **Tutar mutabakatı bunu yakalar**, adet mutabakatı yakalamaz.' },
      { mesaj:'Yükleme bilinmeyen ekranda takıldı', sebep:'Koşullu ekran — recording o yolu izlememiş.', cozum:'En karmaşık satırla **yeniden kayıt** al.' },
      { mesaj:'BAPI "başarılı" dedi ama kayıt yok', sebep:'⚠️ `BAPI_TRANSACTION_COMMIT` çağrılmamış.', cozum:'Commit eklenir. BAPI’nin **en sık atlanan kuralı**.' },
      { mesaj:'"Ödeme koşulu mevcut değil"', sebep:'Eski sistemdeki kod SAP’ta tanımlı değil.', cozum:'Ya SAP’ta tanımlanır ya **çeviri tablosuyla** eşlenir. Veri temizliği işidir.' },
      { mesaj:'Satıcı açıldı ama kayıt yapılamıyor', sebep:'{{LFB1}} (şirket kodu verisi) yüklenmemiş.', cozum:'⚠️ **Ayrı bir yükleme adımıdır.** `AKONT` mutabakat hesabı zorunludur.' },
      { mesaj:'Proje test sisteminde yok', sebep:'LSMW projesi {{tasima-istegi}} ile taşınmaz.', cozum:'LSMW’nin kendi **dışa/içe aktarma** menüsü.' },
    ],

    ipuclari:[
      '⭐ **Önce elle bir kayıt aç** — zorunlu alanları bir kerede gör.',
      '⭐ Örnek recording’i **en karmaşık satırla** al.',
      'Yöntem sırası: standart nesne → {{bapi}} → {{kayit-recording}}.',
      'Sola sıfır dolgu ve tarih biçimi — **en sık iki dönüşüm hatası**.',
      'Kaynak sütunlarını Excel’de **metin** biçiminde tut; baştaki sıfırlar kaybolmasın.',
      '⚠️ Önce **10–20 satırla** dene; ilk hata listesi **veri temizliği iş planıdır**.',
      '⭐ {{sayi-mutabakati}}: **adet ve tutar**. Adet tutup tutar tutmuyorsa dönüşüm hatası.',
      'Açılış bakiyelerinde **geçiş hesabı sıfırlanmalı** — en güçlü tek kontrol.',
      'Geçiş kayıtları için **ayrı {{belge-turu}}** tanımla — sonradan ayırt edilebilsin.',
      'Projeyi **dışa aktar**; taşıma isteğiyle gitmez.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'LFA1', ne:'Satıcı genel verisi — **1. adım**' },
      { tablo:'LFB1', ne:'⚠️ Şirket kodu verisi — **ayrı yükleme**' },
      { tablo:'BKPF', ne:'Açılış belgeleri — ayrı `BLART` ile' },
      { tablo:'BSIK', ne:'Taşınan açık kalemler' },
    ],

    commit:
      'Commit davranışı **aktarım yöntemine göre değişir** ve ' +
      'bu fark, hata sonrası ne olacağını belirler:\n\n' +
      '**{{toplu-giris}}** — her işlem **kendi LUW’unda** çalışır. ' +
      'Bir satır çökerse diğerleri etkilenmez; hatalı satır **oturumda kalır**.\n\n' +
      '**{{bapi}}** — ⚠️ commit **açıkça çağrılmalıdır**. ' +
      '`BAPI_TRANSACTION_COMMIT` yoksa kayıt **yazılmaz** ve ' +
      'BAPI yine de *"başarılı"* döner.\n\n' +
      '**{{idoc}}** — her IDoc ayrı LUW; statüsü tabloda tutulur ve ' +
      '{{BD87}} ile yeniden işlenebilir.\n\n' +
      '⭐ **Pratik sonuç:** toplu girişte tekrar çalıştırılabilirlik ' +
      '**hazır gelir**; BAPI ile yazılan programda **sen kurgularsın**.',

    belgeNo:
      '⚠️ **Geçiş belgeleri için ayrı bir {{belge-turu}} ve numara aralığı tanımlanır.**\n\n' +
      'Sebebi denetlenebilirliktir: yıllar sonra ' +
      '*"bu bakiye nereden geldi?"* sorusu sorulduğunda ' +
      '{{BKPF}}.`BLART` ile süzülüp cevaplanabilmelidir.\n\n' +
      'Ayrıca `XBLNR` (referans) alanına **eski sistem belge numarası** yazılır — ' +
      'iki sistem arasındaki köprü budur ve mutabakatta kullanılır.\n\n' +
      '⚠️ **{{guncelleme-hatasi}} burada da geçerlidir:** numara verilip ' +
      'belge oluşmayabilir. Toplu yüklemede fark edilmez — ' +
      'bu yüzden {{sayi-mutabakati}} zorunludur.',

    postingLogic:
      'Yükleme sırası **bağımlılık zincirini** izler ve ' +
      'bu sıra bozulursa yükleme başarısız olur:\n\n' +
      '**1. Özelleştirme** — hesap planı, belge türleri, ödeme koşulları, ' +
      'vergi kodları. ⚠️ Eksikse ana veri **yüklenemez**.\n' +
      '**2. Ana veri — genel** ({{LFA1}}, {{KNA1}}, {{SKA1}})\n' +
      '**3. Ana veri — şirket kodu** ({{LFB1}}, {{KNB1}}, {{SKB1}}) ⚠️ **ayrı adım**\n' +
      '**4. Duran varlık ana verisi** (`AS91` devir varlığı)\n' +
      '**5. Açılış bakiyeleri** — G/L toplu, satıcı/müşteri **tek tek**\n' +
      '**6. Mutabakat** — geçiş hesabı **sıfır mı**?\n\n' +
      '⚠️ **En sık atlanan: 3. adım.** Satıcı {{LFA1}}’de açılır, ' +
      '{{LFB1}} yüklenmez ve *"satıcıya kayıt yapılamıyor"* denir. ' +
      'Sebep: `AKONT` mutabakat hesabı yok.',

    belgeTuru:
      'Geçiş için **özel belge türü** tanımlanır (örn. `ZE` — *Eski sistem devri*).\n\n' +
      'Faydaları:\n' +
      '• {{BKPF}}.`BLART` ile geçiş kayıtları **süzülebilir**\n' +
      '• Ayrı numara aralığı — **karışmaz**\n' +
      '• Yetkilendirmede ayrı kontrol edilebilir (`F_BKPF_BLA`)\n' +
      '• Geçiş sonrası bu belge türü **kapatılabilir**\n\n' +
      '⭐ Son madde önemlidir: geçiş bittikten sonra o belge türüne ' +
      'kayıt yetkisi kaldırılırsa, **yanlışlıkla geçiş kaydı** atılamaz.',

    numberRange:
      'Geçiş belge türü için {{FBN1}} ile aralık tanımlanır. ' +
      '⚠️ Aralık **geçiş yılını** kapsamalıdır — açılış kayıtları ' +
      'genelde **önceki yılın son gününe** atılır.\n\n' +
      'Yani 2028 canlıya geçişinde açılış belgesi **31.12.2027** tarihlidir ' +
      've **2027 mali yılına** ait bir numara aralığı gerekir.\n\n' +
      'Bu, geçiş planlamasında sık atlanan bir ayrıntıdır.',

    accountDetermination:
      'Ana veri yüklemesi hesap belirlemeyi **tetiklemez** — ' +
      'ama **beslediği** alanlar sonradan kullanılır.\n\n' +
      '⭐ En kritiği {{LFB1}}.`AKONT` **mutabakat hesabıdır**: ' +
      'satıcıya yapılan her kayıt bu hesaba yansır.\n\n' +
      '⚠️ Yanlış yüklenirse **tüm satıcı kayıtları yanlış hesaba** gider — ' +
      've bu sonradan düzeltilmesi çok zor bir hatadır: ' +
      'mutabakat hesabı değiştirilse bile **geçmiş kayıtlar** eski hesapta kalır.\n\n' +
      'Bu yüzden `AKONT` alanı, yükleme öncesi **elle doğrulanması gereken** ' +
      'az sayıdaki alandan biridir.',

    tur:
      'LSMW’nin desteklediği dört aktarım yöntemi ve **kırılganlık sırası**:\n\n' +
      '**Standart nesne** — en sağlam, bakımı SAP’ta\n' +
      '**{{bapi}}** — sağlam, ekrandan bağımsız\n' +
      '**{{idoc}}** — sağlam ama kurulumu ağır\n' +
      '**{{kayit-recording}}** — ⚠️ en kırılgan, ekrana bağımlı\n\n' +
      'Yukarıdan aşağı **kırılganlık artar**, ama **esneklik de artar**: ' +
      'recording özel (`Z*`) işlemlerde çalışır, diğerleri çalışmaz.',

    transport:
      '⚠️ **LSMW projesi {{tasima-istegi}} ile taşınmaz.** ' +
      'Kendi **dışa/içe aktarma** mekanizması vardır.\n\n' +
      'Bu, yeni danışmanların en sık şaşırdığı noktadır: ' +
      'proje geliştirme sisteminde kurulur, taşıma isteği aranır, **bulunamaz**.\n\n' +
      'Doğru yol: LSMW menüsünden **dışa aktar** → dosya → hedef sistemde **içe aktar**.\n\n' +
      '⚠️ Ayrıca **kaynak veri dosyası da taşınmaz** — ' +
      'hedef sistemin uygulama sunucusuna ({{AL11}}) veya ' +
      'yerel diske ayrıca konur.',

    img:[
      { yol:'LSMW → Dışa aktarma / İçe aktarma', not:'⚠️ Taşıma isteği **kullanılmaz**' },
      { yol:'OBA7 → Geçiş için özel belge türü', not:'⭐ Sonradan süzebilmek için' },
      { yol:'FBN1 → Geçiş belge türü numara aralığı', not:'⚠️ **Önceki mali yılı** kapsamalı' },
      { yol:'OB52 → Geçiş dönemi', not:'Yükleme sırasında açık, sonra **kapatılır**' },
    ],

    ekstra:[
      { ic:'🎯', baslik:'Neden "önce elle bir kayıt aç"? — sıranın matematiği', metin:
        'Bu, konunun en pratik tavsiyesidir ve sebebi **sayısaldır**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Yanlış sıra — dosyadan başlamak:**\n\n' +
        'Dosyayı eşle → çalıştır → *"X alanı zorunlu"* → düzelt → ' +
        'çalıştır → *"Y alanı zorunlu"* → düzelt → çalıştır → …\n\n' +
        'Her tur **bir eksik alan** gösterir. 5 eksik alan = **5 tur**. ' +
        'Her tur eşleme + çalıştırma + hata okuma demektir.\n\n' +
        '**Doğru sıra — SAP’tan başlamak:**\n\n' +
        '{{XK01}} ile elle bir satıcı aç → zorunlu alanları **bir kerede** gör → ' +
        'kaynak dosyayla karşılaştır → eksikleri **toplu** çöz → eşle → çalıştır.\n\n' +
        '**1 tur.**\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Genel ilke:** hata mesajları **seri** gelir (bir seferde bir tane), ' +
        'ekranlar ise bilgiyi **paralel** verir (hepsi bir arada).\n\n' +
        'Seri bir kaynaktan öğrenmeye çalışmak, paralel bir kaynak varken ' +
        '**gereksiz yere yavaştır**.\n\n' +
        'Aynı ilke {{konu:error-handling}}’de de geçerliydi: ' +
        'mesajın **uzun metnini** okumak, deneme yanılmadan hızlıdır.' },

      { ic:'📉', baslik:'LSMW’nin gerçek durumu — hâlâ öğrenilmeli mi?', metin:
        'Dürüst cevap: **LSMW artık ilk tercih değildir.**\n\n' +
        'S/4HANA’da yerini **Migration Cockpit** ({{LTMC}}) aldı ' +
        've SAP yeni projelerde onu öneriyor (bkz. {{konu:migration}}).\n\n' +
        '⚠️ Ayrıca LSMW’nin S/4HANA’da bilinen bir kısıtı var: ' +
        '**toplu giriş kaydı (recording) yöntemi**, {{BP}} gibi ' +
        'yeni işlemlerde güvenilir çalışmaz — ekran akışı çok karmaşıktır.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Peki neden hâlâ öğreniliyor?**\n\n' +
        '**1. Mevcut sistemlerde yaşıyor.** ECC üzerinde çalışan ' +
        'binlerce şirkette LSMW projeleri **hâlâ çalışıyor** ve ' +
        'bakımı yapılıyor.\n\n' +
        '**2. Kavramlar taşınıyor.** ⭐ {{alan-esleme}}, {{donusum-kurali}}, ' +
        'deneme çalıştırması, {{sayi-mutabakati}} — bunlar ' +
        '**araçtan bağımsızdır**. Migration Cockpit de aynı kavramları kullanır, ' +
        'sadece arayüzü farklıdır.\n\n' +
        '**3. Bazı nesneler için hâlâ tek yol.** Migration Cockpit’in ' +
        '**standart nesnesi olmayan** özel veriler için LSMW veya ' +
        'özel program gerekir.\n\n' +
        '⭐ **Doğru bakış:** LSMW’yi bir **araç** olarak değil, ' +
        'veri aktarımının **kavram setini öğreten bir ders** olarak gör. ' +
        'Araç değişir, kavramlar kalır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Veri geçişinin en pahalı hatası: geç başlamak', metin:
        'Veri temizliği bir **veri sorunudur**, bir araç sorunu değildir — ' +
        'ama araç çalıştırılana kadar **görünmez**.\n\n' +
        'Bu yüzden en pahalı hata teknik değil, **zamanlama** hatasıdır: ' +
        'yüklemeyi *"veri hazır olunca"* yapmayı planlamak.\n\n' +
        '⚠️ Veri asla kendiliğinden hazır olmaz. ' +
        'Neyin eksik olduğunu **ilk deneme çalıştırması** söyler.\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Doğru yaklaşım:** LSMW’yi veri hazır olduğunda değil, ' +
        'veri **hazırlanırken** kur ve çalıştır.\n\n' +
        'İlk deneme 50 satırla, projenin **çok erken** bir aşamasında yapılır. ' +
        'Çıkan hata listesi, veri temizliği ekibinin **iş planı** olur.\n\n' +
        'Bu, bir aracı **teşhis aracı** olarak kullanmaktır — ' +
        'yükleme aracı olarak değil. ' +
        've LSMW’nin projede yarattığı en büyük değer genelde budur.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'LSMW S/4HANA’da **çalışmaya devam ediyor** ama **önerilen araç değil**. ' +
      'Yerini **Migration Cockpit** ({{LTMC}}) aldı. ' +
      '⚠️ Ayrıca recording yöntemi {{BP}} gibi yeni işlemlerde **güvenilir değil**.',

    eccFarklari:[
      { konu:'LSMW’nin durumu', ecc:'Standart araç', s4:'⚠️ **Çalışır ama önerilmez**' },
      { konu:'Önerilen araç', ecc:'LSMW', s4:'**Migration Cockpit** ({{LTMC}})' },
      { konu:'{{kayit-recording}}', ecc:'Yaygın kullanılır', s4:'⚠️ {{BP}} gibi işlemlerde **güvenilmez**' },
      { konu:'Satıcı/müşteri yükleme', ecc:'{{XK01}} / {{XD01}} recording', s4:'**{{BP}}** — Migration Cockpit nesnesi kullanılır' },
      { konu:'Şablon', ecc:'Kendin tanımlarsın', s4:'⭐ **Hazır XML/Excel şablonu** indirilir' },
      { konu:'Eşleme', ecc:'Adım 6’da elle', s4:'Şablon sütunları **önceden eşli**' },
      { konu:'Doğrulama', ecc:'Yükleme sırasında', s4:'⭐ **Yüklemeden önce** simülasyon' },
      { konu:'Kavramlar', ecc:'Eşleme, dönüşüm, mutabakat', s4:'⭐ **Aynı** — araç değişti, kavram değişmedi' },
    ],

    universalJournal:
      '{{evrensel-kayit-defteri}} veri geçişini **basitleştirdi**: ' +
      'ECC’de FI, CO ve varlık için **ayrı ayrı** taşınan bakiyeler ' +
      'S/4HANA’da {{ACDOCA}}’ya tek yapıda gider.\n\n' +
      'Ayrıca **mutabakat kolaylaştı**: FI ile CO arasında tutarsızlık ' +
      '**yapısal olarak imkânsız** olduğu için, geçiş sonrası ' +
      'yalnızca **bir** mutabakat yapılır ' +
      '(bkz. {{konu:error-handling}} — kalkan hata sınıfı).\n\n' +
      '⚠️ Ama {{acik-kalem}} taşıma kuralı **değişmedi**: ' +
      'satıcı ve müşteri kalemleri hâlâ **tek tek** taşınmalıdır.',

    kalkanTcodes:[
      { eski:'{{LSMW}} (yeni projelerde)', yeni:'**{{LTMC}}**', not:'Migration Cockpit — hazır nesneler ve şablonlar' },
      { eski:'{{SHDB}} recording ({{BP}} için)', yeni:'Migration Cockpit nesnesi', not:'⚠️ BP ekran akışı recording için **fazla karmaşık**' },
      { eski:'—', yeni:'{{LTMOM}}', not:'Standart nesne yetmezse **özelleştirme** aracı' },
      { eski:'{{LSMW}} (mevcut projeler)', yeni:'**Duruyor**', not:'Kaldırılmadı; bakım yapılabiliyor' },
    ],

    fiori:[
      { ad:'Migrate Your Data', aciklama:'⭐ Migration Cockpit’in Fiori hâli — ' +
             'S/4HANA Cloud’da **tek yol** budur.' },
      { ad:'Migration Object Modeler', aciklama:'{{LTMOM}} — standart nesne yetmezse ' +
             'alan ekleme ve kural yazma.' },
      { ad:'Şablon indirme', aciklama:'⭐ Her nesne için **hazır Excel şablonu**; ' +
             'sütunlar SAP alanlarıyla **önceden eşli** — adım 6 büyük ölçüde ortadan kalkar.' },
    ],

    compatibilityViews:[
      '⚠️ {{BSIK}} / {{BSID}} artık **görünümdür** — ' +
      'doğrudan **yazılamaz**. Açık kalemler belge kaydıyla oluşturulur.',
      'Eski LSMW projeleri indeks tablolarına yazmaya çalışıyorsa **çalışmaz**.',
      '{{ACDOCA}} hedef tablodur ama **doğrudan yazılmaz** — ' +
      'belge kaydı üzerinden gidilir (bkz. {{konu:sap-tables}}).',
    ],

    performans:
      'Migration Cockpit, LSMW’ye göre **daha hızlıdır**: ' +
      'toplu işleme optimize edilmiştir ve ekran akışı çalıştırmaz.\n\n' +
      'LSMW’de {{kayit-recording}} yöntemi **en yavaşıdır** — ' +
      'her satır için tüm ekran akışı işlenir.\n\n' +
      '⭐ Büyük veri kümelerinde ({{bapi}} veya standart nesne kullanılamıyorsa) ' +
      'yükleme **parçalara bölünür** ve paralel oturumlar çalıştırılır. ' +
      '⚠️ Ama paralel oturumlar {{kilitleme}} çakışması yaratabilir — ' +
      'aynı ana veriye dokunan parçalar **ayrılmalıdır**.',

    bestPractices:[
      '⭐ **Yeni S/4HANA projesinde LSMW yerine {{LTMC}}** kullan.',
      'Mevcut LSMW projelerini **dönüştürmeye çalışma** — çalışıyorsa bırak; ' +
      'yeni nesneler için Cockpit kullan.',
      '⚠️ {{BP}} (satıcı/müşteri) için **recording kullanma** — ' +
      'Migration Cockpit nesnesi kullan.',
      '⭐ Kavramları araçtan bağımsız öğren: {{alan-esleme}}, {{donusum-kurali}}, ' +
      'deneme çalıştırması, {{sayi-mutabakati}} — **hepsi Cockpit’te de var**.',
      'Geçiş belgeleri için **ayrı {{belge-turu}}** — araç ne olursa olsun.',
      'Geçiş hesabı **sıfırlama kontrolü** — araç ne olursa olsun.',
      'Yükleme sonrası geçiş dönemini {{OB52}}’de **kapat**.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'"12.000 satıcı yükledik" — ama 1.847’si ödenemiyor',
    hikaye:
      '**Anadolu Makine A.Ş.** canlıya geçti. Geçiş hafta sonu yapıldı, ' +
      'pazartesi sabahı sistem açıldı.\n\n' +
      'Veri geçişi ekibi raporunu verdi: ' +
      '*"12.000 satıcı, 8.400 açık kalem yüklendi. Mutabakat tamam, ' +
      'geçiş hesabı sıfır."*\n\n' +
      '━━━━━━━━━━\n\n' +
      'İlk {{F110}} ödeme koşusu **perşembe** çalıştırıldı.\n\n' +
      'Öneri listesi geldi: **6.553 kalem** ödenecek.\n\n' +
      'Ama açık kalem sayısı **8.400**’dü. ' +
      '⚠️ **1.847 kalem öneriye hiç girmemişti** — ve hata da vermemişti.',
    veriler:[
      { k:'Yüklenen satıcı', v:'12.000' },
      { k:'Yüklenen açık kalem', v:'**8.400**' },
      { k:'Geçiş hesabı', v:'**Sıfır** ✓ — mutabakat tamam' },
      { k:'{{F110}} önerisi', v:'6.553 kalem' },
      { k:'⚠️ Öneriye girmeyen', v:'**1.847 kalem**' },
      { k:'Hata mesajı', v:'**Yok**' },
    ],

    adimlar:[
      { baslik:'Mutabakat tamam mıydı gerçekten?', tcode:'FBL1N',
        aciklama:'Önce yüklemenin doğru olduğu teyit ediliyor.',
        girdi:[
          { alan:'Açık kalem sayısı', deger:'**8.400** ✓' },
          { alan:'Toplam tutar', deger:'Kaynak dosyayla **eşleşiyor** ✓' },
          { alan:'Geçiş hesabı 399', deger:'Bakiye **sıfır** ✓' },
          { alan:'Çıkarım', deger:'⭐ Yükleme **eksiksiz** — sorun başka yerde' },
        ],
        not:'**Mutabakat gerçekten doğruydu.**\n\n' +
             'Adet tuttu, tutar tuttu, geçiş hesabı sıfırlandı. ' +
             'Veri geçişi ekibi haklıydı.\n\n' +
             '⚠️ Ama mutabakat *"kalemler yüklendi mi?"* sorusunu cevaplar — ' +
             '*"kalemler **kullanılabilir** mi?"* sorusunu değil.\n\n' +
             'Bu ayrım, senaryonun tamamıdır.' },

      { baslik:'F110 neden bazılarını almadı?', tcode:'F110',
        aciklama:'Öneri günlüğü okunuyor.',
        girdi:[
          { alan:'{{SLG1}} öneri günlüğü', deger:'1.847 kalem *"ödeme yöntemi yok"*' },
          { alan:'Kontrol', deger:'{{LFB1}}.`ZWELS` alanı → **boş**' },
          { alan:'Diğerlerinde', deger:'`ZWELS` = `T` (havale) **dolu**' },
          { alan:'Fark', deger:'⚠️ Hangi satıcılarda boş?' },
        ],
        not:'**{{F110}} hata vermedi çünkü bu bir hata değildi.**\n\n' +
             'Ödeme yöntemi olmayan kalem **öneriye alınmaz** — ' +
             'program açısından bu **doğru davranıştır**.\n\n' +
             'Kullanıcı ise *"6.553 kalem önerildi"* mesajını gördü ve ' +
             '**normal karşıladı**. 8.400 ile karşılaştırma yapmadı.\n\n' +
             'Bu, {{konu:error-handling}}’deki **② sessiz hata** sınıfı: ' +
             'sonuç eksik, mesaj yok.' },

      { baslik:'Hangi satıcılarda eksik? — ortak desen', tcode:'SE16N',
        aciklama:'1.847 kalemin satıcıları inceleniyor.',
        girdi:[
          { alan:'Tablo', deger:'{{LFB1}} · `ZWELS` boş olanlar' },
          { alan:'Sonuç', deger:'**2.310 satıcı**' },
          { alan:'Ortak nokta', deger:'⭐ Hepsi eski sistemde **"nakit ödeme"** kodluymuş' },
          { alan:'Eşleme', deger:'Eski `NK` kodu SAP’ta **karşılıksız** — boş bırakılmış' },
        ],
        not:'**Kök sebep bulundu ve bir {{donusum-kurali}} kararıydı.**\n\n' +
             'Eski sistemde ödeme yöntemi `NK` (nakit) olan satıcılar vardı. ' +
             'SAP’ta bu koda karşılık gelen bir ödeme yöntemi **tanımlanmamıştı**.\n\n' +
             'Eşleme yapılırken karar şuydu: *"karşılığı yoksa boş bırak"*.\n\n' +
             '⚠️ **Bu karar yükleme açısından doğru sonuç verdi** — ' +
             'satıcılar açıldı, kalemler yüklendi, mutabakat tuttu.\n\n' +
             'Ama **kullanım açısından** satıcıları ödenemez hâle getirdi.' },

      { baslik:'Neden deneme çalıştırmasında çıkmadı?', tcode:'LSMW',
        aciklama:'Test sürecinin neden yakalamadığı inceleniyor.',
        girdi:[
          { alan:'Deneme kümesi', deger:'50 satıcı — **rastgele** seçilmiş' },
          { alan:'İçlerinde `NK` kodlu', deger:'⚠️ **2 tane**' },
          { alan:'Deneme sonucu', deger:'50/50 **başarılı** — boş alan hata vermez' },
          { alan:'Kaçırılan', deger:'Zorunlu **olmayan** alanın boş kalması' },
        ],
        not:'⭐ **Deneme çalıştırması "yüklenebiliyor mu?" sorusunu test etti, ' +
             '"kullanılabilir mi?" sorusunu değil.**\n\n' +
             '`ZWELS` **zorunlu bir alan değildir** — boş olabilir ve ' +
             'satıcı sorunsuz açılır. Yükleme başarılı sayılır.\n\n' +
             'Sorun ancak {{F110}} çalıştırılınca ortaya çıkar — ' +
             'yani **haftalar sonra**, ilk ödeme koşusunda.\n\n' +
             '⚠️ Ayrıca deneme kümesi **rastgele** seçilmişti; ' +
             '2 tane `NK` kodlu satıcı vardı ve ikisi de ' +
             '**sorunsuz yüklendiği için** dikkat çekmedi.' },

      { baslik:'Düzeltme — toplu güncelleme', tcode:'LSMW',
        aciklama:'Eksik alan sonradan dolduruluyor.',
        girdi:[
          { alan:'① Karar', deger:'`NK` → SAP’ta **`T` (havale)** olarak eşlenecek' },
          { alan:'② Yöntem', deger:'{{LSMW}} değiştirme projesi — {{FK02}} recording' },
          { alan:'③ Kapsam', deger:'2.310 satıcının `ZWELS` alanı **güncellendi**' },
          { alan:'④ Doğrulama', deger:'{{F110}} yeniden → **8.400 kalem** öneride ✓' },
          { alan:'⑤ Gecikme', deger:'⚠️ **4 iş günü** ödeme gecikmesi' },
        ],
        fis:{ baslik:'Nihayet ödenebilen kalemlerden biri', belgeTuru:'KZ', tarih:'12.01.2028',
          satirlar:[
            { hesap:'320', ad:'Satıcılar (kapatma)', borc:47500, not:'{{BSIK}} → {{BSAK}}' },
            { hesap:'102', ad:'Bankalar', alacak:47500 },
          ], not:'Kayıt tamamen normal — sorun **muhasebede değildi**.\n\n' +
                 'Veri **eksiksiz yüklenmişti**; yalnızca bir alan boştu ve ' +
                 'o alan **süreci durduruyordu**.\n\n' +
                 '⚠️ Bedeli 4 iş günü ödeme gecikmesi ve ' +
                 'satıcılarla yapılan açıklama görüşmeleri oldu.' },
        tabloEtkisi:[
          { tablo:'LFB1', ne:'2.310 satıcının `ZWELS` alanı dolduruldu' },
          { tablo:'BSIK', ne:'Değişmedi — kalemler zaten doğruydu' },
        ],
        not:'⚠️ **Düzeltme bir "veri güncelleme" projesiydi**, ' +
             'yeni bir yükleme değil.\n\n' +
             '{{FK02}} (değiştir) recording’i ile ayrı bir LSMW projesi kuruldu. ' +
             'Bu, LSMW’nin yalnızca **ilk yükleme** için değil, ' +
             '**toplu güncelleme** için de kullanıldığını gösterir.' },

      { baslik:'Kalıcı önlemler', tcode:'LSMW',
        aciklama:'Dört önlem — kapsam, küme, kontrol ve karar kaydı.',
        girdi:[
          { alan:'① Mutabakat kapsamı', deger:'⭐ *"Yüklendi mi?"* yanına **"kullanılabilir mi?"** eklendi' },
          { alan:'② Deneme kümesi', deger:'Rastgele değil — ⭐ **her ayrık değerden en az bir örnek**' },
          { alan:'③ Boş alan raporu', deger:'Yükleme sonrası **kritik ama zorunlu olmayan** alanların doluluk kontrolü' },
          { alan:'④ Karar kaydı', deger:'⭐ Her *"karşılığı yok, boş bırak"* kararı **yazılı** ve **onaylı**' },
        ],
        not:'⭐ **İkinci ve dördüncü önlem en değerlileri.**\n\n' +
             '**Deneme kümesi rastgele seçilmemelidir.** ' +
             'Kaynak veri, her ayrık değer için en az bir örnek içerecek şekilde ' +
             '**taranarak** seçilir: her ödeme yöntemi, her ülke, her hesap grubu.\n\n' +
             '50 rastgele satır, 12.000 satırlık bir kümenin ' +
             '**çeşitliliğini temsil etmez**.\n\n' +
             '━━━━━━━━━━\n\n' +
             '**Dördüncü önlem asıl kök sebebi hedefler.**\n\n' +
             'Eşleme sırasında verilen *"karşılığı yok, boş bırak"* kararı ' +
             'teknik olarak makuldü ve **kimse itiraz etmedi** — ' +
             'çünkü kararı veren kişi ödeme sürecini bilmiyordu.\n\n' +
             'Artık bu tür kararlar **yazılı** ve ilgili sürecin ' +
             '**sahibi tarafından onaylı** olacak.' },
    ],

    sonuc:
      '**Mutabakat tamamdı, veri eksiksizdi — ve 1.847 kalem ödenemiyordu.**\n\n' +
      '**Beş kritik ders:**\n\n' +
      '**1. Mutabakat "yüklendi mi?" sorusunu cevaplar, "kullanılabilir mi?" sorusunu değil.** ' +
      'Adet tuttu, tutar tuttu, geçiş hesabı sıfırlandı — hepsi doğruydu. ' +
      'Ama bir alan boş olduğu için **süreç çalışmadı**. ' +
      'Mutabakata **kullanılabilirlik kontrolü** eklenmeli: ' +
      'yükleme sonrası kritik ama **zorunlu olmayan** alanların doluluğu ölçülür.\n\n' +
      '**2. Zorunlu olmayan alan, gereksiz alan demek değildir.** ' +
      '`ZWELS` boş olabilir ve satıcı sorunsuz açılır — bu yüzden ' +
      'yükleme **başarılı** sayıldı. Ama {{F110}} o alanı **zorunlu kılar**. ' +
      'SAP’ın zorunluluk tanımı **kayıt anına** aittir; ' +
      '**süreç zorunlulukları** ayrıca düşünülmelidir.\n\n' +
      '**3. Deneme kümesi rastgele seçilmez.** ' +
      '50 rastgele satır, 12.000 satırın çeşitliliğini **temsil etmez**. ' +
      'Küme, her ayrık değerden en az bir örnek içerecek şekilde ' +
      '**taranarak** seçilir — her ödeme yöntemi, her ülke, her hesap grubu.\n\n' +
      '**4. Eşleme kararları süreç bilgisi gerektirir.** ' +
      '*"Karşılığı yok, boş bırak"* kararı teknik olarak makuldü. ' +
      'Ama kararı veren kişi **ödeme sürecini bilmiyordu**. ' +
      'Bu tür kararlar yazılı olmalı ve **sürecin sahibi** onaylamalıdır.\n\n' +
      '**5. Sessiz hata sınıfı veri geçişinde de aynı.** ' +
      '{{F110}} hata vermedi çünkü bu **bir hata değildi** — ' +
      'ödeme yöntemi olmayan kalem öneriye alınmaz, doğru davranış budur. ' +
      'Kullanıcı *"6.553 kalem önerildi"* mesajını **normal karşıladı**. ' +
      '{{konu:error-handling}}’deki kural burada da geçerli: ' +
      '**sonuç sayısı beklenenle karşılaştırılmazsa eksik görünmez.**',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '⭐ **LSMW bir yükleme aracı değil, bir tarif defteridir** — ' +
      'aynı yükleme onlarca kez, farklı sistemlerde, aynı sonuçla tekrarlanır.',
      '14 adım = **dört öbek**: tanımla → eşle → oku/dönüştür → yaz.',
      '⭐ **Adım 6 (eşleme) işin asıl yeridir**; diğer 13 adım altyapıdır.',
      '**Yöntem sırası:** standart nesne → {{bapi}} → {{kayit-recording}} (son çare).',
      '⭐ **Önce elle bir kayıt aç** — zorunlu alanları **bir kerede** gör.',
      'Recording **en karmaşık satırla** alınır; koşullu ekranlar tuzaktır.',
      '⚠️ En sık iki dönüşüm hatası: **sola sıfır dolgu** ve **tarih biçimi**.',
      '{{acik-kalem}} hesapları **tek tek**, G/L **toplu** taşınır.',
      '⭐ **Geçiş hesabı sıfırlanmalı** — en güçlü tek kontrol.',
      '⚠️ Mutabakat *"yüklendi mi?"* der, *"kullanılabilir mi?"* demez.',
    ],

    onemliNoktalar:[
      '**"LSMW\'nin 14 adımını sayar mısın?"** Ezber yerine **dört öbek** söylenir: **① Tanımla** (1–2: proje yapısı ve **aktarım yöntemi**) · **② Eşle** (3–6: kaynak yapı, alanlar, ⭐ {{alan-esleme}} ve {{donusum-kurali}}) · **③ Oku ve dönüştür** (9–12: iki **görüntüleme** adımı dahil) · **④ Yaz** (13–14: {{toplu-giris}} oturumu). Adım 6 işin asıl yeri; gerisi altyapı.',
      '**"Recording mi BAPI mi kullanırsın?"** Sıralı karar: **standart nesne varsa onu** (bakımı SAP’ta) → **yoksa {{bapi}}** (ekrandan bağımsız, iş doğrulamaları çalışır, hata mesajı **yapılandırılmış**) → **son çare {{kayit-recording}}** (ekran değişince **bozulur**, koşullu ekranlar tuzak). ⚠️ BAPI’de `BAPI_TRANSACTION_COMMIT` çağrılmazsa kayıt **yazılmaz**.',
      '**"Yükleme öncesi ilk yapılacak şey nedir?"** ⭐ **SAP’ta elle bir kayıt açmak.** Sebebi sayısal: LSMW zorunlu alan hatalarını **satır satır** verir — 5 eksik alan = 5 tur. Elle bir kayıt **hepsini bir kerede** gösterir = 1 tur. Genel ilke: hata mesajları **seri**, ekranlar **paralel** bilgi verir.',
      '**"Hesap numarası bulunamıyor ama hesap sistemde var. Neden?"** ⚠️ **Sola sıfır dolgu.** SAP hesap numarasını sabit uzunlukta bekler (`0000320100`); Excel sayı olarak gördüğü için baştaki sıfırları **atar**. Dosya doğru görünür, yükleme başarısız olur. Çözüm: {{donusum-kurali}} ile doldur, kaynak sütunu **metin** biçiminde tut.',
      '**"Açık kalemleri toplu mu tek tek mi taşırsın?"** ⭐ **{{acik-kalem}} yönetimi olan hesaplarda tek tek** — satıcı, müşteri, GR/IR. Toplu taşınırsa kapatılacak kalem olmaz: {{F-53}} ödeme yapamaz, {{F110}} çalışmaz, {{F150}} ihtar üretemez, {{F.13}} kapatamaz. **Vade tarihi ve ödeme koşulu korunmalıdır.** G/L hesaplarında (açık kalem yönetimi yoksa) bakiye yeterlidir.',
      '**"Veri geçişinin en güçlü kontrolü nedir?"** ⭐ **Geçiş hesabının sıfırlanması.** Tüm açılış kayıtları bir geçiş hesabı (örn. `399`) karşılığında atılır; sonunda bakiyesi **sıfır olmalıdır**. Adet kontrolünden güçlüdür çünkü **tutar bazında** çalışır ve {{donusum-kurali}} hatalarını (ondalık ayracı, kur) da yakalar. Tek sayıya bakılır, yorum gerektirmez.',
      '**"Mutabakat tuttu, geçiş başarılı mı?"** ⚠️ **Hayır — mutabakat *"yüklendi mi?"* sorusunu cevaplar.** Zorunlu **olmayan** ama süreç için gerekli bir alan (örn. {{LFB1}}.`ZWELS` ödeme yöntemi) boş olabilir; kayıt sorunsuz açılır, mutabakat tutar, ama {{F110}} o kalemi **öneriye almaz** ve **hata vermez**. Mutabakata **kullanılabilirlik kontrolü** eklenir.',
      '**"S/4HANA\'da LSMW hâlâ kullanılıyor mu?"** **Çalışır ama önerilmez** — yerini **Migration Cockpit** ({{LTMC}}) aldı; hazır nesneler, önceden eşli şablonlar ve **yükleme öncesi simülasyon** sunar. ⚠️ Ayrıca LSMW recording’i {{BP}} gibi işlemlerde **güvenilmez**. ⭐ Ama **kavramlar taşınır**: eşleme, dönüşüm, deneme çalıştırması, mutabakat — Cockpit’te de aynı.',
    ],

    sikHatalar:[
      { hata:'Eşlemeye kaynak dosyadan başlamak.', dogru:'⭐ **SAP’ın zorunlu alan listesinden** başla — elle bir kayıt açarak.' },
      { hata:'Recording’i en basit örnekle almak.', dogru:'⚠️ Koşullu ekranlar kayda girmez ve yükleme orada **takılır**. **En karmaşık satırla** al.' },
      { hata:'Kayıt alırken bazı alanları boş bırakmak.', dogru:'Boş alan **kayda girmez** ve sonradan eşleştirilemez. Tüm alanlar doldurulur.' },
      { hata:'Excel’de hesap numarasını sayı olarak tutmak.', dogru:'⚠️ Baştaki sıfırlar **kaybolur**. Sütun **metin** biçiminde tutulur.' },
      { hata:'Adım 10 ve 12’deki görüntüleme adımlarını atlamak.', dogru:'Sütun kayması ve dönüşüm hatası **orada** görünür — yükleme sırasında değil.' },
      { hata:'12.000 satırla doğrudan başlamak.', dogru:'⚠️ Aynı hatayı 12.000 kez görmektir. Önce **10–20 satır**.' },
      { hata:'Deneme kümesini rastgele seçmek.', dogru:'⭐ **Her ayrık değerden en az bir örnek** olacak şekilde taranarak seçilir.' },
      { hata:'Satıcı bakiyesini toplu taşımak.', dogru:'{{acik-kalem}} hesapları **tek tek**; yoksa {{F110}} ve {{F-53}} çalışmaz.' },
      { hata:'{{LFB1}} yüklemesini unutmak.', dogru:'⚠️ **Ayrı bir adımdır.** `AKONT` mutabakat hesabı olmadan satıcıya kayıt yapılamaz.' },
      { hata:'Geçiş kayıtlarını normal belge türüyle atmak.', dogru:'⭐ **Ayrı {{belge-turu}}** tanımlanır; yoksa yıllar sonra ayırt edilemez.' },
      { hata:'BAPI kullanıp commit çağırmamak.', dogru:'⚠️ BAPI *"başarılı"* döner, kayıt **yazılmaz**. `BAPI_TRANSACTION_COMMIT` zorunlu.' },
      { hata:'LSMW projesini taşıma isteğiyle taşımaya çalışmak.', dogru:'Kendi **dışa/içe aktarma** mekanizması vardır.' },
      { hata:'Yüklemeyi "veri hazır olunca" yapmayı planlamak.', dogru:'⭐ Veri kendiliğinden hazır olmaz. İlk deneme **erken** yapılır; hata listesi **veri temizliği iş planıdır**.' },
    ],

    ipuclari:[
      '⭐ **Önce elle bir kayıt aç** — hata mesajları seri, ekranlar paralel bilgi verir.',
      '⭐ Recording’i **en karmaşık satırla** al.',
      'Yöntem sırası: standart nesne → {{bapi}} → {{kayit-recording}}.',
      'Kaynak sütunlarını Excel’de **metin** tut — sola sıfır dolgu kaybolmasın.',
      'İki görüntüleme adımını (10 ve 12) **atlama**.',
      '⚠️ Deneme kümesini **tarayarak** seç, rastgele değil.',
      '⭐ Mutabakat **iki seviyeli**: adet **ve** tutar. Adet tutup tutar tutmuyorsa dönüşüm hatası.',
      '⭐ Mutabakata **kullanılabilirlik** ekle: kritik ama zorunlu olmayan alanların doluluğu.',
      'Geçiş hesabı **sıfırlanmalı**; geçiş için **ayrı belge türü** tanımla.',
      'Eşlemede *"karşılığı yok, boş bırak"* kararını **yazılı** ve **süreç sahibi onaylı** yap.',
    ],

    quiz:[
      { soru:'LSMW’nin 14 adımlı olmasının asıl sebebi nedir?',
        secenekler:[
          'SAP’ın karmaşık tasarım geleneği',
          '**Yüklemenin tekrarlanabilir ve taşınabilir bir "tarif" olarak saklanması**',
          'Yetkilendirme gereksinimleri',
          'Performans optimizasyonu',
        ], dogru:1,
        aciklama:'⭐ **LSMW bir yükleme aracı değil, bir tarif defteridir.**\n\n' +
                 'Veriyi bir kez yüklemek kolaydır. Zor olan aynı yüklemeyi ' +
                 '**geliştirme → test → prova → canlı** boyunca ' +
                 'defalarca, **aynı sonuçla** tekrarlamaktır.\n\n' +
                 '14 adım bu tarifi **yapılandırılmış ve taşınabilir** kılar: ' +
                 'eşleme kuralları veriden ayrıdır, proje dışa aktarılabilir, ' +
                 've hangi alanın nereden geldiği **belgelidir**.' },

      { soru:'Standart nesne, BAPI ve recording arasında seçim yaparken doğru sıra nedir?',
        secenekler:[
          'Recording → BAPI → standart nesne',
          '**Standart nesne → BAPI → recording**',
          'BAPI → recording → standart nesne',
          'Hangisi kolaysa',
        ], dogru:1,
        aciklama:'Yukarıdan aşağı **kırılganlık artar**:\n\n' +
                 '**Standart nesne** — bakımı **SAP yapar**, sürüm değişiminde bozulmaz.\n' +
                 '**{{bapi}}** — ekrandan **bağımsız**, iş doğrulamaları çalışır, ' +
                 'hata mesajı **yapılandırılmış**.\n' +
                 '**{{kayit-recording}}** — ⚠️ ekran değişirse **bozulur**, ' +
                 'koşullu ekranlar tuzak, hata teşhisi zor.\n\n' +
                 'Recording yalnızca diğer ikisi **yoksa** — ' +
                 'özellikle özel (`Z*`) işlemlerde.\n\n' +
                 '⚠️ BAPI seçilirse `BAPI_TRANSACTION_COMMIT` **unutulmamalı**.' },

      { soru:'Yükleme projesine başlarken ilk yapılması gereken nedir?',
        secenekler:[
          'Kaynak dosyayı incelemek',
          'LSMW projesini oluşturmak',
          '**SAP’ta elle bir örnek kayıt açıp zorunlu alanları görmek**',
          'Recording almak',
        ], dogru:2,
        aciklama:'⭐ Sebebi **sayısaldır**.\n\n' +
                 '**Dosyadan başlarsan:** çalıştır → *"X zorunlu"* → düzelt → ' +
                 'çalıştır → *"Y zorunlu"* → … **5 eksik alan = 5 tur**.\n\n' +
                 '**SAP’tan başlarsan:** {{XK01}} ile bir kayıt aç → ' +
                 'zorunlu alanları **bir kerede** gör → eksikleri toplu çöz. ' +
                 '**1 tur.**\n\n' +
                 '**Genel ilke:** hata mesajları bilgiyi **seri** verir ' +
                 '(bir seferde bir tane), ekranlar **paralel** verir (hepsi birden). ' +
                 'Paralel kaynak varken seri kaynaktan öğrenmek **gereksiz yavaştır**.' },

      { soru:'Hesap numarası "bulunamadı" hatası veriyor ama hesap sistemde mevcut. En olası sebep?',
        secenekler:[
          'Yetki eksikliği',
          'Hesap kilitli',
          '**Sola sıfır dolgu eksik — Excel baştaki sıfırları atmış**',
          'Dönem kapalı',
        ], dogru:2,
        aciklama:'SAP hesap numarasını **sabit uzunlukta** bekler: ' +
                 '`320100` değil `0000320100`.\n\n' +
                 '⚠️ Excel bu alanı **sayı** olarak görür ve baştaki sıfırları **atar**. ' +
                 'Dosya ekranda doğru görünür, yükleme başarısız olur.\n\n' +
                 '**Çözüm iki katmanlı:**\n' +
                 '• {{donusum-kurali}} ile sola sıfır doldur\n' +
                 '• ⭐ Kaynak sütununu Excel’de **metin** biçiminde tut ' +
                 '(veya CSV’yi doğrudan üret)\n\n' +
                 'Tarih biçimiyle birlikte **en sık iki dönüşüm hatasından** biridir.' },

      { soru:'Satıcı açık kalemleri nasıl taşınmalıdır?',
        secenekler:[
          'Satıcı başına tek toplam satır — daha hızlı',
          '**Her fatura ayrı belge olarak — vade ve ödeme koşuluyla**',
          'Yalnızca bakiye, kalem gerekmez',
          'Hepsi tek bir toplu belgede',
        ], dogru:1,
        aciklama:'{{acik-kalem}} yönetimi olan hesaplarda **tek tek** taşınır.\n\n' +
                 '**Toplu taşınırsa ne bozulur:**\n' +
                 '• {{F-53}} ile ödeme yapılamaz — kapatılacak kalem yok\n' +
                 '• {{F110}} otomatik ödeme çalışmaz\n' +
                 '• {{F150}} ihtar üretemez\n' +
                 '• {{FBL1N}} dökümü anlamsız olur\n\n' +
                 '⭐ **Vade tarihi (`ZFBDT`), ödeme koşulu (`ZTERM`) ve ' +
                 'referans korunmalıdır** — yoksa ödeme ve ihtar süreçleri ' +
                 'yanlış tarihlerle çalışır.\n\n' +
                 'G/L hesaplarında (açık kalem yönetimi yoksa) bakiye yeterlidir.' },

      { soru:'Veri geçişinin en güçlü tek kontrolü hangisidir?',
        secenekler:[
          'Yüklenen kayıt sayısının doğrulanması',
          '**Geçiş hesabının bakiyesinin sıfırlanması**',
          'Rastgele örnek kontrolü',
          'Kullanıcı onayı',
        ], dogru:1,
        aciklama:'Tüm açılış kayıtları bir **geçiş hesabı** (örn. `399`) ' +
                 'karşılığında atılır. Yükleme bitince bakiyesi **sıfır olmalıdır**.\n\n' +
                 '**Neden adet kontrolünden güçlü:**\n\n' +
                 '• **Tutar bazında** çalışır — adet tutup tutar tutmayabilir\n' +
                 '• Eksik **ve** fazla yüklemeyi yakalar\n' +
                 '• {{donusum-kurali}} hatalarını (ondalık ayracı, kur) yakalar\n' +
                 '• **Tek sayıya** bakılır — yorum gerektirmez\n\n' +
                 '⚠️ Sıfır değilse yükleme eksik veya hatalıdır — ' +
                 'başka açıklaması **yoktur**.' },

      { soru:'Mutabakat tuttu (adet ✓ tutar ✓ geçiş hesabı sıfır ✓) ama {{F110}} bazı kalemleri almıyor. Nasıl olur?',
        secenekler:[
          'Mutabakat yanlış hesaplanmış',
          'Dönem kapalı',
          '**Zorunlu olmayan ama süreç için gerekli bir alan boş — örn. ödeme yöntemi**',
          'Kalemler aslında yüklenmemiş',
        ], dogru:2,
        aciklama:'⭐ **Mutabakat *"yüklendi mi?"* sorusunu cevaplar, ' +
                 '*"kullanılabilir mi?"* sorusunu değil.**\n\n' +
                 '{{LFB1}}.`ZWELS` (ödeme yöntemi) **zorunlu bir alan değildir** — ' +
                 'boş olabilir ve satıcı sorunsuz açılır, mutabakat tutar.\n\n' +
                 'Ama {{F110}} ödeme yöntemi olmayan kalemi **öneriye almaz** ' +
                 've **hata vermez** — bu program açısından doğru davranıştır.\n\n' +
                 '**SAP’ın zorunluluk tanımı kayıt anına aittir; ' +
                 'süreç zorunlulukları ayrıca düşünülmelidir.**\n\n' +
                 'Çözüm: mutabakata **kullanılabilirlik kontrolü** eklenir — ' +
                 'kritik ama zorunlu olmayan alanların doluluk raporu.' },

      { soru:'S/4HANA’da LSMW’nin durumu nedir?',
        secenekler:[
          'Tamamen kaldırıldı',
          '**Çalışır ama önerilmez — yerini Migration Cockpit aldı; kavramlar aynı kaldı**',
          'Değişmedi, hâlâ önerilen araç',
          'Yalnızca bulut sürümünde var',
        ], dogru:1,
        aciklama:'LSMW **kaldırılmadı** ve mevcut projeler çalışmaya devam ediyor. ' +
                 'Ama yeni projelerde SAP **Migration Cockpit** ({{LTMC}}) öneriyor: ' +
                 'hazır nesneler, **önceden eşli** şablonlar, ' +
                 'yükleme öncesi **simülasyon**.\n\n' +
                 '⚠️ Ayrıca LSMW’nin bilinen bir kısıtı var: ' +
                 '{{kayit-recording}} yöntemi {{BP}} gibi yeni işlemlerde ' +
                 '**güvenilir çalışmaz** — ekran akışı fazla karmaşık.\n\n' +
                 '⭐ **Ama kavramlar taşınır:** {{alan-esleme}}, {{donusum-kurali}}, ' +
                 'deneme çalıştırması, {{sayi-mutabakati}}, geçiş hesabı kontrolü — ' +
                 'hepsi Cockpit’te de geçerli. **Araç değişir, kavramlar kalır.**' },
    ],

    flashcards:[
      { on:'⭐ LSMW nedir — tek cümle', arka:'**Bir yükleme aracı değil, bir TARİF DEFTERİ.**\n\nAynı yükleme tekrarlanır:\ngeliştirme → test → prova → **canlı (tek şans)**\n\nTarif bir kez yazılır, defalarca uygulanır — ve **taşınabilir** bir nesne olarak saklanır.' },
      { on:'14 adım = dört öbek', arka:'**① Tanımla** (1–2) — proje + **yöntem**\n**② Eşle** (3–6) — ⭐ **adım 6 işin asıl yeri**\n**③ Oku/Dönüştür** (9–12) — **iki görüntüleme**\n**④ Yaz** (13–14) — oturum + çalıştır\n\nGerisi altyapı; zamanın çoğu **adım 6**’da geçer.' },
      { on:'Yöntem seçimi — sıralı karar', arka:'**1. Standart nesne** → bakımı SAP’ta ✅\n**2. {{bapi}}** → ekrandan bağımsız, doğrulamalar çalışır\n**3. {{kayit-recording}}** → ⚠️ **son çare**\n\nAşağı indikçe **kırılganlık artar**, esneklik artar\n\n⚠️ BAPI: `BAPI_TRANSACTION_COMMIT` **zorunlu**' },
      { on:'⭐ İlk yapılacak şey', arka:'**SAP’ta elle bir kayıt aç** ({{XK01}})\n\nHata mesajları **SERİ** bilgi verir → 5 eksik alan = **5 tur**\nEkranlar **PARALEL** bilgi verir → **1 tur**\n\n→ Eşleme kaynak dosyadan değil, **SAP’ın zorunlu alan listesinden** başlar' },
      { on:'Recording’in tek kuralı', arka:'⭐ **En KARMAŞIK satırla kaydet** — en basitiyle değil\n\nRecording **gördüğü ekranları** kaydeder; görmediğini bilmez\n\nBasit satıcıyla alınan kayıt → banka bilgili satıcıda **takılır**\n\n⚠️ Boş bırakılan alan **kayda girmez**' },
      { on:'İki klasik dönüşüm hatası', arka:'**1. Sola sıfır dolgu**\n`320100` → `0000320100`\n⚠️ Excel sayı sanıp sıfırları **atar**\n→ Sütunu **metin** biçiminde tut\n\n**2. Tarih biçimi**\n`31.12.2027` → `20271231`\n\nBonus: ondalık ayracı `1.234,56` ↔ `1234.56`' },
      { on:'Kalem mi, bakiye mi?', arka:'**{{acik-kalem}} yönetimi VAR** (satıcı, müşteri, GR/IR)\n→ ⭐ **TEK TEK** · vade + ödeme koşulu **korunur**\n\n**Yoksa** (normal G/L)\n→ **Toplu bakiye** yeter\n\n⚠️ Toplu taşınırsa: F-53 ❌ F110 ❌ F150 ❌ F.13 ❌' },
      { on:'⭐ En güçlü tek kontrol', arka:'**Geçiş hesabı (399) bakiyesi = SIFIR**\n\nTüm açılış kayıtları bu hesap karşılığında atılır\n\nNeden adet kontrolünden güçlü:\n• **Tutar** bazında\n• Eksik **ve** fazlayı yakalar\n• Dönüşüm hatasını yakalar\n• **Tek sayı** — yorum yok' },
      { on:'⚠️ Mutabakatın kör noktası', arka:'Mutabakat = *"Yüklendi mi?"*\n**DEĞİL** = *"Kullanılabilir mi?"*\n\nÖrnek: `ZWELS` (ödeme yöntemi) **zorunlu değil**\n→ satıcı açılır ✓ mutabakat tutar ✓\n→ ama {{F110}} kalemi **almaz** ve **hata vermez**\n\n⭐ Kritik ama zorunlu olmayan alanların **doluluk raporu**' },
      { on:'Deneme çalıştırması — iki kural', arka:'**1. ERKEN yap** — veri hazır olunca değil, **hazırlanırken**\n→ İlk hata listesi = **veri temizliği iş planı**\n\n**2. Kümeyi TARAYARAK seç** — rastgele değil\n→ Her ayrık değerden **en az bir örnek**\n(her ödeme yöntemi, her ülke, her hesap grubu)' },
      { on:'Yükleme sırası — bağımlılık', arka:'**1.** Özelleştirme (hesap planı, belge türü, ödeme koşulu)\n**2.** Ana veri **genel** ({{LFA1}})\n**3.** ⚠️ Ana veri **şirket kodu** ({{LFB1}}) — **AYRI ADIM**\n**4.** Duran varlık (`AS91`)\n**5.** Açılış bakiyeleri\n**6.** Mutabakat\n\n⚠️ En sık atlanan: **3** (`AKONT` yok → kayıt yapılamaz)' },
      { on:'Geçiş belgeleri — ayrı belge türü', arka:'⭐ Geçiş için **özel {{belge-turu}}** tanımla (örn. `ZE`)\n\n• {{BKPF}}.`BLART` ile **süzülebilir**\n• `XBLNR`’a **eski sistem numarası**\n• Ayrı numara aralığı ({{FBN1}})\n• ⚠️ Aralık **önceki mali yılı** kapsamalı\n• Geçiş sonrası **kapatılabilir**' },
      { on:'S/4HANA’da LSMW', arka:'⚠️ **Çalışır ama önerilmez** → {{LTMC}} Migration Cockpit\n\n⚠️ Recording {{BP}}’de **güvenilmez**\n\n⭐ **Ama kavramlar taşınır:**\neşleme · dönüşüm · deneme · mutabakat · geçiş hesabı\n\n*Araç değişir, kavramlar kalır.*' },
    ],
  },

  },
});
