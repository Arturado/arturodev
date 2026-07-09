"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";

const EASE = [0.2, 0.8, 0.2, 1] as const;

type Tech = { name: string; glyph: string };

const groups: { key: "stack.cat.frontend" | "stack.cat.backend" | "stack.cat.cms" | "stack.cat.devops" | "stack.cat.other"; techs: Tech[] }[] = [
  {
    key: "stack.cat.frontend",
    techs: [
      { name: "React", glyph: "⚛" },
      { name: "TypeScript", glyph: "TS" },
      { name: "JavaScript", glyph: "JS" },
      { name: "HTML5", glyph: "<>" },
      { name: "CSS3", glyph: "{}" },
      { name: "Tailwind CSS", glyph: "~" },
    ],
  },
  {
    key: "stack.cat.backend",
    techs: [
      { name: "PHP", glyph: "php" },
      { name: "Node.js", glyph: "⬢" },
      { name: "NestJS", glyph: "N" },
      { name: "GraphQL", glyph: "◈" },
      { name: "Python", glyph: "Py" },
    ],
  },
  {
    key: "stack.cat.cms",
    techs: [
      { name: "WordPress", glyph: "W" },
      { name: "WooCommerce", glyph: "Wo" },
      { name: "Magento", glyph: "M" },
      { name: "Shopify", glyph: "S" },
    ],
  },
  {
    key: "stack.cat.devops",
    techs: [
      { name: "Docker", glyph: "🐳" },
      { name: "Git", glyph: "⎇" },
      { name: "GitHub", glyph: "gh" },
      { name: "Cloudflare", glyph: "☁" },
      { name: "AWS", glyph: "aws" },
      { name: "GCP", glyph: "gcp" },
    ],
  },
  {
    key: "stack.cat.other",
    techs: [
      { name: "n8n", glyph: "n8n" },
      { name: "OpenAI APIs", glyph: "✳" },
      { name: "REST APIs", glyph: "://" },
    ],
  },
];

export default function Stack() {
  const { t } = useLanguage();

  return (
    <section id="stack">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="section-num">{t("stack.pre")}</div>
            <h2 className="section-title">
              {t("stack.title")} <em>{t("stack.title.em")}</em>
            </h2>
          </div>
          <p className="section-lede">{t("stack.lede")}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: EASE,
                    delay: (groupIndex % 3) * 0.1,
                    staggerChildren: 0.05,
                    delayChildren: 0.15,
                  },
                },
              }}
              className="flex flex-col gap-5 rounded-[var(--radius-card)] border p-7"
              style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
            >
              <div className="flex items-baseline justify-between">
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 19,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t(group.key)}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--fg-faint)",
                  }}
                >
                  0{groupIndex + 1}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.techs.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, ease: EASE },
                      },
                    }}
                    className="group flex items-center gap-2.5 rounded-full border py-2 pl-2.5 pr-4 transition-colors duration-300"
                    style={{ borderColor: "var(--line)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--primary-color)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--line)";
                    }}
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full"
                      style={{
                        background: "var(--bg-elev-2)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--primary-color)",
                      }}
                    >
                      {tech.glyph}
                    </span>
                    <span className="text-sm" style={{ color: "var(--fg-mute)" }}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
