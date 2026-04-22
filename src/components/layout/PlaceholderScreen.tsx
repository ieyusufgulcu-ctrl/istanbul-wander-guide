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
    <section className="safe-top px-6 pb-10 min-h-full flex flex-col">
      <div className="pt-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">
          {eyebrow}
        </p>
        <h1 className="font-serif text-[34px] leading-[1.05] text-foreground mt-2 text-balance">
          {title}
        </h1>
      </div>

      <div className="mt-8 flex-1 flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 rounded-2xl bg-gold-tint text-gold flex items-center justify-center mb-5 shadow-soft">
          {icon}
        </div>
        <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
          {description}
        </p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
          Yakında · Prototip iskeleti
        </p>
      </div>
    </section>
  );
}

export default PlaceholderScreen;