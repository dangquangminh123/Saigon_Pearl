'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Search, BookOpen } from 'lucide-react';
import type { Article } from '@/data/articles';
import type { Locale } from '@/lib/i18n';
import { routeFor } from '@/lib/i18n';
import {
  newsCopy,
  newsTopics,
  newsEditorial,
  topicForArticle,
  type NewsTopic,
} from '@/data/news-editorial';
import styles from '../news.module.css';

function normalize(value: string) {
  return value.toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

type Props = {
  locale: Locale;
  items: Article[];
};

export function NewsExplorer({ locale, items }: Props) {
  const copy = newsCopy[locale];
  const [topic, setTopic] = useState<NewsTopic>('all');
  const [term, setTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const shown = useMemo(() => {
    const query = normalize(term.trim());
    return items.filter((article) => {
      const matchesTopic =
        topic === 'all' || topicForArticle(article.slug) === topic;
      const text = normalize([
        article.title[locale],
        article.description[locale],
        article.category[locale],
      ].join(' '));
      return matchesTopic && (!query || text.includes(query));
    });
  }, [items, locale, term, topic]);

  const availableTopics = newsTopics.filter((candidate) =>
    candidate === 'all' ||
    items.some((item) => topicForArticle(item.slug) === candidate)
  );

  return (
    <>
      <div className={styles.explorerTools}>
        <div className={styles.topicList} aria-label={copy.filterTitle}>
          {availableTopics.map((item) => (
            <button
              key={item}
              type="button"
              className={`${styles.topicButton} ${topic === item ? styles.topicActive : ''}`}
              onClick={() => {
                setTopic(item);
                setVisibleCount(6);
              }}
              aria-pressed={topic === item}
            >
              {copy.category[item]}
            </button>
          ))}
        </div>
        <label className={styles.searchBox}>
          <Search size={19} aria-hidden="true" />
          <span className={styles.visuallyHidden}>{copy.searchLabel}</span>
          <input
            type="search"
            value={term}
            onChange={(event) => {
              setTerm(event.target.value);
              setVisibleCount(6);
            }}
            placeholder={copy.searchPlaceholder}
          />
        </label>
      </div>

      <div className={styles.postGrid} aria-live="polite">
        {shown.slice(0, visibleCount).map((article) => (
          <article className={styles.postCard} key={article.slug}>
            <Link
              className={styles.postImageLink}
              href={routeFor(locale, `/news/${article.slug}`)}
              aria-label={article.title[locale]}
            >
              <Image
                src={article.image}
                alt={
                  newsEditorial[article.slug]?.imageVerified
                    ? (newsEditorial[article.slug]?.imageAlt?.[locale] ?? copy.imagePlaceholder)
                    : copy.imagePlaceholder
                }
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1040px) 48vw, 31vw"
                className={styles.coverImage}
              />
            </Link>
            <div className={styles.postBody}>
              <span className={styles.categoryLabel}>
                {copy.category[topicForArticle(article.slug)]}
              </span>
              <h3 className={styles.postTitle}>
                <Link href={routeFor(locale, `/news/${article.slug}`)}>
                  {article.title[locale]}
                </Link>
              </h3>
              <p className={styles.postExcerpt}>{article.description[locale]}</p>
              <Link
                className={styles.readLink}
                href={routeFor(locale, `/news/${article.slug}`)}
              >
                {copy.read}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <div className={styles.emptyState} role="status">
          <BookOpen size={34} strokeWidth={1.5} aria-hidden="true" />
          <p>{copy.empty}</p>
        </div>
      )}

      {visibleCount < shown.length && (
        <div className={styles.loadMoreWrap}>
          <button
            type="button"
            className={styles.outlineButton}
            onClick={() => setVisibleCount((n) => n + 6)}
          >
            {copy.loadMore}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

