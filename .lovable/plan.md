
# JoinIstanbul — MVP Prototype Plan

## Locked Decisions
- **Language:** Turkish-first copy throughout. No toggle. Components sized to also fit English later (avoid tight one-line buttons, allow wrap).
- **Tabs (5):** Ana Sayfa · Keşfet · Harita · Rezervasyonlar · Profil
- **Map:** UI-only premium prototype. No Leaflet/Mapbox/Google Maps. Stylized SVG/illustrated district surface with overlays, fog, pins, sheet.
- **Onboarding:** Lightweight multi-step modal flow, skippable. **No auth** in MVP.
- **No backend:** No Supabase, no payments, no APIs. Realistic mock data only.

## Product Snapshot
Premium, mobile-first, editorial Istanbul discovery + booking app with a fog-of-war map and a passport gamification layer. Turkish-first, warm, trustworthy, cinematic. Built in Lovable as a high-fidelity prototype that ports cleanly to React Native + Expo.

## Mobile Frame in Lovable
Wrap every route in a fixed mobile frame (max 430px width, centered, safe-area padding top/bottom, persistent bottom tab bar). This makes Lovable feel like a real device and forces native-friendly layout decisions.

## Information Architecture
1. **Discover (Ana Sayfa)** — editorial feed, collections, curated-for-you, neighborhood spotlights
2. **Search (Keşfet)** — search bar, category chips, filters, results
3. **Map (Harita)** — fog-of-war districts, pins, district sheet, progress
4. **Bookings (Rezervasyonlar)** — upcoming, past, tickets, organizer messages (secondary)
5. **Profile (Profil / Pasaport)** — passport, stamps, points, badges, memories, saved, settings

Cross-cutting: Experience Detail → Checkout → Confirmation; Onboarding modal; Memory capture (later).

## Route Map (Expo Router-shaped)
**Tabs:** `/(tabs)/home` · `/search` · `/map` · `/bookings` · `/profile`
**Stack:** `/experience/[id]` · `/organizer/[id]` · `/neighborhood/[slug]` · `/collection/[slug]` · `/booking/[id]`
**Modals:** `/onboarding` · `/booking/[id]/checkout` · `/booking/[id]/confirmation`
**Bottom sheets (in-screen):** map pin preview, filter sheet, date/time picker, guest count, save-to-collection, share

## Design System Foundations (build first)
**Tokens** — HSL palette (deep navy, navy, blue, gold, light gold, warm off-white, soft grays, semantics), Playfair Display + DM Sans, 4pt spacing, radii, soft elevation, motion, safe-area.
**Layout primitives** — `MobileFrame`, `Screen`, `TopBar`, `StickyBottomCTA`, `BottomTabBar`, `BottomSheet`, `ModalScreen`, `Section`, `HorizontalScroller`.
**Atoms** — Button, Pill, Chip, Badge, Avatar, Tag, IconButton, VerifiedBadge, RatingRow, MetadataRow, PriceBlock.
**Product components** — `ExperienceCard` (editorial / rail / list), `OrganizerRow`, `TrustCard`, `BookingSummaryCard`, `JoinPointsWidget`, `PassportStampWidget`, `BadgeWidget`, `DistrictProgressWidget`, `MemoryCard`, `MapPin`, `MapDistrictOverlay`, `FilterSheet`, `CategoryShortcutButton`.
**States** — every component defines default, loading (skeleton), empty, error, locked/unlocked, saved, active filter.

## Build Order in Lovable
1. Tokens + fonts + `MobileFrame` + `BottomTabBar` shell with 5 placeholder routes
2. Layout primitives (Screen, TopBar, StickyBottomCTA, BottomSheet, ModalScreen)
3. Atoms (Button, Pill, Chip, Badge, RatingRow, MetadataRow, VerifiedBadge, PriceBlock)
4. ExperienceCard variants + OrganizerRow + TrustCard
5. **Ana Sayfa (Discover)** — proves editorial system
6. **Experience Detail** — proves trust + sticky CTA
7. **Keşfet (Search)** + FilterSheet
8. **Checkout flow (modal)** + Confirmation (UI only, no payments)
9. **Harita (Map)** — stylized SVG surface, fog, pins, district sheet
10. **Profil / Pasaport** — stamps, points, badges, memories
11. **Rezervasyonlar** — upcoming/past + lightweight messages section
12. **Onboarding** modal flow (taste, neighborhoods, skip)
13. Polish pass — loading/empty/error states across all screens

Rule: do not advance until previous step's components are reusable.

## React Native / Expo Risks to Avoid
- No `:hover`-dependent UI; use pressed/active states
- No sidebars, multi-column desktop grids, web hero sections
- No native `<select>` / `<input type="date">` — use BottomSheet pickers
- No tooltips for essential info — inline only
- No `position: sticky` hacks — use explicit StickyHeader/StickyBottomCTA components
- No parallax/scroll-jacking
- Animate transform/opacity only (Reanimated-friendly)
- Use `lucide-react` now (maps to `lucide-react-native` later)
- Name components as native screens: `HomeScreen`, `ExperienceDetailScreen`, `BookingCheckoutModal`
- Keep routes flat and resource-based: `/experience/[id]`
- Design at 375–430px frame; allow text wrap for future EN copy

## MVP Screen Priority (in order)
1. Ana Sayfa (Discover)
2. Experience Detail
3. Keşfet (Search) + Filter sheet
4. Checkout + Confirmation (UI shells)
5. Harita (Map prototype)
6. Profil / Pasaport
7. Rezervasyonlar
8. Onboarding modal

This sequence proves the full story: **keşfet → güven → rezerve et → keşfetmeye devam et → biriktir.**

## Out of Scope for MVP
Real auth, real payments, Supabase/DB, real geolocation/maps, real chat backend, push notifications, organizer-side app, admin tools, i18n system.

## Mock Content Direction
Real Istanbul neighborhoods (Kadıköy, Balat, Karaköy, Üsküdar, Cihangir, Kuzguncuk, Moda, Beşiktaş, Fatih), believable organizer names, realistic durations/prices in TRY, warm golden-hour photography, Turkish-first concise editorial copy. No lorem ipsum, no fake urgency.
