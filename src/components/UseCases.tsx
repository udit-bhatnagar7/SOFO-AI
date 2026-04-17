import { motion } from "motion/react";
import { Camera, FileText, Share2, ArrowUpRight } from "lucide-react";

const cards = [
  {
    title: "Create Listings",
    items: ["Virtual staging", "Image enhancement", "Listing descriptions"],
    icon: Camera,
    color: "blue",
    cta: "Start Listing",
  },
  {
    title: "Handle Paperwork",
    items: ["Listing agreement auto-fill", "Seller disclosure", "IABS forms", "Document extraction"],
    icon: FileText,
    color: "purple",
    cta: "Upload PDF",
  },
  {
    title: "Market Listings",
    items: ["Social media posts", "Platform captions", "Ad creatives", "Email campaigns"],
    icon: Share2,
    color: "teal",
    cta: "Generate Content",
  },
];

export default function UseCases() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-display font-bold tracking-tight text-ink leading-tight">
            Intelligent automation for <br />
            every stage of the deal.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              className="bg-surface-elevated p-10 rounded-3xl border border-border shadow-soft hover:shadow-elevated hover:shadow-ink/5 transition-all group relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 shadow-soft border ${
                card.color === 'blue' ? 'bg-blue-50 text-brand-blue border-brand-blue/10' : 
                card.color === 'purple' ? 'bg-purple-50 text-brand-purple border-brand-purple/10' : 
                'bg-teal-50 text-brand-teal border-brand-teal/10'
              }`}>
                <card.icon className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-display font-bold text-ink mb-4">{card.title}</h3>
              
              <ul className="space-y-3 mb-10 min-h-[140px]">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink-soft/80 text-[13px] font-medium font-sans">
                    <div className="w-1 h-1 rounded-full bg-border" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="flex items-center justify-between w-full py-4 px-6 rounded-2xl bg-ink text-white text-sm font-bold hover:opacity-95 transition-opacity shadow-soft shadow-ink/10">
                {card.cta}
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </button>

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
