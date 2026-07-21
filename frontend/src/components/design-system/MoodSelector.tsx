import { useState } from 'react';

const moods = [
  { value: 'steady', label: 'Steady' },
  { value: 'bright', label: 'Bright' },
  { value: 'reflective', label: 'Reflective' },
];

export function MoodSelector() {
  const [selected, setSelected] = useState('bright');

  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => (
        <button
          key={mood.value}
          type="button"
          onClick={() => setSelected(mood.value)}
          className={`rounded-full border px-3 py-2 text-sm transition ${selected === mood.value ? 'border-[#ffe7b5] bg-white/15 text-[#fff9ed]' : 'border-white/10 bg-white/5 text-[#f6e6c8]'}`}
        >
          {mood.label}
        </button>
      ))}
    </div>
  );
}
