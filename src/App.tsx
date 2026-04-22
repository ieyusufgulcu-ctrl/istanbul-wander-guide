import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
