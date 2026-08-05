import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { useServiceCatalogContent } from '../content/useSiteContent';

export function ServicesPage() {
  const [activeArea, setActiveArea] = useState(0);
  const reduceMotion = useReducedMotion();
  const serviceCatalog = useServiceCatalogContent();

  return (
    <>
      <Seo
        title="Servicios"
        description="Barbería, combos, SPA, nails y estudio fotográfico de Indian Club en Loja. Conoce las opciones, tiempos y formas de reserva."
      />

      <section className="services-clean-hero services-clean-hero--quadrants services-clean-hero--minimal">
        <h1>Barbería, SPA, nails y fotografía.</h1>
      </section>

      <section className="services-quadrants services-quadrants--five services-quadrants--clean" aria-label="Áreas de servicio de Indian Club">
        {serviceCatalog.map((area, index) => {
          const isActive = activeArea === index;
          const examples = area.groups.flatMap((group) => group.items).slice(0, 3);

          return (
            <Link
              to={`/servicios/${area.route}`}
              key={area.id}
              className={`services-quadrant services-quadrant--${area.id}${isActive ? ' is-active' : ''}`}
              onMouseEnter={() => setActiveArea(index)}
              onFocus={() => setActiveArea(index)}
            >
              <div className="services-quadrant__poster">
                <img src={area.media.poster} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
              </div>

              {isActive && area.media.kind === 'video' && area.media.video ? (
                <motion.div
                  className="services-quadrant__video"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ViewportVideo
                    src={area.media.video}
                    poster={area.media.poster}
                    label={`${area.title} en Indian Club`}
                    priority={index === 0}
                  />
                </motion.div>
              ) : null}

              <div className="services-quadrant__ambient" aria-hidden="true" />
              <div className="services-quadrant__veil" aria-hidden="true" />

              <div className="services-quadrant__content">
                <h2>{area.title}</h2>
                <p>{area.summary}</p>
                <ul>
                  {examples.map((item) => <li key={item.name}>{item.name}</li>)}
                </ul>
                <span>Ver {area.shortTitle.toLowerCase()} ↗</span>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="services-help services-help--compact services-help--minimal">
        <div>
          <h2>Escríbenos y te orientamos antes de reservar.</h2>
        </div>
        <Link to="/contacto">Hablar con Indian Club ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
