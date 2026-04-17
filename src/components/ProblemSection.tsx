import { motion } from "motion/react";
import { Clock, Copy, AlertTriangle, FolderOpen, PhoneOff, TrendingDown, RefreshCw, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { useBooking } from "../context/BookingContext";

const pains = [
  {
    icon: Clock,
    stat: "3.5 hrs",
    label: "per listing",
    title: "Manual MLS entry eats your day",
    desc: "Agents spend hours re-typing the same property data across MLS fields, spreadsheets, and portals, every single listing.",
  },
  {
    icon: Copy,
    stat: "12+",
    label: "copy-paste cycles",
    title: "Copy-pasting data across forms",
    desc: "Seller name, address, price, commission, entered over and over into listing agreements, disclosures, IABS, and closing stacks.",
  },
  {
    icon: AlertTriangle,
    stat: "1 in 4",
    label: "listings have errors",
    title: "Human error costs deals",
    desc: "A wrong commission rate, a misspelled address, a missed checkbox. Small mistakes create compliance risk and delay closings.",
  },
  {
    icon: FolderOpen,
    stat: "10+",
    label: "forms per transaction",
    title: "Managing a mountain of paperwork",
    desc: "Every transaction requires a stack of forms. Tracking versions, signatures, and deadlines manually is a full-time job on its own.",
  },
  {
    icon: PhoneOff,
    stat: "68%",
    label: "of leads go cold",
    title: "Slow follow-up kills conversions",
    desc: "While you're buried in paperwork, leads go cold. Marketing doesn't go out. Opportunities slip through the cracks.",
  },
  {
    icon: TrendingDown,
    stat: "40%",
    label: "less engagement",
    title: "Empty listings underperform",
    desc: "Unstaged, unoptimized listings get fewer clicks, fewer showings, and lower offers. Professional staging takes weeks and thousands.",
  },
  {
    icon: RefreshCw,
    stat: "Every",
    label: "single listing",
    title: "The same workflow, repeated forever",
    desc: "There's no system. Every new listing starts from scratch: the same documents, the same data entry, the same manual distribution.",
  },
  {
    icon: Users,
    stat: "Solo",
    label: "agents can't scale",
    title: "You can't grow without a team",
    desc: "Taking on more listings means more admin work. Without automation, growth means burnout, not revenue.",
  },
];

const fixes = [
  "Auto-fill every MLS field from a single document upload",
  "Generate listing descriptions, disclosures & IABS in seconds",
  "Virtual staging delivered in minutes, not weeks",
  "Cross-platform marketing published with one click",
  "Zero copy-paste: data flows automatically across all forms",
  "Built-in compliance checks on every transaction",
  "Instant lead capture and follow-up sequences",
  "Scale to 10× listings without hiring more staff",
];

export default function ProblemSection() {
  const { openModal } = useBooking();

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden bg-white">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">

        {/* ── Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-200 bg-red-50 text-[10px] font-black uppercase tracking-[0.2em] text-red-500"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            The Problem
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ink tracking-tight leading-[1.05]"
          >
            Real estate paperwork{" "}
            <span className="text-red-500">is broken.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-base sm:text-lg leading-relaxed font-medium max-w-xl mx-auto"
          >
            The average agent wastes 15+ hours a week on tasks that should take minutes. Here's what's actually happening behind every listing.
          </motion.p>
        </div>

        {/* ── Pain grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 sm:mb-20">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 100, damping: 16 }}
              className="group relative rounded-2xl border-2 border-red-100 bg-white hover:border-red-200 hover:shadow-soft p-5 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="h-0.5 w-full bg-gradient-to-r from-red-400 via-red-300 to-transparent rounded-full mb-5" />

              {/* Stat */}
              <div className="flex items-end gap-1.5 mb-4">
                <span className="text-3xl font-display font-black text-red-500 leading-none">{pain.stat}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft/60 mb-0.5">{pain.label}</span>
              </div>

              {/* Icon */}
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <pain.icon className="w-4 h-4 text-red-500" />
              </div>

              <h3 className="text-sm font-bold text-ink leading-snug mb-2">{pain.title}</h3>
              <p className="text-xs text-ink-soft leading-relaxed font-medium">{pain.desc}</p>

              {/* Hover glow */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-red-100 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center gap-6 mb-14 sm:mb-20"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="shrink-0 flex items-center gap-3 px-5 py-2.5 rounded-full border border-green-200 bg-green-50">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-green-700">SOFO AI solves all of this</span>
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* ── Solution grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-14 sm:mb-16">
          {fixes.map((fix, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 120, damping: 16 }}
              className="flex items-start gap-3 p-4 rounded-2xl border border-green-100 bg-green-50 hover:bg-green-100/60 hover:border-green-200 transition-colors group"
            >
              <div className="w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-sm text-ink-soft font-medium leading-snug group-hover:text-ink transition-colors">{fix}</span>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={openModal}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-ink text-white text-sm font-black uppercase tracking-widest hover:bg-brand-blue transition-all shadow-heavy"
          >
            Fix My Workflow
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-ink-soft/60 font-medium">No credit card · Setup in minutes</p>
        </motion.div>

      </div>
    </section>
  );
}
