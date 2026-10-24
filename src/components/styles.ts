// Shared Tailwind class strings, so buttons and cards look the same everywhere.

const buttonBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition";

// Accent button. Hover darkens it slightly.
export const buttonPrimary = `${buttonBase} bg-accent text-accent-foreground hover:brightness-90`;

// Outline button.
export const buttonOutline = `${buttonBase} border border-border bg-background text-foreground hover:bg-surface hover:brightness-95`;

// Card: 12px radius, 1px border, surface background, lifts on hover (not with reduced motion).
export const card =
  "rounded-xl border border-border bg-surface transition duration-200 hover:shadow-md hover:shadow-black/5 motion-safe:hover:-translate-y-1";

// Small rounded label, used for tech stack and skills.
export const chip =
  "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-sm";

// Icon-only link (GitHub, LinkedIn, ...).
export const iconLink =
  "inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground";
