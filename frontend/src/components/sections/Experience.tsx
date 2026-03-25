"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["Experiencia", "Educación", "Certificaciones"] as const;
type Tab = typeof tabs[number];

const experience = [
  {
    period: "2020 — Presente",
    role: "Desarrollador Full Stack Freelance",
    company: "UltraGrif",
    location: "Remoto",
    description: "Desarrollo de soluciones ecommerce y herramientas internas a medida.",
    highlights: [
      "Plugin ERP+CRM para WooCommerce con cotizaciones, métricas y automatización",
      "Integración con SoftRestaurant, Pedidos Ya y MercadoLibre",
      "Panel CRM con dashboards, filtros por vendedor, Excel y PDF",
      "Cotizador dinámico con lógica de tramos y coeficientes",
    ],
    techs: ["PHP", "React", "Docker", "MySQL", "WP REST API", "PHPExcel"],
  },
  {
    period: "2017 — 2020",
    role: "Desarrollador Full Stack / Analista Funcional",
    company: "Acid Labs",
    location: "Santiago, Chile",
    description: "Desarrollo y mantenimiento de plataformas ecommerce para grandes marcas chilenas.",
    highlights: [
      "Everlast Chile, Cannon, Kitchencenter, Casaideas, Enex Chile",
      "Integración de ERP, CRM, pasarelas de pago y marketplaces",
      "Optimización de performance para CyberDay y Black Friday",
      "Pipelines CI/CD y entornos Dockerizados para dev, QA y producción",
    ],
    techs: ["WordPress", "Laravel", "Magento", "React", "Docker", "Git"],
  },
  {
    period: "2014 — 2017",
    role: "Desarrollador Full Stack",
    company: "Touchsmart Electronics",
    location: "Santiago, Chile",
    description: "A cargo de los sitios Marley Coffee Chile y Jam Audio en Magento y Shopify.",
    highlights: [
      "Reportería y sincronización de stock multi-warehouse",
      "Middleware de sincronía con distintos sistemas de inventario",
      "Migraciones de portales y upgrades de servicios web",
      "Análisis periódicos de seguridad",
    ],
    techs: ["Python", "Django", "Magento", "PHP", "Laravel"],
  },
];

const education = [
  {
    period: "2006 — 2011",
    role: "Ingeniería en Computación",
    company: "Universidad de Carabobo",
    location: "Carabobo, Venezuela",
    description: "Formación en ciencias de la computación, algoritmos y desarrollo de software.",
    highlights: [],
    techs: [],
  },
  {
    period: "2011 — 2013",
    role: "Desarrollo Web e Infraestructura",
    company: "I.U.T.E.P.I",
    location: "Valencia, Venezuela",
    description: "Carrera técnica en desarrollo web e infraestructura de servidores.",
    highlights: [],
    techs: [],
  },
];

const certifications = [
  {
    period: "2022",
    role: "New Relic",
    company: "Acid Labs",
    location: "Santiago, Chile",
    description: "Monitoreo y observabilidad de aplicaciones con New Relic.",
    highlights: [],
    techs: [],
  },
  {
    period: "2020 — 2021",
    role: "Curso Python",
    company: "Platzi",
    location: "Online",
    description: "Programación en Python, estructuras de datos y aplicaciones web.",
    highlights: [],
    techs: [],
  },
  {
    period: "2015",
    role: "Linux Red Hat",
    company: "h3 Marketing Digital",
    location: "Ciudad de Panamá, Panamá",
    description: "Administración de sistemas Linux Red Hat.",
    highlights: [],
    techs: [],
  },
];

const dataMap: Record<Tab, typeof experience> = {
  "Experiencia": experience,
  "Educación": education,
  "Certificaciones": certifications,
};

export default function Experience() {
  const [activeTab, setActiveTab] = useState<Tab>("Experiencia");

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

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "border border-gray-700 text-gray-500 hover:border-violet-400 hover:text-violet-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards con scroll horizontal */}
        <div className="overflow-x-auto pb-6 -mx-6 px-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-6"
            style={{ width: "max-content" }}
          >
            {dataMap[activeTab].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300 flex flex-col gap-4"
                style={{ width: "360px", minWidth: "360px" }}
              >
                {/* Header */}
                <div>
                  <span className="text-violet-400 font-mono text-xs">{item.period}</span>
                  <h3 className="text-white font-bold text-lg mt-1 leading-tight">{item.role}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 text-sm font-medium">{item.company}</span>
                    <span className="text-gray-700">·</span>
                    <span className="text-gray-600 text-xs">{item.location}</span>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>

                {/* Highlights */}
                {item.highlights.length > 0 && (
                  <ul className="space-y-2 flex-1">
                    {item.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-500">
                        <span className="text-violet-400 mt-0.5 shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Techs */}
                {item.techs.length > 0 && (
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

        {/* Indicador de scroll */}
        <p className="text-center text-gray-700 text-xs font-mono mt-4">
          ← deslizá para ver más →
        </p>
      </div>
    </section>
  );
}