import HeroSlider from "@/components/sections/HeroSlider";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import Experience from "@/components/sections/Experience";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { getProjects } from "@/data/projects";
import { getExperience } from "@/data/experience";
import { getPosts } from "@/data/posts";
import { getConfig } from "@/data/config";
import { getHeroSlides } from "@/data/heroSlides";

export default async function HomePage() {
  const [projects, experience, posts, config, slides] = await Promise.all([
    getProjects(),
    getExperience(),
    getPosts(),
    getConfig(),
    getHeroSlides(),
  ]);

  return (
    <>
      <HeroSlider slides={slides} config={config} />
      <Work projects={projects} config={config} />
      <Stack />
      <Experience items={experience} config={config} />
      <Blog posts={posts} config={config} />
      <Contact config={config} />
    </>
  );
}
