#!/bin/bash
# Script de dÃ©ploiement pour RedHat
echo "========================================="
echo " DÃ©ploiement Bank Card Stock Management"
echo "========================================="

# Installer Node.js si nÃ©cessaire
if ! command -v node &> /dev/null; then
    echo "Installation de Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
fi

# Installer PostgreSQL si nÃ©cessaire
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
sed -i 's/localhost-development-secret-key-2024/production-secret-key-/g' .env
sed -i 's/NODE_ENV=development/NODE_ENV=production/g' .env

# Installer les dÃ©pendances backend
echo "Installation des dÃ©pendances backend..."
cd backend
npm install --production
npm run generate
npm run build

# CrÃ©er la base de donnÃ©es
echo "Configuration de la base de donnÃ©es..."
sudo -u postgres createdb bank_card_db
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

# ExÃ©cuter les migrations
npm run migrate:prod
npm run seed

cd ..

# Installer les dÃ©pendances frontend
echo "Installation des dÃ©pendances frontend..."
cd frontend
npm install
npm run build

cd ..

echo "========================================="
echo " DÃ©ploiement terminÃ©!"
echo "========================================="
echo ""
echo "Pour dÃ©marrer l'application:"
echo "1. Backend: cd backend && npm start"
echo "2. Frontend: servir le dossier frontend/dist"
echo ""
