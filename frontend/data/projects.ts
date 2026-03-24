export type Project = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  techs: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "ninchcompany",
    name: "Ninch Company",
    description: "Plataforma web corporativa con WordPress y gestión de contenido avanzada.",
    longDescription: "Proyecto completo de desarrollo web corporativo. Incluye diseño personalizado, integración con APIs externas, panel de administración y optimización SEO.",
    techs: ["WordPress", "PHP", "MySQL", "Elementor"],
    image: "/images/projects/ninchcompany.jpg",
    liveUrl: "https://ninchcompany.com",
    repoUrl: "",
    year: "2024",
  },
  {
    slug: "proyecto-2",
    name: "Proyecto 2",
    description: "Descripción corta del proyecto.",
    longDescription: "Descripción larga del proyecto con todos los detalles.",
    techs: ["Next.js", "Nest.js", "PostgreSQL"],
    image: "/images/projects/placeholder.jpg",
    liveUrl: "",
    repoUrl: "https://github.com/Arturados",
    year: "2024",
  },
];