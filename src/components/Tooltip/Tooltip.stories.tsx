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
        <Tooltip key={p} content="Tooltip text" placement={p} />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Light vs Dark mode
// ---------------------------------------------------------------------------
export const Modes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100 }}>
      <Tooltip content="Dark tooltip" mode="dark" placement="top" />
      <Tooltip content="Light tooltip" mode="light" placement="top" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Rich tooltip (title + body)
// ---------------------------------------------------------------------------
export const Rich: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100, flexWrap: 'wrap' }}>
      <Tooltip title="Title" content="Rich tool tip text here" mode="dark" placement="top" />
      <Tooltip title="Title" content="Rich tool tip text here" mode="light" placement="top" />
      <Tooltip title="Title" content="Rich tool tip text here" mode="dark" placement="right" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With title — plain tooltip with a title label
// ---------------------------------------------------------------------------
export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 80, padding: 100 }}>
      <Tooltip title="Hint" content="Dark tooltip with title" mode="dark" placement="top" />
      <Tooltip title="Hint" content="Light tooltip with title" mode="light" placement="top" />
      <Tooltip title="Hint" content="Opens to the right" mode="dark" placement="right" />
      <Tooltip title="Hint" content="Opens to the bottom" mode="dark" placement="bottom" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Long content — text wraps inside the paper
// ---------------------------------------------------------------------------
export const LongContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100, flexWrap: 'wrap' }}>
      <Tooltip
        content="This tooltip has longer body text that wraps inside the paper without overflowing or expanding beyond the maximum defined width."
        mode="dark"
        placement="top"
      />
      <Tooltip
        content="Light mode tooltip with enough words to trigger wrapping so the paper stays compact and readable."
        mode="light"
        placement="top"
      />
      <Tooltip
        title="With title"
        content="A rich tooltip where both the body wraps to the next line and the title stays on its own line."
        mode="dark"
        placement="top"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom trigger — shows that any element can be used as trigger
// ---------------------------------------------------------------------------
export const CustomTrigger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100, alignItems: 'center' }}>
      <Tooltip title="Title" content="Rich tooltip on a button" mode="dark" placement="top">
        <Button variant="secondary" size="small">
          Button trigger
        </Button>
      </Tooltip>
      <Tooltip content="Plain tooltip on a button" mode="light" placement="top">
        <Button variant="primary" size="small">
          Light
        </Button>
      </Tooltip>
    </div>
  ),
};
