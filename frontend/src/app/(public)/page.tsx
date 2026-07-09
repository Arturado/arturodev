import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import { getProjects } from "@/data/projects";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <Work projects={projects} />
      <Stack />
    </>
  );
}
