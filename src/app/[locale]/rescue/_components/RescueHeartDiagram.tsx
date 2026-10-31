import { ClipboardCheck, HeartHandshake, House, ShieldCheck, Stethoscope } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Locale } from '@/lib/i18n';
import {
  rescueHeartCopy,
  rescueHeartSteps,
  type RescueHeartIcon,
} from '@/data/rescue-heart';
import { RescueHeartMotion } from './RescueHeartMotion';
import styles from './RescueHeartDiagram.module.css';

const ICONS: Record<RescueHeartIcon, typeof ClipboardCheck> = {
  clipboard: ClipboardCheck,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
  house: House,
};

/**
 * A SINGLE, centered, full-width standalone infographic section.
 * Use only at the very END of /[locale]/rescue, after all existing sections.
 * The four quadrants and heart are cut by the five ORIGINAL supplied SVG paths.
 */
export function RescueHeartDiagram({ locale }: { locale: Locale }) {
  const copy = rescueHeartCopy[locale];

  return (
    <section className={styles.section} aria-labelledby="rescue-heart-heading" data-rescue-heart>
      <div className={styles.inner}>
        <h2 id="rescue-heart-heading" className={styles.srOnly}>
          {copy.heading}
        </h2>

        <RescueHeartMotion>
          <div className={styles.diagram} role="group" aria-label={copy.diagramLabel}>
            {rescueHeartSteps.map((step, index) => {
              const Icon = ICONS[step.icon];
              return (
                <article
                  key={step.id}
                  className={`${styles.quadrant} ${styles[step.position]}`}
                  style={{ '--step-index': index } as CSSProperties}
                >
                  <div className={styles.shapeStack} aria-hidden="true">
                    <span className={styles.shapeEdge} />
                    <span className={styles.shapeFill} />
                    <span className={styles.shapeHighlight} />
                  </div>
                  <div className={styles.quadrantContent}>
                    <Icon className={styles.quadrantIcon} strokeWidth={1.9} aria-hidden="true" />
                    <h3>{step.title[locale]}</h3>
                    <p>{step.description[locale]}</p>
                  </div>
                </article>
              );
            })}

            <div className={styles.centerHeart} aria-label={copy.center}>
              <span className={`${styles.heartLayer} ${styles.heartBacking}`} aria-hidden="true" />
              <span className={`${styles.heartLayer} ${styles.heartOuter}`} aria-hidden="true" />
              <span className={`${styles.heartLayer} ${styles.heartRingOne}`} aria-hidden="true" />
              <span className={`${styles.heartLayer} ${styles.heartRingTwo}`} aria-hidden="true" />
              <span className={`${styles.heartLayer} ${styles.heartRingThree}`} aria-hidden="true" />
              <span className={`${styles.heartLayer} ${styles.heartCore}`} aria-hidden="true" />
              <span className={styles.heartCopy}>
                <HeartHandshake className={styles.heartIcon} size={18} strokeWidth={1.6} aria-hidden="true" />
                <strong>{copy.center}</strong>
                <small>{copy.centerSmall}</small>
              </span>
            </div>
          </div>
        </RescueHeartMotion>

        {/* The same copy is shown in readable cards only when the heart is small. */}
        <div className={styles.mobileDetails} aria-label={copy.mobileMore}>
          {rescueHeartSteps.map((step) => {
            const Icon = ICONS[step.icon];
            return (
              <div key={step.id} className={styles.detailRow}>
                <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                <div>
                  <h3>{step.title[locale]}</h3>
                  <p>{step.description[locale]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
