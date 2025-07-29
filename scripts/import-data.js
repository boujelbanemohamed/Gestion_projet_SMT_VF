const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function importData() {
  try {
    console.log('🚀 Import des données avec Prisma...')

    // Chercher le fichier d'export le plus récent
    const files = fs.readdirSync(__dirname + '/..')
      .filter(file => file.startsWith('export-data-') && file.endsWith('.json'))
      .sort()
      .reverse()

    if (files.length === 0) {
      console.error('❌ Aucun fichier d\'export trouvé!')
      console.log('💡 Exécute d\'abord: node scripts/export-data.js')
      return
    }

    const filename = files[0]
    const filepath = path.join(__dirname, '..', filename)
    
    console.log(`📁 Import depuis: ${filename}`)
    
    // Lire le fichier JSON
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'))

    // Importer les rôles
    console.log('📝 Import des rôles...')
    for (const role of data.roles || []) {
      await prisma.role.upsert({
        where: { id: role.id },
        update: role,
        create: role
      })
    }
    console.log(`✅ ${(data.roles || []).length} rôles importés`)

    // Importer les permissions
    console.log('📝 Import des permissions...')
    for (const permission of data.permissions || []) {
      await prisma.permission.upsert({
        where: { id: permission.id },
        update: permission,
        create: permission
      })
    }
    console.log(`✅ ${(data.permissions || []).length} permissions importées`)

    // Importer les banques
    console.log('📝 Import des banques...')
    for (const bank of data.banks || []) {
      await prisma.bank.upsert({
        where: { id: bank.id },
        update: bank,
        create: bank
      })
    }
    console.log(`✅ ${(data.banks || []).length} banques importées`)

    // Importer les emplacements
    console.log('📝 Import des emplacements...')
    for (const location of data.locations || []) {
      await prisma.location.upsert({
        where: { id: location.id },
        update: location,
        create: location
      })
    }
    console.log(`✅ ${(data.locations || []).length} emplacements importés`)

    // Importer les types de cartes
    console.log('📝 Import des types de cartes...')
    for (const cardType of data.cardTypes || []) {
      await prisma.cardType.upsert({
        where: { id: cardType.id },
        update: cardType,
        create: cardType
      })
    }
    console.log(`✅ ${(data.cardTypes || []).length} types de cartes importés`)

    // Importer les utilisateurs
    console.log('📝 Import des utilisateurs...')
    for (const user of data.users || []) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: user,
        create: user
      })
    }
    console.log(`✅ ${(data.users || []).length} utilisateurs importés`)

    // Importer le stock
    console.log('📝 Import du stock...')
    for (const stockItem of data.stock || []) {
      await prisma.stock.upsert({
        where: { id: stockItem.id },
        update: stockItem,
        create: stockItem
      })
    }
    console.log(`✅ ${(data.stock || []).length} éléments de stock importés`)

    // Importer les mouvements
    console.log('📝 Import des mouvements...')
    for (const movement of data.movements || []) {
      await prisma.movement.upsert({
        where: { id: movement.id },
        update: movement,
        create: movement
      })
    }
    console.log(`✅ ${(data.movements || []).length} mouvements importés`)

    // Importer les logs d'audit
    console.log('📝 Import des logs d\'audit...')
    for (const auditLog of data.auditLogs || []) {
      await prisma.auditLog.upsert({
        where: { id: auditLog.id },
        update: auditLog,
        create: auditLog
      })
    }
    console.log(`✅ ${(data.auditLogs || []).length} logs d'audit importés`)

    // Importer les sessions
    console.log('📝 Import des sessions...')
    for (const session of data.sessions || []) {
      await prisma.session.upsert({
        where: { id: session.id },
        update: session,
        create: session
      })
    }
    console.log(`✅ ${(data.sessions || []).length} sessions importées`)

    // Importer les paramètres
    console.log('📝 Import des paramètres...')
    for (const setting of data.settings || []) {
      await prisma.settings.upsert({
        where: { id: setting.id },
        update: setting,
        create: setting
      })
    }
    console.log(`✅ ${(data.settings || []).length} paramètres importés`)

    console.log('\n✅ Import terminé avec succès!')
    console.log(`📊 Total des données importées:`)
    console.log(`   - Rôles: ${(data.roles || []).length}`)
    console.log(`   - Permissions: ${(data.permissions || []).length}`)
    console.log(`   - Utilisateurs: ${(data.users || []).length}`)
    console.log(`   - Banques: ${(data.banks || []).length}`)
    console.log(`   - Emplacements: ${(data.locations || []).length}`)
    console.log(`   - Types de cartes: ${(data.cardTypes || []).length}`)
    console.log(`   - Stock: ${(data.stock || []).length}`)
    console.log(`   - Mouvements: ${(data.movements || []).length}`)
    console.log(`   - Logs d'audit: ${(data.auditLogs || []).length}`)
    console.log(`   - Sessions: ${(data.sessions || []).length}`)
    console.log(`   - Paramètres: ${(data.settings || []).length}`)

  } catch (error) {
    console.error('❌ Erreur lors de l\'import:', error)
  } finally {
    await prisma.$disconnect()
  }
}

importData() 