import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/data/posts";
import { getCategories } from "@/data/categories";
import { getCommentsByPost } from "@/data/comments";
import { getConfig } from "@/data/config";
import PostDetail from "@/components/sections/PostDetail";

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
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.published) notFound();

  const [categories, comments, config, posts] = await Promise.all([
    getCategories(),
    getCommentsByPost(post.id),
    getConfig(),
    getPosts(),
  ]);
  const published = posts.filter((p) => p.published);

  return (
    <PostDetail
      post={post}
      categories={categories}
      comments={comments}
      config={config}
      posts={published}
    />
  );
}
