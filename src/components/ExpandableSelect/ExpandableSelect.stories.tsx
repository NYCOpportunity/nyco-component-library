import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { ExpandableSelect } from './ExpandableSelect';
import { ExpandableSelectGroup } from '../ExpandableSelectGroup/ExpandableSelectGroup';

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
        component: [
          'An inline **multi-select** that expands in place to reveal a list of checkbox options.',
          'Unlike a floating `Dropdown`, it renders its options in document flow — opening the panel',
          'pushes the surrounding content down instead of overlaying it. Ideal for filter sidebars',
          'where several selects stack together.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| Trigger button | `label` | — | Category/filter name. Defaults to `"Select..."`. Shows a chevron that flips up when open. |',
          '| Option list | `options` | ✅ | Array of `ExpandableSelectOption` (`value`, `label`, optional `disabled`) rendered as checkbox rows. |',
          '| Selection | `value` / `defaultValue` | — | Array of selected `value` strings. Controlled via `value`, uncontrolled via `defaultValue` (default `[]`). |',
          '| Open state | `open` / `defaultOpen` | — | Controlled via `open`, uncontrolled via `defaultOpen` (default `false`). |',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { ExpandableSelect } from "@nycopportunity/component-library";',
          '',
          '// Uncontrolled — track selection with onChange',
          '<ExpandableSelect',
          '  label="Category"',
          '  options={[',
          '    { value: "housing", label: "Housing" },',
          '    { value: "health", label: "Health" },',
          '    { value: "education", label: "Education" },',
          '  ]}',
          '  defaultValue={["housing"]}',
          '  onChange={(values) => console.log(values)}',
          '/>',
          '',
          '// Controlled — you own both open and value state',
          '<ExpandableSelect',
          '  label="Category"',
          '  options={options}',
          '  open={open}',
          '  onOpenChange={setOpen}',
          '  value={selected}',
          '  onChange={setSelected}',
          '/>',
          '```',
          '',
          '---',
          '',
          '## States',
          '',
          '- **Default** — collapsed, showing the `label` text and a chevron-down icon.',
          '- **Hover** — `neutral-100` background on the trigger.',
          '- **Active / pressed** — `neutral-200` background on the trigger.',
          '- **Focused** — a 3 px blue focus ring wraps the entire component (trigger + open list).',
          '- **Open** — the chevron flips up; a divider and checkbox rows appear below.',
          '- **Disabled** — trigger text and icon render in `neutral-300` and the whole component is non-interactive.',
          '',
          '## Accessibility',
          '',
          '- The trigger is a real `<button>` exposing `aria-expanded` and `aria-controls` pointing at the panel.',
          '- Pressing **Escape** while the panel is open collapses it.',
          '- The option list is a `role="group"` labelled by the trigger; each row is a checkbox (via `ListItem`) reflecting its selected state.',
          '- Supply `aria-label` or `aria-labelledby` when the visible `label` is not descriptive enough on its own.',
        ].join('\n'),
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

// ---------------------------------------------------------------------------
// Filter panel — uses ExpandableSelectGroup (see Components/ExpandableSelectGroup)
// ---------------------------------------------------------------------------
const demographicFilters = [
  { id: 'age', label: 'Age', options: categoryOptions },
  { id: 'sex', label: 'Sex', options: categoryOptions },
  { id: 'race', label: 'Race / ethnicity', options: categoryOptions },
  { id: 'disability', label: 'Disability status', options: categoryOptions },
  { id: 'nativity', label: 'Nativity', options: categoryOptions },
  { id: 'borough', label: 'Borough', options: categoryOptions },
];

/** Filter panel card — all filters collapsed (left panel in Figma). */
export const FilterPanelAllCollapsed: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ width: '345px' }}>
      <ExpandableSelectGroup
        title="Segment by demographics (optional)"
        subtitle="Select up to two categories"
        filters={demographicFilters}
      />
    </div>
  ),
};

/** Filter panel card — second filter open (right panel in Figma). */
export const FilterPanelOneOpen: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ width: '345px' }}>
      <ExpandableSelectGroup
        title="Segment by demographics (optional)"
        subtitle="Select up to two categories"
        filters={demographicFilters}
        defaultOpenId="sex"
      />
    </div>
  ),
};
