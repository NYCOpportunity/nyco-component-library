import type { Meta, StoryObj } from '@storybook/react';

// ---------------------------------------------------------------------------
// Color data — mirrors CSS custom properties in styles.css
// ---------------------------------------------------------------------------

const colorGroups = [
  {
    group: 'Primary',
    colors: [
      { name: 'Primary Light', variable: '--color-primary-light', value: '#ececfe', dark: false },
      { name: 'Primary Base', variable: '--color-primary-base', value: '#050560', dark: true },
      { name: 'Primary Dark', variable: '--color-primary-dark', value: '#030339', dark: true },
    ],
  },
  {
    group: 'Secondary',
    colors: [
      {
        name: 'Secondary Light',
        variable: '--color-secondary-light',
        value: '#d3defa',
        dark: false,
      },
      { name: 'Secondary Base', variable: '--color-secondary-base', value: '#2b4cca', dark: true },
      { name: 'Secondary Dark', variable: '--color-secondary-dark', value: '#1b2d79', dark: true },
    ],
  },
  {
    group: 'Neutral',
    colors: [
      { name: 'White', variable: '--color-neutral-white', value: '#ffffff', dark: false },
      { name: 'Neutral 100', variable: '--color-neutral-100', value: '#f5f5f5', dark: false },
      { name: 'Neutral 200', variable: '--color-neutral-200', value: '#eeeeee', dark: false },
      { name: 'Neutral 300', variable: '--color-neutral-300', value: '#dddddd', dark: false },
      { name: 'Neutral 500', variable: '--color-neutral-500', value: '#aaaaaa', dark: false },
      { name: 'Neutral 700', variable: '--color-neutral-700', value: '#777777', dark: true },
      { name: 'Neutral 900', variable: '--color-neutral-900', value: '#333333', dark: true },
      { name: 'Black', variable: '--color-neutral-black', value: '#191919', dark: true },
    ],
  },
  {
    group: 'Info',
    colors: [
      { name: 'Info Light', variable: '--color-info-light', value: '#dcedf5', dark: false },
      { name: 'Info Base', variable: '--color-info-base', value: '#70baff', dark: false },
      { name: 'Info Dark', variable: '--color-info-dark', value: '#4a8fcc', dark: true },
    ],
  },
  {
    group: 'Success',
    colors: [
      { name: 'Success Light', variable: '--color-success-light', value: '#e2f2d5', dark: false },
      { name: 'Success Base', variable: '--color-success-base', value: '#008703', dark: true },
      { name: 'Success Dark', variable: '--color-success-dark', value: '#006602', dark: true },
    ],
  },
  {
    group: 'Warning',
    colors: [
      { name: 'Warning Light', variable: '--color-warning-light', value: '#fbecce', dark: false },
      { name: 'Warning Base', variable: '--color-warning-base', value: '#ff8320', dark: false },
      { name: 'Warning Dark', variable: '--color-warning-dark', value: '#cc6919', dark: true },
    ],
  },
  {
    group: 'Error',
    colors: [
      { name: 'Error Light', variable: '--color-error-light', value: '#fbd9de', dark: false },
      { name: 'Error Base', variable: '--color-error-base', value: '#ec131e', dark: true },
      { name: 'Error Dark', variable: '--color-error-dark', value: '#bd0f18', dark: true },
    ],
  },
  {
    group: 'Data Visualization',
    colors: [
      { name: 'Data Viz 01', variable: '--color-data-viz-01', value: '#3f5bbf', dark: true },
      { name: 'Data Viz 02', variable: '--color-data-viz-02', value: '#85b6ff', dark: false },
      { name: 'Data Viz 03', variable: '--color-data-viz-03', value: '#e76e68', dark: false },
      { name: 'Data Viz 04', variable: '--color-data-viz-04', value: '#ffbe46', dark: false },
      { name: 'Data Viz 05', variable: '--color-data-viz-05', value: '#94c747', dark: false },
      { name: 'Data Viz 06', variable: '--color-data-viz-06', value: '#b371c1', dark: true },
      { name: 'Data Viz 07', variable: '--color-data-viz-07', value: '#78c7d4', dark: false },
      { name: 'Data Viz 08', variable: '--color-data-viz-08', value: '#ff8822', dark: false },
    ],
  },
  {
    group: 'Data Visualization — Maps',
    colors: [
      { name: 'Maps 01', variable: '--color-data-viz-maps-01', value: '#c8d1ef', dark: false },
      { name: 'Maps 02', variable: '--color-data-viz-maps-02', value: '#92a4e6', dark: false },
      { name: 'Maps 03', variable: '--color-data-viz-maps-03', value: '#3f5bbf', dark: true },
      { name: 'Maps 04', variable: '--color-data-viz-maps-04', value: '#1c3aa4', dark: true },
      { name: 'Maps 05', variable: '--color-data-viz-maps-05', value: '#050560', dark: true },
    ],
  },
];

// ---------------------------------------------------------------------------
// Font-class data — mirrors @layer components in styles.css
// ---------------------------------------------------------------------------

const fontGroups = [
  {
    group: 'Display',
    description: 'Marketing / Landing pages only',
    classes: [
      {
        className: 'display-title',
        label: 'Display Title',
        font: 'Public Sans',
        size: '2.5rem / 600',
      },
      {
        className: 'display-subtitle',
        label: 'Display Subtitle',
        font: 'Source Serif Pro',
        size: '1.5rem / 400',
      },
      {
        className: 'display-section-title',
        label: 'Display Section Title',
        font: 'Source Serif Pro',
        size: '2.5rem / 400',
      },
      {
        className: 'display-product-header',
        label: 'Display Product Header',
        font: 'Public Sans',
        size: '1.5rem / 600',
      },
    ],
  },
  {
    group: 'Headings',
    description: 'Content pages',
    classes: [
      { className: 'heading-h1', label: 'Heading H1', font: 'Public Sans', size: '2.5rem / 600' },
      {
        className: 'heading-h2',
        label: 'Heading H2',
        font: 'Source Serif Pro',
        size: '2rem / 400',
      },
      { className: 'heading-h3', label: 'Heading H3', font: 'Public Sans', size: '1.5rem / 600' },
    ],
  },
  {
    group: 'Body',
    description: 'Content pages and long-form reading',
    classes: [
      {
        className: 'body-regular',
        label: 'Body Regular',
        font: 'Public Sans',
        size: '1.125rem / 400',
      },
      {
        className: 'body-italic',
        label: 'Body Italic',
        font: 'Public Sans',
        size: '1.125rem / italic',
      },
      { className: 'body-bold', label: 'Body Bold', font: 'Public Sans', size: '1.125rem / 600' },
      {
        className: 'body-link',
        label: 'Body Link',
        font: 'Public Sans',
        size: '1.125rem / 600 underline',
      },
    ],
  },
  {
    group: 'UI Base',
    description: 'Reusable across components',
    classes: [
      {
        className: 'ui-16-regular',
        label: 'UI 16 Regular',
        font: 'Public Sans',
        size: '1rem / 400',
      },
      {
        className: 'ui-16-italic',
        label: 'UI 16 Italic',
        font: 'Public Sans',
        size: '1rem / italic',
      },
      { className: 'ui-16-bold', label: 'UI 16 Bold', font: 'Public Sans', size: '1rem / 600' },
      {
        className: 'ui-16-link',
        label: 'UI 16 Link',
        font: 'Public Sans',
        size: '1rem / 600 underline',
      },
      {
        className: 'ui-14-regular',
        label: 'UI 14 Regular',
        font: 'Public Sans',
        size: '0.875rem / 400',
      },
      {
        className: 'ui-14-italic',
        label: 'UI 14 Italic',
        font: 'Public Sans',
        size: '0.875rem / italic',
      },
      { className: 'ui-14-bold', label: 'UI 14 Bold', font: 'Public Sans', size: '0.875rem / 600' },
      {
        className: 'ui-14-link',
        label: 'UI 14 Link',
        font: 'Public Sans',
        size: '0.875rem / 600 underline',
      },
      {
        className: 'ui-12-regular',
        label: 'UI 12 Regular',
        font: 'Public Sans',
        size: '0.75rem / 400',
      },
      {
        className: 'ui-12-all-caps',
        label: 'UI 12 All Caps',
        font: 'Public Sans',
        size: '0.75rem / uppercase',
      },
    ],
  },
  {
    group: 'Buttons',
    description: 'Standalone button labels',
    classes: [
      { className: 'button-label', label: 'Button Label', font: 'Public Sans', size: '1rem / 600' },
      {
        className: 'button-link-label',
        label: 'Button Link Label',
        font: 'Public Sans',
        size: '1rem / 600 underline',
      },
    ],
  },
  {
    group: 'Component Titles',
    description: 'Component-specific sizes',
    classes: [
      {
        className: 'component-accordion-title',
        label: 'Accordion Title',
        font: 'Public Sans',
        size: '1.25rem / 600',
      },
      {
        className: 'component-card-title',
        label: 'Card Title',
        font: 'Public Sans',
        size: '1.375rem / 600',
      },
      {
        className: 'component-card-link-title',
        label: 'Card Link Title',
        font: 'Public Sans',
        size: '1.375rem / 600 underline',
      },
      {
        className: 'component-control-panel-title',
        label: 'Control Panel Title',
        font: 'Public Sans',
        size: '1.125rem / 600',
      },
      {
        className: 'component-nav-inpage-item',
        label: 'In-Page Nav Item',
        font: 'Source Serif Pro',
        size: '1.25rem / 400 (mobile: 1.125rem)',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Dev token data — semantic aliases
// ---------------------------------------------------------------------------

const devTokenGroups = [
  {
    group: 'Text',
    tokens: [
      {
        name: 'text-primary',
        variable: '--color-text-primary',
        value: '#191919',
        usage: 'Body text, headings, primary content',
        dark: true,
      },
      {
        name: 'text-secondary',
        variable: '--color-text-secondary',
        value: '#777777',
        usage: 'Supporting text, captions',
        dark: true,
      },
      {
        name: 'text-link',
        variable: '--color-text-link',
        value: '#284cca',
        usage: 'Links, interactive text',
        dark: true,
      },
    ],
  },
  {
    group: 'Button',
    note: 'For disabled buttons, use opacity: 0.4 instead of separate disabled colors',
    tokens: [
      {
        name: 'button-primary-base',
        variable: '--color-button-primary-base',
        value: '#050560',
        usage: 'Button backgrounds',
        dark: true,
      },
      {
        name: 'button-primary-hover',
        variable: '--color-button-primary-hover',
        value: '#505090',
        usage: 'Button backgrounds on hover',
        dark: true,
      },
      {
        name: 'button-secondary-base',
        variable: '--color-button-secondary-base',
        value: '#ffffff',
        usage: 'Secondary button background (white)',
        dark: false,
      },
      {
        name: 'button-secondary-hover',
        variable: '--color-button-secondary-hover',
        value: '#f5f5f5',
        usage: 'Secondary button background on hover',
        dark: false,
      },
    ],
  },
  {
    group: 'Border',
    note: 'For strong borders use --color-neutral-500 directly · For subtle borders use --color-neutral-100 directly',
    tokens: [
      {
        name: 'border-default',
        variable: '--color-border-default',
        value: '#dddddd',
        usage: 'Default borders, input fields, card outlines',
        dark: false,
      },
      {
        name: 'border-focus',
        variable: '--color-border-focus',
        value: '#284cca',
        usage: 'Focused input fields',
        dark: true,
      },
      {
        name: 'border-error',
        variable: '--color-border-error',
        value: '#ec131e',
        usage: 'Error state borders',
        dark: true,
      },
    ],
  },
  {
    group: 'Background',
    tokens: [
      {
        name: 'bg-primary',
        variable: '--color-bg-primary',
        value: '#ffffff',
        usage: 'Page backgrounds, cards',
        dark: false,
      },
      {
        name: 'bg-secondary',
        variable: '--color-bg-secondary',
        value: '#f5f5f5',
        usage: 'Subtle backgrounds',
        dark: false,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ColorSwatch({
  name,
  variable,
  value,
  dark,
}: {
  name: string;
  variable: string;
  value: string;
  dark: boolean;
}) {
  const textColor = dark ? '#ffffff' : '#191919';
  const borderStyle = value === '#ffffff' ? '1px solid #dddddd' : 'none';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 120,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          backgroundColor: value,
          height: 80,
          border: borderStyle,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '6px 8px',
        }}
      >
        <span
          style={{ color: textColor, fontSize: '0.625rem', fontFamily: 'monospace', opacity: 0.8 }}
        >
          {value}
        </span>
      </div>
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '8px 10px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <div
          style={{
            fontFamily: 'Public Sans, sans-serif',
            fontWeight: 600,
            fontSize: '0.75rem',
            color: '#191919',
          }}
        >
          {name}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.625rem', color: '#777', marginTop: 2 }}>
          {variable}
        </div>
      </div>
    </div>
  );
}

function ColorGroup({ group, colors }: (typeof colorGroups)[number]) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h3
        style={{
          fontFamily: 'Public Sans, sans-serif',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#191919',
          marginBottom: 16,
          paddingBottom: 8,
          borderBottom: '1px solid #dddddd',
        }}
      >
        {group}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {colors.map((color) => (
          <ColorSwatch key={color.variable} {...color} />
        ))}
      </div>
    </div>
  );
}

function TypeRow({
  className,
  label,
  font,
  size,
}: {
  className: string;
  label: string;
  font: string;
  size: string;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        alignItems: 'center',
        gap: 24,
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: '#3f5bbf',
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          .{className}
        </div>
        <div
          style={{ fontFamily: 'Public Sans, sans-serif', fontSize: '0.6875rem', color: '#aaaaaa' }}
        >
          {font} · {size}
        </div>
      </div>
      <div className={className} style={{ color: '#191919' }}>
        {label}
      </div>
    </div>
  );
}

function FontGroup({ group, description, classes }: (typeof fontGroups)[number]) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #dddddd' }}>
        <h3
          style={{
            fontFamily: 'Public Sans, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#191919',
            margin: 0,
          }}
        >
          {group}
        </h3>
        <p
          style={{
            fontFamily: 'Public Sans, sans-serif',
            fontSize: '0.75rem',
            color: '#777',
            margin: '4px 0 0',
          }}
        >
          {description}
        </p>
      </div>
      <div>
        {classes.map((entry) => (
          <TypeRow key={entry.className} {...entry} />
        ))}
      </div>
    </div>
  );
}

function DevTokenRow({
  name,
  variable,
  value,
  usage,
  dark: _dark,
}: {
  name: string;
  variable: string;
  value: string;
  usage: string;
  dark: boolean;
}) {
  const borderStyle = value === '#ffffff' ? '1px solid #dddddd' : 'none';
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr 1fr',
        alignItems: 'center',
        gap: 16,
        padding: '12px 0',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: value,
          border: borderStyle,
          flexShrink: 0,
        }}
      />
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: '#191919',
            fontWeight: 600,
          }}
        >
          {name}
        </div>
        <div
          style={{ fontFamily: 'monospace', fontSize: '0.6875rem', color: '#777', marginTop: 2 }}
        >
          {variable}
        </div>
        <div
          style={{ fontFamily: 'monospace', fontSize: '0.6875rem', color: '#aaaaaa', marginTop: 2 }}
        >
          {value}
        </div>
      </div>
      <div style={{ fontFamily: 'Public Sans, sans-serif', fontSize: '0.8125rem', color: '#555' }}>
        {usage}
      </div>
    </div>
  );
}

function DevTokenGroup({
  group,
  note,
  tokens,
}: {
  group: string;
  note?: string;
  tokens: { name: string; variable: string; value: string; usage: string; dark: boolean }[];
}) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h3
        style={{
          fontFamily: 'Public Sans, sans-serif',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#191919',
          marginBottom: note ? 4 : 16,
          paddingBottom: 8,
          borderBottom: '1px solid #dddddd',
        }}
      >
        {group}
      </h3>
      {note && (
        <p
          style={{
            fontFamily: 'Public Sans, sans-serif',
            fontSize: '0.75rem',
            color: '#777',
            margin: '0 0 12px',
          }}
        >
          Note: {note}
        </p>
      )}
      {tokens.map((t) => (
        <DevTokenRow key={t.variable} {...t} />
      ))}
    </div>
  );
}

function DevTokensPage() {
  return (
    <div style={{ padding: '40px 32px', maxWidth: 960, fontFamily: 'Public Sans, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#191919', marginBottom: 8 }}>
        Dev Tokens
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#777', marginBottom: 40 }}>
        Semantic aliases defined in <code>styles.css</code>. Use these in components instead of raw
        brand colors.
      </p>
      {devTokenGroups.map((g) => (
        <DevTokenGroup key={g.group} group={g.group} note={g.note} tokens={g.tokens} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page-level render components (used by stories)
// ---------------------------------------------------------------------------

function ColorsPage() {
  return (
    <div style={{ padding: '40px 32px', maxWidth: 960, fontFamily: 'Public Sans, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#191919', marginBottom: 8 }}>
        Color Palette
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#777', marginBottom: 40 }}>
        All colors are defined as CSS custom properties in <code>styles.css</code>.
      </p>
      {colorGroups.map((g) => (
        <ColorGroup key={g.group} {...g} />
      ))}
    </div>
  );
}

function TypographyPage() {
  return (
    <div style={{ padding: '40px 32px', maxWidth: 960, fontFamily: 'Public Sans, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#191919', marginBottom: 8 }}>
        Typography
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#777', marginBottom: 40 }}>
        All classes are defined in <code>@layer components</code> inside <code>styles.css</code>.
      </p>
      {fontGroups.map((g) => (
        <FontGroup key={g.group} {...g} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Design Tokens',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => <ColorsPage />,
};

export const DevTokens: Story = {
  render: () => <DevTokensPage />,
};

export const Typography: Story = {
  render: () => <TypographyPage />,
};
