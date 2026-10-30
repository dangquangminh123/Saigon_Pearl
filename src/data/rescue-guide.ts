import type { Locale } from '@/lib/i18n';

export type GuideCategory = 'all' | 'symptoms' | 'first-aid' | 'tnr' | 'protocol';

export type GuideArticle = {
  id: string;
  category: GuideCategory;
  categoryLabel: Record<Locale, string>;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  date: string;
  readTime: Record<Locale, string>;
  image: string;
  alt: Record<Locale, string>;
  contentDetails?: Record<Locale, string[]>;
  featured?: boolean;
};

export type RescueData = {
  breadcrumb: string;
  sticker: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  filterCategories: { key: GuideCategory; label: string }[];
  readMore: string;
  featuredBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  noteTitle: string;
  noteText: string;
};

export const rescueData: Record<Locale, RescueData> = {
  vi: {
    breadcrumb: 'Cứu hộ & Chăm sóc',
    sticker: 'Cẩm nang sơ cứu & bảo vệ sức khỏe mèo hoang',
    titlePrefix: 'Cẩm nang',
    titleHighlight: 'cứu hộ & chăm sóc',
    subtitle:
      'Hướng dẫn quan sát, nhận diện triệu chứng bệnh ở mèo hoang, xử lý sơ cấp cứu ban đầu an toàn và quy trình phối hợp đưa bé đến thú y tại Saigon Pearl.',
    filterCategories: [
      { key: 'all', label: 'Tất cả hướng dẫn' },
      { key: 'symptoms', label: 'Dấu hiệu nguy cấp' },
      { key: 'first-aid', label: 'Sơ cứu & Chăm sóc' },
      { key: 'tnr', label: 'Triệt sản & Tiêm phòng' },
      { key: 'protocol', label: 'Quy trình cứu hộ' },
    ],
    readMore: 'Đọc hướng dẫn →',
    featuredBadge: 'HƯỚNG DẪN KHẨN CẤP TIÊU ĐIỂM',
    faqTitle: 'Xử lý tình huống khẩn cấp thường gặp',
    faqSubtitle: 'Những thắc mắc phổ biến khi phát hiện mèo hoang bị thương hoặc cần giúp đỡ tại Saigon Pearl.',
    faqs: [
      {
        question: 'Khi thấy mèo bị thương ở hầm xe hoặc khuôn viên Saigon Pearl, việc đầu tiên cần làm là gì?',
        answer:
          'Giữ khoảng cách an toàn, bình tĩnh quan sát. Không cố đuổi bắt hoặc ôm ghì khiến mèo hoảng loạn tấn công hoặc chạy trốn vào gầm máy xe. Chụp lại ảnh/video rõ vị trí, biểu hiện rồi liên hệ ngay ban quản lý hoặc nhóm cư dân tình nguyện để được hỗ trợ lồng vận chuyển chuyên dụng.',
      },
      {
        question: 'Có nên tự ý cho mèo hoang uống thuốc giảm đau hay hạ sốt của người không?',
        answer:
          'TUYỆT ĐỐI KHÔNG. Các loại thuốc người như Paracetamol (Panadol), Aspirin cực kỳ độc đối với loài mèo, chỉ một lượng nhỏ cũng có thể gây suy gan cấp và tử vong trong vài giờ. Mọi loại thuốc bắt buộc phải có chỉ định từ bác sĩ thú y.',
      },
      {
        question: 'Làm thế nào để bắt mèo đang hoảng sợ đưa đi cấp cứu mà không làm bé bị thương?',
        answer:
          'Dùng một chiếc khăn tắm dày hoặc chăn mỏng trùm nhẹ lên toàn bộ cơ thể bé từ phía sau để che tầm nhìn, sau đó nhẹ nhàng bế cả bọc đặt vào lồng vận chuyển (carrier) đã lót sẵn khăn mềm. Tránh dùng tay không bắt trực tiếp khi mèo đang đau đớn.',
      },
      {
        question: 'Kinh phí cứu hộ và điều trị y tế cho các bé mèo tại Saigon Pearl được vận hành ra sao?',
        answer:
          'Dự án hoạt động phi lợi nhuận dựa trên sự đóng góp minh bạch của cư dân. Mọi khoản chi phí thú y, hóa đơn, hồ sơ bệnh án và tiến trình điều trị đều được lưu trữ đầy đủ, đối chiếu chứng từ trước khi công bố trên trang Minh bạch.',
      },
    ],
    ctaTitle: 'Phát hiện một bé mèo cần cứu hộ khẩn cấp?',
    ctaSubtitle:
      'Hãy giữ bình tĩnh, bảo đảm an toàn cho bản thân và bé mèo, sau đó gửi thông tin vị trí và tình trạng ngay cho chúng tôi.',
    ctaPrimary: 'Gửi thông tin cứu hộ',
    ctaSecondary: 'Xem nguyên tắc minh bạch',
    noteTitle: 'Lưu ý y tế quan trọng:',
    noteText:
      'Website mang tính chất cẩm nang sơ cứu và hỗ trợ cộng đồng. Trường hợp mèo bị tai nạn nặng, chảy máu liên tục, co giật hoặc khó thở, hãy ưu tiên đưa bé đến cơ sở thú y gần nhất ngay lập tức.',
  },
  en: {
    breadcrumb: 'Rescue & Care',
    sticker: 'Emergency First Aid & Health Guide for Community Cats',
    titlePrefix: 'Handbook for',
    titleHighlight: 'rescue & care',
    subtitle:
      'Guides on observing cats, recognizing critical illness symptoms, safe initial first aid, and community rescue protocols at Saigon Pearl.',
    filterCategories: [
      { key: 'all', label: 'All Guides' },
      { key: 'symptoms', label: 'Critical Symptoms' },
      { key: 'first-aid', label: 'First Aid & Care' },
      { key: 'tnr', label: 'TNR & Vaccination' },
      { key: 'protocol', label: 'Rescue Protocol' },
    ],
    readMore: 'Read guide →',
    featuredBadge: 'FEATURED EMERGENCY GUIDE',
    faqTitle: 'Frequently Asked Emergency Questions',
    faqSubtitle: 'Common questions when finding an injured or distressed stray cat around Saigon Pearl.',
    faqs: [
      {
        question: 'What is the very first step when finding an injured cat in the basement or garden?',
        answer:
          'Stay calm and keep a safe distance. Do not chase or corner the cat, which may cause panic and make it hide deeper inside car engines. Take a clear photo or short video of its location and physical state, then contact our volunteer group or building reception for a proper carrier.',
      },
      {
        question: 'Can I give human painkillers or fever medicine to an outdoor cat?',
        answer:
          'ABSOLUTELY NOT. Human medications like Paracetamol (Tylenol/Panadol) and Aspirin are lethal to felines, causing acute liver failure and fatal toxicity within hours even in tiny doses. Only licensed veterinarians should prescribe medication.',
      },
      {
        question: 'How do I safely contain a terrified, injured cat for veterinary transport?',
        answer:
          'Use a large, thick towel or blanket to gently cover the cat from behind to obscure its vision, then gently wrap and guide it into a secure carrier pre-lined with soft fabric. Never attempt bare-handed capture when a cat is in severe pain.',
      },
      {
        question: 'How are veterinary treatment funds handled for Saigon Pearl cats?',
        answer:
          'The project operates completely non-profit on voluntary resident support. All clinic invoices, medical charts, and expense receipts are verified and published openly on our Transparency page.',
      },
    ],
    ctaTitle: 'Found a cat in urgent need of medical attention?',
    ctaSubtitle:
      'Keep calm, ensure immediate safety, and reach out to report the location and symptoms so we can coordinate support.',
    ctaPrimary: 'Report a Cat in Need',
    ctaSecondary: 'Transparency Promise',
    noteTitle: 'Important Medical Note:',
    noteText:
      'This handbook provides general community first aid knowledge. In cases of major trauma, active bleeding, seizures, or respiratory distress, please rush the cat to the nearest veterinary clinic immediately.',
  },
};

export const guideArticles: GuideArticle[] = [
  {
    id: 'critical-symptoms-emergency',
    category: 'symptoms',
    featured: true,
    categoryLabel: {
      vi: 'Dấu hiệu nguy cấp',
      en: 'Critical Symptoms',
    },
    title: {
      vi: '8 dấu hiệu nguy cấp ở mèo cần đưa đến phòng khám thú y ngay lập tức',
      en: '8 critical warning signs that require immediate emergency veterinary care',
    },
    summary: {
      vi: 'Bỏ ăn quá 24 giờ, thở gấp há miệng, hạ thân nhiệt, nôn liên tục hoặc co giật — những dấu hiệu báo động đỏ không nên chờ đợi xem sao.',
      en: 'Refusing food for over 24 hours, open-mouth panting, hypothermia, continuous vomiting or seizures — red flag symptoms that cannot wait.',
    },
    date: '10/09/2026',
    readTime: { vi: '4 phút đọc', en: '4 min read' },
    image: '/images/hero-clean.webp',
    alt: {
      vi: 'Ảnh minh họa một bé mèo đang được theo dõi sức khỏe',
      en: 'Illustrative photo of a cat under medical observation',
    },
  },
  {
    id: 'first-aid-trauma-falls',
    category: 'first-aid',
    categoryLabel: {
      vi: 'Sơ cứu & Chăm sóc',
      en: 'First Aid & Care',
    },
    title: {
      vi: 'Cách sơ cứu an toàn cho mèo bị chấn thương do ngã cao hoặc va quẹt xe',
      en: 'Safe first-aid protocol for cats suffering falls or vehicle trauma',
    },
    summary: {
      vi: 'Cách cố định cột sống tạm thời, cầm máu bằng gạc vô trùng và giữ ấm cho bé trong quá trình di chuyển đến cơ sở thú y.',
      en: 'Temporary spinal stabilization, sterile gauze pressure for bleeding, and keeping the body warm during transport.',
    },
    date: '28/08/2026',
    readTime: { vi: '5 phút đọc', en: '5 min read' },
    image: '/images/cta-care.webp',
    alt: {
      vi: 'Chăm sóc và bảo bọc mèo bị thương',
      en: 'Caring for an injured cat safely',
    },
  },
  {
    id: 'kitten-emergency-care',
    category: 'first-aid',
    categoryLabel: {
      vi: 'Sơ cứu & Chăm sóc',
      en: 'First Aid & Care',
    },
    title: {
      vi: 'Chăm sóc mèo con mất mẹ dưới 4 tuần tuổi: Giữ ấm, sữa chuyên dụng và kích tiêu',
      en: 'Neonatal kitten care under 4 weeks: Warmth, kitten milk replacer and stimulation',
    },
    summary: {
      vi: 'Mèo con dưới 1 tháng tuổi chưa tự điều hòa thân nhiệt được. Hướng dẫn pha sữa KMR đúng nhiệt độ và kích thích đi vệ sinh an toàn.',
      en: 'Kittens under one month cannot regulate body temperature. Practical guides on KMR milk formula and gentle elimination stimulation.',
    },
    date: '15/08/2026',
    readTime: { vi: '4 phút đọc', en: '4 min read' },
    image: '/images/cat-mochi.webp',
    alt: {
      vi: 'Mèo con cần chăm sóc đặc biệt',
      en: 'Kitten needing specialized care',
    },
  },
  {
    id: 'tnr-sterilization-guide',
    category: 'tnr',
    categoryLabel: {
      vi: 'Triệt sản & Tiêm phòng',
      en: 'TNR & Vaccination',
    },
    title: {
      vi: 'Chương trình TNR: Vì sao triệt sản nhân đạo là giải pháp bền vững cho Saigon Pearl',
      en: 'TNR Program: Why humane trap-neuter-return is the lasting solution for Saigon Pearl',
    },
    summary: {
      vi: 'Bẫy nhân đạo, triệt sản y tế, bấm tai đánh dấu và thả về môi trường cũ giúp kiểm soát đàn mèo văn minh và giảm xung đột cộng đồng.',
      en: 'Human trap, sterile surgery, ear-tipping identification, and return to environment for humane population control.',
    },
    date: '02/08/2026',
    readTime: { vi: '6 phút đọc', en: '6 min read' },
    image: '/images/cta-community.webp',
    alt: {
      vi: 'Chương trình kiểm soát nhân đạo cho mèo cộng đồng',
      en: 'Humane management program for community cats',
    },
  },
  {
    id: 'feline-parvo-panleukopenia',
    category: 'symptoms',
    categoryLabel: {
      vi: 'Dấu hiệu nguy cấp',
      en: 'Critical Symptoms',
    },
    title: {
      vi: 'Nhận biết bệnh Giảm Bạch Cầu (FPV) ở mèo: Cách ly khẩn cấp và khử khuẩn môi trường',
      en: 'Recognizing Feline Panleukopenia (FPV): Immediate quarantine and disinfection',
    },
    summary: {
      vi: 'Sốt cao, ủ rũ ngồi gục đầu bên bát nước, nôn bọt vàng và tiêu chảy tanh. Cần cách ly ngay lập tức để không lây lan cho đàn mèo khác.',
      en: 'High fever, lethargy hunched over water bowls, yellow vomiting, and foul diarrhea. Immediate quarantine is vital.',
    },
    date: '20/07/2026',
    readTime: { vi: '5 phút đọc', en: '5 min read' },
    image: '/images/cat-luna.webp',
    alt: {
      vi: 'Theo dõi triệu chứng bệnh ở mèo',
      en: 'Observing cat symptoms carefully',
    },
  },
  {
    id: 'community-rescue-handbook',
    category: 'protocol',
    categoryLabel: {
      vi: 'Quy trình cứu hộ',
      en: 'Rescue Protocol',
    },
    title: {
      vi: 'Quy trình 4 bước tiếp nhận và điều phối ca cứu hộ mèo giữa các cư dân',
      en: '4-step protocol for receiving and coordinating stray cat rescue among residents',
    },
    summary: {
      vi: 'Từ quan sát ghi nhận thông tin, chuẩn bị dụng cụ an toàn, đưa đi khám thú y đến phân công người nuôi tạm (foster) chăm sóc phục hồi.',
      en: 'From logging observational details, assembling safe gear, veterinary triage, to assigning dedicated foster volunteers.',
    },
    date: '05/07/2026',
    readTime: { vi: '4 phút đọc', en: '4 min read' },
    image: '/images/story.webp',
    alt: {
      vi: 'Quy trình kết nối cứu hộ và đồng hành',
      en: 'Community rescue coordination process',
    },
  },
  {
    id: 'nutrition-safe-feeding',
    category: 'first-aid',
    categoryLabel: {
      vi: 'Sơ cứu & Chăm sóc',
      en: 'First Aid & Care',
    },
    title: {
      vi: 'Nguyên tắc cho mèo hoang ăn văn minh: Vệ sinh sạch sẽ, đúng giờ và đúng vị trí',
      en: 'Responsible outdoor feeding etiquette: Clean spots, fixed times, and proper diet',
    },
    summary: {
      vi: 'Tránh để thức ăn thừa qua đêm thu hút chuột và côn trùng. Dọn sạch đĩa bát sau khi mèo ăn xong để giữ gìn môi trường sống chung của cư dân.',
      en: 'Avoid leaving uneaten food overnight that attracts pests. Always clean bowls after feeding to respect neighbor shared spaces.',
    },
    date: '18/06/2026',
    readTime: { vi: '3 phút đọc', en: '3 min read' },
    image: '/images/cat-oreo.webp',
    alt: {
      vi: 'Cho mèo ăn có trách nhiệm và giữ vệ sinh',
      en: 'Feeding community cats responsibly and cleanly',
    },
  },
];

