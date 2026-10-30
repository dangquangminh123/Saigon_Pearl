import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, HandHeart, HeartHandshake, House, PawPrint, ShieldCheck, UsersRound } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';
import { isLocale, routeFor } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';
import { aboutStory } from '@/data/about-story';
import { AboutGallery } from './_components/AboutGallery';
import { RevealOnScroll } from './_components/RevealOnScroll';
import styles from './about.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return pageMetadata(locale, '/about', t.meta.story[0], t.meta.story[1]);
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const c = aboutStory[locale];
  const valueIcons = [HandHeart, ShieldCheck, HeartHandshake, UsersRound];

  return (
    <div className={styles.page} data-page="our-story">
      {/* 01. Banner: full-width photo, overlay, breadcrumb */}
      <section className={styles.hero} aria-labelledby="story-title">
        <Image
          src="/images/hero-clean.webp"
          alt={locale === 'vi' ? 'Ảnh minh họa một bé mèo ngoài trời' : 'Illustrative photo of a cat outdoors'}
          fill
          priority
          sizes="100vw"
          className={styles.heroPhoto}
        />
        <div className={styles.heroTint} aria-hidden="true" />
        <div className={styles.container}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href={routeFor(locale, '')}>{t.nav.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c.breadcrumb}</span>
          </nav>
          <div className={styles.heroText}>
            <span className={styles.eyebrow}>{c.eyebrow}</span>
            <h1 id="story-title">{c.title}</h1>
            <p>{c.lead}</p>
            <span className={styles.heroHandwritten}>{c.heroFootnote}</span>
          </div>
        </div>
      </section>

      {/* 02. Editorial introduction with asymmetric overlapping photos */}
      <section className={styles.intro} aria-labelledby="story-intro-title">
        <div className={`${styles.container} ${styles.introGrid}`}>
          <RevealOnScroll className={styles.collage}>
            <div className={styles.collageMain}>
              <Image
                src="/images/story.webp"
                alt={locale === 'vi' ? 'Ảnh minh họa hai bé mèo' : 'Illustrative photograph of two cats'}
                fill
                sizes="(max-width: 820px) 88vw, 42vw"
                className={styles.coverPhoto}
              />
            </div>
            <div className={styles.collageAccent}>
              <Image
                src="/images/cat-luna.webp"
                alt={locale === 'vi' ? 'Ảnh minh họa một bé mèo' : 'Illustrative photograph of a cat'}
                fill
                sizes="(max-width: 820px) 38vw, 18vw"
                className={styles.coverPhoto}
              />
            </div>
            <span className={styles.pawStamp} aria-hidden="true">
              <PawPrint size={35} strokeWidth={1.2} />
            </span>
          </RevealOnScroll>
          <RevealOnScroll className={styles.introCopy}>
            <p className={styles.eyebrow}>{c.introEyebrow}</p>
            <h2 id="story-intro-title">{c.introTitle}</h2>
            {c.introText.map((paragraph) => (
              <p key={paragraph} className={styles.bodyText}>
                {paragraph}
              </p>
            ))}
            <Link href={routeFor(locale, '/get-involved')} className={styles.outlineButton}>
              {c.introButton}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* 03. Values: four cards with the installed lucide-react icons */}
      <section className={styles.values} aria-labelledby="story-values-title">
        <div className={styles.container}>
          <RevealOnScroll className={styles.sectionHead}>
            <p className={styles.eyebrow}>{c.valuesEyebrow}</p>
            <h2 id="story-values-title">{c.valuesTitle}</h2>
          </RevealOnScroll>
          <div className={styles.valuesGrid}>
            {c.values.map((value, i) => {
              const Icon = valueIcons[i] ?? HeartHandshake;
              return (
                <RevealOnScroll key={value.title} className={styles.valueCard}>
                  <span className={styles.valueIcon}>
                    <Icon size={32} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04. Three alternating editorial story rows */}
      <section className={styles.chapters} aria-labelledby="story-chapters-title">
        <div className={styles.container}>
          <RevealOnScroll className={styles.sectionHead}>
            <p className={styles.eyebrow}>{c.chaptersEyebrow}</p>
            <h2 id="story-chapters-title">{c.chaptersTitle}</h2>
          </RevealOnScroll>
          {c.chapters.map((chapter, index) => (
            <RevealOnScroll
              key={chapter.number}
              className={`${styles.chapterRow} ${index % 2 ? styles.reverse : ''}`}
            >
              <div className={styles.chapterPhoto}>
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  sizes="(max-width: 820px) 90vw, 45vw"
                  className={styles.coverPhoto}
                />
              </div>
              <div className={styles.chapterCopy}>
                <span className={styles.chapterNumber}>{chapter.number}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
                <span className={styles.chapterUnderline} aria-hidden="true" />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 05. Quiet statement: no fabricated testimonials */}
      <section className={styles.quoteBand} aria-label={c.quoteCaption}>
        <div className={styles.container}>
          <PawPrint size={30} strokeWidth={1.2} aria-hidden="true" />
          <blockquote>“{c.quote}”</blockquote>
          <p>{c.quoteCaption}</p>
        </div>
      </section>

      {/* 06. Asymmetric clickable photo mosaic + lightbox */}
      <section className={styles.gallerySection} aria-labelledby="story-gallery-title">
        <div className={styles.container}>
          <RevealOnScroll className={styles.sectionHead}>
            <p className={styles.eyebrow}>{c.galleryEyebrow}</p>
            <h2 id="story-gallery-title">{c.galleryTitle}</h2>
            <p className={styles.sectionLead}>{c.galleryLead}</p>
          </RevealOnScroll>
          <AboutGallery
            items={c.gallery}
            labels={{
              open: c.galleryOpen,
              close: c.galleryClose,
              previous: c.galleryPrevious,
              next: c.galleryNext,
            }}
          />
          <p className={styles.galleryNotice}>{c.galleryNotice}</p>
        </div>
      </section>

      {/* 07. Process roadmap, not an invented historical timeline */}
      <section className={styles.stepsSection} aria-labelledby="story-steps-title">
        <div className={styles.container}>
          <RevealOnScroll className={styles.sectionHead}>
            <p className={styles.eyebrow}>{c.stepsEyebrow}</p>
            <h2 id="story-steps-title">{c.stepsTitle}</h2>
          </RevealOnScroll>
          <ol className={styles.stepsGrid}>
            {c.steps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 08. Ending: two real internal routes */}
      <section className={styles.ctaSection} aria-labelledby="story-cta-title">
        <div className={`${styles.container} ${styles.ctaGrid}`}>
          <div className={styles.ctaContent}>
            <p className={styles.eyebrow}>{c.ctaEyebrow}</p>
            <h2 id="story-cta-title">{c.ctaTitle}</h2>
            <p>{c.ctaText}</p>
            <div className={styles.ctaActions}>
              <Link href={routeFor(locale, '/get-involved')} className={styles.solidButton}>
                {c.ctaPrimary}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href={routeFor(locale, '/adopt')} className={styles.outlineButton}>
                {c.ctaSecondary}
              </Link>
            </div>
          </div>
          <div className={styles.ctaPhoto}>
            <Image
              src="/images/cta-community.webp"
              alt={locale === 'vi' ? 'Ảnh minh họa sự kết nối trong cộng đồng' : 'Illustrative image of community connection'}
              fill
              sizes="(max-width: 820px) 90vw, 38vw"
              className={styles.coverPhoto}
            />
            <span className={styles.ctaPhotoIcon} aria-hidden="true">
              <House size={33} strokeWidth={1.4} />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
