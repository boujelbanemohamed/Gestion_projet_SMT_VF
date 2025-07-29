Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Préparation du projet pour transfert" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Créer un dossier de transfert
$transferDir = "bank-card-transfer"
if (Test-Path $transferDir) {
    Remove-Item $transferDir -Recurse -Force
}
New-Item -ItemType Directory -Path $transferDir

Write-Host "Copie des fichiers du projet..." -ForegroundColor Yellow

# Copier les fichiers essentiels (exclure node_modules, dist, etc.)
$excludePatterns = @(
    "node_modules",
    "dist",
    "build",
    ".next",
    "coverage",
    "*.log",
    ".env",
    "tmp",
    "cypress/downloads",
    "cypress/screenshots",
    "cypress/videos"
)

# Copier backend
Write-Host "- Backend..." -ForegroundColor Green
robocopy "backend" "$transferDir/backend" /E /XD node_modules dist coverage .nyc_output /XF *.log

# Copier frontend  
Write-Host "- Frontend..." -ForegroundColor Green
robocopy "frontend" "$transferDir/frontend" /E /XD node_modules dist build coverage /XF *.log

# Copier fichiers racine
Write-Host "- Fichiers de configuration..." -ForegroundColor Green
Copy-Item "README.md" "$transferDir/"
Copy-Item ".env.example" "$transferDir/"
Copy-Item ".gitignore" "$transferDir/"
Copy-Item "docker-compose.yml" "$transferDir/"
Copy-Item "LOCALHOST-QUICKSTART.md" "$transferDir/"
Copy-Item "setup-localhost.md" "$transferDir/"

# Copier .github si existe
if (Test-Path ".github") {
    robocopy ".github" "$transferDir/.github" /E
}

# Créer un fichier de déploiement pour RedHat
@"
#!/bin/bash
# Script de déploiement pour RedHat
echo "========================================="
echo " Déploiement Bank Card Stock Management"
echo "========================================="

# Installer Node.js si nécessaire
if ! command -v node &> /dev/null; then
    echo "Installation de Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
fi

# Installer PostgreSQL si nécessaire
if ! command -v psql &> /dev/null; then
    echo "Installation de PostgreSQL..."
    sudo yum install -y postgresql postgresql-server postgresql-contrib
    sudo postgresql-setup initdb
    sudo systemctl enable postgresql
    sudo systemctl start postgresql
fi

# Configurer l'environnement
echo "Configuration de l'environnement..."
cp .env.example .env

# Modifier .env pour production
sed -i 's/localhost-development-secret-key-2024/production-secret-key-$(date +%s)/g' .env
sed -i 's/NODE_ENV=development/NODE_ENV=production/g' .env

# Installer les dépendances backend
echo "Installation des dépendances backend..."
cd backend
npm install --production
npm run generate
npm run build

# Créer la base de données
echo "Configuration de la base de données..."
sudo -u postgres createdb bank_card_db
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

# Exécuter les migrations
npm run migrate:prod
npm run seed

cd ..

# Installer les dépendances frontend
echo "Installation des dépendances frontend..."
cd frontend
npm install
npm run build

cd ..

echo "========================================="
echo " Déploiement terminé!"
echo "========================================="
echo ""
echo "Pour démarrer l'application:"
echo "1. Backend: cd backend && npm start"
echo "2. Frontend: servir le dossier frontend/dist"
echo ""
"@ | Out-File -FilePath "$transferDir/deploy-redhat.sh" -Encoding UTF8

# Créer un fichier de service systemd
@"
[Unit]
Description=Bank Card Stock Management Backend
After=network.target postgresql.service

[Service]
Type=simple
User=bankcard
WorkingDirectory=/opt/bank-card-stock-management/backend
Environment=NODE_ENV=production
ExecStart=/usr/bin/node dist/server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
"@ | Out-File -FilePath "$transferDir/bankcard-backend.service" -Encoding UTF8

# Créer un fichier nginx pour le frontend
@"
server {
    listen 80;
    server_name your-domain.com;
    
    # Frontend
    location / {
        root /opt/bank-card-stock-management/frontend/dist;
        try_files `$uri `$uri/ /index.html;
    }
    
    # API Backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
        proxy_cache_bypass `$http_upgrade;
    }
}
"@ | Out-File -FilePath "$transferDir/nginx-bankcard.conf" -Encoding UTF8

# Créer une archive
Write-Host "Création de l'archive..." -ForegroundColor Yellow
Compress-Archive -Path "$transferDir/*" -DestinationPath "bank-card-stock-management.zip" -Force

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Préparation terminée!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Fichiers prêts pour le transfert:" -ForegroundColor Cyan
Write-Host "- Dossier: $transferDir" -ForegroundColor White
Write-Host "- Archive: bank-card-stock-management.zip" -ForegroundColor White
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Transférer l'archive vers le serveur RedHat" -ForegroundColor White
Write-Host "2. Extraire et exécuter deploy-redhat.sh" -ForegroundColor White
Write-Host ""
