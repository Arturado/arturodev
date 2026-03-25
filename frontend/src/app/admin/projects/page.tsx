"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SortableProject from "@/components/admin/SortableProject";
import api from "@/lib/api";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

type Project = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  techs: string[];
  image: string;
  liveUrl: string;
  repoUrl: string;
  year: string;
  published: boolean;
};

const empty: Omit<Project, "id"> = {
  slug: "", name: "", description: "", longDescription: "",
  techs: [], image: "", liveUrl: "", repoUrl: "",
  year: new Date().getFullYear().toString(), published: true,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Omit<Project, "id">>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex(p => p.id === active.id);
    const newIndex = projects.findIndex(p => p.id === over.id);
    const newOrder = arrayMove(projects, oldIndex, newIndex);

    setProjects(newOrder);
    setSaving(true);
    try {
      await api.put("/projects/reorder", { ids: newOrder.map(p => p.id) });
    } catch (err) {
      console.error(err);
      fetchProjects();
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...form,
        techs: typeof form.techs === "string"
          ? (form.techs as string).split(",").map(t => t.trim())
          : form.techs,
      };
      if (editing) {
        await api.put(`/projects/${editing}`, data);
      } else {
        await api.post("/projects", data);
      }
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p: Project) => {
    setForm({ ...p });
    setEditing(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar proyecto?")) return;
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <ProtectedRoute>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Proyectos</h1>
            {saving && <span className="text-violet-400 text-xs font-mono animate-pulse">Guardando orden...</span>}
          </div>
          <button
            onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-xl transition-colors"
          >
            {showForm ? "Cancelar" : "+ Nuevo proyecto"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "name", label: "Nombre", placeholder: "Mi proyecto" },
              { key: "slug", label: "Slug", placeholder: "mi-proyecto" },
              { key: "year", label: "Año", placeholder: "2024" },
              { key: "liveUrl", label: "URL en vivo", placeholder: "https://..." },
              { key: "repoUrl", label: "Repositorio", placeholder: "https://github.com/..." },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="text-gray-600 text-xs font-mono mb-1 block">{label}</label>
                <input
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="text-gray-600 text-xs font-mono mb-1 block">Imagen</label>
              <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-xs font-mono mb-1 block">Tecnologías (separadas por coma)</label>
              <input
                value={Array.isArray(form.techs) ? form.techs.join(", ") : form.techs}
                onChange={(e) => setForm({ ...form, techs: e.target.value as any })}
                placeholder="React, Next.js, PostgreSQL"
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-xs font-mono mb-1 block">Descripción corta</label>
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descripción breve del proyecto"
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-xs font-mono mb-1 block">Descripción larga</label>
              <RichTextEditor value={form.longDescription} onChange={(v) => setForm({ ...form, longDescription: v })} />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 accent-violet-500"
              />
              <label htmlFor="published" className="text-gray-400 text-sm">Publicado</label>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
              >
                {loading ? "Guardando..." : editing ? "Actualizar" : "Crear proyecto"}
              </button>
            </div>
          </form>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {projects.length === 0 && (
                <div className="text-center py-16 text-gray-600">No hay proyectos todavía</div>
              )}
              {projects.map((p) => (
                <SortableProject
                  key={p.id}
                  project={p}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {projects.length > 1 && (
          <p className="text-center text-gray-700 text-xs font-mono mt-6">
            ⠿ arrastrá para reordenar
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
}