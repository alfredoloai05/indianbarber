import { Link, useParams } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { useGlobalSettings, useServiceCatalogContent } from '../content/useSiteContent';
import { bookingPath } from '../utils/booking';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const serviceCatalog = useServiceCatalogContent();
  const settings = useGlobalSettings();
  const area = serviceCatalog.find((item) => slug && item.aliases.includes(slug));

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

      <section className={`catalog-detail-hero catalog-detail-hero--compact catalog-detail-hero--${area.id}`}>
        <div className="catalog-detail-hero__media">
          {area.media.kind === 'video' && area.media.video ? (
            <ViewportVideo
              src={area.media.video}
              poster={area.media.poster}
              label={`${area.title} en ${settings.brandName}`}
              priority
            />
          ) : (
            <img src={area.media.poster} alt={`${area.title} en ${settings.brandName}`} loading="eager" />
          )}
          <div aria-hidden="true" />
        </div>

        <div className="catalog-detail-hero__copy">
          <Link to="/servicios">← Servicios</Link>
          <small>{area.eyebrow}</small>
          <h1>{area.title}</h1>
          <p>{area.summary}</p>
          <div className="catalog-detail-hero__meta">
            <span>{area.duration}</span>
            <strong>{area.price}</strong>
          </div>
          <Link to={bookingPath(area.id)}>Elegir cita ↗</Link>
        </div>
      </section>

      <section
        className={`catalog-options catalog-options--direct catalog-options--${area.id}`}
        aria-labelledby="catalog-options-title"
      >
        <header>
          <span>Servicios disponibles</span>
          <h2 id="catalog-options-title">Elige tu servicio.</h2>
          <p>Los tiempos marcados como aproximados pueden variar según el trabajo. La fecha y la hora se confirman directamente con Indian Club.</p>
        </header>

        <div className="catalog-options__groups">
          {area.groups.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name} className={`catalog-option${item.note ? ' catalog-option--with-note' : ''}`}>
                    <div className="catalog-option__content">
                      <strong>{item.name}</strong>
                      {item.note ? <p>{item.note}</p> : null}
                    </div>
                    <div className="catalog-option__meta" aria-label={`Duración ${item.duration}; precio ${item.price}`}>
                      <span>{item.duration}</span>
                      <b>{item.price}</b>
                    </div>
                    <Link to={bookingPath(area.id, item.name)} aria-label={`Reservar ${item.name}`}>Reservar ↗</Link>
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
        <a href={settings.whatsappHref} target="_blank" rel="noreferrer">Escribir por WhatsApp ↗</a>
      </section>

      <BookingBand area={area.id} />
    </>
  );
}
