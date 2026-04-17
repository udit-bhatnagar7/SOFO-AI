import { useEffect, useState } from "react";
import Lenis from "lenis";
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
import BookingModal from "./components/BookingModal";
import VideoModal from "./components/VideoModal";
import { BookingProvider } from "./context/BookingContext";
import { VideoProvider } from "./context/VideoContext";
import RiaPage from "./pages/RiaPage";
import StagingPage from "./pages/StagingPage";
import MarketingPage from "./pages/MarketingPage";

function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.6 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
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
      <BookingModal />
      <VideoModal />
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

  return (
    <BookingProvider>
      <VideoProvider>
        {hash === "#/ria" ? <RiaPage /> : hash === "#/staging" ? <StagingPage /> : hash === "#/marketing" ? <MarketingPage /> : <LandingPage />}
      </VideoProvider>
    </BookingProvider>
  );
}
