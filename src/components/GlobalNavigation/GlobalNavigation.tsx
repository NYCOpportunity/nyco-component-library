import * as React from 'react';
import { GlobalNavigationProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// NYC logo — desktop (43.694 × 14.463 px) and mobile (30 × 10 px)
// Source: Figma Design-System-v2.0, node 3945:3363
// Replace these URLs with a local or CDN-hosted asset in production.
// ---------------------------------------------------------------------------
const NYC_LOGO_DESKTOP = 'https://www.figma.com/api/mcp/asset/7e6d093e-cdfc-45e4-af93-73256b2dfdd1';
const NYC_LOGO_MOBILE = 'https://www.figma.com/api/mcp/asset/7b630db2-fe8e-4cf0-96e9-a5d7222735bd';

// ---------------------------------------------------------------------------
// Icons — inline SVG (Material Design)
// ---------------------------------------------------------------------------

/** Material Design `g_translate` 20 × 20 */
function TranslateIcon() {
  return <Icon name="translate" size={20} />;
}

/** Material Design `expand_more` 20 × 20 */
function ChevronDownIcon() {
  return <Icon name="chevron-down" size={20} />;
}

// ---------------------------------------------------------------------------
// Focus ring — offset from the light-gray background
// ---------------------------------------------------------------------------
const focusRing =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const GlobalNavigation = React.forwardRef<HTMLDivElement, GlobalNavigationProps>(
  ({ showTranslate = true, language = 'English', onLanguageClick, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          'bg-[var(--color-neutral-100)] border-b border-[var(--color-neutral-300)]',
          'flex flex-col',
          className
        )}
      >
        {/* ── Mobile-only: translate row sits above the site text row ─────── */}
        {showTranslate && (
          <div className="hidden max-[999px]:flex items-center justify-end h-[34px] px-4 border-b border-[var(--color-neutral-300)]">
            <button
              type="button"
              onClick={onLanguageClick}
              aria-label={`Language: ${language}. Click to change language`}
              className={cx(
                'flex items-center gap-1 py-1 rounded-[var(--border-radius-base)]',
                'text-[12px] leading-[1.4] font-normal text-[var(--color-neutral-900)]',
                '[@media(hover:hover)]:hover:underline [@media(hover:hover)]:hover:underline-offset-2',
                focusRing
              )}
            >
              <TranslateIcon />
              <span>Language | {language}</span>
              <ChevronDownIcon />
            </button>
          </div>
        )}

        {/* ── Site identity row (desktop full-row, mobile bottom section) ─── */}
        <div
          className={cx(
            // Desktop: single row 33px tall, horizontal padding 32px
            'flex items-center justify-between',
            'h-[33px] px-8',
            // Mobile: auto height, padding 16px
            'max-[999px]:h-auto max-[999px]:px-4 max-[999px]:py-2'
          )}
        >
          {/* NYC logo + "Official website" text */}
          <div className="flex items-center gap-4 max-[999px]:gap-2">
            {/* Desktop logo */}
            <img
              src={NYC_LOGO_DESKTOP}
              alt="NYC"
              width={44}
              height={15}
              className="block max-[999px]:hidden shrink-0"
              style={{ width: '43.694px', height: '14.463px' }}
            />
            {/* Mobile logo */}
            <img
              src={NYC_LOGO_MOBILE}
              alt="NYC"
              width={30}
              height={10}
              className="hidden max-[999px]:block shrink-0"
              style={{ width: '30px', height: '10px' }}
            />
            <p className="text-[12px] leading-[1.4] font-normal text-[var(--color-neutral-900)] whitespace-nowrap max-[999px]:whitespace-normal">
              Official website of the City of New York
            </p>
          </div>

          {/* Desktop-only: translate toggle inline on the right */}
          {showTranslate && (
            <button
              type="button"
              onClick={onLanguageClick}
              aria-label={`Language: ${language}. Click to change language`}
              className={cx(
                'max-[999px]:hidden',
                'flex items-center gap-1 h-full px-2 py-1 rounded-[var(--border-radius-base)]',
                'text-[12px] leading-[1.4] font-normal text-[var(--color-neutral-900)]',
                '[@media(hover:hover)]:hover:underline [@media(hover:hover)]:hover:underline-offset-2',
                focusRing
              )}
            >
              <TranslateIcon />
              <span>Language | {language}</span>
              <ChevronDownIcon />
            </button>
          )}
        </div>
      </div>
    );
  }
);

GlobalNavigation.displayName = 'GlobalNavigation';
