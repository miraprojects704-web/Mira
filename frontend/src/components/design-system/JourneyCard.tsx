import type { PropsWithChildren } from 'react';

import { SurfaceCard } from './SurfaceCard';

interface JourneyCardProps extends PropsWithChildren {
  title: string;
  meta: string;
  className?: string;
}

export function JourneyCard({ title, meta, children, className = '' }: JourneyCardProps) {
  return (
    <SurfaceCard className={`space-y-3 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">{meta}</p>
          <h3 className="mt-2 text-lg font-semibold text-[#fff9ed]">{title}</h3>
        </div>
      </div>
      <div className="text-sm leading-7 text-[#f6e6c8]">{children}</div>
    </SurfaceCard>
  );
}
