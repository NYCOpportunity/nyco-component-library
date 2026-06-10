import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

// ---------------------------------------------------------------------------
// Sample image placeholder
// ---------------------------------------------------------------------------
const SAMPLE_IMAGE = 'https://picsum.photos/seed/nyco/640/340';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'grey',
      values: [{ name: 'grey', value: '#eeeeee' }],
    },
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
// 1. Original Card (full featured)
// ---------------------------------------------------------------------------
export const OriginalCard: Story = {
  name: '1. Original Card (title, desc, time)',
  render: () => (
    <div style={{ width: 320 }}>
      <Card
        image={SAMPLE_IMAGE}
        imageAlt="Brooklyn brownstone buildings"
        title="COVID-19 Wage Loss Analysis across NYC"
        description="description value that has to be at least one line but can be two lines"
        readTime="7 min"
        dataDate="2023 data"
        orientation="vertical"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 2. Two Cards: Original + Overflow
// ---------------------------------------------------------------------------
export const TwoCardsOverflow: Story = {
  name: '2. Two Cards (Original + Overflow)',
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ width: 320 }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Original</h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="COVID-19 Wage Loss Analysis across NYC"
          description="description value that has to be at least one line but can be two lines"
          readTime="7 min"
          dataDate="2023 data"
          orientation="vertical"
        />
      </div>
      <div style={{ width: 320 }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Overflow Title & Desc
        </h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="This is a really long title that should wrap and then truncate at two lines to show ellipsis behavior"
          description="This is a very long description that spans multiple lines and should be truncated at two lines with an ellipsis to show how the component handles overflow text gracefully"
          readTime="12 min"
          dataDate="2024 data"
          orientation="vertical"
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 3. Three Cards: Original + Minimal + Title Only
// ---------------------------------------------------------------------------
export const ThreeCardsVariants: Story = {
  name: '3. Three Cards (Original + Minimal + Title Only)',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ width: 320 }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Original (Full)</h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="COVID-19 Wage Loss Analysis"
          description="description value that has to be at least one line but can be two lines"
          readTime="7 min"
          dataDate="2023 data"
          orientation="vertical"
        />
      </div>
      <div style={{ width: 320 }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Minimal (Title + Time)
        </h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Wage Loss Analysis"
          readTime="5 min"
          orientation="vertical"
        />
      </div>
      <div style={{ width: 320 }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Title Only</h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="COVID-19 Impact Study"
          orientation="vertical"
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 4. With Chip and Without
// ---------------------------------------------------------------------------
export const WithAndWithoutChip: Story = {
  name: '4. With Chip and Without',
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ width: 320 }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>With Chip</h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="COVID-19 Wage Loss Analysis"
          description="description value that has to be at least one line but can be two lines"
          readTime="7 min"
          dataDate="2023 data"
          orientation="vertical"
        />
      </div>
      <div style={{ width: 320 }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Without Chip</h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="COVID-19 Wage Loss Analysis"
          description="description value that has to be at least one line but can be two lines"
          readTime="7 min"
          orientation="vertical"
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 5. Horizontal Examples
// ---------------------------------------------------------------------------
export const HorizontalExamples: Story = {
  name: '5. Horizontal Examples',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Horizontal (Full Featured)
        </h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="COVID-19 Wage Loss Analysis"
          description="description value that has to be at least one line but can be two lines"
          readTime="7 min"
          dataDate="2023 data"
          orientation="horizontal"
          style={{ maxWidth: '600px' }}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Horizontal (Minimal)
        </h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Wage Loss Analysis"
          readTime="5 min"
          orientation="horizontal"
          style={{ maxWidth: '600px' }}
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 6. Grid with 8 Examples
// ---------------------------------------------------------------------------
export const GridEightExamples: Story = {
  name: '6. Grid with 8 Examples',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
      }}
    >
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>1. Full Featured</p>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="COVID-19 Wage Loss Analysis"
          description="description value that has to be at least one line but can be two lines"
          readTime="7 min"
          dataDate="2023 data"
          orientation="vertical"
        />
      </div>

      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>
          2. Title + Desc (No Time)
        </p>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Wage Loss Analysis"
          description="description value that has to be at least one line but can be two lines"
          dataDate="2023 data"
          orientation="vertical"
        />
      </div>

      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>
          3. Title + Time (No Desc)
        </p>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Wage Loss Analysis"
          readTime="7 min"
          dataDate="2023 data"
          orientation="vertical"
        />
      </div>

      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>4. Title Only</p>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Wage Loss Analysis"
          orientation="vertical"
        />
      </div>

      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>
          5. Long Title Overflow
        </p>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="This is a really long title that should wrap and then truncate at two lines"
          description="description value"
          readTime="7 min"
          dataDate="2023 data"
          orientation="vertical"
        />
      </div>

      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>
          6. Long Description Overflow
        </p>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Wage Loss Analysis"
          description="This is a very long description that spans multiple lines and should be truncated at two lines with an ellipsis"
          readTime="7 min"
          dataDate="2023 data"
          orientation="vertical"
        />
      </div>

      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>
          7. With Clickable Chip
        </p>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Wage Loss Analysis"
          description="description value that has to be at least one line but can be two lines"
          readTime="7 min"
          dataDate="2023 data"
          chipHref="#findings"
          orientation="vertical"
        />
      </div>

      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>8. As Link Card</p>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Wage Loss Analysis"
          description="description value that has to be at least one line but can be two lines"
          readTime="7 min"
          dataDate="2023 data"
          href="#detail"
          orientation="vertical"
        />
      </div>
    </div>
  ),
};
