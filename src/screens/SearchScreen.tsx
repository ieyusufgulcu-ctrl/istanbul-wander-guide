import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  Map as MapIcon,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Screen, Section } from "@/components/primitives";
import { Pill, Chip, IconButton } from "@/components/atoms";
import {
  ExperienceCard,
  FilterSheet,
  EMPTY_FILTERS,
  type SearchFilters,
} from "@/components/product";
import { experiences } from "@/data/experiences";
import { Experience, ExperienceCategory } from "@/data/types";
import { cn } from "@/lib/utils";

const QUICK_CATEGORIES: { id: ExperienceCategory | "all"; label: string }[] = [
  { id: "all", label: "Tümü" },
  { id: "gastronomi", label: "Gastronomi" },
  { id: "sanat", label: "Sanat & Atölye" },
  { id: "wellness", label: "Wellness" },
  { id: "mahalle", label: "Mahalle" },
];

const SORT_LABELS: Record<SortKey, string> = {
  recommended: "Önerilenler",
  rating: "En yüksek puan",
  priceAsc: "Fiyat: artan",
  priceDesc: "Fiyat: azalan",
};

type SortKey = "recommended" | "rating" | "priceAsc" | "priceDesc";

/**
 * SearchScreen — practical companion to Home. Editorial tone, utility-first.
 * Composes Screen + atoms + product components.
 */
export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [quickCategory, setQuickCategory] = useState<ExperienceCategory | "all">("all");
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const results = useMemo(
    () => filterAndSort(experiences, { query, quickCategory, filters, sort }),
    [query, quickCategory, filters, sort],
  );

  const previewCount = useMemo(
    () =>
      filterAndSort(experiences, {
        query,
        quickCategory,
        filters,
        sort,
      }).length,
    [query, quickCategory, filters, sort],
  );

  const activeFilterCount = countActive(filters);

  return (
    <Screen padded={false} safeTop={false}>
      {/* 1. Search top area */}
      <header className="safe-top px-5 pt-3 pb-3 bg-background sticky top-0 z-20 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex-1 h-12 rounded-2xl bg-surface-warm border border-border/70",
              "flex items-center gap-2.5 pl-3.5 pr-2",
            )}
          >
            <Search className="h-4.5 w-4.5 text-muted-foreground shrink-0" strokeWidth={2} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mahalle, şef ya da deneyim ara"
              className="flex-1 min-w-0 bg-transparent outline-none text-[14px] font-medium text-foreground placeholder:text-muted-foreground"
              autoComplete="off"
              enterKeyHint="search"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Temizle"
                className="h-7 w-7 rounded-full bg-muted/80 text-foreground flex items-center justify-center active:scale-95 transition-transform"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.25} />
              </button>
            )}
          </div>
          <IconButton
            icon={<SlidersHorizontal />}
            label="Filtrele"
            variant={activeFilterCount > 0 ? "gold" : "solid"}
            size="md"
            badged={activeFilterCount > 0}
            onClick={() => setFilterOpen(true)}
          />
        </div>

        {/* 2. Quick category row */}
        <div className="-mx-5 mt-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-5">
            {QUICK_CATEGORIES.map((cat) => (
              <Pill
                key={cat.id}
                size="sm"
                selected={quickCategory === cat.id}
                onClick={() => setQuickCategory(cat.id)}
              >
                {cat.label}
              </Pill>
            ))}
          </div>
        </div>
      </header>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="px-5 pt-3">
          <ActiveFilterChips
            filters={filters}
            onChange={setFilters}
            onClearAll={() => setFilters(EMPTY_FILTERS)}
          />
        </div>
      )}

      {/* 3. Results meta row */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between gap-3">
        <p className="text-[12.5px] text-muted-foreground">
          <span className="font-semibold text-foreground">{results.length}</span>{" "}
          deneyim bulundu
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSortOpen(true)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[12.5px] font-semibold text-foreground hover:bg-muted/50 active:bg-muted transition-colors"
          >
            <ArrowDownUp className="h-3.5 w-3.5" strokeWidth={2} />
            {SORT_LABELS[sort]}
          </button>
          <span className="h-4 w-px bg-border/80" />
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[12.5px] font-semibold text-foreground hover:bg-muted/50 active:bg-muted transition-colors"
          >
            <MapIcon className="h-3.5 w-3.5" strokeWidth={2} />
            Harita
          </button>
        </div>
      </div>

      {/* 4. Results */}
      <div className="px-5">
        {results.length === 0 ? (
          <EmptyState onReset={() => { setFilters(EMPTY_FILTERS); setQuery(""); setQuickCategory("all"); }} />
        ) : (
          <ul className="flex flex-col">
            {results.map((exp) => (
              <li
                key={exp.id}
                className="py-3 border-b border-border/50 last:border-b-0"
              >
                <ExperienceCard experience={exp} variant="list" />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sheets */}
      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        value={filters}
        onApply={setFilters}
        resultCount={previewCount}
      />
      <SortSheet
        open={sortOpen}
        value={sort}
        onSelect={(v) => {
          setSort(v);
          setSortOpen(false);
        }}
        onClose={() => setSortOpen(false)}
      />
    </Screen>
  );
}

/* ------------------------------ active chips ------------------------------ */

function ActiveFilterChips({
  filters,
  onChange,
  onClearAll,
}: {
  filters: SearchFilters;
  onChange: (next: SearchFilters) => void;
  onClearAll: () => void;
}) {
  const items: { key: string; label: string; remove: () => void }[] = [];

  filters.categories.forEach((c) =>
    items.push({
      key: `cat-${c}`,
      label: CATEGORY_LABEL[c],
      remove: () =>
        onChange({ ...filters, categories: filters.categories.filter((x) => x !== c) }),
    }),
  );
  filters.neighborhoods.forEach((n) =>
    items.push({
      key: `nbh-${n}`,
      label: n,
      remove: () =>
        onChange({
          ...filters,
          neighborhoods: filters.neighborhoods.filter((x) => x !== n),
        }),
    }),
  );
  if (filters.duration !== "any")
    items.push({
      key: "dur",
      label: DURATION_LABEL[filters.duration],
      remove: () => onChange({ ...filters, duration: "any" }),
    });
  if (filters.price !== "any")
    items.push({
      key: "price",
      label: PRICE_LABEL[filters.price],
      remove: () => onChange({ ...filters, price: "any" }),
    });
  if (filters.groupSize !== "any")
    items.push({
      key: "grp",
      label: GROUP_LABEL[filters.groupSize],
      remove: () => onChange({ ...filters, groupSize: "any" }),
    });

  return (
    <div className="-mx-5">
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-5">
        {items.map((it) => (
          <Chip key={it.key} selected removable onRemove={it.remove}>
            {it.label}
          </Chip>
        ))}
        <button
          type="button"
          onClick={onClearAll}
          className="shrink-0 h-8 px-3 text-[12px] font-semibold text-muted-foreground hover:text-foreground active:opacity-70 transition-colors whitespace-nowrap"
        >
          Tümünü temizle
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- sort sheet ------------------------------- */

import { BottomSheet } from "@/components/primitives";

function SortSheet({
  open,
  onClose,
  value,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  value: SortKey;
  onSelect: (v: SortKey) => void;
}) {
  const opts: SortKey[] = ["recommended", "rating", "priceAsc", "priceDesc"];
  return (
    <BottomSheet open={open} onClose={onClose} title="Sırala" size="auto">
      <ul className="flex flex-col gap-1.5">
        {opts.map((k) => {
          const selected = value === k;
          return (
            <li key={k}>
              <button
                type="button"
                onClick={() => onSelect(k)}
                aria-pressed={selected}
                className={cn(
                  "w-full flex items-center justify-between h-12 px-4 rounded-2xl border text-left transition-colors",
                  selected
                    ? "bg-gold-tint border-gold/40 text-foreground"
                    : "bg-background border-border/70 text-foreground hover:bg-muted/40",
                )}
              >
                <span className="text-[14px] font-medium">{SORT_LABELS[k]}</span>
                <span
                  className={cn(
                    "h-5 w-5 rounded-full border flex items-center justify-center",
                    selected ? "border-gold" : "border-border",
                  )}
                >
                  {selected && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}

/* -------------------------------- empty UI -------------------------------- */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-surface-warm border border-border/70 flex items-center justify-center text-muted-foreground mb-4">
        <Search className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <p className="font-serif text-[18px] text-foreground">Sonuç bulunamadı</p>
      <p className="mt-1.5 text-[13px] text-muted-foreground">
        Filtreleri biraz gevşetip tekrar deneyebilirsin.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 h-10 px-4 rounded-full bg-primary text-primary-foreground text-[13px] font-semibold active:scale-[0.98] transition-transform"
      >
        Filtreleri sıfırla
      </button>
    </div>
  );
}

/* --------------------------------- logic --------------------------------- */

const CATEGORY_LABEL: Record<ExperienceCategory, string> = {
  gastronomi: "Gastronomi",
  sanat: "Sanat & Atölye",
  wellness: "Wellness",
  mahalle: "Mahalle",
};

const DURATION_LABEL: Record<SearchFilters["duration"], string> = {
  any: "",
  short: "1 sa altı",
  half: "1–2 sa",
  long: "2 sa üstü",
};

const PRICE_LABEL: Record<SearchFilters["price"], string> = {
  any: "",
  under500: "500 ₺ altı",
  "500to1000": "500 – 1.000 ₺",
  "1000to2000": "1.000 – 2.000 ₺",
  over2000: "2.000 ₺ üstü",
};

const GROUP_LABEL: Record<SearchFilters["groupSize"], string> = {
  any: "",
  solo: "Tek kişi",
  couple: "İki kişi",
  small: "3–6 kişi",
  group: "7+ kişi",
};

function countActive(f: SearchFilters) {
  return (
    f.categories.length +
    f.neighborhoods.length +
    (f.duration !== "any" ? 1 : 0) +
    (f.price !== "any" ? 1 : 0) +
    (f.groupSize !== "any" ? 1 : 0)
  );
}

function matchesPrice(price: number, range: SearchFilters["price"]) {
  switch (range) {
    case "any": return true;
    case "under500": return price < 500;
    case "500to1000": return price >= 500 && price < 1000;
    case "1000to2000": return price >= 1000 && price < 2000;
    case "over2000": return price >= 2000;
  }
}

function matchesDuration(min: number, range: SearchFilters["duration"]) {
  switch (range) {
    case "any": return true;
    case "short": return min < 60;
    case "half": return min >= 60 && min <= 120;
    case "long": return min > 120;
  }
}

function matchesGroup(groupStr: string, range: SearchFilters["groupSize"]) {
  if (range === "any") return true;
  // crude parse: take the upper bound from "1–6 kişi"
  const max = parseInt(groupStr.replace(/.*–\s*/, ""), 10) || 0;
  const min = parseInt(groupStr, 10) || 0;
  if (range === "solo") return min <= 1;
  if (range === "couple") return min <= 2 && max >= 2;
  if (range === "small") return max >= 3 && max <= 6;
  if (range === "group") return max >= 7;
  return true;
}

function filterAndSort(
  list: Experience[],
  args: {
    query: string;
    quickCategory: ExperienceCategory | "all";
    filters: SearchFilters;
    sort: SortKey;
  },
) {
  const q = args.query.trim().toLocaleLowerCase("tr");
  const f = args.filters;

  const filtered = list.filter((e) => {
    if (args.quickCategory !== "all" && e.category !== args.quickCategory) return false;
    if (f.categories.length && !f.categories.includes(e.category)) return false;
    if (f.neighborhoods.length && !f.neighborhoods.includes(e.neighborhood)) return false;
    if (!matchesDuration(e.durationMinutes, f.duration)) return false;
    if (!matchesPrice(e.price, f.price)) return false;
    if (!matchesGroup(e.groupSize, f.groupSize)) return false;
    if (q) {
      const hay = `${e.title} ${e.neighborhood} ${e.organizer.name}`.toLocaleLowerCase("tr");
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const sorted = [...filtered];
  if (args.sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
  else if (args.sort === "priceAsc") sorted.sort((a, b) => a.price - b.price);
  else if (args.sort === "priceDesc") sorted.sort((a, b) => b.price - a.price);
  return sorted;
}