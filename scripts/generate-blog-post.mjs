import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const backendUrl = process.env.BACKEND_URL || "https://api.arturodev.info/api";
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!apiKey) {
  console.error("❌ Error: GEMINI_API_KEY no está configurada.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const CATEGORIAS = [
  "Desarrollo Web",
  "Frontend & UI",
  "DevOps & Docker",
  "Buenas Prácticas & Arquitectura"
];

// Función para autenticarse en NestJS y obtener el JWT Token
async function getAuthToken() {
  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL y ADMIN_PASSWORD deben estar configurados.");
  }

  const res = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: adminPassword }),
  });

  if (!res.ok) {
    throw new Error(`Error en Login Backend (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token || data.token; // Ajusta según la respuesta de tu /auth/login
}

async function generarPost() {
  const categoria = CATEGORIAS[Math.floor(Math.random() * CATEGORIAS.length)];
  console.log(`🚀 Generando artículo para la categoría: "${categoria}"...`);

  const model = genAI.getGenerativeModel({ 
    model: "gemini-3.5-flash",
    generationConfig: { responseMimeType: "application/json" } 
  });

  const prompt = `
    Actúa como un desarrollador de software experto y técnico.
    Escribe un artículo de blog estructurado en español sobre la categoría: "${categoria}".
    
    Responde ÚNICAMENTE con un objeto JSON respetando exactamente estas claves para Prisma:
    {
      "title": "Título atractivo y técnico",
      "slug": "titulo-atractivo-y-tecnico",
      "summary": "Resumen corto para el feed y SEO",
      "category": "${categoria}",
      "tags": ["tag1", "tag2"],
      "content": "Contenido completo en Markdown técnico con ejemplos de código.",
      "published": false
    }
  `;

  try {
    // 1. Obtener Token de Administrador
    console.log("🔑 Autenticando en el backend...");
    const token = await getAuthToken();

    // 2. Generar Contenido con Gemini
    const result = await model.generateContent(prompt);
    const postPayload = JSON.parse(result.response.text());

    console.log(`📡 Publicando borrador: "${postPayload.title}"...`);

    // 3. Enviar a NestJS (PostsController)
    const response = await fetch(`${backendUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(postPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error NestJS (${response.status}): ${errorText}`);
    }

    const savedPost = await response.json();
    console.log(`✅ ¡Artículo creado en Prisma/BD exitosamente! ID: ${savedPost.id}`);

  } catch (error) {
    console.error("❌ Error en el proceso:", error);
    process.exit(1);
  }
}

generarPost();