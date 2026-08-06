import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CmsProvider } from './content/CmsProvider';
import './styles/design-tokens.css';
import './styles/global.css';
import './styles/pages.css';
import './styles/admin.css';
import './styles/final-prototype.css';
import './styles/final-components.css';
import './styles/polish-overrides.css';
import './styles/brand-motion.css';
import './styles/immersive-home-v2.css';
import './styles/art-direction-v3.css';
import './styles/content-flow-polish.css';
import './styles/desktop-hero-viewport.css';
import './styles/services-architecture-v4.css';
import './styles/global-numbering-cleanup-v5.css';
import './styles/services-cleanup-v6.css';
import './styles/hero-integrated-ticker-v8.css';
import './styles/club-footer-service-v9.css';
import './styles/home-service-portals-v10.css';
import './styles/viewport-service-layouts-v11.css';
import './styles/service-detail-asymmetry-v12.css';
import './styles/mobile-menu-team-v13.css';
import './styles/home-guides-menu-v14.css';
import './styles/home-gift-cards-v15.css';
import './styles/spa-photo-layout-v16.css';
import './styles/experience-polish-v17.css';
import './styles/editorial-cleanup-v18.css';
import './styles/home-club-location-v19.css';
import './styles/home-booking-stylebook-v20.css';
import './styles/four-spaces-house-v21.css';
import './styles/experience-fixes-v22.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('No se encontró el elemento raíz de la aplicación.');
}

createRoot(root).render(
  <StrictMode>
    <CmsProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </CmsProvider>
  </StrictMode>,
);
