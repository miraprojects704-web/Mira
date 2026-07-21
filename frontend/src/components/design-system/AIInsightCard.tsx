import type { PropsWithChildren } from 'react';

import { SurfaceCard } from './SurfaceCard';

interface AIInsightCardProps extends PropsWithChildren {
  title: string;
  label: string;
  className?: string;
}

export function AIInsightCard({ title, label, children, className = '' }: AIInsightCardProps) {
  return (
    <SurfaceCard className={`space-y-3 ${className}`}>
      <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">
        {label}
      </div>
      <h3 className="text-lg font-semibold text-[#fff9ed]">{title}</h3>
      <div className="text-sm leading-7 text-[#f6e6c8]">{children}</div>
    </SurfaceCard>
  );
}
