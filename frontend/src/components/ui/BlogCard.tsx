"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Post } from "@/data/posts";

export default function BlogCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Título */}
      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-violet-400 transition-colors leading-snug">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
          <span>{new Date(post.createdAt).toLocaleDateString("es-CL", { year: "numeric", month: "short", day: "numeric" })}</span>
          <span>·</span>
          <span>{post.readTime} lectura</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-violet-400 transition-colors group/link">
          Leer
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" className="group-hover/link:translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}