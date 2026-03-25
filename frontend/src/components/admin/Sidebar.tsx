"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "▦" },
  { label: "Proyectos", href: "/admin/projects", icon: "◈" },
  { label: "Experiencia", href: "/admin/experience", icon: "◉" },
  { label: "Posts", href: "/admin/posts", icon: "◎" },
  { label: "Mensajes", href: "/admin/messages", icon: "◻" },
  { label: "Configuración", href: "/admin/settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  return (
    <aside className="w-60 min-h-screen bg-gray-900/50 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="text-white font-bold text-lg">
          arturo<span className="text-violet-400">.</span>
          <span className="text-gray-600 text-sm font-normal ml-1">admin</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${pathname === link.href ? "bg-violet-600/20 text-violet-400 border border-violet-500/30" : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"}`}>
            <span className="text-base">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <span>⊗</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}