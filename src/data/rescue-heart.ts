import type { Locale } from '@/lib/i18n';

export type RescueHeartPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export type RescueHeartIcon = 'clipboard' | 'shield' | 'stethoscope' | 'house';

export type RescueHeartStep = {
  id: string;
  order: string;
  position: RescueHeartPosition;
  icon: RescueHeartIcon;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

/**
 * These are community principles, not claims that a rescue service is
 * already operating 24/7 or that any particular cat has received treatment.
 */
export const rescueHeartSteps: readonly RescueHeartStep[] = [
  {
    id: 'report-and-assess', order: '01', position: 'topLeft', icon: 'clipboard',
    title: { vi: 'Báo tin & đánh giá', en: 'Report & assess' },
    description: {
      vi: 'Chia sẻ tình trạng mèo cần giúp đỡ và xác minh thông tin trước khi hành động.',
      en: 'Share what the cat needs and verify the situation before taking action.',
    },
  },
  {
    id: 'safe-rescue', order: '02', position: 'topRight', icon: 'shield',
    title: { vi: 'Cứu hộ an toàn', en: 'Rescue with care' },
    description: {
      vi: 'Ưu tiên an toàn của người và mèo, tìm hỗ trợ phù hợp khi cần thiết.',
      en: 'Keep people and cats safe, and seek appropriate help when needed.',
    },
  },
  {
    id: 'recovery-and-care', order: '03', position: 'bottomLeft', icon: 'stethoscope',
    title: { vi: 'Chăm sóc phục hồi', en: 'Care & recovery' },
    description: {
      vi: 'Theo dõi sức khỏe và tham khảo bác sĩ thú y khi mèo bị thương hoặc mắc bệnh.',
      en: 'Monitor wellbeing and consult a veterinarian when a cat is hurt or unwell.',
    },
  },
  {
    id: 'responsible-adoption', order: '04', position: 'bottomRight', icon: 'house',
    title: { vi: 'Kết nối mái ấm', en: 'Find a safe home' },
    description: {
      vi: 'Chia sẻ hồ sơ đã xác minh và kết nối người nhận nuôi có trách nhiệm.',
      en: 'Share verified cat profiles and connect with responsible adopters.',
    },
  },
] as const;

export const rescueHeartCopy: Record<Locale, {
  heading: string;
  diagramLabel: string;
  center: string;
  centerSmall: string;
  mobileMore: string;
}> = {
  vi: {
    heading: 'Cộng đồng Saigon Pearl cùng cứu hộ, chăm sóc và tìm mái ấm cho mèo',
    diagramLabel: 'Bốn nguyên tắc cộng đồng Saigon Pearl Purrs cùng thực hiện để hỗ trợ mèo cần giúp đỡ',
    center: 'Vì mỗi bé mèo',
    centerSmall: 'Saigon Pearl Purrs',
    mobileMore: 'Tìm hiểu bốn cách cùng chung tay',
  },
  en: {
    heading: 'How Saigon Pearl Purrs supports community cats through rescue, care and adoption',
    diagramLabel: 'Four community principles for helping cats in need at Saigon Pearl',
    center: 'Every paw matters',
    centerSmall: 'Saigon Pearl Purrs',
    mobileMore: 'Four ways we can help together',
  },
};
