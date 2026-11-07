import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Heart, House, PawPrint, UsersRound } from 'lucide-react';
import { notFound } from 'next/navigation';
import { isLocale, routeFor, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';
import { cats } from '@/data/cats';
import { CatCard } from '@/components/CatCard';
import { ButtonLink, SectionIntro } from '@/components/Ui';
import { RescueCareIcon, FindHomeIcon, CommunityIcon, SupportHandsIcon } from '@/components/PillarIcons';
import { HomeCommunityWheel } from '@/components/sections/HomeCommunityWheel/HomeCommunityWheel';
import { EditorialReveal } from '@/components/motion/EditorialMotion';
import { RescueStoryReel } from '@/components/motion/RescueStoryReel';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return pageMetadata(locale, '', t.meta.home[0], t.meta.home[1]);
}

export default async function HomePage({ params }: Props) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const t = getDictionary(locale);

  const pillarIcons = [RescueCareIcon, FindHomeIcon, CommunityIcon, SupportHandsIcon];

  const actions = [
    { path: '/adopt', image: '/images/cta-adopt.webp' },
    { path: '/support', image: '/images/cta-care.webp' },
    { path: '/get-involved', image: '/images/cta-community.webp' },
    { path: '/news', image: '/images/cta-news.webp' },
  ];

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="hero-photo">
          <Image
            src="/images/hero-clean.webp"
            alt={locale === 'vi' ? 'Ảnh minh họa một bé mèo mướp đang nằm nghỉ ngoài trời' : 'Illustrative photo of a relaxed tabby cat outdoors'}
            fill
            priority
            sizes="(max-width: 750px) 100vw, 65vw"
            className="cover-image"
          />
        </div>

        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">{t.home.eyebrow}</p>
            <h1 className="display-heading">
              <span>{t.home.heroTitleA}</span>
              <span>{t.home.heroTitleB}</span>
              <span className="hero-title-highlight">
                {t.home.heroTitleC}
                <Heart size={26} fill="currentColor" className="hero-heart-inline" aria-hidden="true" />
              </span>
            </h1>
            <p className="hero-description">{t.home.heroDesc}</p>
            <div className="hero-buttons">
              <ButtonLink
                href={routeFor(locale, '/cats')}
                variant="primary"
                icon={<Heart size={16} fill="currentColor" />}
              >
                {t.home.heroPrimary}
              </ButtonLink>
              <ButtonLink href={routeFor(locale, '/get-involved')} variant="outline">
                {t.home.heroSecondary}
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Editorial Badge on Hero Image */}
        <div className="hero-cloud-badge" aria-hidden="true">
          <span className="cloud-icon-wrap">
            <PawPrint size={18} strokeWidth={2} />
          </span>
          <p className="cloud-text">
            {t.home.heroStickerA} {t.home.heroStickerB} <strong>{t.home.heroStickerC}</strong>
          </p>
        </div>
      </section>

      {/* 2. Four Pillars */}
      <section className="pillars-section" aria-label={locale === 'vi' ? 'Bốn giá trị cộng đồng' : 'Four community pillars'}>
        <div className="container pillars-grid">
          {t.home.pillars.map((item, index) => {
            const Icon = pillarIcons[index];
            const pillarLinks = ['/rescue', '/adopt', '/about', '/support'];
            return (
              <Link
                href={routeFor(locale, pillarLinks[index])}
                className="pillar"
                key={item.title}
                aria-label={`${item.title}: ${item.description}`}
              >
                <div className="pillar-illustration" aria-hidden="true">
                  <Icon className="pillar-svg" width={46} height={46} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Meet the Cats */}
      <section className="cats-home-section">
        <div className="container">
          <SectionIntro
            eyebrow={t.home.catsEyebrow}
            title={t.home.catsTitle}
            action={{
              href: routeFor(locale, '/cats'),
              label: locale === 'vi' ? 'Xem tất cả các bé mèo' : 'View all cats',
            }}
          />
          <div className="cat-grid">
            {cats.map((cat) => (
              <CatCard key={cat.slug} cat={cat} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Story */}
      <section className="story-section">
        <div className="container story-grid">
          <div className="story-photo-wrapper">
            <div className="story-photo">
              <Image
                src="/images/story.webp"
                alt={locale === 'vi' ? 'Ảnh minh họa hai chú mèo bên cây xanh' : 'Illustrative photo of two cats in greenery'}
                fill
                sizes="(max-width: 750px) 94vw, 45vw"
                className="cover-image"
              />
            </div>
            {/* Organic leaf decorations */}
            <div className="story-leaf-deco" aria-hidden="true">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M10 50 Q30 40 40 10 Q20 20 10 50 Z" />
                <path d="M20 40 Q35 30 40 10" />
                <path d="M15 45 Q20 35 25 38" />
                <path d="M25 35 Q30 25 35 28" />
              </svg>
            </div>
            {/* Editorial callout badge anchored to photo */}
            <div className="story-side-badge" aria-hidden="true">
              <div className="badge-paws">
                <PawPrint size={15} fill="currentColor" />
                <PawPrint size={19} fill="currentColor" />
                <PawPrint size={14} fill="currentColor" />
              </div>
              <p>{locale === 'vi' ? 'Những hành động nhỏ tạo nên thay đổi lớn' : 'Small actions create big change'}</p>
            </div>
          </div>

          <div className="story-copy">
            <p className="eyebrow story-eyebrow">{t.home.storyEyebrow}</p>
            <h2 className="story-heading">{t.home.storyTitle}</h2>
            <p className="story-paragraph">{t.home.storyP1}</p>
            {t.home.storyP2 && <p className="story-paragraph">{t.home.storyP2}</p>}
            <div className="story-action-row">
              <ButtonLink href={routeFor(locale, '/about')} variant="outline" arrow={true}>
                {t.home.storyButton}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>


      {/* 5. Impact Counter Bar */}
      <section className="impact-section">
        <div className="container impact-grid">
          <div className="impact-head">
            <span>{t.home.impactTitle}</span>
            <Heart size={20} fill="currentColor" aria-hidden="true" className="impact-heart" />
          </div>

          {/* 1. PawPrint */}
          <div className="impact-item">
            <div className="impact-icon-wrap icon-green">
              <PawPrint size={30} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="impact-info">
              <h3>{t.home.impact[0].title}</h3>
              <p>{t.home.impact[0].description}</p>
            </div>
          </div>

          {/* 2. House */}
          <div className="impact-item">
            <div className="impact-icon-wrap icon-green">
              <House size={30} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="impact-info">
              <h3>{t.home.impact[1].title}</h3>
              <p>{t.home.impact[1].description}</p>
            </div>
          </div>

          {/* 3. Heart */}
          <div className="impact-item">
            <div className="impact-icon-wrap icon-red">
              <Heart size={30} fill="currentColor" strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="impact-info">
              <h3>{t.home.impact[2].title}</h3>
              <p>{t.home.impact[2].description}</p>
            </div>
          </div>

          {/* 4. UsersRound */}
          <div className="impact-item">
            <div className="impact-icon-wrap icon-green">
              <UsersRound size={30} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="impact-info">
              <h3>{t.home.impact[3].title}</h3>
              <p>{t.home.impact[3].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5b. Interactive Motion-Graphics Storyboard Reel (Remotion 5-Layer Architecture) */}
      <RescueStoryReel locale={locale} />

      {/* 6. Action Cards */}
      <section className="action-section">
        <div className="container">
          <div className="action-grid">
            {t.home.actions.map((item, index) => (
              <EditorialReveal key={item.title} delay={index * 0.05} y={14}>
                <Link
                  className="action-card"
                  href={routeFor(locale, actions[index].path)}
                  aria-label={`${item.title}: ${item.cta}`}
                >
                  <div className="action-image">
                    <Image
                      src={actions[index].image}
                      alt={locale === 'vi' ? 'Hình ảnh mèo minh họa' : 'Illustrative cat photo'}
                      fill
                      sizes="(max-width: 600px) 92vw, (max-width: 1040px) 46vw, 24vw"
                      className="cover-image"
                    />
                  </div>
                  <div className="action-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="action-footer">
                      <span className="action-cta-label">{item.cta}</span>
                      <span className="action-circle" aria-hidden="true">
                        <ArrowRight size={16} strokeWidth={2.4} />
                      </span>
                    </div>
                  </div>
                </Link>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Independent 8-petal community wheel — full-width section centered just before footer */}
      <HomeCommunityWheel locale={locale} />
    </>
  );
}
