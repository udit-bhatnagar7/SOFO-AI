import { motion } from "motion/react";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card py-4 px-8 rounded-full border border-border/50 shadow-elevated">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center text-white font-display font-black shadow-soft shadow-ink/20">S</div>
          <span className="text-xl font-display font-bold tracking-tight text-ink">SOFO AI</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {["Agents", "Use Cases", "Workflows", "Pricing"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-ink hover:text-ink-soft transition-colors tracking-tight">Login</button>
          <button className="bg-ink text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-soft shadow-ink/10">
            Try SOFO AI
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
