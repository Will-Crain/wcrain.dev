/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.zest,
      },
      boxShadow: {
        'md': '0 0px 8px rgb(0 0 0 / 0.2)',
      }
    }
  },
}