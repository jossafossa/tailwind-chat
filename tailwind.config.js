/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},

    // default transition
    transitionDuration: {
      DEFAULT: "250ms",
    },
    transitionTimingFunction: {
      DEFAULT: "ease",
    },
  },
  plugins: [],
};
