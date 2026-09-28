/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        ink: '#161A2B',
        muted: '#5B6178',
        faint: '#9298AC',
        primary: {
          DEFAULT: '#0369A1',
          hover: '#075985',
          light: '#7DD3FC'
        },
        accent: '#F2994A',
        soft: '#F2F4F9',
        dark: {
          bg: '#0E1120',
          card: '#102A3D',
          surface: '#171B2C'
        }
      },
      boxShadow: {
        card: '0 20px 50px -28px rgba(22,26,43,.22)',
        glow: '0 0 25px rgba(3, 105, 161, 0.35)',
        'cyan-glow': '0 0 30px rgba(125, 211, 252, 0.4)'
      },
      keyframes: {
        'marquee-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'marquee-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'tools-marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        }
      },
      animation: {
        'marquee-right': 'marquee-right 12s linear infinite',
        'marquee-left': 'marquee-left 12s linear infinite',
        'tools-marquee': 'tools-marquee 25s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
