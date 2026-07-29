import { Link, useParams } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { bookingUrl, services } from '../data/site';

const stepDescriptions = [
  'Revisamos la referencia, tu rutina y el resultado que buscas antes de comenzar.',
  'Trabajamos la técnica y los detalles necesarios para este servicio.',
  'Comprobamos el resultado y te explicamos cómo mantenerlo.',
];

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
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
      <Seo title={service.title} description={service.detail} />

      <section className="service-detail-final service-detail-final--clean">
        <div className="service-detail-final__media">
          <img src={service.image} alt={service.imageAlt} loading="eager" />
          <div aria-hidden="true" />
        </div>
        <div className="service-detail-final__copy">
          <Link to="/servicios">← Todos los servicios</Link>
          <p className="final-kicker">{service.kicker}</p>
          <h1>{service.title}</h1>
          <p>{service.detail}</p>
          <dl>
            <div><dt>Tiempo estimado</dt><dd>{service.duration}</dd></div>
            <div><dt>Precio de referencia</dt><dd>{service.price}</dd></div>
            <div><dt>Especialidad</dt><dd>{service.signature}</dd></div>
          </dl>
          <a className="final-button" href={bookingUrl} target="_blank" rel="noreferrer">Ver disponibilidad ↗</a>
        </div>
      </section>

      <section className="service-ritual service-ritual--final service-ritual--clean">
        <div>
          <p className="final-kicker">Cómo funciona</p>
          <h2>Así trabajamos este servicio.</h2>
          <p>Revisamos contigo lo que necesitas, realizamos el servicio y cerramos con recomendaciones claras.</p>
        </div>
        <ul>
          {service.ritual.map((step, index) => (
            <li key={step}>
              <strong>{step}</strong>
              <p>{stepDescriptions[index]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="service-inclusions service-inclusions--clean">
        <div>
          <span>Incluye</span>
          <h2>Lo que forma parte del servicio.</h2>
        </div>
        <ul>
          {service.inclusions.map((item) => (
            <li key={item}><strong>{item}</strong></li>
          ))}
        </ul>
      </section>

      <section className="service-note service-note--complete">
        <span>Antes de reservar</span>
        <p>
          La disponibilidad, profesional y valor final aparecen en AgendaPro. Tattoo, diseños personalizados y algunos tratamientos pueden requerir cotización previa.
        </p>
        <Link to="/contacto">Resolver una duda ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
