import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 15px 30px -15px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
} satisfies Config;
