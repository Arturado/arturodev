export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  readTime: string;
};

export const posts: Post[] = [
  {
    slug: "como-estructurar-un-proyecto-nextjs",
    title: "Cómo estructurar un proyecto Next.js en 2024",
    excerpt: "Una guía práctica para organizar tu proyecto Next.js con App Router, componentes reutilizables y buenas prácticas.",
    content: "Contenido completo del post acá...",
    date: "2024-03-01",
    tags: ["Next.js", "React", "Arquitectura"],
    readTime: "5 min",
  },
  {
    slug: "wordpress-vs-headless",
    title: "WordPress Headless vs tradicional: cuándo usar cada uno",
    excerpt: "Después de 7 años con WordPress, mi visión sobre cuándo tiene sentido ir headless y cuándo no.",
    content: "Contenido completo del post acá...",
    date: "2024-02-15",
    tags: ["WordPress", "PHP", "Headless"],
    readTime: "7 min",
  },
  {
    slug: "nestjs-para-frontends",
    title: "Por qué uso Nest.js en mis proyectos de backend",
    excerpt: "Nest.js me cambió la forma de estructurar APIs. Te cuento por qué lo elegí sobre Express puro.",
    content: "Contenido completo del post acá...",
    date: "2024-01-20",
    tags: ["Nest.js", "Node.js", "Backend"],
    readTime: "6 min",
  },
];