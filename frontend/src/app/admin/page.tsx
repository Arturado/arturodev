"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("admin_token", res.data.access_token);
      router.push("/admin/dashboard");
    } catch {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(109,40,217,0.12) 0%, #080810 60%)" }}
    >
      <div className="w-full max-w-md" style={{ animation: "fadeInUp 0.4s ease-out both" }}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600/15 border border-violet-500/25 mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-violet-400">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            arturo<span className="text-violet-400">.</span>admin
          </h1>
          <p className="text-gray-500 text-sm">Panel de administración</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="text-gray-500 text-xs font-mono mb-2 block tracking-wider uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="hola@arturodev.info"
              className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/60 focus:bg-white/[0.06] text-gray-200 placeholder-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-1 focus:ring-violet-500/20"
            />
          </div>
          <div>
            <label className="text-gray-500 text-xs font-mono mb-2 block tracking-wider uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/60 focus:bg-white/[0.06] text-gray-200 placeholder-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-1 focus:ring-violet-500/20"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-red-400 shrink-0">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                Autenticando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="text-center text-gray-700 text-xs mt-6 font-mono">arturodev.info © 2025</p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
