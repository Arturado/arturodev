import { getProjects, getProject } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: `${project.name} — Arturo`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: project.image ? [{ url: project.image, width: 1200, height: 630 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/#portfolio" className="inline-flex items-center gap-2 text-gray-600 hover:text-violet-400 transition-colors mb-10 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Volver al portfolio
        </Link>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 border border-gray-800">
          {project.image && <Image src={project.image} alt={project.name} fill className="object-cover" />}
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">{project.name}</h1>
            <span className="text-gray-600 font-mono text-sm">{project.year}</span>
          </div>
          <div className="flex gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-full transition-colors">Ver sitio</a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-700 hover:border-violet-400 text-gray-400 hover:text-violet-400 text-sm rounded-full transition-colors">GitHub</a>
            )}
          </div>
        </div>
        <div
          className="prose prose-invert prose-violet max-w-none text-gray-400 mb-8"
          dangerouslySetInnerHTML={{ __html: project.longDescription }}
        />
        <div className="flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-sm rounded-full">{tech}</span>
          ))}
        </div>
      </div>
    </main>
  );
}