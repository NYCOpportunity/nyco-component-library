import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'underlined'],
    },
    showError: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------
export const Default: Story = {
  args: {
    placeholder: 'Input value category',
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <InputField {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Label
// ---------------------------------------------------------------------------
export const WithLabel: Story = {
  args: {
    label: 'Value',
    placeholder: 'Input value category',
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <InputField {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Helper Text
// ---------------------------------------------------------------------------
export const WithHelperText: Story = {
  args: {
    label: 'Value',
    placeholder: 'Input value category',
    helperText: 'Descriptive helper text',
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <InputField {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Error State
// ---------------------------------------------------------------------------
export const WithError: Story = {
  args: {
    label: 'Value',
    placeholder: 'Input value category',
    errorText: 'Value field specific error text',
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <InputField {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Error + Helper Text (both shown simultaneously)
// ---------------------------------------------------------------------------
export const WithErrorAndHelperText: Story = {
  args: {
    label: 'Value',
    placeholder: 'Input value category',
    errorText: 'Value field specific error text',
    helperText: 'Descriptive helper text',
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <InputField {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Error Hidden (showError=false)
// ---------------------------------------------------------------------------
export const WithErrorHidden: Story = {
  args: {
    label: 'Value',
    placeholder: 'Input value category',
    errorText: 'Value field specific error text',
    helperText: 'Descriptive helper text',
    showError: false,
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <InputField {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Required
// ---------------------------------------------------------------------------
export const Required: Story = {
  args: {
    label: 'Value',
    placeholder: 'Input value category',
    required: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <InputField {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  args: {
    placeholder: 'Input value category',
    disabled: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <InputField {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Clear Button (controlled)
// ---------------------------------------------------------------------------
export const WithClearButton: Story = {
  render: () => {
    function ClearableInput() {
      const [value, setValue] = React.useState('Entered Value');
      return (
        <div style={{ maxWidth: 360 }}>
          <InputField
            label="Value"
            placeholder="Input value category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            showClearButton
            onClear={() => setValue('')}
          />
        </div>
      );
    }
    return <ClearableInput />;
  },
};

// ---------------------------------------------------------------------------
// Underlined Variant
// ---------------------------------------------------------------------------
export const Underlined: Story = {
  args: {
    variant: 'underlined',
    placeholder: 'Input value category',
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <InputField {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// All States Overview
// ---------------------------------------------------------------------------
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
      <InputField placeholder="Default state" />
      <InputField label="With Label" placeholder="Input value category" />
      <InputField
        label="With Helper Text"
        placeholder="Input value category"
        helperText="Descriptive helper text"
      />
      <InputField
        label="Error State"
        placeholder="Input value category"
        errorText="Value field specific error text"
      />
      <InputField
        label="Error + Helper Text"
        placeholder="Input value category"
        errorText="Value field specific error text"
        helperText="Descriptive helper text"
      />
      <InputField placeholder="Disabled state" disabled />
      <InputField variant="underlined" label="Underlined" placeholder="Input value category" />
    </div>
  ),
};
