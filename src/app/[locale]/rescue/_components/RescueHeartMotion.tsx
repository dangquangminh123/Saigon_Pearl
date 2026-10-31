'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './RescueHeartDiagram.module.css';

/** Small progressive-enhancement wrapper; content is visible without JS. */
export function RescueHeartMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = node.getBoundingClientRect();
    // Avoid hiding and re-showing the diagram when the browser restores scroll.
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    node.dataset.motion = 'waiting';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.dataset.motion = 'visible';
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px 36px 0px' },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      node.dataset.motion = 'visible';
    };
  }, []);

  return <div ref={rootRef} className={styles.motionFrame}>{children}</div>;
}
