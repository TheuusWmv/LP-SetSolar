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
          hover: '#B47218',
        },
        solar: {
          lime: '#D4942A',
          hover: '#B47218',
          active: '#92560D',
          soft: '#FEF9EE',
          yellow: '#F59E0B',
          blue: '#1B3A5C',
          'blue-secondary': '#2B5885',
          'blue-dark': '#0D1E30',
          navy: '#0B1827',
        },
        lime: {
          solar: '#D4942A',
          hover: '#B47218',
          light: '#FEF9EE',
          dark: '#0B1827',
        },
        dark: {
          primary: '#0B1827',
          secondary: '#1B3A5C',
          muted: '#64748b',
          card: '#ffffff',
          surface: '#f8fafc',
          border: '#e2e8f0',
        },
      },
      backgroundImage: {
        'gradient-cta': 'linear-gradient(135deg, #F59E0B 0%, #D4942A 100%)',
        'gradient-hero': 'linear-gradient(115deg, #070F18 0%, #0D1E30 80%)',
      },
      boxShadow: {
        'glow-solar': '0 0 30px -5px rgba(212, 148, 42, 0.40)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      transitionDuration: {
        '160': '160ms',
        '200': '200ms',
        '240': '240ms',
        '280': '280ms',
      },
      animation: {
        'marquee': 'marquee 42s linear infinite',
        'marquee-reverse': 'marquee-reverse 46s linear infinite',
        'accordion-down': 'accordion-down 0.22s cubic-bezier(0.23, 1, 0.32, 1)',
        'accordion-up': 'accordion-up 0.18s cubic-bezier(0.23, 1, 0.32, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      }
    },
  },
  plugins: [],
}
