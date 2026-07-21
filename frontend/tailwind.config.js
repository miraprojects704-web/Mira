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
          600: '#f9a826',
        },
        ember: {
          400: '#ff9f42',
          500: '#ffb94d',
          600: '#ffd271',
        },
        mist: {
          50: '#f8fbff',
          100: '#eef4fb',
          200: '#d9e6f4',
          300: '#b8cadf',
        },
      },
      boxShadow: {
        glow: '0 24px 80px rgba(255, 172, 42, 0.18)',
      },
      backgroundImage: {
        'mira-radial': 'radial-gradient(circle at top, rgba(255, 183, 77, 0.18), transparent 36%), radial-gradient(circle at 20% 10%, rgba(255, 145, 54, 0.14), transparent 20%), linear-gradient(180deg, #07111f 0%, #0c1324 100%)',
      },
      fontFamily: {
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
