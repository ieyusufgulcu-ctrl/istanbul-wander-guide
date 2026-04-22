import { Fragment, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MetaItem {
  /** Lucide icon — optional but recommended. */
  icon?: ReactNode;
  /** Short label — e.g. "Karaköy", "2 sa", "1–6 kişi". */
  label: string;
  /** Slightly emphasize this item (e.g. neighborhood). */
  emphasis?: boolean;
}

interface MetadataRowProps {
  items: MetaItem[];
  /** Visual density / size. */
  size?: "sm" | "md";
  /** Wrap to next line vs single-line truncation. */
  wrap?: boolean;
  /** Separator style between items. */
  separator?: "dot" | "pipe" | "none";
  className?: string;
}

const SIZES = {
  sm: { text: "text-[11.5px]", icon: "[&>svg]:h-3.5 [&>svg]:w-3.5", gap: "gap-1" },
  md: { text: "text-[12.5px]", icon: "[&>svg]:h-4 [&>svg]:w-4", gap: "gap-1.5" },
} as const;

/**
 * MetadataRow — horizontal rhythm of small facts under a card or detail title.
 * Consistent icon-text spacing + dot separator. Mobile-friendly truncation.
 */
export function MetadataRow({
  items,
  size = "md",
  wrap = false,
  separator = "dot",
  className,
}: MetadataRowProps) {
  const sz = SIZES[size];

  return (
    <div
      className={cn(
        "flex items-center text-muted-foreground",
        sz.text,
        wrap ? "flex-wrap gap-y-1" : "min-w-0",
        wrap ? "gap-x-2" : "gap-x-2",
        className,
      )}
    >
      {items.map((item, i) => (
        <Fragment key={`${item.label}-${i}`}>
          {i > 0 && separator !== "none" && (
            <span aria-hidden className="text-muted-foreground/50 shrink-0">
              {separator === "dot" ? "·" : "|"}
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center min-w-0",
              sz.gap,
              sz.icon,
              !wrap && "truncate",
              item.emphasis && "text-foreground font-medium",
            )}
          >
            {item.icon}
            <span className={cn(!wrap && "truncate")}>{item.label}</span>
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export default MetadataRow;