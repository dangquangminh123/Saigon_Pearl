import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { PageIntro } from '@/components/Ui';
import { articles } from '@/data/articles';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return pageMetadata(locale, '/news', t.meta.news[0], t.meta.news[1]);
}
export default async function NewsPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return <><PageIntro eyebrow={t.news.eyebrow} title={t.news.title} description={t.news.description} />
    <section className="page-content"><div className="container"><div className="article-grid">{articles.map((article) => <Link key={article.slug} className="article-card" href={routeFor(locale, `/news/${article.slug}`)}><div className="article-image"><Image src={article.image} alt={locale === 'vi' ? 'Ảnh mèo minh họa chủ đề bài viết' : 'Illustrative cat photo for article'} fill sizes="(max-width:480px) 94vw, (max-width:750px) 45vw, 30vw" className="cover-image" /></div><div className="article-copy"><span className="article-category">{article.category[locale]}</span><h2>{article.title[locale]}</h2><p>{article.description[locale]}</p><span className="article-read">{t.news.read}<ArrowRight size={17} aria-hidden="true" /></span></div></Link>)}</div></div></section>
  </>;
}
