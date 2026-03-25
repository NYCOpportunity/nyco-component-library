import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// ---------------------------------------------------------------------------
// Token Panel — shown below each story in the Docs tab
// ---------------------------------------------------------------------------

const variantTokens: Record<
  string,
  Array<{ property: string; variable: string; value: string }>
> = {
  primary: [
    { property: 'Background', variable: '--color-button-primary-base', value: '#050560' },
    {
      property: 'Background (hover)',
      variable: '--color-button-primary-hover',
      value: '#505090',
    },
    { property: 'Text', variable: '--color-primary-foreground', value: '#ffffff' },
    {
      property: 'Background (disabled)',
      variable: '--color-button-disabled-base',
      value: '#eeeeee',
    },
    { property: 'Text (disabled)', variable: '--color-button-disabled-text', value: '#777777' },
    { property: 'Focus ring', variable: '--color-border-focus', value: '#284cca' },
  ],
  secondary: [
    { property: 'Background', variable: '--color-button-secondary-base', value: '#ffffff' },
    {
      property: 'Background (hover)',
      variable: '--color-button-secondary-hover',
      value: '#f5f5f5',
    },
    { property: 'Text', variable: '--color-neutral-black', value: '#191919' },
    { property: 'Border', variable: '--color-border-default', value: '#dddddd' },
    {
      property: 'Background (disabled)',
      variable: '--color-button-disabled-base',
      value: '#eeeeee',
    },
    { property: 'Text (disabled)', variable: '--color-button-disabled-text', value: '#777777' },
    { property: 'Focus ring', variable: '--color-border-focus', value: '#284cca' },
  ],
  text: [
    { property: 'Text', variable: '--color-text-link', value: '#284cca' },
    { property: 'Text (disabled)', variable: '--color-button-disabled-text', value: '#777777' },
    { property: 'Focus ring', variable: '--color-border-focus', value: '#284cca' },
  ],
};

function ButtonTokenPanel({ variant = 'primary' }: { variant?: string }) {
  const tokens = variantTokens[variant] ?? variantTokens.primary;

  const label: React.CSSProperties = {
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

  return (
    <div
      style={{
        marginTop: 24,
        borderTop: '1px solid #eeeeee',
        paddingTop: 16,
        fontFamily: 'Public Sans, sans-serif',
      }}
    >
      {/* Color tokens */}
      <p style={label}>Color Tokens — {variant}</p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Property</th>
            <th style={th}>CSS Variable</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t) => (
            <tr key={t.property}>
              <td style={td}>{t.property}</td>
              <td style={{ ...td, ...mono }}>{t.variable}</td>
              <td style={td}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
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
                  <span style={mono}>{t.value}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Spacing / Padding */}
      <p style={label}>Spacing — Padding</p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Viewport</th>
            <th style={th}>Padding X</th>
            <th style={th}>Padding Y</th>
            <th style={th}>Icon-only size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>Desktop ≥999px</td>
            <td style={{ ...td, ...mono }}>
              {variant === 'text' ? 'px-1 → 0.25rem / 4px' : 'px-6 → 1.5rem / 24px'}
            </td>
            <td style={{ ...td, ...mono }}>
              {variant === 'text' ? 'py-1 → 0.25rem / 4px' : 'py-4 → 1rem / 16px'}
            </td>
            <td style={{ ...td, ...mono }}>{variant === 'text' ? '—' : '54 × 54px'}</td>
          </tr>
          <tr>
            <td style={td}>Mobile &lt;999px</td>
            <td style={{ ...td, ...mono }}>
              {variant === 'text' ? 'px-1 → 0.25rem / 4px' : 'px-4 → 1rem / 16px'}
            </td>
            <td style={{ ...td, ...mono }}>
              {variant === 'text' ? 'py-1 → 0.25rem / 4px' : 'py-3 → 0.75rem / 12px'}
            </td>
            <td style={{ ...td, ...mono }}>{variant === 'text' ? '—' : '44 × 44px'}</td>
          </tr>
        </tbody>
      </table>

      {/* Text tokens */}
      <p style={label}>Text Tokens</p>
      <table style={{ ...table, marginBottom: 4 }}>
        <thead>
          <tr>
            <th style={th}>Property</th>
            <th style={th}>Token / Class</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>Font Family</td>
            <td style={{ ...td, ...mono }}>--font-primary</td>
            <td style={{ ...td, ...mono }}>Public Sans, sans-serif</td>
          </tr>
          <tr>
            <td style={td}>Font Weight</td>
            <td style={{ ...td, ...mono }}>font-semibold</td>
            <td style={{ ...td, ...mono }}>600</td>
          </tr>
          <tr>
            <td style={td}>Font Size (desktop)</td>
            <td style={{ ...td, ...mono }}>text-[18px]</td>
            <td style={{ ...td, ...mono }}>18px / line-height 22px</td>
          </tr>
          <tr>
            <td style={td}>Font Size (mobile)</td>
            <td style={{ ...td, ...mono }}>text-[14px]</td>
            <td style={{ ...td, ...mono }}>14px / line-height 20px</td>
          </tr>
          <tr>
            <td style={td}>Border Radius</td>
            <td style={{ ...td, ...mono }}>--border-radius-base</td>
            <td style={{ ...td, ...mono }}>0.25rem / 4px</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

import * as React from 'react';

// 16×16 icons sized for the link/text button variant
const SmallPlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ExternalLinkArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3 13L13 3M13 3H7M13 3V9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (
      Story: React.ComponentType,
      context: {
        viewMode: string;
        args: Record<string, unknown>;
        parameters: Record<string, unknown>;
      }
    ) => {
      if (context.viewMode !== 'docs' || context.parameters.hideTokenPanel) {
        return <Story />;
      }
      return (
        <div>
          <Story />
          <ButtonTokenPanel variant={context.args.variant as string} />
        </div>
      );
    },
  ],
  render: ({ startIcon, endIcon, iconOnly, children, ...args }) => (
    <Button
      {...args}
      iconOnly={iconOnly}
      startIcon={startIcon ? <ArrowIcon /> : undefined}
      endIcon={endIcon ? <ArrowIcon /> : undefined}
    >
      {iconOnly ? undefined : children}
    </Button>
  ),
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
      description: 'Button preset — combines visual style and color',
    },
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: 'Button size — large (default) uses full padding; small uses compact padding',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes (Tailwind)',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
    startIcon: {
      control: 'boolean',
      description: 'Show an icon before the label',
    },
    endIcon: {
      control: 'boolean',
      description: 'Show an icon after the label',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Square icon-only button — hides label, renders icon only',
    },
    type: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary button — main call to action
 */
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

/**
 * Secondary button — alternative / supporting action
 */
export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

/**
 * Text / link button — inline call to action
 */
export const Text: Story = {
  args: {
    children: 'Link Button Label',
    variant: 'text',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    disabled: true,
  },
};

/**
 * All three variants side by side
 */
export const AllVariants: Story = {
  parameters: { hideTokenPanel: true },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="text">Link Button Label</Button>
    </div>
  ),
};

/**
 * Large primary button with left icon — matches Figma design (node 3966:7806)
 */
export const WithLeftIcon: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    startIcon: true,
  },
};

/**
 * Icon-only square button
 */
export const IconOnly: Story = {
  args: {
    variant: 'primary',
    iconOnly: true,
    startIcon: true,
    'aria-label': 'Next',
  },
};

/**
 * Focus ring appearance — forced focus styles across all three variants.
 * The 3px blue ring is applied via className to simulate keyboard-focus state visually.
 */
export const FocusStates: Story = {
  parameters: { layout: 'padded', hideTokenPanel: true },
  render: () => {
    const headStyle: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#777',
      marginBottom: 12,
    };
    const rowLabelStyle: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#191919',
      display: 'flex',
      alignItems: 'center',
    };
    const focusClass = 'ring-[3px] ring-[var(--color-border-focus)] ring-offset-[1px] outline-none';
    const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8 };
    return (
      <div
        style={{
          padding: 32,
          background: '#f5f5f5',
          minHeight: '100vh',
          fontFamily: 'Public Sans, sans-serif',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#191919', marginBottom: 4 }}>
          Buttons / Focus State
        </h2>
        <p style={{ fontSize: '0.8125rem', color: '#777', marginBottom: 32 }}>
          3px solid ring · color: #284cca · 1px offset
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto repeat(3, auto)',
            gap: '24px 32px',
            background: '#fff',
            borderRadius: 8,
            padding: 24,
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            alignItems: 'center',
          }}
        >
          {/* Column headers */}
          <div />
          <div style={headStyle}>Primary</div>
          <div style={headStyle}>Secondary</div>
          <div style={headStyle}>Text</div>

          {/* Variants row */}
          <div style={rowLabelStyle}>Default</div>
          <div style={col}>
            <Button variant="primary" className={focusClass}>
              Button
            </Button>
          </div>
          <div style={col}>
            <Button variant="secondary" className={focusClass}>
              Button
            </Button>
          </div>
          <div style={col}>
            <Button variant="text" className={focusClass}>
              Link Button Label
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Link Button — full specification matrix.
 * Rows: Icon = Left · Icon = Right · Icon = None.
 * States: Default · Hover · Focus · Disabled.
 * Columns: Desktop (18px) · Small (14px, forced via className override).
 */
export const LinkButtonMatrix: Story = {
  parameters: { layout: 'fullscreen', hideTokenPanel: true },
  render: () => {
    const hoverCls = 'underline underline-offset-2';
    const focusCls = 'ring-[3px] ring-[var(--color-border-focus)] outline-none';
    const smallCls = 'text-[14px] leading-[20px]';

    const iconGroups: Array<{
      label: string;
      props: Partial<React.ComponentProps<typeof Button>>;
    }> = [
      { label: 'Icon = Left', props: { startIcon: <SmallPlusIcon /> } },
      { label: 'Icon = Right', props: { endIcon: <ExternalLinkArrowIcon /> } },
      { label: 'Icon = None', props: {} },
    ];

    const states: Array<{ label: string; cls: string; disabled: boolean }> = [
      { label: 'Default', cls: '', disabled: false },
      { label: 'Hover', cls: hoverCls, disabled: false },
      { label: 'Focus', cls: focusCls, disabled: false },
      { label: 'Disabled', cls: '', disabled: true },
    ];

    const thStyle: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.6875rem',
      fontWeight: 600,
      color: '#777777',
      padding: '10px 24px',
      textAlign: 'left',
      borderBottom: '1px solid #d4d4d4',
    };
    const groupLabelStyle: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#333333',
      marginBottom: 2,
    };
    const stateLabelStyle: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.6875rem',
      color: '#777777',
    };
    const cellStyle: React.CSSProperties = { padding: '10px 24px' };

    return (
      <div
        style={{
          padding: 40,
          background: '#e5e5e5',
          minHeight: '100vh',
          fontFamily: 'Public Sans, sans-serif',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#191919', marginBottom: 4 }}>
          Link Button
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#777777', marginBottom: 32 }}>
          Use as the main call to action on a page.
        </p>

        <div
          style={{
            background: '#ebebeb',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr 1fr',
            }}
          >
            <div style={thStyle} />
            <div style={thStyle}>Desktop</div>
            <div style={thStyle}>Small</div>
          </div>

          {iconGroups.map((group) =>
            states.map((state, si) => (
              <div
                key={`${group.label}-${state.label}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr 1fr',
                  alignItems: 'center',
                  borderTop: '1px solid #d4d4d4',
                  background: si % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'transparent',
                }}
              >
                <div style={cellStyle}>
                  {si === 0 && <div style={groupLabelStyle}>{group.label}</div>}
                  <div style={stateLabelStyle}>{state.label}</div>
                </div>
                {/* Desktop size */}
                <div style={cellStyle}>
                  <Button
                    variant="text"
                    className={state.cls || undefined}
                    disabled={state.disabled}
                    {...group.props}
                  >
                    Link Button Label
                  </Button>
                </div>
                {/* Small size — font-size override forces mobile scale */}
                <div style={cellStyle}>
                  <Button
                    variant="text"
                    className={[smallCls, state.cls].filter(Boolean).join(' ')}
                    disabled={state.disabled}
                    {...group.props}
                  >
                    Link Button Label
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  },
};
