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
      colors: {
        primary: "#27282c",
        secondary: "#3e4044",
        accent: "#ec67a8",
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
