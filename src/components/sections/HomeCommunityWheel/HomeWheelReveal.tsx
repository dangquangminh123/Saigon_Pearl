'use client';

import { useEffect } from 'react';

/** Tiny progressive enhancement: content stays visible if JS/observer is disabled. */
export function HomeWheelReveal() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-home-community-wheel]');
    if (!el) return;
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.dataset.wheelRevealed = 'true';
        obs.disconnect();
      }
    }, { threshold: 0.14 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return null;
}
