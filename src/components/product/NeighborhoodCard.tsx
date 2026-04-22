import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NeighborhoodCardProps {
  name: string;
  tagline: string;
  experienceCount: number;
  imageUrl: string;
  onPress?: () => void;
  className?: string;
}

/**
 * NeighborhoodCard — compact spotlight tile for an Istanbul neighborhood.
 * Used inside a HorizontalScroller on the Home screen.
 */
export function NeighborhoodCard({
  name,
  tagline,
  experienceCount,
  imageUrl,
  onPress,
  className,
}: NeighborhoodCardProps) {
  const Comp = onPress ? "button" : "div";
  return (
    <Comp
      type={onPress ? "button" : undefined}
      onClick={onPress}
      className={cn(
        "relative w-[180px] h-[230px] text-left rounded-2xl overflow-hidden bg-muted",
        "transition-transform active:scale-[0.99]",
        className,
      )}
    >
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-navy/0" />

      <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/85 backdrop-blur-md flex items-center justify-center text-foreground">
        <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <h3 className="font-serif text-[19px] leading-[1.1] text-primary-foreground">
          {name}
        </h3>
        <p className="mt-1 text-[11.5px] leading-snug text-primary-foreground/85 line-clamp-2">
          {tagline}
        </p>
        <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.16em] text-gold-soft font-semibold">
          {experienceCount} deneyim
        </p>
      </div>
    </Comp>
  );
}

export default NeighborhoodCard;