import { User } from "lucide-react";
import { PlaceholderScreen } from "@/components/layout/PlaceholderScreen";

export default function ProfileScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Profil · Pasaport"
      title="İstanbul yolculuğun"
      description="Pasaport damgaların, Join puanların, rozetlerin ve anılar koleksiyonun burada birikecek."
      icon={<User className="h-7 w-7" strokeWidth={1.75} />}
    />
  );
}