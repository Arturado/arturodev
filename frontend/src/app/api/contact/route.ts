import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  try {
// Guardar en la DB via backend
const dbRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
});

console.log("DB response status:", dbRes.status);
const dbData = await dbRes.json();
console.log("DB response data:", dbData);

    // Enviar email
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