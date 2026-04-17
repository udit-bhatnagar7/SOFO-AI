import { motion } from "motion/react";
import { ArrowRight, Sparkles, FileText, Layout, Megaphone, Calendar, PlayCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useVideo } from "../context/VideoContext";

type WorkspaceMode = "extraction" | "staging" | "transaction" | "marketing";

export default function Hero() {
  const [activeMode, setActiveMode] = useState<WorkspaceMode>("extraction");
  const { openModal } = useBooking();
  const { openVideo } = useVideo();

  const modeIndex: Record<WorkspaceMode, number> = {
    extraction: 0,
    staging: 1,
    transaction: 2,
    marketing: 3,
  };

  const xOffset = `${modeIndex[activeMode] * -25}%`;

  const glowColor =
    activeMode === "extraction" ? "#a855f7" :
    activeMode === "staging"    ? "#3b82f6" :
    activeMode === "transaction"? "#6366f1" :
    "#14b8a6";

  return (
    <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden noise">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-60 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-gradient-soft blur-3xl opacity-60" />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 content-layer flex flex-col items-center gap-10 sm:gap-16 py-8 sm:py-12">
        
        {/* Top: Intelligence Console */}
        <div className="w-full text-center z-10 space-y-8 sm:space-y-10 max-w-4xl">
          <div className="space-y-5 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/70 backdrop-blur px-3 py-1.5 text-xs font-medium text-ink-soft shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
              SofoAI Agentic
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-7xl font-semibold tracking-[-0.04em] text-neutral-900 leading-[0.95]"
            >
              Agentic OS for<br />
              <span className="text-gradient-brand">real estate.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto px-2"
            >
              Outcome-driven AI agents that automatically complete end-to-end workflows: listing creation, document processing, and global marketing distribution.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 pt-2 sm:pt-4"
          >
            <button
              onClick={openModal}
              className="group inline-flex items-center gap-3 rounded-2xl bg-ink text-white text-base font-bold px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-brand-blue transition-all shadow-heavy hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <Calendar className="h-5 w-5 opacity-70" /> Book a Demo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={openVideo}
              className="inline-flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated text-ink text-base font-bold px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-muted transition-all shadow-sm w-full sm:w-auto justify-center"
            >
              <PlayCircle className="h-5 w-5 text-brand-blue" /> Watch Product Tour
            </button>
          </motion.div>
        </div>

        {/* Bottom: Spatial Workspace Hub */}
        <div className="w-full relative perspective-[2000px]">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Global Ambient Glow */}
            <motion.div 
              animate={{ 
                backgroundColor: glowColor,
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-40 blur-[140px] rounded-full z-0 pointer-events-none" 
            />

            <div className="relative rounded-2xl border border-border/80 bg-white/95 backdrop-blur-2xl shadow-mega overflow-hidden h-[520px] sm:h-[600px] lg:h-[680px] flex flex-col transition-all duration-700">
              {/* Hub OS Header */}
              <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-5 border-b border-border/40 bg-muted/20 gap-3">
                <div className="flex items-center gap-3 sm:gap-6">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400/20 border border-red-400/30" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400/20 border border-yellow-400/30" />
                    <span className="h-2 w-2 rounded-full bg-green-400/20 border border-green-400/30" />
                  </div>
                  <div className="hidden sm:block text-[9px] font-black uppercase tracking-[0.4em] text-ink-soft/60">
                    SOFO AI
                  </div>
                </div>

                <div className="flex p-1 bg-muted/40 border border-border/40 rounded-xl overflow-x-auto" role="tablist" aria-label="Workspace mode">
                  {[
                    { id: "extraction",  icon: FileText,    label: "RIA" },
                    { id: "staging",     icon: Layout,      label: "Staging AI" },
                    { id: "transaction", icon: ShieldCheck, label: "Transaction" },
                    { id: "marketing",   icon: Megaphone,   label: "Marketing" },
                   ].map((station) => (
                    <button
                      key={station.id}
                      role="tab"
                      aria-selected={activeMode === station.id}
                      aria-controls={`panel-${station.id}`}
                      onClick={() => setActiveMode(station.id as WorkspaceMode)}
                      className={`relative flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-2 rounded-lg transition-all duration-500 ease-out whitespace-nowrap ${
                        activeMode === station.id ? "text-ink" : "text-ink-soft hover:text-ink hover:bg-white/40"
                      }`}
                    >
                      {activeMode === station.id && (
                        <motion.div 
                          layoutId="hub-pill"
                          className="absolute inset-0 bg-white border border-border shadow-soft rounded-lg"
                          transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                        />
                      )}
                      <station.icon className={`relative z-10 w-3.5 h-3.5 transition-colors duration-500 ${activeMode === station.id ? "text-brand-blue" : "opacity-40"}`} />
                      <span className="relative z-10 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{station.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* The Stage: Horizontal Panning Workspace */}
            <div className="flex-1 relative overflow-hidden">
               <motion.div 
                 animate={{ x: xOffset }}
                 transition={{ type: "spring", stiffness: 80, damping: 20 }}
                 className="absolute inset-y-0 left-0 flex w-[400%] h-full"
               >
                 {/* Workspace 01: RIA Automation */}
                 <div className="w-1/4 flex-shrink-0 h-full p-4 sm:p-8 xl:p-12 flex flex-col justify-center overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 sm:gap-12 items-center">
                       <div className="relative group">
                          <div className="absolute -inset-10 bg-brand-purple/5 blur-3xl rounded-full opacity-50" />
                          <div className="relative p-4 sm:p-6 xl:p-8 rounded-2xl border border-border/40 bg-white shadow-elevated">
                             <div className="flex items-center justify-between mb-5 sm:mb-8">
                                <div className="flex items-center gap-3 sm:gap-4">
                                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center">
                                      <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                                   </div>
                                   <div className="text-left">
                                      <h4 className="text-sm sm:text-md font-bold text-ink leading-tight">RIA Automation</h4>
                                      <div className="text-[9px] font-black uppercase tracking-widest text-brand-purple/60 mt-1">Real Estate Intelligence</div>
                                   </div>
                                </div>
                             </div>

                          <div className="space-y-3 sm:space-y-4">
                             {[
                                { l: "Source Input", v: "DOCS, IMAGES, NOTES", w: "100%" },
                                { l: "Task Status", v: "MLS AUTO-FILL READY", w: "100%" },
                                { l: "Agent Output", v: "LISTING DESCRIPTIONS", w: "95%" },
                                { l: "System Outcome", v: "VALIDATED FORMS", w: "40%" }
                             ].map((f, i) => (
                                <div key={i} className="relative p-3 sm:p-4 rounded-xl border border-border/30 bg-muted/5 group overflow-hidden">
                                   <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: f.w }}
                                      className="absolute inset-y-0 left-0 bg-brand-purple/5 border-r border-brand-purple/10"
                                   />
                                   <div className="relative flex flex-col items-start gap-1">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft/40">{f.l}</span>
                                      <span className="text-xs sm:text-sm font-bold text-ink">{f.v}</span>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                       <div className="space-y-4 sm:space-y-6 text-left">
                          <div className="space-y-3">
                             <div className="inline-flex px-2 py-1 rounded bg-muted/40 text-[9px] font-black uppercase tracking-widest text-ink/40">Workflow: Process Listing</div>
                             <div className="text-xs font-mono text-ink-soft/80 leading-relaxed bg-muted/10 p-4 sm:p-5 rounded-2xl border border-border/20 shadow-inner">
                                {">"} Input: listing_agreement.pdf<br/>
                                {">"} Input: drone_shot_01.jpg<br/>
                                {">"} Agent: RIA Extracting Data...<br/>
                                {">"} Outcome: MLS Fields Mapped<br/>
                                {">"} Validation: All forms completed
                             </div>
                          </div>
                          <p className="text-xs text-ink-soft leading-relaxed font-medium">
                             RIA Automation processes every property document and image, extracting all required data to auto-fill MLS fields and generate listing descriptions.
                          </p>
                       </div>
                    </div>
                 </div>

                 {/* Workspace 02: Virtual Staging AI */}
                 <div className="w-1/4 flex-shrink-0 h-full p-0 flex">
                    <div className="flex-1 relative overflow-hidden group flex">
                       {/* Left Side: Empty Room */}
                       <div className="flex-1 relative border-r border-white/10 overflow-hidden">
                          <img 
                             src="https://images.unsplash.com/photo-1549517045-bc93de075e53?q=80&w=2070&auto=format&fit=crop" 
                             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                             alt="Empty Room"
                             referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-8 left-8">
                             <span className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black text-white/70 uppercase tracking-widest">Original / Empty</span>
                          </div>
                       </div>

                       {/* Right Side: Staged Room */}
                       <div className="flex-1 relative overflow-hidden">
                          <img 
                             src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" 
                             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                             alt="Staged Room"
                             referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-8 right-8">
                             <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-blue/40 backdrop-blur-md border border-brand-blue/20">
                                <Sparkles className="w-3 h-3 text-white" />
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">Agent Staged</span>
                             </div>
                          </div>
                       </div>

                       {/* Creative Mesh Overlay */}
                       <div className="absolute inset-0 z-10 pointer-events-none">
                          <div className="absolute inset-0 grid-bg opacity-30 invert" />
                          <motion.div 
                             animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                             transition={{ duration: 5, repeat: Infinity }}
                             className="absolute inset-x-0 top-1/4 h-px bg-brand-blue shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                          />
                       </div>

                       <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/40 p-12 flex flex-col justify-between pointer-events-none">
                          <div className="flex items-start justify-between pointer-events-auto">
                             <div className="glass-card-dark p-4 rounded-xl border-white/10 shadow-heavy">
                                <div className="text-[9px] font-black tracking-[0.2em] text-white/50 mb-3 underline decoration-white/20 underline-offset-4 uppercase">Staging Capabilities</div>
                                <div className="space-y-2">
                                   {['Virtual Staging+', 'Day to Dusk', 'Exterior Enhance', 'Room Emptying'].map(feature => (
                                      <div key={feature} className="flex items-center gap-2">
                                         <div className="w-1 h-1 rounded-full bg-brand-blue" />
                                         <span className="text-[9px] font-bold text-white uppercase tracking-widest">{feature}</span>
                                      </div>
                                   ))}
                                </div>
                             </div>
                             
                             <div className="w-44 h-9 glass-card-dark rounded-lg border-white/10 flex items-center justify-center gap-3">
                                <motion.div 
                                   animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                                   transition={{ duration: 2, repeat: Infinity }}
                                   className="w-1.5 h-1.5 rounded-full bg-brand-blue shadow-[0_0_12px_#3b82f6]" 
                                 />
                                <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">AI RECONSTRUCTION Active</span>
                             </div>
                          </div>

                          <div className="flex items-end justify-between pointer-events-auto">
                             <div className="max-w-md text-left">
                                <div className="inline-flex px-2 py-0.5 rounded bg-brand-blue/20 text-brand-blue text-[8px] font-black uppercase tracking-widest mb-4 border border-brand-blue/30 backdrop-blur">Visual Transformation</div>
                                <h3 className="text-4xl font-display font-bold text-white mb-3 drop-shadow-lg">Virtual Staging AI</h3>
                                <p className="text-base text-white/90 leading-relaxed font-medium drop-shadow-md">
                                   Enhance listing images: Virtual Staging, Day to Dusk transitions, Exterior Enhancement, and intelligent Room Emptying.
                                </p>
                             </div>
                             <button className="h-14 w-14 rounded-2xl bg-brand-blue text-white shadow-[0_20px_40px_rgba(59,130,246,0.4)] hover:scale-105 transition-transform grid place-items-center">
                                <Sparkles className="w-6 h-6" />
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Workspace 03: Transaction Manager */}
                 <div className="w-1/4 flex-shrink-0 h-full p-4 sm:p-8 xl:p-12 flex flex-col justify-center overflow-y-auto">
                    <div className="max-w-2xl mx-auto w-full space-y-6">
                       {/* Header */}
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                             <ShieldCheck className="w-6 h-6" />
                          </div>
                          <div>
                             <h4 className="font-bold text-ink text-base leading-tight">Transaction Manager</h4>
                             <div className="text-[9px] font-black uppercase tracking-widest text-indigo-500 mt-0.5">Document Processor</div>
                          </div>
                          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                             <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Processing</span>
                          </div>
                       </div>

                       {/* Form completion list */}
                       <div className="rounded-2xl border border-border/40 bg-white shadow-elevated overflow-hidden">
                          <div className="px-5 py-3 border-b border-border/30 bg-muted/20 flex items-center justify-between">
                             <span className="text-[10px] font-black uppercase tracking-widest text-ink-soft">Closing Stack</span>
                             <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">12 / 12 Complete</span>
                          </div>
                          <div className="divide-y divide-border/20">
                             {[
                                { name: "Listing Agreement",      status: "filled",   time: "0.3s" },
                                { name: "Seller Disclosure",      status: "filled",   time: "0.6s" },
                                { name: "IABS Form",              status: "filled",   time: "0.9s" },
                                { name: "Lead Paint Disclosure",  status: "filled",   time: "1.1s" },
                                { name: "HOA Addendum",           status: "filled",   time: "1.4s" },
                                { name: "Commission Agreement",   status: "filled",   time: "1.7s" },
                                { name: "MLS Input Sheet",        status: "filled",   time: "2.0s" },
                                { name: "Earnest Money Receipt",  status: "filled",   time: "2.2s" },
                             ].map((form, i) => (
                                <motion.div
                                   key={i}
                                   initial={{ opacity: 0, x: -8 }}
                                   animate={{ opacity: 1, x: 0 }}
                                   transition={{ delay: i * 0.08 }}
                                   className="flex items-center justify-between px-5 py-3"
                                >
                                   <div className="flex items-center gap-3">
                                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                         <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                                         </svg>
                                      </div>
                                      <span className="text-xs font-medium text-ink">{form.name}</span>
                                   </div>
                                   <span className="text-[10px] font-mono text-ink-soft/50">{form.time}</span>
                                </motion.div>
                             ))}
                          </div>
                       </div>

                       {/* Stats row */}
                       <div className="grid grid-cols-3 gap-3">
                          {[
                             { val: "100%", label: "Compliance" },
                             { val: "0",    label: "Errors" },
                             { val: "2.1s", label: "Avg. fill time" },
                          ].map((s, i) => (
                             <div key={i} className="text-center p-3 rounded-xl bg-muted/30 border border-border/30">
                                <div className="text-lg font-display font-black text-indigo-600">{s.val}</div>
                                <div className="text-[9px] font-bold text-ink-soft uppercase tracking-widest mt-0.5">{s.label}</div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Workspace 04: Marketing Agent */}
                 <div className="w-1/4 flex-shrink-0 h-full p-4 sm:p-8 lg:p-12 flex items-center overflow-y-auto">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 sm:gap-12 items-center">
                       <div className="space-y-8 text-left">
                          <div className="space-y-6">
                             <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shadow-soft">
                                <Megaphone className="w-7 h-7" />
                             </div>
                             <div>
                                <h3 className="text-3xl font-display font-bold text-ink mb-4">Marketing Agent Hub</h3>
                                <p className="text-base text-ink-soft leading-relaxed font-medium">
                                    Outcome-driven agent that generates social posts, ad creatives, and platform-specific captions across all channels.
                                </p>
                             </div>
                          </div>

                          <div className="p-6 rounded-2xl border border-border/40 bg-brand-teal/5 space-y-6">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                                   <span className="text-[10px] font-black text-ink uppercase tracking-widest">Active Distribution</span>
                                </div>
                                <div className="flex gap-1">
                                   {[1, 2, 3].map(i => (
                                      <div key={i} className="w-4 h-4 rounded-full bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center">
                                         <div className="w-1 h-1 rounded-full bg-brand-teal" />
                                      </div>
                                   ))}
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                   <div className="text-[9px] font-black text-ink-soft/40 uppercase tracking-widest">Est. Reach</div>
                                   <div className="text-xl font-display font-bold text-ink">12.4k+</div>
                                </div>
                                <div className="space-y-1">
                                   <div className="text-[9px] font-black text-ink-soft/40 uppercase tracking-widest">Placement</div>
                                   <div className="text-xl font-display font-bold text-ink">Global Sync</div>
                                </div>
                             </div>

                             <div className="pt-4 border-t border-brand-teal/10 flex items-center gap-3">
                                <div className="text-brand-teal font-black text-[10px] uppercase tracking-widest animate-pulse">Campaign optimizing in real-time</div>
                                <ArrowRight className="w-3 h-3 text-brand-teal" />
                             </div>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="text-[10px] font-black text-ink-soft/40 uppercase tracking-[0.2em] mb-4 text-center">Agent Outputs</div>
                          <div className="grid grid-cols-2 gap-4">
                             {[
                                { label: "Social", img: "https://picsum.photos/seed/s1/400/300", cap: "IG Post ✨" },
                                { label: "Ads", img: "https://picsum.photos/seed/a1/400/300", cap: "Meta Ads 🏡" },
                                { label: "Email", img: "https://picsum.photos/seed/e1/400/300", cap: "Newsletter ✉️" },
                                { label: "Print", img: "https://picsum.photos/seed/p1/400/300", cap: "PDF Flyer 📄" }
                             ].map((creative, i) => (
                                <motion.div 
                                   key={i}
                                   initial={{ opacity: 0, scale: 0.95 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   transition={{ delay: i * 0.1 }}
                                   className="p-3 rounded-2xl border border-border/40 bg-white shadow-soft flex flex-col gap-3 text-left group overflow-hidden"
                                >
                                   <div className="w-full h-24 rounded-xl overflow-hidden shrink-0 border border-border/20">
                                      <img src={creative.img} alt="Creative" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                                   </div>
                                   <div className="space-y-1">
                                      <div className="text-[9px] font-black text-brand-teal uppercase tracking-widest">{creative.label}</div>
                                      <div className="text-[10px] font-bold text-ink line-clamp-1 italic text-ink-soft">"{creative.cap}"</div>
                                   </div>
                                </motion.div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
               </motion.div>
            </div>
            
            {/* Hub OS Footer Action */}
            <div className="px-4 sm:px-8 py-3 sm:py-5 border-t border-border/40 bg-muted/20 flex items-center justify-between gap-3 hidden">
               <div className="flex items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-2 group cursor-pointer">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                     <span className="text-[9px] sm:text-[10px] font-black text-ink-soft uppercase tracking-widest group-hover:text-ink transition-colors hidden sm:block">Agent_Cluster_Sync_Active</span>
                     <span className="text-[9px] font-black text-ink-soft uppercase tracking-widest group-hover:text-ink transition-colors sm:hidden">Active</span>
                  </div>
               </div>
               <button className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-ink text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-blue transition-all shadow-heavy group whitespace-nowrap">
                  Execute Workflow
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
}
