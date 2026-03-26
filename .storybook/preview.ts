import type { Preview } from '@storybook/react';
import '../src/styles.css';

// Load fonts used by the design system
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href =
  'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,600;1,400;1,600&family=Source+Serif+4:wght@400&display=swap';
document.head.appendChild(link);

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
};

export default preview;
