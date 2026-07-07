import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Icon } from './Icon';
import { iconNames, IconName } from './icons';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Central catalogue of every SVG icon used across the library. Icons inherit their color from `currentColor`, so set a text color on the icon or an ancestor to recolor them. Use the **Gallery** story to browse all available glyphs.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Which glyph to render.',
    },
    size: {
      control: { type: 'number', min: 12, max: 96, step: 2 },
      description: 'Width and height in pixels.',
    },
    color: {
      control: 'color',
      description: 'Icon color (maps to `currentColor`).',
    },
    title: {
      control: 'text',
      description: 'Accessible label. When set, the icon is exposed to assistive tech.',
    },
  },
  args: {
    name: 'search',
    size: 24,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground — a single, fully controllable icon
// ---------------------------------------------------------------------------
export const Playground: Story = {
  render: (args) => <Icon {...args} />,
};

// ---------------------------------------------------------------------------
// Gallery — every icon in the registry
// ---------------------------------------------------------------------------
export const Gallery: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '12px',
      }}
    >
      {iconNames.map((name: IconName) => (
        <figure
          key={name}
          style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            padding: '20px 12px',
            border: '1px solid var(--color-neutral-300, #ddd)',
            borderRadius: '8px',
            color: args.color ?? 'var(--color-neutral-black, #191919)',
            textAlign: 'center',
          }}
        >
          <Icon name={name} size={args.size ?? 32} />
          <figcaption
            style={{
              fontSize: '12px',
              fontFamily: 'monospace',
              color: 'var(--color-neutral-700, #777)',
              wordBreak: 'break-word',
            }}
          >
            {name}
          </figcaption>
        </figure>
      ))}
    </div>
  ),
  args: {
    size: 32,
  },
};

// ---------------------------------------------------------------------------
// Sizes — the same glyph at a range of sizes
// ---------------------------------------------------------------------------
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      {[16, 24, 32, 48, 64].map((size) => (
        <div
          key={size}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <Icon name={args.name} size={size} />
          <span style={{ fontSize: '12px', color: 'var(--color-neutral-700, #777)' }}>
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
  args: {
    name: 'info',
  },
};

// ---------------------------------------------------------------------------
// Colors — icons follow currentColor
// ---------------------------------------------------------------------------
export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      {[
        { label: 'Primary', color: 'var(--color-primary-base, #050560)' },
        { label: 'Success', color: 'var(--color-success-base, #008703)' },
        { label: 'Warning', color: 'var(--color-warning-base, #ff8320)' },
        { label: 'Error', color: 'var(--color-error-base, #ec131e)' },
      ].map(({ label, color }) => (
        <div
          key={label}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ color }}>
            <Icon name={args.name} size={32} />
          </span>
          <span style={{ fontSize: '12px', color: 'var(--color-neutral-700, #777)' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    name: 'success',
  },
};
