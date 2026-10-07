/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4942A',
          foreground: '#FFFFFF',
        },
        solar: {
          lime: '#D4942A',
          hover: '#B47218',
          active: '#92560D',
          soft: '#FEF9EE',
          yellow: '#F59E0B',
          blue: '#1B3A5C',
          'blue-secondary': '#2B5885',
          dark: '#0D1E30',
          navy: '#0B1827',
          card: '#ffffff',
          surface: '#f8fafc',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(212, 148, 42, 0.4)',
        'glow-solar': '0 0 30px -5px rgba(212, 148, 42, 0.40)',
        'subtle': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
