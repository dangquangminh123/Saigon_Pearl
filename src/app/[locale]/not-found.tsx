'use client';

import { usePathname } from 'next/navigation';
import { Cat } from 'lucide-react';
import { ButtonLink } from '@/components/Ui';
import { routeFor, type Locale } from '@/lib/i18n';

export default function NotFound() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'vi';
  return (
    <section className="not-found-page">
      <div className="container not-found-inner"><Cat size={65} strokeWidth={1.3} aria-hidden="true" /><p className="eyebrow">404</p>
        <h1>{locale === 'vi' ? 'Trang này chưa tìm thấy lối về.' : 'This page wandered off.'}</h1>
        <p>{locale === 'vi' ? 'Đường dẫn không tồn tại hoặc đã thay đổi. Mình cùng quay lại trang chủ nhé!' : 'The link might be incorrect or the page may have moved. Let’s go home!'}</p>
        <ButtonLink href={routeFor(locale)}>{locale === 'vi' ? 'Về trang chủ' : 'Back to home'}</ButtonLink>
      </div>
    </section>
  );
}
