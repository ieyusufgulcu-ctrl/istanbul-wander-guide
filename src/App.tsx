import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/layout/AppShell";
import { MobileFrame } from "@/components/layout/MobileFrame";
import HomeScreen from "@/screens/HomeScreen";
import SearchScreen from "@/screens/SearchScreen";
import MapScreen from "@/screens/MapScreen";
import BookingsScreen from "@/screens/BookingsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import ExperienceDetailScreen from "@/screens/ExperienceDetailScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";
import ConfirmationScreen from "@/screens/ConfirmationScreen";
import OnboardingScreen from "@/screens/OnboardingScreen";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

/**
 * OnboardingGate — soft first-visit redirect to /onboarding.
 * Uses a localStorage flag, no auth, fully skippable. Once the user
 * completes or skips onboarding, they never see this gate again.
 */
function OnboardingGate({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [decided, setDecided] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const onboarded = storage.get<string>(STORAGE_KEYS.onboarded);
    // Only auto-redirect when landing on the root tab. Deep links / detail
    // screens / direct /onboarding all stay on their requested route.
    if (!onboarded && location.pathname === "/") {
      setShouldRedirect(true);
    }
    setDecided(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!decided) return null;
  if (shouldRedirect) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OnboardingGate>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/bookings" element={<BookingsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
          {/* Pushed stack screens — no bottom tab bar, but keep mobile frame */}
          <Route
            path="/experience/:id"
            element={
              <MobileFrame>
                <ExperienceDetailScreen />
              </MobileFrame>
            }
          />
          <Route
            path="/checkout/:id"
            element={
              <MobileFrame>
                <CheckoutScreen />
              </MobileFrame>
            }
          />
          <Route
            path="/confirmation/:id"
            element={
              <MobileFrame>
                <ConfirmationScreen />
              </MobileFrame>
            }
          />
          {/* Modal — full-screen, no tab bar */}
          <Route
            path="/onboarding"
            element={
              <MobileFrame>
                <OnboardingScreen />
              </MobileFrame>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </OnboardingGate>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
