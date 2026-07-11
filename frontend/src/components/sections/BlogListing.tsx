"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import type { Category, Post } from "@/data/posts";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick } from "@/utils/i18n";
import BlogSidebar from "@/components/blog/BlogSidebar";

const EASE = [0.2, 0.8, 0.2, 1] as const;

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default function BlogListing({
  posts,
  categories,
  config,
}: {
  posts: Post[];
  categories: Category[];
  config: SiteConfig;
}) {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get("category")
  );

  const filtered = useMemo(() => {
    if (!activeCategory) return posts;
    return posts.filter((post) => post.category?.slug === activeCategory);
  }, [posts, activeCategory]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="page-light">
      <div className="container pb-24 pt-36">
        <div className="mb-14 text-center">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
            }}
          >
            {t("blog.page.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-[420px]" style={{ color: "var(--fg-mute)" }}>
            {t("blog.page.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            {categories.length > 0 && (
              <div className="mb-12 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className="rounded-full border px-4 py-2 transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    borderColor: activeCategory === null ? "var(--primary-color)" : "var(--line)",
                    background: activeCategory === null ? "var(--primary-color)" : "transparent",
                    color: activeCategory === null ? "#fff" : "var(--fg-mute)",
                  }}
                >
                  {t("blog.filter.all")}
                </button>
                {categories.map((cat) => {
                  const active = activeCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.slug)}
                      className="rounded-full border px-4 py-2 transition-colors"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        letterSpacing: "0.06em",
                        borderColor: active ? "var(--primary-color)" : "var(--line)",
                        background: active ? "var(--primary-color)" : "transparent",
                        color: active ? "#fff" : "var(--fg-mute)",
                      }}
                    >
                      {pick(cat.name, cat.nameEn, locale)}
                    </button>
                  );
                })}
              </div>
            )}

            {filtered.length === 0 ? (
              <p
                className="text-center"
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
                key={activeCategory ?? "all"}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              >
                {filtered.map((post) => {
                  const title = pick(post.title, post.titleEn, locale);
                  const excerpt =
                    pick(post.excerpt, post.excerptEn, locale) ||
                    stripHtml(post.content).slice(0, 100);
                  const categoryName = post.category
                    ? pick(post.category.name, post.category.nameEn, locale)
                    : post.tags[0] ?? "blog";
                  return (
                    <motion.article
                      key={post.id}
                      className="post"
                      whileHover={{ y: -2 }}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
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
                              sizes="(max-width: 768px) 100vw, 25vw"
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
          </div>

          <BlogSidebar
            categories={categories}
            posts={posts}
            config={config}
            activeCategory={activeCategory}
            onCategoryClick={setActiveCategory}
          />
        </div>
      </div>
    </div>
  );
}
