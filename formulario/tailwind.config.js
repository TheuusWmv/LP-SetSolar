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
          DEFAULT: '#d4f658',
          foreground: '#0f172a',
        },
        solar: {
          lime: '#d4f658',
          hover: '#c4e840',
          dark: '#0e2740',
          navy: '#0b192c',
          card: '#ffffff',
          surface: '#f8fafc',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(212, 246, 88, 0.4)',
        'subtle': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
