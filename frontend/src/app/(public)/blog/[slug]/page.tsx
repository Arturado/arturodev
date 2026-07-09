import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/data/posts";

type Props = { params: Promise<{ slug: string }> };

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.published) {
    return { title: "Post no encontrado — Arturo Vasquez" };
  }
  const description = post.excerpt || stripHtml(post.content).slice(0, 160);
  return {
    title: `${post.title} — Arturo Vasquez`,
    description,
    openGraph: { title: post.title, description, type: "article" },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.published) notFound();

  const date = new Date(post.createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="container pb-24 pt-36">
      <div className="mx-auto max-w-[760px]">
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
          <Link href="/#blog" className="transition-colors hover:text-[var(--fg)]">
            Blog
          </Link>
          <span aria-hidden>/</span>
          <span style={{ color: "var(--fg-mute)" }}>{post.title}</span>
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
            {post.tags[0] && (
              <span style={{ color: "var(--primary-color)" }}>{post.tags[0]}</span>
            )}
            <time dateTime={post.createdAt}>{date}</time>
            <span>{post.readTime}</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(34px, 5.5vw, 64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            {post.title}
          </h1>
        </header>

        {/* Header visual (el modelo Post no tiene imagen propia) */}
        <div className="post-cover mb-12 rounded-[var(--radius-card)]" data-mock={`[ ${post.tags[0] ?? "post"} ]`} />

        <div
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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

        <div className="mt-16 border-t pt-8" style={{ borderColor: "var(--line)" }}>
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--primary-color)]"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.06em",
              color: "var(--fg-mute)",
            }}
          >
            ← Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
