import type { ButtonHTMLAttributes } from 'react';

interface WarmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function WarmButton({ children, className = '', variant = 'primary', ...props }: WarmButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#ffcf74] via-[#ffb24d] to-[#ff8a5b] text-[#2b1408] shadow-[0_12px_40px_rgba(255,155,69,0.28)]',
    secondary: 'border border-white/20 bg-white/10 text-[#fff7e8] backdrop-blur-xl',
    ghost: 'border border-transparent bg-transparent text-[#ffe7b5] hover:bg-white/10',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:opacity-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
