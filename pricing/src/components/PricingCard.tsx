import { Check } from 'lucide-react';

import type { ReactNode } from 'react';

type PricingCardProps = {
  title: string;
  priceLabel: string;
  description: string;
  features: string[];
  ctaLabel: string;
  accent?: boolean;
  featured?: boolean;
  badge?: string;
  extraContent?: ReactNode;
  className?: string;
};

export function PricingCard({
  title,
  priceLabel,
  description,
  features,
  ctaLabel,
  accent = false,
  featured = false,
  badge,
  extraContent,
  className = '',
}: PricingCardProps) {
  return (
    <article
      className={`relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 text-left shadow-soft transition duration-500 ease-out hover:-translate-y-1 hover:shadow-glow md:p-8 ${
        featured ? 'border-transparent bg-gradient-to-br from-violet-700 via-indigo-900 to-slate-950 text-white shadow-glow' : 'bg-white/5'
      } ${className}`}
    >
      {badge ? (
        <span className="mb-4 inline-flex rounded-full border border-violet-200/20 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-violet-100">
          {badge}
        </span>
      ) : null}

      <div className="space-y-4">
        <div className="space-y-2">
          <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${featured ? 'text-violet-200' : 'text-slate-300'}`}>
            {title}
          </p>
          <h3 className={`text-4xl font-semibold leading-tight ${featured ? 'text-white' : 'text-slate-100'}`}>
            {priceLabel}
          </h3>
          <p className={`max-w-xs text-sm ${featured ? 'text-slate-200/90' : 'text-slate-400'}`}>
            {description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3 text-sm text-slate-200">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-violet-400" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {extraContent}

      <div className="mt-6 flex w-full items-center justify-between gap-4 md:mt-8">
        <button
          type="button"
          className={`group inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300 ${
            featured
              ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 hover:shadow-violet-500/35'
              : accent
              ? 'border border-violet-400/20 bg-violet-600/10 text-violet-100 shadow-sm shadow-violet-500/10 hover:bg-violet-500/10'
              : 'border border-slate-700/80 bg-slate-950/95 text-slate-100 hover:border-violet-400/40 hover:bg-slate-900'
          }`}
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
}
