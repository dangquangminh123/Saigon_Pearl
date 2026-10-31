'use client';

import { useState } from 'react';
import { Share2, Check, Link2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { newsCopy } from '@/data/news-editorial';
import styles from '../news.module.css';

export function ShareArticle({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = newsCopy[locale];

  async function share() {
    try {
      setFailed(false);
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title, url: window.location.href });
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        return;
      }
      setFailed(true);
    } catch (error) {
      // Hủy bỏ Share Sheet không phải lỗi bảo mật.
      if (error instanceof Error && error.name === 'AbortError') return;
      setFailed(true);
    }
  }

  return (
    <div className={styles.shareGroup}>
      <button type="button" onClick={share} className={styles.outlineButton}>
        {copied ? (
          <Check size={17} aria-hidden="true" />
        ) : (
          <Share2 size={17} aria-hidden="true" />
        )}
        <span>{copied ? t.shared : t.share}</span>
      </button>
      <span className={styles.visuallyHidden} role="status" aria-live="polite">
        {failed
          ? locale === 'vi'
            ? 'Không thể chia sẻ trên thiết bị này.'
            : 'Sharing is unavailable on this device.'
          : copied
          ? t.shared
          : ''}
      </span>
      <Link2 size={17} className={styles.shareDecoration} aria-hidden="true" />
    </div>
  );
}

