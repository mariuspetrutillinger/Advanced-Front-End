/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#0093FF',
        primaryDarkGrey: '#1C1C1C',
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

