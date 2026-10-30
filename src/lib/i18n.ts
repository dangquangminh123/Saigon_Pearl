export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'vi';

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function routeFor(locale: Locale, path = ''): string {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function localeName(locale: Locale): string {
  return locale === 'vi' ? 'Tiếng Việt' : 'English';
}

export function translate<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}
