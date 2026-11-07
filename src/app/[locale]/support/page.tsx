import type { Metadata } from 'next';
import Image from 'next/image';
import { Check, Package, Stethoscope, Users } from 'lucide-react';
import { notFound } from 'next/navigation';
import { isLocale, routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { PageIntro, SectionIntro, ButtonLink } from '@/components/Ui';
import { VerifiedDonationQR } from '@/components/VerifiedDonationQR';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return pageMetadata(locale, '/support', t.meta.support[0], t.meta.support[1]);
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const icons = [Package, Stethoscope, Users];

  return (
    <>
      <PageIntro eyebrow={t.support.eyebrow} title={t.support.title} description={t.support.description} />
      <section className="page-content">
        <div className="container">
          <SectionIntro title={t.support.supportTitle} />
          <div className="value-grid">
            {t.support.ways.map((item, i) => {
              const Icon = icons[i];
              return (
                <div className="value-card" key={item.title}>
                  <div className="value-icon"><Icon size={27} aria-hidden="true" /></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Fail-closed Cryptographically Verified Donation QR */}
          <VerifiedDonationQR locale={locale} />
        </div>
      </section>

      <section className="soft-section">
        <div className="container two-column">
          <div>
            <p className="eyebrow">{t.home.eyebrow}</p>
            <h2 className="content-heading">{t.support.principlesTitle}</h2>
            <ul className="principle-list">
              {t.support.principles.map((text) => (
                <li key={text}><Check size={19} aria-hidden="true" /><span>{text}</span></li>
              ))}
            </ul>
            <div className="inline-cta">
              <ButtonLink href={routeFor(locale, '/transparency')} arrow>{t.support.cta}</ButtonLink>
            </div>
          </div>
          <div className="photo-large">
            <Image
              src="/images/cta-care.webp"
              alt={locale === 'vi' ? 'Ảnh minh họa chăm sóc mèo cộng đồng' : 'Illustrative photo of community cat care'}
              fill
              sizes="(max-width: 991px) 92vw, 44vw"
              className="cover-image"
            />
          </div>
        </div>
      </section>
    </>
  );
}
