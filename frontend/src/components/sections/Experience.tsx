"use client";

import { motion } from "motion/react";
import type { Experience as ExperienceItem } from "@/data/experience";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function Experience({
  items,
  config,
}: {
  items: ExperienceItem[];
  config?: SiteConfig;
}) {
  const { t } = useLanguage();
  const work = items.filter((item) => item.published);

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
            {work.map((item, i) => {
              const side = i % 2 === 0 ? "right" : "left";
              return (
                <motion.div
                  key={item.id}
                  className={`tl-node ${side}`}
                  initial={{ opacity: 0, x: side === "right" ? 48 : -48 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <div className="tl-side tl-meta">
                    <div className="tl-date">{item.period}</div>
                    <div className="tl-place">{item.location}</div>
                  </div>
                  <div className="tl-side tl-card">
                    <h3 className="tl-title">{item.company}</h3>
                    <div className="tl-role">{item.role}</div>
                    <p className="tl-desc">{item.description}</p>
                    {item.techs.length > 0 && (
                      <div className="tl-tags">
                        {item.techs.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
