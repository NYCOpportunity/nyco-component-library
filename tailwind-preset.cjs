/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary-base)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-foreground': 'var(--color-primary-foreground)',

        secondary: 'var(--color-secondary-base)',
        'secondary-light': 'var(--color-secondary-light)',
        'secondary-dark': 'var(--color-secondary-dark)',
        'secondary-foreground': 'var(--color-secondary-foreground)',

        neutral: {
          white: 'var(--color-neutral-white)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          500: 'var(--color-neutral-500)',
          700: 'var(--color-neutral-700)',
          900: 'var(--color-neutral-900)',
          black: 'var(--color-neutral-black)',
        },

        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          link: 'var(--color-text-link)',
        },

        'button-primary': {
          base: 'var(--color-button-primary-base)',
          hover: 'var(--color-button-primary-hover)',
        },
        'button-secondary': {
          base: 'var(--color-button-secondary-base)',
          hover: 'var(--color-button-secondary-hover)',
        },
        'button-disabled': {
          base: 'var(--color-button-disabled-base)',
          text: 'var(--color-button-disabled-text)',
        },

        border: {
          default: 'var(--color-border-default)',
          focus: 'var(--color-border-focus)',
          error: 'var(--color-border-error)',
        },

        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
        },

        info: {
          light: 'var(--color-info-light)',
          base: 'var(--color-info-base)',
          dark: 'var(--color-info-dark)',
        },
        success: {
          light: 'var(--color-success-light)',
          base: 'var(--color-success-base)',
          dark: 'var(--color-success-dark)',
        },
        warning: {
          light: 'var(--color-warning-light)',
          base: 'var(--color-warning-base)',
          dark: 'var(--color-warning-dark)',
        },
        error: {
          light: 'var(--color-error-light)',
          base: 'var(--color-error-base)',
          dark: 'var(--color-error-dark)',
        },

        'data-viz': {
          1: 'var(--color-data-viz-01)',
          2: 'var(--color-data-viz-02)',
          3: 'var(--color-data-viz-03)',
          4: 'var(--color-data-viz-04)',
          5: 'var(--color-data-viz-05)',
          6: 'var(--color-data-viz-06)',
          7: 'var(--color-data-viz-07)',
          8: 'var(--color-data-viz-08)',
        },
        'data-viz-maps': {
          1: 'var(--color-data-viz-maps-01)',
          2: 'var(--color-data-viz-maps-02)',
          3: 'var(--color-data-viz-maps-03)',
          4: 'var(--color-data-viz-maps-04)',
          5: 'var(--color-data-viz-maps-05)',
        },
      },
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
        brand: ['var(--font-primary)'],
      },
      fontSize: {
        sm: ['var(--font-size-sm)'],
        md: ['var(--font-size-md)'],
        lg: ['var(--font-size-lg)'],
      },
      lineHeight: {
        sm: 'var(--line-height-sm)',
        md: 'var(--line-height-md)',
        lg: 'var(--line-height-lg)',
      },
      borderRadius: {
        base: 'var(--border-radius-base)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        9: 'var(--space-9)',
        14: 'var(--space-14)',
        'display-section': 'var(--space-display-section)',
        'content-section': 'var(--space-content-section)',
        'content-subsection': 'var(--space-content-subsection)',
        'content-tight': 'var(--space-content-tight)',
        'content-divider': 'var(--space-content-divider)',
      },
    },
  },
};

module.exports = preset;
