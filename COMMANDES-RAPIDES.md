# ⚡ Commandes Rapides - Transfert vers RedHat

## 🚀 **Transfert Automatique (Recommandé)**

### **Sur Windows :**
```powershell
# 1. Préparer le projet
.\prepare-for-transfer.ps1

# 2. Transférer vers RedHat (remplacez IP et utilisateur)
.\transfer-to-redhat.ps1 -ServerIP "192.168.1.100" -Username "votre-user"
```

### **Sur RedHat :**
```bash
# 3. Se connecter au serveur
ssh votre-user@192.168.1.100

# 4. Déployer rapidement
cd /tmp
chmod +x quick-deploy.sh
./quick-deploy.sh

# 5. Installation complète
cd /opt/bank-card-stock-management
sudo ./deploy-redhat.sh
```

---

## 🔧 **Transfert Manuel**

### **Préparation Windows :**
```powershell
# Créer l'archive
.\prepare-for-transfer.ps1

# Transfert SCP
scp bank-card-stock-management.zip user@server:/tmp/

# Ou avec WinSCP (GUI)
```

### **Installation RedHat :**
```bash
# Extraction
cd /tmp
unzip bank-card-stock-management.zip
sudo mv bank-card-transfer /opt/bank-card-stock-management

# Installation des prérequis
sudo dnf install -y nodejs npm postgresql postgresql-server

# Configuration PostgreSQL
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo -u postgres createdb bank_card_db

# Déploiement application
cd /opt/bank-card-stock-management
chmod +x deploy-redhat.sh
sudo ./deploy-redhat.sh
```

---

## 🌐 **Vérification Rapide**

```bash
# Vérifier les services
systemctl status postgresql
systemctl status bankcard-backend
systemctl status nginx

# Tester l'API
curl http://localhost:5000/api/health

# Tester l'application
curl http://localhost/
```

---

## 🔑 **Accès Application**

- **URL :** `http://votre-serveur/`
- **Admin :** admin@admin.com / admin123
- **User :** user@example.com / user123

---

## 🚨 **Dépannage Express**

```bash
# Logs backend
sudo journalctl -u bankcard-backend -f

# Redémarrer services
sudo systemctl restart bankcard-backend
sudo systemctl restart nginx

# Vérifier ports
netstat -tlnp | grep :5000
netstat -tlnp | grep :80
```

---

## 📁 **Structure après déploiement**

```
/opt/bank-card-stock-management/
├── backend/                 # API Node.js
├── frontend/               # Interface React
├── deploy-redhat.sh        # Script de déploiement
├── bankcard-backend.service # Service systemd
├── nginx-bankcard.conf     # Configuration Nginx
└── .env                    # Variables d'environnement
```

**C'est tout ! 🎉**
