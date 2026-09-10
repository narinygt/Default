/* ==========================================================================
   content/fi/document-posting.js — "Document Posting (Belge Kaydı)"
   ========================================================================== */

SAP.registerTopic({
  id: 'document-posting',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'Belge kaydı (document posting), bir ekonomik olayın SAP’ta **muhasebe belgesine dönüşme** ' +
      'sürecidir. Nereden gelirse gelsin — elle girilmiş, MM’den düşmüş, SD’den akmış — ' +
      'sonuç hep aynı yapıdadır: bir başlık ({{BKPF}}) + en az iki dengeli kalem ({{BSEG}}).\n\n' +
      'Bu konu FI’ın **mekaniğidir**. Diğer konular "ne kaydedilir"i anlatır; bu konu ' +
      '"nasıl kaydedilir"i anlatır: hangi belge türü, hangi kayıt anahtarı, hangi alan zorunlu, ' +
      'numara nereden gelir, yanlış kayıt nasıl düzeltilir.\n\n' +
      'FI’da aldığın hataların neredeyse tamamı bu mekaniğin bir halkasındadır. ' +
      'Bu yüzden belge kaydını anlamak, hata çözmenin **ön koşuludur**.',

    neden:
      '**Tutarlılık için.** Her belge aynı kurallardan geçer; şirket kodu, dönem ve hesap tipi ' +
      'kontrolleri istisnasız uygulanır.\n\n' +
      '**Kontrol için.** {{belge-turu}} hangi hesap tipine kayıt yapılabileceğini sınırlar; ' +
      '{{alan-durumu}} hangi bilginin zorunlu olduğunu belirler. Bunlar yapısal kontrollerdir — ' +
      'kullanıcı disiplinine bırakılmaz.\n\n' +
      '**İzlenebilirlik için.** Her belge kimin, ne zaman, neye dayanarak kaydettiğini taşır. ' +
      'Muhasebede kayıt **silinmez**; yanlış kayıt {{ters-kayit}} ile düzeltilir ve iz korunur.',

    sirketOnemi:
      'Belge kaydı mekaniği doğru kurulmazsa iki tür sorun çıkar: ya kullanıcılar sürekli hata alır ' +
      've iş durur, ya da **yanlış veri hatasız biçimde** sisteme girer — ikincisi çok daha tehlikelidir.\n\n' +
      'Örnek: gider hesabında maliyet yeri zorunlu değilse kullanıcı boş bırakır, kayıt sorunsuz geçer, ' +
      'ama o gider hiçbir departmana yüklenmez ve CO raporları eksik çıkar. Kimse hata mesajı görmez.\n\n' +
      'Danışmanlık açısından: {{alan-durumu}}, {{belge-turu}} ve {{numara-araligi}} tasarımı ' +
      'canlıya geçmeden **doğru** kurulmalıdır. Bunlar sonradan değiştirilebilir ama geçmiş belgeler ' +
      'eski kurala göre kalır ve veri tutarsızlığı doğar.',

    gercekHayat:
      'Bir muhasebe uzmanı Aralık ayının son günü, 31.12 tarihli bir kira faturasını kaydediyor. ' +
      'Fatura 3 Ocak’ta eline geçmiş. Kayıt tarihini varsayılan olarak bırakıyor: **03.01**.\n\n' +
      'Kayıt sorunsuz geçiyor. Hata yok, uyarı yok. Ama 50.000 TL’lik gider **yanlış yıla** düştü: ' +
      'Aralık kârı 50.000 TL fazla, Ocak kârı 50.000 TL eksik göründü. ' +
      'Mali tablolar imzalandıktan sonra fark edildi ve düzeltme kaydı gerekti.\n\n' +
      'Sorun tek bir alandaydı: **kayıt tarihi (`BUDAT`)**. Belge tarihi 31.12 doğruydu ama dönemi ' +
      'belirleyen o değildi. Belge kaydı mekaniğini bilmemenin maliyeti budur.',

    muhasebeMantigi:
      'Bir FI belgesi **iki katmandan** oluşur:\n\n' +
      '**Başlık ({{BKPF}}):** belgenin kimliği — numara, {{belge-turu}}, tarihler, para birimi, ' +
      'kullanıcı, kaynak belge referansı. Belge başına **bir** satır.\n\n' +
      '**Kalemler ({{BSEG}}):** satır satır hesap, tutar, borç/alacak yönü ve ek boyutlar. ' +
      'Belge başına **en az iki** satır ve borç toplamı = alacak toplamı.\n\n' +
      'S/4HANA’da bir üçüncü katman daha var: **{{ACDOCA}}** — aynı kalemler evrensel formatta, ' +
      'her aktif {{defter}} için ayrı satır kümesiyle.\n\n' +
      '{{belge-denkligi}} kuralı yumuşatılamaz: denk olmayan belge kaydedilemez, ' +
      'yalnızca {{park-etme}} ile kenara konabilir.',

    kavramlar: ['belge-turu', 'kayit-anahtari', 'hesap-tipi', 'alan-durumu', 'numara-araligi',
                'belge-denkligi', 'ters-kayit', 'park-etme', 'kayit-donemi', 'hesap-belirleme'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'Belge kaydı süreci bir **kontrol zinciridir**. Kaydet tuşuna basıldığında sistem sırayla ' +
      'yedi kontrolden geçer ve herhangi biri başarısız olursa kayıt durur. ' +
      'Hata mesajlarını çözmenin yolu, hangi halkada takıldığını bilmektir.',

    roller:[
      { rol:'İş birimi', gorev:'Ekonomik olayı gerçekleştirir ve belgeler (fatura, dekont, fiş).' },
      { rol:'Muhasebe uzmanı', gorev:'Belgeyi girer veya park eder; hesap, tarih ve tutar doğruluğundan sorumludur.' },
      { rol:'Muhasebe müdürü', gorev:'Park edilmiş yüksek tutarlı belgeleri onaylar; dönem açar/kapatır.' },
      { rol:'Sistem', gorev:'Yedi kontrolü uygular, numara verir, tabloları yazar.' },
      { rol:'FI danışmanı', gorev:'{{belge-turu}}, {{numara-araligi}}, {{alan-durumu}}, tolerans ve doğrulama kurallarını tasarlar.' },
      { rol:'İç denetim', gorev:'{{CDHDR}}/{{CDPOS}} üzerinden belge değişikliklerini ve ters kayıtları denetler.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Kaydet tuşuna basıldığında ne olur? — yedi kontrol',
      adimlar:[
        { ic:'📝', rol:'Kullanıcı', baslik:'Veri girilir',
          aciklama:'Başlık alanları (tarihler, şirket kodu, belge türü) ve kalemler (hesap, tutar, yön).',
          cikti:'Girilmiş belge taslağı', ok:'kaydet' },
        { ic:'📅', rol:'Sistem', baslik:'1. Dönem kontrolü',
          aciklama:'Kayıt tarihinden (`BUDAT`) dönem hesaplanır ve {{OB52}}’de o dönemin ilgili ' +
                   '**hesap tipi için** açık olup olmadığı bakılır.',
          cikti:'Dönem geçerli', ok:'geçerse' },
        { ic:'🏷️', rol:'Sistem', baslik:'2. Belge türü kontrolü',
          aciklama:'{{belge-turu}} hangi {{hesap-tipi}}ne izin veriyor? KR türü müşteri hesabına kayıt yaptırmaz.',
          cikti:'Hesap tipi uygun', ok:'geçerse' },
        { ic:'🔑', rol:'Sistem', baslik:'3. Kayıt anahtarı belirlenir',
          aciklama:'Borç/alacak seçimi arka planda {{kayit-anahtari}}’na dönüşür (40 G/L borç, 50 G/L alacak, ' +
                   '31 satıcı alacak…). Anahtar hem yönü hem hedef hesap tipini taşır.',
          cikti:'Kayıt anahtarı atandı', ok:'geçerse' },
        { ic:'📋', rol:'Sistem', baslik:'4. Alan durumu kontrolü',
          aciklama:'Hesabın {{alan-durumu}} grubu ile kayıt anahtarının alan durumu karşılaştırılır. ' +
                   '**En kısıtlayıcı olan kazanır.** Zorunlu alan boşsa kayıt durur.',
          cikti:'Alanlar tamam', ok:'geçerse' },
        { ic:'✅', rol:'Sistem', baslik:'5. Doğrulama ve yerine koyma',
          aciklama:'{{OB28}} doğrulama kuralları iş kurallarını kontrol eder; {{OBBH}} yerine koyma ' +
                   'kuralları alanları otomatik doldurur veya değiştirir.',
          cikti:'Kurallar geçildi', ok:'geçerse' },
        { ic:'⚖️', rol:'Sistem', baslik:'6. Denge kontrolü',
          aciklama:'{{belge-denkligi}}: borç toplamı = alacak toplamı. {{belge-bolme}} açıksa ' +
                   'denge **her defter ve her boyut için ayrı ayrı** kontrol edilir.',
          cikti:'Belge denk', ok:'geçerse' },
        { ic:'🔢', rol:'Sistem', baslik:'7. Numara atanır ve yazılır',
          aciklama:'{{numara-araligi}}’ndan sonraki numara alınır; {{BKPF}}, {{BSEG}}, {{ACDOCA}} ' +
                   've indeks tabloları tek LUW içinde yazılır.',
          cikti:'Kaydedilmiş belge' },
      ],
    },

    adimlar:[
      { rol:'Kullanıcı', eylem:'Belge başlığını girer', sistem:'{{FB50}}, {{FB60}}, {{F-02}} — tarihler, şirket kodu, tür' },
      { rol:'Kullanıcı', eylem:'Kalemleri girer', sistem:'Hesap, borç/alacak, tutar, ek alanlar' },
      { rol:'Kullanıcı', eylem:'Simülasyon yapar', sistem:'Belge → Simüle et — sistemin ekleyeceği satırlar görünür' },
      { rol:'Sistem', eylem:'Yedi kontrolü uygular', sistem:'Dönem → tür → anahtar → alan durumu → kural → denge → numara' },
      { rol:'Sistem', eylem:'Tabloları yazar', sistem:'{{BKPF}}, {{BSEG}}, {{ACDOCA}}, {{BSET}}, indeksler' },
      { rol:'Kullanıcı', eylem:'Belgeyi görüntüler / kontrol eder', sistem:'{{FB03}}' },
      { rol:'Kullanıcı', eylem:'Yanlışsa ters kaydeder', sistem:'{{FB08}} — silme yok' },
      { rol:'Kullanıcı', eylem:'Değiştirilebilir alanları günceller', sistem:'{{FB02}}, {{FB09}}' },
    ],

    veriAkisi:{
      nereden:'Elle giriş; MM ({{MIGO}}, {{MIRO}}), SD ({{VF01}}), HR bordro, AA ({{AFAB}}) ve ' +
              'diğer modüllerin otomatik akışı.',
      nereye:'{{BKPF}} + {{BSEG}} + {{ACDOCA}}; vergi varsa {{BSET}}; açık kalem yönetimli hesaplarda ' +
             'indeks tabloları; oradan bakiyelere ve mali tablolara.',
      tetikleyen:'Belgeye dayanan bir ekonomik olay. Belgesiz kayıt yapılmaz.',
      sonraki:'Kontrol ({{FB03}}), kapatma, dönem sonu işlemleri, raporlama.',
    },

    notlar:[
      { tip:'tip', baslik:'Simülasyon — en az kullanılan en değerli özellik', metin:
        '*Belge → Simüle et*, sistemin **senin girdiğin satırlara ek olarak** üreteceği tüm satırları ' +
        'kaydetmeden gösterir: vergi satırı, {{belge-bolme}} satırları, kur farkı, otomatik fark hesapları.\n\n' +
        'İki satır girdiğin bir belgenin altı satıra dönüştüğünü orada görürsün. ' +
        'Kaydetmeden önce simüle etmek, ters kayıt zahmetinin çoğunu ortadan kaldırır.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'Bu konunun muhasebe boyutu, **belgenin kendisinin yapısıdır**. Aşağıda aynı olayın ' +
      'farklı belge türleriyle nasıl kaydedildiğini, sistemin hangi satırları otomatik eklediğini ve ' +
      'ters kaydın nasıl çalıştığını görüyorsun.',

    etkilenenHesaplar:[
      { hesap:'Kullanıcının girdiği hesaplar', tur:'Değişken', neden:'Gider, gelir, varlık — kullanıcı seçer. {{alan-durumu}} hangi ek bilginin isteneceğini belirler.' },
      { hesap:'Vergi hesapları (191 / 391)', tur:'Bilanço', neden:'{{vergi-kodu}} girildiğinde SAP satırı **otomatik** ekler ve {{BSET}}’e ayrıca yazar. Elle yazılmaz.' },
      { hesap:'{{mutabakat-hesabi}}', tur:'Bilanço', neden:'Satıcı/müşteri numarası girildiğinde SAP ana veriden bulup otomatik yazar.' },
      { hesap:'Belge bölme satırları', tur:'Değişken', neden:'{{belge-bolme}} açıksa ortak satırlar (satıcı, vergi) gider satırlarının kâr merkezi dağılımına göre bölünür.' },
      { hesap:'Ters kayıtta aynı hesaplar', tur:'Değişken', neden:'{{ters-kayit}} orijinal satırların **yönünü değiştirerek** yeni bir belge üretir; hesaplar aynıdır.' },
    ],

    fisler:[
      { baslik:'Kullanıcının girdiği — 2 satır',
        belgeTuru:'KR', tarih:'15.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:50000, not:'Kullanıcı girdi' },
          { hesap:'320', ad:'Satıcılar — V-2001', alacak:60000, not:'Satıcı numarasından otomatik' },
        ],
        not:'Bu **denk değil** (50.000 ≠ 60.000). Kullanıcı vergi kodunu girdi ama vergi satırını yazmadı. ' +
             'Sistem simülasyonda eksik satırı ekleyecek.' },

      { baslik:'Simülasyondan sonra — sistemin tamamladığı belge',
        belgeTuru:'KR', tarih:'15.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', borc:50000, not:'Kullanıcı · maliyet yeri 1200' },
          { hesap:'191', ad:'İndirilecek KDV', borc:10000, not:'**Sistem ekledi** — vergi kodundan' },
          { hesap:'320', ad:'Satıcılar — V-2001', alacak:60000, not:'{{mutabakat-hesabi}}' },
        ],
        not:'Sistem vergi satırını otomatik ekledi ve belge denkleşti. ' +
             'Ayrıca {{BSET}} tablosuna vergi kaydı (matrah 50.000, vergi 10.000) yazıldı.' },

      { baslik:'Belge bölme açıkken — aynı belge 5 satıra çıkar',
        belgeTuru:'KR', tarih:'15.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Gider — kâr merkezi 1000', borc:30000, not:'Kullanıcı girdi' },
          { hesap:'770', ad:'Gider — kâr merkezi 2000', borc:20000, not:'Kullanıcı girdi' },
          { hesap:'191', ad:'KDV — kâr merkezi 1000', borc:6000, not:'**Bölündü** (30/50 oranında)' },
          { hesap:'191', ad:'KDV — kâr merkezi 2000', borc:4000, not:'**Bölündü** (20/50 oranında)' },
          { hesap:'320', ad:'Satıcılar — kâr merkezi 1000', alacak:36000, not:'**Bölündü**' },
          { hesap:'320', ad:'Satıcılar — kâr merkezi 2000', alacak:24000, not:'**Bölündü**' },
        ],
        not:'{{belge-bolme}} açıksa vergi ve satıcı satırları, gider satırlarının kâr merkezi dağılımına ' +
             'göre **otomatik bölünür**. Amaç: her kâr merkezi için ayrı ayrı denk (bilanço çıkarılabilir) veri. ' +
             'Kullanıcı 2 satır girdi, belge 6 satır oldu — simülasyonda bunu görmek önemlidir.' },

      { baslik:'Ters kayıt ({{FB08}}) — orijinalin aynadaki hâli',
        belgeTuru:'KR', tarih:'20.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri', alacak:50000, not:'Yön **tersine döndü**' },
          { hesap:'191', ad:'İndirilecek KDV', alacak:10000, not:'Yön tersine döndü' },
          { hesap:'320', ad:'Satıcılar — V-2001', borc:60000, not:'Yön tersine döndü' },
        ],
        not:'Ters kayıt **yeni bir belgedir**; orijinal silinmez. İki belge de kayıtlarda kalır ve ' +
             '{{BKPF}}’de birbirine bağlanır: orijinalin `STBLG` alanına ters kaydın numarası yazılır. ' +
             'Denetimde her iki belge de görünür — muhasebede izin korunması budur.' },
    ],

    tHesaplar:[
      { hesap:'Genel yönetim gideri', kod:'770',
        borc:[{ ad:'Orijinal kayıt', tutar:50000 }],
        alacak:[{ ad:'Ters kayıt (FB08)', tutar:50000 }],
        not:'Net etki sıfır — ama iki kayıt da görünür' },
      { hesap:'Satıcılar', kod:'320',
        borc:[{ ad:'Ters kayıt', tutar:60000 }],
        alacak:[{ ad:'Orijinal kayıt', tutar:60000 }],
        not:'Açık kalem de otomatik kapanır' },
    ],

    notlar:[
      { tip:'warn', baslik:'Ters kayıt tarihi nereye düşer?', metin:
        '{{FB08}}’de **iptal nedeni** (reversal reason) ters kaydın hangi tarihe düşeceğini belirler:\n\n' +
        '• **Neden 01** — orijinal belge tarihine düşer (aynı döneme).\n' +
        '• **Neden 02** — girilen alternatif tarihe düşer (farklı döneme).\n\n' +
        'Orijinal dönem kapalıysa neden 01 çalışmaz; alternatif tarih gerektiren bir neden seçilmelidir. ' +
        'Bu ayrım, ay sonu kapanışlarında sık karşılaşılan bir engeldir.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'Belge kaydında çeşitlenme dört eksende olur: **giriş ekranı** (klasik mi enter view mi), ' +
      '**belge durumu** (park mı, kalıcı mı), **belge türü** ve **düzeltme yöntemi**.',

    liste:[
      { ad:'Klasik giriş', en:'Classic Entry — F-02',
        aciklama:'Satır satır ilerler; her satır için {{kayit-anahtari}} ve hesap **elle** girilir. ' +
                 'Sonraki satıra geçmeden mevcut satır tamamlanır.',
        neZaman:'Özel ana muhasebe kayıtlarında, karmaşık çok satırlı belgelerde, ' +
                'kayıt anahtarının bilinçli seçilmesi gerektiğinde.',
        ornek:'Kayıt anahtarı 40 (G/L borç) → hesap → tutar → Enter → kayıt anahtarı 50 (G/L alacak) → …',
        tcodes:['F-02','F-43','FB01'] },

      { ad:'Enter view (tablo görünümü)', en:'Enter View — FB50 / FB60 / FB70',
        aciklama:'Tüm satırlar tek ekranda tablo hâlinde girilir. Kayıt anahtarı **sorulmaz**; ' +
                 'borç/alacak seçilir, sistem anahtarı arka planda belirler.',
        neZaman:'Günlük rutin kayıtlarda. Klasik girişten belirgin şekilde hızlıdır.',
        ornek:'{{FB50}} G/L, {{FB60}} satıcı faturası, {{FB70}} müşteri faturası.',
        tcodes:['FB50','FB60','FB70','FB65','FB75'] },

      { ad:'Park edilmiş belge', en:'Parked Document',
        aciklama:'Belge saklanır ama **muhasebeleşmez**. Bakiye denk olmasa bile kaydedilebilir; ' +
                 'hiçbir hesap etkilenmez, bakiyelere girmez.',
        neZaman:'Onay bekleyen belgelerde, eksik bilgi varken, dört-göz prensibinde.',
        ornek:'{{FV50}} ile park edilir, {{FBV0}} ile muhasebeleştirilir. Park aşamasında **tutar dâhil her alan** değiştirilebilir.',
        tcodes:['FV50','FV60','FBV0','FBV2','FBV4'] },

      { ad:'Hold (geçici saklama)', en:'Held Document',
        aciklama:'Belge kullanıcının kendi ekranında geçici olarak saklanır. Belge numarası **verilmez**, ' +
                 'başka kullanıcı göremez, hiçbir tabloya kalıcı yazılmaz.',
        neZaman:'"Yarım kaldım, sonra devam edeceğim" durumunda. Onay akışı için **uygun değildir**.',
        ornek:'Ekranda *Belge → Beklet* ile saklanır; kullanıcı kendi ekranından geri çağırır.' },

      { ad:'Tekrarlayan kayıt', en:'Recurring Entry',
        aciklama:'Şablon bir belge tanımlanır ({{FBD1}}), belirli aralıklarla ({{F.14}}) otomatik üretilir.',
        neZaman:'Kira, sigorta, abonelik gibi her ay aynı tutarla tekrarlayan kayıtlarda.',
        ornek:'Aylık 50.000 TL kira → şablon bir kez tanımlanır, 12 ay otomatik üretilir.',
        tcodes:['FBD1','F.14','FAGLGA35'] },

      { ad:'Ters kayıt (iptal)', en:'Reversal — FB08',
        aciklama:'Muhasebeleşmiş belgeyi **silmez**; tersini kaydederek etkisini sıfırlar. ' +
                 'İki belge de kayıtlarda kalır ve birbirine bağlanır.',
        neZaman:'Yanlış kaydedilmiş her belgede. Muhasebede tek doğru düzeltme yöntemidir.',
        ornek:'{{FB08}} tek belge, {{F.80}} toplu ters kayıt.',
        tcodes:['FB08','F.80'] },

      { ad:'Belge değiştirme', en:'Change Document — FB02',
        aciklama:'Kaydedilmiş belgede **yalnızca değiştirilebilir alanlar** güncellenir: vade, ' +
                 '{{odeme-blogu}}, metin, atama. **Tutar ve hesap değiştirilemez.**',
        neZaman:'Vade düzeltmesi, ödeme bloğu koyma/kaldırma, açıklama ekleme.',
        ornek:'{{FB02}} belge bazında, {{FB09}} tek kalem bazında hızlı değişiklik.',
        tcodes:['FB02','FB09'] },
    ],

    karsilastirmaBasliklar:['Park (Park)', 'Beklet (Hold)'],
    karsilastirma:[
      ['Belge numarası', '**Verilir** — numara tüketilir', 'Verilmez'],
      ['Tabloya yazılır mı', 'Evet — {{BKPF}}/{{BSEG}}’e park durumuyla', 'Hayır — geçici saklama'],
      ['Başkası görebilir mi', '**Evet** — iş listesinde görünür', 'Hayır — yalnızca sahibi'],
      ['Denge zorunlu mu', 'Hayır — dengesiz park edilebilir', 'Hayır'],
      ['Onay akışı', '**Destekler** ({{FBV4}})', 'Desteklemez'],
      ['Raporlarda görünür mü', 'Park edilmiş belge raporlarında', 'Hiçbir yerde'],
      ['Ne zaman kullanılır', 'Onay bekleyen gerçek belgeler', '"Yarım kaldım, sonra bakarım"'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'FB03', ad:'Belge görüntüleme — FI’ın röntgen cihazı',
        amac:'Bir FI belgesini başlığı, kalemleri, vergi satırları ve bağlı belgeleriyle gösterir.',
        neZaman:'Her hata analizinde, her mutabakatta, "bu rakam nereden geldi?" sorusunun sorulduğu her anda.',
        adimlar:[
          { baslik:'Şirket kodu, belge numarası ve mali yılı gir',
            aciklama:'Bu üçlü {{BKPF}}’nin birincil anahtarıdır ve belgeyi tekil olarak belirler.' },
          { baslik:'Kalem listesini incele; satıra çift tıklayarak detaya in' },
          { baslik:'*Belge başlığı* düğmesi',
            aciklama:'{{belge-turu}}, tarihler, kullanıcı, referans ve **`AWKEY`** (kaynak belge) burada.' },
          { baslik:'*Ortam → Belge akışı / İlgili belgeler*',
            aciklama:'Belgenin hangi MM/SD belgesinden doğduğunu ve hangi CO belgesini ürettiğini gösterir.' },
          { baslik:'*Ortam → Değişiklik belgeleri*',
            aciklama:'Kimin neyi ne zaman değiştirdiği — {{CDHDR}}/{{CDPOS}} tablolarından.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş', islem:'Şirket kodu 1000 · Belge 1900000234 · Mali yıl 2026' },
          { ekran:'Kalem listesi', islem:'3 satır; borç/alacak toplamı altta' },
          { ekran:'Kalem detayı', islem:'Vade, atama, maliyet yeri, vergi kodu, ödeme bloğu' },
          { ekran:'Belge başlığı', islem:'BLART = KR · AWTYP = RMRP → MIRO’dan geldi' },
        ],
        alanlar:{ zorunlu:['Şirket kodu','Belge numarası','Mali yıl'], opsiyonel:['Görüntüleme düzeni'] },
        hatalar:[
          { mesaj:'Document ... does not exist in company code ...', sebep:'Belge başka şirket kodunda veya başka mali yılda.', cozum:'Mali yılı değiştirerek dene; emin değilsen {{SE16N}} ile {{BKPF}}’de ara.' },
          { mesaj:'No authorization to display documents', sebep:'F_BKPF_BUK yetki nesnesi eksik.', cozum:'{{SU53}} çalıştırıp çıktıyı yetki ekibine ilet.' },
        ],
        ipucu:'Belge numarasını bilmiyorsan {{FBL1N}}/{{FBL3N}}/{{FBL5N}} raporundan satıra çift tıklayarak ' +
              'da buraya düşersin. Pratikte belge numarası ezberlenmez, rapordan gidilir.',
        ilgili:['FB02','FB08','FBL3N','SE16N'] },

      { kod:'FB08', ad:'Belge iptali (ters kayıt)',
        amac:'Muhasebeleşmiş belgeyi silmeden, tersini kaydederek etkisini sıfırlar.',
        neZaman:'Yanlış kaydedilmiş her belgede. Muhasebede tek doğru düzeltme yöntemidir.',
        adimlar:[
          { baslik:'Şirket kodu, belge numarası ve mali yılı gir' },
          { baslik:'**İptal nedenini** seç — en kritik alan',
            aciklama:'**01** orijinal belge tarihine düşer (aynı dönem). **02** girilen alternatif tarihe düşer ' +
                     '(farklı dönem). Orijinal dönem kapalıysa 01 çalışmaz.' },
          { baslik:'Gerekirse kayıt tarihi ve dönemi gir',
            aciklama:'Yalnızca alternatif tarih gerektiren nedenlerde açılır.' },
          { baslik:'*Görüntüle before reversal* ile kontrol et, sonra kaydet',
            aciklama:'Ters kayıt yeni bir belge numarası alır; orijinalin `STBLG` alanına yazılır.' },
        ],
        alanlar:{
          zorunlu:['Şirket kodu','Belge numarası','Mali yıl','İptal nedeni'],
          opsiyonel:['Kayıt tarihi','Kayıt dönemi'] },
        hatalar:[
          { mesaj:'Reversal not possible — document contains cleared items', sebep:'Belgenin kalemleri kapatılmış (ödenmiş).', cozum:'Önce {{FBRA}} ile kapatmayı geri al, sonra ters kaydet.' },
          { mesaj:'Posting period ... is not open', sebep:'İptal nedeni 01 seçildi ama orijinal dönem kapalı.', cozum:'Alternatif tarih gerektiren bir neden seç ve açık bir döneme yönlendir.' },
          { mesaj:'Document was already reversed with document ...', sebep:'Belge zaten ters kaydedilmiş.', cozum:'{{FB03}} ile `STBLG` alanına bak; ikinci kez ters kaydetmeye gerek yok.' },
          { mesaj:'Reversal of document from MM/SD not possible in FI', sebep:'Belge MM veya SD’den doğmuş.', cozum:'Kaynak modülden iptal et: {{MIRO}} faturası için MR8M, SD faturası için VF11. FI’dan iptal, kaynak belgeyi tutarsız bırakır.' },
        ],
        ipucu:'MM veya SD’den gelen belgeleri **FI’dan iptal etme**. `AWTYP` alanı kaynağı gösterir; ' +
              'RMRP ise MIRO, VBRK ise SD faturasıdır ve iptal kaynak modülden yapılmalıdır. ' +
              'Aksi hâlde MM/SD tarafı "faturalanmış" görünmeye devam eder.',
        ilgili:['F.80','FBRA','FB03','FB02'] },

      { kod:'FB02', ad:'Belge değiştirme',
        amac:'Kaydedilmiş belgede yalnızca **değiştirilebilir alanları** günceller.',
        neZaman:'Vade düzeltmesi, {{odeme-blogu}} koyma/kaldırma, metin ve atama ekleme.',
        adimlar:[
          { baslik:'Şirket kodu, belge numarası ve mali yılı gir' },
          { baslik:'Değiştirilecek kaleme çift tıkla' },
          { baslik:'Açık (değiştirilebilir) alanları güncelle',
            aciklama:'**Tutar, hesap, borç/alacak yönü ve şirket kodu değiştirilemez** — bunlar için ters kayıt gerekir.' },
          { baslik:'Kaydet — değişiklik {{CDHDR}}/{{CDPOS}}’a yazılır' },
        ],
        hatalar:[
          { mesaj:'Field ... cannot be changed', sebep:'Alan değiştirilebilir alanlar listesinde değil.', cozum:'Tutar/hesap değişikliği için {{FB08}} ile ters kaydet ve doğrusunu gir. Alan kuralları IMG’de "Belge Değişiklik Kuralları"nda tanımlıdır.' },
          { mesaj:'Document is already cleared', sebep:'Kapatılmış kalemde bazı alanlar kilitlenir.', cozum:'Gerekirse {{FBRA}} ile kapatmayı aç, değişikliği yap, yeniden kapat.' },
        ],
        ipucu:'Tek bir kalemde hızlı değişiklik için {{FB09}} daha pratiktir — doğrudan kalem ekranına açar.',
        ilgili:['FB09','FB03','FB08'] },

      { kod:'OBA7', ad:'Belge türü tanımı',
        amac:'{{belge-turu}}’nü, izin verdiği hesap tiplerini ve bağlı {{numara-araligi}}’nı tanımlar.',
        neZaman:'Kurulumda ve "bu türle şu hesaba neden kayıt yapamıyorum?" sorusunda.',
        adimlar:[
          { baslik:'Belge türünü seç veya yeni oluştur' },
          { baslik:'Numara aralığı anahtarını ata',
            aciklama:'Birden çok tür aynı aralığı paylaşabilir; bu, numara sürekliliği açısından bilinçli bir tercihtir.' },
          { baslik:'İzin verilen hesap tiplerini işaretle',
            aciklama:'**S** ana muhasebe, **D** müşteri, **K** satıcı, **A** duran varlık, **M** malzeme. ' +
                     'İşaretlenmeyen tipe kayıt yapılamaz — yapısal bir kontroldür.' },
          { baslik:'Ters kayıt belge türünü belirle',
            aciklama:'Boş bırakılırsa aynı tür kullanılır.' },
        ],
        ipucu:'Standart türleri (KR, DR, SA, AB…) değiştirmek yerine kopyalayıp **Z ile başlayan** ' +
              'kendi türünü oluştur. Yükseltmelerde standart tanımların üzerine yazılma riski ortadan kalkar.',
        hatalar:[
          { mesaj:'Account type K is not allowed for document type SA', sebep:'Belge türü satıcı hesabına izin vermiyor.', cozum:'Doğru türü kullan (KR) veya {{OBA7}}’de hesap tipini işaretle — ikincisi kontrolü zayıflatır, dikkatli düşün.' },
        ],
        ilgili:['FBN1','OB41','FB50'] },

      { kod:'FBN1', ad:'FI belge numara aralığı',
        amac:'Şirket kodu ve mali yıl bazında belge numara aralıklarını tanımlar.',
        neZaman:'Kurulumda ve **her yıl sonunda** yeni yıl aralıklarını açmak için.',
        adimlar:[
          { baslik:'Şirket kodunu gir ve *Aralıklar* düğmesine bas' },
          { baslik:'Yeni mali yıl için satır ekle',
            aciklama:'Aralık anahtarı + yıl + alt sınır + üst sınır. Aralıklar **çakışmamalıdır**.' },
          { baslik:'İç veya dış atama seç',
            aciklama:'İç atamada sistem numarayı verir; dış atamada kullanıcı girer ve tekillik kontrol edilir.' },
          { baslik:'Toplu kopyalama için {{OBH1}} kullan',
            aciklama:'Mevcut yılın tüm aralıklarını yeni yıla tek işlemde kopyalar — yılbaşı rutininin standart adımı.' },
        ],
        hatalar:[
          { mesaj:'Document number ... was already assigned', sebep:'Sayaç ({{NRIV}} `NRLEVEL`) mevcut en yüksek belge numarasının altında — genelde veri geçişi sonrası.', cozum:'{{FBN1}} ile aralığın güncel numarasını mevcut en yüksek belgenin üstüne çek.' },
          { mesaj:'Number range ... does not exist for fiscal year ...', sebep:'Yeni yıl için aralık açılmamış.', cozum:'{{OBH1}} ile önceki yıldan kopyala. **Yılbaşında kaydın durmasının bir numaralı sebebidir.**' },
        ],
        ipucu:'Numara aralığı **tanımı** taşıma isteğiyle taşınabilir ama **güncel sayaç değeri taşınmaz**. ' +
              'Bu ayrımı bilmemek, canlıya geçişte numara çakışmasına yol açar.',
        ilgili:['OBH1','OBH2','OBA7','NRIV'] },

      { kod:'OB41', ad:'Kayıt anahtarı (posting key) tanımı',
        amac:'{{kayit-anahtari}}’nın borç/alacak yönünü, izin verdiği {{hesap-tipi}}ni ve {{alan-durumu}}nu belirler.',
        neZaman:'Kurulumda ve "bu alan neden zorunlu/gizli?" sorusunun kaynağını ararken.',
        adimlar:[
          { baslik:'Kayıt anahtarını seç',
            aciklama:'Standartlar: **40** G/L borç, **50** G/L alacak, **31** satıcı alacak, **21** satıcı borç, ' +
                     '**01** müşteri borç, **15** müşteri alacak, **70** varlık borç, **75** varlık alacak.' },
          { baslik:'Borç/alacak göstergesini ve hesap tipini kontrol et' },
          { baslik:'*Alan durumu* düğmesiyle alan gruplarını ayarla',
            aciklama:'Hesabın alan durumu grubuyla birlikte değerlendirilir; **en kısıtlayıcı kazanır**.' },
        ],
        ipucu:'Standart kayıt anahtarlarını değiştirme. Bunlar SAP genelinde ve tüm otomatik ' +
              'kayıtlarda kullanılır; değiştirmek beklenmedik yan etkiler doğurur.',
        ilgili:['OBA7','FS00','FB50'] },

      { kod:'OB52', ad:'Kayıt dönemi açma / kapama',
        amac:'Hangi dönemlerin hangi {{hesap-tipi}} için açık olduğunu belirler.',
        neZaman:'Her ay sonu kapanışında ve "posting period not open" hatasında.',
        adimlar:[
          { baslik:'Dönem varyantını seç',
            aciklama:'Şirket kodu bir dönem varyantına atanmıştır ({{OBY6}}); birden çok şirket aynı varyantı paylaşabilir.' },
          { baslik:'Hesap tipi satırlarını ayrı ayrı ayarla',
            aciklama:'**+** tüm tipler, **S** ana muhasebe, **D** müşteri, **K** satıcı, **A** duran varlık, **M** malzeme. ' +
                     'Her satır bağımsızdır — S’yi açmak D’yi açmaz.' },
          { baslik:'İki dönem aralığı gir',
            aciklama:'**1. aralık** normal kullanıcılar için, **2. aralık** yetki grubu olan kullanıcılar için ' +
                     '(kapanış ekibinin ayrıcalıklı erişimi böyle sağlanır).' },
        ],
        hatalar:[
          { mesaj:'Posting period 011 2026 is not open for account type K', sebep:'Yalnızca S satırı açılmış.', cozum:'**K** satırında da dönemi aç. Hesap tipleri ayrı ayrı yönetilir — en sık yapılan hatadır.' },
        ],
        ipucu:'Ay sonunda dönemi kapatırken **tüm hesap tiplerini** kapat. Yalnızca S kapatılırsa ' +
              'satıcı ve müşteri kayıtları girmeye devam eder ve kapanış tutarları değişir.',
        ilgili:['OBY6','FB50','T001B'] },

      { kod:'OB28', ad:'Doğrulama (validation) tanımla',
        amac:'Kayıt sırasında özel iş kuralları uygular; kural sağlanmazsa hata veya uyarı verir.',
        neZaman:'Standart kontrollerin yetmediği şirkete özgü kurallarda.',
        adimlar:[
          { baslik:'Uygulama alanını ve çağrı noktasını seç',
            aciklama:'Çağrı noktası: **1** belge başlığı, **2** kalem, **3** tam belge. ' +
                     'Kural neyi kontrol edecekse ona uygun nokta seçilir.' },
          { baslik:'Ön koşul (prerequisite) tanımla',
            aciklama:'"Şirket kodu 1000 ve hesap 770000 ise" gibi — kuralın ne zaman çalışacağı.' },
          { baslik:'Kontrol (check) tanımla', aciklama:'"Maliyet yeri 1000–1999 aralığında olmalı" gibi.' },
          { baslik:'Mesaj tipini belirle: hata (E) veya uyarı (W)' },
        ],
        ipucu:'Doğrulama **engeller**, {{OBBH}} yerine koyma **düzeltir**. Kullanıcıya iş yükü ' +
              'bindirmek yerine otomatik doldurulabilecek bir alan varsa yerine koyma tercih edilmelidir.',
        ilgili:['OBBH','OBA5','FB50'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'Belge kaydının tablo yapısı FI’ın çekirdeğidir: **başlık + kalem + evrensel defter**, ' +
      'artı yapılandırmayı taşıyan üç tablo ({{T003}}, {{TBSL}}, {{NRIV}}).',

    liste:[
      { ad:'BKPF', baslik:'Belge başlığı',
        tutar:'Belgenin kimliği ve kaynağı: numara, tür, tarihler, para birimi, kullanıcı, referans, ' +
              'kaynak belge anahtarı, ters kayıt bağlantısı.',
        olusturan:'Muhasebeleşen her işlem',
        guncelleyen:'Kayıt işlemleri; {{FB08}} `STBLG` alanını doldurur',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'{{BSEG}} ile 1-n; `AWKEY` üzerinden MM/SD kaynak belgesine köprü.',
        s4:'Yapısı korundu; raporlama {{ACDOCA}}’ya taşındı.',
        alanlar:[
          { ad:'BLART', aciklama:'{{belge-turu}}' },
          { ad:'BUDAT', aciklama:'**Kayıt tarihi — dönemi belirler.** En kritik alan.' },
          { ad:'BLDAT', aciklama:'Belge tarihi — faturanın üstündeki tarih' },
          { ad:'MONAT', aciklama:'Kayıt dönemi — BUDAT’tan türetilir' },
          { ad:'STBLG', aciklama:'**Ters kayıt belgesi** — doluysa bu belge iptal edilmiştir' },
          { ad:'AWTYP / AWKEY', aciklama:'Kaynak belge tipi ve anahtarı — entegrasyon izini verir' },
          { ad:'USNAM / CPUDT', aciklama:'Kaydeden kullanıcı ve giriş tarihi — denetim izi' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri',
        tutar:'Satır bazında hesap, tutar, borç/alacak yönü, kayıt anahtarı ve ek boyutlar.',
        olusturan:'{{BKPF}} ile eşzamanlı',
        guncelleyen:'Kayıt işlemleri; {{FB02}} değiştirilebilir alanları; kapatma `AUGBL` alanını',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{SKB1}} hesap, {{LFA1}}/{{KNA1}} iş ortağı, {{ANLA}} varlık bağlantısı.',
        s4:'Cluster tablodur (RFBLG içinde); doğrudan sorgulanması yavaştır. Raporlar {{ACDOCA}}’dan okur.',
        alanlar:[
          { ad:'BUZEI', aciklama:'Kalem numarası — **3 hane, azami 999 kalem**' },
          { ad:'BSCHL', aciklama:'{{kayit-anahtari}}' },
          { ad:'SHKZG', aciklama:'S = borç (Soll), H = alacak (Haben)' },
          { ad:'HKONT', aciklama:'Ana muhasebe hesabı' },
          { ad:'AUGBL', aciklama:'Kapatma belgesi — boşsa kalem açık' },
        ] },

      { ad:'ACDOCA', baslik:'Evrensel Kayıt Defteri',
        tutar:'Aynı kalemler evrensel formatta; her aktif {{defter}} için ayrı satır kümesi.',
        olusturan:'Muhasebeleşen her işlem',
        guncelleyen:'Tüm FI ve CO işlemleri',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{BKPF}} ile belge numarası üzerinden.',
        s4:'S/4HANA’nın tek gerçek kaynağı.',
        alanlar:[
          { ad:'DOCLN', aciklama:'**6 haneli kalem numarası** — {{BSEG}}’in 999 sınırını aşar' },
          { ad:'RLDNR', aciklama:'{{defter}} — aynı belge her defterde ayrı satırlarla' },
        ] },

      { ad:'T003', baslik:'Belge türü tanımı',
        tutar:'Belge türünün adı, numara aralığı anahtarı, izin verilen hesap tipleri, ters kayıt türü.',
        olusturan:'{{OBA7}}',
        guncelleyen:'{{OBA7}}',
        anahtar:'BLART',
        iliskiler:'{{BKPF}}.BLART buraya işaret eder; `NUMKR` alanı {{NRIV}}’e bağlanır.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'NUMKR', aciklama:'Numara aralığı anahtarı' },
          { ad:'XKOAA / XKOAD / XKOAK / XKOAM / XKOAS', aciklama:'İzin verilen hesap tipleri: A varlık, D müşteri, K satıcı, M malzeme, S ana muhasebe' },
        ] },

      { ad:'TBSL', baslik:'Kayıt anahtarı tanımı',
        tutar:'Her {{kayit-anahtari}}’nın borç/alacak yönü ve izin verdiği hesap tipi.',
        olusturan:'{{OB41}}',
        guncelleyen:'{{OB41}}',
        anahtar:'BSCHL',
        iliskiler:'{{BSEG}}.BSCHL buraya işaret eder.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'SHKZG', aciklama:'Borç/alacak göstergesi' },
          { ad:'KOART', aciklama:'Hesap tipi' },
        ] },

      { ad:'NRIV', baslik:'Numara aralığı sayaçları',
        tutar:'Her aralığın alt/üst sınırı ve **güncel sayaç değeri**.',
        olusturan:'{{FBN1}}',
        guncelleyen:'Her belge kaydı sayacı bir artırır',
        anahtar:'OBJECT + SUBOBJECT + NRRANGENR + TOYEAR',
        iliskiler:'{{T003}}.NUMKR buraya bağlanır.',
        s4:'Değişmedi. **Veri geçişi sonrası sayaç güncellenmezse numara çakışması yaşanır.**',
        alanlar:[
          { ad:'NRLEVEL', aciklama:'**Güncel sayaç** — sonraki belge bunun üstünden alınır' },
          { ad:'FROMNUMBER / TONUMBER', aciklama:'Aralık sınırları' },
        ] },

      { ad:'T001B', baslik:'Kayıt dönemi açık/kapalı tanımı',
        tutar:'{{OB52}}’de girilen dönem açma/kapama satırları; hesap tipi bazında.',
        olusturan:'{{OB52}}',
        guncelleyen:'{{OB52}}',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'KOART', aciklama:'Hesap tipi (+, S, D, K, A, M)' },
          { ad:'FRPE1 / TOPE1', aciklama:'1. dönem aralığı — normal kullanıcılar' },
          { ad:'FRPE2 / TOPE2', aciklama:'2. dönem aralığı — yetki grubu olanlar' },
        ] },

      { ad:'CDHDR', baslik:'Değişiklik belgesi başlığı',
        tutar:'Bir belgede kim, ne zaman değişiklik yaptı.',
        olusturan:'{{FB02}}, {{FB09}} ve ana veri değişiklikleri',
        guncelleyen:'Her değişiklik işlemi',
        anahtar:'OBJECTCLAS + OBJECTID + CHANGENR',
        iliskiler:'{{CDPOS}} ile alan bazında detay.',
        s4:'Değişmedi.' },
    ],

    er:{
      type:'er',
      baslik:'Belge kaydının tablo yapısı ve yapılandırma bağları',
      varliklar:[
        { ad:'T003', rol:'Yapılandırma', aciklama:'Belge türü tanımı',
          alanlar:[{ ad:'BLART', tip:'pk' }, { ad:'NUMKR' }, { ad:'XKOAK' }] },
        { ad:'NRIV', rol:'Yapılandırma', aciklama:'Numara aralığı sayacı',
          alanlar:[{ ad:'NRRANGENR', tip:'pk' }, { ad:'TOYEAR', tip:'pk' }, { ad:'NRLEVEL' }] },
        { ad:'T001B', rol:'Yapılandırma', aciklama:'Dönem kontrolü',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'KOART', tip:'pk' }, { ad:'FRPE1' }] },
        { ad:'BKPF', rol:'Başlık', hub:true, aciklama:'Belge kimliği',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }, { ad:'BLART', tip:'fk' }, { ad:'BUDAT' }, { ad:'STBLG' }] },
        { ad:'BSEG', rol:'Kalem', aciklama:'Belge satırları',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'BSCHL', tip:'fk' }, { ad:'HKONT', tip:'fk' }] },
        { ad:'TBSL', rol:'Yapılandırma', aciklama:'Kayıt anahtarı',
          alanlar:[{ ad:'BSCHL', tip:'pk' }, { ad:'SHKZG' }, { ad:'KOART' }] },
        { ad:'ACDOCA', rol:'Evrensel', aciklama:'S/4HANA kalemleri',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }] },
        { ad:'CDPOS', rol:'Denetim', aciklama:'Alan bazında değişiklik',
          alanlar:[{ ad:'OBJECTID', tip:'fk' }, { ad:'FNAME' }, { ad:'VALUE_NEW' }] },
      ],
      iliskiler:[
        { from:'T003', to:'BKPF', alanlar:'BLART', not:'belge türü' },
        { from:'T003', to:'NRIV', alanlar:'NUMKR → NRRANGENR', not:'numara aralığı' },
        { from:'T001B', to:'BKPF', alanlar:'BUKRS + dönem', not:'dönem kontrolü' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'başlık → kalem' },
        { from:'TBSL', to:'BSEG', alanlar:'BSCHL', not:'kayıt anahtarı' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR + GJAHR', not:'evrensel görünüm' },
        { from:'BKPF', to:'CDPOS', alanlar:'BELNR → OBJECTID', not:'değişiklik izi' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Belge kaydı ekranları iki bloktan oluşur: **başlık** ve **kalem tablosu**. ' +
      'Alan mantığını bir kez kavradığında {{FB50}}, {{FB60}}, {{FB70}} ve diğerleri tanıdık gelir — ' +
      'hepsi aynı iskelettir.',

    ekranlar:[
      { ad:'Başlık bloğu — tarihlerin kritik olduğu yer',
        aciklama:'Ekranın üst kısmı. Buradaki iki tarih en çok hata yapılan alanlardır.',
        alanlar:[
          { ad:'Belge tarihi (`BLDAT`)', zorunlu:true, aciklama:'Faturanın/dekontun üstündeki tarih. Raporlamada referanstır ama **dönemi belirlemez**.' },
          { ad:'Kayıt tarihi (`BUDAT`)', zorunlu:true, aciklama:'**Muhasebe dönemini belirleyen tarih.** Varsayılan bugündür; geçmiş döneme kayıt için elle değiştirilir.' },
          { ad:'Şirket kodu (`BUKRS`)', zorunlu:true, aciklama:'Hangi yasal birime kayıt yapılıyor.' },
          { ad:'{{belge-turu}} (`BLART`)', zorunlu:false, aciklama:'İşlem koduna göre varsayılan gelir; genelde değiştirilmez.' },
          { ad:'Referans (`XBLNR`)', zorunlu:false, aciklama:'Dış belge numarası. AP’de mükerrer fatura kontrolünü tetikler.' },
          { ad:'Belge başlık metni (`BKTXT`)', zorunlu:false, aciklama:'Belgenin tamamını açıklayan serbest metin.' },
          { ad:'Para birimi / Kur', zorunlu:true, aciklama:'Yerel para dışındaysa kur alanı açılır; boş bırakılırsa {{TCURR}}’dan çekilir.' },
        ],
        ipucu:'Kayıt tarihini değiştirdiğinde **dönem göstergesinin de değiştiğini** kontrol et. ' +
              'Aralık faturasını Ocak’ta girerken bu alanı atlamak, mali tabloları bozan klasik hatadır.' },

      { ad:'Kalem tablosu',
        aciklama:'Her satır bir {{BSEG}} kalemine dönüşür.',
        alanlar:[
          { ad:'G/L hesabı (`HKONT`)', zorunlu:true, aciklama:'{{mutabakat-hesabi}} girilirse hata alınır.' },
          { ad:'B/A (borç-alacak)', zorunlu:true, aciklama:'Arka planda {{kayit-anahtari}}’na dönüşür: borç 40, alacak 50.' },
          { ad:'Tutar', zorunlu:true, aciklama:'Belge para biriminde.' },
          { ad:'Vergi kodu (`MWSKZ`)', zorunlu:false, aciklama:'Hesabın vergi kategorisi zorunlu kılıyorsa istenir; girildiğinde vergi satırı otomatik eklenir.' },
          { ad:'{{maliyet-yeri}} (`KOSTL`)', zorunlu:false, aciklama:'Gider hesaplarında {{alan-durumu}} genelde zorunlu kılar.' },
          { ad:'Atama (`ZUONR`)', zorunlu:false, aciklama:'Sıralama anahtarından otomatik dolar; {{F.13}} kapatması için kritiktir.' },
          { ad:'Metin (`SGTXT`)', zorunlu:false, aciklama:'Satır açıklaması. Raporlarda çok işe yarar; boş bırakmamak iyi alışkanlıktır.' },
        ] },

      { ad:'Simülasyon ekranı',
        aciklama:'*Belge → Simüle et* ile açılır. Kaydetmeden önceki son kontrol noktası.',
        alanlar:[
          { ad:'Tam satır listesi', zorunlu:false, aciklama:'Senin girdiğin satırlar + sistemin ekledikleri: vergi, {{belge-bolme}}, kur farkı.' },
          { ad:'Bakiye göstergesi', zorunlu:false, aciklama:'Sıfır olmalı; değilse kayıt yapılamaz.' },
        ],
        ipucu:'{{belge-bolme}} açık sistemlerde 2 satırlık girdinin 6 satıra dönüştüğünü **yalnızca burada** ' +
              'görürsün. Kaydetmeden önce her zaman simüle et.' },

      { ad:'{{FB08}} — ters kayıt ekranı',
        aciklama:'Düzeltmenin yapıldığı yer. İptal nedeni seçimi kritiktir.',
        alanlar:[
          { ad:'Belge numarası / Şirket kodu / Mali yıl', zorunlu:true, aciklama:'İptal edilecek belge.' },
          { ad:'**İptal nedeni**', zorunlu:true, aciklama:'**01** orijinal tarihe (aynı dönem), **02** alternatif tarihe (farklı dönem). Orijinal dönem kapalıysa 01 çalışmaz.' },
          { ad:'Kayıt tarihi / dönem', zorunlu:false, aciklama:'Yalnızca alternatif tarih gerektiren nedenlerde açılır.' },
        ] },
    ],

    zorunlu:['Belge tarihi','Kayıt tarihi','Şirket kodu','G/L hesabı','Borç/Alacak','Tutar'],
    opsiyonel:['Belge türü','Referans','Başlık metni','Vergi kodu','Maliyet yeri','Kâr merkezi','Atama','Satır metni','Vade'],

    hatalar:[
      { mesaj:'Posting period 011 2026 is not open for account type K', sebep:'{{OB52}}’de dönem satıcı hesap tipi için kapalı; genelde yalnızca S açılmıştır.', cozum:'Dönem varyantında **K** satırında da dönemi aç. Hesap tipleri **ayrı ayrı** yönetilir.' },
      { mesaj:'Account ... cannot be directly posted to', sebep:'Hesap {{mutabakat-hesabi}} ({{SKB1}} `MITKZ` dolu).', cozum:'Satıcı/müşteri üzerinden kaydet: {{FB60}} veya {{FB70}}.' },
      { mesaj:'Field Cost Center is a required field for G/L account ...', sebep:'{{alan-durumu}} zorunlu kılıyor.', cozum:'Maliyet yerini gir; kalıcı çözüm için {{OKB9}} ile varsayılan CO nesnesi tanımla.' },
      { mesaj:'Balance in transaction currency', sebep:'{{belge-denkligi}} sağlanmamış.', cozum:'Satırları kontrol et; belgeyi saklamak istiyorsan {{FV50}} ile park et.' },
      { mesaj:'Document number ... was already assigned', sebep:'{{NRIV}} sayacı mevcut en yüksek belgenin altında — genelde veri geçişi sonrası.', cozum:'{{FBN1}} ile sayacı güncelle.' },
      { mesaj:'Number range ... does not exist for fiscal year 2027', sebep:'Yeni yıl için aralık açılmamış.', cozum:'{{OBH1}} ile önceki yıldan kopyala. **Yılbaşı rutininin ilk maddesidir.**' },
      { mesaj:'Account type D is not allowed for document type SA', sebep:'{{belge-turu}} müşteri hesabına izin vermiyor.', cozum:'Doğru türü kullan (DR) veya {{OBA7}}’de hesap tipini işaretle.' },
      { mesaj:'Tax code A1 does not exist in company code 1000', sebep:'{{vergi-kodu}} o ülke için tanımlı değil.', cozum:'{{FTXP}} ile doğru ülke anahtarında tanımla veya doğru kodu kullan.' },
      { mesaj:'Ledger 0L: document splitting error — item not assigned', sebep:'{{belge-bolme}} kuralları satırı sınıflandıramadı.', cozum:'Belge bölme karakteristiklerini ve kalem kategorisi atamalarını IMG’de kontrol et.' },
      { mesaj:'Reversal not possible — document contains cleared items', sebep:'Kalemler kapatılmış.', cozum:'Önce {{FBRA}} ile kapatmayı geri al, sonra {{FB08}}.' },
    ],

    ipuclari:[
      '**Kaydetmeden önce her zaman simüle et.** Sistemin ekleyeceği satırları görmek, ters kayıt zahmetinin çoğunu önler.',
      'Alan adının teknik karşılığı için **F1 → Teknik bilgi**. Tablo ve alan adını öğrenmeden {{SE16N}} sorgusu yazma.',
      'Rutin kayıtlar için **hesap atama şablonu** (account assignment model) veya tekrarlayan kayıt ({{FBD1}} + {{F.14}}) kur.',
      'Yılbaşı rutini: {{OBH1}} ile tüm numara aralıklarını yeni yıla kopyala. Aralıksız kayıt yapılamaz.',
      'Ay sonu dönem kapatırken **tüm hesap tiplerini** kapat; yalnızca S kapatmak yetmez.',
      'MM/SD’den gelen belgeleri FI’dan iptal etme. {{FB03}} → belge başlığı → `AWTYP` alanına bak; ' +
      'kaynak modülden iptal edilmelidir.',
      'Yanlış kayıt için sırayla düşün: **kapatılmış mı?** ({{FBRA}} gerekir) → **kaynak MM/SD mi?** ' +
      '(oradan iptal) → değilse {{FB08}}.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'1 başlık satırı — numara, tür, tarihler, kullanıcı, kaynak referansı' },
      { tablo:'BSEG', ne:'Her giriş satırı için 1 kalem + sistemin eklediği vergi/bölme satırları' },
      { tablo:'ACDOCA', ne:'Aynı kalemler evrensel formatta; her aktif defter için ayrı satır kümesi' },
      { tablo:'BSET', ne:'Vergi kodu varsa vergi satırları (matrah, vergi tutarı, hesap anahtarı)' },
      { tablo:'BSIS / BSIK / BSID', ne:'Açık kalem yönetimli hesaplarda indeks kaydı' },
      { tablo:'NRIV', ne:'Numara sayacı (`NRLEVEL`) bir artırılır' },
      { tablo:'CDHDR / CDPOS', ne:'{{FB02}} ile değişiklik yapıldıysa denetim izi' },
    ],

    commit:
      'Kaydet tuşuna basıldığında tüm yazma işlemleri tek bir **LUW** (Logical Unit of Work) içinde ' +
      'toplanır ve `COMMIT WORK` ile atomik olarak yazılır: ya hepsi ya hiçbiri.\n\n' +
      '**Ama numara ataması ayrı çalışır.** Numara aralığı sayacı ({{NRIV}}), ana LUW’dan bağımsız bir ' +
      'işlemde artırılır. Sonucu: **iptal edilen bir kayıtta bile belge numarası tüketilmiş olabilir** ' +
      've numaralarda boşluk oluşur. Bu normaldir, hata değildir — denetçiye de böyle açıklanır.\n\n' +
      'Asenkron güncelleme takılırsa "belge numarası verildi ama kayıt yok" durumu oluşur; ' +
      '{{SM13}} ile bakılır.',

    belgeNo:
      'Zincir: **{{belge-turu}} → {{T003}}.NUMKR (numara aralığı anahtarı) → {{NRIV}}’deki ' +
      'şirket kodu + mali yıl satırı → `NRLEVEL` bir artırılır → belge numarası.**\n\n' +
      'Numara **kaydetme anında** verilir, ekran açıldığında değil. ' +
      'İç atamada (internal) sistem verir; dış atamada (external) kullanıcı girer ve tekillik kontrol edilir.\n\n' +
      'FI’da aralık **şirket kodu + mali yıl** bazlıdır. Her yıl için ayrı satır gerekir.',

    postingLogic:
      'Kaydın izlediği yedi halkalı zincir:\n\n' +
      '**1. Dönem kontrolü** — `BUDAT`’tan dönem hesaplanır, {{T001B}}’de hesap tipi bazında bakılır.\n' +
      '**2. Belge türü** — {{T003}}’te izin verilen hesap tipleri kontrol edilir.\n' +
      '**3. Kayıt anahtarı** — borç/alacak seçimi {{TBSL}}’den anahtara dönüşür.\n' +
      '**4. Alan durumu** — hesabın grubu ({{SKB1}} `FSTAG`) + kayıt anahtarının alan durumu; ' +
      '**en kısıtlayıcı kazanır**.\n' +
      '**5. Doğrulama / yerine koyma** — {{OB28}} kuralları kontrol eder, {{OBBH}} alan doldurur.\n' +
      '**6. Denge kontrolü** — {{belge-denkligi}}; {{belge-bolme}} açıksa her defter ve boyut için ayrı.\n' +
      '**7. Numara ve yazma** — {{NRIV}}’den numara, sonra tablolar.',

    belgeTuru:
      '{{belge-turu}} üç şey belirler: izin verilen {{hesap-tipi}} kümesi, kullanılacak {{numara-araligi}} ' +
      've ters kayıt için varsayılan tür.\n\n' +
      'Standart türler: **SA** genel G/L, **AB** genel (tüm hesap tiplerine izin verir), ' +
      '**KR** satıcı faturası, **KG** satıcı alacak dekontu, **KZ** satıcı ödemesi, ' +
      '**DR** müşteri faturası, **DG** müşteri alacak dekontu, **DZ** müşteri tahsilatı, ' +
      '**RE** lojistik fatura, **RV** SD faturası, **WE** mal girişi, **AA** varlık kaydı, **AF** amortisman.',

    numberRange:
      'FI numara aralığı **şirket kodu + mali yıl** bazlıdır ve {{FBN1}} ile tanımlanır. ' +
      'Yeni mali yıl için satır açılmazsa yılbaşında kayıt durur; {{OBH1}} ile toplu kopyalanır.\n\n' +
      '**Kritik ayrım:** aralık *tanımı* taşıma isteğiyle taşınabilir ama **güncel sayaç değeri taşınmaz**. ' +
      'Veri geçişi sonrası sayaç güncellenmezse "Document number already assigned" hatası alınır.',

    accountDetermination:
      'Elle kayıtta hesabı kullanıcı girer. Sistem yalnızca **kendi eklediği satırlar** için ' +
      'hesap belirler: vergi satırı {{OB40}}, kur farkı ve fark hesapları IMG’deki otomatik kayıt ' +
      'ayarlarından, MM/SD’den gelen satırlar {{OBYC}}/{{VKOA}}’dan. Hepsi {{T030}}’a yazar.',

    tur:
      '**Özelleştirme:** {{belge-turu}} tanımları ({{OBA7}}), {{numara-araligi}} tanımı ({{FBN1}}), ' +
      '{{kayit-anahtari}} ({{OB41}}), {{alan-durumu}} grupları ve varyantı, dönem kontrolü ({{OB52}}), ' +
      'doğrulama/yerine koyma ({{OB28}}/{{OBBH}}), belge değişiklik kuralları.\n\n' +
      '**Hareket verisi:** belgelerin kendisi.\n\n' +
      'Bu konuda ana veri yoktur — belge kaydı tamamen yapılandırma + hareket verisi konusudur.',

    transport:
      'Belge türleri, kayıt anahtarları, alan durumu grupları, doğrulama ve yerine koyma kuralları taşınır. ' +
      'Belgeler taşınmaz.\n\n' +
      '**İstisna:** {{numara-araligi}} tanımı taşınabilir ama **sayaç değeri taşınmaz** — ' +
      'her sistemde ayrıca kontrol edilmelidir.',

    img:[
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Belge Türleri → Başlık İçin Belge Türlerini Tanımla', not:'{{belge-turu}} ({{OBA7}})' },
      { yol:'SPRO → … → Belge → Belge Numara Aralıkları → Belge Numara Aralıklarını Tanımla', not:'{{numara-araligi}} ({{FBN1}})' },
      { yol:'SPRO → … → Belge → Kalem İçin Satır Kalemi Kontrolleri → Kayıt Anahtarlarını Tanımla', not:'{{kayit-anahtari}} ({{OB41}})' },
      { yol:'SPRO → … → Belge → Kayıt Dönemleri → Kayıt Dönemlerini Aç ve Kapat', not:'Dönem kontrolü ({{OB52}})' },
      { yol:'SPRO → … → Belge → Belge Başlığı/Kalemi İçin Alan Durumu Varyantlarını Tanımla', not:'{{alan-durumu}} varyantı' },
      { yol:'SPRO → … → Belge → Belge Değişiklik Kuralları → Belge Değişiklik Kurallarını Tanımla', not:'{{FB02}} ile hangi alanlar değiştirilebilir' },
      { yol:'SPRO → Finansal Muhasebe → Özel Amaçlı Defter → Araçlar → Doğrulama/Yerine Koyma', not:'{{OB28}} / {{OBBH}}' },
    ],

    ekstra:[
      { ic:'⚖️', baslik:'Alan durumu çakışması — en kısıtlayıcı kazanır', metin:
        '{{alan-durumu}} **iki kaynaktan** gelir ve ikisi birlikte değerlendirilir:\n\n' +
        '**1. Hesabın alan durumu grubu** ({{SKB1}} `FSTAG`) — "bu hesaba kayıt yapılırken hangi alanlar gerekli?"\n' +
        '**2. Kayıt anahtarının alan durumu** ({{OB41}}) — "bu tür bir satırda hangi alanlar gerekli?"\n\n' +
        'Çakışma kuralı: **en kısıtlayıcı olan kazanır.** Sıralama (kısıtlayıcıdan gevşeğe): ' +
        '**Gizli > Zorunlu > Opsiyonel**.\n\n' +
        'Yani biri "gizli" diyorsa diğeri "zorunlu" dese bile alan **görünmez**. ' +
        '"Bu alanı neden göremiyorum, oysa zorunlu olmalıydı?" sorusunun cevabı budur.\n\n' +
        'Üçüncü bir katman daha var: şirket kodunun **alan durumu varyantı** ({{OBY6}}), ' +
        'hangi grupların o şirkette kullanılabileceğini belirler.' },

      { ic:'🔢', baslik:'Numara boşlukları neden oluşur ve sorun mudur?', metin:
        'Belge numarası ana LUW’dan **bağımsız** bir işlemle atanır. Kullanıcı numarayı aldıktan sonra ' +
        'işlemi iptal ederse numara geri verilmez ve **boşluk** oluşur.\n\n' +
        'Bu SAP’ta normaldir. Denetçi "neden 1900000234 ile 1900000236 arasında 235 yok?" diye sorarsa ' +
        'cevap: iptal edilmiş bir giriş denemesi.\n\n' +
        'Boşluk kabul edilemez bir mevzuat varsa çözüm **dış numara atama** (external numbering) veya ' +
        'ayrı bir yasal numaralandırma katmanıdır — ama bu, performans ve kilitlenme maliyeti getirir.' },
    ],

    notlar:[
      { tip:'warn', baslik:'MM/SD belgesini FI’dan iptal etme', metin:
        '{{FB08}} teknik olarak MM/SD kaynaklı belgeleri de ters kaydedebilir ama bu **yanlıştır**: ' +
        'FI tarafı düzelir, MM/SD tarafı "faturalanmış" görünmeye devam eder ve iki modül tutarsızlaşır.\n\n' +
        'Doğrusu kaynak modülden iptaldir: {{MIRO}} faturası için **MR8M**, SD faturası için **VF11**. ' +
        '{{FB03}} → belge başlığı → `AWTYP` alanı kaynağı söyler.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Belge kaydının **mantığı değişmedi** — yedi kontrol zinciri, belge türü, kayıt anahtarı ve ' +
      'alan durumu aynı. Değişen, belgenin **nereye yazıldığı** ve kalem sayısı sınırının kalkmasıdır.',

    eccFarklari:[
      { konu:'Kalem sayısı sınırı', ecc:'{{BSEG}} `BUZEI` 3 hane → **azami 999 kalem**', s4:'{{ACDOCA}} `DOCLN` 6 hane → pratikte sınırsız' },
      { konu:'Yazılan tablolar', ecc:'{{BKPF}} + {{BSEG}} + indeksler + toplamlar', s4:'{{BKPF}} + {{BSEG}} + **{{ACDOCA}}**; indeks/toplam view' },
      { konu:'Para birimi sayısı', ecc:'2 (yerel + ek)', s4:'**10’a kadar** paralel para birimi' },
      { konu:'Defter bazlı kayıt', ecc:'Yeni G/L ile sınırlı', s4:'Her belge her aktif {{defter}} için ayrı satır kümesi' },
      { konu:'Giriş ekranları', ecc:'{{FB50}}, {{FB60}}, {{F-02}}', s4:'**Aynı** + Fiori uygulamaları' },
      { konu:'Kilitlenme', ecc:'Toplam tablosu satırı kilitlenir', s4:'Toplam tablosu yok — eşzamanlı kayıt hızlanır' },
    ],

    universalJournal:
      'Her belge artık {{ACDOCA}}’ya da yazılır ve hesap, maliyet yeri, kâr merkezi, varlık numarası ' +
      '**aynı satırda** durur. Belge kaydı açısından iki somut sonucu vardır:\n\n' +
      '**1. Kalem sınırı kalktı.** ECC’de 999 kalemi aşan belgeler bölünmek zorundaydı; ' +
      'toplu faturalar ve amortisman koşuları bu yüzden sorun çıkarırdı. Artık gerekmiyor.\n\n' +
      '**2. Kayıt anında CO da güncellenir.** Ayrı bir CO belgesi ve mutabakat gerekmez; ' +
      'FI ve CO satırı aynı kayıttır.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'Belge kaydı işlem kodlarının hiçbiri kaldırılmadı; {{FB50}}, {{FB60}}, {{F-02}}, {{FB08}} aynen çalışır' },
      { eski:'Toplam tablosu yeniden oluşturma programları', yeni:'—', not:'Toplam tablosu olmadığı için gereksizleşti' },
    ],

    fiori:[
      { ad:'Post General Journal Entries', aciklama:'{{FB50}} yerine; **Excel şablonuyla toplu yükleme** destekler.' },
      { ad:'Display Journal Entries', aciklama:'{{FB03}} yerine; belge ve tüm ilişkili nesneler tek ekranda.' },
      { ad:'Manage Journal Entries', aciklama:'Park edilmiş ve tamamlanmamış belgeleri iş listesi olarak yönetir.' },
      { ad:'Reverse Journal Entries', aciklama:'{{FB08}} yerine; toplu ters kayıt destekler.' },
      { ad:'Upload General Journal Entries', aciklama:'Excel/CSV dosyasından toplu belge yükleme — {{LSMW}} ihtiyacını azaltır.' },
      { ad:'Verify General Journal Entries', aciklama:'Onay akışı — dört-göz prensibi için.' },
    ],

    compatibilityViews:[
      '{{BSIS}}, {{BSAS}}, {{BSIK}}, {{BSAK}}, {{BSID}}, {{BSAD}} — indeks tabloları {{uyumluluk-view}}.',
      '{{GLT0}}, {{FAGLFLEXT}} — toplam tabloları da view.',
      '{{BKPF}}, {{BSEG}}, {{T003}}, {{TBSL}}, {{NRIV}} — **fiziksel tablo olarak duruyor**, değişmedi.',
      'Belge kaydı açısından önemli sonuç: kayıt mantığına dokunan yapılandırma tabloları korundu, ' +
      'yalnızca okuma amaçlı türev tablolar view’e dönüştü.',
    ],

    performans:
      'Toplam tablosu kaldırıldığı için **kilitlenme sorunları azaldı**: eskiden aynı hesaba eşzamanlı ' +
      'kayıt, toplam tablosu satırını kilitler ve kullanıcıları bekletirdi. Artık böyle bir satır yok.\n\n' +
      'Buna karşılık her belge birden çok defter için satır ürettiğinden **belge hacmi artar**; ' +
      'arşivleme stratejisi buna göre planlanmalıdır.',

    bestPractices:[
      'Standart belge türlerini değiştirmek yerine **Z ile başlayan** kendi türlerini oluştur — ' +
      'yükseltmelerde standart tanımlar korunur.',
      'Doğrulama ({{OB28}}) yerine mümkün olduğunca yerine koyma ({{OBBH}}) kullan: ' +
      'kullanıcıyı engellemek yerine alanı otomatik doldur.',
      'Toplu belge yükleme için Fiori "Upload General Journal Entries" uygulamasını değerlendir; ' +
      '{{LSMW}} ile ekran kaydı yapmaya gerek kalmayabilir.',
      'Yılbaşı rutinini kontrol listesine bağla: {{OBH1}} numara aralıkları + {{OB52}} dönem açma.',
      'Kalem sınırı kalktığı için ECC’de belge bölmek üzere yazılmış özel programları geçişte gözden geçir.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Aralık faturası, Ocak’ta girildi: bir tarih hatasının anatomisi',
    hikaye:
      '**Marmara Tekstil A.Ş.**’de 3 Ocak 2027. Muhasebe uzmanı, 31 Aralık 2026 tarihli 50.000 TL’lik ' +
      'kira faturasını giriyor. Kayıt sorunsuz geçiyor — hata yok, uyarı yok.\n\n' +
      'Üç hafta sonra mali müşavir soruyor: "Aralık kira gideri neden 50.000 TL eksik?"\n\n' +
      'Bu senaryo, belge kaydı mekaniğindeki tek bir alanın nasıl mali tabloları bozduğunu ve ' +
      'nasıl düzeltildiğini adım adım gösteriyor.',
    veriler:[
      { k:'Şirket kodu', v:'1000 · Dönem varyantı 1000' },
      { k:'Fatura', v:'Kira · 50.000 TL + %20 KDV = 60.000 TL' },
      { k:'Satıcı', v:'V-2001 · mutabakat hesabı 320000' },
      { k:'Belge tarihi', v:'31.12.2026 (faturanın üstündeki tarih)' },
      { k:'Fiili giriş tarihi', v:'03.01.2027' },
    ],

    adimlar:[
      { baslik:'Fatura girilir — kayıt tarihi atlanır', tcode:'FB60',
        aciklama:'Uzman belge tarihini doğru giriyor ama **kayıt tarihini varsayılan olarak bırakıyor**. ' +
                 'Sistem bugünün tarihini kullanıyor: 03.01.2027.',
        girdi:[
          { alan:'Satıcı', deger:'V-2001' },
          { alan:'Belge tarihi (`BLDAT`)', deger:'31.12.2026 ✓ doğru' },
          { alan:'**Kayıt tarihi (`BUDAT`)**', deger:'03.01.2027 ✕ **varsayılan bırakıldı**' },
          { alan:'Dönem göstergesi', deger:'01 / 2027 — ekranda görünüyordu ama fark edilmedi' },
          { alan:'Tutar / Vergi', deger:'60.000 TL brüt / %20' },
        ],
        fis:{ baslik:'Belge 1900000341 — Kira faturası', belgeTuru:'KR', tarih:'03.01.2027',
          satirlar:[
            { hesap:'770', ad:'Genel yönetim gideri — kira', borc:50000, not:'**Ocak 2027’ye düştü**' },
            { hesap:'191', ad:'İndirilecek KDV', borc:10000 },
            { hesap:'320', ad:'Satıcılar — V-2001', alacak:60000 },
          ], not:'Kayıt teknik olarak **kusursuz**: denk, hesaplar doğru, vergi doğru. ' +
                 'Tek sorun **hangi döneme düştüğü**.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'`BLDAT` = 31.12.2026, **`BUDAT` = 03.01.2027**, `MONAT` = 01, `GJAHR` = 2027' },
          { tablo:'BSEG', ne:'3 kalem — hepsi 2027 mali yılında' },
          { tablo:'ACDOCA', ne:'Kalemler 2027 döneminde' },
        ],
        not:'Sistem neden uyarmadı? Çünkü **yapacak bir şey yoktu**: kayıt tarihi geçerli, dönem açık, ' +
             'belge denk. Belge tarihi ile kayıt tarihinin farklı olması **normaldir** ve sistem ' +
             'hangisinin doğru olduğunu bilemez.' },

      { baslik:'Sorun fark edilir', tcode:'FBL3N',
        aciklama:'Mali müşavir Aralık kira giderini kontrol ediyor. 770 hesabında Aralık’ta ' +
                 'beklenen kayıt yok; Ocak’ta iki kira gideri var.',
        girdi:[
          { alan:'Hesap / Dönem', deger:'770000 · 01.12.2026–31.12.2026' },
          { alan:'Bulgu', deger:'Aralık kira gideri: **50.000 TL eksik**' },
          { alan:'Ocak kontrolü', deger:'Ocak’ta 2 kira gideri var: Aralık’ınki + Ocak’ınki' },
          { alan:'Teşhis', deger:'{{FB03}} → belge başlığı → `BLDAT` 31.12 ama `BUDAT` 03.01' },
        ],
        not:'Teşhis {{FB03}} → *Belge başlığı* ekranında saniyeler sürüyor. ' +
             'İki tarihi yan yana görmek sorunu anında ortaya koyuyor.' },

      { baslik:'Düzeltme denemesi — FB02 çalışmıyor', tcode:'FB02',
        aciklama:'Uzman kayıt tarihini düzeltmeyi deniyor. **Mümkün değil.**',
        girdi:[
          { alan:'Deneme', deger:'{{FB02}} → kayıt tarihi alanını değiştir' },
          { alan:'Sonuç', deger:'**Alan değiştirilemez** — gri, giriş kabul etmiyor' },
          { alan:'Sebep', deger:'Kayıt tarihi dönemi belirler; değiştirilmesi bakiyeleri geriye dönük bozardı' },
        ],
        not:'{{FB02}} yalnızca **değiştirilebilir alanları** günceller: vade, ödeme bloğu, metin, atama. ' +
             'Tutar, hesap ve **kayıt tarihi** değiştirilemez. Bunlar için tek yol ters kayıttır.' },

      { baslik:'Ters kayıt yapılır — iptal nedeni kritik', tcode:'FB08',
        aciklama:'Belge iptal ediliyor. **İptal nedeni** seçimi burada belirleyici.',
        girdi:[
          { alan:'Belge', deger:'1900000341 · Şirket kodu 1000 · Mali yıl 2027' },
          { alan:'Deneme 1 — neden 01', deger:'"Orijinal belge tarihine" → **03.01.2027**’ye düşer' },
          { alan:'Sorun', deger:'Ters kayıt da Ocak’a düşerse Ocak’ta net etki sıfır olur — **doğru**' },
          { alan:'Seçim', deger:'**Neden 01** kullanıldı; ters kayıt 03.01.2027 tarihli' },
        ],
        fis:{ baslik:'Belge 1900000389 — Ters kayıt', belgeTuru:'KR', tarih:'03.01.2027',
          satirlar:[
            { hesap:'770', ad:'Genel yönetim gideri — kira', alacak:50000, not:'Yön tersine döndü' },
            { hesap:'191', ad:'İndirilecek KDV', alacak:10000 },
            { hesap:'320', ad:'Satıcılar — V-2001', borc:60000 },
          ], not:'Ocak’taki yanlış kayıt nötrlendi. Orijinal belge **silinmedi**; ' +
                 '{{BKPF}}’de `STBLG` = 1900000389 olarak işaretlendi ve ikisi birbirine bağlandı.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'Orijinal belgenin `STBLG` alanı dolu — iptal edildiği görünüyor' },
          { tablo:'BSIK', ne:'Satıcı açık kalemi otomatik kapandı (iki kayıt birbirini götürdü)' },
        ] },

      { baslik:'Aralık dönemi geçici açılır', tcode:'OB52',
        aciklama:'Doğru kayıt Aralık’a yapılacak ama dönem kapalı. Muhasebe müdürü geçici olarak açıyor.',
        girdi:[
          { alan:'Dönem varyantı', deger:'1000' },
          { alan:'Hesap tipi **K** satırı', deger:'2. aralık: dönem 12/2026–12/2026, yetki grubu FI01' },
          { alan:'Hesap tipi **S** satırı', deger:'Aynı şekilde açıldı' },
          { alan:'Neden 2. aralık?', deger:'Yalnızca yetki grubu olan kapanış ekibi kayıt yapabilsin diye' },
        ],
        not:'**İki hesap tipi de açılmalı:** satıcı kalemi için K, gider ve KDV satırları için S. ' +
             'Yalnızca S açılırsa "Posting period not open for account type K" hatası alınır — ' +
             'en sık yapılan dönem hatası budur.' },

      { baslik:'Doğru kayıt Aralık’a girilir', tcode:'FB60',
        aciklama:'Fatura bu kez **kayıt tarihi elle 31.12.2026** yapılarak giriliyor.',
        girdi:[
          { alan:'Belge tarihi', deger:'31.12.2026' },
          { alan:'**Kayıt tarihi**', deger:'**31.12.2026** — elle düzeltildi' },
          { alan:'Dönem göstergesi', deger:'12 / 2026 ✓ kontrol edildi' },
          { alan:'Referans', deger:'KIRA-2026-12 (satıcı fatura no)' },
        ],
        fis:{ baslik:'Belge 1900000342 — Kira faturası (doğru dönem)', belgeTuru:'KR', tarih:'31.12.2026',
          satirlar:[
            { hesap:'770', ad:'Genel yönetim gideri — kira', borc:50000, not:'**Aralık 2026’ya düştü** ✓' },
            { hesap:'191', ad:'İndirilecek KDV', borc:10000 },
            { hesap:'320', ad:'Satıcılar — V-2001', alacak:60000 },
          ] },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'`BUDAT` = 31.12.2026, `MONAT` = 12, `GJAHR` = **2026**' },
          { tablo:'NRIV', ne:'2026 aralığından numara alındı — 2027 aralığından değil' },
        ],
        not:'Belge numarası **2026 mali yılının** aralığından geldi. FI numara aralığı ' +
             'şirket kodu + mali yıl bazlı olduğu için bu otomatik gerçekleşti.' },

      { baslik:'Dönem yeniden kapatılır ve kontrol edilir', tcode:'OB52',
        aciklama:'Düzeltme tamamlandı; Aralık dönemi tekrar kapatılıyor ve sonuç doğrulanıyor.',
        girdi:[
          { alan:'{{OB52}}', deger:'2. aralık kaldırıldı — Aralık 2026 tekrar kapalı' },
          { alan:'Kontrol 1 — {{FBL3N}}', deger:'770 hesabı Aralık: kira gideri **var** ✓' },
          { alan:'Kontrol 2 — Ocak', deger:'Net etki sıfır (yanlış kayıt + ters kayıt) ✓' },
          { alan:'Kontrol 3 — {{FBL1N}}', deger:'V-2001’de tek açık kalem: 1900000342 ✓' },
        ] },
    ],

    sonuc:
      '**Sonuç:** üç belge oluştu (yanlış kayıt, ters kayıt, doğru kayıt), Aralık gideri yerine oturdu ve ' +
      'Ocak’ta net etki sıfırlandı. Denetim izi tamamen korundu — üç belge de kayıtlarda görünüyor.\n\n' +
      '**Dört kritik ders:**\n\n' +
      '**1. Kayıt tarihi (`BUDAT`) dönemi belirler, belge tarihi (`BLDAT`) belirlemez.** ' +
      'Bu, FI’da en sık ve en pahalı hatadır çünkü sistem **uyarı vermez** — kayıt teknik olarak kusursuzdur.\n\n' +
      '**2. Kayıt tarihi sonradan değiştirilemez.** {{FB02}} yalnızca vade, ödeme bloğu, metin gibi ' +
      'alanları günceller. Tarih, tutar ve hesap için tek yol {{ters-kayit}}tır.\n\n' +
      '**3. Dönem açarken tüm ilgili hesap tiplerini aç.** Satıcı faturası için hem **K** (satıcı) ' +
      'hem **S** (ana muhasebe) gerekir. Yalnızca S açmak en sık yapılan dönem hatasıdır.\n\n' +
      '**4. Muhasebede kayıt silinmez.** Yanlış belge duruyor, ters kaydı duruyor, doğrusu duruyor. ' +
      'Denetçi üçünü de görebiliyor. Bu bir eksiklik değil, **muhasebenin temel ilkesidir**: ' +
      'iz korunur, düzeltme görünür yapılır.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'Her FI belgesi aynı yapıdadır: başlık ({{BKPF}}) + en az iki dengeli kalem ({{BSEG}}) + evrensel satırlar ({{ACDOCA}}).',
      '**Kayıt tarihi (`BUDAT`) dönemi belirler**, belge tarihi (`BLDAT`) belirlemez. FI’ın en pahalı hatası buradadır.',
      'Kaydet tuşuna basıldığında yedi kontrol çalışır: dönem → belge türü → kayıt anahtarı → alan durumu → doğrulama → denge → numara.',
      '{{belge-turu}} üç şey belirler: izin verilen {{hesap-tipi}}, {{numara-araligi}} ve ters kayıt türü.',
      '{{alan-durumu}} iki kaynaktan gelir (hesap grubu + kayıt anahtarı); **en kısıtlayıcı kazanır** (Gizli > Zorunlu > Opsiyonel).',
      'Numara **kaydetme anında** verilir; iptal edilen işlemde bile tüketilebilir — **numara boşluğu normaldir**.',
      'Muhasebede kayıt silinmez: {{FB08}} ile {{ters-kayit}} yapılır, iki belge de kayıtlarda kalır.',
      '{{FB02}} yalnızca değiştirilebilir alanları günceller; **tutar, hesap ve kayıt tarihi değiştirilemez**.',
    ],

    onemliNoktalar:[
      '**"BUDAT ile BLDAT farkı nedir?"** BUDAT muhasebe dönemini belirler; BLDAT faturanın üstündeki tarihtir. Aralık faturasını Ocak’ta girerken BUDAT elle düzeltilmelidir. **En çok sorulan belge kaydı sorusudur.**',
      '**"Alan durumu çakışırsa ne olur?"** Hesabın alan durumu grubu ile kayıt anahtarının alan durumu karşılaştırılır; **en kısıtlayıcı** uygulanır. Gizli > Zorunlu > Opsiyonel.',
      '**"Belge numarası ne zaman verilir?"** Kaydetme anında, {{NRIV}} sayacından. İptal edilen işlemde bile tüketilmiş olabilir; boşluk normaldir.',
      '**"Numara aralığı taşınır mı?"** Tanımı taşınır, **sayaç değeri taşınmaz**. Veri geçişi sonrası sayaç güncellenmezse çakışma olur.',
      '**"Park ile hold farkı?"** Park: numara verilir, tabloya yazılır, başkası görür, onay akışı destekler. Hold: numara verilmez, yalnızca kullanıcının kendi ekranında saklanır.',
      '**"MM/SD belgesi FI’dan iptal edilir mi?"** **Hayır.** Kaynak modülden edilmelidir (MR8M, VF11). Aksi hâlde iki modül tutarsızlaşır. `AWTYP` alanı kaynağı söyler.',
      '**"Ters kayıt hangi tarihe düşer?"** İptal nedeni belirler: **01** orijinal tarihe, **02** girilen alternatif tarihe. Orijinal dönem kapalıysa 01 çalışmaz.',
      '**"S/4HANA’da kalem sınırı var mı?"** {{BSEG}}’de 999 kalem sınırı vardı; {{ACDOCA}} `DOCLN` 6 haneli olduğu için pratikte sınır kalktı.',
    ],

    sikHatalar:[
      { hata:'Kayıt tarihini varsayılan bırakmak.', dogru:'Geçmiş dönem belgesinde `BUDAT` elle düzeltilir ve dönem göstergesi kontrol edilir.' },
      { hata:'{{OB52}}’de yalnızca S hesap tipini açmak.', dogru:'Satıcı faturası için **K**, müşteri için **D**, varlık için **A** de açılmalıdır.' },
      { hata:'Kayıt tarihini {{FB02}} ile düzeltmeye çalışmak.', dogru:'Değiştirilemez. {{FB08}} ile ters kaydet ve doğrusunu gir.' },
      { hata:'MM/SD belgesini {{FB08}} ile iptal etmek.', dogru:'Kaynak modülden: MIRO için MR8M, SD faturası için VF11. `AWTYP` kaynağı söyler.' },
      { hata:'Kaydetmeden önce simüle etmemek.', dogru:'Sistemin ekleyeceği vergi ve {{belge-bolme}} satırları yalnızca simülasyonda görünür.' },
      { hata:'Yılbaşında numara aralığı açmayı unutmak.', dogru:'{{OBH1}} ile tüm aralıklar yeni yıla kopyalanır — Aralık ayı kontrol listesinin ilk maddesi.' },
      { hata:'Numara boşluğunu hata sanmak.', dogru:'Numara ana LUW’dan bağımsız atanır; iptal edilen girişte tüketilir. Normaldir.' },
      { hata:'Standart belge türlerini değiştirmek.', dogru:'Kopyalanıp **Z** ile başlayan kendi türü oluşturulur; yükseltmede standart korunur.' },
      { hata:'Kapatılmış belgeyi doğrudan ters kaydetmeye çalışmak.', dogru:'Önce {{FBRA}} ile kapatma geri alınır, sonra {{FB08}}.' },
    ],

    ipuclari:[
      '**Kaydetmeden önce her zaman simüle et.** Ters kayıt zahmetinin çoğunu bu tek alışkanlık önler.',
      'Bir hatayı çözerken sırayla sor: **hangi dönem? hangi belge türü? hangi hesap? hangi alan durumu?** ' +
      'FI hatalarının büyük çoğunluğu bu dördünden biridir.',
      'Alan adının teknik karşılığı için **F1 → Teknik bilgi**.',
      '`/n` ile işlemler arası geç (`/nFB03`), `/o` ile yeni pencerede aç (`/oFBL1N`). ' +
      'Danışmanın en çok kullandığı iki kısayoldur.',
      'Rutin kayıtlar için hesap atama şablonu veya tekrarlayan kayıt ({{FBD1}} + {{F.14}}) kur.',
      'Yanlış kayıt düzeltme sırası: **kapatılmış mı?** → **kaynak MM/SD mi?** → değilse {{FB08}}.',
    ],

    quiz:[
      { soru:'31.12.2026 tarihli fatura 03.01.2027’de girildi ve kayıt tarihi varsayılan bırakıldı. Gider hangi döneme düşer?',
        secenekler:[
          'Aralık 2026 — belge tarihi belirler',
          '**Ocak 2027 — kayıt tarihi (`BUDAT`) belirler**',
          'Her ikisine yarı yarıya',
          'Sistem uyarı verir ve kaydetmez',
        ], dogru:1,
        aciklama:'Dönemi **kayıt tarihi (`BUDAT`)** belirler; belge tarihi (`BLDAT`) yalnızca raporlama referansıdır. ' +
                 'Sistem uyarı vermez çünkü ikisinin farklı olması normaldir. ' +
                 'Bu, FI’da en sık ve en pahalı hatadır.' },

      { soru:'Bir alan hesabın alan durumu grubunda "zorunlu", kayıt anahtarında "gizli" tanımlı. Ne olur?',
        secenekler:[
          'Alan zorunlu olur',
          '**Alan gizlenir — en kısıtlayıcı kazanır**',
          'Alan opsiyonel olur',
          'Hata mesajı verilir',
        ], dogru:1,
        aciklama:'{{alan-durumu}} çakışmasında **en kısıtlayıcı** uygulanır. Kısıtlayıcılık sırası: ' +
                 '**Gizli > Zorunlu > Opsiyonel**. "Bu alanı neden göremiyorum, oysa zorunlu olmalıydı?" ' +
                 'sorusunun cevabı budur.' },

      { soru:'Kaydedilmiş bir belgede tutar yanlış girilmiş. Nasıl düzeltilir?',
        secenekler:[
          '{{FB02}} ile tutar alanı güncellenir',
          'Belge silinip yeniden girilir',
          '**{{FB08}} ile ters kaydedilir, sonra doğrusu girilir**',
          '{{FB09}} ile kalem düzeltilir',
        ], dogru:2,
        aciklama:'Muhasebeleşmiş belgede **tutar, hesap ve kayıt tarihi değiştirilemez**; belge de silinmez. ' +
                 '{{FB02}}/{{FB09}} yalnızca vade, ödeme bloğu, metin gibi alanları günceller. ' +
                 'Tek doğru yöntem {{ters-kayit}}tır ve her iki belge de kayıtlarda kalır.' },

      { soru:'Belge numaralarında boşluk var (…234, …236 var ama 235 yok). Bu nedir?',
        secenekler:[
          'Veri kaybı — araştırılmalı',
          'Belge silinmiş',
          '**Normal — numara ana LUW’dan bağımsız atanır, iptal edilen girişte tüketilir**',
          'Numara aralığı hatası',
        ], dogru:2,
        aciklama:'Numara ataması ({{NRIV}} sayacı) ana kayıt LUW’undan **bağımsız** çalışır. ' +
                 'Kullanıcı numarayı aldıktan sonra işlemi iptal ederse numara geri verilmez. ' +
                 'Bu SAP’ta normaldir; boşluk kabul edilemez bir mevzuat varsa dış numara atama gerekir.' },

      { soru:'{{MIRO}} ile girilmiş bir fatura yanlış. Nasıl iptal edilir?',
        secenekler:[
          '{{FB08}} ile FI’dan ters kaydedilir',
          '**MR8M ile MM tarafından iptal edilir**',
          '{{FB02}} ile düzeltilir',
          '{{FBRA}} ile geri alınır',
        ], dogru:1,
        aciklama:'MM/SD kaynaklı belgeler **kaynak modülden** iptal edilmelidir. {{FB08}} teknik olarak ' +
                 'çalışır ama FI düzelirken MM tarafı "faturalanmış" görünmeye devam eder ve ' +
                 'iki modül tutarsızlaşır. {{FB03}} → belge başlığı → `AWTYP` alanı kaynağı söyler.' },

      { soru:'"Posting period 012 2026 is not open for account type K" hatası alındı. Sebep nedir?',
        secenekler:[
          'Belge türü yanlış',
          'Numara aralığı eksik',
          '**{{OB52}}’de yalnızca S hesap tipi açılmış, K açılmamış**',
          'Kullanıcının yetkisi yok',
        ], dogru:2,
        aciklama:'{{OB52}}’de hesap tipleri **ayrı ayrı** yönetilir: S ana muhasebe, D müşteri, ' +
                 'K satıcı, A duran varlık. Satıcı faturası hem S hem K gerektirir. ' +
                 'Yalnızca S açmak en sık yapılan dönem hatasıdır.' },

      { soru:'Park edilmiş belge ile beklenen (held) belge arasındaki temel fark nedir?',
        secenekler:[
          'Park daha hızlıdır',
          '**Park’ta belge numarası verilir, tabloya yazılır ve başkası görebilir; hold’da hiçbiri olmaz**',
          'Hold onay akışı destekler',
          'Park edilmiş belge muhasebeleşmiştir',
        ], dogru:1,
        aciklama:'{{park-etme}}de belge numarası verilir, {{BKPF}}/{{BSEG}}’e park durumuyla yazılır, ' +
                 'başka kullanıcılar iş listesinde görür ve onay akışı ({{FBV4}}) desteklenir. ' +
                 'Hold ise yalnızca kullanıcının kendi ekranında geçici saklamadır. ' +
                 'İkisi de muhasebeleşmemiştir.' },

      { soru:'S/4HANA’da ECC’deki 999 kalem sınırı neden kalktı?',
        secenekler:[
          'BSEG tablosu kaldırıldığı için',
          '**{{ACDOCA}} `DOCLN` alanı 6 haneli olduğu için ({{BSEG}} `BUZEI` 3 haneydi)**',
          'Belge bölme devreye girdiği için',
          'Sınır hâlâ var',
        ], dogru:1,
        aciklama:'{{BSEG}}’de kalem numarası (`BUZEI`) 3 hanelidir → azami 999 kalem. ' +
                 '{{ACDOCA}}’da (`DOCLN`) 6 hanelidir → pratikte sınırsız. ' +
                 'ECC’de toplu faturaları ve amortisman koşularını bölmek gerekiyordu; artık gerekmiyor.' },
    ],

    flashcards:[
      { on:'BUDAT ile BLDAT farkı nedir?', arka:'**BUDAT (kayıt tarihi)** → muhasebe **dönemini belirler**\n**BLDAT (belge tarihi)** → faturanın üstündeki tarih, raporlama referansı\n\nAralık faturasını Ocak’ta girerken BUDAT elle düzeltilmelidir. Sistem uyarmaz.' },
      { on:'Kaydet tuşuna basınca çalışan yedi kontrol nedir?', arka:'1. **Dönem** (OB52, hesap tipi bazında)\n2. **Belge türü** (izin verilen hesap tipleri)\n3. **Kayıt anahtarı** (yön + hedef tip)\n4. **Alan durumu** (en kısıtlayıcı kazanır)\n5. **Doğrulama/yerine koyma**\n6. **Denge** (borç = alacak)\n7. **Numara + yazma**' },
      { on:'Alan durumu çakışırsa hangi kural geçerli?', arka:'**En kısıtlayıcı kazanır.**\n\nSıralama: **Gizli > Zorunlu > Opsiyonel**\n\nİki kaynak: hesabın alan durumu grubu (SKB1-FSTAG) + kayıt anahtarının alan durumu (OB41).' },
      { on:'Belge türü neyi belirler?', arka:'**Üç şeyi:**\n1. İzin verilen **hesap tipleri** (S/D/K/A/M)\n2. Kullanılacak **numara aralığı**\n3. Ters kayıt için varsayılan tür\n\nÖrn: KR satıcı faturası, DZ müşteri tahsilatı, AB genel (tüm tipler).' },
      { on:'Belge numarası ne zaman verilir?', arka:'**Kaydetme anında**, NRIV sayacından.\n\nNumara ataması ana LUW’dan **bağımsız** çalışır → iptal edilen işlemde bile tüketilebilir.\n\n**Numara boşluğu normaldir**, hata değildir.' },
      { on:'FB02 ile hangi alanlar değiştirilebilir?', arka:'**Değiştirilebilir:** vade, ödeme bloğu, metin, atama\n\n**Değiştirilemez:** tutar, hesap, borç/alacak yönü, **kayıt tarihi**, şirket kodu\n\nBunlar için tek yol: FB08 ters kayıt.' },
      { on:'Ters kayıt hangi tarihe düşer?', arka:'**İptal nedeni** belirler:\n• **01** → orijinal belge tarihine (aynı dönem)\n• **02** → girilen alternatif tarihe (farklı dönem)\n\nOrijinal dönem kapalıysa 01 çalışmaz; alternatif tarihli neden seçilir.' },
      { on:'MM/SD belgesi FI’dan iptal edilir mi?', arka:'**Hayır.**\n\nKaynak modülden edilmelidir:\n• MIRO faturası → **MR8M**\n• SD faturası → **VF11**\n\nFI’dan iptal, MM/SD tarafını "faturalanmış" bırakır ve modüller tutarsızlaşır.\n\nAWTYP alanı kaynağı söyler.' },
      { on:'Park ile hold farkı nedir?', arka:'**Park:** numara verilir · tabloya yazılır · başkası görür · onay akışı destekler · dengesiz olabilir\n\n**Hold:** numara yok · kalıcı yazılmaz · yalnızca sahibi görür · onay akışı yok\n\nİkisi de muhasebeleşmez.' },
      { on:'OB52’de hesap tipleri neden ayrı ayrı açılır?', arka:'Her tip bağımsız kontrol edilir:\n**S** ana muhasebe · **D** müşteri · **K** satıcı · **A** duran varlık · **M** malzeme\n\nSatıcı faturası hem **S** hem **K** gerektirir.\n\nYalnızca S açmak en sık yapılan dönem hatasıdır.' },
      { on:'Numara aralığı taşıma isteğiyle taşınır mı?', arka:'**Tanımı** taşınır (FBN1 aralık satırları).\n**Güncel sayaç değeri (NRIV-NRLEVEL) taşınmaz.**\n\nVeri geçişi sonrası sayaç güncellenmezse "Document number already assigned" hatası alınır.' },
      { on:'S/4HANA’da 999 kalem sınırı neden kalktı?', arka:'**BSEG-BUZEI** 3 haneliydi → azami 999 kalem.\n\n**ACDOCA-DOCLN** 6 hanelidir → pratikte sınırsız.\n\nECC’de toplu fatura ve amortisman koşularını bölmek gerekiyordu; artık gerekmiyor.' },
    ],
  },

  },
});
