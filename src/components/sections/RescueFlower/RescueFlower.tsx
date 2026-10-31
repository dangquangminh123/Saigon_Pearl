import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  ClipboardList,
  HandHeart,
  Heart,
  House,
  LifeBuoy,
  PawPrint,
  Stethoscope,
  UsersRound,
} from 'lucide-react';
import { routeFor, type Locale } from '@/lib/i18n';
import { rescueFlowerCopy, rescueFlowerSteps, type FlowerStep } from './rescueFlower.data';
import { FlowerMotion } from './FlowerMotion';
import styles from './RescueFlower.module.css';

const ICONS: Record<FlowerStep['icon'], typeof Heart> = {
  'hand-heart': HandHeart,
  'life-buoy': LifeBuoy,
  'stethoscope': Stethoscope,
  'house': House,
  'paw-print': PawPrint,
  'clipboard-list': ClipboardList,
  'users-round': UsersRound,
  'heart': Heart,
};

export function RescueFlower({ locale }: { locale: Locale }) {
  const copy = rescueFlowerCopy[locale];
  return (
    <section className={styles.section} aria-labelledby="rescue-flower-title" data-rescue-flower>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="rescue-flower-title">{copy.title}</h2>
          <p className={styles.intro}>{copy.intro}</p>
        </header>

        <div className={styles.flower} role="group" aria-label={copy.ariaLabel}>
          {/* The stage holds the original radial geometry at desktop widths.
              Under 992px CSS changes the layout to a readable 2/1-column petal grid. */}
          <div className={styles.stage}>
            <div className={styles.center} aria-label="Saigon Pearl Purrs">
              <span className={styles.centerShadow} aria-hidden="true" />
              <span className={styles.centerFill} aria-hidden="true" />
              <span className={styles.centerRing} aria-hidden="true" />
              <span className={styles.centerContent}>
                <PawPrint className={styles.centerPaw} size={25} strokeWidth={1.8} aria-hidden="true" />
                <strong className={styles.centerName}>Saigon Pearl <span>Purrs</span></strong>
                <span className={styles.centerShort}>{copy.centerLine}</span>
                <span className={styles.centerTagline}>{copy.centerSubtitle}</span>
              </span>
            </div>

            <div className={styles.petals}>
              {rescueFlowerSteps.map((item, index) => {
                const Icon = ICONS[item.icon];
                const angle = index * 45;
                const cssVars = {
                  '--petal-angle': `${angle}deg`,
                  '--petal-counter': `${-angle}deg`,
                  '--petal-delay': `${index * 72}ms`,
                } as CSSProperties;
                return (
                  <div
                    className={styles.petalOrbit}
                    data-petal={item.number}
                    style={cssVars}
                    key={item.id}
                  >
                    {/* Stroke, fill and sheen are all clipped by the ORIGINAL SVG silhouette. */}
                    <div className={styles.petalShell} aria-hidden="true">
                      <span className={styles.petalStroke} />
                      <span className={styles.petalFill} />
                      <span className={styles.petalSheen} />
                    </div>
                    {/* Icon and text are kept OUTSIDE the SVG mask to prevent clipping. */}
                    <div className={styles.iconAnchor} aria-hidden="true">
                      <span className={styles.iconCircle}><Icon size={29} strokeWidth={2} /></span>
                    </div>
                    <div className={styles.textAnchor}>
                      <Link
                        className={styles.textLink}
                        href={routeFor(locale, item.href)}
                        aria-label={`${copy.actionLabel} ${item.title[locale]}`}
                      >
                        <h3>{item.title[locale]}</h3>
                        <p>{item.description[locale]}</p>
                      </Link>
                    </div>
                    <div className={styles.badgeAnchor} aria-hidden="true">
                      <span className={styles.badgeShadow} />
                      <span className={styles.badgeShape} />
                      <span className={styles.badgeShine} />
                      <span className={styles.badgeText}>
                        <small>{copy.stepLabel}</small>
                        <strong>{item.number}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <FlowerMotion />
    </section>
  );
}
