import { motion } from "motion/react";
import { WandSparkles, Upload, Megaphone, ArrowRight } from "lucide-react";
import { useBooking } from "../context/BookingContext";

export default function FinalCTA() {
  const { openModal } = useBooking();
  return (
    <section id="cta" className="relative py-16 sm:py-32 px-4 sm:px-6 overflow-hidden noise">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-90" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <div className="relative mx-auto max-w-4xl text-center content-layer">
        <motion.h2 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            bounce: 0.4
          }}
          className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.035em] text-ink leading-[1.05]"
        >
          Let your AI <br /> 
          <span className="text-gradient-brand">handle the work.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            delay: 0.1,
            type: "spring",
            bounce: 0.4 
          }}
          className="mt-6 text-base sm:text-lg text-ink-soft"
        >
          No setup required · Results in seconds
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: "spring",
            bounce: 0.5 
          }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3"
        >
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white text-sm font-bold px-6 py-3 hover:opacity-90 transition shadow-soft shadow-ink/20"
          >
            <WandSparkles className="h-4 w-4" /> Start with SOFO AI
          </button>
          <a 
            href="#output" 
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface-elevated text-ink text-sm font-medium px-5 py-2.5 hover:bg-muted transition"
          >
            <Upload className="h-4 w-4" /> Upload Documents
          </a>
          <a 
            href="#output" 
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface-elevated text-ink text-sm font-medium px-5 py-2.5 hover:bg-muted transition"
          >
            <Megaphone className="h-4 w-4" /> Generate Marketing
          </a>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={openModal}
          className="mt-8 sm:mt-10 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition font-medium"
        >
          Book a 15-min walkthrough <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </section>
  );
}
