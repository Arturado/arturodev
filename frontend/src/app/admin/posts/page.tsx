"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import api from "@/lib/api";
import RichTextEditor from "@/components/admin/RichTextEditor";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  published: boolean;
};

const empty: Omit<Post, "id"> = {
  slug: "", title: "", excerpt: "", content: "",
  tags: [], readTime: "5 min", published: true,
};

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<Omit<Post, "id">>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...form, tags: typeof form.tags === "string" ? (form.tags as string).split(",").map(t => t.trim()) : form.tags };
      if (editing) {
        await api.put(`/posts/${editing}`, data);
      } else {
        await api.post("/posts", data);
      }
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p: Post) => {
    setForm({ ...p });
    setEditing(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar post?")) return;
    await api.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <ProtectedRoute>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <button onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-xl transition-colors">
            {showForm ? "Cancelar" : "+ Nuevo post"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "title", label: "Título", placeholder: "Mi primer post" },
              { key: "slug", label: "Slug", placeholder: "mi-primer-post" },
              { key: "readTime", label: "Tiempo de lectura", placeholder: "5 min" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="text-gray-600 text-xs font-mono mb-1 block">{label}</label>
                <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
              </div>
            ))}
            <div>
              <label className="text-gray-600 text-xs font-mono mb-1 block">Tags (separados por coma)</label>
              <input value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value as any })} placeholder="Next.js, React, Backend" className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-xs font-mono mb-1 block">Excerpt</label>
              <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Resumen corto del post..." className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-xs font-mono mb-1 block">Contenido</label>
              <RichTextEditor value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-violet-500" />
              <label htmlFor="published" className="text-gray-400 text-sm">Publicado</label>
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={loading} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors">
                {loading ? "Guardando..." : editing ? "Actualizar" : "Crear post"}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {posts.length === 0 && (
            <div className="text-center py-16 text-gray-600">No hay posts todavía</div>
          )}
          {posts.map((p) => (
            <div key={p.id} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full shrink-0 ${p.published ? "bg-green-400" : "bg-gray-600"}`} />
                <div>
                  <p className="text-white font-medium text-sm">{p.title}</p>
                  <p className="text-gray-600 text-xs font-mono">{p.slug} · {p.readTime}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-0.5 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(p)} className="px-3 py-1.5 border border-gray-700 hover:border-violet-400 text-gray-400 hover:text-violet-400 text-xs rounded-lg transition-colors">Editar</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 text-xs rounded-lg transition-colors">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}