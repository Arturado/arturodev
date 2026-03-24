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

const API = 'http://127.0.0.1:4000/api';

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API}/projects/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const text = await res.text();
    if (!text || text.trim() === '') return null;
    return JSON.parse(text);
  } catch (err) {
    console.error('Error fetching project:', err);
    return null;
  }
}