export interface AdoptServiceItem {
  id: string;
  category: 'medical' | 'consultation' | 'foster' | 'support';
  tag: string;
  title: string;
  iconName: 'HeartHandshake' | 'Stethoscope' | 'ShieldCheck' | 'Home' | 'Gift' | 'Sparkles' | 'FileCheck' | 'Users';
  image: string;
  shortDesc: string;
  badgeText: string;
  fullDetails: {
    overview: string;
    highlights: string[];
    commitment: string;
    tips: string;
  };
}

export interface AdoptStep {
  step: string;
  title: string;
  desc: string;
  iconName: 'FileText' | 'MessageCircleHeart' | 'HomeCheck' | 'HeartHandshake';
}

export interface AdoptFaq {
  q: string;
  a: string;
}

export interface AdoptContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    badge: string;
    title: string;
    subtitle: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  filterTabs: {
    id: string;
    label: string;
  }[];
  services: AdoptServiceItem[];
  processSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: AdoptStep[];
  };
  requirements: {
    eyebrow: string;
    title: string;
    desc: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  subscribe: {
    badge: string;
    title: string;
    description: string;
    namePlaceholder: string;
    contactPlaceholder: string;
    preferencePlaceholder: string;
    preferences: string[];
    submitButton: string;
    successMessage: string;
    note: string;
  };
  faqSection: {
    eyebrow: string;
    title: string;
    faqs: AdoptFaq[];
  };
  ctaBottom: {
    title: string;
    desc: string;
    browseCatsBtn: string;
    contactBtn: string;
  };
}

export const adoptServicesVi: AdoptContent = {
  meta: {
    title: 'Dịch Vụ & Kết Nối Nhận Nuôi Mèo Saigon Pearl',
    description: 'Quy trình kết nối nhận nuôi mèo hoang tại Saigon Pearl: phi lợi nhuận, minh bạch, kiểm tra y tế và đồng hành trọn đời cùng người nhận nuôi.',
  },
  hero: {
    breadcrumbHome: 'Trang chủ',
    breadcrumbCurrent: 'Nhận nuôi',
    badge: 'Dự án Cứu Hộ Phi Lợi Nhuận — Cư Dân Saigon Pearl',
    title: 'Dịch Vụ & Kết Nối Nhận Nuôi Mèo',
    subtitle: 'Mỗi bé mèo được giải cứu tại khuôn viên Saigon Pearl đều xứng đáng có một cơ hội thứ hai để sống khỏe mạnh, an toàn và được yêu thương trong một mái ấm trọn đời.',
    stats: [
      { value: '50+', label: 'Bé mèo đã có mái ấm' },
      { value: '100%', label: 'Được tiêm phòng & triệt sản' },
      { value: '0 VNĐ', label: 'Chi phí nhận nuôi' },
      { value: '24/7', label: 'Cộng đồng đồng hành trọn đời' },
    ],
  },
  filterTabs: [
    { id: 'all', label: 'Tất cả chương trình' },
    { id: 'consultation', label: 'Tư vấn & Ghép đôi' },
    { id: 'medical', label: 'Y tế & Triệt sản' },
    { id: 'foster', label: 'Foster & Xã hội hóa' },
    { id: 'support', label: 'Hỗ trợ & Hậu nhận nuôi' },
  ],
  services: [
    {
      id: 'matchmaking',
      category: 'consultation',
      tag: 'Kết nối gia đình',
      title: 'Tư Vấn &\nGhép Đôi Phù Hợp',
      iconName: 'HeartHandshake',
      image: '/images/cat-mochi.webp',
      badgeText: 'Thấu hiểu tính cách',
      shortDesc: 'Tìm kiếm bé mèo có tính cách, độ tuổi và mức độ năng động tương thích nhất với lối sống và không gian căn hộ của bạn.',
      fullDetails: {
        overview: 'Không phải bé mèo nào cũng thích hợp với mọi môi trường. Nhóm cứu hộ Saigon Pearl dành thời gian quan sát thói quen, mức độ nhút nhát hay hiếu động của từng bé để tư vấn người bạn bốn chân phù hợp nhất với gia đình bạn.',
        highlights: [
          'Phân tích điều kiện sống: căn hộ chung cư, nhà phố có ban công, thời gian bạn ở nhà.',
          'Đánh giá tương thích với trẻ nhỏ, người cao tuổi hoặc thú cưng hiện có trong nhà.',
          'Hỗ trợ buổi gặp mặt thử trực tiếp tại Saigon Pearl trước khi quyết định nhận nuôi.',
        ],
        commitment: 'Chúng tôi ưu tiên sự hòa hợp dài lâu để tránh tối đa trường hợp bé bị trả lại gây sang chấn tâm lý.',
        tips: 'Hãy chia sẻ chân thực về lịch làm việc và kỳ vọng của bạn, đội ngũ sẽ tìm đúng người bạn tri kỷ cho bạn.',
      },
    },
    {
      id: 'medical-clearance',
      category: 'medical',
      tag: 'Sức khỏe ban đầu',
      title: 'Kiểm Tra Y Tế\n& Tiệt Trùng Toàn Diện',
      iconName: 'Stethoscope',
      image: '/images/cat-sunny.webp',
      badgeText: '100% Khỏe mạnh',
      shortDesc: '100% các bé mèo được bác sĩ thú y thăm khám kỹ lưỡng, xét nghiệm bệnh truyền nhiễm, tẩy giun sán và tiêm ngừa trước khi về nhà mới.',
      fullDetails: {
        overview: 'Mỗi bé mèo khi được cứu hộ từ bụi cây hay hầm xe Saigon Pearl đều được đưa thẳng tới phòng khám thú y đối tác để cách ly kiểm dịch, chữa trị triệt để các bệnh ngoài da và hô hấp.',
        highlights: [
          'Xét nghiệm nhanh FPV (giảm bạch cầu), FeLV (ung thư bạch cầu) và FIV (suy giảm miễn dịch).',
          'Tẩy sạch ve rận, bọ chét bằng thuốc nhỏ gáy định kỳ và xổ giun sán đường ruột.',
          'Cấp sổ theo dõi sức khỏe có chữ ký và mộc xác nhận từ bác sĩ thú y phụ trách.',
        ],
        commitment: 'Bàn giao đầy đủ hồ sơ bệnh án và lịch sử điều trị rõ ràng, minh bạch cho người nhận nuôi.',
        tips: 'Người nhận nuôi được hướng dẫn tiếp tục theo dõi các mốc tái tiêm phòng định kỳ hàng năm.',
      },
    },
    {
      id: 'humane-tnr',
      category: 'medical',
      tag: 'Bảo vệ nhân đạo',
      title: 'Triệt Sản Nhân Đạo\n& Tiêm Phòng Dại',
      iconName: 'ShieldCheck',
      image: '/images/cat-luna.webp',
      badgeText: 'Kiểm soát nhân đạo',
      shortDesc: 'Cam kết triệt sản tất cả mèo đến tuổi trước khi về nhà mới, giúp bé sống thọ hơn, loại bỏ hành vi kêu gào và nguy cơ bỏ nhà đi.',
      fullDetails: {
        overview: 'Triệt sản là cốt lõi của chương trình cứu hộ nhân đạo tại Saigon Pearl nhằm chấm dứt vòng lặp sinh sản vô gia cư và bảo vệ sức khỏe cho chính bé mèo.',
        highlights: [
          'Thực hiện bởi bác sĩ ngoại khoa nhiều kinh nghiệm với đường mổ thẩm mỹ, hạn chế đau đớn.',
          'Hỗ trợ chăm sóc hậu phẫu 5-7 ngày đến khi vết thương lành hẳn mới bàn giao.',
          'Tiêm vắc xin phòng dại và gắn chip/vòng cổ nhận diện nếu gia đình có nhu cầu.',
        ],
        commitment: 'Nếu bé mèo nhận nuôi còn quá nhỏ (dưới 5 tháng), chúng tôi sẽ bảo trợ chi phí triệt sản khi bé đủ tuổi.',
        tips: 'Mèo sau triệt sản sẽ ngoan hơn, không đánh dấu lãnh thổ bằng nước tiểu và sống hòa thuận hơn.',
      },
    },
    {
      id: 'foster-care',
      category: 'foster',
      tag: 'Hơi ấm gia đình',
      title: 'Nhà Nuôi Tạm\n& Xã Hội Hóa',
      iconName: 'Home',
      image: '/images/cat-oreo.webp',
      badgeText: 'Phục hồi tâm lý',
      shortDesc: 'Mạng lưới gia đình cư dân nhận nuôi tạm (foster), giúp các bé làm quen với tiếng người, tiếng máy hút bụi và nếp sống trong nhà.',
      fullDetails: {
        overview: 'Nhiều bé mèo hoang từng sợ người hoặc hoảng loạn sau tai nạn. Giai đoạn foster trong nhà cư dân chính là liều thuốc chữa lành tuyệt vời nhất để bé mở lòng tin tưởng con người.',
        highlights: [
          'Luyện thói quen đi vệ sinh đúng chậu cát 100%.',
          'Làm quen với đồ đạc, tiếng ồn gia đình và việc được bế ẵm, chải lông mỗi ngày.',
          'Ghi chép chi tiết tính nết, món ăn yêu thích và tật xấu nhỏ để báo trước cho người nhận nuôi.',
        ],
        commitment: 'Đảm bảo bé mèo khi về nhà bạn đã hoàn toàn sẵn sàng trở thành thành viên gia đình hạnh phúc.',
        tips: 'Cư dân Saigon Pearl có thể đăng ký làm gia đình foster ngắn hạn để giúp đỡ nhóm cứu hộ.',
      },
    },
    {
      id: 'starter-kit',
      category: 'support',
      tag: 'Hành trang về nhà',
      title: 'Gói Quà Khởi Đầu\n& Dinh Dưỡng Quen',
      iconName: 'Gift',
      image: '/images/cta-care.webp',
      badgeText: 'Quà tặng tân gia',
      shortDesc: 'Tặng kèm thức ăn hạt quen thuộc của bé, cát vệ sinh sinh học, món đồ chơi thân quen và cẩm nang hướng dẫn tuần đầu tiên.',
      fullDetails: {
        overview: 'Đổi môi trường sống dễ làm mèo bị căng thẳng và rối loạn tiêu hóa. Gói starter kit của cộng đồng giúp bé cảm nhận được sự thân thuộc ngay trong những ngày đầu tiên về nhà mới.',
        highlights: [
          'Túi thức ăn hạt và pate đúng loại bé đang ăn tại trạm cứu hộ đủ dùng trong 1-2 tuần.',
          'Món đồ chơi hoặc chiếc khăn lót ổ quen mùi giúp bé bớt bỡ ngỡ trong phòng mới.',
          'Cẩm nang in màu "Tuần đầu tiên đón mèo về nhà: Những điều nên và không nên làm".',
        ],
        commitment: 'Miễn phí hoàn toàn như một món quà mừng tân gia ấm áp từ cư dân Saigon Pearl gửi tới bạn và bé.',
        tips: 'Trộn dần thức ăn mới với thức ăn cũ trong 7 ngày để hệ tiêu hóa của bé thích nghi tốt nhất.',
      },
    },
    {
      id: 'behavior-guide',
      category: 'consultation',
      tag: 'Thích nghi êm dịu',
      title: 'Hướng Dẫn Hòa Nhập\n& Hành Vi Thú Cưng',
      iconName: 'Sparkles',
      image: '/images/cat-mochi.webp',
      badgeText: 'Quy tắc 3-3-3',
      shortDesc: 'Áp dụng quy tắc vàng 3 ngày – 3 tuần – 3 tháng để giúp bé mèo mới vượt qua sợ hãi và chung sống hòa thuận với thú cưng cũ.',
      fullDetails: {
        overview: 'Nuôi mèo là cả một nghệ thuật lắng nghe ngôn ngữ cơ thể. Đội ngũ tình nguyện viên sẽ hướng dẫn bạn phương pháp cách ly an toàn ban đầu và từng bước giới thiệu bé với các thành viên khác.',
        highlights: [
          'Quy tắc 3 ngày đầu xả stress trong không gian phòng kín yên tĩnh.',
          'Kỹ thuật tráo mùi hương (scent swapping) để mèo cũ và mèo mới làm quen nhau không cắn xé.',
          'Cách nhận biết dấu hiệu căng thẳng (tai cụp, đuôi vẫy mạnh, trốn gầm giường) và cách giải tỏa.',
        ],
        commitment: 'Luôn túc trực qua Zalo/Điện thoại để gỡ rối các khúc mắc tâm lý của bé trong tháng đầu.',
        tips: 'Đừng vội vàng bế ẵm hay ép bé ra ngoài; sự kiên nhẫn dịu dàng sẽ được đền đáp bằng tình yêu vô điều kiện.',
      },
    },
    {
      id: 'transparent-agreement',
      category: 'support',
      tag: 'Trách nhiệm cam kết',
      title: 'Hợp Đồng Nhận Nuôi\n& Cam Kết Minh Bạch',
      iconName: 'FileCheck',
      image: '/images/story.webp',
      badgeText: 'Minh bạch 100%',
      shortDesc: 'Quy trình giấy tờ rõ ràng, bảo vệ tối đa quyền được an toàn của bé mèo và xác lập trách nhiệm bền vững giữa hai bên.',
      fullDetails: {
        overview: 'Hợp đồng nhận nuôi phi thương mại nhằm khẳng định trách nhiệm nhân đạo: cam kết làm lưới an toàn ban công, không thả rông, không bán lại và cho phép cứu hộ nhận lại nếu hoàn cảnh gia đình thay đổi bất khả kháng.',
        highlights: [
          'Không phát sinh bất kỳ khoản phí thương mại nào đối với việc nhận nuôi.',
          'Quy định rõ ràng về an toàn ban công / cửa sổ căn hộ cao tầng tại TP.HCM.',
          'Quyền được hỗ trợ trọn đời: nếu người nhận nuôi gặp biến cố không thể tiếp tục chăm sóc, nhóm sẽ nhận lại bé mà không phán xét.',
        ],
        commitment: 'Mọi hoạt động đều vì lợi ích cao nhất của bé mèo, minh bạch trước cộng đồng.',
        tips: 'Chuẩn bị trước ảnh chụp ban công đã có lưới bảo vệ để hồ sơ nhận nuôi được duyệt nhanh chóng.',
      },
    },
    {
      id: 'lifelong-network',
      category: 'support',
      tag: 'Cộng đồng đồng hành',
      title: 'Mạng Lưới Hỗ Trợ\nTrọn Đời Sau Nhận Nuôi',
      iconName: 'Users',
      image: '/images/cta-community.webp',
      badgeText: 'Luôn bên bạn',
      shortDesc: 'Gia nhập nhóm cư dân yêu mèo Saigon Pearl, chia sẻ kinh nghiệm nuôi dạy, kết nối bác sĩ thú y thân thiết và cứu trợ khẩn cấp.',
      fullDetails: {
        overview: 'Khi nhận nuôi một bé mèo từ Saigon Pearl, bạn chính thức trở thành một phần của gia đình chung chúng tôi. Nhóm Zalo gắn kết thường xuyên chia sẻ hình ảnh lớn lên của các bé.',
        highlights: [
          'Cộng đồng hơn 200 cư dân yêu mèo sẵn sàng hỗ trợ trông hộ (cat-sitting) khi bạn đi du lịch hoặc công tác.',
          'Danh sách phòng khám thú y đối tác có chính sách trợ giá khám chữa bệnh cho mèo cứu hộ Saigon Pearl.',
          'Gặp gỡ giao lưu định kỳ và cùng tham gia các chiến dịch chăm sóc mèo trong khu dân cư.',
        ],
        commitment: 'Bạn không bao giờ phải đơn độc trên hành trình chăm sóc người bạn bốn chân.',
        tips: 'Hãy gửi ảnh cập nhật của bé lên nhóm cộng đồng; đó là niềm động viên lớn nhất đối với các tình nguyện viên!',
      },
    },
  ],
  processSection: {
    eyebrow: 'Các bước thực hiện',
    title: 'Quy Trình Nhận Nuôi 4 Bước Đơn Giản',
    subtitle: 'Chúng tôi tinh gọn các bước đăng ký để việc đón một thành viên mới về nhà trở nên ấm áp, an toàn và thuận tiện nhất cho bạn.',
    steps: [
      {
        step: '01',
        title: 'Tìm hiểu & Đăng ký',
        desc: 'Xem danh sách các bé mèo đang tìm mái ấm, đọc kỹ thông tin tính cách và điền biểu mẫu đăng ký nhận nuôi online.',
        iconName: 'FileText',
      },
      {
        step: '02',
        title: 'Trò chuyện & Ghé thăm',
        desc: 'Tình nguyện viên liên hệ trò chuyện thân mật, sắp xếp buổi ghé thăm trực tiếp để bạn và bé mèo làm quen với nhau.',
        iconName: 'MessageCircleHeart',
      },
      {
        step: '03',
        title: 'Chuẩn bị nhà & Đón bé',
        desc: 'Kiểm tra lưới an toàn ban công, sắm chậu cát, bát ăn và nhóm cứu hộ sẽ bàn giao bé tận nhà cùng gói quà khởi đầu.',
        iconName: 'HomeCheck',
      },
      {
        step: '04',
        title: 'Đồng hành & Cập nhật',
        desc: 'Gia nhập cộng đồng Zalo cư dân, nhận tư vấn chăm sóc trọn đời và cùng chia sẻ những thước ảnh đáng yêu của bé.',
        iconName: 'HeartHandshake',
      },
    ],
  },
  requirements: {
    eyebrow: 'Tiêu chuẩn an toàn',
    title: 'Cam Kết Vàng Vì Sự An Toàn Của Bé',
    desc: 'Để đảm bảo bé mèo có được một cuộc đời bình yên và không lặp lại bi kịch bị bỏ rơi, chúng tôi có 4 tiêu chuẩn bắt buộc:',
    items: [
      {
        title: '1. An toàn ban công & cửa sổ',
        desc: 'Các căn hộ cao tầng bắt buộc phải có lưới an toàn hoặc khung chắn cửa sổ kiên cố để ngăn ngừa tuyệt đối nguy cơ mèo ngã từ trên cao.',
      },
      {
        title: '2. Nuôi hoàn toàn trong nhà (Indoor only)',
        desc: 'Không thả rông bé ra hành lang chung hoặc đường phố để tránh tai nạn giao thông, thất lạc hoặc nhiễm bệnh truyền nhiễm từ mèo hoang.',
      },
      {
        title: '3. Cam kết triệt sản & tiêm phòng',
        desc: 'Đưa bé đi tiêm phòng định kỳ hàng năm và cam kết triệt sản khi đến tuổi (được dự án hỗ trợ chi phí nếu cần).',
      },
      {
        title: '4. Yêu thương và không bỏ rơi',
        desc: 'Xem bé như một thành viên trong gia đình. Nếu có biến cố bắt buộc không thể nuôi tiếp, cam kết liên hệ để nhóm đón bé trở lại.',
      },
    ],
  },
  subscribe: {
    badge: 'Đăng Ký Tư Vấn',
    title: 'Nhận Thông Báo Bé Mèo Cần Mái Ấm',
    description: 'Để lại thông tin liên lạc, chúng tôi sẽ thông báo ngay khi có bé mèo mới được cứu hộ cần tìm mái ấm hoặc cần gia đình foster tạm thời tại Saigon Pearl.',
    namePlaceholder: 'Họ và tên của bạn',
    contactPlaceholder: 'Số điện thoại / Zalo hoặc Email',
    preferencePlaceholder: 'Nhu cầu của bạn (nhận nuôi / foster / cần tư vấn)',
    preferences: [
      'Muốn nhận nuôi mèo con (dưới 6 tháng)',
      'Muốn nhận nuôi mèo trưởng thành (ngoan, điềm tĩnh)',
      'Đăng ký làm gia đình foster tạm thời',
      'Cần tư vấn thêm về điều kiện nhận nuôi',
    ],
    submitButton: 'Gửi Đăng Ký Nhận Thông Tin',
    successMessage: 'Cảm ơn bạn! Thông tin đã được gửi tới đội ngũ cứu hộ Saigon Pearl. Chúng mình sẽ liên hệ với bạn sớm nhất!',
    note: 'Dự án phi lợi nhuận 100%. Thông tin cá nhân của bạn được bảo mật tuyệt đối.',
  },
  faqSection: {
    eyebrow: 'Hỏi đáp nhanh',
    title: 'Những Câu Hỏi Thường Gặp Về Nhận Nuôi',
    faqs: [
      {
        q: 'Nhận nuôi mèo tại Saigon Pearl có mất phí không?',
        a: 'Hoàn toàn KHÔNG mất phí mua bán mèo. Dự án hoạt động 100% phi lợi nhuận vì phúc lợi động vật. Chi phí cứu hộ, khám bệnh và triệt sản ban đầu đều do quỹ cư dân và mạnh thường quân tài trợ.',
      },
      {
        q: 'Tôi không ở Saigon Pearl thì có được nhận nuôi không?',
        a: 'ĐƯỢC. Chúng tôi chào đón tất cả các gia đình và bạn trẻ có tình yêu thương tại TP.HCM và các khu vực lân cận, miễn là bạn đáp ứng được tiêu chí an toàn (lưới ban công, nuôi trong nhà, cam kết yêu thương).',
      },
      {
        q: 'Nếu mèo mới về nhà không hòa thuận với thú cưng cũ thì làm sao?',
        a: 'Đội ngũ cứu hộ sẽ hướng dẫn bạn phương pháp cách ly 2 tuần đầu và kỹ thuật tráo mùi hương để làm quen từng bước. Nếu sau 1 tháng thử thách bé thực sự không thể hòa nhập, nhóm sẽ nhận lại bé và tìm phương án phù hợp hơn.',
      },
      {
        q: 'Tôi chưa từng nuôi mèo bao giờ, có được nhận nuôi không?',
        a: 'Hoàn toàn được! Nhóm sẽ ưu tiên ghép đôi cho bạn một bé mèo tính cách thân thiện, quấn người, dễ gần, đồng thời hướng dẫn bạn toàn bộ kiến thức từ cách chọn cát, thức ăn đến cách chơi đùa với bé.',
      },
    ],
  },
  ctaBottom: {
    title: 'Bạn Đã Sẵn Sàng Mở Lòng Đón Một Bé Mèo?',
    desc: 'Hãy ghé xem danh sách các bé mèo đáng yêu đang nóng lòng chờ đợi mái ấm gia đình đầu tiên của cuộc đời mình.',
    browseCatsBtn: 'Xem Danh Sách Các Bé Mèo',
    contactBtn: 'Liên Hệ Đội Cứu Hộ Zalo',
  },
};

export const adoptServicesEn: AdoptContent = {
  meta: {
    title: 'Cat Adoption & Foster Services | Saigon Pearl Purrs',
    description: 'Saigon Pearl stray cat adoption process: non-profit, transparent, vet-checked, and lifelong community support for adopters.',
  },
  hero: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Adopt',
    badge: 'Non-Profit Community Initiative — Saigon Pearl Residents',
    title: 'Cat Adoption & Foster Services',
    subtitle: 'Every cat rescued within Saigon Pearl deserves a second chance to live safely, healthily, and happily in a permanent, loving home.',
    stats: [
      { value: '50+', label: 'Cats found forever homes' },
      { value: '100%', label: 'Vaccinated & Neutered' },
      { value: '0 VND', label: 'Adoption fee' },
      { value: '24/7', label: 'Lifelong community support' },
    ],
  },
  filterTabs: [
    { id: 'all', label: 'All Programs' },
    { id: 'consultation', label: 'Consultation & Matching' },
    { id: 'medical', label: 'Medical & TNR' },
    { id: 'foster', label: 'Foster & Socialization' },
    { id: 'support', label: 'Aftercare & Community' },
  ],
  services: [
    {
      id: 'matchmaking',
      category: 'consultation',
      tag: 'Family Connection',
      title: 'Consultation &\nPerfect Matchmaking',
      iconName: 'HeartHandshake',
      image: '/images/cat-mochi.webp',
      badgeText: 'Personality First',
      shortDesc: 'Finding a cat whose personality, energy level, and age perfectly align with your apartment lifestyle and family routine.',
      fullDetails: {
        overview: 'Not every cat fits every household. Our team observes each cat’s unique habits and temperament to introduce the most compatible companion for you.',
        highlights: [
          'Living condition analysis: condo layout, balcony safety, hours spent at home.',
          'Compatibility assessment with kids, elders, or existing pets in your house.',
          'Pre-adoption meet-and-greet in Saigon Pearl before finalizing.',
        ],
        commitment: 'We prioritize long-term compatibility to prevent behavioral distress or returns.',
        tips: 'Be transparent about your routine and expectations so we can guide you to the right furry soulmate.',
      },
    },
    {
      id: 'medical-clearance',
      category: 'medical',
      tag: 'Initial Wellness',
      title: 'Health Clearance\n& Veterinary Protocol',
      iconName: 'Stethoscope',
      image: '/images/cat-sunny.webp',
      badgeText: '100% Vet Cleared',
      shortDesc: 'Every rescued cat undergoes thorough veterinary checks, viral screenings, deworming, and core vaccination before placement.',
      fullDetails: {
        overview: 'Cats rescued from basements or landscaping are immediately admitted to our partner clinic for medical quarantine and treatment of any health concerns.',
        highlights: [
          'Rapid testing for FPV (Panleukopenia), FeLV, and FIV.',
          'Comprehensive external flea/tick treatment and internal parasite deworming.',
          'Official health booklet signed by the licensed attending veterinarian.',
        ],
        commitment: 'Complete medical history and treatment records are transparently transferred to you.',
        tips: 'Adopters receive clear guidance on annual booster shots and preventive care.',
      },
    },
    {
      id: 'humane-tnr',
      category: 'medical',
      tag: 'Humane Welfare',
      title: 'Humane Spay & Neuter\nplus Rabies Defense',
      iconName: 'ShieldCheck',
      image: '/images/cat-luna.webp',
      badgeText: 'Ethical Control',
      shortDesc: 'We ensure all age-eligible cats are neutered or spayed before adoption to promote lifelong health and end homeless kitten cycles.',
      fullDetails: {
        overview: 'Spay/neuter is at the heart of ethical rescue at Saigon Pearl, safeguarding feline well-being and preventing reproductive distress.',
        highlights: [
          'Performed by skilled veterinary surgeons with minimal-stress cosmetic incisions.',
          'Post-operative care for 5-7 days until full wound closure before rehoming.',
          'Rabies vaccination and identification microchip/collar assistance.',
        ],
        commitment: 'If a kitten is younger than 5 months at adoption, we sponsor the sterilization surgery when ready.',
        tips: 'Sterilized cats are calmer, do not mark territory, and live significantly longer lives.',
      },
    },
    {
      id: 'foster-care',
      category: 'foster',
      tag: 'Home Warmth',
      title: 'Temporary Foster\n& Socialization',
      iconName: 'Home',
      image: '/images/cat-oreo.webp',
      badgeText: 'Emotional Healing',
      shortDesc: 'A network of resident foster homes helps cats get accustomed to human voices, home appliances, and peaceful indoor life.',
      fullDetails: {
        overview: 'Stray cats may initially fear humans. Being fostered in home environments heals past trauma and teaches them to trust human touch again.',
        highlights: [
          '100% litter box reliability training in home settings.',
          'Acclimatization to daily household noises, grooming, and human handling.',
          'Detailed notes on individual quirks and dietary preferences.',
        ],
        commitment: 'Ensuring your new companion arrives confident, loved, and ready to bond.',
        tips: 'Saigon Pearl residents can apply to become temporary foster parents.',
      },
    },
    {
      id: 'starter-kit',
      category: 'support',
      tag: 'Homecoming Pack',
      title: 'Adoption Starter Kit\n& Familiar Nutrition',
      iconName: 'Gift',
      image: '/images/cta-care.webp',
      badgeText: 'Housewarming Gift',
      shortDesc: 'Complimentary starter pack containing familiar kibble, eco litter, favorite toy, and a 7-day adjustment handbook.',
      fullDetails: {
        overview: 'Sudden dietary or environmental changes cause stress and stomach upset. Our starter kit provides comfort and familiar scents during the first crucial week.',
        highlights: [
          'A 1-2 week supply of familiar food and canned pate.',
          'Familiar scent towel or toy from their foster home to ease transition anxiety.',
          'Illustrated "First Week at Home: Do’s & Don’ts" guide.',
        ],
        commitment: 'Provided entirely free as a housewarming gesture from our resident group.',
        tips: 'Transition to any new diet gradually over 7 days to preserve healthy digestion.',
      },
    },
    {
      id: 'behavior-guide',
      category: 'consultation',
      tag: 'Smooth Transition',
      title: 'Acclimation Strategy\n& Behavioral Support',
      iconName: 'Sparkles',
      image: '/images/cat-mochi.webp',
      badgeText: '3-3-3 Rule',
      shortDesc: 'Applying the 3 days – 3 weeks – 3 months rule to help the cat relax and integrate harmoniously with existing family pets.',
      fullDetails: {
        overview: 'Feline bonding requires gentle patience. Our volunteer team guides you through safe room setup and scent swapping techniques.',
        highlights: [
          '3-day quiet isolation protocol for decompression.',
          'Scent swapping routine to introduce new and existing pets peacefully.',
          'Recognizing body language (flattened ears, tail swishes) and soothing remedies.',
        ],
        commitment: 'Available via WhatsApp/Zalo to troubleshoot behavioral adjustments.',
        tips: 'Never rush direct contact; gentle patience unlocks boundless feline affection.',
      },
    },
    {
      id: 'transparent-agreement',
      category: 'support',
      tag: 'Responsible Oath',
      title: 'Transparent Agreement\n& Safety Standards',
      iconName: 'FileCheck',
      image: '/images/story.webp',
      badgeText: '100% Transparent',
      shortDesc: 'A straightforward, non-commercial agreement protecting the cat’s lifelong safety and defining mutual responsibilities.',
      fullDetails: {
        overview: 'Our non-commercial agreement secures ethical promises: high-rise balcony netting, indoor-only living, and our safety-net take-back policy if life events ever require it.',
        highlights: [
          'Zero commercial purchase or adoption fees.',
          'Mandatory window and balcony safety net requirements in high-rise condos.',
          'Lifelong safety net: if circumstances ever prevent care, we take the cat back unconditionally.',
        ],
        commitment: 'Everything is governed solely by animal welfare and transparency.',
        tips: 'Prepare photos of your secured balcony or window mesh for prompt application review.',
      },
    },
    {
      id: 'lifelong-network',
      category: 'support',
      tag: 'Community Bond',
      title: 'Lifelong Resident\nSupport Network',
      iconName: 'Users',
      image: '/images/cta-community.webp',
      badgeText: 'Always With You',
      shortDesc: 'Join our warm community of over 200 Saigon Pearl cat lovers for pet-sitting swaps, clinic discounts, and lifelong advice.',
      fullDetails: {
        overview: 'Adopting from Saigon Pearl makes you part of our extended family. Our community chat connects you with experienced neighbours and reliable vets.',
        highlights: [
          'A network of 200+ local neighbors ready for vacation cat-sitting swaps.',
          'Special clinic discounts at trusted veterinary partners.',
          'Regular community meetups and celebration of adoption updates.',
        ],
        commitment: 'You will never navigate feline parenthood alone.',
        tips: 'Sharing photos of your cat’s progress is the greatest reward for our rescue team!',
      },
    },
  ],
  processSection: {
    eyebrow: 'Simple Process',
    title: '4-Step Adoption Journey',
    subtitle: 'We streamlined our adoption steps so welcoming a new family member is warm, secure, and delightful for everyone.',
    steps: [
      {
        step: '01',
        title: 'Explore & Apply',
        desc: 'Browse our available rescue cats, read their personality traits, and fill out our simple online interest form.',
        iconName: 'FileText',
      },
      {
        step: '02',
        title: 'Chat & Meet',
        desc: 'A friendly volunteer contacts you for a casual consultation and arranges a warm meet-and-greet with the cat.',
        iconName: 'MessageCircleHeart',
      },
      {
        step: '03',
        title: 'Home Prep & Welcome',
        desc: 'Ensure balcony safety netting is ready; our team safely delivers the cat along with your free Starter Kit.',
        iconName: 'HomeCheck',
      },
      {
        step: '04',
        title: 'Thrive Together',
        desc: 'Join our community group, receive ongoing behavioral support, and share joyful milestones with fellow cat lovers.',
        iconName: 'HeartHandshake',
      },
    ],
  },
  requirements: {
    eyebrow: 'Safety Criteria',
    title: 'Our Golden Safety Standards',
    desc: 'To ensure our rescued cats never face the trauma of abandonment again, we uphold 4 mandatory criteria:',
    items: [
      {
        title: '1. Secured Balconies & Windows',
        desc: 'High-rise apartments must have safety netting or sturdy window grilles to eliminate fatal high-fall risks.',
      },
      {
        title: '2. 100% Indoor-Only Living',
        desc: 'Cats must live strictly indoors, avoiding road hazards, getting lost, or contracting outdoor infections.',
      },
      {
        title: '3. Vaccination & Sterilization Pledge',
        desc: 'Committed to annual vet checks, booster vaccines, and sterilization upon reaching the appropriate age.',
      },
      {
        title: '4. Lifelong Love & No Re-abandonment',
        desc: 'Treat the cat as family. If unexpected hardship occurs, pledge to return the cat to our rescue team safely.',
      },
    ],
  },
  subscribe: {
    badge: 'Adoption Inquiry',
    title: 'Get Notified When a New Cat Needs a Home',
    description: 'Leave your contact details to be the first to know whenever a newly rescued cat or foster opportunity arises in Saigon Pearl.',
    namePlaceholder: 'Your full name',
    contactPlaceholder: 'Phone number / WhatsApp or Email',
    preferencePlaceholder: 'Your interest (adoption / fostering / guidance)',
    preferences: [
      'Adopt a playful kitten (under 6 months)',
      'Adopt a calm adult cat',
      'Register as a temporary foster family',
      'Need adoption consultation first',
    ],
    submitButton: 'Submit Interest Form',
    successMessage: 'Thank you! Your information has been sent to our Saigon Pearl rescue team. We will get in touch shortly!',
    note: '100% non-profit. Your personal contact information is kept strictly confidential.',
  },
  faqSection: {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About Adoption',
    faqs: [
      {
        q: 'Is there an adoption fee for Saigon Pearl cats?',
        a: 'Absolutely ZERO commercial adoption fee. We operate 100% non-profit. All rescue, vet care, and sterilization costs are covered by community donations.',
      },
      {
        q: 'Can I adopt if I do not live inside Saigon Pearl?',
        a: 'YES! We warmly welcome adopters across Ho Chi Minh City and nearby areas, as long as you meet our indoor safety standards (balcony netting, loving commitment).',
      },
      {
        q: 'What if the new cat does not get along with my existing pets?',
        a: 'We provide a 2-week safe isolation and scent-swapping protocol. If after a patient trial the match proves unsuitable, we welcome the cat back with open arms.',
      },
      {
        q: 'I am a first-time cat parent. Can I still adopt?',
        a: 'Certainly! We will match you with an easygoing, affectionate cat and guide you through every step of supplies, nutrition, and care.',
      },
    ],
  },
  ctaBottom: {
    title: 'Ready to Open Your Heart and Home?',
    desc: 'Explore the lovely rescue cats eager to find their first loving, permanent family.',
    browseCatsBtn: 'Browse Available Cats',
    contactBtn: 'Chat With Rescue Team',
  },
};

export function getAdoptContent(locale: string): AdoptContent {
  return locale === 'vi' ? adoptServicesVi : adoptServicesEn;
}

