import { Outlet } from "react-router-dom";
import { MobileFrame } from "./MobileFrame";
import { BottomTabBar } from "./BottomTabBar";

/**
 * AppShell — wraps every tab route in the mobile frame + persistent bottom tab bar.
 * Equivalent to a (tabs) layout in Expo Router.
 */
export function AppShell() {
  return (
    <MobileFrame bottomBar={<BottomTabBar />}>
      <Outlet />
    </MobileFrame>
  );
}

export default AppShell;