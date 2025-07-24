import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx'

// Get values from .env.local
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

if (!domain || !clientId) {
  throw new Error("Auth0 domain or client ID is missing. Check your .env.local file.");
}

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)