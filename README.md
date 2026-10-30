# Saigon Pearl Purrs — Every Paw Deserves a Home

Website cộng đồng cứu hộ và nhận nuôi mèo phi lợi nhuận tại Saigon Pearl. Thiết kế dựa trên **ảnh mẫu do bạn cung cấp**, dùng đúng 4 tông màu nền kem, xanh sage, nâu đất và nâu đậm. Mặc định **tiếng Việt**; chuyển sang tiếng Anh sẽ đổi toàn bộ nội dung, nút, menu, bài viết, tiêu đề SEO và mô tả SEO.

> **QUAN TRỌNG — DỰ ÁN MẪU:** Hình ảnh cắt từ ảnh thiết kế tham khảo, **không được xác nhận là ảnh thực tế của mèo tại Saigon Pearl**. Mochi, Sunny, Luna, Oreo và các tuổi/tính cách/trạng thái đang là **dữ liệu minh họa**. Chưa có thống kê cứu hộ thực tế, kênh quyên góp hay email chính thức. Cần thay trước khi công bố vận hành.

## 1. Yêu cầu

- Node.js **20.9+** (khuyến nghị Node.js 22 LTS hoặc mới hơn tương thích với Next 16).
- npm và kết nối mạng để cài gói thư viện lần đầu.
- Dùng **Next.js 16.4.2, App Router, React 19, TypeScript, Lucide React**. Không dùng các ký tự văn bản giả làm icon; icon giao diện là SVG từ `lucide-react`.

## 2. Chạy dự án trên máy

```bash
# 1. Giải nén và mở thư mục dự án
cd saigon-pearl-purrs

# 2. Cài thư viện
npm install

# 3. Tạo cấu hình môi trường (macOS/Linux)
cp .env.example .env.local

# 4. Chạy dev server
npm run dev
```

Mở **http://localhost:3000**. URL `/` sẽ tự chuyển sang **`/vi`**.

Chọn `EN` ở đầu trang sẽ chuyển sang `/en` hoặc giữ nguyên đường dẫn, ví dụ `/vi/cats/mochi` → `/en/cats/mochi`.

**Trên Windows:** dùng `copy .env.example .env.local` trong Command Prompt.

## 3. Kiểm tra và build sản phẩm

```bash
npm run typecheck
npm run build
npm run start
```

Truy cập thử: `/vi`, `/en`, `/vi/cats`, `/en/cats`, `/vi/news`, `/en/news`, `/sitemap.xml`, `/robots.txt`.

## 4. Bản đồ dự án

```text
saigon-pearl-purrs/
├── .env.example                 # Tên miền thật và email nhận
├── next.config.ts
├── package.json
├── README.md
├── HUONG_DAN_NOI_DUNG.md       # Thay nội dung mẫu bằng dữ liệu thực tế
├── CHECKLIST_TRUOC_KHI_PUBLIC.md
├── public/
│   └── images/                # Ảnh tạm minh họa cắt từ mẫu được cung cấp
└── src/
    ├── app/
    │   ├── (root)/             # Chuyển / về /vi
    │   ├── [locale]/           # Root Layout sinh đúng <html lang="vi/en">
    │   │   ├── page.tsx        # Trang chủ
    │   │   ├── about/          # Câu chuyện cộng đồng
    │   │   ├── cats/           # Danh sách + trang riêng từng bé
    │   │   ├── rescue/         # Cứu hộ & chăm sóc
    │   │   ├── adopt/          # Quy trình nhận nuôi + FAQ
    │   │   ├── get-involved/   # Tham gia cộng đồng
    │   │   ├── support/        # Hình thức ủng hộ
    │   │   ├── transparency/   # Nguyên tắc minh bạch
    │   │   ├── news/           # Cẩm nang + bài viết chi tiết
    │   │   └── contact/        # Biểu mẫu liên hệ
    │   ├── globals.css        # Toàn bộ giao diện responsive + bảng màu
    │   ├── sitemap.ts         # Sitemap tự động VI/EN + hreflang
    │   ├── robots.ts
    │   └── icon.svg
    ├── components/             # Header, Footer, Search, CatCard, form...
    ├── data/                   # Hồ sơ mèo, bài viết đa ngôn ngữ
    └── lib/                    # Locale, từ điển, metadata, routing
```

## 5. Đa ngôn ngữ — tiếng Việt mặc định

- `/` chuyển hướng về `/vi` (không mặc định trình duyệt hoặc IP, luôn ưu tiên Việt).
- `/vi/**` render toàn bộ nội dung tiếng Việt, HTML `lang="vi"`.
- `/en/**` render toàn bộ nội dung tiếng Anh, HTML `lang="en"`.
- Chọn VI/EN giữ nguyên loại trang đang xem.
- Từ điển UI: **`src/lib/dictionaries.ts`**.
- Nội dung mèo VI/EN: **`src/data/cats.ts`**.
- Bài viết VI/EN: **`src/data/articles.ts`**.
- Mỗi trang có metadata theo ngôn ngữ.

Không dùng cách dịch trực tiếp tự động của trình duyệt hoặc chỉ thay chữ sau khi tải trang. HTML ban đầu được server render từ đúng từ điển theo ngôn ngữ, có lợi hơn cho công cụ tìm kiếm.

## 6. SEO có sẵn

- Next.js App Router hỗ trợ server rendering + static pre-rendering.
- Đường dẫn riêng `/vi/...`, `/en/...`, có `canonical` theo từng phiên bản.
- Khai báo `hreflang` `vi-VN`, `en`, `x-default` trong metadata.
- Title, meta description, Open Graph, Twitter Card theo trang/ngôn ngữ.
- `sitemap.xml` liệt kê trang chính, từng hồ sơ mèo, từng bài viết ở cả hai ngôn ngữ.
- `robots.txt` cho phép công cụ tìm kiếm truy cập các trang công khai.
- JSON-LD schema.org `Organization`, không tự nhận đã đăng ký pháp nhân.
- Semantic HTML, điều hướng và alt text phù hợp, responsive mobile, tối ưu ảnh qua `next/image`.

**Quan trọng:** SEO kỹ thuật **không bảo đảm** Google sẽ lập chỉ mục hoặc có thứ hạng cao. Cần xuất bản nội dung xác thực, website hoạt động công khai và theo dõi Search Console.

## 7. Cấu hình trước khi triển khai

Mở `.env.local` (máy local) hoặc Environment Variables (Vercel):

```dotenv
NEXT_PUBLIC_SITE_URL=https://TEN-MIEN-BAN-SO-HUU.com
NEXT_PUBLIC_CONTACT_EMAIL=dia-chi-email-da-xac-minh@TEN-MIEN-BAN-SO-HUU.com
```

- `NEXT_PUBLIC_SITE_URL`: cực kỳ quan trọng cho **canonical, OpenGraph URL, robots và sitemap**; phải là domain thuộc quyền quản lý của dự án.
- `NEXT_PUBLIC_CONTACT_EMAIL`: có thể để trống khi chưa có email; khi đó form **chỉ tạo lời nhắn để sao chép, không gửi/không lưu dữ liệu**. Khi cấu hình email thật, form mở `mailto:` và người dùng **tự xác nhận gửi** trong ứng dụng email.
- Nếu triển khai Vercel chưa có domain riêng, mã có fallback `VERCEL_PROJECT_PRODUCTION_URL`.

**Không có** API server lưu thông tin, admin CMS, hệ thống chuyển tiền, cổng thanh toán hay dịch vụ gửi email tự động. Các thành phần này cần được triển khai và bảo vệ riêng khi hoạt động thực tế.

## 8. Deploy Vercel

1. Đưa mã nguồn lên một repository Git (không đưa `.env.local` lên Git).
2. Trên Vercel, chọn **Add New Project**, import repository và chọn Next.js.
3. Điền biến môi trường thật. Chọn deploy và kết nối domain nếu có.
4. Kiểm tra phiên bản `/vi`, `/en`, nút đổi ngôn ngữ, links hồ sơ, form, blog.
5. Mở `https://tenmiencuaban.com/sitemap.xml` và `https://tenmiencuaban.com/robots.txt`.
6. Xác minh tên miền bằng **Google Search Console** và gửi sitemap.
7. Khi đã thay dữ liệu mẫu bằng nội dung thật, kiểm tra trang được index và Core Web Vitals.

## 9. Quy tắc nội dung và minh bạch

- Không công bố mèo tìm nhà khi chưa xác minh sức khỏe, tuổi và điều kiện nhận nuôi.
- Không ghi số lượng cứu hộ, số ca triệt sản hay số tiền quyên góp giả. Trang minh bạch hiện chỉ đưa ra khung nguyên tắc.
- Không công bố thông tin tài khoản nhận tiền nếu chưa có đầu mối được xác thực.
- Không công khai vị trí nhạy cảm hoặc thông tin người hỗ trợ nếu chưa có sự đồng ý.
- Thay **toàn bộ ảnh demo** bằng ảnh thật do cộng đồng sở hữu hoặc được phép sử dụng.

## 10. Những tính năng đã có

- Responsive desktop, tablet, mobile; header menu mobile.
- Điều hướng VI/EN giữ ngữ cảnh trang; Vietnamese default.
- Tìm kiếm nhanh tên trang, mèo và các bài viết, có ESC để đóng.
- Bộ lọc hồ sơ mẫu, xem trang chi tiết, nút lưu yêu thích bằng localStorage trên thiết bị.
- FAQ đóng/mở native, form kiểm tra dữ liệu và tạo email/copy.
- Bài viết nội dung hữu ích hai ngôn ngữ và các trang hỗ trợ cộng đồng.
- Metadata/Sitemap/Robots/JSON-LD tự tạo trong Next.js.

---

Thiết kế và nội dung demo dành cho giai đoạn xây dựng Saigon Pearl Purrs. **Mỗi bé mèo đều xứng đáng có cơ hội sống khỏe mạnh và có một mái ấm an toàn.**

## 11. Kết quả kiểm tra trong môi trường tạo mã

- Đã kiểm tra cú pháp tất cả file TypeScript/TSX bằng bộ phân tích TypeScript: **đạt**.
- Đã chạy `scripts/verify-locales.cjs` so sánh khóa và cấu trúc từ điển Việt–Anh: **đạt**.
- Đã kiểm tra đường dẫn import nội bộ và file ảnh tham chiếu: **đạt**.
- Đã xem trước giao diện qua bản dựng HTML tĩnh phục vụ kiểm tra bố cục; bản xem trước không thay thế kiểm thử ứng dụng thật.
- **Chưa thực thi được `npm install`/`npm run build` ở môi trường tạo mã**, vì kết nối đến `registry.npmjs.org` bị lỗi DNS (`EAI_AGAIN`). Cần chạy hai bước này trên máy có mạng trước khi đưa dự án lên môi trường sản xuất.
