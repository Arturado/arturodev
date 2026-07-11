"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Post } from "@/data/posts";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick } from "@/utils/i18n";

const EASE = [0.2, 0.8, 0.2, 1] as const;

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default function Blog({
  posts,
  config,
}: {
  posts: Post[];
  config?: SiteConfig;
}) {
  const { t, locale } = useLanguage();
  const latest = posts.filter((post) => post.published).slice(0, 3);

  if (config?.show_blog === "false") return null;

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
              const title = pick(post.title, post.titleEn, locale);
              const excerpt =
                pick(post.excerpt, post.excerptEn, locale) ||
                stripHtml(post.content).slice(0, 120);
              const categoryName = post.category
                ? pick(post.category.name, post.category.nameEn, locale)
                : post.tags[0] ?? "blog";
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
                    {post.imageUrl ? (
                      <div className="post-cover relative overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={title}
                          fill
                          quality={90}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="post-cover" data-mock={`[ ${post.tags[0] ?? "post"} ]`} />
                    )}
                    <div className="post-body">
                      <div className="post-meta">
                        <span className="cat">{categoryName}</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <h3 className="post-title">{title}</h3>
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

        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="transition-colors hover:text-[var(--primary-color)]"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.06em",
              color: "var(--fg-mute)",
            }}
          >
            {t("blog.viewall")}
          </Link>
        </div>
      </div>
    </section>
  );
}
