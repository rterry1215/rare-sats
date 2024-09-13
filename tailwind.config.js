/** @type {import('tailwindcss').Config} */
/* eslint-disable */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /gap-(1|1.5|2|3|3.5|4|5|6|7|8|9|10)/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /gap-x-(1|1.5|2|3|3.5|4|5|6|7|8|9|10)/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /gap-y-(1|1.5|2|3|3.5|4|5|6|7|8|9|10)/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /items-(start|end|center|stretch)/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /justify-(start|end|center|stretch|between|around|evenly)/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /flex-col/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /flex-row/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /^basis(\w?)-/,
      variants: ["sm", "md", "lg", "xl"],
    },
  ],
  theme: {
    colors: {
      primary: "#0A1128",
      secondary: "#848484",
      transparent: "#00000000",
      dark: "#0C0F1E",
      gray: "#A5B1C3",
      lime: "#7ee787",
      blue: "#64B5F6",
      "custom-pink": "#d4406f",
      "custom-purple": "#8e56bb",
      "custom-blue": "#55b0cc",
      primary: {
        900: '#d150d1', // Customize to your desired color
      },
      secondary: {
        900: '#8e56bb', // Customize to your desired color
      },
      tertiary: {
        900: '#4a5568', // Customize to your desired color
      },
    },
    fontFamily: {},
    extend: {
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(50% 100% at 25% 3%, #13355BEE 0%, #0F203EEE 40%, #0A1128EE 100%)",
      },
    },
  },
  plugins: [],
});
