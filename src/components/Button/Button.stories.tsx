import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'Button style variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button color scheme',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes (Tailwind)',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary contained button - the default style
 */
export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'contained',
    color: 'primary',
    size: 'md',
  },
};

/**
 * Secondary contained button for alternative actions
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'contained',
    color: 'secondary',
    size: 'md',
  },
};

/**
 * Outlined button variant - less prominent
 */
export const Outlined: Story = {
  args: {
    children: 'Outlined',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
  },
};

/**
 * Text button - minimal style
 */
export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    color: 'primary',
    size: 'md',
  },
};

/**
 * Small button size
 */
export const Small: Story = {
  args: {
    children: 'Small',
    variant: 'contained',
    color: 'primary',
    size: 'sm',
  },
};

/**
 * Large button size
 */
export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'contained',
    color: 'primary',
    size: 'lg',
  },
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'contained',
    color: 'primary',
    disabled: true,
  },
};

/**
 * All size variants
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * All variant types
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="contained" color="primary">
        Contained
      </Button>
      <Button variant="outlined" color="primary">
        Outlined
      </Button>
      <Button variant="text" color="primary">
        Text
      </Button>
    </div>
  ),
};

/**
 * All color combinations
 */
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
    </div>
  ),
};

/**
 * Contained buttons in all colors and variants
 */
export const ColorMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
      }}
    >
      <div>
        <h4>Primary</h4>
        <Button variant="contained" color="primary" size="md">
          Contained
        </Button>
      </div>
      <div>
        <h4>Primary Outlined</h4>
        <Button variant="outlined" color="primary" size="md">
          Outlined
        </Button>
      </div>
      <div>
        <h4>Primary Text</h4>
        <Button variant="text" color="primary" size="md">
          Text
        </Button>
      </div>
      <div>
        <h4>Secondary</h4>
        <Button variant="contained" color="secondary" size="md">
          Contained
        </Button>
      </div>
      <div>
        <h4>Secondary Outlined</h4>
        <Button variant="outlined" color="secondary" size="md">
          Outlined
        </Button>
      </div>
      <div>
        <h4>Secondary Text</h4>
        <Button variant="text" color="secondary" size="md">
          Text
        </Button>
      </div>
    </div>
  ),
};

/**
 * Custom styling with className - experiment with Tailwind classes
 */
export const WithCustomStyles: Story = {
  args: {
    children: 'Custom Styled',
    className: 'w-full shadow-lg hover:shadow-xl',
  },
};
