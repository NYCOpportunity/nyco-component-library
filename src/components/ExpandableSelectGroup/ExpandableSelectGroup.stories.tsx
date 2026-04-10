import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ExpandableSelectGroup } from './ExpandableSelectGroup';
import { ChipGroup } from '../ChipGroup/ChipGroup';
import type { ExpandableSelectGroupFilter } from '../../types/components';

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------
const demographicOptions = [
  { value: 'age', label: 'Age' },
  { value: 'sex', label: 'Sex' },
  { value: 'race', label: 'Race / ethnicity' },
  { value: 'disability', label: 'Disability status' },
  { value: 'nativity', label: 'Nativity' },
];

const demographicFilters: ExpandableSelectGroupFilter[] = [
  { id: 'age', label: 'Age', options: demographicOptions },
  { id: 'sex', label: 'Sex', options: demographicOptions },
  { id: 'race', label: 'Race / ethnicity', options: demographicOptions },
  { id: 'disability', label: 'Disability status', options: demographicOptions },
  { id: 'nativity', label: 'Nativity', options: demographicOptions },
  { id: 'borough', label: 'Borough', options: demographicOptions },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof ExpandableSelectGroup> = {
  title: 'Components/ExpandableSelectGroup',
  component: ExpandableSelectGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '`ExpandableSelectGroup` is a filter panel card composed of stacked `ExpandableSelect` rows.\n\n' +
          'It provides an optional title + subtitle header, borders the whole panel in a white card, ' +
          'and wires accordion behavior (opening one filter closes the rest) out of the box.\n\n' +
          '---\n\n' +
          '## Props\n\n' +
          '| Prop | Type | Default | Description |\n' +
          '|---|---|---|---|\n' +
          '| `filters` | `ExpandableSelectGroupFilter[]` | — | Filter rows |\n' +
          '| `title` | `string` | — | Card heading (semibold 18 px) |\n' +
          '| `subtitle` | `string` | — | Subtitle below heading (regular 16 px) |\n' +
          '| `value` | `Record<id, string[]>` | — | Controlled selection map |\n' +
          '| `defaultValue` | `Record<id, string[]>` | `{}` | Uncontrolled initial selections |\n' +
          '| `onChange` | `(map) => void` | — | Called on any selection change |\n' +
          '| `defaultOpenId` | `string` | — | Filter `id` that starts open |\n' +
          '| `accordion` | `boolean` | `true` | One-open-at-a-time mode |\n',
      },
    },
  },
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '345px' }}>
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

/** All filters collapsed — matches the left panel in the Figma. */
export const AllCollapsed: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters,
  },
};

/** Second filter pre-opened — matches the right panel in the Figma. */
export const OneOpen: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters,
    defaultOpenId: 'sex',
  },
};

/** Pre-selected values on two filters. */
export const WithSelections: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters,
    defaultOpenId: 'age',
    defaultValue: {
      age: ['age', 'sex'],
      race: ['race'],
    },
  },
};

/** `accordion={false}` — multiple filters can be open at the same time. */
export const MultiOpen: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters,
    accordion: false,
    defaultOpenId: 'age',
  },
};

/** No title or subtitle — bare filter list. */
export const FiltersOnly: Story = {
  args: {
    filters: demographicFilters,
  },
};

/** One filter row disabled. */
export const WithDisabledFilter: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters.map((f) => ({ ...f, disabled: f.id === 'nativity' })),
  },
};

// ---------------------------------------------------------------------------
// Interactive playground — shows live selection output
// ---------------------------------------------------------------------------
function InteractiveDemo() {
  const [selection, setSelection] = React.useState<Record<string, string[]>>({});

  const allSelected = Object.entries(selection).filter(([, vals]) => vals.length > 0);

  return (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {/* Panel */}
      <div style={{ width: '345px', flexShrink: 0 }}>
        <ExpandableSelectGroup
          title="Segment by demographics (optional)"
          subtitle="Select up to two categories"
          filters={demographicFilters}
          value={selection}
          onChange={setSelection}
          accordion={false}
        />
      </div>

      {/* Output */}
      <div style={{ flex: '1', minWidth: '260px' }}>
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-neutral-700, #777)',
            margin: '0 0 12px',
          }}
        >
          Selected values
        </p>

        {allSelected.length === 0 ? (
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: 'var(--color-neutral-500, #aaa)',
              margin: 0,
            }}
          >
            Nothing selected yet — open a filter and pick some options.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {allSelected.map(([filterId, vals]) => (
              <div key={filterId}>
                <p
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: '14px',
                    color: 'var(--color-neutral-black, #191919)',
                    margin: '0 0 4px',
                  }}
                >
                  {demographicFilters.find((f) => f.id === filterId)?.label ?? filterId}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {vals.map((v) => (
                    <span
                      key={v}
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: '13px',
                        padding: '2px 10px',
                        borderRadius: '99px',
                        backgroundColor: 'var(--color-primary-base, #050560)',
                        color: '#fff',
                      }}
                    >
                      {demographicOptions.find((o) => o.value === v)?.label ?? v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Raw output for copy-paste */}
        {allSelected.length > 0 && (
          <pre
            style={{
              marginTop: '20px',
              padding: '12px 16px',
              backgroundColor: 'var(--color-neutral-100, #f5f5f5)',
              borderRadius: '6px',
              fontFamily: "'SFMono-Regular', Consolas, monospace",
              fontSize: '12px',
              color: 'var(--color-neutral-black, #191919)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {JSON.stringify(selection, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

/**
 * Interactive playground — pick values across filters and see the JSON output live.
 * Useful for understanding the `value` / `onChange` API shape.
 */
export const Playground: Story = {
  parameters: { layout: 'padded' },
  render: () => <InteractiveDemo />,
};

// ---------------------------------------------------------------------------
// WithDismissibleChips story
// ---------------------------------------------------------------------------
function WithDismissibleChipsDemo() {
  const [selection, setSelection] = React.useState<Record<string, string[]>>({});

  // Flatten selected values into a list of { filterId, value, label } objects
  const selectedChips = Object.entries(selection).flatMap(([filterId, vals]) =>
    vals.map((v) => ({
      key: `${filterId}:${v}`,
      filterId,
      value: v,
      filterLabel: demographicFilters.find((f) => f.id === filterId)?.label ?? filterId,
      optionLabel: demographicOptions.find((o) => o.value === v)?.label ?? v,
    }))
  );

  const dismiss = (filterId: string, value: string) => {
    setSelection((prev) => {
      const next = { ...prev, [filterId]: (prev[filterId] ?? []).filter((v) => v !== value) };
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {/* Filter panel */}
      <div style={{ width: '345px', flexShrink: 0 }}>
        <ExpandableSelectGroup
          title="Segment by demographics (optional)"
          subtitle="Select up to two categories"
          filters={demographicFilters}
          value={selection}
          onChange={setSelection}
        />
      </div>

      {/* Chip output */}
      <div style={{ flex: '1', minWidth: '260px' }}>
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-neutral-700, #777)',
            margin: '0 0 12px',
          }}
        >
          Active filters
        </p>

        {selectedChips.length === 0 ? (
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: 'var(--color-neutral-500, #aaa)',
              margin: 0,
            }}
          >
            No filters selected — open a category and pick some options.
          </p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selectedChips.map(({ key, filterId, value, filterLabel, optionLabel }) => (
              <ChipGroup
                key={key}
                mode="dismissible"
                options={[{ value, label: `${filterLabel}: ${optionLabel}` }]}
                value={[value]}
                onChange={() => dismiss(filterId, value)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Filter panel paired with dismissible chips — selecting an option creates a chip;
 * clicking × on the chip removes it from the selection.
 */
export const WithDismissibleChips: Story = {
  parameters: { layout: 'padded' },
  render: () => <WithDismissibleChipsDemo />,
};
