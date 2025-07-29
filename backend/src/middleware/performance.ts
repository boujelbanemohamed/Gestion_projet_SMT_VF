import { Request, Response, NextFunction } from 'express';

interface PerformanceMetrics {
  route: string;
  method: string;
  duration: number;
  timestamp: Date;
  statusCode: number;
  memoryUsage: NodeJS.MemoryUsage;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private maxMetrics = 1000; // Garder seulement les 1000 dernières métriques

  addMetric(metric: PerformanceMetrics) {
    this.metrics.push(metric);
    
    // Nettoyer les anciennes métriques
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  getMetrics() {
    return this.metrics;
  }

  getAverageResponseTime(route?: string) {
    const filteredMetrics = route 
      ? this.metrics.filter(m => m.route === route)
      : this.metrics;
    
    if (filteredMetrics.length === 0) return 0;
    
    const totalTime = filteredMetrics.reduce((sum, m) => sum + m.duration, 0);
    return totalTime / filteredMetrics.length;
  }

  getSlowestRoutes(limit = 10) {
    const routeStats = new Map<string, { totalTime: number; count: number }>();
    
    this.metrics.forEach(metric => {
      const key = `${metric.method} ${metric.route}`;
      const existing = routeStats.get(key) || { totalTime: 0, count: 0 };
      routeStats.set(key, {
        totalTime: existing.totalTime + metric.duration,
        count: existing.count + 1,
      });
    });

    return Array.from(routeStats.entries())
      .map(([route, stats]) => ({
        route,
        averageTime: stats.totalTime / stats.count,
        count: stats.count,
      }))
      .sort((a, b) => b.averageTime - a.averageTime)
      .slice(0, limit);
  }

  clear() {
    this.metrics = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Middleware de monitoring des performances
export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const startMemory = process.memoryUsage();

  // Intercepter la fin de la réponse
  const originalSend = res.send;
  res.send = function(data) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const endMemory = process.memoryUsage();

    // Calculer la différence de mémoire
    const memoryDiff: NodeJS.MemoryUsage = {
      rss: endMemory.rss - startMemory.rss,
      heapTotal: endMemory.heapTotal - startMemory.heapTotal,
      heapUsed: endMemory.heapUsed - startMemory.heapUsed,
      external: endMemory.external - startMemory.external,
      arrayBuffers: endMemory.arrayBuffers - startMemory.arrayBuffers,
    };

    // Enregistrer la métrique
    performanceMonitor.addMetric({
      route: req.route?.path || req.path,
      method: req.method,
      duration,
      timestamp: new Date(),
      statusCode: res.statusCode,
      memoryUsage: memoryDiff,
    });

    // Logger les requêtes lentes (> 1 seconde)
    if (duration > 1000) {
      console.warn(`🐌 Requête lente détectée: ${req.method} ${req.path} - ${duration}ms`);
    }

    return originalSend.call(this, data);
  };

  next();
};

// Route pour consulter les métriques de performance
export const getPerformanceStats = (req: Request, res: Response) => {
  const stats = {
    totalRequests: performanceMonitor.getMetrics().length,
    averageResponseTime: performanceMonitor.getAverageResponseTime(),
    slowestRoutes: performanceMonitor.getSlowestRoutes(),
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
    recentMetrics: performanceMonitor.getMetrics().slice(-10),
  };

  res.json(stats);
};

// Middleware de limitation de débit simple
export const rateLimitMiddleware = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.ip || 'unknown';
    const now = Date.now();
    
    const clientData = requests.get(clientId);
    
    if (!clientData || now > clientData.resetTime) {
      // Nouveau client ou fenêtre expirée
      requests.set(clientId, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }
    
    if (clientData.count >= maxRequests) {
      return res.status(429).json({
        error: 'Trop de requêtes',
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000),
      });
    }
    
    clientData.count++;
    next();
  };
};
