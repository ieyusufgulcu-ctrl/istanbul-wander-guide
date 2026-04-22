import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  ChevronRight,
  Compass,
  Heart,
  Lock,
  Receipt,
  Settings,
  Sparkles,
  Stamp as StampIcon,
} from "lucide-react";
import { Screen } from "@/components/primitives/Screen";
import { Section } from "@/components/primitives/Section";
import { HorizontalScroller } from "@/components/primitives/HorizontalScroller";
import { TopBar } from "@/components/primitives/TopBar";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { IconButton } from "@/components/atoms/IconButton";
import { Button } from "@/components/atoms/Button";
import { ExperienceCard } from "@/components/product/ExperienceCard";
import { experiences } from "@/data/experiences";
import { cn } from "@/lib/utils";

interface DistrictStamp {
  id: string;
  name: string;
  date?: string;
  unlocked: boolean;
  progress: number;
}

const STAMPS: DistrictStamp[] = [
  { id: "karakoy", name: "Karaköy", date: "12 Nis", unlocked: true, progress: 72 },
  { id: "kadikoy", name: "Kadıköy", date: "28 Mar", unlocked: true, progress: 84 },
  { id: "uskudar", name: "Üsküdar", date: "9 Mar", unlocked: true, progress: 60 },
  { id: "cihangir", name: "Cihangir", date: "21 Şub", unlocked: true, progress: 45 },
  { id: "balat", name: "Balat", date: "3 Şub", unlocked: true, progress: 28 },
  { id: "kuzguncuk", name: "Kuzguncuk", date: "—", unlocked: true, progress: 18 },
  { id: "fatih", name: "Fatih", unlocked: false, progress: 0 },
  { id: "moda", name: "Moda", unlocked: false, progress: 0 },
];

interface BadgeItem {
  id: string;
  name: string;
  hint: string;
  earned: boolean;
  icon: typeof StampIcon;
}

const BADGES: BadgeItem[] = [
  { id: "b1", name: "İlk Sofra", hint: "İlk gastronomi deneyimi", earned: true, icon: Sparkles },
  { id: "b2", name: "Mahalleli", hint: "3 farklı semt", earned: true, icon: Compass },
  { id: "b3", name: "Editör Takipçisi", hint: "Editör seçimi 2 deneyim", earned: true, icon: Award },
  { id: "b4", name: "Asya Yakası", hint: "Anadolu yakası 5 keşif", earned: false, icon: Lock },
];

const TIMELINE = [
  { id: "t1", title: "Karaköy'de meyhane akşamı", meta: "12 Nis · Şef Elif", points: 120 },
  { id: "t2", title: "Moda sahili kahve turu", meta: "28 Mar · Burak Tunç", points: 80 },
  { id: "t3", title: "Üsküdar tarihi hamam", meta: "9 Mar · Cemile Hanım", points: 100 },
];

export default function ProfileScreen() {
  const navigate = useNavigate();

  const unlockedCount = STAMPS.filter((s) => s.unlocked).length;
  const totalProgress = Math.round(
    STAMPS.reduce((s, d) => s + d.progress, 0) / STAMPS.length,
  );
  const points = 1280;
  const nextLevelAt = 1500;
  const levelPct = Math.round((points / nextLevelAt) * 100);

  const wishlist = useMemo(() => experiences.slice(0, 4), []);

  return (
    <Screen
      tone="default"
      padded={false}
      topBar={
        <TopBar
          title="Pasaport"
          right={
            <IconButton
              icon={<Settings />}
              label="Ayarlar"
              variant="ghost"
              size="md"
            />
          }
        />
      }
    >
      {/* Identity hero */}
      <div className="px-5 pt-2">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-navy text-primary-foreground p-5 shadow-md">
          {/* Subtle gold glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <Avatar name="Selin Aydın" size="xl" ring />
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
                Sefer 02 · Gezgin
              </p>
              <h1 className="font-serif text-[24px] leading-tight mt-1">
                Selin Aydın
              </h1>
              <p className="text-[12.5px] text-primary-foreground/70 mt-1">
                İstanbul'da {unlockedCount} semt · {TIMELINE.length} deneyim
              </p>
            </div>
          </div>

          {/* Points + level progress */}
          <div className="relative mt-5 rounded-2xl bg-background/10 backdrop-blur-sm border border-primary-foreground/10 p-3.5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60 font-semibold">
                  Join puanı
                </p>
                <p className="font-serif text-[26px] leading-none mt-1">
                  {points.toLocaleString("tr-TR")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-primary-foreground/70">
                  Sonraki seviye
                </p>
                <p className="text-[12.5px] font-semibold text-gold mt-0.5">
                  {nextLevelAt - points} puan kaldı
                </p>
              </div>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-primary-foreground/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-all duration-500"
                style={{ width: `${levelPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Passport / district stamps */}
      <div className="px-5">
        <Section
          eyebrow="Pasaport"
          title="Semt mühürlerin"
          description={`${unlockedCount}/${STAMPS.length} semt · %${totalProgress} keşif`}
          action={{ label: "Haritada gör", onClick: () => navigate("/map") }}
        >
          <div className="grid grid-cols-3 gap-3">
            {STAMPS.map((s) => (
              <StampTile key={s.id} stamp={s} />
            ))}
          </div>
        </Section>
      </div>

      {/* Badges */}
      <div className="px-5">
        <Section
          eyebrow="Rozetler"
          title="Kazandıkların"
          action={{ label: "Tümü", onClick: () => {} }}
          bleed
        >
          <HorizontalScroller gap="md" className="px-5">
            {BADGES.map((b) => (
              <BadgeCard key={b.id} badge={b} />
            ))}
          </HorizontalScroller>
        </Section>
      </div>

      {/* Timeline / memory journey */}
      <div className="px-5">
        <Section eyebrow="Anılar" title="Son yolculukların">
          <ol className="relative">
            {/* Vertical line */}
            <span
              aria-hidden
              className="absolute left-[15px] top-2 bottom-2 w-px bg-border"
            />
            {TIMELINE.map((t, i) => (
              <li key={t.id} className={cn("relative pl-10", i > 0 && "mt-4")}>
                <span className="absolute left-0 top-1.5 h-8 w-8 rounded-full bg-gold-tint flex items-center justify-center ring-4 ring-background">
                  <StampIcon className="h-3.5 w-3.5 text-gold" strokeWidth={2.2} />
                </span>
                <div className="rounded-2xl bg-card border border-border/60 p-3.5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[15px] leading-tight text-foreground">
                        {t.title}
                      </p>
                      <p className="text-[11.5px] text-muted-foreground mt-1">
                        {t.meta}
                      </p>
                    </div>
                    <Badge tone="gold" eyebrow>
                      +{t.points}
                    </Badge>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {/* Wishlist */}
      <div>
        <div className="px-5">
          <Section
            eyebrow="Listen"
            title="Kaydettiklerin"
            action={{ label: "Tümü", onClick: () => navigate("/search") }}
            bleed
          >
            <HorizontalScroller gap="md" className="px-5">
              {wishlist.map((e) => (
                <div key={e.id} className="w-[260px] shrink-0">
                  <ExperienceCard
                    experience={e}
                    variant="rail"
                    onPress={() => navigate(`/experience/${e.id}`)}
                  />
                </div>
              ))}
            </HorizontalScroller>
          </Section>
        </div>
      </div>

      {/* Account list */}
      <div className="px-5">
        <Section eyebrow="Hesap" title="Ayarlar ve destek">
          <div className="rounded-2xl bg-card border border-border/60 overflow-hidden shadow-sm">
            <AccountRow icon={<Receipt />} label="Rezervasyonlarım" hint={`${TIMELINE.length} aktif`} onClick={() => navigate("/bookings")} />
            <AccountRow icon={<Heart />} label="Favoriler" hint={`${wishlist.length} deneyim`} />
            <AccountRow icon={<Award />} label="Pasaport detayı" hint={`%${totalProgress}`} />
            <AccountRow icon={<Settings />} label="Tercihler" last />
          </div>

          <div className="mt-4">
            <Button variant="ghost" block className="text-muted-foreground">
              Çıkış yap
            </Button>
          </div>
          <p className="text-center text-[11px] text-muted-foreground/70 mt-3">
            JoinIstanbul · v1.0
          </p>
        </Section>
      </div>
    </Screen>
  );
}

/* ---------- internal pieces ---------- */

function StampTile({ stamp }: { stamp: DistrictStamp }) {
  const { unlocked, name, date, progress } = stamp;
  return (
    <div
      className={cn(
        "relative aspect-square rounded-2xl flex flex-col items-center justify-center text-center px-2",
        "border transition-colors",
        unlocked
          ? "bg-card border-gold/30 shadow-sm"
          : "bg-surface-warm border-dashed border-border",
      )}
    >
      <span
        className={cn(
          "h-9 w-9 rounded-full flex items-center justify-center mb-1.5",
          unlocked
            ? "bg-gradient-gold text-primary-foreground shadow-sm"
            : "bg-muted text-muted-foreground/70",
        )}
      >
        {unlocked ? (
          <StampIcon className="h-4 w-4" strokeWidth={2.2} />
        ) : (
          <Lock className="h-3.5 w-3.5" strokeWidth={2.2} />
        )}
      </span>
      <p
        className={cn(
          "font-serif text-[13px] leading-tight",
          unlocked ? "text-foreground" : "text-muted-foreground/80",
        )}
      >
        {name}
      </p>
      <p
        className={cn(
          "text-[9.5px] uppercase tracking-[0.16em] font-semibold mt-0.5",
          unlocked ? "text-gold" : "text-muted-foreground/60",
        )}
      >
        {unlocked ? `%${progress}${date ? ` · ${date}` : ""}` : "Sis altında"}
      </p>
    </div>
  );
}

function BadgeCard({ badge }: { badge: BadgeItem }) {
  const Icon = badge.icon;
  return (
    <div
      className={cn(
        "w-[140px] shrink-0 rounded-2xl border p-3.5 flex flex-col items-start gap-2",
        badge.earned
          ? "bg-card border-border/60 shadow-sm"
          : "bg-surface-warm border-dashed border-border",
      )}
    >
      <span
        className={cn(
          "h-9 w-9 rounded-full flex items-center justify-center",
          badge.earned
            ? "bg-gold-tint text-gold"
            : "bg-muted text-muted-foreground/70",
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div>
        <p
          className={cn(
            "font-serif text-[14px] leading-tight",
            badge.earned ? "text-foreground" : "text-muted-foreground/80",
          )}
        >
          {badge.name}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
          {badge.hint}
        </p>
      </div>
    </div>
  );
}

function AccountRow({
  icon,
  label,
  hint,
  onClick,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  onClick?: () => void;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-muted/40 transition-colors",
        !last && "border-b border-border/60",
      )}
    >
      <span className="h-9 w-9 rounded-full bg-surface-warm flex items-center justify-center text-foreground/80 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <span className="flex-1 text-[14px] text-foreground">{label}</span>
      {hint && (
        <span className="text-[12px] text-muted-foreground">{hint}</span>
      )}
      <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
    </button>
  );
}
