#!/bin/bash

echo " Bienvenido al setup de Arturodev Portfolio CMS"
echo "=================================================="

# Verificar dependencias
command -v docker >/dev/null 2>&1 || { echo "Docker no está instalado."; exit 1; }
command -v docker compose >/dev/null 2>&1 || { echo " Docker Compose no está instalado."; exit 1; }

# Crear .env si no existe
if [ ! -f .env ]; then
  echo " Creando archivo .env desde .env.example..."
  cp .env.example .env

  # Generar secrets aleatorios
  DB_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 32)
  JWT_SEC=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 48)

  sed -i "s/tu_password_segura/$DB_PASS/" .env
  sed -i "s/un_string_largo_y_seguro/$JWT_SEC/" .env

  echo ".env creado con secrets generados automáticamente"
else
  echo " .env ya existe, usando el existente"
fi

# Levantar servicios
echo ""
echo "Levantando servicios con Docker Compose..."
docker compose up -d --build

# Esperar a que postgres esté listo
echo " Esperando base de datos..."
sleep 10

# Crear usuario admin
echo ""
echo " Configurando usuario admin..."
read -p "Email del admin: " ADMIN_EMAIL
read -s -p "Password del admin: " ADMIN_PASSWORD
echo ""

HASH=$(docker exec arturodev_backend node -e "
const bcrypt = require('bcryptjs');
bcrypt.hash('$ADMIN_PASSWORD', 10).then(h => console.log(h));
")

docker exec arturodev_db psql -U arturodev_user -d arturodev -c "
INSERT INTO \"User\" (id, email, password, \"createdAt\")
VALUES ('admin-1', '$ADMIN_EMAIL', '$HASH', NOW())
ON CONFLICT (email) DO NOTHING;
"

echo ""
echo " Setup completo!"
echo ""
echo " Frontend: http://localhost:3000"
echo " Panel admin: http://localhost:3000/admin"
echo " API: http://localhost:4000/api"
echo ""
echo "Entrá al panel con: $ADMIN_EMAIL"