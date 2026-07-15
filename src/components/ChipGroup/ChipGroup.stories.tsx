import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
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
        component: [
          'A **ChipGroup** manages a whole row of related chips and their shared selection state',
          'across three interaction modes. Use it for filter bars, faceted search, and any place a',
          'set of **Chip**s needs to be selected, single-selected, or dismissed together.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| Options registry | `options` | ✅ | `ChipOption[]` providing `value`, `label`, `tooltip`, and `disabled` per item. |',
          '| Chip row | `mode` | — | `multiselect` (default), `singleselect`, or `dismissible`. |',
          '| Action row | `pending`, `applyLabel`, `clearLabel` | — | Apply / Clear buttons rendered below the chips in pending mode. |',
          '| Custom actions | `renderActions` | — | Render prop that replaces the built-in action row. |',
          '| Slot overrides | `componentStyle` | — | Per-slot class names for `chipContainer`, `chip`, and `actions`. |',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { ChipGroup } from "@nycopportunity/component-library";',
          '',
          'const options = [',
          '  { value: "poverty", label: "Poverty rate" },',
          '  { value: "income", label: "Median income" },',
          '  { value: "rent", label: "Rent burden", disabled: true },',
          '];',
          '',
          '// Live multiselect — onChange fires on every click',
          '<ChipGroup options={options} onChange={(next) => setFilters(next)} />',
          '',
          '// Pending multiselect — buffer changes behind Apply / Clear',
          '<ChipGroup options={options} pending onApply={(committed) => setFilters(committed)} />',
          '```',
          '',
          '---',
          '',
          '## Modes',
          '',
          '**`multiselect`** (default) — renders all `options` as selectable chips; multiple can be',
          'active at once.',
          '- *Live* (default): `onChange` fires on every click — ideal for instant filtering.',
          '- *Pending* (`pending`): changes are buffered and Apply / Clear buttons appear. `Apply`',
          '  is disabled until the draft diverges from the committed state; `Clear` reverts the draft',
          '  to the last committed value. Use `onApply` to receive the committed selection.',
          '- *Custom actions* (`renderActions`): replace the built-in row entirely. Receives',
          '  `{ selected, apply, clear, clearAll, isDirty }`.',
          '',
          '**`singleselect`** — the same chip row, but at most one chip is active at a time. Clicking',
          'a chip selects it and deselects any previous one; clicking the active chip toggles it off.',
          '`onChange` always fires immediately (no `pending`) with an array of 0 or 1 items.',
          '',
          '**`dismissible`** — renders only the currently active items (from `value`) as dismissible',
          'chips. Which items are active is driven entirely externally (a dropdown, URL params, an',
          'API). Clicking a chip fires `onChange` with that item removed; the whole chip surface is',
          'the dismiss trigger.',
          '',
          '---',
          '',
          '## State management',
          '',
          '**Uncontrolled** — omit `value`; optionally pass `defaultValue` to pre-select on mount.',
          'Selection is tracked internally and reported via `onChange` / `onApply`.',
          '',
          '**Controlled** — pass `value` + `onChange`; external state fully drives selection. In',
          'pending mode, `value` syncs both the draft and committed state when it changes from',
          'outside.',
          '',
          '---',
          '',
          '## Edge cases',
          '',
          '- **Disabled options**: set `disabled: true` on any `ChipOption`; other chips stay',
          '  interactive.',
          '- **Empty `value` (dismissible)**: renders an empty row — the caller shows any fallback.',
          '- **`value` item missing from `options`**: dismissible mode silently skips it (no',
          '  label/tooltip to look up).',
          '- **`pending` on non-multiselect modes**: ignored; those modes always fire `onChange`',
          '  immediately.',
          '- **`clearAll` in pending mode**: wipes both draft and committed to `[]` and fires',
          '  `onChange` — the only action that bypasses the pending buffer.',
          '',
          '## Accessibility',
          '',
          '- Selection chips are `role="checkbox"` buttons with `aria-checked`; dismissible chips',
          '  expose an `aria-label` of `"Remove {label}"`.',
          '- Every chip and action button is keyboard operable with a visible `focus-visible` ring.',
        ].join('\n'),
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
      options: ['multiselect', 'singleselect', 'dismissible'],
      description:
        '`multiselect` — selectable chips, manages selection. ' +
        '`singleselect` — one chip at a time; clicking another switches the selection. ' +
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
          'Switch `mode` between `multiselect`, `singleselect`, and `dismissible`, enable `pending`, or set a `defaultValue`.',
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
// Singleselect
// ---------------------------------------------------------------------------
function SingleselectExample() {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <ChipGroup options={FILTER_OPTIONS} mode="singleselect" onChange={setSelected} />
      <p
        style={{
          marginTop: 16,
          fontSize: 13,
          color: selected.length ? '#555' : '#aaa',
          margin: '12px 0 0',
        }}
      >
        {selected.length ? (
          <>
            Active: <strong>{selected[0]}</strong>
          </>
        ) : (
          'Select one option — clicking another switches the selection.'
        )}
      </p>
    </div>
  );
}

export const Singleselect: Story = {
  name: 'Singleselect',
  parameters: {
    docs: {
      description: {
        story:
          'Only one chip can be active at a time. Clicking a chip selects it and deselects the previous one. ' +
          'Clicking the active chip again deselects it. ' +
          '`onChange` always receives an array of 0 or 1 items.',
      },
    },
  },
  render: () => <SingleselectExample />,
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

// ---------------------------------------------------------------------------
// Custom Actions — renderActions render prop
// ---------------------------------------------------------------------------

// Reusable mini button matching the design system style used in stories
function StoryButton({
  children,
  onClick,
  disabled,
  variant = 'primary',
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none';
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-100',
    ghost: 'text-gray-500 underline underline-offset-2 hover:text-gray-800',
  };
  return (
    <button
      type="button"
      className={`${base} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Story 1: Custom "Apply filters" + "Reset" — single-submit pattern
function CustomActionsExample() {
  const [committed, setCommitted] = React.useState<string[]>([]);
  return (
    <div
      style={{
        fontFamily: 'Public Sans, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <ChipGroup
        options={FILTER_OPTIONS}
        mode="multiselect"
        pending
        onApply={setCommitted}
        renderActions={({ selected, apply, clearAll, isDirty }) => (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 4 }}>
            <StoryButton onClick={apply} disabled={!isDirty}>
              Apply filters ({selected.length})
            </StoryButton>
            <StoryButton variant="ghost" onClick={clearAll}>
              Reset all
            </StoryButton>
          </div>
        )}
      />
      {committed.length > 0 ? (
        <p style={{ fontSize: 13, color: '#555', margin: 0 }}>
          Applied: <strong>{committed.join(', ')}</strong>
        </p>
      ) : (
        <p style={{ fontSize: 13, color: '#aaa', margin: 0 }}>No filters applied yet.</p>
      )}
    </div>
  );
}

export const CustomActions: Story = {
  name: 'Custom Actions — renderActions',
  parameters: {
    docs: {
      description: {
        story:
          'Pass `renderActions` to replace the built-in Apply / Clear row with any UI you like. ' +
          'The render prop receives `{ selected, apply, clear, clearAll, isDirty }` — ' +
          'wire your own buttons directly to those handlers. ' +
          'Here a custom "Apply filters (n)" button and a "Reset all" ghost link replace the defaults.',
      },
    },
  },
  render: () => <CustomActionsExample />,
};

// Story 2: Two custom submit actions — "Save Draft" + "Publish"
function TwoActionsExample() {
  const [draft, setDraft] = React.useState<string | null>(null);
  const [published, setPublished] = React.useState<string | null>(null);

  return (
    <div
      style={{
        fontFamily: 'Public Sans, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <ChipGroup
        options={FILTER_OPTIONS}
        mode="multiselect"
        renderActions={({ selected, clearAll }) => (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 4 }}>
            <StoryButton
              variant="secondary"
              onClick={() => setDraft(`[${selected.join(', ')}]`)}
              disabled={selected.length === 0}
            >
              Save draft
            </StoryButton>
            <StoryButton
              onClick={() => setPublished(`[${selected.join(', ')}]`)}
              disabled={selected.length === 0}
            >
              Publish
            </StoryButton>
            <StoryButton variant="ghost" onClick={clearAll}>
              Clear
            </StoryButton>
          </div>
        )}
      />
      <div
        style={{ fontSize: 13, color: '#555', display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        {draft && (
          <span>
            Draft saved: <strong>{draft}</strong>
          </span>
        )}
        {published && (
          <span>
            Published: <strong>{published}</strong>
          </span>
        )}
        {!draft && !published && (
          <span style={{ color: '#aaa' }}>Select chips, then Save or Publish.</span>
        )}
      </div>
    </div>
  );
}

export const TwoCustomActions: Story = {
  name: 'Two Custom Actions — Save Draft + Publish',
  parameters: {
    docs: {
      description: {
        story:
          'A `renderActions` example with two distinct submit-style buttons: ' +
          '"Save draft" (secondary) and "Publish" (primary), plus a ghost "Clear". ' +
          'All three are wired to handlers from the render prop context — no built-in actions at all.',
      },
    },
  },
  render: () => <TwoActionsExample />,
};
