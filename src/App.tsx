import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import PageTransition from "@/components/PageTransition";
import BadgeWidget from "@/components/BadgeWidget";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AirTicketingPage from "./pages/AirTicketingPage";
import ExplorerPage from "./pages/ExplorerPage";
import CookieConsent from "@/components/cookieConsent"; // ✅ Add this import

const SafarisPage = lazy(() => import("./pages/SafarisPage"));
const CarRentalPage = lazy(() => import("./pages/AirTicketingPage"));
const CorporateTravelPage = lazy(() => import("./pages/CorporateTravelPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const SafariPlannerPage = lazy(() => import("./pages/SafariPlannerPage"));
const VirtualToursPage = lazy(() => import("./pages/VirtualToursPage"));
const WildlifeCalendarPage = lazy(() => import("./pages/WildlifeCalendarPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const EcoCalculatorPage = lazy(() => import("./pages/EcoCalculatorPage"));
const GearGuidePage = lazy(() => import("./pages/GearGuidePage"));
const VisaPage = lazy(() => import("./pages/VisaPage"));
const Blog = lazy(() => import("./pages/BlogPage"));

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/air-ticketing" element={<AirTicketingPage />} />
              <Route path="/corporate" element={<CorporateTravelPage />} />
              <Route path="/explorer" element={<ExplorerPage />} />
              <Route path="/safaris" element={<SafarisPage />} />              
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/safari-planner" element={<SafariPlannerPage />} />
              <Route path="/virtual-tours" element={<VirtualToursPage />} />
              <Route path="/wildlife-calendar" element={<WildlifeCalendarPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/eco-calculator" element={<EcoCalculatorPage />} />
              <Route path="/gear" element={<GearGuidePage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/visa" element={<VisaPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </AnimatePresence>
      <ScrollToTop />
      <WhatsAppWidget />
      <CookieConsent /> {/* ✅ Add CookieConsent here */}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;