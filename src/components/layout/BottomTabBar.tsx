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
      className="bg-background/95 backdrop-blur-md border-t border-border safe-bottom"
    >
      <ul className="grid grid-cols-5 px-1 pt-1.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <li key={tab.to}>
              <NavLink
                to={tab.to}
                end={tab.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "min-h-[56px] flex flex-col items-center justify-center gap-1 px-1 py-1 rounded-lg transition-colors",
                    "active:bg-muted",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn("h-5 w-5", isActive && "text-gold")}
                      strokeWidth={isActive ? 2.25 : 1.75}
                    />
                    <span
                      className={cn(
                        "text-[10px] leading-none tracking-wide",
                        isActive ? "font-semibold" : "font-medium",
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