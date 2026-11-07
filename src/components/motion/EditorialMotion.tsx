'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Multi-property entrance reveal combining opacity + translateY + subtle scale.
 * Respects OS prefers-reduced-motion and @media (scripting: none) fallback.
 */
export function EditorialReveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-motion-reveal=""
      className={className}
      initial={{ opacity: 0, y, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -32px 0px' }}
      transition={{
        duration: 0.52,
        delay: Math.min(delay, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Gentle ambient floating wrapper for editorial badges and callouts.
 */
export function FloatingBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className} aria-hidden="true">{children}</div>;
  }

  return (
    <motion.div
      data-motion-reveal=""
      className={className}
      aria-hidden="true"
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{ y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.48, delay: 0.22, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.48, delay: 0.22, ease: [0.34, 1.56, 0.64, 1] },
        y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {children}
    </motion.div>
  );
}

