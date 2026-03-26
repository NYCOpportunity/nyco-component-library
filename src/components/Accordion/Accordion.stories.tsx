import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import type { AccordionNavItem } from '../../types/components';

// ---------------------------------------------------------------------------
// Token Panel — shown below each story in the Docs tab
// ---------------------------------------------------------------------------

function AccordionTokenPanel() {
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

  const colorTokens = [
    {
      property: 'Container background',
      variable: '--color-bg-primary (→ --color-neutral-white)',
      value: '#ffffff',
    },
    {
      property: 'Container border',
      variable: '--color-border-default (→ --color-neutral-300)',
      value: '#dddddd',
    },
    { property: 'Title text', variable: '--color-neutral-black', value: '#191919' },
    { property: 'Icon (+/−)', variable: '--color-neutral-black', value: '#191919' },
    { property: 'Body text', variable: '--color-neutral-black', value: '#191919' },
    {
      property: 'Divider',
      variable: '--color-border-default (→ --color-neutral-300)',
      value: '#dddddd',
    },
    { property: 'Active nav stroke', variable: '--color-neutral-black', value: '#191919' },
    { property: 'Inactive nav stroke', variable: '--color-neutral-300', value: '#dddddd' },
    { property: 'Active nav text', variable: '--color-neutral-black', value: '#191919' },
    {
      property: 'Inactive nav text',
      variable: '--color-text-secondary (→ --color-neutral-700)',
      value: '#777777',
    },
  ];

  const textTokens = [
    { property: 'Title font family', token: '--font-primary', value: 'Public Sans, sans-serif' },
    { property: 'Title weight', token: 'font-semibold', value: '600' },
    { property: 'Title size (desktop)', token: 'text-[20px]', value: '20px / lh 1.4' },
    { property: 'Title size (mobile)', token: 'text-[18px]', value: '18px / lh 1.4' },
    { property: 'Body font family', token: '--font-primary', value: 'Public Sans, sans-serif' },
    { property: 'Body weight', token: 'font-normal', value: '400' },
    { property: 'Body size', token: 'text-[18px]', value: '18px / lh 1.5' },
    { property: 'Nav font family', token: '--font-secondary', value: 'Source Serif Pro, serif' },
    { property: 'Nav size (desktop)', token: 'text-[20px]', value: '20px / lh 1.3' },
    { property: 'Nav size (mobile)', token: 'text-[18px]', value: '18px / lh 1.3' },
    { property: 'Border radius', token: '--border-radius-base', value: '0.25rem / 4px' },
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
      <p style={label}>Color Tokens</p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Property</th>
            <th style={th}>CSS Variable</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {colorTokens.map((t) => (
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
          {textTokens.map((t) => (
            <tr key={t.property}>
              <td style={td}>{t.property}</td>
              <td style={{ ...td, ...mono }}>{t.token}</td>
              <td style={{ ...td, ...mono }}>{t.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const defaultNavItems: AccordionNavItem[] = [
  { label: 'Introduction', href: '#introduction', active: true },
  { label: 'Eligibility', href: '#eligibility' },
  { label: 'How to Apply', href: '#apply' },
  { label: 'Program Details', href: '#details' },
  { label: 'Contact Us', href: '#contact' },
];

const bodyText =
  'Funded through the Workforce Innovation and Opportunity Act (WIOA), Learn & Earn (In-School Youth Program) supports high school juniors and seniors through high school graduation with work readiness training, career exploration, tutoring, and paid internships.';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An expandable/collapsible panel with two variants: **Accordion** for standard content panels, and **In-Page Nav** for Table of Contents navigation.',
      },
    },
  },
  args: {
    title: 'Accordion Title',
    variant: 'accordion',
    defaultOpen: false,
    children: bodyText,
    items: defaultNavItems,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['accordion', 'in-page-nav'],
      description:
        '`accordion` — expandable content panel. `in-page-nav` — Table of Contents with navigation items.',
    },
    title: {
      control: 'text',
      description: 'Header title displayed in the trigger.',
    },
    children: {
      control: 'text',
      description: 'Body content shown when `variant="accordion"` and the panel is open.',
    },
    items: {
      control: 'object',
      description:
        'Navigation items shown when `variant="in-page-nav"` and the panel is open. Each item has `label`, optional `href`, and optional `active`.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state (uncontrolled).',
    },
    open: {
      control: 'boolean',
      description:
        'Controlled open state. When provided the component delegates toggle logic to the parent.',
    },
    onOpenChange: {
      control: false,
      description: 'Callback fired when open state changes. Receives the next boolean.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the outer container.',
    },
  },
  decorators: [
    (Story: React.ComponentType, context: { viewMode: string; name: string }) => {
      if (context.viewMode !== 'docs' || context.name !== 'Default') {
        return <Story />;
      }
      return (
        <div>
          <Story />
          <AccordionTokenPanel />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Default collapsed accordion — click to expand. */
export const Default: Story = {};

/** Accordion rendered in the open/expanded state. */
export const Expanded: Story = {
  name: 'Default — Expanded',
  args: { defaultOpen: true },
};

/** In-Page Nav collapsed — used as a sticky Table of Contents sidebar. */
export const InPageNavDefault: Story = {
  name: 'In-Page Nav — Collapsed',
  args: {
    title: 'Table of Contents',
    variant: 'in-page-nav',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 343 }}>
        <Story />
        <AccordionTokenPanel />
      </div>
    ),
  ],
};

/** In-Page Nav open — shows the tab list with active/inactive strokes. */
export const InPageNavExpanded: Story = {
  name: 'In-Page Nav — Expanded',
  args: {
    title: 'Table of Contents',
    variant: 'in-page-nav',
    defaultOpen: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 343 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * All four states from the Figma spec side by side:
 * accordion collapsed/expanded and in-page nav collapsed/expanded.
 */
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const label: React.CSSProperties = {
      fontFamily: 'Public Sans, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#aaa',
      marginBottom: 8,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <p style={label}>Accordion — collapsed</p>
          <Accordion title="Accordion Title" variant="accordion">
            {bodyText}
          </Accordion>
        </div>
        <div>
          <p style={label}>Accordion — expanded</p>
          <Accordion title="Accordion Title" variant="accordion" defaultOpen>
            {bodyText}
          </Accordion>
        </div>
        <div>
          <p style={label}>In-Page Nav — collapsed</p>
          <div style={{ maxWidth: 343 }}>
            <Accordion title="Table of Contents" variant="in-page-nav" items={defaultNavItems} />
          </div>
        </div>
        <div>
          <p style={label}>In-Page Nav — expanded</p>
          <div style={{ maxWidth: 343 }}>
            <Accordion
              title="Table of Contents"
              variant="in-page-nav"
              defaultOpen
              items={defaultNavItems}
            />
          </div>
        </div>
      </div>
    );
  },
};
