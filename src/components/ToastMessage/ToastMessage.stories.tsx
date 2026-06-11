import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ToastMessage } from './ToastMessage';
import { ToastMessageType } from '../../types/components';

const TYPES: ToastMessageType[] = ['info', 'success', 'warning', 'error'];

const meta: Meta<typeof ToastMessage> = {
  title: 'Components/ToastMessage',
  component: ToastMessage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '# ToastMessage',
          '',
          'A compact, dismissible status banner used to surface feedback about an action or system event.',
          '',
          '## Anatomy',
          '',
          '| Part | Description |',
          '| --- | --- |',
          '| **Background** | Tinted using the severity `--color-{type}-light` token. |',
          '| **Icon** | 24px leading icon, colored with `--color-{type}-base`. Toggle with `showIcon` or replace via `icon`. |',
          '| **Title** | Optional bold heading (Public Sans SemiBold, 18px). |',
          '| **Description** | Optional body text (Public Sans Regular, 18px). |',
          '| **Close button** | Optional 22px dismiss control. Toggle with `dismissible`, handle with `onDismiss`. |',
          '',
          '## Types',
          '',
          '`info` · `success` · `warning` · `error`',
          '',
          '## Content',
          '',
          'Provide a `title`, a `description`, or both. Omitting one collapses the layout to a single line.',
          '',
          '## Usage',
          '',
          '```tsx',
          "import { ToastMessage } from '@nycopportunity/component-library';",
          '',
          '<ToastMessage',
          '  type="success"',
          '  title="Saved"',
          '  description="Your changes have been saved."',
          '  onDismiss={() => removeToast(id)}',
          '/>;',
          '```',
          '',
          '## Accessibility',
          '',
          '- `info` / `success` render as `role="status"` with `aria-live="polite"`.',
          '- `warning` / `error` render as `role="alert"` with `aria-live="assertive"`.',
          '- The close button exposes an accessible label via `closeLabel` (defaults to `"Dismiss"`).',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: TYPES,
      description: 'Severity — sets background, icon, and live-region urgency.',
    },
    title: { control: 'text' },
    description: { control: 'text' },
    showIcon: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    closeLabel: { control: 'text' },
    role: { control: 'radio', options: [undefined, 'status', 'alert'] },
    onDismiss: { action: 'dismissed' },
  },
  args: {
    type: 'info',
    title: 'Title',
    description: 'Description',
    showIcon: true,
    dismissible: true,
    onDismiss: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ToastMessage>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {};

// ---------------------------------------------------------------------------
// 1. All types — title + description
// ---------------------------------------------------------------------------
export const AllTypes: Story = {
  parameters: {
    docs: { description: { story: 'The four severities with a title and description.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {TYPES.map((type) => (
        <ToastMessage
          key={type}
          {...args}
          type={type}
          title={type.charAt(0).toUpperCase() + type.slice(1)}
          description="Supporting description text for this toast."
        />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 2. Content variations
// ---------------------------------------------------------------------------
export const ContentVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Title only, description only, and title + description layouts.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ToastMessage {...args} type="info" title="Title only" description={undefined} />
      <ToastMessage {...args} type="info" title={undefined} description="Description only" />
      <ToastMessage
        {...args}
        type="info"
        title="Title and description"
        description="Both the heading and the supporting text are shown."
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 3. Without close button
// ---------------------------------------------------------------------------
export const WithoutClose: Story = {
  parameters: {
    docs: {
      description: { story: 'Non-dismissible toasts hide the trailing close button.' },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {TYPES.map((type) => (
        <ToastMessage
          key={type}
          {...args}
          type={type}
          dismissible={false}
          title={type.charAt(0).toUpperCase() + type.slice(1)}
          description="No close button on this toast."
        />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 4. Full matrix — every type × content × close combination
// ---------------------------------------------------------------------------
export const FullMatrix: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The complete set of variants: each severity in title-only, description-only, and title + description, both with and without the close button.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 320px)', gap: 16 }}>
      {TYPES.flatMap((type) =>
        [true, false].map((dismissible) => (
          <React.Fragment key={`${type}-${dismissible}`}>
            <ToastMessage
              type={type}
              dismissible={dismissible}
              title={type.charAt(0).toUpperCase() + type.slice(1)}
              onDismiss={fn()}
            />
            <ToastMessage
              type={type}
              dismissible={dismissible}
              description="Description only message."
              onDismiss={fn()}
            />
          </React.Fragment>
        ))
      )}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 5. Dismissable demo
// ---------------------------------------------------------------------------
function DismissDemo() {
  const [toasts, setToasts] = React.useState<ToastMessageType[]>([...TYPES]);

  const reset = () => setToasts([...TYPES]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      {toasts.map((type) => (
        <ToastMessage
          key={type}
          type={type}
          title={type.charAt(0).toUpperCase() + type.slice(1)}
          description="Click the × to dismiss this toast."
          onDismiss={() => setToasts((prev) => prev.filter((t) => t !== type))}
        />
      ))}
      {toasts.length === 0 && (
        <button
          type="button"
          onClick={reset}
          style={{
            alignSelf: 'flex-start',
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          Reset toasts
        </button>
      )}
    </div>
  );
}

export const Dismissable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive example — dismiss each toast, then reset to bring them back.',
      },
    },
  },
  render: () => <DismissDemo />,
};
