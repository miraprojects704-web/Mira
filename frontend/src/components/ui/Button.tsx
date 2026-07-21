import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export function Button({ children, className = '', ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-500 via-ember-500 to-ember-400 px-5 py-3 text-sm font-semibold text-ink-950 shadow-glow transition hover:opacity-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
