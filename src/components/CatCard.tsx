import Link from 'next/link';
import Image from 'next/image';
import type { Cat } from '@/data/cats';
import type { Locale } from '@/lib/i18n';
import { routeFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { FavoriteButton } from './FavoriteButton';

export function catAge(months: number, locale: Locale): string {
  if (months >= 12 && months % 12 === 0) {
    return locale === 'vi' ? `${months / 12} tuổi` : `${months / 12} ${months === 12 ? 'year' : 'years'}`;
  }
  return locale === 'vi' ? `${months} tháng tuổi` : `${months} ${months === 1 ? 'month' : 'months'} old`;
}

export function CatCard({ cat, locale }: { cat: Cat; locale: Locale }) {
  const t = getDictionary(locale);
  const href = routeFor(locale, `/cats/${cat.slug}`);

  return (
    <article className="cat-card">
      <Link href={href} className="cat-card-image-link" tabIndex={-1} aria-hidden="true">
        <div className="cat-image-wrap">
          <Image
            src={cat.image}
            alt={`${cat.name} — ${locale === 'vi' ? 'ảnh mèo minh họa' : 'illustrative cat photo'}`}
            fill
            sizes="(max-width: 600px) 90vw, (max-width: 1000px) 48vw, 23vw"
            className="cover-image"
          />
        </div>
      </Link>
      <div className="cat-card-body">
        <div className="cat-name-row">
          <Link href={href} className="cat-name-link">
            <h3>{cat.name}</h3>
          </Link>
          <FavoriteButton slug={cat.slug} locale={locale} />
        </div>
        <p className="cat-facts">
          {catAge(cat.ageMonths, locale)} &bull; {cat.gender === 'female' ? t.cats.female : t.cats.male}
        </p>
        <p className="cat-short-desc">{cat.description[locale]}</p>
      </div>
    </article>
  );
}
