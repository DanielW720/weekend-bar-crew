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
        headerMobileScrolling: "5.5rem",
        headerSmall: "8rem",
        headerMedium: "10rem",
      },
      screens: {
        xs: "475px",
      },
      colors: {
        beige: "#E8DEC7",
        beigeRed: "#EDBABA",
        backdropOverlay: "rgb(9,0,0,0.6)",
        textLightPink: "#EDBABA",
      },
      backgroundImage: {
        headerTransparent:
          "linear-gradient(to right, #00000040, #735e5e40, #EDBABA40)",
      },
    },
  },
  plugins: [],
};
