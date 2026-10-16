import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const backendUrl = process.env.BACKEND_URL || "https://api.arturodev.info/api";
const blogApiSecret = process.env.BLOG_API_SECRET;

if (!apiKey) {
  console.error("❌ Error: GEMINI_API_KEY no está configurada.");
  process.exit(1);
}

if (!blogApiSecret) {
  console.error("❌ Error: BLOG_API_SECRET no está configurada.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const CATEGORIAS = [
  "Desarrollo Web",
  "Frontend & UI",
  "DevOps & Docker",
  "Buenas Prácticas & Arquitectura"
];

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
    // 1. Generar Contenido con Gemini
    console.log("🤖 Solicitando generación de contenido a Gemini...");
    const result = await model.generateContent(prompt);
    const postPayload = JSON.parse(result.response.text());

    console.log(`📡 Publicando borrador: "${postPayload.title}"...`);

    // 2. Enviar a NestJS pasando la clave en x-api-key y Bearer (compatibles con ApiKeyGuard)
    const response = await fetch(`${backendUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": blogApiSecret,
        "Authorization": `Bearer ${blogApiSecret}`
      },
      body: JSON.stringify(postPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error NestJS (${response.status}): ${errorText}`);
    }

    const savedPost = await response.json();
    console.log(`✅ ¡Artículo creado en Prisma/BD exitosamente! ID: ${savedPost.id || savedPost.slug}`);

  } catch (error) {
    console.error("❌ Error en el proceso:", error);
    process.exit(1);
  }
}

generarPost();