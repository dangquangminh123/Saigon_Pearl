import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { PageIntro } from '@/components/Ui';
import { ContactForm } from '@/components/ContactForm';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return pageMetadata(locale, '/contact', t.meta.contact[0], t.meta.contact[1]);
}
export default async function ContactPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const t = getDictionary(locale);
  return <><PageIntro eyebrow={t.contact.eyebrow} title={t.contact.title} description={t.contact.description} />
    <section className="page-content"><div className="container contact-layout"><ContactForm locale={locale} /><aside className="contact-aside"><MapPin size={46} strokeWidth={1.3} aria-hidden="true" /><h2>{t.contact.locationTitle}</h2><p>{t.contact.locationDesc}</p><p className="eyebrow" style={{ marginTop: 28 }}>{t.home.eyebrow}</p></aside></div></section>
  </>;
}
