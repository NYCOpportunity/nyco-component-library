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
// Figma State Matrix (node 9216:1490)
// ---------------------------------------------------------------------------
export const FigmaStateMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <div style={{ width: 110, fontSize: 16, color: '#191919' }}>default</div>
        <div style={{ width: 326 }}>
          <InputField placeholder="Input value category" />
        </div>
        <div style={{ width: 326 }}>
          <InputField value="3sHIn56" errorText="" readOnly />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <div style={{ width: 110, fontSize: 16, color: '#191919' }}>hover</div>
        <div style={{ width: 326 }}>
          <InputField
            className="[&>div:nth-child(2)]:bg-[var(--color-neutral-100)] [&>div:nth-child(2)]:border-transparent"
            placeholder="Input value category"
          />
        </div>
        <div style={{ width: 326 }}>
          <InputField
            className="[&>div:nth-child(2)]:bg-[var(--color-neutral-100)]"
            value="3sHIn56"
            errorText="Value field specific error text"
            readOnly
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <div style={{ width: 110, fontSize: 16, color: '#191919' }}>select/focus</div>
        <div style={{ width: 326 }}>
          <InputField
            className="[&>div:nth-child(2)]:border-[3px] [&>div:nth-child(2)]:border-[var(--color-border-focus)]"
            value="|"
            readOnly
          />
        </div>
        <div style={{ width: 326 }}>
          <InputField
            className="[&>div:nth-child(2)]:border-[3px] [&>div:nth-child(2)]:border-[var(--color-border-error)]"
            value="|"
            errorText="Value field specific error text"
            readOnly
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 12 }}>
        <div style={{ width: 110, fontSize: 16, color: '#191919' }}>disabled</div>
        <div style={{ width: 326 }}>
          <InputField placeholder="Input value category" disabled />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 20 }}>
        <div style={{ width: 110, fontSize: 16, color: '#191919' }}>underlined</div>
        <div style={{ width: 326 }}>
          <InputField variant="underlined" placeholder="Input value category" />
        </div>
        <div style={{ width: 326 }}>
          <InputField
            variant="underlined"
            className="[&>div:nth-child(2)]:border-[var(--color-neutral-700)]"
            placeholder="Input value category"
          />
        </div>
        <div style={{ width: 326 }}>
          <InputField
            variant="underlined"
            className="[&>div:nth-child(2)]:border-b-[3px] [&>div:nth-child(2)]:border-[var(--color-border-focus)]"
            value="|"
            readOnly
          />
        </div>
      </div>
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
