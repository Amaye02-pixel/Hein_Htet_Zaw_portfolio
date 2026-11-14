/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A0907', 900: '#0E0D0B', 800: '#151310', 700: '#1D1A16' },
        line: '#2A2620',
        ivory: '#F2EDE0',
        mute: '#9A9283',
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E8CF8E',
          deep: '#8F6F27',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 11vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      backgroundImage: {
        'gold-sheen': 'linear-gradient(120deg, #8F6F27 0%, #E8CF8E 45%, #C9A24B 100%)',
      },
    },
  },
  plugins: [],
}
