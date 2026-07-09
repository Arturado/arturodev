"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";

const EASE = [0.2, 0.8, 0.2, 1] as const;

const techs = [
  "React",
  "TypeScript",
  "NestJS",
  "WordPress",
  "Magento",
  "Node.js",
  "Docker",
  "n8n",
];

function StaggeredLine({ text, outline = false }: { text: string; outline?: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.22em] inline-block last:mr-0"
          style={
            outline
              ? { WebkitTextStroke: "1.5px var(--fg)", color: "transparent" }
              : undefined
          }
          variants={{
            hidden: { y: "110%", opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.7, ease: EASE },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28">
      {/* Forma orgánica de fondo */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[12%] h-[55vmin] w-[55vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, var(--primary-glow), transparent 65%)",
          filter: "blur(60px)",
        }}
        animate={{ y: [0, -30, 0], x: [0, 12, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
          }}
          className="grid items-end gap-12 lg:grid-cols-12"
        >
          {/* Columna principal — desplazada, no centrada */}
          <div className="lg:col-span-8">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="mb-8 flex items-center gap-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg-mute)",
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  background: "var(--primary-color)",
                  boxShadow: "0 0 12px var(--primary-glow)",
                }}
              />
              {t("hero.available")}
            </motion.p>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(52px, 9vw, 130px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              <StaggeredLine text={t("hero.title.1")} />
              <StaggeredLine text={t("hero.title.2")} outline />
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="mt-8 max-w-xl text-lg md:text-xl"
              style={{ color: "var(--fg-mute)" }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="mt-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: "0.06em",
                color: "var(--fg-faint)",
              }}
            >
              {t("hero.tagline")}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium transition-transform duration-300 hover:translate-x-1"
                style={{ background: "var(--fg)", color: "var(--bg)" }}
              >
                {t("hero.cta.work")} <span aria-hidden>↓</span>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-3 rounded-full border px-7 py-4 text-sm font-medium transition-colors duration-300"
                style={{ borderColor: "var(--line-strong)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary-color)";
                  e.currentTarget.style.color = "var(--primary-color)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-strong)";
                  e.currentTarget.style.color = "";
                }}
              >
                {t("hero.cta.contact")} <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>

          {/* Columna secundaria — grid de tecnologías */}
          <div className="lg:col-span-4">
            <motion.div
              variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.9 } },
              }}
              className="grid grid-cols-2 gap-2"
            >
              {techs.map((tech) => (
                <motion.div
                  key={tech}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: EASE },
                    },
                  }}
                  className="rounded-xl border px-4 py-3"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--bg-elev)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.05em",
                    color: "var(--fg-mute)",
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
