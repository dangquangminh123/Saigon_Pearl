import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, HeartHandshake, BookOpen } from 'lucide-react';
import { articles } from '@/data/articles';
import { newsCopy, newsEditorial, topicForArticle } from '@/data/news-editorial';
import { isLocale, routeFor } from '@/lib/i18n';
import { brand, pageMetadata, siteUrl } from '@/lib/site';
import { ShareArticle } from '../_components/ShareArticle';
import styles from '../news.module.css';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const base = pageMetadata(
    locale,
    `/news/${slug}`,
    article.title[locale],
    article.description[locale],
    'article'
  );
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [
        {
          url: article.image,
          alt: newsEditorial[slug]?.imageAlt?.[locale] ?? article.title[locale],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title[locale],
      description: article.description[locale],
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const t = newsCopy[locale];
  const info = newsEditorial[slug];
  const related = articles.filter((item) => item.slug !== slug).slice(0, 3);
  const articleUrl = `${siteUrl()}${routeFor(locale, `/news/${slug}`)}`;
  const imageUrl = `${siteUrl()}${article.image}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title[locale],
    description: article.description[locale],
    mainEntityOfPage: articleUrl,
    image: imageUrl,
    inLanguage: locale === 'vi' ? 'vi-VN' : 'en',
    author: { '@type': 'Organization', name: brand, url: siteUrl() },
    publisher: { '@type': 'Organization', name: brand, url: siteUrl() },
    ...(info?.publishedAt ? { datePublished: info.publishedAt } : {}),
    ...(info?.updatedAt ? { dateModified: info.updatedAt } : {}),
  };

  return (
    <div className={styles.page} data-page="community-article">
      <section className={styles.articleHead}>
        <div className={styles.readingContainer}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href={routeFor(locale, '')}>{t.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={routeFor(locale, '/news')}>{t.breadcrumb}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className={styles.breadcrumbCurrent}>
              {article.title[locale]}
            </span>
          </nav>
          <span className={styles.categoryLabel}>
            {t.category[topicForArticle(article.slug)]}
          </span>
          <h1 className={styles.articleTitle}>{article.title[locale]}</h1>
          <p className={styles.articleLead}>{article.description[locale]}</p>
          {info?.publishedAt && (
            <p className={styles.articleMeta}>
              <time dateTime={info.publishedAt}>
                {new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(new Date(info.publishedAt))}
              </time>
            </p>
          )}
        </div>
      </section>

      <div className={styles.container}>
        <figure className={styles.articleHeroImage}>
          <div className={styles.articleHeroMedia}>
            <Image
              src={article.image}
              alt={
                info?.imageVerified
                  ? (info.imageAlt?.[locale] ?? t.imagePlaceholder)
                  : t.imagePlaceholder
              }
              fill
              priority
              sizes="(max-width: 900px) 94vw, 1100px"
              className={styles.coverImage}
            />
          </div>
          {!info?.imageVerified && <figcaption>{t.imagePlaceholder}</figcaption>}
        </figure>

        <div className={styles.articleReadingGrid}>
          <article className={styles.articleBody}>
            {article.paragraphs[locale].map((text, index) => (
              <p key={`${slug}-${index}`}>{text}</p>
            ))}
            <aside className={styles.articleNotice}>
              <BookOpen size={23} aria-hidden="true" />
              <p>{t.articleDisclaimer}</p>
            </aside>
            <ShareArticle locale={locale} title={article.title[locale]} />
            <Link href={routeFor(locale, '/news')} className={styles.backLink}>
              <ArrowLeft size={18} aria-hidden="true" />
              {t.allArticles}
            </Link>
          </article>

          <aside className={styles.articleAside} aria-label={t.related}>
            <div className={styles.asidePanel}>
              <HeartHandshake size={30} strokeWidth={1.45} aria-hidden="true" />
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaDescription}</p>
              <Link href={routeFor(locale, '/adopt')} className={styles.textLink}>
                {t.adoptButton}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className={styles.relatedSection} aria-labelledby="news-related-title">
          <div className={styles.container}>
            <h2 id="news-related-title" className={styles.relatedTitle}>
              {t.related}
            </h2>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <article key={item.slug} className={styles.relatedCard}>
                  <Link href={routeFor(locale, `/news/${item.slug}`)}>
                    <span className={styles.categoryLabel}>
                      {t.category[topicForArticle(item.slug)]}
                    </span>
                    <h3>{item.title[locale]}</h3>
                    <span className={styles.readLink}>
                      {t.read}
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </div>
  );
}
