export type Experience = {
  id: string;
  type: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  techs: string[];
  published: boolean;
};

const API = process.env.API_URL || 'http://127.0.0.1:4000/api';

export async function getExperience(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API}/experience`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}