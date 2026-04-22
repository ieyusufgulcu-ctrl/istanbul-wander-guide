import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  /** Optional title rendered in the sheet header. */
  title?: string;
  /** Optional eyebrow above the title. */
  eyebrow?: string;
  /** Sticky footer (e.g. "Uygula" / "Temizle"). */
  footer?: ReactNode;
  /** Snap height — 'auto' lets content size, others are viewport ratios. */
  size?: "auto" | "half" | "tall" | "full";
  /** Hide close button (e.g. confirmation sheets). */
  hideClose?: boolean;
  children: ReactNode;
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<BottomSheetProps["size"]>, string> = {
  auto: "max-h-[85%]",
  half: "h-[55%]",
  tall: "h-[80%]",
  full: "h-[94%]",
};

/**
 * BottomSheet
 * Mobile-native sheet that slides up from the bottom. UI-only for now —
 * the open/close state is controlled by the parent. Maps cleanly to
 * @gorhom/bottom-sheet in React Native.
 *
 * Composition:
 *   header (handle + title + close)
 *   scrollable body
 *   sticky footer (optional)
 */
export function BottomSheet({
  open,
  onClose,
  title,
  eyebrow,
  footer,
  size = "auto",
  hideClose = false,
  children,
  className,
}: BottomSheetProps) {
  // Close on Escape — convenience for the web prototype only.
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
        "absolute inset-0 z-50 flex flex-col justify-end",
        "transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Kapat"
        onClick={onClose}
        className="absolute inset-0 bg-navy/45 backdrop-blur-[2px]"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative w-full bg-background rounded-t-3xl shadow-sheet flex flex-col",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-y-0" : "translate-y-full",
          SIZE_CLASSES[size],
          className,
        )}
      >
        {/* Drag handle */}
        <div className="pt-2.5 pb-1 flex justify-center">
          <span className="block h-1 w-10 rounded-full bg-border" />
        </div>

        {(title || eyebrow || !hideClose) && (
          <div className="px-5 pt-1 pb-3 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {eyebrow && (
                <p className="text-[10.5px] uppercase tracking-[0.2em] text-gold font-semibold">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h3 className="font-serif text-[20px] leading-tight text-foreground mt-1">
                  {title}
                </h3>
              )}
            </div>
            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="h-9 w-9 -mr-1 rounded-full bg-muted/70 text-foreground flex items-center justify-center active:scale-95 transition-transform"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-5">
          {children}
        </div>

        {footer && (
          <div className="border-t border-border/60 bg-background px-5 pt-3 pb-3 safe-bottom">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default BottomSheet;