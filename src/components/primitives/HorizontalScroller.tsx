import { Children, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HorizontalScrollerProps {
  children: ReactNode;
  /** Gap between items (Tailwind gap utility). */
  gap?: "sm" | "md" | "lg";
  /** Inner side padding (matches Screen px-5 by default for edge alignment). */
  edgePadding?: "none" | "sm" | "md";
  /** Apply snap-to-start behavior on each item. */
  snap?: boolean;
  className?: string;
}

const GAPS = { sm: "gap-2", md: "gap-3", lg: "gap-4" } as const;
const EDGES = { none: "px-0", sm: "px-3", md: "px-5" } as const;

/**
 * HorizontalScroller
 * Edge-bleeding horizontal scroll rail. Matches the FlatList/ScrollView
 * horizontal pattern in React Native. Always pair with `<Section bleed>` so
 * cards can slide off the screen edge cleanly.
 */
export function HorizontalScroller({
  children,
  gap = "md",
  edgePadding = "md",
  snap = true,
  className,
}: HorizontalScrollerProps) {
  const items = Children.toArray(children);

  return (
    <div
      className={cn(
        "flex overflow-x-auto overscroll-x-contain no-scrollbar",
        snap && "snap-x snap-mandatory",
        GAPS[gap],
        EDGES[edgePadding],
        className,
      )}
    >
      {items.map((child, i) => (
        <div
          key={i}
          className={cn("shrink-0", snap && "snap-start")}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export default HorizontalScroller;