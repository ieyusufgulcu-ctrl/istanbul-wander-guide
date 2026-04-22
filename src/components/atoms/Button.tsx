import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "secondary" | "ghost" | "outline" | "destructive";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Full-width — typical inside StickyBottomCTA. */
  block?: boolean;
  /** Show loading spinner; disables interaction. */
  loading?: boolean;
  /** Leading icon (lucide). */
  leading?: ReactNode;
  /** Trailing icon. */
  trailing?: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:bg-primary/95 active:bg-primary/90",
  gold:
    "bg-gradient-gold text-primary-foreground shadow-soft hover:brightness-[1.04] active:brightness-95",
  secondary:
    "bg-surface-warm text-foreground border border-border/70 hover:bg-muted/70 active:bg-muted",
  ghost:
    "bg-transparent text-foreground hover:bg-muted/60 active:bg-muted",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-muted/40 active:bg-muted/70",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/95 active:bg-destructive/90",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5 rounded-full",
  md: "h-11 px-5 text-[14px] gap-2 rounded-full",
  lg: "h-12 px-6 text-[15px] gap-2 rounded-full",
  xl: "h-14 px-7 text-[16px] gap-2.5 rounded-2xl",
};

/**
 * Button — primary action atom. Premium pill geometry with serif-friendly weight.
 * Maps to React Native Pressable.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    block = false,
    loading = false,
    leading,
    trailing,
    disabled,
    className,
    children,
    type = "button",
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center font-semibold tracking-[0.005em]",
        "transition-all duration-200 select-none",
        "active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        VARIANTS[variant],
        SIZES[size],
        block && "w-full",
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        leading && <span className="flex items-center [&>svg]:h-4 [&>svg]:w-4">{leading}</span>
      )}
      <span className="truncate">{children}</span>
      {trailing && !loading && (
        <span className="flex items-center [&>svg]:h-4 [&>svg]:w-4">{trailing}</span>
      )}
    </button>
  );
});

export default Button;