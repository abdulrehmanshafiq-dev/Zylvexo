"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06070D]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 h-[72px] flex items-center justify-between relative">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center font-display font-bold text-white text-sm shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
            Z
          </div>
          <span className="font-display font-bold text-[#F2F1F8] tracking-[0.18em] text-sm">
            ZYLVEXO
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-[#9CA0B3] hover:text-[#F2F1F8] rounded-full hover:bg-white/[0.04] transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-violet-500/30 hover:scale-[1.03] transition-all"
          >
            Book a Call
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F2F1F8]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#06070D]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-base text-[#9CA0B3] hover:text-[#F2F1F8] border-b border-white/[0.04] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] px-5 py-3 rounded-full"
              >
                Book a Call
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
