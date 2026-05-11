/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ribuzz: {
          dark: '#0B0B10',
          surface: '#12131A',
          card: '#181A24',
          magenta: '#E625FF',
          cyan: '#0FEFFD',
          purple: '#5B16E6',
        }
      },
      fontFamily: {
        sans: ['Saira', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}