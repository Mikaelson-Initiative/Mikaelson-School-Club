/**
 * Shared Tailwind class string constants.
 * These replace the old @layer components / @apply definitions from globals.css.
 * Import what you need in each component file.
 */

// ── Layout ──────────────────────────────────────────────────────────
/** Max-width content wrapper */
export const WRAP =
  'max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4';

/** Standard section vertical padding */
export const SEC = 'relative py-[92px] max-md:py-[72px] max-sm:py-[56px]';

/** Section header max-width */
export const SEC_HEAD = 'max-w-[720px]';

// ── Typography ───────────────────────────────────────────────────────
/** Display / heading style */
export const DISPLAY =
  'font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0';

/** Small mono label with teal dash prefix */
export const LABEL =
  'label-dash font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase ' +
  'inline-flex items-center';

/** Label without the dash prefix */
export const LABEL_NODASH =
  'font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase ' +
  'inline-flex items-center gap-2';

/** Muted text colour */
export const MUTED = 'text-muted';

// ── Buttons ──────────────────────────────────────────────────────────
/** Base button styles */
export const BTN =
  'font-body font-semibold text-[15px] border-none rounded-full px-[26px] py-[14px] ' +
  'cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap ' +
  'transition-[transform,box-shadow,background,color] duration-200';

/** Teal / primary CTA button */
export const BTN_PRIMARY =
  BTN +
  ' bg-accent-2 text-accent-ink font-bold ' +
  'shadow-[0_12px_0_-2px_var(--accent-ink)] ' +
  'hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)]';

/** Larger teal button (used in hero/CTA bands) */
export const BTN_TURQUOISE =
  BTN +
  ' bg-accent-2 text-accent-ink font-bold text-[16px] px-8 py-4 ' +
  'shadow-[0_12px_0_-2px_var(--accent-ink)] ' +
  'hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)]';

/** Ghost / outline button */
export const BTN_GHOST =
  BTN +
  ' bg-transparent text-site-text border-[1.5px] border-line ' +
  'hover:border-accent hover:text-accent-ink hover:-translate-y-[2px]';

/** Small mono link with arrow */
export const LINK_ARROW =
  'font-mono text-accent-ink text-[12.5px] tracking-[0.06em] uppercase ' +
  'no-underline inline-flex items-center gap-[7px] font-bold';

// ── Cards ────────────────────────────────────────────────────────────
/** Standard card */
export const CARD =
  'bg-surface border border-line rounded-[22px] p-8 relative overflow-hidden ' +
  'transition-[transform,box-shadow,border-color] duration-300 ' +
  'hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-34px_rgba(0,0,0,.4)] ' +
  'hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))]';

/** Icon bubble inside a card */
export const CARD_ICO =
  'bg-accent-soft text-accent-ink w-[52px] h-[52px] grid place-items-center mb-[22px] rounded-[13px]';

// ── CTA Band ─────────────────────────────────────────────────────────
export const CTA_BAND =
  'bg-[var(--surface-2)] border border-line rounded-[22px] text-center relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10 xs:px-[18px] xs:py-8';
