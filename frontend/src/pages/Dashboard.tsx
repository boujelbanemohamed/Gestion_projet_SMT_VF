import React, { memo, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../hooks/useApi';
import { Link } from 'react-router-dom';
import { LoadingSpinner, SkeletonLoader } from '../components/LoadingSpinner';

// Composant mémorisé pour les statistiques
const StatsCard = memo<{ title: string; value: number | string; loading?: boolean }>(
  ({ title, value, loading }) => (
    <div className="stats-card">
      <h3>{title}</h3>
      {loading ? (
        <SkeletonLoader lines={1} height="2rem" />
      ) : (
        <div className="stats-value">{value}</div>
      )}
    </div>
  )
);

// Composant mémorisé pour les activités récentes
const RecentActivities = memo<{ activities: any[]; loading: boolean }>(
  ({ activities, loading }) => (
    <div className="dashboard-card">
      <h3>Activités Récentes</h3>
      {loading ? (
        <SkeletonLoader lines={5} />
      ) : (
        <div className="activities-list">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-description">{activity.description}</div>
              <div className="activity-meta">
                <span className="activity-user">{activity.user}</span>
                <span className="activity-time">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
);

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  // Utiliser le hook optimisé pour récupérer les données du dashboard
  const { data: dashboardData, loading, error, refetch } = useApi<{
    totalUsers: number;
    totalStock: number;
    totalMovements: number;
    criticalStockCount: number;
    recentActivities: any[];
  }>('/dashboard', { cache: true, cacheTTL: 2 * 60 * 1000 });

  // Mémoriser les données formatées
  const formattedData = useMemo(() => {
    if (!dashboardData) return null;

    return {
      stats: [
        { title: 'Total Utilisateurs', value: dashboardData.totalUsers },
        { title: 'Stock Total', value: dashboardData.totalStock },
        { title: 'Mouvements', value: dashboardData.totalMovements },
        { title: 'Stock Critique', value: dashboardData.criticalStockCount },
      ],
      activities: dashboardData.recentActivities || [],
    };
  }, [dashboardData]);

  const handleRefresh = async () => {
    await refetch();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tableau de Bord</h1>
        <div className="user-info">
          <span>Bienvenue, {user?.email}</span>
          <button onClick={handleRefresh} className="refresh-btn" disabled={loading}>
            🔄 Actualiser
          </button>
          <button onClick={logout} className="logout-btn">
            Déconnexion
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {error && (
          <div className="error-banner">
            <p>Erreur: {error}</p>
            <button onClick={handleRefresh}>Réessayer</button>
          </div>
        )}

        {/* Statistiques principales */}
        <div className="stats-grid">
          {formattedData?.stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              loading={loading}
            />
          )) || Array.from({ length: 4 }).map((_, i) => (
            <StatsCard key={i} title="Chargement..." value="..." loading={true} />
          ))}
        </div>

        {/* Informations utilisateur */}
        <div className="dashboard-card">
          <h2>Informations du Compte</h2>
          <p>Vous êtes connecté en tant qu'utilisateur {user?.role === 'SUPER_ADMIN' ? 'administrateur' : 'standard'}.</p>
          <p>Rôle: <strong>{user?.role}</strong></p>
          <p>Compte créé: <strong>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</strong></p>
        </div>

        {/* Activités récentes */}
        <RecentActivities
          activities={formattedData?.activities || []}
          loading={loading}
        />

        {/* Accès admin */}
        {user?.role === 'SUPER_ADMIN' && (
          <div className="dashboard-card admin-access">
            <h3>Accès Administrateur</h3>
            <p>Vous avez les privilèges Super Admin!</p>
            <Link to="/admin" className="admin-link">
              Aller au Panneau Admin
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
