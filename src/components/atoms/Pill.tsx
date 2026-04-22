import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state (e.g. active filter tab). */
  selected?: boolean;
  /** Optional leading icon — keep small. */
  icon?: ReactNode;
  /** Optional small count appended to the label. */
  count?: number;
  /** Compact density. */
  size?: "sm" | "md";
}

/**
 * Pill — single-select navigational chip. Used for category tabs, time ranges,
 * neighborhood filters at the top of feeds. Bigger and more confident than Chip.
 */
export const Pill = forwardRef<HTMLButtonElement, PillProps>(function Pill(
  { selected = false, icon, count, size = "md", className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border whitespace-nowrap",
        "font-medium transition-all duration-200 active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
        size === "md" ? "h-10 px-4 text-[13.5px]" : "h-8 px-3 text-[12.5px]",
        selected
          ? "bg-primary text-primary-foreground border-primary shadow-soft"
          : "bg-background text-foreground border-border hover:bg-muted/50 active:bg-muted",
        className,
      )}
      {...rest}
    >
      {icon && (
        <span className={cn("flex items-center", size === "md" ? "[&>svg]:h-4 [&>svg]:w-4" : "[&>svg]:h-3.5 [&>svg]:w-3.5")}>
          {icon}
        </span>
      )}
      <span>{children}</span>
      {typeof count === "number" && (
        <span
          className={cn(
            "ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full text-[10.5px] font-semibold",
            selected ? "bg-primary-foreground/15 text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
});

export default Pill;