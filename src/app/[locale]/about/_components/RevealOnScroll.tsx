'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from '../about.module.css';

export function RevealOnScroll({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    // Nội dung hiển thị mặc định nếu JS chưa chạy; chỉ tạo hiệu ứng khi JS sẵn sàng.
    node.classList.add(styles.revealPending);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.remove(styles.revealPending);
          observer.disconnect();
        }
      },
      { threshold: 0.09, rootMargin: '0px 0px 20px 0px' }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      node.classList.remove(styles.revealPending);
    };
  }, []);

  return <div ref={ref} className={`${styles.revealWrapper} ${className}`}>{children}</div>;
}
