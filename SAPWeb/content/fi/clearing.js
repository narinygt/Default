/* ==========================================================================
   content/fi/clearing.js — "Clearing (Kapatma)" derin içeriği
   ========================================================================== */

SAP.registerTopic({
  id: 'clearing',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      '{{kapatma}} (clearing), birbirini götüren açık kalemleri eşleştirip **kapalı** hâle getirme işlemidir. ' +
      'En bilinen hâli faturanın ödemeyle buluşmasıdır ama kapsamı çok daha geniştir: ' +
      '{{gr-ir}} hesabında mal girişiyle fatura, banka ara hesabında ödemeyle ekstre satırı, ' +
      'avans hesabında avansla mahsup kaydı eşleşir.\n\n' +
      'Teknik olarak kapatma iki şey yapar: kapatılan kalemlere **kapatma belgesi numarasını** ' +
      '({{BSEG}} `AUGBL`) ve **kapatma tarihini** (`AUGDT`) yazar. Bir kalemin açık mı kapalı mı ' +
      'olduğunun tek ölçütü budur — `AUGBL` boşsa kalem açıktır.',

    neden:
      '**Neyin ödenmediğini bilmek için.** Kapatma olmasaydı 5.000 faturalık bir hesapta hangisinin ' +
      'ödendiğini anlamak imkânsız olurdu; sadece toplam bakiye görünürdü.\n\n' +
      '**Geçiş hesaplarını temizlemek için.** {{gr-ir}} ve {{banka-ara-hesabi}} gibi hesaplar iki olay ' +
      'arasındaki farkı taşır ve **sıfırlanmaları beklenir**. Kapatma bu sıfırlamayı yapar.\n\n' +
      '**{{yaslandirma}} için.** Vade analizi yalnızca açık kalemler üzerinden anlamlıdır.\n\n' +
      '**Mutabakat için.** Muavin defter toplamı ile {{mutabakat-hesabi}} bakiyesi, kapatma sayesinde ' +
      'izlenebilir kalır.',

    sirketOnemi:
      'Kapatma, muhasebenin **sessiz temizlik işidir**: yapılmadığında hiçbir hata mesajı çıkmaz, ' +
      'sadece hesaplar yavaş yavaş kirlenir.\n\n' +
      'Sonucu ağırdır: {{gr-ir}} bakiyesi yıllar içinde milyonlara çıkar ve denetimde açıklanamaz; ' +
      'banka ara hesabı şişer ve nakit mutabakatı kopar; yaşlandırma raporu ödenmiş faturaları ' +
      '"gecikmiş" göstermeye devam eder.\n\n' +
      'Danışmanlık açısından: kapatmanın **otomatik çalışması** ({{F.13}}) hesap ana verisindeki ' +
      '**sıralama anahtarına** bağlıdır. Bu bağlantıyı bilmek, "F.13 hiçbir şey kapatmıyor" ' +
      'şikâyetinin cevabıdır.',

    gercekHayat:
      'Bir şirkette {{gr-ir}} hesabının bakiyesi 3 yılda 4,2 milyon TL’ye çıkmış. Kimse fark etmemiş ' +
      'çünkü kayıtlar doğru, denklik bozulmamış, hata mesajı yok.\n\n' +
      'Denetçi soruyor: "Bu 4,2 milyon ne?" Analiz yapılıyor: 1,1 milyonu gerçekten mal gelip ' +
      'faturası gelmemiş kalemler (normal), 3,1 milyonu ise **eşleşebilecekken eşleşmemiş** kalemler. ' +
      'Sebep: hesabın sıralama anahtarı yanlış tanımlanmış, atama alanı ({{BSEG}} `ZUONR`) boş kalıyor ' +
      've {{F.13}} eşleştirme yapamıyor.\n\n' +
      'Tek bir ana veri ayarı, üç yıllık bir temizlik borcu yaratmış.',

    muhasebeMantigi:
      'Kapatmanın muhasebe etkisi **fark olup olmamasına** bağlıdır:\n\n' +
      '**Fark yoksa:** hiçbir hesap hareket etmez. Kapatma belgesi oluşur ama tutarı sıfırdır; ' +
      'yalnızca kalemlere `AUGBL` yazılır. Bu, kapatmanın en sık hâlidir.\n\n' +
      '**Fark varsa:** fark {{tolerans-grubu}} sınırının içindeyse otomatik olarak bir hesaba atılır ' +
      '({{iskonto}}, {{kur-farki}} veya küçük fark hesabı). Sınırın dışındaysa **kapatma engellenir** ' +
      've kullanıcı ya seçimi düzeltir ya kısmi/kalan kapatma kullanır.\n\n' +
      'Kritik kural: **kapatma bakiyeyi değiştirmez** (fark hariç). Bir hesabın bakiyesi kapatmadan ' +
      'önce ne ise sonra da odur; değişen yalnızca kalemlerin açık/kapalı durumudur.',

    kavramlar: ['acik-kalem', 'kapatma', 'acik-kalem-yonetimi', 'kismi-kapatma', 'kalan-kapatma',
                'tolerans-grubu', 'gr-ir', 'banka-ara-hesabi', 'yaslandirma', 'kur-farki'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Kapatma üç ayrı yoldan gerçekleşir ve bunların oranı bir kurulumun olgunluğunu gösterir: ' +
      '**otomatik** (ödemeyle birlikte veya {{F.13}} ile), **manuel** ({{F-03}}/{{F-32}}/{{F-44}}) ve ' +
      '**hiç yapılmayan** (birikip sorun olan). Sağlıklı bir sistemde birinci yol baskındır.',

    roller:[
      { rol:'Sistem (otomatik)', gorev:'{{F110}} ödemeyle, {{F-28}} tahsilatla, {{FEBAN}} ekstre işlemeyle kalemleri **aynı anda** kapatır.' },
      { rol:'AP/AR muhasebe uzmanı', gorev:'Eşleşmeyen kalemleri elle kapatır ({{F-44}}, {{F-32}}); farkları araştırır.' },
      { rol:'Ana muhasebe uzmanı', gorev:'Geçiş hesaplarını temizler ({{F-03}}), {{F.13}} toplu kapatma çalıştırır.' },
      { rol:'Muhasebe müdürü', gorev:'Dönem sonunda geçiş hesabı bakiyelerini kontrol eder; kalıcı farkların yazılmasını onaylar.' },
      { rol:'FI danışmanı', gorev:'Hesapların {{acik-kalem-yonetimi}} ve **sıralama anahtarı** ayarlarını, {{OB74}} kapatma kurallarını ve {{OBA3}}/{{OBA4}} toleranslarını tasarlar.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Kapatmanın üç yolu ve dönem sonu kontrolü',
      adimlar:[
        { ic:'📄', rol:'Sistem', baslik:'Açık kalem doğar',
          aciklama:'Fatura, mal girişi veya ödeme kaydedilir. {{acik-kalem-yonetimi}} açık hesaplarda ' +
                   'kalem `AUGBL` boş olarak yazılır — yani **açıktır**.',
          cikti:'{{acik-kalem}}', ok:'karşılığı gelir' },
        { ic:'⚡', rol:'Sistem', baslik:'Yol 1 — Ödemeyle otomatik kapatma',
          aciklama:'{{F110}}, {{F-28}} ve {{FEBAN}} ödemeyi kaydederken kalemi **aynı işlemde** kapatır. ' +
                   'En temiz yoldur; ek bir iş gerektirmez.',
          cikti:'Kapatılmış kalem', ok:'eşleşmeyenler kalır' },
        { ic:'🤖', rol:'Sistem', baslik:'Yol 2 — Toplu otomatik kapatma ({{F.13}})',
          aciklama:'Geçiş hesaplarında ({{gr-ir}}, banka ara hesabı) atama alanına göre eşleştirme yapar. ' +
                   'Kuralları {{OB74}} belirler.',
          cikti:'Toplu kapatma belgeleri', ok:'kalanlar için' },
        { ic:'✋', rol:'Muhasebe uzmanı', baslik:'Yol 3 — Manuel kapatma',
          aciklama:'{{F-03}} (G/L), {{F-32}} (müşteri), {{F-44}} (satıcı) ile elle eşleştirme. ' +
                   'Otomatiğin çözemediği durumlar için.',
          cikti:'Kapatma belgesi', ok:'fark varsa' },
        { ic:'⚖️', rol:'Sistem', baslik:'Fark kontrolü',
          aciklama:'Fark {{tolerans-grubu}} içindeyse otomatik hesaba atılır; dışındaysa kapatma **engellenir**.',
          cikti:'Fark satırı veya hata', ok:'dönem sonu' },
        { ic:'🔍', rol:'Muhasebe müdürü', baslik:'Dönem sonu kontrolü',
          aciklama:'Geçiş hesaplarının bakiyesi incelenir. {{gr-ir}} için {{F.19}} yeniden sınıflama, ' +
                   'kalıcı farklar için {{MR11}} temizliği.',
          cikti:'Temiz bilanço', ok:'hata varsa' },
        { ic:'↩️', rol:'Muhasebe uzmanı', baslik:'Yanlış kapatma geri alınır ({{FBRA}})',
          aciklama:'Kapatma silinir, kalemler yeniden açık hâle gelir. Düzeltme kaydı gerekmez.',
          cikti:'Yeniden açık kalemler' },
      ],
    },

    adimlar:[
      { rol:'Sistem', eylem:'Ödeme/tahsilatla eşzamanlı kapatır', sistem:'{{F110}}, {{F-28}}, {{F-53}}, {{FEBAN}}' },
      { rol:'Ana muhasebe', eylem:'Geçiş hesaplarını toplu kapatır', sistem:'{{F.13}} — kuralları {{OB74}}' },
      { rol:'Muhasebe uzmanı', eylem:'G/L hesabını elle kapatır', sistem:'{{F-03}}' },
      { rol:'AR uzmanı', eylem:'Müşteri kalemlerini kapatır', sistem:'{{F-32}}' },
      { rol:'AP uzmanı', eylem:'Satıcı kalemlerini kapatır', sistem:'{{F-44}}' },
      { rol:'Muhasebe uzmanı', eylem:'Kayıt ve kapatmayı birlikte yapar', sistem:'{{FB05}}, {{F-04}}, {{F-30}}' },
      { rol:'Muhasebe uzmanı', eylem:'Yanlış kapatmayı geri alır', sistem:'{{FBRA}}' },
      { rol:'Muhasebe müdürü', eylem:'Dönem sonu geçiş hesabı analizi', sistem:'{{FBL3N}}, {{F.19}}, {{MR11}}' },
    ],

    veriAkisi:{
      nereden:'Açık kalemler: {{BSIS}} (G/L), {{BSIK}} (satıcı), {{BSID}} (müşteri). Eşleştirme ölçütü ' +
              'hesabın sıralama anahtarından doldurulan atama alanı ({{BSEG}} `ZUONR`).',
      nereye:'Kapatılmış kalemler {{BSAS}}/{{BSAK}}/{{BSAD}}’a taşınır; kalemlere `AUGBL` ve `AUGDT` yazılır.',
      tetikleyen:'Ödeme, tahsilat, ekstre işleme veya dönem sonu temizlik rutini.',
      sonraki:'Temiz geçiş hesapları, doğru {{yaslandirma}} ve güvenilir bilanço.',
    },

    notlar:[
      { tip:'tip', baslik:'Kapatma bir "iş" değil, bir "sonuç" olmalı', metin:
        'Olgun bir kurulumda kapatmaların büyük çoğunluğu **ödeme/tahsilat sırasında otomatik** gerçekleşir. ' +
        'Ay sonunda elle kapatılacak binlerce kalem varsa sorun kapatma işleminde değil, ' +
        'ana veri ve süreç tasarımındadır: sıralama anahtarları yanlış, atama alanı boş, ' +
        '{{OB74}} kuralları eksik demektir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Kapatmanın muhasebe etkisi çoğu zaman **hiçbir şeydir** — ve bu, en çok yanlış anlaşılan noktadır. ' +
      'Aşağıda önce farksız kapatma, sonra tolerans içi fark, sonra kısmi/kalan ayrımı ve ' +
      'döviz kur farkı örnekleri var.',

    etkilenenHesaplar:[
      { hesap:'Kapatılan hesabın kendisi', tur:'Değişmez', neden:'**Bakiye değişmez.** Kapatma yalnızca kalemlerin durumunu değiştirir; borç ve alacak toplamları aynı kalır.' },
      { hesap:'{{iskonto}} hesabı (602 / 653)', tur:'Gelir tablosu', neden:'Ödeme kapatmasında iskonto süresi içindeyse fark buraya yazılır.' },
      { hesap:'Kur farkı hesapları (646 / 656)', tur:'Gelir tablosu', neden:'Döviz kaleminin kaydedildiği kur ile kapatma kuru farklıysa gerçekleşmiş {{kur-farki}} doğar.' },
      { hesap:'Küçük fark hesabı', tur:'Gelir tablosu', neden:'Tolerans içindeki yuvarlama farkları otomatik buraya atılır ({{OBA3}}/{{OBA4}} ile tanımlanır).' },
      { hesap:'{{gr-ir}} hesabı', tur:'Bilanço — Geçiş', neden:'Mal girişi ve fatura kalemleri eşleşince kapanır; bakiyesi sıfıra yaklaşır.' },
      { hesap:'{{banka-ara-hesabi}}', tur:'Bilanço — Geçiş', neden:'Ödeme kaydı ile ekstre satırı eşleşince kapanır.' },
    ],

    fisler:[
      { baslik:'Örnek 1 — Farksız kapatma · GR/IR eşleşmesi ({{F-03}})',
        belgeTuru:'AB', tarih:'30.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR — mal girişi kalemi (kapatıldı)', borc:0, alacak:0, not:'Yalnızca `AUGBL` yazıldı' },
        ],
        not:'**Kapatma belgesinin tutarı sıfırdır.** Hiçbir hesap hareket etmez. ' +
             'Yapılan tek şey iki kaleme aynı `AUGBL` numarasını yazmaktır. ' +
             '159 hesabının bakiyesi kapatmadan önce ne ise sonra da odur.' },

      { baslik:'Örnek 2 — Tolerans içi fark · 12 TL yuvarlama',
        belgeTuru:'AB', tarih:'30.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — fatura kalemi', borc:45012, not:'Kapatıldı' },
          { hesap:'102', ad:'Banka — ödeme kalemi', alacak:45000, not:'Kapatıldı' },
          { hesap:'659', ad:'Diğer olağan gider — küçük fark', borc:0, alacak:12, not:'Tolerans içinde, otomatik' },
        ],
        not:'12 TL fark {{tolerans-grubu}} sınırının içinde olduğu için sistem **otomatik** olarak ' +
             'küçük fark hesabına attı ve kapatmaya izin verdi. Sınır 10 TL olsaydı kapatma engellenirdi.' },

      { baslik:'Örnek 3 — Kısmi kapatma · 100.000’in 40.000’i ödendi',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — kısmi ödeme kalemi', borc:40000, not:'**Yeni** bir açık kalem' },
          { hesap:'102', ad:'Banka ara hesabı', alacak:40000 },
        ],
        not:'{{kismi-kapatma}}da **hiçbir kalem kapanmaz**. Orijinal 100.000 TL’lik kalem açık kalır ' +
             've ödeme −40.000 olarak ayrı bir açık kalem hâline gelir. İkisi de `AUGBL` boş, yani açık. ' +
             'Kalan 60.000 ödendiğinde üçü birden kapatılır. **Orijinal vade korunur.**' },

      { baslik:'Örnek 4 — Kalan kapatma · aynı senaryo',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — orijinal kalem (kapatıldı)', borc:100000, not:'`AUGBL` yazıldı' },
          { hesap:'102', ad:'Banka ara hesabı', alacak:40000 },
          { hesap:'320', ad:'Satıcılar — **yeni kalan kalemi**', alacak:60000, not:'Vadesi **bugünden** başlar' },
        ],
        not:'{{kalan-kapatma}}da orijinal kalem kapanır ve 60.000 TL’lik **yeni bir kalem** doğar. ' +
             'Yeni kalemin baz tarihi bugündür — 90 gün gecikmiş bir borç aniden "vadesi gelmemiş" görünür. ' +
             '{{yaslandirma}} bu yüzden bozulur.' },

      { baslik:'Örnek 5 — Döviz kapatması · kur farkı doğar',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'EUR',
        satirlar:[
          { hesap:'320', ad:'Satıcılar — 10.000 EUR @ 35,00 (kapatıldı)', borc:350000, not:'Fatura kuru' },
          { hesap:'102', ad:'Banka — 10.000 EUR @ 36,20', alacak:362000, not:'Ödeme günü kuru' },
          { hesap:'656', ad:'Kambiyo zararı', borc:12000, not:'Gerçekleşmiş {{kur-farki}}' },
        ],
        not:'**Döviz tarafında fark yok:** 10.000 EUR borç, 10.000 EUR ödeme — tam eşleşme. ' +
             'Fark yerel para birimindedir ve kapatma anında **gerçekleşmiş** hâle gelir. ' +
             'Dönem sonu değerlemesinden ({{F.05}}) farkı budur: orada fark gerçekleşmemiştir.' },
    ],

    tHesaplar:[
      { hesap:'GR/IR hesabı', kod:'159 (açık kalem yönetimli)',
        borc:[{ ad:'Fatura girişi (MIRO)', tutar:100000 }],
        alacak:[{ ad:'Mal girişi (MIGO)', tutar:100000 }],
        not:'Kapatma sonrası bakiye sıfır — ama zaten sıfırdı' },
      { hesap:'Banka ara hesabı', kod:'102 (geçiş)',
        borc:[{ ad:'Ekstre satırı', tutar:139200 }],
        alacak:[{ ad:'F110 ödemesi', tutar:139200 }],
        not:'Kapatma bakiyeyi değil, kalem durumunu değiştirir' },
      { hesap:'Satıcılar', kod:'320',
        borc:[{ ad:'Kısmi ödeme', tutar:40000 }],
        alacak:[{ ad:'Fatura', tutar:100000 }],
        not:'Kısmi kapatmada iki kalem de **açık** kalır' },
      { hesap:'Kambiyo zararı', kod:'656 (gider)',
        borc:[{ ad:'Döviz kapatma farkı', tutar:12000 }],
        alacak:[],
        not:'Kapatmanın tek gerçek muhasebe etkisi' },
    ],

    notlar:[
      { tip:'warn', baslik:'Kapatma bakiyeyi değiştirmez', metin:
        'En sık yanlış anlaşılan nokta budur. Bir hesabın bakiyesi 340.000 TL ise, kapatmadan sonra da ' +
        '340.000 TL kalır. Değişen yalnızca kalemlerin **açık/kapalı** durumudur.\n\n' +
        '"GR/IR bakiyesini kapatmayla sıfırlayalım" cümlesi yanlıştır: eşleşen kalemler zaten ' +
        'birbirini götürüyordu. Bakiye kalıyorsa eşleşmemiş kalemler var demektir ve onları ' +
        'kapatmak değil, **sebebini bulmak** gerekir.' },
      { tip:'tip', baslik:'Fark hesabı ne zaman devreye girer?', metin:
        'Yalnızca seçilen kalemlerin toplamı sıfır değilse. Fark {{tolerans-grubu}} içindeyse otomatik ' +
        'olarak bir hesaba atılır: iskonto süresindeyse iskonto hesabına, döviz farkıysa kur farkına, ' +
        'değilse küçük fark hesabına. Tolerans dışındaysa kapatma yapılamaz.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Kapatma üç eksende çeşitlenir: **nasıl tetiklendiği** (otomatik/manuel), ' +
      '**tam mı kısmi mi** olduğu ve **hangi hesap tipine** uygulandığı.',

    liste:[
      { ad:'Ödemeyle eşzamanlı kapatma', en:'Clearing with Payment',
        aciklama:'Ödeme veya tahsilat kaydedilirken açık kalem **aynı işlemde** kapatılır. ' +
                 'Ayrı bir kapatma belgesi oluşmaz; ödeme belgesi hem kaydı hem kapatmayı yapar.',
        neZaman:'Normal ödeme ve tahsilat akışında — kapatmaların çoğunluğu böyle olmalıdır.',
        ornek:'{{F110}} ödeme koşusu 249 kalemi ödeme belgeleriyle birlikte kapatır.',
        tcodes:['F110','F-28','F-53','FEBAN'] },

      { ad:'Otomatik toplu kapatma', en:'Automatic Clearing — F.13',
        aciklama:'Tanımlı kurallara göre açık kalemleri toplu eşleştirir. Eşleştirme ölçütü ' +
                 '{{OB74}}’te tanımlanan alanlardır (en fazla 5) — en yaygını **atama (`ZUONR`)** alanıdır.',
        neZaman:'Geçiş hesaplarının ({{gr-ir}}, banka ara hesabı) ay sonu rutin temizliğinde.',
        ornek:'Ay sonu {{F.13}} çalıştırması 1.240 GR/IR kalemini otomatik eşleştirir.',
        tcodes:['F.13','OB74'] },

      { ad:'Manuel hesap kapatma', en:'Manual Account Clearing',
        aciklama:'Kullanıcı kalemleri elle seçip eşleştirir. Muhasebe kaydı üretmez (fark yoksa).',
        neZaman:'Otomatiğin çözemediği durumlarda: atama alanları uyuşmuyorsa, ' +
                'bir fatura birden çok ödemeyle karşılanmışsa.',
        ornek:'{{F-03}} ile GR/IR hesabında 6 kalem elle eşleştirilir.',
        tcodes:['F-03','F-32','F-44'] },

      { ad:'Kayıtla birlikte kapatma', en:'Post with Clearing — FB05',
        aciklama:'Yeni bir belge kaydederken aynı anda açık kalemleri kapatır. ' +
                 'Kapatma ile kayıt tek işlemde birleşir.',
        neZaman:'Kalem transferlerinde, yeniden sınıflamalarda, banka dekontundan doğrudan kayıtta.',
        tcodes:['FB05','F-04','F-30'] },

      { ad:'Tam kapatma', en:'Full Clearing',
        aciklama:'Seçilen kalemlerin toplamı sıfırdır; hepsi kapanır ve kapalı kalem tablosuna taşınır.',
        neZaman:'Tutarlar tam eşleştiğinde — normal durum.',
        ornek:'120.000 TL fatura, 120.000 TL ödeme → kalem {{BSAK}}’a taşınır.' },

      { ad:'Kısmi kapatma', en:'Partial Clearing',
        aciklama:'**Hiçbir kalem kapanmaz.** Orijinal kalem açık kalır, ödeme ayrı bir açık kalem olur. ' +
                 'İkisi de `AUGBL` boş taşır.',
        neZaman:'Borcun bir kısmı ödendiğinde ve **orijinal vadenin korunması** gerektiğinde. ' +
                'Yaşlandırma doğruluğu önemliyse varsayılan tercih budur.',
        ornek:'100.000 TL borcun 40.000’i ödendi → iki açık kalem: +100.000 ve −40.000.',
        tcodes:['F-53','F-28','FB05'] },

      { ad:'Kalan kapatma', en:'Residual Clearing',
        aciklama:'Orijinal kalem **kapatılır**, kalan tutar için **yeni bir kalem** üretilir. ' +
                 'Yeni kalemin baz tarihi bugündür.',
        neZaman:'Fark kalıcıysa ve yeni bir ödeme planına bağlandıysa. ' +
                '**Vadeyi sıfırladığı için dikkatli seçilir.**',
        ornek:'100.000 kapandı, 60.000 TL’lik yeni kalem doğdu — vadesi bugünden.',
        tcodes:['F-53','F-28','FB05'] },

      { ad:'Kapatmayı geri alma', en:'Reset Clearing — FBRA',
        aciklama:'Yapılmış bir kapatmayı iptal eder; kalemler yeniden **açık** hâle gelir ve ' +
                 '{{BSAK}}/{{BSAD}}’dan {{BSIK}}/{{BSID}}’ye döner.',
        neZaman:'Yanlış kalemler eşleştirildiğinde. **Ters kayıt gerekmez** — bu ayrımı bilmek önemlidir.',
        ornek:'Yanlış faturaya uygulanan ödeme {{FBRA}} ile açılır, doğru faturayla yeniden kapatılır.',
        tcodes:['FBRA'] },
    ],

    karsilastirmaBasliklar:['Kısmi kapatma (Partial)', 'Kalan kapatma (Residual)'],
    karsilastirma:[
      ['Orijinal kalem', '**Açık kalır**', '**Kapanır** (`AUGBL` yazılır)'],
      ['Yeni kalem', 'Ödeme ayrı açık kalem olur', 'Kalan tutar için yeni kalem üretilir'],
      ['Vade / baz tarih', '**Korunur** — orijinal vade geçerli', '**Sıfırlanır** — bugünden başlar'],
      ['{{yaslandirma}} etkisi', 'Doğru kalır', '**Bozulur** — gecikme silinir'],
      ['{{ihtar}} seviyesi', 'Korunur', 'Sıfırlanır'],
      ['Açık kalem sayısı', 'Artar (2 kalem)', 'Sabit kalır (1 yeni kalem)'],
      ['Ne zaman tercih edilir', 'Vade takibi önemliyse — **varsayılan**', 'Fark kalıcıysa, yeni ödeme planı varsa'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'F-03', ad:'G/L hesabı kapatma',
        amac:'{{acik-kalem-yonetimi}} açık bir ana muhasebe hesabında kalemleri elle eşleştirir.',
        neZaman:'{{gr-ir}} ve {{banka-ara-hesabi}} temizliğinde; {{F.13}}’ün kapatamadığı kalemlerde.',
        adimlar:[
          { baslik:'Hesap, şirket kodu ve kapatma tarihini gir',
            aciklama:'Kapatma tarihi, kapatma belgesinin kayıt tarihidir. Dönem açık olmalıdır.' },
          { baslik:'*Açık kalemleri işle* → kalemler listelenir',
            aciklama:'Ek seçim kriterleri (atama, tutar, belge numarası) girerek listeyi daraltabilirsin.' },
          { baslik:'Kapatılacak kalemleri seç',
            aciklama:'Kalemler önce **hepsi seçili** gelir; *Seçimi kaldır* ile hepsini bırakıp ' +
                     'sonra istediklerini seçmek genelde daha hızlıdır.' },
          { baslik:'"Atanmamış" alanının sıfır olduğunu doğrula',
            aciklama:'Ekranın altındaki bu alan **sıfır olmalıdır**. Değilse kapatma yapılamaz.' },
          { baslik:'Kaydet',
            aciklama:'Kapatma belgesi üretilir ve kalemlere `AUGBL` yazılır. Fark yoksa belge tutarı sıfırdır.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Hesap 159000 · Şirket kodu 1000 · Kapatma tarihi 30.09.2026' },
          { ekran:'Ek seçim', islem:'Atama alanı = 4500002345 (sipariş numarası)' },
          { ekran:'Kalem listesi', islem:'2 kalem: +100.000 (fatura) ve −100.000 (mal girişi)' },
          { ekran:'Doğrulama', islem:'"Atanmamış" = 0,00 → Kaydet' },
        ],
        alanlar:{
          zorunlu:['G/L hesabı','Şirket kodu','Kapatma tarihi','Kalem seçimi'],
          opsiyonel:['Ek seçim kriterleri','Metin','Belge türü'] },
        hatalar:[
          { mesaj:'The difference is too large for clearing', sebep:'Seçilen kalemlerin toplamı sıfır değil ve fark {{tolerans-grubu}} dışında.', cozum:'Önce seçimi kontrol et — genelde yanlış kalem seçilmiştir. Fark gerçekse fark satırı gir veya {{OBA4}} toleransını gözden geçir.' },
          { mesaj:'Account ... is not managed on an open item basis', sebep:'Hesapta {{acik-kalem-yonetimi}} kapalı.', cozum:'Bu hesapta kapatma yapılamaz. Hesabın ana verisinin doğru kurulup kurulmadığını sorgula ({{FS00}} → `XOPVW`).' },
          { mesaj:'No open items found', sebep:'Kriterler çok dar veya kalemler zaten kapatılmış.', cozum:'Ek seçim kriterlerini kaldır; {{FBL3N}} ile açık kalemleri kontrol et.' },
          { mesaj:'Posting period ... is not open', sebep:'Kapatma tarihinin düştüğü dönem kapalı.', cozum:'{{OB52}} ile aç veya kapatma tarihini açık bir döneme al.' },
        ],
        ipucu:'Kalem listesinde **düzeni atama (`ZUONR`) alanına göre sırala**. Birbirini götüren kalemler ' +
              'yan yana gelir ve seçim saniyeler sürer. Bu tek alışkanlık geçiş hesabı temizliğini ' +
              'saatlerden dakikalara indirir.',
        ilgili:['F.13','FBRA','FBL3N','FB05'] },

      { kod:'F.13', ad:'Otomatik kapatma (toplu)',
        amac:'Tanımlı kurallara göre açık kalemleri toplu ve otomatik eşleştirir.',
        neZaman:'Ay sonu rutininde; geçiş hesaplarının düzenli temizliğinde.',
        adimlar:[
          { baslik:'Şirket kodu, mali yıl ve hesap aralığını gir' },
          { baslik:'Hesap tipini seç: G/L, satıcı, müşteri',
            aciklama:'Her tip ayrı işaretlenir. Yalnızca G/L temizliği yapılacaksa diğerlerini işaretleme.' },
          { baslik:'**Önce deneme (test) modunda çalıştır**',
            aciklama:'Hangi kalemlerin kapatılacağını kaydetmeden gösterir. Bu adım atlanmamalıdır.' },
          { baslik:'Sonucu incele',
            aciklama:'Kapatılacaklar ve kapatılamayanlar ayrı listelenir. Kapatılamayanların gerekçesi verilir.' },
          { baslik:'Gerçek modda çalıştır',
            aciklama:'Kapatma belgeleri toplu olarak üretilir.' },
        ],
        ekranAkisi:[
          { ekran:'Seçim', islem:'Şirket kodu 1000 · Hesap 159000–159999 · Mali yıl 2026 · **Test modu ✓**' },
          { ekran:'Test sonucu', islem:'1.240 kalem kapatılabilir / 86 kalem eşleşmedi' },
          { ekran:'Gerçek çalıştırma', islem:'Test kutusu kaldırıldı → 1.240 kalem kapatıldı' },
        ],
        alanlar:{
          zorunlu:['Şirket kodu','Mali yıl','Hesap aralığı','Hesap tipi seçimi'],
          opsiyonel:['Test modu','Özel G/L işlemleri dâhil','Asgari kalem sayısı'] },
        hatalar:[
          { mesaj:'Hiçbir kalem kapatılmadı (hata mesajı yok)', sebep:'Atama (`ZUONR`) alanları eşleşmiyor — genelde hesabın **sıralama anahtarı** yanlış veya boş.', cozum:'{{FS00}} → hesabın sıralama anahtarını (`ZUAWA`) kontrol et. Kural {{OB74}}’te tanımlı mı bak. **Sorun F.13’te değil, ana veridedir.**' },
          { mesaj:'Clearing rule not defined for account type S', sebep:'{{OB74}}’te ilgili hesap tipi/aralığı için kural yok.', cozum:'{{OB74}} ile eşleştirme kriterlerini tanımla (en fazla 5 alan).' },
        ],
        ipucu:'{{F.13}} **geçmişe dönük atama alanını düzeltmez**. Sıralama anahtarını sonradan düzeltirsen ' +
              'yalnızca yeni kalemler doğru dolar; eski kalemler elle ({{F-03}}) kapatılmalı veya ' +
              'atama alanı toplu güncellenmelidir.',
        ilgili:['F-03','OB74','FBRA','FS00'] },

      { kod:'F-44', ad:'Satıcı kapatma',
        amac:'Ödeme kaydı yapmadan satıcı kalemlerini eşleştirir.',
        neZaman:'Fatura ile alacak dekontunu karşılıklı kapatırken; ödeme ayrı kaydedilmişse faturayla eşleştirirken.',
        adimlar:[
          { baslik:'Satıcı, şirket kodu ve kapatma tarihini gir' },
          { baslik:'Özel G/L kalemleri de gerekiyorsa ilgili kutuyu işaretle',
            aciklama:'{{avans}} kalemleri normal seçime **gelmez**; kutu işaretlenmelidir.' },
          { baslik:'Açık kalemleri işle → seç → net tutarın sıfır olduğunu doğrula → kaydet' },
        ],
        hatalar:[
          { mesaj:'No open items found', sebep:'Avans kalemleri seçime dâhil değil.', cozum:'"Özel G/L işlemleri" kutusunu işaretle.' },
        ],
        ipucu:'Avans mahsubu için {{F-54}} kullanılır; {{F-44}} genel amaçlı eşleştirme içindir. ' +
              'İkisini karıştırmak avans hesabının yanlış kapanmasına yol açar.',
        ilgili:['F-32','F-03','F-54','FBRA'] },

      { kod:'F-32', ad:'Müşteri kapatma',
        amac:'Tahsilat kaydı yapmadan müşteri kalemlerini eşleştirir.',
        neZaman:'Fatura ile alacak dekontunu kapatırken; banka ekstresinden ayrı kaydedilmiş tahsilatı faturayla eşleştirirken.',
        adimlar:[
          { baslik:'Müşteri, şirket kodu ve kapatma tarihini gir' },
          { baslik:'Açık kalemleri işle → seç → sıfırla → kaydet' },
        ],
        ipucu:'Müşteri hangi faturayı kapattığını belirtmediyse **en eskiden** başla. ' +
              'Rastgele eşleştirme {{yaslandirma}} raporunu bozar.',
        ilgili:['F-44','F-28','FBRA'] },

      { kod:'FBRA', ad:'Kapatmayı geri al (reset clearing)',
        amac:'Yapılmış bir kapatmayı iptal eder; kalemler yeniden açık hâle gelir.',
        neZaman:'Yanlış kalemler eşleştirildiğinde. **Kapatmayı düzeltmenin tek doğru yolu budur.**',
        adimlar:[
          { baslik:'Kapatma belgesi numarası, şirket kodu ve mali yılı gir',
            aciklama:'Kapatma belgesi numarasını kalemin `AUGBL` alanından veya {{FBL1N}}/{{FBL3N}} raporundan alırsın.' },
          { baslik:'İki seçenekten birini seç',
            aciklama:'**Yalnızca sıfırla:** kapatma silinir, ödeme belgesi durur — çoğu durumda istenen budur. ' +
                     '**Sıfırla ve ters kaydet:** kapatma silinir *ve* ödeme belgesi de ters kaydedilir.' },
          { baslik:'Onayla',
            aciklama:'Kalemler {{BSAK}}/{{BSAD}}’dan {{BSIK}}/{{BSID}}’ye döner; `AUGBL` alanı temizlenir.' },
        ],
        alanlar:{
          zorunlu:['Kapatma belgesi numarası','Şirket kodu','Mali yıl'],
          opsiyonel:['Ters kayıt nedeni (ters kaydedilecekse)'] },
        hatalar:[
          { mesaj:'Document ... is not a clearing document', sebep:'Girilen numara bir kapatma belgesi değil.', cozum:'Kalemin `AUGBL` alanındaki numarayı kullan — belge numarasını değil.' },
          { mesaj:'Clearing cannot be reset — document reversed', sebep:'Belge zaten ters kaydedilmiş.', cozum:'Kapatma zaten çözülmüştür; kalemleri {{FBL1N}} ile kontrol et.' },
        ],
        ipucu:'**{{FBRA}} ile {{FB08}} karıştırılmamalıdır.** {{FB08}} *belgeyi* ters kaydeder (yeni bir ' +
              'ters belge üretir). {{FBRA}} *kapatmayı* geri alır (yeni belge üretmez, sadece eşleştirmeyi bozar). ' +
              'Yanlış kapatma için doğru araç FBRA’dır; FB08 kullanmak gereksiz belge kalabalığı yaratır.',
        ilgili:['F-03','F-32','F-44','FB08'] },

      { kod:'FB05', ad:'Kapatmayla birlikte kaydet',
        amac:'Yeni bir belge kaydederken aynı anda açık kalemleri kapatır.',
        neZaman:'Kalem transferlerinde, yeniden sınıflamalarda, banka dekontundan doğrudan kayıtta.',
        adimlar:[
          { baslik:'Belge başlığını ve ilk satırı gir' },
          { baslik:'İşlem tipini seç: "Açık kalemleri kapat"' },
          { baslik:'Kapatılacak hesabı ve kalemleri seç' },
          { baslik:'Kısmi / kalan sekmelerini gerekirse kullan' },
          { baslik:'Bakiye sıfır olduğunda kaydet' },
        ],
        ipucu:'{{FB05}} esnektir ama karmaşıktır. Basit ödeme kapatmaları için {{F-53}}/{{F-28}}, ' +
              'saf eşleştirme için {{F-44}}/{{F-32}} daha hızlıdır. FB05’i gerçekten kayıt + kapatma ' +
              'birlikte gerektiğinde kullan.',
        ilgili:['F-04','F-30','F-53','F-28'] },

      { kod:'OB74', ad:'Otomatik kapatma kurallarını tanımla',
        amac:'{{F.13}}’ün hangi alanlara göre eşleştirme yapacağını belirler.',
        neZaman:'Kurulumda ve "{{F.13}} hiçbir şey kapatmıyor" sorununda.',
        adimlar:[
          { baslik:'Şirket kodu, hesap tipi ve hesap aralığını gir' },
          { baslik:'En fazla 5 eşleştirme kriteri seç',
            aciklama:'En yaygın: **ZUONR** (atama). Diğerleri: `XBLNR` (referans), `SGTXT` (metin), ' +
                     '`EBELN` (sipariş), `VBELN` (satış belgesi).' },
        ],
        ipucu:'Kriter seçimi hesabın kullanım amacına göre yapılır: {{gr-ir}} için sipariş numarası ' +
              'veya atama, banka ara hesabı için referans veya tutar. Yanlış kriter, kapatmanın ' +
              'hiç çalışmamasına yol açar.',
        ilgili:['F.13','FS00','OBA3'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Kapatmanın tablo izi son derece basittir: {{BSEG}}’de **iki alan** ({`AUGBL`, `AUGDT`}) ve ' +
      'kalemin **açık indeksten kapalı indekse** taşınması. Tüm kapatma mantığı bu ikisinden ibarettir.',

    liste:[
      { ad:'BSEG', baslik:'Belge kalemleri — kapatmanın kaydedildiği yer',
        tutar:'Kalemin hesabı, tutarı ve **kapatma durumu**. Kapatma yalnızca iki alanı değiştirir.',
        olusturan:'FI belgesi üreten her işlem',
        guncelleyen:'Kapatma işlemleri `AUGBL`/`AUGDT` alanlarını doldurur; {{FBRA}} boşaltır',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'`AUGBL` kapatma belgesine işaret eder; aynı `AUGBL` değerini taşıyan kalemler birbirini kapatmıştır.',
        s4:'Yazılmaya devam eder; raporlama {{ACDOCA}} üzerinden yapılır.',
        alanlar:[
          { ad:'AUGBL', aciklama:'**Kapatma belgesi numarası. Boşsa kalem AÇIKTIR.** Kapatmanın tek ölçütü budur.' },
          { ad:'AUGDT', aciklama:'Kapatma tarihi' },
          { ad:'ZUONR', aciklama:'**Atama alanı** — {{F.13}} eşleştirmeyi buna göre yapar. Sıralama anahtarından otomatik dolar.' },
          { ad:'ZFBDT', aciklama:'Baz tarih — kalan kapatmada yeni kalemde **bugüne** ayarlanır' },
        ] },

      { ad:'BSIS', baslik:'G/L açık kalemleri',
        tutar:'{{acik-kalem-yonetimi}} açık G/L hesaplarının kapanmamış kalemleri.',
        olusturan:'Açık kalem yönetimli hesaba yapılan kayıt',
        guncelleyen:'Kapatıldığında kalem buradan silinir ve {{BSAS}}’a taşınır',
        anahtar:'BUKRS + HKONT + AUGDT + AUGBL + ZUONR + GJAHR + BELNR + BUZEI',
        iliskiler:'{{BSEG}}’in hızlı erişim indeksi; {{FBL3N}} açık kalem seçeneği buradan okur.',
        s4:'**Kaldırıldı** — {{uyumluluk-view}} olarak {{ACDOCA}}’dan üretilir.' },

      { ad:'BSAS', baslik:'G/L kapatılmış kalemleri',
        tutar:'Kapatılmış G/L kalemleri.',
        olusturan:'{{kapatma}} işlemi',
        guncelleyen:'{{FBRA}} ile geri alınırsa kalem {{BSIS}}’e döner',
        s4:'{{uyumluluk-view}}’ine dönüştürüldü.' },

      { ad:'BSIK', baslik:'Satıcı açık kalemleri',
        tutar:'Ödenmemiş satıcı kalemleri.',
        olusturan:'Satıcıya yapılan kayıtlar',
        guncelleyen:'Kapatınca {{BSAK}}’a taşınır',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'ZUONR', aciklama:'Otomatik kapatmanın eşleştirme alanı' },
        ] },

      { ad:'BSAK', baslik:'Satıcı kapatılmış kalemleri',
        tutar:'Ödenmiş satıcı kalemleri; `AUGBL` alanı hangi belgeyle kapandığını gösterir.',
        olusturan:'{{F110}}, {{F-53}}, {{F-44}}',
        guncelleyen:'{{FBRA}} ile geri alınırsa {{BSIK}}’e döner',
        s4:'{{uyumluluk-view}}.' },

      { ad:'BSID', baslik:'Müşteri açık kalemleri',
        tutar:'Tahsil edilmemiş müşteri kalemleri.',
        olusturan:'Müşteriye yapılan kayıtlar',
        guncelleyen:'Kapatınca {{BSAD}}’a taşınır',
        s4:'{{uyumluluk-view}}.' },

      { ad:'BSAD', baslik:'Müşteri kapatılmış kalemleri',
        tutar:'Tahsil edilmiş müşteri kalemleri.',
        olusturan:'{{F-28}}, {{F-32}}',
        guncelleyen:'{{FBRA}} ile geri alınırsa {{BSID}}’ye döner',
        s4:'{{uyumluluk-view}}.' },

      { ad:'SKB1', baslik:'G/L hesabı — kapatmayı mümkün kılan ayarlar',
        tutar:'Hesabın {{acik-kalem-yonetimi}} ve **sıralama anahtarı** ayarları. ' +
              'Kapatmanın çalışıp çalışmayacağı burada belirlenir.',
        olusturan:'{{FS00}}',
        guncelleyen:'{{FS00}}',
        anahtar:'BUKRS + SAKNR',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'XOPVW', aciklama:'**Açık kalem yönetimi.** X değilse bu hesapta kapatma **yapılamaz**.' },
          { ad:'ZUAWA', aciklama:'**Sıralama anahtarı** — `ZUONR` alanını otomatik doldurur. {{F.13}}’ün çalışması buna bağlıdır.' },
          { ad:'XKRES', aciklama:'Kalem görüntüleme — kapalıysa {{FBL3N}} kalem göstermez' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Kapatmanın tablo izi',
      varliklar:[
        { ad:'SKB1', rol:'Ana veri', aciklama:'Kapatmayı mümkün kılan ayarlar',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'XOPVW' }, { ad:'ZUAWA' }] },
        { ad:'BSEG', rol:'Kalem', hub:true, aciklama:'Kapatma burada kaydedilir',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BUZEI', tip:'pk' }, { ad:'AUGBL' }, { ad:'AUGDT' }, { ad:'ZUONR' }] },
        { ad:'BSIS', rol:'İndeks — açık', aciklama:'G/L açık kalemleri',
          alanlar:[{ ad:'HKONT', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZUONR' }] },
        { ad:'BSAS', rol:'İndeks — kapalı', aciklama:'G/L kapatılmış kalemleri',
          alanlar:[{ ad:'HKONT', tip:'fk' }, { ad:'AUGBL' }, { ad:'AUGDT' }] },
        { ad:'BSIK', rol:'İndeks — açık', aciklama:'Satıcı açık',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'BSAK', rol:'İndeks — kapalı', aciklama:'Satıcı kapalı',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'BKPF', rol:'Belge', aciklama:'Kapatma belgesi',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
      ],
      iliskiler:[
        { from:'SKB1', to:'BSEG', alanlar:'SAKNR → HKONT', not:'XOPVW ve ZUAWA kapatmayı belirler' },
        { from:'BSEG', to:'BSIS', alanlar:'BELNR + BUZEI', not:'AUGBL boşken açık indekste' },
        { from:'BSIS', to:'BSAS', alanlar:'kapatma sonrası', not:'kalem taşınır' },
        { from:'BSIK', to:'BSAK', alanlar:'kapatma sonrası', not:'satıcı kalemi taşınır' },
        { from:'BSEG', to:'BKPF', alanlar:'AUGBL → BELNR', not:'kapatma belgesine bağ' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Kapatma ekranlarının hepsi aynı iskelete sahiptir: **kalem listesi + seçim + "Atanmamış" göstergesi**. ' +
      'Bu göstergeyi okumayı öğrenmek, tüm kapatma işlemlerini öğrenmek demektir.',

    ekranlar:[
      { ad:'Kapatma giriş ekranı ({{F-03}} / {{F-32}} / {{F-44}})',
        aciklama:'Hangi hesabın hangi tarihte kapatılacağı belirlenir.',
        alanlar:[
          { ad:'Hesap / Satıcı / Müşteri', zorunlu:true, aciklama:'Kapatılacak hesap veya iş ortağı.' },
          { ad:'Şirket kodu', zorunlu:true, aciklama:'Kapatma şirket kodu içinde yapılır.' },
          { ad:'Kapatma tarihi', zorunlu:true, aciklama:'Kapatma belgesinin kayıt tarihi. **Dönem açık olmalıdır.**' },
          { ad:'Özel G/L işlemleri kutusu', zorunlu:false, aciklama:'{{avans}} kalemlerini listeye dâhil eder. İşaretlenmezse o kalemler **hiç görünmez**.' },
          { ad:'Ek seçim kriterleri', zorunlu:false, aciklama:'Atama, tutar, belge numarası, referans ile listeyi daraltır.' },
        ],
        ipucu:'Çok kalemli hesaplarda ek seçim kriteri kullanmadan listeyi açma — binlerce satır gelir. ' +
              'Atama alanına sipariş numarasını girerek doğrudan ilgili kalemlere in.' },

      { ad:'Açık kalem seçim ekranı',
        aciklama:'Kapatmanın gerçekleştiği asıl ekran. En kritik gösterge alttaki **"Atanmamış"** alanıdır.',
        alanlar:[
          { ad:'Kalem listesi', zorunlu:true, aciklama:'Kalemler **hepsi seçili** olarak gelir. *Seçimi kaldır* ile temizleyip istediklerini seçmek daha güvenlidir.' },
          { ad:'"Atanmamış" göstergesi', zorunlu:true, aciklama:'**Sıfır olmalıdır.** Sıfır değilse kapatma yapılamaz — seçilen kalemler dengelenmemiştir.' },
          { ad:'"Kapatılan" göstergesi', zorunlu:false, aciklama:'Seçilen kalemlerin net toplamı.' },
          { ad:'Kısmi ödeme sekmesi', zorunlu:false, aciklama:'Orijinal kalem **açık kalır**, vade korunur.' },
          { ad:'Kalan kalem sekmesi', zorunlu:false, aciklama:'Orijinal **kapanır**, yeni kalem üretilir, vade sıfırlanır.' },
        ],
        ipucu:'Düzeni **atama (`ZUONR`) alanına göre sırala ve alt toplam al**. Birbirini götüren kalemler ' +
              'yan yana dizilir; seçim hem hızlanır hem hatasızlaşır.' },

      { ad:'{{FBRA}} — kapatmayı geri alma ekranı',
        aciklama:'Yanlış kapatmanın düzeltildiği yer. İki seçenek arasındaki fark kritiktir.',
        alanlar:[
          { ad:'Kapatma belgesi numarası', zorunlu:true, aciklama:'Kalemin `AUGBL` alanındaki numara. Belge numarasıyla karıştırılmamalıdır.' },
          { ad:'"Yalnızca sıfırla"', zorunlu:false, aciklama:'Kapatma silinir, ödeme belgesi **durur**. Çoğu durumda istenen budur.' },
          { ad:'"Sıfırla ve ters kaydet"', zorunlu:false, aciklama:'Kapatma silinir **ve** ödeme belgesi de ters kaydedilir. Ödemenin tamamen iptali gerekiyorsa.' },
        ],
        ipucu:'Yanlış faturaya uygulanmış doğru bir ödeme varsa **yalnızca sıfırla** seçilir; ' +
              'ödeme durur, kalemler açılır ve doğru faturayla yeniden kapatılır.' },
    ],

    zorunlu:['Hesap / iş ortağı','Şirket kodu','Kapatma tarihi','Kalem seçimi ("Atanmamış" = 0)'],
    opsiyonel:['Ek seçim kriterleri','Özel G/L işlemleri','Metin','Belge türü','Kısmi/kalan sekmesi'],

    hatalar:[
      { mesaj:'The difference is too large for clearing', sebep:'Seçilen kalemlerin net tutarı sıfır değil ve fark {{tolerans-grubu}} sınırının dışında.', cozum:'Önce seçimi kontrol et — %90 ihtimalle yanlış kalem seçilmiştir. Fark gerçekse: kısmi/kalan kapatma kullan, fark satırı gir, ya da {{OBA3}}/{{OBA4}} toleransını gözden geçir.' },
      { mesaj:'Account ... is not managed on an open item basis', sebep:'{{SKB1}} `XOPVW` boş.', cozum:'Bu hesapta kapatma yapılamaz. Hesap geçiş hesabıysa ana veri yanlış kurulmuş demektir; düzeltmek için bakiyenin sıfırlanması gerekir.' },
      { mesaj:'No open items found', sebep:'Kalemler zaten kapatılmış, kriter çok dar, veya avans kalemleri seçime dâhil değil.', cozum:'{{FBL3N}}/{{FBL1N}} ile kontrol et; "Özel G/L işlemleri" kutusunu işaretle.' },
      { mesaj:'Posting period ... is not open', sebep:'Kapatma tarihinin dönemi kapalı.', cozum:'{{OB52}} ile aç veya kapatma tarihini değiştir.' },
      { mesaj:'Document ... is not a clearing document (FBRA)', sebep:'Belge numarası girildi, kapatma belgesi numarası değil.', cozum:'Kalemin `AUGBL` alanındaki numarayı kullan.' },
      { mesaj:'{{F.13}} hiçbir kalem kapatmadı (hata yok)', sebep:'Atama alanları eşleşmiyor — hesabın **sıralama anahtarı** yanlış veya {{OB74}} kuralı eksik.', cozum:'{{FS00}} → `ZUAWA` sıralama anahtarını kontrol et; {{OB74}}’te kuralı tanımla. **Sorun F.13’te değil, ana veridedir.**' },
      { mesaj:'Clearing not possible — items in different currencies', sebep:'Farklı para birimlerindeki kalemler eşleştirilmeye çalışılıyor.', cozum:'Aynı para birimindeki kalemleri seç; döviz farkı gerekiyorsa kur farkı hesabı otomatik devreye girer.' },
    ],

    ipuclari:[
      'Kalem listesinde **düzeni atama alanına göre sırala** — geçiş hesabı temizliğinin en büyük hızlandırıcısıdır.',
      'Kalemler hepsi seçili gelir; *Seçimi kaldır* ile temizleyip bilinçli seçim yapmak yanlış kapatmayı önler.',
      'Yanlış kapatma için **{{FBRA}}** kullan, {{FB08}} değil. FB08 belgeyi ters kaydeder ve gereksiz belge yaratır.',
      '{{F.13}}’ü her zaman **önce test modunda** çalıştır ve sonucu incele.',
      'Geçiş hesabı açarken üç ayarı mutlaka yap: {{acik-kalem-yonetimi}} **açık**, sıralama anahtarı **doğru**, ' +
      'kalem görüntüleme **açık**. Bu üçü olmadan hesap yıllar içinde kirlenir.',
      'Ay sonunda {{gr-ir}} ve banka ara hesaplarının açık kalem listesini bir kez gözden geçir. ' +
      'Beş dakikalık bu kontrol, yıl sonunda günlerce sürecek bir temizliği önler.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BSEG', ne:'Kapatılan kalemlere `AUGBL` (kapatma belgesi) ve `AUGDT` (kapatma tarihi) yazılır' },
      { tablo:'BKPF', ne:'Kapatma belgesi başlığı — fark yoksa tutarı sıfırdır' },
      { tablo:'BSIS', ne:'Kapatılan G/L kalemleri **silinir**' },
      { tablo:'BSAS', ne:'Kapatılan G/L kalemleri eklenir' },
      { tablo:'BSIK', ne:'Kapatılan satıcı kalemleri silinir' },
      { tablo:'BSAK', ne:'Kapatılan satıcı kalemleri eklenir' },
      { tablo:'BSID', ne:'Kapatılan müşteri kalemleri silinir' },
      { tablo:'BSAD', ne:'Kapatılan müşteri kalemleri eklenir' },
      { tablo:'ACDOCA', ne:'S/4HANA’da kapatma bilgisi burada tutulur; indeks tabloları view olarak üretilir' },
    ],

    commit:
      'Kapatma tek bir LUW içinde yazılır: kapatma belgesi + `AUGBL` güncellemeleri + indeks taşımaları ' +
      'atomiktir. {{F.13}} toplu çalıştırmasında **her kapatma ayrı LUW’dur** — bu yüzden 1.240 kalemin ' +
      '1.200’ü kapatılıp 40’ı başarısız olabilir. Sonuç listesi hangilerinin kapatılamadığını gösterir.',

    belgeNo:
      'Kapatma belgesi de normal bir FI belgesidir ve belge türüne bağlı aralıktan numara alır. ' +
      'Genelde **AB** (genel belge) türü kullanılır. Ödemeyle eşzamanlı kapatmada ise ayrı kapatma ' +
      'belgesi **oluşmaz** — ödeme belgesinin kendisi kapatma belgesidir ve `AUGBL` alanına ' +
      'ödeme belgesinin numarası yazılır.',

    postingLogic:
      'Kapatmanın karar zinciri:\n\n' +
      '**1.** Hesap {{acik-kalem-yonetimi}}li mi? Değilse kapatma mümkün değil.\n' +
      '**2.** Seçilen kalemlerin net tutarı hesaplanır.\n' +
      '**3.** Net tutar sıfırsa → kapatma belgesi üretilir, `AUGBL` yazılır, **hiçbir hesap hareket etmez**.\n' +
      '**4.** Net tutar sıfır değilse → fark {{tolerans-grubu}} ile karşılaştırılır.\n' +
      '**5.** Tolerans içindeyse → fark otomatik bir hesaba atılır (iskonto / kur farkı / küçük fark) ve kapatma yapılır.\n' +
      '**6.** Tolerans dışındaysa → kapatma **engellenir**; kullanıcı kısmi/kalan seçmeli veya seçimi düzeltmelidir.',

    belgeTuru:
      'Kapatma belge türü {{OBA7}}’de tanımlıdır ve genelde **AB**’dir. Ödeme kapatmalarında ' +
      'ödeme belge türü (**KZ** satıcı, **DZ** müşteri) kullanılır. Belge türü, kapatma belgesinin ' +
      'numara aralığını belirler.',

    numberRange:
      'Kapatma belgeleri kendi belge türlerinin aralığından numara alır. Ayrı bir numara aralığı ' +
      'yönetimi gerektirmez ama yılbaşında ilgili türlerin aralıkları açık olmalıdır.',

    accountDetermination:
      'Fark hesapları otomatik belirlenir:\n\n' +
      '**İskonto:** hesap anahtarı SKE (alınan) / SKT (verilen) — IMG’deki otomatik kayıt ayarlarından.\n' +
      '**Kur farkı:** hesap anahtarı KDF — para birimi ve şirket kodu bazında.\n' +
      '**Küçük fark:** {{OBA3}}/{{OBA4}} tolerans gruplarında tanımlanan hesap.\n\n' +
      'Bu hesaplar tanımlı değilse kapatma "account determination not possible" hatasıyla durur.',

    tur:
      '**Özelleştirme:** {{OB74}} otomatik kapatma kuralları, {{OBA3}} müşteri/satıcı tolerans grupları, ' +
      '{{OBA4}} kullanıcı tolerans grupları, fark hesapları, kapatma belge türleri.\n\n' +
      '**Ana veri:** hesabın {{acik-kalem-yonetimi}} ayarı ({{SKB1}} `XOPVW`) ve **sıralama anahtarı** (`ZUAWA`). ' +
      'Kapatmanın çalışıp çalışmayacağını en çok belirleyen şey bu ikisidir.\n\n' +
      '**Hareket verisi:** kapatma belgeleri ve `AUGBL` atamaları.',

    transport:
      'Tolerans grupları, {{OB74}} kuralları ve fark hesap belirlemeleri taşınır. ' +
      'Hesapların sıralama anahtarı **ana veridir ve taşınmaz** — her sistemde ayrı ayarlanmalıdır. ' +
      'Bu ayrım, test sisteminde çalışan {{F.13}}’ün canlıda çalışmamasının klasik sebebidir.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → İş İşlemleri → Açık Kalem Kapatma → Otomatik Kapatmayı Hazırla', not:'{{OB74}} — {{F.13}} eşleştirme kriterleri' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → İş İşlemleri → Açık Kalem Kapatma → Kapatma Farkları → Kapatma Farkları İçin Tolerans Gruplarını Tanımla', not:'{{OBA3}} — fark sınırları' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Tolerans Grupları → Çalışanlar İçin Tolerans Gruplarını Tanımla', not:'{{OBA4}} — kullanıcı bazında sınırlar' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → İş İşlemleri → Açık Kalem Kapatma → Kapatma Farkları → Fark İçin Hesapları Tanımla', not:'Küçük fark hesabı belirleme' },
      { yol:'SPRO → Finansal Muhasebe → Ana Muhasebe → Ana Veri → G/L Hesapları → Hesapları Hazırla (FS00)', not:'{{acik-kalem-yonetimi}} ve **sıralama anahtarı** — ana veri' },
    ],

    ekstra:[
      { ic:'🔑', baslik:'Sıralama anahtarı — kapatmanın gizli kahramanı', metin:
        '{{F.13}} otomatik kapatmanın çalışıp çalışmaması neredeyse tamamen hesabın ' +
        '**sıralama anahtarına** ({{SKB1}} `ZUAWA`) bağlıdır.\n\n' +
        'Sıralama anahtarı, kayıt sırasında **atama alanını** ({{BSEG}} `ZUONR`) otomatik doldurur. ' +
        '{{F.13}} de eşleştirmeyi bu alana göre yapar. Anahtar yanlışsa atama alanı ya boş kalır ' +
        'ya alakasız bir değerle dolar ve eşleşme **hiç** gerçekleşmez.\n\n' +
        'Doğru anahtar seçimi hesabın amacına göre yapılır: {{gr-ir}} hesabında sipariş numarası ' +
        'veya malzeme belgesi, banka ara hesabında referans veya belge numarası, ' +
        'avans hesabında satıcı numarası.\n\n' +
        '**Kritik uyarı:** sıralama anahtarı sonradan değiştirilirse yalnızca **yeni** kalemler ' +
        'doğru dolar. Eski kalemlerin atama alanı boş kalmaya devam eder ve elle kapatılmaları gerekir.' },

      { ic:'⚖️', baslik:'İki tolerans grubu vardır ve ikisi de kontrol edilir', metin:
        '**{{OBA3}} — müşteri/satıcı tolerans grubu:** iş ortağı bazında kabul edilebilir fark. ' +
        'Müşteri/satıcı ana verisine atanır.\n\n' +
        '**{{OBA4}} — kullanıcı (çalışan) tolerans grubu:** kullanıcının kaydedebileceği azami tutar ve ' +
        'kapatmada kabul edebileceği azami fark. Kullanıcı ana verisine atanır.\n\n' +
        'Kapatmada **ikisi birden** kontrol edilir ve **daha dar olan** geçerlidir. ' +
        '"Difference too large" hatası alan bir kullanıcı, meslektaşında aynı işlemin çalıştığını ' +
        'görüyorsa sebep genelde farklı {{OBA4}} gruplarıdır.' },
    ],

    notlar:[
      { tip:'warn', baslik:'FBRA ile FB08 farkı', metin:
        '**{{FB08}}** bir *belgeyi* ters kaydeder: yeni bir ters belge üretir, orijinal belge kalır. ' +
        '**{{FBRA}}** bir *kapatmayı* geri alır: yeni belge üretmez, sadece eşleştirmeyi bozar ve ' +
        'kalemleri yeniden açar.\n\n' +
        'Yanlış kapatma için doğru araç **FBRA**’dır. FB08 kullanmak hem gereksiz belge kalabalığı ' +
        'yaratır hem de asıl sorunu (yanlış eşleştirme) çözmez.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Kapatma mantığı S/4HANA’da **değişmedi** — `AUGBL`/`AUGDT` alanları ve tolerans kontrolü aynı. ' +
      'Değişen, açık kalem verisinin nereden okunduğudur: indeks tabloları {{uyumluluk-view}}’ine dönüştü ' +
      've veriler {{ACDOCA}}’dan üretiliyor.',

    eccFarklari:[
      { konu:'Açık kalem indeksleri', ecc:'{{BSIS}}/{{BSAS}}/{{BSIK}}/{{BSAK}}/{{BSID}}/{{BSAD}} fiziksel tablo', s4:'Tamamı {{uyumluluk-view}} — veri {{ACDOCA}}’dan' },
      { konu:'Kapatma alanları', ecc:'{{BSEG}} `AUGBL`/`AUGDT`', s4:'**Aynı** — ayrıca {{ACDOCA}}’da da tutulur' },
      { konu:'Kapatma mantığı', ecc:'Tolerans + fark hesabı', s4:'**Değişmedi**' },
      { konu:'Otomatik kapatma', ecc:'{{F.13}}', s4:'{{F.13}} çalışır + Fiori "Clear G/L Accounts" önerilen eşleşmelerle' },
      { konu:'Performans', ecc:'Büyük hesaplarda indeks taraması yavaş', s4:'Sütun tabanlı {{ACDOCA}} — belirgin hızlanma' },
      { konu:'Eşleştirme önerisi', ecc:'Yok — kullanıcı elle seçer', s4:'Fiori uygulamaları olası eşleşmeleri **önerir**' },
    ],

    universalJournal:
      'Kapatma bilgisi {{ACDOCA}}’da da tutulduğu için açık kalem sorguları doğrudan bu tablodan yapılabilir. ' +
      'Pratik sonucu: "hangi kalemler açık, hangi maliyet yerine ait, hangi kâr merkezinde?" sorusu ' +
      'tek tabloda cevaplanır. ECC’de bu, indeks tablosu + {{BSEG}} + CO tablosu birleştirmesi gerektiriyordu.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'Kapatma işlem kodlarının hiçbiri kaldırılmadı; {{F-03}}, {{F-32}}, {{F-44}}, {{F.13}}, {{FBRA}} aynen çalışır' },
    ],

    fiori:[
      { ad:'Clear G/L Accounts', aciklama:'{{F-03}} yerine; olası eşleşmeleri **kendiliğinden önerir**, kullanıcı yalnızca onaylar.' },
      { ad:'Clear Incoming Payments', aciklama:'Gelen ödemeleri açık kalemlerle otomatik eşleştirme önerisi sunar.' },
      { ad:'Manage Customer Line Items', aciklama:'Açık/kapalı kalem yönetimi ve toplu kapatma.' },
      { ad:'Reset Cleared Items', aciklama:'{{FBRA}}’nın Fiori karşılığı.' },
      { ad:'GR/IR Monitor', aciklama:'{{gr-ir}} hesabının eşleşmemiş kalemlerini görsel olarak izler.' },
    ],

    compatibilityViews:[
      '{{BSIS}}, {{BSAS}} — G/L açık/kapalı kalem indeksleri artık view.',
      '{{BSIK}}, {{BSAK}}, {{BSID}}, {{BSAD}} — satıcı ve müşteri indeksleri de view.',
      'Bu view’lere **yazma yapılamaz**. Bu tablolara doğrudan INSERT/UPDATE yapan eski Z-programları ' +
      'geçişte bozulur — kapatma ile ilgili özel geliştirmeler taranmalıdır.',
      '{{BSEG}} fiziksel tablo olarak duruyor; `AUGBL` alanı hâlâ oradan okunabilir.',
    ],

    performans:
      'Açık kalem listeleri {{ACDOCA}} üzerinden üretildiği için büyük hesaplarda ({{gr-ir}} gibi ' +
      'yüz binlerce kalemli) belirgin hızlanma vardır. {{F.13}} toplu kapatma da hızlanır. ' +
      'Buna karşılık {{uyumluluk-view}} üzerinden çalışan eski özel raporlar, doğrudan {{ACDOCA}} ' +
      'sorgulayan yeni raporlardan yavaştır.',

    bestPractices:[
      'S/4HANA geçişinden **önce** geçiş hesaplarını temizle. Kirli açık kalemler yeni sisteme taşınır ' +
      've orada çözmek daha zordur.',
      'Fiori’nin eşleştirme önerisi özelliğini kullan — manuel kapatma yükünü belirgin şekilde azaltır.',
      'Sıralama anahtarlarını geçiş sırasında gözden geçir; yanlış anahtar yıllarca birikmiş ' +
      'eşleşmemiş kalem demektir.',
      '{{BSIS}}/{{BSIK}}’e yazan özel programları geçiş öncesi tara ve {{ACDOCA}} tabanlı yeniden yaz.',
      'Tolerans gruplarını sadeleştir; yıllar içinde çoğalan gruplar tutarsız davranışa yol açar.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'4,2 milyon TL’lik GR/IR bakiyesi: bir kapatma arkeolojisi',
    hikaye:
      '**Marmara Tekstil A.Ş.**’de yıl sonu denetimi. Denetçi 159 GR/IR hesabının bakiyesini soruyor: ' +
      '**4.200.000 TL alacak**. Beklenen 300-400 bin TL civarıydı.\n\n' +
      'Bu senaryo, birikmiş bir geçiş hesabının nasıl analiz edildiğini, kök sebebin nasıl bulunduğunu ' +
      've hem geçmişin hem geleceğin nasıl düzeltildiğini adım adım gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 — Marmara Tekstil A.Ş.' },
      { k:'Hesap', v:'159000 — GR/IR (açık kalem yönetimli ✓)' },
      { k:'Bakiye', v:'4.200.000 TL alacak' },
      { k:'Açık kalem sayısı', v:'3.847' },
      { k:'Dönem', v:'Aralık 2026 kapanışı' },
    ],

    adimlar:[
      { baslik:'Bakiyenin hangi dönemde bozulduğu bulunur', tcode:'FS10N',
        aciklama:'Kalem listesine dalmadan önce **hangi ay** sorusu cevaplanır. Bu, aramayı daraltır.',
        girdi:[
          { alan:'Hesap / Şirket kodu', deger:'159000 / 1000' },
          { alan:'Bulgu 2024', deger:'Yıl sonu bakiye 380.000 TL — normal' },
          { alan:'Bulgu 2025', deger:'Yıl sonu bakiye 1.900.000 TL — artmaya başlamış' },
          { alan:'Bulgu 2026', deger:'Yıl sonu bakiye 4.200.000 TL — sürekli büyüyor' },
        ],
        not:'Bakiye **düzenli olarak** büyüyor. Bu, tek seferlik bir hata değil, **sistematik bir sorun** ' +
             'işaretidir. Tek bir yanlış kayıt olsaydı bakiye sabit kalırdı.' },

      { baslik:'Açık kalemler listelenir ve gruplanır', tcode:'FBL3N',
        aciklama:'Açık kalemler **atama alanına göre** sıralanıp alt toplam alınıyor. ' +
                 'Eşleşebilecek kalemler yan yana gelir; yalnız kalanlar sorunludur.',
        girdi:[
          { alan:'Seçim', deger:'Hesap 159000 · **Açık kalemler** · 31.12.2026' },
          { alan:'Düzen', deger:'Atama (`ZUONR`), Referans, Metin sütunları eklendi; atamaya göre alt toplam' },
          { alan:'**Kritik bulgu**', deger:'3.847 kalemin **3.102’sinde atama alanı BOŞ**' },
          { alan:'Eşleşebilir', deger:'Atama dolu 745 kalemin 690’ı çiftler hâlinde — eşleşebilir durumda' },
        ],
        tabloEtkisi:[
          { tablo:'BSIS', ne:'Rapor buradan okuyor (S/4HANA’da {{ACDOCA}} üzerinden view)' },
        ],
        not:'İşte kök sebep: **atama alanı boş olan kalemler {{F.13}} tarafından eşleştirilemez.** ' +
             'Kayıtlar doğru, denklik bozulmamış, hata mesajı yok — ama otomatik kapatma hiç çalışmamış.' },

      { baslik:'Kök sebep doğrulanır — sıralama anahtarı', tcode:'FS00',
        aciklama:'Hesabın ana verisi inceleniyor. Şüphe {{SKB1}} `ZUAWA` (sıralama anahtarı) alanında.',
        girdi:[
          { alan:'Hesap', deger:'159000 → Kontrol verisi sekmesi' },
          { alan:'Açık kalem yönetimi (`XOPVW`)', deger:'X — **doğru** ✓' },
          { alan:'Kalem görüntüleme (`XKRES`)', deger:'X — doğru ✓' },
          { alan:'**Sıralama anahtarı (`ZUAWA`)**', deger:'**BOŞ** ✕ — sorunun kaynağı' },
          { alan:'Beklenen', deger:'014 (sipariş numarası) veya 018 (satınalma belgesi)' },
        ],
        not:'Sıralama anahtarı boş olduğu için kayıt sırasında atama alanı hiç doldurulmuyor. ' +
             '{{F.13}} eşleştirmeyi bu alana göre yaptığı için hiçbir kalem kapatılamıyor. ' +
             '**Tek bir ana veri ayarı, üç yıllık temizlik borcu yaratmış.**' },

      { baslik:'F.13 kuralı da kontrol edilir', tcode:'OB74',
        aciklama:'İkinci bir olası sebep: kapatma kuralının hiç tanımlanmamış olması.',
        girdi:[
          { alan:'Şirket kodu / Hesap tipi', deger:'1000 / S (ana muhasebe)' },
          { alan:'Hesap aralığı 159000', deger:'Kural **var** — kriter 1: `ZUONR` ✓' },
          { alan:'Sonuç', deger:'Kural doğru; sorun yalnızca atama alanının boş olması' },
        ],
        not:'Kural doğru tanımlanmış ama beslendiği alan boş. Bu, "F.13 çalışmıyor" şikâyetinin ' +
             'iki olası sebebinden hangisinin geçerli olduğunu netleştirir.' },

      { baslik:'Geleceği düzelt — sıralama anahtarı ayarlanır', tcode:'FS00',
        aciklama:'Sıralama anahtarı doğru değere ayarlanıyor. **Bu, yalnızca yeni kalemleri etkiler.**',
        girdi:[
          { alan:'Hesap 159000', deger:'Sıralama anahtarı → **014** (satınalma siparişi)' },
          { alan:'Etki', deger:'Bugünden sonraki kayıtlarda atama alanı sipariş numarasıyla dolacak' },
          { alan:'**Etkilemediği**', deger:'Mevcut 3.102 kalem — atama alanları boş kalmaya devam eder' },
        ],
        not:'Kritik nokta: sıralama anahtarı **geçmişe dönük çalışmaz**. Eski kalemler ayrı bir ' +
             'temizlik operasyonu gerektirir.' },

      { baslik:'Eşleşebilir kalemler otomatik kapatılır', tcode:'F.13',
        aciklama:'Atama alanı dolu olan 690 kalem için otomatik kapatma çalıştırılıyor. ' +
                 '**Önce test modunda.**',
        girdi:[
          { alan:'Seçim', deger:'Şirket kodu 1000 · Hesap 159000 · Hesap tipi S · **Test modu ✓**' },
          { alan:'Test sonucu', deger:'690 kalem kapatılabilir / 3.157 kalem eşleşmedi' },
          { alan:'Gerçek çalıştırma', deger:'690 kalem kapatıldı — bakiye etkisi **sıfır**' },
        ],
        fis:{ baslik:'Kapatma belgeleri (345 adet)', belgeTuru:'AB', tarih:'31.12.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR — eşleşen kalemler (kapatıldı)', borc:0, alacak:0, not:'Yalnızca `AUGBL` yazıldı' },
          ], not:'**Bakiye değişmedi.** Kapatma bakiyeyi değil, kalemlerin durumunu değiştirir. ' +
                 '4.200.000 TL hâlâ duruyor — çünkü o bakiye eşleşmemiş kalemlerden geliyor.' },
        tabloEtkisi:[
          { tablo:'BSIS', ne:'690 kalem silindi' },
          { tablo:'BSAS', ne:'690 kalem eklendi, `AUGBL` dolu' },
        ] },

      { baslik:'Kalan 3.157 kalem analiz edilir', tcode:'ME23N',
        aciklama:'Atama alanı boş olan kalemler sipariş bazında inceleniyor. Üç farklı grup çıkıyor.',
        girdi:[
          { alan:'**Grup 1** — 2.140 kalem / 2.850.000 TL', deger:'Eşleşebilir: mal girişi ve fatura ikisi de var, sadece atama boş' },
          { alan:'**Grup 2** — 780 kalem / 1.100.000 TL', deger:'Gerçek zamanlama farkı: mal geldi, fatura henüz gelmedi' },
          { alan:'**Grup 3** — 237 kalem / 250.000 TL', deger:'Kalıcı fark: küçük miktar/fiyat farkları, hiç eşleşmeyecek' },
        ],
        not:'Üç grup, üç farklı çözüm gerektiriyor. Hepsini aynı yöntemle temizlemeye çalışmak yanlış olur.' },

      { baslik:'Grup 1 elle kapatılır', tcode:'F-03',
        aciklama:'Eşleşebilir 2.140 kalem, sipariş numarasına göre süzülerek gruplar hâlinde elle kapatılıyor.',
        girdi:[
          { alan:'Yöntem', deger:'{{F-03}} → ek seçim: referans alanı = sipariş numarası' },
          { alan:'Düzen', deger:'Referansa göre sıralı, alt toplamlı' },
          { alan:'Sonuç', deger:'2.140 kalem kapatıldı — 47 iş günü yerine 3 günde (toplu seçimle)' },
        ],
        not:'{{F-03}}’te düzeni referans/atama alanına göre sıralamak, elle kapatmayı katlanılabilir hâle getirir. ' +
             'Kalemler çiftler hâlinde yan yana gelir.' },

      { baslik:'Grup 3 için kalıcı farklar yazılır', tcode:'MR11',
        aciklama:'Hiç eşleşmeyecek küçük farklar {{MR11}} ile temizleniyor — bunlar gerçek bir gider/gelirdir.',
        girdi:[
          { alan:'Seçim', deger:'Şirket kodu 1000 · GR/IR farkları · tutar sınırı 5.000 TL altı' },
          { alan:'Sonuç', deger:'237 kalem kapatıldı, 250.000 TL fark hesabına yazıldı' },
        ],
        fis:{ baslik:'Belge 1000009876 — GR/IR fark temizliği', belgeTuru:'SA', tarih:'31.12.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR hesabı', borc:250000, not:'Kalemler kapatıldı' },
            { hesap:'659', ad:'Diğer olağan gider — GR/IR farkı', alacak:0, borc:0 },
            { hesap:'649', ad:'Diğer olağan gelir — GR/IR farkı', alacak:250000, not:'Net fark gelire yazıldı' },
          ], not:'Bu kayıt bakiyeyi **gerçekten** azaltır — çünkü kalemler eşleşmiyor, ' +
                 'aradaki fark kalıcı olarak gelir/gider yazılıyor.' } },

      { baslik:'Grup 2 dönem sonu yeniden sınıflaması', tcode:'F.19',
        aciklama:'Gerçek zamanlama farkı olan 1.100.000 TL, bilançoda doğru kalemde gösterilmek üzere ' +
                 'yeniden sınıflanıyor. **Bu kalemler kapatılmaz** — henüz karşılığı gelmedi.',
        fis:{ baslik:'Belge 1000009877 — GR/IR yeniden sınıflama', belgeTuru:'SA', tarih:'31.12.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR hesabı', borc:1100000, not:'Geçici boşaltma' },
            { hesap:'326', ad:'Alınan ama faturalanmamış mallar', alacak:1100000, not:'Bilanço sunum hesabı' },
          ], not:'01.01.2027’de **otomatik ters kaydedilir**. Amaç yalnızca 31.12 bilançosunda doğru sunum.' } },
    ],

    sonuc:
      '**Sonuç:** 4.200.000 TL’lik bakiye üçe ayrıldı ve her biri farklı yöntemle çözüldü:\n\n' +
      '• **2.850.000 TL** eşleşebilir kalem → {{F-03}} ile elle kapatıldı (bakiye etkisi yok)\n' +
      '• **250.000 TL** kalıcı fark → {{MR11}} ile yazıldı (bakiye gerçekten azaldı)\n' +
      '• **1.100.000 TL** gerçek zamanlama farkı → {{F.19}} ile yeniden sınıflandı (bilançoda doğru kalemde)\n\n' +
      'Yıl sonu GR/IR bakiyesi **1.100.000 TL**’ye indi ve bu tutarın tamamı açıklanabilir durumda.\n\n' +
      '**Üç kritik ders:**\n\n' +
      '**1. Kapatma bakiyeyi değiştirmez.** 690 kalem kapatıldığında bakiye hiç değişmedi — ' +
      'çünkü o kalemler zaten birbirini götürüyordu. Bakiyeyi değiştiren tek işlem {{MR11}} oldu, ' +
      'çünkü orada gerçek bir fark yazıldı.\n\n' +
      '**2. Sorunun kaynağı kapatma işleminde değil, ana veridedir.** Sıralama anahtarı boş olduğu için ' +
      'atama alanı dolmuyordu; {{F.13}} de eşleştirme yapamıyordu. Tek bir alan, üç yıllık birikim yarattı.\n\n' +
      '**3. Sıralama anahtarı geçmişe dönük çalışmaz.** Ayarı düzeltmek geleceği kurtarır ama ' +
      'eski kalemler ayrı bir temizlik operasyonu gerektirir. Bu yüzden geçiş hesapları **açılırken** ' +
      'doğru kurulmalıdır — sonradan düzeltmenin maliyeti çok yüksektir.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '{{kapatma}}, birbirini götüren açık kalemleri eşleştirip kapalı hâle getirmedir.',
      'Teknik olarak tek şey yapar: kalemlere **`AUGBL`** (kapatma belgesi) ve **`AUGDT`** yazar. **`AUGBL` boşsa kalem açıktır.**',
      '**Kapatma bakiyeyi değiştirmez** (fark hariç) — yalnızca kalemlerin açık/kapalı durumunu değiştirir.',
      'Üç yolu vardır: ödemeyle eşzamanlı (en temiz), {{F.13}} toplu otomatik, elle ({{F-03}}/{{F-32}}/{{F-44}}).',
      '{{F.13}}’ün çalışması hesabın **sıralama anahtarına** ({{SKB1}} `ZUAWA`) bağlıdır — o alan atama (`ZUONR`) alanını doldurur.',
      'Fark {{tolerans-grubu}} içindeyse otomatik hesaba atılır; dışındaysa **kapatma engellenir**.',
      '{{kismi-kapatma}} vadeyi korur (hiçbir kalem kapanmaz); {{kalan-kapatma}} orijinali kapatır ve **vadeyi sıfırlar**.',
      'Yanlış kapatma **{{FBRA}}** ile geri alınır — {{FB08}} ile değil.',
    ],

    onemliNoktalar:[
      '**"Kapatma hangi hesapları etkiler?"** Fark yoksa **hiçbirini**. Kapatma belgesinin tutarı sıfırdır; yalnızca `AUGBL` yazılır.',
      '**"Bir kalemin açık olduğunu nereden anlarsın?"** {{BSEG}} `AUGBL` alanı boşsa açıktır. Tek ölçüt budur.',
      '**"{{F.13}} hiçbir şey kapatmıyor. Neden?"** Neredeyse her zaman atama alanı (`ZUONR`) boş veya uyumsuzdur. Sebep hesabın **sıralama anahtarıdır**, {{F.13}} değil.',
      '**"Sıralama anahtarını düzeltirsem eski kalemler düzelir mi?"** **Hayır.** Yalnızca yeni kalemler doğru dolar; eskiler elle kapatılmalıdır.',
      '**"Kısmi ile kalan kapatma farkı?"** Kısmi: hiçbir kalem kapanmaz, iki açık kalem olur, **vade korunur**. Kalan: orijinal kapanır, yeni kalem üretilir, **vade sıfırlanır**.',
      '**"FBRA ile FB08 farkı?"** FBRA *kapatmayı* geri alır (yeni belge üretmez). FB08 *belgeyi* ters kaydeder (yeni belge üretir). Yanlış kapatma için doğru araç FBRA’dır.',
      '**"Hangi hesaplarda açık kalem yönetimi açılır?"** Geçiş hesaplarında: {{gr-ir}}, {{banka-ara-hesabi}}, avans hesapları. Gelir/gider hesaplarında **açılmaz**.',
      '**"Kaç tolerans grubu vardır?"** İki: {{OBA3}} (müşteri/satıcı) ve {{OBA4}} (kullanıcı). İkisi birden kontrol edilir, **daha dar olan** geçerlidir.',
    ],

    sikHatalar:[
      { hata:'"Kapatma yaparak GR/IR bakiyesini sıfırlayalım" demek.', dogru:'Kapatma bakiyeyi değiştirmez. Bakiye kalıyorsa eşleşmemiş kalemler vardır; sebebini bulmak gerekir.' },
      { hata:'{{F.13}} çalışmıyor diye programı veya {{OB74}} kuralını suçlamak.', dogru:'Kaynak neredeyse her zaman hesabın **sıralama anahtarıdır** — atama alanı boş kalıyordur.' },
      { hata:'Yanlış kapatmayı {{FB08}} ile düzeltmeye çalışmak.', dogru:'{{FBRA}} kullanılır. FB08 gereksiz belge yaratır ve yanlış eşleştirmeyi çözmez.' },
      { hata:'Her kısmi ödemede kalan kapatma kullanmak.', dogru:'Vadeyi sıfırlar ve gecikmiş kalemleri gizler. Varsayılan **kısmi kapatma** olmalıdır.' },
      { hata:'Gelir/gider hesaplarında açık kalem yönetimi açmak.', dogru:'Yalnızca geçiş hesaplarında açılır. Gereksiz açmak kalem birikmesine yol açar.' },
      { hata:'{{F.13}}’ü doğrudan gerçek modda çalıştırmak.', dogru:'Önce test modu; sonuç incelenir, sonra gerçek çalıştırma yapılır.' },
      { hata:'"Difference too large" hatasında hemen toleransı yükseltmek.', dogru:'%90 ihtimalle yanlış kalem seçilmiştir. Önce seçim kontrol edilir.' },
      { hata:'Avans kalemlerini kapatma listesinde bulamayınca yok sanmak.', dogru:'"Özel G/L işlemleri" kutusu işaretlenmelidir.' },
      { hata:'Geçiş hesabını sıralama anahtarı ayarlamadan açmak.', dogru:'Hesap açılırken açık kalem yönetimi + sıralama anahtarı + kalem görüntüleme birlikte ayarlanmalıdır.' },
    ],

    ipuclari:[
      'Kapatma ekranlarında **düzeni atama (`ZUONR`) alanına göre sırala ve alt toplam al**. ' +
      'Birbirini götüren kalemler yan yana gelir; bu tek alışkanlık temizliği saatlerden dakikalara indirir.',
      'Kalemler ekranda **hepsi seçili** gelir. *Seçimi kaldır* ile temizleyip bilinçli seçim yapmak ' +
      'yanlış kapatmayı önler.',
      'Ay sonunda {{gr-ir}} ve banka ara hesaplarının açık kalem listesine bir kez göz at. ' +
      'Beş dakikalık kontrol, yıl sonunda günlerce sürecek arkeolojiyi önler.',
      'Yeni bir geçiş hesabı açarken üç ayarı birlikte yap: açık kalem yönetimi **açık**, ' +
      'sıralama anahtarı **amaca uygun**, kalem görüntüleme **açık**.',
      'Geçiş hesabı bakiyesini analiz ederken kalemleri üçe ayır: **eşleşebilir** (kapat), ' +
      '**gerçek zamanlama farkı** (yeniden sınıfla), **kalıcı fark** (yaz). ' +
      'Hepsini aynı yöntemle temizlemeye çalışma.',
      '{{FBRA}} için kapatma belgesi numarasını kalemin `AUGBL` alanından al — belge numarasıyla karıştırma.',
    ],

    quiz:[
      { soru:'İki kalem farksız olarak kapatıldı. Hesabın bakiyesine ne olur?',
        secenekler:[
          'Sıfırlanır',
          'Kapatılan tutar kadar azalır',
          '**Değişmez** — kapatma yalnızca kalem durumunu değiştirir',
          'İki katına çıkar',
        ], dogru:2,
        aciklama:'Kapatma belgesinin tutarı sıfırdır; hiçbir hesap hareket etmez. Yapılan tek şey ' +
                 'kalemlere aynı `AUGBL` numarasını yazmaktır. Zaten birbirini götüren iki kalem ' +
                 'kapatılmadan önce de bakiyeye net sıfır etki yapıyordu.' },

      { soru:'Bir {{BSEG}} kaleminin açık olduğunu nasıl anlarsın?',
        secenekler:[
          '`SHKZG` alanı S ise',
          '`AUGBL` alanı **boşsa**',
          '`ZUONR` alanı doluysa',
          '`BLART` alanı KR ise',
        ], dogru:1,
        aciklama:'`AUGBL` kapatma belgesinin numarasıdır. Doluysa kalem kapatılmıştır ve kapalı indekse ' +
                 '({{BSAK}}/{{BSAD}}/{{BSAS}}) taşınmıştır. Boşsa {{acik-kalem}}dir. Tek ölçüt budur.' },

      { soru:'{{F.13}} çalıştırıldı ama hiçbir kalem kapatılmadı ve hata mesajı da yok. En olası sebep?',
        secenekler:[
          'Dönem kapalı',
          'Kullanıcının yetkisi yok',
          'Atama (`ZUONR`) alanı boş — hesabın **sıralama anahtarı** yanlış',
          'Hesap bilanço hesabı değil',
        ], dogru:2,
        aciklama:'{{F.13}} eşleştirmeyi {{OB74}}’te tanımlı alanlara (genelde `ZUONR`) göre yapar. ' +
                 'Bu alan hesabın sıralama anahtarından ({{SKB1}} `ZUAWA`) otomatik dolar. ' +
                 'Anahtar boş veya yanlışsa alan dolmaz ve eşleşme hiç gerçekleşmez. ' +
                 '**Sorun F.13’te değil, ana veridedir.**' },

      { soru:'Hesabın sıralama anahtarını düzelttin. Mevcut açık kalemlere ne olur?',
        secenekler:[
          'Otomatik olarak güncellenir ve eşleşmeye başlar',
          '**Değişmez** — yalnızca yeni kalemler doğru dolar',
          'Silinir',
          'Kapatılır',
        ], dogru:1,
        aciklama:'Sıralama anahtarı kayıt sırasında çalışır; **geçmişe dönük etkisi yoktur**. ' +
                 'Mevcut kalemlerin atama alanı boş kalmaya devam eder ve elle ({{F-03}}) kapatılmaları ' +
                 'veya atama alanının toplu güncellenmesi gerekir. Bu yüzden geçiş hesapları ' +
                 '**açılırken** doğru kurulmalıdır.' },

      { soru:'Yanlış kalemleri kapattın. Doğru düzeltme yöntemi nedir?',
        secenekler:[
          '{{FB08}} ile kapatma belgesini ters kaydetmek',
          '**{{FBRA}}** ile kapatmayı geri almak',
          'Yeni bir kapatma belgesi girmek',
          '{{FB02}} ile `AUGBL` alanını temizlemek',
        ], dogru:1,
        aciklama:'{{FBRA}} kapatmayı sıfırlar: kalemler yeniden açık hâle gelir ve kapalı indeksten ' +
                 'açık indekse döner. **Yeni belge üretmez.** {{FB08}} ise belgeyi ters kaydeder — ' +
                 'gereksiz belge kalabalığı yaratır ve yanlış eşleştirmeyi çözmez.' },

      { soru:'100.000 TL’lik borcun 40.000 TL’si ödendi ve **kısmi kapatma** seçildi. Kaç açık kalem kalır?',
        secenekler:['Sıfır','Bir (60.000 TL)','**İki** (+100.000 ve −40.000)','Üç'],
        dogru:2,
        aciklama:'{{kismi-kapatma}}da **hiçbir kalem kapanmaz**. Orijinal 100.000 TL açık kalır, ' +
                 'ödeme −40.000 olarak ayrı bir açık kalem olur; ikisinin de `AUGBL` alanı boştur. ' +
                 'Avantajı: orijinal vade korunur, {{yaslandirma}} bozulmaz. ' +
                 '{{kalan-kapatma}} seçilseydi orijinal kapanır ve 60.000 TL’lik **tek** yeni kalem doğardı.' },

      { soru:'Kapatmada 12 TL fark çıktı ve tolerans sınırı 50 TL. Ne olur?',
        secenekler:[
          'Kapatma engellenir',
          'Fark otomatik olarak bir hesaba atılır ve kapatma yapılır',
          'Kullanıcıdan fark satırı girmesi istenir',
          'Kalan kapatma zorunlu hâle gelir',
        ], dogru:1,
        aciklama:'Fark {{tolerans-grubu}} sınırının içinde olduğu için sistem otomatik olarak uygun ' +
                 'hesaba atar: iskonto süresindeyse iskonto hesabına, döviz farkıysa kur farkına, ' +
                 'değilse küçük fark hesabına. Tolerans dışında olsaydı kapatma engellenirdi.' },

      { soru:'Aşağıdaki hesaplardan hangisinde {{acik-kalem-yonetimi}} açılmalıdır?',
        secenekler:[
          '600 Yurtiçi satışlar',
          '770 Genel yönetim gideri',
          '**159 GR/IR hesabı**',
          '500 Sermaye',
        ], dogru:2,
        aciklama:'{{gr-ir}} bir **geçiş hesabıdır**: mal girişi alacak yazar, fatura girişi borç yazar ve ' +
                 'ikisi eşleşince kalem kapanır. Gelir, gider ve özkaynak hesaplarında kalem eşleştirmesi ' +
                 'anlamsızdır; yalnızca bakiye önemlidir. Gereksiz açmak kalem birikmesine yol açar.' },
    ],

    flashcards:[
      { on:'Kapatma teknik olarak ne yapar?', arka:'Kalemlere **iki alan** yazar:\n• **AUGBL** — kapatma belgesi numarası\n• **AUGDT** — kapatma tarihi\n\nVe kalemi açık indeksten kapalı indekse taşır.\n\n**AUGBL boşsa kalem açıktır.**' },
      { on:'Kapatma hesabın bakiyesini değiştirir mi?', arka:'**Hayır** (fark hariç).\n\nKapatma belgesinin tutarı sıfırdır. Değişen yalnızca kalemlerin açık/kapalı durumudur.\n\n"Kapatarak bakiyeyi sıfırlayalım" cümlesi yanlıştır.' },
      { on:'F.13 neden hiçbir kalem kapatmıyor olabilir?', arka:'**Atama alanı (ZUONR) boş veya uyumsuz.**\n\nBu alan hesabın **sıralama anahtarından** (SKB1-ZUAWA) otomatik dolar.\n\nAnahtar yanlışsa alan dolmaz → eşleşme olmaz.\n\n**Sorun F.13’te değil, ana veridedir.**' },
      { on:'Sıralama anahtarı geçmişe dönük çalışır mı?', arka:'**Hayır.**\n\nDüzeltirsen yalnızca **yeni** kalemlerin atama alanı doğru dolar.\n\nEski kalemler boş kalmaya devam eder → elle (F-03) kapatılmalıdır.\n\nBu yüzden geçiş hesapları **açılırken** doğru kurulmalıdır.' },
      { on:'FBRA ile FB08 farkı nedir?', arka:'**FBRA** — *kapatmayı* geri alır. Yeni belge üretmez, kalemler yeniden açılır.\n\n**FB08** — *belgeyi* ters kaydeder. Yeni ters belge üretir.\n\nYanlış kapatma için doğru araç **FBRA**’dır.' },
      { on:'Kısmi kapatmada kaç kalem kapanır?', arka:'**Hiçbiri.**\n\nOrijinal kalem açık kalır, ödeme ayrı açık kalem olur → **iki açık kalem**.\n\nAvantajı: orijinal **vade korunur**, yaşlandırma bozulmaz.\n\nKalan kapatmada orijinal kapanır, yeni kalem doğar, vade sıfırlanır.' },
      { on:'Kapatmada fark çıkarsa ne olur?', arka:'**Tolerans içindeyse:** otomatik bir hesaba atılır (iskonto / kur farkı / küçük fark) ve kapatma yapılır.\n\n**Tolerans dışındaysa:** kapatma **engellenir**. "Difference too large" hatası alınır.' },
      { on:'Kaç tolerans grubu vardır?', arka:'**İki:**\n• **OBA3** — müşteri/satıcı tolerans grubu (iş ortağına atanır)\n• **OBA4** — kullanıcı tolerans grubu (kullanıcıya atanır)\n\nİkisi birden kontrol edilir; **daha dar olan** geçerlidir.' },
      { on:'Hangi hesaplarda açık kalem yönetimi açılır?', arka:'**Geçiş hesaplarında:**\n• GR/IR\n• Banka ara hesapları\n• Avans hesapları\n• Personel avansları\n\n**Açılmaz:** gelir, gider, özkaynak hesapları — orada yalnızca bakiye anlamlıdır.' },
      { on:'Geçiş hesabı bakiyesi analiz edilirken kalemler nasıl ayrılır?', arka:'**Üçe ayrılır:**\n1. **Eşleşebilir** → kapat (bakiye değişmez)\n2. **Gerçek zamanlama farkı** → F.19 ile yeniden sınıfla\n3. **Kalıcı fark** → MR11 ile yaz (bakiye gerçekten azalır)\n\nHepsini aynı yöntemle temizleme.' },
      { on:'Kapatma ekranında en kritik gösterge nedir?', arka:'Alttaki **"Atanmamış"** alanı.\n\n**Sıfır olmalıdır.** Sıfır değilse seçilen kalemler dengelenmemiştir ve kapatma yapılamaz.\n\nİpucu: düzeni atama alanına göre sırala — eşleşen kalemler yan yana gelir.' },
      { on:'S/4HANA’da kapatma değişti mi?', arka:'**Mantığı değişmedi** — AUGBL/AUGDT ve tolerans aynı.\n\nDeğişen: BSIS/BSAS/BSIK/BSAK/BSID/BSAD artık **compatibility view**; veri ACDOCA’dan üretilir.\n\nFiori "Clear G/L Accounts" olası eşleşmeleri **önerir**.' },
    ],
  },

  },
});
