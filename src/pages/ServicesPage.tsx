import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { services } from '../data/site';

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Servicios"
        description="Cortes, barba, combos, nails, tattoo y servicios especiales de Indian Club en Loja, con duración y precio de referencia."
      />

      <section className="chapter-intro">
        <div className="chapter-intro__index">01 / OFICIO</div>
        <div>
          <p className="final-kicker">Servicios Indian Club</p>
          <h1>El catálogo no empieza con una lista. <em>Empieza con una intención.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Revisa qué resuelve cada ritual, cuánto tiempo requiere y su precio de referencia. La disponibilidad definitiva se confirma en AgendaPro.
        </p>
      </section>

      <section className="service-reel service-reel--internal" aria-label="Catálogo completo de servicios">
        <div className="service-reel__list">
          {services.map((service) => (
            <Link className="service-reel__item" to={`/servicios/${service.slug}`} key={service.slug}>
              <span className="service-reel__number">{service.number}</span>
              <div className="service-reel__image">
                <img src={service.image} alt={service.imageAlt} loading="lazy" />
              </div>
              <div className="service-reel__copy">
                <small>{service.kicker}</small>
                <h2>{service.title}</h2>
                <p>{service.detail}</p>
              </div>
              <div className="service-reel__meta">
                <span>{service.duration}</span>
                <strong>{service.price}</strong>
                <i aria-hidden="true">↗</i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="decision-strip decision-strip--complete">
        <span>Orientación</span>
        <p>¿Es tu primera visita o no sabes qué servicio elegir? Cuéntanos qué quieres mantener, cambiar o preparar.</p>
        <Link to="/contacto">Hablar con Indian <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="service-disclosure">
        <div>
          <span>Precios claros</span>
          <h2>La referencia aparece antes del compromiso.</h2>
        </div>
        <p>
          Los precios publicados son referencias tomadas del catálogo vigente de Indian Club. Algunos servicios, especialmente tattoo y tratamientos personalizados, requieren evaluación o cotización previa.
        </p>
      </section>

      <BookingBand />
    </>
  );
}
