"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { AboutData } from "@/data/about";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick } from "@/utils/i18n";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function AboutSection({ about }: { about: AboutData | null }) {
  const { t, locale } = useLanguage();

  const bio = about ? pick(about.bio, about.bioEn, locale) : "";
  if (!about || !bio.trim()) return null;

  const paragraphs = bio.split("\n\n").filter((p) => p.trim() !== "");

  return (
    <section id="about">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {about.photoUrl ? (
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4", borderRadius: "var(--radius-card)", border: "1px solid var(--line)" }}
              >
                <Image
                  src={about.photoUrl}
                  alt="Arturo Vasquez"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div
                className="relative flex items-center justify-center"
                style={{
                  aspectRatio: "3/4",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--line)",
                  background: "var(--bg-elev)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 64,
                    color: "var(--fg-faint)",
                  }}
                >
                  AV
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.12em",
                color: "var(--fg-faint)",
              }}
            >
              {t("about.pre")}
            </p>

            <div style={{ color: "var(--fg-mute)", fontSize: 16, lineHeight: 1.75, maxWidth: "60ch" }}>
              {paragraphs.map((p, i) => (
                <p key={i} className={i > 0 ? "mt-4" : ""}>
                  {p}
                </p>
              ))}
            </div>

            {about.available && (
              <div
                className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: "rgba(74, 222, 128, 0.1)",
                  border: "1px solid rgba(74, 222, 128, 0.3)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: "#4ade80" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#4ade80" }} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: "#4ade80",
                  }}
                >
                  {t("contact.available")}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
