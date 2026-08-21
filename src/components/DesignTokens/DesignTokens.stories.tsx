import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

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

const presetClassRows = [
  {
    className: 'bg-primary',
    token: '--color-primary-base',
    description: 'Primary brand background',
  },
  {
    className: 'bg-secondary',
    token: '--color-secondary-base',
    description: 'Secondary accent background',
  },
  { className: 'text-primary', token: '--color-text-primary', description: 'Primary text color' },
  {
    className: 'text-secondary',
    token: '--color-text-secondary',
    description: 'Secondary text color',
  },
  { className: 'text-link', token: '--color-text-link', description: 'Link text color' },
  { className: 'text-neutral-900', token: '--color-neutral-900', description: 'Neutral dark text' },
  {
    className: 'border-default',
    token: '--color-border-default',
    description: 'Default border color',
  },
  { className: 'border-error', token: '--color-border-error', description: 'Error border color' },
  { className: 'font-primary', token: '--font-primary', description: 'Primary body font stack' },
  {
    className: 'font-secondary',
    token: '--font-secondary',
    description: 'Secondary editorial font stack',
  },
  { className: 'font-brand', token: '--font-primary', description: 'Brand alias for primary font' },
  { className: 'text-sm', token: '--font-size-sm', description: 'Small text size' },
  { className: 'text-md', token: '--font-size-md', description: 'Body text size' },
  { className: 'text-lg', token: '--font-size-lg', description: 'Large reading text size' },
  { className: 'rounded-base', token: '--border-radius-base', description: 'Base form radius' },
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

function PresetClassesPage() {
  return (
    <div style={{ padding: '40px 32px', maxWidth: 960, fontFamily: 'Public Sans, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#191919', marginBottom: 8 }}>
        Tailwind Preset Classes
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#777', marginBottom: 28, lineHeight: 1.6 }}>
        The preset exposes semantic utility names without the leading <code>--</code> so app code
        stays readable. Example: <code>bg-primary</code>, <code>text-neutral-900</code>,
        <code>font-primary</code>.
      </p>
      <div
        style={{
          display: 'grid',
          gap: 12,
          border: '1px solid #eeeeee',
          borderRadius: 12,
          background: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {presetClassRows.map((entry) => (
          <div
            key={entry.className}
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr 1fr',
              gap: 16,
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#3f5bbf',
                fontWeight: 600,
              }}
            >
              {entry.className}
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '0.6875rem',
                color: '#777',
                whiteSpace: 'nowrap',
              }}
            >
              {entry.token}
            </div>
            <div
              style={{
                fontFamily: 'Public Sans, sans-serif',
                fontSize: '0.8125rem',
                color: '#555',
              }}
            >
              {entry.description}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <CodeSnippet
          code={`// tailwind.config.js
const uiPreset = require('@nycopportunity/component-library/tailwind-preset');

module.exports = {
  presets: [uiPreset],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};

// app usage
<div className="bg-primary text-neutral-900 font-primary rounded-base">
  Hello
</div>`}
        />
      </div>
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
        Typography Classes
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#777', marginBottom: 40, lineHeight: 1.6 }}>
        These class names are the public design-system typography API. Use them in{' '}
        <code>className</code>
        with the library stylesheet and the Tailwind preset enabled.
      </p>
      {fontGroups.map((g) => (
        <FontGroup key={g.group} {...g} />
      ))}
    </div>
  );
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: '14px 16px',
        background: '#191919',
        color: '#f5f5f5',
        borderRadius: 8,
        fontFamily: 'monospace',
        fontSize: '0.8125rem',
        lineHeight: 1.65,
        overflowX: 'auto',
        whiteSpace: 'pre',
      }}
    >
      <code>{code}</code>
    </pre>
  );
}

function Example({
  title,
  description,
  preview,
  code,
}: {
  title: string;
  description?: string;
  preview?: ReactNode;
  code: string;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#191919', margin: '0 0 4px' }}>
        {title}
      </h3>
      {description && (
        <p style={{ fontSize: '0.8125rem', color: '#777', margin: '0 0 12px', lineHeight: 1.6 }}>
          {description}
        </p>
      )}
      {preview != null && (
        <div
          style={{
            border: '1px solid #eee',
            borderRadius: 8,
            padding: 20,
            marginBottom: 10,
            background: '#fff',
          }}
        >
          {preview}
        </div>
      )}
      <CodeSnippet code={code} />
    </div>
  );
}

function UsageSection({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div style={{ margin: '48px 0 20px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#191919', margin: 0 }}>
        {children}
      </h2>
      {note && (
        <p style={{ fontSize: '0.875rem', color: '#777', margin: '6px 0 0', lineHeight: 1.6 }}>
          {note}
        </p>
      )}
    </div>
  );
}

function UsagePage() {
  return (
    <div style={{ padding: '40px 32px', maxWidth: 960, fontFamily: 'Public Sans, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#191919', marginBottom: 8 }}>
        Using Tokens
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#777', margin: '0 0 12px', lineHeight: 1.6 }}>
        Every token is a CSS custom property defined in <code>styles.css</code>. Import the
        stylesheet once at your app root, then reference the variables anywhere — in CSS, inline
        styles, Tailwind, or JavaScript.
      </p>
      <CodeSnippet
        code={`// app entry (e.g. main.tsx)\nimport '@nycopportunity/component-library/style.css';`}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Colors                                                            */}
      {/* ---------------------------------------------------------------- */}
      <UsageSection note="Reference the --color-* custom properties — never hard-code hex values, so themes stay consistent.">
        Pulling colors
      </UsageSection>

      <Example
        title="Plain CSS"
        description="Reference the variable in any stylesheet or CSS module."
        preview={
          <span
            style={{
              background: 'var(--color-primary-base)',
              color: 'var(--color-primary-foreground)',
              padding: '10px 16px',
              borderRadius: 6,
              fontWeight: 600,
              display: 'inline-block',
            }}
          >
            Primary surface
          </span>
        }
        code={`.cta {\n  background: var(--color-primary-base);\n  color: var(--color-primary-foreground);\n}`}
      />

      <Example
        title="Inline React style"
        description="Pass the variable straight into the style object."
        preview={
          <span style={{ color: 'var(--color-error-base)', fontWeight: 600 }}>Error message</span>
        }
        code={`<span style={{ color: 'var(--color-error-base)' }}>\n  Error message\n</span>`}
      />

      <Example
        title="Tailwind (arbitrary value)"
        description="Wrap the variable in Tailwind's arbitrary-value brackets."
        preview={
          <span
            style={{
              background: 'var(--color-secondary-base)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: 6,
              fontWeight: 600,
              display: 'inline-block',
            }}
          >
            Secondary
          </span>
        }
        code={`<button className="bg-[var(--color-secondary-base)] text-white px-4 py-2 rounded">\n  Secondary\n</button>`}
      />

      <Example
        title="JavaScript (dynamic / data-viz)"
        description="Resolve a value at runtime — handy for charts, canvas, or SVG fills."
        preview={
          <span style={{ display: 'inline-flex', gap: 8 }}>
            {['01', '02', '03', '04'].map((n) => (
              <span
                key={n}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                  background: `var(--color-data-viz-${n})`,
                }}
              />
            ))}
          </span>
        }
        code={`const styles = getComputedStyle(document.documentElement);\nconst color = styles.getPropertyValue('--color-data-viz-01').trim();\n// → "#3f5bbf"`}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Typography                                                        */}
      {/* ---------------------------------------------------------------- */}
      <UsageSection note="Apply a typography utility class — one class sets font-family, size, line-height, and weight together.">
        Pulling typography
      </UsageSection>

      <Example
        title="Utility classes"
        description="The quickest way — the class name is the full type style."
        preview={
          <div>
            <div className="heading-h1" style={{ marginBottom: 4 }}>
              Heading H1
            </div>
            <p className="body-regular" style={{ margin: 0 }}>
              Body regular paragraph for long-form reading.
            </p>
          </div>
        }
        code={`<h1 className="heading-h1">Page title</h1>\n<p className="body-regular">Body copy…</p>\n<span className="ui-16-bold">Button label</span>`}
      />

      <Example
        title="Font family & size variables"
        description="For custom rules, compose from the raw font tokens."
        preview={
          <span
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: 'var(--font-size-lg)',
              lineHeight: 'var(--line-height-lg)',
            }}
          >
            Source Serif, large
          </span>
        }
        code={`.quote {\n  font-family: var(--font-secondary);\n  font-size: var(--font-size-lg);\n  line-height: var(--line-height-lg);\n}`}
      />

      <Example
        title="Typography + color together"
        description="Combine a type class with a color token for links and emphasis."
        preview={
          <span className="ui-16-link" style={{ color: 'var(--color-text-link)' }}>
            Learn more
          </span>
        }
        code={`<a\n  className="ui-16-link"\n  style={{ color: 'var(--color-text-link)' }}\n>\n  Learn more\n</a>`}
      />
    </div>
  );
}

function DeveloperReferencePage() {
  const allColorTokens = colorGroups.flatMap((group) =>
    group.colors.map((color) => ({
      ...color,
      group: group.group,
    }))
  );

  const allTypographyTokens = fontGroups.flatMap((group) =>
    group.classes.map((entry) => ({
      ...entry,
      group: group.group,
    }))
  );

  return (
    <div style={{ padding: '40px 32px', maxWidth: 1200, fontFamily: 'Public Sans, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#191919', marginBottom: 8 }}>
        Developer Reference
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#777', marginBottom: 32, lineHeight: 1.6 }}>
        Use these tokens in application code, design files, or the Tailwind preset. The semantic
        class names are the public API, while the CSS variables remain the canonical source.
      </p>

      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#191919', marginBottom: 16 }}>
          Tailwind preset classes
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 12,
            border: '1px solid #eeeeee',
            borderRadius: 12,
            background: '#ffffff',
            overflow: 'hidden',
          }}
        >
          {presetClassRows.map((entry) => (
            <div
              key={entry.className}
              style={{
                display: 'grid',
                gridTemplateColumns: '220px 1fr 1fr',
                gap: 16,
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: '#3f5bbf',
                  fontWeight: 600,
                }}
              >
                {entry.className}
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.6875rem',
                  color: '#777',
                  whiteSpace: 'nowrap',
                }}
              >
                {entry.token}
              </div>
              <div
                style={{
                  fontFamily: 'Public Sans, sans-serif',
                  fontSize: '0.8125rem',
                  color: '#555',
                }}
              >
                {entry.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#191919', marginBottom: 16 }}>
          Color tokens
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16,
          }}
        >
          {allColorTokens.map((color) => (
            <div
              key={color.variable}
              style={{
                border: '1px solid #eeeeee',
                borderRadius: 10,
                overflow: 'hidden',
                background: '#fff',
              }}
            >
              <div
                style={{
                  background: color.value,
                  height: 90,
                  borderBottom: color.value === '#ffffff' ? '1px solid #dddddd' : 'none',
                }}
              />
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#191919' }}>
                  {color.name}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.625rem',
                    color: '#777',
                    marginTop: 4,
                  }}
                >
                  {color.variable}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.625rem',
                    color: '#777',
                    marginTop: 2,
                  }}
                >
                  {color.value}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#555', marginTop: 6 }}>
                  {color.group}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#191919', marginBottom: 16 }}>
          Typography utility classes
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {allTypographyTokens.map((entry) => (
            <div
              key={entry.className}
              style={{
                display: 'grid',
                gridTemplateColumns: '220px 1fr',
                gap: 20,
                alignItems: 'center',
                padding: '14px 0',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: '#3f5bbf',
                  fontWeight: 600,
                }}
              >
                .{entry.className}
              </div>
              <div className={entry.className} style={{ color: '#191919' }}>
                {entry.label}
              </div>
            </div>
          ))}
        </div>
      </div>
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

export const Presets: Story = {
  render: () => <PresetClassesPage />,
};

export const Typography: Story = {
  render: () => <TypographyPage />,
};

export const Usage: Story = {
  render: () => <UsagePage />,
};

export const DeveloperReference: Story = {
  render: () => <DeveloperReferencePage />,
};
