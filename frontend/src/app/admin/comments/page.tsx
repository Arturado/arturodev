"use client";

import { useEffect, useMemo, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import api from "@/lib/api";

type Comment = {
  id: string;
  postId: string;
  name: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt: string;
  post: { title: string; slug: string };
};

type Filter = "all" | "pending" | "approved";

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const fetchComments = async () => {
    const res = await api.get("/comments/admin");
    setComments(res.data);
  };

  useEffect(() => { fetchComments(); }, []);

  const filtered = useMemo(() => {
    if (filter === "pending") return comments.filter((c) => !c.approved);
    if (filter === "approved") return comments.filter((c) => c.approved);
    return comments;
  }, [comments, filter]);

  const handleApprove = async (id: string) => {
    await api.put(`/comments/${id}/approve`);
    fetchComments();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar comentario?")) return;
    await api.delete(`/comments/${id}`);
    fetchComments();
  };

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "pending", label: "Pendientes" },
    { key: "approved", label: "Aprobados" },
  ];

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Comentarios</h1>

        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filter === tab.key
                  ? "bg-violet-600/15 text-violet-300 border border-violet-500/40"
                  : "text-gray-500 border border-gray-800 hover:text-gray-300 hover:border-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-600">No hay comentarios</div>
          )}
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      c.approved
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-yellow-500/15 text-yellow-400"
                    }`}
                  >
                    {c.approved ? "Aprobado" : "Pendiente"}
                  </span>
                </div>
                <span className="text-gray-600 text-xs font-mono shrink-0">
                  {new Date(c.createdAt).toLocaleDateString("es-CL")}
                </span>
              </div>
              <p className="text-gray-600 text-xs mb-2">{c.email}</p>
              <p className="text-gray-500 text-sm mb-2">
                {c.content.length > 100 ? `${c.content.slice(0, 100)}…` : c.content}
              </p>
              <p className="text-gray-700 text-xs font-mono mb-3">
                En: {c.post?.title ?? "—"}
              </p>
              <div className="flex gap-2">
                {!c.approved && (
                  <button
                    onClick={() => handleApprove(c.id)}
                    className="px-3 py-1.5 border border-emerald-700 hover:bg-emerald-500/10 text-emerald-400 text-xs rounded-lg transition-colors"
                  >
                    Aprobar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(c.id)}
                  className="px-3 py-1.5 border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 text-xs rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
