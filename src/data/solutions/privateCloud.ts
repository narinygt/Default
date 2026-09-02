import type { LocalizedSolution } from '../types';

/** SAP Private Cloud — RISE with SAP / Cloud ERP Private Edition. */
export const privateCloud: LocalizedSolution = {
  tr: {
    navTitle: 'SAP Private Cloud',
    navDesc: 'RISE with SAP ve Cloud ERP Private Edition mimarisi',
    cardDesc:
      'Kendi süreç mantığınızı koruyarak buluta geçmek isteyen şirketler için mimari tasarım, geçiş ve sağlayıcı koordinasyonu.',

    title: 'SAP Private Cloud: esnekliği korurken altyapıyı devretmek',
    metaTitle: 'SAP Private Cloud ve RISE with SAP Danışmanlığı | CPeak',
    metaDescription:
      'RISE with SAP ve Cloud ERP Private Edition için mimari tasarım, sorumluluk sınırlarının netleştirilmesi, geçiş yönetimi ve finans süreç dönüşümü.',

    summary:
      'Private Cloud, S/4HANA’nın esnekliğini korurken altyapı işletimini devretmenizi sağlar. Zorluk teknolojide değil, sorumluluk sınırlarındadır: RISE sözleşmesinin neyi kapsayıp neyi kapsamadığı çoğu şirkette projenin ortasında anlaşılır.',

    whoFor: [
      'Sektörüne özgü süreçleri nedeniyle standart kapsama sığmayan üretim, perakende ve enerji şirketleri',
      'Ağır entegrasyon ve özelleştirme mirası taşıyan, bunu tek seferde bırakamayacak organizasyonlar',
      'RISE with SAP sözleşmesi imzalamış ya da imzalamak üzere olan ve kendi tarafındaki işi netleştirmek isteyen şirketler',
      'Veri yerleşimi ve denetim gereksinimleri nedeniyle daha fazla kontrol isteyen düzenlenmiş sektörler',
    ],

    challenges: [
      'RISE kapsamının nerede bitip kendi sorumluluğunuzun nerede başladığı sözleşmeden net okunmuyor.',
      'Altyapı sağlayıcısı, uygulama danışmanı ve iç ekip arasındaki sorumluluk boşlukları proje ortasında ortaya çıkıyor.',
      'Mevcut özelleştirme ve entegrasyonların bulut ortamında nasıl çalışacağı test edilmeden varsayılıyor.',
      'Performans ve kapasite planlaması lisans boyutlandırmasıyla karıştırılıyor.',
      'Felaket kurtarma ve iş sürekliliği taahhütleri, iş biriminin beklentisiyle örtüşmüyor.',
    ],

    whatWeDo: [
      {
        heading: 'Sorumluluk sınırlarının netleştirilmesi',
        body: [
          'Private Cloud projelerinde en sık görülen sorun teknik değildir: sağlayıcının, uygulama danışmanının ve iç ekibin sorumluluklarının kesişmediği boşluklardır. Yedekleme kimde, sistem kopyası kimden talep edilir, performans sorununda ilk kim bakar, transport yönetimi kimde — bunları proje başında tek bir sorumluluk matrisinde yazılı hale getiririz.',
          'Bu matris ilk bakışta ayrıntı gibi görünür; oysa projeyi çoğu zaman bu belge kurtarır. RISE sözleşmesini kapsam açısından okur, sizin tarafınızda kalan işleri açıkça listeleriz; bu liste bütçe planlamasının da temelini oluşturur.',
        ],
      },
      {
        heading: 'Hedef mimari ve boyutlandırma',
        body: [
          'Sistem ortamı yapısını (geliştirme, test, kalite, canlı), veri hacmi projeksiyonunu, arşivleme stratejisini ve entegrasyon mimarisini birlikte tasarlarız. Boyutlandırma, lisans müzakeresinden ayrı ve teknik bir çalışmadır; ikisinin karıştırılması ya gereksiz maliyet ya da ilk yıl içinde performans sorunu yaratır.',
          'Entegrasyon tarafında mevcut arayüz envanterini çıkarır, hangilerinin bulut ortamında yeniden kurgulanması gerektiğini belirleriz. Şirket içi sistemlerle bağlantı gerektiren senaryolar özellikle erken ele alınmalıdır; ağ ve kimlik doğrulama tasarımı çoğu zaman tahmin edilenden uzun sürer.',
        ],
      },
      {
        heading: 'Finans süreçlerinin dönüşümü',
        body: [
          'Private Cloud’a geçiş, çoğu şirkette aynı zamanda S/4HANA’ya geçiştir. Bu da finans tarafında Universal Journal, iş ortağı dönüşümü, malzeme defteri ve yeni kredi yönetimi gibi kalemlerin ele alınması demektir. Esneklik korunduğu için mevcut süreçlerinizi taşıyabilirsiniz — ama her şeyi taşımak zorunda olmadığınızı hatırlatmak da bizim işimizdir.',
          'Geçişi, biriken teknik borcu azaltmak için bir fırsat olarak kullanırız: artık kullanılmayan geliştirmelerin ayıklanması, gereksiz özelleştirmelerin standarda döndürülmesi ve raporlama yapısının sadeleştirilmesi bu aşamada en düşük maliyetle yapılır.',
        ],
      },
      {
        heading: 'Geçiş ve devreye alma yönetimi',
        body: [
          'Veri migrasyonunu tekrarlanabilir bir süreç olarak kurar, her deneme geçişinde bakiye ve açık kalem mutabakatını otomatik üretiriz. Devreye alma planını sağlayıcının bakım pencereleriyle uyumlu olacak biçimde saat bazında yazar, geri dönüş kriterlerini önceden tanımlarız.',
          'Sağlayıcı tarafındaki bağımlılıklar — sistem kopyaları, ortam hazırlıkları, ağ değişiklikleri — kritik yol üzerinde olduğu için ayrı takip edilir. Bu bağımlılıkların gecikmesi, projelerde en sık görülen kayma nedenidir.',
        ],
      },
      {
        heading: 'Hypercare ve işletmeye devir',
        body: [
          'Geçiş sonrası ilk kapanışı ekiple birlikte yürütürüz. Hypercare sürecinde açılan her kaydın hangi tarafın sorumluluğuna girdiğini işaretler, sağlayıcıyla olan yönlendirme sürecinin oturmasını sağlarız — bu, hypercare bittikten sonra ekibin yalnız kalmaması demektir.',
        ],
      },
    ],

    deliverables: [
      'RISE kapsam okuması ve sorumluluk matrisi (sağlayıcı / danışman / iç ekip)',
      'Hedef mimari, sistem ortamı ve boyutlandırma dokümanı',
      'Entegrasyon envanteri ve hedef arayüz tasarımı',
      'Özelleştirme envanteri ve sadeleştirme önerileri',
      'Veri migrasyon planı ve mutabakat raporları',
      'Saat bazında devreye alma planı ve geri dönüş kriterleri',
      'Hypercare kayıt yönetimi düzeni ve kapanış raporu',
    ],

    aiRole:
      'Entegrasyon ve özelleştirme envanterinin çıkarılması, kod etki analizi ve migrasyon mutabakat kontrollerinin hazırlanmasında yapay zeka destekli araçlar kullanıyoruz. Bu, projenin en çok insan-saati tüketen hazırlık işlerini kısaltıyor. Mimari kararlar ve sorumluluk sınırlarının yorumu insana aittir.',

    duration:
      'Mimari ve hazırlık çalışması 5–8 hafta. Geçişin tamamı kapsama göre 7–14 ay.',
    team: 'Çözüm mimarı ve kıdemli FI/CO danışmanı sürekli; entegrasyon, teknik ve veri migrasyonu uzmanları faz bazlı. Sağlayıcı koordinasyonu mimarın sorumluluğundadır.',

    faqs: [
      {
        q: 'RISE with SAP ile Private Cloud aynı şey mi?',
        a: 'Tam olarak değil. RISE with SAP, altyapı, lisans ve belirli hizmetleri bir araya getiren ticari bir paket; Cloud ERP Private Edition ise bu paket içinde yer alan ERP çözümüdür. Pratikte önemli olan ayrım şudur: RISE altyapıyı devralır, süreç tasarımını ve uygulama işini devralmaz.',
      },
      {
        q: 'Public Cloud yerine neden Private Cloud seçelim?',
        a: 'Süreçlerinizin standart kapsama sığmadığı, ağır entegrasyon mirasınız olduğu ya da düzenleyici nedenlerle daha fazla kontrol gerektiği durumlarda. Bu bir prestij tercihi değil, bir uygunluk sorusudur; hangisinin size uyduğunu karşılaştırmalı olarak değerlendirdiğimiz ayrı bir çalışma vardır ve çözümler sayfamızdaki tablo bu karşılaştırmanın özetidir.',
      },
      {
        q: 'Mevcut özelleştirmelerimizin hepsini taşıyabilir miyiz?',
        a: 'Teknik olarak büyük ölçüde evet, ama önerimiz genellikle hayır. Geçiş, kullanılmayan geliştirmeleri ayıklamak için en düşük maliyetli andır. Kullanım verisine bakarak neyin gerçekten çalıştığını çıkarır, kararı sizinle birlikte veririz.',
      },
      {
        q: 'Altyapı sağlayıcımızla siz mi konuşacaksınız?',
        a: 'Evet, teknik koordinasyon mimarımızın sorumluluğundadır. Sağlayıcı bağımlılıkları kritik yol üzerinde olduğu için ayrı takip edilir ve haftalık durum raporunda ayrı bir başlık olarak yer alır.',
      },
      {
        q: 'Felaket kurtarma ve yedekleme kimin sorumluluğunda?',
        a: 'Bu, sözleşmenizin hangi hizmet seviyesini içerdiğine bağlıdır ve varsayımla ilerlenmemesi gereken bir konudur. Kapsam okuması aşamasında taahhüt edilen kurtarma süresi ve kurtarma noktası hedeflerini iş biriminin beklentisiyle karşılaştırır, aradaki farkı yazılı olarak önünüze koyarız.',
      },
    ],

    comparison: {
      forWhom: 'Süreç esnekliğini korumak zorunda olan büyük ölçekli şirketler',
      duration: 'Hazırlık 5–8 hafta, geçiş 7–14 ay',
      mainGain: 'Esnekliği koruyarak altyapı yükünden kurtulma',
    },
    serviceType: 'SAP Cloud ERP Private Edition consulting',
  },

  en: {
    navTitle: 'SAP Private Cloud',
    navDesc: 'RISE with SAP and Cloud ERP Private Edition architecture',
    cardDesc:
      'For organisations moving to cloud without giving up their own process logic: architecture, migration and provider coordination.',

    title: 'SAP Private Cloud: hand over the infrastructure, keep the flexibility',
    metaTitle: 'SAP Private Cloud & RISE with SAP Consulting | CPeak Consultancy',
    metaDescription:
      'Architecture design, responsibility boundary definition, migration management and finance transformation for RISE with SAP and Cloud ERP Private Edition.',

    summary:
      'Private Cloud lets you keep the flexibility of S/4HANA while handing infrastructure operation to someone else. The difficulty is rarely technical. It sits in the responsibility boundaries — what the RISE contract does and does not cover is something most organisations discover mid-project.',

    whoFor: [
      'Manufacturing, retail and energy businesses whose industry processes do not fit standard scope',
      'Organisations carrying heavy integration and customisation history that cannot be abandoned in one step',
      'Companies that have signed or are about to sign a RISE with SAP agreement and want clarity on what remains theirs',
      'Regulated industries needing more control over data residency and audit',
    ],

    challenges: [
      'Where the RISE scope ends and your own responsibility begins cannot be read clearly from the contract.',
      'Gaps between the hosting provider, the implementation partner and the internal team surface mid-project.',
      'How existing customisations and interfaces will behave in the hosted environment is assumed rather than tested.',
      'Capacity planning gets conflated with licence sizing.',
      'Disaster recovery commitments do not match what the business assumes it has.',
    ],

    whatWeDo: [
      {
        heading: 'Defining the responsibility boundaries',
        body: [
          'The most common failure in these programmes is not technical. It is the space between three parties where nobody owns the work: who takes the backup, who requests a system copy, who investigates a performance complaint first, who controls transport management. We put all of it into a single responsibility matrix at the start of the project.',
          'The matrix looks like an administrative document and turns out to be the one that saves the programme. We read the RISE agreement specifically for scope and list what remains on your side — that list is also the basis for a realistic budget.',
        ],
      },
      {
        heading: 'Target architecture and sizing',
        body: [
          'We design the system landscape, data volume projection, archiving strategy and integration architecture together. Sizing is a technical exercise separate from licence negotiation; conflating the two produces either unnecessary cost or a performance problem within the first year.',
          'On integration we inventory existing interfaces and determine which need redesign for the hosted environment. Scenarios requiring connectivity back to on-premise systems deserve early attention — network and identity design routinely takes longer than anyone plans for.',
        ],
      },
      {
        heading: 'Transforming the finance processes',
        body: [
          'For most organisations, moving to Private Cloud is also the move to S/4HANA. That brings the Universal Journal, business partner conversion, material ledger and the new credit management architecture into scope. Because flexibility is preserved you can carry your existing processes across — part of our job is reminding you that you do not have to.',
          'We treat the migration as the cheapest moment you will ever have to reduce technical debt: retiring dead custom code, returning unnecessary modifications to standard and simplifying the reporting structure all cost least when done as part of a move that is happening anyway.',
        ],
      },
      {
        heading: 'Migration and cutover management',
        body: [
          'Migration is built as a repeatable process, with balance and open item reconciliation generated automatically on every mock run. The cutover plan is written hour by hour against the provider’s maintenance windows, with rollback criteria agreed in advance.',
          'Provider-side dependencies — system copies, environment provisioning, network changes — sit on the critical path and are tracked separately. Slippage in exactly those dependencies is the most common cause of delay in Private Cloud programmes.',
        ],
      },
      {
        heading: 'Hypercare and handover',
        body: [
          'We run the first post-go-live close together with your team. During hypercare every ticket is tagged with which party owns it, so the routing process with the provider is established while we are still there. That is what stops the team being stranded the week hypercare ends.',
        ],
      },
    ],

    deliverables: [
      'RISE scope reading and responsibility matrix across provider, partner and internal team',
      'Target architecture, landscape and sizing documentation',
      'Interface inventory and target integration design',
      'Custom code inventory with simplification recommendations',
      'Migration plan with automated reconciliation reporting',
      'Hour-by-hour cutover plan with rollback criteria',
      'Hypercare ticket governance and closing report',
    ],

    aiRole:
      'We use AI-assisted tooling to inventory interfaces and custom code, run impact analysis and prepare migration reconciliation checks — the preparation work that otherwise consumes the most person-hours. Architecture decisions and the interpretation of responsibility boundaries stay with people.',

    duration: 'Architecture and preparation 5–8 weeks. Full migration 7–14 months depending on scope.',
    team: 'Solution architect and senior FI/CO consultant throughout; integration, technical and migration specialists phased in. Provider coordination sits with the architect.',

    faqs: [
      {
        q: 'Are RISE with SAP and Private Cloud the same thing?',
        a: 'Not quite. RISE with SAP is a commercial bundle combining infrastructure, licensing and certain services; Cloud ERP Private Edition is the ERP solution within that bundle. The distinction that matters in practice: RISE takes over the infrastructure, not the process design or the implementation work.',
      },
      {
        q: 'Why choose Private over Public Cloud?',
        a: 'When your processes fall outside standard scope, when you carry substantial integration history, or when regulation requires more control. It is a question of fit rather than prestige. Our solutions overview page carries a direct comparison of the two models across cost, flexibility, upgrade cadence and suitability.',
      },
      {
        q: 'Can we carry all our customisations across?',
        a: 'Technically, largely yes — but our recommendation is usually no. The migration is the lowest-cost opportunity you will get to retire dead development. We establish what actually executes from usage data and take the decision with you rather than for you.',
      },
      {
        q: 'Will you deal with our hosting provider?',
        a: 'Yes. Technical coordination sits with our architect. Provider dependencies are on the critical path, so they are tracked separately and reported as their own item in the weekly status.',
      },
      {
        q: 'Who is responsible for backup and disaster recovery?',
        a: 'It depends on the service level in your specific agreement, and it is not a topic to proceed on by assumption. During the scope reading we compare the committed recovery time and recovery point objectives against what the business believes it has, and put any difference in front of you in writing.',
      },
    ],

    comparison: {
      forWhom: 'Larger organisations that must retain process flexibility',
      duration: 'Preparation 5–8 weeks, migration 7–14 months',
      mainGain: 'Cloud operations without giving up flexibility',
    },
    serviceType: 'SAP Cloud ERP Private Edition consulting',
  },
};
