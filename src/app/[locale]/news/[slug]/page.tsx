import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';

 type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params; if (!isLocale(locale)) notFound();
  const article = articles.find((item) => item.slug === slug); if (!article) notFound();
  return pageMetadata(locale, `/news/${slug}`, article.title[locale], article.description[locale], 'article');
}
export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params; if (!isLocale(locale)) notFound();
  const article = articles.find((item) => item.slug === slug); if (!article) notFound();
  const t = getDictionary(locale);
  return <section className="page-content"><div className="container"><Link href={routeFor(locale, '/news')} className="article-read"><ArrowLeft size={17} aria-hidden="true" />{t.news.back}</Link><div className="article-layout" style={{ marginTop: 32 }}><article className="article-main"><span className="article-category">{article.category[locale]}</span><h1>{article.title[locale]}</h1><p className="article-lead">{article.description[locale]}</p><div className="article-hero"><Image src={article.image} alt={locale === 'vi' ? 'Ảnh minh họa chủ đề chăm sóc mèo' : 'Illustrative cat-care photo'} fill priority sizes="(max-width:750px) 94vw, 60vw" className="cover-image" /></div><div className="article-body">{article.paragraphs[locale].map((p) => <p key={p}>{p}</p>)}</div></article><aside className="article-sidebar"><h2>{t.common.related}</h2>{articles.filter((item) => item.slug !== slug).map((item) => <Link href={routeFor(locale, `/news/${item.slug}`)} key={item.slug}>{item.title[locale]} <ArrowRight size={13} aria-hidden="true" /></Link>)}</aside></div></div></section>;
}
