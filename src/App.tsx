import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustLogos from "./components/TrustLogos";
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

export default function App() {
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

    // Make anchor links work with Lenis
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
    <BookingProvider>
      <VideoProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Hero />
            <TrustLogos />
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
      </VideoProvider>
    </BookingProvider>
  );
}
