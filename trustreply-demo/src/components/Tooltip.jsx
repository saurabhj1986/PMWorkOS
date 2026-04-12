import { useState } from "react";
import { Info } from "lucide-react";

/**
 * Tooltip with an info icon trigger. Hover or focus to reveal.
 * Usage: <Tooltip text="Explanation..." />
 */
export default function Tooltip({ text, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        aria-label="More info"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[var(--color-muted-text)] transition-colors hover:text-[var(--color-accent-blue)] focus:text-[var(--color-accent-blue)] focus:outline-none"
      >
        <Info className="h-4 w-4" strokeWidth={2} />
      </button>
      {open && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-lg bg-[var(--color-navy)] px-3 py-2 text-xs leading-snug text-white shadow-xl"
        >
          {text}
        </span>
      )}
    </span>
  );
}
