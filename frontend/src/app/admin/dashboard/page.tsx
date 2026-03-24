"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, posts: 0, messages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, posts, messages] = await Promise.all([
          api.get("/projects"),
          api.get("/posts"),
          api.get("/contact"),
        ]);
        setStats({
          projects: projects.data.length,
          posts: posts.data.length,
          messages: messages.data.length,
        });
      } catch {}
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Proyectos", value: stats.projects, color: "violet" },
    { label: "Posts", value: stats.posts, color: "teal" },
    { label: "Mensajes", value: stats.messages, color: "amber" },
  ];

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.label} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-600 text-sm mb-2">{card.label}</p>
              <p className="text-4xl font-bold text-white">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}