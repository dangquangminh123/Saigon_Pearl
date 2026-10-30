import type { Locale } from './i18n';
import { routeFor } from './i18n';
import type { Metadata } from 'next';

export const brand = 'Saigon Pearl Purrs';

// This must be a domain the project actually owns when launched publicly.
export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (configured) return configured;
  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelDomain) return `https://${vercelDomain}`;
  return 'http://localhost:3000';
}

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '';

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  type: 'website' | 'article' = 'website'
): Metadata {
  const canonical = routeFor(locale, path);
  const fullTitle = title.includes(brand) ? title : `${title} | ${brand}`;
  const vi = routeFor('vi', path);
  const en = routeFor('en', path);
  return {
    metadataBase: new URL(siteUrl()),
    title: fullTitle,
    description,
    applicationName: brand,
    alternates: {
      canonical,
      languages: { 'vi-VN': vi, en, 'x-default': vi },
    },
    openGraph: {
      title: fullTitle,
      description,
      type,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'],
      siteName: brand,
      url: canonical,
      images: [{ url: '/images/og-cover.webp', width: 1200, height: 630, alt: brand }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-cover.webp'],
    },
    robots: { index: true, follow: true },
  };
}
