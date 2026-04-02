import * as React from 'react';
import { PaginationProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}

function EllipsisIcon() {
  return (
    <svg
      width="13"
      height="4"
      viewBox="0 0 13 4"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <circle cx="1.5" cy="2" r="1.5" />
      <circle cx="6.5" cy="2" r="1.5" />
      <circle cx="11.5" cy="2" r="1.5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Page range algorithm — always exactly 7 visible items
//
// Structure:
//   ≤7 pages  → show all, no ellipsis
//   near left → [1, 2, 3, 4, 5, ...right, totalPages]
//   near right→ [1, ...left, n-4, n-3, n-2, n-1, n]
//   middle    → [1, ...left, page-1, page, page+1, ...right, totalPages]
//
// Ellipsis only appears when it would hide ≥2 pages.
// ---------------------------------------------------------------------------

type PageItem = { type: 'page'; page: number };
type EllipsisItem = { type: 'ellipsis'; id: 'left' | 'right'; hidden: number[] };
type RangeItem = PageItem | EllipsisItem;

function numRange(from: number, to: number): number[] {
  return Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);
}

function buildPageItems(page: number, totalPages: number): RangeItem[] {
  if (totalPages <= 0) return [];

  // All pages fit — no ellipsis needed
  if (totalPages <= 7) {
    return numRange(1, totalPages).map((p) => ({ type: 'page', page: p }));
  }

  // Left ellipsis hides pages 2..page-2 → needs page >= 5 to have ≥2 hidden
  const showLeftEllipsis = page >= 5;
  // Right ellipsis hides pages page+2..totalPages-1 → needs page <= totalPages-4 to have ≥2 hidden
  const showRightEllipsis = page <= totalPages - 4;

  if (!showLeftEllipsis) {
    // Near left edge: [1, 2, 3, 4, 5, ...right, totalPages]
    return [
      ...numRange(1, 5).map((p): RangeItem => ({ type: 'page', page: p })),
      { type: 'ellipsis', id: 'right', hidden: numRange(6, totalPages - 1) },
      { type: 'page', page: totalPages },
    ];
  }

  if (!showRightEllipsis) {
    // Near right edge: [1, ...left, n-4, n-3, n-2, n-1, n]
    const n = totalPages;
    return [
      { type: 'page', page: 1 },
      { type: 'ellipsis', id: 'left', hidden: numRange(2, n - 5) },
      ...numRange(n - 4, n).map((p): RangeItem => ({ type: 'page', page: p })),
    ];
  }

  // Middle: both ellipses — [1, ...left, page-1, page, page+1, ...right, totalPages]
  return [
    { type: 'page', page: 1 },
    { type: 'ellipsis', id: 'left', hidden: numRange(2, page - 2) },
    ...numRange(page - 1, page + 1).map((p): RangeItem => ({ type: 'page', page: p })),
    { type: 'ellipsis', id: 'right', hidden: numRange(page + 2, totalPages - 1) },
    { type: 'page', page: totalPages },
  ];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const PAGE_BTN =
  'inline-flex items-center justify-center size-[40px] rounded-[8px] text-[16px] leading-[1.5] font-normal text-[var(--color-neutral-black)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px] transition-colors duration-200';

function PageButton({
  page,
  isCurrent,
  onClick,
}: {
  page: number;
  isCurrent: boolean;
  onClick: () => void;
}) {
  const { flashing, handlePointerDown } = useFlash();
  return (
    <button
      type="button"
      aria-label={`Page ${page}`}
      aria-current={isCurrent ? 'page' : undefined}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      className={cx(
        PAGE_BTN,
        isCurrent
          ? 'bg-[var(--color-neutral-100)]'
          : cx(
              'bg-[var(--color-neutral-white)]',
              '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]',
              flashing && '[@media(hover:none)]:bg-[var(--color-neutral-100)]'
            )
      )}
    >
      {page}
    </button>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  const { flashing, handlePointerDown } = useFlash(disabled);
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous page' : 'Next page'}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      className={cx(
        'inline-flex items-center justify-center size-[40px] rounded-[4px]',
        'text-[var(--color-neutral-black)]',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
        'transition-colors duration-200',
        disabled
          ? 'opacity-30 pointer-events-none'
          : cx(
              'bg-[var(--color-neutral-white)] [@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]',
              flashing && '[@media(hover:none)]:bg-[var(--color-neutral-100)]'
            )
      )}
    >
      {direction === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}

function EllipsisButton({
  item,
  isOpen,
  onToggle,
  onPageSelect,
}: {
  item: EllipsisItem;
  isOpen: boolean;
  onToggle: () => void;
  onPageSelect: (page: number) => void;
}) {
  const { flashing, handlePointerDown } = useFlash();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onToggle();
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isOpen, onToggle]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Show more pages"
        aria-expanded={isOpen}
        onClick={onToggle}
        onPointerDown={handlePointerDown}
        className={cx(
          PAGE_BTN,
          'bg-[var(--color-neutral-white)]',
          '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]',
          flashing && '[@media(hover:none)]:bg-[var(--color-neutral-100)]'
        )}
      >
        <EllipsisIcon />
      </button>

      {isOpen && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 z-10 flex flex-col gap-[4px] bg-[var(--color-neutral-white)] rounded-[4px] p-[8px] shadow-[0px_4px_15px_0px_rgba(25,25,25,0.08)] max-h-[96px] overflow-y-auto"
          role="listbox"
          aria-label="Hidden pages"
        >
          {item.hidden.map((p) => (
            <button
              key={p}
              type="button"
              role="option"
              aria-selected={false}
              aria-label={`Page ${p}`}
              onClick={() => {
                onPageSelect(p);
              }}
              className={cx(
                PAGE_BTN,
                'bg-[var(--color-neutral-white)]',
                '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export function Pagination({ page, totalPages, onChange, className }: PaginationProps) {
  const [openEllipsis, setOpenEllipsis] = React.useState<'left' | 'right' | null>(null);

  const range = buildPageItems(page, totalPages);

  const handlePageSelect = (p: number) => {
    setOpenEllipsis(null);
    onChange(p);
  };

  return (
    <nav aria-label="Pagination" className={cx('flex items-center', className)}>
      <NavButton direction="prev" disabled={page <= 1} onClick={() => onChange(page - 1)} />

      {range.map((item, index) => {
        if (item.type === 'page') {
          return (
            <PageButton
              key={`slot-${index}`}
              page={item.page}
              isCurrent={item.page === page}
              onClick={() => handlePageSelect(item.page)}
            />
          );
        }

        return (
          <EllipsisButton
            key={`slot-${index}`}
            item={item}
            isOpen={openEllipsis === item.id}
            onToggle={() => setOpenEllipsis((prev) => (prev === item.id ? null : item.id))}
            onPageSelect={handlePageSelect}
          />
        );
      })}

      <NavButton
        direction="next"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      />
    </nav>
  );
}

Pagination.displayName = 'Pagination';
