import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { serviceCatalog } from '../data/serviceCatalog';

export function ServicesPage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo
        title="Servicios"
        description="Barbería, combos, tattoo y nails de Indian Club en Loja. Consulta todas las opciones disponibles y reserva online."
      />

      <section className="services-hub-hero">
        <div>
          <span>Servicios Indian Club</span>
          <h1>Todo lo que puedes hacer en Indian.</h1>
        </div>
        <p>
          Elige un área para conocer todas sus opciones, duración aproximada y precio de referencia.
        </p>
      </section>

      <section className="services-hub-grid" aria-label="Áreas de servicio de Indian Club">
        {serviceCatalog.map((area, index) => (
          <motion.article
            className={`services-hub-card services-hub-card--${area.id}`}
            key={area.id}
            initial={reduceMotion ? false : { opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.62, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to={`/servicios/${area.route}`} aria-label={`Ver ${area.title}`}>
              <div className="services-hub-card__media">
                {area.media.kind === 'video' && area.media.video ? (
                  <ViewportVideo
                    src={area.media.video}
                    poster={area.media.poster}
                    label={`${area.title} en Indian Club`}
                  />
                ) : (
                  <img src={area.media.poster} alt={`${area.title} en Indian Club`} loading="lazy" />
                )}
                <div className="services-hub-card__veil" />
              </div>

              <div className="services-hub-card__copy">
                <small>{area.eyebrow}</small>
                <h2>{area.title}</h2>
                <p>{area.summary}</p>
                <div className="services-hub-card__preview">
                  {area.groups.flatMap((group) => group.items).slice(0, 3).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <footer>
                  <span>{area.duration}</span>
                  <strong>{area.price}</strong>
                  <i aria-hidden="true">Ver opciones ↗</i>
                </footer>
              </div>
            </Link>
          </motion.article>
        ))}
      </section>

      <section className="services-help">
        <div>
          <span>¿No sabes cuál elegir?</span>
          <h2>Cuéntanos qué necesitas y te ayudamos a encontrar el servicio adecuado.</h2>
        </div>
        <Link to="/contacto">Hablar con Indian Club ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
