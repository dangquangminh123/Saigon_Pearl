import type { Locale } from '@/lib/i18n';

export type Article = {
  slug: string;
  category: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  image: string;
  paragraphs: Record<Locale, string[]>;
};

// Educational articles, not fabricated reports about real rescue events.
export const articles: Article[] = [
  {
    slug: 'prepare-for-adoption', image: '/images/cat-mochi.webp',
    category: { vi: 'Cẩm nang nhận nuôi', en: 'Adoption guide' },
    title: { vi: 'Trước khi nhận nuôi mèo, bạn nên chuẩn bị gì?', en: 'What to prepare before adopting a cat' },
    description: {
      vi: 'Một danh sách nhỏ giúp hành trình đón thành viên mới an toàn và ấm áp hơn.',
      en: 'A practical checklist for giving your new companion a safe, warm welcome.',
    },
    paragraphs: {
      vi: [
        'Nhận nuôi là một cam kết lâu dài. Hãy cân nhắc thời gian, kinh phí chăm sóc, điều kiện nhà ở và sự đồng thuận của những người cùng sống.',
        'Trước ngày đón mèo, chuẩn bị chỗ ngủ yên tĩnh, khay vệ sinh, cát, bát ăn uống, thức ăn phù hợp, đồ chơi và lồng vận chuyển an toàn.',
        'Trong những ngày đầu, hãy để mèo làm quen từng chút một. Đóng kín cửa sổ và ban công, tránh những vị trí có nguy cơ rơi ngã. Hẹn lịch kiểm tra sức khỏe với bác sĩ thú y.',
        'Nếu nhận nuôi qua nhóm cứu hộ, hãy trao đổi cởi mở về tình trạng sức khỏe, tiêm phòng, triệt sản, chi phí dự kiến và trách nhiệm chăm sóc lâu dài.',
      ],
      en: [
        'Adoption is a long-term commitment. Consider your time, care budget, living arrangements, and the agreement of everyone sharing your home.',
        'Prepare a quiet sleeping place, litter box, food and water bowls, suitable food, toys, and a secure carrier before your cat arrives.',
        'Give your cat time to settle in. Secure windows and balconies to prevent falls and book a health check with a veterinarian.',
        'When adopting through a rescue group, discuss health, vaccinations, sterilization, expected costs, and long-term responsibility openly.',
      ],
    },
  },
  {
    slug: 'found-a-stray-cat', image: '/images/cat-luna.webp',
    category: { vi: 'Chăm sóc & cứu hộ', en: 'Rescue & care' },
    title: { vi: 'Gặp một bé mèo cần giúp đỡ: nên làm gì?', en: 'Found a cat that might need help?' },
    description: {
      vi: 'Quan sát, bảo đảm an toàn và tìm sự hỗ trợ phù hợp trước khi can thiệp.',
      en: 'Observe, stay safe, and seek appropriate help before taking action.',
    },
    paragraphs: {
      vi: [
        'Không phải mèo xuất hiện ngoài trời nào cũng bị bỏ rơi. Hãy quan sát từ xa xem mèo có dấu hiệu bị thương, mất nước, mắc kẹt hay đang có người chăm sóc hay không.',
        'Nếu an toàn, hãy ghi lại vị trí, thời gian, ảnh rõ và biểu hiện của mèo. Không vội bế mèo lạ khi mèo hoảng sợ, gầm gừ hoặc có dấu hiệu đau đớn.',
        'Với trường hợp bị thương hoặc khó thở, ưu tiên liên hệ cơ sở thú y hoặc đội cứu hộ có chuyên môn. Không tự ý sử dụng thuốc cho mèo.',
        'Thông tin đầy đủ và sự phối hợp bình tĩnh sẽ giúp người hỗ trợ đánh giá tình huống nhanh hơn, giảm nguy cơ cho mèo và người.',
      ],
      en: [
        'Not every outdoor cat is abandoned. Observe from a distance for injuries, dehydration, entrapment, or signs that someone is already caring for the cat.',
        'If safe, record the location, time, clear photos, and behavior. Avoid handling an unfamiliar cat that is frightened or in pain.',
        'If a cat is injured or struggling to breathe, contact a veterinarian or an experienced rescue group. Do not give medications without veterinary advice.',
        'Clear information and calm coordination help responders assess the situation while reducing risk to people and animals.',
      ],
    },
  },
  {
    slug: 'responsible-community-care', image: '/images/story.webp',
    category: { vi: 'Cộng đồng', en: 'Community' },
    title: { vi: 'Một cộng đồng tử tế bắt đầu từ hành động nhỏ', en: 'Kind communities grow through small actions' },
    description: {
      vi: 'Từ cho ăn đúng cách đến kết nối nhận nuôi, mỗi người đều có thể góp phần.',
      en: 'From responsible feeding to adoption support, everyone has a part to play.',
    },
    paragraphs: {
      vi: [
        'Một cộng đồng chăm sóc mèo có trách nhiệm cần sự phối hợp giữa cư dân, người tình nguyện và những đơn vị thú y đáng tin cậy.',
        'Nếu cho mèo ăn, hãy chọn vị trí phù hợp với nội quy khu dân cư, giữ vệ sinh và dọn sạch phần thức ăn thừa sau khi kết thúc.',
        'Ghi chép tình trạng sức khỏe, theo dõi lịch chăm sóc và hỗ trợ triệt sản dưới hướng dẫn của bác sĩ thú y giúp hoạt động bền vững hơn.',
        'Minh bạch thông tin, tôn trọng cư dân xung quanh và ưu tiên phúc lợi động vật là nền tảng của mọi hoạt động cộng đồng.',
      ],
      en: [
        'Responsible community cat care takes cooperation among residents, volunteers, and trusted veterinary professionals.',
        'When feeding cats, follow local residential rules, choose suitable spots, and clean up leftovers afterward.',
        'Tracking health, documenting care, and supporting veterinarian-guided sterilization helps make community efforts sustainable.',
        'Transparent records, respect for neighbors, and animal welfare should guide every community initiative.',
      ],
    },
  },
];
