/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--montserrat-font)"],
        body: ["var(--montserrat-font)"],
        inter: ["var(--inter-font)"],
      },
    },
    fontFamily: {
      display: ["var(--montserrat-font)"],
      body: ["var(--montserrat-font)"],
      inter: ["var(--inter-font)"],
    },
  },
  plugins: [],
};

module.exports = config;
