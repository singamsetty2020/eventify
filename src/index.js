import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EventProvider } from './context/EventContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';  // ✅ import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <ThemeProvider>   {/* ✅ wrap App */}
          <App />
        </ThemeProvider>
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);
