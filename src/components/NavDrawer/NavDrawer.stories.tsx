import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavDrawer } from './NavDrawer';
import type { NavDrawerSection, SiteNavItem } from '../../types/components';

// ---------------------------------------------------------------------------
// Demo logo
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
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
  { label: 'Home', href: '#' },
  { label: 'Data Tool', href: '#' },
  { label: 'Findings', href: '#' },
  { label: 'Methodology', href: '#', active: true },
  { label: 'Workforce Data', href: 'https://example.com', external: true },
  { label: 'Equity Data', href: 'https://example.com', external: true },
];

const categorizedSections: NavDrawerSection[] = [
  {
    category: 'Nav item category',
    items: [
      { label: 'Nav item', href: '#' },
      { label: 'Nav item', href: '#' },
      { label: 'Nav item', href: '#' },
      { label: 'External link', href: 'https://example.com', external: true },
    ],
  },
  {
    category: 'Nav item category',
    items: [
      { label: 'Nav item', href: '#' },
      { label: 'Nav item', href: '#' },
    ],
  },
  {
    category: 'Nav item category',
    items: [{ label: 'Nav item', href: '#' }],
  },
];

const footerProductLinks: SiteNavItem[] = [
  { label: 'External product link', href: 'https://example.com', external: true },
  { label: 'External product link', href: 'https://example.com', external: true },
];

// ---------------------------------------------------------------------------
// Controlled story wrapper — lets stories open/close the drawer
// ---------------------------------------------------------------------------
function DrawerDemo(props: Partial<React.ComponentProps<typeof NavDrawer>>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div style={{ padding: '24px', fontFamily: 'Public Sans, sans-serif' }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: 'var(--color-primary-base, #050560)',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontFamily: 'inherit',
          cursor: 'pointer',
        }}
      >
        ☰ Open drawer
      </button>

      <NavDrawer
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant={props.variant ?? 'none'}
        navItems={props.navItems ?? defaultNavItems}
        sections={props.sections}
        footerLinks={props.footerLinks}
        logo={props.logo ?? <DemoLogo />}
        triggerRef={triggerRef}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof NavDrawer> = {
  title: 'Components/NavDrawer',
  component: NavDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
        component: [
          'The **NavDrawer** is the mobile navigation side-sheet used by `SiteNavigation`. It is a',
          '**controlled** modal dialog — the caller owns `isOpen` and provides an `onClose` callback.',
          'Use it directly when you need a standalone slide-in menu, or let `SiteNavigation` wire it up',
          'for you.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| Open state | `isOpen` | ✅ | Renders nothing when `false`. |',
          '| Close handler | `onClose` | ✅ | Fired by the close button, backdrop click, or Escape. |',
          '| Flat nav links | `navItems` | — | `SiteNavItem[]` shown as large display links (`none` variant). |',
          '| Sectioned nav | `sections` | — | `NavDrawerSection[]` (`{ category?, items }`) for the `category` variant. |',
          '| Footer links | `footerLinks` | — | Smaller links pinned below, often external products. |',
          '| Variant | `variant` | — | `"none"` (default, flat) or `"category"` (grouped with headings). |',
          '| Logo | `logo` | — | Rendered in the header row of the sheet. |',
          '| `id` / trigger | `id`, `triggerRef`, `label` | — | `id` (default `"nav-drawer"`) pairs with the trigger\'s `aria-controls`; focus returns to `triggerRef` on close; `label` sets the dialog `aria-label`. |',
          '',
          'Each `SiteNavItem` supports `label`, `href` (anchor vs. button), `active`, `external`',
          '(link-color text + `north_east` arrow), `hasDropdown`, and `onClick`.',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { NavDrawer } from "@nycopportunity/component-library";',
          '',
          'const triggerRef = React.useRef<HTMLButtonElement>(null);',
          'const [open, setOpen] = React.useState(false);',
          '',
          '<button ref={triggerRef} aria-controls="nav-drawer" aria-expanded={open}',
          '  onClick={() => setOpen(true)}>Menu</button>',
          '',
          '<NavDrawer',
          '  id="nav-drawer"',
          '  isOpen={open}',
          '  onClose={() => setOpen(false)}',
          '  triggerRef={triggerRef}',
          '  variant="category"',
          '  sections={[',
          '    { category: "Explore", items: [{ label: "About", href: "/about" }] },',
          '  ]}',
          '  footerLinks={[{ label: "NYC.gov", href: "https://nyc.gov", external: true }]}',
          '/>',
          '```',
          '',
          '---',
          '',
          '## Behavior',
          '',
          '- Renders a full-height backdrop plus a right-anchored sheet (full width on small screens,',
          '  capped at 390 px on `md`+).',
          '- Moves focus to the **close button** when `isOpen` becomes `true`.',
          '- Closes on the close button, a backdrop click, or the **Escape** key, then returns focus to',
          '  `triggerRef`.',
          '- Locks `document.body` scroll while open and restores it on close/unmount.',
          '',
          '---',
          '',
          '## Accessibility',
          '',
          '- The sheet is `role="dialog" aria-modal="true"` with an `aria-label` from `label`.',
          '- Nav links are grouped in a `<nav>` landmark; each `category` heading precedes its `<ul>`.',
          '- External links set `target="_blank" rel="noopener noreferrer"` and add a visually-hidden',
          '  "(opens in a new tab)" note; `active` items get `aria-current="page"`.',
          '- All interactive elements show a visible focus ring via `--color-border-focus`.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Default variant (`none`) — large nav links with optional external arrows.
 */
export const Default: Story = {
  render: () => <DrawerDemo variant="none" />,
};

/**
 * Categorized variant (`category`) with section headings and footer product links.
 */
export const Category: Story = {
  render: () => (
    <DrawerDemo
      variant="category"
      sections={categorizedSections}
      footerLinks={footerProductLinks}
    />
  ),
};

/**
 * Internal links only — no external links or NE arrows.
 */
export const InternalOnly: Story = {
  render: () => (
    <DrawerDemo
      navItems={[
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Services', href: '#', active: true },
        { label: 'Contact', href: '#' },
      ]}
    />
  ),
};

/**
 * External links — all items use the external variant (link color + NE arrow).
 */
export const ExternalLinks: Story = {
  render: () => (
    <DrawerDemo
      navItems={[
        { label: 'Data Tool', href: 'https://example.com', external: true },
        { label: 'Workforce Data', href: 'https://example.com', external: true },
        { label: 'Equity Data', href: 'https://example.com', external: true },
      ]}
    />
  ),
};

/**
 * No logo slot — the bottom logo area is omitted.
 */
export const NoLogo: Story = {
  render: () => <DrawerDemo logo={undefined} />,
};

/**
 * Open — renders the drawer already open (no trigger click needed).
 * Useful for visual regression testing and documentation screenshots.
 */
function OpenDrawerDemo() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <NavDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      navItems={defaultNavItems}
      logo={<DemoLogo />}
    />
  );
}

export const Open: Story = {
  render: () => <OpenDrawerDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer rendered pre-opened. Close it with the ✕ button or Escape key.',
      },
    },
  },
};
