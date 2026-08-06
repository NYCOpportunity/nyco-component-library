import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
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
          'right. It is responsive: a full nav bar on desktop and a compact bar with a',
          'hamburger-triggered `NavDrawer` on mobile.',
          '',
          '---',
          '',
          '## Nav item types',
          '',
          'Each `SiteNavItem` can render in one of three desktop styles via `navStyle`.',
          'A global default can be set on `SiteNavigation` and overridden per item.',
          '',
          '| `navStyle` | Component | When to use |',
          '| --- | --- | --- |',
          '| `"link"` (default) | `NavItem` | Standard text link with bottom-border on hover/active. |',
          '| `"chip"` | `NavItemChip` | Pill button; transparent until selected (grey bg). |',
          '| `"dropdown"` | `NavItemChipDropdown` | Chip trigger that opens a navigation panel. |',
          '',
          'A fourth style uses `NavItem` with `variant="link"` for text-underline-on-hover links',
          '(ideal for external links at the end of the bar):',
          '',
          '```tsx',
          '{ label: "NYC.gov", href: "https://nyc.gov", external: true, variant: "link" }',
          '```',
          '',
          '### Full example — mixed bar',
          '',
          '```tsx',
          'import { SiteNavigation } from "@nycopportunity/component-library";',
          '',
          '<SiteNavigation',
          '  logo={<SiteLogo />}',
          '  navItems={[',
          '    // Plain chip — toggles active state on click',
          '    { label: "Data Tool", navStyle: "chip", active: isActive, onClick: toggle },',
          '',
          '    // Dropdown chip — opens a navigation panel',
          '    {',
          '      label: "About",',
          '      navStyle: "dropdown",',
          '      active: selected === "about",',
          '      navDropdownItems: [',
          '        { label: "About Us", href: "/about" },',
          '        { label: "Reports",  href: "/reports", dividerAfter: true },',
          '        { label: "NYC.gov",  href: "https://nyc.gov", external: true },',
          '      ],',
          '    },',
          '',
          '    // Link-variant NavItem — text underline on hover',
          '    { label: "Equity NYC", href: "https://example.com", variant: "link", external: true },',
          '  ]}',
          '/>',
          '```',
          '',
          '---',
          '',
          '## Color customization',
          '',
          'Use the `colors` prop to retheme every visual segment. Each key maps to a',
          '**scoped CSS variable override** on the bar element — all child components',
          'inherit via CSS cascade with no per-component props.',
          '',
          '> **Important:** use literal hex / hsl / rgba values for `barBg` and `barBorder`.',
          '> Do not pass `var(--color-neutral-black)` as `barBg` if you are also overriding',
          '> `navText` \u2014 the variable override would change the background too.',
          '',
          '| Key | What it colors | Default |',
          '| --- | --- | --- |',
          '| `barBg` | Bar background | `#ffffff` |',
          '| `barBorder` | Bar bottom border | `var(--color-neutral-300)` |',
          '| `navText` | NavItem + chip text | `var(--color-neutral-black)` |',
          '| `navLinkText` | External / `variant="link"` text | `var(--color-text-link)` |',
          '| `navActiveIndicator` | NavItem active border / underline | `var(--color-primary-base)` |',
          '| `iconColor` | Search + hamburger icons | inherits `navText` |',
          '| `chipHoverBg` | NavItemChip hover | `var(--color-neutral-100)` |',
          '| `chipActiveBg` | NavItemChip selected | `var(--color-neutral-200)` |',
          '| `chipPressedBg` | NavItemChip press flash | `var(--color-neutral-300)` |',
          '| `dropdownBg` | Dropdown panel background | `var(--color-neutral-white)` |',
          '',
          '### Dark bar example',
          '',
          '```tsx',
          '<SiteNavigation',
          '  logo={<SiteLogo />}',
          '  navItems={[...]}',
          '  colors={{',
          '    barBg:             "#191919",          // literal black',
          '    barBorder:         "transparent",',
          '    navText:           "#ffffff",',
          '    navLinkText:       "var(--color-secondary-light)",',
          '    navActiveIndicator:"#ffffff",',
          '    iconColor:         "#ffffff",',
          '    chipHoverBg:       "rgba(255,255,255,0.10)",',
          '    chipActiveBg:      "rgba(255,255,255,0.20)",',
          '    dropdownBg:        "#333333",',
          '  }}',
          '/>',
          '```',
          '',
          '---',
          '',
          '## Responsive',
          '',
          '| Breakpoint | Layout |',
          '| --- | --- |',
          '| Desktop (\u2265 1000 px) | 68 px bar, 56 px h-padding; chips/dropdowns/links on the right. |',
          '| Mobile (< 1000 px) | 56 px compact bar; hamburger opens the `NavDrawer` side-sheet. |',
          '',
          '---',
          '',
          '## Accessibility',
          '',
          '- Rendered as a `<header>` landmark; desktop links sit inside `<nav aria-label="Site navigation">`.',
          '- Hamburger: `<button>` with `aria-label`, `aria-expanded`, `aria-controls`.',
          '- Drawer: `role="dialog" aria-modal="true"`; focus returns to hamburger on close.',
          '- External links: `target="_blank" rel="noopener noreferrer"` + visually-hidden "(opens in a new tab)".',
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

// ---------------------------------------------------------------------------
// NavItemChip stories
// ---------------------------------------------------------------------------

/**
 * ChipNav — only NavItemChips. No plain links, no dropdowns.
 */
export const ChipNav: Story = {
  args: {
    navItems: [
      { label: 'Data Tool', href: '#', navStyle: 'chip' },
      { label: 'Findings', href: '#', navStyle: 'chip' },
      { label: 'Methodology', href: '#', navStyle: 'chip', active: true },
      { label: 'Workforce Data', href: '#', navStyle: 'chip' },
    ],
  },
  parameters: {
    viewport: {
      viewports: { wide: { name: 'Wide', styles: { width: '1280px', height: '200px' } } },
      defaultViewport: 'wide',
    },
    docs: {
      description: {
        story:
          'All nav items are **`NavItemChip`** pills. Active chip keeps a light-grey background; ' +
          'hover adds `neutral-100`; press flashes `neutral-200`.',
      },
    },
  },
};

/**
 * ChipDropdownNav — only NavItemChipDropdowns. No plain links, no plain chips.
 */
export const ChipDropdownNav: Story = {
  args: {
    navItems: [
      {
        label: 'Data',
        navStyle: 'dropdown',
        navDropdownItems: [
          { label: 'Data Dashboard', href: '#' },
          { label: 'Common Metrics', href: '#' },
          { label: 'Data Notes', href: '#', dividerAfter: true },
          { label: 'Labor Market Data', href: 'https://example.com', external: true },
        ],
      },
      {
        label: 'About',
        navStyle: 'dropdown',
        navDropdownItems: [
          { label: 'About Us', href: '#' },
          { label: 'Our Team', href: '#' },
          { label: 'Reports', href: '#', dividerAfter: true },
          { label: 'NYC.gov', href: 'https://nyc.gov', external: true },
        ],
      },
      {
        label: 'Resources',
        navStyle: 'dropdown',
        navDropdownItems: [
          { label: 'Documentation', href: '#' },
          { label: 'API Reference', href: '#' },
        ],
      },
    ],
  },
  parameters: {
    viewport: {
      viewports: { wide: { name: 'Wide', styles: { width: '1280px', height: '400px' } } },
      defaultViewport: 'wide',
    },
    docs: {
      description: {
        story:
          'All nav items are **`NavItemChipDropdown`** triggers. Selecting a panel item highlights ' +
          'both the trigger chip and the chosen option. The trigger resets when another item is selected.',
      },
    },
  },
};

/**
 * MixedNavStyles — only NavItemChips and NavItemChipDropdowns (no plain NavItem links).
 * Active chip stays light grey. Dropdown trigger turns grey while open.
 */
// ---------------------------------------------------------------------------
// Interactive wrapper — tracks the selected nav item and updates active state
// ---------------------------------------------------------------------------
const CHIP_ITEMS = [
  { id: 'data-tool', label: 'Data Tool', navStyle: 'chip' as const },
  { id: 'findings', label: 'Findings', navStyle: 'chip' as const },
  { id: 'methodology', label: 'Methodology', navStyle: 'chip' as const },
];

const ABOUT_ITEMS = [
  { label: 'About Us', href: '#' },
  { label: 'Our Team', href: '#' },
  { label: 'Reports', href: '#', dividerAfter: true },
  { label: 'NYC.gov', href: 'https://nyc.gov', external: true as const },
];

const DATA_ITEMS = [
  { label: 'Data Dashboard', href: '#' },
  { label: 'Common Metrics', href: '#' },
  { label: 'Data Notes', href: '#', dividerAfter: true },
  { label: 'Labor Market Data', href: 'https://example.com', external: true as const },
];

function InteractiveChipNav() {
  const [selected, setSelected] = React.useState<string | null>(null);

  const navItems: SiteNavItem[] = [
    // Chip NavItems
    ...CHIP_ITEMS.map((item) => ({
      label: item.label,
      navStyle: item.navStyle,
      active: selected === item.id,
      onClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.preventDefault();
        setSelected((prev) => (prev === item.id ? null : item.id));
      },
    })),
    {
      label: 'About',
      navStyle: 'dropdown' as const,
      active: selected === 'about',
      navDropdownItems: ABOUT_ITEMS.map((d) => ({
        ...d,
        onClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
          e.preventDefault();
          setSelected('about');
        },
      })),
    },
    {
      label: 'Data',
      navStyle: 'dropdown' as const,
      active: selected === 'data',
      navDropdownItems: DATA_ITEMS.map((d) => ({
        ...d,
        onClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
          e.preventDefault();
          setSelected('data');
        },
      })),
    },
    // Link-variant NavItems at the end
    { label: 'NYC Poverty Atlas', href: 'https://example.com', variant: 'link', external: true },
    { label: 'Equity NYC', href: 'https://example.com', variant: 'link', external: true },
  ];

  return (
    <div>
      <SiteNavigation logo={<DemoLogo />} navItems={navItems} />
      <div
        style={{
          padding: '32px 56px',
          fontFamily: 'Public Sans, sans-serif',
          fontSize: 14,
          color: '#777',
        }}
      >
        {selected
          ? `Selected: "${selected}" — click the same item to deselect.`
          : 'Click a chip or select an item from a dropdown to highlight it.'}
      </div>
    </div>
  );
}

export const MixedNavStyles: Story = {
  render: () => <InteractiveChipNav />,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: { wide: { name: 'Wide', styles: { width: '1280px', height: '400px' } } },
      defaultViewport: 'wide',
    },
    docs: {
      description: {
        story:
          'Fully interactive example. Clicking a **chip** toggles its light-grey active state ' +
          '(click again to deselect). Choosing an item inside a **dropdown** marks its parent ' +
          'trigger as active. Only one item is active at a time. No page navigation — ' +
          '`e.preventDefault()` keeps you on the same page.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Color customization examples
// ---------------------------------------------------------------------------

function DarkBarDemo() {
  const [selected, setSelected] = React.useState<string | null>(null);

  const navItems: SiteNavItem[] = [
    ...CHIP_ITEMS.map((item) => ({
      label: item.label,
      navStyle: item.navStyle,
      active: selected === item.id,
      onClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.preventDefault();
        setSelected((prev) => (prev === item.id ? null : item.id));
      },
    })),
    {
      label: 'About',
      navStyle: 'dropdown' as const,
      active: selected === 'about',
      navDropdownItems: ABOUT_ITEMS.map((d) => ({
        ...d,
        onClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
          e.preventDefault();
          setSelected('about');
        },
      })),
    },
    {
      label: 'Data',
      navStyle: 'dropdown' as const,
      active: selected === 'data',
      navDropdownItems: DATA_ITEMS.map((d) => ({
        ...d,
        onClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
          e.preventDefault();
          setSelected('data');
        },
      })),
    },
    { label: 'NYC Poverty Atlas', href: 'https://example.com', variant: 'link', external: true },
    { label: 'Equity NYC', href: 'https://example.com', variant: 'link', external: true },
  ];

  return (
    <SiteNavigation
      logo={<DemoLogo />}
      navItems={navItems}
      colors={{
        barBg: '#191919',
        barBorder: 'transparent',
        navText: '#ffffff',
        navLinkText: 'var(--color-secondary-light)',
        navActiveIndicator: '#ffffff',
        iconColor: '#ffffff',
        chipHoverBg: 'rgba(255,255,255,0.10)',
        chipActiveBg: 'rgba(255,255,255,0.20)',
        chipPressedBg: 'rgba(255,255,255,0.30)',
        dropdownBg: '#333333',
      }}
    />
  );
}

/**
 * Dark bar — black bar with chips, dropdowns, and link-variant external items.
 * All colors customized via the `colors` prop.
 */
export const DarkBar: Story = {
  render: () => <DarkBarDemo />,
  parameters: {
    viewport: {
      viewports: { wide: { name: 'Wide', styles: { width: '1280px', height: '160px' } } },
      defaultViewport: 'wide',
    },
    docs: {
      description: {
        story:
          'All color segments overridden for a dark primary-blue bar. Each `colors` key maps to ' +
          'a scoped CSS variable override on the bar element — NavItems, chips, and dropdowns ' +
          'all inherit via CSS cascade with no per-component props needed.',
      },
    },
  },
};

/**
 * Neutral-100 bar — subtle off-white background, matching the GlobalNavigation banner.
 */
export const SubtleBar: Story = {
  args: {
    navItems: defaultNavItems,
    colors: {
      barBg: 'var(--color-neutral-100)',
      barBorder: 'var(--color-neutral-300)',
    },
  },
  parameters: {
    viewport: {
      viewports: { wide: { name: 'Wide', styles: { width: '1280px', height: '120px' } } },
      defaultViewport: 'wide',
    },
    docs: {
      description: {
        story:
          'Off-white background matching `--color-neutral-100`, useful when the nav sits above a white content area and you want a subtle visual separation.',
      },
    },
  },
};
