'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Film, Pause, Play, Sparkles } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { routeFor } from '@/lib/i18n';
import { STORY_SCENES } from './rescueStoryReel.data';
import styles from './RescueStoryReel.module.css';

const SCENE_DURATION_MS = 6500;

export function RescueStoryReel({ locale }: { locale: Locale }) {
  const shouldReduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(!shouldReduce);
  }, [shouldReduce]);

  useEffect(() => {
    if (!isPlaying || shouldReduce) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % STORY_SCENES.length);
    }, SCENE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying, shouldReduce]);

  const scene = STORY_SCENES[activeIndex] ?? STORY_SCENES[0];
  const words = scene.title[locale].split(' ');
  const isVi = locale === 'vi';

  return (
    <section
      className={styles.section}
      aria-label={isVi ? 'Thước phim chuyển động: Hành trình cứu hộ & nhận nuôi' : 'Motion Storyboard: Rescue & Adoption Journey'}
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
            <button
              type="button"
              className={styles.playToggle}
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-pressed={isPlaying}
              aria-label={isPlaying ? (isVi ? 'Tạm dừng tự động chuyển cảnh' : 'Pause playback') : (isVi ? 'Phát tự động chuyển cảnh' : 'Play scenes')}
            >
              {isPlaying ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
              <span>{isPlaying ? (isVi ? 'Tạm dừng' : 'Pause') : (isVi ? 'Phát tiếp' : 'Play')}</span>
            </button>
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
            <div className={styles.meshOrbPrimary} />
            <div className={styles.meshOrbAccent} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`photo-${scene.id}`}
              className={styles.layerAsset}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: [1.01, 1.065], x: [0, -10], y: [0, -6] }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 6.4, ease: [0.22, 1, 0.36, 1] },
                x: { duration: 6.4, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 6.4, ease: [0.22, 1, 0.36, 1] },
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
                onClick={() => {
                  setActiveIndex(idx);
                  setIsPlaying(false);
                }}
              >
                <div className={styles.scrubberTop}>
                  <span className={styles.scrubberStep}>{item.step}</span>
                  <span className={styles.scrubberTitle}>{item.tag[locale].split('•')[1]?.trim() ?? item.tag[locale]}</span>
                </div>
                <div className={styles.progressTrack} aria-hidden="true">
                  {active && (
                    <motion.div
                      key={`bar-${item.id}-${isPlaying ? 'play' : 'pause'}`}
                      className={styles.progressFill}
                      initial={{ scaleX: isPlaying && !shouldReduce ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: isPlaying && !shouldReduce ? SCENE_DURATION_MS / 1000 : 0.2, ease: 'linear' }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
