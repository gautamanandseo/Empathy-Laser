import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/apple3d.css';

// CRITICAL: Global WebAuthn/Credentials API Blocker
// This must execute before any other code to prevent "Cannot assign to read only property 'get'" errors
// and to strictly enforce the removal of all WebAuthn functionality.
(function() {
  if (typeof window !== 'undefined' && window.navigator) {
    try {
      // 1. Attempt to neuter the specific methods first (in case the object itself is read-only)
      if (window.navigator.credentials) {
        const noopPromise = () => Promise.reject(new Error('WebAuthn/Credentials API is strictly disabled.'));
        
        try { window.navigator.credentials.create = noopPromise; } catch(e) {}
        try { window.navigator.credentials.get = noopPromise; } catch(e) {}
        try { window.navigator.credentials.store = noopPromise; } catch(e) {}
        try { window.navigator.credentials.preventSilentAccess = noopPromise; } catch(e) {}
      }

      // 2. Attempt to completely overwrite the navigator.credentials property
      // We use Object.defineProperty to try and force it to be undefined
      Object.defineProperty(window.navigator, 'credentials', {
        value: undefined,
        configurable: true, // Attempt to leave it configurable to avoid TypeError if re-defined later
        writable: true
      });
      
      console.log('🔒 Security: navigator.credentials has been successfully blocked.');
    } catch (e) {
      console.warn('Security Warning: Could not fully block navigator.credentials, but methods may have been disabled.', e);
    }
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);