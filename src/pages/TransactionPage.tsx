import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ArrowLeft, Sparkles, Home, FileText, Link2, Send, Check, CheckCircle2,
  Bot, User, Eye, Phone, Zap, ArrowRight, Shield, Clock, RefreshCw,
  ChevronRight, MessageCircle, Upload, Layers, Star, Activity,
  Mail, PenLine, HelpCircle, EyeOff, FolderOpen, AlertCircle, Search,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function TxNavbar() {
  const { openModal } = useBooking();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => { window.location.hash = ""; }}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-ink-soft hover:text-ink hover:border-ink/20 transition-all"
            aria-label="Go back home">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <a href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); window.location.hash = ""; }}
            className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center text-white font-display font-black shadow-soft">S</div>
            <span className="text-xl font-display font-bold tracking-tight text-ink">SOFO AI</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted">
          <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-widest text-ink-soft">Transaction Manager</span>
        </div>
        <button onClick={openModal}
          className="bg-ink text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-blue transition-all shadow-soft">
          Get Demo
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function TxHero() {
  const { openModal } = useBooking();
  return (
    <section className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.25] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/20 bg-brand-blue/5">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-blue">Agentic Transaction Manager</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-ink leading-[1.0] tracking-tight">
            Fully automated paperwork.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-teal">Real-time collaboration.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-ink-soft text-xl leading-relaxed max-w-2xl mx-auto">
            AI prepares everything. Your seller completes the rest together, in real time. No emails. No confusion. No follow-ups.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openModal}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-ink text-white font-bold text-base hover:bg-brand-blue transition-all shadow-soft">
              <Zap className="w-5 h-5" /> See It Live
            </button>
            <button onClick={openModal}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border-2 border-border text-ink font-bold text-base hover:border-ink/30 transition-all">
              Watch Demo <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-10 pt-4">
            {[
              { val: "14 min", label: "avg completion" },
              { val: "Zero", label: "manual data entry" },
              { val: "100%", label: "AI pre-filled" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-display font-black text-ink">{s.val}</div>
                <div className="text-xs text-ink-soft uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SPLIT SCREEN DEMO ────────────────────────────────────────────────────────
// Shared state types
type TxStep = 0 | 1 | 2 | 3 | 4 | 5;

const FORM_FIELDS = [
  { label: "Property Address",  value: "1284 Oak Ridge Way, Austin TX 78701" },
  { label: "List Price",        value: "$1,840,000" },
  { label: "Bedrooms / Baths",  value: "4 BR / 3.5 BA" },
  { label: "Square Footage",    value: "3,420 sqft" },
  { label: "Year Built",        value: "2019" },
  { label: "HOA Fees",          value: "$285 / month" },
];

const SELLER_STEPS = [
  "Personal Information",
  "Property Details",
  "Disclosure Questions",
  "Ownership History",
  "Utilities & Systems",
  "Final Review",
];

// ── Agent Side ────────────────────────────────────────────────────────────────
function AgentView({ txStep, sellerStep }: { txStep: TxStep; sellerStep: number }) {
  const docs = [
    { name: "Listing Agreement.pdf", color: "text-brand-blue",   bg: "bg-brand-blue/10" },
    { name: "Seller Disclosure.pdf", color: "text-brand-purple", bg: "bg-brand-purple/10" },
    { name: "IABs.pdf",              color: "text-brand-teal",   bg: "bg-brand-teal/10" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
        <div className="w-6 h-6 rounded-lg bg-ink flex items-center justify-center shrink-0">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-bold text-ink">Agent View AI Automated</div>
          <div className="text-[9px] text-ink-soft">Sarah Chen · Transaction Manager</div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-blue/10 border border-brand-blue/20">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
          <span className="text-[9px] font-bold text-brand-blue">AI Active</span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        {/* Property */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-border shadow-soft">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Home className="w-4 h-4 text-ink-soft" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold text-ink truncate">1284 Oak Ridge Way</div>
            <div className="text-[9px] text-ink-soft">Austin, TX · $1,840,000</div>
          </div>
          <div className="w-4 h-4 rounded-full bg-brand-blue flex items-center justify-center shrink-0">
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Uploaded docs */}
        <div className="space-y-1.5">
          <div className="text-[9px] font-black uppercase tracking-widest text-ink-soft px-1">Uploaded Documents</div>
          {docs.map((d, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-border">
              <div className={`w-6 h-6 rounded-lg ${d.bg} flex items-center justify-center shrink-0`}>
                <FileText className={`w-3 h-3 ${d.color}`} />
              </div>
              <span className="text-[10px] font-semibold text-ink flex-1 truncate">{d.name}</span>
              <div className="w-3.5 h-3.5 rounded-full bg-brand-teal flex items-center justify-center shrink-0">
                <Check className="w-2 h-2 text-white" strokeWidth={3} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Auto-filling fields */}
        {/* Magic Link button */}
        {txStep >= 3 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring" }}>
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all ${
              txStep >= 4 ? "border-brand-teal bg-brand-teal/5" : "border-brand-blue bg-brand-blue/5"
            }`}>
              <Link2 className={`w-4 h-4 shrink-0 ${txStep >= 4 ? "text-brand-teal" : "text-brand-blue"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-ink">
                  {txStep >= 4 ? "Magic Link Sent ✓" : "Generate Magic Link"}
                </div>
                {txStep >= 4 && (
                  <div className="text-[9px] font-mono text-brand-teal truncate">sofo.ai/tx/oak-ridge-xK9m</div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Live seller status */}
        {txStep >= 4 && sellerStep > 0 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200">
            <Activity className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="text-[10px] font-semibold text-amber-700">
              Seller is filling Step {sellerStep} of {SELLER_STEPS.length}…
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse ml-auto shrink-0" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── Seller Side ───────────────────────────────────────────────────────────────
function SellerView({ txStep, sellerStep, onSellerStep }: {
  txStep: TxStep; sellerStep: number; onSellerStep: (n: number) => void;
}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: "seller" | "ai"; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  const sendChat = useCallback(() => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatMessages((m) => [...m, { from: "seller", text: msg }]);
    setAiTyping(true);
    setTimeout(() => {
      setAiTyping(false);
      setChatMessages((m) => [...m, {
        from: "ai",
        text: "Great question! This field refers to any known material defects on the property. Include anything that could affect the value or safety of the home.",
      }]);
    }, 1400);
  }, [chatInput]);

  const waiting = txStep < 4;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
        <div className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center shrink-0">
          <User className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-bold text-ink">Seller View Guided Portal</div>
          <div className="text-[9px] text-ink-soft">John Smith · Seller</div>
        </div>
        {!waiting && (
          <button onClick={() => setChatOpen((o) => !o)}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 hover:bg-brand-purple/20 transition-all">
            <MessageCircle className="w-3 h-3 text-brand-purple" />
            <span className="text-[9px] font-bold text-brand-purple">Help</span>
          </button>
        )}
      </div>

      {waiting ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <Clock className="w-6 h-6 text-ink-soft" />
          </div>
          <div className="text-sm font-bold text-ink">Waiting for magic link…</div>
          <div className="text-[11px] text-ink-soft">Agent is preparing your forms with AI</div>
          <div className="flex gap-1 mt-1">
            {[0, 0.2, 0.4].map((d, i) => (
              <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-ink-soft/40"
                animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, delay: d, repeat: Infinity }} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Progress bar */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-ink-soft">
                Step {sellerStep} of {SELLER_STEPS.length}
              </span>
              <span className="text-[10px] font-bold text-brand-purple">
                {Math.round((sellerStep / SELLER_STEPS.length) * 100)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full"
                animate={{ width: `${(sellerStep / SELLER_STEPS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }} />
            </div>
            {/* Step pills */}
            <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
              {SELLER_STEPS.map((s, i) => (
                <div key={i} className={`shrink-0 px-2 py-0.5 rounded-full text-[8px] font-bold transition-all ${
                  i + 1 < sellerStep ? "bg-brand-teal/10 text-brand-teal" :
                  i + 1 === sellerStep ? "bg-brand-purple text-white" :
                  "bg-muted text-ink-soft"
                }`}>{s}</div>
              ))}
            </div>
          </div>

          {/* Active form fields */}
          <div className="flex-1 px-4 pb-3 space-y-2 overflow-hidden">
            <div className="text-[9px] font-black uppercase tracking-widest text-ink-soft mb-1">
              {SELLER_STEPS[sellerStep - 1] || SELLER_STEPS[0]}
            </div>
            {FORM_FIELDS.slice(0, 3).map((f, i) => (
              <motion.div key={`${sellerStep}-${i}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`px-3 py-2.5 rounded-xl border-2 transition-all ${
                  i === 0 ? "border-brand-purple bg-brand-purple/5 shadow-soft" : "border-border bg-white"
                }`}>
                <div className="text-[8px] text-ink-soft font-black uppercase tracking-widest">{f.label}</div>
                <div className="text-[10px] font-bold text-ink mt-0.5 flex items-center gap-1">
                  {f.value}
                  {i === 0 && (
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}
                      className="inline-block w-px h-3 bg-brand-purple ml-0.5" />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Agent update notification */}
            {sellerStep >= 2 && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-blue/5 border border-brand-blue/20">
                <Eye className="w-3 h-3 text-brand-blue shrink-0" />
                <span className="text-[9px] font-semibold text-brand-blue">Agent reviewed Section 1 ✓</span>
              </motion.div>
            )}

            {/* Next step button */}
            {sellerStep < SELLER_STEPS.length && (
              <button onClick={() => onSellerStep(sellerStep + 1)}
                className="w-full py-2.5 rounded-xl bg-ink text-white text-[10px] font-bold flex items-center justify-center gap-1.5 hover:bg-brand-purple transition-all mt-1">
                Continue to {SELLER_STEPS[sellerStep] || "Review"}
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {sellerStep === SELLER_STEPS.length && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-50 border border-green-200">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span className="text-[10px] font-bold text-green-700">All steps complete ready to submit!</span>
              </div>
            )}
          </div>

          {/* AI Chat */}
          <AnimatePresence>
            {chatOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                className="border-t border-border bg-muted/30 overflow-hidden">
                <div className="p-3 space-y-2 max-h-[140px] overflow-y-auto">
                  {chatMessages.length === 0 && (
                    <div className="text-[9px] text-ink-soft text-center py-2">Ask anything about your forms</div>
                  )}
                  {chatMessages.map((m, i) => (
                    <div key={i} className={`flex gap-1.5 ${m.from === "seller" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        m.from === "seller" ? "bg-ink" : "bg-brand-blue"
                      }`}>
                        {m.from === "seller" ? <User className="w-2.5 h-2.5 text-white" /> : <Bot className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <div className={`max-w-[80%] px-2.5 py-1.5 rounded-xl text-[9px] leading-relaxed ${
                        m.from === "seller" ? "bg-ink text-white" : "bg-white border border-border text-ink"
                      }`}>{m.text}</div>
                    </div>
                  ))}
                  {aiTyping && (
                    <div className="flex gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center shrink-0">
                        <Bot className="w-2.5 h-2.5 text-white" />
                      </div>
                      <div className="flex gap-1 items-center px-2.5 py-1.5 rounded-xl bg-white border border-border">
                        {[0, 0.15, 0.3].map((d, i) => (
                          <motion.div key={i} className="w-1 h-1 rounded-full bg-brand-blue/50"
                            animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, delay: d, repeat: Infinity }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 px-3 pb-3">
                  <input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendChat()}
                    placeholder="Ask about any field…"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-border text-[10px] bg-white focus:outline-none focus:border-brand-blue" />
                  <button onClick={sendChat}
                    className="px-3 py-1.5 rounded-xl bg-brand-blue text-white text-[10px] font-bold hover:opacity-90 transition-all">
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ─── REAL-TIME SYNC INDICATOR ─────────────────────────────────────────────────
function SyncPulse({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 px-3">
      <div className="relative flex items-center justify-center">
        {active && (
          <>
            <motion.div className="absolute w-8 h-8 rounded-full border border-brand-teal/40"
              animate={{ scale: [1, 2], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }} />
            <motion.div className="absolute w-8 h-8 rounded-full border border-brand-teal/30"
              animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
              transition={{ duration: 1.2, delay: 0.3, repeat: Infinity, ease: "easeOut" }} />
          </>
        )}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          active ? "bg-brand-teal" : "bg-border"
        }`}>
          <RefreshCw className={`w-3.5 h-3.5 ${active ? "text-white" : "text-ink-soft"}`} />
        </div>
      </div>
      <div className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">
        {active ? (
          <span className="text-brand-teal">Live Sync</span>
        ) : (
          <span className="text-ink-soft">Waiting</span>
        )}
      </div>
    </div>
  );
}

// ─── MAIN SPLIT SCREEN SECTION ────────────────────────────────────────────────
function SplitScreenSection() {
  const [txStep, setTxStep] = useState<TxStep>(0);
  const [sellerStep, setSellerStep] = useState(0);
  const [stepKey, setStepKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-advance agent AI steps
  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setTxStep(1), 800),
      setTimeout(() => setTxStep(2), 1800),
      setTimeout(() => setTxStep(3), 2800),
      setTimeout(() => setTxStep(4), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, stepKey]);

  // Auto-advance seller steps after link sent
  useEffect(() => {
    if (txStep < 4) return;
    const t1 = setTimeout(() => setSellerStep(1), 1000);
    const t2 = setTimeout(() => setSellerStep(2), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [txStep]);

  const syncActive = txStep >= 4 && sellerStep > 0;

  return (
    <section ref={ref} className="py-24 sm:py-32 px-4 sm:px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.2] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/20 bg-brand-blue/5">
            <Activity className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-blue">Live Collaboration</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight">
            Agent and seller. Same page. Real time.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-lg max-w-xl mx-auto">
            Every action syncs instantly. No emails. No waiting. No confusion.
          </motion.p>
        </div>

        {/* Split screen card */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl border border-border shadow-elevated overflow-hidden">

          {/* Window chrome */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <span className="text-[11px] text-ink-soft font-mono uppercase tracking-widest mx-auto">
              SOFO AI Transaction Manager · Live Session
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-700 text-[10px] font-bold">Live</span>
            </div>
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] min-h-[560px]">
            {/* Agent side */}
            <div className="border-b lg:border-b-0 lg:border-r border-border">
              <AgentView txStep={txStep} sellerStep={sellerStep} />
            </div>

            {/* Center sync column */}
            <div className="hidden lg:flex flex-col items-center justify-center px-4 py-6 bg-muted/20 border-r border-border gap-4 w-20">
              <SyncPulse active={syncActive} />
              {syncActive && (
                <div className="space-y-2 w-full">
                  {[
                    { label: "Seller updated details", color: "bg-amber-400" },
                    { label: "Agent reviewed §3",      color: "bg-brand-blue" },
                  ].map((e, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex flex-col items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${e.color}`} />
                      <div className="text-[7px] text-ink-soft text-center leading-tight font-semibold">{e.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Seller side */}
            <div>
              <SellerView txStep={txStep} sellerStep={sellerStep} onSellerStep={setSellerStep} />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border px-6 py-4 bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-ink-soft" />
              <span className="text-xs text-ink-soft">Avg completion: <span className="font-bold text-ink">14 minutes</span></span>
            </div>
            <button onClick={() => { setTxStep(0); setSellerStep(0); setStepKey((k) => k + 1); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-[10px] font-bold text-ink-soft hover:border-ink/30 hover:text-ink transition-all">
              <RefreshCw className="w-3 h-3" /> Replay Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PROCESS FLOW SECTION ─────────────────────────────────────────────────────
function ProcessFlowSection() {
  const steps = [
    { icon: Upload,       label: "Upload Docs",      color: "bg-brand-blue",   text: "text-brand-blue",   desc: "Agent uploads listing docs" },
    { icon: Bot,          label: "AI Extracts",       color: "bg-brand-purple", text: "text-brand-purple", desc: "AI reads & structures data" },
    { icon: Sparkles,     label: "AI Pre-fills",      color: "bg-brand-teal",   text: "text-brand-teal",   desc: "All fields auto-populated" },
    { icon: Link2,        label: "Send Link",         color: "bg-amber-500",    text: "text-amber-600",    desc: "Magic link sent to seller" },
    { icon: User,         label: "Seller Completes",  color: "bg-brand-blue",   text: "text-brand-blue",   desc: "Guided step-by-step portal" },
    { icon: RefreshCw,    label: "Live Sync",         color: "bg-brand-purple", text: "text-brand-purple", desc: "Both sides update in real time" },
    { icon: CheckCircle2, label: "Done",              color: "bg-green-500",    text: "text-green-600",    desc: "All forms signed & ready" },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white">
            <Zap className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-ink-soft">Automated Flow</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight">
            From upload to signed fully automated.
          </motion.h2>
        </div>

        {/* Desktop flow */}
        <div className="hidden lg:flex items-center gap-0">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex-1 flex flex-col items-center text-center px-2">
                <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center mb-3 shadow-soft`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-[11px] font-bold text-ink mb-0.5">{s.label}</div>
                <div className="text-[9px] text-ink-soft leading-tight">{s.desc}</div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
                  className="shrink-0 w-6 h-px bg-gradient-to-r from-border to-border origin-left" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile flow */}
        <div className="flex lg:hidden flex-col gap-3">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-white border border-border shadow-soft">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shrink-0`}>
                <s.icon className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-ink">{s.label}</div>
                <div className="text-[11px] text-ink-soft">{s.desc}</div>
              </div>
              <div className={`ml-auto text-[10px] font-black ${s.text}`}>{i + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRUST SECTION ────────────────────────────────────────────────────────────
function TrustSection() {
  const pillars = [
    { icon: Bot,        title: "No manual data entry",    desc: "AI extracts and pre-fills every field automatically from your uploaded documents.", color: "text-brand-blue",   bg: "bg-brand-blue/10",   bar: "bg-brand-blue" },
    { icon: User,       title: "No confusion for sellers", desc: "Step-by-step guided portal with plain-language AI explanations for every field.", color: "text-brand-purple", bg: "bg-brand-purple/10", bar: "bg-brand-purple" },
    { icon: RefreshCw,  title: "No follow-ups required",  desc: "Real-time sync means both parties always see the latest state no chasing emails.", color: "text-brand-teal",   bg: "bg-brand-teal/10",   bar: "bg-brand-teal" },
    { icon: Eye,        title: "Everything tracked live", desc: "Full audit trail of every action, review, and signature transparent and compliant.", color: "text-amber-600",   bg: "bg-amber-100",       bar: "bg-amber-500" },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted">
            <Shield className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-ink-soft">Why It Works</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight">
            Built to eliminate friction.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white border-2 border-border rounded-3xl p-7 hover:shadow-elevated transition-all relative overflow-hidden shadow-soft">
              <div className={`absolute top-0 left-0 right-0 h-1 ${p.bar}`} />
              <div className={`w-12 h-12 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-5`}>
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="text-ink font-display font-bold text-base mb-2">{p.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL STATE SECTION ──────────────────────────────────────────────────────
function FinalStateSection() {
  const { openModal } = useBooking();
  const forms = [
    "Listing Agreement",
    "Seller Disclosure (SD)",
    "IABs",
    "Lead Paint Disclosure",
    "HOA Addendum",
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.2] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-green-50">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-green-700">Final State</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl font-display font-bold text-ink tracking-tight">
              All forms complete. Ready for submission.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-ink-soft text-lg leading-relaxed">
              In 14 minutes, your listing goes from uploaded documents to fully signed, compliant paperwork with zero back-and-forth.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4">
              <button onClick={openModal}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-ink text-white font-bold text-base hover:bg-brand-blue transition-all shadow-soft">
                <Zap className="w-5 h-5" /> Start Free Trial
              </button>
              <button onClick={openModal}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border-2 border-border text-ink font-bold text-base hover:border-ink/30 transition-all">
                Book a Demo <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Right: completed forms card */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            className="bg-white rounded-3xl border border-border shadow-elevated p-6 space-y-4">
            {/* Success banner */}
            <div className="relative overflow-hidden px-5 py-4 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-teal text-white text-center">
              {[0, 0.5, 1.0].map((d, i) => (
                <motion.div key={i} className="absolute inset-0 rounded-2xl border-2 border-white/20"
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                  transition={{ duration: 2, delay: d, repeat: Infinity, ease: "easeOut" }} />
              ))}
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-black">Ready for Submission</div>
              <div className="text-[10px] text-white/70 mt-0.5">All {forms.length} forms signed · Legally compliant</div>
            </div>

            {/* Form list */}
            <div className="space-y-2">
              {forms.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-border">
                  <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[11px] font-semibold text-ink flex-1">{f}</span>
                  <span className="text-[9px] font-black text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">Signed</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-1.5 text-[10px] text-ink-soft">
                <Clock className="w-3 h-3" />
                <span>Completed in <span className="font-bold text-ink">14 min</span></span>
              </div>
              <div className="flex items-center gap-3 text-[9px] text-ink-soft">
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> E-signed</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS SECTION ────────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { val: "14 min", label: "average completion time" },
    { val: "Zero",   label: "manual data entry" },
    { val: "100%",   label: "AI pre-filled forms" },
    { val: "4.9★",   label: "agent satisfaction" },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl sm:text-5xl font-display font-black text-white mb-2">{s.val}</div>
              <div className="text-white/50 text-xs uppercase tracking-widest font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────
// ─── PROBLEM SECTION ─────────────────────────────────────────────────────────
function ProblemSection() {
  const pains: { icon: React.ElementType; title: string; desc: string }[] = [
    { icon: Mail,       title: "Endless email chains",   desc: "Agents send PDFs, sellers print, sign, scan, and email back. Every form is a 3-day back-and-forth." },
    { icon: PenLine,    title: "Manual data entry",      desc: "Agents re-type the same property details into every form address, price, beds, baths over and over." },
    { icon: HelpCircle, title: "Confused sellers",       desc: "Sellers receive 10+ page legal documents with no guidance. They stall, call, or fill things out wrong." },
    { icon: EyeOff,     title: "No visibility",          desc: "Agents have no idea if the seller has opened the forms, what page they're on, or where they're stuck." },
    { icon: FolderOpen, title: "Scattered paper forms",  desc: "Listing agreements, disclosures, IABs all in different formats, versions, and locations. Nothing is standardized." },
    { icon: AlertCircle,title: "Deals delayed",          desc: "Incomplete or incorrect paperwork pushes closing dates back. Agents lose time, sellers lose confidence." },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.2] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50"
          >
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-red-600">The Problem Today</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            How RIAs are doing it today  {" "}
            <span className="text-ink-soft">and why it's broken.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-lg max-w-2xl mx-auto"
          >
            Real estate agents spend hours every week on paperwork that should take minutes. Here's what the current process actually looks like.
          </motion.p>
        </div>

        {/* Pain grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {pains.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-border rounded-3xl p-6 shadow-soft relative overflow-hidden group hover:shadow-elevated transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center mb-4">
                <p.icon className="w-4 h-4 text-ink-soft" />
              </div>
              <h3 className="text-ink font-display font-bold text-base mb-2">{p.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Before/After comparison strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {/* Before */}
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-black">✕</span>
              </div>
              <span className="text-sm font-black text-red-700 uppercase tracking-widest">Without SOFO AI</span>
            </div>
            {[
              "Print → sign → scan → email (repeat for every form)",
              "Agent manually types property data into each document",
              "Seller calls with questions agent stops everything",
              "No idea if seller has started, stalled, or finished",
              "Wrong version of forms used compliance risk",
              "Average time to complete: 3–5 days",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-red-400 text-sm mt-0.5 shrink-0">✕</span>
                <span className="text-sm text-red-800">{t}</span>
              </div>
            ))}
          </div>

          {/* After */}
          <div className="bg-green-50 border border-green-200 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm font-black text-green-700 uppercase tracking-widest">With SOFO AI</span>
            </div>
            {[
              "AI extracts data and pre-fills all forms automatically",
              "One magic link sent seller completes everything online",
              "AI assistant answers seller questions instantly, 24/7",
              "Agent sees live progress: page, field, and status",
              "Always the latest compliant form versions",
              "Average time to complete: 14 minutes",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" strokeWidth={3} />
                <span className="text-sm text-green-800">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FORMS DIRECTORY SECTION ──────────────────────────────────────────────────
function FormsDirectorySection() {
  const { openModal } = useBooking();

  const formCategories = [
    { label: "Listing",     forms: ["Listing Agreement", "Seller's Net Sheet", "MLS Input Form", "Listing Checklist"] },
    { label: "Disclosure",  forms: ["Seller Property Disclosure", "Lead Paint Disclosure", "HOA Disclosure", "Natural Hazard Disclosure"] },
    { label: "Transaction", forms: ["Purchase Agreement", "Counter Offer", "Addendum", "Contingency Removal"] },
    { label: "Compliance",  forms: ["Agency Disclosure", "IABs", "Fair Housing Notice", "Wire Fraud Advisory"] },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.2] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/20 bg-brand-blue/5"
            >
              <FileText className="w-3.5 h-3.5 text-brand-blue" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-blue">Forms Directory Coming Soon</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
            >
              Every real estate form. Digital. Searchable. Ready.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-ink-soft text-lg leading-relaxed"
            >
              We're building a comprehensive digital forms directory every listing agreement, disclosure, addendum, and compliance form, converted into structured digital format.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-3"
            >
              {[
                { icon: FileText,   text: "All forms in structured digital format no more PDFs" },
                { icon: Bot,        text: "AI can read, fill, and validate every field automatically" },
                { icon: RefreshCw,  text: "Always up-to-date with the latest compliant versions" },
                { icon: Search,     text: "Searchable by state, transaction type, and form name" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-ink-soft" />
                  </div>
                  <span className="text-ink text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-ink text-white font-bold text-sm hover:bg-brand-blue transition-all shadow-soft"
              >
                <Sparkles className="w-4 h-4" /> Join the Waitlist
              </button>
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl border-2 border-border text-ink font-bold text-sm hover:border-ink/30 transition-all"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Right: form directory preview */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            className="bg-white rounded-3xl border border-border shadow-elevated overflow-hidden"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <span className="text-[10px] text-ink-soft font-mono uppercase tracking-widest mx-auto">SOFO Forms Directory</span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200">
                <span className="text-[9px] font-black text-amber-700">Beta</span>
              </div>
            </div>

            {/* Search bar */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted border border-border">
                <Search className="w-3.5 h-3.5 text-ink-soft shrink-0" />
                <span className="text-[11px] text-ink-soft">Search forms by name, state, or type…</span>
              </div>
            </div>

            {/* Category tabs */}
            <div className="px-4 pt-4 space-y-3 pb-4">
              {formCategories.map((cat, ci) => (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.1 }}
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-ink-soft">{cat.label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {cat.forms.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-muted border border-border hover:border-ink/20 hover:bg-white transition-all cursor-pointer">
                        <FileText className="w-3 h-3 shrink-0 text-ink-soft" />
                        <span className="text-[10px] font-semibold text-ink truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer count */}
            <div className="px-4 py-3 border-t border-border bg-muted/40 flex items-center justify-between">
              <span className="text-[10px] text-ink-soft">
                <span className="font-bold text-ink">200+</span> forms being digitized
              </span>
              <span className="text-[9px] font-black text-brand-teal uppercase tracking-widest">Growing daily</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────
export default function TransactionPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="bg-white">
      <TxNavbar />
      <TxHero />
      <ProblemSection />
      <FormsDirectorySection />
      <SplitScreenSection />
      <ProcessFlowSection />
      <TrustSection />
      <StatsSection />
      <FinalStateSection />
    </div>
  );
}

