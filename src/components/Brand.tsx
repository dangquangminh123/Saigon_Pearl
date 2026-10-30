import Link from 'next/link';
import { routeFor, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';

export function Brand({ locale, light = false }: { locale: Locale; light?: boolean }) {
  const t = getDictionary(locale);
  return (
    <Link href={routeFor(locale)} className={`brand ${light ? 'brand-light' : ''}`} aria-label={`Saigon Pearl Purrs — ${t.nav.home}`}>
      <span className="brand-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <path d="M11 20 L9 10 L19 15 C21 14.2 23 13.8 25 13.8 C27 13.8 29 14.2 31 15 L41 10 L39 20 C41.5 23.5 42.5 27 42.5 30.5 C42.5 38 35 43 25 43 C15 43 7.5 38 7.5 30.5 C7.5 27 8.5 23.5 11 20 Z" />
          <circle cx="18" cy="28" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="32" cy="28" r="1.6" fill="currentColor" stroke="none" />
          <polygon points="25,32 23,30 27,30" fill="currentColor" stroke="none" />
          <path d="M22.5 33.5 Q25 35.5 25 33.5 Q25 35.5 27.5 33.5" strokeWidth={1.7} />
          <line x1="6" y1="28" x2="14" y2="29" strokeWidth={1.6} />
          <line x1="6" y1="33" x2="14" y2="31" strokeWidth={1.6} />
          <line x1="44" y1="28" x2="36" y2="29" strokeWidth={1.6} />
          <line x1="44" y1="33" x2="36" y2="31" strokeWidth={1.6} />
        </svg>
      </span>
      <span className="brand-wordmark">
        <span className="brand-name">Saigon Pearl Purrs</span>
        <span className="brand-tagline">{t.common.subtagline}</span>
      </span>
    </Link>
  );
}
