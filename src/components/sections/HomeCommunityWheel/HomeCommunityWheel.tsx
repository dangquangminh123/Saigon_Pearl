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

/**
 * THREE original owner-supplied SVGs, correctly mapped:
 *  shape 3 -> wheel-outer-petal.svg: eight IDENTICAL colored petals (45° apart)
 *  shape 2 -> wheel-inner-lens.svg: eight REAL ivory lens leaves (four mirror pairs)
 *  shape 1 -> wheel-center-diamond.svg: the center diamond.
 * All layers share the same 1200x1200 coordinate system and origin.
 */
const PETAL_COLORS = [
  ['#78978D','#54786B'], ['#6A837B','#425F5A'],
  ['#A37F70','#78564D'], ['#A78A76','#7D5B50'],
  ['#957E67','#665446'], ['#998163','#6B5744'],
  ['#9BAF89','#668166'], ['#8C9D76','#557359'],
] as const;
const PAIR_ROTATIONS = [0,90,180,270] as const;
function rotatePoint(x:number,y:number,degrees:number) {
  const a=degrees*Math.PI/180,dx=x-600,dy=y-600;
  return {x:600+dx*Math.cos(a)-dy*Math.sin(a),
          y:600+dx*Math.sin(a)+dy*Math.cos(a)};
}
const NUMBER_CENTERS=PAIR_ROTATIONS.flatMap(angle => [
  rotatePoint(520,420,angle),rotatePoint(680,420,angle)
]);
const percent=(n:number) => `${(n/12).toFixed(5)}%`;

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
            {/* Original shape 3: all EIGHT colored petals share one mask and rotate 45° around the SAME CENTER. */}
            <div className={styles.shapes} aria-hidden="true">
              {homeWheelSteps.map((step,index) => (
                <span
                  key={step.number}
                  className={styles.slice}
                  data-petal={step.number}
                  style={{
                    '--angle': `${index*45}deg`,
                    '--tone-a': PETAL_COLORS[index][0],
                    '--tone-b': PETAL_COLORS[index][1],
                  } as CSSProperties}
                >
                  <span className={styles.sliceMask} />
                </span>
              ))}
            </div>

            {/* Original shape 2: ivory number leaves, mirrored in four perfectly symmetric pairs. */}
            <div className={styles.lenses} aria-hidden="true">
              {PAIR_ROTATIONS.map((angle) => (
                <span
                  className={styles.lensOrbit}
                  key={angle}
                  style={{'--angle': `${angle}deg`} as CSSProperties}
                >
                  <span className={`${styles.innerLeaf} ${styles.innerLeafLeft}`} />
                  <span className={`${styles.innerLeaf} ${styles.innerLeafRight}`} />
                </span>
              ))}
            </div>
            <div className={styles.numbers} aria-hidden="true">
              {homeWheelSteps.map((step, index) => {
                const style = {
                  '--nx': percent(NUMBER_CENTERS[index].x),
                  '--ny': percent(NUMBER_CENTERS[index].y),
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
                const angle = index*45*Math.PI/180;
                const x = 600 + Math.sin(angle)*390;
                const y = 600 - Math.cos(angle)*390;
                const style = { '--tx': percent(x), '--ty': percent(y) } as CSSProperties;
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
