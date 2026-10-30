import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { PageIntro, SectionIntro, ButtonLink } from '@/components/Ui';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return pageMetadata(locale, '/adopt', t.meta.adopt[0], t.meta.adopt[1]);
}
export default async function AdoptPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return <><PageIntro eyebrow={t.adopt.eyebrow} title={t.adopt.title} description={t.adopt.description}><div style={{ marginTop: 22 }}><ButtonLink href={routeFor(locale, '/cats')}>{t.adopt.cta}</ButtonLink></div></PageIntro>
    <section className="page-content"><div className="container"><SectionIntro title={t.adopt.stepsTitle} /><div className="step-grid">{t.adopt.steps.map((step,i) => <div className="step-card" key={step.title}><div className="step-number">0{i + 1}</div><h3>{step.title}</h3><p>{step.description}</p></div>)}</div></div></section>
    <section className="soft-section"><div className="container"><SectionIntro title={t.adopt.faqTitle} /><div className="faq-list">{t.adopt.faqs.map((faq) => <details className="faq-item" key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div></div></section>
  </>;
}
