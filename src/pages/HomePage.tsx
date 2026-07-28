import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { bookingUrl, brand, contact, journalItems, promotions, services, stats } from '../data/site';
import { visualMedia } from '../data/visualMedia';

const heroScenes = [
  {
    label: 'Barbería',
    copy: 'Cortes, barba y acabado con precisión.',
    to: '/servicios/corte-de-autor',
    media: visualMedia.barber,
  },
  {
    label: 'Tattoo',
    copy: 'Diseño, conversación y técnica.',
    to: '/servicios/tattoo-studio',
    media: visualMedia.tattoo,
  },
  {
    label: 'Nails',
    copy: 'Manos, pies y detalle profesional.',
    to: '/servicios/nails-studio',
    media: visualMedia.nails,
  },
  {
    label: 'El Club',
    copy: 'Café, parqueo y una visita sin apuro.',
    to: '/club',
    media: visualMedia.club,
  },
] as const;

const finderResults = {
  mantener: {
    label: 'Mantener lo que ya funciona',
    service: services[0],
    media: visualMedia.barberDetail,
    reason: 'Recupera forma, textura y limpieza sin cambiar por completo tu estilo.',
  },
  cambiar: {
    label: 'Cambiar con criterio',
    service: services[2],
    media: visualMedia.barber,
    reason: 'Revisa cabello, barba y acabado en una sesión más completa.',
  },
  preparar: {
    label: 'Prepararme para algo importante',
    service: services[2],
    media: visualMedia.club,
    reason: 'Resuelve el conjunto con tiempo suficiente para afinar cada detalle.',
  },
  expresar: {
    label: 'Expresar algo propio',
    service: services[4],
    media: visualMedia.tattoo,
    reason: 'Convierte una idea en una pieza trabajada con conversación y técnica.',
  },
} as const;

type FinderIntent = keyof typeof finderResults;

const serviceVisuals = [
  visualMedia.barber,
  visualMedia.barberDetail,
  visualMedia.club,
  visualMedia.nails,
  visualMedia.tattoo,
  visualMedia.club,
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomePage() {
  const [activeHero, setActiveHero] = useState(0);
  const [intent, setIntent] = useState<FinderIntent>('mantener');
  const [activeService, setActiveService] = useState(0);
  const reduceMotion = useReducedMotion();
  const currentHero = heroScenes[activeHero];
  const result = finderResults[intent];
  const currentService = services[activeService];
  const currentServiceMedia = serviceVisuals[activeService];

  return (
    <>
      <Seo
        title="Indian Club · Barbería, tattoo, nails y café"
        description="Indian Club reúne barbería, tattoo, nails y café en el centro de Loja. Conoce servicios, promociones, trabajos y reservas."
      />

      <div className="art-home">
        <section className="film-hero" aria-labelledby="film-hero-title">
          <AnimatePresence mode="wait">
            <motion.div
              className="film-hero__media"
              key={currentHero.label}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <ViewportVideo
                src={currentHero.media.video}
                poster={currentHero.media.poster}
                label={`${currentHero.label} en Indian Club`}
                priority
              />
              <div className="film-hero__veil" />
            </motion.div>
          </AnimatePresence>

          <div className="film-hero__content">
            <div className="film-hero__identity">
              <img src={brand.logoLockup} alt="Indian Club" />
              <div>
                <span>Loja · Ecuador</span>
                <span>Desde 2018</span>
              </div>
            </div>

            <div className="film-hero__statement">
              <h1 id="film-hero-title">Barbería, tattoo, nails y café.</h1>
              <p>{currentHero.copy}</p>
              <div className="film-hero__actions">
                <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar cita <Arrow /></a>
                <Link to="/style-book">Ver trabajos</Link>
              </div>
            </div>
          </div>

          <div className="film-hero__switcher" role="tablist" aria-label="Áreas de Indian Club">
            {heroScenes.map((scene, index) => (
              <button
                key={scene.label}
                type="button"
                role="tab"
                aria-selected={activeHero === index}
                className={activeHero === index ? 'is-active' : undefined}
                onMouseEnter={() => setActiveHero(index)}
                onFocus={() => setActiveHero(index)}
                onClick={() => setActiveHero(index)}
              >
                <strong>{scene.label}</strong>
                <span>{scene.copy}</span>
              </button>
            ))}
          </div>

          <div className="film-hero__stats" aria-label="Datos de Indian Club">
            {stats.map((stat) => (
              <span key={stat.label}><strong>{stat.value}</strong>{stat.label}</span>
            ))}
          </div>
        </section>

        <div className="brand-ticker" aria-hidden="true">
          <motion.div
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            <span>INDIAN CLUB</span><i>BARBERÍA</i><span>TATTOO</span><i>NAILS</i><span>CAFÉ</span>
            <span>INDIAN CLUB</span><i>BARBERÍA</i><span>TATTOO</span><i>NAILS</i><span>CAFÉ</span>
          </motion.div>
        </div>

        <section className="intent-canvas" aria-labelledby="intent-title">
          <div className="intent-canvas__media">
            <AnimatePresence mode="wait">
              <motion.div
                key={intent}
                initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <ViewportVideo
                  src={result.media.video}
                  poster={result.media.poster}
                  label={result.label}
                />
              </motion.div>
            </AnimatePresence>
            <div className="intent-canvas__result">
              <span>Te recomendamos</span>
              <h3>{result.service.title}</h3>
              <p>{result.reason}</p>
              <dl>
                <div><dt>Tiempo</dt><dd>{result.service.duration}</dd></div>
                <div><dt>Precio</dt><dd>{result.service.price}</dd></div>
              </dl>
              <Link to={`/servicios/${result.service.slug}`}>Ver servicio <Arrow /></Link>
            </div>
          </div>

          <div className="intent-canvas__choices">
            <span>Encuentra tu servicio</span>
            <h2 id="intent-title">¿Qué quieres hacer hoy?</h2>
            <div role="group" aria-label="Selecciona tu intención">
              {(Object.keys(finderResults) as FinderIntent[]).map((key) => (
                <button
                  type="button"
                  key={key}
                  aria-pressed={intent === key}
                  className={intent === key ? 'is-active' : undefined}
                  onClick={() => setIntent(key)}
                  onMouseEnter={() => setIntent(key)}
                  onFocus={() => setIntent(key)}
                >
                  {finderResults[key].label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="service-stage" aria-labelledby="service-stage-title">
          <div className="service-stage__sticky">
            <AnimatePresence mode="wait">
              <motion.div
                className="service-stage__visual"
                key={currentService.slug}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.55 }}
              >
                <ViewportVideo
                  src={currentServiceMedia.video}
                  poster={currentServiceMedia.poster}
                  label={currentService.title}
                />
                <div>
                  <span>{currentService.kicker}</span>
                  <h3>{currentService.title}</h3>
                  <p>{currentService.detail}</p>
                  <Link to={`/servicios/${currentService.slug}`}>Conocer el servicio <Arrow /></Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="service-stage__list">
            <header>
              <span>Servicios</span>
              <h2 id="service-stage-title">Todo lo que puedes hacer en Indian.</h2>
            </header>
            {services.map((service, index) => (
              <Link
                to={`/servicios/${service.slug}`}
                key={service.slug}
                className={activeService === index ? 'is-active' : undefined}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
              >
                <div><strong>{service.title}</strong><span>{service.kicker}</span></div>
                <div><small>{service.duration}</small><small>{service.price}</small></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="club-film" aria-labelledby="club-film-title">
          <ViewportVideo
            src={visualMedia.club.video}
            poster={visualMedia.club.poster}
            label="Ambiente de café y club"
          />
          <div className="club-film__veil" />
          <div className="club-film__copy">
            <img src={brand.logoMark} alt="" />
            <span>El Club</span>
            <h2 id="club-film-title">Tu cita también puede sentirse como una pausa.</h2>
            <p>Café, parqueo exclusivo y un espacio pensado para llegar sin apuro.</p>
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

        <section className="journal-scene" aria-labelledby="journal-scene-title">
          <div className="journal-scene__lead">
            <img src={visualMedia.barberDetail.poster} alt="Detalle de un corte profesional" loading="lazy" />
            <div>
              <span>Inspírate</span>
              <h2 id="journal-scene-title">Consejos que siguen funcionando después de la cita.</h2>
              <Link to={`/inspirate/${journalItems[0].slug}`}>{journalItems[0].title} <Arrow /></Link>
            </div>
          </div>
          <div className="journal-scene__links">
            {journalItems.slice(1).map((item) => (
              <Link to={`/inspirate/${item.slug}`} key={item.slug}>
                <small>{item.type}</small>
                <strong>{item.title}</strong>
                <Arrow />
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
