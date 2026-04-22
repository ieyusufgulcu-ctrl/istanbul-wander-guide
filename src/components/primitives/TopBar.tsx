import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  /** Centered title; usually the screen name. */
  title?: string;
  /** Small label above title, e.g. "Mahalle". */
  eyebrow?: string;
  /** Custom left content. If omitted and onBack is set, renders a back button. */
  left?: ReactNode;
  /** Right-side actions (icon buttons, etc). */
  right?: ReactNode;
  /** Back handler. Renders default chevron-left button. */
  onBack?: () => void;
  /** Visual variant. */
  variant?: "solid" | "transparent" | "blurred";
  /** Center large editorial title under the bar (used on top-level tabs). */
  largeTitle?: string;
  className?: string;
}

/**
 * TopBar
 * Maps to a React Native header — a fixed-height row with safe-area top padding.
 * Three visual variants cover most product needs:
 *  - solid:       opaque (detail screens with content scrolling beneath)
 *  - blurred:     translucent + backdrop blur (sticky over media)
 *  - transparent: floats over hero imagery
 */
export function TopBar({
  title,
  eyebrow,
  left,
  right,
  onBack,
  variant = "solid",
  largeTitle,
  className,
}: TopBarProps) {
  const showDefaultBack = !left && typeof onBack === "function";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 safe-top",
        variant === "solid" && "bg-background border-b border-border/60",
        variant === "blurred" && "bg-background/75 backdrop-blur-xl border-b border-border/40",
        variant === "transparent" && "bg-transparent",
        className,
      )}
    >
      <div className="h-12 px-3 flex items-center justify-between gap-2">
        <div className="flex items-center min-w-[44px]">
          {showDefaultBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Geri"
              className={cn(
                "h-11 w-11 -ml-1 rounded-full flex items-center justify-center transition-colors",
                variant === "transparent"
                  ? "bg-background/80 backdrop-blur text-foreground"
                  : "text-foreground hover:bg-muted/60 active:bg-muted",
              )}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
          ) : (
            left
          )}
        </div>

        <div className="flex-1 min-w-0 text-center">
          {eyebrow && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold leading-none">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className={cn(
              "text-[15px] font-semibold text-foreground truncate",
              eyebrow && "mt-0.5",
            )}>
              {title}
            </h2>
          )}
        </div>

        <div className="flex items-center justify-end gap-1 min-w-[44px]">
          {right}
        </div>
      </div>

      {largeTitle && (
        <div className="px-5 pt-2 pb-3">
          <h1 className="font-serif text-[28px] leading-[1.1] text-foreground text-balance">
            {largeTitle}
          </h1>
        </div>
      )}
    </header>
  );
}

export default TopBar;