import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Pagination } from './Pagination';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: 200, display: 'flex', alignItems: 'flex-start' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A **pagination control** for navigating paged content — search results, tables, or any',
          'list split across multiple pages. It is a controlled component: you own the current',
          '`page` in state and update it from `onChange`.',
          '',
          '---',
          '',
          '## Anatomy',
          '',
          '| Prop | Type | Required | Notes |',
          '| --- | --- | --- | --- |',
          '| `page` | `number` | ✅ | Current page (1-indexed). |',
          '| `totalPages` | `number` | ✅ | Total number of pages. |',
          '| `onChange` | `(page: number) => void` | ✅ | Fired when the user navigates. |',
          '| `expandableEllipsis` | `boolean` | — | When `true`, the `…` opens a dropdown of hidden pages. Defaults to a static indicator. |',
          '| `pageSize` | `number` | — | Current items-per-page value. |',
          '| `pageSizeOptions` | `number[]` | — | Options for the "Results per page" dropdown. |',
          '| `onPageSizeChange` | `(size: number) => void` | — | Fired when a new page size is picked. |',
          '',
          '## How to use it',
          '',
          '```tsx',
          'import { Pagination } from "@nycopportunity/component-library";',
          '',
          '// Controlled — manage `page` externally',
          'const [page, setPage] = React.useState(1);',
          '<Pagination page={page} totalPages={20} onChange={setPage} />',
          '',
          '// With an expandable ellipsis and a results-per-page dropdown',
          'const [size, setSize] = React.useState(25);',
          '<Pagination',
          '  page={page}',
          '  totalPages={20}',
          '  onChange={setPage}',
          '  expandableEllipsis',
          '  pageSize={size}',
          '  pageSizeOptions={[10, 25, 50, 100]}',
          '  onPageSizeChange={setSize}',
          '/>',
          '```',
          '',
          '## Behavior',
          '',
          'The bar always renders exactly **7 page slots** (plus the prev/next arrows). The first',
          'and last page are always visible. An **ellipsis (`…`)** appears whenever it would hide',
          '**2 or more** consecutive pages; with 7 or fewer total pages, every page is shown and no',
          'ellipsis is needed.',
          '',
          'With `expandableEllipsis`, clicking the `…` opens a **dropdown** of the hidden page',
          'numbers — picking one navigates there and closes the dropdown (it also closes on outside',
          'click). Without it, the `…` is a static, non-interactive indicator.',
          '',
          '## Controls',
          '',
          '- **Prev arrow** (`‹`) — disabled on page 1.',
          '- **Next arrow** (`›`) — disabled on the last page.',
          '',
          '## Accessibility',
          '',
          '- Every page is a `<button>` with `aria-label="Page N"`; the active page adds',
          '  `aria-current="page"`.',
          '- Prev/next expose `aria-label="Previous page"` / `"Next page"` and set `disabled` at the edges.',
          '- The expandable ellipsis uses `aria-expanded`; its dropdown is a `role="listbox"` of',
          '  `role="option"` page buttons.',
        ].join('\n'),
      },
    },
  },
  args: {
    onChange: fn(),
  },
  argTypes: {
    page: {
      control: { type: 'number', min: 1 },
      description: 'Current page number (1-indexed).',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages.',
    },
    onChange: {
      action: 'onChange',
      description: 'Called when the user navigates to a different page.',
    },
    expandableEllipsis: {
      control: 'boolean',
      description:
        'When `true`, clicking the ellipsis opens a dropdown of hidden pages. When `false` (default), the ellipsis is a static indicator.',
    },
    pageSize: {
      control: { type: 'number', min: 1 },
      description:
        'Current page size (items per page). Provide together with `pageSizeOptions` and `onPageSizeChange` to render a "Results per page" dropdown.',
    },
    pageSizeOptions: {
      control: 'object',
      description: 'Options for the page-size dropdown (e.g. `[10, 25, 50, 100]`).',
    },
    onPageSizeChange: {
      action: 'onPageSizeChange',
      description: 'Called when the user selects a new page size.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ---------------------------------------------------------------------------
// Playground — controlled wrapper
// ---------------------------------------------------------------------------
function PlaygroundWrapper(args: { page?: number; totalPages?: number }) {
  const [page, setPage] = React.useState(args.page ?? 7);
  // Sync when Storybook controls change
  React.useEffect(() => {
    if (args.page !== undefined) setPage(args.page);
  }, [args.page]);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <Pagination page={page} totalPages={args.totalPages ?? 10} onChange={setPage} />
    </div>
  );
}

export const Playground: Story = {
  name: 'Playground',
  args: {
    page: 7,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground. Adjust `page` and `totalPages` from the Controls panel. ' +
          'Click any page or the ellipsis to navigate.',
      },
    },
  },
  render: (args) => <PlaygroundWrapper {...args} />,
};

// ---------------------------------------------------------------------------
// Few pages — no ellipsis
// ---------------------------------------------------------------------------
function FewPagesExample() {
  const [page, setPage] = React.useState(2);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <Pagination page={page} totalPages={5} onChange={setPage} />
    </div>
  );
}

export const FewPages: Story = {
  name: 'Few Pages — No Ellipsis',
  parameters: {
    docs: {
      description: {
        story:
          'When all pages fit within the visible window (first + siblings + last), ' +
          'no ellipsis appears — just a flat row of page buttons.',
      },
    },
  },
  render: () => <FewPagesExample />,
};

// ---------------------------------------------------------------------------
// Many pages — both ellipses
// ---------------------------------------------------------------------------
function ManyPagesExample() {
  const [page, setPage] = React.useState(10);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <Pagination page={page} totalPages={20} onChange={setPage} />
    </div>
  );
}

export const ManyPages: Story = {
  name: 'Many Pages — Both Ellipses',
  parameters: {
    docs: {
      description: {
        story:
          'With 20 total pages and page 10 active, both the left and right ellipsis appear. ' +
          'Click either `...` to reveal the hidden pages in a dropdown.',
      },
    },
  },
  render: () => <ManyPagesExample />,
};

// ---------------------------------------------------------------------------
// First page
// ---------------------------------------------------------------------------
export const FirstPage: Story = {
  name: 'First Page (Prev Disabled)',
  args: {
    page: 1,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'When on the first page, the previous arrow is disabled.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Last page
// ---------------------------------------------------------------------------
export const LastPage: Story = {
  name: 'Last Page (Next Disabled)',
  args: {
    page: 10,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'When on the last page, the next arrow is disabled.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Expandable ellipsis
// ---------------------------------------------------------------------------
function ExpandableEllipsisExample() {
  const [page, setPage] = React.useState(10);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <Pagination page={page} totalPages={20} expandableEllipsis onChange={setPage} />
    </div>
  );
}

export const ExpandableEllipsis: Story = {
  name: 'Expandable Ellipsis',
  parameters: {
    docs: {
      description: {
        story:
          'With `expandableEllipsis={true}`, clicking the `...` opens a scrollable dropdown ' +
          'listing the hidden page numbers. Click any to navigate there.',
      },
    },
  },
  render: () => <ExpandableEllipsisExample />,
};

// ---------------------------------------------------------------------------
// Results per page dropdown
// ---------------------------------------------------------------------------
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function ResultsPerPageExample() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  return (
    <div style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <Pagination
        page={page}
        totalPages={20}
        onChange={setPage}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
}

export const ResultsPerPage: Story = {
  name: 'Results Per Page',
  parameters: {
    docs: {
      description: {
        story:
          'Pass `pageSize`, `pageSizeOptions`, and `onPageSizeChange` to render a ' +
          '"Results per page" dropdown beside the pagination bar. Changing the page size ' +
          'resets to page 1.',
      },
    },
  },
  render: () => <ResultsPerPageExample />,
};
