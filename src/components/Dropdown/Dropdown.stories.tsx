import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Dropdown } from './Dropdown';

// ---------------------------------------------------------------------------
// Sample options
// ---------------------------------------------------------------------------
const FILTER_OPTIONS = [
  { value: 'poverty', label: 'Poverty rate' },
  { value: 'unemployment', label: 'Unemployment' },
  { value: 'income', label: 'Median income' },
  { value: 'housing', label: 'Housing cost burden' },
  { value: 'food', label: 'Food insecurity' },
  { value: 'health', label: 'Health coverage' },
];

const YEAR_OPTIONS = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A **Dropdown** input that lets people choose one or more options from a list. It reuses',
          '**ListItem** internally for its option rows and offers two visual trigger styles. Use it',
          'for table filters, inline forms, and sidebar selectors.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| Options | `options` | ✅ | `DropdownOption[]` of `{ value, label, disabled? }`. `value` must be unique. |',
          '| Trigger | `variant`, `placeholder` | — | `underlined` (default) or `outlined`. Shows the selection or placeholder. |',
          '| Label | `label` | — | Form label above the trigger; auto-associated via `aria-labelledby`. |',
          '| Helper text | `helperText` | — | Small caption below the trigger. |',
          '| Panel | — | — | `role="listbox"` popup of `ListItem` rows. |',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { Dropdown } from "@nycopportunity/component-library";',
          '',
          'const options = [',
          '  { value: "income", label: "Median income" },',
          '  { value: "poverty", label: "Poverty rate" },',
          '];',
          '',
          '// Single-select, uncontrolled',
          '<Dropdown label="Metric" options={options} defaultValue="income" />',
          '',
          '// Multi-select, controlled',
          'const [vals, setVals] = React.useState<string[]>([]);',
          '<Dropdown',
          '  options={options}',
          '  multiple',
          '  value={vals}',
          '  onChange={(v) => setVals(v as string[])}',
          '/>',
          '```',
          '',
          '---',
          '',
          '## Variants',
          '',
          '`variant="underlined"` (default) — a minimal trigger styled as an inline text field with a',
          'bottom-border divider. Good for lightweight, in-flow selectors.',
          '',
          '`variant="outlined"` — a bordered, `rounded-[8px]` pill/box trigger whose open panel floats',
          'over page content with a subtle shadow. Good for standalone form inputs.',
          '',
          '## Selection modes',
          '',
          '**Single-select** (`multiple: false`, default) — clicking an option selects it, closes the',
          'panel, and returns focus to the trigger. `onChange` receives a `string`.',
          '',
          '**Multi-select** (`multiple: true`) — options render as checkboxes and the panel stays open',
          'while toggling. The trigger summarizes the selection: one label; two or three comma-',
          'separated labels; four or more show `"N selected"`. `onChange` receives a `string[]`.',
          '',
          '## State management',
          '',
          '**Uncontrolled** — omit `value`; optionally pass `defaultValue` (a `string` or `string[]`)',
          'to pre-seed on mount.',
          '',
          '**Controlled** — pass `value` + `onChange`. The dropdown is uncontrolled-open by default;',
          'pass `open` + `onOpenChange` to control visibility.',
          '',
          '## Accessibility',
          '',
          '- Trigger is a `<button type="button">` with `aria-haspopup="listbox"` and `aria-expanded`.',
          '- The panel has `role="listbox"`, plus `aria-multiselectable` when `multiple` is true.',
          '- Press `Escape` anywhere in the dropdown to close and return focus to the trigger; a click',
          '  outside also closes it.',
          '- Pass `aria-label` / `aria-labelledby` to name the trigger when no visible `label` exists;',
          '  a provided `label` is auto-connected via `aria-labelledby`.',
        ].join('\n'),
      },
    },
  },
  args: {
    options: FILTER_OPTIONS,
    onChange: fn(),
    onOpenChange: fn(),
  },
  argTypes: {
    options: {
      control: false,
      description:
        'Array of `{ value, label, disabled? }` objects. ' +
        '`value` must be unique — it is used as the key and in `onChange`. ' +
        '`disabled: true` prevents that option from being selected.',
    },
    label: {
      control: 'text',
      description:
        'Optional form label shown above the trigger (14px, neutral-700). ' +
        'When provided, the trigger is automatically associated via `aria-labelledby`. ' +
        'Matches the MUI TextField `label` prop pattern.',
    },
    helperText: {
      control: 'text',
      description:
        'Optional helper text shown below the trigger (14px, neutral-700). ' +
        'Rendered after the bottom divider on `underlined` variant, below the button on `outlined`.',
    },
    variant: {
      control: 'radio',
      options: ['underlined', 'outlined'],
      description:
        '`underlined` (default) — inline text field with bottom-border divider. ' +
        '`outlined` — bordered pill/box button with floating panel on open.',
    },
    multiple: {
      control: 'boolean',
      description:
        'When `true`, multiple options can be selected; checkboxes are rendered. ' +
        'The panel stays open until the user clicks outside or presses Escape.',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown in the trigger when nothing is selected. Defaults to `"Select…"`.',
    },
    disabled: {
      control: 'boolean',
      description:
        'Disables the trigger and prevents opening the dropdown. ' +
        'Applies `opacity: 20%` and `pointer-events: none` to the root wrapper.',
    },
    value: {
      control: false,
      description:
        'Controlled selected value(s). ' +
        'Pass a `string` for single-select or `string[]` for multi-select. ' +
        'Providing this switches the component to controlled mode; pair with `onChange`.',
    },
    defaultValue: {
      control: false,
      description:
        'Initial value when uncontrolled. ' +
        'Pass a `string` for single-select or `string[]` for multi-select.',
    },
    open: {
      control: false,
      description:
        'Controlled open state. When set, the component no longer manages open/close internally; ' +
        'use `onOpenChange` to react to toggle requests.',
    },
    defaultOpen: {
      control: false,
      description: 'Initial open state for uncontrolled mode. Defaults to `false`.',
    },
    onChange: {
      action: 'onChange',
      description:
        'Called on every selection change. ' +
        'Receives a `string` in single-select mode and `string[]` in multi-select mode.',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Called when the open state changes. Receives the new boolean value.',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the trigger button. Use when there is no visible label.',
    },
    'aria-labelledby': {
      control: 'text',
      description: 'ID of an external label element to associate with the trigger.',
    },
    className: {
      control: 'text',
      description: 'Tailwind classes applied to the root wrapper `<div>`.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'underlined',
    placeholder: 'Select an option',
    label: '',
    helperText: '',
    multiple: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280, paddingBottom: 280 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Interactive sandbox — try every prop from the **Controls** panel. ' +
          'Switch `variant` between `underlined` and `outlined`, toggle `multiple`, or mark it `disabled`.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Underlined — single select
// ---------------------------------------------------------------------------
function UnderlinedSingleDropdownDemo() {
  const [value, setValue] = React.useState('');
  return (
    <div style={{ width: 280, paddingBottom: 280, fontFamily: 'Public Sans, sans-serif' }}>
      <Dropdown
        options={FILTER_OPTIONS}
        variant="underlined"
        placeholder="Select indicator"
        value={value}
        onChange={(v) => setValue(v as string)}
      />
      {value && (
        <p style={{ marginTop: 20, fontSize: 13, color: '#555' }}>
          Selected: <strong>{FILTER_OPTIONS.find((o) => o.value === value)?.label}</strong>
        </p>
      )}
    </div>
  );
}

export const UnderlinedSingleDropdown: Story = {
  name: 'Underlined — Single select',
  render: () => <UnderlinedSingleDropdownDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Default `variant="underlined"` with single-select mode (`multiple: false`). ' +
          'Clicking an option selects it and closes the panel immediately. ' +
          'The trigger displays the selected label.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Outlined — single select (year picker, matching the Figma right panel)
// ---------------------------------------------------------------------------
function OutlinedSingleDropdownDemo() {
  const [value, setValue] = React.useState('2023');
  return (
    <div style={{ width: 160, paddingBottom: 280, fontFamily: 'Public Sans, sans-serif' }}>
      <Dropdown
        options={YEAR_OPTIONS}
        variant="outlined"
        value={value}
        onChange={(v) => setValue(v as string)}
        aria-label="Select year"
      />
    </div>
  );
}

export const OutlinedSingleDropdown: Story = {
  name: 'Outlined — Single select',
  render: () => <OutlinedSingleDropdownDemo />,
  parameters: {
    docs: {
      description: {
        story:
          '`variant="outlined"` — bordered pill trigger with floating shadow panel. ' +
          'Matches the year-picker shown in the Figma design. ' +
          'The trigger width shrinks to its content; constrain the container to control its size.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Underlined — multi-select (matches Figma left panel)
// ---------------------------------------------------------------------------
function UnderlinedMultiDropdownDemo() {
  const [values, setValues] = React.useState<string[]>([]);
  return (
    <div style={{ width: 280, paddingBottom: 320, fontFamily: 'Public Sans, sans-serif' }}>
      <Dropdown
        options={FILTER_OPTIONS}
        variant="underlined"
        multiple
        placeholder="Select indicators"
        value={values}
        onChange={(v) => setValues(v as string[])}
      />
      {values.length > 0 && (
        <p style={{ marginTop: 20, fontSize: 13, color: '#555' }}>
          Selected ({values.length}):{' '}
          <strong>
            {values.map((v) => FILTER_OPTIONS.find((o) => o.value === v)?.label).join(', ')}
          </strong>
        </p>
      )}
    </div>
  );
}

export const UnderlinedMultiDropdown: Story = {
  name: 'Underlined — Multi-select',
  render: () => <UnderlinedMultiDropdownDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select mode (`multiple: true`) with `variant="underlined"`. ' +
          'Each option renders a `checkbox` `ListItem`. ' +
          'The panel stays open while the user toggles items — click outside or press `Escape` to close. ' +
          'The trigger summarises the selection: one item → label; ≤ 3 items → comma-separated labels; ' +
          '≥ 4 items → "N selected".',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Outlined — multi-select
// ---------------------------------------------------------------------------
function OutlinedMultiDropdownDemo() {
  const [values, setValues] = React.useState<string[]>([]);
  return (
    <div style={{ width: 280, paddingBottom: 320, fontFamily: 'Public Sans, sans-serif' }}>
      <Dropdown
        options={FILTER_OPTIONS}
        variant="outlined"
        multiple
        placeholder="Select indicators"
        value={values}
        onChange={(v) => setValues(v as string[])}
      />
      {values.length > 0 && (
        <p style={{ marginTop: 20, fontSize: 13, color: '#555' }}>
          Selected ({values.length}):{' '}
          <strong>
            {values.map((v) => FILTER_OPTIONS.find((o) => o.value === v)?.label).join(', ')}
          </strong>
        </p>
      )}
    </div>
  );
}

export const OutlinedMultiDropdown: Story = {
  name: 'Outlined — Multi-select',
  render: () => <OutlinedMultiDropdownDemo />,
  parameters: {
    docs: {
      description: {
        story:
          '`variant="outlined"` with `multiple: true`. ' +
          'The floating panel uses `shadow-[0px_4px_15px_0px_rgba(25,25,25,0.15)]` and `p-[8px]` padding. ' +
          'Checkboxes render via `ListItem type="checkbox"`.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        width: 280,
        fontFamily: 'Public Sans, sans-serif',
      }}
    >
      <Dropdown
        options={FILTER_OPTIONS}
        variant="underlined"
        placeholder="Select indicator"
        disabled
      />
      <Dropdown
        options={FILTER_OPTIONS}
        variant="outlined"
        placeholder="Select indicator"
        disabled
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Both variants in the `disabled` state. ' +
          'The trigger is non-interactive and fully dimmed (`opacity: 20%`). ' +
          'Disabled state is applied at the wrapper level so all child elements ' +
          '(label, chevron, divider, helper text) fade uniformly.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// With pre-selected values
// ---------------------------------------------------------------------------
export const WithDefaultValue: Story = {
  name: 'With default value',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        width: 280,
        paddingBottom: 280,
        fontFamily: 'Public Sans, sans-serif',
      }}
    >
      <Dropdown options={FILTER_OPTIONS} variant="underlined" defaultValue="income" />
      <Dropdown
        options={FILTER_OPTIONS}
        variant="outlined"
        defaultValue={['poverty', 'housing', 'food']}
        multiple
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Uncontrolled components with `defaultValue` pre-seeded. ' +
          'Top: single-select underlined with `defaultValue="income"`. ' +
          'Bottom: multi-select outlined with three items pre-selected via `defaultValue={[...]}`. ' +
          'Since there are three items, the trigger shows them comma-separated.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// With label and helper text
// ---------------------------------------------------------------------------
export const WithLabelAndHelperText: Story = {
  name: 'With label and helper text',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        width: 280,
        paddingBottom: 280,
        fontFamily: 'Public Sans, sans-serif',
      }}
    >
      <Dropdown
        options={FILTER_OPTIONS}
        variant="underlined"
        label="Indicator"
        helperText="Choose one social indicator"
        placeholder="Select..."
      />
      <Dropdown
        options={FILTER_OPTIONS}
        variant="outlined"
        label="Indicator"
        helperText="Choose one social indicator"
        placeholder="Select..."
      />
      <Dropdown
        options={FILTER_OPTIONS}
        variant="underlined"
        label="Indicator"
        helperText="Option is required"
        multiple
        placeholder="Select indicators"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Both variants with `label` and `helperText`. ' +
          'The label is rendered above the trigger at 14px in `--color-neutral-700`. ' +
          'When `label` is provided, the trigger is automatically connected to it via `aria-labelledby`. ' +
          '`helperText` renders below the divider (underlined) or below the button (outlined).',
      },
    },
  },
};
