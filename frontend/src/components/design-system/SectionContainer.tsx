import type { PropsWithChildren } from 'react';

interface SectionContainerProps extends PropsWithChildren {
  title: string;
  eyebrow?: string;
  className?: string;
}

export function SectionContainer({ title, eyebrow, children, className = '' }: SectionContainerProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          {eyebrow ? <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">{eyebrow}</p> : null}
          <h2 className="mt-1 text-2xl font-semibold text-[#fff9ed]">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}
