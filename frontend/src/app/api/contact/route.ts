import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    const data = await res.json();
    return data.success && data.score >= 0.5;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const { name, email, message, recaptchaToken } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  if (!recaptchaToken) {
    return NextResponse.json({ error: "reCAPTCHA requerido" }, { status: 400 });
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return NextResponse.json({ error: "reCAPTCHA inválido" }, { status: 400 });
  }

  try {
    const dbRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    console.log("DB response status:", dbRes.status);

    await resend.emails.send({
      from: "Arturo <hola@arturodev.info>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">Nuevo mensaje desde arturodev.info</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; color: #666; width: 100px;">Nombre</td>
              <td style="padding: 8px; font-weight: bold;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; color: #666;">Email</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; color: #666; vertical-align: top;">Mensaje</td>
              <td style="padding: 8px;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error enviando mensaje" }, { status: 500 });
  }
}