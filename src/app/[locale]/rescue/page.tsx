import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AlertCircle, LifeBuoy, ArrowRight, ShieldCheck } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';
import { isLocale, routeFor, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';
import { rescueData, guideArticles } from '@/data/rescue-guide';
import { RescueCatalog } from './_components/RescueCatalog';
import { RescueHeartDiagram } from './_components/RescueHeartDiagram';
import styles from './rescue.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return pageMetadata(locale, '/rescue', t.meta.rescue[0], t.meta.rescue[1]);
}

export default async function RescuePage({ params }: Props) {
  const { locale: val } = await params;
  if (!isLocale(val)) notFound();
  const locale: Locale = val;
  const t = getDictionary(locale);
  const data = rescueData[locale];

  return (
    <div className={styles.page} data-page="rescue-care">
      {/* 01. Head Section with Wave Bottom */}
      <header className={styles.headSection}>
        <div className={styles.container}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href={routeFor(locale, '')}>{t.nav.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{data.breadcrumb}</span>
          </nav>

          <span className={styles.stickerBadge}>
            <LifeBuoy size={14} aria-hidden="true" />
            {data.sticker}
          </span>

          <h1 className={styles.pageTitle}>
            {data.titlePrefix} <span className={styles.titleMarker}>{data.titleHighlight}</span>
          </h1>

          <p className={styles.pageSubtitle}>{data.subtitle}</p>
        </div>
      </header>

      {/* 02. Main Handbook Section with Filter Tabs & Cards Grid */}
      <main className={styles.container}>
        <RescueCatalog
          locale={locale}
          categories={data.filterCategories}
          articles={guideArticles}
          readMoreLabel={data.readMore}
          featuredBadgeLabel={data.featuredBadge}
        />

        {/* 03. Medical Caution Note */}
        <section className={styles.cautionBox} aria-label="Lưu ý y tế quan trọng">
          <AlertCircle size={28} className={styles.cautionIcon} aria-hidden="true" />
          <div className={styles.cautionText}>
            <h3>{data.noteTitle}</h3>
            <p>{data.noteText}</p>
          </div>
        </section>

        {/* 04. Emergency FAQ Accordion */}
        <section className={styles.faqSection} aria-labelledby="faq-title">
          <div className={styles.faqHeader}>
            <h2 id="faq-title">{data.faqTitle}</h2>
            <p>{data.faqSubtitle}</p>
          </div>

          <div className={styles.faqList}>
            {data.faqs.map((faq, index) => (
              <details key={faq.question} className={styles.faqItem} open={index === 0}>
                <summary className={styles.faqSummary}>{faq.question}</summary>
                <div className={styles.faqContent}>
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 05. Emergency CTA Hotline Block */}
        <section className={styles.ctaBlock} aria-labelledby="rescue-cta-title">
          <div className={styles.ctaIconWrap} aria-hidden="true">
            <LifeBuoy size={36} strokeWidth={1.8} />
          </div>

          <div className={styles.ctaInfo}>
            <h2 id="rescue-cta-title">{data.ctaTitle}</h2>
            <p>{data.ctaSubtitle}</p>
          </div>

          <div className={styles.ctaButtons}>
            <Link href={routeFor(locale, '/contact?topic=rescue')} className={styles.ctaBtnPrimary}>
              <span>{data.ctaPrimary}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href={routeFor(locale, '/transparency')} className={styles.ctaBtnSecondary}>
              <ShieldCheck size={16} aria-hidden="true" />
              <span>{data.ctaSecondary}</span>
            </Link>
          </div>
        </section>
      </main>

      {/* 06. Standalone SVG heart at the end of /vi/rescue & /en/rescue */}
      <RescueHeartDiagram locale={locale} />
    </div>
  );
}
