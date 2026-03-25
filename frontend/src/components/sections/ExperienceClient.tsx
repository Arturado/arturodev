"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Experience } from "@/data/experience";

const tabs = [
  { label: "Experiencia", value: "work" },
  { label: "Educación", value: "education" },
  { label: "Certificaciones", value: "certification" },
] as const;

type Tab = typeof tabs[number]["value"];

type Props = {
  work: Experience[];
  education: Experience[];
  certifications: Experience[];
};

export default function ExperienceClient({ work, education, certifications }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("work");

  const dataMap: Record<Tab, Experience[]> = {
    work,
    education,
    certification: certifications,
};

  const items = dataMap[activeTab];

  return (
    <section id="experiencia" className="relative bg-[#0d0d0d] py-28 px-6 overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] font-black text-white/[0.03] select-none whitespace-nowrap pointer-events-none">
        EXPERIENCIA
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-violet-400 font-mono text-sm mb-2">— trayectoria</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Experiencia</h2>
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.value
                  ? "bg-violet-600 text-white"
                  : "border border-gray-700 text-gray-500 hover:border-violet-400 hover:text-violet-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">No hay items todavía.</p>
        ) : (
          <>
            <div className="overflow-x-auto pb-6 -mx-6 px-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-6"
                style={{ width: "max-content" }}
              >
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300 flex flex-col gap-4"
                    style={{ width: "360px", minWidth: "360px" }}
                  >
                    <div>
                      <span className="text-violet-400 font-mono text-xs">{item.period}</span>
                      <h3 className="text-white font-bold text-lg mt-1 leading-tight">{item.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400 text-sm font-medium">{item.company}</span>
                        <span className="text-gray-700">·</span>
                        <span className="text-gray-600 text-xs">{item.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>

                    {item.highlights?.length > 0 && (
                      <ul className="space-y-2 flex-1">
                        {item.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2 text-sm text-gray-500">
                            <span className="text-violet-400 mt-0.5 shrink-0">▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.techs?.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800">
                        {item.techs.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <p className="text-center text-gray-700 text-xs font-mono mt-4">
              ← deslizá para ver más →
            </p>
          </>
        )}
      </div>
    </section>
  );
}