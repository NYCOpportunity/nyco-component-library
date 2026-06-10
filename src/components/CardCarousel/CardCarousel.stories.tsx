import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CardCarousel } from './CardCarousel';
import type { CardCarouselItem } from '../../types/components';

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const SAMPLE_IMAGE = 'https://picsum.photos/seed/nyco/640/340';

const makeItems = (count: number): CardCarouselItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    image: SAMPLE_IMAGE,
    imageAlt: `Sample image ${i + 1}`,
    title: `COVID-19 Wage Loss Analysis across NYC ${i + 1}`,
    description: 'description value that has to be at least one line but can be two lines',
    readTime: `${5 + (i % 5)} min`,
    dataDate: `${2020 + (i % 5)} data`,
    href: '#',
  }));

const ITEMS = makeItems(6);

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof CardCarousel> = {
  title: 'Components/CardCarousel',
  component: CardCarousel,
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
          'Horizontally-scrollable list of `Card`s with responsive desktop and mobile layouts.\n\n' +
          '---\n\n' +
          '## Desktop (viewport ≥ `mobileBreakpoint`)\n\n' +
          '- Shows `visibleDesktop` full cards plus a sliver (`mobilePeek`) of the next.\n' +
          '- Previous / next arrows page the track `visibleDesktop` cards at a time.\n\n' +
          '## Mobile (viewport < `mobileBreakpoint`)\n\n' +
          '- Shows one full card plus a `mobilePeek` sliver of the next.\n' +
          '- Native horizontal scroll with snap; arrows are hidden.\n\n' +
          '> The **Desktop** and **Mobile** stories below both contain 6 cards — the Mobile ' +
          'story is rendered inside a phone-width frame to show how it reflows when the screen ' +
          'shrinks.',
      },
    },
  },
  args: {
    items: ITEMS,
    title: 'Latest research',
    visibleDesktop: 3,
    gap: 24,
    mobileBreakpoint: 768,
    mobilePeek: 0.2,
    showArrows: true,
  },
  argTypes: {
    items: { control: false, description: 'Cards rendered as slides.' },
    title: { control: 'text', description: 'Optional heading shown above the track.' },
    visibleDesktop: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: 'Full cards visible per view on desktop (a peek of the next is added).',
    },
    gap: {
      control: { type: 'number', min: 0, max: 48, step: 4 },
      description: 'Gap between cards in pixels.',
    },
    mobileBreakpoint: {
      control: { type: 'number', min: 320, max: 1280, step: 16 },
      description: 'Viewport width below which the mobile peek layout is used.',
    },
    mobilePeek: {
      control: { type: 'number', min: 0, max: 0.5, step: 0.05 },
      description: 'Fraction of the next card shown as a peek (mobile and desktop).',
    },
    showArrows: { control: 'boolean', description: 'Show prev/next arrows on desktop.' },
  },
};

export default meta;
type Story = StoryObj<typeof CardCarousel>;

// ---------------------------------------------------------------------------
// 1. Desktop — 6 cards, shows 3 + a peek, arrows page through the rest
// ---------------------------------------------------------------------------
export const Desktop: Story = {
  name: '1. Desktop (6 cards)',
  render: (args) => <CardCarousel {...args} />,
};

// ---------------------------------------------------------------------------
// 2. Mobile — same 6 cards rendered in a phone-width frame so you can see how
//    it looks when the screen shrinks (1 full card + a sliver of the next).
// ---------------------------------------------------------------------------
export const Mobile: Story = {
  name: '2. Mobile (6 cards, shrunk screen)',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: (args) => (
    <div
      style={{
        width: 390,
        margin: '0 auto',
        padding: 12,
        borderRadius: 32,
        border: '10px solid #1a1a1a',
        background: '#ffffff',
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      }}
    >
      {/*
        Force the mobile layout regardless of the real browser width by raising
        the breakpoint above the frame width — this mirrors how the carousel
        reflows on an actual phone screen.
      */}
      <CardCarousel {...args} mobileBreakpoint={9999} />
    </div>
  ),
};
