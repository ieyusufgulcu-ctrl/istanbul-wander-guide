import { MessageCircle } from "lucide-react";
import { Screen, Section, TopBar, HorizontalScroller } from "@/components/primitives";
import { Button } from "@/components/atoms";
import {
  ExperienceCard,
  OrganizerRow,
  TrustCard,
} from "@/components/product";
import { experiences } from "@/data/experiences";

/**
 * Temporary preview of the product component layer. Will be removed when
 * the real Discover screen is built in Step 5.
 */
export default function ProductPreviewScreen() {
  return (
    <Screen
      topBar={
        <TopBar eyebrow="Tasarım Sistemi" title="Ürün bileşenleri" />
      }
    >
      {/* Editorial */}
      <Section eyebrow="Editöryel kart" title="ExperienceCard · editorial" flushTop>
        <ExperienceCard experience={experiences[0]} variant="editorial" onPress={() => {}} />
      </Section>

      {/* Rail */}
      <Section
        eyebrow="Yatay rail"
        title="ExperienceCard · rail"
        action={{ label: "Tümünü gör" }}
        bleed
      >
        <HorizontalScroller>
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              variant="rail"
              onPress={() => {}}
            />
          ))}
        </HorizontalScroller>
      </Section>

      {/* List */}
      <Section eyebrow="Liste" title="ExperienceCard · list">
        <div className="divide-y divide-border/60">
          {experiences.map((exp) => (
            <div key={exp.id} className="py-1">
              <ExperienceCard experience={exp} variant="list" onPress={() => {}} />
            </div>
          ))}
        </div>
      </Section>

      {/* OrganizerRow */}
      <Section eyebrow="Organizatör" title="OrganizerRow">
        <div className="space-y-3.5 rounded-2xl bg-surface-warm border border-border/60 p-4">
          <OrganizerRow
            organizer={experiences[0].organizer}
            size="sm"
          />
          <OrganizerRow
            organizer={experiences[1].organizer}
            withChevron
            onClick={() => {}}
          />
          <OrganizerRow
            organizer={experiences[2].organizer}
            size="lg"
            trailing={
              <Button variant="secondary" size="sm" leading={<MessageCircle />}>
                Mesaj
              </Button>
            }
          />
        </div>
      </Section>

      {/* TrustCards */}
      <Section eyebrow="Güven yüzeyleri" title="TrustCard">
        <div className="space-y-2.5">
          <TrustCard kind="cancellation" />
          <TrustCard kind="secure-payment" />
          <TrustCard kind="verified-organizer" tone="gold" />
          <TrustCard kind="instant-confirmation" />
          <TrustCard kind="curated" tone="navy" layout="stack" />
        </div>
      </Section>
    </Screen>
  );
}