import Link from "next/link";
import type { SiteConfig } from "@/data/config";

export function Footer({ config }: { config: SiteConfig }) {
  const github   = config.social_github   || "https://github.com";
  const linkedin = config.social_linkedin || "https://linkedin.com";
  const twitter  = config.social_twitter  || "https://x.com";
  const email    = config.site_email      || "hola@arturodev.info";
  const location = config.site_location   || "Mexico City · GMT-6";
  const available = config.site_available || "Available Q3 '26";

  return (
    <footer className="footer">
      <div className="footer-monogram">AV — 2026</div>

      <div className="footer-grid">
        <div className="footer-col">
          <h4>Index</h4>
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#resume">Resume</Link>
          <Link href="#journal">Journal</Link>
        </div>
        <div className="footer-col">
          <h4>Social</h4>
          <a href={github}   target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={twitter}  target="_blank" rel="noreferrer">X / Twitter ↗</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={`mailto:${email}`}>{email}</a>
          <p>{location}</p>
          <p>{available}</p>
        </div>
        <div className="footer-col">
          <h4>Colophon</h4>
          <p>Built with Next.js, Tailwind &amp; Anime.js v4.</p>
        </div>
      </div>

      <div className="footer-bar">
        <span>© 2026 Arturo Vasquez — All rights reserved.</span>
        <span>v 2026.05 · Hecho con cuidado en CDMX</span>
      </div>
    </footer>
  );
}
