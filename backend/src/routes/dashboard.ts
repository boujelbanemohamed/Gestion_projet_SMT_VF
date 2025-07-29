import express from 'express';
import { OptimizedQueries } from '../services/database';
import { cacheService } from '../services/cache';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/dashboard - Dashboard optimisé avec cache
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cacheKey = 'dashboard:main';
    
    // Essayer de récupérer depuis le cache
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Si pas en cache, récupérer les données
    const dashboardData = await OptimizedQueries.getDashboardData();
    
    // Calculer les statistiques dérivées
    const stats = {
      ...dashboardData,
      criticalStockCount: dashboardData.criticalStock.length,
      
      // Activités récentes formatées
      recentActivities: [
        ...dashboardData.recentMovements.map(m => ({
          id: m.id,
          type: 'movement',
          description: `${m.type} de ${m.quantity} cartes ${m.cardType?.name || ''} à ${m.location?.name || ''}`,
          timestamp: m.createdAt,
          user: m.user ? `${m.user.firstName} ${m.user.lastName}` : 'Utilisateur',
          status: 'success',
        })),
        ...dashboardData.recentUsers.map(u => ({
          id: u.id,
          type: 'user',
          description: `Nouvel utilisateur: ${u.firstName} ${u.lastName}`,
          timestamp: u.createdAt,
          user: 'Système',
          status: 'info',
        }))
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10)
    };

    // Mettre en cache pour 2 minutes
    cacheService.set(cacheKey, stats, 2 * 60 * 1000);
    
    res.json(stats);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Erreur lors du chargement du dashboard' });
  }
});

// GET /api/dashboard/stats - Stats rapides avec cache long
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const cacheKey = 'dashboard:stats';
    
    const cachedStats = cacheService.get(cacheKey);
    if (cachedStats) {
      return res.json(cachedStats);
    }

    const [userCount, stockSum, movementCount] = await Promise.all([
      OptimizedQueries.getDashboardData().then(data => data.totalUsers),
      OptimizedQueries.getDashboardData().then(data => data.totalStock),
      OptimizedQueries.getDashboardData().then(data => data.totalMovements),
    ]);

    const stats = {
      totalUsers: userCount,
      totalStock: stockSum,
      totalMovements: movementCount,
      lastUpdated: new Date().toISOString(),
    };

    // Cache plus long pour les stats générales (5 minutes)
    cacheService.set(cacheKey, stats, 5 * 60 * 1000);
    
    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Erreur lors du chargement des statistiques' });
  }
});

// POST /api/dashboard/refresh - Invalider le cache
router.post('/refresh', authenticateToken, (req, res) => {
  cacheService.invalidatePattern('dashboard:.*');
  res.json({ message: 'Cache invalidé' });
});

export { router as dashboardRoutes };
