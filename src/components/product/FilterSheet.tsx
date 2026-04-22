import { useEffect, useState } from "react";
import { BottomSheet } from "@/components/primitives";
import { Chip, Button } from "@/components/atoms";
import { ExperienceCategory } from "@/data/types";

export interface SearchFilters {
  categories: ExperienceCategory[];
  neighborhoods: string[];
  duration: "any" | "short" | "half" | "long";
  price: "any" | "under500" | "500to1000" | "1000to2000" | "over2000";
  groupSize: "any" | "solo" | "couple" | "small" | "group";
}

export const EMPTY_FILTERS: SearchFilters = {
  categories: [],
  neighborhoods: [],
  duration: "any",
  price: "any",
  groupSize: "any",
};

const CATEGORY_OPTIONS: { id: ExperienceCategory; label: string }[] = [
  { id: "gastronomi", label: "Gastronomi" },
  { id: "sanat", label: "Sanat & Atölye" },
  { id: "wellness", label: "Wellness" },
  { id: "mahalle", label: "Mahalle" },
];

const NEIGHBORHOOD_OPTIONS = [
  "Karaköy",
  "Balat",
  "Kadıköy",
  "Cihangir",
  "Üsküdar",
  "Kuzguncuk",
  "Beşiktaş",
  "Moda",
  "Fatih",
];

const DURATION_OPTIONS: { id: SearchFilters["duration"]; label: string }[] = [
  { id: "any", label: "Hepsi" },
  { id: "short", label: "1 sa altı" },
  { id: "half", label: "1–2 sa" },
  { id: "long", label: "2 sa üstü" },
];

const PRICE_OPTIONS: { id: SearchFilters["price"]; label: string }[] = [
  { id: "any", label: "Hepsi" },
  { id: "under500", label: "500 ₺ altı" },
  { id: "500to1000", label: "500 – 1.000 ₺" },
  { id: "1000to2000", label: "1.000 – 2.000 ₺" },
  { id: "over2000", label: "2.000 ₺ üstü" },
];

const GROUP_OPTIONS: { id: SearchFilters["groupSize"]; label: string }[] = [
  { id: "any", label: "Fark etmez" },
  { id: "solo", label: "Tek kişi" },
  { id: "couple", label: "İki kişi" },
  { id: "small", label: "3–6 kişi" },
  { id: "group", label: "7+ kişi" },
];

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  value: SearchFilters;
  onApply: (next: SearchFilters) => void;
  /** Approximate count to show in the apply button. */
  resultCount?: number;
}

export function FilterSheet({
  open,
  onClose,
  value,
  onApply,
  resultCount,
}: FilterSheetProps) {
  const [draft, setDraft] = useState<SearchFilters>(value);

  // Reset draft whenever the sheet opens.
  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const toggleCategory = (id: ExperienceCategory) =>
    setDraft((d) => ({
      ...d,
      categories: d.categories.includes(id)
        ? d.categories.filter((c) => c !== id)
        : [...d.categories, id],
    }));

  const toggleNeighborhood = (name: string) =>
    setDraft((d) => ({
      ...d,
      neighborhoods: d.neighborhoods.includes(name)
        ? d.neighborhoods.filter((n) => n !== name)
        : [...d.neighborhoods, name],
    }));

  const reset = () => setDraft(EMPTY_FILTERS);

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      eyebrow="Filtrele"
      title="Aradığını daralt"
      size="tall"
      footer={
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="lg" onClick={reset}>
            Temizle
          </Button>
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => {
              onApply(draft);
              onClose();
            }}
          >
            {typeof resultCount === "number"
              ? `${resultCount} deneyimi göster`
              : "Uygula"}
          </Button>
        </div>
      }
    >
      <FilterGroup label="Kategori">
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <Chip
              key={opt.id}
              selected={draft.categories.includes(opt.id)}
              onClick={() => toggleCategory(opt.id)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Semt">
        <div className="flex flex-wrap gap-2">
          {NEIGHBORHOOD_OPTIONS.map((name) => (
            <Chip
              key={name}
              selected={draft.neighborhoods.includes(name)}
              onClick={() => toggleNeighborhood(name)}
            >
              {name}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Süre">
        <SegmentedRow
          options={DURATION_OPTIONS}
          value={draft.duration}
          onChange={(v) => setDraft((d) => ({ ...d, duration: v }))}
        />
      </FilterGroup>

      <FilterGroup label="Fiyat aralığı">
        <div className="flex flex-col gap-2">
          {PRICE_OPTIONS.map((opt) => (
            <RadioRow
              key={opt.id}
              label={opt.label}
              selected={draft.price === opt.id}
              onClick={() => setDraft((d) => ({ ...d, price: opt.id }))}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Kişi sayısı" last>
        <SegmentedRow
          options={GROUP_OPTIONS}
          value={draft.groupSize}
          onChange={(v) => setDraft((d) => ({ ...d, groupSize: v }))}
        />
      </FilterGroup>
    </BottomSheet>
  );
}

/* --------------------------------- helpers -------------------------------- */

function FilterGroup({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={last ? "pb-2" : "pb-5 mb-5 border-b border-border/60"}>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
        {label}
      </p>
      {children}
    </section>
  );
}

function SegmentedRow<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip
          key={opt.id}
          selected={value === opt.id}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  );
}

function RadioRow({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={
        "w-full flex items-center justify-between gap-3 h-12 px-4 rounded-2xl border text-left transition-colors active:scale-[0.99] " +
        (selected
          ? "bg-gold-tint border-gold/40 text-foreground"
          : "bg-background border-border/70 text-foreground hover:bg-muted/40")
      }
    >
      <span className="text-[13.5px] font-medium">{label}</span>
      <span
        className={
          "h-5 w-5 rounded-full border flex items-center justify-center " +
          (selected ? "border-gold" : "border-border")
        }
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
      </span>
    </button>
  );
}

export default FilterSheet;