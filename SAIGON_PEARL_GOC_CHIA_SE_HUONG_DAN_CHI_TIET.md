# SAIGON PEARL PURRS — BẢN THIẾT KẾ & HƯỚNG DẪN TRIỂN KHAI GÓC CHIA SẺ

**Phiên bản hướng dẫn:** 31/10/2026  
**Repository kiểm tra:** https://github.com/dangquangminh123/Saigon_Pearl  
**Nhánh/commit tham chiếu:** `main` — `7176d09b795d0397daac514937ded8c9c368ff20`  
**Framework thực tế:** Next.js `16.4.2`, React `19.2.x`, TypeScript, CSS Modules, `lucide-react` đã cài sẵn.  
**Đầu ra:** Một đặc tả + mã mẫu để **nâng cấp trang Góc chia sẻ đang có**, không tự ý sửa repository.  
**Định vị:** cộng đồng cư dân yêu mèo tại Saigon Pearl, chăm sóc và hỗ trợ cứu hộ phi lợi nhuận, ghi nhận minh bạch, kết nối nhận nuôi có trách nhiệm.

> **ĐỌC ĐẦU TIÊN — 3 SỰ THẬT QUAN TRỌNG**
>
> 1. Trang **Góc chia sẻ đã có route** `/vi/news` và `/en/news`, **nhưng mới sơ khai**: 3 bài hướng dẫn ngắn, trang danh sách thẻ và trang chi tiết tối giản. Không tạo thêm `/blog` hoặc `/stories` trùng nội dung; **thay và mở rộng các file `/news` hiện tại**.
> 2. Mẫu được nhắc trong các lượt trao đổi trước là `https://pet-planet.monamedia.net/about/`, tức **trang About**, không phải URL trực tiếp của trang blog. Các địa chỉ blog/news tương ứng của mẫu không truy cập được khi kiểm tra. Vì vậy **không thể xác minh chính xác pixel, hiệu ứng, thứ tự item hoặc CSS gốc** của trang tin mẫu; tài liệu dưới đây là thiết kế editoral/pet-community bám ngôn ngữ thị giác mẫu và yêu cầu, **không tuyên bố sao chép 1:1 giao diện không xem được**. Khi có screenshot/video trang blog mẫu, đối chiếu lại bằng mục QA cuối tài liệu.
> 3. Hình ảnh đang nằm trong `/public/images/` là **ảnh minh họa chưa được xác minh là ảnh mèo thật tại Saigon Pearl** (theo chính `public/NOTICE-IMAGES.txt`). **Không viết bài giả mạo ca cứu hộ, không công bố tên mèo/ảnh/số liệu/quá trình nhận nuôi như sự kiện thật**, không mô tả đội ngũ thú y đã hợp tác nếu chưa xác minh.

---

## A. Bức tranh hiện tại: file nào đang làm gì?

| File đã có trong repo | Hiện trạng | Việc cần làm |
|---|---|---|
| `src/lib/nav.ts` | Đã có `{ key: 'news', path: '/news' }` | **Giữ nguyên**, không tạo menu trùng |
| `src/components/SiteHeader.tsx`, `SiteFooter.tsx` | Menu lấy `navigation` và từ điển | Giữ cấu trúc, chỉnh màu/font toàn site có kiểm soát |
| `src/lib/dictionaries.ts` | `nav.news`: **Góc chia sẻ** / **Stories**; đã có `news` và `meta.news` | Giữ tương thích; thay nội dung bằng nội dung thật, đồng bộ VI/EN |
| `src/app/[locale]/news/page.tsx` | `PageIntro` + lưới các bài | **Thay** bằng trang tạp chí cộng đồng đầy đủ |
| `src/app/[locale]/news/[slug]/page.tsx` | Ảnh, H1, 4 đoạn, cột bài liên quan | **Thay** bằng giao diện bài đọc, chia sẻ, bài liên quan, JSON-LD |
| `src/data/articles.ts` | 3 bài hướng dẫn: chuẩn bị nhận nuôi; gặp mèo cần giúp; chăm sóc cộng đồng | **Giữ dữ liệu làm nền**, bổ sung biên tập và bài viết thật, tuyệt đối không bịa hoạt động |
| `src/app/globals.css` | CSS hệ thống dùng font hệ thống, Georgia, `Segoe Print`; nhiều màu nóng còn được hard-code | Chuẩn hóa font, rà lại token màu; không đổi bừa toàn bộ CSS |
| `src/app/[locale]/layout.tsx` | Root layout VI/EN, header/footer, organization JSON-LD | Gắn `next/font` bằng CSS variable |
| `src/app/(root)/layout.tsx` | Layout của `/` chuyển `/vi` | Gắn cùng font để đồng nhất, không thêm thẻ `<html>` vào page con |
| `src/app/sitemap.ts` | Tự sinh URL cho từng `articles` ở VI/EN | Giữ, nhưng sau này lọc **chỉ bài đã xuất bản** |
| `src/lib/site.ts` | `pageMetadata()` có title, canonical, hreflang, OG/Twitter chung | Dùng lại, đồng thời thay ảnh OG riêng cho từng bài |
| `src/app/[locale]/about/_components/RevealOnScroll.tsx` | Đã dùng IntersectionObserver, hỗ trợ reduced-motion | Học lại cách thực hiện, tạo component riêng cho Góc chia sẻ để tránh phụ thuộc CSS About |

**Chẩn đoán chính:** Chưa có cấp bậc nội dung kiểu magazine (bài nổi bật, chuyên mục, khối editorial, gallery); chưa có bộ lọc/tìm bài theo chủ đề; bài đọc thiếu cấu trúc H2/H3, ngày xuất bản có xác minh, tác giả/nguồn; ảnh chưa đủ gốc thật; font bị trộn nhiều kiểu. **Đây là cơ hội để cải thiện trải nghiệm, không phải lý do phải viết lại toàn bộ website.**

## B. Ngôn ngữ thiết kế: tuyệt đối giữ bốn màu lõi

| Vai trò | Mã màu | Ứng dụng |
|---|---|---|
| Nền kem | `#F7F4EE` | Canvas chính, hero, nền bài đọc |
| Xanh sage | `#DCE5D7` | Dải chuyển tiếp, cards giới thiệu, quote, CTA mềm |
| Nâu đất | `#9B7862` | Icon, đường trang trí, nút, border nhấn, link hover |
| Nâu chữ đậm | `#453D35` | Heading, đoạn văn, icon trọng tâm, CTA chữ |

**Không thêm bộ màu đỏ-cam/xanh neon ngẫu nhiên.** Được dùng trắng hoặc biến thể trong suốt của 4 màu để giữ tương phản, ví dụ `rgba(69,61,53,.12)`, `rgba(155,120,98,.09)`. Tránh chữ nâu đất nhỏ trên nền kem nếu độ tương phản quá thấp: chữ nội dung dùng `#453D35`. Icon SVG chỉ từ **`lucide-react`** (đã cài trong repo) — đây là thư viện React icons; Next.js không có một bộ “Next.js icons” tích hợp tương tự. **Không dùng emoji/Unicode giả icon** trong UI.

### B1. Cảm giác thương hiệu

- **Human-first editorial:** trải nghiệm đọc như một tạp chí nhỏ của cộng đồng, không như gian hàng bán thú cưng.
- **Chân thật:** chụp đúng bé mèo và hoạt động thật; chú thích có ngữ cảnh, tác giả ảnh, ngày nếu có.
- **Thoáng:** max-width trang `1200px`; bài đọc `700–760px`; nhiều khoảng trắng, heading rõ ràng.
- **Dịu:** nền kem chủ đạo, sage hỗ trợ; card bo `18–24px`, không quá nhiều shadow nổi.
- **Có hành động:** sau bài đọc, người xem thấy đường đi tiếp rõ ràng: `/cats`, `/adopt`, `/rescue`, `/get-involved`.

### B2. Wireframe trang danh sách `/vi/news` / `/en/news`

```text
SITE HEADER ĐANG CÓ [Logo] [Trang chủ] [Our Story] ... [Góc chia sẻ] [VI | EN]
┌────────────────────────────────────────────────────────────────────────┐
│ HERO NỀN KEM                                                         │
│ Breadcrumb: Trang chủ / Góc chia sẻ                                   │
│ Eyebrow: NHỮNG CHUYỆN NHỎ, NHỮNG MÁI ẤM LỚN                          │
│ H1: Góc chia sẻ của những người thương mèo                            │
│ Mô tả: Cẩm nang nhận nuôi · Cứu hộ · Chuyện cộng đồng                │
│ Trang trí: PawPrint SVG mảnh; nền vòng tròn sage                      │
└────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────┬─────────────────────────────────────────┐
│ ẢNH NỔI BẬT 55–58%          │  BÀI VIẾT NỔI BẬT                       │
│ 16:10; bo lớn; hover zoom   │  Chuyên mục, tiêu đề lớn 2–3 dòng       │
│                            │  Excerpt + link Đọc bài                │
└──────────────────────────────┴─────────────────────────────────────────┘
[ Tất cả ] [ Nhận nuôi ] [ Cứu hộ ] [ Cộng đồng ]     [ Tìm bài viết… ]
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│ Image 4:3           │ │ Image 4:3           │ │ Image 4:3           │
│ Nhãn chủ đề         │ │ Nhãn chủ đề         │ │ Nhãn chủ đề         │
│ H3 + excerpt       │ │ H3 + excerpt       │ │ H3 + excerpt       │
│ ArrowUpRight icon   │ │ ArrowUpRight icon   │ │ ArrowUpRight icon   │
└─────────────────────┘ └─────────────────────┘ └─────────────────────┘
[ Xem thêm bài viết ]  (chỉ có khi còn dữ liệu)
┌────────────────────────────────────────────────────────────────────────┐
│ DẢI SAGE / LỜI NHẮN: “Mỗi hành động tử tế…” + icon HeartHandshake     │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ GALLERY KHOẢNH KHẮC: 3 ảnh minh họa có chú thích (đợi thay ảnh thật) │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ CTA: Bạn cũng có thể là một phần câu chuyện                           │
│ [ Gặp các bé mèo ]   [ Tìm hiểu nhận nuôi ]                            │
└────────────────────────────────────────────────────────────────────────┘
SITE FOOTER ĐANG CÓ
```

### B3. Wireframe trang bài đọc `/vi/news/[slug]`

```text
Breadcrumb [Home / Góc chia sẻ / Tên bài]
Nhãn chuyên mục  ·  tiêu đề H1 · mô tả ngắn
Tác giả / người kiểm tra (nếu có thật) · ngày đăng thực · thời gian đọc (ước tính)
Ảnh mở bài 16:9 (caption + nguồn ảnh)
┌───────────────────────────────────────┬──────────────────────────────┐
│ NỘI DUNG BÀI ĐỌC                      │ CỘT BÊN CẠNH                 │
│ H2 / H3 / đoạn / danh sách            │ Đọc tiếp / Cùng giúp các bé  │
│ ảnh minh họa có chú thích            │ [Gặp mèo] [Nhận nuôi]        │
│ ô lưu ý về an toàn/đi khám thú y      │ Link chia sẻ bài viết        │
│ link tài liệu tham khảo               │                              │
└───────────────────────────────────────┴──────────────────────────────┘
[Chia sẻ]   [Trở về góc chia sẻ]
3 bài liên quan (không trùng chính bài hiện tại)
CTA sage: Cùng chung tay vì những bé mèo cần mái ấm
Footer đang có
```

### B4. Ma trận hiệu ứng tương tác / animation

| Khối | Hiệu ứng đề xuất | Thông số gợi ý | Điều kiện |
|---|---|---|---|
| Hero | fade + translateY 16px | `.6s ease-out` | Không ép JS mới thấy nội dung |
| Ảnh featured | zoom nhẹ | `scale(1.035)` sau `.55s` | Có `overflow:hidden` để không tràn |
| Thẻ bài | nâng nhẹ + border earth | `translateY(-5px)`, `.25s` | Chỉ hover thiết bị có con trỏ |
| Hình thẻ | zoom nhẹ | `scale(1.05)`, `.45s` | Không làm mờ chữ |
| Bộ lọc | đổi nền earth → chữ trắng | `.2s` | `aria-pressed`, focus-visible rõ |
| Scroll reveal | IntersectionObserver hiện một lần | threshold `.08` | `prefers-reduced-motion`, no-JS vẫn hiện |
| Gallery | ảnh sáng hơn/scale nhẹ khi hover | `.35s` | Không giả làm nút nếu không click được |
| Share | đổi nhãn khi copy thành công | trạng thái React | Có thông báo `aria-live` |

**Không dùng:** parallax mạnh gây chóng mặt, popup ép email, auto-play video, animation khiến nội dung văn bản bị ẩn khỏi Google, hoặc clone code/ảnh có bản quyền từ website mẫu.

---

## C. Kiến trúc file gợi ý — thay vừa đủ, không phá trang chủ

```text
Saigon_Pearl/
├── public/
│   └── images/
│       └── news/                         # Tạo mới; ảnh thật có quyền sử dụng
│           ├── adoption-preparation.webp
│           ├── community-care.webp
│           ├── rescue-safety.webp
│           ├── gallery-cat-01.webp
│           ├── gallery-cat-02.webp
│           └── gallery-cat-03.webp
├── src/
│   ├── app/
│   │   ├── (root)/layout.tsx             # Chỉnh nhỏ: áp dụng font
│   │   ├── [locale]/
│   │   │   ├── layout.tsx                # Chỉnh nhỏ: áp dụng font
│   │   │   └── news/
│   │   │       ├── page.tsx              # THAY: landing Góc chia sẻ
│   │   │       ├── news.module.css       # MỚI: scoped UI, responsive, motion
│   │   │       ├── _components/
│   │   │       │   ├── NewsExplorer.tsx  # MỚI: lọc, tìm, xem thêm
│   │   │       │   ├── NewsReveal.tsx    # MỚI: reveal progressive enhancement
│   │   │       │   └── ShareArticle.tsx  # MỚI: Web Share / Copy URL
│   │   │       └── [slug]/page.tsx       # THAY: bài đọc hoàn chỉnh
│   │   └── globals.css                  # Chỉnh nhỏ: font/token toàn trang
│   ├── data/
│   │   ├── articles.ts                   # CÓ: giữ hợp đồng dữ liệu; mở rộng dần
│   │   └── news-editorial.ts             # MỚI: phân loại + copy VI/EN + tình trạng ảnh
│   └── lib/
│       ├── fonts.ts                     # MỚI: Be Vietnam Pro bằng next/font
│       ├── i18n.ts                      # GIỮ
│       ├── nav.ts                       # GIỮ
│       └── site.ts                      # GIỮ hàm pageMetadata()
└── ...
```

> Đường dẫn `news` hiện đã tự thêm vào cả Header/Footer từ `src/lib/nav.ts` và `src/lib/dictionaries.ts`. **Không thêm một menu Góc chia sẻ thứ hai.** Đường dẫn bắt buộc: `/vi/news`, `/en/news`, `/vi/news/prepare-for-adoption`, `/en/news/prepare-for-adoption` v.v.

---

## D. Chọn đúng **MỘT FONT** để sửa vấn đề chữ toàn site

### D1. Khuyến nghị chính: **Be Vietnam Pro**

- Hỗ trợ tiếng Việt tốt, gọn, thân thiện, rõ dấu, đủ độ dày; phù hợp cộng đồng, phi lợi nhuận, tone đất và sage.
- Dùng **cùng một family cho body, heading, button, card** để tránh tình trạng nhìn như 3 website khác nhau.
- Hiện tại `globals.css` dùng font hệ thống cho body, Georgia cho nhiều heading, và `Segoe Print`/`Caveat` ở một số sticker — sự pha trộn gây thiếu nhất quán và có thể tạo ra lỗi fallback khác nhau giữa Windows, Mac, điện thoại. **Không thể khẳng định đây là nguyên nhân duy nhất của lỗi font** nếu chưa thấy ảnh chụp lỗi cụ thể.
- `next/font/google` tải font khi **build**, rồi phục vụ font cùng domain, không cần chèn `<link>` từ Google Fonts trên mỗi trang. Next.js khuyến nghị dùng `next/font` cho App Router.

**File mới `src/lib/fonts.ts`:**

```ts
import { Be_Vietnam_Pro } from 'next/font/google';

export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-be-vietnam',
});
```

**Sửa `src/app/[locale]/layout.tsx`**, chỉ thêm import:

```tsx
import { beVietnamPro } from '@/lib/fonts';
```

Và sửa đúng **thẻ mở** của layout đang có, không thay các phần tử bên trong: `<html lang={locale} className={beVietnamPro.variable}>`.

**Sửa `src/app/(root)/layout.tsx`** để layout redirect đồng nhất:

```tsx
import '../globals.css';
import type { ReactNode } from 'react';
import { beVietnamPro } from '@/lib/fonts';

export default function RedirectRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>{children}</body>
    </html>
  );
}
```

**Sửa `src/app/globals.css`**: thay `font-family` của `body` và các heading đang ép Georgia/Times. Ví dụ:

```css
body {
  font-family: var(--font-be-vietnam), Arial, sans-serif;
  line-height: 1.6;
}

.section-title,
.page-intro h1,
.display-heading,
.story-heading,
.footer-quote,
.brand-name,
.prose h2,
.value-card h3,
.step-card h3 {
  font-family: var(--font-be-vietnam), Arial, sans-serif;
}

button, input, textarea, select {
  font-family: inherit;
}
```

**Bắt buộc tìm các dòng đang override thêm:**

```bash
# macOS/Linux/Git Bash
rg -n 'Georgia|Segoe Print|Caveat|Times New Roman|font-family|font:' src
```

Nếu không cài `rg`, trên Windows PowerShell dùng:

```powershell
Get-ChildItem src -Recurse -Include *.css,*.tsx,*.ts |
  Select-String -Pattern 'Georgia|Segoe Print|Caveat|Times New Roman|font-family|font:'
```

Sau đó thay từng khai báo `font-family: Georgia` và các shorthand `font: ... Georgia` có chủ đích. **Chú ý:** `font:` shorthand sẽ ghi đè cả `font-family`; chỉ sửa `body` không loại được toàn bộ sự pha trộn. Các CSS Module của About/Adopt/Rescue cũng cần rà tương tự, không chỉ `globals.css`. Với nhãn chữ viết tay trang chủ, có thể dùng `font-style: italic; font-weight: 600` bằng Be Vietnam Pro thay vì dùng font thiếu glyph tiếng Việt.

**Trường hợp build lỗi tải font**: máy build phải có mạng; không tải/nhúng font không rõ bản quyền. Nếu môi trường build không có mạng, sử dụng `next/font/local` **chỉ với file font được phép sử dụng mà bạn tự sở hữu/cấp quyền** và cập nhật đường dẫn cho đúng. Không trộn `@import` Google Fonts với `next/font`.

### D2. Mẹo typography cho tiếng Việt

| Cấp | Size gợi ý | Line-height | Weight |
|---|---:|---:|---:|
| H1 Hero | `clamp(36px, 5vw, 64px)` | `1.2` | `700` |
| H2 section | `clamp(27px, 3vw, 42px)` | `1.25` | `700` |
| Card title | `21–24px` | `1.35` | `700` |
| Bài đọc | `17–18px` | `1.85` | `400` |
| Description | `15–16px` | `1.7` | `400` |
| Eyebrow | `11–12px` | `1.5` | `700` |

Không giảm dòng chữ xuống 12px chỉ để cố nhét đủ nội dung dài tiếng Việt. Cho phép heading tự xuống dòng. Kiểm tra đủ các dấu: `ấ ầ ẫ ặ ư ơ ễ ỷ ỹ đ` trên Windows/macOS/Android/iOS và cả bản tiếng Anh.

---
## E. MÃ MẪU CHI TIẾT — TRIỂN KHAI V1 (TƯƠNG THÍCH REPO ĐANG CÓ)

**Nguyên tắc triển khai mã:** các khối sau được viết theo shape `Article` **đang có thật** trong `src/data/articles.ts`:

```ts
// ĐANG CÓ: KHÔNG TỰ Ý ĐỔI FIELD KHI CHƯA MIGRATE
export type Article = {
  slug: string;
  category: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  image: string;
  paragraphs: Record<Locale, string[]>;
};
```

Nghĩa là **không giả định** dự án đã có backend, author, `publishedAt`, markdown renderer hay CMS. Code V1 giữ bài viết do `articles` cung cấp và chỉ thêm phần quản lý editorial song ngữ. Dữ liệu metadata ngày/ảnh thật sẽ để `undefined/false` cho đến khi được duyệt.

### E1. Tạo `src/data/news-editorial.ts`

```ts
import type { Locale } from '@/lib/i18n';

export type NewsTopic = 'all' | 'adoption' | 'rescue' | 'community';
export type ActualNewsTopic = Exclude<NewsTopic, 'all'>;

export const newsTopics: NewsTopic[] = [
  'all', 'adoption', 'rescue', 'community',
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
    throw new Error(`Missing news topic mapping for slug: ${slug}`);
  }
  return topic;
}

// Đừng ghi ngày xuất bản giả. Khi đã xuất bản thật, thêm ISO 8601.
export const newsEditorial: Record<string, {
  publishedAt?: string;
  updatedAt?: string;
  imageVerified: boolean;
  imageAlt?: Record<Locale, string>; // Chỉ điền khi có ảnh thật và đã duyệt.
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
```

**Vì sao tách file này?** Biên tập và giao diện không trộn vào một file, thêm bài mới chỉ cần thêm nội dung vào `articles.ts`, topic mapping và thông tin đã kiểm chứng vào `news-editorial.ts`. Cả tiếng Việt và tiếng Anh cập nhật đồng bộ. Không ép tạo hồ sơ ca cứu hộ chỉ để lấp thẻ bài trống.

### E2. Tạo `src/app/[locale]/news/_components/NewsReveal.tsx`

```tsx
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from '../news.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

export function NewsReveal({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    // Nội dung hiện sẵn khi chưa chạy JS; animation chỉ là enhancement.
    node.classList.add(styles.revealPending);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.remove(styles.revealPending);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      node.classList.remove(styles.revealPending);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.revealBase} ${className}`}>
      {children}
    </div>
  );
}
```

> **Lưu ý accessibility:** không bọc mọi đoạn văn trong animation; một số người đọc dùng reduced-motion hoặc thiết bị yếu. Chỉ áp dụng cho khối section/card; ảnh đầu bài không trì hoãn hiển thị.

### E3. Tạo `src/app/[locale]/news/_components/NewsExplorer.tsx`

Bộ lọc chạy ở client nhưng dữ liệu đầu tiên vẫn được render trong HTML từ React/Next, có semantic `<article>`, `<h3>`, `<Link>` thật. Search không cần backend với vài chục bài, có thể mở rộng sang phân trang server khi bài nhiều.

```tsx
'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Search, BookOpen } from 'lucide-react';
import type { Article } from '@/data/articles';
import type { Locale } from '@/lib/i18n';
import { routeFor } from '@/lib/i18n';
import {
  newsCopy,
  newsTopics,
  newsEditorial,
  topicForArticle,
  type NewsTopic,
} from '@/data/news-editorial';
import styles from '../news.module.css';

function normalize(value: string) {
  return value.toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

type Props = {
  locale: Locale;
  items: Article[];
};

export function NewsExplorer({ locale, items }: Props) {
  const copy = newsCopy[locale];
  const [topic, setTopic] = useState<NewsTopic>('all');
  const [term, setTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const shown = useMemo(() => {
    const query = normalize(term.trim());
    return items.filter((article) => {
      const matchesTopic =
        topic === 'all' || topicForArticle(article.slug) === topic;
      const text = normalize([
        article.title[locale],
        article.description[locale],
        article.category[locale],
      ].join(' '));
      return matchesTopic && (!query || text.includes(query));
    });
  }, [items, locale, term, topic]);

  const availableTopics = newsTopics.filter((candidate) =>
    candidate === 'all' ||
    items.some((item) => topicForArticle(item.slug) === candidate)
  );

  return (
    <>
      <div className={styles.explorerTools}>
        <div className={styles.topicList} aria-label={copy.filterTitle}>
          {availableTopics.map((item) => (
            <button
              key={item}
              type="button"
              className={`${styles.topicButton} ${topic === item ? styles.topicActive : ''}`}
              onClick={() => {
                setTopic(item);
                setVisibleCount(6);
              }}
              aria-pressed={topic === item}
            >
              {copy.category[item]}
            </button>
          ))}
        </div>
        <label className={styles.searchBox}>
          <Search size={19} aria-hidden="true" />
          <span className={styles.visuallyHidden}>{copy.searchLabel}</span>
          <input
            type="search"
            value={term}
            onChange={(event) => {
              setTerm(event.target.value);
              setVisibleCount(6);
            }}
            placeholder={copy.searchPlaceholder}
          />
        </label>
      </div>

      <div className={styles.postGrid} aria-live="polite">
        {shown.slice(0, visibleCount).map((article) => (
          <article className={styles.postCard} key={article.slug}>
            <Link
              className={styles.postImageLink}
              href={routeFor(locale, `/news/${article.slug}`)}
              aria-label={article.title[locale]}
            >
              <Image
                src={article.image}
                alt={
                  newsEditorial[article.slug]?.imageVerified
                    ? (newsEditorial[article.slug]?.imageAlt?.[locale] ?? copy.imagePlaceholder)
                    : copy.imagePlaceholder
                }
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1040px) 48vw, 31vw"
                className={styles.coverImage}
              />
            </Link>
            <div className={styles.postBody}>
              <span className={styles.categoryLabel}>
                {copy.category[topicForArticle(article.slug)]}
              </span>
              <h3 className={styles.postTitle}>
                <Link href={routeFor(locale, `/news/${article.slug}`)}>
                  {article.title[locale]}
                </Link>
              </h3>
              <p className={styles.postExcerpt}>{article.description[locale]}</p>
              <Link
                className={styles.readLink}
                href={routeFor(locale, `/news/${article.slug}`)}
              >
                {copy.read}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <div className={styles.emptyState} role="status">
          <BookOpen size={34} strokeWidth={1.5} aria-hidden="true" />
          <p>{copy.empty}</p>
        </div>
      )}

      {visibleCount < shown.length && (
        <div className={styles.loadMoreWrap}>
          <button
            type="button"
            className={styles.outlineButton}
            onClick={() => setVisibleCount((n) => n + 6)}
          >
            {copy.loadMore}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
```

**Quan trọng:** 3 bài hiện có thì bài nổi bật lấy 1, bộ lọc phía dưới chỉ còn 2 bài. Đây là **đúng với dữ liệu hiện có**; không tạo 12 thẻ bài giả để làm giao diện đầy. Khi có 6–12 bài thật và đã biên tập, lưới tự phong phú hơn.

### E4. Tạo `src/app/[locale]/news/_components/ShareArticle.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Share2, Check, Link2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { newsCopy } from '@/data/news-editorial';
import styles from '../news.module.css';

export function ShareArticle({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = newsCopy[locale];

  async function share() {
    try {
      setFailed(false);
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
        return;
      }
      if (!navigator.clipboard?.writeText) {
        setFailed(true);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch (error) {
      // Hủy bỏ Share Sheet không phải lỗi bảo mật.
      if (error instanceof Error && error.name === 'AbortError') return;
      setFailed(true);
    }
  }

  return (
    <div className={styles.shareGroup}>
      <button type="button" onClick={share} className={styles.outlineButton}>
        {copied ? <Check size={17} aria-hidden="true" />
          : <Share2 size={17} aria-hidden="true" />}
        {copied ? t.shared : t.share}
      </button>
      <span className={styles.visuallyHidden} role="status" aria-live="polite">
        {failed
          ? (locale === 'vi' ? 'Không thể chia sẻ trên thiết bị này.' : 'Sharing is unavailable on this device.')
          : copied ? t.shared : ''}
      </span>
      <Link2 size={17} className={styles.shareDecoration} aria-hidden="true" />
    </div>
  );
}
```

**Không dùng icon bằng ký tự `→`, `♥`, `🐾` trong giao diện.** Các icon ở đây đều được render bằng component của `lucide-react`.

### E5. **THAY TOÀN BỘ** `src/app/[locale]/news/page.tsx` (trang Góc chia sẻ)

```tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  HeartHandshake,
  PawPrint,
} from 'lucide-react';
import { articles } from '@/data/articles';
import { newsCopy, topicForArticle, newsEditorial } from '@/data/news-editorial';
import { isLocale, routeFor } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';
import { NewsExplorer } from './_components/NewsExplorer';
import { NewsReveal } from './_components/NewsReveal';
import styles from './news.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = newsCopy[locale];
  return pageMetadata(
    locale,
    '/news',
    locale === 'vi'
      ? 'Góc chia sẻ mèo, cứu hộ & nhận nuôi Saigon Pearl'
      : 'Cat Stories, Rescue & Adoption Guides at Saigon Pearl',
    copy.heroDescription
  );
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = newsCopy[locale];
  const featured = articles[0];
  const remaining = featured
    ? articles.filter((item) => item.slug !== featured.slug)
    : [];

  const galleryImages = [
    '/images/cat-luna.webp',
    '/images/story.webp',
    '/images/cta-community.webp',
  ];

  return (
    <div className={styles.page} data-page="community-stories">
      {/* 1. Hero */}
      <section className={styles.hero} aria-labelledby="news-page-title">
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href={routeFor(locale, '')}>{copy.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.breadcrumb}</span>
          </nav>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 id="news-page-title">{copy.heroTitle}</h1>
              <p className={styles.heroDescription}>{copy.heroDescription}</p>
            </div>
            <div className={styles.heroStamp} aria-hidden="true">
              <PawPrint size={61} strokeWidth={1.05} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured article; link stays a real HTML link */}
      {featured && (
        <section className={styles.featuredSection} aria-labelledby="news-featured-title">
          <div className={styles.container}>
            <NewsReveal className={styles.featuredGrid}>
              <Link
                href={routeFor(locale, `/news/${featured.slug}`)}
                className={styles.featuredImageWrap}
                aria-label={featured.title[locale]}
              >
                <Image
                  src={featured.image}
                  alt={
                    newsEditorial[featured.slug]?.imageVerified
                      ? (newsEditorial[featured.slug]?.imageAlt?.[locale] ?? copy.imagePlaceholder)
                      : copy.imagePlaceholder
                  }
                  fill
                  priority
                  sizes="(max-width: 820px) 100vw, 55vw"
                  className={styles.coverImage}
                />
              </Link>
              <div className={styles.featuredCopy}>
                <span className={styles.eyebrow} id="news-featured-title">
                  <BookOpen size={15} aria-hidden="true" />
                  {copy.featured}
                </span>
                <span className={styles.categoryLabel}>
                  {copy.category[topicForArticle(featured.slug)]}
                </span>
                <h2 className={styles.featuredTitle}>
                  <Link href={routeFor(locale, `/news/${featured.slug}`)}>
                    {featured.title[locale]}
                  </Link>
                </h2>
                <p>{featured.description[locale]}</p>
                <Link
                  href={routeFor(locale, `/news/${featured.slug}`)}
                  className={styles.textLink}
                >
                  {copy.read}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </div>
            </NewsReveal>
          </div>
        </section>
      )}

      {/* 3. Taxonomy filters + search + masonry-like editorial grid */}
      <section className={styles.exploreSection} aria-labelledby="news-explore-title">
        <div className={styles.container}>
          <NewsReveal className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.filterEyebrow}</p>
            <h2 id="news-explore-title">{copy.filterTitle}</h2>
          </NewsReveal>
          <NewsExplorer locale={locale} items={remaining} />
        </div>
      </section>

      {/* 4. Quiet quote band */}
      <section className={styles.quoteBand} aria-label={copy.quoteCaption}>
        <div className={styles.container}>
          <NewsReveal className={styles.quoteContent}>
            <HeartHandshake size={33} strokeWidth={1.35} aria-hidden="true" />
            <blockquote>“{copy.quote}”</blockquote>
            <p>{copy.quoteCaption}</p>
          </NewsReveal>
        </div>
      </section>

      {/* 5. Visual journal gallery: replace these 3 illustrative assets */}
      <section className={styles.gallerySection} aria-labelledby="news-gallery-title">
        <div className={styles.container}>
          <NewsReveal className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.galleryEyebrow}</p>
            <h2 id="news-gallery-title">{copy.galleryTitle}</h2>
            <p className={styles.sectionLead}>{copy.galleryDescription}</p>
          </NewsReveal>
          <div className={styles.galleryGrid}>
            {galleryImages.map((src, index) => (
              <figure key={src} className={styles.galleryFigure}>
                <div className={styles.galleryImageWrap}>
                  <Image
                    src={src}
                    alt={`${copy.imagePlaceholder}: ${copy.galleryCaptions[index]}`}
                    fill
                    sizes="(max-width: 700px) 100vw, 32vw"
                    className={styles.coverImage}
                  />
                </div>
                <figcaption>{copy.galleryCaptions[index]}</figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.galleryNotice}>{copy.galleryNotice}</p>
        </div>
      </section>

      {/* 6. Community CTA; real routes, no fake donation form */}
      <section className={styles.ctaSection} aria-labelledby="news-cta-title">
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div>
            <p className={styles.eyebrow}>{copy.ctaEyebrow}</p>
            <h2 id="news-cta-title">{copy.ctaTitle}</h2>
            <p>{copy.ctaDescription}</p>
            <div className={styles.ctaActions}>
              <Link href={routeFor(locale, '/cats')} className={styles.solidButton}>
                {copy.catsButton}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href={routeFor(locale, '/adopt')} className={styles.outlineButton}>
                {copy.adoptButton}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className={styles.ctaIcon} aria-hidden="true">
            <PawPrint size={86} strokeWidth={1.15} />
          </div>
        </div>
      </section>
    </div>
  );
}
```

### E6. **THAY TOÀN BỘ** `src/app/[locale]/news/[slug]/page.tsx` (trang bài đọc)

Đây là phần Google quan tâm: mỗi bài có URL, H1 riêng, metadata riêng, body server-rendered, liên kết bài liên quan; tùy chọn JSON-LD BlogPosting. Không gắn ngày bài nếu chưa có ngày đăng thực.

```tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, HeartHandshake, BookOpen } from 'lucide-react';
import { articles } from '@/data/articles';
import { newsCopy, newsEditorial, topicForArticle } from '@/data/news-editorial';
import { isLocale, routeFor } from '@/lib/i18n';
import { brand, pageMetadata, siteUrl } from '@/lib/site';
import { ShareArticle } from '../_components/ShareArticle';
import styles from '../news.module.css';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const base = pageMetadata(
    locale,
    `/news/${slug}`,
    article.title[locale],
    article.description[locale],
    'article'
  );
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [{ url: article.image,
        alt: newsEditorial[slug]?.imageAlt?.[locale] ?? article.title[locale],
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title[locale],
      description: article.description[locale],
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const t = newsCopy[locale];
  const info = newsEditorial[slug];
  const related = articles.filter((item) => item.slug !== slug).slice(0, 3);
  const articleUrl = `${siteUrl()}${routeFor(locale, `/news/${slug}`)}`;
  const imageUrl = `${siteUrl()}${article.image}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title[locale],
    description: article.description[locale],
    mainEntityOfPage: articleUrl,
    image: imageUrl,
    inLanguage: locale === 'vi' ? 'vi-VN' : 'en',
    // Chỉ dùng tên tổ chức nếu đội ngũ thực sự đứng tên và duyệt bài.
    author: { '@type': 'Organization', name: brand, url: siteUrl() },
    publisher: { '@type': 'Organization', name: brand, url: siteUrl() },
    ...(info?.publishedAt ? { datePublished: info.publishedAt } : {}),
    ...(info?.updatedAt ? { dateModified: info.updatedAt } : {}),
  };

  return (
    <div className={styles.page} data-page="community-article">
      <section className={styles.articleHead}>
        <div className={styles.readingContainer}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href={routeFor(locale, '')}>{t.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={routeFor(locale, '/news')}>{t.breadcrumb}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className={styles.breadcrumbCurrent}>
              {article.title[locale]}
            </span>
          </nav>
          <span className={styles.categoryLabel}>
            {t.category[topicForArticle(article.slug)]}
          </span>
          <h1 className={styles.articleTitle}>{article.title[locale]}</h1>
          <p className={styles.articleLead}>{article.description[locale]}</p>
          {info?.publishedAt && (
            <p className={styles.articleMeta}>
              <time dateTime={info.publishedAt}>
                {new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                }).format(new Date(info.publishedAt))}
              </time>
            </p>
          )}
        </div>
      </section>

      <div className={styles.container}>
        <figure className={styles.articleHeroImage}>
          <div className={styles.articleHeroMedia}>
            <Image
              src={article.image}
              alt={info?.imageVerified
                ? (info.imageAlt?.[locale] ?? t.imagePlaceholder)
                : t.imagePlaceholder}
              fill
              priority
              sizes="(max-width: 900px) 94vw, 1100px"
              className={styles.coverImage}
            />
          </div>
          {!info?.imageVerified && <figcaption>{t.imagePlaceholder}</figcaption>}
        </figure>

        <div className={styles.articleReadingGrid}>
          <article className={styles.articleBody}>
            {article.paragraphs[locale].map((text, index) => (
              <p key={`${slug}-${index}`}>{text}</p>
            ))}
            <aside className={styles.articleNotice}>
              <BookOpen size={23} aria-hidden="true" />
              <p>{t.articleDisclaimer}</p>
            </aside>
            <ShareArticle locale={locale} title={article.title[locale]} />
            <Link href={routeFor(locale, '/news')} className={styles.backLink}>
              <ArrowLeft size={18} aria-hidden="true" />
              {t.allArticles}
            </Link>
          </article>

          <aside className={styles.articleAside} aria-label={t.related}>
            <div className={styles.asidePanel}>
              <HeartHandshake size={30} strokeWidth={1.45} aria-hidden="true" />
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaDescription}</p>
              <Link href={routeFor(locale, '/adopt')} className={styles.textLink}>
                {t.adoptButton}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className={styles.relatedSection} aria-labelledby="news-related-title">
          <div className={styles.container}>
            <h2 id="news-related-title" className={styles.relatedTitle}>
              {t.related}
            </h2>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <article key={item.slug} className={styles.relatedCard}>
                  <Link href={routeFor(locale, `/news/${item.slug}`)}>
                    <span className={styles.categoryLabel}>
                      {t.category[topicForArticle(item.slug)]}
                    </span>
                    <h3>{item.title[locale]}</h3>
                    <span className={styles.readLink}>
                      {t.read}
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </div>
  );
}
```

**Lưu ý:** mã JSON-LD trên phải được **đối chiếu với nội dung thực tế** trước khi Google lập chỉ mục. Không khai báo tác giả bác sĩ thú y, nhà báo, ngày xuất bản, dữ liệu thực địa hoặc tên người nếu chưa có thật. `BlogPosting` giúp máy tìm kiếm hiểu nội dung, **không đảm bảo rich result hay thứ hạng**. Ở giai đoạn sau nên tăng `Article` shape để các bài có heading, ảnh theo từng mục, nguồn tham khảo, tác giả và người kiểm duyệt riêng.

### E7. Tạo **`src/app/[locale]/news/news.module.css`** — CSS đầy đủ cho cả hai loại trang

**Toàn bộ selector nằm trong CSS Module**, không viết `.article-card`/`.hero` global dễ đụng với trang chủ. Giao diện đổi theo đúng bốn màu cố định. Các tỉ lệ desktop/mobile và hover được chỉ định rõ để người khác có thể sửa từng khối dễ dàng.

```css
/* === SAIGON PEARL PURRS / NEWS VISUAL SYSTEM === */
.page {
  --news-cream: #F7F4EE;
  --news-sage: #DCE5D7;
  --news-earth: #9B7862;
  --news-ink: #453D35;
  --news-border: rgba(69, 61, 53, 0.14);
  --news-shadow: 0 18px 42px rgba(69, 61, 53, 0.08);
  --news-ease: cubic-bezier(.22, 1, .36, 1);
  background: var(--news-cream);
  color: var(--news-ink);
  font-family: var(--font-be-vietnam), Arial, sans-serif;
  overflow: clip;
}
.page *, .page *::before, .page *::after { box-sizing: border-box; }
.page a { color: inherit; text-decoration: none; }
.page button, .page input { font: inherit; }
.page h1, .page h2, .page h3, .page p { overflow-wrap: anywhere; }
.page button:focus-visible, .page a:focus-visible, .page input:focus-visible {
  outline: 3px solid var(--news-earth);
  outline-offset: 4px;
}
.container {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
}
.readingContainer {
  width: min(950px, calc(100% - 48px));
  margin: 0 auto;
}
.visuallyHidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 700 11px/1.5 var(--font-be-vietnam), Arial, sans-serif;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--news-ink);
  margin: 0;
}
.categoryLabel {
  display: inline-flex;
  align-items: center;
  width: max-content;
  max-width: 100%;
  font-size: 11px;
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: .03em;
  color: var(--news-ink);
  background: var(--news-sage);
  border-radius: 999px;
  padding: 7px 13px;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  max-width: 100%;
  font-size: 12px;
  line-height: 1.6;
  font-weight: 500;
  color: var(--news-ink);
}
.breadcrumb a { text-decoration: underline; text-underline-offset: 4px; }
.breadcrumb a:hover { color: var(--news-earth); }
.breadcrumbCurrent { max-width: 52ch; overflow-wrap: anywhere; }

/* 1. HERO */
.hero {
  padding: 34px 0 78px;
  position: relative;
  background:
    radial-gradient(circle at 90% 18%, rgba(220,229,215,.88) 0, transparent 33%),
    var(--news-cream);
}
.heroInner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 160px;
  align-items: center;
  gap: 38px;
  padding-top: 62px;
}
.heroText { max-width: 790px; animation: newsEnter .55s var(--news-ease) both; }
.hero h1 {
  font-size: clamp(36px, 5vw, 65px);
  line-height: 1.19;
  letter-spacing: -.035em;
  color: var(--news-ink);
  font-weight: 700;
  margin: 17px 0 22px;
}
.heroDescription {
  max-width: 660px;
  font-size: clamp(15px, 1.55vw, 18px);
  line-height: 1.85;
  color: var(--news-ink);
  margin: 0;
}
.heroStamp {
  display: grid;
  place-items: center;
  width: 144px;
  height: 144px;
  border: 1.5px solid rgba(155,120,98,.42);
  border-radius: 50%;
  transform: rotate(-13deg);
  background: rgba(220,229,215,.65);
  color: var(--news-earth);
}

/* 2. FEATURED */
.featuredSection { padding: 0 0 92px; }
.featuredGrid {
  display: grid;
  grid-template-columns: minmax(0, 1.14fr) minmax(0, .86fr);
  align-items: center;
  gap: clamp(30px, 4.5vw, 74px);
}
.featuredImageWrap {
  display: block;
  position: relative;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  border-radius: 24px;
  background: var(--news-sage);
}
.coverImage {
  object-fit: cover;
  transition: transform .5s var(--news-ease);
}
.featuredCopy { max-width: 510px; }
.featuredCopy .categoryLabel { margin: 22px 0 15px; }
.featuredTitle {
  font-size: clamp(29px, 3.15vw, 45px);
  font-weight: 700;
  line-height: 1.28;
  letter-spacing: -.025em;
  margin: 0 0 20px;
}
.featuredCopy > p {
  font-size: 16px;
  line-height: 1.85;
  margin: 0 0 24px;
}
.textLink, .readLink, .backLink {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--news-ink);
  font-weight: 700;
  font-size: 14px;
  line-height: 1.5;
  border-bottom: 1px solid var(--news-earth);
  padding-bottom: 4px;
  transition: gap .2s ease, color .2s ease;
}
.textLink:hover, .readLink:hover, .backLink:hover {
  gap: 14px;
  color: var(--news-earth);
}

/* 3. POSTS GRID + FILTER */
.exploreSection { padding: 87px 0 100px; background: #F7F4EE; }
.sectionHeading { max-width: 780px; margin-bottom: 31px; }
.sectionHeading h2 {
  font-size: clamp(29px, 3.15vw, 44px);
  line-height: 1.25;
  margin: 11px 0 0;
  letter-spacing: -.025em;
}
.sectionLead { font-size: 15.5px; line-height: 1.82; margin: 14px 0 0; }
.explorerTools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 0 31px;
}
.topicList { display: flex; flex-wrap: wrap; gap: 9px; }
.topicButton {
  min-height: 42px;
  padding: 10px 17px;
  border-radius: 999px;
  border: 1px solid var(--news-border);
  background: transparent;
  color: var(--news-ink);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: background .2s, border-color .2s, transform .2s;
}
.topicActive, .topicButton:hover {
  background: var(--news-ink);
  border-color: var(--news-ink);
  color: var(--news-cream);
}
.searchBox {
  display: flex;
  position: relative;
  align-items: center;
  gap: 11px;
  width: min(330px, 100%);
  min-height: 46px;
  padding: 0 14px;
  background: rgba(255,255,255,.6);
  border: 1px solid var(--news-border);
  border-radius: 12px;
  color: var(--news-earth);
}
.searchBox input {
  display: block;
  width: 100%;
  min-width: 0;
  border: 0;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: var(--news-ink);
}
.searchBox:focus-within { border-color: var(--news-earth); }
.postGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}
.postCard {
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,.65);
  border: 1px solid var(--news-border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(69,61,53,.03);
  transition: transform .27s var(--news-ease), box-shadow .27s, border-color .27s;
}
.postImageLink {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  background: var(--news-sage);
  overflow: hidden;
}
.postBody {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 25px 27px;
  flex: 1;
}
.postTitle {
  font-size: clamp(20px, 1.55vw, 24px);
  line-height: 1.38;
  letter-spacing: -.018em;
  margin: 17px 0 13px;
}
.postExcerpt { font-size: 13.5px; line-height: 1.85; margin: 0 0 21px; }
.postBody .readLink { margin-top: auto; }
.emptyState {
  min-height: 160px;
  display: grid;
  justify-items: center;
  place-content: center;
  text-align: center;
  gap: 14px;
  color: var(--news-ink);
  border: 1px dashed var(--news-border);
  border-radius: 18px;
  background: rgba(220,229,215,.35);
}
.emptyState p { margin: 0; font-size: 14px; }
.loadMoreWrap { display: flex; justify-content: center; margin-top: 38px; }

/* Shared CTA and buttons */
.solidButton, .outlineButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 12px 23px;
  border-radius: 999px;
  font-size: 13.5px;
  line-height: 1.35;
  font-weight: 700;
  cursor: pointer;
  transition: transform .22s ease, background .22s ease, box-shadow .22s ease;
}
.solidButton {
  background: var(--news-ink);
  color: var(--news-cream) !important;
  border: 1px solid var(--news-ink);
}
.outlineButton {
  background: transparent;
  color: var(--news-ink) !important;
  border: 1.5px solid var(--news-earth);
}
.solidButton:hover, .outlineButton:hover { transform: translateY(-2px); }
.outlineButton:hover { background: rgba(155,120,98,.10); }

/* 4. QUOTE BAND */
.quoteBand { background: var(--news-sage); padding: 77px 0 80px; }
.quoteContent {
  max-width: 850px;
  margin: 0 auto;
  text-align: center;
  color: var(--news-ink);
}
.quoteContent > svg { color: var(--news-earth); }
.quoteContent blockquote {
  margin: 18px 0 17px;
  font-size: clamp(23px, 2.4vw, 36px);
  line-height: 1.5;
  letter-spacing: -.02em;
  font-weight: 600;
}
.quoteContent > p { font-size: 12px; font-weight: 700; margin: 0; }

/* 5. GALLERY */
.gallerySection { padding: 98px 0; }
.galleryGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.galleryFigure { min-width: 0; margin: 0; }
.galleryImageWrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 20px;
  background: var(--news-sage);
}
.galleryFigure:nth-child(2) .galleryImageWrap { aspect-ratio: 4 / 3; }
.galleryFigure figcaption { margin-top: 13px; font-size: 13.5px; font-weight: 700; }
.galleryNotice {
  margin: 20px 0 0;
  font-size: 12px;
  line-height: 1.7;
  font-weight: 500;
}

/* 6. COMMUNITY CTA */
.ctaSection { background: var(--news-sage); padding: 82px 0; }
.ctaInner { display: grid; grid-template-columns: minmax(0, 1fr) 190px; gap: 32px; align-items: center; }
.ctaInner h2 {
  font-size: clamp(28px, 3vw, 44px);
  line-height: 1.24;
  letter-spacing: -.02em;
  max-width: 770px;
  margin: 16px 0 15px;
}
.ctaInner p:not(.eyebrow) { font-size: 15px; line-height: 1.85; max-width: 710px; margin: 0 0 25px; }
.ctaActions { display: flex; flex-wrap: wrap; gap: 12px; }
.ctaIcon {
  width: 180px;
  height: 180px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(247,244,238,.65);
  color: var(--news-earth);
}

/* 7. SINGLE ARTICLE */
.articleHead { padding: 40px 0 42px; }
.articleHead .categoryLabel { margin: 43px 0 13px; }
.articleTitle {
  max-width: 930px;
  font-size: clamp(34px, 4.4vw, 60px);
  letter-spacing: -.03em;
  line-height: 1.25;
  font-weight: 700;
  margin: 0 0 17px;
}
.articleLead { max-width: 760px; font-size: 17px; line-height: 1.82; margin: 0; }
.articleMeta { font-size: 13px; margin: 22px 0 0; }
.articleHeroImage { margin: 0; }
.articleHeroMedia {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 8.5;
  overflow: hidden;
  border-radius: 23px;
  background: var(--news-sage);
}
.articleHeroImage figcaption { margin: 9px 0 0; font-size: 12px; line-height: 1.5; }
.articleReadingGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: clamp(32px, 6vw, 80px);
  align-items: start;
  margin: 55px 0 105px;
}
.articleBody { max-width: 760px; min-width: 0; }
.articleBody p {
  margin: 0 0 27px;
  font-size: 17px;
  line-height: 1.93;
}
.articleBody h2 {
  font-size: clamp(24px, 2.5vw, 34px);
  line-height: 1.3;
  margin: 42px 0 20px;
}
.articleBody h3 { font-size: 21px; line-height: 1.4; margin: 28px 0 13px; }
.articleBody ul, .articleBody ol { line-height: 1.88; padding-left: 24px; }
.articleBody li { margin-bottom: 10px; }
.articleNotice {
  margin: 36px 0;
  padding: 23px 24px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: rgba(220,229,215,.63);
  border-left: 3px solid var(--news-earth);
  border-radius: 10px;
}
.articleNotice svg { flex: none; color: var(--news-earth); margin-top: 4px; }
.articleNotice p { margin: 0; font-size: 13.5px; line-height: 1.85; }
.articleAside { min-width: 0; position: sticky; top: 24px; }
.asidePanel {
  background: var(--news-sage);
  border-radius: 19px;
  padding: 28px 25px;
}
.asidePanel > svg { color: var(--news-earth); }
.asidePanel h2 { font-size: 24px; line-height: 1.4; margin: 18px 0 13px; }
.asidePanel p { font-size: 13px; line-height: 1.85; margin: 0 0 25px; }
.shareGroup { display: flex; align-items: center; gap: 12px; margin: 27px 0 20px; }
.shareDecoration { color: var(--news-earth); }
.backLink { display: inline-flex; margin-top: 8px; }

/* 8. RELATED STORIES */
.relatedSection { padding: 72px 0 96px; border-top: 1px solid var(--news-border); }
.relatedTitle { font-size: clamp(26px, 3vw, 40px); line-height: 1.3; margin: 0 0 30px; }
.relatedGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.relatedCard {
  border: 1px solid var(--news-border);
  border-radius: 17px;
  padding: 23px;
  background: rgba(255,255,255,.65);
  transition: border-color .2s, transform .2s;
}
.relatedCard > a { display: flex; flex-direction: column; min-height: 180px; align-items: flex-start; }
.relatedCard h3 { font-size: 20px; line-height: 1.42; margin: 17px 0 18px; }
.relatedCard .readLink { margin-top: auto; }

/* 9. MOTION */
.revealBase { opacity: 1; transform: translateY(0); transition: opacity .65s ease, transform .65s var(--news-ease); }
.revealPending { opacity: 0; transform: translateY(17px); }
@keyframes newsEnter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (hover: hover) and (pointer: fine) {
  .postCard:hover { transform: translateY(-5px); box-shadow: var(--news-shadow); border-color: rgba(155,120,98,.38); }
  .postCard:hover .coverImage,
  .featuredImageWrap:hover .coverImage,
  .galleryFigure:hover .coverImage { transform: scale(1.045); }
  .relatedCard:hover { transform: translateY(-3px); border-color: var(--news-earth); }
}

/* 10. RESPONSIVE */
@media (max-width: 1040px) {
  .postGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .relatedGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .heroInner { grid-template-columns: minmax(0,1fr) 120px; }
  .heroStamp { width: 120px; height: 120px; }
  .articleReadingGrid { grid-template-columns: minmax(0,1fr) 260px; gap: 30px; }
}
@media (max-width: 820px) {
  .hero { padding-bottom: 54px; }
  .heroInner { padding-top: 44px; }
  .featuredGrid { grid-template-columns: 1fr; gap: 30px; }
  .featuredCopy { max-width: none; }
  .articleReadingGrid { grid-template-columns: 1fr; margin-bottom: 68px; }
  .articleAside { position: static; }
  .ctaInner { grid-template-columns: 1fr; }
  .ctaIcon { display: none; }
}
@media (max-width: 700px) {
  .container, .readingContainer { width: min(100% - 32px, 1200px); }
  .heroStamp { display: none; }
  .heroInner { grid-template-columns: 1fr; }
  .hero h1 { font-size: clamp(33px, 8vw, 48px); }
  .exploreSection, .gallerySection { padding: 66px 0; }
  .featuredSection { padding-bottom: 56px; }
  .featuredImageWrap { border-radius: 16px; }
  .explorerTools { flex-direction: column; align-items: stretch; }
  .searchBox { width: 100%; }
  .postGrid, .relatedGrid { grid-template-columns: 1fr; }
  .galleryGrid { grid-template-columns: 1fr; }
  .galleryImageWrap { aspect-ratio: 16 / 10; }
  .postImageLink { aspect-ratio: 16 / 10; }
  .ctaSection { padding: 65px 0; }
  .quoteBand { padding: 58px 0; }
  .articleHead { padding: 28px 0 33px; }
  .articleHead .categoryLabel { margin-top: 29px; }
  .articleHeroMedia { aspect-ratio: 4 / 3; border-radius: 15px; }
  .articleBody p { font-size: 16px; line-height: 1.88; }
  .articleReadingGrid { margin-top: 34px; }
  .relatedSection { padding: 56px 0 72px; }
}
@media (prefers-reduced-motion: reduce) {
  .page *, .page *::before, .page *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
  .revealPending { opacity: 1; transform: none; }
}
```

**Định lượng kỳ vọng khi chỉnh CSS:**

- Desktop `1440px`: featured 2 cột, card 3 cột, gallery 3 cột, sidebar bài đọc sticky.
- Tablet `820–1040px`: card 2 cột, featured chuyển 1 cột ở 820px.
- Mobile `375–430px`: 1 cột, input tìm bài toàn chiều ngang, không bị scroll ngang, touch target ≥ 42–48px.
- Không ép `height` cố định cho thẻ có text, vì tiếng Việt dài hơn tiếng Anh.
- **Ảnh đang là minh họa**, giữ thông báo cho đến lúc thay và xác nhận ảnh thật. Nếu đã thay ảnh thật, cập nhật `newsEditorial[slug].imageVerified` cho từng ảnh **sau khi kiểm tra quyền sử dụng**; riêng gallery còn thông báo minh họa đến khi thay cả 3 ảnh.

---
## F. HÌNH ẢNH: CHỤP GÌ, ĐẶT Ở ĐÂU, TỐI ƯU NHƯ THẾ NÀO?

### F1. Không nên tiếp tục dùng cùng 4 ảnh mèo cho 20 bài

Ảnh có nhiệm vụ kể câu chuyện, chứ không phải lấp khoảng trống. Bộ ảnh hiện có trong `public/images/` chỉ là ảnh minh họa. Khi có dữ liệu thật, hãy chụp **mỗi bài một bộ ảnh riêng**, đúng mèo, đúng hoạt động và chỉ khi được phép công bố. Với cùng một bài, có thể có ảnh ngang mở đầu, ảnh chi tiết cảnh chăm sóc và ảnh đại diện vuông.

**Shot list nên ưu tiên (đề xuất cho cộng đồng khi có hoạt động thực tế):**

| Tên file đề xuất | Nội dung cần chụp *khi có thật* | Khối giao diện | Dung lượng mục tiêu tham khảo |
|---|---|---|---|
| `public/images/news/community-cat-hero.webp` | Một bé mèo ngoài trời, ánh sáng tự nhiên, không lộ vị trí nhạy cảm | Featured 16:11 | khoảng 150–300 KB |
| `public/images/news/volunteer-care.webp` | Người chăm sóc đưa nước/thức ăn đúng chỗ, được đồng ý chụp | Our Story / Gallery | khoảng 120–250 KB |
| `public/images/news/adoption-preparation.webp` | Góc an toàn, lồng vận chuyển, đồ dùng cho mèo | Bài chuẩn bị nhận nuôi | khoảng 120–250 KB |
| `public/images/news/kitten-shelter.webp` | Mèo con trong không gian ấm và an toàn | Bài chăm sóc mèo con | khoảng 120–250 KB |
| `public/images/news/balcony-safety.webp` | Ban công đã bảo vệ an toàn, tránh lộ số căn hộ | Bài an toàn khi nuôi mèo chung cư | khoảng 100–200 KB |
| `public/images/news/community-care-journal.webp` | Hoạt động cộng đồng thật, có chấp thuận hình ảnh | Nhật ký cộng đồng | khoảng 150–300 KB |
| `public/images/news/cat-profile-[slug].webp` | Từng bé mèo được xác minh hồ sơ | Bài liên quan đến nhận nuôi | khoảng 120–220 KB |
| `public/images/news/og-[slug].webp` | Ảnh riêng từng bài, không dùng nội dung giả | Chia sẻ link Facebook/Zalo | 1200×630 px, tùy nội dung |

Các kích thước là **mục tiêu kỹ thuật**, không phải giới hạn cứng. Ưu tiên ảnh đủ nét và không nén đến mức mờ lông/mắt mèo.

### F2. Kỹ thuật upload và alt text

- Ảnh thẻ: chuẩn bị kích thước khoảng `900×675` (4:3). Ảnh mở bài: khoảng `1600×900` (16:9). Ảnh chia sẻ: `1200×630`.
- Sử dụng WebP/AVIF, tối ưu ảnh nhưng vẫn giữ nét tự nhiên; `next/image` với `fill`, `sizes`, bố mẹ `position:relative` và `aspect-ratio`.
- Với một bức ảnh thật, **alt mô tả điều mắt nhìn thấy**, không spam: tốt: `Mèo mướp nằm cạnh bát nước sạch trong sân vườn`; không tốt: `nhận nuôi mèo saigon pearl cứu hộ mèo giá rẻ mèo cần tìm nhà`.
- Có `caption` khi ảnh mang thông tin: ví dụ `Ảnh do nhóm cư dân cung cấp, công bố với sự đồng ý của người chụp` **chỉ khi đúng sự thật**.
- Gỡ EXIF/địa điểm GPS và thông tin cá nhân trước khi đăng ảnh; cân nhắc vị trí đàn mèo để tránh gây nguy hiểm cho mèo.
- Không tải ảnh về từ các website khác rồi coi là ảnh của cộng đồng; không dùng ảnh AI giả làm hình ảnh cứu hộ thực tế.
- Nếu ảnh chỉ minh họa kiến thức, ghi rõ `Hình minh họa`; nếu ảnh có mèo thật, kiểm tra hồ sơ và quyền sử dụng.

**Gợi ý nâng cấp dữ liệu alt ở pha sau:**

```ts
// Không buộc phải đổi shape Article ngay hôm nay.
// Khi có ảnh thật, thêm metadata tương ứng với slug.
export const verifiedImageMeta = {
  'prepare-for-adoption': {
    alt: {
      vi: 'Ảnh thật mô tả đúng cảnh/đối tượng trong ảnh (sẽ điền sau)',
      en: 'Real photo alt text describing what is actually visible',
    },
    credit: '',
    photoConsentConfirmed: false,
  },
};
```

Đừng tự động sử dụng *tiêu đề bài* làm alt ảnh thật: tiêu đề bài có thể rất khác vật thể đang được chụp. Trong code V1, alt ảnh tạm là thông báo minh họa để không mô tả sai; **trước khi công khai ảnh thật, bắt buộc thay alt trong dữ liệu biên tập bằng mô tả chính xác.**

### F3. Gallery cho trang Góc chia sẻ

V1 đã có **3 item gallery tĩnh**, bo tròn 20px, tỉ lệ 4:3, hiệu ứng scale nhẹ, caption dưới ảnh. Không đặt các ảnh có vẻ là hoạt động thật nếu chưa có ảnh thật. Khi đủ 8–12 ảnh được phép sử dụng, cân nhắc nâng thành **mosaic** với ô đầu chiếm `2 columns`, các ô còn lại cân bằng; trên mobile xếp một cột. Chỉ thêm lightbox nếu người dùng thực sự cần zoom: modal phải đóng qua Escape, click close, giữ focus và có `aria-modal`; không làm ảnh chỉ hover để trông như bấm được.

---

## G. CHIẾN LƯỢC NỘI DUNG: ĐÂY MỚI LÀ PHẦN GIÚP WEBSITE HỮU ÍCH

### G1. Bốn nhóm bài nên có trong vòng đời dự án

| Nhóm | Mục đích người đọc | Nguồn nội dung hợp lệ | CTA tự nhiên |
|---|---|---|---|
| **Nhận nuôi & mái ấm** | Chuẩn bị nhận nuôi; chăm mèo mới về; hiểu quy trình | Hướng dẫn, quy trình đã phê duyệt, hồ sơ thật | `/adopt`, `/cats` |
| **Cứu hộ & chăm sóc** | Biết cách ứng xử khi gặp mèo cần hỗ trợ | Biên tập theo hướng dẫn thú y, rà soát chuyên môn | `/rescue`, `/contact?topic=rescue` |
| **Chuyện cộng đồng** | Hiểu vì sao cư dân chung tay, thành quả đã có chứng từ | Nhật ký thật, hình ảnh được phép, kết quả đã xác minh | `/about`, `/get-involved` |
| **Đồng hành cùng mèo** | Nuôi trong căn hộ, an toàn ban công, giữ vệ sinh chung | Kiến thức thực hành được kiểm chứng | `/adopt`, `/news` |

V1 code có 3 bộ lọc (`adoption`, `rescue`, `community`), trong đó các bài **Đồng hành cùng mèo** có thể tạm đưa vào `community`. Pha 2 khi đủ ít nhất 3–4 bài một chủ đề mới tách `living` thành mục lọc độc lập. Không tạo hàng chục chuyên mục rỗng để trông website lớn hơn.

### G2. 12 đề tài nên biên tập (mục đích SEO + giúp người thật)

| Ưu tiên | Tiêu đề bài đề xuất | Ý định tìm kiếm chính | Giá trị riêng cần có |
|---|---|---|---|
| 1 | Trước khi nhận nuôi mèo ở TP.HCM, bạn nên chuẩn bị những gì? | nhận nuôi mèo, chuẩn bị đón mèo | checklist môi trường sống, an toàn nhà ở |
| 2 | Cách chuẩn bị một góc an toàn cho mèo trong căn hộ chung cư | nuôi mèo chung cư, lưới ban công | ảnh minh họa đúng, checklist an toàn thực tế |
| 3 | Gặp mèo ngoài đường: làm sao biết mèo bị bỏ rơi hay đi lạc? | gặp mèo hoang phải làm gì | hướng dẫn quan sát, tìm chủ, kênh giúp đỡ |
| 4 | Nhận nuôi tạm thời (foster) là gì và cần lưu ý gì? | foster mèo, nuôi mèo tạm thời | thời gian, rủi ro, sức khỏe, trách nhiệm |
| 5 | 7 việc nên làm trong tuần đầu đón mèo mới về nhà | mèo mới về nhà, mèo sợ người | bài hướng dẫn thực hành, cảnh báo khi cần thú y |
| 6 | Chăm sóc mèo cộng đồng tại chung cư sao cho văn minh? | cho mèo hoang ăn đúng cách | vệ sinh, nội quy, tôn trọng cư dân |
| 7 | Vì sao việc triệt sản mèo cộng đồng cần được hỗ trợ đúng cách? | triệt sản mèo hoang, TNR là gì | kiến thức có nguồn và bác sĩ kiểm tra |
| 8 | Những điều người nhận nuôi cần hỏi về sức khỏe mèo | nhận nuôi mèo có cần tiêm phòng | danh sách câu hỏi, không bảo đảm sức khỏe giả |
| 9 | Tìm mái ấm phù hợp cho từng bé mèo: vì sao cần kiên nhẫn? | mèo tìm mái ấm, nhận nuôi có trách nhiệm | nguyên tắc phù hợp gia đình, không có số liệu bịa |
| 10 | Quy trình ghi nhận và công khai hỗ trợ mèo sao cho minh bạch? | quỹ cứu hộ mèo minh bạch | chính sách thu chi có thật, phân quyền công bố |
| 11 | Nhật ký một bé mèo được cộng đồng giúp đỡ tại Saigon Pearl | chuyện cứu hộ mèo Saigon Pearl | **chỉ đăng khi có ca thật + đồng ý ảnh + kiểm chứng** |
| 12 | Mọi người có thể đóng góp gì ngoài tiền để giúp các bé mèo? | tình nguyện cứu hộ mèo, hỗ trợ mèo | kỹ năng, vận chuyển, chụp ảnh, foster nếu chương trình hoạt động |

**SEO địa phương:** ưu tiên từ khóa `nhận nuôi mèo TP.HCM`, `mèo cần tìm mái ấm`, `chăm sóc mèo hoang`, `cứu hộ mèo Saigon Pearl`, nhưng chỉ dùng địa danh khi thực sự liên quan. Chưa có số liệu Search Console/Keyword Planner thì không được khẳng định lượng tìm kiếm hoặc thứ hạng nào.

### G3. Mẫu khung một bài chuẩn để độc giả thấy hữu ích

**Ví dụ:** *Trước khi nhận nuôi mèo, bạn nên chuẩn bị gì?*

1. **Mở bài cảm xúc (70–120 chữ):** vì sao đón mèo là cam kết lâu dài; không cần kể ca cứu hộ chưa xảy ra.
2. **H2 — Kiểm tra điều kiện gia đình:** thời gian, người cùng sống, không gian, ngân sách thức ăn/vet.
3. **H2 — Chuẩn bị không gian an toàn:** cửa sổ, ban công, dây điện, cây có nguy cơ độc, phòng riêng ban đầu.
4. **H2 — Đồ dùng thiết yếu:** bát nước, thức ăn phù hợp, khay cát, lồng vận chuyển, chỗ nghỉ yên tĩnh.
5. **H2 — Những ngày đầu:** tạo vùng an toàn, cho mèo tự khám phá, không ép bế ôm, theo dõi ăn uống và vệ sinh.
6. **H2 — Hỏi gì khi nhận nuôi:** lịch tiêm phòng/triệt sản đã xác minh, thói quen, sức khỏe, phương án nếu không phù hợp.
7. **H2 — Khi nào cần bác sĩ thú y:** nêu các dấu hiệu đáng lo theo nguồn thú y có thẩm quyền; không chẩn đoán cá nhân.
8. **Kết thúc:** mời người đọc xem quy trình `/vi/adopt` và tìm hiểu các hồ sơ **đã được xác minh** `/vi/cats`.
9. **Tài liệu tham khảo & kiểm duyệt:** ghi link nguồn, ngày cập nhật, người chịu trách nhiệm nội dung thật; không tạo bác sĩ/tác giả giả.

Không cần tất cả bài phải dài 2.000 từ. Với mỗi bài, ưu tiên **đủ đáp án cho câu hỏi độc giả, thông tin cụ thể, kiểm chứng được** hơn một ngưỡng độ dài máy móc.

### G4. Giọng văn nên dùng

- Cảm xúc nhưng không bi lụy: “Một chiếc bát sạch, một góc trú an toàn, một người chịu quan tâm…”
- Không gọi mèo như hàng hóa hay nói “sản phẩm”, “giá bán” nếu đang nói về nhận nuôi.
- Không hứa “100% các bé khỏe mạnh”, “24/7 luôn có người trực”, “hỗ trợ trọn đời” khi chưa tổ chức được.
- Viết khách quan về y tế: “nên liên hệ bác sĩ thú y” thay cho hướng dẫn phác đồ thuốc thiếu kiểm chứng.
- Đừng giả vờ có cộng đồng 200 thành viên, hàng chục ca đã cứu hoặc đã có quan hệ phòng khám nếu chưa có hồ sơ.
- Tránh lộ vị trí chính xác của mèo ở khu vực nhạy cảm và dữ liệu cá nhân cư dân.

### G5. Quy trình xuất bản bền vững

```text
ĐỀ XUẤT CHỦ ĐỀ
  → BIÊN TẬP DỰ THẢO (vi)
  → KIỂM CHỨNG NỘI DUNG / PHÊ DUYỆT ẢNH VÀ QUYỀN SỬ DỤNG
  → RÀ SOÁT CHUYÊN MÔN NẾU LIÊN QUAN SỨC KHỎE, SƠ CỨU
  → DỊCH VÀ BIÊN TẬP BẢN EN (KHÔNG CHỈ DỊCH MÁY)
  → KIỂM TRA TITLE, SLUG, ALT, LINK, CANONICAL, OG IMAGE
  → XUẤT BẢN TRÊN GITHUB + DEPLOY VERCEL
  → KIỂM TRA TRANG THẬT, INDEX GOOGLE, DỮ LIỆU THỰC TẾ
  → CẬP NHẬT KHI CÓ THÔNG TIN MỚI THỰC SỰ
```

**Gợi ý nhịp đăng:** ban đầu 1 bài chất lượng/tuần; tăng nhịp nếu có nhân lực biên tập. Không lấp đầy bằng nội dung AI hàng loạt để “SEO nhanh”.

---

## H. NÂNG CẤP V2: CẤU TRÚC BÀI VIẾT DÀI HƠI & CMS (CHƯA CẦN Ở V1)

Hiện `articles.ts` có `paragraphs: Record<Locale, string[]>`, nên trang bài đọc chỉ là nhiều đoạn `<p>`; CSS có H2/H3 nhưng không thể hiện vì dữ liệu chưa phân cấp. Khi chuẩn bị sản xuất 20+ bài, hãy di chuyển sang `blocks` có kiểu, tránh chứa HTML nguy hiểm dạng string.

```ts
import type { Locale } from '@/lib/i18n';

type Localized = Record<Locale, string>;

export type ArticleBlock =
  | { type: 'heading'; level: 2 | 3; id: string; text: Localized }
  | { type: 'paragraph'; text: Localized }
  | { type: 'list'; ordered: boolean; items: Record<Locale, string[]> }
  | {
      type: 'image';
      src: string;
      alt: Localized;
      caption: Localized;
      credit?: Localized;
    }
  | { type: 'quote'; text: Localized };

export interface ArticleV2 {
  slug: string;
  category: 'adoption' | 'rescue' | 'community' | 'living';
  title: Localized;
  description: Localized;
  coverImage: string;
  coverAlt: Localized;
  status: 'draft' | 'review' | 'published';
  publishedAt?: string; // Ngày thật, ISO 8601
  updatedAt?: string;
  authorName?: string; // Tác giả thật/nhóm chịu trách nhiệm thật
  reviewedBy?: string; // Chỉ điền khi có người kiểm duyệt thật
  blocks: ArticleBlock[];
  references?: { title: string; url: string }[];
}
```

**Thứ tự migrate:** tạo schema V2 → tạo component `ArticleRenderer` render riêng cho từng `type` → migrate từng bài → kiểm tra VI/EN → cập nhật `articles` và sitemap. **Không xóa cả 3 bài cũ ngay lập tức**, không đổi slug đã được index mà không làm redirect 301/308.

### H1. Khi nào mới làm CMS?

- Nếu chỉ 3–15 bài, chỉnh `src/data/articles.ts` trên GitHub vẫn đơn giản, ít chi phí.
- Nếu một chị/tình nguyện viên không biết code cần tự đăng bài hàng tuần, cân nhắc CMS có **preview, draft, phân quyền, lịch sử sửa, duyệt bài**.
- Không cấp quyền quản trị toàn website cho mọi thành viên; chỉ người được phân công mới được xuất bản, sửa QR hoặc thay thông tin tài khoản.
- Nếu có người dùng gửi chuyện/ảnh qua form: xác thực, rate-limit, kiểm tra loại file, chống XSS, lưu ảnh ở storage có giới hạn và phải duyệt trước khi công khai.
- Không thể chỉ đổi form thành “Đã gửi” trên giao diện rồi nghĩ server nhận được dữ liệu. Repo hiện đã có ví dụ form giả thành công tại trang nhận nuôi; tránh lặp lại lỗi này ở Góc chia sẻ.

---
## I. SEO DÀNH RIÊNG CHO GÓC CHIA SẺ — GOOGLE HIỂU ĐƯỢC ĐIỀU GÌ?

### I1. Phân công chủ đề theo từng URL (đừng nhồi tất cả vào trang chủ)

| URL | Nội dung chính | Từ khóa / ý định đọc tự nhiên |
|---|---|---|
| `/vi/news` | Góc chia sẻ về mèo của cộng đồng | góc chia sẻ về mèo, cẩm nang nuôi mèo, Saigon Pearl Purrs |
| `/vi/news/prepare-for-adoption` | Chuẩn bị đón mèo về nhà | chuẩn bị nhận nuôi mèo, đón mèo mới về |
| `/vi/news/found-a-stray-cat` | Gặp mèo có vẻ cần trợ giúp | gặp mèo hoang phải làm gì, nhận biết mèo bị bỏ rơi |
| `/vi/news/responsible-community-care` | Giữ vệ sinh và tôn trọng cộng đồng | chăm sóc mèo cộng đồng, cho mèo ăn đúng cách |
| `/vi/adopt` | Quy trình và nguyên tắc nhận nuôi | nhận nuôi mèo TP.HCM, nhận nuôi mèo có trách nhiệm |
| `/vi/cats` | Hồ sơ mèo đã xác minh khi có thật | mèo tìm mái ấm, mèo đang cần gia đình |
| `/en/news/*` | English versions có nội dung biên tập | cat adoption HCMC, community cat care, rescue guides |

Không đổi 3 slug đang có chỉ để thêm từ khóa tiếng Việt; nếu sau này buộc phải đổi URL đã index, phải làm redirect phù hợp và cập nhật canonical/sitemap/link nội bộ.

### I2. Những gì code V1 đã làm

- Một H1 rõ, mô tả trang ngay trong HTML ban đầu (Server Component).
- Bài nổi bật và mỗi card là `<Link>` thật đến URL cụ thể, không phải `onClick()` mở modal.
- Bài đọc có title/description riêng qua `pageMetadata()`, canonical, hreflang VI/EN và OG/Twitter ảnh riêng.
- JSON-LD `BlogPosting` gắn theo bài thực; ngày xuất bản chỉ được thêm nếu có giá trị thực.
- Liên kết trong/ngoài chuyên mục: từ bài → quy trình nhận nuôi, danh sách mèo, bài khác.
- Ảnh `next/image` responsive với `sizes`; alt tạm ghi rõ ảnh minh họa, sau đó đổi thành mô tả ảnh thật.

### I3. Việc phải làm thêm trước khi public

1. **Tên miền thật**: `NEXT_PUBLIC_SITE_URL=https://domain-ban-so-huu` trong Vercel Production. Không để canonical trỏ `http://localhost:3000` hoặc domain Preview ngẫu nhiên.
2. **Google Search Console**: xác minh domain, kiểm tra URL Inspection cho `/vi/news` và từng bài, gửi sitemap; không bảo đảm index lập tức.
3. **Kiểm tra `sitemap.xml`**: hiện `src/app/sitemap.ts` tự thêm mọi item trong `articles` và `cats`, kể cả nội dung chưa xác minh. Khi có trạng thái `draft/review/published`, **chỉ đưa bài `published` vào sitemap** và các trang `draft` không được public.
4. **Trạng thái bài viết**: hệ thống V1 chưa có `status`, nên chỉ đẩy lên production sau khi duyệt cả 3 bài demo. Nếu chưa duyệt, giữ bản phát triển khỏi index hoặc bổ sung trạng thái bài ngay trước public.
5. **Date/Author chính xác**: ngày và tên hiển thị trên giao diện phải khớp JSON-LD. Không dùng ngày hiện tại chỉ để tạo cảm giác bài “mới”.
6. **Hình ảnh gốc**: chỉ khai báo OG image thật, crop đẹp, chất lượng tốt; ảnh minh họa phải ghi nhãn đến khi được thay.
7. **Breadcrumb JSON-LD**: nên thêm `BreadcrumbList` cho trang bài chi tiết có đường dẫn 3 bậc, với `ListItem` đúng URL; không khai báo giá trị không có trong UI.
8. **Nguồn nội dung y tế**: bài FPV, mèo bị thương, sơ cứu cần được kiểm tra bởi người có chuyên môn và dẫn nguồn phù hợp; không hướng dẫn tự dùng thuốc nguy hiểm.
9. **Hệ thống liên kết**: thêm link nội bộ trong chính đoạn văn khi có ngữ cảnh (ví dụ “quy trình nhận nuôi” → `/adopt`), không chỉ sidebar tự động.
10. **Kiểm tra mobile**: thử đọc hết một bài trên điện thoại; thành công quan trọng hơn hiệu ứng trang trí.

### I4. Breadcrumb JSON-LD mẫu — thêm khi code production hoàn thiện

```ts
// Tạo trong Server Component trang chi tiết khi có domain production chuẩn.
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem', position: 1,
      name: locale === 'vi' ? 'Trang chủ' : 'Home',
      item: `${siteUrl()}${routeFor(locale, '')}`,
    },
    {
      '@type': 'ListItem', position: 2,
      name: locale === 'vi' ? 'Góc chia sẻ' : 'Stories',
      item: `${siteUrl()}${routeFor(locale, '/news')}`,
    },
    {
      '@type': 'ListItem', position: 3,
      name: article.title[locale],
      item: `${siteUrl()}${routeFor(locale, `/news/${article.slug}`)}`,
    },
  ],
};
```

Có thể xuất dưới `<script type="application/ld+json">` tương tự BlogPosting, escape `<` khi serialize. **Không phải cứ thêm schema là Google sẽ hiển thị rich result**.

### I5. Cẩn thận với các URL chưa đủ dữ liệu

Repo đang có 4 hồ sơ mèo minh họa ở `src/data/cats.ts`, trong khi sitemap đang thêm các URL đó. **Không gắn story/case giả vào bài SEO** để tạo cảm giác đang có mèo nhận nuôi thật. Khi phát hành thực tế:

- Hồ sơ mèo phải có ảnh đúng bé, thông tin đã kiểm chứng, trạng thái đang tìm nhà hoặc đã có nhà được cập nhật.
- Hồ sơ chưa phê duyệt: không đưa vào sitemap, dùng `noindex` nếu cần hiển thị nội bộ qua URL public.
- Khi bé đã được nhận nuôi: trang có thể giữ lại nếu có giá trị kể chuyện/câu chuyện kết quả thực, nhưng phải đổi trạng thái rõ ràng và không để CTA “nhận nuôi bé ngay” gây hiểu nhầm.

---

## J. CÁCH TRIỂN KHAI TỪNG BƯỚC — HỢP VỚI WINDOWS 11 / VS CODE / CODEX

### J1. Chuẩn bị nhánh riêng

```bash
# Sau khi đã clone repository vào máy và cd vào thư mục nguồn:
git checkout main
git pull origin main
git checkout -b feat/news-editorial-v1
npm ci
```

> Kiểm tra Node.js theo yêu cầu của `package.json` (`>=20.9.0`). Repo có `AGENTS.md` yêu cầu agent đọc tài liệu Next.js nằm trong `node_modules/next/dist/docs/` trước khi sửa code phiên bản đang cài. Đây là một dự án Next 16; không dùng những API của Next 13/14 theo trí nhớ nếu docs local khác.

### J2. Thực hiện đúng thứ tự (không copy tất cả một lần rồi build)

1. **Tạo font**: `src/lib/fonts.ts` → chỉnh hai layout → test `/vi`, `/en`, font dấu. Đây là thay đổi ảnh hưởng toàn site; nên commit riêng để rollback dễ.
2. **Tạo dữ liệu biên tập**: `src/data/news-editorial.ts`, so sánh chính xác với các slug hiện có.
3. **Thêm CSS Module**: `src/app/[locale]/news/news.module.css`, bảo đảm class name khớp file TSX.
4. **Thêm component**: `NewsReveal`, `NewsExplorer`, `ShareArticle` như code.
5. **Thay trang danh sách**: `src/app/[locale]/news/page.tsx`.
6. **Thay trang bài đọc**: `src/app/[locale]/news/[slug]/page.tsx`.
7. **Xem tại**: `http://localhost:3000/vi/news` và `http://localhost:3000/en/news`.
8. **Chuyển ảnh thật**: `/public/images/news` khi có tư liệu đủ quyền; cập nhật đúng `image` trong `articles.ts`, gallery, alt, caption.
9. **Kiểm thử SEO và máy đọc**: HTML có H1, title, canonical/hreflang, page links, JSON-LD hợp lệ; không đưa bài draft vào index.
10. **Chốt trải nghiệm**: kiểm thử responsive, keyboard, reduced-motion, search không dấu tiếng Việt, VI/EN, links và footer.

### J3. Các lệnh kiểm tra và xuất bản

```bash
npm run verify:i18n
npm run typecheck
npm run build
npm run dev
```

Sau khi duyệt trực quan và sửa hết lỗi mới:

```bash
git status
git add src/app src/data/news-editorial.ts src/lib/fonts.ts
git commit -m "feat: build bilingual community stories news hub"
git push -u origin feat/news-editorial-v1
```

Mở Pull Request vào `main`, kiểm tra Vercel Preview, rồi mới merge để production tự deploy. Không commit `.env.local`, ảnh chưa được phép dùng, hồ sơ cư dân hoặc QR chứa dữ liệu cá nhân.

### J4. Checklist nghiệm thu (có thể copy vào issue/PR)

- [ ] Menu Góc chia sẻ từ desktop/mobile dẫn đúng `/vi/news` và `/en/news`; không có menu trùng.
- [ ] `/vi/news` có Hero, Featured, Filter, Search, Card Grid, Quote, Gallery, CTA, Footer.
- [ ] `/en/news` có đủ nội dung dịch (không xuất hiện tiếng Việt ngoài những danh từ riêng đã chủ đích giữ).
- [ ] 3 bài mẫu vẫn mở bằng URL cũ trong cả hai ngôn ngữ.
- [ ] Bài nổi bật không lặp lại trong lưới bên dưới.
- [ ] Bộ lọc “Nhận nuôi” / “Cứu hộ” / “Cộng đồng” cho kết quả đúng; tìm kiếm không dấu hoạt động.
- [ ] Khi không có kết quả có thông điệp rõ, không xuất hiện lỗi runtime.
- [ ] Nếu có hơn 6 bài, nút “Xem thêm” thêm đúng 6 bài một lần.
- [ ] Featured/card/related link là `<a href>` thực và mở được khi click lẫn bàn phím.
- [ ] Bài đọc có H1, mô tả, hero image, nội dung, bài liên quan và link về Góc chia sẻ.
- [ ] Nút chia sẻ hoạt động; khi không có `navigator.share`, sao chép URL được; không thông báo gửi thành công giả.
- [ ] Không thấy số liệu cứu hộ/khám bệnh/nhận nuôi tự bịa.
- [ ] Ảnh minh họa hiện nhãn rõ; ảnh thật được kiểm tra quyền và gỡ GPS/EXIF nếu cần.
- [ ] Font tiếng Việt trên iPhone, Android, Windows/macOS không bị mất dấu/dấu chồng chữ.
- [ ] Font không nhảy đáng kể khi tải (đo với Lighthouse trên Preview/Production).
- [ ] Icons dùng `lucide-react` SVG, không dùng emoji/text để thay icon.
- [ ] Favicon/logo/header/footer của trang chủ vẫn như cũ trừ phần chủ động thay đổi palette/font.
- [ ] Không tràn ngang mobile ở 320, 375, 390, 430, 768, 1024, 1440 px.
- [ ] Tab, Shift+Tab, Enter/Space dùng được cho filter/search/share; focus visible.
- [ ] Bật Reduce Motion trên hệ điều hành → không bị hiệu ứng trượt gây khó chịu.
- [ ] `npm run typecheck`, `npm run verify:i18n`, `npm run build` đều thành công.
- [ ] Metadata canonical trỏ production, không localhost; hreflang VI/EN khớp.
- [ ] BlogPosting JSON-LD phản ánh đúng nội dung thật, không bịa date/author.
- [ ] Sitemap không chứa URL draft, hồ sơ nhận nuôi chưa phê duyệt.
- [ ] Check Lighthouse, Image Optimization và Google URL Inspection sau deploy.

### J5. Ghi chú các giới hạn cần xử lý khi mở rộng

- **3 bài quá ít cho một trang magazine đầy đủ:** giao diện vẫn đúng, nhưng thẻ ít; tăng dần bằng bài thật có giá trị.
- **Tìm kiếm hiện là client filter:** phù hợp ít bài; nếu nhiều trăm bài cần query server, route category, tìm kiếm có phân trang.
- **Ảnh minh họa đang tái sử dụng:** thay bằng nguồn tư liệu xác thực, không lấy ảnh từ website mẫu.
- **Không có newsletter backend:** chưa được làm giao diện hứa “đã đăng ký thành công”. Chỉ thêm khi có dịch vụ email thực và chính sách dữ liệu.
- **Mẫu Pet Planet hiện không truy cập được:** cần screenshot cả desktop/mobile và video hover/scroll nếu yêu cầu so pixel, animation thật. Tài liệu này không chứng nhận thiết kế clone chính xác trang mẫu.
- **Font có thể còn bị override:** do CSS cũ ở một số module; thực hiện bước tìm `Georgia|Segoe Print|font:` như mục D.

---

## K. PROMPT HOÀN CHỈNH GIAO CHO CODEX / CLINE

Sao chép **nguyên khối** sau kèm file Markdown này vào project đã checkout nhánh riêng:

> Bạn là senior Next.js 16 + React 19 engineer. Repository là `dangquangminh123/Saigon_Pearl` đang có App Router song ngữ `/vi` và `/en`. Nhiệm vụ: nâng cấp **Góc chia sẻ ở route có sẵn `/[locale]/news`** theo file `SAIGON_PEARL_GOC_CHIA_SE_HUONG_DAN_CHI_TIET.md`.
>
> **Không** tạo route `/blog`, **không** phá homepage/About/Adopt/Rescue/Header/Footer, **không** cài icon/animation library mới khi repo đã có `lucide-react`. Dùng Next.js `next/image`, `Link`, Server Components, CSS Modules và một font **Be Vietnam Pro** qua `next/font/google` với subset Vietnamese. Đồng bộ 4 màu `#F7F4EE`, `#DCE5D7`, `#9B7862`, `#453D35`. Chỉ icon SVG từ `lucide-react`.
>
> Đọc `AGENTS.md` và docs Next.js 16 local trước khi chỉnh. Kiểm tra các file đã có: `src/data/articles.ts`, `src/lib/dictionaries.ts`, `src/lib/i18n.ts`, `src/lib/site.ts`, `src/app/sitemap.ts`. Tạo `src/data/news-editorial.ts`, `src/lib/fonts.ts`, `src/app/[locale]/news/news.module.css`, các component `NewsExplorer`, `NewsReveal`, `ShareArticle`, thay trang danh sách và trang chi tiết như tài liệu. Giữ nguyên các slug hiện hành, có metadata song ngữ, OG image, JSON-LD hợp lệ, bài liên quan và CTA đến route thật.
>
> Tuyệt đối không bịa số ca cứu hộ, ảnh thật, ngày đăng, tác giả, bác sĩ, hotline, đối tác hoặc trường hợp nhận nuôi. Giữ dấu hiệu “ảnh minh họa” đến khi nội dung được xác minh. Không dựng backend gửi biểu mẫu giả. Animation phải hỗ trợ reduced-motion, no-JS còn nội dung, website đọc được bằng keyboard.
>
> Làm từng bước theo PR nhỏ, kiểm tra TypeScript, `npm run verify:i18n`, `npm run build`. Mở `/vi/news`, `/en/news` và ít nhất 2 trang chi tiết bằng cả desktop/mobile; rà mọi link và trạng thái không có kết quả. **Không tự deploy production hoặc push trực tiếp `main` khi chưa được duyệt**. Ghi báo cáo file nào thay, kết quả kiểm thử, lỗi còn tồn tại, thay đổi nào có thể ảnh hưởng font/màu toàn site.

---

## L. TÀI LIỆU CHÍNH THỨC NÊN ĐỐI CHIẾU

- Next.js — Font Optimization: https://nextjs.org/docs/app/getting-started/fonts
- Next.js — `next/font` API: https://nextjs.org/docs/app/api-reference/components/font
- Next.js — `<Image>`: https://nextjs.org/docs/app/api-reference/components/image
- Next.js — `generateMetadata`: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Google Search Central — Article/BlogPosting structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google Search Central — Helpful, reliable people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central — Google Images SEO: https://developers.google.com/search/docs/appearance/google-images
- W3C — Reduced motion via CSS: https://www.w3.org/WAI/WCAG22/Techniques/css/C39
- Be Vietnam Pro: https://github.com/bettergui/BeVietnamPro
- Repository hiện hành: https://github.com/dangquangminh123/Saigon_Pearl
- Reference được nhắc trước đó (không kiểm tra trực tiếp được): https://pet-planet.monamedia.net/about/

**KẾT LUẬN:** Góc chia sẻ nên trở thành nơi người đọc tin tưởng và tìm được hành động thiết thực — hiểu từng bé mèo, học cách chăm sóc đúng, kết nối nhận nuôi và chứng kiến những câu chuyện cộng đồng **có thật**. Không cần nhiều animation hào nhoáng; cần cảm xúc chân thực, ảnh đúng, nội dung kiểm chứng và trải nghiệm đọc rõ ràng. Đây là con đường bền vững cho Saigon Pearl Purrs.

---

## M. ĐỒNG BỘ MÀU TOÀN WEBSITE, KHÔNG ĐỂ TRANG NEWS LỆCH HEADER/FOOTER

Tài liệu ở trên **bảo đảm vùng trang News có 4 màu lõi**, nhưng Header/Footer hiện nhận màu từ `src/app/globals.css`; bản repo còn các token đỏ cam/xanh đậm khác bảng màu bạn muốn. Nếu mục tiêu là **toàn website** cùng palette, thực hiện thêm một Pull Request riêng, kiểm tra toàn bộ trang sau khi đổi. Không chỉ chỉnh màu riêng trang News rồi tưởng Header/Footer đã tự đổi.

### M1. Phương án token toàn cục

**Tìm khối `:root` đầu file `src/app/globals.css` và thay giá trị biến đang có**, không thêm một khối `:root` thứ hai gây khó bảo trì:

```css
:root {
  /* Giữ tên biến cũ để không phá hàng trăm selector đã có */
  --terracotta: #9B7862;
  --terracotta-dark: #453D35;
  --coral: #9B7862;
  --coral-dark: #453D35;
  --blush-peach: #DCE5D7;
  --blush-hover: #DCE5D7;
  --forest: #453D35;
  --forest-green: #453D35;
  --forest-sage: #453D35;
  --cream: #F7F4EE;
  --cream-soft: #F7F4EE;
  --paper: #F7F4EE;
  --sand: #DCE5D7;
  --ink: #453D35;
  --muted: #453D35;
  --outline: rgba(69, 61, 53, .15);
  --shadow: 0 14px 40px rgba(69,61,53,.08);
  --container: 1250px;
}
```

**Không chỉ thay token:** cần tìm giá trị màu hard-code trong `src/app/globals.css`, các `*.module.css`, TSX inline SVG và styles. Ví dụ code hiện có màu như `#BA4730`, `#EB573D`, `#E75A3C`, `#163A2B`, `#264835` ở trang chủ, các khối CTA và Footer. Chỉ thay từng chỗ sau khi xem Preview; sắc thái, shadow và border có thể cần điều chỉnh theo tương phản.

**Gợi ý kiểm tra nhanh trên máy:**

```powershell
Get-ChildItem src -Recurse -Include *.css,*.tsx,*.ts |
  Select-String -Pattern '#BA4730|#EB573D|#E75A3C|#163A2B|#264835'
```

Sau khi đổi, mở lại `/vi`, `/vi/about`, `/vi/adopt`, `/vi/rescue`, `/vi/news`, `/vi/contact` để chắc rằng **site tổng thể vẫn thống nhất, không bị nút chữ trắng trên nền quá nhạt**. Nếu chỉ muốn đổi Góc chia sẻ trước, **đừng thực hiện M1 trong cùng PR**.

### M2. Footer và kênh xã hội

Trong `src/components/SiteFooter.tsx` hiện có:

- Copyright viết cứng `© 2024` dù dự án đang xây năm 2026: cập nhật năm thật hoặc render năm hiện hành theo quy trình release.
- Link social trỏ chung `https://instagram.com`, `https://facebook.com`, `https://youtube.com`, chưa phải tài khoản chính thức. **Thay bằng kênh đã xác minh hoặc tạm ẩn icon/link**, không đưa người đọc đến trang chủ Facebook/Instagram như thể đó là kênh cộng đồng.
- Giữ icon SVG React, không thay thành text emoji.

### M3. Một số việc ngoài phạm vi trang News nhưng ảnh hưởng niềm tin

- Trang `/adopt` đang có form giả thành công (đổi state nhưng không gửi server), cần sửa trước khi kêu gọi người dân để lại số điện thoại.
- Trang chủ/nhận nuôi còn chứa các chỉ số `100+`, `50+`, `200+`, `100%`, `24/7` chưa có chứng cứ thống nhất. Bỏ/sửa trước khi phát hành, vì một website cộng đồng phi lợi nhuận cần minh bạch hơn là các KPI hấp dẫn.
- Những trạng thái mèo minh họa (Mochi, Sunny, Luna, Oreo) **chưa được xác minh**; không gắn link từ bài viết nói như thể đang nhận nuôi thật.
- Trang `transparency` hiện trình bày nguyên tắc là tốt; khi có chứng từ phải duyệt quyền riêng tư trước khi đăng.

---

## N. TÌNH TRẠNG KIỂM TRA BẢN HƯỚNG DẪN NÀY

- Đã đọc cấu trúc 71 file trên GitHub `main` ở commit ghi đầu tài liệu và đọc nội dung các file ảnh hưởng trực tiếp đến Góc chia sẻ, SEO, font, menu, layout, bài viết và sitemap.
- Đã kiểm tra cú pháp riêng các khối **TypeScript/TSX/JavaScript hoàn chỉnh** trong tài liệu bằng TypeScript parser: không phát hiện lỗi cú pháp.
- Đã đối chiếu tên các lớp `styles.foo` được dùng trong code mẫu với các khai báo lớp trong CSS, không phát hiện lớp bị thiếu.
- **Chưa chạy `npm run build`/test trình duyệt của website nguyên bản**: môi trường xuất tài liệu không truy cập được GitHub để clone và cài dependency; đây là **đặc tả + code mẫu đã rà cú pháp**, chưa phải Pull Request đã tích hợp, chưa được chứng nhận chạy production.
- Khi Codex tích hợp, cần xử lý mọi TypeScript/runtime/build warning phát sinh, kiểm thử đủ các trang trước khi merge.

**Giữ lại tài liệu này cùng PR** trong thư mục `docs/` của dự án nếu bạn muốn các lượt chỉnh sửa sau có cùng thiết kế, palette, quy tắc ảnh và tiêu chuẩn SEO. Trong lần triển khai đầu, ưu tiên giao diện `/news` + font/VI-EN + ảnh tạm có nhãn. Thay toàn bộ ảnh bằng tư liệu thật và chuẩn hóa nội dung trước khi công bố cộng đồng rộng rãi.
