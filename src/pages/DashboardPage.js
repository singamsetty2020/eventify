// src/pages/DashboardPage.js
import React, { useContext, useMemo } from 'react';
import { EventContext } from '../context/EventContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const { events, registered, cancelRegistration } = useContext(EventContext);
  const { user } = useContext(AuthContext);

  // Filter registrations to only those of the logged-in user
  const regsWithEvent = useMemo(() => {
    if (!user) return [];

    const userEmail = (user.email || '').trim().toLowerCase();

    const filtered = registered.filter(r => {
      const owner = r.ownerEmail?.trim?.()?.toLowerCase?.();
      if (owner) return owner === userEmail;

      const regEmail = r.attendee?.email?.trim?.toLowerCase?.();
      if (regEmail) return regEmail === userEmail;

      return false;
    });

    return filtered.map(r => ({ ...r, event: events.find(e => e.id === r.eventId) || null }));
  }, [registered, events, user]);

  const total = regsWithEvent.length;

  const byCategory = useMemo(() => {
    const map = {};
    regsWithEvent.forEach(r => {
      const cat = (r.event && r.event.category) ? r.event.category : 'Unknown';
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  }, [regsWithEvent]);

  const chartData = Object.entries(byCategory).map(([cat, count]) => ({
    name: cat,
    value: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#6f42c1', '#e83e8c'];

  const handleCancel = (regId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) return;
    cancelRegistration(regId);
  };

  const handleDownload = () => {
    const exportData = regsWithEvent.map(r => ({
      regId: r.regId,
      eventId: r.eventId,
      eventTitle: r.event ? r.event.title : 'Unknown',
      category: r.event ? r.event.category : 'Unknown',
      attendee: r.attendee,
      registeredAt: r.createdAt
    }));
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eventify_registrations.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="mb-0">Dashboard</h2>
          <small className="text-muted">Your registrations and stats</small>
        </div>
        <div className="text-end">
          {user ? (
            <div>
              <div className="small text-muted">Logged in as</div>
              <strong>{user.name}</strong>
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn btn-outline-primary btn-sm">Login to view your registrations</Link>
            </div>
          )}
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Your Registrations</h5>
              <p className="display-6 mb-0">{total}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8 mb-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                Registrations by Category
                <button className="btn btn-sm btn-outline-secondary" onClick={handleDownload} disabled={total === 0}>Download</button>
              </h5>

              {/* ✅ Pie Chart Section */}
              {chartData.length === 0 ? (
                <p className="text-muted mb-0">No registrations yet</p>
              ) : (
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Registered events table */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Your Registered Events</h5>

          { !user ? (
            <div className="text-center py-4">
              <p className="mb-2">Please log in to view your personal registrations.</p>
              <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
          ) : regsWithEvent.length === 0 ? (
            <div className="text-center py-4">
              <p className="mb-2">You have no registrations yet.</p>
              <Link to="/events" className="btn btn-primary">Browse Events</Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Attendee</th>
                    <th>Contact</th>
                    <th>Registered At</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {regsWithEvent.map(r => (
                    <tr key={r.regId}>
                      <td style={{minWidth: 200}}>
                        {r.event ? (
                          <>
                            <strong>{r.event.title}</strong><br/>
                            <small className="text-muted">{r.event.venue}</small>
                          </>
                        ) : (
                          <em>Event removed ({r.eventId})</em>
                        )}
                      </td>
                      <td>{r.event ? new Date(r.event.date).toLocaleString() : '-'}</td>
                      <td>{r.event ? r.event.category : 'Unknown'}</td>
                      <td>{r.attendee?.name}</td>
                      <td>
                        <div>{r.attendee?.email}</div>
                        <div className="text-muted small">{r.attendee?.phone}</div>
                      </td>
                      <td>{new Date(r.createdAt).toLocaleString()}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(r.regId)}>
                          Cancel
                        </button>
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
