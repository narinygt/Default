/* ==========================================================================
   content/fi/data-upload.js — "Data Upload (Veri Yükleme)"

   Ana tez: Yöntem seçimi bir HIZ kararı değil, bir HATA YÖNETİMİ kararıdır.
   ========================================================================== */

SAP.registerTopic({
  id: 'data-upload',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Veri yükleme, SAP’a **elle girilmeyecek kadar çok** kaydı toplu olarak ' +
      'aktarma işidir. {{konu:lsmw}} bunu yapan bir **araçtır**; ' +
      'bu konu ise **altındaki dört yöntemi** karşılaştırır.\n\n' +
      '---\n\n' +
      '**Bu konunun tezi:**\n\n' +
      '**Yöntem seçimi bir hız kararı değil, bir *hata yönetimi* kararıdır.**\n\n' +
      'Yeni danışman şunu sorar: *"Hangisi daha hızlı?"*\n' +
      'Deneyimli danışman şunu sorar: **"500 kayıttan 14’ü başarısız olursa ne olacak?"**\n\n' +
      'Çünkü **her zaman bir kısmı başarısız olur**. Veri kalitesi hiç mükemmel değildir.\n\n' +
      'Asıl soru şudur:\n\n' +
      '• Başarısız olanları **görebilir miyim**?\n' +
      '• Düzeltip **yeniden çalıştırabilir miyim**?\n' +
      '• Yeniden çalıştırınca başarılılar **tekrarlanır mı**?\n\n' +
      '**Dört yöntem bu üç soruya farklı cevaplar verir** — ' +
      've seçim buna göre yapılır.',

    neden:
      '**Ölçek.** 12.000 satıcıyı elle açmak haftalar sürer ve ' +
      'insan hatası **kaçınılmazdır**.\n\n' +
      '**Tekrarlanabilirlik.** Geçiş provası birden çok kez yapılır; ' +
      'her seferinde aynı sonuç gerekir.\n\n' +
      '**Denetlenebilirlik.** *"Bu 12.000 kayıt nereden geldi?"* ' +
      'sorusunun cevabı olmalıdır.\n\n' +
      '**Süreklilik.** Bazı yüklemeler tek seferlik değildir: ' +
      'aylık banka ekstresi, günlük fiyat listesi, sürekli arayüzler.\n\n' +
      'Son madde yöntem seçimini **doğrudan etkiler**: ' +
      'tek seferlik yükleme ile sürekli arayüz **farklı araçlar** ister.',

    sirketOnemi:
      'Yükleme hataları **sessiz** olduğu için pahalıdır.\n\n' +
      '500 kayıt gönderilir, ekranda *"işlem tamamlandı"* yazar, ' +
      '**486’sı oluşur**. 14’ü sessizce kaybolur.\n\n' +
      'Kimse saymadığı için kimse fark etmez.\n\n' +
      '---\n\n' +
      '**Bu yüzden bu konunun tek zorunlu kuralı vardır:**\n\n' +
      '**{{sayi-mutabakati}} — gönderilen = oluşan.**\n\n' +
      'Ve iki seviyede yapılır:\n\n' +
      '**Adet** — satır sayısı = belge sayısı\n' +
      '**Tutar** — kaynak toplamı = sistem toplamı\n\n' +
      'İkincisi daha güçlüdür: **adet tutup tutar tutmuyorsa** ' +
      'bir {{donusum-kurali}} hatası vardır (ondalık ayracı, kur, birim).\n\n' +
      'Bu kural {{konu:error-handling}}, {{konu:lsmw}} ve {{konu:migration}} ' +
      'konularının **ortak zorunlu adımıdır** — üçünde de aynı sebeple.',

    gercekHayat:
      'Kullanıcı: *"3.000 satırlık bir Excel var, sisteme girebilir misiniz?"*\n\n' +
      'Deneyimsiz cevap: *"Tabii, {{toplu-giris}} ile yaparız."*\n\n' +
      '---\n\n' +
      'Deneyimli cevap **üç soruyla** başlar:\n\n' +
      '**1. Bu bir kez mi olacak, tekrarlanacak mı?**\n' +
      'Tek seferlik → {{toplu-giris}} yeter.\n' +
      'Her ay → **program** yazılmalı, LSMW değil.\n' +
      'Sürekli/otomatik → {{idoc}} veya arayüz.\n\n' +
      '**2. Hangi işlem? BAPI’si var mı?**\n' +
      'Varsa {{bapi}}; yoksa {{kayit-recording}}.\n\n' +
      '**3. Hatalı satırlarla ne olacak?**\n' +
      'Bu soru **en kritik olanıdır** ve genelde hiç sorulmaz.\n\n' +
      '---\n\n' +
      'Üçüncü sorunun cevabı yöntemi belirler:\n\n' +
      '**{{toplu-giris}}** → hatalı satırlar **oturumda bekler**, ' +
      'düzeltilip yeniden işlenir. ✓ **Hazır gelir.**\n\n' +
      '**{{bapi}}** → tekrar çalıştırılabilirliği **sen kurgularsın**. ' +
      'Kurgulamazsan ikinci çalıştırma **mükerrer kayıt** üretir.\n\n' +
      '**{{idoc}}** → her mesaj kendi statüsünü tutar, ' +
      '{{BD87}} ile **tek tek** yeniden işlenir. ✓ **En iyi izlenebilirlik.**',

    muhasebeMantigi:
      'Yükleme yöntemi muhasebe kaydını **değiştirmez** — ' +
      '{{FB50}} ile elle atılan kayıtla toplu yüklenen kayıt **aynıdır**.\n\n' +
      'Ama iki muhasebe riski yöntemle **doğrudan ilgilidir**:\n\n' +
      '---\n\n' +
      '**Risk 1 — Mükerrer kayıt.**\n\n' +
      'Bir yükleme yarıda kesilir ve baştan çalıştırılır. ' +
      'İlk turda başarılı olanlar **ikinci kez** yazılır.\n\n' +
      'Muhasebede bu **çift kayıt** demektir: bakiye iki katına çıkar, ' +
      'mizan bozulur ve düzeltmek için {{FB08}} gerekir.\n\n' +
      '**{{toplu-giris}} bunu yapısal olarak önler** — ' +
      'yalnızca işlenmemiş satırları tekrarlar. ' +
      '{{bapi}} ile yazılan programda ise **sen önlemelisin**.\n\n' +
      '---\n\n' +
      '**Risk 2 — Yarım kalmış yükleme.**\n\n' +
      'Çok satırlı bir belge (başlık + kalemler) yüklenirken ' +
      'yarısı yazılır, yarısı yazılmaz.\n\n' +
      '**Muhasebede bunun karşılığı yoktur:** ' +
      'bir belge ya tamamen oluşur ya hiç oluşmaz. ' +
      'Yarım belge **dengesiz belgedir** ve SAP buna izin vermez.\n\n' +
      'Bu yüzden çok satırlı yüklemelerde **belge bazlı LUW** korunmalıdır: ' +
      'her belge kendi işleminde, tamamı veya hiçbiri.',

    kavramlar: ['toplu-giris', 'bapi', 'idoc', 'sayi-mutabakati',
                'guncelleme-hatasi', 'kilitleme', 'arayuz-tablosu'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Yükleme süreci **beş adımdır** ve son adım en çok atlanandır. ' +
      'Sıra, hatanın **en ucuz yerde** yakalanması için tasarlanmıştır.',

    roller:[
      { rol:'Kullanıcı', gorev:'Kaynak veriyi hazırlar (Excel / CSV).' },
      { rol:'Danışman', gorev:'**Üç soruyu** sorar: tek seferlik mi · BAPI var mı · **hatalılar ne olacak?**' },
      { rol:'Danışman', gorev:'Yöntemi seçer: {{toplu-giris}} · {{bapi}} · {{idoc}} · standart nesne' },
      { rol:'Danışman', gorev:'Küçük kümeyle **deneme** yapar.' },
      { rol:'Danışman', gorev:'Tam yükleme — mümkünse **parçalara bölerek**.' },
      { rol:'Danışman', gorev:'{{sayi-mutabakati}} — **adet ve tutar**.' },
      { rol:'Danışman', gorev:'{{SM13}} kontrolü — {{guncelleme-hatasi}} var mı?' },
      { rol:'Danışman', gorev:'Hatalı satırları düzeltir ve **yeniden işler**.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Veri yükleme — beş adım, iki kontrol',
      adimlar:[
        { ic:'📊', rol:'Kullanıcı', baslik:'Kaynak veri hazırlanır',
          aciklama:'Excel veya CSV. Sayısal görünen kodlar ' +
                   '(hesap, satıcı numarası) **metin** biçiminde tutulur.',
          cikti:'Kaynak dosya', ok:'yöntem seçilir' },
        { ic:'❓', rol:'Danışman', baslik:'Üç soru — yöntemi bunlar belirler',
          aciklama:'**1.** Tek seferlik mi, tekrarlanacak mı?\n' +
                   '**2.** {{bapi}} var mı?\n' +
                   '**3.** **Hatalı satırlarla ne olacak?**\n\n' +
                   'Üçüncüsü en kritik ve en çok atlanan sorudur.',
          cikti:'Yöntem kararı', ok:'kurulur' },
        { ic:'🔧', rol:'Danışman', baslik:'Yöntem kurulur',
          aciklama:'{{toplu-giris}} → {{SHDB}} + {{LSMW}}\n' +
                   '{{bapi}} → program veya LSMW\n' +
                   '{{idoc}} → {{WE20}} partner profili + mesaj tipi',
          cikti:'Yükleme mekanizması', ok:'denenir' },
        { ic:'🧪', rol:'Danışman', baslik:'Küçük kümeyle deneme',
          aciklama:'10–50 satır. Küme **rastgele değil**, ' +
                   'her ayrık değerden örnek içerecek şekilde **taranarak** seçilir.\n\n' +
                   'İlk hata listesi = **veri temizliği iş planı**.',
          cikti:'Hata listesi', ok:'düzelt ve tekrarla' },
        { ic:'▶', rol:'Danışman', baslik:'Tam yükleme — parçalara bölerek',
          aciklama:'Büyük kümeler bölünür. Paralel çalıştırılacaksa ' +
                   'aynı ana veriye dokunan parçalar **ayrılmalı** — ' +
                   'yoksa {{kilitleme}} çakışması.',
          cikti:'Yüklenmiş veri', ok:'SAYILIR' },
        { ic:'🔢', rol:'Kontrol 1', baslik:'{{sayi-mutabakati}} — atlanmaz',
          aciklama:'**Adet:** gönderilen satır = oluşan belge\n' +
                   '**Tutar:** kaynak toplamı = sistem toplamı\n\n' +
                   'Adet tutup **tutar tutmuyorsa** → {{donusum-kurali}} hatası ' +
                   '(ondalık ayracı, kur, birim).',
          cikti:'Sayısal doğrulama', ok:'sessizleri ara' },
        { ic:'🔇', rol:'Kontrol 2', baslik:'{{SM13}} — sessiz kayıplar',
          aciklama:'{{guncelleme-hatasi}}: numara verildi, belge **yazılmadı**. ' +
                   'Ekranda *"kaydedildi"* yazar.\n\n' +
                   'Toplu yüklemede **hiç fark edilmez** — ' +
                   'bu yüzden ayrı bir kontroldür.',
          cikti:'Kayıp listesi', ok:'düzelt' },
        { ic:'♻️', rol:'Danışman', baslik:'Hatalıları düzelt ve yeniden işle',
          aciklama:'{{toplu-giris}} → {{SM35}} oturumunda **bekliyorlar**\n' +
                   '{{idoc}} → {{BD87}} ile tek tek\n' +
                   '{{bapi}} → **senin kurguna bağlı**',
          cikti:'Tam yükleme' },
      ],
    },

    adimlar:[
      { rol:'Kullanıcı', eylem:'Kaynak veriyi hazırlar', sistem:'Excel / CSV — kodlar **metin**' },
      { rol:'Danışman', eylem:'Üç soruyu sorar', sistem:'Tek seferlik? · BAPI? · **hatalılar?**' },
      { rol:'Danışman', eylem:'Yöntemi kurar', sistem:'{{SHDB}} / {{LSMW}} / {{WE20}}' },
      { rol:'Danışman', eylem:'Küçük kümeyle dener', sistem:'**Taranarak** seçilmiş 10–50 satır' },
      { rol:'Danışman', eylem:'Tam yükleme yapar', sistem:'Parçalara bölerek' },
      { rol:'Danışman', eylem:'Mutabakat yapar', sistem:'Adet **ve** tutar' },
      { rol:'Danışman', eylem:'Sessiz kayıp arar', sistem:'{{SM13}}' },
      { rol:'Danışman', eylem:'Hatalıları yeniden işler', sistem:'{{SM35}} / {{BD87}}' },
    ],

    veriAkisi:{
      nereden:'Excel / CSV / dış sistem mesajı.',
      nereye:'SAP ana veri veya hareket tabloları.',
      tetikleyen:'Elle çalıştırma veya zamanlanmış iş ({{SM37}}).',
      sonraki:'{{sayi-mutabakati}} → {{SM13}} kontrolü → hatalıları yeniden işleme.',
    },

    notlar:[
      { tip:'warn', baslik:'"Hatalı satırlarla ne olacak?" — yöntemi belirleyen soru', metin:
        'Yöntem karşılaştırmaları genelde **hız** üzerinden yapılır. ' +
        'Bu yanlış eksendir — çünkü hız farkı bir defalık bir maliyettir, ' +
        '**hata yönetimi ise her çalıştırmada** karşına çıkar.\n\n' +
        '---\n\n' +
        '**Üç yöntem, üç farklı cevap:**\n\n' +
        '**{{toplu-giris}}** ✓ Hatalı satırlar {{SM35}} oturumunda **bekler**. ' +
        'Sebep düzeltilir, oturum **yeniden işlenir**, başarılılar **tekrarlanmaz**. ' +
        'Tekrar çalıştırılabilirlik **hazır gelir**.\n\n' +
        '**{{bapi}}** Program **ne yaparsa o olur**. ' +
        'Hatalıları bir yere yazmazsan **kaybolurlar**. ' +
        'Baştan çalıştırırsan başarılılar **mükerrer** olur.\n\n' +
        '**{{idoc}}** ✓ Her mesaj **kendi statüsünü** tutar. ' +
        'Hatalılar sistemde **kalır** ve {{BD87}} ile tek tek yeniden işlenir. ' +
        '**En iyi izlenebilirlik.**\n\n' +
        '---\n\n' +
        '**Sonuç:** BAPI teknik olarak en temiz yöntemdir ' +
        '(hızlı, ekrandan bağımsız, doğrulamalar çalışır) — ' +
        'ama **tekrar çalıştırılabilirliği hazır getirmez**.\n\n' +
        'BAPI ile program yazılacaksa, **{{arayuz-tablosu}} deseni** ' +
        'baştan kurgulanmalıdır (bkz. teknik bölüm).' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Yükleme yöntemi muhasebe **kaydını** değiştirmez — ama ' +
      '**hata sonrası muhasebenin ne hâle geleceğini** belirler.\n\n' +
      'Aşağıdaki üç fiş, aynı yüklemenin üç farklı sonucunu gösteriyor.',

    etkilenenHesaplar:[
      { hesap:'Yüklenen hesaplar', tur:'Değişken', neden:'Normal kayıt — yöntemden **bağımsız**.' },
      { hesap:'Mükerrer kayıt', tur:'Risk', neden:'Yeniden çalıştırma korumasız ise **çift** yazılır.' },
      { hesap:'Eksik kayıt', tur:'Risk', neden:'{{guncelleme-hatasi}} — sessizce kaybolur.' },
      { hesap:'Geçiş / karşı hesap', tur:'Kontrol', neden:'Bakiyesi **sıfırlanmalı**.' },
    ],

    fisler:[
      { baslik:'① Doğru yükleme — 500 satırdan biri',
        belgeTuru:'SA', tarih:'15.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:24500 },
          { hesap:'399', ad:'Geçiş / karşı hesap', alacak:24500 },
        ],
        not:'Normal kayıt. Toplu yüklendiği anlaşılmaz — ' +
             '{{FB50}} ile elle atılsa **aynı** olurdu.\n\n' +
             'Tek fark {{BKPF}}.`TCODE` alanındadır: yükleme aracının ' +
             'kullandığı işlem kodu yazılıdır ve ' +
             'geçiş kayıtları bu alanla **süzülebilir**.\n\n' +
             'Bu yüzden geçiş için **ayrı bir {{belge-turu}}** de ' +
             'tanımlanır (bkz. {{konu:lsmw}}).' },

      { baslik:'② Mükerrer kayıt — yeniden çalıştırma koruması yoksa',
        belgeTuru:'SA', tarih:'15.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri (1. tur)', borc:24500 },
          { hesap:'770', ad:'Genel yönetim gideri (2. tur — **mükerrer**)', borc:24500 },
          { hesap:'399', ad:'Geçiş hesabı', alacak:49000 },
        ],
        not:'**Program yarıda kesildi ve baştan çalıştırıldı.** ' +
             'İlk turda başarılı olan satırlar **ikinci kez** yazıldı.\n\n' +
             'Sonuç: gider **iki katı**, mizan yanlış, ' +
             'düzeltmek için 500 kadar {{FB08}} gerekir.\n\n' +
             '---\n\n' +
             '**Bu, yöntem seçiminin muhasebe sonucudur:**\n\n' +
             '{{toplu-giris}} olsaydı **imkânsızdı** — oturum yalnızca ' +
             'işlenmemiş satırları tekrarlar.\n\n' +
             '{{bapi}} ile yazılan programda ise koruma **kurgulanmalıydı**: ' +
             '{{arayuz-tablosu}}’na "işlendi" damgası veya ' +
             'kaynak referansı ({{BKPF}}.`XBLNR`) üzerinden mükerrer kontrolü.' },

      { baslik:'③ Eksik kayıt — {{guncelleme-hatasi}}',
        belgeTuru:'SA', tarih:'15.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — **486 satır**', borc:11907000 },
          { hesap:'399', ad:'Geçiş hesabı', alacak:11907000 },
        ],
        not:'**500 satır gönderildi, 486’sı oluştu. 14’ü sessizce kayboldu.**\n\n' +
             'Ekranda *"işlem tamamlandı"* yazdı, hata mesajı **çıkmadı**.\n\n' +
             'Muhasebe açısından belge **denk** — sorun yok gibi görünüyor. ' +
             'Eksiklik yalnızca **kaynak dosyayla karşılaştırılınca** ortaya çıkar.\n\n' +
             '---\n\n' +
             '**İki kontrol bunu yakalar:**\n\n' +
             '**{{sayi-mutabakati}}** — 500 ≠ 486\n' +
             '**{{SM13}}** — 14 güncelleme hatası kaydı\n\n' +
             'Hiçbiri yapılmazsa eksiklik **fark edilmez** ve ' +
             'geçiş hesabı da sıfırlanmaz — ama bunu da kimse bakmazsa görmez.' },
    ],

    tHesaplar:[
      { hesap:'Geçiş hesabı — üç senaryo', kod:'399',
        borc:[{ ad:'Beklenen karşılık', tutar:12250000 }],
        alacak:[{ ad:'Gerçekleşen (486 satır)', tutar:11907000 }],
        not:'**343.000 fark** = 14 eksik satır. Sıfır değil → yükleme eksik' },
    ],

    notlar:[
      { tip:'warn', baslik:'Çok satırlı belgede LUW bütünlüğü', metin:
        'Tek satırlık kayıtlarda her satır bağımsızdır. ' +
        '**Çok satırlı belgelerde** (başlık + kalemler) durum farklıdır.\n\n' +
        '**Muhasebede yarım belge diye bir şey yoktur:** ' +
        'bir belge ya tamamen oluşur ya hiç oluşmaz. ' +
        'Yarım belge **dengesiz belgedir** ve SAP buna izin vermez.\n\n' +
        'Bu yüzden yükleme **belge bazlı** kurgulanmalıdır:\n\n' +
        '**Doğru:** her belge kendi işleminde — 3 kalemli fatura, ' +
        'tek {{bapi}} çağrısı, tek commit.\n\n' +
        '**Yanlış:** her satır ayrı işlemde — ' +
        'başlık yazılır, ikinci kalem çöker, belge **yarım kalır**.\n\n' +
        '---\n\n' +
        'Pratik sonucu **kaynak dosya tasarımını** etkiler: ' +
        'çok satırlı veri için dosyada bir **belge anahtarı** sütunu olmalı ' +
        've yükleme bu anahtara göre **gruplamalıdır**.\n\n' +
        '{{konu:lsmw}}’de bu, kaynak yapı tanımında ' +
        '**başlık–kalem ilişkisi** olarak kurulur.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Dört yöntem var ve her biri **farklı bir soruya** iyi cevap veriyor. ' +
      '*"Hangisi en iyi?"* sorusunun cevabı yok; ' +
      '*"hangi durumda hangisi?"* sorusunun cevabı var.\n\n' +
      '---\n\n' +
      '**Üç soruyla karar:**\n\n' +
      '**1. Tek seferlik mi, sürekli mi?**\n' +
      'Tek seferlik → {{toplu-giris}} veya {{bapi}}\n' +
      'Sürekli/otomatik → **{{idoc}}**\n\n' +
      '**2. Standart nesne veya BAPI var mı?**\n' +
      'Varsa → **kullan**\n' +
      'Yoksa → {{kayit-recording}}\n\n' +
      '**3. Hatalı satırlarla ne olacak?**\n' +
      'Hazır çözüm isteniyorsa → **{{toplu-giris}}** veya **{{idoc}}**\n' +
      'BAPI seçilecekse → **{{arayuz-tablosu}} deseni kurgulanmalı**',

    liste:[
      { ad:'Yöntem · {{toplu-giris}} (Batch Input / BDC)', en:'Batch Input',
        aciklama:'Ekran akışının **program tarafından** oynatılması. ' +
                 'Kullanıcı ne yapıyorsa sistem aynısını yapar.',
        neZaman:'Standart nesne ve BAPI yoksa; özel (`Z*`) işlemlerde.',
        ornek:'**En büyük avantajı: tekrar çalıştırılabilirlik hazır gelir.**\n\n' +
              'Hatalı satırlar {{SM35}} oturumunda **bekler**; ' +
              'sebep düzeltilince **yeniden işlenir** ve ' +
              'başarılı satırlar **tekrarlanmaz**.\n\n' +
              'Ayrıca **tüm ekran doğrulamaları çalışır** — ' +
              'veri bütünlüğü ekrandaki kadar korunur.\n\n' +
              '**Dezavantajları:**\n' +
              '• **Yavaş** — her satır için tüm ekran akışı işlenir\n' +
              '• **Kırılgan** — ekran değişirse bozulur\n' +
              '• Koşullu ekranlar **tuzak** (bkz. {{konu:lsmw}})',
        tcodes:['SHDB','SM35'] },

      { ad:'Yöntem · {{bapi}}', en:'BAPI',
        aciklama:'İş nesnesine **ekrandan bağımsız** fonksiyon çağrısı.',
        neZaman:'BAPI varsa ve program yazılacaksa **ilk tercih**.',
        ornek:'**Avantajları:**\n\n' +
              '• **Hızlı** — ekran akışı yok\n' +
              '• Ekran değişikliğinden **etkilenmez**\n' +
              '• **İş doğrulamaları çalışır** — veri bütünlüğü korunur\n' +
              '• Hata mesajı **yapılandırılmış** (return tablosu) — teşhis kolay\n\n' +
              '**İki kritik tuzak:**\n\n' +
              '**1.** `BAPI_TRANSACTION_COMMIT` çağrılmazsa kayıt **yazılmaz** — ' +
              've BAPI yine *"başarılı"* döner.\n\n' +
              '**2.** **Tekrar çalıştırılabilirlik hazır gelmez.** ' +
              'Hatalıları saklamak ve mükerrer kaydı önlemek **senin işindir** — ' +
              '{{arayuz-tablosu}} deseni gerekir.',
        tcodes:['SE37'] },

      { ad:'Yöntem · {{idoc}}', en:'IDoc',
        aciklama:'Mesaj tabanlı aktarım. Her mesaj **kendi statüsünü** taşır.',
        neZaman:'**Sürekli** veri akışı ve dış sistem entegrasyonunda.',
        ornek:'**En iyi izlenebilirlik.** Her IDoc:\n' +
              '• Kendi **statüsünü** tutar ({{WE02}})\n' +
              '• Hata sebebini **saklar**\n' +
              '• {{BD87}} ile **tek tek** yeniden işlenebilir\n' +
              '• Arşivlenebilir — **denetim izi** kalır\n\n' +
              '**Dezavantajı: kurulumu ağır.** ' +
              'Partner profili ({{WE20}}), mesaj tipi, port tanımı gerekir.\n\n' +
              'Tek seferlik 3.000 satırlık bir yükleme için **fazla ağırdır**; ' +
              'ama her gece çalışan bir arayüz için **doğru araçtır**.\n\n' +
              '**En sık hata:** partner profili yoksa IDoc ' +
              '**statü 56** ile reddedilir — *"IDoc geldi ama işlenmedi"*.',
        tcodes:['WE02','WE20','BD87'] },

      { ad:'Yöntem · Standart nesne / Migration Cockpit', en:'Standard Object',
        aciklama:'SAP’ın hazır tanımladığı aktarım nesneleri.',
        neZaman:'**Varsa her zaman** — özellikle S/4HANA’da.',
        ornek:'**Avantajı:** bakımı **SAP yapar**. Alan listesi hazır, ' +
              'doğrulamalar çalışır, sürüm değişiminde bozulmaz.\n\n' +
              'S/4HANA’da **Migration Cockpit** ({{LTMC}}) ile gelir: ' +
              'önceden eşli **Excel şablonu** ve ' +
              '**yükleme öncesi simülasyon**.\n\n' +
              'Simülasyon önemli bir farktır: diğer yöntemlerde ' +
              'hatayı **yükleme sırasında** görürsün, ' +
              'burada **öncesinde** (bkz. {{konu:migration}}).',
        tcodes:['LTMC'] },

      /* --- Kaynak veri --- */
      { ad:'Kaynak · Excel ve CSV — üç klasik tuzak', en:'Source File Traps',
        aciklama:'Dosya biçiminden doğan, **yüklemeden bağımsız** hatalar.',
        neZaman:'Her yüklemede.',
        ornek:'**1. Baştaki sıfırlar.** Excel `0000320100` değerini sayı sanıp ' +
              '`320100` yapar. Yükleme *"hesap bulunamadı"* der.\n' +
              '→ Sütunu **metin** biçiminde tut.\n\n' +
              '**2. Ondalık ayracı.** `1.234,56` ile `1,234.56` karışır. ' +
              'Tutarlar **1000 kat** yanlış olur.\n' +
              '→ **Tutar mutabakatı bunu yakalar**, adet mutabakatı yakalamaz.\n\n' +
              '**3. Tarih biçimi.** SAP iç biçimi `YYYYMMDD`.\n\n' +
              '**Bonus:** Excel’de görünmeyen boşluklar ve satır sonu karakterleri ' +
              'alan uzunluğunu taşırır.\n\n' +
              '**Genel önlem:** kaynağı Excel yerine **CSV olarak üret** ' +
              've bir metin düzenleyicide **gözle kontrol et**.' },

      { ad:'Desen · {{arayuz-tablosu}} — BAPI için zorunlu', en:'Staging Table',
        aciklama:'Veriyi doğrudan yazmak yerine önce bir **ara tabloya** almak.',
        neZaman:'{{bapi}} ile program yazılacak **her** durumda.',
        ornek:'**Neden gerekli:** BAPI tekrar çalıştırılabilirlik **getirmez**. ' +
              'Ara tablo bunu **sen kurgularsın** demenin pratik hâlidir.\n\n' +
              '**Desen üç adımlı:**\n\n' +
              '**1.** Kaynak veri ara tabloya yazılır — ham hâliyle\n' +
              '**2.** Program ara tablodan okur, BAPI çağırır, ' +
              'sonucu **satır bazında damgalar** (başarılı / hatalı + mesaj)\n' +
              '**3.** Yeniden çalıştırmada **yalnızca damgalanmamış** satırlar işlenir\n\n' +
              '**Kazanımlar:**\n' +
              '• Mükerrer kayıt **imkânsız**\n' +
              '• Hatalı satırlar ve sebepleri **saklı**\n' +
              '• {{sayi-mutabakati}} **tablodan** yapılabilir\n' +
              '• Denetim izi kalır\n\n' +
              'Bu desen, {{toplu-giris}}’in hazır verdiği şeyi ' +
              'BAPI için **elle inşa etmektir**.' },
    ],

    karsilastirmaBasliklar:['{{toplu-giris}}', '{{bapi}}', '{{idoc}}'],
    karsilastirma:[
      ['Hız', 'Yavaş — ekran akışı', '**Hızlı**', 'Orta'],
      ['Ekran değişikliği', '**Bozulur**', 'Etkilenmez', 'Etkilenmez'],
      ['Doğrulamalar', 'Ekran doğrulamaları', '**İş mantığı**', 'İş mantığı'],
      ['Hata mesajı', 'Ekran diliyle', '**Yapılandırılmış**', 'Statü + metin'],
      ['Hatalı satırlar', '**Oturumda bekler**', '**Senin kurgun**', 'Sistemde kalır'],
      ['Tekrar çalıştırma', '**Hazır gelir**', '{{arayuz-tablosu}} gerekir', '{{BD87}}'],
      ['Mükerrer riski', 'Yok', '**Var** — korumasızsa', 'Yok'],
      ['Kurulum yükü', 'Orta', 'Program yazımı', '**Ağır** — {{WE20}}'],
      ['Denetim izi', 'Oturum (silinebilir)', 'Kurguna bağlı', '**En iyi**'],
      ['Uygun olduğu durum', 'Tek seferlik · BAPI yok', 'Program · yüksek hacim', '**Sürekli arayüz**'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'SM35', ad:'Toplu giriş kuyruğu — hatalılar burada bekler',
        amac:'Oturumları çalıştırır, izler ve **hatalı satırları saklar**.',
        neZaman:'Her {{toplu-giris}} yüklemesinden sonra.',
        adimlar:[
          { baslik:'Oturumu seç' },
          { baslik:'İlk tur **görüntülemeli** modda',
            aciklama:'Ekran ekran izlenir; nerede takıldığı **görülür**.' },
          { baslik:'Sonraki turlar arka planda' },
          { baslik:'**Hatalı** oturumu aç — kalan satırlar orada' },
          { baslik:'Sebebi düzelt ve **yeniden işle**',
            aciklama:'Başarılı satırlar **tekrarlanmaz**.' },
        ],
        ekranAkisi:[
          { ekran:'Oturum', islem:'3.000 satır · durum **Hatalı**' },
          { ekran:'Detay', islem:'2.847 işlendi · **153 hatalı**' },
          { ekran:'Hata', islem:'*"Maliyet yeri 4711 mevcut değil"*' },
          { ekran:'Çözüm', islem:'{{KS01}} ile açıldı → 153 satır **yeniden işlendi** ✓' },
        ],
        alanlar:{ zorunlu:['Oturum adı'], opsiyonel:['Durum','Kullanıcı','Tarih'] },
        hatalar:[
          { mesaj:'Oturum "hatalı" — satırlar kayboldu mu?', sebep:'Bazı satırlar işlenememiş.', cozum:'**Kaybolmadılar.** Oturumda beklerler; sebep düzeltilip yeniden işlenir.' },
          { mesaj:'Yeniden işlersem mükerrer olur mu?', sebep:'Endişe.', cozum:'Hayır — {{toplu-giris}} yalnızca **işlenmemiş** satırları tekrarlar.' },
          { mesaj:'Oturum kayboldu', sebep:'Başarılı oturumlar ayara göre **silinir**.', cozum:'Geçiş projelerinde saklama açık olmalı — **denetim izi**.' },
          { mesaj:'Oturum "işleniyor"da takılı', sebep:'Çalıştıran oturum çökmüş.', cozum:'{{SM37}}’de iş durumunu kontrol et; Basis ile kilit çözülür.' },
        ],
        ipucu:'**{{toplu-giris}}’in en değerli özelliği: hatalı satırlar kaybolmaz.**\n\n' +
              'Bu, {{bapi}} ile yazılan bir programa göre **gerçek bir avantajdır** — ' +
              'orada aynı davranışı {{arayuz-tablosu}} deseniyle ' +
              '**elle inşa etmen** gerekir.\n\n' +
              'Ama yeterli değildir: {{guncelleme-hatasi}} oturumda ' +
              '**hata olarak görünmeyebilir**. ' +
              'Bu yüzden {{SM13}} ve {{sayi-mutabakati}} **ayrıca** yapılır.',
        ilgili:['SHDB','SM13','LSMW'] },

      { kod:'SM13', ad:'Güncelleme hataları — sessiz kayıpların adresi',
        amac:'Numara verilip **belge oluşmayan** kayıtları gösterir.',
        neZaman:'**Her toplu yüklemeden sonra** — zorunlu adım.',
        adimlar:[
          { baslik:'Kullanıcı, tarih ve durum **Err** ile süz' },
          { baslik:'Kayda çift tıkla — modül ve hata mesajı' },
          { baslik:'Kök sebebi oku',
            aciklama:'Genelde {{kilitleme}} çakışması, alan taşması veya özel kod hatası.' },
          { baslik:'Kaç satır etkilendi — **kapsamı ölç**' },
        ],
        ekranAkisi:[
          { ekran:'Yükleme', islem:'500 satır gönderildi · ekran *"tamamlandı"*' },
          { ekran:'Mutabakat', islem:'{{BKPF}}’te **486** belge — 14 eksik' },
          { ekran:'{{SM13}}', islem:'Durum **Err** · **14 kayıt**' },
          { ekran:'Sebep', islem:'Kilit çakışması — paralel oturumlar aynı satıcıya dokunmuş' },
        ],
        alanlar:{ zorunlu:['Kullanıcı','Tarih'], opsiyonel:['Durum','İstemci'] },
        hatalar:[
          { mesaj:'{{SM13}} boş görünüyor', sebep:'Saklama süresi dolmuş veya tarih aralığı dar.', cozum:'Aralığı genişlet. Çok eskiyse iz kalmamış olabilir — **bu yüzden hemen bakılır**.' },
          { mesaj:'Numaralarda boşluk var', sebep:'Numara diyalogda verilir, güncellemede yazılır.', cozum:'Normaldir ama **açıklanabilir** olmalı. {{SM13}} kayıtları bu boşlukların kanıtıdır.' },
        ],
        ipucu:'**Bu adım toplu yüklemede zorunludur** çünkü ' +
              '{{guncelleme-hatasi}} **tek kayıtta nadir, toplu yüklemede sıktır**.\n\n' +
              'Sebebi: toplu yükleme çok sayıda paralel güncelleme görevi üretir ve ' +
              '{{kilitleme}} çakışması olasılığı **artar**.\n\n' +
              'Ve kullanıcı fark **edemez**: ekranda başarı mesajı görünür, ' +
              'belge yoktur. 500 kayıtta 14 kaybın tek kanıtı ' +
              '{{sayi-mutabakati}} ve bu ekrandır.',
        ilgili:['SM35','SM21','SM12'] },

      { kod:'WE02', ad:'IDoc listesi — statü bazlı izleme',
        amac:'Gelen ve giden IDoc’ları statüleriyle listeler.',
        neZaman:'{{idoc}} tabanlı arayüzlerde; **günlük** kontrol.',
        adimlar:[
          { baslik:'Tarih, mesaj tipi ve **yön** ile süz' },
          { baslik:'Statüye göre grupla',
            aciklama:'**Gelen:** 53 başarılı · **51 hata** · **56 partner profili yok**\n' +
                     '**Giden:** 03 gönderildi · 02 hata' },
          { baslik:'Hatalı IDoc’a çift tıkla — segment ve mesaj görünür' },
          { baslik:'Sebep düzeltilir → {{BD87}} ile **yeniden işlenir**' },
        ],
        ekranAkisi:[
          { ekran:'Şikâyet', islem:'*"Dün gece dosya geldi ama kayıt yok"*' },
          { ekran:'{{WE02}}', islem:'340 IDoc · **312 statü 53** ✓ · **28 statü 51** ' },
          { ekran:'Hata', islem:'*"Vergi kodu K1 mevcut değil"*' },
          { ekran:'Çözüm', islem:'{{FTXP}}’de tanımlandı → {{BD87}} → 28 IDoc **yeniden** ✓' },
        ],
        alanlar:{ zorunlu:['Tarih'], opsiyonel:['Mesaj tipi','Statü','Partner','Yön'] },
        hatalar:[
          { mesaj:'IDoc geldi ama işlenmedi — **statü 56**', sebep:'Partner profili yok.', cozum:'{{WE20}}’de partner ve mesaj tipi tanımlanır. **En sık IDoc hatası.**' },
          { mesaj:'Statü 51 — uygulama hatası', sebep:'Veri hatası: eksik ana veri, geçersiz kod.', cozum:'Sebebi düzelt, {{BD87}} ile yeniden işle. **IDoc kaybolmaz.**' },
          { mesaj:'Statü 64 — işlenmeyi bekliyor', sebep:'Arka plan işi çalışmamış.', cozum:'{{SM37}}’de işi kontrol et; {{BD87}} ile elle tetikle.' },
        ],
        ipucu:'**IDoc’un en büyük avantajı: hiçbir mesaj kaybolmaz.**\n\n' +
              'Başarısız IDoc sistemde **kalır**, statüsünü ve hata sebebini ' +
              '**taşır** ve {{BD87}} ile tek tek yeniden işlenebilir.\n\n' +
              'Bu, sürekli arayüzlerde {{bapi}}’ye göre gerçek bir üstünlüktür: ' +
              'BAPI ile yazılan bir arayüzde başarısız mesajı **sen saklamalısın**.\n\n' +
              'Bedeli kurulum yüküdür — tek seferlik yükleme için **fazla ağır**.',
        ilgili:['WE20','BD87','SM37'] },

      { kod:'SE37', ad:'BAPI testi — commit tuzağı burada görülür',
        amac:'Fonksiyon modülünü **tek kayıtla** test eder.',
        neZaman:'BAPI ile program yazmadan önce; alan yapısını anlamak için.',
        adimlar:[
          { baslik:'BAPI adını gir, **Test/Çalıştır**' },
          { baslik:'Giriş yapılarını doldur' },
          { baslik:'Çalıştır ve **`RETURN` tablosunu** oku',
            aciklama:'Tip `E` hata · `W` uyarı · `S` başarı.' },
          { baslik:'**`BAPI_TRANSACTION_COMMIT` ayrıca çağır**',
            aciklama:'Yoksa kayıt **yazılmaz** — ve BAPI *"başarılı"* döner.' },
        ],
        ekranAkisi:[
          { ekran:'Test', islem:'BAPI çalıştı · `RETURN` **boş** · belge numarası **döndü**' },
          { ekran:'Kontrol', islem:'{{FB03}} → **belge yok**' },
          { ekran:'Sebep', islem:'`BAPI_TRANSACTION_COMMIT` çağrılmadı' },
          { ekran:'Ders', islem:'*"Başarılı döndü"* ≠ *"kayıt yazıldı"*' },
        ],
        alanlar:{ zorunlu:['Fonksiyon modülü adı'], opsiyonel:['Giriş yapıları','Tablo parametreleri'] },
        hatalar:[
          { mesaj:'BAPI başarılı ama kayıt yok', sebep:'Commit çağrılmamış.', cozum:'`BAPI_TRANSACTION_COMMIT` eklenir. **BAPI’nin en sık atlanan kuralı.**' },
          { mesaj:'`RETURN` tablosunda tip E mesajlar', sebep:'İş doğrulaması başarısız.', cozum:'Mesaj **anlamlıdır** — ekran hatalarından teşhisi kolaydır. Bu BAPI’nin avantajıdır.' },
          { mesaj:'Zorunlu alan hatası', sebep:'Giriş yapısı eksik.', cozum:'BAPI belgelemesine bak; genelde bir "X" yapısı hangi alanların dolu sayılacağını belirler.' },
        ],
        ipucu:'**Commit tuzağı BAPI’nin en pahalı sürprizidir** ' +
              'çünkü **sessizdir**: BAPI başarı döner, belge numarası verir, ' +
              'veritabanında **hiçbir şey yoktur**.\n\n' +
              'Toplu yüklemede fark edilmez — tüm çalıştırma *"başarılı"* görünür ' +
              've **hiçbir kayıt oluşmaz**.\n\n' +
              'Bu, {{sayi-mutabakati}}’nın neden zorunlu olduğunun ' +
              'en net örneğidir: mutabakat olmadan bu hata ' +
              '**hiç fark edilmez**.',
        ilgili:['WE02','SM13'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Yüklemede üç tablo grubu önemlidir: **hedef** (verinin gittiği yer), ' +
      '**izleme** (ne oldu) ve **ara tablo** (BAPI deseninde).',

    liste:[
      { ad:'BKPF', baslik:'Mutabakatın sayıldığı yer',
        tutar:'Belge başlıkları — **oluşan belge sayısı buradan sayılır**.',
        olusturan:'Yükleme',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'Kalemler {{BSEG}} / {{ACDOCA}}.',
        s4:'Kalemler {{ACDOCA}}’da.',
        alanlar:[
          { ad:'TCODE', aciklama:'Yükleme aracının işlemi — **geçiş kayıtları süzülür**' },
          { ad:'BLART', aciklama:'Ayrı {{belge-turu}} tanımlanmışsa buradan ayırt edilir' },
          { ad:'XBLNR', aciklama:'**Kaynak referansı** — mükerrer kontrolünde kullanılır' },
          { ad:'CPUDT', aciklama:'Giriş tarihi — yükleme günü' },
        ] },

      { ad:'EDIDC', baslik:'IDoc kontrol kaydı — statünün tutulduğu yer',
        tutar:'Her IDoc’un başlığı ve **statüsü**.',
        olusturan:'IDoc alımı veya üretimi',
        anahtar:'DOCNUM',
        iliskiler:'Veri segmentleri `EDID4`; statü geçmişi `EDIDS`.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'DOCNUM', aciklama:'IDoc numarası', tip:'pk' },
          { ad:'STATUS', aciklama:'**Statü** — 53 başarılı · 51 hata · **56 partner profili yok**' },
          { ad:'MESTYP', aciklama:'Mesaj tipi' },
          { ad:'SNDPRN / RCVPRN', aciklama:'Gönderen / alan partner — {{WE20}} ile eşleşmeli' },
        ] },

      { ad:'BALHDR', baslik:'Yükleme günlüğü',
        tutar:'Toplu programların ürettiği günlük başlıkları.',
        olusturan:'Günlük yazan yükleme programları',
        anahtar:'LOGNUMBER',
        iliskiler:'{{SLG1}} bu tabloyu okur.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'PROBCLASS', aciklama:'En yüksek mesaj sınıfı — **kırmızı var mı?**' },
          { ad:'ALDATE / ALUSER', aciklama:'Ne zaman, kim' },
        ] },

      { ad:'LFA1', baslik:'Tipik hedef — ana veri',
        tutar:'Satıcı genel verisi.',
        olusturan:'Ana veri yüklemesi',
        anahtar:'LIFNR',
        iliskiler:'Şirket kodu verisi {{LFB1}}’de — **ayrı yükleme**.',
        s4:'{{BP}} ile yönetilir.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Satıcı numarası — iç mi dış mı numaralama?' },
          { ad:'ERDAT', aciklama:'Oluşturma tarihi — **yükleme sayımında** kullanılır' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Yükleme izleme — üç bağımsız kanıt kaynağı',
      varliklar:[
        { ad:'BKPF', rol:'Sonuç', hub:true, aciklama:'**Oluşan belgeler** — mutabakat buradan',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'TCODE' }, { ad:'XBLNR' }] },
        { ad:'BALHDR', rol:'Günlük', aciklama:'Program **ne dedi**',
          alanlar:[{ ad:'LOGNUMBER', tip:'pk' }, { ad:'PROBCLASS' }] },
        { ad:'EDIDC', rol:'IDoc', aciklama:'Mesaj **statüsü** — kaybolmaz',
          alanlar:[{ ad:'DOCNUM', tip:'pk' }, { ad:'STATUS' }, { ad:'MESTYP' }] },
        { ad:'LFA1', rol:'Ana veri', aciklama:'Tipik hedef tablo',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'ERDAT' }] },
      ],
      iliskiler:[
        { from:'BALHDR', to:'BKPF', alanlar:'—', not:'program → **ürettiği belgeler**' },
        { from:'EDIDC', to:'BKPF', alanlar:'—', not:'IDoc → belge' },
        { from:'BKPF', to:'LFA1', alanlar:'—', not:'ana veri **önce** yüklenmeli' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Yükleme sonrası **üç ekran** kontrol edilir ve üçü **farklı şey** söyler: ' +
      '{{SM35}} (oturum), {{SM13}} (sessiz kayıp), {{SLG1}} (program günlüğü).',

    ekranlar:[
      { ad:'{{SM35}} — oturum ve hatalı satırlar',
        aciklama:'{{toplu-giris}} sonrası.',
        alanlar:[
          { ad:'Çalıştırma modu', zorunlu:true, aciklama:'İlk tur **görüntülemeli**.' },
          { ad:'Durum', zorunlu:false, aciklama:'**Hatalı** oturumda kalan satırlar bekler.' },
          { ad:'Yeniden işle', zorunlu:false, aciklama:'Başarılılar **tekrarlanmaz**.' },
        ],
        ipucu:'Hatalı satırların beklemesi bu yöntemin ' +
              '**en değerli özelliğidir** — ama {{guncelleme-hatasi}}’nı **göstermez**.' },

      { ad:'{{SM13}} — sessiz kayıplar',
        aciklama:'Toplu yüklemede **zorunlu** kontrol.',
        alanlar:[
          { ad:'Durum **Err**', zorunlu:true, aciklama:'Numara verilmiş, belge **yazılmamış**.' },
          { ad:'Kullanıcı ve tarih', zorunlu:true, aciklama:'Yükleme penceresi.' },
        ],
        ipucu:'**Tek kayıtta nadir, toplu yüklemede sıktır** — ' +
              'paralel güncelleme görevleri {{kilitleme}} çakışması yaratır.\n\n' +
              'Kullanıcı fark edemez: ekranda başarı mesajı var, belge yok.' },

      { ad:'{{SLG1}} — program ne dedi',
        aciklama:'Yükleme programının satır bazında günlüğü.',
        alanlar:[
          { ad:'Nesne / alt nesne', zorunlu:true, aciklama:'Hangi programın günlüğü.' },
          { ad:'Mesaj sınıfı', zorunlu:false, aciklama:'Önce **kırmızı**.' },
        ],
        ipucu:'{{SM37}} *"program çöktü mü?"*, {{SLG1}} *"iş doğru yapıldı mı?"* ' +
              'sorusunu cevaplar (bkz. {{konu:error-handling}}).' },
    ],

    zorunlu:['Kaynak veri','Yöntem seçimi','{{sayi-mutabakati}}'],
    opsiyonel:['Parçalara bölme','Paralel çalıştırma','{{arayuz-tablosu}}'],

    hatalar:[
      { mesaj:'Ekran "tamamlandı" dedi ama kayıt sayısı eksik', sebep:'{{guncelleme-hatasi}}.', cozum:'{{sayi-mutabakati}} + {{SM13}}. **Toplu yüklemede zorunlu adım.**' },
      { mesaj:'BAPI başarılı döndü, belge yok', sebep:'`BAPI_TRANSACTION_COMMIT` çağrılmamış.', cozum:'Commit eklenir. Sessiz olduğu için **mutabakat olmadan fark edilmez**.' },
      { mesaj:'Aynı kayıt iki kez oluştu', sebep:'Program yeniden çalıştırılmış, koruma yok.', cozum:'{{arayuz-tablosu}} deseni veya `XBLNR` üzerinden mükerrer kontrolü. {{toplu-giris}}’te bu sorun **yoktur**.' },
      { mesaj:'Tutarlar 1000 kat yanlış', sebep:'Ondalık ayracı karışmış.', cozum:'**Tutar mutabakatı** yakalar; adet mutabakatı yakalamaz.' },
      { mesaj:'IDoc geldi ama işlenmedi — statü **56**', sebep:'Partner profili yok.', cozum:'{{WE20}}. **En sık IDoc hatası.**' },
      { mesaj:'IDoc statü 51 — uygulama hatası', sebep:'Veri hatası.', cozum:'Sebebi düzelt, {{BD87}} ile yeniden işle. IDoc **kaybolmaz**.' },
      { mesaj:'Paralel yüklemede kilit hataları', sebep:'{{kilitleme}} — aynı ana veriye iki oturum.', cozum:'Parçaları **aynı nesneye dokunmayacak** şekilde böl.' },
      { mesaj:'Belge yarım oluşmuş', sebep:'Satır bazlı işlem — LUW bütünlüğü yok.', cozum:'Çok satırlı belgede **belge bazlı** işlem: tamamı veya hiçbiri.' },
      { mesaj:'Hesap/satıcı bulunamıyor', sebep:'Sola sıfır dolgu — Excel sıfırları atmış.', cozum:'Sütunu **metin** biçiminde tut ({{konu:lsmw}}).' },
    ],

    ipuclari:[
      '**Üç soru:** tek seferlik mi · BAPI var mı · **hatalı satırlarla ne olacak?**',
      '{{sayi-mutabakati}} **iki seviyeli**: adet **ve** tutar. ' +
      'Adet tutup tutar tutmuyorsa {{donusum-kurali}} hatası.',
      'Toplu yükleme sonrası **{{SM13}} zorunlu** — sessiz kayıplar orada.',
      'BAPI ile program yazacaksan **{{arayuz-tablosu}} desenini baştan kurgula**.',
      'Çok satırlı belgede **belge bazlı** işlem — yarım belge olmaz.',
      'Deneme kümesini **tarayarak** seç; her ayrık değerden bir örnek.',
      'Paralel parçaları **aynı ana veriye dokunmayacak** şekilde böl.',
      'Kaynağı Excel yerine **CSV üret** ve metin düzenleyicide gözle kontrol et.',
      'Sürekli arayüzde {{idoc}} — kurulumu ağır ama **hiçbir mesaj kaybolmaz**.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Oluşan belgeler — **mutabakat buradan sayılır**' },
      { tablo:'EDIDC', ne:'IDoc statüsü — kaybolmaz' },
      { tablo:'BALHDR', ne:'Program günlüğü' },
      { tablo:'LFA1', ne:'Tipik ana veri hedefi' },
    ],

    commit:
      '**Commit davranışı yöntemler arasındaki en önemli teknik farktır** ' +
      've hata sonrası ne olacağını **doğrudan belirler**:\n\n' +
      '**{{toplu-giris}}** — her işlem **kendi LUW’unda**. ' +
      'Bir satır çökerse diğerleri etkilenmez; ' +
      'hatalı satır **oturumda kalır** ve yeniden işlenebilir.\n\n' +
      '**{{bapi}}** — commit **açıkça çağrılır**. ' +
      '`BAPI_TRANSACTION_COMMIT` yoksa kayıt **yazılmaz** ' +
      've BAPI yine *"başarılı"* döner. ' +
      'Ne zaman commit edileceği **programın kararıdır**: ' +
      'her kayıtta mı, her 100 kayıtta mı, sonda mı?\n\n' +
      '**{{idoc}}** — her IDoc ayrı LUW; statü **tabloda** tutulur.\n\n' +
      '---\n\n' +
      '**Commit sıklığı bir denge kararıdır:**\n\n' +
      '**Her kayıtta commit** → yavaş ama **güvenli**; hata tek kaydı etkiler\n' +
      '**Toplu commit (her 1000’de)** → hızlı ama **çökerse 1000 kayıt gider**\n\n' +
      'Veri geçişinde genelde **güvenlik tercih edilir** — ' +
      'bir kez çalışacak bir iş için hız ikincildir.',

    belgeNo:
      '**Numara diyalog aşamasında verilir, kayıt güncelleme görevinde yazılır.**\n\n' +
      'Bu ayrım {{guncelleme-hatasi}}’nın temelidir ve üç sonucu vardır:\n\n' +
      '• Güncelleme çökerse numara **yanar** — o numarada belge olmaz\n' +
      '• Numara aralığında **boşluk** oluşur (normaldir ama açıklanabilir olmalı)\n' +
      '• Kullanıcı **başarı mesajını görür** — belge yoktur\n\n' +
      '**Toplu yüklemede bu risk artar** çünkü çok sayıda paralel ' +
      'güncelleme görevi çalışır ve {{kilitleme}} çakışması olasılığı yükselir.\n\n' +
      'Bu, {{sayi-mutabakati}}’nın **teknik gerekçesidir**.',

    postingLogic:
      'Toplu yüklemede kontroller **her satır için ayrı ayrı** çalışır — ' +
      'elle girişteki sırayla aynı:\n\n' +
      '**1.** Yetki · **2.** {{alan-durumu}} · **3.** Ana veri · ' +
      '**4.** Dönem · **5.** {{konu:dogrulama-ikame}} · **6.** Denklik · ' +
      '**7.** Hesap belirleme · **8.** Numara · **9.** **Güncelleme (asenkron)**\n\n' +
      '**İki önemli sonuç:**\n\n' +
      '**Doğrulama kuralları toplu yüklemede de çalışır.** ' +
      'Bir {{konu:dogrulama-ikame}} kuralı elle girişi engelliyorsa ' +
      'toplu yüklemeyi de engeller.\n\n' +
      '**İstisna:** {{GGB4}} etkinlik seviyesi **2** ise kural ' +
      '*"toplu giriş hariç"* çalışır — yani yükleme **kuralı atlar**. ' +
      'Bu, veri geçişinde bilinçli kullanılabilir ama ' +
      '**kalıcı bırakılırsa açık kapıdır**.',

    belgeTuru:
      'Yükleme için **ayrı {{belge-turu}}** tanımlanması önerilir ' +
      '(bkz. {{konu:lsmw}}).\n\n' +
      'Faydası: {{BKPF}}.`BLART` ile toplu yüklenen kayıtlar **süzülebilir** ' +
      've gerekirse `F_BKPF_BLA` yetkisiyle **ayrı kontrol** edilir.\n\n' +
      'Ayrıca `XBLNR` (referans) alanına **kaynak kayıt anahtarı** yazılır — ' +
      'bu, mükerrer kontrolünün en pratik yoludur: ' +
      'yükleme öncesi o referansın zaten var olup olmadığına bakılır.',

    numberRange:
      'Toplu yükleme numara aralığını **hızla tüketir**. ' +
      '{{FBN1}} ile aralığın **yeterli olduğu** kontrol edilir.\n\n' +
      'Aralık dolduğunda yükleme **ortasında** durur ve ' +
      'yarısı yüklenmiş bir küme kalır — ' +
      'bu, yeniden çalıştırılabilirliğin **en çok işe yaradığı** andır.\n\n' +
      'Ayrıca yıl bazlı aralıklarda **hedef mali yıl** kontrol edilir: ' +
      'geçiş kayıtları genelde **önceki yıla** atılır.',

    accountDetermination:
      'Toplu yüklemede hesap belirleme **normal çalışır** — ' +
      'ama hata **çarpan etkisiyle** gelir.\n\n' +
      'Bir vergi kodunun {{OB40}} ataması eksikse elle girişte ' +
      '**bir kullanıcı** hata alır. Toplu yüklemede ' +
      'o vergi kodunu kullanan **tüm satırlar** başarısız olur.\n\n' +
      'Bu yüzden deneme çalıştırması **her ayrık değeri** içermelidir: ' +
      'her vergi kodu, her hesap grubu, her ödeme yöntemi. ' +
      'Rastgele 50 satır bunu **garanti etmez** ' +
      '(bkz. {{konu:lsmw}} senaryosu).',

    tur:
      'Dört yöntemin teknik özeti:\n\n' +
      '**{{toplu-giris}}** — ekran akışını **oynatır**. ' +
      'Ekran doğrulamaları çalışır, yavaş, ekrana bağımlı, ' +
      '**tekrar çalıştırılabilirlik hazır**.\n\n' +
      '**{{bapi}}** — fonksiyon çağrısı. ' +
      'Hızlı, ekrandan bağımsız, hata mesajı **yapılandırılmış**, ' +
      '**commit ve tekrar çalıştırma senin işin**.\n\n' +
      '**{{idoc}}** — mesaj. ' +
      'Statü tabloda, **hiçbir mesaj kaybolmaz**, kurulum ağır.\n\n' +
      '**Standart nesne** — SAP’ın hazır aracı. ' +
      'Bakımı SAP’ta, S/4HANA’da **simülasyon** imkânı.',

    transport:
      'Yükleme programları normal {{tasima-istegi}} ile taşınır.\n\n' +
      '**Ama taşınmayan üç şey vardır:**\n\n' +
      '**1. LSMW projesi** — kendi dışa/içe aktarma mekanizması var.\n' +
      '**2. Kaynak veri dosyası** — hedef sistemin sunucusuna ({{AL11}}) ' +
      'veya yerel diske ayrıca konur.\n' +
      '**3. {{WE20}} partner profilleri** — sistem bazlı ayarlardır ve ' +
      'genelde **elle** kurulur; taşıma sonrası IDoc’lar ' +
      '**statü 56** ile reddedilirse ilk bakılacak yer burasıdır.',

    img:[
      { yol:'WE20 → Partner profilleri', not:'IDoc statü 56’nın kaynağı; sistem bazlı' },
      { yol:'SM35 → Toplu giriş → Saklama ayarı', not:'Geçiş projelerinde oturumlar **saklanmalı**' },
      { yol:'FBN1 → Numara aralığı', not:'Toplu yükleme aralığı **hızla tüketir**' },
      { yol:'GGB4 → Doğrulama etkinlik seviyesi', not:'Seviye 2 = **toplu giriş hariç**' },
    ],

    ekstra:[
      { ic:'🗃️', baslik:'Arayüz tablosu deseni — BAPI ile yazılan her programda', metin:
        'BAPI teknik olarak en temiz yöntemdir ama ' +
        '**tekrar çalıştırılabilirliği hazır getirmez**. ' +
        '{{arayuz-tablosu}} deseni bu boşluğu doldurur.\n\n' +
        '---\n\n' +
        '**Üç adımlı desen:**\n\n' +
        '**1. Yükle** — kaynak veri ara tabloya **ham hâliyle** yazılır. ' +
        'Bu adımda hiçbir doğrulama yapılmaz; amaç veriyi **sisteme almaktır**.\n\n' +
        '**2. İşle** — program ara tablodan **damgalanmamış** satırları okur, ' +
        'BAPI çağırır ve sonucu satır bazında **damgalar**: ' +
        'başarılı / hatalı + **hata mesajı** + oluşan belge numarası.\n\n' +
        '**3. Tekrarla** — yeniden çalıştırmada yalnızca ' +
        '**damgalanmamış veya hatalı** satırlar işlenir.\n\n' +
        '---\n\n' +
        '**Ne kazandırır:**\n\n' +
        '• **Mükerrer kayıt imkânsız** — damgalı satır tekrar işlenmez\n' +
        '• Hatalı satırlar ve **sebepleri saklı** — ' +
        'kullanıcıya rapor olarak verilebilir\n' +
        '• {{sayi-mutabakati}} **tablodan** yapılabilir: ' +
        'toplam satır = başarılı + hatalı\n' +
        '• **Denetim izi** kalır — ne geldi, ne oldu\n' +
        '• Hata düzeltme **tabloda** yapılabilir; dosyayı yeniden yüklemeye gerek yok\n\n' +
        '---\n\n' +
        '**Bu desen aslında {{toplu-giris}}’in hazır verdiği şeyi ' +
        'BAPI için elle inşa etmektir.**\n\n' +
        '{{SM35}} oturumu tam olarak bunu yapar: hatalı satırları saklar, ' +
        'başarılıları damgalar, yeniden işlemede atlar.\n\n' +
        '**Karar:** BAPI’nin hızı ve temizliği isteniyorsa bu deseni ' +
        '**baştan kurgula**; kurgulanmayacaksa {{toplu-giris}} kullan.' },

      { ic:'⚖️', baslik:'Neden "hız" yanlış karşılaştırma ekseni?', metin:
        'Yöntem karşılaştırmaları genelde şöyle yapılır: ' +
        '*"BAPI hızlıdır, batch input yavaştır."*\n\n' +
        'Bu doğru ama **yanlış eksendir**.\n\n' +
        '---\n\n' +
        '**Hız bir defalık maliyettir.** 12.000 kayıt ' +
        '{{toplu-giris}} ile 4 saat, {{bapi}} ile 20 dakika sürebilir. ' +
        'Fark 3,5 saattir — ve bu **bir gecede** kapanır.\n\n' +
        '**Hata yönetimi ise her çalıştırmada** karşına çıkar.\n\n' +
        'Ve her çalıştırmada bir kısmı **başarısız olur** — ' +
        'veri kalitesi hiç mükemmel değildir.\n\n' +
        '---\n\n' +
        '**Somut karşılaştırma:**\n\n' +
        '**Senaryo:** 12.000 kayıt, 340’ı hatalı.\n\n' +
        '**{{toplu-giris}} ile:** 4 saat sürer. 340 hatalı satır ' +
        '{{SM35}} oturumunda **bekler**. Sebep düzeltilir, ' +
        'oturum yeniden işlenir. **Ek geliştirme: sıfır.**\n\n' +
        '**{{bapi}} ile (desen yoksa):** 20 dakika sürer. ' +
        '340 hatalı satır **kaybolur** — hangileriydi bilinmez. ' +
        'Kaynak dosyadan hangilerinin işlendiğini bulmak gerekir. ' +
        'Baştan çalıştırmak **11.660 mükerrer kayıt** üretir.\n\n' +
        '**Kazanılan 3,5 saat, kaybedilen bir günle ödenir.**\n\n' +
        '**Doğru soru:** *"Hangisi hızlı?"* değil, ' +
        '**"340 hatalı satır çıkarsa ne olacak?"**' },
    ],

    notlar:[
      { tip:'warn', baslik:'Sayı mutabakatı — tek zorunlu kural', metin:
        'Bu konunun **tek pazarlıksız kuralı** budur:\n\n' +
        '**Her toplu yüklemeden sonra gönderilen ile oluşan karşılaştırılır.**\n\n' +
        '---\n\n' +
        '**İki seviyede yapılır ve ikisi farklı hataları yakalar:**\n\n' +
        '**Adet** — kaynak satır sayısı = oluşan belge sayısı ({{BKPF}})\n' +
        '→ Yakaladığı: {{guncelleme-hatasi}}, eksik commit, atlanan satır\n\n' +
        '** Tutar** — kaynak borç/alacak toplamı = sistemdeki toplam\n' +
        '→ Yakaladığı: {{donusum-kurali}} hataları — ondalık ayracı, ' +
        'kur, birim, işaret\n\n' +
        '**Adet tutup tutar tutmuyorsa** dönüşüm hatası vardır. ' +
        'Bu, yalnızca adet sayan bir kontrolün **hiç göremeyeceği** ' +
        'bir hata sınıfıdır.\n\n' +
        '---\n\n' +
        '**Neden bu kadar önemli:** yükleme hatalarının çoğu **sessizdir**. ' +
        'Ekranda *"tamamlandı"* yazar, günlükte hata görünmez, ' +
        've kayıtların bir kısmı yoktur.\n\n' +
        'Mutabakat, bu sessizliği **sayıya çeviren** tek araçtır. ' +
        'Ve sayı yorum gerektirmez: ya eşittir ya değildir.\n\n' +
        'Bu kural {{konu:error-handling}}, {{konu:lsmw}} ve {{konu:migration}} ' +
        'konularında **aynı gerekçeyle** tekrarlanır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Yöntemlerin hepsi S/4HANA’da **çalışmaya devam ediyor**. ' +
      'Değişen: **Migration Cockpit** öne çıktı, ' +
      'bazı hedef tablolar **görünüme dönüştü** ve doğrudan yazılamıyor.',

    eccFarklari:[
      { konu:'{{toplu-giris}}', ecc:'Yaygın', s4:'**Çalışır** ama {{BP}} gibi işlemlerde güvenilmez' },
      { konu:'{{bapi}}', ecc:'Yaygın', s4:'**Duruyor** — hâlâ en temiz programatik yol' },
      { konu:'{{idoc}}', ecc:'Yaygın', s4:'**Duruyor** — sürekli arayüzlerde' },
      { konu:'Önerilen araç', ecc:'{{LSMW}}', s4:'**Migration Cockpit** ({{LTMC}})' },
      { konu:'Hedef tablolar', ecc:'{{BSEG}}, {{BSIK}} yazılabilir', s4:'İndeksler **görünüm** — yazılamaz' },
      { konu:'Simülasyon', ecc:'Yok', s4:'**Yükleme öncesi** doğrulama' },
      { konu:'Şablon', ecc:'Kendin tanımlarsın', s4:'Hazır, **önceden eşli** Excel' },
      { konu:'Bulut', ecc:'—', s4:'Cloud’da **yalnızca** Migration Cockpit / API' },
    ],

    universalJournal:
      '{{evrensel-kayit-defteri}} yüklemeyi **basitleştirdi**: ' +
      'ECC’de FI, CO ve varlık için ayrı ayrı düşünülen yükleme ' +
      'artık {{ACDOCA}}’ya tek yapıda gidiyor.\n\n' +
      '**Ama {{ACDOCA}}’ya doğrudan yazılmaz** — ' +
      'belge kaydı üzerinden gidilir (bkz. {{konu:sap-tables}}).\n\n' +
      'Bir tablo hedef olabilir ama **yazılabilir olmayabilir**; ' +
      'bu ayrım eski yükleme programlarını taşırken ' +
      '**en çok sorun çıkaran** noktadır.',

    kalkanTcodes:[
      { eski:'{{LSMW}} (yeni projelerde)', yeni:'**{{LTMC}}**', not:'Hazır nesneler + **simülasyon**' },
      { eski:'{{BSIK}} / {{BSID}}’e yazma', yeni:'**Mümkün değil**', not:'Görünüme dönüştü — belge kaydı üzerinden' },
      { eski:'{{XK01}} recording', yeni:'{{BP}} nesnesi', not:'BP ekran akışı recording için **fazla karmaşık**' },
      { eski:'—', yeni:'**OData / API**', not:'S/4HANA Cloud’da programatik yükleme yolu' },
    ],

    fiori:[
      { ad:'Migrate Your Data', aciklama:'Migration Cockpit — Cloud’da **tek yol**.' },
      { ad:'Şablon indirme', aciklama:'Sütunlar SAP alanlarıyla **önceden eşli**; ' +
             'eşleme adımı büyük ölçüde ortadan kalkar.' },
      { ad:'Simülasyon', aciklama:'**Yüklemeden önce** doğrulama. ' +
             'Diğer yöntemlerde hatayı yükleme sırasında görürsün.' },
      { ad:'Application Jobs', aciklama:'{{SM37}} + {{SLG1}} karşılığı — tek ekranda.' },
    ],

    compatibilityViews:[
      '{{BSIK}}, {{BSID}}, {{BSAS}} artık **görünümdür** — **yazılamaz**.',
      'Bu tablolara yazmaya çalışan eski yükleme programları **çalışmaz**.',
      'Açık kalemler **belge kaydıyla** oluşturulur — indeks otomatik türetilir.',
      '{{ACDOCA}} hedeftir ama **doğrudan yazılmaz**.',
    ],

    performans:
      'HANA toplu yüklemeyi **hızlandırdı** ama darboğaz genelde ' +
      'veritabanı değil **uygulama katmanıdır**: ' +
      'ekran akışı ({{toplu-giris}}) veya BAPI çağrısı.\n\n' +
      '**Paralel çalıştırma** en etkili hızlandırma yöntemidir — ' +
      'veri parçalara bölünür, birden çok oturum aynı anda çalışır.\n\n' +
      '**Ama parçalar dikkatli seçilmelidir:** aynı ana veriye ' +
      '(aynı satıcı, aynı hesap) dokunan parçalar {{kilitleme}} çakışması ' +
      'yaratır ve bu çakışma {{guncelleme-hatasi}} olarak ' +
      '**sessizce** görünür.\n\n' +
      'Yani yanlış bölünmüş paralel yükleme, hızlanma yerine ' +
      '**veri kaybı** üretebilir.',

    bestPractices:[
      'Yeni S/4HANA projesinde **Migration Cockpit** ({{LTMC}}) ile başla.',
      '**Simülasyon** imkânını kullan — hatayı yüklemeden **önce** gör.',
      'Eski yükleme programlarını taşırken **hedef tablo yazılabilir mi** kontrol et.',
      '{{BP}} için recording **kullanma** — Migration Cockpit nesnesi kullan.',
      'BAPI ile program yazacaksan **{{arayuz-tablosu}} desenini** baştan kur.',
      '{{sayi-mutabakati}} — araç ne olursa olsun, **her zaman**.',
      'Paralel parçaları **aynı ana veriye dokunmayacak** şekilde böl.',
      'Cloud’da {{toplu-giris}} yoktur — **API / Migration Cockpit** planla.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'"20 dakikada bitti" — ve 340 kayıt kayboldu',
    hikaye:
      '**Marmara Kimya A.Ş.**’de yıl sonu. Bir yan şirketten devralınan ' +
      '**8.400 muhasebe kaydı** ana şirkete yüklenecek.\n\n' +
      'Geliştirici bir {{bapi}} programı yazdı. Gerekçesi makuldü: ' +
      '*"{{toplu-giris}} ile 3 saat sürer, BAPI ile 20 dakikada biter."*\n\n' +
      'Program çalıştırıldı. **18 dakikada** bitti. ' +
      'Ekranda: *"İşlem tamamlandı."*\n\n' +
      '---\n\n' +
      'Muhasebe müdürü kapanışa geçti. ' +
      'Mizan alındı — **denk**. Geçiş hesabına bakılmadı.\n\n' +
      '**Üç gün sonra** yan şirket mutabakatı geldi: ' +
      'bakiyeler **tutmuyordu**. Fark: **1.284.000 TRY**.',
    veriler:[
      { k:'Kaynak', v:'**8.400** muhasebe kaydı' },
      { k:'Yöntem', v:'{{bapi}} — özel program' },
      { k:'Süre', v:'18 dakika ✓' },
      { k:'Ekran mesajı', v:'*"İşlem tamamlandı"*' },
      { k:'Oluşan belge', v:'**8.060**' },
      { k:'Kayıp', v:'**340 kayıt · 1.284.000 TRY**' },
      { k:'Fark edilme', v:'**3 gün sonra** — dış mutabakatla' },
    ],

    adimlar:[
      { baslik:'Gerçekten kaç belge oluştu?', tcode:'SE16N',
        aciklama:'İlk kez sayım yapılıyor.',
        girdi:[
          { alan:'Tablo', deger:'{{BKPF}} · `TCODE` = program · yükleme tarihi' },
          { alan:'Oluşan belge', deger:'**8.060**' },
          { alan:'Kaynak dosya', deger:'**8.400** satır' },
          { alan:'Fark', deger:'**340** — ve tutar farkıyla **tutarlı**' },
        ],
        not:'**Bu sayım yükleme günü yapılsaydı sorun 3 gün değil ' +
             '3 dakika sürerdi.**\n\n' +
             '{{sayi-mutabakati}} atlanmıştı. Ekrandaki ' +
             '*"işlem tamamlandı"* mesajı yeterli sayılmıştı.\n\n' +
             'Ama o mesaj **programın çalıştığını** söyler, ' +
             '**8.400 kaydın yazıldığını** söylemez.' },

      { baslik:'340 kayıt nereye gitti?', tcode:'SM13',
        aciklama:'Sessiz kayıp aranıyor.',
        girdi:[
          { alan:'{{SM13}}', deger:'Durum **Err** · yükleme penceresi' },
          { alan:'Sonuç', deger:'**340 güncelleme hatası**' },
          { alan:'Hata', deger:'*"Kilit çakışması — satıcı ... kilitli"*' },
          { alan:'Kalıp', deger:'Hatalar **belirli satıcılarda** yoğunlaşmış' },
        ],
        not:'**{{guncelleme-hatasi}}.** Numara verilmiş, belge **yazılmamış**.\n\n' +
             'Program bu satırları **başarılı** saymıştı — ' +
             'BAPI `RETURN` tablosu **boş** dönmüştü.\n\n' +
             'Çünkü hata BAPI aşamasında değil, ' +
             '**asenkron güncelleme aşamasında** oluştu. ' +
             'BAPI işini yapmış ve dönmüştü; ' +
             'kayıt sonradan çöktü.' },

      { baslik:'Kilit çakışması neden oluştu?', tcode:'SM37',
        aciklama:'Programın nasıl çalıştırıldığı inceleniyor.',
        girdi:[
          { alan:'Çalıştırma', deger:'**6 paralel iş** — hızlandırmak için' },
          { alan:'Bölme', deger:'Kaynak dosya **satır numarasına** göre bölünmüş' },
          { alan:'Sonuç', deger:'Aynı satıcı **birden çok parçada**' },
          { alan:'Çakışma', deger:'İki iş aynı anda aynı satıcıya kayıt atmaya çalışmış' },
        ],
        not:'**Kök sebep bulundu — ve bir hızlandırma kararıydı.**\n\n' +
             'Dosya **satır numarasına göre** altıya bölünmüştü: ' +
             '1–1400, 1401–2800, …\n\n' +
             'Ama aynı satıcıya ait kayıtlar dosyada **dağınıktı**. ' +
             'Sonuç: iki parça aynı satıcıya **aynı anda** dokundu ve ' +
             '{{kilitleme}} çakışması oluştu.\n\n' +
             '**Doğru bölme ölçütü satır numarası değil, ' +
             'kilitlenen nesnedir** — satıcı numarası.' },

      { baslik:'Program neden hatayı yakalamadı?', tcode:'SE37',
        aciklama:'Program mantığı inceleniyor.',
        girdi:[
          { alan:'Kontrol', deger:'BAPI `RETURN` tablosu kontrol ediliyor ✓' },
          { alan:'Eksik', deger:'Commit **sonrası** doğrulama **yok**' },
          { alan:'{{arayuz-tablosu}}', deger:'**Kullanılmamış** — ham dosyadan okunuyor' },
          { alan:'Sonuç', deger:'Hangi satırın işlendiği **kayıtlı değil**' },
        ],
        not:'**Program teknik olarak doğru yazılmıştı** — ' +
             'BAPI çağrılıyor, `RETURN` kontrol ediliyor, commit yapılıyor.\n\n' +
             'Ama iki eksik vardı:\n\n' +
             '**1.** Commit **sonrası** kaydın gerçekten oluştuğu ' +
             'doğrulanmıyordu. {{guncelleme-hatasi}} bu aşamada oluşur ve ' +
             '`RETURN` tablosuna **yansımaz**.\n\n' +
             '**2.** {{arayuz-tablosu}} yoktu. Hangi satırın işlendiği ' +
             '**hiçbir yerde kayıtlı değildi** — bu yüzden ' +
             '340 kaybı bulmak {{BKPF}} ile kaynak dosyayı ' +
             '**satır satır karşılaştırmayı** gerektirdi.' },

      { baslik:'Düzeltme — eksik 340 kayıt', tcode:'SE16N',
        aciklama:'Kayıp kayıtlar bulunup yükleniyor.',
        girdi:[
          { alan:'① Tespit', deger:'{{BKPF}}.`XBLNR` ile kaynak karşılaştırıldı → **340 satır**' },
          { alan:'② Karar', deger:'Baştan çalıştırma **yok** — 8.060 mükerrer olurdu' },
          { alan:'③ Yükleme', deger:'Yalnızca 340 satır · **tek iş** (paralel yok)' },
          { alan:'④ Doğrulama', deger:'{{BKPF}} → **8.400** ✓ · {{SM13}} → **0** ✓' },
          { alan:'⑤ Geçiş hesabı', deger:'Bakiye **sıfır** ✓' },
        ],
        fis:{ baslik:'Nihayet oluşan kayıtlardan biri', belgeTuru:'SA', tarih:'28.12.2027',
          satirlar:[
            { hesap:'320', ad:'Satıcılar — devralınan bakiye', alacak:47200 },
            { hesap:'399', ad:'Geçiş hesabı', borc:47200 },
          ], not:'Kayıt tamamen normal — **muhasebede bir sorun yoktu**.\n\n' +
                 'Kayıtlar sadece **oluşmamıştı** ve bunu kimse ' +
                 'üç gün boyunca **saymamıştı**.\n\n' +
                 '`XBLNR` alanına kaynak referansı yazıldığı için ' +
                 'eksik satırları bulmak **mümkün oldu**. ' +
                 'Yazılmasaydı 8.400 satırı elle karşılaştırmak gerekirdi.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'340 yeni belge — toplam **8.400** ✓' },
          { tablo:'BSIK', ne:'Eksik açık kalemler oluştu' },
        ],
        not:'**Baştan çalıştırma seçeneği yoktu.** ' +
             'Program mükerrer koruması içermediği için ' +
             'yeniden çalıştırmak **8.060 çift kayıt** üretecekti.\n\n' +
             'Eksik 340 satır **elle tespit edilip** ayrı bir dosyayla yüklendi. ' +
             'Bu, {{arayuz-tablosu}} deseni olsaydı ' +
             '**tek tıkla** yapılabilecek bir işti.' },

      { baslik:'Kalıcı önlemler', tcode:'SM13',
        aciklama:'Beş önlem — sayım, desen, bölme, doğrulama ve karar ölçütü.',
        girdi:[
          { alan:'① Zorunlu adım', deger:'Her yükleme sonrası **{{sayi-mutabakati}} + {{SM13}}**' },
          { alan:'② Desen', deger:'BAPI programlarında **{{arayuz-tablosu}}** zorunlu' },
          { alan:'③ Paralel bölme', deger:'Satır numarasına göre **değil**, **kilitlenen nesneye** göre' },
          { alan:'④ Commit sonrası', deger:'Kaydın gerçekten oluştuğu **doğrulanır**' },
          { alan:'⑤ Karar ölçütü', deger:'Yöntem seçiminde *"hangisi hızlı?"* değil, **"hatalılar ne olacak?"**' },
        ],
        not:'**Beşinci önlem diğer dördünün sebebini kapsıyor.**\n\n' +
             'Yöntem *"BAPI daha hızlı"* diye seçilmişti — ' +
             've bu **doğruydu**: 18 dakika vs 3 saat.\n\n' +
             'Ama sorulmayan soru şuydu: ' +
             '**"340 kayıt başarısız olursa ne olacak?"**\n\n' +
             '{{toplu-giris}} seçilseydi 340 satır {{SM35}} oturumunda ' +
             '**bekliyor** olacaktı ve tek tıkla yeniden işlenecekti.\n\n' +
             'Kazanılan **2,5 saat**, kaybedilen **3 gün** ile ödendi — ' +
             've dış mutabakatta güven kaybıyla.' },
    ],

    sonuc:
      '**18 dakikada bitti, 340 kayıt kayboldu, 3 gün sonra dış mutabakatta çıktı.**\n\n' +
      '**Beş kritik ders:**\n\n' +
      '**1. Yöntem seçimi bir hata yönetimi kararıdır, hız kararı değil.** ' +
      '*"BAPI daha hızlı"* doğruydu — 18 dakika vs 3 saat. ' +
      'Ama sorulmayan soru **"340 kayıt başarısız olursa ne olacak?"** idi. ' +
      '{{toplu-giris}} seçilseydi hatalı satırlar {{SM35}} oturumunda ' +
      '**bekliyor** olacaktı. Kazanılan 2,5 saat, kaybedilen 3 günle ödendi.\n\n' +
      '**2. {{sayi-mutabakati}} atlanamaz.** ' +
      'Ekrandaki *"işlem tamamlandı"* mesajı **programın çalıştığını** söyler, ' +
      '8.400 kaydın yazıldığını **söylemez**. ' +
      'Yükleme günü yapılacak bir sayım, sorunu 3 gün yerine ' +
      '**3 dakikada** ortaya çıkarırdı.\n\n' +
      '**3. BAPI `RETURN` tablosu yeterli değildir.** ' +
      '{{guncelleme-hatasi}} BAPI aşamasında değil, **asenkron güncelleme** ' +
      'aşamasında oluşur ve `RETURN` tablosuna **yansımaz**. ' +
      'BAPI *"başarılı"* döner, kayıt sonradan çöker. ' +
      'Bu yüzden {{SM13}} kontrolü **ayrı bir adımdır**.\n\n' +
      '**4. Paralel bölme ölçütü satır numarası değil, kilitlenen nesnedir.** ' +
      'Dosya satır numarasına göre bölününce aynı satıcı ' +
      'birden çok parçaya düştü ve {{kilitleme}} çakışması oluştu. ' +
      'Yanlış bölünmüş paralel yükleme, hızlanma yerine **veri kaybı** üretir.\n\n' +
      '**5. {{arayuz-tablosu}} deseni olmadan BAPI programı yazılmamalı.** ' +
      'Hangi satırın işlendiği hiçbir yerde kayıtlı olmadığı için ' +
      'kayıp 340 satırı bulmak, 8.400 satırı **karşılaştırmayı** gerektirdi. ' +
      'Baştan çalıştırmak ise **8.060 mükerrer kayıt** üretecekti. ' +
      'Desen olsaydı bu iş **tek tıktı**.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      '**Yöntem seçimi bir hız kararı değil, bir hata yönetimi kararıdır.**',
      'Karar sorusu: *"Hangisi hızlı?"* değil, **"hatalı satırlarla ne olacak?"**',
      '**{{toplu-giris}}** → hatalılar {{SM35}}’te **bekler**, tekrar çalıştırma **hazır**.',
      '**{{bapi}}** → hızlı ve temiz ama tekrar çalıştırma **senin kurgun** — ' +
      '{{arayuz-tablosu}} deseni gerekir.',
      '**{{idoc}}** → **hiçbir mesaj kaybolmaz**, kurulum ağır — sürekli arayüz için.',
      'BAPI’de `BAPI_TRANSACTION_COMMIT` yoksa kayıt **yazılmaz**, ' +
      'BAPI yine *"başarılı"* döner.',
      '**{{sayi-mutabakati}} — tek zorunlu kural.** Adet **ve** tutar.',
      'Toplu yükleme sonrası **{{SM13}}** — {{guncelleme-hatasi}} orada.',
      'Paralel bölme ölçütü **kilitlenen nesne**, satır numarası değil.',
    ],

    onemliNoktalar:[
      '**"Batch input mi BAPI mi kullanırsın?"** Cevap hızla başlamaz. Belirleyici soru: **"hatalı satırlarla ne olacak?"** {{toplu-giris}} → hatalılar {{SM35}} oturumunda **bekler**, düzeltilip yeniden işlenir, başarılılar **tekrarlanmaz** — tekrar çalıştırılabilirlik **hazır gelir**. {{bapi}} → hızlı, ekrandan bağımsız, hata mesajı yapılandırılmış; ama tekrar çalıştırma **senin kurgun** — {{arayuz-tablosu}} deseni gerekir.',
      '**"BAPI başarılı döndü ama kayıt yok. İki olası sebep?"** **(1)** `BAPI_TRANSACTION_COMMIT` çağrılmamış — BAPI *"başarılı"* döner, belge numarası verir, veritabanında hiçbir şey yoktur. **(2)** {{guncelleme-hatasi}} — hata BAPI aşamasında değil **asenkron güncelleme** aşamasında oluşmuş ve `RETURN` tablosuna **yansımamış**. İkincisi için {{SM13}} **ayrı** kontrol edilir.',
      '**"Toplu yükleme sonrası hangi kontroller zorunlu?"** **İki tanesi:** **(1)** {{sayi-mutabakati}} — **adet** (kaynak satır = oluşan belge) ve **tutar** (kaynak toplamı = sistem toplamı). Adet tutup **tutar tutmuyorsa** {{donusum-kurali}} hatası var (ondalık ayracı, kur). **(2)** {{SM13}} — sessiz kayıplar. Ekrandaki *"tamamlandı"* mesajı **programın çalıştığını** söyler, kayıtların yazıldığını değil.',
      '**"Paralel yükleme yaparken veriyi nasıl bölersin?"** **Satır numarasına göre değil — kilitlenen nesneye göre.** Satır numarasına bölünürse aynı satıcı birden çok parçaya düşer, iki iş aynı anda aynı nesneye dokunur ve {{kilitleme}} çakışması oluşur. Çakışma {{guncelleme-hatasi}} olarak **sessizce** görünür. Yanlış bölünmüş paralel yükleme, hızlanma yerine **veri kaybı** üretir.',
      '**"Arayüz tablosu deseni nedir, neden gerekir?"** BAPI **tekrar çalıştırılabilirlik getirmez**; bu desen onu elle inşa eder. **Üç adım:** ham veri ara tabloya yazılır → program damgalanmamış satırları okur, BAPI çağırır, sonucu **satır bazında damgalar** (başarılı/hatalı + mesaj + belge no) → yeniden çalıştırmada yalnızca damgalanmamışlar işlenir. **Kazanım:** mükerrer imkânsız, hatalar saklı, mutabakat tablodan yapılabilir, denetim izi kalır.',
      '**"IDoc ne zaman tercih edilir?"** **Sürekli** veri akışı ve dış sistem entegrasyonunda. En büyük avantajı: **hiçbir mesaj kaybolmaz** — her IDoc kendi statüsünü ve hata sebebini taşır, {{BD87}} ile tek tek yeniden işlenir, arşivlenir. Bedeli kurulum yüküdür ({{WE20}} partner profili, mesaj tipi, port) — tek seferlik 3.000 satır için **fazla ağır**. En sık hata: partner profili yoksa **statü 56**.',
      '**"Çok satırlı belgede yüklemeyi nasıl kurgularsın?"** **Belge bazlı** — satır bazlı değil. Muhasebede **yarım belge yoktur**: bir belge ya tamamen oluşur ya hiç oluşmaz; yarım belge **dengesiz belgedir**. 3 kalemli fatura → **tek** BAPI çağrısı, **tek** commit. Kaynak dosyada bir **belge anahtarı** sütunu olmalı ve yükleme buna göre **gruplamalıdır**.',
      '**"S/4HANA\'da yükleme yöntemlerinde ne değişti?"** Yöntemlerin hepsi **çalışıyor**. Değişenler: **(1)** Migration Cockpit ({{LTMC}}) öne çıktı — hazır şablon ve **yükleme öncesi simülasyon**. **(2)** {{BSIK}}/{{BSID}} **görünüme dönüştü**, doğrudan **yazılamaz** — bu tablolara yazan eski programlar çalışmaz; açık kalem **belge kaydıyla** oluşturulur. **(3)** {{BP}} için recording güvenilmez. **(4)** Cloud’da {{toplu-giris}} yok — **API / Cockpit**.',
    ],

    sikHatalar:[
      { hata:'Yöntemi hıza göre seçmek.', dogru:'Hız **bir defalık**, hata yönetimi **her çalıştırmada**. Soru: *"hatalılar ne olacak?"*' },
      { hata:'Yükleme sonrası kayıt saymamak.', dogru:'{{sayi-mutabakati}} **zorunlu** — adet **ve** tutar.' },
      { hata:'Ekrandaki "tamamlandı" mesajına güvenmek.', dogru:'Mesaj **programın çalıştığını** söyler, kayıtların yazıldığını **değil**.' },
      { hata:'{{SM13}} kontrolünü atlamak.', dogru:'{{guncelleme-hatasi}} toplu yüklemede **sıktır** — paralel görevler kilit çakışması yaratır.' },
      { hata:'BAPI `RETURN` tablosunu yeterli saymak.', dogru:'Güncelleme hatası **RETURN’e yansımaz** — sonradan oluşur.' },
      { hata:'`BAPI_TRANSACTION_COMMIT` çağırmamak.', dogru:'Kayıt **yazılmaz**, BAPI yine *"başarılı"* döner. **Sessiz** hatadır.' },
      { hata:'BAPI programını {{arayuz-tablosu}} olmadan yazmak.', dogru:'Hangi satır işlendi **bilinmez**; baştan çalıştırma **mükerrer** üretir.' },
      { hata:'Hata sonrası programı baştan çalıştırmak.', dogru:'Koruma yoksa başarılılar **çift** yazılır. Önce hangi satırların işlendiği tespit edilir.' },
      { hata:'Paralel yüklemeyi satır numarasına göre bölmek.', dogru:'**Kilitlenen nesneye** göre bölünür — yoksa çakışma ve **sessiz kayıp**.' },
      { hata:'Çok satırlı belgeyi satır bazlı yüklemek.', dogru:'Belge **yarım kalır**. Belge bazlı işlem: tamamı veya hiçbiri.' },
      { hata:'S/4HANA’da {{BSIK}}’e yazmaya çalışmak.', dogru:'**Görünümdür**, yazılamaz. Açık kalem **belge kaydıyla** oluşur.' },
      { hata:'Excel’de kodları sayı biçiminde tutmak.', dogru:'Baştaki sıfırlar **kaybolur**. Sütun **metin** olmalı.' },
    ],

    ipuclari:[
      '**Üç soru:** tek seferlik mi · BAPI var mı · **hatalı satırlarla ne olacak?**',
      'Mutabakat **iki seviyeli**: adet **ve** tutar. Tutar, dönüşüm hatalarını yakalar.',
      'Toplu yükleme sonrası **{{SM13}}** — ayrı ve zorunlu adım.',
      'BAPI programında **{{arayuz-tablosu}}** desenini baştan kur.',
      '`XBLNR` alanına **kaynak referansı** yaz — mükerrer kontrolü ve eşleştirme için.',
      'Çok satırlı belgede **belge bazlı** işlem ve **tek commit**.',
      'Paralel parçaları **kilitlenen nesneye** göre böl.',
      'Commit sıklığı denge kararı: her kayıtta **güvenli/yavaş**, toplu **hızlı/riskli**. ' +
      'Veri geçişinde **güvenlik** tercih edilir.',
      'Sürekli arayüzde {{idoc}} — kurulumu ağır ama **hiçbir mesaj kaybolmaz**.',
    ],

    quiz:[
      { soru:'Yükleme yöntemi seçerken belirleyici soru hangisidir?',
        secenekler:[
          'Hangisi daha hızlı?',
          'Hangisini geliştirici biliyor?',
          '**Hatalı satırlarla ne olacak — görülebilir, düzeltilebilir, yeniden işlenebilir mi?**',
          'Hangisi daha az disk kullanır?',
        ], dogru:2,
        aciklama:'**Hız bir defalık maliyettir; hata yönetimi her çalıştırmada karşına çıkar.**\n\n' +
                 'Ve her çalıştırmada bir kısmı **başarısız olur** — ' +
                 'veri kalitesi hiç mükemmel değildir.\n\n' +
                 '**Somut karşılaştırma:** 12.000 kayıt, 340’ı hatalı.\n\n' +
                 '**{{toplu-giris}}:** 4 saat. Hatalılar {{SM35}}’te **bekler**, ' +
                 'düzeltilip yeniden işlenir. Ek geliştirme: **sıfır**.\n\n' +
                 '**{{bapi}} (desen yoksa):** 20 dakika. 340 hatalı satır ' +
                 '**kaybolur**; baştan çalıştırmak **11.660 mükerrer** üretir.\n\n' +
                 'Kazanılan 3,5 saat, kaybedilen bir günle ödenir.' },

      { soru:'BAPI "başarılı" döndü ama belge yok. İki olası sebep nedir?',
        secenekler:[
          'Yetki eksikliği ve dönem kapalı',
          '**Commit çağrılmamış · veya güncelleme hatası (RETURN’e yansımaz)**',
          'Numara aralığı dolmuş',
          'Veri hatası',
        ], dogru:1,
        aciklama:'**Sebep 1 — Commit yok.** `BAPI_TRANSACTION_COMMIT` ' +
                 'çağrılmazsa kayıt **yazılmaz**; BAPI yine *"başarılı"* döner ' +
                 've belge numarası verir. **Sessiz** hatadır.\n\n' +
                 '**Sebep 2 — {{guncelleme-hatasi}}.** Hata BAPI aşamasında değil, ' +
                 '**asenkron güncelleme** aşamasında oluşur. ' +
                 'BAPI işini yapıp döndüğü için `RETURN` tablosu **boştur**; ' +
                 'kayıt **sonradan** çöker.\n\n' +
                 'İkincisi için {{SM13}} **ayrı** kontrol edilir — ' +
                 'program mantığı bunu yakalayamaz.' },

      { soru:'{{sayi-mutabakati}}’nda adet tutuyor ama tutar tutmuyor. Ne anlama gelir?',
        secenekler:[
          'Bazı kayıtlar kaybolmuş',
          '**Bir dönüşüm kuralı hatası var — ondalık ayracı, kur veya birim**',
          'Mutabakat yanlış hesaplanmış',
          'Dönem kapalı',
        ], dogru:1,
        aciklama:'**İki seviyeli mutabakatın değeri tam olarak budur.**\n\n' +
                 '**Adet** tutuyorsa tüm satırlar işlenmiş demektir — ' +
                 'kayıp yok, {{guncelleme-hatasi}} yok.\n\n' +
                 '**Tutar** tutmuyorsa **değerler yanlış dönüştürülmüş** demektir:\n' +
                 '• Ondalık ayracı — `1.234,56` ↔ `1,234.56` (**1000 kat** hata)\n' +
                 '• Döviz kuru veya para birimi\n' +
                 '• Birim çevrimi\n' +
                 '• İşaret (borç/alacak)\n\n' +
                 'Yalnızca adet sayan bir kontrol bu hata sınıfını ' +
                 '**hiç göremez** — ve bu, tutar kontrolünün neden ' +
                 'ayrıca yapıldığının sebebidir.' },

      { soru:'Paralel yükleme yaparken veri nasıl bölünmelidir?',
        secenekler:[
          'Satır numarasına göre eşit parçalara',
          'Tarihe göre',
          '**Kilitlenen nesneye göre — aynı satıcı/hesap tek parçada kalmalı**',
          'Rastgele',
        ], dogru:2,
        aciklama:'Satır numarasına bölünürse aynı satıcıya ait kayıtlar ' +
                 '**birden çok parçaya** düşer (dosyada dağınık olabilirler).\n\n' +
                 'İki iş aynı anda aynı satıcıya kayıt atmaya çalışır → ' +
                 '**{{kilitleme}} çakışması**.\n\n' +
                 'Ve çakışma {{guncelleme-hatasi}} olarak **sessizce** görünür: ' +
                 'ekranda hata yok, kayıt yok.\n\n' +
                 '**Sonuç: yanlış bölünmüş paralel yükleme, ' +
                 'hızlanma yerine veri kaybı üretir.**\n\n' +
                 'Doğru ölçüt: kilitlenen nesne — satıcı numarası, hesap, ' +
                 'malzeme. Aynı nesne **tek parçada** kalmalı.' },

      { soru:'{{arayuz-tablosu}} deseni ne sağlar ve neden BAPI ile zorunludur?',
        secenekler:[
          'Yüklemeyi hızlandırır',
          '**Tekrar çalıştırılabilirlik ve mükerrer koruması — BAPI bunları hazır getirmez**',
          'Yetki kontrolü sağlar',
          'Disk alanı kazandırır',
        ], dogru:1,
        aciklama:'{{toplu-giris}} tekrar çalıştırılabilirliği **hazır getirir** ' +
                 '({{SM35}} oturumu hatalıları saklar, başarılıları atlar). ' +
                 '**{{bapi}} getirmez** — bu desen onu **elle inşa eder**.\n\n' +
                 '**Üç adım:** ham veri ara tabloya → program damgalanmamışları ' +
                 'okur, BAPI çağırır, sonucu **satır bazında damgalar** ' +
                 '(başarılı/hatalı + mesaj + belge no) → yeniden çalıştırmada ' +
                 'yalnızca **damgalanmamışlar** işlenir.\n\n' +
                 '**Kazanım:** mükerrer **imkânsız** · hatalar ve sebepleri **saklı** · ' +
                 'mutabakat **tablodan** · denetim izi.' },

      { soru:'Sürekli çalışacak bir arayüz için hangi yöntem tercih edilir?',
        secenekler:[
          '{{toplu-giris}}',
          'Excel yükleme',
          '**{{idoc}}**',
          'Elle giriş',
        ], dogru:2,
        aciklama:'**IDoc’un en büyük avantajı: hiçbir mesaj kaybolmaz.**\n\n' +
                 'Her IDoc:\n' +
                 '• Kendi **statüsünü** tutar ({{EDIDC}}.`STATUS`)\n' +
                 '• Hata sebebini **saklar**\n' +
                 '• {{BD87}} ile **tek tek** yeniden işlenebilir\n' +
                 '• Arşivlenir — **denetim izi**\n\n' +
                 'Bedeli kurulum yüküdür: {{WE20}} partner profili, ' +
                 'mesaj tipi, port tanımı. Tek seferlik 3.000 satırlık ' +
                 'bir yükleme için **fazla ağırdır**.\n\n' +
                 'En sık hata: partner profili yoksa IDoc **statü 56** ' +
                 'ile reddedilir — *"IDoc geldi ama işlenmedi"*.' },

      { soru:'3 kalemli bir faturayı toplu yüklerken doğru yaklaşım nedir?',
        secenekler:[
          'Her kalem ayrı işlem — daha güvenli',
          '**Belge bazlı: tek çağrı, tek commit — tamamı veya hiçbiri**',
          'Önce başlık, sonra kalemler ayrı ayrı',
          'Fark etmez',
        ], dogru:1,
        aciklama:'**Muhasebede yarım belge diye bir şey yoktur:** ' +
                 'bir belge ya tamamen oluşur ya hiç oluşmaz. ' +
                 'Yarım belge **dengesiz belgedir** ve SAP buna izin vermez.\n\n' +
                 'Satır bazlı işlem yapılırsa başlık yazılır, ' +
                 'ikinci kalem çöker ve belge **yarım kalır**.\n\n' +
                 '**Doğru:** 3 kalemli fatura → **tek** {{bapi}} çağrısı → ' +
                 '**tek** commit. Hepsi veya hiçbiri.\n\n' +
                 '**Pratik sonucu:** kaynak dosyada bir **belge anahtarı** ' +
                 'sütunu olmalı ve yükleme bu anahtara göre **gruplamalıdır**. ' +
                 '{{konu:lsmw}}’de bu, başlık–kalem ilişkisi olarak tanımlanır.' },

      { soru:'S/4HANA’da eski bir yükleme programı çalışmıyor. En olası sebep?',
        secenekler:[
          'Yetki değişmiş',
          '**Hedef tablo görünüme dönüşmüş — {{BSIK}}/{{BSID}} artık yazılamaz**',
          'Numara aralığı dolmuş',
          'BAPI kaldırılmış',
        ], dogru:1,
        aciklama:'{{BSIK}}, {{BSID}}, {{BSAS}} gibi indeks tabloları ' +
                 'S/4HANA’da **{{uyumluluk-view}}’a dönüştü** — ' +
                 'okunabilir ama **yazılamaz**.\n\n' +
                 'Bu tablolara doğrudan yazmaya çalışan eski programlar ' +
                 '**çalışmaz**.\n\n' +
                 '**Doğru yaklaşım:** açık kalemler **belge kaydıyla** ' +
                 'oluşturulur; indeks görünümü kaynaktan **otomatik türetilir**.\n\n' +
                 '**Genel kural:** bir tablo **hedef** olabilir ama ' +
                 '**yazılabilir olmayabilir**. Bu ayrım, eski yükleme ' +
                 'programlarını taşırken en çok sorun çıkaran noktadır ' +
                 '(bkz. {{konu:sap-tables}}).' },
    ],

    flashcards:[
      { on:'Konunun tezi', arka:'**Yöntem seçimi bir HIZ kararı değil,\nbir HATA YÖNETİMİ kararıdır.**\n\n*"Hangisi daha hızlı?"*\n**"340 kayıt başarısız olursa ne olacak?"**\n\nÇünkü **her zaman bir kısmı başarısız olur**.' },
      { on:'Hatalı satırlar — üç yöntem, üç cevap', arka:'**{{toplu-giris}}** ✓ {{SM35}} oturumunda **bekler**\n→ tekrar çalıştırma **hazır gelir**\n\n**{{bapi}}** **kaybolur** — senin kurgun\n→ {{arayuz-tablosu}} gerekir\n\n**{{idoc}}** ✓ sistemde **kalır**, {{BD87}}\n→ **en iyi izlenebilirlik**' },
      { on:'Tek zorunlu kural', arka:'**{{sayi-mutabakati}} — iki seviyeli**\n\n**ADET:** kaynak satır = oluşan belge\n→ yakalar: güncelleme hatası, eksik commit\n\n**TUTAR:** kaynak toplamı = sistem toplamı\n→ yakalar: **dönüşüm hataları**\n\nAdet tutup tutar tutmuyorsa → ondalık/kur/birim' },
      { on:'BAPI — iki sessiz tuzak', arka:'**1. Commit yok**\n`BAPI_TRANSACTION_COMMIT` çağrılmazsa kayıt **yazılmaz**\n→ BAPI yine *"başarılı"* döner\n\n**2. Güncelleme hatası**\nBAPI aşamasında değil, **asenkron** aşamada oluşur\n→ `RETURN` tablosuna **yansımaz**\n→ {{SM13}} **ayrı** kontrol' },
      { on:'Arayüz tablosu deseni', arka:'**1. Yükle** — ham veri ara tabloya\n**2. İşle** — damgalanmamışları oku, BAPI çağır,\nsonucu **satır bazında damgala**\n**3. Tekrarla** — yalnızca damgalanmamışlar\n\nMükerrer imkânsız · hatalar saklı · mutabakat tablodan · denetim izi\n\n*= Batch input’un hazır verdiğini elle inşa etmek*' },
      { on:'Paralel bölme ölçütü', arka:'**Satır numarasına göre** bölme\n→ aynı satıcı birden çok parçada\n→ {{kilitleme}} çakışması\n→ {{guncelleme-hatasi}} — **sessiz kayıp**\n\n**Kilitlenen nesneye göre** böl\n(satıcı, hesap, malzeme)\n\n*Yanlış bölme = hızlanma değil, veri kaybı*' },
      { on:'Çok satırlı belge — LUW kuralı', arka:'**Muhasebede yarım belge YOKTUR**\nYa tamamen oluşur ya hiç oluşmaz\n\n3 kalemli fatura → **tek** BAPI çağrısı → **tek** commit\nHer kalem ayrı işlem → belge **yarım kalır** = dengesiz\n\n→ Kaynak dosyada **belge anahtarı** sütunu şart' },
      { on:'Commit sıklığı — denge kararı', arka:'**Her kayıtta** → yavaş ama **güvenli**\n→ hata tek kaydı etkiler\n\n**Toplu (her 1000’de)** → hızlı ama **riskli**\n→ çökerse 1000 kayıt gider\n\nVeri geçişinde **güvenlik** tercih edilir —\nbir kez çalışacak iş için hız ikincil' },
      { on:'IDoc — ne zaman ve neden', arka:'**Sürekli** arayüz için\n\n**Hiçbir mesaj kaybolmaz**\n• Statüsünü tutar · hata sebebini saklar\n• {{BD87}} ile tek tek yeniden\n• Arşivlenir — denetim izi\n\nKurulum ağır ({{WE20}})\nEn sık hata: **statü 56** = partner profili yok' },
      { on:'Excel — üç klasik tuzak', arka:'**1.** Baştaki sıfırlar `0000320100` → `320100`\n→ *"hesap bulunamadı"* · sütunu **metin** yap\n\n**2.** Ondalık ayracı `1.234,56` ↔ `1,234.56`\n→ **1000 kat** hata · tutar mutabakatı yakalar\n\n**3.** Tarih → SAP iç biçimi `YYYYMMDD`' },
      { on:'Yükleme sonrası üç ekran', arka:'**{{SM35}}** → hatalı satırlar **bekliyor mu?**\n**{{SM13}}** → **sessiz kayıp** var mı?\n**{{SLG1}}** → program **ne dedi?**\n\nÜçü **farklı** şey söyler\n\nEkrandaki *"tamamlandı"* = programın çalıştığı,\n**kayıtların yazıldığı DEĞİL**' },
      { on:'S/4HANA — dört değişiklik', arka:'**1.** Migration Cockpit ({{LTMC}}) + **simülasyon**\n**2.** {{BSIK}}/{{BSID}} **görünüm** — yazılamaz\n→ açık kalem **belge kaydıyla** oluşur\n**3.** {{BP}} için recording **güvenilmez**\n**4.** Cloud’da batch input **yok** → **API / Cockpit**' },
      { on:'Hız yanlış eksen — sayısal örnek', arka:'12.000 kayıt · 340’ı hatalı\n\n**Batch input:** 4 saat\n→ 340 satır {{SM35}}’te **bekler** · ek geliştirme **0**\n\n**BAPI (desen yok):** 20 dakika\n→ 340 satır **kaybolur** · baştan = **11.660 mükerrer**\n\nKazanılan 3,5 saat, kaybedilen bir günle ödenir' },
    ],
  },

  },
});
