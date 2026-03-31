import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ChipGroup } from './ChipGroup';

// ---------------------------------------------------------------------------
// Shared sample options
// ---------------------------------------------------------------------------
const FILTER_OPTIONS = [
  {
    value: 'poverty',
    label: 'Poverty rate',
    tooltip: 'Percentage of population below the federal poverty line.',
    tooltipTitle: 'Poverty rate',
  },
  {
    value: 'unemployment',
    label: 'Unemployment',
    tooltip: 'Percentage of adults actively seeking work but unemployed.',
    tooltipTitle: 'Unemployment',
  },
  { value: 'income', label: 'Median income' },
  { value: 'housing', label: 'Housing cost burden' },
  { value: 'food', label: 'Food insecurity' },
  { value: 'health', label: 'Health coverage' },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof ChipGroup> = {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A managed group of chips that handles multi-selection state. ' +
          'Two modes control the visual layout:\n\n' +
          '- **`multiselect`** (default) — all options in one row of selectable chips.\n' +
          '- **`picker`** — options row + a second row of selected items as dismissible chips.\n\n' +
          'Add the **`pending`** prop to buffer changes and commit them with an Apply button ' +
          '(form use case). Without it, `onChange` fires on every click (live / instant use case).',
      },
    },
  },
  args: {
    options: FILTER_OPTIONS,
    onChange: fn(),
    onApply: fn(),
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['multiselect', 'picker'],
      description:
        '`multiselect` — one row of selectable chips. ' +
        '`picker` — options row + dismiss row for selected items.',
    },
    pending: {
      control: 'boolean',
      description:
        'Buffer selection behind Apply / Clear buttons. ' +
        'Use for form-style interactions where the user commits explicitly.',
    },
    applyLabel: { control: 'text', description: 'Override the Apply button label.' },
    clearLabel: { control: 'text', description: 'Override the Clear button label.' },
    defaultValue: {
      control: {
        type: 'check',
        labels: Object.fromEntries(FILTER_OPTIONS.map((o) => [o.value, o.label])),
      },
      options: FILTER_OPTIONS.map((o) => o.value),
      description: 'Uncontrolled initial selection (array of option `value` strings).',
    },
    onChange: { action: 'onChange', description: 'Fired on every selection change (live mode).' },
    onApply: { action: 'onApply', description: 'Fired when Apply is clicked (pending mode).' },
  },
};

export default meta;
type Story = StoryObj<typeof ChipGroup>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  name: 'Playground',
  args: {
    mode: 'multiselect',
    pending: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Try every prop from the **Controls** panel. ' +
          'Switch `mode` to `picker`, enable `pending`, or set a `defaultValue` to see all behaviors.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Multiselect — Live
// ---------------------------------------------------------------------------
function MultiselectLiveExample() {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <ChipGroup options={FILTER_OPTIONS} mode="multiselect" onChange={setSelected} />
      {selected.length > 0 && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#555' }}>
          Selected: <strong>{selected.join(', ')}</strong>
        </p>
      )}
    </div>
  );
}

export const MultiselectLive: Story = {
  name: 'Multiselect — Live',
  parameters: {
    docs: {
      description: {
        story:
          '`onChange` fires on every click. Results update instantly — ideal for filtering ' +
          'where the UI reacts in real time.',
      },
    },
  },
  render: () => <MultiselectLiveExample />,
};

// ---------------------------------------------------------------------------
// Multiselect — Pending (form)
// ---------------------------------------------------------------------------
function MultiselectPendingExample() {
  const [committed, setCommitted] = React.useState<string[]>([]);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <ChipGroup options={FILTER_OPTIONS} mode="multiselect" pending onApply={setCommitted} />
      {committed.length > 0 && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#555' }}>
          Applied filters: <strong>{committed.join(', ')}</strong>
        </p>
      )}
      {committed.length === 0 && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#aaa' }}>
          No filters applied yet — select chips and click Apply.
        </p>
      )}
    </div>
  );
}

export const MultiselectPending: Story = {
  name: 'Multiselect — Pending (form)',
  parameters: {
    docs: {
      description: {
        story:
          'Selection is buffered until the user clicks **Apply**. ' +
          'Apply is disabled until the draft diverges from the committed state. ' +
          'Clear reverts the draft to the last committed value.',
      },
    },
  },
  render: () => <MultiselectPendingExample />,
};

// ---------------------------------------------------------------------------
// Picker — Live
// ---------------------------------------------------------------------------
function PickerLiveExample() {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <ChipGroup options={FILTER_OPTIONS} mode="picker" onChange={setSelected} />
      {selected.length > 0 && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#555' }}>
          Active: <strong>{selected.join(', ')}</strong>
        </p>
      )}
    </div>
  );
}

export const PickerLive: Story = {
  name: 'Picker — Live',
  parameters: {
    docs: {
      description: {
        story:
          'Clicking a chip moves it into a dismissible row below. ' +
          'Clicking × removes it from the selection and deselects it in the options row. ' +
          'Changes fire `onChange` immediately.',
      },
    },
  },
  render: () => <PickerLiveExample />,
};

// ---------------------------------------------------------------------------
// Picker — Pending (form)
// ---------------------------------------------------------------------------
function PickerPendingExample() {
  const [committed, setCommitted] = React.useState<string[]>([]);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <ChipGroup
        options={FILTER_OPTIONS}
        mode="picker"
        pending
        defaultValue={['poverty', 'unemployment']}
        onApply={setCommitted}
      />
      {committed.length > 0 && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#555' }}>
          Applied: <strong>{committed.join(', ')}</strong>
        </p>
      )}
      {committed.length === 0 && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#aaa' }}>
          Select chips and click Apply to commit.
        </p>
      )}
    </div>
  );
}

export const PickerPending: Story = {
  name: 'Picker — Pending (form)',
  parameters: {
    docs: {
      description: {
        story:
          'Picker layout with `pending` mode. Pre-loaded with two default selections via `defaultValue`. ' +
          'Changes are buffered until Apply.',
      },
    },
  },
  render: () => <PickerPendingExample />,
};

// ---------------------------------------------------------------------------
// With pre-selected defaultValue
// ---------------------------------------------------------------------------
export const WithDefaultValue: Story = {
  name: 'With Default Value',
  args: {
    mode: 'multiselect',
    defaultValue: ['poverty', 'income', 'health'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pass `defaultValue` to pre-select chips on mount (uncontrolled). ' +
          'The "Clear all" button resets the whole selection.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------
function ControlledExample() {
  const [value, setValue] = React.useState(['poverty']);
  return (
    <div
      style={{
        fontFamily: 'Public Sans, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <ChipGroup options={FILTER_OPTIONS} mode="multiselect" value={value} onChange={setValue} />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={() => setValue([])}
          style={{ fontSize: 12, padding: '4px 10px', cursor: 'pointer' }}
        >
          Clear externally
        </button>
        <button
          onClick={() => setValue(FILTER_OPTIONS.map((o) => o.value))}
          style={{ fontSize: 12, padding: '4px 10px', cursor: 'pointer' }}
        >
          Select all externally
        </button>
      </div>
      <p style={{ fontSize: 13, color: '#555', margin: 0 }}>
        Controlled value: <strong>[{value.join(', ')}]</strong>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story:
          'Pass `value` + `onChange` for a fully controlled ChipGroup. ' +
          'The external buttons demonstrate driving selection from outside the component.',
      },
    },
  },
  render: () => <ControlledExample />,
};
