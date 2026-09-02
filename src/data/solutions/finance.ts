import type { LocalizedSolution } from '../types';

/**
 * SAP Finans Modülleri (FI, CO ve ilgili finansal süreçler)
 * İngilizce metin çeviri değildir; çokuluslu alıcının gündemine
 * (grup konsolidasyonu, çoklu GAAP, shared service) göre yazılmıştır.
 */
export const finance: LocalizedSolution = {
  tr: {
    navTitle: 'SAP Finans Modülleri',
    navDesc: 'FI, CO ve uçtan uca finansal süreç tasarımı',
    cardDesc:
      'Genel muhasebe, borç/alacak, sabit kıymet ve maliyet muhasebesini tek bir tutarlı süreç mimarisinde kurar ya da yeniden düzenleriz.',

    title: 'SAP finans modülleri: FI ve CO derinliği',
    metaTitle: 'SAP Finans Modülleri Danışmanlığı (FI & CO) | CPeak Consultancy',
    metaDescription:
      'SAP FI ve CO modüllerinde süreç tasarımı, hesap planı yapılandırması, maliyet muhasebesi ve ay sonu kapanış iyileştirmesi. 10+ yıllık saha deneyimi.',

    summary:
      'Finans modülü, ERP’nin en az affeden alanıdır: hesap planında verilen bir karar üç yıl sonra raporlamayı kilitler. Biz FI ve CO tarafını, günlük işleyişin ve yasal raporlamanın gerçek gereksinimlerinden geriye doğru kurgularız.',

    whoFor: [
      'Hesap planı ve maliyet yapısı zamanla dağılmış, raporlarının doğruluğundan emin olamayan finans direktörleri',
      'Yeni SAP kuran ya da mevcut kurulumunu baştan düzenlemek isteyen orta ve büyük ölçekli şirketler',
      'Birden fazla şirket kodunu tek bir raporlama mantığında toplamak isteyen grup şirketleri',
      'Ay sonu kapanışı öngörülemez biçimde uzayan ve nedenini bulamayan muhasebe ekipleri',
    ],

    challenges: [
      'Ay sonu kapanışı her ay farklı sürüyor; gecikmenin nerede oluştuğu ölçülemiyor.',
      'Aynı bilgi FI ve CO tarafında farklı çıkıyor; mutabakat elle Excel’de yapılıyor.',
      'Hesap planı yıllar içinde şişmiş; kullanılmayan yüzlerce hesap raporları okunmaz hale getirmiş.',
      'Maliyet merkezi ve iç sipariş yapısı organizasyonu artık yansıtmıyor; dağıtım anahtarları kimsenin açıklayamadığı bir mirasa dönüşmüş.',
      'Yasal raporlama ile yönetim raporlaması birbirini tutmuyor; ikisi ayrı ayrı hazırlanıyor.',
    ],

    whatWeDo: [
      {
        heading: 'Mevcut yapının teşhisi',
        body: [
          'İşe süreç haritası çıkarmakla değil, sistemdeki gerçek veriyi okumakla başlarız. Hesap planındaki hangi hesapların son on iki ayda gerçekten hareket gördüğünü, hangi maliyet merkezlerine kayıt düştüğünü, hangi belge türlerinin manuel açıldığını çıkarırız. Bu, toplantı odasında anlatılan süreçle sistemde işleyen sürecin nerede ayrıştığını gösterir — ve sorun neredeyse her zaman bu ayrışmadan doğar.',
          'Teşhis çıktısı bir sunum değil, üzerinde karar verilebilir bir listedir: hangi yapı korunacak, hangisi sadeleşecek, hangisi baştan kurulacak ve her birinin maliyeti ne.',
        ],
      },
      {
        heading: 'Hesap planı ve organizasyon yapısı',
        body: [
          'Hesap planı, ERP’de geri dönüşü en pahalı karardır. Şirket kodu, iş alanı, kâr merkezi ve segment yapısını; bugünün yasal raporlama yükümlülüğüne değil, önümüzdeki beş yılın muhtemel şirket satın alma, bölünme ve yeni ülke senaryolarına dayanıklı olacak şekilde tasarlarız.',
          'S/4HANA’da Universal Journal (ACDOCA) ile FI ve CO tek bir tabloda birleştiği için, klasik ECC alışkanlıklarıyla kurulmuş yapılar burada avantajını kaybeder. Mutabakat gerektiren eski tasarımları, yapısal olarak mutabakat gerektirmeyen bir kurguyla değiştiririz.',
        ],
      },
      {
        heading: 'Maliyet ve kârlılık muhasebesi',
        body: [
          'Maliyet merkezi hiyerarşisini, iç sipariş kullanımını ve dağıtım/tahsis döngülerini organizasyonun bugünkü haline göre yeniden kurarız. Kârlılık analizinde (CO-PA) hangi karakteristiklerin gerçekten karar desteklediğini, hangilerinin yalnızca veri hacmi yarattığını ayırırız; çoğu kurulumda ikinci grup daha kalabalıktır.',
          'Ürün maliyetlendirmesi çalışan üretim şirketlerinde standart maliyet, sapma analizi ve stok değerleme akışını uçtan uca ele alırız; sapmaların hangi aşamada ve neden oluştuğunun izlenebilir olması, çoğu şirkette maliyet doğruluğundan daha kıymetlidir.',
        ],
      },
      {
        heading: 'Kapanış sürecinin yeniden tasarımı',
        body: [
          'Kapanışı hızlandırmanın yolu ekibi hızlandırmak değil, sıralı bekleyen adımları paralel hale getirmek ve manuel mutabakatları ortadan kaldırmaktır. Kapanış takvimini adım adım süre ölçümüyle çıkarır, bekleme yaratan bağımlılıkları tespit eder ve otomatikleştirilebilir adımları ayırırız.',
          'Banka mutabakatı, cari hesap mutabakatı, dönemsel tahakkuklar ve şirketler arası eliminasyon gibi tekrar eden işler tipik olarak en büyük kazanç alanlarıdır. Burada hedef, kapanışın kısalması kadar öngörülebilir hale gelmesidir: her ay aynı günde bitmeyen bir kapanış, kısa da olsa planlanamaz.',
        ],
      },
      {
        heading: 'Devreye alma ve ekibin devralması',
        body: [
          'Kurulumu yaparken şirketin kendi ekibini süreç sahibi haline getiririz. Test senaryolarını birlikte yazar, kapanışı birlikte çalıştırır ve dokümantasyonu kullanılacak biçimde — 200 sayfalık bir dosya olarak değil, adım adım işletilebilir bir el kitabı olarak — bırakırız. Danışmanın çıktığı gün süreç duruyorsa, iş tamamlanmamıştır.',
        ],
      },
    ],

    deliverables: [
      'Mevcut durum teşhis raporu ve önceliklendirilmiş bulgular listesi',
      'Hedef hesap planı ve organizasyon yapısı tasarım dokümanı',
      'Maliyet merkezi / kâr merkezi hiyerarşisi ve dağıtım mantığı',
      'Yapılandırma (customizing) dokümantasyonu',
      'Kapanış takvimi ve adım bazında sorumluluk matrisi',
      'Test senaryoları ve test sonuç kayıtları',
      'Anahtar kullanıcı eğitimi ve işletme el kitabı',
    ],

    aiRole:
      'Teşhis aşamasında hesap hareketlerini ve belge akışlarını analiz ederken, elle günlerce süren desen çıkarma işini yapay zeka destekli analizle saatlere indiriyoruz. Test senaryolarının ilk taslağını ve yapılandırma dokümantasyonunu da bu şekilde üretiyoruz. Üretilen her çıktı, teslim edilmeden önce kıdemli bir danışman tarafından kontrol edilir.',

    duration: 'Teşhis 3–4 hafta; kapsamlı yeniden yapılandırma tipik olarak 4–7 ay.',
    team: 'Bir kıdemli FI/CO danışmanı sürekli, bir çözüm mimarı kısmi zamanlı; ihtiyaç halinde veri migrasyonu ve raporlama uzmanı.',

    faqs: [
      {
        q: 'Hesap planımızı değiştirmeden iyileştirme yapabilir misiniz?',
        a: 'Çoğu durumda evet. Kapanış süresi, mutabakat yükü ve raporlama tutarlılığındaki kazanımların önemli bir kısmı hesap planına dokunmadan elde edilebilir. Hesap planı değişikliği ancak yapının raporlamayı gerçekten kilitlediği durumlarda önerilir ve o zaman da ayrı bir proje olarak ele alınması gerekir.',
      },
      {
        q: 'ECC üzerindeyiz. Bu çalışma S/4HANA’ya geçince boşa mı gider?',
        a: 'Hayır — doğru sırayla yapılırsa geçişi kolaylaştırır. Hesap planı sadeleştirmesi, kullanılmayan nesnelerin ayıklanması ve süreç standardizasyonu, S/4HANA dönüşümünde zaten yapılması gereken işlerdir. Bunları geçişten önce yapmak, dönüşüm kapsamını ve riskini küçültür.',
      },
      {
        q: 'Ay sonu kapanışını ne kadar kısaltabilirsiniz?',
        a: 'Gerçekçi bir aralık vermeden önce mevcut kapanışınızı adım bazında ölçmemiz gerekir; çünkü kazanç, sürenin nerede harcandığına göre tamamen değişir. Manuel mutabakatın ağırlıklı olduğu kurulumlarda kayda değer bir kısalma olağandır, ancak size ölçmeden bir rakam söylemeyiz.',
      },
      {
        q: 'Kendi danışmanlarımız var, sadece belirli bir konuda destek alabilir miyiz?',
        a: 'Evet. Belirli bir konuda ikinci görüş, tasarım gözden geçirmesi ya da devam eden bir projede belirli bir modülün sahipliği şeklinde çalışabiliriz. Bu tür sınırlı kapsamlı çalışmalar genellikle birkaç haftalıktır.',
      },
      {
        q: 'Çalışma sırasında günlük operasyonumuz etkilenir mi?',
        a: 'Teşhis aşaması operasyonu etkilemez; okuma yetkisiyle çalışırız. Yapılandırma değişiklikleri geliştirme ve test sistemlerinde yapılır, canlıya taşınması planlı bakım pencerelerinde gerçekleşir. Kapanış dönemlerinde canlı sisteme müdahale etmeyiz.',
      },
    ],

    comparison: {
      forWhom: 'Mevcut SAP kurulumu dağılmış ya da yeni kuracak şirketler',
      duration: 'Teşhis 3–4 hafta, yeniden yapılandırma 4–7 ay',
      mainGain: 'Tutarlı raporlama ve öngörülebilir kapanış',
    },
    serviceType: 'SAP FI/CO consulting',
  },

  en: {
    navTitle: 'SAP Finance Modules',
    navDesc: 'FI, CO and end-to-end financial process design',
    cardDesc:
      'General ledger, payables, receivables, asset accounting and controlling, rebuilt as one coherent process architecture rather than five parallel ones.',

    title: 'SAP finance modules: depth in FI and CO',
    metaTitle: 'SAP Finance Module Consulting (FI & CO) | CPeak Consultancy',
    metaDescription:
      'Process design, chart of accounts architecture, controlling and financial close improvement across SAP FI and CO. 10+ years of hands-on delivery.',

    summary:
      'Finance is the least forgiving area of an ERP: a decision made in the chart of accounts constrains group reporting three years later. We design FI and CO backwards from what the business and the statutory calendar actually require, not from a reference template.',

    whoFor: [
      'Finance leaders who no longer fully trust the numbers coming out of their own system',
      'Groups running several company codes that need one consistent reporting logic across entities',
      'Organisations reporting under multiple GAAPs that want parallel ledgers handled properly rather than through spreadsheets',
      'Shared service centres standardising finance operations across countries',
    ],

    challenges: [
      'The close takes a different number of days every month and nobody can point to where the time goes.',
      'FI and CO disagree, and the reconciliation happens manually outside the system.',
      'The chart of accounts has accumulated hundreds of accounts nobody is willing to retire.',
      'Cost centre and internal order structures reflect an organisation that was reorganised twice since.',
      'Statutory and management reporting are produced separately and reconciled by hand at quarter end.',
    ],

    whatWeDo: [
      {
        heading: 'Diagnosis based on your data, not on interviews',
        body: [
          'We start by reading the system rather than mapping processes on a whiteboard. Which accounts actually carried postings in the last twelve months, which cost objects receive entries, how many documents are posted manually versus automatically, where clearing genuinely happens. This shows the gap between the process as described and the process as executed — and that gap is almost always where the problem lives.',
          'The output is not a slide deck. It is a decision list: what stays, what gets simplified, what gets rebuilt, and what each option costs in effort and disruption.',
        ],
      },
      {
        heading: 'Chart of accounts and enterprise structure',
        body: [
          'The enterprise structure is the most expensive decision in an SAP implementation to reverse. We design company code, profit centre and segment structures against the next five years of plausible corporate change — acquisitions, carve-outs, entering a new jurisdiction — rather than against this year’s statutory filing alone.',
          'In S/4HANA the Universal Journal merges FI and CO into a single line-item table, which removes the structural reason for a whole class of reconciliations. Designs carried over from ECC habits give that advantage away. We replace reconciliation-dependent structures with ones that do not require reconciliation by construction.',
        ],
      },
      {
        heading: 'Controlling and profitability',
        body: [
          'We rebuild the cost centre hierarchy, internal order usage and assessment/distribution cycles around the organisation as it exists today. In profitability analysis we separate the characteristics that genuinely support decisions from those that only inflate data volume — in most installations the second group is the larger one.',
          'For manufacturing clients we cover standard costing, variance analysis and inventory valuation end to end. Being able to trace where and why a variance arose is usually worth more to the business than a marginally more accurate standard cost.',
        ],
      },
      {
        heading: 'Redesigning the close',
        body: [
          'Shortening a close is not about working faster. It is about converting sequential dependencies into parallel ones and eliminating manual reconciliation entirely. We measure the close step by step, identify what blocks what, and separate the steps that can be automated from those that genuinely require judgement.',
          'Bank reconciliation, intercompany matching and elimination, accruals and provisions are typically where the largest gains sit. The goal is predictability as much as speed: a close that finishes on a different day each month cannot be planned around, however short it is.',
        ],
      },
      {
        heading: 'Handover that actually holds',
        body: [
          'We build your team into process owners as we go. Test scenarios are written together, the first closes are run together, and documentation is delivered as an operating handbook people use rather than a specification nobody opens. If the process stalls the week the consultant leaves, the engagement was not finished.',
        ],
      },
    ],

    deliverables: [
      'Diagnostic report with prioritised, costed findings',
      'Target enterprise structure and chart of accounts design',
      'Cost centre and profit centre hierarchy with allocation logic',
      'Configuration documentation',
      'Close calendar with step-level ownership matrix',
      'Test scenarios and recorded test results',
      'Key user training and operating handbook',
    ],

    aiRole:
      'During diagnosis we use AI-assisted analysis to find patterns across posting and document data — work that otherwise takes analysts days of manual sampling. First drafts of test scenarios and configuration documentation are produced the same way. Every AI-generated output is reviewed by a senior consultant before it reaches you, and client data stays within agreed boundaries.',

    duration: 'Diagnosis 3–4 weeks; a full redesign typically 4–7 months.',
    team: 'One senior FI/CO consultant full time, a solution architect part time, with data migration and reporting specialists added as scope requires.',

    faqs: [
      {
        q: 'Can you improve things without touching our chart of accounts?',
        a: 'Usually yes. A substantial share of the gains in close duration, reconciliation effort and reporting consistency can be achieved without restructuring the chart of accounts. We recommend changing it only when the structure genuinely blocks reporting, and in that case it should be scoped as its own project.',
      },
      {
        q: 'We are on ECC. Will this work be wasted when we move to S/4HANA?',
        a: 'No, and in the right sequence it reduces the cost of that move. Simplifying the chart of accounts, retiring unused objects and standardising processes are all things an S/4HANA conversion requires anyway. Doing them first shrinks both the scope and the risk of the conversion.',
      },
      {
        q: 'How much can you shorten our close?',
        a: 'We will not quote a number before measuring your close step by step, because the answer depends entirely on where the time is currently spent. Where manual reconciliation dominates, meaningful reduction is normal — but a figure offered before measurement is a sales claim, not an estimate.',
      },
      {
        q: 'Can we engage you for a narrow scope only?',
        a: 'Yes. Second opinions, design reviews and taking ownership of a single workstream inside a programme run by someone else are all common. These engagements are typically a few weeks.',
      },
      {
        q: 'Will day-to-day operations be disrupted?',
        a: 'Diagnosis uses read access only and does not affect operations. Configuration changes are made in development and test systems and promoted during planned windows. We do not touch production during close periods.',
      },
    ],

    comparison: {
      forWhom: 'Organisations with a drifted SAP setup, or implementing fresh',
      duration: 'Diagnosis 3–4 weeks, redesign 4–7 months',
      mainGain: 'Consistent reporting and a predictable close',
    },
    serviceType: 'SAP FI/CO consulting',
  },
};
