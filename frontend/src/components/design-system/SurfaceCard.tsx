import type { CSSProperties, PropsWithChildren } from 'react';

import { gradients } from './GradientSystem';

interface SurfaceCardProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
}

export function SurfaceCard({ children, className = '', style }: SurfaceCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 p-6 shadow-[0_24px_90px_rgba(255,155,69,0.14)] backdrop-blur-[24px] backdrop-saturate-150 ${className}`}
      style={style}
    >
      <div className="absolute inset-0" style={{ backgroundImage: gradients.dawnPanel }} />
      <div className="absolute inset-x-0 bottom-0 h-24" style={{ backgroundImage: gradients.softWash }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
