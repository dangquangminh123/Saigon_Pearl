'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Multi-property entrance reveal following LottieFiles Motion Design Skill & Remotion Skill Rule #2:
 * Combines opacity + translateY + subtle scale (never a flat opacity-only fade).
 * Respects OS prefers-reduced-motion and @media (scripting: none) fallback.
 */
export function EditorialReveal({
  children,
  className,
  delay = 0,
  y = 18,
}: RevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-motion-reveal=""
      className={className}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -24px 0px' }}
      transition={{
        duration: 0.46,
        delay: Math.min(delay, 0.36),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked reading progress indicator for editorial articles (/news/[slug]).
 * Uses GPU-accelerated scaleX with spring physics.
 */
export function ReadingProgressBar({ label }: { label: string }) {
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="reading-progress-track" aria-hidden="true" title={label}>
      <motion.div
        className="reading-progress-bar"
        style={{ scaleX: shouldReduce ? scrollYProgress : scaleX }}
      />
    </div>
  );
}
