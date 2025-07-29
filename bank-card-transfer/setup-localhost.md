# 🚀 Localhost Setup Guide

Follow these steps to run the Bank Card Stock Management System on your local machine.

## Prerequisites

Make sure you have these installed:
- **Node.js 18+** and **npm**
- **PostgreSQL 12+** 
- **Git**

## Step 1: Environment Setup

1. **Copy the environment file:**
   ```bash
   cp .env.example .env
   ```

2. **The .env file is already configured for localhost with these defaults:**
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bank_card_db"
   JWT_SECRET="localhost-development-secret-key-2024"
   PORT=5000
   NODE_ENV=development
   VITE_API_URL=http://localhost:5000/api
   ```

## Step 2: Database Setup

1. **Start PostgreSQL service** (if not already running)

2. **Create the database:**
   ```bash
   # Using createdb command
   createdb bank_card_db
   
   # OR using psql
   psql -U postgres -c "CREATE DATABASE bank_card_db;"
   ```

## Step 3: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate Prisma client:**
   ```bash
   npm run generate
   ```

4. **Run database migrations:**
   ```bash
   npm run migrate
   ```

5. **Seed the database with default users:**
   ```bash
   npm run seed
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

   ✅ **Backend will be running at:** `http://localhost:5000`

## Step 4: Frontend Setup

**Open a new terminal** and:

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   ✅ **Frontend will be running at:** `http://localhost:3000`

## Step 5: Access the Application

1. **Open your browser and go to:** `http://localhost:3000`

2. **Login with these default accounts:**

   ### Super Admin Account
   - **Email:** `admin@admin.com`
   - **Password:** `admin123`
   - **Access:** Full admin panel, user management

   ### Regular User Account
   - **Email:** `user@example.com`
   - **Password:** `user123`
   - **Access:** Basic user dashboard

## 🎯 Quick Test

1. Login as Super Admin → You should see the Admin Panel with user management
2. Login as Regular User → You should see the User Dashboard
3. Try logging out and logging back in
4. As Super Admin, try deleting the regular user (you can't delete yourself)

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
pg_isready

# Check if database exists
psql -U postgres -l | grep bank_card_db
```

### Port Already in Use
```bash
# Check what's using port 5000
netstat -ano | findstr :5000

# Or use a different port by changing PORT in .env
```

### Reset Database
```bash
cd backend
npm run migrate reset
npm run seed
```

## 📱 API Testing

You can test the API directly:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}'
```

## 🚀 Next Steps

- The application is now running on localhost
- Both backend (port 5000) and frontend (port 3000) should be accessible
- You can start developing and testing features
- Check the main README.md for more detailed documentation

## 💡 Development Tips

- Backend auto-reloads on file changes (nodemon)
- Frontend auto-reloads on file changes (Vite HMR)
- Database changes require running migrations
- Check browser console and terminal for any errors
