import '../globals.css';
import type { ReactNode } from 'react';
import { connection } from 'next/server';
import { beVietnamPro } from '@/lib/fonts';

// Separate root layout allows /en pages to SSR <html lang="en">.
export default async function RedirectRootLayout({ children }: { children: ReactNode }) {
  await connection();
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>{children}</body>
    </html>
  );
}

