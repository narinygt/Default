import type { Lang } from '@/i18n/routes';

export interface ApproachContent {
  meta: { title: string; description: string };
  hero: { h1: string; lead: string };
  principles: { h2: string; items: readonly { title: string; body: string }[] };
  engagement: {
    h2: string;
    lead: string;
    models: readonly { name: string; when: string; shape: string; duration: string }[];
  };
  reporting: { h2: string; body: readonly string[]; items: readonly string[] };
  notDoing: { h2: string; lead: string; items: readonly string[] };
  closing: string;
}

export const approach: Record<Lang, ApproachContent> = {
  tr: {
    meta: {
      title: 'Yaklaşımımız | Nasıl çalışırız — CPeak Danışmanlık',
      description:
        'Değerlendirme, mimari tasarım, uygulama ve hypercare aşamaları; çalışma ilkelerimiz, çalışma modellerimiz, raporlama düzenimiz ve üstlenmediğimiz işler.',
    },
    hero: {
      h1: 'Nasıl çalışırız',
      lead:
        'Danışmanlıkta sonucu belirleyen şey yöntem adı değil, günlük çalışma düzenidir. Aşağıdakiler bizim düzenimizi tarif eder — ve neyi yapmadığımızı da açıkça söyler.',
    },
    principles: {
      h2: 'Çalışma ilkelerimiz',
      items: [
        {
          title: 'Önce ölçer, sonra öneririz',
          body:
            'Hiçbir öneriyi sistemdeki gerçek veriye bakmadan vermiyoruz. Ölçmeden verilen tavsiye bir tahmindir; tahminin maliyeti ise size kalır. Bu yüzden hemen her çalışma bir değerlendirme fazıyla başlar.',
        },
        {
          title: 'Kararı size bırakırız, gerekçeyi yazılı veririz',
          body:
            'Geçiş yöntemi, bulut modeli, kapsam sınırı gibi kararlar sizin kararınızdır. Bizim işimiz seçenekleri maliyet, süre ve riskiyle yan yana koymak ve tercihimizi gerekçesiyle söylemektir. Kararın arkasında kalan gerekçe, iki yıl sonra "bunu neden böyle yapmıştık?" sorusuna cevap verir.',
        },
        {
          title: 'Kötü haberi erken söyleriz',
          body:
            'Bir tahminin tutmayacağı belli olduğunda, bunu ay sonu raporunda değil o hafta söyleriz. Geciken bir projede en pahalı şey gecikmenin kendisi değil, geç duyulmasıdır.',
        },
        {
          title: 'Ekibi süreç sahibi yaparız',
          body:
            'Test senaryolarını birlikte yazar, ilk kapanışı birlikte çalıştırırız. Dokümantasyonu kullanılacak biçimde bırakırız. Danışman çıktığında süreç duruyorsa iş bitmemiştir; bunu bir teslim kriteri olarak kabul ederiz.',
        },
        {
          title: 'Kapsamı büyütmek yerine fazlara böleriz',
          body:
            'İhtiyaç büyüdüğünde ekibi büyütmek yerine işi fazlara ayırırız. Her fazın sonunda çalışan bir çıktı olur ve devam kararı yeniden verilir. Bu, projenin kendi ağırlığı altında ezilmesini önler.',
        },
        {
          title: 'Yapay zekayı hazırlık işlerinde kullanırız',
          body:
            'Analiz, dokümantasyon ve test üretimi gibi hacimli işlerde yapay zekadan yararlanırız; bu proje süresini kısaltır. Karar gerektiren her adım ve müşteriye giden her çıktı kıdemli danışman denetiminden geçer.',
        },
      ],
    },
    engagement: {
      h2: 'Çalışma modelleri',
      lead:
        'Her ihtiyaç tam kapsamlı bir proje gerektirmez. Üç çalışma biçimimiz var ve hangisinin uygun olduğunu ilk görüşmede birlikte belirleriz.',
      models: [
        {
          name: 'Değerlendirme',
          when:
            'Bir karar vermeniz gerekiyor ve elinizde yeterli veri yok. Geçiş yöntemi, bulut modeli seçimi ya da mevcut kurulumun sağlık kontrolü.',
          shape:
            'Sistem taraması, ilgili kişilerle görüşmeler, bulguların önceliklendirilmesi ve gerekçeli öneri. Sonunda karar verebilecek durumda olursunuz.',
          duration: '2–6 hafta',
        },
        {
          name: 'Proje teslimi',
          when:
            'Kararı vermişsiniz ve uygulanması gerekiyor. Dönüşüm, kurulum ya da kapsamlı yeniden yapılandırma.',
          shape:
            'Fazlı plan, haftalık durum raporu, tanımlı teslim kalemleri ve devreye alma. Hypercare dahil.',
          duration: '3–14 ay',
        },
        {
          name: 'Uzman desteği',
          when:
            'Kendi ekibiniz ya da başka bir danışman projeyi yürütüyor, belirli bir konuda derinlik gerekiyor. Tasarım gözden geçirmesi, ikinci görüş ya da tek bir iş kaleminin sahipliği.',
          shape:
            'Sınırlı ve net tanımlı kapsam, üzerinde anlaşılmış çıktı. Gereksiz yere uzatılmaz.',
          duration: 'Birkaç gün – birkaç hafta',
        },
      ],
    },
    reporting: {
      h2: 'Proje boyunca ne görürsünüz?',
      body: [
        'Danışmanlık projelerinde en sık duyulan şikayet, işin nerede olduğunun görünmemesidir. Bunu önlemek için raporlama düzenini baştan sabitleriz ve proje boyunca değiştirmeyiz.',
      ],
      items: [
        'Haftalık durum raporu: tamamlananlar, devam edenler, riskler ve karar bekleyen konular',
        'Açık karar listesi: kimin, neye, ne zamana kadar karar vermesi gerektiği',
        'Risk kaydı: her riskin sahibi, etkisi ve azaltma planı',
        'Faz sonu teslim paketi: dokümanlar, test kayıtları ve kabul kriterleri',
        'Kapsam değişikliği kaydı: değişen her şeyin süre ve maliyet etkisiyle birlikte yazılması',
      ],
    },
    notDoing: {
      h2: 'Üstlenmediğimiz işler',
      lead:
        'Neyi yapmadığımızı söylemek, ne yaptığımızı söylemek kadar önemlidir. Aşağıdaki işleri almıyoruz — uygun olduğumuzu düşünmediğimiz için.',
      items: [
        'Uzmanlık alanımız dışındaki SAP modüllerinin ana sorumluluğu (lojistik, üretim planlama, İK gibi)',
        'Yalnızca kaynak sağlama: proje yönetimi ya da mimari sorumluluk üstlenmeden danışman temini',
        'Değerlendirme yapılmadan sabit fiyatla taahhüt edilen dönüşüm projeleri',
        'Yazılım geliştirme ya da altyapı işletim hizmeti',
      ],
    },
    closing:
      'Çalışma biçimimizin projenize uyup uymadığını bir görüşmede anlarız. Durumunuzu yazın, bir iş günü içinde dönelim.',
  },

  en: {
    meta: {
      title: 'Approach | How we work — CPeak Consultancy',
      description:
        'Assessment, architecture and roadmap, delivery and hypercare. Our working principles, engagement models, reporting discipline, and the work we deliberately decline.',
    },
    hero: {
      h1: 'How we work',
      lead:
        'In consulting the outcome is decided by the weekly working discipline rather than the name of the methodology. What follows describes ours — including what we do not take on.',
    },
    principles: {
      h2: 'Working principles',
      items: [
        {
          title: 'Measure before recommending',
          body:
            'No recommendation is made without looking at the actual system data. Advice given without measurement is a guess, and the cost of that guess falls to you. That is why nearly every engagement opens with an assessment phase.',
        },
        {
          title: 'The decision is yours; the reasoning is written down',
          body:
            'Conversion approach, cloud model, scope boundaries — these are your decisions. Our job is to put the options side by side with cost, duration and risk, and to state our own view with the reasoning behind it. That written reasoning is what answers “why did we do it this way?” two years later.',
        },
        {
          title: 'Bad news travels immediately',
          body:
            'When it becomes clear an estimate will not hold, you hear it that week rather than in the month-end report. On a slipping project, the expensive part is rarely the slippage itself — it is finding out late.',
        },
        {
          title: 'Your team ends up owning the process',
          body:
            'Test scenarios are written together, and the first close is run together. Documentation is left in a form people actually use. If the process stalls when the consultant leaves, the work was not finished — we treat that as an acceptance criterion, not a courtesy.',
        },
        {
          title: 'Phase the work instead of growing the team',
          body:
            'When the need expands we split the work into phases rather than inflating the team. Each phase ends in something that works, and the decision to continue gets taken again. This is what stops a programme collapsing under its own weight.',
        },
        {
          title: 'AI belongs in the preparation work',
          body:
            'We use AI for the volume work — analysis, documentation, test generation — which shortens the timeline. Every step requiring judgement and every output that reaches you passes through senior review.',
        },
      ],
    },
    engagement: {
      h2: 'Engagement models',
      lead:
        'Not every need calls for a full programme. We work in three shapes, and we establish which one fits during the first conversation.',
      models: [
        {
          name: 'Assessment',
          when:
            'You need to take a decision and lack the evidence for it: conversion approach, cloud model selection, or a health check on an existing landscape.',
          shape:
            'System analysis, stakeholder interviews, prioritised findings and a reasoned recommendation. You end it in a position to decide.',
          duration: '2–6 weeks',
        },
        {
          name: 'Delivery',
          when:
            'The decision is taken and it needs building: a transformation, an implementation or a substantial redesign.',
          shape:
            'Phased plan, weekly status reporting, defined deliverables and cutover. Hypercare included.',
          duration: '3–14 months',
        },
        {
          name: 'Expert support',
          when:
            'Your team or another partner is running the programme and depth is needed in one area: a design review, a second opinion, or ownership of a single workstream.',
          shape:
            'Narrow, clearly defined scope with an agreed output. Not extended past its usefulness.',
          duration: 'Days to weeks',
        },
      ],
    },
    reporting: {
      h2: 'What you see during the engagement',
      body: [
        'The most common complaint about consulting engagements is that nobody can see where the work stands. We fix the reporting cadence at the start and do not change it mid-project.',
      ],
      items: [
        'Weekly status: completed, in progress, risks, and items awaiting your decision',
        'Open decision list: who needs to decide what, and by when',
        'Risk register with a named owner, impact and mitigation for each entry',
        'Phase-end delivery pack: documentation, test records and acceptance criteria',
        'Change log: every scope change recorded with its effect on time and cost',
      ],
    },
    notDoing: {
      h2: 'Work we decline',
      lead:
        'Saying what we do not do matters as much as saying what we do. We turn down the following, because we do not believe we are the right party for it.',
      items: [
        'Lead responsibility for SAP modules outside our specialism — logistics, production planning, HR',
        'Staff augmentation: supplying capacity without architectural or delivery responsibility',
        'Fixed-price transformation commitments made before an assessment has been done',
        'Software development or infrastructure operations as a service',
      ],
    },
    closing:
      'Whether our way of working suits your programme becomes clear in one conversation. Describe your situation and we will respond within one business day.',
  },
};
