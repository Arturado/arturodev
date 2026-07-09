"use client";

import Link from "next/link";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer({ config }: { config: SiteConfig }) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: config.social_github },
    { label: "LinkedIn", href: config.social_linkedin },
    { label: "Twitter / X", href: config.social_twitter },
  ].filter((social) => social.href);

  return (
    <footer className="footer">
      <div className="footer-monogram">AV</div>

      <div className="footer-grid">
        <div className="footer-col">
          <h4>Arturo Vasquez</h4>
          <p>{t("hero.subtitle")}</p>
          {config.site_location && <p>{config.site_location}</p>}
        </div>

        <div className="footer-col">
          <h4>{t("nav.work")}</h4>
          <Link href="/#work">{t("nav.work")}</Link>
          <Link href="/#stack">{t("nav.stack")}</Link>
          <Link href="/#experiencia">{t("nav.experience")}</Link>
          <Link href="/curriculum">{t("nav.resume")}</Link>
        </div>

        <div className="footer-col">
          <h4>{t("nav.journal")}</h4>
          <Link href="/#blog">{t("nav.journal")}</Link>
          <Link href="/#contacto">{t("nav.contact")}</Link>
        </div>

        <div className="footer-col">
          <h4>Social</h4>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
            </a>
          ))}
          {config.site_email && (
            <a href={`mailto:${config.site_email}`}>{config.site_email}</a>
          )}
        </div>
      </div>

      <div className="footer-bar">
        <span>© {year} Arturo Vasquez</span>
        <span>{t("footer.built")}</span>
      </div>
    </footer>
  );
}
