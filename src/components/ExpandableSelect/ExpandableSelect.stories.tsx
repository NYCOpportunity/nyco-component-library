import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ExpandableSelect } from './ExpandableSelect';

// ---------------------------------------------------------------------------
// Shared option sets
// ---------------------------------------------------------------------------
const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
];

const categoryOptions = [
  { value: 'housing', label: 'Housing' },
  { value: 'income', label: 'Income & employment' },
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'safety', label: 'Public safety' },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof ExpandableSelect> = {
  title: 'Components/ExpandableSelect',
  component: ExpandableSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '`ExpandableSelect` is an inline multi-select that expands in place to reveal a list of checkboxes.\n\n' +
          'Unlike `Dropdown`, it does **not** float a panel — the options are rendered in document flow and push surrounding content down.\n\n' +
          '---\n\n' +
          '## States\n\n' +
          '- **Default** — collapsed, showing the `label` text and a chevron-down icon\n' +
          '- **Hover** — neutral-100 background on the trigger\n' +
          '- **Active/Pressed** — neutral-200 background on the trigger\n' +
          '- **Focused** — 3 px blue focus ring around the entire component\n' +
          '- **Open** — chevron flips to point up; a divider + checkbox rows appear below\n' +
          '- **Disabled** — trigger text and icon render in neutral-300; non-interactive\n\n' +
          '---\n\n' +
          '## Props\n\n' +
          '| Prop | Type | Default | Description |\n' +
          '|---|---|---|---|\n' +
          '| `label` | `string` | `"Select..."` | Text shown in the trigger button |\n' +
          '| `options` | `ExpandableSelectOption[]` | — | Checkbox rows displayed when open |\n' +
          '| `value` | `string[]` | — | Controlled selected values |\n' +
          '| `defaultValue` | `string[]` | `[]` | Initial uncontrolled values |\n' +
          '| `onChange` | `(v: string[]) => void` | — | Called on every selection change |\n' +
          '| `open` | `boolean` | — | Controlled open state |\n' +
          '| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |\n' +
          '| `onOpenChange` | `(open: boolean) => void` | — | Called when open state changes |\n' +
          '| `disabled` | `boolean` | `false` | Disables the trigger |\n',
      },
    },
  },
  args: {
    onChange: fn(),
    onOpenChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '340px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Default collapsed state. Click to open. */
export const Default: Story = {
  args: {
    label: 'Category',
    options: categoryOptions,
  },
};

/** Pre-opened so the checkbox list is immediately visible. */
export const Open: Story = {
  args: {
    label: 'Category',
    options: categoryOptions,
    defaultOpen: true,
  },
};

/** Some options pre-selected. */
export const WithSelections: Story = {
  args: {
    label: 'Category',
    options: categoryOptions,
    defaultValue: ['housing', 'health'],
    defaultOpen: true,
  },
};

/** Disabled trigger — greyed out, non-interactive. */
export const Disabled: Story = {
  args: {
    label: 'Category',
    options: categoryOptions,
    disabled: true,
  },
};

/** Mimics the "all selected" case. */
export const AllSelected: Story = {
  args: {
    label: 'Color',
    options: colorOptions,
    defaultValue: colorOptions.map((o) => o.value),
    defaultOpen: true,
  },
};

/** Some options are individually disabled. */
export const WithDisabledOptions: Story = {
  args: {
    label: 'Color',
    options: [
      { value: 'red', label: 'Red' },
      { value: 'blue', label: 'Blue', disabled: true },
      { value: 'green', label: 'Green' },
      { value: 'yellow', label: 'Yellow', disabled: true },
      { value: 'purple', label: 'Purple' },
    ],
    defaultOpen: true,
  },
};

/** Multiple expandable selects stacked — mirrors the filter sidebar use-case in the Figma. */
function StackedFiltersDemo() {
  const [cat, setCat] = React.useState<string[]>([]);
  const [color, setColor] = React.useState<string[]>([]);
  return (
    <div style={{ maxWidth: '340px', display: 'flex', flexDirection: 'column' }}>
      <ExpandableSelect
        label="Category"
        options={categoryOptions}
        value={cat}
        onChange={setCat}
        defaultOpen
      />
      <ExpandableSelect label="Color" options={colorOptions} value={color} onChange={setColor} />
      <ExpandableSelect
        label="Status"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
    </div>
  );
}

export const StackedFilters: Story = {
  render: () => <StackedFiltersDemo />,
};
