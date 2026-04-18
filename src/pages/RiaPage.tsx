import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  Copy,
  AlertTriangle,
  FolderOpen,
  ArrowRight,
  Zap,
  Shield,
  Star,
  Check,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

// ─── RIA NAVBAR ───────────────────────────────────────────────────────────────
function RiaNavbar() {
  const { openModal } = useBooking();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { window.location.hash = ""; }}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-ink-soft hover:text-ink hover:border-ink/20 transition-all"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <a
            href="#"
            onClick={(e: { preventDefault: () => void }) => { e.preventDefault(); window.location.hash = ""; }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center text-white font-display font-black shadow-soft">
              S
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-ink">SOFO AI</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-widest text-ink-soft">RIA Automation</span>
        </div>
        <button
          onClick={openModal}
          className="bg-ink text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold hover:bg-brand-blue transition-all shadow-soft"
        >
          Start Free Trial
        </button>
      </div>
    </nav>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { openModal } = useBooking();
  const [filledCount, setFilledCount] = useState(0);

  const fields = [
    { label: "Property Address", value: "1284 Oak Ridge Way, Austin TX" },
    { label: "Listing Price", value: "$1,840,000" },
    { label: "Seller Name", value: "Bhatnagar Living Trust" },
    { label: "Commission", value: "2.5%" },
    { label: "MLS Number", value: "MLS-2024-08841" },
    { label: "Square Footage", value: "3,420 sq ft" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFilledCount((prev) => {
        if (prev >= fields.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 flex items-center relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
            >
              <Zap className="w-3 h-3 text-brand-blue" />
              RIA Automation by SOFO AI
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ink leading-[1.05] tracking-tight"
            >
              Fill your entire MLS listing in minutes,{" "}
              <span className="text-gradient-brand">automatically.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-ink-soft text-lg leading-relaxed font-medium max-w-xl"
            >
              Upload your documents and images. We extract all data, generate listing details, and complete every required form.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-ink text-white font-semibold text-sm hover:bg-brand-blue transition-all shadow-soft"
              >
                <Upload className="w-4 h-4" />
                Upload Documents
              </button>
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-border text-ink font-semibold text-sm hover:border-ink/30 transition-all"
              >
                See Demo
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 pt-2"
            >
              {[
                { val: "3.5 hrs", label: "saved per listing" },
                { val: "12+", label: "forms automated" },
                { val: "0", label: "missed fields" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-display font-black text-ink">{s.val}</div>
                  <div className="text-[10px] text-ink-soft font-semibold uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Animated MLS form mock */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
            className="relative"
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -top-4 -right-2 sm:right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-700 text-xs font-bold">12 forms completed</span>
            </motion.div>

            <div className="bg-white border border-border rounded-3xl p-6 shadow-elevated">
              {/* Mock header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] text-ink-soft font-mono uppercase tracking-widest">MLS Form Auto-Fill</span>
              </div>

              {/* Fields */}
              <div className="space-y-3">
                {fields.map((field, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-[10px] text-ink-soft font-semibold uppercase tracking-widest">{field.label}</div>
                    <div className="relative h-9 rounded-lg bg-muted/40 border border-border overflow-hidden w-full">
                      {i < filledCount ? (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          style={{ width: "100%" }}
                          className="absolute inset-0 flex items-center justify-between px-3"
                        >
                          <span className="text-sm text-ink font-medium">{field.value}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        </motion.div>
                      ) : i === filledCount ? (
                        <>
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-y-0 left-0 bg-brand-blue/10 rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center px-3 gap-1">
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.7, repeat: Infinity }}
                              className="inline-block w-0.5 h-4 bg-brand-blue rounded-full"
                            />
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-[10px] text-ink-soft font-semibold">
                  <span>Auto-filling fields...</span>
                  <span>{Math.round((filledCount / fields.length) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <motion.div
                    animate={{ width: `${(filledCount / fields.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FORM FILLING PANEL ───────────────────────────────────────────────────────
// Shows the active form being filled field-by-field with typewriter effect
function FormFillingPanel({
  activeStep,
  filledCount,
  completedForms,
}: {
  activeStep: number;
  filledCount: number;
  completedForms: string[];
}) {
  // The "active" form being filled right now
  const activeFormIdx = Math.min(filledCount, completedForms.length - 1);
  const activeFormName = completedForms[activeFormIdx] ?? completedForms[0];

  // Fields shown inside the active form document
  const formFields: Record<string, { label: string; value: string }[]> = {
    "Listing Agreement": [
      { label: "Seller Name",    value: "Bhatnagar Living Trust" },
      { label: "Property",       value: "1284 Oak Ridge Way" },
      { label: "List Price",     value: "$1,840,000" },
      { label: "Commission",     value: "2.5%" },
      { label: "Effective Date", value: "04/18/2026" },
    ],
    "Seller Disclosure": [
      { label: "Owner Name",     value: "Bhatnagar Living Trust" },
      { label: "Property Addr", value: "1284 Oak Ridge Way" },
      { label: "HOA",            value: "Yes — $285/mo" },
      { label: "Year Built",     value: "2018" },
      { label: "Sq Footage",     value: "3,420 sq ft" },
    ],
    "IABS Form": [
      { label: "Broker Name",    value: "SOFO Realty Group" },
      { label: "License No.",    value: "TX-0094821" },
      { label: "Client Name",    value: "Bhatnagar Living Trust" },
      { label: "Property",       value: "1284 Oak Ridge Way" },
      { label: "Date",           value: "04/18/2026" },
    ],
  };

  const defaultFields = [
    { label: "Property",   value: "1284 Oak Ridge Way" },
    { label: "Seller",     value: "Bhatnagar Living Trust" },
    { label: "Date",       value: "04/18/2026" },
    { label: "Amount",     value: "$1,840,000" },
  ];

  const fields = formFields[activeFormName] ?? defaultFields;

  // Typewriter: how many chars of each field value to show
  const [charCounts, setCharCounts] = useState<number[]>([]);
  const [fieldIdx, setFieldIdx] = useState(0);

  // Reset and re-run typewriter whenever the active form changes
  useEffect(() => {
    if (activeStep < 2) return;
    setCharCounts([]);
    setFieldIdx(0);
  }, [activeFormName, activeStep]);

  useEffect(() => {
    if (activeStep < 2) return;
    if (fieldIdx >= fields.length) return;
    const target = fields[fieldIdx].value;
    const current = charCounts[fieldIdx] ?? 0;
    if (current < target.length) {
      const t = setTimeout(() => {
        setCharCounts((prev) => {
          const next = [...prev];
          next[fieldIdx] = (next[fieldIdx] ?? 0) + 1;
          return next;
        });
      }, 28);
      return () => clearTimeout(t);
    } else {
      // Move to next field after short pause
      const t = setTimeout(() => setFieldIdx((p: number) => p + 1), 120);
      return () => clearTimeout(t);
    }
  }, [charCounts, fieldIdx, fields, activeStep]);

  const progress = (filledCount / completedForms.length) * 100;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-colors ${activeStep >= 2 ? "bg-green-500 animate-pulse" : "bg-border"}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Forms Auto-Filled</span>
        </div>
        <motion.span
          key={filledCount}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="text-[10px] font-black text-green-600"
        >
          {filledCount} / {completedForms.length}
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-3 pb-1">
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-brand-blue to-green-500"
          />
        </div>
      </div>

      {/* Active form document */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Form title bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFormName}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-brand-blue/5 border border-brand-blue/10"
          >
            <div className="w-6 h-6 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5 text-brand-blue" />
            </div>
            <span className="text-xs font-bold text-brand-blue truncate">{activeFormName}</span>
            {activeStep >= 2 && filledCount > activeFormIdx && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="ml-auto shrink-0"
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Form fields being typed */}
        <div className="space-y-2">
          {fields.map((field, i) => {
            const typed = charCounts[i] ?? 0;
            const isDone = typed >= field.value.length;
            const isActive = i === fieldIdx && activeStep >= 2;

            return (
              <div
                key={`${activeFormName}-${i}`}
                className={`rounded-lg border transition-all duration-200 overflow-hidden ${
                  isDone ? "border-green-200 bg-green-50/50" :
                  isActive ? "border-brand-blue/30 bg-brand-blue/3" :
                  "border-border/40 bg-muted/20"
                }`}
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-ink-soft/60 w-20 shrink-0">
                    {field.label}
                  </span>
                  <div className="flex-1 min-w-0 flex items-center gap-1">
                    <span className={`text-xs font-semibold ${isDone ? "text-ink" : "text-ink/70"}`}>
                      {field.value.slice(0, typed)}
                    </span>
                    {/* Blinking cursor on active field */}
                    {isActive && !isDone && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-0.5 h-3 bg-brand-blue rounded-full"
                      />
                    )}
                  </div>
                  {isDone && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="shrink-0"
                    >
                      <Check className="w-3 h-3 text-green-500" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completed forms mini-list */}
        {filledCount > 0 && (
          <div className="mt-auto pt-2 border-t border-border/30">
            <div className="text-[9px] font-black uppercase tracking-widest text-ink-soft/50 mb-1.5">Completed</div>
            <div className="flex flex-wrap gap-1">
              {completedForms.slice(0, filledCount).map((f, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700"
                >
                  {f}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Done state */}
      <AnimatePresence>
        {activeStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-4 p-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0"
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </motion.div>
            <div>
              <div className="text-sm font-bold text-green-800">All 12 forms completed</div>
              <div className="text-[10px] text-green-600">Zero errors · Ready to submit</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── INSTANT DEMO SECTION ─────────────────────────────────────────────────────
function InstantDemoSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [extractedCount, setExtractedCount] = useState(0);
  const [filledCount, setFilledCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const pdfs = [
    { name: "listing_agreement.pdf",   size: "2.4 MB", color: "text-red-500",    bg: "bg-red-50",    border: "border-red-100" },
    { name: "seller_disclosure.pdf",   size: "1.8 MB", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
    { name: "iabs_form.pdf",           size: "0.9 MB", color: "text-amber-500",  bg: "bg-amber-50",  border: "border-amber-100" },
    { name: "hoa_addendum.pdf",        size: "1.1 MB", color: "text-blue-500",   bg: "bg-blue-50",   border: "border-blue-100" },
    { name: "lead_paint_disclosure.pdf", size: "0.6 MB", color: "text-green-500", bg: "bg-green-50", border: "border-green-100" },
  ];

  const extractedFields = [
    { label: "Seller Name",       value: "Bhatnagar Living Trust" },
    { label: "Property Address",  value: "1284 Oak Ridge Way, Austin TX" },
    { label: "Listing Price",     value: "$1,840,000" },
    { label: "Commission",        value: "2.5% Buyer Agency" },
    { label: "Square Footage",    value: "3,420 sq ft" },
    { label: "Year Built",        value: "2018" },
    { label: "Bedrooms",          value: "4" },
    { label: "Bathrooms",         value: "3.5" },
    { label: "HOA Fees",          value: "$285/month" },
    { label: "Tax ID",            value: "82-194-0041" },
  ];

  const completedForms = [
    "Listing Agreement",
    "Seller Disclosure",
    "IABS Form",
    "Lead Paint Disclosure",
    "HOA Addendum",
    "Commission Agreement",
    "MLS Input Sheet",
    "Earnest Money Receipt",
    "Title Commitment",
    "Showing Instructions",
    "Lockbox Authorization",
    "Property Survey",
  ];

  function runDemo() {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setExtractedCount(0);
    setFilledCount(0);

    // Step 1 → Step 2 after 1.8s
    setTimeout(() => setActiveStep(1), 1800);

    // Extract fields one by one starting at 2s
    extractedFields.forEach((_, i) => {
      setTimeout(() => setExtractedCount(i + 1), 2000 + i * 180);
    });

    // Step 3 after extraction done
    setTimeout(() => setActiveStep(2), 2000 + extractedFields.length * 180 + 400);

    // Fill forms one by one
    completedForms.forEach((_, i) => {
      setTimeout(() => setFilledCount(i + 1), 2000 + extractedFields.length * 180 + 600 + i * 120);
    });

    // Done
    setTimeout(() => {
      setActiveStep(3);
      setIsRunning(false);
    }, 2000 + extractedFields.length * 180 + 600 + completedForms.length * 120 + 400);
  }

  // Auto-start on mount
  useEffect(() => {
    const t = setTimeout(runDemo, 800);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stepDefs = [
    { num: "01", label: "Upload Documents" },
    { num: "02", label: "AI Extracts Data" },
    { num: "03", label: "Forms Auto-Filled" },
    { num: "04", label: "Ready to Publish" },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Live Demo
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Watch it work in real-time.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-base max-w-lg mx-auto"
          >
            Upload 5 PDFs. RIA extracts every field and fills 12 forms automatically.
          </motion.p>
        </div>

        {/* Progress pipeline */}
        <div className="flex items-center justify-center gap-0 mb-8 overflow-x-auto pb-2">
          {stepDefs.map((s, i) => (
            <div key={i} className="flex items-center shrink-0">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                activeStep > i ? "bg-green-50 border border-green-200" :
                activeStep === i ? "bg-brand-blue/10 border border-brand-blue/20" :
                "bg-muted/40 border border-border/40"
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black transition-all ${
                  activeStep > i ? "bg-green-500 text-white" :
                  activeStep === i ? "bg-brand-blue text-white" :
                  "bg-border text-ink-soft"
                }`}>
                  {activeStep > i ? (
                    <Check className="w-3 h-3" strokeWidth={3} />
                  ) : s.num}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${
                  activeStep > i ? "text-green-700" :
                  activeStep === i ? "text-brand-blue" :
                  "text-ink-soft/50"
                }`}>{s.label}</span>
              </div>
              {i < stepDefs.length - 1 && (
                <div className={`w-6 h-px mx-1 transition-colors duration-500 ${activeStep > i ? "bg-green-300" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Main demo panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Panel 1: PDF Upload */}
          <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-colors ${activeStep >= 0 ? "bg-green-500" : "bg-border"}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Documents Uploaded</span>
              </div>
              <span className="text-[10px] font-black text-brand-blue">{pdfs.length} / {pdfs.length}</span>
            </div>
            <div className="p-4 space-y-2">
              {pdfs.map((pdf, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 200, damping: 20 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/30 border border-border/50 group hover:bg-muted/60 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg ${pdf.bg} ${pdf.border} border flex items-center justify-center shrink-0`}>
                    <FileText className={`w-4 h-4 ${pdf.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-ink truncate">{pdf.name}</div>
                    <div className="text-[10px] text-ink-soft">{pdf.size}</div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.12 + 0.3, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
            {/* Total size */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
                <span className="text-[10px] text-brand-blue font-bold uppercase tracking-widest">Total</span>
                <span className="text-[10px] font-black text-brand-blue">6.8 MB · 5 files</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Extracted Fields */}
          <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-colors ${activeStep >= 1 ? "bg-green-500 animate-pulse" : "bg-border"}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Fields Extracted</span>
              </div>
              <motion.span
                key={extractedCount}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="text-[10px] font-black text-brand-blue"
              >
                {extractedCount} / {extractedFields.length}
              </motion.span>
            </div>
            <div className="divide-y divide-border/30">
              {extractedFields.map((field, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 relative overflow-hidden">
                  {/* Fill bar */}
                  <AnimatePresence>
                    {i < extractedCount && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-brand-blue/4"
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative text-[10px] text-ink-soft font-semibold uppercase tracking-widest">{field.label}</span>
                  <AnimatePresence mode="wait">
                    {i < extractedCount ? (
                      <motion.span
                        key="val"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative text-xs font-bold text-ink"
                      >
                        {field.value}
                      </motion.span>
                    ) : (
                      <motion.div
                        key="empty"
                        animate={activeStep >= 1 && i === extractedCount ? { opacity: [0.3, 0.8, 0.3] } : {}}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="relative w-20 h-2.5 rounded bg-muted"
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3: Live Form Filling */}
          <FormFillingPanel
            activeStep={activeStep}
            filledCount={filledCount}
            completedForms={completedForms}
          />
        </div>

        {/* Replay button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white text-sm font-semibold text-ink-soft hover:text-ink hover:border-ink/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <motion.div
              animate={isRunning ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            {isRunning ? "Processing..." : "Run Demo Again"}
          </button>
        </div>

      </div>
    </section>
  );
}

// ─── PROBLEM SECTION ──────────────────────────────────────────────────────────
function ProblemSection() {
  const painCards = [
    {
      icon: Clock,
      title: "Manual MLS entry is slow",
      desc: "Agents spend hours manually typing property data into MLS fields, one field at a time.",
      stat: "3.5 hrs",
      statLabel: "per listing",
    },
    {
      icon: Copy,
      title: "Copy-paste across forms",
      desc: "The same data gets re-entered across a dozen different forms, creating room for errors.",
      stat: "12+",
      statLabel: "times re-entered",
    },
    {
      icon: AlertTriangle,
      title: "Risk of missing fields",
      desc: "One in four listings has at least one missing or incorrect field that causes delays.",
      stat: "1 in 4",
      statLabel: "listings affected",
    },
    {
      icon: FolderOpen,
      title: "Complex paperwork stack",
      desc: "Every listing requires a stack of forms: listing agreement, disclosures, IABS, and more.",
      stat: "10+",
      statLabel: "forms per deal",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-white text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
          >
            <AlertTriangle className="w-3 h-3 text-red-500" />
            The Problem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Real estate paperwork shouldn't take hours.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-base sm:text-lg font-medium max-w-xl mx-auto"
          >
            Every listing buries agents in repetitive, error-prone manual work. It doesn't have to be this way.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {painCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-border shadow-soft p-7 flex gap-5 group hover:shadow-elevated transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <card.icon className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-display font-bold text-ink leading-tight">{card.title}</h3>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-display font-black text-red-500 leading-none">{card.stat}</div>
                    <div className="text-[10px] text-ink-soft/60 font-bold uppercase tracking-widest">{card.statLabel}</div>
                  </div>
                </div>
                <p className="text-sm text-ink-soft font-medium leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTION SECTION ─────────────────────────────────────────────────────────
function SolutionSection() {
  const rows = [
    {
      bad: "Manual data entry",
      good: "Automated extraction",
      badIcon: "✗",
      goodIcon: "✓",
    },
    {
      bad: "Messy, inconsistent forms",
      good: "Structured, validated data",
      badIcon: "✗",
      goodIcon: "✓",
    },
    {
      bad: "Slow, hours of work",
      good: "Instant, minutes to complete",
      badIcon: "✗",
      goodIcon: "✓",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
          >
            <Zap className="w-3 h-3 text-brand-blue" />
            The Solution
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            From chaos to completed, instantly.
          </motion.h2>
        </div>

        <div className="space-y-4">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center"
            >
              {/* Bad side */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-black shrink-0">
                  {row.badIcon}
                </span>
                <span className="text-sm font-semibold text-red-700">{row.bad}</span>
              </div>
              {/* Arrow */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 shrink-0">
                <ArrowRight className="w-4 h-4 text-brand-blue" />
              </div>
              {/* Good side */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-100">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-black shrink-0">
                  {row.goodIcon}
                </span>
                <span className="text-sm font-semibold text-green-700">{row.good}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES SECTION ─────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Full Data Extraction",
      desc: "Extracts every field from listing agreements, seller disclosures, and IABS forms automatically.",
      color: "blue",
    },
    {
      icon: Zap,
      title: "MLS Auto-Fill",
      desc: "Completes all MLS fields automatically from extracted data. No manual typing required.",
      color: "purple",
    },
    {
      icon: Star,
      title: "Public Remarks Generator",
      desc: "AI-generated high-quality listing descriptions that highlight the property's best features.",
      color: "teal",
    },
    {
      icon: CheckCircle,
      title: "Form Completion",
      desc: "Listing agreement, seller disclosure, and IABS forms are all auto-filled in one pass.",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Error Detection",
      desc: "Detects missing or inconsistent information before submission, preventing costly delays.",
      color: "purple",
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; bar: string }> = {
    blue: { bg: "bg-blue-50", text: "text-brand-blue", border: "border-blue-100", bar: "bg-brand-blue" },
    purple: { bg: "bg-purple-50", text: "text-brand-purple", border: "border-purple-100", bar: "bg-brand-purple" },
    teal: { bg: "bg-teal-50", text: "text-brand-teal", border: "border-teal-100", bar: "bg-brand-teal" },
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-white text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
          >
            <CheckCircle className="w-3 h-3 text-brand-teal" />
            Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Everything handled automatically.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const c = colorMap[feat.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-3xl border border-border shadow-soft p-7 group hover:shadow-elevated transition-all relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${c.bar}`} />
                <div className={`w-11 h-11 rounded-2xl ${c.bg} ${c.text} border ${c.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feat.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-display font-bold text-ink mb-2">{feat.title}</h3>
                <p className="text-sm text-ink-soft font-medium leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── WORKFLOW SECTION ─────────────────────────────────────────────────────────
function WorkflowSection() {
  const steps = [
    { num: 1, icon: Upload, title: "Upload Documents", desc: "Drop in listing agreements, disclosures, and IABS" },
    { num: 2, icon: Zap, title: "Extract Data", desc: "AI reads and structures every field automatically" },
    { num: 3, icon: FileText, title: "Fill MLS", desc: "All MLS fields populated with extracted data" },
    { num: 4, icon: CheckCircle, title: "Complete Forms", desc: "Every required form filled and validated" },
    { num: 5, icon: Star, title: "Listing Ready", desc: "Publish-ready listing in minutes, not hours" },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-white text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
          >
            <ArrowRight className="w-3 h-3 text-brand-blue" />
            How It Works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Five steps to a complete listing.
          </motion.h2>
        </div>

        {/* Desktop: horizontal pipeline */}
        <div className="hidden lg:flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 flex flex-col items-center text-center px-3"
              >
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-border shadow-soft flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-ink-soft" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center text-[9px] font-black text-white">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-sm font-display font-bold text-ink mb-1">{step.title}</h3>
                <p className="text-[12px] text-ink-soft font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex items-center pt-7 shrink-0">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                    className="w-8 h-px bg-gradient-to-r from-brand-blue/60 to-brand-purple/60 origin-left"
                  />
                  <ArrowRight className="w-3 h-3 text-brand-blue/60 -ml-1" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical pipeline */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-border shadow-soft"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-brand-blue" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center text-[9px] font-black text-white">
                  {step.num}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-display font-bold text-ink mb-1">{step.title}</h3>
                <p className="text-[12px] text-ink-soft font-medium">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCT UI SECTION ───────────────────────────────────────────────────────
function ProductUISection() {
  const extractedFields = [
    { label: "Seller", value: "Bhatnagar Living Trust" },
    { label: "Address", value: "1284 Oak Ridge Way" },
    { label: "City", value: "Austin, TX 78750" },
    { label: "Price", value: "$1,840,000" },
    { label: "Commission", value: "2.5%" },
    { label: "Sq Ft", value: "3,420" },
    { label: "Beds", value: "4" },
    { label: "Baths", value: "3.5" },
  ];

  const mlsFields = [
    { label: "List Price", value: "$1,840,000", filled: true },
    { label: "Property Type", value: "Single Family", filled: true },
    { label: "Year Built", value: "2018", filled: true },
    { label: "Lot Size", value: "0.32 acres", filled: true },
    { label: "Garage", value: "2-car attached", filled: true },
    { label: "Pool", value: "Yes", filled: true },
  ];

  const completedForms = [
    "Listing Agreement",
    "Seller Disclosure",
    "IABS Form",
    "Lead Paint Disclosure",
    "HOA Addendum",
    "MLS Input Sheet",
    "Commission Agreement",
    "Property Survey",
    "Title Commitment",
    "Earnest Money Receipt",
    "Showing Instructions",
    "Lockbox Authorization",
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
          >
            <Zap className="w-3 h-3 text-brand-purple" />
            Product Preview
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            See exactly what gets automated.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden border border-border shadow-elevated"
        >
          {/* Panel 1: Extracted Data */}
          <div className="flex flex-col">
            <div className="bg-muted border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-ink-soft font-mono ml-2">Extracted Data</span>
            </div>
            <div className="bg-muted/20 p-4 flex-1 space-y-2">
              {extractedFields.map((f, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                  <span className="text-[10px] text-ink-soft font-semibold uppercase tracking-widest">{f.label}</span>
                  <span className="text-[11px] text-ink font-medium">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: MLS Interface */}
          <div className="flex flex-col">
            <div className="bg-muted border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-ink-soft font-mono ml-2">MLS Interface</span>
            </div>
            <div className="bg-muted/20 p-4 flex-1 space-y-3">
              {mlsFields.map((f, i) => (
                <div key={i} className="space-y-1">
                  <label className="text-[9px] text-ink-soft font-semibold uppercase tracking-widest">{f.label}</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-border">
                    <span className="text-[11px] text-ink font-medium flex-1">{f.value}</span>
                    {f.filled && <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3: Completed Forms */}
          <div className="flex flex-col">
            <div className="bg-muted border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-ink-soft font-mono ml-2">Completed Forms</span>
            </div>
            <div className="bg-muted/20 p-4 flex-1 space-y-2">
              {completedForms.map((form, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1.5 border-b border-border last:border-0">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-[11px] text-ink-soft font-medium">{form}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── RESULTS SECTION ──────────────────────────────────────────────────────────
function ResultsSection() {
  const stats = [
    { num: "3+", label: "hours saved per listing", sub: "Compared to manual entry" },
    { num: "10+", label: "forms automated", sub: "Per transaction, zero manual input" },
    { num: "0", label: "missed fields", sub: "Built-in validation catches everything" },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Real results, every listing.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl font-display font-black text-ink mb-2">{stat.num}</div>
              <div className="text-base font-bold text-ink mb-1">{stat.label}</div>
              <div className="text-sm text-ink-soft font-medium">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING SECTION ──────────────────────────────────────────────────────────
function PricingSection() {
  const { openModal } = useBooking();

  const perListingFeatures = [
    "Full MLS auto-fill",
    "All forms completed",
    "Public remarks generated",
    "Error detection",
    "No subscription",
  ];

  const monthlyFeatures = [
    "Full MLS auto-fill",
    "All forms completed",
    "Public remarks generated",
    "Error detection",
    "Unlimited listings",
    "Priority processing",
    "Team collaboration",
    "API access",
    "Free trial included",
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
          >
            <Star className="w-3 h-3 text-brand-blue" />
            Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Simple, transparent pricing.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Pay Per Listing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-border shadow-soft p-8 flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-xl font-display font-bold text-ink mb-1">Pay Per Listing</h3>
              <p className="text-sm text-ink-soft font-medium">Perfect for occasional use</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-display font-black text-ink">$29</span>
              <span className="text-ink-soft font-medium ml-1">/listing</span>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {perListingFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-brand-blue" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-ink-soft font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="w-full py-3.5 rounded-2xl border border-border text-ink font-semibold text-sm hover:bg-muted transition-colors"
            >
              Get Started
            </button>
          </motion.div>

          {/* Monthly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border-2 border-brand-blue shadow-elevated p-8 flex flex-col relative overflow-hidden"
          >
            {/* Most Popular badge */}
            <div className="absolute top-5 right-5">
              <span className="px-2.5 py-1 rounded-full bg-brand-blue text-white text-[10px] font-black uppercase tracking-widest">
                Most Popular
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-display font-bold text-ink mb-1">Monthly Plan</h3>
              <p className="text-sm text-ink-soft font-medium">For active agents and teams</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-display font-black text-ink">$199</span>
              <span className="text-ink-soft font-medium ml-1">/month</span>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {monthlyFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-brand-blue" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-ink-soft font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="w-full py-3.5 rounded-2xl bg-brand-blue text-white font-semibold text-sm hover:opacity-90 transition-all shadow-soft"
            >
              Start Free Trial
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA SECTION ────────────────────────────────────────────────────────
function FinalCTASection() {
  const { openModal } = useBooking();

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-white text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          500+ agents already saving time
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ink tracking-tight leading-[1.05]"
        >
          Stop filling forms manually.{" "}
          <span className="text-gradient-brand">Let AI handle it.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-ink-soft text-lg font-medium max-w-xl mx-auto"
        >
          Join 500+ agents saving 3+ hours per listing. Start your free trial today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-ink text-white font-semibold text-sm hover:bg-brand-blue transition-all shadow-soft"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-border text-ink font-semibold text-sm hover:border-ink/30 transition-all"
          >
            See a Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MAIN RIA PAGE ─────────────────────────────────────────────────────────────
export default function RiaPage() {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <RiaNavbar />
      <main className="pt-0">
        <HeroSection />
        <InstantDemoSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <WorkflowSection />
        <ProductUISection />
        <ResultsSection />
        <PricingSection />
        <FinalCTASection />
      </main>
    </div>
  );
}
