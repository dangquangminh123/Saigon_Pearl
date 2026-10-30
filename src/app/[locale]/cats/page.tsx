import type { Metadata } from 'next';
import { Info } from 'lucide-react';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { PageIntro } from '@/components/Ui';
import { CatCatalog } from '@/components/CatCatalog';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return pageMetadata(locale, '/cats', t.meta.cats[0], t.meta.cats[1]);
}
export default async function CatsPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return <><PageIntro eyebrow={t.cats.eyebrow} title={t.cats.title} description={t.cats.description} />
    <section className="page-content"><div className="container"><CatCatalog locale={locale} /><p className="notice-inline"><Info size={18} aria-hidden="true" />{t.common.demoNotice}</p></div></section>
    <section className="soft-section"><div className="container"><div className="cta-panel"><div><h2>{t.cats.infoTitle}</h2><p>{t.cats.infoText}</p></div></div></div></section>
  </>;
}
