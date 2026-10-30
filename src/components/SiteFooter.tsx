import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Brand } from './Brand';
import { navigation } from '@/lib/nav';
import { routeFor, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const footerNav = navigation.filter((item) => item.key !== 'support');

  return (
    <footer className="site-footer">
      <div className="container footer-top-row">
        <Brand locale={locale} />
        <nav className="footer-nav" aria-label={locale === 'vi' ? 'Điều hướng chân trang' : 'Footer navigation'}>
          {footerNav.map(({ key, path }) => (
            <Link key={key} href={routeFor(locale, path)} className="footer-nav-link">
              {t.nav[key]}
            </Link>
          ))}
        </nav>
        <div className="footer-socials" aria-label="Social links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
            <InstagramIcon size={17} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
            <FacebookIcon size={17} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Youtube">
            <YoutubeIcon size={17} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2024 Saigon Pearl Purrs. {t.common.copyright}</span>
        <span className="footer-quote">
          {locale === 'vi' ? 'Những con người tử tế, Những chú mèo hạnh phúc hơn, Một Saigon Pearl tốt đẹp hơn.' : 'Kind people, Happier cats, A better Saigon Pearl.'}
          <Heart size={13} fill="#BA4730" color="#BA4730" aria-hidden="true" style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
        </span>
      </div>
    </footer>
  );
}
