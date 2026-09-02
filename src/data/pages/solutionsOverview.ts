import type { Lang } from '@/i18n/routes';

/**
 * /cozumler — /en/solutions genel bakış sayfası.
 * Arama trafiği açısından sitenin en değerli varlığı; özellikle
 * Public Cloud ile Private Cloud karşılaştırma tablosu.
 */

export interface OverviewContent {
  meta: { title: string; description: string };
  hero: { h1: string; lead: string };

  compare: {
    h2: string;
    lead: string;
    caption: string;
    headers: { solution: string; forWhom: string; duration: string; mainGain: string };
  };

  cloud: {
    h2: string;
    lead: string;
    intro: readonly string[];
    caption: string;
    headers: { criterion: string; publicCloud: string; privateCloud: string };
    rows: readonly { criterion: string; publicCloud: string; privateCloud: string }[];
    /** Tablo sonrası karar rehberi. */
    guidance: {
      h3: string;
      publicTitle: string;
      publicItems: readonly string[];
      privateTitle: string;
      privateItems: readonly string[];
      note: string;
    };
  };

  howToChoose: { h2: string; body: readonly string[] };
  closing: string;
}

export const solutionsOverview: Record<Lang, OverviewContent> = {
  tr: {
    meta: {
      title: 'Çözümler | SAP finansallar, S/4HANA ve bulut danışmanlığı — CPeak',
      description:
        'Beş çözüm alanının karşılaştırması ve SAP Public Cloud ile Private Cloud farkı: maliyet modeli, özelleştirme esnekliği ve güncelleme döngüsü.',
    },
    hero: {
      h1: 'Çözümler',
      lead:
        'Beş çalışma alanımızı, hangisinin kime uygun olduğunu ve iki bulut modeli arasındaki farkı aşağıda karşılaştırmalı olarak bulacaksınız. Hangi başlıkta olduğunuzdan emin değilseniz, karşılaştırma tablosu genellikle yeterli bir başlangıç noktası verir.',
    },

    compare: {
      h2: 'Beş çözüm alanı karşılaştırması',
      lead:
        'Aynı şirket birden fazla başlıkta olabilir. Bu tablo, hangi çalışmayla başlanmasının daha mantıklı olduğunu göstermek için hazırlanmıştır.',
      caption: 'Çözüm alanlarının kapsam, süre ve ana kazanım karşılaştırması',
      headers: {
        solution: 'Çözüm',
        forWhom: 'Kime uygun',
        duration: 'Tipik süre',
        mainGain: 'Ana kazanım',
      },
    },

    cloud: {
      h2: 'SAP Public Cloud ve Private Cloud karşılaştırması',
      lead:
        'Bu iki model arasındaki seçim, SAP dönüşümünde geri dönüşü en pahalı kararlardan biridir. Aşağıdaki tablo farkı somut kriterler üzerinden gösterir.',
      intro: [
        'İki modeli birbirinin gelişmiş ya da ucuz sürümü olarak düşünmek yaygın bir hatadır. İkisi farklı takaslar sunar: Public Cloud standarda uyum karşılığında hız ve düşük işletme yükü verir, Private Cloud ise esneklik karşılığında daha fazla sorumluluk ve daha uzun bir kurulum süresi ister.',
        'Kararın doğru zamanı sözleşme imzalanmadan öncedir. Süreçler standart kapsamla karşılaştırılmadan verilen model kararı, projenin ortasında en pahalı biçimde geri döner.',
      ],
      caption: 'SAP Cloud ERP Public Edition ile Private Edition arasındaki temel farklar',
      headers: {
        criterion: 'Kriter',
        publicCloud: 'Public Cloud',
        privateCloud: 'Private Cloud',
      },
      rows: [
        {
          criterion: 'Maliyet modeli',
          publicCloud:
            'Abonelik esaslı, kullanıcı ve kapsam bazında öngörülebilir. Altyapı, işletim ve güncelleme maliyeti pakete dahildir; ayrı bir işletim bütçesi kurmanız gerekmez.',
          privateCloud:
            'Abonelik esaslıdır ancak boyutlandırmaya bağlı olarak değişkenlik gösterir. Özelleştirmelerin bakımı ve güncelleme testleri kendi bütçenizde kalır; toplam sahip olma maliyeti daha yüksektir.',
        },
        {
          criterion: 'Özelleştirme esnekliği',
          publicCloud:
            'Çekirdek sistem değiştirilemez. Genişletme yalnızca izin verilen yöntemlerle ve ayrı bir katmanda yapılır. Klasik ABAP geliştirme yapılamaz.',
          privateCloud:
            'Çekirdeğe müdahale dahil geniş esneklik. Mevcut ABAP geliştirmeleri taşınabilir. Esneklik, karşılığında güncelleme başına test yükü getirir.',
        },
        {
          criterion: 'Güncelleme döngüsü',
          publicCloud:
            'Düzenli aralıklarla ve otomatik. Güncellemeler isteğe bağlı değildir; erteleyemezsiniz. Kritik süreçler için hazır bir regresyon test seti tutmak gerekir.',
          privateCloud:
            'Zamanlamayı büyük ölçüde siz belirlersiniz. Sürüm yükseltmesi ayrı bir proje olarak planlanır ve kendi test döngüsünü gerektirir.',
        },
        {
          criterion: 'Kurulum süresi',
          publicCloud:
            'Standart şablon üzerinden ilerlendiği için kısadır. Tek ülkeli finans kurulumu tipik olarak 3–5 ay.',
          privateCloud:
            'Kapsam ve taşınan mirasa bağlı olarak uzundur. Tipik olarak 7–14 ay.',
        },
        {
          criterion: 'Süreç yaklaşımı',
          publicCloud:
            'Fit-to-standard: süreç sisteme uyarlanır. Bu, süreç standardizasyonu isteyen şirketler için bir avantajdır.',
          privateCloud:
            'Fit-to-gap: sistem sürece uyarlanabilir. Sektöre özgü zorunlu süreçleri olan şirketler için gereklidir.',
        },
        {
          criterion: 'Yerelleştirme ve mevzuat',
          publicCloud:
            'SAP tarafından sağlanan yerelleştirme kapsamıyla sınırlıdır ve sürümden sürüme genişler. Özel yükümlülüklerin kapsamda olup olmadığı baştan kontrol edilmelidir.',
          privateCloud:
            'Kapsam dışı yasal gereksinimler kendi geliştirmenizle karşılanabilir. Düzenlenmiş sektörler için belirleyici olabilir.',
        },
        {
          criterion: 'Veri ve altyapı kontrolü',
          publicCloud:
            'Paylaşılan altyapı; veri yerleşimi SAP’nin sunduğu bölgelerle sınırlıdır. Altyapı düzeyinde müdahale imkanı yoktur.',
          privateCloud:
            'Ayrılmış ortam; veri yerleşimi ve ağ mimarisi üzerinde daha fazla kontrol. Şirket içi sistemlerle bağlantı kurmak daha esnektir.',
        },
        {
          criterion: 'İç BT yükü',
          publicCloud:
            'Düşük. Altyapı ve temel işletim devredilir; ekibin işi süreç sahipliği ve regresyon testine odaklanır.',
          privateCloud:
            'Orta. Altyapı devredilir ancak uygulama yönetimi, özelleştirme bakımı ve sürüm yükseltme planlaması sizde kalır.',
        },
        {
          criterion: 'Tipik uygunluk',
          publicCloud:
            'Süreçleri standarda yakın, hızlı büyüyen orta ölçekli şirketler; grup şablonuyla yayılan iştirakler.',
          privateCloud:
            'Ağır özelleştirme ve entegrasyon mirası taşıyan, sektöre özgü süreçleri olan büyük ölçekli şirketler.',
        },
      ],
      guidance: {
        h3: 'Hangisi size uygun olabilir?',
        publicTitle: 'Şu durumlarda Public Cloud’u değerlendirin:',
        publicItems: [
          'Süreçlerinizi standarda uydurmaya istekliyseniz ve bunu bir kayıp olarak görmüyorsanız',
          'İç BT kadronuz sınırlıysa ve altyapı yükünü taşımak istemiyorsanız',
          'Hızlı devreye alma önceliğinizse',
          'Birden fazla iştirakte tekrarlanabilir bir şablon kurmak istiyorsanız',
        ],
        privateTitle: 'Şu durumlarda Private Cloud’u değerlendirin:',
        privateItems: [
          'Sektörünüze özgü, standart kapsamda karşılığı olmayan zorunlu süreçleriniz varsa',
          'Yıllar içinde biriken ve tek seferde bırakılamayacak entegrasyon mirasınız varsa',
          'Düzenleyici nedenlerle veri yerleşimi ve altyapı üzerinde daha fazla kontrol gerekiyorsa',
          'Sürüm yükseltme zamanlamasını kendiniz belirlemeniz gerekiyorsa',
        ],
        note:
          'Bu listeler bir karar değil, bir başlangıç noktasıdır. Gerçek karar, süreçlerinizin standart kapsamla madde madde karşılaştırılmasından sonra verilir; bu karşılaştırma tipik olarak iki üç haftalık bir çalışmadır.',
      },
    },

    howToChoose: {
      h2: 'Nereden başlamalı',
      body: [
        'Hangi çözüm başlığında olduğunuzdan emin değilseniz, cevap genellikle mevcut durumunuza bakılarak bulunur. ECC üzerindeyseniz ve bakım takvimi gündeminizdeyse, başlangıç noktası S/4HANA hazırlık analizidir. Halihazırda S/4HANA’daysanız ve sorun raporlama tutarlılığı ya da kapanış süresiyse, finans modülü çalışması daha doğrudur.',
        'Henüz SAP kullanmıyor ve kurulum planlıyorsanız, ilk soru bulut modeli seçimidir; bu karar diğer her şeyin çerçevesini belirler. Ekibinizin zamanı tekrar eden manuel işlere gidiyorsa, süreç otomasyonu değerlendirmesi tek başına ve kısa sürede sonuç veren bir başlangıçtır.',
        'Emin olamadığınız durumda en düşük maliyetli adım bir değerlendirme fazıdır. İki ila altı haftalık bu çalışma, hangi işin önce yapılması gerektiğini veriyle ortaya koyar ve devam kararını buna dayandırmanızı sağlar.',
      ],
    },

    closing: 'Hangi başlıkta olduğunuzdan emin değilseniz de yazın — doğru soruyu birlikte bulalım.',
  },

  en: {
    meta: {
      title: 'Solutions | SAP financials, S/4HANA and cloud consulting — CPeak',
      description:
        'A comparison of our five service areas, plus a detailed analysis of SAP Public Cloud versus Private Cloud across cost model, extensibility, upgrade cadence and fit.',
    },
    hero: {
      h1: 'Solutions',
      lead:
        'Below you will find our five service areas compared, who each one suits, and a direct comparison of the two cloud models. If you are not sure which category you are in, the comparison table is usually a sufficient starting point.',
    },

    compare: {
      h2: 'Comparing the five service areas',
      lead:
        'The same organisation often sits in more than one category. This table exists to show which piece of work makes more sense to start with.',
      caption: 'Service areas compared by fit, duration and primary benefit',
      headers: {
        solution: 'Solution',
        forWhom: 'Who it suits',
        duration: 'Typical duration',
        mainGain: 'Primary benefit',
      },
    },

    cloud: {
      h2: 'SAP Public Cloud versus Private Cloud',
      lead:
        'The choice between these two models is among the most expensive decisions to reverse in an SAP transformation. The table below sets out the difference on concrete criteria.',
      intro: [
        'Treating one as the advanced version and the other as the cheap version is the most common misreading. They offer different trades: Public Cloud gives speed and low operational overhead in exchange for adopting the standard, while Private Cloud gives flexibility in exchange for more responsibility and a longer implementation.',
        'The right moment to decide is before signing. A model chosen without comparing your processes against standard scope tends to resurface in the middle of the project, at the highest possible cost.',
      ],
      caption: 'Key differences between SAP Cloud ERP Public Edition and Private Edition',
      headers: {
        criterion: 'Criterion',
        publicCloud: 'Public Cloud',
        privateCloud: 'Private Cloud',
      },
      rows: [
        {
          criterion: 'Cost model',
          publicCloud:
            'Subscription based and predictable by user and scope. Infrastructure, operations and upgrades are included, so no separate run budget is required.',
          privateCloud:
            'Subscription based but varies with sizing. Maintenance of customisations and upgrade testing stay in your budget, giving a higher total cost of ownership.',
        },
        {
          criterion: 'Extensibility',
          publicCloud:
            'The core cannot be modified. Extension happens only through supported mechanisms in a separate layer. Classic ABAP development is not available.',
          privateCloud:
            'Broad flexibility including core modification. Existing ABAP developments can be carried across. That flexibility costs testing effort on every upgrade.',
        },
        {
          criterion: 'Upgrade cadence',
          publicCloud:
            'Regular and automatic. Upgrades are not optional and cannot be deferred. A maintained regression test set for critical processes is effectively mandatory.',
          privateCloud:
            'You largely control the timing. A release upgrade is planned as its own project with its own test cycle.',
        },
        {
          criterion: 'Implementation time',
          publicCloud:
            'Short, because delivery runs on a standard template. A single-country finance deployment typically takes 3–5 months.',
          privateCloud:
            'Longer, depending on scope and inherited landscape. Typically 7–14 months.',
        },
        {
          criterion: 'Process approach',
          publicCloud:
            'Fit-to-standard: the process adapts to the system. This is an advantage for organisations that want standardisation to be enforced.',
          privateCloud:
            'Fit-to-gap: the system can adapt to the process. Necessary where industry-specific processes are genuinely non-negotiable.',
        },
        {
          criterion: 'Localisation and regulation',
          publicCloud:
            'Limited to SAP-provided localisation scope, which expands with each release. Whether your specific obligations are covered must be verified up front.',
          privateCloud:
            'Requirements outside standard scope can be met through your own development. This can be the deciding factor in regulated industries.',
        },
        {
          criterion: 'Data and infrastructure control',
          publicCloud:
            'Shared infrastructure; data residency limited to the regions SAP offers. No intervention at infrastructure level.',
          privateCloud:
            'Dedicated environment with more control over data residency and network architecture. Connectivity back to on-premises systems is more flexible.',
        },
        {
          criterion: 'Internal IT load',
          publicCloud:
            'Low. Infrastructure and base operations are handed over; your team focuses on process ownership and regression testing.',
          privateCloud:
            'Moderate. Infrastructure is handed over, but application management, customisation maintenance and upgrade planning remain yours.',
        },
        {
          criterion: 'Typical fit',
          publicCloud:
            'Mid-market organisations close to standard processes, and subsidiaries rolled out on a group template.',
          privateCloud:
            'Larger organisations carrying substantial customisation and integration history with industry-specific processes.',
        },
      ],
      guidance: {
        h3: 'Which one is likely to fit',
        publicTitle: 'Look at Public Cloud if:',
        publicItems: [
          'You are willing to adapt processes to standard and do not experience that as a loss',
          'Your internal IT function is small, and you do not want to carry infrastructure',
          'Speed of deployment is a genuine priority',
          'You need a repeatable template across multiple subsidiaries',
        ],
        privateTitle: 'Look at Private Cloud if:',
        privateItems: [
          'You have industry-specific processes with no equivalent in standard scope',
          'You carry integration history that cannot be abandoned in a single step',
          'Regulation requires more control over data residency and infrastructure',
          'You need to control the timing of release upgrades yourself',
        ],
        note:
          'These lists are a starting point rather than a decision. The actual decision follows a line-by-line comparison of your processes against standard scope — typically two to three weeks of work.',
      },
    },

    howToChoose: {
      h2: 'Where to start',
      body: [
        'If you are unsure which category applies, the answer usually comes from where you are today. On ECC with maintenance deadlines on the agenda, the starting point is an S/4HANA readiness assessment. Already on S/4HANA with reporting consistency or close duration as the pain, the finance module work is the better entry.',
        'Not yet on SAP and planning an implementation? The first question is the cloud model, because that decision frames everything else. If your team’s hours are going into repetitive manual work, a process automation assessment is a short, self-contained starting point that produces a result on its own.',
        'When in doubt, the lowest-cost step is an assessment phase. Two to six weeks of work establishes with evidence which piece of work should come first, and lets you base the continuation decision on that rather than on a proposal.',
      ],
    },

    closing:
      'If none of the categories feels like an obvious match, write anyway — working out the right question is part of the first conversation.',
  },
};
