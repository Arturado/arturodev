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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            arturo<span className="text-violet-400">.</span>admin
          </h1>
          <p className="text-gray-600 text-sm">Panel de administración</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-gray-600 text-xs font-mono mb-2 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="hola@arturodev.info" className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-colors" />
          </div>
          <div>
            <label className="text-gray-600 text-xs font-mono mb-2 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-gray-800/50 border border-gray-700 focus:border-violet-500 text-gray-300 placeholder-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-colors" />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-300">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}