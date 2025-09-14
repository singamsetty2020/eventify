// src/pages/AdminDashboard.js
import React, { useContext, useMemo, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { events, registered, cancelRegistration } = useContext(EventContext);
  const navigate = useNavigate();

  // protect admin route (redirect to login if not admin)
  useEffect(() => {
    if (localStorage.getItem('eventify_admin') !== 'true') {
      navigate('/admin-login', { replace: true });
    }
  }, [navigate]);

  // --- users: prefer explicit stored users, otherwise derive from registrations ---
  const users = useMemo(() => {
    try {
      const raw = localStorage.getItem('eventify_users');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // strip password when showing
          return parsed.map(u => {
            const { password, ...rest } = u;
            return rest;
          });
        }
      }
    } catch (err) {
      // ignore parse errors
    }

    // derive users from registrations (fallback)
    const map = {};
    registered.forEach(r => {
      const a = r.attendee || {};
      const email = (a.email || '').trim().toLowerCase();
      if (!email) return;
      if (!map[email]) {
        map[email] = { name: a.name || '', email, phone: a.phone || '', registrations: [] };
      }
      map[email].registrations.push({ regId: r.regId, eventId: r.eventId, createdAt: r.createdAt });
    });
    return Object.values(map);
  }, [registered]);

  // gather registrations with event title
  const regsDetailed = useMemo(() => {
    return registered.map(r => ({
      ...r,
      eventTitle: (events.find(e => e.id === r.eventId) || {}).title || r.eventId
    }));
  }, [registered, events]);

  const totalUsers = users.length;
  const totalRegs = registered.length;

  const handleLogoutAdmin = () => {
    localStorage.removeItem('eventify_admin');
    navigate('/', { replace: true });
  };

  const handleExportAll = () => {
    const payload = {
      users,
      registrations: registered,
      events
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eventify_export_all.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDeleteRegistration = (regId) => {
    if (!window.confirm('Delete this registration permanently?')) return;
    cancelRegistration(regId);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="mb-0">Admin Dashboard</h2>
          <small className="text-muted">Overview of users & registrations</small>
        </div>

        <div className="text-end">
          <div className="mb-2">
            <button className="btn btn-outline-danger btn-sm me-2" onClick={handleLogoutAdmin}>Logout Admin</button>
            <button className="btn btn-primary btn-sm" onClick={handleExportAll}>Export All</button>
          </div>
          <div className="small text-muted">Admin (demo)</div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Total Users</h6>
              <p className="display-6 mb-0">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Total Registrations</h6>
              <p className="display-6 mb-0">{totalRegs}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Total Events</h6>
              <p className="display-6 mb-0">{events.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Users</h5>
          {users.length === 0 ? (
            <div className="text-center py-4">
              <p className="mb-2">No users stored (no registrations or saved accounts).</p>
              <Link to="/events" className="btn btn-primary btn-sm">Go to Events</Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Registrations</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => {
                    const email = (u.email || '').trim().toLowerCase();
                    const regCount = registered.filter(r => {
                      const owner = r.ownerEmail?.trim?.toLowerCase?.();
                      const rmail = r.attendee?.email?.trim?.toLowerCase?.();
                      return owner === email || rmail === email;
                    }).length;
                    return (
                      <tr key={email || i}>
                        <td>{i + 1}</td>
                        <td>{u.name || '-'}</td>
                        <td>{u.email || '-'}</td>
                        <td>{u.phone || '-'}</td>
                        <td>{regCount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Registrations table */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">All Registrations</h5>
          {registered.length === 0 ? (
            <div className="text-center py-4">
              <p className="mb-2">No registrations found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Reg ID</th>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Attendee</th>
                    <th>Contact</th>
                    <th>Registered At</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {regsDetailed.map(r => (
                    <tr key={r.regId}>
                      <td>{r.regId}</td>
                      <td>{r.eventTitle}</td>
                      <td>{(events.find(e => e.id === r.eventId) || {}).category || 'Unknown'}</td>
                      <td>{r.attendee?.name || '-'}</td>
                      <td>
                        <div>{r.attendee?.email || '-'}</div>
                        <div className="text-muted small">{r.attendee?.phone || '-'}</div>
                      </td>
                      <td>{new Date(r.createdAt).toLocaleString()}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteRegistration(r.regId)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
