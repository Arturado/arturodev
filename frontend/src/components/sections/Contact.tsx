"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import type { SiteConfig } from "@/data/config";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick } from "@/utils/i18n";

const EASE = [0.2, 0.8, 0.2, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

const services = [
  { value: "", label: { es: "¿En qué puedo ayudarte?", en: "How can I help you?" } },
  { value: "wordpress", label: { es: "Desarrollo WordPress / WooCommerce", en: "WordPress / WooCommerce Development" } },
  { value: "ecommerce", label: { es: "E-commerce (Magento / Shopify)", en: "E-commerce (Magento / Shopify)" } },
  { value: "webapp", label: { es: "Aplicación web (React / Next.js)", en: "Web Application (React / Next.js)" } },
  { value: "api", label: { es: "API / Backend (NestJS / Node.js)", en: "API / Backend (NestJS / Node.js)" } },
  { value: "automatizacion", label: { es: "Automatización / Integraciones", en: "Automation / Integrations" } },
  { value: "consultoria", label: { es: "Consultoría técnica", en: "Technical consulting" } },
  { value: "otro", label: { es: "Otro", en: "Other" } },
];

export default function Contact({ config }: { config: SiteConfig }) {
  const { t, locale } = useLanguage();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const email = config.site_email || "arturados@gmail.com";
  const linkedin =
    config.social_linkedin || "https://www.linkedin.com/in/arturo-vasquez/";
  const github = config.social_github || "https://github.com/Arturado";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const recaptchaToken = executeRecaptcha
        ? await executeRecaptcha("contact")
        : "";
      const serviceLabel = services.find((s) => s.value === form.service)?.label;
      const message = serviceLabel
        ? `[${pick(serviceLabel.es, serviceLabel.en, locale)}]\n\n${form.message}`
        : form.message;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message, recaptchaToken }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setForm({ name: "", email: "", service: "", message: "" });
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
              <label htmlFor="contact-name">{t("contact.name")}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">{t("contact.email")}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-service">{t("contact.service")}</label>
              <select
                id="contact-service"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                {services.map((s) => (
                  <option key={s.value} value={s.value}>
                    {pick(s.label.es, s.label.en, locale)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">{t("contact.message")}</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
              />
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
            <div className="mb-8 flex flex-col">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.16h4.56V23H.22V8.16zM8.34 8.16h4.37v2.02h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V23h-4.55v-7.21c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H8.34V8.16z" />
                </svg>
                LinkedIn
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
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
