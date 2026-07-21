interface ProgressRingProps {
  value: number;
  label: string;
  sublabel?: string;
}

export function ProgressRing({ value, label, sublabel }: ProgressRingProps) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center gap-4 rounded-[1.25rem] border border-white/15 bg-white/10 p-4">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-24 w-24 -rotate-90">
          <circle cx="60" cy="60" r={radius} stroke="rgba(255,255,255,0.14)" strokeWidth="10" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#ringGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffcf74" />
              <stop offset="100%" stopColor="#ff8a5b" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <div className="text-2xl font-semibold text-[#fff9ed]">{value}%</div>
        </div>
      </div>
      <div>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">{label}</p>
        {sublabel ? <p className="mt-2 text-sm leading-7 text-[#f6e6c8]">{sublabel}</p> : null}
      </div>
    </div>
  );
}
