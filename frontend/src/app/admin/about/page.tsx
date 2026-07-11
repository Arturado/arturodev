"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ImageUpload from "@/components/admin/ImageUpload";
import api from "@/lib/api";

type About = {
  bio: string;
  bioEn: string;
  photoUrl: string;
  available: boolean;
};

const empty: About = { bio: "", bioEn: "", photoUrl: "", available: true };

export default function AdminAbout() {
  const [form, setForm] = useState<About>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/about").then((res) => {
      setForm({
        bio: res.data.bio ?? "",
        bioEn: res.data.bioEn ?? "",
        photoUrl: res.data.photoUrl ?? "",
        available: res.data.available ?? true,
      });
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.put("/about", form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">About Me</h1>
          {saved && <span className="text-green-400 text-sm font-mono">✓ Guardado</span>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-6">
            <div>
              <label className="text-gray-600 text-xs font-mono mb-2 block">Foto</label>
              <ImageUpload value={form.photoUrl} onChange={(url) => setForm({ ...form, photoUrl: url })} />
            </div>

            <div>
              <label className="text-gray-600 text-xs font-mono mb-1 block">Bio / Presentación (ES)</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Contá quién sos y a qué te dedicás..."
                rows={6}
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-gray-600 text-xs font-mono mb-1 block">Bio / Presentación (EN)</label>
              <textarea
                value={form.bioEn}
                onChange={(e) => setForm({ ...form, bioEn: e.target.value })}
                placeholder="Tell who you are and what you do..."
                rows={6}
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="available"
                checked={form.available}
                onChange={(e) => setForm({ ...form, available: e.target.checked })}
                className="w-4 h-4 accent-violet-500"
              />
              <label htmlFor="available" className="text-gray-400 text-sm">Disponible para proyectos</label>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
