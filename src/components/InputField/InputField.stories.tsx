import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A single-line **text input** with an optional label, helper text, error state, and clear',
          'button. It forwards all native `<input>` attributes and its `ref`, so it drops into forms',
          'like a standard input while adding NYCO styling and accessibility wiring.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| Label | `label` | — | Rendered above the input and linked via `htmlFor`. |',
          '| Required marker | `required` | — | Adds a red `*` plus a visually-hidden "required" for screen readers. |',
          '| Input | native props | — | `type` (default `"text"`), `placeholder`, `value`, `onChange`, etc. are forwarded. |',
          '| Clear button | `showClearButton`, `onClear` | — | An × button that appears only when the field has a non-empty string `value` and is not disabled. |',
          '| Helper text | `helperText` | — | Neutral 14 px text below the input. |',
          '| Error text | `errorText`, `showError` | — | Error-color 14 px text; shown when `errorText` is set and `showError` is `true` (default). |',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { InputField } from "@nycopportunity/component-library";',
          '',
          '// Basic labelled field with helper text',
          '<InputField',
          '  label="Email"',
          '  type="email"',
          '  placeholder="you@example.com"',
          '  helperText="We\'ll never share your email."',
          '  required',
          '/>',
          '',
          '// Controlled with a clear button and error state',
          '<InputField',
          '  label="Search"',
          '  value={query}',
          '  onChange={(e) => setQuery(e.target.value)}',
          '  showClearButton',
          '  onClear={() => setQuery("")}',
          '  errorText="No results found"',
          '/>',
          '```',
          '',
          '---',
          '',
          '## Variants',
          '',
          '| `variant` | Appearance |',
          '| --- | --- |',
          '| `outlined` (default) | Full rounded border on all four sides. |',
          '| `underlined` | Bottom border only, no border radius. |',
          '',
          '## States',
          '',
          '- **Idle** — default border for the chosen variant.',
          '- **Hover** — subtle `neutral-100` fill (outlined) or darker underline (underlined).',
          '- **Focused** — a 2 px focus outline/underline in the focus color; switches to the error color when in error.',
          '- **Error** — border, outline, and message render in the error color.',
          '- **Disabled** — muted `neutral-100` fill and `neutral-300` text; the clear button is hidden.',
          '',
          '## Accessibility',
          '',
          '- `label` is associated with the input via `htmlFor` / `id` (an id is auto-generated when omitted).',
          '- Helper and error text are linked through `aria-describedby`; both can be announced together.',
          '- The error state sets `aria-invalid`, and `required` sets `aria-required` on the input.',
          '- The clear button is a real `<button>` labelled `"Clear input"` and is keyboard-focusable.',
        ].join('\n'),
      },
    },
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
