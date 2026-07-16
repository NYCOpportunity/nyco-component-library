import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Footer } from './Footer';
import type { FooterLinkGroup } from '../../types/components';

// ---------------------------------------------------------------------------
// Demo logo (same placeholder used in SiteNavigation stories)
// ---------------------------------------------------------------------------
function DemoLogo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
      }}
    >
      {/* Wordmark row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5.5px',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 900,
          fontSize: '20px',
          color: 'var(--color-primary-base, #050560)',
          letterSpacing: '-0.05em',
          textTransform: 'uppercase',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke="var(--color-primary-base, #050560)"
            strokeWidth="2"
          />
          <path
            d="M6 10a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm4-2v4m-2-2h4"
            stroke="var(--color-primary-base, #050560)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span>Site Name</span>
      </div>
      {/* NYC sub-brand (placeholder text) */}
      <span
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 900,
          fontSize: '16px',
          color: 'var(--color-primary-base, #050560)',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
        }}
      >
        NYC
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared link data (mirrors the Figma spec)
// ---------------------------------------------------------------------------
const siteNavGroups: FooterLinkGroup[] = [
  {
    links: [
      { label: 'Data Tool', href: '#' },
      { label: 'Findings', href: '#' },
      { label: 'Methodology', href: '#' },
    ],
  },
  {
    links: [
      { label: 'NYCO', href: '#' },
      { label: 'Equity NYC', href: '#' },
      { label: 'Workforce Data Portal', href: '#' },
    ],
  },
];

const nycLinkGroups: FooterLinkGroup[] = [
  {
    links: [
      { label: 'nyc.gov home', href: 'https://nyc.gov' },
      { label: 'Services', href: '#' },
      { label: 'Events', href: '#' },
      { label: 'Your government', href: '#' },
    ],
  },
  {
    links: [
      { label: '311', href: '#', bold: true },
      { label: 'Contact NYC government', href: '#' },
      { label: 'Register to vote', href: '#' },
      { label: 'Emergency alerts', href: '#' },
    ],
  },
  {
    links: [
      { label: 'Website feedback', href: '#', bold: true },
      { label: 'Accessibility resources', href: '#' },
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of use', href: '#' },
      { label: 'About nyc.gov content', href: '#' },
    ],
  },
];

const copyright =
  '© City of New York, 2025 All Rights Reserved. NYC is a trademark and service mark of the City of New York.';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        footerDesktop: {
          name: 'Footer Desktop',
          styles: { width: '1440px', height: '900px' },
        },
        footerMobile: {
          name: 'Footer Mobile',
          styles: { width: '375px', height: '812px' },
        },
      },
      defaultViewport: 'footerDesktop',
    },
    docs: {
      description: {
        component: [
          'The site-wide **Footer** — a two-zone landmark that closes every page with site',
          'navigation, an optional newsletter / connect call-to-action, and the standard NYC.gov',
          'links and copyright. Compose it entirely from data props; every section is optional and',
          'only renders when you supply its content.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          'The footer is split into a white **top zone** and a neutral-100 **bottom zone**. A zone is',
          'omitted entirely when none of its parts are provided.',
          '',
          '| Part | Prop | Zone | Notes |',
          '| --- | --- | --- | --- |',
          '| Logo | `logo` | Top | Any React node — typically a logo mark + wordmark. |',
          '| Site nav columns | `siteNavGroups` | Top | Array of `FooterLinkGroup`; each becomes one column (up to 3 on desktop). |',
          '| Connect heading | `connectTitle` | Top | CTA heading, e.g. "Receive updates…". |',
          '| Connect button | `connectButtonLabel`, `onConnectClick` | Top | Button renders only when `onConnectClick` is passed. Label defaults to `"Sign up"`. |',
          '| NYC section heading | `nycSectionTitle` | Bottom | Defaults to `"More on nyc.gov"`. |',
          '| NYC link columns | `nycLinkGroups` | Bottom | Array of `FooterLinkGroup` (up to 3 columns). |',
          '| Copyright | `copyright` | Bottom | Small print rule + copyright line. |',
          '',
          'Each `FooterLinkGroup` is `{ links: FooterLink[] }`. A `FooterLink` has `label`, optional',
          '`href` (renders an `<a>`, otherwise a plain `<span>`), `bold` (semibold heading style),',
          '`external` (opens in a new tab with `rel="noopener noreferrer"`), and `onClick`.',
          '',
          '---',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { Footer } from "@nycopportunity/component-library";',
          '',
          '<Footer',
          '  logo={<SiteLogo />}',
          '  siteNavGroups={[',
          '    { links: [',
          '      { label: "About", href: "/about", bold: true },',
          '      { label: "Data", href: "/data" },',
          '    ] },',
          '  ]}',
          '  connectTitle="Receive updates about the Workforce Data Portal"',
          '  onConnectClick={() => openSignupModal()}',
          '  nycLinkGroups={[',
          '    { links: [{ label: "311", href: "https://portal.311.nyc.gov", external: true }] },',
          '  ]}',
          '  copyright="© 2024 City of New York. All rights reserved."',
          '/>',
          '```',
          '',
          '---',
          '',
          '## Responsive',
          '',
          '| Breakpoint | Layout |',
          '| --- | --- |',
          '| Desktop (≥ 1000 px) | 56 px h-padding; each zone is a grid: logo column + up to 3 link columns. |',
          '| Tablet (600–999 px) | 24 px h-padding; columns stack. |',
          '| Mobile (< 600 px) | 16 px h-padding; single stacked column, full-width CTA button. |',
          '',
          '---',
          '',
          '## Accessibility',
          '',
          '- Rendered as a `<footer>` landmark element (forwards `ref`).',
          '- Links use real `<a>` elements; non-linked labels are plain `<span>`s.',
          '- External links set `target="_blank" rel="noopener noreferrer"` and append a visually-hidden',
          '  "(opens in a new tab)" note for screen readers.',
          '- Every focusable link and the CTA button show a visible focus ring via `--color-border-focus`.',
        ].join('\n'),
      },
    },
  },
  args: {
    onConnectClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Docs — reference state for the footer content and layout.
 */
export const Docs: Story = {
  args: {
    logo: <DemoLogo />,
    siteNavGroups,
    connectTitle: 'Receive updates about the Workforce Data Portal',
    connectButtonLabel: 'Button',
    nycLinkGroups,
    copyright,
  },
};

/**
 * Full footer — both zones, logo, nav links, CTA, and copyright.
 */
export const Default: Story = {
  args: {
    logo: <DemoLogo />,
    siteNavGroups,
    connectTitle: 'Receive updates about the Workforce Data Portal',
    connectButtonLabel: 'Button',
    nycLinkGroups,
    copyright,
  },
};

/**
 * Mobile — resize the canvas to < 1 000 px to see the stacked layout.
 */
export const Mobile: Story = {
  args: {
    logo: <DemoLogo />,
    siteNavGroups,
    connectTitle: 'Receive updates about the Workforce Data Portal',
    connectButtonLabel: 'Button',
    nycLinkGroups,
    copyright,
  },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'footerMobile' },
  },
};
