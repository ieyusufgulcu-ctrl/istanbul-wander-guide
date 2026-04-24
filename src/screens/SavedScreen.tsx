import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Screen } from "@/components/primitives/Screen";
import { Section } from "@/components/primitives/Section";
import { TopBar } from "@/components/primitives/TopBar";
import { ExperienceCard } from "@/components/product/ExperienceCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import { useSavedExperiences } from "@/hooks/useSavedExperiences";
import { getExperienceById } from "@/data/experiences";

export default function SavedScreen() {
  const navigate = useNavigate();
  const { ids } = useSavedExperiences();

  const items = useMemo(
    () =>
      ids
        .map((id) => getExperienceById(id))
        .filter((e): e is NonNullable<typeof e> => Boolean(e)),
    [ids],
  );

  return (
    <Screen
      padded={false}
      topBar={
        <TopBar
          title="Kaydedilenler"
          onBack={() => navigate(-1)}
          variant="solid"
        />
      }
    >
      <div className="px-5 pt-3">
        <Section
          eyebrow="Listen"
          title={items.length > 0 ? `${items.length} deneyim` : "Henüz boş"}
          description="Beğendiğin deneyimleri burada toplayabilir, sonra tekrar bakabilirsin."
          compact
          flushTop
        >
          {items.length === 0 ? (
            <EmptyState
              framed
              icon={<Heart />}
              title="Henüz bir şey kaydetmedin"
              description="Beğendiğin bir deneyimin sağ üstündeki kalbe dokun, burada toplansın."
              actionLabel="Keşfetmeye başla"
              onAction={() => navigate("/search")}
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((e) => (
                <li key={e.id}>
                  <ExperienceCard
                    experience={e}
                    variant="list"
                    onPress={() => navigate(`/experience/${e.id}`)}
                  />
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </Screen>
  );
}
