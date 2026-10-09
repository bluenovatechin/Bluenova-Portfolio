import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles.css';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build ships pre-rendered HTML; attach to it instead of re-rendering.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
