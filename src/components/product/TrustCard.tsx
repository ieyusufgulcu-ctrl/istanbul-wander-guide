import { ReactNode } from "react";
import {
  BadgeCheck,
  CalendarX2,
  Headphones,
  ShieldCheck,
  Sparkles,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TrustKind =
  | "cancellation"
  | "secure-payment"
  | "verified-organizer"
  | "instant-confirmation"
  | "support"
  | "curated";

type Tone = "neutral" | "gold" | "navy";

interface TrustCardProps {
  /** Preset content — auto fills icon, title and description in Turkish. */
  kind?: TrustKind;
  /** Custom icon (overrides preset). */
  icon?: ReactNode;
  title?: string;
  description?: string;
  /** Visual variant. neutral = warm surface; gold = subtle accent; navy = inverted hero. */
  tone?: Tone;
  /** Layout. */
  layout?: "row" | "stack";
  /** Optional trailing slot (e.g. "Detay" button or chevron). */
  trailing?: ReactNode;
  /** Make whole card tappable. */
  onClick?: () => void;
  className?: string;
}

const PRESETS: Record<TrustKind, { icon: LucideIcon; title: string; description: string }> = {
  cancellation: {
    icon: CalendarX2,
    title: "Esnek iptal",
    description: "Deneyimden 24 saat öncesine kadar ücretsiz iptal.",
  },
  "secure-payment": {
    icon: ShieldCheck,
    title: "Güvenli ödeme",
    description: "Ödemeniz deneyim tamamlanana dek koruma altında.",
  },
  "verified-organizer": {
    icon: BadgeCheck,
    title: "Doğrulanmış organizatör",
    description: "Kimliği ve mekânı JoinIstanbul tarafından onaylandı.",
  },
  "instant-confirmation": {
    icon: Ticket,
    title: "Anında onay",
    description: "Rezervasyonun saniyeler içinde onaylanır, biletin hazır olur.",
  },
  support: {
    icon: Headphones,
    title: "Yerel destek",
    description: "İstanbul ekibimiz her gün 09.00–22.00 arası ulaşılabilir.",
  },
  curated: {
    icon: Sparkles,
    title: "Özenle seçildi",
    description: "Her deneyim editör ekibimizin onayından geçer.",
  },
};

const TONES: Record<Tone, { card: string; iconWrap: string; icon: string; title: string; desc: string }> = {
  neutral: {
    card: "bg-surface-warm border border-border/60",
    iconWrap: "bg-background border border-border/70",
    icon: "text-gold",
    title: "text-foreground",
    desc: "text-muted-foreground",
  },
  gold: {
    card: "bg-gold-tint border border-gold/30",
    iconWrap: "bg-background border border-gold/30",
    icon: "text-gold",
    title: "text-foreground",
    desc: "text-foreground/70",
  },
  navy: {
    card: "bg-navy border border-primary-foreground/10",
    iconWrap: "bg-primary-foreground/10 border border-primary-foreground/15",
    icon: "text-gold",
    title: "text-primary-foreground",
    desc: "text-primary-foreground/75",
  },
};

/**
 * TrustCard — calm reassurance surface for cancellation, secure payment,
 * verified organizer, instant confirmation, support, curation.
 * Editorial, never salesy.
 */
export function TrustCard({
  kind = "cancellation",
  icon,
  title,
  description,
  tone = "neutral",
  layout = "row",
  trailing,
  onClick,
  className,
}: TrustCardProps) {
  const preset = PRESETS[kind];
  const Icon = preset.icon;
  const t = TONES[tone];

  const finalTitle = title ?? preset.title;
  const finalDescription = description ?? preset.description;
  const finalIcon = icon ?? <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />;

  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-2xl px-4 py-3.5",
        "transition-all duration-200",
        onClick && "active:scale-[0.99]",
        t.card,
        layout === "row" ? "flex items-center gap-3.5" : "flex flex-col items-start gap-3",
        className,
      )}
    >
      <span
        className={cn(
          "shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl",
          t.iconWrap,
          t.icon,
        )}
      >
        {finalIcon}
      </span>

      <div className="flex-1 min-w-0">
        <h4 className={cn("text-[14px] font-semibold leading-snug", t.title)}>
          {finalTitle}
        </h4>
        {finalDescription && (
          <p className={cn("text-[12.5px] leading-relaxed mt-0.5", t.desc)}>
            {finalDescription}
          </p>
        )}
      </div>

      {trailing && <div className="shrink-0">{trailing}</div>}
    </Comp>
  );
}

export default TrustCard;