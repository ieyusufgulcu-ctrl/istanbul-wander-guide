import { ReactNode } from "react";

interface PlaceholderScreenProps {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

/**
 * PlaceholderScreen — temporary scaffold used while individual tab screens
 * are being designed. Establishes typography rhythm + safe-area behavior.
 */
export function PlaceholderScreen({ eyebrow, title, description, icon }: PlaceholderScreenProps) {
  return (
    <section className="safe-top px-6 pb-12 min-h-full flex flex-col">
      <div className="pt-8">
        <p className="text-[10.5px] uppercase tracking-[0.22em] text-gold font-semibold">
          {eyebrow}
        </p>
        <h1 className="font-serif text-[32px] leading-[1.08] text-foreground mt-2.5 text-balance">
          {title}
        </h1>
      </div>

      <div className="mt-10 flex-1 flex flex-col items-center justify-center text-center -translate-y-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gold/15 blur-xl" />
          <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-gold-tint to-background border border-gold/20 text-gold flex items-center justify-center shadow-soft">
            {icon}
          </div>
        </div>
        <p className="text-[14px] text-muted-foreground max-w-[280px] leading-relaxed">
          {description}
        </p>
        <div className="mt-7 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 border border-border/60">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
            Yakında · Prototip iskeleti
          </span>
        </div>
      </div>
    </section>
  );
}

export default PlaceholderScreen;