import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.email}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>Welcome to Bank Card Stock Management</h2>
          <p>You are logged in as a regular user.</p>
          <p>Your role: <strong>{user?.role}</strong></p>
          <p>Account created: <strong>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</strong></p>
        </div>

        <div className="dashboard-card">
          <h3>Available Features</h3>
          <ul>
            <li>View your profile information</li>
            <li>Access user-specific features</li>
            <li>Contact support if needed</li>
          </ul>
        </div>

        {user?.role === 'SUPER_ADMIN' && (
          <div className="dashboard-card admin-access">
            <h3>Admin Access</h3>
            <p>You have Super Admin privileges!</p>
            <Link to="/admin" className="admin-link">
              Go to Admin Panel
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
