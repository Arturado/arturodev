"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, onScroll } from "animejs";

interface Slide {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  tags: string[];
}

const SLIDES: Slide[] = [
  {
    id: "build",
    index: "01",
    label: "// CURRENTLY BUILDING",
    title: "Helia — a treasury OS for indie venture funds.",
    body: "Multi-entity ledger, automated cap-table reconciliation, and a real-time runway model — all on Next.js 16 with an Edge-runtime API.",
    tags: ["Next.js 16", "Postgres", "tRPC", "Edge"],
  },
  {
    id: "read",
    index: "02",
    label: "// CURRENTLY READING",
    title: "Designing Data-Intensive Applications — Martin Kleppmann.",
    body: "Re-reading chapter 5 (replication) with a fresh set of war stories. Notes go straight into the journal each Sunday.",
    tags: ["Book", "Distributed Systems", "2nd read"],
  },
  {
    id: "explore",
    index: "03",
    label: "// CURRENTLY EXPLORING",
    title: "Server Components & the case for radical co-location.",
    body: "Pushing data fetching and mutations as close to the JSX as possible. Less indirection, fewer hooks, faster pages.",
    tags: ["RSC", "Next.js 16", "Patterns"],
  },
  {
    id: "listen",
    index: "04",
    label: "// ON THE DECK",
    title: "Jon Hopkins · Music for Psychedelic Therapy — on repeat.",
    body: "The album that fills the back half of every long coding session this month. Slow, considered, exactly the right tempo.",
    tags: ["Album", "Ambient", "2021"],
  },
];

const AUTOPLAY_MS = 6500;
const GLYPHS = "▓▒░01#%/@&*<>+=~|".split("");

export function Transmission() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef(-1);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressAnim = useRef<ReturnType<typeof animate> | null>(null);

  const scramble = (el: HTMLElement, text: string, duration = 1300) => {
    const len = text.length;
    const state = { p: 0 };
    animate(state, {
      p: 1,
      duration,
      ease: "outExpo",
      onUpdate: () => {
        const reveal = state.p * len;
        let out = "";
        for (let i = 0; i < len; i++) {
          if (text[i] === " ") { out += " "; continue; }
          if (i < reveal - 1.5) out += text[i];
          else if (i < reveal + 3) out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
          else out += " ";
        }
        el.textContent = out;
      },
      onComplete: () => { el.textContent = text; },
    });
  };

  const go = (idx: number) => {
    const stage = stageRef.current!;
    const total = SLIDES.length;
    const next = ((idx % total) + total) % total;
    if (next === currentRef.current) return;
    currentRef.current = next;

    stage.parentElement?.classList.remove("sweep");
    void stage.offsetWidth;
    stage.parentElement?.classList.add("sweep");

    const slideEls = stage.querySelectorAll<HTMLElement>(".trans-slide");
    const dots = stage.parentElement!.querySelectorAll<HTMLElement>(".trans-dots button");
    slideEls.forEach((el, i) => el.classList.toggle("active", i === next));
    dots.forEach((el, i) => el.classList.toggle("active", i === next));
    if (counterRef.current) counterRef.current.textContent = String(next + 1).padStart(2, "0");

    const active = slideEls[next];
    animate(active.querySelector(".trans-label")!, {
      opacity: [0, 1], translateY: [16, 0], duration: 600, ease: "outExpo",
    });
    animate(active.querySelectorAll(".trans-body, .trans-tags"), {
      opacity: [0, 1], translateY: [20, 0],
      delay: stagger(80, { start: 200 }), duration: 700, ease: "outExpo",
    });

    const titleEl = active.querySelector<HTMLElement>(".trans-title")!;
    scramble(titleEl, titleEl.dataset.text || titleEl.textContent || "", 1300);

    progressAnim.current?.pause();
    if (progressRef.current) progressRef.current.style.width = "0%";
    progressAnim.current = animate(progressRef.current!, {
      width: ["0%", "100%"], duration: AUTOPLAY_MS, ease: "linear",
    });

    if (autoRef.current) clearTimeout(autoRef.current);
    autoRef.current = setTimeout(() => go(currentRef.current + 1), AUTOPLAY_MS);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const start = animate({ tick: 0 }, {
      tick: 1, duration: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      autoplay: onScroll({ target: root, enter: "bottom-=15% top", once: true } as any),
      onComplete: () => go(0),
    });

    const onEnter = () => {
      if (autoRef.current) clearTimeout(autoRef.current);
      progressAnim.current?.pause();
    };
    const onLeave = () => {
      progressAnim.current?.play();
      autoRef.current = setTimeout(() => go(currentRef.current + 1), 2500);
    };
    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      start.pause();
      progressAnim.current?.pause();
      if (autoRef.current) clearTimeout(autoRef.current);
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dotLabel = (s: Slide) =>
    s.label.replace(/^\/\/\s*CURRENTLY\s+/i, "").replace(/^\/\/\s*ON THE DECK/i, "Listening");

  return (
    <section ref={rootRef} className="transmission" id="transmission">
      <div className="container">
        <div className="trans-head">
          <div>
            <span className="ch">→</span>&nbsp; TRANSMISSION&nbsp;
            <span ref={counterRef}>01</span>&nbsp;/&nbsp;{String(SLIDES.length).padStart(2, "0")}
          </div>
          <div className="trans-meta">
            <span><span className="live" />LIVE FEED</span>
            <span>15.05.2026 · GMT-6</span>
            <span>SIG · [███████░]</span>
          </div>
        </div>

        <div className="trans-stage" ref={stageRef}>
          {SLIDES.map((s, i) => (
            <div key={s.id} className={"trans-slide" + (i === 0 ? " active" : "")} data-slide={i}>
              <div className="trans-label"><span className="ix">{s.index}</span>{s.label}</div>
              <h2 className="trans-title" data-text={s.title}>{s.title}</h2>
              <p className="trans-body">{s.body}</p>
              <div className="trans-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>

        <div className="trans-controls">
          <div>
            <div className="trans-progress"><div className="trans-progress-fill" ref={progressRef} /></div>
            <div className="trans-dots">
              {SLIDES.map((s, i) => (
                <button key={s.id} className={i === 0 ? "active" : ""} onClick={() => go(i)}>
                  <span className="ix">{s.index}</span>{dotLabel(s)}
                </button>
              ))}
            </div>
          </div>
          <div className="trans-nav">
            <button className="trans-prev" aria-label="Previous" onClick={() => go(currentRef.current - 1)}>←</button>
            <button className="trans-next" aria-label="Next" onClick={() => go(currentRef.current + 1)}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
