import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  Compass,
  Flower2,
  MapPin,
  Palette,
  Search,
  Sparkles,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";
import { Screen, Section, HorizontalScroller } from "@/components/primitives";
import { Pill, Avatar, IconButton } from "@/components/atoms";
import {
  ExperienceCard,
  NeighborhoodCard,
  TrustCard,
} from "@/components/product";
import { experiences, neighborhoods } from "@/data/experiences";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "gastronomi", label: "Gastronomi", icon: UtensilsCrossed },
  { id: "sanat", label: "Sanat & Atölye", icon: Palette },
  { id: "wellness", label: "Wellness", icon: Flower2 },
  { id: "mahalle", label: "Mahalle", icon: Compass },
] as const;

type CategoryId = typeof CATEGORIES[number]["id"] | "all";

/**
 * HomeScreen — premium editorial Discover surface.
 * Composed entirely from primitives, atoms and product components.
 */
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const navigate = useNavigate();
  const goTo = (id: string) => navigate(`/experience/${id}`);

  const editorial = experiences.find((e) => e.flags?.includes("editor")) ?? experiences[0];
  const railPicks = experiences.filter((e) => e.id !== editorial.id).slice(0, 4);
  const trending = experiences.filter((e) => e.flags?.includes("trending"));

  return (
    <Screen padded={false} safeTop={false}>
      {/* 1. Greeting / editorial intro */}
      <header className="safe-top px-5 pt-3 pb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name="Ada" size="md" />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold leading-none">
              İyi akşamlar
            </p>
            <p className="mt-1 text-[14px] font-semibold text-foreground truncate">
              Ada, bu akşam İstanbul'da ne keşfedelim?
            </p>
          </div>
        </div>
        <IconButton
          icon={<Bell />}
          label="Bildirimler"
          variant="ghost"
          size="md"
          badged
        />
      </header>

      {/* Editorial title */}
      <div className="px-5 pt-2 pb-4">
        <h1 className="font-serif text-[26px] leading-[1.1] text-foreground text-balance">
          Şehrin sakin köşelerinde küçük buluşmalar.
        </h1>
      </div>

      {/* 2. Search entry */}
      <div className="px-5">
        <button
          type="button"
          className={cn(
            "w-full h-14 rounded-2xl bg-surface-elevated border border-border/70 shadow-soft",
            "flex items-center gap-3 px-4 text-left",
            "transition-all active:scale-[0.995] active:bg-muted/30",
          )}
          onClick={() => {
            /* navigates to /search later */
          }}
        >
          <Search className="h-5 w-5 text-muted-foreground shrink-0" strokeWidth={2} />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] text-foreground/90 font-medium truncate">
              Mahalle, şef ya da deneyim ara
            </p>
            <p className="text-[11.5px] text-muted-foreground truncate">
              "Karaköy meyhane" · "Balat seramik" · "Hamam"
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
          </span>
        </button>
      </div>

      {/* 3. Category shortcuts */}
      <div className="mt-5">
        <HorizontalScroller gap="sm">
          <Pill
            selected={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          >
            Tümü
          </Pill>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Pill
                key={cat.id}
                selected={activeCategory === cat.id}
                icon={<Icon strokeWidth={1.75} />}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Pill>
            );
          })}
        </HorizontalScroller>
      </div>

      {/* 4. Curated / personalized */}
      <div className="px-5">
        <Section
          eyebrow="Senin için seçildi"
          title="Bu hafta sonu için editör notu"
          description="Tat profiline ve sevdiğin mahallelere göre üç küçük öneri."
        >
          <ExperienceCard
            experience={editorial}
            variant="editorial"
            onPress={() => goTo(editorial.id)}
          />
        </Section>
      </div>

      {/* Rail of additional curated picks */}
      <div className="px-5">
        <Section
          title="Yakındaki küçük buluşmalar"
          action={{ label: "Tümünü gör" }}
          bleed
        >
          <HorizontalScroller>
            {railPicks.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                variant="rail"
                onPress={() => goTo(exp.id)}
              />
            ))}
          </HorizontalScroller>
        </Section>
      </div>

      {/* 5. Neighborhood spotlight */}
      <div className="px-5">
        <Section
          eyebrow="Mahalle rehberi"
          title="İstanbul'u semt semt keşfet"
          action={{ label: "Tüm mahalleler" }}
          bleed
        >
          <HorizontalScroller>
            {neighborhoods.map((nbh) => (
              <NeighborhoodCard
                key={nbh.id}
                name={nbh.name}
                tagline={nbh.tagline}
                experienceCount={nbh.experienceCount}
                imageUrl={nbh.imageUrl}
              />
            ))}
          </HorizontalScroller>
        </Section>
      </div>

      {/* 6. Progress / passport widget */}
      <div className="px-5">
        <Section title="Pasaportun" compact action={{ label: "Detay" }}>
          <PassportWidget />
        </Section>
      </div>

      {/* Trending list */}
      {trending.length > 0 && (
        <div className="px-5">
          <Section title="Bu aralar konuşulanlar" action={{ label: "Tümü" }}>
            <ul className="flex flex-col gap-1">
              {trending.map((exp) => (
                <li key={exp.id}>
                  <ExperienceCard
                    experience={exp}
                    variant="list"
                    onPress={() => goTo(exp.id)}
                  />
                </li>
              ))}
            </ul>
          </Section>
        </div>
      )}

      {/* 7. Trust reassurance */}
      <div className="px-5">
        <Section compact>
          <TrustCard kind="curated" tone="neutral" />
        </Section>
      </div>
    </Screen>
  );
}

/* ----------------------------- Passport widget ---------------------------- */

function PassportWidget() {
  const districts = 4;
  const totalDistricts = 12;
  const points = 1280;
  const progress = (districts / totalDistricts) * 100;

  return (
    <div className="rounded-2xl bg-gradient-navy text-primary-foreground p-4 overflow-hidden relative">
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 text-gold">
            <Trophy className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-[10.5px] uppercase tracking-[0.18em] text-gold-soft font-semibold leading-none">
              Join Puanları
            </p>
            <p className="mt-1 font-serif text-[22px] leading-none">
              {points.toLocaleString("tr-TR")}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-[12px] font-semibold text-gold-soft inline-flex items-center gap-0.5 active:opacity-70"
        >
          Ödüller
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12.5px] text-primary-foreground/80 inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold-soft" strokeWidth={2} />
            <span>
              <span className="font-semibold text-primary-foreground">{districts}</span>
              <span className="text-primary-foreground/70"> / {totalDistricts} semt keşfedildi</span>
            </span>
          </p>
          <p className="text-[11px] text-primary-foreground/60">
            Sıradaki: <span className="text-primary-foreground/90 font-medium">Cihangir</span>
          </p>
        </div>
        <div className="h-1.5 w-full rounded-full bg-primary-foreground/12 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-gold"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}