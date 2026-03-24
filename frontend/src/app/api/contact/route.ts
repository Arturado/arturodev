import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  // Por ahora solo lo logueamos — después conectamos con Resend o Nodemailer
  console.log("Nuevo mensaje de contacto:", { name, email, message });

  return NextResponse.json({ ok: true });
}