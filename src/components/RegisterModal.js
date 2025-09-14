// src/components/RegisterModal.js
import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import { AuthContext } from '../context/AuthContext';

export default function RegisterModal({ event }) {
  const { registerEvent } = useContext(EventContext);
  const { user } = useContext(AuthContext);

  // prefill from logged-in user if available
  const [attendee, setAttendee] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: ''
  });

  // update attendee if user changes (e.g. login while modal open)
  useEffect(() => {
    setAttendee(prev => ({
      name: user?.name ?? prev.name,
      email: user?.email ?? prev.email,
      phone: prev.phone
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic safety checks
    if (!event || !event.id) {
      alert('Event not available. Please refresh or try again.');
      return;
    }

    const finalAttendee = {
      ...attendee,
      name: (attendee.name || '').trim(),
      email: (user?.email) ? user.email.trim() : (attendee.email || '').trim(),
      phone: (attendee.phone || '').trim()
    };

    if (!finalAttendee.name || !finalAttendee.email || !finalAttendee.phone) {
      alert('Please fill all fields');
      return;
    }

    try {
      registerEvent(event.id, finalAttendee);
    } catch (err) {
      console.error('registerEvent error', err);
      alert('Could not register — check console for details.');
      return;
    }

    // reset phone only; keep name/email for convenience (if guest)
    setAttendee({
      name: user?.name ?? finalAttendee.name,
      email: user?.email ?? finalAttendee.email,
      phone: ''
    });

    // show success toast (safely)
    try {
      const toastEl = document.getElementById('successToast');
      if (toastEl && window.bootstrap && window.bootstrap.Toast) {
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();
      }
    } catch (err) {
      console.warn('Toast show failed', err);
    }

    // close modal safely
    try {
      const modalEl = document.getElementById('registerModal');
      if (modalEl && window.bootstrap && window.bootstrap.Modal) {
        // use getOrCreateInstance so we always get an instance to hide
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
        if (modal) modal.hide();
      }
    } catch (err) {
      console.warn('Modal hide failed', err);
    }
  };

  return (
    <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Register for {event?.title ?? 'this event'}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            {/* Banner: remind users to login to save registrations to their account */}
            {!user && (
              <div className="alert alert-warning">
                <strong>Tip:</strong> Login first to save registrations to your account. Registering as a guest will save data in this browser but it won't be linked to your account.
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Name</label>
              {/* Name is editable always now */}
              <input
                name="name"
                value={attendee.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={attendee.email}
                onChange={handleChange}
                className="form-control"
                required
                readOnly={!!user} // keep email readonly when logged in (optional)
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                value={attendee.phone}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">Submit Registration</button>
          </div>
        </form>
      </div>
    </div>
  );
}
