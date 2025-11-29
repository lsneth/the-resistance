/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        resistance: {
          blue: '#00bfff', // Neon blue
          dark: '#001f3f',
        },
        spy: {
          red: '#ff4136', // Neon red
          dark: '#85144b',
        },
        board: {
          bg: '#111111',
          card: '#1a1a1a',
          surface: '#222222',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
