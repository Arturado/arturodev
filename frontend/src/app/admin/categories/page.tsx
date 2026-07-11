"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import api from "@/lib/api";

type Category = {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
};

const empty: Omit<Category, "id"> = { name: "", nameEn: "", slug: "" };

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Omit<Category, "id">>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => { fetchCategories(); }, []);

  useEffect(() => {
    if (editing || !form.name) return;
    const auto = form.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setForm((prev) => ({ ...prev, slug: auto }));
  }, [form.name, editing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await api.put(`/categories/${editing}`, form);
      } else {
        await api.post("/categories", form);
      }
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (c: Category) => {
    setForm({ name: c.name, nameEn: c.nameEn ?? "", slug: c.slug });
    setEditing(c.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar categoría?")) return;
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <ProtectedRoute>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Categorías</h1>
          <button
            onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-xl transition-colors"
          >
            {showForm ? "Cancelar" : "+ Nueva categoría"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 text-xs font-mono mb-1 block">Nombre (ES)</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Desarrollo Web"
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-600 text-xs font-mono mb-1 block">Nombre (EN)</label>
              <input
                value={form.nameEn}
                onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                placeholder="Web Development"
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-xs font-mono mb-1 block">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="desarrollo-web"
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
              >
                {loading ? "Guardando..." : editing ? "Actualizar" : "Crear categoría"}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {categories.length === 0 && (
            <div className="text-center py-16 text-gray-600">No hay categorías todavía</div>
          )}
          {categories.map((c) => (
            <div
              key={c.id}
              onClick={() => handleEdit(c)}
              className="bg-gray-900/50 border border-gray-800 hover:border-violet-500/40 rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-colors"
            >
              <div>
                <p className="text-white font-medium text-sm">{c.name}</p>
                <p className="text-gray-600 text-xs font-mono">{c.slug}{c.nameEn ? ` · ${c.nameEn}` : ""}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}
                className="px-3 py-1.5 border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 text-xs rounded-lg transition-colors shrink-0"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
