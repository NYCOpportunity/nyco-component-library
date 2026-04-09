import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SiteNavigation } from './SiteNavigation';
import type { SiteNavItem } from '../../types/components';

// ---------------------------------------------------------------------------
// Demo logo — stands in for real product branding in stories.
// ---------------------------------------------------------------------------
function DemoLogo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5.5px',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 900,
        fontSize: '20px',
        color: 'var(--color-primary-base, #050560)',
        letterSpacing: '-0.05em',
        textTransform: 'uppercase',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      {/* Logo mark — solid circle placeholder */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="10" cy="10" r="9" stroke="var(--color-primary-base, #050560)" strokeWidth="2" />
        <path
          d="M6 10a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm4-2v4m-2-2h4"
          stroke="var(--color-primary-base, #050560)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span>Site Name</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared nav items
// ---------------------------------------------------------------------------
const defaultNavItems: SiteNavItem[] = [
  { label: 'Data Tool', href: '#' },
  { label: 'Findings', href: '#' },
  { label: 'Methodology', href: '#', active: true },
  { label: 'Workforce Data', href: 'https://example.com', external: true },
  { label: 'Equity Data', href: 'https://example.com', external: true },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof SiteNavigation> = {
  title: 'Components/SiteNavigation',
  component: SiteNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '`SiteNavigation` is the site-level header bar — logo on the left, nav links on the right.\n\n' +
          '---\n\n' +
          '## Layout\n\n' +
          '**Desktop (≥ 1 000 px):** White bar, 68 px tall, 56 px horizontal padding. ' +
          'Logo on the left; `NavItem` components (full bar height) on the right.\n\n' +
          '**Mobile (< 1 000 px):** Compact 56 px bar — logo on the left, optional search icon and ' +
          'hamburger on the right. Tapping the hamburger opens a full-height side-sheet drawer with ' +
          'large-display nav links and the logo anchored to the bottom.\n\n' +
          '---\n\n' +
          '## Props\n\n' +
          '| Prop | Type | Default | Description |\n' +
          '|---|---|---|---|\n' +
          '| `logo` | `ReactNode` | — | Logo content rendered left of the nav bar |\n' +
          '| `navItems` | `SiteNavItem[]` | `[]` | Navigation items |\n' +
          '| `showSearch` | `boolean` | `false` | Show search icon in mobile bar |\n' +
          '| `onSearchClick` | `MouseEventHandler` | — | Called when search icon is clicked |\n' +
          '| `mobileMenuLabel` | `string` | `"Open navigation menu"` | Accessible hamburger label |\n' +
          '| `defaultOpen` | `boolean` | `false` | Seeds the drawer open/closed state |\n\n' +
          '---\n\n' +
          '## Accessibility\n\n' +
          '- Hamburger: `<button>` with `aria-label`, `aria-expanded`, `aria-controls` pointing to the drawer.\n' +
          '- Drawer: `role="dialog" aria-modal="true"` — focus moves to the close button on open.\n' +
          '- Backdrop click and **Escape** close the drawer; focus returns to the hamburger.\n' +
          '- Body scroll is locked while the drawer is open.\n' +
          '- External links carry `target="_blank" rel="noopener noreferrer"` and a visually-hidden ' +
          '"(opens in a new tab)" notice.\n\n' +
          '---\n\n' +
          '## Design Tokens\n\n' +
          '| Property | Token | Value |\n' +
          '|---|---|---|\n' +
          '| Bar background | `--color-white` | `#ffffff` |\n' +
          '| Bar border | `--color-neutral-300` | `#dddddd` |\n' +
          '| Default nav text | `--color-neutral-black` | `#191919` |\n' +
          '| Active / hover border | `--color-primary-base` | `#050560` |\n' +
          '| External link text | `--color-text-link` | `#284cca` |\n' +
          '| Focus ring | `--color-border-focus` | `#284cca` |\n',
      },
    },
  },
  args: {
    logo: <DemoLogo />,
    navItems: defaultNavItems,
    onSearchClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Desktop — logo on the left, nav links (including two external) on the right.
 * Resize the Storybook canvas to < 1 000 px to see the mobile bar.
 */
export const Default: Story = {};

/**
 * With active item — "Data Tool" is marked as the current page.
 */
export const WithActiveItem: Story = {
  args: {
    navItems: [
      { label: 'Data Tool', href: '#', active: true },
      { label: 'Findings', href: '#' },
      { label: 'Methodology', href: '#' },
      { label: 'Workforce Data', href: 'https://example.com', external: true },
    ],
  },
};

/**
 * Mobile bar — compact logo + hamburger. No search icon.
 * Resize the canvas below 1 000 px to trigger the mobile layout.
 */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
    docs: {
      description: {
        story:
          'Compact mobile bar showing the logo and hamburger button. Tap the hamburger to open the navigation drawer.',
      },
    },
  },
};

/**
 * Mobile with search — same as Mobile but also shows the search icon button.
 */
export const MobileWithSearch: Story = {
  args: { showSearch: true },
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
    docs: {
      description: {
        story: 'Mobile bar with the optional search icon to the left of the hamburger.',
      },
    },
  },
};

/**
 * Mobile drawer open — the full-height side-sheet with large display nav links.
 * The close button (✕) and Escape key both close the drawer.
 */
export const DrawerOpen: Story = {
  args: { defaultOpen: true },
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
    docs: {
      description: {
        story:
          'Mobile navigation drawer in its open state. Internal links render in `--color-neutral-black`; ' +
          'external links render in `--color-text-link` with a north-east arrow. The logo is anchored to the bottom.',
      },
    },
  },
};

/**
 * Drawer open with search — same as DrawerOpen but with the search icon visible in the bar behind the overlay.
 */
export const DrawerOpenWithSearch: Story = {
  args: { defaultOpen: true, showSearch: true },
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
};
