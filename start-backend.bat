@echo off
echo ========================================
echo  Starting Backend Server...
echo ========================================
echo.
echo Backend will be available at: http://localhost:5000
echo API endpoints at: http://localhost:5000/api
echo.
echo Press Ctrl+C to stop the server
echo.

cd backend
npm run dev
