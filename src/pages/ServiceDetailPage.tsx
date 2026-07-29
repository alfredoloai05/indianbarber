import { Link, useParams } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { findServiceCatalogArea } from '../data/serviceCatalog';
import { bookingUrl, contact } from '../data/site';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const area = findServiceCatalogArea(slug);

  if (!area) {
    return (
      <section className="not-found compact-not-found">
        <span>Servicio no encontrado</span>
        <h1>Este servicio no está disponible.</h1>
        <Link className="button" to="/servicios">Volver a servicios</Link>
      </section>
    );
  }

  return (
    <>
      <Seo title={area.title} description={area.summary} />

      <section className={`catalog-detail-hero catalog-detail-hero--${area.id}`}>
        <div className="catalog-detail-hero__media">
          {area.media.kind === 'video' && area.media.video ? (
            <ViewportVideo
              src={area.media.video}
              poster={area.media.poster}
              label={`${area.title} en Indian Club`}
              priority
            />
          ) : (
            <img src={area.media.poster} alt={`${area.title} en Indian Club`} loading="eager" />
          )}
          <div aria-hidden="true" />
        </div>

        <div className="catalog-detail-hero__copy">
          <Link to="/servicios">← Todos los servicios</Link>
          <small>{area.eyebrow}</small>
          <h1>{area.title}</h1>
          <p>{area.summary}</p>
          <dl>
            <div><dt>Tiempo aproximado</dt><dd>{area.duration}</dd></div>
            <div><dt>Precio de referencia</dt><dd>{area.price}</dd></div>
          </dl>
          <a href={bookingUrl} target="_blank" rel="noreferrer">Ver disponibilidad ↗</a>
        </div>
      </section>

      <section className="catalog-options" aria-labelledby="catalog-options-title">
        <header>
          <span>Opciones disponibles</span>
          <h2 id="catalog-options-title">Elige lo que necesitas.</h2>
          <p>El valor y la duración final dependen de la opción elegida y de la disponibilidad del profesional.</p>
        </header>

        <div className="catalog-options__groups">
          {area.groups.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                    <a href={bookingUrl} target="_blank" rel="noreferrer" aria-label={`Reservar ${item}`}>Reservar ↗</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="catalog-contact-strip">
        <div>
          <span>Consulta directa</span>
          <h2>¿Necesitas cotización o ayuda para elegir?</h2>
        </div>
        <a href={contact.whatsappHref} target="_blank" rel="noreferrer">Escribir por WhatsApp ↗</a>
      </section>

      <BookingBand />
    </>
  );
}
