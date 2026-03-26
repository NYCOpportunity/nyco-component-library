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
    {
      property: 'Title',
      token: '.component-accordion-title',
      value: 'Public Sans, 1.25rem, 600, lh 140%',
    },
    {
      property: 'Body',
      token: '.body-regular',
      value: 'Public Sans, 1.125rem, 400, lh 150%',
    },
    {
      property: 'Nav item',
      token: '.component-nav-inpage-item',
      value: 'Source Serif Pro, 1.25rem, 400, lh 130%',
    },
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
    disabled: {
      control: 'boolean',
      description: 'When true, prevents toggling and dims the component.',
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

/** Disabled state — cannot be toggled, visually dimmed. */
export const Disabled: Story = {
  name: 'Default — Disabled',
  args: { disabled: true },
};

/** Disabled expanded — content visible but interaction locked. */
export const DisabledExpanded: Story = {
  name: 'Default — Disabled Expanded',
  args: { disabled: true, defaultOpen: true },
};

// ---------------------------------------------------------------------------
// Shared helpers for In-Page Nav stories
// ---------------------------------------------------------------------------

const pageSections = [
  {
    id: 'introduction',
    label: 'Introduction',
    content:
      "Funded through the Workforce Innovation and Opportunity Act (WIOA), Learn & Earn (In-School Youth Program) supports high school juniors and seniors through high school graduation with work readiness training, career exploration, tutoring, and paid internships. The program is designed to help young people build the skills they need to succeed in today's economy.",
  },
  {
    id: 'eligibility',
    label: 'Eligibility',
    content:
      'To be eligible for the Learn & Earn program, applicants must be between 14 and 21 years of age, currently enrolled in high school (grades 10–12), a resident of New York City, and meet income guidelines based on household size. Priority is given to youth who face significant barriers to employment, including those in foster care, justice-involved youth, homeless youth, and individuals with disabilities.',
  },
  {
    id: 'apply',
    label: 'How to Apply',
    content:
      'Applications are accepted on a rolling basis. To apply, complete the online application form on the NYC Opportunity portal, upload proof of age and NYC residency, provide your most recent report card or transcript, and attend a program orientation session. After submitting your application, a program coordinator will contact you within 5 business days to schedule an intake interview.',
  },
  {
    id: 'details',
    label: 'Program Details',
    content:
      'Participants receive up to 120 hours of paid work experience at $18.00 per hour. The program runs year-round with two main cohorts: a summer session (June–August) and an academic-year session (September–May). In addition to paid internships, participants receive weekly workshops on financial literacy, college and career readiness, and digital skills. A dedicated case manager supports each participant throughout their enrollment.',
  },
  {
    id: 'contact',
    label: 'Contact Us',
    content:
      'For questions about the program, contact the Learn & Earn program office at learnandearn@opportunity.nyc.gov or call 311 and ask for Learn & Earn Youth Services. Walk-in hours are available Monday through Friday, 9 AM – 5 PM, at 1 Centre Street, New York, NY 10007. For translation or accessibility accommodations, please indicate your needs when you contact us.',
  },
];

type SectionId = (typeof pageSections)[number]['id'];

function InPageNavLayout({ defaultOpen }: { defaultOpen?: boolean }) {
  const [activeId, setActiveId] = React.useState<SectionId>('introduction');
  const contentRef = React.useRef<HTMLDivElement>(null);

  const makeNavItems = (): AccordionNavItem[] =>
    pageSections.map((s) => ({
      label: s.label,
      href: `#${s.id}`,
      active: s.id === activeId,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId(s.id as SectionId);
        const target = contentRef.current?.querySelector(`#${s.id}`);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
    }));

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', maxWidth: 900 }}>
      {/* Sticky nav sidebar */}
      <div style={{ width: 280, flexShrink: 0, position: 'sticky', top: 16 }}>
        <Accordion
          title="Table of Contents"
          variant="in-page-nav"
          defaultOpen={defaultOpen}
          items={makeNavItems()}
        />
      </div>

      {/* Page content */}
      <div
        ref={contentRef}
        style={{
          flex: 1,
          maxHeight: 480,
          overflowY: 'auto',
          paddingRight: 8,
          scrollBehavior: 'smooth',
        }}
      >
        {pageSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            style={{ marginBottom: 40, scrollMarginTop: 16 }}
          >
            <h2
              style={{
                fontFamily: 'Public Sans, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: '140%',
                color: '#191919',
                marginBottom: 12,
              }}
            >
              {section.label}
            </h2>
            <p
              style={{
                fontFamily: 'Public Sans, sans-serif',
                fontSize: '1.125rem',
                fontWeight: 400,
                lineHeight: '150%',
                color: '#191919',
              }}
            >
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

/** In-Page Nav collapsed alongside real page content — click to open, then navigate to sections. */
export const InPageNavDefault: Story = {
  name: 'In-Page Nav — Collapsed',
  render: () => <InPageNavLayout defaultOpen={false} />,
};

/** In-Page Nav open alongside real page content — click a section to scroll and mark it active. */
export const InPageNavExpanded: Story = {
  name: 'In-Page Nav — Expanded',
  render: () => <InPageNavLayout defaultOpen={true} />,
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

/** Mobile collapsed — 16px padding, 8px radius, rotated + as close icon. */
export const MobileCollapsed: Story = {
  name: 'Mobile — Collapsed',
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
  args: { defaultOpen: false },
};

/** Mobile expanded — body content visible at mobile size. */
export const MobileExpanded: Story = {
  name: 'Mobile — Expanded',
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
  args: { defaultOpen: true },
};

/** Mobile in-page nav — expanded at mobile size. */
export const MobileInPageNav: Story = {
  name: 'Mobile — In-Page Nav',
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
  args: {
    title: 'Table of Contents',
    variant: 'in-page-nav',
    defaultOpen: true,
    items: defaultNavItems,
  },
};
