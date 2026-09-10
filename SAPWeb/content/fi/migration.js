/* ==========================================================================
   content/fi/migration.js — "Migration (Veri Geçişi)"

   Ana tez: Geçiş bir VERİ TAŞIMA işi değil, HANGİ GEÇMİŞİN taşınacağına
   dair bir MUHASEBE KARARIDIR — ve bu karar araç seçiminden önce verilir.
   ========================================================================== */

SAP.registerTopic({
  id: 'migration',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Veri geçişi, eski sistemdeki bilgilerin S/4HANA’ya taşınmasıdır.\n\n' +
      'Bu tanım doğrudur ama **işin nerede zorlaştığını** söylemez. ' +
      '{{konu:lsmw}} ve {{konu:data-upload}} *nasıl* taşınacağını anlattı; ' +
      'bu konu **neyin taşınacağına** dair kararı anlatıyor.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Bu konunun tezi:**\n\n' +
      '**Geçiş bir veri taşıma işi değil, hangi *geçmişin* taşınacağına ' +
      'dair bir muhasebe kararıdır.**\n\n' +
      'Bir yükleme aracını herkes öğrenebilir. Zor olan şu soruya ' +
      'cevap vermektir:\n\n' +
      '*"Yeni sistemde geçen yılın gelir tablosunu görebilecek miyiz?"*\n\n' +
      'Bu sorunun cevabı **araçla değil yaklaşımla** verilir ve ' +
      'yanlış cevaplandığında geri dönüşü yoktur: canlıya geçtikten ' +
      'sonra "geçmişi de taşıyalım" denemez.\n\n' +
      '━━━━━━━━━━\n\n' +
      'Üç yaklaşım vardır ve üçü de **geçmiş** sorusuna farklı cevap verir:\n\n' +
      '**{{greenfield}}** — sistem sıfırdan kurulur, yalnızca bakiye ve ' +
      'açık kalem taşınır. *Geçmiş eski sistemde kalır.*\n\n' +
      '**{{brownfield}}** — mevcut sistem yerinde dönüştürülür. ' +
      '*Geçmiş de gelir — birikmiş hatalarla birlikte.*\n\n' +
      '**{{secici-gecis}}** — yeni sistem kurulur ama seçilmiş tarihçe taşınır. ' +
      '*Pahalı ama ikisinin ortası.*',

    neden:
      '**Yeni sistem boş açılamaz.** Şirketin borcu, alacağı, stoku ve ' +
      'varlıkları geçiş gününde de duruyor; muhasebe kesintisiz olmak zorundadır.\n\n' +
      '**Yasal süreklilik.** Mali tablolar yıl boyunca karşılaştırmalı ' +
      'sunulur; denetçi geçen yılın rakamını sorar.\n\n' +
      '**Süreçler ana veri olmadan çalışmaz.** Satıcı yoksa fatura girilemez, ' +
      '{{mutabakat-hesabi}} yoksa satıcıya kayıt yapılamaz.\n\n' +
      '**Tek şans.** Geçiş bir hafta sonu olur. {{deneme-gecisi}} defalarca ' +
      'yapılabilir; gerçeği **bir kez** yapılır.',

    sirketOnemi:
      'Geçiş projelerinde en sık yapılan hata, veri geçişini bir ' +
      '**teknik iş paketi** sanmaktır. Değildir — muhasebe kararlarının ' +
      'toplandığı yerdir.\n\n' +
      'Üç örnek, üçü de teknik görünüp muhasebe kararı olan sorular:\n\n' +
      '**1.** *"Satıcı bakiyelerini toplu mu taşıyalım?"* → Toplu taşınırsa ' +
      '{{F110}} çalışmaz. Bu bir yükleme tercihi değil, **ödeme sürecinin** kararıdır.\n\n' +
      '**2.** *"Hangi hesap planını kullanacağız?"* → {{hesap-plani}} bir ' +
      '{{tek-yonlu-kapi}}dır; canlıda değiştirilemez.\n\n' +
      '**3.** *"Kaç yıl geriye gidelim?"* → Cevap "mümkün olduğunca" değildir. ' +
      'Her ek yıl, o yılın **tüm hareketlerini** ve o dönemin ' +
      'yapılandırmasını (vergi oranları, hesap planı, kur) taşımayı gerektirir.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Danışman için asıl ders:** bu soruların hiçbirini veri geçişi ' +
      'ekibi tek başına cevaplayamaz. Cevaplar **mali işler direktöründen** ' +
      've **denetçiden** gelir. Danışmanın işi soruyu doğru zamanda ' +
      've doğru biçimde sormaktır:\n\n' +
      '*"Şubat ayında denetçi 2027 gelir tablosunu isterse, ' +
      'onu nereden çıkaracağız?"*',

    gercekHayat:
      'Proje yöneticisi: *"Veri geçişi ekibi kuruldu, Ağustos’ta başlıyorlar."*\n\n' +
      'Bu cümlede iki hata var.\n\n' +
      '**Birinci hata — "ekip".** Veri geçişi bir ekibin işi değil, ' +
      'bir **karar zinciridir**. Hangi verinin taşınacağına iş tarafı, ' +
      'nasıl eşleneceğine danışman, temizliğine veri sahibi karar verir.\n\n' +
      '**İkinci hata — "Ağustos’ta başlıyorlar".** Veri temizliği ' +
      'projenin **ilk günü** başlar. Ağustos’ta başlayan şey yüklemedir; ' +
      'temizlik o zamana kadar bitmiş olmalıdır.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **Doğru sıra tersinden kurulur:**\n\n' +
      '**1.** Canlıya geçiş tarihi belirlenir.\n' +
      '**2.** Geriye doğru sayılır: son {{deneme-gecisi}} ne zaman?\n' +
      '**3.** Ondan önce veri **dondurulmuş** olmalı.\n' +
      '**4.** Dondurmadan önce temizlik bitmiş olmalı.\n' +
      '**5.** Temizliğin iş planı **ilk deneme yüklemesinin hata listesidir**.\n\n' +
      'Bu zincir kurulmazsa temizlik hep "sonra" kalır ve ' +
      'kesme hafta sonunda ortaya çıkar.',

    muhasebeMantigi:
      'Geçişte taşınan veri **üç sınıfa** ayrılır ve muhasebe açısından ' +
      'üçü tamamen farklıdır:\n\n' +
      '**① {{ana-veri}}** — satıcı, müşteri, G/L hesabı, varlık ana verisi.\n' +
      'Muhasebe kaydı **üretmez**. Yanlışsa düzeltilir.\n\n' +
      '**② {{acilis-bakiyesi}}** — bakiyeler ve açık kalemler.\n' +
      '⚠️ Muhasebe kaydı **üretir**. Yanlışsa {{FB08}} gerekir ve iz kalır.\n\n' +
      '**③ Tarihçe** — geçmiş yılların hareketleri.\n' +
      'Yalnızca {{brownfield}} veya {{secici-gecis}}te gelir.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⭐ **İkinci sınıfın içindeki kritik ayrım:**\n\n' +
      '**Bilanço hesapları** devreder — bakiyeleri taşınır.\n' +
      '**Gelir tablosu hesapları devretmez** — dönem sonunda sıfırlanıp ' +
      'kâr/zarara aktarılırlar ({{bakiye-devri}}).\n\n' +
      '⚠️ **Sonucu şudur: gelir tablosu hesaplarının açılış bakiyesi olmaz.** ' +
      'Yani {{greenfield}} bir geçişte **önceki yılın gelir tablosu yeni ' +
      'sistemde hiç oluşmaz** — eksik yüklendiği için değil, ' +
      '**muhasebenin doğası gereği**.\n\n' +
      'Karşılaştırmalı gelir tablosu isteniyorsa üç yoldan biri seçilir: ' +
      '(a) önceki yılın **hareketleri** de taşınır, (b) eski sistem ' +
      '**okunabilir** kalır, (c) tablolar sistem dışında saklanır. ' +
      'Üçü de bir karardır ve **geçişten önce** verilir.',

    kavramlar: ['greenfield', 'brownfield', 'secici-gecis', 'cvi',
                'basitlestirme-listesi', 'acilis-bakiyesi', 'kesme-plani', 'deneme-gecisi'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Geçiş süreci **karardan başlar, araçla devam eder, mutabakatla biter**. ' +
      'Araç ortadaki halkadır ve en çok konuşulan ama en az risk taşıyan kısımdır.',

    roller:[
      { rol:'Mali işler direktörü', gorev:'⭐ **Geçmiş kararını verir**: karşılaştırmalı tablo gerekli mi?' },
      { rol:'Proje yöneticisi', gorev:'Yaklaşımı seçer: {{greenfield}} · {{brownfield}} · {{secici-gecis}}' },
      { rol:'Danışman', gorev:'{{basitlestirme-listesi}}’ni çalıştırır, engelleyicileri çıkarır.' },
      { rol:'Danışman', gorev:'{{hesap-plani}} eşlemesini kurar — ⚠️ **n:1 taşınır, 1:n taşınmaz**.' },
      { rol:'Veri sahibi', gorev:'Ana veriyi temizler. **Bu işin sahibi danışman değildir.**' },
      { rol:'Danışman', gorev:'{{LTMC}} nesnelerini kurar, {{alan-esleme}} yazar.' },
      { rol:'Proje ekibi', gorev:'⭐ **{{deneme-gecisi}}** — en az üç tur, süreler ölçülür.' },
      { rol:'Danışman', gorev:'{{kesme-plani}}nı yazar; geri dönüş noktasını belirler.' },
      { rol:'Muhasebe', gorev:'⭐ **Üç seviyeli mutabakat** yapar ve imzalar.' },
      { rol:'BT', gorev:'Eski sistemi **okunabilir** bırakır — kapatmaz.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Geçiş — karardan mutabakata',
      adimlar:[
        { ic:'❓', rol:'Karar', baslik:'⭐ Adım 0 — "Geçmişi taşıyacak mıyız?"',
          aciklama:'Araç seçiminden **önce** cevaplanır. Cevap yaklaşımı belirler ' +
                   've sonradan değiştirilemez.',
          cikti:'Yaklaşım: greenfield / brownfield / seçici', ok:'kapsam çıkar' },
        { ic:'📋', rol:'Hazırlık', baslik:'{{basitlestirme-listesi}} çalıştırılır',
          aciklama:'Hangi işlev değişti, hangisi kalktı, hangisi **engelleyici**? ' +
                   'Proje planı bu çıktı olmadan yapılamaz.',
          cikti:'Engelleyici listesi', ok:'temizlik başlar' },
        { ic:'🧹', rol:'Veri sahibi', baslik:'Veri temizliği — **projenin ilk günü** başlar',
          aciklama:'Mükerrer satıcı, eksik vergi numarası, geçersiz ülke kodu, ' +
                   'SAP’ta karşılığı olmayan {{odeme-kosulu}}.\n\n' +
                   '⭐ İş planı, ilk deneme yüklemesinin **hata listesidir**.',
          cikti:'Temiz kaynak veri', ok:'eşlenir' },
        { ic:'🔗', rol:'Danışman', baslik:'⭐ Hesap planı eşlemesi — **n:1 evet, 1:n hayır**',
          aciklama:'İki eski hesap tek yeni hesapta **birleşebilir**. ' +
                   'Bir eski hesap iki yeni hesaba **bölünemez** — ' +
                   'eski bakiye hangi parçanın ne kadar olduğunu taşımaz.',
          cikti:'Eşleme tablosu', ok:'BP dönüşümü' },
        { ic:'👥', rol:'Danışman', baslik:'{{cvi}} — satıcı/müşteri → {{is-ortagi}}',
          aciklama:'⚠️ **Brownfield’de teknik dönüşümden ÖNCE**, hâlâ ECC üzerindeyken. ' +
                   'Projelerin en sık geciktiği adım; sebebi teknik değil **veri kalitesi**.',
          cikti:'{{BUT000}} kayıtları', ok:'yüklenir' },
        { ic:'⬆️', rol:'Danışman', baslik:'Ana veri → {{LTMC}} Migration Cockpit',
          aciklama:'Hazır nesneler, önceden eşli şablonlar ve ' +
                   '**yükleme öncesi simülasyon**. Kavramlar {{konu:lsmw}} ile aynı.',
          cikti:'Ana veri', ok:'bakiye gelir' },
        { ic:'⚖️', rol:'Muhasebe', baslik:'{{acilis-bakiyesi}} — geçiş hesabı karşılığında',
          aciklama:'G/L **toplu**, {{acik-kalem}} hesapları **tek tek**, ' +
                   'duran varlık {{AS91}} ile.\n\n' +
                   '⚠️ Gelir tablosu hesapları **taşınmaz** — bakiyeleri yoktur.',
          cikti:'Açılış belgeleri', ok:'prova' },
        { ic:'🎭', rol:'Proje ekibi', baslik:'⭐ {{deneme-gecisi}} — en az üç tur',
          aciklama:'**①** teknik (çalışıyor mu) · **②** iş (doğru mu) · ' +
                   '**③** tam prova (**süre tutuyor mu**).\n\n' +
                   'Provanın asıl çıktısı veri değil, **her adımın kaç dakika sürdüğüdür**.',
          cikti:'Ölçülmüş süreler', ok:'kesme planı yazılır' },
        { ic:'🗓️', rol:'Proje yöneticisi', baslik:'{{kesme-plani}} — dakika dakika',
          aciklama:'Dondur → çek → yükle → mutabakat → onay → aç.\n\n' +
                   '⚠️ En önemli satır en sonda: **geri dönüş kararı hangi saatte verilir?**',
          cikti:'Onaylı plan', ok:'geçiş' },
        { ic:'✅', rol:'Muhasebe', baslik:'⭐ Üç seviyeli mutabakat',
          aciklama:'**Teknik** (adet + tutar) → **muhasebe** (mizan aynı mı, ' +
                   'geçiş hesabı sıfır mı) → **yasal** (bilanço ve gelir tablosu ' +
                   'eski sistemle birebir mi).',
          cikti:'İmzalı mutabakat', ok:'açılış' },
        { ic:'🔒', rol:'BT', baslik:'⚠️ Eski sistem **okunabilir** bırakılır',
          aciklama:'Yasal saklama süresi boyunca erişilebilir kalmalıdır. ' +
                   'Türkiye’de {{e-defter}} ve {{berat}} yüklenmiş dönemler ' +
                   'ayrıca kanıtlanabilir olmalıdır.',
          cikti:'Salt okunur arşiv' },
      ],
    },

    adimlar:[
      { rol:'Mali işler', eylem:'⭐ Geçmiş kararı verilir', sistem:'Toplantı — sistemde değil' },
      { rol:'Danışman', eylem:'Basitleştirme listesi çalıştırılır', sistem:'{{basitlestirme-listesi}}' },
      { rol:'Veri sahibi', eylem:'Ana veri temizlenir', sistem:'Kaynak sistem' },
      { rol:'Danışman', eylem:'Hesap planı eşlemesi kurulur', sistem:'⚠️ n:1 · **1:n değil**' },
      { rol:'Danışman', eylem:'{{cvi}} dönüşümü', sistem:'⚠️ Dönüşümden **önce**' },
      { rol:'Danışman', eylem:'Ana veri yüklenir', sistem:'{{LTMC}} / {{LTMOM}}' },
      { rol:'Muhasebe', eylem:'Açılış bakiyeleri girilir', sistem:'{{FB01}} · {{AS91}}' },
      { rol:'Ekip', eylem:'Deneme geçişi × 3', sistem:'⭐ Süre **ölçülür**' },
      { rol:'Muhasebe', eylem:'Üç seviyeli mutabakat', sistem:'{{F.01}} · {{FS10N}} · {{FBL1N}}' },
      { rol:'Danışman', eylem:'Geçiş dönemi kapatılır', sistem:'{{OB52}}' },
    ],

    veriAkisi:{
      nereden:'Eski ERP (SAP ECC veya başka sistem) + elle hazırlanmış açılış tabloları.',
      nereye:'S/4HANA ana veri tabloları, {{BKPF}}/{{ACDOCA}}, {{ANLA}}/{{ANLC}}.',
      tetikleyen:'{{kesme-plani}}ndaki saat — geçiş elle başlatılır.',
      sonraki:'Üç seviyeli mutabakat → {{OB52}} ile dönem kapatma → canlı açılış.',
    },

    notlar:[
      { tip:'warn', baslik:'Yaklaşım kararı geri alınamaz — üç seçeneğin gerçek bedeli', metin:
        'Üç yaklaşım genelde "maliyet" üzerinden tartışılır. Asıl fark **maliyette değil, ' +
        'sonradan pişman olunacak yerdedir**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**{{greenfield}} — temiz başlangıç**\n\n' +
        '✅ Eski sistemin birikmiş hataları, ölü {{z-gelistirme}}leri ve bozuk verisi **gelmez**. ' +
        'Süreçler {{standarda-yakin}} kurulabilir.\n' +
        '⚠️ **Geçmiş gelmez.** Karşılaştırmalı gelir tablosu kendiliğinden oluşmaz. ' +
        'Kullanıcılar iki sisteme bakmak zorunda kalır.\n' +
        '→ *Pişmanlık noktası:* denetim ve yönetim raporlaması.\n\n' +
        '**{{brownfield}} — yerinde dönüşüm**\n\n' +
        '✅ Tarihçe gelir, kullanıcı alışkanlıkları korunur, kesme penceresi genelde kısadır.\n' +
        '⚠️ **Eski sistemin sorunları da gelir.** Yanlış kurulmuş hesap planı dönüşümden ' +
        'sonra da yanlıştır — üstelik artık **daha çok veriyle**.\n' +
        '⚠️ {{SPDD}}/{{SPAU}} yükü {{z-gelistirme}} sayısıyla doğru orantılıdır.\n' +
        '→ *Pişmanlık noktası:* "madem yeniliyorduk, neden aynı sorunlarla yaşıyoruz?"\n\n' +
        '**{{secici-gecis}} — ortası**\n\n' +
        '✅ Süreçler yenilenir **ve** seçilmiş tarihçe gelir.\n' +
        '⚠️ En pahalısı; üçüncü taraf araç ve uzmanlık ister.\n' +
        '→ *Pişmanlık noktası:* bütçe.\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Karar kuralı:** süreçlerinizden memnunsanız ve tarihçeye ihtiyacınız varsa ' +
        '**brownfield**; süreçlerinizi yenilemek istiyorsanız ve tarihçeyi eski sistemde ' +
        'tutabiliyorsanız **greenfield**. İkisi de olmuyorsa **seçici** — ve bunun bedeli vardır.' },

      { tip:'err', baslik:'⚠️ "Sonra taşırız" diye bir şey yoktur', metin:
        'Canlıya geçtikten sonra geçmiş veriyi eklemek **teknik olarak mümkün ama ' +
        'pratikte yapılamazdır**.\n\n' +
        'Sebebi tek cümlede: **yeni sistem artık kendi verisini üretiyor.**\n\n' +
        'Geçmişi sonradan yüklemek şunları gerektirir:\n\n' +
        '• Numara aralıklarının **çakışmaması** — canlı belgeler o aralıkları çoktan kullanmış olabilir\n' +
        '• Kapanmış dönemlerin **yeniden açılması** ({{OB52}}) — ve yeniden kapatılması\n' +
        '• Yüklenen geçmişin canlı bakiyelerle **çakışmaması** — açılış bakiyesi zaten o geçmişi içeriyor\n' +
        '• Türkiye’de: {{berat}} alınmış dönemlerin **yasal olarak kesinleşmiş** olması\n\n' +
        'Son madde tek başına yeterlidir: beratı alınmış bir döneme geriye dönük ' +
        'belge eklemek mevzuat sorunudur, teknik sorun değil.\n\n' +
        '⭐ **Bu yüzden geçmiş kararı bir {{tek-yonlu-kapi}}dır** ve ' +
        'proje başında, yazılı olarak verilir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Geçişin muhasebe tarafı **tek bir hesabın etrafında** kurulur: ' +
      'geçiş hesabı. Her açılış kaydının karşı tarafında o durur ve ' +
      'yükleme bitince **sıfırlanmak zorundadır**.\n\n' +
      'Aşağıdaki fişler bir {{greenfield}} geçişinin açılış kayıtlarıdır; ' +
      'hepsi **31.12.2027** tarihli ve geçiş için tanımlanmış ' +
      'özel bir {{belge-turu}} (`ZE`) kullanır.',

    etkilenenHesaplar:[
      { hesap:'⭐ 399 Geçiş hesabı', tur:'Geçici', neden:'Tüm açılışın karşı hesabı. **Sonunda sıfır olmalı.**' },
      { hesap:'100 / 102 / 153', tur:'Bilanço — Dönen varlık', neden:'Bakiye olarak **toplu** taşınır.' },
      { hesap:'253 / 257', tur:'Bilanço — Duran varlık', neden:'{{AS91}} ana veriyi açar; G/L tarafı **ayrı** fişle gelir.' },
      { hesap:'320 Satıcılar', tur:'Bilanço — Kaynak', neden:'{{acik-kalem}} — **her fatura ayrı belge**.' },
      { hesap:'120 Alıcılar', tur:'Bilanço — Varlık', neden:'{{acik-kalem}} — **her fatura ayrı belge**.' },
      { hesap:'⚠️ 600 / 770 (gelir tablosu)', tur:'Sonuç', neden:'**Taşınmaz.** Devreden bakiyeleri yoktur.' },
    ],

    fisler:[
      { baslik:'① Dönen varlık açılışı — **toplu bakiye**',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'100', ad:'Kasa', borc:185000 },
          { hesap:'102', ad:'Bankalar', borc:3240000 },
          { hesap:'153', ad:'Ticari mallar', borc:2760000 },
          { hesap:'399', ad:'Geçiş hesabı', alacak:6185000, not:'karşı hesap' },
        ],
        not:'{{acik-kalem}} yönetimi **olmayan** G/L hesaplarında bakiye yeterlidir; ' +
             'kalem taşımaya gerek yoktur.\n\n' +
             '⚠️ **İstisna:** açık kalem yönetimi **açık** olan G/L hesapları ' +
             '(GR/IR, geçici hesaplar) yine **tek tek** taşınır — ' +
             'yoksa {{F.13}} otomatik kapatma çalışamaz.' },

      { baslik:'② Açık satıcı kalemi — **tek tek**',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'399', ad:'Geçiş hesabı', borc:348000 },
          { hesap:'320', ad:'Satıcılar — ABC Ltd. (fatura 2027/4419)', alacak:348000,
            not:'vade 15.02.2028 · {{BSIK}} açık kalem' },
        ],
        not:'Her açık fatura **ayrı belge** olarak taşınır ve ' +
             '**vade tarihi ile {{odeme-kosulu}} korunur**.\n\n' +
             '⚠️ Toplu taşınırsa: {{F-53}} ödeme yapamaz (kapatılacak kalem yok), ' +
             '{{F110}} çalışmaz, {{F150}} ihtar üretemez, {{FBL1N}} dökümü anlamsız olur.\n\n' +
             '⭐ Referans alanına (`XBLNR`) **eski sistem belge numarası** yazılır — ' +
             'iki sistem arasındaki köprü budur.' },

      { baslik:'③ ⚠️ **YANLIŞ FİŞ** — gelir tablosu hesabı taşımak',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'399', ad:'Geçiş hesabı', borc:42600000 },
          { hesap:'600', ad:'Yurtiçi satışlar — 2027 cirosu', alacak:42600000,
            not:'⚠️ bu satır **olmamalıydı**' },
        ],
        not:'⚠️ **Bu fiş dengelidir, sistem kabul eder ve yine de yanlıştır.**\n\n' +
             'Denklik kontrolü tutar, hata mesajı çıkmaz — ' +
             '{{konu:error-handling}}’deki **② sessiz hata** sınıfının tam örneği.\n\n' +
             '**Neden yanlış:** gelir tablosu hesapları dönem sonunda ' +
             '**sıfırlanır** ({{bakiye-devri}}); devreden bakiyeleri yoktur. ' +
             'Böyle bir kayıt, 2027 cirosunu **2028’in açılışına** yazar.\n\n' +
             '**Sonucu:** 2028’in gelir tablosu daha ilk gününden ' +
             '42,6 milyon TL ciroyla başlar ve yıl boyunca yanlış kalır.\n\n' +
             '⭐ **Doğrusu:** 2027 cirosu yeni sisteme **taşınmaz**. ' +
             'Karşılaştırmalı tablo isteniyorsa çözüm bu fiş değil, ' +
             'yaklaşım kararıdır (bkz. §1 ve gerçek senaryo).' },

      { baslik:'④ Hesap planı bölme (1:n) — **kaynağa dönmeden yapılamaz**',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102.01', ad:'X Bankası — vadesiz', borc:1980000 },
          { hesap:'102.02', ad:'Y Bankası — vadesiz', borc:1260000 },
          { hesap:'399', ad:'Geçiş hesabı', alacak:3240000 },
        ],
        not:'Bu fiş, ①’deki tek `102` satırının yerine geçer.\n\n' +
             '⭐ **Konunun en pratik kuralı burada:**\n\n' +
             '**n:1 taşınabilir** — iki eski hesap tek yeni hesapta birleşiyorsa ' +
             'bakiyeler toplanır, iş biter. Otomatiktir.\n\n' +
             '⚠️ **1:n taşınamaz** — bir eski hesap iki yeni hesaba bölünüyorsa, ' +
             'eski bakiye **hangi parçanın ne kadar olduğunu taşımaz**. ' +
             'Yukarıdaki 1.980.000 ve 1.260.000 rakamları eski bakiyeden ' +
             '*çıkmaz*; banka ekstrelerinden elle çıkarılmıştır.\n\n' +
             '**Pratik sonuç:** bölme gerekiyorsa ya eski sistemde ' +
             '**geçişten önce** yapılır, ya da elle dağıtım için ' +
             '**ayrı bir veri kaynağı** bulunur. Eşleme tablosu bunu çözmez.' },

      { baslik:'⑤ Duran varlık devri — {{AS91}} muhasebe kaydı **üretmez**',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Tesis, makine ve cihazlar — edinim değeri', borc:12400000 },
          { hesap:'257', ad:'Birikmiş amortismanlar', alacak:4180000 },
          { hesap:'399', ad:'Geçiş hesabı — net defter değeri', alacak:8220000 },
        ],
        not:'⚠️ **İki ayrı iş, iki ayrı yer:**\n\n' +
             '**1.** {{AS91}} varlık ana verisini **birikmiş amortismanıyla birlikte** açar. ' +
             'Bu işlem {{ANLC}}’yi yazar ama **muhasebe kaydı üretmez**.\n' +
             '**2.** G/L tarafı bu fişle **ayrıca** atılır.\n\n' +
             '⭐ **İkisi tutmak zorundadır.** Tutmazsa varlık muhasebesi ile mizan ayrışır ' +
             've hata **geçişte değil, yıl sonunda** {{AJAB}} kapanışında ortaya çıkar — ' +
             'yani en pahalı yerde.\n\n' +
             'Kontrol basittir: {{AR01}} varlık listesi toplamı = `253` − `257` bakiyesi.\n\n' +
             '⚠️ **Amortisman başlangıç tarihi** de taşınmalıdır; ' +
             'yoksa {{AFAB}} kalan ömrü yanlış hesaplar ' +
             '(bkz. {{konu:asset-accounting}}).' },
    ],

    tHesaplar:[
      { hesap:'⭐ Geçiş hesabı — tüm yükleme bitince', kod:'399',
        borc:[
          { ad:'Satıcı açık kalemleri', tutar:8940000 },
          { ad:'Diğer kaynaklar ve özkaynak', tutar:13650000 },
        ],
        alacak:[
          { ad:'Dönen varlıklar', tutar:6185000 },
          { ad:'Müşteri açık kalemleri', tutar:8185000 },
          { ad:'Duran varlık net değeri', tutar:8220000 },
        ],
        not:'**Sıfır = yükleme tam.** Sıfır değilse eksik veya fazla var — başka açıklaması yok' },
    ],

    notlar:[
      { tip:'tip', baslik:'⭐ Üç seviyeli mutabakat — biri diğerinin yerine geçmez', metin:
        '{{konu:lsmw}}’de tek bir kontrol yeterliydi: geçiş hesabı sıfır mı? ' +
        'Geçişte **ölçek değişir** ve üç ayrı seviye gerekir. ' +
        'Üçü **farklı soruları** cevaplar:\n\n' +
        '━━━━━━━━━━\n\n' +
        '**① Teknik mutabakat — "yüklendi mi?"**\n\n' +
        'Gönderilen adet = oluşan adet · kaynak tutar toplamı = sistem tutar toplamı.\n' +
        'Adet tutup tutar tutmuyorsa → {{donusum-kurali}} hatası (ondalık ayracı, kur).\n' +
        '*Bunu veri geçişi ekibi yapar.*\n\n' +
        '**② Muhasebe mutabakatı — "doğru mu?"**\n\n' +
        'Geçiş hesabı **sıfır** · yeni mizan = eski mizan · ' +
        '{{FBL1N}} satıcı bakiyesi = {{FS10N}} `320` bakiyesi · ' +
        '{{AR01}} varlık toplamı = `253` − `257`.\n' +
        '*Bunu muhasebe yapar.*\n\n' +
        '**③ Yasal mutabakat — "sunulabilir mi?"**\n\n' +
        '{{F.01}} bilançosu eski sistemin bilançosuyla **birebir** aynı mı? ' +
        '⚠️ "Atanmamış hesaplar" satırı **sıfır mı**? ' +
        'Dolu ise mizan doğru olsa bile **sunum yanlıştır** ' +
        '(bkz. {{konu:reporting}}).\n' +
        '*Bunu denetçi sorar — o sormadan siz sorun.*\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Neden üçü de gerekli:** ① geçse de ② geçmeyebilir (doğru sayıda ' +
        'yanlış hesaba yüklenmiştir). ② geçse de ③ geçmeyebilir (bakiyeler doğru ' +
        'ama {{mali-tablo-yapisi}} eksiktir). ' +
        '**Her seviye bir öncekinin göremediği hatayı yakalar.**' },

      { tip:'warn', baslik:'Açılış tarihi ve dönem — sık atlanan ayrıntı', metin:
        'Açılış kayıtları geçiş yılından **bir gün önceye** atılır: ' +
        '2028 canlıya geçişinde **31.12.2027**.\n\n' +
        'Bunun üç sonucu var:\n\n' +
        '**1.** {{OB52}}’de **2027/12 dönemi açık** olmalıdır — ve yükleme bitince ' +
        '**kapatılmalıdır**. Açık kalırsa canlı kullanıcı yanlışlıkla geçmiş döneme kayıt atar.\n' +
        '**2.** {{FBN1}}’de geçiş belge türünün numara aralığı **2027 mali yılını** ' +
        'kapsamalıdır. 2028 aralığı tanımlayıp 31.12.2027 tarihli belge kesmeye ' +
        'çalışmak klasik bir hatadır.\n' +
        '**3.** Geçiş belgeleri için **ayrı {{belge-turu}}** tanımlanır. ' +
        'Yıllar sonra *"bu bakiye nereden geldi?"* sorusu ancak ' +
        '{{BKPF}}.`BLART` ile süzülerek cevaplanabilir.\n\n' +
        '⭐ Geçiş bitince o belge türüne kayıt yetkisi **kaldırılır** — ' +
        'böylece yanlışlıkla geçiş kaydı atılamaz.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Geçişte üç ayrı sınıflandırma vardır ve karıştırılmamalıdır: ' +
      '**yaklaşım** (geçmişle ne yapacağız), **veri sınıfı** (neyi taşıyoruz) ' +
      've **araç** (nasıl taşıyoruz).\n\n' +
      '⭐ Tartışmaların çoğu üçüncüsünde geçer ama riskin çoğu **birincisindedir**.',

    liste:[
      /* --- Yaklaşımlar --- */
      { ad:'🌱 {{greenfield}} — yeni kurulum', en:'New Implementation',
        aciklama:'Sistem sıfırdan kurulur; yalnızca ana veri, bakiye ve açık kalem taşınır.',
        neZaman:'Süreçler yenilenecekse ve tarihçe eski sistemde tutulabiliyorsa.',
        ornek:'**Ne gelir:** ana veri · {{acilis-bakiyesi}} · açık kalemler · duran varlık.\n\n' +
              '**Ne gelmez:** geçmiş yılların hareketleri · kapanmış kalemler · ' +
              '⚠️ **gelir tablosu geçmişi**.\n\n' +
              '⭐ **Gizli maliyet:** kullanıcılar bir süre **iki sisteme** bakar. ' +
              'Bu süre planlanmazsa "eski sistemi kapatamıyoruz" durumu kalıcılaşır.',
        tcodes:['LTMC'] },

      { ad:'🏗️ {{brownfield}} — sistem dönüşümü', en:'System Conversion',
        aciklama:'Mevcut ECC sistemi **yerinde** S/4HANA’ya dönüştürülür.',
        neZaman:'Süreçlerden memnunsanız ve tarihçe şart ise.',
        ornek:'**Üç zorunlu adım, sırası değişmez:**\n\n' +
              '**①** {{cvi}} — satıcı/müşteri → {{is-ortagi}} (⚠️ dönüşümden **önce**)\n' +
              '**②** Hesap planı hazırlığı — birincil {{masraf-turu}}leri G/L hesabına dönüşür\n' +
              '**③** Mali veri dönüşümü — {{BSEG}} + `FAGLFLEXA` + `COEP` → {{ACDOCA}}\n\n' +
              'Öncesinde {{basitlestirme-listesi}}, sırasında {{SPDD}} ve {{SPAU}}.\n\n' +
              '⚠️ **Üçüncü adım geri alınamaz.** Öncesinde tam yedek alınır ve ' +
              'geri dönüş **veritabanı geri yükleme** demektir.',
        tcodes:['SPDD','SPAU'] },

      { ad:'🎯 {{secici-gecis}} — seçici veri geçişi', en:'Selective Data Transition',
        aciklama:'Yeni sistem kurulur ama **seçilmiş** tarihçe taşınır.',
        neZaman:'Hem süreç yenileme hem tarihçe gerekiyorsa; bütçe varsa.',
        ornek:'Örnek kapsam: *"son 3 yılın FI belgeleri + tüm açık kalemler + ' +
              'yalnızca aktif şirket kodları"*.\n\n' +
              'Üçüncü taraf araç ve uzmanlık ister. Çok şirketli gruplarda ' +
              '**melez** kullanım yaygındır: bazı şirket kodları dönüştürülür, ' +
              'bazıları sıfırdan kurulur.\n\n' +
              'Alternatif bir köprü: {{merkezi-finans}} — kaynak sistemler yerinde kalır, ' +
              'yalnızca raporlama merkezîleşir.' },

      /* --- Veri sınıfları --- */
      { ad:'📇 Sınıf 1 · {{ana-veri}}', en:'Master Data',
        aciklama:'Satıcı, müşteri, G/L hesabı, varlık, malzeme.',
        neZaman:'Her yaklaşımda taşınır.',
        ornek:'Muhasebe kaydı **üretmez** — bu yüzden en düşük riskli sınıftır.\n\n' +
              '⚠️ Ama en çok **gecikme** buradan çıkar: veri kalitesi sorunları ' +
              '(mükerrer kayıt, eksik vergi numarası) burada patlar.\n\n' +
              '**Bağımlılık sırası kritiktir:** genel veri ({{LFA1}}) → ' +
              'şirket kodu verisi ({{LFB1}}) → sonra hareket. ' +
              'İkinci adım atlanırsa satıcı açılır ama **kayıt yapılamaz** — ' +
              '`AKONT` {{mutabakat-hesabi}} yoktur.',
        tcodes:['LTMC','XK01','FS00'] },

      { ad:'⚖️ Sınıf 2 · {{acilis-bakiyesi}}', en:'Opening Balances',
        aciklama:'Bakiyeler ve açık kalemler.',
        neZaman:'Her yaklaşımda; brownfield’de zaten yerinde durur.',
        ornek:'⚠️ **Muhasebe kaydı üretir** — en riskli sınıf budur.\n\n' +
              'Üç alt kural: G/L **toplu** · {{acik-kalem}} hesapları **tek tek** · ' +
              'duran varlık {{AS91}} ile ve **G/L tarafı ayrı**.\n\n' +
              '⭐ Kontrolü tek sayıdır: **geçiş hesabı sıfır mı?**',
        tcodes:['FB01','AS91'] },

      { ad:'📜 Sınıf 3 · Tarihçe', en:'Historical Data',
        aciklama:'Geçmiş yılların hareketleri, kapanmış kalemler, eski belgeler.',
        neZaman:'Yalnızca {{brownfield}} ve {{secici-gecis}}te.',
        ornek:'⭐ **Konunun asıl kararı bu sınıf yüzünden verilir.**\n\n' +
              'Taşınması pahalıdır çünkü yalnızca veri değil, **o dönemin ' +
              'yapılandırması** da gerekir: geçerli vergi oranları, o günkü ' +
              'hesap planı, o tarihteki kurlar.\n\n' +
              '⚠️ Türkiye’de ek bir katman var: {{berat}} alınmış dönemler ' +
              '**yasal olarak kesinleşmiştir**. O dönemlere ait belgelerin ' +
              'yeni sistemde farklı görünmesi bir mevzuat sorunudur.' },

      /* --- Araçlar --- */
      { ad:'🚚 {{LTMC}} Migration Cockpit — bugünün aracı', en:'Migration Cockpit',
        aciklama:'S/4HANA’nın standart veri geçişi aracı; {{LSMW}}’nin yerini aldı.',
        neZaman:'Yeni S/4HANA projelerinde **varsayılan**.',
        ornek:'**{{LSMW}}’ye göre üç kazanç:**\n\n' +
              '• **Hazır nesneler** — satıcı, müşteri, G/L hesabı, varlık, açık kalem\n' +
              '• **Önceden eşli şablon** — Excel sütunları SAP alanlarıyla eşli gelir, ' +
              '{{alan-esleme}} işinin çoğu ortadan kalkar\n' +
              '• ⭐ **Yükleme öncesi simülasyon** — hatalar veri yazılmadan görülür\n\n' +
              'Standart nesne yetmezse {{LTMOM}} ile alan eklenir ve kural yazılır.\n\n' +
              '⭐ **Kavramlar aynı kaldı:** {{alan-esleme}}, {{donusum-kurali}}, ' +
              'deneme çalıştırması, {{sayi-mutabakati}} — hepsi {{konu:lsmw}}’de öğrenildiği gibi.',
        tcodes:['LTMC','LTMOM'] },
    ],

    karsilastirmaBasliklar:['{{greenfield}}', '{{brownfield}}'],
    karsilastirma:[
      ['Sistem', 'Yeni kurulur', 'Yerinde dönüşür'],
      ['Tarihçe', '🚫 **Gelmez**', '✅ Gelir'],
      ['Karşılaştırmalı gelir tablosu', '⚠️ **Kendiliğinden oluşmaz**', '✅ Oluşur'],
      ['Eski hatalar', '✅ **Gelmez**', '⚠️ **Gelir**'],
      ['Süreç yenileme', '✅ Doğal fırsat', 'Ayrı proje gerekir'],
      ['{{z-gelistirme}} yükü', 'Sıfırdan seçilir', '⚠️ {{SPAU}} ile taşınır'],
      ['{{cvi}} dönüşümü', 'Gerekmez — {{is-ortagi}} zaten yeni', '⚠️ **Ön koşul**'],
      ['Kesme penceresi', 'Genelde uzun', 'Genelde kısa'],
      ['Kullanıcı alışkanlığı', 'Yeniden öğrenilir', 'Büyük ölçüde korunur'],
      ['Geri dönüş', 'Eski sistem çalışmaya devam eder', '⚠️ **Veritabanı geri yükleme**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    anlatim:
      'Geçişin işlem kodları üç öbekte toplanır: **taşıma** ({{LTMC}}), ' +
      '**varlık devri** ({{AS91}}) ve **dönüşüm** ({{SPDD}}/{{SPAU}}). ' +
      'Mutabakat ise yeni bir kod öğrenmeyi gerektirmez — ' +
      'zaten bildiğiniz raporlarla yapılır.',

    liste:[
      { kod:'LTMC', ad:'Migration Cockpit — veri geçişi',
        amac:'Hazır nesneler ve önceden eşli şablonlarla veri yükler; yüklemeden önce **simüle eder**.',
        neZaman:'Her S/4HANA veri geçişinde. {{LSMW}} yerine.',
        adimlar:[
          { baslik:'Geçiş projesi oluştur',
            aciklama:'Hedef sistem ve aktarım yöntemi (dosya / hazırlama tablosu) seçilir.' },
          { baslik:'Geçiş **nesnesini** seç',
            aciklama:'Satıcı, müşteri, G/L hesabı, varlık, açık kalem… her biri hazır gelir.' },
          { baslik:'⭐ **Şablonu indir** — sütunlar önceden eşli',
            aciklama:'{{konu:lsmw}}’deki "adım 6" işinin büyük kısmı burada ortadan kalkar.' },
          { baslik:'Doldur ve yükle',
            aciklama:'⚠️ Sütunları **metin** biçiminde tut — sola sıfır dolgu kaybolmasın.' },
          { baslik:'Eşle — yalnızca **çözülemeyen** değerler',
            aciklama:'Eski koddan SAP koduna eşleme (ödeme koşulu, ülke) burada istenir.' },
          { baslik:'⭐ **Simüle et** — veri yazılmadan hataları gör',
            aciklama:'LSMW’de olmayan adım; ilk hata listesi veri temizliğinin iş planıdır.' },
          { baslik:'Yükle ve **mutabakat yap**',
            aciklama:'Adet **ve** tutar. Ardından geçiş hesabı sıfır mı?' },
        ],
        ekranAkisi:[
          { ekran:'Proje', islem:'*"S4 Geçiş 2028"* projesi açıldı, dosya yöntemi seçildi' },
          { ekran:'Nesne', islem:'*"Satıcı"* nesnesi eklendi → şablon indirildi (**41 sütun**)' },
          { ekran:'Doldurma', islem:'12.000 satır dolduruldu' },
          { ekran:'Simülasyon', islem:'⚠️ **847 hata**: 340 vergi no eksik · 89 ülke kodu geçersiz · 418 ödeme koşulu eşlenmemiş' },
          { ekran:'Eşleme', islem:'418 kayıt için eşleme tablosu dolduruldu → hata **429**’a düştü' },
          { ekran:'Temizlik', islem:'Kalan 429 kayıt **iş tarafına** gitti — danışman düzeltmez' },
          { ekran:'Yükleme', islem:'11.571 satıcı yüklendi · 429’u ikinci turda' },
        ],
        alanlar:{
          zorunlu:['Proje','Geçiş nesnesi','Kaynak dosya'],
          opsiyonel:['Eşleme değerleri','Alan genişletmesi ({{LTMOM}})'] },
        hatalar:[
          { mesaj:'"Değer eşlenmemiş" uyarısı yüzlerce satırda', sebep:'Eski sistemdeki kodun SAP karşılığı tanımlı değil.', cozum:'Eşleme adımında toplu doldurulur; karşılığı gerçekten yoksa **SAP’ta tanımlanır**. "Boş bırak" kararı {{konu:lsmw}}’deki `ZWELS` tuzağını doğurur.' },
          { mesaj:'Simülasyon temiz ama yükleme hata verdi', sebep:'Simülasyon **kilit ve numara aralığı** durumunu tam öngöremez.', cozum:'{{KANK}} / {{FBN1}} aralıkları kontrol edilir; {{kilitleme}} için yükleme paralelliği düşürülür.' },
          { mesaj:'Hesap numarası "bulunamadı" ama hesap var', sebep:'⚠️ **Sola sıfır dolgu** — Excel baştaki sıfırları atmış.', cozum:'Sütun **metin** biçiminde tutulur ({{donusum-kurali}}).' },
          { mesaj:'Şablonda ihtiyacım olan alan yok', sebep:'Standart nesne o alanı kapsamıyor.', cozum:'{{LTMOM}} ile nesne genişletilir. ⚠️ Genişletilen nesne artık **sizin bakımınızdadır**.' },
        ],
        ipucu:'⭐ **Simülasyon adımını bir kez değil, veri her güncellendiğinde çalıştır.** ' +
              'Simülasyon ücretsizdir ve veri yazmaz; tek maliyeti zamandır.\n\n' +
              'Bu, {{konu:lsmw}}’deki *"önce 10–20 satırla dene"* tavsiyesinin ' +
              'araç tarafından **hazır verilmiş** hâlidir.',
        ilgili:['LTMOM','LSMW','AS91'] },

      { kod:'AS91', ad:'Devir varlığı oluştur',
        amac:'Geçişte varlığı **birikmiş amortismanıyla birlikte** açar.',
        neZaman:'Duran varlık devrinde; normal {{AS01}} yerine.',
        adimlar:[
          { baslik:'Varlık sınıfı ve şirket kodu ile başla' },
          { baslik:'Ana veriyi gir — ⚠️ **amortisman başlangıç tarihi dahil**',
            aciklama:'Yoksa {{AFAB}} kalan ömrü yanlış hesaplar.' },
          { baslik:'Devir değerlerini gir: edinim değeri + birikmiş amortisman',
            aciklama:'Her {{amortisman-alani}} için ayrı ayrı — yerel ve {{ifrs}} farklı olabilir.' },
          { baslik:'⚠️ G/L tarafını **ayrıca** kaydet',
            aciklama:'{{AS91}} muhasebe kaydı üretmez; `253`/`257` fişi elle atılır.' },
          { baslik:'⭐ Mutabakat: {{AR01}} toplamı = `253` − `257`' },
        ],
        ekranAkisi:[
          { ekran:'Ana veri', islem:'1.847 varlık {{LTMC}} ile toplu açıldı' },
          { ekran:'Devir değerleri', islem:'Edinim 12.400.000 · birikmiş amortisman 4.180.000' },
          { ekran:'G/L fişi', islem:'253 borç / 257 + 399 alacak — **ayrı belge**' },
          { ekran:'Mutabakat', islem:'{{AR01}} net 8.220.000 = mizan `253`−`257` ✓' },
          { ekran:'İlk {{AFAB}}', islem:'⚠️ Ocak 2028 amortismanı **beklenen** tutarla karşılaştırıldı' },
        ],
        alanlar:{
          zorunlu:['Varlık sınıfı','Şirket kodu','Edinim değeri','Birikmiş amortisman','Amortisman başlangıcı'],
          opsiyonel:['Envanter numarası','Maliyet yeri','Seri numarası'] },
        hatalar:[
          { mesaj:'Amortisman ilk ayda beklenenden yüksek/düşük', sebep:'Amortisman başlangıç tarihi veya kalan ömür yanlış taşınmış.', cozum:'{{AS02}}’de düzeltilir. ⭐ Geçişten sonraki **ilk {{AFAB}}** mutlaka elle kontrol edilir.' },
          { mesaj:'{{AJAB}} yıl sonu kapanışı hata veriyor', sebep:'Varlık muhasebesi ile G/L ayrışmış.', cozum:'{{AR01}} ile mizan karşılaştırılır. Ayrışmanın sebebi genelde ⑤ numaralı G/L fişinin **unutulması** veya iki kez atılmasıdır.' },
          { mesaj:'"Varlık sınıfı için hesap belirleme yok"', sebep:'{{AO90}} ataması eksik.', cozum:'Varlık sınıfı yapılandırması tamamlanır (bkz. {{konu:asset-accounting}}).' },
        ],
        ipucu:'⭐ **Geçişten sonraki ilk amortisman koşusu bir testtir, rutin değil.** ' +
              'Beklenen tutar geçişten önce hesaplanır ve {{AFAB}} sonucuyla ' +
              'karşılaştırılır. Fark varsa sebep neredeyse her zaman ' +
              '**amortisman başlangıç tarihi** veya **kalan ömürdür**.',
        ilgili:['AS01','AFAB','AR01','AJAB'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Geçişte tablo bilgisi iki işe yarar: **mutabakat** (yüklenen veri ' +
      'gerçekten orada mı) ve **teşhis** (neden olmadı). ' +
      'Yeni bir tablo öğrenmek gerekmez — ' +
      'bilinen tablolara **geçiş gözüyle** bakmak yeter.',

    liste:[
      { ad:'BKPF', baslik:'⭐ Geçiş belgelerini ayırt etmenin tek yolu',
        tutar:'Belge başlığı — `BLART` ile geçiş kayıtları süzülür.',
        olusturan:'Açılış bakiyesi yüklemesi',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'Kalemler {{ACDOCA}}’da.',
        s4:'Duruyor; kalemler {{ACDOCA}}’ya taşındı.',
        alanlar:[
          { ad:'BLART', aciklama:'⭐ **Geçiş için ayrı belge türü** — sonradan ayırt etmenin tek yolu' },
          { ad:'XBLNR', aciklama:'Referans — **eski sistem belge numarası** buraya yazılır' },
          { ad:'BUDAT', aciklama:'Kayıt tarihi — geçişte **31.12.2027**' },
          { ad:'BKTXT', aciklama:'Başlık metni — *"Açılış bakiyesi 2027"*' },
        ] },

      { ad:'BUT000', baslik:'CVI dönüşümünün hedefi',
        tutar:'{{is-ortagi}} genel verisi.',
        olusturan:'{{cvi}} dönüşümü veya {{BP}}',
        anahtar:'PARTNER',
        iliskiler:'Şirket kodu verisi hâlâ {{LFB1}} / {{KNB1}}’de.',
        s4:'**Zorunlu.** Dönüşüm tamamlanmadan S/4HANA’ya geçilemez.',
        alanlar:[
          { ad:'PARTNER', aciklama:'İş ortağı numarası — ⚠️ satıcı numarasıyla **aynı olmak zorunda değil**' },
          { ad:'TYPE', aciklama:'Kişi / Kuruluş / Grup' },
          { ad:'NAME_ORG1', aciklama:'Unvan — mükerrer tespitinde kullanılan alan' },
        ] },

      { ad:'LFB1', baslik:'⚠️ Ayrı yüklenmesi gereken şirket kodu verisi',
        tutar:'Satıcının şirket kodu bazlı verisi.',
        olusturan:'Ayrı bir yükleme adımı',
        anahtar:'LIFNR + BUKRS',
        iliskiler:'{{LFA1}} genel veriye bağlı; S/4’te kimlik {{BUT000}}’de.',
        s4:'Duruyor — {{is-ortagi}} bunu **kaldırmadı**.',
        alanlar:[
          { ad:'AKONT', aciklama:'⭐ **{{mutabakat-hesabi}}** — eksikse satıcıya kayıt yapılamaz' },
          { ad:'ZTERM', aciklama:'{{odeme-kosulu}} — ⚠️ SAP’ta tanımlı olmalı' },
          { ad:'ZWELS', aciklama:'⚠️ {{odeme-yontemi}} — boşsa {{F110}} kalemi **öneriye almaz ve hata vermez**' },
        ] },

      { ad:'ANLC', baslik:'Varlık değerleri — mutabakatın diğer ucu',
        tutar:'Varlık bazında yıllık değerler ve birikmiş amortisman.',
        olusturan:'{{AS91}} devir varlığı',
        anahtar:'BUKRS + ANLN1 + ANLN2 + GJAHR + AFABE',
        iliskiler:'{{ANLA}} ana veriye bağlı.',
        s4:'Duruyor; hesaplanan değerler {{ACDOCA}}’dan da üretilebilir.',
        alanlar:[
          { ad:'KANSW', aciklama:'Edinim değeri — mizandaki `253` ile eşleşmeli' },
          { ad:'KNAFA', aciklama:'Birikmiş amortisman — mizandaki `257` ile eşleşmeli' },
          { ad:'AFABE', aciklama:'{{amortisman-alani}} — her alan **ayrı satır**' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Yükleme sırası — bağımlılık zinciri',
      varliklar:[
        { ad:'BUT000', rol:'1. adım', hub:true, aciklama:'**{{is-ortagi}}** — kimlik önce açılır',
          alanlar:[{ ad:'PARTNER', tip:'pk' }, { ad:'TYPE' }] },
        { ad:'LFA1', rol:'2. adım', aciklama:'Satıcı **genel** verisi',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'STCD1' }] },
        { ad:'LFB1', rol:'3. adım', aciklama:'⚠️ **Şirket kodu verisi** — ayrı yükleme',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }] },
        { ad:'BKPF', rol:'4. adım', aciklama:'**Açılış belgesi** — ana veri hazır olmalı',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'XBLNR' }] },
        { ad:'ACDOCA', rol:'Sonuç', aciklama:'Kalemler ve **açık kalemler**',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'HSL' }] },
        { ad:'ANLC', rol:'Paralel', aciklama:'{{AS91}} varlık değerleri — **G/L ile mutabık olmalı**',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'KANSW' }, { ad:'KNAFA' }] },
      ],
      iliskiler:[
        { from:'BUT000', to:'LFA1', alanlar:'PARTNER', not:'{{cvi}} eşlemesi' },
        { from:'LFA1', to:'LFB1', alanlar:'LIFNR', not:'⚠️ **ayrı yükleme adımı**' },
        { from:'LFB1', to:'BKPF', alanlar:'—', not:'ana veri **önce** olmalı' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'kalemler oluşur' },
        { from:'ANLC', to:'ACDOCA', alanlar:'—', not:'⭐ **mutabık olmalı**' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Üç ekran, üç ayrı iş: **{{LTMC}}** yükler, **{{AS91}}** varlığı devreder, ' +
      '**{{OB52}}** geçiş dönemini açar ve kapatır. ' +
      'Mutabakat ekranları yeni değildir — {{F.01}}, {{FS10N}}, {{FBL1N}}, {{AR01}}.',

    ekranlar:[
      { ad:'{{LTMC}} — Migration Cockpit',
        aciklama:'Proje → nesne → şablon → simülasyon → yükleme.',
        alanlar:[
          { ad:'Geçiş nesnesi', zorunlu:true, aciklama:'Hazır listeden seçilir; ' +
                   'yoksa {{LTMOM}} ile genişletilir.' },
          { ad:'⭐ **Simülasyon**', zorunlu:false, aciklama:'Veri yazmadan hataları gösterir. ' +
                   'Opsiyonel görünür, **pratikte zorunludur**.' },
          { ad:'Eşleme değerleri', zorunlu:false, aciklama:'Eski kod → SAP kodu. ' +
                   '⚠️ "Boş bırak" kararı yazılı ve onaylı olmalı.' },
        ],
        ipucu:'Simülasyon her veri güncellemesinde yeniden çalıştırılır — ' +
              'ücretsizdir ve veri yazmaz.' },

      { ad:'{{AS91}} — devir varlığı',
        aciklama:'Varlığı geçmiş değerleriyle açar.',
        alanlar:[
          { ad:'⚠️ **Amortisman başlangıcı**', zorunlu:true, aciklama:'Taşınmazsa kalan ömür ' +
                   'yanlış hesaplanır ve ilk {{AFAB}}’ta ortaya çıkar.' },
          { ad:'Devir değerleri', zorunlu:true, aciklama:'Her {{amortisman-alani}} için **ayrı**.' },
          { ad:'G/L fişi', zorunlu:true, aciklama:'⚠️ Bu ekranda **değil** — ayrıca kaydedilir.' },
        ],
        ipucu:'{{AS91}} ana veri işlemidir, muhasebe işlemi değil. ' +
              'İki tarafın tutması **elle sağlanır**.' },

      { ad:'{{OB52}} — geçiş dönemi',
        aciklama:'Açılış kayıtları için 2027/12 açılır, sonra kapatılır.',
        alanlar:[
          { ad:'Dönem aralığı', zorunlu:true, aciklama:'Yükleme sırasında açık, ' +
                   'bitince **kapalı**.' },
          { ad:'Hesap tipi', zorunlu:true, aciklama:'`+` satırının önceliği vardır ' +
                   '(bkz. {{konu:closing}}).' },
        ],
        ipucu:'⚠️ Geçiş dönemi açık kalırsa canlı kullanıcı yanlışlıkla ' +
              '**geçmiş döneme** kayıt atar ve bu ancak kapanışta fark edilir.' },
    ],

    zorunlu:['Yaklaşım kararı','Hesap planı eşlemesi','Temiz ana veri','Geçiş belge türü'],
    opsiyonel:['Seçilmiş tarihçe','{{LTMOM}} alan genişletmesi','Arşiv çözümü'],

    hatalar:[
      { mesaj:'Satıcı açıldı ama kayıt yapılamıyor', sebep:'{{LFB1}} (şirket kodu verisi) yüklenmemiş.', cozum:'⚠️ **Ayrı bir yükleme adımıdır.** `AKONT` {{mutabakat-hesabi}} zorunludur.' },
      { mesaj:'"Dönem kapalı" — açılış kaydı geçmiyor', sebep:'{{OB52}}’de 2027/12 kapalı.', cozum:'Geçici olarak açılır; **yükleme bitince kapatılır**.' },
      { mesaj:'"Numara aralığı yok" — 31.12.2027 belgesi', sebep:'{{FBN1}} aralığı yalnızca 2028 mali yılını kapsıyor.', cozum:'Geçiş belge türü için **2027** aralığı tanımlanır.' },
      { mesaj:'Mizan tutuyor ama {{F.01}} bilançosu tutmuyor', sebep:'⚠️ **"Atanmamış hesaplar"** satırı dolu — yeni hesap {{mali-tablo-yapisi}}na eklenmemiş.', cozum:'{{OB58}}’de aralık ataması yapılır (bkz. {{konu:reporting}}).' },
      { mesaj:'{{AJAB}} yıl sonu kapanışı hata veriyor', sebep:'Varlık muhasebesi ile G/L ayrışmış.', cozum:'{{AR01}} toplamı `253`−`257` ile karşılaştırılır; G/L fişi unutulmuş veya iki kez atılmış olabilir.' },
      { mesaj:'CVI dönüşümü binlerce hatayla duruyor', sebep:'Veri kalitesi — mükerrer kayıt, eksik vergi numarası.', cozum:'⚠️ Bu **danışman işi değildir**. Liste veri sahibine gider; dönüşüm temizlik bitene kadar bekler.' },
      { mesaj:'Yükleme çok yavaş / {{kilitleme}} çakışması', sebep:'Paralel işler aynı ana veriye dokunuyor.', cozum:'Bölme ölçütü satır numarası değil **kilitlenen nesne** olmalı (bkz. {{konu:data-upload}}).' },
      { mesaj:'İlk {{AFAB}} beklenenden farklı', sebep:'Amortisman başlangıç tarihi veya kalan ömür yanlış.', cozum:'{{AS02}} ile düzeltilir. Geçiş sonrası ilk koşu **elle kontrol edilir**.' },
    ],

    ipuclari:[
      '⭐ **Geçmiş kararını proje başında yazılı al** — sonradan taşınamaz.',
      '⭐ Hesap planı eşlemesinde **n:1 evet, 1:n hayır**; bölme kaynağa dönmeyi gerektirir.',
      '{{cvi}} dönüşümünü brownfield’de **teknik dönüşümden önce** bitir.',
      'Veri temizliğinin iş planı **ilk simülasyonun hata listesidir** — erken çalıştır.',
      '⚠️ Gelir tablosu hesaplarını **taşıma**; bakiyeleri yoktur.',
      'Açık kalem hesapları **tek tek**, vade ve ödeme koşuluyla.',
      '{{AS91}} muhasebe kaydı üretmez — G/L fişini **unutma**.',
      '⭐ {{deneme-gecisi}}nde **süreleri ölç**; kesme penceresi ölçümle planlanır.',
      'Geçiş için **ayrı {{belge-turu}}** ve **ayrı numara aralığı** tanımla.',
      '⭐ Üç seviyeli mutabakat yap: teknik → muhasebe → **yasal**.',
      'Yükleme bitince geçiş dönemini {{OB52}}’de **kapat**.',
      '⚠️ Eski sistemi **kapatma** — yasal saklama süresince okunabilir kalmalı.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BUT000', ne:'{{is-ortagi}} — **1. adım**' },
      { tablo:'LFA1', ne:'Satıcı genel verisi' },
      { tablo:'LFB1', ne:'⚠️ Şirket kodu verisi — **ayrı yükleme**' },
      { tablo:'BKPF', ne:'Açılış belgeleri — ayrı `BLART` ile' },
      { tablo:'ACDOCA', ne:'Açılış kalemleri' },
      { tablo:'ANLC', ne:'{{AS91}} devir varlık değerleri' },
    ],

    commit:
      '{{LTMC}} yüklemesi **nesne bazında** commit eder: bir satıcı ya tam açılır ' +
      'ya hiç açılmaz. Bu, {{konu:data-upload}}’daki **belge bütünlüğü** ilkesinin ' +
      'araç tarafından uygulanmış hâlidir.\n\n' +
      '⚠️ Ama açılış **belgeleri** için aynı garanti yoktur: çok satırlı bir ' +
      'açılış fişi yüklenirken {{guncelleme-hatasi}} olursa belge numarası ' +
      'verilmiş ama belge oluşmamış olabilir.\n\n' +
      '⭐ Bu yüzden yükleme sonrası **{{SM13}} kontrolü** mutabakatın parçasıdır — ' +
      'adet mutabakatı bunu yakalar ama sebebini söylemez.',

    belgeNo:
      '⚠️ **Geçiş belgeleri için ayrı {{belge-turu}} ve ayrı numara aralığı** tanımlanır.\n\n' +
      'Üç sebep:\n\n' +
      '**1. Denetlenebilirlik.** Yıllar sonra *"bu bakiye nereden geldi?"* sorusu ' +
      '{{BKPF}}.`BLART` ile süzülerek cevaplanır.\n' +
      '**2. Ayrıştırılabilirlik.** Geçiş kayıtları normal işlemlerle karışmaz; ' +
      'raporlarda dışlanabilirler.\n' +
      '**3. Kapatılabilirlik.** Geçiş bitince o belge türüne kayıt yetkisi ' +
      '**kaldırılır**.\n\n' +
      '⚠️ **Sık atlanan ayrıntı:** aralık **2027 mali yılını** kapsamalıdır. ' +
      'Açılış belgeleri 31.12.2027 tarihlidir; 2028 aralığı işe yaramaz.',

    postingLogic:
      'Yükleme sırası **bağımlılık zinciridir** ve bozulursa yükleme durur:\n\n' +
      '**1. {{ozellestirme}}** — hesap planı, belge türleri, {{odeme-kosulu}}, ' +
      'vergi kodları, {{degerleme-plani}}. ⚠️ Eksikse ana veri **yüklenemez**.\n' +
      '**2. {{is-ortagi}}** — {{cvi}} dönüşümü veya doğrudan {{BP}}\n' +
      '**3. Ana veri — genel** ({{LFA1}}, {{KNA1}}, {{SKA1}})\n' +
      '**4. Ana veri — şirket kodu** ({{LFB1}}, {{KNB1}}, {{SKB1}}) ⚠️ **ayrı adım**\n' +
      '**5. Duran varlık ana verisi** ({{AS91}})\n' +
      '**6. Açılış bakiyeleri** — G/L toplu, açık kalemler tek tek\n' +
      '**7. Mutabakat** — üç seviye\n\n' +
      '⚠️ **En sık atlanan: 4. adım.** Satıcı açılır, {{LFB1}} yüklenmez, ' +
      '*"satıcıya kayıt yapılamıyor"* denir. Sebep: `AKONT` yok.',

    belgeTuru:
      'Geçiş için özel belge türü (örn. `ZE` — *Eski sistem devri*) tanımlanır. ' +
      '{{OBA7}} ile açılır, {{FBN1}} ile numara aralığı verilir.\n\n' +
      '⭐ Ayrıca bir alan bilinçli kullanılır: **`XBLNR` referansına eski sistem ' +
      'belge numarası** yazılır. Bu, iki sistem arasındaki tek köprüdür ve ' +
      'mutabakatta, denetimde ve yıllar sonraki sorgularda kullanılır.\n\n' +
      '⚠️ Doldurulmazsa geri dönüşü yoktur: yüklenmiş bir belgeye sonradan ' +
      'referans yazılamaz.',

    numberRange:
      '{{FBN1}} ile geçiş belge türüne aralık tanımlanır. İki tuzak:\n\n' +
      '**1. Mali yıl.** Aralık **2027**’yi kapsamalıdır.\n' +
      '**2. Çakışma.** Aralık, canlıda kullanılacak aralıklarla **kesişmemelidir**. ' +
      'Kesişirse ileride *"belge numarası zaten var"* hatası çıkar ve ' +
      'düzeltmesi zordur.\n\n' +
      'Aynı dikkat CO tarafında da gerekir: {{KANK}} aralığı eksikse ' +
      'FI kaydı bile durur (bkz. {{konu:co-integration}}).',

    accountDetermination:
      'Geçiş yüklemesi hesap belirlemeyi doğrudan tetiklemez ama ' +
      '**beslediği** alanlar sonradan her kayıtta kullanılır:\n\n' +
      '⭐ En kritiği {{LFB1}}.`AKONT` {{mutabakat-hesabi}}dır. ' +
      'Yanlış yüklenirse **tüm satıcı kayıtları yanlış hesaba** gider.\n\n' +
      '⚠️ Ve bu bir {{tek-yonlu-kapi}}ya yakındır: mutabakat hesabı sonradan ' +
      'değiştirilse bile **geçmiş kayıtlar eski hesapta kalır**. ' +
      'Düzeltme, hesaplar arası aktarım kaydı gerektirir.\n\n' +
      'Bu yüzden `AKONT`, yükleme öncesi **elle doğrulanması gereken** ' +
      'az sayıdaki alandan biridir.',

    tur:
      '**Üç yaklaşım, üç teknik yol:**\n\n' +
      '**{{greenfield}}** — yeni kurulum + {{LTMC}} yüklemesi. ' +
      'Teknik olarak en basit, karar olarak en zor.\n\n' +
      '**{{brownfield}}** — yerinde dönüşüm. {{basitlestirme-listesi}} → ' +
      '{{cvi}} → hesap planı hazırlığı → mali veri dönüşümü → {{SPDD}}/{{SPAU}}. ' +
      '⚠️ Mali veri dönüşümü **geri alınamaz**.\n\n' +
      '**{{secici-gecis}}** — üçüncü taraf araç; SAP standardı dışındadır ' +
      've desteği ayrı bir sözleşme konusudur.',

    transport:
      '⚠️ Geçişte **iki ayrı taşıma** vardır ve karıştırılır:\n\n' +
      '**1. Yapılandırma taşıması** — {{tasima-istegi}} ile. ' +
      'Hesap planı, belge türleri, vergi kodları geliştirme sisteminden gelir.\n\n' +
      '**2. Veri taşıması** — {{LTMC}} projesi ve kaynak dosyalar. ' +
      'Bunlar taşıma isteğiyle **gitmez**; her sistemde ayrıca kurulur.\n\n' +
      '⭐ **Kritik nokta:** yükleme yapılacak sistemde yapılandırma ' +
      '**tam olmalıdır**. Test sisteminde çalışan bir yükleme, canlıda ' +
      'eksik bir vergi kodu yüzünden durabilir — çünkü o kod ' +
      'henüz taşınmamıştır. Bu, {{tasima-sirasi}} disiplininin ' +
      'geçişteki karşılığıdır (bkz. {{konu:best-practices}}).',

    img:[
      { yol:'OBA7 → Geçiş için özel belge türü', not:'⭐ Sonradan süzebilmek için' },
      { yol:'FBN1 → Geçiş belge türü numara aralığı', not:'⚠️ **2027 mali yılını** kapsamalı' },
      { yol:'OB52 → Geçiş dönemi', not:'Yükleme sırasında açık, sonra **kapatılır**' },
      { yol:'OB58 → Mali tablo yapısı', not:'⚠️ Yeni hesaplar atanmazsa bilanço eksik çıkar' },
    ],

    ekstra:[
      { ic:'🚪', baslik:'⭐ Neden "sonra taşırız" mümkün değil — dört engel', metin:
        'Geçmişi canlıya geçtikten sonra eklemek teknik olarak mümkündür. ' +
        'Pratikte yapılamamasının **dört ayrı sebebi** vardır ve ' +
        'her biri tek başına yeterlidir:\n\n' +
        '━━━━━━━━━━\n\n' +
        '**1. Numara aralıkları tükenmiştir.**\n' +
        'Canlı sistem geçişten beri belge üretiyor. Geçmiş belgeleri ' +
        'yüklemek için gereken aralık ya kullanılmıştır ya da ' +
        'yeni bir aralık gerekir — ki bu da eski numaraların ' +
        '**korunamayacağı** anlamına gelir.\n\n' +
        '**2. Dönemler kapanmıştır.**\n' +
        'Yükleme için {{OB52}}’de geçmiş dönemler yeniden açılır. ' +
        'Bu, canlı sistemde **herkese açık bir kapı** demektir; ' +
        'yükleme süresince yanlış döneme kayıt riski doğar.\n\n' +
        '**3. Bakiyeler çakışır.**\n' +
        'Açılış bakiyesi zaten o geçmişin **sonucudur**. ' +
        'Geçmişi de yüklerseniz aynı tutar **iki kez** sisteme girer: ' +
        'bir kez özet (açılış), bir kez ayrıntı (hareketler). ' +
        'Açılış kayıtlarının ters kaydedilmesi gerekir — ' +
        'ki bu da mizanı geçici olarak bozar.\n\n' +
        '**4. ⚠️ Türkiye’de dönem yasal olarak kesinleşmiştir.**\n' +
        '{{berat}} alınmış bir döneme geriye dönük belge eklemek ' +
        'teknik bir işlem değil, **mevzuat sorunudur** ' +
        '(bkz. {{konu:e-donusum}}).\n\n' +
        '━━━━━━━━━━\n\n' +
        '⭐ **Sonuç:** geçmiş kararı bir {{tek-yonlu-kapi}}dır. ' +
        'Proje başında, yazılı olarak, mali işlerin imzasıyla verilir.' },

      { ic:'🔍', baslik:'Eski sistem neden kapatılmaz — ve "kapatmak" ne demek', metin:
        'Geçişten sonra en sık sorulan soru: *"eski sistemi ne zaman kapatabiliriz?"*\n\n' +
        'Cevap genelde beklenenden **çok daha geçtir** ve sebebi ' +
        'lisans maliyeti değil **yasal saklamadır**.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Üç seçenek ve gerçek maliyetleri:**\n\n' +
        '**① Sistemi ayakta tut** — en kolay, en pahalı. ' +
        'Lisans, donanım, yedekleme ve **bilgi** maliyeti: ' +
        'birkaç yıl sonra o sistemi kullanmayı bilen kimse kalmaz.\n\n' +
        '**② Salt okunur bırak** — kullanıcıları kaldır, birkaç kişiye ' +
        'görüntüleme yetkisi ver. Ucuzlar ama sistem hâlâ ayaktadır.\n\n' +
        '**③ Arşiv çözümü** — veri sistem dışına çıkarılır ve ' +
        'sorgulanabilir biçimde saklanır. En ucuzu ama **kurulumu ' +
        'geçiş projesinin parçası olmalıdır**; sonradan yapılırsa ' +
        'eski sistemi yeniden ayağa kaldırmak gerekir.\n\n' +
        '━━━━━━━━━━\n\n' +
        '⚠️ **Türkiye’ye özgü ek yük:** {{e-defter}} ve {{berat}} kayıtları ' +
        'saklama süresi boyunca **kanıtlanabilir** olmalıdır. ' +
        'Bu, ekran görüntüsü veya Excel dökümüyle karşılanmaz.\n\n' +
        '⭐ **Karar geçişten önce verilir** — çünkü ③ seçeneği ' +
        'ancak o zaman ucuzdur.' },

      { ic:'📐', baslik:'n:1 ve 1:n — eşleme matematiği', metin:
        'Hesap planı eşlemesi bir **fonksiyondur**: her eski hesap ' +
        'bir yeni hesaba gider. Fonksiyonun yönü, işin yapılabilirliğini belirler.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**n:1 — birleştirme. ✅ Otomatik.**\n\n' +
        '`320.01` (yurtiçi satıcılar) + `320.02` (yurtdışı satıcılar) → `320`\n\n' +
        'Bakiyeler toplanır, iş biter. Bilgi **kaybolur** ama ' +
        'kayıp bilinçlidir ve zaten istenmiştir.\n\n' +
        '**1:n — bölme. 🚫 Otomatik değil.**\n\n' +
        '`102` (bankalar) → `102.01` (X Bankası) + `102.02` (Y Bankası)\n\n' +
        'Eski bakiye tek bir sayıdır: **3.240.000**. ' +
        'Bu sayı, hangi bankada ne kadar olduğunu **taşımaz**. ' +
        'Eşleme tablosu bunu çözemez çünkü çözecek bilgi ortada yoktur.\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Üç çözüm yolu, üçü de ek iş:**\n\n' +
        '**a)** Bölme eski sistemde, **geçişten önce** yapılır. ' +
        '⭐ En temizi — kaynak veri hâlâ oradadır.\n' +
        '**b)** Ayrı bir veri kaynağından dağıtılır (banka ekstresi, ' +
        'satıcı bazlı döküm). Elle iştir ve mutabakat gerektirir.\n' +
        '**c)** Bölme **ertelenir**: geçişte tek hesap kullanılır, ' +
        'ayrım yeni sistemde ileriye dönük başlar.\n\n' +
        '⚠️ **En sık yapılan hata (c)’yi bilmeden yapmaktır:** ' +
        'yeni hesap planı ayrıntılı tasarlanır, geçişte bölünemediği ' +
        'için hepsi tek hesaba yüklenir, ve kimse ilk yılın ' +
        'raporunun neden ayrışmadığını anlamaz.' },
    ],

    notlar:[
      { tip:'tip', baslik:'Deneme geçişi bir veri testi değil, bir plan testidir', metin:
        'Deneme geçişleri genelde *"veri doğru mu?"* diye yapılır. ' +
        'Doğru sorunun yalnızca yarısıdır.\n\n' +
        '⭐ **Provanın asıl çıktısı süredir.**\n\n' +
        'Kesme penceresi bir hafta sonudur: cuma akşamı 18:00’de eski sistem ' +
        'durur, pazartesi 08:00’de yeni sistem açılır. Arada **62 saat** vardır ' +
        've bu sürenin içine şunlar sığmalıdır:\n\n' +
        'veri çekimi · yükleme · mutabakat · **düzeltme** · onay · açılış hazırlığı\n\n' +
        '⚠️ **"Düzeltme" satırı en kritik olandır** ve tahmin edilemez — ' +
        'yalnızca provada ölçülür. Bir şey ters giderse ne kadar zaman kalıyor?\n\n' +
        '━━━━━━━━━━\n\n' +
        '**Üç turun üç ayrı amacı:**\n\n' +
        '**① Teknik prova** — akış çalışıyor mu? Hatalar beklenir ve normaldir.\n' +
        '**② İş provası** — veri doğru mu? Muhasebe mutabakatı burada yapılır.\n' +
        '**③ Tam prova** — ⭐ **saat tutulur**, gerçek ekiple ve gerçek planla.\n\n' +
        'Üçüncü tur canlıya **yakın donanımda** yapılmalıdır; ' +
        'yavaş bir test sunucusunda ölçülen süre yanıltır ve ' +
        'kesme penceresi yanlış planlanır.' },

      { tip:'warn', baslik:'Geri dönüş planı — yazılmayan tek plan', metin:
        '{{kesme-plani}}nın en sık eksik kalan satırı en sonuncusudur:\n\n' +
        '**"Geri dönüş kararı hangi saatte, kim tarafından verilir?"**\n\n' +
        'Bu satır yazılmazsa karar **kriz anında** verilir — ve kriz anında ' +
        'verilen kararlar iyimserdir: *"biraz daha uğraşalım, çözeriz."*\n\n' +
        '⭐ **Doğru kurgu:** planda bir **karar saati** vardır (örn. pazar 12:00). ' +
        'O saatte mutabakat geçmediyse geri dönülür — tartışma yok.\n\n' +
        '**Geri dönüş neye benzer:**\n\n' +
        '{{greenfield}}’de kolaydır: eski sistem hiç durmamıştır, ' +
        'yalnızca yeni sistem açılmaz.\n\n' +
        '⚠️ {{brownfield}}’de **veritabanı geri yükleme** demektir. ' +
        'Süresi saatlerle ölçülür ve bu süre de ' +
        '**kesme penceresine dahil edilmelidir**.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Bu konunun tamamı zaten S/4HANA’ya geçiş hakkındadır. ' +
      'Bu bölüm, geçişin **hedef sistemde** neyi değiştirdiğine bakar: ' +
      'yüklenen veri artık {{ACDOCA}}’ya gidiyor, satıcı artık ' +
      '{{is-ortagi}} ve indeks tabloları artık **yazılamıyor**.',

    eccFarklari:[
      { konu:'Önerilen araç', ecc:'{{LSMW}}', s4:'**{{LTMC}}** Migration Cockpit' },
      { konu:'Satıcı/müşteri', ecc:'{{LFA1}} / {{KNA1}} bağımsız', s4:'⚠️ **{{is-ortagi}} zorunlu** — {{cvi}} ön koşul' },
      { konu:'Açık kalem hedefi', ecc:'{{BSIK}} / {{BSID}} tablolarına yazılır', s4:'⚠️ Bunlar **görünüm** — belge kaydıyla oluşur' },
      { konu:'Kalem tablosu', ecc:'{{BSEG}}', s4:'{{ACDOCA}} — {{evrensel-kayit-defteri}}' },
      { konu:'FI–CO mutabakatı', ecc:'Geçiş sonrası **ayrı** kontrol', s4:'⭐ **Yapısal olarak gereksiz** — tek satır kaynağı' },
      { konu:'Masraf türü', ecc:'Ayrı nesne ({{CSKB}})', s4:'**G/L hesabıyla birleşti** — brownfield’de hazırlık gerekir' },
      { konu:'Şablon', ecc:'Kendin tanımlarsın', s4:'⭐ **Hazır, önceden eşli** Excel şablonu' },
      { konu:'Yükleme öncesi kontrol', ecc:'Deneme çalıştırması', s4:'⭐ **Simülasyon** — veri yazmadan' },
      { konu:'Kavramlar', ecc:'Eşleme, dönüşüm, mutabakat', s4:'⭐ **Aynı** — araç değişti, kavram değişmedi' },
    ],

    universalJournal:
      '{{evrensel-kayit-defteri}} geçişi iki yönden **kolaylaştırdı**:\n\n' +
      '**1. Tek hedef.** ECC’de FI, CO ve varlık bakiyeleri ayrı ayrı ' +
      'taşınır ve sonra birbiriyle mutabık kılınırdı. S/4HANA’da hepsi ' +
      '{{ACDOCA}}’ya gider.\n\n' +
      '**2. Yapısal tutarlılık.** FI ile CO arasında tutarsızlık ' +
      '**imkânsız** olduğu için geçiş sonrası o mutabakat ortadan kalktı.\n\n' +
      '⚠️ Ama iki kural **değişmedi**:\n\n' +
      '• {{acik-kalem}} hesapları hâlâ **tek tek** taşınır\n' +
      '• Varlık muhasebesi ({{ANLC}}) ile G/L hâlâ **elle** mutabık kılınır — ' +
      '{{AS91}} muhasebe kaydı üretmiyor',

    kalkanTcodes:[
      { eski:'{{LSMW}} (yeni projelerde)', yeni:'**{{LTMC}}**', not:'Hazır nesneler, önceden eşli şablon, simülasyon' },
      { eski:'{{SHDB}} recording ({{BP}} için)', yeni:'Migration Cockpit nesnesi', not:'⚠️ BP ekran akışı recording için fazla karmaşık' },
      { eski:'{{BSIK}}/{{BSID}}’e doğrudan yazma', yeni:'Belge kaydı', not:'⚠️ Artık **görünüm** — yazılamaz' },
      { eski:'FI–CO mutabakat programları', yeni:'**Gereksiz**', not:'⭐ Tek satır kaynağı' },
    ],

    fiori:[
      { ad:'Migrate Your Data', aciklama:'⭐ {{LTMC}}’nin {{fiori}} hâli; ' +
             'S/4HANA Cloud’da **tek yol** budur.' },
      { ad:'Migration Object Modeler', aciklama:'{{LTMOM}} — standart nesne yetmezse ' +
             'alan ekleme ve kural yazma.' },
      { ad:'Manage Business Partner', aciklama:'{{cvi}} sonrası {{is-ortagi}} bakımı; ' +
             'rol bazlı görünüm.' },
    ],

    compatibilityViews:[
      '⚠️ {{BSIK}} / {{BSID}} / {{BSIS}} artık **{{uyumluluk-view}}**tir — ' +
      'okunur, **yazılamaz**. Eski yükleme programları bunlara yazmaya ' +
      'çalışıyorsa çalışmaz.',
      '{{GLT0}} ve {{FAGLFLEXT}} {{toplam-tablosu}}ları da görünüme dönüştü; ' +
      'bakiye taşımak için onlara yazılmaz, **belge kaydedilir**.',
      '{{ACDOCA}} hedeftir ama **doğrudan yazılmaz** — ' +
      'her satır bir belge kaydından doğar (bkz. {{konu:sap-tables}}).',
    ],

    performans:
      '{{LTMC}}, {{LSMW}}’ye göre daha hızlıdır: toplu işleme optimize edilmiştir ' +
      've ekran akışı çalıştırmaz.\n\n' +
      'Büyük yüklemelerde paralellik kullanılır. ' +
      '⚠️ Ama {{konu:data-upload}}’daki kural burada da geçerlidir: ' +
      '**paralel bölme ölçütü satır numarası değil, kilitlenen nesnedir**. ' +
      'Aynı satıcıya dokunan iki iş {{kilitleme}} çakışması yaratır.\n\n' +
      '⭐ Geçişin en uzun adımı genelde yükleme değil **mutabakattır** — ' +
      've o insan hızındadır. {{deneme-gecisi}}nde ölçülmesi gereken ' +
      'asıl süre budur.',

    bestPractices:[
      '⭐ Yeni projede {{LSMW}} değil **{{LTMC}}**.',
      '{{cvi}} dönüşümünü brownfield’de **teknik dönüşümden önce** bitir.',
      '⚠️ Açık kalemleri {{BSIK}}’e yazmaya çalışma — **belge kaydet**.',
      'Simülasyonu her veri güncellemesinde çalıştır; ücretsizdir.',
      'Geçiş için ayrı {{belge-turu}} ve ayrı numara aralığı.',
      '⭐ Üç seviyeli mutabakat: teknik → muhasebe → yasal.',
      'Yükleme sonrası {{OB52}} ile geçiş dönemini kapat.',
      '⚠️ Eski sistemin arşiv çözümünü **geçiş projesine dahil et**.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'"Geçiş başarılı" — ve üç ay sonra bulunamayan gelir tablosu',
    hikaye:
      '**Ege Kimya A.Ş.** 01.01.2028’de S/4HANA’ya geçti. ' +
      '{{greenfield}} seçilmişti: süreçler yenilenecekti ve ' +
      'eski sistem *"zaten duruyor"* denmişti.\n\n' +
      'Geçiş hafta sonu sorunsuz geçti. Pazar akşamı mutabakat raporu imzalandı:\n\n' +
      '• Adet ✓ · tutar ✓ · geçiş hesabı **sıfır** ✓\n' +
      '• Yeni mizan = eski mizan ✓\n' +
      '• {{FBL1N}} satıcı bakiyesi = `320` bakiyesi ✓\n' +
      '• {{AR01}} varlık toplamı = `253` − `257` ✓\n\n' +
      'Dört kontrol de geçti. **Geçiş gerçekten başarılıydı.**\n\n' +
      '━━━━━━━━━━\n\n' +
      'Mart 2028’de bağımsız denetim başladı.\n\n' +
      'Denetçi ilk istediği belgeyi istedi: **2027 karşılaştırmalı gelir tablosu.**\n\n' +
      'SAP’ta yoktu. Ve bulunabilecek bir yerde de değildi.',
    veriler:[
      { k:'Yaklaşım', v:'{{greenfield}}' },
      { k:'Canlıya geçiş', v:'01.01.2028' },
      { k:'Mutabakat', v:'**Dört kontrol de geçti** ✓' },
      { k:'Taşınan', v:'Ana veri · bakiye · açık kalem · varlık' },
      { k:'⚠️ Taşınmayan', v:'**2027 hareketleri**' },
      { k:'Eski sistem', v:'⚠️ Şubat’ta **kapatıldı**' },
      { k:'Fark edilme', v:'Mart 2028 — denetim başlangıcı' },
    ],

    adimlar:[
      { baslik:'SAP’ta 2027 gelir tablosu var mı?', tcode:'F.01',
        aciklama:'Önce en basit ihtimal deneniyor.',
        girdi:[
          { alan:'Şirket kodu', deger:'1000' },
          { alan:'Dönem', deger:'2027 / 01–12' },
          { alan:'Sonuç', deger:'⚠️ **Tüm gelir tablosu hesapları sıfır**' },
          { alan:'Bilanço hesapları', deger:'Dolu — açılış bakiyesi olarak' },
        ],
        not:'**Bu bir hata değil.**\n\n' +
             'Gelir tablosu hesapları dönem sonunda **sıfırlanır** ({{bakiye-devri}}); ' +
             'devreden bakiyeleri yoktur. Taşınacak bir şey yoktu.\n\n' +
             '⭐ Yani sistem **doğru davranıyor**. Eksik olan veri değil, ' +
             '**karardı**: 2027 hareketleri hiç taşınmamıştı.\n\n' +
             'Bilanço hesapları dolu görünüyordu çünkü onların bakiyesi ' +
             'devreder — bu da yanlış bir güven yaratmıştı: ' +
             '*"2027 verisi var galiba."*' },

      { baslik:'Mutabakat bunu neden yakalamadı?', tcode:'FS10N',
        aciklama:'Dört kontrolün kapsamı inceleniyor.',
        girdi:[
          { alan:'Teknik mutabakat', deger:'Adet + tutar — **yüklenenler** üzerinde' },
          { alan:'Muhasebe mutabakatı', deger:'Mizan + geçiş hesabı — **bilanço** üzerinde' },
          { alan:'Yasal mutabakat', deger:'⚠️ **Yapılmamıştı**' },
          { alan:'Çıkarım', deger:'Kontroller **yüklenen veriyi** doğruladı' },
        ],
        not:'⭐ **Konunun düğüm noktası burada.**\n\n' +
             'Dört kontrol de *"yüklediğimiz şey doğru mu?"* sorusunu cevaplıyordu. ' +
             'Hiçbiri *"yüklememiz gereken her şeyi yükledik mi?"* diye sormuyordu.\n\n' +
             'Bir mutabakat yalnızca **kapsamındakini** doğrular. ' +
             'Kapsam dışında bırakılan bir veri sınıfı, ' +
             'ne kadar kontrol yaparsanız yapın **görünmez**.\n\n' +
             'Üçüncü seviye — **yasal mutabakat** — tam olarak bunun içindir: ' +
             '*"denetçinin isteyeceği tabloları üretebiliyor muyuz?"*\n\n' +
             '⚠️ O seviye atlanmıştı çünkü bilanço tutuyordu ve ' +
             '**bilanço tutunca gelir tablosu da tutuyor sanıldı**.' },

      { baslik:'Eski sistemden alınamaz mı?', tcode:'SM37',
        aciklama:'İkinci ihtimal deneniyor.',
        girdi:[
          { alan:'Eski sistem', deger:'⚠️ **Şubat’ta kapatıldı** — sunucu iade edildi' },
          { alan:'Gerekçe', deger:'*"Veri taşındı, lisans yenilemeyelim"*' },
          { alan:'Yedek', deger:'Var — ama **ham veritabanı yedeği**' },
          { alan:'Arşiv çözümü', deger:'⚠️ **Yok** — projeye hiç dahil edilmemişti' },
        ],
        not:'⚠️ **İkinci karar, birincisinden bağımsız verilmişti ve ' +
             'ikisi birlikte sorunu yarattı.**\n\n' +
             '"Geçmişi taşımıyoruz" kararı tek başına sorun değildi — ' +
             '{{greenfield}}’in doğal sonucudur ve bilinçli seçilebilir.\n\n' +
             'Sorun, o kararın **ikinci yarısının** verilmemesiydi: ' +
             '*geçmiş taşınmıyorsa, nerede duracak?*\n\n' +
             '⭐ İki karar **aynı cümlede** verilmeliydi:\n' +
             '*"Geçmişi taşımıyoruz, çünkü eski sistem üç yıl daha ' +
             'salt okunur kalacak."*\n\n' +
             'İlk yarısı söylendi, ikincisi söylenmedi. ' +
             'Şubat’ta lisans yenileme kararını veren kişi ' +
             '**geçiş kararını bilmiyordu**.' },

      { baslik:'Ne yapıldı?', tcode:'FB03',
        aciklama:'Çözüm — pahalı yoldan.',
        girdi:[
          { alan:'1. adım', deger:'Yedekten geçici sunucuya **veritabanı geri yüklendi**' },
          { alan:'Süre', deger:'⚠️ **3 hafta** (donanım + lisans + kurulum)' },
          { alan:'2. adım', deger:'2027 mali tabloları çıkarıldı ve **PDF olarak** arşivlendi' },
          { alan:'3. adım', deger:'Sunucu tekrar kapatıldı' },
          { alan:'Sonuç', deger:'Denetim raporu **6 hafta gecikti**' },
        ],
        not:'Çözüm çalıştı ama üç şeye mal oldu: **zaman** (3 hafta), ' +
             '**para** (geçici lisans ve donanım) ve **güven** ' +
             '(denetim raporu gecikti).\n\n' +
             '⚠️ Ve iş bitmedi: aynı ihtiyaç **her yıl** doğacak. ' +
             'Vergi incelemesi beş yıl geriye gidebilir; ' +
             'TTK saklama süresi daha da uzun.\n\n' +
             'Sonunda yapılması gereken yapıldı: **arşiv çözümü kuruldu** — ' +
             'ama geçiş projesinin içinde değil, **bir yıl sonra** ve ' +
             'eski sistemi yeniden ayağa kaldırma maliyetiyle birlikte.' },
    ],

    sonuc:
      '⭐ **Bu senaryoda kimse hata yapmadı — ve sonuç yine de kötüydü.**\n\n' +
      'Geçiş ekibi taşınması istenen her şeyi taşıdı ve doğruladı. ' +
      'Mutabakat dört koldan yapıldı ve dördü de geçti. ' +
      'Lisansı yenilemeyen kişi maliyet tasarrufu sağladı.\n\n' +
      'Sorun **kararların arasındaki boşluktaydı**.\n\n' +
      '━━━━━━━━━━\n\n' +
      '**Üç kalıcı ders:**\n\n' +
      '**1. Geçiş kararı iki yarımdan oluşur.**\n' +
      '*"Geçmişi taşımıyoruz"* eksik bir cümledir. ' +
      'Tamamı şudur: **"Geçmişi taşımıyoruz, çünkü şurada duracak ve ' +
      'şu kadar süre erişilebilir kalacak."** ' +
      'İkinci yarısı yazılmazsa birincisi bir karar değil, bir **ertelemedir**.\n\n' +
      '**2. Mutabakat yalnızca kapsamındakini doğrular.**\n' +
      'Dört kontrol de *"yüklediğimiz doğru mu?"* diyordu. ' +
      '⭐ Üçüncü seviye — **yasal mutabakat** — *"üretmemiz gerekeni ' +
      'üretebiliyor muyuz?"* diye sorar ve tam olarak bu boşluğu kapatır.\n\n' +
      'Kontrolü tek cümleyle uygulayabilirsiniz: ' +
      '**"Denetçi Şubat’ta ne isteyecek ve onu nereden çıkaracağız?"**\n\n' +
      '**3. Bilançonun tutması gelir tablosunun tuttuğu anlamına gelmez.**\n' +
      'Bilanço hesapları devreder, gelir tablosu hesapları devretmez. ' +
      'Geçişten sonra bilançonun dolu görünmesi doğal ve doğrudur — ' +
      've bu, gelir tablosunun boş olduğunu **gizler**.\n\n' +
      '━━━━━━━━━━\n\n' +
      '⚠️ Bu, {{konu:error-handling}}’deki **② sessiz hata** sınıfının ' +
      'proje ölçeğindeki hâlidir: sistem doğru davrandı, ' +
      'her kontrol geçti, hiçbir hata mesajı çıkmadı — ' +
      've eksik yalnızca **birinin ihtiyaç duyduğu anda** görüldü.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '⭐ **Geçiş bir veri taşıma işi değil, hangi geçmişin taşınacağına dair ' +
      'bir muhasebe kararıdır** — ve bu karar araç seçiminden önce verilir.',
      'Üç yaklaşım: **{{greenfield}}** (geçmiş gelmez) · **{{brownfield}}** ' +
      '(geçmiş de hatalar da gelir) · **{{secici-gecis}}** (pahalı ortası).',
      '⚠️ **Gelir tablosu hesaplarının açılış bakiyesi olmaz** — ' +
      'karşılaştırmalı tablo kendiliğinden oluşmaz.',
      '⭐ Hesap planı eşlemesinde **n:1 taşınır, 1:n taşınmaz**.',
      '{{brownfield}}’in üç zorunlu adımı: **{{cvi}} → hesap planı → mali veri dönüşümü**.',
      '{{acik-kalem}} hesapları **tek tek** (vade + ödeme koşuluyla), G/L **toplu**.',
      '{{AS91}} varlığı açar ama **muhasebe kaydı üretmez** — G/L fişi ayrıdır.',
      '⭐ **Üç seviyeli mutabakat:** teknik (yüklendi mi) → muhasebe (doğru mu) → ' +
      '**yasal (sunulabilir mi)**.',
      '⭐ {{deneme-gecisi}} bir veri testi değil **plan testidir** — süreler ölçülür.',
      '⚠️ Eski sistem kapatılmaz; arşiv çözümü **geçiş projesinin parçasıdır**.',
      '⚠️ **"Sonra taşırız" diye bir şey yoktur** — geçmiş kararı bir {{tek-yonlu-kapi}}dır.',
    ],

    onemliNoktalar:[
      '**"Greenfield mi brownfield mi seçersin?"** Soru maliyetle değil **geçmişle** cevaplanır. **Süreçlerinizden memnunsanız ve tarihçe şartsa** → {{brownfield}} (⚠️ eski hatalar da gelir, {{SPAU}} yükü {{z-gelistirme}} sayısıyla artar). **Süreçleri yenilemek istiyorsanız ve tarihçe eski sistemde tutulabiliyorsa** → {{greenfield}} (⚠️ karşılaştırmalı gelir tablosu kendiliğinden oluşmaz). İkisi de olmuyorsa {{secici-gecis}} — en pahalısı.',
      '**"Geçen yılın gelir tablosunu yeni sistemde görebilir miyiz?"** ⚠️ **{{greenfield}}\'de hayır** — ve bu bir eksiklik değil, muhasebenin doğası: gelir tablosu hesapları dönem sonunda sıfırlanır ({{bakiye-devri}}), devreden bakiyeleri yoktur. Üç çözüm: (a) önceki yılın **hareketleri** de taşınır, (b) eski sistem **okunabilir** kalır, (c) tablolar dışarıda saklanır. ⭐ Karar geçişten **önce** verilir; sonradan verilemez.',
      '**"Eski hesap planını yeni hesap planına nasıl eşlersin?"** ⭐ **n:1 taşınır, 1:n taşınmaz.** İki eski hesap tek yeni hesapta birleşiyorsa bakiyeler toplanır — otomatiktir. Bir eski hesap ikiye bölünüyorsa eski bakiye **hangi parçanın ne kadar olduğunu taşımaz**; eşleme tablosu bunu çözemez. Üç yol: bölmeyi **eski sistemde geçişten önce** yap · ayrı veri kaynağından elle dağıt · bölmeyi **erteleyip** ileriye dönük başlat.',
      '**"Brownfield\'de sıra nedir?"** ⚠️ Sırası değişmez: **①** {{basitlestirme-listesi}} çalıştırılır (engelleyiciler çıkar) → **②** {{cvi}} ile satıcı/müşteri {{is-ortagi}}\'na dönüştürülür — **hâlâ ECC üzerindeyken** → **③** hesap planı hazırlığı (birincil {{masraf-turu}}leri G/L hesabına dönüşür) → **④** mali veri dönüşümü ({{BSEG}} → {{ACDOCA}}), ⚠️ **geri alınamaz** → **⑤** {{SPDD}}/{{SPAU}} ile modifikasyon uyarlaması. ⭐ Projeler en çok **②\'de** gecikir ve sebebi teknik değil **veri kalitesidir**.',
      '**"Açılış bakiyelerini nasıl taşırsın?"** Geçiş yılından **bir gün önceye** (31.12), bir **geçiş hesabı** karşılığında, **ayrı bir {{belge-turu}}** ile. {{acik-kalem}} hesapları (satıcı, müşteri, GR/IR) **tek tek** — vade ve {{odeme-kosulu}} korunarak; normal G/L **toplu**; duran varlık {{AS91}} ile ve **G/L tarafı ayrı fişle**. ⭐ Kontrol tek sayıdır: **geçiş hesabı sıfır mı?** ⚠️ Gelir tablosu hesapları taşınmaz.',
      '**"AS91 ile varlık taşıdım, mizan tutmuyor. Neden?"** ⚠️ **{{AS91}} muhasebe kaydı üretmez.** Varlık ana verisini ve {{ANLC}} değerlerini açar, hepsi bu. G/L tarafı (`253` borç / `257` + geçiş hesabı alacak) **ayrıca** kaydedilir. Unutulursa varlık muhasebesi ile mizan ayrışır ve hata **geçişte değil, yıl sonu {{AJAB}} kapanışında** ortaya çıkar — yani en pahalı yerde. Kontrol: {{AR01}} toplamı = `253` − `257`.',
      '**"Mutabakat yaptık, geçiş başarılı mı?"** Hangi mutabakat? ⭐ **Üç seviye vardır ve biri diğerinin yerine geçmez:** **①** teknik — *"yüklendi mi?"* (adet + tutar) · **②** muhasebe — *"doğru mu?"* (geçiş hesabı sıfır, mizan aynı) · **③** ⭐ **yasal** — *"sunulabilir mi?"* ({{F.01}} bilançosu eskisiyle birebir mi, "atanmamış hesaplar" satırı sıfır mı). ⚠️ ① geçse de ② geçmeyebilir; ② geçse de ③ geçmeyebilir. Her seviye bir öncekinin **göremediğini** yakalar.',
      '**"Deneme geçişi ne için yapılır?"** ⭐ **Veri testi için değil, PLAN testi için.** Verinin doğruluğu mutabakatla ölçülür; provanın asıl çıktısı **her adımın kaç dakika sürdüğüdür** — kesme penceresi ancak bu ölçümle planlanabilir. En az üç tur: teknik (çalışıyor mu) → iş (doğru mu) → **tam prova** (saat tutulur, gerçek ekiple). ⚠️ Son tur canlıya **yakın donanımda** yapılmalı; yavaş test sunucusunda ölçülen süre yanıltır. Planın en kritik satırı: **geri dönüş kararı hangi saatte verilir?**',
      '**"Geçiş bitti, eski sistemi kapatabilir miyiz?"** ⚠️ **Hayır — ve sebep lisans maliyeti değil yasal saklamadır.** Üç seçenek: sistemi ayakta tut (en pahalı; birkaç yıl sonra kullanmayı bilen kalmaz) · salt okunur bırak · **arşiv çözümü** (en ucuzu). ⭐ Ama arşiv çözümü ancak **geçiş projesinin parçasıysa** ucuzdur; sonradan kurulursa eski sistemi yeniden ayağa kaldırmak gerekir. Türkiye’de ek yük: {{e-defter}} ve {{berat}} dönemleri **kanıtlanabilir** kalmalıdır.',
    ],

    sikHatalar:[
      { hata:'Veri geçişini teknik bir iş paketi sanmak.', dogru:'⭐ Muhasebe kararlarının toplandığı yerdir. "Kaç yıl geriye gidelim?" sorusunun cevabı **mali işlerden** gelir.' },
      { hata:'Yaklaşım kararını araç seçtikten sonra vermek.', dogru:'⚠️ Sıra terstir: önce geçmiş kararı, sonra yaklaşım, en son araç.' },
      { hata:'Gelir tablosu hesaplarının bakiyesini taşımak.', dogru:'⚠️ Fiş dengeli olur, sistem kabul eder ve **yeni yılın gelir tablosu baştan yanlış başlar**.' },
      { hata:'Bir eski hesabı iki yeni hesaba bölmeyi eşlemeyle çözmeye çalışmak.', dogru:'🚫 1:n taşınamaz. Bölme eski sistemde yapılır veya ayrı veri kaynağı bulunur.' },
      { hata:'CVI dönüşümünü teknik dönüşümle birlikte planlamak.', dogru:'⚠️ **Öncesinde** yapılır — hâlâ ECC üzerindeyken. Gecikmenin ana sebebi veri kalitesidir.' },
      { hata:'Satıcı bakiyesini toplu taşımak.', dogru:'{{acik-kalem}} hesapları **tek tek**; yoksa {{F110}}, {{F-53}} ve {{F150}} çalışmaz.' },
      { hata:'{{LFB1}} yüklemesini atlamak.', dogru:'⚠️ **Ayrı bir adımdır.** `AKONT` {{mutabakat-hesabi}} olmadan satıcıya kayıt yapılamaz.' },
      { hata:'{{AS91}} sonrası G/L fişini unutmak.', dogru:'⚠️ AS91 muhasebe kaydı üretmez. Hata yıl sonu {{AJAB}} kapanışında çıkar.' },
      { hata:'Amortisman başlangıç tarihini taşımamak.', dogru:'İlk {{AFAB}} yanlış hesaplar. ⭐ Geçiş sonrası ilk koşu **elle kontrol edilir**.' },
      { hata:'Geçiş belgelerini normal belge türüyle atmak.', dogru:'⭐ Ayrı {{belge-turu}} + ayrı numara aralığı; ⚠️ aralık **önceki mali yılı** kapsamalı.' },
      { hata:'Geçiş dönemini {{OB52}}’de açık bırakmak.', dogru:'Canlı kullanıcı yanlışlıkla geçmiş döneme kayıt atar ve bu kapanışta fark edilir.' },
      { hata:'Deneme geçişinde yalnızca veriyi kontrol etmek.', dogru:'⭐ Asıl ölçülen **süredir**. Kesme penceresi provasız planlanamaz.' },
      { hata:'Geri dönüş kararını krize bırakmak.', dogru:'Planda bir **karar saati** olur. Kriz anında verilen kararlar iyimserdir.' },
      { hata:'"Veri taşındı" diyerek eski sistemi kapatmak.', dogru:'⚠️ Yasal saklama sürer. Arşiv çözümü **geçiş projesinin parçasıdır**.' },
      { hata:'Bilanço tuttuğu için gelir tablosunun da tuttuğunu varsaymak.', dogru:'⭐ Bilanço hesapları devreder, gelir tablosu hesapları devretmez. Bu, boşluğu **gizler**.' },
    ],

    ipuclari:[
      '⭐ İlk soruyu erken sor: *"Denetçi Şubat’ta ne isteyecek?"*',
      'Geçmiş kararını **iki yarım cümleyle** yaz: taşımıyoruz **ve** şurada duracak.',
      'Hesap planı eşlemesinde bölme (1:n) varsa **geçişten önce** çöz.',
      '{{basitlestirme-listesi}}ni proje planından **önce** çalıştır.',
      'Veri temizliğinin iş planı **ilk simülasyonun hata listesidir**.',
      '⚠️ Temizlik danışmanın değil **veri sahibinin** işidir; liste ona gider.',
      'Açık kalemlerde `XBLNR`’a **eski sistem belge numarasını** yaz.',
      '⭐ Deneme geçişinde **kronometre tut**; en kritik satır "düzeltme" süresidir.',
      'Son provayı canlıya **yakın donanımda** yap.',
      '⭐ Kesme planına bir **geri dönüş karar saati** koy.',
      'Geçiş sonrası ilk {{AFAB}} ve ilk {{F110}} koşusunu **elle kontrol et**.',
      'Yükleme bitince geçiş belge türüne **kayıt yetkisini kaldır**.',
    ],

    quiz:[
      { soru:'Veri geçişi projesinde ilk verilmesi gereken karar hangisidir?',
        secenekler:[
          'Hangi yükleme aracının kullanılacağı',
          '**Geçmiş verinin taşınıp taşınmayacağı**',
          'Kaç kişilik ekip kurulacağı',
          'Hangi tarihte canlıya geçileceği',
        ], dogru:1,
        aciklama:'⭐ **Bu konunun tezi:** geçiş bir veri taşıma işi değil, ' +
                 '**hangi geçmişin taşınacağına** dair bir muhasebe kararıdır.\n\n' +
                 'Bu karar yaklaşımı belirler ({{greenfield}} / {{brownfield}} / ' +
                 '{{secici-gecis}}), yaklaşım aracı belirler.\n\n' +
                 '⚠️ Ve **geri alınamaz**: canlıya geçtikten sonra ' +
                 '"geçmişi de taşıyalım" denemez — numara aralıkları tükenmiş, ' +
                 'dönemler kapanmış, bakiyeler çakışır ve Türkiye’de ' +
                 '{{berat}} alınmış dönemler yasal olarak kesinleşmiştir.' },

      { soru:'Greenfield bir geçişte, önceki yılın gelir tablosu yeni sistemde neden oluşmaz?',
        secenekler:[
          'Yükleme eksik yapılmıştır',
          'Yetki eksikliğinden görünmez',
          '**Gelir tablosu hesapları dönem sonunda sıfırlanır; devreden bakiyeleri yoktur**',
          'Mali tablo yapısı tanımlanmamıştır',
        ], dogru:2,
        aciklama:'⭐ Bu bir eksiklik değil, **muhasebenin doğasıdır**.\n\n' +
                 'Bilanço hesapları **devreder** — bakiyeleri taşınır.\n' +
                 'Gelir tablosu hesapları **devretmez** — dönem sonunda ' +
                 'sıfırlanıp kâr/zarara aktarılırlar ({{bakiye-devri}}).\n\n' +
                 '⚠️ Tehlikeli tarafı şu: geçişten sonra **bilanço dolu görünür** ' +
                 've bu, gelir tablosunun boş olduğunu **gizler**. ' +
                 'Eksik ancak birileri karşılaştırmalı tablo isteyince fark edilir.\n\n' +
                 'Çözüm bir yükleme değil, bir **karardır**: hareketler de taşınacak mı, ' +
                 'eski sistem okunabilir mi kalacak, yoksa tablolar dışarıda mı saklanacak?' },

      { soru:'Eski sistemdeki tek bir "102 Bankalar" hesabı, yeni sistemde iki hesaba (102.01 / 102.02) bölünecek. Bu nasıl taşınır?',
        secenekler:[
          'Eşleme tablosunda iki hedef tanımlanır, sistem böler',
          '**Bölünemez — eski bakiye hangi parçanın ne kadar olduğunu taşımaz; ayrı veri kaynağı gerekir**',
          'Otomatik olarak yarı yarıya bölünür',
          'Yükleme sırasında SAP sorar',
        ], dogru:1,
        aciklama:'⭐ **n:1 taşınır, 1:n taşınmaz.**\n\n' +
                 '**Birleştirme (n:1)** otomatiktir: iki eski hesabın bakiyeleri ' +
                 'toplanır, iş biter. Bilgi kaybolur ama kayıp bilinçlidir.\n\n' +
                 '**Bölme (1:n)** yapılamaz çünkü eski bakiye **tek bir sayıdır** ' +
                 've içinde ayrım bilgisi yoktur. Eşleme tablosu bunu çözemez — ' +
                 'çözecek bilgi ortada değildir.\n\n' +
                 '**Üç yol:** (a) bölmeyi **eski sistemde geçişten önce** yap — en temizi · ' +
                 '(b) ayrı bir veri kaynağından (banka ekstresi) elle dağıt · ' +
                 '(c) bölmeyi **ertele**, ayrım yeni sistemde ileriye dönük başlasın.\n\n' +
                 '⚠️ En sık hata (c)’yi **bilmeden** yapmaktır: ayrıntılı hesap planı ' +
                 'tasarlanır, geçişte bölünemediği için hepsi tek hesaba gider.' },

      { soru:'Brownfield geçişte CVI (müşteri/satıcı → iş ortağı) dönüşümü ne zaman yapılır?',
        secenekler:[
          'Teknik dönüşümden sonra, S/4HANA üzerinde',
          '**Teknik dönüşümden önce, hâlâ ECC üzerindeyken**',
          'Dönüşümle eş zamanlı, otomatik olarak',
          'İsteğe bağlı — sonradan da yapılabilir',
        ], dogru:1,
        aciklama:'{{is-ortagi}} S/4HANA’da **zorunludur**, bu yüzden {{cvi}} ' +
                 'dönüşümü {{brownfield}} geçişinin **ön koşuludur** ve ' +
                 'hâlâ ECC üzerindeyken tamamlanır.\n\n' +
                 '⭐ **Projelerin en sık geciktiği adım budur** — ve sebebi ' +
                 'teknik değil **veri kalitesidir**: mükerrer kayıtlar, ' +
                 'eksik vergi numaraları ve tutarsız adres verileri ' +
                 'dönüşümü durdurur.\n\n' +
                 '⚠️ Bu temizlik **danışmanın işi değildir**; hata listesi ' +
                 'veri sahibine gider ve dönüşüm temizlik bitene kadar bekler. ' +
                 'Proje planı bu bekleme süresini içermelidir.' },

      { soru:'AS91 ile 1.847 varlık devredildi ama mizan tutmuyor. En olası sebep?',
        secenekler:[
          'Amortisman alanları yanlış tanımlanmış',
          '**AS91 muhasebe kaydı üretmez; G/L fişi ayrıca atılmamış**',
          'Varlık sınıfı hatalı',
          'Dönem kapalı',
        ], dogru:1,
        aciklama:'⚠️ **{{AS91}} bir ana veri işlemidir, muhasebe işlemi değil.**\n\n' +
                 'Varlık ana verisini ve {{ANLC}} değerlerini (edinim değeri + ' +
                 'birikmiş amortisman) açar — ama **hiçbir muhasebe kaydı üretmez**.\n\n' +
                 'G/L tarafı ayrıca kaydedilir:\n' +
                 '`253` borç / `257` alacak + geçiş hesabı alacak.\n\n' +
                 '⭐ İki tarafın tutması **elle sağlanır**. Kontrol: ' +
                 '{{AR01}} varlık listesi toplamı = `253` − `257` bakiyesi.\n\n' +
                 '⚠️ **En kötü tarafı zamanlamadır:** unutulursa hata geçişte değil, ' +
                 'yıl sonu {{AJAB}} kapanışında ortaya çıkar — yani en pahalı yerde.' },

      { soru:'Üç seviyeli mutabakatta "yasal mutabakat" hangi soruyu cevaplar?',
        secenekler:[
          'Yüklenen kayıt sayısı doğru mu?',
          'Geçiş hesabı sıfırlandı mı?',
          '**Denetçinin isteyeceği mali tabloları üretebiliyor muyuz?**',
          'Kullanıcılar sisteme girebiliyor mu?',
        ], dogru:2,
        aciklama:'Üç seviye **farklı soruları** cevaplar:\n\n' +
                 '**① Teknik** — *"yüklendi mi?"* Adet + tutar.\n' +
                 '**② Muhasebe** — *"doğru mu?"* Geçiş hesabı sıfır, mizan aynı.\n' +
                 '**③ Yasal** — *"sunulabilir mi?"* {{F.01}} bilançosu eskisiyle ' +
                 'birebir mi, ⚠️ **"atanmamış hesaplar" satırı sıfır mı**?\n\n' +
                 '⭐ **Neden üçü de gerekli:** ① geçse de ② geçmeyebilir ' +
                 '(doğru sayıda **yanlış hesaba** yüklenmiştir). ' +
                 '② geçse de ③ geçmeyebilir (bakiyeler doğru ama ' +
                 '{{mali-tablo-yapisi}} eksiktir — bkz. {{konu:reporting}}).\n\n' +
                 'Her seviye bir öncekinin **göremediği** hatayı yakalar.' },

      { soru:'Deneme geçişinin (mock migration) asıl çıktısı nedir?',
        secenekler:[
          'Verinin doğru yüklendiğinin kanıtı',
          '**Her adımın kaç dakika sürdüğü — kesme penceresi ancak bununla planlanır**',
          'Kullanıcı eğitimi',
          'Yetki testleri',
        ], dogru:1,
        aciklama:'⭐ **Prova, verinin değil PLANIN testidir.**\n\n' +
                 'Verinin doğruluğu mutabakatla ölçülür ve o her zaman yapılabilir. ' +
                 'Ölçülemeyen tek şey **süredir**.\n\n' +
                 'Kesme penceresi bir hafta sonudur — cuma 18:00’den pazartesi ' +
                 '08:00’e **62 saat**. İçine şunlar sığmalıdır: ' +
                 'çekim · yükleme · mutabakat · **düzeltme** · onay · açılış.\n\n' +
                 '⚠️ **"Düzeltme" satırı tahmin edilemez** ve yalnızca provada ölçülür: ' +
                 'bir şey ters giderse ne kadar zaman kalıyor?\n\n' +
                 'Son prova canlıya **yakın donanımda** yapılmalıdır; ' +
                 'yavaş test sunucusunda ölçülen süre yanıltır.' },

      { soru:'Geçiş tamamlandı, mutabakat geçti. Eski sistem ne zaman kapatılabilir?',
        secenekler:[
          'Mutabakat imzalandığında',
          'Kullanıcılar yeni sisteme alıştığında',
          '**Yasal saklama süresi karşılanana kadar kapatılmaz; arşiv çözümü geçiş projesinin parçası olmalıdır**',
          'İlk ay sonu kapanışından sonra',
        ], dogru:2,
        aciklama:'⚠️ Sebep lisans maliyeti değil **yasal saklamadır**.\n\n' +
                 'Üç seçenek ve gerçek maliyetleri:\n\n' +
                 '**① Ayakta tut** — en kolay, en pahalı. Lisans ve donanımın ötesinde ' +
                 'bir **bilgi** maliyeti var: birkaç yıl sonra o sistemi kullanmayı ' +
                 'bilen kimse kalmaz.\n' +
                 '**② Salt okunur bırak** — ucuzlar ama sistem hâlâ ayaktadır.\n' +
                 '**③ Arşiv çözümü** — en ucuzu, ⭐ **ama yalnızca geçiş projesinin ' +
                 'parçasıysa**. Sonradan kurulursa eski sistemi yeniden ayağa ' +
                 'kaldırmak gerekir.\n\n' +
                 '⚠️ Türkiye’de ek yük: {{e-defter}} ve {{berat}} kayıtları ' +
                 'saklama süresi boyunca **kanıtlanabilir** olmalıdır — ' +
                 'ekran görüntüsü veya Excel dökümü yetmez.' },
    ],

    flashcards:[
      { on:'⭐ Geçişin tezi — tek cümle', arka:'**Bir veri taşıma işi değil, hangi GEÇMİŞİN taşınacağına dair bir MUHASEBE KARARI.**\n\nAraç seçiminden **önce** verilir.\n\n⚠️ Geri alınamaz: "sonra taşırız" diye bir şey yok.' },
      { on:'Üç yaklaşım', arka:'🌱 **{{greenfield}}** — sıfırdan kurulum\n→ geçmiş **gelmez**, eski hatalar da gelmez\n\n🏗️ **{{brownfield}}** — yerinde dönüşüm\n→ geçmiş gelir, ⚠️ **eski hatalar da**\n\n🎯 **{{secici-gecis}}** — seçilmiş tarihçe\n→ ikisinin ortası, **en pahalısı**' },
      { on:'⚠️ Gelir tablosu neden taşınmaz?', arka:'Gelir tablosu hesapları dönem sonunda **sıfırlanır** ({{bakiye-devri}})\n→ **devreden bakiyeleri yoktur**\n\nBilanço hesapları devreder → dolu görünür\n⚠️ **Ve bu, gelir tablosunun boş olduğunu GİZLER**' },
      { on:'⭐ Hesap planı eşlemesi', arka:'**n:1 ✅ taşınır** — iki eski hesap → tek yeni\nBakiyeler toplanır, otomatik\n\n**1:n 🚫 taşınmaz** — tek eski hesap → iki yeni\nEski bakiye ayrımı **taşımaz**\n\nÜç yol: eski sistemde böl · ayrı kaynaktan dağıt · **ertele**' },
      { on:'Brownfield — üç zorunlu adım', arka:'**①** {{cvi}} → {{is-ortagi}}\n⚠️ **Dönüşümden ÖNCE**, hâlâ ECC’de\n\n**②** Hesap planı — masraf türü G/L ile birleşir\n\n**③** Mali veri dönüşümü → {{ACDOCA}}\n⚠️ **Geri alınamaz**\n\nÖncesinde {{basitlestirme-listesi}}, sırasında {{SPDD}}/{{SPAU}}' },
      { on:'Açılış bakiyesi — üç kural', arka:'**{{acik-kalem}} hesapları** (satıcı, müşteri, GR/IR)\n→ ⭐ **TEK TEK** · vade + {{odeme-kosulu}} korunur\n\n**Normal G/L**\n→ **Toplu bakiye** yeter\n\n**Gelir tablosu**\n→ ⚠️ **Taşınmaz**' },
      { on:'⚠️ AS91 tuzağı', arka:'{{AS91}} **ana veri işlemidir**\n→ varlığı ve {{ANLC}} değerlerini açar\n→ ⚠️ **MUHASEBE KAYDI ÜRETMEZ**\n\nG/L fişi **ayrıca** atılır:\n`253` borç / `257` + geçiş hesabı alacak\n\n⚠️ Unutulursa hata **yıl sonu {{AJAB}}**’ta çıkar' },
      { on:'⭐ Üç seviyeli mutabakat', arka:'**① Teknik** — *"yüklendi mi?"*\nadet + tutar\n\n**② Muhasebe** — *"doğru mu?"*\ngeçiş hesabı sıfır · mizan aynı\n\n**③ Yasal** — *"sunulabilir mi?"*\n{{F.01}} birebir mi · "atanmamış hesaplar" **sıfır** mı\n\nHer seviye bir öncekinin göremediğini yakalar' },
      { on:'Deneme geçişi — asıl amaç', arka:'⭐ **Veri testi DEĞİL, PLAN testi**\n\nAsıl çıktı: **her adımın kaç dakika sürdüğü**\n\n3 tur: teknik → iş → **tam prova (saat tutulur)**\n\n⚠️ En kritik satır: **"düzeltme" süresi**\n⚠️ Son tur **canlıya yakın donanımda**' },
      { on:'Kesme planı — unutulan satır', arka:'**"Geri dönüş kararı hangi saatte, kim tarafından verilir?"**\n\n⚠️ Yazılmazsa karar **kriz anında** verilir\n→ ve kriz anında kararlar **iyimserdir**\n\n{{greenfield}}: eski sistem hiç durmadı, kolay\n⚠️ {{brownfield}}: **veritabanı geri yükleme**' },
      { on:'⚠️ Eski sistem neden kapatılmaz', arka:'Sebep lisans değil **yasal saklama**\n\n① Ayakta tut — pahalı + **bilgi kaybı**\n② Salt okunur — orta\n③ **Arşiv çözümü** — en ucuz\n\n⭐ Ama ③ yalnızca **geçiş projesinin parçasıysa** ucuz\n\n🇹🇷 {{e-defter}} / {{berat}} **kanıtlanabilir** kalmalı' },
      { on:'⭐ Senaryonun dersi', arka:'*"Geçmişi taşımıyoruz"* **eksik bir cümledir**\n\nTamamı:\n**"...çünkü şurada duracak ve şu kadar süre erişilebilir kalacak."**\n\nİkinci yarısı yazılmazsa birincisi bir karar değil, bir **erteleme**\n\n⚠️ Bilanço tutunca gelir tablosu da tutuyor **sanılır**' },
    ],
  },

  },
});
