import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

interface VerifiedBadgeProps {
  /** Show "Doğrulanmış" label next to icon. */
  withLabel?: boolean;
  /** Custom Turkish label. */
  label?: string;
  size?: Size;
  /** Pill (chip-style) vs inline (icon + text only). */
  variant?: "pill" | "inline" | "icon";
  className?: string;
}

const SIZES: Record<Size, { icon: string; text: string; pill: string }> = {
  sm: { icon: "h-3.5 w-3.5", text: "text-[10.5px]", pill: "h-5 px-1.5 gap-1" },
  md: { icon: "h-4 w-4", text: "text-[11.5px]", pill: "h-6 px-2 gap-1" },
  lg: { icon: "h-[18px] w-[18px]", text: "text-[12.5px]", pill: "h-7 px-2.5 gap-1.5" },
};

/**
 * VerifiedBadge — JoinIstanbul trust marker. Always gold + filled BadgeCheck.
 * Three variants for different surfaces:
 *  - pill:   chip-style with background (organizer rows, profile)
 *  - inline: icon + text on transparent (titles)
 *  - icon:   icon only (compact list rows)
 */
export function VerifiedBadge({
  withLabel = true,
  label = "Doğrulanmış",
  size = "md",
  variant = "inline",
  className,
}: VerifiedBadgeProps) {
  const sz = SIZES[size];
  const showLabel = withLabel && variant !== "icon";

  if (variant === "pill") {
    return (
      <span
        title={label}
        className={cn(
          "inline-flex items-center rounded-full bg-gold-tint text-gold font-semibold tracking-[0.01em]",
          sz.pill,
          sz.text,
          className,
        )}
      >
        <BadgeCheck className={sz.icon} strokeWidth={2.25} />
        {showLabel && <span>{label}</span>}
      </span>
    );
  }

  return (
    <span
      title={label}
      className={cn(
        "inline-flex items-center gap-1 text-gold font-semibold tracking-[0.01em]",
        sz.text,
        className,
      )}
    >
      <BadgeCheck className={sz.icon} strokeWidth={2.25} />
      {showLabel && <span>{label}</span>}
    </span>
  );
}

export default VerifiedBadge;