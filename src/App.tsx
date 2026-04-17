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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <TrustLogos />
        <UseCases />
        <LiveOutput />
        <HowItWorks />
        <AgentSystem />
        <AutomationFlow />
        <Metrics />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
