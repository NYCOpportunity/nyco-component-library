import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ListItem } from './ListItem';
import { useState } from 'react';

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: { layout: 'centered' },
  args: {
    label: 'List item',
    onClick: fn(),
    onSelectedChange: fn(),
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['standard', 'multi-standard', 'checkbox', 'radio'],
    },
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const listStyle: React.CSSProperties = { width: 260, display: 'flex', flexDirection: 'column' };

// ---------------------------------------------------------------------------
// Single stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: { type: 'standard' },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
};

export const WithPrimaryLabel: Story = {
  args: { type: 'standard', primaryLabel: 'Primary' },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
};

export const WithSecondaryLabel: Story = {
  args: { type: 'standard', secondaryLabel: 'Secondary' },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
};

export const WithBothLabels: Story = {
  args: { type: 'standard', primaryLabel: 'Primary', secondaryLabel: 'Secondary' },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { type: 'standard', disabled: true },
  render: (args) => (
    <div style={listStyle}>
      <ListItem {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// All types — States
// ---------------------------------------------------------------------------

const AllTypesDemo = () => {
  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const [radioSelected, setRadioSelected] = React.useState(false);
  const [multiSelected, setMultiSelected] = React.useState(false);

  return (
      <div style={{ display: 'flex', gap: 32, fontFamily: 'Public Sans, sans-serif' }}>
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#aaa',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Standard
          </p>
          <div style={listStyle}>
            <ListItem label="List item" type="standard" />
            <ListItem label="List item" type="standard" disabled />
          </div>
        </div>
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#aaa',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Multi-Standard
          </p>
          <div style={listStyle}>
            <ListItem
              label="List item"
              type="multi-standard"
              selected={multiSelected}
              onSelectedChange={setMultiSelected}
            />
            <ListItem label="List item" type="multi-standard" disabled />
          </div>
        </div>
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#aaa',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Checkbox
          </p>
          <div style={listStyle}>
            <ListItem
              label="List item"
              type="checkbox"
              selected={checkboxSelected}
              onSelectedChange={setCheckboxSelected}
            />
            <ListItem label="List item" type="checkbox" disabled />
          </div>
        </div>
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#aaa',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Radio
          </p>
          <div style={listStyle}>
            <ListItem
              label="List item"
              type="radio"
              selected={radioSelected}
              onSelectedChange={setRadioSelected}
            />
            <ListItem label="List item" type="radio" disabled />
          </div>
        </div>
      </div>
    );
};

export const AllTypes: Story = {
  name: 'All Types',
  render: () => <AllTypesDemo />,
};

// ---------------------------------------------------------------------------
// Labels grid
// ---------------------------------------------------------------------------

export const LabelsGrid: Story = {
  name: 'With Labels',
  render: () => (
    <div style={{ display: 'flex', gap: 32, fontFamily: 'Public Sans, sans-serif' }}>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Primary Label
        </p>
        <div style={listStyle}>
          <ListItem label="List item" primaryLabel="Primary" />
          <ListItem label="List item" primaryLabel="Primary" disabled />
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Secondary Label
        </p>
        <div style={listStyle}>
          <ListItem label="List item" secondaryLabel="Secondary" />
          <ListItem label="List item" secondaryLabel="Secondary" disabled />
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#aaa',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Both Labels
        </p>
        <div style={listStyle}>
          <ListItem label="List item" primaryLabel="Primary" secondaryLabel="Secondary" />
          <ListItem label="List item" primaryLabel="Primary" secondaryLabel="Secondary" disabled />
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive list example
// ---------------------------------------------------------------------------

const RadioGroupDemo = () => {
  const options = ['Option A', 'Option B', 'Option C'];
  const [value, setValue] = useState<string | null>(null);
  return (
    <div style={listStyle}>
      {options.map((opt) => (
        <ListItem
          key={opt}
          label={opt}
          type="radio"
          selected={value === opt}
          onSelectedChange={() => setValue(opt)}
        />
      ))}
    </div>
  );
};

export const RadioGroup: Story = {
  name: 'Radio Group (interactive)',
  render: () => <RadioGroupDemo />,
};

const CheckboxGroupDemo = () => {
  const options = ['Option A', 'Option B', 'Option C'];
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (opt: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(opt)) {
        next.delete(opt);
      } else {
        next.add(opt);
      }
      return next;
    });
  return (
    <div style={listStyle}>
      {options.map((opt) => (
        <ListItem
          key={opt}
          label={opt}
          type="checkbox"
          selected={selected.has(opt)}
          onSelectedChange={() => toggle(opt)}
        />
      ))}
    </div>
  );
};

export const CheckboxGroup: Story = {
  name: 'Checkbox Group (interactive)',
  render: () => <CheckboxGroupDemo />,
};
