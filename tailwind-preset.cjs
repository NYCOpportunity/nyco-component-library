/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const typographyUtilities = {
  '.display-title': {
    fontFamily: 'var(--font-primary)',
    fontSize: '2.5rem',
    letterSpacing: '-0.02em',
    lineHeight: '114%',
    fontWeight: '600',
  },
  '.display-subtitle': {
    fontFamily: 'var(--font-secondary)',
    fontSize: '1.5rem',
    letterSpacing: 'normal',
    lineHeight: '130%',
    fontWeight: '400',
  },
  '.display-section-title': {
    fontFamily: 'var(--font-secondary)',
    fontSize: '2.5rem',
    letterSpacing: '-0.01em',
    lineHeight: '124%',
    fontWeight: '400',
  },
  '.display-product-header': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1.5rem',
    letterSpacing: 'normal',
    lineHeight: '140%',
    fontWeight: '600',
  },
  '.heading-h1': {
    fontFamily: 'var(--font-primary)',
    fontSize: '2.5rem',
    letterSpacing: '-0.01em',
    lineHeight: '124%',
    fontWeight: '600',
  },
  '.heading-h2': {
    fontFamily: 'var(--font-secondary)',
    fontSize: '2rem',
    letterSpacing: '-0.01em',
    lineHeight: '124%',
    fontWeight: '400',
  },
  '.heading-h3': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1.5rem',
    letterSpacing: '-0.01em',
    lineHeight: '124%',
    fontWeight: '600',
  },
  '.body-regular': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1.125rem',
    letterSpacing: 'normal',
    lineHeight: '150%',
    fontWeight: '400',
  },
  '.body-italic': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1.125rem',
    letterSpacing: 'normal',
    lineHeight: '150%',
    fontStyle: 'italic',
  },
  '.body-bold': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1.125rem',
    letterSpacing: 'normal',
    lineHeight: '150%',
    fontWeight: '600',
  },
  '.body-link': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1.125rem',
    letterSpacing: 'normal',
    lineHeight: '150%',
    fontWeight: '600',
    textDecoration: 'underline',
  },
  '.ui-16-regular': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1rem',
    letterSpacing: 'normal',
    lineHeight: '150%',
    fontWeight: '400',
  },
  '.ui-16-bold': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1rem',
    letterSpacing: 'normal',
    lineHeight: '150%',
    fontWeight: '600',
  },
  '.ui-14-regular': {
    fontFamily: 'var(--font-primary)',
    fontSize: '0.875rem',
    letterSpacing: 'normal',
    lineHeight: '160%',
    fontWeight: '400',
  },
  '.ui-14-bold': {
    fontFamily: 'var(--font-primary)',
    fontSize: '0.875rem',
    letterSpacing: 'normal',
    lineHeight: '160%',
    fontWeight: '600',
  },
  '.button-label': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1rem',
    letterSpacing: 'normal',
    lineHeight: '1.375rem',
    fontWeight: '600',
  },
  '.button-link-label': {
    fontFamily: 'var(--font-primary)',
    fontSize: '1rem',
    letterSpacing: 'normal',
    lineHeight: '1.375rem',
    fontWeight: '600',
    textDecoration: 'underline',
  },
  '@media (max-width: 999px)': {
    '.display-title': {
      fontSize: '2.375rem',
      lineHeight: '114%',
      fontWeight: '600',
    },
    '.display-subtitle': {
      fontSize: '1.25rem',
      lineHeight: '130%',
      fontWeight: '400',
    },
    '.display-section-title': {
      fontSize: '2rem',
      letterSpacing: '-0.01em',
      lineHeight: '124%',
      fontWeight: '400',
    },
    '.display-product-header': {
      fontSize: '1.375rem',
      lineHeight: '140%',
      fontWeight: '600',
    },
    '.heading-h1': {
      fontSize: '2.375rem',
      letterSpacing: 'normal',
      lineHeight: '130%',
      fontWeight: '400',
    },
    '.heading-h2': {
      fontSize: '1.75rem',
      letterSpacing: 'normal',
      lineHeight: '124%',
      fontWeight: '400',
    },
    '.heading-h3': {
      fontSize: '1.375rem',
      letterSpacing: 'normal',
      lineHeight: '130%',
      fontWeight: '400',
    },
    '.body-regular': {
      fontSize: '1.125rem',
      lineHeight: '150%',
      fontWeight: '400',
    },
    '.body-italic': {
      fontSize: '1.125rem',
      lineHeight: '150%',
      fontStyle: 'italic',
    },
    '.body-bold': {
      fontSize: '1.125rem',
      lineHeight: '150%',
      fontWeight: '600',
    },
    '.body-link': {
      fontSize: '1.125rem',
      lineHeight: '150%',
      fontWeight: '600',
      textDecoration: 'underline',
    },
    '.ui-16-regular': {
      fontSize: '1rem',
      lineHeight: '150%',
      fontWeight: '400',
    },
    '.ui-16-bold': {
      fontSize: '1rem',
      lineHeight: '150%',
      fontWeight: '600',
    },
    '.ui-14-regular': {
      fontSize: '0.875rem',
      lineHeight: '160%',
      fontWeight: '400',
    },
    '.ui-14-italic': {
      fontSize: '0.875rem',
      lineHeight: '160%',
      fontStyle: 'italic',
    },
    '.ui-14-bold': {
      fontSize: '0.875rem',
      lineHeight: '160%',
      fontWeight: '600',
    },
    '.ui-12-all-caps': {
      fontSize: '0.75rem',
      lineHeight: '160%',
      textTransform: 'uppercase',
    },
    '.button-label': {
      fontSize: '1rem',
      lineHeight: '1.375rem',
      fontWeight: '600',
    },
    '.button-link-label': {
      fontSize: '1rem',
      lineHeight: '1.375rem',
      fontWeight: '600',
      textDecoration: 'underline',
    },
    '.component-accordion-title': {
      fontSize: '1.25rem',
      lineHeight: '140%',
      fontWeight: '600',
    },
    '.component-card-title': {
      fontSize: '1.375rem',
      lineHeight: '140%',
      fontWeight: '600',
    },
    '.component-card-link-title': {
      fontSize: '1.375rem',
      lineHeight: '140%',
      fontWeight: '600',
      textDecoration: 'underline',
    },
    '.component-control-panel-title': {
      fontSize: '1rem',
      lineHeight: '140%',
      fontWeight: '600',
    },
    '.component-nav-inpage-item': {
      fontSize: '1.125rem',
      lineHeight: '130%',
      fontWeight: '400',
    },
  },
};

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
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents(typographyUtilities);
    }),
  ],
};

module.exports = preset;
