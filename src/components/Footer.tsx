export default function Footer() {
  const productLinks = [
    { label: "Agents", href: "#agents" },
    { label: "Workflows", href: "#workflows" },
    { label: "Staging", href: "#output" },
    { label: "Security", href: "#cta" },
  ];
  const companyLinks = [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "mailto:hello@sofoai.com" },
  ];
  const legalLinks = [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Security", href: "#" },
    { label: "Cookies", href: "#" },
  ];
  const columns = [
    { title: "Product", links: productLinks },
    { title: "Company", links: companyLinks },
    { title: "Legal", links: legalLinks },
  ];

  return (
    <footer className="py-12 sm:py-20 px-4 sm:px-6 bg-white border-t border-border/80">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-16">
        <div className="col-span-2 sm:col-span-2 md:col-span-1 space-y-6">
          <a href="#" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center text-white font-display font-black shadow-soft shadow-ink/20">S</div>
            <span className="text-xl font-display font-bold tracking-tight text-ink">SOFO AI</span>
          </a>
          <p className="text-ink-soft text-sm max-w-[200px] leading-relaxed font-medium">
            The Agentic Operating System for modern real estate professionals.
          </p>
        </div>

        {columns.map((col, idx) => (
          <div key={idx} className="space-y-5 sm:space-y-6">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-ink">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-ink-soft hover:text-ink transition-colors text-sm font-medium">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto pt-10 sm:pt-12 mt-10 sm:mt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-ink-soft text-[11px] font-bold uppercase tracking-widest">
        <div className="text-center md:text-left">© {new Date().getFullYear()} SOFO AI Systems Inc. All rights reserved.</div>
        <div className="flex gap-6 sm:gap-8">
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">X / Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
