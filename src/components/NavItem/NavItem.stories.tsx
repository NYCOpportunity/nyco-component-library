import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { NavItem } from './NavItem';

// ---------------------------------------------------------------------------
// Token / spec panel
// ---------------------------------------------------------------------------
function NavItemTokenPanel() {
  const label: React.CSSProperties = {
    fontFamily: 'Public Sans, sans-serif',
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#aaaaaa',
    margin: '16px 0 6px',
  };
  const table: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' };
  const th: React.CSSProperties = {
    textAlign: 'left',
    fontSize: '0.625rem',
    fontWeight: 600,
    color: '#aaaaaa',
    padding: '0 12px 4px 0',
    borderBottom: '1px solid #eeeeee',
  };
  const td: React.CSSProperties = {
    fontSize: '0.6875rem',
    color: '#333333',
    padding: '5px 12px 5px 0',
    borderBottom: '1px solid #f5f5f5',
    verticalAlign: 'middle',
  };
  const mono: React.CSSProperties = {
    fontFamily: 'monospace',
    color: '#3f5bbf',
    fontSize: '0.6875rem',
  };

  const rows = [
    { property: 'Default text', variable: '--color-neutral-black', value: '#191919' },
    { property: 'External text', variable: '--color-text-link', value: '#284cca' },
    { property: 'Active / hover border', variable: '--color-primary-base', value: '#050560' },
    { property: 'External active / hover border', variable: '--color-text-link', value: '#284cca' },
    { property: 'Focus background', variable: '--color-primary-base', value: '#050560' },
    { property: 'Focus text', variable: '--color-primary-foreground', value: '#ffffff' },
    { property: 'Focus border-radius', variable: '--border-radius-base', value: '4px' },
    { property: 'Focus ring', variable: '(none — background fill used)', value: '—' },
  ];

  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif', marginTop: 24 }}>
      <div style={label}>Color Tokens</div>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Property</th>
            <th style={th}>Variable</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.property}>
              <td style={td}>{row.property}</td>
              <td style={{ ...td, ...mono }}>{row.variable}</td>
              <td style={td}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof NavItem> = {
  title: 'Components/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A single **NavItem** — the individual link used inside a top-level navigation bar (see',
          '`SiteNavigation`). It renders as an `<a>` when `href` is provided and a',
          '`<button type="button">` otherwise, with built-in active, dropdown, and external variants.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Notes |',
          '| --- | --- | --- |',
          '| Label | `label` | Required text of the link. |',
          '| Target | `href` | Renders `<a>` when set; `<button>` when omitted. |',
          '| Active marker | `active` | Persistent 5 px `--color-primary-base` bottom border + `aria-current="page"`. |',
          '| Dropdown chevron | `hasDropdown` | Appends an `expand_more` chevron — use for mega-menu triggers. |',
          '| External arrow | `external` | Link-color text + `north_east` arrow; opens in a new tab. |',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { NavItem } from "@nycopportunity/component-library";',
          '',
          '<NavItem label="About" href="/about" active />',
          '<NavItem label="Programs" href="/programs" hasDropdown />',
          '<NavItem label="NYC.gov" href="https://nyc.gov" external />',
          '',
          '// As a button (no href)',
          '<NavItem label="Menu" hasDropdown onClick={() => toggleMenu()} />',
          '```',
          '',
          '---',
          '',
          '## States',
          '',
          '| State | Visual |',
          '| --- | --- |',
          '| Default | Plain text, no decoration. |',
          '| Hover | 5 px bottom border (primary color, or link color when `external`). |',
          '| Active | Same 5 px bottom border, persistent. |',
          '| Focus-visible | Filled `--color-primary-base` background, foreground text, 4 px radius, no border. |',
          '',
          '---',
          '',
          '## Accessibility',
          '',
          '- `aria-current="page"` is set on the anchor/button when `active` is `true`.',
          '- External links add `target="_blank" rel="noopener noreferrer"` plus a visually-hidden',
          '  "(opens in a new tab)" label for screen readers.',
          '- The transparent 5 px bottom border is always present, so there is no layout shift between',
          '  the default and hover/active states.',
        ].join('\n'),
      },
    },
  },
  args: {
    label: 'Nav item',
    href: '#',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

// Shared bg for stories to match the nav bar context
const navBg: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  background: '#f5f5f5',
  padding: '0 8px',
};

/** Default — no decoration, black text. */
export const Default: Story = {};

/**
 * Hover — 5 px `--color-primary-base` bottom border.
 * Simulated visually; interact with the item to see the live CSS state.
 */
export const Hover: Story = {
  args: {
    // Force the hover appearance via className override
    className: 'border-b-[var(--color-primary-base)]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Visual simulation of the hover state. ' +
          'Mouse over the live canvas to see the CSS `:hover` state in action.',
      },
    },
  },
};

/**
 * Hover with dropdown chevron.
 */
export const HoverWithDropdown: Story = {
  args: {
    hasDropdown: true,
    className: 'border-b-[var(--color-primary-base)]',
  },
};

/**
 * Focus — filled `--color-primary-base` background, white text, 4 px radius.
 * Simulated visually; use keyboard Tab to see the live CSS `:focus-visible` state.
 */
export const Focus: Story = {
  args: {
    className:
      'bg-[var(--color-primary-base)] text-[var(--color-primary-foreground)] rounded-[var(--border-radius-base)] ![border-bottom-color:transparent]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Visual simulation of the focus-visible state. ' +
          'Tab to the item with a keyboard to see the live CSS `:focus-visible` state in action.',
      },
    },
  },
};

/**
 * Focus with dropdown chevron.
 */
export const FocusWithDropdown: Story = {
  args: {
    hasDropdown: true,
    className:
      'bg-[var(--color-primary-base)] text-[var(--color-primary-foreground)] rounded-[var(--border-radius-base)] ![border-bottom-color:transparent]',
  },
};

/** Selected / active — persistent 5 px `--color-primary-base` bottom border. */
export const Selected: Story = {
  args: { active: true },
};

/** Selected with dropdown chevron. */
export const SelectedWithDropdown: Story = {
  args: { active: true, hasDropdown: true },
};

/** External link out — `--color-text-link` text + north-east arrow icon. */
export const ExternalLinkOut: Story = {
  args: {
    external: true,
    href: 'https://example.com',
  },
};

/**
 * External link out hover — `--color-text-link` border on hover.
 * Simulated visually.
 */
export const ExternalLinkOutHover: Story = {
  args: {
    external: true,
    href: 'https://example.com',
    className: 'border-b-[var(--color-text-link)]',
  },
};

/** Button mode — no `href`, renders as `<button type="button">`. */
export const ButtonMode: Story = {
  args: { href: undefined },
};

/**
 * All states side-by-side — mirrors the Figma documentation grid.
 * Left column: no icon  ·  Right column: with icon / chevron.
 */
export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All nav item states shown together, matching the Figma design documentation grid. ' +
          'Hover/focus states are visually simulated via className override.',
      },
    },
  },
  render: (args) => {
    const row: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      marginBottom: 4,
    };
    const label: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.625rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      color: '#aaaaaa',
      paddingLeft: 8,
    };
    const hoverClass = 'border-b-[var(--color-primary-base)]';
    const focusClass =
      'bg-[var(--color-primary-base)] text-[var(--color-primary-foreground)] rounded-[var(--border-radius-base)] ![border-bottom-color:transparent]';
    const externalHoverClass = 'border-b-[var(--color-text-link)]';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Default */}
        <div style={row}>
          <span style={label}>Default</span>
          <div style={navBg}>
            <NavItem {...args} label="Nav item" />
            <NavItem {...args} label="Nav item" hasDropdown />
          </div>
        </div>
        {/* Hover */}
        <div style={row}>
          <span style={label}>Hover</span>
          <div style={navBg}>
            <NavItem {...args} label="Nav item" className={hoverClass} />
            <NavItem {...args} label="Nav item" hasDropdown className={hoverClass} />
          </div>
        </div>
        {/* Focus */}
        <div style={row}>
          <span style={label}>Focus</span>
          <div style={navBg}>
            <NavItem {...args} label="Nav item" className={focusClass} />
            <NavItem {...args} label="Nav item" hasDropdown className={focusClass} />
          </div>
        </div>
        {/* Selected */}
        <div style={row}>
          <span style={label}>Selected</span>
          <div style={navBg}>
            <NavItem {...args} label="Nav item" active />
            <NavItem {...args} label="Nav item" active hasDropdown />
          </div>
        </div>
        {/* Link out */}
        <div style={row}>
          <span style={label}>Link out</span>
          <div style={navBg}>
            <NavItem {...args} label="Nav item" external href="https://example.com" />
          </div>
        </div>
        {/* Link out hover */}
        <div style={row}>
          <span style={label}>Link out Hover</span>
          <div style={navBg}>
            <NavItem
              {...args}
              label="Nav item"
              external
              href="https://example.com"
              className={externalHoverClass}
            />
          </div>
        </div>
        <NavItemTokenPanel />
      </div>
    );
  },
};
