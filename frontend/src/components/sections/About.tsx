"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SiteConfig } from "@/data/config";

const skills = [
  { name: "React / Next.js", level: 90 },
  { name: "Node / Nest.js", level: 85 },
  { name: "PHP / Laravel", level: 88 },
  { name: "WordPress", level: 92 },
  { name: "Python", level: 75 },
  { name: "Docker", level: 70 },
];

type Props = {
  config: SiteConfig;
};

export default function About({ config }: Props) {
  const info = [
    { label: "Ubicación", value: config.site_location || "Santiago, Chile" },
    { label: "Email", value: config.site_email || "hola@arturodev.info" },
    { label: "Experiencia", value: "+7 años" },
    { label: "Idiomas", value: "Español, Inglés" },
    { label: "Freelance", value: config.site_available === "true" ? "Disponible" : "No disponible" },
  ];

  return (
    <section id="about" className="relative bg-[#0a0a0a] py-28 px-6 overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] font-black text-white/[0.03] select-none whitespace-nowrap pointer-events-none">
        ABOUT ME
      </div>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <p className="text-violet-400 font-mono text-sm mb-2">— conóceme</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Sobre mí</h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
              <div className="absolute -inset-3 border border-violet-500/20 rounded-2xl" />
              <div className="absolute -inset-6 border border-violet-500/10 rounded-3xl" />
              <div className="absolute inset-0 bg-violet-600/10 rounded-2xl blur-2xl" />
              <Image src="/images/profile.jpg" alt={config.site_name || "Profile"} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover rounded-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-3xl font-bold text-white mb-2">Hola! Soy {config.site_name || "Arturo"}</h3>
            <p className="text-violet-400 font-medium mb-6">{config.site_title || "Full Stack Developer"}</p>
            <p className="text-gray-500 leading-relaxed mb-8">{config.site_description || "+7 años construyendo productos digitales."}</p>
            <div className="grid grid-cols-1 gap-3 mb-8">
              {info.map((item) => (
                <div key={item.label} className="flex gap-4 text-sm border-b border-gray-800/50 pb-3">
                  <span className="text-gray-600 w-28 shrink-0">{item.label}</span>
                  <span className="text-gray-400 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-8">
              {skills.map((skill, i) => (
                <motion.div key={skill.name} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{skill.name}</span>
                    <span className="text-violet-400">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }} className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
            <a href="/cv/cv-arturo.pdf" download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25">
              Descargar CV
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}