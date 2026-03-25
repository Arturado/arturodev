#  Guía de Deploy en VPS 

## Requisitos del servidor

- Ubuntu 22.04
- 1GB RAM mínimo
- Node 20 (via NVM)
- PostgreSQL 14+
- nginx
- PM2

## 1. Clonar el repo en el servidor
```bash
cd /var/www
git clone git@github.com:TU_USUARIO/devfolio.git
cd devfolio
```

## 2. Configurar variables de entorno
```bash
# Backend
cp backend/.env.example backend/.env
nano backend/.env

# Frontend
cp frontend/.env.example frontend/.env.local
nano frontend/.env.local
```

## 3. Instalar dependencias y migrar DB
```bash
cd backend
npm install
npx prisma migrate deploy
npx prisma generate
npm run build

cd ../frontend
npm install
npm run build
```

## 4. Levantar con PM2
```bash
cd backend
pm2 start dist/main.js --name "devfolio-backend"

cd ../frontend
pm2 start npm --name "devfolio-frontend" -- start

pm2 save
pm2 startup
```

## 5. Configurar nginx
```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 6. SSL con Cloudflare

Apuntá los DNS a tu servidor y activá el proxy de Cloudflare.
En SSL/TLS → Overview → Flexible.

## 7. GitHub Actions (deploy automático)

Agregá estos secrets en tu repo:
- `SERVER_HOST` — IP del servidor
- `SERVER_USER` — usuario SSH (root)
- `SERVER_SSH_KEY` — clave privada SSH