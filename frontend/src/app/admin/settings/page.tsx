"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import api from "@/lib/api";

type Config = {
  site_name: string;
  site_title: string;
  site_description: string;
  site_email: string;
  site_location: string;
  site_available: string;
  social_github: string;
  social_linkedin: string;
  social_twitter: string;
  primary_color: string;
  show_blog: string;
  show_experience: string;
  show_portfolio: string;
};

export default function AdminSettings() {
  const [config, setConfig] = useState<Config>({
    site_name: "",
    site_title: "",
    site_description: "",
    site_email: "",
    site_location: "",
    site_available: "true",
    social_github: "",
    social_linkedin: "",
    social_twitter: "",
    primary_color: "#7c3aed",
    show_blog: "true",
    show_experience: "true",
    show_portfolio: "true",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/config").then(res => {
      setConfig(res.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/config", config);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
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
          <h1 className="text-2xl font-bold text-white">Configuración</h1>
          {saved && <span className="text-green-400 text-sm font-mono">✓ Guardado</span>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Información personal */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-6 pb-3 border-b border-gray-800">Información personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "site_name", label: "Tu nombre", placeholder: "Arturo" },
                { key: "site_title", label: "Título profesional", placeholder: "Full Stack Developer" },
                { key: "site_email", label: "Email de contacto", placeholder: "hola@tudominio.com" },
                { key: "site_location", label: "Ubicación", placeholder: "Santiago, Chile" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-gray-600 text-xs font-mono mb-1 block">{label}</label>
                  <input
                    value={(config as any)[key]}
                    onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="text-gray-600 text-xs font-mono mb-1 block">Descripción / Bio</label>
                <textarea
                  value={config.site_description}
                  onChange={(e) => setConfig({ ...config, site_description: e.target.value })}
                  placeholder="+7 años construyendo productos digitales..."
                  rows={3}
                  className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="available"
                  checked={config.site_available === "true"}
                  onChange={(e) => setConfig({ ...config, site_available: e.target.checked ? "true" : "false" })}
                  className="w-4 h-4 accent-violet-500"
                />
                <label htmlFor="available" className="text-gray-400 text-sm">Disponible para freelance</label>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-6 pb-3 border-b border-gray-800">Redes sociales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: "social_github", label: "GitHub URL", placeholder: "https://github.com/usuario" },
                { key: "social_linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/usuario" },
                { key: "social_twitter", label: "Twitter/X URL", placeholder: "https://twitter.com/usuario" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-gray-600 text-xs font-mono mb-1 block">{label}</label>
                  <input
                    value={(config as any)[key]}
                    onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Secciones visibles */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-6 pb-3 border-b border-gray-800">Secciones visibles</h2>
            <div className="flex flex-wrap gap-6">
              {[
                { key: "show_portfolio", label: "Portfolio" },
                { key: "show_experience", label: "Experiencia" },
                { key: "show_blog", label: "Blog" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={key}
                    checked={(config as any)[key] === "true"}
                    onChange={(e) => setConfig({ ...config, [key]: e.target.checked ? "true" : "false" })}
                    className="w-4 h-4 accent-violet-500"
                  />
                  <label htmlFor={key} className="text-gray-400 text-sm">{label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Color primario */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-6 pb-3 border-b border-gray-800">Apariencia</h2>
            <div className="flex items-center gap-4">
              <div>
                <label className="text-gray-600 text-xs font-mono mb-1 block">Color primario</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.primary_color}
                    onChange={(e) => setConfig({ ...config, primary_color: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    value={config.primary_color}
                    onChange={(e) => setConfig({ ...config, primary_color: e.target.value })}
                    placeholder="#7c3aed"
                    className="w-32 bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
          >
            {saving ? "Guardando..." : "Guardar configuración"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}