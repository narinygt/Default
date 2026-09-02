import type { Lang } from '@/i18n/routes';

/** Bir çözüm sayfasının tek dildeki tüm metni. */
export interface SolutionContent {
  /** Menüde görünen kısa ad. */
  navTitle: string;
  /** Dropdown'daki tek satırlık açıklama. */
  navDesc: string;
  /** Ana sayfa kartındaki iki satırlık açıklama. */
  cardDesc: string;

  /** Sayfa H1'i. */
  title: string;
  /** <title> — H1'den farklı, arama sonucunda görünen hali. */
  metaTitle: string;
  metaDescription: string;

  /** Hero altındaki tek paragraflık özet. */
  summary: string;

  whoFor: readonly string[];
  challenges: readonly string[];

  /** Sayfanın ana gövdesi — her dilde 400–600 kelime. */
  whatWeDo: readonly { heading: string; body: readonly string[] }[];

  deliverables: readonly string[];

  /** Bu spesifik hizmette yapay zekanın nereye girdiği. */
  aiRole: string;

  /** Beklenti yönetimi. */
  duration: string;
  team: string;

  faqs: readonly { q: string; a: string }[];

  /** /cozumler karşılaştırma tablosundaki satır. */
  comparison: {
    forWhom: string;
    duration: string;
    mainGain: string;
  };

  /** schema.org Service.serviceType */
  serviceType: string;
}

export type LocalizedSolution = Record<Lang, SolutionContent>;
