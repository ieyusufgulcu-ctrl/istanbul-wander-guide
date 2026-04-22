import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarCheck,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Share2,
  Sparkles,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";
import { Screen, Section, StickyBottomCTA } from "@/components/primitives";
import { Avatar, Button, VerifiedBadge } from "@/components/atoms";
import { TrustCard } from "@/components/product";
import { experiences, getExperienceById } from "@/data/experiences";
import { formatDuration } from "@/lib/format";

/**
 * ConfirmationScreen — warm, premium reward state after booking.
 * Replaces anxiety with anticipation. UI-only, no backend.
 */
export default function ConfirmationScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const experience =
    (id && getExperienceById(id)) ??
    experiences.find((e) => e.flags?.includes("editor")) ??
    experiences[0];

  const session = experience.sessions?.[0];
  const refCode = `JI-${experience.id.toUpperCase().replace("EXP-", "")}-2841`;
  const points = 174;

  return (
    <Screen
      padded={false}
      safeTop={false}
      bottomCTA={
        <StickyBottomCTA
          info={
            <div className="min-w-0">
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-gold font-semibold leading-none">
                Onay no
              </p>
              <p className="mt-1 text-[14px] font-semibold text-foreground tabular-nums truncate">
                {refCode}
              </p>
            </div>
          }
        >
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => navigate("/bookings")}
          >
            Rezervasyonum
          </Button>
        </StickyBottomCTA>
      }
    >
      {/* Hero */}
      <header className="safe-top px-5 pt-6 pb-6 text-center bg-gradient-navy text-primary-foreground relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-navy-bright/20 blur-3xl"
        />

        <div className="relative">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gold text-primary mb-4 shadow-elevated">
            <Check className="h-7 w-7" strokeWidth={2.5} />
          </span>
          <p className="text-[10.5px] uppercase tracking-[0.22em] text-gold-soft font-semibold">
            Rezervasyonun hazır
          </p>
          <h1 className="mt-2 font-serif text-[26px] leading-[1.15] text-balance">
            Görüşmek üzere, Ada.
          </h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-primary-foreground/80 max-w-[300px] mx-auto">
            {experience.organizer.name} seni{" "}
            {session ? `${session.dateLabel}, ${session.timeLabel}` : "yakında"} bekliyor.
          </p>
        </div>
      </header>

      {/* Booking summary card */}
      <div className="px-5 -mt-5 relative z-10">
        <article className="rounded-2xl bg-card border border-border/60 shadow-elevated overflow-hidden">
          <div className="flex gap-3 p-3">
            <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-muted">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 py-0.5">
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-gold font-semibold">
                {experience.neighborhood}
              </p>
              <h2 className="font-serif text-[15.5px] leading-[1.18] text-foreground mt-0.5 line-clamp-2">
                {experience.title}
              </h2>
              <p className="mt-1 text-[11.5px] text-muted-foreground truncate">
                {formatDuration(experience.durationMinutes)} · {experience.groupSize}
              </p>
            </div>
          </div>

          <div className="border-t border-border/60 grid grid-cols-2 divide-x divide-border/60">
            <SummaryCell
              icon={<CalendarCheck />}
              label="Tarih"
              value={session?.dateLabel ?? "—"}
            />
            <SummaryCell
              icon={<Clock />}
              label="Saat"
              value={session?.timeLabel ?? "—"}
            />
            <SummaryCell
              icon={<Users />}
              label="Misafir"
              value="2 kişi"
            />
            <SummaryCell
              icon={<MapPin />}
              label="Buluşma"
              value={experience.neighborhood}
            />
          </div>
        </article>
      </div>

      {/* Organizer + message */}
      <div className="px-5 mt-5">
        <div className="rounded-2xl bg-surface-warm border border-border/60 p-3.5 flex items-center gap-3">
          <Avatar
            src={experience.organizer.avatarUrl}
            name={experience.organizer.name}
            size="md"
            ring={experience.organizer.verified}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <p className="text-[14px] font-semibold text-foreground truncate">
                {experience.organizer.name}
              </p>
              {experience.organizer.verified && <VerifiedBadge variant="icon" size="sm" />}
            </div>
            <p className="text-[11.5px] text-muted-foreground truncate mt-0.5">
              Sorularını yanıtlamaktan mutluluk duyar.
            </p>
          </div>
          <Button variant="outline" size="sm" leading={<MessageCircle />}>
            Mesaj
          </Button>
        </div>
      </div>

      {/* Next steps */}
      <div className="px-5">
        <Section title="Sıradakiler" compact>
          <ul className="flex flex-col gap-2.5">
            <NextStepRow
              n={1}
              title="Onay e-postanı kontrol et"
              subtitle="ada@example.com adresine bilet ve yönerge gönderildi."
            />
            <NextStepRow
              n={2}
              title="Tam adres deneyimden 24 saat önce paylaşılacak"
              subtitle="Bildirim olarak da hatırlatacağız."
            />
            <NextStepRow
              n={3}
              title="İstersen takvimine ekle"
              subtitle="Apple Takvim ya da Google Takvim ile."
            />
          </ul>
        </Section>
      </div>

      {/* Passport reward */}
      <div className="px-5">
        <Section compact>
          <div className="rounded-2xl bg-gradient-navy text-primary-foreground p-4 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gold/15 blur-2xl"
            />
            <div className="relative flex items-start gap-3">
              <span className="shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 text-gold">
                <Trophy className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] uppercase tracking-[0.18em] text-gold-soft font-semibold leading-none">
                  Pasaportuna eklendi
                </p>
                <p className="mt-1.5 font-serif text-[18px] leading-tight">
                  Karaköy mührün seni bekliyor.
                </p>
                <p className="mt-1.5 text-[12.5px] text-primary-foreground/80 leading-relaxed">
                  Bu deneyim tamamlandığında <span className="text-gold-soft font-semibold">+{points} Join puanı</span> ve Karaköy mührü kazanacaksın.
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-primary-foreground/60 shrink-0 mt-1" strokeWidth={2} />
            </div>
          </div>
        </Section>
      </div>

      {/* Quick actions */}
      <div className="px-5">
        <Section compact>
          <div className="grid grid-cols-3 gap-2">
            <QuickAction icon={<Ticket />} label="Bilet" />
            <QuickAction icon={<CalendarCheck />} label="Takvime ekle" />
            <QuickAction icon={<Share2 />} label="Paylaş" />
          </div>
        </Section>
      </div>

      {/* Reassurance */}
      <div className="px-5 mb-2">
        <Section compact>
          <TrustCard kind="cancellation" tone="neutral" />
        </Section>
      </div>

      <div className="px-5 mt-2">
        <p className="text-center text-[12px] text-muted-foreground inline-flex items-center gap-1.5 w-full justify-center">
          <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
          İyi keşifler dileriz.
        </p>
      </div>
    </Screen>
  );
}

/* ------------------------------- helpers ------------------------------- */

function SummaryCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-3.5 first:rounded-bl-2xl last:rounded-br-2xl">
      <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground font-semibold inline-flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-gold">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-[13.5px] font-semibold text-foreground leading-tight">
        {value}
      </p>
    </div>
  );
}

function NextStepRow({
  n,
  title,
  subtitle,
}: {
  n: number;
  title: string;
  subtitle: string;
}) {
  return (
    <li className="rounded-2xl bg-surface-warm border border-border/60 p-3.5 flex items-start gap-3">
      <span className="shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full bg-background border border-border/60 text-[12px] font-semibold text-foreground tabular-nums">
        {n}
      </span>
      <div className="min-w-0">
        <p className="text-[13.5px] font-semibold text-foreground leading-snug">
          {title}
        </p>
        <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      </div>
    </li>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="rounded-2xl bg-surface-warm border border-border/60 px-3 py-3.5 flex flex-col items-center gap-1.5 active:scale-[0.98] transition-transform"
    >
      <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-background border border-border/60 text-gold [&>svg]:h-[18px] [&>svg]:w-[18px]">
        {icon}
      </span>
      <span className="text-[11.5px] font-semibold text-foreground">{label}</span>
    </button>
  );
}