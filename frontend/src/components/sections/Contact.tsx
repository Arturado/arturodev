"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";

const EASE = [0.2, 0.8, 0.2, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function Contact({ config }: { config: SiteConfig }) {
  const { t } = useLanguage();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const email = config.site_email || "arturados@gmail.com";
  const linkedin =
    config.social_linkedin || "https://www.linkedin.com/in/arturo-vasquez/";
  const github = config.social_github || "https://github.com/Arturado";

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

  return (
    <section id="contacto">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="section-num">{t("contact.pre")}</div>
            <h2 className="section-title">
              {t("contact.title")} <em>{t("contact.title.em")}</em>
            </h2>
          </div>
          <p className="section-lede">{t("contact.lede")}</p>
        </motion.div>

        <div className="contact-grid">
          {/* Formulario */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="form-field">
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder=" "
                required
                value={form.name}
                onChange={handleChange}
              />
              <label htmlFor="contact-name">{t("contact.name")}</label>
              <span className="form-field-num">01</span>
            </div>
            <div className="form-field">
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder=" "
                required
                value={form.email}
                onChange={handleChange}
              />
              <label htmlFor="contact-email">{t("contact.email")}</label>
              <span className="form-field-num">02</span>
            </div>
            <div className="form-field">
              <textarea
                id="contact-message"
                name="message"
                placeholder=" "
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
              />
              <label htmlFor="contact-message">{t("contact.message")}</label>
              <span className="form-field-num">03</span>
            </div>

            <div className="form-actions">
              <span className="captcha-note">{t("contact.captcha")}</span>
              <button
                type="submit"
                className="btn-submit"
                disabled={status === "loading"}
                style={status === "loading" ? { opacity: 0.6 } : undefined}
              >
                {status === "loading" ? t("contact.sending") : t("contact.send")}
                <span className="arrow" aria-hidden>
                  →
                </span>
              </button>
            </div>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-lg border px-4 py-3 text-sm"
                style={{
                  borderColor: "var(--primary-color)",
                  color: "var(--primary-color)",
                }}
                role="status"
              >
                {t("contact.success")}
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-lg border px-4 py-3 text-sm"
                style={{ borderColor: "#f87171", color: "#f87171" }}
                role="alert"
              >
                {t("contact.error")}
              </motion.p>
            )}
          </motion.form>

          {/* Datos de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          >
            <a href={`mailto:${email}`} className="contact-mail">
              {email}
            </a>
            <div className="mb-8 flex flex-wrap gap-3">
              {[
                { label: "LinkedIn", href: linkedin },
                { label: "GitHub", href: github },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border px-5 py-2.5 text-sm transition-colors duration-300"
                  style={{ borderColor: "var(--line-strong)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary-color)";
                    e.currentTarget.style.color = "var(--primary-color)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--line-strong)";
                    e.currentTarget.style.color = "";
                  }}
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
            <div className="contact-meta">
              <div>
                {t("contact.available")} — {config.site_available || "Q3 2026"}
              </div>
              <div>
                {t("contact.timezone")} — {config.site_location || "GMT-4"}
              </div>
              <div>
                {t("contact.response")} — {t("contact.response.time")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
