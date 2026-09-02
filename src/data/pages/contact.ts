import type { Lang } from '@/i18n/routes';

export interface ContactContent {
  meta: { title: string; description: string };
  hero: { h1: string; lead: string };
  aside: {
    directTitle: string;
    directBody: string;
    hoursTitle: string;
    responseTitle: string;
    responseBody: string;
    addressTitle: string;
    mapNote: string;
    whatHappensTitle: string;
    whatHappens: readonly string[];
  };
}

export const contact: Record<Lang, ContactContent> = {
  tr: {
    meta: {
      title: 'İletişim | CPeak Danışmanlık',
      description:
        'SAP finansallar, S/4HANA dönüşümü veya bulut mimarisi konusunda görüşmek için yazın. Bir iş günü içinde dönüş yapıyoruz.',
    },
    hero: {
      h1: 'Bize yazın',
      lead:
        'Mevcut durumunuzu ve neyi çözmek istediğinizi birkaç cümleyle anlatmanız yeterli. Bir iş günü içinde dönüş yapıyoruz.',
    },
    aside: {
      directTitle: 'Doğrudan iletişim',
      directBody: 'Form yerine doğrudan yazmayı tercih ederseniz: kerem.yigit@cpeakconsultancy.com',
      hoursTitle: 'Çalışma saatleri',
      responseTitle: 'Yanıt süresi',
      responseBody:
        'Mesajınıza bir iş günü içinde dönüyoruz. Bu bir hedef değil, tuttuğumuz bir taahhüt.',
      addressTitle: 'Adres',
      mapNote:
        'Bostancı Mahallesi, Şemsettin Günaltay Caddesi No: 31/8 · 34744 Kadıköy / İstanbul',
      whatHappensTitle: 'Bundan sonra ne oluyor?',
      whatHappens: [
        'Mesajınızı okur, konuyu hangi danışmanın ele alacağını belirleriz.',
        'Bir iş günü içinde e-postayla döner, kısa bir görüşme öneririz.',
        'İlk görüşme 30–45 dakikadır ve ücretsizdir; amacı sizin durumunuzu anlamak ve uygun olup olmadığımızı belirlemektir.',
        'Uygun olmadığımızı düşünürsek bunu söyleriz. Alanımız dışındaki işleri almıyoruz.',
      ],
    },
  },

  en: {
    meta: {
      title: 'Contact | CPeak Consultancy',
      description:
        'Get in touch with us regarding  SAP financials, S/4HANA transformation or cloud architecture. We respond within one business day.',
    },
    hero: {
      h1: 'Get in touch',
      lead:
        'A few sentences on where you are today and what you are trying to solve is enough to start. We respond within one business day.',
    },
    aside: {
      directTitle: 'Direct contact',
      directBody: 'If you would rather write directly than use the form:',
      hoursTitle: 'Office hours',
      responseTitle: 'Response time',
      responseBody:
        'We come back to you within one business day. That is a commitment we keep, not an aspiration.',
      addressTitle: 'Address',
      mapNote: 'A location map will be added here once the address details are confirmed.',
      whatHappensTitle: 'What happens next',
      whatHappens: [
        'We read your message and decide which consultant should take it.',
        'You get an email reply within one business day proposing a short call.',
        'The first call runs 30–45 minutes at no cost. Its purpose is to understand your situation and establish whether we are the right party.',
        'If we do not think we are the right fit, we say so. We decline work outside our specialism.',
      ],
    },
  },
};
