import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Globe,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  MapPin,
  MessageCircle,
  Moon,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import { Screen } from "@/components/primitives/Screen";
import { Section } from "@/components/primitives/Section";
import { TopBar } from "@/components/primitives/TopBar";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

/**
 * SettingsScreen — lightweight account / preferences / help shell.
 * No auth, no real toggles — premium UI only.
 */
export default function SettingsScreen() {
  const navigate = useNavigate();
  return (
    <Screen
      tone="default"
      padded={false}
      topBar={
        <TopBar
          variant="solid"
          title="Ayarlar"
          onBack={() => navigate(-1)}
        />
      }
    >
      {/* Identity card */}
      <div className="px-5 pt-3">
        <div className="rounded-2xl bg-card border border-border/60 p-4 flex items-center gap-3.5 shadow-sm">
          <Avatar name="Selin Aydın" size="lg" ring />
          <div className="flex-1 min-w-0">
            <p className="font-serif text-[18px] leading-tight text-foreground">
              Selin Aydın
            </p>
            <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
              selin.aydin@joinistanbul.app
            </p>
          </div>
          <Badge tone="gold" eyebrow>
            Sefer 02
          </Badge>
        </div>
      </div>

      {/* Account */}
      <div className="px-5">
        <SettingsGroup eyebrow="Hesap" title="Profil bilgilerin">
          <Row icon={<User />} label="Kişisel bilgiler" hint="Ad, e-posta" />
          <Row
            icon={<Sparkles />}
            label="Tercihlerini güncelle"
            hint="Onboarding"
            onClick={() => navigate("/onboarding")}
          />
          <Row icon={<CreditCard />} label="Ödeme yöntemleri" hint="2 kart" />
          <Row icon={<MapPin />} label="Buluşma adresleri" last />
        </SettingsGroup>
      </div>

      {/* Preferences */}
      <div className="px-5">
        <SettingsGroup eyebrow="Tercihler" title="Uygulama">
          <ToggleRow icon={<Bell />} label="Bildirimler" defaultOn />
          <ToggleRow icon={<MessageCircle />} label="Mesaj uyarıları" defaultOn />
          <ToggleRow icon={<Moon />} label="Karanlık mod" />
          <Row
            icon={<Globe />}
            label="Dil"
            hint="Türkçe"
            last
          />
        </SettingsGroup>
      </div>

      {/* Privacy */}
      <div className="px-5">
        <SettingsGroup eyebrow="Gizlilik" title="Hesap güvenliği">
          <Row icon={<Lock />} label="Şifre" hint="Güncellenmedi" />
          <Row icon={<Shield />} label="İki adımlı doğrulama" hint="Kapalı" />
          <Row icon={<Info />} label="Veri ve gizlilik" last />
        </SettingsGroup>
      </div>

      {/* Help */}
      <div className="px-5">
        <SettingsGroup eyebrow="Destek" title="Yardım merkezi">
          <Row icon={<HelpCircle />} label="Sıkça sorulanlar" />
          <Row icon={<MessageCircle />} label="Bize ulaş" hint="7/24" />
          <Row icon={<Info />} label="Hakkımızda" last />
        </SettingsGroup>
      </div>

      {/* Logout */}
      <div className="px-5 mt-2">
        <Button
          variant="ghost"
          block
          icon={<LogOut />}
          className="text-muted-foreground"
        >
          Çıkış yap
        </Button>
      </div>

      <p className="text-center text-[11px] text-muted-foreground/70 mt-4 mb-2">
        JoinIstanbul · v1.0 · Made in İstanbul
      </p>
    </Screen>
  );
}

/* ---------- internal ---------- */

function SettingsGroup({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Section eyebrow={eyebrow} title={title} compact>
      <div className="rounded-2xl bg-card border border-border/60 overflow-hidden shadow-sm">
        {children}
      </div>
    </Section>
  );
}

function Row({
  icon,
  label,
  hint,
  onClick,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  onClick?: () => void;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-muted/40 transition-colors",
        !last && "border-b border-border/60",
      )}
    >
      <span className="h-9 w-9 rounded-full bg-surface-warm flex items-center justify-center text-foreground/80 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <span className="flex-1 text-[14px] text-foreground">{label}</span>
      {hint && (
        <span className="text-[12px] text-muted-foreground">{hint}</span>
      )}
      <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
    </button>
  );
}

function ToggleRow({
  icon,
  label,
  defaultOn,
}: {
  icon: React.ReactNode;
  label: string;
  defaultOn?: boolean;
}) {
  return (
    <div className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-border/60 last:border-b-0">
      <span className="h-9 w-9 rounded-full bg-surface-warm flex items-center justify-center text-foreground/80 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <span className="flex-1 text-[14px] text-foreground">{label}</span>
      <span
        aria-hidden
        className={cn(
          "relative h-6 w-10 rounded-full transition-colors",
          defaultOn ? "bg-gold" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-all",
            defaultOn ? "left-[18px]" : "left-0.5",
          )}
        />
      </span>
    </div>
  );
}
