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
    eyebrow: 'SOLUTION 01', title: 'SAP Finance Modules',
    lead: 'End-to-end design and implementation across FI, CO, PA and PS.',
    steps: ['Diagnosis of the current setup', 'Chart of accounts and enterprise structure',
            'Costing and profitability', 'Redesign of the financial close', 'Go-live and handover'],
    who: ['Groups consolidating several company codes into one reporting logic',
          'Finance teams whose close runs long without a measurable cause'],
    duration: 'Diagnosis 3–4 weeks · Redesign 4–7 months',
    notes: 'Finans modülleri sayfası, kısaltılarak yeniden yazıldı.',
  },

  s4hana: {
    eyebrow: 'SOLUTION 02', title: 'S/4HANA Transformation',
    lead: 'The route is chosen on evidence: a system scan turns the debate from opinion into fact.',
    routesLabel: 'CONVERSION ROUTES, COMPARED',
    routes: [
      ['System conversion', 'Brownfield', 'The existing system is converted in place. History is preserved; processes stay largely as they are.'],
      ['New implementation', 'Greenfield', 'The system is built from scratch. Processes are renewed; historical data moves in limited form.'],
      ['Selective transition', 'Hybrid', 'Chosen data and processes are carried over. Often the shorter and cheaper total for multi-entity groups.'],
    ],
    steps: ['Readiness scan and route decision', 'Clearing customisation debt',
            'Finance transformation', 'Data migration and testing', 'Cutover and hypercare'],
    who: ['ECC users needing a conversion plan before maintenance deadlines',
          'IT organisations carrying custom code of unknown value'],
    duration: 'Assessment 4–6 weeks · Conversion 6–14 months',
    notes: 'Üç geçiş yöntemi tablosu; sitedeki yöntem anlatımından kısaltılarak türetildi.',
  },

  publicCloud: {
    eyebrow: 'SOLUTION 03', title: 'SAP Public Cloud',
    lead: 'Cloud ERP Public Edition: standard scope, fast deployment, low operational load.',
    schemaLabel: 'WHERE CHANGE IS ALLOWED',
    schema: [
      ['STANDARD CORE', 'Not modifiable. Quarterly releases apply automatically.'],
      ['EXTENSION LAYER', 'Requirements met only through supported extension methods.'],
    ],
    schemaNote: 'Which of your processes fall outside standard scope is measured before the contract, not after.',
    steps: ['Fit assessment', 'Fit-to-standard and finance setup', 'Extensibility strategy',
            'Release-cycle readiness', 'Cutover and user training'],
    who: ['Mid-market companies willing to build on standard processes',
          'Organisations with a small internal IT function'],
    duration: 'Assessment 2–3 weeks · Deployment 3–5 months',
    notes: 'Public Cloud sayfası, kısaltılarak yeniden yazıldı.',
  },

  privateCloud: {
    eyebrow: 'SOLUTION 04', title: 'SAP Private Cloud',
    lead: 'RISE with SAP and Cloud ERP Private Edition: cloud operations without giving up process flexibility.',
    schemaLabel: 'WHERE RESPONSIBILITY SITS',
    schema: [
      ['SAP', 'Infrastructure, base operations, platform availability'],
      ['CPEAK', 'Architecture, finance processes, migration management'],
      ['YOUR TEAM', 'Process ownership, acceptance testing, daily operation'],
    ],
    schemaNote: 'The boundary is written down before the project starts — that is where most RISE programmes lose time.',
    steps: ['Defining responsibility boundaries', 'Target architecture and sizing',
            'Finance transformation', 'Migration and cutover', 'Hypercare and handover'],
    who: ['Companies whose industry processes fall outside standard scope',
          'Regulated sectors needing control over data residency'],
    duration: 'Preparation 5–8 weeks · Migration 7–14 months',
    notes: 'Private Cloud sayfası; sorumluluk şeması sitedeki sorumluluk matrisi anlatımından türetildi.',
  },

  compare: {
    eyebrow: 'SOLUTION 05', title: 'Public and Private Cloud compared',
    tags: ['PUBLIC', 'PRIVATE'],
    rows: [
      ['Cost model', 'Subscription by user and scope; upgrades included.',
       'Varies with sizing; upgrade testing stays with you.'],
      ['Extensibility', 'Core fixed; separate extension layer.',
       'Core modification allowed; existing ABAP carried across.'],
      ['Upgrade cadence', 'Regular, automatic, not deferrable.',
       'You set the timing; each upgrade is its own project.'],
      ['Implementation', '3–5 months, single-country finance scope.',
       'Typically 7–14 months.'],
      ['Typical fit', 'Mid-market, close to standard.',
       'Heavy customisation and integration history.'],
    ],
    bandLead: 'We take no side.  ',
    bandBody: 'Processes are compared against standard scope and both models are put side by side. The decision stays yours.',
    notes: 'Çözümler sayfasındaki karşılaştırma tablosu, kısaltılarak yeniden yazıldı.',
  },

  ai: {
    eyebrow: 'SOLUTION 06', title: 'AI in Finance',
    lead: 'SAP’s AI capabilities are embedded, not bought separately. We measure which ones fit, then phase them in.',
    blocks: [
      ['IN YOUR PROCESSES', 'Delivered to your team', [
        'Intelligent matching of bank and open items',
        'Anomaly detection before the close',
        'Predictive accounting within the period',
        'Joule for natural-language querying',
      ]],
      ['IN OUR DELIVERY', 'Preparation work, compressed', [
        'Custom code inventory and impact analysis',
        'First drafts of test scenarios',
        'Migration reconciliation checks',
        'Initial configuration documentation',
      ]],
    ],
    stanceLead: 'Rule.  ',
    stanceBody: 'No decision producing a financial posting is finalised without human review.',
    notes: 'Yapay zeka sayfası, kısaltılarak yeniden yazıldı.',
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
    steps: [['01', 'Assessment', '2–6 weeks'], ['02', 'Architecture and roadmap', '3–6 weeks'],
            ['03', 'Delivery', '3–14 months'], ['04', 'Hypercare', '4–12 weeks']],
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
    modelsLabel: 'ENGAGEMENT MODELS',
    models: [['Assessment', '2–6 weeks', 'A decision is needed and the evidence is missing.'],
             ['Delivery', '3–14 months', 'The decision is taken and needs building.'],
             ['Expert support', 'Days to weeks', 'Depth needed in one area of a running programme.']],
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
    eyebrow: 'CONTACT', title: 'Tell us about your project', size: 30,
    lead: 'We respond within one business day. The first call runs 30–45 minutes at no cost.',
    contact: [['GENERAL', 'info@cpeakconsultancy.com'],
              ['DIRECT — KEREM YİĞİT', 'kerem.yigit@cpeakconsultancy.com'],
              ['TELEPHONE', '+90 (507) 032 81 70'],
              ['OFFICE', 'Bostancı Mah. Şemsettin Günaltay Cad.\nNo: 31/8, 34744 Kadıköy, İstanbul'],
              ['WEB', 'cpeakconsultancy.com'],
              ['LINKEDIN', 'linkedin.com/company/cpeak-consultancy']],
    notes: 'İletişim bilgileri site yapılandırmasından.',
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
    eyebrow: 'ÇÖZÜM 01', title: 'SAP Finans Modülleri',
    lead: 'FI, CO, PA ve PS modüllerinde uçtan uca tasarım ve uygulama.',
    steps: ['Mevcut yapının teşhisi', 'Hesap planı ve organizasyon yapısı',
            'Maliyet muhasebesi ve kârlılık', 'Kapanış sürecinin yeniden tasarımı', 'Devreye alma ve devir'],
    who: ['Birden çok şirket kodunu tek raporlama mantığında toplayan gruplar',
          'Kapanışı uzayan ve nedenini ölçemeyen finans ekipleri'],
    duration: 'Teşhis 3–4 hafta · Yeniden yapılandırma 4–7 ay',
    notes: 'Finans modülleri sayfası, kısaltılarak yeniden yazıldı.',
  },

  s4hana: {
    eyebrow: 'ÇÖZÜM 02', title: 'S/4HANA Dönüşümü',
    lead: 'Yöntem kararı kanıta dayanır; sistem taraması tartışmayı görüş olmaktan çıkarır.',
    routesLabel: 'GEÇİŞ YÖNTEMLERİ, YAN YANA',
    routes: [
      ['Sistem dönüşümü', 'Brownfield', 'Mevcut sistem yerinde dönüştürülür. Tarihsel veri korunur, süreçler büyük ölçüde aynı kalır.'],
      ['Yeni kurulum', 'Greenfield', 'Sistem sıfırdan kurulur. Süreçler yenilenir, geçmiş veri sınırlı taşınır.'],
      ['Seçici veri geçişi', 'Karma', 'Seçilen veri ve süreçler taşınır. Çok şirketli gruplarda toplam süre ve maliyet çoğu zaman daha düşük.'],
    ],
    steps: ['Hazırlık analizi ve yöntem kararı', 'Özelleştirme borcunun temizlenmesi',
            'Finans tarafının dönüşümü', 'Veri migrasyonu ve test', 'Devreye alma ve hypercare'],
    who: ['Bakım takvimi nedeniyle geçiş planı gereken ECC kullanıcıları',
          'Ne kadarının gerekli olduğu bilinmeyen özelleştirme taşıyan BT ekipleri'],
    duration: 'Analiz 4–6 hafta · Dönüşüm 6–14 ay',
    notes: 'Üç geçiş yöntemi tablosu; sitedeki yöntem anlatımından kısaltılarak türetildi.',
  },

  publicCloud: {
    eyebrow: 'ÇÖZÜM 03', title: 'SAP Public Cloud',
    lead: 'Cloud ERP Public Edition: standart kapsam, hızlı kurulum, düşük işletme yükü.',
    schemaLabel: 'DEĞİŞİKLİĞE NEREDE İZİN VAR',
    schema: [
      ['STANDART ÇEKİRDEK', 'Değiştirilemez. Sürüm güncellemeleri otomatik uygulanır.'],
      ['GENİŞLETME KATMANI', 'İhtiyaçlar yalnızca izin verilen genişletme yöntemleriyle karşılanır.'],
    ],
    schemaNote: 'Hangi süreçlerin standart kapsam dışında kaldığı sözleşmeden önce ölçülür.',
    steps: ['Uygunluk değerlendirmesi', 'Fit-to-standard ve finans kurulumu', 'Genişletme stratejisi',
            'Güncelleme döngüsüne hazırlık', 'Devreye alma ve kullanıcı eğitimi'],
    who: ['Süreçlerini standart üzerine kurmaya istekli orta ölçekli şirketler',
          'İç BT kadrosu sınırlı olan organizasyonlar'],
    duration: 'Değerlendirme 2–3 hafta · Kurulum 3–5 ay',
    notes: 'Public Cloud sayfası, kısaltılarak yeniden yazıldı.',
  },

  privateCloud: {
    eyebrow: 'ÇÖZÜM 04', title: 'SAP Private Cloud',
    lead: 'RISE with SAP ve Cloud ERP Private Edition: süreç esnekliğini bırakmadan bulut işletimi.',
    schemaLabel: 'SORUMLULUK NEREDE BAŞLIYOR',
    schema: [
      ['SAP', 'Altyapı, temel işletim, platform erişilebilirliği'],
      ['CPEAK', 'Mimari, finans süreçleri, geçiş yönetimi'],
      ['İÇ EKİP', 'Süreç sahipliği, kabul testi, günlük operasyon'],
    ],
    schemaNote: 'Sınır proje başlamadan yazılı hale getirilir; RISE projelerinde zaman en çok burada kaybedilir.',
    steps: ['Sorumluluk sınırlarının netleştirilmesi', 'Hedef mimari ve boyutlandırma',
            'Finans süreçlerinin dönüşümü', 'Geçiş ve devreye alma', 'Hypercare ve işletmeye devir'],
    who: ['Sektörüne özgü süreçleri standart kapsama sığmayan şirketler',
          'Veri yerleşimi ve denetim gereksinimi olan düzenlenmiş sektörler'],
    duration: 'Hazırlık 5–8 hafta · Geçiş 7–14 ay',
    notes: 'Private Cloud sayfası; sorumluluk şeması sitedeki sorumluluk matrisi anlatımından türetildi.',
  },

  compare: {
    eyebrow: 'ÇÖZÜM 05', title: 'Public ve Private Cloud karşılaştırması',
    tags: ['PUBLIC', 'PRIVATE'],
    rows: [
      ['Maliyet modeli', 'Kullanıcı ve kapsam bazında abonelik; güncellemeler dahil.',
       'Boyutlandırmaya bağlı; güncelleme testleri sizde kalır.'],
      ['Özelleştirme', 'Çekirdek sabittir; genişletme ayrı katmanda.',
       'Çekirdeğe müdahale dahil; mevcut ABAP taşınabilir.'],
      ['Güncelleme', 'Düzenli, otomatik ve ertelenemez.',
       'Zamanlamayı siz belirlersiniz; her sürüm ayrı proje.'],
      ['Kurulum süresi', 'Tek ülkeli finans kapsamında 3–5 ay.',
       'Tipik olarak 7–14 ay.'],
      ['Tipik uygunluk', 'Standarda yakın orta ölçekli şirketler.',
       'Ağır özelleştirme ve entegrasyon mirası olanlar.'],
    ],
    bandLead: 'Taraf tutmuyoruz.  ',
    bandBody: 'Süreçler standart kapsamla karşılaştırılır, iki model yan yana konur. Kararı siz verirsiniz.',
    notes: 'Çözümler sayfasındaki karşılaştırma tablosu, kısaltılarak yeniden yazıldı.',
  },

  ai: {
    eyebrow: 'ÇÖZÜM 06', title: 'Yapay Zeka ve Finans',
    lead: 'SAP’nin yapay zeka yetenekleri sistemin içinde yerleşiktir. Hangisinin uyduğunu ölçer, sırayla devreye alırız.',
    blocks: [
      ['SİZİN SÜREÇLERİNİZDE', 'Ekibinize teslim edilen', [
        'Banka ve cari kalemlerde akıllı mutabakat',
        'Kapanıştan önce anomali tespiti',
        'Dönem içinde tahmine dayalı muhasebe',
        'Joule ile doğal dilde sorgulama',
      ]],
      ['BİZİM TESLİMİMİZDE', 'Kısalan hazırlık işi', [
        'Özelleştirme envanteri ve kod etki analizi',
        'Test senaryolarının ilk taslakları',
        'Veri migrasyonu mutabakat kontrolleri',
        'Yapılandırma dokümantasyonunun ilk sürümü',
      ]],
    ],
    stanceLead: 'Kural.  ',
    stanceBody: 'Finansal kayıt üreten hiçbir karar insan denetiminden geçmeden kesinleşmez.',
    notes: 'Yapay zeka sayfası, kısaltılarak yeniden yazıldı.',
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
    steps: [['01', 'Değerlendirme', '2–6 hafta'], ['02', 'Mimari ve yol haritası', '3–6 hafta'],
            ['03', 'Uygulama', '3–14 ay'], ['04', 'Hypercare', '4–12 hafta']],
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
    modelsLabel: 'ÇALIŞMA MODELLERİ',
    models: [['Değerlendirme', '2–6 hafta', 'Karar gerekiyor, elde yeterli veri yok.'],
             ['Proje teslimi', '3–14 ay', 'Karar verilmiş, uygulanması gerekiyor.'],
             ['Uzman desteği', 'Birkaç gün – hafta', 'Yürüyen projede tek konuda derinlik gerekiyor.']],
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
    eyebrow: 'İLETİŞİM', title: 'Projenizi anlatın', size: 30,
    lead: 'Bir iş günü içinde dönüş yapıyoruz. İlk görüşme 30–45 dakika ve ücretsiz.',
    contact: [['GENEL', 'info@cpeakconsultancy.com'],
              ['DOĞRUDAN — KEREM YİĞİT', 'kerem.yigit@cpeakconsultancy.com'],
              ['TELEFON', '+90 (507) 032 81 70'],
              ['OFİS', 'Bostancı Mah. Şemsettin Günaltay Cad.\nNo: 31/8, 34744 Kadıköy, İstanbul'],
              ['WEB', 'cpeakconsultancy.com'],
              ['LINKEDIN', 'linkedin.com/company/cpeak-consultancy']],
    notes: 'İletişim bilgileri site yapılandırmasından.',
  },
};

module.exports = { en, tr };
