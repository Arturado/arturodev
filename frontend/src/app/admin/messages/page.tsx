"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import api from "@/lib/api";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = async () => {
    const res = await api.get("/contact");
    setMessages(res.data);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleRead = async (id: string) => {
    await api.put(`/contact/${id}/read`);
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar mensaje?")) return;
    await api.delete(`/contact/${id}`);
    setSelected(null);
    fetchMessages();
  };

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Mensajes</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-16 text-gray-600">No hay mensajes todavía</div>
            )}
            {messages.map((m) => (
              <div key={m.id} onClick={() => { setSelected(m); if (!m.read) handleRead(m.id); }} className={`cursor-pointer bg-gray-900/50 border rounded-2xl p-4 transition-all ${selected?.id === m.id ? "border-violet-500/50" : "border-gray-800 hover:border-gray-700"}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {!m.read && <div className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />}
                    <p className={`text-sm font-medium ${m.read ? "text-gray-400" : "text-white"}`}>{m.name}</p>
                  </div>
                  <span className="text-gray-600 text-xs font-mono shrink-0">
                    {new Date(m.createdAt).toLocaleDateString("es-CL")}
                  </span>
                </div>
                <p className="text-gray-600 text-xs">{m.email}</p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{m.message}</p>
              </div>
            ))}
          </div>

          {selected && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-white font-bold">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-violet-400 text-sm hover:underline">{selected.email}</a>
                  <p className="text-gray-600 text-xs font-mono mt-1">
                    {new Date(selected.createdAt).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <button onClick={() => handleDelete(selected.id)} className="px-3 py-1.5 border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 text-xs rounded-lg transition-colors">
                  Eliminar
                </button>
              </div>
              <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-xl transition-colors">
                Responder
              </a>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}