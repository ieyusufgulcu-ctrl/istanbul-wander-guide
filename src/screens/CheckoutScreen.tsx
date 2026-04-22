import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react";
import { Screen, StickyBottomCTA, Section } from "@/components/primitives";
import { Button, PriceBlock, Badge } from "@/components/atoms";
import { TrustCard } from "@/components/product";
import { experiences, getExperienceById } from "@/data/experiences";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * CheckoutScreen — calm, premium, mobile-native booking shell.
 * UI only. No real payment. Composes Screen + StickyBottomCTA + atoms.
 */
export default function CheckoutScreen() {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const experience =
    (id && getExperienceById(id)) ??
    experiences.find((e) => e.flags?.includes("editor")) ??
    experiences[0];

  const sessions = experience.sessions ?? [];
  const initialSession =
    sessions.find((s) => s.id === params.get("session")) ?? sessions[0];

  const [sessionId, setSessionId] = useState<string>(initialSession?.id ?? "");
  const [guests, setGuests] = useState(2);
  const [payment, setPayment] = useState<"card" | "applepay">("card");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const selectedSession =
    sessions.find((s) => s.id === sessionId) ?? sessions[0];

  const subtotal = experience.price * guests;
  const serviceFee = Math.round(subtotal * 0.06);
  const total = subtotal + serviceFee;
  const points = Math.round(total / 10);

  const maxGuests = useMemo(() => {
    const m = parseInt(experience.groupSize.replace(/.*–\s*/, ""), 10);
    return Number.isFinite(m) && m > 0 ? m : 8;
  }, [experience.groupSize]);

  const canBook = !!selectedSession && acceptedTerms;

  return (
    <Screen
      padded={false}
      safeTop={false}
      bottomCTA={
        <StickyBottomCTA
          info={
            <PriceBlock
              amount={total}
              perLabel={`${guests} kişi · vergiler dahil`}
              size="md"
            />
          }
        >
          <Button
            variant="primary"
            size="lg"
            block
            disabled={!canBook}
            leading={<Lock />}
            onClick={() => navigate(`/confirmation/${experience.id}`)}
          >
            Güvenli rezervasyon
          </Button>
        </StickyBottomCTA>
      }
    >
      {/* Modal-style top bar */}
      <header className="safe-top px-3 pt-2 pb-2 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Kapat"
          className="h-10 w-10 rounded-full bg-surface-warm border border-border/60 flex items-center justify-center text-foreground active:scale-95 transition-transform"
        >
          <X className="h-4.5 w-4.5" strokeWidth={2} />
        </button>
        <div className="flex-1 text-center">
          <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold leading-none">
            Rezervasyon
          </p>
          <p className="mt-1 text-[14px] font-semibold text-foreground">Detayları onayla</p>
        </div>
        <span className="inline-flex items-center gap-1 h-8 px-2.5 rounded-full bg-surface-warm border border-border/60 text-[11px] text-muted-foreground">
          <Lock className="h-3 w-3 text-gold" strokeWidth={2.25} />
          Güvenli
        </span>
      </header>

      {/* Compact experience summary */}
      <div className="px-5 pt-3">
        <div className="rounded-2xl bg-surface-warm border border-border/60 p-3 flex gap-3">
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
              {experience.organizer.name} · {formatDuration(experience.durationMinutes)}
            </p>
          </div>
        </div>
      </div>

      {/* Date & time */}
      <div className="px-5">
        <Section title="Tarih ve saat" compact>
          {sessions.length > 0 ? (
            <div className="-mx-5 px-5 flex gap-2.5 overflow-x-auto no-scrollbar">
              {sessions.map((s) => {
                const active = s.id === sessionId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSessionId(s.id)}
                    aria-pressed={active}
                    className={cn(
                      "shrink-0 w-[124px] rounded-2xl border p-3 text-left transition-colors active:scale-[0.99]",
                      active
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border/70 text-foreground hover:bg-muted/40",
                    )}
                  >
                    <p className={cn("text-[10.5px] uppercase tracking-[0.16em] font-semibold", active ? "text-gold-soft" : "text-gold")}>
                      {s.dateLabel.split(",")[0]}
                    </p>
                    <p className={cn("font-serif text-[15px] leading-tight mt-1", active ? "text-primary-foreground" : "text-foreground")}>
                      {s.dateLabel.split(",")[1]?.trim() ?? s.dateLabel}
                    </p>
                    <p className={cn("text-[12px] mt-0.5", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {s.timeLabel}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-surface-warm border border-border/60 p-4 flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-gold" strokeWidth={1.75} />
              <p className="text-[13px] text-muted-foreground">
                Tarih seçimi rezervasyon ekranında yapılır.
              </p>
            </div>
          )}
        </Section>
      </div>

      {/* Guests */}
      <div className="px-5">
        <Section title="Misafir sayısı" compact>
          <div className="rounded-2xl bg-surface-warm border border-border/60 p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-foreground">Yetişkin</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Bu deneyim {experience.groupSize}.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Stepper
                value={guests}
                min={1}
                max={maxGuests}
                onChange={setGuests}
              />
            </div>
          </div>
        </Section>
      </div>

      {/* Contact (lightweight) */}
      <div className="px-5">
        <Section title="İletişim" compact>
          <div className="rounded-2xl bg-surface-warm border border-border/60 divide-y divide-border/60">
            <FieldRow label="Ad" value="Ada Yıldız" />
            <FieldRow label="E-posta" value="ada@example.com" />
            <FieldRow label="Telefon" value="+90 532 ••• 42 18" />
          </div>
          <p className="mt-2 text-[11.5px] text-muted-foreground">
            Organizatör seninle yalnızca bu rezervasyon için iletişime geçer.
          </p>
        </Section>
      </div>

      {/* Payment shell */}
      <div className="px-5">
        <Section title="Ödeme yöntemi" compact>
          <div className="flex flex-col gap-2">
            <PaymentRow
              selected={payment === "card"}
              onClick={() => setPayment("card")}
              icon={<CreditCard className="h-[18px] w-[18px]" strokeWidth={1.75} />}
              title="Kredi kartı"
              subtitle="Visa •••• 4827"
            />
            <PaymentRow
              selected={payment === "applepay"}
              onClick={() => setPayment("applepay")}
              icon={<Wallet className="h-[18px] w-[18px]" strokeWidth={1.75} />}
              title="Apple Pay"
              subtitle="Tek dokunuşla onayla"
            />
          </div>
        </Section>
      </div>

      {/* Pricing breakdown */}
      <div className="px-5">
        <Section title="Fiyat özeti" compact>
          <div className="rounded-2xl bg-surface-warm border border-border/60 p-4">
            <PriceLine
              label={`${experience.price.toLocaleString("tr-TR")} ₺ × ${guests} kişi`}
              value={`${subtotal.toLocaleString("tr-TR")} ₺`}
            />
            <PriceLine
              label="Hizmet bedeli"
              value={`${serviceFee.toLocaleString("tr-TR")} ₺`}
            />
            <div className="mt-3 pt-3 border-t border-border/60 flex items-baseline justify-between">
              <span className="text-[14px] font-semibold text-foreground">Toplam</span>
              <PriceBlock amount={total} size="md" align="right" />
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Badge tone="gold" eyebrow icon={<CalendarCheck />}>
                +{points} puan
              </Badge>
              <span className="text-[11.5px] text-muted-foreground">
                Bu rezervasyondan kazanırsın.
              </span>
            </div>
          </div>
        </Section>
      </div>

      {/* Trust */}
      <div className="px-5">
        <Section compact>
          <TrustCard kind="cancellation" />
        </Section>
      </div>

      {/* Consent */}
      <div className="px-5 mt-6">
        <button
          type="button"
          onClick={() => setAcceptedTerms((v) => !v)}
          aria-pressed={acceptedTerms}
          className="w-full flex items-start gap-3 text-left"
        >
          <span
            className={cn(
              "mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors",
              acceptedTerms
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-background border-border",
            )}
          >
            {acceptedTerms && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
          </span>
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">
            <span className="text-foreground/90">Misafir koşullarını</span> ve{" "}
            <span className="text-foreground/90">iptal politikasını</span> okudum,
            kabul ediyorum.
          </p>
        </button>
      </div>
    </Screen>
  );
}

/* ------------------------------- helpers ------------------------------- */

function Stepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-background border border-border/70 p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Azalt"
        className="h-8 w-8 rounded-full flex items-center justify-center text-foreground disabled:opacity-40 active:scale-95 transition-transform"
      >
        <Minus className="h-4 w-4" strokeWidth={2} />
      </button>
      <span className="min-w-[20px] text-center text-[14px] font-semibold tabular-nums text-foreground">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Artır"
        className="h-8 w-8 rounded-full flex items-center justify-center text-foreground disabled:opacity-40 active:scale-95 transition-transform"
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left active:bg-muted/30 transition-colors"
    >
      <span className="text-[13px] text-muted-foreground w-20 shrink-0">{label}</span>
      <span className="flex-1 min-w-0 text-[13.5px] font-medium text-foreground truncate">
        {value}
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground -rotate-90" strokeWidth={2} />
    </button>
  );
}

function PaymentRow({
  selected,
  onClick,
  icon,
  title,
  subtitle,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-colors active:scale-[0.99]",
        selected
          ? "bg-gold-tint border-gold/40"
          : "bg-background border-border/70 hover:bg-muted/30",
      )}
    >
      <span className="shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-background border border-border/60 text-gold">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-foreground">{title}</p>
        <p className="text-[12px] text-muted-foreground mt-0.5 truncate">{subtitle}</p>
      </div>
      <span
        className={cn(
          "h-5 w-5 rounded-full border flex items-center justify-center shrink-0",
          selected ? "border-gold" : "border-border",
        )}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
      </span>
    </button>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-1">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="text-[13.5px] font-semibold text-foreground tabular-nums">
        {value}
      </span>
    </div>
  );
}