import { motion } from "motion/react";
import { MessageSquareText, Zap, MousePointer2 } from "lucide-react";

const steps = [
  { 
    icon: MessageSquareText,
    title: "1. Tell AI what you want",
    desc: "Use natural language to describe any real estate task. Just type or upload a file."
  },
  { 
    icon: Zap,
    title: "2. Agents handle the work",
    desc: "Autonomous agents orchestrate the necessary tools to complete your request."
  },
  { 
    icon: MousePointer2,
    title: "3. Review and approve",
    desc: "Inspect the final output, make any minor adjustments, and publish instantly."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-32 px-6 bg-white border-t border-border/40">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-display font-bold text-ink tracking-tight">How it works</h2>
          <p className="text-ink-soft text-lg font-medium">Stop managing tasks, start managing outcomes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-border border-dashed" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-8 relative z-10 group"
            >
              <div className="w-24 h-24 rounded-3xl bg-surface-elevated border border-border flex items-center justify-center mx-auto text-ink shadow-soft group-hover:scale-110 transition-transform group-hover:shadow-elevated group-hover:shadow-ink/5">
                 <step.icon size={32} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                <p className="text-ink-soft text-sm leading-relaxed max-w-[280px] mx-auto font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
