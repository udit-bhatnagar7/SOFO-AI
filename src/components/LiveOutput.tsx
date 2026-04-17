import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight, FileText, Share2, Sparkles, WandSparkles, ShieldCheck, Check } from "lucide-react";

export default function LiveOutput() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState("Instagram");

  const features = [
    {
      agent: "Ria",
      title: "Ria handles the paperwork.",
      desc: "Meet Ria, your autonomous Listing Manager. She extracts complex legal data from disclosures and IABS forms with surgical precision, auto-filling your entire closing stack in seconds.",
      cta: "Analyze with Ria",
      color: "purple",
      tag: "Extraction",
      visual: (
        <div className="glass-card rounded-3xl p-10 border-border shadow-heavy relative overflow-hidden h-full flex flex-col justify-center bg-white">
          <div className="absolute top-0 right-0 p-8 text-brand-purple opacity-[0.03]">
            <FileText size={200} />
          </div>
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-4 text-brand-purple">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/5 flex items-center justify-center border border-brand-purple/10">
                <FileText className="w-6 h-6" />
              </div>
              <div className="font-mono text-sm text-ink-soft font-medium tracking-tight">closing_stack_final.pdf</div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Seller Name", val: "Bhatnagar Living Trust" },
                { label: "Property Address", val: "1284 Oak Ridge Way" },
                { label: "Listing Price", val: "$1,840,000" },
                { label: "Commission", val: "2.5% Buyer Agency" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/40 hover:border-border/80 transition-colors"
                >
                  <span className="text-[10px] font-bold text-ink-soft uppercase tracking-wider">{item.label}</span>
                  <span className="text-sm font-semibold text-ink">{item.val}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2.5 text-green-600 font-bold text-xs bg-green-500/5 w-fit px-4 py-2.5 rounded-full border border-green-500/10 shadow-soft">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              12 forms auto-filled by Ria
            </div>
          </div>
        </div>
      )
    },
    {
      agent: "Staging Agent",
      title: "Breathe life into empty spaces.",
      desc: "Our Virtual Staging system understands architecture and light to virtually stage rooms with furniture that matches the property's soul. Increase engagement by 40% without rent or movers.",
      cta: "Start Staging",
      color: "blue",
      tag: "Vision",
      visual: (
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-heavy group border border-border bg-muted">
          <img 
            src="https://picsum.photos/seed/arch-inner/1200/900" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Before"
            referrerPolicy="no-referrer"
          />
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            <img 
              src="https://picsum.photos/seed/loft-design/1200/900" 
              className="w-full h-full object-cover"
              alt="After"
              referrerPolicy="no-referrer"
            />
          </div>
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center transition-transform group-hover:scale-y-110 z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-10 h-10 bg-white rounded-full shadow-elevated flex items-center justify-center border border-border">
               <div className="flex gap-1">
                 <div className="w-0.5 h-3 bg-ink-soft/30 rounded-full" />
                 <div className="w-0.5 h-3 bg-ink-soft/30 rounded-full" />
               </div>
            </div>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPos} 
            onChange={(e) => setSliderPos(Number(e.target.value))}
            aria-label="Before and after staging comparison"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
          <div className="absolute bottom-6 left-6 glass-card px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-ink shadow-soft">Empty Listing</div>
          <div className="absolute bottom-6 right-6 glass-card px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-ink shadow-soft">AI Staged</div>
        </div>
      )
    },
    {
      agent: "Transaction Manager",
      title: "Every form, filled instantly.",
      desc: "The Transaction Manager processes seller disclosures, IABS forms, and the full closing stack with surgical precision. Upload once, get 12+ forms completed in seconds.",
      cta: "Process Documents",
      color: "indigo",
      tag: "Compliance",
      visual: (
        <div className="bg-white rounded-3xl border border-border shadow-heavy overflow-hidden h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border/40 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-ink">Closing Stack</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-indigo-500">Auto-processing</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">12 / 12 Done</span>
            </div>
          </div>

          {/* Form list — shows 5 rows, rest scrollable */}
          <div
            className="overflow-y-auto divide-y divide-border/20"
            style={{ maxHeight: "calc(5 * 48px)" }}
          >
            {[
              { name: "Listing Agreement",     time: "0.3s" },
              { name: "Seller Disclosure",     time: "0.6s" },
              { name: "IABS Form",             time: "0.9s" },
              { name: "Lead Paint Disclosure", time: "1.1s" },
              { name: "HOA Addendum",          time: "1.4s" },
              { name: "Commission Agreement",  time: "1.7s" },
              { name: "MLS Input Sheet",       time: "2.0s" },
              { name: "Earnest Money Receipt", time: "2.2s" },
              { name: "Title Commitment",      time: "2.5s" },
              { name: "Showing Instructions",  time: "2.7s" },
              { name: "Lockbox Authorization", time: "2.9s" },
              { name: "Property Survey",       time: "3.1s" },
            ].map((form, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between px-6 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-ink">{form.name}</span>
                </div>
                <span className="text-[10px] font-mono text-ink-soft/50">{form.time}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats footer */}
          <div className="px-6 py-4 border-t border-border/40 bg-muted/10 grid grid-cols-3 gap-4">
            {[
              { val: "100%", label: "Compliance" },
              { val: "0",    label: "Errors" },
              { val: "3.1s", label: "Total time" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-display font-black text-indigo-600">{s.val}</div>
                <div className="text-[9px] font-bold text-ink-soft uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      agent: "Marketing Agent",
      title: "Marketing on autopilot.",
      desc: "Marketing Automation takes your listing data and generates cross-platform campaigns. From high-engagement Instagram reels to 1,000-word LinkedIn articles ready in one click.",
      cta: "Automate Marketing",
      color: "teal",
      tag: "Distribution",
      visual: (
        <div className="glass-card rounded-3xl overflow-hidden flex flex-col shadow-heavy border-border h-full bg-white">
          <div className="flex border-b border-border bg-muted/10 p-1" role="tablist" aria-label="Social platform">
            {["Instagram", "Facebook", "LinkedIn"].map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.1em] rounded-xl transition-all ${activeTab === tab ? "text-ink bg-white shadow-soft border border-border" : "text-ink-soft hover:text-ink"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-8 space-y-6">
            <div className="h-48 bg-muted/30 rounded-2xl p-3 border border-border/50 relative group overflow-hidden">
               <div className="grid grid-cols-2 gap-3 h-full">
                 <div className="relative rounded-xl overflow-hidden group/img">
                   <img 
                     src="https://picsum.photos/seed/ad1/600/600" 
                     className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" 
                     alt="Ad 1"
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-black/10" />
                 </div>
                 <div className="relative rounded-xl overflow-hidden group/img">
                   <img 
                     src="https://picsum.photos/seed/ad2/600/600" 
                     className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" 
                     alt="Ad 2"
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-black/10" />
                 </div>
                 <div className="relative rounded-xl overflow-hidden group/img col-span-2 hidden">
                   <img 
                     src="https://picsum.photos/seed/ad3/1200/600" 
                     className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" 
                     alt="Ad 3"
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-black/20" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Share2 className="w-8 h-8 text-white/50 group-hover:scale-125 transition-transform" />
                   </div>
                 </div>
               </div>
               <div className="absolute top-6 left-6 flex items-center gap-2 pointer-events-none">
                 <div className="text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-black/40 backdrop-blur-md border border-white/10">Creative Assets</div>
               </div>
               <div className="absolute bottom-6 left-6 pointer-events-none">
                 <div className="text-white text-[10px] font-bold px-2 py-1 rounded bg-brand-teal shadow-elevated shadow-brand-teal/20">A/B Testing Enabled</div>
               </div>
            </div>
            <div className="p-5 rounded-2xl bg-muted/40 border border-border/30 relative">
               <Sparkles className="absolute top-4 right-4 w-3 h-3 text-brand-teal opacity-50" />
               <p className="text-sm text-ink-soft leading-relaxed italic font-medium">
                 "{activeTab === 'Instagram' ? 'Experience the peak of luxury. ⛰️' : 'New listing Alert:'} This architectural gem in Oak Ridge features expansive glass walls and a master suite built for sunsets..."
               </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex -space-x-2">
                {[12,45,67].map(i => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?u=${i}`} 
                    className="w-8 h-8 rounded-full border-2 border-white bg-muted object-cover shadow-soft" 
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-teal text-[10px] text-white flex items-center justify-center font-bold shadow-soft transition-transform hover:scale-110 cursor-pointer">+18</div>
              </div>
              <button className="text-brand-teal text-xs font-bold flex items-center gap-1.5 group">
                Review & Publish <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="output" className="py-16 sm:py-32 px-4 sm:px-6 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-16 sm:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-ink tracking-tight leading-[1.1]"
          >
            Real results, in seconds.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-lg sm:text-xl leading-relaxed font-medium"
          >
            Watch our agents transform raw inputs into production-ready assets.
          </motion.p>
        </div>

        <div className="space-y-24 sm:space-y-48">
          {features.map((feature, i) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-10 sm:gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Design Column (Left) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="w-full lg:w-1/2 flex-shrink-0"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-muted/30 rounded-[2.5rem] blur-2xl group-hover:bg-muted/50 transition-colors" />
                  <div className="relative">{feature.visual}</div>
                </div>
              </motion.div>

              {/* Text Column (Right) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 space-y-6 sm:space-y-8"
              >
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      feature.color === 'blue' ? 'bg-blue-50 text-brand-blue' : 
                      feature.color === 'purple' ? 'bg-purple-50 text-brand-purple' : 
                      feature.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                      'bg-teal-50 text-brand-teal'
                    }`}>
                      Agent ID: {feature.agent.split(' ')[0]}
                    </div>
                    <div className="h-[1px] w-8 bg-border" />
                    <span className="text-[10px] font-bold text-ink-soft uppercase tracking-widest">{feature.tag}</span>
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink leading-tight tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-ink-soft text-base sm:text-lg leading-relaxed max-w-lg font-medium">
                    {feature.desc}
                  </p>
                </div>
                
                <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
                  <button className={`group flex items-center gap-2 text-sm font-bold transition-all ${
                    feature.color === 'blue' ? 'text-brand-blue' : 
                    feature.color === 'purple' ? 'text-brand-purple' : 
                    feature.color === 'indigo' ? 'text-indigo-600' :
                    'text-brand-teal'
                  }`}>
                    {feature.cta} 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[32, 54, 89].map(i => (
                        <img 
                          key={i} 
                          src={`https://i.pravatar.cc/100?u=${i}`} 
                          className="w-5 h-5 rounded-full border border-white bg-muted object-cover" 
                          alt="Team Member"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-ink-soft font-bold uppercase tracking-widest">In use by 40+ teams</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
