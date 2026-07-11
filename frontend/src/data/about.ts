const API = process.env.API_URL || 'http://127.0.0.1:4000/api';

export type AboutData = {
  id: string;
  bio: string;
  bioEn?: string;
  photoUrl?: string;
  available: boolean;
};

export async function getAbout(): Promise<AboutData | null> {
  try {
    const res = await fetch(`${API}/about`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
