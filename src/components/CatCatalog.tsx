'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { cats, type CatStatus } from '@/data/cats';
import { CatCard } from './CatCard';

export function CatCatalog({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [term, setTerm] = useState('');
  const [status, setStatus] = useState<'all' | CatStatus>('all');
  const shown = useMemo(() => cats.filter((cat) =>
    (status === 'all' || cat.status === status) && cat.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase())
  ), [term, status]);

  return <div>
    <div className="catalog-tools"><label className="catalog-search"><Search size={19} aria-hidden="true" /><span className="sr-only">{t.cats.searchLabel}</span><input type="search" value={term} placeholder={t.cats.searchPlaceholder} onChange={(e) => setTerm(e.target.value)} /></label>
      <div className="catalog-filters" aria-label={locale === 'vi' ? 'Lọc trạng thái' : 'Status filter'}><SlidersHorizontal size={17} aria-hidden="true" />
        {([['all', t.cats.filterAll], ['looking', t.cats.filterLooking], ['care', t.cats.filterCare]] as const).map(([value, label]) => <button type="button" key={value} className={status === value ? 'is-active' : ''} onClick={() => setStatus(value)} aria-pressed={status === value}>{label}</button>)}
      </div>
    </div>
    {shown.length > 0 ? <div className="cat-grid">{shown.map((cat) => <CatCard key={cat.slug} cat={cat} locale={locale} />)}</div> : <p className="empty-state">{t.cats.noResults}</p>}
  </div>;
}
