import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useState, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import CartDrawer from "@/components/cart/CartDrawer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/layout/Header";
import Preloader from "@/components/motion/Preloader";
import { Toaster } from "@/components/ui/sonner";
import { pageTransition } from "@/lib/animations";
import ArtistPage from "@/pages/ArtistPage";
import ArtistsPage from "@/pages/ArtistsPage";
import CreatePage from "@/pages/CreatePage";
import DesignSystemPage from "@/pages/DesignSystemPage";
import DropDetailPage from "@/pages/DropDetailPage";
import DropsPage from "@/pages/DropsPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductPage from "@/pages/ProductPage";
import CollectionPage from "@/pages/CollectionPage";
import ComponentShowcasePage from "@/pages/ComponentShowcasePage";
import AboutPage from "@/pages/AboutPage";
import ShippingPage from "@/pages/ShippingPage";
import FAQPage from "@/pages/FAQPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPage from "@/pages/PrivacyPage";
import SitemapPage from "@/pages/SitemapPage";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import FooterSection from "@/sections/shared/FooterSection";

function RouteFrame({ children, reveal = true }: { children: ReactNode; reveal?: boolean }) {
  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate={reveal ? "animate" : "initial"}
      exit="exit"
      className="min-h-dvh"
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Preloader onComplete={() => setIntroComplete(true)} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-gold focus:text-void focus:px-4 focus:py-2 focus:rounded-sm focus:font-sans focus:font-semibold">
        Skip to content
      </a>
      <ScrollProgress />
      <BackToTop />
      <Header />
      <CartDrawer />
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<RouteFrame reveal={introComplete}><HomePage revealHero={introComplete} /></RouteFrame>} />
            <Route path="/collection" element={<RouteFrame reveal={introComplete}><CollectionPage /></RouteFrame>} />
            <Route path="/collection/:categoryHandle" element={<RouteFrame reveal={introComplete}><CollectionPage /></RouteFrame>} />
            <Route path="/shop" element={<Navigate to="/collection" replace />} />
            <Route path="/shop/:handle" element={<Navigate to="/collection" replace />} />
            <Route path="/product/:handle" element={<RouteFrame reveal={introComplete}><ProductPage /></RouteFrame>} />
            <Route path="/drops" element={<RouteFrame reveal={introComplete}><DropsPage /></RouteFrame>} />
            <Route path="/drops/:handle" element={<RouteFrame reveal={introComplete}><DropDetailPage /></RouteFrame>} />
            <Route path="/artists" element={<RouteFrame reveal={introComplete}><ArtistsPage /></RouteFrame>} />
            <Route path="/artists/:handle" element={<RouteFrame reveal={introComplete}><ArtistPage /></RouteFrame>} />
            <Route path="/about" element={<RouteFrame reveal={introComplete}><AboutPage /></RouteFrame>} />
            <Route path="/shipping" element={<RouteFrame reveal={introComplete}><ShippingPage /></RouteFrame>} />
            <Route path="/faq" element={<RouteFrame reveal={introComplete}><FAQPage /></RouteFrame>} />
            <Route path="/contact" element={<RouteFrame reveal={introComplete}><ContactPage /></RouteFrame>} />
            <Route path="/privacy" element={<RouteFrame reveal={introComplete}><PrivacyPage /></RouteFrame>} />
            <Route path="/sitemap" element={<RouteFrame reveal={introComplete}><SitemapPage /></RouteFrame>} />
            <Route path="/create" element={<RouteFrame reveal={introComplete}><CreatePage /></RouteFrame>} />
            <Route path="/components" element={<RouteFrame reveal={introComplete}><ComponentShowcasePage /></RouteFrame>} />
            <Route path="/design-system" element={<RouteFrame reveal={introComplete}><DesignSystemPage /></RouteFrame>} />
            <Route path="*" element={<RouteFrame reveal={introComplete}><NotFoundPage /></RouteFrame>} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
      <FooterSection />
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  );
}
