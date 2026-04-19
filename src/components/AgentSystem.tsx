import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User, ShieldCheck, Layers, Megaphone,
  ArrowRight, Check, FileText,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

// ─── Ria Preview: fields fill in one by one, then loop ───────────────────────
function RiaPreview() {
  const fields = [
    { l: "Seller Name",  v: "Bhatnagar Living Trust" },
    { l: "Address",      v: "1284 Oak Ridge Way" },
    { l: "Price",        v: "$1,840,000" },
    { l: "Commission",   v: "2.5%" },
  ];
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    setFilled(0);
    const id = setInterval(() => {
      setFilled((p) => {
        if (p >= fields.length) { clearInterval(id); return p; }
        return p + 1;
      });
    }, 600);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // restart loop
  useEffect(() => {
    if (filled < fields.length) return;
    const t = setTimeout(() => setFilled(0), 2000);
    return () => clearTimeout(t);
  }, [filled, fields.length]);

  return (
    <div className="bg-white rounded-xl border border-border shadow-soft p-4 h-full flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-border/40 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <FileText className="w-3.5 h-3.5" />
        </div>
        <span className="text-[10px] font-mono text-ink-soft truncate min-w-0">closing_stack.pdf</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] text-green-600 font-bold">Processing</span>
        </div>
      </div>

      <div className="space-y-2 flex-1">
        {fields.map((f, i) => (
          <div key={i} className="relative flex items-center justify-between py-1.5 border-b border-border/30 last:border-0 overflow-hidden">
            <span className="text-[10px] text-ink-soft uppercase tracking-wider font-semibold">{f.l}</span>
            <AnimatePresence>
              {i < filled ? (
                <motion.span
                  key="val"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-semibold text-ink flex items-center gap-1"
                >
                  {f.v}
                  <Check className="w-3 h-3 text-green-500" strokeWidth={3} />
                </motion.span>
              ) : i === filled ? (
                <motion.div
                  key="cursor"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-12 h-3 rounded bg-indigo-100"
                />
              ) : (
                <div key="empty" className="w-12 h-3 rounded bg-muted/60" />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200 w-fit">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-bold text-green-700">12 forms auto-filled</span>
      </div>
    </div>
  );
}

// ─── Staging Preview: slider animates back and forth ─────────────────────────
function StagingPreview() {
  const [pos, setPos] = useState(50);
  const dir = useRef(1);

  useEffect(() => {
    const id = setInterval(() => {
      setPos((p) => {
        const next = p + dir.current * 0.8;
        if (next >= 85) dir.current = -1;
        if (next <= 15) dir.current = 1;
        return next;
      });
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden h-full min-h-[180px] select-none">
      <img
        src="/Before image.webp"
        alt="Empty room"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src="/after image.webp"
          alt="Staged room"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-heavy z-10 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-heavy flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-ink/30 rounded-full" />
            <div className="w-0.5 h-3 bg-ink/30 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute inset-x-0 bottom-0 flex justify-between px-3 pb-2 z-20 pointer-events-none">
        <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold">Before</span>
        <span className="px-2 py-0.5 rounded bg-violet-600/80 backdrop-blur-sm text-white text-[9px] font-bold">AI Staged</span>
      </div>

      {/* Live badge */}
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        <span className="text-[9px] font-bold text-white">AI Staging</span>
      </div>
    </div>
  );
}

// ─── Transaction Preview: forms check off one by one ─────────────────────────
function TransactionPreview() {
  const forms = [
    "Listing Agreement",
    "Seller Disclosure",
    "IABS Form",
    "Lead Paint Disclosure",
    "HOA Addendum",
  ];
  const [done, setDone] = useState(0);

  useEffect(() => {
    setDone(0);
    const id = setInterval(() => {
      setDone((p) => {
        if (p >= forms.length) { clearInterval(id); return p; }
        return p + 1;
      });
    }, 700);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (done < forms.length) return;
    const t = setTimeout(() => setDone(0), 2000);
    return () => clearTimeout(t);
  }, [done, forms.length]);

  return (
    <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden h-full flex flex-col">
      <div className="px-4 py-2.5 border-b border-border/40 bg-muted/30 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Closing Stack</span>
        <motion.span
          key={done}
          initial={{ scale: 1.2, color: "#16a34a" }}
          animate={{ scale: 1, color: "#16a34a" }}
          className="text-[10px] font-black text-green-600"
        >
          {done} / {forms.length} Done
        </motion.span>
      </div>

      <div className="flex-1 divide-y divide-border/20">
        {forms.map((f, i) => (
          <div key={i} className="flex items-center gap-2.5 px-4 py-2.5">
            <AnimatePresence mode="wait">
              {i < done ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0"
                >
                  <Check className="w-2.5 h-2.5 text-green-600" strokeWidth={3} />
                </motion.div>
              ) : i === done ? (
                <motion.div
                  key="spin"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 rounded-full border-2 border-purple-400 border-t-transparent shrink-0"
                />
              ) : (
                <div key="empty" className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
              )}
            </AnimatePresence>
            <span className={`text-xs font-medium transition-colors ${i < done ? "text-ink" : "text-ink-soft/50"}`}>
              {f}
            </span>
          </div>
        ))}
      </div>

      <div className="px-4 py-2.5 border-t border-border/40 bg-muted/20 grid grid-cols-3 gap-2 text-center">
        {[["100%", "Compliance"], ["0", "Errors"], ["3.1s", "Time"]].map(([v, l], i) => (
          <div key={i}>
            <div className="text-sm font-display font-black text-purple-600">{v}</div>
            <div className="text-[9px] text-ink-soft uppercase tracking-widest">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Marketing Preview: platform tabs cycle, reach counter ticks up ──────────
function MarketingPreview() {
  const platforms = ["Instagram", "Facebook", "LinkedIn"];
  const [tab, setTab] = useState(0);
  const [reach, setReach] = useState(11200);

  // Auto-cycle tabs
  useEffect(() => {
    const id = setInterval(() => setTab((p) => (p + 1) % platforms.length), 2200);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tick reach counter
  useEffect(() => {
    const id = setInterval(() => {
      setReach((p) => (p >= 12400 ? 11200 : p + 47));
    }, 80);
    return () => clearInterval(id);
  }, []);

  const captions = [
    "Just listed in Oak Ridge! Stunning 4BR with chef's kitchen. DM for details! #JustListed #Austin",
    "NEW LISTING: 1284 Oak Ridge Way, Austin TX. 4 beds, 3.5 baths. Listed at $1,840,000.",
    "Excited to present this exceptional property at 1284 Oak Ridge Way. Contact us for details.",
  ];

  return (
    <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden h-full flex flex-col">
      {/* Platform tabs */}
      <div className="flex border-b border-border bg-muted/20 p-1 gap-1">
        {platforms.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`flex-1 py-1.5 text-center text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all ${
              tab === i ? "bg-white shadow-soft text-ink border border-border" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-3 flex-1 space-y-2.5">
        {/* Images */}
        <div className="grid grid-cols-2 gap-2 h-[72px]">
          <img src="https://picsum.photos/seed/ad1/300/200" alt="Ad 1" referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover rounded-lg" />
          <img src="https://picsum.photos/seed/ad2/300/200" alt="Ad 2" referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Caption with fade transition */}
        <AnimatePresence mode="wait">
          <motion.p
            key={tab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-[10px] text-ink-soft italic leading-relaxed line-clamp-2"
          >
            "{captions[tab]}"
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Live stats */}
      <div className="px-3 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-[10px] text-teal-600 font-bold">Live</span>
        </div>
        <motion.span
          key={Math.floor(reach / 100)}
          initial={{ opacity: 0.6, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[10px] font-bold text-ink tabular-nums"
        >
          {reach.toLocaleString()} reach
        </motion.span>
      </div>
    </div>
  );
}

// ─── Agent data ───────────────────────────────────────────────────────────────
const agents = [
  {
    id: "ria",
    name: "RIA Listing Manager",
    role: "MLS & Document Automation",
    tagline: "Extracts and completes listing paperwork in seconds.",
    icon: User,
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
    iconBorder: "border-indigo-100",
    activeBg: "bg-indigo-600",
    activeText: "text-indigo-600",
    activeBorder: "border-indigo-200",
    activeGradient: "from-indigo-50/60",
    headline: "RIA handles the paperwork.",
    desc: "Extracts listing data from forms and disclosures in seconds.",
    bullets: ["Pulls data from PDFs automatically", "Fills listing forms with accuracy", "Reduces manual entry errors"],
    cta: "Start with RIA",
    nav: "#/ria",
    Preview: RiaPreview,
  },
  {
    id: "staging",
    name: "RIA Virtual Staging",
    role: "Visual AI Transformation",
    tagline: "Transforms empty spaces into staged interiors instantly.",
    icon: Layers,
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    iconBorder: "border-violet-100",
    activeBg: "bg-violet-600",
    activeText: "text-violet-600",
    activeBorder: "border-violet-200",
    activeGradient: "from-violet-50/60",
    headline: "Bring empty spaces to life.",
    desc: "Turns vacant rooms into realistic staged interiors instantly.",
    bullets: ["Style-aware furniture placement", "Matches lighting and layout", "Increases listing engagement"],
    cta: "Start Staging",
    nav: "#/staging",
    Preview: StagingPreview,
  },
  {
    id: "transaction",
    name: "RIA Transaction Manager",
    role: "Compliance & Document Processing",
    tagline: "Automates disclosures, forms, and compliance tasks.",
    icon: ShieldCheck,
    iconBg: "bg-purple-50",
    iconText: "text-purple-600",
    iconBorder: "border-purple-100",
    activeBg: "bg-purple-600",
    activeText: "text-purple-600",
    activeBorder: "border-purple-200",
    activeGradient: "from-purple-50/60",
    headline: "Every form, filled instantly.",
    desc: "Automates disclosures, IABS forms, and compliance documents.",
    bullets: ["Fast document completion", "Accurate form processing", "Simplifies compliance workflows"],
    cta: "Process Documents",
    nav: "#/ria",
    Preview: TransactionPreview,
  },
  {
    id: "marketing",
    name: "RIA Marketing Automation",
    role: "Content & Campaign Distribution",
    tagline: "Generates high-performing campaigns automatically.",
    icon: Megaphone,
    iconBg: "bg-teal-50",
    iconText: "text-teal-600",
    iconBorder: "border-teal-100",
    activeBg: "bg-teal-600",
    activeText: "text-teal-600",
    activeBorder: "border-teal-200",
    activeGradient: "from-teal-50/60",
    headline: "Marketing on autopilot.",
    desc: "Generates campaigns and listing content at scale.",
    bullets: ["Create listing copy fast", "Generate ads and social posts", "Scale content production"],
    cta: "Automate Marketing",
    nav: "#/marketing",
    Preview: MarketingPreview,
  },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function AgentSystem({ id }: { id?: string }) {
  const [activeId, setActiveId] = useState("ria");
  const { openModal } = useBooking();
  const active = agents.find((a) => a.id === activeId)!;

  return (
    <section id={id} className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-ink tracking-tight"
          >
            Meet the RIA platform.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-ink-soft text-sm sm:text-base max-w-xl mx-auto"
          >
            RIA is SofuAI's core AI system. Four specialized modules that automate every stage of the real estate workflow.
          </motion.p>
        </div>

        {/* Tab cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {agents.map((agent) => {
            const isActive = activeId === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveId(agent.id)}
                className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 group ${
                  isActive
                    ? `${agent.activeBorder} bg-gradient-to-br ${agent.activeGradient} to-white shadow-soft`
                    : "border-border bg-white hover:border-border/80 hover:shadow-soft"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${agent.iconBg} ${agent.iconText} border ${agent.iconBorder} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <agent.icon className="w-4 h-4" />
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="active-dot"
                      className={`w-2 h-2 rounded-full ${agent.activeBg} mt-1`}
                    />
                  )}
                </div>
                <div className="space-y-0.5 mb-2">
                  <div className="text-sm font-display font-bold text-ink leading-tight">{agent.name}</div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${isActive ? agent.activeText : "text-ink-soft/50"}`}>
                    {agent.role}
                  </div>
                </div>
                <p className="text-[11px] text-ink-soft leading-snug hidden sm:block">{agent.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="rounded-2xl border border-border shadow-soft overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-[1fr_280px]"
            >
              {/* Left: text */}
              <div className={`p-6 bg-gradient-to-br ${active.activeGradient} to-white`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-7 h-7 rounded-lg ${active.iconBg} ${active.iconText} border ${active.iconBorder} flex items-center justify-center`}>
                    <active.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-bold text-ink">{active.name}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${active.activeText}`}>{active.role}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-ink mb-1.5 leading-snug">
                  {active.headline}
                </h3>
                <p className="text-ink-soft text-sm mb-4 leading-relaxed">{active.desc}</p>

                <ul className="space-y-2 mb-5">
                  {active.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-4 h-4 rounded-full ${active.iconBg} ${active.activeText} flex items-center justify-center shrink-0`}>
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-ink-soft">{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => { window.location.hash = active.nav; }}
                    className={`flex items-center gap-1.5 text-sm font-bold ${active.activeText} group/cta`}
                  >
                    {active.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={openModal} className="text-xs text-ink-soft hover:text-ink transition-colors">
                    Book a demo
                  </button>
                </div>
              </div>

              {/* Right: live preview */}
              <div className="border-t sm:border-t-0 sm:border-l border-border bg-muted/10 p-4">
                <div className="h-full min-h-[220px]">
                  <active.Preview />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
