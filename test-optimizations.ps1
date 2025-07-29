Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Test des Optimisations de Performance" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si le backend est en cours d'exécution
Write-Host "Vérification du backend..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET -TimeoutSec 5
    Write-Host "✅ Backend accessible" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend non accessible. Démarrez-le avec 'npm run dev' dans le dossier backend" -ForegroundColor Red
    Write-Host ""
    Write-Host "Pour démarrer le backend:" -ForegroundColor Yellow
    Write-Host "cd backend" -ForegroundColor White
    Write-Host "npm install" -ForegroundColor White
    Write-Host "npm run generate" -ForegroundColor White
    Write-Host "npm run migrate" -ForegroundColor White
    Write-Host "npm run dev" -ForegroundColor White
    exit 1
}

# Vérifier si le frontend est en cours d'exécution
Write-Host "Vérification du frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
    Write-Host "✅ Frontend accessible" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Frontend non accessible. Démarrez-le avec 'npm run dev' dans le dossier frontend" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Tests de Performance" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Test 1: API Health Check
Write-Host ""
Write-Host "🧪 Test 1: Health Check" -ForegroundColor Cyan
$startTime = Get-Date
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalMilliseconds
    Write-Host "✅ Réponse en ${duration}ms" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor White
} catch {
    Write-Host "❌ Échec du test health check" -ForegroundColor Red
}

# Test 2: Performance Metrics
Write-Host ""
Write-Host "🧪 Test 2: Métriques de Performance" -ForegroundColor Cyan
$startTime = Get-Date
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/performance" -Method GET
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalMilliseconds
    Write-Host "✅ Métriques récupérées en ${duration}ms" -ForegroundColor Green
    Write-Host "   Requêtes totales: $($response.totalRequests)" -ForegroundColor White
    Write-Host "   Temps moyen: $([math]::Round($response.averageResponseTime, 2))ms" -ForegroundColor White
    Write-Host "   Uptime: $([math]::Round($response.uptime, 2))s" -ForegroundColor White
} catch {
    Write-Host "❌ Échec du test de métriques" -ForegroundColor Red
}

# Test 3: Login Performance
Write-Host ""
Write-Host "🧪 Test 3: Performance de Connexion" -ForegroundColor Cyan
$loginData = @{
    email = "admin@admin.com"
    password = "admin123"
} | ConvertTo-Json

$startTime = Get-Date
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $loginData -ContentType "application/json"
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalMilliseconds
    Write-Host "✅ Connexion réussie en ${duration}ms" -ForegroundColor Green
    
    $token = $response.token
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    
    # Test 4: Dashboard avec authentification
    Write-Host ""
    Write-Host "🧪 Test 4: Performance Dashboard" -ForegroundColor Cyan
    $startTime = Get-Date
    try {
        $dashResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard" -Method GET -Headers $headers
        $endTime = Get-Date
        $duration = ($endTime - $startTime).TotalMilliseconds
        Write-Host "✅ Dashboard chargé en ${duration}ms" -ForegroundColor Green
        Write-Host "   Utilisateurs totaux: $($dashResponse.totalUsers)" -ForegroundColor White
        Write-Host "   Stock total: $($dashResponse.totalStock)" -ForegroundColor White
        Write-Host "   Activités récentes: $($dashResponse.recentActivities.Count)" -ForegroundColor White
    } catch {
        Write-Host "❌ Échec du test dashboard" -ForegroundColor Red
    }
    
    # Test 5: Liste des utilisateurs
    Write-Host ""
    Write-Host "🧪 Test 5: Performance Liste Utilisateurs" -ForegroundColor Cyan
    $startTime = Get-Date
    try {
        $usersResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/users?page=1&limit=10" -Method GET -Headers $headers
        $endTime = Get-Date
        $duration = ($endTime - $startTime).TotalMilliseconds
        Write-Host "✅ Liste utilisateurs chargée en ${duration}ms" -ForegroundColor Green
        Write-Host "   Utilisateurs: $($usersResponse.users.Count)" -ForegroundColor White
        Write-Host "   Total: $($usersResponse.pagination.total)" -ForegroundColor White
    } catch {
        Write-Host "❌ Échec du test liste utilisateurs" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Échec de la connexion" -ForegroundColor Red
    Write-Host "   Vérifiez que la base de données est initialisée avec 'npm run seed'" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Résumé des Tests" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Objectifs de Performance:" -ForegroundColor Cyan
Write-Host "   • Health Check: < 50ms" -ForegroundColor White
Write-Host "   • Connexion: < 200ms" -ForegroundColor White
Write-Host "   • Dashboard: < 500ms" -ForegroundColor White
Write-Host "   • Liste utilisateurs: < 300ms" -ForegroundColor White
Write-Host ""
Write-Host "📊 Pour des tests plus détaillés:" -ForegroundColor Yellow
Write-Host "   cd backend && npm run test:performance" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Accès à l'application:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   API: http://localhost:5000/api" -ForegroundColor White
Write-Host "   Métriques: http://localhost:5000/api/performance" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Comptes de test:" -ForegroundColor Yellow
Write-Host "   Admin: admin@admin.com / admin123" -ForegroundColor White
Write-Host "   User: user@example.com / user123" -ForegroundColor White
Write-Host ""

Read-Host "Appuyez sur Entrée pour continuer"
