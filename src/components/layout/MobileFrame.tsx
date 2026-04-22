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
    <div className="min-h-screen w-full bg-muted/40 flex justify-center">
      <div
        className={cn(
          "relative w-full max-w-[430px] min-h-screen bg-background shadow-editorial overflow-hidden",
          "flex flex-col",
          className,
        )}
      >
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
        {bottomBar ? (
          <div className="sticky bottom-0 left-0 right-0 z-40">{bottomBar}</div>
        ) : null}
      </div>
    </div>
  );
}

export default MobileFrame;