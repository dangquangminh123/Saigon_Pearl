import type { Locale } from '@/lib/i18n';

type TranslatedText = Record<Locale, string>;

export type HomeWheelIcon =
  | 'eye'
  | 'clipboard'
  | 'shield'
  | 'stethoscope'
  | 'heart'
  | 'receipt'
  | 'house'
  | 'users';

export type HomeWheelStep = {
  number: string;
  icon: HomeWheelIcon;
  href: '/rescue' | '/adopt' | '/transparency' | '/get-involved';
  title: TranslatedText;
  description: TranslatedText;
};

export const homeWheelCopy: Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  center: string;
  centerTagline: string;
  detailLabel: string;
  imageLabel: string;
}> = {
  vi: {
    eyebrow: 'SAIGON PEARL PURRS · EVERY PAW DESERVES A HOME',
    title: '8 cách chung tay vì mèo hoang tại Saigon Pearl',
    description:
      'Từ phát hiện một bé mèo cần giúp đỡ đến chăm sóc và kết nối nhận nuôi: mỗi hành động nhỏ đều có thể góp phần tạo nên một mái ấm an toàn.',
    center: 'Saigon Pearl Purrs',
    centerTagline: 'Mỗi bé mèo xứng đáng có một mái ấm',
    detailLabel: 'Tìm hiểu thêm',
    imageLabel: 'Sơ đồ tám hoạt động cộng đồng giúp cứu hộ, chăm sóc và kết nối nhận nuôi mèo tại Saigon Pearl',
  },
  en: {
    eyebrow: 'SAIGON PEARL PURRS · EVERY PAW DESERVES A HOME',
    title: '8 ways to help community cats at Saigon Pearl',
    description:
      'From noticing a cat in need to providing care and connecting responsible adopters, every small action can help create a safer future.',
    center: 'Saigon Pearl Purrs',
    centerTagline: 'Every Paw Deserves a Home.',
    detailLabel: 'Learn more',
    imageLabel: 'Eight-part community infographic on rescuing, caring for, and finding homes for cats in Saigon Pearl',
  },
};

/**
 * Clockwise from the top. Language-specific text stays in source-rendered HTML
 * so search engines and people using assistive technology can read it.
 * These are values the community works towards, NOT unverified claims of
 * completed rescues, medical procedures, or adoption totals.
 */
export const homeWheelSteps: readonly HomeWheelStep[] = [
  {
    number: '01', icon: 'eye', href: '/rescue',
    title: { vi: 'Nhận ra tín hiệu', en: 'Notice the signs' },
    description: {
      vi: 'Quan sát và chia sẻ khi một bé mèo có dấu hiệu cần được giúp đỡ.',
      en: 'Notice when a community cat may need help and share accurate information.',
    },
  },
  {
    number: '02', icon: 'clipboard', href: '/rescue',
    title: { vi: 'Ghi nhận thông tin', en: 'Check the details' },
    description: {
      vi: 'Xác minh vị trí, tình trạng và điều kiện tiếp cận an toàn.',
      en: 'Check the location, condition, and safest way to respond.',
    },
  },
  {
    number: '03', icon: 'shield', href: '/rescue',
    title: { vi: 'Cứu hộ nhân đạo', en: 'Rescue with care' },
    description: {
      vi: 'Ưu tiên an toàn và phương pháp cứu hộ nhẹ nhàng, phù hợp.',
      en: 'Put safety first and use gentle, appropriate rescue methods.',
    },
  },
  {
    number: '04', icon: 'stethoscope', href: '/rescue',
    title: { vi: 'Kết nối thú y', en: 'Seek vet advice' },
    description: {
      vi: 'Tìm hỗ trợ chuyên môn khi mèo cần kiểm tra hoặc điều trị.',
      en: 'Seek qualified veterinary support when a cat needs medical care.',
    },
  },
  {
    number: '05', icon: 'heart', href: '/rescue',
    title: { vi: 'Chăm sóc hồi phục', en: 'Care & recovery' },
    description: {
      vi: 'Tạo môi trường yên tĩnh, kiên nhẫn và quan sát sự hồi phục.',
      en: 'Provide a calm space, patience, and attentive recovery care.',
    },
  },
  {
    number: '06', icon: 'receipt', href: '/transparency',
    title: { vi: 'Minh bạch sẻ chia', en: 'Share transparently' },
    description: {
      vi: 'Hướng đến ghi nhận hỗ trợ và cập nhật chi phí rõ ràng.',
      en: 'Promote clear records of community support and expenses.',
    },
  },
  {
    number: '07', icon: 'house', href: '/adopt',
    title: { vi: 'Tìm mái ấm mới', en: 'Find loving homes' },
    description: {
      vi: 'Kết nối người nhận nuôi phù hợp và có trách nhiệm lâu dài.',
      en: 'Connect cats with suitable, committed adopters.',
    },
  },
  {
    number: '08', icon: 'users', href: '/get-involved',
    title: { vi: 'Cộng đồng đồng hành', en: 'Grow the community' },
    description: {
      vi: 'Cùng cư dân lan tỏa thông tin và chăm sóc mèo một cách tử tế.',
      en: 'Help neighbors share knowledge and care for community cats.',
    },
  },
];
