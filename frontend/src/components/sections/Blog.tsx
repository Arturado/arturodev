"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, onScroll } from "animejs";
import Link from "next/link";
import type { Post } from "@/data/posts";

export default function Journal({ posts }: { posts: Post[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctrl = animate(ref.current.querySelectorAll(".post"), {
      opacity: [0, 1], translateY: [40, 0],
      delay: stagger(100), duration: 900, ease: "outExpo",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      autoplay: onScroll({ target: ref.current, enter: "bottom-=10% top", once: true } as any),
    });
    return () => { ctrl.pause(); };
  }, [posts]);

  return (
    <section id="journal">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">05 / JOURNAL</div>
            <h2 className="section-title">Recent <em>writing</em></h2>
          </div>
          <p className="section-lede">Notas sobre publicar, el oficio y las herramientas a las que siempre vuelvo.</p>
        </div>

        <div className="blog-grid" ref={ref}>
          {posts.map((p) => (
            <Link key={p.id} className="post" href={`/blog/${p.slug}`}>
              <div className="post-cover" data-mock={p.title} />
              <div className="post-body">
                <div className="post-meta">
                  <span className="cat">{p.tags?.[0] ?? "Dev"}</span>
                  <span>
                    {new Date(p.createdAt).toLocaleDateString("es-MX", {
                      month: "short", day: "2-digit", year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="post-title">{p.title}</h3>
                <div className="post-readmore">Read note <span>→</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
