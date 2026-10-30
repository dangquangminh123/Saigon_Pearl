import '../globals.css';
import type { ReactNode } from 'react';

// Separate root layout allows /en pages to SSR <html lang="en">.
export default function RedirectRootLayout({ children }: { children: ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}
