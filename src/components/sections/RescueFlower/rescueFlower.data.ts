import type { Locale } from '@/lib/i18n';

export type FlowerStep = {
  id: string;
  number: string;
  icon: 'hand-heart' | 'life-buoy' | 'stethoscope' | 'house' | 'paw-print' | 'clipboard-list' | 'users-round' | 'heart';
  href: '/rescue' | '/adopt' | '/get-involved' | '/transparency' | '/about';
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export const rescueFlowerSteps: readonly FlowerStep[] = [
  {
    id: 'daily-care', number: '01', icon: 'hand-heart', href: '/rescue',
    title: { vi: 'Chăm sóc mỗi ngày', en: 'Everyday care' },
    description: {
      vi: 'Cùng quan sát, chăm sóc phù hợp và giữ môi trường an toàn cho mèo cộng đồng.',
      en: 'Together, we can observe, care responsibly and keep community cats safe.',
    },
  },
  {
    id: 'rescue', number: '02', icon: 'life-buoy', href: '/rescue',
    title: { vi: 'Kết nối cứu hộ', en: 'Rescue support' },
    description: {
      vi: 'Chia sẻ thông tin đáng tin cậy khi phát hiện một bé mèo đang gặp nguy hiểm.',
      en: 'Share reliable information when a cat is hurt or in immediate danger.',
    },
  },
  {
    id: 'health', number: '03', icon: 'stethoscope', href: '/rescue',
    title: { vi: 'Ưu tiên sức khỏe', en: 'Health comes first' },
    description: {
      vi: 'Khuyến khích chăm sóc thú y, phòng bệnh và triệt sản khi điều kiện cho phép.',
      en: 'Encourage veterinary care, prevention and humane sterilization where feasible.',
    },
  },
  {
    id: 'foster', number: '04', icon: 'house', href: '/get-involved',
    title: { vi: 'Chỗ ở tạm an toàn', en: 'Safe foster homes' },
    description: {
      vi: 'Tìm kiếm sự đồng hành để các bé cần giúp đỡ có nơi nghỉ ngơi phù hợp.',
      en: 'Connect with neighbors who may offer a calm, suitable place to recover.',
    },
  },
  {
    id: 'adoption', number: '05', icon: 'paw-print', href: '/adopt',
    title: { vi: 'Tìm mái ấm mới', en: 'A forever home' },
    description: {
      vi: 'Kết nối nhận nuôi có trách nhiệm bằng thông tin từng bé được xác minh.',
      en: 'Support responsible adoption using verified details about each cat.',
    },
  },
  {
    id: 'transparency', number: '06', icon: 'clipboard-list', href: '/transparency',
    title: { vi: 'Minh bạch đóng góp', en: 'Open & transparent' },
    description: {
      vi: 'Đề cao việc ghi nhận nhu cầu, đóng góp và chi phí rõ ràng, có kiểm chứng.',
      en: 'Value clear, verifiable records of needs, contributions and expenses.',
    },
  },
  {
    id: 'volunteers', number: '07', icon: 'users-round', href: '/get-involved',
    title: { vi: 'Cộng đồng chung tay', en: 'Neighbors together' },
    description: {
      vi: 'Dành một chút thời gian, chia sẻ tin hữu ích hoặc tham gia tình nguyện.',
      en: 'Give some time, share useful information or join the volunteer effort.',
    },
  },
  {
    id: 'stories', number: '08', icon: 'heart', href: '/about',
    title: { vi: 'Lan tỏa yêu thương', en: 'Spread compassion' },
    description: {
      vi: 'Mỗi bé mèo đều xứng đáng có cơ hội sống an toàn và được yêu thương.',
      en: 'Every cat deserves a chance to live safely and be loved.',
    },
  },
];

export const rescueFlowerCopy: Record<Locale, {
  eyebrow: string; title: string; intro: string; centerLine: string; centerSubtitle: string;
  stepLabel: string; actionLabel: string; ariaLabel: string;
}> = {
  vi: {
    eyebrow: 'CÙNG NHAU VÌ NHỮNG BÀN CHÂN BÉ NHỎ',
    title: '8 cách cộng đồng Saigon Pearl cùng chăm sóc và tìm mái ấm cho mèo',
    intro: 'Từ một lời báo tin đến một mái ấm an toàn: hành trình cứu hộ và nhận nuôi mèo bắt đầu từ sự quan tâm của mỗi người.',
    centerLine: 'Vì mỗi bé mèo',
    centerSubtitle: 'Every Paw Deserves a Home.',
    stepLabel: 'BƯỚC',
    actionLabel: 'Tìm hiểu thêm về',
    ariaLabel: 'Tám hướng chung tay cùng cộng đồng cứu hộ mèo Saigon Pearl Purrs',
  },
  en: {
    eyebrow: 'TOGETHER FOR EVERY LITTLE PAW',
    title: '8 ways the Saigon Pearl community can help cats find safety and a home',
    intro: 'From reporting a cat in need to opening a safe home: rescue and responsible adoption begin with small acts of care.',
    centerLine: 'For every paw',
    centerSubtitle: 'Every Paw Deserves a Home.',
    stepLabel: 'STEP',
    actionLabel: 'Learn more about',
    ariaLabel: 'Eight ways to help community cats through Saigon Pearl Purrs',
  },
};
