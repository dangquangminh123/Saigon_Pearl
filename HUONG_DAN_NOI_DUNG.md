# Hướng dẫn đưa dữ liệu Saigon Pearl Purrs thật lên website

## 1. Hình ảnh

`public/images/` đang chứa ảnh cắt từ mẫu thiết kế đã được cung cấp; mọi ảnh là **minh họa**, không đại diện cho các bé mèo được xác minh đang sống tại Saigon Pearl. Trước khi website chính thức hoạt động:

1. Thu thập ảnh thật của từng bé từ cư dân/người phụ trách được phép chia sẻ.
2. Xác nhận sự đồng ý sử dụng ảnh, kiểm tra ảnh không lộ thông tin nhạy cảm.
3. Đổi tên ảnh đơn giản, ví dụ `public/images/meo-bong-2026.webp`.
4. Sửa đường dẫn `image` tương ứng trong `src/data/cats.ts`.
5. Thay ảnh hero và story bằng ảnh thật (ưu tiên ảnh ngang, rõ mặt mèo, không đính text trên ảnh).
6. Cập nhật ảnh OpenGraph `public/images/og-cover.webp`.

## 2. Hồ sơ mèo

Mở `src/data/cats.ts`. Mỗi phần tử phải có:

- `slug`: định danh URL, ví dụ `meo-bong`, không trùng.
- `name`: tên bé mèo.
- `ageMonths`: tuổi ước tính đã được đánh giá.
- `gender`: `female` hoặc `male` sau khi kiểm chứng.
- `status`: `looking` (đã xác nhận tìm nhà) hoặc `care` (đang chăm sóc).
- `image`: đường dẫn ảnh thật.
- `description.vi` / `.en`: giới thiệu tiếng Việt, tiếng Anh.
- `personality.vi` / `.en`: một số nét tính cách từ quan sát thực tế.

**Đang thiếu trong bản demo:** hồ sơ y tế, triệt sản, tiêm phòng, lịch sử ca, người phụ trách và phương thức tiếp nhận hồ sơ. Cần bổ sung quản trị/bảo mật nếu phát hành các trường này.

Sau khi thêm mèo vào mảng, Next.js tự tạo cả `/vi/cats/slug` và `/en/cats/slug`, sitemap tự thêm các URL. Không cần khai báo trang mới thủ công.

## 3. Nội dung website

- `src/lib/dictionaries.ts`: tiêu đề, mô tả, nút, trạng thái, FAQ, phần giới thiệu và metadata VI/EN.
- `src/data/articles.ts`: danh sách bài viết và nội dung từng ngôn ngữ. Thêm bài ở đây để tự có trang blog và sitemap.
- `src/components/SiteHeader.tsx`: thứ tự menu.
- `src/lib/nav.ts`: thêm trang mới vào `navigation` và `staticPaths` sau khi xây xong route.
- `src/app/globals.css`: giao diện và bảng màu.

Nội dung phải dịch thực chất cả hai ngôn ngữ (không chỉ dùng máy dịch không kiểm tra). Không sử dụng tên, số liệu hoặc câu chuyện cứu hộ không có chứng cứ.

## 4. Thống kê và sổ quỹ

Hiện không hiển thị số liệu giả. Khi có dữ liệu thật:

- Dùng một nguồn dữ liệu đáng tin, mỗi số liệu có thời gian chốt và người xác nhận.
- Một bản ghi chi cần mã phiếu, mục đích, chứng từ, thời gian, giá trị, nguồn chi.
- Chỉ đưa thống kê lên trang chủ sau khi có thể đối chiếu số tổng với dữ liệu gốc.
- Không công khai danh tính người ủng hộ khi chưa có sự đồng ý.

Khuyến nghị xây một backend/CMS có phân quyền, nhật ký thay đổi và kiểm duyệt trước khi triển khai sổ quỹ online.

## 5. Form và liên hệ

Biến `NEXT_PUBLIC_CONTACT_EMAIL` chỉ dành cho email **đã được cộng đồng xác thực**. Nếu không có email, form cung cấp nội dung để sao chép và nói rõ là chưa gửi. Để lưu/gửi đơn nhận nuôi thực tế, cần API, hệ thống thông báo, biện pháp chống spam, bảo vệ dữ liệu cá nhân và chính sách quyền riêng tư phù hợp.
