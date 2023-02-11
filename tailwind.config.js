/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*","./views/partials/*"],
  theme: {
    extend: {
      screens: {
        'esm': '426px',
      },
    },
  },
  plugins: [],
}
