/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primaryColor': '#e3e3f8',
        'primaryAccentColor': '#8585e0',
        'secondaryColor': '#f8e7e4',
        'secondaryAccentColor': '#df9385',
        'black-700': '#262626',
        'black-500': '#313131',
        'white-700': '#cccccc',
        'white-500': '#f2f2f2',
      }
    },
  },
  plugins: [],
}