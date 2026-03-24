import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'Button style variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button color scheme',
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
      control: false,
      description: 'Icon element rendered before the label',
    },
    endIcon: {
      control: false,
      description: 'Icon element rendered after the label',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Square icon-only button (no label)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary contained button - the default style
 */
export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'contained',
    color: 'primary',
  },
};

/**
 * Secondary contained button for alternative actions
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'contained',
    color: 'secondary',
  },
};

/**
 * Outlined button variant - less prominent
 */
export const Outlined: Story = {
  args: {
    children: 'Outlined',
    variant: 'outlined',
    color: 'primary',
  },
};

/**
 * Text button - minimal style
 */
export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    color: 'primary',
  },
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'contained',
    color: 'primary',
    disabled: true,
  },
};

/**
 * All variant types
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="contained" color="primary">
        Contained
      </Button>
      <Button variant="outlined" color="primary">
        Outlined
      </Button>
      <Button variant="text" color="primary">
        Text
      </Button>
    </div>
  ),
};

/**
 * All color combinations
 */
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
    </div>
  ),
};

/**
 * Contained buttons in all colors and variants
 */
export const ColorMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
      }}
    >
      <div>
        <h4>Primary</h4>
        <Button variant="contained" color="primary">
          Contained
        </Button>
      </div>
      <div>
        <h4>Primary Outlined</h4>
        <Button variant="outlined" color="primary">
          Outlined
        </Button>
      </div>
      <div>
        <h4>Primary Text</h4>
        <Button variant="text" color="primary">
          Text
        </Button>
      </div>
      <div>
        <h4>Secondary</h4>
        <Button variant="contained" color="secondary">
          Contained
        </Button>
      </div>
      <div>
        <h4>Secondary Outlined</h4>
        <Button variant="outlined" color="secondary">
          Outlined
        </Button>
      </div>
      <div>
        <h4>Secondary Text</h4>
        <Button variant="text" color="secondary">
          Text
        </Button>
      </div>
    </div>
  ),
};

/**
 * Custom styling with className - experiment with Tailwind classes
 */
export const WithCustomStyles: Story = {
  args: {
    children: 'Custom Styled',
    className: 'w-full shadow-lg hover:shadow-xl',
  },
};

/**
 * Large primary button with left icon — matches Figma design (node 3966:7806)
 */
export const WithLeftIcon: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    startIcon: <PlusIcon />,
  },
};

/**
 * Icon-only square button
 */
export const IconOnly: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    iconOnly: true,
    startIcon: <ArrowIcon />,
    'aria-label': 'Next',
  },
};

/**
 * Desktop + Mobile matrix — all icon variants × states (Default, Hover, Disabled)
 * Resize the viewport to see responsive sizing switch at 999px.
 */
export const DesktopMobileMatrix: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const label = 'Button';
    const variants: Array<{ label: string; props: object }> = [
      { label: 'Icon = None', props: { children: label } },
      { label: 'Icon = Left', props: { children: label, startIcon: <PlusIcon /> } },
      { label: 'Icon = Right', props: { children: label, endIcon: <ArrowIcon /> } },
      {
        label: 'Icon = Yes',
        props: { iconOnly: true, startIcon: <ArrowIcon />, 'aria-label': 'Next' },
      },
    ];
    const states: Array<{ label: string; props: object }> = [
      { label: 'Default', props: {} },
      { label: 'Disabled', props: { disabled: true } },
    ];
    const thStyle: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#777',
      padding: '0 16px 12px',
      textAlign: 'left',
    };
    const tdStyle: React.CSSProperties = { padding: '12px 16px' };
    return (
      <div
        style={{
          padding: 40,
          fontFamily: 'Public Sans, sans-serif',
          background: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#191919', marginBottom: 8 }}>
          Buttons / Desktop + Mobile
        </h2>
        <p style={{ fontSize: '0.8125rem', color: '#777', marginBottom: 32 }}>
          Desktop: 999px+ &nbsp;·&nbsp; Mobile: &lt;999px — resize to see responsive switch
        </p>
        <table
          style={{
            borderCollapse: 'collapse',
            background: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          <thead>
            <tr>
              <th style={{ ...thStyle, width: 100 }}>State</th>
              {variants.map((v) => (
                <th key={v.label} style={thStyle}>
                  {v.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {states.map((state) => (
              <tr key={state.label} style={{ borderTop: '1px solid #f0f0f0' }}>
                <td
                  style={{
                    ...tdStyle,
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    color: '#191919',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {state.label}
                </td>
                {variants.map((v) => (
                  <td key={v.label} style={tdStyle}>
                    <Button
                      variant="contained"
                      color="primary"
                      {...(v.props as object)}
                      {...(state.props as object)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

/**
 * Focus ring appearance — forced focus styles across all color × variant combinations.
 * The 3px blue ring is applied via className to simulate keyboard-focus state visually.
 */
export const FocusStates: Story = {
  parameters: { layout: 'padded' },
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
    const focusClass = 'ring-[3px] ring-[var(--color-border-focus)] outline-none';
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
          3px solid ring · color: #284cca · no offset
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(3, auto)',
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
          <div style={headStyle}>Contained</div>
          <div style={headStyle}>Outlined</div>
          <div style={headStyle}>Text</div>

          {/* Primary row */}
          <div style={rowLabelStyle}>Primary</div>
          <div style={col}>
            <Button variant="contained" color="primary" className={focusClass}>
              Button
            </Button>
          </div>
          <div style={col}>
            <Button variant="outlined" color="primary" className={focusClass}>
              Button
            </Button>
          </div>
          <div style={col}>
            <Button variant="text" color="primary" className={focusClass}>
              Button
            </Button>
          </div>

          {/* Secondary row */}
          <div style={rowLabelStyle}>Secondary</div>
          <div style={col}>
            <Button variant="contained" color="secondary" className={focusClass}>
              Button
            </Button>
          </div>
          <div style={col}>
            <Button variant="outlined" color="secondary" className={focusClass}>
              Button
            </Button>
          </div>
          <div style={col}>
            <Button variant="text" color="secondary" className={focusClass}>
              Button
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Mobile viewport (≤999px) — switch to this story to preview the compact responsive size.
 * Set the Storybook viewport to ≤999px or use the preset defined below.
 */
export const MobileViewport: Story = {
  parameters: {
    layout: 'padded',
    viewport: {
      viewports: {
        mobile390: {
          name: 'Mobile 390px (≤999px breakpoint)',
          styles: { width: '390px', height: '844px' },
        },
      },
      defaultViewport: 'mobile390',
    },
  },
  render: () => {
    const sectionLabel: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#777',
      marginBottom: 8,
    };
    const group: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 12 };
    return (
      <div
        style={{
          padding: 24,
          background: '#f5f5f5',
          minHeight: '100vh',
          fontFamily: 'Public Sans, sans-serif',
        }}
      >
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#191919', marginBottom: 4 }}>
          Buttons / Mobile ≤999px
        </h2>
        <p style={{ fontSize: '0.8125rem', color: '#777', marginBottom: 24 }}>
          px-4 · py-3 · text-14px/20px · icon-only 44px
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={sectionLabel}>Primary</div>
            <div style={group}>
              <Button variant="contained" color="primary">
                Button
              </Button>
              <Button variant="contained" color="primary" startIcon={<PlusIcon />}>
                Button
              </Button>
              <Button variant="contained" color="primary" endIcon={<ArrowIcon />}>
                Button
              </Button>
              <Button
                variant="contained"
                color="primary"
                iconOnly
                startIcon={<ArrowIcon />}
                aria-label="Next"
              />
            </div>
          </div>

          <div>
            <div style={sectionLabel}>Secondary</div>
            <div style={group}>
              <Button variant="contained" color="secondary">
                Button
              </Button>
              <Button variant="contained" color="secondary" startIcon={<PlusIcon />}>
                Button
              </Button>
              <Button variant="contained" color="secondary" endIcon={<ArrowIcon />}>
                Button
              </Button>
              <Button
                variant="contained"
                color="secondary"
                iconOnly
                startIcon={<ArrowIcon />}
                aria-label="Next"
              />
            </div>
          </div>

          <div>
            <div style={sectionLabel}>Outlined · Text</div>
            <div style={group}>
              <Button variant="outlined" color="primary">
                Outlined
              </Button>
              <Button variant="text" color="primary">
                Text
              </Button>
              <Button variant="outlined" color="secondary">
                Outlined
              </Button>
              <Button variant="text" color="secondary">
                Text
              </Button>
            </div>
          </div>

          <div>
            <div style={sectionLabel}>Disabled</div>
            <div style={group}>
              <Button variant="contained" color="primary" disabled>
                Button
              </Button>
              <Button variant="contained" color="secondary" disabled>
                Button
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
