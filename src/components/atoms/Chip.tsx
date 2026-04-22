import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Multi-select / toggleable state. */
  selected?: boolean;
  /** Renders as a removable chip (filter applied). */
  removable?: boolean;
  /** Called when remove is tapped (only when removable=true). */
  onRemove?: () => void;
  /** Optional leading icon — keep tiny. */
  icon?: ReactNode;
}

/**
 * Chip — compact, multi-select toggle. Use for filter sheet options,
 * vibe tags, neighborhood multi-pick. Smaller + lighter than Pill.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { selected = false, removable = false, onRemove, icon, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 h-8 pl-3 pr-3 rounded-full border whitespace-nowrap",
        "text-[12.5px] font-medium transition-all duration-200 active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
        selected
          ? "bg-gold-tint text-primary border-gold/40"
          : "bg-background text-foreground border-border/80 hover:bg-muted/40",
        removable && "pr-1.5",
        className,
      )}
      {...rest}
    >
      {icon && <span className="flex items-center [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>}
      <span>{children}</span>
      {removable && (
        <span
          role="button"
          tabIndex={-1}
          aria-label="Kaldır"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={cn(
            "ml-0.5 inline-flex items-center justify-center h-5 w-5 rounded-full",
            selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
            "active:scale-90 transition-transform",
          )}
        >
          <X className="h-3 w-3" strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
});

export default Chip;