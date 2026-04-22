import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalScreenProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  /** Custom right-side action in the header (e.g. "Atla"). */
  rightAction?: ReactNode;
  /** Sticky footer area (e.g. primary CTA). */
  footer?: ReactNode;
  /** Hide the default close button on the left. */
  hideClose?: boolean;
  /** Background tone. */
  tone?: "default" | "warm" | "navy";
  children: ReactNode;
  className?: string;
}

const TONES = {
  default: "bg-background text-foreground",
  warm: "bg-surface-warm text-foreground",
  navy: "bg-navy text-primary-foreground",
} as const;

/**
 * ModalScreen
 * Full-height presented screen — used for onboarding, checkout, share, etc.
 * In React Native this maps to a stack screen with `presentation: 'modal'`.
 * Slides up from the bottom of the MobileFrame.
 */
export function ModalScreen({
  open,
  onClose,
  title,
  eyebrow,
  rightAction,
  footer,
  hideClose = false,
  tone = "default",
  children,
  className,
}: ModalScreenProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "absolute inset-0 z-50",
        "transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "absolute inset-0 flex flex-col",
          "transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-y-0" : "translate-y-full",
          TONES[tone],
          // Subtle top radius to echo a presented modal in iOS.
          "rounded-t-[1.75rem] overflow-hidden shadow-editorial",
          className,
        )}
      >
        <header className="safe-top">
          <div className="h-12 px-3 flex items-center justify-between gap-2">
            <div className="min-w-[44px]">
              {!hideClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Kapat"
                  className={cn(
                    "h-11 w-11 -ml-1 rounded-full flex items-center justify-center transition-colors",
                    tone === "navy"
                      ? "text-primary-foreground hover:bg-primary-foreground/10"
                      : "text-foreground hover:bg-muted/60 active:bg-muted",
                  )}
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              )}
            </div>

            <div className="flex-1 min-w-0 text-center">
              {eyebrow && (
                <p className={cn(
                  "text-[10px] uppercase tracking-[0.2em] font-semibold leading-none",
                  tone === "navy" ? "text-gold" : "text-muted-foreground",
                )}>
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className={cn(
                  "text-[15px] font-semibold truncate",
                  eyebrow && "mt-0.5",
                )}>
                  {title}
                </h2>
              )}
            </div>

            <div className="min-w-[44px] flex items-center justify-end">
              {rightAction}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>

        {footer && (
          <div
            className={cn(
              "border-t px-5 pt-3 pb-3 safe-bottom",
              tone === "navy"
                ? "border-primary-foreground/10 bg-navy"
                : "border-border/60 bg-background",
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalScreen;