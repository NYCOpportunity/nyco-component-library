import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

// ---------------------------------------------------------------------------
// Token Panel — shown below each story in the Docs tab
// ---------------------------------------------------------------------------

function BreadcrumbsTokenPanel() {
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

  const colorTokens = [
    {
      property: 'Text — links & current page',
      variable: '--color-neutral-black',
      value: '#191919',
    },
    { property: 'Separator icon', variable: '--color-neutral-black', value: '#191919' },
    { property: 'Dots icon', variable: '--color-neutral-black', value: '#191919' },
    { property: 'Dots icon (hover)', variable: '--color-neutral-700', value: '#777777' },
    {
      property: 'Dropdown background',
      variable: '--color-bg-primary (→ --color-neutral-white)',
      value: '#ffffff',
    },
    {
      property: 'Dropdown border',
      variable: '--color-border-default (→ --color-neutral-300)',
      value: '#dddddd',
    },
  ];

  const textTokens = [
    { property: 'Font family', token: '--font-primary', value: 'Public Sans, sans-serif' },
    { property: 'Parent link — size', token: 'ui-14-bold', value: '0.875rem / 14px' },
    { property: 'Parent link — line height', token: 'ui-14-bold', value: '160%' },
    { property: 'Parent link — weight', token: 'ui-14-bold', value: '600 (semibold)' },
    { property: 'Current page — size', token: 'ui-14-regular', value: '0.875rem / 14px' },
    { property: 'Current page — line height', token: 'ui-14-regular', value: '160%' },
    { property: 'Current page — weight', token: 'ui-14-regular', value: '400 (regular)' },
    { property: 'Dropdown items — weight', token: 'ui-14-regular', value: '400 (regular)' },
    { property: 'Dropdown border radius', token: '--border-radius-base', value: '0.25rem / 4px' },
  ];

  return (
    <div
      style={{
        marginTop: 24,
        borderTop: '1px solid #eeeeee',
        paddingTop: 16,
        fontFamily: 'Public Sans, sans-serif',
      }}
    >
      {/* Color tokens */}
      <p style={label}>Color Tokens</p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Property</th>
            <th style={th}>CSS Variable</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {colorTokens.map((t) => (
            <tr key={t.property}>
              <td style={td}>{t.property}</td>
              <td style={{ ...td, ...mono }}>{t.variable}</td>
              <td style={td}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      backgroundColor: t.value,
                      border: '1px solid rgba(0,0,0,0.1)',
                      flexShrink: 0,
                    }}
                  />
                  <span style={mono}>{t.value}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Typography tokens */}
      <p style={label}>Typography Tokens</p>
      <table style={{ ...table, marginBottom: 4 }}>
        <thead>
          <tr>
            <th style={th}>Property</th>
            <th style={th}>Token / Class</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {textTokens.map((t) => (
            <tr key={t.property}>
              <td style={td}>{t.property}</td>
              <td style={{ ...td, ...mono }}>{t.token}</td>
              <td style={{ ...td, ...mono }}>{t.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Section', href: '#' },
      { label: 'Current Page' },
    ],
  },
  decorators: [
    (
      Story: React.ComponentType,
      context: { viewMode: string; parameters: Record<string, unknown> }
    ) => {
      if (context.viewMode !== 'docs' || context.parameters.hideTokenPanel) {
        return <Story />;
      }
      return (
        <div>
          <Story />
          <BreadcrumbsTokenPanel />
        </div>
      );
    },
  ],
  argTypes: {
    items: {
      control: 'object',
      description:
        'Ordered list of breadcrumb items. Each item has a `label` (string) and an optional `href` (string). The last item is treated as the current page.',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OneItem: Story = {
  args: {
    items: [{ label: 'Current Page' }],
  },
};

export const TwoItems: Story = {
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Current Page' }],
  },
};

export const ThreeItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Section', href: '#' },
      { label: 'Current Page' },
    ],
  },
};

export const Overflow: Story = {
  parameters: { hideTokenPanel: true },
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Section', href: '#' },
      { label: 'Subsection', href: '#' },
      { label: 'Current Page' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 220, minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Deep overflow — five levels deep collapsed into an ellipsis.
 * Hover the dots to reveal all hidden levels.
 */
export const DeepOverflow: Story = {
  parameters: { hideTokenPanel: true },
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Level 2', href: '#' },
      { label: 'Level 3', href: '#' },
      { label: 'Level 4', href: '#' },
      { label: 'Current Page' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 220, minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Full matrix — all states from the Figma spec.
 */
export const AllStates: Story = {
  args: { items: [] },
  parameters: { layout: 'padded', hideTokenPanel: true },
  render: () => {
    const row: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '12px 0',
      borderBottom: '1px solid #f0f0f0',
    };
    const label: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#777',
      width: 180,
      flexShrink: 0,
    };
    return (
      <div style={{ fontFamily: 'Public Sans, sans-serif', padding: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#191919', marginBottom: 24 }}>
          Breadcrumbs / All States
        </h2>
        <div style={row}>
          <span style={label}>1 item</span>
          <Breadcrumbs items={[{ label: 'Current Page' }]} />
        </div>
        <div style={row}>
          <span style={label}>2 items</span>
          <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Current Page' }]} />
        </div>
        <div style={row}>
          <span style={label}>3 items</span>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '#' },
              { label: 'Section', href: '#' },
              { label: 'Current Page' },
            ]}
          />
        </div>
        <div style={row}>
          <span style={label}>Overflow (4 items)</span>
          <div style={{ width: 220 }}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '#' },
                { label: 'Section', href: '#' },
                { label: 'Subsection', href: '#' },
                { label: 'Current Page' },
              ]}
            />
          </div>
        </div>
        <div style={{ ...row, borderBottom: 'none', paddingBottom: 100 }}>
          <span style={label}>Deep overflow (5 items)</span>
          <div style={{ width: 220 }}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '#' },
                { label: 'Level 2', href: '#' },
                { label: 'Level 3', href: '#' },
                { label: 'Level 4', href: '#' },
                { label: 'Current Page' },
              ]}
            />
          </div>
        </div>
      </div>
    );
  },
};
