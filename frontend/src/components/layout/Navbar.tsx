"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Inicio", href: "#" },
  { label: "Sobre mí", href: "#about" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["about", "portfolio", "blog", "contacto"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      setActive(current ?? "");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-800/50" : "bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl tracking-tight">
            Arturo Vásquez<span className="text-violet-400">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = link.href === "#" ? active === "" : active === link.href.slice(1);
              return (
                <a key={link.href} href={link.href} className={`text-sm transition-colors duration-200 ${isActive ? "text-violet-400" : "text-gray-500 hover:text-gray-300"}`}>
                  {link.label}
                </a>
              );
            })}
          </nav>

          <a href="mailto:hola@arturodev.info" className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-gray-700 hover:border-violet-400 text-gray-400 hover:text-violet-400 text-sm rounded-full transition-all duration-300">
            Hablemos
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-6 h-px bg-gray-400 block origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-px bg-gray-400 block" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-6 h-px bg-gray-400 block origin-center" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800/50 md:hidden"
          >
            <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="text-gray-400 hover:text-violet-400 transition-colors text-lg font-medium py-2 border-b border-gray-800/50">
                  {link.label}
                </motion.a>
              ))}
              <motion.a href="mailto:hola@arturodev.info" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: links.length * 0.05 }} className="mt-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-full transition-colors text-center">
                Hablemos
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}