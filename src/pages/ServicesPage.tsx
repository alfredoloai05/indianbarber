import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { serviceCatalog } from '../data/serviceCatalog';

export function ServicesPage() {
  const [activeArea, setActiveArea] = useState(0);
  const reduceMotion = useReducedMotion();
  const currentArea = serviceCatalog[activeArea];

  return (
    <>
      <Seo
        title="Servicios"
        description="Barbería, combos, tattoo y nails de Indian Club en Loja. Elige un área y consulta todas sus opciones."
      />

      <section className="services-clean-hero">
        <span>Servicios</span>
        <h1>Todo lo que puedes hacer en Indian.</h1>
        <p>Elige un área para conocer sus opciones y reservar.</p>
      </section>

      <section className="services-catalog-stage" aria-label="Áreas de servicio de Indian Club">
        <div className="services-catalog-stage__visual">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArea.id}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.025, x: -18 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentArea.media.kind === 'video' && currentArea.media.video ? (
                <ViewportVideo
                  src={currentArea.media.video}
                  poster={currentArea.media.poster}
                  label={`${currentArea.title} en Indian Club`}
                  priority
                />
              ) : (
                <img src={currentArea.media.poster} alt={`${currentArea.title} en Indian Club`} loading="eager" />
              )}
              <div className="services-catalog-stage__veil" />
              <div className="services-catalog-stage__caption">
                <small>{currentArea.eyebrow}</small>
                <h2>{currentArea.title}</h2>
                <p>{currentArea.summary}</p>
                <Link to={`/servicios/${currentArea.route}`}>Ver todas las opciones ↗</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="services-catalog-stage__menu">
          {serviceCatalog.map((area, index) => (
            <Link
              to={`/servicios/${area.route}`}
              key={area.id}
              className={activeArea === index ? 'is-active' : undefined}
              onMouseEnter={() => setActiveArea(index)}
              onFocus={() => setActiveArea(index)}
            >
              <div>
                <strong>{area.title}</strong>
                <span>{area.eyebrow}</span>
              </div>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="services-help services-help--compact">
        <div>
          <span>¿Necesitas ayuda?</span>
          <h2>Escríbenos y te orientamos antes de reservar.</h2>
        </div>
        <Link to="/contacto">Hablar con Indian Club ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
