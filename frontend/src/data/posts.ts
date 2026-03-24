export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  published: boolean;
  createdAt: string;
};

const API = 'http://127.0.0.1:4000/api';

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API}/posts`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API}/posts/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const text = await res.text();
    if (!text || text.trim() === '') return null;
    return JSON.parse(text);
  } catch (err) {
    console.error('Error fetching post:', err);
    return null;
  }
}