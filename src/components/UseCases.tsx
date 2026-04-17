import { motion } from "motion/react";
import { Camera, FileText, Share2, ArrowUpRight } from "lucide-react";

const cards = [
  {
    title: "Create Listings",
    items: ["Virtual staging", "Image enhancement", "Listing descriptions"],
    icon: Camera,
    color: "blue",
    cta: "Start Listing",
    href: "#output",
  },
  {
    title: "Handle Paperwork",
    items: ["Listing agreement auto-fill", "Seller disclosure", "IABS forms", "Document extraction"],
    icon: FileText,
    color: "purple",
    cta: "Upload PDF",
    href: "#output",
  },
  {
    title: "Market Listings",
    items: ["Social media posts", "Platform captions", "Ad creatives", "Email campaigns"],
    icon: Share2,
    color: "teal",
    cta: "Generate Content",
    href: "#output",
  },
];

export default function UseCases({ id }: { id?: string }) {
  return (
    <section id={id} className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight leading-tight">
            <span className="text-ink">Intelligent automation for</span>{" "}
            <br className="hidden sm:block" />
            <span className="text-ink-soft/50">every stage</span>{" "}
            <span className="text-ink">of the deal.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: idx * 0.1, 
                type: "spring", 
                stiffness: 100, 
                damping: 14, 
                bounce: 0.35 
              }}
              whileHover={{ y: -10 }}
              className="bg-surface-elevated p-7 sm:p-10 rounded-3xl border border-border shadow-soft hover:shadow-elevated hover:shadow-ink/5 transition-all group relative overflow-hidden"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 transition-transform group-hover:scale-110 shadow-soft border ${
                card.color === 'blue' ? 'bg-blue-50 text-brand-blue border-brand-blue/10' : 
                card.color === 'purple' ? 'bg-purple-50 text-brand-purple border-brand-purple/10' : 
                'bg-teal-50 text-brand-teal border-brand-teal/10'
              }`}>
                <card.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-ink mb-4">{card.title}</h3>
              
              <ul className="space-y-3 mb-8 sm:mb-10 min-h-[120px] sm:min-h-[140px]">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink-soft/80 text-[13px] font-medium font-sans">
                    <div className="w-1 h-1 rounded-full bg-border" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={card.href}
                className="flex items-center justify-between w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl bg-ink text-white text-sm font-bold hover:opacity-95 transition-opacity shadow-soft shadow-ink/10"
              >
                {card.cta}
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </a>

              {/* Subtle background glow on hover */}
              <div className={`absolute -right-20 -bottom-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity ${
                card.color === 'blue' ? 'bg-blue-600' : 
                card.color === 'purple' ? 'bg-purple-600' : 
                'bg-teal-600'
              }`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
