import { getPosts, getPost } from "@/data/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post no encontrado" };

  return {
    title: `${post.title} — Arturo`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-violet-400 transition-colors mb-10 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Volver al blog
        </Link>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs rounded-full">{tag}</span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-3 text-xs text-gray-600 font-mono mb-10">
          <span>{new Date(post.createdAt).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span>·</span>
          <span>{post.readTime} de lectura</span>
        </div>
        <div className="prose prose-invert prose-violet max-w-none text-gray-400" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </main>
  );
}