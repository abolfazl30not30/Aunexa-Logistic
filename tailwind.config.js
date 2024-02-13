/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainRed: "#DB3746",
        textGray: "#4E4E4E",
        mainBlack:"#34312D",
        mainPurple:"#4D51DF",
        lightPurple:"#CACBFF",
        mainBg:"#E6EEEE",
        gray50:"#D9D9D9",
        gray80: "#4E4E4E",
        gray70: "#797979",
        gray9F: "#9F9F9F",
        borderGray: "#E0E3E0",
        greenBg: "#D9FCEB",
        greenText: "#12D377",
        orangeBg: "#FBE8DA",
        orangeText: "#EB8338",
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
