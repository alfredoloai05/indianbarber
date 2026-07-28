import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { AdminPage } from './pages/AdminPage';
import { ArticlePage } from './pages/ArticlePage';
import { ClubPage } from './pages/ClubPage';
import { ContactPage } from './pages/ContactPage';
import { GiftCardsPage } from './pages/GiftCardsPage';
import { HomePage } from './pages/HomePage';
import { InspirePage } from './pages/InspirePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { ReservePage } from './pages/ReservePage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { StyleBookPage } from './pages/StyleBookPage';
import { TeamPage } from './pages/TeamPage';

function App() {
  return (
    <Routes>
      <Route path="admin" element={<AdminPage />} />
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="servicios" element={<ServicesPage />} />
        <Route path="servicios/:slug" element={<ServiceDetailPage />} />
        <Route path="equipo" element={<TeamPage />} />
        <Route path="club" element={<ClubPage />} />
        <Route path="style-book" element={<StyleBookPage />} />
        <Route path="promociones" element={<PromotionsPage />} />
        <Route path="productos" element={<ProductsPage />} />
        <Route path="tarjetas-regalo" element={<GiftCardsPage />} />
        <Route path="inspirate" element={<InspirePage />} />
        <Route path="inspirate/:slug" element={<ArticlePage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="reservar" element={<ReservePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
