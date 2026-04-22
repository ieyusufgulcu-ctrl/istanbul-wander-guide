import karakoyImg from "@/assets/exp-karakoy-meyhane.jpg";
import balatImg from "@/assets/exp-balat-ceramic.jpg";
import kuzguncukImg from "@/assets/exp-kuzguncuk-walk.jpg";
import { Experience } from "./types";

/**
 * Believable Istanbul mock content. Keep neighborhoods, durations, prices
 * and ratings realistic. No fake urgency, no lorem ipsum.
 */
export const experiences: Experience[] = [
  {
    id: "exp-001",
    slug: "karakoy-meyhane-aksami",
    title: "Karaköy'de Şef Eşliğinde Meyhane Akşamı",
    tagline: "Küçük bir taş meyhanede, mevsimin mezeleri ve ev yapımı rakı.",
    category: "gastronomi",
    neighborhood: "Karaköy",
    durationMinutes: 150,
    groupSize: "1–6 kişi",
    language: "Türkçe & İngilizce",
    imageUrl: karakoyImg,
    organizer: {
      id: "org-elif",
      name: "Şef Elif Yılmaz",
      role: "Yerel şef · Karaköy",
      verified: true,
      hostedCount: 184,
    },
    rating: 4.9,
    reviewCount: 1284,
    price: 1450,
    flags: ["editor"],
  },
  {
    id: "exp-002",
    slug: "balat-seramik-atolyesi",
    title: "Balat'ta İznik Esintili Seramik Atölyesi",
    tagline: "Üç saatlik küçük grup atölyesi, kendi bardağını çevirip al.",
    category: "sanat",
    neighborhood: "Balat",
    durationMinutes: 180,
    groupSize: "2–8 kişi",
    language: "Türkçe",
    imageUrl: balatImg,
    organizer: {
      id: "org-mert",
      name: "Mert Demirci Atölyesi",
      role: "Seramik ustası · Balat",
      verified: true,
      hostedCount: 92,
    },
    rating: 4.8,
    reviewCount: 326,
    price: 890,
    flags: ["new"],
  },
  {
    id: "exp-003",
    slug: "kuzguncuk-yavas-mahalle-yuruyusu",
    title: "Kuzguncuk'ta Yavaş Mahalle Yürüyüşü",
    tagline: "Renkli ahşap evler, küçük bahçeler ve sahil kahvesi.",
    category: "mahalle",
    neighborhood: "Kuzguncuk",
    durationMinutes: 120,
    groupSize: "1–10 kişi",
    language: "Türkçe & İngilizce",
    imageUrl: kuzguncukImg,
    organizer: {
      id: "org-ayse",
      name: "Ayşe Kaya",
      role: "Mahalle rehberi · Üsküdar",
      verified: true,
      hostedCount: 240,
    },
    rating: 4.7,
    reviewCount: 412,
    price: 450,
    flags: ["trending"],
  },
];

export const getExperienceById = (id: string) =>
  experiences.find((e) => e.id === id);