@echo off
echo ========================================
echo  Bank Card Stock Management Setup
echo ========================================
echo.

REM Check if .env exists, if not copy from example
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo ✓ .env file created
) else (
    echo ✓ .env file already exists
)
echo.

REM Setup Backend
echo ========================================
echo  Setting up Backend...
echo ========================================
cd backend

echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

echo Generating Prisma client...
call npm run generate
if %errorlevel% neq 0 (
    echo ❌ Failed to generate Prisma client
    pause
    exit /b 1
)
echo ✓ Prisma client generated

echo Running database migrations...
call npm run migrate
if %errorlevel% neq 0 (
    echo ❌ Failed to run migrations
    echo Make sure PostgreSQL is running and database exists
    pause
    exit /b 1
)
echo ✓ Database migrations completed

echo Seeding database...
call npm run seed
if %errorlevel% neq 0 (
    echo ❌ Failed to seed database
    pause
    exit /b 1
)
echo ✓ Database seeded with default users

cd ..

REM Setup Frontend
echo.
echo ========================================
echo  Setting up Frontend...
echo ========================================
cd frontend

echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

cd ..

echo.
echo ========================================
echo  Setup Complete! 🎉
echo ========================================
echo.
echo Default login credentials:
echo.
echo Super Admin:
echo   Email: admin@admin.com
echo   Password: admin123
echo.
echo Regular User:
echo   Email: user@example.com
echo   Password: user123
echo.
echo To start the application:
echo   1. Run: start-backend.bat
echo   2. Run: start-frontend.bat
echo   3. Open: http://localhost:3000
echo.
pause
