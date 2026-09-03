import type { Lang } from '@/i18n/routes';

/**
 * ANA SAYFA METİNLERİ
 * =================================================================
 * Kurallar:
 *  • Uydurma rakam, müşteri adı, referans ya da ödül YOK.
 *  • "10+ yıl" dışında sayısal iddia kullanılmaz; o da deneyim
 *    süresidir, ölçülmüş bir sonuç değildir.
 *  • Yetkinlik şeridi nitel ifadelerden oluşur; müşteri logosu alanı
 *    bilinçli olarak yoktur.
 */

export interface HomeContent {
  meta: { title: string; description: string };

  hero: {
    h1: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    /** Defter→ağ imza görselinin alt metni. */
    figureAlt: string;
    /** Kuantum görseli seçildiğindeki alt metin. */
    imageAlt: string;
  };

  /**
   * Yetkinlik şeridi — koyu zemin.
   * Her sütun: monospace kategori etiketi + nitel ifade.
   * `figure` yalnızca ilk sütunda doludur ("10+"); amber ve monospace
   * ile vurgulanan TEK öğe odur. Rakam uydurulmaz.
   */
  strip: {
    items: readonly { kicker: string; figure?: string; text: string }[];
  };

  solutions: { eyebrow: string; h2: string; lead: string; allLink: string };

  why: {
    eyebrow: string;
    h2: string;
    lead: string;
    items: readonly { title: string; body: string }[];
  };

  aiSection: {
    eyebrow: string;
    h2: string;
    lead: string;
    forClients: { title: string; body: string; items: readonly string[] };
    ourPractice: { title: string; body: string; items: readonly string[] };
    stance: string;
  };

  process: {
    eyebrow: string;
    h2: string;
    lead: string;
    steps: readonly {
      no: string;
      title: string;
      what: string;
      deliverable: string;
      duration: string;
    }[];
  };

  scenarios: {
    eyebrow: string;
    h2: string;
    lead: string;
    disclaimer: string;
    tag: string;
    items: readonly {
      sector: string;
      scale: string;
      problem: string;
      approach: string;
      outcome: string;
    }[];
  };

  closing: { text: string; cta: string };
}

export const home: Record<Lang, HomeContent> = {
  tr: {
    meta: {
      title: 'CPeak Consultancy | SAP finans ve bulut mimarisi danışmanlığı',
      description:
        'SAP finans modülleri, S/4HANA dönüşümü ve SAP bulut mimarisi üzerine çalışan bağımsız danışmanlık şirketi. 10+ yıllık saha deneyimi, kıdemli danışman kadrosu.',
    },

    hero: {
      // Başlıklarda nokta ve virgül kullanılmıyor. Virgül iki öbeği
      // ayırdığı için düz silinemezdi; bağlaçla yeniden kuruldu.
      h1: 'SAP Finansallarda 10+ Yıl Deneyim ve SAP Bulut Mimarisi',
      lead:
        'SAP finans modüllerinde derinlemesine uzmanlık, bulut modeli seçiminde tarafsız değerlendirme — aldığınız kararı gerekçesiyle birlikte savunabilmeniz için',
      primaryCta: 'Bize yazın',
      secondaryCta: 'Çözümleri inceleyin',
      figureAlt:
        'Muhasebe defteri çizgilerinin bir düğüm ağına dönüştüğü soyut çizim; verinin yapılandırılmış kayıttan bağlantılı bilgiye geçişini temsil eder.',
      imageAlt:
        'Bir toplantı odasında, finansal gösterge panelleri gösteren büyük bir ekranın önünde oturan danışmanı ve yapay zeka figürlerini betimleyen temsili görsel.',
    },

    strip: {
      items: [
        { kicker: 'Deneyim', figure: '10+', text: 'yıl SAP finans deneyimi' },
        { kicker: 'Uzmanlık', text: 'FI ve CO derinliği' },
        { kicker: 'Tarafsızlık', text: 'Public ve Private Cloud değerlendirmesi' },
        { kicker: 'Ekip', text: 'Kıdemli danışman kadrosu' },
      ],
    },

    solutions: {
      eyebrow: 'Çözümler',
      h2: 'Beş çözüm alanı, tek bir finans bakış açısı',
      lead:
        'Her çalışma, finans ekibinin günlük işine ne olacağı sorusundan başlar. Teknik karar da, mimari karar da bu sorunun cevabına bağlıdır.',
      allLink: 'Çözümleri karşılaştırın',
    },

    why: {
      eyebrow: 'Neden CPeak',
      h2: 'Farkı, projede kimin çalıştığı belirler',
      lead:
        'SAP danışmanlığında sonucu belirleyen şey metodoloji değil, projede fiilen kimin çalıştığıdır.',
      items: [
        {
          title: 'Finans modülünde gerçek derinlik',
          body:
            'FI ve CO bizim için yan yetkinlik değil, ana uzmanlık alanımızdır. Hesap planı tasarımı, maliyet muhasebesi ve kapanış süreci gibi geri dönüşü pahalı kararlarda, konuyu daha önce defalarca yaşamış birinin görüşünü alırsınız.',
        },
        {
          title: 'Bulut modelinde tarafsızlık',
          body:
            'Public Cloud ve Private Cloud arasındaki seçimde belirli bir modeli savunmuyoruz. Süreçlerinizi standart kapsamla karşılaştırır, iki modelin sizin özel durumunuzdaki maliyetini ve kısıtını yan yana koyarız. Kararı siz verirsiniz.',
        },
        {
          title: 'Yapay zeka ile hızlandırılmış teslim',
          body:
            'Analiz, dokümantasyon, test senaryosu üretimi ve migrasyon kontrolü gibi hacimli işlerde yapay zeka kullanıyoruz. Bu, hazırlık fazlarını kısaltıyor ve kıdemli danışmanın zamanını karar gerektiren işlere bırakıyor.',
        },
        {
          title: 'Projede kıdemli danışman çalışır',
          body:
            'Projeye teklifte adı geçen kişiler gelir. Ekip küçük ve kıdemlidir; danışmanın öğrenme süresini size fatura etmeyiz. Kapsam büyüdüğünde ekibi büyütmek yerine işi fazlara böleriz.',
        },
      ],
    },

    aiSection: {
      eyebrow: 'Yapay zeka yaklaşımımız',
      h2: 'Yapay zekayı iki tarafta da kullanıyoruz: sizin süreçlerinizde ve kendi çalışma şeklimizde',
      lead:
        'Yapay zekayı ayrı bir hizmet başlığı olarak değil, hem müşteriye sunduğumuz sistemin hem de kendi çalışma yöntemimizin bir parçası olarak ele alıyoruz.',
      forClients: {
        title: 'Sizin finans süreçlerinizde',
        body:
          'SAP’nin sistem içine yerleşik yapay zeka yetenekleri, ayrı bir ürün satın almadan finans süreçlerinde otomasyon sağlar. Hepsini açmak strateji değildir; hangisinin sizde çalışacak koşula sahip olduğunu ölçer, sırayla devreye alırız.',
        items: [
          'Akıllı mutabakat: banka ve cari kalemlerin geçmiş davranıştan öğrenerek otomatik eşlenmesi',
          'Anomali tespiti: alışılmadık kayıtların kapanıştan önce işaretlenmesi',
          'Tahmine dayalı muhasebe: kesinleşmemiş işlemlerin dönem içinde görünür olması',
          'Joule: doğal dille sorgulama ve gezinme katmanı',
        ],
      },
      ourPractice: {
        title: 'Bizim çalışma şeklimizde',
        body:
          'Projelerin en çok insan-saati tüketen kısmı analiz ve dokümantasyondur. Bu işlerde yapay zeka kullanmamız, proje süresini kısaltıyor ve kıdemli danışmanın zamanını asıl karar gerektiren yerlere ayırmasını sağlıyor.',
        items: [
          'Özelleştirme envanteri ve kod etki analizi',
          'Test senaryolarının ilk taslağının üretilmesi',
          'Veri migrasyonu mutabakat kontrollerinin hazırlanması',
          'Yapılandırma dokümantasyonunun ilk sürümü',
        ],
      },
      stance:
        'Duruşumuz: müşteri verisi üzerinde çalışan her adım, önceden mutabık kalınan sınırlar içinde yürütülür ve finansal kayıt üreten hiçbir karar insan denetiminden geçmeden kesinleşmez.',
    },

    process: {
      eyebrow: 'Çalışma yaklaşımı',
      h2: 'Dört adım; her adımın sonunda elle tutulur bir çıktı',
      lead:
        'Her adımın sonunda ne teslim edileceği baştan bellidir. Bir adım tamamlanmadan bir sonrakine geçilmez.',
      steps: [
        {
          no: '01',
          title: 'Değerlendirme',
          what:
            'Sistemdeki gerçek veriyi okuruz: kullanım oranları, veri kalitesi, özelleştirme envanteri ve süreç süreleri. Anlatılan süreçle işleyen süreç arasındaki farkı çıkarırız.',
          deliverable: 'Teşhis raporu ve önceliklendirilmiş bulgular listesi',
          duration: '2–6 hafta',
        },
        {
          no: '02',
          title: 'Mimari ve yol haritası',
          what:
            'Seçeneklerin maliyetini, süresini ve riskini yan yana koyar, hedef mimariyi tasarlarız. Kararı siz verirsiniz; gerekçe yazılı kalır.',
          deliverable: 'Hedef mimari dokümanı ve fazlı yol haritası',
          duration: '3–6 hafta',
        },
        {
          no: '03',
          title: 'Uygulama',
          what:
            'Yapılandırma, veri migrasyonu, entegrasyon ve test fazlarını yürütürüz. Deneme geçişleri ve mutabakat raporları rutin haline gelir.',
          deliverable: 'Çalışan sistem, test kayıtları ve devreye alma planı',
          duration: 'Kapsama göre 3–14 ay',
        },
        {
          no: '04',
          title: 'Hypercare ve sürekli iyileştirme',
          what:
            'Geçiş sonrası ilk kapanışı ekiple birlikte yürütürüz. Açılan kayıtlar sınıflandırılır, tekrar edenler kalıcı olarak çözülür.',
          deliverable: 'Hypercare kapanış raporu ve iyileştirme listesi',
          duration: '4–12 hafta',
        },
      ],
    },

    scenarios: {
      eyebrow: 'Tipik proje senaryoları',
      h2: 'Çalışma pratikte nasıl ilerliyor?',
      lead:
        'Aşağıdaki üç örnek, sık karşılaştığımız durumları ve izlediğimiz yaklaşımı gösterir.',
      disclaimer:
        'Bunlar gerçek müşteri vakası değildir. Müşteri adı, rakam ya da sonuç iddiası içermezler; hizmetin nasıl işlediğini anlatmak için hazırlanmış temsili örneklerdir.',
      tag: 'Temsili senaryo',
      items: [
        {
          sector: 'Üretim',
          scale: 'Çok şirketli grup, birden fazla ülke',
          problem:
            'ECC üzerinde çalışan grup, bakım takvimi nedeniyle S/4HANA geçişi planlamak zorunda. Yıllar içinde biriken özelleştirmelerin ne kadarının kullanıldığı bilinmiyor ve her danışman farklı bir geçiş yöntemi öneriyor.',
          approach:
            'Önce kullanım verisine dayalı özelleştirme envanteri çıkarılır. Üç geçiş yöntemi grubun özel durumu için maliyet, süre ve risk açısından karşılaştırılır. Şirket kodları dalgalar halinde planlanır, ilk dalga en sade iştirakle başlar.',
          outcome:
            'Yönetim kuruluna sunulabilecek gerekçeli bir yöntem kararı ve taşınmayacak geliştirmelerin elenmesiyle küçülmüş bir dönüşüm kapsamı.',
        },
        {
          sector: 'Teknoloji / hizmet',
          scale: 'Hızlı büyüyen orta ölçekli şirket',
          problem:
            'Şirket hızla büyüyor, finans süreçleri hâlâ elektronik tablolara dayanıyor. Standart bir ERP kurulumu isteniyor ancak Public Cloud’un yeterli olup olmayacağı bilinmiyor.',
          approach:
            'Süreçler standart kapsamla madde madde karşılaştırılır; standart dışına düşen noktalar üç gruba ayrılır. Fit-to-standard oturumlarıyla alışkanlıktan kaynaklanan farklar elenir, gerçek gereksinimler için genişletme katmanı kararlaştırılır.',
          outcome:
            'Standart üzerine kurulmuş, çeyreklik güncellemelere hazır bir finans yapısı ve büyüme sırasında tekrarlanabilir bir kurulum şablonu.',
        },
        {
          sector: 'Perakende',
          scale: 'Çok lokasyonlu, yüksek işlem hacmi',
          problem:
            'Ay sonu kapanışı öngörülemez biçimde uzuyor. Banka ve cari hesap mutabakatı büyük ölçüde elle yapılıyor ve eşleşmeyen kalemler birkaç kişinin bilgisine bağlı.',
          approach:
            'Kapanış adımları süre ölçümüyle çıkarılır, bekleme yaratan bağımlılıklar tespit edilir. Mutabakat otomasyonu için eşik değerleri gerçek veriyle kalibre edilir; istisna inceleme süreci ve insan denetimi kuralları yazılı hale getirilir.',
          outcome:
            'Adım bazında ölçülebilir ve öngörülebilir bir kapanış takvimi; ekibin işi eşleştirmekten istisna incelemeye kayar.',
        },
      ],
    },

    closing: {
      text: 'Projenizi anlatın, bir iş günü içinde dönüş yapalım.',
      cta: 'Bize yazın',
    },
  },

  en: {
    meta: {
      title: 'CPeak Consultancy | SAP finance and cloud architecture advisory',
      description:
        'Independent consultancy for SAP finance modules, S/4HANA transformation and SAP cloud architecture. 10+ years of delivery, senior consultants only.',
    },

    hero: {
      // Aynı kural: nokta iki cümleyi ayırdığı için bağlaçla birleştirildi.
      h1: '10+ years of SAP finance experience and SAP cloud architecture',
      lead:
        'Deep expertise across the SAP finance modules and a genuinely neutral read on the cloud models — so the decision you take is one you can defend with its reasoning',
      primaryCta: 'Get in touch',
      secondaryCta: 'Explore solutions',
      figureAlt:
        'Abstract drawing in which ruled ledger lines resolve into a network of connected nodes, representing the shift from structured records to connected information.',
      imageAlt:
        'Illustrative image of a consultant seated before a large screen of financial dashboards in a boardroom, alongside AI figures.',
    },

    strip: {
      items: [
        { kicker: 'Experience', figure: '10+', text: 'years in SAP finance' },
        { kicker: 'Expertise', text: 'Depth across FI and CO' },
        { kicker: 'Independence', text: 'Public vs Private Cloud, vendor-neutral' },
        { kicker: 'Team', text: 'Senior consultants only' },
      ],
    },

    solutions: {
      eyebrow: 'Solutions',
      h2: 'Five areas, one finance perspective',
      lead:
        'Every engagement starts from the same question: what happens to the finance team’s working week. Technical and architectural decisions follow from the answer.',
      allLink: 'Compare the solutions',
    },

    why: {
      eyebrow: 'Why CPeak',
      h2: 'The difference is who actually does the work',
      lead:
        'In SAP consulting the outcome is decided less by methodology than by who actually works on the project.',
      items: [
        {
          title: 'Real depth in the finance modules',
          body:
            'FI and CO are our core discipline, not a capability brought along beside something else. On decisions that are expensive to reverse — enterprise structure, costing design, the close calendar — you get the view of someone who has lived the consequences several times.',
        },
        {
          title: 'Neutral on the cloud model',
          body:
            'We do not advocate for Public or Private Cloud. We compare your processes against standard scope and put the cost and the constraint of both models side by side for your specific situation. The decision stays yours.',
        },
        {
          title: 'Delivery accelerated by AI',
          body:
            'We use AI for the volume work: analysis, documentation, test scenario generation and migration reconciliation. It shortens the preparation phases and leaves senior time for the parts that require judgement.',
        },
        {
          title: 'Senior consultants on every engagement',
          body:
            'The people named in the proposal are the people who turn up. The team is small and senior; you are not charged for a consultant’s learning curve. When scope grows we phase the work rather than inflate the team.',
        },
      ],
    },

    aiSection: {
      eyebrow: 'Our approach to AI',
      h2: 'We use AI on both sides: in your processes and in how we work',
      lead:
        'We treat AI not as a separate service line but as part of both the system we deliver and the method we use to deliver it.',
      forClients: {
        title: 'In your finance processes',
        body:
          'SAP’s AI capabilities are embedded in the system rather than bought separately. Enabling all of them is not a strategy; we assess which ones you have the data volume and process discipline to support, and sequence them.',
        items: [
          'Intelligent matching: bank and open items cleared automatically from learned clearing behaviour',
          'Anomaly detection: unusual postings flagged before the close rather than after',
          'Predictive accounting: the effect of not-yet-final transactions visible during the period',
          'Joule: a natural-language layer for querying and navigation',
        ],
      },
      ourPractice: {
        title: 'In our own delivery',
        body:
          'Analysis and documentation consume more person-hours than any other part of a programme. Using AI there compresses the timeline and lets senior consultants spend their time where judgement is actually required.',
        items: [
          'Custom code inventory and impact analysis',
          'First drafts of test scenarios',
          'Preparation of migration reconciliation checks',
          'Initial versions of configuration documentation',
        ],
      },
      stance:
        'Our position: every step touching client data runs inside boundaries agreed in advance, and no decision producing a financial posting is finalised without human review.',
    },

    process: {
      eyebrow: 'How we work',
      h2: 'Four stages, each ending in something tangible',
      lead:
        'What gets delivered at the end of each stage is defined before it starts, and no stage begins before the previous one has closed.',
      steps: [
        {
          no: '01',
          title: 'Assessment',
          what:
            'We read the actual system: usage statistics, data quality, custom code inventory and process durations. The gap between the process as described and the process as executed is where the findings come from.',
          deliverable: 'Diagnostic report with prioritised findings',
          duration: '2–6 weeks',
        },
        {
          no: '02',
          title: 'Architecture and roadmap',
          what:
            'We place the options side by side with cost, duration and risk, and design the target architecture. You take the decision; the reasoning stays on paper.',
          deliverable: 'Target architecture document and phased roadmap',
          duration: '3–6 weeks',
        },
        {
          no: '03',
          title: 'Delivery',
          what:
            'Configuration, data migration, integration and testing. Mock migrations and reconciliation reporting become routine rather than milestones.',
          deliverable: 'Working system, test records and cutover plan',
          duration: '3–14 months by scope',
        },
        {
          no: '04',
          title: 'Hypercare and continuous improvement',
          what:
            'We run the first post-go-live close alongside your team. Tickets are classified, and the recurring ones are fixed at the source rather than reprocessed monthly.',
          deliverable: 'Hypercare closing report and improvement backlog',
          duration: '4–12 weeks',
        },
      ],
    },

    scenarios: {
      eyebrow: 'Typical engagements',
      h2: 'What the work looks like in practice',
      lead:
        'Three situations we meet regularly, and the approach we take to each.',
      disclaimer:
        'These are not real client cases. They contain no client names, figures or outcome claims — they are illustrative examples written to show how the engagement works.',
      tag: 'Illustrative scenario',
      items: [
        {
          sector: 'Manufacturing',
          scale: 'Multi-entity group, several countries',
          problem:
            'A group running ECC needs an S/4HANA plan before maintenance deadlines force one. Nobody knows how much of the accumulated custom code is still executed, and every advisor recommends a different conversion route.',
          approach:
            'Start with a usage-based custom code inventory. Compare all three conversion routes against the group’s specific position on cost, duration and risk. Plan company codes in waves, with the simplest entity first to establish the template.',
          outcome:
            'A reasoned approach decision that survives board scrutiny, and a smaller conversion scope once dead development is retired rather than carried.',
        },
        {
          sector: 'Technology / services',
          scale: 'Fast-growing mid-market company',
          problem:
            'The company is scaling quickly while finance still runs on spreadsheets. A standard ERP deployment is wanted, but whether Public Cloud will be sufficient is unknown.',
          approach:
            'Compare processes against standard scope item by item and sort the gaps into three groups. Use fit-to-standard workshops to retire differences that exist only through habit, and decide the extensibility layer for the requirements that remain.',
          outcome:
            'A finance setup built on standard and ready for the release cycle, plus a deployment template that repeats as the company enters new markets.',
        },
        {
          sector: 'Retail',
          scale: 'Multi-site, high transaction volume',
          problem:
            'The month-end close runs long and unpredictably. Bank and customer account reconciliation is largely manual, and unmatched items depend on the knowledge of two or three people.',
          approach:
            'Measure the close step by step and identify the dependencies creating wait time. Calibrate matching thresholds against real data, and put the exception review process and human oversight rules in writing before go-live.',
          outcome:
            'A close calendar that is measurable and predictable step by step, with the team’s work moving from matching items to reviewing exceptions.',
        },
      ],
    },

    closing: {
      text: 'Tell us about your project and we will come back within one business day.',
      cta: 'Get in touch',
    },
  },
};
