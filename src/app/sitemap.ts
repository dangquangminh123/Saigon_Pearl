import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { cats } from '@/data/cats';
import { routeFor, type Locale } from '@/lib/i18n';
import { staticPaths } from '@/lib/nav';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl();
  const paths: string[] = [
    ...staticPaths,
    ...cats.map((cat) => `/cats/${cat.slug}`),
    ...articles.map((article) => `/news/${article.slug}`),
  ];
  return paths.flatMap((path) => (['vi', 'en'] as Locale[]).map((locale) => ({
    url: `${origin}${routeFor(locale, path)}`,
    changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
    priority: path === '' ? 1 : path === '/cats' ? 0.85 : 0.7,
    alternates: { languages: {
      'vi-VN': `${origin}${routeFor('vi', path)}`,
      'en': `${origin}${routeFor('en', path)}`,
      'x-default': `${origin}${routeFor('vi', path)}`,
    } },
  })));
}
