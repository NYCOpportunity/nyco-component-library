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

// ---------------------------------------------------------------------------
// Filter panel — matches Figma node 6132:31730
// ---------------------------------------------------------------------------
const demographicOptions = [
  { value: 'age', label: 'Age' },
  { value: 'sex', label: 'Sex' },
  { value: 'race', label: 'Race / ethnicity' },
  { value: 'disability', label: 'Disability status' },
  { value: 'nativity', label: 'Nativity' },
];

const filterGroups = [
  { label: 'Age', options: demographicOptions },
  { label: 'Sex', options: demographicOptions },
  { label: 'Race / ethnicity', options: demographicOptions },
  { label: 'Disability status', options: demographicOptions },
  { label: 'Nativity', options: demographicOptions },
  { label: 'Borough', options: demographicOptions },
];

interface FilterPanelProps {
  /** Index (0-based) of the filter that starts open. Pass -1 for all collapsed. */
  openIndex?: number;
}

function FilterPanel({ openIndex = -1 }: FilterPanelProps) {
  const [openIdx, setOpenIdx] = React.useState<number>(openIndex);

  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '2px solid var(--color-neutral-300, #ddd)',
        borderRadius: '8px',
        paddingTop: '24px',
        paddingBottom: '24px',
        width: '345px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Title + subtitle */}
      <div
        style={{
          paddingLeft: '24px',
          paddingRight: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: 1.6,
            color: 'var(--color-neutral-black, #191919)',
            margin: 0,
          }}
        >
          Segment by demographics (optional)
        </p>
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'var(--color-neutral-700, #777)',
            margin: 0,
          }}
        >
          Select up to two categories
        </p>
      </div>

      {/* Stacked filters */}
      <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        {filterGroups.map((group, i) => (
          <ExpandableSelect
            key={group.label}
            label={group.label}
            options={group.options}
            open={openIdx === i}
            onOpenChange={(next) => setOpenIdx(next ? i : -1)}
          />
        ))}
      </div>
    </div>
  );
}

/** Filter panel card — all filters collapsed (left panel in Figma). */
export const FilterPanelAllCollapsed: Story = {
  parameters: { layout: 'centered' },
  render: () => <FilterPanel openIndex={-1} />,
};

/** Filter panel card — second filter open (right panel in Figma). */
export const FilterPanelOneOpen: Story = {
  parameters: { layout: 'centered' },
  render: () => <FilterPanel openIndex={1} />,
};

/** Side-by-side — both states shown together, exactly as in Figma. */
function FilterPanelPairDemo() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-start',
        padding: '40px',
        backgroundColor: 'var(--color-neutral-100, #f5f5f5)',
      }}
    >
      <FilterPanel openIndex={-1} />
      <FilterPanel openIndex={1} />
    </div>
  );
}

/** Both panel states as a pair — mirrors the Figma canvas exactly. */
export const FilterPanelPair: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => <FilterPanelPairDemo />,
};
