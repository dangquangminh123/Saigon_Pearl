# Saigon Pearl Purrs — QR Integrity Protection

> Hướng dẫn triển khai cho GitHub `dangquangminh123/Saigon_Pearl` (Next.js 16 App Router + React 19 + TypeScript, Vercel). Đây là **bản thiết kế và mã mẫu để tích hợp**, không phải thay đổi đã được commit lên GitHub. Mọi số tài khoản, tên người nhận và ảnh QR trong ví dụ đều là placeholder.

## 0. Mục tiêu và giới hạn bảo mật

Cơ chế: kiểm tra chữ ký số **Ed25519** trên tập thông tin người nhận tiền (mã ngân hàng, số tài khoản, tên người nhận, SHA-256 của ảnh QR), sau đó đọc ảnh từ thư mục ngoài `public`, tính SHA-256 và so sánh. Chỉ trả về ảnh QR + thông tin tài khoản khi tất cả điều kiện hợp lệ. Nếu sai: HTTP **503**, không trả ảnh, giao diện báo **tạm ngừng chuyển khoản**, ghi sự kiện vào Vercel Function Logs. Dùng một biến `DONATION_ENABLED` để chủ động vô hiệu hóa tính năng.

**Phân biệt:** đây là *chữ ký số + kiểm tra toàn vẹn*, **không phải mã hóa giấu nội dung QR**. QR cần công khai để quét thì người khác vẫn có thể sao chép. Không có đoạn JavaScript phía trình duyệt nào đảm bảo ngăn 100% người có quyền chèn mã độc vào DOM, sửa toàn bộ website hay thiết bị của khách. Hệ thống không thể biết chính xác IP nào đã sửa QR chỉ từ lỗi kiểm tra, nên **không tự động ban IP khi hash sai**. Cần thêm WAF, CSP, quyền GitHub/Vercel và giám sát độc lập.

## 1. Kiến trúc file đề xuất

```text
Saigon_Pearl/
├── private-assets/
│   └── donation-qr.png                 # QR PNG, không nằm trong public/
├── scripts/
│   ├── generate-donation-key.mjs      # Tạo cặp khóa một lần, ở MÁY CỦA BẠN
│   └── sign-donation.mjs              # Ký manifest bằng private key OFFLINE
├── src/
│   ├── data/
│   │   └── donation-manifest.json     # Thông tin công khai + hash + chữ ký
│   ├── app/
│   │   ├── api/verified-donation/
│   │   │   └── route.ts               # Kiểm tra chữ ký + hash, fail-closed
│   │   └── [locale]/support/page.tsx  # Trang ủng hộ đã có, chỉ chèn component
│   └── components/
│       └── VerifiedDonationQR.tsx     # UI báo lỗi khi không xác minh được
└── next.config.ts                     # Include asset trong Vercel Functions
```

**Không** lưu private key ở GitHub, Vercel, `public/`, hay dưới dạng `NEXT_PUBLIC_*`. Bảo vệ file private key bằng tài khoản máy có mật khẩu, mã hóa ổ đĩa và bản sao an toàn. Public key không cần bí mật, nhưng phải **được chủ sở hữu dự án kiểm soát**; đặt trên Vercel Environment Variables để tách khỏi các thay đổi mã trong GitHub. Nếu hacker có quyền sửa cả code **và** hệ thống deploy thì chữ ký có thể bị bỏ qua; do đó bắt buộc bảo vệ nhánh main, xét duyệt PR và quyền Vercel.

## 2. File `src/data/donation-manifest.json`

Tạo file này trước khi ký. Thay placeholder bằng **thông tin dự án đã xác minh**, không đưa số tài khoản riêng tư vào ví dụ công khai nếu chưa có quyền công bố.

```json
{
  "bankCode": "THAY_MA_NGAN_HANG",
  "accountNumber": "THAY_SO_TAI_KHOAN",
  "accountHolder": "THAY_TEN_NGUOI_THU_HUONG",
  "qrSha256": "",
  "signature": ""
}
```

File `private-assets/donation-qr.png` là PNG tạo từ đúng tài khoản trong manifest. **Ảnh hiển thị và nội dung QR phải trùng thông tin người thụ hưởng**. Không dùng URL QR từ website lạ không kiểm soát.

## 3. File `scripts/generate-donation-key.mjs`

Chạy **một lần**, lưu khóa ở thư mục *ngoài repository*, ví dụ `C:/spp-secure` trên Windows 11. Tạo lại cặp khóa tức là phải ký lại manifest và cập nhật public key trên Vercel.

```javascript
import { generateKeyPairSync } from 'node:crypto';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

if (!process.argv[2]) {
  throw new Error('Usage: node scripts/generate-donation-key.mjs C:/spp-secure');
}

const dir = resolve(process.argv[2]);
mkdirSync(dir, { recursive: true });
const privateFile = join(dir, 'donation-private.pem');
const publicFile = join(dir, 'donation-public.b64');

if (existsSync(privateFile) || existsSync(publicFile)) {
  throw new Error('Keys already exist. Refusing to overwrite keys.');
}

const { privateKey, publicKey } = generateKeyPairSync('ed25519');
writeFileSync(privateFile, privateKey.export({ format: 'pem', type: 'pkcs8' }), {
  flag: 'wx', mode: 0o600,
});
writeFileSync(
  publicFile,
  publicKey.export({ format: 'der', type: 'spki' }).toString('base64'),
  { flag: 'wx', mode: 0o600 },
);
console.log(`Private key saved outside project: ${privateFile}`);
console.log(`Public key for Vercel: ${publicFile}`);
```

Lệnh Windows PowerShell (từ thư mục dự án):

```powershell
node .\scripts\generate-donation-key.mjs C:/spp-secure
```

Đưa **nội dung** file `C:/spp-secure/donation-public.b64` vào Vercel → Project → Settings → Environment Variables → `DONATION_VERIFY_PUBLIC_KEY_B64`. Public key cũng nên có bản sao lưu xác thực bên ngoài hệ thống deploy để đối chiếu nếu nghi bị thay.

## 4. File `scripts/sign-donation.mjs`

Đây là thao tác phê duyệt ngoại tuyến. Mỗi lần đổi **QR** hoặc **ngân hàng/số tài khoản/tên người nhận**, chủ sở hữu phải ký lại bằng private key được giữ riêng.

```javascript
import { createHash, sign } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

if (!process.argv[2]) {
  throw new Error('Usage: node scripts/sign-donation.mjs C:/spp-secure/donation-private.pem');
}

const root = process.cwd();
const manifestPath = join(root, 'src/data/donation-manifest.json');
const qrPath = join(root, 'private-assets/donation-qr.png');
const original = JSON.parse(await readFile(manifestPath, 'utf8'));
const qrBytes = await readFile(qrPath);

const payload = {
  bankCode: String(original.bankCode ?? '').trim(),
  accountNumber: String(original.accountNumber ?? '').trim(),
  accountHolder: String(original.accountHolder ?? '').trim(),
  qrSha256: createHash('sha256').update(qrBytes).digest('hex'),
};

if (!payload.bankCode || !payload.accountNumber || !payload.accountHolder) {
  throw new Error('Bank/account/holder must not be blank');
}

// PHẢI kiểm tra bằng mắt thông tin ngân hàng & QR trước khi chạy ký.
const privatePem = await readFile(resolve(process.argv[2]), 'utf8');
const signature = sign(
  null,
  Buffer.from(JSON.stringify(payload), 'utf8'),
  privatePem,
).toString('base64');

await writeFile(
  manifestPath,
  `${JSON.stringify({ ...payload, signature }, null, 2)}\n`,
  'utf8',
);
console.log('Manifest signed. Review its details before commit.');
```

Chạy:

```powershell
node .\scripts\sign-donation.mjs C:/spp-secure/donation-private.pem
```

**Quan trọng:** Ký đúng **ảnh thực và thông tin người nhận** sau khi kiểm tra qua ứng dụng ngân hàng. Chữ ký chỉ xác minh dữ liệu do người giữ khóa phê duyệt; nếu chính người ký phê duyệt dữ liệu sai thì chữ ký vẫn hợp lệ.

## 5. File `src/app/api/verified-donation/route.ts`

Route server-side **chỉ trả thông tin + ảnh QR khi chữ ký và hash đều hợp lệ**. QR được đóng gói trong data URL để trình duyệt không tải ảnh từ một đường dẫn công khai bỏ qua bước xác minh. Mã này phù hợp Node runtime của Next.js Route Handler.

```typescript
import { createHash, createPublicKey, verify } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import manifest from '@/data/donation-manifest.json';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const securityHeaders = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Content-Type-Options': 'nosniff',
};

function unavailable() {
  return Response.json(
    { ok: false, message: 'Donation QR is temporarily unavailable.' },
    { status: 503, headers: securityHeaders },
  );
}

export async function GET() {
  if (process.env.DONATION_ENABLED !== 'true') return unavailable();

  try {
    const publicKeyBase64 = process.env.DONATION_VERIFY_PUBLIC_KEY_B64 ?? '';
    if (!publicKeyBase64) return unavailable();

    const { bankCode, accountNumber, accountHolder, qrSha256, signature } = manifest;
    if (
      !bankCode || !accountNumber || !accountHolder ||
      !/^[0-9a-f]{64}$/i.test(qrSha256) || !signature
    ) return unavailable();

    const payload = { bankCode, accountNumber, accountHolder, qrSha256 };
    const publicKey = createPublicKey({
      key: Buffer.from(publicKeyBase64, 'base64'),
      format: 'der',
      type: 'spki',
    });
    const approved = verify(
      null,
      Buffer.from(JSON.stringify(payload), 'utf8'),
      publicKey,
      Buffer.from(signature, 'base64'),
    );

    if (!approved) {
      console.error('[DONATION_SECURITY] signature mismatch');
      return unavailable();
    }

    const qr = await readFile(join(process.cwd(), 'private-assets/donation-qr.png'));
    const actualHash = createHash('sha256').update(qr).digest('hex');
    if (actualHash.toLowerCase() !== qrSha256.toLowerCase()) {
      console.error('[DONATION_SECURITY] QR file hash mismatch');
      return unavailable();
    }

    return Response.json(
      {
        ok: true,
        bankCode,
        accountNumber,
        accountHolder,
        qrDataUrl: `data:image/png;base64,${qr.toString('base64')}`,
      },
      { status: 200, headers: securityHeaders },
    );
  } catch {
    console.error('[DONATION_SECURITY] verification or file read failed');
    return unavailable();
  }
}
```

Điều kiện an toàn: Không đặt bất kỳ API `POST` công khai nào cho phép ghi đè `donation-manifest.json` hoặc QR, không nhét `DONATION_PRIVATE_KEY` vào Vercel, không đưa private key vào `NEXT_PUBLIC_*`.

## 6. File `src/components/VerifiedDonationQR.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';

type Locale = 'vi' | 'en';
type Data = {
  ok: true;
  bankCode: string;
  accountNumber: string;
  accountHolder: string;
  qrDataUrl: string;
};
type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: Data };

export function VerifiedDonationQR({ locale }: { locale: Locale }) {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/verified-donation', {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unverified donation');
        return (await res.json()) as Data;
      })
      .then((data) => {
        if (!data.ok || !data.qrDataUrl.startsWith('data:image/png;base64,')) {
          throw new Error('Invalid QR data');
        }
        setState({ status: 'ready', data });
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;
        setState({ status: 'error' });
      });
    return () => controller.abort();
  }, []);

  if (state.status === 'loading') {
    return <p role="status">{locale === 'vi' ? 'Đang xác minh QR...' : 'Verifying the QR...'}</p>;
  }
  if (state.status === 'error') {
    return (
      <div role="alert" style={{ padding: 24, border: '2px solid #9B7862', borderRadius: 12 }}>
        <strong>{locale === 'vi' ? 'CẢNH BÁO BẢO MẬT' : 'SECURITY NOTICE'}</strong>
        <p>
          {locale === 'vi'
            ? 'Không xác minh được mã QR chính thức. Vui lòng không chuyển tiền.'
            : 'Official donation QR could not be verified. Please do not transfer funds.'}
        </p>
      </div>
    );
  }

  const { data } = state;
  return (
    <section aria-label={locale === 'vi' ? 'Thông tin ủng hộ đã xác minh' : 'Verified donation details'}>
      <img
        src={data.qrDataUrl}
        alt={locale === 'vi' ? 'Mã QR đóng góp của dự án' : 'Project donation QR'}
        width={260}
        height={260}
        onError={() => setState({ status: 'error' })}
      />
      <dl>
        <dt>{locale === 'vi' ? 'Ngân hàng (mã)' : 'Bank code'}</dt><dd>{data.bankCode}</dd>
        <dt>{locale === 'vi' ? 'Số tài khoản' : 'Account number'}</dt><dd>{data.accountNumber}</dd>
        <dt>{locale === 'vi' ? 'Tên người thụ hưởng' : 'Account holder'}</dt><dd>{data.accountHolder}</dd>
      </dl>
      <p>
        {locale === 'vi'
          ? 'Trước khi chuyển khoản, hãy đối chiếu tên người thụ hưởng hiển thị trong ứng dụng ngân hàng.'
          : 'Before transferring, confirm the recipient name shown in your banking app.'}
      </p>
    </section>
  );
}
```

**Lưu ý quan trọng:** Component hiển thị kết quả đã được server kiểm tra, nhưng không thể tự bảo vệ nếu script độc hại đã có toàn quyền thay đổi DOM. Vì thế phải triển khai CSP và giới hạn nguồn script; các bước phía server không thay thế biện pháp chống XSS.

## 7. Tích hợp vào trang `/vi/support` và `/en/support`

Trang hiện đã có file `src/app/[locale]/support/page.tsx`; không tạo route `/support` mới. Khi chưa có kênh ủng hộ chính thức, **giữ nguyên thông báo chưa nhận thanh toán**.

Khi đã xác minh pháp lý, tài khoản nhận tiền và ảnh QR, import component trong `src/app/[locale]/support/page.tsx`:

```tsx
import { VerifiedDonationQR } from '@/components/VerifiedDonationQR';
```

Sau khi `locale` được xác thực (`isLocale(locale)`), đặt đúng vị trí muốn hiển thị QR:

```tsx
<VerifiedDonationQR locale={locale} />
```

**Khi kích hoạt QR phải sửa/ẩn thông báo cũ “chưa có kênh nhận chuyển khoản” cho nhất quán.** Không xóa các nguyên tắc minh bạch hoặc cảnh báo phòng lừa đảo.

## 8. `next.config.ts` — bảo đảm Vercel Functions đọc được QR ngoài `public/`

Giữ các tùy chọn đang có, bổ sung `outputFileTracingIncludes`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingIncludes: {
    '/api/verified-donation': ['./private-assets/donation-qr.png'],
  },
};

export default nextConfig;
```

Nếu bạn đã thêm `headers()`/CSP vào `next.config.ts`, **giữ chúng, đừng thay toàn bộ file bằng đoạn trên**. Tùy chọn này chỉ yêu cầu Next/Vercel đóng gói file dùng cho hàm server; chạy build/preview để xác minh đường dẫn chính xác.

## 9. Kích hoạt Vercel

1. Thêm `donation-qr.png` thực đã kiểm chứng vào `private-assets/` và điền `donation-manifest.json`.
2. Sinh cặp khóa ngoài dự án (mục 3), giữ private key offline.
3. Dùng private key ký manifest (mục 4); kiểm tra lại trường nhận tiền.
4. Trên Vercel Project Settings → Environment Variables, đặt `DONATION_VERIFY_PUBLIC_KEY_B64` bằng nội dung `donation-public.b64`, và `DONATION_ENABLED=true` cho môi trường thích hợp. Chọn `Preview` trước, thử nghiệm rồi mới bật `Production`.
5. Deploy từ nhánh đã được xét duyệt. Truy cập `/vi/support` và `/en/support`. Mã QR phải khớp tài khoản thực tế trong ứng dụng ngân hàng.
6. Khi cần dừng khẩn cấp: đặt `DONATION_ENABLED=false` **và redeploy để cấu hình mới có hiệu lực**, hoặc tạm vô hiệu route bằng một thay đổi đã xét duyệt. Không coi chỉnh biến môi trường là nút tắt hiệu lực ngay lập tức cho mọi phiên đang mở.

## 10. Kiểm thử các tình huống tấn công

| Thử nghiệm trên Preview | Kết quả mong đợi |
|---|---|
| Ảnh PNG gốc và manifest hợp lệ | HTTP 200, QR và tài khoản chính xác |
| Thay `private-assets/donation-qr.png` mà không ký lại | HTTP 503, trang ẩn QR, có log lỗi |
| Sửa số tài khoản trong manifest nhưng không ký lại | HTTP 503, trang ẩn QR |
| Thay chữ ký trong manifest | HTTP 503 |
| Không cấu hình public key | HTTP 503 |
| `DONATION_ENABLED` không phải `true` | HTTP 503 |
| Thay nội dung QR rồi được chủ sở hữu ký lại | Có thể HTTP 200: **chữ ký không bảo đảm bản thân người ký đã kiểm tra đúng** |
| Chèn JS toàn quyền qua một lỗ hổng XSS hoặc chiếm quyền deploy | **Cơ chế này không bảo đảm chống được**; cần CSP, kiểm soát quyền, giám sát độc lập |

Mở Vercel Function Logs để phát hiện `[DONATION_SECURITY]`, cấu hình alert/giám sát phù hợp. Đừng dựa riêng vào `console.error()` để kỳ vọng sẽ có thông báo tự gửi đến điện thoại.

## 11. “Đá hacker” bằng Vercel Firewall: trường hợp nào khả thi?

- Yêu cầu bất hợp pháp vào API quản trị (nếu sau này có): kiểm tra đăng nhập, vai trò, CSRF/origin phù hợp và phản hồi **401/403**; thêm WAF rule để `deny`, `challenge` hoặc `rate-limit` theo hành vi/đường dẫn.
- Bot spam hàng loạt: Vercel WAF giới hạn và challenge, có tùy chọn persistent block theo gói.
- Xác thực QR bị sai tại server: ẩn QR và ghi sự kiện, **không thể xác định chắc người sửa để tự chặn IP**.
- Người dùng tự sửa DOM trong máy của họ: website không thể ngăn mọi thao tác ở trình duyệt của chính họ; điều này không làm đổi QR cho mọi người trừ khi có lỗi/lỗ hổng khác.

Chỉ để admin sửa QR qua quy trình duyệt PR + ký số offline; tuyệt đối không tạo endpoint công khai `POST /api/change-qr` chỉ cần biết “mật mã” hoặc token lưu ở frontend.

## 12. Những lớp bảo mật vẫn bắt buộc

- Bật 2FA/passkey cho GitHub, Vercel và email quản trị; bảo vệ nhánh main, xét duyệt PR đặc biệt với trang quyên góp.
- CSP (`script-src` phù hợp Next.js), ưu tiên **không dùng script bên thứ ba không cần thiết**, kiểm soát XSS/HTML đầu vào và dependency.
- Bảo vệ tài khoản ngân hàng, tên người thụ hưởng, quyền thay đổi thông tin; người dùng luôn kiểm tra thông tin trên màn hình xác nhận của ngân hàng.
- HTTPS, Vercel Firewall và theo dõi deploy; khi cần mức bảo đảm cao, thiết lập **dịch vụ kiểm tra độc lập bên ngoài website** để phát hiện QR hiển thị trên production bị đổi dù chính mã website bị xâm nhập.

## 13. Link tài liệu kỹ thuật chính thức

- Next.js Route Handler: https://nextjs.org/docs/app/api-reference/file-conventions/route
- Next.js Output File Tracing: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
- Vercel custom WAF rules: https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules
- OWASP CSP Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet

---

**Trạng thái:** Đây là mã mẫu cho một phiên bản bảo vệ thực tế, **chưa được tích hợp, build, pentest hoặc triển khai lên repository/Vercel**. Trước production cần kiểm thử riêng với tài khoản thử nghiệm, rà soát bảo mật và kiểm tra tên người nhận bằng ứng dụng ngân hàng.
