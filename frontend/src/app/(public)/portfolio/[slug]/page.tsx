import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Proyecto no encontrado — Arturo Vasquez" };
  return {
    title: `${project.name} — Arturo Vasquez`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project || !project.published) notFound();

  return (
    <article className="container pb-24 pt-36">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-10 flex flex-wrap items-center gap-2"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.06em",
          color: "var(--fg-faint)",
        }}
      >
        <Link href="/" className="transition-colors hover:text-[var(--fg)]">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link href="/#work" className="transition-colors hover:text-[var(--fg)]">
          Work
        </Link>
        <span aria-hidden>/</span>
        <span style={{ color: "var(--fg-mute)" }}>{project.name}</span>
      </nav>

      <header className="mb-12 grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div
            className="mb-4"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--primary-color)",
            }}
          >
            {project.year}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 6.5vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
            }}
          >
            {project.name}
          </h1>
        </div>
        <p
          className="max-w-md text-base lg:col-span-4 lg:justify-self-end lg:text-right"
          style={{ color: "var(--fg-mute)" }}
        >
          {project.description}
        </p>
      </header>

      {project.image && (
        <div
          className="relative mb-14 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border"
          style={{ borderColor: "var(--line)" }}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover"
          />
        </div>
      )}

      <div className="grid gap-12 lg:grid-cols-12">
        <div
          className="rich-text lg:col-span-8"
          dangerouslySetInnerHTML={{ __html: project.longDescription }}
        />

        <aside className="lg:col-span-4">
          <div
            className="flex flex-col gap-6 rounded-[var(--radius-card)] border p-7"
            style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
          >
            <div>
              <h2
                className="mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--fg-faint)",
                }}
              >
                Stack
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border px-2 py-1"
                    style={{
                      borderColor: "var(--line)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--fg-mute)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.liveUrl || project.repoUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-5 py-2.5 text-sm font-medium"
                    style={{ background: "var(--fg)", color: "var(--bg)" }}
                  >
                    Live ↗
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border px-5 py-2.5 text-sm font-medium"
                    style={{ borderColor: "var(--line-strong)" }}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      <div className="mt-16 border-t pt-8" style={{ borderColor: "var(--line)" }}>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 transition-colors hover:text-[var(--primary-color)]"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: "0.06em",
            color: "var(--fg-mute)",
          }}
        >
          ← Work
        </Link>
      </div>
    </article>
  );
}
