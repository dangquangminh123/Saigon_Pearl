import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  HeartHandshake,
  Languages,
  House,
  PackagePlus,
  FileText,
  MessageCircleHeart,
  Home,
  Users,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  PawPrint,
  PhoneCall,
  CheckCircle2,
  Camera,
  UserCheck,
  Clock,
  Handshake,
} from 'lucide-react';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import styles from './join.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return pageMetadata(locale, '/get-involved', t.meta.join[0], t.meta.join[1]);
}

export default async function JoinPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  const isVi = locale === 'vi';

  /* -------------------------------------------------------------------------
     Data for process steps (moved from adopt page)
     ----------------------------------------------------------------------- */
  const processSteps = isVi ? [
    {
      step: '01',
      title: 'Tìm hiểu & Đăng ký',
      desc: 'Đọc về các hoạt động cộng đồng, chọn hình thức bạn muốn tham gia và điền biểu mẫu đăng ký online đơn giản.',
      icon: <FileText size={24} />,
    },
    {
      step: '02',
      title: 'Kết nối & Trò chuyện',
      desc: 'Tình nguyện viên liên hệ trao đổi thân mật để hiểu điều kiện và sắp xếp nhiệm vụ phù hợp với thời gian của bạn.',
      icon: <MessageCircleHeart size={24} />,
    },
    {
      step: '03',
      title: 'Hành động thực tế',
      desc: 'Bắt đầu với một nhiệm vụ nhỏ: cho mèo ăn, chụp ảnh bé, chia sẻ bài viết hoặc dẫn bé đi khám thú y.',
      icon: <PawPrint size={24} />,
    },
    {
      step: '04',
      title: 'Đồng hành lâu dài',
      desc: 'Gia nhập nhóm Zalo cộng đồng, nhận cập nhật từng bé mèo và cùng lan tỏa câu chuyện ý nghĩa này.',
      icon: <HeartHandshake size={24} />,
    },
  ] : [
    {
      step: '01',
      title: 'Learn & Register',
      desc: "Read about our community activities, choose how you'd like to contribute, and fill in a simple interest form online.",
      icon: <FileText size={24} />,
    },
    {
      step: '02',
      title: 'Connect & Chat',
      desc: 'A volunteer contacts you for a casual chat to understand your availability and match you to a suitable role.',
      icon: <MessageCircleHeart size={24} />,
    },
    {
      step: '03',
      title: 'Take Action',
      desc: 'Start with one small act: feed a cat, photograph a rescue, share a story, or accompany a cat to the vet.',
      icon: <PawPrint size={24} />,
    },
    {
      step: '04',
      title: 'Grow Together',
      desc: 'Join our community group, receive cat updates, and help spread this meaningful story far and wide.',
      icon: <HeartHandshake size={24} />,
    },
  ];

  /* -------------------------------------------------------------------------
     Commitments (volunteer expectations)
     ----------------------------------------------------------------------- */
  const commitments = isVi ? [
    {
      title: '1. Đúng giờ & Đáng tin cậy',
      desc: 'Khi đã cam kết nhiệm vụ (như đưa mèo đi khám), hãy thực hiện đúng hẹn. Nếu phát sinh bất ngờ, thông báo sớm để kịp điều chỉnh.',
    },
    {
      title: '2. Tôn trọng mèo và con người',
      desc: 'Không chụp ảnh mèo đang đau đớn hay hoảng loạn để đăng lên mạng xã hội. Tôn trọng quyền riêng tư của các cư dân và tình nguyện viên khác.',
    },
    {
      title: '3. Minh bạch & Không tự ý quyên góp',
      desc: 'Tuyệt đối không tự thu tiền nhân danh nhóm cứu hộ khi chưa được ủy quyền chính thức. Mọi chi phí phát sinh cần ghi chép và báo cáo rõ ràng.',
    },
    {
      title: '4. Học hỏi & Chia sẻ có trách nhiệm',
      desc: 'Trước khi chia sẻ thông tin về bé mèo lên mạng, xác nhận lại với đội nhóm để đảm bảo tính chính xác và tránh lo lắng không cần thiết cho cộng đồng.',
    },
  ] : [
    {
      title: '1. Be Punctual & Reliable',
      desc: 'When you commit to a task (e.g., vet transport), follow through. If something comes up, inform the team early so arrangements can be adjusted.',
    },
    {
      title: '2. Respect Cats and People',
      desc: 'Do not photograph cats in distress or pain for social media. Respect the privacy of residents, volunteers, and families involved.',
    },
    {
      title: '3. Transparency — No Unauthorized Fundraising',
      desc: 'Never collect money on behalf of the rescue group without formal authorization. All costs must be documented and reported transparently.',
    },
    {
      title: '4. Share Responsibly',
      desc: 'Confirm information with the core team before posting about cats online. Accuracy matters, and misinformation can cause unnecessary concern.',
    },
  ];

  /* -------------------------------------------------------------------------
     FAQs about joining
     ----------------------------------------------------------------------- */
  const faqs = isVi ? [
    {
      q: 'Tôi không phải cư dân Saigon Pearl có thể tình nguyện không?',
      a: 'Hoàn toàn được! Chúng tôi chào đón mọi người yêu mèo tại TP.HCM. Một số vai trò như chụp ảnh, viết nội dung hay thiết kế có thể thực hiện hoàn toàn từ xa mà không cần có mặt trực tiếp.',
    },
    {
      q: 'Tôi bận rộn, chỉ có thể dành 1-2 giờ mỗi tuần được không?',
      a: 'Mọi đóng góp đều quý giá. Một bức ảnh chân thực, một bài chia sẻ đúng lúc hay một lần đưa mèo đi khám đều tạo ra sự khác biệt lớn. Không cần phải tham gia toàn thời gian.',
    },
    {
      q: 'Tôi có thể nhận nuôi tạm thời (foster) mà không nhận nuôi vĩnh viễn không?',
      a: 'Được, và điều đó rất có ý nghĩa! Foster giúp các bé mèo hồi phục và làm quen với cuộc sống gia đình trước khi tìm được mái ấm lâu dài. Nhóm sẽ hỗ trợ thức ăn và hướng dẫn trong suốt giai đoạn này.',
    },
    {
      q: 'Nếu tôi muốn đóng góp thức ăn hoặc vật dụng thì làm sao?',
      a: 'Vui lòng liên hệ trước để biết nhu cầu thực tế hiện tại. Nhóm sẽ hướng dẫn loại thức ăn phù hợp, địa điểm và thời gian thuận tiện để trao nhận, đảm bảo không lãng phí đồ đạc.',
    },
  ] : [
    {
      q: 'Can I volunteer if I do not live in Saigon Pearl?',
      a: 'Absolutely! We welcome cat lovers across HCMC. Some roles — photography, content writing, design — can be done remotely without needing to be on-site.',
    },
    {
      q: 'I can only spare 1-2 hours per week. Is that enough?',
      a: 'Every contribution matters. A well-taken photo, a timely social share, or a vet transport run makes a huge difference. Full-time commitment is never required.',
    },
    {
      q: 'Can I be a temporary foster without committing to permanent adoption?',
      a: 'Yes, and it is incredibly meaningful! Fostering helps cats heal and learn household life before finding a permanent home. Our team provides food and guidance throughout.',
    },
    {
      q: 'I want to donate food or supplies. How do I do that?',
      a: 'Please contact us first to understand current real needs. We will guide you on the right food types, drop-off locations, and timing to ensure nothing goes to waste.',
    },
  ];

  /* Icon map for ways */
  const wayIcons = [HeartHandshake, Camera, Home, PackagePlus];

  return (
    <div data-page="get-involved" className={styles.joinPage}>
      {/* ===================================================================
          1. HERO BANNER
          =================================================================== */}
      <section className={styles.heroBanner}>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
              <Link href={routeFor(locale, '/')}>
                {isVi ? 'Trang chủ' : 'Home'}
              </Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>
                {isVi ? 'Tham gia cùng chúng tôi' : 'Get Involved'}
              </span>
            </div>

            {/* Badge */}
            <div>
              <span className={styles.heroBadge}>
                <Users size={15} />
                {isVi
                  ? 'Cộng Đồng Cư Dân Saigon Pearl — Phi Lợi Nhuận'
                  : 'Saigon Pearl Resident Community — Non-Profit'}
              </span>
            </div>

            <h1 className={styles.heroTitle}>{t.join.title}</h1>
            <p className={styles.heroSubtitle}>{t.join.description}</p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. 4 WAYS TO JOIN — IMAGE CARDS
          =================================================================== */}
      <section className={styles.waysSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              <PawPrint size={15} />
              {t.join.eyebrow}
            </span>
            <h2 className={styles.sectionTitle}>{t.join.waysTitle}</h2>
            <p className={styles.sectionSubtitle}>
              {isVi
                ? 'Bạn không cần phải làm tất cả — chỉ cần một việc bạn có thể làm tốt là đã đủ để thay đổi cuộc đời một chú mèo.'
                : "You do not need to do everything — just one thing you do well can already change a cat's life."}
            </p>
          </div>

          <div className={styles.waysGrid}>
            {t.join.ways.map((item, i) => {
              const Icon = wayIcons[i];
              return (
                <div key={item.title} className={styles.wayCard}>
                  <div className={styles.wayIconWrap}>
                    <Icon size={28} strokeWidth={1.6} />
                  </div>
                  <h3 className={styles.wayTitle}>{item.title}</h3>
                  <p className={styles.wayDesc}>{item.description}</p>
                  <Link
                    href={routeFor(locale, `/contact?topic=${item.subject}`)}
                    className={styles.wayBtn}
                  >
                    <span>{isVi ? 'Liên hệ ngay' : 'Get in touch'}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. 4-STEP JOINING PROCESS
          =================================================================== */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              <PawPrint size={15} />
              {isVi ? 'Các bước thực hiện' : 'How It Works'}
            </span>
            <h2 className={styles.sectionTitle}>
              {isVi ? 'Bắt Đầu Tham Gia Chỉ Trong 4 Bước' : '4 Simple Steps to Get Started'}
            </h2>
            <p className={styles.sectionSubtitle}>
              {isVi
                ? 'Hành trình từ người ngoài thành người đồng hành thật sự của cộng đồng Saigon Pearl Purrs.'
                : 'The journey from curious observer to a genuine Saigon Pearl Purrs community partner.'}
            </p>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((st, i) => (
              <div key={i} className={styles.processCard}>
                <span className={styles.stepNumber}>{st.step}</span>
                <div className={styles.stepIconWrap}>{st.icon}</div>
                <h3 className={styles.stepTitle}>{st.title}</h3>
                <p className={styles.stepDesc}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. VOLUNTEER COMMITMENTS / GOLDEN REQUIREMENTS
          =================================================================== */}
      <section className={styles.requirementsSection}>
        <div className={styles.container}>
          <div className={styles.reqBox}>
            <div className={styles.reqHeader}>
              <span className={styles.eyebrow}>
                <ShieldCheck size={16} />
                {isVi ? 'Cam kết tình nguyện' : 'Volunteer Commitments'}
              </span>
              <h2 className={styles.sectionTitle}>
                {isVi ? 'Những Cam Kết Cần Thiết Khi Tham Gia' : 'What We Ask of Our Volunteers'}
              </h2>
              <p className={styles.sectionSubtitle}>
                {isVi
                  ? 'Để cộng đồng hoạt động bền vững, lành mạnh và minh bạch, mỗi thành viên cần tuân thủ 4 cam kết sau:'
                  : 'For our community to remain sustainable, healthy, and transparent, we ask each member to honor 4 key commitments:'}
              </p>
            </div>
            <div className={styles.reqGrid}>
              {commitments.map((item, idx) => (
                <div key={idx} className={styles.reqItem}>
                  <div className={styles.reqIcon}>
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h4 className={styles.reqTitle}>{item.title}</h4>
                    <p className={styles.reqDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. FAQ ACCORDION
          =================================================================== */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              <AlertCircle size={15} />
              {isVi ? 'Hỏi đáp nhanh' : 'FAQ'}
            </span>
            <h2 className={styles.sectionTitle}>
              {isVi ? 'Câu Hỏi Thường Gặp Về Việc Tham Gia' : 'Common Questions About Getting Involved'}
            </h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <details key={idx} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{faq.q}</span>
                  <span className={styles.faqIcon}>
                    <ChevronDown size={18} />
                  </span>
                </summary>
                <p className={styles.faqBody}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. BOTTOM CTA DARK CARD
          =================================================================== */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>
              {t.join.closingTitle}
            </h2>
            <p className={styles.ctaDesc}>
              {t.join.closingDesc}
            </p>
            <div className={styles.ctaActions}>
              <Link href={routeFor(locale, '/contact')} className={styles.ctaPrimaryBtn}>
                <PhoneCall size={18} />
                <span>{t.join.cta}</span>
              </Link>
              <Link href={routeFor(locale, '/adopt')} className={styles.ctaSecondaryBtn}>
                <PawPrint size={18} />
                <span>{isVi ? 'Khám phá trang Nhận Nuôi' : 'Explore Adopt Page'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
