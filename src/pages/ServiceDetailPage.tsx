import { Link, useParams } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { bookingUrl, services } from '../data/site';

const stepDescriptions = [
  'Alineamos intención, referencia, mantenimiento y límites antes de comenzar.',
  'La técnica se adapta a tu rostro, textura, piel o idea; nunca al revés.',
  'Cerramos con acabado, cuidados y una expectativa clara sobre cómo sostener el resultado.',
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

      <section className="service-detail-final">
        <div className="service-detail-final__media">
          <img src={service.image} alt={service.imageAlt} loading="eager" />
          <div aria-hidden="true" />
          <span>{service.number} / 06</span>
        </div>
        <div className="service-detail-final__copy">
          <Link to="/servicios">← Todos los servicios</Link>
          <p className="final-kicker">{service.kicker}</p>
          <h1>{service.title}</h1>
          <p>{service.detail}</p>
          <dl>
            <div><dt>Tiempo estimado</dt><dd>{service.duration}</dd></div>
            <div><dt>Precio de referencia</dt><dd>{service.price}</dd></div>
            <div><dt>Firma</dt><dd>{service.signature}</dd></div>
          </dl>
          <a className="final-button" href={bookingUrl} target="_blank" rel="noreferrer">Ver disponibilidad ↗</a>
        </div>
      </section>

      <section className="service-ritual service-ritual--final">
        <div>
          <p className="final-kicker">La secuencia</p>
          <h2>El resultado empieza antes de la herramienta.</h2>
          <p>La consulta inicial ayuda a elegir una referencia que funcione con tu textura, tu rutina y el resultado que quieres mantener.</p>
        </div>
        <ol>
          {service.ritual.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
              <p>{stepDescriptions[index]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="service-inclusions">
        <div>
          <span>Incluye o puede incluir</span>
          <h2>Todo lo que forma parte del servicio.</h2>
        </div>
        <ul>
          {service.inclusions.map((item, index) => (
            <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>
          ))}
        </ul>
      </section>

      <section className="service-note service-note--complete">
        <span>Antes de reservar</span>
        <p>
          La disponibilidad, profesional y valor final aparecen en AgendaPro. Tattoo, diseños personalizados y algunos tratamientos pueden requerir cotización o conversación previa.
        </p>
        <Link to="/contacto">Resolver una duda ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
