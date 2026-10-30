'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Clock, AlertTriangle, X, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { GuideCategory, GuideArticle } from '@/data/rescue-guide';
import styles from '../rescue.module.css';

type Props = {
  locale: Locale;
  categories: { key: GuideCategory; label: string }[];
  articles: GuideArticle[];
  readMoreLabel: string;
  featuredBadgeLabel: string;
};

export function RescueCatalog({
  locale,
  categories,
  articles,
  readMoreLabel,
  featuredBadgeLabel,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory>('all');
  const [activeArticle, setActiveArticle] = useState<GuideArticle | null>(null);

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  const featuredArticle = filteredArticles.find((a) => a.featured) || (selectedCategory === 'all' ? articles[0] : null);
  const regularArticles = featuredArticle
    ? filteredArticles.filter((a) => a.id !== featuredArticle.id)
    : filteredArticles;

  return (
    <>
      {/* 1. Category Filter Pills */}
      <nav className={styles.filterBar} aria-label={locale === 'vi' ? 'Lọc chuyên mục cẩm nang' : 'Filter guide categories'}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              type="button"
              key={cat.key}
              className={`${styles.filterPill} ${isSelected ? styles.filterPillActive : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
              aria-pressed={isSelected}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>

      {/* 2. Articles List / Grid */}
      <div className={styles.articlesList}>
        {/* Featured Large Card */}
        {featuredArticle && (
          <article className={`${styles.card} ${styles.cardLarge}`} onClick={() => setActiveArticle(featuredArticle)}>
            <div className={styles.cardLargeImageWrap}>
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.alt[locale]}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className={styles.cardImage}
              />
              <span className={styles.featuredBadge}>
                <AlertTriangle size={13} aria-hidden="true" />
                {featuredBadgeLabel}
              </span>
            </div>

            <div className={styles.cardLargeBody}>
              <div className={styles.cardCategoryRow}>
                <span className={styles.categoryBadge}>{featuredArticle.categoryLabel[locale]}</span>
                <span className={styles.readTime}>
                  <Clock size={13} aria-hidden="true" />
                  {featuredArticle.readTime[locale]}
                </span>
              </div>

              <h2 className={styles.cardLargeTitle}>
                <button type="button" className={styles.titleLink}>
                  {featuredArticle.title[locale]}
                </button>
              </h2>

              <p className={styles.cardSummary}>{featuredArticle.summary[locale]}</p>

              <div className={styles.cardFooter}>
                <time className={styles.cardDate}>{featuredArticle.date}</time>
                <span className={styles.readMoreBtn}>
                  {readMoreLabel}
                  <ArrowRight size={15} aria-hidden="true" className={styles.arrowIcon} />
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Regular Horizontal Cards Grid */}
        <div className={styles.horizontalCardsGrid}>
          {regularArticles.map((article) => (
            <article
              key={article.id}
              className={`${styles.card} ${styles.cardHorizontal}`}
              onClick={() => setActiveArticle(article)}
            >
              <div className={styles.cardHorizontalImageWrap}>
                <Image
                  src={article.image}
                  alt={article.alt[locale]}
                  fill
                  sizes="(max-width: 480px) 130px, 240px"
                  className={styles.cardImage}
                />
              </div>

              <div className={styles.cardHorizontalBody}>
                <div className={styles.cardCategoryRow}>
                  <span className={styles.categoryBadge}>{article.categoryLabel[locale]}</span>
                  <span className={styles.readTime}>
                    <Clock size={12} aria-hidden="true" />
                    {article.readTime[locale]}
                  </span>
                </div>

                <h3 className={styles.cardHorizontalTitle}>
                  <button type="button" className={styles.titleLink}>
                    {article.title[locale]}
                  </button>
                </h3>

                <p className={styles.cardSummaryHorizontal}>{article.summary[locale]}</p>

                <div className={styles.cardFooter}>
                  <time className={styles.cardDate}>{article.date}</time>
                  <span className={styles.readMoreBtn}>
                    {readMoreLabel}
                    <ArrowRight size={14} aria-hidden="true" className={styles.arrowIcon} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 3. Detail Lightbox Modal when clicking an article */}
      {activeArticle && (
        <div className={styles.modalOverlay} role="presentation" onClick={() => setActiveArticle(null)}>
          <div
            className={styles.modalDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setActiveArticle(null)}
              aria-label={locale === 'vi' ? 'Đóng cửa sổ' : 'Close modal'}
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className={styles.modalHeader}>
              <span className={styles.categoryBadge}>{activeArticle.categoryLabel[locale]}</span>
              <h2 id="modal-title" className={styles.modalTitle}>
                {activeArticle.title[locale]}
              </h2>
              <div className={styles.modalMeta}>
                <span>{activeArticle.date}</span>
                <span>&bull;</span>
                <span>{activeArticle.readTime[locale]}</span>
              </div>
            </div>

            <div className={styles.modalImageWrap}>
              <Image
                src={activeArticle.image}
                alt={activeArticle.alt[locale]}
                fill
                sizes="800px"
                className={styles.cardImage}
              />
            </div>

            <div className={styles.modalBody}>
              <p className={styles.modalLead}>{activeArticle.summary[locale]}</p>

              <div className={styles.modalNotice}>
                <ShieldCheck size={22} className={styles.modalNoticeIcon} aria-hidden="true" />
                <p>
                  {locale === 'vi'
                    ? 'Mọi hướng dẫn trên nhằm phục vụ sơ cấp cứu ban đầu. Đối với các tình huống chấn thương nặng hoặc bệnh lý phức tạp, hãy đưa mèo đến phòng khám thú y gần nhất càng sớm càng tốt.'
                    : 'All instructions are intended for initial first aid. In cases of severe trauma or complex illnesses, transport the cat to the nearest veterinary hospital promptly.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
