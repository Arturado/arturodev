import type { Category } from './posts';

const API = process.env.API_URL || 'http://127.0.0.1:4000/api';

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API}/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
