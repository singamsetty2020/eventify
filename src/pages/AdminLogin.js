// src/pages/AdminLogin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // If already logged in as admin, redirect to dashboard
  useEffect(() => {
    if (localStorage.getItem('eventify_admin') === 'true') {
      navigate('/admin-dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // credentials (requested): admin / admin123
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('eventify_admin', 'true');
      navigate('/admin-dashboard', { replace: true });
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: 420, width: '100%' }}>
        <div className="card-body">
          <h4 className="card-title mb-3">Admin Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" type="submit">Login</button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => { setUsername(''); setPassword(''); }}
              >
                Clear
              </button>
            </div>

            <div className="mt-3 small text-muted">
              Demo admin credentials: <strong>admin</strong> / <strong>admin123</strong>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
