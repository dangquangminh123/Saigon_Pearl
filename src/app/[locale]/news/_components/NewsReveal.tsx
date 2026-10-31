'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from '../news.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

export function NewsReveal({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    // Nội dung hiện sẵn khi chưa chạy JS; animation chỉ là enhancement.
    node.classList.add(styles.revealPending);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.remove(styles.revealPending);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      node.classList.remove(styles.revealPending);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.revealBase} ${className}`}>
      {children}
    </div>
  );
}

