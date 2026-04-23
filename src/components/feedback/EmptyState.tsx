import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

interface EmptyStateProps {
  /** Lucide icon node (sized by us). */
  icon: ReactNode;
  title: string;
  description?: string;
  /** Optional action — e.g. "Keşfet" / "Filtreleri sıfırla". */
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  /** When true, render inside a soft warm card. */
  framed?: boolean;
}

/**
 * EmptyState — calm, editorial empty / no-results surface.
 * Used across Bookings, Search, Profile (saved, stamps).
 */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  framed = false,
}: EmptyStateProps) {
  const content = (
    <div className="flex flex-col items-center text-center px-4 py-10">
      <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-tint text-gold [&>svg]:h-6 [&>svg]:w-6">
        {icon}
      </span>
      <p className="font-serif text-[18px] leading-tight text-foreground text-balance">
        {title}
      </p>
      {description && (
        <p className="mt-1.5 max-w-[280px] text-[13px] leading-relaxed text-muted-foreground text-balance">
          {description}
        </p>
      )}
      {actionLabel && (
        <Button
          variant="primary"
          size="md"
          onClick={onAction}
          className="mt-5"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );

  if (framed) {
    return (
      <div
        className={cn(
          "rounded-3xl border border-border/60 bg-surface-warm",
          className,
        )}
      >
        {content}
      </div>
    );
  }
  return <div className={className}>{content}</div>;
}

export default EmptyState;