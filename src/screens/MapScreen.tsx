import { Map as MapIcon } from "lucide-react";
import { PlaceholderScreen } from "@/components/layout/PlaceholderScreen";

export default function MapScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Harita"
      title="Şehrin sislerini arala"
      description="Mahalleleri keşfettikçe açılan sis perdesi, premium pinler ve ilerleme göstergeleri burada hayat bulacak."
      icon={<MapIcon className="h-7 w-7" strokeWidth={1.75} />}
    />
  );
}