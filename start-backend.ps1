Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Starting Backend Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend will be available at: http://localhost:5000" -ForegroundColor Green
Write-Host "API endpoints at: http://localhost:5000/api" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

Set-Location backend
npm run dev
