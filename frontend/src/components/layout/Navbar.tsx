"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";

const links = [
  { key: "nav.work", href: "/#work" },
  { key: "nav.stack", href: "/#stack" },
  { key: "nav.experience", href: "/#experiencia" },
  { key: "nav.journal", href: "/#blog" },
  { key: "nav.resume", href: "/curriculum" },
  { key: "nav.contact", href: "/#contacto" },
] as const;

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => setLocale(locale === "es" ? "en" : "es");

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Link href="/" className="nav-mono" onClick={() => setMenuOpen(false)}>
          <span className="dot" />
          <span className="av">Arturo Vasquez</span>
          <span className="role">/ full-stack dev</span>
        </Link>

        <nav className="nav-links">
          {links.map((link, i) => (
            <Link key={link.key} href={link.href} className="nav-link">
              <span className="idx">0{i + 1}</span>
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <button
            className="lang-toggle"
            onClick={toggleLocale}
            aria-label="Cambiar idioma"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <Link href="/#contacto" className="nav-cta">
            {t("nav.cta")} <span className="arrow">→</span>
          </Link>
          <button
            className="flex min-[860px]:hidden flex-col justify-center gap-[5px] w-9 h-9"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block h-px w-6 bg-[var(--fg)]"
              animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-px w-6 bg-[var(--fg)]"
              animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] min-[860px]:hidden"
            style={{ background: "var(--bg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.nav
              className="flex h-full flex-col justify-center gap-2 px-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                closed: {},
              }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.key}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 24 },
                  }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(32px, 8vw, 48px)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "var(--primary-color)",
                      }}
                    >
                      0{i + 1}
                    </span>
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
