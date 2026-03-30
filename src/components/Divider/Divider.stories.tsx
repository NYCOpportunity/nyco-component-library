import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

// ---------------------------------------------------------------------------
// Token Panel
// ---------------------------------------------------------------------------

function DividerTokenPanel() {
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

  const tokens = [{ property: 'Color', variable: '--color-border-default', value: '#dddddd' }];

  return (
    <div
      style={{
        marginTop: 24,
        borderTop: '1px solid #eeeeee',
        paddingTop: 16,
        fontFamily: 'Public Sans, sans-serif',
      }}
    >
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
          {tokens.map((t) => (
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the divider line.',
    },
  },
  decorators: [
    (Story, context) => {
      const isVertical = context.args.orientation === 'vertical';
      return isVertical ? (
        <div style={{ display: 'flex', height: 80, alignItems: 'stretch', padding: '0 16px' }}>
          <span
            style={{ fontFamily: 'Public Sans, sans-serif', fontSize: 14, alignSelf: 'center' }}
          >
            Left
          </span>
          <div style={{ margin: '0 16px', display: 'flex', alignSelf: 'stretch' }}>
            <Story />
          </div>
          <span
            style={{ fontFamily: 'Public Sans, sans-serif', fontSize: 14, alignSelf: 'center' }}
          >
            Right
          </span>
        </div>
      ) : (
        <div style={{ width: 300, padding: '16px 0' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <div>
      <Divider {...args} />
      <DividerTokenPanel />
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div>
      <Divider {...args} />
      <DividerTokenPanel />
    </div>
  ),
};
