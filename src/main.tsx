import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/design-tokens.css';
import './styles/global.css';
import './styles/pages.css';
import './styles/admin.css';
import './styles/final-prototype.css';
import './styles/final-components.css';
import './styles/polish-overrides.css';
import './styles/brand-motion.css';
import './styles/immersive-home-v2.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('No se encontró el elemento raíz de la aplicación.');
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
