import { motion } from "motion/react";

const partners = [
  "RE/MAX", "Compass", "Century 21", "Zillow", "Redfin", "Sotheby's"
];

export default function TrustLogos() {
  return (
    <section className="py-12 border-b border-border/40 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-ink-soft mb-10">
          Powering agents at the world's leading firms
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner) => (
            <motion.div
              key={partner}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="text-xl font-display font-bold tracking-tighter text-ink"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
