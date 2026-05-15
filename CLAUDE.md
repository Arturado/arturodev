# Arturodev - Portfolio CMS

## Descripción
Portfolio personal + CMS admin para arturodev.info. Monorepo con frontend (Next.js) y backend (Nest.js) separados.

---

## Estructura del proyecto

```
arturodev/
├── backend/          # API Nest.js — ⚠️ NO MODIFICAR SIN CONFIRMACIÓN EXPLÍCITA
│   ├── src/
│   │   ├── auth/         # Login admin (JWT, throttled 5 req/min, 1s delay on fail)
│   │   ├── config/       # Config del sitio (nombre, bio, redes)
│   │   ├── contact/      # Formulario contacto (reCAPTCHA server-side, score 0.7)
│   │   ├── experience/   # Experiencia laboral / timeline
│   │   ├── posts/        # Blog posts
│   │   ├── prisma/       # Prisma service
│   │   ├── projects/     # Proyectos del portfolio
│   │   └── main.ts
│   └── prisma/
│       └── schema.prisma  # Schema de la DB
├── frontend/         # Next.js 16 — ESTE ES EL QUE SE ESTÁ REDISEÑANDO
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/      # Panel admin (protegido con JWT)
│   │   │   ├── api/        # Route handlers (contacto, etc.)
│   │   │   ├── blog/       # Páginas del blog
│   │   │   ├── portfolio/  # Páginas de portfolio
│   │   │   ├── layout.tsx  # Root layout
│   │   │   ├── page.tsx    # Homepage (REDISEÑAR)
│   │   │   └── globals.css
│   │   ├── components/     # Componentes React
│   │   ├── data/           # Funciones de fetch a la API
│   │   │   ├── config.ts     # getConfig() → GET /api/config
│   │   │   ├── experience.ts # getExperience() → GET /api/experience
│   │   │   ├── posts.ts      # getPosts() → GET /api/posts
│   │   │   └── projects.ts   # getProjects() → GET /api/projects
│   │   └── lib/            # Utilidades (axios instance, etc.)
│   └── public/
│       └── images/
├── docker-compose.yml
├── CLAUDE.md          # ← Este archivo
├── DEPLOY.md
└── setup.sh
```

---

## Stack técnico

### Backend (NO TOCAR)
- Nest.js 11 + TypeScript
- PostgreSQL con Prisma ORM
- JWT auth (passport-jwt)
- Rate limiting (@nestjs/throttler): global 100 req/min, login 5 req/min
- bcryptjs para passwords

### Frontend (REDISEÑANDO)
- Next.js 16.2.1 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- **Anime.js v4** (NUEVO — reemplaza framer-motion)
- react-google-recaptcha-v3
- Cloudinary (next-cloudinary) para imágenes
- Resend para emails
- TipTap para editor rich text en admin
- @dnd-kit para drag & drop en admin
- axios para llamadas a la API

### Infraestructura
- VPS Donweb (IP: 66.97.43.6)
- Cloudflare (proxy + WAF + rate limiting en /api/contact)
- nginx como reverse proxy
- PM2 (ecosystem.config.js) para ambos servicios
- Docker Compose para desarrollo local

---

## Variables de entorno del frontend

```env
# API
API_URL=http://127.0.0.1:4000/api              # Server-side fetch (src/data/)
NEXT_PUBLIC_API_URL=http://localhost:4000/api    # Client-side fetch (axios)

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxx
RECAPTCHA_SECRET_KEY=xxx

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Email
RESEND_API_KEY=xxx
CONTACT_EMAIL=xxx
```

---

## Endpoints del backend

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | /api/config | Config del sitio (nombre, bio, avatar, redes) | No |
| GET | /api/projects | Lista de proyectos | No |
| GET | /api/projects/:id | Detalle de proyecto | No |
| GET | /api/posts | Lista de posts del blog | No |
| GET | /api/posts/:slug | Detalle de post | No |
| GET | /api/experience | Experiencia laboral | No |
| POST | /api/contact | Enviar mensaje (reCAPTCHA + rate limit) | No* |
| GET | /api/contact | Listar mensajes recibidos | JWT |
| POST | /api/auth/login | Login admin | No (throttled) |
| POST | /api/projects | Crear proyecto | JWT |
| PUT | /api/projects/:id | Editar proyecto | JWT |
| DELETE | /api/projects/:id | Borrar proyecto | JWT |
| POST | /api/posts | Crear post | JWT |
| PUT | /api/posts/:id | Editar post | JWT |
| DELETE | /api/posts/:id | Borrar post | JWT |

*El GET /api/contact está protegido con JwtAuthGuard

---

## Lo que estamos haciendo AHORA

### Objetivo
Rediseño completo del frontend público (homepage, portfolio, blog) basado en un handoff de Claude Design. El admin se mantiene intacto.

### Cambios principales
1. **Quitar framer-motion** → reemplazar con **Anime.js v4** (`npm i animejs`)
2. Integrar nuevo diseño con animaciones Anime.js (text reveal, stagger, scroll observer, marquee)
3. Usar `var(--primary-color)` como CSS variable para el color de acento en todo el sitio
4. Mantener la capa de datos existente (`src/data/*.ts`) — los componentes nuevos consumen las mismas funciones
5. Dark mode by default con toggle dark/light

### Reglas de integración
- Los archivos en `src/data/` ya funcionan bien — reutilizarlos, no reescribirlos
- `src/app/admin/` NO SE TOCA
- `src/app/api/` NO SE TOCA (route handlers de contacto)
- Los componentes de admin en `src/components/` que empiecen con "Admin" NO SE TOCAN
- `src/lib/` NO SE TOCA (tiene la instancia de axios configurada)
- Anime.js requiere `'use client'` en los componentes que lo usen
- Hover effects con `var(--primary-color)` usando inline style + onMouseEnter/Leave (patrón ya establecido en Hero.tsx)

---

## Convenciones de código

- Componentes en PascalCase: `HeroSection.tsx`, `ProjectCard.tsx`
- Archivos de datos en camelCase: `projects.ts`, `config.ts`
- CSS con Tailwind utility classes, globals.css solo para variables y base styles
- Imports con `@/` alias para `src/`
- Componentes client llevan `'use client'` al inicio
- Server components por defecto (page.tsx, layout.tsx) — fetch de datos aquí
- Los datos se pasan como props desde server components a client components

---

## Comandos útiles

```bash
# Frontend
cd frontend && npm run dev          # Dev server en :3000
cd frontend && npm run build        # Build producción

# Backend
cd backend && npm run start:dev     # Dev server en :4000

# Docker (desarrollo local)
docker-compose up                   # Levanta frontend + backend

# Instalar Anime.js (PENDIENTE)
cd frontend && npm install animejs && npm install -D @types/animejs
```
