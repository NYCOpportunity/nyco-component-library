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
        component: [
          'The **GlobalNavigation** banner is the NYC government-wide utility bar pinned to the very',
          'top of every page. It identifies the page as an official City of New York website and,',
          'optionally, exposes a language / translate toggle. Place it above the site-level',
          '`SiteNavigation` header.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| NYC logo + official-site text | — | ✅ (built-in) | "Official website of the City of New York"; logo swaps between a desktop and mobile asset. |',
          '| Language toggle | `showTranslate`, `language`, `onLanguageClick` | — | Translate icon + `Language | {language}` + chevron. Hidden when `showTranslate` is `false`. |',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { GlobalNavigation } from "@nycopportunity/component-library";',
          '',
          '// Default — includes the English language toggle',
          '<GlobalNavigation onLanguageClick={() => openLanguageMenu()} />',
          '',
          '// Custom language label, or hide the toggle entirely',
          '<GlobalNavigation language="Español" onLanguageClick={openLanguageMenu} />',
          '<GlobalNavigation showTranslate={false} />',
          '```',
          '',
          '---',
          '',
          '## Responsive',
          '',
          '| Breakpoint | Layout |',
          '| --- | --- |',
          '| Desktop (≥ 1000 px) | Single 33 px row: logo + text on the left, language toggle inline on the right. 32 px h-padding. |',
          '| Mobile (< 1000 px) | Language toggle sits in its own 34 px row **above** the site-identity row; text may wrap. 16 px h-padding. |',
          '',
          '---',
          '',
          '## Accessibility',
          '',
          '- The language toggle is a `<button type="button">` with a descriptive `aria-label`',
          '  (`"Language: {language}. Click to change language"`).',
          '- The NYC logo `<img>` carries `alt="NYC"`.',
          '- The toggle shows a visible focus ring via `--color-border-focus` and underlines on hover.',
        ].join('\n'),
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
