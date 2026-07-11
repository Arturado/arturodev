import HeroSlider from "@/components/sections/HeroSlider";
import AboutSection from "@/components/sections/AboutSection";
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
import { getAbout } from "@/data/about";

export default async function HomePage() {
  const [projects, experience, posts, config, slides, about] = await Promise.all([
    getProjects(),
    getExperience(),
    getPosts(),
    getConfig(),
    getHeroSlides(),
    getAbout(),
  ]);

  return (
    <>
      <HeroSlider slides={slides} config={config} />
      <AboutSection about={about} />
      <Work projects={projects} config={config} />
      <Stack />
      <Experience items={experience} config={config} />
      <Blog posts={posts} config={config} />
      <Contact config={config} />
    </>
  );
}
