/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        headerMobile: "6rem",
        headerSmall: "8rem",
        headerMedium: "10rem",
      },
      screens: {
        xs: "475px",
      },
      colors: {
        headerText: "#E8DEC7",
        headerLeft: "black",
        headerRight: "#EDBABA",
        backdropOverlay: "rgb(9,0,0,0.6)",
        textLightPink: "#EDBABA",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
