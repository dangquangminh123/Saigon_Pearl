'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
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
    if (entries.has(slug)) entries.delete(slug);
    else entries.add(slug);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...entries]));
    } catch {
      /* privacy mode fallback */
    }
    setSaved(entries.has(slug));
    window.dispatchEvent(new Event('spp-favorites-updated'));
  }

  return (
    <button
      type="button"
      className={`favorite-button ${saved ? 'is-saved' : ''}`}
      onClick={toggle}
      aria-pressed={saved}
      aria-label={locale === 'vi' ? `${saved ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'} ${slug}` : `${saved ? 'Remove favorite' : 'Add to favorites'} ${slug}`}
      title={locale === 'vi' ? (saved ? 'Đã yêu thích' : 'Thêm vào yêu thích') : (saved ? 'Saved' : 'Add to favorites')}
    >
      <Heart size={18} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.8} />
    </button>
  );
}
