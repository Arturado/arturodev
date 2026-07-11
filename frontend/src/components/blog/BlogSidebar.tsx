"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import type { Category, Post } from "@/data/posts";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick } from "@/utils/i18n";

type Status = "idle" | "loading" | "success" | "error";

export default function BlogSidebar({
  categories,
  posts,
  config,
  activeCategory = null,
  onCategoryClick,
}: {
  categories: Category[];
  posts: Post[];
  config: SiteConfig;
  activeCategory?: string | null;
  onCategoryClick?: (slug: string | null) => void;
}) {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((post) => {
      if (post.category?.slug) {
        map.set(post.category.slug, (map.get(post.category.slug) ?? 0) + 1);
      }
    });
    return map;
  }, [posts]);

  const handleCategoryClick = (slug: string | null) => {
    if (onCategoryClick) {
      onCategoryClick(slug);
    } else {
      router.push(slug ? `/blog?category=${slug}` : "/blog");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const recaptchaToken = executeRecaptcha
        ? await executeRecaptcha("contact")
        : "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const linkedin = config.social_linkedin;
  const github = config.social_github;
  const twitter = config.social_twitter;

  return (
    <aside className="flex flex-col gap-10">
      {/* Categorías */}
      {categories.length > 0 && (
        <div>
          <h3
            className="mb-4"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
            }}
          >
            {t("sidebar.categories")}
          </h3>
          <ul className="flex flex-col gap-1">
            <li>
              <button
                onClick={() => handleCategoryClick(null)}
                className="w-full flex items-center justify-between py-1.5 text-sm transition-colors"
                style={{ color: activeCategory === null ? "var(--primary-color)" : "var(--fg-mute)" }}
              >
                <span>{t("blog.filter.all")}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>{posts.length}</span>
              </button>
            </li>
            {categories.map((cat) => {
              const active = activeCategory === cat.slug;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="w-full flex items-center justify-between py-1.5 text-sm transition-colors"
                    style={{ color: active ? "var(--primary-color)" : "var(--fg-mute)" }}
                  >
                    <span>{pick(cat.name, cat.nameEn, locale)}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
                      {counts.get(cat.slug) ?? 0}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Redes sociales */}
      {(linkedin || github || twitter) && (
        <div>
          <h3
            className="mb-4"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
            }}
          >
            {t("sidebar.social")}
          </h3>
          <div className="flex flex-col gap-1">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact-social">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.16h4.56V23H.22V8.16zM8.34 8.16h4.37v2.02h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V23h-4.55v-7.21c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H8.34V8.16z" />
                </svg>
                LinkedIn
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="contact-social">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {twitter && (
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="contact-social">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M23.44 4.83c-.8.37-1.67.61-2.58.72a4.48 4.48 0 0 0 1.97-2.48c-.87.52-1.83.9-2.86 1.1a4.48 4.48 0 0 0-7.63 4.09A12.7 12.7 0 0 1 3.11 3.6a4.48 4.48 0 0 0 1.39 5.98c-.73-.02-1.42-.22-2.02-.56v.06c0 2.14 1.52 3.93 3.55 4.34a4.5 4.5 0 0 1-2.02.08c.57 1.77 2.22 3.06 4.17 3.09A9 9 0 0 1 1 19.58a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.39-.01-.58a9.14 9.14 0 0 0 2.25-2.33l-.01-.01z" />
                </svg>
                Twitter
              </a>
            )}
          </div>
        </div>
      )}

      {/* Contacto rápido */}
      <div>
        <h3
          className="mb-4"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--fg-faint)",
          }}
        >
          {t("sidebar.contact.title")}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="sidebar-name">{t("contact.name")}</label>
            <input
              id="sidebar-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="sidebar-email">{t("contact.email")}</label>
            <input
              id="sidebar-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="sidebar-message">{t("contact.message")}</label>
            <textarea
              id="sidebar-message"
              name="message"
              required
              rows={3}
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn-submit w-full justify-center"
            disabled={status === "loading"}
            style={status === "loading" ? { opacity: 0.6 } : undefined}
          >
            {status === "loading" ? t("contact.sending") : t("contact.send")}
            <span className="arrow" aria-hidden>→</span>
          </button>
          {status === "success" && (
            <p
              className="mt-4 rounded-lg border px-3 py-2 text-xs"
              style={{ borderColor: "var(--primary-color)", color: "var(--primary-color)" }}
              role="status"
            >
              {t("contact.success")}
            </p>
          )}
          {status === "error" && (
            <p
              className="mt-4 rounded-lg border px-3 py-2 text-xs"
              style={{ borderColor: "#f87171", color: "#f87171" }}
              role="alert"
            >
              {t("contact.error")}
            </p>
          )}
        </form>
      </div>
    </aside>
  );
}
