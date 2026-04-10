import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ExpandableSelectGroup } from './ExpandableSelectGroup';
import type { ExpandableSelectGroupFilter } from '../../types/components';

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------
const demographicOptions = [
  { value: 'age', label: 'Age' },
  { value: 'sex', label: 'Sex' },
  { value: 'race', label: 'Race / ethnicity' },
  { value: 'disability', label: 'Disability status' },
  { value: 'nativity', label: 'Nativity' },
];

const demographicFilters: ExpandableSelectGroupFilter[] = [
  { id: 'age', label: 'Age', options: demographicOptions },
  { id: 'sex', label: 'Sex', options: demographicOptions },
  { id: 'race', label: 'Race / ethnicity', options: demographicOptions },
  { id: 'disability', label: 'Disability status', options: demographicOptions },
  { id: 'nativity', label: 'Nativity', options: demographicOptions },
  { id: 'borough', label: 'Borough', options: demographicOptions },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof ExpandableSelectGroup> = {
  title: 'Components/ExpandableSelectGroup',
  component: ExpandableSelectGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '`ExpandableSelectGroup` is a filter panel card composed of stacked `ExpandableSelect` rows.\n\n' +
          'It provides an optional title + subtitle header, borders the whole panel in a white card, ' +
          'and wires accordion behavior (opening one filter closes the rest) out of the box.\n\n' +
          '---\n\n' +
          '## Props\n\n' +
          '| Prop | Type | Default | Description |\n' +
          '|---|---|---|---|\n' +
          '| `filters` | `ExpandableSelectGroupFilter[]` | — | Filter rows |\n' +
          '| `title` | `string` | — | Card heading (semibold 18 px) |\n' +
          '| `subtitle` | `string` | — | Subtitle below heading (regular 16 px) |\n' +
          '| `value` | `Record<id, string[]>` | — | Controlled selection map |\n' +
          '| `defaultValue` | `Record<id, string[]>` | `{}` | Uncontrolled initial selections |\n' +
          '| `onChange` | `(map) => void` | — | Called on any selection change |\n' +
          '| `defaultOpenId` | `string` | — | Filter `id` that starts open |\n' +
          '| `accordion` | `boolean` | `true` | One-open-at-a-time mode |\n',
      },
    },
  },
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '345px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** All filters collapsed — matches the left panel in the Figma. */
export const AllCollapsed: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters,
  },
};

/** Second filter pre-opened — matches the right panel in the Figma. */
export const OneOpen: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters,
    defaultOpenId: 'sex',
  },
};

/** Pre-selected values on two filters. */
export const WithSelections: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters,
    defaultOpenId: 'age',
    defaultValue: {
      age: ['age', 'sex'],
      race: ['race'],
    },
  },
};

/** `accordion={false}` — multiple filters can be open at the same time. */
export const MultiOpen: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters,
    accordion: false,
    defaultOpenId: 'age',
  },
};

/** No title or subtitle — bare filter list. */
export const FiltersOnly: Story = {
  args: {
    filters: demographicFilters,
  },
};

/** One filter row disabled. */
export const WithDisabledFilter: Story = {
  args: {
    title: 'Segment by demographics (optional)',
    subtitle: 'Select up to two categories',
    filters: demographicFilters.map((f) => ({ ...f, disabled: f.id === 'nativity' })),
  },
};
