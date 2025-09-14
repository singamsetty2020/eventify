// src/pages/EventsPage.js
import React, { useContext, useMemo, useState } from 'react';
import { EventContext } from '../context/EventContext';
import EventCard from '../components/EventCard';
import SearchFilter from '../components/SearchFilter';

export default function EventsPage() {
  const { events } = useContext(EventContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // compute unique categories (memoized)
  const categories = useMemo(() => {
    const set = new Set(events.map(e => e.category));
    return ['All', ...Array.from(set)];
  }, [events]);

  // filtered & sorted events
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return events
      .filter(ev => {
        const matchesSearch = s === '' || ev.title.toLowerCase().includes(s);
        const matchesCategory = category === 'All' || ev.category === category;
        return matchesSearch && matchesCategory;
      })
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first
  }, [events, search, category]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-0">All Events</h2>
          <small className="text-muted">Browse and register for upcoming events</small>
        </div>
      </div>

      {/* Search + category */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

      {/* Events grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <h5>No events found</h5>
          <p className="text-muted">Try clearing the search term or pick a different category.</p>
          <button className="btn btn-outline-primary" onClick={() => { setSearch(''); setCategory('All'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {filtered.map(ev => (
            <div key={ev.id} className="col-12 col-md-6 col-lg-4">
              <EventCard event={ev} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
