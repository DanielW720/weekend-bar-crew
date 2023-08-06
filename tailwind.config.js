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
        headerMobile: "6.25rem",
        headerMobileScrolling: "5.25rem",
        headerSmall: "8rem",
        headerMedium: "10rem",
      },
      screens: {
        xxs: "350px",
        xs: "475px",
      },
      colors: {
        beige: "#E8DEC7",
        cyan: "#00FFFF",
        darkGray: "#171717",
        backdropOverlay: "rgb(9,0,0,0.6)",
        cardBackdrop: "rgb(0,0,0,0.8)",
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
