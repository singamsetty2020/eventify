// src/pages/Landing.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';

export default function Landing() {
  const { events, favorites, toggleFavorite } = useContext(EventContext);

  // upcoming events for hero slider
  const upcoming = events
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter(e => new Date(e.date) >= new Date())
    .slice(0, 4);

  // pick some events to show as preview cards below
  const featured = events.slice(0, 6);

  return (
    <div>
      {/* Hero with carousel */}
      <section className="py-4 mb-4 bg-primary text-white rounded-3">
        <div className="container">
          <div className="row align-items-center">
            
            {/* Left side (text) */}
            <div className="col-md-5 mb-4 mb-md-0 d-flex flex-column justify-content-center">
              <h1 className="hero-title">Discover & Register</h1>
              <p className="hero-subtext">
                Browse upcoming technical talks, sports, cultural events and workshops near you.
              </p>
              <Link to="/events" className="btn btn-light btn-md mt-2">Browse Events</Link>
            </div>

            {/* Right side (slider) */}
            <div className="col-md-7">
              {upcoming.length === 0 ? (
                <div className="bg-light text-dark rounded p-4 text-center">
                  <p className="mb-0">No upcoming events right now. Check back later.</p>
                </div>
              ) : (
                <div
                  id="heroCarousel"
                  className="carousel slide carousel-fade"
                  data-bs-ride="carousel"
                  data-bs-interval="2500"   // faster auto slide (2.5s)
                >
                  <div className="carousel-inner rounded shadow">
                    {upcoming.map((ev, idx) => (
                      <div key={ev.id} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                        <Link to={`/event/${ev.id}`}>
                          <img src={ev.image} className="d-block w-100 hero-carousel-img" alt={ev.title} />
                        </Link>
                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                          <h5>{ev.title}</h5>
                          <p className="small">{new Date(ev.date).toLocaleDateString()} • {ev.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Controls */}
                  {upcoming.length > 1 && (
                    <>
                      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured events section */}
      <section className="mb-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Featured Events</h3>
            <Link to="/events" className="small">View all</Link>
          </div>
          <div className="row g-4">
            {featured.map(ev => (
              <div className="col-md-4" key={ev.id}>
                <div className="card h-100 shadow-sm">
                  <img src={ev.image} className="card-img-top" alt={ev.title} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{ev.title}</h5>
                    <p className="text-muted small mb-1">{ev.category} • {new Date(ev.date).toLocaleDateString()}</p>
                    <p className="card-text flex-grow-1">
                      {ev.description.length > 100 ? ev.description.slice(0, 100) + "..." : ev.description}
                    </p>
                    {/* Actions: View + Fav */}
                    <div className="d-flex justify-content-between mt-auto">
                      <Link to={`/event/${ev.id}`} className="btn btn-primary btn-sm">View</Link>
                      <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => toggleFavorite(ev.id)}
                      >
                        {favorites.includes(ev.id) ? "★ Fav" : "☆ Fav"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
