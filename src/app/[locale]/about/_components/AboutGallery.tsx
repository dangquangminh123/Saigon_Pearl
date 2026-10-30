'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from '../about.module.css';

type GalleryItem = { src: string; alt: string; caption: string };
type Props = {
  items: GalleryItem[];
  labels: { open: string; close: string; previous: string; next: string };
};

export function AboutGallery({ items, labels }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'Tab') {
        const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? []);
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex((value) => value === null ? null : (value - 1 + items.length) % items.length);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex((value) => value === null ? null : (value + 1) % items.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, items.length]);

  const active = activeIndex === null ? null : items[activeIndex];
  return (
    <>
      <div className={styles.galleryGrid}>
        {items.map((item, index) => (
          <button
            type="button"
            key={`${item.src}-${index}`}
            className={styles.galleryTile}
            onClick={() => setActiveIndex(index)}
            aria-label={`${labels.open}: ${item.caption}`}
          >
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 90vw, (max-width: 960px) 46vw, 28vw" className={styles.galleryImage} />
            <span className={styles.galleryShade} aria-hidden="true" />
            <span className={styles.galleryCaption}>{item.caption}</span>
            <span className={styles.galleryExpand}><Expand size={19} aria-hidden="true" /></span>
          </button>
        ))}
      </div>
      {active && activeIndex !== null && (
        <div className={styles.lightboxLayer} role="presentation">
          <div ref={dialogRef} className={styles.lightbox} role="dialog" aria-modal="true" aria-label={active.caption}>
            <button ref={closeRef} type="button" className={`${styles.lightboxControl} ${styles.lightboxClose}`} onClick={() => setActiveIndex(null)} aria-label={labels.close}>
              <X size={22} aria-hidden="true" />
            </button>
            <button type="button" className={`${styles.lightboxControl} ${styles.lightboxPrev}`} onClick={() => setActiveIndex((i) => i === null ? null : (i - 1 + items.length) % items.length)} aria-label={labels.previous}>
              <ChevronLeft size={26} aria-hidden="true" />
            </button>
            <div className={styles.lightboxPhoto}>
              <Image src={active.src} alt={active.alt} fill sizes="90vw" className={styles.lightboxImage} />
            </div>
            <button type="button" className={`${styles.lightboxControl} ${styles.lightboxNext}`} onClick={() => setActiveIndex((i) => i === null ? null : (i + 1) % items.length)} aria-label={labels.next}>
              <ChevronRight size={26} aria-hidden="true" />
            </button>
            <p className={styles.lightboxCaption}>{active.caption} <span>— {activeIndex + 1}/{items.length}</span></p>
          </div>
        </div>
      )}
    </>
  );
}

