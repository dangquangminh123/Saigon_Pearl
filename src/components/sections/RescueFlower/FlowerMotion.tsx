'use client';

import { useEffect } from 'react';

/** Progressive enhancement only: all petals remain visible without JavaScript. */
export function FlowerMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-rescue-flower]');
    if (!root || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        root.dataset.flowerEntered = 'true';
        observer.disconnect();
      },
      { threshold: 0.05 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  return null;
}

