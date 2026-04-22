import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickyBottomCTAProps {
  /** Optional left-side info block (e.g. price, total). */
  info?: ReactNode;
  /** Primary action(s). */
  children: ReactNode;
  /** Renders a soft top fade so content scrolls cleanly behind. */
  withFade?: boolean;
  className?: string;
}

/**
 * StickyBottomCTA
 * Anchored action bar that sits above the bottom tab bar / safe area.
 * In RN this maps to an absolutely positioned View pinned to the bottom inset.
 *
 * Pair with <Screen bottomCTA={...}> so the screen reserves space.
 */
export function StickyBottomCTA({
  info,
  children,
  withFade = true,
  className,
}: StickyBottomCTAProps) {
  return (
    <div className={cn("sticky bottom-0 left-0 right-0 z-20", className)}>
      {withFade && (
        <div
          aria-hidden
          className="pointer-events-none h-6 bg-gradient-to-t from-background to-transparent"
        />
      )}
      <div className="bg-background/95 backdrop-blur-xl border-t border-border/60 px-5 pt-3 pb-3 safe-bottom">
        <div className="flex items-center gap-3">
          {info && (
            <div className="flex-1 min-w-0">{info}</div>
          )}
          <div className={cn("flex items-center gap-2", !info && "flex-1")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyBottomCTA;