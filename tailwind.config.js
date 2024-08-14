/** @type {iport('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.zest,
      }
    }
  },
}