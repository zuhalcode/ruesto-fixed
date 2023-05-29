/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ccdcfe",
        secondary: "#cf2139",
        accent: "#2c2d42",
        neutral: "#fbf9f9",

        "d-primary": "#ffd9b8",
        "d-secondary": "#422811",
        "d-accent": "#a7642f",
        "d-neutral": "#f79420",
      },
      fontFamily: {
        berkshire: ["Berkshire Swash", "cursive"],
      },
      animation: {
        "opacity-bottom-to-top": "opacity-bottom-to-top 1s ease-out infinite",
      },
      keyframes: {
        "opacity-bottom-to-top": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
