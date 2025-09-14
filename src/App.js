// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import EventsPage from './pages/EventsPage';
import EventPage from './pages/EventPage';
import DashboardPage from './pages/DashboardPage';
import Login from './pages/Login';
import Register from './pages/Register';
import FavoritesPage from './pages/FavoritesPage';  // ✅ Favorites
import AdminLogin from './pages/AdminLogin';        // ✅ Admin login
import AdminDashboard from './pages/AdminDashboard'; // ✅ Admin dashboard

function App() {
  return (
    <Router>
      <Navbar />

      {/* ✅ Toast Container */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
        <div
          id="successToast"
          className="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Registration successful!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>

      <main className="py-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<FavoritesPage />} /> {/* ✅ Favorites route */}
            <Route path="/admin-login" element={<AdminLogin />} />   {/* ✅ Admin login route */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* ✅ Admin dashboard route */}
          </Routes>
        </div>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
