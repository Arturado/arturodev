"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger, onScroll } from "animejs";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import type { SiteConfig } from "@/data/config";

export default function Contact({ config }: { config: SiteConfig }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const email    = config?.site_email    || "hola@arturodev.info";
  const location = config?.site_location || "Mexico City · GMT-6";
  const available = config?.site_available || "Open to remote / contract";

  useEffect(() => {
    if (!formRef.current) return;
    const ctrl = animate(formRef.current.querySelectorAll(".form-field, .form-actions"), {
      opacity: [0, 1], translateY: [30, 0],
      delay: stagger(80), duration: 800, ease: "outExpo",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      autoplay: onScroll({ target: formRef.current, enter: "bottom-=10% top", once: true } as any),
    });
    return () => { ctrl.pause(); };
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);

    let token = "";
    if (executeRecaptcha) {
      token = await executeRecaptcha("contact");
    }

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    data.get("name"),
        email:   data.get("email"),
        company: data.get("company"),
        message: data.get("message"),
        token,
      }),
    });

    setSent(true);
    setSubmitting(false);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">06 / CONTACT</div>
            <h2 className="section-title">Let&apos;s <em>build</em></h2>
          </div>
          <p className="section-lede">Disponible para nuevas colaboraciones. Mandá unas líneas sobre lo que estás construyendo.</p>
        </div>

        <div className="contact-grid">
          <div>
            <h3 className="contact-headline">Tell me about your <em>project.</em></h3>
            <a className="contact-mail" href={`mailto:${email}`}>{email} →</a>
            <div className="contact-meta">
              <div>— Replies within 24h</div>
              <div>— {location}</div>
              <div>— {available}</div>
            </div>
          </div>

          <form ref={formRef} onSubmit={onSubmit}>
            <div className="form-field">
              <input type="text" id="f-name" name="name" placeholder=" " required />
              <label htmlFor="f-name">01 — Tu nombre</label>
              <span className="form-field-num">/ required</span>
            </div>
            <div className="form-field">
              <input type="email" id="f-email" name="email" placeholder=" " required />
              <label htmlFor="f-email">02 — Email</label>
              <span className="form-field-num">/ required</span>
            </div>
            <div className="form-field">
              <input type="text" id="f-co" name="company" placeholder=" " />
              <label htmlFor="f-co">03 — Empresa / estudio</label>
              <span className="form-field-num">/ optional</span>
            </div>
            <div className="form-field">
              <textarea id="f-msg" name="message" placeholder=" " required />
              <label htmlFor="f-msg">04 — Cuéntame</label>
              <span className="form-field-num">/ required</span>
            </div>
            <div className="form-actions">
              <span className="captcha-note">Protected by reCAPTCHA v3</span>
              <button className="btn-submit" type="submit" disabled={submitting || sent}>
                <span>{sent ? "Enviado ✓" : submitting ? "Enviando…" : "Send message"}</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
