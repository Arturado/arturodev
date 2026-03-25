#  DevFolio CMS by: Arturodev.info

Portfolio personal + CMS administrable. Stack moderno, deploy simple.

## Stack

- **Frontend**: Next.js 16 + Tailwind CSS + Framer Motion
- **Backend**: Nest.js + Prisma ORM
- **Base de datos**: PostgreSQL
- **Editor**: TipTap
- **Imágenes**: Cloudinary
- **Email**: Resend

## Setup rápido (Docker)

### 1. Cloná el repo
```bash
git clone https://github.com/TU_USUARIO/devfolio.git
cd devfolio
```

### 2. Configurá las variables de entorno
```bash
cp .env.example .env
```

Editá `.env` con tus valores:
```env
RESEND_API_KEY=       # https://resend.com
CONTACT_EMAIL=        # tu@email.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=   # https://cloudinary.com
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 3. Corré el setup
```bash
./setup.sh
```

Esto levanta todos los servicios, corre las migraciones y crea tu usuario admin.

### 4. Listo!

-  Portfolio: http://localhost:3000
-  Panel admin: http://localhost:3000/admin
-  API: http://localhost:4000/api

## Setup manual (sin Docker)

### Requisitos

- Node 20+
- PostgreSQL 14+

### Backend
```bash
cd backend
cp .env.example .env   # configurá DATABASE_URL y JWT_SECRET
npm install
npx prisma migrate dev
npm run start:dev
```

### Frontend
```bash
cd frontend
cp .env.example .env   # configurá NEXT_PUBLIC_API_URL
npm install
npm run dev
```

## Panel de administración

Desde `/admin` podés gestionar:

- **Proyectos** — CRUD + imágenes + drag & drop para reordenar
- **Blog** — editor rich text TipTap con soporte de imágenes
- **Experiencia** — laboral, educación y certificaciones
- **Mensajes** — bandeja de contacto
- **Configuración** — nombre, bio, redes sociales, secciones visibles

## Personalización

Todo se configura desde el panel en `/admin/settings`:

- Nombre y título profesional
- Bio / descripción
- Redes sociales
- Secciones visibles (portfolio, blog, experiencia)
- Color primario

## Deploy en producción

Ver [DEPLOY.md](./DEPLOY.md) para guía completa de deploy en VPS con nginx + PM2.

## Contribuir

Este proyecto está pensado como base cloneable. PRs bienvenidos.

## Licencia

MIT