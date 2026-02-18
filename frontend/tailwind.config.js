/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        'stone-dark': '#1c1917',
        'stone-light': '#f5f5f4',
        'accent-gold': '#d4af37',
      }
    },
  },
  plugins: [],
}