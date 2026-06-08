"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ImageUpload from "@/components/admin/ImageUpload";
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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type HeroSlide = {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  ctaText: string;
  ctaTextEn: string;
  ctaUrl: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
};

const empty: Omit<HeroSlide, "id" | "order"> = {
  title: "", titleEn: "",
  subtitle: "", subtitleEn: "",
  description: "", descriptionEn: "",
  ctaText: "", ctaTextEn: "",
  ctaUrl: "", imageUrl: "",
  isActive: true,
};

function SortableSlide({
  slide,
  onEdit,
  onDelete,
}: {
  slide: HeroSlide;
  onEdit: (s: HeroSlide) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: slide.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 px-1"
        >
          ⠿
        </div>
        <div className={`w-2 h-2 rounded-full shrink-0 ${slide.isActive ? "bg-green-400" : "bg-gray-600"}`} />
        <div>
          <p className="text-white font-medium text-sm">{slide.title}</p>
          <p className="text-gray-600 text-xs font-mono">{slide.subtitle} · {slide.ctaUrl}</p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(slide)}
          className="px-3 py-1.5 border border-gray-700 hover:border-violet-400 text-gray-400 hover:text-violet-400 text-xs rounded-lg transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(slide.id)}
          className="px-3 py-1.5 border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 text-xs rounded-lg transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default function AdminHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [form, setForm] = useState<Omit<HeroSlide, "id" | "order">>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const fetchSlides = async () => {
    const res = await api.get("/hero-slides/admin");
    setSlides(res.data);
  };

  useEffect(() => { fetchSlides(); }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = slides.findIndex(s => s.id === active.id);
    const newIndex = slides.findIndex(s => s.id === over.id);
    const newOrder = arrayMove(slides, oldIndex, newIndex);
    setSlides(newOrder);
    setSaving(true);
    try {
      await api.put("/hero-slides/reorder", { ids: newOrder.map(s => s.id) });
    } catch {
      fetchSlides();
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await api.put(`/hero-slides/${editing}`, form);
      } else {
        await api.post("/hero-slides", form);
      }
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      fetchSlides();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s: HeroSlide) => {
    setForm({ ...s });
    setEditing(s.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar slide?")) return;
    await api.delete(`/hero-slides/${id}`);
    fetchSlides();
  };

  const field = (key: keyof typeof form, label: string, placeholder = "") => (
    <div key={key}>
      <label className="text-gray-600 text-xs font-mono mb-1 block">{label}</label>
      <input
        value={(form as any)[key] ?? ""}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
      />
    </div>
  );

  return (
    <ProtectedRoute>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Hero Slides</h1>
            {saving && <span className="text-violet-400 text-xs font-mono animate-pulse">Guardando orden...</span>}
          </div>
          <button
            onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-xl transition-colors"
          >
            {showForm ? "Cancelar" : "+ Nuevo slide"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">Español</p>
                <div className="flex flex-col gap-4">
                  {field("title", "Título ES", "Mi título")}
                  {field("subtitle", "Subtítulo ES", "Desarrollador Full-Stack")}
                  {field("description", "Descripción ES", "Texto descriptivo...")}
                  {field("ctaText", "Texto CTA ES", "Ver mi trabajo")}
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">English</p>
                <div className="flex flex-col gap-4">
                  {field("titleEn", "Title EN", "My title")}
                  {field("subtitleEn", "Subtitle EN", "Full-Stack Developer")}
                  {field("descriptionEn", "Description EN", "Descriptive text...")}
                  {field("ctaTextEn", "CTA Text EN", "View my work")}
                </div>
              </div>
            </div>

            {field("ctaUrl", "URL del CTA", "#projects")}

            <div className="md:col-span-2">
              <label className="text-gray-600 text-xs font-mono mb-1 block">Imagen</label>
              <ImageUpload value={form.imageUrl} onChange={url => setForm({ ...form, imageUrl: url })} />
            </div>

            <div className="md:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive}
                onChange={e => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 accent-violet-500"
              />
              <label htmlFor="isActive" className="text-gray-400 text-sm">Activo (visible en el sitio)</label>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
              >
                {loading ? "Guardando..." : editing ? "Actualizar slide" : "Crear slide"}
              </button>
            </div>
          </form>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={slides.map(s => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {slides.length === 0 && (
                <div className="text-center py-16 text-gray-600">No hay slides todavía</div>
              )}
              {slides.map(s => (
                <SortableSlide key={s.id} slide={s} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {slides.length > 1 && (
          <p className="text-center text-gray-700 text-xs font-mono mt-6">⠿ arrastrá para reordenar</p>
        )}
      </div>
    </ProtectedRoute>
  );
}
