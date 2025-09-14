// src/context/EventContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import eventsData from '../data/events.json';
import { AuthContext } from './AuthContext';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // may be null
  const [events] = useState(eventsData);

  // ✅ Registrations
  const [registered, setRegistered] = useState(() => {
    const raw = localStorage.getItem('eventify_registered');
    return raw ? JSON.parse(raw) : [];
  });

  // ✅ Favorites
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('eventify_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // One-time migration: attach ownerEmail to existing registrations if possible
  useEffect(() => {
    const migratedKey = 'eventify_registered_migrated_v1';
    if (localStorage.getItem(migratedKey) === 'true') return;

    const current = registered.slice();
    let changed = false;

    for (let i = 0; i < current.length; i++) {
      const r = current[i];
      if (!r.ownerEmail && r.attendee && r.attendee.email) {
        current[i] = { ...r, ownerEmail: r.attendee.email.trim().toLowerCase() };
        changed = true;
      }
    }

    if (changed) {
      setRegistered(current);
      localStorage.setItem('eventify_registered', JSON.stringify(current));
    }

    localStorage.setItem(migratedKey, 'true');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Save registrations on change
  useEffect(() => {
    localStorage.setItem('eventify_registered', JSON.stringify(registered));
  }, [registered]);

  // Save favorites on change
  useEffect(() => {
    localStorage.setItem('eventify_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Event registration
  const registerEvent = (eventId, attendee) => {
    const attendeeEmail = attendee?.email?.trim()?.toLowerCase();
    const ownerEmail = (user && user.email) ? user.email.trim().toLowerCase() : attendeeEmail;

    const reg = {
      regId: Date.now().toString(),
      eventId,
      attendee,
      ownerEmail,
      createdAt: new Date().toISOString()
    };
    setRegistered(prev => [...prev, reg]);
  };

  // ✅ Cancel registration
  const cancelRegistration = (regId) => {
    setRegistered(prev => prev.filter(r => r.regId !== regId));
  };

  // ✅ Toggle favorite
  const toggleFavorite = (eventId) => {
    setFavorites(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        registered,
        registerEvent,
        cancelRegistration,
        favorites,
        toggleFavorite
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
