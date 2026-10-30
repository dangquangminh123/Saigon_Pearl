import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';
import { getAdoptContent } from '@/data/adopt-services';
import { AdoptServicesCatalog } from './_components/AdoptServicesCatalog';
import styles from './adopt.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getAdoptContent(locale);
  return pageMetadata(locale, '/adopt', content.meta.title, content.meta.description);
}

export default async function AdoptPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getAdoptContent(locale);

  return (
    <div data-page="adopt-services" className={styles.adoptPage}>
      {/* ===================================================================
          1. FEATURED TITLE BANNER (HERO / BREADCRUMB + WAVE)
          =================================================================== */}
      <section id="featured-title" className={styles.featuredTitle}>
        <div className={styles.container}>
          <div className={styles.featuredInner}>
            {/* Main title */}
            <h1 className={styles.mainTitle}>{content.hero.title}</h1>
            {/* Subtitle */}
            <p className={styles.subTitle}>{content.hero.subtitle}</p>
            {/* 4 Quick Stats */}
            <div className={styles.statsRow}>
              {content.hero.stats.map((st, i) => (
                <div key={i} className={styles.statItem}>
                  <span className={styles.statValue}>{st.value}</span>
                  <span className={styles.statLabel}>{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className={styles.shapeDividerTop} aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path className={styles.shapeFill} d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
        </svg>
      </div>

      {/* ===================================================================
          2. 8-CARD SERVICES CATALOG (IMAGE-BOX-STYLE-2) + SUBSCRIBE BANNER
          =================================================================== */}
      <AdoptServicesCatalog content={content} locale={locale} />
    </div>
  );
}
