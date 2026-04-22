export type ExperienceCategory =
  | "gastronomi"
  | "sanat"
  | "wellness"
  | "mahalle";

export interface Organizer {
  id: string;
  name: string;
  /** Short Turkish role/subtitle, e.g. "Yerel şef · Karaköy". */
  role?: string;
  avatarUrl?: string;
  verified?: boolean;
  /** Total experiences hosted — used in OrganizerRow when shown. */
  hostedCount?: number;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  /** One-line editorial subtitle. */
  tagline?: string;
  category: ExperienceCategory;
  neighborhood: string;
  /** Duration in minutes. */
  durationMinutes: number;
  /** "1–6 kişi" formatted string for display. */
  groupSize: string;
  language?: string;
  imageUrl: string;
  organizer: Organizer;
  rating: number;
  reviewCount: number;
  /** Price in TRY for one person. */
  price: number;
  originalPrice?: number;
  /** Editor's-pick / featured / new etc. */
  flags?: Array<"editor" | "new" | "limited" | "trending">;
}