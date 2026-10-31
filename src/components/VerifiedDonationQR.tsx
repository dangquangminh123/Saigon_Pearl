'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, ShieldAlert, Copy, Check, QrCode, AlertTriangle } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);

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

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isVi = locale === 'vi';

  if (state.status === 'loading') {
    return (
      <div
        role="status"
        style={{
          padding: '32px 24px',
          background: '#FDFCF9',
          border: '1.5px dashed #DCE5D7',
          borderRadius: 20,
          textAlign: 'center',
          color: '#453D35',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          margin: '28px 0',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#DCE5D7',
            display: 'grid',
            placeItems: 'center',
            animation: 'pulse 1.8s infinite ease-in-out',
          }}
        >
          <QrCode size={24} color="#9B7862" />
        </div>
        <p style={{ margin: 0, fontWeight: 500, fontSize: '0.98rem' }}>
          {isVi ? 'Đang xác thực chữ ký số mã QR...' : 'Verifying cryptographic QR signature...'}
        </p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div
        role="alert"
        style={{
          padding: '24px 28px',
          background: '#FFF9F5',
          border: '2px solid #E8B49E',
          borderRadius: 20,
          color: '#5C3826',
          margin: '28px 0',
          boxShadow: '0 4px 16px rgba(155, 120, 98, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <ShieldAlert size={24} color="#D9534F" aria-hidden="true" />
          <strong style={{ fontSize: '1.05rem', letterSpacing: '0.02em', color: '#B3261E' }}>
            {isVi ? 'CẢNH BÁO BẢO MẬT & TẠM NGỪNG NHẬN CHUYỂN KHOẢN' : 'SECURITY NOTICE & TEMPORARY PAUSE'}
          </strong>
        </div>
        <p style={{ margin: '8px 0 0', lineHeight: 1.6, fontSize: '0.95rem' }}>
          {isVi
            ? 'Hệ thống bảo vệ toàn vẹn không xác minh được chữ ký số hợp lệ của mã QR hoặc kênh nhận chuyển khoản đang tạm đóng để bảo đảm an toàn. Vui lòng KHÔNG chuyển tiền vào bất kỳ số tài khoản nào mạo danh dự án.'
            : 'The QR integrity verification system could not validate an official cryptographic signature, or transfer reception is temporarily paused for safety. Please DO NOT send funds to any unverified account.'}
        </p>
      </div>
    );
  }

  const { data } = state;
  return (
    <section
      aria-label={isVi ? 'Thông tin ủng hộ đã xác minh' : 'Verified donation details'}
      style={{
        margin: '36px 0',
        padding: '32px 28px',
        background: '#FAF8F4',
        border: '1.5px solid #DCE5D7',
        borderRadius: 24,
        boxShadow: '0 8px 30px rgba(69, 61, 53, 0.05)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#DCE5D7',
          padding: '6px 14px',
          borderRadius: 999,
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#2D4B2A',
          marginBottom: 20,
        }}
      >
        <ShieldCheck size={18} color="#2D4B2A" aria-hidden="true" />
        <span>{isVi ? 'Xác thực chữ ký số Ed25519 toàn vẹn' : 'Verified Ed25519 cryptographic integrity'}</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div
            style={{
              padding: 16,
              background: '#FFFFFF',
              borderRadius: 20,
              border: '1px solid #E8E5DF',
              boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.qrDataUrl}
              alt={isVi ? 'Mã QR đóng góp của dự án Saigon Pearl Purrs' : 'Project donation QR code'}
              width={260}
              height={260}
              style={{ display: 'block', borderRadius: 12 }}
              onError={() => setState({ status: 'error' })}
            />
          </div>
          <p style={{ marginTop: 12, fontSize: '0.88rem', color: '#7A6F65' }}>
            {isVi ? 'Quét bằng app ngân hàng bất kỳ (VietQR)' : 'Scan with any banking app (VietQR)'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <dl
            style={{
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: 16,
              rowGap: 14,
              fontSize: '0.98rem',
            }}
          >
            <dt style={{ color: '#7A6F65', fontWeight: 500 }}>
              {isVi ? 'Ngân hàng:' : 'Bank code:'}
            </dt>
            <dd style={{ margin: 0, fontWeight: 700, color: '#453D35' }}>{data.bankCode}</dd>

            <dt style={{ color: '#7A6F65', fontWeight: 500 }}>
              {isVi ? 'Số tài khoản:' : 'Account number:'}
            </dt>
            <dd
              style={{
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontWeight: 700,
                color: '#9B7862',
                fontFamily: 'monospace',
                fontSize: '1.1rem',
              }}
            >
              <span>{data.accountNumber}</span>
              <button
                type="button"
                onClick={() => handleCopy(data.accountNumber)}
                title={isVi ? 'Sao chép số tài khoản' : 'Copy account number'}
                aria-label={isVi ? 'Sao chép số tài khoản' : 'Copy account number'}
                style={{
                  border: 'none',
                  background: copied ? '#DCE5D7' : '#F0ECE4',
                  color: copied ? '#2D4B2A' : '#453D35',
                  padding: '4px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? (isVi ? 'Đã chép' : 'Copied') : (isVi ? 'Sao chép' : 'Copy')}</span>
              </button>
            </dd>

            <dt style={{ color: '#7A6F65', fontWeight: 500 }}>
              {isVi ? 'Người thụ hưởng:' : 'Account holder:'}
            </dt>
            <dd style={{ margin: 0, fontWeight: 700, color: '#453D35', textTransform: 'uppercase' }}>
              {data.accountHolder}
            </dd>
          </dl>

          <div
            style={{
              display: 'flex',
              gap: 10,
              padding: '12px 16px',
              background: '#FFF8F0',
              border: '1px solid #F2DEC8',
              borderRadius: 12,
              color: '#8A532B',
              fontSize: '0.88rem',
              lineHeight: 1.5,
              marginTop: 8,
            }}
          >
            <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <span>
              {isVi
                ? 'Lưu ý an toàn: Trước khi bấm xác nhận chuyển khoản, vui lòng đối chiếu tên người thụ hưởng hiển thị trên ứng dụng ngân hàng phải khớp đúng với thông tin trên.'
                : 'Safety notice: Before confirming your transfer, verify that the recipient name in your banking app strictly matches the account holder above.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
