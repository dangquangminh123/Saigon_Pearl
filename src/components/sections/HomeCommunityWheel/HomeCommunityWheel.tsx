import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  ClipboardCheck,
  Eye,
  HeartHandshake,
  House,
  PawPrint,
  Receipt,
  ShieldCheck,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { routeFor, type Locale } from '@/lib/i18n';
import { homeWheelCopy, homeWheelSteps, type HomeWheelIcon } from './homeWheel.data';
import { HomeWheelReveal } from './HomeWheelReveal';
import styles from './HomeCommunityWheel.module.css';

const ICONS: Record<HomeWheelIcon, LucideIcon> = {
  eye: Eye,
  clipboard: ClipboardCheck,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
  heart: HeartHandshake,
  receipt: Receipt,
  house: House,
  users: UsersRound,
};

/** All coordinates are proportions of a 1200x1200 design stage. */
const SLICES = [
  { type: 'cardinal', x: 600, y: 315, rotation: 0,   tx: 600, ty: 211, colors: ['#78978D', '#54786B'] },
  { type: 'diagonal', x: 806, y: 380, rotation: 45,  tx: 819, ty: 329, colors: ['#6A837B', '#425F5A'] },
  { type: 'cardinal', x: 870, y: 605, rotation: 90,  tx: 973, ty: 588, colors: ['#A37F70', '#78564D'] },
  { type: 'diagonal', x: 820, y: 830, rotation: 135, tx: 858, ty: 860, colors: ['#A78A76', '#7D5B50'] },
  { type: 'cardinal', x: 600, y: 892, rotation: 180, tx: 600, ty: 968, colors: ['#957E67', '#665446'] },
  { type: 'diagonal', x: 370, y: 830, rotation: 225, tx: 337, ty: 865, colors: ['#998163', '#6B5744'] },
  { type: 'cardinal', x: 315, y: 605, rotation: 270, tx: 237, ty: 591, colors: ['#9BAF89', '#668166'] },
  { type: 'diagonal', x: 380, y: 370, rotation: 315, tx: 337, ty: 334, colors: ['#8C9D76', '#557359'] },
] as const;

const percent = (n: number) => `${(n / 12).toFixed(4)}%`;

export function HomeCommunityWheel({ locale }: { locale: Locale }) {
  const copy = homeWheelCopy[locale];
  return (
    <section className={styles.section} data-home-community-wheel aria-labelledby="community-wheel-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="community-wheel-title">{copy.title}</h2>
          <p className={styles.intro}>{copy.description}</p>
        </header>

        <div className={styles.graphic} role="group" aria-label={copy.imageLabel}>
          <div className={styles.stage}>
            <div className={styles.shapes} aria-hidden="true">
              {SLICES.map((slice, i) => {
                const shapeStyle = {
                  '--cx': percent(slice.x), '--cy': percent(slice.y),
                  '--angle': `${slice.rotation}deg`,
                  '--tone-a': slice.colors[0], '--tone-b': slice.colors[1],
                } as CSSProperties;
                return (
                  <span
                    key={homeWheelSteps[i].number}
                    className={`${styles.slice} ${slice.type === 'cardinal' ? styles.cardinal : styles.diagonal}`}
                    style={shapeStyle}
                    data-petal={homeWheelSteps[i].number}
                  >
                    <span className={styles.sliceMask} />
                  </span>
                );
              })}
            </div>

            {/* Eight petal-shaped cream openings match the reference's negative space. */}
            <svg className={styles.lenses} viewBox="0 0 1200 1200" aria-hidden="true" focusable="false">
              {homeWheelSteps.map((step, index) => {
                const angle = -22.5 + index * 45;
                return (
                  <g key={step.number} transform={`translate(600 600) rotate(${angle})`}>
                    <path d="M0 -138 C-84 -217 -106 -308 0 -354 C106 -308 84 -217 0 -138 Z" />
                  </g>
                );
              })}
            </svg>
            <div className={styles.numbers} aria-hidden="true">
              {homeWheelSteps.map((step, index) => {
                const rad = ((-22.5 + index * 45) * Math.PI) / 180;
                const style = {
                  '--nx': percent(600 + Math.sin(rad) * 241),
                  '--ny': percent(600 - Math.cos(rad) * 241),
                } as CSSProperties;
                return <span key={step.number} style={style} className={styles.number}>{step.number}</span>;
              })}
            </div>

            <div className={styles.center}>
              <span className={styles.centerMask} aria-hidden="true" />
              <div className={styles.centerCopy}>
                <PawPrint size={25} strokeWidth={2} className={styles.centerPaw} aria-hidden="true" />
                <strong>Saigon Pearl <span>Purrs</span></strong>
                <small>{copy.centerTagline}</small>
              </div>
            </div>

            <div className={styles.stories}>
              {homeWheelSteps.map((step, index) => {
                const Icon = ICONS[step.icon];
                const s = SLICES[index];
                const style = { '--tx': percent(s.tx), '--ty': percent(s.ty) } as CSSProperties;
                return (
                  <Link
                    key={step.number}
                    href={routeFor(locale, step.href)}
                    className={styles.story}
                    style={style}
                    data-petal={step.number}
                  >
                    <Icon size={30} strokeWidth={1.9} className={styles.storyIcon} aria-hidden="true" />
                    <h3>{step.title[locale]}</h3>
                    <p>{step.description[locale]}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Readable companion list, shown only when the radial text is too small. */}
        <div className={styles.mobileDetails} aria-label={copy.imageLabel}>
          {homeWheelSteps.map(step => {
            const Icon = ICONS[step.icon];
            return (
              <Link key={step.number} href={routeFor(locale, step.href)} className={styles.mobileDetail}>
                <span className={styles.mobileNo}>{step.number}</span>
                <span className={styles.mobileIcon}><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
                <span className={styles.mobileText}>
                  <strong>{step.title[locale]}</strong>
                  <span>{step.description[locale]}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <HomeWheelReveal />
    </section>
  );
}
