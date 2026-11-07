'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Locale } from '@/lib/i18n';

const STORAGE_KEY = 'spp-favorite-cats';

function readFavorites(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

export function FavoriteButton({ slug, locale }: { slug: string; locale: Locale }) {
  const [saved, setSaved] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const sync = () => setSaved(readFavorites().includes(slug));
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('spp-favorites-updated', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('spp-favorites-updated', sync);
    };
  }, [slug]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const entries = new Set(readFavorites());
    const nextSaved = !entries.has(slug);
    if (nextSaved) {
      entries.add(slug);
      setBurstKey((k) => k + 1);
    } else {
      entries.delete(slug);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...entries]));
    } catch {
      /* privacy mode fallback */
    }
    setSaved(nextSaved);
    window.dispatchEvent(new Event('spp-favorites-updated'));
  }

  return (
    <motion.button
      type="button"
      className={`favorite-button ${saved ? 'is-saved' : ''}`}
      onClick={toggle}
      whileTap={shouldReduce ? undefined : { scale: 0.86 }}
      aria-pressed={saved}
      aria-label={
        locale === 'vi'
          ? `${saved ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'} ${slug}`
          : `${saved ? 'Remove favorite' : 'Add to favorites'} ${slug}`
      }
      title={locale === 'vi' ? (saved ? 'Đã yêu thích' : 'Thêm vào yêu thích') : (saved ? 'Saved' : 'Add to favorites')}
    >
      <motion.span
        key={saved ? `saved-${burstKey}` : 'unsaved'}
        className="favorite-icon-stage"
        initial={false}
        animate={
          saved && !shouldReduce && burstKey > 0
            ? { scale: [1, 1.32, 0.94, 1], rotate: [0, -10, 8, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.34, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Heart size={18} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.8} />
      </motion.span>
      <AnimatePresence>
        {saved && !shouldReduce && burstKey > 0 && (
          <motion.span
            key={`ring-${burstKey}`}
            className="favorite-burst-ring"
            aria-hidden="true"
            initial={{ scale: 0.5, opacity: 0.75 }}
            animate={{ scale: 1.75, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

