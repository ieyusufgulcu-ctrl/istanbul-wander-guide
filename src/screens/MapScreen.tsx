import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Layers,
  Lock,
  MapPin,
  Navigation,
  Sparkles,
  Stamp,
} from "lucide-react";
import { Screen } from "@/components/primitives/Screen";
import { BottomSheet } from "@/components/primitives/BottomSheet";
import { HorizontalScroller } from "@/components/primitives/HorizontalScroller";
import { IconButton } from "@/components/atoms/IconButton";
import { Pill } from "@/components/atoms/Pill";
import { Tag } from "@/components/atoms/Tag";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ExperienceCard } from "@/components/product/ExperienceCard";
import { experiences } from "@/data/experiences";
import { cn } from "@/lib/utils";

/** Stylized district shape on the map canvas. */
interface DistrictArt {
  id: string;
  name: string;
  /** SVG path inside the 360x520 viewBox. */
  path: string;
  /** Marker anchor inside the viewBox. */
  cx: number;
  cy: number;
  /** Discovery progress 0–100. */
  progress: number;
  unlocked: boolean;
  /** Small editorial subtitle (TR). */
  tagline: string;
  experienceCount: number;
  /** id of an ExperienceCard to spotlight. */
  spotlightExperienceId?: string;
}

/**
 * Stylized Istanbul districts. This is intentionally UI art, not GIS —
 * the shapes evoke the Bosphorus split (Avrupa solda, Asya sağda) without
 * pretending to be a real map. Coordinates live in a 360x520 viewBox.
 */
const DISTRICTS: DistrictArt[] = [
  {
    id: "karakoy",
    name: "Karaköy",
    path: "M40,180 Q70,150 120,158 Q150,168 158,200 Q150,232 110,238 Q70,236 50,220 Q32,204 40,180 Z",
    cx: 100, cy: 198,
    progress: 72, unlocked: true,
    tagline: "Tarihi liman, modern sofralar",
    experienceCount: 38,
    spotlightExperienceId: "exp-001",
  },
  {
    id: "cihangir",
    name: "Cihangir",
    path: "M28,90 Q60,70 110,82 Q140,94 138,130 Q120,158 78,158 Q42,150 26,130 Q14,108 28,90 Z",
    cx: 78, cy: 118,
    progress: 45, unlocked: true,
    tagline: "Boğaz manzaralı çatı katları",
    experienceCount: 26,
    spotlightExperienceId: "exp-004",
  },
  {
    id: "balat",
    name: "Balat",
    path: "M50,260 Q90,248 140,262 Q160,290 148,320 Q120,340 80,336 Q48,322 40,300 Q38,278 50,260 Z",
    cx: 95, cy: 298,
    progress: 28, unlocked: true,
    tagline: "Renkli sokaklar, sakin atölyeler",
    experienceCount: 24,
    spotlightExperienceId: "exp-002",
  },
  {
    id: "fatih",
    name: "Fatih",
    path: "M50,360 Q100,348 158,362 Q174,390 162,420 Q120,438 78,432 Q44,418 38,396 Q34,374 50,360 Z",
    cx: 100, cy: 398,
    progress: 0, unlocked: false,
    tagline: "Tarihi yarımadanın kalbi",
    experienceCount: 52,
  },
  {
    id: "uskudar",
    name: "Üsküdar",
    path: "M210,150 Q252,138 300,152 Q322,180 314,210 Q280,232 240,228 Q208,216 200,192 Q198,168 210,150 Z",
    cx: 258, cy: 188,
    progress: 60, unlocked: true,
    tagline: "Yüz yıllık mermerler, sakin akşamlar",
    experienceCount: 31,
    spotlightExperienceId: "exp-005",
  },
  {
    id: "kuzguncuk",
    name: "Kuzguncuk",
    path: "M220,80 Q260,68 304,82 Q322,108 312,134 Q280,150 244,146 Q216,134 210,114 Q208,94 220,80 Z",
    cx: 262, cy: 112,
    progress: 18, unlocked: true,
    tagline: "Renkli ahşap evler, küçük bahçeler",
    experienceCount: 14,
    spotlightExperienceId: "exp-003",
  },
  {
    id: "kadikoy",
    name: "Kadıköy",
    path: "M210,260 Q258,250 312,266 Q330,294 318,326 Q282,346 240,342 Q208,326 200,302 Q198,280 210,260 Z",
    cx: 260, cy: 300,
    progress: 84, unlocked: true,
    tagline: "Moda sahili ve yerel ritim",
    experienceCount: 46,
    spotlightExperienceId: "exp-006",
  },
  {
    id: "moda",
    name: "Moda",
    path: "M218,360 Q258,348 304,360 Q322,386 312,414 Q280,432 244,428 Q214,416 208,394 Q206,374 218,360 Z",
    cx: 260, cy: 396,
    progress: 0, unlocked: false,
    tagline: "Sahil kahvesi ve denize bakan parklar",
    experienceCount: 19,
  },
];

const LAYERS = [
  { id: "all", label: "Tümü" },
  { id: "gastronomi", label: "Gastronomi" },
  { id: "sanat", label: "Sanat" },
  { id: "wellness", label: "Wellness" },
  { id: "mahalle", label: "Mahalle" },
] as const;

type LayerId = (typeof LAYERS)[number]["id"];

export default function MapScreen() {
  const navigate = useNavigate();
  const [layer, setLayer] = useState<LayerId>("all");
  const [activeId, setActiveId] = useState<string>("karakoy");
  const [sheetExpanded, setSheetExpanded] = useState(false);

  const active = useMemo(
    () => DISTRICTS.find((d) => d.id === activeId)!,
    [activeId],
  );

  const spotlight = useMemo(
    () =>
      experiences.find((e) => e.id === active.spotlightExperienceId) ??
      experiences[0],
    [active],
  );

  const unlockedDistricts = DISTRICTS.filter((d) => d.unlocked).length;
  const totalProgress = Math.round(
    DISTRICTS.reduce((sum, d) => sum + d.progress, 0) / DISTRICTS.length,
  );

  return (
    <Screen padded={false} contentClassName="!pb-0" tone="default">
      {/* Map canvas */}
      <div className="relative h-full w-full overflow-hidden bg-[hsl(207_45%_12%)]">
        {/* Atmospheric water gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(207_55%_10%)] via-[hsl(207_50%_14%)] to-[hsl(207_45%_18%)]" />
        {/* Subtle grain via radial highlights */}
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,hsl(46_89%_38%/0.08),transparent_55%),radial-gradient(circle_at_75%_80%,hsl(204_63%_47%/0.12),transparent_60%)]" />

        {/* SVG district art */}
        <svg
          viewBox="0 0 360 520"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            {/* Bosphorus channel */}
            <linearGradient id="bosphorus" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(204 63% 35%)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="hsl(204 63% 25%)" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="land-unlocked" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(36 32% 92%)" stopOpacity="0.96" />
              <stop offset="100%" stopColor="hsl(36 30% 84%)" stopOpacity="0.92" />
            </linearGradient>
            <linearGradient id="land-locked" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(207 35% 22%)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="hsl(207 40% 16%)" stopOpacity="0.95" />
            </linearGradient>
            <radialGradient id="fog" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(207 50% 10%)" stopOpacity="0" />
              <stop offset="100%" stopColor="hsl(207 50% 8%)" stopOpacity="0.85" />
            </radialGradient>
            <pattern id="locked-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="hsl(207 30% 30%)" strokeWidth="1" opacity="0.35" />
            </pattern>
          </defs>

          {/* Bosphorus channel */}
          <path
            d="M170,0 C175,80 168,150 178,230 C185,310 172,400 178,520 L196,520 C198,400 210,310 200,230 C192,150 200,80 192,0 Z"
            fill="url(#bosphorus)"
          />
          {/* Faint shoreline highlight */}
          <path
            d="M170,0 C175,80 168,150 178,230 C185,310 172,400 178,520"
            stroke="hsl(46 89% 50% / 0.35)"
            strokeWidth="0.6"
            fill="none"
          />
          <path
            d="M192,0 C200,80 192,150 200,230 C210,310 198,400 196,520"
            stroke="hsl(46 89% 50% / 0.35)"
            strokeWidth="0.6"
            fill="none"
          />

          {/* Districts */}
          {DISTRICTS.map((d) => {
            const isActive = d.id === activeId;
            return (
              <g key={d.id}>
                <path
                  d={d.path}
                  fill={d.unlocked ? "url(#land-unlocked)" : "url(#land-locked)"}
                  stroke={
                    isActive
                      ? "hsl(46 89% 50%)"
                      : d.unlocked
                        ? "hsl(46 89% 50% / 0.35)"
                        : "hsl(207 25% 30%)"
                  }
                  strokeWidth={isActive ? 1.6 : 0.8}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => {
                    setActiveId(d.id);
                    setSheetExpanded(false);
                  }}
                />
                {!d.unlocked && (
                  <path d={d.path} fill="url(#locked-hatch)" pointerEvents="none" />
                )}
                {/* District label */}
                <text
                  x={d.cx}
                  y={d.cy - 6}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fontSize="9"
                  fontFamily="'Playfair Display', Georgia, serif"
                  fontWeight="600"
                  fill={d.unlocked ? "hsl(207 62% 15%)" : "hsl(36 16% 70%)"}
                  opacity={d.unlocked ? 0.9 : 0.6}
                >
                  {d.name}
                </text>
                {d.unlocked && (
                  <text
                    x={d.cx}
                    y={d.cy + 6}
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                    fontSize="6"
                    letterSpacing="1.2"
                    fontWeight="700"
                    fill="hsl(46 89% 38%)"
                  >
                    %{d.progress}
                  </text>
                )}
              </g>
            );
          })}

          {/* Fog overlay around the edges to suggest hidden territory */}
          <rect x="0" y="0" width="360" height="520" fill="url(#fog)" pointerEvents="none" />
        </svg>

        {/* Premium markers (HTML overlay so we can use tap targets / animations) */}
        <div className="absolute inset-0 pointer-events-none">
          {DISTRICTS.map((d) => {
            const isActive = d.id === activeId;
            // Convert viewBox coords to %.
            const left = `${(d.cx / 360) * 100}%`;
            const top = `${((d.cy + 18) / 520) * 100}%`;
            return (
              <button
                key={d.id}
                type="button"
                aria-label={`${d.name} bölgesi`}
                onClick={() => {
                  setActiveId(d.id);
                  setSheetExpanded(false);
                }}
                style={{ left, top }}
                className={cn(
                  "pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2",
                  "h-9 w-9 rounded-full flex items-center justify-center",
                  "transition-all duration-300",
                  isActive ? "scale-110" : "scale-95",
                )}
              >
                {/* Pulse ring for active unlocked */}
                {isActive && d.unlocked && (
                  <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping" />
                )}
                <span
                  className={cn(
                    "relative h-7 w-7 rounded-full flex items-center justify-center",
                    "ring-2 ring-background/90 shadow-lg",
                    d.unlocked
                      ? isActive
                        ? "bg-gradient-to-br from-gold-soft to-gold text-primary-foreground"
                        : "bg-background text-gold"
                      : "bg-navy-soft/80 text-muted-foreground",
                  )}
                >
                  {d.unlocked ? (
                    <Stamp className="h-3.5 w-3.5" strokeWidth={2.2} />
                  ) : (
                    <Lock className="h-3 w-3" strokeWidth={2.2} />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Top utility bar */}
        <div className="absolute top-0 left-0 right-0 safe-top">
          <div className="px-4 pt-2 pb-3 flex items-start justify-between gap-3">
            <div className="rounded-2xl bg-background/85 backdrop-blur-md border border-border/40 px-3.5 py-2 shadow-sm">
              <p className="text-[9.5px] uppercase tracking-[0.2em] text-gold font-semibold">
                Pasaport
              </p>
              <p className="font-serif text-[15px] leading-tight text-foreground mt-0.5">
                {unlockedDistricts}/{DISTRICTS.length} semt · %{totalProgress}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IconButton
                icon={<Layers />}
                label="Katmanlar"
                variant="glass"
                size="md"
              />
              <IconButton
                icon={<Navigation />}
                label="Konumuma git"
                variant="glass"
                size="md"
              />
            </div>
          </div>

          {/* Layer pills */}
          <div className="pl-4 pr-2">
            <HorizontalScroller gap="sm">
              {LAYERS.map((l) => (
                <Pill
                  key={l.id}
                  size="sm"
                  selected={layer === l.id}
                  onClick={() => setLayer(l.id)}
                  className={cn(
                    layer !== l.id &&
                      "bg-background/85 backdrop-blur-md border-border/40",
                  )}
                >
                  {l.label}
                </Pill>
              ))}
            </HorizontalScroller>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute right-3 bottom-[280px] flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 rounded-full bg-background/85 backdrop-blur-md border border-border/40 px-2.5 py-1">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-[10px] font-semibold text-foreground">Açık</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-background/85 backdrop-blur-md border border-border/40 px-2.5 py-1">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
            <span className="text-[10px] font-semibold text-foreground">Sis altında</span>
          </div>
        </div>

        {/* Persistent bottom sheet */}
        <div
          className={cn(
            "absolute left-0 right-0 bottom-0 bg-background rounded-t-3xl shadow-sheet",
            "transition-[height] duration-300 ease-out flex flex-col",
            sheetExpanded ? "h-[68%]" : "h-[260px]",
          )}
        >
          {/* Drag handle */}
          <button
            type="button"
            onClick={() => setSheetExpanded((v) => !v)}
            aria-label={sheetExpanded ? "Daralt" : "Genişlet"}
            className="pt-2.5 pb-1.5 flex justify-center"
          >
            <span className="block h-1 w-10 rounded-full bg-border" />
          </button>

          {/* Header */}
          <div className="px-5 pt-1 pb-3 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
                  {active.unlocked ? "Açık semt" : "Sis altında"}
                </p>
                {active.unlocked && active.progress >= 70 && (
                  <Badge tone="gold">Pasaport mührü</Badge>
                )}
              </div>
              <h3 className="font-serif text-[22px] leading-tight text-foreground mt-1">
                {active.name}
              </h3>
              <p className="text-[12.5px] text-muted-foreground mt-0.5">
                {active.tagline}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-serif text-[20px] leading-none text-foreground">
                %{active.progress}
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mt-1">
                Keşif
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-5">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  active.unlocked
                    ? "bg-gradient-to-r from-gold-soft to-gold"
                    : "bg-muted-foreground/40",
                )}
                style={{ width: `${Math.max(active.progress, active.unlocked ? 4 : 0)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                <span>{active.experienceCount} deneyim</span>
              </div>
              {active.unlocked ? (
                <div className="flex items-center gap-1.5 text-[11.5px] text-gold font-semibold">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                  <span>Editör seçimi var</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" strokeWidth={2} />
                  <span>Bir deneyim yap, açılsın</span>
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          {active.unlocked ? (
            <div className="flex-1 overflow-y-auto px-5 pt-4 pb-5">
              {!sheetExpanded ? (
                <ExperienceCard
                  experience={spotlight}
                  variant="list"
                  onPress={() => navigate(`/experience/${spotlight.id}`)}
                />
              ) : (
                <div className="space-y-1">
                  <Tag tone="gold" icon={<Sparkles />}>
                    {active.name} öne çıkanlar
                  </Tag>
                  <div className="mt-3 space-y-3 divide-y divide-border/60">
                    {experiences
                      .filter((e) => e.neighborhood === active.name || e.id === active.spotlightExperienceId)
                      .slice(0, 4)
                      .map((exp) => (
                        <div key={exp.id} className="pt-3 first:pt-0">
                          <ExperienceCard
                            experience={exp}
                            variant="list"
                            onPress={() => navigate(`/experience/${exp.id}`)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 px-5 pt-5 pb-5">
              <div className="rounded-2xl bg-surface-warm border border-border/60 p-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-9 w-9 rounded-full bg-navy/8 flex items-center justify-center text-navy">
                    <Compass className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-[15px] text-foreground leading-tight">
                      {active.name} henüz sis altında
                    </p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                      Yakındaki bir deneyimi tamamladığında bu semt pasaportuna eklenecek.
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="md"
                  block
                  className="mt-4"
                  onClick={() => navigate("/search")}
                >
                  Yakındaki deneyimleri gör
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Screen>
  );
}