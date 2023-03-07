/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Montserrat', 'sans-serif'"],
        body: ["'Montserrat', 'sans-serif'"],
        inter: ["'Inter', 'sans-serif'"],
      },
    },
    fontFamily: {
      display: ["'Montserrat', 'sans-serif'"],
      body: ["'Montserrat', 'sans-serif'"],
      inter: ["'Inter', 'sans-serif'"],
    },
  },
  plugins: [],
};

module.exports = config;
