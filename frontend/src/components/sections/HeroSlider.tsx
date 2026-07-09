"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { HeroSlide } from "@/data/heroSlides";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";

const EASE = [0.2, 0.8, 0.2, 1] as const;
const AUTOPLAY_MS = 7000;

export default function HeroSlider({
  slides,
  config,
}: {
  slides: HeroSlide[];
  config: SiteConfig;
}) {
  const { t, locale } = useLanguage();
  const active = slides.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (active.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % active.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active.length]);

  const slide = active[index] ?? null;

  const eyebrow = slide
    ? locale === "en" ? slide.subtitleEn || slide.subtitle : slide.subtitle
    : config.site_title || t("hero.available");
  const title = slide
    ? locale === "en" ? slide.titleEn || slide.title : slide.title
    : config.site_name || t("hero.title.1");
  const description = slide
    ? locale === "en" ? slide.descriptionEn || slide.description : slide.description
    : config.site_description || t("hero.subtitle");
  const ctaText = slide
    ? locale === "en" ? slide.ctaTextEn || slide.ctaText : slide.ctaText
    : t("hero.cta.work");
  const ctaUrl = slide ? slide.ctaUrl : "#work";

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[12%] h-[55vmin] w-[55vmin] rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, var(--primary-glow), transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {slide?.imageUrl && (
        <div className="absolute inset-0 -z-10 opacity-20">
          <Image src={slide.imageUrl} alt="" fill sizes="100vw" priority className="object-cover" />
        </div>
      )}

      <div className="container relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide?.id ?? "static"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p
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
                style={{ background: "var(--primary-color)", boxShadow: "0 0 12px var(--primary-glow)" }}
              />
              {eyebrow}
            </p>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(52px, 9vw, 130px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              {title}
            </h1>

            <p className="mt-8 max-w-xl text-lg md:text-xl" style={{ color: "var(--fg-mute)" }}>
              {description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={ctaUrl}
                className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium transition-transform duration-300 hover:translate-x-1"
                style={{ background: "var(--fg)", color: "var(--bg)" }}
              >
                {ctaText} <span aria-hidden>{slide ? "→" : "↓"}</span>
              </a>
              {!slide && (
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
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {active.length > 1 && (
          <div className="mt-16 flex items-center gap-3">
            {active.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 28 : 8,
                  background: i === index ? "var(--primary-color)" : "var(--line-strong)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
