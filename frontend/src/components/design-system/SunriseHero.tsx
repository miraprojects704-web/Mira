import type { ReactNode } from 'react';

import { SurfaceCard } from './SurfaceCard';

interface SunriseHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  illustration?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function SunriseHero({ eyebrow, title, description, illustration, actions, className = '' }: SunriseHeroProps) {
  return (
    <SurfaceCard className={`overflow-hidden px-6 py-8 sm:px-8 lg:px-10 ${className}`}>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-5">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">
            {eyebrow}
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#fff9ed] sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[#f8e6ca]">{description}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {illustration ? <div className="rounded-[1.5rem] border border-white/20 bg-white/10 p-5">{illustration}</div> : null}
      </div>
    </SurfaceCard>
  );
}
