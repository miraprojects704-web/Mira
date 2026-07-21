import type { PropsWithChildren } from 'react';

import { SurfaceCard } from './SurfaceCard';

interface CompassCardProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  className?: string;
}

export function CompassCard({ title, subtitle, children, className = '' }: CompassCardProps) {
  return (
    <SurfaceCard className={`space-y-4 ${className}`}>
      <div>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">{subtitle}</p>
        <h3 className="mt-2 text-xl font-semibold text-[#fff9ed]">{title}</h3>
      </div>
      <div className="text-sm leading-7 text-[#f6e6c8]">{children}</div>
    </SurfaceCard>
  );
}
