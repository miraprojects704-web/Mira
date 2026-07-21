import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050814',
          900: '#07111f',
          800: '#0c1b31',
          700: '#12304d',
        },
        gold: {
          400: '#f5c96b',
          500: '#e8b84f',
        },
        mist: {
          50: '#f8fbff',
          100: '#eef4fb',
          200: '#d9e6f4',
          300: '#b8cadf',
        },
      },
      boxShadow: {
        glow: '0 20px 60px rgba(9, 16, 30, 0.35)',
      },
      backgroundImage: {
        'mira-radial': 'radial-gradient(circle at top, rgba(232, 184, 79, 0.15), transparent 40%), linear-gradient(180deg, #07111f 0%, #081726 100%)',
      },
      fontFamily: {
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
