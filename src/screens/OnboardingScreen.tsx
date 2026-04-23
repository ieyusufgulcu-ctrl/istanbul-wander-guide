import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Compass,
  MapPin,
  Sparkles,
  UtensilsCrossed,
  Palette,
  Leaf,
  Moon,
  Mountain,
  Users,
  User as UserIcon,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { storage, STORAGE_KEYS } from "@/lib/storage";

type StepKey = "vibe" | "neighborhoods" | "intent" | "complete";

interface VibeOption {
  id: string;
  label: string;
  icon: typeof UtensilsCrossed;
}

const VIBES: VibeOption[] = [
  { id: "gastronomi", label: "Gastronomi", icon: UtensilsCrossed },
  { id: "sanat", label: "Sanat & atölye", icon: Palette },
  { id: "wellness", label: "Wellness", icon: Leaf },
  { id: "gece", label: "Gece", icon: Moon },
  { id: "sakin", label: "Sakin", icon: Sparkles },
  { id: "yerel", label: "Yerel", icon: Compass },
  { id: "manzarali", label: "Manzaralı", icon: Mountain },
];

const NEIGHBORHOODS = [
  "Kadıköy",
  "Balat",
  "Karaköy",
  "Cihangir",
  "Üsküdar",
  "Kuzguncuk",
  "Beşiktaş",
  "Moda",
  "Fatih",
  "Galata",
  "Arnavutköy",
  "Bebek",
];

const INTENTS: Array<{ id: string; label: string; sub: string; icon: typeof Users }> = [
  { id: "weekend", label: "Hafta sonu planı", sub: "İki günlük küçük kaçışlar", icon: Sparkles },
  { id: "local", label: "Yerel gibi gezmek", sub: "Turistik değil, mahalleli", icon: Compass },
  { id: "friends", label: "Arkadaşlarla bir şey", sub: "Birlikte yaşanan deneyimler", icon: Users },
  { id: "solo", label: "Tek başıma keşif", sub: "Kendi ritmimde", icon: UserIcon },
  { id: "visitor", label: "Şehri yeni keşfediyorum", sub: "İlk Istanbul izlenimleri", icon: Plane },
];

const STEP_ORDER: StepKey[] = ["vibe", "neighborhoods", "intent", "complete"];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [vibes, setVibes] = useState<string[]>([]);
  const [hoods, setHoods] = useState<string[]>([]);
  const [intent, setIntent] = useState<string | null>(null);

  const step = STEP_ORDER[stepIndex];
  const isLast = step === "complete";
  const totalContentSteps = STEP_ORDER.length - 1; // exclude completion screen from progress

  const canContinue = useMemo(() => {
    if (step === "vibe") return vibes.length > 0;
    if (step === "neighborhoods") return hoods.length > 0;
    if (step === "intent") return intent !== null;
    return true;
  }, [step, vibes, hoods, intent]);

  const finish = () => {
    storage.set(STORAGE_KEYS.onboarded, "1");
    navigate("/", { replace: true });
  };

  const next = () => {
    if (stepIndex < STEP_ORDER.length - 1) setStepIndex((i) => i + 1);
    else finish();
  };

  const back = () => {
    if (stepIndex === 0) finish();
    else setStepIndex((i) => i - 1);
  };

  const toggle = (list: string[], setList: (v: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  return (
    <div className="relative flex min-h-full flex-col bg-background">
      {/* Header: progress + skip */}
      <header className="safe-top sticky top-0 z-20 bg-background/85 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-5 pt-2 pb-3">
          {!isLast ? (
            <>
              <div className="flex flex-1 items-center gap-1.5">
                {Array.from({ length: totalContentSteps }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-[3px] flex-1 rounded-full transition-colors duration-300",
                      i <= stepIndex ? "bg-primary" : "bg-border",
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={finish}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 -mr-2"
              >
                Atla
              </button>
            </>
          ) : (
            <div className="h-[3px] flex-1" />
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 pt-2 pb-32">
        {step === "vibe" && (
          <StepShell
            eyebrow="01 · Tat & ruh hâli"
            title="Seni en çok ne çekiyor?"
            sub="Birden fazla seçebilirsin. Önerilerini buna göre düzenleyeceğiz."
          >
            <div className="mt-7 grid grid-cols-2 gap-3">
              {VIBES.map((v) => {
                const selected = vibes.includes(v.id);
                const Icon = v.icon;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => toggle(vibes, setVibes, v.id)}
                    aria-pressed={selected}
                    className={cn(
                      "group relative flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.985]",
                      selected
                        ? "border-primary/70 bg-gold-tint/60 shadow-[0_4px_18px_-12px_hsl(var(--primary)/0.35)]"
                        : "border-border bg-surface-elevated hover:border-border/90",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                        selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/80",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="text-[14px] font-semibold text-foreground">{v.label}</span>
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </StepShell>
        )}

        {step === "neighborhoods" && (
          <StepShell
            eyebrow="02 · Mahalleler"
            title="Hangi semtleri merak ediyorsun?"
            sub="Haritadaki keşif rotanı ve pasaport ilerlemeni şekillendirir."
          >
            <div className="mt-7 flex flex-wrap gap-2">
              {NEIGHBORHOODS.map((n) => {
                const selected = hoods.includes(n);
                return (
                  <Chip
                    key={n}
                    selected={selected}
                    onClick={() => toggle(hoods, setHoods, n)}
                    icon={selected ? <Check /> : <MapPin />}
                    className="h-10 text-[13px]"
                  >
                    {n}
                  </Chip>
                );
              })}
            </div>
            <p className="mt-6 text-[12.5px] text-muted-foreground">
              {hoods.length > 0
                ? `${hoods.length} semt seçildi`
                : "İstediğin kadar seçebilirsin"}
            </p>
          </StepShell>
        )}

        {step === "intent" && (
          <StepShell
            eyebrow="03 · Bu aralar"
            title="Aklında nasıl bir ritim var?"
            sub="Bir tane seç — istediğin zaman değiştirebilirsin."
          >
            <div className="mt-7 flex flex-col gap-2.5">
              {INTENTS.map((opt) => {
                const selected = intent === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setIntent(opt.id)}
                    aria-pressed={selected}
                    className={cn(
                      "flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.99]",
                      selected
                        ? "border-primary/70 bg-gold-tint/60"
                        : "border-border bg-surface-elevated hover:border-border/90",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                        selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/80",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="flex flex-1 flex-col">
                      <span className="text-[14px] font-semibold text-foreground">{opt.label}</span>
                      <span className="text-[12.5px] text-muted-foreground">{opt.sub}</span>
                    </span>
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                        selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                      )}
                    >
                      {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </StepShell>
        )}

        {step === "complete" && (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="relative mb-7 flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gold-tint" />
              <span className="absolute inset-2 rounded-full bg-gradient-gold opacity-90" />
              <Sparkles className="relative h-9 w-9 text-primary-foreground" strokeWidth={1.8} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-gold font-semibold">
              Hazırsın
            </p>
            <h1 className="mt-3 font-serif text-[30px] leading-[1.1] text-foreground text-balance">
              Istanbul rotan seni bekliyor
            </h1>
            <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed text-muted-foreground text-balance">
              Önerilerin, haritadaki keşif sisin ve pasaportundaki damgalar
              tercihlerine göre şekillenecek.
            </p>

            <div className="mt-8 grid w-full max-w-[320px] grid-cols-3 gap-2.5">
              <SummaryStat label="Tat" value={vibes.length} />
              <SummaryStat label="Semt" value={hoods.length} />
              <SummaryStat label="Ritim" value={intent ? 1 : 0} />
            </div>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="safe-bottom sticky bottom-0 z-20 border-t border-border/60 bg-background/92 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-5 pt-3 pb-3">
          {!isLast && (
            <Button variant="ghost" size="lg" onClick={back}>
              {stepIndex === 0 ? "Atla" : "Geri"}
            </Button>
          )}
          <Button
            variant={isLast ? "gold" : "primary"}
            size="lg"
            block
            onClick={next}
            disabled={!canContinue}
            trailing={!isLast ? <ArrowRight /> : undefined}
          >
            {isLast ? "Keşfetmeye başla" : "Devam et"}
          </Button>
        </div>
      </footer>
    </div>
  );
}

function StepShell({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-serif text-[26px] leading-[1.15] text-foreground text-balance">
        {title}
      </h1>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground text-balance">
        {sub}
      </p>
      {children}
    </section>
  );
}

function SummaryStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-surface-elevated py-3">
      <span className="font-serif text-[22px] leading-none text-foreground">{value}</span>
      <span className="mt-1.5 text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
        {label}
      </span>
    </div>
  );
}