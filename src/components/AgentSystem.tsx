import { motion } from "motion/react";
import { User, ShieldCheck, Megaphone, ArrowRight, Check, Layers } from "lucide-react";
import { useBooking } from "../context/BookingContext";

const agents = [
  {
    id: "01",
    name: "Ria",
    role: "Listing Manager",
    desc: "Auto-fills MLS fields and generates listing descriptions from raw documents.",
    icon: User,
    color: "blue",
    stat: "12",
    statUnit: "forms",
    statLabel: "per listing",
    tasks: [
      "Parse listing agreement & disclosures",
      "Extract seller & property data",
      "Auto-fill all MLS fields",
      "Generate listing descriptions",
    ],
    nav: "#/ria",
  },
  {
    id: "02",
    name: "Transaction Agent",
    role: "Document Processor",
    desc: "Fills disclosures, IABS forms, and closing stacks with zero manual input.",
    icon: ShieldCheck,
    color: "purple",
    stat: "100%",
    statUnit: "",
    statLabel: "compliance",
    tasks: [
      "Seller disclosure auto-fill",
      "IABS form completion",
      "Full closing stack processing",
      "Built-in compliance checks",
    ],
    nav: "#/ria",
  },
  {
    id: "03",
    name: "Virtual Staging",
    role: "Visual AI Agent",
    desc: "Turns empty rooms into stunning listing-ready images in seconds.",
    icon: Layers,
    color: "violet",
    stat: "40%",
    statUnit: "",
    statLabel: "more clicks",
    tasks: [
      "AI virtual staging",
      "Day to dusk conversion",
      "Exterior enhancement",
      "Room emptying",
    ],
    nav: "#/staging",
  },
  {
    id: "04",
    name: "Marketing Agent",
    role: "Content Distributor",
    desc: "Generates posts, ads, and captions for every platform in one click.",
    icon: Megaphone,
    color: "teal",
    stat: "12.4k+",
    statUnit: "",
    statLabel: "avg. reach",
    tasks: [
      "Platform-specific social captions",
      "Ad creatives & A/B variants",
      "Email newsletter campaigns",
      "Cross-platform distribution",
    ],
    nav: "#/marketing",
  },
];

const colorMap: Record<string, {
  iconBg: string; iconText: string; iconBorder: string;
  statText: string; pillBg: string; pillText: string;
  cardBorder: string; cardAccent: string; checkBg: string; checkText: string;
}> = {
  blue: {
    iconBg: "bg-indigo-50", iconText: "text-indigo-600", iconBorder: "border-indigo-100",
    statText: "text-indigo-600", pillBg: "bg-indigo-50", pillText: "text-indigo-500",
    cardBorder: "border-indigo-100", cardAccent: "bg-indigo-600",
    checkBg: "bg-indigo-50", checkText: "text-indigo-500",
  },
  purple: {
    iconBg: "bg-purple-50", iconText: "text-purple-600", iconBorder: "border-purple-100",
    statText: "text-purple-600", pillBg: "bg-purple-50", pillText: "text-purple-500",
    cardBorder: "border-purple-100", cardAccent: "bg-purple-600",
    checkBg: "bg-purple-50", checkText: "text-purple-500",
  },
  violet: {
    iconBg: "bg-violet-50", iconText: "text-violet-600", iconBorder: "border-violet-100",
    statText: "text-violet-600", pillBg: "bg-violet-50", pillText: "text-violet-500",
    cardBorder: "border-violet-100", cardAccent: "bg-violet-600",
    checkBg: "bg-violet-50", checkText: "text-violet-500",
  },
  teal: {
    iconBg: "bg-teal-50", iconText: "text-teal-600", iconBorder: "border-teal-100",
    statText: "text-teal-600", pillBg: "bg-teal-50", pillText: "text-teal-500",
    cardBorder: "border-teal-100", cardAccent: "bg-teal-600",
    checkBg: "bg-teal-50", checkText: "text-teal-500",
  },
};

export default function AgentSystem({ id }: { id?: string }) {
  const { openModal } = useBooking();

  return (
    <section id={id} className="py-20 sm:py-32 px-4 sm:px-6 bg-white overflow-hidden relative">

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-14 sm:mb-20 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Agent Cluster · 4 Active
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ink tracking-tight leading-[1.05]"
          >
            Designed to think.{" "}
            <span className="text-ink/30">Built to execute.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium"
          >
            Four specialized agents. One unified AI team. Automating every stage of the deal so you can focus on closing.
          </motion.p>
        </div>

        {/* ── Agent cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {agents.map((agent, i) => {
            const c = colorMap[agent.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 16 }}
                className={`group relative rounded-3xl border-2 ${c.cardBorder} bg-white shadow-soft hover:shadow-elevated transition-all duration-500 overflow-hidden flex flex-col`}
              >
                {/* Colored top bar */}
                <div className={`h-1 w-full ${c.cardAccent}`} />

                <div className="p-7 sm:p-8 flex flex-col gap-6 flex-1">

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="hidden">
                        <div className={`w-12 h-12 rounded-2xl ${c.iconBg} ${c.iconText} border ${c.iconBorder} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-soft`}>
                          <agent.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-ink text-base leading-tight">{agent.name}</div>
                        <div className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${c.iconText}`}>{agent.role}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${c.pillBg} ${c.pillText} shrink-0`}>
                      {agent.id}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-ink-soft text-sm leading-relaxed font-medium">
                    {agent.desc}
                  </p>

                  {/* Task checklist */}
                  <div className="space-y-2.5">
                    {agent.tasks.map((task, ti) => (
                      <div key={ti} className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full ${c.checkBg} ${c.checkText} flex items-center justify-center shrink-0`}>
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </div>
                        <span className="text-[13px] text-ink-soft font-medium">{task}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stat + CTA */}
                  <div className="flex flex-col gap-3 pt-5 mt-auto border-t border-border/60">
                    <div>
                      <div className={`text-2xl font-display font-black ${c.statText} leading-none`}>
                        {agent.stat}
                        {agent.statUnit && <span className="text-base ml-1">{agent.statUnit}</span>}
                      </div>
                      <div className="text-[10px] text-ink-soft/60 font-bold uppercase tracking-widest mt-1">{agent.statLabel}</div>
                    </div>
                    <button
                      onClick={() => {
                        if (agent.nav) {
                          window.location.hash = agent.nav;
                        } else {
                          openModal();
                        }
                      }}
                      className={`flex items-center gap-1.5 text-xs font-bold ${c.iconText} group/btn w-fit`}
                    >
                      Get Started
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Pipeline strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-2xl border border-border bg-muted/40 px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          {/* Steps */}
          <div className="flex items-center overflow-x-auto gap-0 w-full sm:w-auto">
            {[
              { label: "Upload Doc",   done: true },
              { label: "Ria Extracts", done: true },
              { label: "Forms Filled", done: true },
              { label: "Staged",       done: true },
              { label: "Published",    done: false },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center shrink-0">
                <div className="flex items-center gap-2 px-2.5 py-1.5">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${step.done ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)]" : "bg-border"}`} />
                  <span className={`text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${step.done ? "text-ink" : "text-ink-soft/40"}`}>
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`w-5 h-px shrink-0 ${step.done ? "bg-green-300" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[11px] font-black uppercase tracking-widest text-ink-soft">4 agents running</span>
            </div>
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink text-white text-[11px] font-black uppercase tracking-widest hover:bg-brand-blue transition-colors group"
            >
              Start Pipeline
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
