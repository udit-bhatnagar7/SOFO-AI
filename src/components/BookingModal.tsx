import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, ArrowRight, Check,
  FileText, ShieldCheck, Megaphone, Layers,
  User, Mail, Phone, Building2, ChevronRight,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

const services = [
  {
    id: "listing",
    label: "Listing Manager",
    sub: "Ria: auto-fills MLS, generates descriptions",
    icon: FileText,
    color: "blue",
  },
  {
    id: "transaction",
    label: "Transaction Manager",
    sub: "Processes disclosures, IABS & closing stack",
    icon: ShieldCheck,
    color: "purple",
  },
  {
    id: "marketing",
    label: "Marketing Agent",
    sub: "Social posts, ads & email campaigns",
    icon: Megaphone,
    color: "teal",
  },
  {
    id: "staging",
    label: "Virtual Staging",
    sub: "AI staging, day-to-dusk & room emptying",
    icon: Layers,
    color: "orange",
  },
];

const colorMap: Record<string, { ring: string; bg: string; text: string; check: string }> = {
  blue:   { ring: "ring-brand-blue/40",   bg: "bg-brand-blue/8",   text: "text-brand-blue",   check: "bg-brand-blue" },
  purple: { ring: "ring-brand-purple/40", bg: "bg-brand-purple/8", text: "text-brand-purple", check: "bg-brand-purple" },
  teal:   { ring: "ring-brand-teal/40",   bg: "bg-brand-teal/8",   text: "text-brand-teal",   check: "bg-brand-teal" },
  orange: { ring: "ring-orange-400/40",   bg: "bg-orange-50",      text: "text-orange-500",   check: "bg-orange-500" },
};

type Step = "service" | "details" | "done";

export default function BookingModal() {
  const { open, closeModal } = useBooking();
  const [step, setStep] = useState<Step>("service");
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggleService(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function validateDetails() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    return e;
  }

  function handleNext() {
    if (step === "service" && selected.length > 0) setStep("details");
    if (step === "details") {
      const e = validateDetails();
      if (Object.keys(e).length) { setErrors(e); return; }
      setStep("done");
    }
  }

  function handleClose() {
    closeModal();
    // reset after exit animation
    setTimeout(() => { setStep("service"); setSelected([]); setForm({ name: "", email: "", phone: "", company: "" }); setErrors({}); }, 400);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-lg bg-white rounded-3xl shadow-heavy overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header ── */}
              <div className="relative px-7 pt-7 pb-5 border-b border-border/40">
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-4">
                  {(["service", "details", "done"] as Step[]).map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                        step === s ? "bg-ink text-white scale-110" :
                        (["service","details","done"].indexOf(step) > i) ? "bg-green-500 text-white" :
                        "bg-muted text-ink-soft"
                      }`}>
                        {(["service","details","done"].indexOf(step) > i) ? <Check className="w-3 h-3" /> : i + 1}
                      </div>
                      {i < 2 && <div className={`w-8 h-px transition-colors duration-300 ${(["service","details","done"].indexOf(step) > i) ? "bg-green-500" : "bg-border"}`} />}
                    </div>
                  ))}
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-ink leading-tight">
                    {step === "service" && "What can we help you with?"}
                    {step === "details" && "Tell us about yourself"}
                    {step === "done" && "You're all set! 🎉"}
                  </h2>
                  <p className="text-sm text-ink-soft mt-1 font-medium">
                    {step === "service" && "Select one or more services. We will tailor your demo."}
                    {step === "details" && "We'll reach out within 24 hours to confirm your slot."}
                    {step === "done" && "Our team will contact you shortly to schedule your walkthrough."}
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-muted hover:bg-border/60 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-ink-soft" />
                </button>
              </div>

              {/* ── Body ── */}
              <div className="px-7 py-6">
                <AnimatePresence mode="wait">

                  {/* Step 1 — Service selection */}
                  {step === "service" && (
                    <motion.div
                      key="service"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {services.map((svc) => {
                        const c = colorMap[svc.color];
                        const active = selected.includes(svc.id);
                        return (
                          <button
                            key={svc.id}
                            onClick={() => toggleService(svc.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left group ${
                              active
                                ? `border-transparent ring-2 ${c.ring} ${c.bg}`
                                : "border-border hover:border-border/80 hover:bg-muted/30"
                            }`}
                          >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                              active ? `${c.bg} ${c.text} border border-current/20` : "bg-muted text-ink-soft group-hover:bg-border/40"
                            }`}>
                              <svc.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-bold text-sm transition-colors ${active ? "text-ink" : "text-ink"}`}>{svc.label}</div>
                              <div className="text-xs text-ink-soft/70 font-medium mt-0.5 truncate">{svc.sub}</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              active ? `${c.check} border-transparent` : "border-border"
                            }`}>
                              {active && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* Step 2 — Contact details */}
                  {step === "details" && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Selected services recap */}
                      <div className="flex flex-wrap gap-2 pb-2">
                        {selected.map((id) => {
                          const svc = services.find((s) => s.id === id)!;
                          const c = colorMap[svc.color];
                          return (
                            <span key={id} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${c.bg} ${c.text}`}>
                              <svc.icon className="w-3 h-3" />
                              {svc.label}
                            </span>
                          );
                        })}
                      </div>

                      {[
                        { key: "name",    label: "Full Name",    icon: User,      type: "text",  placeholder: "Jane Smith" },
                        { key: "email",   label: "Work Email",   icon: Mail,      type: "email", placeholder: "jane@brokerage.com" },
                        { key: "phone",   label: "Phone",        icon: Phone,     type: "tel",   placeholder: "+1 (555) 000-0000" },
                        { key: "company", label: "Brokerage",    icon: Building2, type: "text",  placeholder: "Compass, RE/MAX…" },
                      ].map(({ key, label, icon: Icon, type, placeholder }) => (
                        <div key={key}>
                          <label className="block text-xs font-bold text-ink-soft uppercase tracking-widest mb-1.5">
                            {label}{key === "name" || key === "email" ? " *" : ""}
                          </label>
                          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                            errors[key] ? "border-red-400 bg-red-50" : "border-border bg-muted/30 focus-within:border-brand-blue/50 focus-within:bg-white"
                          }`}>
                            <Icon className="w-4 h-4 text-ink-soft/50 shrink-0" />
                            <input
                              type={type}
                              value={form[key as keyof typeof form]}
                              onChange={(e) => {
                                setForm((f) => ({ ...f, [key]: e.target.value }));
                                if (errors[key]) setErrors((er) => { const n = { ...er }; delete n[key]; return n; });
                              }}
                              placeholder={placeholder}
                              className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-soft/30 outline-none font-medium"
                            />
                          </div>
                          {errors[key] && <p className="text-xs text-red-500 mt-1 font-medium">{errors[key]}</p>}
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 3 — Done */}
                  {step === "done" && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="py-6 flex flex-col items-center text-center gap-5"
                    >
                      <div className="w-20 h-20 rounded-3xl bg-green-50 border border-green-200 flex items-center justify-center">
                        <Check className="w-9 h-9 text-green-500" strokeWidth={2.5} />
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-ink text-lg">Request received, {form.name.split(" ")[0]}!</p>
                        <p className="text-sm text-ink-soft font-medium max-w-xs mx-auto leading-relaxed">
                          We'll reach out to <span className="text-ink font-bold">{form.email}</span> within 24 hours to schedule your personalized demo.
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 pt-1">
                        {selected.map((id) => {
                          const svc = services.find((s) => s.id === id)!;
                          const c = colorMap[svc.color];
                          return (
                            <span key={id} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${c.bg} ${c.text}`}>
                              <svc.icon className="w-3 h-3" />
                              {svc.label}
                            </span>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* ── Footer ── */}
              {step !== "done" && (
                <div className="px-7 pb-7 flex items-center justify-between gap-4">
                  {step === "details" ? (
                    <button
                      onClick={() => setStep("service")}
                      className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors"
                    >
                      ← Back
                    </button>
                  ) : (
                    <p className="text-xs text-ink-soft/50 font-medium">
                      {selected.length === 0 ? "Select at least one service" : `${selected.length} selected`}
                    </p>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={step === "service" && selected.length === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-ink text-white text-sm font-bold hover:bg-brand-blue transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                  >
                    {step === "service" ? "Continue" : "Book My Demo"}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}

              {step === "done" && (
                <div className="px-7 pb-7">
                  <button
                    onClick={handleClose}
                    className="w-full py-3 rounded-2xl bg-ink text-white text-sm font-bold hover:bg-brand-blue transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
