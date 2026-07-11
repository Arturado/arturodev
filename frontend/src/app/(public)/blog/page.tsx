import type { Metadata } from "next";
import { getPosts } from "@/data/posts";
import { getCategories } from "@/data/categories";
import BlogListing from "@/components/sections/BlogListing";

export const metadata: Metadata = {
  title: "Blog — Arturo Vasquez",
  description: "Notas sobre desarrollo, e-commerce y automatización.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const published = posts.filter((post) => post.published);

  return <BlogListing posts={published} categories={categories} />;
}
