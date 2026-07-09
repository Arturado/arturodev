"use client";

import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer({ config }: { config: SiteConfig }) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const email = config.site_email || "arturados@gmail.com";
  const links = [
    {
      label: "LinkedIn",
      href: config.social_linkedin || "https://www.linkedin.com/in/arturo-vasquez/",
      external: true,
    },
    {
      label: "GitHub",
      href: config.social_github || "https://github.com/Arturado",
      external: true,
    },
    { label: email, href: `mailto:${email}`, external: false },
  ];

  return (
    <footer className="footer">
      <div className="footer-bar" style={{ marginTop: 0 }}>
        <span>© {year} Arturo Vasquez</span>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="transition-colors duration-200"
              style={{ textTransform: "none" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary-color)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <span>{t("footer.credit")}</span>
      </div>
    </footer>
  );
}
