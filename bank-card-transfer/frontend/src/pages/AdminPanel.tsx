import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  role: 'USER' | 'SUPER_ADMIN';
  createdAt: string;
  updatedAt: string;
}

export const AdminPanel: React.FC = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete user');
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <div className="admin-nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <span className="user-info">
            {user?.email} (Super Admin)
          </span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-content">
        <div className="admin-section">
          <h2>User Management</h2>
          
          {loading && <div className="loading">Loading users...</div>}
          {error && <div className="error-message">{error}</div>}
          
          {!loading && !error && (
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-badge ${u.role.toLowerCase()}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>
                        {u.id !== user?.id && (
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        )}
                        {u.id === user?.id && (
                          <span className="current-user">Current User</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="admin-section">
          <h3>Admin Features</h3>
          <ul>
            <li>Manage all users in the system</li>
            <li>Delete user accounts (except your own)</li>
            <li>View user creation dates and roles</li>
            <li>Access to all system features</li>
          </ul>
        </div>
      </main>
    </div>
  );
};
