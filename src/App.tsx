import { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustLogos from "./components/TrustLogos";
import ProblemSection from "./components/ProblemSection";
import UseCases from "./components/UseCases";
import LiveOutput from "./components/LiveOutput";
import HowItWorks from "./components/HowItWorks";
import AgentSystem from "./components/AgentSystem";
import AutomationFlow from "./components/AutomationFlow";
import Metrics from "./components/Metrics";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import { BookingProvider } from "./context/BookingContext";
import { VideoProvider } from "./context/VideoContext";

// Lazy-load heavy pages and modals — not needed on initial render
const BookingModal  = lazy(() => import("./components/BookingModal"));
const VideoModal    = lazy(() => import("./components/VideoModal"));
const RiaPage       = lazy(() => import("./pages/RiaPage"));
const StagingPage   = lazy(() => import("./pages/StagingPage"));
const MarketingPage = lazy(() => import("./pages/MarketingPage"));

// Minimal fallback — invisible, no layout shift
const PageFallback = () => (
  <div className="min-h-screen bg-white" aria-hidden="true" />
);

function LandingPage() {
  useEffect(() => {
    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <TrustLogos />
        <ProblemSection />
        <UseCases id="use-cases" />
        <LiveOutput />
        <HowItWorks id="workflows" />
        <AgentSystem id="agents" />
        <AutomationFlow />
        <Metrics />
        <FinalCTA />
      </main>
      <Footer />
      <ChatWidget />
      {/* Modals are lazy — only loaded when first opened */}
      <Suspense fallback={null}>
        <BookingModal />
        <VideoModal />
      </Suspense>
    </div>
  );
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isProductPage = hash === "#/ria" || hash === "#/staging" || hash === "#/marketing";

  return (
    <BookingProvider>
      <VideoProvider>
        <Suspense fallback={<PageFallback />}>
          {hash === "#/ria"       ? <RiaPage /> :
           hash === "#/staging"   ? <StagingPage /> :
           hash === "#/marketing" ? <MarketingPage /> :
           <LandingPage />}
        </Suspense>
        {/* Prefetch product pages after idle — user likely to navigate there */}
        {!isProductPage && (
          <link rel="prefetch" href="/src/pages/RiaPage.tsx" as="script" />
        )}
      </VideoProvider>
    </BookingProvider>
  );
}
