import { motion } from "motion/react";

const stats = [
  { val: "3.5h", label: "Average time saved per listing", sub: "Based on 500+ users" },
  { val: "10+", label: "Forms auto-filled instantly", sub: "Complete compliance coverage" },
  { val: "24/7", label: "Agentic support for your team", sub: "Never misses a lead" },
];

export default function Metrics() {
  return (
    <section className="py-24 px-6 bg-white border-y border-border/60 overflow-hidden relative">
      <div className="absolute inset-0 grid-bg opacity-[0.4]" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: i * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 15,
              bounce: 0.4
            }}
            className="text-center md:text-left space-y-4 p-8 group transition-all"
          >
            <div className="text-6xl sm:text-7xl font-display font-black text-ink tracking-tighter group-hover:text-brand-blue transition-colors duration-500">
                {stat.val}
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-ink tracking-tight">{stat.label}</div>
              <div className="text-xs text-ink-soft font-bold uppercase tracking-[0.1em] opacity-60">{stat.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
