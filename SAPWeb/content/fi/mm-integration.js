/* ==========================================================================
   content/fi/mm-integration.js — "MM Integration (Malzeme Yönetimi Entegrasyonu)"
   ========================================================================== */

SAP.registerTopic({
  id: 'mm-integration',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'MM entegrasyonu, **malzeme hareketlerinin ve satın alma faturalarının otomatik olarak ' +
      'muhasebe belgesine dönüşmesidir**. Depo elemanı mal kabul eder, muhasebeci hiçbir şey girmez — ' +
      'ama FI’da bir belge oluşur.\n\n' +
      'Bu otomatikliğin kalbi **{{hesap-belirleme}}dir**: sistem hangi G/L hesabına yazacağını ' +
      '{{OBYC}} kural tablosundan bulur. Kural eksikse belge oluşmaz ve mal girişi durur.\n\n' +
      'Bir FI danışmanı için MM entegrasyonu **isteğe bağlı bir konu değildir**: ' +
      'kurumsal şirketlerde FI belgelerinin çoğunluğu MM’den gelir. ' +
      '"Bu hesap neden borçlandı?" sorusunun cevabı çoğu zaman {{OBYC}}’dedir.',

    neden:
      '**Hacim.** Ayda binlerce mal hareketi olur; elle kaydedilemez.\n\n' +
      '**Tutarlılık.** Aynı tür hareket her zaman aynı hesaba gider; kullanıcı yorumuna bırakılmaz.\n\n' +
      '**Eşzamanlılık.** Stok fiziksel olarak hareket ettiği anda muhasebe de hareket eder; ' +
      'gecikme ve mutabakatsızlık oluşmaz.\n\n' +
      '**Kontrol.** {{uc-yonlu-eslestirme}} sayesinde sipariş, mal girişi ve fatura otomatik karşılaştırılır; ' +
      'uyuşmazlık ödemeyi bloklar.',

    sirketOnemi:
      'MM–FI entegrasyonu yanlış kurulursa sonuç sessiz ve pahalıdır: **stoklar yanlış hesapta birikir**, ' +
      'maliyetler yanlış yere yüklenir, {{gr-ir}} hesabı şişer ve kimse fark etmez çünkü ' +
      'hiçbir hata mesajı çıkmaz.\n\n' +
      'Danışmanlık açısından bu konu **iki modülün kesişimidir** ve sorumluluk sınırı bulanıktır. ' +
      'MM danışmanı "hesap belirleme FI’ın işi" der, FI danışmanı "hareket türü MM’in işi" der. ' +
      'Gerçekte {{OBYC}}’yi kuran kişi **her ikisini de** bilmek zorundadır.\n\n' +
      'Mülakatta ayırt edici soru: **"OBYC’de BSX, WRX ve PRD işlem anahtarları ne yapar?"**',

    gercekHayat:
      'Bir üretim şirketinde yeni bir hammadde grubu tanımlandı ve ilk mal girişi yapılmak isteniyor. ' +
      'Depo elemanı {{MIGO}}’da hata alıyor:\n\n' +
      '*"Account determination for entry INT BSX 3020 not possible"*\n\n' +
      'Depo elemanı MM danışmanını arıyor, o FI danışmanına yönlendiriyor. ' +
      'Gerçek sebep: malzemenin **yeni bir {{degerleme-sinifi}}** (3020) var ve {{OBYC}}’de ' +
      'bu sınıf için stok hesabı tanımlanmamış.\n\n' +
      'Çözüm 30 saniye sürüyor ama **bulmak** yarım gün alıyor — çünkü hata mesajı MM’de çıkıyor, ' +
      'çözüm FI’da. Bu, entegrasyon konularının tipik zorluğudur.',

    muhasebeMantigi:
      'MM entegrasyonunun muhasebe mantığı **üç aşamalı bir zincirdir**:\n\n' +
      '**1. Mal girişi:** stok artar (varlık), karşılığında {{gr-ir}} hesabı alacaklanır. ' +
      'Satıcıya borç **henüz yazılmaz** — fatura gelmedi.\n\n' +
      '**2. Fatura girişi:** {{gr-ir}} borçlanarak kapanır, satıcı alacaklanır. ' +
      'Fiyat farkı varsa ayrı bir hesaba gider.\n\n' +
      '**3. Tüketim:** malzeme kullanıldığında stok azalır, gider (veya üretim maliyeti) oluşur.\n\n' +
      'Zincirin ortasındaki {{gr-ir}} hesabı, **mal ile faturanın buluşma noktasıdır**. ' +
      'İkisi de geldiğinde sıfırlanır; biri eksikse bakiye verir.',

    kavramlar: ['hesap-belirleme', 'degerleme-sinifi', 'fiyat-kontrolu', 'malzeme-hareket-turu',
                'gr-ir', 'uc-yonlu-eslestirme', 'mutabakat-hesabi', 'maliyet-yeri'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'MM entegrasyonu **Procure-to-Pay** zincirinin muhasebe ayağıdır. Zincirin her adımında ' +
      'FI’da ne olduğunu (veya olmadığını) bilmek, entegrasyon sorunlarını çözmenin temelidir.',

    roller:[
      { rol:'Talep eden birim', gorev:'Satın alma talebi açar. FI kaydı yok.' },
      { rol:'Satın alma', gorev:'Siparişi açar ({{ME21N}}); **hesap atama kategorisini** belirler — bu, FI kaydının şeklini değiştirir.' },
      { rol:'Depo / Mal kabul', gorev:'Malı teslim alır ({{MIGO}}). **İlk FI kaydı burada doğar.**' },
      { rol:'AP muhasebe', gorev:'Faturayı işler ({{MIRO}}); farkları araştırır, blokları çözer ({{MRBR}}).' },
      { rol:'Üretim / Maliyet', gorev:'Malzemeyi tüketir; stok gidere veya üretim maliyetine dönüşür.' },
      { rol:'Ana muhasebe', gorev:'Dönem sonunda {{gr-ir}} analizi yapar ({{F.19}}, {{MR11}}).' },
      { rol:'FI + MM danışmanı', gorev:'{{OBYC}} hesap belirlemesini birlikte tasarlar; {{OMWB}} ile test eder.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'MM’den FI’a — hangi adımda ne oluşur?',
      adimlar:[
        { ic:'🛒', rol:'Satın alma', baslik:'Sipariş açılır ({{ME21N}})',
          aciklama:'**Hesap atama kategorisi** burada belirlenir: boş = stoklu alım, K = maliyet yerine, ' +
                   'A = duran varlığa, F = iç siparişe. Bu seçim, mal girişinin FI kaydını tamamen değiştirir. ' +
                   '**FI kaydı yok** — sipariş bir taahhüttür.',
          cikti:'{{EKKO}} / {{EKPO}}', ok:'mal gelir' },
        { ic:'📦', rol:'Depo', baslik:'Mal girişi ({{MIGO}}) — ilk FI kaydı',
          aciklama:'Hareket türü **101**. Stoklu alımda: stok borç ({{OBYC}} → **BSX**), {{gr-ir}} alacak (**WRX**). ' +
                   'Maliyet yerine alımda: doğrudan gider borç (**GBB/VBR**).',
          cikti:'{{MSEG}} + FI belgesi', ok:'fatura gelir' },
        { ic:'🧾', rol:'AP muhasebe', baslik:'Fatura girişi ({{MIRO}})',
          aciklama:'{{gr-ir}} borç (kapanır), satıcı alacak. Fiyat farkı varsa **PRD** hesabına ' +
                   '(standart fiyatlı malzemede) veya **stoka** (hareketli ortalamada).',
          cikti:'{{RBKP}}/{{RSEG}} + FI belgesi', ok:'fark varsa bloke' },
        { ic:'🚦', rol:'AP muhasebe', baslik:'Fark kontrolü ve blok',
          aciklama:'Fiyat/miktar farkı tolerans dışıysa fatura **ödemeye bloklanır**. ' +
                   '{{MRBR}} ile araştırılıp serbest bırakılır.',
          cikti:'Ödenebilir kalem', ok:'malzeme kullanılır' },
        { ic:'🏭', rol:'Üretim / Tüketim', baslik:'Malzeme tüketilir',
          aciklama:'Hareket türü **201** (maliyet yerine) veya **261** (üretim siparişine). ' +
                   'Stok alacak, gider/üretim maliyeti borç ({{OBYC}} → **GBB**).',
          cikti:'Tüketim belgesi', ok:'dönem sonu' },
        { ic:'🔍', rol:'Ana muhasebe', baslik:'GR/IR analizi',
          aciklama:'{{F.13}} eşleşenleri kapatır, {{MR11}} kalıcı farkları yazar, ' +
                   '{{F.19}} kalan zamanlama farkını sınıflar.',
          cikti:'Temiz {{gr-ir}} hesabı' },
      ],
    },

    adimlar:[
      { rol:'Satın alma', eylem:'Sipariş açar, hesap atama kategorisi seçer', sistem:'{{ME21N}} — FI kaydı yok' },
      { rol:'Depo', eylem:'Mal girişi yapar', sistem:'{{MIGO}} 101 → stok borç / GR-IR alacak' },
      { rol:'AP muhasebe', eylem:'Faturayı işler', sistem:'{{MIRO}} → GR-IR borç / satıcı alacak' },
      { rol:'AP muhasebe', eylem:'Blokları çözer', sistem:'{{MRBR}}' },
      { rol:'Üretim', eylem:'Malzemeyi tüketir', sistem:'{{MIGO}} 201/261 → stok alacak / gider borç' },
      { rol:'Ana muhasebe', eylem:'GR/IR temizliği', sistem:'{{F.13}}, {{MR11}}, {{F.19}}' },
      { rol:'Danışman', eylem:'Hesap belirlemeyi test eder', sistem:'{{OMWB}} — kaydetmeden simülasyon' },
    ],

    veriAkisi:{
      nereden:'MM ana verisi (malzeme → {{degerleme-sinifi}}, {{fiyat-kontrolu}}), sipariş ({{EKKO}}/{{EKPO}}), ' +
              'hareket türü, {{OBYC}} kural tablosu ({{T030}}).',
      nereye:'FI belgelerine ({{BKPF}}/{{BSEG}}/{{ACDOCA}}), stok ve GR/IR hesaplarına; ' +
             'CO tarafında {{maliyet-yeri}} veya üretim siparişine.',
      tetikleyen:'Mal hareketi veya fatura girişi. Sipariş tek başına FI kaydı üretmez.',
      sonraki:'Ödeme ({{F110}}), dönem sonu GR/IR analizi, stok değerleme.',
    },

    notlar:[
      { tip:'warn', baslik:'Hesap atama kategorisi her şeyi değiştirir', metin:
        'Siparişteki **hesap atama kategorisi**, mal girişinin FI kaydını tamamen belirler:\n\n' +
        '**Boş** — stoklu alım: stok borç / GR-IR alacak. Malzeme envantere girer.\n\n' +
        '**K** — maliyet yerine: **doğrudan gider** borç / GR-IR alacak. Stok oluşmaz; ' +
        'malzeme alındığı an tüketilmiş sayılır (kırtasiye, bakım malzemesi).\n\n' +
        '**A** — duran varlığa: varlık borç / GR-IR alacak. {{aktiflestirme}} olur.\n\n' +
        '**F** — iç siparişe / projeye: proje maliyeti borç.\n\n' +
        'Aynı malzeme, farklı kategorilerle **tamamen farklı** muhasebe kayıtları üretir. ' +
        '"Neden stok oluşmadı?" sorusunun cevabı genelde budur.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'MM kayıtlarının tamamı **otomatiktir** ve hesapları {{OBYC}} belirler. ' +
      'Aşağıda en sık karşılaşılan beş senaryonun kayıtları var; her birinde hangi ' +
      '**işlem anahtarının** devreye girdiğine dikkat et.',

    etkilenenHesaplar:[
      { hesap:'153 Ticari mallar / 150 Hammadde (stok)', tur:'Bilanço — Varlık', neden:'{{OBYC}} → **BSX**. {{degerleme-sinifi}}na göre farklı stok hesabı seçilir.' },
      { hesap:'159 GR/IR hesabı', tur:'Bilanço — Geçiş', neden:'{{OBYC}} → **WRX**. Mal ile fatura arasındaki zaman farkını taşır.' },
      { hesap:'711 Fiyat farkı', tur:'Gelir tablosu', neden:'{{OBYC}} → **PRD**. Yalnızca **standart fiyatlı** ({{fiyat-kontrolu}} = S) malzemelerde oluşur.' },
      { hesap:'7xx Gider hesapları', tur:'Gelir tablosu', neden:'{{OBYC}} → **GBB** (offsetting entry). Tüketim ve maliyet yerine alımda.' },
      { hesap:'320 Satıcılar', tur:'Bilanço — Kaynak', neden:'{{MIRO}} faturasında; hesabı {{LFB1}} `AKONT` belirler, {{OBYC}} değil.' },
      { hesap:'191 İndirilecek KDV', tur:'Bilanço — Varlık', neden:'{{vergi-kodu}} girildiğinde; hesabı {{OB40}} belirler.' },
      { hesap:'159/653 Navlun karşılığı', tur:'Bilanço / Gelir tablosu', neden:'{{OBYC}} → **FR1**. Planlanan ek maliyetler (navlun, gümrük) için.' },
    ],

    fisler:[
      { baslik:'Senaryo 1 — Stoklu alım · mal girişi ({{MIGO}} 101)',
        belgeTuru:'WE', tarih:'10.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'150', ad:'İlk madde ve malzeme (stok)', borc:200000, not:'{{OBYC}} → **BSX** · değerleme sınıfı 3000' },
          { hesap:'159', ad:'GR/IR hesabı', alacak:200000, not:'{{OBYC}} → **WRX**' },
        ],
        not:'Değer **sipariş fiyatından** hesaplandı (100 ton × 2.000 TL). Fatura gelmediği için ' +
             'gerçek fiyat henüz bilinmiyor. Satıcıya borç **yok**.' },

      { baslik:'Senaryo 1 devamı — fatura ({{MIRO}}) · fiyat uyumlu',
        belgeTuru:'RE', tarih:'18.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR hesabı', borc:200000, not:'Mal girişindeki alacak kapanıyor' },
          { hesap:'191', ad:'İndirilecek KDV', borc:40000, not:'{{OB40}}' },
          { hesap:'320', ad:'Satıcılar — V-4001', alacak:240000, not:'{{LFB1}} `AKONT`' },
        ],
        not:'{{gr-ir}} sıfırlandı: mal da geldi, fatura da geldi. İki kalem {{F.13}} ile otomatik eşleşir.' },

      { baslik:'Senaryo 2 — Fiyat farkı · **standart fiyatlı** malzeme (S)',
        belgeTuru:'RE', tarih:'18.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR hesabı', borc:200000, not:'**Sipariş fiyatıyla** kapanır' },
          { hesap:'711', ad:'Fiyat farkı', borc:10000, not:'{{OBYC}} → **PRD** · fatura 210.000 geldi' },
          { hesap:'191', ad:'İndirilecek KDV', borc:42000 },
          { hesap:'320', ad:'Satıcılar', alacak:252000 },
        ],
        not:'{{fiyat-kontrolu}} = **S** (standart fiyat) olduğu için stok değeri **değişmez** — ' +
             '150 hesabı 200.000 TL olarak kalır. Fark gelir tablosuna (711) gider.\n\n' +
             'Mantık: standart fiyat bir **planlama fiyatıdır**; gerçek fiyatla farkı ' +
             'performans göstergesi olarak ayrı izlenir.' },

      { baslik:'Senaryo 2 alternatifi — **hareketli ortalama** malzeme (V)',
        belgeTuru:'RE', tarih:'18.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR hesabı', borc:200000, not:'Sipariş fiyatıyla' },
          { hesap:'150', ad:'İlk madde ve malzeme (stok)', borc:10000, not:'**Fark stoka eklendi** — PRD yok' },
          { hesap:'191', ad:'İndirilecek KDV', borc:42000 },
          { hesap:'320', ad:'Satıcılar', alacak:252000 },
        ],
        not:'{{fiyat-kontrolu}} = **V** (hareketli ortalama) olduğu için fark **stok değerine eklenir** ' +
             've birim fiyat güncellenir: 210.000 / 100 ton = 2.100 TL/ton.\n\n' +
             '**Kritik koşul:** stok hâlâ mevcut olmalıdır. Mal tüketilmişse fark stoka eklenemez ve ' +
             'kısmen fiyat farkı hesabına gider — bu, hareketli ortalamanın en sık şaşırtan davranışıdır.' },

      { baslik:'Senaryo 3 — Maliyet yerine alım (hesap atama K)',
        belgeTuru:'WE', tarih:'10.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — kırtasiye', borc:15000, not:'{{OBYC}} → **GBB/VBR** · maliyet yeri 1200' },
          { hesap:'159', ad:'GR/IR hesabı', alacak:15000 },
        ],
        not:'**Stok oluşmadı.** Hesap atama kategorisi K olduğu için malzeme alındığı an ' +
             'tüketilmiş sayılır ve doğrudan gider yazılır. Envanterde görünmez.\n\n' +
             'Bu yüzden "malzemeyi aldım ama stokta görünmüyor" şikâyetinin cevabı genelde ' +
             'siparişteki hesap atama kategorisidir.' },

      { baslik:'Senaryo 4 — Tüketim ({{MIGO}} 201 · maliyet yerine)',
        belgeTuru:'WA', tarih:'25.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'730', ad:'Genel üretim gideri — malzeme', borc:80000, not:'{{OBYC}} → **GBB/VBR** · maliyet yeri 3100' },
          { hesap:'150', ad:'İlk madde ve malzeme', alacak:80000, not:'{{OBYC}} → **BSX** (ters yön)' },
        ],
        not:'Stok gidere dönüştü. CO tarafında maliyet yeri 3100 yüklendi. ' +
             'Hareket türü 201 yerine 261 kullanılsaydı üretim siparişine yüklenecekti.' },

      { baslik:'Senaryo 5 — İade ({{MIGO}} 102 · mal girişi iptali)',
        belgeTuru:'WE', tarih:'12.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR hesabı', borc:40000, not:'Mal girişi geri alındı' },
          { hesap:'150', ad:'İlk madde ve malzeme', alacak:40000, not:'Stok azaldı' },
        ],
        not:'Hareket türü **102**, 101’in tersidir. Hesaplar aynı, yönler ters. ' +
             '{{OBYC}} aynı işlem anahtarlarını kullanır — hareket türü yalnızca yönü belirler.' },
    ],

    tHesaplar:[
      { hesap:'İlk madde ve malzeme (stok)', kod:'150',
        borc:[{ ad:'Mal girişi', tutar:200000 }, { ad:'Fiyat farkı (V)', tutar:10000 }],
        alacak:[{ ad:'Tüketim', tutar:80000 }, { ad:'İade', tutar:40000 }],
        not:'Değerleme sınıfına göre hesap seçilir' },
      { hesap:'GR/IR hesabı', kod:'159 (geçiş)',
        borc:[{ ad:'Fatura girişi', tutar:200000 }, { ad:'İade', tutar:40000 }],
        alacak:[{ ad:'Mal girişi', tutar:200000 }, { ad:'Maliyet yerine alım', tutar:15000 }],
        not:'Dönem sonunda sıfıra yakın olmalı' },
      { hesap:'Fiyat farkı', kod:'711 (gider)',
        borc:[{ ad:'Standart fiyat farkı', tutar:10000 }],
        alacak:[],
        not:'Yalnızca fiyat kontrolü S olan malzemelerde' },
      { hesap:'Genel üretim gideri', kod:'730',
        borc:[{ ad:'Malzeme tüketimi', tutar:80000 }],
        alacak:[],
        not:'CO’da maliyet yerine yüklenir' },
    ],

    notlar:[
      { tip:'warn', baslik:'GR/IR her zaman sipariş fiyatıyla kapanır', metin:
        'Mal girişi sipariş fiyatıyla değerlenir ve {{gr-ir}} o tutarla alacaklanır. ' +
        'Fatura farklı gelse bile GR/IR **aynı tutarla** kapanır; fark ayrı bir hesaba gider.\n\n' +
        'Sebep basit: GR/IR "mal geldi, faturası bekleniyor" demektir ve malın miktarı değişmemiştir. ' +
        'Değişen fiyattır ve bu ayrı bir bilgidir.\n\n' +
        'Bu kural bilinmezse "GR/IR neden 200.000 ile kapandı, fatura 210.000’di?" sorusu ' +
        'gereksiz yere araştırılır.' },
      { tip:'tip', baslik:'S mi V mi? — fiyat kontrolünün muhasebe etkisi', metin:
        '**S (standart fiyat):** stok değeri sabittir; fark **fiyat farkı hesabına** (PRD) gider. ' +
        'Avantajı: stok değeri öngörülebilir, sapma ayrı izlenir. Üretim malzemelerinde tercih edilir.\n\n' +
        '**V (hareketli ortalama):** fark **stoka eklenir**, birim fiyat güncellenir. ' +
        'Avantajı: stok gerçek maliyeti yansıtır. Ticari mallarda tercih edilir.\n\n' +
        '**V’nin tuzağı:** stok tükendiyse fark stoka eklenemez ve fiyat farkı hesabına gider. ' +
        'Yani V ile de PRD hesabı hareket görebilir — beklenmedik bir durumdur.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'MM entegrasyonunda çeşitlenme üç eksende olur: **hesap atama kategorisi** (nereye yazılacak), ' +
      '**{{malzeme-hareket-turu}}** (ne oluyor) ve **{{fiyat-kontrolu}}** (fark nereye gidecek).',

    liste:[
      { ad:'Stoklu alım', en:'Stock Purchase (hesap atama boş)',
        aciklama:'Malzeme envantere girer. Mal girişinde **stok hesabı** borçlanır; ' +
                 'tüketildiğinde gidere dönüşür.',
        neZaman:'Hammadde, ticari mal, ambalaj — depoda tutulan ve miktarı izlenen her şey.',
        ornek:'{{OBYC}} → BSX (stok) / WRX (GR-IR). Malzeme ana verisi zorunludur.',
        tcodes:['MIGO','MM03'] },

      { ad:'Maliyet yerine alım', en:'Consumption Purchase (hesap atama K)',
        aciklama:'Stok oluşmaz; malzeme alındığı an **tüketilmiş** sayılır ve doğrudan gider yazılır.',
        neZaman:'Kırtasiye, bakım malzemesi, hizmet alımı — miktar takibi gerekmeyen alımlar.',
        ornek:'{{OBYC}} → GBB/VBR (gider) / WRX. Malzeme ana verisi olmadan da yapılabilir (metin girişi).',
        tcodes:['ME21N','MIGO'] },

      { ad:'Duran varlığa alım', en:'Asset Purchase (hesap atama A)',
        aciklama:'Mal girişi doğrudan **duran varlığa** yazılır; {{aktiflestirme}} olur.',
        neZaman:'Makine, ekipman, araç alımlarında.',
        ornek:'Varlık hesabı borç / GR-IR alacak. Varlık numarası siparişte girilir.',
        tcodes:['ME21N','AS01','ABZON'] },

      { ad:'Proje / iç siparişe alım', en:'Project Purchase (hesap atama F/P)',
        aciklama:'Maliyet iç siparişe veya WBS öğesine yüklenir.',
        neZaman:'Proje bazlı alımlarda, yatırım siparişlerinde.',
        ornek:'Proje maliyeti borç / GR-IR alacak. CO/PS tarafında maliyet toplanır.' },

      { ad:'Standart fiyat (S)', en:'Standard Price',
        aciklama:'Stok sabit bir fiyatla değerlenir. Fatura farkı **fiyat farkı hesabına** (PRD) gider; ' +
                 'stok değeri değişmez.',
        neZaman:'Üretim malzemelerinde, maliyet muhasebesi yapılan ortamlarda. ' +
                'Öngörülebilirlik ve sapma analizi sağlar.',
        ornek:'Sipariş 2.000 TL, fatura 2.100 TL → 100 TL/ton fark 711 hesabına.',
        tcodes:['MM03','OBYC'] },

      { ad:'Hareketli ortalama (V)', en:'Moving Average Price',
        aciklama:'Fark **stok değerine eklenir** ve birim fiyat yeniden hesaplanır.',
        neZaman:'Ticari mallarda, fiyatı sık değişen alımlarda. Stok gerçek maliyeti yansıtır.',
        ornek:'100 ton @ 2.000 + 10.000 fark → yeni birim fiyat 2.100 TL/ton.',
        tcodes:['MM03'] },

      { ad:'Üç yönlü eşleştirme', en:'Three-way Match',
        aciklama:'Sipariş ↔ mal girişi ↔ fatura miktar ve fiyat açısından karşılaştırılır. ' +
                 'Tolerans dışı fark ödemeyi **bloklar**.',
        neZaman:'Siparişe dayalı tüm alımlarda — otomatik bir iç kontroldür.',
        ornek:'Sipariş 100 ton, mal girişi 100 ton, fatura 105 ton → miktar farkı → blok.',
        tcodes:['MIRO','MRBR','ME23N'] },

      { ad:'Planlanan ek maliyetler', en:'Planned Delivery Costs',
        aciklama:'Navlun, gümrük, sigorta gibi maliyetler sipariş sırasında planlanır ve ' +
                 'ayrı bir karşılık hesabında izlenir.',
        neZaman:'İthalatta ve nakliye maliyetinin stoka dâhil edildiği durumlarda.',
        ornek:'{{OBYC}} → **FR1** navlun karşılığı. Mal girişinde karşılık ayrılır, ' +
              'navlun faturası gelince kapanır.',
        tcodes:['ME21N','MIRO'] },
    ],

    karsilastirmaBasliklar:['Standart fiyat (S)', 'Hareketli ortalama (V)'],
    karsilastirma:[
      ['Stok değeri', '**Sabit** — planlanan fiyatla', '**Değişken** — her alımda güncellenir'],
      ['Fatura farkı nereye', '**PRD** fiyat farkı hesabına (gelir tablosu)', '**Stoka** eklenir (bilanço)'],
      ['Gelir tablosu etkisi', 'Fark **anında** gider/gelir', 'Fark **tüketildiğinde** gider olur'],
      ['Öngörülebilirlik', '**Yüksek** — stok değeri bilinir', 'Düşük — sürekli değişir'],
      ['Sapma analizi', '**Kolay** — PRD hesabı sapmayı gösterir', 'Zor — fark stoka gömülür'],
      ['Tipik kullanım', 'Üretim malzemeleri, mamuller', 'Ticari mallar, yedek parça'],
      ['Tuzak', 'Standart fiyat güncel değilse PRD şişer', '**Stok tükendiyse** fark PRD’ye gider'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'OBYC', ad:'MM otomatik hesap belirleme — entegrasyonun merkezi',
        amac:'Mal hareketlerinin ve faturaların hangi G/L hesaplarına gideceğini ' +
             '**işlem anahtarı + değerleme sınıfı** kombinasyonuyla tanımlar.',
        neZaman:'Kurulumda; her yeni {{degerleme-sinifi}} eklendiğinde; ' +
                '"Account determination not possible" hatasında.',
        adimlar:[
          { baslik:'İşlem anahtarını seç',
            aciklama:'**BSX** stok · **WRX** GR/IR · **PRD** fiyat farkı · **GBB** karşı hesap (tüketim) · ' +
                     '**FR1** navlun karşılığı · **KDM** kur farkı · **UMB** değerleme farkı.' },
          { baslik:'Hesap belirleme kuralını ayarla',
            aciklama:'Değerleme değiştirici (valuation modifier), **hesap belirleme grubu** (GBB için), ' +
                     've **değerleme sınıfı** kombinasyonu.' },
          { baslik:'Borç ve alacak hesaplarını gir',
            aciklama:'Çoğu anahtar için aynı hesap; bazılarında (PRD gibi) borç/alacak ayrı olabilir.' },
          { baslik:'{{OMWB}} ile test et',
            aciklama:'Kaydetmeden simülasyon: "şu malzeme, şu hareket türüyle hangi hesaba gider?"' },
        ],
        ekranAkisi:[
          { ekran:'İşlem anahtarı seçimi', islem:'BSX (stok girişi) seçildi' },
          { ekran:'Kurallar', islem:'Değerleme sınıfı aktif ✓ · değerleme değiştirici pasif' },
          { ekran:'Hesap ataması', islem:'Değerleme sınıfı 3000 → hesap 150000 · sınıf 3100 → 153000' },
          { ekran:'WRX anahtarı', islem:'Değerleme sınıfı pasif → tek hesap: 159000 (tüm malzemeler için)' },
        ],
        alanlar:{
          zorunlu:['İşlem anahtarı','Hesap planı','Değerleme sınıfı (aktifse)','G/L hesabı'],
          opsiyonel:['Değerleme değiştirici','Hesap belirleme grubu','Borç/alacak ayrımı'] },
        hatalar:[
          { mesaj:'Account determination for entry INT BSX 3020 not possible', sebep:'Değerleme sınıfı 3020 için stok hesabı tanımsız — genelde yeni malzeme grubu eklenmiş.', cozum:'{{OBYC}} → BSX → o değerleme sınıfı için hesabı ekle. **En sık MM–FI entegrasyon hatasıdır.**' },
          { mesaj:'Account determination for entry INT WRX not possible', sebep:'{{gr-ir}} hesabı tanımsız.', cozum:'{{OBYC}} → WRX → hesabı tanımla. WRX genelde değerleme sınıfından bağımsızdır (tek hesap).' },
          { mesaj:'Account determination for entry INT GBB VBR not possible', sebep:'Tüketim karşı hesabı tanımsız.', cozum:'{{OBYC}} → GBB → genel değiştirici **VBR** (maliyet yerine tüketim) için hesabı tanımla.' },
        ],
        ipucu:'**{{OMWB}} ile önce test et.** "Bu malzeme şu hareketle hangi hesaba gider?" sorusunu ' +
              'kaydetmeden cevaplar. Canlıda hata almadan önce eksik tanımı bulmanın en hızlı yoludur.\n\n' +
              'Ayrıca: **WRX genelde tek hesaptır** (değerleme sınıfından bağımsız), ' +
              '**BSX ise sınıfa göre değişir**. Bu asimetri kafa karıştırır ama mantıklıdır: ' +
              'GR/IR teknik bir geçiş hesabıdır, stok ise malzeme türüne göre ayrılmalıdır.',
        ilgili:['OMWB','MM03','MIGO','T030'] },

      { kod:'MIGO', ad:'Mal hareketi — ilk FI kaydının doğduğu yer',
        amac:'Mal girişi, çıkışı, transferi ve iadelerini kaydeder; FI belgesi otomatik oluşur.',
        neZaman:'Depo operasyonlarında. Muhasebeci genelde kullanmaz ama **sonucunu bilmek zorundadır**.',
        adimlar:[
          { baslik:'İşlem ve referans belgeyi seç',
            aciklama:'"Mal girişi" + "Satınalma siparişi" en yaygın kombinasyondur.' },
          { baslik:'Sipariş numarasını gir → kalemler otomatik gelir' },
          { baslik:'{{malzeme-hareket-turu}} kontrol et',
            aciklama:'**101** siparişe mal girişi, **102** iptali, **201** maliyet yerine tüketim, ' +
                     '**261** üretim siparişine, **301** transfer, **601** satış teslimatı.' },
          { baslik:'Miktarı ve depo yerini gir' },
          { baslik:'Kaydet → malzeme belgesi + FI belgesi oluşur',
            aciklama:'İki ayrı numara: malzeme belgesi ({{MSEG}}) ve FI belgesi ({{BKPF}}). ' +
                     'Bağlantı `AWKEY` üzerinden.' },
        ],
        alanlar:{
          zorunlu:['İşlem tipi','Referans belge','Hareket türü','Miktar','Depo yeri'],
          opsiyonel:['Belge tarihi','Kayıt tarihi','Parti','Metin','Teslimat notu numarası'] },
        hatalar:[
          { mesaj:'Account determination for entry ... not possible', sebep:'{{OBYC}}’de eksik tanım.', cozum:'{{OMWB}} ile hangi anahtarın eksik olduğunu bul, {{OBYC}}’de tamamla.' },
          { mesaj:'Posting only possible in periods ... in company code', sebep:'MM dönemi kapalı.', cozum:'MMPV ile MM dönemini aç (FI döneminden ayrıdır).' },
          { mesaj:'Document ... does not contain any items', sebep:'Sipariş kalemi zaten tam teslim alınmış.', cozum:'{{ME23N}} → sipariş geçmişi ile mevcut mal girişlerini kontrol et.' },
          { mesaj:'Deficit of stock', sebep:'Çıkış yapılmak istenen miktar stokta yok.', cozum:'{{MB51}} ile stok hareketlerini kontrol et; parti/depo yeri doğru mu bak.' },
        ],
        ipucu:'FI tarafında "bu belge nereden geldi?" sorusu için {{FB03}} → belge başlığı → ' +
              '`AWTYP` = **MKPF** ise malzeme belgesidir. `AWKEY` alanı malzeme belgesi numarasını verir; ' +
              '{{MB51}} veya {{MIGO}} görüntüleme ile detayına inilir.',
        ilgili:['MIRO','MB51','ME23N','OBYC'] },

      { kod:'MIRO', ad:'Lojistik fatura doğrulama',
        amac:'Siparişe ve mal girişine dayanan faturayı kaydeder; {{uc-yonlu-eslestirme}} yapar.',
        neZaman:'Siparişe bağlı tüm satıcı faturalarında.',
        adimlar:[
          { baslik:'İşlem tipi ve fatura tarihini gir' },
          { baslik:'Referans nesnesi: satınalma siparişi',
            aciklama:'Sistem **mal girişi yapılmış ama faturalanmamış** kalemleri getirir ve miktar/tutar önerir.' },
          { baslik:'Önerilen değerleri faturayla karşılaştır',
            aciklama:'İşin özü budur. Fark varsa tolerans kontrolü devreye girer.' },
          { baslik:'Bakiye göstergesini yeşile getir',
            aciklama:'Girilen brüt tutar = kalem toplamı + vergi + ek maliyetler.' },
          { baslik:'Simüle et ve kaydet',
            aciklama:'Fark tolerans dışıysa fatura kaydedilir **ama ödemeye bloklanır**.' },
        ],
        hatalar:[
          { mesaj:'Balance not zero', sebep:'Brüt tutar ile kalem toplamı + vergi eşleşmiyor.', cozum:'Kalem tutarlarını, vergi kodunu ve ek maliyet sekmesini kontrol et.' },
          { mesaj:'Price/quantity variance — invoice blocked', sebep:'Fark tolerans dışında.', cozum:'Farkı araştır; haklıysa {{MRBR}} ile serbest bırak, haksızsa alacak dekontu iste.' },
          { mesaj:'No (suitable) item found for purchase order', sebep:'Mal girişi yapılmamış veya kalem tam faturalanmış.', cozum:'{{ME23N}} → **sipariş geçmişi** sekmesi — {{EKBE}} tablosunu görsel gösterir.' },
        ],
        ipucu:'{{MIRO}} **iki numara** üretir: MM fatura belgesi ({{RBKP}}) ve FI belgesi ({{BKPF}}). ' +
              'Ekranda görünen MM numarasıdır ve {{FB03}}’te aranmaz — {{MIR4}} kullanılır.',
        ilgili:['MIGO','MRBR','MR8M','MIR4','ME23N'] },

      { kod:'OMWB', ad:'Hesap belirleme simülasyonu',
        amac:'{{OBYC}} kurallarını **çalıştırmadan** test eder.',
        neZaman:'Yeni değerleme sınıfı tanımlandığında; hesap belirleme hatası araştırılırken; ' +
                'canlıya geçmeden önce.',
        adimlar:[
          { baslik:'Simülasyon seçeneğini seç' },
          { baslik:'Tesis, malzeme ve hareket türünü gir' },
          { baslik:'Çalıştır → hangi hesapların kullanılacağı listelenir',
            aciklama:'Her işlem anahtarı için belirlenen hesap gösterilir; eksik olan kırmızı işaretlenir.' },
        ],
        ipucu:'**MM–FI hesap belirleme sorunlarının en hızlı teşhis aracıdır.** ' +
              '{{MIGO}}’da hata almayı beklemek yerine önce burada test et. ' +
              'Yeni malzeme grubu tanımlandığında rutin olarak çalıştırılmalıdır.',
        ilgili:['OBYC','MIGO','MM03'] },

      { kod:'MR11', ad:'GR/IR hesabı bakım (fark temizliği)',
        amac:'Kalıcı olarak eşleşmeyecek mal girişi/fatura farklarını yazarak {{gr-ir}} hesabını temizler.',
        neZaman:'Dönem sonunda, {{F.13}} otomatik kapatmasından sonra kalan küçük farklar için.',
        adimlar:[
          { baslik:'Şirket kodu, satıcı ve sipariş aralığını gir' },
          { baslik:'Fark tipini seç',
            aciklama:'"Teslim edildi ama faturalanmadı" veya "faturalandı ama teslim edilmedi".' },
          { baslik:'Tutar/tarih sınırı ver',
            aciklama:'Örn. 5.000 TL altındaki farklar ve 90 günden eski kalemler.' },
          { baslik:'Test modunda çalıştır, sonucu incele, gerçek modda çalıştır' },
        ],
        ipucu:'{{MR11}} **bakiyeyi gerçekten azaltır** — {{F.19}} sınıflamasından farkı budur. ' +
              'Burada kalıcı bir fark yazılır (gelir/gider); F.19 ise yalnızca sunum için taşır.\n\n' +
              'Bu yüzden MR11 dikkatli kullanılmalı ve tutar sınırı konmalıdır.',
        hatalar:[
          { mesaj:'No differences found', sebep:'Seçilen kriterlerde fark yok.', cozum:'Tutar/tarih sınırlarını gevşet; {{FBL3N}} ile GR/IR açık kalemlerini kontrol et.' },
        ],
        ilgili:['F.13','F.19','FBL3N','gr-ir'] },

      { kod:'ME23N', ad:'Satınalma siparişi görüntüle — sipariş geçmişi',
        amac:'Siparişi ve **sipariş geçmişi** sekmesini gösterir: kaç mal girişi, kaç fatura.',
        neZaman:'MIRO sorunlarında, GR/IR araştırmasında, "bu sipariş ne durumda?" sorusunda.',
        adimlar:[
          { baslik:'Sipariş numarasını gir' },
          { baslik:'Kalem seç → **Sipariş geçmişi** sekmesine geç',
            aciklama:'{{EKBE}} tablosunu görsel gösterir: her mal girişi ve fatura satır olarak listelenir.' },
          { baslik:'Satıra çift tıkla → malzeme veya fatura belgesine in' },
        ],
        ipucu:'**MIRO sorunlarının %80’i bu sekmeye bakınca anlaşılır:** mal girişi yapılmış mı, ' +
              'kısmi teslimat mı var, kalem zaten faturalanmış mı, sipariş fiyatı güncellenmiş mi.',
        ilgili:['MIRO','MIGO','EKBE','MB51'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'MM entegrasyonunda üç tablo grubu vardır: **sipariş** ({{EKKO}}/{{EKPO}}/{{EKBE}}), ' +
      '**hareket** ({{MSEG}}) ve **fatura** ({{RBKP}}/{{RSEG}}). ' +
      'Hepsi FI belgesine `AWKEY` üzerinden bağlanır. Hesap belirleme kuralları {{T030}}’dadır.',

    liste:[
      { ad:'EKKO', baslik:'Satınalma siparişi başlığı',
        tutar:'Siparişin satıcısı, tarihi, satın alma organizasyonu, para birimi.',
        olusturan:'{{ME21N}}',
        guncelleyen:'ME22N (değiştirme)',
        anahtar:'EBELN',
        iliskiler:'{{EKPO}} kalemleri, {{EKBE}} geçmişi.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'EBELN', aciklama:'Sipariş numarası' },
          { ad:'LIFNR', aciklama:'Satıcı', tip:'fk' },
          { ad:'WAERS', aciklama:'Sipariş para birimi' },
        ] },

      { ad:'EKPO', baslik:'Satınalma siparişi kalemleri',
        tutar:'Malzeme, miktar, fiyat, **hesap atama kategorisi**, değerleme sınıfı.',
        olusturan:'{{ME21N}}',
        guncelleyen:'ME22N',
        anahtar:'EBELN + EBELP',
        iliskiler:'{{EKBE}} ile geçmiş, {{RSEG}} ile fatura kalemleri.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KNTTP', aciklama:'**Hesap atama kategorisi** — boş stoklu, K maliyet yeri, A varlık, F iç sipariş. FI kaydını belirler.' },
          { ad:'NETPR', aciklama:'Net sipariş fiyatı — {{gr-ir}} bu fiyatla kapanır' },
          { ad:'MENGE', aciklama:'Sipariş miktarı' },
        ] },

      { ad:'EKBE', baslik:'Satınalma siparişi geçmişi',
        tutar:'Sipariş kaleminin **tüm** mal girişi ve fatura hareketleri.',
        olusturan:'{{MIGO}} ve {{MIRO}}',
        guncelleyen:'Her mal girişi ve fatura',
        anahtar:'EBELN + EBELP + ZEKKN + VGABE + GJAHR + BELNR + BUZEI',
        iliskiler:'{{MSEG}} ve {{RSEG}} belgelerine bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'VGABE', aciklama:'**1** = mal girişi, **2** = fatura girişi. GR/IR analizinin temeli.' },
          { ad:'MENGE / WRBTR', aciklama:'Miktar ve tutar' },
          { ad:'BELNR', aciklama:'İlgili malzeme veya fatura belgesi', tip:'fk' },
        ] },

      { ad:'MSEG', baslik:'Malzeme belgesi kalemleri',
        tutar:'Mal hareketinin satırları: malzeme, miktar, {{malzeme-hareket-turu}}, depo yeri, ' +
              'değerleme sınıfı, hesap atama.',
        olusturan:'{{MIGO}}',
        guncelleyen:'Mal hareketleri',
        anahtar:'MBLNR + MJAHR + ZEILE',
        iliskiler:'MKPF başlığı; {{BKPF}} ile `AWKEY` üzerinden FI belgesi.',
        s4:'S/4HANA’da MATDOC tablosuna birleştirildi; MSEG {{uyumluluk-view}} olarak korunuyor.',
        alanlar:[
          { ad:'BWART', aciklama:'**{{malzeme-hareket-turu}}** — 101, 102, 201, 261, 301, 601' },
          { ad:'BKLAS', aciklama:'**{{degerleme-sinifi}}** — {{OBYC}} hesap belirlemesinin girdisi' },
          { ad:'DMBTR', aciklama:'Yerel para tutarı' },
          { ad:'KOSTL / AUFNR', aciklama:'Maliyet yeri / iç sipariş — hesap atamalı hareketlerde' },
        ] },

      { ad:'RBKP', baslik:'Lojistik fatura başlığı',
        tutar:'{{MIRO}} faturasının MM tarafındaki başlığı: satıcı, tutar, tarih, blok durumu.',
        olusturan:'{{MIRO}}',
        guncelleyen:'{{MIRO}}, {{MRBR}}, {{MR8M}}',
        anahtar:'BELNR + GJAHR',
        iliskiler:'{{RSEG}} kalemleri; {{BKPF}} ile `AWKEY` üzerinden FI belgesi.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'ZLSPR', aciklama:'**Ödeme bloğu** — fiyat/miktar farkı varsa otomatik dolar' },
          { ad:'RMWWR', aciklama:'Fatura brüt tutarı' },
          { ad:'STBLG', aciklama:'İptal belgesi — {{MR8M}} ile iptal edildiyse dolar' },
        ] },

      { ad:'RSEG', baslik:'Lojistik fatura kalemleri',
        tutar:'Faturanın satırları; hangi sipariş kalemine karşılık geldiği.',
        olusturan:'{{MIRO}}',
        guncelleyen:'{{MIRO}}',
        anahtar:'BELNR + GJAHR + BUZEI',
        iliskiler:'{{EKPO}} sipariş kalemine bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'EBELN / EBELP', aciklama:'Sipariş ve kalem', tip:'fk' },
          { ad:'MENGE / WRBTR', aciklama:'Faturalanan miktar ve tutar' },
        ] },

      { ad:'T030', baslik:'Otomatik hesap belirleme',
        tutar:'{{OBYC}}’de tanımlanan kurallar: işlem anahtarı + değerleme sınıfı → G/L hesabı.',
        olusturan:'{{OBYC}}',
        guncelleyen:'{{OBYC}}, {{OB40}} (vergi), {{VKOA}} (SD)',
        anahtar:'KTOPL + KTOSL + BWMOD + KOMOK + BKLAS',
        iliskiler:'{{MSEG}}.BKLAS değerleme sınıfı üzerinden eşleşir.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KTOSL', aciklama:'**İşlem anahtarı**: BSX, WRX, PRD, GBB, FR1, KDM' },
          { ad:'BKLAS', aciklama:'Değerleme sınıfı' },
          { ad:'KONTS / KONTH', aciklama:'Borç ve alacak hesapları' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'MM–FI tablo köprüsü',
      varliklar:[
        { ad:'EKKO', rol:'Sipariş', aciklama:'Sipariş başlığı',
          alanlar:[{ ad:'EBELN', tip:'pk' }, { ad:'LIFNR', tip:'fk' }] },
        { ad:'EKPO', rol:'Sipariş', aciklama:'Sipariş kalemleri',
          alanlar:[{ ad:'EBELN', tip:'fk' }, { ad:'EBELP', tip:'pk' }, { ad:'KNTTP' }, { ad:'NETPR' }] },
        { ad:'EKBE', rol:'Köprü', hub:true, aciklama:'Sipariş geçmişi',
          alanlar:[{ ad:'EBELN', tip:'fk' }, { ad:'VGABE' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'MSEG', rol:'Hareket', aciklama:'Malzeme belgesi kalemleri',
          alanlar:[{ ad:'MBLNR', tip:'pk' }, { ad:'BWART' }, { ad:'BKLAS', tip:'fk' }] },
        { ad:'RBKP', rol:'Fatura', aciklama:'MM fatura başlığı',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'LIFNR', tip:'fk' }, { ad:'ZLSPR' }] },
        { ad:'RSEG', rol:'Fatura', aciklama:'MM fatura kalemleri',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'EBELN', tip:'fk' }] },
        { ad:'T030', rol:'Yapılandırma', aciklama:'Hesap belirleme',
          alanlar:[{ ad:'KTOSL', tip:'pk' }, { ad:'BKLAS', tip:'pk' }, { ad:'KONTS' }] },
        { ad:'BKPF', rol:'FI', aciklama:'FI belgesi',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'AWTYP' }, { ad:'AWKEY' }] },
      ],
      iliskiler:[
        { from:'EKKO', to:'EKPO', alanlar:'EBELN', not:'sipariş → kalemler' },
        { from:'EKPO', to:'EKBE', alanlar:'EBELN + EBELP', not:'kalem → geçmiş' },
        { from:'EKBE', to:'MSEG', alanlar:'BELNR (VGABE=1)', not:'mal girişi hareketi' },
        { from:'EKBE', to:'RSEG', alanlar:'BELNR (VGABE=2)', not:'fatura kalemi' },
        { from:'RBKP', to:'RSEG', alanlar:'BELNR + GJAHR', not:'fatura → kalemler' },
        { from:'MSEG', to:'T030', alanlar:'BKLAS → değerleme sınıfı', not:'hesap belirleme girdisi' },
        { from:'MSEG', to:'BKPF', alanlar:'MBLNR → AWKEY', not:'malzeme belgesi → FI belgesi' },
        { from:'RBKP', to:'BKPF', alanlar:'BELNR → AWKEY', not:'MM faturası → FI belgesi' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'FI danışmanı MM ekranlarını nadiren kullanır ama **sonuçlarını okumak zorundadır**. ' +
      'Aşağıda en çok ihtiyaç duyulan üç ekran: hesap belirleme testi, sipariş geçmişi ve ' +
      'FI belgesinden kaynağa iniş.',

    ekranlar:[
      { ad:'{{OBYC}} — hesap belirleme ekranı',
        aciklama:'İşlem anahtarı seçilir, sonra kurallar ve hesap ataması yapılır.',
        alanlar:[
          { ad:'İşlem anahtarı (`KTOSL`)', zorunlu:true, aciklama:'**BSX** stok, **WRX** GR/IR, **PRD** fiyat farkı, **GBB** karşı hesap, **FR1** navlun.' },
          { ad:'Kurallar (Rules)', zorunlu:true, aciklama:'Hangi kriterler aktif: değerleme değiştirici, hesap belirleme grubu, **değerleme sınıfı**.' },
          { ad:'Değerleme sınıfı', zorunlu:false, aciklama:'BSX’te aktiftir (her malzeme grubu farklı stok hesabı); WRX’te genelde pasiftir (tek GR/IR hesabı).' },
          { ad:'Borç / alacak hesabı', zorunlu:true, aciklama:'Çoğu anahtarda aynı hesap; PRD gibi bazılarında ayrı olabilir.' },
        ],
        ipucu:'**Asimetriyi hatırla:** BSX değerleme sınıfına göre değişir (stok hesapları ayrılmalı), ' +
              'WRX genelde tek hesaptır (GR/IR teknik bir geçiş hesabıdır). ' +
              'Bu, yeni malzeme grubu eklendiğinde yalnızca BSX’i güncellemenin yeterli olacağı anlamına gelir.' },

      { ad:'{{ME23N}} — sipariş geçmişi sekmesi',
        aciklama:'MM–FI sorunlarının teşhisinde en çok kullanılan ekran.',
        alanlar:[
          { ad:'Kalem seçimi', zorunlu:true, aciklama:'Sipariş kalemini seç, alt bölümde sekmeler açılır.' },
          { ad:'**Sipariş geçmişi** sekmesi', zorunlu:false, aciklama:'{{EKBE}} tablosunu görsel gösterir: her mal girişi (GR) ve fatura (IR) satır olarak.' },
          { ad:'Miktar ve değer sütunları', zorunlu:false, aciklama:'"Ne kadar geldi, ne kadarı faturalandı?" — GR/IR bakiyesinin sipariş bazında açıklaması.' },
          { ad:'Belge bağlantıları', zorunlu:false, aciklama:'Satıra çift tıkla → malzeme belgesi veya fatura belgesi.' },
        ],
        ipucu:'GR/IR bakiyesi araştırırken sipariş numarasını buraya gir. ' +
              'Mal girişi 100 ton, fatura 60 ton ise fark hemen görünür ve sebebi belli olur.' },

      { ad:'{{FB03}} — FI belgesinden kaynağa iniş',
        aciklama:'FI tarafından bakan biri için en önemli teşhis yolu.',
        alanlar:[
          { ad:'Belge başlığı → `AWTYP`', zorunlu:false, aciklama:'**MKPF** = malzeme belgesi (MIGO), **RMRP** = MM faturası (MIRO), **VBRK** = SD faturası.' },
          { ad:'Belge başlığı → `AWKEY`', zorunlu:false, aciklama:'Kaynak belge numarası. MKPF ise malzeme belgesi, RMRP ise MM fatura numarası.' },
          { ad:'Ortam → İlgili belgeler', zorunlu:false, aciklama:'Kaynak MM belgesine ve üretilen CO belgesine doğrudan geçiş.' },
        ],
        ipucu:'"Bu 200.000 TL neden 150 hesabına yazılmış?" sorusunun cevap zinciri: ' +
              '{{FB03}} → `AWKEY` → malzeme belgesi → malzemenin {{degerleme-sinifi}} → ' +
              '{{OBYC}} BSX kuralı. Beş adımda kesin cevap.' },
    ],

    zorunlu:['İşlem anahtarı','Hesap planı','G/L hesabı','Hareket türü','Miktar','Sipariş numarası (MIRO)'],
    opsiyonel:['Değerleme sınıfı','Değerleme değiştirici','Hesap belirleme grubu','Parti','Depo yeri'],

    hatalar:[
      { mesaj:'Account determination for entry INT BSX 3020 not possible', sebep:'Yeni {{degerleme-sinifi}} için stok hesabı tanımsız.', cozum:'{{OBYC}} → BSX → sınıf 3020 için hesabı ekle. **En sık MM–FI hatasıdır.** {{OMWB}} ile önceden test edilebilirdi.' },
      { mesaj:'Account determination for entry INT WRX not possible', sebep:'{{gr-ir}} hesabı tanımsız.', cozum:'{{OBYC}} → WRX → hesabı tanımla.' },
      { mesaj:'Account determination for entry INT GBB VBR not possible', sebep:'Tüketim karşı hesabı tanımsız.', cozum:'{{OBYC}} → GBB → genel değiştirici VBR için hesap tanımla.' },
      { mesaj:'Posting only possible in periods 03/2027 and 02/2027', sebep:'MM dönemi kapalı (FI döneminden ayrıdır).', cozum:'MMPV ile MM dönemini aç. Kapanışta MM **önce** kapatılır.' },
      { mesaj:'Price/quantity variance — invoice blocked for payment', sebep:'{{uc-yonlu-eslestirme}} farkı tolerans dışında.', cozum:'{{ME23N}} sipariş geçmişiyle karşılaştır; haklıysa {{MRBR}} ile serbest bırak.' },
      { mesaj:'Deficit of stock in plant/storage location', sebep:'Çıkış miktarı stokta yok.', cozum:'{{MB51}} ile hareketleri kontrol et; parti ve depo yerini doğrula.' },
      { mesaj:'FI belgesi oluşmadı ama malzeme belgesi var', sebep:'Değersiz hareket (yalnız miktar) veya hesap atama nedeniyle FI etkisi yok.', cozum:'Hareket türünün değer güncellemesi yapıp yapmadığını kontrol et; bazı transferler yalnızca miktar hareketi üretir.' },
    ],

    ipuclari:[
      '**{{OMWB}} ile önce test et.** Yeni malzeme grubu tanımlandığında rutin olarak çalıştır; ' +
      'canlıda hata almadan eksiği bul.',
      '{{ME23N}} → sipariş geçmişi sekmesi, MIRO ve GR/IR sorunlarının %80’ini tek bakışta çözer.',
      'FI belgesinden kaynağa inmek için {{FB03}} → belge başlığı → `AWTYP`/`AWKEY`.',
      'MM dönemi FI’dan **ayrıdır** ve kapanışta **önce** kapatılır. ' +
      '"Posting only possible in periods…" hatası MM dönemini işaret eder.',
      'Yeni {{degerleme-sinifi}} eklendiğinde yalnızca **BSX**’i güncellemek genelde yeterlidir; ' +
      'WRX ve GBB sınıftan bağımsız tanımlanmışsa dokunmaya gerek yoktur.',
      '{{gr-ir}} bakiyesini sipariş bazında incelemek için {{FBL3N}} düzenine **atama** alanını ekle — ' +
      'orada sipariş numarası bulunur.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'MSEG', ne:'Malzeme belgesi kalemleri; hareket türü ve değerleme sınıfı' },
      { tablo:'EKBE', ne:'Sipariş geçmişine satır eklenir (VGABE 1 veya 2)' },
      { tablo:'RBKP', ne:'MIRO faturasının MM başlığı' },
      { tablo:'RSEG', ne:'MIRO faturasının kalemleri' },
      { tablo:'BKPF', ne:'FI belgesi; `AWTYP` = MKPF veya RMRP, `AWKEY` = kaynak belge' },
      { tablo:'BSEG', ne:'FI kalemleri; stok, GR/IR, fiyat farkı, satıcı satırları' },
      { tablo:'ACDOCA', ne:'Evrensel kalemler; maliyet yeri ve malzeme boyutlarıyla' },
      { tablo:'BSIK', ne:'MIRO faturası satıcı açık kalemi üretir' },
    ],

    commit:
      'Mal hareketi ve fatura kaydı **tek LUW** içinde yazılır: MM belgesi ve FI belgesi birlikte oluşur. ' +
      'Biri başarısız olursa ikisi de yazılmaz.\n\n' +
      'Bu yüzden "malzeme belgesi var ama FI belgesi yok" durumu normalde **oluşamaz**. ' +
      'Oluşmuşsa iki ihtimal var: **(1)** hareket değersizdir (yalnız miktar güncellemesi yapan ' +
      'bazı transfer türleri), **(2)** asenkron güncelleme takılmıştır ({{SM13}}).',

    belgeNo:
      'MM işlemleri **iki numara** üretir:\n\n' +
      '**Malzeme belgesi** (MKPF/{{MSEG}}) — MM tarafında, kendi numara aralığından.\n' +
      '**FI belgesi** ({{BKPF}}) — belge türüne göre ({{MIGO}} için **WE**, {{MIRO}} için **RE**).\n\n' +
      '{{MIRO}} ayrıca **MM fatura numarası** üretir ({{RBKP}}) — bu, FI belge numarasından farklıdır ' +
      've ekranda görünen odur. {{FB03}}’te aranmaz; {{MIR4}} kullanılır.',

    postingLogic:
      'MM’den FI’a kayıt zinciri:\n\n' +
      '**1. Hareket türü** ({{MSEG}} `BWART`) belirlenir — ne oluyor?\n' +
      '**2. Hesap atama kategorisi** ({{EKPO}} `KNTTP`) — nereye yazılacak? (stok / gider / varlık / proje)\n' +
      '**3. {{degerleme-sinifi}}** ({{MSEG}} `BKLAS`) malzeme ana verisinden alınır.\n' +
      '**4. İşlem anahtarları** belirlenir: hareket türü hangi anahtarları tetikliyor ' +
      '(101 → BSX + WRX; 201 → BSX + GBB/VBR).\n' +
      '**5. {{OBYC}} sorgulanır:** işlem anahtarı + değerleme sınıfı → {{T030}}’dan G/L hesabı.\n' +
      '**6. {{fiyat-kontrolu}} kontrol edilir:** fark varsa S ise PRD’ye, V ise stoka.\n' +
      '**7. FI belgesi üretilir.**\n\n' +
      'Bu zincirin herhangi bir halkasında eksik varsa "Account determination not possible" alınır.',

    belgeTuru:
      'MM kaynaklı FI belgelerinin türleri: **WE** mal girişi, **WA** mal çıkışı/tüketim, ' +
      '**RE** lojistik fatura, **WL** teslimat (SD tarafı). ' +
      'Bu türler {{OBA7}}’de tanımlıdır ve genelde değiştirilmez.',

    numberRange:
      'Üç ayrı aralık vardır ve **hepsi** yılbaşında açılmalıdır: ' +
      'FI belge aralığı ({{FBN1}}), malzeme belgesi aralığı (MM tarafında), ' +
      've MM fatura belgesi aralığı. Yalnızca FI aralığını açıp MM’i unutmak, ' +
      'Ocak ayında mal girişinin durmasına yol açan klasik hatadır.',

    accountDetermination:
      '{{OBYC}} MM–FI entegrasyonunun merkezidir. Önemli işlem anahtarları:\n\n' +
      '**BSX** — stok hesabı. Değerleme sınıfına göre değişir; her malzeme grubu farklı stok hesabı kullanabilir.\n\n' +
      '**WRX** — {{gr-ir}} hesabı. Genelde değerleme sınıfından bağımsız, tek hesap.\n\n' +
      '**PRD** — fiyat farkı. Yalnızca {{fiyat-kontrolu}} = S olan malzemelerde devreye girer.\n\n' +
      '**GBB** — karşı hesap (offsetting). Genel değiştiricilerle ayrışır: ' +
      '**VBR** maliyet yerine tüketim, **VAX/VAY** satış maliyeti, **BSA** açılış stoku, ' +
      '**INV** envanter farkı, **ZOB** siparişsiz mal girişi.\n\n' +
      '**FR1** — navlun karşılığı. **KDM** — kur farkı. **UMB** — değerleme farkı.\n\n' +
      'Hepsi {{T030}} tablosuna yazar.',

    tur:
      '**Özelleştirme:** {{OBYC}} hesap belirleme, hareket türü ayarları, tolerans sınırları, ' +
      'hesap atama kategorileri, değerleme sınıfı tanımları.\n\n' +
      '**Ana veri:** malzeme ana verisi (değerleme sınıfı, fiyat kontrolü, standart/ortalama fiyat), ' +
      'satıcı ana verisi.\n\n' +
      '**Hareket verisi:** siparişler, malzeme belgeleri, faturalar.',

    transport:
      '{{OBYC}} ayarları taşınır. **Ama dikkat:** hesap numaralarına referans verir; ' +
      'hedef sistemde o hesaplar açılmamışsa kurallar çalışmaz.\n\n' +
      'Malzeme ana verisi ve değerleme sınıfı atamaları **ana veridir**, taşınmaz. ' +
      'Bu yüzden test sisteminde çalışan bir senaryo canlıda "account determination not possible" ' +
      'verebilir — malzemenin değerleme sınıfı farklı olabilir.',

    img:[
      { yol:'SPRO → Malzeme Yönetimi → Değerleme ve Hesap Atama → Hesap Belirleme → Sihirbazsız Hesap Belirleme → Otomatik Kayıtları Yapılandır', not:'{{OBYC}} — entegrasyonun merkezi' },
      { yol:'SPRO → Malzeme Yönetimi → Değerleme ve Hesap Atama → Hesap Belirleme → Hesap Belirlemeyi Simüle Et', not:'{{OMWB}} — test aracı' },
      { yol:'SPRO → Malzeme Yönetimi → Lojistik Fatura Doğrulama → Fatura Bloğu → Tolerans Sınırlarını Belirle', not:'{{MIRO}} blok toleransları' },
      { yol:'SPRO → Malzeme Yönetimi → Satın Alma → Hesap Atama → Hesap Atama Kategorilerini Bakımla', not:'K, A, F kategorileri' },
      { yol:'SPRO → Malzeme Yönetimi → Envanter Yönetimi → Hareket Türleri → Hareket Türlerini Kopyala/Değiştir', not:'{{malzeme-hareket-turu}} ayarları' },
    ],

    ekstra:[
      { ic:'🔑', baslik:'OBYC işlem anahtarlarını ezberleme yolu', metin:
        'Anahtarları tek tek ezberlemek yerine **hangi soruya cevap verdiklerini** düşün:\n\n' +
        '**BSX** — "malzeme nereye girecek?" → stok hesabı. Malzeme türüne göre değişmeli, ' +
        'bu yüzden {{degerleme-sinifi}} aktiftir.\n\n' +
        '**WRX** — "fatura gelene kadar karşılık nerede beklesin?" → GR/IR. ' +
        'Teknik bir bekleme yeridir, bu yüzden tek hesap yeter.\n\n' +
        '**PRD** — "planlanan ile gerçek fiyat farkı nereye?" → fiyat farkı hesabı.\n\n' +
        '**GBB** — "stok çıktığında karşısına ne yazılacak?" → duruma göre gider, satış maliyeti, ' +
        'envanter farkı. Bu yüzden **genel değiştirici** ile alt kırılımları vardır (VBR, VAX, INV…).\n\n' +
        'Bu mantıkla bakıldığında hangi anahtarın hangi durumda devreye gireceği tahmin edilebilir hâle gelir.' },

      { ic:'⚖️', baslik:'Hareketli ortalamanın sessiz tuzağı', metin:
        '{{fiyat-kontrolu}} = **V** olan bir malzemede fatura farkının stoka ekleneceği söylenir. ' +
        'Ama bunun bir **koşulu** vardır: stok hâlâ mevcut olmalıdır.\n\n' +
        'Örnek: 100 ton mal girdi, hepsi tüketildi, sonra fatura 10.000 TL fazla geldi. ' +
        'Fark stoka eklenemez — çünkü stok yok. Sistem farkı **fiyat farkı hesabına** yazar.\n\n' +
        'Kısmi durumda daha da karmaşıktır: 100 ton girdi, 60 ton tüketildi. ' +
        'Farkın %40’ı stoka eklenir, %60’ı fiyat farkı hesabına gider.\n\n' +
        'Bu davranış beklenmediği için "V malzemede neden PRD hesabı hareket gördü?" sorusu ' +
        'sık sorulur. Cevap: stok yetersizdi.' },
    ],

    notlar:[
      { tip:'warn', baslik:'MM dönemi FI döneminden ayrıdır', metin:
        'MM’in kendi dönem kontrolü vardır (MMPV ile yönetilir) ve {{OB52}}’den bağımsızdır.\n\n' +
        '"Posting only possible in periods 03/2027 and 02/2027" hatası **MM dönemini** işaret eder, ' +
        'FI dönemini değil. FI dönemi açık olsa bile MM kapalıysa mal hareketi yapılamaz.\n\n' +
        'Kapanışta sıra: **MM önce kapatılır**, sonra FI kapanış adımlarına geçilir.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'MM–FI entegrasyonunun **mantığı değişmedi**: {{OBYC}} aynı, işlem anahtarları aynı, ' +
      '{{gr-ir}} aynı. Değişen: malzeme belgelerinin **MATDOC** tablosunda birleşmesi, ' +
      'stok değerlemesinin {{ACDOCA}}’ya taşınması ve gerçek zamanlı stok raporlaması.',

    eccFarklari:[
      { konu:'Malzeme belgesi', ecc:'MKPF + {{MSEG}} ayrı tablolar', s4:'**MATDOC** tek tabloda birleşti; MSEG {{uyumluluk-view}}' },
      { konu:'Stok toplamları', ecc:'MARD, MBEW gibi toplam tabloları', s4:'MATDOC’tan **anlık hesaplanır**; toplam tabloları view' },
      { konu:'Stok değeri', ecc:'MBEW tablosunda', s4:'{{ACDOCA}} + MATDOC — FI ile birleşik' },
      { konu:'{{OBYC}}', ecc:'Hesap belirleme merkezi', s4:'**Değişmedi**' },
      { konu:'Fatura doğrulama', ecc:'{{MIRO}}', s4:'{{MIRO}} + Fiori "Create Supplier Invoice"' },
      { konu:'Malzeme numarası', ecc:'18 karakter', s4:'**40 karaktere** çıkarıldı' },
      { konu:'Stok raporlaması', ecc:'Toplam tablolarından', s4:'Gerçek zamanlı, kalem bazında' },
    ],

    universalJournal:
      'Stok hareketlerinin FI etkisi {{ACDOCA}}’ya yazılır ve malzeme, tesis, {{maliyet-yeri}} ' +
      '**aynı satırda** tutulur.\n\n' +
      'Pratik sonucu: "hangi malzemeden hangi maliyet yerinde ne kadar tüketim oldu?" sorusu ' +
      'tek tablodan cevaplanır. ECC’de {{MSEG}} + {{BSEG}} + CO tablolarını birleştirmek gerekiyordu.\n\n' +
      'Ayrıca stok değeri ile muhasebe stok hesabı arasındaki mutabakat **yapısal olarak** sağlanır.',

    kalkanTcodes:[
      { eski:'MB01, MB1A, MB1B, MB1C, MB31', yeni:'{{MIGO}}', not:'Eski mal hareketi işlemleri kaldırıldı; MIGO tek giriş noktası' },
      { eski:'MKPF / MSEG doğrudan sorgu', yeni:'MATDOC', not:'Yeni geliştirmelerde MATDOC kullanılmalı' },
      { eski:'—', yeni:'—', not:'{{OBYC}}, {{MIRO}}, {{MRBR}}, {{MR11}} **kaldırılmadı**' },
    ],

    fiori:[
      { ad:'Post Goods Movement', aciklama:'{{MIGO}}’nun Fiori karşılığı.' },
      { ad:'Create Supplier Invoice', aciklama:'{{MIRO}} yerine; sipariş referansı ve hesap önerisi tek ekranda.' },
      { ad:'Manage Purchase Orders', aciklama:'{{ME21N}}/{{ME23N}} yerine; sipariş geçmişi görsel.' },
      { ad:'GR/IR Monitor', aciklama:'{{gr-ir}} eşleşmemiş kalemlerini sipariş bazında görsel izler.' },
      { ad:'Material Documents Overview', aciklama:'{{MB51}} yerine; anlık süzme ve gruplama.' },
      { ad:'Stock — Multiple Materials', aciklama:'Gerçek zamanlı stok görünümü.' },
    ],

    compatibilityViews:[
      '{{MSEG}}, MKPF — MATDOC üzerinden üretilen {{uyumluluk-view}}.',
      'MARD, MBEW gibi stok toplam tabloları da view’e dönüştü.',
      '{{EKKO}}, {{EKPO}}, {{EKBE}}, {{RBKP}}, {{RSEG}}, {{T030}} — **fiziksel tablo olarak duruyor**.',
      '{{MSEG}}’e doğrudan yazan eski Z-programları geçişte bozulur; taranmalıdır.',
    ],

    performans:
      'Stok raporları MATDOC üzerinden anlık hesaplandığı için toplam tablosu bakımı ortadan kalktı — ' +
      'ECC’de stok toplamları bozulduğunda çalıştırılan yeniden oluşturma programları gereksizleşti.\n\n' +
      'Ayrıca aynı malzemeye eşzamanlı hareket yaparken oluşan **kilitlenmeler azaldı**: ' +
      'eskiden toplam tablosu satırı kilitlenirdi.',

    bestPractices:[
      'Yeni raporları {{MSEG}} yerine **MATDOC** veya CDS view üzerine kur.',
      'Geçiş öncesi {{gr-ir}} hesabını temizle; kirli açık kalemler yeni sisteme taşınır.',
      '{{OBYC}} tanımlarını geçişte gözden geçir: kullanılmayan değerleme sınıfları ve ' +
      'eski hesap atamaları sadeleştirilebilir.',
      '{{MSEG}}/MKPF’e yazan özel programları geçiş öncesi tara.',
      'Malzeme numarası 40 karaktere çıktı — arayüzlerde ve özel programlarda alan uzunluğunu kontrol et.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Yeni hammadde grubu: "Account determination not possible" hatasının anatomisi',
    hikaye:
      '**Marmara Tekstil A.Ş.** yeni bir boya grubu tanımladı ve ilk siparişi geldi. ' +
      'Depo elemanı mal girişi yapmaya çalışıyor ve hata alıyor. ' +
      'Bu senaryo, MM–FI entegrasyonundaki en yaygın hatanın nasıl teşhis edilip çözüldüğünü ve ' +
      'ardından tüm P2P zincirinin muhasebe ayağını gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · Hesap planı INT' },
      { k:'Malzeme', v:'BOYA-450 · yeni {{degerleme-sinifi}} **3020**' },
      { k:'Fiyat kontrolü', v:'**S** (standart fiyat) — 2.000 TL/varil' },
      { k:'Sipariş', v:'100 varil × 2.000 TL = 200.000 TL' },
      { k:'Satıcı', v:'V-4001 Ege Kimya · ödeme koşulu 30 gün' },
    ],

    adimlar:[
      { baslik:'Sipariş açılır — FI kaydı yok', tcode:'ME21N',
        aciklama:'Satın alma siparişi giriyor. Hesap atama kategorisi **boş** (stoklu alım).',
        girdi:[
          { alan:'Satıcı / Malzeme', deger:'V-4001 · BOYA-450' },
          { alan:'Miktar / Fiyat', deger:'100 varil × 2.000 TL' },
          { alan:'Hesap atama kategorisi', deger:'**Boş** — stoklu alım, malzeme envantere girecek' },
        ],
        tabloEtkisi:[
          { tablo:'EKKO', ne:'Sipariş başlığı 4500003100' },
          { tablo:'EKPO', ne:'Kalem 10: BOYA-450, 100 varil, `KNTTP` boş' },
        ],
        not:'**FI kaydı yok.** Sipariş bir taahhüttür; borç mal teslim alınınca doğar.' },

      { baslik:'Mal girişi denenir — HATA', tcode:'MIGO',
        aciklama:'Depo elemanı 100 varili teslim alıp kaydetmeye çalışıyor ve hata alıyor.',
        girdi:[
          { alan:'Hareket türü / Sipariş', deger:'101 · 4500003100' },
          { alan:'**HATA**', deger:'"Account determination for entry **INT BSX 3020** not possible"' },
          { alan:'Mesajın anlamı', deger:'Hesap planı INT · işlem anahtarı **BSX** (stok) · değerleme sınıfı **3020**' },
        ],
        not:'Hata mesajı aslında **tam olarak** sorunu söylüyor: 3020 değerleme sınıfı için ' +
             'stok hesabı tanımlanmamış. Ama depo elemanı bunu okuyamaz ve MM danışmanını arar; ' +
             'o da FI’a yönlendirir. **Entegrasyon konularının tipik zorluğu budur.**' },

      { baslik:'Teşhis — malzemenin değerleme sınıfı kontrol edilir', tcode:'MM03',
        aciklama:'Önce malzemenin hangi değerleme sınıfında olduğu doğrulanıyor.',
        girdi:[
          { alan:'Malzeme', deger:'BOYA-450 → Muhasebe görünümü' },
          { alan:'{{degerleme-sinifi}}', deger:'**3020** — yeni grup, daha önce kullanılmamış' },
          { alan:'{{fiyat-kontrolu}}', deger:'**S** — standart fiyat 2.000 TL' },
          { alan:'Karşılaştırma', deger:'Eski boyalar sınıf 3000’de → o sınıf {{OBYC}}’de tanımlı' },
        ],
        not:'Sorun netleşti: malzeme yeni bir sınıfa atanmış ama {{OBYC}}’de o sınıf için hesap yok.' },

      { baslik:'{{OMWB}} ile doğrulanır', tcode:'OMWB',
        aciklama:'Kaydetmeden simülasyon yapılıyor — hangi anahtarların eksik olduğu tam olarak görülüyor.',
        girdi:[
          { alan:'Tesis / Malzeme / Hareket türü', deger:'1000 · BOYA-450 · 101' },
          { alan:'BSX (stok)', deger:'**✕ Tanımsız** — sınıf 3020 için hesap yok' },
          { alan:'WRX (GR/IR)', deger:'✓ 159000 — sınıftan bağımsız, tanımlı' },
          { alan:'PRD (fiyat farkı)', deger:'✓ 711000 — tanımlı' },
        ],
        not:'Yalnızca **BSX eksik**. WRX ve PRD değerleme sınıfından bağımsız tanımlandığı için ' +
             'çalışıyor. Bu asimetri sayesinde düzeltme tek satırla yapılacak.' },

      { baslik:'{{OBYC}} tamamlanır', tcode:'OBYC',
        aciklama:'BSX işlem anahtarına 3020 sınıfı için hesap ekleniyor.',
        girdi:[
          { alan:'İşlem anahtarı', deger:'**BSX** — stok girişi' },
          { alan:'Mevcut satırlar', deger:'Sınıf 3000 → 150000 · sınıf 3100 → 153000' },
          { alan:'**Eklenen satır**', deger:'Sınıf **3020** → hesap **150200** (Boya ve kimyasal stoku)' },
          { alan:'Doğrulama', deger:'{{OMWB}} tekrar çalıştırıldı → BSX ✓' },
        ],
        tabloEtkisi:[
          { tablo:'T030', ne:'Yeni satır: KTOSL = BSX, BKLAS = 3020, KONTS = 150200' },
        ],
        not:'Düzeltme **30 saniye** sürdü. Bulmak yarım gün aldı. ' +
             'Bu yüzden yeni malzeme grubu tanımlandığında {{OMWB}} rutin olarak çalıştırılmalıdır.' },

      { baslik:'Mal girişi başarılı — ilk FI kaydı', tcode:'MIGO',
        aciklama:'Aynı işlem tekrarlanıyor ve bu kez FI belgesi oluşuyor.',
        girdi:[
          { alan:'Hareket türü / Miktar', deger:'101 · 100 varil' },
          { alan:'Değer', deger:'100 × 2.000 = 200.000 TL (**sipariş fiyatından**)' },
        ],
        fis:{ baslik:'Belge 5000002100 (malzeme) / 4900001234 (FI) — Mal girişi', belgeTuru:'WE', tarih:'10.03.2027',
          satirlar:[
            { hesap:'150200', ad:'Boya ve kimyasal stoku', borc:200000, not:'{{OBYC}} → **BSX** · sınıf 3020' },
            { hesap:'159000', ad:'GR/IR hesabı', alacak:200000, not:'{{OBYC}} → **WRX**' },
          ], not:'Satıcıya borç **yok** — fatura gelmedi. {{gr-ir}} bu boşluğu taşıyor.' },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'Hareket türü 101, değerleme sınıfı 3020' },
          { tablo:'EKBE', ne:'Sipariş geçmişine satır: `VGABE` = **1** (mal girişi), 100 varil' },
          { tablo:'BKPF', ne:'`AWTYP` = **MKPF**, `AWKEY` = 5000002100 → kaynak izlenebilir' },
          { tablo:'BSIS', ne:'159000 hesabında yeni açık kalem (alacak 200.000)' },
        ] },

      { baslik:'Fatura gelir — fiyat farkı çıkar', tcode:'MIRO',
        aciklama:'Satıcı 2.100 TL/varil fatura kesmiş. Sipariş 2.000 TL’ydi. ' +
                 'Fiyat kontrolü **S** olduğu için fark stoka **eklenmez**.',
        girdi:[
          { alan:'Fatura tarihi / Referans', deger:'18.03.2027 · EGE-2027-0812' },
          { alan:'Sipariş', deger:'4500003100 → kalem otomatik geldi' },
          { alan:'Sistem önerisi', deger:'100 varil × 2.000 = 200.000 TL' },
          { alan:'Fatura tutarı', deger:'100 varil × 2.100 = **210.000 TL** + %20 KDV' },
          { alan:'Fark', deger:'10.000 TL — tolerans %3 (6.000 TL) dışında → **blok**' },
        ],
        fis:{ baslik:'Belge 5100001200 (MM) / 1900002340 (FI) — Satıcı faturası', belgeTuru:'RE', tarih:'18.03.2027',
          satirlar:[
            { hesap:'159000', ad:'GR/IR hesabı', borc:200000, not:'**Sipariş fiyatıyla** kapandı' },
            { hesap:'711000', ad:'Fiyat farkı', borc:10000, not:'{{OBYC}} → **PRD** · fiyat kontrolü S' },
            { hesap:'191', ad:'İndirilecek KDV', borc:42000 },
            { hesap:'320', ad:'Satıcılar — V-4001', alacak:252000 },
          ], not:'**Stok değeri değişmedi** — 150200 hesabı 200.000 TL olarak kalıyor. ' +
                 'Standart fiyat bir planlama fiyatıdır; gerçekle farkı 711 hesabında ayrı izlenir.\n\n' +
                 'Fiyat kontrolü **V** olsaydı 10.000 TL stoka eklenecek ve birim fiyat 2.100 olacaktı.' },
        tabloEtkisi:[
          { tablo:'RBKP', ne:'MM fatura 5100001200; `ZLSPR` = **R** (fiyat farkı bloğu)' },
          { tablo:'RSEG', ne:'Fatura kalemi: sipariş 4500003100 kalem 10' },
          { tablo:'EKBE', ne:'Sipariş geçmişine satır: `VGABE` = **2** (fatura), 100 varil / 210.000 TL' },
          { tablo:'BSIK', ne:'Satıcı açık kalemi 252.000 TL — **ödeme bloklu**' },
          { tablo:'BSIS', ne:'159000 hesabındaki açık kalem kapandı' },
        ] },

      { baslik:'Blok araştırılır ve çözülür', tcode:'MRBR',
        aciklama:'AP uzmanı {{ME23N}} → sipariş geçmişine bakıyor ve satın almaya soruyor.',
        girdi:[
          { alan:'{{ME23N}} sipariş geçmişi', deger:'GR: 100 varil / 200.000 · IR: 100 varil / 210.000 → miktar uyumlu, fiyat farklı' },
          { alan:'Satın alma cevabı', deger:'Mart başında fiyat artışı sözleşmeyle kabul edilmiş, sipariş güncellenmemiş' },
          { alan:'Karar', deger:'Fark **haklı** → {{MRBR}} ile serbest bırakıldı' },
        ],
        not:'Blok kalkmadan {{F110}} bu faturayı **görmez**. Blok yönetimi geciktikçe ' +
             '{{iskonto}} fırsatı da kaçar.' },

      { baslik:'Malzeme tüketilir', tcode:'MIGO',
        aciklama:'Üretim 40 varil boya çekiyor. Stok gidere dönüşüyor.',
        girdi:[
          { alan:'Hareket türü', deger:'**201** — maliyet yerine tüketim' },
          { alan:'Miktar / Maliyet yeri', deger:'40 varil · 3100 (Üretim)' },
        ],
        fis:{ baslik:'Belge 4900001456 — Malzeme tüketimi', belgeTuru:'WA', tarih:'25.03.2027',
          satirlar:[
            { hesap:'730', ad:'Genel üretim gideri — malzeme', borc:80000, not:'{{OBYC}} → **GBB/VBR** · 40 × 2.000' },
            { hesap:'150200', ad:'Boya ve kimyasal stoku', alacak:80000, not:'{{OBYC}} → **BSX** (ters yön)' },
          ], not:'Tüketim **standart fiyatla** değerlendi (2.000 TL), fatura fiyatıyla değil. ' +
                 'Standart fiyat mantığının sonucu budur: maliyetler öngörülebilir kalır, ' +
                 'sapma 711 hesabında ayrı izlenir.' },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'Hareket türü 201, maliyet yeri 3100' },
          { tablo:'ACDOCA', ne:'Gider satırı; malzeme + maliyet yeri **aynı satırda**' },
        ] },

      { baslik:'Dönem sonu — GR/IR kontrolü', tcode:'FBL3N',
        aciklama:'Bu sipariş için mal girişi ve fatura eşleşti; kalem kapandı.',
        girdi:[
          { alan:'Hesap 159000 · açık kalemler', deger:'Bu sipariş için kalem **yok** — eşleşti ✓' },
          { alan:'Diğer siparişler', deger:'12 açık kalem, toplam 340.000 TL' },
          { alan:'Aksiyon', deger:'{{F.13}} çalıştırıldı → 8 kalem kapandı · kalan {{F.19}} ile sınıflanacak' },
        ] },
    ],

    sonuc:
      '**Zincirin özeti:** sipariş (FI kaydı yok) → mal girişi (stok + GR/IR) → ' +
      'fatura (GR/IR kapandı, fark PRD’ye) → blok çözümü → tüketim (stok → gider).\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Hata mesajı sorunu tam olarak söyler ama kimse okumaz.** ' +
      '"INT BSX 3020" üç bilgi içeriyordu: hesap planı, işlem anahtarı, değerleme sınıfı. ' +
      'Bu üçlüyü okuyabilen biri sorunu 30 saniyede çözer.\n\n' +
      '**2. {{OMWB}} ile önceden test edilebilirdi.** Yeni malzeme grubu tanımlandığında ' +
      'simülasyon çalıştırmak, canlıda hata alınmasını önler. Rutin hâline getirilmelidir.\n\n' +
      '**3. {{gr-ir}} her zaman sipariş fiyatıyla kapanır.** Fatura farklı gelse bile. ' +
      'Fark ayrı bir hesaba gider ve nereye gideceğini **{{fiyat-kontrolu}}** belirler: ' +
      'S ise fiyat farkı hesabına, V ise stoka.\n\n' +
      '**4. Entegrasyon sorunlarında sorumluluk sınırı bulanıktır.** Hata MM’de çıktı, ' +
      'çözüm FI’daydı. Bu yüzden {{OBYC}}’yi kuran kişi **her iki modülü de** bilmek zorundadır — ' +
      've FI danışmanı için MM entegrasyonu isteğe bağlı bir konu değildir.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'MM entegrasyonu, mal hareketlerinin ve satın alma faturalarının **otomatik** FI belgesine dönüşmesidir.',
      'Otomatikliğin kalbi **{{OBYC}}**’dir: işlem anahtarı + {{degerleme-sinifi}} → G/L hesabı ({{T030}}).',
      'Zincir üç adımdır: **mal girişi** (stok + GR/IR) → **fatura** (GR/IR kapanır, satıcı borçlanır) → **tüketim** (stok → gider).',
      'Sipariş **FI kaydı üretmez** — bir taahhüttür; borç mal teslim alınınca doğar.',
      '{{gr-ir}} **her zaman sipariş fiyatıyla** kapanır; fark ayrı hesaba gider.',
      'Farkın nereye gideceğini **{{fiyat-kontrolu}}** belirler: **S** → fiyat farkı hesabı (PRD), **V** → stoka eklenir.',
      'Siparişteki **hesap atama kategorisi** kaydı tamamen değiştirir: boş stoklu, K gider, A varlık, F proje.',
      'MM dönemi FI döneminden **ayrıdır** ve kapanışta **önce** kapatılır.',
    ],

    onemliNoktalar:[
      '**"OBYC’de BSX, WRX, PRD ne yapar?"** BSX stok hesabı (değerleme sınıfına göre değişir), WRX GR/IR (genelde tek hesap), PRD fiyat farkı (yalnız S fiyat kontrolünde). **En çok sorulan MM entegrasyon sorusudur.**',
      '**"Sipariş FI kaydı üretir mi?"** Hayır. Taahhüttür; ilk FI kaydı mal girişinde oluşur.',
      '**"GR/IR hangi tutarla kapanır?"** Her zaman **sipariş fiyatıyla** (mal girişindeki değerle). Fark ayrı hesaba gider.',
      '**"S ile V farkı nedir?"** S: stok değeri sabit, fark PRD’ye. V: fark stoka eklenir, birim fiyat güncellenir. **V’nin tuzağı:** stok tükendiyse fark yine PRD’ye gider.',
      '**"Hesap atama kategorisi ne değiştirir?"** Boş → stok oluşur. K → doğrudan gider (stok yok). A → duran varlık. F → proje maliyeti. Aynı malzeme, farklı kayıt.',
      '**"Account determination not possible hatasını nasıl çözersin?"** Mesajdaki üçlüyü oku (hesap planı + işlem anahtarı + değerleme sınıfı), {{OMWB}} ile doğrula, {{OBYC}}’de eksiği tamamla.',
      '**"FI belgesinden MM belgesine nasıl inilir?"** {{FB03}} → belge başlığı → `AWTYP` (MKPF/RMRP) ve `AWKEY` (kaynak belge numarası).',
      '**"MIRO kaç numara üretir?"** İki: MM fatura belgesi ({{RBKP}}) ve FI belgesi ({{BKPF}}). Ekranda MM numarası görünür; {{FB03}}’te aranmaz.',
    ],

    sikHatalar:[
      { hata:'Siparişin FI kaydı ürettiğini sanmak.', dogru:'Sipariş bir taahhüttür; ilk FI kaydı mal girişinde ({{MIGO}}) oluşur.' },
      { hata:'GR/IR’ın fatura fiyatıyla kapanmasını beklemek.', dogru:'Her zaman **sipariş fiyatıyla** kapanır; fark PRD’ye veya stoka gider.' },
      { hata:'V fiyat kontrolünde farkın hep stoka gideceğini sanmak.', dogru:'Stok tükendiyse fark **fiyat farkı hesabına** gider. Kısmi durumda oransal bölünür.' },
      { hata:'"Account determination not possible" hatasında hesabı elle girmeye çalışmak.', dogru:'Hata bir yapılandırma eksiğidir; {{OBYC}}’de ilgili satır tamamlanır.' },
      { hata:'Yeni malzeme grubu tanımlarken {{OBYC}}’yi kontrol etmemek.', dogru:'{{OMWB}} ile önceden test edilir; canlıda hata alınması önlenir.' },
      { hata:'MM dönemini FI dönemiyle karıştırmak.', dogru:'Ayrıdır (MMPV ile yönetilir). "Posting only possible in periods…" MM dönemini işaret eder.' },
      { hata:'MM faturasını {{FB08}} ile FI’dan iptal etmek.', dogru:'{{MR8M}} ile MM’den iptal edilir; yoksa MM tarafı "faturalanmış" kalır.' },
      { hata:'{{MIRO}}’daki MM numarasını {{FB03}}’te aramak.', dogru:'İki ayrı numara vardır. MM için {{MIR4}}, FI için {{FB03}}.' },
      { hata:'Bloklu faturayı iptal edip yeniden girmek.', dogru:'Blok bir kontroldür. Fark araştırılır, haklıysa {{MRBR}} ile serbest bırakılır.' },
    ],

    ipuclari:[
      '**{{OMWB}} ile önce test et.** Yeni değerleme sınıfı tanımlandığında rutin olarak çalıştır.',
      '"Account determination not possible" mesajındaki **üçlüyü oku**: hesap planı + işlem anahtarı + ' +
      'değerleme sınıfı. Sorunu tam olarak söyler.',
      '{{ME23N}} → **sipariş geçmişi** sekmesi, MIRO ve GR/IR sorunlarının çoğunu tek bakışta çözer.',
      'FI belgesinden kaynağa inmek için {{FB03}} → belge başlığı → `AWTYP`/`AWKEY`.',
      'Yeni değerleme sınıfı eklendiğinde genelde yalnızca **BSX** güncellenir; ' +
      'WRX ve GBB sınıftan bağımsızsa dokunmaya gerek yoktur.',
      '{{gr-ir}} bakiyesini sipariş bazında incelemek için {{FBL3N}} düzenine **atama** alanını ekle.',
    ],

    quiz:[
      { soru:'Satınalma siparişi açıldığında hangi FI kaydı oluşur?',
        secenekler:[
          'Stok borç / GR-IR alacak',
          '**Hiçbir FI kaydı oluşmaz**',
          'Gider borç / Satıcı alacak',
          'GR-IR borç / Satıcı alacak',
        ], dogru:1,
        aciklama:'Sipariş bir **taahhüttür**, yükümlülük değil. Yalnızca {{EKKO}}/{{EKPO}} tablolarına yazılır. ' +
                 'İlk FI kaydı {{MIGO}} ile mal girişinde oluşur: stok borç / {{gr-ir}} alacak.' },

      { soru:'{{OBYC}}’de **WRX** işlem anahtarı hangi hesabı belirler?',
        secenekler:['Stok hesabı','**GR/IR hesabı**','Fiyat farkı hesabı','Satıcı hesabı'],
        dogru:1,
        aciklama:'**BSX** stok, **WRX** {{gr-ir}}, **PRD** fiyat farkı, **GBB** karşı hesap (tüketim). ' +
                 'WRX genelde {{degerleme-sinifi}}ndan bağımsızdır (tek hesap) çünkü GR/IR ' +
                 'teknik bir geçiş hesabıdır; BSX ise malzeme grubuna göre ayrılır.' },

      { soru:'Sipariş 2.000 TL/adet, fatura 2.100 TL/adet. Malzeme **standart fiyatlı (S)**. 100 adet için ne olur?',
        secenekler:[
          'Stok 210.000 TL olur',
          '**GR/IR 200.000 ile kapanır, 10.000 TL fiyat farkı hesabına gider; stok değişmez**',
          'GR/IR 210.000 ile kapanır',
          'Fark satıcı hesabına yazılır',
        ], dogru:1,
        aciklama:'{{gr-ir}} her zaman **sipariş fiyatıyla** kapanır. {{fiyat-kontrolu}} = S olduğu için ' +
                 'stok değeri sabit kalır (200.000 TL) ve fark {{OBYC}} → **PRD** hesabına gider. ' +
                 'V olsaydı fark stoka eklenir ve birim fiyat 2.100 olurdu.' },

      { soru:'Siparişte hesap atama kategorisi **K** (maliyet yeri) seçildi. Mal girişinde ne olur?',
        secenekler:[
          'Stok borç / GR-IR alacak',
          '**Gider borç / GR-IR alacak — stok oluşmaz**',
          'Varlık borç / GR-IR alacak',
          'Hiçbir kayıt oluşmaz',
        ], dogru:1,
        aciklama:'Hesap atama kategorisi K olduğunda malzeme alındığı an **tüketilmiş** sayılır ve ' +
                 'doğrudan gider yazılır ({{OBYC}} → GBB/VBR). Envanterde görünmez. ' +
                 '"Malzemeyi aldım ama stokta yok" şikâyetinin cevabı genelde budur.' },

      { soru:'"Account determination for entry INT BSX 3020 not possible" hatası ne anlama gelir?',
        secenekler:[
          'Malzeme 3020 numarası bulunamadı',
          '**Hesap planı INT’te, BSX (stok) anahtarı için değerleme sınıfı 3020’ye hesap atanmamış**',
          'Sipariş 3020 kapalı',
          'Dönem 3020 açık değil',
        ], dogru:1,
        aciklama:'Mesaj üç bilgi içerir: **INT** hesap planı, **BSX** işlem anahtarı (stok), ' +
                 '**3020** değerleme sınıfı. Çözüm: {{OBYC}} → BSX → sınıf 3020 için hesabı ekle. ' +
                 '{{OMWB}} ile önceden test edilebilirdi.' },

      { soru:'{{fiyat-kontrolu}} = **V** (hareketli ortalama) olan malzemede fatura farkı çıktı ama ' +
             'stok tamamen tüketilmişti. Fark nereye gider?',
        secenekler:[
          'Stoka eklenir (negatif stok oluşur)',
          '**Fiyat farkı hesabına gider**',
          'GR/IR hesabında kalır',
          'Satıcı hesabına yazılır',
        ], dogru:1,
        aciklama:'V fiyat kontrolünde fark **stoka eklenir — ama stok mevcutsa**. ' +
                 'Stok tükendiyse ekleyecek yer yoktur ve fark {{OBYC}} → PRD hesabına gider. ' +
                 'Kısmi durumda oransal bölünür. "V malzemede neden PRD hareket gördü?" sorusunun cevabıdır.' },

      { soru:'{{MIRO}} ile girilmiş bir fatura yanlış. Nasıl iptal edilir?',
        secenekler:[
          '{{FB08}} ile FI’dan ters kaydedilir',
          '**{{MR8M}} ile MM’den iptal edilir**',
          '{{FB02}} ile düzeltilir',
          '{{MRBR}} ile bloke edilir',
        ], dogru:1,
        aciklama:'MM kaynaklı belgeler **kaynak modülden** iptal edilmelidir. ' +
                 '{{FB08}} FI’ı düzeltir ama MM tarafı "faturalanmış" görünmeye devam eder ve ' +
                 '{{EKBE}} sipariş geçmişi tutarsız kalır.' },

      { soru:'FI belgesinin MM’den geldiğini nasıl anlarsın?',
        secenekler:[
          'Belge türüne bakarak',
          '**{{FB03}} → belge başlığı → `AWTYP` alanı (MKPF veya RMRP)**',
          'Tutara bakarak',
          'Anlaşılamaz',
        ], dogru:1,
        aciklama:'`AWTYP` kaynak belge tipini söyler: **MKPF** malzeme belgesi ({{MIGO}}), ' +
                 '**RMRP** MM faturası ({{MIRO}}), **VBRK** SD faturası. ' +
                 '`AWKEY` ise kaynak belge numarasını verir. Entegrasyon izini süren alanlar bunlardır.' },
    ],

    flashcards:[
      { on:'MM entegrasyonunun üç adımı nedir?', arka:'1. **Mal girişi** (MIGO 101) → stok borç / GR-IR alacak\n2. **Fatura** (MIRO) → GR-IR borç / satıcı alacak\n3. **Tüketim** (MIGO 201/261) → gider borç / stok alacak\n\nSipariş FI kaydı üretmez.' },
      { on:'OBYC’nin ana işlem anahtarları nelerdir?', arka:'**BSX** — stok hesabı (değerleme sınıfına göre)\n**WRX** — GR/IR (genelde tek hesap)\n**PRD** — fiyat farkı (yalnız S)\n**GBB** — karşı hesap (VBR tüketim, VAX satış maliyeti)\n**FR1** — navlun karşılığı' },
      { on:'GR/IR hangi tutarla kapanır?', arka:'**Her zaman sipariş fiyatıyla** (mal girişindeki değerle).\n\nFatura farklı gelse bile.\n\nFark ayrı hesaba gider:\n• Fiyat kontrolü **S** → PRD hesabı\n• Fiyat kontrolü **V** → stoka eklenir' },
      { on:'Fiyat kontrolü S ile V farkı nedir?', arka:'**S (standart):** stok değeri sabit, fark **PRD** hesabına → sapma ayrı izlenir\n\n**V (hareketli ortalama):** fark **stoka** eklenir, birim fiyat güncellenir\n\n**V tuzağı:** stok tükendiyse fark yine PRD’ye gider.' },
      { on:'Hesap atama kategorisi neyi değiştirir?', arka:'**Boş** → stoklu alım (stok borç)\n**K** → maliyet yerine (**gider borç, stok yok**)\n**A** → duran varlığa (aktifleştirme)\n**F** → proje/iç siparişe\n\nAynı malzeme, tamamen farklı FI kaydı.' },
      { on:'"Account determination not possible" nasıl çözülür?', arka:'Mesajdaki **üçlüyü oku**: hesap planı + işlem anahtarı + değerleme sınıfı.\n\nÖrn: "INT BSX 3020" → OBYC → BSX → sınıf 3020 için hesap ekle.\n\n**OMWB** ile önceden test edilebilirdi.' },
      { on:'FI belgesinin kaynağını nasıl bulursun?', arka:'**FB03 → belge başlığı → AWTYP / AWKEY**\n\n`AWTYP`:\n• **MKPF** = malzeme belgesi (MIGO)\n• **RMRP** = MM faturası (MIRO)\n• **VBRK** = SD faturası\n\n`AWKEY` = kaynak belge numarası' },
      { on:'MIRO kaç belge numarası üretir?', arka:'**İki:**\n• MM fatura belgesi (RBKP) — **ekranda görünen**\n• FI belgesi (BKPF) — farklı numara\n\nMM numarası FB03’te aranmaz; **MIR4** kullanılır.' },
      { on:'MM dönemi ile FI dönemi aynı mı?', arka:'**Hayır — ayrıdır.**\n\nMM dönemi **MMPV** ile yönetilir, FI dönemi OB52 ile.\n\n"Posting only possible in periods…" hatası **MM dönemini** işaret eder.\n\nKapanışta MM **önce** kapatılır.' },
      { on:'MM belgesinin ana tabloları nelerdir?', arka:'**EKKO/EKPO** — sipariş başlık/kalem\n**EKBE** — sipariş geçmişi (VGABE 1=GR, 2=IR)\n**MSEG** — malzeme belgesi kalemleri\n**RBKP/RSEG** — MM fatura\n**T030** — OBYC hesap belirleme kuralları' },
      { on:'ME23N sipariş geçmişi sekmesi ne gösterir?', arka:'**EKBE tablosunu görsel olarak:**\n• Kaç mal girişi yapılmış (VGABE=1)\n• Kaç fatura girilmiş (VGABE=2)\n• Miktar ve değer karşılaştırması\n\nMIRO ve GR/IR sorunlarının %80’i burada çözülür.' },
      { on:'S/4HANA’da MM entegrasyonunda ne değişti?', arka:'• Malzeme belgeleri **MATDOC** tablosunda birleşti (MSEG compatibility view)\n• Stok toplamları **anlık hesaplanıyor**\n• Malzeme numarası 18 → **40 karakter**\n• **OBYC değişmedi** — mantık aynı' },
    ],
  },

  },
});
