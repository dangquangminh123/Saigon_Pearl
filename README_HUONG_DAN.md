# Saigon Pearl Purrs — Bông hoa 8 cánh CUỐI trang Nhận nuôi

## 1. Vị trí chính xác
- **Route áp dụng:** `/vi/adopt` và `/en/adopt`.
- **Thứ tự hiển thị:** Nằm ở vị trí **dưới cùng** của trang Nhận nuôi, ngay sau `<AdoptServicesCatalog />` và trước Footer.
- **Ràng buộc tuyệt đối:** Toàn bộ bông hoa là một section riêng, độc lập, rộng 100% (`width: 100%; clear: both; display: block;`), căn giữa và **tuyệt đối không đặt ở trang chủ (`/`)**.

## 2. Cấu trúc tệp
- `public/assets/saigon-pearl-purrs/flower-center-ring.svg`: Vòng tròn trung tâm với kỹ thuật even-odd clip-rule tạo lỗ khoét trong suốt (alpha hole).
- `public/assets/saigon-pearl-purrs/flower-petal.svg`: Silhouette cánh hoa chuẩn từ vector gốc dùng làm CSS mask.
- `public/assets/saigon-pearl-purrs/flower-step-leaf.svg`: Silhouette chiếc lá đánh số BƯỚC 01-08 dùng làm CSS mask.
- `scripts/apply-rescue-flower.mjs`: Script tích hợp tự động, kiểm tra và bảo đảm chỉ thêm ở cuối `/adopt` và gỡ bỏ khỏi trang chủ.
- `src/components/sections/RescueFlower/FlowerMotion.tsx`: Hiệu ứng chuyển động mượt mà khi cuộn tới bằng IntersectionObserver (không block SSR).
- `src/components/sections/RescueFlower/RescueFlower.module.css`: Tạo hình hoa 8 cánh bằng CSS masks, sắp xếp orbital theo góc tròn trên desktop và responsive tự động sang dạng lưới/thẻ trên tablet và mobile.
- `src/components/sections/RescueFlower/RescueFlower.tsx`: Component React chuẩn Next.js 16 / React 19 hiển thị 8 cánh hoa theo chiều kim đồng hồ, icon xoay ngược để không bị méo chữ và hình.
- `src/components/sections/RescueFlower/rescueFlower.data.ts`: Dữ liệu song ngữ chuẩn ngữ cảnh bảo trợ mèo Saigon Pearl Purrs.

## 3. Lệnh vận hành
```bash
# Kiểm tra tích hợp
node scripts/apply-rescue-flower.mjs

# Kiểm tra kiểu TypeScript
npm run typecheck

# Dọn dẹp cache và build production
rm -rf .next
npm run build

# Chạy môi trường phát triển
npm run dev
```

