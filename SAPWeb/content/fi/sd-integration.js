/* ==========================================================================
   content/fi/sd-integration.js — "SD Integration (Satış ve Dağıtım Entegrasyonu)"
   ========================================================================== */

SAP.registerTopic({
  id: 'sd-integration',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'SD entegrasyonu, **satış faturasının otomatik olarak muhasebe belgesine dönüşmesidir**. ' +
      'Faturalama ekibi {{VF01}} ile fatura keser; muhasebeci hiçbir şey girmez ama FI’da ' +
      'müşteri alacağı ve gelir kaydı oluşur.\n\n' +
      'Otomatikliğin kalbi **{{VKOA}}**’dır: gelir, iskonto ve navlun tutarlarının hangi ' +
      'G/L hesabına gideceğini bu tablo belirler. Kural eksikse fatura kesilir ' +
      '**ama muhasebeye düşmez** — ve bu, MM’den farklı olarak **sessiz bir hatadır**.\n\n' +
      'MM entegrasyonuyla simetriktir ama bir kritik farkı vardır: MM’de hesap belirleme ' +
      'eksikse **belge hiç oluşmaz**; SD’de ise **SD faturası oluşur, FI belgesi oluşmaz**. ' +
      'Yani hata anında görünmez.',

    neden:
      '**Hacim.** Perakende ve toptan satışta günde binlerce fatura kesilir.\n\n' +
      '**Tutarlılık.** Aynı ürün grubu her zaman aynı gelir hesabına gider.\n\n' +
      '**Eşzamanlılık.** Fatura kesildiği an gelir kaydedilir; ay sonunda toplu aktarım beklenmez.\n\n' +
      '**Doğru gelir sınıflandırması.** Yurtiçi/yurtdışı satış, ürün grubu, iskonto ve navlun ' +
      'ayrı hesaplarda izlenir — bunu elle yapmak imkânsızdır.',

    sirketOnemi:
      'SD entegrasyonunun bozulması **gelir eksik raporlanması** demektir ve bu, hataların ' +
      'en tehlikelisidir: kimse "gelirim fazla görünüyor" diye şikâyet etmez, ' +
      'ama "gelirim eksik" de kolay fark edilmez.\n\n' +
      'Danışmanlık açısından bu konu, FI danışmanının **en sık müdahale ettiği entegrasyon noktasıdır**: ' +
      '"SD faturası kesildi ama muhasebeye düşmedi" şikâyeti neredeyse her projede yaşanır ve ' +
      'çözümü FI tarafındadır ({{VKOA}}).\n\n' +
      'Mülakatta ayırt edici soru: **"SD faturası kesildi ama FI belgesi oluşmadı. Ne yaparsın?"** ' +
      'Doğru cevap: {{VBRK}} `RFBSK` alanını kontrol et, {{VKOA}}’yı tamamla, {{VF02}} ile yeniden aktar — ' +
      '**faturayı iptal etme**.',

    gercekHayat:
      'Bir toptancı yeni bir ürün grubu (organik ürünler) satmaya başlıyor. ' +
      'İlk 40 fatura kesiliyor, satış ekibi memnun.\n\n' +
      'Ay sonunda muhasebe müdürü mizanı alıyor: **gelir beklenenin 1,2 milyon TL altında**. ' +
      'Araştırılıyor: 40 faturanın hiçbiri muhasebeye düşmemiş. ' +
      '{{VBRK}} tablosunda `RFBSK` = "A" (aktarılmadı).\n\n' +
      'Sebep: yeni ürün grubu için **malzeme hesap belirleme grubu** tanımlanmış ama ' +
      '{{VKOA}}’da o grup için gelir hesabı atanmamış.\n\n' +
      'Çözüm 2 dakika sürüyor, sonra {{VF02}} ile 40 fatura yeniden aktarılıyor. ' +
      'Ama **bir ay boyunca gelir eksik göründü** ve kimse fark etmedi. ' +
      'Bu yüzden `RFBSK` kontrolü günlük rutin olmalıdır.',

    muhasebeMantigi:
      'SD entegrasyonunun muhasebe mantığı **iki ayrı olaydan** oluşur ve karıştırılmamalıdır:\n\n' +
      '**1. Mal çıkışı (teslimat):** stok azalır, satılan malın maliyeti gider yazılır. ' +
      'Müşteriye alacak **doğmaz** — henüz fatura kesilmedi. ' +
      'Bu kayıt aslında bir **MM hareketidir** (hareket türü 601) ve {{OBYC}} ile belirlenir.\n\n' +
      '**2. Fatura:** müşteri borçlanır, gelir ve KDV alacaklanır. ' +
      'Bu kayıt **SD’dendir** ve {{VKOA}} ile belirlenir.\n\n' +
      'İki olayın arasındaki süre, "sevk edildi ama faturalanmadı" durumunu yaratır ve ' +
      'dönem sonunda tahakkuk gerektirebilir.\n\n' +
      'Kritik ayrım: **maliyet MM’den, gelir SD’den gelir.** İkisi farklı kural tablolarını kullanır.',

    kavramlar: ['hesap-belirleme', 'mutabakat-hesabi', 'vergi-kodu', 'kar-merkezi',
                'acik-kalem', 'tahakkuk', 'malzeme-hareket-turu'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'SD entegrasyonu **Order-to-Cash** zincirinin muhasebe ayağıdır. ' +
      'Zincirin hangi adımında FI’da ne olduğunu bilmek, "gelir neden eksik?" sorusunu ' +
      'cevaplamanın temelidir.',

    roller:[
      { rol:'Satış', gorev:'Siparişi alır ({{VA01}}). {{kredi-limiti}} kontrolü burada yapılır. **FI kaydı yok.**' },
      { rol:'Sevkiyat / Depo', gorev:'Teslimat oluşturur ve mal çıkışı yapar. **İlk FI kaydı burada** — ama yalnızca maliyet tarafı.' },
      { rol:'Faturalama', gorev:'Faturayı keser ({{VF01}} / {{VF04}}). **Gelir burada doğar.**' },
      { rol:'AR muhasebe', gorev:'Aktarılmayan faturaları izler ({{VBRK}} `RFBSK`), {{VF02}} ile yeniden aktarır.' },
      { rol:'Ana muhasebe', gorev:'Dönem sonunda "sevk edildi faturalanmadı" tahakkukunu yapar.' },
      { rol:'FI + SD danışmanı', gorev:'{{VKOA}} gelir hesabı belirlemesini birlikte tasarlar.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'SD’den FI’a — gelir hangi adımda doğar?',
      adimlar:[
        { ic:'🛒', rol:'Satış', baslik:'Satış siparişi ({{VA01}})',
          aciklama:'{{kredi-limiti}} kontrolü yapılır; aşılırsa sipariş bloklanır ve sevkiyat durur. ' +
                   '**FI kaydı yok** — sipariş bir taahhüttür.',
          cikti:'Satış siparişi', ok:'mal hazırlanır' },
        { ic:'🚚', rol:'Sevkiyat', baslik:'Teslimat ve mal çıkışı',
          aciklama:'Hareket türü **601**. Stok azalır, satılan malın maliyeti gider yazılır ' +
                   '({{OBYC}} → **GBB/VAX**). **Müşteriye alacak doğmaz.**',
          cikti:'Malzeme belgesi + FI maliyet kaydı', ok:'fatura kesilir' },
        { ic:'🧾', rol:'Faturalama', baslik:'Fatura kesilir ({{VF01}}) — **gelir doğar**',
          aciklama:'Müşteri borçlanır, gelir ve KDV alacaklanır. Hesapları **{{VKOA}}** belirler. ' +
                   'SD faturası ({{VBRK}}/{{VBRP}}) ve FI belgesi birlikte oluşur.',
          cikti:'SD faturası + FI belgesi', ok:'aktarım kontrol edilir' },
        { ic:'🔍', rol:'AR muhasebe', baslik:'Aktarım durumu kontrol edilir',
          aciklama:'{{VBRK}} `RFBSK` = **C** ise aktarıldı, **A** ise aktarılmadı. ' +
                   '"A" kalan faturalar günlük izlenmelidir.',
          cikti:'Doğrulanmış aktarım', ok:'aktarılmadıysa' },
        { ic:'🔧', rol:'FI danışmanı', baslik:'Eksik giderilir ve yeniden aktarılır',
          aciklama:'{{VKOA}} tamamlanır, {{VF02}} → *Muhasebeye aktar*. **Fatura iptal edilmez.**',
          cikti:'FI belgesi', ok:'alacak takibe girer' },
        { ic:'💰', rol:'AR muhasebe', baslik:'Tahsilat ve kapatma',
          aciklama:'{{F-28}} veya {{FEBAN}} ile tahsilat kaydedilir, müşteri açık kalemi kapanır.',
          cikti:'Kapatılmış alacak' },
      ],
    },

    adimlar:[
      { rol:'Satış', eylem:'Sipariş alır, kredi kontrolü yapılır', sistem:'{{VA01}} — FI kaydı yok' },
      { rol:'Sevkiyat', eylem:'Mal çıkışı yapar', sistem:'Hareket türü 601 → SMM borç / stok alacak ({{OBYC}})' },
      { rol:'Faturalama', eylem:'Fatura keser', sistem:'{{VF01}} / {{VF04}} → müşteri borç / gelir alacak ({{VKOA}})' },
      { rol:'AR muhasebe', eylem:'Aktarım durumunu kontrol eder', sistem:'{{SE16N}} → {{VBRK}} `RFBSK`' },
      { rol:'FI danışmanı', eylem:'{{VKOA}} eksiğini giderir', sistem:'{{VKOA}} → {{T030}}' },
      { rol:'Faturalama', eylem:'Yeniden aktarır', sistem:'{{VF02}} → *Muhasebeye aktar*' },
      { rol:'AR muhasebe', eylem:'Tahsilatı kaydeder', sistem:'{{F-28}}, {{FEBAN}}' },
      { rol:'Faturalama', eylem:'Yanlış faturayı iptal eder', sistem:'{{VF11}} — **{{FB08}} değil**' },
    ],

    veriAkisi:{
      nereden:'Satış siparişi ve teslimat; müşteri ana verisi ({{KNVV}} hesap belirleme grubu); ' +
              'malzeme ana verisi (hesap belirleme grubu); fiyatlandırma koşulları; {{VKOA}} kuralları.',
      nereye:'FI belgelerine ({{BKPF}}/{{BSEG}}/{{ACDOCA}}), müşteri açık kalemlerine ({{BSID}}), ' +
             'gelir hesaplarına; CO-PA tarafında kârlılık analizine.',
      tetikleyen:'Faturanın kesilmesi. Sipariş ve teslimat gelir üretmez.',
      sonraki:'Tahsilat, yaşlandırma, dönem sonu gelir tahakkuku.',
    },

    notlar:[
      { tip:'warn', baslik:'SD hatası sessizdir — MM hatası gürültülü', metin:
        'Bu, iki entegrasyon arasındaki **en önemli pratik farktır**:\n\n' +
        '**MM’de** {{OBYC}} eksikse mal girişi **yapılamaz** — kullanıcı hata alır, iş durur, ' +
        'sorun anında fark edilir.\n\n' +
        '**SD’de** {{VKOA}} eksikse fatura **kesilir**; yalnızca FI belgesi oluşmaz. ' +
        'Satış ekibi memnun, müşteriye fatura gitti, kimse hata görmedi — ' +
        'ama **gelir muhasebeye düşmedi**.\n\n' +
        'Bu yüzden `RFBSK` = "A" olan faturaların **günlük izlenmesi** zorunludur. ' +
        'Aylık fark edilirse mizan yanlış çıkar ve düzeltme kapanış sırasında yapılır.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'SD zincirinde **iki ayrı muhasebe olayı** vardır ve farklı kaynaklardan gelirler: ' +
      'maliyet MM’den ({{OBYC}}), gelir SD’den ({{VKOA}}). ' +
      'Aşağıdaki örneklerde bu ayrımı takip et.',

    etkilenenHesaplar:[
      { hesap:'120 Alıcılar (mutabakat)', tur:'Bilanço — Varlık', neden:'Müşteri alacağı. Hesabı {{KNB1}} `AKONT` belirler, {{VKOA}} değil.' },
      { hesap:'600 Yurtiçi satışlar / 601 Yurtdışı', tur:'Gelir tablosu', neden:'{{VKOA}} → hesap anahtarı **ERL** (gelir). Müşteri ve malzeme grubuna göre ayrışır.' },
      { hesap:'611 Satış iskontoları', tur:'Gelir tablosu — Gelir azaltıcı', neden:'{{VKOA}} → hesap anahtarı **ERS**. İskonto koşulları buraya yazılır.' },
      { hesap:'602 Navlun geliri', tur:'Gelir tablosu', neden:'{{VKOA}} → hesap anahtarı **ERF**. Müşteriye yansıtılan nakliye.' },
      { hesap:'391 Hesaplanan KDV', tur:'Bilanço — Kaynak', neden:'{{OB40}} → hesap anahtarı MWS. {{VKOA}} değil.' },
      { hesap:'621 Satılan malın maliyeti', tur:'Gelir tablosu — Gider', neden:'**Mal çıkışında** oluşur; {{OBYC}} → **GBB/VAX**. Faturadan bağımsızdır.' },
      { hesap:'153 Ticari mallar (stok)', tur:'Bilanço — Varlık', neden:'Mal çıkışında azalır; {{OBYC}} → **BSX**.' },
    ],

    fisler:[
      { baslik:'Adım 1 — Mal çıkışı (teslimat) · **maliyet tarafı, MM’den**',
        belgeTuru:'WL', tarih:'12.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'621', ad:'Satılan ticari mal maliyeti', borc:60000, not:'{{OBYC}} → **GBB/VAX**' },
          { hesap:'153', ad:'Ticari mallar (stok)', alacak:60000, not:'{{OBYC}} → **BSX**' },
        ],
        not:'**Gelir yok, müşteri alacağı yok.** Yalnızca maliyet kaydedildi. ' +
             'Bu bir **MM hareketidir** (hareket türü 601) ve {{VKOA}} devreye girmez.\n\n' +
             'Bu ara durum "sevk edildi, faturalanmadı" olarak izlenir ve ' +
             'dönem sonunda gelir tahakkuku gerektirebilir.' },

      { baslik:'Adım 2 — Fatura kesilir ({{VF01}}) · **gelir tarafı, SD’den**',
        belgeTuru:'RV', tarih:'15.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar — C-5001', borc:120000, not:'{{KNB1}} `AKONT` — {{VKOA}} değil' },
          { hesap:'600', ad:'Yurtiçi satışlar', alacak:100000, not:'{{VKOA}} → **ERL**' },
          { hesap:'391', ad:'Hesaplanan KDV', alacak:20000, not:'{{OB40}} → MWS' },
        ],
        not:'**Gelir burada doğdu.** Muhasebeci hiçbir şey girmedi; fatura kesilince otomatik oluştu.\n\n' +
             'Bu satışın kârı: 100.000 gelir − 60.000 maliyet = **40.000 TL**. ' +
             'Ama maliyet 12 Nisan’da, gelir 15 Nisan’da kaydedildi — ' +
             'iki gün boyunca gelir tablosu eksik göründü.' },

      { baslik:'İskontolu fatura — {{VKOA}} birden çok hesap anahtarı kullanır',
        belgeTuru:'RV', tarih:'15.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Alıcılar — C-5001', borc:116400, not:'Net 97.000 + KDV 19.400' },
          { hesap:'600', ad:'Yurtiçi satışlar', alacak:100000, not:'{{VKOA}} → **ERL**' },
          { hesap:'611', ad:'Satış iskontoları', borc:5000, not:'{{VKOA}} → **ERS** — geliri azaltır' },
          { hesap:'602', ad:'Navlun geliri', alacak:2000, not:'{{VKOA}} → **ERF**' },
          { hesap:'391', ad:'Hesaplanan KDV', alacak:19400, not:'{{OB40}} → 97.000 × %20' },
        ],
        not:'Tek bir faturada **üç ayrı hesap anahtarı** çalıştı: gelir (ERL), iskonto (ERS), ' +
             'navlun (ERF). Her biri fiyatlandırma koşulundan gelir ve {{VKOA}}’da ayrı tanımlanır.\n\n' +
             'Net gelir: 100.000 − 5.000 + 2.000 = **97.000 TL**. ' +
             'KDV bu **net tutar üzerinden** hesaplanır: 97.000 × %20 = 19.400 TL. ' +
             'İskonto geliri azalttığı için KDV matrahını da azaltır — sık yapılan bir hata, ' +
             'KDV’yi brüt 100.000 üzerinden hesaplamaktır.' },

      { baslik:'Alacak dekontu (iade) — faturanın tersi',
        belgeTuru:'RV', tarih:'20.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'600', ad:'Yurtiçi satışlar', borc:20000, not:'Gelir azaldı' },
          { hesap:'391', ad:'Hesaplanan KDV', borc:4000 },
          { hesap:'120', ad:'Alıcılar — C-5001', alacak:24000, not:'Müşteri borcu azaldı' },
        ],
        not:'İade edilen mal için ayrıca **mal girişi** yapılır (hareket türü 651/652) ve ' +
             'stok geri artar, satılan malın maliyeti azalır. ' +
             'Yani iade de **iki ayrı kayıt** üretir: gelir tarafı SD’den, maliyet tarafı MM’den.' },

      { baslik:'Dönem sonu — sevk edildi, faturalanmadı ({{FBS1}})',
        belgeTuru:'SA', tarih:'30.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'181', ad:'Gelir tahakkukları', borc:85000, not:'Faturalanmamış teslimatlar' },
          { hesap:'600', ad:'Yurtiçi satışlar', alacak:85000, not:'Gelir doğru döneme yazıldı' },
        ],
        not:'Nisan sonunda sevk edilmiş ama faturalanmamış teslimatlar var. ' +
             'Maliyet zaten kaydedilmişti (mal çıkışıyla); gelir ise eksikti. ' +
             '{{tahakkuk}} ile gelir doğru döneme yazılır.\n\n' +
             'Bu kayıt **ters kaydedilir** — Mayısta gerçek fatura kesilecek.' },
    ],

    tHesaplar:[
      { hesap:'Alıcılar (mutabakat)', kod:'120',
        borc:[{ ad:'SD faturaları', tutar:234000 }],
        alacak:[{ ad:'Tahsilatlar', tutar:120000 }, { ad:'İade dekontu', tutar:24000 }],
        not:'Hesabı KNB1-AKONT belirler' },
      { hesap:'Yurtiçi satışlar', kod:'600 (gelir)',
        borc:[{ ad:'İade', tutar:20000 }],
        alacak:[{ ad:'Faturalar', tutar:200000 }, { ad:'Gelir tahakkuku', tutar:85000 }],
        not:'VKOA → ERL' },
      { hesap:'Satılan malın maliyeti', kod:'621 (gider)',
        borc:[{ ad:'Mal çıkışları', tutar:120000 }],
        alacak:[{ ad:'İade girişi', tutar:12000 }],
        not:'OBYC → GBB/VAX — MM’den gelir' },
      { hesap:'Satış iskontoları', kod:'611',
        borc:[{ ad:'Verilen iskontolar', tutar:5000 }],
        alacak:[],
        not:'VKOA → ERS' },
    ],

    notlar:[
      { tip:'tip', baslik:'Maliyet MM’den, gelir SD’den — neden ayrı?', metin:
        'Mal çıkışı bir **stok hareketidir** ve MM’in konusudur: stok azalır, maliyet oluşur. ' +
        'Hesapları {{OBYC}} belirler (GBB/VAX işlem anahtarı).\n\n' +
        'Fatura ise bir **satış işlemidir** ve SD’nin konusudur: alacak doğar, gelir oluşur. ' +
        'Hesapları {{VKOA}} belirler.\n\n' +
        'Bu ayrım pratik sonuç doğurur: "satılan malın maliyeti yanlış hesaba gidiyor" sorunu ' +
        '{{VKOA}}’da değil **{{OBYC}}**’de çözülür. Tersine "gelir yanlış hesapta" sorunu ' +
        '{{VKOA}}’dadır. Yanlış yerde aramak saatler kaybettirir.' },
      { tip:'warn', baslik:'Müşteri hesabını VKOA belirlemez', metin:
        'Yaygın bir yanlış anlama: {{VKOA}} **yalnızca gelir tarafındaki** hesapları belirler ' +
        '(gelir, iskonto, navlun).\n\n' +
        'Müşteri satırının hesabı (120 Alıcılar) {{KNB1}} `AKONT` alanından gelir — ' +
        '{{mutabakat-hesabi}} mantığıyla, tıpkı elle girilen faturalarda olduğu gibi.\n\n' +
        'KDV hesabı ise {{OB40}}’tan gelir. Yani tek bir SD faturasında **üç ayrı kaynak** çalışır.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'SD entegrasyonunda çeşitlenme üç eksende olur: **fatura tipi**, **hesap anahtarı** ve ' +
      '**gelir tanıma zamanı**.',

    liste:[
      { ad:'Standart fatura', en:'Invoice (F2)',
        aciklama:'Normal satış faturası. Müşteri borçlanır, gelir ve KDV alacaklanır.',
        neZaman:'Teslimat sonrası normal satışlarda.',
        ornek:'Belge türü **RV**. {{VKOA}} → ERL gelir hesabı.',
        tcodes:['VF01','VF04'] },

      { ad:'Alacak dekontu', en:'Credit Memo (G2)',
        aciklama:'İade, iskonto veya düzeltme için müşteriye kesilen belge. Faturanın tersidir.',
        neZaman:'Mal iadesi, fiyat düzeltmesi, sonradan verilen ciro primi.',
        ornek:'Gelir borç / müşteri alacak. Mal fiziksel olarak da dönerse ayrıca mal girişi yapılır.',
        tcodes:['VF01'] },

      { ad:'Borç dekontu', en:'Debit Memo (L2)',
        aciklama:'Müşteriye ek borç yazma. Eksik faturalanmış tutar, gecikme faizi, ek masraf.',
        neZaman:'Fiyat düzeltmesi yukarı yönlü olduğunda.',
        ornek:'Müşteri borç / gelir alacak — normal faturayla aynı yönde.' },

      { ad:'Peşin fatura', en:'Proforma / Down Payment Request',
        aciklama:'Ödeme talebi; muhasebe kaydı **üretmez** (proforma) veya istatistiksel kayıt üretir.',
        neZaman:'Peşin tahsilat gereken satışlarda, ihracat belgelerinde.',
        ornek:'Proforma FI’a hiç düşmez. Avans talebi {{ozel-ana-muhasebe-gostergesi}} ile izlenir.' },

      { ad:'ERL — Gelir', en:'Revenue Account Key',
        aciklama:'Ana satış geliri. {{VKOA}}’da müşteri ve malzeme grubuna göre farklı hesaplara yönlendirilir.',
        neZaman:'Her satış faturasında.',
        ornek:'Yurtiçi müşteri + normal ürün → 600. Yurtdışı müşteri → 601.',
        tcodes:['VKOA'] },

      { ad:'ERS — İskonto', en:'Sales Deduction Account Key',
        aciklama:'Verilen iskontolar. Geliri azaltan ayrı bir hesapta izlenir.',
        neZaman:'Fiyatlandırmada iskonto koşulu varsa.',
        ornek:'611 Satış iskontoları — brüt gelir ile net gelir arasındaki farkı gösterir.',
        tcodes:['VKOA'] },

      { ad:'ERF — Navlun', en:'Freight Account Key',
        aciklama:'Müşteriye yansıtılan nakliye bedeli.',
        neZaman:'Navlun ayrı kalem olarak faturalandığında.',
        ornek:'602 Navlun geliri — satış gelirinden ayrı izlenir.',
        tcodes:['VKOA'] },

      { ad:'Anında gelir tanıma', en:'Immediate Revenue Recognition',
        aciklama:'Gelir fatura kesildiği anda kaydedilir. SAP’ın varsayılan davranışıdır.',
        neZaman:'Mal satışında; teslim ile birlikte risk ve fayda devredildiğinde.',
        ornek:'Fatura kesildi → 600 hesabı alacaklandı.' },

      { ad:'Dönemsel gelir tanıma', en:'Deferred Revenue Recognition',
        aciklama:'Gelir zamana yayılarak tanınır; fatura anında **ertelenmiş gelir** hesabına yazılır.',
        neZaman:'Yıllık bakım sözleşmeleri, abonelikler, hizmet paketleri.',
        ornek:'12 aylık bakım sözleşmesi faturalandı → 380 ertelenmiş gelir; her ay 1/12’si 600’e aktarılır.' },
    ],

    karsilastirmaBasliklar:['MM entegrasyonu', 'SD entegrasyonu'],
    karsilastirma:[
      ['Hesap belirleme', '**{{OBYC}}**', '**{{VKOA}}**'],
      ['Ne belirler', 'Stok, GR/IR, fiyat farkı, tüketim', 'Gelir, iskonto, navlun'],
      ['Kriterler', 'İşlem anahtarı + {{degerleme-sinifi}}', 'Satış org. + müşteri grubu + malzeme grubu + hesap anahtarı'],
      ['İş ortağı hesabı', '{{LFB1}} `AKONT`', '{{KNB1}} `AKONT` — VKOA belirlemez'],
      ['Hata davranışı', '**Gürültülü** — belge hiç oluşmaz, iş durur', '**Sessiz** — SD faturası oluşur, FI belgesi oluşmaz'],
      ['Hata tespiti', 'Anında (kullanıcı hata alır)', '{{VBRK}} `RFBSK` = "A" izlenmeli'],
      ['Düzeltme', 'Kaynaktan iptal: {{MR8M}}', 'Kaynaktan iptal: {{VF11}}'],
      ['Sonuç tablosu', '{{T030}}', '{{T030}} — **aynı tablo**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'VKOA', ad:'SD gelir hesabı belirleme — entegrasyonun merkezi',
        amac:'Satış faturasının gelir, iskonto ve navlun tutarlarının hangi G/L hesabına gideceğini tanımlar.',
        neZaman:'Kurulumda; yeni ürün grubu veya müşteri grubu eklendiğinde; ' +
                '"fatura muhasebeye düşmedi" sorununda.',
        adimlar:[
          { baslik:'Erişim sırasını (access sequence) seç',
            aciklama:'{{VKOA}} birden çok tablo katmanı sunar; sistem **en özelden en genele** doğru arar. ' +
                     'İlk eşleşen kural kullanılır.' },
          { baslik:'En yaygın katman: satış org. + müşteri grubu + malzeme grubu + hesap anahtarı',
            aciklama:'**Hesap belirleme grupları** müşteri ({{KNVV}}) ve malzeme ana verisinden gelir. ' +
                     'Bunlar {{VKOA}}’nın ayrım kriteridir.' },
          { baslik:'Hesap anahtarını gir',
            aciklama:'**ERL** gelir, **ERS** iskonto, **ERF** navlun. ' +
                     'Anahtar, fiyatlandırma koşulundan gelir.' },
          { baslik:'G/L hesabını ata' },
          { baslik:'Genel bir yedek kural tanımla',
            aciklama:'En genel katmanda (yalnız satış org. + hesap anahtarı) bir varsayılan hesap tanımlamak, ' +
                     '"hesap bulunamadı" hatalarını önler. Ama bu, yanlış sınıflamayı da gizleyebilir — ' +
                     'bilinçli bir tercih olmalıdır.' },
        ],
        ekranAkisi:[
          { ekran:'Erişim sırası', islem:'Tablo 001: Satış org. + Müşteri grubu + Malzeme grubu + Hesap anahtarı' },
          { ekran:'Kayıtlar', islem:'1000 + 01 (yurtiçi) + 01 (normal ürün) + ERL → 600000' },
          { ekran:'Yeni satır', islem:'1000 + 01 + **03 (organik ürün)** + ERL → 600300' },
          { ekran:'İskonto satırı', islem:'1000 + 01 + 03 + **ERS** → 611000' },
        ],
        alanlar:{
          zorunlu:['Satış organizasyonu','Hesap anahtarı','G/L hesabı'],
          opsiyonel:['Müşteri hesap belirleme grubu','Malzeme hesap belirleme grubu','Hesap planı','Bölüm'] },
        hatalar:[
          { mesaj:'Document ... saved (no accounting document generated)', sebep:'{{VKOA}}’da ilgili kombinasyon için hesap tanımsız — **en sık SD entegrasyon hatası**.', cozum:'{{VKOA}}’da eksik satırı ekle, sonra {{VF02}} → *Muhasebeye aktar*. **Faturayı iptal etme.**' },
          { mesaj:'Error in account determination: table T030K key ...', sebep:'Vergi hesap belirlemesi eksik ({{OB40}}).', cozum:'{{OB40}} ile vergi hesabını tanımla — bu {{VKOA}}’nın değil vergi yapılandırmasının konusudur.' },
        ],
        ipucu:'{{VKOA}}’nın ayrım kriterleri **ana veriden** gelir: müşterinin hesap belirleme grubu ' +
              '({{KNVV}}) ve malzemenin hesap belirleme grubu. Yeni bir ürün grubu tanımlandığında ' +
              'bu grup {{VKOA}}’da **mutlaka** karşılığını bulmalıdır — yoksa fatura sessizce ' +
              'muhasebeye düşmez.',
        ilgili:['VF01','VF02','VBRK','T030','OB40'] },

      { kod:'VF01', ad:'SD faturası oluştur',
        amac:'Satış siparişi veya teslimat üzerinden fatura keser; FI belgesi otomatik oluşur.',
        neZaman:'Teslimat sonrası, faturalama sürecinde.',
        adimlar:[
          { baslik:'Faturalanacak belgeyi gir', aciklama:'Teslimat numarası veya sipariş numarası.' },
          { baslik:'Fatura tipini kontrol et', aciklama:'**F2** standart fatura, **G2** alacak dekontu, **L2** borç dekontu.' },
          { baslik:'Kalemleri ve fiyatlandırmayı incele',
            aciklama:'Fiyatlandırma koşulları ({{VKOA}} hesap anahtarlarını tetikleyen yapı) burada görünür.' },
          { baslik:'Kaydet',
            aciklama:'SD faturası ({{VBRK}}/{{VBRP}}) ve FI belgesi birlikte oluşmalıdır.' },
          { baslik:'**Aktarım durumunu doğrula**',
            aciklama:'{{VBRK}} `RFBSK` = **C** olmalı. "A" ise FI belgesi oluşmamıştır.' },
        ],
        alanlar:{
          zorunlu:['Faturalanacak belge','Fatura tipi','Faturalama tarihi'],
          opsiyonel:['Fiyatlandırma tarihi','Ödeme koşulu','Metin'] },
        hatalar:[
          { mesaj:'Document ... saved (no accounting document generated)', sebep:'{{VKOA}} eksik — en sık sebep. Diğer ihtimaller: FI dönemi kapalı, gelir hesabı bloklu, {{belge-bolme}} hatası.', cozum:'{{VBRK}} `RFBSK` kontrol et; eksiği gider; {{VF02}} ile yeniden aktar.' },
          { mesaj:'Posting period is not open', sebep:'FI dönemi kapalı (hesap tipi D veya S).', cozum:'{{OB52}} ile aç, sonra {{VF02}} ile yeniden aktar.' },
          { mesaj:'Billing document could not be created — no items', sebep:'Teslimat faturalanmış veya faturalama bloğu var.', cozum:'Satış siparişindeki faturalama bloğunu ve teslimat durumunu kontrol et.' },
        ],
        ipucu:'"Fatura kesildi ama muhasebeye düşmedi" şikâyetinde **fatura asla iptal edilmez**. ' +
              'Eksik giderilip {{VF02}} → *Muhasebeye aktar* ile yeniden denenir. ' +
              'İptal edilirse SD numarası boşa gider ve müşteriye gitmiş fatura ile sistem tutarsızlaşır.',
        ilgili:['VF02','VF04','VF11','VKOA','VBRK'] },

      { kod:'VF02', ad:'Faturayı değiştir / muhasebeye aktar',
        amac:'Muhasebeye aktarılamamış SD faturasını yeniden aktarır.',
        neZaman:'`RFBSK` = "A" olan her faturada, eksik giderildikten sonra.',
        adimlar:[
          { baslik:'Fatura numarasını gir' },
          { baslik:'Menüden *Muhasebeye aktar* (Release to accounting) seç',
            aciklama:'Sistem hesap belirlemeyi yeniden dener.' },
          { baslik:'Hata mesajını oku',
            aciklama:'Aktarım yine başarısızsa **detaylı hata mesajı** burada görünür — ' +
                     '{{VF01}}’dekinden daha açıklayıcıdır.' },
          { baslik:'Başarılıysa `RFBSK` = C olur ve FI belgesi oluşur' },
        ],
        ipucu:'**Bu ekrandaki hata mesajı en değerli teşhis kaynağıdır.** {{VF01}} yalnızca ' +
              '"muhasebe belgesi oluşmadı" der; {{VF02}} → *Muhasebeye aktar* hangi hesap ' +
              'belirleme kombinasyonunun eksik olduğunu **tam olarak** söyler.',
        hatalar:[
          { mesaj:'Account determination error for key 1000 01 03 ERL', sebep:'{{VKOA}}’da bu kombinasyon tanımsız.', cozum:'Mesajdaki dörtlüyü {{VKOA}}’ya gir: satış org. + müşteri grubu + malzeme grubu + hesap anahtarı.' },
        ],
        ilgili:['VF01','VKOA','VBRK','VF11'] },

      { kod:'VF11', ad:'SD faturasını iptal et',
        amac:'SD faturasını iptal eder ve FI belgesini ters kaydeder.',
        neZaman:'Fatura gerçekten yanlışsa (tutar, müşteri, ürün hatası).',
        adimlar:[
          { baslik:'Fatura numarasını gir' },
          { baslik:'İptal fatura tipini kontrol et', aciklama:'S1 (fatura iptali) veya S2 (dekont iptali).' },
          { baslik:'Kaydet — iptal belgesi ve FI ters kaydı oluşur' },
        ],
        ipucu:'**{{VF11}} ile {{FB08}} karıştırılmamalıdır.** SD faturası FI’dan iptal edilirse ' +
              'FI düzelir ama SD tarafı "faturalanmış" görünmeye devam eder; ' +
              'teslimat yeniden faturalanamaz ve iki modül tutarsızlaşır.\n\n' +
              'Ayrıca: **muhasebeye düşmeyen fatura iptal edilmez** — düzeltilip {{VF02}} ile aktarılır.',
        hatalar:[
          { mesaj:'Cancellation not possible — document already cleared', sebep:'FI belgesindeki müşteri kalemi tahsil edilmiş.', cozum:'Önce {{FBRA}} ile kapatmayı geri al, sonra iptal et.' },
        ],
        ilgili:['VF01','VF02','FB08','FBRA'] },

      { kod:'VF04', ad:'Faturalama listesi (toplu fatura)',
        amac:'Faturalanmayı bekleyen teslimatları toplu olarak faturalar.',
        neZaman:'Günlük veya haftalık faturalama rutininde; ay sonu kapanışında.',
        adimlar:[
          { baslik:'Faturalama tarihi ve satış organizasyonunu gir' },
          { baslik:'Faturalanacak belge listesini incele' },
          { baslik:'Toplu faturala',
            aciklama:'Her belge için ayrı fatura ve FI belgesi oluşur.' },
          { baslik:'**Log’u kontrol et**',
            aciklama:'Hangi belgeler faturalanamadı, hangileri muhasebeye aktarılamadı — burada görünür.' },
        ],
        ipucu:'Ay sonu kapanışında {{VF04}} çalıştırılarak **faturalanmayı bekleyen teslimat kalmadığı** ' +
              'doğrulanır. Kalan varsa gelir eksik kalır ve tahakkuk gerekir.',
        ilgili:['VF01','VF02','VBRK'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'SD entegrasyonunda iki tablo kritiktir: {{VBRK}} (fatura başlığı — **aktarım durumu burada**) ve ' +
      '{{VBRP}} (kalemler — hesap belirleme kriterleri burada). ' +
      'Hesap belirleme kuralları ise MM ile **aynı tabloda** ({{T030}}) tutulur.',

    liste:[
      { ad:'VBRK', baslik:'SD fatura başlığı',
        tutar:'Faturanın müşterisi, tarihi, net tutarı, para birimi ve **muhasebeye aktarım durumu**.',
        olusturan:'{{VF01}} / {{VF04}}',
        guncelleyen:'{{VF01}}, {{VF02}}, {{VF11}}',
        anahtar:'VBELN',
        iliskiler:'{{VBRP}} kalemleri; {{BKPF}} ile `AWKEY` üzerinden FI belgesi.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'RFBSK', aciklama:'**Aktarım durumu** — **C** aktarıldı, **A** aktarılmadı, **B** kısmen. SD entegrasyon teşhisinin ilk adresi.' },
          { ad:'FKART', aciklama:'Fatura tipi: F2 standart, G2 alacak dekontu, L2 borç dekontu, S1 iptal' },
          { ad:'KUNRG', aciklama:'Fatura alıcısı (payer)', tip:'fk' },
          { ad:'NETWR', aciklama:'Net fatura tutarı' },
          { ad:'FKDAT', aciklama:'Faturalama tarihi — FI belgesinin kayıt tarihi' },
        ] },

      { ad:'VBRP', baslik:'SD fatura kalemleri',
        tutar:'Fatura satırları: malzeme, miktar, net değer ve **hesap belirleme grupları**.',
        olusturan:'{{VF01}}',
        guncelleyen:'{{VF01}}, {{VF02}}',
        anahtar:'VBELN + POSNR',
        iliskiler:'{{VBRK}} başlığı; {{VKOA}} hesap belirlemesinin girdisi.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'MATNR', aciklama:'Malzeme numarası' },
          { ad:'KTGRM', aciklama:'**Malzeme hesap belirleme grubu** — {{VKOA}}’nın ana kriteri' },
          { ad:'PRCTR', aciklama:'{{kar-merkezi}} — gelirin hangi birime yazılacağı' },
          { ad:'NETWR', aciklama:'Kalem net değeri' },
        ] },

      { ad:'KNVV', baslik:'Müşteri satış alanı verisi',
        tutar:'Müşterinin satış organizasyonu bazında verisi — **hesap belirleme grubu** dâhil.',
        olusturan:'{{BP}} → Customer (Sales) rolü veya {{XD01}}',
        guncelleyen:'{{BP}}, {{XD02}}',
        anahtar:'KUNNR + VKORG + VTWEG + SPART',
        iliskiler:'{{VKOA}} hesap belirlemesinin ikinci kriteri.',
        s4:'{{BP}} üzerinden doldurulur.',
        alanlar:[
          { ad:'KTGRD', aciklama:'**Müşteri hesap belirleme grubu** — yurtiçi/yurtdışı ayrımı burada yapılır' },
          { ad:'VKORG / VTWEG / SPART', aciklama:'Satış alanı — {{VKOA}}’nın birinci kriteri' },
        ] },

      { ad:'KNB1', baslik:'Müşteri şirket kodu verisi',
        tutar:'Müşterinin muhasebe verisi — **mutabakat hesabı burada**.',
        olusturan:'{{BP}} → FI Customer rolü',
        guncelleyen:'{{BP}}, {{FD02}}',
        anahtar:'KUNNR + BUKRS',
        iliskiler:'SD faturasındaki müşteri satırının hesabı buradan gelir — **{{VKOA}} değil**.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'AKONT', aciklama:'**{{mutabakat-hesabi}}** — 120 Alıcılar. VKOA bunu belirlemez.' },
        ] },

      { ad:'T030', baslik:'Otomatik hesap belirleme',
        tutar:'Hem {{OBYC}} (MM) hem {{VKOA}} (SD) hem {{OB40}} (vergi) kurallarını tutan **ortak tablo**.',
        olusturan:'{{VKOA}}, {{OBYC}}, {{OB40}}',
        guncelleyen:'İlgili yapılandırma işlemleri',
        anahtar:'KTOPL + KTOSL + ... (erişim sırasına göre değişir)',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KTOSL', aciklama:'**Hesap anahtarı**: SD tarafında ERL, ERS, ERF; MM tarafında BSX, WRX, PRD' },
          { ad:'KONTS', aciklama:'Belirlenen G/L hesabı' },
        ] },

      { ad:'BSID', baslik:'Müşteri açık kalemleri',
        tutar:'SD faturasının ürettiği müşteri alacağı burada açık kalem olarak durur.',
        olusturan:'SD faturasının FI belgesi',
        guncelleyen:'Tahsilat kapatınca {{BSAD}}’a taşınır',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'SD–FI tablo köprüsü',
      varliklar:[
        { ad:'KNVV', rol:'Ana veri', aciklama:'Müşteri satış verisi',
          alanlar:[{ ad:'KUNNR', tip:'pk' }, { ad:'VKORG', tip:'pk' }, { ad:'KTGRD' }] },
        { ad:'KNB1', rol:'Ana veri', aciklama:'Müşteri muhasebe verisi',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT', tip:'fk' }] },
        { ad:'VBRK', rol:'SD', hub:true, aciklama:'Fatura başlığı',
          alanlar:[{ ad:'VBELN', tip:'pk' }, { ad:'KUNRG', tip:'fk' }, { ad:'RFBSK' }, { ad:'FKART' }] },
        { ad:'VBRP', rol:'SD', aciklama:'Fatura kalemleri',
          alanlar:[{ ad:'VBELN', tip:'fk' }, { ad:'POSNR', tip:'pk' }, { ad:'KTGRM' }, { ad:'PRCTR' }] },
        { ad:'T030', rol:'Yapılandırma', aciklama:'Hesap belirleme (VKOA)',
          alanlar:[{ ad:'KTOSL', tip:'pk' }, { ad:'KONTS' }] },
        { ad:'BKPF', rol:'FI', aciklama:'FI belgesi',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'AWTYP' }, { ad:'AWKEY' }] },
        { ad:'BSEG', rol:'FI', aciklama:'FI kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'KUNNR', tip:'fk' }, { ad:'HKONT' }] },
        { ad:'BSID', rol:'İndeks', aciklama:'Müşteri açık kalemleri',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }] },
      ],
      iliskiler:[
        { from:'KNVV', to:'VBRP', alanlar:'KTGRD → hesap belirleme', not:'müşteri grubu kriteri' },
        { from:'VBRP', to:'T030', alanlar:'KTGRM → hesap belirleme', not:'malzeme grubu kriteri' },
        { from:'VBRK', to:'VBRP', alanlar:'VBELN', not:'fatura → kalemler' },
        { from:'VBRK', to:'BKPF', alanlar:'VBELN → AWKEY', not:'SD faturası → FI belgesi' },
        { from:'KNB1', to:'BSEG', alanlar:'AKONT → HKONT', not:'müşteri satırının hesabı' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'başlık → kalem' },
        { from:'BSEG', to:'BSID', alanlar:'BELNR + BUZEI', not:'müşteri açık kalemi' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'FI danışmanı için SD tarafında üç ekran önemlidir: **{{VKOA}}** (yapılandırma), ' +
      '**{{VF02}}** (yeniden aktarım ve teşhis) ve **{{VBRK}} sorgusu** (aktarım durumu izleme).',

    ekranlar:[
      { ad:'{{VKOA}} — hesap belirleme ekranı',
        aciklama:'Erişim sırası seçilir, sonra kombinasyon bazında hesap atanır.',
        alanlar:[
          { ad:'Erişim sırası / tablo', zorunlu:true, aciklama:'Birden çok katman vardır; sistem **en özelden en genele** arar ve ilk eşleşeni kullanır.' },
          { ad:'Satış organizasyonu', zorunlu:true, aciklama:'Birinci kriter. Farklı satış org. farklı gelir hesabı kullanabilir.' },
          { ad:'Müşteri hesap belirleme grubu (`KTGRD`)', zorunlu:false, aciklama:'{{KNVV}}’den gelir. Yurtiçi/yurtdışı ayrımı genelde burada yapılır.' },
          { ad:'Malzeme hesap belirleme grubu (`KTGRM`)', zorunlu:false, aciklama:'Malzeme ana verisinden gelir. Ürün grubu bazında gelir ayrımı sağlar.' },
          { ad:'Hesap anahtarı', zorunlu:true, aciklama:'**ERL** gelir, **ERS** iskonto, **ERF** navlun. Fiyatlandırma koşulundan gelir.' },
          { ad:'G/L hesabı', zorunlu:true, aciklama:'Belirlenen gelir/iskonto/navlun hesabı.' },
        ],
        ipucu:'**En genel katmanda bir yedek kural tanımlamak** "hesap bulunamadı" hatalarını önler ' +
              '(yalnız satış org. + hesap anahtarı → varsayılan gelir hesabı).\n\n' +
              'Ama dikkat: bu, yanlış sınıflamayı da **gizler**. Yeni ürün grubu eklendiğinde ' +
              'gelir varsayılan hesaba düşer ve kimse fark etmez. Bilinçli bir tercih olmalıdır.' },

      { ad:'{{VF02}} — muhasebeye aktar ve teşhis',
        aciklama:'SD entegrasyon sorunlarının çözüldüğü ekran. Hata mesajı burada en açıklayıcıdır.',
        alanlar:[
          { ad:'Fatura numarası', zorunlu:true, aciklama:'`RFBSK` = "A" olan fatura.' },
          { ad:'Menü → Muhasebeye aktar', zorunlu:true, aciklama:'Hesap belirleme yeniden denenir.' },
          { ad:'Hata mesajı', zorunlu:false, aciklama:'**En değerli çıktı.** Hangi kombinasyonun eksik olduğunu tam olarak söyler: "1000 01 03 ERL".' },
        ],
        ipucu:'{{VF01}} yalnızca "muhasebe belgesi oluşmadı" der. ' +
              '{{VF02}} → *Muhasebeye aktar* ise **eksik kombinasyonu tam olarak** verir. ' +
              'Teşhis her zaman buradan yapılır.' },

      { ad:'{{VBRK}} sorgusu — aktarım durumu izleme',
        aciklama:'SD entegrasyonunun **günlük kontrol noktası**.',
        alanlar:[
          { ad:'Tablo', zorunlu:true, aciklama:'{{SE16N}} → {{VBRK}}' },
          { ad:'Seçim: `RFBSK` = A', zorunlu:true, aciklama:'Muhasebeye **aktarılmamış** faturalar.' },
          { ad:'Tarih aralığı', zorunlu:false, aciklama:'Son 7 gün genelde yeterlidir.' },
          { ad:'Sonuç', zorunlu:false, aciklama:'Liste **boş olmalıdır**. Dolu ise gelir eksik raporlanıyor demektir.' },
        ],
        ipucu:'Bu sorguyu **günlük rutine** koy veya bir varyantla otomatikleştir. ' +
              'SD entegrasyon hatası sessizdir; tek erken uyarı budur.\n\n' +
              'S/4HANA’da Fiori "Billing Documents — Blocked for Accounting" uygulaması ' +
              'aynı işi görsel olarak yapar.' },
    ],

    zorunlu:['Satış organizasyonu','Hesap anahtarı','G/L hesabı','Faturalanacak belge','Fatura tipi'],
    opsiyonel:['Müşteri hesap belirleme grubu','Malzeme hesap belirleme grubu','Bölüm','Fiyatlandırma tarihi'],

    hatalar:[
      { mesaj:'Document ... saved (no accounting document generated)', sebep:'{{VKOA}}’da hesap belirleme eksik — **en sık sebep**. Diğerleri: FI dönemi kapalı, gelir hesabı bloklu, {{belge-bolme}} hatası.', cozum:'{{VF02}} → *Muhasebeye aktar* ile detaylı hata mesajını al; {{VKOA}}’yı tamamla; yeniden aktar. **Faturayı iptal etme.**' },
      { mesaj:'Account determination error for key 1000 01 03 ERL', sebep:'Bu kombinasyon {{VKOA}}’da tanımsız.', cozum:'Mesajdaki dörtlüyü {{VKOA}}’ya gir: satış org. 1000 + müşteri grubu 01 + malzeme grubu 03 + anahtar ERL.' },
      { mesaj:'Posting period ... is not open for account type D', sebep:'FI dönemi müşteri hesap tipi için kapalı.', cozum:'{{OB52}}’de **D** satırında dönemi aç, {{VF02}} ile yeniden aktar.' },
      { mesaj:'G/L account ... is blocked for posting', sebep:'Gelir hesabı {{FS00}}’da kayda kapatılmış.', cozum:'Bloğun sebebini araştır; gerekiyorsa kaldır.' },
      { mesaj:'Tax code ... does not exist', sebep:'SD fiyatlandırmasından gelen vergi kodu FI’da tanımsız.', cozum:'{{FTXP}} ile tanımla; SD ile FI vergi kodlarının uyumlu olduğunu doğrula.' },
      { mesaj:'Cancellation not possible — document already cleared', sebep:'{{VF11}} denendi ama müşteri kalemi tahsil edilmiş.', cozum:'Önce {{FBRA}} ile kapatmayı geri al, sonra iptal et.' },
      { mesaj:'Ledger 0L: document splitting error', sebep:'{{belge-bolme}} kuralları SD kalemini sınıflandıramadı.', cozum:'Belge bölme karakteristiklerini ve kalem kategorisi atamalarını kontrol et.' },
    ],

    ipuclari:[
      '**{{VBRK}} `RFBSK` = "A" sorgusunu günlük rutine koy.** SD entegrasyon hatası sessizdir; ' +
      'tek erken uyarı budur.',
      'Teşhis için {{VF01}} değil **{{VF02}} → Muhasebeye aktar** kullan — hata mesajı çok daha açıklayıcıdır.',
      'Muhasebeye düşmeyen faturayı **asla iptal etme**; düzelt ve yeniden aktar.',
      'Yeni ürün grubu veya müşteri grubu tanımlandığında {{VKOA}}’yı **önceden** tamamla; ' +
      'bu, MM’deki {{OMWB}} testinin SD karşılığıdır (SD’de eşdeğer bir simülasyon aracı yoktur).',
      'Ay sonu kapanışında {{VF04}} çalıştırıp **faturalanmayı bekleyen teslimat kalmadığını** doğrula; ' +
      'kalan varsa gelir eksik olur ve tahakkuk gerekir.',
      '"Satılan malın maliyeti yanlış hesapta" sorunu {{VKOA}}’da **değil** {{OBYC}}’dedir — ' +
      'maliyet MM’den gelir.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'VBRK', ne:'SD fatura başlığı; `RFBSK` aktarım durumu' },
      { tablo:'VBRP', ne:'Fatura kalemleri; hesap belirleme grupları ve kâr merkezi' },
      { tablo:'BKPF', ne:'FI belgesi; `AWTYP` = **VBRK**, `AWKEY` = SD fatura numarası' },
      { tablo:'BSEG', ne:'Müşteri, gelir, iskonto, KDV kalemleri' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler; kâr merkezi ve malzeme boyutlarıyla' },
      { tablo:'BSID', ne:'Müşteri açık kalemi' },
      { tablo:'BSET', ne:'Vergi satırları' },
    ],

    commit:
      'SD faturası **iki aşamalıdır** ve bu, MM’den en önemli farktır:\n\n' +
      '**Aşama 1:** SD belgesi ({{VBRK}}/{{VBRP}}) yazılır. Bu başarılıysa fatura **kesilmiştir**.\n\n' +
      '**Aşama 2:** muhasebe aktarımı denenir. Başarısız olursa `RFBSK` = "A" kalır ve ' +
      '**SD faturası yine de durur**.\n\n' +
      'MM’de böyle bir ara durum yoktur: hesap belirleme eksikse malzeme belgesi hiç oluşmaz. ' +
      'SD’de ise fatura oluşur, muhasebe oluşmaz — bu yüzden hata sessizdir ve ' +
      '`RFBSK` izlemesi zorunludur.',

    belgeNo:
      'SD faturası **iki numara** üretir: SD fatura numarası ({{VBRK}} `VBELN`) ve ' +
      'FI belge numarası ({{BKPF}} `BELNR`).\n\n' +
      'Çoğu kurulumda bu ikisi **aynı olacak şekilde** ayarlanır: SD fatura tipinin numara aralığı ile ' +
      'FI belge türünün (**RV**) numara aralığı eşitlenir. Bu, mutabakatı kolaylaştırır ama ' +
      'zorunlu değildir.\n\n' +
      'Aynı yapılmadıysa {{FB03}}’te SD numarasını aramak sonuç vermez — ' +
      '`AWKEY` üzerinden eşleştirme gerekir.',

    postingLogic:
      'SD faturasının FI’a aktarım zinciri:\n\n' +
      '**1. Fiyatlandırma koşulları** okunur; her koşulun bir **hesap anahtarı** vardır (ERL, ERS, ERF).\n' +
      '**2. Kriterler toplanır:** satış organizasyonu, müşteri hesap belirleme grubu ({{KNVV}} `KTGRD`), ' +
      'malzeme hesap belirleme grubu ({{VBRP}} `KTGRM`).\n' +
      '**3. {{VKOA}} sorgulanır:** erişim sırasına göre en özelden en genele aranır; ' +
      'ilk eşleşen kural kullanılır → {{T030}}’dan G/L hesabı.\n' +
      '**4. Müşteri hesabı** {{KNB1}} `AKONT`’tan alınır (VKOA değil).\n' +
      '**5. Vergi hesabı** {{OB40}}’tan alınır.\n' +
      '**6. FI belgesi üretilir** ve `RFBSK` = C yapılır.\n\n' +
      'Herhangi bir adım başarısızsa `RFBSK` = "A" kalır ve FI belgesi oluşmaz.',

    belgeTuru:
      'SD kaynaklı FI belgeleri **RV** (SD faturası) belge türünü kullanır. ' +
      'Bu tür {{OBA7}}’de tanımlıdır ve müşteri (D) ile ana muhasebe (S) hesap tiplerine izin verir. ' +
      'Mal çıkışı ise **WL** türünü kullanır ve MM tarafındandır.',

    numberRange:
      'Üç aralık ilgilidir: **SD fatura numarası** (SD tarafında, fatura tipine bağlı), ' +
      '**FI belge numarası** (RV türü için {{FBN1}}), ve **malzeme belgesi** (mal çıkışı için).\n\n' +
      'Yılbaşında hepsi açılmalıdır. SD ile FI aralıklarının eşitlendiği kurulumlarda ' +
      '**ikisinin de aynı anda** genişletilmesi gerekir; biri dolarsa diğeriyle senkron bozulur.',

    accountDetermination:
      '{{VKOA}} SD hesap belirlemesinin merkezidir. Kriterler:\n\n' +
      '**Satış organizasyonu** — hangi satış birimi.\n' +
      '**Müşteri hesap belirleme grubu** ({{KNVV}} `KTGRD`) — yurtiçi/yurtdışı, ilişkili taraf ayrımı.\n' +
      '**Malzeme hesap belirleme grubu** ({{VBRP}} `KTGRM`) — ürün grubu bazında gelir ayrımı.\n' +
      '**Hesap anahtarı** — **ERL** gelir, **ERS** iskonto, **ERF** navlun.\n\n' +
      'Erişim sırası **en özelden en genele** ilerler; ilk eşleşen kural kullanılır. ' +
      'Sonuç {{T030}}’a yazılır — MM ile **aynı tablo**.\n\n' +
      'Müşteri hesabı ({{KNB1}} `AKONT`) ve vergi hesabı ({{OB40}}) VKOA’nın konusu **değildir**.',

    tur:
      '**Özelleştirme:** {{VKOA}} hesap belirleme, erişim sıraları, fatura tipleri, ' +
      'hesap anahtarları, hesap belirleme grupları (tanımları).\n\n' +
      '**Ana veri:** müşteri ({{KNVV}} `KTGRD`, {{KNB1}} `AKONT`), malzeme ({{VBRP}} `KTGRM` kaynağı).\n\n' +
      '**Hareket verisi:** satış siparişleri, teslimatlar, faturalar.',

    transport:
      '{{VKOA}} ayarları ve erişim sıraları taşınır. ' +
      '**Ama dikkat:** kurallar G/L hesap numaralarına ve hesap belirleme gruplarına referans verir. ' +
      'Hedef sistemde hesaplar açılmamışsa veya müşteri/malzeme ana verisindeki gruplar farklıysa ' +
      'kurallar eşleşmez.\n\n' +
      'Bu yüzden test sisteminde çalışan bir faturalama senaryosu canlıda ' +
      '"no accounting document generated" verebilir.',

    img:[
      { yol:'SPRO → Satış ve Dağıtım → Temel Fonksiyonlar → Hesap Atama/Maliyetler → Gelir Hesabı Belirleme → Hesap Belirlemeyi Ata', not:'{{VKOA}} — entegrasyonun merkezi' },
      { yol:'SPRO → Satış ve Dağıtım → Temel Fonksiyonlar → Hesap Atama/Maliyetler → Gelir Hesabı Belirleme → Hesap Belirleme Gruplarını Tanımla', not:'Müşteri ve malzeme grupları' },
      { yol:'SPRO → Satış ve Dağıtım → Faturalama → Fatura Belgeleri → Fatura Tiplerini Tanımla', not:'F2, G2, L2, S1 — numara aralıkları ve FI belge türü ataması' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Satış/Satın Alma Vergisi → Kayıt → Vergi Hesaplarını Tanımla', not:'{{OB40}} — KDV hesabı' },
    ],

    ekstra:[
      { ic:'🔍', baslik:'RFBSK — SD entegrasyonunun tek erken uyarısı', metin:
        '{{VBRK}} tablosundaki `RFBSK` alanı faturanın muhasebeye aktarılıp aktarılmadığını söyler:\n\n' +
        '**C** — aktarıldı, FI belgesi var. Normal durum.\n' +
        '**A** — **aktarılmadı**. FI belgesi yok, gelir eksik.\n' +
        '**B** — kısmen aktarıldı (nadir).\n\n' +
        'Bu alanın izlenmesi neden zorunlu? Çünkü SD entegrasyon hatası **hiçbir yerde alarm üretmez**: ' +
        'satış ekibi faturayı kesti, müşteriye gönderdi, işi bitti. ' +
        'Muhasebe ise haberdar değil.\n\n' +
        'Basit çözüm: {{SE16N}} → {{VBRK}} → `RFBSK` = A sorgusunu bir varyant olarak kaydet ve ' +
        'günlük çalıştır. Liste boş olmalıdır. ' +
        'S/4HANA’da Fiori "Billing Documents — Blocked for Accounting" aynı işi yapar.' },

      { ic:'⚖️', baslik:'VKOA erişim sırası — en özelden en genele', metin:
        '{{VKOA}} tek bir tablo değil, **katmanlı bir arama yapısıdır**. Tipik sıra:\n\n' +
        '**1.** Satış org. + müşteri grubu + malzeme grubu + hesap anahtarı (en özel)\n' +
        '**2.** Satış org. + malzeme grubu + hesap anahtarı\n' +
        '**3.** Satış org. + müşteri grubu + hesap anahtarı\n' +
        '**4.** Satış org. + hesap anahtarı (en genel)\n\n' +
        'Sistem 1’den başlar, eşleşme bulursa durur. Bulamazsa bir alt katmana iner.\n\n' +
        'Pratik sonucu: **en genel katmanda bir yedek kural tanımlamak** hata riskini ortadan kaldırır. ' +
        'Ama bu, yeni ürün gruplarının varsayılan hesaba düşmesine ve **yanlış sınıflamanın gizlenmesine** ' +
        'yol açar. Tercih bilinçli yapılmalı; yedek kural varsa varsayılan hesaba düşen tutarlar ' +
        'periyodik kontrol edilmelidir.' },
    ],

    notlar:[
      { tip:'warn', baslik:'SD faturası FI’dan iptal edilmez', metin:
        '{{FB08}} teknik olarak SD kaynaklı FI belgesini ters kaydedebilir ama bu **yanlıştır**: ' +
        'FI düzelir, SD tarafı "faturalanmış" görünmeye devam eder, teslimat yeniden faturalanamaz.\n\n' +
        'Doğrusu {{VF11}} ile SD’den iptaldir; FI belgesi de otomatik ters kaydedilir.\n\n' +
        'Ayrıca: **muhasebeye düşmemiş fatura iptal edilmez** — eksik giderilip {{VF02}} ile aktarılır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'SD–FI entegrasyonunun **mantığı değişmedi**: {{VKOA}} aynı, hesap anahtarları aynı, ' +
      '`RFBSK` mantığı aynı. Değişen: gelirin {{ACDOCA}}’da kârlılık boyutlarıyla birlikte tutulması ve ' +
      'Fiori tabanlı izleme uygulamaları.',

    eccFarklari:[
      { konu:'{{VKOA}}', ecc:'Gelir hesabı belirleme', s4:'**Değişmedi**' },
      { konu:'Gelir verisi', ecc:'{{BSEG}} + CO-PA ayrı', s4:'{{ACDOCA}}’da **kârlılık boyutlarıyla birlikte**' },
      { konu:'CO-PA', ecc:'Ayrı tablolar (CE1xxxx…)', s4:'Account-based CO-PA {{ACDOCA}}’da entegre' },
      { konu:'Aktarım izleme', ecc:'{{VBRK}} `RFBSK` sorgusu', s4:'Fiori "Billing Documents — Blocked for Accounting"' },
      { konu:'Müşteri ana verisi', ecc:'{{XD01}}', s4:'{{BP}} — Customer (Sales) + FI Customer rolleri' },
      { konu:'Faturalama', ecc:'{{VF01}} / {{VF04}}', s4:'Aynı + Fiori "Create Billing Documents"' },
    ],

    universalJournal:
      'SD faturasının FI kalemleri {{ACDOCA}}’ya yazılır ve **kârlılık boyutları aynı satırdadır**: ' +
      'müşteri, malzeme, {{kar-merkezi}}, satış organizasyonu.\n\n' +
      'Pratik sonucu en büyük değişikliktir: ECC’de "hangi üründen hangi müşteride ne kadar kâr ettik?" ' +
      'sorusu CO-PA’nın ayrı tablolarından cevaplanır ve FI ile mutabakat gerekirdi. ' +
      'S/4HANA’da **account-based CO-PA** {{ACDOCA}}’ya entegre olduğu için ' +
      'FI ile kârlılık analizi arasında fark oluşamaz.',

    kalkanTcodes:[
      { eski:'{{XD01}} / {{XD02}}', yeni:'{{BP}}', not:'Müşteri ana verisi — Customer (Sales) ve FI Customer rolleri' },
      { eski:'—', yeni:'—', not:'{{VKOA}}, {{VF01}}, {{VF02}}, {{VF11}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Billing Documents — Blocked for Accounting', aciklama:'`RFBSK` = "A" faturalarını görsel iş listesi olarak sunar. **SD entegrasyon izlemesinin modern yolu.**' },
      { ad:'Create Billing Documents', aciklama:'{{VF04}} yerine; toplu faturalama.' },
      { ad:'Manage Billing Documents', aciklama:'{{VF02}}/{{VF03}} yerine; aktarım durumu ve yeniden aktarım.' },
      { ad:'Profitability Analysis', aciklama:'Account-based CO-PA — gelir ve maliyet aynı tablodan, anlık.' },
      { ad:'Sales Volume — Profit Margin', aciklama:'Ürün ve müşteri bazında kâr marjı analizi.' },
    ],

    compatibilityViews:[
      '{{VBRK}}, {{VBRP}}, {{KNVV}}, {{KNB1}}, {{T030}} — **fiziksel tablo olarak duruyor**.',
      'CO-PA’nın eski CE1xxxx tabloları — account-based CO-PA’da {{ACDOCA}} kullanılır.',
      'SD entegrasyonu, S/4HANA’da tablo yapısı en az değişen alanlardan biridir.',
    ],

    performans:
      'Gelir raporları {{ACDOCA}} üzerinden çalıştığı için kârlılık analizi belirgin şekilde hızlandı. ' +
      'Asıl kazanç ise **mutabakat yükünün kalkmasıdır**: FI ile CO-PA arasında fark oluşamadığı için ' +
      'ay sonu kârlılık mutabakatı gereksizleşir.',

    bestPractices:[
      'Fiori "Billing Documents — Blocked for Accounting" uygulamasını **günlük rutine** al; ' +
      '`RFBSK` izlemesinin modern karşılığıdır.',
      'Account-based CO-PA’ya geçişi değerlendir — FI ile kârlılık mutabakatı ortadan kalkar.',
      '{{VKOA}} kurallarını geçişte gözden geçir: kullanılmayan hesap belirleme grupları sadeleştirilebilir.',
      'Yedek (en genel) {{VKOA}} kuralı varsa, varsayılan hesaba düşen tutarları periyodik kontrol et — ' +
      'yeni ürün grupları oraya düşüp yanlış sınıflanabilir.',
      'Müşteri ana verisini {{BP}}’ye taşırken **hem Customer (Sales) hem FI Customer** rollerinin ' +
      'tanımlandığını doğrula; biri eksikse fatura ya kesilemez ya muhasebeye düşmez.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Sessiz hata: 40 fatura kesildi, gelir muhasebeye düşmedi',
    hikaye:
      '**Marmara Tekstil A.Ş.** yeni bir ürün grubu (organik kumaş) satmaya başlıyor. ' +
      'Nisan ayında 40 fatura kesiliyor, toplam 1.200.000 TL. ' +
      'Satış ekibi memnun, müşteriler faturalarını aldı, hiçbir hata mesajı çıkmadı.\n\n' +
      'Ay sonunda muhasebe müdürü mizanı alıyor ve gelir beklenenin **1,2 milyon TL altında** çıkıyor. ' +
      'Bu senaryo, SD entegrasyonunun neden "sessiz" olduğunu ve nasıl teşhis edildiğini gösteriyor.',
    veriler:[
      { k:'Şirket kodu / Satış org.', v:'1000 / 1000' },
      { k:'Yeni ürün grubu', v:'Organik kumaş · **malzeme hesap belirleme grubu 03**' },
      { k:'Müşteri grubu', v:'01 (yurtiçi)' },
      { k:'Dönem', v:'Nisan 2027' },
      { k:'Etkilenen', v:'40 fatura · 1.200.000 TL gelir' },
    ],

    adimlar:[
      { baslik:'Mal çıkışı yapılır — maliyet kaydedilir', tcode:'VF01',
        aciklama:'Teslimatlar sorunsuz. Mal çıkışı MM tarafından geldiği için {{OBYC}} çalışıyor ve ' +
                 'maliyet doğru kaydediliyor.',
        fis:{ baslik:'Belge 4900002100 — Mal çıkışı', belgeTuru:'WL', tarih:'12.04.2027',
          satirlar:[
            { hesap:'621', ad:'Satılan ticari mal maliyeti', borc:720000, not:'{{OBYC}} → GBB/VAX' },
            { hesap:'153', ad:'Ticari mallar', alacak:720000, not:'{{OBYC}} → BSX' },
          ], not:'**Maliyet kaydedildi ama gelir yok.** Bu, gelir tablosunu geçici olarak ' +
                 'zararda gösterir — ama fatura kesilince düzelecek. Düzelmezse sorun var demektir.' } },

      { baslik:'40 fatura kesilir — hata yok ama FI belgesi de yok', tcode:'VF01',
        aciklama:'Faturalama ekibi faturaları kesiyor. Ekranda **hiçbir hata çıkmıyor**; ' +
                 'yalnızca küçük bir mesaj: "Document 90001234 saved".',
        girdi:[
          { alan:'Kesilen fatura', deger:'40 adet · toplam 1.200.000 TL + KDV' },
          { alan:'Ekran mesajı', deger:'"Document saved" — **hata yok**' },
          { alan:'Gerçek durum', deger:'{{VBRK}} `RFBSK` = **A** (aktarılmadı) · FI belgesi **yok**' },
        ],
        tabloEtkisi:[
          { tablo:'VBRK', ne:'40 fatura başlığı; hepsinde `RFBSK` = **A**' },
          { tablo:'VBRP', ne:'Kalemler; `KTGRM` = 03 (yeni grup)' },
          { tablo:'BKPF', ne:'**Kayıt yok** — FI belgesi oluşmadı' },
          { tablo:'BSID', ne:'**Müşteri açık kalemi yok** — alacak takip edilmiyor' },
        ],
        not:'**Sorunun kalbi burada.** MM’de olsaydı mal girişi hata verir ve iş dururdu. ' +
             'SD’de fatura kesildi, müşteriye gitti, kimse hata görmedi.\n\n' +
             'Ayrıca **alacak da takip edilmiyor**: {{BSID}}’de kalem olmadığı için ' +
             'yaşlandırma ve ihtar süreçleri bu 1,2 milyon TL’yi hiç görmüyor.' },

      { baslik:'Ay sonu — gelir eksik fark edilir', tcode:'FBL3N',
        aciklama:'Muhasebe müdürü mizanı alıyor ve tutarsızlık görüyor.',
        girdi:[
          { alan:'600 Yurtiçi satışlar', deger:'8.400.000 TL — **beklenen 9.600.000 TL**' },
          { alan:'621 Satılan malın maliyeti', deger:'5.900.000 TL — beklenen düzeyde' },
          { alan:'Anomali', deger:'Maliyet var, gelir yok → **brüt kâr marjı anormal düşük**' },
        ],
        not:'İlk ipucu **kâr marjıydı**: maliyet kaydedilmiş ama gelir eksik olduğu için ' +
             'marj gerçekçi olmayan bir seviyeye düşmüştü. Bu, SD entegrasyon hatasının ' +
             'klasik belirtisidir.' },

      { baslik:'Teşhis — RFBSK sorgusu', tcode:'SE16N',
        aciklama:'SD entegrasyonunun tek erken uyarı göstergesi kontrol ediliyor.',
        girdi:[
          { alan:'Tablo', deger:'{{VBRK}}' },
          { alan:'Seçim', deger:'`RFBSK` = **A** · faturalama tarihi 01.04–30.04.2027' },
          { alan:'**Sonuç**', deger:'**40 kayıt** — hepsi organik kumaş faturaları' },
          { alan:'Ortak nokta', deger:'{{VBRP}} `KTGRM` = **03** (yeni malzeme hesap belirleme grubu)' },
        ],
        not:'40 faturanın hepsinde aynı desen: yeni ürün grubu. ' +
             'Sorun tek bir faturada değil, **bir yapılandırma eksiğinde**.' },

      { baslik:'Kesin teşhis — VF02 hata mesajı', tcode:'VF02',
        aciklama:'Bir faturayı açıp yeniden aktarmayı deniyoruz. Asıl hata mesajı burada çıkıyor.',
        girdi:[
          { alan:'Fatura', deger:'90001234' },
          { alan:'Menü', deger:'*Muhasebeye aktar* (Release to accounting)' },
          { alan:'**Hata mesajı**', deger:'"Account determination error for key **1000 01 03 ERL**"' },
          { alan:'Çözümleme', deger:'Satış org. **1000** + müşteri grubu **01** + malzeme grubu **03** + anahtar **ERL**' },
        ],
        not:'{{VF01}} yalnızca "belge kaydedildi" demişti. ' +
             '{{VF02}} → *Muhasebeye aktar* ise **eksik kombinasyonu tam olarak** verdi. ' +
             'SD teşhisi her zaman buradan yapılmalıdır.' },

      { baslik:'{{VKOA}} tamamlanır', tcode:'VKOA',
        aciklama:'Eksik kombinasyon ekleniyor. Ayrıca iskonto ve navlun anahtarları da kontrol ediliyor.',
        girdi:[
          { alan:'Mevcut satırlar', deger:'1000 + 01 + **01** + ERL → 600000 (normal ürün)' },
          { alan:'**Eklenen**', deger:'1000 + 01 + **03** + ERL → **600300** (Organik ürün satışları)' },
          { alan:'Ayrıca eklenen', deger:'1000 + 01 + 03 + **ERS** → 611000 (iskonto)' },
          { alan:'Kontrol', deger:'Yurtdışı müşteri grubu (02) için de aynı satırlar eklendi' },
        ],
        tabloEtkisi:[
          { tablo:'T030', ne:'Yeni satırlar: KTOSL = ERL/ERS, malzeme grubu 03' },
        ],
        not:'Yeni ürün grubu tanımlanırken {{VKOA}} güncellenseydi bu hata **hiç oluşmayacaktı**. ' +
             'Süreç eksikliği: ürün grubu tanımı SD ekibinde, {{VKOA}} FI ekibinde — ' +
             'aralarında bir kontrol adımı yoktu.' },

      { baslik:'40 fatura yeniden aktarılır', tcode:'VF02',
        aciklama:'Faturalar tek tek veya toplu olarak yeniden aktarılıyor. **Hiçbiri iptal edilmiyor.**',
        girdi:[
          { alan:'Yöntem', deger:'{{VF02}} → *Muhasebeye aktar* (toplu program da kullanılabilir)' },
          { alan:'Sonuç', deger:'40 fatura aktarıldı · `RFBSK` = **C**' },
          { alan:'Oluşan', deger:'40 FI belgesi · 1.200.000 TL gelir · 40 müşteri açık kalemi' },
        ],
        fis:{ baslik:'Belge 1800002340 — SD faturası (yeniden aktarıldı)', belgeTuru:'RV', tarih:'15.04.2027',
          satirlar:[
            { hesap:'120', ad:'Alıcılar — C-5001', borc:36000, not:'{{KNB1}} `AKONT`' },
            { hesap:'600300', ad:'Organik ürün satışları', alacak:30000, not:'{{VKOA}} → **ERL** (yeni kural)' },
            { hesap:'391', ad:'Hesaplanan KDV', alacak:6000, not:'{{OB40}}' },
          ], not:'Kayıt tarihi **orijinal faturalama tarihidir** (15.04), yeniden aktarım tarihi değil. ' +
                 'Yani gelir doğru döneme düştü — Nisan mizanı düzeldi.' },
        tabloEtkisi:[
          { tablo:'VBRK', ne:'`RFBSK` = **C** oldu' },
          { tablo:'BKPF', ne:'40 FI belgesi; `AWTYP` = **VBRK**, `AWKEY` = SD fatura numarası' },
          { tablo:'BSID', ne:'40 müşteri açık kalemi oluştu — artık yaşlandırmada görünüyor' },
        ],
        not:'**Faturalar iptal edilmedi.** İptal edilseydi SD numaraları boşa gidecek, ' +
             'müşteriye gitmiş faturalarla sistem tutarsızlaşacaktı.' },

      { baslik:'Önlem alınır — günlük kontrol', tcode:'SE16N',
        aciklama:'Aynı hatanın tekrarlanmaması için iki önlem alınıyor.',
        girdi:[
          { alan:'Önlem 1 — günlük sorgu', deger:'{{VBRK}} `RFBSK` = A varyantı kaydedildi, günlük çalıştırılıyor' },
          { alan:'Önlem 2 — süreç', deger:'Yeni ürün grubu tanımı, {{VKOA}} kontrolü olmadan onaylanmıyor' },
          { alan:'Önlem 3 — yedek kural', deger:'Değerlendirildi ama **reddedildi** — yanlış sınıflamayı gizlerdi' },
        ],
        not:'Yedek (en genel) {{VKOA}} kuralı hatayı önlerdi ama gelir varsayılan hesaba düşecek ve ' +
             '**yanlış sınıflama sessizce sürecekti**. Erken uyarı, sessiz yanlıştan iyidir.' },
    ],

    sonuc:
      '**40 fatura, 1,2 milyon TL gelir, bir ay boyunca muhasebede yoktu** — ve hiçbir hata mesajı çıkmadı.\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. SD entegrasyon hatası sessizdir.** MM’de {{OBYC}} eksikse mal girişi yapılamaz ve iş durur. ' +
      'SD’de {{VKOA}} eksikse fatura kesilir, müşteriye gider, yalnızca FI belgesi oluşmaz. ' +
      'Bu, iki entegrasyon arasındaki en önemli pratik farktır.\n\n' +
      '**2. `RFBSK` tek erken uyarıdır.** {{VBRK}} `RFBSK` = "A" sorgusu günlük çalıştırılmalıdır. ' +
      'Bu tek kontrol, bir aylık gelir kaybını bir günlük gecikmeye indirir.\n\n' +
      '**3. Teşhis {{VF02}} ile yapılır, {{VF01}} ile değil.** ' +
      '{{VF01}} "belge kaydedildi" der; {{VF02}} → *Muhasebeye aktar* eksik kombinasyonu ' +
      '**tam olarak** söyler: "1000 01 03 ERL".\n\n' +
      '**4. Muhasebeye düşmeyen fatura asla iptal edilmez.** Eksik giderilir ve {{VF02}} ile ' +
      'yeniden aktarılır. Kayıt tarihi orijinal faturalama tarihi olduğu için gelir ' +
      '**doğru döneme** düşer — düzeltme geriye dönük çalışır.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'SD entegrasyonu, satış faturasının **otomatik** FI belgesine dönüşmesidir; hesapları **{{VKOA}}** belirler.',
      'Zincirde **iki ayrı olay** vardır: mal çıkışı (maliyet, MM’den, {{OBYC}}) ve fatura (gelir, SD’den, {{VKOA}}).',
      '{{VKOA}} kriterleri: satış org. + müşteri hesap belirleme grubu + malzeme hesap belirleme grubu + hesap anahtarı.',
      'Hesap anahtarları: **ERL** gelir, **ERS** iskonto, **ERF** navlun.',
      'Müşteri hesabı {{KNB1}} `AKONT`’tan, KDV {{OB40}}’tan gelir — **{{VKOA}} bunları belirlemez**.',
      '**SD hatası sessizdir:** {{VKOA}} eksikse fatura kesilir ama FI belgesi oluşmaz. MM’de belge hiç oluşmaz.',
      '{{VBRK}} `RFBSK` = **C** aktarıldı, **A** aktarılmadı. Günlük izlenmelidir.',
      'Muhasebeye düşmeyen fatura **iptal edilmez**; eksik giderilip {{VF02}} ile yeniden aktarılır.',
    ],

    onemliNoktalar:[
      '**"SD faturası kesildi ama FI belgesi oluşmadı. Ne yaparsın?"** {{VBRK}} `RFBSK` kontrol et → {{VF02}} → *Muhasebeye aktar* ile hata mesajını al → {{VKOA}}’yı tamamla → yeniden aktar. **Faturayı iptal etme.** En çok sorulan SD entegrasyon sorusudur.',
      '**"VKOA neye göre hesap belirler?"** Satış organizasyonu + müşteri hesap belirleme grubu ({{KNVV}} `KTGRD`) + malzeme hesap belirleme grubu ({{VBRP}} `KTGRM`) + hesap anahtarı (ERL/ERS/ERF).',
      '**"Müşteri hesabını VKOA mı belirler?"** Hayır. {{KNB1}} `AKONT` belirler ({{mutabakat-hesabi}}). VKOA yalnızca gelir tarafını belirler.',
      '**"Satılan malın maliyeti hangi kuralla belirlenir?"** {{OBYC}} → GBB/VAX. Maliyet **MM’den** gelir; VKOA’nın konusu değildir.',
      '**"MM ile SD entegrasyon hatası arasındaki fark?"** MM gürültülüdür (belge hiç oluşmaz, iş durur); SD sessizdir (fatura oluşur, FI belgesi oluşmaz).',
      '**"SD faturası nasıl iptal edilir?"** {{VF11}} ile SD’den. {{FB08}} kullanılırsa SD tarafı "faturalanmış" kalır ve modüller tutarsızlaşır.',
      '**"Yeniden aktarımda gelir hangi döneme düşer?"** **Orijinal faturalama tarihine** — yeniden aktarım tarihine değil. Düzeltme geriye dönük çalışır.',
      '**"S/4HANA’da ne değişti?"** {{VKOA}} aynı. Gelir {{ACDOCA}}’da kârlılık boyutlarıyla tutuluyor; account-based CO-PA ile FI–CO-PA mutabakatı gereksizleşti.',
    ],

    sikHatalar:[
      { hata:'Muhasebeye düşmeyen faturayı iptal edip yeniden kesmek.', dogru:'{{VKOA}} eksiği giderilir, {{VF02}} ile yeniden aktarılır. İptal SD numarasını boşa harcar.' },
      { hata:'SD faturasını {{FB08}} ile FI’dan iptal etmek.', dogru:'{{VF11}} ile SD’den iptal edilir; yoksa SD tarafı "faturalanmış" kalır.' },
      { hata:'`RFBSK` alanını izlememek.', dogru:'Günlük sorgu rutine alınmalıdır; SD hatasının tek erken uyarısıdır.' },
      { hata:'Teşhis için {{VF01}} hata mesajına bakmak.', dogru:'{{VF02}} → *Muhasebeye aktar* eksik kombinasyonu tam olarak söyler.' },
      { hata:'Satılan malın maliyeti sorununu {{VKOA}}’da aramak.', dogru:'Maliyet MM’den gelir; {{OBYC}} → GBB/VAX’ta çözülür.' },
      { hata:'Yeni ürün grubu tanımlarken {{VKOA}}’yı güncellememek.', dogru:'Ürün grubu tanımı ile {{VKOA}} kontrolü aynı sürecin parçası olmalıdır.' },
      { hata:'Müşteri hesabını {{VKOA}}’da aramak.', dogru:'{{KNB1}} `AKONT`’tan gelir; VKOA yalnızca gelir/iskonto/navlun belirler.' },
      { hata:'Yedek {{VKOA}} kuralını düşünmeden tanımlamak.', dogru:'Hatayı önler ama **yanlış sınıflamayı gizler**. Tanımlanırsa varsayılan hesaba düşen tutarlar periyodik kontrol edilmelidir.' },
    ],

    ipuclari:[
      '**{{VBRK}} `RFBSK` = "A" sorgusunu günlük rutine koy** — bir varyant kaydet ve otomatikleştir. ' +
      'S/4HANA’da Fiori "Billing Documents — Blocked for Accounting" aynı işi görsel yapar.',
      'Teşhis için her zaman {{VF02}} → *Muhasebeye aktar* kullan; hata mesajı en açıklayıcı orada.',
      'Gelir tablosunda **kâr marjı anormal düşükse** SD entegrasyon hatasını şüphelen: ' +
      'maliyet kaydedilmiş, gelir eksik olabilir.',
      'Yeni ürün grubu veya müşteri grubu tanımlandığında {{VKOA}}’yı **önceden** tamamla.',
      'Ay sonu kapanışında {{VF04}} ile faturalanmayı bekleyen teslimat kalmadığını doğrula.',
      'Sorunun hangi modülde olduğunu ayır: **gelir yanlış** → {{VKOA}}; **maliyet yanlış** → {{OBYC}}; ' +
      '**müşteri hesabı yanlış** → {{KNB1}} `AKONT`; **KDV yanlış** → {{OB40}}.',
    ],

    quiz:[
      { soru:'SD faturası kesildi ama FI belgesi oluşmadı. İlk kontrol edilecek şey nedir?',
        secenekler:[
          'Müşteri ana verisi',
          '**{{VBRK}} tablosundaki `RFBSK` alanı**',
          'Numara aralığı',
          'Kredi limiti',
        ], dogru:1,
        aciklama:'`RFBSK` = **A** ise fatura muhasebeye aktarılmamıştır. En sık sebep {{VKOA}}’da ' +
                 'eksik hesap belirlemedir. Teşhis {{VF02}} → *Muhasebeye aktar* ile yapılır; ' +
                 'eksik giderilip yeniden aktarılır — **fatura iptal edilmez**.' },

      { soru:'{{VKOA}} aşağıdakilerden hangisini belirlemez?',
        secenekler:[
          'Gelir hesabı (ERL)',
          'İskonto hesabı (ERS)',
          '**Müşteri mutabakat hesabı (120 Alıcılar)**',
          'Navlun hesabı (ERF)',
        ], dogru:2,
        aciklama:'Müşteri satırının hesabı {{KNB1}} `AKONT` alanından gelir ({{mutabakat-hesabi}} mantığı). ' +
                 '{{VKOA}} yalnızca **gelir tarafındaki** hesapları belirler. ' +
                 'KDV hesabı ise {{OB40}}’tan gelir — tek faturada **üç ayrı kaynak** çalışır.' },

      { soru:'Mal çıkışı (teslimat) yapıldığında hangi kayıt oluşur?',
        secenekler:[
          'Müşteri borç / Gelir alacak',
          '**Satılan malın maliyeti borç / Stok alacak**',
          'Gelir borç / Müşteri alacak',
          'Hiçbir kayıt oluşmaz',
        ], dogru:1,
        aciklama:'Mal çıkışı bir **stok hareketidir** (hareket türü 601) ve MM’in konusudur: ' +
                 'stok azalır, maliyet oluşur. Hesapları {{OBYC}} → GBB/VAX belirler. ' +
                 '**Gelir ve müşteri alacağı doğmaz** — onlar faturayla oluşur.' },

      { soru:'MM ile SD entegrasyon hatası arasındaki temel pratik fark nedir?',
        secenekler:[
          'MM daha karmaşıktır',
          '**MM hatası gürültülüdür (belge hiç oluşmaz); SD hatası sessizdir (fatura oluşur, FI belgesi oluşmaz)**',
          'SD hatası daha kolay çözülür',
          'Fark yoktur',
        ], dogru:1,
        aciklama:'{{OBYC}} eksikse mal girişi **yapılamaz** — kullanıcı hata alır, iş durur, sorun anında görünür. ' +
                 '{{VKOA}} eksikse fatura **kesilir**, müşteriye gider, yalnızca FI belgesi oluşmaz. ' +
                 'Bu yüzden `RFBSK` izlemesi zorunludur.' },

      { soru:'Muhasebeye aktarılmamış bir SD faturası yeniden aktarıldığında gelir hangi döneme düşer?',
        secenekler:[
          'Yeniden aktarım tarihine',
          '**Orijinal faturalama tarihine**',
          'Cari döneme',
          'Kullanıcı seçer',
        ], dogru:1,
        aciklama:'FI belgesinin kayıt tarihi **orijinal faturalama tarihidir** ({{VBRK}} `FKDAT`). ' +
                 'Yani düzeltme geriye dönük çalışır ve gelir doğru döneme düşer — ' +
                 'yeter ki o dönem hâlâ açık olsun. Kapalıysa {{OB52}} ile geçici açılır.' },

      { soru:'Yanlış kesilmiş bir SD faturası nasıl iptal edilir?',
        secenekler:[
          '{{FB08}} ile FI’dan ters kaydedilir',
          '**{{VF11}} ile SD’den iptal edilir**',
          '{{VF02}} ile silinir',
          '{{FBRA}} ile geri alınır',
        ], dogru:1,
        aciklama:'SD kaynaklı belgeler **kaynak modülden** iptal edilmelidir. ' +
                 '{{FB08}} FI’ı düzeltir ama SD tarafı "faturalanmış" görünmeye devam eder; ' +
                 'teslimat yeniden faturalanamaz ve modüller tutarsızlaşır.' },

      { soru:'{{VKOA}} erişim sırası nasıl çalışır?',
        secenekler:[
          'Rastgele bir kural seçilir',
          'Tüm kurallar birlikte uygulanır',
          '**En özelden en genele aranır; ilk eşleşen kural kullanılır**',
          'En genelden en özele aranır',
        ], dogru:2,
        aciklama:'Sistem en özel katmandan (satış org. + müşteri grubu + malzeme grubu + anahtar) başlar, ' +
                 'eşleşme bulursa durur; bulamazsa daha genel katmanlara iner. ' +
                 'En genel katmanda yedek kural tanımlamak hatayı önler ama ' +
                 '**yanlış sınıflamayı gizleyebilir**.' },

      { soru:'Gelir tablosunda kâr marjı anormal düşük çıktı. Maliyet normal, gelir eksik görünüyor. En olası sebep?',
        secenekler:[
          '{{OBYC}} hatası',
          '**SD faturaları muhasebeye aktarılmamış (`RFBSK` = A)**',
          'Amortisman fazla hesaplanmış',
          'KDV yanlış',
        ], dogru:1,
        aciklama:'Mal çıkışı MM’den geldiği için maliyet kaydedilir; fatura SD’den geldiği için ' +
                 '{{VKOA}} eksikse gelir kaydedilmez. Sonuç: maliyet var, gelir yok → ' +
                 '**kâr marjı anormal düşer**. Bu, SD entegrasyon hatasının klasik belirtisidir.' },
    ],

    flashcards:[
      { on:'SD zincirinde iki ayrı muhasebe olayı nedir?', arka:'**1. Mal çıkışı** (teslimat) → maliyet\nSMM borç / Stok alacak · **OBYC** → GBB/VAX · MM’den\n\n**2. Fatura** (VF01) → gelir\nMüşteri borç / Gelir alacak · **VKOA** → ERL · SD’den' },
      { on:'VKOA neye göre hesap belirler?', arka:'**Dört kritere göre:**\n1. Satış organizasyonu\n2. **Müşteri** hesap belirleme grubu (KNVV-KTGRD)\n3. **Malzeme** hesap belirleme grubu (VBRP-KTGRM)\n4. **Hesap anahtarı** (ERL/ERS/ERF)\n\nSonuç T030’a yazılır.' },
      { on:'VKOA hangi hesapları belirlemez?', arka:'**Müşteri hesabı** → KNB1-AKONT (mutabakat hesabı)\n**KDV hesabı** → OB40\n**Satılan malın maliyeti** → OBYC (GBB/VAX)\n\nVKOA yalnızca **gelir tarafını** belirler: ERL, ERS, ERF.' },
      { on:'RFBSK alanı ne anlama gelir?', arka:'VBRK tablosunda **muhasebeye aktarım durumu**:\n\n**C** — aktarıldı, FI belgesi var ✓\n**A** — **aktarılmadı**, gelir eksik \n**B** — kısmen\n\n"A" sorgusu **günlük** çalıştırılmalıdır.' },
      { on:'MM ile SD entegrasyon hatası farkı nedir?', arka:'**MM — gürültülü:** OBYC eksikse mal girişi **yapılamaz**, iş durur, anında fark edilir.\n\n**SD — sessiz:** VKOA eksikse fatura **kesilir**, müşteriye gider, yalnızca FI belgesi oluşmaz.\n\nBu yüzden RFBSK izlenir.' },
      { on:'"Fatura muhasebeye düşmedi" — nasıl çözülür?', arka:'1. **VBRK-RFBSK** kontrol et → "A"\n2. **VF02 → Muhasebeye aktar** → hata mesajını al\n3. **VKOA**’yı tamamla\n4. **VF02** ile yeniden aktar\n\n**Faturayı iptal etme.**' },
      { on:'Teşhis için VF01 mi VF02 mi?', arka:'**VF02 → Muhasebeye aktar.**\n\nVF01 yalnızca "belge kaydedildi" der.\n\nVF02 eksik kombinasyonu **tam olarak** söyler: "Account determination error for key **1000 01 03 ERL**".' },
      { on:'SD faturası nasıl iptal edilir?', arka:'**VF11** ile — SD’den.\n\nFB08 kullanılırsa FI düzelir ama SD tarafı "faturalanmış" kalır, teslimat yeniden faturalanamaz, modüller tutarsızlaşır.' },
      { on:'Yeniden aktarımda gelir hangi döneme düşer?', arka:'**Orijinal faturalama tarihine** (VBRK-FKDAT), yeniden aktarım tarihine değil.\n\nDüzeltme **geriye dönük** çalışır — yeter ki o dönem açık olsun.\n\nKapalıysa OB52 ile geçici açılır.' },
      { on:'VKOA erişim sırası nasıl çalışır?', arka:'**En özelden en genele** aranır; **ilk eşleşen** kural kullanılır.\n\n1. Satış org + müşteri grubu + malzeme grubu + anahtar\n2. Satış org + malzeme grubu + anahtar\n3. Satış org + anahtar (yedek)\n\nYedek kural hatayı önler ama yanlış sınıflamayı gizler.' },
      { on:'Kâr marjı anormal düşük — ne şüphelenirsin?', arka:'**SD entegrasyon hatası.**\n\nMal çıkışı MM’den gelir → **maliyet kaydedilir**.\nFatura SD’den gelir → VKOA eksikse **gelir kaydedilmez**.\n\nSonuç: maliyet var, gelir yok → marj çöker.' },
      { on:'S/4HANA’da SD entegrasyonunda ne değişti?', arka:'**VKOA aynı**, RFBSK mantığı aynı.\n\nDeğişenler:\n• Gelir **ACDOCA**’da kârlılık boyutlarıyla\n• **Account-based CO-PA** entegre → FI–CO-PA mutabakatı gereksiz\n• Fiori "Billing Documents — Blocked for Accounting"' },
    ],
  },

  },
});
