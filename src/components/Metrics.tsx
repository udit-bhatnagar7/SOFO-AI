import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { val: "3.5h", label: "Average time saved per listing", sub: "Based on 500+ users" },
  { val: "10+",  label: "Forms auto-filled instantly",    sub: "Complete compliance coverage" },
  { val: "24/7", label: "Agentic support for your team",  sub: "Never misses a lead" },
];

// Parses "3.5h" → { num: 3.5, suffix: "h" }, "10+" → { num: 10, suffix: "+" }, "24/7" → null (render as-is)
function parseVal(val: string): { num: number; suffix: string } | null {
  const m = val.match(/^([\d.]+)([^/]*)$/);
  if (!m) return null;
  return { num: parseFloat(m[1]), suffix: m[2] };
}

function AnimatedNumber({ val, delay }: { val: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parsed = parseVal(val);
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView || !parsed) return;
    const ctrl = animate(mv, parsed.num, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        setDisplay(
          Number.isInteger(parsed.num)
            ? Math.round(v).toString()
            : v.toFixed(1)
        );
      },
    });
    return ctrl.stop;
  }, [inView, parsed, mv]);

  if (!parsed) {
    // "24/7" — no animation, just render
    return <span ref={ref}>{val}</span>;
  }

  return (
    <span ref={ref}>
      {display}{parsed.suffix}
    </span>
  );
}

export default function Metrics() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-y border-border/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 relative z-10">
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
              bounce: 0.4,
            }}
            className="text-center sm:text-left space-y-4 p-6 sm:p-8 group transition-all border-b sm:border-b-0 sm:border-r border-border/30 last:border-0"
          >
            <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-ink tracking-tighter group-hover:text-brand-blue transition-colors duration-500">
              <AnimatedNumber val={stat.val} delay={i * 0.1} />
            </div>
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-bold text-ink tracking-tight">{stat.label}</div>
              <div className="text-xs text-ink-soft font-bold uppercase tracking-[0.1em] opacity-60">{stat.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
