import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { services } from '../data/site';

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Servicios"
        description="Explora los servicios de Indian Club: corte de autor, barba ritual, signature combo y experiencias de expresión personal en Loja."
      />
      <PageHero
        index="01 / OFICIO"
        eyebrow="Servicios Indian Club"
        title="Elegir bien empieza por "
        accent="entender qué necesitas."
        description="No organizamos el catálogo por tendencias. Lo organizamos por intención, tiempo y nivel de transformación para que la elección sea clara."
      />

      <section className="service-catalog" aria-label="Catálogo de servicios">
        {services.map((service) => (
          <article className="service-editorial" key={service.slug}>
            <div className="service-editorial__index">{service.number}</div>
            <div className="service-editorial__copy">
              <span>{service.kicker}</span>
              <h2>{service.title}</h2>
              <p>{service.detail}</p>
            </div>
            <div className="service-editorial__meta">
              <span>Tiempo estimado</span>
              <strong>{service.duration}</strong>
              <span>Resultado</span>
              <strong>{service.signature}</strong>
            </div>
            <Link to={`/servicios/${service.slug}`} aria-label={`Conocer ${service.title}`}>
              Ver ritual <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </section>

      <section className="decision-strip">
        <span>¿No sabes qué elegir?</span>
        <p>Empieza por el resultado que necesitas sostener, no por el nombre técnico del servicio.</p>
        <Link to="/contacto">Hablar con la casa <span aria-hidden="true">↗</span></Link>
      </section>

      <BookingBand />
    </>
  );
}
