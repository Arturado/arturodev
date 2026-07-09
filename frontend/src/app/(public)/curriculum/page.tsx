import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum Vitae — Arturo Vasquez | Full Stack Developer",
  description:
    "CV de Arturo Vasquez, Desarrollador Full Stack | Ecommerce Architect. +6 años de experiencia en WordPress, WooCommerce, Magento y React.",
};

const skills = [
  {
    label: "Lenguajes / Frameworks",
    items: "PHP, JavaScript, TypeScript, SQL, React, NestJS, GraphQL, Node.js",
  },
  {
    label: "CMS / E-commerce",
    items: "WordPress, WooCommerce, Magento, Shopify",
  },
  {
    label: "Integraciones",
    items: "APIs REST, Webhooks, SoftRestaurant, Pedidos Ya, MercadoLibre",
  },
  {
    label: "DevOps",
    items: "Docker, Git, GitHub, Cloudflare, GCP, AWS (S3)",
  },
  {
    label: "Otros",
    items: "OpenAI, n8n IO, Agentes Bots",
  },
];

const experience = [
  {
    company: "UltraGrif",
    role: "Full-Stack Freelance",
    period: "09/2024 – Presente",
    location: "Argentina",
    description:
      "Plugin ERP+CRM WooCommerce, integraciones SoftRestaurant/PedidosYa/MercadoLibre, panel CRM con dashboards, cotizador dinámico con lógica de tramos.",
    techs: "PHP, React, Docker, MySQL, WP REST API",
  },
  {
    company: "Acid Labs",
    role: "Full Stack / Analista Funcional",
    period: "01/2021 – 07/2024",
    location: "Santiago",
    description:
      "Everlast, Cannon, Kitchecenter, Komax, Casaideas, Enex Chile. Custom Magento & WordPress, CI/CD, Docker, optimización CyberDay/Black Friday.",
    techs: "WordPress, Laravel, Magento, React, Docker, GraphQL, PHP",
  },
  {
    company: "Touchsmart Electronics",
    role: "Full Stack",
    period: "03/2019 – 06/2020",
    location: "Vitacura",
    description:
      "Marley Coffee y Jam Audio en Magento/Shopify, middleware de sync con warehouses.",
    techs: "Python, Django, Magento, PHP, Laravel",
  },
  {
    company: "ChilExplora",
    role: "Desarrollador Web",
    period: "12/2017 – 03/2019",
    location: "Santiago",
    description:
      "Administración servidores web, pasarelas de pago, desarrollo de plugins.",
    techs: "",
  },
  {
    company: "Strapp International",
    role: "Webmaster",
    period: "04/2016 – 08/2017",
    location: "Panamá",
    description: "Sitios web y ecommerce, SEO, Tag Manager.",
    techs: "",
  },
  {
    company: "Inmobilia",
    role: "Front-End Developer",
    period: "03/2016 – 07/2017",
    location: "Panamá / Florida",
    description: "Storyboard, maquetado HTML, documentación funcional.",
    techs: "",
  },
];

const education = [
  { title: "Desarrollo Web, I.U.T.E.P.I", detail: "Valencia, Venezuela · 2011 – 2013" },
  { title: "Computación, Universidad de Carabobo", detail: "Venezuela · 2006 – 2011" },
];

const courses = [
  "New Relic, Acid Labs (2022)",
  "Python, Platzi (2020 – 2021)",
  "Linux Red Hat (2015)",
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="cv-section-title mb-5 mt-12 border-b pb-2"
      style={{
        borderColor: "var(--line)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--primary-color)",
      }}
    >
      {children}
    </h2>
  );
}

export default function CurriculumPage() {
  return (
    <div className="page-light">
      <div className="container pb-24 pt-36">
      <style>{`
        @media print {
          .nav, .footer, .cv-noprint, .grain, .cursor-dot, .cursor-ring { display: none !important; }
          html, body { background: #fff !important; color: #111 !important; }
          .cv-sheet { border: 0 !important; background: #fff !important; padding: 0 !important; box-shadow: none !important; }
          .cv-sheet * { color: #111 !important; border-color: #ddd !important; }
          .cv-section-title { color: #555 !important; }
          .container { padding-top: 0 !important; max-width: 100% !important; }
        }
      `}</style>

      {/* Acciones (no se imprimen) */}
      <div className="cv-noprint mx-auto mb-8 flex max-w-[880px] flex-wrap items-center justify-between gap-4">
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 44px)",
            letterSpacing: "-0.03em",
          }}
        >
          Curriculum Vitae
        </h1>
        <a href="/Arturo-Vasquez-CV.pdf" download className="btn-dark">
          Descargar PDF <span aria-hidden>↓</span>
        </a>
      </div>

      {/* Documento */}
      <article
        className="cv-sheet mx-auto max-w-[880px] rounded-xl px-8 py-12 md:px-14"
        style={{
          background: "var(--bg-light-elev)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
        }}
      >
        <header className="mb-4">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px, 4vw, 42px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Arturo Vasquez
          </h2>
          <p className="mt-2 text-lg" style={{ color: "var(--fg-mute)" }}>
            Desarrollador Full Stack | Ecommerce Architect
          </p>
          <p
            className="mt-4"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              lineHeight: 1.9,
              color: "var(--fg-faint)",
            }}
          >
            <a href="mailto:arturados@gmail.com">arturados@gmail.com</a> · Tel:{" "}
            <a href="tel:+56922278143">+56 9 2227 8143</a>
            <br />
            Chile, Santiago ·{" "}
            <a
              href="https://www.linkedin.com/in/arturo-vasquez/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/arturo-vasquez
            </a>
          </p>
        </header>

        <SectionTitle>Resumen</SectionTitle>
        <p style={{ color: "var(--fg-mute)", lineHeight: 1.75 }}>
          Desarrollador Full-Stack con más de 6 años de experiencia especializado
          en WordPress, WooCommerce, Magento y React. Fuerte enfoque en
          integración de sistemas via APIs REST, automatización de flujos
          comerciales y desarrollo de plugins personalizados.
        </p>

        <SectionTitle>Skills</SectionTitle>
        <dl className="grid gap-x-8 gap-y-3 md:grid-cols-[max-content_1fr]">
          {skills.map((skill) => (
            <div key={skill.label} className="contents">
              <dt className="font-medium" style={{ fontSize: 14 }}>
                {skill.label}
              </dt>
              <dd style={{ color: "var(--fg-mute)", fontSize: 14 }}>
                {skill.items}
              </dd>
            </div>
          ))}
        </dl>

        <SectionTitle>Experiencia</SectionTitle>
        <div className="flex flex-col gap-8">
          {experience.map((job) => (
            <div key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 style={{ fontWeight: 600, fontSize: 17 }}>
                  {job.company} — {job.role}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--fg-faint)",
                  }}
                >
                  {job.period} · {job.location}
                </span>
              </div>
              <p
                className="mt-1.5"
                style={{ color: "var(--fg-mute)", fontSize: 14, lineHeight: 1.7 }}
              >
                {job.description}
              </p>
              {job.techs && (
                <p
                  className="mt-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--fg-faint)",
                  }}
                >
                  Tech: {job.techs}
                </p>
              )}
            </div>
          ))}
        </div>

        <SectionTitle>Educación</SectionTitle>
        <ul className="flex flex-col gap-3">
          {education.map((item) => (
            <li key={item.title}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>{item.title}</span>
              <span
                className="ml-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--fg-faint)",
                }}
              >
                {item.detail}
              </span>
            </li>
          ))}
        </ul>

        <SectionTitle>Cursos</SectionTitle>
        <ul className="flex flex-col gap-2" style={{ color: "var(--fg-mute)", fontSize: 14 }}>
          {courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
        </article>
      </div>
    </div>
  );
}
