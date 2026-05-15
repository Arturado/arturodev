"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, onScroll } from "animejs";

const ICONS = {
  frontend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18" /><path d="M9 14h6" />
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  architecture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4l8 8-8 8" /><path d="M14 20h6" />
    </svg>
  ),
  perf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" /><path d="M3 12h18" />
    </svg>
  ),
} as const;

const SERVICES = [
  { id: "fe", index: "/ 01", title: "Frontend Engineering", description: "Production React & Next.js apps con tipado estricto, motion que se gana su lugar, y un presupuesto de performance real.", tags: ["Next.js", "React", "Anime.js"], icon: "frontend" as const },
  { id: "be", index: "/ 02", title: "Backend & Data", description: "APIs REST y tRPC en Node, Nest y Postgres. Schema-first, type-safe, desplegadas en Docker / AWS.", tags: ["Nest.js", "Postgres", "Prisma"], icon: "backend" as const },
  { id: "ar", index: "/ 03", title: "Full-Stack Architecture", description: "Builds de producto desde cero — auth, billing, queues, observabilidad. El scaffolding aburrido que hace posible todo lo demás.", tags: ["Auth", "Stripe", "Queue"], icon: "architecture" as const },
  { id: "pf", index: "/ 04", title: "Performance & DX", description: "Auditorías, refactors y los fixes sin glamour — bundle sizes, Lighthouse, pipelines de build, tooling interno.", tags: ["Lighthouse", "CI/CD", "Turbo"], icon: "perf" as const },
];

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctrl = animate(gridRef.current.querySelectorAll(".service"), {
      opacity: [0, 1], translateY: [40, 0], scale: [0.96, 1],
      delay: stagger(90), duration: 900, ease: "outExpo",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      autoplay: onScroll({ target: gridRef.current, enter: "bottom-=10% top", once: true } as any),
    });
    return () => { ctrl.pause(); };
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">02 / SERVICES</div>
            <h2 className="section-title">What I <em>do</em></h2>
          </div>
          <p className="section-lede">Cuatro formas de trabajar con equipos. Usualmente una combinación de todas.</p>
        </div>

        <div className="services-grid" ref={gridRef}>
          {SERVICES.map((s) => (
            <div key={s.id} className="service" onMouseMove={onMove}>
              <div>
                <div className="service-num">{s.index}</div>
                <div className="service-icon">{ICONS[s.icon]}</div>
                <h4 className="service-title">{s.title}</h4>
                <p className="service-desc">{s.description}</p>
              </div>
              <div className="service-tags">
                {s.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
