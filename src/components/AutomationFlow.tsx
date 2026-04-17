import { motion } from "motion/react";
import { Upload, Search, Palette, FilePlus, Share, Heart } from "lucide-react";

const steps = [
  { icon: Upload, label: "Upload Document" },
  { icon: Search, label: "Extract Data" },
  { icon: FilePlus, label: "Fill Forms" },
  { icon: Palette, label: "Stage Images" },
  { icon: Share, label: "Generate Posts" },
  { icon: Heart, label: "Capture Leads" },
];

export default function AutomationFlow() {
  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 bg-white overflow-hidden relative border-t border-border/20 hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.2]" />
      <div className="max-w-7xl mx-auto text-center space-y-10 sm:space-y-16 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink tracking-tight leading-tight">
          From paperwork to promotion: <br />
          <span className="text-ink-soft opacity-60">fully automated.</span>
        </h2>

        <div className="relative flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-8 sm:gap-12 pt-8 sm:pt-12">
          {/* Connecting Line - desktop only */}
          <div className="absolute top-[88px] left-0 w-full h-[1px] bg-border border-dashed opacity-60 hidden sm:block" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: i * 0.1, 
                type: "spring",
                stiffness: 100,
                damping: 15,
                bounce: 0.4
              }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center group cursor-default"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2.5rem] bg-surface-elevated border border-border shadow-soft flex items-center justify-center mb-4 sm:mb-6 transition-all group-hover:bg-ink group-hover:text-white group-hover:-translate-y-2 group-hover:shadow-heavy group-hover:shadow-ink/20">
                <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft group-hover:text-ink transition-colors">
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
