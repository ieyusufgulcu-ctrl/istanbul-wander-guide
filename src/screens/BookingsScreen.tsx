import { Ticket } from "lucide-react";
import { PlaceholderScreen } from "@/components/layout/PlaceholderScreen";

export default function BookingsScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Rezervasyonlar"
      title="Planların ve biletlerin"
      description="Yaklaşan rezervasyonlar, geçmiş deneyimler, biletler ve organizatörle hafif yazışmalar tek bir yerde."
      icon={<Ticket className="h-7 w-7" strokeWidth={1.75} />}
    />
  );
}