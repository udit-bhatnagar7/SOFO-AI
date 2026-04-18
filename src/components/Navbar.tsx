import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useBooking } from "../context/BookingContext";

const navLinks = [
  { label: "RIA Platform", href: "#agents" },
  { label: "Use Cases",    href: "#use-cases" },
  { label: "Workflows",    href: "#workflows" },
  { label: "Pricing",      href: "#cta" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useBooking();

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-card py-3 sm:py-4 px-4 sm:px-8 rounded-full border border-border/50 shadow-elevated">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center text-white font-display font-black shadow-soft shadow-ink/20">S</div>
            <span className="text-xl font-display font-bold tracking-tight text-ink">SOFO AI</span>
          </a>

          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:block text-sm font-semibold text-ink hover:text-ink-soft transition-colors tracking-tight">Login</button>
            <button
              onClick={openModal}
              className="bg-ink text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-soft shadow-ink/10"
            >
              Try SOFO AI
            </button>
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-border bg-surface-elevated text-ink"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[72px] left-4 right-4 z-40 glass-card rounded-2xl border border-border/50 shadow-heavy p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors py-2 border-b border-border/30 last:border-0"
                >
                  {item.label}
                </a>
              ))}
              <button className="text-sm font-semibold text-ink hover:text-ink-soft transition-colors py-2 text-left">Login</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
