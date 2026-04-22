import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarCheck,
  ChevronLeft,
  Check,
  Clock,
  Heart,
  Languages,
  MapPin,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { Screen, Section, StickyBottomCTA } from "@/components/primitives";
import {
  Avatar,
  Button,
  IconButton,
  MetadataRow,
  PriceBlock,
  RatingRow,
  Tag,
  VerifiedBadge,
} from "@/components/atoms";
import { OrganizerRow, TrustCard } from "@/components/product";
import { experiences, getExperienceById } from "@/data/experiences";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * ExperienceDetailScreen — premium detail surface where desire meets trust.
 * Composes Screen + StickyBottomCTA + atoms + product components only.
 */
export default function ExperienceDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const experience =
    (id && getExperienceById(id)) ??
    experiences.find((e) => e.flags?.includes("editor")) ??
    experiences[0];

  const [saved, setSaved] = useState(false);
  const sessions = experience.sessions ?? [];
  const [selectedSession, setSelectedSession] = useState<string>(sessions[0]?.id ?? "");

  return (
    <Screen
      padded={false}
      safeTop={false}
      bottomCTA={
        <StickyBottomCTA
          info={
            <PriceBlock
              amount={experience.price}
              perLabel="kişi başı · vergiler dahil"
              size="md"
            />
          }
        >
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => {
              /* navigate to /booking/[id] later */
            }}
          >
            Yer ayırt
          </Button>
        </StickyBottomCTA>
      }
    >
      {/* 1. Media */}
      <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/45 via-transparent to-transparent" />

        {/* Floating top bar */}
        <div className="absolute top-0 left-0 right-0 safe-top px-3 pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Geri"
            className="h-10 w-10 rounded-full bg-background/85 backdrop-blur-md flex items-center justify-center text-foreground active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <div className="flex items-center gap-2">
            <IconButton
              icon={<Share2 />}
              label="Paylaş"
              variant="glass"
              size="md"
            />
            <IconButton
              icon={<Heart className={saved ? "fill-current" : ""} />}
              label={saved ? "Kaydedildi" : "Kaydet"}
              variant="glass"
              size="md"
              active={saved}
              onClick={() => setSaved((v) => !v)}
            />
          </div>
        </div>

        {/* Bottom-of-media tags */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap gap-1.5">
          <Tag tone="media" icon={<MapPin />}>
            {experience.neighborhood}
          </Tag>
          {experience.flags?.includes("editor") && (
            <Tag tone="gold" icon={<Sparkles />}>Editör Seçimi</Tag>
          )}
        </div>
      </div>

      {/* 2. Title */}
      <div className="px-5 pt-5">
        <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
          {CATEGORY_LABEL[experience.category]}
        </p>
        <h1 className="font-serif text-[26px] leading-[1.12] text-foreground mt-1.5 text-balance">
          {experience.title}
        </h1>
        {experience.tagline && (
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
            {experience.tagline}
          </p>
        )}

        {/* Quick rating + duration line */}
        <div className="mt-3 flex items-center gap-2.5 flex-wrap">
          <RatingRow value={experience.rating} count={experience.reviewCount} showCountLabel />
          <span className="text-muted-foreground/40 text-[12px]">·</span>
          <span className="text-[12.5px] text-muted-foreground">
            {formatDuration(experience.durationMinutes)}
          </span>
        </div>
      </div>

      {/* 3. Organizer */}
      <div className="px-5 mt-5">
        <div className="rounded-2xl bg-surface-warm border border-border/60 p-4">
          <OrganizerRow
            organizer={experience.organizer}
            size="md"
            trailing={
              <Button variant="outline" size="sm">
                Mesaj
              </Button>
            }
          />
          {experience.organizer.hostedCount && (
            <p className="mt-3 text-[12.5px] text-muted-foreground">
              <span className="font-semibold text-foreground">
                {experience.organizer.hostedCount}
              </span>{" "}
              deneyim ev sahipliği yaptı.
            </p>
          )}
        </div>
      </div>

      {/* 4. Core trust / metadata */}
      <div className="px-5 mt-5">
        <ul className="grid grid-cols-2 gap-3">
          <FactCell
            icon={<Clock />}
            label="Süre"
            value={formatDuration(experience.durationMinutes)}
          />
          <FactCell
            icon={<Users />}
            label="Grup"
            value={experience.groupSize}
          />
          <FactCell
            icon={<MapPin />}
            label="Buluşma"
            value={experience.neighborhood}
          />
          {experience.language && (
            <FactCell
              icon={<Languages />}
              label="Dil"
              value={experience.language}
            />
          )}
        </ul>
      </div>

      {/* Editor's note */}
      {experience.editorNote && (
        <div className="px-5">
          <Section eyebrow="Editör notu" compact>
            <p className="font-serif text-[17px] leading-[1.5] text-foreground/90 text-balance">
              "{experience.editorNote}"
            </p>
          </Section>
        </div>
      )}

      {/* 5. Highlights */}
      {experience.highlights && experience.highlights.length > 0 && (
        <div className="px-5">
          <Section title="Seni neler bekliyor" compact>
            <ul className="flex flex-col gap-2.5">
              {experience.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-gold-tint text-gold flex items-center justify-center">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-foreground">
                    {h}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      )}

      {/* Included */}
      {experience.included && experience.included.length > 0 && (
        <div className="px-5">
          <Section title="Fiyata dahil" compact>
            <div className="flex flex-wrap gap-1.5">
              {experience.included.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-surface-warm border border-border/60 text-[12.5px] text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </span>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* 7. Session preview */}
      {sessions.length > 0 && (
        <div className="px-5">
          <Section
            title="Yaklaşan seanslar"
            compact
            action={{ label: "Tüm tarihler" }}
            bleed
          >
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-5">
              {sessions.map((s) => {
                const active = s.id === selectedSession;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSession(s.id)}
                    aria-pressed={active}
                    className={cn(
                      "shrink-0 w-[128px] rounded-2xl border p-3 text-left transition-colors active:scale-[0.99]",
                      active
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border/70 text-foreground hover:bg-muted/40",
                    )}
                  >
                    <p
                      className={cn(
                        "text-[10.5px] uppercase tracking-[0.16em] font-semibold",
                        active ? "text-gold-soft" : "text-gold",
                      )}
                    >
                      {s.dateLabel.split(",")[0]}
                    </p>
                    <p
                      className={cn(
                        "font-serif text-[15.5px] leading-tight mt-1",
                        active ? "text-primary-foreground" : "text-foreground",
                      )}
                    >
                      {s.dateLabel.split(",")[1]?.trim() ?? s.dateLabel}
                    </p>
                    <p
                      className={cn(
                        "text-[12px] mt-0.5",
                        active ? "text-primary-foreground/80" : "text-muted-foreground",
                      )}
                    >
                      {s.timeLabel}
                    </p>
                    <p
                      className={cn(
                        "text-[10.5px] mt-2 font-semibold",
                        active ? "text-primary-foreground/85" : "text-muted-foreground",
                      )}
                    >
                      {s.spotsLeft} yer kaldı
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="px-5 mt-3 flex items-center gap-2 text-[12.5px] text-muted-foreground">
              <CalendarCheck className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
              <span>İptal: deneyimden 24 saat öncesine kadar ücretsiz.</span>
            </div>
          </Section>
        </div>
      )}

      {/* Meeting point teaser */}
      {experience.meetingPoint && (
        <div className="px-5">
          <Section title="Buluşma noktası" compact>
            <button
              type="button"
              className="w-full rounded-2xl bg-surface-warm border border-border/60 overflow-hidden text-left active:scale-[0.99] transition-transform"
            >
              <div className="relative h-28 bg-navy/90 flex items-center justify-center">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, hsl(var(--gold) / 0.35), transparent 45%), radial-gradient(circle at 70% 60%, hsl(var(--navy-bright) / 0.35), transparent 50%)",
                  }}
                />
                <span className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-gold text-primary">
                  <MapPin className="h-5 w-5" strokeWidth={2} />
                </span>
              </div>
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-foreground truncate">
                    {experience.meetingPoint}
                  </p>
                  <p className="text-[11.5px] text-muted-foreground mt-0.5">
                    Tam adres rezervasyon sonrası paylaşılır.
                  </p>
                </div>
                <span className="shrink-0 text-[12px] font-semibold text-primary">
                  Haritada aç
                </span>
              </div>
            </button>
          </Section>
        </div>
      )}

      {/* 6. Trust cards */}
      <div className="px-5">
        <Section compact>
          <div className="flex flex-col gap-2.5">
            <TrustCard kind="cancellation" />
            <TrustCard kind="verified-organizer" />
            <TrustCard kind="secure-payment" />
          </div>
        </Section>
      </div>

      {/* Reviews teaser */}
      <div className="px-5">
        <Section
          title="Misafirler ne diyor"
          compact
          action={{ label: "Tüm yorumlar" }}
        >
          <ReviewQuote
            name="Ece"
            initials="E"
            stars={5}
            text="Elif'in mutfağında geçen iki saat, son zamanlarda İstanbul'da yaşadığım en sıcak akşamdı."
          />
        </Section>
      </div>
    </Screen>
  );
}

/* ------------------------------- helpers ------------------------------- */

const CATEGORY_LABEL: Record<string, string> = {
  gastronomi: "Gastronomi",
  sanat: "Sanat & Atölye",
  wellness: "Wellness",
  mahalle: "Mahalle",
};

function FactCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="rounded-2xl bg-surface-warm border border-border/60 p-3.5 flex items-start gap-3">
      <span className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-xl bg-background border border-border/70 text-gold [&>svg]:h-[18px] [&>svg]:w-[18px]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
          {label}
        </p>
        <p className="mt-1 text-[13.5px] font-semibold text-foreground leading-tight">
          {value}
        </p>
      </div>
    </li>
  );
}

function ReviewQuote({
  name,
  initials,
  stars,
  text,
}: {
  name: string;
  initials: string;
  stars: number;
  text: string;
}) {
  return (
    <article className="rounded-2xl bg-surface-warm border border-border/60 p-4">
      <div className="flex items-center gap-2.5">
        <Avatar name={name} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-foreground">{name}</p>
          <RatingRow value={stars} size="sm" />
        </div>
      </div>
      <p className="mt-3 font-serif text-[15px] leading-relaxed text-foreground/90 text-balance">
        "{text}"
      </p>
    </article>
  );
}