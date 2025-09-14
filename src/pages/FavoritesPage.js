// src/pages/FavoritesPage.js
import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const { events, favorites } = useContext(EventContext);

  const favEvents = events.filter(ev => favorites.includes(ev.id));

  return (
    <div>
      <h2 className="mb-4">My Favorite Events</h2>
      {favEvents.length === 0 ? (
        <p>No favorites yet. Go mark some events!</p>
      ) : (
        <div className="row g-4">
          {favEvents.map(ev => (
            <div className="col-md-4" key={ev.id}>
              <div className="card h-100 shadow-sm">
                <img src={ev.image} className="card-img-top" alt={ev.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{ev.title}</h5>
                  <p className="text-muted small mb-1">{ev.category} • {new Date(ev.date).toLocaleDateString()}</p>
                  <Link to={`/event/${ev.id}`} className="btn btn-primary mt-auto">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
