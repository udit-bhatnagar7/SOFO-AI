import { motion } from "motion/react";
import { User, ShieldCheck, Zap } from "lucide-react";

const agents = [
  {
    name: "Ria",
    desc: "Your dedicated Listing Manager. Ria handles the heavy lifting from raw property data to polished listings.",
    icon: User,
  },
  {
    name: "Transaction Agent",
    desc: "Processes documents and fills all required forms with surgical precision.",
    icon: ShieldCheck,
  },
  {
    name: "Marketing Agent",
    desc: "Generates and distributes high-converting content across all platforms.",
    icon: Zap,
  },
];

export default function AgentSystem() {
  return (
    <section className="py-32 px-6 bg-ink text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl font-display font-bold tracking-tight leading-tight">
            Designed to think. <br />
            Built to execute.
          </h2>
          <p className="text-white/60 text-xl leading-relaxed max-w-lg font-medium">
            Each agent works independently or together as your unified AI team. 
            Automating the tedious so you can focus on the closing.
          </p>
          <div className="space-y-4 pt-8 border-t border-white/10">
            {agents.map((agent, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  bounce: 0.3
                }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/20 group-hover:scale-110 transition-transform">
                  <agent.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{agent.name}</h4>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">{agent.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative group">
          {/* Orbital Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border border-white/5 rounded-full"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute inset-12 border border-white/5 rounded-full border-dashed"
             />
          </div>

          <div className="aspect-square glass-card bg-white/5 rounded-full border border-white/10 p-16 flex items-center justify-center relative">
             {/* Pulsing Core Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/20 rounded-full blur-[100px] animate-pulse" />
             
             <div className="relative w-full h-full flex items-center justify-center">
                {/* Network Visualization */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-brand-blue)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--color-brand-blue)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="var(--color-brand-blue)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Dynamic Connection Lines */}
                    {[
                      { x: "15%", y: "15%" }, { x: "85%", y: "15%" },
                      { x: "15%", y: "85%" }, { x: "85%", y: "85%" }
                    ].map((pos, i) => (
                      <g key={i}>
                        <line x1="50%" y1="50%" x2={pos.x} y2={pos.y} stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                        <motion.circle
                          r="2"
                          fill="var(--color-brand-blue)"
                          initial={{ offsetDistance: "0%" }}
                          animate={{ 
                            cx: ["50%", pos.x],
                            cy: ["50%", pos.y],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 2 + i, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: i * 0.5 
                          }}
                        />
                      </g>
                    ))}
                </svg>

                {/* Floating Agent Status Cards */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -left-12 bg-white p-5 rounded-2xl text-ink shadow-heavy min-w-[220px] border border-border/50 z-20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft">Ria · Analysis</span>
                  </div>
                  <div className="text-sm font-bold tracking-tight">Extracting Tax Records...</div>
                  <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-full bg-brand-blue"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-12 -right-12 bg-white p-5 rounded-2xl text-ink shadow-heavy min-w-[220px] border border-border/50 z-20"
                >
                   <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-brand-purple" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft">Market Agent</span>
                  </div>
                  <div className="text-sm font-bold tracking-tight">Optimizing Ad Spend</div>
                  <div className="mt-3 flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1 bg-brand-purple/30 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Micro-Task Fragments */}
                {[
                  { label: "Tax ID: 82-194", pos: { top: "25%", right: "20%" }, delay: 0.2 },
                  { label: "v_staging_v2.mp4", pos: { bottom: "30%", left: "15%" }, delay: 1.5 },
                  { label: "SEO Meta: Generated", pos: { top: "45%", left: "10%" }, delay: 0.8 },
                  { label: "IDX Sync: Stable", pos: { bottom: "40%", right: "12%" }, delay: 2.2 },
                ].map((task, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: task.delay,
                      ease: "easeInOut" 
                    }}
                    className="absolute z-10 glass-card px-3 py-1.5 rounded-lg border-white/5 text-[9px] font-mono font-bold text-white/40 whitespace-nowrap shadow-elevated"
                    style={task.pos}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand-blue" />
                      {task.label}
                    </div>
                  </motion.div>
                ))}

                {/* Floating Geometric Noise */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, 90, 180] 
                      }}
                      transition={{ 
                        duration: 15 + i * 5, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="absolute w-40 h-40 border border-white/10 rounded-full"
                      style={{
                        top: `${10 + Math.random() * 80}%`,
                        left: `${10 + Math.random() * 80}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Central Brain Core */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.3)] relative z-10 group/core"
                >
                   <div className="text-4xl font-display font-black text-white">S</div>
                   {/* Orbiting particles around core */}
                   <div className="absolute inset-0 border border-white/20 rounded-[2.5rem] scale-110 animate-ping opacity-20" />
                </motion.div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
