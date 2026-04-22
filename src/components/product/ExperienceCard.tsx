import { useState } from "react";
import { Clock, Heart, MapPin, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Experience } from "@/data/types";
import { formatDuration, FLAG_LABEL } from "@/lib/format";
import { Avatar } from "@/components/atoms/Avatar";
import { IconButton } from "@/components/atoms/IconButton";
import { MetadataRow } from "@/components/atoms/MetadataRow";
import { PriceBlock } from "@/components/atoms/PriceBlock";
import { RatingRow } from "@/components/atoms/RatingRow";
import { Tag } from "@/components/atoms/Tag";
import { VerifiedBadge } from "@/components/atoms/VerifiedBadge";

type Variant = "editorial" | "rail" | "list";

interface ExperienceCardProps {
  experience: Experience;
  variant?: Variant;
  /** Tap handler — whole card. */
  onPress?: () => void;
  /** Controlled saved state. */
  saved?: boolean;
  onToggleSave?: (next: boolean) => void;
  className?: string;
}

/**
 * ExperienceCard — the atomic unit of discovery across the app.
 *
 *   editorial → full-width hero card on Home / collections
 *   rail      → compact vertical card for horizontal scrollers
 *   list      → horizontal row for search results / saved lists
 *
 * Maps cleanly to a Pressable-wrapped View in React Native.
 */
export function ExperienceCard({
  experience,
  variant = "editorial",
  onPress,
  saved: savedProp,
  onToggleSave,
  className,
}: ExperienceCardProps) {
  const [internalSaved, setInternalSaved] = useState(false);
  const saved = savedProp ?? internalSaved;

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !saved;
    if (onToggleSave) onToggleSave(next);
    else setInternalSaved(next);
  };

  const Comp = onPress ? "button" : "div";
  const interactiveProps = onPress
    ? { type: "button" as const, onClick: onPress }
    : {};

  if (variant === "list") {
    return (
      <Comp
        {...interactiveProps}
        className={cn(
          "w-full text-left flex gap-3.5 p-2 -mx-2 rounded-2xl",
          "transition-colors active:bg-muted/50",
          className,
        )}
      >
        <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-muted">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {experience.flags?.[0] && (
            <Tag tone="media" className="absolute top-1.5 left-1.5">
              {FLAG_LABEL[experience.flags[0]]}
            </Tag>
          )}
        </div>

        <div className="flex-1 min-w-0 py-0.5 flex flex-col">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] uppercase tracking-[0.16em] text-gold font-semibold">
                {experience.neighborhood}
              </p>
              <h3 className="font-serif text-[15.5px] leading-[1.18] text-foreground mt-0.5 line-clamp-2">
                {experience.title}
              </h3>
            </div>
            <IconButton
              icon={<Heart className={saved ? "fill-current" : ""} />}
              label={saved ? "Kaydedildi" : "Kaydet"}
              variant="ghost"
              size="sm"
              active={saved}
              onClick={handleSave}
            />
          </div>

          <div className="mt-1.5 flex items-center gap-2 min-w-0">
            <RatingRow value={experience.rating} count={experience.reviewCount} size="sm" />
            <span className="text-muted-foreground/50 text-[11px]">·</span>
            <span className="text-[11.5px] text-muted-foreground truncate">
              {formatDuration(experience.durationMinutes)}
            </span>
          </div>

          <div className="mt-auto pt-2 flex items-end justify-between gap-2">
            <span className="text-[11.5px] text-muted-foreground truncate">
              {experience.organizer.name}
            </span>
            <PriceBlock amount={experience.price} perLabel="kişi başı" size="sm" align="right" />
          </div>
        </div>
      </Comp>
    );
  }

  if (variant === "rail") {
    return (
      <Comp
        {...interactiveProps}
        className={cn(
          "w-[260px] text-left rounded-2xl overflow-hidden bg-background",
          "transition-transform active:scale-[0.99]",
          className,
        )}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-navy/0" />

          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              <Tag tone="media" icon={<MapPin />}>
                {experience.neighborhood}
              </Tag>
              {experience.flags?.includes("editor") && (
                <Tag tone="gold" icon={<Sparkles />}>Editör</Tag>
              )}
            </div>
            <IconButton
              icon={<Heart className={saved ? "fill-current" : ""} />}
              label={saved ? "Kaydedildi" : "Kaydet"}
              variant="glass"
              size="sm"
              active={saved}
              onClick={handleSave}
            />
          </div>

          <div className="absolute bottom-2.5 left-2.5">
            <RatingRow value={experience.rating} count={experience.reviewCount} size="sm" variant="card" />
          </div>
        </div>

        <div className="pt-3 pb-1 px-1">
          <h3 className="font-serif text-[16px] leading-[1.2] text-foreground line-clamp-2">
            {experience.title}
          </h3>

          <MetadataRow
            className="mt-1.5"
            size="sm"
            items={[
              { icon: <Clock />, label: formatDuration(experience.durationMinutes) },
              { icon: <Users />, label: experience.groupSize },
            ]}
          />

          <div className="mt-2.5 flex items-end justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Avatar
                src={experience.organizer.avatarUrl}
                name={experience.organizer.name}
                size="xs"
              />
              <span className="text-[11.5px] text-muted-foreground truncate">
                {experience.organizer.name}
              </span>
              {experience.organizer.verified && (
                <VerifiedBadge variant="icon" size="sm" />
              )}
            </div>
            <PriceBlock amount={experience.price} size="sm" align="right" />
          </div>
        </div>
      </Comp>
    );
  }

  // editorial (default)
  return (
    <Comp
      {...interactiveProps}
      className={cn(
        "w-full text-left rounded-[1.5rem] overflow-hidden bg-background shadow-elevated",
        "transition-transform active:scale-[0.995]",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" />

        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Tag tone="media" icon={<MapPin />}>
              {experience.neighborhood}
            </Tag>
            {experience.flags?.includes("editor") && (
              <Tag tone="gold" icon={<Sparkles />}>Editör Seçimi</Tag>
            )}
            {experience.flags?.includes("new") && <Tag tone="navy">Yeni</Tag>}
          </div>
          <IconButton
            icon={<Heart className={saved ? "fill-current" : ""} />}
            label={saved ? "Kaydedildi" : "Kaydet"}
            variant="glass"
            size="md"
            active={saved}
            onClick={handleSave}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          {experience.tagline && (
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold mb-1.5">
              {experience.tagline.length > 0 ? FLAG_LABEL.editor && (experience.flags?.includes("editor") ? "Editör Seçimi" : experience.neighborhood) : ""}
            </p>
          )}
          <h3 className="font-serif text-[22px] leading-[1.12] text-primary-foreground text-balance">
            {experience.title}
          </h3>
          {experience.tagline && (
            <p className="mt-1.5 text-[13px] leading-snug text-primary-foreground/85 line-clamp-2">
              {experience.tagline}
            </p>
          )}
        </div>
      </div>

      <div className="px-4 pt-3.5 pb-4">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar
            src={experience.organizer.avatarUrl}
            name={experience.organizer.name}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[13px] font-semibold text-foreground truncate">
                {experience.organizer.name}
              </span>
              {experience.organizer.verified && (
                <VerifiedBadge variant="icon" size="sm" />
              )}
            </div>
            {experience.organizer.role && (
              <p className="text-[11.5px] text-muted-foreground truncate">
                {experience.organizer.role}
              </p>
            )}
          </div>
          <RatingRow value={experience.rating} count={experience.reviewCount} size="sm" />
        </div>

        <div className="mt-3.5 pt-3.5 border-t border-border/60 flex items-end justify-between gap-3">
          <MetadataRow
            size="sm"
            items={[
              { icon: <Clock />, label: formatDuration(experience.durationMinutes) },
              { icon: <Users />, label: experience.groupSize },
            ]}
          />
          <PriceBlock
            amount={experience.price}
            originalAmount={experience.originalPrice}
            perLabel="kişi başı"
            align="right"
          />
        </div>
      </div>
    </Comp>
  );
}

export default ExperienceCard;