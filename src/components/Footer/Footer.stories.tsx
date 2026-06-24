import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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
      },
      defaultViewport: 'footerDesktop',
    },
    docs: {
      description: {
        component:
          '`Footer` is the site-wide footer with two distinct zones.\n\n' +
          '---\n\n' +
          '## Zones\n\n' +
          '**Top zone** (white bg): Logo · site nav link columns · connect / CTA section.\n\n' +
          '**Bottom zone** (neutral-100 bg): "More on nyc.gov" heading · link columns · copyright.\n\n' +
          '---\n\n' +
          '## Responsive\n\n' +
          '**Desktop (≥ 1 000 px):** 56 px horizontal padding, single row per zone with `justify-between`.\n\n' +
          '**Mobile (< 1 000 px):** 16 px horizontal padding, stacked column layout.\n\n' +
          '---\n\n' +
          '## Props\n\n' +
          '| Prop | Type | Default | Description |\n' +
          '|---|---|---|---|\n' +
          '| `logo` | `ReactNode` | — | Logo content (top-left) |\n' +
          '| `siteNavGroups` | `FooterLinkGroup[]` | `[]` | Top-section link columns |\n' +
          '| `connectTitle` | `string` | — | CTA heading text |\n' +
          '| `connectButtonLabel` | `string` | `"Sign up"` | CTA button label |\n' +
          '| `onConnectClick` | `MouseEventHandler` | — | CTA button click handler |\n' +
          '| `nycSectionTitle` | `string` | `"More on nyc.gov"` | Bottom-section heading |\n' +
          '| `nycLinkGroups` | `FooterLinkGroup[]` | `[]` | Bottom-section link columns |\n' +
          '| `copyright` | `string` | — | Copyright line at bottom |\n\n' +
          '---\n\n' +
          '## Design Tokens\n\n' +
          '| Property | Token | Value |\n' +
          '|---|---|---|\n' +
          '| Top zone bg | `--color-white` | `#ffffff` |\n' +
          '| Bottom zone bg | `--color-neutral-100` | `#f5f5f5` |\n' +
          '| Border | `--color-neutral-300` | `#dddddd` |\n' +
          '| Text | `--color-neutral-black` | `#191919` |\n' +
          '| Focus ring | `--color-border-focus` | `#284cca` |\n',
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
    viewport: { defaultViewport: 'mobile2' },
  },
};
