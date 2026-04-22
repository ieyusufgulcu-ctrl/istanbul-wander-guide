import { Sparkles } from "lucide-react";
import { PlaceholderScreen } from "@/components/layout/PlaceholderScreen";

export default function HomeScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Ana Sayfa"
      title="İstanbul'u yeniden keşfet"
      description="Editöryel koleksiyonlar, sana özel öneriler ve mahalle hikâyeleri burada belirecek."
      icon={<Sparkles className="h-7 w-7" strokeWidth={1.75} />}
    />
  );
}