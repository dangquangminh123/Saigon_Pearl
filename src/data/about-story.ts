import type { Locale } from '@/lib/i18n';

type StoryCopy = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroFootnote: string;
  introEyebrow: string;
  introTitle: string;
  introText: string[];
  introButton: string;
  valuesEyebrow: string;
  valuesTitle: string;
  values: { title: string; description: string }[];
  chaptersEyebrow: string;
  chaptersTitle: string;
  chapters: { number: string; title: string; text: string; image: string; alt: string }[];
  quote: string;
  quoteCaption: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryLead: string;
  galleryNotice: string;
  gallery: { src: string; alt: string; caption: string }[];
  galleryOpen: string;
  galleryClose: string;
  galleryPrevious: string;
  galleryNext: string;
  stepsEyebrow: string;
  stepsTitle: string;
  steps: { title: string; description: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

// Ảnh bên dưới đã có trong repository, nhưng CHỈ LÀ ẢNH MINH HỌA.
// Khi được đồng ý sử dụng ảnh thật tại Saigon Pearl, thay đường dẫn ở đây.
export const aboutStory: Record<Locale, StoryCopy> = {
  vi: {
    breadcrumb: 'Câu chuyện',
    eyebrow: 'CÂU CHUYỆN CỦA SAIGON PEARL PURRS',
    title: 'Từ một chút quan tâm, thành một cộng đồng yêu thương.',
    lead: 'Mỗi bé mèo đều xứng đáng được sống an toàn, được chăm sóc tử tế và có cơ hội tìm thấy mái ấm.',
    heroFootnote: 'Every Paw Deserves a Home.',
    introEyebrow: 'CHÚNG MÌNH LÀ AI?',
    introTitle: 'Một cộng đồng bắt đầu ngay nơi chúng ta sống.',
    introText: [
      'Saigon Pearl Purrs là một sáng kiến cộng đồng phi lợi nhuận hướng tới kết nối cư dân yêu mèo tại Saigon Pearl, TP. Hồ Chí Minh.',
      'Chúng mình mong muốn cùng nhau hỗ trợ mèo cộng đồng bằng những việc thiết thực: quan sát đúng cách, kết nối chăm sóc y tế khi cần, tìm người nuôi dưỡng và chia sẻ thông tin có trách nhiệm.',
      'Đây không chỉ là câu chuyện cứu hộ. Đó còn là cách hàng xóm tin tưởng, tôn trọng và hỗ trợ nhau vì những sinh linh bé nhỏ.',
    ],
    introButton: 'Cùng tham gia',
    valuesEyebrow: 'ĐIỀU CHÚNG MÌNH TIN',
    valuesTitle: 'Bốn giá trị giữ tình thương đi đúng hướng',
    values: [
      { title: 'Yêu thương', description: 'Lắng nghe nhu cầu của từng bé mèo; chăm sóc bằng sự kiên nhẫn và tử tế.' },
      { title: 'Trách nhiệm', description: 'Ưu tiên sức khỏe, an toàn và phúc lợi động vật trước mọi quyết định.' },
      { title: 'Minh bạch', description: 'Chỉ công bố hồ sơ, chi phí và kết quả khi thông tin đã được xác minh.' },
      { title: 'Cộng đồng', description: 'Mỗi cư dân góp một chút thời gian, kỹ năng hoặc sự kết nối phù hợp.' },
    ],
    chaptersEyebrow: 'HÀNH TRÌNH CHÚNG MÌNH HƯỚNG TỚI',
    chaptersTitle: 'Một câu chuyện được viết bằng những hành động nhỏ',
    chapters: [
      { number: '01', title: 'Nhìn thấy và quan tâm', text: 'Mọi hành trình có thể bắt đầu từ việc nhận ra một bé mèo đang cần được hỗ trợ, quan sát an toàn và chia sẻ thông tin đúng người.', image: '/images/story.webp', alt: 'Ảnh minh họa hai bé mèo trong không gian xanh' },
      { number: '02', title: 'Chăm sóc bằng sự phối hợp', text: 'Cư dân có thể cùng tìm cách hỗ trợ phù hợp: nước sạch, thức ăn đúng nơi, kết nối bác sĩ thú y, hoặc người chăm sóc có kinh nghiệm.', image: '/images/cta-care.webp', alt: 'Ảnh minh họa chủ đề chăm sóc động vật' },
      { number: '03', title: 'Tìm một mái ấm an toàn', text: 'Khi phù hợp, dự án mong muốn kết nối những người nhận nuôi có trách nhiệm, chuẩn bị thông tin rõ ràng và đặt lợi ích lâu dài của mèo lên trước.', image: '/images/cta-adopt.webp', alt: 'Ảnh minh họa chủ đề nhận nuôi có trách nhiệm' },
    ],
    quote: 'Có những thay đổi lớn bắt đầu bằng một bát nước sạch và một người chịu dừng lại quan tâm.',
    quoteCaption: 'Tinh thần của Saigon Pearl Purrs',
    galleryEyebrow: 'NHỮNG KHOẢNH KHẮC ĐÁNG TRÂN TRỌNG',
    galleryTitle: 'Một góc nhìn gần hơn về thế giới của các bé mèo',
    galleryLead: 'Không cần hình ảnh cầu kỳ. Điều chạm đến trái tim là những khoảnh khắc giản dị, gần gũi và chân thực.',
    galleryNotice: 'Ảnh hiện tại chỉ để minh họa bố cục. Chưa phải ảnh hay hồ sơ cứu hộ được xác minh tại Saigon Pearl.',
    gallery: [
      { src: '/images/hero-clean.webp', alt: 'Ảnh mèo ngoài trời dùng để minh họa', caption: 'Một góc bình yên' },
      { src: '/images/cat-mochi.webp', alt: 'Ảnh minh họa một bé mèo nhỏ', caption: 'Một ánh nhìn tò mò' },
      { src: '/images/story.webp', alt: 'Ảnh minh họa hai bé mèo', caption: 'Có nhau trong hành trình' },
      { src: '/images/cta-community.webp', alt: 'Ảnh minh họa chủ đề cộng đồng', caption: 'Cùng nhau quan tâm' },
      { src: '/images/cat-luna.webp', alt: 'Ảnh mèo dùng để minh họa', caption: 'Một giây phút an yên' },
      { src: '/images/cat-oreo.webp', alt: 'Ảnh mèo dùng để minh họa', caption: 'Mỗi bé một tính cách' },
    ],
    galleryOpen: 'Xem ảnh', galleryClose: 'Đóng ảnh', galleryPrevious: 'Ảnh trước', galleryNext: 'Ảnh tiếp theo',
    stepsEyebrow: 'CÁCH CHÚNG MÌNH MUỐN HOẠT ĐỘNG',
    stepsTitle: 'Từ sự quan tâm đến hành động có trách nhiệm',
    steps: [
      { title: 'Ghi nhận', description: 'Quan sát và chia sẻ thông tin, không tự ý tiếp cận mèo đang hoảng sợ.' },
      { title: 'Kết nối', description: 'Liên hệ những người có thể hỗ trợ an toàn, phù hợp.' },
      { title: 'Cập nhật', description: 'Theo dõi tình trạng và chỉ chia sẻ thông tin đã kiểm chứng.' },
      { title: 'Đồng hành', description: 'Chăm sóc lâu dài hoặc hỗ trợ tìm mái ấm khi đủ điều kiện.' },
    ],
    ctaEyebrow: 'BẠN CŨNG LÀ MỘT PHẦN CỦA CÂU CHUYỆN',
    ctaTitle: 'Một hành động nhỏ hôm nay có thể mở ra một mái ấm ngày mai.',
    ctaText: 'Dành thời gian, chia sẻ kỹ năng, tìm hiểu về nhận nuôi hoặc lan tỏa thông điệp đến những người hàng xóm.',
    ctaPrimary: 'Tham gia cộng đồng', ctaSecondary: 'Tìm hiểu nhận nuôi',
  },
  en: {
    breadcrumb: 'Our Story',
    eyebrow: 'THE STORY OF SAIGON PEARL PURRS',
    title: 'A little kindness can grow into a caring community.',
    lead: 'Every cat deserves safety, compassionate care, and a chance to find a loving home.',
    heroFootnote: 'Every Paw Deserves a Home.',
    introEyebrow: 'WHO WE ARE',
    introTitle: 'A community that starts where we live.',
    introText: [
      'Saigon Pearl Purrs is a nonprofit community initiative designed to bring cat-loving residents together in Saigon Pearl, Ho Chi Minh City.',
      'We hope to support community cats through practical acts: safe observation, appropriate veterinary connections, foster care and responsible information sharing.',
      'This is more than rescue. It is about building trust and solidarity among neighbors, with compassion for every little life.',
    ],
    introButton: 'Get involved',
    valuesEyebrow: 'WHAT WE BELIEVE',
    valuesTitle: 'Four values guiding our community',
    values: [
      { title: 'Compassion', description: 'Respect each cat’s needs and respond with kindness and patience.' },
      { title: 'Responsibility', description: 'Put health, safety and animal welfare first.' },
      { title: 'Transparency', description: 'Publish case details and financial information only when verified.' },
      { title: 'Community', description: 'Everyone can contribute time, skills or meaningful connections.' },
    ],
    chaptersEyebrow: 'THE JOURNEY WE ENVISION',
    chaptersTitle: 'A story shaped by small, thoughtful actions',
    chapters: [
      { number: '01', title: 'Notice and care', text: 'Every journey may begin with noticing a cat in need, observing safely and sharing the right information with the right people.', image: '/images/story.webp', alt: 'Illustrative photo of two cats among greenery' },
      { number: '02', title: 'Care together', text: 'Neighbors may help with water, responsible feeding, veterinary support or connections to experienced caregivers.', image: '/images/cta-care.webp', alt: 'Illustrative image about animal care' },
      { number: '03', title: 'Find a safe home', text: 'Where suitable, we hope to connect cats with responsible adopters, share verified information and prioritize long-term welfare.', image: '/images/cta-adopt.webp', alt: 'Illustrative image about responsible adoption' },
    ],
    quote: 'Big changes can begin with a bowl of clean water and someone willing to stop and care.',
    quoteCaption: 'The spirit of Saigon Pearl Purrs',
    galleryEyebrow: 'MOMENTS THAT MATTER',
    galleryTitle: 'A closer look at the world of community cats',
    galleryLead: 'Real emotion comes from everyday moments, captured simply and honestly.',
    galleryNotice: 'Current images are illustrative layout placeholders, not verified photographs or rescue records from Saigon Pearl.',
    gallery: [
      { src: '/images/hero-clean.webp', alt: 'Illustrative photo of a cat outdoors', caption: 'A quiet corner' },
      { src: '/images/cat-mochi.webp', alt: 'Illustrative photo of a young cat', caption: 'A curious gaze' },
      { src: '/images/story.webp', alt: 'Illustrative photo of two cats', caption: 'Not alone' },
      { src: '/images/cta-community.webp', alt: 'Illustrative community image', caption: 'Showing up together' },
      { src: '/images/cat-luna.webp', alt: 'Illustrative cat photograph', caption: 'A peaceful moment' },
      { src: '/images/cat-oreo.webp', alt: 'Illustrative cat photograph', caption: 'Every cat is unique' },
    ],
    galleryOpen: 'View photo', galleryClose: 'Close photo', galleryPrevious: 'Previous photo', galleryNext: 'Next photo',
    stepsEyebrow: 'OUR INTENDED APPROACH',
    stepsTitle: 'From kindness to responsible action',
    steps: [
      { title: 'Observe', description: 'Record useful details; do not approach a distressed cat unsafely.' },
      { title: 'Connect', description: 'Find appropriate, experienced people who can help.' },
      { title: 'Update', description: 'Follow progress and share only checked information.' },
      { title: 'Support', description: 'Provide ongoing care or seek an appropriate home when ready.' },
    ],
    ctaEyebrow: 'YOU ARE PART OF THE STORY',
    ctaTitle: 'A small act today may open the door to a home tomorrow.',
    ctaText: 'Give your time, share a skill, learn about adoption or help spread the word to your neighbors.',
    ctaPrimary: 'Get involved', ctaSecondary: 'Explore adoption',
  },
};
