"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const LINKS = [
  { idx: "01", label: "About",    href: "#about" },
  { idx: "02", label: "Services", href: "#services" },
  { idx: "03", label: "Projects", href: "#projects" },
  { idx: "04", label: "Resume",   href: "#resume" },
  { idx: "05", label: "Journal",  href: "#journal" },
  { idx: "06", label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onScroll = () => ref.current?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light" | null) ?? "dark";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  const onAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
  };

  return (
    <nav ref={ref} className="nav">
      <div className="nav-mono">
        <span className="dot" />
        <span className="av">Arturo Vasquez</span>
        <span className="role">— Full-Stack Developer · MX</span>
      </div>

      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-link" onClick={(e) => onAnchor(e, l.href)}>
            <span className="idx">{l.idx}</span>{l.label}
          </a>
        ))}
      </div>

      <div className="nav-right">
        <button className="theme-toggle" aria-label="Toggle theme" aria-pressed={theme === "light"} onClick={toggleTheme} />
        <Link href="#contact" className="nav-cta" onClick={(e) => onAnchor(e, "#contact")}>
          Let&apos;s talk <span className="arrow">→</span>
        </Link>
      </div>
    </nav>
  );
}
