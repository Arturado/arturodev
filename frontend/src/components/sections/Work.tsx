"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick } from "@/utils/i18n";

const EASE = [0.2, 0.8, 0.2, 1] as const;

function ProjectCard({ project }: { project: Project }) {
  const { t, locale } = useLanguage();
  const name = pick(project.name, project.nameEn, locale);
  const description = pick(project.description, project.descriptionEn, locale);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border transition-colors duration-300"
      style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
    >
      <Link href={`/portfolio/${project.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: "var(--bg-elev-2)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--fg-faint)",
                letterSpacing: "0.1em",
              }}
            >
              [ {name} ]
            </div>
          )}

          {/* Overlay al hover */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
          >
            <span
              className="rounded-full border px-5 py-2.5 text-white"
              style={{
                borderColor: "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
              }}
            >
              {t("work.view")} →
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div
            className="flex justify-between"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
            }}
          >
            <span>{project.year}</span>
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {name}
          </h3>
          <p className="text-sm" style={{ color: "var(--fg-mute)" }}>
            {description}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="rounded border px-2 py-1"
                style={{
                  borderColor: "var(--line)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--fg-mute)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Work({
  projects,
  config,
}: {
  projects: Project[];
  config?: SiteConfig;
}) {
  const { t } = useLanguage();

  if (config?.show_portfolio === "false") return null;

  return (
    <section id="work">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="section-num">{t("work.pre")}</div>
            <h2 className="section-title">
              {t("work.title")} <em>{t("work.title.em")}</em>
            </h2>
          </div>
          <p className="section-lede">{t("work.lede")}</p>
        </motion.div>

        {projects.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--fg-faint)",
            }}
          >
            {t("work.empty")}
          </p>
        ) : (
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
