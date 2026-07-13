import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

// ---------------------------------------------------------------------------
// Token Panel
// ---------------------------------------------------------------------------

function TooltipTokenPanel() {
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
    { property: 'Background (dark)', variable: '--color-neutral-900', value: '#333333' },
    { property: 'Background (light)', variable: '--color-neutral-100', value: '#f5f5f5' },
    { property: 'Text (light)', variable: '--color-neutral-black', value: '#191919' },
  ];

  const typographyTokens = [
    { property: 'Font family', value: 'Public Sans' },
    { property: 'Font size', value: '14px' },
    { property: 'Line height', value: '1.6' },
    { property: 'Font weight — title', value: '600 (SemiBold)' },
    { property: 'Font weight — body', value: '400 (Regular)' },
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
      <p style={label}>Icon</p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Property</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>Width</td>
            <td style={{ ...td, ...mono }}>22px</td>
          </tr>
          <tr>
            <td style={td}>Height</td>
            <td style={{ ...td, ...mono }}>22px</td>
          </tr>
          <tr>
            <td style={td}>Fill color (default)</td>
            <td style={td}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    backgroundColor: '#191919',
                    border: '1px solid rgba(0,0,0,0.1)',
                    flexShrink: 0,
                  }}
                />
                <span style={mono}>#191919</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>

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

      <p style={label}>Typography Tokens</p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Property</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {typographyTokens.map((t) => (
            <tr key={t.property}>
              <td style={td}>{t.property}</td>
              <td style={{ ...td, ...mono }}>{t.value}</td>
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

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'grey',
      values: [{ name: 'grey', value: '#e8e8e8' }],
    },
    docs: {
      description: {
        component: [
          'A small **floating label** that explains an element on hover or focus. Use it for',
          'terse hints, definitions, or icon clarifications. By default it renders a built-in',
          'info (ⓘ) icon as the trigger, but you can wrap any element instead.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Prop | Type | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| `content` | `React.ReactNode` | ✅ | The tooltip body text. |',
          '| `title` | `string` | — | Optional bold heading; switches to the richer two-line style. |',
          '| `mode` | `"dark" \\| "light"` | — | `dark` *(default)* dark bg/white text; `light` light bg/dark text. |',
          '| `placement` | `TooltipPlacement` | — | Preferred side: `top` *(default)*, `bottom`, `left`, `right`. |',
          '| `children` | `React.ReactElement` | — | Custom trigger element. Defaults to the info icon. |',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { Tooltip } from "@nycopportunity/component-library";',
          '',
          '// Default info-icon trigger',
          '<Tooltip content="Median wage across all boroughs." />',
          '',
          '// Rich tooltip on a custom trigger, placed to the right',
          '<Tooltip title="Data source" content="ACS 5-year estimates" placement="right">',
          '  <button aria-label="About this metric">?</button>',
          '</Tooltip>',
          '```',
          '',
          '## Placement',
          '',
          '`placement` sets the preferred side. The tooltip is portaled to `document.body` and',
          'measures itself, then **auto-flips** to whichever side has the least viewport overflow',
          '(falling back through the other sides). A caret always points back at the trigger, and',
          'the position stays anchored while the page scrolls or resizes.',
          '',
          '## Accessibility',
          '',
          '- The floating panel uses `role="tooltip"` and is linked to the trigger via',
          '  `aria-describedby` while visible.',
          '- Opens on both **hover** and **keyboard focus**, and closes on mouse-leave / blur.',
          '- When relying on the default info icon, ensure surrounding context makes the meaning clear;',
          '  for custom triggers, give the trigger its own accessible name.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    placement: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
    },
    mode: {
      control: 'radio',
      options: ['dark', 'light'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ---------------------------------------------------------------------------
// Default — all controls wired up
// ---------------------------------------------------------------------------
export const Default: Story = {
  args: {
    content: 'Simple tooltip text',
    placement: 'top',
    mode: 'dark',
  },
  render: (args) => (
    <div>
      <div style={{ padding: 80 }}>
        <Tooltip {...args} />
      </div>
      <TooltipTokenPanel />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Placement variants
// ---------------------------------------------------------------------------
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 80, padding: 100 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <div
          key={p}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          <p
            style={{
              fontFamily: 'Public Sans, sans-serif',
              fontSize: 12,
              color: '#555555',
              margin: 0,
              textTransform: 'capitalize',
            }}
          >
            {p}
          </p>
          <Tooltip content="Tooltip text" placement={p} />
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Light vs Dark mode
// ---------------------------------------------------------------------------
const itemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
};
const itemLabel: React.CSSProperties = {
  fontFamily: 'Public Sans, sans-serif',
  fontSize: 12,
  color: '#555555',
  margin: 0,
};

export const Modes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100 }}>
      <div style={itemStyle}>
        <p style={itemLabel}>Dark</p>
        <Tooltip content="Dark tooltip" mode="dark" placement="top" />
      </div>
      <div style={itemStyle}>
        <p style={itemLabel}>Light</p>
        <Tooltip content="Light tooltip" mode="light" placement="top" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Rich tooltip (title + body)
// ---------------------------------------------------------------------------
export const Rich: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100, flexWrap: 'wrap' }}>
      <div style={itemStyle}>
        <p style={itemLabel}>Dark · top</p>
        <Tooltip title="Title" content="Rich tool tip text here" mode="dark" placement="top" />
      </div>
      <div style={itemStyle}>
        <p style={itemLabel}>Light · top</p>
        <Tooltip title="Title" content="Rich tool tip text here" mode="light" placement="top" />
      </div>
      <div style={itemStyle}>
        <p style={itemLabel}>Dark · right</p>
        <Tooltip title="Title" content="Rich tool tip text here" mode="dark" placement="right" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With title — plain tooltip with a title label
// ---------------------------------------------------------------------------
export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 80, padding: 100 }}>
      <div style={itemStyle}>
        <p style={itemLabel}>Dark · top</p>
        <Tooltip title="Hint" content="Dark tooltip with title" mode="dark" placement="top" />
      </div>
      <div style={itemStyle}>
        <p style={itemLabel}>Light · top</p>
        <Tooltip title="Hint" content="Light tooltip with title" mode="light" placement="top" />
      </div>
      <div style={itemStyle}>
        <p style={itemLabel}>Dark · right</p>
        <Tooltip title="Hint" content="Opens to the right" mode="dark" placement="right" />
      </div>
      <div style={itemStyle}>
        <p style={itemLabel}>Dark · bottom</p>
        <Tooltip title="Hint" content="Opens to the bottom" mode="dark" placement="bottom" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Long content — text wraps inside the paper
// ---------------------------------------------------------------------------
export const LongContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100, flexWrap: 'wrap' }}>
      <div style={itemStyle}>
        <p style={itemLabel}>Dark · top</p>
        <Tooltip
          content="This tooltip has longer body text that wraps inside the paper without overflowing or expanding beyond the maximum defined width."
          mode="dark"
          placement="top"
        />
      </div>
      <div style={itemStyle}>
        <p style={itemLabel}>Light · top</p>
        <Tooltip
          content="Light mode tooltip with enough words to trigger wrapping so the paper stays compact and readable."
          mode="light"
          placement="top"
        />
      </div>
      <div style={itemStyle}>
        <p style={itemLabel}>Dark · top · with title</p>
        <Tooltip
          title="With title"
          content="A rich tooltip where both the body wraps to the next line and the title stays on its own line."
          mode="dark"
          placement="top"
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom trigger — shows that any element can be used as trigger
// ---------------------------------------------------------------------------
export const CustomTrigger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100, alignItems: 'center' }}>
      <div style={itemStyle}>
        <p style={itemLabel}>Dark · top · rich</p>
        <Tooltip title="Title" content="Rich tooltip on a button" mode="dark" placement="top">
          <Button variant="secondary" size="small">
            Button trigger
          </Button>
        </Tooltip>
      </div>
      <div style={itemStyle}>
        <p style={itemLabel}>Light · top</p>
        <Tooltip content="Plain tooltip on a button" mode="light" placement="top">
          <Button variant="primary" size="small">
            Light
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
};
