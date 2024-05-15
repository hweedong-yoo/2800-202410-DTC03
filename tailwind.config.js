/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "views/**/*.ejs",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['"Orbitron"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
  ],
}

