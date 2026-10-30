import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
  arrow = false,
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'light' | 'text';
  className?: string;
  arrow?: boolean;
  icon?: ReactNode;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {arrow && <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="btn-arrow" />}
    </Link>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  action,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={`section-intro ${className}`}>
      <div className="section-intro-text">
        <h2 className="section-title">{title}</h2>
        {eyebrow && <p className="section-subtitle">{eyebrow}</p>}
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && (
        <Link className="section-action-btn" href={action.href}>
          <span>{action.label}</span>
          <ArrowRight size={15} strokeWidth={2} aria-hidden="true" className="action-arrow" />
        </Link>
      )}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container page-intro-inner">
        <div className="page-intro-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
        <div className="page-intro-art" aria-hidden="true">
          <span className="art-ring art-ring-one" />
          <span className="art-ring art-ring-two" />
          <Sparkles className="art-stroke" size={52} strokeWidth={1.1} />
        </div>
      </div>
    </section>
  );
}
