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
          'A managed group of chips. Two modes:\n\n' +
          '- **`multiselect`** (default) — renders all `options` as selectable chips. ' +
          'Manages selection state internally. Add `pending` to buffer changes behind an Apply button.\n' +
          '- **`dismissible`** — renders only the items currently in `value` as dismissible chips. ' +
          'The source of which items are active is entirely external (dropdown, URL params, API, etc.). ' +
          'Clicking × fires `onChange` with the item removed — no selection logic, purely display + removal.',
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
      options: ['multiselect', 'dismissible'],
      description:
        '`multiselect` — selectable chips, manages selection. ' +
        '`dismissible` — renders externally-provided items as dismissible chips (no selection logic).',
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
          'Switch `mode` between `multiselect` and `dismissible`, enable `pending`, or set a `defaultValue`.',
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
// Dismissible — fed from external source
// ---------------------------------------------------------------------------
function DismissibleExample() {
  // Simulates an external source (e.g. a dropdown or API) that feeds selected values.
  // ChipGroup dismissible mode is purely a display + removal layer.
  const [active, setActive] = React.useState<string[]>(['poverty', 'unemployment']);

  const available = FILTER_OPTIONS.filter((o) => !active.includes(o.value));

  return (
    <div
      style={{
        fontFamily: 'Public Sans, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Simulated external source */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#aaa', marginRight: 4 }}>
          Add from external source:
        </span>
        {available.map((o) => (
          <button
            key={o.value}
            onClick={() => setActive((prev) => [...prev, o.value])}
            style={{
              fontSize: 12,
              padding: '3px 10px',
              cursor: 'pointer',
              border: '1px solid #ddd',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            + {o.label}
          </button>
        ))}
        {available.length === 0 && <span style={{ fontSize: 12, color: '#aaa' }}>All added</span>}
      </div>

      {/* Dismissible ChipGroup — only renders + removes */}
      <ChipGroup options={FILTER_OPTIONS} mode="dismissible" value={active} onChange={setActive} />

      {active.length === 0 && (
        <p style={{ fontSize: 13, color: '#aaa', margin: 0 }}>No active filters.</p>
      )}
    </div>
  );
}

export const Dismissible: Story = {
  name: 'Dismissible — externally sourced',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '`mode="dismissible"` renders the items in `value` as dismissible chips — nothing more. ' +
          'The source of the items is entirely external: in real usage it could be a dropdown, ' +
          'URL params, or an API response (a dropdown component will be built to pair with this). ' +
          'The simulated "Add" buttons stand in for that future source. ' +
          'Clicking × fires `onChange` with the item removed.',
      },
    },
  },
  render: () => <DismissibleExample />,
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
