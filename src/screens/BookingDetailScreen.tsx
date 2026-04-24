import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  CalendarCheck,
  ChevronRight,
  Clock,
  HelpCircle,
  MapPin,
  MessageCircle,
  QrCode,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Screen } from "@/components/primitives/Screen";
import { Section } from "@/components/primitives/Section";
import { TopBar } from "@/components/primitives/TopBar";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { VerifiedBadge } from "@/components/atoms/VerifiedBadge";
import { OrganizerRow } from "@/components/product/OrganizerRow";
import { TrustCard } from "@/components/product/TrustCard";
import { experiences, getExperienceById } from "@/data/experiences";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * BookingDetailScreen — ticket-style booking summary with QR placeholder.
 */
export default function BookingDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // Prototype: route param is treated as experienceId for simplicity.
  const exp = (id && getExperienceById(id)) ?? experiences[0];
  const session = exp.sessions?.[0];

  return (
    <Screen
      tone="default"
      padded={false}
      topBar={
        <TopBar
          variant="blurred"
          title="Rezervasyon"
          onBack={() => navigate(-1)}
          right={
            <IconButton
              icon={<Share2 />}
              label="Paylaş"
              variant="ghost"
              size="md"
            />
          }
        />
      }
    >
      {/* Status banner */}
      <div className="px-5 pt-3">
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-soft text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
              Onaylandı
            </p>
            <Badge tone="gold" eyebrow>
              3 gün sonra
            </Badge>
          </div>
          <h1 className="font-serif text-[22px] leading-tight mt-2 text-balance">
            {exp.title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-[12.5px] text-primary-foreground/80">
            <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{session?.dateLabel ?? "Cum, 26 Nisan"}</span>
            <span className="text-primary-foreground/40">·</span>
            <span>{session?.timeLabel ?? "19.30"}</span>
            <span className="text-primary-foreground/40">·</span>
            <span>2 kişi</span>
          </div>
        </div>
      </div>

      {/* Ticket */}
      <div className="px-5 mt-4">
        <div className="rounded-2xl bg-card border border-border/60 shadow-sm overflow-hidden">
          <div className="px-4 py-4 flex items-center gap-4">
            <div className="h-24 w-24 shrink-0 rounded-xl bg-surface-warm border border-border/60 flex items-center justify-center">
              <QrCode className="h-16 w-16 text-foreground" strokeWidth={1.4} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-gold font-semibold">
                Bilet kodu
              </p>
              <p className="font-mono text-[15px] tracking-[0.18em] text-foreground mt-1">
                JI-{exp.id.slice(-3).toUpperCase()}-2042
              </p>
              <p className="text-[11.5px] text-muted-foreground mt-2">
                Buluşma noktasında bu kodu göster.
              </p>
            </div>
          </div>
          {/* Tear */}
          <div className="relative">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-background border-r border-border/60" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-background border-l border-border/60" />
            <div className="border-t border-dashed border-border/70" />
          </div>
          <ul className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-3 text-[12.5px]">
            <DetailItem icon={<Clock />} label="Süre" value={formatDuration(exp.durationMinutes)} />
            <DetailItem icon={<Users />} label="Grup" value={exp.groupSize} />
            <DetailItem icon={<MapPin />} label="Buluşma" value={exp.neighborhood} />
            <DetailItem icon={<CalendarCheck />} label="Durum" value="Onaylı" />
          </ul>
        </div>
      </div>

      {/* Meeting point */}
      {exp.meetingPoint && (
        <div className="px-5">
          <Section title="Buluşma noktası" compact>
            <div className="rounded-2xl bg-surface-warm border border-border/60 overflow-hidden">
              <div className="relative h-24 bg-navy/90 flex items-center justify-center">
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
                    {exp.meetingPoint}
                  </p>
                  <p className="text-[11.5px] text-muted-foreground mt-0.5">
                    Tam adres deneyim öncesi paylaşıldı.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Yol tarifi
                </Button>
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* Organizer */}
      <div className="px-5">
        <Section title="Ev sahibin" compact>
          <div className="rounded-2xl bg-card border border-border/60 p-4">
            <OrganizerRow
              organizer={exp.organizer}
              size="md"
              onClick={() => navigate(`/organizer/${exp.organizer.id}`)}
              withChevron
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" leading={<MessageCircle />} block>
                Mesaj
              </Button>
              <Button variant="outline" size="sm" leading={<HelpCircle />} block>
                Destek
              </Button>
            </div>
          </div>
        </Section>
      </div>

      {/* Policies */}
      <div className="px-5">
        <Section title="Politikalar" compact>
          <div className="flex flex-col gap-2.5">
            <TrustCard kind="cancellation" />
            <TrustCard kind="secure-payment" />
          </div>
        </Section>
      </div>

      {/* Manage */}
      <div className="px-5">
        <Section compact>
          <div className="rounded-2xl bg-card border border-border/60 overflow-hidden shadow-sm">
            <ManageRow label="Tarihi değiştir" />
            <ManageRow label="Misafir sayısını güncelle" />
            <ManageRow label="Rezervasyonu iptal et" tone="danger" last />
          </div>
        </Section>
      </div>

      <div className="px-5 mt-2 mb-2 flex items-center justify-center gap-2 text-[11.5px] text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
        Ödeme JoinIstanbul güvencesi altında.
      </div>
    </Screen>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="h-7 w-7 rounded-full bg-gold-tint text-gold flex items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
          {label}
        </p>
        <p className="text-[13px] text-foreground font-semibold mt-0.5 leading-tight">
          {value}
        </p>
      </div>
    </li>
  );
}

function ManageRow({
  label,
  tone = "default",
  last,
}: {
  label: string;
  tone?: "default" | "danger";
  last?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-center justify-between px-4 py-3.5 text-left active:bg-muted/40 transition-colors",
        !last && "border-b border-border/60",
      )}
    >
      <span
        className={cn(
          "text-[14px]",
          tone === "danger" ? "text-destructive font-semibold" : "text-foreground",
        )}
      >
        {label}
      </span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
    </button>
  );
}
