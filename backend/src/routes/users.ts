import express from 'express';
import { OptimizedQueries } from '../services/database';
import { cacheService } from '../services/cache';
import { authenticateToken, requireSuperAdmin } from '../middleware/auth';

const router = express.Router();

// GET /api/users - Get users with pagination and cache (SUPER_ADMIN only)
router.get('/', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const cacheKey = `users:${page}:${limit}:${search || 'all'}`;

    // Vérifier le cache
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Récupérer les données avec pagination
    const result = await OptimizedQueries.getUsers(page, limit, search);

    // Mettre en cache pour 3 minutes
    cacheService.set(cacheKey, result, 3 * 60 * 1000);

    res.json(result);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/me - Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/users/:id - Delete user (SUPER_ADMIN only)
router.delete('/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (id === req.user.userId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as userRoutes };
