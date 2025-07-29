param(
    [Parameter(Mandatory=$true)]
    [string]$ServerIP,
    
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [string]$DestinationPath = "/tmp"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Transfert vers Serveur RedHat" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Serveur cible: $ServerIP" -ForegroundColor Green
Write-Host "Utilisateur: $Username" -ForegroundColor Green
Write-Host "Destination: $DestinationPath" -ForegroundColor Green
Write-Host ""

# Vérifier si l'archive existe
if (-not (Test-Path "bank-card-stock-management.zip")) {
    Write-Host "❌ Archive non trouvée. Exécutez d'abord prepare-for-transfer.ps1" -ForegroundColor Red
    exit 1
}

# Vérifier si SCP est disponible
try {
    scp 2>$null
    $scpAvailable = $true
} catch {
    $scpAvailable = $false
}

if ($scpAvailable) {
    Write-Host "Transfert via SCP..." -ForegroundColor Yellow
    
    # Transfert de l'archive
    Write-Host "- Transfert de l'archive principale..." -ForegroundColor Green
    scp "bank-card-stock-management.zip" "${Username}@${ServerIP}:${DestinationPath}/"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Archive transférée avec succès" -ForegroundColor Green
        
        # Créer et transférer le script de déploiement rapide
        $quickDeploy = @"
#!/bin/bash
echo "========================================="
echo " Déploiement Rapide Bank Card App"
echo "========================================="

# Aller dans le répertoire de déploiement
cd /opt
sudo mkdir -p bank-card-stock-management
sudo chown `$USER:`$USER bank-card-stock-management

# Extraire l'archive
cd $DestinationPath
unzip -o bank-card-stock-management.zip
cp -r bank-card-transfer/* /opt/bank-card-stock-management/
cd /opt/bank-card-stock-management

# Rendre les scripts exécutables
chmod +x deploy-redhat.sh

echo ""
echo "✅ Fichiers extraits dans /opt/bank-card-stock-management"
echo ""
echo "Prochaines étapes:"
echo "1. cd /opt/bank-card-stock-management"
echo "2. sudo ./deploy-redhat.sh"
echo ""
echo "Ou suivez le guide DEPLOIEMENT-REDHAT.md pour une installation manuelle"
echo ""
"@
        
        $quickDeploy | Out-File -FilePath "quick-deploy.sh" -Encoding UTF8
        
        Write-Host "- Transfert du script de déploiement rapide..." -ForegroundColor Green
        scp "quick-deploy.sh" "${Username}@${ServerIP}:${DestinationPath}/"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Script de déploiement transféré" -ForegroundColor Green
        }
        
        # Nettoyer le fichier temporaire
        Remove-Item "quick-deploy.sh" -Force
        
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host " Transfert Terminé! 🎉" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Connectez-vous au serveur RedHat:" -ForegroundColor Cyan
        Write-Host "ssh $Username@$ServerIP" -ForegroundColor White
        Write-Host ""
        Write-Host "Puis exécutez:" -ForegroundColor Cyan
        Write-Host "cd $DestinationPath" -ForegroundColor White
        Write-Host "chmod +x quick-deploy.sh" -ForegroundColor White
        Write-Host "./quick-deploy.sh" -ForegroundColor White
        Write-Host ""
        Write-Host "Ou suivez le guide détaillé dans DEPLOIEMENT-REDHAT.md" -ForegroundColor Yellow
        
    } else {
        Write-Host "❌ Erreur lors du transfert SCP" -ForegroundColor Red
        Write-Host "Vérifiez:" -ForegroundColor Yellow
        Write-Host "- La connectivité réseau" -ForegroundColor White
        Write-Host "- Les credentials SSH" -ForegroundColor White
        Write-Host "- Les permissions sur le serveur" -ForegroundColor White
    }
    
} else {
    Write-Host "❌ SCP non disponible" -ForegroundColor Red
    Write-Host ""
    Write-Host "Solutions alternatives:" -ForegroundColor Yellow
    Write-Host "1. Installer OpenSSH: winget install Microsoft.OpenSSH.Beta" -ForegroundColor White
    Write-Host "2. Utiliser WinSCP (interface graphique)" -ForegroundColor White
    Write-Host "3. Utiliser SFTP manuellement" -ForegroundColor White
    Write-Host ""
    Write-Host "Fichier à transférer: bank-card-stock-management.zip" -ForegroundColor Cyan
}

Write-Host ""
