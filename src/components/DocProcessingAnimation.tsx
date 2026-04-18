import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { FileText, Image as ImageIcon, Scan, Bot, Sparkles, Check, CheckCircle2, MousePointer2, ArrowRight, Zap } from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Animated SVG wire with travelling glow pulse */
function GlowWire({
  x1, y1, x2, y2, color = "#0d9488", delay = 0, duration = 0.7, pulse = true,
}: { x1: number; y1: number; x2: number; y2: number; color?: string; delay?: number; duration?: number; pulse?: boolean }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <g>
      {/* Base wire */}
      <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray={len} strokeDashoffset={len}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration, delay, ease: "easeInOut" }}
        opacity={0.5}
      />
      {/* Glow overlay */}
      <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="3" strokeLinecap="round"
        strokeDasharray={len} strokeDashoffset={len}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration, delay, ease: "easeInOut" }}
        opacity={0.15}
        style={{ filter: `blur(2px)` }}
      />
      {/* Travelling pulse dot */}
      {pulse && (
        <motion.circle r="3" fill={color}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          initial={{ offsetDistance: "0%" } as never}
          animate={{ offsetDistance: ["0%", "100%"] } as never}
          transition={{ duration: 1.2, delay: delay + duration, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
        >
          <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${delay + duration}s`}>
            <mpath href={`#wire-path-${x1}-${y1}-${x2}-${y2}`} />
          </animateMotion>
        </motion.circle>
      )}
    </g>
  );
}

/** Character-by-character typing animation */
function TypedText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-px h-[1em] bg-current ml-px align-middle" />
      )}
    </span>
  );
}

// ─── Scene 1: Input Collection ────────────────────────────────────────────────
function Scene1() {
  const docs = [
    { label: "Contract.pdf", Icon: FileText, color: "#6366f1", x: -130, y: -80, delay: 0 },
    { label: "Photo.jpg",    Icon: ImageIcon, color: "#0d9488", x: 130,  y: -90, delay: 0.18 },
    { label: "Scan.png",     Icon: Scan,      color: "#8b5cf6", x: -140, y: 70,  delay: 0.36 },
    { label: "Form.pdf",     Icon: FileText,  color: "#f59e0b", x: 140,  y: 60,  delay: 0.54 },
  ];
  const cx = 200; const cy = 160;

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full" style={{ height: 320 }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid meet">
          <defs>
            {docs.map((d) => (
              <path key={`p-${d.x}-${d.y}`} id={`wire-path-${cx + d.x}-${cy + d.y}-${cx}-${cy}`}
                d={`M ${cx + d.x} ${cy + d.y} L ${cx} ${cy}`} fill="none" />
            ))}
          </defs>
          {docs.map((d) => (
            <GlowWire key={`${d.x}-${d.y}`}
              x1={cx + d.x} y1={cy + d.y} x2={cx} y2={cy}
              color={d.color} delay={d.delay + 0.4} duration={0.6}
            />
          ))}
        </svg>

        {/* Central AI hub */}
        <div className="absolute" style={{ left: cx - 36, top: cy - 36 }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 140, damping: 12 }}
            className="relative w-[72px] h-[72px] rounded-2xl bg-ink flex items-center justify-center shadow-elevated"
          >
            <Bot className="w-8 h-8 text-white" />
            {[0, 0.5, 1.0].map((d, i) => (
              <motion.div key={i}
                className="absolute inset-0 rounded-2xl border-2 border-brand-teal/30"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 2.4 + i * 0.5, opacity: 0 }}
                transition={{ duration: 2, delay: d, repeat: Infinity, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        </div>

        {/* Floating doc cards with parallax depth */}
        {docs.map((doc, i) => (
          <motion.div key={i}
            initial={{ x: doc.x * 1.6, y: doc.y * 1.6, opacity: 0, scale: 0.6, rotate: (i % 2 === 0 ? -8 : 8) }}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            style={{ position: "absolute", left: cx + doc.x - 52, top: cy + doc.y - 18 }}
            transition={{ delay: doc.delay, type: "spring", stiffness: 80, damping: 14 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-white shadow-elevated cursor-default"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${doc.color}20` }}>
              <doc.Icon className="w-3.5 h-3.5" style={{ color: doc.color }} />
            </div>
            <span className="text-[11px] font-semibold text-ink whitespace-nowrap">{doc.label}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-ink-soft text-center mt-2">Multiple document types flowing into the AI hub</p>
    </div>
  );
}

// ─── Scene 2: AI Extraction Engine ───────────────────────────────────────────
function Scene2() {
  const layers = [
    { label: "Text Blocks", color: "#6366f1", angle: -90 },
    { label: "Images",      color: "#0d9488", angle: 30 },
    { label: "Fields",      color: "#8b5cf6", angle: 150 },
  ];
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * 360,
    delay: i * 0.1,
    r: 60 + (i % 3) * 20,
  }));

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full flex items-center justify-center" style={{ height: 320 }}>
        {/* Document breaking into layers */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Layer stack */}
          {[0, 1, 2].map((i) => (
            <motion.div key={i}
              initial={{ y: 0, opacity: i === 0 ? 1 : 0, scale: 1 }}
              animate={{ y: i * -28, opacity: 1, scale: 1 - i * 0.04 }}
              transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 90 }}
              className="absolute w-28 h-36 rounded-xl border border-border bg-white shadow-soft"
              style={{ left: -56, top: -72, zIndex: 3 - i }}
            >
              <div className="p-2 space-y-1.5">
                {i === 0 && <>
                  <div className="h-1.5 rounded bg-ink/10 w-full" />
                  <div className="h-1.5 rounded bg-ink/10 w-4/5" />
                  <div className="h-1.5 rounded bg-ink/10 w-full" />
                  <div className="h-8 rounded bg-muted mt-2" />
                  <div className="h-1.5 rounded bg-ink/10 w-3/4" />
                </>}
                {i === 1 && <div className="h-full w-full rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 flex items-center justify-center"><ImageIcon className="w-6 h-6 text-brand-teal/40" /></div>}
                {i === 2 && <>
                  {["Name", "Price", "Beds"].map((f, fi) => (
                    <div key={fi} className="flex items-center gap-1">
                      <div className="h-1 rounded bg-brand-purple/30 w-8 shrink-0" />
                      <div className="h-1 rounded bg-ink/10 flex-1" />
                    </div>
                  ))}
                </>}
              </div>
              {/* Layer label */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="absolute -right-16 top-1/2 -translate-y-1/2 px-2 py-1 rounded-full text-[9px] font-bold border"
                style={{ borderColor: layers[i].color, color: layers[i].color, background: `${layers[i].color}15` }}
              >
                {layers[i].label}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Circular energy / particle ring */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 320">
          {particles.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const sx = 200 + Math.cos(rad) * p.r;
            const sy = 160 + Math.sin(rad) * p.r;
            return (
              <motion.circle key={i} r="2" fill="#0d9488"
                style={{ filter: "drop-shadow(0 0 3px #0d9488)" }}
                initial={{ cx: sx, cy: sy, opacity: 0 }}
                animate={{ cx: [sx, 200], cy: [sy, 160], opacity: [0, 0.9, 0] }}
                transition={{ duration: 0.9, delay: p.delay + 0.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeIn" }}
              />
            );
          })}
          {/* Rotating orbit ring */}
          <motion.circle cx="200" cy="160" r="90" fill="none" stroke="#0d9488" strokeWidth="0.5"
            strokeDasharray="8 6" opacity="0.2"
            animate={{ rotate: 360 }}
            style={{ transformOrigin: "200px 160px" }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Central glowing hub */}
        <motion.div
          animate={{ boxShadow: ["0 0 0px #6366f1", "0 0 40px #6366f180", "0 0 0px #6366f1"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center z-10"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <Sparkles className="w-7 h-7 text-white" />
        </motion.div>
      </div>
      <p className="text-xs text-ink-soft text-center mt-2">AI breaks documents into structured layers — text, images, fields</p>
    </div>
  );
}

// ─── Scene 3: Structured Output ───────────────────────────────────────────────
const FIELDS = [
  { label: "Property Address", value: "1284 Oak Ridge Way, Austin TX" },
  { label: "List Price",       value: "$1,840,000" },
  { label: "Bedrooms / Baths", value: "4 BR / 3.5 BA" },
  { label: "Square Footage",   value: "3,420 sqft" },
  { label: "Year Built",       value: "2019" },
  { label: "Listing Agent",    value: "SOFO Realty Group" },
];

function Scene3() {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full grid grid-cols-2 gap-2.5">
        {FIELDS.map((f, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 120, damping: 14 }}
            className="bg-white border border-border rounded-2xl p-3 shadow-soft relative overflow-hidden"
          >
            {/* Snap-in accent bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.3, ease: "easeOut" }}
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-teal origin-left"
            />
            <div className="text-[9px] text-ink-soft font-black uppercase tracking-widest mb-1">{f.label}</div>
            <TypedText text={f.value} delay={i * 0.1 + 0.3} className="text-[11px] font-bold text-ink" />
            {/* Checkmark */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.6, type: "spring" }}
              className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-brand-teal flex items-center justify-center"
            >
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-ink-soft text-center">Extracted data auto-organises into clean, readable cards</p>
    </div>
  );
}

// ─── Scene 4: Human Review ────────────────────────────────────────────────────
function Scene4({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0);
  // step 0 = cursor moving to field 0, 1 = highlight field 0, 2 = highlight field 1, 3 = edit field 2, 4 = click Next
  const [cursorPos, setCursorPos] = useState({ x: 20, y: 20 });
  const [editValue, setEditValue] = useState("4 BR / 3.5 BA");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const seq = [
      () => { setCursorPos({ x: 60, y: 52 }); },           // move to field 0
      () => { setStep(1); },                                  // highlight field 0
      () => { setCursorPos({ x: 60, y: 108 }); setStep(2); },// move + highlight field 1
      () => { setCursorPos({ x: 60, y: 164 }); setStep(3); setEditValue("4 BR / 3.5 BA ✓"); }, // edit
      () => { setCursorPos({ x: 160, y: 230 }); setStep(4); },// move to button
      () => { setConfirmed(true); setTimeout(onNext, 700); },
    ];
    const delays = [300, 700, 1200, 1800, 2400, 3000];
    const timers = seq.map((fn, i) => setTimeout(fn, delays[i]));
    return () => timers.forEach(clearTimeout);
  }, [onNext]);

  const reviewFields = FIELDS.slice(0, 3);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full relative">
        {/* Animated cursor */}
        <motion.div
          animate={{ left: cursorPos.x, top: cursorPos.y }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="absolute z-20 pointer-events-none"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          <MousePointer2 className="w-5 h-5 text-ink drop-shadow-md" />
        </motion.div>

        <div className="space-y-2">
          {reviewFields.map((f, i) => (
            <motion.div key={i}
              animate={{
                borderColor: step === i + 1 || step === i + 2 ? "#0d9488" : "#e5e7eb",
                backgroundColor: step === i + 1 || step === i + 2 ? "rgba(13,148,136,0.04)" : "#ffffff",
                boxShadow: step === i + 1 ? "0 0 0 3px rgba(13,148,136,0.15)" : "none",
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between px-4 py-3 rounded-2xl border bg-white"
            >
              <div>
                <div className="text-[9px] text-ink-soft font-black uppercase tracking-widest">{f.label}</div>
                <div className="text-[11px] font-bold text-ink mt-0.5">
                  {i === 2 && step >= 3 ? editValue : f.value}
                </div>
              </div>
              <AnimatePresence>
                {(step > i + 1) && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    transition={{ type: "spring" }}
                    className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center shrink-0"
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Review Complete button */}
        <motion.button
          animate={{
            backgroundColor: confirmed ? "#22c55e" : step >= 4 ? "#0d9488" : "#1a1a2e",
            boxShadow: step >= 4 && !confirmed ? "0 0 20px rgba(13,148,136,0.4)" : "none",
          }}
          transition={{ duration: 0.3 }}
          onClick={() => { setConfirmed(true); onNext(); }}
          className="w-full mt-3 py-3 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-2"
        >
          {confirmed ? (
            <><CheckCircle2 className="w-4 h-4" /> Review Complete</>
          ) : (
            <>Next <ArrowRight className="w-3.5 h-3.5" /></>
          )}
        </motion.button>
      </div>
      <p className="text-xs text-ink-soft text-center">Cursor highlights fields, makes edits, confirms review</p>
    </div>
  );
}
