import { Compass } from "lucide-react";
import { PlaceholderScreen } from "@/components/layout/PlaceholderScreen";

export default function SearchScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Keşfet"
      title="Aradığın deneyimi bul"
      description="Kategori, mahalle ve ruh haline göre arama, filtre alt sayfası ve sonuç listesi burada yer alacak."
      icon={<Compass className="h-7 w-7" strokeWidth={1.75} />}
    />
  );
}