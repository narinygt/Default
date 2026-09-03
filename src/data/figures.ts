/**
 * BÖLÜM GÖRSELLERİ — tek kaynak
 * =================================================================
 * Görsellerin başlıkları görselin İÇİNE gömülüdür; bu yüzden her dilin
 * kendi dosyası vardır. Kullanım yerleri yalnızca `lang` verir, doğru
 * dosyayı ve alt metni burası seçer — sayfalarda dil koşulu taşınmaz.
 *
 * Dosyalar 1536×1024 (3:2) ve WebP'dir. Ölçü ortaktır; ekrandaki
 * yerleşimi `.section-figure` kuralı belirler (global.css).
 *
 * Alt metinler görseldeki bilgiyi TAM aktarır: görsel yüklenmezse ya da
 * ekran okuyucu kullanılıyorsa içerik kaybolmaz. Görselde yazan başlığı
 * tekrar etmek yerine ne anlattığını yazarlar.
 */
import type { Lang } from '@/i18n/routes';

export interface Figure {
  src: Record<Lang, string>;
  alt: Record<Lang, string>;
}

export const figures = {
  /** Ana sayfa — çalışma yaklaşımı. */
  process: {
    src: {
      tr: '/media/surec-adimlari.webp',
      en: '/media/surec-adimlari-en.webp',
    },
    alt: {
      tr: 'Dört aşamalı çalışma akışı: değerlendirme aşamasında teşhis raporu, mimari aşamasında hedef mimari ve yol haritası, uygulama aşamasında çalışan sistem ve test kayıtları, hypercare aşamasında kapanış ve iyileştirme raporu teslim edilir.',
      en: 'Four-stage delivery flow: assessment produces a diagnostic report, architecture produces the target architecture and roadmap, implementation produces an operational system and test records, and hypercare produces the closeout and improvement report.',
    },
  },

  /** Çözümler (genel bakış) — Public / Private Cloud karşılaştırması. */
  cloudModels: {
    src: {
      tr: '/media/bulut-modelleri.webp',
      en: '/media/bulut-modelleri-en.webp',
    },
    alt: {
      tr: 'Public Cloud ve Private Cloud modellerinin karşılaştırması: Public Cloud standart süreçler ve hızlı devreye alma, Private Cloud esnek mimari ve daha fazla kontrol sunar. Karar; özelleştirme ihtiyacı, hız ve toplam maliyete göre verilir.',
      en: 'Comparison of the Public Cloud and Private Cloud models: Public Cloud offers standard processes and rapid deployment, Private Cloud offers flexible architecture and greater control. The choice depends on customisation needs, speed and total cost.',
    },
  },

  /** SAP Finans Modülleri — dağınık yapıdan tek mimariye. */
  financeArchitecture: {
    src: {
      tr: '/media/finans-mimari.webp',
      en: '/media/finans-mimari-en.webp',
    },
    alt: {
      tr: 'Dağınık finans yapısından tek mimariye: veri, süreç, kontrol ve raporlama katmanlarının aynı yapıda birleştiğini gösteren şema.',
      en: 'From fragmented finance to a unified architecture: a diagram showing data, processes, controls and reporting coming together in one system.',
    },
  },

  /** Yapay Zeka ile Finans — kararın nasıl ilerlediği. */
  aiFlow: {
    src: {
      tr: '/media/yapay-zeka-akisi.webp',
      en: '/media/yapay-zeka-akisi-en.webp',
    },
    alt: {
      tr: 'Yapay zekanın karar sürecindeki rolü: işlemleri tarar, anomaliyi işaretler, danışman inceler ve süreç insan onayıyla sonuçlanır.',
      en: 'How AI fits into the decision: it scans transactions, flags anomalies, a consultant reviews them, and the step is finalised with human approval.',
    },
  },
} as const satisfies Record<string, Figure>;

export type FigureKey = keyof typeof figures;
