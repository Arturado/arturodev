"use client";

import Link from "next/link";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { key: "nav.work", href: "/#work" },
  { key: "nav.stack", href: "/#stack" },
  { key: "nav.experience", href: "/#experiencia" },
  { key: "nav.journal", href: "/#blog" },
  { key: "nav.resume", href: "/curriculum" },
  { key: "nav.contact", href: "/#contacto" },
] as const;

export default function Footer({ config }: { config: SiteConfig }) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const email = config.site_email || "arturados@gmail.com";
  const socials = [
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
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-name">Arturo Vasquez</div>
          <span className="footer-copy">© {year} — {t("footer.credit")}</span>
        </div>

        <nav className="footer-col" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="footer-col">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noopener noreferrer" : undefined}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
