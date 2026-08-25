/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#070a12',
          card: '#0e1424',
          border: '#1d273d',
          accent: '#e62429'
        },
        ecell: {
          red: '#ed1c24',
          redDark: '#c3141a',
          redGlow: 'rgba(237, 28, 36, 0.35)',
          darkBg: '#090d16',
          cardBg: '#0e1424',
          surface: '#151d30',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(237, 28, 36, 0.4)',
        'glow-red-lg': '0 0 40px -5px rgba(237, 28, 36, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
