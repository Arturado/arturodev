import type { Metadata } from "next";
import { Suspense } from "react";
import { getPosts } from "@/data/posts";
import { getCategories } from "@/data/categories";
import { getConfig } from "@/data/config";
import BlogListing from "@/components/sections/BlogListing";

export const metadata: Metadata = {
  title: "Blog — Arturo Vasquez",
  description: "Notas sobre desarrollo, e-commerce y automatización.",
};

export default async function BlogPage() {
  const [posts, categories, config] = await Promise.all([
    getPosts(),
    getCategories(),
    getConfig(),
  ]);
  const published = posts.filter((post) => post.published);

  return (
    <Suspense>
      <BlogListing posts={published} categories={categories} config={config} />
    </Suspense>
  );
}
