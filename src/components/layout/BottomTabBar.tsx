import { NavLink } from "react-router-dom";
import { Home, Compass, Map, Ticket, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = {
  to: string;
  label: string;
  icon: typeof Home;
};

const TABS: Tab[] = [
  { to: "/", label: "Ana Sayfa", icon: Home },
  { to: "/search", label: "Keşfet", icon: Compass },
  { to: "/map", label: "Harita", icon: Map },
  { to: "/bookings", label: "Rezervasyon", icon: Ticket },
  { to: "/profile", label: "Profil", icon: User },
];

/**
 * BottomTabBar — 5 thumb-friendly tabs. Maps to Expo Router (tabs) later.
 * Each item is min 48x48 with safe-area aware bottom padding.
 */
export function BottomTabBar() {
  return (
    <nav
      aria-label="Ana gezinme"
      className="relative bg-background/92 backdrop-blur-xl border-t border-border/70 safe-bottom"
    >
      <div className="pointer-events-none absolute -top-6 inset-x-0 h-6 bg-gradient-to-t from-background to-transparent" />
      <ul className="grid grid-cols-5 px-2 pt-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <li key={tab.to}>
              <NavLink
                to={tab.to}
                end={tab.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "min-h-[56px] flex flex-col items-center justify-center gap-1.5 px-1 py-1.5 rounded-xl transition-all duration-200",
                    "active:scale-[0.96] active:bg-muted/70",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative flex items-center justify-center h-6 w-6">
                      <Icon
                        className={cn(
                          "h-[22px] w-[22px] transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                        strokeWidth={isActive ? 2.1 : 1.6}
                      />
                      {isActive && (
                        <span className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-gold" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] leading-none tracking-[0.02em] transition-colors",
                        isActive ? "font-semibold text-primary" : "font-medium",
                      )}
                    >
                      {tab.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomTabBar;