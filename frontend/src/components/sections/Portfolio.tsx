import ProjectCard from "@/components/ui/ProjectCard";
import { getProjects } from "@/data/projects";

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <section id="portfolio" className="relative bg-[#0d0d0d] py-28 px-6 overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] font-black text-white/[0.03] select-none whitespace-nowrap pointer-events-none">
        PORTFOLIO
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 font-mono text-sm mb-2">— mis proyectos</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Portfolio</h2>
        </div>
        {projects.length === 0 ? (
          <p className="text-center text-gray-600">No hay proyectos todavía.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}