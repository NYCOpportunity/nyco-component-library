# Storybook Setup

Storybook is now configured and running for visual component development and documentation.

## Quick Start

```bash
# Start Storybook dev server (port 6006)
pnpm run storybook

# Build static Storybook for deployment
pnpm run build:storybook
```

## Access

- **Local**: http://localhost:6006/
- **Network**: http://10.165.193.26:6006/

## Structure

- `.storybook/main.ts` - Storybook configuration
- `.storybook/preview.ts` - Global configuration and styling
- `src/components/Button.stories.tsx` - Button component stories

## Available Stories

### Button Component Stories

1. **Primary** - Default primary contained button
2. **Secondary** - Secondary color variant
3. **Outlined** - Outlined button style
4. **Text** - Minimal text button
5. **Small** - Small size button
6. **Large** - Large size button
7. **Disabled** - Disabled state
8. **AllSizes** - Showcase all size variants
9. **AllVariants** - Showcase all variant types
10. **AllColors** - All color combinations
11. **ColorMatrix** - Complete color and variant matrix

## Creating New Stories

To create a story for a new component:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../components/MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Component props
  },
};
```

## Features Enabled

- ✅ Auto-generated documentation from JSDoc comments
- ✅ Interactive controls for props
- ✅ Addon essentials (controls, actions, docs, etc.)
- ✅ Interaction testing support
- ✅ Tailwind CSS styling support
