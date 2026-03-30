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
    content: 'Simple tooltip text',
    placement: 'top',
    mode: 'dark',
  },
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Tooltip {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Placement variants
// ---------------------------------------------------------------------------
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 80, padding: 100 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} content="Tooltip text" placement={p} />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Light vs Dark mode
// ---------------------------------------------------------------------------
export const Modes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100 }}>
      <Tooltip content="Dark tooltip" mode="dark" placement="top" />
      <Tooltip content="Light tooltip" mode="light" placement="top" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Rich tooltip (title + body)
// ---------------------------------------------------------------------------
export const Rich: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100, flexWrap: 'wrap' }}>
      <Tooltip title="Title" content="Rich tool tip text here" mode="dark" placement="top" />
      <Tooltip title="Title" content="Rich tool tip text here" mode="light" placement="top" />
      <Tooltip title="Title" content="Rich tool tip text here" mode="dark" placement="right" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With title — plain tooltip with a title label
// ---------------------------------------------------------------------------
export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 80, padding: 100 }}>
      <Tooltip title="Hint" content="Dark tooltip with title" mode="dark" placement="top" />
      <Tooltip title="Hint" content="Light tooltip with title" mode="light" placement="top" />
      <Tooltip title="Hint" content="Opens to the right" mode="dark" placement="right" />
      <Tooltip title="Hint" content="Opens to the bottom" mode="dark" placement="bottom" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom trigger — shows that any element can be used as trigger
// ---------------------------------------------------------------------------
export const CustomTrigger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, padding: 100, alignItems: 'center' }}>
      <Tooltip title="Title" content="Rich tooltip on a button" mode="dark" placement="top">
        <Button variant="secondary" size="small">
          Button trigger
        </Button>
      </Tooltip>
      <Tooltip content="Plain tooltip on a button" mode="light" placement="top">
        <Button variant="primary" size="small">
          Light
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
      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <Tooltip content="Flips to bottom/right" placement="top">
          <Button variant="secondary" size="small">
            Top-left
          </Button>
        </Tooltip>
      </div>

      <div style={{ position: 'absolute', top: 12, right: 12 }}>
        <Tooltip content="Flips to bottom/left" placement="top">
          <Button variant="secondary" size="small">
            Top-right
          </Button>
        </Tooltip>
      </div>

      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
        <Tooltip content="Flips to top/right" placement="bottom">
          <Button variant="secondary" size="small">
            Bottom-left
          </Button>
        </Tooltip>
      </div>

      <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
        <Tooltip content="Flips to top/left" placement="bottom">
          <Button variant="secondary" size="small">
            Bottom-right
          </Button>
        </Tooltip>
      </div>

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
