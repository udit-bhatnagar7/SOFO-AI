import { useEffect, useState, useRef } from "react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Sparkles,
  Upload,
  Download,
  Layers,
  Sun,
  Home,
  Eraser,
  Palette,
  Check,
  Star,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

// ─── STAGING NAVBAR ───────────────────────────────────────────────────────────
function StagingNavbar() {
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
            onClick={(e: React.MouseEvent) => { e.preventDefault(); window.location.hash = ""; }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center text-white font-display font-black shadow-soft">
              S
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-ink">SOFO AI</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-widest text-ink-soft">RIA Virtual Staging</span>
        </div>
        <button
          onClick={openModal}
          className="bg-ink text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold hover:bg-brand-purple transition-all shadow-soft"
        >
          Start Free Trial
        </button>
      </div>
    </nav>
  );
}

// ─── BEFORE/AFTER SLIDER ──────────────────────────────────────────────────────
function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const dirRef = useRef(1);
  const pauseRef = useRef(false);

  // Auto-slide back and forth
  useEffect(() => {
    const id = setInterval(() => {
      if (pauseRef.current) return;
      setSliderPos((p) => {
        const next = p + dirRef.current * 0.5;
        if (next >= 85) { dirRef.current = -1; return 85; }
        if (next <= 15) { dirRef.current = 1;  return 15; }
        return next;
      });
    }, 20);
    return () => clearInterval(id);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    pauseRef.current = true;
    setIsDragging(true);
    setSliderPos(Number(e.target.value));
  }

  function handleRelease() {
    setIsDragging(false);
    // Resume auto-slide after 2s of inactivity
    setTimeout(() => { pauseRef.current = false; }, 2000);
  }
  return (
    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] select-none shadow-heavy">
      {/* Before image — empty room with vertical blinds */}
      <img
        src="/Before image.webp"
        alt="Empty room before staging"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* After image clipped — same room AI staged */}
      <img
        src="/after image.webp"
        alt="Room after AI virtual staging"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      />
      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-heavy z-10 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-heavy flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-ink/40 rounded-full" />
            <div className="w-0.5 h-4 bg-ink/40 rounded-full" />
          </div>
        </div>
      </div>
      {/* Range input */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderPos}
        onChange={handleChange}
        onMouseUp={handleRelease}
        onTouchEnd={handleRelease}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        aria-label="Before/after slider"
      />
      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-10 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-bold">
        Before
      </div>
      <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-bold">
        After
      </div>
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { openModal } = useBooking();
  return (
    <section className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 flex items-center relative overflow-hidden">
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
              <Sparkles className="w-3 h-3 text-brand-purple" />
              AI-Powered Visual Transformation
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ink leading-[1.05] tracking-tight"
            >
              Transform any property photo into a stunning listing.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-ink-soft text-lg leading-relaxed font-medium max-w-xl"
            >
              Stage, enhance, or clean images in seconds with AI. No photographers, no furniture, no waiting.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-ink text-white font-semibold text-sm hover:bg-brand-purple transition-all shadow-soft"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-border text-ink font-semibold text-sm hover:border-ink/30 transition-all"
              >
                Try Demo
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
                { val: "40%", label: "more clicks" },
                { val: "Zero", label: "physical staging" },
                { val: "30 sec", label: "results" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-display font-black text-ink">{s.val}</div>
                  <div className="text-[10px] text-ink-soft font-semibold uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Right: Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
          >
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── INSTANT RESULTS SECTION ──────────────────────────────────────────────────
function InstantResultsSection() {
  const cards = [
    {
      title: "Empty Room Staged",
      desc: "AI adds furniture, decor, and lighting that matches the space.",
      before: "/Before image.webp",
      after: "/after image.webp",
      badge: "AI Staged",
      accent: "bg-brand-purple",
      accentText: "text-brand-purple",
      accentBorder: "border-purple-200",
      accentBg: "bg-purple-50",
    },
    {
      title: "Day to Dusk",
      desc: "Transform daytime exterior shots into golden-hour magic.",
      before: "/before-dusk-new.webp",
      after: "/os-dusk-new.webp",
      badge: "Day to Dusk",
      accent: "bg-brand-blue",
      accentText: "text-brand-blue",
      accentBorder: "border-blue-200",
      accentBg: "bg-blue-50",
    },
    {
      title: "Exterior Enhanced",
      desc: "Remove clutter, improve landscaping, and boost curb appeal.",
      before: "/grassbefore.webp",
      after: "/grassafter.webp",
      badge: "Enhanced",
      accent: "bg-brand-teal",
      accentText: "text-brand-teal",
      accentBorder: "border-teal-200",
      accentBg: "bg-teal-50",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            See the transformation.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-ink-soft text-base sm:text-lg font-medium"
          >
            Three powerful AI modes, one upload.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden group hover:shadow-elevated transition-all"
            >
              {/* Before image */}
              <div className="relative">
                <img
                  src={card.before}
                  alt={`Before: ${card.title}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold">
                  Before
                </span>
                <span className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${card.accentBg} ${card.accentText} border ${card.accentBorder}`}>
                  {card.badge}
                </span>
              </div>
              {/* Divider */}
              <div className={`h-0.5 w-full ${card.accent}`} />
              {/* After image */}
              <div className="relative">
                <img
                  src={card.after}
                  alt={`After: ${card.title}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold">
                  After
                </span>
              </div>
              {/* Card body */}
              <div className="p-5">
                <h3 className="font-display font-bold text-ink text-base mb-1">{card.title}</h3>
                <p className="text-ink-soft text-sm font-medium leading-relaxed">{card.desc}</p>
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
      icon: Layers,
      title: "Virtual Staging",
      desc: "Add furniture and decor to empty rooms",
      highlights: ["Living rooms", "Bedrooms", "Kitchens", "Dining rooms"],
      stat: "40% more engagement",
      color: "purple",
      border: "border-purple-200",
      bar: "bg-brand-purple",
      iconBg: "bg-purple-50",
      iconText: "text-brand-purple",
      checkText: "text-brand-purple",
    },
    {
      icon: Sun,
      title: "Day to Dusk",
      desc: "Convert daytime photos to stunning dusk shots",
      highlights: ["Golden hour lighting", "Sky replacement", "Warm tones", "Dramatic effect"],
      stat: "2x more saves on Zillow",
      color: "blue",
      border: "border-blue-200",
      bar: "bg-brand-blue",
      iconBg: "bg-blue-50",
      iconText: "text-brand-blue",
      checkText: "text-brand-blue",
    },
    {
      icon: Home,
      title: "Exterior Enhancement",
      desc: "Improve curb appeal with AI enhancements",
      highlights: ["Lawn improvement", "Sky enhancement", "Clutter removal", "Color correction"],
      stat: "35% faster first showings",
      color: "teal",
      border: "border-teal-200",
      bar: "bg-brand-teal",
      iconBg: "bg-teal-50",
      iconText: "text-brand-teal",
      checkText: "text-brand-teal",
    },
    {
      icon: Eraser,
      title: "Room Emptying",
      desc: "Remove furniture from occupied rooms",
      highlights: ["Full room clearing", "Clean empty space", "Ready for staging", "Fast turnaround"],
      stat: "Save $2,000+ per listing",
      color: "red",
      border: "border-red-200",
      bar: "bg-red-500",
      iconBg: "bg-red-50",
      iconText: "text-red-500",
      checkText: "text-red-500",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Four powerful transformations.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-ink-soft text-base sm:text-lg font-medium"
          >
            Every tool you need to make listings irresistible.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`bg-white rounded-3xl border-2 ${feat.border} shadow-soft p-6 flex flex-col gap-4 relative overflow-hidden hover:shadow-elevated transition-all`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 ${feat.bar}`} />
              <div className={`w-11 h-11 rounded-2xl ${feat.iconBg} ${feat.iconText} flex items-center justify-center`}>
                <feat.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-ink text-base mb-1">{feat.title}</h3>
                <p className="text-ink-soft text-sm font-medium">{feat.desc}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {feat.highlights.map((h, hi) => (
                  <li key={hi} className="flex items-center gap-2">
                    <Check className={`w-3.5 h-3.5 shrink-0 ${feat.checkText}`} strokeWidth={3} />
                    <span className="text-[13px] text-ink-soft font-medium">{h}</span>
                  </li>
                ))}
              </ul>
              <div className={`text-[11px] font-black uppercase tracking-widest ${feat.iconText} pt-2 border-t border-border/60`}>
                {feat.stat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WORKFLOW SECTION ─────────────────────────────────────────────────────────
function WorkflowSection() {
  const steps = [
    { num: 1, icon: Upload, title: "Upload Image", desc: "Drop in any property photo" },
    { num: 2, icon: Palette, title: "Select Style", desc: "Choose staging style, room type, or enhancement" },
    { num: 3, icon: Sparkles, title: "AI Generates", desc: "Our AI transforms the image in seconds" },
    { num: 4, icon: Download, title: "Download", desc: "Get your stunning result instantly" },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Four steps to a perfect image.
          </motion.h2>
        </div>
        {/* Desktop: horizontal */}
        <div className="hidden lg:flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 flex flex-col items-center text-center px-4"
              >
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-border shadow-soft flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-ink-soft" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-purple flex items-center justify-center text-[9px] font-black text-white">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-sm font-display font-bold text-ink mb-1">{step.title}</h3>
                <p className="text-xs text-ink-soft font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex items-center pt-7 shrink-0">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                    className="w-12 h-px bg-border origin-left"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Mobile: vertical */}
        <div className="flex lg:hidden flex-col gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-white border border-border shadow-soft flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-ink-soft" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-purple flex items-center justify-center text-[9px] font-black text-white">
                  {step.num}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-display font-bold text-ink mb-1">{step.title}</h3>
                <p className="text-xs text-ink-soft font-medium leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCT UI MOCK SECTION ──────────────────────────────────────────────────
function ProductUIMockSection() {
  const tools = [
    { id: "staging",    label: "Virtual Staging",      icon: Layers },
    { id: "enhance",   label: "Image Enhancement",     icon: Sparkles },
    { id: "dusk",      label: "Day to Dusk",           icon: Sun },
    { id: "removal",   label: "Virtual Item Removal",  icon: Eraser },
  ];

  const stagingStyles = [
    "Modern Horizon", "Standard Harmony",
    "Industrial Loft", "Farmhouse Heritage",
    "Luxury Prestige", "Scandinavian Airy",
    "Coastal Breeze",  "Designer's Choice",
  ];

  const lightingOptions = ["Soft Natural", "Bright Daylight", "Warm Evening", "Studio White"];

  // Real estate empty room images (Unsplash)
  const roomImages: Record<string, { empty: string; staged: string; label: string }> = {
    staging: {
      empty:  "/main virtual-stage  before.webp",
      staged: "/main virtual-stage  after.webp",
      label:  "Living Room",
    },
    enhance: {
      empty:  "/ai enhance before.webp",
      staged: "/os-enhanced-new.webp",
      label:  "Kitchen",
    },
    dusk: {
      empty:  "/before-dusk-new.webp",
      staged: "/os-dusk-new.webp",
      label:  "Exterior",
    },
    removal: {
      empty:  "/grassbefore.webp",
      staged: "/grassafter.webp",
      label:  "Exterior",
    },
  };

  // Variation thumbnails per tool (real estate images)
  const variations: Record<string, string[]> = {
    staging: [
      "/variation 1.webp",
      "/variation 2.webp",
      "/variation 3.webp",
    ],
    enhance: [],
    dusk: [],
    removal: [],
  };

  const [activeTool, setActiveTool] = useState("staging");
  const [activeStyle, setActiveStyle] = useState("Modern Horizon");
  const [activeLighting, setActiveLighting] = useState("Soft Natural");
  const [sliderPos, setSliderPos] = useState(50);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const { openModal } = useBooking();

  const room = roomImages[activeTool];

  function handleGenerate() {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1800);
  }

  // Auto-generate on tool/style change
  useEffect(() => {
    setGenerated(false);
    setSliderPos(50);
    const t = setTimeout(handleGenerate, 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTool, activeStyle]);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Designed for agents, not designers.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-ink-soft text-base max-w-lg mx-auto"
          >
            Select a tool, choose a style, and watch RIA transform your listing photos instantly.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-border shadow-elevated bg-white"
        >
          {/* App header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-muted/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <span className="text-[11px] text-ink-soft font-mono uppercase tracking-widest mx-auto">RIA Virtual Staging</span>
          </div>

          {/* 3-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_280px] min-h-[480px]">

            {/* ── Left: Tool selector ── */}
            <div className="border-b lg:border-b-0 lg:border-r border-border bg-muted/20 p-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
              {tools.map((tool) => {
                const isActive = activeTool === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className={`shrink-0 lg:shrink-0 flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl border-2 text-center transition-all duration-200 ${
                      isActive
                        ? "border-brand-purple bg-brand-purple/5 shadow-soft"
                        : "border-transparent hover:border-border hover:bg-muted/60"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isActive ? "bg-brand-purple/10 text-brand-purple" : "bg-muted text-ink-soft"
                    }`}>
                      <tool.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest leading-tight text-center ${
                      isActive ? "text-brand-purple" : "text-ink-soft"
                    }`}>{tool.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ── Center: Before/After slider ── */}
            <div className="p-4 bg-white flex flex-col gap-3">
              {/* Room label */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-soft"></span>
                <span className="text-[10px] text-ink-soft/50 font-medium">Drag to compare</span>
              </div>

              {/* Slider */}
              <div className="relative rounded-2xl overflow-hidden select-none flex-1 min-h-[300px] sm:min-h-[360px]">
                {/* Empty room (before) */}
                <img
                  src={room.staged}
                  alt={`Empty ${room.label}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Staged room (after) — clipped */}
                <AnimatePresence>
                  {(generated || generating) && (
                    <motion.div
                      key={activeTool + activeStyle}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0"
                      style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                    >
                      <img
                        src={room.empty}
                        alt={`Staged ${room.label}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Generating overlay */}
                <AnimatePresence>
                  {generating && (
                    <motion.div
                      key="gen"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 rounded-full border-3 border-brand-purple border-t-transparent"
                        style={{ borderWidth: 3 }}
                      />
                      <span className="text-sm font-semibold text-ink">Generating {activeStyle}...</span>
                      <div className="w-32 h-1 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.8, ease: "easeInOut" }}
                          className="h-full bg-brand-purple rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Drag handle */}
                {generated && !generating && (
                  <>
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-heavy z-10 pointer-events-none"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-heavy border border-border flex items-center justify-center">
                        <div className="flex gap-0.5">
                          <div className="w-0.5 h-3 bg-ink/30 rounded-full" />
                          <div className="w-0.5 h-3 bg-ink/30 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <input
                      type="range" min={0} max={100} value={sliderPos}
                      onChange={(e) => setSliderPos(Number(e.target.value))}
                      aria-label="Before/after comparison slider"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    />
                  </>
                )}

                {/* Labels */}
                <div className="absolute bottom-3 left-3 z-10 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold">Before</div>
                {generated && !generating && (
                  <div className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded-lg bg-brand-purple/80 backdrop-blur-sm text-white text-[10px] font-bold">
                    {activeStyle}
                  </div>
                )}
              </div>

              {/* Bottom bar: variations + generate */}
              <div className="space-y-3">
                {/* Variation thumbnails — only for Virtual Staging */}
                {generated && !generating && activeTool === "staging" && (variations[activeTool] ?? []).length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Variations</div>
                      <span className="text-[10px] font-bold text-brand-purple">3 ready</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(variations[activeTool] ?? []).map((src, vi) => (
                        <motion.div
                          key={`${activeTool}-${vi}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: vi * 0.1, type: "spring", stiffness: 200 }}
                          className="relative rounded-xl overflow-hidden aspect-video group cursor-pointer"
                          onClick={openModal}
                        >
                          <img
                            src={src}
                            alt={`Variation ${vi + 1}`}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                           </div>
                          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm text-white text-[9px] font-bold">
                            V{vi + 1}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Controls + Variations ── */}
            <div className="border-t lg:border-t-0 lg:border-l border-border bg-white flex flex-col">

              {/* Tool title */}
              <div className="px-5 pt-5 pb-3 border-b border-border/40">
                <div className="font-display font-bold text-ink text-base leading-tight">
                  {tools.find((t) => t.id === activeTool)?.label}
                </div>
                <p className="text-[11px] text-ink-soft mt-0.5">
                  {activeTool === "staging"  && "Transform empty spaces into inviting homes."}
                  {activeTool === "enhance"  && "Enhance lighting, color, and sharpness."}
                  {activeTool === "dusk"     && "Convert daytime shots to golden-hour magic."}
                  {activeTool === "removal"  && "Remove furniture for a clean, empty space."}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "460px" }} data-lenis-prevent>
                {/* Room type (staging only) */}
                {activeTool === "staging" && (
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-2">Room Type</div>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-border bg-muted/30 text-sm font-medium text-ink cursor-pointer hover:bg-muted/60 transition-colors">
                      <span>{room.label}</span>
                      <ChevronDown className="w-4 h-4 text-ink-soft" />
                    </div>
                    <p className="text-[10px] text-ink-soft/60 mt-1">From listing label or choose to override</p>
                  </div>
                )}

                {/* Staging style */}
                {activeTool === "staging" && (
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-2">Staging Style</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {stagingStyles.map((s) => (
                        <button
                          key={s}
                          onClick={() => setActiveStyle(s)}
                          className={`px-2.5 py-2 rounded-xl text-[11px] font-semibold text-center transition-all ${
                            activeStyle === s
                              ? "bg-brand-purple text-white shadow-soft"
                              : "bg-muted/40 text-ink-soft hover:bg-muted hover:text-ink border border-border/40"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lighting */}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-2">Lighting</div>
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-border bg-muted/30 text-sm font-medium text-ink cursor-pointer hover:bg-muted/60 transition-colors">
                    <span>{activeLighting}</span>
                    <ChevronDown className="w-4 h-4 text-ink-soft" />
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {lightingOptions.map((l) => (
                      <button
                        key={l}
                        onClick={() => setActiveLighting(l)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                          activeLighting === l
                            ? "bg-brand-purple/10 text-brand-purple border border-brand-purple/20"
                            : "bg-muted/40 text-ink-soft hover:bg-muted border border-transparent"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Instructions */}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-2">Custom Instructions</div>
                  <textarea
                    rows={3}
                    placeholder="e.g. Add velvet sofa, marble coffee table..."
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-muted/30 text-xs text-ink placeholder:text-ink-soft/50 resize-none outline-none focus:border-brand-purple/40 focus:bg-white transition-colors"
                  />
                </div>

                {/* What RIA Does */}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-2">What RIA Does</div>
                  <div className="space-y-1.5">
                    {[
                      "AI-powered furniture placement",
                      "Style-matched decor",
                      "Realistic lighting & shadows",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-green-600" strokeWidth={3} />
                        </div>
                        <span className="text-[11px] text-ink-soft font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Insight */}
                <div className="p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/15">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue">Market Insight</span>
                  </div>
                  <p className="text-[11px] text-ink leading-relaxed">
                    Virtually staged listings receive{" "}
                    <span className="font-bold text-brand-blue">40% more online views</span>{" "}
                    than empty ones.
                  </p>
                </div>

              </div>

              {/* Generate button — only for Virtual Staging */}
              {activeTool === "staging" && (
              <div className="p-4 border-t border-border/40">
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-purple text-white text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-soft"
                >
                  {generating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate New Variation
                    </>
                  )}
                </button>
              </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF SECTION ─────────────────────────────────────────────────────
function SocialProofSection() {
  const testimonials = [
    {
      quote: "Our listings sell faster since we started using Virtual Staging AI. The quality is incredible.",
      name: "Sarah M.",
      role: "RE/MAX Agent",
    },
    {
      quote: "I staged 12 rooms in one afternoon. What used to take weeks now takes minutes.",
      name: "James K.",
      role: "Compass",
    },
    {
      quote: "The day-to-dusk feature alone is worth it. Every exterior shot looks magazine-quality.",
      name: "Lisa T.",
      role: "Sotheby's",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 text-center">
          {[
            { val: "40%", label: "more listing clicks on average" },
            { val: "Zero", label: "physical staging required" },
            { val: "30 sec", label: "average generation time" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl sm:text-6xl font-display font-black text-ink mb-2">{s.val}</div>
              <div className="text-ink-soft text-sm font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-border shadow-soft rounded-3xl p-6 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-ink text-sm font-medium leading-relaxed flex-1">"{t.quote}"</p>
              <div>
                <div className="font-bold text-ink text-sm">{t.name}</div>
                <div className="text-ink-soft text-xs font-medium">{t.role}</div>
              </div>
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

  const perImageFeatures = [
    "Virtual staging",
    "Day to dusk",
    "Exterior enhancement",
    "Room emptying",
    "HD download",
    "No subscription",
  ];

  const monthlyFeatures = [
    "Everything in Per Image",
    "Unlimited images",
    "Priority processing",
    "Multiple variations",
    "Commercial license",
    "API access",
    "Team seats",
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Simple pricing, stunning results.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Per Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-border shadow-soft p-7 flex flex-col gap-5"
          >
            <div>
              <h3 className="font-display font-bold text-ink text-lg mb-1">Per Image</h3>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-display font-black text-ink">$9</span>
                <span className="text-ink-soft text-sm font-medium mb-1">/image</span>
              </div>
            </div>
            <ul className="space-y-2.5 flex-1">
              {perImageFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" strokeWidth={3} />
                  <span className="text-sm text-ink-soft font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="w-full py-3 rounded-2xl border border-border text-ink text-sm font-bold hover:bg-muted transition-colors"
            >
              Get Started
            </button>
          </motion.div>
          {/* Monthly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border-2 border-brand-purple shadow-elevated p-7 flex flex-col gap-5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-purple" />
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display font-bold text-ink text-lg mb-1">Monthly Plan</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-display font-black text-ink">$149</span>
                  <span className="text-ink-soft text-sm font-medium mb-1">/month</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[10px] font-black uppercase tracking-widest shrink-0">
                Most Popular
              </span>
            </div>
            <ul className="space-y-2.5 flex-1">
              {monthlyFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-purple shrink-0" strokeWidth={3} />
                  <span className="text-sm text-ink-soft font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="w-full py-3 rounded-2xl bg-brand-purple text-white text-sm font-bold hover:opacity-90 transition-all shadow-soft"
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
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ink tracking-tight leading-[1.05]"
        >
          Make every listing look its best.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-ink-soft text-lg font-medium"
        >
          Join 1,000+ agents using AI to win more listings.
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
            className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-ink text-white font-semibold text-sm hover:bg-brand-purple transition-all shadow-soft"
          >
            <Upload className="w-4 h-4" />
            Upload Your First Image
          </button>
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border-2 border-border text-ink font-semibold text-sm hover:border-ink/30 transition-all"
          >
            See Examples
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── STAGING PAGE (ROOT EXPORT) ───────────────────────────────────────────────
export default function StagingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <StagingNavbar />
      <main>
        <HeroSection />
        <InstantResultsSection />
        <FeaturesSection />
        <WorkflowSection />
        <ProductUIMockSection />
        <SocialProofSection />
        <PricingSection />
        <FinalCTASection />
      </main>
    </div>
  );
}
