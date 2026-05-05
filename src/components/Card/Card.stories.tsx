import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

// ---------------------------------------------------------------------------
// Sample image (Figma placeholder — replace with a real asset in production)
// ---------------------------------------------------------------------------
const SAMPLE_IMAGE = 'https://www.figma.com/api/mcp/asset/7dd3d303-56a5-4233-95d3-3dd2fc60d4f3';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Content card with image, title, optional description, read time, and a data-date chip.\n\n' +
          '---\n\n' +
          '## Hover behavior\n\n' +
          '**Vertical** — on hover:\n' +
          '- The data chip slides up from below the image into the image area.\n' +
          '- The title gains a 2 px underline on each wrapped line.\n\n' +
          '**Horizontal** — on hover:\n' +
          '- Only the title underline appears; the chip is statically visible in the content area.\n\n' +
          '---\n\n' +
          '## Layout orientations\n\n' +
          '`vertical` (default) — stacked image + content. Place in a CSS grid or flex row to control width.\n\n' +
          '`horizontal` — image on the left (337 × 240 px), content on the right.',
      },
    },
  },
  args: {
    image: SAMPLE_IMAGE,
    imageAlt: 'Brooklyn brownstone buildings',
    title: 'COVID-19 Wage Loss Analysis across NYC',
    description: 'description value that has to be at least one line but can be two lines',
    readTime: '7 min',
    dataDate: '2023 data',
    orientation: 'vertical',
  },
  argTypes: {
    image: { control: 'text', description: 'URL of the card image.' },
    imageAlt: { control: 'text', description: 'Alt text for the image.' },
    title: { control: 'text', description: 'Card heading.' },
    description: {
      control: 'text',
      description: 'Optional body text. Clamped to 2 lines.',
    },
    readTime: {
      control: 'text',
      description: 'Optional read-time label, e.g. `"7 min"`.',
    },
    dataDate: {
      control: 'text',
      description:
        'Optional chip label. Vertical: slides into image on hover. Horizontal: static above title.',
    },
    chipHref: {
      control: 'text',
      description:
        'URL the chip navigates to when clicked (e.g. findings page pre-filtered to this data year). Renders the chip as `<a>`.',
    },
    onChipClick: {
      action: 'chipClick',
      description:
        'Click handler fired when the chip is clicked. Use instead of `chipHref` when the card also has an `href` (avoids nested anchors).',
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: '`vertical` (default) or `horizontal`.',
    },
    href: { control: 'text', description: 'When set, the card renders as an `<a>` element.' },
    className: { control: 'text', description: 'Extra Tailwind classes on the root element.' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  name: 'Playground',
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Default state — Desktop (Two-line title + description)
// ---------------------------------------------------------------------------
export const DefaultDesktop: Story = {
  name: 'Default — Desktop',
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// No description
// ---------------------------------------------------------------------------
export const NoDescription: Story = {
  name: 'No description',
  args: { description: undefined },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// No data chip
// ---------------------------------------------------------------------------
export const NoDataChip: Story = {
  name: 'No data chip',
  args: { dataDate: undefined },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Minimal (title + read time only)
// ---------------------------------------------------------------------------
export const Minimal: Story = {
  name: 'Minimal (title + read time)',
  args: { description: undefined, dataDate: undefined },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// As link
// ---------------------------------------------------------------------------
export const AsLink: Story = {
  name: 'As link (href)',
  args: { href: '#' },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Chip as link to findings page (data year filter)
// ---------------------------------------------------------------------------
export const ChipAsLink: Story = {
  name: 'Chip linked to findings page',
  parameters: {
    docs: {
      description: {
        story:
          'The data year chip links to the findings page pre-filtered by data year. ' +
          'The chip click does **not** bubble up to the card — both targets are independent. ' +
          'Use `chipHref` when the card itself is not a link; use `onChipClick` when the card ' +
          'also has an `href` (avoids nested `<a>` elements).',
      },
    },
  },
  args: {
    chipHref: '/findings?dataYear=2023',
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card {...args} />
    </div>
  ),
};

export const ChipWithClickHandler: Story = {
  name: 'Chip with click handler (card also linked)',
  parameters: {
    docs: {
      description: {
        story:
          'When the card has its own `href`, pass `onChipClick` instead of `chipHref` to avoid ' +
          'nesting `<a>` inside `<a>`. The handler receives the click event; navigate ' +
          'programmatically (e.g. `router.push`) from there.',
      },
    },
  },
  args: {
    href: '#article',
    onChipClick: undefined, // wired via actions in Storybook
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card
        {...args}
        onChipClick={(e) => {
          e.stopPropagation();
          // In a real app: router.push('/findings?dataYear=2023')
          alert('Navigate to: /findings?dataYear=2023');
        }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Horizontal layout
// ---------------------------------------------------------------------------
export const Horizontal: Story = {
  name: 'Horizontal',
  args: { orientation: 'horizontal' },
  render: (args) => (
    <div style={{ width: 690 }}>
      <Card {...args} />
    </div>
  ),
};

export const HorizontalNoDescription: Story = {
  name: 'Horizontal — no description',
  args: { orientation: 'horizontal', description: undefined },
  render: (args) => (
    <div style={{ width: 690 }}>
      <Card {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Grid — 4-column desktop (mirrors the Figma overview layout)
// ---------------------------------------------------------------------------
export const GridDesktop: Story = {
  name: 'Grid — 4 column desktop',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 320px)', gap: 24 }}>
      {/* Two-line + description */}
      <Card
        image={SAMPLE_IMAGE}
        title="COVID-19 Wage Loss Analysis across NYC"
        description="description value that has to be at least one line but can be two lines"
        readTime="7 min"
        dataDate="2023 data"
      />
      {/* Two-line, no description */}
      <Card
        image={SAMPLE_IMAGE}
        title="COVID-19 Wage Loss Analysis across NYC"
        readTime="7 min"
        dataDate="2023 data"
      />
      {/* One-line, no description */}
      <Card
        image={SAMPLE_IMAGE}
        title="COVID-19 Wage Loss Analysis"
        readTime="7 min"
        dataDate="2023 data"
      />
      {/* One-line + description */}
      <Card
        image={SAMPLE_IMAGE}
        title="COVID-19 Wage Loss Analysis"
        description="description value that has to be at least one line but can be two lines"
        readTime="7 min"
        dataDate="2023 data"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Grid — horizontal cards
// ---------------------------------------------------------------------------
export const GridHorizontal: Story = {
  name: 'Grid — horizontal cards',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card
        image={SAMPLE_IMAGE}
        orientation="horizontal"
        title="COVID-19 Wage Loss Analysis across NYC"
        description="description value that has to be at least one line but can be two lines"
        readTime="7 min"
        dataDate="2023 data"
      />
      <Card
        image={SAMPLE_IMAGE}
        orientation="horizontal"
        title="COVID-19 Wage Loss Analysis across NYC"
        readTime="7 min"
        dataDate="2023 data"
      />
      <Card
        image={SAMPLE_IMAGE}
        orientation="horizontal"
        title="COVID-19 Wage Loss Analysis"
        description="description value that has to be at least one line but can be two lines"
        readTime="7 min"
        dataDate="2023 data"
      />
    </div>
  ),
};
