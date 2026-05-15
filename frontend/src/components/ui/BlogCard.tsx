"use client";

import Link from "next/link";
import { Post } from "@/data/posts";

export default function BlogCard({ post, index: _index }: { post: Post; index: number }) {
  return (
    <article className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300">
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-violet-400 transition-colors leading-snug">
        {post.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
          <span>{new Date(post.createdAt).toLocaleDateString("es-CL", { year: "numeric", month: "short", day: "numeric" })}</span>
          <span>·</span>
          <span>{post.readTime} lectura</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-violet-400 transition-colors">
          Leer →
        </Link>
      </div>
    </article>
  );
}
