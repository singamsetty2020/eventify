// src/components/EventCard.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={event.image}
        className="card-img-top"
        alt={event.title}
        style={{ height: 160, objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event.title}</h5>
        <p className="mb-1 text-muted small">{event.category} • {new Date(event.date).toLocaleString()}</p>
        <p className="card-text">{event.description.length > 100 ? event.description.slice(0, 100) + '...' : event.description}</p>
        <div className="mt-auto">
          <Link to={`/event/${event.id}`} className="btn btn-sm btn-primary">View Details</Link>
        </div>
      </div>
    </div>
  );
}
