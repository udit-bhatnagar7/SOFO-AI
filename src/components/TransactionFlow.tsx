import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, FileText, Link2, Send, CheckCircle2, MessageCircle,
  Bot, User, Check, Clock, Eye, Sparkles, ChevronRight, Phone
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = "manager" | "forms" | "link" | "seller" | "support" | "complete";

const STEPS: Step[] = ["manager", "forms", "link", "seller", "support", "complete"];

const STEP_META: Record<Step, { label: string; sublabel: string; icon: typeof Home }> = {
  manager:  { label: "Select Property",    sublabel: "Transaction Manager",  icon: Home },
  forms:    { label: "Add Forms",          sublabel: "Listing Agreement, SD, IABs", icon: FileText },
  link:     { label: "Generate Magic Link",sublabel: "One link for seller",  icon: Link2 },
  seller:   { label: "Seller Fills Forms", sublabel: "Guided portal experience", icon: User },
  support:  { label: "Live Support",       sublabel: "AI + human help anytime", icon: MessageCircle },
  complete: { label: "All Done",           sublabel: "Transaction ready",    icon: CheckCircle2 },
};

// ─── Step 1: Transaction Manager selects property ─────────────────────────────
function StepManager({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const properties = [
    { addr: "1284 Oak Ridge Way", city: "Austin, TX", price: "$1,840,000", status: "Active" },
    { addr: "402 Lakeview Blvd",  city: "Austin, TX", price: "$975,000",   status: "Pending" },
    { addr: "88 Sunset Drive",    city: "Austin, TX", price: "$2,100,000", status: "Active" },
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setSelected(0), 600);
    const t2 = setTimeout(onNext, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onNext]);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-brand-blue/10 flex items-center justify-center">
          <Home className="w-3.5 h-3.5 text-brand-blue" />
        </div>
        <div>
          <div className="text-xs font-bold text-ink">Transaction Manager</div>
          <div className="text-[10px] text-ink-soft">Select a property to begin</div>
        </div>
      </div>
      {properties.map((p, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => setSelected(i)}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
            selected === i
              ? "border-brand-blue bg-brand-blue/5 shadow-soft"
              : "border-border bg-white hover:border-brand-blue/30"
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Home className="w-4 h-4 text-ink-soft" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-ink truncate">{p.addr}</div>
            <div className="text-[10px] text-ink-soft">{p.city} · {p.price}</div>
          </div>
          <div className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
            p.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
          }`}>{p.status}</div>
          {selected === i && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
              className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center shrink-0"
            >
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Step 2: Add Forms ────────────────────────────────────────────────────────
function StepForms({ onNext }: { onNext: () => void }) {
  const forms = [
    { name: "Listing Agreement",       tag: "Required", color: "text-brand-blue",   bg: "bg-brand-blue/10" },
    { name: "Seller Disclosure (SD)",  tag: "Required", color: "text-brand-purple", bg: "bg-brand-purple/10" },
    { name: "IABs",                    tag: "Required", color: "text-brand-teal",   bg: "bg-brand-teal/10" },
    { name: "Lead Paint Disclosure",   tag: "Optional", color: "text-amber-600",    bg: "bg-amber-100" },
    { name: "HOA Addendum",            tag: "Optional", color: "text-ink-soft",     bg: "bg-muted" },
  ];
  const [added, setAdded] = useState<number[]>([]);

  useEffect(() => {
    const timers = [0, 1, 2, 3].map((i) => setTimeout(() => setAdded((a) => [...a, i]), 400 + i * 300));
    const done = setTimeout(onNext, 2800);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onNext]);

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-brand-purple/10 flex items-center justify-center">
          <FileText className="w-3.5 h-3.5 text-brand-purple" />
        </div>
        <div>
          <div className="text-xs font-bold text-ink">Add Required Forms</div>
          <div className="text-[10px] text-ink-soft">1284 Oak Ridge Way</div>
        </div>
      </div>
      {forms.map((f, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 ${
            added.includes(i) ? "border-brand-teal/40 bg-brand-teal/3" : "border-border bg-white"
          }`}
        >
          <div className={`w-7 h-7 rounded-lg ${f.bg} flex items-center justify-center shrink-0`}>
            <FileText className={`w-3.5 h-3.5 ${f.color}`} />
          </div>
          <span className="text-[11px] font-semibold text-ink flex-1">{f.name}</span>
          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${f.bg} ${f.color}`}>{f.tag}</span>
          <AnimatePresence>
            {added.includes(i) && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                transition={{ type: "spring" }}
                className="w-4 h-4 rounded-full bg-brand-teal flex items-center justify-center shrink-0"
              >
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      <div className="text-[10px] text-ink-soft text-center pt-1">
        {added.length} of {forms.length} forms added
      </div>
    </div>
  );
}

// ─── Step 3: Generate Magic Link ──────────────────────────────────────────────
function StepLink({ onNext }: { onNext: () => void }) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGenerating(true), 400);
    const t2 = setTimeout(() => { setGenerating(false); setGenerated(true); }, 1400);
    const t3 = setTimeout(() => setSent(true), 2200);
    const t4 = setTimeout(onNext, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onNext]);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-brand-teal/10 flex items-center justify-center">
          <Link2 className="w-3.5 h-3.5 text-brand-teal" />
        </div>
        <div>
          <div className="text-xs font-bold text-ink">Generate Magic Link</div>
          <div className="text-[10px] text-ink-soft">One secure link for the seller</div>
        </div>
      </div>

      {/* Property summary */}
      <div className="px-4 py-3 rounded-2xl bg-muted border border-border">
        <div className="text-[10px] text-ink-soft mb-1">Property</div>
        <div className="text-xs font-bold text-ink">1284 Oak Ridge Way, Austin TX</div>
        <div className="text-[10px] text-ink-soft mt-0.5">5 forms · Listing Agreement, SD, IABs + 2 more</div>
      </div>

      {/* Link generation */}
      <div className={`px-4 py-3 rounded-2xl border-2 transition-all duration-500 ${
        generated ? "border-brand-teal bg-brand-teal/5" : "border-border bg-white"
      }`}>
        <div className="text-[9px] text-ink-soft font-black uppercase tracking-widest mb-1.5">Magic Link</div>
        {generating && (
          <div className="flex items-center gap-2">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 rounded-full border-2 border-brand-teal border-t-transparent"
            />
            <span className="text-[10px] text-ink-soft">Generating secure link…</span>
          </div>
        )}
        {generated && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-brand-teal truncate flex-1">sofo.ai/tx/oak-ridge-2024-xK9m</span>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
              className="w-4 h-4 rounded-full bg-brand-teal flex items-center justify-center shrink-0"
            >
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        )}
        {!generating && !generated && (
          <span className="text-[10px] text-ink-soft/40">—</span>
        )}
      </div>

      {/* Send to seller */}
      <AnimatePresence>
        {generated && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
              sent ? "border-green-400 bg-green-50" : "border-brand-blue/30 bg-brand-blue/5"
            }`}
          >
            <Send className={`w-4 h-4 shrink-0 ${sent ? "text-green-600" : "text-brand-blue"}`} />
            <div className="flex-1">
              <div className="text-[10px] font-bold text-ink">{sent ? "Sent to seller" : "Sending to seller…"}</div>
              <div className="text-[9px] text-ink-soft">john.smith@email.com · SMS +1 (512) 555-0192</div>
            </div>
            {sent && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0"
              >
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Step 4: Seller Portal ────────────────────────────────────────────────────
function StepSeller({ onNext }: { onNext: () => void }) {
  const [filledCount, setFilledCount] = useState(0);
  const sellerForms = [
    { name: "Listing Agreement",      pages: 4, fields: 12 },
    { name: "Seller Disclosure (SD)", pages: 6, fields: 28 },
    { name: "IABs",                   pages: 2, fields: 8 },
  ];

  useEffect(() => {
    const timers = [0, 1, 2].map((i) => setTimeout(() => setFilledCount(i + 1), 600 + i * 700));
    const done = setTimeout(onNext, 3200);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onNext]);

  return (
    <div className="w-full space-y-3">
      {/* Seller portal header */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ink text-white mb-2">
        <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center shrink-0">
          <span className="text-[9px] font-black">S</span>
        </div>
        <span className="text-[10px] font-bold flex-1">Seller Portal — John Smith</span>
        <div className="flex items-center gap-1 text-[9px] text-white/60">
          <Eye className="w-3 h-3" />
          <span>Live</span>
        </div>
      </div>

      {/* Progress tracker */}
      <div className="px-3 py-2.5 rounded-xl bg-muted border border-border">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-ink-soft">Your Progress</span>
          <span className="text-[10px] font-bold text-brand-teal">{filledCount} / {sellerForms.length} forms</span>
        </div>
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-blue to-brand-teal rounded-full"
            animate={{ width: `${(filledCount / sellerForms.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Form list */}
      {sellerForms.map((f, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-400 ${
            filledCount > i
              ? "border-brand-teal/40 bg-brand-teal/5"
              : filledCount === i
              ? "border-brand-blue bg-brand-blue/5 shadow-soft"
              : "border-border bg-white"
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            filledCount > i ? "bg-brand-teal" : filledCount === i ? "bg-brand-blue" : "bg-muted"
          }`}>
            {filledCount > i
              ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              : filledCount === i
              ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 rounded-full border-2 border-white border-t-transparent"
                />
              : <FileText className="w-3.5 h-3.5 text-ink-soft" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-ink">{f.name}</div>
            <div className="text-[9px] text-ink-soft">{f.pages} pages · {f.fields} fields</div>
          </div>
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
            filledCount > i ? "bg-brand-teal/10 text-brand-teal" :
            filledCount === i ? "bg-brand-blue/10 text-brand-blue" :
            "bg-muted text-ink-soft"
          }`}>
            {filledCount > i ? "Done" : filledCount === i ? "In Progress" : "Pending"}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Step 5: Live Support ─────────────────────────────────────────────────────
function StepSupport({ onNext }: { onNext: () => void }) {
  const [messages, setMessages] = useState<{ from: "seller" | "ai" | "agent"; text: string }[]>([]);
  const chat = [
    { from: "seller" as const, text: "Hi, I have a question about the Seller Disclosure form — what does Section 4B mean?", delay: 400 },
    { from: "ai"     as const, text: "Great question! Section 4B covers known material defects. You'll need to disclose any issues you're aware of — roof leaks, foundation cracks, etc.", delay: 1600 },
    { from: "seller" as const, text: "Got it. We had a minor roof repair in 2022 — do I need to mention that?", delay: 3000 },
    { from: "agent"  as const, text: "Yes, please include it. I can help you word it correctly — I'll add a note to your form now.", delay: 4200 },
  ];

  useEffect(() => {
    const timers = chat.map((m) => setTimeout(() => setMessages((prev) => [...prev, m]), m.delay));
    const done = setTimeout(onNext, 5800);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onNext]);

  return (
    <div className="w-full space-y-3">
      {/* Chat header */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted border border-border">
        <div className="flex -space-x-1.5">
          <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center border-2 border-white">
            <Bot className="w-3 h-3 text-white" />
          </div>
          <div className="w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center border-2 border-white">
            <User className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold text-ink">Support — AI + Human Agent</div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] text-green-600 font-semibold">Online now</span>
          </div>
        </div>
        <Phone className="w-3.5 h-3.5 text-ink-soft" />
      </div>

      {/* Messages */}
      <div className="space-y-2 max-h-[220px] overflow-hidden">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`flex gap-2 ${m.from === "seller" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                m.from === "seller" ? "bg-ink" :
                m.from === "ai" ? "bg-brand-blue" : "bg-brand-teal"
              }`}>
                {m.from === "seller" ? <User className="w-3 h-3 text-white" /> :
                 m.from === "ai" ? <Bot className="w-3 h-3 text-white" /> :
                 <User className="w-3 h-3 text-white" />}
              </div>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-[10px] leading-relaxed ${
                m.from === "seller"
                  ? "bg-ink text-white rounded-tr-sm"
                  : m.from === "ai"
                  ? "bg-brand-blue/10 text-ink border border-brand-blue/20 rounded-tl-sm"
                  : "bg-brand-teal/10 text-ink border border-brand-teal/20 rounded-tl-sm"
              }`}>
                {m.from !== "seller" && (
                  <div className={`text-[8px] font-black uppercase tracking-widest mb-0.5 ${
                    m.from === "ai" ? "text-brand-blue" : "text-brand-teal"
                  }`}>{m.from === "ai" ? "AI Agent" : "Support Agent"}</div>
                )}
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Typing indicator */}
      {messages.length < chat.length && (
        <div className="flex items-center gap-2 px-3">
          <div className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center">
            <Bot className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="flex gap-1">
            {[0, 0.2, 0.4].map((d, i) => (
              <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-blue/40"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, delay: d, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 6: Complete ─────────────────────────────────────────────────────────
function StepComplete() {
  const summary = [
    { label: "Listing Agreement",      status: "Signed" },
    { label: "Seller Disclosure (SD)", status: "Signed" },
    { label: "IABs",                   status: "Signed" },
    { label: "Lead Paint Disclosure",  status: "Signed" },
  ];

  return (
    <div className="w-full space-y-3">
      {/* Success banner */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140 }}
        className="relative overflow-hidden px-5 py-4 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-teal text-white text-center"
      >
        {[0, 0.4, 0.8].map((d, i) => (
          <motion.div key={i}
            className="absolute inset-0 rounded-2xl border-2 border-white/20"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 1.6 + i * 0.3, opacity: 0 }}
            transition={{ duration: 1.8, delay: d, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
        <div className="text-sm font-black">Transaction Ready</div>
        <div className="text-[10px] text-white/70 mt-0.5">All forms signed · Ready to list</div>
      </motion.div>

      {/* Form summary */}
      <div className="space-y-1.5">
        {summary.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-border"
          >
            <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-[11px] font-semibold text-ink flex-1">{s.label}</span>
            <span className="text-[9px] font-black text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">{s.status}</span>
          </motion.div>
        ))}
      </div>

      <div className="text-center text-[10px] text-ink-soft pt-1">
        Completed in <span className="font-bold text-ink">14 minutes</span> · Zero back-and-forth
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function TransactionFlow() {
  const [step, setStep] = useState<Step>("manager");
  const [stepKey, setStepKey] = useState(0);
  const stepIndex = STEPS.indexOf(step);

  const goNext = () => {
    const next = STEPS[(stepIndex + 1) % STEPS.length];
    setStep(next);
    setStepKey((k) => k + 1);
  };

  const jumpTo = (s: Step) => {
    setStep(s);
    setStepKey((k) => k + 1);
  };

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.2] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/20 bg-brand-blue/5"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-blue">Transaction Manager</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            From property to signed forms — in minutes.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-lg max-w-2xl mx-auto"
          >
            Transaction manager selects the property, adds all required forms, and sends one magic link to the seller. The seller fills everything out — with live AI and human support at every step.
          </motion.p>
        </div>

        {/* Main demo card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl border border-border shadow-elevated overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <span className="text-[11px] text-ink-soft font-mono uppercase tracking-widest mx-auto">
              SOFO AI — Transaction Manager
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-700 text-[10px] font-bold">Live Demo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px]">

            {/* LEFT: Step timeline */}
            <div className="border-b lg:border-b-0 lg:border-r border-border p-6 bg-muted/40 flex flex-col gap-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-3">Workflow Steps</div>

              {STEPS.map((s, i) => {
                const meta = STEP_META[s];
                const Icon = meta.icon;
                const isActive = s === step;
                const isDone = i < stepIndex;
                return (
                  <button key={s} onClick={() => jumpTo(s)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 w-full ${
                      isActive ? "bg-white shadow-soft border border-border" :
                      isDone ? "hover:bg-white/60" : "opacity-50 hover:opacity-70"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      isDone ? "bg-brand-teal" :
                      isActive ? "bg-ink" : "bg-border"
                    }`}>
                      {isDone
                        ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        : <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-ink-soft"}`} />
                      }
                    </div>
                    <div className="min-w-0">
                      <div className={`text-[11px] font-bold truncate ${isActive ? "text-ink" : isDone ? "text-brand-teal" : "text-ink-soft"}`}>
                        {meta.label}
                      </div>
                      <div className="text-[9px] text-ink-soft truncate">{meta.sublabel}</div>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-ink-soft ml-auto shrink-0" />}
                  </button>
                );
              })}

              {/* Progress bar */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] text-ink-soft font-black uppercase tracking-widest">Overall Progress</span>
                  <span className="text-[10px] font-bold text-brand-teal">{Math.round(((stepIndex + 1) / STEPS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-teal rounded-full"
                    animate={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>

            {/* CENTER: Active step content */}
            <div className="p-6 sm:p-8 flex flex-col justify-center min-h-[480px] bg-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/2 via-transparent to-brand-teal/2 pointer-events-none" />

              {/* Step label */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-[10px] font-black shrink-0">
                  {stepIndex + 1}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink">{STEP_META[step].label}</div>
                  <div className="text-[10px] text-ink-soft">{STEP_META[step].sublabel}</div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${step}-${stepKey}`}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full"
                >
                  {step === "manager"  && <StepManager  onNext={goNext} />}
                  {step === "forms"    && <StepForms    onNext={goNext} />}
                  {step === "link"     && <StepLink     onNext={goNext} />}
                  {step === "seller"   && <StepSeller   onNext={goNext} />}
                  {step === "support"  && <StepSupport  onNext={goNext} />}
                  {step === "complete" && <StepComplete />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: Context panel */}
            <div className="border-t lg:border-t-0 lg:border-l border-border p-6 bg-muted/40 flex flex-col gap-4">

              {/* Property card */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-2">Active Transaction</div>
                <div className="bg-white border border-border rounded-2xl p-3 shadow-soft">
                  <div className="text-xs font-bold text-ink">1284 Oak Ridge Way</div>
                  <div className="text-[10px] text-ink-soft mt-0.5">Austin, TX · $1,840,000</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] text-green-600 font-bold">Active Listing</span>
                  </div>
                </div>
              </div>

              {/* Parties */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-2">Parties</div>
                <div className="space-y-1.5">
                  {[
                    { role: "Transaction Mgr", name: "Sarah Chen", color: "bg-brand-blue" },
                    { role: "Seller",          name: "John Smith", color: "bg-brand-purple" },
                    { role: "Listing Agent",   name: "SOFO Realty", color: "bg-brand-teal" },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${p.color} flex items-center justify-center text-white text-[9px] font-black shrink-0`}>
                        {p.name[0]}
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-ink leading-tight">{p.name}</div>
                        <div className="text-[9px] text-ink-soft">{p.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-2">Timeline</div>
                <div className="space-y-1.5 font-mono text-[9px]">
                  {[
                    { t: "09:00", msg: "Transaction opened",    done: stepIndex >= 0 },
                    { t: "09:01", msg: "Forms added (5)",        done: stepIndex >= 1 },
                    { t: "09:02", msg: "Magic link generated",   done: stepIndex >= 2 },
                    { t: "09:04", msg: "Seller opened portal",   done: stepIndex >= 3 },
                    { t: "09:08", msg: "Support chat started",   done: stepIndex >= 4 },
                    { t: "09:14", msg: "All forms signed ✓",     done: stepIndex >= 5 },
                  ].map((e, i) => (
                    <motion.div key={i}
                      animate={{ opacity: e.done ? 1 : 0.3 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-ink-soft shrink-0 w-9">{e.t}</span>
                      <span className={e.done ? "text-ink" : "text-ink-soft"}>{e.msg}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Support availability badge */}
              <div className="mt-auto pt-3 border-t border-border">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-border">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-brand-blue border-2 border-white flex items-center justify-center">
                      <Bot className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-brand-teal border-2 border-white flex items-center justify-center">
                      <User className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-ink">Support available</div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[8px] text-green-600">AI + Human · Any page</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border px-6 py-4 bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-ink-soft" />
              <span className="text-xs text-ink-soft">Average completion time: <span className="font-bold text-ink">14 minutes</span></span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-ink-soft">
              <span>✓ E-signature ready</span>
              <span>✓ Legally compliant</span>
              <span>✓ Zero back-and-forth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
