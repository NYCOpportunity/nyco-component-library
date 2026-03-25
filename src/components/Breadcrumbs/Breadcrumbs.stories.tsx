import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
      description: 'Ordered list of breadcrumb items. Last item is the current page.',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Single breadcrumb — just the current page label.
 */
export const OneItem: Story = {
  args: {
    items: [{ label: 'Current Page' }],
  },
};

/**
 * Two items — one parent link and the current page.
 */
export const TwoItems: Story = {
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Current Page' }],
  },
};

/**
 * Three items — two parent links and the current page.
 */
export const ThreeItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Section', href: '#' },
      { label: 'Current Page' },
    ],
  },
};

/**
 * Overflow — container is too narrow to fit all items, so the middle items
 * collapse into an ellipsis. Hover the dots to reveal the hidden items.
 */
export const Overflow: Story = {
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
  parameters: { layout: 'padded' },
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
