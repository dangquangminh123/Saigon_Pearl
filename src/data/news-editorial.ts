import type { Locale } from '@/lib/i18n';

export type NewsTopic = 'all' | 'adoption' | 'rescue' | 'community';
export type ActualNewsTopic = Exclude<NewsTopic, 'all'>;

export const newsTopics: NewsTopic[] = [
  'all',
  'adoption',
  'rescue',
  'community',
];

// Dùng slug thật từ src/data/articles.ts; mỗi bài phải được phân loại rõ.
const topicBySlug: Record<string, ActualNewsTopic> = {
  'prepare-for-adoption': 'adoption',
  'found-a-stray-cat': 'rescue',
  'responsible-community-care': 'community',
};

export function topicForArticle(slug: string): ActualNewsTopic {
  const topic = topicBySlug[slug];
  if (!topic) {
    // Default fallback to community if unmapped
    return 'community';
  }
  return topic;
}

// Đừng ghi ngày xuất bản giả. Khi đã xuất bản thật, thêm ISO 8601.
export const newsEditorial: Record<string, {
  publishedAt?: string;
  updatedAt?: string;
  imageVerified: boolean;
  imageAlt?: Record<Locale, string>;
}> = {
  'prepare-for-adoption': { imageVerified: false },
  'found-a-stray-cat': { imageVerified: false },
  'responsible-community-care': { imageVerified: false },
};

export const newsCopy: Record<Locale, {
  home: string;
  breadcrumb: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  featured: string;
  filterEyebrow: string;
  filterTitle: string;
  searchPlaceholder: string;
  searchLabel: string;
  empty: string;
  loadMore: string;
  read: string;
  imagePlaceholder: string;
  category: Record<NewsTopic, string>;
  quote: string;
  quoteCaption: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryDescription: string;
  galleryCaptions: [string, string, string];
  galleryNotice: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  catsButton: string;
  adoptButton: string;
  allArticles: string;
  related: string;
  share: string;
  shared: string;
  articleDisclaimer: string;
}> = {
  vi: {
    home: 'Trang chủ',
    breadcrumb: 'Góc chia sẻ',
    eyebrow: 'NHỮNG CHUYỆN NHỎ, NHỮNG MÁI ẤM LỚN',
    heroTitle: 'Góc chia sẻ của những người thương mèo',
    heroDescription:
      'Câu chuyện cộng đồng, cẩm nang chăm sóc và kiến thức nhận nuôi có trách nhiệm — cùng xây thêm những mái ấm an toàn cho các bé mèo.',
    featured: 'BÀI VIẾT NỔI BẬT',
    filterEyebrow: 'ĐỌC, HIỂU VÀ CÙNG LAN TỎA',
    filterTitle: 'Khám phá những điều tử tế',
    searchPlaceholder: 'Tìm bài viết, chủ đề...',
    searchLabel: 'Tìm trong Góc chia sẻ',
    empty: 'Chưa có bài phù hợp. Hãy thử từ khóa hoặc chủ đề khác.',
    loadMore: 'Xem thêm bài viết',
    read: 'Đọc câu chuyện',
    imagePlaceholder: 'Ảnh minh họa — chưa xác minh tại Saigon Pearl',
    category: {
      all: 'Tất cả',
      adoption: 'Nhận nuôi & mái ấm',
      rescue: 'Cứu hộ & chăm sóc',
      community: 'Chuyện cộng đồng',
    },
    quote:
      'Đôi khi, một bát nước sạch và một sự quan tâm đúng lúc cũng là khởi đầu của một mái ấm.',
    quoteCaption: 'Tinh thần Saigon Pearl Purrs',
    galleryEyebrow: 'NHỮNG KHOẢNH KHẮC NHỎ',
    galleryTitle: 'Một góc nhìn gần hơn về các bé mèo',
    galleryDescription:
      'Những bức ảnh chân thật giúp câu chuyện của từng bé được lắng nghe. Chúng mình sẽ thay ảnh minh họa bằng tư liệu cộng đồng đã được phép sử dụng.',
    galleryCaptions: ['Một ánh nhìn bình yên', 'Mỗi bé một câu chuyện', 'Cùng nhau quan tâm'],
    galleryNotice:
      'Lưu ý: đây là ảnh minh họa trong bản xây dựng, chưa phải ảnh mèo cứu hộ được xác minh tại Saigon Pearl.',
    ctaEyebrow: 'BẠN CŨNG CÓ THỂ CHUNG TAY',
    ctaTitle: 'Mỗi bé mèo đều xứng đáng có cơ hội tìm được mái ấm.',
    ctaDescription:
      'Tìm hiểu hồ sơ khi đã được xác minh, đọc hướng dẫn nhận nuôi và kết nối cộng đồng để giúp đỡ đúng cách.',
    catsButton: 'Gặp các bé mèo',
    adoptButton: 'Tìm hiểu nhận nuôi',
    allArticles: 'Về Góc chia sẻ',
    related: 'Bạn có thể muốn đọc tiếp',
    share: 'Chia sẻ bài viết',
    shared: 'Đã sao chép liên kết',
    articleDisclaimer:
      'Nội dung chia sẻ mang tính tham khảo; khi mèo có dấu hiệu nguy cấp, hãy liên hệ bác sĩ thú y có chuyên môn.',
  },
  en: {
    home: 'Home',
    breadcrumb: 'Stories',
    eyebrow: 'SMALL STORIES, SAFER HOMES',
    heroTitle: 'Stories from a community that cares for cats',
    heroDescription:
      'Thoughtful rescue knowledge, responsible adoption guides and community stories — helping every cat find a chance at a safe home.',
    featured: 'FEATURED STORY',
    filterEyebrow: 'LEARN, CARE, AND SHARE',
    filterTitle: 'Explore stories that matter',
    searchPlaceholder: 'Search stories and topics...',
    searchLabel: 'Search our stories',
    empty: 'No matching stories yet. Try another topic or keyword.',
    loadMore: 'Load more stories',
    read: 'Read story',
    imagePlaceholder: 'Illustrative photo — not verified as Saigon Pearl',
    category: {
      all: 'All stories',
      adoption: 'Adoption & homes',
      rescue: 'Rescue & care',
      community: 'Community stories',
    },
    quote:
      'Sometimes, a bowl of clean water and a little kindness can be the beginning of a safe home.',
    quoteCaption: 'The spirit of Saigon Pearl Purrs',
    galleryEyebrow: 'LITTLE MOMENTS',
    galleryTitle: 'A closer look at the lives of community cats',
    galleryDescription:
      'Authentic photos help each cat’s story be heard. Our sample imagery will be replaced with consent-cleared community photos.',
    galleryCaptions: ['A peaceful glance', 'A story in every paw', 'Caring together'],
    galleryNotice:
      'Note: these are illustrative build-stage photos, not verified rescue photographs from Saigon Pearl.',
    ctaEyebrow: 'YOU CAN BE PART OF THE STORY',
    ctaTitle: 'Every cat deserves a chance at a safe, loving home.',
    ctaDescription:
      'Explore verified cat profiles when available, learn about responsible adoption, and connect with neighbors who care.',
    catsButton: 'Meet the cats',
    adoptButton: 'Explore adoption',
    allArticles: 'Back to stories',
    related: 'More to explore',
    share: 'Share this article',
    shared: 'Link copied',
    articleDisclaimer:
      'These guides are general information. Seek a qualified veterinarian for emergencies or serious medical concerns.',
  },
};

