import { useState } from "react";
import { cn } from "@/lib/utils";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  /** Image URL — falls back to initials if missing or fails to load. */
  src?: string;
  /** Full name — drives initials + alt text. */
  name: string;
  size?: Size;
  /** Renders a soft gold ring (e.g. verified organizer feel). */
  ring?: boolean;
  /** Shape. */
  shape?: "circle" | "square";
  className?: string;
}

const SIZES: Record<Size, { box: string; text: string; ring: string }> = {
  xs: { box: "h-6 w-6", text: "text-[10px]", ring: "ring-1" },
  sm: { box: "h-8 w-8", text: "text-[11.5px]", ring: "ring-1" },
  md: { box: "h-10 w-10", text: "text-[13px]", ring: "ring-2" },
  lg: { box: "h-12 w-12", text: "text-[14px]", ring: "ring-2" },
  xl: { box: "h-16 w-16", text: "text-[18px]", ring: "ring-[3px]" },
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Avatar — organizer / user image with graceful fallback to initials.
 * Premium muted background, never bright color blocks.
 */
export function Avatar({
  src,
  name,
  size = "md",
  ring = false,
  shape = "circle",
  className,
}: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImg = src && !errored;
  const sz = SIZES[size];

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden bg-surface-warm text-foreground/80 font-semibold shrink-0",
        shape === "circle" ? "rounded-full" : "rounded-xl",
        sz.box,
        sz.text,
        ring && cn(sz.ring, "ring-gold/60 ring-offset-2 ring-offset-background"),
        className,
      )}
    >
      {showImg ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-label={name}>{getInitials(name)}</span>
      )}
    </span>
  );
}

export default Avatar;