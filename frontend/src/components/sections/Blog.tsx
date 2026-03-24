import BlogCard from "@/components/ui/BlogCard";
import { getPosts } from "@/data/posts";
import Link from "next/link";

export default async function Blog() {
  const posts = await getPosts();

  return (
    <section id="blog" className="relative bg-[#0a0a0a] py-28 px-6 overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] font-black text-white/[0.03] select-none whitespace-nowrap pointer-events-none">
        BLOG
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 font-mono text-sm mb-2">— mis ideas</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Blog</h2>
        </div>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No hay posts todavía.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
        <div className="text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-violet-400 text-gray-400 hover:text-violet-400 font-medium rounded-full transition-all duration-300">
            Ver todos los posts
          </Link>
        </div>
      </div>
    </section>
  );
}