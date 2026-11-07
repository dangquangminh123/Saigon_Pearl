'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';

type Props = {
  children: ReactNode;
  nonce?: string;
};

/**
 * Global Motion configuration aligned with:
 * - LottieFiles Motion Design Skill: Premium/Calm default signature curve [0.22, 1, 0.36, 1]
 * - motiondivision/motion: reducedMotion="user" + per-request CSP nonce forwarding
 */
export function MotionProvider({ children, nonce }: Props) {
  return (
    <MotionConfig
      reducedMotion="user"
      nonce={nonce}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionConfig>
  );
}
