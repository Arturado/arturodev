"use client";

import { motion } from "framer-motion";
import TypewriterText from "@/components/ui/TypewriterText";
import type { SiteConfig } from "@/data/config";
import { useMemo } from "react";

type Props = {
  config: SiteConfig;
};

export default function Hero({ config }: Props) {
  const roles = useMemo(() => [
  config.site_title || "Full Stack Developer",
  "Software Engineer",
  "WordPress & PHP Expert",
  "Builder of digital products",
], [config.site_title]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden px-6">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-5xl w-full">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-violet-400 text-lg font-mono mb-4">
          Hola, soy
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-6xl md:text-8xl font-bold text-white mb-4 leading-none tracking-tight">
          {config.site_name || "Arturo"}<span className="text-violet-400">.</span>
        </motion.h1>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-2xl md:text-4xl font-light text-gray-400 mb-8 h-12">
          <TypewriterText roles={roles} />
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-gray-500 text-lg max-w-xl leading-relaxed mb-10">
          {config.site_description || "+7 años construyendo productos digitales."}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-4">
          <a href="#portfolio" className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25">Ver mi trabajo</a>
          <a href="#contacto" className="px-8 py-3 border border-gray-700 hover:border-violet-400 text-gray-400 hover:text-violet-400 font-medium rounded-full transition-all duration-300">Contactame</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-gray-600 text-xs font-mono">scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-8 bg-gradient-to-b from-violet-400 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}