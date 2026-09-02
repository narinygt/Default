/**
 * Çözüm içeriklerinin toplandığı yer.
 * `Record<SolutionKey, ...>` tipi sayesinde route tablosuna yeni bir
 * çözüm eklenip içeriği yazılmazsa proje DERLENMEZ — eksik sayfa
 * yayına çıkamaz.
 */
import type { SolutionKey } from '@/i18n/routes';
import type { LocalizedSolution } from '../types';

import { finance } from './finance';
import { s4hana } from './s4hana';
import { publicCloud } from './publicCloud';
import { privateCloud } from './privateCloud';
import { ai } from './ai';

export const solutionMeta: Record<SolutionKey, LocalizedSolution> = {
  finance,
  s4hana,
  publicCloud,
  privateCloud,
  ai,
};

/** Ana sayfa kartlarında ve dropdown'da kullanılan ince ikonlar. */
export const solutionIcon: Record<SolutionKey, string> = {
  // Defter / hesap satırları
  finance: 'M3 5h18M3 10h18M3 15h12M3 20h8',
  // Bir durumdan diğerine geçiş
  s4hana: 'M4 7h11m0 0-3-3m3 3-3 3M20 17H9m0 0 3-3m-3 3 3 3',
  // Paylaşılan bulut: dışa açık standart katman
  publicCloud: 'M7 18h9a4 4 0 0 0 .4-7.98A6 6 0 0 0 5 11.5 3.25 3.25 0 0 0 5.5 18H7Z',
  // Kapalı bulut: kendi sınırları içinde
  privateCloud:
    'M7 17h9a3.5 3.5 0 0 0 .35-6.98A5.5 5.5 0 0 0 5.5 10.6 3 3 0 0 0 6 17ZM10 21h4M12 17v4',
  // Düğüm ağı — imza öğesinin küçük yankısı
  ai: 'M12 4v5m0 0-4.5 3M12 9l4.5 3M7.5 12v4m9-4v4M7.5 20h9M5 6h5M14 6h5',
};
