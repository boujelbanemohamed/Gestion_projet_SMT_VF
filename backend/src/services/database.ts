import { PrismaClient } from '@prisma/client';

// Singleton Prisma client pour éviter les connexions multiples
class DatabaseService {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });

      // Optimisations de connexion
      DatabaseService.instance.$connect();
    }

    return DatabaseService.instance;
  }

  static async disconnect(): Promise<void> {
    if (DatabaseService.instance) {
      await DatabaseService.instance.$disconnect();
    }
  }
}

export const prisma = DatabaseService.getInstance();

// Requêtes optimisées communes
export class OptimizedQueries {
  // Dashboard optimisé avec une seule requête complexe
  static async getDashboardData() {
    const [
      userStats,
      stockStats,
      movementStats,
      criticalStock,
      recentMovements,
      recentUsers
    ] = await Promise.all([
      // Stats utilisateurs
      prisma.user.aggregate({
        _count: { id: true },
      }),
      
      // Stats stock avec agrégation
      prisma.stock.aggregate({
        _sum: { quantity: true },
        _count: { id: true },
      }),
      
      // Stats mouvements
      prisma.movement.aggregate({
        _count: { id: true },
      }),
      
      // Stock critique avec relations optimisées
      prisma.stock.findMany({
        where: {
          AND: [
            { alertThreshold: { gt: 0 } },
            { quantity: { lte: prisma.stock.fields.alertThreshold } }
          ]
        },
        select: {
          id: true,
          quantity: true,
          alertThreshold: true,
          location: {
            select: {
              id: true,
              name: true,
              bank: {
                select: {
                  id: true,
                  name: true,
                }
              }
            }
          },
          cardType: {
            select: {
              id: true,
              name: true,
            }
          }
        },
        take: 10,
      }),
      
      // Mouvements récents optimisés
      prisma.movement.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          type: true,
          quantity: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            }
          },
          cardType: {
            select: {
              id: true,
              name: true,
            }
          },
          location: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      }),
      
      // Utilisateurs récents
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        }
      })
    ]);

    return {
      totalUsers: userStats._count.id,
      totalStock: stockStats._sum.quantity || 0,
      totalMovements: movementStats._count.id,
      criticalStock,
      recentMovements,
      recentUsers,
    };
  }

  // Requête optimisée pour les utilisateurs avec pagination
  static async getUsers(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;
    const where = search ? {
      OR: [
        { email: { contains: search, mode: 'insensitive' as const } },
        { firstName: { contains: search, mode: 'insensitive' as const } },
        { lastName: { contains: search, mode: 'insensitive' as const } },
      ]
    } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    };
  }

  // Stock avec relations optimisées
  static async getStockWithRelations() {
    return prisma.stock.findMany({
      select: {
        id: true,
        quantity: true,
        alertThreshold: true,
        lastUpdate: true,
        location: {
          select: {
            id: true,
            name: true,
            bank: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        },
        cardType: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: [
        { location: { name: 'asc' } },
        { cardType: { name: 'asc' } }
      ]
    });
  }
}
