import '../globals.css';
import type { ReactNode } from 'react';
import { beVietnamPro } from '@/lib/fonts';

// Separate root layout allows /en pages to SSR <html lang="en">.
export default function RedirectRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>{children}</body>
    </html>
  );
}
