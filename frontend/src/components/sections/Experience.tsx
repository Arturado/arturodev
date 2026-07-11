"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Experience as ExperienceItem } from "@/data/experience";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick } from "@/utils/i18n";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function Experience({
  items,
  config,
}: {
  items: ExperienceItem[];
  config?: SiteConfig;
}) {
  const { t, locale } = useLanguage();
  const work = items.filter((item) => item.published);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  if (config?.show_experience === "false") return null;

  return (
    <section id="experiencia">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="section-num">{t("experience.pre")}</div>
            <h2 className="section-title">
              {t("experience.title")} <em>{t("experience.title.em")}</em>
            </h2>
          </div>
        </motion.div>

        {work.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--fg-faint)",
            }}
          >
            {t("experience.empty")}
          </p>
        ) : (
          <div className="timeline">
            {work.map((item) => {
              const role = pick(item.role, item.roleEn, locale);
              const company = pick(item.company, item.companyEn, locale);
              const location = pick(item.location, item.locationEn, locale);
              const description = pick(item.description, item.descriptionEn, locale);
              return (
                <motion.div
                  key={item.id}
                  className="tl-node"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <div className="tl-meta-row">
                    {item.period} · {location}
                  </div>
                  <h3 className="tl-title">{company}</h3>
                  <div className="tl-role">{role}</div>
                  <motion.p
                    layout
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`tl-desc ${expanded[item.id] ? "" : "line-clamp-2"}`}
                    style={{ overflow: "hidden" }}
                  >
                    {description}
                  </motion.p>
                  {description.length > 120 && (
                    <button
                      onClick={() => toggle(item.id)}
                      className="mt-1 inline-block"
                      style={{
                        color: "var(--primary-color)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {expanded[item.id] ? "Leer menos ↑" : "Leer más →"}
                    </button>
                  )}
                  {item.techs.length > 0 && (
                    <div className="tl-tags">
                      {item.techs.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
