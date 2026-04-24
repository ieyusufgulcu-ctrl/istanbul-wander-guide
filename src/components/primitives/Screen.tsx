import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ScreenProps {
  children: ReactNode;
  /** Render a sticky element at the top of the screen (e.g. <TopBar />). */
  topBar?: ReactNode;
  /** Render a sticky element at the bottom (e.g. <StickyBottomCTA />). */
  bottomCTA?: ReactNode;
  /** Background tone of the scrollable area. */
  tone?: "default" | "warm" | "navy";
  /** Apply default horizontal padding (px-5). Disable for edge-to-edge media. */
  padded?: boolean;
  /** Apply safe-area padding to the top of the scroll content. */
  safeTop?: boolean;
  className?: string;
  /** Class for the inner scroll content wrapper. */
  contentClassName?: string;
}

const TONES: Record<NonNullable<ScreenProps["tone"]>, string> = {
  default: "bg-background text-foreground",
  warm: "bg-surface-warm text-foreground",
  navy: "bg-navy text-primary-foreground",
};

/**
 * Screen
 * The single root every tab/stack screen mounts inside.
 * Maps to: <SafeAreaView><ScrollView /></SafeAreaView> in React Native.
 *
 * - Owns vertical scroll
 * - Reserves space for an optional StickyBottomCTA so content never hides under it
 * - Applies safe-area top padding by default
 */
export const Screen = forwardRef<HTMLElement, ScreenProps>(function Screen(
  {
    children,
    topBar,
    bottomCTA,
    tone = "default",
    padded = true,
    safeTop = true,
    className,
    contentClassName,
  },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn(
        "relative flex flex-col min-h-full",
        TONES[tone],
        className,
      )}
    >
      {topBar}
      <div
        className={cn(
          "flex-1 min-h-0 flex flex-col",
          safeTop && !topBar && "safe-top",
          padded && "px-5",
          // Reserve room above sticky CTA so last item isn't covered.
          bottomCTA ? "pb-[112px]" : "pb-8",
          contentClassName,
        )}
      >
        {children}
      </div>
      {bottomCTA}
    </section>
  );
});

export default Screen;