import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "gold" | "navy" | "success" | "warning" | "danger" | "soft";

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  /** Show small leading dot (status). */
  dot?: boolean;
  /** Slight icon slot before label. */
  icon?: ReactNode;
  /** Compact uppercase eyebrow style (editorial). */
  eyebrow?: boolean;
  className?: string;
}

const TONES: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  gold: "bg-gold-tint text-gold",
  navy: "bg-navy text-primary-foreground",
  success: "bg-success/12 text-success",
  warning: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  danger: "bg-destructive/12 text-destructive",
  soft: "bg-surface-warm text-foreground border border-border/60",
};

const DOT_TONES: Record<Tone, string> = {
  neutral: "bg-muted-foreground",
  gold: "bg-gold",
  navy: "bg-gold",
  success: "bg-success",
  warning: "bg-amber-500",
  danger: "bg-destructive",
  soft: "bg-foreground/60",
};

/**
 * Badge — small status / category label. Non-interactive.
 * Use for "Doğrulanmış", "Yeni", "Satışta", duration tags on cards.
 */
export function Badge({
  children,
  tone = "neutral",
  dot = false,
  icon,
  eyebrow = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full",
        eyebrow
          ? "h-5 px-2 text-[10px] tracking-[0.16em] uppercase font-bold"
          : "h-6 px-2.5 text-[11.5px] font-semibold tracking-[0.01em]",
        TONES[tone],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", DOT_TONES[tone])} />}
      {icon && <span className="flex items-center [&>svg]:h-3 [&>svg]:w-3">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export default Badge;