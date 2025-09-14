// src/pages/Login.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Login() {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    if (user) navigate(from, { replace: true });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: email.trim(), password });
      navigate(from, { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: 480, width: '100%' }}>
        <div className="card-body">
          <h4 className="card-title mb-3">Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                className="form-control"
                required
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
          </form>

          {/* 👉 Added Register link here */}
          <div className="mt-3 text-center">
            <p>
              No account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
