"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger, onScroll } from "animejs";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

export default function Portfolio({ projects }: { projects: Project[] }) {
  const { t, locale } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

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
            <div className="section-num">{t("projects.pre")}</div>
            <h2 className="section-title">{t("projects.title")} <em>{t("projects.title.em")}</em></h2>
          </div>
          <p className="section-lede">{t("projects.lede")}</p>
        </div>

        <div className="projects-grid" ref={gridRef}>
          {projects.map((p) => {
            const name = (locale === "en" && (p as any).nameEn) ? (p as any).nameEn : p.name;
            const isHov = hovered === p.id;
            return (
              <article key={p.id} className="project">
                <div className="project-cover" data-mock={name}>
                  {p.image ? (
                    <Image src={p.image} alt={name} fill style={{ objectFit: "cover" }} loading="lazy" />
                  ) : null}
                  <div className="project-overlay">
                    <button
                      onClick={() => setSelected(p)}
                      className="preview-btn"
                      style={{
                        padding: "10px 18px",
                        border: "1px solid var(--line-strong)",
                        borderRadius: "999px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        letterSpacing: "0.06em",
                        background: isHov ? "var(--primary-color)" : "rgba(255,255,255,0.04)",
                        color: isHov ? "var(--bg)" : "var(--fg)",
                        cursor: "pointer",
                        transition: "background 0.2s, color 0.2s",
                      }}
                      onMouseEnter={() => setHovered(p.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {t("projects.preview")}
                    </button>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer">{t("projects.live")} ↗</a>
                    )}
                    {p.repoUrl && (
                      <a href={p.repoUrl} target="_blank" rel="noreferrer">{t("projects.github")} ↗</a>
                    )}
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-meta">
                    <span>{p.year}</span>
                    <span>Full-Stack</span>
                  </div>
                  <h3 className="project-title">{name}</h3>
                  <div className="project-tags">
                    {p.techs.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
