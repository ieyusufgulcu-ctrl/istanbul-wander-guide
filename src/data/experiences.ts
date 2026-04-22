import karakoyImg from "@/assets/exp-karakoy-meyhane.jpg";
import balatImg from "@/assets/exp-balat-ceramic.jpg";
import kuzguncukImg from "@/assets/exp-kuzguncuk-walk.jpg";
import cihangirImg from "@/assets/exp-cihangir-rooftop.jpg";
import uskudarImg from "@/assets/exp-uskudar-hammam.jpg";
import modaImg from "@/assets/exp-moda-cafe.jpg";
import nbhBalat from "@/assets/nbh-balat.jpg";
import nbhKarakoy from "@/assets/nbh-karakoy.jpg";
import nbhKadikoy from "@/assets/nbh-kadikoy.jpg";
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
  {
    id: "exp-004",
    slug: "cihangir-catikatinda-aksam-yemegi",
    title: "Cihangir'de Çatı Katında Akşam Yemeği",
    tagline: "Boğaz manzaralı küçük terasta, mevsimin tatları.",
    category: "gastronomi",
    neighborhood: "Cihangir",
    durationMinutes: 165,
    groupSize: "2–8 kişi",
    language: "Türkçe & İngilizce",
    imageUrl: cihangirImg,
    organizer: {
      id: "org-deniz",
      name: "Deniz Aksoy",
      role: "Ev şefi · Cihangir",
      verified: true,
      hostedCount: 76,
    },
    rating: 4.9,
    reviewCount: 218,
    price: 1750,
    flags: ["editor"],
  },
  {
    id: "exp-005",
    slug: "uskudar-tarihi-hamam-deneyimi",
    title: "Üsküdar'da Tarihi Hamam Deneyimi",
    tagline: "Yüz yıllık mermerlerde, yavaş bir öğleden sonra.",
    category: "wellness",
    neighborhood: "Üsküdar",
    durationMinutes: 90,
    groupSize: "1–4 kişi",
    language: "Türkçe & İngilizce",
    imageUrl: uskudarImg,
    organizer: {
      id: "org-cemile",
      name: "Cemile Hanım Hamamı",
      role: "Tarihi hamam · Üsküdar",
      verified: true,
      hostedCount: 540,
    },
    rating: 4.8,
    reviewCount: 932,
    price: 1200,
  },
  {
    id: "exp-006",
    slug: "moda-sahil-kahve-turu",
    title: "Moda Sahilinde Üçüncü Nesil Kahve Turu",
    tagline: "Üç küçük kavurucuda tadım, kısa sahil yürüyüşü.",
    category: "gastronomi",
    neighborhood: "Kadıköy",
    durationMinutes: 120,
    groupSize: "2–8 kişi",
    language: "Türkçe & İngilizce",
    imageUrl: modaImg,
    organizer: {
      id: "org-burak",
      name: "Burak Tunç",
      role: "Kahve uzmanı · Moda",
      verified: true,
      hostedCount: 158,
    },
    rating: 4.7,
    reviewCount: 287,
    price: 620,
    flags: ["trending"],
  },
];

export const getExperienceById = (id: string) =>
  experiences.find((e) => e.id === id);

export interface Neighborhood {
  id: string;
  name: string;
  tagline: string;
  experienceCount: number;
  imageUrl: string;
}

export const neighborhoods: Neighborhood[] = [
  {
    id: "nbh-balat",
    name: "Balat",
    tagline: "Renkli sokaklar, sakin atölyeler",
    experienceCount: 24,
    imageUrl: nbhBalat,
  },
  {
    id: "nbh-karakoy",
    name: "Karaköy",
    tagline: "Tarihi liman, modern sofralar",
    experienceCount: 38,
    imageUrl: nbhKarakoy,
  },
  {
    id: "nbh-kadikoy",
    name: "Kadıköy",
    tagline: "Moda sahili ve yerel ritim",
    experienceCount: 46,
    imageUrl: nbhKadikoy,
  },
];