/* ==========================================================================
   data/catalog.js — Modüller, konu grupları ve konu kataloğu
   --------------------------------------------------------------------------
   Buradaki her konu bir "stub"tır: kart bilgisi (başlık, ikon, renk, özet,
   ilgili konular, T-code ve tablo listesi) vardır ama derin `sections` yoktur.
   content/<modul>/<konu>.js dosyası aynı id ile SAP.registerTopic çağırıp
   derin bölümleri ekler ve konu otomatik olarak status:'ready' olur.

   Yeni konu eklemek: buraya bir stub + content altına bir dosya + index.html'e
   tek satır <script src>. Başka hiçbir yeri değiştirmek gerekmez.

   `hue` = oklch hue açısı; kartın rengi bundan tek formülle hesaplanır.
   ========================================================================== */

SAP.registerModule({ id:'FI', name:'Finansal Muhasebe', short:'FI', icon:'💰', order:1,
  aciklama:'SAP S/4HANA Financial Accounting — dış muhasebe, yasal raporlama ve ödeme süreçleri.' });

/* Kenar çubuğundaki gruplar — sıra burada belirlenir. */
SAP.GROUPS = [
  { id:'temeller',    ad:'Temeller',              ic:'🧱' },
  { id:'surecler',    ad:'Ana Süreçler',          ic:'🏛️' },
  { id:'islemler',    ad:'Günlük İşlemler',       ic:'⚙️' },
  { id:'donem-sonu',  ad:'Dönem Sonu',            ic:'📅' },
  { id:'mimari',      ad:'Muhasebe Mimarisi',     ic:'🧭' },
  { id:'entegrasyon', ad:'Entegrasyon',           ic:'🔗' },
  { id:'teknik',      ad:'Teknik & Raporlama',    ic:'🛠️' },
  { id:'veri',        ad:'Veri & Geçiş',          ic:'📦' },
  { id:'ileri',       ad:'İleri Seviye',          ic:'🚀' },
];

[
  /* ------------------------------------------------------- Temeller --- */
  { id:'genel-muhasebe', grup:'temeller', title:'Genel Muhasebe', icon:'📗', hue:150,
    level:'Başlangıç', minutes:40,
    summary:'SAP’a girmeden önce bilinmesi gereken muhasebe dili: borç–alacak mantığı, çift taraflı kayıt, bilanço ve gelir tablosu, tahakkuk esası.',
    related:['fi-temelleri','gl-accounting','document-posting'],
    tcodes:[], tables:[] },

  { id:'fi-temelleri', grup:'temeller', title:'SAP FI Temelleri', icon:'🏛️', hue:265,
    level:'Başlangıç', minutes:45,
    summary:'FI modülünün kapsamı, alt bileşenleri (GL, AP, AR, AA, BL), diğer modüllerle ilişkisi ve bir FI belgesinin anatomisi.',
    related:['org-yapisi','gl-accounting','document-posting','s4-yenilikleri'],
    tcodes:['FB03','FS00','FB50'], tables:['BKPF','BSEG','ACDOCA','T001'] },

  { id:'org-yapisi', grup:'temeller', title:'Kuruluş Yapısı', icon:'🏗️', hue:200,
    level:'Başlangıç', minutes:35,
    summary:'Şirket, şirket kodu, iş alanı, hesap planı, mali yıl varyantı, kredi kontrol alanı — FI’ın üzerine kurulduğu organizasyon iskeleti.',
    related:['fi-temelleri','master-data','new-gl'],
    tcodes:['OX02','OBY6','OB13','OB29'], tables:['T001','T004','T009'] },

  { id:'master-data', grup:'temeller', title:'Master Data (Ana Veri)', icon:'🗂️', hue:35,
    level:'Orta', minutes:55,
    summary:'G/L hesabı, satıcı, müşteri ve banka ana verisi; hesap grubu, alan durumu, mutabakat hesabı ve S/4HANA’daki İş Ortağı (BP) yaklaşımı.',
    related:['gl-accounting','accounts-payable','accounts-receivable','org-yapisi'],
    tcodes:['FS00','BP','XK01','XD01','OBD4'], tables:['SKA1','SKB1','LFA1','LFB1','KNA1','KNB1'] },

  /* --------------------------------------------------- Ana Süreçler --- */
  { id:'gl-accounting', grup:'surecler', title:'G/L Accounting (Ana Muhasebe)', icon:'📒', hue:275,
    level:'Orta', minutes:60,
    summary:'Ana muhasebenin çalışma mantığı: hesap yapısı, açık kalem yönetimi, kayıt tipleri, bakiye ve kalem raporları, S/4HANA’da ACDOCA’nın rolü.',
    related:['master-data','document-posting','new-gl','clearing','reporting'],
    tcodes:['FS00','FB50','F-02','FBL3N','FAGLL03','FS10N'], tables:['SKA1','SKB1','BKPF','BSEG','ACDOCA','GLT0'] },

  { id:'accounts-payable', grup:'surecler', title:'Accounts Payable (Satıcılar)', icon:'📤', hue:20,
    level:'Orta', minutes:55,
    summary:'Satın almadan ödemeye (Procure-to-Pay) uzanan borç süreci: satıcı ana verisi, fatura girişi, ödeme, kapatma ve yaşlandırma.',
    related:['accounts-receivable','f110','clearing','mm-integration','special-gl'],
    tcodes:['FB60','FBL1N','F-53','F-44','F110','MIRO'], tables:['LFA1','LFB1','BSIK','BSAK','BKPF','BSEG'] },

  { id:'accounts-receivable', grup:'surecler', title:'Accounts Receivable (Müşteriler)', icon:'📥', hue:340,
    level:'Orta', minutes:55,
    summary:'Siparişten tahsilata (Order-to-Cash) uzanan alacak süreci: müşteri ana verisi, fatura, tahsilat, kapatma, yaşlandırma ve ihtar.',
    related:['accounts-payable','dunning','clearing','sd-integration'],
    tcodes:['FB70','FBL5N','F-28','F-32','F150'], tables:['KNA1','KNB1','BSID','BSAD'] },

  { id:'asset-accounting', grup:'surecler', title:'Asset Accounting (Duran Varlık)', icon:'🏭', hue:95,
    level:'İleri', minutes:65,
    summary:'Varlığın doğumundan ölümüne: edinim, amortisman, transfer, hurdaya ayırma ve satış; amortisman alanları ve paralel değerleme.',
    related:['closing','parallel-ledger','mm-integration'],
    tcodes:['AS01','AW01N','ABZON','AFAB','ABAVN','ABUMN'], tables:['ANLA','ANLB','ANLC','ANEP'] },

  { id:'dogrulama-ikame', grup:'islemler', title:'Doğrulama ve İkame', icon:'🛡️', hue:280,
    level:'İleri', minutes:45,
    summary:'Kayıt anında devreye giren kural motoru: doğrulama (validation) hatalı kaydı engeller, ikame (substitution) alan değerini otomatik doldurur veya değiştirir.',
    related:['document-posting','error-handling','best-practices'],
    tcodes:['GGB0','GGB1','GGB4','OB28','OBBH'], tables:['BKPF','BSEG'] },

  { id:'bank-accounting', grup:'surecler', title:'Bank Accounting (Banka)', icon:'🏦', hue:230,
    level:'Orta', minutes:45,
    summary:'Ev bankası tanımı, banka ara hesapları, manuel ekstre, çek yönetimi ve nakit akışının muhasebeye yansıması.',
    related:['ebs','f110','accounts-payable'],
    tcodes:['FI12','FF67','FCHN','FCH5'], tables:['BNKA','T012','T012K','PAYR'] },

  /* ------------------------------------------------ Günlük İşlemler --- */
  { id:'document-posting', grup:'islemler', title:'Document Posting (Belge Kaydı)', icon:'✍️', hue:290,
    level:'Orta', minutes:50,
    summary:'Bir FI belgesi nasıl doğar: belge türü, kayıt anahtarı, alan durumu, numara aralığı, kayıt tarihi–belge tarihi ayrımı ve belge iptali.',
    related:['gl-accounting','document-parking','error-handling','fi-temelleri'],
    tcodes:['FB50','F-02','FB60','FB03','FB08','OBA7','FBN1'], tables:['BKPF','BSEG','T003','TBSL'] },

  { id:'document-parking', grup:'islemler', title:'Document Parking (Ön Kayıt)', icon:'🅿️', hue:50,
    level:'Orta', minutes:30,
    summary:'Belgeyi muhasebeleştirmeden saklama, dört-göz prensibi, onay akışı ve park ile hold arasındaki fark.',
    related:['document-posting','error-handling'],
    tcodes:['FV50','FV60','FBV0','FBV2','FBV4'], tables:['BKPF','BSEG'] },

  { id:'clearing', grup:'islemler', title:'Clearing (Kapatma)', icon:'🔗', hue:180,
    level:'Orta', minutes:45,
    summary:'Açık kalem mantığı, manuel ve otomatik kapatma, kısmi ve kalan kapatma, tolerans ve kapatmayı geri alma.',
    related:['accounts-payable','accounts-receivable','gl-accounting','ebs'],
    tcodes:['F-03','F-32','F-44','F.13','FBRA'], tables:['BSEG','BSIK','BSAK','BSID','BSAD'] },

  { id:'special-gl', grup:'islemler', title:'Special G/L (Özel Ana Muhasebe)', icon:'🎯', hue:315,
    level:'İleri', minutes:40,
    summary:'Avans, teminat ve senet gibi işlemlerin normal mutabakat hesabından ayrı izlenmesi; özel ana muhasebe göstergeleri.',
    related:['accounts-payable','accounts-receivable','clearing'],
    tcodes:['F-47','F-48','F-54','F-29','F-39'], tables:['BSEG','BSIK','BSID'] },

  { id:'f110', grup:'islemler', title:'Automatic Payment Program (F110)', icon:'⚡', hue:60,
    level:'İleri', minutes:60,
    summary:'Toplu ödemenin baştan sona akışı: parametre, öneri (proposal), öneri düzenleme, ödeme çalıştırması ve ödeme ortamı üretimi.',
    related:['accounts-payable','bank-accounting','clearing','ebs'],
    tcodes:['F110','FBZP','F-53'], tables:['REGUH','REGUP','REGUV','BSIK','BSAK'] },

  { id:'ebs', grup:'islemler', title:'Electronic Bank Statement', icon:'🧾', hue:210,
    level:'İleri', minutes:50,
    summary:'MT940/CAMT dosyasının yüklenmesi, banka işlem kodları, kayıt kuralları, otomatik eşleşme ve eşleşmeyen satırların düzeltilmesi.',
    related:['bank-accounting','clearing','f110'],
    tcodes:['FF_5','FEBAN','FEBA','OT83'], tables:['FEBKO','FEBEP','BNKA'] },

  { id:'dunning', grup:'islemler', title:'Dunning (İhtar)', icon:'📨', hue:10,
    level:'Orta', minutes:35,
    summary:'Vadesi geçmiş alacaklarda kademeli hatırlatma: ihtar prosedürü, seviyeler, ihtar çalıştırması ve müşteriye yansıması.',
    related:['accounts-receivable','clearing'],
    tcodes:['F150','FBMP','FBL5N'], tables:['KNB1','BSID'] },

  { id:'taxes', grup:'islemler', title:'Taxes (Vergiler)', icon:'🧮', hue:75,
    level:'Orta', minutes:40,
    summary:'Vergi kodu mantığı, matrah ve vergi hesaplaması, indirilecek/hesaplanan KDV ayrımı, vergi hesap belirleme ve beyan raporları.',
    related:['document-posting','accounts-payable','accounts-receivable'],
    tcodes:['FTXP','OB40','OBCN','F.12'], tables:['BSET','T030'] },

  { id:'e-donusum', grup:'islemler', title:'E-Dönüşüm (e-Fatura, e-Arşiv, e-Defter)', icon:'📡', hue:200,
    level:'İleri', minutes:50,
    summary:'Türkiye’ye özgü elektronik belge zorunluluğu: e-fatura, e-arşiv, e-irsaliye ve e-defter. ' +
            'Muhasebe belgesi ile e-belgenin neden iki ayrı yaşam döngüsü olduğu, ' +
            'GİB akışı, özel entegratör mimarisi ve sessiz red hatası.',
    related:['taxes','sd-integration','error-handling','closing'],
    tcodes:['EDOC_COCKPIT','EDOC_RESUBMIT','FB03','VF03'],
    tables:['EDOCUMENT','EDOCUMENTFILE','BKPF','VBRK'] },

  /* ------------------------------------------------------ Dönem Sonu --- */
  { id:'foreign-currency', grup:'donem-sonu', title:'Foreign Currency Valuation', icon:'💱', hue:170,
    level:'İleri', minutes:45,
    summary:'Döviz kurları, çevrim ve değerleme farkı, gerçekleşmiş/gerçekleşmemiş kur farkı ve dönem sonu değerleme çalıştırması.',
    related:['closing','gl-accounting','accounts-payable'],
    tcodes:['F.05','FAGL_FC_VAL'], tables:['TCURR','TCURV','BSEG'] },

  { id:'closing', grup:'donem-sonu', title:'Closing Operations (Kapanış)', icon:'📅', hue:250,
    level:'İleri', minutes:60,
    summary:'Ay sonu ve yıl sonu kapanış takvimi: dönem açma/kapama, değerleme, yeniden sınıflama, bakiye devri ve kapanış kontrol listesi.',
    related:['foreign-currency','asset-accounting','gl-accounting','reporting'],
    tcodes:['OB52','F.05','F.19','FAGLF101','FAGLGVTR','AJAB'], tables:['T001B','ACDOCA'] },

  /* ---------------------------------------------- Muhasebe Mimarisi --- */
  { id:'new-gl', grup:'mimari', title:'New G/L (Yeni Ana Muhasebe)', icon:'🧭', hue:285,
    level:'İleri', minutes:50,
    summary:'Klasik ana muhasebeden farkı: genişletilmiş veri yapısı, belge bölme (document splitting), gerçek zamanlı FI–CO entegrasyonu.',
    related:['parallel-ledger','gl-accounting','s4-yenilikleri','co-integration'],
    tcodes:['FAGLL03','FAGLB03'], tables:['FAGLFLEXA','FAGLFLEXT','ACDOCA'] },

  { id:'parallel-ledger', grup:'mimari', title:'Parallel Ledger (Paralel Defter)', icon:'📚', hue:305,
    level:'İleri', minutes:45,
    summary:'Aynı işlemi birden çok muhasebe standardına (yerel, IFRS, vergi) göre kaydetme: lider defter, ek defterler ve defter bazlı kayıt.',
    related:['new-gl','asset-accounting','closing'],
    tcodes:['FAGLL03','FAGLB03'], tables:['ACDOCA','FAGLFLEXA'] },

  /* ------------------------------------------------------ Entegrasyon --- */
  { id:'cost-center', grup:'entegrasyon', title:'Cost Center Integration', icon:'🎛️', hue:130,
    level:'Orta', minutes:35,
    summary:'Gider kaydının CO tarafına yansıması: maliyet yeri, gerçek zamanlı entegrasyon ve varsayılan hesap ataması.',
    related:['co-integration','gl-accounting','new-gl'],
    tcodes:['KS01','KSB1','OKB9'], tables:['ACDOCA','BSEG'] },

  { id:'co-integration', grup:'entegrasyon', title:'CO Integration', icon:'📊', hue:115,
    level:'İleri', minutes:45,
    summary:'FI ile CO arasındaki köprü: masraf türü, gerçek zamanlı mutabakat, iç sipariş ve S/4HANA’da tek tabloda birleşme.',
    related:['cost-center','new-gl','s4-yenilikleri'],
    tcodes:['KA01','OKB9','KSB1'], tables:['ACDOCA'] },

  { id:'mm-integration', grup:'entegrasyon', title:'MM Integration', icon:'📦', hue:40,
    level:'İleri', minutes:50,
    summary:'Satın alma sürecinin muhasebe ayağı: mal girişi, GR/IR hesabı, fatura doğrulama, üç yönlü eşleştirme ve otomatik hesap belirleme.',
    related:['accounts-payable','taxes','gl-accounting'],
    tcodes:['MIGO','MIRO','OBYC','MRBR','F.19'], tables:['EKKO','EKPO','MSEG','T030'] },

  { id:'sd-integration', grup:'entegrasyon', title:'SD Integration', icon:'🛒', hue:355,
    level:'İleri', minutes:45,
    summary:'Satış faturasının FI’a aktarılması: gelir hesabı belirleme, aktarım hataları ve teslimat–fatura–muhasebe zinciri.',
    related:['accounts-receivable','taxes','gl-accounting'],
    tcodes:['VF01','VF02','VKOA'], tables:['VBRK','VBRP','BKPF'] },

  /* -------------------------------------------- Teknik & Raporlama --- */
  { id:'sap-tables', grup:'teknik', title:'SAP Tables (Tablolar)', icon:'🗃️', hue:220,
    level:'Orta', minutes:45,
    summary:'FI tablo mimarisi: başlık–kalem ilişkisi, indeks ve toplam tabloları, tabloların birbirine nasıl bağlandığı ve S/4HANA’daki sadeleşme.',
    related:['s4-yenilikleri','gl-accounting','reporting'],
    tcodes:['SE16N','SE11'], tables:['BKPF','BSEG','ACDOCA','BSIK','BSID','CDHDR','CDPOS'] },

  { id:'tcodes', grup:'teknik', title:'SAP Transaction Codes', icon:'⌨️', hue:255,
    level:'Başlangıç', minutes:30,
    summary:'İşlem kodu mantığı, isimlendirme kalıpları, en kritik FI kodlarının haritası ve S/4HANA’da kalkan/değişen kodlar.',
    related:['fi-temelleri','s4-yenilikleri','reporting'],
    tcodes:['SE93','SU3','SMEN','SPRO','SE16N'], tables:['TSTC','TSTCT'] },

  { id:'reporting', grup:'teknik', title:'Reporting (Raporlama)', icon:'📈', hue:190,
    level:'Orta', minutes:45,
    summary:'Kalem ve bakiye raporları, mali tablo yapısı, ALV düzenleri, Report Painter ve S/4HANA’da Fiori/CDS tabanlı raporlama.',
    related:['gl-accounting','closing','s4-yenilikleri'],
    tcodes:['FBL3N','FAGLL03','F.01','OB58','GR55','FGI0'], tables:['ACDOCA','GLT0'] },

  /* ------------------------------------------------- Veri & Geçiş --- */
  { id:'lsmw', grup:'veri', title:'LSMW', icon:'🔧', hue:25,
    level:'İleri', minutes:50,
    summary:'14 adımlı klasik veri aktarım aracı: kayıt (recording), toplu giriş, alan eşleme, dönüşüm kuralı ve S/4HANA’daki yeri.',
    related:['migration','data-upload','master-data'],
    tcodes:['LSMW','SHDB','SM35'], tables:[] },

  { id:'migration', grup:'veri', title:'Migration (Veri Geçişi)', icon:'🚚', hue:85,
    level:'İleri', minutes:50,
    summary:'ECC’den S/4HANA’ya geçiş yaklaşımları, Migration Cockpit, bakiye ve açık kalem taşıma stratejisi, mutabakat kontrolleri.',
    related:['lsmw','data-upload','s4-yenilikleri'],
    tcodes:['LTMC','LTMOM'], tables:['ACDOCA','BKPF','BSEG'] },

  { id:'data-upload', grup:'veri', title:'Data Upload (Veri Yükleme)', icon:'⬆️', hue:145,
    level:'Orta', minutes:40,
    summary:'Toplu giriş (batch input), BAPI, IDoc ve Excel şablonlarıyla veri yükleme; hata yönetimi ve tekrar çalıştırılabilirlik.',
    related:['lsmw','migration','error-handling'],
    tcodes:['SM35','SHDB','WE02','BD87'], tables:[] },

  /* ------------------------------------------------- İleri Seviye --- */
  { id:'error-handling', grup:'ileri', title:'Error Handling (Hata Yönetimi)', icon:'🚨', hue:15,
    level:'Orta', minutes:45,
    summary:'FI’da en sık karşılaşılan hataların kataloğu: dönem kapalı, hesap belirleme eksik, yetki, kilit, dengesiz belge ve çözüm yolları.',
    related:['document-posting','closing','mm-integration','best-practices'],
    tcodes:['OB52','SU53','ST22','SM13','SM12','SLG1','OBA5'], tables:['T001B','BALHDR'] },

  { id:'best-practices', grup:'ileri', title:'Best Practices', icon:'🏆', hue:105,
    level:'İleri', minutes:40,
    summary:'Danışmanlık pratiği: yapılandırma disiplini, taşıma isteği yönetimi, dokümantasyon, test senaryosu yazımı ve sık yapılan tasarım hataları.',
    related:['error-handling','s4-yenilikleri','closing'],
    tcodes:['SPRO','OBA5'], tables:[] },

  { id:'s4-yenilikleri', grup:'ileri', title:'S/4HANA Yenilikleri', icon:'🚀', hue:295,
    level:'İleri', minutes:55,
    summary:'ECC ile farklar: Evrensel Kayıt Defteri (ACDOCA), İş Ortağı zorunluluğu, kalkan işlem kodları, uyumluluk view’leri, Fiori ve performans.',
    related:['new-gl','sap-tables','migration','reporting'],
    tcodes:['BP','FAGLL03','SE16N'], tables:['ACDOCA','BSEG','FAGLFLEXT','GLT0'] },

].forEach(function (t) {
  t.module = 'FI';
  t.status = 'planned';
  SAP.registerTopic(t);
});
