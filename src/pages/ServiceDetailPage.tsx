import { Link, useParams } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { services } from '../data/site';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <section className="not-found compact-not-found">
        <span>Servicio no encontrado</span>
        <h1>La ruta existe. El ritual todavía no.</h1>
        <Link className="button" to="/servicios">Volver a servicios</Link>
      </section>
    );
  }

  return (
    <>
      <Seo title={service.title} description={service.detail} />
      <section className={`service-detail service-detail--${service.number}`}>
        <div className="service-detail__rail">
          <Link to="/servicios">← Todos los servicios</Link>
          <span>{service.number} / 04</span>
        </div>
        <div className="service-detail__hero">
          <p className="eyebrow">{service.kicker}</p>
          <h1>{service.title}</h1>
          <p>{service.detail}</p>
        </div>
        <div className="service-detail__facts">
          <div><span>Duración</span><strong>{service.duration}</strong></div>
          <div><span>Firma</span><strong>{service.signature}</strong></div>
        </div>
      </section>

      <section className="service-ritual">
        <div>
          <p className="eyebrow">El proceso</p>
          <h2>Una secuencia con intención.</h2>
        </div>
        <ol>
          {service.ritual.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
              <p>{index === 0 ? 'Alineamos expectativas antes de comenzar.' : index === 1 ? 'La técnica se adapta a la persona, no al revés.' : 'Cerramos con claridad para sostener el resultado.'}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="service-note">
        <span>Antes de reservar</span>
        <p>Los precios y disponibilidad definitivos se muestran en AgendaPro. Esta página explica el criterio y la experiencia antes de enviar al flujo externo.</p>
      </section>

      <BookingBand />
    </>
  );
}
