export type StoryScene = {
  id: string;
  step: string;
  tag: { vi: string; en: string };
  title: { vi: string; en: string };
  caption: { vi: string; en: string };
  metricValue: string;
  metricLabel: { vi: string; en: string };
  image: string;
  imageAlt: { vi: string; en: string };
  ctaLabel: { vi: string; en: string };
  ctaPath: string;
};

export const STORY_SCENES: StoryScene[] = [
  {
    id: 'sanctuary',
    step: '01',
    tag: { vi: 'Cảnh 01 • Nhịp sống ven sông', en: 'Scene 01 • Riverside Sanctuary' },
    title: {
      vi: 'Mỗi sinh linh nhỏ tại Saigon Pearl đều có một câu chuyện đáng lắng nghe',
      en: 'Every quiet paw around Saigon Pearl carries a story worth hearing',
    },
    caption: {
      vi: 'Ghi chép thực địa, theo dõi khu vực sinh hoạt và giữ khoảng cách an toàn để các bé mèo luôn bình tâm.',
      en: 'Field notes, calm observation zones, and respectful coexistence keep community cats safe and unhurried.',
    },
    metricValue: '04',
    metricLabel: { vi: 'Trụ cột chăm sóc cộng đồng', en: 'Community care pillars' },
    image: '/images/hero-clean.webp',
    imageAlt: {
      vi: 'Ảnh minh họa mèo trong không gian xanh yên bình',
      en: 'Illustrative photo of a cat in a calm green setting',
    },
    ctaLabel: { vi: 'Đọc câu chuyện chung', en: 'Read our story' },
    ctaPath: '/about',
  },
  {
    id: 'rescue-care',
    step: '02',
    tag: { vi: 'Cảnh 02 • Tiếp nhận & Thú y', en: 'Scene 02 • Rescue & Vet Care' },
    title: {
      vi: 'Từ sơ cứu an toàn, khám sàng lọc đến triệt sản có trách nhiệm',
      en: 'From safe triage and vet screening to responsible spay & neuter',
    },
    caption: {
      vi: 'Áp dụng quy trình TNR nhân đạo và theo dõi hậu phẫu trước khi tìm nhà foster hoặc mái ấm lâu dài.',
      en: 'Humane TNR protocols and post-op recovery monitoring before foster placement or adoption.',
    },
    metricValue: '08',
    metricLabel: { vi: 'Bước hướng dẫn cứu hộ & chăm sóc', en: 'Rescue & care guide modules' },
    image: '/images/story.webp',
    imageAlt: {
      vi: 'Ảnh minh họa hai bé mèo quấn quýt ấm áp',
      en: 'Illustrative photo of two cats resting warmly together',
    },
    ctaLabel: { vi: 'Xem cẩm nang cứu hộ', en: 'Explore rescue guide' },
    ctaPath: '/rescue',
  },
  {
    id: 'profiles',
    step: '03',
    tag: { vi: 'Cảnh 03 • Hồ sơ minh bạch', en: 'Scene 03 • Transparent Profiles' },
    title: {
      vi: 'Hiểu rõ tính cách, độ tuổi và nhu cầu riêng của từng bé mèo',
      en: 'Know each cat’s temperament, age, and care routine before adopting',
    },
    caption: {
      vi: 'Mỗi hồ sơ ghi rõ trạng thái tìm nhà hoặc đang theo dõi để gia đình nhận nuôi chuẩn bị chu đáo nhất.',
      en: 'Every profile clearly states adoption readiness or ongoing care needs so families can prepare thoughtfully.',
    },
    metricValue: '100%',
    metricLabel: { vi: 'Tư vấn trực tiếp & không thu phí ẩn', en: 'Direct guidance & transparent process' },
    image: '/images/cat-luna.webp',
    imageAlt: {
      vi: 'Ảnh minh họa bé mèo Luna',
      en: 'Illustrative portrait of Luna the cat',
    },
    ctaLabel: { vi: 'Gặp gỡ các bé mèo', en: 'Meet the cats' },
    ctaPath: '/cats',
  },
  {
    id: 'forever-home',
    step: '04',
    tag: { vi: 'Cảnh 04 • Mái ấm lâu dài', en: 'Scene 04 • Forever Homes' },
    title: {
      vi: 'Đồng hành cùng cư dân từ ngày làm quen đến khi bé thật sự thuộc về gia đình',
      en: 'Walking alongside neighbours from first introduction to a lifelong home',
    },
    caption: {
      vi: 'Bạn có thể nhận nuôi, nhận foster tạm thời, hỗ trợ vận chuyển thú y hoặc đóng góp minh bạch.',
      en: 'Adopt, foster temporarily, assist with vet transport, or contribute through verified channels.',
    },
    metricValue: '24/7',
    metricLabel: { vi: 'Cẩm nang mở cho cộng đồng cư dân', en: 'Open community handbook access' },
    image: '/images/cta-community.webp',
    imageAlt: {
      vi: 'Ảnh minh họa kết nối cộng đồng yêu mèo',
      en: 'Illustrative photo of community connection',
    },
    ctaLabel: { vi: 'Tìm hiểu quy trình nhận nuôi', en: 'View adoption guide' },
    ctaPath: '/adopt',
  },
];
