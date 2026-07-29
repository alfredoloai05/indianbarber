import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { journalItems } from '../data/journal';
import { serviceCatalog } from '../data/serviceCatalog';
import { bookingUrl, brand, contact, promotions } from '../data/site';
import { visualMedia } from '../data/visualMedia';

const portalMedia = {
  barberia: visualMedia.hero.barber,
  combos: visualMedia.services[2],
  tattoo: visualMedia.hero.tattoo,
  nails: visualMedia.hero.nails,
} as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomePage() {
  const [activePortal, setActivePortal] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo
        title="Indian Club · Barbería, tattoo, nails y café"
        description="Indian Club reúne barbería, tattoo, nails y café en el centro de Loja. Conoce servicios, promociones, trabajos y reservas."
      />

      <div className="art-home art-home--flow-polish">
        <section className="film-hero film-hero--integrated" aria-labelledby="film-hero-title">
          <motion.div
            className="film-hero__media"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.045, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ViewportVideo
              src={visualMedia.hero.barber.video}
              poster={visualMedia.hero.barber.poster}
              label="Barbería en Indian Club"
              priority
            />
            <div className="film-hero__veil" />
          </motion.div>

          <div className="film-hero__content">
            <motion.div
              className="film-hero__identity"
              initial={reduceMotion ? false : { opacity: 0, y: -22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={brand.logoLockup} alt="Indian Club" />
              <div>
                <span>Loja · Ecuador</span>
                <span>Desde 2018</span>
              </div>
            </motion.div>

            <motion.div
              className="film-hero__statement"
              initial={reduceMotion ? false : { opacity: 0, y: 34, clipPath: 'inset(0 0 18% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 0.78, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 id="film-hero-title">Barbería, tattoo, nails y café.</h1>
              <p>Cortes, barba y acabado con precisión.</p>
              <motion.div
                className="film-hero__actions"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar cita <Arrow /></a>
                <Link to="/style-book">Ver trabajos</Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="brand-ticker brand-ticker--hero" aria-hidden="true">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, x: ['0%', '-50%'] }}
              transition={
                reduceMotion
                  ? { duration: 0.45 }
                  : {
                      opacity: { duration: 0.55, delay: 0.58 },
                      y: { duration: 0.55, delay: 0.58 },
                      x: { duration: 34, repeat: Infinity, ease: 'linear', delay: 0.9 },
                    }
              }
            >
              <span>INDIAN CLUB</span><i>BARBERÍA</i><span>TATTOO</span><i>NAILS</i><span>CAFÉ</span>
              <span>INDIAN CLUB</span><i>BARBERÍA</i><span>TATTOO</span><i>NAILS</i><span>CAFÉ</span>
            </motion.div>
          </div>
        </section>

        <section className="service-portals" aria-labelledby="service-portals-title">
          <header className="service-portals__intro">
            <div>
              <span>Servicios</span>
              <h2 id="service-portals-title">Todo Indian, en un solo lugar.</h2>
            </div>
          </header>

          <div className="service-portals__grid" data-active={serviceCatalog[activePortal].id}>
            {serviceCatalog.map((area, index) => {
              const isActive = activePortal === index;
              const media = portalMedia[area.id];
              const examples = area.groups.flatMap((group) => group.items).slice(0, 3);

              return (
                <article
                  key={area.id}
                  className={`service-portal service-portal--${area.id}${isActive ? ' is-active' : ''}`}
                  onMouseEnter={() => setActivePortal(index)}
                  onFocusCapture={() => setActivePortal(index)}
                >
                  <div className="service-portal__poster">
                    <img src={media.poster} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
                  </div>

                  {isActive && media.video ? (
                    <motion.div
                      className="service-portal__video"
                      initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ViewportVideo
                        src={media.video}
                        poster={media.poster}
                        label={`${area.title} en Indian Club`}
                      />
                    </motion.div>
                  ) : null}

                  <div className="service-portal__ambient" aria-hidden="true" />
                  <div className="service-portal__veil" aria-hidden="true" />

                  <button
                    type="button"
                    className="service-portal__trigger"
                    aria-expanded={isActive}
                    aria-controls={`portal-${area.id}`}
                    onClick={() => setActivePortal(index)}
                  >
                    <small>{area.eyebrow}</small>
                    <strong>{area.shortTitle}</strong>
                    <span aria-hidden="true">+</span>
                  </button>

                  <motion.div
                    id={`portal-${area.id}`}
                    className="service-portal__details"
                    initial={false}
                    animate={
                      isActive
                        ? { opacity: 1, y: 0, pointerEvents: 'auto' }
                        : { opacity: 0, y: 18, pointerEvents: 'none' }
                    }
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden={!isActive}
                  >
                    <p>{area.summary}</p>
                    <ul>
                      {examples.map((item) => <li key={item.name}>{item.name}</li>)}
                    </ul>
                    <Link to={`/servicios/${area.route}`}>Ver {area.shortTitle.toLowerCase()} <Arrow /></Link>
                  </motion.div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="club-film club-film--compact" aria-labelledby="club-film-title">
          <ViewportVideo
            src={visualMedia.clubFeature.video}
            poster={visualMedia.clubFeature.poster}
            label="Ambiente social de café y club"
          />
          <div className="club-film__veil" />
          <div className="club-film__copy">
            <img src={brand.logoMark} alt="" />
            <span>El Club</span>
            <h2 id="club-film-title">Café, parqueo y todo Indian en un solo lugar.</h2>
            <p>Llega con tiempo, toma algo y disfruta el espacio antes o después de tu servicio.</p>
            <Link to="/club">Conocer el lugar <Arrow /></Link>
          </div>
        </section>

        <section className="promotion-ledger promotion-ledger--beam" aria-labelledby="promotion-ledger-title">
          <header>
            <span>Promociones</span>
            <h2 id="promotion-ledger-title">Beneficios vigentes en Indian Club.</h2>
            <p>Confirma disponibilidad y condiciones directamente con el centro.</p>
          </header>
          <div>
            {promotions.map((promotion) => (
              <a href={bookingUrl} target="_blank" rel="noreferrer" key={promotion.title}>
                <small>{promotion.eyebrow}</small>
                <strong>{promotion.title}</strong>
                <p>{promotion.note}</p>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="home-guides" aria-labelledby="home-guides-title">
          <header className="home-guides__header">
            <div>
              <span>Consejos Indian Club</span>
              <h2 id="home-guides-title">Cuida mejor el resultado entre visitas.</h2>
            </div>
            <Link to="/inspirate">Ver todos los consejos <Arrow /></Link>
          </header>

          <div className="home-guides__grid">
            {journalItems.map((item, index) => (
              <Link
                className={`home-guide${index === 0 ? ' home-guide--feature' : ' home-guide--compact'}`}
                to={`/inspirate/${item.slug}`}
                key={item.slug}
              >
                <img src={item.image} alt="" loading="lazy" />
                <div className="home-guide__veil" aria-hidden="true" />
                <div className="home-guide__copy">
                  <small>{item.type}</small>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <span>Leer guía <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="visit-terminal" aria-labelledby="visit-terminal-title">
          <div>
            <span>Visítanos</span>
            <h2 id="visit-terminal-title">Indian Club está en el centro de Loja.</h2>
            <address>{contact.address}<br />{contact.city}</address>
            <a href={contact.mapHref} target="_blank" rel="noreferrer">Abrir mapa <Arrow /></a>
          </div>
          <div>
            {contact.hours.map((item) => (
              <p key={item.days}><span>{item.days}</span><strong>{item.value}</strong></p>
            ))}
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp {contact.whatsapp}</a>
          </div>
          <div>
            <h3>Elige servicio, profesional y horario.</h3>
            <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar ahora <Arrow /></a>
          </div>
        </section>
      </div>
    </>
  );
}
