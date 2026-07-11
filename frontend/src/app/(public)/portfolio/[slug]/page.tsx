import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import ProjectDetail from "@/components/sections/ProjectDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  const ogImages = project.image
    ? [{ url: project.image, width: 1200, height: 630 }]
    : [{ url: "/og-image.png", width: 1200, height: 630 }];
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: project.image ? [project.image] : ["/og-image.png"],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project || !project.published) notFound();

  return <ProjectDetail project={project} />;
}
