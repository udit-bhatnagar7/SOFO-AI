export default function Footer() {
  return (
    <footer className="py-20 px-6 bg-white border-t border-border/80">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center text-white font-display font-black shadow-soft shadow-ink/20">S</div>
            <span className="text-xl font-display font-bold tracking-tight text-ink">SOFO AI</span>
          </div>
          <p className="text-ink-soft text-sm max-w-[200px] leading-relaxed font-medium">
            The Agentic Operating System for modern real estate professionals.
          </p>
        </div>

        {[
          { title: "Product", links: ["Agents", "Workflows", "Staging", "Security"] },
          { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
          { title: "Legal", links: ["Terms", "Privacy", "Security", "Cookies"] },
        ].map((col, idx) => (
          <div key={idx} className="space-y-6">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-ink">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-ink-soft hover:text-ink transition-colors text-sm font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6 text-ink-soft text-[11px] font-bold uppercase tracking-widest">
        <div>© 2026 SOFO AI Systems Inc. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-ink transition-colors">X / Twitter</a>
          <a href="#" className="hover:text-ink transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-ink transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
