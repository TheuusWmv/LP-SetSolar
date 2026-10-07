import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { templateData } from "../data/templateData";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show sticky floating nav when user scrolls past the hero section
      setIsScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { company } = templateData;
  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    company.whatsappDefaultMessage
  )}`;

  const navLinks = [
    { label: "Sobre Nós", href: "#about" },
    { label: "Como Funciona", href: "#how-it-works" },
    { label: "Soluções", href: "#services" },
    { label: "Feedbacks", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  // If not scrolled, the integrated hero notch handles navigation
  if (!isScrolled) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 lg:px-8 py-3 animate-in fade-in slide-in-from-top-4">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center justify-between px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_16px_36px_rgba(0,0,0,0.12)] text-neutral-900">
          {/* Brand Logo (Horizontal) */}
          <a
            href="#"
            className="flex items-center group transition-transform active:scale-95 shrink-0"
            aria-label="World Place Solar - Início"
          >
            <img src="/logo-worldplace.svg" alt="World Place Solar" className="h-8 sm:h-9 w-auto object-contain" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 rounded-full px-3 py-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-neutral-950 rounded-full hover:bg-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Right Action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={company.simulatorUrl || whatsappUrl}
              target={company.simulatorUrl ? undefined : "_blank"}
              rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-[var(--brand-accent-text)] font-bold text-xs tracking-tight transition-all shadow-md active:scale-95"
            >
              <span>Simular</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-slate-700 hover:text-neutral-950 hover:bg-slate-100"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-5xl mx-auto px-1">
          <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-5 shadow-2xl space-y-3 text-neutral-900">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-neutral-950 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a
                href={company.simulatorUrl || whatsappUrl}
                target={company.simulatorUrl ? undefined : "_blank"}
                rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[var(--brand-accent)] text-[var(--brand-accent-text)] font-bold text-xs shadow-lg"
              >
                <span>Fazer Simulação Gratuita</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
