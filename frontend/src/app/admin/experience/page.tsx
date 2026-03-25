"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import SortableExperience from "@/components/admin/SortableExperience";
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

type Experience = {
  id: string;
  type: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  techs: string[];
  published: boolean;
};

const empty: Omit<Experience, "id"> = {
  type: "work",
  role: "",
  company: "",
  location: "",
  period: "",
  description: "",
  highlights: [],
  techs: [],
  published: true,
};

const tabs = [
  { label: "Experiencia", value: "work" },
  { label: "Educación", value: "education" },
  { label: "Certificaciones", value: "certification" },
];

export default function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([]);
  const [activeType, setActiveType] = useState("work");
  const [form, setForm] = useState<Omit<Experience, "id">>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchItems = async () => {
    const res = await api.get(`/experience?type=${activeType}`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, [activeType]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex(p => p.id === active.id);
    const newIndex = items.findIndex(p => p.id === over.id);
    const newOrder = arrayMove(items, oldIndex, newIndex);
    setItems(newOrder);
    setSaving(true);
    try {
      await api.put("/experience/reorder", { ids: newOrder.map(p => p.id) });
    } catch {
      fetchItems();
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
        type: activeType,
        highlights: typeof form.highlights === "string"
          ? (form.highlights as any).split("\n").map((h: string) => h.trim()).filter(Boolean)
          : form.highlights,
        techs: typeof form.techs === "string"
          ? (form.techs as any).split(",").map((t: string) => t.trim()).filter(Boolean)
          : form.techs,
      };
      if (editing) {
        await api.put(`/experience/${editing}`, data);
      } else {
        await api.post("/experience", data);
      }
      setForm({ ...empty, type: activeType });
      setEditing(null);
      setShowForm(false);
      fetchItems();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Experience) => {
    setForm({
      ...item,
      highlights: Array.isArray(item.highlights) ? item.highlights : [],
      techs: Array.isArray(item.techs) ? item.techs : [],
    });
    setEditing(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar?")) return;
    await api.delete(`/experience/${id}`);
    fetchItems();
  };

  const currentTab = tabs.find(t => t.value === activeType);

  return (
    <ProtectedRoute>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Experiencia</h1>
            {saving && <span className="text-violet-400 text-xs font-mono animate-pulse">Guardando orden...</span>}
          </div>
          <button
            onClick={() => { setForm({ ...empty, type: activeType }); setEditing(null); setShowForm(!showForm); }}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-xl transition-colors"
          >
            {showForm ? "Cancelar" : `+ Nueva ${currentTab?.label}`}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setActiveType(tab.value); setShowForm(false); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeType === tab.value
                  ? "bg-violet-600 text-white"
                  : "border border-gray-700 text-gray-500 hover:border-violet-400 hover:text-violet-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "role", label: "Rol / Título", placeholder: "Desarrollador Full Stack" },
              { key: "company", label: "Empresa / Institución", placeholder: "Acme Corp" },
              { key: "period", label: "Período", placeholder: "2020 — Presente" },
              { key: "location", label: "Ubicación", placeholder: "Santiago, Chile" },
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
              <label className="text-gray-600 text-xs font-mono mb-1 block">Descripción</label>
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descripción breve del rol..."
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-xs font-mono mb-1 block">Highlights (uno por línea)</label>
              <textarea
                value={Array.isArray(form.highlights) ? form.highlights.join("\n") : form.highlights}
                onChange={(e) => setForm({ ...form, highlights: e.target.value as any })}
                rows={4}
                placeholder="Logro o responsabilidad 1&#10;Logro o responsabilidad 2"
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
              />
            </div>
            {activeType === "work" && (
              <div className="md:col-span-2">
                <label className="text-gray-600 text-xs font-mono mb-1 block">Tecnologías (separadas por coma)</label>
                <input
                  value={Array.isArray(form.techs) ? form.techs.join(", ") : form.techs}
                  onChange={(e) => setForm({ ...form, techs: e.target.value as any })}
                  placeholder="React, Node.js, Docker"
                  className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                />
              </div>
            )}
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
                {loading ? "Guardando..." : editing ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map(p => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {items.length === 0 && (
                <div className="text-center py-16 text-gray-600">No hay items todavía</div>
              )}
              {items.map((item) => (
                <SortableExperience
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {items.length > 1 && (
          <p className="text-center text-gray-700 text-xs font-mono mt-6">⠿ arrastrá para reordenar</p>
        )}
      </div>
    </ProtectedRoute>
  );
}