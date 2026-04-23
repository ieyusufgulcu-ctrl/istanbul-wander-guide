import { cn } from "@/lib/utils";

/**
 * Premium, calm shimmer skeletons composed only from primitives.
 * Tuned to mirror the real card silhouettes so first paint feels stable.
 */

function Block({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-muted/70",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-background/55 before:to-transparent",
        "before:animate-[shimmer_1.6s_ease-in-out_infinite]",
        className,
      )}
    />
  );
}

/** Editorial hero card shape used at the top of Home. */
export function EditorialCardSkeleton() {
  return (
    <div className="rounded-[1.5rem] overflow-hidden bg-background shadow-sm border border-border/50">
      <Block className="aspect-[4/5] rounded-none" />
      <div className="px-4 pt-4 pb-5 space-y-3">
        <Block className="h-3 w-24" />
        <Block className="h-5 w-3/4" />
        <Block className="h-3 w-2/3" />
        <div className="pt-2 flex items-center justify-between">
          <Block className="h-8 w-32 rounded-full" />
          <Block className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

/** Horizontal rail card silhouette (260px wide). */
export function RailCardSkeleton() {
  return (
    <div className="w-[260px] shrink-0">
      <Block className="aspect-[4/5] rounded-2xl" />
      <div className="pt-3 px-1 space-y-2">
        <Block className="h-4 w-3/4" />
        <Block className="h-3 w-1/2" />
      </div>
    </div>
  );
}

/** Horizontal scroller of rail cards. */
export function RailSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <RailCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** List row silhouette — matches ExperienceCard variant="list". */
export function ListRowSkeleton() {
  return (
    <div className="flex gap-3.5 p-2">
      <Block className="h-[104px] w-[104px] shrink-0 rounded-xl" />
      <div className="flex-1 min-w-0 py-1 space-y-2">
        <Block className="h-3 w-20" />
        <Block className="h-4 w-5/6" />
        <Block className="h-3 w-2/3" />
        <div className="pt-2 flex items-center justify-between">
          <Block className="h-3 w-24" />
          <Block className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <ul className="flex flex-col">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="py-3 border-b border-border/40 last:border-b-0">
          <ListRowSkeleton />
        </li>
      ))}
    </ul>
  );
}

/** Bookings card silhouette — matches the upcoming card shape. */
export function BookingCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border/60 shadow-sm overflow-hidden">
      <div className="flex gap-3.5 p-3">
        <Block className="h-[88px] w-[88px] shrink-0 rounded-xl" />
        <div className="flex-1 min-w-0 py-1 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <Block className="h-3 w-20" />
            <Block className="h-5 w-20 rounded-full" />
          </div>
          <Block className="h-4 w-5/6" />
          <Block className="h-3 w-2/3" />
        </div>
      </div>
      <div className="border-t border-border/60 px-3 py-2.5 flex items-center justify-between bg-surface-warm/50">
        <Block className="h-3 w-24" />
        <Block className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function BookingsListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <BookingCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Experience detail hero + content silhouette. */
export function DetailHeroSkeleton() {
  return (
    <div className="flex flex-col">
      <Block className="aspect-[4/5] w-full rounded-none" />
      <div className="px-5 pt-5 space-y-3">
        <Block className="h-3 w-24" />
        <Block className="h-6 w-5/6" />
        <Block className="h-3 w-2/3" />
        <div className="pt-3 flex items-center gap-3">
          <Block className="h-3 w-20" />
          <Block className="h-3 w-16" />
        </div>
        <div className="pt-4 grid grid-cols-2 gap-3">
          <Block className="h-16 rounded-2xl" />
          <Block className="h-16 rounded-2xl" />
          <Block className="h-16 rounded-2xl" />
          <Block className="h-16 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}