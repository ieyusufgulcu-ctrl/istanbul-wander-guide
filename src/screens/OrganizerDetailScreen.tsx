import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Award,
  CalendarCheck,
  Languages,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Screen } from "@/components/primitives/Screen";
import { Section } from "@/components/primitives/Section";
import { TopBar } from "@/components/primitives/TopBar";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { RatingRow } from "@/components/atoms/RatingRow";
import { VerifiedBadge } from "@/components/atoms/VerifiedBadge";
import { ExperienceCard } from "@/components/product/ExperienceCard";
import { TrustCard } from "@/components/product/TrustCard";
import { experiences } from "@/data/experiences";
import { cn } from "@/lib/utils";

/**
 * OrganizerDetailScreen — premium, trustworthy organizer profile.
 * Composes existing Screen / Section / TrustCard / ExperienceCard.
 */
export default function OrganizerDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find any experience hosted by this organizer; fall back to the first one.
  const organizerExperiences = useMemo(
    () => experiences.filter((e) => e.organizer.id === id),
    [id],
  );
  const fallback = experiences[0];
  const sample = organizerExperiences[0] ?? fallback;
  const organizer = sample.organizer;
  const list = organizerExperiences.length > 0 ? organizerExperiences : [sample];

  // Aggregate stats across this organizer's experiences.
  const totalReviews = list.reduce((s, e) => s + e.reviewCount, 0);
  const avgRating =
    list.reduce((s, e) => s + e.rating, 0) / list.length;
  const neighborhoods = Array.from(new Set(list.map((e) => e.neighborhood)));

  return (
    <Screen
      tone="default"
      padded={false}
      topBar={
        <TopBar
          variant="blurred"
          title="Ev sahibi"
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
      {/* Identity hero */}
      <div className="px-5 pt-3">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-navy text-primary-foreground p-5 shadow-md">
          <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <Avatar
              src={organizer.avatarUrl}
              name={organizer.name}
              size="xl"
              ring
            />
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
                {organizer.role ?? "Yerel ev sahibi"}
              </p>
              <div className="mt-1 flex items-center gap-2 min-w-0">
                <h1 className="font-serif text-[24px] leading-tight truncate">
                  {organizer.name}
                </h1>
                {organizer.verified && <VerifiedBadge variant="icon" size="md" />}
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <RatingRow value={avgRating} count={totalReviews} size="sm" />
              </div>
            </div>
          </div>

          <div className="relative mt-5 grid grid-cols-3 gap-2">
            <StatCell
              value={String(organizer.hostedCount ?? list.length * 30)}
              label="Deneyim"
            />
            <StatCell
              value={avgRating.toFixed(1)}
              label="Ortalama"
            />
            <StatCell
              value={String(neighborhoods.length)}
              label="Semt"
            />
          </div>
        </div>
      </div>

      {/* Action row */}
      <div className="px-5 mt-4 flex gap-2.5">
        <Button
          variant="primary"
          size="md"
          block
          onClick={() => navigate(`/experience/${list[0].id}`)}
        >
          Deneyimleri gör
        </Button>
        <Button variant="outline" size="md" icon={<MessageCircle />}>
          Mesaj
        </Button>
      </div>

      {/* Bio */}
      <div className="px-5">
        <Section eyebrow="Hakkında" title="Kısaca tanışalım" compact>
          <p className="font-serif text-[16px] leading-relaxed text-foreground/90 text-balance">
            {organizer.name.split(" ")[0]}, {neighborhoods[0]}'da büyüdü ve
            yıllardır küçük gruplara şehrin daha sakin yüzünü gösteriyor.
            Misafirlerini hep aynı ilkeyle ağırlıyor: az kişi, çok özen, gerçek
            sohbet.
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            <BioRow
              icon={<MapPin />}
              label={`Aktif olduğu semtler: ${neighborhoods.join(", ")}`}
            />
            <BioRow
              icon={<Languages />}
              label={sample.language ?? "Türkçe & İngilizce"}
            />
            <BioRow
              icon={<CalendarCheck />}
              label="Genelde akşam saatlerinde küçük gruplarla buluşur"
            />
          </ul>
        </Section>
      </div>

      {/* Experiences */}
      <div className="px-5">
        <Section
          eyebrow="Deneyimler"
          title={`${organizer.name.split(" ")[0]} ile yapabileceklerin`}
          description="Tümü küçük gruplarla, özenle hazırlanmış."
          compact
        >
          <ul className="flex flex-col gap-3">
            {list.map((exp) => (
              <li key={exp.id}>
                <ExperienceCard
                  experience={exp}
                  variant="list"
                  onPress={() => navigate(`/experience/${exp.id}`)}
                />
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Trust */}
      <div className="px-5">
        <Section eyebrow="Güven" title="Neden güvenle ayırtabilirsin" compact>
          <div className="flex flex-col gap-2.5">
            <TrustCard kind="verified-organizer" />
            <TrustCard kind="cancellation" />
            <TrustCard kind="secure-payment" />
          </div>
        </Section>
      </div>

      {/* Recognition */}
      <div className="px-5">
        <Section compact>
          <div className="rounded-2xl bg-surface-warm border border-border/60 p-4 flex items-start gap-3">
            <span className="shrink-0 h-10 w-10 rounded-full bg-gold-tint flex items-center justify-center text-gold">
              <Award className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-gold font-semibold">
                Editör övgüsü
              </p>
              <p className="mt-1 font-serif text-[15px] leading-snug text-foreground">
                "Misafirlerini bir akrabası gibi karşılayan, İstanbul'un az
                bilinen sofralarından biri."
              </p>
              <p className="mt-2 text-[11.5px] text-muted-foreground">
                JoinIstanbul Editör Notu
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* Bottom rule */}
      <div className="px-5 mt-2 mb-2">
        <div className="flex items-center justify-center gap-2 text-[11.5px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
          Doğrulanmış ev sahibi · JoinIstanbul standartlarına uygun
        </div>
      </div>
    </Screen>
  );
}

/* ---------- internal ---------- */

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-background/10 backdrop-blur-sm border border-primary-foreground/10 p-3 text-center">
      <p className="font-serif text-[20px] leading-none">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/65 font-semibold mt-1.5">
        {label}
      </p>
    </div>
  );
}

function BioRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="shrink-0 mt-0.5 h-7 w-7 rounded-full bg-gold-tint text-gold flex items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5">
        {icon}
      </span>
      <p className="text-[13px] text-foreground/90 leading-relaxed">{label}</p>
    </li>
  );
}
