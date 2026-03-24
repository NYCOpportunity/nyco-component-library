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
    maxVisible: {
      control: { type: 'number', min: 1 },
      description: 'Max items before collapsing into overflow. Default: 3.',
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
 * Three items — the default `maxVisible` threshold.
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
 * Overflow — more items than `maxVisible` (default 3). Shows first item,
 * an ellipsis button, and the last item. Click the ellipsis to reveal hidden items.
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
};

/**
 * Deep overflow — many levels deep.
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
          <Breadcrumbs
            items={[
              { label: 'Home', href: '#' },
              { label: 'Section', href: '#' },
              { label: 'Subsection', href: '#' },
              { label: 'Current Page' },
            ]}
          />
        </div>
        <div style={{ ...row, borderBottom: 'none' }}>
          <span style={label}>Deep overflow (5 items)</span>
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
    );
  },
};
