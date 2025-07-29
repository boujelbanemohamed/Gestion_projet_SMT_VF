const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createPermissions() {
  try {
    console.log('🚀 Création des permissions...')

    // Définition de toutes les permissions
    const permissions = [
      // Permissions utilisateurs
      { name: 'users.view', description: 'Voir la liste des utilisateurs' },
      { name: 'users.create', description: 'Créer un nouvel utilisateur' },
      { name: 'users.edit', description: 'Modifier un utilisateur' },
      { name: 'users.delete', description: 'Supprimer un utilisateur' },
      { name: 'users.manage_roles', description: 'Gérer les rôles des utilisateurs' },
      { name: 'users.view_sessions', description: 'Voir les sessions actives' },
      { name: 'users.revoke_sessions', description: 'Révoquer les sessions utilisateurs' },
      { name: 'users.view_audit_logs', description: 'Voir les journaux d\'audit' },

      // Permissions banques
      { name: 'banks.view', description: 'Voir la liste des banques' },
      { name: 'banks.create', description: 'Créer une nouvelle banque' },
      { name: 'banks.edit', description: 'Modifier une banque' },
      { name: 'banks.delete', description: 'Supprimer une banque' },
      { name: 'banks.import', description: 'Importer des banques' },

      // Permissions emplacements
      { name: 'locations.view', description: 'Voir la liste des emplacements' },
      { name: 'locations.create', description: 'Créer un nouvel emplacement' },
      { name: 'locations.edit', description: 'Modifier un emplacement' },
      { name: 'locations.delete', description: 'Supprimer un emplacement' },
      { name: 'locations.import', description: 'Importer des emplacements' },

      // Permissions types de cartes
      { name: 'card_types.view', description: 'Voir la liste des types de cartes' },
      { name: 'card_types.create', description: 'Créer un nouveau type de carte' },
      { name: 'card_types.edit', description: 'Modifier un type de carte' },
      { name: 'card_types.delete', description: 'Supprimer un type de carte' },
      { name: 'card_types.import', description: 'Importer des types de cartes' },

      // Permissions stock
      { name: 'stock.view', description: 'Voir le stock' },
      { name: 'stock.create', description: 'Créer un nouvel élément de stock' },
      { name: 'stock.edit', description: 'Modifier le stock' },
      { name: 'stock.delete', description: 'Supprimer du stock' },
      { name: 'stock.export', description: 'Exporter le stock' },

      // Permissions mouvements
      { name: 'movements.view', description: 'Voir les mouvements' },
      { name: 'movements.create', description: 'Créer un nouveau mouvement' },
      { name: 'movements.edit', description: 'Modifier un mouvement' },
      { name: 'movements.delete', description: 'Supprimer un mouvement' },
      { name: 'movements.approve', description: 'Approuver un mouvement' },
      { name: 'movements.export', description: 'Exporter les mouvements' },

      // Permissions rapports
      { name: 'reports.view', description: 'Voir les rapports' },
      { name: 'reports.create', description: 'Créer un rapport' },
      { name: 'reports.export', description: 'Exporter un rapport' },
      { name: 'reports.schedule', description: 'Programmer un rapport' },
      { name: 'reports.send_email', description: 'Envoyer un rapport par email' },

      // Permissions paramètres
      { name: 'settings.view', description: 'Voir les paramètres' },
      { name: 'settings.edit', description: 'Modifier les paramètres' },
      { name: 'settings.notifications', description: 'Gérer les notifications' },
      { name: 'settings.smtp', description: 'Configurer SMTP' },

      // Permissions dashboard
      { name: 'dashboard.view', description: 'Voir le tableau de bord' },
      { name: 'dashboard.analytics', description: 'Voir les analyses' },
      { name: 'dashboard.alerts', description: 'Voir les alertes' },

      // Permissions système
      { name: 'system.backup', description: 'Sauvegarder le système' },
      { name: 'system.restore', description: 'Restaurer le système' },
      { name: 'system.logs', description: 'Voir les logs système' },
      { name: 'system.maintenance', description: 'Mode maintenance' }
    ]

    console.log('📝 Création des permissions...')
    for (const permData of permissions) {
      const permission = await prisma.permission.upsert({
        where: { name: permData.name },
        update: { description: permData.description },
        create: {
          name: permData.name,
          description: permData.description
        }
      })
      console.log(`✅ Permission créée: ${permission.name}`)
    }

    // Créer les associations rôles-permissions
    console.log('🔗 Association des permissions aux rôles...')

    // Récupérer les rôles
    const superadminRole = await prisma.role.findUnique({ where: { name: 'superadmin' } })
    const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } })
    const managerRole = await prisma.role.findUnique({ where: { name: 'manager' } })
    const userRole = await prisma.role.findUnique({ where: { name: 'user' } })

    // Récupérer toutes les permissions
    const allPermissions = await prisma.permission.findMany()

    // Superadmin : toutes les permissions
    if (superadminRole) {
      for (const permission of allPermissions) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: superadminRole.id,
              permissionId: permission.id
            }
          },
          update: {},
          create: {
            roleId: superadminRole.id,
            permissionId: permission.id
          }
        })
      }
      console.log('✅ Toutes les permissions assignées au rôle superadmin')
    }

    // Admin : toutes sauf système
    if (adminRole) {
      const adminPermissions = allPermissions.filter(p => !p.name.startsWith('system.'))
      for (const permission of adminPermissions) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: adminRole.id,
              permissionId: permission.id
            }
          },
          update: {},
          create: {
            roleId: adminRole.id,
            permissionId: permission.id
          }
        })
      }
      console.log('✅ Permissions admin assignées')
    }

    // Manager : permissions de gestion
    if (managerRole) {
      const managerPermissions = allPermissions.filter(p => 
        p.name.includes('.view') ||
        p.name.includes('.create') ||
        p.name.includes('.edit') ||
        p.name.includes('movements.') ||
        p.name.includes('stock.') ||
        p.name.includes('reports.view') ||
        p.name.includes('dashboard.')
      )
      for (const permission of managerPermissions) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: managerRole.id,
              permissionId: permission.id
            }
          },
          update: {},
          create: {
            roleId: managerRole.id,
            permissionId: permission.id
          }
        })
      }
      console.log('✅ Permissions manager assignées')
    }

    // User : permissions de base
    if (userRole) {
      const userPermissions = allPermissions.filter(p => 
        p.name.includes('.view') ||
        p.name.includes('movements.create') ||
        p.name.includes('stock.view') ||
        p.name.includes('dashboard.view')
      )
      for (const permission of userPermissions) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: userRole.id,
              permissionId: permission.id
            }
          },
          update: {},
          create: {
            roleId: userRole.id,
            permissionId: permission.id
          }
        })
      }
      console.log('✅ Permissions user assignées')
    }

    // Afficher un résumé
    console.log('\n📊 Résumé des permissions créées:')
    const totalPermissions = await prisma.permission.count()
    const totalRolePermissions = await prisma.rolePermission.count()
    
    console.log(`- Permissions créées: ${totalPermissions}`)
    console.log(`- Associations rôles-permissions: ${totalRolePermissions}`)

    // Afficher les permissions par catégorie
    const categories = ['users', 'banks', 'locations', 'card_types', 'stock', 'movements', 'reports', 'settings', 'dashboard', 'system']
    
    for (const category of categories) {
      const count = await prisma.permission.count({
        where: { name: { startsWith: `${category}.` } }
      })
      console.log(`- ${category}: ${count} permissions`)
    }

    console.log('\n✅ Création des permissions terminée avec succès!')

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createPermissions() 