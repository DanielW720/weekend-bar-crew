/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.65rem",
      },
      height: {
        headerMobile: "6.25rem",
        headerSmall: "8rem",
        headerMedium: "10rem",
      },
      screens: {
        xxs: "350px",
        xs: "475px",
      },
      colors: {
        beige: "#f0e6ce",
        cyan: "#00FFFF",
        darkGray: "#171717",
        extraDarkGray: "#101010",
        backdropOverlay: "rgb(9,0,0,0.6)",
        cardBackdrop: "rgb(0,0,0,0.8)",
        textLightPink: "#EDBABA",
      },
      backgroundImage: {
        headerTransparent:
          "linear-gradient(to right, #00000040, #735e5e40, #EDBABA40)",
      },
      keyframes: {
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        slideDown: "slideDown 300ms ease-in-out",
        slideUp: "slideUp 400ms ease-in-out",
      },
    },
  },
  plugins: [],
};
