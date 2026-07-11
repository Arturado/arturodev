export type Comment = {
  id: string;
  postId: string;
  name: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt: string;
};

const API = process.env.API_URL || 'http://127.0.0.1:4000/api';

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  try {
    const res = await fetch(`${API}/comments?postId=${postId}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
