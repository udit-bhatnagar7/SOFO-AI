import { useState, useEffect } from "react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Image,
  Shuffle,
  Send,
  FileText,
  Edit,
  Check,
  Heart,
  MessageCircle,
  Share,
  ChevronRight,
  Star,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function MarketingNavbar() {
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
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-widest text-ink-soft">RIA Marketing Automation</span>
        </div>
        <button
          onClick={openModal}
          className="bg-ink text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-teal transition-all shadow-soft"
        >
          Start Free Trial
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
type Platform = "Instagram" | "Facebook" | "LinkedIn";

const platformCaptions: Record<Platform, string> = {
  Instagram:
    "Just listed! This stunning 4BR home in Oak Ridge features soaring ceilings and a chef's kitchen. DM for details! #RealEstate #JustListed #LuxuryHomes #AustinRealEstate",
  Facebook:
    "NEW LISTING: 1284 Oak Ridge Way, Austin TX. 4 beds, 3.5 baths, 3,420 sq ft. Listed at $1,840,000. Schedule your private showing today.",
  LinkedIn:
    "Excited to present this exceptional property at 1284 Oak Ridge Way. This architectural gem represents the pinnacle of Austin luxury living. Contact us for investment details.",
};

function HeroSection() {
  const { openModal } = useBooking();
  const [activePlatform, setActivePlatform] = useState<Platform>("Instagram");
  const platforms: Platform[] = ["Instagram", "Facebook", "LinkedIn"];

  return (
    <section className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Copy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-ink-soft">AI-Powered Content Generation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-ink leading-[1.0] tracking-tight"
            >
              Create real estate marketing content in seconds.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-ink-soft text-xl leading-relaxed max-w-xl"
            >
              AI generates posts, captions, and creatives for every platform automatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-ink text-white font-bold text-base hover:bg-brand-teal transition-all shadow-soft"
              >
                <Sparkles className="w-5 h-5" />
                Generate Post
              </button>
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border-2 border-border text-ink font-bold text-base hover:border-ink/30 transition-all"
              >
                Try Demo
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-8 pt-2"
            >
              {[
                { val: "10+", label: "platforms" },
                { val: "30s", label: "to generate" },
                { val: "800+", label: "agents using it" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-display font-black text-ink">{s.val}</div>
                  <div className="text-xs text-ink-soft uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Live Platform Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
            className="relative"
          >
            <div className="absolute -top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-700 text-xs font-bold">AI Generated</span>
            </div>

            <div className="bg-white border border-border rounded-3xl p-5 shadow-elevated">
              {/* Platform tabs */}
              <div className="flex gap-2 mb-4">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePlatform(p)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activePlatform === p
                        ? "bg-ink text-white shadow-soft"
                        : "bg-muted text-ink-soft hover:bg-border hover:text-ink"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Mock social post card */}
              <div className="bg-muted/40 rounded-2xl overflow-hidden border border-border">
                {/* Post header */}
                <div className="flex items-center gap-3 p-3">
                  <div className="w-9 h-9 rounded-full bg-brand-teal flex items-center justify-center text-white font-bold text-sm shrink-0">
                    S
                  </div>
                  <div>
                    <div className="text-ink text-sm font-semibold leading-tight">SOFO Realty</div>
                    <div className="text-ink-soft text-[11px]">
                      {activePlatform === "Instagram"
                        ? "@soforealty"
                        : activePlatform === "Facebook"
                        ? "SOFO Realty"
                        : "SOFO Realty Group"}
                    </div>
                  </div>
                </div>

                {/* Image */}
                <img
                  src="https://picsum.photos/seed/listing-hero/600/400"
                  alt="Property listing"
                  className="w-full aspect-video object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Caption */}
                <div className="p-3">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activePlatform}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="text-ink-soft text-xs leading-relaxed"
                    >
                      {platformCaptions[activePlatform]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Engagement row */}
                <div className="flex items-center gap-5 px-3 pb-3 border-t border-border pt-3">
                  <div className="flex items-center gap-1.5 text-ink-soft text-xs">
                    <Heart className="w-3.5 h-3.5" />
                    <span>2.4k</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-ink-soft text-xs">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>186</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-ink-soft text-xs">
                    <Share className="w-3.5 h-3.5" />
                    <span>94</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── LIVE OUTPUT SECTION ──────────────────────────────────────────────────────
function LiveOutputSection() {
  const platformCards = [
    {
      name: "Instagram",
      headerGradient: "bg-gradient-to-r from-pink-500 to-purple-600",
      imgSeed: "insta-post-600",
      caption:
        "Just listed in Oak Ridge! Stunning 4BR, 3.5BA with chef's kitchen and soaring ceilings. DM to schedule your private tour.",
      hashtags: "#JustListed #AustinRealEstate #LuxuryHomes #OakRidge",
      handle: "@soforealty",
      likes: "2.4k",
      comments: "186",
      shares: "94",
      avatarColor: "bg-gradient-to-br from-pink-500 to-purple-600",
    },
    {
      name: "Facebook",
      headerGradient: "bg-[#1877f2]",
      imgSeed: "fb-post-listing",
      caption:
        "NEW LISTING: 1284 Oak Ridge Way, Austin TX. 4 beds, 3.5 baths, 3,420 sq ft. Listed at $1,840,000. Schedule your private showing today.",
      hashtags: "",
      handle: "SOFO Realty",
      likes: "847",
      comments: "63",
      shares: "41",
      avatarColor: "bg-[#1877f2]",
    },
    {
      name: "LinkedIn",
      headerGradient: "bg-[#0a66c2]",
      imgSeed: "linkedin-listing",
      caption:
        "Excited to present this exceptional property at 1284 Oak Ridge Way. This architectural gem represents the pinnacle of Austin luxury living. Contact us for investment details.",
      hashtags: "#RealEstate #LuxuryProperty #AustinTX #Investment",
      handle: "SOFO Realty Group",
      likes: "312",
      comments: "28",
      shares: "19",
      avatarColor: "bg-[#0a66c2]",
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-teal/20 bg-brand-teal/5"
          >
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-teal">Live Output</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            One listing, every platform.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-lg max-w-xl mx-auto"
          >
            Watch the AI generate platform-perfect content instantly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platformCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-border shadow-elevated overflow-hidden"
            >
              {/* Colored gradient header */}
              <div className={`h-32 w-full ${card.headerGradient} flex flex-col items-center justify-center relative`}>
                <span className="text-white font-display font-bold text-2xl">{card.name}</span>
                <span className="mt-2 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-bold">
                  AI Generated
                </span>
              </div>

              <div className="p-6 space-y-4">
                {/* Profile row */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${card.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    S
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink leading-tight">{card.handle}</div>
                    <div className="text-[11px] text-ink-soft">Just now</div>
                  </div>
                </div>

                {/* Property image */}
                <img
                  src={`https://picsum.photos/seed/${card.imgSeed}/600/400`}
                  alt={`${card.name} post`}
                  className="w-full aspect-video object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Caption */}
                <p className="text-sm text-ink leading-relaxed">
                  {card.caption}
                  {card.hashtags && (
                    <span className="text-brand-teal ml-1">{card.hashtags}</span>
                  )}
                </p>

                {/* Engagement row */}
                <div className="flex items-center gap-5 pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 text-ink-soft text-xs">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{card.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-ink-soft text-xs">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{card.comments}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-ink-soft text-xs">
                    <Share className="w-3.5 h-3.5" />
                    <span>{card.shares}</span>
                  </div>
                </div>
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
      icon: MessageSquare,
      title: "Platform Captions",
      desc: "Platform-specific captions that match each network's tone and format",
      colorBar: "bg-brand-teal",
      iconBg: "bg-brand-teal/10",
      iconText: "text-brand-teal",
      dotColor: "bg-brand-teal",
      statColor: "text-brand-teal",
      highlights: ["Instagram hashtags", "Facebook long-form", "LinkedIn professional", "Twitter/X concise"],
      stat: "4 platforms",
      statLabel: "supported",
    },
    {
      icon: Image,
      title: "Ad Creatives",
      desc: "Auto-formatted ad creatives sized perfectly for each platform",
      colorBar: "bg-brand-blue",
      iconBg: "bg-brand-blue/10",
      iconText: "text-brand-blue",
      dotColor: "bg-brand-blue",
      statColor: "text-brand-blue",
      highlights: ["Facebook ads", "Instagram stories", "Google display", "Print flyers"],
      stat: "10+",
      statLabel: "formats",
    },
    {
      icon: Shuffle,
      title: "A/B Variations",
      desc: "Generate multiple caption variations to test what performs best",
      colorBar: "bg-brand-purple",
      iconBg: "bg-brand-purple/10",
      iconText: "text-brand-purple",
      dotColor: "bg-brand-purple",
      statColor: "text-brand-purple",
      highlights: ["3 variations per post", "Performance tracking", "Auto-optimize", "Best performer"],
      stat: "3x",
      statLabel: "engagement",
    },
    {
      icon: Send,
      title: "Auto-Distribution",
      desc: "Schedule and publish to all platforms simultaneously",
      colorBar: "bg-amber-500",
      iconBg: "bg-amber-500/10",
      iconText: "text-amber-500",
      dotColor: "bg-amber-500",
      statColor: "text-amber-400",
      highlights: ["Auto-scheduling", "Peak time posting", "Cross-platform sync", "Analytics"],
      stat: "5 hrs",
      statLabel: "saved/week",
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-ink-soft">Features</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Built for every platform.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-lg max-w-xl mx-auto"
          >
            Every feature you need to dominate real estate marketing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border-2 border-border rounded-3xl p-7 hover:shadow-elevated transition-all relative overflow-hidden shadow-soft"
            >
              {/* Colored top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${feat.colorBar}`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${feat.iconBg} ${feat.iconText} flex items-center justify-center mb-5`}>
                <feat.icon className="w-6 h-6" />
              </div>

              <h3 className="text-ink font-display font-bold text-xl mb-2">{feat.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-5">{feat.desc}</p>

              <ul className="space-y-2.5 mb-6">
                {feat.highlights.map((h, hi) => (
                  <li key={hi} className="flex items-center gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${feat.dotColor}`} />
                    <span className="text-ink-soft text-sm">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-border">
                <span className={`text-3xl font-display font-black ${feat.statColor}`}>{feat.stat}</span>
                <span className="text-ink-soft text-xs uppercase tracking-widest ml-2">{feat.statLabel}</span>
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
    {
      num: 1,
      icon: FileText,
      title: "Input Listing",
      desc: "Enter your listing details or upload documents",
    },
    {
      num: 2,
      icon: Sparkles,
      title: "Generate Content",
      desc: "AI creates platform-specific posts and captions",
    },
    {
      num: 3,
      icon: Edit,
      title: "Customize",
      desc: "Review, edit, and select your favorite variations",
    },
    {
      num: 4,
      icon: Send,
      title: "Publish",
      desc: "Publish to all platforms simultaneously",
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-teal/20 bg-brand-teal/5"
          >
            <Zap className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-teal">How It Works</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Four steps to published content.
          </motion.h2>
        </div>

        {/* Desktop: horizontal row with arrows */}
        <div className="hidden lg:flex items-stretch gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 bg-white border-2 border-border rounded-3xl p-8 shadow-soft relative"
              >
                {/* Large step number */}
                <div className="absolute top-6 right-7 text-6xl font-display font-black text-ink/10 leading-none select-none">
                  {step.num}
                </div>
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="shrink-0 text-brand-teal/40"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex lg:hidden flex-col gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border-2 border-border rounded-3xl p-7 shadow-soft relative overflow-hidden"
            >
              <div className="absolute top-5 right-6 text-5xl font-display font-black text-ink/10 leading-none select-none">
                {step.num}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-ink mb-1.5">{step.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCT UI MOCK ──────────────────────────────────────────────────────────
type EditorTab = "Instagram" | "Facebook" | "LinkedIn";

const editorCaptions: Record<EditorTab, string> = {
  Instagram:
    "Just listed! This stunning 4BR home in Oak Ridge features soaring ceilings and a chef's kitchen. DM for details! #RealEstate #JustListed #LuxuryHomes #AustinRealEstate",
  Facebook:
    "NEW LISTING: 1284 Oak Ridge Way, Austin TX. 4 beds, 3.5 baths, 3,420 sq ft. Listed at $1,840,000. Schedule your private showing today.",
  LinkedIn:
    "Excited to present this exceptional property at 1284 Oak Ridge Way. This architectural gem represents the pinnacle of Austin luxury living. Contact us for investment details.",
};

const variations = [
  "Just listed in Oak Ridge! Stunning 4BR with chef's kitchen. DM to tour. #JustListed #Austin",
  "Your dream home awaits. 4 beds, soaring ceilings, chef's kitchen. 1284 Oak Ridge Way. Link in bio.",
  "New to market: Oak Ridge luxury. 3,420 sqft of pure elegance. Priced at $1.84M. DM for details.",
];

function ProductUIMock() {
  const [activeTab, setActiveTab] = useState<EditorTab>("Instagram");
  const tabs: EditorTab[] = ["Instagram", "Facebook", "LinkedIn"];
  const caption = editorCaptions[activeTab];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-ink-soft">Product</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Your marketing command center.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-border shadow-elevated overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[11px] text-ink-soft font-mono uppercase tracking-widest mx-auto">RIA Marketing Automation</span>
            <div className="flex gap-2">
              {(["IG", "FB", "LI"] as const).map((label) => (
                <span key={label} className="px-2 py-0.5 rounded-md bg-muted border border-border text-ink-soft text-[10px] font-bold">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* 3-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px]">
            {/* LEFT: Active Listing */}
            <div className="border-b lg:border-b-0 lg:border-r border-border p-5 space-y-4 bg-muted/40">
              <div className="text-[10px] text-ink-soft font-black uppercase tracking-widest">Active Listing</div>
              <div className="bg-white border border-border rounded-2xl overflow-hidden">
                <img
                  src="https://picsum.photos/seed/listing-thumb/400/250"
                  alt="Active listing"
                  className="w-full aspect-video object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 space-y-1">
                  <div className="text-ink text-xs font-semibold leading-tight">1284 Oak Ridge Way</div>
                  <div className="text-ink-soft text-[11px]">Austin, TX 78701</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-brand-teal text-xs font-bold">$1,840,000</span>
                    <span className="flex items-center gap-1 text-green-600 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: Editor */}
            <div className="p-5 space-y-4 bg-white">
              {/* Platform tabs */}
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab
                        ? "bg-ink text-white"
                        : "bg-muted text-ink-soft hover:bg-border hover:text-ink"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Caption textarea */}
              <div className="bg-muted/20 border border-border rounded-xl p-4 min-h-[140px] relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-ink text-sm leading-relaxed"
                  >
                    {caption}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Char count + actions */}
              <div className="flex items-center justify-between">
                <span className="text-ink-soft text-xs font-mono">{caption.length} / 2200</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-muted border border-border text-ink-soft text-xs font-semibold hover:bg-border transition-all">
                    Regenerate
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-brand-teal text-white text-xs font-semibold hover:opacity-90 transition-all">
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Variations */}
            <div className="border-t lg:border-t-0 lg:border-l border-border p-5 space-y-3 bg-muted/40">
              <div className="text-[10px] text-ink-soft font-black uppercase tracking-widest">Variations</div>
              {variations.map((v, vi) => (
                <div
                  key={vi}
                  className="bg-white border border-border rounded-xl p-3 hover:border-brand-teal/40 hover:shadow-soft transition-all cursor-pointer"
                >
                  <div className="text-[10px] text-ink-soft font-bold mb-1.5">V{vi + 1}</div>
                  <p className="text-ink-soft text-[11px] leading-relaxed line-clamp-3">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── RESULTS SECTION ─────────────────────────────────────────────────────────
function ResultsSection() {
  const stats = [
    { val: "10x", label: "faster content creation" },
    { val: "800+", label: "agents using SOFO AI" },
    { val: "4.9", label: "average rating" },
  ];

  const testimonials = [
    {
      quote: "I used to spend hours writing captions for every listing. Now it takes 30 seconds and the quality is better than anything I wrote myself.",
      name: "Sarah M.",
      company: "RE/MAX Premier",
    },
    {
      quote: "The platform-specific content is incredible. My Instagram engagement tripled in the first month. This tool pays for itself every single listing.",
      name: "James K.",
      company: "Compass Austin",
    },
    {
      quote: "Finally an AI tool built for real estate agents. It understands the language, the tone, and what buyers actually respond to.",
      name: "Lisa T.",
      company: "Sotheby's International",
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-6xl sm:text-7xl font-display font-black text-ink mb-2">{s.val}</div>
              <div className="text-ink-soft text-sm font-medium uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-border rounded-3xl p-7 shadow-soft"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="italic text-ink text-base leading-relaxed mb-5">"{t.quote}"</p>
              <div>
                <div className="font-bold text-ink text-sm">{t.name}</div>
                <div className="text-ink-soft text-xs mt-0.5">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING SECTION ─────────────────────────────────────────────────────────
function PricingSection() {
  const { openModal } = useBooking();

  const perListingFeatures = [
    "All platform captions",
    "Ad creative generation",
    "3 caption variations",
    "One-time purchase",
  ];

  const subscriptionFeatures = [
    "Unlimited listings",
    "All platform captions",
    "Ad creative generation",
    "A/B testing suite",
    "Auto-distribution",
    "Analytics dashboard",
    "Priority support",
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-teal/20 bg-brand-teal/5"
          >
            <Zap className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-teal">Pricing</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight"
          >
            Simple pricing for serious agents.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Per Listing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-border rounded-3xl p-8 shadow-soft"
          >
            <div className="mb-6">
              <div className="text-sm font-bold text-ink-soft uppercase tracking-widest mb-2">Per Listing</div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-display font-black text-ink">$19</span>
                <span className="text-ink-soft text-base mb-1.5">/listing</span>
              </div>
              <p className="text-ink-soft text-sm mt-2">Pay only when you need it.</p>
            </div>
            <ul className="space-y-3 mb-8">
              {perListingFeatures.map((f, fi) => (
                <li key={fi} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-teal" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-ink">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="w-full py-3.5 rounded-2xl border-2 border-border text-ink font-bold text-sm hover:border-brand-teal hover:text-brand-teal transition-all"
            >
              Get Started
            </button>
          </motion.div>

          {/* Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-brand-teal rounded-3xl p-8 shadow-elevated relative overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-teal" />

            {/* Most Popular badge */}
            <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-brand-teal text-white text-[10px] font-black uppercase tracking-widest">
              Most Popular
            </div>

            <div className="mb-6">
              <div className="text-sm font-bold text-ink-soft uppercase tracking-widest mb-2">Subscription</div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-display font-black text-ink">$99</span>
                <span className="text-ink-soft text-base mb-1.5">/month</span>
              </div>
              <p className="text-ink-soft text-sm mt-2">Unlimited listings, all features.</p>
            </div>
            <ul className="space-y-3 mb-8">
              {subscriptionFeatures.map((f, fi) => (
                <li key={fi} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-ink">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="w-full py-3.5 rounded-2xl bg-brand-teal text-white font-bold text-sm hover:opacity-90 transition-all shadow-soft"
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
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ink leading-[1.05] tracking-tight"
        >
          Stop writing posts manually.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-ink-soft text-xl max-w-xl mx-auto"
        >
          Join 800+ agents automating their real estate marketing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-ink text-white font-bold text-base hover:bg-brand-teal transition-all shadow-soft"
          >
            <Sparkles className="w-5 h-5" />
            Generate Your First Post
          </button>
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border-2 border-border text-ink font-bold text-base hover:border-ink/30 transition-all"
          >
            See Examples
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────
export default function MarketingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <MarketingNavbar />
      <HeroSection />
      <LiveOutputSection />
      <FeaturesSection />
      <WorkflowSection />
      <ProductUIMock />
      <ResultsSection />
      <PricingSection />
      <FinalCTASection />
    </div>
  );
}
