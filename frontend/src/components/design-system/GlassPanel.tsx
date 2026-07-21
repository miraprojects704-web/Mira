import type { PropsWithChildren } from 'react';

interface GlassPanelProps extends PropsWithChildren {
  className?: string;
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div className={`rounded-[1.5rem] border border-white/20 bg-white/10 p-5 shadow-[0_20px_70px_rgba(255,155,69,0.12)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}
