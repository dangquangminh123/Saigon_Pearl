import Image from 'next/image';
import type { Metadata } from 'next';
import { HeartHandshake, Leaf, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { PageIntro, ButtonLink, SectionIntro } from '@/components/Ui';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return pageMetadata(locale, '/about', t.meta.story[0], t.meta.story[1]);
}
export default async function AboutPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  const icons = [HeartHandshake, Leaf, ShieldCheck];
  return <><PageIntro eyebrow={t.story.eyebrow} title={t.story.title} description={t.story.description} />
    <section className="page-content"><div className="container two-column"><div className="photo-large"><Image src="/images/story.webp" alt={locale === 'vi' ? 'Hai bé mèo trong ảnh tham khảo minh họa' : 'Two cats in an illustrative reference photo'} fill sizes="(max-width: 750px) 94vw, 45vw" className="cover-image" /></div><div className="prose"><h2>{t.story.sectionA}</h2>{t.story.paragraphs.map((p) => <p key={p}>{p}</p>)}<ButtonLink href={routeFor(locale, '/get-involved')} variant="outline">{t.common.joinUs}</ButtonLink></div></div></section>
    <section className="soft-section"><div className="container"><SectionIntro title={t.story.valuesTitle} /><div className="value-grid">{t.story.values.map((item,index) => { const Icon = icons[index]; return <div key={item.title} className="value-card"><div className="value-icon"><Icon size={26} strokeWidth={1.6} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.description}</p></div>; })}</div></div></section>
    <div className="container"><blockquote className="centered-quote">“{t.story.quote}”</blockquote></div>
  </>;
}
