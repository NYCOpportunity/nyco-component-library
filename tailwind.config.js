/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  safelist: [
    // Width utilities
    { pattern: /^w-/ },
    { pattern: /^min-w-/ },
    { pattern: /^max-w-/ },
    // Padding utilities
    { pattern: /^p-/ },
    { pattern: /^px-/ },
    { pattern: /^py-/ },
    // Margin utilities
    { pattern: /^m-/ },
    { pattern: /^mx-/ },
    { pattern: /^my-/ },
    // Shadow utilities
    { pattern: /^shadow/ },
    // Rounding utilities
    { pattern: /^rounded/ },
    // Border utilities
    { pattern: /^border/ },
    // Opacity utilities
    { pattern: /^opacity/ },
    // Transform utilities
    { pattern: /^scale/ },
    { pattern: /^rotate/ },
    // Important modifier
    { pattern: /^!/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
