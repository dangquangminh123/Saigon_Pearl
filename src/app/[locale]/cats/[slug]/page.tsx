import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Info, PawPrint } from 'lucide-react';
import { notFound } from 'next/navigation';
import { cats } from '@/data/cats';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { catAge } from '@/components/CatCard';
import { ButtonLink } from '@/components/Ui';

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return cats.map((cat) => ({ slug: cat.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params; if (!isLocale(locale)) notFound();
  const cat = cats.find((entry) => entry.slug === slug); if (!cat) notFound();
  const t = getDictionary(locale);
  return pageMetadata(locale, `/cats/${slug}`, `${cat.name} — ${t.cats.sampleBadge}`, cat.description[locale]);
}
export default async function CatProfilePage({ params }: Props) {
  const { locale, slug } = await params; if (!isLocale(locale)) notFound();
  const cat = cats.find((entry) => entry.slug === slug); if (!cat) notFound();
  const t = getDictionary(locale);
  return <section className="page-content"><div className="container"><Link className="article-read" href={routeFor(locale, '/cats')}><ArrowLeft size={16} aria-hidden="true" />{t.nav.cats}</Link>
    <div className="cat-profile-grid" style={{ marginTop: '30px' }}><div className="cat-profile-photo"><Image src={cat.image} alt={`${cat.name} — ${locale === 'vi' ? 'ảnh minh họa' : 'illustrative photo'}`} fill priority sizes="(max-width:750px) 94vw, 48vw" className="cover-image" /></div><div><p className="eyebrow">{t.cats.sampleBadge}</p><p style={{ fontFamily: 'Georgia, serif', color: '#7F6C5B', margin: 0 }}>{t.cats.detailTitle}</p><h1 className="cat-profile-name">{cat.name}</h1><p className="profile-facts">{catAge(cat.ageMonths, locale)} · {cat.gender === 'female' ? t.cats.female : t.cats.male} · {cat.status === 'looking' ? t.cats.statusLooking : t.cats.statusCare}</p><p className="profile-desc">{cat.description[locale]}</p><h2 style={{ fontFamily: 'Georgia, serif', color: '#46614F', fontSize: 23 }}>{t.cats.personality}</h2><div className="profile-tags">{cat.personality[locale].map((trait) => <span key={trait}><PawPrint size={13} aria-hidden="true" /> {trait}</span>)}</div><ButtonLink href={routeFor(locale, '/adopt')}>{t.cats.cta}</ButtonLink></div></div>
    <div className="notice-inline" style={{ marginTop: 35 }}><Info size={19} aria-hidden="true" />{t.cats.disclaimer}</div>
    <div className="cta-panel" style={{ marginTop: 50 }}><div><h2>{t.cats.contactTitle}</h2><p>{t.cats.contactDesc}</p></div><ButtonLink href={routeFor(locale, '/contact?topic=adopt')} variant="outline">{t.common.contactUs}</ButtonLink></div>
  </div></section>;
}
