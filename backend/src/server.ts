import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import { dashboardRoutes } from './routes/dashboard';
import { errorHandler } from './middleware/errorHandler';
import { performanceMiddleware, getPerformanceStats, rateLimitMiddleware } from './middleware/performance';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware de performance et limitation de débit
app.use(performanceMiddleware);
app.use(rateLimitMiddleware(200, 15 * 60 * 1000)); // 200 requêtes par 15 minutes

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Route de monitoring des performances
app.get('/api/performance', getPerformanceStats);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
