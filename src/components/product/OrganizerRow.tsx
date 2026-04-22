import { ChevronRight } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { VerifiedBadge } from "@/components/atoms/VerifiedBadge";
import { Organizer } from "@/data/types";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

interface OrganizerRowProps {
  organizer: Organizer;
  /** Override role/subtitle; falls back to organizer.role. */
  subtitle?: string;
  size?: Size;
  /** Show chevron on right (tappable row → organizer profile). */
  withChevron?: boolean;
  /** Make the entire row interactive. */
  onClick?: () => void;
  /** Right-side slot (e.g. "Mesaj at" button). */
  trailing?: React.ReactNode;
  className?: string;
}

const SIZES: Record<Size, { avatar: "sm" | "md" | "lg"; name: string; sub: string; gap: string }> = {
  sm: { avatar: "sm", name: "text-[13px]", sub: "text-[11.5px]", gap: "gap-2.5" },
  md: { avatar: "md", name: "text-[14.5px]", sub: "text-[12px]", gap: "gap-3" },
  lg: { avatar: "lg", name: "text-[16px]", sub: "text-[13px]", gap: "gap-3.5" },
};

/**
 * OrganizerRow — compact, premium row showing the human behind an experience.
 * Use under detail headers, in profile lists, in messages.
 */
export function OrganizerRow({
  organizer,
  subtitle,
  size = "md",
  withChevron = false,
  onClick,
  trailing,
  className,
}: OrganizerRowProps) {
  const sz = SIZES[size];
  const sub = subtitle ?? organizer.role;
  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "w-full flex items-center text-left",
        sz.gap,
        onClick && "active:opacity-80 transition-opacity",
        className,
      )}
    >
      <Avatar
        src={organizer.avatarUrl}
        name={organizer.name}
        size={sz.avatar}
        ring={organizer.verified}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={cn("font-semibold text-foreground truncate", sz.name)}>
            {organizer.name}
          </span>
          {organizer.verified && (
            <VerifiedBadge variant="icon" size={size === "lg" ? "md" : "sm"} />
          )}
        </div>
        {sub && (
          <p className={cn("text-muted-foreground truncate mt-0.5", sz.sub)}>
            {sub}
          </p>
        )}
      </div>

      {trailing}
      {withChevron && !trailing && (
        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={2} />
      )}
    </Comp>
  );
}

export default OrganizerRow;