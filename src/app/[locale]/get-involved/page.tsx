import type { Metadata } from 'next';
import { HeartHandshake, Languages, House, PackagePlus } from 'lucide-react';
import { notFound } from 'next/navigation';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { PageIntro, SectionIntro, ButtonLink } from '@/components/Ui';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return pageMetadata(locale, '/get-involved', t.meta.join[0], t.meta.join[1]);
}
export default async function JoinPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  const icons = [HeartHandshake, Languages, House, PackagePlus];
  return <><PageIntro eyebrow={t.join.eyebrow} title={t.join.title} description={t.join.description} />
    <section className="page-content"><div className="container"><SectionIntro title={t.join.waysTitle} /><div className="step-grid">{t.join.ways.map((item,i) => { const Icon=icons[i]; return <div className="step-card" key={item.title}><div className="value-icon" style={{ marginBottom: 18, color: '#A66F57' }}><Icon size={30} strokeWidth={1.55} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.description}</p><div style={{ marginTop: 19 }}><ButtonLink href={routeFor(locale, `/contact?topic=${item.subject}`)} variant="text">{t.common.joinUs}</ButtonLink></div></div>; })}</div></div></section>
    <section className="soft-section"><div className="container"><div className="cta-panel"><div><h2>{t.join.closingTitle}</h2><p>{t.join.closingDesc}</p></div><ButtonLink href={routeFor(locale, '/contact')}>{t.join.cta}</ButtonLink></div></div></section>
  </>;
}
