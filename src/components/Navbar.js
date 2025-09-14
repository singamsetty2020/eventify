// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';  // ✅ import

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);  // ✅ theme + toggle
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${
        theme === 'light' ? 'navbar-light bg-white' : 'navbar-dark bg-dark'
      }`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Eventify
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>

            {/* ✅ Admin link visible to everyone */}
            <li className="nav-item">
              <Link
                className="nav-link text-danger fw-semibold"
                to="/admin-login"
              >
                Admin
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item me-2">
                  <span className="nav-link">
                    Hi, <strong>{user.name}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary btn-sm" to="/login">
                  Login
                </Link>
              </li>
            )}

            {/* ✅ Dark/Light Mode Toggle button */}
            <li className="nav-item ms-3">
              <button
                className="btn btn-sm btn-outline-info"
                onClick={toggleTheme}
              >
                {theme === 'light' ? '🌙 Dark' : '🌞 Light'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
