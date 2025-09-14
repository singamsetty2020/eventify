// src/pages/EventPage.js
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import RegisterModal from '../components/RegisterModal';

export default function EventPage() {
  const { id } = useParams();
  const { events } = useContext(EventContext);

  const event = events.find(e => e.id === id);
  if (!event) return <p className="text-danger">Event not found</p>;

  const deadlinePassed = new Date(event.deadline) < new Date();

  return (
    <div>
      <h2>{event.title}</h2>
      <p className="text-muted">{event.category} • {new Date(event.date).toLocaleString()}</p>

      <img src={event.image} alt={event.title} className="img-fluid rounded mb-3" />

      <p>{event.description}</p>

      <ul className="list-group mb-3">
        <li className="list-group-item"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</li>
        <li className="list-group-item"><strong>Venue:</strong> {event.venue}</li>
        <li className="list-group-item"><strong>Registration Deadline:</strong> {event.deadline}</li>
      </ul>

      {deadlinePassed ? (
        <button className="btn btn-secondary" disabled>
          Registration Closed
        </button>
      ) : (
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#registerModal"
        >
          Register
        </button>
      )}
      <Link to="/events" className="btn btn-outline-secondary ms-2">Back to Events</Link>

      {/* Register Modal */}
      <RegisterModal event={event} />
    </div>
  );
}
