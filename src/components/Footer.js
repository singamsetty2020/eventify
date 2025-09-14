// src/components/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-light py-4 mt-5">
      <div className="container text-center">
        <small className="text-muted">© {new Date().getFullYear()} Eventify. Built with React & Bootstrap.</small>
      </div>
    </footer>
  );
}
