"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { animate, stagger } from "animejs";
import Image from "next/image";
import type { HeroSlide } from "@/data/heroSlides";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  slides: HeroSlide[];
  config: SiteConfig;
};

export default function HeroSlider({ slides, config }: Props) {
  const { locale } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const SKILLS = ["Next.js", "TypeScript", "React", "Nest.js", "PostgreSQL", "Docker", "Tailwind", "Anime.js", "AWS", "Prisma", "Redis"];

  const fallback: HeroSlide = {
    id: "fallback",
    title: config?.site_name || "Arturo Vasquez",
    titleEn: config?.site_name || "Arturo Vasquez",
    subtitle: locale === "en" ? "Full-Stack Developer" : "Desarrollador Full-Stack",
    subtitleEn: "Full-Stack Developer",
    description: config?.site_description || "Six years shipping production systems for startups and studios.",
    descriptionEn: config?.site_description || "Six years shipping production systems for startups and studios.",
    ctaText: locale === "en" ? "View my work" : "Ver mi trabajo",
    ctaTextEn: "View my work",
    ctaUrl: "#projects",
    order: 0,
    isActive: true,
  };

  const displaySlides = slides.length > 0 ? slides : [fallback];
  const total = displaySlides.length;
  const slide = displaySlides[current];

  const title = (locale === "en" && slide.titleEn) ? slide.titleEn : slide.title;
  const subtitle = (locale === "en" && slide.subtitleEn) ? slide.subtitleEn : slide.subtitle;
  const description = (locale === "en" && slide.descriptionEn) ? slide.descriptionEn : slide.description;
  const ctaText = (locale === "en" && slide.ctaTextEn) ? slide.ctaTextEn : slide.ctaText;

  const animateIn = useCallback(() => {
    if (!contentRef.current) return;
    animate(contentRef.current.querySelectorAll(".slide-anim"), {
      opacity: [0, 1],
      translateX: [-24, 0],
      delay: stagger(55),
      duration: 650,
      ease: "outExpo",
    });
  }, []);

  useEffect(() => {
    animateIn();
  }, [current, animateIn]);

  useEffect(() => {
    animate(".hero-slider-image-wrap", {
      opacity: [0, 1],
      scale: [1.04, 1],
      duration: 800,
      ease: "outExpo",
    });
    animate(".hero-slider-controls", {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      ease: "outExpo",
      delay: 600,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.innerHTML = track.innerHTML + track.innerHTML;
    const distance = track.scrollWidth / 2;
    const ctrl = animate(track, {
      translateX: [0, -distance],
      duration: 28000,
      ease: "linear",
      loop: true,
    });
    return () => { ctrl.pause(); };
  }, []);

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <header
      className="hero"
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container" style={{ flex: 1, display: "flex", alignItems: "center", paddingTop: "80px" }}>
        <div className="hero-slider-layout">
          {/* Text */}
          <div className="hero-slider-text" ref={contentRef}>
            <div className="slide-anim hero-slider-label">{subtitle}</div>
            <h1 className="slide-anim hero-slider-title">{title}</h1>
            <p className="slide-anim hero-slider-desc">{description}</p>
            <a
              href={slide.ctaUrl}
              className="slide-anim hero-cta"
              style={{ display: "inline-flex" }}
            >
              <span className="label">{ctaText}</span>
              <span className="arrow">→</span>
            </a>
          </div>

          {/* Image */}
          <div className="hero-slider-image-wrap">
            <div className="hero-slider-image">
              {slide.imageUrl ? (
                <Image
                  src={slide.imageUrl}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              ) : (
                <div className="hero-slider-placeholder">
                  <span className="hero-slider-placeholder-label">{subtitle}</span>
                </div>
              )}
            </div>
            {total > 1 && (
              <div className="hero-slider-progress">
                <div
                  className="hero-slider-progress-fill"
                  style={{ width: `${((current + 1) / total) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      {total > 1 && (
        <div className="hero-slider-controls container">
          <div className="hero-slider-dots">
            {displaySlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`hero-slider-dot${i === current ? " active" : ""}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="hero-slider-arrows">
            <button onClick={prev} className="trans-prev" aria-label="Anterior">←</button>
            <button onClick={next} className="trans-next" aria-label="Siguiente">→</button>
          </div>
        </div>
      )}

      <div className="marquee">
        <div className="marquee-track" ref={trackRef}>
          {SKILLS.map((s, i) => (
            <span key={s} className={"marquee-item" + (i % 2 ? " outline" : "")}>{s}</span>
          ))}
        </div>
      </div>
    </header>
  );
}
