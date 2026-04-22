import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

interface RatingRowProps {
  /** Numeric rating, 0–5. Will be formatted to one decimal. */
  value: number;
  /** Total number of reviews — formatted as "(1.2K)" style if large. */
  count?: number;
  size?: Size;
  /** "1.234 değerlendirme" full-text version after the number. */
  showCountLabel?: boolean;
  /** Editorial inline style (no background). */
  variant?: "inline" | "card";
  className?: string;
}

const SIZES: Record<Size, { star: string; value: string; count: string }> = {
  sm: { star: "h-3.5 w-3.5", value: "text-[12px]", count: "text-[11px]" },
  md: { star: "h-4 w-4", value: "text-[13.5px]", count: "text-[12px]" },
  lg: { star: "h-[18px] w-[18px]", value: "text-[15px]", count: "text-[13px]" },
};

function formatCount(n: number) {
  if (n < 1000) return n.toLocaleString("tr-TR");
  if (n < 10000) return `${(n / 1000).toFixed(1).replace(".", ",")} B`;
  return `${Math.round(n / 1000)} B`;
}

/**
 * RatingRow — gold filled star + value + review count.
 * Used on cards, detail headers, organizer rows. Restrained, editorial.
 */
export function RatingRow({
  value,
  count,
  size = "md",
  showCountLabel = false,
  variant = "inline",
  className,
}: RatingRowProps) {
  const sz = SIZES[size];
  const formatted = value.toFixed(1).replace(".", ",");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1",
        variant === "card" && "px-2 py-1 rounded-md bg-background/85 backdrop-blur border border-border/60",
        className,
      )}
    >
      <Star className={cn(sz.star, "fill-gold text-gold")} strokeWidth={1.5} />
      <span className={cn("font-semibold text-foreground", sz.value)}>{formatted}</span>
      {typeof count === "number" && count > 0 && (
        <span className={cn("text-muted-foreground", sz.count)}>
          {showCountLabel ? `· ${formatCount(count)} değerlendirme` : `(${formatCount(count)})`}
        </span>
      )}
    </span>
  );
}

export default RatingRow;