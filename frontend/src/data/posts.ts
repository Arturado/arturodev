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

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}