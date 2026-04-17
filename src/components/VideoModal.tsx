import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, FileText, ShieldCheck, Megaphone, Layers, ChevronRight, ChevronLeft } from "lucide-react";
import { useVideo } from "../context/VideoContext";

const products = [
  {
    id: "listing",
    label: "Listing Manager",
    sub: "Ria — AI-powered MLS automation",
    icon: FileText,
    color: "blue",
    // Replace videoId with your real YouTube video IDs
    videoId: "dQw4w9WgXcQ",
    duration: "2:34",
    desc: "Watch how Ria extracts data from any document, auto-fills 12+ MLS forms, and generates polished listing descriptions — all in under 60 seconds.",
    highlights: ["Document extraction", "MLS auto-fill", "Listing descriptions", "Compliance check"],
  },
  {
    id: "transaction",
    label: "Transaction Manager",
    sub: "Automated closing stack",
    icon: ShieldCheck,
    color: "purple",
    videoId: "dQw4w9WgXcQ",
    duration: "1:58",
    desc: "See how the Transaction Agent processes seller disclosures, IABS forms, and the full closing stack with zero manual input.",
    highlights: ["Seller disclosure", "IABS forms", "Closing stack", "Audit trail"],
  },
  {
    id: "marketing",
    label: "Marketing Agent",
    sub: "Cross-platform campaign automation",
    icon: Megaphone,
    color: "teal",
    videoId: "dQw4w9WgXcQ",
    duration: "3:12",
    desc: "One click generates Instagram posts, Facebook ads, LinkedIn articles, and email campaigns — all tailored to your listing.",
    highlights: ["Social captions", "Ad creatives", "Email campaigns", "A/B testing"],
  },
  {
    id: "staging",
    label: "Virtual Staging",
    sub: "AI-powered visual transformation",
    icon: Layers,
    color: "orange",
    videoId: "dQw4w9WgXcQ",
    duration: "2:47",
    desc: "Transform empty rooms into beautifully staged spaces. Day-to-dusk, exterior enhancement, and room emptying — all AI-generated.",
    highlights: ["Virtual staging", "Day to dusk", "Exterior enhance", "Room emptying"],
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string; tab: string; dot: string }> = {
  blue:   { text: "text-brand-blue",   bg: "bg-brand-blue/10",   border: "border-brand-blue/30",   tab: "bg-brand-blue",   dot: "bg-brand-blue" },
  purple: { text: "text-brand-purple", bg: "bg-brand-purple/10", border: "border-brand-purple/30", tab: "bg-brand-purple", dot: "bg-brand-purple" },
  teal:   { text: "text-brand-teal",   bg: "bg-brand-teal/10",   border: "border-brand-teal/30",   tab: "bg-brand-teal",   dot: "bg-brand-teal" },
  orange: { text: "text-orange-500",   bg: "bg-orange-50",       border: "border-orange-200",       tab: "bg-orange-500",   dot: "bg-orange-500" },
};

export default function VideoModal() {
  const { open, closeVideo } = useVideo();
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const active = products[activeIdx];
  const c = colorMap[active.color];

  function selectProduct(idx: number) {
    setActiveIdx(idx);
    setPlaying(false);
  }

  function prev() { selectProduct((activeIdx - 1 + products.length) % products.length); }
  function next() { selectProduct((activeIdx + 1) % products.length); }

  function handleClose() {
    closeVideo();
    setTimeout(() => { setActiveIdx(0); setPlaying(false); }, 400);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="vbackdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            key="vmodal"
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 28 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-5xl bg-white rounded-3xl shadow-heavy overflow-hidden flex flex-col"
              style={{ maxHeight: "calc(100vh - 2rem)" }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center">
                    <span className="text-white font-display font-black text-sm">S</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink leading-tight">Product Tour</div>
                    <div className="text-[10px] text-ink-soft font-medium uppercase tracking-widest">SOFO AI · {products.length} products</div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full bg-muted hover:bg-border/60 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-ink-soft" />
                </button>
              </div>

              {/* ── Body ── */}
              <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

                {/* Left: product tabs */}
                <div className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-border/40 flex lg:flex-col overflow-x-auto lg:overflow-y-auto">
                  {products.map((p, i) => {
                    const pc = colorMap[p.color];
                    const isActive = i === activeIdx;
                    return (
                      <button
                        key={p.id}
                        onClick={() => selectProduct(i)}
                        className={`flex items-center gap-3 px-4 py-3.5 lg:py-4 text-left transition-all shrink-0 lg:shrink relative ${
                          isActive ? "bg-muted/60" : "hover:bg-muted/30"
                        }`}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="vtab-indicator"
                            className={`absolute left-0 top-0 bottom-0 w-0.5 lg:w-0.5 h-0.5 lg:h-auto bottom-0 lg:bottom-auto ${pc.tab} rounded-full`}
                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                          />
                        )}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          isActive ? `${pc.bg} ${pc.text}` : "bg-muted text-ink-soft"
                        }`}>
                          <p.icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 hidden lg:block">
                          <div className={`text-sm font-bold leading-tight truncate ${isActive ? "text-ink" : "text-ink-soft"}`}>{p.label}</div>
                          <div className="text-[10px] text-ink-soft/60 font-medium mt-0.5 truncate">{p.duration}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right: video + info */}
                <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">

                  {/* Video area */}
                  <div className="relative bg-ink aspect-video w-full shrink-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0"
                      >
                        {playing ? (
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0&modestbranding=1`}
                            title={active.label}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          /* Thumbnail / play screen */
                          <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                            {/* Gradient bg */}
                            <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-ink/80" />
                            <div className={`absolute inset-0 opacity-10 ${c.bg}`} />

                            {/* Product icon large */}
                            <div className={`relative z-10 w-20 h-20 rounded-3xl ${c.bg} ${c.text} flex items-center justify-center mb-6 border ${c.border}`}>
                              <active.icon className="w-9 h-9" />
                            </div>

                            <div className="relative z-10 text-center px-6 mb-8">
                              <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${c.text}`}>{active.sub}</div>
                              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">{active.label}</h3>
                              <div className="flex items-center justify-center gap-2 mt-2">
                                <div className="w-1 h-1 rounded-full bg-white/30" />
                                <span className="text-white/40 text-xs font-medium">{active.duration}</span>
                                <div className="w-1 h-1 rounded-full bg-white/30" />
                              </div>
                            </div>

                            {/* Play button */}
                            <motion.button
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setPlaying(true)}
                              className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-heavy group"
                              aria-label={`Play ${active.label} video`}
                            >
                              <Play className="w-6 h-6 text-ink fill-ink ml-0.5" />
                              {/* Pulse ring */}
                              <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                            </motion.button>

                            {/* Nav arrows */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                              <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm">
                                <ChevronLeft className="w-4 h-4 text-white" />
                              </button>
                            </div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                              <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm">
                                <ChevronRight className="w-4 h-4 text-white" />
                              </button>
                            </div>

                            {/* Dot indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                              {products.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => selectProduct(i)}
                                  className={`rounded-full transition-all ${i === activeIdx ? `w-5 h-1.5 ${c.dot}` : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Info panel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id + "-info"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 sm:p-6 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${c.text}`}>{active.sub}</div>
                          <h3 className="text-lg font-display font-bold text-ink">{active.label}</h3>
                        </div>
                        {!playing && (
                          <button
                            onClick={() => setPlaying(true)}
                            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold ${c.tab} hover:opacity-90 transition-opacity`}
                          >
                            <Play className="w-3.5 h-3.5 fill-white" /> Watch Now
                          </button>
                        )}
                      </div>

                      <p className="text-sm text-ink-soft leading-relaxed font-medium">{active.desc}</p>

                      <div className="flex flex-wrap gap-2">
                        {active.highlights.map((h) => (
                          <span key={h} className={`text-[11px] font-bold px-3 py-1 rounded-full ${c.bg} ${c.text}`}>
                            {h}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
