export function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-8%] top-[-6%] h-72 w-72 rounded-full bg-[#ffb24d]/20 blur-[110px]" />
      <div className="absolute right-[-5%] top-[15%] h-80 w-80 rounded-full bg-[#ff8a5b]/25 blur-[120px]" />
      <div className="absolute bottom-[-6%] left-[20%] h-64 w-64 rounded-full bg-[#ffd7b2]/20 blur-[90px]" />
      <div className="absolute bottom-[12%] right-[10%] h-40 w-40 rounded-full border border-white/10" />
    </div>
  );
}
