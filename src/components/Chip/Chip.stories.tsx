import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Chip } from './Chip';

// ---------------------------------------------------------------------------
// Token Panel
// ---------------------------------------------------------------------------
function ChipTokenPanel() {
  const sectionLabel: React.CSSProperties = {
    fontFamily: 'Public Sans, sans-serif',
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#aaaaaa',
    margin: '16px 0 6px',
  };
  const table: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' };
  const th: React.CSSProperties = {
    textAlign: 'left',
    fontSize: '0.625rem',
    fontWeight: 600,
    color: '#aaaaaa',
    padding: '0 12px 4px 0',
    borderBottom: '1px solid #eeeeee',
  };
  const td: React.CSSProperties = {
    fontSize: '0.6875rem',
    color: '#333333',
    padding: '5px 12px 5px 0',
    borderBottom: '1px solid #f5f5f5',
    verticalAlign: 'middle',
  };
  const mono: React.CSSProperties = {
    fontFamily: 'monospace',
    color: '#3f5bbf',
    fontSize: '0.6875rem',
  };

  const colorTokens = [
    { state: 'Default — bg', variable: '--color-neutral-white', value: '#ffffff' },
    { state: 'Default — border', variable: '--color-border-default', value: '#dddddd' },
    { state: 'Default — text', variable: '--color-neutral-black', value: '#191919' },
    { state: 'Hover — bg + border', variable: '--color-neutral-100', value: '#f5f5f5' },
    { state: 'Selected — bg + border', variable: '--color-primary-light', value: '#ececfe' },
    { state: 'Selected — text', variable: '--color-neutral-900', value: '#333333' },
    { state: 'Selected Hover — bg + border', variable: '—', value: '#d5d5fd' },
    { state: 'Disabled — whole chip', variable: '—', value: 'opacity: 0.30' },
    { state: 'Focus ring', variable: '--color-border-focus', value: '#284cca' },
    { state: 'Dismiss icon (default)', variable: '--color-neutral-700', value: '#777777' },
    { state: 'Dismiss icon (hover)', variable: '--color-neutral-black', value: '#191919' },
  ];

  return (
    <div
      style={{
        marginTop: 24,
        borderTop: '1px solid #eeeeee',
        paddingTop: 16,
        fontFamily: 'Public Sans, sans-serif',
      }}
    >
      <p style={sectionLabel}>Color Tokens</p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>State / Property</th>
            <th style={th}>CSS Variable</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {colorTokens.map((t) => (
            <tr key={t.state}>
              <td style={td}>{t.state}</td>
              <td style={{ ...td, ...mono }}>{t.variable}</td>
              <td style={td}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {t.value !== '—' && !t.value.startsWith('opacity') && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        backgroundColor: t.value,
                        border: '1px solid rgba(0,0,0,0.1)',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <span style={mono}>{t.value}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={sectionLabel}>Sizing &amp; Spacing</p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Property</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {[
            { property: 'Border radius', value: '8px' },
            { property: 'Padding X (shell)', value: '10px' },
            { property: 'Padding Y (shell)', value: '8px' },
            { property: 'Label inner padding X', value: '6px' },
            { property: 'Label inner padding Y', value: '2px' },
            { property: 'Icon container padding-right', value: '2px' },
            { property: 'Font size', value: '16px' },
            { property: 'Font weight', value: '400 (Regular)' },
            { property: 'Line height', value: '1.5' },
            { property: 'Icon size', value: '22 × 22px' },
          ].map((r) => (
            <tr key={r.property}>
              <td style={td}>{r.property}</td>
              <td style={{ ...td, ...mono }}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// All-states grid — mirrors the Figma documentation frame exactly
// ---------------------------------------------------------------------------
function AllStatesGrid() {
  const rowLabel: React.CSSProperties = {
    fontFamily: 'Public Sans, sans-serif',
    fontSize: 12,
    color: '#777777',
    whiteSpace: 'nowrap',
    paddingRight: 16,
    display: 'flex',
    alignItems: 'center',
    minWidth: 130,
  };
  const colHeader: React.CSSProperties = {
    fontFamily: 'Public Sans, sans-serif',
    fontSize: 11,
    fontWeight: 600,
    color: '#aaaaaa',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    paddingBottom: 8,
    textAlign: 'center',
  };
  const col: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    minWidth: 160,
  };
  const row: React.CSSProperties = { display: 'flex', alignItems: 'center', width: '100%' };

  const states = [
    'Default',
    'Default Focused',
    'Hover',
    'Selected',
    'Selected Focused',
    'Selected Hover',
    'Disabled',
  ];

  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {/* Row labels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 28 }}>
        {states.map((s) => (
          <div key={s} style={{ ...rowLabel, height: 40, boxSizing: 'border-box' }}>
            {s}
          </div>
        ))}
      </div>

      {/* with Function column */}
      <div style={col}>
        <div style={colHeader}>with Function</div>
        <div style={row}>
          <Chip
            variant="selectable"
            label="Poverty rate"
            tooltip="Additional context about this metric."
          />
        </div>
        <div style={row}>
          <Chip
            variant="selectable"
            label="Poverty rate"
            tooltip="Additional context about this metric."
            className="ring-[3px] ring-[#284cca] ring-offset-[2px]"
          />
        </div>
        {/* Hover — shown via dedicated wrapper since CSS hover can't be forced in stories */}
        <div style={row}>
          <button
            className="inline-flex items-center rounded-[8px] border px-[10px] py-[8px] cursor-pointer bg-[var(--color-neutral-100)] border-[var(--color-neutral-100)]"
            tabIndex={-1}
          >
            <span className="px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal whitespace-nowrap text-[var(--color-neutral-black)]">
              Poverty rate
            </span>
            <span className="flex items-center pr-[2px]">
              <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M11 15.5833C11.2598 15.5833 11.4775 15.4954 11.6532 15.3197C11.8289 15.144 11.9167 14.9263 11.9167 14.6666V10.9999C11.9167 10.7402 11.8289 10.5225 11.6532 10.3468C11.4775 10.1711 11.2598 10.0833 11 10.0833C10.7403 10.0833 10.5226 10.1711 10.3469 10.3468C10.1712 10.5225 10.0834 10.7402 10.0834 10.9999V14.6666C10.0834 14.9263 10.1712 15.144 10.3469 15.3197C10.5226 15.4954 10.7403 15.5833 11 15.5833ZM11 8.24992C11.2598 8.24992 11.4775 8.16207 11.6532 7.98638C11.8289 7.81068 11.9167 7.59297 11.9167 7.33325C11.9167 7.07353 11.8289 6.85582 11.6532 6.68013C11.4775 6.50443 11.2598 6.41659 11 6.41659C10.7403 6.41659 10.5226 6.50443 10.3469 6.68013C10.1712 6.85582 10.0834 7.07353 10.0834 7.33325C10.0834 7.59297 10.1712 7.81068 10.3469 7.98638C10.5226 8.16207 10.7403 8.24992 11 8.24992ZM11 20.1666C9.73199 20.1666 8.54032 19.926 7.42504 19.4447C6.30976 18.9635 5.33962 18.3103 4.51462 17.4853C3.68962 16.6603 3.0365 15.6902 2.55525 14.5749C2.074 13.4596 1.83337 12.268 1.83337 10.9999C1.83337 9.73186 2.074 8.5402 2.55525 7.42492C3.0365 6.30964 3.68962 5.3395 4.51462 4.5145C5.33962 3.6895 6.30976 3.03638 7.42504 2.55513C8.54032 2.07388 9.73199 1.83325 11 1.83325C12.2681 1.83325 13.4598 2.07388 14.575 2.55513C15.6903 3.03638 16.6605 3.6895 17.4855 4.5145C18.3105 5.3395 18.9636 6.30964 19.4448 7.42492C19.9261 8.5402 20.1667 9.73186 20.1667 10.9999C20.1667 12.268 19.9261 13.4596 19.4448 14.5749C18.9636 15.6902 18.3105 16.6603 17.4855 17.4853C16.6605 18.3103 15.6903 18.9635 14.575 19.4447C13.4598 19.926 12.2681 20.1666 11 20.1666ZM11 18.3333C13.0473 18.3333 14.7813 17.6228 16.2021 16.202C17.623 14.7812 18.3334 13.0471 18.3334 10.9999C18.3334 8.9527 17.623 7.21867 16.2021 5.79784C14.7813 4.377 13.0473 3.66659 11 3.66659C8.95282 3.66659 7.21879 4.377 5.79796 5.79784C4.37712 7.21867 3.66671 8.9527 3.66671 10.9999C3.66671 13.0471 4.37712 14.7812 5.79796 16.202C7.21879 17.6228 8.95282 18.3333 11 18.3333Z"
                  fill="#191919"
                />
              </svg>
            </span>
          </button>
        </div>
        <div style={row}>
          <Chip
            variant="selectable"
            label="Poverty rate"
            tooltip="Additional context."
            defaultSelected
          />
        </div>
        <div style={row}>
          <Chip
            variant="selectable"
            label="Poverty rate"
            tooltip="Additional context."
            defaultSelected
            className="ring-[3px] ring-[#284cca] ring-offset-[2px]"
          />
        </div>
        {/* Selected Hover */}
        <div style={row}>
          <button
            className="inline-flex items-center rounded-[8px] border px-[10px] py-[8px] cursor-pointer bg-[#d5d5fd] border-[#d5d5fd]"
            tabIndex={-1}
          >
            <span className="px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal whitespace-nowrap text-[var(--color-neutral-900)]">
              Poverty rate
            </span>
            <span className="flex items-center pr-[2px]">
              <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M11 15.5833C11.2598 15.5833 11.4775 15.4954 11.6532 15.3197C11.8289 15.144 11.9167 14.9263 11.9167 14.6666V10.9999C11.9167 10.7402 11.8289 10.5225 11.6532 10.3468C11.4775 10.1711 11.2598 10.0833 11 10.0833C10.7403 10.0833 10.5226 10.1711 10.3469 10.3468C10.1712 10.5225 10.0834 10.7402 10.0834 10.9999V14.6666C10.0834 14.9263 10.1712 15.144 10.3469 15.3197C10.5226 15.4954 10.7403 15.5833 11 15.5833ZM11 8.24992C11.2598 8.24992 11.4775 8.16207 11.6532 7.98638C11.8289 7.81068 11.9167 7.59297 11.9167 7.33325C11.9167 7.07353 11.8289 6.85582 11.6532 6.68013C11.4775 6.50443 11.2598 6.41659 11 6.41659C10.7403 6.41659 10.5226 6.50443 10.3469 6.68013C10.1712 6.85582 10.0834 7.07353 10.0834 7.33325C10.0834 7.59297 10.1712 7.81068 10.3469 7.98638C10.5226 8.16207 10.7403 8.24992 11 8.24992ZM11 20.1666C9.73199 20.1666 8.54032 19.926 7.42504 19.4447C6.30976 18.9635 5.33962 18.3103 4.51462 17.4853C3.68962 16.6603 3.0365 15.6902 2.55525 14.5749C2.074 13.4596 1.83337 12.268 1.83337 10.9999C1.83337 9.73186 2.074 8.5402 2.55525 7.42492C3.0365 6.30964 3.68962 5.3395 4.51462 4.5145C5.33962 3.6895 6.30976 3.03638 7.42504 2.55513C8.54032 2.07388 9.73199 1.83325 11 1.83325C12.2681 1.83325 13.4598 2.07388 14.575 2.55513C15.6903 3.03638 16.6605 3.6895 17.4855 4.5145C18.3105 5.3395 18.9636 6.30964 19.4448 7.42492C19.9261 8.5402 20.1667 9.73186 20.1667 10.9999C20.1667 12.268 19.9261 13.4596 19.4448 14.5749C18.9636 15.6902 18.3105 16.6603 17.4855 17.4853C16.6605 18.3103 15.6903 18.9635 14.575 19.4447C13.4598 19.926 12.2681 20.1666 11 20.1666ZM11 18.3333C13.0473 18.3333 14.7813 17.6228 16.2021 16.202C17.623 14.7812 18.3334 13.0471 18.3334 10.9999C18.3334 8.9527 17.623 7.21867 16.2021 5.79784C14.7813 4.377 13.0473 3.66659 11 3.66659C8.95282 3.66659 7.21879 4.377 5.79796 5.79784C4.37712 7.21867 3.66671 8.9527 3.66671 10.9999C3.66671 13.0471 4.37712 14.7812 5.79796 16.202C7.21879 17.6228 8.95282 18.3333 11 18.3333Z"
                  fill="#333333"
                />
              </svg>
            </span>
          </button>
        </div>
        <div style={row}>
          <Chip variant="selectable" label="Poverty rate" tooltip="Additional context." disabled />
        </div>
      </div>

      {/* without additional function (Persistent) column */}
      <div style={col}>
        <div style={colHeader}>without Function</div>
        <div style={row}>
          <Chip variant="selectable" label="Poverty rate" />
        </div>
        <div style={row}>
          <Chip
            variant="selectable"
            label="Poverty rate"
            className="ring-[3px] ring-[#284cca] ring-offset-[2px]"
          />
        </div>
        <div style={row}>
          <button
            className="inline-flex items-center rounded-[8px] border px-[10px] py-[8px] cursor-pointer bg-[var(--color-neutral-100)] border-[var(--color-neutral-100)]"
            tabIndex={-1}
          >
            <span className="px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal whitespace-nowrap text-[var(--color-neutral-black)]">
              Poverty rate
            </span>
          </button>
        </div>
        <div style={row}>
          <Chip variant="selectable" label="Poverty rate" defaultSelected />
        </div>
        <div style={row}>
          <Chip
            variant="selectable"
            label="Poverty rate"
            defaultSelected
            className="ring-[3px] ring-[#284cca] ring-offset-[2px]"
          />
        </div>
        <div style={row}>
          <button
            className="inline-flex items-center rounded-[8px] border px-[10px] py-[8px] cursor-pointer bg-[#d5d5fd] border-[#d5d5fd]"
            tabIndex={-1}
          >
            <span className="px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal whitespace-nowrap text-[var(--color-neutral-900)]">
              Poverty rate
            </span>
          </button>
        </div>
        <div style={row}>
          <Chip variant="selectable" label="Poverty rate" disabled />
        </div>
      </div>

      {/* Dismissible column */}
      <div style={col}>
        <div style={colHeader}>Dismissible</div>
        <div style={row}>
          <Chip variant="dismissible" label="Poverty rate" onDismiss={() => {}} />
        </div>
        <div style={row}>
          <Chip
            variant="dismissible"
            label="Poverty rate"
            onDismiss={() => {}}
            className="ring-[3px] ring-[#284cca] ring-offset-[2px]"
          />
        </div>
        <div style={row}>
          <span className="inline-flex items-center rounded-[8px] border px-[10px] py-[8px] bg-[var(--color-neutral-100)] border-[var(--color-neutral-100)]">
            <span className="px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal whitespace-nowrap text-[var(--color-neutral-black)]">
              Poverty rate
            </span>
            <span className="flex items-center pr-[2px]">
              <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M6 6L16 16M16 6L6 16"
                  stroke="#777777"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </div>
        <div style={row}>
          <span className="inline-flex items-center rounded-[8px] border px-[10px] py-[8px] bg-[var(--color-primary-light)] border-[var(--color-primary-light)]">
            <span className="px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal whitespace-nowrap text-[var(--color-neutral-900)]">
              Poverty rate
            </span>
            <span className="flex items-center pr-[2px]">
              <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M6 6L16 16M16 6L6 16"
                  stroke="#777777"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </div>
        <div style={row}>
          <Chip
            variant="dismissible"
            label="Poverty rate"
            onDismiss={() => {}}
            className="ring-[3px] ring-[#284cca] ring-offset-[2px] bg-[var(--color-primary-light)] border-[var(--color-primary-light)]"
          />
        </div>
        <div style={row}>
          <span className="inline-flex items-center rounded-[8px] border px-[10px] py-[8px] bg-[#d5d5fd] border-[#d5d5fd]">
            <span className="px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal whitespace-nowrap text-[var(--color-neutral-900)]">
              Poverty rate
            </span>
            <span className="flex items-center pr-[2px]">
              <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M6 6L16 16M16 6L6 16"
                  stroke="#777777"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </div>
        <div style={row}>
          <Chip variant="dismissible" label="Poverty rate" onDismiss={() => {}} disabled />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Chips are compact, interactive elements used to represent filters, tags, or attributes. ' +
          "The **selectable** variant (maps to Figma's *Persistent* / *with Function* types) toggles a highlighted state. " +
          'The **dismissible** variant shows an × button to remove the chip. ' +
          'Both support an optional tooltip via an info icon (`tooltip` prop).',
      },
    },
  },
  args: {
    onDismiss: fn(),
    onSelectedChange: fn(),
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['selectable', 'dismissible'],
      description:
        '`selectable` — toggles highlighted state. `dismissible` — shows × remove button.',
    },
    label: { control: 'text', description: 'Text content of the chip.' },
    tooltip: {
      control: 'text',
      description: 'Tooltip body text. When set, an ⓘ icon appears (Figma: "with Function").',
    },
    tooltipTitle: {
      control: 'text',
      description: 'Optional bold heading shown above the tooltip body.',
    },
    selected: {
      control: 'boolean',
      description: 'Controlled selected state (selectable variant only).',
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Uncontrolled initial selected state (selectable variant only).',
    },
    disabled: {
      control: 'boolean',
      description: 'Dims the chip to 30% opacity and blocks interaction.',
    },
    onSelectedChange: {
      action: 'onSelectedChange',
      description: 'Called with the new boolean value when selection toggles.',
    },
    onDismiss: {
      action: 'onDismiss',
      description: 'Called when the × button is clicked (dismissible variant only).',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// ---------------------------------------------------------------------------
// Playground — interactive props panel
// ---------------------------------------------------------------------------
export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'selectable',
    label: 'Poverty rate',
    tooltip: '',
    tooltipTitle: '',
    disabled: false,
    defaultSelected: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the **Controls** panel below to try every prop combination. ' +
          'Switch `variant` between `selectable` and `dismissible`, toggle `disabled`, ' +
          'add a `tooltip` string to show the ⓘ icon, and watch the **Actions** panel for callbacks.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Figma documentation frame — all states × all types
// ---------------------------------------------------------------------------
export const AllStates: Story = {
  name: 'All States (Figma reference)',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'All states shown across the three Figma chip types: **with Function** (tooltip/info icon), ' +
          '**without Function** (label only, selectable), and **Dismissible** (× remove button).',
      },
    },
  },
  render: () => <AllStatesGrid />,
};

// ---------------------------------------------------------------------------
// Stories — Selectable (Persistent / with Function)
// ---------------------------------------------------------------------------
export const SelectableDefault: Story = {
  name: 'Selectable — Default',
  args: { variant: 'selectable', label: 'Poverty rate' },
  render: (args) => (
    <div>
      <Chip {...args} />
      <ChipTokenPanel />
    </div>
  ),
};

export const SelectableWithTooltip: Story = {
  name: 'Selectable — With Function (tooltip)',
  args: {
    variant: 'selectable',
    label: 'Poverty rate',
    tooltip: 'Percentage of population living below the federal poverty line.',
    tooltipTitle: 'Poverty rate',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Figma *"with Function"* variant. An ⓘ icon appears at the right edge. ' +
          'Hovering / focusing the whole chip reveals the tooltip.',
      },
    },
  },
  render: (args) => <Chip {...args} />,
};

export const SelectableGroup: Story = {
  name: 'Selectable — Group (multi-select)',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Multiple selectable chips managing independent state.' },
    },
  },
  render: () => {
    const chips = [
      { label: 'Poverty rate', tooltip: 'Percentage of population below the poverty line.' },
      { label: 'Unemployment', tooltip: 'Percentage of adults seeking but unable to find work.' },
      { label: 'Median income' },
      { label: 'Housing cost burden' },
      { label: 'Food insecurity' },
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {chips.map((c) => (
          <Chip key={c.label} variant="selectable" label={c.label} tooltip={c.tooltip} />
        ))}
      </div>
    );
  },
};

export const SelectableDisabled: Story = {
  name: 'Selectable — Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Disabled chips use `opacity: 0.30` on the whole element (Figma spec).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip variant="selectable" label="Unselected" disabled />
      <Chip variant="selectable" label="Selected" defaultSelected disabled />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Stories — Dismissible
// ---------------------------------------------------------------------------
function DismissibleDefaultExample() {
  const [chips, setChips] = React.useState(['Poverty rate', 'Unemployment', 'Median income']);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 44 }}>
      {chips.map((c) => (
        <Chip
          key={c}
          variant="dismissible"
          label={c}
          onDismiss={() => setChips((prev) => prev.filter((x) => x !== c))}
        />
      ))}
      {chips.length === 0 && (
        <span style={{ fontSize: 13, color: '#aaaaaa', fontFamily: 'Public Sans, sans-serif' }}>
          All chips dismissed.
        </span>
      )}
    </div>
  );
}

export const DismissibleDefault: Story = {
  name: 'Dismissible — Default',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Click × to remove a chip. State is managed by the parent.',
      },
    },
  },
  render: () => <DismissibleDefaultExample />,
};

function DismissibleWithTooltipExample() {
  const [chips, setChips] = React.useState([
    {
      label: 'High Priority',
      tooltip: 'Must be resolved this sprint.',
      tooltipTitle: 'High Priority',
    },
    { label: 'Blocked', tooltip: 'Waiting on external dependency.', tooltipTitle: 'Blocked' },
    { label: 'In Review', tooltip: 'Currently under peer review.', tooltipTitle: 'In Review' },
  ]);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 44 }}>
      {chips.map((c) => (
        <Chip
          key={c.label}
          variant="dismissible"
          label={c.label}
          tooltip={c.tooltip}
          tooltipTitle={c.tooltipTitle}
          onDismiss={() => setChips((prev) => prev.filter((x) => x.label !== c.label))}
        />
      ))}
    </div>
  );
}

export const DismissibleWithTooltip: Story = {
  name: 'Dismissible — With Tooltip',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'The ⓘ icon at the left edge triggers the tooltip. ' +
          'The × dismiss button remains independently interactive.',
      },
    },
  },
  render: () => <DismissibleWithTooltipExample />,
};

export const DismissibleDisabled: Story = {
  name: 'Dismissible — Disabled',
  args: { variant: 'dismissible', label: 'Cannot remove', disabled: true },
  render: (args) => <Chip {...args} />,
};
