import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Nota: el modelo Post no tiene campo de imagen; excerpt/readTime/tags son
// requeridos por el schema, por eso se derivan aquí en lugar de venir del brief.
const posts = [
  {
    title: 'Cómo configurar Docker para proyectos WordPress desde cero',
    slug: 'docker-wordpress-desde-cero',
    content:
      '<p>Docker cambió la forma en que desarrollo localmente...</p><p>En este post te explico cómo levantar un ambiente WordPress completo con Docker Compose, incluyendo base de datos, phpMyAdmin y el sitio en minutos.</p><p>La clave está en definir correctamente los volúmenes y las variables de entorno para que no pierdas datos entre reinicios.</p>',
    tags: ['Docker', 'WordPress', 'DevOps'],
    published: true,
  },
  {
    title: 'NestJS + Prisma: Setup desde cero para una API REST',
    slug: 'nestjs-prisma-setup-api-rest',
    content:
      '<p>NestJS es mi framework preferido para construir APIs en Node.js. Su estructura modular y su integración con TypeScript lo hacen ideal para proyectos serios.</p><p>Combinado con Prisma como ORM, tenés un stack muy poderoso que te permite iterar rápido sin sacrificar robustez.</p><p>En este post vemos cómo configurar un proyecto desde cero: módulos, controladores, servicios y la conexión a PostgreSQL.</p>',
    tags: ['NestJS', 'Prisma', 'API'],
    published: true,
  },
  {
    title: 'Automatización con n8n: conectando WooCommerce con MercadoLibre',
    slug: 'n8n-woocommerce-mercadolibre',
    content:
      '<p>n8n es una de las herramientas más potentes para automatizar flujos de trabajo sin código, o con poco código cuando lo necesitás.</p><p>En este caso práctico te muestro cómo sincronizar stock entre WooCommerce y MercadoLibre automáticamente cada vez que se realiza una venta.</p><p>El resultado: ahorramos horas de trabajo manual y eliminamos errores de inventario.</p>',
    tags: ['n8n', 'WooCommerce', 'Automatización'],
    published: true,
  },
  {
    title: 'WordPress headless con Next.js: cuándo tiene sentido y cuándo no',
    slug: 'wordpress-headless-nextjs',
    content:
      '<p>El stack WordPress headless + Next.js se puso de moda, pero no siempre es la solución correcta. En este post analizo cuándo conviene adoptarlo y cuándo es un over-engineering innecesario.</p><p>La clave está en entender si el proyecto realmente necesita el rendimiento y la flexibilidad de un frontend desacoplado, o si un tema bien optimizado resuelve el problema más rápido.</p><p>Te doy mi opinión honesta después de haberlo implementado en proyectos reales.</p>',
    tags: ['WordPress', 'Next.js', 'Arquitectura'],
    published: true,
  },
];

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function readTime(html: string): string {
  const words = stripHtml(html).split(' ').length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

async function main() {
  for (const post of posts) {
    const data = {
      ...post,
      excerpt: stripHtml(post.content).slice(0, 120),
      readTime: readTime(post.content),
    };
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: data,
      create: data,
    });
    console.log(`✓ ${post.slug}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
