const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createSuperAdmin() {
  try {
    console.log('🚀 Création des rôles et utilisateur superadmin...')

    // 1. Créer les rôles de base
    const roles = [
      { name: 'superadmin', description: 'Super administrateur - Accès complet' },
      { name: 'admin', description: 'Administrateur - Gestion complète' },
      { name: 'manager', description: 'Manager - Gestion des stocks et mouvements' },
      { name: 'user', description: 'Utilisateur - Consultation et mouvements basiques' }
    ]

    console.log('📝 Création des rôles...')
    for (const roleData of roles) {
      const role = await prisma.role.upsert({
        where: { name: roleData.name },
        update: { description: roleData.description },
        create: {
          name: roleData.name,
          description: roleData.description
        }
      })
      console.log(`✅ Rôle créé: ${role.name} (${role.description})`)
    }

    // 2. Hash du mot de passe
    const password = 'admin123' // Change ce mot de passe !
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Récupérer l'ID du rôle superadmin
    const superadminRole = await prisma.role.findUnique({
      where: { name: 'superadmin' }
    })

    if (!superadminRole) {
      throw new Error('Rôle superadmin non trouvé')
    }

    // 4. Créer l'utilisateur superadmin
    console.log('👤 Création de l\'utilisateur superadmin...')
    const user = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin',
        username: 'superadmin',
        roleId: superadminRole.id,
        isActive: true
      },
      create: {
        email: 'admin@example.com',
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin',
        username: 'superadmin',
        roleId: superadminRole.id,
        isActive: true
      }
    })

    console.log('✅ Utilisateur superadmin créé avec succès!')
    console.log('📧 Email:', user.email)
    console.log('🔑 Mot de passe:', password)
    console.log('👤 Nom d\'utilisateur:', user.username)
    console.log('🎭 Rôle:', superadminRole.name)

    // 5. Afficher tous les utilisateurs existants
    console.log('\n📋 Liste des utilisateurs existants:')
    const allUsers = await prisma.user.findMany({
      include: { role: true }
    })
    
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role?.name || 'Aucun rôle'})`)
    })

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSuperAdmin() 