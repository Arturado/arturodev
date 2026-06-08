"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const { locale, t } = useLanguage();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const name = (locale === "en" && (project as any).nameEn) ? (project as any).nameEn : project.name;
  const description = (locale === "en" && (project as any).descriptionEn) ? (project as any).descriptionEn : project.description;

  useEffect(() => {
    animate(overlayRef.current!, { opacity: [0, 1], duration: 250, ease: "outQuad" });
    animate(panelRef.current!, {
      opacity: [0, 1],
      translateY: [32, 0],
      scale: [0.96, 1],
      duration: 450,
      ease: "outExpo",
    });

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const close = () => {
    animate(overlayRef.current!, { opacity: [1, 0], duration: 200, ease: "outQuad" });
    animate(panelRef.current!, {
      opacity: [1, 0],
      translateY: [0, 24],
      duration: 250,
      ease: "outQuad",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={close}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        style={{ opacity: 0 }}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--line-strong)] bg-[var(--bg-elev)] shadow-2xl"
      >
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-[var(--bg-elev-2)]">
          {project.image ? (
            <Image src={project.image} alt={name} fill style={{ objectFit: "cover" }} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-xs tracking-widest text-[var(--fg-faint)]">{name}</span>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-[var(--font-display)] font-bold text-2xl tracking-tight text-[var(--fg)] leading-tight">
                {name}
              </h2>
              <span className="font-mono text-xs text-[var(--fg-faint)] tracking-widest uppercase">
                {project.year}
              </span>
            </div>
            <button
              onClick={close}
              className="shrink-0 w-9 h-9 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--fg-mute)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors text-lg"
              aria-label={t("modal.close")}
            >
              ×
            </button>
          </div>

          {/* Description */}
          <p className="text-[var(--fg-mute)] text-sm leading-relaxed">{description}</p>

          {/* Stack */}
          {project.techs.length > 0 && (
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--fg-faint)] mb-2">
                {t("modal.stack")}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techs.map(t => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border border-[var(--line-strong)] rounded text-[var(--fg-mute)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--line)]">
            <Link
              href={`/portfolio/${project.slug}`}
              className="flex-1 text-center px-4 py-2.5 rounded-full bg-[var(--fg)] text-[var(--bg)] text-sm font-medium hover:opacity-90 transition-opacity"
              onClick={close}
            >
              {t("modal.viewFull")} →
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-full border border-[var(--line-strong)] text-[var(--fg-mute)] hover:text-[var(--fg)] hover:border-[var(--fg)] text-sm transition-colors"
              >
                {t("modal.live")} ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-full border border-[var(--line-strong)] text-[var(--fg-mute)] hover:text-[var(--fg)] hover:border-[var(--fg)] text-sm transition-colors"
              >
                {t("modal.repo")} ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
