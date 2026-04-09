import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GlobalNavigation } from './GlobalNavigation';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof GlobalNavigation> = {
  title: 'Components/GlobalNavigation',
  component: GlobalNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '`GlobalNavigation` is the NYC government-wide utility banner that appears at the very top ' +
          'of every page. It identifies the page as an official City of New York website and optionally ' +
          'provides a language/translate toggle.\n\n' +
          '---\n\n' +
          '## Layout\n\n' +
          '**Desktop (≥ 1000 px):** Single 33 px row — NYC logo + "Official website…" text on the ' +
          'left, optional Language toggle on the right. Horizontal padding `32px`.\n\n' +
          '**Mobile (< 1000 px):** When `showTranslate` is `true`, the language toggle renders in a ' +
          '34 px row **above** the site identity row. When `showTranslate` is `false`, a single compact ' +
          'row is shown. Horizontal padding `16px`.\n\n' +
          '---\n\n' +
          '## Props\n\n' +
          '| Prop | Type | Default | Description |\n' +
          '|---|---|---|---|\n' +
          '| `showTranslate` | `boolean` | `true` | Show the language toggle |\n' +
          '| `language` | `string` | `"English"` | Label shown in the toggle |\n' +
          '| `onLanguageClick` | `MouseEventHandler` | — | Called when the toggle is clicked |\n\n' +
          '---\n\n' +
          '## Accessibility\n\n' +
          '- The language toggle is a `<button type="button">` with a descriptive `aria-label`.\n' +
          '- The NYC logo `<img>` carries `alt="NYC"`.\n' +
          '- All interactive elements have a visible focus ring via `--color-border-focus`.\n\n' +
          '---\n\n' +
          '## Design Tokens\n\n' +
          '| Property | Token | Value |\n' +
          '|---|---|---|\n' +
          '| Background | `--color-neutral-100` | `#f5f5f5` |\n' +
          '| Border | `--color-neutral-300` | `#dddddd` |\n' +
          '| Text / icons | `--color-neutral-900` | `#333333` |\n' +
          '| Focus ring | `--color-border-focus` | `#284cca` |\n',
      },
    },
  },
  args: {
    onLanguageClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Default: logo, official site text, and language toggle. */
export const Default: Story = {
  args: {
    showTranslate: true,
    language: 'English',
  },
};

/** Without the language toggle — only the NYC logo and official-site text are shown. */
export const NoTranslate: Story = {
  args: {
    showTranslate: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use when the property `showTranslate` is `false` or when language switching is not needed.',
      },
    },
  },
};

/** A non-English language label pre-selected. */
export const SpanishLanguage: Story = {
  args: {
    showTranslate: true,
    language: 'Español',
  },
};
