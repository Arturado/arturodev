"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll } from "animejs";
import type { SiteConfig } from "@/data/config";

const COUNTERS = [
  { target: 7,  suffix: "y", label: "Years building\nfor production" },
  { target: 42, suffix: "+", label: "Projects shipped\nsince 2019" },
  { target: 28, suffix: "",  label: "Tools, languages,\nframeworks in rotation" },
];

export default function About({ config }: { config: SiteConfig }) {
  const portraitRef     = useRef<HTMLDivElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const countersRef     = useRef<HTMLDivElement>(null);

  const bio = config?.site_description ||
    "Basado en Ciudad de México, trabajando de forma remota con equipos en América y Europa. Mi foco está en la unión entre diseño e ingeniería: interfaces orientadas a datos, animaciones consideradas y arquitectura que no será un arrepentimiento en dos años.";

  useEffect(() => {
    if (!portraitRef.current || !portraitWrapRef.current) return;
    const ctrl = animate(portraitRef.current, {
      translateY: ["-8%", "8%"],
      ease: "linear",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      autoplay: onScroll({ target: portraitWrapRef.current, enter: "bottom top", leave: "top bottom", sync: true } as any),
    });
    return () => { ctrl.pause(); };
  }, []);

  useEffect(() => {
    const els = countersRef.current?.querySelectorAll<HTMLElement>(".counter .num");
    if (!els) return;
    const ctrls = [...els].map((el) => {
      const target = +(el.dataset.target ?? "0");
      const val = el.querySelector(".val")!;
      const state = { v: 0 };
      return animate(state, {
        v: target, duration: 1800, ease: "outExpo",
        onUpdate: () => { val.textContent = String(Math.round(state.v)); },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        autoplay: onScroll({ target: el, enter: "bottom-=20% top", once: true } as any),
      });
    });
    return () => ctrls.forEach((c) => c.pause());
  }, []);

  return (
    <section id="about">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">01 / INTRO</div>
            <h2 className="section-title">About <em>me</em></h2>
          </div>
          <p className="section-lede">Una lectura corta sobre cómo trabajo, qué construyo y en qué estoy obsesionado ahora.</p>
        </div>

        <div className="about-grid">
          <div className="portrait-wrap" ref={portraitWrapRef}>
            <div className="portrait-img" ref={portraitRef} />
            <div className="portrait-tag">arturo.v · 2026</div>
          </div>

          <div className="about-body">
            <div className="about-pre">— A bit about me</div>
            <h3 className="about-headline">
              I design and build <em>end-to-end</em> products with a strong sense for type, motion, and DX.
            </h3>
            <p className="about-text">{bio}</p>
            <p className="about-text">
              La mayoría de las semanas me encontrarás en un stack Next.js + Postgres, dibujando primitivas de UI en Figma, o escribiendo sobre el oficio de publicar software.
            </p>

            <div className="counters" ref={countersRef}>
              {COUNTERS.map((c) => (
                <div className="counter" key={c.label}>
                  <div className="num" data-target={c.target}>
                    <span className="val">0</span>
                    {c.suffix && <span className="suffix">{c.suffix}</span>}
                  </div>
                  <div className="label" style={{ whiteSpace: "pre-line" }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
