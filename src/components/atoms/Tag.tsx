import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "gold" | "navy" | "media";

interface TagProps {
  children: ReactNode;
  tone?: Tone;
  /** Optional small icon — keep minimal. */
  icon?: ReactNode;
  className?: string;
}

const TONES: Record<Tone, string> = {
  neutral: "bg-background/85 backdrop-blur text-foreground border border-border/60",
  gold: "bg-gold text-primary-foreground",
  navy: "bg-navy/85 backdrop-blur text-primary-foreground",
  media:
    "bg-navy/55 backdrop-blur-md text-primary-foreground border border-primary-foreground/15",
};

/**
 * Tag — squarer label used over media (cards) and inside lists for category /
 * neighborhood. Distinct from Badge: more editorial, less status-y.
 */
export function Tag({ children, tone = "neutral", icon, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 h-6 px-2 rounded-md text-[11px] font-semibold tracking-[0.02em]",
        TONES[tone],
        className,
      )}
    >
      {icon && <span className="flex items-center [&>svg]:h-3 [&>svg]:w-3">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export default Tag;