import '../globals.css';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import { locales, isLocale, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { siteUrl } from '@/lib/site';

export const dynamicParams = false;
export const viewport: Viewport = { themeColor: '#F7F4EE', width: 'device-width', initialScale: 1 };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const t = getDictionary(locale);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Saigon Pearl Purrs',
    url: `${siteUrl()}/${locale}`,
    description: t.meta.home[1],
    slogan: 'Every Paw Deserves a Home.',
    areaServed: { '@type': 'Place', name: 'Saigon Pearl, Ho Chi Minh City, Vietnam' },
    availableLanguage: ['Vietnamese', 'English'],
  };
  return (
    <html lang={locale}>
      <body>
        <a href="#main" className="skip-link">{locale === 'vi' ? 'Chuyển đến nội dung chính' : 'Skip to main content'}</a>
        <SiteHeader locale={locale} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
