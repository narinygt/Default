import type { Lang } from '@/i18n/routes';

/**
 * HAKKIMIZDA
 * =================================================================
 * Bu sayfa bilinçli olarak şunları İÇERMEZ:
 *   • kuruluş yılı, çalışan sayısı, tamamlanan proje sayısı
 *   • müşteri adı, logosu ya da referans yorumu
 *   • ödül, sertifika veya SAP iş ortaklığı statüsü
 * Bunlar prompt'ta verilmediği için uydurulmamıştır. Elinizde gerçek
 * bilgi olduğunda `optionalFacts` bloğunu doldurmanız yeterlidir;
 * boş bırakıldığı sürece o bölüm sayfada hiç görünmez.
 */
export interface AboutContent {
  meta: { title: string; description: string };
  hero: { h1: string; lead: string };
  story: { h2: string; body: readonly string[] };
  focus: { h2: string; lead: string; items: readonly { title: string; body: string }[] };
  people: { h2: string; body: readonly string[] };
  /** Doldurulursa sayfada "Kurumsal bilgiler" bloğu olarak görünür. */
  optionalFacts: readonly { label: string; value: string }[];
  closing: string;
}

export const about: Record<Lang, AboutContent> = {
  tr: {
    meta: {
      title: 'Hakkımızda | CPeak Danışmanlık',
      description:
        'SAP ECC, S/4HANA on-premise, Private Cloud ve Public Cloud uçtan uca finans modülleri üzerine çalışan bağımsız bir danışmanlık şirketi. Odak alanımız, yapay zeka destekli çalışma biçimimiz ve uzman kadro yapımız.',
    },
    hero: {
      h1: 'Uçtan uca finans modüllerinde ve yapay zeka destekli süreçlerde uzmanlaşmayı seçtik',
      lead:
        'CPeak Consultancy; SAP ECC, S/4HANA on-premise, Private Cloud ve Public Cloud ortamlarında uçtan uca finans modülleri üzerine çalışan bağımsız bir danışmanlık şirketidir. Odak alanımız, uzman kadromuzla yürüttüğümüz yapay zeka destekli çalışma biçimimizdir. Uzmanlık alanımız dışındaki lojistik modüllerde ise yurt içi ve yurt dışı iş ortaklarımızla birlikte çalışarak projenize uçtan uca destek vermeyi taahhüt ederiz.',
    },
    story: {
      h2: 'Neden bu odak',
      body: [
        'SAP danışmanlığında yaygın model geniş kapsam sunmak, sonra her alan için farklı bir uzman bulmaktır. Bu model satış aşamasında rahattır ama projede sorumluluğun dağılmasına yol açar: kritik bir finans kararı, o konuda en az deneyimi olan kişiye kalabilir.',
        'Biz bunun tersini seçtik. Finans modülleri ve bulut mimarisi dışına çıkmıyoruz. Bir işi alıyorsak, o işin en zor kısmını dışarıya devretmiyoruz demektir. Uzmanlık alanımız dışındaki modüllerin ana sorumluluğunu ise almıyoruz — bunu yaklaşımımız sayfasında açıkça yazdık.',
        'Bu odak, ölçek anlamına gelmiyor. Aynı anda çok sayıda proje yürütmek yerine, aldığımız işlerde kıdemli kadronun fiilen çalışmasını mümkün kılacak sayıda çalışıyoruz.',
      ],
    },
    focus: {
      h2: 'Ne üzerinde çalışıyoruz?',
      lead: 'Uzmanlığımız üç alanda birleşiyor ve bu üçü birbirini besliyor.',
      items: [
        {
          title: 'Finans modülleri: SAP FI, CO, PA (Marj Analizi) ve PS (Proje Sistemi)',
          body:
            'FI ve CO tarafında global hesap planı ve üst düzey organizasyon yapısı tasarımı, maliyet ve kârlılık muhasebesi, kapanış sürecinin yeniden kurgulanması.',
        },
        {
          title: 'Bulut teknolojisi: Private Cloud ve Public Cloud',
          body:
            'Public Cloud ve Private Cloud modelleri arasında uygunluk değerlendirmesi, hedef mimari tasarımı ve canlı geçiş yönetimi. Belirli bir modelin savunuculuğunu yapmıyoruz.',
        },
        {
          title: 'Yapay zeka ve RPA destekli süreç otomasyonu',
          body:
            'SAP’nin yerleşik yapay zeka yetenekleriyle mutabakat, anomali tespiti ve tahmine dayalı muhasebe alanlarında otomasyon; ölçüme dayalı ve fazlı biçimde.',
        },
      ],
    },
    people: {
      h2: 'Kadro yapımız',
      body: [
        'Ekip küçük ve kıdemlidir. Tekliflerde adı geçen kişiler projede fiilen çalışan kişilerdir; teklif aşamasında tanıştığınız danışman, proje boyunca da sizinle çalışır.',
        'Bunun pratik sonucu şudur: aynı anda alabileceğimiz iş sayısı sınırlıdır. Kapasitemizin uygun olmadığı bir dönemde bunu size söyler, gerçekçi bir başlangıç tarihi veririz — işi alıp sonra ekip bulmaya çalışmayız.',
        'İhtiyaç kapsamı büyüdüğünde ekibi büyütmek yerine işi fazlara böleriz. Her fazın sonunda çalışan bir çıktı olur ve devam kararı yeniden verilir.',
      ],
    },
    optionalFacts: [
      { label: 'Kuruluş yılı', value: '2021' },
      { label: 'Merkez', value: 'İstanbul' },
      { label: 'Hizmet verilen bölgeler', value: 'Türkiye, EMEA ve ABD' },
    ],
    closing:
      'Çalıştığımız alan sizin gündeminize denk geliyorsa, durumunuzu yazın. Bir iş günü içinde dönüş yapıyoruz.',
  },

  en: {
    meta: {
      title: 'About | CPeak Consultancy',
      description:
        'An independent consultancy working on SAP ECC, S/4HANA on-premise, Private Cloud and Public Cloud. Our focus is a senior team and an AI-supported way of working.',
    },
    hero: {
      h1: 'We chose to specialise in end-to-end finance modules and AI-supported finance processes',
      lead:
        'CPeak Consultancy is an independent consultancy specialising in end-to-end finance modules across SAP ECC, S/4HANA on-premise, Private Cloud and Public Cloud. Our focus is a senior team and an AI-supported way of working. Where a programme extends into logistics modules outside our specialism, we work alongside our partners in Türkiye and abroad so that the finance scope stays covered end to end.',
    },
    story: {
      h2: 'Why this focus',
      body: [
        'The common model in SAP consulting is to offer broad scope and then source a different specialist for each area. It is comfortable at the proposal stage and it distributes responsibility during delivery — which is how a critical finance decision ends up with the person who has seen it least often.',
        'We took the opposite position. We stay inside finance modules and cloud architecture. If we take an engagement, it means we are not subcontracting the difficult part of it. Lead responsibility for modules outside our specialism is something we decline, and we say so plainly on our approach page.',
        'This focus is not a claim about scale. Rather than running many programmes in parallel, we run the number that allows senior people to be genuinely present on each.',
      ],
    },
    focus: {
      h2: 'What we work on',
      lead: 'Our expertise meets in three areas, and each one informs the others.',
      items: [
        {
          title: 'Finance modules: SAP FI, CO, PA (Margin Analysis) and PS (Project System)',
          body:
            'Enterprise structure and global chart of accounts design, controlling and profitability, and redesign of the financial close across FI and CO.',
        },
        {
          title: 'SAP Private Cloud and Public Cloud',
          body:
            'Fit assessment between Public and Private Cloud, target architecture design and migration management. We do not advocate for a particular model.',
        },
        {
          title: 'AI and RPA-powered process automation',
          body:
            'Automation in matching, anomaly detection and predictive accounting using SAP’s embedded AI capabilities — measured first, then phased.',
        },
      ],
    },
    people: {
      h2: 'How we staff engagements',
      body: [
        'The team is small and senior. The people named in a proposal are the people who do the work; the consultant you meet at proposal stage stays with the programme.',
        'The practical consequence is that the number of engagements we can take at once is limited. When capacity does not allow, we say so and give you a realistic start date rather than accepting the work and then looking for a team.',
        'When scope grows we phase the work rather than expand the team. Each phase ends in something that works, and the decision to continue is taken again.',
      ],
    },
    optionalFacts: [
      { label: 'Founded', value: '2021' },
      { label: 'Head office', value: 'Istanbul' },
      { label: 'Regions served', value: 'Türkiye, EMEA and the United States' },
    ],
    closing:
      'If what we work on matches what is on your agenda, describe your situation. We respond within one business day.',
  },
};
