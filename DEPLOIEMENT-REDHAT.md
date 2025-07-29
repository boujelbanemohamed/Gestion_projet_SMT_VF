# 🚀 Guide de Déploiement sur Serveur RedHat

## 📋 **Étapes de Transfert et Déploiement**

### **1. Préparation sur Windows**

```powershell
# Exécuter le script de préparation
.\prepare-for-transfer.ps1
```

Cela va créer :
- 📁 `bank-card-transfer/` - Dossier avec tous les fichiers
- 📦 `bank-card-stock-management.zip` - Archive prête pour transfert

### **2. Transfert vers RedHat**

#### **Option A: SCP (Recommandé)**
```bash
# Depuis Windows (avec OpenSSH ou Git Bash)
scp bank-card-stock-management.zip user@redhat-server:/tmp/

# Ou avec WinSCP (interface graphique)
```

#### **Option B: SFTP**
```bash
sftp user@redhat-server
put bank-card-stock-management.zip /tmp/
quit
```

#### **Option C: Via Git (si vous avez un repo)**
```bash
# Sur Windows
git add .
git commit -m "Préparation pour déploiement RedHat"
git push origin main

# Sur RedHat
git clone https://github.com/votre-repo/bank-card-stock-management.git
```

### **3. Installation sur RedHat**

Connectez-vous au serveur RedHat :
```bash
ssh user@redhat-server
```

#### **3.1 Extraction et préparation**
```bash
# Aller dans le répertoire de déploiement
cd /opt
sudo mkdir bank-card-stock-management
sudo chown $USER:$USER bank-card-stock-management

# Extraire l'archive
cd /tmp
unzip bank-card-stock-management.zip
mv bank-card-transfer/* /opt/bank-card-stock-management/
cd /opt/bank-card-stock-management
```

#### **3.2 Rendre le script exécutable**
```bash
chmod +x deploy-redhat.sh
```

#### **3.3 Exécuter le déploiement**
```bash
# Exécution automatique
sudo ./deploy-redhat.sh

# OU installation manuelle (voir section suivante)
```

### **4. Installation Manuelle (Alternative)**

#### **4.1 Installer Node.js**
```bash
# RedHat/CentOS/RHEL 8+
sudo dnf install -y nodejs npm

# RedHat/CentOS/RHEL 7
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

#### **4.2 Installer PostgreSQL**
```bash
# RedHat/CentOS/RHEL 8+
sudo dnf install -y postgresql postgresql-server postgresql-contrib

# RedHat/CentOS/RHEL 7
sudo yum install -y postgresql postgresql-server postgresql-contrib

# Initialiser la base
sudo postgresql-setup initdb
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

#### **4.3 Configurer PostgreSQL**
```bash
# Changer le mot de passe postgres
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

# Créer la base de données
sudo -u postgres createdb bank_card_db

# Configurer l'authentification (optionnel)
sudo nano /var/lib/pgsql/data/pg_hba.conf
# Changer 'ident' en 'md5' pour les connexions locales
sudo systemctl restart postgresql
```

#### **4.4 Configurer l'environnement**
```bash
cd /opt/bank-card-stock-management

# Copier et modifier .env
cp .env.example .env
nano .env

# Modifier ces valeurs :
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bank_card_db"
# JWT_SECRET="votre-secret-production-securise"
# NODE_ENV=production
```

#### **4.5 Installer et démarrer le backend**
```bash
cd backend

# Installer les dépendances
npm install --production

# Générer le client Prisma
npm run generate

# Compiler TypeScript
npm run build

# Exécuter les migrations
npm run migrate:prod

# Peupler la base avec les données initiales
npm run seed

# Tester le démarrage
npm start
```

#### **4.6 Installer et builder le frontend**
```bash
cd ../frontend

# Installer les dépendances
npm install

# Builder pour production
npm run build
```

### **5. Configuration en tant que Service**

#### **5.1 Créer un utilisateur système**
```bash
sudo useradd -r -s /bin/false bankcard
sudo chown -R bankcard:bankcard /opt/bank-card-stock-management
```

#### **5.2 Installer le service systemd**
```bash
sudo cp bankcard-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable bankcard-backend
sudo systemctl start bankcard-backend

# Vérifier le statut
sudo systemctl status bankcard-backend
```

### **6. Configuration Nginx (Frontend)**

#### **6.1 Installer Nginx**
```bash
# RedHat/CentOS/RHEL 8+
sudo dnf install -y nginx

# RedHat/CentOS/RHEL 7
sudo yum install -y nginx
```

#### **6.2 Configurer Nginx**
```bash
sudo cp nginx-bankcard.conf /etc/nginx/conf.d/
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl start nginx
```

### **7. Configuration Firewall**

```bash
# Ouvrir les ports nécessaires
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=5000/tcp
sudo firewall-cmd --reload
```

### **8. Vérification du Déploiement**

```bash
# Vérifier les services
sudo systemctl status postgresql
sudo systemctl status bankcard-backend
sudo systemctl status nginx

# Tester l'API
curl http://localhost:5000/api/health

# Tester l'application complète
curl http://localhost/
```

### **9. Accès à l'Application**

- **URL:** `http://votre-serveur-redhat/`
- **API:** `http://votre-serveur-redhat/api/`

**Comptes par défaut :**
- **Super Admin:** admin@admin.com / admin123
- **Utilisateur:** user@example.com / user123

### **🔧 Dépannage**

#### **Logs à vérifier :**
```bash
# Logs du backend
sudo journalctl -u bankcard-backend -f

# Logs Nginx
sudo tail -f /var/log/nginx/error.log

# Logs PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-*.log
```

#### **Problèmes courants :**
- **Port 5000 occupé :** Changer le port dans .env
- **Connexion DB échouée :** Vérifier PostgreSQL et les credentials
- **Permissions :** Vérifier les droits sur `/opt/bank-card-stock-management`

### **🚀 Optimisations Production**

1. **SSL/HTTPS :** Configurer Let's Encrypt
2. **Monitoring :** Installer PM2 ou utiliser systemd
3. **Backup :** Configurer des sauvegardes automatiques de la DB
4. **Sécurité :** Configurer SELinux et iptables

**Déploiement terminé ! 🎉**
