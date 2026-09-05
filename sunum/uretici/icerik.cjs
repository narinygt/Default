/**
 * SUNUM METİNLERİ — tek kaynak, iki dil.
 * =================================================================
 * Yerleşim `slides-*.cjs` içinde, metin burada. Sitedeki
 * `Record<Lang, ...>` düzeniyle aynı mantık: yeni bir dil eklemek
 * yerleşime dokunmayı gerektirmez.
 *
 * Metinler `src/data/` altındaki site metinlerinden KISALTILARAK
 * türetilmiştir; uydurma rakam, müşteri, sertifika ya da ödül yoktur.
 * İki dil birbirinin çevirisi değil, aynı kaynağın kendi dilindeki
 * karşılığıdır — TR metinler sitenin Türkçe metinlerinden gelir.
 */

const en = {
  lang: 'en',
  file: 'CPeak-Consultancy-Company-Overview',
  title: 'CPeak Consultancy — Company Overview',
  subject: 'SAP finance modules, S/4HANA transformation and SAP cloud architecture',
  figSuffix: '',                    // fig-finance.jpg
  foot: 'CPeak Consultancy',

  cover: {
    eyebrow: 'COMPANY OVERVIEW',
    h1: '10+ years of SAP finance\nexperience and SAP\ncloud architecture',
    size: 31,
    lead: 'Deep expertise across the SAP finance modules and a genuinely neutral read on the cloud models — so the decision you take is one you can defend with its reasoning.',
    meta: 'CPEAKCONSULTANCY.COM  ·  ISTANBUL',
    notes: 'Kapak. Konumlandırma cümlesi sitenin H1 ve hero girişinden. Görsel sitenin kendi hero görselidir.',
  },

  who: {
    eyebrow: 'WHO WE ARE',
    title: 'An independent consultancy, specialised end to end in SAP finance',
    paras: [
      'CPeak Consultancy works end to end on the finance modules across SAP ECC, S/4HANA on-premise, Private Cloud and Public Cloud. Our focus is a senior team and an AI-supported way of working.',
      'The common model in SAP consulting is to offer broad scope and then source a different specialist for each area. We took the opposite position: if we take an engagement, we are not subcontracting the difficult part of it.',
      'Where a programme extends into logistics modules outside our specialism, we work alongside partners in Türkiye and abroad so that the finance scope stays covered end to end.',
    ],
    facts: [['FOUNDED', '2021'], ['HEAD OFFICE', 'Istanbul'],
            ['REGIONS SERVED', 'Türkiye, EMEA and the United States']],
    quote: 'Rather than running many programmes in parallel, we run the number that allows senior people to be genuinely present on each.',
    strip: [
      ['EXPERIENCE', '10+', 'years in SAP finance'],
      ['EXPERTISE', '', 'Depth across FI and CO'],
      ['INDEPENDENCE', '', 'Public vs Private Cloud, vendor-neutral'],
      ['TEAM', '', 'Senior consultants only'],
    ],
    notes: 'Şirket tanıtımı. Her iddia Hakkımızda sayfasında var. Koyu şerit sitenin yetkinlik bandı — nitel, tek sayı 10+ yıl.',
  },

  expertise: {
    eyebrow: 'OUR EXPERTISE',
    title: 'Three areas of expertise, and each one informs the others',
    items: [
      ['01', 'Finance modules',
       'SAP FI, CO, PA and PS. Enterprise structure and global chart of accounts design, controlling and profitability, and redesign of the financial close.'],
      ['02', 'SAP cloud architecture',
       'Fit assessment between Private and Public Cloud, target architecture design and migration management. We do not advocate for a particular model.'],
      ['03', 'AI and RPA-powered automation',
       'Matching, anomaly detection and predictive accounting using SAP’s embedded AI capabilities — measured first, then phased.'],
    ],
    notes: 'Hakkımızda sayfasındaki üç odak alanı. Görsel sitenin finans mimarisi şemasıdır.',
  },

  sap: {
    eyebrow: 'SAP EXPERTISE',
    title: 'One finance core, four deployment models, one embedded AI layer',
    leftLabel: 'DEPLOYMENT MODELS',
    rightLabel: 'EMBEDDED AI CAPABILITIES',
    left: [
      ['SAP ECC', 'The landscape most programmes start from'],
      ['S/4HANA on-premise', 'Own infrastructure, full flexibility'],
      ['Cloud ERP Private Edition', 'RISE with SAP — cloud operations, flexibility retained'],
      ['Cloud ERP Public Edition', 'Standard scope, rapid deployment'],
    ],
    right: [
      ['Intelligent matching', 'Bank and open items cleared from learned behaviour'],
      ['Anomaly detection', 'Unusual postings flagged before the close, not after'],
      ['Predictive accounting', 'Not-yet-final transactions visible during the period'],
      ['Joule', 'A natural-language layer for querying and navigation'],
    ],
    coreLabel: 'SAP FINANCE CORE',
    core: [
      'Enterprise structure and global chart of accounts',
      'Controlling, costing and profitability',
      'The financial close, redesigned step by step',
      'Statutory and management reporting from one source',
    ],
    footnote: 'SAP’s AI capabilities are embedded in the system rather than bought separately. Enabling all of them is not a strategy — we assess which ones your data volume and process discipline can support, and sequence them.',
    notes: 'SAP yetkinlik haritası. Dağıtım modelleri ve yapay zeka yetenekleri sitede geçenlerin aynısı. İş ortaklığı ya da sertifika iddiası yok.',
  },

  solutions: {
    eyebrow: 'SOLUTIONS',
    title: 'Five service areas, one finance perspective',
    lead: 'The same organisation often sits in more than one category. This table exists to show which piece of work makes more sense to start with.',
    heads: ['SOLUTION', 'WHO IT SUITS', 'TYPICAL DURATION', 'PRIMARY BENEFIT'],
    rows: [
      ['SAP Finance Modules', 'FI, CO and end-to-end financial process design',
       'Organisations with a drifted SAP setup, or implementing fresh',
       'Diagnosis 3–4 weeks\nRedesign 4–7 months', 'Consistent reporting and a predictable close'],
      ['S/4HANA Transformation', 'Brownfield, greenfield or selective transition',
       'Organisations on ECC that need a conversion plan',
       'Assessment 4–6 weeks\nConversion 6–14 months', 'A defensible approach decision and a predictable cutover'],
      ['SAP Public Cloud', 'Cloud ERP Public Edition architecture and delivery',
       'Companies able to adopt standard, wanting fast deployment',
       'Assessment 2–3 weeks\nDeployment 3–5 months', 'Rapid go-live and low operational overhead'],
      ['SAP Private Cloud', 'RISE with SAP and Cloud ERP Private Edition',
       'Larger organisations that must retain process flexibility',
       'Preparation 5–8 weeks\nMigration 7–14 months', 'Cloud operations without giving up flexibility'],
      ['AI in Finance', 'SAP’s embedded AI capabilities and process automation',
       'Teams spending heavy manual hours on repetitive finance work',
       'Assessment 2–3 weeks\nFirst phase 6–12 weeks', 'Recovered hours and errors caught earlier'],
    ],
    notes: 'Beş çözüm sayfası, sitenin kendi ölçütleriyle: kime uygun, tipik süre, ana kazanım.',
  },

  cloud: {
    eyebrow: 'CLOUD ARCHITECTURE',
    title: 'Public or Private Cloud — the most expensive decision to reverse',
    lead: 'Not the advanced and the cheap version of one another, but different trades.',
    tags: ['PUBLIC', 'PRIVATE'],
    rows: [
      ['Cost model', 'Subscription by user and scope; upgrades included.',
       'Varies with sizing; upgrade testing stays with you.'],
      ['Extensibility', 'Core cannot be modified; extension in a separate layer.',
       'Core modification allowed; existing ABAP carried across.'],
      ['Upgrade cadence', 'Regular, automatic and not deferrable.',
       'You control the timing; each upgrade its own project.'],
      ['Implementation time', '3–5 months for a single-country finance deployment.',
       'Typically 7–14 months, by scope and inherited landscape.'],
      ['Typical fit', 'Mid-market organisations close to standard.',
       'Larger organisations with customisation history.'],
    ],
    bandLead: 'We do not advocate for a model.  ',
    bandBody: 'We compare your processes against standard scope and put the cost and the constraint of both models side by side for your situation. The decision stays yours.',
    notes: 'Tarafsız karşılaştırma CPeak’in en net farkı. Ölçütler Çözümler sayfasındaki tablodan kısaltıldı.',
  },

  value: {
    eyebrow: 'HOW WE CREATE VALUE',
    title: 'Measurement first, then a decision you can defend',
    lead: 'The outcome is decided by the weekly working discipline, not by the name of the methodology.',
    stages: [
      ['MEASURE', 'No recommendation is made without reading the actual system data. Advice given without measurement is a guess, and its cost falls to you.'],
      ['COMPARE', 'Options placed side by side with cost, duration and risk — together with our own view and the reasoning behind it.'],
      ['DECIDE', 'The decision is yours and the reasoning stays on paper. That is what answers “why did we do it this way?” two years later.'],
      ['OWN', 'Test scenarios written together, the first close run together, documentation left in a form people actually use.'],
    ],
    also: [
      ['Bad news travels immediately', 'When it becomes clear an estimate will not hold, you hear it that week rather than in the month-end report.'],
      ['Phase the work, don’t grow the team', 'Each phase ends in something that works, and the decision to continue gets taken again.'],
    ],
    notes: 'Yaklaşım sayfasındaki çalışma ilkeleri, anlattıkları değer zinciri olarak dizildi.',
  },

  method: {
    eyebrow: 'OUR APPROACH',
    title: 'Four stages, each ending in something tangible',
    lead: 'What gets delivered at the end of each stage is defined before it starts, and no stage begins before the previous one has closed.',
    durationLabel: 'TYPICAL DURATION',
    steps: [
      ['01', 'Assessment', '2–6 weeks'],
      ['02', 'Architecture and roadmap', '3–6 weeks'],
      ['03', 'Delivery', '3–14 months'],
      ['04', 'Hypercare', '4–12 weeks'],
    ],
    notes: 'Dört aşamalı teslim modeli. Aşama adları ve çıktılar sitenin süreç görselinde yazılı; slayt yalnızca süreleri ekler.',
  },

  ai: {
    eyebrow: 'TECHNOLOGY AND BUSINESS',
    title: 'We use AI on both sides: in your processes and in how we work',
    lead: 'Not a separate service line, but part of both the system we deliver and the method we use to deliver it.',
    blocks: [
      ['IN YOUR FINANCE PROCESSES', 'Automation your team keeps', [
        'Intelligent matching of bank and open items',
        'Anomaly detection before the close, not after',
        'Predictive accounting during the period',
        'Joule for natural-language querying',
      ]],
      ['IN OUR OWN DELIVERY', 'Preparation work, compressed', [
        'Custom code inventory and impact analysis',
        'First drafts of test scenarios',
        'Migration reconciliation checks',
        'Initial configuration documentation',
      ]],
    ],
    stanceLead: 'Our position.  ',
    stanceBody: 'No decision producing a financial posting is finalised without human review.',
    notes: 'Ana sayfanın yapay zeka bölümü. Görsel sitenin yapay zeka akış şemasıdır.',
  },

  cases: {
    eyebrow: 'ENGAGEMENTS IN PRACTICE',
    title: 'What the work looks like in practice',
    lead: 'Three situations we meet regularly, and the approach we take to each.',
    tag: 'ILLUSTRATIVE — NOT CLIENT CASES',
    labels: ['SITUATION', 'APPROACH', 'OUTCOME'],
    items: [
      ['Manufacturing', 'MULTI-ENTITY GROUP, SEVERAL COUNTRIES',
       'A group running ECC needs an S/4HANA plan before maintenance deadlines force one. Nobody knows how much accumulated custom code is still executed.',
       'A usage-based custom code inventory first. All three conversion routes compared on cost, duration and risk. Company codes planned in waves.',
       'A reasoned approach decision that survives board scrutiny, and a smaller conversion scope once dead development is retired.'],
      ['Technology and services', 'FAST-GROWING MID-MARKET COMPANY',
       'The company is scaling quickly while finance still runs on spreadsheets. A standard ERP deployment is wanted, but whether Public Cloud suffices is unknown.',
       'Processes compared against standard scope item by item. Fit-to-standard workshops retire differences that exist only through habit.',
       'A finance setup built on standard and ready for the release cycle, plus a deployment template that repeats in new markets.'],
      ['Retail', 'MULTI-SITE, HIGH TRANSACTION VOLUME',
       'The month-end close runs long and unpredictably. Reconciliation is largely manual, and unmatched items depend on two or three people.',
       'The close measured step by step to find the dependencies creating wait time. Matching thresholds calibrated against real data.',
       'A close calendar that is predictable step by step, with the team moving from matching items to reviewing exceptions.'],
    ],
    disclaimer: 'These contain no client names, figures or outcome claims. They are written to show how an engagement works.',
    notes: 'Ana sayfadaki üç tipik proje, sitenin kendi uyarısıyla birlikte.',
  },

  why: {
    eyebrow: 'WHY CPEAK',
    title: 'The difference is who actually does the work',
    lead: 'In SAP consulting the outcome is decided less by methodology than by who actually works on the project.',
    refsLabel: 'REFERENCES',
    pillars: [
      ['Real depth in the finance modules',
       'FI and CO are our core discipline, not a capability brought along beside something else. On decisions that are expensive to reverse — enterprise structure, costing design, the close calendar — you get the view of someone who has lived the consequences several times.'],
      ['Neutral on the cloud model',
       'We do not advocate for Public or Private Cloud. We compare your processes against standard scope and put the cost and constraint of both models side by side for your specific situation.'],
      ['Delivery accelerated by AI',
       'We use AI for the volume work: analysis, documentation, test scenario generation and migration reconciliation. It shortens the preparation phases and leaves senior time for the parts that require judgement.'],
      ['Senior consultants on every engagement',
       'The people named in the proposal are the people who turn up. You are not charged for a consultant’s learning curve. When scope grows we phase the work rather than inflate the team.'],
    ],
    notes: 'Ana sayfadaki dört fark. Referans şeridi sitenin kendi logo bandıdır.',
  },

  closing: {
    eyebrow: 'NEXT STEP',
    title: 'Tell us about your project\nand we will come back\nwithin one business day',
    size: 28,
    lead: 'A few sentences on where you are today and what you are trying to solve is enough to start. The first call runs 30–45 minutes at no cost.',
    contact: [
      ['GENERAL', 'info@cpeakconsultancy.com'],
      ['DIRECT — KEREM YİĞİT', 'kerem.yigit@cpeakconsultancy.com'],
      ['TELEPHONE', '+90 (507) 032 81 70'],
      ['OFFICE', 'Bostancı Mah. Şemsettin Günaltay Cad.\nNo: 31/8, 34744 Kadıköy, İstanbul'],
      ['WEB', 'cpeakconsultancy.com'],
      ['LINKEDIN', 'linkedin.com/company/cpeak-consultancy'],
    ],
    notes: 'Kapanış. İletişim bilgileri site yapılandırmasından.',
  },
};

const tr = {
  lang: 'tr',
  file: 'CPeak-Consultancy-Kurumsal-Tanitim',
  title: 'CPeak Consultancy — Kurumsal Tanıtım',
  subject: 'SAP finans modülleri, S/4HANA dönüşümü ve SAP bulut mimarisi',
  figSuffix: '-tr',                 // fig-finance-tr.jpg
  foot: 'CPeak Consultancy',

  cover: {
    eyebrow: 'KURUMSAL TANITIM',
    h1: 'SAP Finansallarda 10+ Yıl\nDeneyim ve SAP\nBulut Mimarisi',
    size: 28,
    lead: 'SAP finans modüllerinde derinlemesine uzmanlık, bulut modeli seçiminde tarafsız değerlendirme — aldığınız kararı gerekçesiyle birlikte savunabilmeniz için.',
    meta: 'CPEAKCONSULTANCY.COM  ·  İSTANBUL',
    notes: 'Kapak. Konumlandırma cümlesi sitenin H1 ve hero girişinden. Görsel sitenin kendi hero görselidir.',
  },

  who: {
    eyebrow: 'BİZ KİMİZ',
    title: 'Finans modüllerinde uçtan uca uzmanlaşmayı seçmiş bağımsız bir danışmanlık',
    paras: [
      'CPeak Consultancy; SAP ECC, S/4HANA on-premise, Private Cloud ve Public Cloud ortamlarında uçtan uca finans modülleri üzerine çalışan bağımsız bir danışmanlık şirketidir. Odak alanımız, uzman kadromuzla yürüttüğümüz yapay zeka destekli çalışma biçimimizdir.',
      'SAP danışmanlığında yaygın model geniş kapsam sunmak, sonra her alan için farklı bir uzman bulmaktır. Biz bunun tersini seçtik: bir işi almamız, o işin en zor kısmını dışarıya devretmeyeceğimiz anlamına gelir.',
      'Uzmanlık alanımız dışındaki lojistik modüllerde yurt içi ve yurt dışı iş ortaklarımızla birlikte çalışarak projenize uçtan uca destek veririz.',
    ],
    facts: [['KURULUŞ YILI', '2021'], ['MERKEZ', 'İstanbul'],
            ['HİZMET VERİLEN BÖLGELER', 'Türkiye, EMEA ve ABD']],
    quote: 'Aynı anda çok sayıda proje yürütmek yerine, kıdemli kadronun fiilen çalışmasını mümkün kılacak sayıda iş alıyoruz.',
    strip: [
      ['DENEYİM', '10+', 'yıl SAP finans deneyimi'],
      ['UZMANLIK', '', 'FI ve CO derinliği'],
      ['TARAFSIZLIK', '', 'Public ve Private Cloud değerlendirmesi'],
      ['EKİP', '', 'Kıdemli danışman kadrosu'],
    ],
    notes: 'Şirket tanıtımı. Her iddia Hakkımızda sayfasında var. Koyu şerit sitenin yetkinlik bandı — nitel, tek sayı 10+ yıl.',
  },

  expertise: {
    eyebrow: 'UZMANLIK ALANLARIMIZ',
    title: 'Uzmanlığımız üç alanda birleşiyor ve bu üçü birbirini besliyor',
    items: [
      ['01', 'Finans modülleri',
       'SAP FI, CO, PA ve PS. Global hesap planı ve üst düzey organizasyon yapısı tasarımı, maliyet ve kârlılık muhasebesi, kapanış sürecinin yeniden kurgulanması.'],
      ['02', 'SAP bulut mimarisi',
       'Public Cloud ve Private Cloud arasında uygunluk değerlendirmesi, hedef mimari tasarımı ve canlı geçiş yönetimi. Belirli bir modelin savunuculuğunu yapmıyoruz.'],
      ['03', 'Yapay zeka ve RPA destekli otomasyon',
       'SAP’nin yerleşik yapay zeka yetenekleriyle mutabakat, anomali tespiti ve tahmine dayalı muhasebe — ölçüme dayalı ve fazlı biçimde.'],
    ],
    notes: 'Hakkımızda sayfasındaki üç odak alanı. Görsel sitenin finans mimarisi şemasıdır.',
  },

  sap: {
    eyebrow: 'SAP UZMANLIĞI',
    title: 'Tek finans çekirdeği, dört dağıtım modeli, bir yerleşik yapay zeka katmanı',
    leftLabel: 'DAĞITIM MODELLERİ',
    rightLabel: 'YERLEŞİK YAPAY ZEKA YETENEKLERİ',
    left: [
      ['SAP ECC', 'Çoğu projenin başladığı mevcut yapı'],
      ['S/4HANA on-premise', 'Kendi altyapınız, tam esneklik'],
      ['Cloud ERP Private Edition', 'RISE with SAP — bulut işletimi, esneklik korunur'],
      ['Cloud ERP Public Edition', 'Standart kapsam, hızlı devreye alma'],
    ],
    right: [
      ['Akıllı mutabakat', 'Banka ve cari kalemlerin geçmiş davranıştan öğrenerek eşlenmesi'],
      ['Anomali tespiti', 'Alışılmadık kayıtların kapanıştan önce işaretlenmesi'],
      ['Tahmine dayalı muhasebe', 'Kesinleşmemiş işlemlerin dönem içinde görünür olması'],
      ['Joule', 'Doğal dille sorgulama ve gezinme katmanı'],
    ],
    coreLabel: 'SAP FİNANS ÇEKİRDEĞİ',
    core: [
      'Üst düzey organizasyon yapısı ve global hesap planı',
      'Maliyet muhasebesi ve kârlılık analizi',
      'Kapanış sürecinin adım adım yeniden kurgulanması',
      'Yasal ve yönetsel raporlamanın tek kaynaktan üretilmesi',
    ],
    footnote: 'SAP’nin yapay zeka yetenekleri ayrı bir ürün olarak satın alınmaz, sistemin içinde yerleşiktir. Hepsini açmak strateji değildir — hangisinin sizde çalışacak veri hacmine ve süreç disiplinine sahip olduğunu ölçer, sırayla devreye alırız.',
    notes: 'SAP yetkinlik haritası. Dağıtım modelleri ve yapay zeka yetenekleri sitede geçenlerin aynısı. İş ortaklığı ya da sertifika iddiası yok.',
  },

  solutions: {
    eyebrow: 'ÇÖZÜMLER',
    title: 'Beş çözüm alanı, tek bir finans bakış açısı',
    lead: 'Aynı kurum çoğu zaman birden fazla kategoriye girer. Bu tablo, hangi işe başlamanın daha anlamlı olduğunu göstermek için var.',
    heads: ['ÇÖZÜM', 'KİME UYGUN', 'TİPİK SÜRE', 'ANA KAZANIM'],
    rows: [
      ['SAP Finans Modülleri', 'FI, CO ve uçtan uca finansal süreç tasarımı',
       'Mevcut SAP kurulumu dağılmış ya da yeni kuracak şirketler',
       'Teşhis 3–4 hafta\nYeniden yapılandırma 4–7 ay', 'Tutarlı raporlama ve öngörülebilir kapanış'],
      ['S/4HANA Dönüşümü', 'Brownfield, greenfield ve seçici geçiş kararı',
       'ECC üzerinde olup geçiş planlaması gereken şirketler',
       'Analiz 4–6 hafta\nDönüşüm 6–14 ay', 'Gerekçeli yöntem kararı ve öngörülebilir geçiş'],
      ['SAP Public Cloud', 'Cloud ERP Public Edition mimarisi ve uygulaması',
       'Standarda uyum sağlayabilen, hızlı kurulum isteyen şirketler',
       'Değerlendirme 2–3 hafta\nKurulum 3–5 ay', 'Hızlı devreye alma ve düşük işletme yükü'],
      ['SAP Private Cloud', 'RISE with SAP ve Cloud ERP Private Edition mimarisi',
       'Süreç esnekliğini korumak zorunda olan büyük ölçekli şirketler',
       'Hazırlık 5–8 hafta\nGeçiş 7–14 ay', 'Esnekliği koruyarak altyapı yükünden kurtulma'],
      ['Yapay Zeka ile Finans', 'SAP’nin yerleşik yapay zeka yetenekleri ve otomasyon',
       'Tekrar eden manuel finans işine çok saat harcayan ekipler',
       'Değerlendirme 2–3 hafta\nİlk faz 6–12 hafta', 'Geri kazanılan insan saati ve erken hata yakalama'],
    ],
    notes: 'Beş çözüm sayfası, sitenin kendi ölçütleriyle: kime uygun, tipik süre, ana kazanım.',
  },

  cloud: {
    eyebrow: 'BULUT MİMARİSİ',
    title: 'Public mu Private Cloud mu — geri dönüşü en pahalı karar',
    lead: 'Biri diğerinin gelişmiş ya da ucuz sürümü değil; farklı takaslar.',
    tags: ['PUBLIC', 'PRIVATE'],
    rows: [
      ['Maliyet modeli', 'Kullanıcı ve kapsam bazında abonelik; güncellemeler dahil.',
       'Boyutlandırmaya bağlı; güncelleme testleri sizde kalır.'],
      ['Özelleştirme esnekliği', 'Çekirdek değiştirilemez; genişletme ayrı katmanda.',
       'Çekirdeğe müdahale dahil; mevcut ABAP taşınabilir.'],
      ['Güncelleme döngüsü', 'Düzenli, otomatik ve ertelenemez.',
       'Zamanlamayı siz belirlersiniz; her sürüm ayrı proje.'],
      ['Kurulum süresi', 'Tek ülkeli finans kurulumu tipik olarak 3–5 ay.',
       'Kapsama ve taşınan mirasa göre tipik olarak 7–14 ay.'],
      ['Tipik uygunluk', 'Süreçleri standarda yakın orta ölçekli şirketler.',
       'Ağır özelleştirme ve entegrasyon mirası taşıyanlar.'],
    ],
    bandLead: 'Belirli bir modeli savunmuyoruz.  ',
    bandBody: 'Süreçlerinizi standart kapsamla karşılaştırır, iki modelin sizin durumunuzdaki maliyetini ve kısıtını yan yana koyarız. Kararı siz verirsiniz.',
    notes: 'Tarafsız karşılaştırma CPeak’in en net farkı. Ölçütler Çözümler sayfasındaki tablodan kısaltıldı.',
  },

  value: {
    eyebrow: 'DEĞERİ NASIL ÜRETİYORUZ',
    title: 'Önce ölçüm, sonra savunabileceğiniz bir karar',
    lead: 'Sonucu belirleyen şey metodolojinin adı değil, haftalık çalışma disiplinidir.',
    stages: [
      ['ÖLÇ', 'Hiçbir öneri sistemdeki gerçek veriye bakılmadan verilmez. Ölçmeden verilen tavsiye bir tahmindir; maliyeti size kalır.'],
      ['KARŞILAŞTIR', 'Seçenekler maliyet, süre ve riskiyle yan yana konur; kendi tercihimizi de gerekçesiyle söyleriz.'],
      ['KARAR VER', 'Karar sizindir, gerekçe yazılı kalır. İki yıl sonra “bunu neden böyle yapmıştık?” sorusuna cevap veren şey odur.'],
      ['SAHİPLEN', 'Test senaryoları birlikte yazılır, ilk kapanış birlikte çalıştırılır, dokümantasyon kullanılacak biçimde bırakılır.'],
    ],
    also: [
      ['Kötü haberi erken söyleriz', 'Bir tahminin tutmayacağı belli olduğunda, bunu ay sonu raporunda değil o hafta söyleriz.'],
      ['Ekibi büyütmek yerine fazlara böleriz', 'Her fazın sonunda çalışan bir çıktı olur ve devam kararı yeniden verilir.'],
    ],
    notes: 'Yaklaşım sayfasındaki çalışma ilkeleri, anlattıkları değer zinciri olarak dizildi.',
  },

  method: {
    eyebrow: 'ÇALIŞMA YAKLAŞIMI',
    title: 'Dört adım; her adımın sonunda elle tutulur bir çıktı',
    lead: 'Her adımın sonunda ne teslim edileceği baştan bellidir. Bir adım tamamlanmadan bir sonrakine geçilmez.',
    durationLabel: 'TİPİK SÜRE',
    steps: [
      ['01', 'Değerlendirme', '2–6 hafta'],
      ['02', 'Mimari ve yol haritası', '3–6 hafta'],
      ['03', 'Uygulama', '3–14 ay'],
      ['04', 'Hypercare', '4–12 hafta'],
    ],
    notes: 'Dört aşamalı teslim modeli. Aşama adları ve çıktılar sitenin süreç görselinde yazılı; slayt yalnızca süreleri ekler.',
  },

  ai: {
    eyebrow: 'TEKNOLOJİ VE İŞ',
    title: 'Yapay zekayı iki tarafta da kullanıyoruz: sizin süreçlerinizde ve kendi çalışma şeklimizde',
    lead: 'Ayrı bir hizmet başlığı değil; hem sunduğumuz sistemin hem de kendi yöntemimizin parçası.',
    blocks: [
      ['SİZİN FİNANS SÜREÇLERİNİZDE', 'Ekipte kalan otomasyon', [
        'Banka ve cari kalemlerin akıllı mutabakatı',
        'Kapanıştan önce anomali tespiti',
        'Dönem içinde tahmine dayalı muhasebe',
        'Joule ile doğal dilde sorgulama',
      ]],
      ['KENDİ ÇALIŞMA ŞEKLİMİZDE', 'Kısalan hazırlık işi', [
        'Özelleştirme envanteri ve kod etki analizi',
        'Test senaryolarının ilk taslakları',
        'Veri migrasyonu mutabakat kontrolleri',
        'Yapılandırma dokümantasyonunun ilk sürümü',
      ]],
    ],
    stanceLead: 'Duruşumuz.  ',
    stanceBody: 'Finansal kayıt üreten hiçbir karar insan denetiminden geçmeden kesinleşmez.',
    notes: 'Ana sayfanın yapay zeka bölümü. Görsel sitenin yapay zeka akış şemasıdır.',
  },

  cases: {
    eyebrow: 'PRATİKTE PROJELER',
    title: 'Çalışma pratikte nasıl ilerliyor?',
    lead: 'Sık karşılaştığımız üç durum ve her birinde izlediğimiz yaklaşım.',
    tag: 'TEMSİLİ — GERÇEK MÜŞTERİ VAKASI DEĞİL',
    labels: ['DURUM', 'YAKLAŞIM', 'SONUÇ'],
    items: [
      ['Üretim', 'ÇOK ŞİRKETLİ GRUP, BİRDEN FAZLA ÜLKE',
       'ECC üzerinde çalışan grup, bakım takvimi nedeniyle S/4HANA geçişi planlamak zorunda. Biriken özelleştirmelerin ne kadarı kullanılıyor bilinmiyor.',
       'Önce kullanım verisine dayalı özelleştirme envanteri. Üç geçiş yöntemi maliyet, süre ve risk açısından karşılaştırılır. Şirket kodları dalgalar hâlinde planlanır.',
       'Yönetim kuruluna sunulabilecek gerekçeli bir yöntem kararı ve taşınmayacak geliştirmelerin elenmesiyle küçülmüş bir kapsam.'],
      ['Teknoloji ve hizmet', 'HIZLI BÜYÜYEN ORTA ÖLÇEKLİ ŞİRKET',
       'Şirket hızla büyüyor, finans süreçleri hâlâ elektronik tablolara dayanıyor. Standart bir ERP isteniyor ancak Public Cloud yeter mi bilinmiyor.',
       'Süreçler standart kapsamla madde madde karşılaştırılır. Fit-to-standard oturumlarıyla alışkanlıktan kaynaklanan farklar elenir.',
       'Standart üzerine kurulmuş, çeyreklik güncellemelere hazır bir finans yapısı ve büyüme sırasında tekrarlanabilir bir kurulum şablonu.'],
      ['Perakende', 'ÇOK LOKASYONLU, YÜKSEK İŞLEM HACMİ',
       'Ay sonu kapanışı öngörülemez biçimde uzuyor. Mutabakat büyük ölçüde elle yapılıyor ve eşleşmeyen kalemler birkaç kişinin bilgisine bağlı.',
       'Kapanış adımları süre ölçümüyle çıkarılır, bekleme yaratan bağımlılıklar tespit edilir. Eşik değerleri gerçek veriyle kalibre edilir.',
       'Adım bazında ölçülebilir ve öngörülebilir bir kapanış takvimi; ekibin işi eşleştirmekten istisna incelemeye kayar.'],
    ],
    disclaimer: 'Müşteri adı, rakam ya da sonuç iddiası içermezler; hizmetin nasıl işlediğini anlatmak için hazırlanmış temsili örneklerdir.',
    notes: 'Ana sayfadaki üç tipik proje, sitenin kendi uyarısıyla birlikte.',
  },

  why: {
    eyebrow: 'NEDEN CPEAK',
    title: 'Farkı, projede kimin çalıştığı belirler',
    lead: 'SAP danışmanlığında sonucu belirleyen şey metodoloji değil, projede fiilen kimin çalıştığıdır.',
    refsLabel: 'REFERANSLAR',
    pillars: [
      ['Finans modülünde gerçek derinlik',
       'FI ve CO bizim için yan yetkinlik değil, ana uzmanlık alanımızdır. Hesap planı tasarımı, maliyet muhasebesi ve kapanış süreci gibi geri dönüşü pahalı kararlarda, konuyu daha önce defalarca yaşamış birinin görüşünü alırsınız.'],
      ['Bulut modelinde tarafsızlık',
       'Public Cloud ve Private Cloud arasındaki seçimde belirli bir modeli savunmuyoruz. Süreçlerinizi standart kapsamla karşılaştırır, iki modelin sizin durumunuzdaki maliyetini ve kısıtını yan yana koyarız.'],
      ['Yapay zeka ile hızlandırılmış teslim',
       'Analiz, dokümantasyon, test senaryosu üretimi ve migrasyon kontrolü gibi hacimli işlerde yapay zeka kullanıyoruz. Bu, hazırlık fazlarını kısaltıyor ve kıdemli danışmanın zamanını karar gerektiren işlere bırakıyor.'],
      ['Projede kıdemli danışman çalışır',
       'Projeye teklifte adı geçen kişiler gelir. Danışmanın öğrenme süresini size fatura etmeyiz. Kapsam büyüdüğünde ekibi büyütmek yerine işi fazlara böleriz.'],
    ],
    notes: 'Ana sayfadaki dört fark. Referans şeridi sitenin kendi logo bandıdır.',
  },

  closing: {
    eyebrow: 'SONRAKİ ADIM',
    title: 'Projenizi anlatın\nbir iş günü içinde\ndönüş yapalım',
    size: 28,
    lead: 'Bugün nerede olduğunuzu ve neyi çözmeye çalıştığınızı birkaç cümleyle yazmanız yeterli. İlk görüşme 30–45 dakika sürer ve ücretsizdir.',
    contact: [
      ['GENEL', 'info@cpeakconsultancy.com'],
      ['DOĞRUDAN — KEREM YİĞİT', 'kerem.yigit@cpeakconsultancy.com'],
      ['TELEFON', '+90 (507) 032 81 70'],
      ['OFİS', 'Bostancı Mah. Şemsettin Günaltay Cad.\nNo: 31/8, 34744 Kadıköy, İstanbul'],
      ['WEB', 'cpeakconsultancy.com'],
      ['LINKEDIN', 'linkedin.com/company/cpeak-consultancy'],
    ],
    notes: 'Kapanış. İletişim bilgileri site yapılandırmasından.',
  },
};

module.exports = { en, tr };
