import { motion } from "motion/react";
import { Camera, FileText, Share2, ArrowUpRight, Check, Sparkles, Clock, Zap, Users } from "lucide-react";
import { useBooking } from "../context/BookingContext";

const cards = [
  {
    title: "RIA Listing Manager",
    subtitle: "From raw data to live listing",
    desc: "RIA transforms property documents and photos into complete, publish-ready MLS listings: descriptions, fields, and all.",
    items: [
      "AI virtual staging in minutes",
      "Image enhancement & optimization",
      "MLS-ready listing descriptions",
      "Drone & photo auto-tagging",
    ],
    icon: Camera,
    color: "blue",
    cta: "Start with RIA",
    href: "#output",
    stat: "3.5 hrs",
    statLabel: "saved per listing",
    badge: "Most Popular",
    badgeColor: "bg-brand-blue/10 text-brand-blue",
  },
  {
    title: "RIA Smart Forms",
    subtitle: "PDF → Collaborative digital forms",
    desc: "Upload any PDF and RIA converts it into a live digital form. Seller and agent fill it together in real-time. No printing, no scanning, no back-and-forth.",
    items: [
      "PDF auto-converted to smart digital form",
      "Seller & agent fill simultaneously",
      "AI pre-fills known fields instantly",
      "E-sign & submit in one flow",
    ],
    icon: FileText,
    color: "purple",
    cta: "Try RIA Forms",
    href: "#output",
    stat: "10+",
    statLabel: "forms digitized per deal",
    badge: "Collaborative",
    badgeColor: "bg-brand-purple/10 text-brand-purple",
  },
  {
    title: "RIA Marketing Automation",
    subtitle: "One click, every platform",
    desc: "RIA generates and distributes high-converting campaigns across Instagram, Facebook, LinkedIn, and email, tailored to each platform.",
    items: [
      "Platform-specific social posts",
      "Ad creatives & A/B variants",
      "Email newsletter campaigns",
      "Automated distribution",
    ],
    icon: Share2,
    color: "teal",
    cta: "Automate Marketing",
    href: "#output",
    stat: "12.4k+",
    statLabel: "avg. campaign reach",
    badge: "AI-Powered",
    badgeColor: "bg-brand-teal/10 text-brand-teal",
  },
];

const colorMap: Record<string, {
  iconBg: string; iconText: string; iconBorder: string;
  checkBg: string; checkText: string; statText: string;
  topBar: string; hoverGlow: string;
}> = {
  blue: {
    iconBg: "bg-blue-50", iconText: "text-brand-blue", iconBorder: "border-brand-blue/15",
    checkBg: "bg-blue-50", checkText: "text-brand-blue",
    statText: "text-brand-blue", topBar: "bg-brand-blue", hoverGlow: "bg-blue-400",
  },
  purple: {
    iconBg: "bg-purple-50", iconText: "text-brand-purple", iconBorder: "border-brand-purple/15",
    checkBg: "bg-purple-50", checkText: "text-brand-purple",
    statText: "text-brand-purple", topBar: "bg-brand-purple", hoverGlow: "bg-purple-400",
  },
  teal: {
    iconBg: "bg-teal-50", iconText: "text-brand-teal", iconBorder: "border-brand-teal/15",
    checkBg: "bg-teal-50", checkText: "text-brand-teal",
    statText: "text-brand-teal", topBar: "bg-brand-teal", hoverGlow: "bg-teal-400",
  },
};

export default function UseCases({ id }: { id?: string }) {
  const { openModal } = useBooking();

  return (
    <section id={id} className="py-16 sm:py-28 px-4 sm:px-6 bg-muted/30 relative overflow-hidden hidden">

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">

        {/* ── Header ── */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-white text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft shadow-soft"
          >
            <Zap className="w-3 h-3 text-brand-blue" />
            Three Agents · One Platform
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight"
          >
            <span className="text-ink">Intelligent automation for</span>{" "}
            <br className="hidden sm:block" />
            <span className="text-ink-soft/70">every stage</span>{" "}
            <span className="text-ink">of the deal.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-soft text-base sm:text-lg font-medium leading-relaxed"
          >
            From first document upload to published listing. SOFO AI handles the entire workflow so you never touch a form again.
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7">
          {cards.map((card, idx) => {
            const c = colorMap[card.color];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100, damping: 14 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border border-border shadow-soft hover:shadow-elevated transition-all duration-300 group relative overflow-hidden flex flex-col"
              >
                {/* Colored top bar */}
                <div className={`h-1 w-full ${c.topBar} rounded-t-3xl`} />

                <div className="p-7 sm:p-8 flex flex-col flex-1 gap-5">

                  {/* Badge + icon row */}
                  <div className="flex items-start justify-between">
                    <div className={`w-13 h-13 w-12 h-12 rounded-2xl ${c.iconBg} ${c.iconText} border ${c.iconBorder} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Title + subtitle */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-ink leading-tight">{card.title}</h3>
                    <p className={`text-[11px] font-black uppercase tracking-widest mt-1 ${c.iconText} opacity-70`}>{card.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-ink-soft text-sm leading-relaxed font-medium">{card.desc}</p>

                  {/* Feature list */}
                  <ul className="space-y-2.5 flex-1">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full ${c.checkBg} ${c.checkText} flex items-center justify-center shrink-0`}>
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </div>
                        <span className="text-[13px] text-ink-soft font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stat strip */}
                  <div className="flex items-center gap-3 py-3.5 px-4 rounded-2xl bg-muted/60 border border-border/60">
                    <Clock className={`w-4 h-4 shrink-0 ${c.iconText}`} />
                    <div>
                      <span className={`text-lg font-display font-black ${c.statText}`}>{card.stat}</span>
                      <span className="text-[11px] text-ink-soft font-medium ml-1.5">{card.statLabel}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={card.href}
            onClick={(e: { preventDefault: () => void }) => {
                      e.preventDefault();
                      if (card.title === "RIA Smart Forms") {
                        window.location.hash = "#/ria";
                      } else if (card.title === "RIA Listing Manager") {
                        window.location.hash = "#/staging";
                      } else if (card.title === "RIA Marketing Automation") {
                        window.location.hash = "#/marketing";
                      } else {
                        openModal();
                      }
                    }}
                    className="flex items-center justify-between w-full py-3.5 px-5 rounded-2xl bg-ink text-white text-sm font-bold hover:bg-brand-blue transition-colors shadow-soft shadow-ink/10 group/btn"
                  >
                    {card.cta}
                    <ArrowUpRight className="w-4 h-4 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

                {/* Hover glow */}
                <div className={`absolute -right-16 -bottom-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${c.hoverGlow}`} />
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4"
        >
          {[
            { icon: Sparkles, text: "No setup required" },
            { icon: Zap,      text: "Results in seconds" },
            { icon: Check,    text: "100% compliance coverage" },
            { icon: Clock,    text: "Save 15+ hours per week" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-ink-soft/60">
              <Icon className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <span className="text-xs font-semibold">{text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
