import type { Metadata } from 'next';
import { AlertCircle, HeartPulse, Droplets, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { PageIntro, SectionIntro, ButtonLink } from '@/components/Ui';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return pageMetadata(locale, '/rescue', t.meta.rescue[0], t.meta.rescue[1]);
}
export default async function RescuePage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  const icons = [Droplets, HeartPulse, ShieldCheck];
  return <><PageIntro eyebrow={t.rescue.eyebrow} title={t.rescue.title} description={t.rescue.description} />
    <section className="page-content"><div className="container"><SectionIntro title={t.rescue.stepsTitle} /><div className="step-grid">{t.rescue.steps.map((step, i) => <div className="step-card" key={step.title}><div className="step-number">0{i + 1}</div><h3>{step.title}</h3><p>{step.description}</p></div>)}</div><div className="info-note" style={{ marginTop: 32 }}><AlertCircle size={21} aria-hidden="true" />{t.rescue.note}</div></div></section>
    <section className="soft-section"><div className="container"><SectionIntro title={t.rescue.careTitle} /><div className="value-grid">{t.rescue.care.map((item,i) => { const Icon = icons[i]; return <div className="value-card" key={item.title}><div className="value-icon"><Icon size={27} strokeWidth={1.7} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.description}</p></div>; })}</div><div className="inline-cta"><ButtonLink href={routeFor(locale, '/contact?topic=rescue')}>{t.rescue.cta}</ButtonLink></div></div></section>
  </>;
}
