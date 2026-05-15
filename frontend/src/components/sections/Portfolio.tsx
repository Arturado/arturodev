"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, onScroll } from "animejs";
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function Portfolio({ projects }: { projects: Project[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctrl = animate(gridRef.current.querySelectorAll(".project"), {
      opacity: [0, 1], scale: [0.92, 1], translateY: [30, 0],
      delay: stagger(80), duration: 800, ease: "outBack",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      autoplay: onScroll({ target: gridRef.current, enter: "bottom-=10% top", once: true } as any),
    });
    return () => { ctrl.pause(); };
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">03 / SELECTED WORK</div>
            <h2 className="section-title">Selected <em>projects</em></h2>
          </div>
          <p className="section-lede">Una selección de lo que he publicado. Catálogo completo disponible a pedido.</p>
        </div>

        <div className="projects-grid" ref={gridRef}>
          {projects.map((p) => (
            <article key={p.id} className="project">
              <div className="project-cover" data-mock={p.name}>
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }} loading="lazy" />
                ) : null}
                <div className="project-overlay">
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}
                  {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
                </div>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span>{p.year}</span>
                  <span>Full-Stack</span>
                </div>
                <h3 className="project-title">{p.name}</h3>
                <div className="project-tags">
                  {p.techs.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
