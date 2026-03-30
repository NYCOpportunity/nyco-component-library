import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
// Playground — all controls wired up
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    content: 'Simple tooltip',
    placement: 'top',
    mode: 'dark',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary" size="small">
        Hover me
      </Button>
    </Tooltip>
  ),
};

// ---------------------------------------------------------------------------
// Placement variants
// ---------------------------------------------------------------------------
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 48, padding: 48 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} content="Tooltip text" placement={p}>
          <Button variant="secondary" size="small" style={{ width: 100 }}>
            {p}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Light vs Dark mode
// ---------------------------------------------------------------------------
export const Modes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, padding: 48 }}>
      <Tooltip content="Dark tooltip" mode="dark" placement="top">
        <Button variant="secondary" size="small">
          Dark
        </Button>
      </Tooltip>
      <Tooltip content="Light tooltip" mode="light" placement="top">
        <Button variant="secondary" size="small">
          Light
        </Button>
      </Tooltip>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Rich tooltip (title + body)
// ---------------------------------------------------------------------------
export const Rich: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, padding: 48, flexWrap: 'wrap' }}>
      <Tooltip title="Title" content="Rich tool tip text here" mode="dark" placement="top">
        <Button variant="secondary" size="small">
          Dark rich
        </Button>
      </Tooltip>
      <Tooltip title="Title" content="Rich tool tip text here" mode="light" placement="top">
        <Button variant="secondary" size="small">
          Light rich
        </Button>
      </Tooltip>
      <Tooltip title="Title" content="Rich tool tip text here" mode="dark" placement="right">
        <Button variant="secondary" size="small">
          Right
        </Button>
      </Tooltip>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Edge case: near viewport edges — overflow flip to bottom
// ---------------------------------------------------------------------------
export const OverflowDetection: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Top-left corner — preferred top+left would overflow, should flip */}
      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <Tooltip content="Flips to bottom/right" placement="top">
          <Button variant="secondary" size="small">
            Top-left
          </Button>
        </Tooltip>
      </div>

      {/* Top-right corner */}
      <div style={{ position: 'absolute', top: 12, right: 12 }}>
        <Tooltip content="Flips to bottom/left" placement="top">
          <Button variant="secondary" size="small">
            Top-right
          </Button>
        </Tooltip>
      </div>

      {/* Bottom-left corner */}
      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
        <Tooltip content="Flips to top/right" placement="bottom">
          <Button variant="secondary" size="small">
            Bottom-left
          </Button>
        </Tooltip>
      </div>

      {/* Bottom-right corner */}
      <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
        <Tooltip content="Flips to top/left" placement="bottom">
          <Button variant="secondary" size="small">
            Bottom-right
          </Button>
        </Tooltip>
      </div>

      {/* Center — default top, no overflow */}
      <div
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      >
        <Tooltip content="Stays on top" placement="top">
          <Button variant="primary" size="small">
            Center
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
};
