"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import type { Comment } from "@/data/comments";
import { useLanguage } from "@/contexts/LanguageContext";

const EASE = [0.2, 0.8, 0.2, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function CommentSection({
  postId,
  comments,
}: {
  postId: string;
  comments: Comment[];
}) {
  const { t, locale } = useLanguage();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [list, setList] = useState(comments);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const recaptchaToken = executeRecaptcha
        ? await executeRecaptcha("comment")
        : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, ...form, recaptchaToken }),
        }
      );
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setForm({ name: "", email: "", content: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-16 border-t pt-12" style={{ borderColor: "var(--line)" }}>
      <h2
        className="mb-8"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: "-0.02em",
        }}
      >
        {t("comments.title")} ({list.length})
      </h2>

      <div className="mb-12 space-y-6">
        {list.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--fg-faint)",
            }}
          >
            {t("comments.empty")}
          </p>
        ) : (
          list.map((c) => (
            <motion.div
              key={c.id}
              className="flex gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ background: "var(--primary-color)" }}
              >
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-semibold" style={{ color: "var(--fg)" }}>
                    {c.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--fg-faint)",
                    }}
                  >
                    {formatDate(c.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm" style={{ color: "var(--fg-mute)" }}>
                  {c.content}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="border-t pt-10" style={{ borderColor: "var(--line)" }}>
        <h3
          className="mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          {t("comments.form.title")}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="comment-name">{t("comments.form.name")}</label>
            <input
              id="comment-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="comment-email">{t("comments.form.email")}</label>
            <input
              id="comment-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="comment-content">{t("comments.form.content")}</label>
            <textarea
              id="comment-content"
              name="content"
              required
              rows={4}
              value={form.content}
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
              {status === "loading" ? t("comments.form.sending") : t("comments.form.submit")}
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
              style={{ borderColor: "var(--primary-color)", color: "var(--primary-color)" }}
              role="status"
            >
              {t("comments.form.success")}
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
              {t("comments.form.error")}
            </motion.p>
          )}
        </form>
      </div>
    </div>
  );
}
