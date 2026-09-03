import type { LocalizedSolution } from '../types';

/** S/4HANA dönüşümü ve geçiş — brownfield / greenfield / selective. */
export const s4hana: LocalizedSolution = {
  tr: {
    navTitle: 'S/4HANA Dönüşümü',
    navDesc: 'Brownfield, greenfield ve seçici geçiş kararı ve uygulaması',
    cardDesc:
      'Hangi geçiş yönteminin sizin için doğru olduğunu veriyle belirler, kararı gerekçesiyle birlikte belgeler ve dönüşümü uçtan uca yürütürüz.',

    title: 'S/4HANA dönüşümü: önce doğru yöntem, sonra proje',
    metaTitle: 'SAP S/4HANA Dönüşüm Danışmanlığı | CPeak Consultancy',
    metaDescription:
      'ECC’den S/4HANA’ya geçişte brownfield, greenfield ve selective data transition karşılaştırması, hazırlık analizi, veri migrasyonu ve uçtan uca dönüşüm yönetimi.',

    summary:
      'S/4HANA projelerinin çoğu teknik nedenlerle değil, yanlış geçiş yöntemiyle başladığı için zorlanır. Yöntem kararı, projenin süresini, maliyetini ve taşıyacağınız teknik borcu baştan belirler — bu yüzden işe oradan başlarız.',

    whoFor: [
      'ECC üzerinde çalışan ve bakım takvimi nedeniyle geçiş planı yapması gereken şirketler',
      'Birden çok şirket kodu ve ülkeyi aynı programda taşımak zorunda olan gruplar',
      'Yıllar içinde ağır özelleştirme biriktirmiş, bunun ne kadarının hâlâ gerekli olduğunu bilmeyen BT organizasyonları',
      'Daha önce bir dönüşüm denemesi durmuş ya da beklenen faydayı vermemiş şirketler',
    ],

    challenges: [
      'Brownfield mi greenfield mi sorusuna her danışman farklı ve gerekçesiz bir cevap veriyor.',
      'Mevcut sistemdeki özelleştirmelerin ne kadarının kullanıldığı bilinmiyor; hepsini taşımak da atmak da riskli görünüyor.',
      'Ana veri kalitesi belirsiz; migrasyonda çıkacak sorunların boyutu tahmin edilemiyor.',
      'Proje süresi ve iş biriminin ayıracağı efor gerçekçi biçimde tahmin edilemediği için bütçe onayı alınamıyor.',
      'Geçişin iş tarafına ne kazandıracağı anlatılamıyor; konu teknik bir zorunluluk anlatısının ötesine geçmiyor.',
    ],

    whatWeDo: [
      {
        heading: 'Hazırlık analizi ve yöntem kararı',
        body: [
          'Mevcut sistemi teknik ve işlevsel olarak tararız: özelleştirme envanteri ve gerçek kullanım oranları, uyumsuzluk kontrolleri (simplification item), ana veri kalitesi, arayüz envanteri ve veri hacmi. Bu tarama, geçiş yöntemi tartışmasını görüş meselesi olmaktan çıkarır.',
          'Üç yöntemin — sistem dönüşümü (brownfield), yeni kurulum (greenfield) ve seçici veri geçişi (selective data transition) — sizin özel durumunuzdaki maliyetini, süresini ve riskini yan yana koyarız. Kararı biz vermeyiz; kararı verecek kişinin elinde savunabileceği bir gerekçe olmasını sağlarız.',
          'Çoğu şirkette doğru cevap saf brownfield ya da saf greenfield değildir. Tarihsel veriyi taşırken süreçleri yenilemek isteyen gruplarda seçici geçiş, ilk bakışta karmaşık görünse de toplamda daha kısa ve daha ucuz çıkabilir.',
        ],
      },
      {
        heading: 'Özelleştirme borcunun temizlenmesi',
        body: [
          'Yıllar içinde biriken Z geliştirmelerinin önemli bir bölümü tipik olarak artık kullanılmaz. Kullanım verisiyle çalışarak neyin gerçekten çalıştığını, neyin standart işlevsellikle karşılanabileceğini ve neyin yeniden yazılması gerektiğini ayırırız.',
          'Bu, dönüşümün en çok tasarruf sağlayan adımıdır: taşınmayan her geliştirme, test edilmeyecek, dokümante edilmeyecek ve on yıl daha bakımı yapılmayacak demektir. Ancak kullanılan bir geliştirmenin yanlışlıkla listeden düşmesi de en pahalı hatalardan biridir; bu yüzden eleme kararlarını iş birimiyle birlikte yazılı olarak kayda geçiririz.',
        ],
      },
      {
        heading: 'Finans tarafının dönüşümü',
        body: [
          'Finans, S/4HANA geçişinde en çok değişen alandır. Universal Journal’a geçiş, yeni genel muhasebe (New GL) yapılandırması, iş ortağı (business partner) dönüşümü, malzeme defteri (material ledger) zorunluluğu ve kredi yönetiminin yeni yapısı — bunların her biri kendi başına bir çalışma kalemidir.',
          'Bu alandaki derinliğimiz, projenin en kritik bölümünü dışarıdan bir uzmana devretmek zorunda kalmadan yürütmemizi sağlar. Finans ekibinin kapanışa devam ederken dönüşüme de vakit ayırması gerektiği için, iş yükünü kapanış takvimiyle çakışmayacak biçimde planlarız.',
        ],
      },
      {
        heading: 'Veri migrasyonu ve test',
        body: [
          'Veri migrasyonunu tek seferlik bir aktarım değil, tekrarlanabilir bir süreç olarak kurarız. Her deneme geçişinde (mock migration) mutabakat raporları otomatik üretilir; bakiyeler, açık kalemler ve sabit kıymet değerleri kaynak ile hedef arasında satır düzeyinde karşılaştırılır. Canlıya geçiş gününde sürpriz yaşanmaması, o güne kadar yapılan deneme sayısına bağlıdır.',
          'Test tarafında regresyon kapsamını iş süreçlerine göre kurgular, kritik finansal akışların her birinin en az bir uçtan uca senaryoyla kapsandığını güvence altına alırız.',
        ],
      },
      {
        heading: 'Devreye alma ve hypercare',
        body: [
          'Canlıya geçiş planını saat bazında yazar, geri dönüş (rollback) kriterlerini önceden tanımlarız. Geçişten sonraki ilk kapanış, projenin gerçek sınavıdır; hypercare dönemini bu kapanışı kapsayacak şekilde planlarız ve o kapanışı ekiple birlikte yürütürüz.',
        ],
      },
    ],

    deliverables: [
      'Hazırlık analizi raporu: özelleştirme envanteri, uyumsuzluk listesi, veri kalitesi bulguları',
      'Geçiş yöntemi karşılaştırması ve gerekçeli öneri',
      'Hedef mimari ve süreç tasarım dokümanı',
      'Veri migrasyon planı ve mutabakat raporları',
      'Test stratejisi, test senaryoları ve sonuç kayıtları',
      'Saat bazında devreye alma (cutover) planı ve geri dönüş kriterleri',
      'Anahtar kullanıcı eğitimi ve hypercare kapanış raporu',
    ],

    aiRole:
      'Özelleştirme envanterinin analizi, kod taraması ve etki değerlendirmesi gibi hacim işlerinde yapay zeka destekli araçlar kullanıyoruz; aynı şekilde test senaryolarının ilk taslağı ve migrasyon mutabakat kontrollerinin hazırlanmasında da. Bu, hazırlık aşamasını kısaltır. Kapsam kararlarını ve mutabakat sonuçlarının yorumunu her zaman kıdemli danışman verir.',

    duration:
      'Hazırlık analizi 4–6 hafta. Dönüşümün kendisi kapsam ve yönteme göre 6–14 ay; tek şirket kodlu sade kurulumlarda daha kısa.',
    team:
      'Çözüm mimarı ve kıdemli FI/CO danışmanı proje boyunca çalışır; veri migrasyonu, teknik geliştirme ve test uzmanları fazlara göre devreye girer.',

    faqs: [
      {
        q: 'Brownfield mi greenfield mi? Kısaca hangisi daha iyi?',
        a: 'Genel geçer bir cevabı yok; bu soruya koşulları incelemeden verilen cevaplara temkinli yaklaşmakta fayda var. Süreçleriniz büyük ölçüde çalışıyor ve tarihsel veriyi korumanız gerekiyorsa brownfield genellikle daha kısa ve ucuzdur. Süreçler köklü biçimde değişecekse ya da mevcut kurulum ağır teknik borç taşıyorsa greenfield toplamda daha temiz çıkar. İkisinin arasındaki durumlar için seçici veri geçişi vardır ve pratikte en sık doğru cevap odur.',
      },
      {
        q: 'Ne kadar tarihsel veri taşıyabiliriz?',
        a: 'Teknik olarak tamamı taşınabilir, ancak taşınması gerektiği anlamına gelmez. Yasal saklama yükümlülüğü, denetim ihtiyacı ve karşılaştırmalı raporlama gereksinimi ile migrasyon süresi ve sistem büyüklüğü arasında bir denge kurmak gerekir. Bu dengeyi hazırlık aşamasında finans ve denetim tarafıyla birlikte netleştiririz.',
      },
      {
        q: 'Geçiş sırasında sistemimiz ne kadar süre kapalı kalır?',
        a: 'Devreye alma penceresi kapsama, veri hacmine ve seçilen yönteme göre değişir; tipik olarak uzun bir hafta sonu planlanır. Kesin süre, deneme geçişlerinde ölçülür — plan bu ölçüme dayanır, tahmine değil.',
      },
      {
        q: 'RISE with SAP kapsamında geçiş yapıyoruz. Sizinle çalışmak çakışır mı?',
        a: 'Hayır. RISE altyapı ve lisans tarafını kapsar; süreç tasarımı, finans yapılandırması ve veri migrasyonunun doğruluğu yine sizin sorumluluğunuzdadır. Biz bu tarafta çalışırız ve altyapı sağlayıcısıyla koordinasyonu yürütürüz.',
      },
      {
        q: 'Projenin ortasında ekibimizin ne kadar zamanı gidecek?',
        a: 'Bunu baştan ve açıkça söyleriz; çünkü iş biriminin ayıracağı zamanın olduğundan az tahmin edilmesi, projeleri geciktiren başlıca nedendir. Kilit kullanıcıların test ve doğrulama fazlarında haftalık ciddi bir zaman ayırması gerekir; planı bu gerçeği gizlemeden kurarız.',
      },
      {
        q: 'Daha önce başlayıp duran bir projemiz vardı. Sıfırdan mı başlamalıyız?',
        a: 'Genellikle hayır. Önceki çalışmanın hangi bölümünün hâlâ geçerli olduğunu değerlendiririz; tasarım dokümanları ve alınmış kararlar çoğu zaman kısmen kurtarılabilir. Önce projenin neden durduğunu anlarız; teknik bir tıkanma ile sahiplenme eksikliği çok farklı çözümler gerektirir.',
      },
    ],

    comparison: {
      forWhom: 'ECC üzerinde olup geçiş planlaması gereken şirketler',
      duration: 'Analiz 4–6 hafta, dönüşüm 6–14 ay',
      mainGain: 'Gerekçeli yöntem kararı ve öngörülebilir geçiş',
    },
    serviceType: 'SAP S/4HANA migration consulting',
  },

  en: {
    navTitle: 'S/4HANA Transformation',
    navDesc: 'Choosing and executing brownfield, greenfield or selective transition',
    cardDesc:
      'We determine which conversion approach fits your landscape using evidence, document the reasoning, and then run the transformation end to end.',

    title: 'S/4HANA transformation: the approach decision comes first',
    metaTitle: 'SAP S/4HANA Transformation Consulting | CPeak Consultancy',
    metaDescription:
      'Readiness assessment, brownfield vs greenfield vs selective data transition analysis, data migration and end-to-end delivery of SAP S/4HANA conversions.',

    summary:
      'Most S/4HANA programmes struggle for one reason: they began with the wrong conversion approach. That single decision sets the duration, the cost and the technical debt you carry for the next decade, so it is where we start.',

    whoFor: [
      'Organisations on ECC that need a defensible plan before maintenance deadlines force one',
      'Groups moving multiple company codes and countries within a single programme',
      'IT organisations carrying years of accumulated custom code with no reliable view of what is still used',
      'Companies whose earlier conversion attempt stalled or failed to deliver the expected benefit',
    ],

    challenges: [
      'Every advisor gives a different answer to brownfield versus greenfield, and none of them show their reasoning.',
      'Nobody knows how much of the custom code is genuinely in use, so both keeping it and dropping it look risky.',
      'Master data quality is unknown, making migration effort impossible to size.',
      'Business-side effort cannot be estimated credibly, so the budget case stalls.',
      'The business case never gets beyond “maintenance is ending”, which is a deadline rather than a benefit.',
    ],

    whatWeDo: [
      {
        heading: 'Readiness assessment and approach decision',
        body: [
          'We scan the existing landscape technically and functionally: custom code inventory with actual usage statistics, simplification item checks, master data quality, interface inventory and data volumes. This turns the conversion approach debate from a matter of opinion into a matter of evidence.',
          'We then compare all three routes — system conversion, new implementation and selective data transition — against your specific situation, with cost, duration and risk side by side. We do not make the decision for you; we make sure whoever does can defend it to a board.',
          'For most groups the correct answer is neither pure brownfield nor pure greenfield. Where historical data must be retained but processes need genuine redesign, selective transition often turns out shorter and cheaper overall despite looking more complex at first.',
        ],
      },
      {
        heading: 'Clearing the customisation debt',
        body: [
          'A significant share of accumulated custom development is typically no longer executed at all. Working from usage data, we separate what genuinely runs, what standard functionality now covers, and what must be rewritten against the new data model.',
          'This is the single largest source of saving in a conversion: every object not carried forward is one that will not be tested, documented or maintained for another decade. It is also where the most expensive mistakes happen, so retirement decisions are signed off with the business rather than made in the IT department alone.',
        ],
      },
      {
        heading: 'The finance side of the conversion',
        body: [
          'Finance changes more than any other area in an S/4HANA conversion. The Universal Journal, business partner conversion, mandatory material ledger, the new credit management architecture and parallel ledger handling are each a workstream in their own right.',
          'Our depth here means the most sensitive part of the programme does not get subcontracted to a specialist who arrives late and leaves early. Because the finance team has to keep closing the books while the project runs, we plan their workload explicitly around the close calendar rather than on top of it.',
        ],
      },
      {
        heading: 'Data migration and testing',
        body: [
          'We build migration as a repeatable process, not a one-off transfer. Every mock migration produces reconciliation reports automatically, comparing balances, open items and asset values line by line between source and target. How few surprises you meet on go-live day depends on how many rehearsals came before it.',
          'On the testing side we scope regression coverage by business process and ensure every critical financial flow is covered by at least one end-to-end scenario with a named owner.',
        ],
      },
      {
        heading: 'Cutover and hypercare',
        body: [
          'The cutover plan is written hour by hour, with rollback criteria defined and agreed before the weekend begins rather than improvised during it. The first close after go-live is the real examination, so hypercare is planned to cover it and we run that close alongside your team.',
        ],
      },
    ],

    deliverables: [
      'Readiness report: custom code inventory, simplification findings, data quality assessment',
      'Comparative analysis of conversion approaches with a reasoned recommendation',
      'Target architecture and process design documentation',
      'Data migration plan with automated reconciliation reporting',
      'Test strategy, scenarios and recorded results',
      'Hour-by-hour cutover plan with rollback criteria',
      'Key user training and hypercare closing report',
    ],

    aiRole:
      'We use AI-assisted tooling for the volume work: custom code analysis, impact assessment, first drafts of test scenarios and migration reconciliation checks. This compresses the assessment phase considerably. Scope decisions and the interpretation of reconciliation results always rest with a senior consultant.',

    duration:
      'Readiness assessment 4–6 weeks. The conversion itself runs 6–14 months depending on scope and approach; single-entity landscapes sit at the shorter end.',
    team: 'Solution architect and senior FI/CO consultant throughout; migration, development and test specialists phased in as needed.',

    faqs: [
      {
        q: 'Brownfield or greenfield — which is better?',
        a: 'There is no general answer, and any answer given without looking at your system is a guess rather than advice. If your processes largely work and history must be retained, brownfield is usually shorter and cheaper. If processes are changing fundamentally or the landscape carries heavy technical debt, greenfield is cleaner overall. Selective data transition exists for everything in between, which in practice is where most organisations sit.',
      },
      {
        q: 'How much historical data can we bring across?',
        a: 'Technically all of it — which does not mean you should. The balance sits between statutory retention, audit needs and comparative reporting on one side, and migration runtime and system size on the other. We settle this with finance and audit during the assessment rather than discovering it during cutover.',
      },
      {
        q: 'How long will the system be unavailable during go-live?',
        a: 'The cutover window depends on scope, data volume and approach, and is typically planned across a long weekend. The precise duration is measured during mock migrations, so the plan rests on measurement rather than estimate.',
      },
      {
        q: 'We are converting under RISE with SAP. Does that conflict with engaging you?',
        a: 'No. RISE covers infrastructure and licensing. Process design, finance configuration and the correctness of your data migration remain your responsibility. That is the layer we work in, and we coordinate with the hosting provider rather than duplicating them.',
      },
      {
        q: 'How much of our own team’s time will this take?',
        a: 'We state this openly at the start, because underestimated business-side effort is the leading cause of delay in these programmes. Key users need substantial weekly time during testing and validation phases. We plan against that reality instead of hiding it to make the timeline look attractive.',
      },
      {
        q: 'Our previous attempt stalled. Do we start over?',
        a: 'Usually not. We assess which parts of the earlier work remain valid — design documentation and decisions already taken are often partly recoverable. First we establish why it stopped, because a technical blocker and an ownership vacuum call for entirely different remedies.',
      },
    ],

    comparison: {
      forWhom: 'Organisations on ECC that need a conversion plan',
      duration: 'Assessment 4–6 weeks, conversion 6–14 months',
      mainGain: 'A defensible approach decision and a predictable cutover',
    },
    serviceType: 'SAP S/4HANA migration consulting',
  },
};
