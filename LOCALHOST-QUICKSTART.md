# 🚀 Localhost Quick Start

Get the Bank Card Stock Management System running on your local machine in minutes!

## ⚡ Super Quick Setup (Windows)

### Option 1: Automated Setup (Recommended)
```bash
# Run the setup script
.\setup-localhost.ps1

# Start backend (in one terminal)
.\start-backend.ps1

# Start frontend (in another terminal)  
.\start-frontend.ps1

# Open browser to: http://localhost:3000
```

### Option 2: Manual Setup
```bash
# 1. Copy environment file
cp .env.example .env

# 2. Create database
createdb bank_card_db

# 3. Setup backend
cd backend
npm install
npm run generate
npm run migrate
npm run seed
npm run dev

# 4. Setup frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 🔑 Login Credentials

### Super Admin
- **Email:** `admin@admin.com`
- **Password:** `admin123`
- **Features:** User management, admin panel

### Regular User  
- **Email:** `user@example.com`
- **Password:** `user123`
- **Features:** Basic dashboard

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 🔧 Prerequisites

Make sure you have:
- ✅ Node.js 18+ and npm
- ✅ PostgreSQL running
- ✅ Git

## 🚨 Troubleshooting

### Database Issues
```bash
# Check PostgreSQL is running
pg_isready

# Create database manually
psql -U postgres -c "CREATE DATABASE bank_card_db;"
```

### Port Issues
```bash
# Check if ports are free
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

### Reset Everything
```bash
cd backend
npm run migrate reset
npm run seed
```

## 🎯 Test the Application

1. **Go to:** http://localhost:3000
2. **Login as Super Admin** → See admin panel with user management
3. **Login as Regular User** → See basic dashboard
4. **Try API directly:** 
   ```bash
   curl http://localhost:5000/api/health
   ```

## 📱 What You'll See

### Super Admin View
- User management table
- Delete users (except yourself)
- Full system access
- Admin navigation

### Regular User View  
- Welcome dashboard
- User profile information
- Basic user features

## 🔄 Development Workflow

1. **Backend changes** → Auto-reload with nodemon
2. **Frontend changes** → Auto-reload with Vite HMR
3. **Database changes** → Run `npm run migrate` in backend
4. **New users** → Use the seeding script or create via API

## 🚀 Next Steps

- Application is now running locally
- Start developing new features
- Check the main README.md for detailed documentation
- Use the API endpoints for testing

**Happy coding! 🎉**
