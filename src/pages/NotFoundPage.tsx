import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Página no encontrada" description="La ruta solicitada no existe en Indian Club." />
      <section className="not-found">
        <span>404 / FUERA DE RUTA</span>
        <div aria-hidden="true">IC</div>
        <h1>No estás perdido. Solo llegaste a una puerta que no existe.</h1>
        <p>Vuelve a la casa o continúa directamente hacia los servicios.</p>
        <div>
          <Link className="button" to="/">Volver al inicio</Link>
          <Link className="text-link" to="/servicios">Ver servicios</Link>
        </div>
      </section>
    </>
  );
}
