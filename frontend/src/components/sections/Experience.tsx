"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll } from "animejs";
import type { Experience } from "@/data/experience";

export default function ExperienceTimeline({ items }: { items: Experience[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const nodes = ref.current.querySelectorAll<HTMLElement>(".tl-node");
    const ctrls = [...nodes].map((node) =>
      animate(node, {
        opacity: [0, 1], translateY: [60, 0],
        duration: 1000, ease: "outExpo",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        autoplay: onScroll({ target: node, enter: "bottom-=10% top", once: true } as any),
      })
    );
    return () => ctrls.forEach((c) => c.pause());
  }, [items]);

  return (
    <section id="resume">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">04 / RESUME</div>
            <h2 className="section-title">A short <em>timeline</em></h2>
          </div>
          <p className="section-lede">Siete años en estudios, startups y freelance. Siempre publicando.</p>
        </div>

        <div className="timeline" ref={ref}>
          {items.map((it, i) => {
            const side = i % 2 === 0 ? "right" : "left";
            return (
              <div key={it.id} className={`tl-node ${side}`}>
                <div className="tl-meta tl-side">
                  <div className="tl-date">{it.period}</div>
                  <div className="tl-place">{it.company}{it.location ? ` · ${it.location}` : ""}</div>
                </div>
                <div className="tl-card tl-side">
                  <h4 className="tl-title">{it.role}</h4>
                  <p className="tl-desc">{it.description}</p>
                  <div className="tl-tags">
                    {it.techs.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
