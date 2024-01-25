/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bgDark': 'hsl(207, 26%, 17%)',
        'elDark': 'hsl(209, 23%, 22%)',
        'txDark': 'hsl(0, 0%, 100%)',
        'bgLight': 'hsl(0, 0%, 98%)',
        'elLight': 'hsl(0, 0%, 52%)',
        'txLight': 'hsl(200, 15%, 8%)',
      },
      screens: {
        'sm': '576px',
      },
      boxShadow: {
        // Tambahkan nilai bayangan kustom
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}