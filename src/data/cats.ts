import type { Locale } from '@/lib/i18n';

export type CatStatus = 'looking' | 'care';
export type CatGender = 'female' | 'male';
export type Cat = {
  slug: string;
  name: string;
  ageMonths: number;
  gender: CatGender;
  status: CatStatus;
  image: string;
  description: Record<Locale, string>;
  personality: Record<Locale, string[]>;
};

export const cats: Cat[] = [
  {
    slug: 'mochi',
    name: 'Mochi',
    ageMonths: 2,
    gender: 'female',
    status: 'looking',
    image: '/images/cat-mochi.webp',
    description: {
      vi: 'Tinh nghịch, tình cảm và tò mò',
      en: 'Playful, affectionate and curious',
    },
    personality: { vi: ['Hiếu động', 'Quấn người', 'Tò mò'], en: ['Playful', 'Affectionate', 'Curious'] },
  },
  {
    slug: 'sunny',
    name: 'Sunny',
    ageMonths: 6,
    gender: 'male',
    status: 'looking',
    image: '/images/cat-sunny.webp',
    description: {
      vi: 'Thân thiện và rất thích con người',
      en: 'Friendly and very fond of people',
    },
    personality: { vi: ['Thân thiện', 'Điềm tĩnh', 'Dễ gần'], en: ['Friendly', 'Calm', 'Sociable'] },
  },
  {
    slug: 'luna',
    name: 'Luna',
    ageMonths: 12,
    gender: 'female',
    status: 'looking',
    image: '/images/cat-luna.webp',
    description: {
      vi: 'Hiền lành, bình tĩnh và ngọt ngào',
      en: 'Gentle, calm and sweet',
    },
    personality: { vi: ['Dịu dàng', 'Tình cảm', 'Thích nghỉ ngơi'], en: ['Gentle', 'Sweet', 'Relaxed'] },
  },
  {
    slug: 'oreo',
    name: 'Oreo',
    ageMonths: 8,
    gender: 'male',
    status: 'looking',
    image: '/images/cat-oreo.webp',
    description: {
      vi: 'Năng động và tràn đầy năng lượng',
      en: 'Energetic and full of vitality',
    },
    personality: { vi: ['Năng động', 'Ham chơi', 'Dạn dĩ'], en: ['Energetic', 'Playful', 'Confident'] },
  },
];
