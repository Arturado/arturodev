"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project, index: _index }: { project: Project; index: number }) {
  return (
    <div className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all duration-300">
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900/90 border border-gray-700 rounded-full text-gray-400 hover:text-violet-400 hover:border-violet-400 transition-colors">
              ↗
            </a>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-bold text-lg group-hover:text-violet-400 transition-colors">
            {project.name}
          </h3>
          <span className="text-gray-600 text-xs font-mono">{project.year}</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techs.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-violet-400 transition-colors">
          Ver detalle →
        </Link>
      </div>
    </div>
  );
}
