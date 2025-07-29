const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function exportData() {
  try {
    console.log('🚀 Export des données avec Prisma...')

    const exportData = {}

    // Exporter les rôles
    console.log('📝 Export des rôles...')
    const roles = await prisma.role.findMany()
    exportData.roles = roles
    console.log(`✅ ${roles.length} rôles exportés`)

    // Exporter les permissions
    console.log('📝 Export des permissions...')
    const permissions = await prisma.permission.findMany()
    exportData.permissions = permissions
    console.log(`✅ ${permissions.length} permissions exportées`)

    // Exporter les utilisateurs
    console.log('📝 Export des utilisateurs...')
    const users = await prisma.user.findMany({
      include: { role: true }
    })
    exportData.users = users
    console.log(`✅ ${users.length} utilisateurs exportés`)

    // Exporter les banques
    console.log('📝 Export des banques...')
    const banks = await prisma.bank.findMany()
    exportData.banks = banks
    console.log(`✅ ${banks.length} banques exportées`)

    // Exporter les emplacements
    console.log('📝 Export des emplacements...')
    const locations = await prisma.location.findMany({
      include: { bank: true }
    })
    exportData.locations = locations
    console.log(`✅ ${locations.length} emplacements exportés`)

    // Exporter les types de cartes
    console.log('📝 Export des types de cartes...')
    const cardTypes = await prisma.cardType.findMany()
    exportData.cardTypes = cardTypes
    console.log(`✅ ${cardTypes.length} types de cartes exportés`)

    // Exporter le stock
    console.log('📝 Export du stock...')
    const stock = await prisma.stock.findMany({
      include: { location: true, cardType: true }
    })
    exportData.stock = stock
    console.log(`✅ ${stock.length} éléments de stock exportés`)

    // Exporter les mouvements
    console.log('📝 Export des mouvements...')
    const movements = await prisma.movement.findMany({
      include: { user: true, location: true, cardType: true }
    })
    exportData.movements = movements
    console.log(`✅ ${movements.length} mouvements exportés`)

    // Exporter les logs d'audit
    console.log('📝 Export des logs d\'audit...')
    const auditLogs = await prisma.auditLog.findMany()
    exportData.auditLogs = auditLogs
    console.log(`✅ ${auditLogs.length} logs d'audit exportés`)

    // Exporter les sessions
    console.log('📝 Export des sessions...')
    const sessions = await prisma.session.findMany({
      include: { user: true }
    })
    exportData.sessions = sessions
    console.log(`✅ ${sessions.length} sessions exportées`)

    // Exporter les paramètres
    console.log('📝 Export des paramètres...')
    const settings = await prisma.settings.findMany()
    exportData.settings = settings
    console.log(`✅ ${settings.length} paramètres exportés`)

    // Sauvegarder dans un fichier JSON
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `export-data-${timestamp}.json`
    const filepath = path.join(__dirname, '..', filename)

    fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2))
    
    console.log(`\n✅ Export terminé avec succès!`)
    console.log(`📁 Fichier sauvegardé: ${filepath}`)
    console.log(`📊 Total des données exportées:`)
    console.log(`   - Rôles: ${roles.length}`)
    console.log(`   - Permissions: ${permissions.length}`)
    console.log(`   - Utilisateurs: ${users.length}`)
    console.log(`   - Banques: ${banks.length}`)
    console.log(`   - Emplacements: ${locations.length}`)
    console.log(`   - Types de cartes: ${cardTypes.length}`)
    console.log(`   - Stock: ${stock.length}`)
    console.log(`   - Mouvements: ${movements.length}`)
    console.log(`   - Logs d'audit: ${auditLogs.length}`)
    console.log(`   - Sessions: ${sessions.length}`)
    console.log(`   - Paramètres: ${settings.length}`)

  } catch (error) {
    console.error('❌ Erreur lors de l\'export:', error)
  } finally {
    await prisma.$disconnect()
  }
}

exportData() 