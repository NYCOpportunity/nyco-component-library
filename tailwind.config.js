/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ["'Public Sans'", 'sans-serif'],
        secondary: ["'Source Serif Pro'", 'serif'],
      },
    },
  },
  plugins: [],
};
