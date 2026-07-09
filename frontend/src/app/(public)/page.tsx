import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import Experience from "@/components/sections/Experience";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { getProjects } from "@/data/projects";
import { getExperience } from "@/data/experience";
import { getPosts } from "@/data/posts";
import { getConfig } from "@/data/config";

export default async function HomePage() {
  const [projects, experience, posts, config] = await Promise.all([
    getProjects(),
    getExperience(),
    getPosts(),
    getConfig(),
  ]);

  return (
    <>
      <Hero />
      <Work projects={projects} />
      <Stack />
      <Experience items={experience} />
      <Blog posts={posts} />
      <Contact config={config} />
    </>
  );
}
