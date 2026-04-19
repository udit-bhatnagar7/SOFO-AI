import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, Check, ChevronRight, RefreshCw,
  Upload, Palette, Instagram, Linkedin,
  Facebook, Copy, Edit3, Zap, Eye, Wand2,
} from "lucide-react";

type Template = "New Listing" | "Open House" | "Just Closed" | "Last Page";
type Platform = "Instagram" | "Facebook" | "LinkedIn";
type Font = "Modern Sans" | "Bold Headline" | "Classic Serif";

const TEMPLATES: Template[] = ["New Listing", "Open House", "Just Closed", "Last Page"];
const PLATFORMS: Platform[] = ["Instagram", "Facebook", "LinkedIn"];
const FONTS: Font[] = ["Modern Sans", "Bold Headline", "Classic Serif"];
const BRAND_COLORS = ["#0f172a","#1e40af","#0d9488","#7c3aed","#dc2626","#d97706","#059669"];

const CAPTIONS: Record<Template, Record<Platform, string>> = {
  "New Listing": {
    Instagram: "Just listed! This stunning 4BR home in Oak Ridge features soaring ceilings and a chef's kitchen. DM for details! #JustListed #LuxuryHomes #AustinRealEstate",
    Facebook: "NEW LISTING: 1284 Oak Ridge Way, Austin TX. 4 beds, 3.5 baths, 3,420 sq ft. Listed at $1,840,000. Schedule your private showing today.",
    LinkedIn: "Excited to present this exceptional property at 1284 Oak Ridge Way. This architectural gem represents the pinnacle of Austin luxury living.",
  },
  "Open House": {
    Instagram: "Open House this Sunday 1-4PM! Come see this gorgeous 4BR in Oak Ridge. Light bites, great vibes. See you there! #OpenHouse #Austin",
    Facebook: "OPEN HOUSE: Sunday, 1:00-4:00 PM. 1284 Oak Ridge Way, Austin TX. Tour this stunning 3,420 sq ft home. No appointment needed.",
    LinkedIn: "Hosting an open house this Sunday at 1284 Oak Ridge Way. An exceptional opportunity to tour one of Austin's finest properties.",
  },
  "Just Closed": {
    Instagram: "SOLD! Congratulations to our amazing clients on closing 1284 Oak Ridge Way. Another dream home delivered. #JustClosed #Sold",
    Facebook: "JUST CLOSED! 1284 Oak Ridge Way sold for $1,840,000. Congratulations to our clients! Looking to buy or sell? Let's talk.",
    LinkedIn: "Pleased to announce the successful closing of 1284 Oak Ridge Way at $1,840,000. Proud to have represented our clients.",
  },
  "Last Page": {
    Instagram: "Thinking of selling? Let's talk. Our AI-powered marketing gets your home in front of the right buyers fast. DM us today.",
    Facebook: "Ready to sell? SOFO AI creates professional marketing for your listing in seconds. Reach more buyers, sell faster.",
    LinkedIn: "If you're considering listing your property, our AI-powered marketing platform ensures maximum exposure across all channels.",
  },
};

const HEADLINES: Record<Template, string> = {
  "New Listing": "Modern Masterpiece in Oak Ridge",
  "Open House": "Open House This Sunday",
  "Just Closed": "Sold. Dream Home Delivered.",
  "Last Page": "Ready to Sell? AI Does the Work.",
};

const IMG_SEEDS: Record<Template, string> = {
  "New Listing": "listing-new-oak",
  "Open House": "listing-open-house",
  "Just Closed": "listing-sold-oak",
  "Last Page": "listing-last-page",
};

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white/10 ${className}`}>
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

function AutoSave({ saving }: { saving: boolean }) {
  return (
    <AnimatePresence>
      {saving && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex items-center gap-1.5 text-[10px] text-ink-soft">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3 rounded-full border border-ink-soft/50 border-t-transparent" />
          Saving
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ brandName, setBrandName, color, setColor, font, setFont, template, setTemplate, onNext }: {
  brandName: string; setBrandName: (v: string) => void;
  color: string; setColor: (v: string) => void;
  font: Font; setFont: (v: Font) => void;
  template: Template; setTemplate: (v: Template) => void;
  onNext: () => void;
}) {
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    setSaving(true);
    const t = setTimeout(() => setSaving(false), 1000);
    return () => clearTimeout(t);
  }, [brandName, color, font, template]);

  const fontClass: Record<Font, string> = {
    "Modern Sans": "font-sans font-semibold",
    "Bold Headline": "font-display font-black",
    "Classic Serif": "font-serif font-bold",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]">
      {/* LEFT: clean white form panel */}
      <div className="p-8 space-y-5 border-r border-border bg-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-ink flex items-center justify-center">
                <span className="text-white text-[9px] font-black">1</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Brand Setup</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-ink leading-tight">Set up your brand</h3>
            <p className="text-xs text-ink-soft mt-1">Used to generate all your marketing content</p>
          </div>
          <AutoSave saving={saving} />
        </div>

        {/* Brand name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Brand Name</label>
          <input value={brandName} onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g. SOFO Realty"
            className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-white text-sm font-semibold text-ink placeholder:text-ink-soft/30 focus:outline-none focus:border-ink/40 transition-all" />
        </div>

        {/* Logo */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Logo</label>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-dashed border-border cursor-pointer hover:border-ink/30 hover:bg-muted/40 transition-all group">
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-border transition-all">
              <Upload className="w-3.5 h-3.5 text-ink-soft" />
            </div>
            <div>
              <div className="text-xs font-semibold text-ink-soft">Drop logo here</div>
              <div className="text-[10px] text-ink-soft/60">PNG, SVG up to 2MB</div>
            </div>
          </div>
        </div>

        {/* Brand color */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Brand Color</label>
          <div className="flex items-center gap-2">
            {BRAND_COLORS.map((c) => (
              <motion.button key={c} onClick={() => setColor(c)}
                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
                className="relative w-8 h-8 rounded-xl transition-all"
                style={{ backgroundColor: c }}>
                {color === c && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                    className="absolute inset-0 rounded-xl ring-2 ring-offset-2 ring-current"
                    style={{ color: c }} />
                )}
                {color === c && <Check className="absolute inset-0 m-auto w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </motion.button>
            ))}
            <div className="w-8 h-8 rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-ink/30 transition-all">
              <Palette className="w-3.5 h-3.5 text-ink-soft" />
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Typography</label>
          <div className="grid grid-cols-3 gap-2">
            {FONTS.map((f) => (
              <motion.button key={f} onClick={() => setFont(f)}
                whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                className={`px-3 py-3 rounded-2xl border-2 text-xs transition-all ${
                  font === f ? "border-ink bg-ink text-white shadow-soft" : "border-border bg-white text-ink-soft hover:border-ink/20 hover:text-ink"
                }`}>
                <div className={`${fontClass[f]} text-sm leading-none mb-0.5`}>Aa</div>
                <div className="text-[9px] opacity-70 leading-tight">{f}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Template */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Template</label>
          <div className="grid grid-cols-2 gap-2">
            {TEMPLATES.map((t) => (
              <motion.button key={t} onClick={() => setTemplate(t)}
                whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                className={`px-3 py-3 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                  template === t ? "border-ink bg-ink text-white shadow-soft" : "border-border bg-white text-ink-soft hover:border-ink/20 hover:text-ink"
                }`}>
                {template === t && (
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 8, opacity: 0.06 }}
                    className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white" />
                )}
                <div className="text-[11px] font-bold relative z-10">{t}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button onClick={onNext}
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
          className="w-full py-4 rounded-2xl bg-ink text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-elevated hover:shadow-heavy transition-all">
          <Wand2 className="w-4 h-4" />
          Generate Marketing Content
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* RIGHT: dark immersive preview */}
      <div className="relative bg-[#0a0a0f] overflow-hidden flex flex-col min-h-[600px]">
        {/* Ambient glow from brand color */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 70% 30%, ${color}30, transparent 70%)` }} />
        <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />

        <div className="relative z-10 p-8 flex flex-col gap-5 h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-white/40" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Live Preview</span>
            </div>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[9px] font-bold text-white/40">Updates live</span>
            </motion.div>
          </div>

          {/* Floating preview card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex-1 rounded-2xl overflow-hidden shadow-heavy border border-white/10 bg-white">
            {/* Brand header */}
            <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: `2px solid ${color}` }}>
              <motion.div animate={{ boxShadow: [`0 0 0px ${color}`, `0 0 16px ${color}80`, `0 0 0px ${color}`] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0"
                style={{ backgroundColor: color }}>
                {brandName ? brandName[0].toUpperCase() : "S"}
              </motion.div>
              <div>
                <AnimatePresence mode="wait">
                  <motion.div key={brandName + font}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`text-sm font-bold text-ink ${fontClass[font]}`}>
                    {brandName || "Your Brand"}
                  </motion.div>
                </AnimatePresence>
                <div className="text-[10px] text-ink-soft">Real Estate · Austin, TX</div>
              </div>
            </div>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div key={template} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }} className="relative aspect-video overflow-hidden">
                <img src={`https://picsum.photos/seed/${IMG_SEEDS[template]}/600/340`}
                  alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: color }} />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[9px] font-black uppercase tracking-widest"
                  style={{ backgroundColor: color }}>{template}</div>
              </motion.div>
            </AnimatePresence>

            {/* Body */}
            <div className="px-4 py-4">
              <AnimatePresence mode="wait">
                <motion.div key={template + font}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`text-sm font-bold text-ink leading-snug ${fontClass[font]}`}>
                  {HEADLINES[template]}
                </motion.div>
              </AnimatePresence>
              <p className="text-[11px] text-ink-soft mt-1.5 leading-relaxed line-clamp-2">
                {CAPTIONS[template]["Instagram"].slice(0, 88)}...
              </p>
              <motion.div animate={{ backgroundColor: color }} transition={{ duration: 0.4 }}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-bold">
                Book a Showing
              </motion.div>
            </div>
          </motion.div>

          {/* Hint pill */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <Zap className="w-3.5 h-3.5 shrink-0" style={{ color }} />
            <span className="text-[10px] text-white/50">AI generates 3 platform variations from this preview</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────
function Step2({ brandName, color, font, template, setTemplate, onBack }: {
  brandName: string; color: string; font: Font; template: Template;
  setTemplate: (v: Template) => void; onBack: () => void;
}) {
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [loading, setLoading] = useState(true);
  const [variation, setVariation] = useState(0);
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCaption, setEditedCaption] = useState("");
  const [regenerating, setRegenerating] = useState(false);

  const fontClass: Record<Font, string> = {
    "Modern Sans": "font-sans font-semibold",
    "Bold Headline": "font-display font-black",
    "Classic Serif": "font-serif font-bold",
  };

  const getVariations = (t: Template, p: Platform) => [
    CAPTIONS[t][p],
    CAPTIONS[t][p].replace("stunning", "breathtaking").replace("gorgeous", "spectacular"),
    CAPTIONS[t][p].replace("DM", "Message us").replace("Contact us", "Reach out"),
  ];

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
      setEditedCaption(getVariations(template, platform)[variation]);
    }, 1400);
    return () => clearTimeout(t);
  }, [template]);

  useEffect(() => {
    setEditedCaption(getVariations(template, platform)[variation]);
  }, [platform, variation]);

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => { setVariation((v) => (v + 1) % 3); setRegenerating(false); }, 800);
  };

  const PlatformIcon = { Instagram, Facebook, LinkedIn: Linkedin };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT: content panel */}
      <div className="p-8 space-y-5 border-r border-border bg-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-ink flex items-center justify-center">
                <span className="text-white text-[9px] font-black">2</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft">AI Output</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-ink">Your content is ready</h3>
          </div>
          <button onClick={onBack}
            className="text-[10px] font-bold text-ink-soft hover:text-ink px-3 py-1.5 rounded-xl border border-border hover:border-ink/20 transition-all">
            Edit Brand
          </button>
        </div>

        {/* Headline */}
        {loading ? <Skeleton className="h-7 w-3/4" /> : (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-[10px] font-black uppercase tracking-widest text-ink-soft mb-1.5">Headline</div>
            <div className={`text-xl text-ink leading-snug ${fontClass[font]}`}>{HEADLINES[template]}</div>
          </motion.div>
        )}

        {/* Platform tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-2xl">
          {PLATFORMS.map((p) => {
            const Icon = PlatformIcon[p];
            return (
              <button key={p} onClick={() => setPlatform(p)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                  platform === p ? "bg-white text-ink shadow-soft" : "text-ink-soft hover:text-ink"
                }`}>
                <Icon className="w-3 h-3" />{p}
              </button>
            );
          })}
        </div>

        {/* Caption */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Caption</span>
            <button onClick={() => setEditMode((e) => !e)}
              className="flex items-center gap-1 text-[10px] font-bold text-ink-soft hover:text-ink transition-all">
              <Edit3 className="w-3 h-3" />{editMode ? "Done" : "Edit"}
            </button>
          </div>
          {loading ? (
            <div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /><Skeleton className="h-4 w-4/5" /></div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={`${platform}-${variation}`}
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }}>
                {editMode ? (
                  <textarea value={editedCaption} onChange={(e) => setEditedCaption(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-white text-sm text-ink leading-relaxed focus:outline-none focus:border-ink/30 resize-none min-h-[96px]" />
                ) : (
                  <div className="px-4 py-3 rounded-2xl bg-muted/50 border border-border text-sm text-ink leading-relaxed">
                    {editedCaption}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* CTA pills */}
        {!loading && (
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft">CTA Suggestions</span>
            <div className="flex flex-wrap gap-2">
              {["Book a showing", "Contact now", "View listing", "Schedule a tour"].map((cta) => (
                <motion.button key={cta} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-3 py-1.5 rounded-full border border-border text-[11px] font-semibold text-ink-soft hover:border-ink/30 hover:text-ink transition-all">
                  {cta}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 text-sm font-bold transition-all ${
              copied ? "border-green-400 bg-green-50 text-green-700" : "border-border text-ink hover:border-ink/30"
            }`}>
            {copied ? <><Check className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
          </motion.button>
          <motion.button onClick={handleRegenerate}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-ink text-white text-sm font-bold hover:opacity-90 transition-all shadow-soft">
            <motion.div animate={regenerating ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6, ease: "linear" }}>
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            {regenerating ? "Generating..." : "New Version"}
          </motion.button>
        </div>

        {/* Variation dots */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-ink-soft font-black uppercase tracking-widest">Variation</span>
          <div className="flex gap-2">
            {[0, 1, 2].map((v) => (
              <motion.button key={v} onClick={() => setVariation(v)}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className={`w-7 h-7 rounded-full text-[10px] font-black transition-all ${
                  variation === v ? "bg-ink text-white shadow-soft" : "bg-muted text-ink-soft hover:bg-border"
                }`}>{v + 1}</motion.button>
            ))}
          </div>
        </div>

        {/* Connections */}
        <div className="space-y-2 pt-2 border-t border-border">
          {[
            { label: "Listing data from RIA Automation", active: true },
            { label: "Enhance visuals via Virtual Staging", active: false },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ x: 2 }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                item.active ? "border-brand-teal/30 bg-brand-teal/5" : "border-border hover:border-ink/20"
              }`}>
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.active ? "bg-brand-teal" : "bg-border"}`} />
              <span className={`text-[10px] font-semibold ${item.active ? "text-brand-teal" : "text-ink-soft"}`}>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: dark visual output */}
      <div className="relative bg-[#0a0a0f] overflow-hidden flex flex-col min-h-[600px]">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 60% 20%, ${color}25, transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 40% 100%, ${color}15, transparent 70%)` }} />
        <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" />

        <div className="relative z-10 p-8 flex flex-col gap-4 h-full">
          {/* Template switcher */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Visual Output</span>
            <div className="flex gap-1.5">
              {TEMPLATES.map((t) => (
                <motion.button key={t} onClick={() => setTemplate(t)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${
                    template === t ? "bg-white text-ink" : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80"
                  }`}>
                  {t.split(" ")[0]}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main visual card */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-heavy group">
            {loading ? (
              <div className="h-full flex flex-col">
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="p-5 space-y-2 bg-white/5 flex-1">
                  <Skeleton className="h-5 w-3/4" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-5/6" />
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={template}
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}
                  className="h-full flex flex-col bg-white">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={`https://picsum.photos/seed/${IMG_SEEDS[template]}/600/340`}
                      alt="Generated" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: color }} />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[9px] font-black"
                      style={{ backgroundColor: color }}>{template}</div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <div className={`text-white text-sm font-bold leading-tight ${fontClass[font]}`}>{HEADLINES[template]}</div>
                        <div className="text-white/60 text-[10px] mt-0.5">1284 Oak Ridge Way · Austin, TX</div>
                      </div>
                      <motion.div animate={{ backgroundColor: color }} transition={{ duration: 0.4 }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0"
                        style={{ backgroundColor: color }}>
                        {brandName ? brandName[0].toUpperCase() : "S"}
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <div className={`text-sm font-bold text-ink mb-1.5 ${fontClass[font]}`}>{HEADLINES[template]}</div>
                    <p className="text-[11px] text-ink-soft leading-relaxed line-clamp-2">
                      {CAPTIONS[template][platform].slice(0, 100)}...
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <motion.div animate={{ backgroundColor: color }} transition={{ duration: 0.4 }}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-white text-[10px] font-bold"
                        style={{ backgroundColor: color }}>
                        Book a Showing
                      </motion.div>
                      <span className="text-[9px] text-ink-soft font-mono">{brandName || "SOFO Realty"}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Ready note */}
          {!loading && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color }} />
              <span className="text-[10px] text-white/50">Styled with your brand · Ready to download</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function MarketingAgentDemo() {
  const [step, setStep] = useState<1 | 2>(1);
  const [brandName, setBrandName] = useState("SOFO Realty");
  const [color, setColor] = useState("#1e40af");
  const [font, setFont] = useState<Font>("Modern Sans");
  const [template, setTemplate] = useState<Template>("New Listing");

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.15] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted">
            <Wand2 className="w-3.5 h-3.5 text-ink-soft" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-ink-soft">Marketing Agent</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink tracking-tight">
            Brand in. Content out.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-lg max-w-xl mx-auto">
            Set up your brand once. AI generates platform-ready marketing content instantly.
          </motion.p>
        </div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border border-border shadow-elevated overflow-hidden">

          {/* Chrome bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-[#0a0a0f]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[11px] text-white/30 font-mono uppercase tracking-widest mx-auto">
              SOFO AI — Marketing Agent
            </span>
            {/* Step pills */}
            <div className="flex items-center gap-1.5">
              {([1, 2] as const).map((s) => (
                <motion.button key={s} onClick={() => setStep(s)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black transition-all ${
                    step === s ? "bg-white text-ink" : "bg-white/10 text-white/40 hover:bg-white/20"
                  }`}>
                  {step > s
                    ? <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    : <span>{s}</span>
                  }
                  <span className="hidden sm:inline">{s === 1 ? "Brand" : "Generate"}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: step === 2 ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: step === 2 ? -24 : 24 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}>
              {step === 1 ? (
                <Step1 brandName={brandName} setBrandName={setBrandName}
                  color={color} setColor={setColor}
                  font={font} setFont={setFont}
                  template={template} setTemplate={setTemplate}
                  onNext={() => setStep(2)} />
              ) : (
                <Step2 brandName={brandName} color={color} font={font}
                  template={template} setTemplate={setTemplate}
                  onBack={() => setStep(1)} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
