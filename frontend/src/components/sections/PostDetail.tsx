"use client";

import Image from "next/image";
import Link from "next/link";
import type { Category, Post } from "@/data/posts";
import type { SiteConfig } from "@/data/config";
import type { Comment } from "@/data/comments";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick } from "@/utils/i18n";
import BlogSidebar from "@/components/blog/BlogSidebar";
import CommentSection from "@/components/blog/CommentSection";

export default function PostDetail({
  post,
  categories,
  comments,
  config,
  posts,
}: {
  post: Post;
  categories: Category[];
  comments: Comment[];
  config: SiteConfig;
  posts: Post[];
}) {
  const { locale, t } = useLanguage();
  const title = pick(post.title, post.titleEn, locale);
  const content = pick(post.content, post.contentEn, locale);
  const categoryName = post.category
    ? pick(post.category.name, post.category.nameEn, locale)
    : post.tags[0];

  const date = new Date(post.createdAt).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="page-light">
      <article className="container pb-24 pt-36">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_320px]">
        <div className="max-w-[760px]">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.06em",
              color: "var(--fg-faint)",
            }}
          >
            <Link href="/" className="transition-colors hover:text-[var(--fg)]">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="transition-colors hover:text-[var(--fg)]">
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span style={{ color: "var(--fg-mute)" }}>{title}</span>
          </nav>

          <header className="mb-10">
            <div
              className="mb-5 flex flex-wrap items-center gap-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--fg-faint)",
              }}
            >
              {categoryName && (
                <span style={{ color: "var(--primary-color)" }}>{categoryName}</span>
              )}
              <time dateTime={post.createdAt}>{date}</time>
              <span>{post.readTime}</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(34px, 5.5vw, 64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                textWrap: "balance",
              }}
            >
              {title}
            </h1>
          </header>

          {post.imageUrl ? (
            <div
              className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border"
              style={{ borderColor: "var(--line)" }}
            >
              <Image
                src={post.imageUrl}
                alt={title}
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="post-cover mb-12 rounded-[var(--radius-card)]" data-mock={`[ ${post.tags[0] ?? "post"} ]`} />
          )}

          <div className="rich-text" dangerouslySetInnerHTML={{ __html: content }} />

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border px-2.5 py-1"
                  style={{
                    borderColor: "var(--line)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--fg-mute)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <CommentSection postId={post.id} comments={comments} />

          <div className="mt-16 border-t pt-8" style={{ borderColor: "var(--line)" }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--fg)]"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: "0.06em",
                color: "var(--fg-mute)",
              }}
            >
              {t("blog.back")}
            </Link>
          </div>
        </div>

        <BlogSidebar
          categories={categories}
          posts={posts}
          config={config}
          activeCategory={post.category?.slug ?? null}
        />
        </div>
      </article>
    </div>
  );
}
