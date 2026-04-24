import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Compass, MapPin, Sparkles, Stamp } from "lucide-react";
import { Screen } from "@/components/primitives/Screen";
import { Section } from "@/components/primitives/Section";
import { TopBar } from "@/components/primitives/TopBar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ExperienceCard } from "@/components/product/ExperienceCard";
import {
  experiences,
  getNeighborhoodBySlug,
  neighborhoods,
  neighborhoodSlug,
} from "@/data/experiences";
import { cn } from "@/lib/utils";

const NEIGHBORHOOD_BLURB: Record<string, string> = {
  Karaköy:
    "Tarihi liman, modern sofralar. Dar arka sokakların taş duvarları arasında küçük meyhaneler ve üçüncü nesil kahveciler.",
  Balat:
    "Renkli ahşap evler, sakin atölyeler. Yokuş başlarında çay ocakları, dar sokaklarda seramik ve kitap.",
  Kadıköy:
    "Moda sahili, yerel ritim. Pazar günleri sahil yürüyüşü, akşamları küçük grup deneyimleri.",
  Cihangir:
    "Boğaz manzaralı çatı katları, kitapçılar ve sakin akşamlar.",
  Üsküdar:
    "Yüz yıllık mermerler, sakin akşamlar. Tarihi hamamlar ve eski semt sofraları.",
  Kuzguncuk:
    "Renkli ahşap evler ve küçük bahçeler. Sahil kahvesi ve yavaş yürüyüş.",
  Moda:
    "Sahil kahvesi ve denize bakan parklar. Bisikletli, yavaş bir mahalle.",
  Fatih:
    "Tarihi yarımadanın kalbi. Eski hanlar, çarşı sokakları, geleneksel sofralar.",
};

export default function NeighborhoodDetailScreen() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Resolve from canonical slug, legacy id, or display name. Falls back to
  // the first neighborhood if nothing matches so the screen never blanks.
  const nbh = useMemo(
    () => getNeighborhoodBySlug(slug) ?? neighborhoods[0],
    [slug],
  );
  const canonical = neighborhoodSlug(nbh);

  // If the URL param isn't already the canonical slug, redirect so we don't
  // accumulate duplicate paths (e.g. /neighborhood/nbh-balat → /neighborhood/balat).
  useEffect(() => {
    if (slug && slug !== canonical) {
      navigate(`/neighborhood/${canonical}`, { replace: true });
    }
  }, [slug, canonical, navigate]);

  const list = useMemo(
    () => experiences.filter((e) => e.neighborhood === nbh.name),
    [nbh],
  );

  const blurb =
    NEIGHBORHOOD_BLURB[nbh.name] ?? "İstanbul'un az bilinen yüzlerinden biri.";

  return (
    <Screen
      tone="default"
      padded={false}
      safeTop={false}
      topBar={
        <TopBar
          variant="transparent"
          onBack={() => navigate(-1)}
          className="!bg-transparent !border-0 absolute"
        />
      }
    >
      {/* Hero */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={nbh.imageUrl}
          alt={nbh.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-navy/10" />
        <div className="absolute bottom-4 left-5 right-5 text-primary-foreground">
          <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
            Mahalle
          </p>
          <h1 className="font-serif text-[30px] leading-tight mt-1">
            {nbh.name}
          </h1>
          <p className="text-[13px] text-primary-foreground/85 mt-1.5 line-clamp-2 max-w-[80%]">
            {nbh.tagline}
          </p>
        </div>
      </div>

      {/* Blurb */}
      <div className="px-5 pt-5">
        <p className="font-serif text-[16px] leading-relaxed text-foreground/90 text-balance">
          {blurb}
        </p>
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <Badge tone="gold" dot>
            {list.length} deneyim
          </Badge>
          <Badge tone="neutral" dot>
            <Stamp className="h-3 w-3 mr-1" /> Pasaportta
          </Badge>
        </div>
      </div>

      {/* Vibe */}
      <div className="px-5">
        <Section title="Burası nasıl bir yer" compact>
          <ul className="grid grid-cols-2 gap-2.5">
            <VibeCell icon={<Compass />} label="Yavaş ritim" />
            <VibeCell icon={<Sparkles />} label="Editör seçimleri" />
            <VibeCell icon={<MapPin />} label="Sokak sokak" />
            <VibeCell icon={<Stamp />} label="Pasaport mührü" />
          </ul>
        </Section>
      </div>

      {/* Experiences */}
      <div className="px-5">
        <Section
          eyebrow="Deneyimler"
          title={`${nbh.name}'da ne yapabilirsin`}
          compact
        >
          <ul className="flex flex-col gap-3">
            {list.length > 0 ? (
              list.map((e) => (
                <li key={e.id}>
                  <ExperienceCard
                    experience={e}
                    variant="list"
                    onPress={() => navigate(`/experience/${e.id}`)}
                  />
                </li>
              ))
            ) : (
              <p className="text-[13px] text-muted-foreground">
                Bu mahalle için henüz seçki hazırlanmadı.
              </p>
            )}
          </ul>
        </Section>
      </div>

      {/* CTA */}
      <div className="px-5 mt-2 mb-2">
        <Button
          variant="primary"
          block
          size="lg"
          onClick={() => navigate("/map")}
        >
          Haritada gör
        </Button>
      </div>
    </Screen>
  );
}

function VibeCell({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="rounded-2xl bg-surface-warm border border-border/60 px-3.5 py-3 flex items-center gap-2.5">
      <span className="h-8 w-8 rounded-full bg-gold-tint text-gold flex items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <span className="text-[13px] font-semibold text-foreground">{label}</span>
    </li>
  );
}
