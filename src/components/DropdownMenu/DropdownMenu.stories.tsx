import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DropdownMenu } from './DropdownMenu';

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

const GROUPED_OPTIONS = [
  { value: 'poverty', label: 'Poverty rate', category: 'Economic' },
  { value: 'unemployment', label: 'Unemployment', category: 'Economic' },
  { value: 'income', label: 'Median income', category: 'Economic' },
  { value: 'housing', label: 'Housing cost burden', category: 'Housing' },
  { value: 'rent', label: 'Rent burden', category: 'Housing' },
  { value: 'food', label: 'Food insecurity', category: 'Health' },
  { value: 'health', label: 'Health coverage', category: 'Health' },
  { value: 'mental', label: 'Mental health access', category: 'Health' },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A compact **DropdownMenu** that lets people choose one or more options from a floating',
          'menu panel. It supports category-grouped options, two trigger styles, and single or',
          'multi-select modes. Reach for it in toolbars, filter bars, and compact layouts.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| Options | `options` | ✅ | `DropdownMenuOption[]` of `{ value, label, category?, disabled? }`. |',
          '| Trigger | `type`, `border`, `placeholder` | — | `contained` (default) or `uncontained`; optional outline. |',
          '| Label | `label` | — | Form label above the trigger; auto-associated via `aria-labelledby`. |',
          '| Helper text | `helperText` | — | Small caption below the trigger. |',
          '| Panel | — | — | `role="listbox"` popup with optional category headers. |',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { DropdownMenu } from "@nycopportunity/component-library";',
          '',
          'const options = [',
          '  { value: "poverty", label: "Poverty rate", category: "Economic" },',
          '  { value: "housing", label: "Housing cost burden", category: "Housing" },',
          '];',
          '',
          '// Single-select, uncontrolled',
          '<DropdownMenu label="Indicator" options={options} defaultValue="poverty" />',
          '',
          '// Multi-select, controlled',
          'const [vals, setVals] = React.useState<string[]>([]);',
          '<DropdownMenu',
          '  options={options}',
          '  multiple',
          '  value={vals}',
          '  onChange={(v) => setVals(v as string[])}',
          '/>',
          '```',
          '',
          '---',
          '',
          '## Trigger types',
          '',
          '`type="contained"` (default) — a gray `var(--color-neutral-100)` pill trigger. Pair with',
          '`border` to add a visible `var(--color-neutral-300)` outline (which switches the idle',
          'background to white).',
          '',
          '`type="uncontained"` — a transparent trigger that shows a hover fill. Trigger background,',
          'hover, and press colors can all be overridden via `triggerBgColor`, `triggerHoverBgColor`,',
          'and `triggerPressBgColor`.',
          '',
          '## Category grouping',
          '',
          'Add an optional `category` string to any option. Options sharing a `category` render',
          'together under a section header, in the order they first appear; options without a',
          '`category` form an unnamed group.',
          '',
          '## Selection modes',
          '',
          '**Single-select** (`multiple: false`, default) — selecting an option closes the panel and',
          'marks the chosen item with a checkmark.',
          '',
          '**Multi-select** (`multiple: true`) — checkbox icons render alongside each option and the',
          'panel stays open until the user clicks outside or presses Escape. The trigger summarizes',
          'the selection: one label; two or three comma-separated labels; four or more show',
          '`"N selected"`.',
          '',
          '## State management',
          '',
          '**Uncontrolled** — omit `value`; optionally pass `defaultValue` to pre-seed. The menu is',
          'uncontrolled-open by default; pass `open` + `onOpenChange` to control visibility.',
          '',
          '**Controlled** — pass `value` + `onChange` (a `string` for single-select, `string[]` for',
          'multi-select).',
          '',
          '## Accessibility',
          '',
          '- Trigger is a `<button type="button">` with `aria-haspopup="listbox"` and `aria-expanded`.',
          '- The panel has `role="listbox"`, plus `aria-multiselectable` when `multiple` is true.',
          '- Each option has `role="option"` and `aria-selected`.',
          '- Press `Escape` to close and return focus to the trigger.',
          '- Pass `aria-label` / `aria-labelledby` when there is no visible `label`.',
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
        'Array of `{ value, label, category?, disabled? }` objects. ' +
        '`value` must be unique. `category` groups options under a header in the menu.',
    },
    type: {
      control: 'radio',
      options: ['contained', 'uncontained'],
      description:
        '`contained` (default) — gray-background pill trigger. ' +
        '`uncontained` — transparent trigger with hover fill.',
    },
    border: {
      control: 'boolean',
      description:
        'When `true` and `type="contained"`, renders a visible border around the trigger. ' +
        'Has no effect when `type="uncontained"`.',
    },
    multiple: {
      control: 'boolean',
      description:
        'When `true`, multiple options can be selected; checkboxes are rendered. ' +
        'The panel stays open until the user clicks outside or presses Escape.',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown in the trigger when nothing is selected. Defaults to `"Select..."`.',
    },
    label: {
      control: 'text',
      description:
        'Optional form label shown above the trigger (14px, neutral-700). ' +
        'When provided, the trigger is automatically associated via `aria-labelledby`.',
    },
    helperText: {
      control: 'text',
      description: 'Optional helper text shown below the trigger (14px, neutral-700).',
    },
    disabled: {
      control: 'boolean',
      description:
        'Disables the trigger and prevents opening the menu. Applies `opacity: 40%` and `pointer-events: none`.',
    },
    value: {
      control: false,
      description:
        'Controlled selected value(s). Pass a `string` for single-select or `string[]` for multi-select.',
    },
    defaultValue: {
      control: false,
      description: 'Initial value when uncontrolled.',
    },
    open: {
      control: false,
      description:
        'Controlled open state. Pair with `onOpenChange` to take full control over visibility.',
    },
    defaultOpen: {
      control: false,
      description: 'Initial open state for uncontrolled mode. Defaults to `false`.',
    },
    onChange: {
      action: 'onChange',
      description:
        'Called on every selection change. Receives a `string` in single-select mode and `string[]` in multi-select mode.',
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

// ---------------------------------------------------------------------------
// Dev helpers
// ---------------------------------------------------------------------------

/** Renders the current value in a small code block — useful for engineers. */
function ValueOutput({
  value,
  multiple,
}: {
  value: string | string[] | undefined;
  multiple?: boolean;
}) {
  const isEmpty = value === undefined || (Array.isArray(value) && value.length === 0);
  const display = isEmpty ? (multiple ? '[]' : 'undefined') : JSON.stringify(value);
  return (
    <pre
      style={{ marginTop: 10 }}
      className="px-[12px] py-[8px] rounded-[6px] bg-[var(--color-neutral-100)] text-[12px] font-mono leading-[1.5] overflow-x-auto"
    >
      <span className="text-[var(--color-neutral-500)]">onChange value: </span>
      <span className="text-[var(--color-neutral-black)]">{display}</span>
    </pre>
  );
}

/**
 * Controlled wrapper that tracks selection state and renders a ValueOutput below.
 * Used in most stories so engineers can see the current value at a glance.
 */
function Demo({
  multiple,
  defaultValue,
  onChange: onChangeProp,
  ...rest
}: React.ComponentProps<typeof DropdownMenu>) {
  const [value, setValue] = React.useState<string | string[] | undefined>(
    defaultValue !== undefined ? defaultValue : multiple ? [] : undefined
  );
  return (
    <div>
      <DropdownMenu
        {...rest}
        multiple={multiple}
        value={value}
        onChange={(v) => {
          setValue(v);
          onChangeProp?.(v);
        }}
      />
      <ValueOutput value={value} multiple={multiple} />
    </div>
  );
}

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  name: 'Playground',
  args: {
    placeholder: 'Select...',
    type: 'contained',
    border: false,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Trigger types
// ---------------------------------------------------------------------------
export const ContainedNoBorder: Story = {
  name: 'Contained (no border)',
  args: { type: 'contained', border: false },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

export const ContainedWithBorder: Story = {
  name: 'Contained (with border)',
  args: { type: 'contained', border: true },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

export const Uncontained: Story = {
  name: 'Uncontained',
  args: { type: 'uncontained' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With label & helper text
// ---------------------------------------------------------------------------
export const WithLabel: Story = {
  name: 'With label',
  args: {
    label: 'Category Value',
    type: 'contained',
    border: false,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

export const WithLabelAndBorder: Story = {
  name: 'With label + border',
  args: {
    label: 'Category Value',
    type: 'contained',
    border: true,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

export const WithHelperText: Story = {
  name: 'With helper text',
  args: {
    label: 'Indicator',
    helperText: 'Choose the indicator to display on the map.',
    type: 'contained',
    border: false,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Category grouping
// ---------------------------------------------------------------------------
export const WithCategories: Story = {
  name: 'With categories',
  args: {
    options: GROUPED_OPTIONS,
    placeholder: 'Select indicator...',
    type: 'contained',
    border: false,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Selection modes
// ---------------------------------------------------------------------------
export const SingleSelectWithValue: Story = {
  name: 'Single-select with default value',
  args: {
    defaultValue: 'income',
    type: 'contained',
    border: false,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

export const MultiSelect: Story = {
  name: 'Multi-select',
  args: {
    multiple: true,
    type: 'contained',
    border: false,
    placeholder: 'Select indicators...',
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

export const MultiSelectWithCategories: Story = {
  name: 'Multi-select with categories',
  args: {
    options: GROUPED_OPTIONS,
    multiple: true,
    type: 'contained',
    border: false,
    placeholder: 'Select indicators...',
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    defaultValue: 'income',
    type: 'contained',
    border: false,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Demo {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Year filter (short list)
// ---------------------------------------------------------------------------
export const YearFilter: Story = {
  name: 'Year filter',
  args: {
    options: YEAR_OPTIONS,
    defaultValue: '2024',
    label: 'Year',
    type: 'contained',
    border: false,
  },
  render: (args) => (
    <div style={{ width: 180 }}>
      <Demo {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Open by default
// ---------------------------------------------------------------------------
export const OpenByDefault: Story = {
  name: 'Open by default',
  args: {
    defaultOpen: true,
    type: 'contained',
    border: false,
    options: GROUPED_OPTIONS,
  },
  render: (args) => (
    <div style={{ width: 280, paddingBottom: 300 }}>
      <Demo {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Side-by-side comparison
// ---------------------------------------------------------------------------
export const AllVariants: Story = {
  name: 'All trigger variants',
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 320 }}>
      <div>
        <p className="text-sm text-[var(--color-neutral-700)] mb-2">Contained</p>
        <Demo options={FILTER_OPTIONS} type="contained" border={false} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-neutral-700)] mb-2">Contained + border</p>
        <Demo options={FILTER_OPTIONS} type="contained" border={true} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-neutral-700)] mb-2">Uncontained</p>
        <Demo options={FILTER_OPTIONS} type="uncontained" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-neutral-700)] mb-2">With label</p>
        <Demo options={FILTER_OPTIONS} label="Category" type="contained" border={false} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-neutral-700)] mb-2">With label + border</p>
        <Demo options={FILTER_OPTIONS} label="Category" type="contained" border={true} />
      </div>
    </div>
  ),
};

export const CustomColors: Story = {
  name: 'Custom trigger colors',
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 320 }}>
      <div>
        <p className="text-sm text-[var(--color-neutral-700)] mb-2">Custom blue palette</p>
        <Demo
          options={FILTER_OPTIONS}
          label="Category"
          triggerBgColor="#dbeafe"
          triggerHoverBgColor="#bfdbfe"
          triggerPressBgColor="#93c5fd"
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-neutral-700)] mb-2">Custom green palette</p>
        <Demo
          options={FILTER_OPTIONS}
          triggerBgColor="#dcfce7"
          triggerHoverBgColor="#bbf7d0"
          triggerPressBgColor="#86efac"
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-neutral-700)] mb-2">Custom via CSS variables</p>
        <Demo
          options={FILTER_OPTIONS}
          type="contained"
          border={true}
          triggerBgColor="var(--color-neutral-white)"
          triggerHoverBgColor="var(--color-neutral-100)"
          triggerPressBgColor="var(--color-neutral-300)"
        />
      </div>
    </div>
  ),
};
