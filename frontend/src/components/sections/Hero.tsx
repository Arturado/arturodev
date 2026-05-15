"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import type { SiteConfig } from "@/data/config";

const SKILLS = ["Next.js", "TypeScript", "React", "Nest.js", "PostgreSQL", "Docker", "Tailwind", "Anime.js", "AWS", "tRPC", "Prisma", "Redis"];

export default function Hero({ config }: { config: SiteConfig }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const rawName = config?.site_name || "Arturo Vasquez";
  const parts = rawName.toUpperCase().trim().split(/\s+/);
  const FIRST = parts[0];
  const LAST  = parts.slice(1).join(" ") || parts[0];

  const available = config?.site_available || "Available · Q3 2026";
  const location  = config?.site_location  || "MX · GMT-6";
  const desc      = config?.site_description || "Six years shipping production systems for startups and studios. Next.js, TypeScript, Node, Postgres — from architecture to pixel.";

  useEffect(() => {
    animate(".hero-letter", {
      opacity: [0, 1],
      translateY: [60, 0],
      rotate: [{ from: -8 }, 0],
      skewY: [{ from: 6 }, 0],
      delay: stagger(35, { start: 250 }),
      duration: 1100,
      ease: "outExpo",
    });
    animate(".hero-meta, .hero-sub > *, .marquee", {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(90, { start: 900 }),
      duration: 900,
      ease: "outExpo",
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.innerHTML = track.innerHTML + track.innerHTML;
    const distance = track.scrollWidth / 2;
    const ctrl = animate(track, {
      translateX: [0, -distance],
      duration: 28000,
      ease: "linear",
      loop: true,
    });
    return () => { ctrl.pause(); };
  }, []);

  const splitLine = (text: string, outline = false) =>
    [...text].map((ch, i) => (
      <span key={i} className={"hero-letter" + (ch === " " ? " spacer" : "")}>
        {outline ? <em>{ch === " " ? " " : ch}</em> : ch === " " ? " " : ch}
      </span>
    ));

  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-meta">
          <span><span className="live" />{available}</span>
          <span>{location}</span>
          <span>v.2026.05</span>
        </div>

        <h1 className="hero-name" aria-label={`${rawName} — Full-Stack Developer`}>
          <span className="line">{splitLine(FIRST)}</span>
          <span className="line outline">{splitLine(LAST, true)}</span>
        </h1>

        <div className="hero-sub">
          <a className="hero-cta" href="#projects">
            <span className="label">View my work</span>
            <span className="arrow">→</span>
          </a>
          <div className="hero-role">
            Full-Stack <span className="accent">Developer</span><br />
            building considered web products.
          </div>
          <p className="hero-desc">{desc}</p>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-track" ref={trackRef}>
          {SKILLS.map((s, i) => (
            <span key={s} className={"marquee-item" + (i % 2 ? " outline" : "")}>{s}</span>
          ))}
        </div>
      </div>
    </header>
  );
}
