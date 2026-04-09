import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavDrawer } from './NavDrawer';
import type { SiteNavItem } from '../../types/components';

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
  { label: 'Data Tool', href: '#' },
  { label: 'Findings', href: '#' },
  { label: 'Methodology', href: '#', active: true },
  { label: 'Workforce Data', href: 'https://example.com', external: true },
  { label: 'Equity Data', href: 'https://example.com', external: true },
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
        navItems={props.navItems ?? defaultNavItems}
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
        component:
          '`NavDrawer` is the mobile navigation side-sheet extracted from `SiteNavigation`. ' +
          'It is a **controlled component** — the caller manages `isOpen` and passes an `onClose` callback.\n\n' +
          '---\n\n' +
          '## Behaviour\n\n' +
          '- Renders a full-height backdrop + a right-anchored sheet (max 400 px wide).\n' +
          '- Focuses the **close button** when `isOpen` becomes `true`.\n' +
          '- Returns focus to `triggerRef` when closed (button, backdrop click, or **Escape**).\n' +
          '- Locks `document.body` scroll while open.\n\n' +
          '---\n\n' +
          '## Props\n\n' +
          '| Prop | Type | Default | Description |\n' +
          '|---|---|---|---|\n' +
          '| `isOpen` | `boolean` | — | Controls visibility |\n' +
          '| `onClose` | `() => void` | — | Called when the drawer requests to close |\n' +
          '| `navItems` | `SiteNavItem[]` | `[]` | Nav links shown as large display text |\n' +
          '| `logo` | `ReactNode` | — | Optional logo at the bottom of the sheet |\n' +
          '| `id` | `string` | `"nav-drawer"` | DOM id — use as `aria-controls` on the trigger |\n' +
          '| `triggerRef` | `RefObject<HTMLElement>` | — | Focus target after close |\n' +
          '| `label` | `string` | `"Navigation menu"` | `aria-label` on the dialog |\n\n' +
          '---\n\n' +
          '## Design Tokens\n\n' +
          '| Property | Token | Value |\n' +
          '|---|---|---|\n' +
          '| Sheet background | `--color-white` | `#ffffff` |\n' +
          '| Internal links | `--color-neutral-black` | `#191919` |\n' +
          '| External links | `--color-text-link` | `#284cca` |\n' +
          '| Focus ring | `--color-border-focus` | `#284cca` |\n',
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
 * Default — click "Open drawer" to see the side-sheet with a mix of internal and external links.
 */
export const Default: Story = {
  render: () => <DrawerDemo />,
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
export const Open: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
      <NavDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={defaultNavItems}
        logo={<DemoLogo />}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Drawer rendered pre-opened. Close it with the ✕ button or Escape key.',
      },
    },
  },
};
