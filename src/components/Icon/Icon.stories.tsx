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
        component: [
          'The **Icon** component renders any glyph from the shared icon registry \u2014 a central',
          '`name \u2192 SVG` catalogue used across the whole library. It supplies the wrapping `<svg>`',
          'element; each registry entry provides its own `viewBox` and inner markup with fills and',
          'strokes normalised to `currentColor`, so an icon inherits the surrounding text color.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Prop | Type | Default | Notes |',
          '| --- | --- | --- | --- |',
          '| `name` | `IconName` | \u2014 | Which glyph to render. Must be a key in the registry (see the catalogue below). |',
          '| `size` | `number \\| string` | `24` | Width and height in px \u2014 icons are square. |',
          '| `title` | `string` | \u2014 | Accessible label. When set, the icon is exposed as an image; when omitted it is decorative. |',
          '| \u2026SVG props | `SVGProps<SVGSVGElement>` | \u2014 | Any other SVG attribute (`className`, `style`, `onClick`, etc.) is spread onto the `<svg>`. |',
          '',
          '### The `name` catalogue',
          '',
          'Available glyphs (browse them live in the **Gallery** story):',
          '',
          '`add`, `check`, `checkbox-blank`, `checkbox-checked`, `radio-blank`, `radio-checked`,',
          '`chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`, `chevron-right-thin`,',
          '`close`, `close-thin`, `close-small`, `dots`, `north-east`, `info`, `info-circle`,',
          '`success`, `warning`, `search`, `menu`, `translate`, `dismiss`.',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { Icon } from "@nycopportunity/component-library";',
          '',
          '// Decorative \u2014 hidden from assistive tech (aria-hidden)',
          '<Icon name="search" size={20} />',
          '',
          '// Meaningful \u2014 exposed as an image with an accessible label',
          '<Icon name="warning" title="Warning" />',
          '',
          '// Recolor via currentColor (a text color on the icon or an ancestor)',
          '<span className="text-[var(--color-text-link)]">',
          '  <Icon name="north-east" />',
          '</span>',
          '```',
          '',
          '---',
          '',
          '## Sizing & color',
          '',
          '- **Size** \u2014 pass a single `size` (px) applied to both width and height; icons are square.',
          '- **Color** \u2014 all paths use `currentColor`, so set `color` (or a `text-*` class) on the icon',
          '  or any ancestor to recolor it. There is no `color` prop on the component itself.',
          '',
          '---',
          '',
          '## Accessibility',
          '',
          '- Without `title`, the `<svg>` gets `aria-hidden="true"` and is treated as decorative.',
          '- With `title`, the `<svg>` gets `role="img"` + `aria-label`, and renders a `<title>` child.',
          '- `focusable="false"` is always set so the icon is never a tab stop (IE/Edge legacy safety).',
        ].join('\n'),
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
