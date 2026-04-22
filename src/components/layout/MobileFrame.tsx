import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileFrameProps {
  children: ReactNode;
  /** Persistent UI overlaid on top of the scroll area (e.g. tab bar). */
  bottomBar?: ReactNode;
  className?: string;
}

/**
 * MobileFrame
 * Centers a phone-sized canvas (max 430px) on any screen so Lovable feels like
 * a real device. Maps cleanly to a React Native SafeAreaView + ScrollView later.
 */
export function MobileFrame({ children, bottomBar, className }: MobileFrameProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-muted/60 via-muted/30 to-muted/60 flex justify-center sm:py-6">
      <div
        className={cn(
          "relative w-full max-w-[430px] min-h-screen sm:min-h-[844px] sm:max-h-[900px] bg-background shadow-editorial overflow-hidden",
          "flex flex-col sm:rounded-[2.25rem] sm:border sm:border-border/60",
          className,
        )}
      >
        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth">
          {children}
        </div>
        {bottomBar ? (
          <div className="shrink-0 z-40">{bottomBar}</div>
        ) : null}
      </div>
    </div>
  );
}

export default MobileFrame;