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
          foreground: '#000000',
        },
        lime: {
          solar: '#d4f658',
          hover: '#c4e840',
          light: '#f4fce3',
          dark: '#1c2208',
        },
        dark: {
          primary: '#111827',
          secondary: '#374151',
          muted: '#6b7280',
          card: '#ffffff',
          surface: '#f9fafb',
          border: '#e5e7eb',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
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
