export type Project = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  techs: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  year: string;
  published: boolean;
};

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}