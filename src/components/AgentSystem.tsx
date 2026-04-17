import { motion } from "motion/react";
import { User, ShieldCheck, Zap, ArrowRight, FileText, BarChart3, Megaphone } from "lucide-react";

const agents = [
  {
    id: "01",
    name: "Ria",
    role: "Listing Manager",
    desc: "Extracts data from raw documents, auto-fills MLS fields, and generates polished listing descriptions in seconds.",
    icon: User,
    color: "blue",
    stat: "12 forms",
    statLabel: "auto-filled",
    tasks: ["Parse listing agreement", "Extract seller data", "Fill MLS fields", "Generate description"],
  },
  {
    id: "02",
    name: "Transaction Agent",
    role: "Document Processor",
    desc: "Processes disclosures, IABS forms, and closing stacks with surgical precision and zero manual input.",
    icon: ShieldCheck,
    color: "purple",
    stat: "100%",
    statLabel: "compliance",
    tasks: ["Seller disclosure", "IABS auto-fill", "Closing stack", "Compliance check"],
  },
  {
    id: "03",
    name: "Marketing Agent",
    role: "Content Distributor",
    desc: "Generates and distributes high-converting campaigns across Instagram, Facebook, LinkedIn, and email.",
    icon: Megaphone,
    color: "teal",
    stat: "12.4k+",
    statLabel: "avg. reach",
    tasks: ["Social captions", "Ad creatives", "Email campaigns", "A/B testing"],
  },
];

const colorMap = {
  blue:   { bg: "bg-brand-blue/10",   text: "text-brand-blue",   border: "border-brand-blue/20",   glow: "shadow-brand-blue/20",   bar: "bg-brand-blue",   pill: "bg-brand-blue/15 text-brand-blue" },
  purple: { bg: "bg-brand-purple/10", text: "text-brand-purple", border: "border-brand-purple/20", glow: "shadow-brand-purple/20", bar: "bg-brand-purple", pill: "bg-brand-purple/15 text-brand-purple" },
  teal:   { bg: "bg-brand-teal/10",   text: "text-brand-teal",   border: "border-brand-teal/20",   glow: "shadow-brand-teal/20",   bar: "bg-brand-teal",   pill: "bg-brand-teal/15 text-brand-teal" },
};

export default function AgentSystem({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20 sm:py-32 px-4 sm:px-6 bg-[#0a0a0f] text-white overflow-hidden relative">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section header ── */}
        <div className="text-center mb-16 sm:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Agent Cluster · 3 Active
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.05]"
          >
            Designed to think.{" "}
            <span className="text-white/30">Built to execute.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium"
          >
            Three specialized agents. One unified AI team. Automating every stage of the deal so you can focus on closing.
          </motion.p>
        </div>

        {/* ── Agent cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {agents.map((agent, i) => {
            const c = colorMap[agent.color as keyof typeof colorMap];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 16 }}
                className="group relative rounded-3xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Top accent line */}
                <div className={`h-px w-full ${c.bar} opacity-40`} />

                <div className="p-6 sm:p-8 flex flex-col gap-6 flex-1">

                  {/* Agent header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl ${c.bg} ${c.text} border ${c.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <agent.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-base leading-tight">{agent.name}</div>
                        <div className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${c.text} opacity-70`}>{agent.role}</div>
                      </div>
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${c.pill}`}>
                      {agent.id}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/40 text-sm leading-relaxed font-medium flex-1">
                    {agent.desc}
                  </p>

                  {/* Task list */}
                  <div className="space-y-2">
                    {agent.tasks.map((task, ti) => (
                      <motion.div
                        key={ti}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + ti * 0.06 }}
                        className="flex items-center gap-2.5"
                      >
                        <div className={`w-1 h-1 rounded-full ${c.bar} shrink-0`} />
                        <span className="text-[12px] text-white/30 font-medium">{task}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stat + CTA row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div>
                      <div className={`text-2xl font-display font-black ${c.text}`}>{agent.stat}</div>
                      <div className="text-[10px] text-white/25 font-bold uppercase tracking-widest">{agent.statLabel}</div>
                    </div>
                    <button className={`flex items-center gap-1.5 text-xs font-bold ${c.text} group/btn`}>
                      Explore
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Hover glow */}
                <div className={`absolute -bottom-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${c.bar}`} />
              </motion.div>
            );
          })}
        </div>

        {/* ── Live pipeline strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          {/* Pipeline steps */}
          <div className="flex items-center gap-0 overflow-x-auto w-full sm:w-auto">
            {[
              { label: "Upload Doc", active: true },
              { label: "Ria Extracts", active: true },
              { label: "Forms Filled", active: true },
              { label: "Staged", active: false },
              { label: "Published", active: false },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${step.active ? "bg-green-400" : "bg-white/15"} ${step.active ? "shadow-[0_0_6px_rgba(74,222,128,0.8)]" : ""}`} />
                  <span className={`text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${step.active ? "text-white/70" : "text-white/20"}`}>
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-6 h-px bg-white/10 shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              <span className="text-[11px] font-black uppercase tracking-widest text-white/30">3 agents running</span>
            </div>
            <a
              href="#cta"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-ink text-[11px] font-black uppercase tracking-widest hover:bg-white/90 transition-colors group"
            >
              Start Pipeline
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
