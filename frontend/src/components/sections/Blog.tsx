"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Post } from "@/data/posts";
import { useLanguage } from "@/contexts/LanguageContext";

const EASE = [0.2, 0.8, 0.2, 1] as const;

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default function Blog({ posts }: { posts: Post[] }) {
  const { t, locale } = useLanguage();
  const latest = posts.filter((post) => post.published).slice(0, 3);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <section id="blog" className="section-light">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="section-num">{t("blog.pre")}</div>
            <h2 className="section-title">
              {t("blog.title")} <em>{t("blog.title.em")}</em>
            </h2>
          </div>
          <p className="section-lede">{t("blog.lede")}</p>
        </motion.div>

        {latest.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--fg-faint)",
            }}
          >
            {t("blog.empty")}
          </p>
        ) : (
          <motion.div
            className="blog-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {latest.map((post) => {
              const excerpt =
                post.excerpt || stripHtml(post.content).slice(0, 120);
              return (
                <motion.article
                  key={post.id}
                  className="post"
                  whileHover={{ y: -2 }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  }}
                >
                  <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                    <div className="post-cover" data-mock={`[ ${post.tags[0] ?? "post"} ]`} />
                    <div className="post-body">
                      <div className="post-meta">
                        <span className="cat">{post.tags[0] ?? "blog"}</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="text-sm" style={{ color: "var(--fg-mute)" }}>
                        {excerpt}…
                      </p>
                      <span className="post-readmore">
                        {t("blog.readmore")} <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
