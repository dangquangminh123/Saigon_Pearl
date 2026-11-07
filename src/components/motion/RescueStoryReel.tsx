'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Film, Sparkles } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { routeFor } from '@/lib/i18n';
import { STORY_SCENES } from './rescueStoryReel.data';
import styles from './RescueStoryReel.module.css';

const SCENE_DURATION_MS = 5200;

export function RescueStoryReel({ locale }: { locale: Locale }) {
  const shouldReduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Silent background auto-advance timer (no visible loading/progress bars)
  useEffect(() => {
    if (shouldReduce || isHovered) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % STORY_SCENES.length);
    }, SCENE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isHovered, shouldReduce]);

  const scene = STORY_SCENES[activeIndex] ?? STORY_SCENES[0];
  const words = scene.title[locale].split(' ');
  const isVi = locale === 'vi';

  return (
    <section
      className={styles.section}
      aria-label={isVi ? 'Thước phim chuyển động: Hành trình cứu hộ & nhận nuôi' : 'Motion Storyboard: Rescue & Adoption Journey'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container">
        <div className={styles.headerRow}>
          <div>
            <p className="eyebrow">
              <Film size={13} aria-hidden="true" className={styles.eyebrowIcon} />
              {isVi ? 'THƯỚC PHIM CHUYỂN ĐỘNG • STORY REEL' : 'INTERACTIVE MOTION REEL • STORYBOARD'}
            </p>
            <h2 className="section-title">
              {isVi ? 'Hành trình từ góc phố ven sông đến mái ấm bình yên' : 'From riverside corners to a calm forever home'}
            </h2>
          </div>

          <div className={styles.controlsBar}>
            <div className={styles.arrowGroup}>
              <button
                type="button"
                className={styles.iconControl}
                onClick={() => setActiveIndex((i) => (i - 1 + STORY_SCENES.length) % STORY_SCENES.length)}
                aria-label={isVi ? 'Cảnh trước' : 'Previous scene'}
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.iconControl}
                onClick={() => setActiveIndex((i) => (i + 1) % STORY_SCENES.length)}
                aria-label={isVi ? 'Cảnh tiếp theo' : 'Next scene'}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.stage}>
          <div className={styles.layerMesh} aria-hidden="true">
            <motion.div
              className={styles.meshOrbPrimary}
              animate={shouldReduce ? undefined : { x: [0, 32, -16, 0], y: [0, -24, 18, 0], scale: [1, 1.08, 0.96, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className={styles.meshOrbAccent}
              animate={shouldReduce ? undefined : { x: [0, -28, 20, 0], y: [0, 22, -18, 0], scale: [1, 0.94, 1.06, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`photo-${scene.id}`}
              className={styles.layerAsset}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
              animate={
                shouldReduce
                  ? { opacity: 1 }
                  : { opacity: 1, scale: [1.06, 1.01], x: [8, -8], y: [4, -4], filter: 'blur(0px)' }
              }
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
              transition={{
                opacity: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                filter: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 5.2, ease: [0.22, 1, 0.36, 1] },
                x: { duration: 5.2, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 5.2, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <Image src={scene.image} alt={scene.imageAlt[locale]} fill sizes="(max-width: 900px) 94vw, 1180px" className={styles.assetImage} />
            </motion.div>
          </AnimatePresence>

          <div className={styles.layerGrade} aria-hidden="true" />
          <div className={styles.layerGrainVignette} aria-hidden="true" />

          <div className={styles.layerContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${scene.id}`}
                className={styles.copyBlock}
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.sceneTag}>
                  <Sparkles size={13} aria-hidden="true" />
                  {scene.tag[locale]}
                </span>

                <h3 className={styles.wordRevealTitle}>
                  {words.map((word, idx) => (
                    <motion.span
                      key={`${scene.id}-w-${idx}`}
                      className={styles.wordToken}
                      initial={shouldReduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: shouldReduce ? 0 : idx * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h3>

                <p className={styles.sceneCaption}>{scene.caption[locale]}</p>

                <div className={styles.sceneActions}>
                  <Link href={routeFor(locale, scene.ctaPath)} className={styles.sceneCta}>
                    <span>{scene.ctaLabel[locale]}</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <span className={styles.frameCounter}>
                    {scene.step} / 0{STORY_SCENES.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.aside
                key={`metric-${scene.id}`}
                className={styles.metricCard}
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.34, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.metricNumber}>{scene.metricValue}</span>
                <span className={styles.metricLabel}>{scene.metricLabel[locale]}</span>
              </motion.aside>
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.scrubberGrid} role="tablist" aria-label={isVi ? 'Chọn cảnh câu chuyện' : 'Select story scene'}>
          {STORY_SCENES.map((item, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`${styles.scrubberTab} ${active ? styles.scrubberTabActive : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                {active && (
                  <motion.span
                    layoutId="storyReelActivePill"
                    className={styles.scrubberActiveBg}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <div className={styles.scrubberTop}>
                  <span className={styles.scrubberStep}>{item.step}</span>
                  <span className={styles.scrubberTitle}>{item.tag[locale].split('•')[1]?.trim() ?? item.tag[locale]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
