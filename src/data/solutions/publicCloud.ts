import type { LocalizedSolution } from '../types';

/** SAP Public Cloud — Cloud ERP Public Edition mimarisi ve uygulaması. */
export const publicCloud: LocalizedSolution = {
  tr: {
    navTitle: 'SAP Public Cloud',
    navDesc: 'Cloud ERP Public Edition mimarisi ve uygulaması',
    cardDesc:
      'Standarda uyum karşılığında hız ve düşük toplam maliyet sunan Public Cloud modelinde, sürecinizin standarda ne kadar sığdığını önce netleştiririz.',

    title: 'SAP Public Cloud: standardın sınırlarını önceden bilmek',
    metaTitle: 'SAP Public Cloud (Cloud ERP Public Edition) Danışmanlığı | CPeak',
    metaDescription:
      'SAP Cloud ERP Public Edition için uygunluk değerlendirmesi, fit-to-standard analizi, finans süreç kurulumu ve çeyreklik güncelleme döngüsüne hazırlık.',

    summary:
      'Public Cloud, hızlı kurulum ve düşük işletme maliyeti sunar; karşılığında süreçlerinizi standarda uydurmanızı ister. Bu takas doğru şirkette çok iyi çalışır, yanlış şirkette ise projenin ortasında anlaşılır. Biz bunu başında ölçeriz.',

    whoFor: [
      'Hızlı büyüyen, süreçlerini standart üzerine kurmaya istekli orta ölçekli şirketler',
      'Bir grup şirketinin yeni kurulan ya da satın alınan iştirakini hızlıca sisteme almak isteyen finans ekipleri',
      'İç BT kadrosu sınırlı olan ve altyapı ile güncelleme yükünü taşımak istemeyen organizasyonlar',
      'Uluslararası yayılımda ülke bazlı kurulumları standart bir şablonla tekrarlamak isteyen şirketler',
    ],

    challenges: [
      'Public Cloud’un yeterli olup olmayacağı tartışılıyor ancak süreçler standart kapsamla karşılaştırılmıyor.',
      'Mevcut özelleştirmelerin bulut modelinde karşılığı olup olmadığı bilinmiyor.',
      'Çeyreklik güncellemelerin işletmeyi nasıl etkileyeceği belirsiz; regresyon testi için bir düzen kurulmamış.',
      'Genişletme (extensibility) ihtiyaçlarının hangi yöntemle karşılanacağı netleşmeden geliştirmeye başlanıyor.',
      'Entegrasyon ihtiyaçları — banka, e-fatura, mevcut sistemler — proje sonuna bırakılıyor.',
    ],

    whatWeDo: [
      {
        heading: 'Uygunluk değerlendirmesi: doğru soru, doğru zamanda',
        body: [
          'Public Cloud kararı, sözleşme imzalanmadan önce verilmelidir. Süreçlerinizi standart kapsamla madde madde karşılaştırır, standart dışına düşen her noktayı üç gruba ayırırız: standartla değiştirilebilecek olanlar, izin verilen genişletme yöntemleriyle karşılanabilecek olanlar ve modele hiç sığmayanlar.',
          'Üçüncü grup boş değilse bu bir başarısızlık değil, bilgidir. Kimi şirket için doğru cevap Private Cloud’dur; kimi şirket için ise o birkaç süreci standarda uydurmak, uğruna ödenecek bedelden ucuzdur. Bu kararı bizim yerimize sizin verebilmeniz için karşılaştırmayı yazılı ve gerekçeli bırakırız.',
        ],
      },
      {
        heading: 'Fit-to-standard ve finans süreçlerinin kurulması',
        body: [
          'Kurulum, standart süreçlerin birlikte gözden geçirildiği fit-to-standard oturumlarıyla ilerler. Bu oturumların değeri, sistemin ne yaptığını göstermekten çok, ekibin “biz bunu neden farklı yapıyoruz?” sorusuyla yüzleşmesini sağlamaktır. Alışkanlıktan kaynaklanan farklar burada elenir, gerçek iş gereksinimleri ise kayda geçer.',
          'Finans tarafında hesap planı, raporlama yapısı, vergi kurulumu, banka entegrasyonu ve kapanış süreçlerini standart şablon üzerinden kurarız. Türkiye özelinde yasal gereksinimlerin — e-fatura, e-defter, enflasyon muhasebesi gibi — bulut modelinde nasıl karşılandığı ayrı bir çalışma kalemidir ve baştan planlanır.',
        ],
      },
      {
        heading: 'Genişletme stratejisi',
        body: [
          'Public Cloud’da çekirdek sisteme dokunulmaz; genişletme, izin verilen yöntemlerle ve ayrı bir katmanda yapılır. Hangi ihtiyacın anahtar kullanıcı düzeyinde yapılandırmayla, hangisinin gömülü genişletme ile, hangisinin ise SAP BTP üzerinde ayrı bir uygulamayla karşılanacağını baştan kararlaştırırız.',
          'Bu ayrımın erken yapılması önemlidir, çünkü yanlış katmanda yazılmış bir genişletme çeyreklik güncellemelerde kırılır ve sürekli bakım yükü yaratır. Doğru katmanda yazılmış olan ise güncellemeden etkilenmez.',
        ],
      },
      {
        heading: 'Güncelleme döngüsüne hazırlık',
        body: [
          'Public Cloud düzenli aralıklarla güncellenir ve bu güncellemeler isteğe bağlı değildir. Bunu bir risk olmaktan çıkarmanın yolu, kritik süreçler için tekrarlanabilir bir regresyon test setini kurulum sırasında oluşturmak ve test sistemine güncelleme geldiğinde bu seti çalıştıracak bir düzen bırakmaktır.',
          'Ekibe ayrıca yayın notlarını okuma alışkanlığı kazandırırız: her sürümde işinizi ilgilendiren birkaç madde vardır ve bunları önceden görmek, güncelleme sonrası sürprizlerin çoğunu ortadan kaldırır.',
        ],
      },
      {
        heading: 'Devreye alma ve kullanıcı eğitimi',
        body: [
          'Veri migrasyonu, deneme geçişleri ve mutabakat kontrolleri Private Cloud projelerindeki disiplinle yürütülür; bulut modeli olması denetimi gevşetmez. Eğitimleri kullanıcıların günlük işleri üzerinden veririz, modül anlatımı üzerinden değil.',
        ],
      },
    ],

    deliverables: [
      'Uygunluk değerlendirmesi ve standart dışı süreç listesi (gerekçeli)',
      'Fit-to-standard oturum kayıtları ve karar defteri',
      'Yapılandırılmış finans süreçleri ve raporlama yapısı',
      'Genişletme stratejisi ve katman kararları dokümanı',
      'Entegrasyon tasarımı (banka, e-belge, çevre sistemler)',
      'Regresyon test seti ve güncelleme kontrol listesi',
      'Veri migrasyon planı, mutabakat raporları ve kullanıcı eğitimi',
    ],

    aiRole:
      'Süreçlerinizi standart kapsamla karşılaştırırken ve mevcut kurulumunuzun envanterini çıkarırken yapay zeka destekli analiz kullanıyoruz; regresyon test senaryolarının ilk taslağını da bu şekilde üretiyoruz. Ayrıca SAP’nin sistem içindeki yerleşik yapay zeka yeteneklerinin hangilerinin sizin süreçlerinizde gerçekten karşılığı olduğunu değerlendirir, hepsini açmak yerine işe yarayanı seçeriz.',

    duration:
      'Uygunluk değerlendirmesi 2–3 hafta. Tek ülkeli standart finans kurulumu tipik olarak 3–5 ay; çok ülkeli yayılımlarda ülke başına ek süre.',
    team: 'Bir kıdemli finans danışmanı ve bir çözüm mimarı; entegrasyon ve veri migrasyonu uzmanları faz bazlı.',

    faqs: [
      {
        q: 'Public Cloud bizim için yeterli olur mu?',
        a: 'Bu, ancak süreçleriniz standart kapsamla karşılaştırıldıktan sonra cevaplanabilir. Değerlendirme tipik olarak iki üç haftalık bir çalışmadır ve sonunda elinizde net bir liste olur: standarda sığanlar, genişletme ile çözülenler ve sığmayanlar. Karar bu listeye bakılarak verilir.',
      },
      {
        q: 'Türkiye’deki yasal gereksinimler bulut modelinde karşılanıyor mu?',
        a: 'Yerelleştirme kapsamı sürümden sürüme genişlemektedir ve bazı gereksinimler entegrasyon ya da iş ortağı çözümüyle karşılanır. Değerlendirme aşamasında sizin özel yükümlülüklerinizi güncel kapsamla tek tek karşılaştırır, açık kalan noktaları ve çözüm yolunu yazılı olarak veririz.',
      },
      {
        q: 'Sonradan Private Cloud’a geçebilir miyiz?',
        a: 'Teknik olarak mümkündür ancak bedelsiz değildir; yeni bir kurulum ve veri geçişi anlamına gelir. Bu yüzden model kararına baştan hak ettiği zamanı ayırmak, sonradan taşınmaktan çok daha ucuzdur.',
      },
      {
        q: 'Mevcut özelleştirmelerimiz taşınabilir mi?',
        a: 'Çekirdeği değiştiren klasik özelleştirmeler taşınamaz — model buna izin vermez. Bunların bir bölümü artık standart işlevsellikle karşılanır, bir bölümü izin verilen genişletme yöntemleriyle yeniden kurulur, bir bölümü ise gerçekten gerekli değildir. Envanter çalışması bu üçünü ayırır.',
      },
      {
        q: 'Güncellemeler işimizi durdurur mu?',
        a: 'Güncellemeler planlı bakım pencerelerinde uygulanır ve önce test sistemine gelir. Kritik süreçleriniz için hazır bir regresyon test seti varsa, güncelleme öncesi kontrol birkaç saatlik bir işe iner. Bu seti kurulum sırasında oluşturmamızın nedeni budur.',
      },
    ],

    comparison: {
      forWhom: 'Standarda uyum sağlayabilen, hızlı kurulum isteyen şirketler',
      duration: 'Değerlendirme 2–3 hafta, kurulum 3–5 ay',
      mainGain: 'Hızlı devreye alma ve düşük işletme yükü',
    },
    serviceType: 'SAP Cloud ERP Public Edition implementation',
  },

  en: {
    navTitle: 'SAP Public Cloud',
    navDesc: 'Cloud ERP Public Edition architecture and delivery',
    cardDesc:
      'Public Cloud trades customisation for speed and low total cost. We establish how much of your process actually fits the standard before you commit.',

    title: 'SAP Public Cloud: knowing the limits of standard before you commit',
    metaTitle: 'SAP Public Cloud (Cloud ERP Public Edition) Consulting | CPeak',
    metaDescription:
      'Fit assessment, fit-to-standard workshops, finance configuration, extensibility strategy and release-cycle readiness for SAP Cloud ERP Public Edition.',

    summary:
      'Public Cloud offers fast deployment and low run cost in exchange for adopting the standard. That trade works very well for the right organisation and becomes obvious halfway through the project for the wrong one. We measure which you are before the contract, not after.',

    whoFor: [
      'Fast-growing mid-market companies willing to build finance on standard processes',
      'Groups rolling out a common template to newly acquired or newly established subsidiaries',
      'Organisations that have a small internal IT function and do not want to carry infrastructure and upgrade work',
      'Companies expanding internationally that need country deployments to repeat rather than be reinvented',
    ],

    challenges: [
      'Whether Public Cloud is “enough” gets debated at length while the actual processes are never compared to the standard scope.',
      'It is unclear whether existing customisations have any equivalent in the cloud model.',
      'The impact of the regular release cycle is unknown and no regression discipline exists.',
      'Development starts before deciding which extensibility layer each requirement belongs in.',
      'Integration needs — banking, e-invoicing, surrounding systems — get deferred to the end of the project.',
    ],

    whatWeDo: [
      {
        heading: 'Fit assessment, before the contract',
        body: [
          'The moment to decide on Public Cloud is before signing, not during the build. We compare your processes against the standard scope item by item and sort every gap into three groups: those where the standard is simply a different and acceptable way of working, those addressable through supported extensibility, and those the model genuinely cannot accommodate.',
          'A non-empty third group is information, not failure. For some organisations it points to Private Cloud; for others, adapting those few processes costs far less than the flexibility premium. We leave the comparison written down and reasoned so the decision belongs to you rather than to your advisor.',
        ],
      },
      {
        heading: 'Fit-to-standard and finance configuration',
        body: [
          'Delivery runs through fit-to-standard workshops. Their real value is less in demonstrating what the system does than in making the team confront the question “why do we do this differently?” Differences that exist only through habit get retired there; genuine business requirements get recorded and costed.',
          'On the finance side we configure the chart of accounts, reporting structure, tax setup, bank integration and close processes on the standard template. Statutory localisation requirements are treated as their own workstream and planned from the start rather than discovered during user acceptance testing.',
        ],
      },
      {
        heading: 'Extensibility strategy',
        body: [
          'In Public Cloud the core is not modified; extension happens through supported mechanisms in a separate layer. We decide up front which requirements are met by key-user configuration, which by embedded extensibility, and which justify a separate application on SAP BTP.',
          'Getting this split right early matters, because an extension built in the wrong layer breaks on release upgrades and generates permanent maintenance load, while the same logic placed correctly is simply unaffected.',
        ],
      },
      {
        heading: 'Readiness for the release cycle',
        body: [
          'Public Cloud updates on a fixed cadence and those updates are not optional. The way to convert that from a risk into a routine is to build a repeatable regression test set for critical processes during implementation, and to leave behind a defined procedure for running it when the release reaches the test tenant.',
          'We also build the habit of reading release notes properly. Every release contains a handful of items that touch your business, and seeing them in advance removes most post-upgrade surprises.',
        ],
      },
      {
        heading: 'Cutover and training',
        body: [
          'Data migration, mock runs and reconciliation are held to the same discipline as any on-premise programme; the cloud model does not loosen the controls. Training is delivered around what users actually do each day rather than as a tour of the modules.',
        ],
      },
    ],

    deliverables: [
      'Fit assessment with a reasoned list of processes outside standard scope',
      'Fit-to-standard workshop records and decision log',
      'Configured finance processes and reporting structure',
      'Extensibility strategy with layer-by-layer decisions',
      'Integration design for banking, e-documents and surrounding systems',
      'Regression test set and release upgrade checklist',
      'Migration plan, reconciliation reports and user training',
    ],

    aiRole:
      'We use AI-assisted analysis to compare your current processes against standard scope and to inventory an existing landscape, and to draft the first version of regression test scenarios. We also assess which of SAP’s embedded AI capabilities have a genuine use in your processes, and switch on the ones that earn their place rather than all of them.',

    duration:
      'Fit assessment 2–3 weeks. A single-country standard finance deployment typically runs 3–5 months, with incremental time per additional country.',
    team: 'One senior finance consultant and a solution architect, with integration and migration specialists phased in.',

    faqs: [
      {
        q: 'Will Public Cloud be enough for us?',
        a: 'That can only be answered after comparing your processes against standard scope. The assessment is typically two to three weeks and ends with a clear list: what fits, what is solved through extensibility, and what does not fit. The decision follows from the list.',
      },
      {
        q: 'How are country-specific statutory requirements handled?',
        a: 'Localisation scope expands with each release, and some requirements are met through integration or partner solutions rather than the core. During the assessment we check your specific obligations against current scope one by one and document both the gaps and the route to closing them.',
      },
      {
        q: 'Can we move to Private Cloud later?',
        a: 'Technically yes, but not for free — it means a new implementation and a data migration. That is precisely why the model decision deserves proper time at the beginning; it is far cheaper than relocating afterwards.',
      },
      {
        q: 'Can our existing customisations be carried over?',
        a: 'Classic core modifications cannot be — the model does not permit them. In practice some are now covered by standard functionality, some are rebuilt through supported extensibility, and some turn out not to be needed. The inventory work separates the three.',
      },
      {
        q: 'Will upgrades disrupt operations?',
        a: 'Upgrades arrive in the test tenant first and are applied in planned windows. With a prepared regression set for your critical processes, the pre-upgrade check becomes a few hours of work. That is why we build the set during implementation rather than after the first difficult upgrade.',
      },
    ],

    comparison: {
      forWhom: 'Companies able to adopt standard, wanting fast deployment',
      duration: 'Assessment 2–3 weeks, deployment 3–5 months',
      mainGain: 'Rapid go-live and low operational overhead',
    },
    serviceType: 'SAP Cloud ERP Public Edition implementation',
  },
};
