import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  HeartHandshake,
  PawPrint,
} from 'lucide-react';
import { articles } from '@/data/articles';
import { newsCopy, topicForArticle, newsEditorial } from '@/data/news-editorial';
import { isLocale, routeFor } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';
import { NewsExplorer } from './_components/NewsExplorer';
import { NewsReveal } from './_components/NewsReveal';
import styles from './news.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = newsCopy[locale];
  return pageMetadata(
    locale,
    '/news',
    locale === 'vi'
      ? 'Góc chia sẻ mèo, cứu hộ & nhận nuôi Saigon Pearl'
      : 'Cat Stories, Rescue & Adoption Guides at Saigon Pearl',
    copy.heroDescription
  );
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = newsCopy[locale];
  const featured = articles[0];
  const remaining = featured
    ? articles.filter((item) => item.slug !== featured.slug)
    : [];

  const galleryImages = [
    '/images/cat-luna.webp',
    '/images/story.webp',
    '/images/cta-community.webp',
  ];

  return (
    <div className={styles.page} data-page="community-stories">
      {/* 1. Hero */}
      <section className={styles.hero} aria-labelledby="news-page-title">
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href={routeFor(locale, '')}>{copy.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.breadcrumb}</span>
          </nav>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 id="news-page-title">{copy.heroTitle}</h1>
              <p className={styles.heroDescription}>{copy.heroDescription}</p>
            </div>
            <div className={styles.heroStamp} aria-hidden="true">
              <PawPrint size={61} strokeWidth={1.05} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured article; link stays a real HTML link */}
      {featured && (
        <section className={styles.featuredSection} aria-labelledby="news-featured-title">
          <div className={styles.container}>
            <NewsReveal className={styles.featuredGrid}>
              <Link
                href={routeFor(locale, `/news/${featured.slug}`)}
                className={styles.featuredImageWrap}
                aria-label={featured.title[locale]}
              >
                <Image
                  src={featured.image}
                  alt={
                    newsEditorial[featured.slug]?.imageVerified
                      ? (newsEditorial[featured.slug]?.imageAlt?.[locale] ?? copy.imagePlaceholder)
                      : copy.imagePlaceholder
                  }
                  fill
                  priority
                  sizes="(max-width: 820px) 100vw, 55vw"
                  className={styles.coverImage}
                />
              </Link>
              <div className={styles.featuredCopy}>
                <span className={styles.eyebrow} id="news-featured-title">
                  <BookOpen size={15} aria-hidden="true" />
                  {copy.featured}
                </span>
                <span className={styles.categoryLabel}>
                  {copy.category[topicForArticle(featured.slug)]}
                </span>
                <h2 className={styles.featuredTitle}>
                  <Link href={routeFor(locale, `/news/${featured.slug}`)}>
                    {featured.title[locale]}
                  </Link>
                </h2>
                <p>{featured.description[locale]}</p>
                <Link
                  href={routeFor(locale, `/news/${featured.slug}`)}
                  className={styles.textLink}
                >
                  {copy.read}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </div>
            </NewsReveal>
          </div>
        </section>
      )}

      {/* 3. Taxonomy filters + search + masonry-like editorial grid */}
      <section className={styles.exploreSection} aria-labelledby="news-explore-title">
        <div className={styles.container}>
          <NewsReveal className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.filterEyebrow}</p>
            <h2 id="news-explore-title">{copy.filterTitle}</h2>
          </NewsReveal>
          <NewsExplorer locale={locale} items={remaining} />
        </div>
      </section>

      {/* 4. Quiet quote band */}
      <section className={styles.quoteBand} aria-label={copy.quoteCaption}>
        <div className={styles.container}>
          <NewsReveal className={styles.quoteContent}>
            <HeartHandshake size={33} strokeWidth={1.35} aria-hidden="true" />
            <blockquote>“{copy.quote}”</blockquote>
            <p>{copy.quoteCaption}</p>
          </NewsReveal>
        </div>
      </section>

      {/* 5. Visual journal gallery: replace these 3 illustrative assets */}
      <section className={styles.gallerySection} aria-labelledby="news-gallery-title">
        <div className={styles.container}>
          <NewsReveal className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.galleryEyebrow}</p>
            <h2 id="news-gallery-title">{copy.galleryTitle}</h2>
            <p className={styles.sectionLead}>{copy.galleryDescription}</p>
          </NewsReveal>
          <div className={styles.galleryGrid}>
            {galleryImages.map((src, index) => (
              <figure key={src} className={styles.galleryFigure}>
                <div className={styles.galleryImageWrap}>
                  <Image
                    src={src}
                    alt={`${copy.imagePlaceholder}: ${copy.galleryCaptions[index]}`}
                    fill
                    sizes="(max-width: 700px) 100vw, 32vw"
                    className={styles.coverImage}
                  />
                </div>
                <figcaption>{copy.galleryCaptions[index]}</figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.galleryNotice}>{copy.galleryNotice}</p>
        </div>
      </section>

      {/* 6. Community CTA; real routes, no fake donation form */}
      <section className={styles.ctaSection} aria-labelledby="news-cta-title">
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div>
            <p className={styles.eyebrow}>{copy.ctaEyebrow}</p>
            <h2 id="news-cta-title">{copy.ctaTitle}</h2>
            <p>{copy.ctaDescription}</p>
            <div className={styles.ctaActions}>
              <Link href={routeFor(locale, '/cats')} className={styles.solidButton}>
                {copy.catsButton}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href={routeFor(locale, '/adopt')} className={styles.outlineButton}>
                {copy.adoptButton}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className={styles.ctaIcon} aria-hidden="true">
            <PawPrint size={86} strokeWidth={1.15} />
          </div>
        </div>
      </section>
    </div>
  );
}
