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

const categorizedSections = [
  {
    category: 'Data',
    items: [
      { label: 'Data Tool', href: '#' },
      { label: 'Findings', href: '#' },
      { label: 'Methodology', href: '#', active: true },
    ],
  },
];

const drawerFooterLinks: SiteNavItem[] = [
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
        component: [
          'The site-level **SiteNavigation** header \u2014 logo on the left, primary nav links on the',
          'right. It is responsive out of the box: a full nav bar on desktop and a compact bar with a',
          'hamburger-triggered `NavDrawer` on mobile. Feed it `SiteNavItem[]` and it wires up the',
          'desktop `NavItem`s and the mobile drawer for you.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| Logo | `logo` | \u2705 | Rendered left of the bar and in the mobile drawer header. |',
          '| Nav items | `navItems` | \u2014 | `SiteNavItem[]`; `NavItem`s on desktop, large display links in the drawer. |',
          '| Drawer variant | `drawerVariant` | \u2014 | `"none"` (default) or `"category"` for grouped sections. |',
          '| Drawer sections | `drawerSections` | \u2014 | `NavDrawerSection[]` for the categorized mobile drawer. |',
          '| Drawer footer links | `drawerFooterLinks` | \u2014 | Extra links at the bottom of the categorized drawer. |',
          '| Search button | `showSearch`, `onSearchClick` | \u2014 | Optional search icon in the mobile bar. |',
          '| Menu label | `mobileMenuLabel` | \u2014 | Accessible hamburger label. Defaults to `"Open navigation menu"`. |',
          '| Initial state | `defaultOpen` | \u2014 | Seeds the drawer open/closed state (useful for stories/SSR). |',
          '',
          'Each `SiteNavItem` has `label`, optional `href` (anchor vs. button), `active`',
          '(`aria-current="page"` + bottom border), `external`, `hasDropdown`, and `onClick`.',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { SiteNavigation } from "@nycopportunity/component-library";',
          '',
          '<SiteNavigation',
          '  logo={<SiteLogo />}',
          '  navItems={[',
          '    { label: "Home", href: "/", active: true },',
          '    { label: "Programs", href: "/programs", hasDropdown: true },',
          '    { label: "NYC.gov", href: "https://nyc.gov", external: true },',
          '  ]}',
          '  showSearch',
          '  onSearchClick={() => openSearch()}',
          '/>',
          '```',
          '',
          '---',
          '',
          '## Responsive',
          '',
          '| Breakpoint | Layout |',
          '| --- | --- |',
          '| Desktop (\u2265 1000 px) | White bar 68 px tall, 56 px h-padding; logo left, full-height `NavItem`s right. |',
          '| Mobile (< 1000 px) | Compact 56 px bar; logo left, optional search + hamburger right. Tapping the hamburger opens the `NavDrawer` side-sheet. |',
          '',
          'The drawer auto-closes if the viewport grows back to desktop while it is open.',
          '',
          '---',
          '',
          '## Accessibility',
          '',
          '- Rendered as a `<header>` landmark; the desktop links sit inside a `<nav aria-label="Site navigation">`.',
          '- The hamburger is a `<button>` with `aria-label`, `aria-expanded`, and `aria-controls`',
          '  pointing at the drawer `id`.',
          '- The drawer is `role="dialog" aria-modal="true"`; focus moves to its close button on open',
          '  and returns to the hamburger on close (button, backdrop, or **Escape**).',
          '- Body scroll is locked while the drawer is open; external links add',
          '  `target="_blank" rel="noopener noreferrer"` and a visually-hidden "(opens in a new tab)" note.',
        ].join('\n'),
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
 * Mobile drawer using categorized variant with section heading and footer links.
 */
export const CategoryDrawer: Story = {
  args: {
    defaultOpen: true,
    drawerVariant: 'category',
    drawerSections: categorizedSections,
    drawerFooterLinks,
  },
  parameters: {
    viewport: {
      viewports: {
        drawerCanvas: {
          name: 'Drawer canvas',
          styles: { width: '600px', height: '900px' },
        },
      },
      defaultViewport: 'drawerCanvas',
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
    viewport: {
      viewports: {
        drawerCanvas: {
          name: 'Drawer canvas',
          styles: { width: '600px', height: '900px' },
        },
      },
      defaultViewport: 'drawerCanvas',
    },
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
    viewport: {
      viewports: {
        drawerCanvas: {
          name: 'Drawer canvas',
          styles: { width: '600px', height: '900px' },
        },
      },
      defaultViewport: 'drawerCanvas',
    },
  },
};
