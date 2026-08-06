import { Link, Navigate, useParams } from 'react-router-dom';
import { useServiceCatalogContent } from '../content/useSiteContent';
import { spacePath } from '../utils/spaces';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const serviceCatalog = useServiceCatalogContent();
  const area = serviceCatalog.find((item) => slug && item.aliases.includes(slug));

  if (area) return <Navigate to={spacePath(area.id, 'servicios')} replace />;

  return (
    <section className="not-found compact-not-found">
      <span>Servicio no encontrado</span>
      <h1>Este servicio no está disponible.</h1>
      <Link className="button" to="/#espacios">Explorar Indian House</Link>
    </section>
  );
}
