Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Bank Card Stock Management Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists, if not copy from example
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created" -ForegroundColor Green
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}
Write-Host ""

# Setup Backend
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Setting up Backend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Set-Location backend

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green

Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npm run generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma client" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Prisma client generated" -ForegroundColor Green

Write-Host "Running database migrations..." -ForegroundColor Yellow
npm run migrate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to run migrations" -ForegroundColor Red
    Write-Host "Make sure PostgreSQL is running and database exists" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Database migrations completed" -ForegroundColor Green

Write-Host "Seeding database..." -ForegroundColor Yellow
npm run seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to seed database" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Database seeded with default users" -ForegroundColor Green

Set-Location ..

# Setup Frontend
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Setting up Frontend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Set-Location frontend

Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Setup Complete! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Default login credentials:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Super Admin:" -ForegroundColor Yellow
Write-Host "  Email: admin@admin.com" -ForegroundColor White
Write-Host "  Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Regular User:" -ForegroundColor Yellow
Write-Host "  Email: user@example.com" -ForegroundColor White
Write-Host "  Password: user123" -ForegroundColor White
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host "  1. Run: .\start-backend.ps1" -ForegroundColor White
Write-Host "  2. Run: .\start-frontend.ps1" -ForegroundColor White
Write-Host "  3. Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue"
