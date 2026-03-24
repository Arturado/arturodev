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

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

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
    console.log('Fetching post from:', `${API}/posts/${slug}`);
    const res = await fetch(`${API}/posts/${slug}`, { cache: 'no-store' });
    console.log('Response status:', res.status);
    const text = await res.text();
    console.log('Response text:', text.slice(0, 100));
    return JSON.parse(text);
  } catch (err) {
    console.error('Error fetching post:', err);
    return null;
  }
}