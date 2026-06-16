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
        component: [
          'A clickable **content card** that pairs an image with a heading and optional supporting',
          'text. Use it to surface an article, dataset, report, or any linked resource in grids,',
          'rows, or carousels.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          'Every card is built from the same parts — only the heading and image are required:',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| Image | `image`, `imageAlt` | ✅ / alt optional | Cover image; `imageAlt` describes it for screen readers. |',
          '| Title | `title` | ✅ | Heading. Clamps to 2 lines; underlines on hover. |',
          '| Description | `description` | — | Body text. Clamps to 2 lines. Hidden when omitted. |',
          '| Read time | `readTime` | — | Small meta label, e.g. `"7 min"`. |',
          '| Data chip | `dataDate` | — | Pill label, e.g. `"2023 data"`. Can be made clickable. |',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { Card } from "@nycopportunity/component-library";',
          '',
          '// Minimal — image + title',
          '<Card image={url} imageAlt="Brownstones" title="Wage loss analysis" />',
          '',
          '// Full — links the whole card and adds a clickable chip',
          '<Card',
          '  image={url}',
          '  imageAlt="Brownstones"',
          '  title="COVID-19 Wage Loss Analysis across NYC"',
          '  description="How the pandemic affected wages across the five boroughs."',
          '  readTime="7 min"',
          '  dataDate="2023 data"',
          '  href="/reports/wage-loss"',
          '  onChipClick={() => openDataYear(2023)}',
          '/>',
          '```',
          '',
          '**Making it interactive**',
          '- Pass `href` to render the whole card as an `<a>`.',
          '- Pass `onClick` for a button-like card (adds `role="button"` and keyboard focus).',
          '- For the chip, use `chipHref` **or** `onChipClick`. Prefer `onChipClick` when the card',
          '  itself has an `href`, to avoid nesting anchors. Chip clicks never trigger the card.',
          '',
          '---',
          '',
          '## Orientation',
          '',
          '`orientation="vertical"` (default) — stacked image over content. Drop it into a CSS grid',
          'or flex row to lay out multiple cards.',
          '',
          '`orientation="horizontal"` — image on the left (337 × 240 px), content on the right.',
          'Good for dense lists and search results.',
          '',
          '## Responsive width',
          '',
          "Width adapts automatically so you usually don't set it yourself:",
          '',
          '| Context | Width |',
          '| --- | --- |',
          '| Desktop · vertical | Fixed **320 px** |',
          '| Desktop · horizontal | Fills its container (image + content) |',
          '| Mobile · `type="story"` (default) | Full width |',
          '| Mobile · `type="carousel"` | 1 full card + a peek of the next (`100vw / 1.2`) |',
          '',
          'Use `type="carousel"` for horizontally-scrolling rows on mobile (see the',
          '**CardCarousel** component, which wires this up for you).',
          '',
          '---',
          '',
          '## Hover behavior',
          '',
          '**Vertical** — the data chip slides up from below the image into the image area, and the',
          'title gains a 2 px underline on each wrapped line.',
          '',
          '**Horizontal** — only the title underline appears; the chip is statically visible above',
          'the title.',
          '',
          '## Accessibility',
          '',
          '- Always provide a meaningful `imageAlt`.',
          '- Card-as-link uses a real `<a>`; card-as-button exposes `role="button"` and is focusable.',
          '- The chip is a real `<a>`/`<button>` and stops propagation so it is independently operable.',
        ].join('\n'),
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
    type: {
      control: 'radio',
      options: ['story', 'carousel'],
      description:
        'Affects width on mobile only. `story` (default) → full width. `carousel` → 1 card + a peek of the next.',
    },
    bordered: {
      control: 'boolean',
      description:
        'Adds a 1px neutral border. On hover a soft shadow appears instead of the title underline.',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: 680 }}>
      {/* Full featured: title, body, read time, and chip */}
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Full featured (title, body, read time, chip)
        </h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="COVID-19 Wage Loss Analysis across NYC"
          description="An overview of how the pandemic affected wages across the five boroughs, with a breakdown by industry and neighborhood."
          readTime="7 min"
          dataDate="2023 data"
          orientation="horizontal"
        />
      </div>

      {/* Title + body only */}
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Title + body</h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Housing affordability trends"
          description="Median rent and ownership costs compared against household income over the past decade."
          orientation="horizontal"
        />
      </div>

      {/* Title + body + read time (no chip) */}
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Title + body + read time
        </h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="Small business recovery report"
          description="Tracking revenue and employment recovery for NYC small businesses since 2020."
          readTime="5 min"
          orientation="horizontal"
        />
      </div>

      {/* Overflow: long title and body clamp to two lines */}
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Overflow (title &amp; body clamp to 2 lines)
        </h4>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="A comprehensive longitudinal study of pandemic-era wage loss and its uneven recovery across New York City neighborhoods"
          description="This extended summary spans well beyond two lines so you can verify that both the heading and the body text truncate gracefully with an ellipsis when the available space runs out within the horizontal layout."
          readTime="12 min"
          dataDate="2024 data"
          orientation="horizontal"
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

// ---------------------------------------------------------------------------
// 7. Bordered (hover reveals a soft shadow)
// ---------------------------------------------------------------------------
export const Bordered: Story = {
  name: '7. Bordered (hover shadow)',
  parameters: {
    docs: {
      description: {
        story:
          'The bordered variant has a 1px neutral border at rest. On hover a soft shadow appears (instead of the title underline used by the borderless variant). Hover a card to see the shadow.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>
          Borderless (hover → underline)
        </p>
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

      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}>
          Bordered (hover → shadow)
        </p>
        <Card
          image={SAMPLE_IMAGE}
          imageAlt="Brooklyn brownstone buildings"
          title="COVID-19 Wage Loss Analysis across NYC"
          description="description value that has to be at least one line but can be two lines"
          readTime="7 min"
          dataDate="2023 data"
          orientation="vertical"
          bordered
        />
      </div>
    </div>
  ),
};
