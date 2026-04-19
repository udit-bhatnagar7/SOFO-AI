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

// ─── COLLABORATIVE FLOW DEMO ─────────────────────────────────────────────────
type Scene = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const PROMPT_TEMPLATES = [
  { label: "Luxury Listing",    color: "bg-brand-blue",   icon: Home,     desc: "High-end residential with premium features" },
  { label: "First-Time Seller", color: "bg-brand-purple", icon: User,     desc: "Guided flow for first-time home sellers" },
  { label: "Investment Property",color: "bg-amber-500",   icon: Layers,   desc: "Multi-unit or rental property listing" },
  { label: "Quick Sale",        color: "bg-brand-teal",   icon: Zap,      desc: "Streamlined process for fast closings" },
];

const FORM_FIELDS = [
  { label: "Property Address",  value: "1284 Oak Ridge Way, Austin TX 78701" },
  { label: "List Price",        value: "$1,840,000" },
  { label: "Bedrooms / Baths",  value: "4 BR / 3.5 BA" },
  { label: "Square Footage",    value: "3,420 sqft" },
  { label: "Year Built",        value: "2019" },
  { label: "HOA Fees",          value: "$285 / month" },
];

const SELLER_STEPS = [
  "Personal Info",
  "Property Details",
  "Disclosures",
  "Ownership History",
  "Utilities",
  "Final Review",
];

const SCENE_LABELS: Record<number, string> = {
  1: "Agent selects prompt",
  2: "Agent fills seller details",
  3: "Magic link generated",
  4: "Seller enters portal",
  5: "Seller fills form",
  6: "Live collaboration",
  7: "Agent review",
  8: "Seller updates",
  9: "Listing complete",
};

// ── Scene 1: Prompt Selection (Agent) ────────────────────────────────────────
function ScenePromptSelect({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  return (
    <div className="space-y-3">
      <div className="text-[9px] font-black uppercase tracking-widest text-ink-soft mb-2">Choose a listing template</div>
      {PROMPT_TEMPLATES.map((t, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          onClick={() => onSelect(i)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all ${
            selected === i
              ? "border-brand-blue bg-brand-blue/5 shadow-soft"
              : "border-border bg-white hover:border-ink/20"
          }`}
        >
          <div className={`w-7 h-7 rounded-lg ${t.color} flex items-center justify-center shrink-0`}>
            <t.icon className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold text-ink">{t.label}</div>
            <div className="text-[9px] text-ink-soft truncate">{t.desc}</div>
          </div>
          {selected === i && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-4 h-4 rounded-full bg-brand-blue flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// ── Scene 2: Seller Details Form (Agent) ─────────────────────────────────────
function SceneSellerDetails({ fieldIdx }: { fieldIdx: number }) {
  const fields = [
    { label: "Seller Name",       value: "John Smith",                        done: fieldIdx > 0 },
    { label: "Email",             value: "john.smith@email.com",              done: fieldIdx > 1 },
    { label: "Property Address",  value: "1284 Oak Ridge Way, Austin TX",     done: fieldIdx > 2 },
    { label: "List Price",        value: "$1,840,000",                        done: fieldIdx > 3 },
  ];
  return (
    <div className="space-y-2">
      <div className="text-[9px] font-black uppercase tracking-widest text-ink-soft mb-2">Seller & property details</div>
      {fields.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: i <= fieldIdx ? 1 : 0.3, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`px-3 py-2.5 rounded-xl border-2 transition-all ${
            i === fieldIdx ? "border-brand-blue bg-brand-blue/5 shadow-soft"
            : f.done ? "border-brand-teal/30 bg-brand-teal/5"
            : "border-border bg-white"
          }`}
        >
          <div className="text-[8px] text-ink-soft font-black uppercase tracking-widest">{f.label}</div>
          <div className="text-[10px] font-bold text-ink mt-0.5 flex items-center gap-1">
            {i <= fieldIdx ? f.value : "···"}
            {i === fieldIdx && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-px h-3 bg-brand-blue ml-0.5" />
            )}
            {f.done && <Check className="w-3 h-3 text-brand-teal ml-auto" strokeWidth={3} />}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Scene 3: Magic Link Generation ───────────────────────────────────────────
function SceneMagicLink({ sent }: { sent: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <motion.div
        animate={sent ? { scale: [1, 1.15, 1], boxShadow: ["0 0 0 0 rgba(20,184,166,0)", "0 0 0 16px rgba(20,184,166,0.15)", "0 0 0 0 rgba(20,184,166,0)"] } : {}}
        transition={{ duration: 0.6 }}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${sent ? "bg-brand-teal" : "bg-brand-blue"}`}
      >
        <Link2 className="w-6 h-6 text-white" />
      </motion.div>

      {!sent ? (
        <div className="text-center space-y-1">
          <div className="text-sm font-bold text-ink">Ready to send magic link</div>
          <div className="text-[11px] text-ink-soft">Seller will receive a personalized portal link</div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2 w-full">
          <div className="text-sm font-bold text-brand-teal">Magic link sent!</div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-teal/10 border border-brand-teal/20 mx-2">
            <Link2 className="w-3 h-3 text-brand-teal shrink-0" />
            <span className="text-[9px] font-mono text-brand-teal truncate">sofo.ai/tx/oak-ridge-xK9m</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 mx-auto w-fit"
          >
            <CheckCircle2 className="w-3 h-3 text-green-600" />
            <span className="text-[9px] font-bold text-green-700">Notification sent to john.smith@email.com</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// ── Scene 4: Seller Enters Portal ────────────────────────────────────────────
function SceneSellerEntry() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center gap-3 py-4 text-center"
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-12 h-12 rounded-2xl bg-brand-purple flex items-center justify-center"
      >
        <User className="w-6 h-6 text-white" />
      </motion.div>
      <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
        <div className="text-sm font-bold text-ink">Hi John, let's complete your listing</div>
        <div className="text-[11px] text-ink-soft mt-1">1284 Oak Ridge Way · Austin, TX</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-1"
      >
        {[0, 0.15, 0.3].map((d, i) => (
          <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-purple/40"
            animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, delay: d, repeat: Infinity }} />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── Scene 5 & 6: Seller Form + Live Collab ───────────────────────────────────
function SceneSellerForm({ sellerStep, onNext, chatMessages, chatInput, setChatInput, onSend, aiTyping, chatOpen, setChatOpen }: {
  sellerStep: number;
  onNext: () => void;
  chatMessages: { from: "seller" | "ai"; text: string }[];
  chatInput: string;
  setChatInput: (v: string) => void;
  onSend: () => void;
  aiTyping: boolean;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Progress */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1">
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
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="flex gap-1 mt-1.5 overflow-x-auto pb-0.5">
          {SELLER_STEPS.map((s, i) => (
            <div key={i} className={`shrink-0 px-2 py-0.5 rounded-full text-[8px] font-bold transition-all ${
              i + 1 < sellerStep ? "bg-brand-teal/10 text-brand-teal"
              : i + 1 === sellerStep ? "bg-brand-purple text-white"
              : "bg-muted text-ink-soft"
            }`}>{s}</div>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 px-3 pb-2 space-y-1.5 overflow-hidden">
        {FORM_FIELDS.slice(0, 3).map((f, i) => (
          <motion.div
            key={`${sellerStep}-${i}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`px-3 py-2 rounded-xl border-2 transition-all ${
              i === 0 ? "border-brand-purple bg-brand-purple/5 shadow-soft" : "border-border bg-white"
            }`}
          >
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

        {/* Auto-save indicator */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-1.5 px-2 py-1"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
          <span className="text-[8px] text-brand-teal font-semibold">Saved</span>
        </motion.div>

        {sellerStep < SELLER_STEPS.length ? (
          <button onClick={onNext}
            className="w-full py-2 rounded-xl bg-ink text-white text-[10px] font-bold flex items-center justify-center gap-1.5 hover:bg-brand-purple transition-all">
            Continue to {SELLER_STEPS[sellerStep] || "Review"}
            <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 border border-green-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
            <span className="text-[10px] font-bold text-green-700">All steps complete!</span>
          </div>
        )}
      </div>

      {/* Chat toggle */}
      <div className="px-3 pb-2">
        <button onClick={() => setChatOpen(!chatOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-purple/20 bg-brand-purple/5 hover:bg-brand-purple/10 transition-all w-full">
          <MessageCircle className="w-3 h-3 text-brand-purple" />
          <span className="text-[9px] font-bold text-brand-purple">Ask AI about any field</span>
          <ChevronRight className={`w-3 h-3 text-brand-purple ml-auto transition-transform ${chatOpen ? "rotate-90" : ""}`} />
        </button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-border bg-muted/30 overflow-hidden"
          >
            <div className="p-2.5 space-y-2 max-h-[120px] overflow-y-auto">
              {chatMessages.length === 0 && (
                <div className="text-[9px] text-ink-soft text-center py-1">Ask anything about your forms</div>
              )}
              {chatMessages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-1.5 ${m.from === "seller" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${m.from === "seller" ? "bg-ink" : "bg-brand-blue"}`}>
                    {m.from === "seller" ? <User className="w-2.5 h-2.5 text-white" /> : <Bot className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <div className={`max-w-[80%] px-2.5 py-1.5 rounded-xl text-[9px] leading-relaxed ${
                    m.from === "seller" ? "bg-ink text-white" : "bg-white border border-border text-ink"
                  }`}>{m.text}</div>
                </motion.div>
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
            <div className="flex gap-2 px-2.5 pb-2.5">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSend()}
                placeholder="Ask about any field…"
                className="flex-1 px-3 py-1.5 rounded-xl border border-border text-[10px] bg-white focus:outline-none focus:border-brand-blue" />
              <button onClick={onSend}
                className="px-3 py-1.5 rounded-xl bg-brand-blue text-white text-[10px] font-bold hover:opacity-90 transition-all">
                <Send className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Scene 7: Agent Review ─────────────────────────────────────────────────────
function SceneAgentReview({ approved, onApprove, onRequestChange }: {
  approved: boolean | null;
  onApprove: () => void;
  onRequestChange: () => void;
}) {
  const sections = ["Personal Info", "Property Details", "Disclosures"];
  return (
    <div className="space-y-2">
      <div className="text-[9px] font-black uppercase tracking-widest text-ink-soft mb-2">Review submitted listing</div>
      {sections.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all ${
            approved === true ? "border-green-200 bg-green-50"
            : approved === false && i === 1 ? "border-amber-200 bg-amber-50"
            : "border-border bg-white"
          }`}
        >
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
            approved === true ? "bg-green-100"
            : approved === false && i === 1 ? "bg-amber-100"
            : "bg-muted"
          }`}>
            <FileText className={`w-3 h-3 ${
              approved === true ? "text-green-600"
              : approved === false && i === 1 ? "text-amber-600"
              : "text-ink-soft"
            }`} />
          </div>
          <span className="text-[10px] font-semibold text-ink flex-1">{s}</span>
          {approved === true && <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />}
          {approved === false && i === 1 && <span className="text-[8px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Needs update</span>}
        </motion.div>
      ))}
      {approved === null && (
        <div className="flex gap-2 pt-1">
          <button onClick={onApprove}
            className="flex-1 py-2 rounded-xl bg-green-500 text-white text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-green-600 transition-all">
            <Check className="w-3 h-3" strokeWidth={3} /> Approve
          </button>
          <button onClick={onRequestChange}
            className="flex-1 py-2 rounded-xl border border-amber-300 text-amber-700 text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-amber-50 transition-all">
            <PenLine className="w-3 h-3" /> Request Edit
          </button>
        </div>
      )}
      {approved === true && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 border border-green-200">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span className="text-[10px] font-bold text-green-700">All sections approved!</span>
        </motion.div>
      )}
      {approved === false && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200">
          <Activity className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="text-[10px] font-semibold text-amber-700">Edit request sent to seller</span>
        </motion.div>
      )}
    </div>
  );
}

// ── Scene 9: Completion ───────────────────────────────────────────────────────
function SceneComplete() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-3 py-4 text-center"
    >
      <motion.div
        animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0)", "0 0 0 20px rgba(34,197,94,0.15)", "0 0 0 0 rgba(34,197,94,0)"] }}
        transition={{ duration: 1.5, repeat: 3 }}
        className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center"
      >
        <CheckCircle2 className="w-7 h-7 text-white" />
      </motion.div>
      <div>
        <div className="text-sm font-bold text-ink">Listing Complete</div>
        <div className="text-[11px] text-ink-soft mt-0.5">All forms signed · Legally compliant</div>
      </div>
      <div className="flex gap-3 text-[10px] text-ink-soft">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 14 min</span>
        <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> E-signed</span>
        <span className="flex items-center gap-1"><Check className="w-3 h-3" strokeWidth={3} /> Compliant</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-[10px] text-ink-soft italic"
      >
        "From prompt to completed listing — together in real time."
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN SPLIT SCREEN SECTION (new 9-scene) ─────────────────────────────────
function SplitScreenSection() {
  const [scene, setScene] = useState<Scene>(1);
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [fieldIdx, setFieldIdx] = useState(0);
  const [linkSent, setLinkSent] = useState(false);
  const [sellerStep, setSellerStep] = useState(1);
  const [chatMessages, setChatMessages] = useState<{ from: "seller" | "ai"; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [reviewResult, setReviewResult] = useState<boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-advance through all 9 scenes when section comes into view
  useEffect(() => {
    if (!inView) return;
    const delays = [0, 2000, 4000, 6500, 8500, 11000, 14000, 17000, 20000];
    const timers = delays.map((d, i) =>
      setTimeout(() => setScene((i + 1) as Scene), d)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  useEffect(() => {
    if (scene !== 2) return;
    if (fieldIdx >= 3) return;
    const t = setTimeout(() => setFieldIdx((f) => f + 1), 700);
    return () => clearTimeout(t);
  }, [scene, fieldIdx]);

  useEffect(() => {
    if (scene !== 3) return;
    const t = setTimeout(() => setLinkSent(true), 1200);
    return () => clearTimeout(t);
  }, [scene]);

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
        text: "Great question! This field refers to any known material defects. Include anything that could affect the value or safety of the home.",
      }]);
    }, 1400);
  }, [chatInput]);

  const reset = () => {
    setScene(1); setSelectedPrompt(0); setFieldIdx(0); setLinkSent(false);
    setSellerStep(1); setChatMessages([]); setChatInput(""); setAiTyping(false);
    setChatOpen(false); setReviewResult(null);
  };

  const sceneGroups = [
    { label: "Agent Setup",   scenes: [1, 2, 3] as Scene[] },
    { label: "Seller Portal", scenes: [4, 5] as Scene[] },
    { label: "Collaboration", scenes: [6, 7, 8] as Scene[] },
    { label: "Complete",      scenes: [9] as Scene[] },
  ];

  const isSplit = [6, 7, 8].includes(scene);
  const showAgent = [1, 2, 3, 6, 7, 8].includes(scene);
  const showSeller = [4, 5, 6, 7, 8].includes(scene);
  const isComplete = scene === 9;

  const statusLabel =
    scene <= 3 ? "Agent Preparing" :
    scene <= 5 ? "Seller Filling" :
    scene <= 8 ? "Live Collaboration" : "Completed";

  return (
    <section ref={ref} className="py-14 sm:py-20 px-4 sm:px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.2] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4">
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

        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl border border-border shadow-elevated overflow-hidden">

          {/* Chrome */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-muted">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <span className="text-[11px] text-ink-soft font-mono uppercase tracking-widest mx-auto hidden sm:block">
              SOFO AI · Transaction Manager · Live Session
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-border ml-auto">
              <span className={`w-1.5 h-1.5 rounded-full ${scene === 9 ? "bg-green-500" : scene >= 6 ? "bg-brand-blue animate-pulse" : scene >= 4 ? "bg-brand-blue" : "bg-amber-400"}`} />
              <span className="text-[9px] font-bold text-ink-soft">{statusLabel}</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex border-b border-border bg-muted/30 overflow-x-auto">
            {sceneGroups.map((g, gi) => {
              const active = g.scenes.includes(scene);
              const done = g.scenes[g.scenes.length - 1] < scene;
              return (
                <button key={gi} onClick={() => setScene(g.scenes[0])}
                  className={`flex-1 min-w-[80px] flex flex-col items-center gap-0.5 px-3 py-2.5 transition-all border-b-2 ${
                    active ? "border-brand-blue bg-brand-blue/5" : done ? "border-brand-teal/40" : "border-transparent"
                  }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black transition-all ${
                    active ? "bg-brand-blue text-white" : done ? "bg-brand-teal text-white" : "bg-border text-ink-soft"
                  }`}>
                    {done ? <Check className="w-2.5 h-2.5" strokeWidth={3} /> : gi + 1}
                  </div>
                  <span className={`text-[9px] font-bold whitespace-nowrap ${active ? "text-brand-blue" : done ? "text-brand-teal" : "text-ink-soft"}`}>
                    {g.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scene label + dots */}
          <div className="px-5 py-2 border-b border-border bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-ink-soft">Scene {scene}/9</span>
              <span className="text-[10px] font-semibold text-ink">{SCENE_LABELS[scene]}</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 9 }, (_, i) => (
                <button key={i} onClick={() => setScene((i + 1) as Scene)}
                  className={`w-2 h-2 rounded-full transition-all ${scene === i + 1 ? "bg-brand-blue scale-125" : i + 1 < scene ? "bg-brand-teal" : "bg-border"}`} />
              ))}
            </div>
          </div>

          {/* Panels */}
          <div className={`grid min-h-[400px] ${isSplit ? "grid-cols-1 lg:grid-cols-[1fr_48px_1fr]" : "grid-cols-1"}`}>

            {/* Scene 9: Full-width completion */}
            {isComplete && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="col-span-full flex flex-col items-center justify-center gap-6 py-16 px-8 text-center bg-gradient-to-b from-white to-green-50/40"
              >
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0)", "0 0 0 32px rgba(34,197,94,0.12)", "0 0 0 0 rgba(34,197,94,0)"] }}
                  transition={{ duration: 1.8, repeat: 3 }}
                  className="w-20 h-20 rounded-3xl bg-green-500 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-2xl font-display font-black text-ink mb-1">Listing Complete</motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="text-sm text-ink-soft">All forms signed · Legally compliant · Ready for submission</motion.div>
                </div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="flex items-center gap-6">
                  {[
                    { icon: Clock, label: "14 min", sub: "total time" },
                    { icon: Shield, label: "E-signed", sub: "all docs" },
                    { icon: Check, label: "100%", sub: "compliant" },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center">
                        <s.icon className="w-4.5 h-4.5 text-green-600" />
                      </div>
                      <div className="text-sm font-black text-ink">{s.label}</div>
                      <div className="text-[10px] text-ink-soft">{s.sub}</div>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                  className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-border shadow-soft">
                    <div className="w-6 h-6 rounded-lg bg-ink flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold text-ink">Agent Dashboard</span>
                    <span className="text-[9px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-full ml-1">✓ Done</span>
                  </div>
                  <RefreshCw className="w-4 h-4 text-brand-teal" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-border shadow-soft">
                    <div className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold text-ink">Seller Portal</span>
                    <span className="text-[9px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-full ml-1">✓ Done</span>
                  </div>
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                  className="text-sm text-ink-soft italic max-w-md">
                  "From prompt to completed listing — together in real time."
                </motion.p>
              </motion.div>
            )}

            {/* Agent panel */}
            {showAgent && (
              <AnimatePresence mode="wait">
                <motion.div key={`agent-${scene}`}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className={isSplit ? "border-b lg:border-b-0 lg:border-r border-border" : ""}>
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
                    <div className="w-6 h-6 rounded-lg bg-ink flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-ink">Agent Dashboard</div>
                      <div className="text-[9px] text-ink-soft">Sarah Chen · Transaction Manager</div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-blue/10 border border-brand-blue/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                      <span className="text-[9px] font-bold text-brand-blue">AI Active</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <AnimatePresence mode="wait">
                      {scene === 1 && <motion.div key="a1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ScenePromptSelect selected={selectedPrompt} onSelect={setSelectedPrompt} />
                      </motion.div>}
                      {scene === 2 && <motion.div key="a2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <SceneSellerDetails fieldIdx={fieldIdx} />
                      </motion.div>}
                      {scene === 3 && <motion.div key="a3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <SceneMagicLink sent={linkSent} />
                      </motion.div>}
                      {[6, 7, 8].includes(scene) && <motion.div key="a6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="space-y-2">
                          <div className="text-[9px] font-black uppercase tracking-widest text-ink-soft mb-2">Live listing status</div>
                          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-border shadow-soft">
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <Home className="w-4 h-4 text-ink-soft" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-bold text-ink truncate">1284 Oak Ridge Way</div>
                              <div className="text-[9px] text-ink-soft">Austin, TX · $1,840,000</div>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-[8px] font-black ${
                              scene >= 7 ? "bg-brand-blue/10 text-brand-blue" : "bg-amber-100 text-amber-700"
                            }`}>
                              {scene >= 7 ? "Under Review" : "Seller Filling"}
                            </div>
                          </div>
                          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200">
                            <Activity className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="text-[10px] font-semibold text-amber-700">Seller on Step {sellerStep}/{SELLER_STEPS.length}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse ml-auto shrink-0" />
                          </motion.div>
                          {scene === 6 && [
                            { text: "Seller updated Property Details", color: "bg-amber-400", time: "just now" },
                            { text: "Agent reviewed Section 1", color: "bg-brand-blue", time: "1m ago" },
                          ].map((e, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.2 }}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-border">
                              <div className={`w-1.5 h-1.5 rounded-full ${e.color} shrink-0`} />
                              <span className="text-[9px] text-ink flex-1">{e.text}</span>
                              <span className="text-[8px] text-ink-soft">{e.time}</span>
                            </motion.div>
                          ))}
                          {[7, 8].includes(scene) && (
                            <SceneAgentReview
                              approved={reviewResult}
                              onApprove={() => setReviewResult(true)}
                              onRequestChange={() => setReviewResult(false)}
                            />
                          )}
                        </div>
                      </motion.div>}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Center sync */}
            {isSplit && (
              <div className="hidden lg:flex flex-col items-center justify-center bg-muted/20 border-r border-border gap-3 py-6">
                <div className="relative flex items-center justify-center">
                  <motion.div className="absolute w-8 h-8 rounded-full border border-brand-teal/40"
                    animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }} />
                  <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center">
                    <RefreshCw className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-brand-teal text-center">Live Sync</span>
              </div>
            )}

            {/* Seller panel */}
            {showSeller && (
              <AnimatePresence mode="wait">
                <motion.div key={`seller-${scene}`}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}>
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
                    <div className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-ink">Seller Portal</div>
                      <div className="text-[9px] text-ink-soft">John Smith · Seller</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <AnimatePresence mode="wait">
                      {scene === 4 && <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <SceneSellerEntry />
                      </motion.div>}
                      {[5, 6].includes(scene) && <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <SceneSellerForm
                          sellerStep={sellerStep}
                          onNext={() => setSellerStep((s) => Math.min(s + 1, SELLER_STEPS.length))}
                          chatMessages={chatMessages} chatInput={chatInput}
                          setChatInput={setChatInput} onSend={sendChat}
                          aiTyping={aiTyping} chatOpen={chatOpen} setChatOpen={setChatOpen}
                        />
                      </motion.div>}
                      {scene === 7 && <motion.div key="s7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
                            <Eye className="w-5 h-5 text-amber-600" />
                          </div>
                          <div className="text-sm font-bold text-ink">Agent is reviewing your submission</div>
                          <div className="text-[11px] text-ink-soft">You'll be notified of any changes needed</div>
                          <div className="flex gap-1">
                            {[0, 0.2, 0.4].map((d, i) => (
                              <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400/60"
                                animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, delay: d, repeat: Infinity }} />
                            ))}
                          </div>
                        </div>
                      </motion.div>}
                      {scene === 8 && <motion.div key="s8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="space-y-2">
                          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-50 border border-amber-200">
                            <Activity className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="text-[10px] font-semibold text-amber-700">Agent requested update on Property Details</span>
                          </motion.div>
                          {FORM_FIELDS.slice(1, 3).map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className={`px-3 py-2.5 rounded-xl border-2 ${i === 0 ? "border-amber-300 bg-amber-50/50" : "border-border bg-white"}`}>
                              <div className="text-[8px] text-ink-soft font-black uppercase tracking-widest">{f.label}</div>
                              <div className="text-[10px] font-bold text-ink mt-0.5 flex items-center gap-1">
                                {f.value}
                                {i === 0 && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}
                                  className="inline-block w-px h-3 bg-amber-500 ml-0.5" />}
                              </div>
                            </motion.div>
                          ))}
                          <button className="w-full py-2 rounded-xl bg-brand-blue text-white text-[10px] font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-all">
                            <Check className="w-3 h-3" strokeWidth={3} /> Submit Update
                          </button>
                        </div>
                      </motion.div>}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Footer nav */}
          <div className="border-t border-border px-5 py-3 bg-muted/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-ink-soft" />
              <span className="text-xs text-ink-soft">Avg: <span className="font-bold text-ink">14 min</span></span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setScene((s) => Math.max(1, s - 1) as Scene)} disabled={scene === 1}
                className="px-3 py-1.5 rounded-xl border border-border text-[10px] font-bold text-ink-soft hover:border-ink/30 hover:text-ink transition-all disabled:opacity-30">
                ← Prev
              </button>
              <button onClick={() => scene < 9 ? setScene((s) => (s + 1) as Scene) : reset()}
                className="px-4 py-1.5 rounded-xl bg-ink text-white text-[10px] font-bold hover:bg-brand-blue transition-all flex items-center gap-1.5">
                {scene < 9 ? <>Next <ArrowRight className="w-3 h-3" /></> : <><RefreshCw className="w-3 h-3" /> Replay</>}
              </button>
            </div>
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
          className="relative"
        >
          {/* Center divider label */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center shadow-elevated">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <div className="text-[9px] font-black uppercase tracking-widest text-ink bg-white px-2 py-1 rounded-full border border-border shadow-soft whitespace-nowrap">
              SOFO AI
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border shadow-elevated">

            {/* Before — light red */}
            <div className="bg-red-50 p-8 space-y-5 relative overflow-hidden">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
                  <span className="text-red-500 text-sm font-black">✕</span>
                </div>
                <div>
                  <div className="text-red-700 font-black text-sm uppercase tracking-widest">Without SOFO AI</div>
                  <div className="text-red-400 text-[10px] font-semibold">The old way</div>
                </div>
                <div className="ml-auto px-2.5 py-1 rounded-full bg-red-100 border border-red-200">
                  <span className="text-red-600 text-[10px] font-black">3–5 days</span>
                </div>
              </div>

              {[
                { icon: Mail,       text: "Print → sign → scan → email every form" },
                { icon: PenLine,    text: "Manually re-type property data each time" },
                { icon: HelpCircle, text: "Seller calls confused, agent stops work" },
                { icon: EyeOff,     text: "Zero visibility into seller progress" },
                { icon: FolderOpen, text: "Wrong form versions, compliance risk" },
                { icon: Clock,      text: "Average: 3–5 days per transaction" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <span className="text-red-800 text-sm">{item.text}</span>
                </motion.div>
              ))}

              <div className="pt-4 border-t border-red-200 flex items-center gap-3">
                <div className="text-4xl font-display font-black text-red-500">3–5</div>
                <div className="text-red-400 text-xs uppercase tracking-widest leading-tight">days<br/>wasted</div>
              </div>
            </div>

            {/* After — bright clean */}
            <div className="bg-gradient-to-br from-brand-teal/5 via-white to-brand-blue/5 p-8 space-y-5 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-border">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-teal/8 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue/8 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-6 relative">
                <div className="w-8 h-8 rounded-full bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-brand-teal" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-ink font-black text-sm uppercase tracking-widest">With SOFO AI</div>
                  <div className="text-brand-teal text-[10px] font-semibold">The new way</div>
                </div>
                <div className="ml-auto px-2.5 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20">
                  <span className="text-brand-teal text-[10px] font-black">14 minutes</span>
                </div>
              </div>

              {[
                { icon: Sparkles,    text: "AI extracts & pre-fills all forms instantly" },
                { icon: Link2,       text: "One magic link — seller completes online" },
                { icon: Bot,         text: "AI answers seller questions 24/7" },
                { icon: Activity,    text: "Agent sees live progress in real time" },
                { icon: Shield,      text: "Always latest compliant form versions" },
                { icon: Zap,         text: "Average: 14 minutes per transaction" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 group relative"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-brand-teal" />
                  </div>
                  <span className="text-ink text-sm">{item.text}</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.3 }}
                    className="absolute bottom-0 left-10 right-0 h-px bg-brand-teal/10 origin-left"
                  />
                </motion.div>
              ))}

              {/* Big stat */}
              <div className="pt-4 border-t border-brand-teal/15 flex items-center gap-3 relative">
                <div className="text-4xl font-display font-black text-brand-teal">14</div>
                <div className="text-ink-soft text-xs uppercase tracking-widest leading-tight">minutes<br/>to complete</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-teal text-white text-[10px] font-black"
                >
                  <Zap className="w-3 h-3" /> 15× faster
                </motion.div>
              </div>
            </div>
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
      <SplitScreenSection />
      <ProblemSection />
      <FormsDirectorySection />
      <ProcessFlowSection />
      <TrustSection />
      <StatsSection />
      <FinalStateSection />
    </div>
  );
}

