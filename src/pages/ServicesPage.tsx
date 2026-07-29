import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { serviceCatalogGroups } from '../data/serviceCatalog';
import { bookingUrl, contact } from '../data/site';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ServicesPage() {
  const [activeGroup, setActiveGroup] = useState(0);
  const reduceMotion = useReducedMotion();
  const currentGroup = serviceCatalogGroups[activeGroup];

  return (
    <>
      <Seo
        title="Servicios"
        description="Conoce todos los servicios de peluquería, barbería, combos, tattoo, nails y cuidado especial disponibles en Indian Club Loja."
      />

      <section className="services-directory-hero" aria-labelledby="services-page-title">
        <div>
          <span>Servicios</span>
          <h1 id="services-page-title">Todo lo que puedes hacer en Indian Club.</h1>
        </div>
        <div>
          <p>Barbería, combos, tattoo, nails y servicios especiales en un solo lugar.</p>
          <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar cita <Arrow /></a>
        </div>
      </section>

      <section className="services-directory" aria-label="Catálogo completo de Indian Club">
        <div className="services-directory__visual">
          <div className="services-directory__sticky">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGroup.title}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentGroup.media.video ? (
                  <ViewportVideo
                    src={currentGroup.media.video}
                    poster={currentGroup.media.poster}
                    label={currentGroup.title}
                  />
                ) : (
                  <img src={currentGroup.media.poster} alt={currentGroup.title} loading="lazy" />
                )}
                <div className="services-directory__veil" />
                <div className="services-directory__visual-copy">
                  <span>{currentGroup.eyebrow}</span>
                  <h2>{currentGroup.title}</h2>
                  <div>
                    <small>{currentGroup.service.duration}</small>
                    <strong>{currentGroup.service.price}</strong>
                  </div>
                  <Link to={`/servicios/${currentGroup.service.slug}`}>Ver categoría <Arrow /></Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="services-directory__groups">
          {serviceCatalogGroups.map((group, index) => (
            <article
              key={group.title}
              className={activeGroup === index ? 'is-active' : undefined}
              onMouseEnter={() => setActiveGroup(index)}
              onFocusCapture={() => setActiveGroup(index)}
            >
              <header>
                <div>
                  <span>{group.eyebrow}</span>
                  <h2>{group.title}</h2>
                </div>
                <Link to={`/servicios/${group.service.slug}`}>Ver categoría <Arrow /></Link>
              </header>

              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <a href={bookingUrl} target="_blank" rel="noreferrer">
                      <span>{item}</span>
                      <small>Reservar</small>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="services-help">
        <div>
          <span>¿No sabes cuál elegir?</span>
          <h2>Cuéntanos qué quieres hacer y te orientamos.</h2>
        </div>
        <div>
          <p>Escríbenos por WhatsApp o revisa la disponibilidad directamente en AgendaPro.</p>
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer">Hablar por WhatsApp <Arrow /></a>
        </div>
      </section>

      <BookingBand />
    </>
  );
}
