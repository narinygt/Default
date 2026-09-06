/**
 * SUNUM METİNLERİ — tek kaynak, iki dil.
 * =================================================================
 * Sayfa sırası müşterinin verdiği listeye göredir (01–11).
 *
 * YAZIM KURALI
 *  • Kısa ve somut: slaytta cümle değil bilgi durur.
 *  • Site cümleleri BİREBİR KOPYALANMAZ. Bilgi sitedendir, ifade
 *    kurumsal sunum diline yeniden yazılmıştır.
 *  • Uydurma rakam, müşteri, sertifika ya da ödül yoktur; tek
 *    sayısal iddia "10+ yıl"dır ve o da sitede yazılıdır.
 */

const en = {
  lang: 'en', file: 'CPeak-Consultancy-Company-Overview',
  title: 'CPeak Consultancy — Company Overview',
  subject: 'SAP finance modules, S/4HANA transformation and SAP cloud architecture',
  figSuffix: '', foot: 'CPeak Consultancy',
  labels: { steps: 'HOW THE WORK RUNS', who: 'WHO IT SUITS', duration: 'DURATION', scope: 'SCOPE' },

  cover: {
    eyebrow: 'COMPANY OVERVIEW',
    h1: '10+ years of SAP finance\nexperience and SAP\ncloud architecture',
    size: 31,
    lead: 'Finance modules, S/4HANA transformation and SAP cloud architecture.',
    meta: 'CPEAKCONSULTANCY.COM  ·  ISTANBUL',
    notes: 'Kapak.',
  },

  finance: {
    eyebrow: 'SOLUTION 01',
    title: 'SAP Finance Modules',
    lead: 'End-to-end design, configuration and go-live across the finance modules.',
    blocks: [
      ['FI', 'Financial Accounting', 'General ledger, payables, receivables, asset and bank accounting. Chart of accounts and enterprise structure design.'],
      ['CO', 'Controlling', 'Cost centres, internal orders, product costing and allocation logic.'],
      ['PA', 'Profitability Analysis', 'Margin analysis by product, customer and channel; the data basis for management reporting.'],
      ['PS', 'Project System', 'Project-level cost and budget tracking for investment and customer projects.'],
    ],
    flowLabel: 'PROJECT FLOW',
    flow: [
      ['Diagnosis', 'Analysis of the current setup'],
      ['Design', 'Chart of accounts and structure'],
      ['Build', 'Costing and profitability'],
      ['Close', 'Process redesign'],
      ['Handover', 'Go-live and training'],
    ],
    notes: 'Modül kırılımı; SAP finans modüllerinin standart kapsamı.',
  },

  s4hana: {
    eyebrow: 'SOLUTION 02',
    title: 'S/4HANA Transformation',
    lead: 'The transition route sets the duration, the cost and the technical debt carried forward.',
    routesLabel: 'TRANSITION ROUTES',
    routes: [
      ['System conversion', 'BROWNFIELD', 'The existing system is converted in place. History and processes are preserved; the fastest route with least disruption.'],
      ['New implementation', 'GREENFIELD', 'The system is built from scratch. Processes are redesigned on SAP standard; historical data moves in limited form.'],
      ['Selective data transition', 'SELECTIVE DATA TRANSITION', 'Chosen company codes, processes and data objects are carried over. Keeps data while allowing process redesign.'],
    ],
    flowLabel: 'PROJECT FLOW',
    flow: [
      ['Readiness', 'Inventory and compatibility scan'],
      ['Simplification', 'Clearing custom code'],
      ['Conversion', 'Finance-side build'],
      ['Migration', 'Data transfer and testing'],
      ['Cutover', 'Go-live and hypercare'],
    ],
    notes: 'Üç geçiş yöntemi; SAP’ın standart geçiş seçenekleri.',
  },

  publicCloud: {
    eyebrow: 'SOLUTION 03',
    title: 'SAP Public Cloud',
    lead: 'SAP Cloud ERP Public Edition — cloud ERP built on standard scope and deployed quickly.',
    blocks: [
      ['01', 'Standard scope', 'SAP best-practice processes come preconfigured; deployment follows a standard template.'],
      ['02', 'Fit-to-standard', 'Processes are compared to standard scope item by item and gaps closed in workshops.'],
      ['03', 'Extensibility', 'The core stays fixed. Additional needs are met through SAP BTP and supported extension methods.'],
      ['04', 'Release cycle', 'Two major releases a year plus monthly feature updates. A regression test set is required for critical processes.'],
      ['05', 'Integration', 'Banking, e-document and surrounding system connections use standard interfaces.'],
    ],
    schemaLabel: 'WHERE CHANGE IS ALLOWED',
    schema: [
      ['STANDARD CORE', 'Not modifiable; releases apply automatically.'],
      ['EXTENSION LAYER', 'Additional needs met only through supported methods.'],
    ],
    notes: 'Public Edition kırılımı.',
  },

  privateCloud: {
    eyebrow: 'SOLUTION 04',
    title: 'SAP Private Cloud',
    lead: 'RISE with SAP · Cloud ERP Private Edition — cloud operations without giving up your own process logic.',
    blocks: [
      ['01', 'Dedicated environment', 'The system runs in its own tenant; more control over data residency and network architecture.'],
      ['02', 'ABAP and customisation', 'Broad flexibility including core modification; existing ABAP developments can be carried across.'],
      ['03', 'Release control', 'Annual releases; you decide when to upgrade.'],
      ['04', 'Migration management', 'Mock migrations, reconciliation reporting and an hour-by-hour cutover plan.'],
      ['05', 'Handover', 'Hypercare, key user training and documentation transfer.'],
    ],
    schemaLabel: 'WHERE RESPONSIBILITY SITS',
    schema: [
      ['SAP', 'Infrastructure, base operations, platform availability'],
      ['CPEAK', 'Architecture, finance processes, migration management'],
      ['YOUR TEAM', 'Process ownership, acceptance testing, daily operation'],
    ],
    notes: 'Private Edition kırılımı.',
  },

  compare: {
    eyebrow: 'SOLUTION 05',
    title: 'Public and Private Cloud compared',
    headers: ['CRITERION', 'PUBLIC CLOUD', 'PRIVATE CLOUD'],
    rows: [
      ['Deployment', 'Standard template, fit-to-standard', 'Adapted to existing processes'],
      ['Extensibility', 'Core fixed; extension via SAP BTP', 'Broad flexibility including ABAP'],
      ['Release cycle', 'Two major releases a year, automatic', 'Annual release, timing is yours'],
      ['Infrastructure', 'Shared tenant, operated by SAP', 'Dedicated tenant, more control'],
      ['Implementation', '3–5 months (single-country finance)', '7–14 months'],
      ['Total cost', 'Predictable; operations and upgrades included', 'Variable; maintenance and testing with you'],
      ['Typical fit', 'Mid-market, close to standard', 'Heavy customisation and integration history'],
    ],
    bandLead: 'We take no side.  ',
    bandBody: 'Processes are compared against standard scope and both models are put side by side. The decision stays yours.',
    notes: 'İki sürümün karşılaştırması, tablo olarak.',
  },

  ai: {
    eyebrow: 'SOLUTION 06',
    title: 'AI in Finance',
    lead: 'SAP’s AI capabilities are embedded in the system; they are not bought as a separate product.',
    blocks: [
      ['Intelligent matching', 'Bank statements and open items are cleared automatically from learned matching behaviour.'],
      ['Anomaly detection', 'Unusual postings are flagged before the close, so corrections happen within the period.'],
      ['Predictive accounting', 'The effect of not-yet-final transactions becomes visible before the period closes.'],
      ['Joule', 'A natural-language layer for querying and navigation; reports are reached by command.'],
    ],
    flowLabel: 'DECISION FLOW',
    flow: [
      ['Scan', 'Transactions are scanned'],
      ['Flag', 'The model isolates candidates'],
      ['Review', 'Consultant and team check'],
      ['Approve', 'Finalised with human approval'],
    ],
    rule: 'No decision producing a financial posting is finalised without human review.',
    notes: 'SAP’ın finans tarafındaki yerleşik yapay zeka yetenekleri.',
  },


  deliverables: {
    eyebrow: 'DELIVERY 07', title: 'What is delivered',
    leftLabel: 'DELIVERABLES',
    left: ['Diagnostic report with prioritised findings',
           'Target architecture and chart of accounts design',
           'Configuration documentation',
           'Data migration plan and reconciliation reports',
           'Test scenarios and recorded results',
           'Hour-by-hour cutover plan with rollback criteria',
           'Key user training and operating handbook'],
    rightLabel: 'REPORTING, FIXED AT THE OUTSET',
    right: ['Weekly status: done, in progress, risks, decisions pending',
            'Open decision list with owners and dates',
            'Risk register: owner, impact, mitigation',
            'Phase-end pack: documents, test records, acceptance',
            'Change log with time and cost impact'],
    notes: 'Teslim kalemleri çözüm sayfalarından, raporlama düzeni yaklaşım sayfasından.',
  },

  method: {
    eyebrow: 'DELIVERY 08', title: 'How we work',
    lead: 'Each stage ends in a defined deliverable. No stage starts before the previous one closes.',
    durationLabel: 'DURATION',
    steps: [['01', 'Assessment', 'Diagnostic report', '2–6 weeks'],
            ['02', 'Architecture and roadmap', 'Target architecture, phased plan', '3–6 weeks'],
            ['03', 'Delivery', 'Working system, test records', '3–14 months'],
            ['04', 'Hypercare', 'Closeout and improvement report', '4–12 weeks']],
    modelsLabel: 'ENGAGEMENT MODELS',
    models: [['Assessment', '2–6 weeks'], ['Delivery', '3–14 months'], ['Expert support', 'Days to weeks']],
    notes: 'Dört aşamalı teslim modeli; aşama çıktıları görselin içinde yazılı.',
  },

  references: {
    eyebrow: 'REFERENCES 09', title: 'Organisations our consultants have worked with',
    notes: 'Sitenin referans bandındaki logoların tamamı.',
  },

  approach: {
    eyebrow: 'APPROACH 10', title: 'Our approach',
    principles: [
      ['Measure first', 'No recommendation without system data.'],
      ['Written reasoning', 'The decision is yours; the rationale stays on paper.'],
      ['Early warning', 'A slipping estimate is reported that week.'],
      ['Ownership transfer', 'Tests and the first close are run together.'],
      ['Phases, not headcount', 'Growing scope is split, not staffed up.'],
      ['AI in preparation', 'Volume work automated, judgement reviewed by seniors.'],
    ],
    notes: 'Yaklaşım sayfasındaki ilkeler ve çalışma modelleri, tek satıra indirilerek.',
  },

  focus: {
    eyebrow: 'FOCUS 11', title: 'What we work on',
    items: [
      ['01', 'Finance modules', 'SAP FI · CO · PA · PS',
       'Enterprise structure, chart of accounts, controlling, profitability and the close.'],
      ['02', 'Cloud architecture', 'PRIVATE · PUBLIC',
       'Fit assessment, target architecture and migration management.'],
      ['03', 'AI and RPA automation', 'EMBEDDED IN SAP',
       'Matching, anomaly detection and predictive accounting.'],
    ],
    facts: 'FOUNDED 2021  ·  ISTANBUL  ·  TÜRKİYE, EMEA, UNITED STATES  ·  SENIOR CONSULTANTS ONLY',
    declineLabel: 'WORK WE DECLINE',
    decline: ['Lead responsibility for modules outside our specialism',
              'Staff augmentation without delivery responsibility',
              'Fixed-price transformation before an assessment',
              'Software development or infrastructure operations'],
    notes: 'Hakkımızda sayfasının odak bölümü ve üstlenilmeyen işler.',
  },

  closing: {
    eyebrow: 'CONTACT', title: 'CPeak Consultancy', size: 30,
    lead: 'SAP finance modules · S/4HANA transformation · SAP cloud architecture',
    invite: 'Let us arrange a call to review your programme. We respond within one business day.',
    contact: [['GENERAL', 'info@cpeakconsultancy.com'],
              ['DIRECT', 'Kerem Yiğit\nkerem.yigit@cpeakconsultancy.com'],
              ['TELEPHONE', '+90 (507) 032 81 70'],
              ['OFFICE HOURS', 'Monday – Friday · 09:00 – 18:00 (GMT+3)'],
              ['WEB', 'cpeakconsultancy.com'],
              ['LINKEDIN', 'linkedin.com/company/cpeak-consultancy']],
    address: 'Bostancı Mah. Şemsettin Günaltay Cad. No: 31/8  ·  34744 Kadıköy, İstanbul, Türkiye',
    notes: 'Kurumsal iletişim sayfası; bilgiler site yapılandırmasından.',
  },
};

const tr = {
  lang: 'tr', file: 'CPeak-Consultancy-Kurumsal-Tanitim',
  title: 'CPeak Consultancy — Kurumsal Tanıtım',
  subject: 'SAP finans modülleri, S/4HANA dönüşümü ve SAP bulut mimarisi',
  figSuffix: '-tr', foot: 'CPeak Consultancy',
  labels: { steps: 'ÇALIŞMA ADIMLARI', who: 'KİME UYGUN', duration: 'SÜRE', scope: 'KAPSAM' },

  cover: {
    eyebrow: 'KURUMSAL TANITIM',
    h1: 'SAP Finansallarda 10+ Yıl\nDeneyim ve SAP\nBulut Mimarisi',
    size: 28,
    lead: 'Finans modülleri, S/4HANA dönüşümü ve SAP bulut mimarisi.',
    meta: 'CPEAKCONSULTANCY.COM  ·  İSTANBUL',
    notes: 'Kapak.',
  },

  finance: {
    eyebrow: 'ÇÖZÜM 01',
    title: 'SAP Finans Modülleri',
    lead: 'Finans modüllerinde uçtan uca tasarım, kurulum ve devreye alma.',
    blocks: [
      ['FI', 'Finansal Muhasebe', 'Ana defter, borçlar, alacaklar, duran varlık ve banka muhasebesi. Hesap planı ile organizasyon yapısının tasarımı.'],
      ['CO', 'Kontrolling', 'Maliyet merkezi, iç sipariş, ürün maliyetleme ve dağıtım anahtarlarının kurgusu.'],
      ['PA', 'Kârlılık Analizi', 'Ürün, müşteri ve kanal bazında marj analizi; yönetim raporlamasının veri temeli.'],
      ['PS', 'Proje Sistemi', 'Proje bazlı maliyet ve bütçe takibi; yatırım ve müşteri projelerinin finansal izlenmesi.'],
    ],
    flowLabel: 'PROJE AKIŞI',
    flow: [
      ['Teşhis', 'Mevcut yapının analizi'],
      ['Tasarım', 'Hesap planı ve organizasyon'],
      ['Kurgu', 'Maliyet ve kârlılık'],
      ['Kapanış', 'Süreç yeniden tasarımı'],
      ['Devir', 'Devreye alma ve eğitim'],
    ],
    notes: 'Modül kırılımı; SAP finans modüllerinin standart kapsamı ve sitedeki uzmanlık tanımı.',
  },

  s4hana: {
    eyebrow: 'ÇÖZÜM 02',
    title: 'S/4HANA Dönüşümü',
    lead: 'Geçiş yöntemi kararı; projenin süresini, maliyetini ve taşınacak teknik borcu belirler.',
    routesLabel: 'GEÇİŞ YÖNTEMLERİ',
    routes: [
      ['Sistem dönüşümü', 'BROWNFIELD', 'Mevcut sistem yerinde dönüştürülür. Tarihsel veri ve süreçler korunur; en hızlı ve en düşük kesintili yol.'],
      ['Yeni kurulum', 'GREENFIELD', 'Sistem sıfırdan kurulur. Süreçler SAP standardına göre yeniden tasarlanır, geçmiş veri sınırlı taşınır.'],
      ['Seçici veri geçişi', 'SELECTIVE DATA TRANSITION', 'Seçilen şirket kodları, süreçler ve veri nesneleri taşınır. Veriyi korurken süreç yenilemeye izin verir.'],
    ],
    flowLabel: 'PROJE AKIŞI',
    flow: [
      ['Hazırlık', 'Envanter ve uyum analizi'],
      ['Sadeleştirme', 'Özelleştirme temizliği'],
      ['Dönüşüm', 'Finans tarafının kurgusu'],
      ['Migrasyon', 'Veri taşıma ve test'],
      ['Geçiş', 'Devreye alma ve hypercare'],
    ],
    notes: 'Üç geçiş yöntemi; SAP’ın standart geçiş seçenekleri ve sitedeki yöntem anlatımı.',
  },

  publicCloud: {
    eyebrow: 'ÇÖZÜM 03',
    title: 'SAP Public Cloud',
    lead: 'SAP Cloud ERP Public Edition — standart kapsam üzerine kurulu, hızlı devreye alınan bulut ERP.',
    blocks: [
      ['01', 'Standart kapsam', 'SAP best practice süreçleri hazır gelir; kurulum standart şablon üzerinden ilerler.'],
      ['02', 'Fit-to-standard', 'Süreçler standart kapsamla madde madde karşılaştırılır, farklar oturumlarda kapatılır.'],
      ['03', 'Genişletme', 'Çekirdek değiştirilmez. Ek ihtiyaçlar SAP BTP ve izin verilen genişletme yöntemleriyle karşılanır.'],
      ['04', 'Güncelleme döngüsü', 'Yılda iki büyük sürüm ve aylık özellik güncellemesi. Kritik süreçler için regresyon test seti gerekir.'],
      ['05', 'Entegrasyon', 'Banka, e-belge ve çevre sistem bağlantıları standart arayüzlerle kurulur.'],
    ],
    schemaLabel: 'DEĞİŞİKLİĞE NEREDE İZİN VAR',
    schema: [
      ['STANDART ÇEKİRDEK', 'Değiştirilemez; sürüm güncellemeleri otomatik uygulanır.'],
      ['GENİŞLETME KATMANI', 'Ek ihtiyaçlar yalnızca izin verilen yöntemlerle karşılanır.'],
    ],
    notes: 'Public Edition kırılımı; SAP’ın standart kapsam, BTP genişletme ve sürüm döngüsü tanımları.',
  },

  privateCloud: {
    eyebrow: 'ÇÖZÜM 04',
    title: 'SAP Private Cloud',
    lead: 'RISE with SAP · Cloud ERP Private Edition — kendi süreç mantığınızı koruyarak bulut işletimi.',
    blocks: [
      ['01', 'Ayrılmış ortam', 'Sistem kendi ortamında çalışır; veri yerleşimi ve ağ mimarisinde daha fazla kontrol.'],
      ['02', 'ABAP ve özelleştirme', 'Çekirdeğe müdahale dahil geniş esneklik; mevcut ABAP geliştirmeleri taşınabilir.'],
      ['03', 'Sürüm kontrolü', 'Yıllık sürümler; yükseltmenin zamanlamasını siz belirlersiniz.'],
      ['04', 'Geçiş yönetimi', 'Deneme geçişleri, mutabakat raporları ve saat bazında devreye alma planı.'],
      ['05', 'İşletmeye devir', 'Hypercare, anahtar kullanıcı eğitimi ve dokümantasyon devri.'],
    ],
    schemaLabel: 'SORUMLULUK DAĞILIMI',
    schema: [
      ['SAP', 'Altyapı, temel işletim, platform erişilebilirliği'],
      ['CPEAK', 'Mimari, finans süreçleri, geçiş yönetimi'],
      ['İÇ EKİP', 'Süreç sahipliği, kabul testi, günlük operasyon'],
    ],
    notes: 'Private Edition kırılımı; RISE sorumluluk dağılımı ve sürüm kontrolü.',
  },

  compare: {
    eyebrow: 'ÇÖZÜM 05',
    title: 'Public ve Private Cloud karşılaştırması',
    headers: ['ÖLÇÜT', 'PUBLIC CLOUD', 'PRIVATE CLOUD'],
    rows: [
      ['Kurulum yaklaşımı', 'Standart şablon, fit-to-standard', 'Mevcut süreçlere uyarlama'],
      ['Özelleştirme', 'Çekirdek sabit; SAP BTP ile genişletme', 'ABAP dahil geniş esneklik'],
      ['Sürüm döngüsü', 'Yılda iki büyük sürüm, otomatik', 'Yıllık sürüm, zamanlama sizde'],
      ['Altyapı', 'Paylaşımlı ortam, SAP işletir', 'Ayrılmış ortam, daha fazla kontrol'],
      ['Kurulum süresi', '3–5 ay (tek ülke finans kapsamı)', '7–14 ay'],
      ['Toplam maliyet', 'Öngörülebilir; işletim ve güncelleme dahil', 'Değişken; bakım ve test yükü sizde'],
      ['Tipik uygunluk', 'Standarda yakın orta ölçekli şirketler', 'Ağır özelleştirme ve entegrasyon mirası'],
    ],
    bandLead: 'Taraf tutmuyoruz.  ',
    bandBody: 'Süreçler standart kapsamla karşılaştırılır, iki model yan yana konur. Kararı siz verirsiniz.',
    notes: 'İki sürümün karşılaştırması, tablo olarak.',
  },

  ai: {
    eyebrow: 'ÇÖZÜM 06',
    title: 'Yapay Zeka ve Finans',
    lead: 'SAP’nin yapay zeka yetenekleri sistemin içinde yerleşiktir; ayrı bir ürün olarak satın alınmaz.',
    blocks: [
      ['Akıllı mutabakat', 'Banka ekstresi ve açık kalemler, geçmiş eşleşme davranışından öğrenilerek otomatik kapatılır.'],
      ['Anomali tespiti', 'Alışılmadık kayıtlar kapanıştan önce işaretlenir; düzeltme dönem içinde yapılır.'],
      ['Tahmine dayalı muhasebe', 'Kesinleşmemiş işlemlerin etkisi dönem kapanmadan görünür hale gelir.'],
      ['Joule', 'Doğal dille sorgulama ve gezinme katmanı; rapora komutla ulaşılır.'],
    ],
    flowLabel: 'KARAR AKIŞI',
    flow: [
      ['Tarama', 'İşlemler taranır'],
      ['İşaretleme', 'Model aday kayıtları ayırır'],
      ['İnceleme', 'Danışman ve ekip kontrol eder'],
      ['Onay', 'İnsan onayıyla kesinleşir'],
    ],
    rule: 'Finansal kayıt üreten hiçbir karar insan denetiminden geçmeden kesinleşmez.',
    notes: 'SAP’ın finans tarafındaki yerleşik yapay zeka yetenekleri ve karar akışı.',
  },


  deliverables: {
    eyebrow: 'TESLİM 07', title: 'Teslim edilenler',
    leftLabel: 'TESLİM KALEMLERİ',
    left: ['Teşhis raporu ve önceliklendirilmiş bulgular',
           'Hedef mimari ve hesap planı tasarımı',
           'Yapılandırma (customizing) dokümantasyonu',
           'Veri migrasyon planı ve mutabakat raporları',
           'Test senaryoları ve sonuç kayıtları',
           'Saat bazında devreye alma planı ve geri dönüş kriterleri',
           'Anahtar kullanıcı eğitimi ve işletme el kitabı'],
    rightLabel: 'RAPORLAMA, BAŞTAN SABİT',
    right: ['Haftalık durum: tamamlanan, devam eden, risk, karar bekleyen',
            'Açık karar listesi: sorumlu ve tarih',
            'Risk kaydı: sahip, etki, azaltma planı',
            'Faz sonu paketi: doküman, test kaydı, kabul kriteri',
            'Kapsam değişikliği kaydı: süre ve maliyet etkisiyle'],
    notes: 'Teslim kalemleri çözüm sayfalarından, raporlama düzeni yaklaşım sayfasından.',
  },

  method: {
    eyebrow: 'TESLİM 08', title: 'Nasıl çalışırız',
    lead: 'Her adım tanımlı bir çıktıyla biter. Bir adım kapanmadan diğeri başlamaz.',
    durationLabel: 'SÜRE',
    steps: [['01', 'Değerlendirme', 'Teşhis raporu', '2–6 hafta'],
            ['02', 'Mimari ve yol haritası', 'Hedef mimari, fazlı plan', '3–6 hafta'],
            ['03', 'Uygulama', 'Çalışan sistem, test kayıtları', '3–14 ay'],
            ['04', 'Hypercare', 'Kapanış ve iyileştirme raporu', '4–12 hafta']],
    modelsLabel: 'ÇALIŞMA MODELLERİ',
    models: [['Değerlendirme', '2–6 hafta'], ['Proje teslimi', '3–14 ay'], ['Uzman desteği', 'Birkaç gün – hafta']],
    notes: 'Dört aşamalı teslim modeli; aşama çıktıları görselin içinde yazılı.',
  },

  references: {
    eyebrow: 'REFERANSLAR 09', title: 'Danışmanlarımızın çalıştığı kurumlar',
    notes: 'Sitenin referans bandındaki logoların tamamı.',
  },

  approach: {
    eyebrow: 'YAKLAŞIM 10', title: 'Yaklaşımımız',
    principles: [
      ['Önce ölçüm', 'Sistem verisine bakılmadan öneri verilmez.'],
      ['Yazılı gerekçe', 'Karar sizin; gerekçe yazılı kalır.'],
      ['Erken uyarı', 'Tutmayacağı belli olan tahmin o hafta bildirilir.'],
      ['Sahipliğin devri', 'Testler ve ilk kapanış birlikte yürütülür.'],
      ['Ekip değil, faz', 'Büyüyen kapsam fazlara bölünür.'],
      ['Hazırlıkta yapay zeka', 'Hacimli iş otomatik, karar kıdemli denetiminde.'],
    ],
    notes: 'Yaklaşım sayfasındaki ilkeler ve çalışma modelleri, tek satıra indirilerek.',
  },

  focus: {
    eyebrow: 'ODAK 11', title: 'Ne üzerinde çalışıyoruz',
    items: [
      ['01', 'Finans modülleri', 'SAP FI · CO · PA · PS',
       'Organizasyon yapısı, hesap planı, maliyet, kârlılık ve kapanış süreci.'],
      ['02', 'Bulut mimarisi', 'PRIVATE · PUBLIC',
       'Uygunluk değerlendirmesi, hedef mimari ve geçiş yönetimi.'],
      ['03', 'Yapay zeka ve RPA', 'SAP İÇİNDE YERLEŞİK',
       'Mutabakat, anomali tespiti ve tahmine dayalı muhasebe.'],
    ],
    facts: 'KURULUŞ 2021  ·  İSTANBUL  ·  TÜRKİYE, EMEA, ABD  ·  YALNIZCA KIDEMLİ DANIŞMAN',
    declineLabel: 'ÜSTLENMEDİĞİMİZ İŞLER',
    decline: ['Uzmanlık alanımız dışındaki modüllerin ana sorumluluğu',
              'Teslim sorumluluğu olmadan kaynak sağlama',
              'Değerlendirme yapılmadan sabit fiyatlı dönüşüm',
              'Yazılım geliştirme ya da altyapı işletimi'],
    notes: 'Hakkımızda sayfasının odak bölümü ve üstlenilmeyen işler.',
  },

  closing: {
    eyebrow: 'İLETİŞİM', title: 'CPeak Consultancy', size: 30,
    lead: 'SAP finans modülleri · S/4HANA dönüşümü · SAP bulut mimarisi',
    invite: 'Projenizi değerlendirmek için bir görüşme planlayalım. Bir iş günü içinde dönüş yapıyoruz.',
    contact: [['GENEL', 'info@cpeakconsultancy.com'],
              ['DOĞRUDAN', 'Kerem Yiğit\nkerem.yigit@cpeakconsultancy.com'],
              ['TELEFON', '+90 (507) 032 81 70'],
              ['ÇALIŞMA SAATLERİ', 'Pazartesi – Cuma · 09:00 – 18:00 (TSİ)'],
              ['WEB', 'cpeakconsultancy.com'],
              ['LINKEDIN', 'linkedin.com/company/cpeak-consultancy']],
    address: 'Bostancı Mah. Şemsettin Günaltay Cad. No: 31/8  ·  34744 Kadıköy, İstanbul, Türkiye',
    notes: 'Kurumsal iletişim sayfası; bilgiler site yapılandırmasından.',
  },
};

module.exports = { en, tr };
