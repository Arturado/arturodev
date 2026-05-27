"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { useEffect, useState } from "react";
import api from "@/lib/api";

const cardConfig = [
  {
    label: "Proyectos",
    key: "projects",
    description: "en portfolio",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    colors: {
      iconBg: "bg-violet-500/10",
      iconText: "text-violet-400",
      border: "border-violet-500/20",
      hoverBorder: "hover:border-violet-500/40",
      num: "text-violet-300",
    },
  },
  {
    label: "Posts",
    key: "posts",
    description: "en el blog",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="17" x2="16" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    colors: {
      iconBg: "bg-teal-500/10",
      iconText: "text-teal-400",
      border: "border-teal-500/20",
      hoverBorder: "hover:border-teal-500/40",
      num: "text-teal-300",
    },
  },
  {
    label: "Mensajes",
    key: "messages",
    description: "recibidos",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    colors: {
      iconBg: "bg-amber-500/10",
      iconText: "text-amber-400",
      border: "border-amber-500/20",
      hoverBorder: "hover:border-amber-500/40",
      num: "text-amber-300",
    },
  },
];

const quickActions = [
  { label: "+ Proyecto", href: "/admin/projects" },
  { label: "+ Post", href: "/admin/posts" },
  { label: "Ver mensajes", href: "/admin/messages" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, posts: 0, messages: 0 });
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    );
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

  return (
    <ProtectedRoute>
      <div>
        <div className="mb-10">
          <p className="text-gray-600 text-sm font-mono mb-1 capitalize">{date}</p>
          <h1 className="text-2xl font-bold text-white">
            {getGreeting()}, Arturo
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cardConfig.map((card) => (
            <div
              key={card.label}
              className={`bg-white/[0.03] border ${card.colors.border} ${card.colors.hoverBorder} rounded-2xl p-6 transition-all duration-200 cursor-default`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`p-2.5 rounded-xl ${card.colors.iconBg} ${card.colors.iconText}`}>
                  {card.icon}
                </div>
                <span className="text-gray-700 text-xs font-mono">{card.description}</span>
              </div>
              <p className={`text-4xl font-bold ${card.colors.num} mb-1 tabular-nums`}>
                {stats[card.key as keyof typeof stats]}
              </p>
              <p className="text-gray-500 text-sm">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.05]">
          <p className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-4">
            Acciones rápidas
          </p>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm transition-all duration-200"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
