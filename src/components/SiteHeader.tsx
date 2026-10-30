'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Heart, Menu, Search, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { routeFor } from '@/lib/i18n';
import { navigation } from '@/lib/nav';
import { getDictionary } from '@/lib/dictionaries';
import { Brand } from './Brand';
import { SearchDialog } from './SearchDialog';

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const localeLink = (next: Locale) => pathname.replace(/^\/(vi|en)(?=\/|$)/, `/${next}`) || `/${next}`;

  // Menu items filter (excluding support from regular text links because it is the CTA button)
  const menuNav = navigation.filter((item) => item.key !== 'support');

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Brand locale={locale} />
          <nav className="desktop-nav" aria-label={locale === 'vi' ? 'Điều hướng chính' : 'Main navigation'}>
            {menuNav.map(({ key, path }) => {
              const href = routeFor(locale, path);
              const isActive = pathname === href || (path === '' && pathname === `/${locale}`);
              return (
                <Link key={key} href={href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  {t.nav[key]}
                </Link>
              );
            })}
          </nav>
          <div className="header-actions">
            <div className="language-switch" aria-label={t.nav.language}>
              <Link href={localeLink('vi')} hrefLang="vi" aria-current={locale === 'vi' ? 'page' : undefined} className={locale === 'vi' ? 'is-current' : ''}>VI</Link>
              <span className="lang-sep" aria-hidden="true">|</span>
              <Link href={localeLink('en')} hrefLang="en" aria-current={locale === 'en' ? 'page' : undefined} className={locale === 'en' ? 'is-current' : ''}>EN</Link>
            </div>
            <button type="button" className="icon-button search-button" onClick={() => setSearchOpen(true)} aria-label={t.nav.search}>
              <Search size={18} strokeWidth={2} />
            </button>
            <Link href={routeFor(locale, '/support')} className="header-donate">
              <Heart size={14} fill="currentColor" aria-hidden="true" />
              <span>{t.nav.donate}</span>
            </Link>
            <button type="button" className="icon-button mobile-menu-toggle" aria-label={menuOpen ? t.nav.close : t.nav.menu} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label={locale === 'vi' ? 'Điều hướng di động' : 'Mobile navigation'}>
            {navigation.map(({ key, path }) => (
              <Link key={key} href={routeFor(locale, path)} className={pathname === routeFor(locale, path) ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                {t.nav[key]}
              </Link>
            ))}
          </nav>
        )}
      </header>
      {searchOpen && <SearchDialog locale={locale} onClose={() => setSearchOpen(false)} />}
    </>
  );
}
