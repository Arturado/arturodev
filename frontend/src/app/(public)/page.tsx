import dynamic from "next/dynamic";
import { getConfig }      from "@/data/config";
import { getProjects }    from "@/data/projects";
import { getPosts }       from "@/data/posts";
import { getHeroSlides }  from "@/data/heroSlides";
import type { Experience } from "@/data/experience";
import { Cursor }         from "@/components/primitives/Cursor";
import HeroSlider         from "@/components/sections/HeroSlider";
import { Transmission }   from "@/components/sections/Transmission";
import { Services }       from "@/components/sections/Services";
import { Footer }         from "@/components/layout/Footer";

const About    = dynamic(() => import("@/components/sections/About"));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const Timeline  = dynamic(() => import("@/components/sections/Experience"));
const Journal   = dynamic(() => import("@/components/sections/Blog"));
const Contact   = dynamic(() => import("@/components/sections/Contact"));

const API = process.env.API_URL || "http://127.0.0.1:4000/api";

async function getExperience(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API}/experience`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [config, projects, posts, experience, slides] = await Promise.all([
    getConfig(),
    getProjects(),
    getPosts(),
    getExperience(),
    getHeroSlides(),
  ]);

  return (
    <main>
      <Cursor />
      <HeroSlider slides={slides} config={config} />
      <Transmission />
      <About config={config} />
      <Services />
      <Portfolio projects={projects} />
      <Timeline items={experience} />
      <Journal posts={posts} />
      <Contact config={config} />
      <Footer config={config} />
    </main>
  );
}
