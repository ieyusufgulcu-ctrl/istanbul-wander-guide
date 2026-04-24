import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Bell,
  Calendar,
  ChevronRight,
  Compass,
  Heart,
  MapPin,
  MessageCircle,
  QrCode,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Screen } from "@/components/primitives/Screen";
import { TopBar } from "@/components/primitives/TopBar";
import { Section } from "@/components/primitives/Section";
import { Pill } from "@/components/atoms/Pill";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { IconButton } from "@/components/atoms/IconButton";
import { MetadataRow } from "@/components/atoms/MetadataRow";
import { VerifiedBadge } from "@/components/atoms/VerifiedBadge";
import { experiences, getExperienceById } from "@/data/experiences";
import { useFakeLoading } from "@/hooks/useFakeLoading";
import { BookingsListSkeleton } from "@/components/feedback/Skeletons";
import { EmptyState } from "@/components/feedback/EmptyState";

type SegmentKey = "upcoming" | "past" | "messages";

type BookingStatus = "confirmed" | "pending" | "starts-soon";

interface UpcomingBooking {
  id: string;
  experienceId: string;
  dateLabel: string;
  timeLabel: string;
  guests: number;
  status: BookingStatus;
  /** Days from now — drives the relative chip. */
  inDays: number;
}

interface PastBooking {
  id: string;
  experienceId: string;
  dateLabel: string;
  reviewed: boolean;
}

interface MessageThread {
  id: string;
  experienceId: string;
  preview: string;
  timeLabel: string;
  unread: boolean;
}

const UPCOMING: UpcomingBooking[] = [
  {
    id: "bk-201",
    experienceId: "exp-001",
    dateLabel: "Cum, 26 Nisan",
    timeLabel: "19.30",
    guests: 2,
    status: "starts-soon",
    inDays: 3,
  },
  {
    id: "bk-202",
    experienceId: "exp-005",
    dateLabel: "Paz, 5 Mayıs",
    timeLabel: "14.00",
    guests: 1,
    status: "confirmed",
    inDays: 12,
  },
  {
    id: "bk-203",
    experienceId: "exp-002",
    dateLabel: "Cmt, 17 Mayıs",
    timeLabel: "11.00",
    guests: 2,
    status: "pending",
    inDays: 24,
  },
];

const PAST: PastBooking[] = [
  {
    id: "bk-118",
    experienceId: "exp-003",
    dateLabel: "12 Mart 2025",
    reviewed: false,
  },
  {
    id: "bk-104",
    experienceId: "exp-006",
    dateLabel: "24 Şubat 2025",
    reviewed: true,
  },
  {
    id: "bk-091",
    experienceId: "exp-004",
    dateLabel: "9 Şubat 2025",
    reviewed: true,
  },
];

const THREADS: MessageThread[] = [
  {
    id: "th-1",
    experienceId: "exp-001",
    preview: "Şarapla başlamak ister misiniz? Akşam için hazırlık...",
    timeLabel: "14.20",
    unread: true,
  },
  {
    id: "th-2",
    experienceId: "exp-005",
    preview: "Buluşma noktasını harita üzerinden paylaştım.",
    timeLabel: "Dün",
    unread: false,
  },
  {
    id: "th-3",
    experienceId: "exp-002",
    preview: "Atölye için önlük ve kil önceden hazır olacak.",
    timeLabel: "Pzt",
    unread: false,
  },
];

const STATUS_LABEL: Record<BookingStatus, string> = {
  "starts-soon": "Yakında",
  confirmed: "Onaylandı",
  pending: "Onay bekleniyor",
};

const STATUS_TONE: Record<BookingStatus, "gold" | "success" | "warning"> = {
  "starts-soon": "gold",
  confirmed: "success",
  pending: "warning",
};

export default function BookingsScreen() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState<SegmentKey>("upcoming");
  const [params] = useSearchParams();
  const forceEmpty = params.get("empty") === "1";
  const loading = useFakeLoading();

  const upcoming = forceEmpty ? [] : UPCOMING;
  const past = forceEmpty ? [] : PAST;
  const threads = forceEmpty ? [] : THREADS;
  const next = upcoming[0];
  const nextExp = next ? getExperienceById(next.experienceId) : undefined;

  const counts = useMemo(
    () => ({
      upcoming: upcoming.length,
      past: past.length,
      messages: threads.filter((t) => t.unread).length,
    }),
    [upcoming, past, threads],
  );

  return (
    <Screen
      tone="default"
      topBar={
        <TopBar
          variant="blurred"
          title="Rezervasyonlar"
          right={
            <IconButton
              icon={<Bell />}
              label="Bildirimler"
              variant="ghost"
              size="md"
            />
          }
        />
      }
    >
      {/* Hero summary — next booking */}
      <div className="pt-3">
        {loading ? (
          <div className="rounded-[1.5rem] bg-muted/60 h-[152px] animate-pulse" />
        ) : next && nextExp ? (
          <button
            type="button"
            onClick={() => navigate(`/booking/${nextExp.id}`)}
            className="w-full text-left rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-navy to-navy-soft text-primary-foreground shadow-elevated active:scale-[0.995] transition-transform"
          >
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-center justify-between">
                <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
                  Sıradaki deneyim
                </p>
                <Badge tone="gold" eyebrow>
                  {next.inDays} gün sonra
                </Badge>
              </div>
              <h1 className="font-serif text-[24px] leading-[1.12] mt-2 text-balance">
                {nextExp.title}
              </h1>
              <div className="mt-3 flex items-center gap-2 text-[12.5px] text-primary-foreground/80">
                <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                <span>{next.dateLabel}</span>
                <span className="text-primary-foreground/40">·</span>
                <span>{next.timeLabel}</span>
                <span className="text-primary-foreground/40">·</span>
                <span>{next.guests} kişi</span>
              </div>
            </div>

            <div className="border-t border-primary-foreground/10 px-5 py-3 flex items-center justify-between bg-navy/40">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar
                  src={nextExp.organizer.avatarUrl}
                  name={nextExp.organizer.name}
                  size="sm"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12.5px] font-semibold truncate">
                      {nextExp.organizer.name}
                    </span>
                    {nextExp.organizer.verified && (
                      <VerifiedBadge variant="icon" size="sm" />
                    )}
                  </div>
                  <p className="text-[11px] text-primary-foreground/65 truncate">
                    {nextExp.meetingPoint ?? `${nextExp.neighborhood}`}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-gold">
                Bilet
                <QrCode className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </div>
          </button>
        ) : (
          <div className="rounded-[1.5rem] bg-surface-warm border border-border/60 px-5 py-6 text-center">
            <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
              Henüz rezervasyon yok
            </p>
            <p className="mt-2 font-serif text-[18px] leading-tight text-foreground text-balance">
              İlk küçük buluşmanı planla
            </p>
            <p className="mt-1.5 text-[12.5px] text-muted-foreground">
              Editör seçimleri ve mahalle önerileri seni bekliyor.
            </p>
          </div>
        )}
      </div>

      {/* Segmented control */}
      <div className="mt-6 -mx-5 px-5 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          <Pill
            selected={segment === "upcoming"}
            onClick={() => setSegment("upcoming")}
            count={counts.upcoming}
          >
            Yaklaşan
          </Pill>
          <Pill
            selected={segment === "past"}
            onClick={() => setSegment("past")}
            count={counts.past}
          >
            Geçmiş
          </Pill>
          <Pill
            selected={segment === "messages"}
            onClick={() => setSegment("messages")}
            icon={<MessageCircle />}
            count={counts.messages}
          >
            Mesajlar
          </Pill>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Section className="mt-6">
          <BookingsListSkeleton count={3} />
        </Section>
      ) : (
        <>
          {segment === "upcoming" &&
            (upcoming.length > 0 ? (
              <UpcomingList
                items={upcoming}
                onOpen={(id) => navigate(`/experience/${id}`)}
              />
            ) : (
              <Section className="mt-6">
                <EmptyState
                  framed
                  icon={<Compass />}
                  title="Henüz yaklaşan rezervasyon yok"
                  description="Bir deneyim ayırtınca tüm detaylar burada toplanır."
                  actionLabel="Deneyim keşfet"
                  onAction={() => navigate("/")}
                />
              </Section>
            ))}
          {segment === "past" &&
            (past.length > 0 ? (
              <PastList items={past} onOpen={(id) => navigate(`/experience/${id}`)} />
            ) : (
              <Section className="mt-6">
                <EmptyState
                  framed
                  icon={<Star />}
                  title="Geçmiş yolculuğun henüz başlamadı"
                  description="Tamamladığın deneyimler burada toplanır."
                />
              </Section>
            ))}
          {segment === "messages" &&
            (threads.length > 0 ? (
              <MessagesList
                items={threads}
                onOpen={(id) => navigate(`/experience/${id}`)}
              />
            ) : (
              <Section className="mt-6">
                <EmptyState
                  framed
                  icon={<MessageCircle />}
                  title="Aktif mesaj yok"
                  description="Mesajlar yalnızca aktif rezervasyonların organizatörleriyle açılır."
                />
              </Section>
            ))}
        </>
      )}

      {/* Support reassurance */}
      <Section className="mt-10 mb-2">
        <button
          type="button"
          className="w-full rounded-2xl border border-border/70 bg-surface-warm px-4 py-3.5 flex items-center gap-3 text-left active:bg-muted/60 transition-colors"
        >
          <span className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-gold shrink-0">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-semibold text-foreground">
              Yardıma mı ihtiyacın var?
            </p>
            <p className="text-[12px] text-muted-foreground leading-snug">
              Rezervasyon değişikliği, iptal ve organizatör desteği için buradayız.
            </p>
          </div>
          <ChevronRight
            className="h-4 w-4 text-muted-foreground shrink-0"
            strokeWidth={2}
          />
        </button>
      </Section>
    </Screen>
  );
}

/* ────────────────────────────────────────────────────────── */

function UpcomingList({
  items,
  onOpen,
}: {
  items: UpcomingBooking[];
  onOpen: (experienceId: string) => void;
}) {
  return (
    <Section
      className="mt-6"
      eyebrow="Yaklaşan"
      title="Planlarını koru"
      description="Bilet, buluşma noktası ve organizatör mesajı tek dokunuşla."
    >
      <ul className="flex flex-col gap-3">
        {items.map((b) => {
          const exp = getExperienceById(b.experienceId);
          if (!exp) return null;
          return (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => onOpen(exp.id)}
                className="w-full text-left rounded-2xl bg-card border border-border/60 shadow-sm overflow-hidden active:scale-[0.995] transition-transform"
              >
                <div className="flex gap-3.5 p-3">
                  <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={exp.imageUrl}
                      alt={exp.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[10.5px] uppercase tracking-[0.16em] text-gold font-semibold">
                        {exp.neighborhood}
                      </p>
                      <Badge tone={STATUS_TONE[b.status]} dot>
                        {STATUS_LABEL[b.status]}
                      </Badge>
                    </div>
                    <h3 className="font-serif text-[15.5px] leading-[1.18] text-foreground mt-1 line-clamp-2">
                      {exp.title}
                    </h3>
                    <MetadataRow
                      className="mt-1.5"
                      size="sm"
                      items={[
                        { icon: <Calendar />, label: b.dateLabel },
                        { label: b.timeLabel },
                        { label: `${b.guests} kişi` },
                      ]}
                    />
                  </div>
                </div>

                <div className="border-t border-border/60 px-3 py-2 flex items-center justify-between bg-surface-warm/50">
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar
                      name={exp.organizer.name}
                      size="xs"
                    />
                    <span className="text-[11.5px] text-muted-foreground truncate">
                      {exp.organizer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ActionChip icon={<MessageCircle />} label="Mesaj" />
                    <ActionChip icon={<QrCode />} label="Bilet" emphasized />
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function PastList({
  items,
  onOpen,
}: {
  items: PastBooking[];
  onOpen: (experienceId: string) => void;
}) {
  return (
    <Section
      className="mt-6"
      eyebrow="Geçmiş"
      title="Anılarını topla"
      description="Yorumla, anı defterine ekle veya tekrar rezervasyon yap."
    >
      <ul className="flex flex-col divide-y divide-border/60">
        {items.map((b) => {
          const exp = getExperienceById(b.experienceId);
          if (!exp) return null;
          return (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => onOpen(exp.id)}
                className="w-full text-left flex gap-3.5 py-3.5 active:bg-muted/40 transition-colors"
              >
                <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl bg-muted">
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[0.15]"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
                    {exp.neighborhood} · {b.dateLabel}
                  </p>
                  <h3 className="font-serif text-[14.5px] leading-snug text-foreground mt-0.5 line-clamp-1">
                    {exp.title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    {b.reviewed ? (
                      <span className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground">
                        <Star className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
                        Yorumun yayında
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-gold">
                        <Star className="h-3 w-3" strokeWidth={2} />
                        Yorum bırak
                      </span>
                    )}
                    <span className="text-muted-foreground/40 text-[11px]">·</span>
                    <span className="text-[11.5px] text-muted-foreground inline-flex items-center gap-1">
                      <Heart className="h-3 w-3" strokeWidth={2} />
                      Tekrar ayırt
                    </span>
                  </div>
                </div>
                <ChevronRight
                  className="h-4 w-4 text-muted-foreground shrink-0 self-center"
                  strokeWidth={2}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function MessagesList({
  items,
  onOpen,
}: {
  items: MessageThread[];
  onOpen: (experienceId: string) => void;
}) {
  return (
    <Section
      className="mt-6"
      eyebrow="Mesajlar"
      title="Organizatörle iletişim"
      description="Sadece rezervasyonlarınla ilgili kısa yazışmalar."
    >
      <ul className="flex flex-col divide-y divide-border/60">
        {items.map((t) => {
          const exp = getExperienceById(t.experienceId);
          if (!exp) return null;
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => onOpen(exp.id)}
                className="w-full text-left flex items-start gap-3 py-3.5 active:bg-muted/40 transition-colors"
              >
                <div className="relative shrink-0">
                  <Avatar name={exp.organizer.name} size="md" />
                  {t.unread && (
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "text-[13.5px] truncate",
                        t.unread
                          ? "font-semibold text-foreground"
                          : "font-medium text-foreground/90",
                      )}
                    >
                      {exp.organizer.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground shrink-0">
                      {t.timeLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-gold uppercase tracking-[0.14em] font-semibold mt-0.5 truncate">
                    {exp.title}
                  </p>
                  <p
                    className={cn(
                      "text-[12.5px] mt-1 line-clamp-1",
                      t.unread ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t.preview}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-center text-[11.5px] text-muted-foreground">
        Mesajlar yalnızca aktif rezervasyonlar için açıktır.
      </p>
    </Section>
  );
}

function ActionChip({
  icon,
  label,
  emphasized = false,
}: {
  icon: React.ReactNode;
  label: string;
  emphasized?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 h-7 px-2.5 rounded-full text-[11.5px] font-semibold",
        "[&>svg]:h-3.5 [&>svg]:w-3.5",
        emphasized
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground border border-border/70",
      )}
    >
      {icon}
      {label}
    </span>
  );
}