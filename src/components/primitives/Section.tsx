import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  /** Editorial section title (serif). */
  title?: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  /** Supporting one-line description. */
  description?: string;
  /** Optional "Tümünü gör" style action on the right of the header. */
  action?: {
    label: string;
    onClick?: () => void;
  };
  /** Render header in a smaller, denser variant for nested groupings. */
  compact?: boolean;
  /** Remove top spacing (first section in a screen). */
  flushTop?: boolean;
  /** Allow the body to escape horizontal padding (e.g. a HorizontalScroller).
   *  Pair with a parent that provides the original padding. */
  bleed?: boolean;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Section
 * Establishes the editorial rhythm between content groups across screens.
 * Provides a consistent header (eyebrow / title / action) + body slot.
 */
export function Section({
  title,
  eyebrow,
  description,
  action,
  compact = false,
  flushTop = false,
  bleed = false,
  children,
  className,
  contentClassName,
}: SectionProps) {
  const hasHeader = title || eyebrow || description || action;

  return (
    <section className={cn(flushTop ? "mt-0" : "mt-8", className)}>
      {hasHeader && (
        <header
          className={cn(
            "flex items-end justify-between gap-3",
            compact ? "mb-3" : "mb-4",
          )}
        >
          <div className="min-w-0 flex-1">
            {eyebrow && (
              <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "font-serif text-foreground leading-tight",
                  compact ? "text-[18px]" : "text-[22px]",
                  eyebrow && "mt-1",
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="shrink-0 inline-flex items-center gap-0.5 text-[12.5px] font-semibold text-primary py-1 -mr-1 active:opacity-70 transition-opacity"
            >
              {action.label}
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </header>
      )}

      <div className={cn(bleed && "-mx-5", contentClassName)}>{children}</div>
    </section>
  );
}

export default Section;