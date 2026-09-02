import type { LocalizedSolution } from '../types';

/**
 * Yapay zeka destekli finans süreçleri.
 * Ton kuralı: "AI destekli devrim" dili yok. Her iddia somut bir
 * sürece bağlanır; ölçülmemiş kazanç rakamı verilmez.
 */
export const ai: LocalizedSolution = {
  tr: {
    navTitle: 'Yapay Zeka ile Finans',
    navDesc: 'SAP’nin yerleşik yapay zeka yetenekleri ve süreç otomasyonu',
    cardDesc:
      'Mutabakat, anomali tespiti ve tahmine dayalı muhasebe gibi alanlarda hangi yeteneğin sizde gerçekten karşılığı olduğunu belirler, işe yarayanı devreye alırız.',

    title: 'Yapay zeka ile finans süreçleri: gösteriden önce ölçüm',
    metaTitle: 'SAP’de Yapay Zeka ile Finans Otomasyonu Danışmanlığı | CPeak',
    metaDescription:
      'SAP’nin yerleşik yapay zeka yetenekleriyle mutabakat otomasyonu, anomali tespiti ve tahmine dayalı muhasebe. Uygunluk değerlendirmesi ve devreye alma.',

    summary:
      'Finansta yapay zekanın değeri, tekrar eden ve hacimli işlerde insan saatini geri kazanmasıdır. Bu yüzden işe hangi yeteneğin açılacağıyla değil, ekibinizin zamanının nereye gittiğini ölçmekle başlarız.',

    whoFor: [
      'Mutabakat ve eşleştirme işine her ay ciddi insan saati harcayan finans ekipleri',
      'Kapanış süresini kısaltmak isteyip otomasyonun nereden başlayacağını bilemeyen finans direktörleri',
      'İşlem hacmi büyürken ekip sayısını aynı oranda büyütmek istemeyen şirketler',
      'SAP’nin yeni yapay zeka yeteneklerini duymuş ama hangisinin kendisine uyduğunu değerlendirmek isteyen BT ve finans yöneticileri',
    ],

    challenges: [
      'Yapay zeka başlığı altında çok şey anlatılıyor ama hangisinin sizin süreçlerinizde karşılığı olduğu belirsiz.',
      'Mutabakat büyük ölçüde manuel; eşleşmeyen kalemler her ay aynı kişilerin bilgisine bağlı kalıyor.',
      'Hatalar kapanıştan sonra fark ediliyor; düzeltme maliyeti, önceden yakalamanın maliyetinden yüksek.',
      'Veri gizliliği endişesi nedeniyle hiçbir şey başlatılamıyor, konu sürekli erteleniyor.',
      'Pilot çalışmalar etkileyici görünüyor ama günlük operasyona geçmiyor.',
    ],

    whatWeDo: [
      {
        heading: 'Önce ölçüm: zaman nereye gidiyor?',
        body: [
          'Otomasyon konuşmasına, ekibin zamanının nereye gittiğini ölçmeden başlamayız. Kapanış adımlarını süre ve tekrar sayısıyla çıkarır, manuel müdahale gerektiren işlem türlerini hacimleriyle listeleriz. Bu liste genellikle beklentiyi düzeltir: en çok konuşulan süreç, en çok zaman yiyen süreç olmayabilir.',
          'Ortaya çıkan tabloda her aday süreci iki eksende değerlendiririz — harcanan insan saati ve otomasyona uygunluk. Sağ üst köşedeki iki üç süreç ilk fazın kapsamıdır; geri kalanı beklemeye alınır. Aynı anda her şeye başlayan otomasyon projeleri, hiçbirini günlük operasyona taşıyamadan biter.',
        ],
      },
      {
        heading: 'SAP’nin yerleşik yetenekleri',
        body: [
          'SAP’nin finans alanındaki yapay zeka yetenekleri, ayrı bir ürün almak yerine sistemin içinden çalışır. Akıllı mutabakat, banka ve cari hesap kalemlerini geçmiş eşleşme davranışından öğrenerek otomatik eşler ve yalnızca kararsız kaldığı kalemleri insana bırakır. Anomali tespiti, alışılmadık kayıtları kapanıştan önce işaretler. Tahmine dayalı muhasebe, henüz kesinleşmemiş işlemlerin etkisini dönem içinde görünür kılar. Joule ise doğal dille sorgulama ve gezinme katmanı sunar.',
          'Bunların hepsini açmak bir strateji değildir. Her yetenek belirli bir veri hacmi ve belirli bir süreç düzeni gerektirir; koşulu sağlanmadan açılan yetenek gürültü üretir ve ekibin güvenini kaybeder. Hangi yeteneğin sizde çalışacak koşula sahip olduğunu değerlendirir, sırayla devreye alırız.',
        ],
      },
      {
        heading: 'Eşik ayarı ve insan denetimi',
        body: [
          'Otomatik eşleştirmede asıl mühendislik işi eşik değerlerindedir. Eşik gevşek olursa yanlış eşleşmeler kapanışa sızar; sıkı olursa sistem neredeyse hiçbir şeyi otomatik eşleyemez ve ekip eski yöntemine döner. Eşikleri gerçek veriyle kalibre eder, ilk aylarda gözden geçiririz.',
          'Kararların hangi eşiğin üstünde otomatik alınacağını, hangilerinin mutlaka insana geleceğini birlikte yazılı olarak belirleriz. Finansal kayıt üreten hiçbir karar, gözden geçirilmeden otomatik kesinleşmez — bu bizim değişmeyen duruşumuzdur.',
        ],
      },
      {
        heading: 'Veri gizliliği ve izlenebilirlik',
        body: [
          'Yapay zeka konusunun en sık ertelenme nedeni veri endişesidir ve bu meşru bir endişedir. Hangi verinin nerede işlendiğini, sistemin dışına çıkıp çıkmadığını ve saklama sürelerini proje başında netleştirir, KVKK ve iç denetim gereksinimleriyle karşılaştırırız.',
          'Otomatik alınan kararların izlenebilir olması ayrıca önemlidir: denetçi “bu eşleşmeyi neden sistem yaptı?” diye sorduğunda cevaplanabilir bir kayıt bırakmak, kurulumun tasarım gereğidir.',
        ],
      },
      {
        heading: 'Günlük operasyona taşıma',
        body: [
          'Pilotun başarısı, ekranı değil takvimi değiştirmesiyle ölçülür. Devreye alınan her otomasyon için kapanış takviminde karşılığını günceller, ekibin yeni sorumluluğunu — artık eşleştirme yapmak değil, istisnaları incelemek — açıkça tanımlarız. Ölçümü kurulumdan önce ve sonra aynı yöntemle tekrarlar, kazancı iddia olarak değil rakam olarak bırakırız.',
        ],
      },
    ],

    deliverables: [
      'Süreç zaman ölçümü ve otomasyon uygunluk değerlendirmesi',
      'Önceliklendirilmiş otomasyon yol haritası (fazlı)',
      'Devreye alınan yetenekler için yapılandırma ve eşik dokümantasyonu',
      'İnsan denetimi kuralları ve istisna yönetimi süreci',
      'Veri işleme envanteri ve gizlilik değerlendirmesi',
      'Kurulum öncesi/sonrası ölçüm karşılaştırması',
      'Ekip eğitimi ve istisna inceleme el kitabı',
    ],

    aiRole:
      'Bu hizmetin konusu zaten yapay zeka. Burada eklenmesi gereken nokta şu: aynı disiplini kendi çalışma şeklimizde de uygularız. Analiz, dokümantasyon ve test üretiminde yapay zekadan yararlanırız, ancak müşteri verisi üzerinde çalışan her adım önceden mutabık kalınan sınırlar içinde yürür ve her çıktı kıdemli danışman denetiminden geçer.',

    duration:
      'Ölçüm ve uygunluk değerlendirmesi 2–3 hafta. İlk fazın devreye alınması tipik olarak 6–12 hafta.',
    team: 'Bir kıdemli finans danışmanı ve süreç otomasyonu uzmanı; entegrasyon ihtiyacına göre teknik destek.',

    faqs: [
      {
        q: 'Verilerimiz yapay zeka modelini eğitmek için kullanılır mı?',
        a: 'Bu, kullanılan yeteneğin hangi mimariyle çalıştığına bağlıdır ve proje başında netleştirilmesi gereken ilk konudur. Devreye alınacak her yetenek için verinin nerede işlendiğini, sistem sınırlarının dışına çıkıp çıkmadığını ve saklama süresini yazılı olarak veririz. Bu bilgi netleşmeden devreye alma önermeyiz.',
      },
      {
        q: 'Ne kadar kazanç bekleyebiliriz?',
        a: 'Ölçmeden söylemeyiz. Değerlendirme aşamasında mevcut sürelerinizi çıkarırız ve kazanç tahminini kendi verinize dayandırırız. Başka bir şirketin sonucunu size vaat etmek, sizin için işe yarar bir bilgi sağlamaz.',
      },
      {
        q: 'S/4HANA’da değiliz. Bu yeteneklerden yararlanabilir miyiz?',
        a: 'Yerleşik yeteneklerin büyük bölümü S/4HANA gerektirir. ECC üzerindeyseniz, süreç ölçümü ve otomasyona hazırlık çalışması yine değerlidir ve dönüşüm planınıza doğrudan girdi olur — ancak yeteneklerin çoğu geçiş sonrasında devreye girer.',
      },
      {
        q: 'Ekibimiz işini kaybeder mi?',
        a: 'Uygulamada gördüğümüz, ekiplerin küçülmesi değil işin niteliğinin değişmesidir: kalem eşleştirmek yerine istisnaları incelemek, sapmaları araştırmak ve kontrol kurmak. Bunu baştan açıkça konuşmak, projenin ekip tarafından sahiplenilmesi için de gereklidir.',
      },
      {
        q: 'Küçük bir alanda deneyerek başlayabilir miyiz?',
        a: 'Evet; genellikle önerdiğimiz de budur. Tek bir sürece odaklanan sınırlı bir ilk faz, ölçülebilir bir sonuç üretir ve yaygınlaştırma kararını veriye dayandırır. Bu tür bir ilk faz tipik olarak birkaç haftalıktır.',
      },
    ],

    comparison: {
      forWhom: 'Tekrar eden manuel finans işine çok saat harcayan ekipler',
      duration: 'Değerlendirme 2–3 hafta, ilk faz 6–12 hafta',
      mainGain: 'Geri kazanılan insan saati ve daha erken hata yakalama',
    },
    serviceType: 'AI-enabled finance process automation',
  },

  en: {
    navTitle: 'AI in Finance',
    navDesc: 'SAP’s embedded AI capabilities and process automation',
    cardDesc:
      'We separate which AI capabilities have a real use in your processes from those that only demo well, and put the useful ones into daily operation.',

    title: 'AI in finance: measurement before demonstration',
    metaTitle: 'AI-Enabled Finance Automation in SAP | CPeak Consultancy',
    metaDescription:
      'Intelligent matching, anomaly detection and predictive accounting using SAP’s embedded AI capabilities. Suitability assessment, threshold calibration and rollout.',

    summary:
      'The value of AI in finance is recovering human hours from repetitive, high-volume work. So we do not begin by asking which capability to switch on. We begin by measuring where your team’s time actually goes.',

    whoFor: [
      'Finance teams spending substantial hours each month on reconciliation and matching',
      'CFOs who want a shorter close but cannot see where automation should start',
      'Companies whose transaction volume is growing faster than they want to grow headcount',
      'Finance and IT leaders evaluating which of SAP’s new AI capabilities are relevant to them',
    ],

    challenges: [
      'A great deal is claimed under the AI heading, with no clear read on which of it applies to your processes.',
      'Reconciliation is largely manual and unmatched items depend on the knowledge of the same two people every month.',
      'Errors are found after the close, when correction costs more than prevention would have.',
      'Data privacy concerns stall the conversation entirely and the topic gets deferred indefinitely.',
      'Pilots demonstrate well and never reach daily operation.',
    ],

    whatWeDo: [
      {
        heading: 'Measure first: where does the time go?',
        body: [
          'We do not open an automation conversation without measuring where the team’s hours are spent. We map the close step by step with durations and repetition counts, and list the transaction types requiring manual intervention alongside their volumes. This usually corrects expectations: the process people complain about most is often not the one consuming the most time.',
          'Each candidate is then assessed on two axes — hours consumed and suitability for automation. The two or three in the top-right corner become the first phase; everything else waits. Automation programmes that start everywhere at once tend to finish without moving anything into daily operation.',
        ],
      },
      {
        heading: 'SAP’s embedded capabilities',
        body: [
          'SAP’s AI capabilities in finance run from inside the system rather than as a separate product you integrate. Intelligent matching learns from historical clearing behaviour to match bank and open items automatically, escalating only what it cannot resolve confidently. Anomaly detection flags unusual postings before the close rather than after. Predictive accounting makes the effect of not-yet-final transactions visible during the period. Joule adds a natural-language layer for querying and navigation.',
          'Switching all of it on is not a strategy. Each capability needs a certain data volume and a certain process discipline behind it; enabled without those preconditions it produces noise and loses the team’s trust — which is expensive to win back. We assess which capabilities you actually have the conditions for, and sequence them.',
        ],
      },
      {
        heading: 'Threshold calibration and human oversight',
        body: [
          'The real engineering in automated matching lives in the thresholds. Set them loose and incorrect matches reach the ledger; set them tight and the system clears almost nothing, and the team quietly returns to the old method. We calibrate against your actual data and review the settings over the first months of operation.',
          'We define in writing which decisions clear automatically above a threshold and which always reach a person. No decision that produces a financial posting is finalised without review — that is a position we do not negotiate, regardless of how well the model performs.',
        ],
      },
      {
        heading: 'Data privacy and traceability',
        body: [
          'Concern about data is the most common reason this topic gets deferred, and it is a legitimate one. We establish at the outset which data is processed where, whether it leaves the system boundary, and how long it is retained — then compare that against your privacy obligations and internal audit requirements.',
          'Traceability matters just as much. When an auditor asks why the system made a particular match, leaving behind a record that answers the question is a design requirement of the implementation, not an afterthought.',
        ],
      },
      {
        heading: 'Moving into daily operation',
        body: [
          'A pilot succeeds when it changes the calendar, not the screen. For every automation we put live, we update the corresponding step in the close calendar and define the team’s new responsibility explicitly — reviewing exceptions rather than performing matches. Measurement is repeated with the same method before and after, so the benefit is stated as a number rather than a claim.',
        ],
      },
    ],

    deliverables: [
      'Process time measurement and automation suitability assessment',
      'Prioritised, phased automation roadmap',
      'Configuration and threshold documentation for each capability deployed',
      'Human oversight rules and exception handling process',
      'Data processing inventory and privacy assessment',
      'Before-and-after measurement comparison',
      'Team training and exception review handbook',
    ],

    aiRole:
      'AI is the subject of this service, so the point worth making is about our own practice: we hold ourselves to the same discipline. We use AI in analysis, documentation and test generation, but every step touching client data runs inside boundaries agreed in advance, and every output is reviewed by a senior consultant before it reaches you.',

    duration:
      'Measurement and suitability assessment 2–3 weeks. First phase rollout typically 6–12 weeks.',
    team: 'One senior finance consultant and a process automation specialist, with technical support as integration requires.',

    faqs: [
      {
        q: 'Will our data be used to train an AI model?',
        a: 'It depends on the architecture behind the specific capability, and it is the first thing to settle rather than the last. For every capability we deploy, we document where data is processed, whether it crosses the system boundary and how long it is retained. We do not recommend enabling anything before that is clear.',
      },
      {
        q: 'What level of benefit should we expect?',
        a: 'We will not say before measuring. The assessment establishes your current durations and any estimate is based on your own data. Another company’s result is not usable information about yours.',
      },
      {
        q: 'We are not on S/4HANA yet. Can we use these capabilities?',
        a: 'Most embedded capabilities require S/4HANA. If you are on ECC, the process measurement and automation readiness work is still worthwhile and feeds directly into your conversion business case — but the capabilities themselves largely arrive after the move.',
      },
      {
        q: 'Will our team lose their jobs?',
        a: 'What we see in practice is a change in the nature of the work rather than a reduction in headcount: reviewing exceptions, investigating variances and building controls instead of matching line items. Saying this openly at the start also matters for whether the team adopts the change.',
      },
      {
        q: 'Can we start small?',
        a: 'Yes, and it is usually what we recommend. A narrow first phase focused on one process produces a measurable result and puts the scale-up decision on evidence. That first phase is typically a few weeks.',
      },
    ],

    comparison: {
      forWhom: 'Teams spending heavy manual hours on repetitive finance work',
      duration: 'Assessment 2–3 weeks, first phase 6–12 weeks',
      mainGain: 'Recovered hours and errors caught earlier',
    },
    serviceType: 'AI-enabled finance process automation',
  },
};
