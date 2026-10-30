import type { Metadata } from 'next';
import { FileCheck2, ReceiptText, ScrollText, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { PageIntro, SectionIntro, ButtonLink } from '@/components/Ui';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return pageMetadata(locale, '/transparency', t.meta.transparency[0], t.meta.transparency[1]);
}
export default async function TransparencyPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  const icons = [FileCheck2, ReceiptText, ScrollText];
  return <><PageIntro eyebrow={t.transparency.eyebrow} title={t.transparency.title} description={t.transparency.description} />
    <section className="page-content"><div className="container"><div className="status-panel"><ShieldCheck size={37} aria-hidden="true" /><div><h2>{t.transparency.statusTitle}</h2><p>{t.transparency.statusDesc}</p></div></div><div style={{ marginTop: 65 }}><SectionIntro title={t.transparency.reportsTitle} /><div className="value-grid">{t.transparency.reports.map((item,i) => { const Icon = icons[i]; return <div className="value-card" key={item.title}><div className="value-icon"><Icon size={27} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.description}</p></div>; })}</div></div></div></section>
    <section className="soft-section"><div className="container"><div className="cta-panel"><div><h2>{t.transparency.principleTitle}</h2><p>{t.transparency.principleDesc}</p></div><ButtonLink href={routeFor(locale, '/contact?topic=other')}>{t.transparency.cta}</ButtonLink></div></div></section>
  </>;
}
