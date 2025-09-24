#!/usr/bin/env bash
set -euo pipefail

# ========= Paramètres à personnaliser =========
REPO_URL="https://github.com/boujelbanemohamed/Gestion_projet_SMT_VF.git"
BRANCH="main"
APP_DIR="/var/www/app"

DB_USER="appuser"
DB_PASS="MotDePassFort"
DB_NAME="appdb"
DB_HOST="127.0.0.1"
DB_PORT="5432"

# Nginx + Lets Encrypt
ENABLE_NGINX="true"
DOMAIN="gstock.monetiquetunisie.com"
ENABLE_LETSENCRYPT="true"
LETSENCRYPT_EMAIL="admin@monetiquetunisie.com"

# Node & PM2
NODE_VERSION="20"
PM2_APP_NAME="bank-stock"
# =============================================

echo "[1/10] Mise à jour du système et outils de base"
sudo dnf -y update
sudo dnf -y install git curl tar policycoreutils-python-utils firewalld
sudo systemctl enable --now firewalld || true

echo "[2/10] Installation de Node (nvm) et PM2"
if ! command -v nvm >/dev/null 2>&1; then
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install "${NODE_VERSION}"
nvm use "${NODE_VERSION}"
node -v
npm -v
npm i -g pm2

echo "[3/10] Installation et configuration PostgreSQL"
if ! command -v psql >/dev/null 2>&1; then
  sudo dnf module -y enable postgresql:15 || true
  sudo dnf -y install postgresql-server
  sudo postgresql-setup --initdb
  sudo systemctl enable --now postgresql
fi

echo "[3b] Création utilisateur/base PostgreSQL (idempotent)"
sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'" | grep -q 1 || sudo -u postgres psql -c "CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';"
sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1 || sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"

echo "[4/10] Clonage/MAJ du dépôt"
sudo mkdir -p "${APP_DIR}"
sudo chown -R "$USER":"$USER" "${APP_DIR}"
if [ ! -d "${APP_DIR}/.git" ]; then
  git clone "${REPO_URL}" "${APP_DIR}"
fi
cd "${APP_DIR}"
git fetch --all || true
git checkout "${BRANCH}" || true
git pull origin "${BRANCH}" || true

echo "[5/10] Dépendances Node"
npm ci
mkdir -p public/uploads

echo "[6/10] Configuration Prisma  PostgreSQL"
cat > .env <<EOF
DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
EOF

# Passe provider à postgresql si encore en sqlite
if grep -q 'provider = "sqlite"' prisma/schema.prisma; then
  cp prisma/schema.prisma prisma/schema.prisma.bak
  sed -i 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma
fi

npx prisma generate
# En prod sans migrations versionnées: db push (sinon: prisma migrate deploy)
npx prisma db push

echo "[7/10] Build et lancement PM2"
npm run build
if pm2 status "${PM2_APP_NAME}" >/dev/null 2>&1; then
  pm2 reload "${PM2_APP_NAME}" || true
else
  pm2 start npm --name "${PM2_APP_NAME}" -- start
fi
pm2 save
pm2 startup systemd -u "$USER" --hp "$HOME" | tee /tmp/pm2_startup.txt
# shellcheck disable=SC2046
sudo bash -c "$(grep 'sudo env PATH=' -m1 /tmp/pm2_startup.txt || true)"

echo "[8/10] (Optionnel) Nginx reverse proxy"
if [ "${ENABLE_NGINX}" = "true" ]; then
  sudo dnf -y install nginx
  sudo systemctl enable --now nginx
  sudo firewall-cmd --add-service=http --permanent
  sudo firewall-cmd --add-service=https --permanent
  sudo firewall-cmd --reload
  sudo setsebool -P httpd_can_network_connect 1

  if [ -n "${DOMAIN}" ]; then
    VHOST_FILE="/etc/nginx/conf.d/${DOMAIN}.conf"
    sudo bash -c "cat > ${VHOST_FILE}" <<NGINX
server {
  listen 80;
  server_name ${DOMAIN};

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
NGINX
    sudo nginx -t
    sudo systemctl reload nginx
    echo "Nginx configuré pour http://${DOMAIN}"
  else
    echo "Nginx installé. Pas de domaine fourni; accès http://<IP>:3000"
  fi
fi

echo "[9/10] (Optionnel) Lets Encrypt (Certbot) pour HTTPS"
if [ "${ENABLE_NGINX}" = "true" ] && [ "${ENABLE_LETSENCRYPT}" = "true" ] && [ -n "${DOMAIN}" ]; then
  sudo dnf -y install certbot python3-certbot-nginx
  if [ -n "${LETSENCRYPT_EMAIL}" ]; then
    sudo certbot --nginx --non-interactive --agree-tos -m "${LETSENCRYPT_EMAIL}" -d "${DOMAIN}"
  else
    echo "LETSENCRYPT_EMAIL vide  Certbot peut être interactif."
    sudo certbot --nginx -d "${DOMAIN}"
  fi
  systemctl status certbot-renew.timer >/dev/null 2>&1 && echo "Renouvellement auto actif (certbot-renew.timer)."
else
  echo "Lets Encrypt non exécuté (conditions non remplies)."
fi

echo "[10/10] Vérifications & Seed (optionnel)"
curl -s --max-time 5 http://127.0.0.1:3000/api/dashboard >/dev/null && echo "API dashboard OK" || echo "API dashboard non joignable."
# Seed de démo si souhaité :
# curl -X POST http://127.0.0.1:3000/api/users/seed || true

echo "Déploiement terminé."
if [ -n "${DOMAIN}" ]; then
  echo "Accédez à: https://${DOMAIN}"
else
  echo "Accédez à: http://<IP>:3000"
fi
echo "PM2 app: ${PM2_APP_NAME} (pm2 status, pm2 logs ${PM2_APP_NAME})"

