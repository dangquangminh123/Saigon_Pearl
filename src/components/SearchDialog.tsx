'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Cat, FileText, Search, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { Locale } from '@/lib/i18n';
import { routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { navigation } from '@/lib/nav';
import { articles } from '@/data/articles';
import { cats } from '@/data/cats';

function normalize(value: string): string {
  return value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

export function SearchDialog({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const t = getDictionary(locale);
  const shouldReduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = oldOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const results = [
    ...navigation.map(({ key, path }) => ({ title: t.nav[key], url: routeFor(locale, path), type: 'page' as const })),
    { title: t.nav.transparency, url: routeFor(locale, '/transparency'), type: 'page' as const },
    ...cats.map((cat) => ({ title: `${cat.name} — ${cat.description[locale]}`, url: routeFor(locale, `/cats/${cat.slug}`), type: 'cat' as const })),
    ...articles.map((article) => ({ title: article.title[locale], url: routeFor(locale, `/news/${article.slug}`), type: 'article' as const })),
  ].filter((item) => term.trim().length > 0 && normalize(item.title).includes(normalize(term))).slice(0, 8);

  return (
    <motion.div
      className="search-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={panelRef}
        className="search-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t.search.title}
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={
          shouldReduce
            ? { opacity: 0 }
            : { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }
        }
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="search-panel-top"><h2>{t.search.title}</h2><button type="button" className="icon-button" aria-label={t.nav.close} onClick={onClose}><X size={22} /></button></div>
        <label className="search-field"><Search size={20} aria-hidden="true" /><input ref={inputRef} value={term} onChange={(e) => setTerm(e.target.value)} type="search" placeholder={t.search.placeholder} aria-label={t.search.placeholder} /></label>
        <div className="search-results" aria-live="polite">
          {results.map((result) => <Link href={result.url} key={result.url} onClick={onClose} className="search-result">
            {result.type === 'cat' ? <Cat size={20} aria-hidden="true" /> : <FileText size={20} aria-hidden="true" />}
            <span>{result.title}</span><ArrowUpRight size={16} aria-hidden="true" />
          </Link>)}
          {term.trim() && results.length === 0 && <p className="search-empty">{t.search.empty}</p>}
        </div>
        <p className="search-hint">{t.search.hint}</p>
      </motion.div>
    </motion.div>
  );
}
