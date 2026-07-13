import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ListItem } from './ListItem';
import { useState } from 'react';

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A single interactive **list item** row used inside menus, dropdowns, selects, and filter',
          'panels. Pick a `type` to get a plain action row, a right-hand checkmark, or a left-hand',
          'checkbox / radio control.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Part | Prop | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| Label | `label` | ✅ | The main visible text — also the accessible name. |',
          '| Overline | `primaryLabel` | — | Small text above the label. `standard` type only. |',
          '| Underline | `secondaryLabel` | — | Small text below the label. `standard` type only. |',
          '| Selection icon | `type` | — | Checkmark (`multi-standard`), checkbox, or radio. |',
          '| Slot overrides | `slots`, `className` | — | Tailwind class hooks for the root and each inner slot. |',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { ListItem } from "@nycopportunity/component-library";',
          '',
          '// Plain action row',
          '<ListItem label="View details" onClick={() => open()} />',
          '',
          '// Checkbox row, controlled',
          'const [checked, setChecked] = React.useState(false);',
          '<ListItem',
          '  label="Remember me"',
          '  type="checkbox"',
          '  selected={checked}',
          '  onSelectedChange={setChecked}',
          '/>',
          '```',
          '',
          '---',
          '',
          '## Types',
          '',
          'The `type` prop controls the visual and interactive behavior:',
          '',
          '| Type | Icon | Behavior | Use for |',
          '| --- | --- | --- | --- |',
          '| `standard` (default) | — | Fires `onClick` only. | Navigation / action menus. |',
          '| `multi-standard` | Right checkmark | Toggles on every click. | Multi-select dropdowns. |',
          '| `checkbox` | Left checkbox | Toggles on every click. | Checklist-style lists. |',
          '| `radio` | Left radio | Selects only — never deselects on re-click. | Single-select groups. |',
          '',
          '## Labels',
          '',
          'Every item requires a `label`. On the `standard` type you can also add `primaryLabel` (small',
          'overline above) and `secondaryLabel` (small underline below).',
          '',
          '## Controlled vs. uncontrolled',
          '',
          '**Uncontrolled** — omit `selected`, optionally pass `defaultSelected`; the component owns its',
          'selection state.',
          '',
          '**Controlled** — pass `selected` + `onSelectedChange` and keep the state in sync yourself.',
          '',
          '## Radio groups',
          '',
          'Wire multiple `radio` items by sharing an external value: pass `selected={value === id}` and',
          '`onSelectedChange={() => setValue(id)}` to each. The `radio` type never calls',
          '`onSelectedChange(false)`, so the active item can only change by selecting another.',
          '',
          '## Styling',
          '',
          '`className` targets the root `<button>` — use Tailwind modifiers or CSS-variable overrides',
          '(e.g. `[--color-neutral-100:#e0f2fe]`) to retheme hover / press colors. `slots` provides',
          'per-part overrides for `icon`, `label`, `primaryLabel`, and `secondaryLabel`.',
          '',
          '```tsx',
          '<ListItem',
          '  label="Custom item"',
          '  type="checkbox"',
          '  slots={{',
          '    icon: "text-violet-600",',
          '    label: "font-semibold text-lg",',
          '    primaryLabel: "text-violet-400",',
          '    secondaryLabel: "italic",',
          '  }}',
          '/>',
          '```',
          '',
          '## Accessibility',
          '',
          '- Renders as a `<button type="button">` — keyboard focusable and activated with Enter / Space.',
          '- `aria-pressed` is applied on `multi-standard`, `checkbox`, and `radio` items to communicate',
          '  toggle state.',
          '- Icons are decorative (`aria-hidden`); the visible label is the accessible name.',
          '- The focus ring uses `focus-visible`, so it only appears during keyboard navigation.',
        ].join('\n'),
      },
    },
  },
  args: {
    label: 'List item',
    onClick: fn(),
    onSelectedChange: fn(),
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['standard', 'multi-standard', 'checkbox', 'radio'],
      description:
        '`standard` — no selection, fires `onClick` only. ' +
        '`multi-standard` — right checkmark, toggles. ' +
        '`checkbox` — left checkbox icon, toggles. ' +
        '`radio` — left radio icon, one-way select only.',
    },
    label: {
      control: 'text',
      description: 'The main visible label. Required.',
    },
    primaryLabel: {
      control: 'text',
      description:
        'Small supporting text rendered above `label` (e.g. a category or section name).',
    },
    secondaryLabel: {
      control: 'text',
      description: 'Small supporting text rendered below `label` (e.g. a description or hint).',
    },
    selected: {
      control: 'boolean',
      description:
        'Controlled selection state. Providing this switches the component to controlled mode.',
    },
    defaultSelected: {
      control: 'boolean',
      description:
        'Initial selection state for uncontrolled mode. Ignored when `selected` is provided.',
    },
    onSelectedChange: {
      action: 'onSelectedChange',
      description:
        'Fired when the selection state changes. Receives the new boolean value. ' +
        'For `radio` items, only fires with `true`.',
    },
    onClick: {
      action: 'onClick',
      description: 'Fired on every click, regardless of type. Runs before selection logic.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents all interaction and renders the item with muted text.',
    },
    className: {
      control: 'text',
      description:
        'Tailwind classes on the root `<button>`. Supports any modifier (`hover:*`, `active:*`, `focus-visible:*`). ' +
        'Override hover/press palette with CSS-variable overrides, e.g. ' +
        '`[--color-neutral-100:#e0f2fe] [--color-neutral-200:#bae6fd]`.',
    },
    slots: {
      control: false,
      description:
        'Per-slot Tailwind class overrides. Pass an object with any combination of:\n\n' +
        '- `icon` — icon wrapper `<span>` (sets fill color via `text-*`, e.g. `text-violet-600`)\n' +
        '- `label` — main label `<span>`\n' +
        '- `primaryLabel` — overline text `<span>`\n' +
        '- `secondaryLabel` — underline text `<span>`',
    },
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const listStyle: React.CSSProperties = { width: 260, display: 'flex', flexDirection: 'column' };

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: 'Playground',
  args: { type: 'standard' },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Adjust every prop from the **Controls** panel. ' +
          'Switch `type`, toggle `disabled`, add `primaryLabel` / `secondaryLabel`, or control `selected` directly.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Single stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Standard',
  args: { type: 'standard' },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The default `standard` type. No selection icon. Fires `onClick` on every click. ' +
          'Use for navigation menus or action lists.',
      },
    },
  },
};

export const WithPrimaryLabel: Story = {
  args: { type: 'standard', primaryLabel: 'Primary' },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`primaryLabel` renders small supporting text *above* the main label. ' +
          'Use it for a category, section name, or any contextual tag.',
      },
    },
  },
};

export const WithSecondaryLabel: Story = {
  args: { type: 'standard', secondaryLabel: 'Secondary' },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`secondaryLabel` renders small supporting text *below* the main label. ' +
          'Use it for a description, hint, or metadata.',
      },
    },
  },
};

export const WithBothLabels: Story = {
  args: { type: 'standard', primaryLabel: 'Primary', secondaryLabel: 'Secondary' },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Both `primaryLabel` and `secondaryLabel` can be combined on the same item.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { type: 'standard', disabled: true },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`disabled` prevents all interaction and renders the item with muted text. ' +
          'Works on every `type`.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Custom styles
// ---------------------------------------------------------------------------

const CustomStylesDemo = () => {
  const [violetChecked, setVioletChecked] = React.useState(false);
  const [skyChecked, setSkyChecked] = React.useState(false);
  const [roseChecked, setRoseChecked] = React.useState(false);

  const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4 };
  const heading: React.CSSProperties = {
    fontFamily: 'Public Sans, sans-serif',
    fontSize: 11,
    fontWeight: 700,
    color: '#aaa',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  };

  return (
    <div style={{ display: 'flex', gap: 32, fontFamily: 'Public Sans, sans-serif' }}>
      {/* Violet — icon + label color */}
      <div>
        <p style={heading}>Icon &amp; label color</p>
        <div style={{ ...col, width: 260 }}>
          <ListItem
            label="Violet option"
            type="checkbox"
            selected={violetChecked}
            onSelectedChange={setVioletChecked}
            slots={{
              icon: 'text-violet-600',
              label: 'text-violet-900 font-medium',
            }}
          />
          <ListItem
            label="With labels"
            primaryLabel="Category"
            secondaryLabel="A supporting hint"
            type="checkbox"
            slots={{
              icon: 'text-violet-600',
              label: 'text-violet-900 font-medium',
              primaryLabel: 'text-violet-400',
              secondaryLabel: 'text-violet-400 italic',
            }}
          />
        </div>
      </div>

      {/* Sky — hover/press color via CSS-variable override */}
      <div>
        <p style={heading}>Hover &amp; press color</p>
        <div style={{ ...col, width: 260 }}>
          <ListItem
            label="Sky hover palette"
            type="checkbox"
            selected={skyChecked}
            onSelectedChange={setSkyChecked}
            className="[--color-neutral-100:theme(colors.sky.50)] [--color-neutral-200:theme(colors.sky.100)]"
            slots={{ icon: 'text-sky-500' }}
          />
          <ListItem
            label="Sky hover palette"
            type="radio"
            className="[--color-neutral-100:theme(colors.sky.50)] [--color-neutral-200:theme(colors.sky.100)]"
            slots={{ icon: 'text-sky-500' }}
          />
        </div>
      </div>

      {/* Rose — combined */}
      <div>
        <p style={heading}>Combined</p>
        <div style={{ ...col, width: 260 }}>
          <ListItem
            label="Rose item"
            primaryLabel="Danger zone"
            type="multi-standard"
            selected={roseChecked}
            onSelectedChange={setRoseChecked}
            className="[--color-neutral-100:theme(colors.rose.50)] [--color-neutral-200:theme(colors.rose.100)]"
            slots={{
              icon: 'text-rose-500',
              label: 'text-rose-900',
              primaryLabel: 'text-rose-400',
            }}
          />
          <ListItem
            label="Rose disabled"
            type="multi-standard"
            disabled
            slots={{ label: 'line-through' }}
          />
        </div>
      </div>
    </div>
  );
};

export const CustomStyles: Story = {
  name: 'Custom Styles',
  parameters: {
    docs: {
      description: {
        story:
          'Use `className` to override hover/press background colors via CSS-variable overrides ' +
          '(`[--color-neutral-100:…]`), and `slots` to target individual slots ' +
          '(`icon`, `label`, `primaryLabel`, `secondaryLabel`) with any Tailwind class.',
      },
    },
  },
  render: () => <CustomStylesDemo />,
};

// ---------------------------------------------------------------------------
// All types — States
// ---------------------------------------------------------------------------

const AllTypesDemo = () => {
  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const [radioSelected, setRadioSelected] = React.useState(false);
  const [multiSelected, setMultiSelected] = React.useState(false);

  return (
    <div style={{ display: 'flex', gap: 32, fontFamily: 'Public Sans, sans-serif' }}>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Standard
        </p>
        <div style={listStyle}>
          <ListItem label="List item" type="standard" />
          <ListItem label="List item" type="standard" disabled />
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Multi-Standard
        </p>
        <div style={listStyle}>
          <ListItem
            label="List item"
            type="multi-standard"
            selected={multiSelected}
            onSelectedChange={setMultiSelected}
          />
          <ListItem label="List item" type="multi-standard" disabled />
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Checkbox
        </p>
        <div style={listStyle}>
          <ListItem
            label="List item"
            type="checkbox"
            selected={checkboxSelected}
            onSelectedChange={setCheckboxSelected}
          />
          <ListItem label="List item" type="checkbox" disabled />
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Radio
        </p>
        <div style={listStyle}>
          <ListItem
            label="List item"
            type="radio"
            selected={radioSelected}
            onSelectedChange={setRadioSelected}
          />
          <ListItem label="List item" type="radio" disabled />
        </div>
      </div>
    </div>
  );
};

export const AllTypes: Story = {
  name: 'All Types',
  render: () => <AllTypesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'All four `type` values side by side, each with a normal and a disabled item. ' +
          'The `multi-standard`, `checkbox`, and `radio` items are wired to local state so you can click them.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Labels grid
// ---------------------------------------------------------------------------

export const LabelsGrid: Story = {
  name: 'With Labels',
  parameters: {
    docs: {
      description: {
        story:
          'All three label slots — `primaryLabel` only, `secondaryLabel` only, and both together — ' +
          'each shown with a normal and a disabled item.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 32, fontFamily: 'Public Sans, sans-serif' }}>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Primary Label
        </p>
        <div style={listStyle}>
          <ListItem label="List item" primaryLabel="Primary" />
          <ListItem label="List item" primaryLabel="Primary" disabled />
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Secondary Label
        </p>
        <div style={listStyle}>
          <ListItem label="List item" secondaryLabel="Secondary" />
          <ListItem label="List item" secondaryLabel="Secondary" disabled />
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Both Labels
        </p>
        <div style={listStyle}>
          <ListItem label="List item" primaryLabel="Primary" secondaryLabel="Secondary" />
          <ListItem label="List item" primaryLabel="Primary" secondaryLabel="Secondary" disabled />
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive list example
// ---------------------------------------------------------------------------

const RadioGroupDemo = () => {
  const options = ['Option A', 'Option B', 'Option C'];
  const [value, setValue] = useState<string | null>(null);
  return (
    <div style={listStyle}>
      {options.map((opt) => (
        <ListItem
          key={opt}
          label={opt}
          type="radio"
          selected={value === opt}
          onSelectedChange={() => setValue(opt)}
        />
      ))}
    </div>
  );
};

export const RadioGroup: Story = {
  name: 'Radio Group (interactive)',
  parameters: {
    docs: {
      description: {
        story:
          'Use `selected={value === id}` and `onSelectedChange={() => setValue(id)}` to link multiple `radio` items ' +
          'into an exclusive group. The `radio` type never fires `onSelectedChange(false)`, ' +
          'so the only way to deselect is by selecting another item.',
      },
    },
  },
  render: () => <RadioGroupDemo />,
};

const CheckboxGroupDemo = () => {
  const options = ['Option A', 'Option B', 'Option C'];
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (opt: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(opt)) {
        next.delete(opt);
      } else {
        next.add(opt);
      }
      return next;
    });
  return (
    <div style={listStyle}>
      {options.map((opt) => (
        <ListItem
          key={opt}
          label={opt}
          type="checkbox"
          selected={selected.has(opt)}
          onSelectedChange={() => toggle(opt)}
        />
      ))}
    </div>
  );
};

export const CheckboxGroup: Story = {
  name: 'Checkbox Group (interactive)',
  parameters: {
    docs: {
      description: {
        story:
          'Use a `Set` of selected values in local state to track multiple independent checkbox items. ' +
          'Each `checkbox` item toggles — clicking a selected item deselects it.',
      },
    },
  },
  render: () => <CheckboxGroupDemo />,
};
