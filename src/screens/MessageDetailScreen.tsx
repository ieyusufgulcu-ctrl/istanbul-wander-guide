import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, MapPin, Send } from "lucide-react";
import { Screen } from "@/components/primitives/Screen";
import { TopBar } from "@/components/primitives/TopBar";
import { Avatar } from "@/components/atoms/Avatar";
import { IconButton } from "@/components/atoms/IconButton";
import { VerifiedBadge } from "@/components/atoms/VerifiedBadge";
import { experiences, getExperienceById } from "@/data/experiences";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  from: "host" | "guest";
  text: string;
  time: string;
}

const SEED: Message[] = [
  {
    id: "m1",
    from: "host",
    text: "Merhaba! Cuma akşamı için sizi bekliyoruz. Şarapla başlamak ister misiniz?",
    time: "14.20",
  },
  {
    id: "m2",
    from: "guest",
    text: "Merhaba, evet harika olur. Ortalama kaç kişi olacak?",
    time: "14.34",
  },
  {
    id: "m3",
    from: "host",
    text: "Toplam 6 kişiyiz. Ufak ve sıcak bir akşam olacak.",
    time: "14.41",
  },
];

export default function MessageDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exp = (id && getExperienceById(id)) ?? experiences[0];
  const [messages, setMessages] = useState<Message[]>(SEED);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { id: `m${m.length + 1}`, from: "guest", text: text.trim(), time: "Şimdi" },
    ]);
    setText("");
  };

  return (
    <Screen
      tone="warm"
      padded={false}
      contentClassName="!pb-0"
      topBar={
        <TopBar
          variant="solid"
          onBack={() => navigate(-1)}
          left={
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-11 w-11 rounded-full flex items-center justify-center text-foreground hover:bg-muted/60 active:bg-muted -ml-1"
              aria-label="Geri"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          }
          right={
            <button
              type="button"
              onClick={() => navigate(`/organizer/${exp.organizer.id}`)}
              className="flex items-center gap-2 pr-1"
            >
              <Avatar name={exp.organizer.name} size="sm" />
              <div className="text-right leading-tight">
                <div className="flex items-center gap-1 text-[13px] font-semibold text-foreground">
                  {exp.organizer.name.split(" ")[0]}
                  {exp.organizer.verified && (
                    <VerifiedBadge variant="icon" size="sm" />
                  )}
                </div>
                <p className="text-[10.5px] text-gold uppercase tracking-[0.14em] font-semibold">
                  Çevrimiçi
                </p>
              </div>
            </button>
          }
        />
      }
    >
      {/* Booking context strip */}
      <button
        type="button"
        onClick={() => navigate(`/experience/${exp.id}`)}
        className="mx-5 mt-3 rounded-2xl bg-card border border-border/60 px-3.5 py-3 flex items-center gap-3 text-left active:bg-muted/40 transition-colors"
      >
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted">
          <img
            src={exp.imageUrl}
            alt={exp.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10.5px] uppercase tracking-[0.14em] text-gold font-semibold">
            Aktif rezervasyon
          </p>
          <p className="text-[13.5px] font-semibold text-foreground truncate mt-0.5">
            {exp.title}
          </p>
          <p className="text-[11.5px] text-muted-foreground mt-0.5 inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Cum, 26 Nisan · 19.30 ·{" "}
            <MapPin className="h-3 w-3" /> {exp.neighborhood}
          </p>
        </div>
      </button>

      {/* Conversation */}
      <ol className="flex-1 px-5 pt-5 pb-3 flex flex-col gap-2">
        <li className="text-center text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
          Bugün
        </li>
        {messages.map((m) => (
          <li
            key={m.id}
            className={cn(
              "flex flex-col max-w-[78%]",
              m.from === "guest" ? "self-end items-end" : "self-start items-start",
            )}
          >
            <div
              className={cn(
                "rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug shadow-sm",
                m.from === "guest"
                  ? "bg-primary text-primary-foreground rounded-tr-md"
                  : "bg-background border border-border/60 text-foreground rounded-tl-md",
              )}
            >
              {m.text}
            </div>
            <span className="text-[10.5px] text-muted-foreground mt-1 px-1">
              {m.time}
            </span>
          </li>
        ))}
      </ol>

      {/* Composer */}
      <div className="sticky bottom-0 bg-background/85 backdrop-blur-xl border-t border-border/60 px-3 py-2.5 safe-bottom">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Bir mesaj yaz…"
            className="flex-1 h-11 rounded-full bg-surface-warm border border-border/60 px-4 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/60"
          />
          <IconButton
            icon={<Send />}
            label="Gönder"
            variant="primary"
            size="md"
            onClick={send}
          />
        </div>
        <p className="text-center text-[10.5px] text-muted-foreground/80 mt-2">
          Mesajlar yalnızca aktif rezervasyon süresince açıktır.
        </p>
      </div>
    </Screen>
  );
}
