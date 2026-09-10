/* ==========================================================================
   content/fi/fi-temelleri.js — "SAP FI Temelleri" konusunun derin içeriği
   ========================================================================== */

SAP.registerTopic({
  id: 'fi-temelleri',

  sections: {

  /* ====================================================== 1. TANIM === */
  tanim: {
    nedir:
      'FI (Financial Accounting — Finansal Muhasebe), SAP’ın **dış dünyaya karşı** sorumlu olduğu muhasebe modülüdür. ' +
      'Vergi dairesine verilen beyan, bankaya sunulan bilanço, ortağa gösterilen gelir tablosu buradan çıkar.\n\n' +
      'FI’ın ayırt edici özelliği şudur: **SAP’taki her modülün yolu eninde sonunda FI’a çıkar.** ' +
      'Depoda mal kabul edilir, satışta fatura kesilir, insan kaynaklarında bordro hesaplanır — hepsi FI’da ' +
      'bir muhasebe belgesine dönüşür. Bu yüzden FI, sistemin en kalabalık kavşağıdır.',

    neden:
      'Üç sebep FI’ı zorunlu kılar:\n\n' +
      '**Yasal defter tutma.** Her ülkenin muhasebe mevzuatı vardır ve FI bu mevzuata göre belge üretir.\n\n' +
      '**Tek doğruluk kaynağı.** Satış "10 milyon sattık", üretim "maliyetimiz düştü" der. Bunların hepsi ' +
      'FI’daki rakamla karşılaştırıldığında anlam kazanır.\n\n' +
      '**Denetlenebilirlik.** FI’da hiçbir kayıt silinmez. Her belge kimin, ne zaman, neye dayanarak kaydettiğini taşır. ' +
      'Denetçinin aradığı iz burada bulunur.',

    sirketOnemi:
      'Bir SAP projesinde FI genellikle **ilk canlıya alınan** modüldür, çünkü diğer modüller onsuz muhasebeleşemez. ' +
      'MM canlıya alınıp FI hazır değilse mal girişi kaydedilemez.\n\n' +
      'Danışmanlık açısından sonucu şudur: FI danışmanı yalnızca FI bilmez. MM’den gelen mal girişinin hangi hesaba ' +
      'gittiğini ({{OBYC}}), SD faturasının gelirini nereye yazdığını ({{VKOA}}) ve CO’nun gideri nasıl aldığını da bilir. ' +
      'Mülakatlarda ayırt edici soru tam olarak buradan gelir.',

    gercekHayat:
      'Bir market zinciri düşün. Sabah depoya 500 koli süt geliyor ({{MIGO}}), akşam kasadan 480 koli satılıyor ({{VF01}}), ' +
      'ay sonunda tedarikçiye ödeme yapılıyor ({{F110}}), personele maaş çıkıyor.\n\n' +
      'Bu dört olayın hiçbirini muhasebeci elle girmez. Hepsi kendi modülünde kaydedilir ve FI’a **otomatik** düşer. ' +
      'Muhasebecinin işi kayıt girmek değil, düşen kayıtların doğruluğunu kontrol etmek ve dönemi kapatmaktır. ' +
      'SAP’ın iş yapış biçimini değiştirdiği nokta budur.',

    muhasebeMantigi:
      'FI’ın tüm çıktısı tek bir nesnedir: **FI belgesi**. Nasıl gelirse gelsin — elle mi girildi, MM’den mi düştü — ' +
      'sonuç hep aynı yapıdadır:\n\n' +
      '**Bir başlık** ({{BKPF}}) + **en az iki kalem** ({{BSEG}}), borç toplamı alacak toplamına eşit.\n\n' +
      'Bu yüzden "SAP’ta şu işlem nasıl yapılır?" sorusundan önce **"bu işlem hangi FI belgesini üretir?"** sorusunu ' +
      'sormak gerekir. Belgeyi bilirsen işlemi de, hatayı da çözebilirsin.',

    kavramlar: ['sirket-kodu', 'hesap-plani', 'belge-turu', 'kayit-anahtari', 'mutabakat-hesabi',
                'ana-muhasebe', 'muavin-defter', 'evrensel-kayit-defteri'],
  },

  /* ====================================================== 2. SÜREÇ === */
  surec: {
    anlatim:
      'FI’a veri iki yoldan girer: **elle kayıt** ve **entegrasyondan otomatik akış**. ' +
      'Olgun bir SAP kurulumunda kayıtların büyük çoğunluğu ikinci yoldan gelir; elle kayıt istisnadır ' +
      've genelde düzeltme, tahakkuk veya banka işlemi içindir.',

    roller: [
      { rol:'Satın alma / Depo (MM)', gorev:'Sipariş açar, mal kabul eder. Mal girişi FI’da stok ve {{gr-ir}} kaydını doğurur.' },
      { rol:'Satış (SD)', gorev:'Fatura keser. Fatura muhasebeye aktarıldığında müşteri alacağı ve gelir kaydı oluşur.' },
      { rol:'Muhasebe uzmanı', gorev:'Elle kayıtları girer, otomatik düşen belgeleri kontrol eder, mutabakat yapar.' },
      { rol:'Hazine / Finans', gorev:'Ödemeleri ({{F110}}) çalıştırır, banka ekstresini işler ({{FEBAN}}).' },
      { rol:'Muhasebe müdürü', gorev:'Dönem açar/kapatır ({{OB52}}), mali tabloları onaylar.' },
      { rol:'FI danışmanı', gorev:'Hesap planı, belge türleri, {{hesap-belirleme}} kurallarını tasarlar ve hataları çözer.' },
    ],

    diyagram: {
      type: 'flow',
      baslik: 'Verinin FI’a akışı — kaynaktan mali tabloya',
      adimlar: [
        { ic:'🏭', rol:'Kaynak modüller', baslik:'Olay kendi modülünde kaydedilir',
          aciklama:'MM mal girişi ({{MIGO}}), MM fatura doğrulama ({{MIRO}}), SD faturası ({{VF01}}), HR bordrosu.',
          cikti:'Modül belgesi (malzeme belgesi, SD faturası…)', ok:'muhasebe tetiklenir' },
        { ic:'🧭', rol:'Sistem', baslik:'Hesap belirleme kuralları çalışır',
          aciklama:'Hangi G/L hesabına yazılacağı {{OBYC}} / {{VKOA}} / {{OB40}} tablolarından bulunur. ' +
                   'Kural eksikse burada hata alınır ve belge muhasebeleşmez.',
          cikti:'Hesap numaraları', ok:'belge üretilir' },
        { ic:'📄', rol:'Sistem', baslik:'FI belgesi oluşur',
          aciklama:'{{BKPF}} başlığı + {{BSEG}} kalemleri + {{ACDOCA}} evrensel satırları. Belge numarası bu anda verilir.',
          cikti:'FI belgesi numarası', ok:'muavin defterlere dağılır' },
        { ic:'📚', rol:'Sistem', baslik:'Muavin defterler güncellenir',
          aciklama:'Satıcı kalemi {{BSIK}}’e, müşteri kalemi {{BSID}}’ye açık kalem olarak düşer. ' +
                   'Ana muhasebeye {{mutabakat-hesabi}} üzerinden yansır.',
          cikti:'Açık kalemler', ok:'kontrol edilir' },
        { ic:'🔍', rol:'Muhasebe', baslik:'Kontrol ve mutabakat',
          aciklama:'{{FBL1N}}, {{FBL5N}}, {{FBL3N}} ile kalemler; {{FB03}} ile belgenin kendisi incelenir.',
          cikti:'Doğrulanmış veri', ok:'dönem sonunda' },
        { ic:'🔒', rol:'Muhasebe müdürü', baslik:'Dönem kapanır, tablolar üretilir',
          aciklama:'{{OB52}} ile dönem kapatılır, {{F.01}} ile bilanço ve gelir tablosu alınır.',
          cikti:'Mali tablolar' },
      ],
    },

    adimlar: [
      { rol:'MM / SD / HR', eylem:'İş olayı kendi modülünde kaydedilir', sistem:'{{MIGO}}, {{MIRO}}, {{VF01}}' },
      { rol:'Sistem', eylem:'Hesap belirleme kuralı uygulanır', sistem:'{{OBYC}}, {{VKOA}}, {{OB40}} → {{T030}}' },
      { rol:'Sistem', eylem:'FI belgesi ve numarası oluşur', sistem:'{{BKPF}}, {{BSEG}}, {{ACDOCA}}' },
      { rol:'Muhasebe', eylem:'Elle kayıt gereken işlemler girilir', sistem:'{{FB50}}, {{FB60}}, {{FB70}}, {{F-02}}' },
      { rol:'Muhasebe', eylem:'Açık kalemler kapatılır', sistem:'{{F-32}}, {{F-44}}, {{F.13}}' },
      { rol:'Muhasebe', eylem:'Dönem sonu işlemleri yapılır', sistem:'{{AFAB}}, {{F.05}}, {{F.19}}' },
      { rol:'Muhasebe müdürü', eylem:'Dönem kapatılır ve raporlanır', sistem:'{{OB52}}, {{F.01}}' },
    ],

    veriAkisi: {
      nereden: 'MM (mal hareketi, fatura doğrulama), SD (satış faturası), HR (bordro), TR (hazine), elle FI kayıtları ve banka ekstresi.',
      nereye: 'Ana muhasebe hesapları → {{ACDOCA}} → mali tablolar; ayrıca CO tarafında {{maliyet-yeri}} ve {{kar-merkezi}} raporları.',
      tetikleyen: 'Kaynak modülün belgesi. FI belgesi başlığındaki `AWKEY` alanı hangi kaynak belgeden geldiğini tutar — köprü budur.',
      sonraki: 'Vergi beyanı, konsolidasyon, yönetim raporlaması, denetim.',
    },

    notlar: [
      { tip:'tip', baslik:'AWKEY — kayıp halkayı bulan alan', metin:
        'Bir FI belgesinin nereden geldiğini merak ettiğinde {{BKPF}} tablosundaki `AWTYP` (kaynak tipi) ve `AWKEY` ' +
        '(kaynak belge anahtarı) alanlarına bak. `AWTYP = RMRP` ise {{MIRO}} faturası, `VBRK` ise SD faturasıdır. ' +
        'Hata analizinde ilk bakılacak yerlerden biridir.' },
    ],
  },

  /* =================================================== 3. MUHASEBE === */
  muhasebe: {
    anlatim:
      'FI’da her kayıt aynı iskelete oturur. Aşağıda aynı ekonomik olayın üç farklı yoldan FI’a nasıl düştüğünü ' +
      'görüyorsun — kayıt aynı, kapı farklı.',

    etkilenenHesaplar: [
      { hesap:'Mutabakat hesapları (320 Satıcılar, 120 Müşteriler)', tur:'Bilanço', neden:'Muavin defterden otomatik yansır. **Doğrudan kayıt yapılamaz** — satıcı/müşteri numarası girilir, SAP hesabı ana veriden bulur.' },
      { hesap:'{{gr-ir}} hesabı (159/391 benzeri geçiş hesabı)', tur:'Bilanço', neden:'Mal girişi ile fatura girişi arasındaki zaman farkını taşır. Her ikisi de olunca sıfırlanır.' },
      { hesap:'KDV hesapları (191 / 391)', tur:'Bilanço', neden:'{{vergi-kodu}} girildiğinde SAP satırı otomatik ekler; elle yazılmaz.' },
      { hesap:'Gider hesapları (7xx)', tur:'Gelir tablosu', neden:'CO ile entegre çalışır: kayıt yapıldığında {{maliyet-yeri}} istenir, aksi hâlde {{OKB9}} varsayılanı devreye girer.' },
      { hesap:'Banka ara hesapları', tur:'Bilanço', neden:'Ödeme kaydı ile paranın bankadan fiilen çıkışı arasındaki farkı taşır ({{banka-ara-hesabi}}).' },
    ],

    fisler: [
      { baslik:'Yol 1 — Elle FI kaydı: kira faturası ({{FB60}})',
        belgeTuru:'KR', tarih:'10.04.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Genel yönetim gideri — kira', borc:50000, not:'Maliyet yeri zorunlu' },
          { hesap:'191', ad:'İndirilecek KDV', borc:10000, not:'Vergi kodundan otomatik' },
          { hesap:'320', ad:'Satıcılar (V-2001)', alacak:60000, not:'{{mutabakat-hesabi}}' },
        ],
        not:'Sipariş yoktur, mal girişi yoktur — bu yüzden MM’ye uğramadan doğrudan FI’a girilir. Kira, danışmanlık, elektrik gibi hizmet alımlarının standart yolu budur.' },

      { baslik:'Yol 2 — MM’den otomatik: mal girişi ({{MIGO}})',
        belgeTuru:'WE', tarih:'12.04.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'153', ad:'Ticari mallar (stok)', borc:80000, not:'{{OBYC}} → BSX işlem anahtarı' },
          { hesap:'159', ad:'GR/IR — mal geldi fatura gelmedi', alacak:80000, not:'{{OBYC}} → WRX işlem anahtarı' },
        ],
        not:'Muhasebeci bu kaydı **görmez bile**; depo elemanı mal kabul yaptığında oluşur. Hesapları {{OBYC}} belirler. Fatura gelmediği için satıcıya borç henüz yazılmaz — {{gr-ir}} hesabı bu boşluğu taşır.' },

      { baslik:'Yol 2 devamı — fatura geldi ({{MIRO}})',
        belgeTuru:'RE', tarih:'20.04.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR hesabı', borc:80000, not:'Mal girişindeki alacak kapanıyor' },
          { hesap:'191', ad:'İndirilecek KDV', borc:16000 },
          { hesap:'320', ad:'Satıcılar (V-3001)', alacak:96000 },
        ],
        not:'{{gr-ir}} hesabı artık sıfırlandı: mal da geldi, fatura da geldi. Bu hesabın bakiyesi dönem sonunda sıfıra yakın olmalıdır; değilse {{F.19}} ile analiz edilir.' },

      { baslik:'Yol 3 — SD’den otomatik: satış faturası ({{VF01}})',
        belgeTuru:'RV', tarih:'25.04.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Müşteriler (C-5001)', borc:120000, not:'{{mutabakat-hesabi}}' },
          { hesap:'600', ad:'Yurtiçi satışlar', alacak:100000, not:'{{VKOA}} hesap belirlemesinden' },
          { hesap:'391', ad:'Hesaplanan KDV', alacak:20000 },
        ],
        not:'SD faturası kaydedildiğinde FI belgesi otomatik doğar. Doğmazsa sebep neredeyse her zaman {{VKOA}}’da eksik hesap belirlemesidir; {{VF02}} ile yeniden aktarım denenir.' },
    ],

    tHesaplar: [
      { hesap:'Satıcılar (mutabakat)', kod:'320',
        borc:[{ ad:'F110 ödemesi', tutar:60000 }],
        alacak:[{ ad:'Kira faturası', tutar:60000 }, { ad:'Mal faturası', tutar:96000 }],
        not:'Bakiye = satıcılara toplam borç' },
      { hesap:'GR/IR hesabı', kod:'159',
        borc:[{ ad:'Fatura girişi (MIRO)', tutar:80000 }],
        alacak:[{ ad:'Mal girişi (MIGO)', tutar:80000 }],
        not:'Dönem sonunda sıfır olmalı' },
      { hesap:'Müşteriler (mutabakat)', kod:'120',
        borc:[{ ad:'SD faturası', tutar:120000 }],
        alacak:[{ ad:'Tahsilat', tutar:70000 }],
        not:'Bakiye = tahsil edilmemiş alacak' },
    ],

    notlar: [
      { tip:'warn', baslik:'Mutabakat hesabına elle kayıt denenirse', metin:
        '"Account 320000 cannot be directly posted to" hatası alınır. Bu bir arıza değil, tasarımdır: ' +
        'muavin defter ile ana muhasebenin tutarlılığını korur. Kayıt satıcı/müşteri numarası üzerinden yapılmalıdır.' },
    ],
  },

  /* =================================================== 4. ÇEŞİTLER === */
  cesitler: {
    anlatim:
      'FI tek bir parça değildir; her biri kendi ana verisi ve işlem kodlarıyla gelen alt bileşenlerden oluşur. ' +
      'Bir SAP FI danışmanı ilanında "FI-AP ve FI-AA deneyimi" yazdığında kastedilen bu ayrımdır.',
    liste: [
      { ad:'Ana Muhasebe', en:'FI-GL — General Ledger',
        aciklama:'Mali tabloların üretildiği merkez. Tüm alt bileşenler buraya {{mutabakat-hesabi}} üzerinden yansır.',
        neZaman:'Her kurulumda zorunludur. Diğer hiçbir bileşen onsuz çalışmaz.',
        tcodes:['FS00','FB50','FBL3N','FAGLL03'] },

      { ad:'Satıcılar', en:'FI-AP — Accounts Payable',
        aciklama:'Şirketin borçlarını yönetir: satıcı ana verisi, fatura girişi, ödeme, yaşlandırma. Satın alma süreciyle (MM) sıkı entegredir.',
        neZaman:'Şirket dışarıdan mal/hizmet alıyorsa — yani her zaman.',
        tcodes:['FB60','FBL1N','F110','F-53'] },

      { ad:'Müşteriler', en:'FI-AR — Accounts Receivable',
        aciklama:'Şirketin alacaklarını yönetir: müşteri ana verisi, fatura, tahsilat, {{ihtar}}. Satış süreciyle (SD) entegredir.',
        neZaman:'Şirket vadeli satış yapıyorsa. Sadece peşin çalışan işletmelerde hafif kullanılır.',
        tcodes:['FB70','FBL5N','F-28','F150'] },

      { ad:'Duran Varlık Muhasebesi', en:'FI-AA — Asset Accounting',
        aciklama:'Varlığın alımından elden çıkarılmasına kadar tüm yaşamını ve {{amortisman}}’ını yönetir. ' +
                 '{{amortisman-alani}} sayesinde aynı varlık ticari ve vergi mevzuatına göre ayrı ayrı değerlenebilir.',
        neZaman:'Makine, bina, araç gibi çok yıllık varlıklar varsa. Sadece kiralık ofiste çalışan küçük şirkette hafif kalır.',
        tcodes:['AS01','AW01N','ABZON','AFAB'] },

      { ad:'Banka Muhasebesi', en:'FI-BL — Bank Accounting',
        aciklama:'{{ev-bankasi}} tanımı, çek yönetimi, banka ekstresi işleme ve nakit hareketlerinin muhasebeleşmesi.',
        neZaman:'Otomatik ödeme ({{F110}}) veya elektronik ekstre kullanılıyorsa zorunludur.',
        tcodes:['FI12','FF67','FEBAN','FCHN'] },

      { ad:'Vergi', en:'FI — Tax on Sales/Purchases',
        aciklama:'{{vergi-kodu}} yapısı, {{matrah}} hesaplama ve vergi hesap belirleme. Ayrı bir alt modül değil, FI’a yayılmış bir katmandır.',
        neZaman:'Her ülkede zorunlu; ülkeye özgü yapılandırma gerektirir.',
        tcodes:['FTXP','OB40','F.12'] },
    ],

    karsilastirmaBasliklar: ['FI-AP (Satıcılar)', 'FI-AR (Müşteriler)'],
    karsilastirma: [
      ['Neyi izler', 'Şirketin **borçlarını**', 'Şirketin **alacaklarını**'],
      ['Ana veri', '{{LFA1}} / {{LFB1}} (satıcı)', '{{KNA1}} / {{KNB1}} (müşteri)'],
      ['Açık kalem tablosu', '{{BSIK}} / {{BSAK}}', '{{BSID}} / {{BSAD}}'],
      ['Entegre modül', 'MM — satın alma', 'SD — satış'],
      ['Ana işlem', '{{FB60}} fatura, {{F110}} ödeme', '{{FB70}} fatura, {{F-28}} tahsilat'],
      ['Kalem raporu', '{{FBL1N}}', '{{FBL5N}}'],
      ['Tipik dönem sonu işi', 'Borç yaşlandırma, {{gr-ir}} analizi', 'Alacak yaşlandırma, {{ihtar}}'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    anlatim:
      'FI’a yeni başlayan birinin ilk öğrenmesi gereken üç işlem kodu aşağıdadır. ' +
      '{{FB03}} özellikle önemlidir: her hatanın teşhisi bu ekranda başlar.',
    liste: [
      { kod:'FB03', ad:'Belge görüntüleme — FI’ın röntgen cihazı',
        amac:'Bir FI belgesini başlığı, kalemleri, vergi satırları ve bağlı belgeleriyle birlikte gösterir.',
        neZaman:'Her hata analizinde, her mutabakatta, "bu rakam nereden geldi?" sorusunun sorulduğu her anda.',
        adimlar:[
          { baslik:'Şirket kodu, belge numarası ve mali yılı gir',
            aciklama:'Bu üçlü ({{BKPF}}’nin birincil anahtarı) belgeyi tekil olarak belirler. Yıl girilmezse sistem sorar.' },
          { baslik:'Kalem listesini incele',
            aciklama:'Her satırın hesabı, borç/alacak yönü ve tutarı görünür. Satıra çift tıklayınca detay ekranı açılır.' },
          { baslik:'*Belge başlığı* düğmesine bas',
            aciklama:'{{belge-turu}}, kayıt tarihi, belge tarihi, kaydı yapan kullanıcı ve kaynak belge referansı (`AWKEY`) burada.' },
          { baslik:'*Ortam → Belge akışı / İlgili belgeler* menüsünü kullan',
            aciklama:'Belgenin hangi MM/SD belgesinden doğduğunu ve hangi CO belgesini ürettiğini gösterir. Entegrasyon hatalarında ilk bakılacak yer.' },
          { baslik:'*Ortam → Değişiklik belgeleri* ile geçmişi gör',
            aciklama:'Kimin neyi ne zaman değiştirdiği {{CDHDR}} / {{CDPOS}} tablolarından okunur.' },
        ],
        ekranAkisi:[
          { ekran:'Giriş ekranı', islem:'Şirket kodu 1000, belge no 100000001, mali yıl 2026' },
          { ekran:'Kalem listesi', islem:'Satırlar görünür; borç/alacak toplamı altta' },
          { ekran:'Kalem detayı (çift tık)', islem:'Vade, atama, maliyet yeri, vergi kodu, ödeme bloğu' },
          { ekran:'Belge başlığı', islem:'Belge türü, tarihler, kullanıcı, referans' },
        ],
        alanlar:{ zorunlu:['Şirket kodu','Belge numarası','Mali yıl'], opsiyonel:['Görüntüleme düzeni (layout)'] },
        hatalar:[
          { mesaj:'Document ... does not exist in company code ...', sebep:'Belge başka bir şirket kodunda veya başka bir mali yılda.', cozum:'Mali yılı değiştirerek dene; emin değilsen {{FBL3N}} veya {{SE16N}} ile {{BKPF}}’de ara.' },
          { mesaj:'No authorization to display documents in company code ...', sebep:'F_BKPF_BUK yetki nesnesi eksik.', cozum:'{{SU53}} çalıştırıp çıkan ekranı yetki ekibine ilet.' },
        ],
        ipucu:'Belge numarasını bilmiyorsan {{FBL1N}}/{{FBL3N}}/{{FBL5N}} raporlarından satıra çift tıklayarak da {{FB03}}’e düşersin. Pratikte belge numarası ezberlenmez, rapordan gidilir.',
        ilgili:['FB02','FB08','FBL3N','SE16N'] },

      { kod:'FB50', ad:'G/L kaydı girişi',
        amac:'Ana muhasebe kaydını tek ekranda, tablo görünümünde girer.',
        neZaman:'Elle düzeltme, tahakkuk, karşılık ve virman kayıtlarında.',
        adimlar:[
          { baslik:'Belge tarihi, kayıt tarihi ve şirket kodunu gir',
            aciklama:'Kayıt tarihi dönemi belirler; kapalı bir döneme denk gelirse kayıt yapılamaz.' },
          { baslik:'Satırları gir: hesap, B/A, tutar',
            aciklama:'Vergi kodu girilirse SAP vergi satırını kendisi ekler.' },
          { baslik:'Bakiye göstergesini yeşile getir', aciklama:'{{belge-denkligi}} sağlanmadan kayıt yapılamaz.' },
          { baslik:'Simüle et, sonra kaydet', aciklama:'Simülasyon sistemin ekleyeceği tüm satırları önceden gösterir.' },
        ],
        alanlar:{
          zorunlu:['Belge tarihi','Kayıt tarihi','Şirket kodu','G/L hesabı','Borç/Alacak','Tutar'],
          opsiyonel:['Referans','Belge başlık metni','Maliyet yeri','Vergi kodu','Atama (`ZUONR`)'] },
        hatalar:[
          { mesaj:'Posting period 004 2026 is not open', sebep:'Kayıt tarihinin düştüğü dönem kapalı.', cozum:'{{OB52}} ile dönemi aç veya kayıt tarihini açık bir döneme al.' },
          { mesaj:'Account 320000 cannot be directly posted to', sebep:'Hesap bir {{mutabakat-hesabi}}.', cozum:'{{FB60}} kullan ve satıcı numarasını gir.' },
          { mesaj:'Field Cost Center is a required field for G/L account ...', sebep:'Hesabın {{alan-durumu}} grubu maliyet yerini zorunlu kılmış.', cozum:'Maliyet yerini gir veya {{OKB9}} ile varsayılan tanımla.' },
        ],
        ilgili:['F-02','FV50','FB03','FB08'] },

      { kod:'FS00', ad:'G/L hesap ana verisi',
        amac:'Ana muhasebe hesabını oluşturur, değiştirir ve görüntüler. Hesap planı ve şirket kodu bölümleri tek ekrandadır.',
        neZaman:'Yeni hesap ihtiyacında ve bir hesabın davranışını anlamak istediğinde.',
        adimlar:[
          { baslik:'Hesap numarası ve şirket kodunu gir' },
          { baslik:'*Tip/Tanım* sekmesi', aciklama:'Hesap grubu, bilanço mu gelir-gider mi, S/4HANA’da hesap tipi (Balance Sheet / Primary Costs / Secondary Costs).' },
          { baslik:'*Kontrol verisi* sekmesi', aciklama:'Para birimi, {{vergi-kodu}} kategorisi, {{acik-kalem-yonetimi}}, kalem görüntüleme, mutabakat hesabı tipi.' },
          { baslik:'*Yaratma/bank/faiz* sekmesi', aciklama:'{{alan-durumu}} grubu — kayıt ekranında hangi alanın zorunlu olacağını belirler.' },
        ],
        ipucu:'Bir kayıtta "şu alan neden zorunlu?" diye sorduğunda cevap neredeyse her zaman burada, alan durumu grubundadır.',
        hatalar:[
          { mesaj:'Open item management cannot be changed; account has postings', sebep:'Hesapta hareket varken açık kalem yönetimi değiştirilemez.', cozum:'Hesabı sıfırla (bakiyeyi devret), programla dönüştür veya yeni hesap aç.' },
        ],
        ilgili:['FSP0','FSS0','OBD4','FBL3N'] },
    ],
  },

  /* ================================================== 6. TABLOLAR === */
  tablolar: {
    anlatim:
      'FI’ın tablo mimarisi üç katmandır: **belge** (başlık + kalem), **ana veri** ve **indeks/toplam**. ' +
      'S/4HANA üçüncü katmanı büyük ölçüde ortadan kaldırıp her şeyi {{ACDOCA}}’ya taşıdı.',
    liste: [
      { ad:'BKPF', baslik:'Belge başlığı',
        tutar:'Belgenin kimliği ve kaynağı: numara, tür, tarihler, kullanıcı, referans, kaynak belge anahtarı.',
        olusturan:'Muhasebeleşen her işlem',
        guncelleyen:'{{FB50}}, {{FB60}}, {{FB70}}, {{MIRO}}, {{VF01}}, {{F110}}, {{AFAB}}',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'{{BSEG}} ile 1-n; `AWKEY` alanı üzerinden MM/SD kaynak belgesine köprü kurar.',
        s4:'Yapısı korundu. Raporlama {{ACDOCA}}’ya taşındı ama belge kimliği hâlâ burada.',
        alanlar:[
          { ad:'BLART', aciklama:'{{belge-turu}}' },
          { ad:'BUDAT', aciklama:'Kayıt tarihi — dönemi belirler' },
          { ad:'AWTYP / AWKEY', aciklama:'Kaynak belge tipi ve anahtarı — entegrasyon izini verir' },
          { ad:'STBLG', aciklama:'İptal eden belge — doluysa bu belge ters kaydedilmiş' },
        ] },

      { ad:'BSEG', baslik:'Belge kalemleri',
        tutar:'Satır bazında hesap, tutar, borç/alacak yönü, ortak nesneler (maliyet yeri, vergi kodu, satıcı/müşteri).',
        olusturan:'{{BKPF}} ile eşzamanlı',
        guncelleyen:'FI belgesi üreten tüm işlemler; kapatma işlemleri `AUGBL` alanını günceller',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{LFA1}}/{{KNA1}} ile satıcı-müşteri, {{SKA1}} ile hesap, {{ANLA}} ile varlık bağlantısı.',
        s4:'Cluster (RFBLG) yapısında olduğu için doğrudan sorgulanması yavaştır. S/4HANA’da raporlar {{ACDOCA}}’dan okur.',
        alanlar:[
          { ad:'SHKZG', aciklama:'S = borç, H = alacak' },
          { ad:'AUGBL / AUGDT', aciklama:'Kapatma belgesi ve tarihi — boşsa kalem **açıktır**' },
          { ad:'ZUONR', aciklama:'Atama — otomatik kapatmanın ({{F.13}}) eşleştirme alanı' },
          { ad:'UMSKZ', aciklama:'{{ozel-ana-muhasebe-gostergesi}}' },
        ] },

      { ad:'ACDOCA', baslik:'Evrensel Kayıt Defteri',
        tutar:'FI, CO, duran varlık ve malzeme defterinin birleşmiş hâli. Aynı satırda hem hesap hem maliyet yeri hem kâr merkezi hem varlık numarası bulunur.',
        olusturan:'Muhasebeleşen her işlem',
        guncelleyen:'Tüm FI ve CO işlemleri',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{BKPF}} ile belge numarası üzerinden; {{defter}} alanı paralel muhasebeyi ayırır.',
        s4:'S/4HANA’nın merkezidir. {{FAGLFLEXT}}, {{GLT0}}, {{BSIS}} gibi tablolar buradan üretilen {{uyumluluk-view}}’lerine dönüştü.',
        alanlar:[
          { ad:'RLDNR', aciklama:'Defter — 0L lider defterdir' },
          { ad:'DOCLN', aciklama:'6 haneli kalem numarası — {{BSEG}}’in 3 hanelik sınırını aşar' },
          { ad:'HSL / WSL / KSL', aciklama:'Şirket kodu / belge / grup para birimi tutarları' },
        ] },

      { ad:'T001', baslik:'Şirket kodu tanımı',
        tutar:'Şirket kodunun adı, ülkesi, para birimi, hesap planı ve mali yıl varyantı.',
        olusturan:'{{OX02}} ve {{OBY6}} ile yapılandırma',
        guncelleyen:'{{OX02}}, {{OBY6}}',
        anahtar:'BUKRS',
        iliskiler:'{{BKPF}}, {{SKB1}}, {{LFB1}}, {{KNB1}} — şirket koduna bağlı her tablo buraya bakar.',
        s4:'Değişmedi.',
        alanlar:[
          { ad:'WAERS', aciklama:'Yerel para birimi' },
          { ad:'KTOPL', aciklama:'Operasyonel {{hesap-plani}}' },
          { ad:'PERIV', aciklama:'{{mali-yil-varyanti}}' },
        ] },
    ],

    er: {
      type:'er',
      baslik:'FI belgesinin çevresindeki tablo ağı',
      varliklar:[
        { ad:'T001', rol:'Yapılandırma', aciklama:'Şirket kodu',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'KTOPL' }, { ad:'PERIV' }] },
        { ad:'BKPF', rol:'Başlık', hub:true, aciklama:'Belgenin kimliği',
          alanlar:[{ ad:'BUKRS', tip:'fk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }, { ad:'BLART' }, { ad:'AWKEY' }] },
        { ad:'BSEG', rol:'Kalem', aciklama:'Belgenin satırları',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }, { ad:'LIFNR', tip:'fk' }, { ad:'KUNNR', tip:'fk' }] },
        { ad:'ACDOCA', rol:'Evrensel defter', aciklama:'S/4HANA tek kaynağı',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'RCNTR' }] },
        { ad:'SKB1', rol:'Ana veri', aciklama:'Hesabın şirket kodu ayarları',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'SAKNR', tip:'pk' }, { ad:'MITKZ' }, { ad:'XOPVW' }] },
        { ad:'LFB1', rol:'Ana veri', aciklama:'Satıcı muhasebe verisi',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }] },
        { ad:'BSIK', rol:'İndeks', aciklama:'Satıcı açık kalemleri',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZFBDT' }] },
      ],
      iliskiler:[
        { from:'T001', to:'BKPF', alanlar:'BUKRS', not:'her belge bir şirket koduna aittir' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'bir başlık, çok kalem' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR + GJAHR', not:'aynı belgenin evrensel görünümü' },
        { from:'BSEG', to:'SKB1', alanlar:'HKONT → SAKNR', not:'kalemin hesabı' },
        { from:'BSEG', to:'LFB1', alanlar:'LIFNR', not:'satıcı kalemi' },
        { from:'LFB1', to:'BSIK', alanlar:'LIFNR + BUKRS', not:'satıcının açık kalemleri' },
      ],
    },
  },

  /* ================================================= 7. SAP SÜRECİ === */
  sapSurec: {
    anlatim:
      'Aşağıda {{FB50}} ile bir G/L kaydının ekran ekran nasıl girildiği anlatılıyor. ' +
      'Ekran sırası ve alan mantığı diğer kayıt işlemlerinde ({{FB60}}, {{FB70}}) neredeyse aynıdır.',

    ekranlar:[
      { ad:'Başlık alanları',
        aciklama:'Ekranın üst bloğu. Buradaki tarihler belgenin hangi döneme düşeceğini belirler; en çok hata yapılan yer burasıdır.',
        alanlar:[
          { ad:'Belge tarihi (`BLDAT`)', zorunlu:true, aciklama:'Faturanın/dekontun üstündeki tarih. Raporlamada referanstır.' },
          { ad:'Kayıt tarihi (`BUDAT`)', zorunlu:true, aciklama:'**Muhasebe dönemini belirleyen tarih.** Varsayılan bugündür; geçmiş döneme kayıt için elle değiştirilir.' },
          { ad:'Şirket kodu (`BUKRS`)', zorunlu:true, aciklama:'Hangi yasal birime kayıt yapılıyor.' },
          { ad:'Belge türü (`BLART`)', zorunlu:false, aciklama:'{{FB50}}’de varsayılan SA’dır; genelde değiştirilmez.' },
          { ad:'Referans (`XBLNR`)', zorunlu:false, aciklama:'Dış belge numarası. AP tarafında satıcının fatura numarası buraya yazılır ve mükerrer fatura kontrolünü tetikler.' },
          { ad:'Belge başlık metni (`BKTXT`)', zorunlu:false, aciklama:'Belgenin tamamını açıklayan serbest metin.' },
        ],
        ipucu:'Kayıt tarihini değiştirdiğinde dönem göstergesinin de değiştiğini kontrol et. Aralık faturasını Ocak’ta girerken bu alanı atlamak, geceyi uzatan klasik hatadır.' },

      { ad:'Kalem tablosu',
        aciklama:'Alt bloktaki satır satır giriş alanı. Her satır bir {{BSEG}} kalemine dönüşür.',
        alanlar:[
          { ad:'G/L hesabı (`HKONT`)', zorunlu:true, aciklama:'Kaydın gideceği ana muhasebe hesabı. Mutabakat hesabı girilirse hata alınır.' },
          { ad:'B/A (borç-alacak)', zorunlu:true, aciklama:'Arka planda {{kayit-anahtari}}’na dönüşür: borç 40, alacak 50.' },
          { ad:'Tutar', zorunlu:true, aciklama:'Belge para biriminde. Farklı para birimi seçilirse kur alanı açılır.' },
          { ad:'Vergi kodu (`MWSKZ`)', zorunlu:false, aciklama:'Hesabın vergi kategorisi zorunlu kılıyorsa istenir. Girildiğinde SAP vergi satırını otomatik ekler.' },
          { ad:'Maliyet yeri (`KOSTL`)', zorunlu:false, aciklama:'Gider hesaplarında çoğu zaman zorunludur — {{alan-durumu}} belirler.' },
          { ad:'Atama (`ZUONR`)', zorunlu:false, aciklama:'Sonradan {{F.13}} ile otomatik kapatma yapılacaksa **kritik** alandır; eşleştirme buradan yapılır.' },
          { ad:'Metin (`SGTXT`)', zorunlu:false, aciklama:'Satır bazında açıklama. Raporlarda çok işe yarar; boş bırakmamak iyi alışkanlıktır.' },
        ] },

      { ad:'Simülasyon ekranı',
        aciklama:'*Belge → Simüle et* ile açılır. Sistemin senin girdiğin satırlara ek olarak üreteceği tüm satırları (vergi, kur farkı, belge bölme) kaydetmeden gösterir.',
        ipucu:'Kaydetmeden önce her zaman simüle et. Özellikle {{belge-bolme}} açık sistemlerde girdiğin 2 satırın 6 satıra dönüştüğünü burada görürsün.' },
    ],

    zorunlu:['Belge tarihi','Kayıt tarihi','Şirket kodu','G/L hesabı','Borç/Alacak göstergesi','Tutar'],
    opsiyonel:['Belge türü','Referans','Başlık metni','Vergi kodu','Maliyet yeri','Atama','Satır metni','Vade tarihi'],

    hatalar:[
      { mesaj:'Posting period 004 2026 is not open for account type S', sebep:'{{OB52}}’de ilgili dönem, hesap tipi S (ana muhasebe) için kapalı.', cozum:'{{OB52}} → dönem varyantına git, hesap tipi S satırında dönemi aç. Yetkin yoksa muhasebe müdürüne aç.' },
      { mesaj:'Account 320000 cannot be directly posted to', sebep:'Hesap {{mutabakat-hesabi}} olarak tanımlı ({{SKB1}} `MITKZ` dolu).', cozum:'Satıcı/müşteri üzerinden kaydet: {{FB60}} veya {{FB70}}.' },
      { mesaj:'Field Cost Center is a required field for G/L account 1000 770000', sebep:'Hesabın alan durumu grubu maliyet yerini zorunlu kılıyor.', cozum:'Maliyet yerini gir; kalıcı çözüm için {{OKB9}} ile varsayılan CO nesnesi tanımla.' },
      { mesaj:'Balance in transaction currency (borç ≠ alacak)', sebep:'{{belge-denkligi}} sağlanmamış.', cozum:'Satırları kontrol et. Denk olmayan belgeyi saklamak istiyorsan {{FV50}} ile park et.' },
      { mesaj:'Document number 1900000001 was already assigned', sebep:'Numara aralığı çakışması — genelde veri geçişinden sonra sayacın güncellenmemesi.', cozum:'{{FBN1}} ile ilgili aralığın güncel numarasını (`NRLEVEL`) mevcut en yüksek belge numarasının üstüne çek.' },
      { mesaj:'Tax code A1 does not exist in company code 1000', sebep:'{{vergi-kodu}} o ülke/şirket kodu için tanımlı değil.', cozum:'{{FTXP}} ile doğru ülke anahtarında tanımla veya doğru kodu kullan.' },
    ],

    ipuclari:[
      'Herhangi bir ekranda alan adının teknik karşılığını öğrenmek için alana tıklayıp **F1** → *Teknik bilgi*. Tablo ve alan adı orada yazar; {{SE16N}} sorgusu böyle hazırlanır.',
      '**F4** yardımı ile arama yaparken sonuç çok geliyorsa arama kriterine yıldız (`*`) koyarak daralt: `*kira*`.',
      'Sık kullandığın işlemleri favorilere ekle (SAP Easy Access ekranında sağ tık → Favorilere ekle). Gün içinde onlarca tıklama kazandırır.',
      'İşlem kodunu komut satırına `/n` ile yazarsan mevcut işlemden çıkıp yenisine gidersin (`/nFB03`); `/o` ile yeni pencerede açarsın (`/oFBL1N`). Danışmanın en çok kullandığı iki kısayoldur.',
      'Bir kaydın CO tarafına düşüp düşmediğini {{FB03}} → *İlgili belgeler* menüsünden kontrol et.',
    ],
  },

  /* ===================================================== 8. TEKNİK === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'1 başlık satırı — belge numarası, tür, tarihler, kullanıcı, kaynak referansı' },
      { tablo:'BSEG', ne:'Her giriş satırı için 1 kalem; vergi kodu varsa sistemin eklediği vergi satırı da buraya' },
      { tablo:'ACDOCA', ne:'Aynı kalemler evrensel formatta; her aktif {{defter}} için ayrı satır kümesi' },
      { tablo:'BSET', ne:'Vergi satırları: matrah, vergi tutarı, hesap anahtarı' },
      { tablo:'BSIK', ne:'Satıcı kalemi ise açık kalem olarak (S/4HANA’da {{uyumluluk-view}} üzerinden)' },
      { tablo:'BSID', ne:'Müşteri kalemi ise açık kalem olarak' },
    ],

    commit:
      'Kaydet tuşuna basıldığında tüm yazma işlemleri tek bir LUW (Logical Unit of Work) içinde toplanır ve ' +
      '`COMMIT WORK` ile atomik olarak yazılır. Ya hepsi ya hiçbiri. ' +
      'Numara ataması ise ayrı bir LUW’da (`UPDATE` görevi dışında) çalışır — bu yüzden **iptal edilen bir kayıtta bile ' +
      'belge numarası tüketilmiş olabilir** ve numaralarda boşluk oluşur. Bu normaldir, hata değildir.',

    belgeNo:
      'Belge numarası **kaydetme anında** verilir, ekran açıldığında değil. Sıra: ' +
      '{{belge-turu}} → bağlı numara aralığı anahtarı → {{FBN1}}’deki şirket kodu + mali yıl satırı → sonraki numara. ' +
      'İç atamada (internal) numarayı sistem verir; dış atamada (external) kullanıcı girer ve tekillik kontrol edilir.',

    postingLogic:
      'Zincir şudur: **belge türü** hangi hesap tiplerine izin verildiğini belirler → **kayıt anahtarı** satırın yönünü ' +
      've hedef hesap tipini belirler → **alan durumu** hangi alanların zorunlu olacağını belirler → ' +
      '**denge kontrolü** borç = alacak doğrular → **numara ataması** ve **veritabanı yazımı**.\n\n' +
      'Alan durumu iki kaynaktan gelir: hesabın alan durumu grubu ({{SKB1}} `FSTAG`) ve kayıt anahtarının alan durumu. ' +
      '**En kısıtlayıcı olan kazanır** — biri "gizli" diyorsa alan gizlenir, diğeri "zorunlu" dese bile. ' +
      'Bu çakışma, "alanı neden göremiyorum?" sorusunun en sık cevabıdır.',

    belgeTuru:
      '{{belge-turu}} üç şeyi belirler: izin verilen {{hesap-tipi}} kümesi, kullanılacak {{numara-araligi}} ve ' +
      'ters kayıt için varsayılan tür. Standart türler: **SA** genel, **KR** satıcı faturası, **KZ** satıcı ödemesi, ' +
      '**DR** müşteri faturası, **DZ** müşteri tahsilatı, **RE** lojistik fatura, **RV** SD faturası, **AF** amortisman, **AB** genel.',

    numberRange:
      'FI numara aralığı **şirket kodu + mali yıl** bazlıdır ve {{FBN1}} ile tanımlanır. ' +
      'Yeni mali yıl için satır açılmazsa yılbaşında kayıt durur — canlıya geçen her projede Aralık ayında ' +
      'yapılacaklar listesinin ilk maddesi budur. Aralık tanımı **taşınmaz**, her sistemde ayrı yapılır.',

    accountDetermination:
      'Elle kayıtta hesabı kullanıcı girer. Otomatik kayıtlarda ise kural tabloları belirler: ' +
      'MM tarafında {{OBYC}} (işlem anahtarı + {{degerleme-sinifi}}), SD tarafında {{VKOA}}, vergide {{OB40}}. ' +
      'Hepsi sonuçta {{T030}} tablosuna yazar. "Account determination for entry ... not possible" hatası ' +
      'bu tablolardaki eksik satırı işaret eder.',

    tur:
      '**Özelleştirme:** hesap planı, belge türleri, numara aralığı **tanımı**, alan durumu grupları, hesap belirleme kuralları.\n\n' +
      '**Ana veri:** G/L hesapları, satıcılar, müşteriler, duran varlıklar, ev bankaları.\n\n' +
      '**Hareket verisi:** belgeler, ödeme çalıştırmaları, ekstreler.',

    transport:
      'Özelleştirme taşıma isteğine girer ve geliştirme → test → canlı yolunu izler. ' +
      'Ana veri ve hareket verisi taşınmaz; her sistemde ayrı yüklenir ({{LSMW}}, {{LTMC}} veya elle). ' +
      '**İstisna:** numara aralıklarının *tanımı* taşınabilir ama *güncel sayaç değeri* taşınmaz — ' +
      'bu ayrımı bilmemek canlıya geçişte numara çakışmasına yol açar.',

    img:[
      { yol:'SPRO → Kurumsal Yapı → Tanım → Finansal Muhasebe → Şirket Kodunu Düzenle/Kopyala/Sil', not:'{{sirket-kodu}} oluşturma ({{OX02}})' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Şirket Kodu → Global Parametreleri Girin', not:'Şirket kodu global ayarları ({{OBY6}})' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Belge Türleri → Başlık İçin Belge Türlerini Tanımla', not:'{{belge-turu}} ({{OBA7}})' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Belge Numara Aralıkları', not:'{{numara-araligi}} ({{FBN1}})' },
      { yol:'SPRO → Finansal Muhasebe → Finansal Muhasebe Genel Ayarları → Belge → Kayıt Dönemleri → Kayıt Dönemlerini Aç ve Kapat', not:'Dönem kontrolü ({{OB52}})' },
    ],

    notlar:[
      { tip:'warn', baslik:'BSEG doğrudan sorgulanmaz', metin:
        '{{BSEG}} bir cluster tablodur; `HKONT` veya `KOSTL` gibi anahtar olmayan alanlara göre ' +
        'SELECT çekmek felaket derecede yavaştır. Bu yüzden indeks tabloları ({{BSIK}}, {{BSID}}, {{BSIS}}) icat edilmiştir. ' +
        'S/4HANA’da doğru adres {{ACDOCA}}’dır.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'FI’ın **kuralları** S/4HANA ile değişmedi; değişen, verinin nerede durduğu ve ana verinin nasıl yönetildiğidir. ' +
      'Mülakatta "S/4HANA’da FI’da ne değişti?" sorusunun tam cevabı üç başlıktır: ' +
      '**Evrensel Kayıt Defteri**, **İş Ortağı zorunluluğu** ve **tablo sadeleşmesi**.',

    eccFarklari:[
      { konu:'Veri modeli', ecc:'{{BSEG}} + {{FAGLFLEXA}} + {{GLT0}} + COEP + {{ANEP}} ayrı ayrı', s4:'{{ACDOCA}} tek tabloda; diğerleri {{uyumluluk-view}}' },
      { konu:'Müşteri/Satıcı ana verisi', ecc:'{{XK01}} / {{XD01}} ile ayrı ayrı', s4:'{{BP}} zorunlu — Customer/Vendor Integration (CVI)' },
      { konu:'Masraf türü', ecc:'{{KA01}} ile ayrı ana veri', s4:'G/L hesabının bir tipi — {{FS00}}’da "Primary Costs" seçilir' },
      { konu:'Toplam tabloları', ecc:'Önceden hesaplanıp saklanır', s4:'Kaldırıldı; anlık hesaplanır' },
      { konu:'Kalem numarası', ecc:'{{BSEG}} `BUZEI` — 3 hane, 999 kalem sınırı', s4:'{{ACDOCA}} `DOCLN` — 6 hane, pratikte sınırsız' },
      { konu:'FI–CO mutabakatı', ecc:'Periyodik mutabakat işlemi gerekir', s4:'Aynı satırda oldukları için gereksiz' },
      { konu:'Duran varlık', ecc:'Klasik AA; değerler {{ANLC}}/{{ANEP}}’te', s4:'Enterprise Asset Accounting; değerler {{ACDOCA}}’da, defter bazlı' },
    ],

    universalJournal:
      '{{ACDOCA}}, FI kalemini + CO nesnesini + varlık numarasını + kâr merkezini **tek satırda** tutar. ' +
      'Pratik sonuçları: (1) FI ile CO arasında uyumsuzluk yapısal olarak imkânsızlaşır, ' +
      '(2) toplam tabloları gereksizleşir, (3) her boyutta anlık raporlama mümkün olur, ' +
      '(4) {{paralel-defter}} artık ek bir yük değil, sadece farklı bir `RLDNR` değeridir.',

    kalkanTcodes:[
      { eski:'{{FK01}} / {{FK02}} / {{FK03}}', yeni:'{{BP}}', not:'Satıcı ana verisi artık İş Ortağı üzerinden yönetilir' },
      { eski:'{{FD01}} / {{XD01}}', yeni:'{{BP}}', not:'Müşteri ana verisi için aynı kural' },
      { eski:'{{KA01}}', yeni:'{{FS00}}', not:'Masraf türü G/L hesabının tipine dönüştü' },
      { eski:'{{FBL3N}}', yeni:'{{FAGLL03}} / Fiori', not:'Çalışmaya devam eder ama defter bazlı raporlama için yenisi önerilir' },
      { eski:'{{AFAB}}', yeni:'FAA_DEPRECIATION_POST', not:'AFAB yeni programa yönlendirir' },
    ],

    fiori:[
      { ad:'Post General Journal Entries', aciklama:'{{FB50}}’nin Fiori karşılığı; Excel’den toplu yükleme desteği var.' },
      { ad:'Display Journal Entries', aciklama:'{{FB03}} yerine; belgeyi ve tüm ilişkili nesneleri tek ekranda gösterir.' },
      { ad:'Manage Journal Entries', aciklama:'Park edilmiş ve tamamlanmamış belgeleri iş listesi olarak yönetir.' },
      { ad:'Trial Balance', aciklama:'Anlık mizan; hesaptan kaleme, kalemden belgeye tek tıkla inilir.' },
      { ad:'Maintain Business Partner', aciklama:'{{BP}} — müşteri ve satıcı için tek giriş noktası.' },
    ],

    compatibilityViews:[
      '{{BSIS}}, {{BSAS}}, {{BSIK}}, {{BSAK}}, {{BSID}}, {{BSAD}} — artık fiziksel tablo değil, {{ACDOCA}} üzerinden üretilen görünümler.',
      '{{GLT0}}, {{FAGLFLEXT}} — toplam tabloları da view’e dönüştü.',
      'Bu view’lere **INSERT/UPDATE yapılamaz**. Eski özel programlar okuma yapıyorsa çalışır, yazma yapıyorsa bozulur — geçiş projelerinde taranması gereken ilk risk budur.',
    ],

    performans:
      'Toplam tabloları kaldırıldığı ve HANA sütun tabanlı çalıştığı için bakiye sorguları milyonlarca kalemi ' +
      'anlık toplayabilir. Ayrıca kilitlenme (lock) sorunları azalır: eskiden aynı hesaba eşzamanlı kayıt ' +
      'toplam tablosu satırını kilitlerdi, artık böyle bir satır yok.',

    bestPractices:[
      'Yeni geliştirmelerde {{BSEG}} yerine {{ACDOCA}} veya CDS view kullan; performans farkı büyüktür.',
      'Özel programları taşımadan önce {{uyumluluk-view}}’lere yazma yapıp yapmadıklarını tara.',
      'Müşteri/satıcı yükleme senaryolarını {{BP}} üzerinden kurgula; {{LSMW}} ile klasik ekran kaydı yapmaya çalışma.',
      'Hesap planını sadeleştirme fırsatı olarak kullan — S/4HANA geçişi hesap sayısını azaltmak için en iyi andır.',
    ],
  },

  /* =================================================== 10. SENARYO === */
  senaryo: {
    baslik:'Aynı fatura, üç farklı kapı: FI, MM ve SD',
    hikaye:
      '**Marmara Tekstil A.Ş.** (şirket kodu 1000) aynı hafta içinde üç işlem yapıyor: ' +
      'bir danışmanlık faturası alıyor, siparişe bağlı kumaş alıyor ve bir müşteriye satış yapıyor. ' +
      'Üçü de FI belgesi üretiyor ama üçü de farklı kapıdan giriyor. ' +
      'Bu senaryo, FI’ın neden "kavşak" olduğunu somut olarak gösterir.',
    veriler:[
      { k:'Şirket kodu', v:'1000 — Marmara Tekstil A.Ş.' },
      { k:'Dönem', v:'Nisan 2026 (dönem 04)' },
      { k:'KDV', v:'%20' },
      { k:'Satıcılar', v:'V-2001 (danışmanlık), V-3001 (kumaş)' },
      { k:'Müşteri', v:'C-5001' },
    ],

    adimlar:[
      { baslik:'Kapı 1 — Danışmanlık faturası doğrudan FI’a girilir', tcode:'FB60',
        aciklama:'Sipariş yok, mal girişi yok. Muhasebeci faturayı doğrudan girer. Bu, FI’ın **tek başına** çalıştığı senaryodur.',
        girdi:[
          { alan:'Satıcı', deger:'V-2001' },
          { alan:'Fatura tarihi / Kayıt tarihi', deger:'10.04.2026 / 10.04.2026' },
          { alan:'Referans (`XBLNR`)', deger:'DAN-2026-0417 (satıcının fatura no)' },
          { alan:'Tutar / Vergi kodu', deger:'60.000 TL brüt / %20' },
          { alan:'Gider satırı', deger:'770 Genel yönetim gideri — 50.000, Maliyet yeri: 1200 Finans' },
          { alan:'Ödeme koşulu', deger:'30 gün net → vade 10.05.2026' },
        ],
        fis:{ baslik:'Belge 1900000045 — Danışmanlık faturası', belgeTuru:'KR', tarih:'10.04.2026',
          satirlar:[
            { hesap:'770', ad:'Genel yönetim gideri', borc:50000, not:'Maliyet yeri 1200 → CO’ya da düşer' },
            { hesap:'191', ad:'İndirilecek KDV', borc:10000, not:'Vergi kodundan otomatik' },
            { hesap:'320', ad:'Satıcılar — V-2001', alacak:60000 },
          ] },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'BLART = KR, XBLNR = DAN-2026-0417, AWTYP boş (FI’da doğdu)' },
          { tablo:'BSEG', ne:'3 kalem; satıcı satırında AUGBL boş → **açık kalem**' },
          { tablo:'BSIK', ne:'Yeni açık kalem, vade 10.05.2026' },
          { tablo:'BSET', ne:'Vergi satırı: matrah 50.000, vergi 10.000' },
          { tablo:'ACDOCA', ne:'3 satır; gider satırında RCNTR = 1200' },
        ],
        not:'Referans alanına satıcının fatura numarasını yazmak önemlidir: SAP aynı satıcıdan aynı numarayla ikinci fatura girilirse mükerrer uyarısı verir.' },

      { baslik:'Kapı 2a — Kumaş siparişi ve mal girişi', tcode:'MIGO',
        aciklama:'Kumaş için önce satınalma siparişi açıldı ({{EKKO}}/{{EKPO}}). Mal depoya girdiğinde FI belgesi **otomatik** doğar. Muhasebeci hiçbir şey girmez.',
        girdi:[
          { alan:'Hareket türü', deger:'101 — Siparişe mal girişi' },
          { alan:'Satınalma siparişi', deger:'4500001234, kalem 10' },
          { alan:'Miktar / Değer', deger:'1.000 m × 80 TL = 80.000 TL' },
        ],
        fis:{ baslik:'Belge 5000000123 — Mal girişi', belgeTuru:'WE', tarih:'12.04.2026',
          satirlar:[
            { hesap:'153', ad:'Ticari mallar (stok)', borc:80000, not:'{{OBYC}} işlem anahtarı **BSX**' },
            { hesap:'159', ad:'GR/IR hesabı', alacak:80000, not:'{{OBYC}} işlem anahtarı **WRX**' },
          ], not:'Satıcıya borç **henüz yazılmadı** — fatura gelmedi. Bu boşluğu {{gr-ir}} hesabı taşır.' },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'Malzeme belgesi kalemi, hareket türü 101' },
          { tablo:'BKPF', ne:'AWTYP = MKPF, AWKEY = malzeme belgesi → FI belgesinin kaynağı izlenebilir' },
        ] },

      { baslik:'Kapı 2b — Kumaş faturası MM’den girilir', tcode:'MIRO',
        aciklama:'Fatura geldiğinde {{uc-yonlu-eslestirme}} yapılır: sipariş 80.000, mal girişi 80.000, fatura 80.000 → uyumlu, bloke yok.',
        girdi:[
          { alan:'Fatura tarihi', deger:'20.04.2026' },
          { alan:'Satınalma siparişi', deger:'4500001234' },
          { alan:'Fatura tutarı', deger:'96.000 TL (KDV dâhil)' },
        ],
        fis:{ baslik:'Belge 5100000078 — Kumaş faturası', belgeTuru:'RE', tarih:'20.04.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR hesabı', borc:80000, not:'Mal girişindeki alacak kapanıyor' },
            { hesap:'191', ad:'İndirilecek KDV', borc:16000 },
            { hesap:'320', ad:'Satıcılar — V-3001', alacak:96000 },
          ], not:'{{gr-ir}} hesabı bu kalem için sıfırlandı. Bakiyesi sürekli büyüyorsa ya mal gelip fatura gelmiyordur ya da tersi — {{F.19}} ile analiz edilir.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'V-3001 için yeni açık kalem 96.000 TL' },
          { tablo:'BKPF', ne:'AWTYP = RMRP (lojistik fatura doğrulama)' },
        ],
        not:'Fatura tutarı sipariş fiyatından farklı olsaydı fark {{gr-ir}} yerine fiyat farkı hesabına ({{OBYC}} → PRD) giderdi ve fatura ödemeye bloklanabilirdi ({{MRBR}} ile açılır).' },

      { baslik:'Kapı 3 — Müşteri faturası SD’den gelir', tcode:'VF01',
        aciklama:'Satış ekibi teslimat üzerinden fatura kesiyor. Kaydedildiğinde FI belgesi otomatik doğar; hesapları {{VKOA}} belirler.',
        girdi:[
          { alan:'Teslimat / Fatura tipi', deger:'80001234 / F2 (standart fatura)' },
          { alan:'Müşteri', deger:'C-5001' },
          { alan:'Net tutar', deger:'100.000 TL + 20.000 TL KDV' },
        ],
        fis:{ baslik:'Belge 1800000091 — SD faturası', belgeTuru:'RV', tarih:'25.04.2026',
          satirlar:[
            { hesap:'120', ad:'Müşteriler — C-5001', borc:120000 },
            { hesap:'600', ad:'Yurtiçi satışlar', alacak:100000, not:'{{VKOA}} hesap belirlemesi' },
            { hesap:'391', ad:'Hesaplanan KDV', alacak:20000 },
          ] },
        tabloEtkisi:[
          { tablo:'VBRK', ne:'SD fatura başlığı; `RFBSK` alanı muhasebeye aktarım durumunu tutar' },
          { tablo:'BSID', ne:'C-5001 için açık alacak kalemi' },
          { tablo:'BKPF', ne:'AWTYP = VBRK, AWKEY = SD fatura numarası' },
        ],
        not:'FI belgesi oluşmadıysa `RFBSK` alanı "A" (aktarılmadı) kalır. Sebep neredeyse her zaman {{VKOA}}’da eksik hesap belirlemesidir; düzeltip {{VF02}} ile yeniden aktarılır.' },

      { baslik:'Ay sonu — üç kapının da sonucu tek yerde', tcode:'FBL3N',
        aciklama:'Üç farklı kapıdan giren kayıtlar aynı ana muhasebe hesaplarında buluşur. Muhasebeci artık kaynağın ne olduğuna bakmadan tek bir mizanla çalışır.',
        girdi:[
          { alan:'Kontrol 1', deger:'{{FBL1N}} → satıcı açık kalemleri: V-2001 60.000 + V-3001 96.000' },
          { alan:'Kontrol 2', deger:'{{FBL5N}} → müşteri açık kalemleri: C-5001 120.000' },
          { alan:'Kontrol 3', deger:'{{FBL3N}} → 159 GR/IR hesabı bakiyesi sıfır olmalı' },
          { alan:'Kontrol 4', deger:'{{FB03}} → şüpheli belgede *AWKEY* ile kaynağa in' },
        ] },
    ],

    sonuc:
      'Nisan sonunda FI’da üç kaynaktan gelmiş toplam **5 belge** var ve hiçbiri birbirinden farklı bir yapıda değil: ' +
      'hepsi bir {{BKPF}} başlığı ve dengeli {{BSEG}} kalemlerinden oluşuyor.\n\n' +
      'Öğrenilecek asıl ders: **"Bu işlem SAP’ta nasıl yapılır?" sorusundan önce "bu işlem hangi FI belgesini üretir?" ' +
      'sorusunu sor.** Belgeyi bildiğinde hangi modülden geldiği, hangi hesaba gittiği ve hata alındığında nereye ' +
      'bakılacağı kendiliğinden ortaya çıkar. FI danışmanlığı büyük ölçüde bu tek alışkanlıktır.',
  },

  /* =================================================== 11. ÖĞRENME === */
  ogrenme: {
    ozet:[
      'FI, SAP’ın dış dünyaya karşı sorumlu muhasebe modülüdür; tüm modüllerin yolu buraya çıkar.',
      'FI’ın çıktısı tek bir nesnedir: **FI belgesi** = {{BKPF}} başlığı + dengeli {{BSEG}} kalemleri.',
      'Alt bileşenler: **FI-GL** ana muhasebe, **FI-AP** satıcılar, **FI-AR** müşteriler, **FI-AA** duran varlık, **FI-BL** banka.',
      'Veri iki yoldan girer: elle kayıt ve entegrasyondan otomatik akış. Olgun sistemlerde çoğunluk ikincisidir.',
      'Otomatik kayıtların hesabını kural tabloları belirler: {{OBYC}} (MM), {{VKOA}} (SD), {{OB40}} (vergi) → hepsi {{T030}}.',
      '{{mutabakat-hesabi}}’na doğrudan kayıt yapılamaz; muavin defter üzerinden yazılır.',
      'S/4HANA’da üç büyük değişiklik: {{ACDOCA}} evrensel defteri, {{BP}} zorunluluğu ve tablo sadeleşmesi.',
    ],

    onemliNoktalar:[
      '**"FI ile CO farkı nedir?"** FI dışarıya yasal rapor üretir, CO içeriye yönetim raporu. S/4HANA’da ikisi aynı tabloda ({{ACDOCA}}) tutulur ve mutabakat gerekmez.',
      '**"Bir FI belgesi hangi tablolara yazar?"** {{BKPF}}, {{BSEG}}, {{ACDOCA}}; vergi varsa {{BSET}}; satıcı/müşteri kalemi varsa {{BSIK}}/{{BSID}}.',
      '**"Alan durumu çakışırsa ne olur?"** Hesabın alan durumu grubu ile kayıt anahtarının alan durumu karşılaştırılır, **en kısıtlayıcı** olan uygulanır.',
      '**"Belge numarası ne zaman verilir?"** Kaydetme anında. İptal edilen işlemde bile numara tüketilmiş olabilir; numara boşluğu normaldir.',
      '**"MM’den gelen kayıt hangi hesaba gider?"** {{OBYC}}’de işlem anahtarı (BSX stok, WRX GR/IR, PRD fiyat farkı) + {{degerleme-sinifi}} kombinasyonuna göre.',
      '**"AWKEY ne işe yarar?"** FI belgesinin hangi kaynak belgeden doğduğunu tutar; entegrasyon hatalarının izini sürmenin en hızlı yoludur.',
      '**"S/4HANA’da FK01 neden çalışmıyor?"** Satıcı/müşteri ana verisi artık {{BP}} üzerinden yönetilir (CVI zorunluluğu).',
    ],

    sikHatalar:[
      { hata:'Mutabakat hesabına ({{FS00}}’da `MITKZ` dolu olan) doğrudan kayıt denemek.', dogru:'{{FB60}}/{{FB70}} ile satıcı/müşteri numarası girilir; hesabı SAP ana veriden bulur.' },
      { hata:'Kayıt tarihi ile belge tarihini aynı sanmak.', dogru:'Dönemi **kayıt tarihi** (`BUDAT`) belirler. Aralık faturasını Ocak’ta girerken bu alan elle düzeltilir.' },
      { hata:'"Account determination not possible" hatasında hesabı elle girmeye çalışmak.', dogru:'Hata bir yapılandırma eksiğidir; {{OBYC}}/{{VKOA}}/{{OB40}}’ta ilgili satır tamamlanır.' },
      { hata:'{{BSEG}}’i {{SE16N}}’de hesap numarasına göre sorgulamak.', dogru:'Cluster tablodur, çok yavaştır. {{ACDOCA}} veya {{FBL3N}} kullanılır.' },
      { hata:'Yeni mali yıl için numara aralığı açmayı unutmak.', dogru:'Her Aralık’ta {{FBN1}} ile yeni yıl satırları açılır; yoksa yılbaşında kayıt durur.' },
      { hata:'SD faturası muhasebeleşmedi diye faturayı iptal edip yeniden kesmek.', dogru:'Önce {{VKOA}} eksiği giderilir, sonra {{VF02}} ile yeniden aktarılır. İptal gereksizdir.' },
      { hata:'GR/IR hesabının bakiyesini görmezden gelmek.', dogru:'Dönem sonunda {{F.19}} ile analiz edilir; büyük bakiye ya eksik fatura ya eksik mal girişi demektir.' },
    ],

    ipuclari:[
      'Yeni bir SAP sistemine girdiğinde ilk yapacağın şey {{OBY6}}’dan şirket kodunun global parametrelerine bakmaktır: hesap planı, mali yıl varyantı, dönem varyantı. Sistemin karakterini bir ekranda öğrenirsin.',
      'Bir hatayı çözerken sırayla sor: **hangi belge türü? hangi hesap? hangi alan durumu? hangi dönem?** Hataların büyük çoğunluğu bu dördünden biridir.',
      '{{FB03}} → *İlgili belgeler* menüsü, entegrasyon sorunlarında zaman kazandıran en iyi tek özelliktir.',
      'Alan adının teknik karşılığı için **F1 → Teknik bilgi**. Tablo ve alan adını öğrenmeden {{SE16N}} sorgusu yazma.',
      'Bir hesabın davranışını anlamadıysan {{FS00}}’a git: açık kalem yönetimi, vergi kategorisi ve alan durumu grubu çoğu sorunun cevabını verir.',
    ],

    quiz:[
      { soru:'Bir FI belgesi minimum hangi tablolara yazar?',
        secenekler:['Sadece {{BKPF}}','{{BKPF}} ve {{BSEG}}','{{BKPF}}, {{BSEG}} ve {{ACDOCA}}','{{BSEG}} ve {{BSET}}'],
        dogru:2,
        aciklama:'S/4HANA’da her muhasebe belgesi başlık ({{BKPF}}), klasik kalem ({{BSEG}}) ve evrensel kalem ({{ACDOCA}}) olarak yazılır. {{BSET}} yalnızca vergi kodu varsa oluşur.' },

      { soru:'Mal girişi ({{MIGO}}) yapıldığında satıcıya borç neden henüz yazılmaz?',
        secenekler:[
          'Satıcı ana verisi eksik olduğu için',
          'Fatura gelmediği için; fark {{gr-ir}} hesabında bekletilir',
          'Muhasebe onayı beklendiği için',
          'KDV hesaplanamadığı için',
        ], dogru:1,
        aciklama:'Mal geldi ama fatura gelmedi. Bu zaman farkını {{gr-ir}} hesabı taşır. Fatura {{MIRO}} ile girildiğinde GR/IR kapanır ve borç satıcıya geçer.' },

      { soru:'"Field Cost Center is a required field for G/L account ..." hatasının kaynağı nedir?',
        secenekler:[
          'Maliyet yeri ana verisi silinmiş',
          'Dönem kapalı',
          'Hesabın {{alan-durumu}} grubu maliyet yerini zorunlu kılmış',
          'Belge türü yanlış seçilmiş',
        ], dogru:2,
        aciklama:'{{alan-durumu}}, hesabın ana verisindeki gruptan ({{SKB1}} `FSTAG`) ve kayıt anahtarından gelir; en kısıtlayıcı olan uygulanır. Kalıcı çözüm için {{OKB9}} ile varsayılan CO nesnesi tanımlanabilir.' },

      { soru:'S/4HANA’da {{FK01}} ile satıcı açmaya çalışırsan ne olur?',
        secenekler:[
          'Normal şekilde açılır',
          'İşlem kaldırılmıştır; {{BP}} kullanılmalıdır',
          'Sadece görüntüleme modunda açılır',
          'Yetki hatası verir',
        ], dogru:1,
        aciklama:'S/4HANA’da Customer/Vendor Integration (CVI) zorunludur: müşteri ve satıcı yalnızca {{BP}} üzerinden yönetilir. Klasik işlemler kaldırılmış veya {{BP}}’ye yönlendirilmiştir.' },

      { soru:'SD faturası kesildi ama FI belgesi oluşmadı. İlk nereye bakılır?',
        secenekler:[
          '{{OB52}} — dönem kontrolü',
          '{{VKOA}} — gelir hesabı belirleme',
          '{{FBN1}} — numara aralığı',
          '{{FS00}} — hesap ana verisi',
        ], dogru:1,
        aciklama:'SD faturasının muhasebeleşmemesinin en sık sebebi {{VKOA}}’da eksik hesap belirlemesidir. Düzeltildikten sonra {{VF02}} ile yeniden aktarılır. (Dönem kapalıysa da olabilir, ama birinci şüpheli VKOA’dır.)' },

      { soru:'{{BSEG}} tablosunda `AUGBL` alanı boşsa bu ne anlama gelir?',
        secenekler:[
          'Belge iptal edilmiş',
          'Belge park edilmiş',
          'Kalem hâlâ **açıktır** — kapatılmamış',
          'Kalemde vergi yok',
        ], dogru:2,
        aciklama:'`AUGBL` kapatma belgesinin numarasıdır. Doluysa kalem {{kapatma}} işlemiyle kapanmıştır; boşsa {{acik-kalem}} olarak durur ve {{BSIK}}/{{BSID}} üzerinde görünür.' },

      { soru:'Hangisi taşıma isteğine (transport request) **girmez**?',
        secenekler:[
          'Belge türü tanımı',
          'Hesap planı yapısı',
          'G/L hesabının kendisi',
          'Alan durumu grubu tanımı',
        ], dogru:2,
        aciklama:'G/L hesabı bir {{ana-veri}}dir; taşınmaz, her sistemde ayrı açılır veya yüklenir. Diğer üçü {{ozellestirme}}dir ve taşıma isteğiyle taşınır.' },
    ],

    flashcards:[
      { on:'FI’ın ürettiği tek nesne nedir?', arka:'**FI belgesi.**\n\nBir başlık (BKPF) + en az iki kalem (BSEG), borç = alacak.\n\nNereden gelirse gelsin (elle, MM, SD, HR) yapı hep aynıdır.' },
      { on:'FI’ın beş alt bileşeni nedir?', arka:'**FI-GL** Ana muhasebe\n**FI-AP** Satıcılar\n**FI-AR** Müşteriler\n**FI-AA** Duran varlık\n**FI-BL** Banka\n\nVergi ayrı modül değil, FI’a yayılmış bir katmandır.' },
      { on:'Otomatik hesap belirleme hangi işlem kodlarından yapılır?', arka:'**OBYC** → MM (mal hareketleri)\n**VKOA** → SD (satış gelirleri)\n**OB40** → Vergi\n\nÜçü de sonuçta **T030** tablosuna yazar.' },
      { on:'Mutabakat hesabı nedir, neden doğrudan kayıt yapılamaz?', arka:'Muavin defterin (satıcı/müşteri/varlık) ana muhasebeye yansıdığı G/L hesabıdır.\n\nDoğrudan kayıt yapılsa muavin defter ile ana muhasebe **tutarsız** hale gelirdi. SAP bunu engeller.' },
      { on:'GR/IR hesabı ne işe yarar?', arka:'**Mal girişi ile fatura girişi arasındaki zaman farkını** taşır.\n\nMal geldi fatura gelmediyse alacak bakiye, tersi ise borç bakiye verir.\n\nDönem sonunda F.19 ile analiz edilir.' },
      { on:'BKPF’teki AWTYP ve AWKEY alanları ne işe yarar?', arka:'FI belgesinin **hangi kaynak belgeden** doğduğunu tutar.\n\n`RMRP` = MIRO faturası, `VBRK` = SD faturası, `MKPF` = malzeme belgesi.\n\nEntegrasyon hatalarında izi süren alan budur.' },
      { on:'Alan durumu (field status) nereden gelir ve çakışırsa ne olur?', arka:'İki kaynaktan: **hesabın alan durumu grubu** (SKB1-FSTAG) ve **kayıt anahtarının** alan durumu.\n\nÇakışırsa **en kısıtlayıcı** olan kazanır — biri "gizli" diyorsa alan gizlenir.' },
      { on:'S/4HANA’da FI’da değişen üç büyük şey nedir?', arka:'1. **ACDOCA** — Evrensel Kayıt Defteri (tek tablo)\n2. **BP zorunluluğu** — müşteri/satıcı ana verisi\n3. **Tablo sadeleşmesi** — toplam ve indeks tabloları compatibility view’e dönüştü' },
      { on:'Belge türü (document type) neyi belirler?', arka:'1. Hangi **hesap tiplerine** kayıt yapılabileceğini\n2. Hangi **numara aralığından** numara alınacağını\n3. Ters kayıt için varsayılan türü\n\nÖrn: KR satıcı faturası, DZ müşteri tahsilatı, RV SD faturası.' },
      { on:'FI numara aralığı hangi kırılımda tanımlanır?', arka:'**Şirket kodu + mali yıl** bazında, FBN1 ile.\n\nYeni yıl için satır açılmazsa yılbaşında kayıt durur. Sayaç değeri taşınmaz, her sistemde ayrıdır.' },
      { on:'BSEG neden yavaştır, alternatifi nedir?', arka:'**Cluster tablodur** (RFBLG içinde saklanır); anahtar olmayan alanlara göre sorgu çok yavaştır.\n\nBu yüzden indeks tabloları (BSIK/BSID/BSIS) vardır. S/4HANA’da doğru adres **ACDOCA**’dır.' },
      { on:'Bir belgenin CO’ya düşüp düşmediğini nasıl kontrol edersin?', arka:'**FB03** → *Ortam / İlgili belgeler* menüsü.\n\nOrada CO belgesi görünmüyorsa ya hesap masraf türü değildir ya da CO nesnesi (maliyet yeri) girilmemiştir.' },
    ],
  },

  },
});
