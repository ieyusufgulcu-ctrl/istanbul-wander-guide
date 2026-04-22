import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "ghost" | "solid" | "glass" | "gold";
type Size = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon element. */
  icon: ReactNode;
  /** Required for accessibility — Turkish label. */
  label: string;
  variant?: Variant;
  size?: Size;
  /** Persistent active visual (e.g. saved). */
  active?: boolean;
  /** Small dot in the corner — useful for unread/notif. */
  badged?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  ghost: "bg-transparent text-foreground hover:bg-muted/60 active:bg-muted",
  solid: "bg-surface-warm text-foreground border border-border/60 active:bg-muted",
  glass:
    "bg-background/75 backdrop-blur-md text-foreground border border-border/40 active:bg-background",
  gold: "bg-gold-tint text-gold border border-gold/25 active:bg-gold/15",
};

const SIZES: Record<Size, { box: string; icon: string }> = {
  sm: { box: "h-9 w-9", icon: "[&>svg]:h-[18px] [&>svg]:w-[18px]" },
  md: { box: "h-11 w-11", icon: "[&>svg]:h-[20px] [&>svg]:w-[20px]" },
  lg: { box: "h-12 w-12", icon: "[&>svg]:h-[22px] [&>svg]:w-[22px]" },
};

/**
 * IconButton — circular tap target. Min hit area honored even at sm via padding.
 * Use for header actions, save/share, bottom sheet close, etc.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = "ghost", size = "md", active = false, badged = false, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      aria-pressed={active || undefined}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        "transition-all duration-200 active:scale-[0.94]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
        "disabled:opacity-50 disabled:active:scale-100",
        VARIANTS[variant],
        SIZES[size].box,
        SIZES[size].icon,
        active && "text-gold",
        className,
      )}
      {...rest}
    >
      {icon}
      {badged && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gold ring-2 ring-background" />
      )}
    </button>
  );
});

export default IconButton;