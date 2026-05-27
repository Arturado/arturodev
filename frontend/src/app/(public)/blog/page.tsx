import { getPosts } from "@/data/posts";
import BlogCard from "@/components/ui/BlogCard";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-violet-400 transition-colors mb-10 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Volver al inicio
        </Link>
        <h1 className="text-4xl font-bold text-white mb-12">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}